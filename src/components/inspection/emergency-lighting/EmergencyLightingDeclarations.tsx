import React, { useEffect, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import SignatureInput from '@/components/signature/SignatureInput';
import LoadTesterButton from './LoadTesterButton';
import { OverdueBadge } from './ValidationBadge';
import { useEmergencyLightingSmartForm } from '@/hooks/inspection/useEmergencyLightingSmartForm';
import { useHaptic } from '@/hooks/useHaptic';
import type { EmergencyLightingFormData, Luminaire, LuxReading } from '@/types/emergency-lighting';

// Section card — the only box on the page
const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 space-y-4';

// Paper-form underline input
const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';

const textareaCn =
  'textarea-soft rounded-xl border-0 bg-white/[0.05] px-3.5 py-3 text-base md:text-base text-white placeholder:text-white/25 caret-elec-yellow transition-colors focus:bg-white/[0.07] focus:ring-1 focus:ring-elec-yellow/50 focus-visible:ring-1 focus-visible:ring-elec-yellow/50 focus:outline-none focus:shadow-none min-h-[90px] touch-manipulation';

const labelCn = 'text-[12px] font-medium text-white mb-1 block';

const pickerTrigger =
  'rounded-none border-0 border-b border-white/[0.15] bg-transparent h-11 w-full px-1 text-base font-medium text-white hover:border-white/[0.3] focus:border-elec-yellow focus:ring-0 focus-visible:ring-0 focus:outline-none touch-manipulation';

const SectionHeader = ({ title }: { title: string }) => (
  <h2 className="mb-3 text-[15px] font-semibold tracking-tight text-white">{title}</h2>
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
    <Label className={labelCn}>
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
  const haptic = useHaptic();

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

  // Commit the displayed fallback dates into formData — the inputs used to
  // show a computed default without ever writing it, so the screen showed a
  // date while the stored data (and the PDF) stayed blank.
  useEffect(() => {
    if (!formData.responsiblePersonDate) {
      onUpdate('responsiblePersonDate', new Date().toISOString().split('T')[0]);
    }
    if (!formData.nextMonthlyTestDue) {
      onUpdate('nextMonthlyTestDue', calculateNextMonthly());
    }
    if (!formData.nextAnnualTestDue) {
      onUpdate('nextAnnualTestDue', calculateNextAnnual());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    formData.responsiblePersonDate,
    formData.nextMonthlyTestDue,
    formData.nextAnnualTestDue,
    formData.testDate,
  ]);

  return (
    <div
      className="py-4 space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4"
      // Delegated press haptic — every chip/button tap in this tab buzzes
      // without wiring each onClick individually.
      onPointerDown={(e) => {
        if ((e.target as HTMLElement).closest('button')) haptic.light();
      }}
    >
      {/* Tester declaration */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Tester declaration" />
        <LoadTesterButton
          onLoad={handleLoadTesterDetails}
          className="h-11 rounded-xl bg-elec-yellow border-elec-yellow text-black text-sm font-semibold hover:bg-elec-yellow"
        />
        <div className="rounded-xl bg-white/[0.05] p-3.5">
          <p className="text-xs text-white/80 leading-relaxed">
            I certify that the emergency lighting system has been inspected and tested in accordance
            with BS 5266, and the results are as recorded in this certificate.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
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
          label="Tester signature *"
          value={formData.testerSignature}
          onChange={(sig) => onUpdate('testerSignature', sig)}
          placeholder="Draw or type signature"
          required
        />
      </div>

      {/* Client Representative */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Client representative" />
        <div className="rounded-xl bg-white/[0.05] p-3.5">
          <p className="text-xs text-white/80 leading-relaxed">
            The responsible person at the premises acknowledges receipt of the test results per BS
            5266-1.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
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
          label="Responsible person signature *"
          value={formData.responsiblePersonSignature}
          onChange={(sig) => onUpdate('responsiblePersonSignature', sig)}
          placeholder="Draw or type signature"
          required
        />
      </div>

      {/* Service Schedule */}
      <div className={cardCn}>
        <SectionHeader title="Service schedule" />
        <div className="rounded-xl bg-white/[0.05] p-3.5 space-y-1">
          <p className="text-[12px] font-semibold text-white">BS 5266 test schedule</p>
          <p className="text-xs text-white/80">
            Daily — visual inspection | Monthly — flick test | Annually — full duration test |
            3-yearly — full inspection
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Label className="text-[12px] font-medium text-white">Next monthly due</Label>
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
              className={cn(inputCn, testDates.monthlyOverdue && 'border-red-500')}
            />
            {!testDates.monthlyOverdue && testDates.daysUntilMonthly > 0 && (
              <p className="text-[11px] text-white/80 mt-1">{testDates.daysUntilMonthly} days</p>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Label className="text-[12px] font-medium text-white">Next annual due</Label>
              {testDates.annualOverdue && (
                <OverdueBadge daysOverdue={Math.abs(testDates.daysUntilAnnual)} testType="annual" />
              )}
            </div>
            <Input
              type="date"
              value={formData.nextAnnualTestDue || calculateNextAnnual()}
              onChange={(e) => onUpdate('nextAnnualTestDue', e.target.value)}
              className={cn(inputCn, testDates.annualOverdue && 'border-red-500')}
            />
            {!testDates.annualOverdue && testDates.daysUntilAnnual > 0 && (
              <p className="text-[11px] text-white/80 mt-1">{testDates.daysUntilAnnual} days</p>
            )}
          </div>
        </div>
        <Field label="Next 3-yearly inspection due">
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
      <div className={cardCn}>
        <SectionHeader title="Overall result" />
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
        <Field label="Additional notes">
          <Textarea
            value={formData.additionalNotes || ''}
            onChange={(e) => onUpdate('additionalNotes', e.target.value)}
            className={textareaCn}
            placeholder="Any additional notes..."
          />
        </Field>
      </div>

      {/* Completion Summary */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Completion summary" />
        <div className="space-y-2 text-xs">
          {[
            {
              label: 'Installation details',
              ok: !!(formData.clientName && formData.premisesAddress),
            },
            {
              label: 'Luminaire schedule',
              value: `${(formData.luminaires || []).length} luminaires`,
            },
            {
              label: 'Tester declaration',
              ok: !!(formData.testerName && formData.testerSignature),
            },
            {
              label: 'Client representative',
              ok: !!(formData.responsiblePersonName && formData.responsiblePersonSignature),
            },
          ].map(({ label, ok, value }) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-white">{label}</span>
              {value ? (
                <span className="font-medium text-white">{value}</span>
              ) : ok ? (
                <span className="font-medium text-green-400">Complete</span>
              ) : (
                <span className="font-medium text-red-400">Incomplete</span>
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
                <span className="text-white">Test results</span>
                <span
                  className={cn(
                    'font-medium',
                    tested === lums.length && lums.length > 0 ? 'text-green-400' : 'text-amber-400'
                  )}
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
                <span className="text-white">Lux readings</span>
                <span
                  className={cn(
                    'font-medium',
                    failed > 0
                      ? 'text-red-400'
                      : readings.length > 0
                        ? 'text-green-400'
                        : 'text-white'
                  )}
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
                <span
                  className={cn(
                    'font-medium',
                    defects.length === 0 ? 'text-green-400' : 'text-amber-400'
                  )}
                >
                  {defects.length === 0
                    ? 'None'
                    : `${defects.length} found (${rectified} rectified)`}
                </span>
              </div>
            );
          })()}
        </div>

        {isComplete ? (
          <div className="rounded-xl border border-green-500/40 bg-white/[0.05] p-3.5">
            <p className="text-xs text-white/80">
              Certificate ready for generation — all required fields complete.
            </p>
          </div>
        ) : (
          <div className="rounded-xl border border-amber-500/40 bg-white/[0.05] p-3.5">
            <p className="text-xs text-white/80">
              Complete all required sections before generating.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmergencyLightingDeclarations;
