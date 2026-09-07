import { useState } from 'react';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { HubSectionHeading } from '@/components/hub/HubPrimitives';
import { updateCollegeStudent } from '@/services/college/collegeStudentService';
import { useToast } from '@/hooks/use-toast';

/* ==========================================================================
   SectionSupportNeeds — the learner's inclusion profile in Student 360.

   This is where the support team / SENCO enriches SEND, EAL, EHCP, language and
   access arrangements after the roster is imported. It's the same data the
   cohort-aware lesson planner and ILP tailoring read — so filling it here makes
   the AI differentiation real instead of running on nulls.

   Hub language: heading + quiet volt text action, one CARD_SURFACE card.
   The editor uses the app's form controls — underline inputs, solid volt
   chips for a selected option (the translucent volt chip went muddy), 44px
   targets throughout.
   ========================================================================== */

const SEND_OPTIONS = [
  'Dyslexia',
  'Dyscalculia',
  'Dyspraxia',
  'ADHD',
  'Autism / ASD',
  'SEMH',
  'Hearing impairment',
  'Visual impairment',
  'Physical disability',
  'Speech & language',
];

interface Props {
  id: string;
  collegeStudentId: string;
  sendFlags: string[];
  eal: boolean;
  ehcpRef: string | null;
  accessibilityNotes: string | null;
  firstLanguage: string | null;
  pronouns: string | null;
  onSaved: () => void;
}

const ACTION_BTN =
  '-my-2 flex h-11 shrink-0 items-center px-2 text-[12px] font-bold text-elec-yellow transition-colors touch-manipulation';

const chip = (on: boolean) =>
  cn(
    'h-11 rounded-full border px-4 text-[12.5px] transition-colors touch-manipulation',
    on
      ? 'border-elec-yellow bg-elec-yellow font-semibold text-black'
      : 'border-white/[0.12] bg-white/[0.06] font-medium text-white'
  );

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white placeholder:text-white/25 caret-elec-yellow transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none [color-scheme:dark] touch-manipulation';

const labelCn = 'mb-1 block text-[12px] font-medium text-white';

