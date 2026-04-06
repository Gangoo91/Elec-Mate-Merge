import { useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Camera, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import SignatureInput from '@/components/signature/SignatureInput';

const inputCn = 'h-12 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500 [color-scheme:dark]';
const checkboxCn = 'border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black';
const textareaCn = 'touch-manipulation text-base min-h-[80px] bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500';

const Section = ({ title, accentColor, children }: { title: string; accentColor?: string; children: React.ReactNode }) => (
  <div className="space-y-4">
    <div className="border-b border-white/[0.06] pb-1 mb-3">
      <div className={cn('h-[2px] w-full rounded-full bg-gradient-to-r mb-2', accentColor || 'from-elec-yellow to-amber-400')} />
      <h2 className="text-xs font-medium text-white uppercase tracking-wider">{title}</h2>
    </div>
    {children}
  </div>
);

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div><Label className="text-white text-xs mb-1.5 block">{label}</Label>{children}</div>
);

interface Props { formData: any; onUpdate: (field: string, value: any) => void }

export default function BESSDeclarations({ formData, onUpdate }: Props) {
  const photoInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files; if (!files) return; e.target.value = '';
    for (const file of Array.from(files)) {
      const reader = new FileReader();
      reader.onload = () => { onUpdate('photos', [...(formData.photos || []), reader.result as string]); };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = (index: number) => {
    onUpdate('photos', (formData.photos || []).filter((_: any, i: number) => i !== index));
  };

  return (
    <div className="space-y-5">
      {/* Customer Handover */}
      <Section title="Customer Handover" accentColor="from-blue-500/40 to-cyan-400/20">
        {[
          { field: 'operatingInstructionsProvided', label: 'Operating instructions provided and explained' },
          { field: 'emergencyShutdownExplained', label: 'Emergency shutdown procedure explained' },
          { field: 'maintenanceScheduleProvided', label: 'Maintenance schedule provided' },
          { field: 'customerAppSetup', label: 'Customer app / monitoring access set up' },
          { field: 'dnoNotificationCopyProvided', label: 'DNO notification copy provided' },
          { field: 'mcsCertificateProvided', label: 'MCS certificate provided' },
          { field: 'warrantyRegistered', label: 'Warranty registration confirmed' },
          { field: 'buildingControlNotified', label: 'Building control notification (if required)' },
        ].map(({ field, label }) => (
          <div key={field} className="flex items-center gap-3">
            <Checkbox checked={formData[field]} onCheckedChange={(v) => onUpdate(field, v)} className={checkboxCn} />
            <Label className="text-sm text-white">{label}</Label>
          </div>
        ))}
      </Section>

      {/* Warranty */}
      <Section title="Warranty" accentColor="from-emerald-500/40 to-green-400/20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Battery Warranty (years)"><Input value={formData.batteryWarrantyYears} onChange={(e) => onUpdate('batteryWarrantyYears', e.target.value)} className={inputCn} placeholder="e.g. 10" /></Field>
          <Field label="Inverter Warranty (years)"><Input value={formData.inverterWarrantyYears} onChange={(e) => onUpdate('inverterWarrantyYears', e.target.value)} className={inputCn} placeholder="e.g. 5" /></Field>
        </div>
      </Section>

      {/* Declaration & Signatures */}
      <Section title="Declaration & Signatures" accentColor="from-elec-yellow/40 to-amber-400/20">
        <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3.5 mb-3">
          <p className="text-xs text-white leading-relaxed">I hereby certify that the battery energy storage system installation described in this certificate has been designed, installed, inspected, tested, and commissioned in accordance with BS 7671:2018+A3:2024, the IET Code of Practice for Electrical Energy Storage Systems, and the manufacturer's installation instructions. The system is safe for use and complies with the relevant requirements of the Distribution Network Operator.</p>
        </div>

        <SignatureInput label="Installer Signature *" value={formData.installerSignature} onChange={(sig) => onUpdate('installerSignature', sig || '')} />
        <Field label="Installer Date"><Input type="date" value={formData.installerDate} onChange={(e) => onUpdate('installerDate', e.target.value)} className={inputCn} /></Field>

        <Field label="Commissioner Name (if different)"><Input value={formData.commissionerName} onChange={(e) => onUpdate('commissionerName', e.target.value)} className={inputCn} placeholder="Leave blank if same as installer" /></Field>
        {formData.commissionerName && <SignatureInput label="Commissioner Signature" value={formData.commissionerSignature} onChange={(sig) => onUpdate('commissionerSignature', sig || '')} />}

        <SignatureInput label="Client Acknowledgement Signature" value={formData.clientSignature} onChange={(sig) => onUpdate('clientSignature', sig || '')} />
        {formData.clientSignature && <Field label="Client Date"><Input type="date" value={formData.clientDate} onChange={(e) => onUpdate('clientDate', e.target.value)} className={inputCn} /></Field>}
      </Section>

      {/* Photos */}
      <Section title="Photo Evidence" accentColor="from-cyan-500/40 to-blue-400/20">
        <input ref={photoInputRef} type="file" accept="image/*" capture="environment" multiple className="hidden" onChange={handlePhotoCapture} />
        <button onClick={() => photoInputRef.current?.click()} className="w-full h-12 rounded-xl border-2 border-dashed border-white/[0.15] flex items-center justify-center gap-2.5 text-sm text-white touch-manipulation active:scale-[0.98]">
          <Camera className="h-4 w-4" /> Add Photos
        </button>
        {formData.photos?.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {formData.photos.map((photo: string, i: number) => (
              <div key={i} className="relative rounded-xl overflow-hidden aspect-square">
                <img src={photo} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
                <button onClick={() => removePhoto(i)} className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-black/60 flex items-center justify-center touch-manipulation"><X className="h-3.5 w-3.5 text-white" /></button>
              </div>
            ))}
          </div>
        )}
        <p className="text-[10px] text-white">Recommended: battery installation, warning labels, AC + DC isolation, consumer unit, meter, cable routing</p>
      </Section>

      {/* Notes */}
      <Section title="Notes & Observations" accentColor="from-white/20 to-white/5">
        <Field label="Defects / Observations"><Textarea value={formData.defectsObservations} onChange={(e) => onUpdate('defectsObservations', e.target.value)} className={textareaCn} placeholder="Any defects found or observations..." /></Field>
        <Field label="Additional Notes"><Textarea value={formData.additionalNotes} onChange={(e) => onUpdate('additionalNotes', e.target.value)} className={textareaCn} placeholder="Additional notes, recommendations..." /></Field>
      </Section>
    </div>
  );
}
