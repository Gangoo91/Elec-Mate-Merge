/**
 * Fire Alarm G2 — Tab 1: Client & Premises
 * Clean Section/Field pattern matching G98/BESS design language
 */

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useEffect } from 'react';
import ComboboxCell from '@/components/table-cells/ComboboxCell';
import CertificateClientSection from '@/components/inspection/shared/CertificateClientSection';

const inputCn = 'h-12 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500 [color-scheme:dark]';

const premisesTypeOptions = [
  { value: 'Office', label: 'Office' },
  { value: 'Retail', label: 'Retail' },
  { value: 'Warehouse', label: 'Warehouse' },
  { value: 'Factory', label: 'Factory / Industrial' },
  { value: 'School', label: 'School / Education' },
  { value: 'Hospital', label: 'Hospital / Healthcare' },
  { value: 'Care Home', label: 'Care Home / Residential' },
  { value: 'Hotel', label: 'Hotel / B&B' },
  { value: 'HMO', label: 'HMO' },
  { value: 'Place of Worship', label: 'Place of Worship' },
  { value: 'Restaurant', label: 'Restaurant / Kitchen' },
  { value: 'Leisure', label: 'Leisure / Sports' },
  { value: 'Data Centre', label: 'Data Centre' },
  { value: 'Mixed Use', label: 'Mixed Use' },
];

const occupancyTypeOptions = [
  { value: 'Sleeping', label: 'Sleeping accommodation' },
  { value: 'Non-sleeping', label: 'Non-sleeping' },
  { value: 'Mixed', label: 'Mixed (sleeping + non-sleeping)' },
  { value: 'Unoccupied', label: 'Unoccupied / Storage' },
];

const Section = ({ title, accentColor, children }: { title: string; accentColor?: string; children: React.ReactNode }) => (
  <div className="space-y-4">
    <div className="border-b border-white/[0.06] pb-1 mb-3">
      <div className={cn('h-[2px] w-full rounded-full bg-gradient-to-r mb-2', accentColor || 'from-red-500 to-rose-400')} />
      <h2 className="text-xs font-medium text-white uppercase tracking-wider">{title}</h2>
    </div>
    {children}
  </div>
);

