/**
 * Apprentice tools — portfolio, learning progress, EPA, wellbeing, and career tools
 * Maps to: Supabase study content tables + edge functions
 *
 * Study/quiz tools (search_study_content, generate_practice_questions, etc.)
 * have been extracted to study.ts and are available to ALL roles.
 *
 * SECURITY.md §17 — Apprentice-specific safeguards:
 *   - EPA/AM2 simulators clearly marked as PRACTICE
 *   - Mood data is highest sensitivity (encrypted, never shared)
 *   - Portfolio evidence only shared by the apprentice
 */

import type { UserContext } from '../auth.js';

import { callEdgeFunction } from '../lib/edge-function.js';

// Re-export study tools so existing router imports still work
export {
  searchStudyContent,
  generatePracticeQuestions,
  getFlashcards,
  getExamResults,
  getToolboxGuides,
  runAm2Simulator,
  saveQuizResult,
  getQuizHistory,
} from './study.js';

export async function getLearningProgress(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;
  let query = supabase
    .from('learning_progress')
    .select('course, module, completion_percentage, last_accessed, time_spent_minutes');

  if (typeof args.course === 'string') {
    query = query.eq('course', args.course);
  }

  const { data, error } = await query;
  if (error) throw new Error(`Failed to get learning progress: ${error.message}`);

  return { progress: data || [] };
}

export async function logOjtHours(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.date !== 'string') {
    throw new Error('Date is required');
  }
  if (typeof args.hours !== 'number' || args.hours <= 0) {
    throw new Error('Hours must be a positive number');
  }
  if (typeof args.activity !== 'string' || args.activity.trim().length === 0) {
    throw new Error('Activity description is required');
  }

  const supabase = user.supabase;

  const { data, error } = await supabase
    .from('ojt_hours')
    .insert({
      user_id: user.userId,
      date: args.date,
      hours: args.hours,
      activity: args.activity.trim(),
      evidence_url: typeof args.evidence_url === 'string' ? args.evidence_url : null,
    })
    .select('id')
    .single();

  if (error) throw new Error(`Failed to log OJT hours: ${error.message}`);

  return { ojt_id: data.id, logged: true };
}

export async function logSiteDiary(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.date !== 'string') {
    throw new Error('Date is required');
  }
  if (typeof args.tasks_completed !== 'string' || args.tasks_completed.trim().length === 0) {
    throw new Error('tasks_completed is required');
  }

  const supabase = user.supabase;

  const { data, error } = await supabase
    .from('site_diary_entries')
    .insert({
      user_id: user.userId,
      date: args.date,
      tasks_completed: args.tasks_completed.trim(),
      skills_practised: typeof args.skills_practised === 'string' ? args.skills_practised : null,
      observations: typeof args.observations === 'string' ? args.observations : null,
      photos: Array.isArray(args.photos) ? args.photos : [],
    })
    .select('id')
    .single();

  if (error) throw new Error(`Failed to log site diary: ${error.message}`);

  return { diary_entry_id: data.id, logged: true };
}

export async function getSiteDiaryCoaching(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.diary_entry_id !== 'string') {
    throw new Error('diary_entry_id is required');
  }

  const result = await callEdgeFunction('analyze-diary-entry', user.jwt, {
    diary_entry_id: args.diary_entry_id,
  });

  if (result.error) throw new Error(result.error);
  return result.data;
}

