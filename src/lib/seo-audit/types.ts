// Shared types for the SEO audit pipeline.
// Admin/internal only — never imported into user-facing components.

// v1.0.1 — per-page-type applicability matrix added so guide/hub/comparison
// pages aren't punished for lacking a calc they shouldn't need. Calculator/
// tool pages still REQUIRE a working tool. See scripts/seo-audit/score.mjs
// for the canonical applicability map.
export const RUBRIC_VERSION = 'v1.0.1' as const;

export type PageType =
  | 'tool'
  | 'guide'
  | 'hub'
  | 'comparison'
  | 'calculator'
  | 'cert'
  | 'training'
  | 'other';

export type Audience = 'electrician' | 'apprentice' | 'college' | 'employer';

export type AuditStatus = 'green' | 'amber' | 'red';

export type SuggestedAction =
  | 'leave'
  | 'cite_refresh'
  | 'rag_augment'
  | 'rewrite'
  | 'merge'
  | 'kill_301';

export type IntentClass =
  | 'tool'
  | 'guide'
  | 'comparison'
  | 'hub'
  | 'calculator'
  | 'cert'
  | 'training';

export interface CriterionResult {
  id: string;                // 'pre_rendered_html' etc
  weight: number;            // points available
  passed: boolean;
  contribution: number;      // points awarded
  notes?: string;
  evidence?: Record<string, unknown>;
}

export interface UnsupportedClaim {
  claim: string;
  topMatchScore: number;
  topMatchId?: string;
  reason: string;
}

export interface AuditRow {
  slug: string;
  sourceFile: string;
  pageType: PageType;
  audience: Audience[];
  score: number;
  status: AuditStatus;
  criteriaBreakdown: Record<string, CriterionResult>;
  bs7671Cites: string[];
  bs7671CitesUnresolved: string[];
  bs7671CitesDrift: string[];
  practicalClaimsUnsupported: UnsupportedClaim[];
  cannibalisationClusterId?: string;
  cannibalisationRole?: 'keep' | 'redirect_source';
  redirectTarget?: string;
  toolComponentPresent: boolean;
  toolComponentAuthgated: boolean;
  schemaValidationErrors: string[];
  internalLinksCount: number;
  internalLinksBroken: string[];
  wordCount: number;
  templateOverlapPct?: number;
  suggestedAction: SuggestedAction;
  suggestedRedirectTo?: string;
  auditRunId: string;
  rubricVersion: typeof RUBRIC_VERSION;
}

// --- Redirect strategy output (Spec 4) ---

export interface RedirectDecision {
  from: string;
  to: string;
  status: 301;
  clusterId: string;
  clusterMembers: string[];
  canonicalChosenBecause: string[];
  confidence: number;
}

export interface RedirectManifest {
  auditRunId: string;
  generatedAt: string; // ISO timestamp
  redirects: RedirectDecision[];
}
