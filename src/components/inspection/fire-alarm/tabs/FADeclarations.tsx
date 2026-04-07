/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Fire Alarm G2 — Tab 5: Declarations & Photos
 * Third-party cert, installer declaration, responsible person, photos
 */

import { useRef, useEffect, useState, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Camera, X, FileSearch } from 'lucide-react';
import { cn } from '@/lib/utils';
import SignatureInput from '@/components/signature/SignatureInput';
import { PreviousCertPreFillSheet } from '../PreviousCertPreFillSheet';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const inputCn =
  'h-12 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500 [color-scheme:dark]';
const checkboxCn =
  'border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black';
const textareaCn =
  'touch-manipulation text-base min-h-[80px] bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500';

const Section = ({
  title,
  accentColor,
  children,
}: {
  title: string;
  accentColor?: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-4">
    <div className="border-b border-white/[0.06] pb-1 mb-3">
      <div
        className={cn(
          'h-[2px] w-full rounded-full bg-gradient-to-r mb-2',
          accentColor || 'from-red-500 to-rose-400'
        )}
      />
      <h2 className="text-xs font-medium text-white uppercase tracking-wider">{title}</h2>
    </div>
    {children}
  </div>
);

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <Label className="text-white text-xs mb-1.5 block">{label}</Label>
    {children}
  </div>
);

interface Props {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

export default function FADeclarations({ formData, onUpdate }: Props) {
  const photoInputRef = useRef<HTMLInputElement>(null);
  const [preFillOpen, setPreFillOpen] = useState(false);
  const [previousCertData, setPreviousCertData] = useState<any>(null);
  const [loadingPrevious, setLoadingPrevious] = useState(false);

  // Auto-suggest service dates when installation completion date is entered
  useEffect(() => {
    if (!formData.commissioningDate) return;
    const date = new Date(formData.commissioningDate);
    if (isNaN(date.getTime())) return;

    // Only auto-fill if fields are empty
    if (!formData.nextServiceDue) {
      const service = new Date(date);
      service.setMonth(service.getMonth() + 6);
      onUpdate('nextServiceDue', service.toISOString().split('T')[0]);
    }
    if (!formData.nextInspectionDue) {
      const inspection = new Date(date);
      inspection.setFullYear(inspection.getFullYear() + 1);
      onUpdate('nextInspectionDue', inspection.toISOString().split('T')[0]);
    }
  }, [formData.commissioningDate]);

  // Fetch previous fire alarm cert at same premises
  const handlePreFillOpen = useCallback(async () => {
    if (!formData.premisesAddress && !formData.clientName) {
      toast.error('Enter a premises address or client name first');
      return;
    }
    setLoadingPrevious(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data: reports } = await supabase
        .from('reports')
        .select('data')
        .eq('user_id', user.id)
        .eq('report_type', 'fire-alarm')
        .is('deleted_at', null)
        .order('updated_at', { ascending: false })
        .limit(10);

      if (!reports || reports.length === 0) {
        toast('No previous fire alarm certificates found');
        setLoadingPrevious(false);
        return;
      }

      // Find a cert matching this premises address or client
      const address = (formData.premisesAddress || '').toLowerCase();
      const client = (formData.clientName || '').toLowerCase();
      const match = reports.find((r: any) => {
        const d = r.data || {};
        const matchAddr =
          address &&
          (d.premisesAddress || d.installationAddress || '').toLowerCase().includes(address);
        const matchClient = client && (d.clientName || '').toLowerCase().includes(client);
        return matchAddr || matchClient;
      });

      const certData = match?.data || reports[0]?.data;
      if (certData) {
        setPreviousCertData(certData);
        setPreFillOpen(true);
      } else {
        toast('No matching previous certificate found');
      }
    } catch (err) {
      console.error('Failed to load previous certs:', err);
      toast.error('Failed to load previous certificates');
    } finally {
      setLoadingPrevious(false);
    }
  }, [formData.premisesAddress, formData.clientName]);