export async function getPortfolioStatus(_args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;

  // Get all portfolio entries
  const { data: items, error } = await supabase
    .from('portfolio_items')
    .select(
      'id, title, category, status, grade, learning_outcomes_met, assessment_criteria_met, date_completed, is_supervisor_verified, created_at'
    )
    .order('created_at', { ascending: false });

  if (error) throw new Error(`Failed to get portfolio status: ${error.message}`);

  const entries = items || [];
  const total = entries.length;
  const approved = entries.filter(
    (e) => e.status === 'approved' || e.is_supervisor_verified === true
  ).length;
  const pending = entries.filter((e) => e.status === 'submitted' || e.status === 'pending').length;

  // Count unique ACs met across all entries
  const allAcsMet = new Set<string>();
  const allLosMet = new Set<string>();
  for (const e of entries) {
    if (Array.isArray(e.assessment_criteria_met)) {
      for (const ac of e.assessment_criteria_met) allAcsMet.add(ac as string);
    }
    if (Array.isArray(e.learning_outcomes_met)) {
      for (const lo of e.learning_outcomes_met) allLosMet.add(lo as string);
    }
  }

  // Get KSB progress
  const { data: ksbData } = await supabase.from('user_ksb_progress').select('status');

  const ksbTotal = (ksbData || []).length;
  const ksbCompleted = (ksbData || []).filter(
    (k) => k.status === 'completed' || k.status === 'verified'
  ).length;

  return {
    entries: entries.slice(0, 20),
    total_entries: total,
    approved_entries: approved,
    pending_review: pending,
    unique_acs_met: allAcsMet.size,
    unique_los_met: allLosMet.size,
    ksb_progress: { total: ksbTotal, completed: ksbCompleted },
    completion_percentage: total > 0 ? Math.round((approved / total) * 100) : 0,
  };
}

export async function readPortfolioEvidence(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;
  let query = supabase
    .from('portfolio_items')
    .select(
      'id, title, description, category, status, grade, file_url, file_type, skills_demonstrated, reflection_notes, supervisor_feedback, learning_outcomes_met, assessment_criteria_met, storage_urls, tags, date_completed, is_supervisor_verified, self_assessment, time_spent, evidence_count, created_at'
    );

  if (typeof args.category === 'string') {
    query = query.eq('category', args.category);
  }
  if (typeof args.status === 'string') {
    query = query.eq('status', args.status);
  }

  const limit = typeof args.limit === 'number' && args.limit > 0 ? Math.min(args.limit, 50) : 20;
  query = query.order('created_at', { ascending: false }).limit(limit);

  const { data, error } = await query;
  if (error) throw new Error(`Failed to read portfolio evidence: ${error.message}`);

  return { evidence: data || [] };
}

export async function addPortfolioEvidence(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.title !== 'string' || args.title.trim().length === 0) {
    throw new Error('Evidence title is required');
  }
  if (typeof args.category !== 'string' || args.category.trim().length === 0) {
    throw new Error(
      'Category is required (e.g. Health & Safety, Installation Practice, Testing & Inspection)'
    );
  }

  const supabase = user.supabase;

  const { data, error } = await supabase
    .from('portfolio_items')
    .insert({
      user_id: user.userId,
      title: args.title.trim(),
      description: typeof args.description === 'string' ? args.description.trim() : null,
      category: args.category.trim(),
      file_url: typeof args.file_url === 'string' ? args.file_url : null,
      file_type: typeof args.file_type === 'string' ? args.file_type : null,
      skills_demonstrated: Array.isArray(args.skills) ? args.skills : [],
      reflection_notes: typeof args.reflection === 'string' ? args.reflection.trim() : null,
      learning_outcomes_met: Array.isArray(args.learning_outcomes) ? args.learning_outcomes : [],
      assessment_criteria_met: Array.isArray(args.assessment_criteria)
        ? args.assessment_criteria
        : [],
      tags: Array.isArray(args.tags) ? args.tags : [],
      storage_urls: Array.isArray(args.photo_urls)
        ? args.photo_urls.map((url: unknown) => ({ url }))
        : null,
      status: 'draft',
      date_completed:
        typeof args.date_completed === 'string' ? args.date_completed : new Date().toISOString(),
      time_spent: typeof args.time_spent_minutes === 'number' ? args.time_spent_minutes : null,
    })
    .select('id, title, category, status')
    .single();

  if (error) throw new Error(`Failed to add portfolio evidence: ${error.message}`);

  return {
    evidence_id: data.id,
    title: data.title,
    category: data.category,
    status: data.status,
  };
}

