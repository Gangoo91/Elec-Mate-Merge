import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { toast } from 'sonner';
import {
  ArrowLeft,
  Plus,
  FlaskConical,
  AlertTriangle,
  Shield,
  ChevronRight,
  CheckCircle2,
  Search,
  Eye,
  Wind,
  Droplets,
  Hand,
  Flame,
  Skull,
  Heart,
  Bug,
  Trash2,
  FileText,
  Download,
  Clock,
} from 'lucide-react';

// ─── Types ───

interface GHSHazard {
  id: string;
  label: string;
  icon: React.ElementType;
  description: string;
}

interface ExposureRoute {
  id: string;
  label: string;
  icon: React.ElementType;
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
  assessment_date: string;
  review_date: string;
  created_at: string;
}

// ─── Constants ───

const GHS_HAZARDS: GHSHazard[] = [
  { id: 'flammable', label: 'Flammable', icon: Flame, description: 'Catches fire easily' },
  { id: 'toxic', label: 'Toxic', icon: Skull, description: 'Fatal or toxic if inhaled/swallowed' },
  {
    id: 'harmful',
    label: 'Harmful',
    icon: AlertTriangle,
    description: 'May cause irritation or harm',
  },
  { id: 'corrosive', label: 'Corrosive', icon: Droplets, description: 'Causes severe burns' },
  {
    id: 'health-hazard',
    label: 'Health Hazard',
    icon: Heart,
    description: 'Long-term health effects',
  },
  {
    id: 'environmental',
    label: 'Environmental',
    icon: Bug,
    description: 'Harmful to aquatic life',
  },
  { id: 'oxidiser', label: 'Oxidiser', icon: Flame, description: 'May cause or intensify fire' },
  { id: 'compressed-gas', label: 'Compressed Gas', icon: Wind, description: 'Gas under pressure' },
];

const EXPOSURE_ROUTES_DEFAULT: ExposureRoute[] = [
  { id: 'inhalation', label: 'Inhalation', icon: Wind, selected: false },
  { id: 'skin-contact', label: 'Skin Contact', icon: Hand, selected: false },
  { id: 'eye-contact', label: 'Eye Contact', icon: Eye, selected: false },
  { id: 'ingestion', label: 'Ingestion', icon: Droplets, selected: false },
];