  // Apply pre-fill selections
  const handlePreFillConfirm = useCallback(
    (selectedSections: string[]) => {
      if (!previousCertData || selectedSections.length === 0) return;

      if (selectedSections.includes('thirdParty')) {
        const cert = previousCertData.thirdPartyCertification || previousCertData;
        if (cert.bafeRegistration || cert.bafeRegistered)
          onUpdate('bafeRegistered', cert.bafeRegistration || cert.bafeRegistered || true);
        if (cert.fiaMembership || cert.fiaRegistered)
          onUpdate('fiaRegistered', cert.fiaMembership || cert.fiaRegistered || true);
        if (cert.nsiSsaibCertification || cert.nsiRegistered)
          onUpdate('nsiRegistered', cert.nsiSsaibCertification || cert.nsiRegistered || true);
        if (cert.thirdPartyCertNumber) onUpdate('thirdPartyCertNumber', cert.thirdPartyCertNumber);
      }

      if (selectedSections.includes('fra')) {
        const fra = previousCertData.fireRiskAssessment || previousCertData;
        if (fra.fraReference) onUpdate('fraReference', fra.fraReference);
        if (fra.fraDate) onUpdate('fraDate', fra.fraDate);
        if (fra.fraCompany) onUpdate('fraCompany', fra.fraCompany);
        if (fra.fraAuthor) onUpdate('fraAuthor', fra.fraAuthor);
      }

      if (selectedSections.includes('monitoring')) {
        const mon = previousCertData.monitoringDetails || previousCertData;
        if (mon.isMonitored || mon.systemMonitored)
          onUpdate('systemMonitored', mon.isMonitored || mon.systemMonitored);
        if (mon.arcName) onUpdate('arcName', mon.arcName);
        if (mon.arcAccountNumber) onUpdate('arcAccountNumber', mon.arcAccountNumber);
        if (mon.arcTelephone || mon.arcPhone)
          onUpdate('arcPhone', mon.arcTelephone || mon.arcPhone);
        if (mon.signallingRoute) onUpdate('signallingRoute', mon.signallingRoute);
      }

      toast.success(
        `Pre-filled ${selectedSections.length} section${selectedSections.length > 1 ? 's' : ''}`
      );
      setPreFillOpen(false);
    },
    [previousCertData, onUpdate]
  );

