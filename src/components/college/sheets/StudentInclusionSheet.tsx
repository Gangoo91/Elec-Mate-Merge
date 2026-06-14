import { useEffect, useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import {
  PrimaryButton,
  SecondaryButton,
  SheetShell,
} from '@/components/college/primitives';
import {
  useStudentInclusion,
  SEND_FLAG_KEYS,
  SEND_FLAG_LABEL,
  type SendFlagKey,
} from '@/hooks/useStudentInclusion';
import { cn } from '@/lib/utils';

/* ==========================================================================
   StudentInclusionSheet — edit SEND flags / EAL / EHCP ref / pronouns /
   accessibility notes. Matches the production schema on college_students.
   ELE-904 (B9).
   ========================================================================== */

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentId: string | null;
  studentName?: string;
}

export function StudentInclusionSheet({ open, onOpenChange, studentId, studentName }: Props) {
  const { data, loading, saving, update } = useStudentInclusion(open ? studentId : null);
  const [local, setLocal] = useState<{
    flags: SendFlagKey[];
    eal: boolean;
    ehcp_ref: string;
    accessibility_notes: string;
    first_language: string;
    pronouns: string;
  }>({
    flags: [],
    eal: false,
    ehcp_ref: '',
    accessibility_notes: '',
    first_language: '',
    pronouns: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    if (data) {
      setLocal({
        flags: data.send_flags,
        eal: data.eal,
        ehcp_ref: data.ehcp_ref || '',
        accessibility_notes: data.accessibility_notes || '',
        first_language: data.first_language || '',
        pronouns: data.pronouns || '',
      });
    } else if (!open) {
      setLocal({
        flags: [],
        eal: false,
        ehcp_ref: '',
        accessibility_notes: '',
        first_language: '',
        pronouns: '',
      });
    }
  }, [data, open]);

  const toggle = (key: SendFlagKey) => {
    setLocal((s) => ({
      ...s,
      flags: s.flags.includes(key) ? s.flags.filter((k) => k !== key) : [...s.flags, key],
    }));
  };

  const handleSave = async () => {
    if (!studentId) return;
    try {
      await update({
        send_flags: local.flags,
        eal: local.eal,
        ehcp_ref: local.ehcp_ref.trim() || null,
        accessibility_notes: local.accessibility_notes.trim() || null,
        first_language: local.first_language.trim() || null,
        pronouns: local.pronouns.trim() || null,
      });
      toast({ title: 'Inclusion details saved' });
      onOpenChange(false);
    } catch (e) {
      toast({
        title: 'Could not save',
        description: e instanceof Error ? e.message : String(e),
        variant: 'destructive',
      });
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent hideCloseButton side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
        <SheetShell
          title="Inclusion & adjustments"
          subtitle={
            studentName
              ? `${studentName} — SEND, EAL, EHCP reference and adjustments`
              : 'SEND, EAL, EHCP reference and adjustments'
          }
          onClose={() => onOpenChange(false)}
        >
          {loading && <div className="px-5 py-4 text-sm text-white/60">Loading…</div>}
          {!loading && (
            <div className="px-5 py-4 space-y-5 overflow-y-auto">
              <section>
                <h3 className="text-xs uppercase tracking-wider text-white/50">SEND flags</h3>
                <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {SEND_FLAG_KEYS.map((k) => {
                    const active = local.flags.includes(k);
                    return (
                      <button
                        key={k}
                        type="button"
                        onClick={() => toggle(k)}
                        className={cn(
                          'rounded-xl border px-3 py-2.5 text-left text-sm touch-manipulation',
                          active
                            ? 'border-elec-yellow bg-elec-yellow/10 text-white'
                            : 'border-white/10 bg-white/5 text-white/80 hover:bg-white/10'
                        )}
                      >
                        <span className="flex items-center gap-2">
                          <span
                            className={cn(
                              'inline-block h-3 w-3 rounded-full border',
                              active ? 'bg-elec-yellow border-elec-yellow' : 'border-white/30'
                            )}
                          />
                          {SEND_FLAG_LABEL[k]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>

              <section className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                <div>
                  <div className="text-sm text-white">English as additional language</div>
                  <div className="text-xs text-white/50">Triggers EAL-aware differentiation</div>
                </div>
                <Switch
                  checked={local.eal}
                  onCheckedChange={(v) => setLocal((s) => ({ ...s, eal: v }))}
                />
              </section>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="text-xs uppercase tracking-wider text-white/50">
                    First language
                  </label>
                  <Input
                    value={local.first_language}
                    onChange={(e) => setLocal((s) => ({ ...s, first_language: e.target.value }))}
                    placeholder="e.g. English"
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-white/50">Pronouns</label>
                  <Input
                    value={local.pronouns}
                    onChange={(e) => setLocal((s) => ({ ...s, pronouns: e.target.value }))}
                    placeholder="e.g. he/him, they/them"
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-white/50">
                  EHCP reference
                </label>
                <Input
                  value={local.ehcp_ref}
                  onChange={(e) => setLocal((s) => ({ ...s, ehcp_ref: e.target.value }))}
                  placeholder="Local authority EHCP reference number"
                  className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-white/50">
                  Accessibility notes
                </label>
                <Textarea
                  rows={4}
                  value={local.accessibility_notes}
                  onChange={(e) =>
                    setLocal((s) => ({ ...s, accessibility_notes: e.target.value }))
                  }
                  placeholder="e.g. extra time in assessments, coloured overlays, scribe for diagrams, seat near front…"
                  className="touch-manipulation text-base border-white/30 focus:border-yellow-500"
                />
              </div>
            </div>
          )}

          <div className="border-t border-white/10 p-4 flex justify-end gap-2">
            <SecondaryButton onClick={() => onOpenChange(false)}>Cancel</SecondaryButton>
            <PrimaryButton onClick={handleSave} disabled={saving || loading}>
              {saving ? 'Saving…' : 'Save'}
            </PrimaryButton>
          </div>
        </SheetShell>
      </SheetContent>
    </Sheet>
  );
}
