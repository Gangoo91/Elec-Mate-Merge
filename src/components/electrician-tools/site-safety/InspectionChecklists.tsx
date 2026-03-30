import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSafetyPDFExport } from '@/hooks/useSafetyPDFExport';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SmartTextarea } from './common/SmartTextarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { toast } from 'sonner';
import { SignaturePad } from './common/SignaturePad';
import { SafetyPhotoCapture } from './common/SafetyPhotoCapture';
import { useInspectionRecords, useCreateInspectionRecord } from '@/hooks/useInspectionRecords';
import { useLocalDraft } from '@/hooks/useLocalDraft';
import { DraftRecoveryBanner } from './common/DraftRecoveryBanner';
import { DraftSaveIndicator } from './common/DraftSaveIndicator';
import {
  ArrowLeft,
  Plus,
  ClipboardCheck,
  CheckCircle2,
  XCircle,
  MinusCircle,
  Camera,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Search,
  Calendar,
  MapPin,
  User,
  Clock,
  AlertTriangle,
  Shield,
  Zap,
  Flame,
  HardHat,
  Wrench,
  Eye,
  FileDown,
  Loader2,
  TrendingUp,
  TrendingDown,
  Minus,
  Share2,
} from 'lucide-react';
import { LoadMoreButton } from './common/LoadMoreButton';
import { SafetyRecordCard, fmtCardDate } from './common/SafetyRecordCard';
import { useShowMore } from '@/hooks/useShowMore';
import { SafetyDocumentShare } from './common/SafetyDocumentShare';
import { CorrectiveActionsPanel } from './common/CorrectiveActionsPanel';
import { useCustomInspectionTemplates } from '@/hooks/useCustomInspectionTemplates';

// ─── Types ───

type CheckResult = 'pass' | 'fail' | 'na' | null;
type NonConformanceClass = 'critical' | 'major' | 'minor' | null;

type NonConformanceStatus = 'open' | 'in_progress' | 'closed' | null;

interface ChecklistItem {
  id: string;
  text: string;
  result: CheckResult;
  notes: string;
  photo: string | null;
  classification: NonConformanceClass;
  remedial_action: string;
  assigned_to: string;
  due_date: string;
  nc_status: NonConformanceStatus;
}

interface ChecklistSection {
  id: string;
  title: string;
  items: ChecklistItem[];
  isOpen: boolean;
}

interface ChecklistTemplate {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
  sections: { title: string; items: string[] }[];
  regulation: string;
}

interface CompletedInspection {
  id: string;
  template_id: string;
  template_title: string;
  location: string;
  inspector_name: string;
  date: string;
  sections: ChecklistSection[];
  overall_result: 'pass' | 'fail' | 'advisory';
  pass_count: number;
  fail_count: number;
  na_count: number;
  total_items: number;
  additional_notes: string;
  created_at: string;
}

// ─── Templates ───