  const handlePhotoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    e.target.value = '';
    for (const file of Array.from(files)) {
      const reader = new FileReader();
      reader.onload = () => {
        onUpdate('photos', [...(formData.photos || []), reader.result as string]);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-5">
      {/* Third-Party Certification */}
      <Section title="Third-Party Certification" accentColor="from-elec-yellow/40 to-amber-400/20">
        <div className="space-y-3">
          {[
            { field: 'bafeRegistered', label: 'BAFE SP203-1 registered' },
            { field: 'fiaRegistered', label: 'FIA member' },
            { field: 'nsiRegistered', label: 'NSI / SSAIB approved' },
          ].map(({ field, label }) => (
            <div key={field} className="flex items-center gap-3">
              <Checkbox
                checked={formData[field] || false}
                onCheckedChange={(v) => onUpdate(field, v)}
                className={checkboxCn}
              />
              <Label className="text-sm text-white">{label}</Label>
            </div>
          ))}
          <Field label="Registration Number">
            <Input
              value={formData.thirdPartyCertNumber || ''}
              onChange={(e) => onUpdate('thirdPartyCertNumber', e.target.value)}
              className={inputCn}
            />
          </Field>
        </div>
      </Section>

      {/* Pre-fill from Previous */}
      <Section title="Pre-fill" accentColor="from-elec-yellow/40 to-amber-400/20">
        <Button
          variant="outline"
          onClick={handlePreFillOpen}
          disabled={loadingPrevious}
          className="w-full h-12 text-sm border-elec-yellow/20 text-elec-yellow hover:bg-elec-yellow/10 touch-manipulation active:scale-[0.98] rounded-xl"
        >
          <FileSearch className="h-4 w-4 mr-2" />
          {loadingPrevious ? 'Searching...' : 'Pre-fill from Previous Certificate'}
        </Button>
        <PreviousCertPreFillSheet
          open={preFillOpen}
          onOpenChange={setPreFillOpen}
          previousData={previousCertData}
          onConfirm={handlePreFillConfirm}
        />
      </Section>

      {/* Installer Declaration */}
      <Section title="Installer Declaration" accentColor="from-red-500/40 to-rose-400/20">
        <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3.5 mb-3">
          <p className="text-xs text-white leading-relaxed">
            I hereby certify that the fire detection and fire alarm system installation described in
            this certificate has been carried out in accordance with BS 5839-1:2025 and the design
            specification referenced above, except for any variations stated. The installation is
            complete and ready for commissioning.
          </p>
        </div>
        {(formData.installerName || formData.installerCompany) && (
          <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3">
            <p className="text-sm font-semibold text-white">
              {formData.installerName || 'Unnamed'}
            </p>
            {formData.installerCompany && (
              <p className="text-xs text-white mt-0.5">{formData.installerCompany}</p>
            )}
            <p className="text-[10px] text-white mt-1 uppercase tracking-wider">
              From Tab 1 — Installer Details
            </p>
          </div>
        )}
        <Field label="Qualifications">
          <Input
            value={formData.installerQualifications || ''}
            onChange={(e) => onUpdate('installerQualifications', e.target.value)}
            className={inputCn}
            placeholder="e.g. FIA certified, ECS card holder"
          />
        </Field>
        <SignatureInput
          label="Installer Signature *"
          value={formData.installerSignature || ''}
          onChange={(sig) => onUpdate('installerSignature', sig || '')}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Signature Date">
            <Input
              type="date"
              value={formData.installerSignatureDate || ''}
              onChange={(e) => onUpdate('installerSignatureDate', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="Installation Completion Date">
            <Input
              type="date"
              value={formData.commissioningDate || ''}
              onChange={(e) => onUpdate('commissioningDate', e.target.value)}
              className={inputCn}
            />
          </Field>
        </div>
      </Section>

      {/* Responsible Person */}
      <Section
        title="Responsible Person Acknowledgement"
        accentColor="from-blue-500/40 to-cyan-400/20"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Name">
            <Input
              value={formData.responsiblePersonName || ''}
              onChange={(e) => onUpdate('responsiblePersonName', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="Position">
            <Input
              value={formData.responsiblePersonPosition || ''}
              onChange={(e) => onUpdate('responsiblePersonPosition', e.target.value)}
              className={inputCn}
              placeholder="e.g. Building Manager"
            />
          </Field>
        </div>
        <SignatureInput
          label="Responsible Person Signature"
          value={formData.responsiblePersonSignature || ''}
          onChange={(sig) => onUpdate('responsiblePersonSignature', sig || '')}
        />
        <Field label="Date">
          <Input
            type="date"
            value={formData.responsiblePersonDate || ''}
            onChange={(e) => onUpdate('responsiblePersonDate', e.target.value)}
            className={inputCn}
          />
        </Field>
      </Section>

      {/* Photos */}
      <Section title="Photos" accentColor="from-cyan-500/40 to-blue-400/20">
        <input
          ref={photoInputRef}
          type="file"
          accept="image/*"
          multiple
          className="sr-only"
          onChange={handlePhotoCapture}
        />
        <label
          onClick={(e) => {
            e.preventDefault();
            photoInputRef.current?.click();
          }}
          className="w-full h-12 rounded-xl border-2 border-dashed border-white/[0.15] flex items-center justify-center gap-2.5 text-sm text-white touch-manipulation active:scale-[0.98] cursor-pointer"
        >
          <Camera className="h-4 w-4" /> Add Photos
        </label>
        {formData.photos?.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {formData.photos.map((photo: string, i: number) => (
              <div key={i} className="relative rounded-xl overflow-hidden aspect-square">
                <img src={photo} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
                <button
                  onClick={() =>
                    onUpdate(
                      'photos',
                      formData.photos.filter((_: any, j: number) => j !== i)
                    )
                  }
                  className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-black/60 flex items-center justify-center touch-manipulation"
                >
                  <X className="h-3.5 w-3.5 text-white" />
                </button>
              </div>
            ))}
          </div>
        )}
      </Section>

      {/* Overall Result */}
      <Section title="Overall Result" accentColor="from-green-500/40 to-emerald-400/20">
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => onUpdate('overallResult', 'satisfactory')}
            className={cn(
              'w-full text-left p-4 rounded-xl border touch-manipulation active:scale-[0.98] transition-all',
              formData.overallResult === 'satisfactory'
                ? 'bg-green-500/10 border-green-500/30'
                : 'bg-white/[0.03] border-white/[0.06]'
            )}
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  'w-5 h-5 rounded border-2 flex items-center justify-center transition-all flex-shrink-0',
                  formData.overallResult === 'satisfactory'
                    ? 'bg-green-500 border-green-500'
                    : 'border-white/30'
                )}
              >
                {formData.overallResult === 'satisfactory' && (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <p
                className={cn(
                  'text-sm font-semibold',
                  formData.overallResult === 'satisfactory' ? 'text-green-400' : 'text-white'
                )}
              >
                Satisfactory
              </p>
            </div>
          </button>
          <button
            type="button"
            onClick={() => onUpdate('overallResult', 'unsatisfactory')}
            className={cn(
              'w-full text-left p-4 rounded-xl border touch-manipulation active:scale-[0.98] transition-all',
              formData.overallResult === 'unsatisfactory'
                ? 'bg-red-500/10 border-red-500/30'
                : 'bg-white/[0.03] border-white/[0.06]'
            )}
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  'w-5 h-5 rounded border-2 flex items-center justify-center transition-all flex-shrink-0',
                  formData.overallResult === 'unsatisfactory'
                    ? 'bg-red-500 border-red-500'
                    : 'border-white/30'
                )}
              >
                {formData.overallResult === 'unsatisfactory' && (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <p
                className={cn(
                  'text-sm font-semibold',
                  formData.overallResult === 'unsatisfactory' ? 'text-red-400' : 'text-white'
                )}
              >
                Unsatisfactory
              </p>
            </div>
          </button>
        </div>
      </Section>

      {/* Next Service / Inspection */}
      <Section title="Service Schedule" accentColor="from-amber-500/40 to-yellow-400/20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Next Service Due">
            <Input
              type="date"
              value={formData.nextServiceDue || ''}
              onChange={(e) => onUpdate('nextServiceDue', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="Next Inspection Due">
            <Input
              type="date"
              value={formData.nextInspectionDue || ''}
              onChange={(e) => onUpdate('nextInspectionDue', e.target.value)}
              className={inputCn}
            />
          </Field>
        </div>
      </Section>

      {/* Notes */}
      <Section title="Notes" accentColor="from-white/20 to-white/5">
        <Textarea
          value={formData.additionalNotes || ''}
          onChange={(e) => onUpdate('additionalNotes', e.target.value)}
          className={textareaCn}
          placeholder="Additional notes..."
        />
      </Section>
    </div>
  );
}
