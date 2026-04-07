/**
 * Fire Alarm G1 Design — Tab 1: Client & Premises
 * Client details, premises, FRA reference (mandatory for design justification)
 */

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useEffect } from 'react';
import ComboboxCell from '@/components/table-cells/ComboboxCell';
import CertificateClientSection from '@/components/inspection/shared/CertificateClientSection';

const inputCn = 'h-12 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500 [color-scheme:dark]';
const textareaCn = 'touch-manipulation text-base min-h-[80px] bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500';

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

export default function FAG1ClientPremises({ formData, onUpdate }: Props) {
  // Auto-load designer details from company profile
  useEffect(() => {
    if (formData.designerName) return;
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return;
      const { data: cpData } = await supabase.rpc('get_my_company_profile');
      const cp = Array.isArray(cpData) ? cpData[0] : cpData;
      if (cp) {
        onUpdate('designerName', cp.inspector_name || cp.company_name || '');
        onUpdate('designerCompany', cp.company_name || '');
      }
    });
  }, []);

  return (
    <div className="space-y-5">
      {/* Header Banner */}
      <div className="border-b border-red-500/20 pb-3">
        <p className="text-sm font-bold text-red-400">FIRE ALARM DESIGN CERTIFICATE (G1)</p>
        <p className="text-xs text-white mt-1">BS 5839-1:2025 — Fire detection and fire alarm systems for buildings</p>
      </div>

      {/* Certificate Reference */}
      <Section title="Certificate Reference" accentColor="from-white/20 to-white/5">
        <Field label="Certificate Number"><Input value={formData.certificateNumber || ''} onChange={(e) => onUpdate('certificateNumber', e.target.value)} className={inputCn} /></Field>
        <Field label="Design Date"><Input type="date" value={formData.designDate || ''} onChange={(e) => onUpdate('designDate', e.target.value)} className={inputCn} /></Field>
        {/* New vs Modification */}
        <Field label="System Type">
          <div className="flex gap-2">
            {[
              { value: 'new', label: 'New System' },
              { value: 'modification', label: 'Modification to Existing' },
            ].map(({ value, label }) => (
              <button key={value} type="button" onClick={() => onUpdate('systemScope', value)}
                className={cn('flex-1 p-3 rounded-xl border text-sm font-medium touch-manipulation active:scale-[0.98] transition-all',
                  formData.systemScope === value ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-white/[0.03] border-white/[0.06] text-white')}>
                {label}
              </button>
            ))}
          </div>
        </Field>
        {formData.systemScope === 'modification' && (
          <Field label="Original Certificate Reference"><Input value={formData.originalCertRef || ''} onChange={(e) => onUpdate('originalCertRef', e.target.value)} className={inputCn} placeholder="Reference of existing system cert" /></Field>
        )}
        <Field label="System Extent"><Textarea value={formData.systemExtent || ''} onChange={(e) => onUpdate('systemExtent', e.target.value)} className={textareaCn} placeholder="Describe the areas and floors covered by this system design..." /></Field>
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
        <Field label="Premises Address" required><Input value={formData.premisesAddress || ''} onChange={(e) => onUpdate('premisesAddress', e.target.value)} className={inputCn} /></Field>
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
          <Field label="Floor Area (m2)"><Input value={formData.floorArea || ''} onChange={(e) => onUpdate('floorArea', e.target.value)} inputMode="decimal" className={inputCn} placeholder="e.g. 500" /></Field>
        </div>
      </Section>

      {/* Building Construction (unique to G1) */}
      <Section title="Building Construction" accentColor="from-red-500/40 to-rose-400/20">
        <Field label="Ceiling Type and Height">
          <ComboboxCell value={formData.ceilingType || ''} onChange={(v) => onUpdate('ceilingType', v)} options={[
            { value: 'Flat plasterboard 2.4m', label: 'Flat plasterboard 2.4m' },
            { value: 'Flat plasterboard 2.7m', label: 'Flat plasterboard 2.7m' },
            { value: 'Flat plasterboard 3.0m', label: 'Flat plasterboard 3.0m' },
            { value: 'Suspended tiles 2.7m', label: 'Suspended tiles 2.7m' },
            { value: 'Suspended tiles 3.0m', label: 'Suspended tiles 3.0m' },
            { value: 'Exposed soffit 3.5m', label: 'Exposed soffit 3.5m' },
            { value: 'Exposed soffit 4.0m+', label: 'Exposed soffit 4.0m+' },
            { value: 'Vaulted/pitched', label: 'Vaulted / pitched' },
          ]} placeholder="Select or type..." className="h-12 text-base" />
        </Field>
        <Field label="Beam / Joist Spacing">
          <ComboboxCell value={formData.beamSpacing || ''} onChange={(v) => onUpdate('beamSpacing', v)} options={[
            { value: 'No beams', label: 'No beams' },
            { value: '600mm centres', label: '600mm centres' },
            { value: '1200mm centres', label: '1200mm centres' },
            { value: 'Closely spaced (<1m)', label: 'Closely spaced (<1m)' },
            { value: 'Widely spaced (>1m)', label: 'Widely spaced (>1m)' },
          ]} placeholder="Select or type..." className="h-12 text-base" />
        </Field>
        <Field label="Ventilation and Airflow"><Input value={formData.ventilationNotes || ''} onChange={(e) => onUpdate('ventilationNotes', e.target.value)} className={inputCn} placeholder="e.g. Mechanical extract in kitchen" /></Field>
        <Field label="Construction Notes"><Textarea value={formData.buildingConstructionNotes || ''} onChange={(e) => onUpdate('buildingConstructionNotes', e.target.value)} className={textareaCn} placeholder="Any building features that affect detector performance or placement..." /></Field>
      </Section>

      {/* Fire Risk Assessment (mandatory for G1) */}
      <Section title="Fire Risk Assessment" accentColor="from-amber-500/40 to-yellow-400/20">
        <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-3 mb-3">
          <p className="text-xs text-white leading-relaxed">The system design must be based on the building's fire risk assessment. Provide the FRA reference below.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="FRA Reference" required><Input value={formData.fraReference || ''} onChange={(e) => onUpdate('fraReference', e.target.value)} className={inputCn} placeholder="e.g. FRA-2026-001" /></Field>
          <Field label="FRA Date"><Input type="date" value={formData.fraDate || ''} onChange={(e) => onUpdate('fraDate', e.target.value)} className={inputCn} /></Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="FRA Author"><Input value={formData.fraAuthor || ''} onChange={(e) => onUpdate('fraAuthor', e.target.value)} className={inputCn} /></Field>
          <Field label="FRA Company"><Input value={formData.fraCompany || ''} onChange={(e) => onUpdate('fraCompany', e.target.value)} className={inputCn} /></Field>
        </div>
      </Section>
    </div>
  );
}
