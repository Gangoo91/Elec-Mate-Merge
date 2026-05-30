import React, { useState, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Trash2, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLocalDraft } from '@/hooks/useLocalDraft';
import { useSafetyPDFExport } from '@/hooks/useSafetyPDFExport';
import { useShowMore } from '@/hooks/useShowMore';
import { toast } from 'sonner';

import { Switch } from '@/components/ui/switch';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  PageHero,
  StatStrip,
  FilterBar,
  EmptyState,
  LoadingState,
  Eyebrow,
  Field,
  FormCard,
  ListCard,
  ListRow,
  PrimaryButton,
  SecondaryButton,
  inputClass,
  selectTriggerClass,
  selectContentClass,
  type Tone,
} from '@/components/college/primitives';
import { SafetyModuleShell, SafetyMasthead } from './common/SafetyModuleShell';
import { SignatureField } from './common/SignatureField';
import { ReadinessGate } from './common/ReadinessGate';
import { DraftRecoveryBanner } from './common/DraftRecoveryBanner';
import { DraftSaveIndicator } from './common/DraftSaveIndicator';
import { SmartTextarea } from './common/SmartTextarea';
import { LocationAutoFill } from './common/LocationAutoFill';
import { SafetyPhotoCapture } from './common/SafetyPhotoCapture';
import { SwipeableListItem } from './common/SwipeableListItem';
import { DeleteConfirmSheet } from './common/DeleteConfirmSheet';
import { LoadMoreButton } from './common/LoadMoreButton';
import { fmtCardDate } from './common/SafetyRecordCard';
import { CorrectiveActionsPanel } from './common/CorrectiveActionsPanel';
import { SaveAsTemplateSheet } from './common/SaveAsTemplateSheet';
import { LoadTemplateSheet } from './common/LoadTemplateSheet';
import { SafetyDocumentShare } from './common/SafetyDocumentShare';
import { useCOSHHAssessments, useCreateCOSHH, useDeleteCOSHH } from '@/hooks/useCOSHH';

// ─── Types ───

interface GHSHazard {
  id: string;
  label: string;
  description: string;
}

interface ExposureRoute {
  id: string;
  label: string;
  selected: boolean;
}

interface COSHHAssessment {
  id: string;
  substance_name: string;
  manufacturer: string;
  product_code: string;
  location_of_use: string;
  task_description: string;
  quantity_used: string;
  frequency_of_use: string;
  ghs_hazards: string[];
  exposure_routes: string[];
  health_effects: string;
  oel_value: string;
  control_measures: string[];
  ppe_required: string[];
  storage_requirements: string;
  spill_procedure: string;
  first_aid: string;
  disposal_method: string;
  monitoring_required: boolean;
  monitoring_details: string;
  risk_rating: 'low' | 'medium' | 'high' | 'very-high';
  assessed_by: string;
  photos: string[];
  assessment_date: string;
  review_date: string;
  created_at: string;
}

// ─── Constants ───

const GHS_HAZARDS: GHSHazard[] = [
  { id: 'flammable', label: 'Flammable', description: 'Catches fire easily' },
  { id: 'toxic', label: 'Toxic', description: 'Fatal or toxic if inhaled/swallowed' },
  { id: 'harmful', label: 'Harmful', description: 'May cause irritation or harm' },
  { id: 'corrosive', label: 'Corrosive', description: 'Causes severe burns' },
  { id: 'health-hazard', label: 'Health Hazard', description: 'Long-term health effects' },
  { id: 'environmental', label: 'Environmental', description: 'Harmful to aquatic life' },
  { id: 'oxidiser', label: 'Oxidiser', description: 'May cause or intensify fire' },
  { id: 'compressed-gas', label: 'Compressed Gas', description: 'Gas under pressure' },
];

const EXPOSURE_ROUTES_DEFAULT: ExposureRoute[] = [
  { id: 'inhalation', label: 'Inhalation', selected: false },
  { id: 'skin-contact', label: 'Skin Contact', selected: false },
  { id: 'eye-contact', label: 'Eye Contact', selected: false },
  { id: 'ingestion', label: 'Ingestion', selected: false },
];

