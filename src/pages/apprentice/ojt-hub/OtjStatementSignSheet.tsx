import { useEffect, useState } from 'react';
import { FormSheet } from '@/components/forms/FormSheet';
import { buttonPrimaryCn, buttonSecondaryCn, inputCn, labelCn } from '@/components/forms/fieldStyles';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { downloadLearnerDocument } from '@/lib/documents/learnerDocuments';
import { signOtjHoursStatement, type OtjHoursStatement } from '@/hooks/useOtjSummary';

/**
 * The apprentice reads and signs their planned-versus-actual hours statement
 * (funding rules 2025/26, paras 92–94). Their college prepared it; their
 * employer signs it separately from a link.
 */
const fmtH = (h: number | null | undefined) =>
  h == null ? '—' : `${Number(h).toLocaleString('en-GB', { maximumFractionDigits: 1 })}h`;

export function OtjStatementSignSheet({
  statement,
  open,
  onOpenChange,
  defaultName,
  onSigned,
}: {
  statement: OtjHoursStatement | null;
  open: boolean;
  onOpenChange: (o: boolean) => void;
  defaultName: string;
  onSigned: () => void;
}) {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [agree, setAgree] = useState(false);
  const [saving, setSaving] = useState(false);
  const [pdfBusy, setPdfBusy] = useState(false);

  useEffect(() => {
    if (open) {
      setName(defaultName);
      setAgree(false);
    }
  }, [open, defaultName]);

  if (!statement) return null;
  const signed = !!statement.learner_signed_at;

  const sign = async () => {
    if (saving || !agree || name.trim().length < 2) return;
    setSaving(true);
    const res = await signOtjHoursStatement(statement.id, name.trim());
    setSaving(false);
    if (res.error || !res.success) {
      toast({ title: 'Not signed', description: res.error ?? 'Try again.', variant: 'destructive' });
      return;
    }
    toast({ title: 'Statement signed', description: 'Your college has it. Your employer signs it separately.' });
    onSigned();
    onOpenChange(false);
  };

  // The statement as a PDFMonkey document (ELE-2017).
  const downloadPdf = async () => {
    if (pdfBusy) return;
    setPdfBusy(true);
    try {
      await downloadLearnerDocument({ kind: 'otj_statement', statementId: statement.id });
    } catch (e) {
      toast({ title: 'Could not make the PDF', description: (e as Error).message, variant: 'destructive' });
    } finally {
      setPdfBusy(false);
    }
  };

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      eyebrow="Off-the-job hours statement"
      title={signed ? 'You have signed this' : 'Read and sign'}
      description={`Prepared by ${statement.prepared_by_name ?? 'your college'} because fewer hours were delivered than planned. The funding rules ask you and your employer to sign it.`}
      footer={
        signed ? (
          <button type="button" onClick={() => onOpenChange(false)} className={buttonSecondaryCn}>
            Close
          </button>
        ) : (
          <div className="grid grid-cols-2 gap-2.5">
            <button type="button" onClick={() => onOpenChange(false)} disabled={saving} className={buttonSecondaryCn}>
              Not now
            </button>
            <button
              type="button"
              onClick={sign}
              disabled={saving || !agree || name.trim().length < 2}
              className={buttonPrimaryCn}
            >
              {saving ? 'Signing…' : 'Sign'}
            </button>
          </div>
        )
      }
    >
      <div className="space-y-5">
        <div className="grid grid-cols-3 gap-2.5">
          {[
            ['Planned', fmtH(statement.planned_hours)],
            ['Delivered', fmtH(statement.actual_hours)],
            ['Minimum', fmtH(statement.minimum_hours)],
          ].map(([l, v]) => (
            <div key={l} className="rounded-xl border border-white/[0.12] p-3">
              <p className="text-[11.5px] text-white">{l}</p>
              <p className="mt-1 text-[17px] font-semibold tabular-nums text-white">{v}</p>
            </div>
          ))}
        </div>
        <div>
          <p className={labelCn}>Why fewer hours were delivered</p>
          <p className="whitespace-pre-wrap text-[15px] leading-relaxed text-white">{statement.reason}</p>
        </div>
        <p className="text-[13px] text-white">
          {statement.minimum_met
            ? 'The hours delivered meet the minimum for your apprenticeship.'
            : 'The hours delivered do not yet meet the minimum for your apprenticeship. Talk to your tutor before you sign.'}
        </p>
        {signed ? (
          <div className="space-y-3">
            <p className="text-[14px] text-white">Signed as {statement.learner_signed_name}.</p>
            <button type="button" onClick={downloadPdf} disabled={pdfBusy} className={cn(buttonSecondaryCn, 'h-11')}>
              {pdfBusy ? 'Making the PDF…' : 'Download statement (PDF)'}
            </button>
          </div>
        ) : (
          <>
            <button
              type="button"
              onClick={() => setAgree((v) => !v)}
              aria-pressed={agree}
              className={cn(
                'flex w-full items-start gap-3 rounded-xl border p-3.5 text-left text-[14px] leading-snug text-white touch-manipulation',
                agree ? 'border-elec-yellow' : 'border-white/[0.12]'
              )}
            >
              <span
                className={cn(
                  'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border text-[12px] font-bold',
                  agree ? 'border-elec-yellow bg-elec-yellow text-black' : 'border-white/40'
                )}
              >
                {agree ? '✓' : ''}
              </span>
              I am satisfied with the off-the-job training I received, even though it was less than planned.
            </button>
            <div>
              <label className={labelCn} htmlFor="stmt-sign-name">Type your full name to sign</label>
              <input id="stmt-sign-name" value={name} onChange={(e) => setName(e.target.value)} className={inputCn} />
            </div>
          </>
        )}
      </div>
    </FormSheet>
  );
}
