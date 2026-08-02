import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import SignatureInput from '@/components/signature/SignatureInput';
import { LoadInstallerButton } from './LoadInstallerButton';
import { EVSectionHeader } from './EVSectionHeader';
import { inputCn, cardCn, labelCn, textareaCn, checkboxCn } from '@/components/forms/fieldStyles';
import {
  useEVChargingSmartForm,
  InstallerDetails,
} from '@/hooks/inspection/useEVChargingSmartForm';

interface EVChargingDeclarationsProps {
  formData: Record<string, unknown>;
  onUpdate: (field: string, value: unknown) => void;
}





const selectTriggerCn =
  'rounded-none border-0 border-b border-white/[0.15] bg-transparent h-11 px-1 text-base font-medium hover:border-white/[0.3] focus:border-elec-yellow focus:ring-0 data-[state=open]:border-elec-yellow data-[state=open]:ring-0 active:bg-transparent';


const checkRowCn = 'flex min-h-11 items-center gap-3 touch-manipulation cursor-pointer';

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
    <div className="py-2">
      <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4">
        {/* OZEV Grant Section */}
        <div className={cardCn}>
          <EVSectionHeader title="OZEV Grant Details" />

          <label htmlFor="ozevGrantApplicable" className={checkRowCn}>
            <Checkbox
              id="ozevGrantApplicable"
              checked={formData.ozevGrantApplicable || false}
              onCheckedChange={(checked) => onUpdate('ozevGrantApplicable', checked)}
              className={checkboxCn}
            />
            <span className="text-sm text-white">OZEV grant applicable (EVHS or WCS scheme)</span>
          </label>

          {!formData.ozevGrantApplicable && formData.installationType && (
            <button
              onClick={() => {
                onUpdate('ozevGrantApplicable', true);
                const suggested = formData.installationType === 'domestic' ? 'EVHS'
                  : formData.installationType === 'commercial' ? 'WCS' : '';
                if (suggested) onUpdate('ozevScheme', suggested);
              }}
              className="inline-flex h-11 items-center rounded-xl border border-white/[0.12] bg-white/[0.06] px-4 text-sm font-medium text-elec-yellow touch-manipulation active:scale-[0.98] transition-transform"
            >
              {formData.installationType === 'domestic'
                ? 'EVHS grant may apply — tap to enable'
                : formData.installationType === 'commercial'
                  ? 'WCS grant may apply — tap to enable'
                  : null}
            </button>
          )}

          {formData.ozevGrantApplicable && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <Label htmlFor="ozevScheme" className={labelCn}>
                  Grant scheme
                </Label>
                <MobileSelectPicker
                  label="Grant Scheme"
                  value={formData.ozevScheme || ''}
                  onValueChange={(value) => onUpdate('ozevScheme', value)}
                  options={[
                    { value: 'n/a', label: 'N/A' },
                    { value: 'EVHS', label: 'EVHS' },
                    { value: 'WCS', label: 'WCS' },
                    { value: 'OZEV-flat', label: 'Flat Owner-Occupier' },
                  ]}
                  placeholder="Select"
                  triggerClassName={selectTriggerCn}
                />
              </div>
              <div>
                <Label htmlFor="ozevGrantRef" className={labelCn}>
                  Reference number
                </Label>
                <Input
                  id="ozevGrantRef"
                  placeholder="e.g. EVHS-12345"
                  value={formData.ozevGrantRef || ''}
                  onChange={(e) => onUpdate('ozevGrantRef', e.target.value)}
                  className={inputCn}
                />
              </div>
            </div>
          )}
        </div>

        {/* Handover & Documentation */}
        <div className={cardCn}>
          <EVSectionHeader title="Handover & Documentation" />

          <label htmlFor="userInstructionsProvided" className={checkRowCn}>
            <Checkbox
              id="userInstructionsProvided"
              checked={formData.userInstructionsProvided || false}
              onCheckedChange={(checked) => onUpdate('userInstructionsProvided', checked)}
              className={checkboxCn}
            />
            <span className="text-sm text-white">User instructions provided</span>
          </label>

          <label htmlFor="operatingManualProvided" className={checkRowCn}>
            <Checkbox
              id="operatingManualProvided"
              checked={formData.operatingManualProvided || false}
              onCheckedChange={(checked) => onUpdate('operatingManualProvided', checked)}
              className={checkboxCn}
            />
            <span className="text-sm text-white">Operating manual provided</span>
          </label>

          <div>
            <Label htmlFor="specialConditions" className={labelCn}>
              Special conditions / notes
            </Label>
            <Textarea
              id="specialConditions"
              placeholder="Any special conditions, limitations, or notes..."
              value={formData.specialConditions || ''}
              onChange={(e) => onUpdate('specialConditions', e.target.value)}
              className={textareaCn}
            />
          </div>
        </div>

        {/* Installer Declaration */}
        <div className={`${cardCn} lg:col-span-2`}>
          <EVSectionHeader title="Installer Declaration" />

          {/* Auto-fill from Business Settings */}
          {hasSavedInstallerDetails && (
            <LoadInstallerButton
              onLoadDetails={handleLoadInstallerDetails}
              variant="default"
            />
          )}

          <p className="text-sm text-white/85 leading-relaxed">
            I certify this EV charging installation has been designed, constructed, inspected and
            tested per BS 7671:2018+A4:2026, IET CoP for EV Charging (5th Ed), and Building
            Regulations.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <Label htmlFor="installerName" className={labelCn}>
                Name *
              </Label>
              <Input
                id="installerName"
                placeholder="Full name"
                value={formData.installerName || ''}
                onChange={(e) => onUpdate('installerName', e.target.value)}
                className={inputCn}
              />
            </div>
            <div>
              <Label htmlFor="installerCompany" className={labelCn}>
                Company
              </Label>
              <Input
                id="installerCompany"
                placeholder="Company name"
                value={formData.installerCompany || ''}
                onChange={(e) => onUpdate('installerCompany', e.target.value)}
                className={inputCn}
              />
            </div>
            <div>
              <Label htmlFor="installerScheme" className={labelCn}>
                Scheme *
              </Label>
              <MobileSelectPicker
                label="Scheme"
                value={formData.installerScheme || ''}
                onValueChange={(value) => onUpdate('installerScheme', value)}
                options={[
                  { value: 'NICEIC', label: 'NICEIC' },
                  { value: 'NAPIT', label: 'NAPIT' },
                  { value: 'ELECSA', label: 'ELECSA' },
                  { value: 'STROMA', label: 'STROMA' },
                  { value: 'BRE', label: 'BRE' },
                  { value: 'Other', label: 'Other' },
                ]}
                placeholder="Select"
                triggerClassName={selectTriggerCn}
              />
            </div>
            <div>
              <Label htmlFor="installerSchemeNumber" className={labelCn}>
                Membership no.
              </Label>
              <Input
                id="installerSchemeNumber"
                placeholder="e.g. 12345678"
                value={formData.installerSchemeNumber || ''}
                onChange={(e) => onUpdate('installerSchemeNumber', e.target.value)}
                className={inputCn}
              />
            </div>
            <div>
              <Label htmlFor="installerQualifications" className={labelCn}>
                Qualifications
              </Label>
              <Input
                id="installerQualifications"
                placeholder="e.g. C&G 2391, EV qualification"
                value={formData.installerQualifications || ''}
                onChange={(e) => onUpdate('installerQualifications', e.target.value)}
                className={inputCn}
              />
            </div>
            <div>
              <Label htmlFor="installerDate" className={labelCn}>
                Date
              </Label>
              <Input
                id="installerDate"
                type="date"
                value={formData.installerDate || new Date().toISOString().split('T')[0]}
                onChange={(e) => onUpdate('installerDate', e.target.value)}
                className={inputCn}
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

        {/* Compliance & Standards */}
        <div className={cardCn}>
          <EVSectionHeader title="Compliance & Standards" />

          {[
            {
              id: 'bs7671Compliance',
              label: 'BS 7671:2018+A4:2026',
              sub: '18th Edition Wiring Regulations',
            },
            { id: 'ietCopCompliance', label: 'IET CoP for EV Charging', sub: '5th Edition' },
            {
              id: 'buildingRegsCompliance',
              label: 'Building Regulations Part P',
              sub: 'Electrical safety in dwellings',
            },
          ].map((item) => (
            <label key={item.id} htmlFor={item.id} className={checkRowCn}>
              <Checkbox
                id={item.id}
                checked={formData[item.id] || false}
                onCheckedChange={(checked) => onUpdate(item.id, checked)}
                className={checkboxCn}
              />
              <div>
                <span className="block text-sm font-medium text-white">{item.label}</span>
                <span className="text-[12px] text-white/85">{item.sub}</span>
              </div>
            </label>
          ))}

          <div>
            <Label htmlFor="additionalNotes" className={labelCn}>
              Additional notes
            </Label>
            <Textarea
              id="additionalNotes"
              placeholder="Any additional notes or comments..."
              value={formData.additionalNotes || ''}
              onChange={(e) => onUpdate('additionalNotes', e.target.value)}
              className={textareaCn}
            />
          </div>
        </div>

        {/* Building Regulations */}
        <div className={cardCn}>
          <EVSectionHeader title="Building Regulations" />

          <label htmlFor="buildingRegsRequired" className={checkRowCn}>
            <Checkbox
              id="buildingRegsRequired"
              checked={formData.buildingRegsRequired || false}
              onCheckedChange={(checked) => onUpdate('buildingRegsRequired', checked)}
              className={checkboxCn}
            />
            <span className="text-sm text-white">Building regulations notification required</span>
          </label>

          {formData.buildingRegsRequired && (
            <>
              <label htmlFor="buildingRegsViaScheme" className={checkRowCn}>
                <Checkbox
                  id="buildingRegsViaScheme"
                  checked={formData.buildingRegsViaScheme || false}
                  onCheckedChange={(checked) => onUpdate('buildingRegsViaScheme', checked)}
                  className={checkboxCn}
                />
                <span className="text-sm text-white">Submitted via competent person scheme</span>
              </label>

              {!formData.buildingRegsViaScheme && (
                <label htmlFor="buildingRegsSubmitted" className={checkRowCn}>
                  <Checkbox
                    id="buildingRegsSubmitted"
                    checked={formData.buildingRegsSubmitted || false}
                    onCheckedChange={(checked) => onUpdate('buildingRegsSubmitted', checked)}
                    className={checkboxCn}
                  />
                  <span className="text-sm text-white">Submitted to building control</span>
                </label>
              )}
            </>
          )}
        </div>

        {/* Final Status */}
        <div className={`${cardCn} lg:col-span-2`}>
          {isComplete ? (
            <p className="text-sm text-white leading-relaxed">
              <span className="font-semibold text-green-400">Certificate ready for generation.</span>{' '}
              All required fields have been completed.
            </p>
          ) : (
            <p className="text-sm text-white leading-relaxed">
              <span className="font-semibold text-elec-yellow">Incomplete declaration.</span>{' '}
              Installer name, signature, and scheme registration are required before the certificate
              can be generated.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EVChargingDeclarations;
