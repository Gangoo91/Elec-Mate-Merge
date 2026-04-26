import { useCallback, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useParseAssessmentDocument — uploads a tutor-supplied lesson plan / past
   paper / tutor notes / brief / scheme of work to the tutor-assessment-docs
   bucket, extracts text client-side (PDF / DOCX / TXT), persists the row to
   tutor_assessment_documents with parsed_text, then invokes
   ai-parse-assessment-document to author a quiz / assessment grounded in:
     • the doc's actual content
     • the qualification ACs
     • BS 7671 facets
   ========================================================================== */

export type AssessmentSourceKind =
  | 'lesson_plan'
  | 'past_paper'
  | 'tutor_notes'
  | 'brief'
  | 'scheme_of_work'
  | 'reading';

export type AssessmentTargetKind = 'quiz' | 'assessment' | 'mock_exam';

export interface ParseAuthorRequest {
  file: File;
  title: string;
  source_kind: AssessmentSourceKind;
  target_kind: AssessmentTargetKind;
  description?: string;
  qualification_code?: string;
  college_student_id?: string;
  cohort_id?: string;
  lesson_plan_id?: string;
  count?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  time_limit_minutes?: number;
  pass_mark?: number;
  is_homework?: boolean;
  due_date?: string;
  publish?: boolean;
}

export interface ParseAuthorResult {
  document_id: string;
  quiz_id: string;
  questions_count: number;
  citations_count: number;
  kind: AssessmentTargetKind;
  quiz: {
    id: string;
    title: string;
    description: string | null;
    difficulty: string;
    time_limit_minutes: number | null;
    pass_mark: number | null;
    is_published: boolean;
  };
  questions: Array<{
    id: string;
    question_kind: string;
    question_text: string;
    options: string[] | null;
    correct_answer_index: number | null;
    expected_answer: Record<string, unknown> | null;
    marking_guidance: string | null;
    explanation: string | null;
    category: string | null;
    difficulty: string | null;
    ac_ref: string | null;
    points: number | null;
    bs7671_citations: Array<{ ref: string; snippet?: string }> | null;
  }>;
}

type Phase = 'idle' | 'extracting' | 'uploading' | 'authoring' | 'done' | 'error';

const MAX_FILE_BYTES = 25 * 1024 * 1024;
const PARSED_TEXT_CAP = 240_000;
const MIN_PARSED_CHARS = 50;

async function extractText(file: File): Promise<string> {
  const lower = file.name.toLowerCase();
  if (lower.endsWith('.pdf') || file.type === 'application/pdf') {
    const pdfjs = await import('pdfjs-dist');
    // Vite serves the worker as a static URL.
    // @ts-expect-error -- ?url import handled by Vite at build time
    const workerSrc = (await import('pdfjs-dist/build/pdf.worker.min.mjs?url')).default;
    pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;
    const buf = await file.arrayBuffer();
    const doc = await pdfjs.getDocument({ data: buf }).promise;
    const out: string[] = [];
    for (let p = 1; p <= doc.numPages; p++) {
      const page = await doc.getPage(p);
      const content = await page.getTextContent();
      const pageText = (content.items as Array<{ str?: string }>)
        .map((i) => i.str ?? '')
        .join(' ');
      out.push(pageText);
      if (out.join('\n').length > PARSED_TEXT_CAP) break;
    }
    return out.join('\n').slice(0, PARSED_TEXT_CAP);
  }
  if (lower.endsWith('.docx')) {
    const mammoth = await import('mammoth');
    const buf = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer: buf });
    return (result.value ?? '').slice(0, PARSED_TEXT_CAP);
  }
  if (lower.endsWith('.txt') || lower.endsWith('.md') || file.type.startsWith('text/')) {
    const text = await file.text();
    return text.slice(0, PARSED_TEXT_CAP);
  }
  throw new Error('Unsupported file type. Upload a PDF, DOCX, TXT or MD.');
}

