import { useState, useRef } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Camera, FileCheck, Handshake, MessageSquare, ChevronUp, ChevronDown, X } from 'lucide-react';
import SignatureInput from '@/components/signature/SignatureInput';

const checkboxCn = 'border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black';
const textareaCn = 'text-base touch-manipulation min-h-[80px] border-white/30 focus:border-yellow-500 focus:ring-yellow-500';

interface SectionHeaderProps { title: string; icon: React.ReactNode; isOpen: boolean; color: string; subtitle?: string }
const SectionHeader = ({ title, icon, isOpen, color, subtitle }: SectionHeaderProps) => (
  <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-white/5 transition-colors rounded-t-xl">
    <div className="flex items-center gap-3">
      <div className={`w-10 h-11 rounded-xl flex items-center justify-center bg-${color}/15`}>{icon}</div>
      <div className="text-left"><h3 className="text-base font-semibold text-foreground">{title}</h3>{subtitle && <span className="text-xs text-white">{subtitle}</span>}</div>
    </div>
    {isOpen ? <ChevronUp className="h-5 w-5 text-white" /> : <ChevronDown className="h-5 w-5 text-white" />}
  </CollapsibleTrigger>
);

interface Props { formData: any; onUpdate: (field: string, value: any) => void }

export default function BESSDeclarations({ formData, onUpdate }: Props) {
  const [handoverOpen, setHandoverOpen] = useState(true);
  const [declOpen, setDeclOpen] = useState(true);
  const [photosOpen, setPhotosOpen] = useState(true);
  const [notesOpen, setNotesOpen] = useState(false);
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
    <div className="space-y-3">
      {/* Customer Handover */}
      <div className="eicr-section-card">
        <Collapsible open={handoverOpen} onOpenChange={setHandoverOpen}>
          <SectionHeader title="Customer Handover" icon={<Handshake className="h-5 w-5 text-blue-400" />} isOpen={handoverOpen} color="blue-500" subtitle="Documentation & instructions" />
          <CollapsibleContent>
            <div className="p-4 space-y-3">
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
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Declaration & Signatures */}
      <div className="eicr-section-card">
        <Collapsible open={declOpen} onOpenChange={setDeclOpen}>
          <SectionHeader title="Declaration & Signatures" icon={<FileCheck className="h-5 w-5 text-green-400" />} isOpen={declOpen} color="green-500" subtitle="Installer & client sign-off" />
          <CollapsibleContent>
            <div className="p-4 space-y-4">
              <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-4">
                <p className="text-xs text-white leading-relaxed">I hereby certify that the battery energy storage system installation described in this certificate has been designed, installed, inspected, tested, and commissioned in accordance with BS 7671:2018+A3:2024, the IET Code of Practice for Electrical Energy Storage Systems, and the manufacturer's installation instructions. The system is safe for use and complies with the relevant requirements of the Distribution Network Operator.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <div className="space-y-2"><Label className="text-xs text-white">Battery Warranty (years)</Label><Input value={formData.batteryWarrantyYears} onChange={(e) => onUpdate('batteryWarrantyYears', e.target.value)} className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500" placeholder="e.g. 10" /></div>
                <div className="space-y-2"><Label className="text-xs text-white">Inverter Warranty (years)</Label><Input value={formData.inverterWarrantyYears} onChange={(e) => onUpdate('inverterWarrantyYears', e.target.value)} className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500" placeholder="e.g. 5" /></div>
              </div>

              <SignatureInput label="Installer Signature *" value={formData.installerSignature} onChange={(sig) => onUpdate('installerSignature', sig || '')} />
              <div className="space-y-2"><Label className="text-xs text-white">Installer Date</Label><Input type="date" value={formData.installerDate} onChange={(e) => onUpdate('installerDate', e.target.value)} className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500 [color-scheme:dark]" /></div>

              <div className="space-y-2"><Label className="text-xs text-white">Commissioner Name (if different)</Label><Input value={formData.commissionerName} onChange={(e) => onUpdate('commissionerName', e.target.value)} className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500" placeholder="Leave blank if same as installer" /></div>
              {formData.commissionerName && (
                <SignatureInput label="Commissioner Signature" value={formData.commissionerSignature} onChange={(sig) => onUpdate('commissionerSignature', sig || '')} />
              )}

              <SignatureInput label="Client Acknowledgement Signature" value={formData.clientSignature} onChange={(sig) => onUpdate('clientSignature', sig || '')} />
              <div className="space-y-2"><Label className="text-xs text-white">Client Date</Label><Input type="date" value={formData.clientDate} onChange={(e) => onUpdate('clientDate', e.target.value)} className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500 [color-scheme:dark]" /></div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Photos */}
      <div className="eicr-section-card">
        <Collapsible open={photosOpen} onOpenChange={setPhotosOpen}>
          <SectionHeader title="Photo Evidence" icon={<Camera className="h-5 w-5 text-cyan-400" />} isOpen={photosOpen} color="cyan-500" subtitle="Battery, labels, isolation points" />
          <CollapsibleContent>
            <div className="p-4 space-y-4">
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
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Notes */}
      <div className="eicr-section-card">
        <Collapsible open={notesOpen} onOpenChange={setNotesOpen}>
          <SectionHeader title="Notes & Observations" icon={<MessageSquare className="h-5 w-5 text-white" />} isOpen={notesOpen} color="white" />
          <CollapsibleContent>
            <div className="p-4 space-y-4">
              <div className="space-y-2"><Label className="text-xs text-white">Defects / Observations</Label><Textarea value={formData.defectsObservations} onChange={(e) => onUpdate('defectsObservations', e.target.value)} className={textareaCn} placeholder="Any defects found or observations..." /></div>
              <div className="space-y-2"><Label className="text-xs text-white">Additional Notes</Label><Textarea value={formData.additionalNotes} onChange={(e) => onUpdate('additionalNotes', e.target.value)} className={textareaCn} placeholder="Additional notes, recommendations..." /></div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}
