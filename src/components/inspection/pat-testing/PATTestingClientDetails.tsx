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

const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 space-y-4';

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';

const textareaCn =
  'textarea-soft rounded-xl border-0 bg-white/[0.05] px-3.5 py-3 text-base md:text-base text-white placeholder:text-white/25 caret-elec-yellow transition-colors focus:bg-white/[0.07] focus:ring-1 focus:ring-elec-yellow/50 focus-visible:ring-1 focus-visible:ring-elec-yellow/50 focus:outline-none focus:shadow-none min-h-[90px] touch-manipulation';

const labelCn = 'text-[12px] font-medium text-white mb-1 block';

const pickerTriggerCn =
  'rounded-none border-0 border-b border-white/[0.15] bg-transparent h-11 px-1 text-base font-medium text-white hover:border-white/[0.3] focus:border-elec-yellow focus:ring-0 focus-visible:ring-0 focus:outline-none touch-manipulation';

const voltButtonCn =
  'w-full h-11 rounded-xl bg-elec-yellow text-black text-sm font-semibold touch-manipulation active:scale-[0.98] transition-transform';

const SectionHeader = ({ title }: { title: string }) => (
  <h2 className="mb-3 text-[15px] font-semibold tracking-tight text-white">{title}</h2>
);

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
    <div className="py-4 space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4">
      {/* ── Tester profile ── */}
      <div className={cardCn}>
        <SectionHeader title="Tester profile" />

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
            className={voltButtonCn}
          >
            Load from Settings
          </button>
        )}

        {/* Profile selector (when multiple profiles exist) */}
        {profiles.length > 1 && (
          <div>
            <Label className={labelCn}>Select profile</Label>
            <MobileSelectPicker
              value=""
              onValueChange={(profileId) => {
                const profile = profiles.find((p) => p.id === profileId);
                if (profile) loadProfile(profile);
              }}
              options={profileOptions}
              placeholder={formData.testerName || 'Choose a saved profile...'}
              title="Select profile"
              triggerClassName={pickerTriggerCn}
            />
          </div>
        )}

        {/* Normal fields */}
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
            <Label className={labelCn} htmlFor="testerCompany">
              Company
            </Label>
            <Input
              id="testerCompany"
              placeholder="Company name"
              value={formData.testerCompany || ''}
              onChange={(e) => onUpdate('testerCompany', e.target.value)}
              className={inputCn}
            />
          </div>
          <div className="sm:col-span-2">
            <Label className={labelCn} htmlFor="testerQualifications">
              Qualifications
            </Label>
            <Input
              id="testerQualifications"
              placeholder="e.g. C&G 2377, NAPIT"
              value={formData.testerQualifications || ''}
              onChange={(e) => onUpdate('testerQualifications', e.target.value)}
              className={inputCn}
            />
          </div>
        </div>
      </div>

      {/* ── Client details ── */}
      <div className={cardCn}>
        <SectionHeader title="Client details" />
        <CertificateClientSection
          formData={formData}
          onUpdate={onUpdate}
          fieldMapping={DEFAULT_CLIENT_FIELDS}
        />
        <div>
          <Label className={labelCn} htmlFor="clientName">Client name *</Label>
          <Input id="clientName" placeholder="Enter client name" value={formData.clientName || ''} onChange={(e) => onUpdate('clientName', e.target.value)} className={inputCn} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <Label className={labelCn} htmlFor="contactPerson">Contact person</Label>
            <Input id="contactPerson" placeholder="Contact name" value={formData.contactPerson || ''} onChange={(e) => onUpdate('contactPerson', e.target.value)} className={inputCn} />
          </div>
          <div>
            <Label className={labelCn} htmlFor="clientTelephone">Telephone</Label>
            <Input id="clientTelephone" type="tel" placeholder="Contact number" value={formData.clientTelephone || ''} onChange={(e) => onUpdate('clientTelephone', e.target.value)} className={inputCn} />
          </div>
        </div>
        <div>
          <Label className={labelCn} htmlFor="clientEmail">Email</Label>
          <Input id="clientEmail" type="email" placeholder="Email address" value={formData.clientEmail || ''} onChange={(e) => onUpdate('clientEmail', e.target.value)} className={inputCn} />
        </div>
        <div>
          <Label className={labelCn} htmlFor="clientAddress">Address</Label>
          <Input id="clientAddress" placeholder="Full address" value={formData.clientAddress || ''} onChange={(e) => onUpdate('clientAddress', e.target.value)} className={inputCn} />
        </div>
      </div>

      {/* ── Site information ── */}
      <div className={cardCn}>
        <SectionHeader title="Site information" />
        <div>
          <Label className={labelCn} htmlFor="siteName">
            Site name
          </Label>
          <Input
            id="siteName"
            placeholder="Building or site name"
            value={formData.siteName || ''}
            onChange={(e) => onUpdate('siteName', e.target.value)}
            className={inputCn}
          />
        </div>
        <div>
          <Label className={labelCn} htmlFor="siteAddress">
            Site address *
          </Label>
          <Textarea
            id="siteAddress"
            placeholder="Full test location address"
            value={formData.siteAddress || ''}
            onChange={(e) => onUpdate('siteAddress', e.target.value)}
            className={textareaCn}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <Label className={labelCn} htmlFor="siteContactName">
              Site contact
            </Label>
            <Input
              id="siteContactName"
              placeholder="On-site contact name"
              value={formData.siteContactName || ''}
              onChange={(e) => onUpdate('siteContactName', e.target.value)}
              className={inputCn}
            />
          </div>
          <div>
            <Label className={labelCn} htmlFor="siteContactPhone">
              Contact phone
            </Label>
            <Input
              id="siteContactPhone"
              type="tel"
              placeholder="Contact number"
              value={formData.siteContactPhone || ''}
              onChange={(e) => onUpdate('siteContactPhone', e.target.value)}
              className={inputCn}
            />
          </div>
        </div>
      </div>

      {/* ── Test environment ── */}
      <div className={cardCn}>
        <SectionHeader title="Test environment" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <Label className={labelCn} htmlFor="testTemperature">Ambient temp (°C)</Label>
            <Input
              id="testTemperature"
              placeholder="e.g. 20"
              inputMode="decimal"
              value={formData.testTemperature || ''}
              onChange={(e) => onUpdate('testTemperature', e.target.value)}
              className={inputCn}
            />
          </div>
        </div>
        {formData.testTemperature && (parseFloat(formData.testTemperature) < 20 || parseFloat(formData.testTemperature) > 35) && (
          <div className="rounded-xl bg-white/[0.05] px-3.5 py-3">
            <p className="text-[12px] text-white/85 leading-relaxed">
              <span className="font-semibold text-white">Note:</span> Temperature outside 20-35°C range may affect insulation resistance readings. Apply correction factor per IET CoP.
            </p>
          </div>
        )}
      </div>

      {/* ── Test equipment ── */}
      <div className={cardCn}>
        <SectionHeader title="Test equipment" />

        {/* Load from Settings */}
        {savedPATInstruments.length > 0 && (
          <>
            {savedPATInstruments.length === 1 ? (
              <button
                type="button"
                onClick={() => loadEquipmentFromSettings(savedPATInstruments[0])}
                className={voltButtonCn}
              >
                Load from Settings
              </button>
            ) : (
              <div className="space-y-2">
                <Label className={labelCn}>Saved PAT testers</Label>
                {savedPATInstruments.map((instrument: TestingInstrument) => (
                  <button
                    key={instrument.id}
                    type="button"
                    onClick={() => loadEquipmentFromSettings(instrument)}
                    className="w-full h-11 rounded-xl bg-white/[0.06] border border-white/[0.12] text-white text-sm font-medium touch-manipulation active:scale-[0.98] text-left px-4"
                  >
                    {instrument.make} {instrument.model}
                    {instrument.serial_number && (
                      <span className="text-white/80 text-xs ml-2">
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
          <Label className={labelCn}>Browse PAT testers</Label>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <Label className={labelCn} htmlFor="equipmentMake">Make</Label>
            <Input id="equipmentMake" placeholder="e.g. Megger" value={formData.testEquipment?.make || ''} onChange={(e) => updateTestEquipment('make', e.target.value)} className={inputCn} />
          </div>
          <div>
            <Label className={labelCn} htmlFor="equipmentModel">Model</Label>
            <Input id="equipmentModel" placeholder="e.g. PAT420" value={formData.testEquipment?.model || ''} onChange={(e) => updateTestEquipment('model', e.target.value)} className={inputCn} />
          </div>
        </div>
        {/* Serial + Last Cal side by side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <Label className={labelCn} htmlFor="equipmentSerial">Serial number</Label>
            <Input id="equipmentSerial" placeholder="Serial number" value={formData.testEquipment?.serialNumber || ''} onChange={(e) => updateTestEquipment('serialNumber', e.target.value)} className={inputCn} />
          </div>
          <div>
            <Label className={labelCn} htmlFor="lastCalibration">Last calibration</Label>
            <Input id="lastCalibration" type="date" value={formData.testEquipment?.lastCalibrationDate || ''} onChange={(e) => updateTestEquipment('lastCalibrationDate', e.target.value)} className={inputCn} />
          </div>
        </div>
        {/* Next Cal full width */}
        <div>
          <Label className={labelCn} htmlFor="nextCalibration">Next calibration due</Label>
          <Input id="nextCalibration" type="date" value={formData.testEquipment?.nextCalibrationDue || ''} onChange={(e) => updateTestEquipment('nextCalibrationDue', e.target.value)} className={inputCn} />
        </div>
      </div>

      {/* ── Certificate details ── */}
      <div className={cardCn}>
        <SectionHeader title="Certificate details" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <Label className={labelCn} htmlFor="certificateNumber">
              Certificate number
            </Label>
            <Input
              id="certificateNumber"
              placeholder="Auto-generated if blank"
              value={formData.certificateNumber || ''}
              onChange={(e) => onUpdate('certificateNumber', e.target.value)}
              className={inputCn}
            />
          </div>
          <div>
            <Label className={labelCn} htmlFor="testDate">
              Test date
            </Label>
            <Input
              id="testDate"
              type="date"
              value={formData.testDate || new Date().toISOString().split('T')[0]}
              onChange={(e) => onUpdate('testDate', e.target.value)}
              className={inputCn}
            />
          </div>
        </div>
        <div>
          <Label className={labelCn} htmlFor="reportReference">
            Report reference
          </Label>
          <Input
            id="reportReference"
            placeholder="Optional reference"
            value={formData.reportReference || ''}
            onChange={(e) => onUpdate('reportReference', e.target.value)}
            className={inputCn}
          />
        </div>
      </div>
    </div>
  );
};

export default PATTestingClientDetails;
