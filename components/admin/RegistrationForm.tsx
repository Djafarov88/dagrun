import { ParticipantRegistrationStatus, type Distance, type Event, type Registration } from "@prisma/client";
import { inputClass, labelClass } from "@/components/admin/RaceForm";

type RegistrationWithRelations = Registration & {
  event: Event;
  distance: Distance;
};

type RegistrationFormProps = {
  action: (formData: FormData) => Promise<void>;
  events: Array<Event & { distances: Distance[] }>;
  registration?: RegistrationWithRelations;
  submitLabel: string;
};

export function RegistrationForm({
  action,
  events,
  registration,
  submitLabel
}: RegistrationFormProps) {
  return (
    <form action={action} className="grid gap-5 rounded-lg border border-white/10 bg-white/[0.04] p-5 shadow-panel sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className={labelClass}>Event</span>
          <select name="eventId" required defaultValue={registration?.eventId} className={inputClass}>
            <option value="">Select event</option>
            {events.map((event) => (
              <option key={event.id} value={event.id}>
                {event.title}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2">
          <span className={labelClass}>Distance</span>
          <select name="distanceId" required defaultValue={registration?.distanceId} className={inputClass}>
            <option value="">Select distance</option>
            {events.flatMap((event) =>
              event.distances.map((distance) => (
                <option key={distance.id} value={distance.id}>
                  {event.title} / {distance.title}
                </option>
              ))
            )}
          </select>
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className={labelClass}>First name</span>
          <input name="firstName" required defaultValue={registration?.firstName} className={inputClass} />
        </label>
        <label className="grid gap-2">
          <span className={labelClass}>Last name</span>
          <input name="lastName" required defaultValue={registration?.lastName} className={inputClass} />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className={labelClass}>Email</span>
          <input name="email" type="email" required defaultValue={registration?.email} className={inputClass} />
        </label>
        <label className="grid gap-2">
          <span className={labelClass}>Phone</span>
          <input name="phone" required defaultValue={registration?.phone} className={inputClass} />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className={labelClass}>Birth date</span>
          <input
            name="birthDate"
            type="date"
            defaultValue={registration?.birthDate?.toISOString().slice(0, 10)}
            className={inputClass}
          />
        </label>
        <label className="grid gap-2">
          <span className={labelClass}>Status</span>
          <select name="status" required defaultValue={registration?.status ?? ParticipantRegistrationStatus.DRAFT} className={inputClass}>
            {Object.values(ParticipantRegistrationStatus).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="grid gap-2">
        <span className={labelClass}>Emergency contact</span>
        <input name="emergencyContact" defaultValue={registration?.emergencyContact ?? ""} className={inputClass} />
      </label>

      <button className="rounded-md bg-gold px-5 py-3 text-sm font-black uppercase tracking-[0.1em] text-night transition hover:bg-chrome">
        {submitLabel}
      </button>
    </form>
  );
}
