# TOOLS.md — Complete Tool Reference

## How to Call Tools

Use the exec tool to run:
```
./bin/mcp-call <tool_name> key=value key2=value2
```
For JSON args (arrays/objects), use the exec tool with curl directly:
```
curl -s -X POST http://127.0.0.1:3100/api/tool-call -H "Content-Type: application/json" -H "X-API-Key: ${MCP_API_KEY}" -d '{"tool":"<tool_name>","arguments":{...},"sender_phone":"${MCP_SENDER_PHONE}"}'
```

## Sending Files & Media

PDFs/images: put on its own line:
MEDIA:<downloadUrl>
Always use MEDIA: for PDFs. Never paste raw URLs as text.

Voice notes: put BOTH lines (tag first):
[[audio_as_voice]]
MEDIA:<audio_url>

## Tools by Category

Clients: read_clients, create_client, update_client, generate_client_portal_link, delete_client
- create_client takes: { name (REQUIRED), email?, phone?, address?, type?, notes? }
- ⚠ Do NOT call create_client without a name. If you don't have a name, ask the user first.
- delete_client takes: { client_id, confirm_name } (safety gate — must type exact name)

Quoting: read_quotes, create_quote, update_quote, create_quote_pdf, send_quote, set_quote_auto_followup, track_quote_email, add_receipt_to_quote
- create_quote takes: { client_data: { name (REQUIRED), phone?, email?, address? }, items: [{ description, quantity, unitPrice, category? }] (REQUIRED, ≥1 item), valid_days?, notes? }
- ⚠ Do NOT call create_quote until you have:
  1. The client name confirmed by the user, AND
  2. At least one line item with a real unit price (not £0).
  If anything is missing, ASK the user — one question at a time on WhatsApp. If they gave you a vague brief like "quote for a CU upgrade", call lookup_pricing_guidance first, propose an itemised draft back to them, and only call create_quote once they confirm.
- update_quote requires { quote_id (from a prior read_quotes or create_quote), AND at least one of: client_data, job_details, items, notes, expiry_date, status }. ⚠ Never invent a quote_id — if you don't have one, call read_quotes first.

Invoicing: read_invoices, create_invoice, update_invoice, generate_invoice_pdf, send_invoice, get_overdue_invoices, add_receipt_to_invoice
- create_invoice takes: { client_data: { name (REQUIRED), phone?, email?, address? }, items: [{ description, quantity, unitPrice, category? }] (REQUIRED, ≥1 item), vat_registered?, notes? }
- ⚠ Same rules as create_quote — do not call without name + items with real prices.

Jobs: read_jobs, create_job, update_job
Projects: read_projects, create_project, update_project, complete_project, link_to_project, get_project_summary, unlink_from_project

Certificates: read_certificates, generate_certificate_pdf, send_certificate, get_expiring_certificates, send_client_expiry_reminders
- EICR: create_eicr, update_eicr, read_eicr
- EIC: create_eic, update_eic, read_eic
- Minor Works: create_minor_works, update_minor_works, read_minor_works

RAMS: read_rams, create_rams, generate_rams_pdf, generate_method_statement, submit_part_p_notification

Calendar: read_calendar, create_calendar_event, update_calendar_event, delete_calendar_event, get_availability, share_booking_link
- create_calendar_event REQUIRES: { title, date (ISO YYYY-MM-DD), time (HH:mm), duration_minutes (positive number) }
- ⚠ If user says "book me a job tomorrow", that's not enough — ask for title, time, and how long it'll take before calling.

Tasks: read_tasks, create_task, update_task, complete_task, snooze_task, delete_task

Messaging: draft_message, send_approved_message

Expenses: read_expenses, create_expense, log_mileage, sync_expense_to_accounting, add_receipt_to_expense

Email: connect_email, read_inbox, categorise_enquiry, draft_email_reply, send_email_reply

Knowledge (RAG): lookup_regulation, lookup_practical_method, lookup_health_safety, lookup_pricing_guidance, lookup_design_guidance, lookup_training_content
- lookup_regulation queries the BS 7671:2018+A4:2026 facets table (the CURRENT 18th Edition Amendment 4, plus GN3 9th Ed A4 and OSG 9th Ed A4).
- Args: { query, document_types? (array, optional, any of: "bs7671","gn3","osg"), match_count? }
- ⚠ MANDATORY for ANY electrical question — regulations, disconnection times, IR/RCD test values, AFDD requirements, earthing, zones (e.g. bathrooms 0/1/2), cable sizing, special locations, certification fields.
- Never invent a regulation number from training data. Always cite the reg_number returned by this tool, and quote the actual content text.
- For practical install / OSG-style how-to questions, pass document_types=["osg","gn3"]. For test/inspection guidance, pass document_types=["gn3","bs7671"].
- ⚠ Query phrasing: the search is BM25-keyword-heavy. Short, term-rich queries work best ("AFDD socket circuit", "maximum disconnection time", "TN-S earthing"). AVOID long sentences with stop-words ("what is the disconnection time for a TN-S 230V final circuit"). If a query returns 0 results, retry with the 2-3 strongest keywords before telling the user "not found".

Elec-ID: read_elec_id, share_elec_id

Agent Memory: read_memory, write_memory, delete_memory, log_activity, read_activity_log, get_usage_summary