export function SectionSupportNeeds({
  id,
  collegeStudentId,
  sendFlags,
  eal,
  ehcpRef,
  accessibilityNotes,
  firstLanguage,
  pronouns,
  onSaved,
}: Props) {
  const { toast } = useToast();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [flags, setFlags] = useState<string[]>(sendFlags);
  const [ealOn, setEalOn] = useState(eal);
  const [ehcp, setEhcp] = useState(ehcpRef ?? '');
  const [lang, setLang] = useState(firstLanguage ?? '');
  const [prn, setPrn] = useState(pronouns ?? '');
  const [notes, setNotes] = useState(accessibilityNotes ?? '');

  const startEdit = () => {
    setFlags(sendFlags);
    setEalOn(eal);
    setEhcp(ehcpRef ?? '');
    setLang(firstLanguage ?? '');
    setPrn(pronouns ?? '');
    setNotes(accessibilityNotes ?? '');
    setEditing(true);
  };

  const toggleFlag = (f: string) =>
    setFlags((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]));

  const save = async () => {
    setSaving(true);
    try {
      const res = await updateCollegeStudent(collegeStudentId, {
        send_flags: flags.length ? flags : null,
        eal: ealOn,
        ehcp_ref: ehcp.trim() || null,
        first_language: lang.trim() || null,
        pronouns: prn.trim() || null,
        accessibility_notes: notes.trim() || null,
      });
      if (!res) throw new Error('Save failed — check your permissions.');
      toast({ title: 'Support details saved' });
      setEditing(false);
      onSaved();
    } catch (e) {
      toast({
        title: 'Could not save',
        description: (e as Error).message,
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const hasAny =
    sendFlags.length > 0 || eal || !!ehcpRef || !!accessibilityNotes || !!firstLanguage || !!pronouns;

  return (
    <section id={id} className="scroll-mt-20 space-y-3">
      <div className="flex items-end justify-between gap-4">
        <HubSectionHeading>Support &amp; needs</HubSectionHeading>
        {!editing && (
          <button type="button" onClick={startEdit} className={cn(ACTION_BTN, 'no-print')}>
            {hasAny ? 'Edit' : 'Add support details'}
          </button>
        )}
      </div>

      <div className={cn('rounded-2xl border border-elec-yellow/35 px-4 py-4 sm:px-5', CARD_SURFACE)}>
        {editing ? (
          <div className="space-y-5">
            <div>
              <div className={labelCn}>SEND</div>
              <div className="flex flex-wrap gap-2">
                {SEND_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => toggleFlag(opt)}
                    className={chip(flags.includes(opt))}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="block">
                <span className={labelCn}>First language</span>
                <input className={inputCn} value={lang} onChange={(e) => setLang(e.target.value)} placeholder="English" />
              </label>
              <label className="block">
                <span className={labelCn}>Pronouns</span>
                <input className={inputCn} value={prn} onChange={(e) => setPrn(e.target.value)} placeholder="e.g. they/them" />
              </label>
              <label className="block">
                <span className={labelCn}>EHCP reference</span>
                <input className={inputCn} value={ehcp} onChange={(e) => setEhcp(e.target.value)} placeholder="EHCP number (if any)" />
              </label>
              <div className="block">
                <span className={labelCn}>English as an additional language</span>
                <div className="flex gap-2">
                  <button type="button" onClick={() => setEalOn(true)} className={chip(ealOn)}>
                    Yes
                  </button>
                  <button type="button" onClick={() => setEalOn(false)} className={chip(!ealOn)}>
                    No
                  </button>
                </div>
              </div>
            </div>
            <label className="block">
              <span className={labelCn}>Access arrangements / notes</span>
              <textarea
                className={cn(inputCn, 'min-h-[88px] resize-y py-2.5')}
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Extra time, reader, rest breaks, assistive tech…"
              />
            </label>
            <div className="flex flex-col-reverse gap-2 pt-1 sm:flex-row sm:items-center sm:justify-end">
              <button
                type="button"
                onClick={() => setEditing(false)}
                disabled={saving}
                className="h-11 rounded-full px-5 text-[13px] font-medium text-white transition-colors touch-manipulation hover:bg-white/[0.06] disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={save}
                disabled={saving}
                className="h-11 w-full rounded-full bg-elec-yellow px-5 text-[13px] font-semibold text-black transition-colors touch-manipulation hover:bg-elec-yellow/90 disabled:bg-white/[0.08] disabled:text-white sm:w-auto"
              >
                {saving ? 'Saving…' : 'Save'}
              </button>
            </div>
          </div>
        ) : hasAny ? (
          <dl className="space-y-3.5">
            {sendFlags.length > 0 && (
              <Row label="SEND">
                <div className="flex flex-wrap gap-1.5">
                  {sendFlags.map((f) => (
                    <span
                      key={f}
                      className="inline-flex items-center rounded-full border border-white/[0.14] bg-white/[0.06] px-2.5 py-1 text-[11.5px] font-medium text-white"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </Row>
            )}
            {(eal || firstLanguage) && (
              <Row label="Language">
                <span className="text-[13.5px] text-white">
                  {firstLanguage ?? 'Not recorded'}
                  {eal && <span className="ml-2 font-semibold text-elec-yellow">· EAL</span>}
                </span>
              </Row>
            )}
            {pronouns && (
              <Row label="Pronouns">
                <span className="text-[13.5px] text-white">{pronouns}</span>
              </Row>
            )}
            {ehcpRef && (
              <Row label="EHCP">
                <span className="font-mono text-[13.5px] text-white">{ehcpRef}</span>
              </Row>
            )}
            {accessibilityNotes && (
              <Row label="Access arrangements">
                <span className="whitespace-pre-wrap text-[13.5px] leading-relaxed text-white">
                  {accessibilityNotes}
                </span>
              </Row>
            )}
          </dl>
        ) : (
          <p className="text-[12.5px] leading-relaxed text-white">
            No support needs recorded yet. These power tailored lesson plans and ILPs — add them so
            differentiation is right from day one.
          </p>
        )}
      </div>
    </section>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:gap-4">
      <dt className="shrink-0 pt-0.5 text-[12px] font-medium text-white sm:w-40">{label}</dt>
      <dd className="min-w-0 flex-1">{children}</dd>
    </div>
  );
}
