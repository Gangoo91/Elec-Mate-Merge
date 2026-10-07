import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Phone, KeyRound, UserRound } from 'lucide-react';
import { Field, inputClass, textareaClass } from '@/components/employer/editorial';
import { autoCompleteOff } from '@/lib/textEntry';

/* ==========================================================================
   Site access fields — the bits only the office knows, that the crew needs
   on the doorstep: who to ask for, how to get in, and whether the crew may
   see the customer's number. Shared by New job (AddJobDialog) and Edit job
   (ViewJobSheet) so both write the same columns on employer_jobs.
   ========================================================================== */

export interface SiteAccessValues {
  siteContactName: string;
  siteContactPhone: string;
  accessNotes: string;
  shareClientContact: boolean;
}

export const BLANK_SITE_ACCESS: SiteAccessValues = {
  siteContactName: '',
  siteContactPhone: '',
  accessNotes: '',
  shareClientContact: true,
};

/** DB row → form values. */
export function siteAccessFromJob(job: {
  site_contact_name?: string | null;
  site_contact_phone?: string | null;
  access_notes?: string | null;
  share_client_contact_with_crew?: boolean | null;
}): SiteAccessValues {
  return {
    siteContactName: job.site_contact_name ?? '',
    siteContactPhone: job.site_contact_phone ?? '',
    accessNotes: job.access_notes ?? '',
    shareClientContact: job.share_client_contact_with_crew ?? true,
  };
}

/** Form values → DB columns (blank strings saved as null). */
export function siteAccessToJob(v: SiteAccessValues) {
  return {
    site_contact_name: v.siteContactName.trim() || null,
    site_contact_phone: v.siteContactPhone.trim() || null,
    access_notes: v.accessNotes.trim() || null,
    share_client_contact_with_crew: v.shareClientContact,
  };
}

export function SiteAccessFields({
  value,
  onChange,
}: {
  value: SiteAccessValues;
  onChange: <K extends keyof SiteAccessValues>(key: K, v: SiteAccessValues[K]) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
        <Field label="Who to ask for on site" hint="If it is not the client. A site manager, tenant or neighbour with keys.">
          <Input
            value={value.siteContactName}
            onChange={(e) => onChange('siteContactName', e.target.value)}
            placeholder="e.g. Gary, site manager"
            className={inputClass}
            autoComplete={autoCompleteOff}
            enterKeyHint="next"
          />
        </Field>
        <Field label="Their number">
          <Input
            type="tel"
            inputMode="tel"
            value={value.siteContactPhone}
            onChange={(e) => onChange('siteContactPhone', e.target.value)}
            placeholder="e.g. 07700 900123"
            className={inputClass}
            autoComplete={autoCompleteOff}
            enterKeyHint="next"
          />
        </Field>
      </div>
      <Field label="Getting in" hint="Keys, parking, alarm code, dogs. The crew sees this on the job.">
        <Textarea
          value={value.accessNotes}
          onChange={(e) => onChange('accessNotes', e.target.value)}
          placeholder="e.g. Key safe by the back door, code 1234. Park on the drive. Dog in the kitchen."
          rows={3}
          className={textareaClass}
        />
      </Field>
      <label className="flex min-h-11 items-start gap-3 cursor-pointer touch-manipulation">
        <div className="min-w-0 flex-1">
          <p className="text-[14px] font-medium text-white leading-snug">Crew can see the customer's number</p>
          <p className="mt-0.5 text-[12px] text-white leading-snug">
            Apprentices never see it. They see their supervisor instead.
          </p>
        </div>
        <Switch
          checked={value.shareClientContact}
          onCheckedChange={(c) => onChange('shareClientContact', c)}
          aria-label="Crew can see the customer's number"
          className="mt-0.5 shrink-0"
        />
      </label>
    </div>
  );
}

/** Read-only block for the job sheet: site contact (with Call) + getting in. */
export function SiteAccessSummary({
  name,
  phone,
  notes,
}: {
  name?: string | null;
  phone?: string | null;
  notes?: string | null;
}) {
  const hasContact = !!(name?.trim() || phone?.trim());
  const hasNotes = !!notes?.trim();
  if (!hasContact && !hasNotes) return null;
  return (
    <div className="space-y-3">
      {hasContact && (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 shrink-0 rounded-full bg-white/[0.06] border border-white/[0.1] flex items-center justify-center">
            <UserRound className="h-4 w-4 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] text-white">Ask for on site</p>
            <p className="text-[14px] font-medium text-white truncate">{name?.trim() || 'Site contact'}</p>
            {phone?.trim() && <p className="text-[12px] text-white tabular-nums truncate">{phone.trim()}</p>}
          </div>
          {phone?.trim() && (
            <a
              href={`tel:${phone.replace(/\s+/g, '')}`}
              className="h-11 shrink-0 inline-flex items-center gap-1.5 rounded-full bg-elec-yellow px-4 text-[13px] font-semibold text-black touch-manipulation"
            >
              <Phone className="h-4 w-4" />
              Call
            </a>
          )}
        </div>
      )}
      {hasNotes && (
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 shrink-0 rounded-full bg-white/[0.06] border border-white/[0.1] flex items-center justify-center">
            <KeyRound className="h-4 w-4 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] text-white">Getting in</p>
            <p className="text-[14px] text-white leading-snug whitespace-pre-wrap break-words">{notes!.trim()}</p>
          </div>
        </div>
      )}
    </div>
  );
}
