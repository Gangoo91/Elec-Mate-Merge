import React, { useState, useEffect, useCallback } from 'react';
import { openExternalUrl } from '@/utils/open-external-url';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import {
  getDaysUntilExpiry,
  isExpired,
  isExpiringWithin,
} from '@/utils/elecIdGenerator';
import { useElecIdProfile } from '@/hooks/useElecIdProfile';
import {
  getQualificationsByProfileId,
  getTrainingByProfileId,
  getSkillsByProfileId,
  getWorkHistoryByProfileId,
} from '@/services/elecIdService';
import { getECSCardType } from '@/data/uk-electrician-constants';
import { toast } from '@/hooks/use-toast';
import {
  getAllRecommendations,
  getSmartNextSteps,
  getCourseSearchUrl,
  isInternalUrl,
  AllRecommendations,
  SmartNextStep,
} from '@/utils/careerRecommendations';
import { useNavigate } from 'react-router-dom';
import {
  Eyebrow,
  Dot,
  ListCard,
  ListRow,
  SectionHeader,
  EmptyState,
  StatStrip,
  toneText,
  type Tone,
} from '@/components/college/primitives';

interface ComplianceItem {
  id: string;
  name: string;
  type: 'qualification' | 'card' | 'training';
  expiryDate: string;
  renewalUrl?: string;
  notes?: string;
  originalId?: string;
}

interface ElecIdComplianceProps {
  onNavigateToTab?: (tab: string) => void;
}

const ComplianceSkeleton = () => (
  <div className="space-y-5">
    <Skeleton className="h-40 rounded-2xl bg-white/[0.04]" />
    <div className="grid grid-cols-4 gap-2">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className="h-20 rounded-2xl bg-white/[0.04]" />
      ))}
    </div>
    {[1, 2, 3].map((i) => (
      <Skeleton key={i} className="h-20 rounded-2xl bg-white/[0.04]" />
    ))}
  </div>
);

const STEP_TONE: Record<SmartNextStep['colour'], Tone> = {
  red: 'red',
  orange: 'orange',
  yellow: 'amber',
  blue: 'blue',
  purple: 'purple',
};

