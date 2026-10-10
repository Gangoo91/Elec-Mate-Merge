/**
 * portfolioWrites — the WRITE side of the portfolio (ELE-1917).
 *
 * Reads come from the one read model, usePortfolio (get_portfolio_ac_state +
 * the typed criteria). This module only creates and edits portfolio_items rows,
 * keeping the same column mapping the old usePortfolioData hook used, and tells
 * every mounted usePortfolio to reload (notifyPortfolioChanged) after a write.
 *
 * usePortfolioWrites() binds the signed-in user, the toasts and XP logging so
 * capture surfaces can call addEntry / updateEntry as before. loadPortfolioEntry
 * fetches the single row an edit form needs; it is not a list read.
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from 'react';
import type { PortfolioCategory, PortfolioEntry, PortfolioFile } from '@/types/portfolio';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { useLearningXP } from '@/hooks/useLearningXP';
import { notifyPortfolioChanged } from '@/hooks/portfolio/usePortfolio';
import type { CaptureSource } from '@/lib/portfolio/capturePresets';
import type { CaptureStamp } from '@/lib/portfolio/captureStamp';

export const PORTFOLIO_CATEGORIES: PortfolioCategory[] = [
  {
    id: 'practical-skills',
    name: 'Practical Skills',
    description: 'Hands-on electrical work and installations',
    icon: 'wrench',
    color: 'blue',
    requiredEntries: 8,
    completedEntries: 0,
    groupTheme: 'core-technical',
    competencyLevel: 'foundation',
  },
  {
    id: 'health-safety',
    name: 'Health & Safety',
    description: 'Safety procedures and risk assessments',
    icon: 'shield',
    color: 'green',
    requiredEntries: 5,
    completedEntries: 0,
    groupTheme: 'safety-compliance',
    competencyLevel: 'foundation',
  },
  {
    id: 'testing-inspection',
    name: 'Testing & Inspection',
    description: 'Electrical testing and certification work',
    icon: 'search',
    color: 'yellow',
    requiredEntries: 6,
    completedEntries: 0,
    groupTheme: 'core-technical',
    competencyLevel: 'intermediate',
  },
  {
    id: 'customer-service',
    name: 'Customer Service',
    description: 'Client interactions and communication',
    icon: 'users',
    color: 'purple',
    requiredEntries: 4,
    completedEntries: 0,
    groupTheme: 'professional-skills',
    competencyLevel: 'foundation',
  },
  {
    id: 'professional-development',
    name: 'Professional Development',
    description: 'Learning and skill enhancement activities',
    icon: 'graduation-cap',
    color: 'orange',
    requiredEntries: 3,
    completedEntries: 0,
    groupTheme: 'professional-skills',
    competencyLevel: 'intermediate',
  },
  {
    id: 'advanced-installations',
    name: 'Advanced Installations',
    description: 'Complex electrical systems and installations',
    icon: 'settings',
    color: 'red',
    requiredEntries: 4,
    completedEntries: 0,
    groupTheme: 'core-technical',
    competencyLevel: 'advanced',
  },
  {
    id: 'regulatory-compliance',
    name: 'Regulatory Compliance',
    description: 'BS7671 and industry standards compliance',
    icon: 'clipboard-check',
    color: 'emerald',
    requiredEntries: 3,
    completedEntries: 0,
    groupTheme: 'safety-compliance',
    competencyLevel: 'intermediate',
  },
  {
    id: 'site-diary-evidence',
    name: 'Site Diary Evidence',
    description: 'Portfolio evidence captured from site diary entries',
    icon: 'notebook-pen',
    color: 'cyan',
    requiredEntries: 0,
    completedEntries: 0,
    groupTheme: 'professional-skills',
    competencyLevel: 'foundation',
  },
];

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const mapDbToEntry = (
  row: any,
  countersignedIds?: Set<string>,
  categoryNames?: Map<string, string>
): PortfolioEntry => {
  /*
   * 🔴 `portfolio_items.category` is a mixed-type text column. It holds a
   * display name ("Reflection & Learning"), a slug ("site-diary-evidence"),
   * OR a `qualification_categories.id` UUID, depending on which capture path
   * wrote the row.
   *
   * The UUID case fell straight through to `name: row.category`, so the
   * detail sheet rendered "b0ef4374-f154-4557-a9dc-ed7915f2eff3" as a chip
   * beside the status — a raw database id shown to the learner where
   * "Installation Methods" belongs. It affects 4 of the 19 rows in production
   * and every surface that prints a category: the chip, the filters and the
   * evidence pack the assessor reads.
   *
   * Resolve it here rather than at each call site, so one fix covers them all.
   */
  const rawCategory: string = row.category ?? '';
  const resolvedName =
    (UUID_RE.test(rawCategory) ? categoryNames?.get(rawCategory) : undefined) ?? rawCategory;

  const category = PORTFOLIO_CATEGORIES.find((c) => c.id === row.category) || {
    id: row.category,
    name: resolvedName,
    description: '',
    icon: 'folder',
    color: 'gray',
    requiredEntries: 0,
    completedEntries: 0,
  };

  const evidenceFiles: PortfolioFile[] = (row.storage_urls || []).map((file: any, idx: number) => ({
    id: file.id || `file_${idx}`,
    name: file.name || 'Unknown',
    type: file.type || 'unknown',
    size: file.size || 0,
    url: file.url,
    uploadDate: file.uploadDate || row.created_at,
    sha256: file.sha256 || undefined,
    evidenceType: file.evidenceType || undefined,
  }));

  return {
    id: row.id,
    title: row.title,
    description: row.description || '',
    category,
    skills: row.skills_demonstrated || [],
    reflection: row.reflection_notes || '',
    dateCreated: row.created_at,
    dateCompleted: row.date_completed,
    evidenceFiles,
    tags: row.tags || [],
    assessmentCriteria: row.assessment_criteria_met || [],
    learningOutcomes: row.learning_outcomes_met || [],
    supervisorFeedback: row.supervisor_feedback,
    selfAssessment: row.self_assessment || 3,
    status: row.status || 'draft',
    timeSpent: row.time_spent || 0,
    awardingBodyStandards: row.awarding_body_standards || [],
    /*
     * 🔴 This read `is_supervisor_verified` alone.
     *
     * That column is NOT the verification record. The real one is
     * `supervisor_verifications` — the QR flow where a named supervisor
     * countersigns the evidence and `verified_at` is stamped. The column is a
     * loose mirror of it with no trigger keeping the two in step, and RLS
     * gives the learner a blanket own-row UPDATE while giving assessors SELECT
     * only, so the learner is the only party who can set it directly.
     *
     * They already disagree in production: one item carries the flag with no
     * countersignature behind it at all. The grid was therefore badging an
     * item "Verified" on the strength of a boolean the learner controls.
     *
     * Trust the signature, not the flag.
     */
    isVerified: countersignedIds ? countersignedIds.has(row.id) : false,
    metadata:
      row.metadata && typeof row.metadata === 'object' && !Array.isArray(row.metadata)
        ? row.metadata
        : {},
  };
};

