/**
 * useStudyLinks — ELE-1904. For every criterion of a qualification, the Study
 * Centre lesson that teaches it ("Study (28 min)") and the practice questions
 * that test it ("Practise (10 questions)").
 *
 * Reads study_links_for(code): links people already made (each lesson page's
 * own "Maps to … AC x.y" header, and the mock exams' content-matched question
 * → page table), never a guess. A criterion with no link shows nothing.
 * Criteria worded identically in another City & Guilds qualification borrow
 * its links (via = 'same_wording').
 */
import { useEffect, useState } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

const db = supabase as unknown as SupabaseClient;

export interface StudyLinkRow {
  unit_code: string;
  ac_code: string;
  kind: 'study' | 'practise';
  route: string;
  title: string | null;
  minutes: number | null;
  question_count: number | null;
  bank_slug: string | null;
  via: 'direct' | 'same_wording';
  via_qualification: string;
}

export interface CriterionLinks {
  study: StudyLinkRow | null;
  practise: StudyLinkRow | null;
}

/** Questions on one practice paper. */
export const PRACTISE_PAPER = 10;

export const studyKey = (unit: string, ac: string) => `${unit}|${ac}`;

/** Where "Practise" goes: a short paper on that lesson's section. */
export function practisePath(l: StudyLinkRow, unit: string, ac: string): string {
  const q = new URLSearchParams({
    bank: l.bank_slug ?? '',
    section: l.route,
    ac: `${unit} AC ${ac}`,
  });
  return `/study-centre/practise?${q.toString()}`;
}

export function studyLabel(l: StudyLinkRow): string {
  return l.minutes ? `Study (${l.minutes} min)` : 'Study';
}

export function practiseLabel(l: StudyLinkRow): string {
  const n = Math.min(PRACTISE_PAPER, l.question_count ?? PRACTISE_PAPER);
  return `Practise (${n} questions)`;
}

const cache = new Map<string, Promise<StudyLinkRow[]>>();

function load(code: string): Promise<StudyLinkRow[]> {
  const hit = cache.get(code);
  if (hit) return hit;
  const p = (async () => {
    const { data, error } = await db.rpc('study_links_for', { p_qualification_code: code });
    if (error) {
      cache.delete(code);
      throw error;
    }
    return (data ?? []) as StudyLinkRow[];
  })();
  cache.set(code, p);
  return p;
}

export function useStudyLinks(qualificationCode: string | null | undefined) {
  const [links, setLinks] = useState<Map<string, CriterionLinks>>(new Map());
  const [loading, setLoading] = useState(!!qualificationCode);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!qualificationCode) {
      setLinks(new Map());
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    load(qualificationCode)
      .then((rows) => {
        if (cancelled) return;
        const m = new Map<string, CriterionLinks>();
        // Rows come own-links first, so the first of each kind wins.
        for (const r of rows) {
          const k = studyKey(r.unit_code, r.ac_code);
          const cur = m.get(k) ?? { study: null, practise: null };
          if (r.kind === 'study' && !cur.study) cur.study = r;
          if (r.kind === 'practise' && !cur.practise) cur.practise = r;
          m.set(k, cur);
        }
        setLinks(m);
        setFailed(false);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [qualificationCode]);

  return { links, loading, failed };
}
