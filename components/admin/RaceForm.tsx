import { EventStatus, RegistrationStatus, type Event } from "@prisma/client";
import { arrayToLines, toDateInputValue } from "@/lib/admin";

type RaceFormProps = {
  action: (formData: FormData) => Promise<void>;
  race?: Event;
  submitLabel: string;
};

const inputClass =
  "w-full rounded-md border border-white/10 bg-night px-4 py-3 text-sm text-chrome outline-none transition placeholder:text-steel focus:border-gold";

const labelClass = "text-xs font-black uppercase tracking-[0.14em] text-steel";

export function RaceForm({ action, race, submitLabel }: RaceFormProps) {
  return (
    <form action={action} className="grid gap-5 rounded-lg border border-white/10 bg-white/[0.04] p-5 shadow-panel sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className={labelClass}>Title</span>
          <input name="title" required defaultValue={race?.title} className={inputClass} />
        </label>
        <label className="grid gap-2">
          <span className={labelClass}>Slug</span>
          <input name="slug" required defaultValue={race?.slug} className={inputClass} />
        </label>
      </div>

      <label className="grid gap-2">
        <span className={labelClass}>Description</span>
        <textarea name="description" required rows={5} defaultValue={race?.description} className={inputClass} />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className={labelClass}>Date and time</span>
          <input
            name="date"
            type="datetime-local"
            required
            defaultValue={race ? toDateInputValue(race.date) : undefined}
            className={inputClass}
          />
        </label>
        <label className="grid gap-2">
          <span className={labelClass}>City</span>
          <input name="city" required defaultValue={race?.city} className={inputClass} />
        </label>
      </div>

      <label className="grid gap-2">
        <span className={labelClass}>Location</span>
        <input name="location" required defaultValue={race?.location} className={inputClass} />
      </label>

      <label className="grid gap-2">
        <span className={labelClass}>Cover image URL</span>
        <input name="coverImage" type="url" required defaultValue={race?.coverImage} className={inputClass} />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className={labelClass}>Publication status</span>
          <select name="status" defaultValue={race?.status ?? EventStatus.DRAFT} className={inputClass}>
            {Object.values(EventStatus).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2">
          <span className={labelClass}>Registration status</span>
          <select
            name="registrationStatus"
            defaultValue={race?.registrationStatus ?? RegistrationStatus.SOON}
            className={inputClass}
          >
            {Object.values(RegistrationStatus).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <label className="grid gap-2">
          <span className={labelClass}>Photo links</span>
          <textarea name="photoLinks" rows={5} defaultValue={arrayToLines(race?.photoLinks)} className={inputClass} />
        </label>
        <label className="grid gap-2">
          <span className={labelClass}>Video links</span>
          <textarea name="videoLinks" rows={5} defaultValue={arrayToLines(race?.videoLinks)} className={inputClass} />
        </label>
        <label className="grid gap-2">
          <span className={labelClass}>Results links</span>
          <textarea name="resultsLinks" rows={5} defaultValue={arrayToLines(race?.resultsLinks)} className={inputClass} />
        </label>
      </div>

      <button className="rounded-md bg-gold px-5 py-3 text-sm font-black uppercase tracking-[0.1em] text-night transition hover:bg-chrome">
        {submitLabel}
      </button>
    </form>
  );
}

export { inputClass, labelClass };