// Map PortfolioEntry to database row
export const mapEntryToDb = (entry: Omit<PortfolioEntry, 'id' | 'dateCreated'>, userId: string) => {
  // Convert evidenceFiles to storage_urls format
  const storageUrls =
    entry.evidenceFiles?.map((file) => ({
      id: file.id,
      name: file.name,
      type: file.type,
      size: file.size,
      url: file.url,
      uploadDate: file.uploadDate,
      // ELE-1865: the bytes' SHA-256 and the evidence class travel with the file.
      ...(file.sha256 ? { sha256: file.sha256 } : {}),
      ...(file.evidenceType ? { evidenceType: file.evidenceType } : {}),
    })) || [];

  return {
    user_id: userId,
    title: entry.title,
    description: entry.description,
    category: entry.category.id,
    skills_demonstrated: entry.skills,
    reflection_notes: entry.reflection,
    tags: entry.tags,
    assessment_criteria_met: entry.assessmentCriteria,
    learning_outcomes_met: entry.learningOutcomes,
    supervisor_feedback: entry.supervisorFeedback,
    // 1 to 5, or not rated. The capture sheet sends 0 for "not rated", which the
    // portfolio_items_self_assessment_check constraint rejects, failing the save.
    self_assessment:
      entry.selfAssessment >= 1 && entry.selfAssessment <= 5 ? entry.selfAssessment : null,
    status: entry.status,
    time_spent: entry.timeSpent,
    awarding_body_standards: entry.awardingBodyStandards,
    metadata: entry.metadata ?? {},
    storage_urls: storageUrls,
    evidence_count: storageUrls.length,
    date_completed: entry.status === 'completed' ? new Date().toISOString() : null,
  };
};

