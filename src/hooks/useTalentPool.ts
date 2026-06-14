import { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { realtimeChannelName } from '@/lib/realtimeChannel';
import type { VerificationTier } from '@/components/employer/SparkProfileSheet';

/* ==========================================================================
   useTalentPool — employer-side candidate browsing.
   Reads via the sanitised get_talent_pool() RPC: real declared signals only
   (ECS card, verification tier, declared rate, skills with declared years,
   verified document types). No contact details until the employer reaches
   out, and nothing invented client-side.
   ========================================================================== */

export interface TalentPoolSkill {
  name: string;
  level: string | null;
  years: number | null;
}

export interface TalentPoolWorker {
  profileId: string;
  name: string;
  photoUrl: string | null;
  jobTitle: string | null;
  bio: string | null;
  specialisms: string[];
  ecsCardType: string | null;
  ecsExpiry: string | null;
  isVerified: boolean;
  verificationTier: VerificationTier;
  verificationStatus: string | null;
  rateType: string | null;
  rateAmount: number | null;
  /** Derived from the worker's DECLARED rate only — null when not declared */
  dayRate: number | null;
  memberSince: string | null;
  skills: TalentPoolSkill[];
  skillNames: string[];
  /** Highest years-of-experience the worker declared on any skill — null if none declared */
  yearsExperience: number | null;
  qualificationsCount: number;
  /** Real verified document types: ecs_card, qualification, training, driving_licence, insurance */
  verifiedDocuments: string[];
  workHistoryCount: number;
}

export type ExperienceLevel = 'all' | 'entry' | 'mid' | 'senior';

interface UseTalentPoolOptions {
  searchQuery?: string;
  tierFilter?: 'all' | 'verified' | 'premium';
  specialismsFilter?: string[];
  experienceFilter?: ExperienceLevel;
  ecsCardFilter?: string[];
  skillsFilter?: string[];
  minRate?: number;
  maxRate?: number;
}

interface UseTalentPoolReturn {
  workers: TalentPoolWorker[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  totalCount: number;
  verifiedCount: number;
}

const convertToDayRate = (amount: number, type: string): number => {
  switch (type) {
    case 'hourly':
      return Math.round(amount * 8);
    case 'daily':
      return Math.round(amount);
    case 'weekly':
      return Math.round(amount / 5);
    case 'yearly':
      return Math.round(amount / 260); // 52 weeks × 5 days
    default:
      return Math.round(amount);
  }
};

export function useTalentPool(options: UseTalentPoolOptions = {}): UseTalentPoolReturn {
  const [workers, setWorkers] = useState<TalentPoolWorker[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWorkers = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: rpcError } = await supabase.rpc('get_talent_pool');
      if (rpcError) {
        console.error('Error fetching talent pool:', rpcError);
        setError('Failed to load talent pool');
        return;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const rows: any[] = Array.isArray(data) ? data : [];

      const transformed: TalentPoolWorker[] = rows.map((row) => {
        const skills: TalentPoolSkill[] = Array.isArray(row.skills)
          ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
            row.skills.map((s: any) => ({
              name: s.name,
              level: s.level ?? null,
              years: s.years != null ? Number(s.years) : null,
            }))
          : [];
        const declaredYears = skills
          .map((s) => s.years)
          .filter((y): y is number => y != null && y > 0);

        return {
          profileId: row.profile_id,
          name: row.name || 'Unnamed profile',
          photoUrl: row.photo_url ?? null,
          jobTitle: row.job_title ?? null,
          bio: row.bio ?? null,
          specialisms: Array.isArray(row.specialisations) ? row.specialisations : [],
          ecsCardType: row.ecs_card_type ?? null,
          ecsExpiry: row.ecs_expiry_date ?? null,
          isVerified: Boolean(row.is_verified),
          verificationTier: (row.verification_tier || 'basic') as VerificationTier,
          verificationStatus: row.verification_status ?? null,
          rateType: row.rate_type ?? null,
          rateAmount: row.rate_amount != null ? Number(row.rate_amount) : null,
          dayRate:
            row.rate_amount != null && Number(row.rate_amount) > 0
              ? convertToDayRate(Number(row.rate_amount), row.rate_type || 'daily')
              : null,
          memberSince: row.member_since ?? null,
          skills,
          skillNames: skills.map((s) => s.name),
          yearsExperience: declaredYears.length > 0 ? Math.max(...declaredYears) : null,
          qualificationsCount: Number(row.qualifications_count) || 0,
          verifiedDocuments: Array.isArray(row.verified_documents) ? row.verified_documents : [],
          workHistoryCount: Number(row.work_history_count) || 0,
        };
      });

      setWorkers(transformed);
    } catch (err) {
      console.error('Error in useTalentPool:', err);
      setError('An error occurred while loading talent pool');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const filteredWorkers = useMemo(() => {
    let result = workers;

    if (options.searchQuery) {
      const query = options.searchQuery.toLowerCase();
      result = result.filter(
        (w) =>
          w.name.toLowerCase().includes(query) ||
          (w.jobTitle || '').toLowerCase().includes(query) ||
          w.specialisms.some((s) => s.toLowerCase().includes(query)) ||
          w.skillNames.some((s) => s.toLowerCase().includes(query))
      );
    }

    if (options.tierFilter && options.tierFilter !== 'all') {
      if (options.tierFilter === 'verified') {
        result = result.filter(
          (w) => w.verificationTier === 'verified' || w.verificationTier === 'premium'
        );
      } else if (options.tierFilter === 'premium') {
        result = result.filter((w) => w.verificationTier === 'premium');
      }
    }

    if (options.specialismsFilter && options.specialismsFilter.length > 0) {
      result = result.filter((w) =>
        options.specialismsFilter!.some((s) => w.specialisms.includes(s))
      );
    }

    // Experience = years the worker DECLARED on their skills; undeclared only matches 'all'
    if (options.experienceFilter && options.experienceFilter !== 'all') {
      result = result.filter((w) => {
        if (w.yearsExperience == null) return false;
        switch (options.experienceFilter) {
          case 'entry':
            return w.yearsExperience <= 2;
          case 'mid':
            return w.yearsExperience >= 3 && w.yearsExperience <= 7;
          case 'senior':
            return w.yearsExperience >= 8;
          default:
            return true;
        }
      });
    }

    if (options.ecsCardFilter && options.ecsCardFilter.length > 0) {
      result = result.filter((w) =>
        options.ecsCardFilter!.some(
          (cardType) => (w.ecsCardType || '').toLowerCase() === cardType.toLowerCase()
        )
      );
    }

    if (options.skillsFilter && options.skillsFilter.length > 0) {
      result = result.filter((w) =>
        options.skillsFilter!.some((skill) =>
          w.skillNames.some((s) => s.toLowerCase().includes(skill.toLowerCase()))
        )
      );
    }

    // Rate filters only apply to workers who declared a rate
    if (options.minRate !== undefined && options.minRate > 0) {
      result = result.filter((w) => w.dayRate != null && w.dayRate >= options.minRate!);
    }
    if (options.maxRate !== undefined && options.maxRate > 0) {
      result = result.filter((w) => w.dayRate != null && w.dayRate <= options.maxRate!);
    }

    return result;
  }, [
    workers,
    options.searchQuery,
    options.tierFilter,
    options.specialismsFilter,
    options.experienceFilter,
    options.ecsCardFilter,
    options.skillsFilter,
    options.minRate,
    options.maxRate,
  ]);

  const totalCount = filteredWorkers.length;
  const verifiedCount = filteredWorkers.filter(
    (w) => w.verificationTier === 'verified' || w.verificationTier === 'premium'
  ).length;

  useEffect(() => {
    fetchWorkers();
  }, [fetchWorkers]);

  useEffect(() => {
    const channel = supabase
      .channel(realtimeChannelName('talent-pool-changes'))
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'employer_elec_id_profiles' },
        () => {
          fetchWorkers();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchWorkers]);

  return {
    workers: filteredWorkers,
    isLoading,
    error,
    refetch: fetchWorkers,
    totalCount,
    verifiedCount,
  };
}