Documents: generate_briefing_pdf, generate_shareable_link

Analytics: get_revenue_summary, get_outstanding_payments, get_business_snapshot, get_top_clients, get_inactive_clients, get_quote_analytics, get_pricing_analysis, get_revenue_forecast, get_seasonal_trends, get_client_lifetime_value, get_profitability_analysis, get_cash_flow_forecast, get_at_risk_alerts

Marketplace: search_products, compare_prices, price_materials_for_job, get_deals

Safety: get_safety_templates, create_safe_isolation_record, read_safe_isolation_records, log_site_diary_entry, read_site_diary

Vision: analyse_photo, attach_photo_to_entity, get_entity_photos

Routing: get_route_to_job

Job Intake: create_job_intake (auto-generates project + tasks from job description)

Day Planner: plan_my_day (checks calendar, jobs, tasks, weather, returns optimised schedule)

Job Profit: calculate_job_profit

Snagging: create_snag, read_snags, resolve_snag, generate_snagging_list

Photo Estimate: estimate_from_photo (photo of job site -> instant rough quote)

Google APIs:
- analyse_solar_roof — solar potential analysis for an address
- geocode_address — address to lat/lng or reverse
- validate_address — standardise and validate UK addresses
- generate_map_image — static map with markers, send via MEDIA:<url>
- search_youtube_videos — find trade videos (how-to, product reviews, training)
- get_weather — current conditions + 3-day forecast

Automation:
- send_payment_reminder — friendly pre-due invoice reminder
- get_job_weather — weather for a job postcode
- suggest_upsell — analyse client history for upsell opportunities
- transcribe_voice_note — convert received audio to text via Whisper

## NEW: Web Search (Perplexity - live internet)
- Tool: web_search
- Use for ANY question about current info: prices, regulation updates, product specs, news, competitor info
- Args: query (string), focus (web or news)
- Returns: grounded answer with citations from real web pages
- Example: web_search query="current price of 6mm T+E cable UK" focus=web

## NEW: Voice Notes (ElevenLabs TTS)
- Tool: speak_response
- Converts text to audio. Returns audio_url.
- Args: text (string, max 2500 chars), voice_id (optional)
- Voice: Daniel (British male, natural pacing)
- To send as WhatsApp voice note, reply with BOTH lines:
  [[audio_as_voice]]
  MEDIA:<audio_url>
- Use for: morning briefs, summaries, alerts, or when user says "speak", "voice note", "tell me"
- YOU CAN DO THIS. Do NOT say you cannot send voice notes.

## NEW: PDF Reading
- Tool: read_pdf
- Extracts text from any PDF URL or base64 data
- Args: pdf_url (string) or pdf_base64 (string)
- Use when client sends a spec sheet, planning doc, compliance report
- For scanned/image PDFs: use analyse_photo instead

## NEW: YouTube Video Search
- Tool: search_youtube_videos
- Args: query (string), max_results (number, default 5)
- Auto-prepends "electrical" to queries
- Returns: video titles, descriptions, thumbnails, watch URLs
- Use for: finding how-to guides, product reviews, training videos

## Apprentice & Study Tools
Portfolio: read_portfolio_evidence, add_portfolio_evidence, search_qualification_requirements, create_evidence_from_photo, get_portfolio_status, submit_portfolio_for_review, validate_evidence
Learning: get_learning_progress, log_ojt_hours, log_site_diary, get_site_diary_coaching, search_learning_videos, search_training_providers
Study: search_study_content, generate_practice_questions, get_flashcards, get_exam_results, get_toolbox_guides, run_am2_simulator, save_quiz_result, get_quiz_history
EPA: run_epa_simulator, score_epa_response
Wellbeing: log_mood_checkin, get_wellbeing_resources, get_safety_scenarios, get_career_pathways, get_apprentice_rights

## Important Rules
- Always use ./bin/mcp-call via the exec tool
- Never say you do not have access to a tool listed here — you DO
- If a tool call fails, READ the error message:
  - If it starts with `NEEDS_USER_INPUT:` — do NOT retry the tool. The error tells you exactly what to ask the user. Send the user that question (rephrased naturally) and wait for their reply.
  - If it starts with `NEEDS_QUOTE_ID:` (or similar `NEEDS_*`) — call the lookup tool the error suggests (e.g. read_quotes), then retry with the real id.
  - If it's a network / 5xx error — retry once. If it fails again, tell the user.
  - Never silently retry a tool that just failed with a missing-input error.
- For electrical / regulation questions: ALWAYS lookup_regulation FIRST, THEN compose your reply citing the reg_number returned. Do not answer from memory.
- For morning briefings: get_business_snapshot + read_calendar, then optionally speak_response for audio
- For quizzes: generate_practice_questions then save_quiz_result
- For projects: create_project then link_to_project
- For job enquiries: create_job_intake (auto-generates project + trade-specific tasks)
- For snagging: create_snag (photo optional), read_snags to list, resolve_snag to close
- For real-time info: ALWAYS use web_search instead of guessing
- For PDFs sent by users: use read_pdf to extract text
- For voice replies: use speak_response then [[audio_as_voice]] + MEDIA:
- For detailed tool docs: read SKILL_REFERENCE.md
