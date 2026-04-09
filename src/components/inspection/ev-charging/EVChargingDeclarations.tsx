import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { cn } from '@/lib/utils';
import SignatureInput from '@/components/signature/SignatureInput';
import { LoadInstallerButton } from './LoadInstallerButton';
import {
  useEVChargingSmartForm,
  InstallerDetails,
} from '@/hooks/inspection/useEVChargingSmartForm';

interface EVChargingDeclarationsProps {
  formData: Record<string, unknown>;
  onUpdate: (field: string, value: unknown) => void;
}

const SectionHeader = ({ title }: { title: string }) => (
  <div className="border-b border-white/[0.06] pb-1 mb-3">
    <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
    <h2 className="text-xs font-medium text-white uppercase tracking-wider">{title}</h2>
  </div>
);

const EVChargingDeclarations: React.FC<EVChargingDeclarationsProps> = ({ formData, onUpdate }) => {
  const { hasSavedInstallerDetails } = useEVChargingSmartForm();
  const [detailsLoaded, setDetailsLoaded] = useState(false);

  const handleLoadInstallerDetails = (details: InstallerDetails) => {
    onUpdate('installerName', details.installerName);
    onUpdate('installerCompany', details.installerCompany);
    onUpdate('installerQualifications', details.installerQualifications);
    onUpdate('installerScheme', details.installerScheme);
    onUpdate('installerSchemeNumber', details.installerSchemeNumber);
    onUpdate('installerDate', details.installerDate);
    if (details.installerSignature) {
      onUpdate('installerSignature', details.installerSignature);
    }
    setDetailsLoaded(true);
  };

  const isComplete =
    formData.installerName && formData.installerSignature && formData.installerScheme;

  return (
    <div className="space-y-5 px-4 py-2">
      {/* OZEV Grant Section */}
      <div>
        <SectionHeader title="OZEV Grant Details" />

        <div className="space-y-3">
          <label
            htmlFor="ozevGrantApplicable"
            className="flex items-center gap-3 touch-manipulation cursor-pointer"
          >
            <Checkbox
              id="ozevGrantApplicable"
              checked={formData.ozevGrantApplicable || false}
              onCheckedChange={(checked) => onUpdate('ozevGrantApplicable', checked)}
              className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
            />
            <span className="text-white text-xs">OZEV Grant Applicable (EVHS or WCS scheme)</span>
          </label>

          {!formData.ozevGrantApplicable && formData.installationType && (
            <button
              onClick={() => {
                onUpdate('ozevGrantApplicable', true);
                const suggested = formData.installationType === 'domestic' ? 'EVHS'
                  : formData.installationType === 'commercial' ? 'WCS' : '';
                if (suggested) onUpdate('ozevScheme', suggested);
              }}
              className="text-[11px] text-elec-yellow touch-manipulation"
            >
              {formData.installationType === 'domestic'
                ? 'EVHS grant may apply — tap to enable'
                : formData.installationType === 'commercial'
                  ? 'WCS grant may apply — tap to enable'
                  : null}
            </button>
          )}

          {formData.ozevGrantApplicable && (
            <div className="grid grid-cols-2 gap-3 items-start">
              <div>
                <Label htmlFor="ozevScheme" className="text-white text-xs mb-1.5 block">
                  Grant Scheme
                </Label>
                <MobileSelectPicker
                  label="Grant Scheme"
                  value={formData.ozevScheme || ''}
                  onChange={(value) => onUpdate('ozevScheme', value)}
                  options={[
                    { value: 'n/a', label: 'N/A' },
                    { value: 'EVHS', label: 'EVHS' },
                    { value: 'WCS', label: 'WCS' },
                    { value: 'OZEV-flat', label: 'Flat Owner-Occupier' },
                  ]}
                  placeholder="Select"
                />
              </div>
              <div>
                <Label htmlFor="ozevGrantRef" className="text-white text-xs mb-1.5 block">
                  Reference Number
                </Label>
                <Input
                  id="ozevGrantRef"
                  placeholder="e.g., EVHS-12345"
                  value={formData.ozevGrantRef || ''}
                  onChange={(e) => onUpdate('ozevGrantRef', e.target.value)}
                  className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08]"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Handover & Documentation */}
      <div>
        <SectionHeader title="Handover & Documentation" />

        <div className="space-y-3">
          <label
            htmlFor="userInstructionsProvided"
            className="flex items-center gap-3 touch-manipulation cursor-pointer"
          >
            <Checkbox
              id="userInstructionsProvided"
              checked={formData.userInstructionsProvided || false}
              onCheckedChange={(checked) => onUpdate('userInstructionsProvided', checked)}
              className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
            />
            <span className="text-white text-xs">User instructions provided</span>
          </label>

          <label
            htmlFor="operatingManualProvided"
            className="flex items-center gap-3 touch-manipulation cursor-pointer"
          >
            <Checkbox
              id="operatingManualProvided"
              checked={formData.operatingManualProvided || false}
              onCheckedChange={(checked) => onUpdate('operatingManualProvided', checked)}
              className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
            />
            <span className="text-white text-xs">Operating manual provided</span>
          </label>

          <div>
            <Label htmlFor="specialConditions" className="text-white text-xs mb-1.5 block">
              Special Conditions / Notes
            </Label>
            <Textarea
              id="specialConditions"
              placeholder="Any special conditions, limitations, or notes..."
              value={formData.specialConditions || ''}
              onChange={(e) => onUpdate('specialConditions', e.target.value)}
              className="text-base touch-manipulation min-h-[60px] bg-white/[0.06] border-white/[0.08]"
            />
          </div>
        </div>
      </div>

      {/* Installer Declaration */}
      <div>
        <SectionHeader title="Installer Declaration" />

        <div className="space-y-3">
          {/* Auto-fill from Business Settings */}
          {hasSavedInstallerDetails && (
            <LoadInstallerButton
              onLoadDetails={handleLoadInstallerDetails}
              variant="default"
            />
          )}

          <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] px-3 py-2.5">
            <p className="text-[11px] text-white leading-relaxed">
              I certify this EV charging installation has been designed, constructed, inspected and tested per BS 7671:2018+A3:2024, IET CoP for EV Charging (5th Ed), and Building Regulations.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 items-start">
            <div>
              <Label htmlFor="installerName" className="text-white text-xs mb-1.5 block">
                Name *
              </Label>
              <Input
                id="installerName"
                placeholder="Full name"
                value={formData.installerName || ''}
                onChange={(e) => onUpdate('installerName', e.target.value)}
                className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08]"
              />
            </div>
            <div>
              <Label htmlFor="installerCompany" className="text-white text-xs mb-1.5 block">
                Company
              </Label>
              <Input
                id="installerCompany"
                placeholder="Company name"
                value={formData.installerCompany || ''}
                onChange={(e) => onUpdate('installerCompany', e.target.value)}
                className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 items-start">
            <div>
              <Label htmlFor="installerScheme" className="text-white text-xs mb-1.5 block">
                Scheme *
              </Label>
              <MobileSelectPicker
                label="Scheme"
                value={formData.installerScheme || ''}
                onChange={(value) => onUpdate('installerScheme', value)}
                options={[
                  { value: 'NICEIC', label: 'NICEIC' },
                  { value: 'NAPIT', label: 'NAPIT' },
                  { value: 'ELECSA', label: 'ELECSA' },
                  { value: 'STROMA', label: 'STROMA' },
                  { value: 'BRE', label: 'BRE' },
                  { value: 'Other', label: 'Other' },
                ]}
                placeholder="Select"
              />
            </div>
            <div>
              <Label htmlFor="installerSchemeNumber" className="text-white text-xs mb-1.5 block">
                Membership No.
              </Label>
              <Input
                id="installerSchemeNumber"
                placeholder="e.g., 12345678"
                value={formData.installerSchemeNumber || ''}
                onChange={(e) => onUpdate('installerSchemeNumber', e.target.value)}
                className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 items-start">
            <div>
              <Label htmlFor="installerQualifications" className="text-white text-xs mb-1.5 block">
                Qualifications
              </Label>
              <Input
                id="installerQualifications"
                placeholder="C&G 2391, EV Qual"
                value={formData.installerQualifications || ''}
                onChange={(e) => onUpdate('installerQualifications', e.target.value)}
                className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08]"
              />
            </div>
            <div>
              <Label htmlFor="installerDate" className="text-white text-xs mb-1.5 block">
                Date
              </Label>
              <Input
                id="installerDate"
                type="date"
                value={formData.installerDate || new Date().toISOString().split('T')[0]}
                onChange={(e) => onUpdate('installerDate', e.target.value)}
                className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] text-white [color-scheme:dark]"
              />
            </div>
          </div>

          <SignatureInput
            label="Installer Signature *"
            value={formData.installerSignature}
            onChange={(sig) => onUpdate('installerSignature', sig)}
            placeholder="Draw or type signature"
            required
          />
        </div>
      </div>

      {/* Compliance & Standards */}
      <div>
        <SectionHeader title="Compliance & Standards" />

        <div className="space-y-3">
          {[
            {
              id: 'bs7671Compliance',
              label: 'BS 7671:2018+A3:2024',
              sub: '18th Edition Wiring Regulations',
            },
            { id: 'ietCopCompliance', label: 'IET CoP for EV Charging', sub: '5th Edition' },
            {
              id: 'buildingRegsCompliance',
              label: 'Building Regulations Part P',
              sub: 'Electrical safety in dwellings',
            },
          ].map((item) => (
            <label
              key={item.id}
              htmlFor={item.id}
              className="flex items-center gap-3 touch-manipulation cursor-pointer"
            >
              <Checkbox
                id={item.id}
                checked={formData[item.id] || false}
                onCheckedChange={(checked) => onUpdate(item.id, checked)}
                className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
              />
              <div>
                <span className="text-white text-xs font-medium block">{item.label}</span>
                <span className="text-white text-[10px]">{item.sub}</span>
              </div>
            </label>
          ))}

          <div>
            <Label htmlFor="additionalNotes" className="text-white text-xs mb-1.5 block">
              Additional Notes
            </Label>
            <Textarea
              id="additionalNotes"
              placeholder="Any additional notes or comments..."
              value={formData.additionalNotes || ''}
              onChange={(e) => onUpdate('additionalNotes', e.target.value)}
              className="text-base touch-manipulation min-h-[60px] bg-white/[0.06] border-white/[0.08]"
            />
          </div>
        </div>
      </div>

      {/* Building Regulations */}
      <div>
        <SectionHeader title="Building Regulations" />

        <div className="space-y-3">
          <label
            htmlFor="buildingRegsRequired"
            className="flex items-center gap-3 touch-manipulation cursor-pointer"
          >
            <Checkbox
              id="buildingRegsRequired"
              checked={formData.buildingRegsRequired || false}
              onCheckedChange={(checked) => onUpdate('buildingRegsRequired', checked)}
              className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
            />
            <span className="text-xs text-white">Building regulations notification required</span>
          </label>

          {formData.buildingRegsRequired && (
            <>
              <label
                htmlFor="buildingRegsViaScheme"
                className="flex items-center gap-3 touch-manipulation cursor-pointer"
              >
                <Checkbox
                  id="buildingRegsViaScheme"
                  checked={formData.buildingRegsViaScheme || false}
                  onCheckedChange={(checked) => onUpdate('buildingRegsViaScheme', checked)}
                  className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                />
                <span className="text-xs text-white">Submitted via competent person scheme</span>
              </label>

              {!formData.buildingRegsViaScheme && (
                <label
                  htmlFor="buildingRegsSubmitted"
                  className="flex items-center gap-3 touch-manipulation cursor-pointer"
                >
                  <Checkbox
                    id="buildingRegsSubmitted"
                    checked={formData.buildingRegsSubmitted || false}
                    onCheckedChange={(checked) => onUpdate('buildingRegsSubmitted', checked)}
                    className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                  />
                  <span className="text-xs text-white">Submitted to building control</span>
                </label>
              )}
            </>
          )}
        </div>
      </div>

      {/* Final Status */}
      <div>
        {isComplete ? (
          <div className="rounded-lg border border-green-500/30 bg-green-500/[0.06] px-3 py-2.5">
            <p className="text-white text-xs">
              <span className="font-semibold text-green-400">Certificate ready for generation.</span>{' '}
              All required fields have been completed.
            </p>
          </div>
        ) : (
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/[0.06] px-3 py-2.5">
            <p className="text-white text-xs">
              <span className="font-semibold text-amber-400">Incomplete declaration.</span>{' '}
              Installer name, signature, and scheme registration are required before the certificate
              can be generated.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EVChargingDeclarations;