export async function searchQualificationRequirements(
  args: Record<string, unknown>,
  user: UserContext
) {
  if (typeof args.query !== 'string' || args.query.trim().length === 0) {
    throw new Error('Search query is required');
  }

  const supabase = user.supabase;

  // Try the RPC first
  const { data, error } = await supabase.rpc('search_qualification_requirements', {
    p_keywords: args.query.trim().split(/\s+/),
    p_qualification_code:
      typeof args.qualification_code === 'string' ? args.qualification_code : null,
    p_unit_code: typeof args.unit_code === 'string' ? args.unit_code : null,
    p_limit: 20,
  });

  if (!error && data && data.length > 0) {
    return { requirements: data };
  }

  // Fallback: direct ilike search
  let query = supabase
    .from('qualification_requirements')
    .select('qualification_code, unit_code, unit_title, lo_number, lo_text, ac_code, ac_text');

  if (typeof args.qualification_code === 'string') {
    query = query.eq('qualification_code', args.qualification_code);
  }

  const searchTerm = args.query.trim().replace(/[,.()"'\\]/g, '');
  if (searchTerm.length > 0) {
    query = query.or(
      `ac_text.ilike.%${searchTerm}%,lo_text.ilike.%${searchTerm}%,unit_title.ilike.%${searchTerm}%`
    );
  }

  query = query.limit(20);

  const { data: fallbackData, error: fallbackError } = await query;
  if (fallbackError) throw new Error(`Failed to search requirements: ${fallbackError.message}`);

  return { requirements: fallbackData || [] };
}

export async function createEvidenceFromPhoto(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.photo_analysis_id !== 'string') {
    throw new Error('photo_analysis_id is required — analyse a photo first');
  }

  const supabase = user.supabase;

  // Fetch the photo analysis
  const { data: analysis, error: fetchError } = await supabase
    .from('photo_analyses')
    .select('id, analysis_type, analysis_result, observations, image_url, ai_description')
    .eq('id', args.photo_analysis_id)
    .eq('user_id', user.userId)
    .single();

  if (fetchError || !analysis) {
    throw new Error('Photo analysis not found — run analyse_photo first');
  }

  const result = analysis.analysis_result as Record<string, unknown> | null;
  const observations = Array.isArray(analysis.observations) ? analysis.observations : [];

  // Auto-extract skills from analysis type and observations
  const skills: string[] = [];
  if (analysis.analysis_type === 'consumer_unit') {
    skills.push('consumer unit identification');
    if (result?.rcd_config) skills.push('RCD configuration');
    if (result?.spd_present) skills.push('SPD identification');
  } else if (analysis.analysis_type === 'installation') {
    skills.push('installation practice');
    for (const obs of observations) {
      const obsObj = obs as Record<string, unknown>;
      const desc = (obsObj.description as string) || '';
      if (desc.toLowerCase().includes('containment')) skills.push('containment routing');
      if (desc.toLowerCase().includes('earthing') || desc.toLowerCase().includes('bonding'))
        skills.push('earthing and bonding');
      if (desc.toLowerCase().includes('cable')) skills.push('cable management');
      if (desc.toLowerCase().includes('label')) skills.push('circuit labelling');
    }
  }
  // Add user-provided skills
  if (Array.isArray(args.skills)) {
    for (const s of args.skills) {
      if (typeof s === 'string' && !skills.includes(s)) skills.push(s);
    }
  }

  // Search for matching qualification ACs/LOs
  let matchedAcs: string[] = [];
  let matchedLos: string[] = [];
  if (skills.length > 0) {
    const { data: reqData } = await supabase.rpc('search_qualification_requirements', {
      p_keywords: skills.slice(0, 5),
      p_qualification_code: null,
      p_unit_code: null,
      p_limit: 10,
    });

    if (reqData && reqData.length > 0) {
      matchedAcs = reqData
        .filter((r: Record<string, unknown>) => r.ac_text)
        .map((r: Record<string, unknown>) => r.ac_text as string)
        .slice(0, 5);
      matchedLos = reqData
        .filter((r: Record<string, unknown>) => r.lo_text)
        .map((r: Record<string, unknown>) => r.lo_text as string)
        .slice(0, 5);
    }
  }

  const title =
    typeof args.title === 'string' && args.title.trim().length > 0
      ? args.title.trim()
      : analysis.ai_description || `Photo evidence: ${analysis.analysis_type}`;

  const category =
    typeof args.category === 'string' && args.category.trim().length > 0
      ? args.category.trim()
      : analysis.analysis_type === 'consumer_unit'
        ? 'Testing & Inspection'
        : 'Installation Practice';

  const { data, error } = await supabase
    .from('portfolio_items')
    .insert({
      user_id: user.userId,
      title,
      description: analysis.ai_description || 'Photo evidence from site',
      category,
      file_url: analysis.image_url,
      file_type: 'image',
      skills_demonstrated: skills,
      reflection_notes: typeof args.reflection === 'string' ? args.reflection.trim() : null,
      learning_outcomes_met: matchedLos,
      assessment_criteria_met: matchedAcs,
      storage_urls: [{ url: analysis.image_url }],
      status: 'draft',
      date_completed: new Date().toISOString(),
    })
    .select('id, title, category, status')
    .single();

  if (error) throw new Error(`Failed to create portfolio evidence: ${error.message}`);

  // Link photo analysis to portfolio
  await supabase
    .from('photo_analyses')
    .update({ linked_portfolio_id: data.id })
    .eq('id', args.photo_analysis_id);

  // Create evidence file link
  await supabase.from('portfolio_evidence_files').insert({
    portfolio_item_id: data.id,
    file_url: analysis.image_url,
    file_type: 'image',
    description: analysis.ai_description || 'Photo evidence',
  });

  return {
    evidence_id: data.id,
    title: data.title,
    category: data.category,
    status: data.status,
    skills_demonstrated: skills,
    matched_acs: matchedAcs.length,
    matched_los: matchedLos.length,
    message:
      matchedAcs.length > 0
        ? `Created portfolio evidence with ${matchedAcs.length} ACs and ${matchedLos.length} LOs auto-matched. Review and submit when ready.`
        : 'Created portfolio evidence. Use search_qualification_requirements to find matching ACs/LOs.',
  };
}

export async function submitPortfolioForReview(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.evidence_id !== 'string') {
    throw new Error('evidence_id is required');
  }

  const supabase = user.supabase;

  // Update status to submitted
  const { error } = await supabase
    .from('portfolio_items')
    .update({ status: 'submitted' })
    .eq('id', args.evidence_id)
    .eq('user_id', user.userId);

  if (error) throw new Error(`Failed to submit for review: ${error.message}`);

  return { success: true, status: 'submitted' };
}

