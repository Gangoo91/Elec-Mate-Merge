/**
 * Tutor Quiz Builder — create, manage, publish quizzes to cohorts, print exams
 */

import { createClient } from '@supabase/supabase-js';
import type { UserContext } from '../auth.js';

export async function createQuiz(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;
  const title = args.title as string;
  if (!title) return { error: 'title is required' };

  const { data: quiz, error } = await supabase
    .from('tutor_quizzes')
    .insert({
      creator_id: user.userId,
      title,
      description: (args.description as string) || null,
      topic: (args.topic as string) || null,
      difficulty: (args.difficulty as string) || 'mixed',
      time_limit_minutes:
        typeof args.time_limit_minutes === 'number' ? args.time_limit_minutes : null,
      pass_mark: typeof args.pass_mark === 'number' ? args.pass_mark : 70,
      cohort_id: (args.cohort_id as string) || null,
    })
    .select('id, title')
    .single();

  if (error) throw new Error(`Failed to create quiz: ${error.message}`);

  // Bulk insert questions if provided
  const questions = args.questions as Array<Record<string, unknown>> | undefined;
  let questionCount = 0;

  if (questions && Array.isArray(questions) && questions.length > 0) {
    const rows = questions.map((q, i) => ({
      quiz_id: quiz.id,
      question_text: q.question_text as string,
      options: q.options,
      correct_answer_index: q.correct_answer_index as number,
      explanation: (q.explanation as string) || null,
      category: (q.category as string) || null,
      difficulty: (q.difficulty as string) || null,
      ac_ref: (q.ac_ref as string) || null,
      points: typeof q.points === 'number' ? q.points : 1,
      sort_order: i,
    }));

    const { error: qErr } = await supabase.from('tutor_quiz_questions').insert(rows);
    if (qErr) console.error(`[tutor-quiz] Failed to insert questions: ${qErr.message}`);
    else questionCount = rows.length;
  }

  return {
    success: true,
    quiz_id: quiz.id,
    title: quiz.title,
    questions_added: questionCount,
    note:
      questionCount === 0
        ? 'Quiz created. Use add_questions_to_quiz to add questions, or generate_quiz_questions to AI-generate them.'
        : `Quiz created with ${questionCount} questions. Use publish_quiz to make it available to a cohort.`,
  };
}

export async function addQuestionsToQuiz(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;
  const quizId = args.quiz_id as string;
  const questions = args.questions as Array<Record<string, unknown>>;

  if (!quizId) return { error: 'quiz_id is required' };
  if (!questions || !Array.isArray(questions) || questions.length === 0)
    return { error: 'questions array is required' };

  // Verify ownership
  const { data: quiz } = await supabase
    .from('tutor_quizzes')
    .select('id')
    .eq('id', quizId)
    .eq('creator_id', user.userId)
    .single();
  if (!quiz) return { error: 'Quiz not found or you do not own it' };

  // Get current max sort_order
  const { data: existing } = await supabase
    .from('tutor_quiz_questions')
    .select('sort_order')
    .eq('quiz_id', quizId)
    .order('sort_order', { ascending: false })
    .limit(1);
  const startOrder = ((existing?.[0]?.sort_order as number) || 0) + 1;

  const rows = questions.map((q, i) => ({
    quiz_id: quizId,
    question_text: q.question_text as string,
    options: q.options,
    correct_answer_index: q.correct_answer_index as number,
    explanation: (q.explanation as string) || null,
    category: (q.category as string) || null,
    difficulty: (q.difficulty as string) || null,
    ac_ref: (q.ac_ref as string) || null,
    points: typeof q.points === 'number' ? q.points : 1,
    sort_order: startOrder + i,
  }));

  const { error } = await supabase.from('tutor_quiz_questions').insert(rows);
  if (error) throw new Error(`Failed to add questions: ${error.message}`);

  // Get total count
  const { count } = await supabase
    .from('tutor_quiz_questions')
    .select('id', { count: 'exact', head: true })
    .eq('quiz_id', quizId);

  return { success: true, added: rows.length, total_questions: count || rows.length };
}

