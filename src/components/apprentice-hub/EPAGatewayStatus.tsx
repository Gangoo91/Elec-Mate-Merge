/**
 * EPAGatewayStatus
 *
 * End-Point Assessment gateway readiness tracker for apprentices.
 * Shows checklist of requirements and overall readiness status.
 * Mobile-first bottom sheet design.
 */

import { useMemo } from 'react';
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
import {
  Award,
  CheckCircle2,
  Clock,
  AlertCircle,
  AlertTriangle,
  BookOpen,
  Target,
  FileCheck,
  Calendar,
  Heart,
  TrendingUp,
  Loader2,
  GraduationCap,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useKSBTracking } from '@/hooks/qualification/useKSBTracking';
import { useQualifications } from '@/hooks/qualification/useQualifications';
import { usePortfolioData } from '@/hooks/portfolio/usePortfolioData';
import { useTimeEntries } from '@/hooks/time-tracking/useTimeEntries';

interface EPAGatewayStatusProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface GatewayRequirement {
  id: string;
  category: 'knowledge' | 'skills' | 'behaviours' | 'portfolio' | 'offjob';
  title: string;
  description: string;
  status: 'complete' | 'in_progress' | 'not_started' | 'at_risk';
  progress: number;
  target?: string;
  current?: string;
}