export async function validateEvidence(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.evidence_id !== 'string') {
    throw new Error('evidence_id is required');
  }

  const supabase = user.supabase;

  // Read the evidence entry
  const { data: entry, error } = await supabase
    .from('portfolio_items')
    .select(
      'id, title, description, category, skills_demonstrated, learning_outcomes_met, assessment_criteria_met, reflection_notes, file_url, storage_urls'
    )
    .eq('id', args.evidence_id)
    .eq('user_id', user.userId)
    .single();

  if (error || !entry) throw new Error('Evidence entry not found');

  // Basic validation checks
  const issues: string[] = [];
  const strengths: string[] = [];

  if (!entry.description || (entry.description as string).length < 20) {
    issues.push('Description is too short — explain what work was done, how, and why');
  } else {
    strengths.push('Has a description of the work');
  }

  if (!entry.reflection_notes) {
    issues.push('No reflection notes — add what you learned and what you would do differently');
  } else {
    strengths.push('Includes reflection notes');
  }

  const acs = (entry.assessment_criteria_met as string[]) || [];
  const los = (entry.learning_outcomes_met as string[]) || [];

  if (acs.length === 0) {
    issues.push(
      'No assessment criteria linked — use search_qualification_requirements to find matching ACs'
    );
  } else {
    strengths.push(`${acs.length} assessment criteria linked`);
  }

  if (los.length === 0) {
    issues.push('No learning outcomes linked');
  } else {
    strengths.push(`${los.length} learning outcomes linked`);
  }

  if (!entry.file_url && (!entry.storage_urls || (entry.storage_urls as unknown[]).length === 0)) {
    issues.push('No photo or file evidence attached');
  } else {
    strengths.push('Has photo/file evidence');
  }

  const skills = (entry.skills_demonstrated as string[]) || [];
  if (skills.length === 0) {
    issues.push('No skills demonstrated listed');
  } else {
    strengths.push(`${skills.length} skills demonstrated`);
  }

  const score = Math.round((strengths.length / (strengths.length + issues.length)) * 100);

  return {
    evidence_id: entry.id,
    title: entry.title,
    quality_score: score,
    strengths,
    issues,
    ready_for_submission: issues.length === 0,
    recommendation:
      issues.length === 0
        ? 'This evidence looks ready for submission.'
        : `Fix ${issues.length} issue${issues.length > 1 ? 's' : ''} before submitting.`,
  };
}

