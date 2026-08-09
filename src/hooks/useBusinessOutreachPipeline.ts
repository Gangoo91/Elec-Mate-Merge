/**
 * Business-outreach pipeline derivation.
 *
 * Extracted from AdminBusinessOutreach so the page renders and this file
 * decides what the numbers mean. Every figure the page shows now comes from
 * one place, over one scope (the `business_pool` tag), which is what the page
 * previously got wrong: its headline cards were fed by `get_stats` (every
 * campaign ever sent, College included) and `get_contact_stats` (every contact
 * row in the table, pool or not), while the list beneath them showed only the
 * business pool. Three scopes, one screen, no way to make them add up.
 */

import { useMemo } from 'react';
import { useAdminUsersBase } from '@/hooks/useAdminUsersBase';

/** Every contact this page deals with carries this tag. */
export const BUSINESS_POOL_TAG = 'business_pool';

/**
 * Shape of an `outreach_contacts` row as returned by the `get_contacts` action.
 *
 * `updated_at` is declared here and was not declared before. The edge function
 * does `select('*')`, so the column was already arriving on the wire on every
 * one of the ~14.7k rows and being discarded by the type. It is the only
 * per-contact timestamp that moves when we email somebody — see
 * `lastContactedAt` below — so the whole "how long has this sat" signal was
 * sitting unused in the response.
 */
export interface OutreachContact {
  id: string;
  email: string;
  name: string | null;
  organisation: string | null;
  role: string | null;
  contact_type: string | null;
  tags: string[] | null;
  is_suppressed: boolean;
  total_sends: number;
  total_opens: number;
  total_clicks: number;
  engagement_score: number;
  created_at: string;
  updated_at: string | null;
}

/**
 * Where a contact has got to. Deliberately exhaustive and mutually exclusive:
 * every contact in the pool lands in exactly one stage, so the stage counts
 * always sum to the pool total and the filter chips can never disagree with
 * the "All" chip. The previous source-tag rail could not make that promise —
 * see `sources` below.
 */
export type PipelineStage = 'not_contacted' | 'contacted' | 'signed_up' | 'suppressed';

/**
 * Validated dark-surface series colours only. No orange or brown anywhere:
 * green reads as won, blue as in-flight, purple as untouched stock, red as
 * out of the pipeline.
 */
export const STAGE_META: Record<PipelineStage, { label: string; short: string; fill: string }> = {
  signed_up: { label: 'Signed up', short: 'Signed up', fill: '#199E70' },
  contacted: { label: 'Contacted, no account', short: 'Awaiting', fill: '#3987E5' },
  not_contacted: { label: 'Never contacted', short: 'Ready', fill: '#9085E9' },
  suppressed: { label: 'Suppressed or bounced', short: 'Suppressed', fill: '#E66767' },
};

/** Order used for the stacked bar and the chip rail: won → in-flight → stock → out. */
export const STAGE_ORDER: PipelineStage[] = [
  'signed_up',
  'contacted',
  'not_contacted',
  'suppressed',
];

/**
 * Pretty names for the `source:` tags we know about.
 *
 * This is presentation only. Unlike the old `TAG_TO_SOURCE_KEY` map, nothing
 * is *filtered out* for being absent from it — an unknown tag gets a
 * prettified label and still appears in the source picker. The old map decided
 * which contacts existed: `sourceOf()` returned null for any tag missing from
 * it, and the filter rail only rendered chips for keys it recognised, so 1,604
 * of the 14,737 pool contacts (thomson_local, trustpilot, contracts_finder,
 * apollo_accredited, linkedin_person, linkedin_company, apollo_college_heads)
 * had no chip, could not be selected, and were silently missing from every
 * per-source count while still being included in the "All" count above them.
 */
const SOURCE_LABELS: Record<string, string> = {
  apollo: 'Directors',
  apollo_electricians: 'Electricians',
  apollo_electrical_engineers: 'Electrical engineers',
  apollo_supervisors: 'Supervisors',
  apollo_field_maintenance: 'Field / maintenance',
  apollo_estimators_contracts: 'Estimators',
  apollo_building_services: 'Building services',
  apollo_electricians_accredited: 'NICEIC / NAPIT',
  apollo_accredited: 'Accredited',
  apollo_geo: 'Geo drill',
  apollo_college_heads: 'College heads',
  hunter_enrichment: 'Hunter enrichment',
  google_places: 'Google Places',
  companies_house_web: 'Companies House',
  thomson_local: 'Thomson Local',
  trustpilot: 'Trustpilot',
  contracts_finder: 'Contracts Finder',
  linkedin_person: 'LinkedIn (person)',
  linkedin_company: 'LinkedIn (company)',
  csv_import: 'CSV import',
  admin_csv_paste: 'Pasted CSV',
};

