import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { useBESSSmartForm } from '@/hooks/inspection/useBESSSmartForm';
import CertificateClientSection from '@/components/inspection/shared/CertificateClientSection';

const inputCn = 'h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] text-white [color-scheme:dark]';
const checkboxCn = 'border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black';
const pickerTrigger = 'h-11 w-full touch-manipulation bg-white/[0.06] border-white/[0.08] text-white';

const SectionHeader = ({ title }: { title: string }) => (
  <div className="border-b border-white/[0.06] pb-1 mb-3">
    <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
    <h2 className="text-xs font-medium text-white uppercase tracking-wider">{title}</h2>
  </div>
);

const Field = ({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
  <div><Label className="text-white text-xs mb-1.5 block">{label}{required && ' *'}</Label>{children}</div>
);

const Sub = ({ title }: { title: string }) => (
  <div className="flex items-center gap-2 pt-2">
    <p className="text-[10px] font-semibold text-white/40 uppercase tracking-wider shrink-0">{title}</p>
    <div className="h-px flex-1 bg-white/[0.06]" />
  </div>
);

interface Props { formData: any; onUpdate: (field: string, value: any) => void; customerId?: string; onCustomerIdChange?: (id: string | undefined) => void }

export default function BESSInstallationDetails({ formData, onUpdate }: Props) {
  const { hasSavedInstallerDetails, loadInstallerDetails, getEESSClassSuggestion } = useBESSSmartForm();

  const handleLoadInstaller = () => {
    const details = loadInstallerDetails();
    if (details) Object.entries(details).forEach(([key, value]) => { if (value) onUpdate(key, value); });
  };

  return (
    <div className="space-y-6">
      {/* Client Details */}
      <div className="space-y-4">
        <SectionHeader title="Client Details" />
        <CertificateClientSection formData={formData} onUpdate={onUpdate} />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Client Name" required><Input value={formData.clientName} onChange={(e) => onUpdate('clientName', e.target.value)} className={inputCn} placeholder="Full name" /></Field>
          <Field label="Telephone"><Input type="tel" value={formData.clientTelephone} onChange={(e) => onUpdate('clientTelephone', e.target.value)} className={inputCn} /></Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Email"><Input type="email" value={formData.clientEmail} onChange={(e) => onUpdate('clientEmail', e.target.value)} className={inputCn} /></Field>
          <Field label="Contact Person"><Input value={formData.contactPerson} onChange={(e) => onUpdate('contactPerson', e.target.value)} className={inputCn} /></Field>
        </div>
        <Field label="Client Address"><Input value={formData.clientAddress} onChange={(e) => onUpdate('clientAddress', e.target.value)} className={inputCn} /></Field>
      </div>

      {/* Installation Site */}
      <div className="space-y-4">
        <SectionHeader title="Installation Site" />
        <Field label="Installation Address" required><Input value={formData.installationAddress} onChange={(e) => onUpdate('installationAddress', e.target.value)} className={inputCn} placeholder="If different from client address" /></Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Installation Type">
            <MobileSelectPicker
              value={formData.installationType}
              onValueChange={(v) => onUpdate('installationType', v)}
              options={[
                { value: 'domestic', label: 'Domestic' },
                { value: 'commercial', label: 'Commercial' },
                { value: 'industrial', label: 'Industrial' },
              ]}
              placeholder="Select..."
              triggerClassName={pickerTrigger}
            />
          </Field>
          <Field label="Battery Location">
            <MobileSelectPicker
              value={formData.installationLocation}
              onValueChange={(v) => onUpdate('installationLocation', v)}
              options={[
                { value: 'indoor', label: 'Indoor' },
                { value: 'outdoor', label: 'Outdoor' },
                { value: 'garage', label: 'Garage' },
                { value: 'dedicated-enclosure', label: 'Dedicated Enclosure' },
              ]}
              placeholder="Select..."
              triggerClassName={pickerTrigger}
            />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Installation Date"><Input type="date" value={formData.installationDate} onChange={(e) => onUpdate('installationDate', e.target.value)} className={inputCn} /></Field>
          <Field label="Commissioning Date"><Input type="date" value={formData.commissioningDate} onChange={(e) => onUpdate('commissioningDate', e.target.value)} className={inputCn} /></Field>
        </div>
        <Sub title="EESS Classification (MIS 3012)" />
        <MobileSelectPicker
          value={formData.eessClass}
          onValueChange={(v) => onUpdate('eessClass', v)}
          options={[
            { value: '1', label: 'Class 1 — Same manufacturer, single enclosure' },
            { value: '2', label: 'Class 2 — Same manufacturer, separate enclosures' },
            { value: '3', label: 'Class 3 — Different manufacturers (verify compatibility)' },
            { value: '4', label: 'Class 4 — All different manufacturers (installer configures)' },
          ]}
          placeholder="Select EESS class..."
          triggerClassName={pickerTrigger}
        />
        {(() => {
          const suggestion = getEESSClassSuggestion(formData);
          return suggestion.suggested && !formData.eessClass ? (
            <p className="text-[10px] text-elec-yellow mt-1">{suggestion.description}</p>
          ) : null;
        })()}
      </div>

      {/* Associated PV */}
      <div className="space-y-4">
        <SectionHeader title="Associated PV System" />
        <div className="flex items-center gap-3">
          <Checkbox checked={formData.associatedPV} onCheckedChange={(v) => onUpdate('associatedPV', v)} className={checkboxCn} />
          <Label className="text-sm text-white">This BESS is paired with a PV system</Label>
        </div>
        {formData.associatedPV && (
          <div className="grid grid-cols-2 gap-3">
            <Field label="PV Certificate Ref"><Input value={formData.associatedPVRef} onChange={(e) => onUpdate('associatedPVRef', e.target.value)} className={inputCn} placeholder="e.g. PV-2026-001" /></Field>
            <Field label="PV Capacity (kWp)"><Input type="number" step="0.1" value={formData.associatedPVCapacity} onChange={(e) => onUpdate('associatedPVCapacity', e.target.value)} className={inputCn} placeholder="e.g. 4.0" /></Field>
          </div>
        )}
      </div>

      {/* Installer */}
      <div className="space-y-4">
        <SectionHeader title="Installer Details" />
        {hasSavedInstallerDetails && !formData.installerName && (
          <Button variant="outline" onClick={handleLoadInstaller} className="w-full h-11 border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 touch-manipulation active:scale-[0.98]">
            Load Installer from Business Settings
          </Button>
        )}
        <div className="grid grid-cols-2 gap-3">
          <Field label="Name" required><Input value={formData.installerName} onChange={(e) => onUpdate('installerName', e.target.value)} className={inputCn} /></Field>
          <Field label="Company"><Input value={formData.installerCompany} onChange={(e) => onUpdate('installerCompany', e.target.value)} className={inputCn} /></Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Phone"><Input type="tel" value={formData.installerPhone} onChange={(e) => onUpdate('installerPhone', e.target.value)} className={inputCn} /></Field>
          <Field label="Email"><Input type="email" value={formData.installerEmail} onChange={(e) => onUpdate('installerEmail', e.target.value)} className={inputCn} /></Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Scheme"><Input value={formData.installerScheme} onChange={(e) => onUpdate('installerScheme', e.target.value)} className={inputCn} placeholder="NICEIC, NAPIT..." /></Field>
          <Field label="Scheme No."><Input value={formData.installerSchemeNumber} onChange={(e) => onUpdate('installerSchemeNumber', e.target.value)} className={inputCn} /></Field>
        </div>
        <Field label="MCS No." required><Input value={formData.mcsInstallerNumber} onChange={(e) => onUpdate('mcsInstallerNumber', e.target.value)} className={inputCn} placeholder="MCS installer number" /></Field>
      </div>
    </div>
  );
}
