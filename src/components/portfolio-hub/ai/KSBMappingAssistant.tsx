import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import {
  Brain,
  Search,
  CheckCircle2,
  Circle,
  ChevronRight,
  Target,
  Award,
  BookOpen,
  Users,
  Shield,
  Wrench,
  Zap,
  ClipboardCheck,
  AlertTriangle,
} from 'lucide-react';

/**
 * KSB Mapping Assistant
 *
 * Interactive component to help apprentices understand and track
 * their progress against KSB (Knowledge, Skills, Behaviours) criteria
 */

interface KSBItem {
  code: string;
  category: 'knowledge' | 'skill' | 'behaviour';
  group: string;
  description: string;
  shortDesc: string;
  evidenceHints: string[];
}

interface KSBMappingAssistantProps {
  selectedKSBs?: string[];
  completedKSBs?: string[];
  onSelectKSB?: (code: string) => void;
  onDeselectKSB?: (code: string) => void;
  compact?: boolean;
}

// Complete KSB data for UK Electrical Installation Apprenticeship
const KSB_DATA: KSBItem[] = [
  // Panel Building
  { code: 'PB1', category: 'skill', group: 'Panel Building', description: 'Select and install enclosures and mounting systems', shortDesc: 'Enclosures & mounting', evidenceHints: ['Photo of panel layout', 'DIN rail installation', 'Backplate mounting'] },
  { code: 'PB2', category: 'skill', group: 'Panel Building', description: 'Install busbars and distribution systems', shortDesc: 'Busbars & distribution', evidenceHints: ['Busbar connections', 'Distribution setup', 'Phase arrangement'] },
  { code: 'PB3', category: 'skill', group: 'Panel Building', description: 'Install circuit protection devices (MCBs, RCBOs, RCDs)', shortDesc: 'Protection devices', evidenceHints: ['MCB installation', 'RCBO wiring', 'Device labelling'] },
  { code: 'PB4', category: 'skill', group: 'Panel Building', description: 'Wire and terminate panel components', shortDesc: 'Panel wiring', evidenceHints: ['Terminal connections', 'Cable routing', 'Ferrule application'] },
  { code: 'PB5', category: 'skill', group: 'Panel Building', description: 'Label and document panel installations', shortDesc: 'Labelling & docs', evidenceHints: ['Circuit schedule', 'Warning labels', 'Documentation pack'] },

  // Wiring Systems
  { code: 'WS1', category: 'skill', group: 'Wiring Systems', description: 'Install cable containment systems (trunking, tray, conduit)', shortDesc: 'Containment systems', evidenceHints: ['Trunking runs', 'Conduit bending', 'Cable tray supports'] },
  { code: 'WS2', category: 'skill', group: 'Wiring Systems', description: 'Install cables in containment systems', shortDesc: 'Cable installation', evidenceHints: ['Cable pulling', 'Fill ratios', 'Cable support'] },
  { code: 'WS3', category: 'skill', group: 'Wiring Systems', description: 'Install and terminate SWA cables', shortDesc: 'SWA cables', evidenceHints: ['Gland termination', 'Armour bonding', 'Earth continuity'] },
  { code: 'WS4', category: 'skill', group: 'Wiring Systems', description: 'Install wiring accessories (sockets, switches, FCUs)', shortDesc: 'Accessories', evidenceHints: ['Socket installation', 'Switch fitting', 'FCU wiring'] },
  { code: 'WS5', category: 'skill', group: 'Wiring Systems', description: 'Install final circuits (ring, radial, lighting)', shortDesc: 'Final circuits', evidenceHints: ['Ring final circuit', 'Radial circuit', 'Lighting circuit'] },

  // Fault Finding
  { code: 'FF1', category: 'skill', group: 'Fault Finding', description: 'Identify symptoms and causes of faults', shortDesc: 'Fault identification', evidenceHints: ['Fault report', 'Symptom analysis', 'Root cause'] },
  { code: 'FF2', category: 'skill', group: 'Fault Finding', description: 'Apply safe isolation procedures', shortDesc: 'Safe isolation', evidenceHints: ['Lock-off procedure', 'Prove dead test', 'Isolation certificate'] },
  { code: 'FF3', category: 'skill', group: 'Fault Finding', description: 'Use test instruments for fault finding', shortDesc: 'Test instruments', evidenceHints: ['Multimeter use', 'Insulation test', 'Continuity test'] },
  { code: 'FF4', category: 'skill', group: 'Fault Finding', description: 'Repair and rectify electrical faults', shortDesc: 'Fault repair', evidenceHints: ['Repair evidence', 'Before/after photos', 'Component replacement'] },
  { code: 'FF5', category: 'skill', group: 'Fault Finding', description: 'Document faults and repairs', shortDesc: 'Fault documentation', evidenceHints: ['Fault log', 'Repair report', 'Handover notes'] },

  // Testing
  { code: 'TS1', category: 'skill', group: 'Testing', description: 'Conduct visual inspections', shortDesc: 'Visual inspection', evidenceHints: ['Inspection checklist', 'Photo evidence', 'Observation notes'] },
  { code: 'TS2', category: 'skill', group: 'Testing', description: 'Test continuity of protective conductors', shortDesc: 'Continuity testing', evidenceHints: ['R1+R2 results', 'CPC test', 'Test sheet'] },
  { code: 'TS3', category: 'skill', group: 'Testing', description: 'Test insulation resistance', shortDesc: 'Insulation testing', evidenceHints: ['IR test results', 'Megger readings', '500V test'] },
  { code: 'TS4', category: 'skill', group: 'Testing', description: 'Verify polarity', shortDesc: 'Polarity check', evidenceHints: ['Polarity test', 'Phase rotation', 'Correct termination'] },
  { code: 'TS5', category: 'skill', group: 'Testing', description: 'Measure earth fault loop impedance', shortDesc: 'Loop impedance', evidenceHints: ['Zs results', 'Ze measurement', 'Loop test'] },
  { code: 'TS6', category: 'skill', group: 'Testing', description: 'Test RCD operation', shortDesc: 'RCD testing', evidenceHints: ['Trip time test', 'Ramp test', '30mA check'] },
  { code: 'TS7', category: 'skill', group: 'Testing', description: 'Complete electrical certificates (EICR, EIC, Minor Works)', shortDesc: 'Certification', evidenceHints: ['Completed certificate', 'Schedule of test', 'Observations'] },

  // Safe Working
  { code: 'SW1', category: 'skill', group: 'Safe Working', description: 'Conduct risk assessments', shortDesc: 'Risk assessment', evidenceHints: ['Risk assessment form', 'Hazard identification', 'Control measures'] },
  { code: 'SW2', category: 'skill', group: 'Safe Working', description: 'Select and use appropriate PPE', shortDesc: 'PPE selection', evidenceHints: ['PPE photo', 'Selection rationale', 'Inspection records'] },
  { code: 'SW3', category: 'skill', group: 'Safe Working', description: 'Work within permit systems', shortDesc: 'Permit to work', evidenceHints: ['Permit form', 'Sign-off', 'Compliance evidence'] },
  { code: 'SW4', category: 'skill', group: 'Safe Working', description: 'Apply working at height procedures', shortDesc: 'Working at height', evidenceHints: ['Method statement', 'Equipment inspection', 'Safety measures'] },

  // EPA Knowledge
  { code: 'K1', category: 'knowledge', group: 'EPA Knowledge', description: 'Apply electrical principles (Ohms law, power calculations)', shortDesc: 'Electrical principles', evidenceHints: ['Calculations', 'Theory notes', 'Exam results'] },
  { code: 'K2', category: 'knowledge', group: 'EPA Knowledge', description: 'Apply wiring regulations (BS 7671)', shortDesc: 'Wiring regulations', evidenceHints: ['Regulation reference', 'Compliance check', 'Application notes'] },
  { code: 'K3', category: 'knowledge', group: 'EPA Knowledge', description: 'Apply installation design principles', shortDesc: 'Design principles', evidenceHints: ['Design calculation', 'Cable sizing', 'Adiabatic equation'] },
  { code: 'K4', category: 'knowledge', group: 'EPA Knowledge', description: 'Apply environmental awareness', shortDesc: 'Environmental', evidenceHints: ['Sustainability notes', 'Waste management', 'Energy efficiency'] },
  { code: 'K5', category: 'knowledge', group: 'EPA Knowledge', description: 'Apply health and safety legislation', shortDesc: 'H&S legislation', evidenceHints: ['Legislation notes', 'COSHH', 'EAWR application'] },

  // EPA Behaviours
  { code: 'B1', category: 'behaviour', group: 'EPA Behaviours', description: 'Communicate effectively with stakeholders', shortDesc: 'Communication', evidenceHints: ['Customer interaction', 'Team meeting', 'Written report'] },
  { code: 'B2', category: 'behaviour', group: 'EPA Behaviours', description: 'Demonstrate professional conduct', shortDesc: 'Professional conduct', evidenceHints: ['Punctuality record', 'Dress code', 'Workplace behaviour'] },
  { code: 'B3', category: 'behaviour', group: 'EPA Behaviours', description: 'Work effectively in a team', shortDesc: 'Teamwork', evidenceHints: ['Team project', 'Collaboration', 'Support given'] },
  { code: 'B4', category: 'behaviour', group: 'EPA Behaviours', description: 'Apply problem-solving skills', shortDesc: 'Problem solving', evidenceHints: ['Problem solved', 'Initiative shown', 'Solution found'] },
  { code: 'B5', category: 'behaviour', group: 'EPA Behaviours', description: 'Demonstrate commitment to quality', shortDesc: 'Quality commitment', evidenceHints: ['Quality check', 'Attention to detail', 'Rework avoided'] },
];