export function sourceLabel(tag: string): string {
  return SOURCE_LABELS[tag] ?? tag.replace(/_/g, ' ').replace(/^./, (c) => c.toUpperCase());
}

/**
 * Which intro template a segment gets.
 *
 * Keyed by the raw `source:` tag rather than by the old closed `SourceKey`
 * union, so a scraper that starts writing a new tag gets the master template
 * instead of throwing. `apollo_accredited` (34 contacts) is mapped here for the
 * first time — it was one character away from `apollo_electricians_accredited`
 * in the old map and so fell through to the generic directors template.
 */
const TEMPLATE_BY_SOURCE: Record<string, string> = {
  apollo: 'business-intro-directors-v1',
  apollo_electricians: 'business-intro-electricians-v1',
  apollo_electrical_engineers: 'business-intro-electrical-engineers-v1',
  apollo_supervisors: 'business-intro-supervisors-v1',
  apollo_field_maintenance: 'business-intro-field-maintenance-v1',
  apollo_estimators_contracts: 'business-intro-estimators-v1',
  apollo_building_services: 'business-intro-building-services-v1',
  apollo_electricians_accredited: 'business-intro-accredited-v1',
  apollo_accredited: 'business-intro-accredited-v1',
  apollo_geo: 'business-intro-directors-v1',
  apollo_college_heads: 'business-intro-directors-v1',
  hunter_enrichment: 'business-intro-directors-v1',
  google_places: 'business-intro-electricians-v1',
  companies_house_web: 'business-intro-directors-v1',
  thomson_local: 'business-intro-electricians-v1',
  trustpilot: 'business-intro-electricians-v1',
  contracts_finder: 'business-intro-directors-v1',
  linkedin_person: 'business-intro-directors-v1',
  linkedin_company: 'business-intro-directors-v1',
  csv_import: 'business-intro-directors-v1',
  admin_csv_paste: 'business-intro-directors-v1',
};

export const MASTER_TEMPLATE_SLUG = 'business-master-intro-v1';

export function templateForSource(sourceTag: string | null): string {
  if (!sourceTag) return MASTER_TEMPLATE_SLUG;
  return TEMPLATE_BY_SOURCE[sourceTag] ?? MASTER_TEMPLATE_SLUG;
}

/** First `source:` tag on the row, with the prefix stripped. Raw, never mapped. */
export function sourceTagOf(contact: { tags: string[] | null }): string | null {
  for (const t of contact.tags ?? []) {
    if (t.startsWith('source:')) return t.slice(7);
  }
  return null;
}

export interface PipelineRow extends OutreachContact {
  stage: PipelineStage;
  sourceTag: string | null;
  /**
   * When we last emailed this contact, or null if we never have.
   *
   * `outreach_contacts` has no `last_sent_at` column, and the per-send table
   * that does (`outreach_campaign_sends.sent_at`) has RLS enabled with zero
   * policies, so a browser client reads nothing from it and the edge function
   * exposes it only for a single campaign at a time. `updated_at` is therefore
   * the only per-contact touch timestamp reachable from this page. It is a
   * proxy, but a tight one for contacts we have actually emailed: of the 11,998
   * pool contacts with `total_sends > 0`, 11,724 carry an `updated_at` on
   * 17–18 April 2026, the two days the 12,654-recipient campaign ran.
   */
  lastContactedAt: string | null;
  /** Milliseconds since the last email, or since import for contacts never emailed. */
  sinceMs: number;
  /**
   * 0 = still needs work, 1 = won, 2 = out of the pipeline. The list sorts on
   * this before staleness so that suppressed rows, which nothing can be done
   * about, cannot occupy the top of a list whose whole point is "who is owed a
   * follow-up".
   */
  actionRank: number;
}

export interface PipelineResult {
  rows: PipelineRow[];
  stageCounts: Record<PipelineStage, number>;
  /** Distinct organisations, which is not the same as the number of rows. */
  companies: number;
  total: number;
  /** Every `source:` tag present in the data, biggest first. Built from the rows. */
  sources: { tag: string; label: string; count: number }[];
  /** Pool contacts whose address now belongs to a registered Elec-Mate account. */
  signedUp: number;
  /** True until admin-get-users resolves; the signed-up split is provisional. */
  matchingAccounts: boolean;
  /** Oldest untouched actionable contact, in ms. Drives the hero sentence. */
  longestUntouchedMs: number;
}

