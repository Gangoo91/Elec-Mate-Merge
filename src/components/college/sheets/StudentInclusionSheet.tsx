import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  chipBase,
  chipOff,
  chipOn,
  grid2Cn,
  inputCn,
  labelCn,
  textareaCn,
} from '@/components/forms/fieldStyles';
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
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow={studentName ? `Inclusion · ${studentName}` : 'Inclusion'}
      title="Inclusion and adjustments"
      description="SEND needs, English as an additional language, EHCP reference and the adjustments this learner needs."
      bodyClassName="grid grid-cols-1 items-start gap-x-10 gap-y-6 lg:grid-cols-2"
      footer={
        <div className="grid grid-cols-2 gap-2.5">
          <button type="button" onClick={() => onOpenChange(false)} className={buttonSecondaryCn}>
            Cancel
          </button>
          <button type="button" onClick={handleSave} disabled={saving || loading} className={buttonPrimaryCn}>
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      }
    >
      {loading ? (
        <p className="text-[13px] text-white lg:col-span-2">Loading…</p>
      ) : (
        <>
          <section className="min-w-0">
            <h3 className="text-[15px] font-semibold text-white">SEND needs</h3>
            <p className="mt-0.5 text-[12.5px] text-white">Tick every one that applies.</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {SEND_FLAG_KEYS.map((k) => {
                const active = local.flags.includes(k);
                return (
                  <button
                    key={k}
                    type="button"
                    aria-pressed={active}
                    onClick={() => toggle(k)}
                    className={cn(chipBase, 'h-auto min-h-[44px] px-3 py-2 text-left text-[13px] leading-snug', active ? chipOn : chipOff)}
                  >
                    {SEND_FLAG_LABEL[k]}
                  </button>
                );
              })}
            </div>
          </section>

          <section className="min-w-0 space-y-5 border-t border-white/[0.08] pt-5 lg:border-t-0 lg:pt-0">
            <div>
              <p className={labelCn}>English as an additional language</p>
              <div className="mt-1 grid grid-cols-2 gap-2">
                {[
                  { v: true, label: 'Yes' },
                  { v: false, label: 'No' },
                ].map((o) => (
                  <button
                    key={o.label}
                    type="button"
                    aria-pressed={local.eal === o.v}
                    onClick={() => setLocal((s) => ({ ...s, eal: o.v }))}
                    className={cn(chipBase, local.eal === o.v ? chipOn : chipOff)}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
              <p className="mt-1.5 text-[12px] text-white">Yes turns on EAL-aware differentiation.</p>
            </div>

            <div className={grid2Cn}>
              <div>
                <label className={labelCn} htmlFor="si-lang">
                  First language
                </label>
                <input
                  id="si-lang"
                  value={local.first_language}
                  onChange={(e) => setLocal((s) => ({ ...s, first_language: e.target.value }))}
                  placeholder="e.g. English"
                  className={inputCn}
                />
              </div>
              <div>
                <label className={labelCn} htmlFor="si-pron">
                  Pronouns
                </label>
                <input
                  id="si-pron"
                  value={local.pronouns}
                  onChange={(e) => setLocal((s) => ({ ...s, pronouns: e.target.value }))}
                  placeholder="e.g. he/him, they/them"
                  className={inputCn}
                />
              </div>
            </div>

            <div>
              <label className={labelCn} htmlFor="si-ehcp">
                EHCP reference
              </label>
              <input
                id="si-ehcp"
                value={local.ehcp_ref}
                onChange={(e) => setLocal((s) => ({ ...s, ehcp_ref: e.target.value }))}
                placeholder="Local authority EHCP reference number"
                className={inputCn}
              />
            </div>
          </section>

          <div className="border-t border-white/[0.08] pt-5 lg:col-span-2">
            <label className={labelCn} htmlFor="si-notes">
              Adjustments and accessibility notes
            </label>
            <textarea
              id="si-notes"
              rows={4}
              value={local.accessibility_notes}
              onChange={(e) => setLocal((s) => ({ ...s, accessibility_notes: e.target.value }))}
              placeholder="e.g. extra time in assessments, coloured overlays, scribe for diagrams, seat near the front"
              className={textareaCn}
            />
          </div>
        </>
      )}
    </FormSheet>
  );
}