const TEMPLATES: ChecklistTemplate[] = [
  {
    id: 'workplace-safety',
    title: 'Workplace Safety',
    description: 'General workplace safety audit',
    icon: Shield,
    gradient: 'from-blue-400 to-blue-600',
    regulation: 'Workplace (Health, Safety and Welfare) Regulations 1992',
    sections: [
      {
        title: 'Access & Egress',
        items: [
          'Access routes clear and unobstructed',
          'Emergency exits clearly marked and accessible',
          'Fire escape routes unblocked',
          'Adequate lighting in corridors and stairwells',
          'Floor surfaces in good condition (no trip hazards)',
          'Handrails present and secure on stairs',
        ],
      },
      {
        title: 'Housekeeping',
        items: [
          'Work area tidy and organised',
          'Materials stored safely',
          'Waste disposed of appropriately',
          'Spills cleaned up promptly',
          'Cable management — no trailing leads',
        ],
      },
      {
        title: 'Fire Safety',
        items: [
          'Fire extinguishers in place and in-date',
          'Fire alarm call points accessible',
          'Fire assembly point signage visible',
          'Emergency lighting operational',
          'No combustible materials near heat sources',
        ],
      },
      {
        title: 'Welfare Facilities',
        items: [
          'Adequate toilet facilities available',
          'Hand washing facilities with soap',
          'Drinking water available',
          'Rest area/mess room available',
          'First aid kit stocked and accessible',
        ],
      },
    ],
  },
  {
    id: 'ladder-inspection',
    title: 'Ladder Inspection',
    description: 'Pre-use ladder safety check',
    icon: ArrowLeft,
    gradient: 'from-orange-400 to-orange-600',
    regulation: 'Work at Height Regulations 2005',
    sections: [
      {
        title: 'General Condition',
        items: [
          'Stiles straight and undamaged',
          'Rungs/treads secure and undamaged',
          'No visible cracks, splits or corrosion',
          'Feet/shoes present and in good condition',
          'Locking mechanisms work correctly (stepladders)',
          'Stay bars lock in open position',
        ],
      },
      {
        title: 'Setup & Use',
        items: [
          'Placed on firm, level ground',
          'Correct angle (1 out for every 4 up)',
          'Extends at least 1m above landing point',
          'Secured at top or footed at base',
          'No overhead electrical hazards',
          'Weather conditions suitable for use',
        ],
      },
      {
        title: 'Markings & Records',
        items: [
          'Duty rating label legible',
          'Unique identification number visible',
          'Within inspection date',
          'No "Do Not Use" tags attached',
        ],
      },
    ],
  },
  {
    id: 'scaffold-check',
    title: 'Scaffold Inspection',
    description: 'Scaffold safety pre-use check',
    icon: HardHat,
    gradient: 'from-purple-400 to-purple-600',
    regulation: 'Work at Height Regulations 2005 / NASC TG20',
    sections: [
      {
        title: 'Foundation & Base',
        items: [
          'Base plates on firm, level ground',
          'Sole boards in place where required',
          'Standards plumb and correctly spaced',
          'No signs of ground movement or subsidence',
        ],
      },
      {
        title: 'Structure',
        items: [
          'All ledgers, transoms and bracing in place',
          'Couplers tight and in good condition',
          'Ties to building at correct intervals',
          'No bent or damaged tubes',
          'Correct lift heights maintained',
        ],
      },
      {
        title: 'Platforms',
        items: [
          'Boards in good condition — no splits/cracks',
          'Boards fully supported (max 150mm overhang)',
          'Trap doors close properly',
          'Platform fully boarded with no gaps > 25mm',
        ],
      },
      {
        title: 'Edge Protection',
        items: [
          'Guard rails at correct height (950mm min)',
          'Mid rails in place',
          'Toe boards fitted (150mm min)',
          'Brick guards where required',
          'Ladder access properly secured',
        ],
      },
      {
        title: 'Signage & Tags',
        items: [
          'Scaffold tag displayed (green = safe)',
          'Current inspection record available',
          'Warning signs for incomplete scaffolds',
          'Loading limits posted',
        ],
      },
    ],
  },
  {
    id: 'electrical-safety',
    title: 'Electrical Safety Audit',
    description: 'Electrical installation safety check',
    icon: Zap,
    gradient: 'from-yellow-400 to-amber-500',
    regulation: 'Electricity at Work Regulations 1989 / BS 7671',
    sections: [
      {
        title: 'Distribution Boards',
        items: [
          'DB covers in place and secure',
          'Circuit directory up to date and legible',
          'No signs of overheating or burning',
          'Adequate working space maintained',
          'Warning labels present',
          'RCD test dates current',
        ],
      },
      {
        title: 'Wiring & Cables',
        items: [
          'No exposed conductors visible',
          'Cable routes protected from damage',
          'Joints properly made and enclosed',
          'Correct cable support/clips at intervals',
          'No signs of overheating or discolouration',
          'Penetrations properly fire-stopped',
        ],
      },
      {
        title: 'Accessories',
        items: [
          'Sockets and switches securely fixed',
          'No cracked or damaged faceplates',
          'IP ratings appropriate for location',
          'Isolators and switches labelled',
          'Emergency stops accessible and functional',
        ],
      },
      {
        title: 'Portable Equipment',
        items: [
          'PAT tested and in date',
          'Leads in good condition',
          'Plugs not damaged (no tape repairs)',
          '110V supply on construction sites',
          'Extension leads not daisy-chained',
        ],
      },
      {
        title: 'Safe Isolation',
        items: [
          'Voltage indicator available and proved',
          'Lock-off equipment available',
          'Safe isolation procedures displayed',
          'GS38 compliant test leads available',
        ],
      },
    ],
  },
  {
    id: 'fire-safety',
    title: 'Fire Safety Inspection',
    description: 'Fire prevention and protection check',
    icon: Flame,
    gradient: 'from-red-400 to-rose-600',
    regulation: 'Regulatory Reform (Fire Safety) Order 2005',
    sections: [
      {
        title: 'Fire Detection',
        items: [
          'Smoke/heat detectors unobstructed',
          'Fire alarm panel showing no faults',
          'Manual call points accessible',
          'Weekly alarm test recorded',
          'Last service within 6 months',
        ],
      },
      {
        title: 'Fire Fighting',
        items: [
          'Correct type extinguishers for area',
          'Extinguishers on wall brackets/stands',
          'Annual service date current',
          'Hose reels accessible and tested',
          'Staff trained in extinguisher use',
        ],
      },
      {
        title: 'Means of Escape',
        items: [
          'Final exit doors open easily',
          'Exit signs illuminated and visible',
          'Emergency lighting operational',
          'Escape routes clear of obstruction',
          'Fire doors close properly on release',
          'Fire door seals and closers intact',
        ],
      },
      {
        title: 'Fire Prevention',
        items: [
          'Combustibles stored away from ignition sources',
          'No smoking policy enforced',
          'Hot work permits in use where needed',
          'Electrical equipment switched off when not in use',
          'Bin areas clear and secure',
        ],
      },
    ],
  },
  {
    id: 'pat-area',
    title: 'PAT Testing Area',
    description: 'PAT testing workspace safety check',
    icon: Wrench,
    gradient: 'from-cyan-400 to-teal-500',
    regulation: 'IET Code of Practice for In-Service Inspection and Testing',
    sections: [
      {
        title: 'Test Equipment',
        items: [
          'PAT tester calibrated and in date',
          'Test leads in good condition',
          'Earth bond probe clean and functional',
          'Instrument carry case available',
          'Spare labels and stickers available',
        ],
      },
      {
        title: 'Work Area',
        items: [
          'Adequate workspace for testing',
          'Good lighting at test station',
          'RCD protected supply for testing',
          'Safe access to items under test',
          'No trip hazards from test leads',
        ],
      },
      {
        title: 'Documentation',
        items: [
          'Test schedule/register available',
          'Previous results accessible',
          'Failed equipment procedure in place',
          'Asset register up to date',
          'Results being recorded correctly',
        ],
      },
    ],
  },
  {
    id: 'db-inspection',
    title: 'Distribution Board Inspection',
    description: 'Consumer unit & distribution board check',
    icon: Zap,
    gradient: 'from-amber-400 to-yellow-600',
    regulation: 'BS 7671:2018+A2:2022 / Electricity at Work Regulations 1989',
    sections: [
      {
        title: 'Enclosure & Labelling',
        items: [
          'Enclosure undamaged with all covers fitted',
          'IP rating appropriate for location',
          'Circuit directory present, legible and up to date',
          'Warning labels fitted (voltage, RCD test, dual supply)',
          'Adequate working space in front of board (Reg 132.12)',
          'Board securely fixed and level',
        ],
      },
      {
        title: 'Busbars & Connections',
        items: [
          'No signs of overheating, arcing or discolouration',
          'All connections tight (torque-checked where required)',
          'Neutral bar connections secure with no spare exposed cores',
          'Earth bar connections secure',
          'Correct cable entries — no sharp edges on knockouts',
          'Cable glands used where required',
        ],
      },
      {
        title: 'Protective Devices',
        items: [
          'Main switch operates correctly',
          'MCBs/RCBOs rated correctly per circuit directory',
          'RCDs present where required (Reg 411.3.3)',
          'RCD test button operates correctly (trips within limits)',
          'SPD fitted where required (Reg 443)',
          'No signs of tripping or overload history',
        ],
      },
      {
        title: 'Cables & Conductors',
        items: [
          'All cables correctly terminated and dressed',
          'No exposed copper visible at terminations',
          'CPC connected at every circuit',
          'Correct cable sizes for protective device ratings',
          'Fire barriers/seals in place at cable entries',
          'Trunking/conduit entries properly bushed',
        ],
      },
    ],
  },
  {
    id: 'socket-lighting-check',
    title: 'Socket & Lighting Circuit Check',
    description: 'Final circuit inspection walkthrough',
    icon: Zap,
    gradient: 'from-green-400 to-emerald-600',
    regulation: 'BS 7671:2018+A2:2022 Section 7',
    sections: [
      {
        title: 'Socket Outlets',
        items: [
          'Sockets securely fixed to back boxes',
          'No cracked, damaged or discoloured faceplates',
          'Earth terminal connected at every socket',
          'Correct polarity confirmed (L-N-E)',
          'Mounting height appropriate for location',
          'RCD protection confirmed on TT supplies / bathrooms / outdoors',
        ],
      },
      {
        title: 'Lighting Points',
        items: [
          'Luminaires securely fixed and appropriate for location',
          'Correct lamp types installed (LED/fluorescent ratings)',
          'Switches operate correctly and are labelled',
          'Emergency luminaires identified and tested',
          'No signs of overheating at ceiling roses or downlights',
          'Dimmer switches rated for connected load',
        ],
      },
      {
        title: 'Wiring & Containment',
        items: [
          'No exposed cable runs in accessible areas',
          'Cables clipped at correct intervals',
          'All junction boxes accessible for future inspection',
          'Correct cable type for installation method (e.g. SWA outdoors)',
          'Conduit/trunking lids fitted and secure',
          'Fire stopping in place at compartment boundaries',
        ],
      },
      {
        title: 'Accessories',
        items: [
          'Blank plates fitted to unused outlets',
          'Connection units (FCUs) correctly fused for load',
          'Isolator switches present at fixed appliances',
          'Outdoor accessories rated to IP65 minimum',
          'All faceplates flush with wall surface',
        ],
      },
    ],
  },
  {
    id: 'rcd-test-schedule',
    title: 'RCD Testing Schedule',
    description: 'Periodic RCD functional testing record',
    icon: Shield,
    gradient: 'from-blue-400 to-indigo-600',
    regulation: 'BS 7671:2018+A2:2022 Reg 514.12.2 / IET Guidance Note 3',
    sections: [
      {
        title: 'Pre-Test Checks',
        items: [
          'RCD type confirmed (Type AC / A / B / F)',
          'Rated residual operating current (IΔn) noted',
          'RCD rated current matches circuit requirements',
          'Time delay (S type) or general purpose confirmed',
          'Connected circuits identified and loads noted',
          'Downstream equipment disconnection warnings given',
        ],
      },
      {
        title: 'Test Button (User) Test',
        items: [
          'RCD trips when test button pressed',
          'RCD resets correctly after test button trip',
          'Test button mechanism not stiff or jammed',
          'Test performed quarterly as recommended',
          'Date and result recorded in log',
        ],
      },
      {
        title: 'Instrument Test',
        items: [
          'Trip time at 1×IΔn within 300ms (general) / 200ms (no time delay)',
          'Trip time at 5×IΔn within 40ms',
          'No-trip test at 50% IΔn confirms device does not trip',
          'Instrument calibration date current',
          'Results compared with previous test records',
        ],
      },
      {
        title: 'Post-Test',
        items: [
          'RCD reset and all circuits re-energised',
          'Loads confirmed operational after testing',
          'Results logged with date, tester name and instrument serial',
          'Next test date scheduled (6-monthly recommended)',
          'Any out-of-specification results flagged for action',
        ],
      },
    ],
  },
  {
    id: 'earth-bonding-verification',
    title: 'Earth Bonding Verification',
    description: 'Earthing & bonding system inspection',
    icon: Shield,
    gradient: 'from-emerald-400 to-green-600',
    regulation: 'BS 7671:2018+A2:2022 Chapter 54 / Reg 411.3.1.2',
    sections: [
      {
        title: 'Main Earthing',
        items: [
          'Earthing conductor connected to MET (main earthing terminal)',
          'Earthing conductor size adequate (Table 54.7)',
          'Earth electrode present and accessible (TT systems)',
          'Earth electrode resistance within acceptable limits',
          'Labels fitted at MET and earth electrode',
          'No signs of corrosion or deterioration',
        ],
      },
      {
        title: 'Main Protective Bonding',
        items: [
          'Gas pipe bonded within 600mm of meter outlet',
          'Water pipe bonded within 600mm of meter outlet',
          'Oil pipe bonded where present',
          'Bonding conductors correct size (Table 54.8)',
          'Bonding connections accessible for inspection',
          'Labels fitted at every bonding connection',
        ],
      },
      {
        title: 'Supplementary Bonding',
        items: [
          'Supplementary bonding present in bathrooms (if required)',
          'Bonding connections between exposed and extraneous conductive parts',
          'Minimum 4mm² conductor (or 2.5mm² if mechanically protected)',
          'Connections made with BS EN 60998 connectors (not tape/solder)',
          'R value below 50V/Ia threshold',
        ],
      },
      {
        title: 'Test Results',
        items: [
          'Continuity of main earthing conductor confirmed (R1+R2)',
          'Continuity of main bonding conductors confirmed',
          'External earth fault loop impedance (Ze) measured and recorded',
          'Test results within maximum values for protective device',
          'Instrument calibration date current',
        ],
      },
    ],
  },
  {
    id: 'fire-alarm-check',
    title: 'Fire Alarm System Check',
    description: 'Fire detection & alarm system inspection',
    icon: Flame,
    gradient: 'from-red-400 to-orange-600',
    regulation: 'BS 5839-1:2017 / Regulatory Reform (Fire Safety) Order 2005',
    sections: [
      {
        title: 'Control Panel',
        items: [
          'Panel showing normal (no faults, no isolations)',
          'All zone indicators checked and functional',
          'Battery condition satisfactory (green indicator)',
          'Standby battery test performed (24h capacity check)',
          'Log book present and up to date',
          'Panel access restricted (key/code)',
        ],
      },
      {
        title: 'Detection Devices',
        items: [
          'Correct detector types for areas (smoke/heat/multi-sensor)',
          'Detectors unobstructed (no storage within 500mm)',
          'Detector heads clean — no paint, dust or contamination',
          'Detector base and head secure (no wobble)',
          'Sample of detectors functionally tested',
          'Beam detectors aligned and operational',
        ],
      },
      {
        title: 'Alarm Devices & Call Points',
        items: [
          'Sounders/bells audible throughout building (min 65dB / 75dB bedrooms)',
          'Visual alarm devices (VADs) operational where fitted',
          'Manual call points at every exit/storey (max 45m travel)',
          'Call point glass/element intact',
          'Call point tested with test key — system activates',
          'Cause and effect confirmed (e.g. which zones trigger which outputs)',
        ],
      },
      {
        title: 'Wiring & Infrastructure',
        items: [
          'Fire-rated cable used throughout (FP200 or equivalent)',
          'Cable clips/supports fire-rated and at correct centres',
          'Junction boxes accessible and labelled',
          'End-of-line devices present and measurable',
          'No unauthorised modifications to wiring',
          'Conduit/trunking integrity maintained',
        ],
      },
    ],
  },
  {
    id: 'emergency-lighting-test',
    title: 'Emergency Lighting Test',
    description: 'Emergency lighting system inspection & test',
    icon: AlertTriangle,
    gradient: 'from-yellow-400 to-orange-500',
    regulation: 'BS 5266-1:2016 / BS EN 1838',
    sections: [
      {
        title: 'Monthly Function Test',
        items: [
          'Simulate mains failure at distribution board',
          'All emergency luminaires illuminate within 5 seconds',
          'Illumination level appears adequate on escape routes',
          'Exit signs legible and illuminated',
          'Maintained luminaires switch to battery mode correctly',
          'Charging indicators show normal after mains restored',
        ],
      },
      {
        title: 'Luminaire Condition',
        items: [
          'Luminaires clean and undamaged',
          'Diffusers/lenses present and not discoloured',
          'Luminaires correctly positioned (changes of direction, exits, stairs)',
          'No luminaires obstructed by new partitions, signage or fittings',
          'LED indicators (charge healthy) visible on self-contained units',
        ],
      },
      {
        title: 'Annual Full Duration Test (3h)',
        items: [
          'Full rated duration test conducted for 3 hours',
          'All luminaires still lit at end of 3-hour period',
          'Lux levels measured at floor level on escape routes (min 1 lux)',
          'Anti-panic areas achieve minimum 0.5 lux',
          'High-risk task areas achieve required lux level',
          'Results recorded with date, tester name and instrument details',
        ],
      },
      {
        title: 'Documentation & Compliance',
        items: [
          'Emergency lighting log book present and up to date',
          'Monthly test results recorded',
          'Annual test certificate filed',
          'Design certificate (BS 5266-1) available for installation',
          'Any failed luminaires replaced and retested',
          'Next scheduled test date recorded',
        ],
      },
    ],
  },
  {
    id: 'ev-charger-commissioning',
    title: 'EV Charger Commissioning Check',
    description: 'Electric vehicle charge point inspection',
    icon: Zap,
    gradient: 'from-teal-400 to-cyan-600',
    regulation: 'BS 7671:2018+A2:2022 Section 722 / IET Code of Practice for EV Charging',
    sections: [
      {
        title: 'Supply & Protection',
        items: [
          'Dedicated circuit from distribution board confirmed',
          'Correct cable size for demand and route length',
          'Protective device rated correctly (MCB/RCBO)',
          'Type A or Type B RCD protection in place (Reg 722.531.3.101)',
          'Earthing arrangement verified for charge point location',
          'PME earth not used for outdoor installations (or risk assessed)',
        ],
      },
      {
        title: 'Charge Point Installation',
        items: [
          'Charge point securely mounted at correct height',
          'Cable entry sealed and weatherproof',
          'Tethered cable in good condition (no damage or kinking)',
          'Socket/connector type correct for vehicle (Type 1/Type 2/CCS)',
          'Emergency stop / isolation switch accessible',
          'Signage displayed (EV charging, isolation, emergency)',
        ],
      },
      {
        title: 'Testing & Verification',
        items: [
          'Continuity of CPC confirmed (R1+R2)',
          'Insulation resistance ≥ 1MΩ at 500V DC',
          'Earth fault loop impedance (Zs) within limits for device',
          'RCD trip time within specification',
          'Functional test — charge initiated and terminated correctly',
          'Smart features tested (app connectivity, scheduling, load management)',
        ],
      },
      {
        title: 'Commissioning Records',
        items: [
          'Electrical Installation Certificate (EIC) completed',
          'OZEV grant notification submitted (if applicable)',
          'DNO notification submitted (if load > 3.68kW / 16A per phase)',
          'User manual and operating instructions provided to customer',
          'Charge point registered with manufacturer portal',
          'Warranty information provided to customer',
        ],
      },
    ],
  },
];

