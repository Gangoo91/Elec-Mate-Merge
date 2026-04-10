/**
 * Tool call router.
 * Dispatches MCP tool calls to the correct handler module.
 */

import type { UserContext } from '../auth.js';

import * as clients from './clients.js';
import * as quoting from './quoting.js';
import * as jobs from './jobs.js';
import * as projects from './projects.js';
import * as certificates from './certificates.js';
import * as invoicing from './invoicing.js';
import * as rams from './rams.js';
import * as calendar from './calendar.js';
import * as messaging from './messaging.js';
import * as expenses from './expenses.js';
import * as knowledge from './knowledge.js';
import * as elecId from './elec-id.js';
import * as agentInternals from './agent-internals.js';
import * as documents from './documents.js';
import * as email from './email.js';
import * as apprentice from './apprentice.js';
import * as study from './study.js';
import * as tasks from './tasks.js';
import * as analytics from './analytics.js';
import * as marketplace from './marketplace.js';
import * as safety from './safety.js';
import * as vision from './vision.js';
import * as routing from './routing.js';
import * as jobIntake from './job-intake.js';
import * as dayPlanner from './day-planner.js';
import * as jobProfit from './job-profit.js';
import * as snagging from './snagging.js';
import * as photoEstimate from './photo-estimate.js';
import * as googleApis from './google-apis.js';
import * as automation from './automation.js';
import * as integrations from './integrations.js';
import * as smartFeatures from './smart-features.js';
import * as businessHealth from './business-health.js';
import * as clientIntelligence from './client-intelligence.js';
import * as marketing from './marketing.js';
import * as smartScheduling from './smart-scheduling.js';
import * as portfolio from './portfolio.js';
import * as businessIntelligence from './business-intelligence.js';
import * as tutorQuiz from './tutor-quiz.js';
import * as studyBuddy from './study-buddy.js';

/** Handler function signature — every tool handler takes args + user context */
export type ToolHandler = (args: Record<string, unknown>, user: UserContext) => Promise<unknown>;