const GROUP_ICONS: Record<string, typeof Brain> = {
  'Panel Building': Zap,
  'Wiring Systems': Wrench,
  'Fault Finding': AlertTriangle,
  'Testing': ClipboardCheck,
  'Safe Working': Shield,
  'EPA Knowledge': BookOpen,
  'EPA Behaviours': Users,
};

const CATEGORY_COLORS = {
  knowledge: 'bg-blue-500/20 text-blue-500 border-blue-500/30',
  skill: 'bg-green-500/20 text-green-500 border-green-500/30',
  behaviour: 'bg-purple-500/20 text-purple-500 border-purple-500/30',
};

export function KSBMappingAssistant({
  selectedKSBs = [],
  completedKSBs = [],
  onSelectKSB,
  onDeselectKSB,
  compact = false,
}: KSBMappingAssistantProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'knowledge' | 'skill' | 'behaviour'>('all');

  // Group KSBs by their group
  const groupedKSBs = useMemo(() => {
    const groups: Record<string, KSBItem[]> = {};
    KSB_DATA.forEach(item => {
      if (!groups[item.group]) groups[item.group] = [];
      groups[item.group].push(item);
    });
    return groups;
  }, []);

  // Filter KSBs based on search and category
  const filteredKSBs = useMemo(() => {
    return KSB_DATA.filter(item => {
      const matchesSearch = searchTerm === '' ||
        item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.shortDesc.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  // Calculate progress
  const totalKSBs = KSB_DATA.length;
  const completedCount = completedKSBs.length;
  const progressPercent = Math.round((completedCount / totalKSBs) * 100);

  // Category counts
  const categoryCounts = useMemo(() => {
    return {
      knowledge: KSB_DATA.filter(k => k.category === 'knowledge').length,
      skill: KSB_DATA.filter(k => k.category === 'skill').length,
      behaviour: KSB_DATA.filter(k => k.category === 'behaviour').length,
    };
  }, []);

  const toggleKSB = (code: string) => {
    if (selectedKSBs.includes(code)) {
      onDeselectKSB?.(code);
    } else {
      onSelectKSB?.(code);
    }
  };

  if (compact) {
    return (
      <Card className="border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Brain className="h-4 w-4 text-elec-yellow" />
            KSB Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <Progress value={progressPercent} className="h-2 flex-1" />
            <span className="text-sm font-medium text-foreground">{progressPercent}%</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {completedCount}/{totalKSBs} criteria evidenced
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-elec-yellow" />
          KSB Mapping Assistant
          <Badge variant="outline" className="ml-auto">
            {completedCount}/{totalKSBs}
          </Badge>
        </CardTitle>
        <CardDescription>
          Track your progress against Knowledge, Skills, and Behaviours criteria
        </CardDescription>

        {/* Progress Bar */}
        <div className="mt-3 space-y-2">
          <Progress value={progressPercent} className="h-3" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{progressPercent}% Complete</span>
            <span>{totalKSBs - completedCount} remaining</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Search and Filter */}
        <div className="space-y-3">
          <div className="relative">
            {!searchTerm && (
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            )}
            <Input
              placeholder="Search KSB criteria..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={cn(!searchTerm && "pl-9")}
            />
          </div>

          {/* Category Filters */}
          <div className="flex gap-2 flex-wrap">
            <Button
              size="sm"
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('all')}
              className="h-9 text-xs touch-manipulation active:scale-95"
            >
              All ({totalKSBs})
            </Button>
            <Button
              size="sm"
              variant={selectedCategory === 'knowledge' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('knowledge')}
              className={cn("h-9 text-xs touch-manipulation active:scale-95", selectedCategory === 'knowledge' && "bg-blue-500")}
            >
              <BookOpen className="h-3 w-3 mr-1" />
              Knowledge ({categoryCounts.knowledge})
            </Button>
            <Button
              size="sm"
              variant={selectedCategory === 'skill' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('skill')}
              className={cn("h-9 text-xs touch-manipulation active:scale-95", selectedCategory === 'skill' && "bg-green-500")}
            >
              <Target className="h-3 w-3 mr-1" />
              Skills ({categoryCounts.skill})
            </Button>
            <Button
              size="sm"
              variant={selectedCategory === 'behaviour' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('behaviour')}
              className={cn("h-9 text-xs touch-manipulation active:scale-95", selectedCategory === 'behaviour' && "bg-purple-500")}
            >
              <Users className="h-3 w-3 mr-1" />
              Behaviours ({categoryCounts.behaviour})
            </Button>
          </div>
        </div>

        {/* KSB Groups */}
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-3">
            {Object.entries(groupedKSBs).map(([group, items]) => {
              const filteredItems = items.filter(item => filteredKSBs.includes(item));
              if (filteredItems.length === 0) return null;

              const GroupIcon = GROUP_ICONS[group] || Brain;
              const completedInGroup = filteredItems.filter(i => completedKSBs.includes(i.code)).length;
              const isExpanded = expandedGroup === group;

              return (
                <div key={group} className="border border-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setExpandedGroup(isExpanded ? null : group)}
                    className="w-full flex items-center justify-between p-3 hover:bg-muted/50 transition-colors touch-manipulation active:bg-muted/70"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-elec-yellow/10 flex items-center justify-center">
                        <GroupIcon className="h-4 w-4 text-elec-yellow" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-medium text-foreground">{group}</p>
                        <p className="text-xs text-muted-foreground">
                          {completedInGroup}/{filteredItems.length} completed
                        </p>
                      </div>
                    </div>
                    <ChevronRight className={cn(
                      "h-4 w-4 text-muted-foreground transition-transform",
                      isExpanded && "rotate-90"
                    )} />
                  </button>

                  {isExpanded && (
                    <div className="border-t border-border divide-y divide-border">
                      {filteredItems.map((item) => {
                        const isSelected = selectedKSBs.includes(item.code);
                        const isCompleted = completedKSBs.includes(item.code);

                        return (
                          <div
                            key={item.code}
                            className={cn(
                              "p-3 transition-colors cursor-pointer touch-manipulation active:bg-muted/50",
                              isSelected && "bg-elec-yellow/10",
                              isCompleted && "bg-green-500/5"
                            )}
                            onClick={() => toggleKSB(item.code)}
                          >
                            <div className="flex items-start gap-3">
                              <div className="mt-0.5 shrink-0">
                                {isCompleted ? (
                                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                                ) : isSelected ? (
                                  <CheckCircle2 className="h-5 w-5 text-elec-yellow" />
                                ) : (
                                  <Circle className="h-5 w-5 text-muted-foreground" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap mb-1">
                                  <Badge variant="outline" className="font-mono text-xs">
                                    {item.code}
                                  </Badge>
                                  <Badge
                                    variant="outline"
                                    className={cn("text-xs capitalize", CATEGORY_COLORS[item.category])}
                                  >
                                    {item.category}
                                  </Badge>
                                </div>
                                <p className="text-sm text-foreground">{item.description}</p>
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {item.evidenceHints.map((hint, i) => (
                                    <Badge
                                      key={i}
                                      variant="secondary"
                                      className="text-[10px] bg-muted"
                                    >
                                      {hint}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

export default KSBMappingAssistant;
