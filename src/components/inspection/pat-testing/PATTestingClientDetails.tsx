/**
 * PATTestingClientDetails — Tab 1: Client & Tester
 *
 * - Tester profile: "Load from Settings" button + normal fields
 * - Client: CRM dropdown (CertificateClientSection) or manual entry
 * - Test equipment: "Load from Settings" button + normal fields
 * - Certificate metadata
 */

import React, { useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import CertificateClientSection, {
  DEFAULT_CLIENT_FIELDS,
} from '@/components/inspection/shared/CertificateClientSection';
import { useInspectorProfiles, InspectorProfile } from '@/hooks/useInspectorProfiles';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import { TestingInstrument } from '@/types/company';
import { PATTesterAutocomplete } from './PATTesterAutocomplete';

interface PATTestingClientDetailsProps {
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

const inputClass =
  'h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] text-white [color-scheme:dark]';
const labelClass = 'text-white text-xs mb-1.5 block';
const textareaClass =
  'text-base touch-manipulation min-h-[80px] bg-white/[0.06] border-white/[0.08] text-white [color-scheme:dark]';

const PATTestingClientDetails: React.FC<PATTestingClientDetailsProps> = ({
  formData,
  onUpdate,
}) => {
  const { profiles, getDefaultProfile } = useInspectorProfiles();
  const { companyProfile } = useCompanyProfile();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateTestEquipment = (field: string, value: any) => {
    onUpdate('testEquipment', {
      ...formData.testEquipment,
      [field]: value,
    });
  };

  const loadProfile = (profile: InspectorProfile) => {
    const today = new Date().toISOString().split('T')[0];
    const qualifications = Array.isArray(profile.qualifications)
      ? profile.qualifications.join(', ')
      : '';

    onUpdate('testerName', profile.name);
    onUpdate('testerCompany', profile.companyName || '');
    onUpdate('testerQualifications', qualifications);
    onUpdate('testerDate', today);
    if (profile.signatureData) {
      onUpdate('testerSignature', profile.signatureData);
    }
  };

  const loadFromCompanyProfile = () => {
    if (!companyProfile) return;
    onUpdate('testerName', companyProfile.inspector_name || '');
    onUpdate('testerCompany', companyProfile.company_name || '');
    const quals = Array.isArray(companyProfile.inspector_qualifications)
      ? companyProfile.inspector_qualifications.join(', ')
      : '';
    onUpdate('testerQualifications', quals);
    onUpdate('testerDate', new Date().toISOString().split('T')[0]);
    if (companyProfile.signature_data) {
      onUpdate('testerSignature', companyProfile.signature_data);
    }
  };

  // Get the best available profile source for the button
  const hasProfileSource = profiles.length > 0 || companyProfile?.inspector_name;

  // Profile options for MobileSelectPicker
  const profileOptions = useMemo(
    () =>
      profiles.map((p) => ({
        value: p.id,
        label: p.name + (p.isDefault ? ' (Default)' : ''),
      })),
    [profiles]
  );

  // Saved PAT instruments from company profile
  const savedPATInstruments = useMemo(() => {
    const instruments = companyProfile?.testing_instruments;
    if (!instruments) return [];
    return instruments.filter((i: TestingInstrument) => i.instrument_type === 'pat');
  }, [companyProfile?.testing_instruments]);

  const loadEquipmentFromSettings = (instrument?: TestingInstrument) => {
    if (instrument) {
      onUpdate('testEquipment', {
        make: instrument.make || '',
        model: instrument.model || '',
        serialNumber: instrument.serial_number || '',
        lastCalibrationDate: instrument.calibration_date || '',
        nextCalibrationDue: instrument.calibration_due || '',
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* ── Tester Profile ── */}
      <div>
        <SectionHeader title="Tester Profile" />
        <div className="space-y-3">
          {/* Load from Settings button */}
          {hasProfileSource && (
            <button
              type="button"
              onClick={() => {
                const defaultProfile = getDefaultProfile();
                if (defaultProfile) {
                  loadProfile(defaultProfile);
                } else if (profiles.length > 0) {
                  loadProfile(profiles[0]);
                } else {
                  loadFromCompanyProfile();
                }
              }}
              className="w-full h-11 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white text-sm font-medium touch-manipulation active:scale-[0.98]"
            >
              Load from Settings
            </button>
          )}

          {/* Profile selector (when multiple profiles exist) */}
          {profiles.length > 1 && (
            <div>
              <Label className={labelClass}>Select Profile</Label>
              <MobileSelectPicker
                value=""
                onValueChange={(profileId) => {
                  const profile = profiles.find((p) => p.id === profileId);
                  if (profile) loadProfile(profile);
                }}
                options={profileOptions}
                placeholder={formData.testerName || 'Choose a saved profile...'}
                title="Select Profile"
                triggerClassName={inputClass}
              />
            </div>
          )}

          {/* Normal fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className={labelClass} htmlFor="testerName">
                Tester Name *
              </Label>
              <Input
                id="testerName"
                placeholder="Full name"
                value={formData.testerName || ''}
                onChange={(e) => onUpdate('testerName', e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <Label className={labelClass} htmlFor="testerCompany">
                Company
              </Label>
              <Input
                id="testerCompany"
                placeholder="Company name"
                value={formData.testerCompany || ''}
                onChange={(e) => onUpdate('testerCompany', e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="sm:col-span-2">
              <Label className={labelClass} htmlFor="testerQualifications">
                Qualifications
              </Label>
              <Input
                id="testerQualifications"
                placeholder="e.g., C&G 2377, NAPIT"
                value={formData.testerQualifications || ''}
                onChange={(e) => onUpdate('testerQualifications', e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Client Details ── */}
      <div>
        <SectionHeader title="Client Details" />
        <div className="space-y-3">
          <CertificateClientSection
            formData={formData}
            onUpdate={onUpdate}
            fieldMapping={DEFAULT_CLIENT_FIELDS}
          />
          <div>
            <Label className={labelClass} htmlFor="clientName">Client Name *</Label>
            <Input id="clientName" placeholder="Enter client name" value={formData.clientName || ''} onChange={(e) => onUpdate('clientName', e.target.value)} className={inputClass} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className={labelClass} htmlFor="contactPerson">Contact Person</Label>
              <Input id="contactPerson" placeholder="Contact name" value={formData.contactPerson || ''} onChange={(e) => onUpdate('contactPerson', e.target.value)} className={inputClass} />
            </div>
            <div>
              <Label className={labelClass} htmlFor="clientTelephone">Telephone</Label>
              <Input id="clientTelephone" type="tel" placeholder="Contact number" value={formData.clientTelephone || ''} onChange={(e) => onUpdate('clientTelephone', e.target.value)} className={inputClass} />
            </div>
          </div>
          <div>
            <Label className={labelClass} htmlFor="clientEmail">Email</Label>
            <Input id="clientEmail" type="email" placeholder="Email address" value={formData.clientEmail || ''} onChange={(e) => onUpdate('clientEmail', e.target.value)} className={inputClass} />
          </div>
          <div>
            <Label className={labelClass} htmlFor="clientAddress">Address</Label>
            <Input id="clientAddress" placeholder="Full address" value={formData.clientAddress || ''} onChange={(e) => onUpdate('clientAddress', e.target.value)} className={inputClass} />
          </div>
        </div>
      </div>

      {/* ── Site Information ── */}
      <div>
        <SectionHeader title="Site Information" />
        <div className="space-y-3">
          <div>
            <Label className={labelClass} htmlFor="siteName">
              Site Name
            </Label>
            <Input
              id="siteName"
              placeholder="Building or site name"
              value={formData.siteName || ''}
              onChange={(e) => onUpdate('siteName', e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <Label className={labelClass} htmlFor="siteAddress">
              Site Address *
            </Label>
            <Textarea
              id="siteAddress"
              placeholder="Full test location address"
              value={formData.siteAddress || ''}
              onChange={(e) => onUpdate('siteAddress', e.target.value)}
              className={textareaClass}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className={labelClass} htmlFor="siteContactName">
                Site Contact
              </Label>
              <Input
                id="siteContactName"
                placeholder="On-site contact name"
                value={formData.siteContactName || ''}
                onChange={(e) => onUpdate('siteContactName', e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <Label className={labelClass} htmlFor="siteContactPhone">
                Contact Phone
              </Label>
              <Input
                id="siteContactPhone"
                type="tel"
                placeholder="Contact number"
                value={formData.siteContactPhone || ''}
                onChange={(e) => onUpdate('siteContactPhone', e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Test Environment ── */}
      <div>
        <SectionHeader title="Test Environment" />
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className={labelClass} htmlFor="testTemperature">Ambient Temp (°C)</Label>
              <Input
                id="testTemperature"
                placeholder="e.g., 20"
                inputMode="decimal"
                value={formData.testTemperature || ''}
                onChange={(e) => onUpdate('testTemperature', e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
          {formData.testTemperature && (parseFloat(formData.testTemperature) < 20 || parseFloat(formData.testTemperature) > 35) && (
            <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] px-3 py-2">
              <p className="text-[11px] text-white">
                <span className="font-bold">Note:</span> Temperature outside 20-35°C range may affect insulation resistance readings. Apply correction factor per IET CoP.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ── Test Equipment ── */}
      <div>
        <SectionHeader title="Test Equipment" />
        <div className="space-y-3">
          {/* Load from Settings */}
          {savedPATInstruments.length > 0 && (
            <>
              {savedPATInstruments.length === 1 ? (
                <button
                  type="button"
                  onClick={() => loadEquipmentFromSettings(savedPATInstruments[0])}
                  className="w-full h-11 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white text-sm font-medium touch-manipulation active:scale-[0.98]"
                >
                  Load from Settings
                </button>
              ) : (
                <div className="space-y-2">
                  <Label className={labelClass}>Saved PAT Testers</Label>
                  {savedPATInstruments.map((instrument: TestingInstrument) => (
                    <button
                      key={instrument.id}
                      type="button"
                      onClick={() => loadEquipmentFromSettings(instrument)}
                      className="w-full h-11 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white text-sm font-medium touch-manipulation active:scale-[0.98] text-left px-4"
                    >
                      {instrument.make} {instrument.model}
                      {instrument.serial_number && (
                        <span className="text-white text-xs ml-2">
                          (S/N: {instrument.serial_number})
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Browse PAT tester database */}
          <div>
            <Label className={labelClass}>Browse PAT Testers</Label>
            <PATTesterAutocomplete
              currentMake={formData.testEquipment?.make || ''}
              currentModel={formData.testEquipment?.model || ''}
              onTesterSelect={(tester) => {
                onUpdate('testEquipment', {
                  ...formData.testEquipment,
                  make: tester.make,
                  model: tester.model,
                });
              }}
            />
          </div>

          {/* Make + Model side by side */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className={labelClass} htmlFor="equipmentMake">Make</Label>
              <Input id="equipmentMake" placeholder="e.g., Megger" value={formData.testEquipment?.make || ''} onChange={(e) => updateTestEquipment('make', e.target.value)} className={inputClass} />
            </div>
            <div>
              <Label className={labelClass} htmlFor="equipmentModel">Model</Label>
              <Input id="equipmentModel" placeholder="e.g., PAT420" value={formData.testEquipment?.model || ''} onChange={(e) => updateTestEquipment('model', e.target.value)} className={inputClass} />
            </div>
          </div>
          {/* Serial + Last Cal side by side */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className={labelClass} htmlFor="equipmentSerial">Serial Number</Label>
              <Input id="equipmentSerial" placeholder="Serial number" value={formData.testEquipment?.serialNumber || ''} onChange={(e) => updateTestEquipment('serialNumber', e.target.value)} className={inputClass} />
            </div>
            <div>
              <Label className={labelClass} htmlFor="lastCalibration">Last Calibration</Label>
              <Input id="lastCalibration" type="date" value={formData.testEquipment?.lastCalibrationDate || ''} onChange={(e) => updateTestEquipment('lastCalibrationDate', e.target.value)} className={inputClass} />
            </div>
          </div>
          {/* Next Cal full width */}
          <div>
            <Label className={labelClass} htmlFor="nextCalibration">Next Calibration Due</Label>
            <Input id="nextCalibration" type="date" value={formData.testEquipment?.nextCalibrationDue || ''} onChange={(e) => updateTestEquipment('nextCalibrationDue', e.target.value)} className={inputClass} />
          </div>
        </div>
      </div>

      {/* ── Certificate Details ── */}
      <div>
        <SectionHeader title="Certificate Details" />
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className={labelClass} htmlFor="certificateNumber">
                Certificate Number
              </Label>
              <Input
                id="certificateNumber"
                placeholder="Auto-generated if blank"
                value={formData.certificateNumber || ''}
                onChange={(e) => onUpdate('certificateNumber', e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <Label className={labelClass} htmlFor="testDate">
                Test Date
              </Label>
              <Input
                id="testDate"
                type="date"
                value={formData.testDate || new Date().toISOString().split('T')[0]}
                onChange={(e) => onUpdate('testDate', e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
          <div>
            <Label className={labelClass} htmlFor="reportReference">
              Report Reference
            </Label>
            <Input
              id="reportReference"
              placeholder="Optional reference"
              value={formData.reportReference || ''}
              onChange={(e) => onUpdate('reportReference', e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PATTestingClientDetails;