/**
 * Turn the raw contact list into a pipeline.
 *
 * The signed-up stage is the reason this hook reaches for `useAdminUsersBase()`
 * rather than querying `profiles` directly: there is no `email` column on
 * `profiles` — it lives on `auth.users` — so any `profiles.select('email')`
 * returns PostgREST error 42703, the client swallows it, and the feature reads
 * as "nobody has ever signed up" instead of failing loudly. `admin-get-users`
 * is the one call that joins the two tables, and the admin app already holds it
 * in cache, so matching costs nothing extra.
 */
export function useBusinessOutreachPipeline(
  contacts: OutreachContact[] | undefined
): PipelineResult {
  const { data: adminUsers, isLoading: usersLoading } = useAdminUsersBase();

  const accountEmails = useMemo(() => {
    const set = new Set<string>();
    for (const u of adminUsers ?? []) {
      if (u.email) set.add(u.email.trim().toLowerCase());
    }
    return set;
  }, [adminUsers]);

  return useMemo(() => {
    const now = Date.now();
    const list = contacts ?? [];

    const stageCounts: Record<PipelineStage, number> = {
      signed_up: 0,
      contacted: 0,
      not_contacted: 0,
      suppressed: 0,
    };
    const sourceCounts = new Map<string, number>();
    const orgs = new Set<string>();
    let longestUntouchedMs = 0;

    const rows: PipelineRow[] = list.map((c) => {
      const email = c.email.trim().toLowerCase();
      const hasAccount = accountEmails.has(email);

      /*
        Suppressed wins over everything except a signup: a bounced or
        unsubscribed address cannot be emailed again whatever else is true of
        it, and showing it as "awaiting follow-up" invites a send that will be
        skipped. A signup outranks suppression because a customer who
        unsubscribed from cold outreach after joining is still a customer.
      */
      const stage: PipelineStage = hasAccount
        ? 'signed_up'
        : c.is_suppressed
          ? 'suppressed'
          : (c.total_sends ?? 0) > 0
            ? 'contacted'
            : 'not_contacted';

      stageCounts[stage] += 1;

      const lastContactedAt = (c.total_sends ?? 0) > 0 ? (c.updated_at ?? null) : null;
      const anchor = lastContactedAt ?? c.created_at;
      const sinceMs = Math.max(0, now - new Date(anchor).getTime());

      const actionRank = stage === 'signed_up' ? 1 : stage === 'suppressed' ? 2 : 0;
      if (actionRank === 0 && sinceMs > longestUntouchedMs) longestUntouchedMs = sinceMs;

      const sourceTag = sourceTagOf(c);
      if (sourceTag) sourceCounts.set(sourceTag, (sourceCounts.get(sourceTag) ?? 0) + 1);

      /*
        Organisation is the outreach unit, not the mailbox. The pool holds
        14,737 rows across 7,967 distinct organisations — several named
        contacts per firm — so a card that counts rows and calls them
        "Companies" overstates reach by roughly 85%.
      */
      orgs.add((c.organisation ?? '').trim().toLowerCase() || `~${email}`);

      return { ...c, stage, sourceTag, lastContactedAt, sinceMs, actionRank };
    });

    const sources = Array.from(sourceCounts.entries())
      .map(([tag, count]) => ({ tag, label: sourceLabel(tag), count }))
      .sort((a, b) => b.count - a.count);

    return {
      rows,
      stageCounts,
      companies: orgs.size,
      total: rows.length,
      sources,
      signedUp: stageCounts.signed_up,
      matchingAccounts: usersLoading,
      longestUntouchedMs,
    };
  }, [contacts, accountEmails, usersLoading]);
}

/** "3 days", "5 weeks", "4 months" — plain words, no clock precision. */
export function agoLabel(ms: number): string {
  const days = Math.floor(ms / 86_400_000);
  if (days < 1) return 'today';
  if (days === 1) return '1 day';
  if (days < 14) return `${days} days`;
  if (days < 60) return `${Math.floor(days / 7)} weeks`;
  if (days < 730) return `${Math.floor(days / 30)} months`;
  return `${Math.floor(days / 365)} years`;
}