export interface CreateItemOptions {
  /** Made on the phone so a retry finds the same row (ELE-1894). Defaults to a new uuid. */
  id?: string;
  /** Where it was captured from (ELE-1916). */
  source?: CaptureSource | null;
  /** Overrides date_completed (a reflection or diary entry is dated the day it describes). */
  dateCompleted?: string | null;
  /**
   * When (photo EXIF, else the phone's time) and, only with the learner's
   * permission, roughly where it was captured. Written once, on insert.
   */
  capture?: CaptureStamp | null;
}

/** ok with the id (existed: an earlier attempt had already landed), or the error. */
export interface CreateItemResult {
  ok: boolean;
  id?: string;
  existed?: boolean;
  error?: string;
  /** False when the server refused it (constraint, permission); true for lost signal. */
  retryable?: boolean;
}

/**
 * THE create path for portfolio evidence (ELE-1916). Every capture surface
 * (the capture sheet, the outbox, reflections) ends here, so category, status,
 * criteria format and source cannot drift apart again.
 *
 *  - Status on create is draft or ready (stored 'completed'); anything else,
 *    such as an assessor's 'reviewed', is written as draft.
 *  - Idempotent on `id`: a retry after a dropped connection finds the row and
 *    re-applies the learner's own fields (last write wins), never a second row.
 *
 * Never throws and never toasts; the caller decides what to tell the learner.
 */
export async function createPortfolioItem(
  userId: string,
  entryData: Omit<PortfolioEntry, 'id' | 'dateCreated'>,
  opts: CreateItemOptions = {}
): Promise<CreateItemResult> {
  const id = opts.id ?? crypto.randomUUID();
  const status = entryData.status === 'completed' ? 'completed' : 'draft';
  const row: Record<string, unknown> = {
    ...mapEntryToDb({ ...entryData, status }, userId),
    id,
    source: opts.source ?? null,
  };
  if (opts.dateCompleted !== undefined) row.date_completed = opts.dateCompleted;
  if (opts.capture) {
    row.captured_at = opts.capture.capturedAt;
    row.captured_at_source = opts.capture.source;
    row.capture_place = opts.capture.place;
    // Coarse by construction (0.1 degree); the column type rounds again.
    row.capture_lat = opts.capture.lat;
    row.capture_lng = opts.capture.lng;
  }
  const { error } = await supabase.from('portfolio_items').insert(row as never);
  if (!error) {
    notifyPortfolioChanged();
    return { ok: true, id, existed: false };
  }
  if (error.code === '23505') {
    // Already there (an earlier attempt landed but its reply was lost).
    // The learner's own fields: last write wins.
    const learnerFields = {
      title: row.title,
      description: row.description,
      reflection_notes: row.reflection_notes,
      skills_demonstrated: row.skills_demonstrated,
      assessment_criteria_met: row.assessment_criteria_met,
      metadata: row.metadata,
      storage_urls: row.storage_urls,
      evidence_count: row.evidence_count,
      source: row.source,
    };
    const { error: upErr } = await supabase
      .from('portfolio_items')
      .update(learnerFields as never)
      .eq('id', id)
      .eq('user_id', userId);
    if (upErr) return { ok: false, error: upErr.message, retryable: false };
    notifyPortfolioChanged();
    return { ok: true, id, existed: true };
  }
  // A network failure has no Postgres code; a constraint or RLS failure does.
  const retryable = !error.code || /fetch|network|timeout/i.test(error.message ?? '');
  return { ok: false, error: error.message, retryable };
}

/** Insert one entry. Returns the new id, or null (and a toast) on failure. */
export async function addPortfolioEntry(
  userId: string,
  entryData: Omit<PortfolioEntry, 'id' | 'dateCreated'>,
  opts: CreateItemOptions = {}
): Promise<string | null> {
  const res = await createPortfolioItem(userId, entryData, opts);
  if (res.ok && res.id) return res.id;
  console.error('Error adding entry:', res.error);
  toast({
    title: 'Error saving portfolio',
    description: 'Failed to save your portfolio entry. Please try again.',
    variant: 'destructive',
  });
  return null;
}

