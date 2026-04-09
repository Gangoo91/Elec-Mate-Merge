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

const SectionHeader = ({ title }: { title: string }) => (
  <div className="border-b border-white/[0.06] pb-1 mb-3">
    <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
    <h2 className="text-xs font-medium text-white uppercase tracking-wider">{title}</h2>
  </div>
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
    <div className="space-y-5 px-4 sm:px-0">
      {/* Test Summary */}
      <div>
        <SectionHeader title="Test Summary" />
        <PATTestSummary appliances={appliances} />
      </div>

      {/* Tester Declaration & Signature */}
      <div>
        <SectionHeader title="Tester Declaration" />
        <div className="space-y-4">
          <div className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-3">
            <p className="text-white text-sm">
              <strong>Declaration:</strong> I certify that the appliances listed in this
              report have been inspected and tested in accordance with the IET Code of
              Practice for In-Service Inspection and Testing of Electrical Equipment, and the
              results are as recorded.
            </p>
          </div>

          {/* Tester info (read-only if set from Tab 1 profile) */}
          {formData.testerName && (
            <div className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-3 space-y-1">
              <p className="text-white text-sm font-medium">{formData.testerName}</p>
              {formData.testerCompany && (
                <p className="text-white text-xs">{formData.testerCompany}</p>
              )}
              {formData.testerQualifications && (
                <p className="text-white text-xs">{formData.testerQualifications}</p>
              )}
              <p className="text-white text-xs">
                Date: {formData.testerDate || new Date().toISOString().split('T')[0]}
              </p>
            </div>
          )}

          {/* Manual entry if no profile was selected */}
          {!formData.testerName && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-white text-xs mb-1.5 block" htmlFor="testerName">
                  Tester Name *
                </Label>
                <Input
                  id="testerName"
                  placeholder="Full name"
                  value={formData.testerName || ''}
                  onChange={(e) => onUpdate('testerName', e.target.value)}
                  className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] text-white [color-scheme:dark]"
                />
              </div>
              <div>
                <Label className="text-white text-xs mb-1.5 block" htmlFor="testerDate">
                  Date
                </Label>
                <input
                  id="testerDate"
                  type="date"
                  value={formData.testerDate || new Date().toISOString().split('T')[0]}
                  onChange={(e) => onUpdate('testerDate', e.target.value)}
                  className="flex h-11 w-full rounded-md px-3 py-2 text-sm touch-manipulation bg-white/[0.06] border border-white/[0.08] text-white [color-scheme:dark] [-webkit-appearance:none] [&::-webkit-date-and-time-value]:text-white [&::-webkit-calendar-picker-indicator]:opacity-60 [&::-webkit-calendar-picker-indicator]:invert"
                />
              </div>
            </div>
          )}

          <SignatureInput
            label="Tester Signature *"
            value={formData.testerSignature}
            onChange={(sig) => onUpdate('testerSignature', sig)}
            placeholder="Draw or type signature"
            required
          />
        </div>
      </div>

      {/* Retest Schedule */}
      <div>
        <SectionHeader title="Retest Schedule" />
        <div className="space-y-4">
          <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] px-3 py-2.5">
            <p className="text-[11px] text-white leading-relaxed">
              <span className="font-bold">IET CoP:</span> Retest intervals depend on equipment type and environment. Construction sites: 3 months. Office IT: up to 48 months.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-white text-xs mb-1.5 block">Retest Interval</Label>
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
                title="Retest Interval"
              />
            </div>
            <div>
              <Label className="text-white text-xs mb-1.5 block">Next Test Due</Label>
              <input
                type="date"
                value={formData.nextTestDue || calculateNextTestDate()}
                onChange={(e) => onUpdate('nextTestDue', e.target.value)}
                className="flex h-11 w-full rounded-md px-3 py-2 text-sm touch-manipulation bg-white/[0.06] border border-white/[0.08] text-white [color-scheme:dark] [-webkit-appearance:none] [&::-webkit-date-and-time-value]:text-white [&::-webkit-calendar-picker-indicator]:opacity-60 [&::-webkit-calendar-picker-indicator]:invert"
              />
            </div>
          </div>

          <div>
            <Label className="text-white text-xs mb-1.5 block">Recommendations</Label>
            <Textarea
              placeholder="Any recommendations for the client..."
              value={formData.recommendations || ''}
              onChange={(e) => onUpdate('recommendations', e.target.value)}
              className="text-base touch-manipulation min-h-[60px] bg-white/[0.06] border-white/[0.08] text-white"
            />
          </div>

          <div>
            <Label className="text-white text-xs mb-1.5 block">Additional Notes</Label>
            <Textarea
              placeholder="Any additional notes..."
              value={formData.additionalNotes || ''}
              onChange={(e) => onUpdate('additionalNotes', e.target.value)}
              className="text-base touch-manipulation min-h-[60px] bg-white/[0.06] border-white/[0.08] text-white"
            />
          </div>
        </div>
      </div>

      {/* Final Status */}
      {isComplete ? (
        <div className="relative overflow-hidden card-surface-interactive rounded-xl">
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-emerald-500 via-emerald-400 to-green-400 opacity-60" />
          <div className="relative z-10 p-3">
            <p className="text-emerald-400 text-sm font-bold">Ready to generate</p>
            <p className="text-white text-xs mt-0.5">All required fields completed</p>
          </div>
        </div>
      ) : (
        <div className="relative overflow-hidden card-surface-interactive rounded-xl">
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 opacity-60" />
          <div className="relative z-10 p-3">
            <p className="text-amber-400 text-sm font-bold">Incomplete declaration</p>
            <p className="text-white text-xs mt-0.5">Tester name and signature required</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PATTestingDeclarations;
