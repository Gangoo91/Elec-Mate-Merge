/**
 * PATTestingDeclarations — Tab 3: Summary & Declaration
 *
 * PATTestSummary at top, tester declaration, retest schedule,
 * signature sign-off.
 */

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import SignatureInput from '@/components/signature/SignatureInput';
import PATTestSummary from './PATTestSummary';

interface PATTestingDeclarationsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUpdate: (field: string, value: any) => void;
}

const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 space-y-4';

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';

const textareaCn =
  'textarea-soft rounded-xl border-0 bg-white/[0.05] px-3.5 py-3 text-base md:text-base text-white placeholder:text-white/25 caret-elec-yellow transition-colors focus:bg-white/[0.07] focus:ring-1 focus:ring-elec-yellow/50 focus-visible:ring-1 focus-visible:ring-elec-yellow/50 focus:outline-none focus:shadow-none min-h-[90px] touch-manipulation';

const labelCn = 'text-[12px] font-medium text-white mb-1 block';

const pickerTriggerCn =
  'rounded-none border-0 border-b border-white/[0.15] bg-transparent h-11 px-1 text-base font-medium text-white hover:border-white/[0.3] focus:border-elec-yellow focus:ring-0 focus-visible:ring-0 focus:outline-none touch-manipulation';

const SectionHeader = ({ title }: { title: string }) => (
  <h2 className="mb-3 text-[15px] font-semibold tracking-tight text-white">{title}</h2>
);