const COMMON_SUBSTANCES = [
  {
    name: 'PVC Cement (Solvent Weld)',
    manufacturer: 'Various',
    ghs: ['flammable', 'harmful'],
    routes: ['inhalation', 'skin-contact', 'eye-contact'],
    health:
      'Eye and respiratory irritation. WEL: 50 ppm (8-hr TWA), 100 ppm (15-min STEL) for THF per EH40/2005. Prolonged exposure may cause headache, dizziness. Skin defatting.',
    controls: [
      'Use in well-ventilated area',
      'Avoid breathing vapours',
      'Keep away from ignition sources',
      'Replace cap immediately after use',
    ],
    ppe: ['Nitrile gloves', 'Safety glasses', 'Respiratory protection (if poor ventilation)'],
    storage:
      'Cool, dry, well-ventilated area away from heat sources. Keep container tightly closed.',
    spill:
      'Ventilate area. Absorb with inert material. Avoid ignition sources. Dispose as hazardous waste.',
    firstAid:
      'Eyes: Flush with water 15 min. Skin: Wash with soap and water. Inhalation: Move to fresh air. Ingestion: Do not induce vomiting, seek medical advice.',
  },
  {
    name: 'Cable Pulling Lubricant',
    manufacturer: 'Various',
    ghs: ['harmful'],
    routes: ['skin-contact', 'eye-contact'],
    health: 'Mild skin irritation with prolonged contact. Eye irritation.',
    controls: ['Avoid prolonged skin contact', 'Wash hands after use', 'Use in ventilated areas'],
    ppe: ['Nitrile gloves', 'Safety glasses'],
    storage: 'Store in original container at room temperature. Keep from freezing.',
    spill: 'Absorb with suitable material. Clean area with water. Slippery when spilt.',
    firstAid:
      'Eyes: Flush with water. Skin: Wash with soap and water. Ingestion: Drink water, seek medical advice if unwell.',
  },
  {
    name: 'Flux (Soldering)',
    manufacturer: 'Various',
    ghs: ['harmful', 'corrosive'],
    routes: ['inhalation', 'skin-contact', 'eye-contact'],
    health:
      'Fume inhalation may cause occupational asthma. WEL: 0.05 mg/m³ (8-hr TWA) for rosin-based solder fume per EH40/2005. Corrosive to skin and eyes. May cause sensitisation.',
    controls: [
      'Local exhaust ventilation at soldering point',
      'Minimise heating time',
      'Use lowest effective temperature',
      'Regular health surveillance',
    ],
    ppe: ['Nitrile gloves', 'Safety glasses', 'Fume extraction or RPE'],
    storage: 'Cool, dry area. Keep container sealed.',
    spill: 'Absorb with inert material. Avoid skin contact during cleanup.',
    firstAid:
      'Eyes: Flush 15 min, seek medical attention. Skin: Remove contaminated clothing, wash thoroughly. Inhalation: Move to fresh air, seek medical attention if breathing difficulty.',
  },
  {
    name: 'Contact Cleaner Spray',
    manufacturer: 'Various',
    ghs: ['flammable', 'harmful', 'compressed-gas'],
    routes: ['inhalation', 'skin-contact', 'eye-contact'],
    health: 'Central nervous system depression with high exposure. Skin defatting. Eye irritation.',
    controls: [
      'Use in well-ventilated area',
      'Keep away from ignition sources',
      'Do not spray on energised equipment',
      'Short bursts only',
    ],
    ppe: ['Safety glasses', 'Nitrile gloves', 'RPE if enclosed space'],
    storage: 'Below 50°C. Away from direct sunlight and heat. Pressurised container.',
    spill: 'Ventilate area. Remove ignition sources. Allow to evaporate in well-ventilated area.',
    firstAid:
      'Inhalation: Fresh air immediately. Eyes: Flush 15 min. Skin: Wash with soap and water. Seek medical attention if symptoms persist.',
  },
  {
    name: 'Fire Retardant Spray/Coating',
    manufacturer: 'Various',
    ghs: ['harmful', 'environmental'],
    routes: ['inhalation', 'skin-contact', 'eye-contact'],
    health:
      'Respiratory irritation. Skin sensitisation possible. May contain isocyanates — WEL: 0.02 mg/m³ (8-hr TWA) for MDI/HDI per EH40/2005. Health surveillance required under COSHH Reg 11.',
    controls: [
      'Adequate ventilation',
      'Avoid spray mist inhalation',
      'Apply in well-ventilated area or use RPE',
      'Health surveillance if regular use',
    ],
    ppe: ['FFP3 respirator', 'Chemical-resistant gloves', 'Safety glasses/goggles', 'Coveralls'],
    storage:
      'Cool, dry storage. Keep sealed. Check for isocyanate content and follow specific guidance.',
    spill: 'Ventilate. Absorb with suitable material. Avoid drainage systems.',
    firstAid:
      'Inhalation: Fresh air, medical attention if breathing difficulty. Skin: Wash immediately. Eyes: Flush 15 min. Ingestion: Do not induce vomiting, seek medical advice.',
  },
  {
    name: 'Resin / Compound (Cable Jointing)',
    manufacturer: 'Various',
    ghs: ['harmful', 'health-hazard'],
    routes: ['inhalation', 'skin-contact', 'eye-contact'],
    health:
      'Skin sensitisation (epoxy) — may cause allergic dermatitis. Respiratory sensitisation. Exothermic reaction during curing — burn risk. Health surveillance recommended per COSHH Reg 11 for regular users.',
    controls: [
      'Use in ventilated area',
      'Mix components as directed',
      'Avoid skin contact during mixing',
      'Allow adequate cure time',
    ],
    ppe: [
      'Chemical-resistant gloves (nitrile min.)',
      'Safety glasses',
      'RPE for mixing',
      'Barrier cream',
    ],
    storage: 'Cool, dry storage. Keep components separate until use. Check shelf life.',
    spill: 'Allow to cure if mixed. Scrape up uncured material. Avoid skin contact.',
    firstAid:
      'Skin: Remove immediately with suitable cleaner (not solvent). Eyes: Flush 15 min, seek medical attention. Inhalation: Fresh air.',
  },
  {
    name: 'Expanding Foam (PU Fire Stop)',
    manufacturer: 'Various',
    ghs: ['flammable', 'harmful', 'health-hazard'],
    routes: ['inhalation', 'skin-contact', 'eye-contact'],
    health:
      'Contains MDI (methylene diphenyl diisocyanate) — respiratory sensitiser (H334), skin sensitiser (H317). WEL: 0.02 mg/m³ (8-hr TWA) per EH40/2005. Once sensitised, even low exposures can trigger asthma. Health surveillance mandatory under COSHH Reg 11.',
    controls: [
      'Use in well-ventilated area or with RPE',
      'Minimise spray duration',
      'Allow to cure before re-entering enclosed areas',
      'Health surveillance for regular users',
    ],
    ppe: ['FFP3 respirator', 'Nitrile gloves', 'Safety glasses/goggles', 'Long sleeves'],
    storage:
      'Store upright below 50°C. Pressurised container — protect from sunlight. Check expiry date.',
    spill: 'Allow to cure fully then remove mechanically. Do not use solvents. Ventilate area.',
    firstAid:
      'Inhalation: Move to fresh air immediately, seek medical attention if breathing difficulty. Skin: Wash with soap and water (do not use solvents). Eyes: Flush 15 min. Ingestion: Do not induce vomiting, seek medical advice.',
  },
  {
    name: 'Battery Acid (Sulphuric Acid)',
    manufacturer: 'Various',
    ghs: ['corrosive'],
    routes: ['inhalation', 'skin-contact', 'eye-contact', 'ingestion'],
    health:
      'Severe burns to skin and eyes (H314). Inhalation of mist causes respiratory irritation. WEL: 0.05 mg/m³ (8-hr TWA) thoracic fraction per EH40/2005. Found in UPS systems, emergency lighting batteries, and lead-acid standby systems.',
    controls: [
      'Avoid contact with skin and eyes',
      'Use in ventilated area',
      'Keep away from metals — reacts to produce hydrogen gas',
      'Neutralising agent (sodium bicarbonate) available nearby',
    ],
    ppe: [
      'Chemical splash goggles',
      'Acid-resistant gloves',
      'Face shield',
      'Chemical-resistant apron',
    ],
    storage:
      'Store in original acid-resistant container. Upright, in bunded area. Away from metals and combustibles.',
    spill:
      'Contain with absorbent. Neutralise with sodium bicarbonate. Do NOT use water on concentrated acid — dilute slowly. Dispose as hazardous waste.',
    firstAid:
      'Skin: Flush immediately with copious water for 20 min, remove contaminated clothing. Eyes: Flush with clean water 20 min, seek emergency medical attention. Inhalation: Move to fresh air. Ingestion: Do NOT induce vomiting, drink small sips of water, seek emergency medical attention.',
  },
  {
    name: 'Asbestos-Containing Dust',
    manufacturer: 'N/A — legacy building material',
    ghs: ['health-hazard'],
    routes: ['inhalation'],
    health:
      'Causes mesothelioma, asbestosis, lung cancer (H350, H372). WEL: 0.1 fibres/cm³ (4-hr TWA) per CAR 2012. NO safe exposure level — any fibre release is hazardous. Latency period 15–60 years. Common in pre-2000 buildings: behind DBs, ceiling tiles, AIB, textured coatings, flash guards.',
    controls: [
      'DO NOT disturb — stop work immediately if ACMs encountered',
      'Only licensed contractors may remove asbestos',
      'Check asbestos register before any work in pre-2000 buildings per CAR 2012 Reg 4',
      'Asbestos awareness training mandatory for all operatives',
    ],
    ppe: [
      'RPE (FFP3 minimum) — face-fit tested',
      'Disposable coveralls (Type 5/6)',
      'Overshoes',
      'Gloves',
    ],
    storage:
      'N/A — do not collect or store. If encapsulated and undamaged, manage in situ per asbestos management plan.',
    spill:
      'DO NOT sweep or vacuum with standard equipment. Evacuate area. Engage licensed asbestos removal contractor. UKAS-accredited air testing required before area re-entry.',
    firstAid:
      'If exposure suspected: record names of all persons exposed, duration, and activity. Remove contaminated clothing carefully (dampen first). Shower. Report to occupational health. Register on medical surveillance per CAR 2012 Reg 22.',
  },
  {
    name: 'Lead Paint Dust',
    manufacturer: 'N/A — legacy building material',
    ghs: ['harmful', 'health-hazard', 'environmental'],
    routes: ['inhalation', 'ingestion', 'skin-contact'],
    health:
      'Toxic if inhaled or ingested (H332, H302). Cumulative poison — damages nervous system, kidneys, reproductive system. WEL: 0.15 mg/m³ (8-hr TWA) per EH40/2005. Common in pre-1970 properties. Disturbed during chasing, drilling, or cable routing through old paintwork.',
    controls: [
      'Wet methods to suppress dust when drilling/chasing',
      'HEPA vacuum for debris — never dry sweep',
      'Wash hands before eating, drinking, or smoking',
      'Blood lead level monitoring for regular exposure per CLAW 2002',
    ],
    ppe: ['FFP3 respirator', 'Nitrile gloves', 'Coveralls', 'Safety glasses'],
    storage: 'N/A — collect debris in sealed bags for hazardous waste disposal.',
    spill:
      'Dampen area. Collect with HEPA vacuum or damp cloth. Do NOT dry sweep. Dispose as hazardous waste.',
    firstAid:
      'Inhalation: Move to fresh air. Ingestion: Rinse mouth, drink water, seek medical advice. Skin: Wash thoroughly. If regular exposure suspected, arrange blood lead level test.',
  },
];

// One colour dimension = risk rating.
const RISK_LABEL: Record<COSHHAssessment['risk_rating'], string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  'very-high': 'Very High',
};

function riskTone(rating: COSHHAssessment['risk_rating']): Tone {
  return rating === 'very-high'
    ? 'red'
    : rating === 'high'
      ? 'orange'
      : rating === 'medium'
        ? 'amber'
        : 'green';
}

const RISK_PILL_CLASS: Record<Tone, string> = {
  red: 'bg-red-500/10 text-red-400 border-red-500/25',
  orange: 'bg-orange-500/10 text-orange-400 border-orange-500/25',
  amber: 'bg-amber-500/10 text-amber-400 border-amber-500/25',
  green: 'bg-green-500/10 text-green-400 border-green-500/25',
  blue: 'bg-blue-500/10 text-blue-400 border-blue-500/25',
  emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25',
  purple: 'bg-purple-500/10 text-purple-400 border-purple-500/25',
  yellow: 'bg-elec-yellow/10 text-elec-yellow border-elec-yellow/25',
  cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/25',
  indigo: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/25',
};

function RiskPill({ rating }: { rating: COSHHAssessment['risk_rating'] }) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-[0.12em] border whitespace-nowrap',
        RISK_PILL_CLASS[riskTone(rating)]
      )}
    >
      {RISK_LABEL[rating]}
    </span>
  );
}

// ─── Hierarchy of Controls ───

type HierarchyKey = 'elimination' | 'substitution' | 'engineering' | 'administrative' | 'ppe';

