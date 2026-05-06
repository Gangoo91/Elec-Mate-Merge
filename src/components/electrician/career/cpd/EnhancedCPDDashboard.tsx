/**
 * EnhancedCPDDashboard — editorial CPD compliance dashboard.
 *
 * Type-led compliance overview: hero strip with overall %, category
 * breakdown, three-cell stat strip (entries / verified / pending), action
 * row, renewal reminder. Drops the stock Card chrome and the bg-yellow-50
 * (light) alert card for editorial gradient surfaces + tabular numbers.
 */

import React, { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import {
  BookOpen,
  Clock,
  Download,
  FileText,
  Plus,
  Target,
  CheckCircle,
  AlertCircle,
  Calendar,
  ArrowRight,
} from 'lucide-react';
import {
  professionalBodyService,
  UserProfessionalMembership,
} from '@/services/professionalBodyService';
import { enhancedCPDService, CPDComplianceStats } from '@/services/enhancedCPDService';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import ProfessionalBodySelector from './ProfessionalBodySelector';
import { Eyebrow } from '@/components/college/primitives';
import { cn } from '@/lib/utils';

interface EnhancedCPDDashboardProps {
  onAddEntry?: () => void;
  onViewHistory?: () => void;
  onManageGoals?: () => void;
}

const EnhancedCPDDashboard: React.FC<EnhancedCPDDashboardProps> = ({
  onAddEntry,
  onViewHistory,
  onManageGoals,
}) => {
  const [memberships, setMemberships] = useState<UserProfessionalMembership[]>([]);
  const [selectedMembership, setSelectedMembership] = useState<UserProfessionalMembership | null>(
    null
  );
  const [complianceStats, setComplianceStats] = useState<CPDComplianceStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [showSelector, setShowSelector] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadUserMemberships();
  }, []);

  useEffect(() => {
    if (selectedMembership) {
      loadComplianceStats(selectedMembership.professional_body_id);
    }
  }, [selectedMembership]);

  const loadUserMemberships = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setShowSelector(true);
        setLoading(false);
        return;
      }
      const userMemberships = await professionalBodyService.getUserMemberships(user.id);
      setMemberships(userMemberships);
      if (userMemberships.length === 0) {
        setShowSelector(true);
      } else {
        setSelectedMembership(userMemberships[0]);
      }
    } catch (error) {
      console.error('Error loading memberships:', error);
      toast({
        title: 'Error loading memberships',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const loadComplianceStats = async (professionalBodyId: string) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      const stats = await enhancedCPDService.getComplianceStats(user.id, professionalBodyId);
      setComplianceStats(stats);
    } catch (error) {
      console.error('Error loading compliance stats:', error);
      toast({
        title: 'Error loading compliance data',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    }
  };

  const handleMembershipsComplete = (newMemberships: UserProfessionalMembership[]) => {
    setMemberships(newMemberships);
    setSelectedMembership(newMemberships[0]);
    setShowSelector(false);
  };

  const handleGeneratePortfolio = async () => {
    if (!selectedMembership) return;
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      const title = `${selectedMembership.professional_body?.name} CPD Portfolio ${new Date().getFullYear()}`;
      await enhancedCPDService.generatePortfolio(
        user.id,
        selectedMembership.professional_body_id,
        title
      );
      toast({
        title: 'Portfolio generated',
        description: 'Your CPD portfolio is ready to export.',
      });
    } catch (error) {
      console.error('Error generating portfolio:', error);
      toast({
        title: 'Error generating portfolio',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-elec-yellow"></div>
      </div>
    );
  }

  if (showSelector) {
    return <ProfessionalBodySelector onComplete={handleMembershipsComplete} />;
  }

  if (!selectedMembership || !complianceStats) {
    return (
      <div className="rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-8 text-center">
        <AlertCircle className="h-8 w-8 text-elec-yellow mx-auto" />
        <h3 className="mt-3 text-[18px] font-semibold tracking-tight text-white">
          Loading CPD dashboard…
        </h3>
        <p className="mt-1 text-[12.5px] text-white/85">Pulling your latest compliance data.</p>
      </div>
    );
  }

  const overallPct = complianceStats.compliance_percentage;
  const overallTone =
    overallPct >= 100
      ? 'text-emerald-300'
      : overallPct >= 75
        ? 'text-amber-300'
        : 'text-red-300';

  const renewalDate = selectedMembership.renewal_date
    ? new Date(selectedMembership.renewal_date)
    : null;
  const daysToRenewal = renewalDate
    ? Math.ceil((renewalDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <section className="space-y-2">
        <Eyebrow>{selectedMembership.professional_body?.code ?? 'CPD'} · COMPLIANCE</Eyebrow>
        <h2 className="text-[26px] sm:text-[32px] font-semibold tracking-tight leading-tight">
          <span className="text-elec-yellow">Track</span>{' '}
          <span className="text-white">to your scheme.</span>
        </h2>
        <p className="text-[13px] leading-relaxed text-white/85 max-w-2xl">
          Hours, evidence and category split for{' '}
          <span className="text-white font-semibold">
            {selectedMembership.professional_body?.name}
          </span>
          .
        </p>

        {memberships.length > 1 && (
          <div className="flex flex-wrap gap-1.5 pt-2">
            {memberships.map((m) => {
              const isActive = m.id === selectedMembership.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setSelectedMembership(m)}
                  className={cn(
                    'inline-flex items-center text-[11px] font-semibold uppercase tracking-[0.12em] border rounded-full px-3 py-1.5 touch-manipulation transition-colors',
                    isActive
                      ? 'text-elec-yellow border-elec-yellow/40 bg-elec-yellow/[0.08]'
                      : 'text-white/85 border-white/15 hover:border-white/30'
                  )}
                >
                  {m.professional_body?.code}
                </button>
              );
            })}
          </div>
        )}
      </section>

      {/* Overall progress */}
      <section className="rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-5 sm:p-6">
        <div className="flex items-baseline justify-between gap-3 flex-wrap">
          <Eyebrow>OVERALL</Eyebrow>
          <span className={cn('text-[28px] sm:text-[34px] font-semibold tabular-nums', overallTone)}>
            {overallPct}%
          </span>
        </div>
        <Progress value={Math.min(overallPct, 100)} className="mt-3 w-full h-1.5" />
        <div className="mt-3 flex items-baseline justify-between text-[11.5px] tabular-nums text-white/85">
          <span>0h</span>
          <span className="text-white">
            <span className="text-white font-semibold">{complianceStats.total_hours}</span> of{' '}
            <span className="font-semibold">{complianceStats.required_hours}</span>h
          </span>
          <span>{complianceStats.required_hours}h</span>
        </div>
      </section>

      {/* Categories */}
      <section className="space-y-4">
        <Eyebrow>BY CATEGORY</Eyebrow>
        <div className="rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-5 sm:p-6 divide-y divide-white/[0.06]">
          {complianceStats.categories.map((category) => {
            const pct = Math.min(category.percentage, 100);
            const tone =
              category.percentage >= 100
                ? 'text-emerald-300'
                : category.percentage >= 75
                  ? 'text-amber-300'
                  : 'text-red-300';
            return (
              <div key={category.id} className="py-3 first:pt-0 last:pb-0 space-y-2">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-[13.5px] font-semibold text-white truncate">
                    {category.name}
                  </span>
                  <span className="text-[12px] tabular-nums text-white/85">
                    <span className={cn('font-semibold', tone)}>{category.completed_hours}</span>h /{' '}
                    {category.required_hours}h
                  </span>
                </div>
                <Progress value={pct} className="w-full h-1.5" />
                <div className="text-[10.5px] uppercase tracking-[0.14em] font-semibold text-white/65 tabular-nums">
                  {category.percentage}% complete
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Stat strip */}
      <section>
        <Eyebrow>ACTIVITY</Eyebrow>
        <dl className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <StatCell
            icon={FileText}
            label="Entries"
            value={complianceStats.entries_count}
            subtitle="logged"
          />
          <StatCell
            icon={CheckCircle}
            label="Verified"
            value={complianceStats.verified_entries}
            subtitle="evidence accepted"
            accent
          />
          <StatCell
            icon={Clock}
            label="Pending"
            value={complianceStats.pending_verification}
            subtitle="awaiting review"
          />
        </dl>
      </section>

      {/* Actions */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        <ActionButton primary icon={Plus} label="Add entry" onClick={onAddEntry} />
        <ActionButton icon={BookOpen} label="History" onClick={onViewHistory} />
        <ActionButton icon={Download} label="Export portfolio" onClick={handleGeneratePortfolio} />
        <ActionButton icon={Target} label="Manage goals" onClick={onManageGoals} />
      </section>

      {/* Renewal reminder */}
      {renewalDate && (
        <section className="rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <Calendar className="h-4 w-4 text-elec-yellow shrink-0 self-center" aria-hidden />
            <div className="min-w-0 flex-1">
              <Eyebrow>RENEWAL</Eyebrow>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-white">
                <span className="text-white font-semibold">
                  {selectedMembership.professional_body?.name}
                </span>{' '}
                renews{' '}
                <span className="text-elec-yellow font-semibold tabular-nums">
                  {renewalDate.toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
                {daysToRenewal !== null && daysToRenewal >= 0 && (
                  <span className="text-white/65"> · {daysToRenewal} day{daysToRenewal === 1 ? '' : 's'} away</span>
                )}
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

const StatCell = ({
  icon: Icon,
  label,
  value,
  subtitle,
  accent,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  subtitle: string;
  accent?: boolean;
}) => (
  <div className="rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-4 sm:p-5">
    <div className="flex items-baseline justify-between gap-2">
      <Icon
        className={cn('h-3.5 w-3.5', accent ? 'text-emerald-300' : 'text-elec-yellow')}
        aria-hidden
      />
      <span className="text-[9.5px] uppercase tracking-[0.14em] font-semibold text-white/65">
        {label}
      </span>
    </div>
    <div
      className={cn(
        'mt-2 text-[28px] font-semibold tabular-nums',
        accent ? 'text-emerald-300' : 'text-white'
      )}
    >
      {value}
    </div>
    <div className="mt-0.5 text-[11px] text-white/65">{subtitle}</div>
  </div>
);

const ActionButton = ({
  primary,
  icon: Icon,
  label,
  onClick,
}: {
  primary?: boolean;
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      'inline-flex items-center justify-center gap-2 text-[11.5px] font-semibold uppercase tracking-[0.14em] rounded-full px-4 py-2.5 min-h-[44px] touch-manipulation transition-colors',
      primary
        ? 'text-black bg-elec-yellow hover:bg-elec-yellow/90 active:bg-elec-yellow/85'
        : 'text-white/85 border border-white/15 hover:border-white/30'
    )}
  >
    <Icon className="h-4 w-4" />
    {label}
    {primary && <ArrowRight className="h-4 w-4" />}
  </button>
);

export default EnhancedCPDDashboard;
