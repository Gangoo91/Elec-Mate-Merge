/**
 * Fire Alarm G3 Commissioning — Tab 1: Project & System Reference
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
  { value: 'Office', label: 'Office' }, { value: 'Retail', label: 'Retail' },
  { value: 'Warehouse', label: 'Warehouse' }, { value: 'Factory', label: 'Factory / Industrial' },
  { value: 'School', label: 'School / Education' }, { value: 'Hospital', label: 'Hospital / Healthcare' },
  { value: 'Care Home', label: 'Care Home / Residential' }, { value: 'Hotel', label: 'Hotel / B&B' },
  { value: 'HMO', label: 'HMO' }, { value: 'Data Centre', label: 'Data Centre' },
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

export default function FAG3ProjectReference({ formData, onUpdate }: Props) {
  useEffect(() => {
    if (formData.commissionerName) return;
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return;
      const { data: cpData } = await supabase.rpc('get_my_company_profile');
      const cp = Array.isArray(cpData) ? cpData[0] : cpData;
      if (cp) {
        onUpdate('commissionerName', cp.inspector_name || cp.company_name || '');
        onUpdate('commissionerCompany', cp.company_name || '');
      }
    });
  }, []);

  return (
    <div className="space-y-5">
      <div className="border-b border-red-500/20 pb-3">
        <p className="text-sm font-bold text-red-400">FIRE ALARM COMMISSIONING CERTIFICATE (G3)</p>
        <p className="text-xs text-white mt-1">BS 5839-1:2025 — Fire detection and fire alarm systems for buildings</p>
      </div>

      <Section title="Certificate Reference" accentColor="from-white/20 to-white/5">
        <Field label="Certificate Number"><Input value={formData.certificateNumber || ''} onChange={(e) => onUpdate('certificateNumber', e.target.value)} className={inputCn} /></Field>
        <Field label="Commissioning Date"><Input type="date" value={formData.commissioningDate || ''} onChange={(e) => onUpdate('commissioningDate', e.target.value)} className={inputCn} /></Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="G2 Installation Cert Ref"><Input value={formData.installationCertRef || ''} onChange={(e) => onUpdate('installationCertRef', e.target.value)} className={inputCn} placeholder="Reference of G2 cert" /></Field>
          <Field label="G1 Design Cert Ref"><Input value={formData.designCertReference || ''} onChange={(e) => onUpdate('designCertReference', e.target.value)} className={inputCn} placeholder="Reference of G1 cert" /></Field>
        </div>
      </Section>

      <Section title="Client Details" accentColor="from-blue-500/40 to-cyan-400/20">
        <CertificateClientSection formData={formData} onUpdate={onUpdate} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Client Name" required><Input value={formData.clientName || ''} onChange={(e) => onUpdate('clientName', e.target.value)} className={inputCn} /></Field>
          <Field label="Phone"><Input type="tel" value={formData.clientTelephone || ''} onChange={(e) => onUpdate('clientTelephone', e.target.value)} className={inputCn} /></Field>
        </div>
        <Field label="Client Address"><Input value={formData.clientAddress || ''} onChange={(e) => onUpdate('clientAddress', e.target.value)} className={inputCn} /></Field>
      </Section>

      <Section title="Premises" accentColor="from-red-500/40 to-orange-400/20">
        <Field label="Premises Name"><Input value={formData.premisesName || ''} onChange={(e) => onUpdate('premisesName', e.target.value)} className={inputCn} /></Field>
        <Field label="Premises Address" required><Input value={formData.premisesAddress || ''} onChange={(e) => onUpdate('premisesAddress', e.target.value)} className={inputCn} /></Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Premises Type"><ComboboxCell value={formData.premisesType || ''} onChange={(v) => onUpdate('premisesType', v)} options={premisesTypeOptions} placeholder="Select..." className="h-12 text-base" /></Field>
          <Field label="Floors"><Input type="number" inputMode="numeric" value={formData.numberOfFloors || ''} onChange={(e) => onUpdate('numberOfFloors', e.target.value)} className={inputCn} /></Field>
        </div>
      </Section>

      <Section title="System Reference" accentColor="from-amber-500/40 to-yellow-400/20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="System Category"><Input value={formData.systemCategory || ''} onChange={(e) => onUpdate('systemCategory', e.target.value)} className={inputCn} placeholder="e.g. L2" /></Field>
          <Field label="Panel Make / Model"><Input value={`${formData.systemMake || ''} ${formData.systemModel || ''}`.trim()} onChange={(e) => onUpdate('systemMake', e.target.value)} className={inputCn} /></Field>
        </div>
        <Field label="Panel Location"><Input value={formData.panelLocation || ''} onChange={(e) => onUpdate('panelLocation', e.target.value)} className={inputCn} /></Field>
      </Section>
    </div>
  );
}