export async function generateQuizQuestions(args: Record<string, unknown>, user: UserContext) {
  const topic = args.topic as string;
  const count = typeof args.count === 'number' ? Math.min(args.count, 20) : 10;
  const difficulty = (args.difficulty as string) || 'mixed';

  if (!topic) return { error: 'topic is required' };

  // Call existing edge function
  const res = await fetch(
    `https://jtwygbeceundfgnkirof.supabase.co/functions/v1/generate-practice-questions`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.jwt}` },
      body: JSON.stringify({ topic, count, difficulty }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    return { error: `Question generation failed: ${err}` };
  }

  const data = (await res.json()) as Record<string, unknown>;
  const inner = data.data as Record<string, unknown> | undefined;
  const questions = (data.questions || inner?.questions || []) as Array<Record<string, unknown>>;

  return {
    success: true,
    questions,
    topic,
    count: questions.length,
    note: 'Review these questions. To save them to a quiz, call create_quiz with the questions array, or add_questions_to_quiz to append to an existing quiz.',
  };
}

export async function publishQuiz(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;
  const quizId = args.quiz_id as string;
  const cohortId = args.cohort_id as string;

  if (!quizId) return { error: 'quiz_id is required' };

  // Verify ownership
  const { data: quiz } = await supabase
    .from('tutor_quizzes')
    .select('id, title')
    .eq('id', quizId)
    .eq('creator_id', user.userId)
    .single();
  if (!quiz) return { error: 'Quiz not found or you do not own it' };

  // Count questions
  const { count: qCount } = await supabase
    .from('tutor_quiz_questions')
    .select('id', { count: 'exact', head: true })
    .eq('quiz_id', quizId);
  if (!qCount || qCount === 0)
    return { error: 'Cannot publish a quiz with no questions. Add questions first.' };

  const updates: Record<string, unknown> = {
    is_published: true,
    updated_at: new Date().toISOString(),
  };
  if (cohortId) updates.cohort_id = cohortId;

  const { error } = await supabase.from('tutor_quizzes').update(updates).eq('id', quizId);
  if (error) throw new Error(`Failed to publish: ${error.message}`);

  // Count students in cohort
  let studentCount = 0;
  if (cohortId) {
    const { count } = await supabase
      .from('college_students')
      .select('id', { count: 'exact', head: true })
      .eq('cohort_id', cohortId);
    studentCount = count || 0;
  }

  return {
    success: true,
    quiz_title: quiz.title,
    questions: qCount,
    published_to_students: studentCount,
    note:
      studentCount > 0
        ? `Published to ${studentCount} students in the cohort.`
        : 'Published. Assign a cohort_id to make it visible to students.',
  };
}

export async function getQuizSubmissions(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;
  const quizId = args.quiz_id as string;
  if (!quizId) return { error: 'quiz_id is required' };

  // Verify ownership
  const { data: quiz } = await supabase
    .from('tutor_quizzes')
    .select('id, title, pass_mark')
    .eq('id', quizId)
    .eq('creator_id', user.userId)
    .single();
  if (!quiz) return { error: 'Quiz not found or you do not own it' };

  // Get attempts with student profiles
  const { data: attempts } = await supabase
    .from('tutor_quiz_attempts')
    .select('student_id, score, total_points, completed_at, time_taken_seconds, answers')
    .eq('quiz_id', quizId)
    .order('completed_at', { ascending: false });

  if (!attempts || attempts.length === 0)
    return { success: true, quiz_title: quiz.title, submissions: [], total: 0 };

  // Get student names
  const studentIds = [...new Set(attempts.map((a) => a.student_id as string))];
  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, full_name')
    .in('id', studentIds);
  const nameMap: Record<string, string> = {};
  for (const p of profiles || []) nameMap[p.id as string] = (p.full_name as string) || 'Unknown';

  const passMark = (quiz.pass_mark as number) || 70;

  const submissions = attempts.map((a) => {
    const pct =
      (a.total_points as number) > 0
        ? Math.round(((a.score as number) / (a.total_points as number)) * 100)
        : 0;
    return {
      student: nameMap[a.student_id as string] || 'Unknown',
      score: a.score,
      total: a.total_points,
      percentage: pct,
      passed: pct >= passMark,
      time_taken: a.time_taken_seconds
        ? `${Math.round((a.time_taken_seconds as number) / 60)}min`
        : null,
      completed: a.completed_at,
    };
  });

  const avgScore =
    submissions.length > 0
      ? Math.round(submissions.reduce((s, sub) => s + sub.percentage, 0) / submissions.length)
      : 0;
  const passRate =
    submissions.length > 0
      ? Math.round((submissions.filter((s) => s.passed).length / submissions.length) * 100)
      : 0;

  return {
    success: true,
    quiz_title: quiz.title,
    submissions,
    total: submissions.length,
    avg_score: avgScore,
    pass_rate: passRate,
  };
}

export async function getCohortQuizAnalytics(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;
  const cohortId = args.cohort_id as string;
  if (!cohortId) return { error: 'cohort_id is required' };

  // Get all quizzes for this cohort owned by this tutor
  const { data: quizzes } = await supabase
    .from('tutor_quizzes')
    .select('id, title, topic, pass_mark')
    .eq('cohort_id', cohortId)
    .eq('creator_id', user.userId);

  if (!quizzes || quizzes.length === 0)
    return { success: true, message: 'No quizzes found for this cohort.', quizzes: [] };

  const quizIds = quizzes.map((q) => q.id as string);

  // Get all attempts
  const { data: attempts } = await supabase
    .from('tutor_quiz_attempts')
    .select('quiz_id, student_id, score, total_points, answers')
    .in('quiz_id', quizIds);

  if (!attempts || attempts.length === 0)
    return {
      success: true,
      quizzes: quizzes.map((q) => ({ title: q.title, attempts: 0 })),
      total_attempts: 0,
    };

  // Per-student averages
  const studentScores: Record<string, number[]> = {};
  for (const a of attempts) {
    const sid = a.student_id as string;
    const pct =
      (a.total_points as number) > 0 ? ((a.score as number) / (a.total_points as number)) * 100 : 0;
    if (!studentScores[sid]) studentScores[sid] = [];
    studentScores[sid].push(pct);
  }

  // Students at risk (avg < 50%)
  const atRisk: string[] = [];
  for (const [sid, scores] of Object.entries(studentScores)) {
    const avg = scores.reduce((s, v) => s + v, 0) / scores.length;
    if (avg < 50) atRisk.push(sid);
  }

  // Get at-risk student names
  let atRiskNames: string[] = [];
  if (atRisk.length > 0) {
    const { data: profiles } = await supabase
      .from('profiles')
      .select('id, full_name')
      .in('id', atRisk);
    atRiskNames = (profiles || []).map((p) => (p.full_name as string) || 'Unknown');
  }

  const allScores = attempts.map((a) =>
    (a.total_points as number) > 0 ? ((a.score as number) / (a.total_points as number)) * 100 : 0
  );
  const avgScore = Math.round(allScores.reduce((s, v) => s + v, 0) / allScores.length);
  const passRate = Math.round((allScores.filter((s) => s >= 70).length / allScores.length) * 100);

  return {
    success: true,
    cohort_id: cohortId,
    total_quizzes: quizzes.length,
    total_attempts: attempts.length,
    unique_students: Object.keys(studentScores).length,
    avg_score: avgScore,
    pass_rate: passRate,
    students_at_risk: atRiskNames,
    at_risk_count: atRisk.length,
    quizzes: quizzes.map((q) => {
      const qAttempts = attempts.filter((a) => a.quiz_id === q.id);
      const qScores = qAttempts.map((a) =>
        (a.total_points as number) > 0
          ? ((a.score as number) / (a.total_points as number)) * 100
          : 0
      );
      return {
        title: q.title,
        topic: q.topic,
        attempts: qAttempts.length,
        avg_score:
          qScores.length > 0 ? Math.round(qScores.reduce((s, v) => s + v, 0) / qScores.length) : 0,
      };
    }),
  };
}

// ─── Generate Printable Exam PDF ──────────────────────────────────────────

/**
 * Generate a printable exam PDF from a quiz — question sheet + separate answer key.
 * Uses Gotenberg for HTML→PDF conversion, uploads to Supabase storage.
 * Returns both a download URL and sends via MEDIA: for WhatsApp delivery.
 */
export async function generateExamPdf(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;
  const quizId = args.quiz_id as string;
  const includeAnswerKey = args.include_answer_key !== false; // default true

  if (!quizId) return { error: 'quiz_id is required' };

  // Get quiz + questions
  const { data: quiz } = await supabase
    .from('tutor_quizzes')
    .select('id, title, topic, difficulty, pass_mark, time_limit_minutes')
    .eq('id', quizId)
    .eq('creator_id', user.userId)
    .single();

  if (!quiz) return { error: 'Quiz not found or you do not own it' };

  const { data: questions } = await supabase
    .from('tutor_quiz_questions')
    .select(
      'question_text, options, correct_answer_index, explanation, category, points, sort_order'
    )
    .eq('quiz_id', quizId)
    .order('sort_order', { ascending: true });

  if (!questions || questions.length === 0) return { error: 'Quiz has no questions' };

  const totalPoints = questions.reduce((s, q) => s + Number(q.points || 1), 0);
  const letters = ['A', 'B', 'C', 'D'];

  // Get tutor profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, business_name')
    .eq('id', user.userId)
    .single();

  const tutorName = (profile?.full_name as string) || (profile?.business_name as string) || '';
  const today = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // Build question sheet HTML
  const questionsHtml = questions
    .map((q, i) => {
      const opts = (q.options as string[]) || [];
      return `
      <div class="question">
        <p class="q-num"><strong>Question ${i + 1}</strong> <span class="pts">[${q.points || 1} mark${(q.points || 1) > 1 ? 's' : ''}]</span></p>
        <p class="q-text">${q.question_text}</p>
        <div class="options">
          ${opts.map((opt, j) => `<div class="option"><span class="letter">${letters[j]}</span> ${opt}</div>`).join('')}
        </div>
        <div class="answer-box">Answer: _______</div>
      </div>`;
    })
    .join('');

  const examHtml = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
    @page { size: A4; margin: 20mm; }
    body { font-family: Arial, Helvetica, sans-serif; font-size: 12pt; line-height: 1.5; color: #000; }
    .header { border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px; }
    .header h1 { margin: 0; font-size: 18pt; }
    .header .meta { font-size: 10pt; color: #555; margin-top: 5px; }
    .student-info { border: 1px solid #ccc; padding: 10px; margin-bottom: 20px; display: flex; gap: 20px; }
    .student-info div { flex: 1; }
    .student-info label { font-weight: bold; font-size: 10pt; display: block; margin-bottom: 2px; }
    .student-info .line { border-bottom: 1px solid #999; height: 20px; }
    .question { margin-bottom: 20px; page-break-inside: avoid; }
    .q-num { margin: 0 0 4px; }
    .pts { font-weight: normal; color: #666; font-size: 10pt; }
    .q-text { margin: 0 0 8px; }
    .options { margin-left: 10px; }
    .option { margin: 4px 0; }
    .letter { display: inline-block; width: 24px; height: 24px; border: 1px solid #999; border-radius: 50%; text-align: center; line-height: 22px; font-weight: bold; margin-right: 8px; font-size: 10pt; }
    .answer-box { margin-top: 8px; font-size: 10pt; color: #666; }
    .footer { margin-top: 30px; border-top: 1px solid #ccc; padding-top: 10px; font-size: 9pt; color: #999; text-align: center; }
  </style></head><body>
    <div class="header">
      <h1>${quiz.title}</h1>
      <div class="meta">
        ${quiz.topic ? `Topic: ${quiz.topic} | ` : ''}${questions.length} questions | ${totalPoints} marks | Pass mark: ${quiz.pass_mark || 70}%
        ${quiz.time_limit_minutes ? ` | Time: ${quiz.time_limit_minutes} minutes` : ''}
      </div>
    </div>
    <div class="student-info">
      <div><label>Name:</label><div class="line"></div></div>
      <div><label>Date:</label><div class="line"></div></div>
      <div><label>Score:</label><div class="line"> / ${totalPoints}</div></div>
    </div>
    ${questionsHtml}
    <div class="footer">Generated by Elec-Mate${tutorName ? ` | ${tutorName}` : ''} | ${today}</div>
  </body></html>`;

  // Build answer key HTML
  let answerKeyHtml = '';
  if (includeAnswerKey) {
    const answersHtml = questions
      .map((q, i) => {
        const opts = (q.options as string[]) || [];
        const correctIdx = q.correct_answer_index as number;
        return `<tr>
        <td>${i + 1}</td>
        <td><strong>${letters[correctIdx]}</strong></td>
        <td>${opts[correctIdx] || ''}</td>
        <td style="font-size:9pt;color:#555;">${q.explanation || ''}</td>
      </tr>`;
      })
      .join('');

    answerKeyHtml = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
      @page { size: A4; margin: 20mm; }
      body { font-family: Arial, sans-serif; font-size: 11pt; }
      h1 { font-size: 16pt; border-bottom: 2px solid #000; padding-bottom: 8px; }
      table { width: 100%; border-collapse: collapse; margin-top: 15px; }
      th, td { border: 1px solid #ccc; padding: 6px 10px; text-align: left; }
      th { background: #f0f0f0; font-size: 10pt; }
      .footer { margin-top: 20px; font-size: 9pt; color: #999; text-align: center; }
    </style></head><body>
      <h1>${quiz.title} — Answer Key</h1>
      <table>
        <tr><th>#</th><th>Answer</th><th>Correct Option</th><th>Explanation</th></tr>
        ${answersHtml}
      </table>
      <div class="footer">CONFIDENTIAL — Tutor use only | Generated by Elec-Mate | ${today}</div>
    </body></html>`;
  }

  // Convert HTML to PDF via Gotenberg
  const gotenbergUrl = 'http://127.0.0.1:3200/forms/chromium/convert/html';

  try {
    const formData = new FormData();
    formData.append('files', new Blob([examHtml], { type: 'text/html' }), 'index.html');
    formData.append('marginTop', '0');
    formData.append('marginBottom', '0');
    formData.append('marginLeft', '0');
    formData.append('marginRight', '0');

    const pdfRes = await fetch(gotenbergUrl, { method: 'POST', body: formData });
    if (!pdfRes.ok) return { error: `PDF generation failed: ${pdfRes.status}` };

    const pdfBuffer = Buffer.from(await pdfRes.arrayBuffer());

    // Upload exam PDF
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!serviceKey) return { error: 'Storage not configured' };
    const adminClient = createClient(
      process.env.SUPABASE_URL || 'https://jtwygbeceundfgnkirof.supabase.co',
      serviceKey
    );

    const examFileName = `exam-${quizId.slice(0, 8)}-${Date.now()}.pdf`;
    await adminClient.storage
      .from('visual-uploads')
      .upload(examFileName, pdfBuffer, { contentType: 'application/pdf', upsert: false });
    const { data: examUrl } = adminClient.storage.from('visual-uploads').getPublicUrl(examFileName);

    // Generate answer key PDF if requested
    let answerKeyUrl = null;
    if (includeAnswerKey && answerKeyHtml) {
      const akForm = new FormData();
      akForm.append('files', new Blob([answerKeyHtml], { type: 'text/html' }), 'index.html');
      akForm.append('marginTop', '0');
      akForm.append('marginBottom', '0');

      const akRes = await fetch(gotenbergUrl, { method: 'POST', body: akForm });
      if (akRes.ok) {
        const akBuffer = Buffer.from(await akRes.arrayBuffer());
        const akFileName = `answer-key-${quizId.slice(0, 8)}-${Date.now()}.pdf`;
        await adminClient.storage
          .from('visual-uploads')
          .upload(akFileName, akBuffer, { contentType: 'application/pdf', upsert: false });
        const { data: akUrl } = adminClient.storage.from('visual-uploads').getPublicUrl(akFileName);
        answerKeyUrl = akUrl.publicUrl;
      }
    }

    return {
      success: true,
      quiz_title: quiz.title,
      questions: questions.length,
      total_marks: totalPoints,
      exam_pdf_url: examUrl.publicUrl,
      answer_key_pdf_url: answerKeyUrl,
      note: 'Send the exam PDF to students via MEDIA: prefix. Keep the answer key for yourself.',
    };
  } catch (err) {
    return { error: `PDF generation failed: ${err instanceof Error ? err.message : 'unknown'}` };
  }
}