interface HierarchyLevel {
  considered: boolean;
  actions: string[];
}

type HierarchyControls = Record<HierarchyKey, HierarchyLevel>;

const HIERARCHY_LEVELS: {
  key: HierarchyKey;
  label: string;
  description: string;
}[] = [
  {
    key: 'elimination',
    label: '1. Elimination',
    description: 'Can the substance be removed entirely?',
  },
  {
    key: 'substitution',
    label: '2. Substitution',
    description: 'Can a safer alternative be used?',
  },
  {
    key: 'engineering',
    label: '3. Engineering Controls',
    description: 'LEV, enclosed systems, physical barriers',
  },
  {
    key: 'administrative',
    label: '4. Administrative Controls',
    description: 'Training, procedures, signage, rotation',
  },
  {
    key: 'ppe',
    label: '5. PPE (Last Resort)',
    description: 'Personal protective equipment',
  },
];

const EMPTY_HIERARCHY: HierarchyControls = {
  elimination: { considered: false, actions: [] },
  substitution: { considered: false, actions: [] },
  engineering: { considered: false, actions: [] },
  administrative: { considered: false, actions: [] },
  ppe: { considered: false, actions: [] },
};

function flattenHierarchy(hierarchy: HierarchyControls): string[] {
  const result: string[] = [];
  for (const level of HIERARCHY_LEVELS) {
    const h = hierarchy[level.key];
    if (h.considered && h.actions.length > 0) {
      for (const action of h.actions) {
        result.push(`[${level.label}] ${action}`);
      }
    }
  }
  return result;
}

function parseHierarchy(controls: string[]): HierarchyControls {
  const hierarchy: HierarchyControls = JSON.parse(JSON.stringify(EMPTY_HIERARCHY));
  for (const control of controls) {
    let matched = false;
    for (const level of HIERARCHY_LEVELS) {
      const prefix = `[${level.label}] `;
      if (control.startsWith(prefix)) {
        hierarchy[level.key].considered = true;
        hierarchy[level.key].actions.push(control.slice(prefix.length));
        matched = true;
        break;
      }
    }
    if (!matched) {
      // Legacy controls without prefix go to administrative
      hierarchy.administrative.considered = true;
      hierarchy.administrative.actions.push(control);
    }
  }
  return hierarchy;
}

function isOverdue(reviewDate: string): boolean {
  if (!reviewDate) return false;
  return reviewDate < new Date().toISOString().split('T')[0];
}

// ─── Main Component ───

