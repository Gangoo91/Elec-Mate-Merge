/**
 * ELE-1994: tenders that fit what the firm bids for, the sources that really
 * feed the list, and the firm facts a pre-qualification questionnaire asks for.
 *
 * Criteria live in user_tender_preferences keyed on the FIRM (the owner's id),
 * so every manager of the firm sees and edits the same "what we bid for".
 */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useActingFirmId } from '@/hooks/useEmployerHome';

export interface TenderCriteria {
  base_postcode: string | null;
  base_lat: number | null;
  base_lng: number | null;
  search_radius_miles: number | null;
  regions: string[] | null;
  min_value: number | null;
  max_value: number | null;
  categories: string[] | null;
  accreditations: string[] | null;
  email_alerts: boolean | null;
  push_alerts: boolean | null;
  last_digest_at?: string | null;
}

export interface TenderMatch {
  id: string;
  title: string;
  client_name: string | null;
  /** Absent for office managers: the server strips it (can_see_firm_money). */
  value?: number | null;
  deadline: string | null;
  published_at: string | null;
  /** When the feed first carried it. Sources re-stamp published_at, so "new"
   *  is judged on this, server-side. */
  first_seen_at: string | null;
  is_new: boolean;
  region: string | null;
  location_text: string | null;
  source: string;
  source_url: string | null;
  categories: string[] | null;
  miles: number | null;
  tracked: boolean;
}

export interface TenderMatches {
  has_criteria: boolean;
  /** False for office managers: no tender values are sent. */
  can_see_money?: boolean;
  criteria?: TenderCriteria;
  total: number;
  /** New this week and not already in the pipeline. */
  new_this_week: number;
  items: TenderMatch[];
}

export interface TenderFeedSource {
  source: string;
  display_name: string;
  website_url: string | null;
  live: number;
  last_fetched: string | null;
}

export interface TenderPrequal {
  company_name: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  company_registration: string | null;
  vat_number: string | null;
  trading_since: number | null;
  registration_scheme: string | null;
  registration_number: string | null;
  registration_expiry: string | null;
  insurance_provider: string | null;
  insurance_coverage: string | null;
  insurance_expiry: string | null;
  headcount: number;
  apprentices: number;
  riddor_3y: number;
  incidents_3y: number;
  policies: { name: string; adopted_at: string | null; review_date: string | null }[];
}

/** Names the catalogue gets wrong or doesn't have. */
const SOURCE_NAMES: Record<string, string> = {
  eu_supply: 'EU Supply',
  planit: 'PlanIt (planning applications)',
  in_tend: 'In-Tend',
};

/** The work types the feed tags (tender_opportunities.categories). */
export const TENDER_WORK_TYPES: { key: string; label: string }[] = [
  { key: 'electrical', label: 'All electrical work' },
  { key: 'rewire', label: 'Rewires' },
  { key: 'testing', label: 'Testing and inspection' },
  { key: 'fire_alarm', label: 'Fire alarms' },
  { key: 'emergency_lighting', label: 'Emergency lighting' },
  { key: 'ev_charging', label: 'EV charging' },
  { key: 'consumer_units', label: 'Consumer units' },
  { key: 'data_cabling', label: 'Data cabling' },
];

/** Regions as the matcher keys them (punctuation and case ignored). */
export const TENDER_REGIONS: { key: string; label: string }[] = [
  { key: 'london', label: 'London' },
  { key: 'southeast', label: 'South East' },
  { key: 'southwest', label: 'South West' },
  { key: 'eastengland', label: 'East of England' },
  { key: 'eastmidlands', label: 'East Midlands' },
  { key: 'westmidlands', label: 'West Midlands' },
  { key: 'yorkshire', label: 'Yorkshire and the Humber' },
  { key: 'northwest', label: 'North West' },
  { key: 'northeast', label: 'North East' },
  { key: 'wales', label: 'Wales' },
  { key: 'scotland', label: 'Scotland' },
  { key: 'northernireland', label: 'Northern Ireland' },
];

export const regionLabel = (r: string | null | undefined) => {
  if (!r) return null;
  const k = r.toLowerCase().replace(/[^a-z]/g, '');
  return TENDER_REGIONS.find((x) => x.key === k)?.label ?? r;
};

export const sourceLabel = (s: string, fallback?: string) =>
  SOURCE_NAMES[s] ?? fallback ?? s.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

export const TENDER_MATCHES_KEY = 'tender-matches';

export function useTenderMatches(limit = 12) {
  const { data: firmId } = useActingFirmId();
  return useQuery({
    queryKey: [TENDER_MATCHES_KEY, firmId, limit],
    enabled: !!firmId,
    staleTime: 5 * 60_000,
    // "Show all" raises the limit; keep the current list on screen meanwhile.
    placeholderData: (prev) => prev,
    queryFn: async (): Promise<TenderMatches> => {
      const { data, error } = await supabase.rpc(
        'get_tender_matches' as never,
        {
          p_firm: firmId,
          p_limit: limit,
        } as never
      );
      if (error) throw error;
      return data as unknown as TenderMatches;
    },
  });
}

export function useTenderFeedSources() {
  return useQuery({
    queryKey: ['tender-feed-sources'],
    staleTime: 30 * 60_000,
    queryFn: async (): Promise<TenderFeedSource[]> => {
      const { data, error } = await supabase.rpc('get_tender_feed_sources' as never);
      if (error) throw error;
      return ((data ?? []) as unknown as TenderFeedSource[]).map((s) => ({
        ...s,
        display_name: sourceLabel(s.source, s.display_name),
      }));
    },
  });
}

export function useTenderPrequal(enabled = true) {
  const { data: firmId } = useActingFirmId();
  return useQuery({
    queryKey: ['tender-prequal', firmId],
    enabled: enabled && !!firmId,
    staleTime: 5 * 60_000,
    queryFn: async (): Promise<TenderPrequal> => {
      const { data, error } = await supabase.rpc(
        'get_tender_prequal' as never,
        {
          p_firm: firmId,
        } as never
      );
      if (error) throw error;
      return data as unknown as TenderPrequal;
    },
  });
}

/** Save "what we bid for". A postcode is geocoded so the radius can work. */
export function useSaveTenderCriteria() {
  const qc = useQueryClient();
  const { data: firmId } = useActingFirmId();
  return useMutation({
    mutationFn: async (c: Omit<TenderCriteria, 'base_lat' | 'base_lng'>) => {
      if (!firmId) throw new Error('No firm');
      let base_lat: number | null = null;
      let base_lng: number | null = null;
      const pc = c.base_postcode?.trim().toUpperCase() || null;
      if (pc) {
        const { data } = await supabase.functions.invoke('geocode-location', {
          body: { location: pc },
        });
        const loc = (data as { location?: { lat?: number; lng?: number } } | null)?.location;
        if (typeof loc?.lat === 'number' && typeof loc?.lng === 'number') {
          base_lat = loc.lat;
          base_lng = loc.lng;
        } else {
          throw new Error(`We couldn't find ${pc} on the map. Check the postcode.`);
        }
      }
      const { error } = await supabase.from('user_tender_preferences').upsert({
        user_id: firmId,
        ...c,
        base_postcode: pc,
        base_lat,
        base_lng,
        alert_frequency: 'weekly',
        updated_at: new Date().toISOString(),
      } as never);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [TENDER_MATCHES_KEY] });
    },
  });
}
