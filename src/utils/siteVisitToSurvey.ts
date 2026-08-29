import { storageSetJSONSync, storageGetJSONSync, storageRemoveSync } from '@/utils/storage';
import type { SiteVisit } from '@/types/siteVisit';

/**
 * "Turn this into a survey" — site visit → pre-purchase survey (ELE-1634).
 *
 * Mirrors `certificateToQuote.ts`: write a blob under a session id, put the id
 * in the query string, let the receiving page pick it up and clear it. Same
 * mechanism the site visit already uses to reach the quote builder.
 *
 * ── WHY THIS IS WORTH HAVING ──────────────────────────────────────────────
 * A site visit has already done the expensive part — someone walked the
 * property and photographed it. The survey needs exactly those photographs and
 * that client. Re-shooting them because the electrician started in the wrong
 * place is the kind of duplicated work that makes people stop using a feature.
 *
 * ── 🔴 PHOTOGRAPHS COME ACROSS UNANALYSED AND UNACCEPTED ──────────────────
 * Each becomes a finding with `accepted: false` and no note. The survey page
 * runs the analysis on arrival and the electrician still reads and accepts
 * every one. Nothing about arriving from a site visit shortens that path — a
 * photograph nobody has written up cannot be allowed onto a client's report
 * whichever screen it entered by.
 */

export interface SurveySeedData {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  installationAddress: string;
  /** Storage URLs, already uploaded by the site visit. */
  photoUrls: string[];
  /** The visit's own description of each photo, used as the location hint. */
  photoLabels: string[];
  sourceVisitId?: string;
}

const KEY_PREFIX = 'survey-seed-';

export function createSurveyFromSiteVisit(visit: SiteVisit): string {
  const sessionId = `${KEY_PREFIX}${Date.now()}`;

  /*
   * `photoPhase` is not filtered on. A pre-purchase survey is interested in
   * whatever was photographed, and a visit's phases ("before", "during"…)
   * describe a job that is not this one.
   */
  const photos = (visit.photos ?? []).filter((p) => !!p.photoUrl);

  const seed: SurveySeedData = {
    clientName: visit.customerName || '',
    clientEmail: visit.customerEmail || '',
    clientPhone: visit.customerPhone || '',
    installationAddress: visit.propertyAddress || '',
    photoUrls: photos.map((p) => p.photoUrl),
    photoLabels: photos.map((p) => p.description || ''),
    sourceVisitId: visit.id,
  };

  storageSetJSONSync(sessionId, seed);
  return `/electrician/inspection-testing/pre-purchase-survey/new?seed=${sessionId}`;
}

/**
 * Reads and CLEARS the seed. One-shot on purpose: the survey autosaves from
 * here on, and a seed left lying about would re-apply itself and duplicate
 * every photograph if the page remounted.
 */
export function takeSurveySeed(sessionId: string): SurveySeedData | null {
  if (!sessionId || !sessionId.startsWith(KEY_PREFIX)) return null;
  const seed = storageGetJSONSync<SurveySeedData | null>(sessionId, null);
  storageRemoveSync(sessionId);
  return seed ?? null;
}
