/**
 * HeatPumpCertificate.tsx
 * MCS Heat Pump Commissioning Certificate — MCS MIS 3005-I:2025
 *
 * Sits in the Renewables cert group (alongside Solar PV / BESS). Data capture
 * transcribed from MIS 3005 Appendix A. PDF output is a follow-up slice —
 * this slice captures + cloud-saves the commissioning record.
 */
import { useState, useEffect, useCallback, useRef, type ReactNode } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import SignatureInput from '@/components/signature/SignatureInput';
import CertShellHeader from '@/components/inspection/shared/CertShellHeader';
import CertShellFooter from '@/components/inspection/shared/CertShellFooter';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { reportCloud } from '@/utils/reportCloud';
import { storageGetJSONSync, storageSetJSONSync, storageRemoveSync } from '@/utils/storage';
import {
  HeatPumpFormData,
  getDefaultHeatPumpFormData,
} from '@/types/heatPump';

/* eslint-disable @typescript-eslint/no-explicit-any */

const REPORT_TYPE = 'heat-pump' as const;
const DRAFT_KEY = 'heat-pump-draft';

const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 space-y-4';

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';

const textareaCn =
  'textarea-soft rounded-xl border-0 bg-white/[0.05] px-3.5 py-3 text-base md:text-base text-white placeholder:text-white/25 caret-elec-yellow transition-colors focus:bg-white/[0.07] focus:ring-1 focus:ring-elec-yellow/50 focus-visible:ring-1 focus-visible:ring-elec-yellow/50 focus:outline-none focus:shadow-none min-h-[90px] touch-manipulation';

const selectTriggerCn =
  'h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white hover:border-white/[0.3] focus:border-elec-yellow focus:ring-0 focus-visible:ring-0 focus:outline-none focus:shadow-none [color-scheme:dark] touch-manipulation';

const labelCn = 'text-[12px] font-medium text-white mb-1 block';

const SectionTitle = ({ title }: { title: string }) => (
  <h2 className="mb-3 text-[15px] font-semibold tracking-tight text-white">{title}</h2>
);

const Sub = ({ title }: { title: string }) => (
  <div className="flex items-center gap-3 pt-2">
    <p className="text-[13px] font-semibold text-white shrink-0">{title}</p>
    <div className="h-px flex-1 bg-white/[0.08]" />
  </div>
);

const Field = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => (
  <div>
    <Label className={labelCn}>{label}</Label>
    {children}
  </div>
);

/** Yes / No / N/A tri-state select for checklist items */
const TriState = ({
  value,
  onChange,
  na = true,
}: {
  value: string;
  onChange: (v: string) => void;
  na?: boolean;
}) => (
  <Select value={value || undefined} onValueChange={onChange}>
    <SelectTrigger className={selectTriggerCn}>
      <SelectValue placeholder="—" />
    </SelectTrigger>
    <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
      <SelectItem value="yes">Yes</SelectItem>
      <SelectItem value="no">No</SelectItem>
      {na && <SelectItem value="n/a">N/A</SelectItem>}
    </SelectContent>
  </Select>
);

/** Field-pair grid; `tight` = short numeric labels, 2-up on phones, 3-up from sm. */
const Grid = ({ children, tight = false }: { children: ReactNode; tight?: boolean }) => (
  <div
    className={
      tight
        ? 'grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-3'
        : 'grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2'
    }
  >
    {children}
  </div>
);

const TAB_ORDER = ['details', 'design', 'electrical', 'system', 'signoff'] as const;
type HeatPumpTab = (typeof TAB_ORDER)[number];

const STEPS: { id: HeatPumpTab; label: string }[] = [
  { id: 'details', label: 'Details' },
  { id: 'design', label: 'Design' },
  { id: 'electrical', label: 'Electrical' },
  { id: 'system', label: 'System' },
  { id: 'signoff', label: 'Sign off' },
];