export async function runEpaSimulator(args: Record<string, unknown>, user: UserContext) {
  if (args.mode !== 'knowledge_test' && args.mode !== 'professional_discussion') {
    throw new Error('mode must be "knowledge_test" or "professional_discussion"');
  }

  // Knowledge test — call edge function directly (no portfolio needed)
  if (args.mode === 'knowledge_test') {
    const result = await callEdgeFunction('epa-knowledge-quiz', user.jwt, {
      topic: typeof args.topic === 'string' ? args.topic : undefined,
    });
    if (result.error) throw new Error(result.error);
    return {
      ...((result.data as Record<string, unknown>) || {}),
      disclaimer: 'This is a PRACTICE session — not a real assessment.',
    };
  }

  // Professional discussion — read portfolio first, then generate questions
  const supabase = user.supabase;

  // Fetch portfolio entries (same as app: up to 15, most recent first)
  const { data: portfolioItems } = await supabase
    .from('portfolio_items')
    .select(
      'id, title, description, skills_demonstrated, assessment_criteria_met, learning_outcomes_met, category, status'
    )
    .order('created_at', { ascending: false })
    .limit(15);

  const portfolioEntries = (portfolioItems || []).map((e: Record<string, unknown>) => ({
    title: e.title,
    description:
      typeof e.description === 'string' ? (e.description as string).substring(0, 150) : '',
    skills: e.skills_demonstrated || [],
    assessment_criteria: e.assessment_criteria_met || [],
    learning_outcomes: e.learning_outcomes_met || [],
    category: e.category,
  }));

  if (portfolioEntries.length === 0) {
    return {
      error:
        'No portfolio entries found. Add some evidence to your portfolio first before running an EPA mock.',
      disclaimer: 'This is a PRACTICE session — not a real assessment.',
    };
  }

  // Determine qualification code (default to EL2 if not specified)
  const qualificationCode =
    typeof args.qualification_code === 'string' ? args.qualification_code : 'EL2';

  const result = await callEdgeFunction(
    'epa-professional-discussion',
    user.jwt,
    {
      action: 'generate',
      portfolio_entries: portfolioEntries,
      qualification_code: qualificationCode,
      topic: typeof args.topic === 'string' ? args.topic : undefined,
    },
    { timeoutMs: 90_000 }
  );

  if (result.error) throw new Error(result.error);

  return {
    ...((result.data as Record<string, unknown>) || {}),
    portfolio_entries_used: portfolioEntries.length,
    disclaimer: 'This is a PRACTICE session — not a real assessment.',
  };
}

export async function scoreEpaResponse(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.question !== 'object' || args.question === null) {
    throw new Error('question object is required (from run_epa_simulator results)');
  }
  if (typeof args.response !== 'string' || args.response.trim().length === 0) {
    throw new Error('response text is required');
  }

  const qualificationCode =
    typeof args.qualification_code === 'string' ? args.qualification_code : 'EL2';

  const result = await callEdgeFunction(
    'epa-professional-discussion',
    user.jwt,
    {
      action: 'score',
      question: args.question,
      response: args.response.trim(),
      qualification_code: qualificationCode,
    },
    { timeoutMs: 60_000 }
  );

  if (result.error) throw new Error(result.error);

  return {
    ...((result.data as Record<string, unknown>) || {}),
    disclaimer: 'This is a PRACTICE session — not a real assessment.',
  };
}

