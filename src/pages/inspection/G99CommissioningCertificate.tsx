/**
 * G99CommissioningCertificate.tsx
 * EREC G99 Issue 5 — Generators >16A per phase
 * Two-stage: Stage 1 (Application) + Stage 2 (Commissioning) + Sign-off
 */

import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Loader2, Save } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { SmartTabs, SmartTab } from '@/components/ui/smart-tabs';
import SignatureInput from '@/components/signature/SignatureInput';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { reportCloud } from '@/utils/reportCloud';
import { useReportSync } from '@/hooks/useReportSync';
import { SyncStatusBadge } from '@/components/inspection/SyncStatusBadge';
import { draftStorage } from '@/utils/draftStorage';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { getDefaultG99FormData, UK_DNOS, G99FormData } from '@/types/g99-commissioning';
import { useG99CommissioningTabs, G99TabValue } from '@/hooks/useG99CommissioningTabs';

const inputCn = 'h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] text-white [color-scheme:dark]';
const textareaCn = 'touch-manipulation text-base min-h-[80px] bg-white/[0.06] border-white/[0.08] text-white';
const pickerTrigger = 'h-11 w-full touch-manipulation bg-white/[0.06] border-white/[0.08] text-white';

const DRAFT_KEY = 'elec-mate-draft-g99';

const SectionHeader = ({ title }: { title: string }) => (
  <div className="border-b border-white/[0.06] pb-1">
    <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
    <h2 className="text-xs font-medium text-white uppercase tracking-wider">{title}</h2>
  </div>
);

const Sub = ({ title }: { title: string }) => (
  <div className="flex items-center gap-2 pt-2">
    <p className="text-[10px] font-semibold text-white uppercase tracking-wider shrink-0">{title}</p>
    <div className="h-px flex-1 bg-white/[0.06]" />
  </div>
);

