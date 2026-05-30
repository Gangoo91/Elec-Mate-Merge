import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

import { useSafetyPDFExport } from '@/hooks/useSafetyPDFExport';
import { useInspectionRecords, useCreateInspectionRecord } from '@/hooks/useInspectionRecords';
import { useLocalDraft } from '@/hooks/useLocalDraft';
import { useShowMore } from '@/hooks/useShowMore';
import type { Json } from '@/integrations/supabase/types';

import { Sheet, SheetContent } from '@/components/ui/sheet';

import {
  PageHero,
  StatStrip,
  FilterBar,
  EmptyState,
  LoadingState,
  Eyebrow,
  Field,
  FormCard,
  SheetShell,
  ListCard,
  ListRow,
  PrimaryButton,
  SecondaryButton,
  inputClass,
  toneAccent,
  type Tone,
} from '@/components/college/primitives';

import { SafetyModuleShell } from './common/SafetyModuleShell';
import { SignatureField } from './common/SignatureField';
import { SafetyPhotoCapture } from './common/SafetyPhotoCapture';
import { SmartTextarea } from './common/SmartTextarea';
import { DraftRecoveryBanner } from './common/DraftRecoveryBanner';
import { DraftSaveIndicator } from './common/DraftSaveIndicator';
import { LoadMoreButton } from './common/LoadMoreButton';
import { SafetyDocumentShare } from './common/SafetyDocumentShare';
import { CorrectiveActionsPanel } from './common/CorrectiveActionsPanel';

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

// ─── Status / classification mapping ───
// Single colour dimension = inspection result / non-conformance severity.

const RESULT_LABEL: Record<Exclude<CheckResult, null>, string> = {
  pass: 'Pass',
  fail: 'Fail',
  na: 'N/A',
};

const RESULT_TONE: Record<Exclude<CheckResult, null>, Tone | 'neutral'> = {
  pass: 'green',
  fail: 'red',
  na: 'neutral',
};

const CLASSIFICATION_CONFIG: Record<
  'critical' | 'major' | 'minor',
  { label: string; description: string; tone: Tone }
> = {
  critical: { label: 'Critical', description: 'Stop work immediately', tone: 'red' },
  major: { label: 'Major', description: 'Rectify within 24 hours', tone: 'orange' },
  minor: { label: 'Minor', description: 'Advisory — rectify when practical', tone: 'amber' },
};

// Overall inspection result → colour dimension.
function resultTone(result: CompletedInspection['overall_result']): Tone {
  if (result === 'fail') return 'red';
  if (result === 'advisory') return 'amber';
  return 'green';
}

const PILL_TONE: Record<'green' | 'amber' | 'red' | 'orange' | 'neutral', string> = {
  green: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25',
  amber: 'bg-amber-500/10 text-amber-400 border-amber-500/25',
  orange: 'bg-orange-500/10 text-orange-400 border-orange-500/25',
  red: 'bg-red-500/10 text-red-400 border-red-500/25',
  neutral: 'bg-white/[0.05] text-white/55 border-white/10',
};

function StatusPill({ children, tone }: { children: React.ReactNode; tone: keyof typeof PILL_TONE }) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-[0.12em] border whitespace-nowrap',
        PILL_TONE[tone]
      )}
    >
      {children}
    </span>
  );
}

const fmtDate = (d?: string | null) =>
  d
    ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    : '—';

// ─── Main Component ───

