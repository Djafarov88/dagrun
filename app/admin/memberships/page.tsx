import type { Metadata } from "next";
import {
  createMembershipPlan,
  deleteMembershipPlan,
  updateMembershipPlan
} from "@/app/admin/actions";
import { AdminNav } from "@/components/admin/AdminNav";
import { inputClass, labelClass } from "@/components/admin/RaceForm";
import { arrayToLines } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin memberships"
};

export default async function MembershipPlansPage() {
  const plans = await prisma.membershipPlan.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <>
      <AdminNav />
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-gold">Memberships</p>
        <h1 className="mt-3 text-4xl font-black text-chrome">Membership plans</h1>

        <form action={createMembershipPlan} className="mt-8 grid gap-4 rounded-lg border border-white/10 bg-white/[0.04] p-5 shadow-panel lg:grid-cols-2">
          <label className="grid gap-2">
            <span className={labelClass}>Name</span>
            <input name="name" required className={inputClass} />
          </label>
          <label className="grid gap-2">
            <span className={labelClass}>Slug</span>
            <input name="slug" required className={inputClass} />
          </label>
          <label className="grid gap-2">
            <span className={labelClass}>Price</span>
            <input name="price" required type="number" min="0" step="0.01" className={inputClass} />
          </label>
          <label className="flex items-end gap-3 pb-3 text-sm font-bold text-chrome">
            <input name="active" type="checkbox" defaultChecked /> Active
          </label>
          <label className="grid gap-2 lg:col-span-2">
            <span className={labelClass}>Description</span>
            <textarea name="description" required rows={3} className={inputClass} />
          </label>
          <label className="grid gap-2 lg:col-span-2">
            <span className={labelClass}>Features, one per line</span>
            <textarea name="features" rows={4} className={inputClass} />
          </label>
          <button className="rounded-md bg-gold px-5 py-3 text-sm font-black text-night">Create plan</button>
        </form>

        <div className="mt-8 grid gap-5">
          {plans.map((plan) => (
            <form key={plan.id} action={updateMembershipPlan.bind(null, plan.id)} className="grid gap-4 rounded-lg border border-white/10 bg-white/[0.04] p-5 shadow-panel lg:grid-cols-2">
              <label className="grid gap-2">
                <span className={labelClass}>Name</span>
                <input name="name" required defaultValue={plan.name} className={inputClass} />
              </label>
              <label className="grid gap-2">
                <span className={labelClass}>Slug</span>
                <input name="slug" required defaultValue={plan.slug} className={inputClass} />
              </label>
              <label className="grid gap-2">
                <span className={labelClass}>Price</span>
                <input name="price" required type="number" min="0" step="0.01" defaultValue={plan.price.toString()} className={inputClass} />
              </label>
              <label className="flex items-end gap-3 pb-3 text-sm font-bold text-chrome">
                <input name="active" type="checkbox" defaultChecked={plan.active} /> Active
              </label>
              <label className="grid gap-2 lg:col-span-2">
                <span className={labelClass}>Description</span>
                <textarea name="description" required rows={3} defaultValue={plan.description} className={inputClass} />
              </label>
              <label className="grid gap-2 lg:col-span-2">
                <span className={labelClass}>Features</span>
                <textarea name="features" rows={4} defaultValue={arrayToLines(plan.features)} className={inputClass} />
              </label>
              <div className="flex gap-2">
                <button className="rounded-md bg-gold px-5 py-3 text-sm font-black text-night">Save</button>
                <button formAction={deleteMembershipPlan.bind(null, plan.id)} className="rounded-md border border-flame/50 px-5 py-3 text-sm font-black text-flame">
                  Delete
                </button>
              </div>
            </form>
          ))}
        </div>
      </section>
    </>
  );
}
