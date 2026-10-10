import { useEffect, useState, type ReactNode } from 'react';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  fieldFullCn,
  grid2Cn,
  infoPanelCn,
  inputCn,
  labelCn,
  textareaCn,
} from '@/components/forms/fieldStyles';
import { chipCn } from '@/components/college/ui/CollegeUi';
import { useToast } from '@/hooks/use-toast';
import {
  CSC_CASE_LABEL,
  SG_DECISION_LABEL,
  saveSafeguardingDecision,
  setSafeguardingLearnerStatus,
  type CscCaseType,
  type SgDecision,
  type SgDecisionRow,
  type SgLearnerStatus,
} from '@/hooks/useSafeguardingRecords';

/* ==========================================================================
   SafeguardingDecisionSheet (ELE-2043): the lead records their decision on a
   concern and the reasons for it (KCSIE 2026 para 74), any referral to local
   authority children's social care, the LADO (para 78) or Channel (para 151)
   with the date and reference, and whether the learner has an open children's
   social care case (para 218). Leads only: the tables and functions behind it
   refuse anyone else.
   ========================================================================== */

const todayIso = () =>
  new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/London' }).format(new Date());

export function SafeguardingDecisionSheet({
  open,
  onOpenChange,
  noteId,
  studentId,
  studentName,
  current,
  status,
  onSaved,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  noteId: string;
  studentId: string;
  studentName: string;
  current: SgDecisionRow | null;
  status: SgLearnerStatus | null;
  onSaved: () => void;
}) {
  const { toast } = useToast();
  const [decision, setDecision] = useState<SgDecision | null>(null);
  const [rationale, setRationale] = useState('');
  const [laOn, setLaOn] = useState('');
  const [laName, setLaName] = useState('');
  const [laRef, setLaRef] = useState('');
  const [ladoOn, setLadoOn] = useState('');
  const [ladoRef, setLadoRef] = useState('');
  const [chOn, setChOn] = useState('');
  const [chRef, setChRef] = useState('');
  const [cscOpen, setCscOpen] = useState(false);
  const [cscType, setCscType] = useState<CscCaseType | null>(null);
  const [cscLa, setCscLa] = useState('');
  const [cscWorker, setCscWorker] = useState('');
  const [cscSince, setCscSince] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    setDecision(current?.decision ?? null);
    setRationale(current?.rationale ?? '');
    setLaOn(current?.la_referral_on ?? '');
    setLaName(current?.la_name ?? '');
    setLaRef(current?.la_reference ?? '');
    setLadoOn(current?.lado_referral_on ?? '');
    setLadoRef(current?.lado_reference ?? '');
    setChOn(current?.channel_referral_on ?? '');
    setChRef(current?.channel_reference ?? '');
    setCscOpen(status?.open_csc_case ?? false);
    setCscType(status?.case_type ?? null);
    setCscLa(status?.local_authority ?? '');
    setCscWorker(status?.social_worker ?? '');
    setCscSince(status?.since ?? '');
  }, [open, current, status]);

  const needsReferralDate = decision === 'referral_made' && !laOn && !ladoOn && !chOn;
  const cscChanged =
    cscOpen !== (status?.open_csc_case ?? false) ||
    (cscOpen &&
      (cscType !== (status?.case_type ?? null) ||
        cscLa !== (status?.local_authority ?? '') ||
        cscWorker !== (status?.social_worker ?? '') ||
        cscSince !== (status?.since ?? '')));
  const cscValid = !cscOpen || (!!cscType && cscLa.trim().length >= 2);
  const valid = !!decision && rationale.trim().length >= 10 && !needsReferralDate && cscValid;

  const save = async () => {
    if (!valid || !decision) return;
    setSaving(true);
    const r = await saveSafeguardingDecision({
      noteId,
      decision,
      rationale: rationale.trim(),
      laOn,
      laName,
      laRef,
      ladoOn,
      ladoRef,
      channelOn: chOn,
      channelRef: chRef,
    });
    let err = r.error;
    if (!err && cscChanged) {
      const s = await setSafeguardingLearnerStatus({
        studentId,
        open: cscOpen,
        caseType: cscType,
        localAuthority: cscLa,
        socialWorker: cscWorker,
        since: cscSince,
      });
      err = s.error;
    }
    setSaving(false);
    if (err) {
      toast({ title: 'Not saved', description: err, variant: 'destructive' });
      return;
    }
    toast({
      title: 'Decision recorded',
      description: current
        ? 'Saved with your name and the date. The earlier decision stays on record.'
        : 'Saved with your name and the date.',
    });
    onSaved();
    onOpenChange(false);
  };

  const max = todayIso();

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow={`Safeguarding · ${studentName}`}
      title={current ? 'Update the decision' : 'Record the decision'}
      description="Your decision and the reasons for it, any referral made, and whether the learner has a social worker. Only safeguarding leads can read this."
      footer={
        <div className="grid grid-cols-2 gap-2.5">
          <button type="button" onClick={() => onOpenChange(false)} className={buttonSecondaryCn}>
            Cancel
          </button>
          <button
            type="button"
            onClick={() => void save()}
            disabled={!valid || saving}
            className={buttonPrimaryCn}
          >
            {saving ? 'Saving…' : 'Save decision'}
          </button>
        </div>
      }
    >
      <div className="space-y-6 lg:grid lg:grid-cols-2 lg:gap-8 lg:space-y-0">
        <div className="space-y-5">
          <div>
            <p className={labelCn}>Decision</p>
            <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Decision">
              {(Object.keys(SG_DECISION_LABEL) as SgDecision[]).map((k) => (
                <button
                  key={k}
                  type="button"
                  role="radio"
                  aria-checked={decision === k}
                  onClick={() => setDecision(k)}
                  className={chipCn(decision === k)}
                >
                  {SG_DECISION_LABEL[k]}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="sg-rationale" className={labelCn}>
              Reasons for the decision
            </label>
            <textarea
              id="sg-rationale"
              value={rationale}
              onChange={(e) => setRationale(e.target.value)}
              rows={6}
              className={textareaCn}
              placeholder="What you considered, who you spoke to, and why this is the right course"
            />
          </div>

          <div className="border-t border-white/[0.1] pt-4">
            <h3 className="text-[14px] font-semibold text-white">
              Children&apos;s social care case
            </h3>
            <p className="mt-1 text-[12.5px] leading-relaxed text-white">
              Does the learner have a social worker? Record it so decisions are made with it in
              mind.
            </p>
            <div className="mt-3 flex gap-2" role="radiogroup" aria-label="Open case">
              <button
                type="button"
                role="radio"
                aria-checked={!cscOpen}
                onClick={() => setCscOpen(false)}
                className={chipCn(!cscOpen)}
              >
                No open case
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={cscOpen}
                onClick={() => setCscOpen(true)}
                className={chipCn(cscOpen)}
              >
                Open case
              </button>
            </div>
            {cscOpen && (
              <div className="mt-4 space-y-4">
                <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Type of case">
                  {(Object.keys(CSC_CASE_LABEL) as CscCaseType[]).map((k) => (
                    <button
                      key={k}
                      type="button"
                      role="radio"
                      aria-checked={cscType === k}
                      onClick={() => setCscType(k)}
                      className={chipCn(cscType === k)}
                    >
                      {CSC_CASE_LABEL[k]}
                    </button>
                  ))}
                </div>
                <div className={grid2Cn}>
                  <div className={fieldFullCn}>
                    <label htmlFor="sg-csc-la" className={labelCn}>
                      Local authority
                    </label>
                    <input
                      id="sg-csc-la"
                      value={cscLa}
                      onChange={(e) => setCscLa(e.target.value)}
                      className={inputCn}
                      placeholder="e.g. Lancashire County Council"
                    />
                  </div>
                  <div>
                    <label htmlFor="sg-csc-worker" className={labelCn}>
                      Social worker
                    </label>
                    <input
                      id="sg-csc-worker"
                      value={cscWorker}
                      onChange={(e) => setCscWorker(e.target.value)}
                      className={inputCn}
                      placeholder="Name or contact"
                    />
                  </div>
                  <div>
                    <label htmlFor="sg-csc-since" className={labelCn}>
                      Since
                    </label>
                    <input
                      id="sg-csc-since"
                      type="date"
                      max={max}
                      value={cscSince}
                      onChange={(e) => setCscSince(e.target.value)}
                      className={inputCn}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-5">
          <div className={infoPanelCn}>
            <p className="text-[12.5px] leading-relaxed text-white">
              Add each referral made with its date and reference.
              {decision === 'referral_made' && ' A referral decision needs at least one date.'}
            </p>
          </div>
          <ReferralBlock
            title="Local authority children's social care"
            idp="sg-la"
            on={laOn}
            setOn={setLaOn}
            refv={laRef}
            setRef={setLaRef}
            max={max}
            extra={
              <div className={fieldFullCn}>
                <label htmlFor="sg-la-name" className={labelCn}>
                  Local authority
                </label>
                <input
                  id="sg-la-name"
                  value={laName}
                  onChange={(e) => setLaName(e.target.value)}
                  className={inputCn}
                  placeholder="Which council"
                />
              </div>
            }
          />
          <ReferralBlock
            title="LADO (concern about a member of staff)"
            idp="sg-lado"
            on={ladoOn}
            setOn={setLadoOn}
            refv={ladoRef}
            setRef={setLadoRef}
            max={max}
          />
          <ReferralBlock
            title="Channel (Prevent)"
            idp="sg-channel"
            on={chOn}
            setOn={setChOn}
            refv={chRef}
            setRef={setChRef}
            max={max}
          />
          {needsReferralDate && (
            <p className="text-[12.5px] font-semibold text-orange-300">
              Add the date of at least one referral.
            </p>
          )}
        </div>
      </div>
    </FormSheet>
  );
}

function ReferralBlock({
  title,
  idp,
  on,
  setOn,
  refv,
  setRef,
  max,
  extra,
}: {
  title: string;
  idp: string;
  on: string;
  setOn: (v: string) => void;
  refv: string;
  setRef: (v: string) => void;
  max: string;
  extra?: ReactNode;
}) {
  return (
    <div className="border-t border-white/[0.1] pt-4">
      <h3 className="text-[14px] font-semibold text-white">{title}</h3>
      <div className={`mt-3 ${grid2Cn}`}>
        <div>
          <label htmlFor={`${idp}-on`} className={labelCn}>
            Referred on
          </label>
          <input
            id={`${idp}-on`}
            type="date"
            max={max}
            value={on}
            onChange={(e) => setOn(e.target.value)}
            className={inputCn}
          />
        </div>
        <div>
          <label htmlFor={`${idp}-ref`} className={labelCn}>
            Reference
          </label>
          <input
            id={`${idp}-ref`}
            value={refv}
            onChange={(e) => setRef(e.target.value)}
            className={inputCn}
            placeholder="Case or referral number"
          />
        </div>
        {extra}
      </div>
    </div>
  );
}
