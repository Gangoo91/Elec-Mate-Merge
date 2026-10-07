import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  checkRowCn,
  chipBase,
  chipOff,
  chipOn,
  fieldWideCn,
  grid2Cn,
  inputCn,
  labelCn,
} from '@/components/forms/fieldStyles';
import {
  useParentContacts,
  type ParentRelationship,
  type DigestFrequency,
} from '@/hooks/useParentContacts';
import { cn } from '@/lib/utils';

/* ==========================================================================
   ParentContactsSheet — tutor-side UI for adding / editing parent + guardian
   contacts for a single learner. Drives the weekly parent digest cron.
   ELE-932 (J3 — completes the tutor side).
   ========================================================================== */

const RELATIONSHIPS: { value: ParentRelationship; label: string }[] = [
  { value: 'parent', label: 'Parent' },
  { value: 'guardian', label: 'Guardian' },
  { value: 'carer', label: 'Carer' },
  { value: 'next_of_kin', label: 'Next of kin' },
  { value: 'emergency_contact', label: 'Emergency contact' },
  { value: 'other', label: 'Other' },
];

const FREQUENCIES: { value: DigestFrequency; label: string }[] = [
  { value: 'weekly', label: 'Weekly' },
  { value: 'fortnightly', label: 'Fortnightly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'never', label: 'Never' },
];

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentId: string | null;
  studentName?: string;
  /** 16-18 learner? Triggers a safeguarding nudge in the empty state. */
  under19?: boolean;
}

