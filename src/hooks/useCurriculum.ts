import { useCallback, useEffect, useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

// ─────────────────── Lesson generator types ───────────────────
export interface GeneratedActivity {
  time_mins: number;
  phase: 'starter' | 'input' | 'modelling' | 'practice' | 'practical' | 'plenary' | 'afl';
  title: string;
  description: string;
  student_focus?: string;
  check_for_understanding?: string;
  teacher_moves?: string[];
  resources_needed?: string[];
  cited_facet_ids?: string[];
}

export interface RagPreviewFacet {
  facet_id: string;
  document_type: 'bs7671' | 'gn3' | 'osg';
  reg_number: string | null;
  primary_topic: string | null;
  is_a4_change: boolean;
}

export interface RagPreview {
  facets: RagPreviewFacet[];
  bs7671: number;
  gn3: number;
  osg: number;
  a4_changes: number;
}

export interface GeneratedObjective {
  text: string;
  ac_codes: string[];
}

export interface GeneratedCitation {
  facet_id: string;
  document_type: 'bs7671' | 'gn3' | 'osg';
  reg_number: string | null;
  citation_note: string | null;
  is_a4_change: boolean;
}

export type BloomLevel =
  | 'recall'
  | 'understand'
  | 'apply'
  | 'analyse'
  | 'evaluate'
  | 'create';

export interface GeneratedAnalogy {
  name: string;
  description: string;
  when_to_use: string;
}

export interface GeneratedMisconception {
  belief: string;
  correction: string;
}

export interface GeneratedBoardWork {
  title: string;
  description: string;
  labels: string[];
}

export interface GeneratedWorkedExample {
  scenario: string;
  working: string[];
  answer: string;
}

export interface GeneratedColdCallQuestion {
  question: string;
  bloom_level: BloomLevel;
  expected_answer: string;
}

export interface GeneratedExitTicket {
  question: string;
  answer: string;
}

export interface GeneratedVocabulary {
  term: string;
  definition: string;
}

export interface GeneratedDifferentiation {
  stretch: string[];
  support: string[];
  send?: string[];
  eal?: string[];
}

export interface GeneratedLessonPlan {
  title: string;
  duration_mins: number;
  audience_note?: string;
  prior_knowledge: string[];
  learning_objectives: GeneratedObjective[];
  analogies?: GeneratedAnalogy[];
  misconceptions?: GeneratedMisconception[];
  board_work?: GeneratedBoardWork[];
  worked_examples?: GeneratedWorkedExample[];
  cold_call_questions?: GeneratedColdCallQuestion[];
  exit_ticket?: GeneratedExitTicket[];
  vocabulary?: GeneratedVocabulary[];
  activities: GeneratedActivity[];
  assessment_for_learning: string[];
  differentiation?: GeneratedDifferentiation;
  health_safety?: { risk: string; control: string; reg_ref: string }[];
  homework?: { description: string; estimated_mins: number };
  cited_facets: GeneratedCitation[];
  a4_change_summary: string | null;
  next_lesson_hint: string;
  tutor_brief_markdown?: string;
}


export interface GenerateLessonResult {
  lesson_plan_id: string | null;
  facets_used: number;
  plan: GeneratedLessonPlan;
}

export interface GenerateLessonInput {
  qualification_code: string;
  unit_code: string;
  ac_codes: string[];
  cohort_id?: string | null;
  session_length_mins?: number;
  delivery_mode?: 'classroom' | 'workshop' | 'hybrid' | 'online';
  include_homework?: boolean;
  include_differentiation?: boolean;
  include_hs?: boolean;
  save_to_db?: boolean;
}

export interface QualificationRow {
  id: string;
  code: string;
  title: string;
  level: string;
  awarding_body: string;
  description: string | null;
  requires_portfolio: boolean | null;
}

export interface UnitRow {
  qualification_code: string;
  unit_code: string;
  unit_title: string | null;
  lo_count: number;
  ac_count: number;
}

export interface LoRow {
  lo_number: number;
  lo_text: string;
  acs: AcRow[];
}

export interface AcRow {
  qualification_code: string;
  unit_code: string;
  ac_code: string;
  ac_text: string;
  lo_number: number;
  lo_text: string;
}

export type DocType = 'bs7671' | 'gn3' | 'osg';

export interface RagMatch {
  facet_id: string;
  regulation_id: string | null;
  reg_number: string | null;
  reg_title: string | null;
  reg_part: string | null;
  document_type: DocType;
  primary_topic: string | null;
  facet_type: string | null;
  content: string;
  context_prefix: string | null;
  keywords: string[] | null;
  system_types: string[] | null;
  bs7671_zones: string[] | null;
  equipment_category: string | null;
  protection_method: string | null;
  disconnection_time_s: number | null;
  page_number: number | null;
  is_a4_change: boolean;
  rank: number;
}

/**
 * Top-level qualifications list (21 seeded UK quals: C&G 2365/2366/2357/5357/5393
 * + EAL L3 Installation/Maintenance + ECS + T-Levels etc.).
 */
export function useQualifications() {
  const [data, setData] = useState<QualificationRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    supabase
      .from('qualifications')
      .select('id, code, title, level, awarding_body, description, requires_portfolio')
      .order('awarding_body', { ascending: true })
      .order('level', { ascending: true })
      .order('code', { ascending: true })
      .then(({ data: rows, error: err }) => {
        if (cancelled) return;
        if (err) setError(err.message);
        else setData((rows ?? []) as QualificationRow[]);
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error };
}

/**
 * Units for a qualification — derived via the v_qualification_units view.
 */
export function useQualificationUnits(qualificationCode: string | null) {
  const [data, setData] = useState<UnitRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!qualificationCode) {
      setData([]);
      return;
    }
    let cancelled = false;
    setLoading(true);
    supabase
      .from('v_qualification_units' as unknown as 'qualifications')
      .select('*')
      .eq('qualification_code', qualificationCode)
      .order('unit_code', { ascending: true })
      .then(({ data: rows, error: err }) => {
        if (cancelled) return;
        if (err) setError(err.message);
        else setData((rows ?? []) as unknown as UnitRow[]);
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [qualificationCode]);

  return { data, loading, error };
}

/**
 * Full LO → AC tree for a unit. Rows in `qualification_requirements` are flat
 * (one row per AC); we group them into a tree by lo_number here.
 */
export function useUnitDetail(qualificationCode: string | null, unitCode: string | null) {
  const [data, setData] = useState<LoRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!qualificationCode || !unitCode) {
      setData([]);
      return;
    }
    let cancelled = false;
    setLoading(true);
    supabase
      .from('qualification_requirements')
      .select('qualification_code, unit_code, ac_code, ac_text, lo_number, lo_text')
      .eq('qualification_code', qualificationCode)
      .eq('unit_code', unitCode)
      .order('lo_number', { ascending: true })
      .order('ac_code', { ascending: true })
      .then(({ data: rows, error: err }) => {
        if (cancelled) return;
        if (err) {
          setError(err.message);
          setLoading(false);
          return;
        }
        // Group flat rows into tree by lo_number
        const map = new Map<number, LoRow>();
        for (const r of rows ?? []) {
          const ac = r as AcRow;
          let lo = map.get(ac.lo_number);
          if (!lo) {
            lo = {
              lo_number: ac.lo_number,
              lo_text: ac.lo_text,
              acs: [],
            };
            map.set(ac.lo_number, lo);
          }
          lo.acs.push(ac);
        }
        setData(Array.from(map.values()).sort((a, b) => a.lo_number - b.lo_number));
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [qualificationCode, unitCode]);

  return { data, loading, error };
}

export interface LessonCoveringAc {
  lesson_plan_id: string;
  title: string | null;
  scheduled_date: string | null;
  cohort_id: string | null;
  cohort_name: string | null;
  mapping_source: string;
}

export interface ResourceTaggedAc {
  resource_id: string;
  title: string;
  resource_type: string;
  confidence: number | null;
  mapping_source: string;
}

/**
 * Lessons that cover a given AC (for the current user's college only — RLS enforces).
 */
export function useLessonsForAc(
  qualificationCode: string | null,
  unitCode: string | null,
  acCode: string | null
) {
  const [data, setData] = useState<LessonCoveringAc[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!qualificationCode || !unitCode || !acCode) {
      setData([]);
      return;
    }
    let cancelled = false;
    setLoading(true);
    supabase
      .from('lesson_plan_ac_mapping')
      .select(
        'lesson_plan_id, mapping_source, college_lesson_plans!inner(id, title, scheduled_date, cohort_id, college_cohorts(name))'
      )
      .eq('qualification_code', qualificationCode)
      .eq('unit_code', unitCode)
      .eq('ac_code', acCode)
      .limit(20)
      .then(({ data: rows, error }) => {
        if (cancelled) return;
        if (error) {
          setData([]);
          setLoading(false);
          return;
        }
        const mapped: LessonCoveringAc[] = (rows ?? []).map((r) => {
          const lp = r.college_lesson_plans as unknown as {
            id: string;
            title: string | null;
            scheduled_date: string | null;
            cohort_id: string | null;
            college_cohorts?: { name: string | null } | null;
          };
          return {
            lesson_plan_id: lp.id,
            title: lp.title,
            scheduled_date: lp.scheduled_date,
            cohort_id: lp.cohort_id,
            cohort_name: lp.college_cohorts?.name ?? null,
            mapping_source: r.mapping_source,
          };
        });
        setData(mapped);
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [qualificationCode, unitCode, acCode]);

  return { data, loading };
}

/**
 * Resources tagged to a given AC (for the current user's college).
 */
export function useResourcesForAc(
  qualificationCode: string | null,
  unitCode: string | null,
  acCode: string | null
) {
  const [data, setData] = useState<ResourceTaggedAc[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!qualificationCode || !unitCode || !acCode) {
      setData([]);
      return;
    }
    let cancelled = false;
    setLoading(true);
    supabase
      .from('resource_ac_mapping')
      .select('resource_id, confidence, mapping_source, teaching_resources!inner(id, title, resource_type)')
      .eq('qualification_code', qualificationCode)
      .eq('unit_code', unitCode)
      .eq('ac_code', acCode)
      .limit(20)
      .then(({ data: rows, error }) => {
        if (cancelled) return;
        if (error) {
          setData([]);
          setLoading(false);
          return;
        }
        const mapped: ResourceTaggedAc[] = (rows ?? []).map((r) => {
          const tr = r.teaching_resources as unknown as {
            id: string;
            title: string;
            resource_type: string;
          };
          return {
            resource_id: tr.id,
            title: tr.title,
            resource_type: tr.resource_type,
            confidence: r.confidence,
            mapping_source: r.mapping_source,
          };
        });
        setData(mapped);
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [qualificationCode, unitCode, acCode]);

  return { data, loading };
}

/**
 * Call match_bs7671_for_curriculum_ac RPC — returns RAG matches for a specific AC.
 * Optional docType filter: 'bs7671' | 'gn3' | 'osg' | null (all).
 */
export function useAcRagMatches(
  qualificationCode: string | null,
  unitCode: string | null,
  acCode: string | null,
  docType: DocType | null,
  maxResults = 10
) {
  const [data, setData] = useState<RagMatch[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(async () => {
    if (!qualificationCode || !unitCode || !acCode) {
      setData([]);
      return;
    }
    setLoading(true);
    setError(null);
    const { data: rows, error: err } = await supabase.rpc('match_bs7671_for_curriculum_ac', {
      q_code: qualificationCode,
      u_code: unitCode,
      a_code: acCode,
      doc_type: docType,
      max_results: maxResults,
    });
    if (err) setError(err.message);
    else setData((rows ?? []) as unknown as RagMatch[]);
    setLoading(false);
  }, [qualificationCode, unitCode, acCode, docType, maxResults]);

  useEffect(() => {
    run();
  }, [run]);

  return { data, loading, error, refresh: run };
}

export interface GenerateLessonStreamHandlers {
  onStatus?: (phase: string, meta?: Record<string, unknown>) => void;
  onChunk?: (delta: string, accumulated: string) => void;
  onDone?: (result: GenerateLessonResult) => void;
  onError?: (message: string) => void;
}

/**
 * Streaming lesson generator. Returns partial text as it arrives from the model,
 * then the full structured plan + DB id on completion.
 *
 * Perceived-fastness pattern: hook exposes `phase` + `streamText` so the UI
 * can render status breadcrumbs and a live preview of tokens arriving.
 */
export function useGenerateLesson() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GenerateLessonResult | null>(null);
  const [phase, setPhase] = useState<string | null>(null);
  const [streamText, setStreamText] = useState(''); // retained for back-compat
  const [briefText, setBriefText] = useState('');
  const [briefComplete, setBriefComplete] = useState(false);
  const [planBytes, setPlanBytes] = useState(0);
  const [planComplete, setPlanComplete] = useState(false);
  const [ragPreview, setRagPreview] = useState<RagPreview | null>(null);
  const [streamMeta, setStreamMeta] = useState<Record<string, unknown> | null>(null);

  // rAF-batched buffers — coalesce token floods into ~60fps updates so the
  // markdown renderer doesn't re-parse on every byte.
  const briefBufferRef = useRef('');
  const planBytesBufferRef = useRef(0);
  const rafScheduledRef = useRef(false);

  const scheduleFlush = useCallback(() => {
    if (rafScheduledRef.current) return;
    rafScheduledRef.current = true;
    requestAnimationFrame(() => {
      rafScheduledRef.current = false;
      if (briefBufferRef.current) {
        const addition = briefBufferRef.current;
        briefBufferRef.current = '';
        setBriefText((b) => b + addition);
      }
      if (planBytesBufferRef.current) {
        const addition = planBytesBufferRef.current;
        planBytesBufferRef.current = 0;
        setPlanBytes((n) => n + addition);
      }
    });
  }, []);

  const generate = useCallback(
    async (input: GenerateLessonInput, handlers?: GenerateLessonStreamHandlers) => {
      setLoading(true);
      setError(null);
      setResult(null);
      setPhase('starting');
      setStreamText('');
      setBriefText('');
      setBriefComplete(false);
      setPlanBytes(0);
      setPlanComplete(false);
      setRagPreview(null);
      setStreamMeta(null);
      briefBufferRef.current = '';
      planBytesBufferRef.current = 0;

      try {
        const session = await supabase.auth.getSession();
        const token = session.data.session?.access_token;
        if (!token) throw new Error('Not signed in');

        const res = await fetch(
          'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/curriculum-generate-lesson',
          {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              authorization: `Bearer ${token}`,
              accept: 'text/event-stream',
            },
            body: JSON.stringify(input),
          }
        );

        if (!res.ok || !res.body) {
          const text = await res.text();
          throw new Error(`HTTP ${res.status}: ${text.slice(0, 300)}`);
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let sseBuf = '';
        let accumulated = '';
        let final: GenerateLessonResult | null = null;
        let thrownError: string | null = null;

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          sseBuf += decoder.decode(value, { stream: true });

          // Split SSE frames on the double-newline boundary
          const frames = sseBuf.split('\n\n');
          sseBuf = frames.pop() ?? '';

          for (const frame of frames) {
            const lines = frame.split('\n');
            let eventType = 'message';
            let dataLines: string[] = [];
            for (const line of lines) {
              if (line.startsWith('event: ')) eventType = line.slice(7).trim();
              else if (line.startsWith('data: ')) dataLines.push(line.slice(6));
            }
            if (dataLines.length === 0) continue;
            const payload = dataLines.join('\n');
            let parsed: Record<string, unknown>;
            try {
              parsed = JSON.parse(payload);
            } catch {
              continue;
            }

            if (eventType === 'status') {
              const p = parsed.phase as string;
              setPhase(p);
              setStreamMeta(parsed);
              handlers?.onStatus?.(p, parsed);
            } else if (eventType === 'rag_preview') {
              setRagPreview(parsed as unknown as RagPreview);
            } else if (eventType === 'brief_chunk') {
              const delta = parsed.delta as string;
              if (delta) {
                briefBufferRef.current += delta;
                accumulated += delta;
                scheduleFlush();
                handlers?.onChunk?.(delta, accumulated);
              }
            } else if (eventType === 'brief_complete') {
              // Flush any pending buffer immediately
              if (briefBufferRef.current) {
                const tail = briefBufferRef.current;
                briefBufferRef.current = '';
                setBriefText((b) => b + tail);
              }
              setStreamText(accumulated);
              setBriefComplete(true);
            } else if (eventType === 'plan_chunk') {
              const delta = parsed.delta as string;
              if (delta) {
                planBytesBufferRef.current += delta.length;
                scheduleFlush();
              }
            } else if (eventType === 'plan_complete') {
              if (planBytesBufferRef.current) {
                const tail = planBytesBufferRef.current;
                planBytesBufferRef.current = 0;
                setPlanBytes((n) => n + tail);
              }
              setPlanComplete(true);
            } else if (eventType === 'done') {
              final = {
                lesson_plan_id: (parsed.lesson_plan_id as string | null) ?? null,
                facets_used: (parsed.facets_used as number) ?? 0,
                plan: parsed.plan as GeneratedLessonPlan,
              };
            } else if (eventType === 'error') {
              thrownError = (parsed.message as string) ?? 'Unknown stream error';
            }
          }
        }

        if (thrownError) throw new Error(thrownError);
        if (!final) throw new Error('Stream ended without completion');

        setResult(final);
        handlers?.onDone?.(final);
        return final;
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        setError(msg);
        handlers?.onError?.(msg);
        throw e;
      } finally {
        setLoading(false);
        setPhase(null);
      }
    },
    []
  );

  const reset = useCallback(() => {
    setError(null);
    setResult(null);
    setPhase(null);
    setStreamText('');
    setBriefText('');
    setBriefComplete(false);
    setPlanBytes(0);
    setPlanComplete(false);
    setRagPreview(null);
    setStreamMeta(null);
    briefBufferRef.current = '';
    planBytesBufferRef.current = 0;
  }, []);

  return {
    generate,
    loading,
    error,
    result,
    phase,
    streamText,
    briefText,
    briefComplete,
    planBytes,
    planComplete,
    ragPreview,
    streamMeta,
    reset,
  };
}

/* ──────────────────────────────────────────────
   Section refinement — partial regeneration
   ────────────────────────────────────────────── */

export type RefinableSectionKey =
  | 'tutor_brief_markdown'
  | 'analogies'
  | 'misconceptions'
  | 'board_work'
  | 'worked_examples'
  | 'cold_call_questions'
  | 'exit_ticket'
  | 'vocabulary'
  | 'learning_objectives'
  | 'assessment_for_learning'
  | 'next_lesson_hint';

export interface RefineInput {
  lesson_plan_id: string;
  section_key: RefinableSectionKey;
  instruction: string;
  preset?: string | null;
}

export function useRefineSection() {
  const [loading, setLoading] = useState(false);
  const [phase, setPhase] = useState<string | null>(null);
  const [streamText, setStreamText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [value, setValue] = useState<unknown>(null);

  const bufferRef = useRef('');
  const rafScheduledRef = useRef(false);
  const flushText = useCallback(() => {
    if (rafScheduledRef.current) return;
    rafScheduledRef.current = true;
    requestAnimationFrame(() => {
      rafScheduledRef.current = false;
      if (bufferRef.current) {
        const add = bufferRef.current;
        bufferRef.current = '';
        setStreamText((t) => t + add);
      }
    });
  }, []);

  const reset = useCallback(() => {
    setLoading(false);
    setPhase(null);
    setStreamText('');
    setError(null);
    setValue(null);
    bufferRef.current = '';
  }, []);

  const refine = useCallback(
    async (input: RefineInput) => {
      setLoading(true);
      setPhase('starting');
      setStreamText('');
      setError(null);
      setValue(null);
      bufferRef.current = '';

      try {
        const session = await supabase.auth.getSession();
        const token = session.data.session?.access_token;
        if (!token) throw new Error('Not signed in');

        const res = await fetch(
          'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/curriculum-refine-section',
          {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              authorization: `Bearer ${token}`,
              accept: 'text/event-stream',
            },
            body: JSON.stringify(input),
          }
        );
        if (!res.ok || !res.body) {
          const text = await res.text();
          throw new Error(`HTTP ${res.status}: ${text.slice(0, 300)}`);
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buf = '';
        let final: unknown = null;
        let thrown: string | null = null;

        while (true) {
          const { value: chunk, done } = await reader.read();
          if (done) break;
          buf += decoder.decode(chunk, { stream: true });
          const frames = buf.split('\n\n');
          buf = frames.pop() ?? '';
          for (const frame of frames) {
            const lines = frame.split('\n');
            let eventType = 'message';
            const dataLines: string[] = [];
            for (const line of lines) {
              if (line.startsWith('event: ')) eventType = line.slice(7).trim();
              else if (line.startsWith('data: ')) dataLines.push(line.slice(6));
            }
            if (dataLines.length === 0) continue;
            let parsed: Record<string, unknown>;
            try {
              parsed = JSON.parse(dataLines.join('\n'));
            } catch {
              continue;
            }

            if (eventType === 'status') {
              setPhase(parsed.phase as string);
            } else if (eventType === 'chunk') {
              const delta = parsed.delta as string;
              if (delta) {
                bufferRef.current += delta;
                flushText();
              }
            } else if (eventType === 'done') {
              final = parsed.value;
            } else if (eventType === 'error') {
              thrown = (parsed.message as string) ?? 'Unknown error';
            }
          }
        }

        // Flush tail
        if (bufferRef.current) {
          const tail = bufferRef.current;
          bufferRef.current = '';
          setStreamText((t) => t + tail);
        }

        if (thrown) throw new Error(thrown);
        if (final === null || final === undefined)
          throw new Error('Stream ended without a value');

        setValue(final);
        return final;
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        setError(msg);
        throw e;
      } finally {
        setLoading(false);
        setPhase(null);
      }
    },
    [flushText]
  );

  return { refine, loading, phase, streamText, error, value, reset };
}

/**
 * Load a persisted lesson plan by id (e.g. for /college/lessons/:id).
 */
export function useLessonPlan(id: string | null) {
  const [plan, setPlan] = useState<GeneratedLessonPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setPlan(null);
      return;
    }
    let cancelled = false;
    setLoading(true);
    supabase
      .from('college_lesson_plans')
      .select('id, title, content, duration_minutes, status, created_at')
      .eq('id', id)
      .maybeSingle()
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) setError(error.message);
        else if (!data) setError('Lesson plan not found');
        else {
          try {
            const parsed =
              typeof data.content === 'string' ? JSON.parse(data.content) : data.content;
            setPlan(parsed as GeneratedLessonPlan);
          } catch (e) {
            setError(`Corrupt lesson plan: ${(e as Error).message}`);
          }
        }
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  return { plan, loading, error };
}
