import React, { useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import SignatureInput from '@/components/signature/SignatureInput';
import LoadTesterButton from './LoadTesterButton';
import { OverdueBadge } from './ValidationBadge';
import { useEmergencyLightingSmartForm } from '@/hooks/inspection/useEmergencyLightingSmartForm';
import type { EmergencyLightingFormData, Luminaire, LuxReading } from '@/types/emergency-lighting';

const inputCn =
  'h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] text-white [color-scheme:dark]';
const textareaCn =
  'touch-manipulation text-base min-h-[80px] bg-white/[0.06] border-white/[0.08] text-white';
const pickerTrigger =
  'h-11 w-full touch-manipulation bg-white/[0.06] border-white/[0.08] text-white';

const SectionHeader = ({ title }: { title: string }) => (
  <div className="border-b border-white/[0.06] pb-1 mb-3">
    <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
    <h2 className="text-xs font-medium text-white uppercase tracking-wider">{title}</h2>
  </div>
);

const Sub = ({ title }: { title: string }) => (
  <div className="flex items-center gap-2 pt-2">
    <p className="text-[10px] font-semibold text-white uppercase tracking-wider shrink-0">
      {title}
    </p>
    <div className="h-px flex-1 bg-white/[0.06]" />
  </div>
);

const Field = ({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) => (
  <div>
    <Label className="text-white text-xs mb-1.5 block">
      {label}
      {required && ' *'}
    </Label>
    {children}
  </div>
);

interface Props {
  formData: EmergencyLightingFormData;
  onUpdate: (
    field: string,
    value: EmergencyLightingFormData[keyof EmergencyLightingFormData]
  ) => void;
}

const EmergencyLightingDeclarations: React.FC<Props> = ({ formData, onUpdate }) => {
  const { calculateTestDates } = useEmergencyLightingSmartForm();

  const handleLoadTesterDetails = (details: {
    testerName: string;
    testerCompany: string;
    testerQualifications: string;
    testerSignature: string;
    testerDate: string;
  }) => {
    onUpdate('testerName', details.testerName);
    onUpdate('testerCompany', details.testerCompany);
    onUpdate('testerQualifications', details.testerQualifications);
    onUpdate('testerDate', details.testerDate);
    if (details.testerSignature) onUpdate('testerSignature', details.testerSignature);
  };

  const isComplete =
    formData.testerName &&
    formData.testerSignature &&
    formData.responsiblePersonName &&
    formData.responsiblePersonSignature;

  const testDates = useMemo(
    () =>
      calculateTestDates(
        formData.monthlyFunctionalTest?.date || formData.testDate,
        formData.annualDurationTest?.date || formData.testDate
      ),
    [
      formData.testDate,
      formData.monthlyFunctionalTest?.date,
      formData.annualDurationTest?.date,
      calculateTestDates,
    ]
  );

  const calculateNextMonthly = () => {
    const d = new Date(formData.testDate || new Date().toISOString().split('T')[0]);
    d.setMonth(d.getMonth() + 1);
    return d.toISOString().split('T')[0];
  };
  const calculateNextAnnual = () => {
    const d = new Date(formData.testDate || new Date().toISOString().split('T')[0]);
    d.setFullYear(d.getFullYear() + 1);
    return d.toISOString().split('T')[0];
  };

  return (
    <div className="space-y-6">
      {/* Tester Declaration */}
      <div className="space-y-4">
        <SectionHeader title="Tester Declaration" />
        <LoadTesterButton onLoad={handleLoadTesterDetails} className="h-11 border-white/[0.08]" />
        <div className="rounded-lg bg-white/[0.03] border border-white/[0.06] p-3">
          <p className="text-[11px] text-white leading-relaxed">
            I certify that the emergency lighting system has been inspected and tested in accordance
            with BS 5266, and the results are as recorded in this certificate.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Name" required>
            <Input
              value={formData.testerName || ''}
              onChange={(e) => onUpdate('testerName', e.target.value)}
              className={inputCn}
              placeholder="Full name"
            />
          </Field>
          <Field label="Company">
            <Input
              value={formData.testerCompany || ''}
              onChange={(e) => onUpdate('testerCompany', e.target.value)}
              className={inputCn}
            />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Qualifications">
            <Input
              value={formData.testerQualifications || ''}
              onChange={(e) => onUpdate('testerQualifications', e.target.value)}
              className={inputCn}
              placeholder="C&G 2391"
            />
          </Field>
          <Field label="Date">
            <Input
              type="date"
              value={formData.testerDate || new Date().toISOString().split('T')[0]}
              onChange={(e) => onUpdate('testerDate', e.target.value)}
              className={inputCn}
            />
          </Field>
        </div>
        <SignatureInput
          label="Tester Signature *"
          value={formData.testerSignature}
          onChange={(sig) => onUpdate('testerSignature', sig)}
          placeholder="Draw or type signature"
          required
        />
      </div>

      {/* Client Representative */}
      <div className="space-y-4">
        <SectionHeader title="Client Representative" />
        <div className="rounded-lg bg-white/[0.03] border border-white/[0.06] p-3">
          <p className="text-[11px] text-white leading-relaxed">
            The responsible person at the premises acknowledges receipt of the test results per BS
            5266-1.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Name" required>
            <Input
              value={formData.responsiblePersonName || ''}
              onChange={(e) => onUpdate('responsiblePersonName', e.target.value)}
              className={inputCn}
              placeholder="Full name"
            />
          </Field>
          <Field label="Position">
            <Input
              value={formData.responsiblePersonPosition || ''}
              onChange={(e) => onUpdate('responsiblePersonPosition', e.target.value)}
              className={inputCn}
              placeholder="Facilities Manager"
            />
          </Field>
        </div>
        <Field label="Date">
          <Input
            type="date"
            value={formData.responsiblePersonDate || new Date().toISOString().split('T')[0]}
            onChange={(e) => onUpdate('responsiblePersonDate', e.target.value)}
            className={inputCn}
          />
        </Field>
        <SignatureInput
          label="Responsible Person Signature *"
          value={formData.responsiblePersonSignature}
          onChange={(sig) => onUpdate('responsiblePersonSignature', sig)}
          placeholder="Draw or type signature"
          required
        />
      </div>

      {/* Service Schedule */}
      <div className="space-y-4">
        <SectionHeader title="Service Schedule" />
        <div className="rounded-lg bg-white/[0.03] border border-white/[0.06] p-3 space-y-1">
          <p className="text-[11px] font-semibold text-white">BS 5266 Test Schedule</p>
          <p className="text-[10px] text-white">
            Daily — visual inspection | Monthly — flick test | Annually — full duration test |
            3-yearly — full inspection
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Label className="text-white text-xs">Next Monthly Due</Label>
              {testDates.monthlyOverdue && (
                <OverdueBadge
                  daysOverdue={Math.abs(testDates.daysUntilMonthly)}
                  testType="monthly"
                />
              )}
            </div>
            <Input
              type="date"
              value={formData.nextMonthlyTestDue || calculateNextMonthly()}
              onChange={(e) => onUpdate('nextMonthlyTestDue', e.target.value)}
              className={cn(inputCn, testDates.monthlyOverdue && 'border-red-500/50')}
            />
            {!testDates.monthlyOverdue && testDates.daysUntilMonthly > 0 && (
              <p className="text-[10px] text-white mt-1">{testDates.daysUntilMonthly} days</p>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Label className="text-white text-xs">Next Annual Due</Label>
              {testDates.annualOverdue && (
                <OverdueBadge daysOverdue={Math.abs(testDates.daysUntilAnnual)} testType="annual" />
              )}
            </div>
            <Input
              type="date"
              value={formData.nextAnnualTestDue || calculateNextAnnual()}
              onChange={(e) => onUpdate('nextAnnualTestDue', e.target.value)}
              className={cn(inputCn, testDates.annualOverdue && 'border-red-500/50')}
            />
            {!testDates.annualOverdue && testDates.daysUntilAnnual > 0 && (
              <p className="text-[10px] text-white mt-1">{testDates.daysUntilAnnual} days</p>
            )}
          </div>
        </div>
        <Field label="Next 3-Yearly Inspection Due">
          <Input
            type="date"
            value={formData.nextThreeYearlyInspectionDue || ''}
            onChange={(e) => onUpdate('nextThreeYearlyInspectionDue', e.target.value)}
            className={inputCn}
          />
        </Field>
        <Field label="Recommendations">
          <Textarea
            value={formData.recommendations || ''}
            onChange={(e) => onUpdate('recommendations', e.target.value)}
            className={textareaCn}
            placeholder="Any recommendations..."
          />
        </Field>
      </div>

      {/* Overall Result */}
      <div className="space-y-4">
        <SectionHeader title="Overall Result" />
        <Field label="Result">
          <MobileSelectPicker
            value={formData.overallResult || ''}
            onValueChange={(v) => onUpdate('overallResult', v)}
            options={[
              { value: 'satisfactory', label: 'Satisfactory' },
              { value: 'unsatisfactory', label: 'Unsatisfactory' },
            ]}
            placeholder="Select..."
            triggerClassName={pickerTrigger}
          />
        </Field>
        <Field label="Additional Notes">
          <Textarea
            value={formData.additionalNotes || ''}
            onChange={(e) => onUpdate('additionalNotes', e.target.value)}
            className={textareaCn}
            placeholder="Any additional notes..."
          />
        </Field>
      </div>

      {/* Completion Summary */}
      <div className="space-y-4">
        <SectionHeader title="Completion Summary" />
        <div className="space-y-2 text-xs">
          {[
            {
              label: 'Installation Details',
              ok: !!(formData.clientName && formData.premisesAddress),
            },
            {
              label: 'Luminaire Schedule',
              value: `${(formData.luminaires || []).length} luminaires`,
            },
            {
              label: 'Tester Declaration',
              ok: !!(formData.testerName && formData.testerSignature),
            },
            {
              label: 'Client Representative',
              ok: !!(formData.responsiblePersonName && formData.responsiblePersonSignature),
            },
          ].map(({ label, ok, value }) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-white">{label}</span>
              {value ? (
                <span className="text-white">{value}</span>
              ) : ok ? (
                <span className="text-green-400">Complete</span>
              ) : (
                <span className="text-red-400">Incomplete</span>
              )}
            </div>
          ))}

          {/* Test Results */}
          {(() => {
            const lums = formData.luminaires || [];
            const tested = lums.filter(
              (l: Luminaire) =>
                l.functionalTestResult === 'pass' || l.functionalTestResult === 'fail'
            ).length;
            return (
              <div className="flex items-center justify-between">
                <span className="text-white">Test Results</span>
                <span
                  className={
                    tested === lums.length && lums.length > 0 ? 'text-green-400' : 'text-amber-400'
                  }
                >
                  {tested}/{lums.length} tested
                </span>
              </div>
            );
          })()}

          {/* Lux Readings */}
          {(() => {
            const readings = formData.luxReadings || [];
            const passed = readings.filter((r: LuxReading) => r.result === 'pass').length;
            const failed = readings.filter((r: LuxReading) => r.result === 'fail').length;
            return (
              <div className="flex items-center justify-between">
                <span className="text-white">Lux Readings</span>
                <span
                  className={
                    failed > 0
                      ? 'text-red-400'
                      : readings.length > 0
                        ? 'text-green-400'
                        : 'text-white'
                  }
                >
                  {readings.length === 0 ? 'None' : `${passed}/${readings.length} passed`}
                </span>
              </div>
            );
          })()}

          {/* Defects */}
          {(() => {
            const defects = formData.defectsFound || [];
            const rectified = defects.filter(
              (d: EmergencyLightingFormData['defectsFound'][number]) => d.rectified
            ).length;
            return (
              <div className="flex items-center justify-between">
                <span className="text-white">Defects</span>
                <span className={defects.length === 0 ? 'text-green-400' : 'text-amber-400'}>
                  {defects.length === 0
                    ? 'None'
                    : `${defects.length} found (${rectified} rectified)`}
                </span>
              </div>
            );
          })()}
        </div>

        {isComplete ? (
          <div className="rounded-lg bg-green-500/5 border border-green-500/15 p-3">
            <p className="text-[11px] text-white">
              Certificate ready for generation — all required fields complete.
            </p>
          </div>
        ) : (
          <div className="rounded-lg bg-amber-500/5 border border-amber-500/15 p-3">
            <p className="text-[11px] text-white">
              Complete all required sections before generating.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmergencyLightingDeclarations;