const COMMON_SUBSTANCES = [
  {
    name: 'PVC Cement (Solvent Weld)',
    manufacturer: 'Various',
    ghs: ['flammable', 'harmful'],
    routes: ['inhalation', 'skin-contact', 'eye-contact'],
    health:
      'Eye and respiratory irritation. Prolonged exposure may cause headache, dizziness. Skin defatting.',
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
      'Fume inhalation may cause occupational asthma. Corrosive to skin and eyes. May cause sensitisation.',
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
    health: 'Respiratory irritation. Skin sensitisation possible. May contain isocyanates.',
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
      'Skin sensitisation (epoxy). Respiratory sensitisation. Exothermic reaction during curing — burn risk.',
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
];

const RISK_COLOURS: Record<string, { bg: string; text: string; border: string }> = {
  low: { bg: 'bg-green-500/15', text: 'text-green-400', border: 'border-green-500/20' },
  medium: { bg: 'bg-amber-500/15', text: 'text-amber-400', border: 'border-amber-500/20' },
  high: { bg: 'bg-orange-500/15', text: 'text-orange-400', border: 'border-orange-500/20' },
  'very-high': { bg: 'bg-red-500/15', text: 'text-red-400', border: 'border-red-500/20' },
};

// ─── Main Component ───

export function COSHHAssessmentBuilder({ onBack }: { onBack: () => void }) {
  const [assessments, setAssessments] = useState<COSHHAssessment[]>([]);
  const [showWizard, setShowWizard] = useState(false);
  const [showSubstanceSheet, setShowSubstanceSheet] = useState(false);
  const [viewingAssessment, setViewingAssessment] = useState<COSHHAssessment | null>(null);
  const [wizardStep, setWizardStep] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

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
  const [newControl, setNewControl] = useState('');
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

  const resetWizard = () => {
    setWizardStep(0);
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
    setNewControl('');
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
    setPpeRequired(substance.ppe);
    setStorageRequirements(substance.storage);
    setSpillProcedure(substance.spill);
    setFirstAid(substance.firstAid);
    setShowSubstanceSheet(false);
    setWizardStep(1);
  };

  const saveAssessment = () => {
    const now = new Date();
    const reviewDate = new Date(now);
    reviewDate.setFullYear(reviewDate.getFullYear() + 1);

    const assessment: COSHHAssessment = {
      id: `coshh-${Date.now()}`,
      substance_name: substanceName,
      manufacturer,
      product_code: productCode,
      location_of_use: locationOfUse,
      task_description: taskDescription,
      quantity_used: quantityUsed,
      frequency_of_use: frequencyOfUse,
      ghs_hazards: selectedGHS,
      exposure_routes: exposureRoutes.filter((r) => r.selected).map((r) => r.id),
      health_effects: healthEffects,
      oel_value: oelValue,
      control_measures: controlMeasures,
      ppe_required: ppeRequired,
      storage_requirements: storageRequirements,
      spill_procedure: spillProcedure,
      first_aid: firstAid,
      disposal_method: disposalMethod,
      monitoring_required: monitoringRequired,
      monitoring_details: monitoringDetails,
      risk_rating: riskRating,
      assessed_by: assessedBy,
      assessment_date: now.toISOString().split('T')[0],
      review_date: reviewDate.toISOString().split('T')[0],
      created_at: now.toISOString(),
    };

    setAssessments((prev) => [assessment, ...prev]);
    setShowWizard(false);
    resetWizard();
    toast.success('COSHH assessment saved');
  };

  const toggleGHS = (id: string) => {
    setSelectedGHS((prev) => (prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]));
  };

  const toggleExposureRoute = (id: string) => {
    setExposureRoutes((prev) =>
      prev.map((r) => (r.id === id ? { ...r, selected: !r.selected } : r))
    );
  };

  const addControl = () => {
    if (newControl.trim()) {
      setControlMeasures((prev) => [...prev, newControl.trim()]);
      setNewControl('');
    }
  };

  const addPPE = () => {
    if (newPPE.trim()) {
      setPpeRequired((prev) => [...prev, newPPE.trim()]);
      setNewPPE('');
    }
  };

  const filteredSubstances = COMMON_SUBSTANCES.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ─── Wizard Steps ───

  const renderWizardStep = () => {
    switch (wizardStep) {
      case 0:
        return (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">Substance Details</h3>
            <Button
              variant="outline"
              onClick={() => setShowSubstanceSheet(true)}
              className="w-full h-11 border-elec-yellow/30 text-elec-yellow rounded-xl touch-manipulation"
            >
              <FlaskConical className="h-4 w-4 mr-2" />
              Load Common Substance
            </Button>
            <div className="space-y-3">
              <div>
                <Label className="text-white/80 text-sm">Substance Name *</Label>
                <Input
                  value={substanceName}
                  onChange={(e) => setSubstanceName(e.target.value)}
                  className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500 mt-1"
                  placeholder="e.g. PVC Solvent Cement"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-white/80 text-sm">Manufacturer</Label>
                  <Input
                    value={manufacturer}
                    onChange={(e) => setManufacturer(e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500 mt-1"
                  />
                </div>
                <div>
                  <Label className="text-white/80 text-sm">Product Code</Label>
                  <Input
                    value={productCode}
                    onChange={(e) => setProductCode(e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500 mt-1"
                  />
                </div>
              </div>
              <div>
                <Label className="text-white/80 text-sm">Location of Use</Label>
                <Input
                  value={locationOfUse}
                  onChange={(e) => setLocationOfUse(e.target.value)}
                  className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500 mt-1"
                  placeholder="e.g. Plant room, riser, site-wide"
                />
              </div>
              <div>
                <Label className="text-white/80 text-sm">Task / How Used</Label>
                <Textarea
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  className="touch-manipulation text-base min-h-[80px] focus:ring-2 focus:ring-elec-yellow/20 border-white/30 focus:border-yellow-500 mt-1"
                  placeholder="Describe how the substance is used..."
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-white/80 text-sm">Quantity Used</Label>
                  <Input
                    value={quantityUsed}
                    onChange={(e) => setQuantityUsed(e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500 mt-1"
                    placeholder="e.g. 500ml"
                  />
                </div>
                <div>
                  <Label className="text-white/80 text-sm">Frequency</Label>
                  <Select value={frequencyOfUse} onValueChange={setFrequencyOfUse}>
                    <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-elec-gray focus:border-elec-yellow focus:ring-elec-yellow mt-1">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="occasional">Occasional</SelectItem>
                      <SelectItem value="one-off">One-off</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">Hazard Classification</h3>

            <div>
              <Label className="text-white/80 text-sm mb-2 block">GHS Hazard Pictograms</Label>
              <div className="grid grid-cols-2 gap-2">
                {GHS_HAZARDS.map((hazard) => {
                  const Icon = hazard.icon;
                  const isSelected = selectedGHS.includes(hazard.id);
                  return (
                    <button
                      key={hazard.id}
                      onClick={() => toggleGHS(hazard.id)}
                      className={`p-3 rounded-xl border text-left touch-manipulation transition-all active:scale-[0.98] ${
                        isSelected
                          ? 'border-red-500/40 bg-red-500/10'
                          : 'border-white/10 bg-white/[0.03]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center ${isSelected ? 'bg-red-500/20' : 'bg-white/[0.06]'}`}
                        >
                          <Icon
                            className={`h-4 w-4 ${isSelected ? 'text-red-400' : 'text-white/50'}`}
                          />
                        </div>
                        <div>
                          <p
                            className={`text-xs font-bold ${isSelected ? 'text-red-300' : 'text-white/70'}`}
                          >
                            {hazard.label}
                          </p>
                          <p className="text-[10px] text-white/40">{hazard.description}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <Label className="text-white/80 text-sm mb-2 block">Exposure Routes</Label>
              <div className="grid grid-cols-2 gap-2">
                {exposureRoutes.map((route) => {
                  const Icon = route.icon;
                  return (
                    <button
                      key={route.id}
                      onClick={() => toggleExposureRoute(route.id)}
                      className={`p-3 rounded-xl border text-left touch-manipulation transition-all active:scale-[0.98] ${
                        route.selected
                          ? 'border-amber-500/40 bg-amber-500/10'
                          : 'border-white/10 bg-white/[0.03]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon
                          className={`h-4 w-4 ${route.selected ? 'text-amber-400' : 'text-white/50'}`}
                        />
                        <span
                          className={`text-sm font-medium ${route.selected ? 'text-amber-300' : 'text-white/70'}`}
                        >
                          {route.label}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <Label className="text-white/80 text-sm">Health Effects</Label>
              <Textarea
                value={healthEffects}
                onChange={(e) => setHealthEffects(e.target.value)}
                className="touch-manipulation text-base min-h-[100px] focus:ring-2 focus:ring-elec-yellow/20 border-white/30 focus:border-yellow-500 mt-1"
                placeholder="Describe potential health effects..."
              />
            </div>

            <div>
              <Label className="text-white/80 text-sm">Occupational Exposure Limit (OEL)</Label>
              <Input
                value={oelValue}
                onChange={(e) => setOelValue(e.target.value)}
                className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500 mt-1"
                placeholder="e.g. TWA 50 ppm, STEL 100 ppm"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">Controls & PPE</h3>

            <div>
              <Label className="text-white/80 text-sm mb-2 block">Control Measures</Label>
              <div className="space-y-1.5 mb-2">
                {controlMeasures.map((c, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 p-2 rounded-lg border border-white/10 bg-white/[0.03]"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-400 flex-shrink-0" />
                    <span className="text-sm text-white/80 flex-1">{c}</span>
                    <button
                      onClick={() =>
                        setControlMeasures((prev) => prev.filter((_, idx) => idx !== i))
                      }
                      className="h-9 w-9 rounded-full bg-white/[0.06] flex items-center justify-center touch-manipulation active:bg-white/[0.12] flex-shrink-0"
                    >
                      <Trash2 className="h-3.5 w-3.5 text-white/40" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newControl}
                  onChange={(e) => setNewControl(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addControl()}
                  className="h-10 text-sm touch-manipulation border-white/20 focus:border-yellow-500 flex-1"
                  placeholder="Add control measure..."
                />
                <Button
                  onClick={addControl}
                  size="sm"
                  className="h-10 bg-elec-yellow text-black rounded-lg touch-manipulation"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <Label className="text-white/80 text-sm mb-2 block">Required PPE</Label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {ppeRequired.map((item, i) => (
                  <Badge
                    key={i}
                    className="bg-cyan-500/15 text-cyan-300 border-cyan-500/20 text-xs cursor-pointer touch-manipulation active:bg-red-500/15 py-1.5 px-2.5"
                    onClick={() => setPpeRequired((prev) => prev.filter((_, idx) => idx !== i))}
                  >
                    <Shield className="h-3 w-3 mr-1" />
                    {item}
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newPPE}
                  onChange={(e) => setNewPPE(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addPPE()}
                  className="h-10 text-sm touch-manipulation border-white/20 focus:border-yellow-500 flex-1"
                  placeholder="Add PPE item..."
                />
                <Button
                  onClick={addPPE}
                  size="sm"
                  className="h-10 bg-elec-yellow text-black rounded-lg touch-manipulation"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <Label className="text-white/80 text-sm">Risk Rating (with controls)</Label>
              <div className="grid grid-cols-4 gap-2 mt-1">
                {(['low', 'medium', 'high', 'very-high'] as const).map((level) => {
                  const colours = RISK_COLOURS[level];
                  return (
                    <button
                      key={level}
                      onClick={() => setRiskRating(level)}
                      className={`p-2.5 rounded-xl border text-center touch-manipulation transition-all active:scale-[0.98] ${
                        riskRating === level
                          ? `${colours.bg} ${colours.border} ring-1 ring-offset-0`
                          : 'border-white/10 bg-white/[0.03]'
                      }`}
                    >
                      <span
                        className={`text-xs font-bold ${riskRating === level ? colours.text : 'text-white/50'}`}
                      >
                        {level === 'very-high'
                          ? 'V. High'
                          : level.charAt(0).toUpperCase() + level.slice(1)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">Emergency & Storage</h3>

            <div>
              <Label className="text-white/80 text-sm">Storage Requirements</Label>
              <Textarea
                value={storageRequirements}
                onChange={(e) => setStorageRequirements(e.target.value)}
                className="touch-manipulation text-base min-h-[80px] focus:ring-2 focus:ring-elec-yellow/20 border-white/30 focus:border-yellow-500 mt-1"
                placeholder="Storage conditions and requirements..."
              />
            </div>

            <div>
              <Label className="text-white/80 text-sm">Spill Procedure</Label>
              <Textarea
                value={spillProcedure}
                onChange={(e) => setSpillProcedure(e.target.value)}
                className="touch-manipulation text-base min-h-[80px] focus:ring-2 focus:ring-elec-yellow/20 border-white/30 focus:border-yellow-500 mt-1"
                placeholder="Steps to take in event of spillage..."
              />
            </div>

            <div>
              <Label className="text-white/80 text-sm">First Aid Measures</Label>
              <Textarea
                value={firstAid}
                onChange={(e) => setFirstAid(e.target.value)}
                className="touch-manipulation text-base min-h-[100px] focus:ring-2 focus:ring-elec-yellow/20 border-white/30 focus:border-yellow-500 mt-1"
                placeholder="First aid measures by exposure route..."
              />
            </div>

            <div>
              <Label className="text-white/80 text-sm">Disposal Method</Label>
              <Input
                value={disposalMethod}
                onChange={(e) => setDisposalMethod(e.target.value)}
                className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500 mt-1"
                placeholder="e.g. Dispose as hazardous waste via licensed contractor"
              />
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-white/[0.03]">
              <Checkbox
                checked={monitoringRequired}
                onCheckedChange={(v) => setMonitoringRequired(!!v)}
                className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
              />
              <Label className="text-white/80 text-sm cursor-pointer">
                Exposure monitoring required
              </Label>
            </div>

            {monitoringRequired && (
              <div>
                <Label className="text-white/80 text-sm">Monitoring Details</Label>
                <Input
                  value={monitoringDetails}
                  onChange={(e) => setMonitoringDetails(e.target.value)}
                  className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500 mt-1"
                  placeholder="e.g. Personal air sampling quarterly"
                />
              </div>
            )}

            <div>
              <Label className="text-white/80 text-sm">Assessed By</Label>
              <Input
                value={assessedBy}
                onChange={(e) => setAssessedBy(e.target.value)}
                className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500 mt-1"
                placeholder="Your full name"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (wizardStep) {
      case 0:
        return substanceName.trim().length > 0;
      case 1:
        return selectedGHS.length > 0;
      case 2:
        return controlMeasures.length > 0 || ppeRequired.length > 0;
      case 3:
        return assessedBy.trim().length > 0;
      default:
        return true;
    }
  };

  // ─── Render ───

  return (
    <div className="bg-background min-h-screen animate-fade-in">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/10">
        <div className="px-4 py-2">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white active:opacity-70 active:scale-[0.98] transition-all touch-manipulation h-11 -ml-2 px-2 rounded-lg"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-medium">Site Safety</span>
          </button>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Hero */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
            <FlaskConical className="h-6 w-6 text-green-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">COSHH Assessments</h1>
            <p className="text-sm text-white/70">Control of Substances Hazardous to Health</p>
          </div>
        </div>

        {/* New Assessment Button */}
        <Button
          onClick={() => {
            resetWizard();
            setShowWizard(true);
          }}
          className="w-full h-12 bg-elec-yellow text-black font-bold rounded-xl touch-manipulation active:scale-[0.98]"
        >
          <Plus className="h-5 w-5 mr-2" />
          New COSHH Assessment
        </Button>

        {/* Info card */}
        <div className="p-3 rounded-xl border border-amber-500/20 bg-amber-500/5">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-amber-300 font-medium">Legal Requirement</p>
              <p className="text-xs text-white/60 mt-0.5">
                Under COSHH Regulations 2002, employers must assess risks from hazardous substances
                and implement appropriate controls. Assessments must be reviewed regularly and when
                circumstances change.
              </p>
            </div>
          </div>
        </div>

        {/* Assessments List */}
        {assessments.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-white/[0.05] flex items-center justify-center mx-auto mb-4">
              <FlaskConical className="h-8 w-8 text-white/30" />
            </div>
            <h3 className="text-base font-bold text-white/70 mb-1">No Assessments Yet</h3>
            <p className="text-sm text-white/50">Create your first COSHH assessment</p>
          </div>
        ) : (
          <div className="space-y-2 pb-20">
            {assessments.map((assessment) => {
              const riskColours = RISK_COLOURS[assessment.risk_rating];
              return (
                <motion.button
                  key={assessment.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setViewingAssessment(assessment)}
                  className="w-full text-left rounded-xl border border-white/[0.08] bg-white/[0.03] active:bg-white/[0.06] p-4 touch-manipulation"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br from-green-400/20 to-emerald-500/20 border border-green-500/20 flex-shrink-0">
                      <FlaskConical className="h-5 w-5 text-green-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[15px] font-bold text-white truncate">
                        {assessment.substance_name}
                      </h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Badge
                          className={`${riskColours.bg} ${riskColours.text} border-none text-[10px]`}
                        >
                          {assessment.risk_rating === 'very-high'
                            ? 'Very High'
                            : assessment.risk_rating.charAt(0).toUpperCase() +
                              assessment.risk_rating.slice(1)}{' '}
                          Risk
                        </Badge>
                        <span className="text-xs text-white/50 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Review: {assessment.review_date}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-white/30 flex-shrink-0" />
                  </div>
                </motion.button>
              );
            })}
          </div>
        )}
      </div>

      {/* Wizard Sheet */}
      <Sheet open={showWizard} onOpenChange={setShowWizard}>
        <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
          <div className="flex flex-col h-full bg-background">
            <div className="px-4 py-3 border-b border-white/10 flex items-center gap-2">
              {wizardStep > 0 && (
                <button
                  onClick={() => setWizardStep((s) => s - 1)}
                  className="h-9 w-9 rounded-full bg-white/[0.08] flex items-center justify-center touch-manipulation"
                >
                  <ArrowLeft className="h-4 w-4 text-white" />
                </button>
              )}
              <h2 className="text-base font-bold text-white">
                {wizardStep === 0 ? 'Substance Details' : `Step ${wizardStep + 1} of 4`}
              </h2>
            </div>

            <div className="h-1 bg-white/[0.05]">
              <motion.div
                className="h-full bg-green-400"
                initial={{ width: 0 }}
                animate={{ width: `${((wizardStep + 1) / 4) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4">
              {renderWizardStep()}
            </div>

            <div className="px-4 py-3 border-t border-white/10 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
              <Button
                onClick={() => {
                  if (wizardStep < 3) {
                    setWizardStep((s) => s + 1);
                  } else {
                    saveAssessment();
                  }
                }}
                disabled={!canProceed()}
                className="w-full h-12 bg-elec-yellow text-black font-bold rounded-xl touch-manipulation active:scale-[0.98] disabled:opacity-50"
              >
                {wizardStep === 3 ? 'Save Assessment' : 'Continue'}
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Common Substances Sheet */}
      <Sheet open={showSubstanceSheet} onOpenChange={setShowSubstanceSheet}>
        <SheetContent side="bottom" className="h-[70vh] p-0 rounded-t-2xl overflow-hidden">
          <div className="flex flex-col h-full bg-background">
            <div className="px-4 py-3 border-b border-white/10">
              <h2 className="text-base font-bold text-white">Common Electrical Substances</h2>
              <div className="relative mt-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-11 pl-9 text-base touch-manipulation border-white/20 focus:border-yellow-500 focus:ring-yellow-500"
                  placeholder="Search substances..."
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-3 space-y-2">
              {filteredSubstances.map((substance, i) => (
                <button
                  key={i}
                  onClick={() => loadSubstance(substance)}
                  className="w-full text-left p-3 rounded-xl border border-white/[0.08] bg-white/[0.03] active:bg-white/[0.06] touch-manipulation"
                >
                  <h4 className="text-sm font-bold text-white">{substance.name}</h4>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {substance.ghs.map((g) => {
                      const ghsInfo = GHS_HAZARDS.find((h) => h.id === g);
                      return ghsInfo ? (
                        <Badge
                          key={g}
                          className="bg-red-500/10 text-red-300 border-red-500/20 text-[10px]"
                        >
                          {ghsInfo.label}
                        </Badge>
                      ) : null;
                    })}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Assessment Detail Sheet */}
      <Sheet open={!!viewingAssessment} onOpenChange={() => setViewingAssessment(null)}>
        <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
          {viewingAssessment && (
            <div className="flex flex-col h-full bg-background">
              <div className="px-4 py-3 border-b border-white/10">
                <h2 className="text-base font-bold text-white">
                  {viewingAssessment.substance_name}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <Badge
                    className={`${RISK_COLOURS[viewingAssessment.risk_rating].bg} ${RISK_COLOURS[viewingAssessment.risk_rating].text} border-none text-xs`}
                  >
                    {viewingAssessment.risk_rating === 'very-high'
                      ? 'Very High'
                      : viewingAssessment.risk_rating.charAt(0).toUpperCase() +
                        viewingAssessment.risk_rating.slice(1)}{' '}
                    Risk
                  </Badge>
                  <span className="text-xs text-white/50">
                    Assessed: {viewingAssessment.assessment_date}
                  </span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 space-y-4">
                {/* GHS Hazards */}
                <div>
                  <h4 className="text-sm font-bold text-white mb-2">GHS Hazards</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {viewingAssessment.ghs_hazards.map((g) => {
                      const ghsInfo = GHS_HAZARDS.find((h) => h.id === g);
                      const Icon = ghsInfo?.icon || AlertTriangle;
                      return (
                        <Badge
                          key={g}
                          className="bg-red-500/10 text-red-300 border-red-500/20 text-xs"
                        >
                          <Icon className="h-3 w-3 mr-1" />
                          {ghsInfo?.label || g}
                        </Badge>
                      );
                    })}
                  </div>
                </div>

                {/* Exposure Routes */}
                <div>
                  <h4 className="text-sm font-bold text-white mb-2">Exposure Routes</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {viewingAssessment.exposure_routes.map((r) => {
                      const route = EXPOSURE_ROUTES_DEFAULT.find((er) => er.id === r);
                      return (
                        <Badge
                          key={r}
                          className="bg-amber-500/10 text-amber-300 border-amber-500/20 text-xs"
                        >
                          {route?.label || r}
                        </Badge>
                      );
                    })}
                  </div>
                </div>

                {/* Health Effects */}
                {viewingAssessment.health_effects && (
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">Health Effects</h4>
                    <p className="text-sm text-white/70">{viewingAssessment.health_effects}</p>
                  </div>
                )}

                {/* Controls */}
                <div>
                  <h4 className="text-sm font-bold text-white mb-2">Control Measures</h4>
                  <div className="space-y-1.5">
                    {viewingAssessment.control_measures.map((c, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-green-400 flex-shrink-0" />
                        <span className="text-sm text-white/80">{c}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* PPE */}
                <div>
                  <h4 className="text-sm font-bold text-white mb-2">Required PPE</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {viewingAssessment.ppe_required.map((item, i) => (
                      <Badge
                        key={i}
                        className="bg-cyan-500/15 text-cyan-300 border-cyan-500/20 text-xs"
                      >
                        <Shield className="h-3 w-3 mr-1" />
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* First Aid */}
                {viewingAssessment.first_aid && (
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">First Aid</h4>
                    <p className="text-sm text-white/70">{viewingAssessment.first_aid}</p>
                  </div>
                )}

                {/* Storage & Spill */}
                {viewingAssessment.storage_requirements && (
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">Storage</h4>
                    <p className="text-sm text-white/70">
                      {viewingAssessment.storage_requirements}
                    </p>
                  </div>
                )}

                {viewingAssessment.spill_procedure && (
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">Spill Procedure</h4>
                    <p className="text-sm text-white/70">{viewingAssessment.spill_procedure}</p>
                  </div>
                )}

                <div className="p-3 rounded-xl border border-white/10 bg-white/[0.03] mt-4">
                  <div className="flex justify-between text-xs text-white/50">
                    <span>Assessed by: {viewingAssessment.assessed_by}</span>
                    <span>Review by: {viewingAssessment.review_date}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default COSHHAssessmentBuilder;