export async function logMoodCheckin(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.mood !== 'number' || args.mood < 1 || args.mood > 10) {
    throw new Error('Mood must be a number between 1 and 10');
  }

  const supabase = user.supabase;

  // SECURITY.md §17 — Mood data is highest sensitivity
  const { data, error } = await supabase
    .from('mood_checkins')
    .insert({
      user_id: user.userId,
      mood: Math.round(args.mood),
      notes: typeof args.notes === 'string' ? args.notes : null,
    })
    .select('id')
    .single();

  if (error) throw new Error(`Failed to log mood check-in: ${error.message}`);

  return { checkin_id: data.id, logged: true };
}

export async function getWellbeingResources(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;

  let query = supabase
    .from('wellbeing_resources')
    .select('id, title, description, category, url, is_crisis');

  if (typeof args.category === 'string') {
    query = query.eq('category', args.category);
  }

  // Always show crisis resources first
  query = query.order('is_crisis', { ascending: false });

  const { data, error } = await query;
  if (error) throw new Error(`Failed to get wellbeing resources: ${error.message}`);

  return { resources: data || [] };
}

export async function getSafetyScenarios(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;

  let query = supabase
    .from('safety_scenarios')
    .select('id, title, description, topic, difficulty, scenario_data');

  if (typeof args.topic === 'string') {
    query = query.eq('topic', args.topic);
  }

  query = query.limit(5);

  const { data, error } = await query;
  if (error) throw new Error(`Failed to get safety scenarios: ${error.message}`);

  return { scenarios: data || [] };
}

export async function getCareerPathways(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;

  let query = supabase
    .from('career_pathways')
    .select('id, title, level, salary_range, requirements, progression_options');

  if (typeof args.current_level === 'string') {
    query = query.eq('current_level', args.current_level);
  }

  const { data, error } = await query;
  if (error) throw new Error(`Failed to get career pathways: ${error.message}`);

  return { pathways: data || [] };
}

export async function getApprenticeRights(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;

  let query = supabase.from('apprentice_rights').select('id, topic, content, source_url');

  if (typeof args.topic === 'string' && args.topic.length > 0) {
    query = query.ilike('topic', `%${args.topic}%`);
  }

  const { data, error } = await query;
  if (error) throw new Error(`Failed to get apprentice rights: ${error.message}`);

  return { rights: data || [] };
}

export async function searchLearningVideos(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.query !== 'string' || args.query.trim().length === 0) {
    throw new Error('Search query is required');
  }

  const supabase = user.supabase;

  let query = supabase
    .from('learning_videos')
    .select('id, title, description, url, topic, duration_minutes, thumbnail_url');

  if (typeof args.topic === 'string') {
    query = query.eq('topic', args.topic);
  }

  // Sanitise to prevent PostgREST filter injection via .or() syntax
  const searchTerm = String(args.query)
    .trim()
    .replace(/[,.()"'\\]/g, '');
  if (searchTerm.length > 0) {
    query = query.or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
  }
  query = query.limit(10);

  const { data, error } = await query;
  if (error) throw new Error(`Failed to search learning videos: ${error.message}`);

  return { videos: data || [] };
}

export async function searchTrainingProviders(args: Record<string, unknown>, user: UserContext) {
  const result = await callEdgeFunction('find-training-providers', user.jwt, {
    postcode: typeof args.postcode === 'string' ? args.postcode : undefined,
    course_type: typeof args.course_type === 'string' ? args.course_type : undefined,
    radius_miles:
      typeof args.radius_miles === 'number' && args.radius_miles > 0 ? args.radius_miles : 25,
  });

  if (result.error) throw new Error(result.error);
  return result.data;
}