export function COSHHAssessmentBuilder({ onBack }: { onBack: () => void }) {
  const { data: dbAssessments, isLoading } = useCOSHHAssessments();
  const createCOSHH = useCreateCOSHH();
  const deleteCOSHH = useDeleteCOSHH();
  const { exportPDF, isExporting, exportingId } = useSafetyPDFExport();

  const [showShare, setShowShare] = useState(false);

  const assessments: COSHHAssessment[] = (dbAssessments || []).map((a) => ({
    id: a.id,
    substance_name: a.substance_name,
    manufacturer: a.manufacturer || '',
    product_code: a.product_code || '',
    location_of_use: a.location_of_use || '',
    task_description: a.task_description || '',
    quantity_used: a.quantity_used || '',
    frequency_of_use: a.frequency_of_use || '',
    ghs_hazards: a.ghs_hazards || [],
    exposure_routes: a.exposure_routes || [],
    health_effects: a.health_effects || '',
    oel_value: a.oel_value || '',
    control_measures: a.control_measures || [],
    ppe_required: a.ppe_required || [],
    storage_requirements: a.storage_requirements || '',
    spill_procedure: a.spill_procedure || '',
    first_aid: a.first_aid || '',
    disposal_method: a.disposal_method || '',
    monitoring_required: a.monitoring_required,
    monitoring_details: a.monitoring_details || '',
    risk_rating: a.risk_rating as COSHHAssessment['risk_rating'],
    assessed_by: a.assessed_by,
    photos: ((a as Record<string, unknown>).photos as string[]) || [],
    assessment_date: a.assessment_date,
    review_date: a.review_date,
    created_at: a.created_at,
  }));

  const [showWizard, setShowWizard] = useState(false);
  const [showSubstanceSheet, setShowSubstanceSheet] = useState(false);
  const [viewingAssessment, setViewingAssessment] = useState<COSHHAssessment | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [substanceSearch, setSubstanceSearch] = useState('');
  const [riskFilter, setRiskFilter] = useState('all');
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Form state
  const [substanceName, setSubstanceName] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [productCode, setProductCode] = useState('');
  const [locationOfUse, setLocationOfUse] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [quantityUsed, setQuantityUsed] = useState('');
  const [frequencyOfUse, setFrequencyOfUse] = useState('');
  const [selectedGHS, setSelectedGHS] = useState<string[]>([]);
  const [exposureRoutes, setExposureRoutes] = useState<ExposureRoute[]>([
    ...EXPOSURE_ROUTES_DEFAULT,
  ]);
  const [healthEffects, setHealthEffects] = useState('');
  const [oelValue, setOelValue] = useState('');
  const [controlMeasures, setControlMeasures] = useState<string[]>([]);
  const [hierarchyControls, setHierarchyControls] = useState<HierarchyControls>(
    JSON.parse(JSON.stringify(EMPTY_HIERARCHY))
  );
  const [hierarchyInputs, setHierarchyInputs] = useState<Record<HierarchyKey, string>>({
    elimination: '',
    substitution: '',
    engineering: '',
    administrative: '',
    ppe: '',
  });
  const [sdsReference, setSdsReference] = useState('');
  const [ppeRequired, setPpeRequired] = useState<string[]>([]);
  const [newPPE, setNewPPE] = useState('');
  const [storageRequirements, setStorageRequirements] = useState('');
  const [spillProcedure, setSpillProcedure] = useState('');
  const [firstAid, setFirstAid] = useState('');
  const [disposalMethod, setDisposalMethod] = useState('');
  const [monitoringRequired, setMonitoringRequired] = useState(false);
  const [monitoringDetails, setMonitoringDetails] = useState('');
  const [riskRating, setRiskRating] = useState<'low' | 'medium' | 'high' | 'very-high'>('medium');
  const [assessedBy, setAssessedBy] = useState('');
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);

  // Signature state
  const [assessorSigName, setAssessorSigName] = useState('');
  const [assessorSigDataUrl, setAssessorSigDataUrl] = useState('');
  const [reviewerSigName, setReviewerSigName] = useState('');
  const [reviewerSigDataUrl, setReviewerSigDataUrl] = useState('');

  // ─── Template state ───
  const [showSaveTemplate, setShowSaveTemplate] = useState(false);
  const [showLoadTemplate, setShowLoadTemplate] = useState(false);

  const getTemplateData = () => ({
    substanceName,
    manufacturer,
    productCode,
    locationOfUse,
    taskDescription,
    quantityUsed,
    frequencyOfUse,
    selectedGHS,
    healthEffects,
    oelValue,
    controlMeasures,
    ppeRequired,
    storageRequirements,
    spillProcedure,
    firstAid,
    disposalMethod,
    monitoringRequired,
    monitoringDetails,
    riskRating,
  });

  const handleLoadTemplate = (data: Record<string, unknown>) => {
    if (data.substanceName) setSubstanceName(data.substanceName as string);
    if (data.manufacturer) setManufacturer(data.manufacturer as string);
    if (data.productCode) setProductCode(data.productCode as string);
    if (data.locationOfUse) setLocationOfUse(data.locationOfUse as string);
    if (data.taskDescription) setTaskDescription(data.taskDescription as string);
    if (data.quantityUsed) setQuantityUsed(data.quantityUsed as string);
    if (data.frequencyOfUse) setFrequencyOfUse(data.frequencyOfUse as string);
    if (data.selectedGHS) setSelectedGHS(data.selectedGHS as string[]);
    if (data.healthEffects) setHealthEffects(data.healthEffects as string);
    if (data.oelValue) setOelValue(data.oelValue as string);
    if (data.controlMeasures) {
      setControlMeasures(data.controlMeasures as string[]);
      setHierarchyControls(parseHierarchy(data.controlMeasures as string[]));
    }
    if (data.ppeRequired) setPpeRequired(data.ppeRequired as string[]);
    if (data.storageRequirements) setStorageRequirements(data.storageRequirements as string);
    if (data.spillProcedure) setSpillProcedure(data.spillProcedure as string);
    if (data.firstAid) setFirstAid(data.firstAid as string);
    if (data.disposalMethod) setDisposalMethod(data.disposalMethod as string);
    if (data.monitoringRequired !== undefined)
      setMonitoringRequired(data.monitoringRequired as boolean);
    if (data.monitoringDetails) setMonitoringDetails(data.monitoringDetails as string);
    if (data.riskRating) setRiskRating(data.riskRating as 'low' | 'medium' | 'high' | 'very-high');
  };

  // ─── Draft persistence ───
  const coshhDraftData = useMemo(
    () => ({
      substanceName,
      manufacturer,
      productCode,
      locationOfUse,
      taskDescription,
      quantityUsed,
      frequencyOfUse,
      selectedGHS,
      exposureRoutes,
      healthEffects,
      oelValue,
      controlMeasures,
      hierarchyControls,
      sdsReference,
      ppeRequired,
      storageRequirements,
      spillProcedure,
      firstAid,
      disposalMethod,
      monitoringRequired,
      monitoringDetails,
      riskRating,
      assessedBy,
    }),
    [
      substanceName,
      manufacturer,
      productCode,
      locationOfUse,
      taskDescription,
      quantityUsed,
      frequencyOfUse,
      selectedGHS,
      exposureRoutes,
      healthEffects,
      oelValue,
      controlMeasures,
      hierarchyControls,
      sdsReference,
      ppeRequired,
      storageRequirements,
      spillProcedure,
      firstAid,
      disposalMethod,
      monitoringRequired,
      monitoringDetails,
      riskRating,
      assessedBy,
    ]
  );

  const {
    status: draftStatus,
    recoveredData: recoveredDraft,
    clearDraft,
    dismissRecovery: dismissDraft,
  } = useLocalDraft({
    key: 'coshh-assessment',
    data: coshhDraftData,
    enabled: showWizard,
  });

  const restoreDraft = () => {
    if (!recoveredDraft) return;
    if (recoveredDraft.substanceName !== undefined) setSubstanceName(recoveredDraft.substanceName);
    if (recoveredDraft.manufacturer !== undefined) setManufacturer(recoveredDraft.manufacturer);
    if (recoveredDraft.productCode !== undefined) setProductCode(recoveredDraft.productCode);
    if (recoveredDraft.locationOfUse !== undefined) setLocationOfUse(recoveredDraft.locationOfUse);
    if (recoveredDraft.taskDescription !== undefined)
      setTaskDescription(recoveredDraft.taskDescription);
    if (recoveredDraft.quantityUsed !== undefined) setQuantityUsed(recoveredDraft.quantityUsed);
    if (recoveredDraft.frequencyOfUse !== undefined)
      setFrequencyOfUse(recoveredDraft.frequencyOfUse);
    if (recoveredDraft.selectedGHS !== undefined) setSelectedGHS(recoveredDraft.selectedGHS);
    if (recoveredDraft.exposureRoutes !== undefined)
      setExposureRoutes(recoveredDraft.exposureRoutes);
    if (recoveredDraft.healthEffects !== undefined) setHealthEffects(recoveredDraft.healthEffects);
    if (recoveredDraft.oelValue !== undefined) setOelValue(recoveredDraft.oelValue);
    if (recoveredDraft.controlMeasures !== undefined)
      setControlMeasures(recoveredDraft.controlMeasures);
    if (recoveredDraft.hierarchyControls !== undefined)
      setHierarchyControls(recoveredDraft.hierarchyControls);
    if (recoveredDraft.sdsReference !== undefined) setSdsReference(recoveredDraft.sdsReference);
    if (recoveredDraft.ppeRequired !== undefined) setPpeRequired(recoveredDraft.ppeRequired);
    if (recoveredDraft.storageRequirements !== undefined)
      setStorageRequirements(recoveredDraft.storageRequirements);
    if (recoveredDraft.spillProcedure !== undefined)
      setSpillProcedure(recoveredDraft.spillProcedure);
    if (recoveredDraft.firstAid !== undefined) setFirstAid(recoveredDraft.firstAid);
    if (recoveredDraft.disposalMethod !== undefined)
      setDisposalMethod(recoveredDraft.disposalMethod);
    if (recoveredDraft.monitoringRequired !== undefined)
      setMonitoringRequired(recoveredDraft.monitoringRequired);
    if (recoveredDraft.monitoringDetails !== undefined)
      setMonitoringDetails(recoveredDraft.monitoringDetails);
    if (recoveredDraft.riskRating !== undefined) setRiskRating(recoveredDraft.riskRating);
    if (recoveredDraft.assessedBy !== undefined) setAssessedBy(recoveredDraft.assessedBy);
    dismissDraft();
  };

  const resetWizard = () => {
    setSubstanceName('');
    setManufacturer('');
    setProductCode('');
    setLocationOfUse('');
    setTaskDescription('');
    setQuantityUsed('');
    setFrequencyOfUse('');
    setSelectedGHS([]);
    setExposureRoutes([...EXPOSURE_ROUTES_DEFAULT]);
    setHealthEffects('');
    setOelValue('');
    setControlMeasures([]);
    setHierarchyControls(JSON.parse(JSON.stringify(EMPTY_HIERARCHY)));
    setHierarchyInputs({
      elimination: '',
      substitution: '',
      engineering: '',
      administrative: '',
      ppe: '',
    });
    setSdsReference('');
    setPpeRequired([]);
    setNewPPE('');
    setStorageRequirements('');
    setSpillProcedure('');
    setFirstAid('');
    setDisposalMethod('');
    setMonitoringRequired(false);
    setMonitoringDetails('');
    setRiskRating('medium');
    setAssessedBy('');
    setPhotoUrls([]);
    setAssessorSigName('');
    setAssessorSigDataUrl('');
    setReviewerSigName('');
    setReviewerSigDataUrl('');
  };

  const openNew = () => {
    resetWizard();
    setShowWizard(true);
  };

  const closeWizard = () => {
    resetWizard();
    setShowWizard(false);
  };

  const handleDuplicate = (assessment: COSHHAssessment) => {
    setSubstanceName(assessment.substance_name);
    setManufacturer(assessment.manufacturer);
    setProductCode(assessment.product_code);
    setLocationOfUse(assessment.location_of_use);
    setTaskDescription(assessment.task_description);
    setQuantityUsed(assessment.quantity_used);
    setFrequencyOfUse(assessment.frequency_of_use);
    setSelectedGHS([...assessment.ghs_hazards]);
    setExposureRoutes(
      EXPOSURE_ROUTES_DEFAULT.map((r) => ({
        ...r,
        selected: assessment.exposure_routes.includes(r.id),
      }))
    );
    setHealthEffects(assessment.health_effects);
    setOelValue(assessment.oel_value);
    setControlMeasures([...assessment.control_measures]);
    setHierarchyControls(parseHierarchy(assessment.control_measures));
    setPpeRequired([...assessment.ppe_required]);
    setStorageRequirements(assessment.storage_requirements);
    setSpillProcedure(assessment.spill_procedure);
    setFirstAid(assessment.first_aid);
    setDisposalMethod(assessment.disposal_method);
    setMonitoringRequired(assessment.monitoring_required);
    setMonitoringDetails(assessment.monitoring_details);
    setRiskRating(assessment.risk_rating);
    // Clear assessed_by and signatures — fresh draft
    setSdsReference('');
    setPhotoUrls([]);
    setAssessedBy('');
    setAssessorSigName('');
    setAssessorSigDataUrl('');
    setReviewerSigName('');
    setReviewerSigDataUrl('');
    setViewingAssessment(null);
    setShowWizard(true);
    toast.success('Assessment duplicated — review and save as new');
  };

  const loadSubstance = (substance: (typeof COMMON_SUBSTANCES)[0]) => {
    setSubstanceName(substance.name);
    setManufacturer(substance.manufacturer);
    setSelectedGHS(substance.ghs);
    setExposureRoutes(
      EXPOSURE_ROUTES_DEFAULT.map((r) => ({
        ...r,
        selected: substance.routes.includes(r.id),
      }))
    );
    setHealthEffects(substance.health);
    setControlMeasures(substance.controls);
    // Map common substance controls into administrative level by default
    const substanceHierarchy: HierarchyControls = JSON.parse(JSON.stringify(EMPTY_HIERARCHY));
    substanceHierarchy.administrative = {
      considered: true,
      actions: [...substance.controls],
    };
    substanceHierarchy.ppe = {
      considered: true,
      actions: [...substance.ppe],
    };
    setHierarchyControls(substanceHierarchy);
    setPpeRequired(substance.ppe);
    setStorageRequirements(substance.storage);
    setSpillProcedure(substance.spill);
    setFirstAid(substance.firstAid);
    setShowSubstanceSheet(false);
  };

  const saveAssessment = async () => {
    const now = new Date();
    const reviewDate = new Date(now);
    reviewDate.setFullYear(reviewDate.getFullYear() + 1);

    try {
      await createCOSHH.mutateAsync({
        substance_name: substanceName,
        manufacturer: manufacturer || null,
        product_code: productCode || null,
        location_of_use: locationOfUse || null,
        task_description: taskDescription || null,
        quantity_used: quantityUsed || null,
        frequency_of_use: frequencyOfUse || null,
        ghs_hazards: selectedGHS,
        exposure_routes: exposureRoutes.filter((r) => r.selected).map((r) => r.id),
        health_effects: healthEffects || null,
        oel_value: oelValue || null,
        control_measures: flattenHierarchy(hierarchyControls),
        ppe_required: ppeRequired,
        storage_requirements: storageRequirements || null,
        spill_procedure: spillProcedure || null,
        first_aid: firstAid || null,
        disposal_method: disposalMethod || null,
        monitoring_required: monitoringRequired,
        monitoring_details: monitoringDetails || null,
        risk_rating: riskRating,
        assessed_by: assessedBy,
        photos: photoUrls,
        assessor_signature: assessorSigDataUrl || null,
        reviewer_signature: reviewerSigDataUrl || null,
        reviewer_name: reviewerSigName || null,
        assessment_date: now.toISOString().split('T')[0],
        review_date: reviewDate.toISOString().split('T')[0],
      });
      clearDraft();
      closeWizard();
    } catch {
      // Error toast handled by hook
    }
  };

  const toggleGHS = (id: string) => {
    setSelectedGHS((prev) => (prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]));
  };

  const toggleExposureRoute = (id: string) => {
    setExposureRoutes((prev) =>
      prev.map((r) => (r.id === id ? { ...r, selected: !r.selected } : r))
    );
  };

  const addHierarchyAction = (level: HierarchyKey) => {
    const input = hierarchyInputs[level].trim();
    if (!input) return;
    setHierarchyControls((prev) => ({
      ...prev,
      [level]: {
        considered: true,
        actions: [...prev[level].actions, input],
      },
    }));
    setHierarchyInputs((prev) => ({ ...prev, [level]: '' }));
  };

  const removeHierarchyAction = (level: HierarchyKey, index: number) => {
    setHierarchyControls((prev) => ({
      ...prev,
      [level]: {
        ...prev[level],
        actions: prev[level].actions.filter((_, i) => i !== index),
      },
    }));
  };

  const toggleHierarchyConsidered = (level: HierarchyKey) => {
    setHierarchyControls((prev) => ({
      ...prev,
      [level]: {
        ...prev[level],
        considered: !prev[level].considered,
      },
    }));
  };

  const addPPE = () => {
    if (newPPE.trim()) {
      setPpeRequired((prev) => [...prev, newPPE.trim()]);
      setNewPPE('');
    }
  };

  const filteredSubstances = COMMON_SUBSTANCES.filter((s) =>
    s.name.toLowerCase().includes(substanceSearch.toLowerCase())
  );

  // Total controls captured across the hierarchy (used for readiness).
  const hierarchyActionCount = HIERARCHY_LEVELS.reduce(
    (n, level) => n + hierarchyControls[level.key].actions.length,
    0
  );

  // ─── Readiness gate ───
  const readiness = [
    { ok: substanceName.trim().length > 0, label: 'Substance named' },
    { ok: selectedGHS.length > 0, label: 'At least one GHS hazard' },
    { ok: hierarchyActionCount > 0 || ppeRequired.length > 0, label: 'At least one control measure' },
    { ok: firstAid.trim().length > 0, label: 'First aid measures recorded' },
    { ok: assessedBy.trim().length > 0 && assessorSigDataUrl.length > 0, label: 'Assessed by + signed' },
  ];
  const formReady = readiness.every((r) => r.ok);

  const handleDelete = async (id: string) => {
    try {
      await deleteCOSHH.mutateAsync(id);
    } catch {
      // Error toast handled by hook
    }
  };

  // ─── List metrics + filters ───
  const filteredAssessments = useMemo(() => {
    return assessments.filter((a) => {
      const matchesSearch =
        !searchQuery ||
        a.substance_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.manufacturer?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.location_of_use?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRisk = riskFilter === 'all' || a.risk_rating === riskFilter;
      return matchesSearch && matchesRisk;
    });
  }, [assessments, searchQuery, riskFilter]);

  // Overdue reviews sort to the top.
  const sortedAssessments = useMemo(() => {
    return [...filteredAssessments].sort((a, b) => {
      const aOverdue = isOverdue(a.review_date);
      const bOverdue = isOverdue(b.review_date);
      if (aOverdue !== bOverdue) return aOverdue ? -1 : 1;
      return (b.created_at || '').localeCompare(a.created_at || '');
    });
  }, [filteredAssessments]);

  const {
    visible: visibleAssessments,
    hasMore: hasMoreAssessments,
    remaining: remainingAssessments,
    loadMore: loadMoreAssessments,
  } = useShowMore(sortedAssessments);

  const total = assessments.length;
  const overdueCount = assessments.filter((a) => isOverdue(a.review_date)).length;
  const highRiskCount = assessments.filter(
    (a) => a.risk_rating === 'high' || a.risk_rating === 'very-high'
  ).length;
  const monitoringCount = assessments.filter((a) => a.monitoring_required).length;

  const riskFilterTabs = useMemo(
    () => [
      { value: 'all', label: 'All', count: assessments.length },
      { value: 'low', label: 'Low', count: assessments.filter((a) => a.risk_rating === 'low').length },
      {
        value: 'medium',
        label: 'Medium',
        count: assessments.filter((a) => a.risk_rating === 'medium').length,
      },
      {
        value: 'high',
        label: 'High',
        count: assessments.filter((a) => a.risk_rating === 'high').length,
      },
      {
        value: 'very-high',
        label: 'V. High',
        count: assessments.filter((a) => a.risk_rating === 'very-high').length,
      },
    ],
    [assessments]
  );

  // ─── Form ───
  if (showWizard) {
    return (
      <div className="bg-elec-dark min-h-screen pb-28">
        <SafetyMasthead
          onBack={closeWizard}
          backLabel="Assessments"
          moduleName="New COSHH assessment"
          trailing={<DraftSaveIndicator status={draftStatus} />}
        />
        <div className="mx-auto max-w-3xl px-4 py-4 space-y-4">
          <AnimatePresence>
            {recoveredDraft && (
              <DraftRecoveryBanner onRestore={restoreDraft} onDismiss={dismissDraft} />
            )}
          </AnimatePresence>

          {/* Quick start */}
          <div>
            <Eyebrow className="mb-2">Quick start</Eyebrow>
            <div className="grid grid-cols-2 gap-2">
              <SecondaryButton fullWidth onClick={() => setShowSubstanceSheet(true)}>
                Load substance
              </SecondaryButton>
              <SecondaryButton fullWidth onClick={() => setShowLoadTemplate(true)}>
                Load template
              </SecondaryButton>
            </div>
          </div>

          {/* Substance details */}
          <FormCard eyebrow="Substance details">
            <Field label="Substance name" required>
              <input
                value={substanceName}
                onChange={(e) => setSubstanceName(e.target.value)}
                className={inputClass}
                placeholder="e.g. PVC Solvent Cement"
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Manufacturer">
                <input
                  value={manufacturer}
                  onChange={(e) => setManufacturer(e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label="Product code">
                <input
                  value={productCode}
                  onChange={(e) => setProductCode(e.target.value)}
                  className={inputClass}
                />
              </Field>
            </div>
            <LocationAutoFill
              value={locationOfUse}
              onChange={(v) => setLocationOfUse(v)}
              label="Location of use"
              placeholder="e.g. Plant room, riser, site-wide"
            />
            <Field label="Task / how used">
              <SmartTextarea
                value={taskDescription}
                onChange={setTaskDescription}
                className="min-h-[80px] text-[13px] resize-none bg-[hsl(0_0%_9%)] border-white/[0.08] focus:border-elec-yellow/60 rounded-xl"
                placeholder="Describe how the substance is used…"
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Quantity used">
                <input
                  value={quantityUsed}
                  onChange={(e) => setQuantityUsed(e.target.value)}
                  className={inputClass}
                  placeholder="e.g. 500ml"
                />
              </Field>
              <Field label="Frequency">
                <Select value={frequencyOfUse} onValueChange={setFrequencyOfUse}>
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder="Select…" />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="occasional">Occasional</SelectItem>
                    <SelectItem value="one-off">One-off</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </div>
            <Field
              label="Safety Data Sheet (SDS) reference"
              hint="Reference number or location of the Safety Data Sheet for this substance"
            >
              <input
                value={sdsReference}
                onChange={(e) => setSdsReference(e.target.value)}
                className={inputClass}
                placeholder="e.g. SDS-2024-001 or manufacturer reference"
              />
            </Field>
          </FormCard>

          {/* Hazard classification */}
          <FormCard eyebrow="Hazard classification">
            <Field label="GHS hazard pictograms" required>
              <div className="grid grid-cols-2 gap-2">
                {GHS_HAZARDS.map((hazard) => {
                  const isSelected = selectedGHS.includes(hazard.id);
                  return (
                    <button
                      key={hazard.id}
                      type="button"
                      onClick={() => toggleGHS(hazard.id)}
                      className={cn(
                        'p-3 rounded-xl border text-left touch-manipulation transition-all active:scale-[0.98]',
                        isSelected
                          ? 'border-red-500/40 bg-red-500/10'
                          : 'border-white/[0.08] bg-[hsl(0_0%_10%)]'
                      )}
                    >
                      <span
                        className={cn(
                          'text-[13px] font-medium block',
                          isSelected ? 'text-red-300' : 'text-white'
                        )}
                      >
                        {hazard.label}
                      </span>
                      <span className="text-[11px] text-white/55">{hazard.description}</span>
                    </button>
                  );
                })}
              </div>
            </Field>

            <Field label="Exposure routes">
              <div className="grid grid-cols-2 gap-2">
                {exposureRoutes.map((route) => (
                  <button
                    key={route.id}
                    type="button"
                    onClick={() => toggleExposureRoute(route.id)}
                    className={cn(
                      'h-11 px-3 rounded-xl border text-[13px] font-medium touch-manipulation transition-all active:scale-[0.98]',
                      route.selected
                        ? 'border-amber-500/40 bg-amber-500/10 text-amber-300'
                        : 'border-white/[0.08] bg-[hsl(0_0%_10%)] text-white'
                    )}
                  >
                    {route.label}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Health effects">
              <SmartTextarea
                value={healthEffects}
                onChange={setHealthEffects}
                className="min-h-[100px] text-[13px] resize-none bg-[hsl(0_0%_9%)] border-white/[0.08] focus:border-elec-yellow/60 rounded-xl"
                placeholder="Describe potential health effects…"
              />
            </Field>

            <Field label="Occupational Exposure Limit (OEL)">
              <input
                value={oelValue}
                onChange={(e) => setOelValue(e.target.value)}
                className={inputClass}
                placeholder="e.g. TWA 50 ppm, STEL 100 ppm"
              />
            </Field>
          </FormCard>

          {/* Hierarchy of controls */}
          <FormCard eyebrow="Hierarchy of controls">
            <p className="text-[12px] text-white/55">
              Work through each level — eliminate or substitute first, then engineer controls, before
              relying on administrative measures or PPE.
            </p>

            {HIERARCHY_LEVELS.map((level) => {
              const h = hierarchyControls[level.key];
              return (
                <div
                  key={level.key}
                  className={cn(
                    'rounded-xl border overflow-hidden',
                    h.considered
                      ? 'border-elec-yellow/30 bg-elec-yellow/[0.04]'
                      : 'border-white/[0.08] bg-[hsl(0_0%_10%)]'
                  )}
                >
                  <button
                    type="button"
                    onClick={() => toggleHierarchyConsidered(level.key)}
                    className="w-full flex items-center gap-3 p-3 touch-manipulation active:bg-white/[0.05] transition-all text-left"
                  >
                    <div className="flex-1">
                      <p
                        className={cn(
                          'text-[13px] font-semibold',
                          h.considered ? 'text-elec-yellow' : 'text-white'
                        )}
                      >
                        {level.label}
                      </p>
                      <p className="text-[11px] text-white/55">{level.description}</p>
                    </div>
                    {h.actions.length > 0 && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border border-elec-yellow/25 text-elec-yellow tabular-nums">
                        {h.actions.length}
                      </span>
                    )}
                    <span
                      className={cn(
                        'text-white/40 text-[13px] transition-transform duration-200',
                        h.considered && 'rotate-180'
                      )}
                      aria-hidden
                    >
                      ⌄
                    </span>
                  </button>
                  {h.considered && (
                    <div className="px-3 pb-3 space-y-1.5">
                      {h.actions.map((action, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 p-2 rounded-lg border border-white/[0.08] bg-[hsl(0_0%_9%)]"
                        >
                          <span className="text-[13px] text-white flex-1">{action}</span>
                          <button
                            type="button"
                            onClick={() => removeHierarchyAction(level.key, i)}
                            className="h-9 w-9 rounded-lg bg-white/[0.06] flex items-center justify-center touch-manipulation active:bg-white/[0.12] shrink-0"
                            aria-label="Remove control"
                          >
                            <Trash2 className="h-3.5 w-3.5 text-white/60" />
                          </button>
                        </div>
                      ))}
                      <div className="flex gap-2">
                        <input
                          value={hierarchyInputs[level.key]}
                          onChange={(e) =>
                            setHierarchyInputs((prev) => ({
                              ...prev,
                              [level.key]: e.target.value,
                            }))
                          }
                          onKeyDown={(e) => e.key === 'Enter' && addHierarchyAction(level.key)}
                          className={cn(inputClass, 'flex-1')}
                          placeholder={`Add ${level.key === 'ppe' ? 'PPE' : level.key} control…`}
                        />
                        <SecondaryButton onClick={() => addHierarchyAction(level.key)}>
                          Add
                        </SecondaryButton>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            <Field label="Specific PPE required">
              {ppeRequired.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {ppeRequired.map((item, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setPpeRequired((prev) => prev.filter((_, idx) => idx !== i))}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium border border-cyan-500/25 bg-cyan-500/10 text-cyan-300 touch-manipulation active:bg-red-500/15"
                    >
                      {item}
                      <span aria-hidden className="text-cyan-300/60">
                        ×
                      </span>
                    </button>
                  ))}
                </div>
              )}
              <div className="flex gap-2">
                <input
                  value={newPPE}
                  onChange={(e) => setNewPPE(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addPPE()}
                  className={cn(inputClass, 'flex-1')}
                  placeholder="Add PPE item…"
                />
                <SecondaryButton onClick={addPPE}>Add</SecondaryButton>
              </div>
            </Field>

            <Field label="Risk rating (with controls)">
              <div className="grid grid-cols-4 gap-2">
                {(['low', 'medium', 'high', 'very-high'] as const).map((level) => {
                  const selected = riskRating === level;
                  return (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setRiskRating(level)}
                      className={cn(
                        'h-11 rounded-xl border text-[12px] font-medium text-center touch-manipulation transition-all active:scale-[0.98]',
                        selected
                          ? RISK_PILL_CLASS[riskTone(level)]
                          : 'border-white/[0.08] bg-[hsl(0_0%_10%)] text-white'
                      )}
                    >
                      {RISK_LABEL[level]}
                    </button>
                  );
                })}
              </div>
            </Field>

            <SafetyPhotoCapture
              photos={photoUrls}
              onPhotosChange={setPhotoUrls}
              label="Substance / storage photos"
            />
          </FormCard>

          {/* Emergency & storage */}
          <FormCard eyebrow="Emergency & storage">
            <Field label="Storage requirements">
              <SmartTextarea
                value={storageRequirements}
                onChange={setStorageRequirements}
                className="min-h-[80px] text-[13px] resize-none bg-[hsl(0_0%_9%)] border-white/[0.08] focus:border-elec-yellow/60 rounded-xl"
                placeholder="Storage conditions and requirements…"
              />
            </Field>
            <Field label="Spill procedure">
              <SmartTextarea
                value={spillProcedure}
                onChange={setSpillProcedure}
                className="min-h-[80px] text-[13px] resize-none bg-[hsl(0_0%_9%)] border-white/[0.08] focus:border-elec-yellow/60 rounded-xl"
                placeholder="Steps to take in event of spillage…"
              />
            </Field>
            <Field label="First aid measures">
              <SmartTextarea
                value={firstAid}
                onChange={setFirstAid}
                className="min-h-[100px] text-[13px] resize-none bg-[hsl(0_0%_9%)] border-white/[0.08] focus:border-elec-yellow/60 rounded-xl"
                placeholder="First aid measures by exposure route…"
              />
            </Field>
            <Field label="Disposal method">
              <input
                value={disposalMethod}
                onChange={(e) => setDisposalMethod(e.target.value)}
                className={inputClass}
                placeholder="e.g. Dispose as hazardous waste via licensed contractor"
              />
            </Field>
            <div className="flex items-center justify-between">
              <span className="text-[12.5px] text-white/80">Exposure monitoring required?</span>
              <Switch checked={monitoringRequired} onCheckedChange={setMonitoringRequired} />
            </div>
            {monitoringRequired && (
              <Field label="Monitoring details">
                <input
                  value={monitoringDetails}
                  onChange={(e) => setMonitoringDetails(e.target.value)}
                  className={inputClass}
                  placeholder="e.g. Personal air sampling quarterly"
                />
              </Field>
            )}
          </FormCard>

          {/* Review & sign-off */}
          <FormCard eyebrow="Review & sign-off">
            <Field label="Assessed by" required>
              <input
                value={assessedBy}
                onChange={(e) => setAssessedBy(e.target.value)}
                className={inputClass}
                placeholder="Your full name"
              />
            </Field>
            <Field label="Assessor name (for signature record)">
              <input
                value={assessorSigName}
                onChange={(e) => setAssessorSigName(e.target.value)}
                className={inputClass}
                placeholder="Name on the signature"
              />
            </Field>
            <SignatureField
              label="Assessor signature"
              value={assessorSigDataUrl}
              onChange={setAssessorSigDataUrl}
            />
            <Field label="Reviewer name (optional)">
              <input
                value={reviewerSigName}
                onChange={(e) => setReviewerSigName(e.target.value)}
                className={inputClass}
                placeholder="Reviewer name"
              />
            </Field>
            <SignatureField
              label="Reviewer signature (optional)"
              value={reviewerSigDataUrl}
              onChange={setReviewerSigDataUrl}
            />
            <p className="text-[11px] text-white/45">
              Review date is automatically set to 12 months from today on save.
            </p>
          </FormCard>

          <ReadinessGate items={readiness} title="Ready to save?" />
        </div>

        {/* Sticky save */}
        <div
          className="fixed bottom-0 inset-x-0 bg-elec-dark/95 backdrop-blur-sm border-t border-white/[0.06] px-4 py-3 space-y-2"
          style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
        >
          <div className="mx-auto max-w-3xl space-y-2">
            <PrimaryButton
              fullWidth
              size="lg"
              disabled={!formReady || createCOSHH.isPending}
              onClick={saveAssessment}
            >
              {createCOSHH.isPending ? 'Saving…' : 'Save assessment'}
            </PrimaryButton>
            <button
              type="button"
              onClick={() => setShowSaveTemplate(true)}
              className="w-full h-9 text-[12px] font-medium text-white/60 hover:text-white touch-manipulation"
            >
              Save as template
            </button>
          </div>
        </div>

        {/* Substance picker */}
        <Sheet open={showSubstanceSheet} onOpenChange={setShowSubstanceSheet}>
          <SheetContent side="bottom" className="h-[70vh] p-0 rounded-t-2xl overflow-hidden">
            <div className="flex flex-col h-full bg-[hsl(0_0%_8%)]">
              <div className="flex justify-center pt-2.5 pb-1 flex-shrink-0">
                <div className="h-1 w-10 rounded-full bg-white/20" />
              </div>
              <div className="flex-shrink-0 border-b border-white/[0.06] px-5 pb-4">
                <Eyebrow>Common substances</Eyebrow>
                <div className="mt-1 text-[20px] font-semibold text-white leading-tight">
                  Common electrical substances
                </div>
                <input
                  value={substanceSearch}
                  onChange={(e) => setSubstanceSearch(e.target.value)}
                  className={cn(inputClass, 'mt-3')}
                  placeholder="Search substances…"
                />
              </div>
              <div className="flex-1 overflow-y-auto overscroll-contain p-5 space-y-2">
                {filteredSubstances.map((substance, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => loadSubstance(substance)}
                    className="w-full text-left p-3 rounded-xl border border-white/[0.08] bg-[hsl(0_0%_10%)] active:bg-white/[0.06] touch-manipulation"
                  >
                    <h4 className="text-[13px] font-medium text-white">{substance.name}</h4>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {substance.ghs.map((g) => {
                        const ghsInfo = GHS_HAZARDS.find((h) => h.id === g);
                        return ghsInfo ? (
                          <span
                            key={g}
                            className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border border-red-500/20 bg-red-500/10 text-red-300"
                          >
                            {ghsInfo.label}
                          </span>
                        ) : null;
                      })}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <SaveAsTemplateSheet
          open={showSaveTemplate}
          onOpenChange={setShowSaveTemplate}
          moduleType="coshh"
          getTemplateData={getTemplateData}
        />
        <LoadTemplateSheet
          open={showLoadTemplate}
          onOpenChange={setShowLoadTemplate}
          moduleType="coshh"
          onLoad={handleLoadTemplate}
        />
      </div>
    );
  }

  // ─── List ───
  return (
    <SafetyModuleShell
      onBack={onBack}
      moduleName="COSHH"
      hero={
        <PageHero
          eyebrow="COSHH · Control of Substances Hazardous to Health 2002"
          title="Assess hazardous substances and control exposure"
          description="Capture the substance, its GHS hazards and exposure routes, then work the control hierarchy — eliminate, substitute, engineer, administer, PPE — and sign it off."
          tone="green"
          actions={<PrimaryButton onClick={openNew}>New assessment</PrimaryButton>}
        />
      }
      stats={
        total > 0 ? (
          <StatStrip
            stats={[
              { value: total, label: 'Total' },
              { value: overdueCount, label: 'Review overdue', accent: overdueCount > 0 },
              { value: highRiskCount, label: 'High risk', sub: 'high / very high' },
              { value: monitoringCount, label: 'Monitoring' },
            ]}
          />
        ) : undefined
      }
      filter={
        total > 0 ? (
          <FilterBar
            tabs={riskFilterTabs}
            activeTab={riskFilter}
            onTabChange={setRiskFilter}
            search={searchQuery}
            onSearchChange={setSearchQuery}
            searchPlaceholder="Search assessments…"
          />
        ) : undefined
      }
    >
      {isLoading ? (
        <LoadingState />
      ) : assessments.length === 0 ? (
        <EmptyState
          title="No COSHH assessments yet"
          description="Under COSHH Regulations 2002, employers must assess risks from hazardous substances and implement appropriate controls. Create your first assessment."
          action="New assessment"
          onAction={openNew}
        />
      ) : sortedAssessments.length === 0 ? (
        <EmptyState title="No matching assessments" description="Try a different risk tab or clear your search." />
      ) : (
        <div className="space-y-2.5">
          {visibleAssessments.map((assessment) => {
            const overdue = isOverdue(assessment.review_date);
            return (
              <SwipeableListItem
                key={assessment.id}
                rightActions={[
                  {
                    icon: Copy,
                    label: 'Duplicate',
                    color: 'bg-blue-500',
                    textColor: 'text-white',
                    onAction: () => handleDuplicate(assessment),
                  },
                  {
                    icon: Trash2,
                    label: 'Delete',
                    color: 'bg-red-500',
                    textColor: 'text-white',
                    onAction: () => setDeleteTarget(assessment.id),
                  },
                ]}
              >
                <ListCard>
                  <ListRow
                    accent={riskTone(assessment.risk_rating)}
                    onClick={() => setViewingAssessment(assessment)}
                    title={assessment.substance_name}
                    subtitle={`${assessment.manufacturer || 'COSHH 2002'}${
                      assessment.location_of_use ? ` · ${assessment.location_of_use}` : ''
                    } · ${assessment.control_measures.length} controls · ${assessment.ppe_required.length} PPE`}
                    trailing={
                      <div className="flex flex-col items-end gap-1">
                        <RiskPill rating={assessment.risk_rating} />
                        <span
                          className={cn(
                            'text-[11px] tabular-nums',
                            overdue ? 'text-red-400 font-medium' : 'text-white/45'
                          )}
                        >
                          {overdue ? 'Review overdue' : `Review ${fmtCardDate(assessment.review_date)}`}
                        </span>
                      </div>
                    }
                  />
                </ListCard>
              </SwipeableListItem>
            );
          })}
          {hasMoreAssessments && (
            <LoadMoreButton onLoadMore={loadMoreAssessments} remaining={remainingAssessments} />
          )}
        </div>
      )}

      {/* Assessment detail sheet */}
      <Sheet open={!!viewingAssessment} onOpenChange={() => setViewingAssessment(null)}>
        <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
          {viewingAssessment && (
            <div className="flex flex-col h-full bg-[hsl(0_0%_8%)]">
              <div className="flex justify-center pt-2.5 pb-1 flex-shrink-0">
                <div className="h-1 w-10 rounded-full bg-white/20" />
              </div>
              <div className="flex-shrink-0 border-b border-white/[0.06] px-5 pb-4">
                <Eyebrow>COSHH 2002</Eyebrow>
                <div className="mt-1 text-[20px] font-semibold text-white leading-tight">
                  {viewingAssessment.substance_name}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <RiskPill rating={viewingAssessment.risk_rating} />
                  <span className="text-[11.5px] text-white/55">
                    Assessed: {viewingAssessment.assessment_date}
                  </span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto overscroll-contain p-5 space-y-4">
                {/* GHS Hazards */}
                <div>
                  <Eyebrow className="mb-2">GHS hazards</Eyebrow>
                  <div className="flex flex-wrap gap-1.5">
                    {viewingAssessment.ghs_hazards.map((g) => {
                      const ghsInfo = GHS_HAZARDS.find((h) => h.id === g);
                      return (
                        <span
                          key={g}
                          className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border border-red-500/20 bg-red-500/10 text-red-300"
                        >
                          {ghsInfo?.label || g}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Exposure Routes */}
                {viewingAssessment.exposure_routes.length > 0 && (
                  <div>
                    <Eyebrow className="mb-2">Exposure routes</Eyebrow>
                    <div className="flex flex-wrap gap-1.5">
                      {viewingAssessment.exposure_routes.map((r) => {
                        const route = EXPOSURE_ROUTES_DEFAULT.find((er) => er.id === r);
                        return (
                          <span
                            key={r}
                            className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border border-amber-500/20 bg-amber-500/10 text-amber-300"
                          >
                            {route?.label || r}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Health Effects */}
                {viewingAssessment.health_effects && (
                  <div>
                    <Eyebrow className="mb-1">Health effects</Eyebrow>
                    <p className="text-[13px] text-white/85 leading-relaxed">
                      {viewingAssessment.health_effects}
                    </p>
                  </div>
                )}

                {/* OEL */}
                {viewingAssessment.oel_value && (
                  <div>
                    <Eyebrow className="mb-1">Occupational exposure limit</Eyebrow>
                    <p className="text-[13px] text-white/85">{viewingAssessment.oel_value}</p>
                  </div>
                )}

                {/* Hierarchy of Controls */}
                <div>
                  <Eyebrow className="mb-2">Hierarchy of controls</Eyebrow>
                  {(() => {
                    const parsed = parseHierarchy(viewingAssessment.control_measures);
                    const activeLevels = HIERARCHY_LEVELS.filter(
                      (l) => parsed[l.key].considered && parsed[l.key].actions.length > 0
                    );
                    if (activeLevels.length === 0) {
                      return (
                        <div className="space-y-1.5">
                          {viewingAssessment.control_measures.map((c, i) => (
                            <p key={i} className="text-[13px] text-white/85">
                              • {c}
                            </p>
                          ))}
                        </div>
                      );
                    }
                    return (
                      <div className="space-y-2">
                        {activeLevels.map((level) => {
                          const h = parsed[level.key];
                          return (
                            <div
                              key={level.key}
                              className="p-3 rounded-xl border border-white/[0.08] bg-[hsl(0_0%_10%)]"
                            >
                              <p className="text-[12px] font-semibold text-elec-yellow mb-1.5">
                                {level.label}
                              </p>
                              <div className="space-y-1">
                                {h.actions.map((action, i) => (
                                  <p key={i} className="text-[13px] text-white/85">
                                    • {action}
                                  </p>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })()}
                </div>

                {/* PPE */}
                {viewingAssessment.ppe_required.length > 0 && (
                  <div>
                    <Eyebrow className="mb-2">Required PPE</Eyebrow>
                    <div className="flex flex-wrap gap-1.5">
                      {viewingAssessment.ppe_required.map((item, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border border-cyan-500/25 bg-cyan-500/10 text-cyan-300"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* First Aid */}
                {viewingAssessment.first_aid && (
                  <div>
                    <Eyebrow className="mb-1">First aid</Eyebrow>
                    <p className="text-[13px] text-white/85 leading-relaxed">
                      {viewingAssessment.first_aid}
                    </p>
                  </div>
                )}

                {/* Storage */}
                {viewingAssessment.storage_requirements && (
                  <div>
                    <Eyebrow className="mb-1">Storage</Eyebrow>
                    <p className="text-[13px] text-white/85 leading-relaxed">
                      {viewingAssessment.storage_requirements}
                    </p>
                  </div>
                )}

                {/* Spill */}
                {viewingAssessment.spill_procedure && (
                  <div>
                    <Eyebrow className="mb-1">Spill procedure</Eyebrow>
                    <p className="text-[13px] text-white/85 leading-relaxed">
                      {viewingAssessment.spill_procedure}
                    </p>
                  </div>
                )}

                {/* Disposal */}
                {viewingAssessment.disposal_method && (
                  <div>
                    <Eyebrow className="mb-1">Disposal method</Eyebrow>
                    <p className="text-[13px] text-white/85 leading-relaxed">
                      {viewingAssessment.disposal_method}
                    </p>
                  </div>
                )}

                {/* Monitoring */}
                {viewingAssessment.monitoring_required && (
                  <div>
                    <Eyebrow className="mb-1">Exposure monitoring</Eyebrow>
                    <p className="text-[13px] text-white/85 leading-relaxed">
                      {viewingAssessment.monitoring_details || 'Required'}
                    </p>
                  </div>
                )}

                <div className="p-3 rounded-xl border border-white/[0.08] bg-[hsl(0_0%_10%)]">
                  <div className="flex justify-between text-[11.5px] text-white/55">
                    <span>Assessed by: {viewingAssessment.assessed_by}</span>
                    <span
                      className={cn(
                        isOverdue(viewingAssessment.review_date) && 'text-red-400 font-medium'
                      )}
                    >
                      Review by: {viewingAssessment.review_date}
                    </span>
                  </div>
                </div>

                {/* Corrective Actions Tracker */}
                <CorrectiveActionsPanel sourceType="coshh" sourceId={viewingAssessment.id} />

                {/* Signatures */}
                {((viewingAssessment as Record<string, unknown>).assessor_signature ||
                  (viewingAssessment as Record<string, unknown>).reviewer_signature) && (
                  <div className="space-y-3">
                    <Eyebrow>Signatures</Eyebrow>
                    {(viewingAssessment as Record<string, unknown>).assessor_signature && (
                      <div className="p-3 rounded-xl border border-white/[0.08] bg-[hsl(0_0%_10%)]">
                        <p className="text-[11.5px] text-white/55 mb-2">Assessor</p>
                        <img
                          src={
                            (viewingAssessment as Record<string, unknown>)
                              .assessor_signature as string
                          }
                          alt="Assessor signature"
                          className="h-16 rounded border border-white/10 bg-white"
                        />
                      </div>
                    )}
                    {(viewingAssessment as Record<string, unknown>).reviewer_signature && (
                      <div className="p-3 rounded-xl border border-white/[0.08] bg-[hsl(0_0%_10%)]">
                        <p className="text-[11.5px] text-white/55 mb-2">
                          Reviewer:{' '}
                          {((viewingAssessment as Record<string, unknown>).reviewer_name as string) ||
                            'N/A'}
                        </p>
                        <img
                          src={
                            (viewingAssessment as Record<string, unknown>)
                              .reviewer_signature as string
                          }
                          alt="Reviewer signature"
                          className="h-16 rounded border border-white/10 bg-white"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div
                className="flex-shrink-0 border-t border-white/[0.06] p-4 grid grid-cols-2 gap-2 bg-[hsl(0_0%_8%)]"
                style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
              >
                <PrimaryButton
                  fullWidth
                  disabled={isExporting && exportingId === viewingAssessment.id}
                  onClick={() => exportPDF('coshh', viewingAssessment.id)}
                >
                  {isExporting && exportingId === viewingAssessment.id ? 'Exporting…' : 'Export PDF'}
                </PrimaryButton>
                <SecondaryButton fullWidth onClick={() => setShowShare(true)}>
                  Share
                </SecondaryButton>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {viewingAssessment && (
        <SafetyDocumentShare
          open={showShare}
          onClose={() => setShowShare(false)}
          pdfType="coshh"
          recordId={viewingAssessment.id}
          documentTitle={`COSHH Assessment — ${viewingAssessment.substance_name}`}
        />
      )}

      <DeleteConfirmSheet
        open={!!deleteTarget}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
        onConfirm={async () => {
          if (!deleteTarget) return;
          setIsDeleting(true);
          await handleDelete(deleteTarget);
          setIsDeleting(false);
          setDeleteTarget(null);
        }}
        title="Delete COSHH assessment?"
        description="This assessment will be permanently removed"
        isDeleting={isDeleting}
      />
    </SafetyModuleShell>
  );
}

export default COSHHAssessmentBuilder;
