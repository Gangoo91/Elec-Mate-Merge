import { useState, useEffect, useCallback, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import type { VerificationTier } from "@/components/employer/SparkProfileSheet";

export interface TalentPoolWorker {
  id: string;
  elecIdProfileId: string;
  elecIdNumber: string;
  name: string;
  email?: string;
  phone?: string;
  avatar?: string;
  role: string;
  ecsCardType: string;
  ecsExpiry?: string;
  verificationTier: VerificationTier;
  isVerified: boolean;
  availableForHire: boolean;
  profileVisibility: string;
  specialisms: string[];
  bio?: string;
  hourlyRate: number;
  dayRate: number;
  qualifications: string[];
  qualificationsCount: number;
  skills: string[];
  skillsCount: number;
  verifiedDocsCount: number;
  // UI enhancement fields
  availability: 'Immediate' | '1 week notice' | 'Limited';
  experience: number;
  rating: number;
  completedJobs: number;
  distance: number;
  location: string;
  responseTime: string;
}

interface UseTalentPoolOptions {
  searchQuery?: string;
  tierFilter?: 'all' | 'verified' | 'premium';
  availabilityFilter?: 'all' | 'now' | 'week';
  specialismsFilter?: string[];
}

interface UseTalentPoolReturn {
  workers: TalentPoolWorker[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  totalCount: number;
  availableNowCount: number;
}

// Helper to calculate day rate from hourly
const calculateDayRate = (hourlyRate: number): number => {
  return Math.round(hourlyRate * 8);
};

// Helper to convert any rate type to day rate
const convertToDayRate = (amount: number, type: string): number => {
  switch (type) {
    case 'hourly': return Math.round(amount * 8);
    case 'daily': return Math.round(amount);
    case 'weekly': return Math.round(amount / 5);
    case 'yearly': return Math.round(amount / 260); // 52 weeks × 5 days
    default: return Math.round(amount);
  }
};

// Helper to determine availability status
const determineAvailability = (tier: string): 'Immediate' | '1 week notice' | 'Limited' => {
  // In production, this would come from a schedule/availability table
  // For now, use tier as a proxy (verified/premium more likely to be available)
  if (tier === 'premium') return 'Immediate';
  if (tier === 'verified') return '1 week notice';
  return 'Limited';
};

// Generate stable mock values based on ID for demo purposes
const generateStableValue = (id: string, min: number, max: number): number => {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = ((hash << 5) - hash) + id.charCodeAt(i);
    hash = hash & hash;
  }
  return min + (Math.abs(hash) % (max - min + 1));
};

export function useTalentPool(options: UseTalentPoolOptions = {}): UseTalentPoolReturn {
  const { user } = useAuth();
  const [workers, setWorkers] = useState<TalentPoolWorker[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWorkers = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Fetch profiles with employee data
      const { data: profiles, error: profileError } = await supabase
        .from("employer_elec_id_profiles")
        .select(`
          id,
          employee_id,
          elec_id_number,
          ecs_card_type,
          ecs_expiry_date,
          verification_tier,
          is_verified,
          available_for_hire,
          opt_out,
          profile_visibility,
          specialisations,
          bio,
          rate_type,
          rate_amount,
          employer_employees!inner (
            id,
            name,
            email,
            phone,
            photo_url,
            hourly_rate,
            role
          )
        `)
        .eq("opt_out", false)
        .eq("available_for_hire", true)
        .in("profile_visibility", ["public", "employers_only"]);

      if (profileError) {
        console.error("Error fetching talent pool:", profileError);
        setError("Failed to load talent pool");
        return;
      }

      if (!profiles || profiles.length === 0) {
        setWorkers([]);
        return;
      }

      // Fetch qualifications for all profiles
      const profileIds = profiles.map(p => p.id);
      const { data: qualifications } = await supabase
        .from("employer_elec_id_qualifications")
        .select("profile_id, qualification_name, is_verified")
        .in("profile_id", profileIds);

      // Fetch skills for all profiles
      const { data: skills } = await supabase
        .from("employer_elec_id_skills")
        .select("profile_id, skill_name, is_verified")
        .in("profile_id", profileIds);

      // Fetch verified documents count
      const { data: documents } = await supabase
        .from("elec_id_documents")
        .select("profile_id, verification_status")
        .in("profile_id", profileIds)
        .eq("verification_status", "verified");

      // Map qualifications by profile
      const qualsByProfile = (qualifications || []).reduce((acc, q) => {
        if (!acc[q.profile_id]) acc[q.profile_id] = [];
        acc[q.profile_id].push(q.qualification_name);
        return acc;
      }, {} as Record<string, string[]>);

      // Map skills by profile
      const skillsByProfile = (skills || []).reduce((acc, s) => {
        if (!acc[s.profile_id]) acc[s.profile_id] = [];
        acc[s.profile_id].push(s.skill_name);
        return acc;
      }, {} as Record<string, string[]>);

      // Count verified docs by profile
      const verifiedDocsByProfile = (documents || []).reduce((acc, d) => {
        acc[d.profile_id] = (acc[d.profile_id] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      // Transform to TalentPoolWorker format
      const transformedWorkers: TalentPoolWorker[] = profiles.map((profile: any) => {
        const employee = profile.employer_employees;
        const hourlyRate = parseFloat(employee.hourly_rate) || 25;
        const profileQuals = qualsByProfile[profile.id] || [];
        const profileSkills = skillsByProfile[profile.id] || [];

        // Use profile rate if set, otherwise calculate from hourly
        const dayRate = profile.rate_amount
          ? convertToDayRate(profile.rate_amount, profile.rate_type || 'daily')
          : calculateDayRate(hourlyRate);

        return {
          id: employee.id,
          elecIdProfileId: profile.id,
          elecIdNumber: profile.elec_id_number,
          name: employee.name,
          email: employee.email,
          phone: employee.phone,
          avatar: employee.photo_url,
          role: employee.role || 'Electrician',
          ecsCardType: profile.ecs_card_type || 'gold',
          ecsExpiry: profile.ecs_expiry_date,
          verificationTier: (profile.verification_tier || 'basic') as VerificationTier,
          isVerified: profile.is_verified || false,
          availableForHire: profile.available_for_hire,
          profileVisibility: profile.profile_visibility,
          specialisms: profile.specialisations || [],
          bio: profile.bio,
          hourlyRate,
          dayRate,
          qualifications: profileQuals,
          qualificationsCount: profileQuals.length,
          skills: profileSkills,
          skillsCount: profileSkills.length,
          verifiedDocsCount: verifiedDocsByProfile[profile.id] || 0,
          // Generate stable demo values
          availability: determineAvailability(profile.verification_tier),
          experience: generateStableValue(profile.id, 2, 20),
          rating: 4 + (generateStableValue(profile.id, 0, 10) / 10),
          completedJobs: generateStableValue(profile.id, 5, 150),
          distance: generateStableValue(profile.id, 1, 25),
          location: 'Manchester, UK', // Would come from geolocation in production
          responseTime: profile.verification_tier === 'premium' ? '< 1hr' :
                        profile.verification_tier === 'verified' ? '< 2hrs' : '< 4hrs',
        };
      });

      setWorkers(transformedWorkers);
    } catch (err) {
      console.error("Error in useTalentPool:", err);
      setError("An error occurred while loading talent pool");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Apply client-side filters
  const filteredWorkers = useMemo(() => {
    let result = workers;

    // Search filter
    if (options.searchQuery) {
      const query = options.searchQuery.toLowerCase();
      result = result.filter(w =>
        w.name.toLowerCase().includes(query) ||
        w.location.toLowerCase().includes(query) ||
        w.specialisms.some(s => s.toLowerCase().includes(query)) ||
        w.role.toLowerCase().includes(query)
      );
    }

    // Tier filter
    if (options.tierFilter && options.tierFilter !== 'all') {
      if (options.tierFilter === 'verified') {
        result = result.filter(w => w.verificationTier === 'verified' || w.verificationTier === 'premium');
      } else if (options.tierFilter === 'premium') {
        result = result.filter(w => w.verificationTier === 'premium');
      }
    }

    // Availability filter
    if (options.availabilityFilter && options.availabilityFilter !== 'all') {
      if (options.availabilityFilter === 'now') {
        result = result.filter(w => w.availability === 'Immediate');
      } else if (options.availabilityFilter === 'week') {
        result = result.filter(w => w.availability !== 'Limited');
      }
    }

    // Specialisms filter
    if (options.specialismsFilter && options.specialismsFilter.length > 0) {
      result = result.filter(w =>
        options.specialismsFilter!.some(s => w.specialisms.includes(s))
      );
    }

    return result;
  }, [workers, options.searchQuery, options.tierFilter, options.availabilityFilter, options.specialismsFilter]);

  // Calculate counts
  const totalCount = filteredWorkers.length;
  const availableNowCount = filteredWorkers.filter(w => w.availability === 'Immediate').length;

  // Initial fetch
  useEffect(() => {
    fetchWorkers();
  }, [fetchWorkers]);

  // Set up real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('talent-pool-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'employer_elec_id_profiles',
        },
        () => {
          // Refetch when profiles change
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
    availableNowCount,
  };
}