export function useParseAssessmentDocument() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<string | null>(null);
  const [result, setResult] = useState<ParseAuthorResult | null>(null);

  const reset = useCallback(() => {
    setPhase('idle');
    setError(null);
    setProgress(null);
    setResult(null);
  }, []);

  const run = useCallback(async (req: ParseAuthorRequest): Promise<ParseAuthorResult> => {
    setError(null);
    setResult(null);

    if (req.file.size > MAX_FILE_BYTES) {
      const e = `File too large (${Math.round(req.file.size / 1024 / 1024)} MB). Max 25 MB.`;
      setPhase('error');
      setError(e);
      throw new Error(e);
    }

    // 1. Client-side text extraction
    setPhase('extracting');
    setProgress('Extracting text from document…');
    let parsedText: string;
    try {
      parsedText = await extractText(req.file);
    } catch (e) {
      setPhase('error');
      const msg = (e as Error).message ?? 'Could not extract text';
      setError(msg);
      throw new Error(msg);
    }
    if (!parsedText || parsedText.trim().length < MIN_PARSED_CHARS) {
      const msg =
        'No readable text found. The doc might be scanned (image-only PDF) — try a text-based PDF or paste the content into a Word doc.';
      setPhase('error');
      setError(msg);
      throw new Error(msg);
    }

    // 2. Auth + profile (need college_id for the row)
    setPhase('uploading');
    setProgress('Uploading document…');
    const { data: userData } = await supabase.auth.getUser();
    const uid = userData?.user?.id;
    if (!uid) {
      setPhase('error');
      setError('Not signed in');
      throw new Error('Not signed in');
    }
    const { data: profile } = await supabase
      .from('profiles')
      .select('college_id')
      .eq('id', uid)
      .maybeSingle();
    const collegeId = (profile as { college_id?: string } | null)?.college_id;
    if (!collegeId) {
      setPhase('error');
      setError('Your profile is not linked to a college.');
      throw new Error('No college on profile');
    }

    // 3. Upload file to storage
    const safeName = req.file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const path = `${collegeId}/${uid}/${Date.now()}-${safeName}`;
    const { error: upErr } = await supabase.storage
      .from('tutor-assessment-docs')
      .upload(path, req.file, { contentType: req.file.type || 'application/octet-stream' });
    if (upErr) {
      setPhase('error');
      setError(upErr.message);
      throw upErr;
    }

    // 4. Insert tutor_assessment_documents row with parsed_text
    const { data: docRow, error: insErr } = await supabase
      .from('tutor_assessment_documents')
      .insert({
        uploader_id: uid,
        college_id: collegeId,
        title: req.title,
        description: req.description ?? null,
        source_kind: req.source_kind,
        qualification_code: req.qualification_code ?? null,
        storage_path: path,
        file_name: req.file.name,
        file_size_bytes: req.file.size,
        mime_type: req.file.type || null,
        parsed_text: parsedText,
        parsed_at: new Date().toISOString(),
        status: 'parsed',
      })
      .select('id')
      .single();
    if (insErr || !docRow) {
      setPhase('error');
      setError(insErr?.message ?? 'Could not save document row');
      throw insErr ?? new Error('No doc row');
    }
    const documentId = (docRow as { id: string }).id;

    // 5. Invoke AI to author quiz/assessment
    setPhase('authoring');
    setProgress(
      req.target_kind === 'mock_exam'
        ? 'AI is drafting a mock exam from the document…'
        : req.target_kind === 'assessment'
          ? 'AI is drafting an assessment from the document…'
          : 'AI is drafting a quiz from the document…'
    );
    const { data: invokeData, error: invokeErr } = await supabase.functions.invoke(
      'ai-parse-assessment-document',
      {
        body: {
          document_id: documentId,
          target_kind: req.target_kind,
          college_student_id: req.college_student_id,
          cohort_id: req.cohort_id,
          lesson_plan_id: req.lesson_plan_id,
          count: req.count,
          difficulty: req.difficulty,
          title: req.title,
          time_limit_minutes: req.time_limit_minutes,
          pass_mark: req.pass_mark,
          is_homework: req.is_homework,
          due_date: req.due_date,
          publish: req.publish ?? false,
        },
      }
    );
    if (invokeErr) {
      setPhase('error');
      setError(invokeErr.message);
      throw invokeErr;
    }
    const data = invokeData as ParseAuthorResult & { error?: string };
    if (data?.error) {
      setPhase('error');
      setError(data.error);
      throw new Error(data.error);
    }
    const finalResult: ParseAuthorResult = { ...data, document_id: documentId };
    setResult(finalResult);
    setPhase('done');
    setProgress(null);
    return finalResult;
  }, []);

  return { phase, error, progress, result, run, reset };
}
