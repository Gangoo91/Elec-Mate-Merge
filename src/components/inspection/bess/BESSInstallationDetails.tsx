import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useBESSSmartForm } from '@/hooks/inspection/useBESSSmartForm';

const inputCn = 'h-12 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500 [color-scheme:dark]';
const selectTriggerCn = 'h-12 touch-manipulation bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500 data-[state=open]:border-yellow-500';
const selectContentCn = 'z-[100] max-w-[calc(100vw-2rem)] bg-elec-gray border-elec-gray text-foreground';
const checkboxCn = 'border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black';

const Section = ({ title, accentColor, children }: { title: string; accentColor?: string; children: React.ReactNode }) => (
  <div className="space-y-4">
    <div className="border-b border-white/[0.06] pb-1 mb-3">
      <div className={cn('h-[2px] w-full rounded-full bg-gradient-to-r mb-2', accentColor || 'from-green-500 to-emerald-400')} />
      <h2 className="text-xs font-medium text-white uppercase tracking-wider">{title}</h2>
    </div>
    {children}
  </div>
);

const Field = ({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
  <div><Label className="text-white text-xs mb-1.5 block">{label}{required && ' *'}</Label>{children}</div>
);

interface Props { formData: any; onUpdate: (field: string, value: any) => void; customerId?: string; onCustomerIdChange?: (id: string | undefined) => void }

export default function BESSInstallationDetails({ formData, onUpdate }: Props) {
  const { hasSavedInstallerDetails, loadInstallerDetails } = useBESSSmartForm();

  const handleLoadInstaller = () => {
    const details = loadInstallerDetails();
    if (details) Object.entries(details).forEach(([key, value]) => { if (value) onUpdate(key, value); });
  };

  return (
    <div className="space-y-5">
      {/* Client Details */}
      <Section title="Client Details" accentColor="from-blue-500/40 to-cyan-400/20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Client Name" required><Input value={formData.clientName} onChange={(e) => onUpdate('clientName', e.target.value)} className={inputCn} placeholder="Full name" /></Field>
          <Field label="Telephone"><Input type="tel" value={formData.clientTelephone} onChange={(e) => onUpdate('clientTelephone', e.target.value)} className={inputCn} /></Field>
        </div>
        <Field label="Email"><Input type="email" value={formData.clientEmail} onChange={(e) => onUpdate('clientEmail', e.target.value)} className={inputCn} /></Field>
        <Field label="Client Address"><Input value={formData.clientAddress} onChange={(e) => onUpdate('clientAddress', e.target.value)} className={inputCn} /></Field>
      </Section>

      {/* Installation Site */}
      <Section title="Installation Site" accentColor="from-emerald-500/40 to-green-400/20">
        <Field label="Installation Address" required><Input value={formData.installationAddress} onChange={(e) => onUpdate('installationAddress', e.target.value)} className={inputCn} placeholder="If different from client address" /></Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Installation Type">
            <Select value={formData.installationType} onValueChange={(v) => onUpdate('installationType', v)}>
              <SelectTrigger className={selectTriggerCn}><SelectValue /></SelectTrigger>
              <SelectContent className={selectContentCn}>
                <SelectItem value="domestic">Domestic</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="industrial">Industrial</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Battery Location">
            <Select value={formData.installationLocation} onValueChange={(v) => onUpdate('installationLocation', v)}>
              <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select..." /></SelectTrigger>
              <SelectContent className={selectContentCn}>
                <SelectItem value="indoor">Indoor</SelectItem>
                <SelectItem value="outdoor">Outdoor</SelectItem>
                <SelectItem value="garage">Garage</SelectItem>
                <SelectItem value="dedicated-enclosure">Dedicated Enclosure</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Installation Date"><Input type="date" value={formData.installationDate} onChange={(e) => onUpdate('installationDate', e.target.value)} className={inputCn} /></Field>
          <Field label="Commissioning Date"><Input type="date" value={formData.commissioningDate} onChange={(e) => onUpdate('commissioningDate', e.target.value)} className={inputCn} /></Field>
        </div>
      </Section>

      {/* Associated PV */}
      <Section title="Associated PV System" accentColor="from-yellow-500/40 to-amber-400/20">
        <div className="flex items-center gap-3">
          <Checkbox checked={formData.associatedPV} onCheckedChange={(v) => onUpdate('associatedPV', v)} className={checkboxCn} />
          <Label className="text-sm text-white">This BESS is paired with a PV system</Label>
        </div>
        {formData.associatedPV && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="PV Certificate Reference"><Input value={formData.associatedPVRef} onChange={(e) => onUpdate('associatedPVRef', e.target.value)} className={inputCn} placeholder="e.g. PV-2026-001" /></Field>
            <Field label="PV Capacity (kWp)"><Input type="number" step="0.1" value={formData.associatedPVCapacity} onChange={(e) => onUpdate('associatedPVCapacity', e.target.value)} className={inputCn} placeholder="e.g. 4.0" /></Field>
          </div>
        )}
      </Section>

      {/* Installer */}
      <Section title="Installer Details" accentColor="from-elec-yellow/40 to-amber-400/20">
        {hasSavedInstallerDetails && !formData.installerName && (
          <Button variant="outline" onClick={handleLoadInstaller} className="w-full h-12 border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 touch-manipulation">
            Load Installer from Business Settings
          </Button>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Name" required><Input value={formData.installerName} onChange={(e) => onUpdate('installerName', e.target.value)} className={inputCn} /></Field>
          <Field label="Company"><Input value={formData.installerCompany} onChange={(e) => onUpdate('installerCompany', e.target.value)} className={inputCn} /></Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Phone"><Input type="tel" value={formData.installerPhone} onChange={(e) => onUpdate('installerPhone', e.target.value)} className={inputCn} /></Field>
          <Field label="Email"><Input type="email" value={formData.installerEmail} onChange={(e) => onUpdate('installerEmail', e.target.value)} className={inputCn} /></Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Field label="Scheme"><Input value={formData.installerScheme} onChange={(e) => onUpdate('installerScheme', e.target.value)} className={inputCn} placeholder="NICEIC, NAPIT..." /></Field>
          <Field label="Scheme No."><Input value={formData.installerSchemeNumber} onChange={(e) => onUpdate('installerSchemeNumber', e.target.value)} className={inputCn} /></Field>
          <Field label="MCS No." required><Input value={formData.mcsInstallerNumber} onChange={(e) => onUpdate('mcsInstallerNumber', e.target.value)} className={inputCn} placeholder="MCS installer number" /></Field>
        </div>
      </Section>
    </div>
  );
}
