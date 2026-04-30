/**
 * Mate metric helpers — RAG tool list + per-tool time-saved estimates.
 * Shared between admin-mate-health and admin-mate-user so the metrics line up.
 *
 * The TIME_SAVED_MINUTES values are deliberately conservative real-world
 * estimates of "what would it take an electrician to do this themselves":
 * pulling regs from the book, drafting a marketing post, scheduling jobs
 * around weather + travel, etc. They're not meant to be precise — they're a
 * proxy that turns "tool calls" into a human number the user can feel.
 */

export const RAG_TOOL_NAMES = [
  'lookup_regulation',
  'lookup_practical_method',
  'lookup_health_safety',
  'lookup_pricing_guidance',
  'lookup_design_guidance',
  'lookup_training_content',
];

/** Minutes saved per successful tool call. Unknown tools default to DEFAULT_MINUTES. */
export const TIME_SAVED_MINUTES: Record<string, number> = {
  // Business intelligence
  get_business_health_score: 5,
  get_weekly_summary: 10,
  get_morning_brief: 15,
  get_end_of_day_summary: 10,
  get_tax_estimate: 30,
  spot_missed_revenue: 20,
  get_my_pricing: 10,
  get_pricing_suggestions: 15,
  get_predicted_workload: 10,
  job_profit: 10,

  // Client intelligence
  get_client_insights: 10,
  get_client_milestones: 5,
  get_client_win_back: 15,

  // Marketing
  get_marketing_plan: 30,
  get_social_media_post: 15,
  get_google_review_request: 5,
  get_seasonal_campaigns: 20,
  get_competitor_pricing: 15,

  // Scheduling + project ops
  schedule_jobs: 30,
  create_project_from_template: 20,
  get_completion_checklist: 10,
  day_planner: 20,
  routing: 5,

  // Portfolio
  create_portfolio_page: 15,

  // Tutor / quiz
  create_quiz: 25,
  add_questions_to_quiz: 5,
  generate_quiz_questions: 20,
  generate_exam_pdf: 30,
  get_cohort_quiz_analytics: 10,
  get_quiz_submissions: 5,
  publish_quiz: 5,

  // Apprentice
  quiz_me: 2,
  explain_topic: 5,
  get_my_study_stats: 2,
  get_study_plan: 10,
  daily_challenge: 2,

  // Voice + media
  transcribe_voice_note: 5,
  speak_response: 2,
  read_pdf: 10,
  analyse_spec_sheet: 15,
  web_search: 3,
  photo_estimate: 15,
  generate_map_image: 5,
  analyse_solar_roof: 20,
  geocode_address: 1,
  validate_address: 2,
  search_youtube_videos: 3,
  get_weather: 1,

  // Knowledge / RAG (saves reaching for the book)
  lookup_regulation: 10,
  lookup_practical_method: 15,
  lookup_health_safety: 15,
  lookup_pricing_guidance: 10,
  lookup_design_guidance: 15,
  lookup_training_content: 10,

  // Communication
  send_message: 2,
  send_quote: 5,
  send_invoice: 5,
  mark_paid: 2,

  // Snagging
  create_snag: 5,
  resolve_snag: 3,
  generate_snag_list: 15,
};

export const DEFAULT_MINUTES = 3;

export function minutesSavedFor(toolName: string | null | undefined): number {
  if (!toolName) return 0;
  return TIME_SAVED_MINUTES[toolName] ?? DEFAULT_MINUTES;
}