const ElecIdCompliance = ({ onNavigateToTab }: ElecIdComplianceProps = {}) => {
  const { profile, isLoading: profileLoading } = useElecIdProfile();
  const navigate = useNavigate();
  const [complianceItems, setComplianceItems] = useState<ComplianceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [recommendations, setRecommendations] = useState<AllRecommendations | null>(null);
  const [smartSteps, setSmartSteps] = useState<SmartNextStep[]>([]);

  const navigateToCourse = useCallback(
    async (searchQuery: string) => {
      const url = getCourseSearchUrl(searchQuery);
      if (isInternalUrl(url)) {
        navigate(url);
      } else {
        await openExternalUrl(url);
      }
    },
    [navigate]
  );

  const loadComplianceData = useCallback(async () => {
    if (!profile?.id) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const items: ComplianceItem[] = [];

      if (profile.ecs_expiry_date) {
        const ecsCard = getECSCardType(profile.ecs_card_type || 'gold');
        items.push({
          id: 'ecs-card',
          name: ecsCard ? `ECS ${ecsCard.label}` : 'ECS Card',
          type: 'card',
          expiryDate: profile.ecs_expiry_date,
          renewalUrl: 'https://www.ecscard.org.uk/',
        });
      }

      const [qualifications, training, skills, workHistory] = await Promise.all([
        getQualificationsByProfileId(profile.id),
        getTrainingByProfileId(profile.id),
        getSkillsByProfileId(profile.id),
        getWorkHistoryByProfileId(profile.id),
      ]);

      qualifications
        .filter((q) => q.expiry_date)
        .forEach((q) => {
          items.push({
            id: `qual-${q.id}`,
            originalId: q.id,
            name: q.qualification_name,
            type: 'qualification',
            expiryDate: q.expiry_date!,
            renewalUrl: q.awarding_body
              ? `https://www.google.com/search?q=${encodeURIComponent(q.awarding_body + ' renewal')}`
              : undefined,
          });
        });

      training
        .filter((t) => t.expiry_date)
        .forEach((t) => {
          items.push({
            id: `training-${t.id}`,
            originalId: t.id,
            name: t.training_name,
            type: 'training',
            expiryDate: t.expiry_date!,
            renewalUrl: t.provider
              ? `https://www.google.com/search?q=${encodeURIComponent(t.provider + ' ' + t.training_name + ' renewal')}`
              : undefined,
          });
        });

      setComplianceItems(items);

      const recs = getAllRecommendations(
        profile.ecs_card_type,
        qualifications,
        skills,
        workHistory
      );
      setRecommendations(recs);

      const steps = getSmartNextSteps(
        items,
        {
          hasEcsCard: !!profile.ecs_card_type,
          hasQualifications: qualifications.length > 0,
          hasSkills: skills.length > 0,
          hasWorkHistory: workHistory.length > 0,
          hasDocuments: !!profile.ecs_card_type,
        },
        recs.careerProgression,
        recs.skillsGaps
      );
      setSmartSteps(steps);
    } catch (err) {
      console.error('Error loading compliance data:', err);
      setError('Failed to load compliance data');
    } finally {
      setIsLoading(false);
    }
  }, [profile?.id, profile?.ecs_expiry_date, profile?.ecs_card_type]);

  useEffect(() => {
    if (!profileLoading) loadComplianceData();
  }, [profileLoading, loadComplianceData]);

  const expiredItems = complianceItems.filter((item) => isExpired(item.expiryDate));
  const expiringIn30Days = complianceItems.filter(
    (item) => !isExpired(item.expiryDate) && isExpiringWithin(item.expiryDate, 30)
  );
  const expiringIn90Days = complianceItems.filter(
    (item) =>
      !isExpired(item.expiryDate) &&
      !isExpiringWithin(item.expiryDate, 30) &&
      isExpiringWithin(item.expiryDate, 90)
  );
  const validItems = complianceItems.filter(
    (item) => !isExpired(item.expiryDate) && !isExpiringWithin(item.expiryDate, 90)
  );

  const totalItems = complianceItems.length;
  const compliantItems = validItems.length + expiringIn90Days.length;
  const compliancePercentage =
    totalItems > 0 ? Math.round((compliantItems / totalItems) * 100) : 100;

  const getTypeConfig = (type: ComplianceItem['type']): { label: string; tone: Tone } => {
    switch (type) {
      case 'card':
        return { label: 'Card', tone: 'blue' };
      case 'qualification':
        return { label: 'Qual', tone: 'purple' };
      case 'training':
        return { label: 'Training', tone: 'cyan' };
      default:
        return { label: String(type), tone: 'cyan' };
    }
  };

  const getStatusConfig = (daysUntil: number): { tone: Tone; label: string } => {
    if (daysUntil < 0) {
      return { tone: 'red', label: `${Math.abs(daysUntil)} days overdue` };
    }
    if (daysUntil <= 30) {
      return { tone: 'orange', label: `${daysUntil} days left` };
    }
    if (daysUntil <= 90) {
      return { tone: 'amber', label: `${daysUntil} days left` };
    }
    return { tone: 'emerald', label: `${daysUntil} days` };
  };

  const renderComplianceRow = (item: ComplianceItem) => {
    const daysUntil = getDaysUntilExpiry(item.expiryDate);
    const status = getStatusConfig(daysUntil);
    const typeConfig = getTypeConfig(item.type);

    return (
      <ListRow
        key={item.id}
        accent={status.tone}
        title={
          <span className="flex items-center gap-2">
            {item.name}
            <span
              className={cn(
                'text-[10px] font-medium uppercase tracking-[0.15em]',
                toneText[typeConfig.tone]
              )}
            >
              {typeConfig.label}
            </span>
          </span>
        }
        subtitle={
          <span>
            {new Date(item.expiryDate).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}{' '}
            ·{' '}
            <span
              className={
                status.tone === 'red'
                  ? 'text-red-400'
                  : status.tone === 'orange'
                    ? 'text-orange-400'
                    : status.tone === 'amber'
                      ? 'text-amber-400'
                      : 'text-emerald-400'
              }
            >
              {status.label}
            </span>
          </span>
        }
        trailing={
          <span className="flex items-center gap-2">
            {onNavigateToTab && (item.type === 'qualification' || item.type === 'training') && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigateToTab(item.type === 'qualification' ? 'qualifications' : 'training');
                }}
                className="h-11 px-3 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-white text-xs font-medium touch-manipulation"
              >
                Edit
              </button>
            )}
            {item.renewalUrl && <span className="text-xs font-medium text-elec-yellow">Renew →</span>}
          </span>
        }
        onClick={() => item.renewalUrl && openExternalUrl(item.renewalUrl)}
      />
    );
  };

  const allClear = expiredItems.length === 0 && expiringIn30Days.length === 0;

  const getStepActionLabel = (actionType: SmartNextStep['actionType']) => {
    const map = {
      renew: 'Renew',
      upload: 'Upload',
      add: 'Add',
      view_course: 'View course',
      navigate: 'View',
    };
    return map[actionType];
  };

  const handleStepAction = (step: SmartNextStep) => {
    if (step.actionType === 'view_course' && step.searchQuery) {
      navigateToCourse(step.searchQuery);
    } else if (step.navigateTo) {
      if (step.navigateTo.startsWith('http')) {
        openExternalUrl(step.navigateTo);
      } else if (step.navigateTo.startsWith('/')) {
        navigate(step.navigateTo);
      } else if (onNavigateToTab) {
        onNavigateToTab(step.navigateTo);
      }
    }
  };

  if (isLoading || profileLoading) return <ComplianceSkeleton />;

  if (error) {
    return (
      <EmptyState
        title="Failed to load compliance data"
        description={error}
        action="Try again"
        onAction={loadComplianceData}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Hero summary */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 sm:p-6"
      >
        <div className="flex items-center gap-5">
          <div className="relative w-20 h-20 shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke={allClear ? '#22c55e' : expiredItems.length > 0 ? '#ef4444' : '#f59e0b'}
                strokeWidth="3"
                strokeDasharray={`${compliancePercentage}, 100`}
                strokeLinecap="round"
                className="transition-all duration-700 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className={cn(
                  'text-xl font-semibold tabular-nums',
                  allClear
                    ? 'text-emerald-400'
                    : expiredItems.length > 0
                      ? 'text-red-400'
                      : 'text-orange-400'
                )}
              >
                {compliancePercentage}%
              </span>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <Eyebrow>Compliance</Eyebrow>
            <h3 className="mt-1 text-lg font-semibold text-white">
              {allClear
                ? 'All clear'
                : expiredItems.length > 0
                  ? 'Action required'
                  : 'Attention needed'}
            </h3>
            <p className="text-sm text-white mt-0.5">
              {compliantItems} of {totalItems} items valid
            </p>
            {!allClear && (
              <p
                className={cn(
                  'text-xs mt-1 font-medium',
                  expiredItems.length > 0 ? 'text-red-400' : 'text-orange-400'
                )}
              >
                {expiredItems.length > 0
                  ? `${expiredItems.length} expired`
                  : `${expiringIn30Days.length} expiring soon`}
              </p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Quick stats */}
      <StatStrip
        stats={[
          { value: expiredItems.length, label: 'Expired', tone: expiredItems.length > 0 ? 'red' : undefined },
          {
            value: expiringIn30Days.length,
            label: '30 days',
            tone: expiringIn30Days.length > 0 ? 'orange' : undefined,
          },
          {
            value: expiringIn90Days.length,
            label: '90 days',
            tone: expiringIn90Days.length > 0 ? 'amber' : undefined,
          },
          {
            value: validItems.length,
            label: 'Valid',
            tone: validItems.length > 0 ? 'emerald' : undefined,
          },
        ]}
      />

      {/* Smart next steps */}
      {smartSteps.length > 0 && (
        <div>
          <SectionHeader eyebrow="Action" title="Your next steps" />
          <div className="mt-4">
            <ListCard>
              {smartSteps.slice(0, 5).map((step) => (
                <ListRow
                  key={step.id}
                  accent={STEP_TONE[step.colour]}
                  title={step.title}
                  subtitle={step.subtitle}
                  trailing={
                    <span className="text-xs font-semibold text-elec-yellow">
                      {getStepActionLabel(step.actionType)} →
                    </span>
                  }
                  onClick={() => handleStepAction(step)}
                />
              ))}
            </ListCard>
          </div>
        </div>
      )}

      {/* Expired / expiring soon */}
      {(expiredItems.length > 0 || expiringIn30Days.length > 0) && (
        <div className="space-y-4">
          {expiredItems.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <Eyebrow>Expired · Action required</Eyebrow>
                <span className="text-[11px] font-semibold text-red-400 tabular-nums">
                  {expiredItems.length}
                </span>
              </div>
              <ListCard>{expiredItems.map(renderComplianceRow)}</ListCard>
            </div>
          )}

          {expiringIn30Days.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <Eyebrow>Expiring within 30 days</Eyebrow>
                <span className="text-[11px] font-semibold text-orange-400 tabular-nums">
                  {expiringIn30Days.length}
                </span>
              </div>
              <ListCard>{expiringIn30Days.map(renderComplianceRow)}</ListCard>
            </div>
          )}
        </div>
      )}

      {/* Skills to develop */}
      {recommendations && recommendations.skillsGaps.length > 0 && (
        <div>
          <SectionHeader eyebrow="Career growth" title="Skills to develop" />
          <p className="mt-1 text-sm text-white">Based on your experience, consider:</p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {recommendations.skillsGaps.slice(0, 4).map((gap) => (
              <button
                key={gap.id}
                onClick={() => navigateToCourse(gap.searchQuery)}
                className={cn(
                  'p-4 rounded-2xl border text-left transition-all touch-manipulation',
                  gap.importance === 'essential'
                    ? 'bg-purple-500/10 border-purple-500/20 hover:bg-purple-500/15'
                    : gap.importance === 'recommended'
                      ? 'bg-blue-500/10 border-blue-500/20 hover:bg-blue-500/15'
                      : 'bg-white/[0.04] border-white/[0.06] hover:bg-white/[0.08]'
                )}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Dot
                    tone={
                      gap.importance === 'essential'
                        ? 'purple'
                        : gap.importance === 'recommended'
                          ? 'blue'
                          : 'cyan'
                    }
                  />
                  <span className="text-xs uppercase tracking-[0.12em] text-white font-medium">
                    {gap.importance}
                  </span>
                </div>
                <h5 className="font-medium text-white text-sm">{gap.skillName}</h5>
                <p className="text-xs text-white mt-1 line-clamp-2">{gap.reason}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Brush up suggestions */}
      {recommendations && recommendations.brushUp.length > 0 && (
        <div>
          <SectionHeader eyebrow="Refresh" title="Time for a refresher?" />
          <div className="mt-4">
            <ListCard>
              {recommendations.brushUp.map((item) => (
                <ListRow
                  key={item.id}
                  accent="cyan"
                  title={item.skillName}
                  subtitle={item.suggestion}
                  trailing={<span className="text-xs font-semibold text-elec-yellow">View →</span>}
                  onClick={() => navigateToCourse(item.searchQuery)}
                />
              ))}
            </ListCard>
          </div>
        </div>
      )}

      {/* Trending skills */}
      {recommendations && recommendations.trending.length > 0 && (
        <div>
          <SectionHeader eyebrow="Market demand" title="Trending in the industry" />
          <div className="mt-4 rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06] p-5">
            <div className="flex flex-wrap gap-2 mb-3">
              {recommendations.trending.map((trend) => (
                <button
                  key={trend.id}
                  onClick={() => !trend.userHasSkill && navigateToCourse(trend.name)}
                  className={cn(
                    'px-3 py-1.5 rounded-full text-sm font-medium transition-all touch-manipulation',
                    trend.userHasSkill
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-white/[0.04] text-white border border-white/[0.06] hover:bg-white/[0.08]'
                  )}
                >
                  {trend.userHasSkill && '✓ '}
                  {trend.name}
                </button>
              ))}
            </div>
            <p className="text-xs text-white">Skills employers are actively seeking. Tap to find courses.</p>
          </div>
        </div>
      )}

      {/* Remaining items (90 days + valid) */}
      {(expiringIn90Days.length > 0 || validItems.length > 0) && (
        <div className="space-y-4">
          {expiringIn90Days.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <Eyebrow>Expiring within 90 days</Eyebrow>
                <span className="text-[11px] font-semibold text-amber-400 tabular-nums">
                  {expiringIn90Days.length}
                </span>
              </div>
              <ListCard>{expiringIn90Days.map(renderComplianceRow)}</ListCard>
            </div>
          )}

          {validItems.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <Eyebrow>All current</Eyebrow>
                <span className="text-[11px] font-semibold text-emerald-400 tabular-nums">
                  {validItems.length}
                </span>
              </div>
              <ListCard>{validItems.map(renderComplianceRow)}</ListCard>
            </div>
          )}
        </div>
      )}

      {/* Notification settings */}
      <button
        onClick={() => {
          toast({
            title: 'Coming soon',
            description: 'Expiry reminders will be available in a future update.',
          });
        }}
        className="w-full"
      >
        <ListCard>
          <ListRow
            title="Expiry reminders"
            subtitle="Get notified before qualifications expire"
            trailing={<span className="text-xs font-medium text-elec-yellow">Configure →</span>}
          />
        </ListCard>
      </button>

      {/* Empty state */}
      {complianceItems.length === 0 &&
        (!recommendations || !recommendations.hasAnyRecommendations) && (
          <EmptyState
            title="No compliance items yet"
            description="Add qualifications with expiry dates to track your compliance status."
            action="Add qualifications"
            onAction={onNavigateToTab ? () => onNavigateToTab('qualifications') : undefined}
          />
        )}
    </div>
  );
};

export default ElecIdCompliance;
