import { useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import {
  PrimaryButton,
  SecondaryButton,
  SheetShell,
  Pill,
} from '@/components/college/primitives';
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
  const { contacts, loading, add, optOut, remove } = useParentContacts(
    open ? studentId : null
  );
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

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
        <SheetShell
          title="Parent & guardian contacts"
          subtitle={
            studentName
              ? `${studentName} — weekly digest, opt-out and safeguarding contacts`
              : 'Weekly digest, opt-out and safeguarding contacts'
          }
          onClose={() => onOpenChange(false)}
        >
          <div className="px-5 py-4 space-y-4 overflow-y-auto">
            {loading && <div className="text-sm text-white/60">Loading contacts…</div>}

            {!loading && contacts.length === 0 && !showAdd && (
              <div className="rounded-2xl border border-dashed border-white/10 px-5 py-8 text-center">
                <div className="text-sm text-white/70">
                  No parent / guardian contacts on file.
                </div>
                {under19 && (
                  <div className="mt-2 text-xs text-amber-300">
                    16-19 learner — Ofsted expects a parent contact route. Add one when consent given.
                  </div>
                )}
                <div className="mt-4">
                  <PrimaryButton onClick={() => setShowAdd(true)}>
                    + Add a contact
                  </PrimaryButton>
                </div>
              </div>
            )}

            {!loading && contacts.length > 0 && (
              <ul className="space-y-2">
                {contacts.map((c) => {
                  const optedOut = !!c.opted_out_at;
                  return (
                    <li
                      key={c.id}
                      className={cn(
                        'rounded-2xl border bg-white/5 p-4',
                        optedOut ? 'border-white/5 opacity-60' : 'border-white/10'
                      )}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="text-sm font-medium text-white truncate">
                            {c.name}
                            {c.relationship && (
                              <span className="ml-2 text-xs text-white/50">
                                · {c.relationship}
                              </span>
                            )}
                          </div>
                          <div className="mt-1 text-xs text-white/70 truncate">{c.email}</div>
                          {c.phone && (
                            <div className="text-xs text-white/50">{c.phone}</div>
                          )}
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {optedOut ? (
                              <Pill tone="red">Opted out</Pill>
                            ) : c.opted_in_at ? (
                              <Pill tone="emerald">Opted in</Pill>
                            ) : (
                              <Pill tone="amber">Consent pending</Pill>
                            )}
                            <Pill tone="blue">{c.digest_frequency}</Pill>
                            {c.digest_last_sent_at && (
                              <span className="text-[10px] text-white/70">
                                last sent{' '}
                                {new Date(c.digest_last_sent_at).toLocaleDateString('en-GB')}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col gap-1.5 shrink-0">
                          {!optedOut && (
                            <button
                              type="button"
                              onClick={async () => {
                                try {
                                  await optOut(c.id);
                                  toast({ title: 'Marked opted out' });
                                } catch (e) {
                                  toast({
                                    title: 'Could not mark opted out',
                                    description: e instanceof Error ? e.message : String(e),
                                    variant: 'destructive',
                                  });
                                }
                              }}
                              className="rounded-lg border border-white/15 px-2.5 py-1 text-[11px] text-white/80 hover:bg-white/[0.06] touch-manipulation"
                            >
                              Opt out
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={async () => {
                              if (!confirm(`Remove ${c.name}? They will stop receiving digests.`)) {
                                return;
                              }
                              try {
                                await remove(c.id);
                                toast({ title: 'Contact removed' });
                              } catch (e) {
                                toast({
                                  title: 'Could not remove',
                                  description: e instanceof Error ? e.message : String(e),
                                  variant: 'destructive',
                                });
                              }
                            }}
                            className="rounded-lg border border-red-500/30 px-2.5 py-1 text-[11px] text-red-300 hover:bg-red-500/10 touch-manipulation"
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

            {!loading && contacts.length > 0 && !showAdd && (
              <div>
                <PrimaryButton onClick={() => setShowAdd(true)}>
                  + Add another contact
                </PrimaryButton>
              </div>
            )}

            {showAdd && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3">
                <div className="text-xs uppercase tracking-wider text-white/50">
                  New contact
                </div>
                <Input
                  placeholder="Name"
                  value={draft.name}
                  onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
                  className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500"
                />
                <Input
                  type="email"
                  placeholder="Email"
                  value={draft.email}
                  onChange={(e) => setDraft((d) => ({ ...d, email: e.target.value }))}
                  className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500"
                />
                <Input
                  type="tel"
                  placeholder="Phone (optional)"
                  value={draft.phone}
                  onChange={(e) => setDraft((d) => ({ ...d, phone: e.target.value }))}
                  className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500"
                />
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="text-xs uppercase tracking-wider text-white/50">
                      Relationship
                    </label>
                    <Select
                      value={draft.relationship}
                      onValueChange={(v) =>
                        setDraft((d) => ({ ...d, relationship: v as ParentRelationship }))
                      }
                    >
                      <SelectTrigger className="h-11 bg-elec-gray border-white/30 touch-manipulation">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-elec-gray border-white/10 text-white">
                        <SelectItem value="parent">Parent</SelectItem>
                        <SelectItem value="guardian">Guardian</SelectItem>
                        <SelectItem value="carer">Carer</SelectItem>
                        <SelectItem value="next_of_kin">Next of kin</SelectItem>
                        <SelectItem value="emergency_contact">Emergency contact</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wider text-white/50">
                      Digest frequency
                    </label>
                    <Select
                      value={draft.digest_frequency}
                      onValueChange={(v) =>
                        setDraft((d) => ({ ...d, digest_frequency: v as DigestFrequency }))
                      }
                    >
                      <SelectTrigger className="h-11 bg-elec-gray border-white/30 touch-manipulation">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-elec-gray border-white/10 text-white">
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="fortnightly">Fortnightly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="never">Never (contact only)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <label className="flex items-start gap-2 cursor-pointer touch-manipulation">
                  <input
                    type="checkbox"
                    checked={draft.consent}
                    onChange={(e) => setDraft((d) => ({ ...d, consent: e.target.checked }))}
                    className="mt-1 h-4 w-4 rounded border-white/30 bg-transparent text-elec-yellow focus:ring-elec-yellow"
                  />
                  <span className="text-xs text-white/70 leading-relaxed">
                    Consent confirmed — the learner / parent has explicitly agreed to receive
                    digests. Required under GDPR.
                  </span>
                </label>
                <div className="flex justify-end gap-2 pt-1">
                  <SecondaryButton onClick={() => setShowAdd(false)}>Cancel</SecondaryButton>
                  <PrimaryButton onClick={handleAdd} disabled={saving}>
                    {saving ? 'Saving…' : 'Add contact'}
                  </PrimaryButton>
                </div>
              </div>
            )}
          </div>
        </SheetShell>
      </SheetContent>
    </Sheet>
  );
}