export function EPAGatewayStatus({ open, onOpenChange }: EPAGatewayStatusProps) {
  const { userSelection } = useQualifications();
  const qualificationId = userSelection?.qualification_id;

  const {
    ksbs,
    progress: ksbProgress,
    isLoading: ksbLoading,
    getKSBProgress,
    knowledge,
    skills,
    behaviours,
  } = useKSBTracking({ qualificationId });

  const { entries: portfolioEntries, isLoading: portfolioLoading } = usePortfolioData();
  const { totalTime, isLoading: timeLoading } = useTimeEntries();

  const isLoading = ksbLoading || portfolioLoading || timeLoading;

  // Calculate gateway requirements
  const { requirements, overallReadiness, gatewayStatus, gaps, recommendations } = useMemo(() => {
    const reqs: GatewayRequirement[] = [];
    const currentGaps: string[] = [];
    const recs: string[] = [];

    // 1. Knowledge KSBs
    const knowledgeTotal = knowledge.length;
    const knowledgeCompleted = knowledge.filter((k) => {
      const p = getKSBProgress(k.id);
      return p?.status === 'completed' || p?.status === 'verified';
    }).length;
    const knowledgeProgress = knowledgeTotal > 0 ? Math.round((knowledgeCompleted / knowledgeTotal) * 100) : 0;

    reqs.push({
      id: 'knowledge',
      category: 'knowledge',
      title: 'Knowledge Criteria',
      description: 'Theory knowledge demonstrated and evidenced',
      status: knowledgeProgress >= 100 ? 'complete' : knowledgeProgress >= 70 ? 'in_progress' : knowledgeProgress > 0 ? 'at_risk' : 'not_started',
      progress: knowledgeProgress,
      current: `${knowledgeCompleted}/${knowledgeTotal}`,
      target: `${knowledgeTotal} KSBs`,
    });
    if (knowledgeProgress < 100 && knowledgeTotal > 0) {
      currentGaps.push(`${knowledgeTotal - knowledgeCompleted} knowledge criteria remaining`);
    }

    // 2. Skills KSBs
    const skillsTotal = skills.length;
    const skillsCompleted = skills.filter((k) => {
      const p = getKSBProgress(k.id);
      return p?.status === 'completed' || p?.status === 'verified';
    }).length;
    const skillsProgress = skillsTotal > 0 ? Math.round((skillsCompleted / skillsTotal) * 100) : 0;

    reqs.push({
      id: 'skills',
      category: 'skills',
      title: 'Practical Skills',
      description: 'Hands-on skills demonstrated with evidence',
      status: skillsProgress >= 100 ? 'complete' : skillsProgress >= 70 ? 'in_progress' : skillsProgress > 0 ? 'at_risk' : 'not_started',
      progress: skillsProgress,
      current: `${skillsCompleted}/${skillsTotal}`,
      target: `${skillsTotal} KSBs`,
    });
    if (skillsProgress < 100 && skillsTotal > 0) {
      currentGaps.push(`${skillsTotal - skillsCompleted} skills criteria remaining`);
    }

    // 3. Behaviours KSBs
    const behavioursTotal = behaviours.length;
    const behavioursCompleted = behaviours.filter((k) => {
      const p = getKSBProgress(k.id);
      return p?.status === 'completed' || p?.status === 'verified';
    }).length;
    const behavioursProgress = behavioursTotal > 0 ? Math.round((behavioursCompleted / behavioursTotal) * 100) : 0;

    reqs.push({
      id: 'behaviours',
      category: 'behaviours',
      title: 'Professional Behaviours',
      description: 'Workplace behaviours evidenced',
      status: behavioursProgress >= 100 ? 'complete' : behavioursProgress >= 70 ? 'in_progress' : behavioursProgress > 0 ? 'at_risk' : 'not_started',
      progress: behavioursProgress,
      current: `${behavioursCompleted}/${behavioursTotal}`,
      target: `${behavioursTotal} KSBs`,
    });
    if (behavioursProgress < 100 && behavioursTotal > 0) {
      currentGaps.push(`${behavioursTotal - behavioursCompleted} behaviours criteria remaining`);
    }

    // 4. Portfolio Evidence
    const portfolioCount = portfolioEntries.length;
    const approvedCount = portfolioEntries.filter((e) => e.status === 'approved').length;
    const minPortfolioRequired = 20; // Typical apprenticeship requirement
    const portfolioProgress = Math.min(Math.round((approvedCount / minPortfolioRequired) * 100), 100);

    reqs.push({
      id: 'portfolio',
      category: 'portfolio',
      title: 'Portfolio Evidence',
      description: 'Quality evidence mapped to criteria',
      status: portfolioProgress >= 100 ? 'complete' : portfolioProgress >= 50 ? 'in_progress' : portfolioProgress > 0 ? 'at_risk' : 'not_started',
      progress: portfolioProgress,
      current: `${approvedCount} approved`,
      target: `${minPortfolioRequired}+ items`,
    });
    if (approvedCount < minPortfolioRequired) {
      currentGaps.push(`${minPortfolioRequired - approvedCount} more approved evidence items needed`);
      recs.push('Upload evidence and request tutor review');
    }

    // 5. Off-the-Job Training Hours
    const totalHours = totalTime.hours + totalTime.minutes / 60;
    const requiredHours = 370; // ~20% of 18-month apprenticeship
    const offJobProgress = Math.min(Math.round((totalHours / requiredHours) * 100), 100);

    reqs.push({
      id: 'offjob',
      category: 'offjob',
      title: '20% Off-the-Job Training',
      description: 'Minimum training hours completed',
      status: offJobProgress >= 100 ? 'complete' : offJobProgress >= 80 ? 'in_progress' : offJobProgress > 0 ? 'at_risk' : 'not_started',
      progress: offJobProgress,
      current: `${Math.round(totalHours)}h`,
      target: `${requiredHours}h`,
    });
    if (totalHours < requiredHours) {
      const hoursNeeded = Math.round(requiredHours - totalHours);
      currentGaps.push(`${hoursNeeded} more off-job hours needed`);
      if (offJobProgress < 50) {
        recs.push('Prioritise logging your training activities');
      }
    }

    // Calculate overall readiness
    const overallProgress = reqs.length > 0
      ? Math.round(reqs.reduce((sum, r) => sum + r.progress, 0) / reqs.length)
      : 0;

    // Determine gateway status
    const criticalGaps = reqs.filter((r) => r.status === 'at_risk' || r.status === 'not_started').length;
    let status: 'ready' | 'almost' | 'needs_work' | 'at_risk';

    if (overallProgress >= 95 && criticalGaps === 0) {
      status = 'ready';
    } else if (overallProgress >= 75 && criticalGaps <= 1) {
      status = 'almost';
    } else if (overallProgress >= 50) {
      status = 'needs_work';
    } else {
      status = 'at_risk';
    }

    // Add recommendations based on status
    if (status === 'ready') {
      recs.push('You\'re on track! Keep your portfolio up to date.');
    } else if (status === 'almost') {
      recs.push('Nearly there! Focus on your remaining gaps.');
    } else if (criticalGaps > 2) {
      recs.push('Schedule a review with your tutor to plan catch-up.');
    }

    return {
      requirements: reqs,
      overallReadiness: overallProgress,
      gatewayStatus: status,
      gaps: currentGaps,
      recommendations: recs,
    };
  }, [knowledge, skills, behaviours, portfolioEntries, totalTime, getKSBProgress]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready':
      case 'complete':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'almost':
      case 'in_progress':
        return 'bg-elec-yellow/10 text-elec-yellow border-elec-yellow/20';
      case 'needs_work':
      case 'not_started':
        return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'at_risk':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      default:
        return 'bg-muted text-white/80';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'ready':
        return 'Gateway Ready';
      case 'almost':
        return 'Almost Ready';
      case 'needs_work':
        return 'Needs Work';
      case 'at_risk':
        return 'At Risk';
      default:
        return status;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'knowledge':
        return BookOpen;
      case 'skills':
        return Target;
      case 'behaviours':
        return Heart;
      case 'portfolio':
        return FileCheck;
      case 'offjob':
        return Calendar;
      default:
        return AlertCircle;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'knowledge':
        return 'text-blue-500';
      case 'skills':
        return 'text-green-500';
      case 'behaviours':
        return 'text-pink-500';
      case 'portfolio':
        return 'text-purple-500';
      case 'offjob':
        return 'text-amber-500';
      default:
        return 'text-white/80';
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl p-0">
        <div className="w-12 h-1 bg-muted rounded-full mx-auto mt-3 mb-2" />

        <SheetHeader className="px-4 pb-4">
          <SheetTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-green-500" />
            EPA Gateway Status
          </SheetTitle>
          <SheetDescription>
            Track your End-Point Assessment readiness
          </SheetDescription>
        </SheetHeader>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-white/80" />
            <p className="text-sm text-white/80 mt-2">Checking readiness...</p>
          </div>
        ) : (
          <ScrollArea className="h-[calc(85vh-8rem)] px-4 pb-8">
            {/* Overall Readiness Header */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-600/10 border border-green-500/20 mb-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-green-500/20">
                    <Award className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Gateway Readiness</p>
                    <Badge className={cn('mt-1', getStatusColor(gatewayStatus))}>
                      {getStatusLabel(gatewayStatus)}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-foreground">{overallReadiness}%</p>
                  <p className="text-xs text-white/80">complete</p>
                </div>
              </div>
              <Progress value={overallReadiness} className="h-2" />
            </div>

            {/* Requirements Checklist */}
            <div className="space-y-3 mb-6">
              <h3 className="text-sm font-medium text-white/80 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Gateway Requirements
              </h3>

              {requirements.map((req) => {
                const Icon = getCategoryIcon(req.category);
                const iconColor = getCategoryColor(req.category);

                return (
                  <div
                    key={req.id}
                    className="p-3 rounded-xl bg-muted/30 border border-border"
                  >
                    <div className="flex items-start gap-3">
                      <div className={cn('p-2 rounded-lg', getStatusColor(req.status))}>
                        <Icon className={cn('h-4 w-4', iconColor)} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-medium text-foreground">{req.title}</p>
                          <span className="text-sm font-bold">{req.progress}%</span>
                        </div>
                        <p className="text-xs text-white/80 mb-2">{req.description}</p>
                        <Progress value={req.progress} className="h-1.5 mb-2" />
                        <div className="flex items-center justify-between text-xs text-white/80">
                          <span>Current: {req.current}</span>
                          <span>Target: {req.target}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Gaps to Address */}
            {gaps.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-white/80 flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  Gaps to Address
                </h3>
                <div className="space-y-2">
                  {gaps.map((gap, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-sm p-2.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400"
                    >
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      {gap}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendations */}
            {recommendations.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-white/80 flex items-center gap-2 mb-3">
                  <TrendingUp className="h-4 w-4 text-elec-yellow" />
                  Next Steps
                </h3>
                <div className="space-y-2">
                  {recommendations.map((rec, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 text-sm p-2.5 rounded-lg bg-elec-yellow/10"
                    >
                      <CheckCircle2 className="h-4 w-4 text-elec-yellow shrink-0 mt-0.5" />
                      <span className="text-foreground">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Info Note */}
            <div className="p-4 rounded-xl bg-muted/30 border border-border">
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-white/80 shrink-0 mt-0.5" />
                <div className="text-xs text-white/80">
                  <p className="font-medium text-foreground mb-1">About the Gateway</p>
                  <p>
                    The gateway is a formal check before your End-Point Assessment (EPA).
                    Your employer and training provider must confirm you've met all requirements
                    before you can proceed to the EPA.
                  </p>
                </div>
              </div>
            </div>
          </ScrollArea>
        )}
      </SheetContent>
    </Sheet>
  );
}

export default EPAGatewayStatus;