export function ParentContactsSheet({
  open,
  onOpenChange,
  studentId,
  studentName,
  under19,
}: Props) {
  const { contacts, loading, add, optOut, remove } = useParentContacts(open ? studentId : null);
  const { toast } = useToast();
  const [showAdd, setShowAdd] = useState(false);
  const [draft, setDraft] = useState<{
    name: string;
    email: string;
    phone: string;
    relationship: ParentRelationship;
    digest_frequency: DigestFrequency;
    consent: boolean;
  }>({
    name: '',
    email: '',
    phone: '',
    relationship: 'parent',
    digest_frequency: 'weekly',
    consent: true,
  });
  const [saving, setSaving] = useState(false);

  const handleAdd = async () => {
    if (!draft.name.trim() || !draft.email.trim()) {
      toast({ title: 'Name and email required', variant: 'destructive' });
      return;
    }
    setSaving(true);
    try {
      await add({
        name: draft.name,
        email: draft.email,
        phone: draft.phone || null,
        relationship: draft.relationship,
        digest_frequency: draft.digest_frequency,
        opted_in: draft.consent,
      });
      setDraft({
        name: '',
        email: '',
        phone: '',
        relationship: 'parent',
        digest_frequency: 'weekly',
        consent: true,
      });
      setShowAdd(false);
      toast({ title: 'Contact added' });
    } catch (e) {
      toast({
        title: 'Could not add contact',
        description: e instanceof Error ? e.message : String(e),
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const fmtDate = (d: string) =>
    new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

  const handleOptOut = async (id: string) => {
    try {
      await optOut(id);
      toast({ title: 'Marked opted out' });
    } catch (e) {
      toast({
        title: 'Could not mark opted out',
        description: e instanceof Error ? e.message : String(e),
        variant: 'destructive',
      });
    }
  };

  const handleRemove = async (id: string, name: string) => {
    if (!confirm(`Remove ${name}? They will stop receiving digests.`)) return;
    try {
      await remove(id);
      toast({ title: 'Contact removed' });
    } catch (e) {
      toast({
        title: 'Could not remove',
        description: e instanceof Error ? e.message : String(e),
        variant: 'destructive',
      });
    }
  };

  return (
    <FormSheet
      width="wide"
      bodyClassName="grid items-start gap-x-10 gap-y-6 lg:grid-cols-2"
      open={open}
      onOpenChange={onOpenChange}
      eyebrow={studentName ? `Contacts · ${studentName}` : 'Contacts'}
      title="Parent and guardian contacts"
      description="Who gets the progress digest, who has opted out, and who to call if there is a safeguarding concern."
      footer={
        showAdd ? (
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => setShowAdd(false)}
              disabled={saving}
              className={buttonSecondaryCn}
            >
              Cancel
            </button>
            <button type="button" onClick={handleAdd} disabled={saving} className={buttonPrimaryCn}>
              {saving ? 'Saving…' : 'Add contact'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2.5">
            <button type="button" onClick={() => onOpenChange(false)} className={buttonSecondaryCn}>
              Close
            </button>
            <button
              type="button"
              onClick={() => setShowAdd(true)}
              disabled={loading}
              className={buttonPrimaryCn}
            >
              {contacts.length > 0 ? 'Add another contact' : 'Add a contact'}
            </button>
          </div>
        )
      }
    >
      <section className={cn(showAdd ? 'hidden lg:block' : 'lg:col-span-2')}>
        <h3 className="text-[15px] font-semibold tracking-tight text-white">On file</h3>
        {loading ? (
          <p className="mt-3 text-[14px] text-white">Loading contacts…</p>
        ) : contacts.length === 0 ? (
          <div className="mt-3 border-t border-white/[0.1] pt-4">
            <p className="text-[14px] text-white">No parent or guardian contacts on file.</p>
            {under19 && (
              <p className="mt-2 text-[13px] leading-relaxed text-orange-300">
                16 to 18 learner. Ofsted expects a route to a parent or carer. Add one once consent
                is given.
              </p>
            )}
          </div>
        ) : (
          <ul
            className={cn(
              'mt-3 divide-y divide-white/[0.08] border-y border-white/[0.08]',
              !showAdd && 'lg:grid lg:grid-cols-2 lg:gap-x-10 lg:divide-y-0 lg:border-y-0'
            )}
          >
            {contacts.map((c) => {
              const optedOut = !!c.opted_out_at;
              return (
                <li
                  key={c.id}
                  className={cn('py-4', !showAdd && 'lg:border-b lg:border-white/[0.08]')}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-[15px] font-semibold text-white">
                        {c.name}
                        {c.relationship && (
                          <span className="font-normal">
                            {' '}
                            ·{' '}
                            {RELATIONSHIPS.find((r) => r.value === c.relationship)?.label ??
                              c.relationship}
                          </span>
                        )}
                      </p>
                      <p className="mt-0.5 truncate text-[13px] text-white">{c.email}</p>
                      {c.phone && <p className="text-[13px] text-white">{c.phone}</p>}
                      <p className="mt-1.5 text-[12.5px] text-white">
                        {optedOut ? (
                          <span className="font-semibold text-orange-300">Opted out</span>
                        ) : c.opted_in_at ? (
                          <span className="font-semibold text-emerald-400">Opted in</span>
                        ) : (
                          <span className="font-semibold text-orange-300">Consent pending</span>
                        )}
                        {' · '}
                        {FREQUENCIES.find((f) => f.value === c.digest_frequency)?.label ??
                          c.digest_frequency}{' '}
                        digest
                        {c.digest_last_sent_at && ` · last sent ${fmtDate(c.digest_last_sent_at)}`}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-1">
                      {!optedOut && (
                        <button
                          type="button"
                          onClick={() => handleOptOut(c.id)}
                          className="h-11 rounded-xl px-3 text-[13px] font-semibold text-white touch-manipulation hover:bg-white/[0.06]"
                        >
                          Opt out
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => handleRemove(c.id, c.name)}
                        className="h-11 rounded-xl px-3 text-[13px] font-semibold text-red-300 touch-manipulation hover:bg-red-500/10"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {showAdd && (
        <section className="space-y-5">
          <h3 className="text-[15px] font-semibold tracking-tight text-white">New contact</h3>
          <div>
            <label className={labelCn} htmlFor="pc-name">
              Name
            </label>
            <input
              id="pc-name"
              placeholder="e.g. Sarah Jones"
              value={draft.name}
              onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
              className={inputCn}
            />
          </div>
          <div className={grid2Cn}>
            <div className={fieldWideCn}>
              <label className={labelCn} htmlFor="pc-email">
                Email
              </label>
              <input
                id="pc-email"
                type="email"
                placeholder="name@example.com"
                value={draft.email}
                onChange={(e) => setDraft((d) => ({ ...d, email: e.target.value }))}
                className={inputCn}
              />
            </div>
            <div className={fieldWideCn}>
              <label className={labelCn} htmlFor="pc-phone">
                Phone (optional)
              </label>
              <input
                id="pc-phone"
                type="tel"
                placeholder="07…"
                value={draft.phone}
                onChange={(e) => setDraft((d) => ({ ...d, phone: e.target.value }))}
                className={inputCn}
              />
            </div>
          </div>
          <div>
            <p className={labelCn}>Relationship</p>
            <div className="mt-1 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {RELATIONSHIPS.map((r) => (
                <button
                  key={r.value}
                  type="button"
                  aria-pressed={draft.relationship === r.value}
                  onClick={() => setDraft((d) => ({ ...d, relationship: r.value }))}
                  className={cn(
                    chipBase,
                    'px-2 text-[13px]',
                    draft.relationship === r.value ? chipOn : chipOff
                  )}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className={labelCn}>Progress digest</p>
            <div className="mt-1 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {FREQUENCIES.map((f) => (
                <button
                  key={f.value}
                  type="button"
                  aria-pressed={draft.digest_frequency === f.value}
                  onClick={() => setDraft((d) => ({ ...d, digest_frequency: f.value }))}
                  className={cn(
                    chipBase,
                    'px-2 text-[13px]',
                    draft.digest_frequency === f.value ? chipOn : chipOff
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
            {draft.digest_frequency === 'never' && (
              <p className="mt-2 text-[12px] text-white">
                Kept as a contact only; no digest is sent.
              </p>
            )}
          </div>
          <label className={checkRowCn}>
            <input
              type="checkbox"
              checked={draft.consent}
              onChange={(e) => setDraft((d) => ({ ...d, consent: e.target.checked }))}
              className="h-5 w-5 shrink-0 accent-elec-yellow"
            />
            <span className="text-[13px] leading-relaxed text-white">
              Consent confirmed. The learner or parent has explicitly agreed to receive digests
              (required under GDPR).
            </span>
          </label>
        </section>
      )}
    </FormSheet>
  );
}