/** Map of tool name → handler function */
const handlers: Record<string, ToolHandler> = {
  // Clients
  read_clients: clients.readClients,
  create_client: clients.createClient,
  update_client: clients.updateClient,
  generate_client_portal_link: clients.generateClientPortalLink,

  // Quoting
  read_quotes: quoting.readQuotes,
  create_quote: quoting.generateQuote,
  update_quote: quoting.updateQuote,
  create_quote_pdf: quoting.generateQuotePdf,
  send_quote: quoting.sendQuote,
  set_quote_auto_followup: quoting.setQuoteAutoFollowup,
  track_quote_email: quoting.trackQuoteEmail,

  // Jobs (legacy — kept for backwards compat)
  read_jobs: jobs.readJobs,
  create_job: jobs.createJob,
  update_job: jobs.updateJob,

  // Projects (spark_projects — groups tasks)
  read_projects: projects.readProjects,
  create_project: projects.createProject,
  update_project: projects.updateProject,
  complete_project: projects.completeProject,

  // Certificates
  read_certificates: certificates.readCertificates,
  generate_certificate_pdf: certificates.generateCertificatePdf,
  send_certificate: certificates.sendCertificate,
  get_expiring_certificates: certificates.getExpiringCertificates,
  send_client_expiry_reminders: certificates.sendClientExpiryReminders,
  create_eicr: certificates.createEicr,
  update_eicr: certificates.updateEicr,
  read_eicr: certificates.readEicr,

  // Invoicing
  read_invoices: invoicing.readInvoices,
  create_invoice: invoicing.createInvoice,
  update_invoice: invoicing.updateInvoice,
  generate_invoice_pdf: invoicing.generateInvoicePdf,
  send_invoice: invoicing.sendInvoice,
  get_overdue_invoices: invoicing.getOverdueInvoices,

  // RAMS & Compliance
  read_rams: rams.readRams,
  create_rams: rams.createRams,
  generate_rams_pdf: rams.generateRamsPdf,
  generate_method_statement: rams.generateMethodStatement,
  submit_part_p_notification: rams.submitPartPNotification,

  // Calendar
  read_calendar: calendar.readCalendar,
  create_calendar_event: calendar.createCalendarEvent,
  update_calendar_event: calendar.updateCalendarEvent,
  delete_calendar_event: calendar.deleteCalendarEvent,
  get_availability: calendar.getAvailability,
  share_booking_link: calendar.shareBookingLink,

  // Messaging
  draft_message: messaging.draftMessage,
  send_approved_message: messaging.sendApprovedMessage,

  // Expenses
  read_expenses: expenses.readExpenses,
  create_expense: expenses.createExpense,
  log_mileage: expenses.logMileage,
  sync_expense_to_accounting: expenses.syncExpenseToAccounting,
  add_receipt_to_expense: expenses.addReceiptToExpense,

  // RAG Knowledge
  lookup_regulation: knowledge.lookupRegulation,
  lookup_practical_method: knowledge.lookupPracticalMethod,
  lookup_health_safety: knowledge.lookupHealthSafety,
  lookup_pricing_guidance: knowledge.lookupPricingGuidance,
  lookup_design_guidance: knowledge.lookupDesignGuidance,
  lookup_training_content: knowledge.lookupTrainingContent,

  // Elec-ID
  read_elec_id: elecId.readElecId,
  share_elec_id: elecId.shareElecId,

  // Agent Internals
  read_memory: agentInternals.readMemory,
  write_memory: agentInternals.writeMemory,
  delete_memory: agentInternals.deleteMemory,
  log_activity: agentInternals.logActivity,
  read_activity_log: agentInternals.readActivityLog,
  get_usage_summary: agentInternals.getUsageSummary,

  // Documents
  generate_briefing_pdf: documents.generateBriefingPdf,
  generate_shareable_link: documents.generateShareableLink,

  // Email
  connect_email: email.connectEmail,
  read_inbox: email.readInbox,
  categorise_enquiry: email.categoriseEnquiry,
  draft_email_reply: email.draftEmailReply,
  send_email_reply: email.sendEmailReply,

  // Tasks
  read_tasks: tasks.readTasks,
  create_task: tasks.createTask,
  update_task: tasks.updateTask,
  complete_task: tasks.completeTask,
  snooze_task: tasks.snoozeTask,
  delete_task: tasks.deleteTask,

  // Quoting — receipt scanner
  add_receipt_to_quote: quoting.addReceiptToQuote,

  // Invoicing — receipt scanner
  add_receipt_to_invoice: invoicing.addReceiptToInvoice,

  // Apprentice tools — portfolio
  read_portfolio_evidence: apprentice.readPortfolioEvidence,
  add_portfolio_evidence: apprentice.addPortfolioEvidence,
  search_qualification_requirements: apprentice.searchQualificationRequirements,
  create_evidence_from_photo: apprentice.createEvidenceFromPhoto,

  // Study tools (shared — all roles)
  search_study_content: study.searchStudyContent,
  generate_practice_questions: study.generatePracticeQuestions,
  get_flashcards: study.getFlashcards,
  get_exam_results: study.getExamResults,
  get_toolbox_guides: study.getToolboxGuides,
  run_am2_simulator: study.runAm2Simulator,
  save_quiz_result: study.saveQuizResult,
  get_quiz_history: study.getQuizHistory,

  // Apprentice tools — portfolio, learning, EPA, wellbeing
  get_learning_progress: apprentice.getLearningProgress,
  log_ojt_hours: apprentice.logOjtHours,
  log_site_diary: apprentice.logSiteDiary,
  get_site_diary_coaching: apprentice.getSiteDiaryCoaching,
  get_portfolio_status: apprentice.getPortfolioStatus,
  submit_portfolio_for_review: apprentice.submitPortfolioForReview,
  validate_evidence: apprentice.validateEvidence,
  run_epa_simulator: apprentice.runEpaSimulator,
  score_epa_response: apprentice.scoreEpaResponse,
  log_mood_checkin: apprentice.logMoodCheckin,
  get_wellbeing_resources: apprentice.getWellbeingResources,
  get_safety_scenarios: apprentice.getSafetyScenarios,
  get_career_pathways: apprentice.getCareerPathways,
  get_apprentice_rights: apprentice.getApprenticeRights,
  search_learning_videos: apprentice.searchLearningVideos,
  search_training_providers: apprentice.searchTrainingProviders,

  // Analytics (business intelligence)
  get_revenue_summary: analytics.getRevenueSummary,
  get_outstanding_payments: analytics.getOutstandingPayments,
  get_business_snapshot: analytics.getBusinessSnapshot,
  get_top_clients: analytics.getTopClients,
  get_inactive_clients: analytics.getInactiveClients,
  get_quote_analytics: analytics.getQuoteAnalytics,
  get_pricing_analysis: analytics.getPricingAnalysis,
  get_revenue_forecast: analytics.getRevenueForecast,
  get_seasonal_trends: analytics.getSeasonalTrends,
  get_client_lifetime_value: analytics.getClientLifetimeValue,
  get_profitability_analysis: analytics.getProfitabilityAnalysis,
  get_cash_flow_forecast: analytics.getCashFlowForecast,
  get_at_risk_alerts: analytics.getAtRiskAlerts,

  // Projects — linking
  link_to_project: projects.linkToProject,
  get_project_summary: projects.getProjectSummary,
  unlink_from_project: projects.unlinkFromProject,

  // Marketplace
  search_products: marketplace.searchProducts,
  compare_prices: marketplace.comparePrices,
  price_materials_for_job: marketplace.priceMaterialsForJob,
  get_deals: marketplace.getDeals,

  // Safety
  get_safety_templates: safety.getSafetyTemplates,
  create_safe_isolation_record: safety.createSafeIsolationRecord,
  read_safe_isolation_records: safety.readSafeIsolationRecords,
  log_site_diary_entry: safety.logSiteDiaryEntry,
  read_site_diary: safety.readSiteDiary,

  // Vision
  analyse_photo: vision.analysePhoto,
  attach_photo_to_entity: vision.attachPhotoToEntity,
  get_entity_photos: vision.getEntityPhotos,

  // Routing
  get_route_to_job: routing.getRouteToJob,

  // Job Intake (ELE-209)
  create_job_intake: jobIntake.createJobIntake,

  // EIC Certificates
  create_eic: certificates.createEic,
  update_eic: certificates.updateEic,
  read_eic: certificates.readEic,

  // Minor Works Certificates
  create_minor_works: certificates.createMinorWorks,
  update_minor_works: certificates.updateMinorWorks,
  read_minor_works: certificates.readMinorWorks,

  // Day Planner
  plan_my_day: dayPlanner.planMyDay,

  // Job Profit
  calculate_job_profit: jobProfit.calculateJobProfit,

  // Snagging
  create_snag: snagging.createSnag,
  read_snags: snagging.readSnags,
  resolve_snag: snagging.resolveSnag,
  generate_snagging_list: snagging.generateSnaggingList,

  // Photo Estimate
  estimate_from_photo: photoEstimate.estimateFromPhoto,

  // Google APIs (Solar, Geocoding, Address Validation, Maps, YouTube, Weather)
  analyse_solar_roof: googleApis.analyseSolarRoof,
  geocode_address: googleApis.geocodeAddress,
  validate_address: googleApis.validateAddress,
  generate_map_image: googleApis.generateMapImage,
  search_youtube_videos: googleApis.searchYoutubeVideos,
  get_weather: googleApis.getWeather,

  // Automation (proactive business intelligence)
  send_payment_reminder: automation.sendPaymentReminder,
  get_job_weather: automation.getJobWeather,
  suggest_upsell: automation.suggestUpsell,
  transcribe_voice_note: automation.transcribeVoiceNote,
  delete_client: automation.deleteClient,

  // Integrations (ElevenLabs, Perplexity, PDF)
  speak_response: integrations.speakResponse,
  web_search: integrations.webSearch,
  read_pdf: integrations.readPdf,

  // Smart Features (completion workflow, pricing, templates)
  get_completion_checklist: smartFeatures.getCompletionChecklist,
  get_pricing_suggestions: smartFeatures.getPricingSuggestions,
  create_project_from_template: smartFeatures.createProjectFromTemplate,

  // Business Health
  get_business_health_score: businessHealth.getBusinessHealthScore,
  get_weekly_summary: businessHealth.getWeeklySummary,
  get_tax_estimate: businessHealth.getTaxEstimate,

  // Client Intelligence
  get_client_insights: clientIntelligence.getClientInsights,
  get_client_milestones: clientIntelligence.getClientMilestones,

  // Marketing
  get_marketing_plan: marketing.getMarketingPlan,
  get_social_media_post: marketing.getSocialMediaPost,
  get_google_review_request: marketing.getGoogleReviewRequest,
  get_client_win_back: marketing.getClientWinBack,
  get_seasonal_campaigns: marketing.getSeasonalCampaigns,

  // Smart Scheduling
  schedule_jobs: smartScheduling.scheduleJobs,
  get_end_of_day_summary: smartScheduling.getEndOfDaySummary,
  get_competitor_pricing: smartScheduling.getCompetitorPricing,

  // Portfolio
  create_portfolio_page: portfolio.createPortfolioPage,

  // Business Intelligence (learns from patterns)
  get_my_pricing: businessIntelligence.getMyPricing,
  get_predicted_workload: businessIntelligence.getPredictedWorkload,
  spot_missed_revenue: businessIntelligence.spotMissedRevenue,
  analyse_spec_sheet: businessIntelligence.analyseSpecSheet,

  // Tutor Quiz Builder
  create_quiz: tutorQuiz.createQuiz,
  add_questions_to_quiz: tutorQuiz.addQuestionsToQuiz,
  generate_quiz_questions: tutorQuiz.generateQuizQuestions,
  publish_quiz: tutorQuiz.publishQuiz,
  get_quiz_submissions: tutorQuiz.getQuizSubmissions,
  get_cohort_quiz_analytics: tutorQuiz.getCohortQuizAnalytics,

  // WhatsApp Study Buddy
  quiz_me: studyBuddy.quizMe,
  explain_topic: studyBuddy.explainTopic,
  get_my_study_stats: studyBuddy.getMyStudyStats,
  get_study_plan: studyBuddy.getStudyPlan,
  daily_challenge: studyBuddy.dailyChallenge,
};

/**
 * Get the handler for a given tool name.
 */
export function getHandler(toolName: string): ToolHandler | undefined {
  return handlers[toolName];
}
