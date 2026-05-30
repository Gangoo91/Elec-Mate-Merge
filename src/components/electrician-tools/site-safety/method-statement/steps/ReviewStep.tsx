import { useState } from 'react';
import { MethodStatementData } from '@/types/method-statement';
import {
  downloadMethodStatementPDF,
  generateMethodStatementPDFPreview,
} from '@/utils/method-statement-pdf';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  StatStrip,
  FormCard,
  Field,
  Eyebrow,
  ListCard,
  PrimaryButton,
  SecondaryButton,
  inputClass,
} from '@/components/college/primitives';

interface ReviewStepProps {
  data: MethodStatementData;
  onDataChange: (updates: Partial<MethodStatementData>) => void;
  onBack: () => void;
}

const RISK_PILL: Record<string, string> = {
  low: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25',
  medium: 'bg-amber-500/10 text-amber-400 border-amber-500/25',
  high: 'bg-red-500/10 text-red-400 border-red-500/25',
};

function RiskPill({ level }: { level: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-[0.12em] border whitespace-nowrap',
        RISK_PILL[level] ?? 'bg-white/[0.05] text-white/55 border-white/10'
      )}
    >
      {level}
    </span>
  );
}

function accentBar(level: string) {
  return cn(
    'w-[3px] self-stretch rounded-full shrink-0',
    level === 'low' ? 'bg-emerald-400' : level === 'high' ? 'bg-red-400' : 'bg-amber-400'
  );
}

const ReviewStep = ({ data, onDataChange, onBack }: ReviewStepProps) => {
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const totalSteps = data.steps.length;
  const highRiskSteps = data.steps.filter((step) => step.riskLevel === 'high').length;
  const totalSafetyReqs = data.steps.reduce((acc, step) => acc + step.safetyRequirements.length, 0);

  const exportToPDF = async () => {
    if (!data.jobTitle.trim()) {
      toast({
        title: 'Missing Information',
        description: 'Please provide a job title before exporting.',
        variant: 'destructive',
      });
      return;
    }
    setIsExporting(true);
    try {
      downloadMethodStatementPDF(data, { companyName: 'Your Company', includeSignatures: true });
      toast({
        title: 'PDF Downloaded',
        description: 'Method statement PDF has been downloaded successfully.',
        variant: 'success',
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: 'Export Failed',
        description: 'Failed to generate PDF. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsExporting(false);
    }
  };

  const generateDocument = async () => {
    if (!data.jobTitle.trim()) {
      toast({
        title: 'Missing Information',
        description: 'Please provide a job title before generating document.',
        variant: 'destructive',
      });
      return;
    }
    setIsGenerating(true);
    try {
      const previewUrl = generateMethodStatementPDFPreview(data, {
        companyName: 'Your Company',
        includeSignatures: true,
      });
      window.open(previewUrl, '_blank');
      toast({
        title: 'Document Generated',
        description: 'Method statement document has been generated and opened in a new tab.',
        variant: 'success',
      });
    } catch (error) {
      console.error('Error generating document:', error);
      toast({
        title: 'Generation Failed',
        description: 'Failed to generate document. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const detailRows: { label: string; value: string }[] = [
    { label: 'Job title', value: data.jobTitle },
    { label: 'Location', value: data.location },
    { label: 'Contractor', value: data.contractor },
    { label: 'Supervisor', value: data.supervisor },
    { label: 'Work type', value: data.workType },
  ];

  return (
    <div className="space-y-5">
      {/* Summary */}
      <StatStrip
        stats={[
          { value: totalSteps, label: 'Steps' },
          { value: highRiskSteps, label: 'High risk', tone: highRiskSteps > 0 ? 'red' : undefined },
          { value: totalSafetyReqs, label: 'Safety reqs' },
          { value: data.duration || 'TBD', label: 'Duration' },
        ]}
      />

      {/* High-risk notice */}
      {highRiskSteps > 0 && (
        <div className="p-3 rounded-xl bg-red-500/[0.08] border border-red-500/20">
          <p className="text-[12px] text-white/85">
            This method statement contains {highRiskSteps} high-risk step
            {highRiskSteps !== 1 ? 's' : ''}. Ensure additional supervision and safety measures are
            in place.
          </p>
        </div>
      )}

      {/* Job details */}
      <FormCard eyebrow="Job details">
        <div className="space-y-2.5">
          {detailRows.map((row) => (
            <div key={row.label} className="flex items-baseline justify-between gap-4">
              <span className="text-[11.5px] uppercase tracking-[0.12em] text-white/45">
                {row.label}
              </span>
              <span className="text-[13px] text-white text-right min-w-0 truncate">
                {row.value || '—'}
              </span>
            </div>
          ))}
          <div className="flex items-baseline justify-between gap-4">
            <span className="text-[11.5px] uppercase tracking-[0.12em] text-white/45">
              Overall risk
            </span>
            <RiskPill level={data.overallRiskLevel} />
          </div>
        </div>
        {data.description && (
          <div className="pt-1">
            <Eyebrow className="mb-1.5">Description</Eyebrow>
            <p className="text-[12.5px] text-white/75 leading-relaxed">{data.description}</p>
          </div>
        )}
        <SecondaryButton size="sm" onClick={onBack}>
          Edit details
        </SecondaryButton>
      </FormCard>

      {/* Method steps */}
      <div className="space-y-2">
        <Eyebrow>Method steps ({data.steps.length})</Eyebrow>
        <ListCard>
          {data.steps.map((step) => (
            <div key={step.id} className="flex items-start gap-3 px-4 sm:px-5 py-4">
              <span className={accentBar(step.riskLevel)} />
              <div className="h-7 w-7 rounded-full bg-elec-yellow/20 text-elec-yellow flex items-center justify-center font-semibold text-[12px] shrink-0">
                {step.stepNumber}
              </div>
              <div className="flex-1 min-w-0 space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[14px] font-medium text-white">{step.title}</span>
                  {step.estimatedDuration && (
                    <span className="text-[11px] text-white/45 tabular-nums">
                      {step.estimatedDuration}
                    </span>
                  )}
                </div>
                {step.description && (
                  <p className="text-[12.5px] text-white/70 leading-relaxed">{step.description}</p>
                )}
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-white/45">
                  <span>{step.safetyRequirements.length} safety</span>
                  <span>{step.equipmentNeeded.length} equipment</span>
                  <span>{step.qualifications.length} qualifications</span>
                </div>
              </div>
            </div>
          ))}
        </ListCard>
      </div>

      {/* Approval */}
      <FormCard eyebrow="Approval &amp; sign-off">
        <Field label="Approved by">
          <input
            value={data.approvedBy || ''}
            onChange={(e) => onDataChange({ approvedBy: e.target.value })}
            className={inputClass}
            placeholder="Name of approving authority"
          />
        </Field>
        <p className="text-[11.5px] text-white/55">
          Ready for approval and distribution to the site team.
        </p>
      </FormCard>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-2">
        <SecondaryButton fullWidth onClick={exportToPDF} disabled={isExporting}>
          {isExporting ? 'Exporting…' : 'Export PDF'}
        </SecondaryButton>
        <PrimaryButton fullWidth onClick={generateDocument} disabled={isGenerating}>
          {isGenerating ? 'Generating…' : 'Generate document'}
        </PrimaryButton>
      </div>
    </div>
  );
};

export default ReviewStep;
