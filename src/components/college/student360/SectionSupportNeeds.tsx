import { useState } from 'react';
import { updateCollegeStudent } from '@/services/college/collegeStudentService';
import { useToast } from '@/hooks/use-toast';

/* ==========================================================================
   SectionSupportNeeds — the learner's inclusion profile in Student 360.

   This is where the support team / SENCO enriches SEND, EAL, EHCP, language and
   access arrangements after the roster is imported. It's the same data the
   cohort-aware lesson planner and ILP tailoring read — so filling it here makes
   the AI differentiation real instead of running on nulls.
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

const chip = (on: boolean) =>
  `h-8 px-3 rounded-full text-[12px] border transition-colors touch-manipulation ${
    on
      ? 'bg-elec-yellow/[0.12] border-elec-yellow/40 text-elec-yellow font-medium'
      : 'bg-white/[0.03] border-white/[0.10] text-white hover:border-white/[0.22]'
  }`;

const inputCls =
  'w-full h-11 px-3 rounded-lg bg-white/[0.03] border border-white/[0.08] text-[14px] text-white placeholder:text-white/70 focus:outline-none focus:border-white/30 touch-manipulation';

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
    <section id={id} className="scroll-mt-6">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
            Inclusion
          </div>
          <h2 className="mt-1.5 text-xl sm:text-[26px] font-semibold text-white tracking-tight leading-tight">
            Support &amp; needs
          </h2>
        </div>
        {!editing && (
          <div className="flex items-center gap-3 flex-wrap no-print">
            <button
              type="button"
              onClick={startEdit}
              className="text-[12px] font-medium text-elec-yellow/85 hover:text-elec-yellow transition-colors"
            >
              {hasAny ? 'Edit →' : 'Add support details →'}
            </button>
          </div>
        )}
      </div>

      <div className="mt-4 bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-5 sm:px-6 py-5">
        {editing ? (
          <div className="space-y-4">
            <div>
              <div className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-white/55 mb-1.5">
                SEND
              </div>
              <div className="flex flex-wrap gap-1.5">
                {SEND_OPTIONS.map((opt) => (
                  <button key={opt} type="button" onClick={() => toggleFlag(opt)} className={chip(flags.includes(opt))}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="block">
                <span className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-white/55">First language</span>
                <input className={`${inputCls} mt-1.5`} value={lang} onChange={(e) => setLang(e.target.value)} placeholder="English" />
              </label>
              <label className="block">
                <span className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-white/55">Pronouns</span>
                <input className={`${inputCls} mt-1.5`} value={prn} onChange={(e) => setPrn(e.target.value)} placeholder="e.g. they/them" />
              </label>
              <label className="block">
                <span className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-white/55">EHCP reference</span>
                <input className={`${inputCls} mt-1.5`} value={ehcp} onChange={(e) => setEhcp(e.target.value)} placeholder="EHCP number (if any)" />
              </label>
              <div className="block">
                <span className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-white/55">EAL</span>
                <button
                  type="button"
                  onClick={() => setEalOn((v) => !v)}
                  className={`mt-1.5 h-11 px-4 rounded-lg text-[13px] font-medium border transition-colors touch-manipulation w-full text-left ${
                    ealOn
                      ? 'bg-elec-yellow/[0.12] border-elec-yellow/40 text-elec-yellow'
                      : 'bg-white/[0.03] border-white/[0.10] text-white'
                  }`}
                >
                  {ealOn ? 'Yes — English as additional language' : 'No'}
                </button>
              </div>
            </div>
            <label className="block">
              <span className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-white/55">Access arrangements / notes</span>
              <textarea
                className={`${inputCls} mt-1.5 min-h-[88px] py-2.5 resize-y`}
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Extra time, reader, rest breaks, assistive tech…"
              />
            </label>
            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setEditing(false)}
                disabled={saving}
                className="h-10 px-4 rounded-lg text-[13px] font-medium text-white hover:bg-white/[0.04] transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={save}
                disabled={saving}
                className="h-10 px-4 rounded-lg text-[13px] font-semibold text-black bg-elec-yellow hover:bg-elec-yellow/90 transition-colors disabled:opacity-50"
              >
                {saving ? 'Saving…' : 'Save'}
              </button>
            </div>
          </div>
        ) : hasAny ? (
          <div className="space-y-3.5">
            {sendFlags.length > 0 && (
              <Row label="SEND">
                <div className="flex flex-wrap gap-1.5">
                  {sendFlags.map((f) => (
                    <span key={f} className="inline-flex items-center h-6 px-2 rounded-md border border-elec-yellow/30 bg-elec-yellow/[0.08] text-[11.5px] font-medium text-elec-yellow">
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
                  {eal && <span className="ml-2 text-amber-200">· EAL</span>}
                </span>
              </Row>
            )}
            {pronouns && <Row label="Pronouns"><span className="text-[13.5px] text-white">{pronouns}</span></Row>}
            {ehcpRef && <Row label="EHCP"><span className="text-[13.5px] text-white font-mono">{ehcpRef}</span></Row>}
            {accessibilityNotes && (
              <Row label="Access arrangements">
                <span className="text-[13.5px] text-white leading-relaxed whitespace-pre-wrap">{accessibilityNotes}</span>
              </Row>
            )}
          </div>
        ) : (
          <p className="text-[13px] text-white/55 leading-relaxed">
            No support needs recorded yet. These power tailored lesson plans and ILPs — add them
            so differentiation is right from day one.
          </p>
        )}
      </div>
    </section>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-4">
      <span className="shrink-0 w-36 text-[10.5px] font-medium uppercase tracking-[0.18em] text-white/45 pt-1">
        {label}
      </span>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
