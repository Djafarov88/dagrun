import type { Distance } from "@prisma/client";
import { addDistance, deleteDistance, updateDistance } from "@/app/admin/actions";
import { inputClass, labelClass } from "@/components/admin/RaceForm";

type DistanceFormsProps = {
  raceId: string;
  distances: Distance[];
};

export function DistanceForms({ raceId, distances }: DistanceFormsProps) {
  const addAction = addDistance.bind(null, raceId);

  return (
    <section className="mt-8 rounded-lg border border-white/10 bg-white/[0.04] p-5 shadow-panel sm:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-gold">Distances</p>
          <h2 className="mt-2 text-3xl font-black text-chrome">Manage distances</h2>
        </div>
      </div>

      <div className="mt-6 grid gap-4">
        {distances.map((distance) => {
          const updateAction = updateDistance.bind(null, distance.id, raceId);
          const deleteAction = deleteDistance.bind(null, distance.id, raceId);

          return (
            <form key={distance.id} action={updateAction} className="grid gap-3 rounded-lg border border-white/10 bg-night p-4 lg:grid-cols-[1fr_0.7fr_0.7fr_0.7fr_0.7fr_auto] lg:items-end">
              <label className="grid gap-2">
                <span className={labelClass}>Title</span>
                <input name="title" required defaultValue={distance.title} className={inputClass} />
              </label>
              <label className="grid gap-2">
                <span className={labelClass}>Length km</span>
                <input name="lengthKm" required type="number" step="0.01" min="0" defaultValue={distance.lengthKm.toString()} className={inputClass} />
              </label>
              <label className="grid gap-2">
                <span className={labelClass}>Price</span>
                <input name="price" required type="number" step="0.01" min="0" defaultValue={distance.price.toString()} className={inputClass} />
              </label>
              <label className="grid gap-2">
                <span className={labelClass}>Slot limit</span>
                <input name="slotLimit" type="number" min="0" defaultValue={distance.slotLimit ?? ""} className={inputClass} />
              </label>
              <label className="grid gap-2">
                <span className={labelClass}>Elevation</span>
                <input name="elevation" type="number" min="0" defaultValue={distance.elevation ?? ""} className={inputClass} />
              </label>
              <div className="flex gap-2">
                <button className="rounded-md bg-gold px-4 py-3 text-sm font-black text-night">Save</button>
                <button formAction={deleteAction} className="rounded-md border border-flame/50 px-4 py-3 text-sm font-black text-flame">
                  Delete
                </button>
              </div>
            </form>
          );
        })}
      </div>

      <form action={addAction} className="mt-6 grid gap-3 rounded-lg border border-dashed border-white/20 p-4 lg:grid-cols-[1fr_0.7fr_0.7fr_0.7fr_0.7fr_auto] lg:items-end">
        <label className="grid gap-2">
          <span className={labelClass}>Title</span>
          <input name="title" required placeholder="21.1 км" className={inputClass} />
        </label>
        <label className="grid gap-2">
          <span className={labelClass}>Length km</span>
          <input name="lengthKm" required type="number" step="0.01" min="0" className={inputClass} />
        </label>
        <label className="grid gap-2">
          <span className={labelClass}>Price</span>
          <input name="price" required type="number" step="0.01" min="0" defaultValue="0" className={inputClass} />
        </label>
        <label className="grid gap-2">
          <span className={labelClass}>Slot limit</span>
          <input name="slotLimit" type="number" min="0" className={inputClass} />
        </label>
        <label className="grid gap-2">
          <span className={labelClass}>Elevation</span>
          <input name="elevation" type="number" min="0" className={inputClass} />
        </label>
        <button className="rounded-md bg-chrome px-4 py-3 text-sm font-black text-night">Add</button>
      </form>
    </section>
  );
}
