/**
 * KSBCoverageMap
 *
 * Visual Knowledge, Skills, and Behaviours coverage map for apprentices.
 * Mobile-first bottom sheet design.
 */

import { useState, useMemo } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Brain,
  Wrench,
  Heart,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  FileText,
  Loader2,
  Target,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useKSBTracking } from '@/hooks/qualification/useKSBTracking';
import { useQualifications } from '@/hooks/qualification/useQualifications';
import type { ApprenticeshipKSB, UserKSBProgress, KSBType } from '@/types/qualification';

interface KSBCoverageMapProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function KSBCoverageMap({ open, onOpenChange }: KSBCoverageMapProps) {
  const { userSelection } = useQualifications();
  const qualificationId = userSelection?.qualification_id;

  const {
    ksbs,
    progress,
    isLoading,
    getKSBProgress,
    knowledge,
    skills,
    behaviours,
  } = useKSBTracking({ qualificationId });

  const [activeTab, setActiveTab] = useState<KSBType>('knowledge');
  const [expandedKSB, setExpandedKSB] = useState<string | null>(null);

  // Calculate stats
  const stats = useMemo(() => {
    const getTypeStats = (items: ApprenticeshipKSB[]) => {
      const completed = items.filter((ksb) => {
        const p = getKSBProgress(ksb.id);
        return p?.status === 'completed' || p?.status === 'verified';
      }).length;
      const evidenceSubmitted = items.filter((ksb) => {
        const p = getKSBProgress(ksb.id);
        return p?.status === 'evidence_submitted';
      }).length;
      const inProgress = items.filter((ksb) => {
        const p = getKSBProgress(ksb.id);
        return p?.status === 'in_progress';
      }).length;
      return {
        total: items.length,
        completed,
        evidenceSubmitted,
        inProgress,
        notStarted: items.length - completed - evidenceSubmitted - inProgress,
        percentage: items.length > 0 ? Math.round((completed / items.length) * 100) : 0,
      };
    };

    return {
      knowledge: getTypeStats(knowledge),
      skills: getTypeStats(skills),
      behaviours: getTypeStats(behaviours),
      overall: {
        total: ksbs.length,
        completed: ksbs.filter((k) => {
          const p = getKSBProgress(k.id);
          return p?.status === 'completed' || p?.status === 'verified';
        }).length,
      },
    };
  }, [ksbs, knowledge, skills, behaviours, getKSBProgress]);

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'completed':
      case 'verified':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'evidence_submitted':
        return <FileText className="h-4 w-4 text-blue-500" />;
      case 'in_progress':
        return <Clock className="h-4 w-4 text-amber-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-white/80" />;
    }
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500/10 text-green-500 border-green-500/20 text-xs">Complete</Badge>;
      case 'verified':
        return <Badge className="bg-green-500/10 text-green-500 border-green-500/20 text-xs">Verified</Badge>;
      case 'evidence_submitted':
        return <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20 text-xs">Evidence</Badge>;
      case 'in_progress':
        return <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 text-xs">In Progress</Badge>;
      default:
        return <Badge variant="outline" className="text-xs">Not Started</Badge>;
    }
  };

  const tabConfig = {
    knowledge: {
      icon: Brain,
      label: 'Knowledge',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      items: knowledge,
      stats: stats.knowledge,
    },
    skill: {
      icon: Wrench,
      label: 'Skills',
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      items: skills,
      stats: stats.skills,
    },
    behaviour: {
      icon: Heart,
      label: 'Behaviours',
      color: 'text-pink-500',
      bgColor: 'bg-pink-500/10',
      items: behaviours,
      stats: stats.behaviours,
    },
  };

  const KSBItem = ({ ksb }: { ksb: ApprenticeshipKSB }) => {
    const ksbProgress = getKSBProgress(ksb.id);
    const isExpanded = expandedKSB === ksb.id;

    return (
      <button
        onClick={() => setExpandedKSB(isExpanded ? null : ksb.id)}
        className="w-full text-left p-3 rounded-xl bg-muted/30 border border-border hover:bg-muted/50 transition-colors touch-manipulation"
      >
        <div className="flex items-start gap-3">
          <div className="shrink-0 mt-0.5">
            {getStatusIcon(ksbProgress?.status)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="shrink-0 text-xs font-mono">
                {ksb.code}
              </Badge>
              {getStatusBadge(ksbProgress?.status)}
            </div>
            <p className="text-sm font-medium mt-1 text-foreground">{ksb.title}</p>

            {isExpanded && (
              <div className="mt-3 pt-3 border-t border-border space-y-2">
                {ksb.description && (
                  <p className="text-xs text-white/80">{ksb.description}</p>
                )}
                {ksbProgress?.evidence_portfolio_ids && ksbProgress.evidence_portfolio_ids.length > 0 && (
                  <div className="flex items-center gap-2 text-xs text-white/80">
                    <FileText className="h-3 w-3" />
                    <span>{ksbProgress.evidence_portfolio_ids.length} evidence item(s) linked</span>
                  </div>
                )}
                {ksbProgress?.notes && (
                  <div className="p-2 rounded-lg bg-muted/50 text-xs text-white/80">
                    <span className="font-medium">Notes:</span> {ksbProgress.notes}
                  </div>
                )}
                {ksb.assessment_method && ksb.assessment_method.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {ksb.assessment_method.map((method, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {method}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="shrink-0">
            {isExpanded ? (
              <ChevronUp className="h-4 w-4 text-white/80" />
            ) : (
              <ChevronDown className="h-4 w-4 text-white/80" />
            )}
          </div>
        </div>
      </button>
    );
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl p-0">
        <div className="w-12 h-1 bg-muted rounded-full mx-auto mt-3 mb-2" />

        <SheetHeader className="px-4 pb-4">
          <SheetTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-elec-yellow" />
            KSB Coverage Map
          </SheetTitle>
          <SheetDescription>
            Track your Knowledge, Skills & Behaviours progress
          </SheetDescription>
        </SheetHeader>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-white/80" />
            <p className="text-sm text-white/80 mt-2">Loading KSBs...</p>
          </div>
        ) : ksbs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="p-4 rounded-full bg-muted mb-4">
              <Target className="h-8 w-8 text-white/80" />
            </div>
            <p className="font-medium text-foreground">No KSBs Found</p>
            <p className="text-sm text-white/80 mt-1">
              KSBs will appear once you select a qualification with mapped standards.
            </p>
          </div>
        ) : (
          <>
            {/* Overall Progress Summary */}
            <div className="px-4 mb-4">
              <div className="p-4 rounded-xl bg-gradient-to-r from-elec-yellow/10 to-amber-600/10 border border-elec-yellow/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Overall Progress</span>
                  <span className="text-sm text-white/80">
                    {stats.overall.completed}/{stats.overall.total} completed
                  </span>
                </div>
                <Progress
                  value={stats.overall.total > 0 ? (stats.overall.completed / stats.overall.total) * 100 : 0}
                  className="h-2"
                />
              </div>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as KSBType)} className="flex-1 flex flex-col">
              <TabsList className="mx-4 mb-2 grid grid-cols-3 h-12 bg-muted/30">
                {(Object.keys(tabConfig) as KSBType[]).map((type) => {
                  const config = tabConfig[type];
                  const Icon = config.icon;
                  return (
                    <TabsTrigger
                      key={type}
                      value={type}
                      className="flex flex-col gap-0.5 h-11 data-[state=active]:bg-background"
                    >
                      <Icon className={cn('h-4 w-4', config.color)} />
                      <span className="text-xs">{config.stats.completed}/{config.stats.total}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              <ScrollArea className="flex-1 px-4 pb-8">
                {(Object.keys(tabConfig) as KSBType[]).map((type) => {
                  const config = tabConfig[type];
                  const Icon = config.icon;
                  return (
                    <TabsContent key={type} value={type} className="mt-0 space-y-4">
                      {/* Type Summary */}
                      <div className={cn('p-3 rounded-xl border', config.bgColor, 'border-transparent')}>
                        <div className="flex items-center gap-3">
                          <div className={cn('p-2 rounded-lg', config.bgColor)}>
                            <Icon className={cn('h-5 w-5', config.color)} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-sm">{config.label}</span>
                              <span className="text-xs text-white/80">
                                {config.stats.percentage}% complete
                              </span>
                            </div>
                            <Progress value={config.stats.percentage} className="h-1.5 mt-1" />
                          </div>
                        </div>
                        <div className="flex gap-4 mt-3 text-xs text-white/80">
                          <span className="flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3 text-green-500" />
                            {config.stats.completed} done
                          </span>
                          <span className="flex items-center gap-1">
                            <FileText className="h-3 w-3 text-blue-500" />
                            {config.stats.evidenceSubmitted} evidence
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-amber-500" />
                            {config.stats.inProgress} active
                          </span>
                        </div>
                      </div>

                      {/* KSB List */}
                      <div className="space-y-2">
                        {config.items.map((ksb) => (
                          <KSBItem key={ksb.id} ksb={ksb} />
                        ))}
                        {config.items.length === 0 && (
                          <div className="text-center py-8">
                            <p className="text-sm text-white/80">
                              No {config.label.toLowerCase()} mapped for this qualification yet.
                            </p>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  );
                })}
              </ScrollArea>
            </Tabs>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

export default KSBCoverageMap;
