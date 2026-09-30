import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { insulationTestVoltageOptions } from '@/types/testOptions';
import { useCertLocked } from '@/components/inspection/shared/CertLocked';

interface TestMethodInfoProps {
  formData: any;
  onUpdate: (field: string, value: string) => void;
  /** EICR removes the Test Method field (ELE-1109); keep Test Voltage + Notes. */
  showTestMethod?: boolean;
}

const testMethodOptions = [
  { value: 'Method 1', label: 'Method 1 — Live conductors, no isolation' },
  { value: 'Method 2', label: 'Method 2 — Safe isolation applied' },
  { value: 'Method 3', label: 'Method 3 — Isolation of protective devices' },
  { value: 'Method 1 & 2', label: 'Method 1 & 2 — Combined' },
  { value: 'Method 2 & 3', label: 'Method 2 & 3 — Combined' },
];

/**
 * BS 7671 Table 64 test voltage for the installation's nominal voltage: 250 V
 * DC for SELV/PELV, 500 V DC up to and including 500 V, 1000 V DC above. Blank
 * on 93 of the last 368 issued EICRs (30 Sep 2026) — nobody types what the
 * regulation already fixes, so the standard value is written when nothing has
 * been recorded. Still a select: an inspector who tested differently changes it.
 */
const table64TestVoltage = (supplyVoltage: unknown, customVoltage?: unknown): string => {
  const raw = String(supplyVoltage ?? '').trim().toLowerCase();
  const source = raw === 'custom' || raw === 'other' ? String(customVoltage ?? '') : raw;
  const match = source.match(/(\d+(?:\.\d+)?)/);
  const nominal = match ? Number(match[1]) : 230;
  if (!Number.isFinite(nominal) || nominal <= 0) return '500V';
  if (nominal <= 50) return '250V';
  if (nominal <= 500) return '500V';
  return '1000V';
};

const TestMethodInfo = ({ formData, onUpdate, showTestMethod = true }: TestMethodInfoProps) => {
  const supplyVoltage = formData?.supplyVoltage;
  const supplyVoltageCustom = formData?.supplyVoltageCustom;
  const testVoltage = formData?.testVoltage;
  const locked = useCertLocked();
  // Drafts only. Opening an ISSUED cert must not create an edit: on the EIC
  // walkthrough (30 Sep 2026) this write on open produced "Recovered unsaved
  // changes" and an edit conflict between two devices showing the same cert.
  const issued = formData?.status === 'completed';
  React.useEffect(() => {
    if (testVoltage || locked || issued) return;
    onUpdate('testVoltage', table64TestVoltage(supplyVoltage, supplyVoltageCustom));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testVoltage, supplyVoltage, supplyVoltageCustom, locked, issued]);

  return (
    <div className="space-y-4">
      <div className={`grid grid-cols-1 gap-4 ${showTestMethod ? 'sm:grid-cols-2' : ''}`}>
        {showTestMethod && (
          <div className="space-y-2">
            <Label htmlFor="testMethod" className="text-xs text-white">
              Test Method Applied
            </Label>
            <MobileSelectPicker
              value={formData.testMethod || ''}
              onValueChange={(value) => onUpdate('testMethod', value)}
              options={testMethodOptions}
              placeholder="Select BS 7671 method..."
              title="Test Method Applied"
              triggerClassName="bg-white/[0.06] border-white/[0.08] text-white"
            />
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="testVoltage" className="text-xs text-white">
            Test Voltage Applied
          </Label>
          <MobileSelectPicker
            value={formData.testVoltage || ''}
            onValueChange={(value) => onUpdate('testVoltage', value)}
            options={insulationTestVoltageOptions}
            placeholder="Select test voltage..."
            title="Test Voltage"
            triggerClassName="bg-white/[0.06] border-white/[0.08] text-white"
          />
          <span className="block text-[11px] text-white">
            Table 64: 500 V DC for circuits up to 500 V, 250 V DC for SELV/PELV, 1000 V DC above
            500 V. Set to match the supply — change it if you tested differently.
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="testNotes" className="text-xs text-white">
          Test Notes & Observations
        </Label>
        <Textarea
          id="testNotes"
          value={formData.testNotes || ''}
          onChange={(e) => onUpdate('testNotes', e.target.value)}
          placeholder="Deviations, limitations, or additional observations..."
          className="min-h-[100px] resize-none text-base touch-manipulation bg-white/[0.06] border-white/[0.08] placeholder:text-white/30"
          style={{ fontSize: '16px' }}
        />
      </div>
    </div>
  );
};

export default TestMethodInfo;