export default function HeatPumpCertificate() {
  const navigate = useNavigate();
  const { id: editId } = useParams<{ id: string }>();
  const isNew = editId === 'new' || !editId;

  const [data, setData] = useState<HeatPumpFormData>(() => {
    if (isNew) {
      const saved = storageGetJSONSync<Partial<HeatPumpFormData>>(DRAFT_KEY, null);
      return saved ? { ...getDefaultHeatPumpFormData(), ...saved } : getDefaultHeatPumpFormData();
    }
    return getDefaultHeatPumpFormData();
  });
  const [existingReportId, setExistingReportId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(!isNew);
  const [currentTab, setCurrentTab] = useState<HeatPumpTab>('details');
  // Track direction so the step slide matches travel (forward vs back).
  const prevIndexRef = useRef(0);

  // Load existing document if editing
  useEffect(() => {
    if (isNew || !editId) return;
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return;
      const result = await reportCloud.getReportData(editId, user.id);
      if (result) {
        setData((prev) => ({ ...prev, ...(result as any) }));
        setExistingReportId(editId);
      }
      setIsLoading(false);
    });
  }, [editId, isNew]);

  // Auto-save draft (new documents only)
  useEffect(() => {
    if (!isNew) return;
    const t = setTimeout(() => storageSetJSONSync(DRAFT_KEY, data), 2000);
    return () => clearTimeout(t);
  }, [data, isNew]);

  // Pre-fill company from profile
  useEffect(() => {
    if (data.companyName) return;
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return;
      const { data: cp } = await supabase.rpc('get_my_company_profile');
      const profile = Array.isArray(cp) ? cp[0] : cp;
      if (profile) {
        setData((prev) => ({
          ...prev,
          companyName: prev.companyName || profile.company_name || '',
          companyEmail: prev.companyEmail || profile.company_email || '',
        }));
      }
    });
  }, [data.companyName]);

  const update = useCallback(<K extends keyof HeatPumpFormData>(field: K, value: HeatPumpFormData[K]) => {
    setData((prev) => ({ ...prev, [field]: value }));
  }, []);

  // Nested-group updater (electrical / controlParameters / runningData / ashp / gshp / centralHeating / controls)
  const updateGroup = useCallback((group: keyof HeatPumpFormData, field: string, value: any) => {
    setData((prev) => ({
      ...prev,
      [group]: { ...(prev[group] as any), [field]: value },
    }));
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        toast.error('Please sign in to save');
        setIsSaving(false);
        return;
      }
      // Mirror MIS 3005 field names onto the app-standard keys reportCloud maps
      // to columns (client_name / inspection_date / inspector_name) — this is
      // what populates report lists and fires the CRM customer auto-link.
      const payload = {
        ...data,
        clientName: data.customerName,
        inspectionDate: data.commissioningDate,
        inspectorName: data.technicianName || data.engineerName,
      };
      if (existingReportId) {
        await reportCloud.updateReport(existingReportId, user.id, payload as any);
      } else {
        const result = await reportCloud.createReport(user.id, REPORT_TYPE, payload as any);
        if (!result.success) {
          toast.error('Failed to save');
          setIsSaving(false);
          return;
        }
      }
      storageRemoveSync(DRAFT_KEY);
      toast.success('Heat pump commissioning record saved');
      navigate(-1);
    } catch {
      toast.error('Failed to save');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-elec-yellow" />
      </div>
    );
  }

  const el = data.electrical;
  const cp = data.controlParameters;
  const rd = data.runningData;
  const isAshp = data.heatPumpType === 'ASHP' || data.heatPumpType === 'exhaust-air';
  const isGshp = data.heatPumpType === 'GSHP' || data.heatPumpType === 'WSHP';

  // Presentational step completion — header colouring + progress ring only.
  const completedTabs: Record<string, boolean> = {
    details: !!(data.customerName && data.installationAddress && data.commissioningDate),
    design: !!(data.design.designHeatLossKw && data.design.designFlowTemp),
    electrical: !!(el.supplyPhase && el.incomingVoltage),
    system: !!(cp.runningMode && rd.flowTemp),
    signoff: !!(data.engineerName && data.engineerSignature),
  };
  const progressPercent = Math.round(
    (TAB_ORDER.filter((t) => completedTabs[t]).length / TAB_ORDER.length) * 100
  );

  const currentIndex = TAB_ORDER.indexOf(currentTab);
  const isBack = currentIndex < prevIndexRef.current;
  prevIndexRef.current = currentIndex;

  const goToTab = (tab: HeatPumpTab) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0 });
  };

  const stepWrapCn = 'space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4';

  const stepContent: Record<HeatPumpTab, ReactNode> = {
    details: (
      <div className={stepWrapCn}>
        {/* Customer + company */}
        <div className={cardCn}>
          <SectionTitle title="Customer" />
          <Field label="Customer name"><Input value={data.customerName} onChange={(e) => update('customerName', e.target.value)} className={inputCn} /></Field>
          <Field label="Installation address"><Input value={data.installationAddress} onChange={(e) => update('installationAddress', e.target.value)} className={inputCn} /></Field>
          <Grid>
            <Field label="Postcode"><Input value={data.installationPostcode} onChange={(e) => update('installationPostcode', e.target.value.toUpperCase())} className={inputCn} /></Field>
            <Field label="Email"><Input type="email" value={data.customerEmail} onChange={(e) => update('customerEmail', e.target.value)} className={inputCn} /></Field>
            <Field label="Commissioning date"><Input type="date" value={data.commissioningDate} onChange={(e) => update('commissioningDate', e.target.value)} className={inputCn} /></Field>
          </Grid>
          <Sub title="Company / technician" />
          <Grid>
            <Field label="Company"><Input value={data.companyName} onChange={(e) => update('companyName', e.target.value)} className={inputCn} /></Field>
            <Field label="Job reference"><Input value={data.jobReference} onChange={(e) => update('jobReference', e.target.value)} className={inputCn} /></Field>
            <Field label="Technician"><Input value={data.technicianName} onChange={(e) => update('technicianName', e.target.value)} className={inputCn} /></Field>
            <Field label="Contact no."><Input type="tel" value={data.contactNumber} onChange={(e) => update('contactNumber', e.target.value)} className={inputCn} /></Field>
            <Field label="Company email"><Input type="email" value={data.companyEmail} onChange={(e) => update('companyEmail', e.target.value)} className={inputCn} /></Field>
          </Grid>
        </div>

        {/* Product */}
        <div className={cardCn}>
          <SectionTitle title="Product information" />
          <Grid>
            <Field label="Heat pump type">
              <Select value={data.heatPumpType || undefined} onValueChange={(v) => update('heatPumpType', v as any)}>
                <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                  <SelectItem value="ASHP">Air source (ASHP)</SelectItem>
                  <SelectItem value="GSHP">Ground source (GSHP)</SelectItem>
                  <SelectItem value="WSHP">Water source (WSHP)</SelectItem>
                  <SelectItem value="exhaust-air">Exhaust air</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field label="Manufacturer"><Input value={data.manufacturer} onChange={(e) => update('manufacturer', e.target.value)} className={inputCn} /></Field>
            <Field label="Installed per mfr instructions"><TriState na={false} value={data.installedPerManufacturer} onChange={(v) => update('installedPerManufacturer', v as any)} /></Field>
          </Grid>
          <Sub title="Model & serial numbers" />
          <Grid>
            <Field label="HP model no."><Input value={data.hpModelNo} onChange={(e) => update('hpModelNo', e.target.value)} className={inputCn} /></Field>
            <Field label="HP serial no."><Input value={data.hpSerialNo} onChange={(e) => update('hpSerialNo', e.target.value)} className={inputCn} /></Field>
            <Field label="Indoor model no."><Input value={data.indoorModelNo} onChange={(e) => update('indoorModelNo', e.target.value)} className={inputCn} /></Field>
            <Field label="Indoor serial no."><Input value={data.indoorSerialNo} onChange={(e) => update('indoorSerialNo', e.target.value)} className={inputCn} /></Field>
            <Field label="Interface model no."><Input value={data.interfaceModelNo} onChange={(e) => update('interfaceModelNo', e.target.value)} className={inputCn} /></Field>
            <Field label="Interface serial no."><Input value={data.interfaceSerialNo} onChange={(e) => update('interfaceSerialNo', e.target.value)} className={inputCn} /></Field>
          </Grid>
        </div>
      </div>
    ),

    design: (
      <div className={stepWrapCn}>
        {/* Design & performance (MCS 031 — feeds the MCS certificate + BUS grant) */}
        <div className={cn(cardCn, 'lg:col-span-2')}>
          <SectionTitle title="Design & performance (MCS 031)" />
          <Grid>
            <Field label="Design heat loss (kW)"><Input value={data.design.designHeatLossKw} onChange={(e) => updateGroup('design', 'designHeatLossKw', e.target.value)} className={inputCn} /></Field>
            <Field label="Design flow temp (°C)"><Input value={data.design.designFlowTemp} onChange={(e) => updateGroup('design', 'designFlowTemp', e.target.value)} className={inputCn} /></Field>
            <Field label="Design outdoor temp (°C)"><Input value={data.design.designOutdoorTemp} onChange={(e) => updateGroup('design', 'designOutdoorTemp', e.target.value)} className={inputCn} /></Field>
            <Field label="Rated heat output (kW)"><Input value={data.design.ratedHeatOutputKw} onChange={(e) => updateGroup('design', 'ratedHeatOutputKw', e.target.value)} className={inputCn} /></Field>
            <Field label="SCOP"><Input value={data.design.scop} onChange={(e) => updateGroup('design', 'scop', e.target.value)} className={inputCn} /></Field>
            <Field label="Heat Emitter Guide (MCS 021)"><TriState na={false} value={data.design.heatEmitterGuideCompliant} onChange={(v) => updateGroup('design', 'heatEmitterGuideCompliant', v)} /></Field>
            <Field label="Space heating demand (kWh/yr)"><Input value={data.design.spaceHeatingDemandKwh} onChange={(e) => updateGroup('design', 'spaceHeatingDemandKwh', e.target.value)} className={inputCn} /></Field>
            <Field label="DHW demand (kWh/yr)"><Input value={data.design.dhwDemandKwh} onChange={(e) => updateGroup('design', 'dhwDemandKwh', e.target.value)} className={inputCn} /></Field>
            <Field label="Est. annual generation (kWh/yr)"><Input value={data.design.estimatedAnnualGenerationKwh} onChange={(e) => updateGroup('design', 'estimatedAnnualGenerationKwh', e.target.value)} className={inputCn} /></Field>
            <Field label="MCS product ref"><Input value={data.design.mcsProductReference} onChange={(e) => updateGroup('design', 'mcsProductReference', e.target.value)} className={inputCn} /></Field>
          </Grid>
        </div>
      </div>
    ),

    electrical: (
      <div className={stepWrapCn}>
        {/* Pre-commissioning electrical */}
        <div className={cn(cardCn, 'lg:col-span-2')}>
          <SectionTitle title="Pre-commissioning checks — electrical" />
          <Grid>
            <Field label="Supply phase">
              <Select value={el.supplyPhase || undefined} onValueChange={(v) => updateGroup('electrical', 'supplyPhase', v)}>
                <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="—" /></SelectTrigger>
                <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                  <SelectItem value="single">Single phase</SelectItem>
                  <SelectItem value="three">Three phase</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field label="Incoming voltage (V)"><Input value={el.incomingVoltage} onChange={(e) => updateGroup('electrical', 'incomingVoltage', e.target.value)} className={inputCn} /></Field>
            <Field label="Visual condition"><TriState na={false} value={el.visualCondition} onChange={(v) => updateGroup('electrical', 'visualCondition', v)} /></Field>
            <Field label="Resistance to earth (L-E) Ω"><Input value={el.resistanceToEarth} onChange={(e) => updateGroup('electrical', 'resistanceToEarth', e.target.value)} className={inputCn} /></Field>
            <Field label="Short circuit (L-N) Ω"><Input value={el.shortCircuit} onChange={(e) => updateGroup('electrical', 'shortCircuit', e.target.value)} className={inputCn} /></Field>
            <Field label="Sensors reading correctly"><TriState na={false} value={el.sensorsChecked} onChange={(v) => updateGroup('electrical', 'sensorsChecked', v)} /></Field>
          </Grid>
          <Sub title="Line readings (V)" />
          <Grid tight>
            <Field label="L1-N"><Input value={el.l1n} onChange={(e) => updateGroup('electrical', 'l1n', e.target.value)} className={inputCn} /></Field>
            <Field label="L1-E"><Input value={el.l1e} onChange={(e) => updateGroup('electrical', 'l1e', e.target.value)} className={inputCn} /></Field>
            <Field label="N-E"><Input value={el.ne} onChange={(e) => updateGroup('electrical', 'ne', e.target.value)} className={inputCn} /></Field>
            <Field label="L2-N"><Input value={el.l2n} onChange={(e) => updateGroup('electrical', 'l2n', e.target.value)} className={inputCn} /></Field>
            <Field label="L2-E"><Input value={el.l2e} onChange={(e) => updateGroup('electrical', 'l2e', e.target.value)} className={inputCn} /></Field>
            <Field label="L1-L2"><Input value={el.l1l2} onChange={(e) => updateGroup('electrical', 'l1l2', e.target.value)} className={inputCn} /></Field>
            <Field label="L3-N"><Input value={el.l3n} onChange={(e) => updateGroup('electrical', 'l3n', e.target.value)} className={inputCn} /></Field>
            <Field label="L3-E"><Input value={el.l3e} onChange={(e) => updateGroup('electrical', 'l3e', e.target.value)} className={inputCn} /></Field>
            <Field label="L1-L3"><Input value={el.l1l3} onChange={(e) => updateGroup('electrical', 'l1l3', e.target.value)} className={inputCn} /></Field>
            <Field label="L2-L3"><Input value={el.l2l3} onChange={(e) => updateGroup('electrical', 'l2l3', e.target.value)} className={inputCn} /></Field>
          </Grid>
        </div>
      </div>
    ),

    system: (
      <div className={stepWrapCn}>
        {/* Control parameters */}
        <div className={cardCn}>
          <SectionTitle title="Heat pump control parameters" />
          <Grid>
            <Field label="Running mode">
              <Select value={cp.runningMode || undefined} onValueChange={(v) => updateGroup('controlParameters', 'runningMode', v)}>
                <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="—" /></SelectTrigger>
                <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                  <SelectItem value="Auto">Auto</SelectItem>
                  <SelectItem value="Manual">Manual</SelectItem>
                  <SelectItem value="Eco">Eco</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field label="Heat curve setting"><Input value={cp.heatCurveSetting} onChange={(e) => updateGroup('controlParameters', 'heatCurveSetting', e.target.value)} className={inputCn} /></Field>
            <Field label="Comp start (min)"><Input value={cp.compStart} onChange={(e) => updateGroup('controlParameters', 'compStart', e.target.value)} className={inputCn} /></Field>
            <Field label="Max flow temp (°C)"><Input value={cp.maxFlowTemp} onChange={(e) => updateGroup('controlParameters', 'maxFlowTemp', e.target.value)} className={inputCn} /></Field>
            <Field label="MAX at outdoor (°C)"><Input value={cp.maxAtOutdoorTemp} onChange={(e) => updateGroup('controlParameters', 'maxAtOutdoorTemp', e.target.value)} className={inputCn} /></Field>
            <Field label="CH pump setting"><Input value={cp.chPumpSetting} onChange={(e) => updateGroup('controlParameters', 'chPumpSetting', e.target.value)} className={inputCn} /></Field>
            <Field label="Min flow temp (°C)"><Input value={cp.minFlowTemp} onChange={(e) => updateGroup('controlParameters', 'minFlowTemp', e.target.value)} className={inputCn} /></Field>
            <Field label="MIN at outdoor (°C)"><Input value={cp.minAtOutdoorTemp} onChange={(e) => updateGroup('controlParameters', 'minAtOutdoorTemp', e.target.value)} className={inputCn} /></Field>
            <Field label="Collector pump setting"><Input value={cp.collectorPumpSetting} onChange={(e) => updateGroup('controlParameters', 'collectorPumpSetting', e.target.value)} className={inputCn} /></Field>
            <Field label="DHW start (°C)"><Input value={cp.dhwStart} onChange={(e) => updateGroup('controlParameters', 'dhwStart', e.target.value)} className={inputCn} /></Field>
            <Field label="DHW stop (°C)"><Input value={cp.dhwStop} onChange={(e) => updateGroup('controlParameters', 'dhwStop', e.target.value)} className={inputCn} /></Field>
            <Field label="Heat stop temp (°C)"><Input value={cp.heatStopTemp} onChange={(e) => updateGroup('controlParameters', 'heatStopTemp', e.target.value)} className={inputCn} /></Field>
          </Grid>
          <Sub title="Legionella + auxiliary" />
          <Grid>
            <Field label="Legionella cycle temp (°C)"><Input value={cp.legionellaCycleTemp} onChange={(e) => updateGroup('controlParameters', 'legionellaCycleTemp', e.target.value)} className={inputCn} /></Field>
            <Field label="Legionella freq (days)"><Input value={cp.legionellaFreqDays} onChange={(e) => updateGroup('controlParameters', 'legionellaFreqDays', e.target.value)} className={inputCn} /></Field>
            <Field label="Legionella heat source"><Input value={cp.legionellaHeatSource} onChange={(e) => updateGroup('controlParameters', 'legionellaHeatSource', e.target.value)} className={inputCn} /></Field>
            <Field label="Auxiliary heating type"><Input value={cp.auxiliaryHeatingType} onChange={(e) => updateGroup('controlParameters', 'auxiliaryHeatingType', e.target.value)} className={inputCn} /></Field>
            <Field label="Max auxiliary power (kW)"><Input value={cp.maxAuxiliaryPower} onChange={(e) => updateGroup('controlParameters', 'maxAuxiliaryPower', e.target.value)} className={inputCn} /></Field>
            <Field label="Aux bi-valent point (°C)"><Input value={cp.auxiliaryBivalentPoint} onChange={(e) => updateGroup('controlParameters', 'auxiliaryBivalentPoint', e.target.value)} className={inputCn} /></Field>
            <Field label="Aux heat meter (kWh)"><Input value={cp.auxHeatMeterReading} onChange={(e) => updateGroup('controlParameters', 'auxHeatMeterReading', e.target.value)} className={inputCn} /></Field>
          </Grid>
        </div>

        {/* Running data */}
        <div className={cardCn}>
          <SectionTitle title="Running data" />
          <Grid tight>
            <Field label="Outdoor (°C)"><Input value={rd.outdoorTemp} onChange={(e) => updateGroup('runningData', 'outdoorTemp', e.target.value)} className={inputCn} /></Field>
            <Field label="Source in (°C)"><Input value={rd.sourceInTemp} onChange={(e) => updateGroup('runningData', 'sourceInTemp', e.target.value)} className={inputCn} /></Field>
            <Field label="Superheat (K)"><Input value={rd.superheat} onChange={(e) => updateGroup('runningData', 'superheat', e.target.value)} className={inputCn} /></Field>
            <Field label="Indoor (°C)"><Input value={rd.indoorTemp} onChange={(e) => updateGroup('runningData', 'indoorTemp', e.target.value)} className={inputCn} /></Field>
            <Field label="Source out (°C)"><Input value={rd.sourceOutTemp} onChange={(e) => updateGroup('runningData', 'sourceOutTemp', e.target.value)} className={inputCn} /></Field>
            <Field label="Subcooling (K)"><Input value={rd.subcooling} onChange={(e) => updateGroup('runningData', 'subcooling', e.target.value)} className={inputCn} /></Field>
            <Field label="Flow (°C)"><Input value={rd.flowTemp} onChange={(e) => updateGroup('runningData', 'flowTemp', e.target.value)} className={inputCn} /></Field>
            <Field label="Discharge (°C)"><Input value={rd.dischargeTemp} onChange={(e) => updateGroup('runningData', 'dischargeTemp', e.target.value)} className={inputCn} /></Field>
            <Field label="TEV inlet (°C)"><Input value={rd.tevInletTemp} onChange={(e) => updateGroup('runningData', 'tevInletTemp', e.target.value)} className={inputCn} /></Field>
            <Field label="Return (°C)"><Input value={rd.returnTemp} onChange={(e) => updateGroup('runningData', 'returnTemp', e.target.value)} className={inputCn} /></Field>
            <Field label="Suction (°C)"><Input value={rd.suctionTemp} onChange={(e) => updateGroup('runningData', 'suctionTemp', e.target.value)} className={inputCn} /></Field>
            <Field label="DHW temp (°C)"><Input value={rd.dhwTemp} onChange={(e) => updateGroup('runningData', 'dhwTemp', e.target.value)} className={inputCn} /></Field>
            <Field label="HP running hours"><Input value={rd.hpRunningHours} onChange={(e) => updateGroup('runningData', 'hpRunningHours', e.target.value)} className={inputCn} /></Field>
            <Field label="DHW running hours"><Input value={rd.dhwRunningHours} onChange={(e) => updateGroup('runningData', 'dhwRunningHours', e.target.value)} className={inputCn} /></Field>
            <Field label="Aux heater hours"><Input value={rd.auxHeaterRunningHours} onChange={(e) => updateGroup('runningData', 'auxHeaterRunningHours', e.target.value)} className={inputCn} /></Field>
            <Field label="kWh meter 1"><Input value={rd.kwhMeter1} onChange={(e) => updateGroup('runningData', 'kwhMeter1', e.target.value)} className={inputCn} /></Field>
            <Field label="kWh meter 2"><Input value={rd.kwhMeter2} onChange={(e) => updateGroup('runningData', 'kwhMeter2', e.target.value)} className={inputCn} /></Field>
            <Field label="Heat meter (MWh)"><Input value={rd.heatMeterReadingMwh} onChange={(e) => updateGroup('runningData', 'heatMeterReadingMwh', e.target.value)} className={inputCn} /></Field>
          </Grid>
        </div>

        {/* ASHP-specific */}
        {isAshp && (
          <div className={cn(cardCn, 'lg:col-span-2')}>
            <SectionTitle title="Absorber (ASHP)" />
            <Grid>
              <Field label="Antifreeze make & type"><Input value={data.ashp.antifreezeMakeType} onChange={(e) => updateGroup('ashp', 'antifreezeMakeType', e.target.value)} className={inputCn} /></Field>
              <Field label="Freeze protection (°C)"><Input value={data.ashp.freezeProtectionTemp} onChange={(e) => updateGroup('ashp', 'freezeProtectionTemp', e.target.value)} className={inputCn} /></Field>
              <Field label="Clearance around unit"><TriState value={data.ashp.clearanceAroundUnit} onChange={(v) => updateGroup('ashp', 'clearanceAroundUnit', v)} /></Field>
              <Field label="On suitable base/bracket"><TriState value={data.ashp.installedOnSuitableBase} onChange={(v) => updateGroup('ashp', 'installedOnSuitableBase', v)} /></Field>
              <Field label="Anti-vibration feet"><TriState value={data.ashp.antiVibrationFeet} onChange={(v) => updateGroup('ashp', 'antiVibrationFeet', v)} /></Field>
              <Field label="Condensate drainage OK"><TriState value={data.ashp.condensateDrainageSuitable} onChange={(v) => updateGroup('ashp', 'condensateDrainageSuitable', v)} /></Field>
              <Field label="Evaporator clear of debris"><TriState value={data.ashp.evaporatorClearOfDebris} onChange={(v) => updateGroup('ashp', 'evaporatorClearOfDebris', v)} /></Field>
              <Field label="Insulated & vapour sealed"><TriState value={data.ashp.insulatedVapourSealed} onChange={(v) => updateGroup('ashp', 'insulatedVapourSealed', v)} /></Field>
            </Grid>
            <Sub title="Split systems — refrigerant" />
            <Grid>
              <Field label="Charged by F-Gas op"><TriState value={data.ashp.splitSystemFGasCharged} onChange={(v) => updateGroup('ashp', 'splitSystemFGasCharged', v)} /></Field>
              <Field label="Refrigerant type"><Input value={data.ashp.refrigerantType} onChange={(e) => updateGroup('ashp', 'refrigerantType', e.target.value)} className={inputCn} /></Field>
              <Field label="Charge (kg)"><Input value={data.ashp.refrigerantChargeKg} onChange={(e) => updateGroup('ashp', 'refrigerantChargeKg', e.target.value)} className={inputCn} /></Field>
            </Grid>
            <Sub title="Clearances (mm)" />
            <Grid tight>
              <Field label="Back"><Input value={data.ashp.clearanceBack} onChange={(e) => updateGroup('ashp', 'clearanceBack', e.target.value)} className={inputCn} /></Field>
              <Field label="Front"><Input value={data.ashp.clearanceFront} onChange={(e) => updateGroup('ashp', 'clearanceFront', e.target.value)} className={inputCn} /></Field>
              <Field label="Right"><Input value={data.ashp.clearanceRight} onChange={(e) => updateGroup('ashp', 'clearanceRight', e.target.value)} className={inputCn} /></Field>
              <Field label="Left"><Input value={data.ashp.clearanceLeft} onChange={(e) => updateGroup('ashp', 'clearanceLeft', e.target.value)} className={inputCn} /></Field>
              <Field label="Below"><Input value={data.ashp.clearanceBelow} onChange={(e) => updateGroup('ashp', 'clearanceBelow', e.target.value)} className={inputCn} /></Field>
            </Grid>
          </div>
        )}

        {/* GSHP-specific */}
        {isGshp && (
          <div className={cn(cardCn, 'lg:col-span-2')}>
            <SectionTitle title="Collector (GSHP)" />
            <Grid>
              <Field label="Ground collector type"><Input value={data.gshp.collectorType} onChange={(e) => updateGroup('gshp', 'collectorType', e.target.value)} className={inputCn} /></Field>
              <Field label="No. loops/boreholes"><Input value={data.gshp.totalLoopsBoreholes} onChange={(e) => updateGroup('gshp', 'totalLoopsBoreholes', e.target.value)} className={inputCn} /></Field>
              <Field label="Collector length (m)"><Input value={data.gshp.totalCollectorLength} onChange={(e) => updateGroup('gshp', 'totalCollectorLength', e.target.value)} className={inputCn} /></Field>
              <Field label="Collector pipe Ø (mm)"><Input value={data.gshp.collectorPipeDiameter} onChange={(e) => updateGroup('gshp', 'collectorPipeDiameter', e.target.value)} className={inputCn} /></Field>
              <Field label="Header pipe Ø (mm)"><Input value={data.gshp.headerPipeDiameter} onChange={(e) => updateGroup('gshp', 'headerPipeDiameter', e.target.value)} className={inputCn} /></Field>
              <Field label="Header length (m)"><Input value={data.gshp.totalHeaderLength} onChange={(e) => updateGroup('gshp', 'totalHeaderLength', e.target.value)} className={inputCn} /></Field>
              <Field label="Pressure tested to BS EN 805"><TriState value={data.gshp.pressureTestedBsEn805} onChange={(v) => updateGroup('gshp', 'pressureTestedBsEn805', v)} /></Field>
              <Field label="Flushed & purged"><TriState value={data.gshp.systemFlushedPurged} onChange={(v) => updateGroup('gshp', 'systemFlushedPurged', v)} /></Field>
              <Field label="Biocide used"><TriState value={data.gshp.biocideUsed} onChange={(v) => updateGroup('gshp', 'biocideUsed', v)} /></Field>
              <Field label="Transfer fluid make & type"><Input value={data.gshp.transferFluidMakeType} onChange={(e) => updateGroup('gshp', 'transferFluidMakeType', e.target.value)} className={inputCn} /></Field>
              <Field label="Freeze protection to (°C)"><Input value={data.gshp.freezeProtectionTemp} onChange={(e) => updateGroup('gshp', 'freezeProtectionTemp', e.target.value)} className={inputCn} /></Field>
              <Field label="Expansion vessel pre-charge (bar)"><Input value={data.gshp.expansionVesselPrecharge} onChange={(e) => updateGroup('gshp', 'expansionVesselPrecharge', e.target.value)} className={inputCn} /></Field>
              <Field label="Collector pressure (bar)"><Input value={data.gshp.collectorSystemPressure} onChange={(e) => updateGroup('gshp', 'collectorSystemPressure', e.target.value)} className={inputCn} /></Field>
              <Field label="Insulation vapour sealed"><TriState value={data.gshp.insulationVapourSealed} onChange={(v) => updateGroup('gshp', 'insulationVapourSealed', v)} /></Field>
              <Field label="Installed to design"><TriState value={data.gshp.collectorInstalledToDesign} onChange={(v) => updateGroup('gshp', 'collectorInstalledToDesign', v)} /></Field>
            </Grid>
          </div>
        )}

        {/* Central heating */}
        <div className={cardCn}>
          <SectionTitle title="Central heating system" />
          <Grid>
            <Field label="Emitter types"><Input value={data.centralHeating.emitterTypes} onChange={(e) => updateGroup('centralHeating', 'emitterTypes', e.target.value)} className={inputCn} /></Field>
            <Field label="System pressure (bar)"><Input value={data.centralHeating.systemPressure} onChange={(e) => updateGroup('centralHeating', 'systemPressure', e.target.value)} className={inputCn} /></Field>
            <Field label="Heating ∆T (K)"><Input value={data.centralHeating.heatingDeltaT} onChange={(e) => updateGroup('centralHeating', 'heatingDeltaT', e.target.value)} className={inputCn} /></Field>
            <Field label="Expansion vessel pre-charge (bar)"><Input value={data.centralHeating.expansionVesselPrecharge} onChange={(e) => updateGroup('centralHeating', 'expansionVesselPrecharge', e.target.value)} className={inputCn} /></Field>
            <Field label="Safety relief valve (bar)"><Input value={data.centralHeating.safetyReliefValveSetting} onChange={(e) => updateGroup('centralHeating', 'safetyReliefValveSetting', e.target.value)} className={inputCn} /></Field>
            <Field label="Buffer store (litres)"><Input value={data.centralHeating.bufferStoreVolume} onChange={(e) => updateGroup('centralHeating', 'bufferStoreVolume', e.target.value)} className={inputCn} /></Field>
            <Field label="DHW cylinder (litres)"><Input value={data.centralHeating.dhwCylinderVolume} onChange={(e) => updateGroup('centralHeating', 'dhwCylinderVolume', e.target.value)} className={inputCn} /></Field>
            <Field label="Circulation pump setting"><Input value={data.centralHeating.circulationPumpSetting} onChange={(e) => updateGroup('centralHeating', 'circulationPumpSetting', e.target.value)} className={inputCn} /></Field>
            <Field label="Inhibitor/anti-freeze used"><TriState value={data.centralHeating.inhibitorAntifreezeUsed} onChange={(v) => updateGroup('centralHeating', 'inhibitorAntifreezeUsed', v)} /></Field>
            <Field label="Strainers/filters clear"><TriState value={data.centralHeating.strainersFiltersClear} onChange={(v) => updateGroup('centralHeating', 'strainersFiltersClear', v)} /></Field>
            <Field label="System purged of air"><TriState value={data.centralHeating.htgSystemPurgedOfAir} onChange={(v) => updateGroup('centralHeating', 'htgSystemPurgedOfAir', v)} /></Field>
            <Field label="Flushed & cleaned"><TriState value={data.centralHeating.htgSystemFlushedCleaned} onChange={(v) => updateGroup('centralHeating', 'htgSystemFlushedCleaned', v)} /></Field>
            <Field label="System cleaner used"><TriState value={data.centralHeating.htgSystemCleanerUsed} onChange={(v) => updateGroup('centralHeating', 'htgSystemCleanerUsed', v)} /></Field>
            <Field label="Water treated"><TriState value={data.centralHeating.htgSystemWaterTreated} onChange={(v) => updateGroup('centralHeating', 'htgSystemWaterTreated', v)} /></Field>
            <Field label="G3 commissioning cert"><TriState value={data.centralHeating.g3CommissioningCertCompleted} onChange={(v) => updateGroup('centralHeating', 'g3CommissioningCertCompleted', v)} /></Field>
            <Field label="Installed as per design"><TriState value={data.centralHeating.systemInstalledAsPerDesign} onChange={(v) => updateGroup('centralHeating', 'systemInstalledAsPerDesign', v)} /></Field>
            <Field label="Emitters heat evenly"><TriState value={data.centralHeating.emittersHeatEvenly} onChange={(v) => updateGroup('centralHeating', 'emittersHeatEvenly', v)} /></Field>
          </Grid>
        </div>

        {/* Controls */}
        <div className={cardCn}>
          <SectionTitle title="Heating system controls" />
          <Grid>
            <Field label="Type of HTG controls"><Input value={data.controls.htgControlsType} onChange={(e) => updateGroup('controls', 'htgControlsType', e.target.value)} className={inputCn} /></Field>
            <Field label="HP control (demand/deg-min)"><Input value={data.controls.hpControlType} onChange={(e) => updateGroup('controls', 'hpControlType', e.target.value)} className={inputCn} /></Field>
            <Field label="HTG control (HP/3rd party)"><Input value={data.controls.htgControlType} onChange={(e) => updateGroup('controls', 'htgControlType', e.target.value)} className={inputCn} /></Field>
            <Field label="DHW control (HP/3rd party)"><Input value={data.controls.dhwControlType} onChange={(e) => updateGroup('controls', 'dhwControlType', e.target.value)} className={inputCn} /></Field>
            <Field label="Controls setup per design"><TriState value={data.controls.controlsSetupPerDesign} onChange={(v) => updateGroup('controls', 'controlsSetupPerDesign', v)} /></Field>
            <Field label="Demonstrated to customer"><TriState value={data.controls.controlsDemonstratedToCustomer} onChange={(v) => updateGroup('controls', 'controlsDemonstratedToCustomer', v)} /></Field>
            <Field label="MIS 3005 docs handed over"><TriState value={data.controls.customerDocumentationProvided} onChange={(v) => updateGroup('controls', 'customerDocumentationProvided', v)} /></Field>
          </Grid>
        </div>
      </div>
    ),

    signoff: (
      <div className={stepWrapCn}>
        {/* MCS + linked certs + sign-off */}
        <div className={cn(cardCn, 'lg:col-span-2')}>
          <SectionTitle title="MCS + sign-off" />
          <Grid>
            <Field label="Installer MCS number"><Input value={data.installerMcsNumber} onChange={(e) => update('installerMcsNumber', e.target.value)} className={inputCn} /></Field>
            <Field label="Linked EIC/BS 7671 ref"><Input value={data.linkedEicRef} onChange={(e) => update('linkedEicRef', e.target.value)} className={inputCn} /></Field>
            <Field label="G3 cert ref"><Input value={data.linkedG3CertRef} onChange={(e) => update('linkedG3CertRef', e.target.value)} className={inputCn} /></Field>
            <Field label="MCS cert number"><Input value={data.mcsCertificateNumber} onChange={(e) => update('mcsCertificateNumber', e.target.value)} className={inputCn} placeholder="On MID registration" /></Field>
            <Field label="Next inspection (years)"><Input value={data.recommendedNextInspectionYears} onChange={(e) => update('recommendedNextInspectionYears', e.target.value)} className={inputCn} /></Field>
            <Field label="Engineer name"><Input value={data.engineerName} onChange={(e) => update('engineerName', e.target.value)} className={inputCn} /></Field>
            <Field label="Date"><Input type="date" value={data.signatureDate} onChange={(e) => update('signatureDate', e.target.value)} className={inputCn} /></Field>
          </Grid>
          <Field label="Technician's comments">
            <Textarea value={data.technicianComments} onChange={(e) => update('technicianComments', e.target.value)} className={textareaCn} />
          </Field>
          <SignatureInput
            label="Engineer signature"
            value={data.engineerSignature}
            onChange={(sig) => update('engineerSignature', sig || '')}
          />
          <p className="text-[12px] text-white/80 leading-relaxed">
            By signing, the engineer certifies this heat pump installation has been commissioned in
            accordance with MCS MIS 3005.
          </p>
        </div>
      </div>
    ),
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Shell header — fixed bar with progress ring + full-width step tabs */}
      <CertShellHeader
        onBack={() => navigate(-1)}
        title="Heat Pump"
        subtitle={data.jobReference ? `${data.jobReference} · MCS MIS 3005` : null}
        isSaving={isSaving}
        onManualSave={handleSave}
        progressPercent={progressPercent}
        steps={STEPS}
        currentTab={currentTab}
        onTabChange={(tab) => goToTab(tab as HeatPumpTab)}
        completedTabs={completedTabs}
      />

      <main className="-mx-3 px-4 py-4 pb-36 sm:mx-auto sm:px-4 lg:max-w-[1600px] lg:px-8">
        <div
          key={currentTab}
          className={
            isBack ? 'motion-safe:animate-mw-step-back' : 'motion-safe:animate-mw-step-in'
          }
        >
          {stepContent[currentTab]}
        </div>
      </main>

      {/* Shell footer — Back + Continue, Save on the last step */}
      <CertShellFooter
        currentIndex={currentIndex}
        totalSteps={TAB_ORDER.length}
        canPrevious={currentIndex > 0}
        canNext={currentIndex < TAB_ORDER.length - 1}
        onPrevious={() => goToTab(TAB_ORDER[Math.max(currentIndex - 1, 0)])}
        onNext={() => goToTab(TAB_ORDER[Math.min(currentIndex + 1, TAB_ORDER.length - 1)])}
        nextLabels={[
          'Continue to design',
          'Continue to electrical',
          'Continue to system',
          'Continue to sign off',
        ]}
        isLastStep={currentIndex === TAB_ORDER.length - 1}
        onGenerate={handleSave}
        canGenerate={!isSaving}
        generateLabel={
          isSaving ? 'Saving…' : existingReportId ? 'Update record' : 'Save record'
        }
      />
    </div>
  );
}
