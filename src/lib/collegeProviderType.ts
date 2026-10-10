/**
 * Provider type (ELE-1979). The College Hub serves FE colleges, independent
 * training providers and employers that are their own apprenticeship
 * provider. Same product: the type changes the words and a few set-up
 * defaults, nothing else.
 *
 * Stored on colleges.provider_type; changed by a college admin or head of
 * department (set_college_provider_type) or at set-up.
 */
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export type ProviderType = 'fe_college' | 'itp' | 'employer_provider';

export interface ProviderWords {
  type: ProviderType;
  /** What the type is called in a picker. */
  label: string;
  /** One line under the label in a picker. */
  description: string;
  /** "college" / "centre": the word for the organisation, lower case. */
  noun: string;
  /** "College" / "Centre". */
  Noun: string;
  /** "your college" / "your centre". */
  yours: string;
  /** Sessions run on a weekly timetable (cohort meeting day and time). */
  usesTimetable: boolean;
  /** Learners are spread across many employers, so employers are a set-up step. */
  manyEmployers: boolean;
  /** Short note shown in set-up about what is different for this type. */
  setupNote: string;
}

export const PROVIDER_WORDS: Record<ProviderType, ProviderWords> = {
  fe_college: {
    type: 'fe_college',
    label: 'FE college',
    description: 'A further education college teaching electrical apprenticeships and courses.',
    noun: 'college',
    Noun: 'College',
    yours: 'your college',
    usesTimetable: true,
    manyEmployers: true,
    setupNote: 'Cohorts meet on a timetable. Learners work for many different employers.',
  },
  itp: {
    type: 'itp',
    label: 'Independent training provider',
    description: 'A training provider or centre that delivers apprenticeships for employers.',
    noun: 'centre',
    Noun: 'Centre',
    yours: 'your centre',
    usesTimetable: true,
    manyEmployers: true,
    setupNote:
      'Learners come from many employers, so adding the employers you work with early pays off.',
  },
  employer_provider: {
    type: 'employer_provider',
    label: 'Employer-provider',
    description: 'An employer that is its own apprenticeship provider and trains its own staff.',
    noun: 'centre',
    Noun: 'Centre',
    yours: 'your centre',
    usesTimetable: false,
    manyEmployers: false,
    setupNote:
      'Your apprentices work for you, so there are no outside employers to add. Training sessions do not need a weekly timetable.',
  },
};

export const PROVIDER_TYPES: ProviderType[] = ['fe_college', 'itp', 'employer_provider'];

export function providerWords(type: string | null | undefined): ProviderWords {
  return PROVIDER_WORDS[
    (type as ProviderType) in PROVIDER_WORDS ? (type as ProviderType) : 'fe_college'
  ];
}

const KEY = (collegeId: string | null | undefined) =>
  ['college-provider-type', collegeId ?? null] as const;

/** The provider type of a college (defaults to FE college while loading). */
export function useProviderType(collegeId: string | null | undefined) {
  const q = useQuery({
    queryKey: KEY(collegeId),
    enabled: !!collegeId,
    staleTime: 5 * 60_000,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('colleges')
        .select('provider_type' as never)
        .eq('id', collegeId as string)
        .maybeSingle();
      if (error) throw error;
      return ((data as { provider_type?: string } | null)?.provider_type ??
        'fe_college') as ProviderType;
    },
  });
  return { type: q.data ?? 'fe_college', words: providerWords(q.data), isLoading: q.isLoading };
}

export async function setProviderType(collegeId: string, type: ProviderType): Promise<void> {
  const { error } = await supabase.rpc(
    'set_college_provider_type' as never,
    { p_college: collegeId, p_type: type } as never
  );
  if (error) throw new Error(error.message);
}

export function useInvalidateProviderType() {
  const qc = useQueryClient();
  return (collegeId: string | null | undefined) =>
    qc.invalidateQueries({ queryKey: KEY(collegeId) });
}