const RESULT_CONFIG = {
  pass: { icon: CheckCircle2, colour: 'text-green-400', bg: 'bg-green-500/15', label: 'Pass' },
  fail: { icon: XCircle, colour: 'text-red-400', bg: 'bg-red-500/15', label: 'Fail' },
  na: { icon: MinusCircle, colour: 'text-white', bg: 'bg-gray-500/15', label: 'N/A' },
};

const CLASSIFICATION_CONFIG = {
  critical: {
    label: 'Critical',
    description: 'Stop work immediately',
    colour: 'text-red-400',
    bg: 'bg-red-500/15',
    border: 'border-red-500/30',
    badge: 'bg-red-500/20 text-red-300 border-red-500/30',
  },
  major: {
    label: 'Major',
    description: 'Rectify within 24 hours',
    colour: 'text-orange-400',
    bg: 'bg-orange-500/15',
    border: 'border-orange-500/30',
    badge: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  },
  minor: {
    label: 'Minor',
    description: 'Advisory — rectify when practical',
    colour: 'text-yellow-400',
    bg: 'bg-yellow-500/15',
    border: 'border-yellow-500/30',
    badge: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  },
} as const;

// ─── Main Component ───

export function InspectionChecklists({ onBack }: { onBack: () => void }) {
  const { data: dbRecords, isLoading: isLoadingRecords } = useInspectionRecords();
  const createInspectionRecord = useCreateInspectionRecord();
  const { exportPDF, isExporting, exportingId } = useSafetyPDFExport();
  const [showShare, setShowShare] = useState(false);

  const completedInspections: CompletedInspection[] = (dbRecords ?? []).map((r) => ({
    id: r.id,
    template_id: r.template_id,
    template_title: r.template_title,
    location: r.location ?? '',
    inspector_name: r.inspector_name,
    date: r.date,
    sections: r.sections as unknown as ChecklistSection[],
    overall_result: r.overall_result,
    pass_count: r.pass_count,
    fail_count: r.fail_count,
    na_count: r.na_count,
    total_items: r.total_items,
    additional_notes: r.additional_notes ?? '',
    created_at: r.created_at,
  }));

  const {
    visible: visibleInspections,
    hasMore: hasMoreInspections,
    remaining: remainingInspections,
    loadMore: loadMoreInspections,
  } = useShowMore(completedInspections);

  const [activeTemplate, setActiveTemplate] = useState<ChecklistTemplate | null>(null);
  const [sections, setSections] = useState<ChecklistSection[]>([]);
  const [inspectorName, setInspectorName] = useState('');
  const [location, setLocation] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [viewingInspection, setViewingInspection] = useState<CompletedInspection | null>(null);
  const [showTemplates, setShowTemplates] = useState(false);
  const [inspectorSigName, setInspectorSigName] = useState('');
  const [inspectorSigDate, setInspectorSigDate] = useState(new Date().toISOString().split('T')[0]);
  const [inspectorSigData, setInspectorSigData] = useState('');
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);

  // ─── Draft Auto-save ───
  const inspectionDraftData = useMemo(
    () => ({
      templateId: activeTemplate?.id ?? null,
      inspectorName,
      location,
      sections,
      additionalNotes,
      inspectorSigName,
      inspectorSigData,
      photoUrls,
    }),
    [
      activeTemplate,
      inspectorName,
      location,
      sections,
      additionalNotes,
      inspectorSigName,
      inspectorSigData,
      photoUrls,
    ]
  );

  const {
    status: draftStatus,
    recoveredData: recoveredDraft,
    clearDraft,
    dismissRecovery: dismissDraft,
  } = useLocalDraft({
    key: 'inspection-checklist',
    data: inspectionDraftData,
    enabled: activeTemplate !== null,
  });

  const restoreDraft = () => {
    if (!recoveredDraft) return;
    if (recoveredDraft.templateId) {
      const template = TEMPLATES.find((t) => t.id === recoveredDraft.templateId);
      if (template) {
        setActiveTemplate(template);
        if (recoveredDraft.sections?.length) {
          setSections(recoveredDraft.sections);
        } else {
          startInspection(template);
          return;
        }
      }
    }
    if (recoveredDraft.inspectorName !== undefined) setInspectorName(recoveredDraft.inspectorName);
    if (recoveredDraft.location !== undefined) setLocation(recoveredDraft.location);
    if (recoveredDraft.additionalNotes !== undefined)
      setAdditionalNotes(recoveredDraft.additionalNotes);
    if (recoveredDraft.inspectorSigName !== undefined)
      setInspectorSigName(recoveredDraft.inspectorSigName);
    if (recoveredDraft.inspectorSigData !== undefined)
      setInspectorSigData(recoveredDraft.inspectorSigData);
    if (recoveredDraft.photoUrls !== undefined) setPhotoUrls(recoveredDraft.photoUrls);
    dismissDraft();
  };

  const startInspection = (template: ChecklistTemplate) => {
    setActiveTemplate(template);
    setSections(
      template.sections.map((s, si) => ({
        id: `section-${si}`,
        title: s.title,
        isOpen: si === 0,
        items: s.items.map((item, ii) => ({
          id: `item-${si}-${ii}`,
          text: item,
          result: null,
          notes: '',
          photo: null,
          classification: null,
          remedial_action: '',
          assigned_to: '',
          due_date: '',
          nc_status: null,
        })),
      }))
    );
    setShowTemplates(false);
  };

  const setItemResult = (sectionIndex: number, itemIndex: number, result: CheckResult) => {
    setSections((prev) => {
      const updated = [...prev];
      const section = { ...updated[sectionIndex] };
      const items = [...section.items];
      const item = { ...items[itemIndex], result };
      if (result !== 'fail') {
        item.classification = null;
        item.remedial_action = '';
        item.assigned_to = '';
        item.due_date = '';
        item.nc_status = null;
      } else if (!item.nc_status) {
        item.nc_status = 'open';
      }
      items[itemIndex] = item;
      section.items = items;
      updated[sectionIndex] = section;
      return updated;
    });
  };

  const setItemNotes = (sectionIndex: number, itemIndex: number, notes: string) => {
    setSections((prev) => {
      const updated = [...prev];
      const section = { ...updated[sectionIndex] };
      const items = [...section.items];
      items[itemIndex] = { ...items[itemIndex], notes };
      section.items = items;
      updated[sectionIndex] = section;
      return updated;
    });
  };

  const setItemClassification = (
    sectionIndex: number,
    itemIndex: number,
    classification: NonConformanceClass
  ) => {
    setSections((prev) => {
      const updated = [...prev];
      const section = { ...updated[sectionIndex] };
      const items = [...section.items];
      items[itemIndex] = { ...items[itemIndex], classification };
      section.items = items;
      updated[sectionIndex] = section;
      return updated;
    });
  };

  const setItemRemedialAction = (
    sectionIndex: number,
    itemIndex: number,
    remedial_action: string
  ) => {
    setSections((prev) => {
      const updated = [...prev];
      const section = { ...updated[sectionIndex] };
      const items = [...section.items];
      items[itemIndex] = { ...items[itemIndex], remedial_action };
      section.items = items;
      updated[sectionIndex] = section;
      return updated;
    });
  };

  const setItemAssignedTo = (sectionIndex: number, itemIndex: number, assigned_to: string) => {
    setSections((prev) => {
      const updated = [...prev];
      const section = { ...updated[sectionIndex] };
      const items = [...section.items];
      items[itemIndex] = { ...items[itemIndex], assigned_to };
      section.items = items;
      updated[sectionIndex] = section;
      return updated;
    });
  };

  const setItemDueDate = (sectionIndex: number, itemIndex: number, due_date: string) => {
    setSections((prev) => {
      const updated = [...prev];
      const section = { ...updated[sectionIndex] };
      const items = [...section.items];
      items[itemIndex] = { ...items[itemIndex], due_date };
      section.items = items;
      updated[sectionIndex] = section;
      return updated;
    });
  };

  const toggleSection = (index: number) => {
    setSections((prev) => prev.map((s, i) => (i === index ? { ...s, isOpen: !s.isOpen } : s)));
  };

  const allItems = sections.flatMap((s) => s.items);
  const answeredCount = allItems.filter((i) => i.result !== null).length;
  const passCount = allItems.filter((i) => i.result === 'pass').length;
  const failCount = allItems.filter((i) => i.result === 'fail').length;
  const naCount = allItems.filter((i) => i.result === 'na').length;
  const totalItems = allItems.length;
  const progress = totalItems > 0 ? Math.round((answeredCount / totalItems) * 100) : 0;
  const criticalCount = allItems.filter((i) => i.classification === 'critical').length;
  const majorCount = allItems.filter((i) => i.classification === 'major').length;
  const minorCount = allItems.filter((i) => i.classification === 'minor').length;

  const submitInspection = async () => {
    if (!activeTemplate) return;

    const overallResult: 'pass' | 'fail' | 'advisory' =
      failCount > 0 ? 'fail' : passCount < totalItems - naCount ? 'advisory' : 'pass';

    try {
      await createInspectionRecord.mutateAsync({
        template_id: activeTemplate.id,
        template_title: activeTemplate.title,
        location: location || null,
        inspector_name: inspectorName,
        date: new Date().toISOString().split('T')[0],
        sections: sections as unknown as import('@/integrations/supabase/types').Json,
        overall_result: overallResult,
        pass_count: passCount,
        fail_count: failCount,
        na_count: naCount,
        total_items: totalItems,
        additional_notes: additionalNotes || null,
        photos: photoUrls,
        inspector_signature: inspectorSigData || undefined,
        inspector_signature_name: inspectorSigName.trim() || undefined,
      });

      clearDraft();
      setActiveTemplate(null);
      setSections([]);
      setInspectorName('');
      setLocation('');
      setAdditionalNotes('');
      setInspectorSigName('');
      setInspectorSigDate(new Date().toISOString().split('T')[0]);
      setInspectorSigData('');
      setPhotoUrls([]);
    } catch {
      // error toast handled by hook
    }
  };

  // ─── Active Inspection View ───

  if (activeTemplate) {
    return (
      <div className="bg-background min-h-screen animate-fade-in">
        <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/10">
          <div className="px-4 py-2 flex items-center justify-between">
            <button
              onClick={() => {
                setActiveTemplate(null);
                setSections([]);
              }}
              className="flex items-center gap-2 text-white active:opacity-70 active:scale-[0.98] transition-all touch-manipulation h-11 -ml-2 px-2 rounded-lg"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="text-sm font-medium">Cancel</span>
            </button>
            <div className="flex items-center gap-2">
              <DraftSaveIndicator status={draftStatus} />
              <div className="text-right">
                <p className="text-xs text-white">
                  {answeredCount}/{totalItems} items
                </p>
                <div className="w-20 h-1.5 bg-white/10 rounded-full mt-1">
                  <div
                    className={`h-full rounded-full transition-all ${progress === 100 ? 'bg-green-400' : 'bg-elec-yellow'}`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Draft Recovery Banner */}
        <AnimatePresence>
          {recoveredDraft && (
            <div className="px-4 pt-3">
              <DraftRecoveryBanner onRestore={restoreDraft} onDismiss={dismissDraft} />
            </div>
          )}
        </AnimatePresence>

        <div className="px-4 py-4 space-y-4">
          <div>
            <h1 className="text-lg font-bold text-white">{activeTemplate.title}</h1>
            <p className="text-xs text-white mt-0.5">{activeTemplate.regulation}</p>
          </div>

          {/* Inspector details */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-white text-xs">Inspector</Label>
              <Input
                value={inspectorName}
                onChange={(e) => setInspectorName(e.target.value)}
                className="h-11 text-base touch-manipulation border-white/20 focus:border-yellow-500 focus:ring-yellow-500 mt-1"
                placeholder="Your name"
                autoComplete="name"
              />
            </div>
            <div>
              <Label className="text-white text-xs">Location</Label>
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="h-11 text-base touch-manipulation border-white/20 focus:border-yellow-500 focus:ring-yellow-500 mt-1"
                placeholder="Site / area"
              />
            </div>
          </div>

          {/* Score summary */}
          {answeredCount > 0 && (
            <div className="flex gap-2">
              <div className="flex-1 p-2 rounded-lg bg-green-500/10 text-center">
                <p className="text-lg font-bold text-green-400">{passCount}</p>
                <p className="text-[10px] text-green-300">Pass</p>
              </div>
              <div className="flex-1 p-2 rounded-lg bg-red-500/10 text-center">
                <p className="text-lg font-bold text-red-400">{failCount}</p>
                <p className="text-[10px] text-red-300">Fail</p>
              </div>
              <div className="flex-1 p-2 rounded-lg bg-gray-500/10 text-center">
                <p className="text-lg font-bold text-white">{naCount}</p>
                <p className="text-[10px] text-white">N/A</p>
              </div>
            </div>
          )}

          {/* Sections */}
          <div className="space-y-3 pb-32">
            {sections.map((section, sectionIdx) => {
              const sectionAnswered = section.items.filter((i) => i.result !== null).length;
              const sectionFails = section.items.filter((i) => i.result === 'fail').length;

              return (
                <div
                  key={section.id}
                  className="rounded-xl border border-white/[0.08] bg-white/[0.02] overflow-hidden"
                >
                  <button
                    onClick={() => toggleSection(sectionIdx)}
                    className="w-full flex items-center justify-between p-3 min-h-[48px] touch-manipulation active:bg-white/[0.04]"
                  >
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-white">{section.title}</h3>
                      {sectionFails > 0 && (
                        <Badge className="bg-red-500/15 text-red-400 border-none text-[10px]">
                          {sectionFails} fail
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-white">
                        {sectionAnswered}/{section.items.length}
                      </span>
                      {section.isOpen ? (
                        <ChevronUp className="h-4 w-4 text-white" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-white" />
                      )}
                    </div>
                  </button>

                  {section.isOpen && (
                    <div className="px-3 pb-3 space-y-2">
                      {section.items.map((item, itemIdx) => (
                        <div
                          key={item.id}
                          className={`p-3 rounded-lg border transition-colors ${
                            item.result === 'fail'
                              ? 'border-red-500/20 bg-red-500/5'
                              : item.result === 'pass'
                                ? 'border-green-500/20 bg-green-500/5'
                                : 'border-white/10 bg-white/[0.02]'
                          }`}
                        >
                          <p className="text-sm text-white mb-2">{item.text}</p>
                          <div className="flex gap-1.5">
                            {(['pass', 'fail', 'na'] as const).map((result) => {
                              const config = RESULT_CONFIG[result];
                              const Icon = config.icon;
                              const isActive = item.result === result;
                              return (
                                <button
                                  key={result}
                                  onClick={() =>
                                    setItemResult(sectionIdx, itemIdx, isActive ? null : result)
                                  }
                                  className={`flex-1 flex items-center justify-center gap-1.5 h-11 rounded-lg border touch-manipulation active:scale-[0.97] transition-all ${
                                    isActive
                                      ? `${config.bg} ${config.colour} border-current`
                                      : 'border-white/10 bg-white/[0.03] text-white'
                                  }`}
                                >
                                  <Icon className="h-3.5 w-3.5" />
                                  <span className="text-xs font-semibold">{config.label}</span>
                                </button>
                              );
                            })}
                          </div>
                          {item.result === 'fail' && (
                            <div className="mt-2 space-y-2">
                              {/* Classification */}
                              <div>
                                <p className="text-xs text-white mb-1.5">Classification</p>
                                <div className="flex gap-1.5">
                                  {(['critical', 'major', 'minor'] as const).map((cls) => {
                                    const cfg = CLASSIFICATION_CONFIG[cls];
                                    const isActive = item.classification === cls;
                                    return (
                                      <button
                                        key={cls}
                                        onClick={() =>
                                          setItemClassification(
                                            sectionIdx,
                                            itemIdx,
                                            isActive ? null : cls
                                          )
                                        }
                                        className={`flex-1 flex flex-col items-center justify-center py-2 rounded-lg border touch-manipulation active:scale-[0.97] transition-all ${
                                          isActive
                                            ? `${cfg.bg} ${cfg.colour} ${cfg.border}`
                                            : 'border-white/10 bg-white/[0.03] text-white'
                                        }`}
                                      >
                                        <span className="text-xs font-semibold">{cfg.label}</span>
                                        <span className="text-[10px] mt-0.5 opacity-80">
                                          {cfg.description}
                                        </span>
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                              {/* Defect description */}
                              <Input
                                value={item.notes}
                                onChange={(e) => setItemNotes(sectionIdx, itemIdx, e.target.value)}
                                className="h-11 text-sm touch-manipulation border-red-500/20 focus:border-red-500 focus:ring-red-500/20 bg-transparent"
                                placeholder="Describe the defect or issue..."
                              />
                              {/* Remedial action */}
                              <SmartTextarea
                                value={item.remedial_action}
                                onChange={(val) => setItemRemedialAction(sectionIdx, itemIdx, val)}
                                className="touch-manipulation text-sm min-h-[60px] border-white/20 focus:border-yellow-500 focus:ring-yellow-500/20 bg-transparent"
                                placeholder="Remedial action required..."
                              />
                              {/* Assigned to & due date */}
                              <div className="flex gap-2">
                                <Input
                                  value={item.assigned_to}
                                  onChange={(e) =>
                                    setItemAssignedTo(sectionIdx, itemIdx, e.target.value)
                                  }
                                  className="flex-1 h-11 text-sm touch-manipulation border-white/20 focus:border-yellow-500 focus:ring-yellow-500/20 bg-transparent"
                                  placeholder="Assigned to..."
                                />
                                <Input
                                  type="date"
                                  value={item.due_date}
                                  onChange={(e) =>
                                    setItemDueDate(sectionIdx, itemIdx, e.target.value)
                                  }
                                  className="w-[140px] h-11 text-sm touch-manipulation border-white/20 focus:border-yellow-500 focus:ring-yellow-500/20 bg-transparent"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Non-conformance summary */}
            {failCount > 0 && (
              <div className="p-3 rounded-xl border border-red-500/20 bg-red-500/5">
                <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                  Non-Conformance Summary
                </h4>
                <div className="flex gap-2">
                  {criticalCount > 0 && (
                    <Badge
                      variant="outline"
                      className={`${CLASSIFICATION_CONFIG.critical.badge} text-xs`}
                    >
                      {criticalCount} Critical
                    </Badge>
                  )}
                  {majorCount > 0 && (
                    <Badge
                      variant="outline"
                      className={`${CLASSIFICATION_CONFIG.major.badge} text-xs`}
                    >
                      {majorCount} Major
                    </Badge>
                  )}
                  {minorCount > 0 && (
                    <Badge
                      variant="outline"
                      className={`${CLASSIFICATION_CONFIG.minor.badge} text-xs`}
                    >
                      {minorCount} Minor
                    </Badge>
                  )}
                  {failCount - criticalCount - majorCount - minorCount > 0 && (
                    <Badge variant="outline" className="text-xs border-white/20 text-white">
                      {failCount - criticalCount - majorCount - minorCount} Unclassified
                    </Badge>
                  )}
                </div>
                {criticalCount > 0 && (
                  <p className="text-xs text-red-300 mt-2 font-medium">
                    Critical non-conformance detected — stop work and rectify before proceeding
                  </p>
                )}
              </div>
            )}

            {/* Additional notes */}
            <div>
              <Label className="text-white text-sm">Additional Notes</Label>
              <SmartTextarea
                value={additionalNotes}
                onChange={setAdditionalNotes}
                className="touch-manipulation text-base min-h-[80px] focus:ring-2 focus:ring-elec-yellow/20 border-white/30 focus:border-yellow-500 mt-1"
                placeholder="Any additional observations..."
              />
            </div>

            {/* Defect Evidence Photos */}
            <SafetyPhotoCapture
              photos={photoUrls}
              onPhotosChange={setPhotoUrls}
              label="Defect Evidence Photos"
            />

            {/* Inspector Signature */}
            <SignaturePad
              label="Inspector Signature"
              name={inspectorSigName}
              date={inspectorSigDate}
              signatureDataUrl={inspectorSigData}
              onSignatureChange={setInspectorSigData}
              onNameChange={setInspectorSigName}
              onDateChange={setInspectorSigDate}
            />
          </div>
        </div>

        {/* Submit button */}
        <div className="fixed bottom-0 left-0 right-0 px-4 py-3 bg-background/95 backdrop-blur-sm border-t border-white/10 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <Button
            onClick={submitInspection}
            disabled={answeredCount === 0 || !inspectorName}
            className="w-full h-12 bg-elec-yellow text-black font-bold rounded-xl touch-manipulation active:scale-[0.98] disabled:opacity-50"
          >
            <ClipboardCheck className="h-5 w-5 mr-2" />
            Submit Inspection ({progress}% Complete)
          </Button>
        </div>
      </div>
    );
  }

  // ─── Main List View ───

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="bg-background min-h-screen"
    >
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
          <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
            <ClipboardCheck className="h-6 w-6 text-indigo-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Inspection Checklists</h1>
            <p className="text-sm text-white">Standardised safety inspection forms</p>
          </div>
        </div>

        {/* Start New Inspection */}
        <Button
          onClick={() => setShowTemplates(true)}
          className="w-full h-12 bg-elec-yellow text-black font-bold rounded-xl touch-manipulation active:scale-[0.98]"
        >
          <Plus className="h-5 w-5 mr-2" />
          Start New Inspection
        </Button>

        {/* Completed Inspections */}
        {isLoadingRecords ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 rounded-xl bg-white/[0.05] animate-pulse" />
            ))}
          </div>
        ) : completedInspections.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-white/[0.05] flex items-center justify-center mx-auto mb-4">
              <ClipboardCheck className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">No Inspections Yet</h3>
            <p className="text-sm text-white">Start an inspection to build your records</p>
          </div>
        ) : (
          <div className="space-y-2 pb-20">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Completed Inspections
            </h3>
            {visibleInspections.map((inspection, index) => {
              const template = TEMPLATES.find((t) => t.id === inspection.template_id);
              const Icon = template?.icon || ClipboardCheck;
              const passRate =
                inspection.total_items > 0
                  ? Math.round((inspection.pass_count / inspection.total_items) * 100)
                  : 0;
              return (
                <SafetyRecordCard
                  key={inspection.id}
                  id={inspection.id}
                  title={inspection.template_title}
                  subtitle={inspection.inspector_name || undefined}
                  status={inspection.overall_result || 'pending'}
                  statusLabel={(inspection.overall_result || 'Pending').toUpperCase()}
                  icon={Icon}
                  meta={[
                    { icon: MapPin, label: inspection.location || 'No location' },
                    { icon: Calendar, label: fmtCardDate(inspection.date) },
                    {
                      label: `${inspection.pass_count}P / ${inspection.fail_count}F / ${inspection.na_count}NA — ${passRate}%`,
                    },
                  ]}
                  onTap={() => setViewingInspection(inspection)}
                  pdfType="inspection"
                  index={index}
                />
              );
            })}
            {hasMoreInspections && (
              <LoadMoreButton onLoadMore={loadMoreInspections} remaining={remainingInspections} />
            )}
          </div>
        )}
      </div>

      {/* Template Picker Sheet */}
      <Sheet open={showTemplates} onOpenChange={setShowTemplates}>
        <SheetContent side="bottom" className="h-[75vh] p-0 rounded-t-2xl overflow-hidden">
          <div className="flex flex-col h-full bg-background">
            <div className="px-4 py-3 border-b border-white/10">
              <h2 className="text-base font-bold text-white">Choose Checklist Template</h2>
              <p className="text-xs text-white mt-0.5">Select the type of inspection</p>
            </div>
            <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-3 space-y-2">
              {TEMPLATES.map((template, index) => {
                const Icon = template.icon;
                return (
                  <motion.button
                    key={template.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03, duration: 0.2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => startInspection(template)}
                    className="w-full text-left rounded-xl border border-white/[0.08] bg-white/[0.03] active:bg-white/[0.06] p-4 touch-manipulation"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br ${template.gradient} flex-shrink-0`}
                      >
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[15px] font-bold text-white">{template.title}</h4>
                        <p className="text-xs text-white">{template.description}</p>
                        <p className="text-[10px] text-white mt-0.5">
                          {template.sections.reduce((acc, s) => acc + s.items.length, 0)} check
                          items
                        </p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-white flex-shrink-0" />
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Inspection Detail Sheet */}
      <Sheet open={!!viewingInspection} onOpenChange={() => setViewingInspection(null)}>
        <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
          {viewingInspection && (
            <div className="flex flex-col h-full bg-background">
              <div className="px-4 py-3 border-b border-white/10">
                <h2 className="text-base font-bold text-white">
                  {viewingInspection.template_title}
                </h2>
                <div className="flex items-center gap-2 text-xs text-white mt-1">
                  <User className="h-3 w-3" />
                  <span>{viewingInspection.inspector_name}</span>
                  <span>•</span>
                  <Calendar className="h-3 w-3" />
                  <span>{viewingInspection.date}</span>
                  <span>•</span>
                  <MapPin className="h-3 w-3" />
                  <span>{viewingInspection.location}</span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 space-y-4">
                {/* Result summary */}
                {(() => {
                  const answered = viewingInspection.pass_count + viewingInspection.fail_count;
                  const overallRate =
                    answered > 0 ? Math.round((viewingInspection.pass_count / answered) * 100) : 0;
                  return (
                    <div className="space-y-2">
                      <div className="grid grid-cols-3 gap-2">
                        <div className="p-3 rounded-xl bg-green-500/10 text-center">
                          <p className="text-2xl font-bold text-green-400">
                            {viewingInspection.pass_count}
                          </p>
                          <p className="text-xs text-green-300">Pass</p>
                        </div>
                        <div className="p-3 rounded-xl bg-red-500/10 text-center">
                          <p className="text-2xl font-bold text-red-400">
                            {viewingInspection.fail_count}
                          </p>
                          <p className="text-xs text-red-300">Fail</p>
                        </div>
                        <div className="p-3 rounded-xl bg-gray-500/10 text-center">
                          <p className="text-2xl font-bold text-white">
                            {viewingInspection.na_count}
                          </p>
                          <p className="text-xs text-white">N/A</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-sm text-white">Overall Pass Rate:</span>
                        <span
                          className={`text-lg font-bold ${
                            overallRate >= 80
                              ? 'text-green-400'
                              : overallRate >= 50
                                ? 'text-amber-400'
                                : 'text-red-400'
                          }`}
                        >
                          {overallRate}%
                        </span>
                      </div>
                    </div>
                  );
                })()}

                {/* Failed items with classification */}
                {viewingInspection.fail_count > 0 &&
                  (() => {
                    const failedItems = viewingInspection.sections.flatMap((s) =>
                      s.items.filter((i) => i.result === 'fail')
                    );
                    const viewCritical = failedItems.filter(
                      (i) => i.classification === 'critical'
                    ).length;
                    const viewMajor = failedItems.filter(
                      (i) => i.classification === 'major'
                    ).length;
                    const viewMinor = failedItems.filter(
                      (i) => i.classification === 'minor'
                    ).length;
                    return (
                      <div>
                        <h4 className="text-sm font-bold text-red-400 mb-2 flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4" />
                          Non-Conformances ({failedItems.length})
                        </h4>
                        {(viewCritical > 0 || viewMajor > 0 || viewMinor > 0) && (
                          <div className="flex gap-2 mb-2">
                            {viewCritical > 0 && (
                              <Badge
                                variant="outline"
                                className={`${CLASSIFICATION_CONFIG.critical.badge} text-xs`}
                              >
                                {viewCritical} Critical
                              </Badge>
                            )}
                            {viewMajor > 0 && (
                              <Badge
                                variant="outline"
                                className={`${CLASSIFICATION_CONFIG.major.badge} text-xs`}
                              >
                                {viewMajor} Major
                              </Badge>
                            )}
                            {viewMinor > 0 && (
                              <Badge
                                variant="outline"
                                className={`${CLASSIFICATION_CONFIG.minor.badge} text-xs`}
                              >
                                {viewMinor} Minor
                              </Badge>
                            )}
                          </div>
                        )}
                        <div className="space-y-1.5">
                          {failedItems.map((item) => {
                            const cls = item.classification;
                            const clsCfg = cls ? CLASSIFICATION_CONFIG[cls] : null;
                            return (
                              <div
                                key={item.id}
                                className={`p-2.5 rounded-lg border ${clsCfg ? `${clsCfg.border} ${clsCfg.bg}` : 'border-red-500/20 bg-red-500/5'}`}
                              >
                                <div className="flex items-start justify-between gap-2">
                                  <p className="text-sm text-white">{item.text}</p>
                                  {clsCfg && (
                                    <Badge
                                      variant="outline"
                                      className={`${clsCfg.badge} text-[10px] shrink-0`}
                                    >
                                      {clsCfg.label}
                                    </Badge>
                                  )}
                                </div>
                                {item.notes && (
                                  <p className="text-xs text-red-300 mt-1">{item.notes}</p>
                                )}
                                {item.remedial_action && (
                                  <p className="text-xs text-yellow-300 mt-1">
                                    Remedial action: {item.remedial_action}
                                  </p>
                                )}
                                {(item.assigned_to || item.due_date || item.nc_status) && (
                                  <div className="flex flex-wrap items-center gap-2 mt-1.5">
                                    {item.assigned_to && (
                                      <span className="text-[10px] text-white bg-white/5 px-2 py-0.5 rounded-full">
                                        Assigned: {item.assigned_to}
                                      </span>
                                    )}
                                    {item.due_date && (
                                      <span className="text-[10px] text-white bg-white/5 px-2 py-0.5 rounded-full">
                                        Due: {new Date(item.due_date).toLocaleDateString('en-GB')}
                                      </span>
                                    )}
                                    {item.nc_status && (
                                      <Badge
                                        variant="outline"
                                        className={`text-[10px] ${
                                          item.nc_status === 'closed'
                                            ? 'border-green-500/30 text-green-400'
                                            : item.nc_status === 'in_progress'
                                              ? 'border-amber-500/30 text-amber-400'
                                              : 'border-red-500/30 text-red-400'
                                        }`}
                                      >
                                        {item.nc_status === 'in_progress'
                                          ? 'In Progress'
                                          : item.nc_status.charAt(0).toUpperCase() +
                                            item.nc_status.slice(1)}
                                      </Badge>
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })()}

                {/* All sections with per-section summary */}
                {viewingInspection.sections.map((section) => {
                  const sPass = section.items.filter((i) => i.result === 'pass').length;
                  const sFail = section.items.filter((i) => i.result === 'fail').length;
                  const sNa = section.items.filter((i) => i.result === 'na').length;
                  const sTotal = section.items.length;
                  const sAnswered = sPass + sFail;
                  const sRate = sAnswered > 0 ? Math.round((sPass / sAnswered) * 100) : 0;
                  return (
                    <div key={section.id}>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-bold text-white">{section.title}</h4>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] text-green-400">{sPass}P</span>
                          <span className="text-[10px] text-white">/</span>
                          <span className="text-[10px] text-red-400">{sFail}F</span>
                          <span className="text-[10px] text-white">/</span>
                          <span className="text-[10px] text-white">{sNa}NA</span>
                          {sAnswered > 0 && (
                            <Badge
                              variant="outline"
                              className={`text-[9px] ml-1 ${
                                sRate >= 80
                                  ? 'border-green-500/30 text-green-400'
                                  : sRate >= 50
                                    ? 'border-amber-500/30 text-amber-400'
                                    : 'border-red-500/30 text-red-400'
                              }`}
                            >
                              {sRate}%
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="space-y-1">
                        {section.items.map((item) => {
                          const result = item.result;
                          if (!result) return null;
                          const config = RESULT_CONFIG[result];
                          const ResultIcon = config.icon;
                          return (
                            <div key={item.id} className="flex items-center gap-2 py-1">
                              <ResultIcon
                                className={`h-3.5 w-3.5 ${config.colour} flex-shrink-0`}
                              />
                              <span className="text-xs text-white">{item.text}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}

                {viewingInspection.additional_notes && (
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">Additional Notes</h4>
                    <p className="text-sm text-white">{viewingInspection.additional_notes}</p>
                  </div>
                )}
                {/* Corrective Actions Tracker */}
                <CorrectiveActionsPanel sourceType="inspection" sourceId={viewingInspection.id} />
              </div>
              <div className="px-4 py-3 border-t border-white/10 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    onClick={() => exportPDF('inspection', viewingInspection.id)}
                    disabled={isExporting && exportingId === viewingInspection.id}
                    className="h-11 bg-elec-yellow text-black font-bold rounded-xl touch-manipulation active:scale-[0.98]"
                  >
                    {isExporting && exportingId === viewingInspection.id ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <FileDown className="h-4 w-4 mr-2" />
                    )}
                    Export PDF
                  </Button>
                  <Button
                    onClick={() => setShowShare(true)}
                    variant="outline"
                    className="h-11 border-elec-yellow/20 bg-elec-yellow/10 text-elec-yellow font-bold rounded-xl touch-manipulation active:scale-[0.98]"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {viewingInspection && (
        <SafetyDocumentShare
          open={showShare}
          onClose={() => setShowShare(false)}
          pdfType="inspection"
          recordId={viewingInspection.id}
          documentTitle={`Inspection — ${viewingInspection.equipment_name || viewingInspection.checklist_name}`}
        />
      )}
    </motion.div>
  );
}

export default InspectionChecklists;