const Field = ({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
  <div><Label className="text-white text-xs mb-1.5 block">{label}{required && ' *'}</Label>{children}</div>
);

const Toggle = ({ label, value, onChange }: { label: string; value: boolean | undefined; onChange: (v: boolean) => void }) => (
  <div className="flex items-center justify-between">
    <Label className="text-white text-xs font-medium">{label}</Label>
    <div className="flex gap-1.5">
      {[true, false].map((v) => (
        <button key={String(v)} type="button" onClick={() => onChange(v)}
          className={cn('w-14 h-8 rounded-lg text-[11px] font-semibold touch-manipulation transition-all',
            value === v ? (v ? 'bg-green-500 text-white' : 'bg-white/20 text-white') : 'bg-white/[0.06] text-white border border-white/[0.08]')}>
          {v ? 'Yes' : 'No'}
        </button>
      ))}
    </div>
  </div>
);

export default function G99CommissioningCertificate() {
  const navigate = useNavigate();
  const { id: editId } = useParams<{ id: string }>();
  const isNew = editId === 'new' || !editId;
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(!isNew);
  const [savedReportId, setSavedReportId] = useState<string | null>(editId !== 'new' ? editId || null : null);
  const [showRecoveryDialog, setShowRecoveryDialog] = useState(false);
  const [recoveryDraft, setRecoveryDraft] = useState<{ data: any; lastModified: Date } | null>(null);

  const [data, setData] = useState<G99FormData>(getDefaultG99FormData());

  const {
    status: syncStatus, saveNow, syncNowImmediate,
    hasRecoverableDraft, recoverDraft, discardDraft,
  } = useReportSync({
    reportId: savedReportId,
    reportType: 'g99-commissioning' as any,
    formData: data,
    enabled: !isLoading,
    onReportCreated: (newId) => {
      setSavedReportId(newId);
      window.history.replaceState(null, '', `/electrician/inspection-testing/g99-commissioning/${newId}`);
    },
  });

  useEffect(() => {
    if (isNew || !editId) { setIsLoading(false); return; }
    const load = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) { setIsLoading(false); return; }
        const reportData = await reportCloud.getReportData(editId, user.id);
        if (reportData) { setData((prev) => ({ ...getDefaultG99FormData(), ...prev, ...(reportData as any) })); setSavedReportId(editId); }
      } catch (err) { console.error('Failed to load G99:', err); }
      finally { setIsLoading(false); }
    };
    load();
  }, [editId, isNew]);

  useEffect(() => {
    if (!isNew || !hasRecoverableDraft) return;
    const draft = draftStorage.loadDraft('g99-commissioning' as any, null);
    if (draft) { setRecoveryDraft(draft); setShowRecoveryDialog(true); }
  }, [isNew, hasRecoverableDraft]);

  useEffect(() => {
    if (data.installerName) return;
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return;
      const { data: cpData } = await supabase.rpc('get_my_company_profile');
      const cp = Array.isArray(cpData) ? cpData[0] : cpData;
      if (cp) setData((prev) => ({ ...prev, installerName: prev.installerName || cp.inspector_name || '', installerCompany: prev.installerCompany || cp.company_name || '', installerPhone: prev.installerPhone || cp.company_phone || '', installerEmail: prev.installerEmail || cp.company_email || '', registrationScheme: prev.registrationScheme || cp.registration_scheme || '', registrationNumber: prev.registrationNumber || cp.registration_number || '' }));
    });
  }, []);

  const update = useCallback((field: keyof G99FormData, value: any) => { setData((prev) => ({ ...prev, [field]: value })); }, []);

  const { currentTab, setCurrentTab, currentTabIndex, totalTabs, canNavigateNext, canNavigatePrevious, navigateNext, navigatePrevious, isCurrentTabComplete, getProgressPercentage } = useG99CommissioningTabs(data);

  const handleSaveDraft = async () => {
    setIsSaving(true);
    try { await saveNow(); toast.success('Draft saved'); }
    catch { toast.error('Failed to save'); }
    finally { setIsSaving(false); }
  };

  const handleGeneratePDF = async () => {
    if (!data.installationAddress) { toast.error('Installation address required'); return; }
    setIsSaving(true);
    try {
      await syncNowImmediate();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { toast.error('Please sign in'); setIsSaving(false); return; }

      let company: Record<string, any> = {};
      try { const { data: cpData } = await supabase.rpc('get_my_company_profile'); const cp = Array.isArray(cpData) ? cpData[0] : cpData; if (cp) company = cp; } catch {}

      const branding = {
        companyName: company.company_name || data.installerCompany,
        companyAddress: company.company_address || '',
        companyPhone: company.company_phone || data.installerPhone,
        companyEmail: company.company_email || data.installerEmail,
        companyLogo: company.company_logo || '',
      };

      const { formatG99Json } = await import('@/utils/g99JsonFormatter');
      const payload = formatG99Json(data, branding);

      const { data: pdfResult, error: pdfError } = await supabase.functions.invoke('generate-g99-commissioning-pdf', { body: { formData: payload } });
      if (pdfError) { toast.error('PDF generation failed'); }
      else if (pdfResult?.download_url) {
        let url = pdfResult.download_url;
        const reportId = savedReportId || data.referenceNumber;
        try { const { saveCertificatePdf } = await import('@/utils/certificate-pdf-storage'); const { permanentUrl, storagePath } = await saveCertificatePdf(pdfResult.download_url, user.id, reportId, data.referenceNumber); url = permanentUrl; await supabase.from('reports').update({ storage_path: storagePath, pdf_url: url, pdf_generated_at: new Date().toISOString(), status: 'completed' }).eq('report_id', reportId); } catch { await supabase.from('reports').update({ pdf_url: url, pdf_generated_at: new Date().toISOString(), status: 'completed' }).eq('report_id', reportId); }
        const { openOrDownloadPdf } = await import('@/utils/pdf-download');
        await openOrDownloadPdf(url, `G99-${data.referenceNumber}.pdf`);
        toast.success('G99 form generated');
      }
    } catch { toast.error('Failed to generate PDF'); } finally { setIsSaving(false); }
  };

  const progress = getProgressPercentage();

  // Tab content renderers
  const renderApplicationTab = () => (
    <div className="space-y-6">
      <SectionHeader title="DNO Application" />
      <div className="space-y-4">
        <Field label="DNO" required>
          <MobileSelectPicker value={data.dnoName} onValueChange={(v) => update('dnoName', v)} options={UK_DNOS.map((d) => ({ value: d, label: d }))} placeholder="Select DNO..." triggerClassName={pickerTrigger} />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Application Date"><Input type="date" value={data.applicationDate} onChange={(e) => update('applicationDate', e.target.value)} className={inputCn} /></Field>
          <Field label="Application Ref"><Input value={data.dnoApplicationRef} onChange={(e) => update('dnoApplicationRef', e.target.value)} className={inputCn} /></Field>
        </div>
        <Field label="Proposed Commissioning Date"><Input type="date" value={data.proposedCommissioningDate} onChange={(e) => update('proposedCommissioningDate', e.target.value)} className={inputCn} /></Field>
        <Field label="Connection Voltage">
          <MobileSelectPicker value={data.connectionVoltage} onValueChange={(v) => update('connectionVoltage', v)} options={[{ value: 'LV', label: 'LV' }, { value: 'HV', label: 'HV' }, { value: 'EHV', label: 'EHV' }]} placeholder="Select..." triggerClassName={pickerTrigger} />
        </Field>
        <div className="space-y-3">
          <Toggle label="Network study required" value={data.networkStudyRequired} onChange={(v) => update('networkStudyRequired', v)} />
          <Toggle label="Intertrip required" value={data.interTripRequired} onChange={(v) => update('interTripRequired', v)} />
          <Toggle label="DNO approval received" value={data.dnoApprovalReceived} onChange={(v) => update('dnoApprovalReceived', v)} />
        </div>
        {data.dnoApprovalReceived && (
          <div className="grid grid-cols-2 gap-3">
            <Field label="Approval Date"><Input type="date" value={data.dnoApprovalDate} onChange={(e) => update('dnoApprovalDate', e.target.value)} className={inputCn} /></Field>
            <Field label="Approval Ref"><Input value={data.dnoApprovalRef} onChange={(e) => update('dnoApprovalRef', e.target.value)} className={inputCn} /></Field>
          </div>
        )}
        {data.dnoApprovalReceived && <Field label="Special Conditions"><Textarea value={data.dnoSpecialConditions} onChange={(e) => update('dnoSpecialConditions', e.target.value)} className={textareaCn} placeholder="Any DNO-imposed conditions..." /></Field>}
      </div>

      <SectionHeader title="Installer Details" />
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Name"><Input value={data.installerName} onChange={(e) => update('installerName', e.target.value)} className={inputCn} /></Field>
          <Field label="Company"><Input value={data.installerCompany} onChange={(e) => update('installerCompany', e.target.value)} className={inputCn} /></Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Phone"><Input type="tel" value={data.installerPhone} onChange={(e) => update('installerPhone', e.target.value)} className={inputCn} /></Field>
          <Field label="Email"><Input type="email" value={data.installerEmail} onChange={(e) => update('installerEmail', e.target.value)} className={inputCn} /></Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Field label="MCS No." required><Input value={data.mcsNumber} onChange={(e) => update('mcsNumber', e.target.value)} className={inputCn} /></Field>
          <Field label="Scheme"><Input value={data.registrationScheme} onChange={(e) => update('registrationScheme', e.target.value)} className={inputCn} /></Field>
          <Field label="Reg. No."><Input value={data.registrationNumber} onChange={(e) => update('registrationNumber', e.target.value)} className={inputCn} /></Field>
        </div>
      </div>

      <SectionHeader title="Site Details" />
      <div className="space-y-4">
        <Field label="Installation Address" required><Input value={data.installationAddress} onChange={(e) => update('installationAddress', e.target.value)} className={inputCn} /></Field>
        <Field label="MPAN"><Input value={data.mpan} onChange={(e) => update('mpan', e.target.value)} className={inputCn} placeholder="21-digit" /></Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Supply Type">
            <MobileSelectPicker value={data.supplyType} onValueChange={(v) => update('supplyType', v)} options={[{ value: 'single-phase', label: 'Single-phase' }, { value: 'three-phase', label: 'Three-phase' }]} triggerClassName={pickerTrigger} />
          </Field>
          <Field label="Earthing">
            <MobileSelectPicker value={data.earthingArrangement} onValueChange={(v) => update('earthingArrangement', v)} options={[{ value: 'TN-S', label: 'TN-S' }, { value: 'TN-C-S', label: 'TN-C-S' }, { value: 'TT', label: 'TT' }]} placeholder="Select..." triggerClassName={pickerTrigger} />
          </Field>
        </div>
      </div>

      <SectionHeader title="Generating Equipment" />
      <div className="space-y-4">
        <Field label="Equipment Type">
          <MobileSelectPicker value={data.equipmentType} onValueChange={(v) => update('equipmentType', v)} options={[{ value: 'Solar PV', label: 'Solar PV' }, { value: 'Battery Storage', label: 'Battery Storage' }, { value: 'Combined PV+Battery', label: 'Combined PV + Battery' }, { value: 'Wind', label: 'Wind' }]} placeholder="Select..." triggerClassName={pickerTrigger} />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Manufacturer"><Input value={data.equipmentManufacturer} onChange={(e) => update('equipmentManufacturer', e.target.value)} className={inputCn} /></Field>
          <Field label="Model"><Input value={data.equipmentModel} onChange={(e) => update('equipmentModel', e.target.value)} className={inputCn} /></Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Field label="Serial Number"><Input value={data.equipmentSerial} onChange={(e) => update('equipmentSerial', e.target.value)} className={inputCn} /></Field>
          <Field label="Rated Output (kW)" required><Input type="number" step="0.01" value={data.ratedOutput} onChange={(e) => update('ratedOutput', e.target.value)} className={inputCn} placeholder=">3.68 / >11.04" /></Field>
          <Field label="Phases">
            <MobileSelectPicker value={data.numberOfPhases} onValueChange={(v) => update('numberOfPhases', v)} options={[{ value: '1', label: 'Single' }, { value: '3', label: 'Three' }]} triggerClassName={pickerTrigger} />
          </Field>
        </div>
        <Field label="Type Test Certificate Ref"><Input value={data.typeTestCertRef} onChange={(e) => update('typeTestCertRef', e.target.value)} className={inputCn} placeholder="Manufacturer's G99 type test cert" /></Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Inverter Manufacturer"><Input value={data.inverterManufacturer} onChange={(e) => update('inverterManufacturer', e.target.value)} className={inputCn} placeholder="If different" /></Field>
          <Field label="Inverter Model"><Input value={data.inverterModel} onChange={(e) => update('inverterModel', e.target.value)} className={inputCn} /></Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Proposed Export (kW)"><Input type="number" step="0.01" value={data.proposedExportCapacity} onChange={(e) => update('proposedExportCapacity', e.target.value)} className={inputCn} /></Field>
          <Field label="No. of Generating Units"><Input type="number" value={data.numberOfGeneratingUnits} onChange={(e) => update('numberOfGeneratingUnits', e.target.value)} className={inputCn} /></Field>
        </div>
        <Field label="Associated Cert Ref"><Input value={data.associatedCertRef} onChange={(e) => update('associatedCertRef', e.target.value)} className={inputCn} placeholder="Link to PV/BESS cert" /></Field>
      </div>

      <SectionHeader title="Export Details" />
      <div className="space-y-4">
        <div className="space-y-3">
          <Toggle label="Export capable" value={data.exportCapable} onChange={(v) => update('exportCapable', v)} />
          <Toggle label="Export limited by DNO" value={data.exportLimited} onChange={(v) => update('exportLimited', v)} />
          {data.exportLimited && <Field label="Export Limit (kW)"><Input type="number" step="0.01" value={data.exportLimit} onChange={(e) => update('exportLimit', e.target.value)} className={inputCn} /></Field>}
          <Toggle label="Export meter fitted" value={data.exportMeterFitted} onChange={(v) => update('exportMeterFitted', v)} />
          {data.exportMeterFitted && <Field label="Export Meter Serial"><Input value={data.exportMeterSerial} onChange={(e) => update('exportMeterSerial', e.target.value)} className={inputCn} /></Field>}
        </div>
        <Field label="SEG Supplier"><Input value={data.segSupplier} onChange={(e) => update('segSupplier', e.target.value)} className={inputCn} placeholder="e.g. Octopus, British Gas..." /></Field>
      </div>
    </div>
  );

  const renderCommissioningTab = () => (
    <div className="space-y-6">
      <SectionHeader title="Commissioning Details" />
      <div className="space-y-4">
        <Field label="Commissioning Date"><Input type="date" value={data.commissioningDate} onChange={(e) => update('commissioningDate', e.target.value)} className={inputCn} /></Field>
        <Field label="Settings Source">
          <MobileSelectPicker value={data.settingsSource} onValueChange={(v) => update('settingsSource', v)} options={[{ value: 'G99 default', label: 'G99 default settings' }, { value: 'DNO specified', label: 'DNO specified (non-standard)' }]} placeholder="Select..." triggerClassName={pickerTrigger} />
        </Field>
      </div>

      <SectionHeader title="Grid Protection Settings" />
      <div className="space-y-4">
        {data.settingsSource === 'DNO specified' && <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-3"><p className="text-xs text-white font-semibold">DNO-specified non-standard settings — enter values from DNO approval letter</p></div>}

        <Sub title="Over-voltage" />
        <div className="grid grid-cols-4 gap-2">
          <Field label="OV1 (V)"><Input value={data.ovStage1Voltage} onChange={(e) => update('ovStage1Voltage', e.target.value)} className={inputCn} /></Field>
          <Field label="OV1 Time"><Input value={data.ovStage1Time} onChange={(e) => update('ovStage1Time', e.target.value)} className={inputCn} /></Field>
          <Field label="OV2 (V)"><Input value={data.ovStage2Voltage} onChange={(e) => update('ovStage2Voltage', e.target.value)} className={inputCn} /></Field>
          <Field label="OV2 Time"><Input value={data.ovStage2Time} onChange={(e) => update('ovStage2Time', e.target.value)} className={inputCn} /></Field>
        </div>

        <Sub title="Under-voltage" />
        <div className="grid grid-cols-4 gap-2">
          <Field label="UV1 (V)"><Input value={data.uvStage1Voltage} onChange={(e) => update('uvStage1Voltage', e.target.value)} className={inputCn} /></Field>
          <Field label="UV1 Time"><Input value={data.uvStage1Time} onChange={(e) => update('uvStage1Time', e.target.value)} className={inputCn} /></Field>
          <Field label="UV2 (V)"><Input value={data.uvStage2Voltage} onChange={(e) => update('uvStage2Voltage', e.target.value)} className={inputCn} /></Field>
          <Field label="UV2 Time"><Input value={data.uvStage2Time} onChange={(e) => update('uvStage2Time', e.target.value)} className={inputCn} /></Field>
        </div>

        <Sub title="Over-frequency" />
        <div className="grid grid-cols-4 gap-2">
          <Field label="OF1 (Hz)"><Input value={data.ofStage1Freq} onChange={(e) => update('ofStage1Freq', e.target.value)} className={inputCn} /></Field>
          <Field label="OF1 Time"><Input value={data.ofStage1Time} onChange={(e) => update('ofStage1Time', e.target.value)} className={inputCn} /></Field>
          <Field label="OF2 (Hz)"><Input value={data.ofStage2Freq} onChange={(e) => update('ofStage2Freq', e.target.value)} className={inputCn} /></Field>
          <Field label="OF2 Time"><Input value={data.ofStage2Time} onChange={(e) => update('ofStage2Time', e.target.value)} className={inputCn} /></Field>
        </div>

        <Sub title="Under-frequency" />
        <div className="grid grid-cols-4 gap-2">
          <Field label="UF1 (Hz)"><Input value={data.ufStage1Freq} onChange={(e) => update('ufStage1Freq', e.target.value)} className={inputCn} /></Field>
          <Field label="UF1 Time"><Input value={data.ufStage1Time} onChange={(e) => update('ufStage1Time', e.target.value)} className={inputCn} /></Field>
          <Field label="UF2 (Hz)"><Input value={data.ufStage2Freq} onChange={(e) => update('ufStage2Freq', e.target.value)} className={inputCn} /></Field>
          <Field label="UF2 Time"><Input value={data.ufStage2Time} onChange={(e) => update('ufStage2Time', e.target.value)} className={inputCn} /></Field>
        </div>

        <Sub title="ROCOF & Reconnection" />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <Field label="ROCOF (Hz/s)"><Input value={data.rocoFRate} onChange={(e) => update('rocoFRate', e.target.value)} className={inputCn} /></Field>
          <Field label="ROCOF Time"><Input value={data.rocoFTime} onChange={(e) => update('rocoFTime', e.target.value)} className={inputCn} /></Field>
          <Field label="Reconnection (s)"><Input value={data.reconnectionDelay} onChange={(e) => update('reconnectionDelay', e.target.value)} className={inputCn} /></Field>
        </div>
      </div>

      <SectionHeader title="Additional G99 Tests" />
      <div className="space-y-4">
        <Field label="Power Quality THD (%)"><Input value={data.powerQualityTHD} onChange={(e) => update('powerQualityTHD', e.target.value)} className={inputCn} placeholder="Total harmonic distortion" /></Field>
        <div className="space-y-3">
          <Toggle label="Reactive power capability verified" value={data.reactivePowerVerified} onChange={(v) => update('reactivePowerVerified', v)} />
          <Toggle label="Active power control verified" value={data.activePowerControlVerified} onChange={(v) => update('activePowerControlVerified', v)} />
          <Toggle label="Frequency response verified" value={data.frequencyResponseVerified} onChange={(v) => update('frequencyResponseVerified', v)} />
        </div>
        {data.interTripRequired && (
          <Field label="Intertrip Tested">
            <MobileSelectPicker value={data.interTripTested} onValueChange={(v) => update('interTripTested', v)} options={[{ value: 'pass', label: 'Pass' }, { value: 'fail', label: 'Fail' }, { value: 'na', label: 'N/A' }]} placeholder="Select..." triggerClassName={pickerTrigger} />
          </Field>
        )}
        <div className="grid grid-cols-2 gap-3">
          <Field label="Measured Export (kW)"><Input type="number" step="0.01" value={data.measuredExportKW} onChange={(e) => update('measuredExportKW', e.target.value)} className={inputCn} /></Field>
          <Field label="Grid Voltage at Connection (V)"><Input type="number" step="0.1" value={data.gridVoltageAtConnection} onChange={(e) => update('gridVoltageAtConnection', e.target.value)} className={inputCn} /></Field>
        </div>
      </div>

      <SectionHeader title="DNO Witness" />
      <div className="space-y-4">
        <Toggle label="DNO witness test required" value={data.dnoWitnessRequired} onChange={(v) => update('dnoWitnessRequired', v)} />
        {data.dnoWitnessRequired && (
          <div className="grid grid-cols-2 gap-3">
            <Field label="Witness Name"><Input value={data.dnoWitnessName} onChange={(e) => update('dnoWitnessName', e.target.value)} className={inputCn} /></Field>
            <Field label="Witness Date"><Input type="date" value={data.dnoWitnessDate} onChange={(e) => update('dnoWitnessDate', e.target.value)} className={inputCn} /></Field>
          </div>
        )}
      </div>

      <SectionHeader title="Commissioning Confirmation" />
      <div className="space-y-3">
        <Toggle label="Anti-islanding protection confirmed" value={data.antiIslandingConfirmed} onChange={(v) => update('antiIslandingConfirmed', v)} />
        <Toggle label="Protection settings verified" value={data.protectionSettingsVerified} onChange={(v) => update('protectionSettingsVerified', v)} />
        <Toggle label="System energised and operating correctly" value={data.systemOperating} onChange={(v) => update('systemOperating', v)} />
        <Toggle label="All labels and warning notices fitted" value={data.labelsApplied} onChange={(v) => update('labelsApplied', v)} />
        <Toggle label="Customer informed of system operation" value={data.customerInformed} onChange={(v) => update('customerInformed', v)} />
      </div>
    </div>
  );

  const renderSignoffTab = () => (
    <div className="space-y-6">
      <SectionHeader title="Reference" />
      <div className="space-y-4">
        <Field label="Reference No."><Input value={data.referenceNumber} onChange={(e) => update('referenceNumber', e.target.value)} className={inputCn} /></Field>
      </div>

      <SectionHeader title="Overall Result" />
      <div className="flex flex-col gap-2">
        {[{ v: 'satisfactory', l: 'Satisfactory', c: 'bg-green-500 text-white' }, { v: 'unsatisfactory', l: 'Unsatisfactory', c: 'bg-red-500 text-white' }].map(({ v, l, c }) => (
          <button key={v} type="button" onClick={() => update('overallResult', v as any)} className={cn('w-full h-12 rounded-xl text-sm font-semibold touch-manipulation transition-all active:scale-[0.98]', data.overallResult === v ? c : 'bg-white/[0.06] text-white border border-white/[0.08]')}>{l}</button>
        ))}
      </div>

      <SectionHeader title="Declaration & Signatures" />
      <div className="space-y-4">
        <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3.5">
          <p className="text-xs text-white leading-relaxed">I confirm that the generating equipment described above has been installed and commissioned in accordance with EREC G99. The protection settings have been verified and the system is connected to the distribution network with the approval of the DNO.</p>
        </div>
        <SignatureInput label="Installer Signature" value={data.installerSignature} onChange={(sig) => update('installerSignature', sig || '')} />
        <Field label="Date"><Input type="date" value={data.installerDate} onChange={(e) => update('installerDate', e.target.value)} className={inputCn} /></Field>
        {data.dnoWitnessRequired && <SignatureInput label="DNO Witness Signature" value={data.dnoWitnessSignature} onChange={(sig) => update('dnoWitnessSignature', sig || '')} />}
        <SignatureInput label="Customer Signature (optional)" value={data.customerSignature} onChange={(sig) => update('customerSignature', sig || '')} />
        {data.customerSignature && <Field label="Customer Date"><Input type="date" value={data.customerDate} onChange={(e) => update('customerDate', e.target.value)} className={inputCn} /></Field>}
      </div>

      <SectionHeader title="Notes" />
      <Textarea value={data.notes} onChange={(e) => update('notes', e.target.value)} className={textareaCn} placeholder="Additional notes..." />
    </div>
  );

  const smartTabs: SmartTab[] = [
    { value: 'application', label: 'Application', shortLabel: 'Apply', content: renderApplicationTab() },
    { value: 'commissioning', label: 'Commissioning', shortLabel: 'Commission', content: renderCommissioningTab() },
    { value: 'signoff', label: 'Sign-off', shortLabel: 'Sign', content: renderSignoffTab() },
  ];

  return (
    <div className="bg-background min-h-screen">
      <div className="bg-background">
        <div className="px-2 py-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white touch-manipulation active:scale-[0.98]">
                <ArrowLeft className="h-4 w-4" />
              </button>
              <div>
                <h1 className="text-sm font-bold text-white leading-tight">G99 Commissioning</h1>
                {data.referenceNumber && <p className="text-[10px] text-white font-mono mt-0.5">{data.referenceNumber}</p>}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <SyncStatusBadge status={syncStatus} />
              <button onClick={handleSaveDraft} disabled={isSaving} className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white touch-manipulation active:scale-[0.98] disabled:opacity-50">
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
        <div className="h-[1px] bg-gradient-to-r from-elec-yellow/40 via-elec-yellow/20 to-transparent" />
      </div>

      <main className="py-4 pb-48 sm:px-4 sm:pb-8">
        <SmartTabs tabs={smartTabs} value={currentTab} onValueChange={(v) => setCurrentTab(v as G99TabValue)} />
      </main>

      <div className="sticky bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-white/[0.08] p-4">
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] text-white">Section {currentTabIndex + 1} of {totalTabs}</span>
            <span className="text-[10px] font-medium text-white">{progress}%</span>
          </div>
          <div className="h-1 bg-white/[0.12] rounded-full overflow-hidden">
            <div className="h-full bg-elec-yellow rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        </div>
        {currentTabIndex === totalTabs - 1 ? (
          <div className="flex flex-col gap-2">
            <button onClick={handleGeneratePDF} disabled={isSaving} className="w-full h-12 rounded-xl bg-elec-yellow text-black text-sm font-semibold touch-manipulation active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2">
              {isSaving ? <><Loader2 className="h-4 w-4 animate-spin" />Generating...</> : 'Download PDF'}
            </button>
            {canNavigatePrevious && (
              <button onClick={navigatePrevious} className="w-full h-11 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white text-sm font-semibold touch-manipulation active:scale-[0.98] transition-all">
                Previous
              </button>
            )}
          </div>
        ) : (
          <div className="flex gap-3">
            <button onClick={navigatePrevious} disabled={!canNavigatePrevious} className="flex-1 h-12 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white text-sm font-semibold touch-manipulation active:scale-[0.98] transition-all disabled:opacity-30">
              Previous
            </button>
            <button onClick={navigateNext} disabled={!canNavigateNext} className="flex-1 h-12 rounded-xl bg-elec-yellow text-black text-sm font-semibold touch-manipulation active:scale-[0.98] transition-all disabled:opacity-30">
              Next
            </button>
          </div>
        )}
      </div>

      <AlertDialog open={showRecoveryDialog} onOpenChange={setShowRecoveryDialog}>
        <AlertDialogContent className="bg-background border-white/[0.08]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Recover Draft?</AlertDialogTitle>
            <AlertDialogDescription className="text-white">A previous unsaved G99 form was found. Would you like to recover it?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => { discardDraft(); setShowRecoveryDialog(false); }} className="text-white">Discard</AlertDialogCancel>
            <AlertDialogAction onClick={() => { if (recoveryDraft) { setData((prev) => ({ ...getDefaultG99FormData(), ...prev, ...recoveryDraft.data })); recoverDraft(); } setShowRecoveryDialog(false); }}>Recover Draft</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
