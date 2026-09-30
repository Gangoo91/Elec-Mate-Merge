/**
 * Floor plan → certificate hand-off (30 Sep 2026).
 *
 * Kept apart from the planner so the EIC form and the board door chart page
 * can read it without pulling the planner's design engine into their bundles.
 * The planner writes (diagram-builder/planToCertificate), they read.
 */
import type { TestResult } from '@/types/testResult';
import type { DistributionBoard } from '@/types/distributionBoard';

export interface PlanCertificate {
  v: 1;
  createdAt: string;
  /** Where it came from, for the certificate's notes and the toast. */
  planName: string;
  installationAddress?: string;
  clientName?: string;
  /** EIC form values: "single" | "three", "230" | "400", "tncs" | "tns" | "tt". */
  phases: 'single' | 'three';
  supplyVoltage: string;
  earthingArrangement: string;
  distributionBoards: DistributionBoard[];
  scheduleOfTests: TestResult[];
  /** Kept on the certificate: the plan finds it by these to show its readings. */
  sourcePlan?: PlanLink;
}

/**
 * On a certificate started from the floor plan (formData.sourcePlan). The
 * plan lives on the device with no id of its own, but each saved sheet has
 * one — the planner looks certificates up by its sheets.
 */
export interface PlanLink {
  sheetIds: string[];
  name: string;
  startedAt: string;
}

const KEY = (id: string) => `plan-certificate:${id}`;

/** Store the plan's certificate data for the next page; returns its key. */
export function stashPlanCertificate(data: PlanCertificate): string {
  const id = crypto.randomUUID().slice(0, 8);
  sessionStorage.setItem(KEY(id), JSON.stringify(data));
  return id;
}

/** Read it back from `?fromPlan=<key>`. */
export function readPlanCertificate(search = window.location.search): PlanCertificate | null {
  try {
    const id = new URLSearchParams(search).get('fromPlan');
    if (!id) return null;
    const raw = sessionStorage.getItem(KEY(id));
    const data = raw ? (JSON.parse(raw) as PlanCertificate) : null;
    return data?.v === 1 ? data : null;
  } catch {
    return null;
  }
}

/**
 * Forget it once a certificate has been started from it. The new certificate
 * is saved by then, so a refresh of the still-`?fromPlan=` URL must not start
 * a second one with the same circuits.
 */
export function forgetPlanCertificate(search = window.location.search): void {
  try {
    const id = new URLSearchParams(search).get('fromPlan');
    if (id) sessionStorage.removeItem(KEY(id));
  } catch {
    // Storage unavailable: nothing was kept.
  }
}