export function InspectionChecklists({ onBack }: { onBack?: () => void }) {
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

  // View / filter state
  const [filterResult, setFilterResult] = useState<'all' | 'pass' | 'advisory' | 'fail'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredInspections = completedInspections.filter((i) => {
    if (filterResult !== 'all' && i.overall_result !== filterResult) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (
        !i.template_title.toLowerCase().includes(q) &&
        !i.inspector_name.toLowerCase().includes(q) &&
        !i.location.toLowerCase().includes(q)
      )
        return false;
    }
    return true;
  });

  // Fails sort to the top (most urgent), then advisory, then pass — recency within.
  const rank = (r: CompletedInspection['overall_result']) =>
    r === 'fail' ? 0 : r === 'advisory' ? 1 : 2;
  const sortedInspections = [...filteredInspections].sort((a, b) => {
    if (rank(a.overall_result) !== rank(b.overall_result))
      return rank(a.overall_result) - rank(b.overall_result);
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const {
    visible: visibleInspections,
    hasMore: hasMoreInspections,
    remaining: remainingInspections,
    loadMore: loadMoreInspections,
  } = useShowMore(sortedInspections);

  const resultCounts = {
    pass: completedInspections.filter((i) => i.overall_result === 'pass').length,
    advisory: completedInspections.filter((i) => i.overall_result === 'advisory').length,
    fail: completedInspections.filter((i) => i.overall_result === 'fail').length,
  };

  const [activeTemplate, setActiveTemplate] = useState<ChecklistTemplate | null>(null);
  const [sections, setSections] = useState<ChecklistSection[]>([]);
  const [inspectorName, setInspectorName] = useState('');
  const [location, setLocation] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [viewingInspection, setViewingInspection] = useState<CompletedInspection | null>(null);
  const [showTemplates, setShowTemplates] = useState(false);
  const [inspectorSigName, setInspectorSigName] = useState('');
  const [inspectorSigData, setInspectorSigData] = useState('');
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

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
          setOpenSections({ [recoveredDraft.sections[0].id]: true });
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
    const built = template.sections.map((s, si) => ({
      id: `section-${si}`,
      title: s.title,
      isOpen: si === 0,
      items: s.items.map((item, ii) => ({
        id: `item-${si}-${ii}`,
        text: item,
        result: null as CheckResult,
        notes: '',
        photo: null,
        classification: null as NonConformanceClass,
        remedial_action: '',
        assigned_to: '',
        due_date: '',
        nc_status: null as NonConformanceStatus,
      })),
    }));
    setSections(built);
    setOpenSections(built.length > 0 ? { [built[0].id]: true } : {});
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

  const toggleSection = (id: string) =>
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));

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

  const resetInspection = () => {
    setActiveTemplate(null);
    setSections([]);
    setOpenSections({});
    setInspectorName('');
    setLocation('');
    setAdditionalNotes('');
    setInspectorSigName('');
    setInspectorSigData('');
    setPhotoUrls([]);
  };

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
        sections: sections as unknown as Json,
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
      resetInspection();
    } catch {
      // error toast handled by hook
    }
  };

  const overallResultLive: 'pass' | 'fail' | 'advisory' =
    failCount > 0 ? 'fail' : passCount < totalItems - naCount ? 'advisory' : 'pass';

  // ─── Active Inspection View ───

  if (activeTemplate) {
    return (
      <SafetyModuleShell
        onBack={() => {
          resetInspection();
        }}
        backLabel="Cancel"
        moduleName={activeTemplate.title}
        trailing={
          <div className="flex items-center gap-2">
            <DraftSaveIndicator status={draftStatus} />
            <span className="text-[11px] tabular-nums text-white/60">
              {answeredCount}/{totalItems}
            </span>
          </div>
        }
        hero={
          <PageHero
            eyebrow="Inspection in progress"
            title={activeTemplate.title}
            description={activeTemplate.regulation}
            tone={
              answeredCount === 0
                ? 'blue'
                : resultTone(overallResultLive)
            }
          />
        }
      >
        {/* Draft recovery */}
        <AnimatePresence>
          {recoveredDraft && (
            <DraftRecoveryBanner onRestore={restoreDraft} onDismiss={dismissDraft} />
          )}
        </AnimatePresence>

        {/* Progress + score strip */}
        <div className="space-y-3">
          <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
            <motion.div
              className={cn('h-full', progress === 100 ? 'bg-emerald-400' : 'bg-elec-yellow')}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          {answeredCount > 0 && (
            <StatStrip
              columns={3}
              stats={[
                { value: passCount, label: 'Pass', tone: 'green' },
                { value: failCount, label: 'Fail', tone: failCount > 0 ? 'red' : undefined },
                { value: naCount, label: 'N/A' },
              ]}
            />
          )}
        </div>

        {/* Inspector details */}
        <FormCard eyebrow="Inspection details">
          <Field label="Inspector" required>
            <input
              value={inspectorName}
              onChange={(e) => setInspectorName(e.target.value)}
              className={inputClass}
              placeholder="Your name"
              autoComplete="name"
            />
          </Field>
          <Field label="Location">
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={inputClass}
              placeholder="Site / area"
            />
          </Field>
        </FormCard>

        {/* Sections */}
        <div className="space-y-3">
          {sections.map((section, sectionIdx) => {
            const sectionAnswered = section.items.filter((i) => i.result !== null).length;
            const sectionFails = section.items.filter((i) => i.result === 'fail').length;
            const isOpen = openSections[section.id] ?? false;

            return (
              <div
                key={section.id}
                className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between gap-3 px-5 py-4 min-h-[48px] touch-manipulation hover:bg-[hsl(0_0%_15%)] transition-colors"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <h3 className="text-[15px] font-semibold text-white truncate">
                      {section.title}
                    </h3>
                    {sectionFails > 0 && <StatusPill tone="red">{sectionFails} fail</StatusPill>}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] tabular-nums text-white/55">
                      {sectionAnswered}/{section.items.length}
                    </span>
                    <span aria-hidden className="text-white/40 text-sm">
                      {isOpen ? '▲' : '▼'}
                    </span>
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 space-y-2 border-t border-white/[0.06] pt-3">
                    {section.items.map((item, itemIdx) => {
                      const tone =
                        item.result === 'fail'
                          ? 'red'
                          : item.result === 'pass'
                            ? 'green'
                            : undefined;
                      return (
                        <div
                          key={item.id}
                          className={cn(
                            'p-3 rounded-xl border bg-[hsl(0_0%_10%)] transition-colors',
                            tone === 'red'
                              ? 'border-red-500/25'
                              : tone === 'green'
                                ? 'border-emerald-500/25'
                                : 'border-white/[0.06]'
                          )}
                        >
                          <p className="text-[13px] text-white mb-2 leading-relaxed">{item.text}</p>
                          <div className="flex gap-1.5">
                            {(['pass', 'fail', 'na'] as const).map((result) => {
                              const isActive = item.result === result;
                              const rTone = RESULT_TONE[result];
                              const activeClass =
                                rTone === 'green'
                                  ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40'
                                  : rTone === 'red'
                                    ? 'bg-red-500/15 text-red-400 border-red-500/40'
                                    : 'bg-white/[0.08] text-white border-white/25';
                              return (
                                <button
                                  key={result}
                                  onClick={() =>
                                    setItemResult(sectionIdx, itemIdx, isActive ? null : result)
                                  }
                                  className={cn(
                                    'flex-1 flex items-center justify-center h-11 rounded-xl border text-[12.5px] font-semibold touch-manipulation active:scale-[0.97] transition-all',
                                    isActive
                                      ? activeClass
                                      : 'border-white/[0.08] bg-[hsl(0_0%_9%)] text-white/70'
                                  )}
                                >
                                  {RESULT_LABEL[result]}
                                </button>
                              );
                            })}
                          </div>

                          {item.result === 'fail' && (
                            <div className="mt-3 space-y-2.5">
                              {/* Classification */}
                              <div>
                                <Eyebrow className="mb-1.5">Classification</Eyebrow>
                                <div className="flex gap-1.5">
                                  {(['critical', 'major', 'minor'] as const).map((cls) => {
                                    const cfg = CLASSIFICATION_CONFIG[cls];
                                    const isActive = item.classification === cls;
                                    const activeClass =
                                      cfg.tone === 'red'
                                        ? 'bg-red-500/15 text-red-400 border-red-500/40'
                                        : cfg.tone === 'orange'
                                          ? 'bg-orange-500/15 text-orange-400 border-orange-500/40'
                                          : 'bg-amber-500/15 text-amber-400 border-amber-500/40';
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
                                        className={cn(
                                          'flex-1 flex flex-col items-center justify-center py-2 rounded-xl border touch-manipulation active:scale-[0.97] transition-all',
                                          isActive
                                            ? activeClass
                                            : 'border-white/[0.08] bg-[hsl(0_0%_9%)] text-white/70'
                                        )}
                                      >
                                        <span className="text-[12px] font-semibold">{cfg.label}</span>
                                        <span className="text-[10px] mt-0.5 opacity-75 text-center px-1">
                                          {cfg.description}
                                        </span>
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                              {/* Defect description */}
                              <input
                                value={item.notes}
                                onChange={(e) => setItemNotes(sectionIdx, itemIdx, e.target.value)}
                                className={inputClass}
                                placeholder="Describe the defect or issue…"
                              />
                              {/* Remedial action */}
                              <SmartTextarea
                                value={item.remedial_action}
                                onChange={(val) => setItemRemedialAction(sectionIdx, itemIdx, val)}
                                className="touch-manipulation text-[13px] min-h-[60px] bg-[hsl(0_0%_9%)] border-white/[0.08] focus:border-elec-yellow/60 rounded-xl"
                                placeholder="Remedial action required…"
                              />
                              {/* Assigned to & due date */}
                              <div className="flex gap-2">
                                <input
                                  value={item.assigned_to}
                                  onChange={(e) =>
                                    setItemAssignedTo(sectionIdx, itemIdx, e.target.value)
                                  }
                                  className={cn(inputClass, 'flex-1')}
                                  placeholder="Assigned to…"
                                />
                                <input
                                  type="date"
                                  value={item.due_date}
                                  onChange={(e) =>
                                    setItemDueDate(sectionIdx, itemIdx, e.target.value)
                                  }
                                  className={cn(inputClass, 'w-[150px]')}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Non-conformance summary */}
        {failCount > 0 && (
          <FormCard eyebrow="Non-conformance summary">
            <div className="flex flex-wrap gap-1.5">
              {criticalCount > 0 && <StatusPill tone="red">{criticalCount} Critical</StatusPill>}
              {majorCount > 0 && <StatusPill tone="orange">{majorCount} Major</StatusPill>}
              {minorCount > 0 && <StatusPill tone="amber">{minorCount} Minor</StatusPill>}
              {failCount - criticalCount - majorCount - minorCount > 0 && (
                <StatusPill tone="neutral">
                  {failCount - criticalCount - majorCount - minorCount} Unclassified
                </StatusPill>
              )}
            </div>
            {criticalCount > 0 && (
              <p className="text-[12px] text-red-400/90 font-medium">
                Critical non-conformance detected — stop work and rectify before proceeding.
              </p>
            )}
          </FormCard>
        )}

        {/* Additional notes + evidence + signature */}
        <FormCard eyebrow="Sign-off">
          <Field label="Additional notes">
            <SmartTextarea
              value={additionalNotes}
              onChange={setAdditionalNotes}
              className="touch-manipulation text-[13px] min-h-[80px] bg-[hsl(0_0%_9%)] border-white/[0.08] focus:border-elec-yellow/60 rounded-xl"
              placeholder="Any additional observations…"
            />
          </Field>
          <SafetyPhotoCapture
            photos={photoUrls}
            onPhotosChange={setPhotoUrls}
            label="Defect evidence photos"
          />
          <Field label="Inspector name">
            <input
              value={inspectorSigName}
              onChange={(e) => setInspectorSigName(e.target.value)}
              className={inputClass}
              placeholder="Name on signature"
              autoComplete="name"
            />
          </Field>
          <SignatureField
            label="Inspector signature"
            value={inspectorSigData}
            onChange={setInspectorSigData}
          />
        </FormCard>

        {/* Sticky submit */}
        <div className="sticky bottom-0 -mx-4 px-4 py-3 bg-elec-dark/95 backdrop-blur-sm border-t border-white/[0.06] pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <PrimaryButton
            fullWidth
            size="lg"
            onClick={submitInspection}
            disabled={answeredCount === 0 || !inspectorName || createInspectionRecord.isPending}
          >
            {createInspectionRecord.isPending
              ? 'Saving…'
              : `Submit inspection (${progress}% complete)`}
          </PrimaryButton>
        </div>
      </SafetyModuleShell>
    );
  }

  // ─── Main List View ───

  return (
    <SafetyModuleShell
      onBack={onBack ?? (() => {})}
      moduleName="Inspection Checklists"
      hero={
        <PageHero
          eyebrow="Inspection Checklists"
          title="Run standardised safety inspections"
          description="Workplace, scaffold, electrical, fire and BS 7671 check sheets — record pass / fail / N/A results, classify non-conformances and track them to close-out."
          tone="indigo"
          actions={<PrimaryButton onClick={() => setShowTemplates(true)}>Start inspection</PrimaryButton>}
        />
      }
      stats={
        completedInspections.length > 0 ? (
          <StatStrip
            stats={[
              { value: completedInspections.length, label: 'Total', accent: true, onClick: () => setFilterResult('all') },
              { value: resultCounts.pass, label: 'Pass', tone: 'green', onClick: () => setFilterResult('pass') },
              { value: resultCounts.advisory, label: 'Advisory', tone: 'amber', onClick: () => setFilterResult('advisory') },
              { value: resultCounts.fail, label: 'Fail', tone: resultCounts.fail > 0 ? 'red' : undefined, onClick: () => setFilterResult('fail') },
            ]}
          />
        ) : undefined
      }
      filter={
        completedInspections.length > 0 ? (
          <FilterBar
            tabs={[
              { value: 'all', label: 'All', count: completedInspections.length },
              { value: 'pass', label: 'Pass', count: resultCounts.pass },
              { value: 'advisory', label: 'Advisory', count: resultCounts.advisory },
              { value: 'fail', label: 'Fail', count: resultCounts.fail },
            ]}
            activeTab={filterResult}
            onTabChange={(v) => setFilterResult(v as typeof filterResult)}
            search={searchQuery}
            onSearchChange={setSearchQuery}
            searchPlaceholder="Search inspections…"
          />
        ) : undefined
      }
    >
      {isLoadingRecords ? (
        <LoadingState />
      ) : completedInspections.length === 0 ? (
        <EmptyState
          title="No inspections yet"
          description="Start an inspection to build your records — pick a template and we'll pre-fill the standard check items and regulation reference."
          action="Start inspection"
          onAction={() => setShowTemplates(true)}
        />
      ) : filteredInspections.length === 0 ? (
        <EmptyState title="No inspections match your filter" description="Try a different result tab or clear your search." />
      ) : (
        <div className="space-y-3">
          <ListCard>
            {visibleInspections.map((inspection) => {
              const tone = resultTone(inspection.overall_result);
              const pillTone: keyof typeof PILL_TONE =
                inspection.overall_result === 'fail'
                  ? 'red'
                  : inspection.overall_result === 'advisory'
                    ? 'amber'
                    : 'green';
              const passRate =
                inspection.total_items > 0
                  ? Math.round((inspection.pass_count / inspection.total_items) * 100)
                  : 0;
              return (
                <ListRow
                  key={inspection.id}
                  onClick={() => setViewingInspection(inspection)}
                  accent={tone}
                  title={inspection.template_title}
                  subtitle={`${inspection.inspector_name || 'Unknown'} · ${inspection.location || 'No location'}`}
                  trailing={
                    <div className="flex flex-col items-end gap-1">
                      <StatusPill tone={pillTone}>
                        {inspection.overall_result.toUpperCase()}
                      </StatusPill>
                      <span className="text-[11px] tabular-nums text-white/45">
                        {inspection.pass_count}P · {inspection.fail_count}F · {passRate}%
                      </span>
                    </div>
                  }
                />
              );
            })}
          </ListCard>
          {hasMoreInspections && (
            <LoadMoreButton onLoadMore={loadMoreInspections} remaining={remainingInspections} />
          )}
        </div>
      )}

      {/* ─── Template picker ─── */}
      <Sheet open={showTemplates} onOpenChange={setShowTemplates}>
        <SheetContent side="bottom" className="h-[80vh] p-0 rounded-t-2xl overflow-hidden border-white/[0.08]">
          <SheetShell
            eyebrow="New inspection"
            title="Choose a checklist template"
            description="Select the type of inspection to run."
          >
            <ListCard>
              {TEMPLATES.map((template, i) => {
                const itemCount = template.sections.reduce((acc, s) => acc + s.items.length, 0);
                return (
                  <ListRow
                    key={template.id}
                    onClick={() => startInspection(template)}
                    lead={
                      <span className="text-[11px] font-medium tabular-nums text-elec-yellow/80 w-6">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    }
                    title={template.title}
                    subtitle={`${template.description} · ${itemCount} check items`}
                    trailing={<span aria-hidden className="text-elec-yellow/80">→</span>}
                  />
                );
              })}
            </ListCard>
          </SheetShell>
        </SheetContent>
      </Sheet>

      {/* ─── Inspection detail ─── */}
      <Sheet open={!!viewingInspection} onOpenChange={() => setViewingInspection(null)}>
        <SheetContent side="bottom" className="h-[90vh] p-0 rounded-t-2xl overflow-hidden border-white/[0.08]">
          {viewingInspection &&
            (() => {
              const detailTone = resultTone(viewingInspection.overall_result);
              const pillTone: keyof typeof PILL_TONE =
                viewingInspection.overall_result === 'fail'
                  ? 'red'
                  : viewingInspection.overall_result === 'advisory'
                    ? 'amber'
                    : 'green';
              const answered = viewingInspection.pass_count + viewingInspection.fail_count;
              const overallRate =
                answered > 0 ? Math.round((viewingInspection.pass_count / answered) * 100) : 0;
              const failedItems = viewingInspection.sections.flatMap((s) =>
                s.items.filter((i) => i.result === 'fail')
              );
              const viewCritical = failedItems.filter((i) => i.classification === 'critical').length;
              const viewMajor = failedItems.filter((i) => i.classification === 'major').length;
              const viewMinor = failedItems.filter((i) => i.classification === 'minor').length;
              return (
                <SheetShell
                  eyebrow={`Inspection · ${fmtDate(viewingInspection.date)}`}
                  title={viewingInspection.template_title}
                  description={
                    <span className="inline-flex items-center gap-2">
                      <StatusPill tone={pillTone}>
                        {viewingInspection.overall_result.toUpperCase()}
                      </StatusPill>
                      <span className="text-[12px] text-white/65">
                        {viewingInspection.inspector_name || 'Unknown'}
                        {viewingInspection.location ? ` · ${viewingInspection.location}` : ''}
                      </span>
                    </span>
                  }
                  footer={
                    <>
                      <PrimaryButton
                        fullWidth
                        disabled={isExporting && exportingId === viewingInspection.id}
                        onClick={() => exportPDF('inspection', viewingInspection.id)}
                      >
                        {isExporting && exportingId === viewingInspection.id
                          ? 'Exporting…'
                          : 'Export PDF'}
                      </PrimaryButton>
                      <SecondaryButton onClick={() => setShowShare(true)}>Share</SecondaryButton>
                    </>
                  }
                >
                  {/* Result accent line — bleeds to the sheet edges */}
                  <div className={cn('-mx-5 -mt-5 mb-1 h-0.5 bg-gradient-to-r', toneAccent[detailTone])} />

                  {/* Result summary */}
                  <StatStrip
                    columns={3}
                    stats={[
                      { value: viewingInspection.pass_count, label: 'Pass', tone: 'green' },
                      { value: viewingInspection.fail_count, label: 'Fail', tone: viewingInspection.fail_count > 0 ? 'red' : undefined },
                      { value: viewingInspection.na_count, label: 'N/A' },
                    ]}
                  />
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-[12.5px] text-white/65">Overall pass rate</span>
                    <span
                      className={cn(
                        'text-lg font-semibold tabular-nums',
                        overallRate >= 80
                          ? 'text-emerald-400'
                          : overallRate >= 50
                            ? 'text-amber-400'
                            : 'text-red-400'
                      )}
                    >
                      {overallRate}%
                    </span>
                  </div>

                  {/* Failed items / non-conformances */}
                  {failedItems.length > 0 && (
                    <div>
                      <Eyebrow className="mb-2">Non-conformances ({failedItems.length})</Eyebrow>
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {viewCritical > 0 && <StatusPill tone="red">{viewCritical} Critical</StatusPill>}
                        {viewMajor > 0 && <StatusPill tone="orange">{viewMajor} Major</StatusPill>}
                        {viewMinor > 0 && <StatusPill tone="amber">{viewMinor} Minor</StatusPill>}
                      </div>
                      <ListCard>
                        {failedItems.map((item) => {
                          const cls = item.classification;
                          const clsCfg = cls ? CLASSIFICATION_CONFIG[cls] : null;
                          return (
                            <div key={item.id} className="px-5 py-3">
                              <div className="flex items-start justify-between gap-2">
                                <p className="text-[13px] text-white">{item.text}</p>
                                {clsCfg && (
                                  <span className="shrink-0">
                                    <StatusPill
                                      tone={clsCfg.tone === 'amber' ? 'amber' : clsCfg.tone === 'orange' ? 'orange' : 'red'}
                                    >
                                      {clsCfg.label}
                                    </StatusPill>
                                  </span>
                                )}
                              </div>
                              {item.notes && (
                                <p className="text-[12px] text-red-400/85 mt-1">{item.notes}</p>
                              )}
                              {item.remedial_action && (
                                <p className="text-[12px] text-amber-400/85 mt-1">
                                  Remedial action: {item.remedial_action}
                                </p>
                              )}
                              {(item.assigned_to || item.due_date || item.nc_status) && (
                                <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                                  {item.assigned_to && (
                                    <span className="text-[10px] text-white/70 bg-white/[0.05] px-2 py-0.5 rounded-full border border-white/10">
                                      Assigned: {item.assigned_to}
                                    </span>
                                  )}
                                  {item.due_date && (
                                    <span className="text-[10px] text-white/70 bg-white/[0.05] px-2 py-0.5 rounded-full border border-white/10">
                                      Due: {new Date(item.due_date).toLocaleDateString('en-GB')}
                                    </span>
                                  )}
                                  {item.nc_status && (
                                    <StatusPill
                                      tone={
                                        item.nc_status === 'closed'
                                          ? 'green'
                                          : item.nc_status === 'in_progress'
                                            ? 'amber'
                                            : 'red'
                                      }
                                    >
                                      {item.nc_status === 'in_progress'
                                        ? 'In Progress'
                                        : item.nc_status.charAt(0).toUpperCase() + item.nc_status.slice(1)}
                                    </StatusPill>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </ListCard>
                    </div>
                  )}

                  {/* All sections with per-section summary */}
                  {viewingInspection.sections.map((section) => {
                    const sPass = section.items.filter((i) => i.result === 'pass').length;
                    const sFail = section.items.filter((i) => i.result === 'fail').length;
                    const sNa = section.items.filter((i) => i.result === 'na').length;
                    const sAnswered = sPass + sFail;
                    const sRate = sAnswered > 0 ? Math.round((sPass / sAnswered) * 100) : 0;
                    return (
                      <div key={section.id}>
                        <div className="flex items-center justify-between mb-2 gap-2">
                          <Eyebrow>{section.title}</Eyebrow>
                          <div className="flex items-center gap-1.5 text-[10px] tabular-nums shrink-0">
                            <span className="text-emerald-400">{sPass}P</span>
                            <span className="text-white/40">/</span>
                            <span className="text-red-400">{sFail}F</span>
                            <span className="text-white/40">/</span>
                            <span className="text-white/55">{sNa}NA</span>
                            {sAnswered > 0 && (
                              <StatusPill
                                tone={sRate >= 80 ? 'green' : sRate >= 50 ? 'amber' : 'red'}
                              >
                                {sRate}%
                              </StatusPill>
                            )}
                          </div>
                        </div>
                        <ListCard>
                          {section.items.map((item) => {
                            const result = item.result;
                            if (!result) return null;
                            const itemPillTone: keyof typeof PILL_TONE =
                              result === 'pass' ? 'green' : result === 'fail' ? 'red' : 'neutral';
                            return (
                              <div
                                key={item.id}
                                className="flex items-center justify-between gap-3 px-5 py-2.5"
                              >
                                <span className="text-[12.5px] text-white/85">{item.text}</span>
                                <span className="shrink-0">
                                  <StatusPill tone={itemPillTone}>{RESULT_LABEL[result]}</StatusPill>
                                </span>
                              </div>
                            );
                          })}
                        </ListCard>
                      </div>
                    );
                  })}

                  {viewingInspection.additional_notes && (
                    <div>
                      <Eyebrow className="mb-1.5">Additional notes</Eyebrow>
                      <p className="text-[13px] text-white/85 leading-relaxed">
                        {viewingInspection.additional_notes}
                      </p>
                    </div>
                  )}

                  {/* Corrective actions tracker */}
                  <CorrectiveActionsPanel sourceType="inspection" sourceId={viewingInspection.id} />
                </SheetShell>
              );
            })()}
        </SheetContent>
      </Sheet>

      {viewingInspection && (
        <SafetyDocumentShare
          open={showShare}
          onClose={() => setShowShare(false)}
          pdfType="inspection"
          recordId={viewingInspection.id}
          documentTitle={`Inspection — ${viewingInspection.template_title}`}
        />
      )}
    </SafetyModuleShell>
  );
}

export default InspectionChecklists;
