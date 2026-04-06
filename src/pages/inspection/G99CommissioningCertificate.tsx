/**
 * G99CommissioningCertificate.tsx
 * EREC G99 Issue 5 — Generators >16A per phase
 * Two-stage: Stage 1 (Application) + Stage 2 (Commissioning) + Sign-off
 */

import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Zap, Loader2, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import SignatureInput from '@/components/signature/SignatureInput';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { storageGetJSONSync, storageSetJSONSync, storageRemoveSync } from '@/utils/storage';
import { reportCloud } from '@/utils/reportCloud';
import { getDefaultG99FormData, UK_DNOS, G99FormData } from '@/types/g99-commissioning';
import { useG99CommissioningTabs, G99TabValue } from '@/hooks/useG99CommissioningTabs';

const inputCn = 'h-12 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500 [color-scheme:dark]';
const selectTriggerCn = 'h-12 touch-manipulation bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500 data-[state=open]:border-yellow-500';
const selectContentCn = 'z-[100] max-w-[calc(100vw-2rem)] bg-elec-gray border-elec-gray text-foreground';
const checkboxCn = 'border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black';

const DRAFT_KEY = 'elec-mate-draft-g99';

const Section = ({ title, accentColor, children }: { title: string; accentColor?: string; children: React.ReactNode }) => (
  <div className="space-y-4">
    <div className="border-b border-white/[0.06] pb-1 mb-3">
      <div className={cn('h-[2px] w-full rounded-full bg-gradient-to-r mb-2', accentColor || 'from-red-500 to-orange-400')} />
      <h2 className="text-xs font-medium text-white uppercase tracking-wider">{title}</h2>
    </div>
    {children}
  </div>
);

