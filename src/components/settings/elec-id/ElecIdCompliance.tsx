import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Calendar,
  Bell,
  RefreshCw,
  Shield,
  XCircle,
  ChevronRight,
  Sparkles,
  Edit2,
  Plus,
  Zap,
  Sun,
  Flame,
  Cpu,
  Award,
  TrendingUp,
  Book,
  Battery,
  Home,
  Network,
  Lightbulb,
  Rocket,
} from 'lucide-react';
import {
  getExpiryStatus,
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
  ElecIdSkill,
  ElecIdQualification,
  ElecIdWorkHistory,
} from '@/services/elecIdService';
import { getECSCardType } from '@/data/uk-electrician-constants';
import { toast } from '@/hooks/use-toast';
import {
  getAllRecommendations,
  getSmartNextSteps,
  getCourseSearchUrl,
  isInternalUrl,
  CareerRecommendation,
  SkillGap,
  BrushUpSuggestion,
  TrendingSkill,
  AllRecommendations,
  SmartNextStep,
} from '@/utils/careerRecommendations';
import { useNavigate } from 'react-router-dom';

interface ComplianceItem {
  id: string;
  name: string;
  type: 'qualification' | 'card' | 'training';
  expiryDate: string;
  renewalUrl?: string;
  notes?: string;
  originalId?: string; // Original database ID for editing
}

interface ElecIdComplianceProps {
  onNavigateToTab?: (tab: string) => void;
}

// Skeleton loading component
const ComplianceSkeleton = () => (
  <div className="space-y-5">
    {/* Hero card skeleton */}
    <Skeleton className="h-40 rounded-2xl bg-white/[0.06]" />

    {/* Quick stats skeleton */}
    <div className="grid grid-cols-4 gap-2">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className="h-20 rounded-xl bg-white/[0.06]" />
      ))}
    </div>

    {/* Recommendations skeleton */}
    <Skeleton className="h-48 rounded-2xl bg-white/[0.06]" />

    {/* Items skeleton */}
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="h-20 rounded-xl bg-white/[0.06]" />
      ))}
    </div>
  </div>
);

// Icon mapping for recommendations
const RecommendationIcon = ({ icon, className }: { icon: string; className?: string }) => {
  const iconMap: Record<string, React.ElementType> = {
    zap: Zap,
    sun: Sun,
    flame: Flame,
    cpu: Cpu,
    award: Award,
    'trending-up': TrendingUp,
    shield: Shield,
    book: Book,
    battery: Battery,
    home: Home,
    network: Network,
  };
  const IconComponent = iconMap[icon] || Zap;
  return <IconComponent className={className} />;
};

