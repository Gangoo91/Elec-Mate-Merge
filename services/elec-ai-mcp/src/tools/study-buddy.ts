/**
 * WhatsApp Study Buddy — quiz me, explain topics, study stats, revision planner, daily challenge
 */

import type { UserContext } from '../auth.js';

// ─── Quiz Me ──────────────────────────────────────────────────────────────

export async function quizMe(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;
  const topic = (args.topic as string) || undefined;
  const difficulty = (args.difficulty as string) || 'mixed';
  const count = typeof args.count === 'number' ? Math.min(args.count, 10) : 5;

  // Generate questions via edge function
  const res = await fetch(
    'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/generate-practice-questions',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.jwt}` },
      body: JSON.stringify({ topic: topic || 'general electrical', count, difficulty }),
    }
  );

  if (!res.ok) return { error: 'Failed to generate quiz questions. Try again.' };

  const data = (await res.json()) as Record<string, unknown>;
  const questions = (data.questions ||
    (data.data as Record<string, unknown>)?.questions ||
    []) as Array<Record<string, unknown>>;

  // Get previous score on this topic for context
  let previousScore = null;
  if (topic) {
    const { data: prev } = await supabase
      .from('quiz_results')
      .select('score, percentage, created_at')
      .ilike('topic', `%${topic}%`)
      .order('created_at', { ascending: false })
      .limit(1);
    if (prev?.length)
      previousScore = { score: prev[0].percentage || prev[0].score, date: prev[0].created_at };
  }

  // Get streak
  const { data: streak } = await supabase
    .from('user_study_streaks')
    .select('current_streak')
    .limit(1);

  return {
    success: true,
    questions,
    topic: topic || 'general electrical',
    difficulty,
    count: questions.length,
    previous_score: previousScore,
    current_streak: streak?.[0]?.current_streak || 0,
    instructions:
      'Present questions one at a time. After the apprentice answers, say whether they got it right or wrong and give the explanation. After all questions, call save_quiz_result with the results.',
  };
}

// ─── Explain Topic ────────────────────────────────────────────────────────

export async function explainTopic(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;
  const topic = args.topic as string;
  if (!topic)
    return {
      error: 'topic is required (e.g. "RCD protection", "cable sizing", "earthing arrangements")',
    };

  const level = (args.level as string) || 'beginner';

  // Search multiple RAG sources in parallel
  const searchPromises = [
    supabase
      .rpc('search_health_safety_hybrid', { search_query: topic, match_count: 3 })
      .then((r) => r.data),
  ];

  // Also try training content edge function
  let trainingContent: unknown = null;
  try {
    const res = await fetch(
      'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/search-training-rag',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.jwt}` },
        body: JSON.stringify({ query: topic, match_count: 5 }),
      }
    );
    if (res.ok) trainingContent = await res.json();
  } catch {
    /* non-critical */
  }

  // Regulation lookup
  let regContent: unknown = null;
  try {
    const res = await fetch(
      'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/bs7671-rag-search',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.jwt}` },
        body: JSON.stringify({ query: topic, match_count: 3 }),
      }
    );
    if (res.ok) regContent = await res.json();
  } catch {
    /* non-critical */
  }

  // Practical methods (fast GIN search)
  const { data: practicalData } = await supabase
    .from('practical_work_intelligence')
    .select('title, content, category')
    .textSearch('content', topic.replace(/\s+/g, ' & '))
    .limit(3);

  // Check quiz history on this topic
  const { data: quizHistory } = await supabase
    .from('quiz_results')
    .select('score, percentage, created_at')
    .ilike('topic', `%${topic}%`)
    .order('created_at', { ascending: false })
    .limit(3);

  return {
    success: true,
    topic,
    level,
    sources: {
      training: trainingContent,
      regulations: regContent,
      practical: practicalData || [],
    },
    quiz_history: quizHistory || [],
    instructions: `Explain "${topic}" clearly and conversationally at ${level} level. Use the RAG sources for accuracy. If the apprentice has quiz history on this topic, mention whether they are improving. Keep it practical — real-world examples, not textbook.`,
  };
}

// ─── My Study Stats ───────────────────────────────────────────────────────

export async function getMyStudyStats(_args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;

  const [quizRes, progressRes, streakRes, portfolioRes, examsRes] = await Promise.all([
    supabase
      .from('quiz_results')
      .select('topic, score, correct_answers, total_questions, percentage, created_at')
      .order('created_at', { ascending: false })
      .limit(50),
    supabase
      .from('learning_progress')
      .select('course, module, completion_percentage, time_spent_minutes'),
    supabase
      .from('user_study_streaks')
      .select(
        'current_streak, longest_streak, last_study_date, total_study_sessions, total_cards_reviewed'
      )
      .limit(1),
    supabase.from('portfolio_items').select('id, status, assessment_criteria_met').limit(200),
    supabase
      .from('exam_results')
      .select('exam_type, score, passed, completed_at')
      .order('completed_at', { ascending: false })
      .limit(10),
  ]);

  const quizzes = quizRes.data || [];
  const progress = progressRes.data || [];
  const streak = (streakRes.data?.[0] || {}) as Record<string, unknown>;
  const portfolio = portfolioRes.data || [];
  const exams = examsRes.data || [];

  // Topic scores
  const topicScores: Record<string, { total: number; correct: number; attempts: number }> = {};
  for (const q of quizzes) {
    const t = (q.topic as string) || 'general';
    if (!topicScores[t]) topicScores[t] = { total: 0, correct: 0, attempts: 0 };
    topicScores[t].total += Number(q.total_questions || 0);
    topicScores[t].correct += Number(q.correct_answers || 0);
    topicScores[t].attempts++;
  }

  const topicBreakdown = Object.entries(topicScores)
    .map(([topic, data]) => ({
      topic,
      avg_score: data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0,
      attempts: data.attempts,
    }))
    .sort((a, b) => a.avg_score - b.avg_score);

  const weakAreas = topicBreakdown.filter((t) => t.avg_score < 70);
  const strongAreas = topicBreakdown.filter((t) => t.avg_score >= 80);

  // Portfolio stats
  const totalEvidence = portfolio.length;
  const approvedEvidence = portfolio.filter((p) => p.status === 'approved').length;
  const totalACs = new Set(portfolio.flatMap((p) => (p.assessment_criteria_met as string[]) || []))
    .size;

  // Study time
  const totalStudyMinutes = progress.reduce((s, p) => s + Number(p.time_spent_minutes || 0), 0);

  // Overall average
  const allScores = quizzes.map((q) => Number(q.percentage || 0)).filter((s) => s > 0);
  const overallAvg =
    allScores.length > 0 ? Math.round(allScores.reduce((s, v) => s + v, 0) / allScores.length) : 0;

  return {
    success: true,
    overall_average: overallAvg,
    total_quizzes: quizzes.length,
    streak: {
      current: streak.current_streak || 0,
      longest: streak.longest_streak || 0,
      last_studied: streak.last_study_date || null,
      total_sessions: streak.total_study_sessions || 0,
    },
    topics: topicBreakdown.slice(0, 15),
    weak_areas: weakAreas.map((t) => t.topic),
    strong_areas: strongAreas.map((t) => t.topic),
    portfolio: { total_evidence: totalEvidence, approved: approvedEvidence, acs_met: totalACs },
    study_time_hours: Math.round(totalStudyMinutes / 60),
    recent_exams: exams
      .slice(0, 5)
      .map((e) => ({ type: e.exam_type, score: e.score, passed: e.passed, date: e.completed_at })),
  };
}

// ─── Study Plan ───────────────────────────────────────────────────────────

export async function getStudyPlan(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;
  const examDate = args.exam_date as string;
  const examType = (args.exam_type as string) || 'general';

  if (!examDate) return { error: 'exam_date is required (e.g. "2026-06-15")' };

  const exam = new Date(examDate);
  const now = new Date();
  const daysUntilExam = Math.ceil((exam.getTime() - now.getTime()) / 86400000);
  if (daysUntilExam < 1) return { error: 'Exam date must be in the future' };

  // Get quiz history to find weak areas
  const { data: quizzes } = await supabase
    .from('quiz_results')
    .select('topic, score, correct_answers, total_questions, percentage, created_at')
    .order('created_at', { ascending: false })
    .limit(100);

  const topicScores: Record<string, { avg: number; lastStudied: Date; attempts: number }> = {};
  for (const q of quizzes || []) {
    const t = (q.topic as string) || 'general';
    const pct = Number(q.percentage || 0);
    if (!topicScores[t]) topicScores[t] = { avg: 0, lastStudied: new Date(0), attempts: 0 };
    topicScores[t].avg =
      (topicScores[t].avg * topicScores[t].attempts + pct) / (topicScores[t].attempts + 1);
    topicScores[t].attempts++;
    const d = new Date(q.created_at as string);
    if (d > topicScores[t].lastStudied) topicScores[t].lastStudied = d;
  }

  // Sort: weakest first, then least recently studied
  const sortedTopics = Object.entries(topicScores)
    .map(([topic, data]) => ({
      topic,
      avg: Math.round(data.avg),
      lastStudied: data.lastStudied,
      attempts: data.attempts,
    }))
    .sort((a, b) => a.avg - b.avg || a.lastStudied.getTime() - b.lastStudied.getTime());

  const weakTopics = sortedTopics.filter((t) => t.avg < 50);
  const mediumTopics = sortedTopics.filter((t) => t.avg >= 50 && t.avg < 70);
  const strongTopics = sortedTopics.filter((t) => t.avg >= 70);

  // Build schedule
  const schedule: Array<{
    day: number;
    date: string;
    focus: string;
    topics: string[];
    activity: string;
  }> = [];

  // Core electrical topics to ensure coverage
  const coreTopics = [
    'earthing',
    'protection',
    'cable sizing',
    'testing',
    'safe isolation',
    'circuit design',
    'regulations',
    'inspection',
  ];
  const unstudiedTopics = coreTopics.filter((t) => !topicScores[t.toLowerCase()]);

  for (let day = 1; day <= Math.min(daysUntilExam, 30); day++) {
    const date = new Date(now);
    date.setDate(date.getDate() + day);
    if (date.getDay() === 0) continue; // skip Sundays

    let focus = '';
    const topics: string[] = [];
    let activity = '';

    if (day % 2 === 1 && weakTopics.length > 0) {
      // Odd days: weak areas
      const t = weakTopics[Math.floor((day / 2) % weakTopics.length)];
      focus = 'Weak area revision';
      topics.push(t.topic);
      activity = `Quiz yourself on ${t.topic} (currently ${t.avg}%). Aim for 70%+. Use quiz_me.`;
    } else if (day % 3 === 0 && mediumTopics.length > 0) {
      // Every 3rd day: medium areas
      const t = mediumTopics[Math.floor((day / 3) % mediumTopics.length)];
      focus = 'Consolidation';
      topics.push(t.topic);
      activity = `Revise ${t.topic} (${t.avg}%). Use explain_topic then quiz_me to test.`;
    } else if (unstudiedTopics.length > 0) {
      // Fill gaps
      const t = unstudiedTopics[day % unstudiedTopics.length];
      focus = 'New topic';
      topics.push(t);
      activity = `Start learning ${t}. Use explain_topic to understand, then quiz_me.`;
    } else if (strongTopics.length > 0) {
      // Maintain strong areas
      const t = strongTopics[day % strongTopics.length];
      focus = 'Maintenance';
      topics.push(t.topic);
      activity = `Quick revision of ${t.topic} to keep it fresh.`;
    } else {
      focus = 'General practice';
      activity = 'Mixed topic quiz. Use quiz_me with no topic for random questions.';
    }

    schedule.push({ day, date: date.toISOString().slice(0, 10), focus, topics, activity });
  }

  return {
    success: true,
    exam_date: examDate,
    exam_type: examType,
    days_until_exam: daysUntilExam,
    weak_areas: weakTopics.map((t) => `${t.topic} (${t.avg}%)`),
    strong_areas: strongTopics.map((t) => `${t.topic} (${t.avg}%)`),
    unstudied: unstudiedTopics,
    schedule: schedule.slice(0, 20),
    tips: [
      'Study your weakest topics every other day until they hit 70%',
      'Use the daily_challenge every morning to build your streak',
      'Explain topics out loud — if you can teach it, you know it',
      daysUntilExam < 7
        ? 'Exam is close! Focus only on weak areas now.'
        : 'You have time. Build a steady routine.',
    ],
  };
}

// ─── Daily Challenge ──────────────────────────────────────────────────────

export async function dailyChallenge(_args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;
  const today = new Date().toISOString().slice(0, 10);

  // Check if already completed today
  const { data: existing } = await supabase
    .from('quiz_results')
    .select('id')
    .eq('source', 'daily_challenge')
    .gte('created_at', `${today}T00:00:00Z`)
    .limit(1);

  if (existing?.length) {
    // Get streak
    const { data: streak } = await supabase
      .from('user_study_streaks')
      .select('current_streak, longest_streak')
      .limit(1);
    return {
      success: true,
      already_completed: true,
      message: "You already did today's challenge! Come back tomorrow.",
      streak: streak?.[0] || { current_streak: 0, longest_streak: 0 },
    };
  }

  // Find weakest or least-recently-studied topic
  const { data: history } = await supabase
    .from('quiz_results')
    .select('topic, percentage, created_at')
    .order('created_at', { ascending: false })
    .limit(30);

  const topicMap: Record<string, { avg: number; count: number }> = {};
  for (const h of history || []) {
    const t = (h.topic as string) || 'general';
    if (!topicMap[t]) topicMap[t] = { avg: 0, count: 0 };
    topicMap[t].avg =
      (topicMap[t].avg * topicMap[t].count + Number(h.percentage || 50)) / (topicMap[t].count + 1);
    topicMap[t].count++;
  }

  // Pick: weakest topic, or random core topic if no history
  const coreTopics = [
    'earthing',
    'protection',
    'cable sizing',
    'testing',
    'safe isolation',
    'circuit design',
    'wiring regulations',
    'inspection and testing',
  ];
  let selectedTopic: string;

  if (Object.keys(topicMap).length > 0) {
    const weakest = Object.entries(topicMap).sort((a, b) => a[1].avg - b[1].avg);
    selectedTopic = weakest[0][0];
  } else {
    selectedTopic = coreTopics[Math.floor(Math.random() * coreTopics.length)];
  }

  // Generate 1 question
  const res = await fetch(
    'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/generate-practice-questions',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.jwt}` },
      body: JSON.stringify({ topic: selectedTopic, count: 1, difficulty: 'medium' }),
    }
  );

  let question = null;
  if (res.ok) {
    const data = (await res.json()) as Record<string, unknown>;
    const questions = (data.questions ||
      (data.data as Record<string, unknown>)?.questions ||
      []) as Array<Record<string, unknown>>;
    question = questions[0] || null;
  }

  if (!question) return { error: "Failed to generate today's challenge. Try again." };

  // Get streak info
  const { data: streakData } = await supabase
    .from('user_study_streaks')
    .select('current_streak, longest_streak, last_study_date')
    .limit(1);
  const streak = streakData?.[0] || { current_streak: 0, longest_streak: 0, last_study_date: null };

  // Check if streak continues (yesterday or today)
  const lastDate = streak.last_study_date
    ? new Date(streak.last_study_date as string).toISOString().slice(0, 10)
    : null;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().slice(0, 10);
  const streakContinues = lastDate === yesterdayStr || lastDate === today;

  const newStreak = streakContinues ? ((streak.current_streak as number) || 0) + 1 : 1;
  const newLongest = Math.max(newStreak, (streak.longest_streak as number) || 0);

  return {
    success: true,
    question,
    topic: selectedTopic,
    streak: { current: newStreak, longest: newLongest, continues: streakContinues },
    instructions:
      'Present the question. When they answer, say right/wrong + explanation. Then call save_quiz_result with source="daily_challenge" and update their streak: upsert user_study_streaks with current_streak and longest_streak.',
  };
}