const Field = ({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
  <div><Label className="text-white text-xs mb-1.5 block">{label}{required && ' *'}</Label>{children}</div>
);

interface Props { formData: any; onUpdate: (field: string, value: any) => void }

export default function FAClientPremises({ formData, onUpdate }: Props) {
  // Auto-load installer details from company profile
  useEffect(() => {
    if (formData.installerName) return;
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return;
      const { data: cpData } = await supabase.rpc('get_my_company_profile');
      const cp = Array.isArray(cpData) ? cpData[0] : cpData;
      if (cp) {
        onUpdate('installerName', cp.inspector_name || cp.company_name || '');
        onUpdate('installerCompany', cp.company_name || '');
        onUpdate('installerPhone', cp.company_phone || '');
        onUpdate('installerEmail', cp.company_email || '');
        onUpdate('registrationScheme', cp.registration_scheme || '');
        onUpdate('registrationNumber', cp.registration_number || '');
      }
    });
  }, []);

  return (
    <div className="space-y-5">
      {/* Header Banner */}
      <div className="border-b border-red-500/20 pb-3">
        <p className="text-sm font-bold text-red-400">FIRE ALARM INSTALLATION CERTIFICATE (G2)</p>
        <p className="text-xs text-white mt-1">BS 5839-1:2025 — Fire detection and fire alarm systems for buildings</p>
      </div>

      {/* Certificate Reference */}
      <Section title="Certificate Reference" accentColor="from-white/20 to-white/5">
        <Field label="Certificate Number"><Input value={formData.certificateNumber || ''} onChange={(e) => onUpdate('certificateNumber', e.target.value)} className={inputCn} /></Field>
        <Field label="Date of Issue"><Input type="date" value={formData.installationDate || ''} onChange={(e) => onUpdate('installationDate', e.target.value)} className={inputCn} /></Field>
      </Section>

      {/* Client Details */}
      <Section title="Client Details" accentColor="from-blue-500/40 to-cyan-400/20">
        <CertificateClientSection formData={formData} onUpdate={onUpdate} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Client Name" required><Input value={formData.clientName || ''} onChange={(e) => onUpdate('clientName', e.target.value)} className={inputCn} /></Field>
          <Field label="Client Position"><Input value={formData.clientPosition || ''} onChange={(e) => onUpdate('clientPosition', e.target.value)} className={inputCn} placeholder="e.g. Building Manager" /></Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Phone"><Input type="tel" value={formData.clientTelephone || ''} onChange={(e) => onUpdate('clientTelephone', e.target.value)} className={inputCn} /></Field>
          <Field label="Email"><Input type="email" value={formData.clientEmail || ''} onChange={(e) => onUpdate('clientEmail', e.target.value)} className={inputCn} /></Field>
        </div>
        <Field label="Client Address"><Input value={formData.clientAddress || ''} onChange={(e) => onUpdate('clientAddress', e.target.value)} className={inputCn} /></Field>
      </Section>

      {/* Premises Details */}
      <Section title="Premises Details" accentColor="from-red-500/40 to-orange-400/20">
        <Field label="Premises Name"><Input value={formData.premisesName || ''} onChange={(e) => onUpdate('premisesName', e.target.value)} className={inputCn} placeholder="e.g. Acme Office Building" /></Field>
        <Field label="Premises Address" required><Input value={formData.premisesAddress || formData.installationAddress || ''} onChange={(e) => onUpdate('premisesAddress', e.target.value)} className={inputCn} /></Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Premises Type">
            <ComboboxCell value={formData.premisesType || ''} onChange={(v) => onUpdate('premisesType', v)} options={premisesTypeOptions} placeholder="Select or type..." className="h-12 text-base" />
          </Field>
          <Field label="Occupancy Type">
            <ComboboxCell value={formData.occupancyType || ''} onChange={(v) => onUpdate('occupancyType', v)} options={occupancyTypeOptions} placeholder="Select or type..." className="h-12 text-base" />
          </Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Number of Floors"><Input type="number" inputMode="numeric" value={formData.numberOfFloors || ''} onChange={(e) => onUpdate('numberOfFloors', e.target.value)} className={inputCn} /></Field>
          <Field label="Approximate Floor Area (m²)"><Input value={formData.floorArea || ''} onChange={(e) => onUpdate('floorArea', e.target.value)} inputMode="decimal" className={inputCn} placeholder="e.g. 500" /></Field>
        </div>
      </Section>

      {/* Fire Risk Assessment */}
      <Section title="Fire Risk Assessment" accentColor="from-amber-500/40 to-yellow-400/20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="FRA Reference"><Input value={formData.fraReference || ''} onChange={(e) => onUpdate('fraReference', e.target.value)} className={inputCn} placeholder="e.g. FRA-2026-001" /></Field>
          <Field label="FRA Date"><Input type="date" value={formData.fraDate || ''} onChange={(e) => onUpdate('fraDate', e.target.value)} className={inputCn} /></Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="FRA Author"><Input value={formData.fraAuthor || ''} onChange={(e) => onUpdate('fraAuthor', e.target.value)} className={inputCn} /></Field>
          <Field label="FRA Company"><Input value={formData.fraCompany || ''} onChange={(e) => onUpdate('fraCompany', e.target.value)} className={inputCn} /></Field>
        </div>
      </Section>

      {/* Installer Details */}
      <Section title="Installer Details" accentColor="from-elec-yellow/40 to-amber-400/20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Name"><Input value={formData.installerName || ''} onChange={(e) => onUpdate('installerName', e.target.value)} className={inputCn} /></Field>
          <Field label="Company"><Input value={formData.installerCompany || ''} onChange={(e) => onUpdate('installerCompany', e.target.value)} className={inputCn} /></Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Phone"><Input type="tel" value={formData.installerPhone || ''} onChange={(e) => onUpdate('installerPhone', e.target.value)} className={inputCn} /></Field>
          <Field label="Email"><Input type="email" value={formData.installerEmail || ''} onChange={(e) => onUpdate('installerEmail', e.target.value)} className={inputCn} /></Field>
        </div>
        <Field label="Company Address"><Input value={formData.installerCompanyAddress || ''} onChange={(e) => onUpdate('installerCompanyAddress', e.target.value)} className={inputCn} /></Field>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Field label="Scheme"><Input value={formData.registrationScheme || ''} onChange={(e) => onUpdate('registrationScheme', e.target.value)} className={inputCn} placeholder="BAFE, FIA, NSI..." /></Field>
          <Field label="Reg. No."><Input value={formData.registrationNumber || ''} onChange={(e) => onUpdate('registrationNumber', e.target.value)} className={inputCn} /></Field>
          <Field label="Competency"><Input value={formData.competencyScheme || ''} onChange={(e) => onUpdate('competencyScheme', e.target.value)} className={inputCn} placeholder="e.g. ECS, FIA" /></Field>
        </div>
      </Section>

      {/* Design Certificate Reference */}
      <Section title="Design Certificate Reference" accentColor="from-purple-500/40 to-indigo-400/20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="G1 Design Cert Reference"><Input value={formData.designCertReference || ''} onChange={(e) => onUpdate('designCertReference', e.target.value)} className={inputCn} placeholder="Ref number of G1 cert" /></Field>
          <Field label="G1 Design Cert Date"><Input type="date" value={formData.designCertDate || ''} onChange={(e) => onUpdate('designCertDate', e.target.value)} className={inputCn} /></Field>
        </div>
        <Field label="Designer Name / Company"><Input value={formData.designerName || ''} onChange={(e) => onUpdate('designerName', e.target.value)} className={inputCn} placeholder="If different from installer" /></Field>
      </Section>
    </div>
  );
}