const PATTestingDeclarations: React.FC<PATTestingDeclarationsProps> = ({ formData, onUpdate }) => {
  const isComplete = formData.testerName && formData.testerSignature;

  // Calculate next test date based on suggested interval
  const calculateNextTestDate = () => {
    const testDate = formData.testDate || new Date().toISOString().split('T')[0];
    const intervalMonths = parseInt(formData.suggestedRetestInterval) || 12;
    const date = new Date(testDate);
    date.setMonth(date.getMonth() + intervalMonths);
    return date.toISOString().split('T')[0];
  };

  // Auto-update summary totals from appliances
  const appliances = formData.appliances || [];
  const totalTested = appliances.filter(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (a: any) => a.overallResult === 'pass' || a.overallResult === 'fail'
  ).length;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const totalPassed = appliances.filter((a: any) => a.overallResult === 'pass').length;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const totalFailed = appliances.filter((a: any) => a.overallResult === 'fail').length;

  // Sync totals to formData if they changed
  React.useEffect(() => {
    if (
      formData.totalAppliancesTested !== totalTested ||
      formData.totalPassed !== totalPassed ||
      formData.totalFailed !== totalFailed
    ) {
      onUpdate('totalAppliancesTested', totalTested);
      onUpdate('totalPassed', totalPassed);
      onUpdate('totalFailed', totalFailed);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalTested, totalPassed, totalFailed, onUpdate]);

  return (
    <div className="py-4 space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4">
      {/* Test summary */}
      <div className={`${cardCn} lg:col-span-2`}>
        <SectionHeader title="Test summary" />
        <PATTestSummary appliances={appliances} />
      </div>

      {/* Tester declaration & signature */}
      <div className={`${cardCn} lg:col-span-2`}>
        <SectionHeader title="Tester declaration" />

        <p className="text-sm text-white/85 leading-relaxed">
          <span className="font-semibold text-white">Declaration:</span> I certify that the
          appliances listed in this report have been inspected and tested in accordance with the
          IET Code of Practice for In-Service Inspection and Testing of Electrical Equipment, and
          the results are as recorded.
        </p>

        {/* Tester info (read-only if set from Tab 1 profile) */}
        {formData.testerName && (
          <div className="rounded-xl bg-white/[0.05] p-3.5 space-y-1">
            <p className="text-sm font-medium text-white">{formData.testerName}</p>
            {formData.testerCompany && (
              <p className="text-[12px] text-white/80">{formData.testerCompany}</p>
            )}
            {formData.testerQualifications && (
              <p className="text-[12px] text-white/80">{formData.testerQualifications}</p>
            )}
            <p className="text-[12px] text-white/80">
              Date: {formData.testerDate || new Date().toISOString().split('T')[0]}
            </p>
          </div>
        )}

        {/* Manual entry if no profile was selected */}
        {!formData.testerName && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <Label className={labelCn} htmlFor="testerName">
                Tester name *
              </Label>
              <Input
                id="testerName"
                placeholder="Full name"
                value={formData.testerName || ''}
                onChange={(e) => onUpdate('testerName', e.target.value)}
                className={inputCn}
              />
            </div>
            <div>
              <Label className={labelCn} htmlFor="testerDate">
                Date
              </Label>
              <Input
                id="testerDate"
                type="date"
                value={formData.testerDate || new Date().toISOString().split('T')[0]}
                onChange={(e) => onUpdate('testerDate', e.target.value)}
                className={inputCn}
              />
            </div>
          </div>
        )}

        <SignatureInput
          label="Tester signature *"
          value={formData.testerSignature}
          onChange={(sig) => onUpdate('testerSignature', sig)}
          placeholder="Draw or type signature"
          required
        />
      </div>

      {/* Retest schedule */}
      <div className={cardCn}>
        <SectionHeader title="Retest schedule" />

        <div className="rounded-xl bg-white/[0.05] px-3.5 py-3">
          <p className="text-[12px] text-white/85 leading-relaxed">
            <span className="font-semibold text-white">IET CoP:</span> Retest intervals depend on
            equipment type and environment. Construction sites: 3 months. Office IT: up to 48
            months.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <Label className={labelCn}>Retest interval</Label>
            <MobileSelectPicker
              value={formData.suggestedRetestInterval || '12'}
              onValueChange={(v) => {
                onUpdate('suggestedRetestInterval', v);
                const testDate = formData.testDate || new Date().toISOString().split('T')[0];
                const date = new Date(testDate);
                date.setMonth(date.getMonth() + parseInt(v));
                onUpdate('nextTestDue', date.toISOString().split('T')[0]);
              }}
              options={[
                { value: '3', label: '3 Months' },
                { value: '6', label: '6 Months' },
                { value: '12', label: '12 Months' },
                { value: '24', label: '24 Months' },
                { value: '48', label: '48 Months' },
              ]}
              placeholder="Select"
              title="Retest interval"
              triggerClassName={pickerTriggerCn}
            />
          </div>
          <div>
            <Label className={labelCn}>Next test due</Label>
            <Input
              type="date"
              value={formData.nextTestDue || calculateNextTestDate()}
              onChange={(e) => onUpdate('nextTestDue', e.target.value)}
              className={inputCn}
            />
          </div>
        </div>

        <div>
          <Label className={labelCn}>Recommendations</Label>
          <Textarea
            placeholder="Any recommendations for the client..."
            value={formData.recommendations || ''}
            onChange={(e) => onUpdate('recommendations', e.target.value)}
            className={textareaCn}
          />
        </div>

        <div>
          <Label className={labelCn}>Additional notes</Label>
          <Textarea
            placeholder="Any additional notes..."
            value={formData.additionalNotes || ''}
            onChange={(e) => onUpdate('additionalNotes', e.target.value)}
            className={textareaCn}
          />
        </div>
      </div>

      {/* Final status */}
      <div className={cardCn}>
        {isComplete ? (
          <p className="text-sm text-white leading-relaxed">
            <span className="font-semibold text-green-400">Ready to generate.</span> All required
            fields have been completed.
          </p>
        ) : (
          <p className="text-sm text-white leading-relaxed">
            <span className="font-semibold text-elec-yellow">Incomplete declaration.</span> Tester
            name and signature are required before the certificate can be generated.
          </p>
        )}
      </div>
    </div>
  );
};

export default PATTestingDeclarations;