const ElecIdCompliance = ({ onNavigateToTab }: ElecIdComplianceProps = {}) => {
  const { profile, isLoading: profileLoading } = useElecIdProfile();
  const navigate = useNavigate();
  const [complianceItems, setComplianceItems] = useState<ComplianceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Recommendation state
  const [recommendations, setRecommendations] = useState<AllRecommendations | null>(null);
  const [smartSteps, setSmartSteps] = useState<SmartNextStep[]>([]);

  // Helper to navigate to course - internal routes use React Router, external use window.open
  const navigateToCourse = useCallback(
    (searchQuery: string) => {
      const url = getCourseSearchUrl(searchQuery);
      if (isInternalUrl(url)) {
        navigate(url);
      } else {
        window.open(url, '_blank');
      }
    },
    [navigate]
  );

  // Load compliance items and recommendations from backend
  const loadComplianceData = useCallback(async () => {
    if (!profile?.id) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const items: ComplianceItem[] = [];

      // Add ECS Card if it has an expiry date
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

      // Fetch all profile data in parallel
      const [qualifications, training, skills, workHistory] = await Promise.all([
        getQualificationsByProfileId(profile.id),
        getTrainingByProfileId(profile.id),
        getSkillsByProfileId(profile.id),
        getWorkHistoryByProfileId(profile.id),
      ]);

      // Add qualifications with expiry dates
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

      // Add training with expiry dates
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

      // Generate recommendations
      const recs = getAllRecommendations(
        profile.ecs_card_type,
        qualifications,
        skills,
        workHistory
      );
      setRecommendations(recs);

      // Generate smart next steps
      const steps = getSmartNextSteps(
        items,
        {
          hasEcsCard: !!profile.ecs_card_type,
          hasQualifications: qualifications.length > 0,
          hasSkills: skills.length > 0,
          hasWorkHistory: workHistory.length > 0,
          hasDocuments: !!profile.ecs_card_type, // simplified check
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
    if (!profileLoading) {
      loadComplianceData();
    }
  }, [profileLoading, loadComplianceData]);

  // Sort and categorize items
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

  const getTypeConfig = (type: ComplianceItem['type']) => {
    switch (type) {
      case 'card':
        return { label: 'Card', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' };
      case 'qualification':
        return { label: 'Qual', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' };
      case 'training':
        return { label: 'Training', color: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' };
      default:
        return { label: type, color: 'bg-white/10 text-white border-white/20' };
    }
  };

  const getStatusConfig = (daysUntil: number) => {
    if (daysUntil < 0) {
      return {
        bg: 'bg-red-500/10',
        border: 'border-red-500/30',
        text: 'text-red-400',
        icon: XCircle,
        label: `${Math.abs(daysUntil)} days overdue`,
      };
    }
    if (daysUntil <= 30) {
      return {
        bg: 'bg-orange-500/10',
        border: 'border-orange-500/30',
        text: 'text-orange-400',
        icon: AlertTriangle,
        label: `${daysUntil} days left`,
      };
    }
    if (daysUntil <= 90) {
      return {
        bg: 'bg-yellow-500/10',
        border: 'border-yellow-500/30',
        text: 'text-yellow-400',
        icon: Clock,
        label: `${daysUntil} days left`,
      };
    }
    return {
      bg: 'bg-green-500/10',
      border: 'border-green-500/30',
      text: 'text-green-400',
      icon: CheckCircle2,
      label: `${daysUntil} days`,
    };
  };

  const renderComplianceCard = (item: ComplianceItem, index: number) => {
    const daysUntil = getDaysUntilExpiry(item.expiryDate);
    const status = getStatusConfig(daysUntil);
    const typeConfig = getTypeConfig(item.type);
    const StatusIcon = status.icon;

    return (
      <motion.button
        key={item.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        onClick={() => item.renewalUrl && window.open(item.renewalUrl, '_blank')}
        className={cn(
          'w-full p-4 rounded-2xl border text-left transition-all touch-manipulation',
          status.bg,
          status.border,
          item.renewalUrl && 'active:scale-[0.99] hover:brightness-110'
        )}
      >
        <div className="flex items-center gap-3">
          {/* Status icon */}
          <div
            className={cn(
              'w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0',
              status.bg
            )}
          >
            <StatusIcon className={cn('w-6 h-6', status.text)} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold text-white truncate">{item.name}</h4>
              <Badge variant="outline" className={cn('text-[10px] px-1.5 py-0', typeConfig.color)}>
                {typeConfig.label}
              </Badge>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-white flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(item.expiryDate).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
              <span className={cn('font-medium', status.text)}>{status.label}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Edit button - navigate to the relevant tab */}
            {onNavigateToTab && (item.type === 'qualification' || item.type === 'training') && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigateToTab(item.type === 'qualification' ? 'qualifications' : 'training');
                }}
                className="p-2 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] transition-colors touch-manipulation"
                title={`Edit in ${item.type === 'qualification' ? 'Qualifications' : 'Training'} tab`}
              >
                <Edit2 className="h-4 w-4 text-white" />
              </button>
            )}
            {/* Renew action */}
            {item.renewalUrl ? (
              <div className="flex items-center gap-1 text-white">
                <RefreshCw className="h-4 w-4" />
                <ChevronRight className="h-4 w-4" />
              </div>
            ) : (
              <ChevronRight className="h-5 w-5 text-white" />
            )}
          </div>
        </div>
      </motion.button>
    );
  };

  const allClear = expiredItems.length === 0 && expiringIn30Days.length === 0;

  // Smart step helpers
  const getStepColourClasses = (colour: SmartNextStep['colour']) => {
    const map = {
      red: { bg: 'bg-red-500/10', border: 'border-l-red-500', text: 'text-red-400' },
      orange: { bg: 'bg-orange-500/10', border: 'border-l-orange-500', text: 'text-orange-400' },
      yellow: { bg: 'bg-yellow-500/10', border: 'border-l-yellow-500', text: 'text-yellow-400' },
      blue: { bg: 'bg-blue-500/10', border: 'border-l-blue-500', text: 'text-blue-400' },
      purple: { bg: 'bg-purple-500/10', border: 'border-l-purple-500', text: 'text-purple-400' },
    };
    return map[colour];
  };

  const getStepActionLabel = (actionType: SmartNextStep['actionType']) => {
    const map = {
      renew: 'Renew',
      upload: 'Upload',
      add: 'Add',
      view_course: 'View Course',
      navigate: 'View',
    };
    return map[actionType];
  };

  const handleStepAction = (step: SmartNextStep) => {
    if (step.actionType === 'view_course' && step.searchQuery) {
      navigateToCourse(step.searchQuery);
    } else if (step.navigateTo) {
      if (step.navigateTo.startsWith('http')) {
        window.open(step.navigateTo, '_blank');
      } else if (step.navigateTo.startsWith('/')) {
        navigate(step.navigateTo);
      } else if (onNavigateToTab) {
        onNavigateToTab(step.navigateTo);
      }
    }
  };

  // Show loading skeleton
  if (isLoading || profileLoading) {
    return <ComplianceSkeleton />;
  }

  // Show error state
  if (error) {
    return (
      <div className="py-12 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-red-500/10 flex items-center justify-center">
          <AlertTriangle className="h-8 w-8 text-red-400" />
        </div>
        <h4 className="text-lg font-medium text-white mb-2">Failed to load compliance data</h4>
        <p className="text-white mb-4">{error}</p>
        <Button onClick={loadComplianceData} className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Compliance Hero Card */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/[0.08] p-5"
      >
        {/* Background glow */}
        <div
          className={cn(
            'absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-30',
            allClear ? 'bg-green-500' : expiredItems.length > 0 ? 'bg-red-500' : 'bg-orange-500'
          )}
        />

        <div className="relative flex items-center justify-between">
          {/* Left side - Info */}
          <div className="flex items-center gap-4">
            {/* Circular Progress */}
            <div className="relative w-20 h-20">
              <svg className="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
                {/* Background circle */}
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="3"
                />
                {/* Progress circle */}
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke={allClear ? '#22c55e' : expiredItems.length > 0 ? '#ef4444' : '#f59e0b'}
                  strokeWidth="3"
                  strokeDasharray={`${compliancePercentage}, 100`}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className={cn(
                    'text-xl font-bold',
                    allClear
                      ? 'text-green-400'
                      : expiredItems.length > 0
                        ? 'text-red-400'
                        : 'text-orange-400'
                  )}
                >
                  {compliancePercentage}%
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white">
                {allClear
                  ? 'All Clear'
                  : expiredItems.length > 0
                    ? 'Action Required'
                    : 'Attention Needed'}
              </h3>
              <p className="text-sm text-white">
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

          {/* Right side - Icon */}
          <div
            className={cn(
              'w-14 h-14 rounded-xl flex items-center justify-center',
              allClear
                ? 'bg-green-500/20'
                : expiredItems.length > 0
                  ? 'bg-red-500/20'
                  : 'bg-orange-500/20'
            )}
          >
            {allClear ? (
              <Sparkles className="w-7 h-7 text-green-400" />
            ) : expiredItems.length > 0 ? (
              <XCircle className="w-7 h-7 text-red-400" />
            ) : (
              <AlertTriangle className="w-7 h-7 text-orange-400" />
            )}
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { count: expiredItems.length, label: 'Expired', color: 'red', icon: XCircle },
          {
            count: expiringIn30Days.length,
            label: '30 days',
            color: 'orange',
            icon: AlertTriangle,
          },
          { count: expiringIn90Days.length, label: '90 days', color: 'yellow', icon: Clock },
          { count: validItems.length, label: 'Valid', color: 'green', icon: CheckCircle2 },
        ].map((stat, index) => {
          const colorClasses = {
            red:
              stat.count > 0
                ? 'bg-red-500/10 border-red-500/30'
                : 'bg-white/[0.02] border-white/[0.04]',
            orange:
              stat.count > 0
                ? 'bg-orange-500/10 border-orange-500/30'
                : 'bg-white/[0.02] border-white/[0.04]',
            yellow:
              stat.count > 0
                ? 'bg-yellow-500/10 border-yellow-500/30'
                : 'bg-white/[0.02] border-white/[0.04]',
            green:
              stat.count > 0
                ? 'bg-green-500/10 border-green-500/30'
                : 'bg-white/[0.02] border-white/[0.04]',
          };
          const textClasses = {
            red: stat.count > 0 ? 'text-red-400' : 'text-white',
            orange: stat.count > 0 ? 'text-orange-400' : 'text-white',
            yellow: stat.count > 0 ? 'text-yellow-400' : 'text-white',
            green: stat.count > 0 ? 'text-green-400' : 'text-white',
          };
          const Icon = stat.icon;

          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                'text-center p-3 rounded-xl border transition-all',
                colorClasses[stat.color as keyof typeof colorClasses]
              )}
            >
              <Icon
                className={cn(
                  'h-5 w-5 mx-auto mb-1',
                  textClasses[stat.color as keyof typeof textClasses]
                )}
              />
              <div
                className={cn(
                  'text-lg font-bold',
                  textClasses[stat.color as keyof typeof textClasses]
                )}
              >
                {stat.count}
              </div>
              <div className="text-[10px] text-white uppercase tracking-wide">{stat.label}</div>
            </motion.div>
          );
        })}
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════════ */}
      {/* SMART NEXT STEPS - Context-Aware Priority List */}
      {/* ═══════════════════════════════════════════════════════════════════════════ */}
      {smartSteps.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <div className="flex items-center gap-2 px-1">
            <Rocket className="h-4 w-4 text-elec-yellow" />
            <h4 className="text-sm font-medium text-elec-yellow">Your Next Steps</h4>
          </div>

          <div className="space-y-2">
            {smartSteps.slice(0, 5).map((step, index) => {
              const colours = getStepColourClasses(step.colour);
              return (
                <motion.button
                  key={step.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleStepAction(step)}
                  className={cn(
                    'w-full flex items-center gap-3 p-4 rounded-xl border-l-4 transition-all touch-manipulation active:scale-[0.99]',
                    colours.bg,
                    colours.border,
                    'border border-white/[0.06]'
                  )}
                >
                  {/* Priority icon */}
                  <div
                    className={cn(
                      'w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0',
                      colours.bg
                    )}
                  >
                    <RecommendationIcon icon={step.icon} className={cn('h-5 w-5', colours.text)} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 text-left">
                    <h5 className="font-semibold text-white text-sm">{step.title}</h5>
                    <p className="text-xs text-white mt-0.5 line-clamp-1">{step.subtitle}</p>
                  </div>

                  {/* Action button */}
                  <div
                    className={cn(
                      'flex-shrink-0 px-3 h-11 rounded-lg flex items-center justify-center text-xs font-semibold touch-manipulation',
                      colours.bg,
                      colours.text
                    )}
                  >
                    {getStepActionLabel(step.actionType)}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════════ */}
      {/* EXPIRING SOON - Existing expiry tracking */}
      {/* ═══════════════════════════════════════════════════════════════════════════ */}
      {(expiredItems.length > 0 || expiringIn30Days.length > 0) && (
        <div className="space-y-4">
          {/* Expired Items */}
          {expiredItems.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 px-1">
                <XCircle className="h-4 w-4 text-red-400" />
                <h4 className="text-sm font-medium text-red-400">Expired - Action Required</h4>
                <Badge className="ml-auto text-xs bg-red-500/20 text-red-400 border-red-500/30">
                  {expiredItems.length}
                </Badge>
              </div>
              <div className="space-y-2">
                {expiredItems.map((item, index) => renderComplianceCard(item, index))}
              </div>
            </div>
          )}

          {/* Expiring in 30 Days */}
          {expiringIn30Days.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 px-1">
                <AlertTriangle className="h-4 w-4 text-orange-400" />
                <h4 className="text-sm font-medium text-orange-400">Expiring Within 30 Days</h4>
                <Badge className="ml-auto text-xs bg-orange-500/20 text-orange-400 border-orange-500/30">
                  {expiringIn30Days.length}
                </Badge>
              </div>
              <div className="space-y-2">
                {expiringIn30Days.map((item, index) => renderComplianceCard(item, index))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════════ */}
      {/* SKILLS TO DEVELOP - Gap Analysis */}
      {/* ═══════════════════════════════════════════════════════════════════════════ */}
      {recommendations && recommendations.skillsGaps.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <div className="flex items-center gap-2 px-1">
            <Lightbulb className="h-4 w-4 text-purple-400" />
            <h4 className="text-sm font-medium text-purple-400">Skills to Develop</h4>
          </div>

          <p className="text-xs text-white px-1">Based on your experience, consider:</p>

          <div className="grid grid-cols-2 gap-2">
            {recommendations.skillsGaps.slice(0, 4).map((gap, index) => (
              <motion.button
                key={gap.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => navigateToCourse(gap.searchQuery)}
                className={cn(
                  'p-4 rounded-xl border text-left transition-all touch-manipulation active:scale-[0.98]',
                  gap.importance === 'essential'
                    ? 'bg-purple-500/10 border-purple-500/30 hover:bg-purple-500/15'
                    : gap.importance === 'recommended'
                      ? 'bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/15'
                      : 'bg-white/[0.04] border-white/[0.08] hover:bg-white/[0.08]'
                )}
              >
                <div className="flex items-center gap-2 mb-2">
                  <RecommendationIcon
                    icon={gap.icon}
                    className={cn(
                      'h-5 w-5',
                      gap.importance === 'essential'
                        ? 'text-purple-400'
                        : gap.importance === 'recommended'
                          ? 'text-blue-400'
                          : 'text-white'
                    )}
                  />
                </div>
                <h5 className="font-medium text-white text-sm mb-1">{gap.skillName}</h5>
                <p className="text-xs text-white line-clamp-2">{gap.reason}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════════ */}
      {/* TIME FOR A REFRESHER? - Brush Up Suggestions */}
      {/* ═══════════════════════════════════════════════════════════════════════════ */}
      {recommendations && recommendations.brushUp.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <div className="flex items-center gap-2 px-1">
            <RefreshCw className="h-4 w-4 text-cyan-400" />
            <h4 className="text-sm font-medium text-cyan-400">Time for a Refresher?</h4>
          </div>

          <div className="space-y-2">
            {recommendations.brushUp.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => navigateToCourse(item.searchQuery)}
                className="w-full p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/20 text-left transition-all touch-manipulation active:scale-[0.99] hover:bg-cyan-500/10"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    {item.suggestionType === 'skill_stagnant' ? (
                      <TrendingUp className="h-5 w-5 text-cyan-400" />
                    ) : item.suggestionType === 'ready_to_advance' ? (
                      <Award className="h-5 w-5 text-cyan-400" />
                    ) : (
                      <Book className="h-5 w-5 text-cyan-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-medium text-white mb-1">{item.skillName}</h5>
                    <p className="text-sm text-white">{item.suggestion}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════════ */}
      {/* TRENDING IN THE INDUSTRY */}
      {/* ═══════════════════════════════════════════════════════════════════════════ */}
      {recommendations && recommendations.trending.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <div className="flex items-center gap-2 px-1">
            <TrendingUp className="h-4 w-4 text-green-400" />
            <h4 className="text-sm font-medium text-green-400">Trending in the Industry</h4>
          </div>

          <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4">
            <div className="flex flex-wrap gap-2 mb-3">
              {recommendations.trending.map((trend) => (
                <button
                  key={trend.id}
                  onClick={() => !trend.userHasSkill && navigateToCourse(trend.name)}
                  className={cn(
                    'px-3 py-1.5 rounded-full text-sm font-medium transition-all touch-manipulation',
                    trend.userHasSkill
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : 'bg-white/[0.06] text-white border border-white/[0.1] hover:bg-white/[0.12] active:scale-95'
                  )}
                >
                  <span className="flex items-center gap-1.5">
                    {trend.userHasSkill && <CheckCircle2 className="h-3.5 w-3.5" />}
                    <RecommendationIcon icon={trend.icon} className="h-3.5 w-3.5" />
                    {trend.name}
                  </span>
                </button>
              ))}
            </div>
            <p className="text-xs text-white">
              Skills employers are actively seeking. Tap to find courses.
            </p>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════════ */}
      {/* REMAINING COMPLIANCE ITEMS (90 days & Valid) */}
      {/* ═══════════════════════════════════════════════════════════════════════════ */}
      {(expiringIn90Days.length > 0 || validItems.length > 0) && (
        <div className="space-y-4">
          {/* Expiring in 90 Days */}
          {expiringIn90Days.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 px-1">
                <Clock className="h-4 w-4 text-yellow-400" />
                <h4 className="text-sm font-medium text-yellow-400">Expiring Within 90 Days</h4>
                <Badge className="ml-auto text-xs bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                  {expiringIn90Days.length}
                </Badge>
              </div>
              <div className="space-y-2">
                {expiringIn90Days.map((item, index) => renderComplianceCard(item, index))}
              </div>
            </div>
          )}

          {/* Valid Items */}
          {validItems.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 px-1">
                <CheckCircle2 className="h-4 w-4 text-green-400" />
                <h4 className="text-sm font-medium text-green-400">All Current</h4>
                <Badge className="ml-auto text-xs bg-green-500/20 text-green-400 border-green-500/30">
                  {validItems.length}
                </Badge>
              </div>
              <div className="space-y-2">
                {validItems.map((item, index) => renderComplianceCard(item, index))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Notification Settings */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={() => {
          toast({
            title: 'Coming Soon',
            description: 'Expiry reminders will be available in a future update.',
          });
        }}
        className="w-full p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center gap-4 touch-manipulation active:bg-white/[0.06] active:scale-[0.99] transition-all"
      >
        <div className="w-12 h-12 rounded-xl bg-elec-yellow/10 flex items-center justify-center">
          <Bell className="h-6 w-6 text-elec-yellow" />
        </div>
        <div className="flex-1 text-left">
          <p className="font-medium text-white">Expiry Reminders</p>
          <p className="text-sm text-white">Get notified before qualifications expire</p>
        </div>
        <ChevronRight className="h-5 w-5 text-white" />
      </motion.button>

      {/* Empty State */}
      {complianceItems.length === 0 &&
        (!recommendations || !recommendations.hasAnyRecommendations) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-12 text-center"
          >
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-white/[0.04] flex items-center justify-center">
              <Shield className="h-10 w-10 text-white" />
            </div>
            <h4 className="text-lg font-medium text-white mb-2">No compliance items yet</h4>
            <p className="text-white max-w-xs mx-auto mb-6">
              Add qualifications with expiry dates to track your compliance status.
            </p>
            {onNavigateToTab && (
              <Button
                onClick={() => onNavigateToTab('qualifications')}
                className="h-12 px-6 rounded-xl bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark font-semibold touch-manipulation active:scale-[0.97]"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Qualifications
              </Button>
            )}
          </motion.div>
        )}
    </div>
  );
};

export default ElecIdCompliance;
