import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, AlertCircle, Info } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ValidationRule {
  field: string;
  label: string;
  isValid: boolean;
  hint?: string;
}

interface StepValidationProps {
  step: number;
  formData: any;
}

export const StepValidation = ({ step, formData }: StepValidationProps) => {
  const getStepRules = (): ValidationRule[] => {
    switch (step) {
      case 1: // Basic Info
        return [
          {
            field: 'briefingTitle',
            label: 'Briefing title',
            isValid: formData.briefingTitle?.trim().length > 0,
            hint: 'A clear, descriptive title helps identify the briefing later',
          },
          {
            field: 'location',
            label: 'Location',
            isValid: formData.location?.trim().length > 0,
            hint: 'BS 7671 requires full site address for installation work',
          },
          {
            field: 'contractorCompany',
            label: 'Contractor company',
            isValid: formData.contractorCompany?.trim().length > 0,
            hint: 'Company name is required for official briefing records',
          },
          {
            field: 'conductorName',
            label: 'Briefing conductor',
            isValid: formData.conductorName?.trim().length > 0,
            hint: 'Person responsible for delivering the briefing',
          },
          {
            field: 'briefingDate',
            label: 'Date',
            isValid: !!formData.briefingDate,
            hint: 'When will this briefing take place?',
          },
        ];

      case 2: // Content Details
        return [
          {
            field: 'briefingContent',
            label: 'Work description',
            isValid: formData.briefingContent?.trim().length >= 50,
            hint: 'Provide at least 50 characters for AI to generate quality content (currently: ' + (formData.briefingContent?.length || 0) + ')',
          },
          ...(formData.briefingType === 'site-work' ? [
            {
              field: 'workScope',
              label: 'Work scope',
              isValid: !!formData.workScope,
              hint: 'Select the type of work being performed',
            },
            {
              field: 'environment',
              label: 'Environment type',
              isValid: !!formData.environment,
              hint: 'Environment affects risk level and required precautions',
            },
          ] : []),
        ];

      case 3: // Hazards
        return [
          {
            field: 'identifiedHazards',
            label: 'Identified hazards',
            isValid: formData.identifiedHazards?.length > 0,
            hint: 'Select at least one hazard (or add custom hazards)',
          },
          {
            field: 'riskLevel',
            label: 'Risk level',
            isValid: !!formData.riskLevel,
            hint: 'Risk level determines PPE and control measures required',
          },
        ];

      case 4: // AI Generated
        return [
          {
            field: 'briefingDescription',
            label: 'Briefing description',
            isValid: formData.briefingDescription?.trim().length > 0,
            hint: 'Generate AI content or write your own description',
          },
          {
            field: 'hazards',
            label: 'Hazards & controls',
            isValid: formData.hazards?.trim().length > 0,
            hint: 'Detailed hazards and control measures',
          },
          {
            field: 'safetyWarning',
            label: 'Safety warning',
            isValid: formData.safetyWarning?.trim().length > 0,
            hint: 'Key safety warnings for the team',
          },
        ];

      default:
        return [];
    }
  };

  const rules = getStepRules();
  if (rules.length === 0) return null;

  const validCount = rules.filter(r => r.isValid).length;
  const totalCount = rules.length;
  const completionPercentage = (validCount / totalCount) * 100;
  const isComplete = validCount === totalCount;

  return (
    <div className="space-y-3 p-4 bg-card/30 rounded-lg border border-primary/20">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-elec-light flex items-center gap-2">
          {isComplete ? (
            <>
              <CheckCircle2 className="h-4 w-4 text-green-400" />
              Step Complete
            </>
          ) : (
            <>
              <Info className="h-4 w-4 text-elec-yellow" />
              Complete This Step
            </>
          )}
        </h4>
        <span className="text-xs text-elec-light/60">
          {validCount}/{totalCount} fields
        </span>
      </div>

      <Progress value={completionPercentage} className="h-1.5" />

      <ul className="space-y-2">
        {rules.map((rule) => (
          <li key={rule.field} className="flex items-start gap-2 text-sm">
            {rule.isValid ? (
              <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
            ) : (
              <AlertCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
            )}
            <div className="flex-1">
              <span className={rule.isValid ? 'text-elec-light/70 line-through' : 'text-elec-light'}>
                {rule.label}
              </span>
              {!rule.isValid && rule.hint && (
                <p className="text-xs text-elec-light/60 mt-0.5">{rule.hint}</p>
              )}
            </div>
          </li>
        ))}
      </ul>

      {!isComplete && (
        <Alert className="mt-3 bg-elec-yellow/5 border-elec-yellow/20">
          <Info className="h-4 w-4 text-elec-yellow" />
          <AlertDescription className="text-xs text-elec-light/70">
            Fill in all required fields to continue to the next step
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};
