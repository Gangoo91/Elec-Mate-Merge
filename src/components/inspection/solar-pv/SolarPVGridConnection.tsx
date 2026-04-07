/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Solar PV Grid Connection Tab — Best-in-Class Mobile
 * DNO, G98/G99, MPAN, metering, export limiting
 */

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { AlertTriangle, CheckCircle, Loader2, FileText, Link2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { SolarPVFormData, UK_DNOS, SUPPLY_FUSE_RATINGS } from '@/types/solar-pv';
import { useSolarPVSmartForm } from '@/hooks/inspection/useSolarPVSmartForm';
import ComboboxCell from '@/components/table-cells/ComboboxCell';
import { Section, Field, inputCn, inputSmCn, textareaCn, CheckboxCard } from './SolarPVSection';

interface Props {
  formData: SolarPVFormData;
  onUpdate: (field: string, value: unknown) => void;
}

const meterTypeOptions = [
  { value: 'smart', label: 'Smart Meter (SMETS2)' },
  { value: 'export', label: 'Dedicated Export Meter' },
  { value: 'generation', label: 'Generation Meter' },
  { value: 'none', label: 'No Additional Meter' },
];

const approvalStatusOptions = [
  { value: 'not-required', label: 'Not Required (G98)' },
  { value: 'pending', label: 'Pending Approval' },
  { value: 'approved', label: 'Approved' },
  { value: 'conditional', label: 'Conditional Approval' },
  { value: 'rejected', label: 'Rejected' },
];

const SolarPVGridConnection: React.FC<Props> = ({ formData, onUpdate }) => {
  const smartForm = useSolarPVSmartForm(formData, onUpdate);

  const updateGridConnection = (field: string, value: unknown) => {
    onUpdate('gridConnection', { ...formData.gridConnection, [field]: value });
  };

  const updateMetering = (field: string, value: unknown) => {
    onUpdate('metering', { ...formData.metering, [field]: value });
  };

  const suggestedApplication = formData.totalCapacity
    ? smartForm.suggestG98OrG99(formData.totalCapacity, formData.gridConnection?.supplyPhases || 'single')
    : null;

  const mpanValidation = formData.gridConnection?.mpan
    ? smartForm.validateMPAN(formData.gridConnection.mpan)
    : null;

  const dnoRegions = formData.gridConnection?.dnoName
    ? UK_DNOS.find((d) => d.name === formData.gridConnection.dnoName)?.regions || []
    : [];

  // Auto-set supply phases from inverter selection
  useEffect(() => {
    const hasThreePhaseInverter = formData.inverters?.some((inv: any) => inv.phases === 'three');
    if (hasThreePhaseInverter && formData.gridConnection?.supplyPhases !== 'three') {
      updateGridConnection('supplyPhases', 'three');
      updateGridConnection('supplyVoltage', 400);
    }
  }, [formData.inverters]);

  return (
    <div className="space-y-6">
      {/* DNO & Supply */}
      <Section title="DNO & Supply Details" accentColor="from-blue-500/40 to-cyan-400/20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <Field label="Distribution Network Operator (DNO) *">
            <ComboboxCell
              value={formData.gridConnection?.dnoName || ''}
              onChange={(v) => {
                const dno = UK_DNOS.find((d) => d.name === v);
                updateGridConnection('dnoName', v);
                if (dno) updateGridConnection('dnoRegion', dno.regions[0]);
              }}
              options={UK_DNOS.map((d) => ({ value: d.name, label: d.name }))}
              placeholder="Select DNO..."
              className="h-12 text-base"
              allowCustom
            />
          </Field>

          <Field label="DNO Region">
            <ComboboxCell
              value={formData.gridConnection?.dnoRegion || ''}
              onChange={(v) => updateGridConnection('dnoRegion', v)}
              options={dnoRegions.map((r) => ({ value: r, label: r }))}
              placeholder="Select region..."
              className="h-12 text-base"
              allowCustom
            />
          </Field>
        </div>

        {/* MPAN */}
        <Field label="MPAN (Meter Point Admin Number) *">
          <Input
            value={formData.gridConnection?.mpan || ''}
            onChange={(e) => updateGridConnection('mpan', e.target.value.replace(/[^0-9\s-]/g, ''))}
            placeholder="e.g., 00 000 000 00 000"
            className={cn(inputCn, 'font-mono')}
          />
          {mpanValidation && !mpanValidation.valid && (
            <div className="flex items-center gap-1.5 mt-1">
              <AlertTriangle className="h-3.5 w-3.5 text-orange-400" />
              <p className="text-xs text-orange-400">{mpanValidation.error}</p>
            </div>
          )}
          <p className="text-[10px] text-white/40 mt-1">Found on the electricity bill. 13 or 21 digits.</p>
        </Field>

        {/* Supply details */}
        <div className="grid grid-cols-2 gap-2.5">
          <Field label="Supply Phases">
            <div className="flex gap-1.5">
              {(['single', 'three'] as const).map((phase) => (
                <button
                  key={phase}
                  type="button"
                  onClick={() => {
                    updateGridConnection('supplyPhases', phase);
                    updateGridConnection('supplyVoltage', phase === 'single' ? 230 : 400);
                  }}
                  className={cn(
                    'flex-1 h-12 rounded-xl border text-sm font-semibold touch-manipulation active:scale-[0.98] transition-all',
                    formData.gridConnection?.supplyPhases === phase
                      ? 'bg-blue-500 border-blue-500 text-white'
                      : 'bg-white/[0.03] border-white/[0.1] text-white/50'
                  )}
                >
                  {phase === 'single' ? '1Φ 230V' : '3Φ 400V'}
                </button>
              ))}
            </div>
          </Field>

          <Field label="Max Supply Fuse (A)">
            <ComboboxCell
              value={formData.gridConnection?.maxSupplyFuse?.toString() || '100'}
              onChange={(v) => updateGridConnection('maxSupplyFuse', parseInt(v))}
              options={SUPPLY_FUSE_RATINGS.map((f) => ({ value: f.value.toString(), label: f.label }))}
              placeholder="Fuse..."
              className="h-12 text-base"
              allowCustom={true}
            />
          </Field>
        </div>

        <Field label="Cut-out / Meter Location">
          <Input
            value={formData.gridConnection?.cutOutLocation || ''}
            onChange={(e) => updateGridConnection('cutOutLocation', e.target.value)}
            placeholder="e.g., Under stairs cupboard"
            className={inputCn}
          />
        </Field>
      </Section>

      {/* DNO Notification (G98/G99) */}
      <Section title="DNO Notification (G98/G99)" accentColor="from-amber-500/40 to-yellow-400/20">
        {/* G98/G99 toggle buttons */}
        <Field label="Application Type *">
          <div className="flex gap-1.5">
            {[
              { val: 'G98', label: 'G98', sub: '≤16A per phase', desc: 'Notification only' },
              { val: 'G99', label: 'G99', sub: '>16A per phase', desc: 'Application required' },
            ].map((opt) => (
              <button
                key={opt.val}
                type="button"
                onClick={() => updateGridConnection('applicationType', opt.val)}
                className={cn(
                  'flex-1 py-3 rounded-xl border flex flex-col items-center justify-center touch-manipulation active:scale-[0.98] transition-all',
                  formData.gridConnection?.applicationType === opt.val
                    ? 'bg-amber-500/15 border-amber-500/30'
                    : 'bg-white/[0.03] border-white/[0.06]'
                )}
              >
                <span className={cn(
                  'text-base font-bold',
                  formData.gridConnection?.applicationType === opt.val ? 'text-amber-400' : 'text-white/50'
                )}>
                  {opt.label}
                </span>
                <span className="text-[10px] text-white/40">{opt.sub}</span>
                <span className="text-[9px] text-white/30 mt-0.5">{opt.desc}</span>
              </button>
            ))}
          </div>
        </Field>

        {suggestedApplication && formData.totalCapacity > 0 && (
          <div className={cn(
            'p-2.5 rounded-xl flex items-center gap-2',
            suggestedApplication === 'G98' ? 'bg-green-500/10 border border-green-500/20' : 'bg-orange-500/10 border border-orange-500/20'
          )}>
            <CheckCircle className={cn('h-3.5 w-3.5 flex-shrink-0', suggestedApplication === 'G98' ? 'text-green-400' : 'text-orange-400')} />
            <span className={cn('text-xs', suggestedApplication === 'G98' ? 'text-green-300' : 'text-orange-300')}>
              {formData.totalCapacity.toFixed(1)}kWp → <strong>{suggestedApplication}</strong> recommended
            </span>
          </div>
        )}

        {/* Create or Link G98/G99 Certificate */}
        {formData.gridConnection?.applicationType && (
          <G98G99CertActions
            applicationType={formData.gridConnection.applicationType}
            formData={formData}
            onReferenceLinked={(ref) => updateGridConnection('applicationReference', ref)}
          />
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Application Reference">
            <Input
              value={formData.gridConnection?.applicationReference || ''}
              onChange={(e) => updateGridConnection('applicationReference', e.target.value)}
              placeholder="DNO reference number"
              className={inputCn}
            />
          </Field>
          <Field label="Application Date">
            <Input
              type="date"
              value={formData.gridConnection?.applicationDate || ''}
              onChange={(e) => updateGridConnection('applicationDate', e.target.value)}
              className={inputCn}
            />
          </Field>
        </div>

        <Field label="Approval Status">
          <ComboboxCell
            value={formData.gridConnection?.approvalStatus || ''}
            onChange={(v) => updateGridConnection('approvalStatus', v)}
            options={approvalStatusOptions}
            placeholder="Select status..."
            className="h-12 text-base"
            allowCustom
          />
        </Field>

        {formData.gridConnection?.approvalStatus === 'approved' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Approval Date">
              <Input
                type="date"
                value={formData.gridConnection?.approvalDate || ''}
                onChange={(e) => updateGridConnection('approvalDate', e.target.value)}
                className={inputCn}
              />
            </Field>
            <Field label="Approval Reference">
              <Input
                value={formData.gridConnection?.approvalReference || ''}
                onChange={(e) => updateGridConnection('approvalReference', e.target.value)}
                placeholder="DNO approval reference"
                className={inputCn}
              />
            </Field>
          </div>
        )}
      </Section>

      {/* Export Limiting */}
      <Section title="Export Limiting" accentColor="from-orange-500/40 to-red-400/20">
        <CheckboxCard
          label="Export Limiting Required / Applied"
          description="System export is limited to a specified value"
          checked={!!formData.gridConnection?.exportLimited}
          onChange={(v) => updateGridConnection('exportLimited', v)}
          accentColor="amber"
        />

        {formData.gridConnection?.exportLimited && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Export Limit (kW)">
              <Input
                type="number"
                inputMode="decimal"
                step="0.1"
                value={formData.gridConnection?.exportLimitKw || ''}
                onChange={(e) => updateGridConnection('exportLimitKw', e.target.value === '' ? '' : parseFloat(e.target.value) || 0)}
                placeholder="e.g., 3.68"
                className={inputCn}
              />
            </Field>
            <Field label="Limiting Method">
              <Input
                value={formData.gridConnection?.exportLimitingMethod || ''}
                onChange={(e) => updateGridConnection('exportLimitingMethod', e.target.value)}
                placeholder="e.g., Inverter setting"
                className={inputCn}
              />
            </Field>
          </div>
        )}
      </Section>

      {/* Metering */}
      <Section title="Metering" accentColor="from-green-500/40 to-emerald-400/20">
        <Field label="Meter Type">
          <ComboboxCell
            value={formData.metering?.meterType || 'smart'}
            onChange={(v) => updateMetering('meterType', v)}
            options={meterTypeOptions}
            placeholder="Select meter type..."
            className="h-12 text-base"
            allowCustom
          />
        </Field>
        <div className="grid grid-cols-2 gap-2">
          <Field label="Meter Make">
            <Input
              value={formData.metering?.meterMake || ''}
              onChange={(e) => updateMetering('meterMake', e.target.value)}
              placeholder="e.g., Emlite"
              className={inputSmCn}
            />
          </Field>
          <Field label="Meter Model">
            <Input
              value={formData.metering?.meterModel || ''}
              onChange={(e) => updateMetering('meterModel', e.target.value)}
              placeholder="e.g., EMP1"
              className={inputSmCn}
            />
          </Field>
        </div>
        <Field label="Meter Serial Number">
          <Input
            value={formData.metering?.meterSerial || ''}
            onChange={(e) => updateMetering('meterSerial', e.target.value)}
            placeholder="If applicable"
            className={inputCn}
          />
        </Field>

        <CheckboxCard
          label="Smart Export Guarantee (SEG) Registered"
          description="Customer receives payment for exported electricity"
          checked={!!formData.metering?.segRegistered}
          onChange={(v) => updateMetering('segRegistered', v)}
          accentColor="green"
        />

        {formData.metering?.segRegistered && (
          <Field label="SEG Supplier">
            <Input
              value={formData.metering?.segSupplier || ''}
              onChange={(e) => updateMetering('segSupplier', e.target.value)}
              placeholder="e.g., Octopus Energy, EDF"
              className={inputCn}
            />
          </Field>
        )}

        <Field label="Metering Notes">
          <Textarea
            value={formData.metering?.notes || ''}
            onChange={(e) => updateMetering('notes', e.target.value)}
            placeholder="Any additional metering details..."
            className={textareaCn}
          />
        </Field>
      </Section>
    </div>
  );
};

// ============================================================================
// G98/G99 Certificate Actions — Create in background or link existing
// ============================================================================

function G98G99CertActions({
  applicationType,
  formData,
  onReferenceLinked,
}: {
  applicationType: string;
  formData: SolarPVFormData;
  onReferenceLinked: (ref: string) => void;
}) {
  const [isCreating, setIsCreating] = useState(false);
  const [createdRef, setCreatedRef] = useState<string | null>(null);
  const [isLinking, setIsLinking] = useState(false);
  const [existingCerts, setExistingCerts] = useState<any[]>([]);

  const certType = applicationType === 'G99' ? 'g99-commissioning' : 'g98-commissioning';
  const certLabel = applicationType === 'G99' ? 'G99' : 'G98';

  // Load existing G98/G99 certs for linking
  const loadExistingCerts = async () => {
    setIsLinking(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase
        .from('reports')
        .select('report_id, data, created_at')
        .eq('user_id', user.id)
        .eq('report_type', certType)
        .order('created_at', { ascending: false })
        .limit(10);
      setExistingCerts(data || []);
    } catch {
      toast.error('Failed to load certificates');
    }
  };

  // Create G98/G99 cert in background with pre-filled data from Solar PV
  const createInBackground = async () => {
    setIsCreating(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const refNumber = `${certLabel}-${Date.now().toString(36).toUpperCase()}`;
      const inverter = formData.inverters?.[0];

      // Map Solar PV data → G98/G99 fields
      const certData: Record<string, any> = {
        referenceNumber: refNumber,
        commissioningDate: formData.commissioningDate || new Date().toISOString().split('T')[0],
        notificationDate: new Date().toISOString().split('T')[0],
        dnoName: formData.gridConnection?.dnoName || '',
        installerName: formData.installerDeclaration?.installerName || '',
        installerCompany: formData.installerDeclaration?.installerCompany || '',
        installerPhone: formData.installerDeclaration?.installerPhone || '',
        installerEmail: formData.installerDeclaration?.installerEmail || '',
        mcsNumber: formData.mcsDetails?.installerNumber || formData.installerDeclaration?.installerMcsNumber || '',
        installationAddress: formData.installationSameAsClient
          ? formData.clientAddress || ''
          : formData.installationAddress || '',
        mpan: formData.gridConnection?.mpan || '',
        supplyType: formData.gridConnection?.supplyPhases === 'three' ? 'three-phase' : 'single-phase',
        earthingArrangement: formData.testResults?.acTests?.earthingArrangement || '',
        equipmentType: 'Solar PV',
        equipmentManufacturer: inverter?.make || '',
        equipmentModel: inverter?.model || '',
        equipmentSerial: inverter?.serialNumber || '',
        ratedOutput: formData.totalCapacity ? `${formData.totalCapacity.toFixed(2)} kWp` : '',
        numberOfPhases: formData.gridConnection?.supplyPhases === 'three' ? '3' : '1',
        inverterManufacturer: inverter?.make || '',
        inverterModel: inverter?.model || '',
        exportCapable: true,
        exportLimited: !!formData.gridConnection?.exportLimited,
        exportLimit: formData.gridConnection?.exportLimitKw?.toString() || '',
        segSupplier: formData.metering?.segSupplier || '',
        notes: `Auto-created from Solar PV certificate. System: ${formData.totalCapacity?.toFixed(1) || '?'}kWp.`,
      };

      const reportId = crypto.randomUUID();
      const { error } = await supabase.from('reports').insert({
        report_id: reportId,
        user_id: user.id,
        report_type: certType,
        certificate_number: refNumber,
        data: certData,
        status: 'draft',
      });

      if (error) throw error;

      setCreatedRef(refNumber);
      onReferenceLinked(refNumber);
      toast.success(`${certLabel} certificate created and saved`, {
        description: 'Available in your saved certificates',
      });
    } catch (err: any) {
      toast.error(`Failed to create ${certLabel} certificate`);
      console.error(err);
    } finally {
      setIsCreating(false);
    }
  };

  // Reset when application type changes
  React.useEffect(() => {
    setCreatedRef(null);
    setIsLinking(false);
    setExistingCerts([]);
  }, [applicationType]);

  if (createdRef) {
    return (
      <div className="space-y-2">
        <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center gap-3">
          <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-green-400">{certLabel} Certificate Created</p>
            <p className="text-xs text-white/50 truncate">Ref: {createdRef} — saved to your certificates</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => { setCreatedRef(null); onReferenceLinked(''); }}
            className="flex-1 h-10 rounded-xl border border-white/[0.06] bg-white/[0.03] text-xs text-white/50 touch-manipulation active:scale-[0.98]"
          >
            Undo — Link Different Cert Instead
          </button>
        </div>
      </div>
    );
  }

  if (isLinking) {
    return (
      <div className="space-y-2">
        <p className="text-[10px] text-white/40 uppercase tracking-wider">Select existing {certLabel} certificate</p>
        {existingCerts.length === 0 ? (
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center">
            <p className="text-sm text-white/50">No {certLabel} certificates found</p>
            <p className="text-xs text-white/30 mt-1">Create one using the button below</p>
          </div>
        ) : (
          existingCerts.map((cert: any) => (
            <button
              key={cert.report_id}
              type="button"
              onClick={() => {
                const ref = cert.data?.referenceNumber || cert.report_id.slice(0, 8);
                onReferenceLinked(ref);
                setIsLinking(false);
                toast.success(`Linked to ${certLabel}: ${ref}`);
              }}
              className="w-full text-left p-3 rounded-xl border border-white/[0.06] bg-white/[0.02] flex items-center gap-3 touch-manipulation active:scale-[0.98]"
            >
              <Link2 className="h-4 w-4 text-amber-400 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{cert.data?.referenceNumber || 'No reference'}</p>
                <p className="text-xs text-white/40">{cert.data?.installationAddress || 'No address'} • {new Date(cert.created_at).toLocaleDateString('en-GB')}</p>
              </div>
            </button>
          ))
        )}
        <button
          type="button"
          onClick={() => setIsLinking(false)}
          className="w-full text-center text-xs text-white/40 py-2 touch-manipulation"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={createInBackground}
        disabled={isCreating}
        className="flex-1 h-12 rounded-xl border border-amber-500/20 bg-amber-500/10 flex items-center justify-center gap-2 text-sm font-medium text-amber-400 touch-manipulation active:scale-[0.98] disabled:opacity-50"
      >
        {isCreating ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <FileText className="h-4 w-4" />
        )}
        Create {certLabel} Cert
      </button>
      <button
        type="button"
        onClick={loadExistingCerts}
        disabled={isLinking}
        className="flex-1 h-12 rounded-xl border border-white/[0.06] bg-white/[0.03] flex items-center justify-center gap-2 text-sm font-medium text-white touch-manipulation active:scale-[0.98]"
      >
        <Link2 className="h-4 w-4" />
        Link Existing
      </button>
    </div>
  );
}

export default SolarPVGridConnection;