/** Update one entry the learner owns. Returns true when saved. */
export async function updatePortfolioEntry(
  userId: string,
  entryId: string,
  updates: Partial<PortfolioEntry>
): Promise<boolean> {
  try {
    const updateData: any = {};

    if (updates.title !== undefined) updateData.title = updates.title;
    if (updates.description !== undefined) updateData.description = updates.description;
    if (updates.category !== undefined) updateData.category = updates.category.id;
    if (updates.skills !== undefined) updateData.skills_demonstrated = updates.skills;
    if (updates.reflection !== undefined) updateData.reflection_notes = updates.reflection;
    if (updates.tags !== undefined) updateData.tags = updates.tags;
    if (updates.assessmentCriteria !== undefined)
      updateData.assessment_criteria_met = updates.assessmentCriteria;
    if (updates.learningOutcomes !== undefined)
      updateData.learning_outcomes_met = updates.learningOutcomes;
    if (updates.supervisorFeedback !== undefined)
      updateData.supervisor_feedback = updates.supervisorFeedback;
    if (updates.selfAssessment !== undefined) updateData.self_assessment = updates.selfAssessment;
    if (updates.status !== undefined) {
      updateData.status = updates.status;
      if (updates.status === 'completed') {
        updateData.date_completed = new Date().toISOString();
      }
    }
    if (updates.timeSpent !== undefined) updateData.time_spent = updates.timeSpent;
    if (updates.awardingBodyStandards !== undefined)
      updateData.awarding_body_standards = updates.awardingBodyStandards;
    if (updates.metadata !== undefined) updateData.metadata = updates.metadata;
    if (updates.evidenceFiles !== undefined) {
      updateData.storage_urls = updates.evidenceFiles.map((file) => ({
        id: file.id,
        name: file.name,
        type: file.type,
        size: file.size,
        url: file.url,
        uploadDate: file.uploadDate,
        ...(file.sha256 ? { sha256: file.sha256 } : {}),
        ...(file.evidenceType ? { evidenceType: file.evidenceType } : {}),
      }));
      updateData.evidence_count = updates.evidenceFiles.length;
    }

    updateData.updated_at = new Date().toISOString();
    const { error } = await supabase
      .from('portfolio_items')
      .update(updateData)
      .eq('id', entryId)
      .eq('user_id', userId);
    if (error) throw error;
    notifyPortfolioChanged();
    return true;
  } catch (error) {
    console.error('Error updating entry:', error);
    toast({
      title: 'Error updating portfolio',
      description: 'Failed to save your changes. Please try again.',
      variant: 'destructive',
    });
    return false;
  }
}

/** The one row an edit form needs, mapped the way the form expects. */
export async function loadPortfolioEntry(
  userId: string,
  entryId: string
): Promise<PortfolioEntry | null> {
  const [{ data: row }, { data: categoryRows }, { data: ver }] = await Promise.all([
    supabase
      .from('portfolio_items')
      .select('*')
      .eq('id', entryId)
      .eq('user_id', userId)
      .maybeSingle(),
    supabase.from('qualification_categories').select('id, name'),
    supabase
      .from('supervisor_verifications')
      .select('portfolio_item_id')
      .eq('portfolio_item_id', entryId)
      .not('verified_at', 'is', null),
  ]);
  if (!row) return null;
  const names = new Map<string, string>(
    ((categoryRows ?? []) as Array<{ id: string; name: string | null }>)
      .filter((c) => !!c.name)
      .map((c) => [c.id, c.name as string])
  );
  const signed = new Set<string>(
    ((ver ?? []) as Array<{ portfolio_item_id: string }>).map((v) => v.portfolio_item_id)
  );
  return mapDbToEntry(row, signed, names);
}

/** Binds the signed-in user, toasts and XP logging for capture surfaces. */
export function usePortfolioWrites() {
  const { user } = useAuth();
  const { logActivity } = useLearningXP();
  const uid = user?.id ?? null;

  const addEntry = useCallback(
    async (entryData: Omit<PortfolioEntry, 'id' | 'dateCreated'>, opts?: CreateItemOptions) => {
      if (!uid) {
        toast({
          title: 'Not authenticated',
          description: 'Please sign in to add portfolio entries.',
          variant: 'destructive',
        });
        return null;
      }
      const id = await addPortfolioEntry(uid, entryData, opts);
      if (id) {
        toast({
          title: 'Portfolio entry added',
          description: 'Your new portfolio entry has been saved successfully.',
        });
        logActivity({
          activityType: 'portfolio_evidence',
          sourceId: id,
          sourceTitle: `Portfolio: ${entryData.title}`,
          metadata: { category: entryData.category.id, status: entryData.status },
        });
      }
      return id;
    },
    [uid, logActivity]
  );

  const updateEntry = useCallback(
    async (entryId: string, updates: Partial<PortfolioEntry>) => {
      if (!uid) return false;
      const ok = await updatePortfolioEntry(uid, entryId, updates);
      if (ok) {
        toast({
          title: 'Portfolio entry updated',
          description: 'Your changes have been saved successfully.',
        });
      }
      return ok;
    },
    [uid]
  );

  return { categories: PORTFOLIO_CATEGORIES as PortfolioCategory[], addEntry, updateEntry };
}
