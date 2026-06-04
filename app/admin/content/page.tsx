import type { Metadata } from "next";
import {
  createPartner,
  createTrainer,
  deletePartner,
  deleteTrainer,
  updatePartner,
  updateSiteContent,
  updateTrainer
} from "@/app/admin/actions";
import { AdminNav } from "@/components/admin/AdminNav";
import { inputClass, labelClass } from "@/components/admin/RaceForm";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin content"
};

export default async function ContentPage() {
  const [content, trainers, partners] = await Promise.all([
    prisma.siteContent.findUnique({ where: { key: "homepage" } }),
    prisma.trainer.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] }),
    prisma.partner.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] })
  ]);

  return (
    <>
      <AdminNav />
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-gold">Content</p>
        <h1 className="mt-3 text-4xl font-black text-chrome">Homepage content</h1>

        <form action={updateSiteContent} encType="multipart/form-data" className="mt-8 grid gap-4 rounded-lg border border-white/10 bg-white/[0.04] p-5 shadow-panel lg:grid-cols-3">
          <label className="grid gap-2 lg:col-span-3">
            <span className={labelClass}>Hero title</span>
            <input name="heroTitle" required defaultValue={content?.heroTitle ?? "Крупнейшее беговое сообщество Дагестана"} className={inputClass} />
          </label>
          <label className="grid gap-2 lg:col-span-3">
            <span className={labelClass}>Hero subtitle</span>
            <textarea name="heroSubtitle" required rows={3} defaultValue={content?.heroSubtitle ?? "Тренировки, забеги и спортивная культура DAGRUN."} className={inputClass} />
          </label>
          <label className="grid gap-2 lg:col-span-3">
            <span className={labelClass}>Hero image</span>
            <input name="heroImage" defaultValue={content?.heroImage ?? "https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?auto=format&fit=crop&w=2200&q=85"} className={inputClass} />
          </label>
          <label className="grid gap-2 lg:col-span-3">
            <span className={labelClass}>Upload hero image</span>
            <input name="heroUpload" type="file" accept="image/*" className={inputClass} />
          </label>
          <label className="grid gap-2">
            <span className={labelClass}>Participants stat</span>
            <input name="statParticipants" required defaultValue={content?.statParticipants ?? "5000+"} className={inputClass} />
          </label>
          <label className="grid gap-2">
            <span className={labelClass}>Trainings stat</span>
            <input name="statTrainings" required defaultValue={content?.statTrainings ?? "3"} className={inputClass} />
          </label>
          <label className="grid gap-2">
            <span className={labelClass}>Events stat</span>
            <input name="statEvents" required defaultValue={content?.statEvents ?? "10+"} className={inputClass} />
          </label>
          <button className="rounded-md bg-gold px-5 py-3 text-sm font-black text-night">Save homepage</button>
        </form>

        <ContentCollection
          title="Trainers"
          createAction={createTrainer}
          items={trainers.map((trainer) => ({
            id: trainer.id,
            fields: [
              ["name", trainer.name],
              ["role", trainer.role],
              ["image", trainer.image],
              ["bio", trainer.bio],
              ["sortOrder", String(trainer.sortOrder)]
            ],
            active: trainer.active,
            updateAction: updateTrainer.bind(null, trainer.id),
            deleteAction: deleteTrainer.bind(null, trainer.id)
          }))}
          extraLabel="Role"
        />

        <ContentCollection
          title="Partners"
          createAction={createPartner}
          items={partners.map((partner) => ({
            id: partner.id,
            fields: [
              ["name", partner.name],
              ["url", partner.url],
              ["logo", partner.logo],
              ["sortOrder", String(partner.sortOrder)]
            ],
            active: partner.active,
            updateAction: updatePartner.bind(null, partner.id),
            deleteAction: deletePartner.bind(null, partner.id)
          }))}
          extraLabel="URL"
          partnerMode
        />
      </section>
    </>
  );
}

type ContentItem = {
  id: string;
  fields: Array<[string, string]>;
  active: boolean;
  updateAction: (formData: FormData) => Promise<void>;
  deleteAction: (formData: FormData) => Promise<void>;
};

function ContentCollection({
  title,
  createAction,
  items,
  partnerMode = false
}: {
  title: string;
  createAction: (formData: FormData) => Promise<void>;
  items: ContentItem[];
  extraLabel: string;
  partnerMode?: boolean;
}) {
  return (
    <section className="mt-10 rounded-lg border border-white/10 bg-white/[0.04] p-5 shadow-panel">
      <h2 className="text-3xl font-black text-chrome">{title}</h2>
      <form action={createAction} encType="multipart/form-data" className="mt-5 grid gap-3 lg:grid-cols-5">
        <input name="name" required placeholder="Name" className={inputClass} />
        {partnerMode ? (
          <>
            <input name="url" placeholder="URL" className={inputClass} />
            <input name="logo" placeholder="Logo URL" className={inputClass} />
            <input name="logoUpload" type="file" accept="image/*" className={inputClass} />
          </>
        ) : (
          <>
            <input name="role" required placeholder="Role" className={inputClass} />
            <input name="image" placeholder="Image URL" className={inputClass} />
            <input name="imageUpload" type="file" accept="image/*" className={inputClass} />
            <input name="bio" placeholder="Bio" className={inputClass} />
          </>
        )}
        <input name="sortOrder" type="number" placeholder="Sort" className={inputClass} />
        <label className="flex items-center gap-2 text-sm font-bold text-chrome">
          <input name="active" type="checkbox" defaultChecked /> Active
        </label>
        <button className="rounded-md bg-gold px-4 py-3 text-sm font-black text-night">Create</button>
      </form>

      <div className="mt-5 grid gap-4">
        {items.map((item) => (
          <form key={item.id} action={item.updateAction} encType="multipart/form-data" className="grid gap-3 rounded-lg border border-white/10 bg-night p-4 lg:grid-cols-5">
            {item.fields.map(([name, value]) => (
              <input key={name} name={name} defaultValue={value} placeholder={name} className={inputClass} />
            ))}
            <input name={partnerMode ? "logoUpload" : "imageUpload"} type="file" accept="image/*" className={inputClass} />
            <label className="flex items-center gap-2 text-sm font-bold text-chrome">
              <input name="active" type="checkbox" defaultChecked={item.active} /> Active
            </label>
            <div className="flex gap-2">
              <button className="rounded-md bg-gold px-4 py-3 text-sm font-black text-night">Save</button>
              <button formAction={item.deleteAction} className="rounded-md border border-flame/50 px-4 py-3 text-sm font-black text-flame">
                Delete
              </button>
            </div>
          </form>
        ))}
      </div>
    </section>
  );
}