const Field = ({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
  <div><Label className="text-white text-xs mb-1.5 block">{label}{required && ' *'}</Label>{children}</div>
);

const TickButton = ({ checked, label, color = 'emerald', onChange }: { checked: boolean; label: string; color?: string; onChange: () => void }) => (
  <button onClick={onChange} className={cn('w-full flex items-center gap-3 p-3 rounded-xl border text-left touch-manipulation active:scale-[0.98] transition-all', checked ? `bg-${color}-500/10 border-${color}-500/25` : 'bg-white/[0.03] border-white/[0.06]')}>
    <div className={cn('w-5 h-5 rounded border-2 flex items-center justify-center transition-all flex-shrink-0', checked ? `bg-${color}-500 border-${color}-500` : 'border-white/30')}>
      {checked && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
    </div>
    <span className={cn('text-sm font-medium', checked ? `text-${color}-400` : 'text-white')}>{label}</span>
  </button>
);

export default function G99CommissioningCertificate() {
  const navigate = useNavigate();
  const { id: editId } = useParams<{ id: string }>();
  const [isSaving, setIsSaving] = useState(false);
  const [existingReportId, setExistingReportId] = useState<string | null>(null);

  const [data, setData] = useState<G99FormData>(() => {
    const saved = storageGetJSONSync<Partial<G99FormData>>(DRAFT_KEY, null);
    return saved ? { ...getDefaultG99FormData(), ...saved } : getDefaultG99FormData();
  });

  useEffect(() => {
    if (!editId || editId === 'new') return;
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return;
      const result = await reportCloud.getReportData(editId, user.id);
      if (result) { setData((prev) => ({ ...prev, ...(result as any) })); setExistingReportId(editId); }
    });
  }, [editId]);

  useEffect(() => {
    if (editId && editId !== 'new') return;
    const timer = setTimeout(() => { storageSetJSONSync(DRAFT_KEY, data); }, 2000);
    return () => clearTimeout(timer);
  }, [data, editId]);

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

  const handleSave = async () => {
    if (!data.installationAddress) { toast.error('Installation address required'); return; }
    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { toast.error('Please sign in'); setIsSaving(false); return; }
      if (existingReportId) { await reportCloud.updateReport(existingReportId, user.id, data as any); }
      else { const result = await reportCloud.createReport(user.id, 'g99-commissioning' as any, data as any); if (!result.success) { toast.error('Failed to save'); setIsSaving(false); return; } }

      toast.success('Saved — generating PDF...');
      const savedReportId = existingReportId || data.referenceNumber;
      try {
        let company: Record<string, any> = {};
        try { const { data: cpData } = await supabase.rpc('get_my_company_profile'); const cp = Array.isArray(cpData) ? cpData[0] : cpData; if (cp) company = cp; } catch {}
        const payload = { ...data, companyName: company.company_name || data.installerCompany, companyAddress: company.company_address || '', companyPhone: company.company_phone || data.installerPhone, companyEmail: company.company_email || data.installerEmail, companyLogo: company.company_logo || '' };
        const { data: pdfResult, error: pdfError } = await supabase.functions.invoke('generate-g99-commissioning-pdf', { body: { formData: payload } });
        if (pdfError) { toast.error('Saved but PDF failed'); }
        else if (pdfResult?.download_url) {
          let url = pdfResult.download_url;
          try { const { saveCertificatePdf } = await import('@/utils/certificate-pdf-storage'); const { permanentUrl, storagePath } = await saveCertificatePdf(pdfResult.download_url, user.id, savedReportId, data.referenceNumber); url = permanentUrl; await supabase.from('reports').update({ storage_path: storagePath, pdf_url: url, pdf_generated_at: new Date().toISOString() }).eq('report_id', savedReportId); } catch { await supabase.from('reports').update({ pdf_url: url, pdf_generated_at: new Date().toISOString() }).eq('report_id', savedReportId); }
          const { openOrDownloadPdf } = await import('@/utils/pdf-download');
          await openOrDownloadPdf(url, `G99-${data.referenceNumber}.pdf`);
          toast.success('G99 form generated');
        }
      } catch { toast.error('Saved but PDF failed'); }
      storageRemoveSync(DRAFT_KEY);
      navigate(-1);
    } catch { toast.error('Failed to save'); } finally { setIsSaving(false); }
  };

  const progress = getProgressPercentage();

  // Tab content renderers
  const renderApplication = () => (
    <div className="space-y-5">
      <Section title="DNO Application" accentColor="from-red-500/40 to-orange-400/20">
        <Field label="DNO" required><Select value={data.dnoName} onValueChange={(v) => update('dnoName', v)}><SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select DNO..." /></SelectTrigger><SelectContent className={selectContentCn}>{UK_DNOS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent></Select></Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Application Date"><Input type="date" value={data.applicationDate} onChange={(e) => update('applicationDate', e.target.value)} className={inputCn} /></Field>
          <Field label="Application Ref"><Input value={data.dnoApplicationRef} onChange={(e) => update('dnoApplicationRef', e.target.value)} className={inputCn} /></Field>
        </div>
        <Field label="Proposed Commissioning Date"><Input type="date" value={data.proposedCommissioningDate} onChange={(e) => update('proposedCommissioningDate', e.target.value)} className={inputCn} /></Field>
        <Field label="Connection Voltage"><Select value={data.connectionVoltage} onValueChange={(v) => update('connectionVoltage', v)}><SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select..." /></SelectTrigger><SelectContent className={selectContentCn}><SelectItem value="LV">LV</SelectItem><SelectItem value="HV">HV</SelectItem><SelectItem value="EHV">EHV</SelectItem></SelectContent></Select></Field>
        <div className="space-y-2">
          <div className="flex items-center gap-3"><Checkbox checked={data.networkStudyRequired} onCheckedChange={(v) => update('networkStudyRequired', !!v)} className={checkboxCn} /><Label className="text-sm text-white">Network study required</Label></div>
          <div className="flex items-center gap-3"><Checkbox checked={data.interTripRequired} onCheckedChange={(v) => update('interTripRequired', !!v)} className={checkboxCn} /><Label className="text-sm text-white">Intertrip required</Label></div>
        </div>
        <div className="flex items-center gap-3"><Checkbox checked={data.dnoApprovalReceived} onCheckedChange={(v) => update('dnoApprovalReceived', !!v)} className={checkboxCn} /><Label className="text-sm text-white font-semibold">DNO approval received</Label></div>
        {data.dnoApprovalReceived && (
          <div className="grid grid-cols-2 gap-3">
            <Field label="Approval Date"><Input type="date" value={data.dnoApprovalDate} onChange={(e) => update('dnoApprovalDate', e.target.value)} className={inputCn} /></Field>
            <Field label="Approval Ref"><Input value={data.dnoApprovalRef} onChange={(e) => update('dnoApprovalRef', e.target.value)} className={inputCn} /></Field>
          </div>
        )}
        {data.dnoApprovalReceived && <Field label="Special Conditions"><Textarea value={data.dnoSpecialConditions} onChange={(e) => update('dnoSpecialConditions', e.target.value)} className="touch-manipulation text-base min-h-[60px] bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500" placeholder="Any DNO-imposed conditions..." /></Field>}
      </Section>

      <Section title="Installer Details" accentColor="from-elec-yellow/40 to-amber-400/20">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Name"><Input value={data.installerName} onChange={(e) => update('installerName', e.target.value)} className={inputCn} /></Field>
          <Field label="Company"><Input value={data.installerCompany} onChange={(e) => update('installerCompany', e.target.value)} className={inputCn} /></Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Field label="MCS No." required><Input value={data.mcsNumber} onChange={(e) => update('mcsNumber', e.target.value)} className={inputCn} /></Field>
          <Field label="Scheme"><Input value={data.registrationScheme} onChange={(e) => update('registrationScheme', e.target.value)} className={inputCn} /></Field>
          <Field label="Reg. No."><Input value={data.registrationNumber} onChange={(e) => update('registrationNumber', e.target.value)} className={inputCn} /></Field>
        </div>
      </Section>

      <Section title="Site & Equipment" accentColor="from-blue-500/40 to-cyan-400/20">
        <Field label="Installation Address" required><Input value={data.installationAddress} onChange={(e) => update('installationAddress', e.target.value)} className={inputCn} /></Field>
        <Field label="MPAN"><Input value={data.mpan} onChange={(e) => update('mpan', e.target.value)} className={inputCn} placeholder="21-digit" /></Field>
        <Field label="Equipment Type"><Select value={data.equipmentType} onValueChange={(v) => update('equipmentType', v)}><SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select..." /></SelectTrigger><SelectContent className={selectContentCn}><SelectItem value="Solar PV">Solar PV</SelectItem><SelectItem value="Battery Storage">Battery Storage</SelectItem><SelectItem value="Combined PV+Battery">Combined PV + Battery</SelectItem><SelectItem value="Wind">Wind</SelectItem></SelectContent></Select></Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Manufacturer"><Input value={data.equipmentManufacturer} onChange={(e) => update('equipmentManufacturer', e.target.value)} className={inputCn} /></Field>
          <Field label="Model"><Input value={data.equipmentModel} onChange={(e) => update('equipmentModel', e.target.value)} className={inputCn} /></Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Rated Output (kW)" required><Input type="number" step="0.01" value={data.ratedOutput} onChange={(e) => update('ratedOutput', e.target.value)} className={inputCn} placeholder=">3.68 single / >11.04 three" /></Field>
          <Field label="Proposed Export (kW)"><Input type="number" step="0.01" value={data.proposedExportCapacity} onChange={(e) => update('proposedExportCapacity', e.target.value)} className={inputCn} /></Field>
        </div>
        <Field label="No. of Generating Units"><Input type="number" value={data.numberOfGeneratingUnits} onChange={(e) => update('numberOfGeneratingUnits', e.target.value)} className={inputCn} /></Field>
      </Section>
    </div>
  );

  const renderCommissioning = () => (
    <div className="space-y-5">
      <Section title="Commissioning Details" accentColor="from-green-500/40 to-emerald-400/20">
        <Field label="Commissioning Date"><Input type="date" value={data.commissioningDate} onChange={(e) => update('commissioningDate', e.target.value)} className={inputCn} /></Field>
        <Field label="Settings Source"><Select value={data.settingsSource} onValueChange={(v) => update('settingsSource', v)}><SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select..." /></SelectTrigger><SelectContent className={selectContentCn}><SelectItem value="G99 default">G99 default settings</SelectItem><SelectItem value="DNO specified">DNO specified (non-standard)</SelectItem></SelectContent></Select></Field>
      </Section>

      <Section title="Grid Protection Settings" accentColor="from-purple-500/40 to-indigo-400/20">
        {data.settingsSource === 'DNO specified' && <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-3 mb-3"><p className="text-xs text-amber-400 font-semibold">DNO-specified non-standard settings — enter values from DNO approval letter</p></div>}
        <p className="text-xs font-semibold text-white">Over-voltage</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <Field label="OV1 (V)"><Input value={data.ovStage1Voltage} onChange={(e) => update('ovStage1Voltage', e.target.value)} className={inputCn} /></Field>
          <Field label="OV1 Time"><Input value={data.ovStage1Time} onChange={(e) => update('ovStage1Time', e.target.value)} className={inputCn} /></Field>
          <Field label="OV2 (V)"><Input value={data.ovStage2Voltage} onChange={(e) => update('ovStage2Voltage', e.target.value)} className={inputCn} /></Field>
          <Field label="OV2 Time"><Input value={data.ovStage2Time} onChange={(e) => update('ovStage2Time', e.target.value)} className={inputCn} /></Field>
        </div>
        <p className="text-xs font-semibold text-white mt-3">Under-voltage</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <Field label="UV1 (V)"><Input value={data.uvStage1Voltage} onChange={(e) => update('uvStage1Voltage', e.target.value)} className={inputCn} /></Field>
          <Field label="UV1 Time"><Input value={data.uvStage1Time} onChange={(e) => update('uvStage1Time', e.target.value)} className={inputCn} /></Field>
          <Field label="UV2 (V)"><Input value={data.uvStage2Voltage} onChange={(e) => update('uvStage2Voltage', e.target.value)} className={inputCn} /></Field>
          <Field label="UV2 Time"><Input value={data.uvStage2Time} onChange={(e) => update('uvStage2Time', e.target.value)} className={inputCn} /></Field>
        </div>
        <p className="text-xs font-semibold text-white mt-3">Over-frequency</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <Field label="OF1 (Hz)"><Input value={data.ofStage1Freq} onChange={(e) => update('ofStage1Freq', e.target.value)} className={inputCn} /></Field>
          <Field label="OF1 Time"><Input value={data.ofStage1Time} onChange={(e) => update('ofStage1Time', e.target.value)} className={inputCn} /></Field>
          <Field label="OF2 (Hz)"><Input value={data.ofStage2Freq} onChange={(e) => update('ofStage2Freq', e.target.value)} className={inputCn} /></Field>
          <Field label="OF2 Time"><Input value={data.ofStage2Time} onChange={(e) => update('ofStage2Time', e.target.value)} className={inputCn} /></Field>
        </div>
        <p className="text-xs font-semibold text-white mt-3">Under-frequency</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <Field label="UF1 (Hz)"><Input value={data.ufStage1Freq} onChange={(e) => update('ufStage1Freq', e.target.value)} className={inputCn} /></Field>
          <Field label="UF1 Time"><Input value={data.ufStage1Time} onChange={(e) => update('ufStage1Time', e.target.value)} className={inputCn} /></Field>
          <Field label="UF2 (Hz)"><Input value={data.ufStage2Freq} onChange={(e) => update('ufStage2Freq', e.target.value)} className={inputCn} /></Field>
          <Field label="UF2 Time"><Input value={data.ufStage2Time} onChange={(e) => update('ufStage2Time', e.target.value)} className={inputCn} /></Field>
        </div>
        <p className="text-xs font-semibold text-white mt-3">ROCOF & Reconnection</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <Field label="ROCOF (Hz/s)"><Input value={data.rocoFRate} onChange={(e) => update('rocoFRate', e.target.value)} className={inputCn} /></Field>
          <Field label="ROCOF Time"><Input value={data.rocoFTime} onChange={(e) => update('rocoFTime', e.target.value)} className={inputCn} /></Field>
          <Field label="Reconnection (s)"><Input value={data.reconnectionDelay} onChange={(e) => update('reconnectionDelay', e.target.value)} className={inputCn} /></Field>
        </div>
      </Section>

      <Section title="Additional G99 Tests" accentColor="from-cyan-500/40 to-blue-400/20">
        <Field label="Power Quality THD (%)"><Input value={data.powerQualityTHD} onChange={(e) => update('powerQualityTHD', e.target.value)} className={inputCn} placeholder="Total harmonic distortion" /></Field>
        <div className="space-y-2">
          <div className="flex items-center gap-3"><Checkbox checked={data.reactivePowerVerified} onCheckedChange={(v) => update('reactivePowerVerified', !!v)} className={checkboxCn} /><Label className="text-sm text-white">Reactive power capability verified</Label></div>
          <div className="flex items-center gap-3"><Checkbox checked={data.activePowerControlVerified} onCheckedChange={(v) => update('activePowerControlVerified', !!v)} className={checkboxCn} /><Label className="text-sm text-white">Active power control verified</Label></div>
          <div className="flex items-center gap-3"><Checkbox checked={data.frequencyResponseVerified} onCheckedChange={(v) => update('frequencyResponseVerified', !!v)} className={checkboxCn} /><Label className="text-sm text-white">Frequency response verified</Label></div>
        </div>
        {data.interTripRequired && (
          <Field label="Intertrip Tested"><Select value={data.interTripTested} onValueChange={(v) => update('interTripTested', v)}><SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select..." /></SelectTrigger><SelectContent className={selectContentCn}><SelectItem value="pass">Pass</SelectItem><SelectItem value="fail">Fail</SelectItem><SelectItem value="na">N/A</SelectItem></SelectContent></Select></Field>
        )}
        <div className="grid grid-cols-2 gap-3">
          <Field label="Measured Export (kW)"><Input type="number" step="0.01" value={data.measuredExportKW} onChange={(e) => update('measuredExportKW', e.target.value)} className={inputCn} /></Field>
          <Field label="Grid Voltage at Connection (V)"><Input type="number" step="0.1" value={data.gridVoltageAtConnection} onChange={(e) => update('gridVoltageAtConnection', e.target.value)} className={inputCn} /></Field>
        </div>
      </Section>

      <Section title="DNO Witness" accentColor="from-amber-500/40 to-yellow-400/20">
        <div className="flex items-center gap-3"><Checkbox checked={data.dnoWitnessRequired} onCheckedChange={(v) => update('dnoWitnessRequired', !!v)} className={checkboxCn} /><Label className="text-sm text-white">DNO witness test required</Label></div>
        {data.dnoWitnessRequired && (
          <div className="grid grid-cols-2 gap-3">
            <Field label="Witness Name"><Input value={data.dnoWitnessName} onChange={(e) => update('dnoWitnessName', e.target.value)} className={inputCn} /></Field>
            <Field label="Witness Date"><Input type="date" value={data.dnoWitnessDate} onChange={(e) => update('dnoWitnessDate', e.target.value)} className={inputCn} /></Field>
          </div>
        )}
      </Section>

      <Section title="Commissioning Confirmation" accentColor="from-emerald-500/40 to-green-400/20">
        <div className="space-y-2">
          <TickButton checked={data.antiIslandingConfirmed} label="Anti-islanding protection confirmed" onChange={() => update('antiIslandingConfirmed', !data.antiIslandingConfirmed)} />
          <TickButton checked={data.protectionSettingsVerified} label="Protection settings verified" onChange={() => update('protectionSettingsVerified', !data.protectionSettingsVerified)} />
          <TickButton checked={data.systemOperating} label="System energised and operating correctly" onChange={() => update('systemOperating', !data.systemOperating)} />
          <TickButton checked={data.labelsApplied} label="All labels and warning notices fitted" onChange={() => update('labelsApplied', !data.labelsApplied)} />
          <TickButton checked={data.customerInformed} label="Customer informed of system operation" onChange={() => update('customerInformed', !data.customerInformed)} />
        </div>
      </Section>
    </div>
  );

  const renderSignoff = () => (
    <div className="space-y-5">
      <Section title="Overall Result" accentColor="from-green-500/40 to-emerald-400/20">
        <div className="flex flex-col gap-2">
          {[{ v: 'satisfactory', l: 'Satisfactory', c: 'bg-green-500 text-white' }, { v: 'unsatisfactory', l: 'Unsatisfactory', c: 'bg-red-500 text-white' }].map(({ v, l, c }) => (
            <button key={v} type="button" onClick={() => update('overallResult', v as any)} className={cn('w-full h-12 rounded-xl text-sm font-semibold touch-manipulation transition-all active:scale-[0.98]', data.overallResult === v ? c : 'bg-white/[0.06] text-white border border-white/[0.08]')}>{l}</button>
          ))}
        </div>
      </Section>

      <Section title="Declaration & Signatures" accentColor="from-elec-yellow/40 to-amber-400/20">
        <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3.5 mb-3">
          <p className="text-xs text-white leading-relaxed">I confirm that the generating equipment described above has been installed and commissioned in accordance with EREC G99. The protection settings have been verified and the system is connected to the distribution network with the approval of the DNO.</p>
        </div>
        <SignatureInput label="Installer Signature" value={data.installerSignature} onChange={(sig) => update('installerSignature', sig || '')} />
        <Field label="Date"><Input type="date" value={data.installerDate} onChange={(e) => update('installerDate', e.target.value)} className={inputCn} /></Field>
        {data.dnoWitnessRequired && <SignatureInput label="DNO Witness Signature" value={data.dnoWitnessSignature} onChange={(sig) => update('dnoWitnessSignature', sig || '')} />}
        <SignatureInput label="Customer Signature (optional)" value={data.customerSignature} onChange={(sig) => update('customerSignature', sig || '')} />
      </Section>

      <Section title="Notes" accentColor="from-white/20 to-white/5">
        <Textarea value={data.notes} onChange={(e) => update('notes', e.target.value)} className="touch-manipulation text-base min-h-[80px] bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500" placeholder="Additional notes..." />
      </Section>
    </div>
  );

  const tabContent: Record<G99TabValue, () => JSX.Element> = { application: renderApplication, commissioning: renderCommissioning, signoff: renderSignoff };

  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24">
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06]">
        <div className="px-4 py-2">
          <div className="flex items-center gap-3 h-11">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]"><ArrowLeft className="h-5 w-5" /></Button>
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/20"><Zap className="h-4 w-4 text-red-400" /></div>
              <h1 className="text-base font-semibold text-white">G99 Commissioning</h1>
            </div>
          </div>
        </div>
        {/* Tab selector */}
        <div className="px-4 pb-2 flex gap-1">
          {[{ id: 'application' as const, label: 'Application' }, { id: 'commissioning' as const, label: 'Commissioning' }, { id: 'signoff' as const, label: 'Sign-off' }].map((tab) => (
            <button key={tab.id} onClick={() => setCurrentTab(tab.id)} className={cn('flex-1 h-10 rounded-lg text-xs font-semibold touch-manipulation transition-all', currentTab === tab.id ? 'bg-elec-yellow text-black' : 'bg-white/[0.06] text-white')}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-4 py-4 max-w-3xl mx-auto">
        {tabContent[currentTab]()}
      </motion.main>

      {/* Bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#242428] border-t border-border p-3 z-40">
        <div className="mb-2">
          <div className="flex justify-between text-xs text-white mb-1"><span>Step {currentTabIndex + 1} of {totalTabs}</span><span>{progress}%</span></div>
          <div className="h-2 bg-muted rounded-full overflow-hidden"><div className="h-full bg-green-500 transition-all rounded-full" style={{ width: `${progress}%` }} /></div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={navigatePrevious} disabled={!canNavigatePrevious} className="flex-1 h-12 touch-manipulation"><ChevronLeft className="h-4 w-4 mr-1" />Previous</Button>
          {currentTabIndex === totalTabs - 1 ? (
            <Button onClick={handleSave} disabled={isSaving} className="flex-1 h-12 bg-red-500 hover:bg-red-600 touch-manipulation">
              {isSaving ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Saving...</> : 'Download PDF'}
            </Button>
          ) : (
            <Button onClick={navigateNext} disabled={!canNavigateNext} className="flex-1 h-12 touch-manipulation">Next<ChevronRight className="h-4 w-4 ml-1" /></Button>
          )}
        </div>
      </div>
    </div>
  );
}
