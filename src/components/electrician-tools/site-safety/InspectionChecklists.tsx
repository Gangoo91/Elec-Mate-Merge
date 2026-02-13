import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { toast } from 'sonner';
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
} from 'lucide-react';

// ─── Types ───

type CheckResult = 'pass' | 'fail' | 'na' | null;

interface ChecklistItem {
  id: string;
  text: string;
  result: CheckResult;
  notes: string;
  photo: string | null;
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
];

const RESULT_CONFIG = {
  pass: { icon: CheckCircle2, colour: 'text-green-400', bg: 'bg-green-500/15', label: 'Pass' },
  fail: { icon: XCircle, colour: 'text-red-400', bg: 'bg-red-500/15', label: 'Fail' },
  na: { icon: MinusCircle, colour: 'text-white', bg: 'bg-gray-500/15', label: 'N/A' },
};

// ─── Main Component ───

export function InspectionChecklists({ onBack }: { onBack: () => void }) {
  const [completedInspections, setCompletedInspections] = useState<CompletedInspection[]>([]);
  const [activeTemplate, setActiveTemplate] = useState<ChecklistTemplate | null>(null);
  const [sections, setSections] = useState<ChecklistSection[]>([]);
  const [inspectorName, setInspectorName] = useState('');
  const [location, setLocation] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [viewingInspection, setViewingInspection] = useState<CompletedInspection | null>(null);
  const [showTemplates, setShowTemplates] = useState(false);

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
      items[itemIndex] = { ...items[itemIndex], result };
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

  const submitInspection = () => {
    if (!activeTemplate) return;

    const overallResult: 'pass' | 'fail' | 'advisory' =
      failCount > 0 ? 'fail' : passCount < totalItems - naCount ? 'advisory' : 'pass';

    const inspection: CompletedInspection = {
      id: `insp-${Date.now()}`,
      template_id: activeTemplate.id,
      template_title: activeTemplate.title,
      location,
      inspector_name: inspectorName,
      date: new Date().toISOString().split('T')[0],
      sections,
      overall_result: overallResult,
      pass_count: passCount,
      fail_count: failCount,
      na_count: naCount,
      total_items: totalItems,
      additional_notes: additionalNotes,
      created_at: new Date().toISOString(),
    };

    setCompletedInspections((prev) => [inspection, ...prev]);
    setActiveTemplate(null);
    setSections([]);
    setInspectorName('');
    setLocation('');
    setAdditionalNotes('');
    toast.success(
      `Inspection completed — ${overallResult === 'pass' ? 'PASS' : overallResult === 'fail' ? 'FAIL' : 'ADVISORY'}`
    );
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
                <p className="text-[10px] text-green-300/70">Pass</p>
              </div>
              <div className="flex-1 p-2 rounded-lg bg-red-500/10 text-center">
                <p className="text-lg font-bold text-red-400">{failCount}</p>
                <p className="text-[10px] text-red-300/70">Fail</p>
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
                                  className={`flex-1 flex items-center justify-center gap-1.5 h-10 rounded-lg border touch-manipulation active:scale-[0.97] transition-all ${
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
                            <div className="mt-2">
                              <Input
                                value={item.notes}
                                onChange={(e) => setItemNotes(sectionIdx, itemIdx, e.target.value)}
                                className="h-11 text-sm touch-manipulation border-red-500/20 focus:border-red-500 focus:ring-red-500/20 bg-transparent"
                                placeholder="Describe the defect or issue..."
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Additional notes */}
            <div>
              <Label className="text-white text-sm">Additional Notes</Label>
              <Textarea
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                className="touch-manipulation text-base min-h-[80px] focus:ring-2 focus:ring-elec-yellow/20 border-white/30 focus:border-yellow-500 mt-1"
                placeholder="Any additional observations..."
              />
            </div>
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
        {completedInspections.length === 0 ? (
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
            {completedInspections.map((inspection, index) => {
              const template = TEMPLATES.find((t) => t.id === inspection.template_id);
              const Icon = template?.icon || ClipboardCheck;
              const gradient = template?.gradient || 'from-gray-400 to-gray-500';
              const resultColour =
                inspection.overall_result === 'pass'
                  ? 'text-green-400'
                  : inspection.overall_result === 'fail'
                    ? 'text-red-400'
                    : 'text-amber-400';
              const resultBg =
                inspection.overall_result === 'pass'
                  ? 'bg-green-500/15'
                  : inspection.overall_result === 'fail'
                    ? 'bg-red-500/15'
                    : 'bg-amber-500/15';

              return (
                <motion.button
                  key={inspection.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03, duration: 0.2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setViewingInspection(inspection)}
                  className="w-full text-left rounded-xl border border-white/[0.08] bg-white/[0.03] active:bg-white/[0.06] p-4 touch-manipulation"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br ${gradient} flex-shrink-0`}
                    >
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[15px] font-bold text-white truncate">
                        {inspection.template_title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-white mt-0.5">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate">{inspection.location || 'No location'}</span>
                        <span>•</span>
                        <span>{inspection.date}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge
                          className={`${resultBg} ${resultColour} border-none text-[10px] uppercase font-bold`}
                        >
                          {inspection.overall_result}
                        </Badge>
                        <span className="text-[10px] text-white">
                          {inspection.pass_count}P / {inspection.fail_count}F /{' '}
                          {inspection.na_count}NA
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-white flex-shrink-0" />
                  </div>
                </motion.button>
              );
            })}
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
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-3 rounded-xl bg-green-500/10 text-center">
                    <p className="text-2xl font-bold text-green-400">
                      {viewingInspection.pass_count}
                    </p>
                    <p className="text-xs text-green-300/70">Pass</p>
                  </div>
                  <div className="p-3 rounded-xl bg-red-500/10 text-center">
                    <p className="text-2xl font-bold text-red-400">
                      {viewingInspection.fail_count}
                    </p>
                    <p className="text-xs text-red-300/70">Fail</p>
                  </div>
                  <div className="p-3 rounded-xl bg-gray-500/10 text-center">
                    <p className="text-2xl font-bold text-white">{viewingInspection.na_count}</p>
                    <p className="text-xs text-white">N/A</p>
                  </div>
                </div>

                {/* Failed items */}
                {viewingInspection.fail_count > 0 && (
                  <div>
                    <h4 className="text-sm font-bold text-red-400 mb-2 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      Failed Items
                    </h4>
                    <div className="space-y-1.5">
                      {viewingInspection.sections.flatMap((s) =>
                        s.items
                          .filter((i) => i.result === 'fail')
                          .map((item) => (
                            <div
                              key={item.id}
                              className="p-2.5 rounded-lg border border-red-500/20 bg-red-500/5"
                            >
                              <p className="text-sm text-white">{item.text}</p>
                              {item.notes && (
                                <p className="text-xs text-red-300/70 mt-1">{item.notes}</p>
                              )}
                            </div>
                          ))
                      )}
                    </div>
                  </div>
                )}

                {/* All sections */}
                {viewingInspection.sections.map((section) => (
                  <div key={section.id}>
                    <h4 className="text-sm font-bold text-white mb-2">{section.title}</h4>
                    <div className="space-y-1">
                      {section.items.map((item) => {
                        const result = item.result;
                        if (!result) return null;
                        const config = RESULT_CONFIG[result];
                        const ResultIcon = config.icon;
                        return (
                          <div key={item.id} className="flex items-center gap-2 py-1">
                            <ResultIcon className={`h-3.5 w-3.5 ${config.colour} flex-shrink-0`} />
                            <span className="text-xs text-white">{item.text}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}

                {viewingInspection.additional_notes && (
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">Additional Notes</h4>
                    <p className="text-sm text-white">{viewingInspection.additional_notes}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </motion.div>
  );
}

export default InspectionChecklists;
