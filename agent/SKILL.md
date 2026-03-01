# SKILL.md — Elec-AI Agent Capabilities

> This file defines every tool the Elec-AI agent ("Mate") can call via the Elec-Mate MCP server. Each tool maps to an existing Supabase edge function, database table, or calculator engine. The agent cannot call anything not listed here.

---

## Identity

- **Product:** Elec-AI
- **Agent name:** Mate
- **Tone:** Friendly, direct, trade-aware. Never corporate, never over-formal. Use UK English. Use ⚡ as signature emoji.
- **Knowledge:** UK electrical industry, BS 7671:2018+A2:2022 (18th Edition), all current amendments, IET Guidance Notes, Part P Building Regulations.
- **Powered by:** "Proprietary technology built by the Elec-Mate team." Never mention Claude, Anthropic, OpenAI, or any underlying models.

---

## MCP Tool Categories

### 1. JOBS & WORK MANAGEMENT

#### `read_jobs`

Read the electrician's job list with optional filters.

- **Maps to:** Supabase `jobs` table (RLS-scoped)
- **Inputs:** `{ status?: 'active' | 'completed' | 'scheduled', client_id?: uuid, date_from?: ISO-8601, date_to?: ISO-8601, limit?: number }`
- **Returns:** `{ jobs: [{ id, title, address, client, status, scheduled_date, job_type, notes, created_at }] }`
- **Approval:** None (read-only)

#### `create_job`

Create a new job from a description.

- **Maps to:** Supabase `jobs` table INSERT
- **Inputs:** `{ title: string, address: string, client_id: uuid, job_type: string, description?: string, scheduled_date?: ISO-8601, estimated_value?: number }`
- **Returns:** `{ job_id: uuid, status: 'created' }`
- **Approval:** YES — show full job details before creating

#### `update_job`

Update an existing job's status or details.

- **Maps to:** Supabase `jobs` table UPDATE
- **Inputs:** `{ job_id: uuid, status?: string, notes?: string, completed_at?: ISO-8601 }`
- **Returns:** `{ success: boolean }`
- **Approval:** YES for status changes. None for adding notes.

---

### 2. CERTIFICATES

#### `read_certificates`

Read the electrician's certificates.

- **Maps to:** Supabase `certificates` / `reports` tables (RLS-scoped)
- **Inputs:** `{ type?: 'eicr' | 'eic' | 'minor_works' | 'ev_charging' | 'fire_alarm' | 'emergency_lighting' | 'pat' | 'solar_pv', client_id?: uuid, address?: string, status?: string, expiry_before?: ISO-8601 }`
- **Returns:** `{ certificates: [{ id, type, address, client, status, result, issued_date, expiry_date, pdf_url }] }`
- **Approval:** None (read-only)
- **Certificate types supported (8):**
  - **EIC** — Electrical Installation Certificate (new installations) → `generate-eic-pdf`
  - **EICR** — Electrical Installation Condition Report (periodic inspection, C1/C2/C3/FI coding) → `generate-eicr-pdf`
  - **Minor Works** — Minor Electrical Installation Works Certificate (Part P tracking) → `generate-minor-works-pdf`
  - **EV Charging** — Electric Vehicle Charging Installation Certificate → `generate-ev-charging-pdf`
  - **Fire Alarm** — Fire Detection & Alarm System Certificate (BS 5839) → `generate-fire-alarm-pdf`
  - **Emergency Lighting** — Emergency Lighting System Certificate (BS 5266) → `generate-emergency-lighting-pdf`
  - **PAT** — Portable Appliance Testing Certificate (batch processing, pass/fail) → `generate-pat-testing-pdf`
  - **Solar PV** — Solar PV Installation Certificate (array config, inverter, DNO, FIT) → `generate-solar-pv-pdf`

#### `generate_certificate_pdf`

Generate a PDF for any supported certificate type.

- **Maps to:** Edge functions per type (see certificate types above) → PDFMonkey
- **Inputs:** `{ certificate_id: uuid, certificate_type: string }`
- **Returns:** `{ pdf_url: string, preview_url?: string, document_id: string, expires_at: ISO-8601 }`
- **Approval:** None (generation only — sending requires separate approval)

#### `send_certificate`

Send a completed certificate to a client.

- **Maps to:** WhatsApp/email delivery via approved channel
- **Inputs:** `{ certificate_id: uuid, client_id: uuid, channel: 'whatsapp' | 'email', message?: string }`
- **Returns:** `{ sent: boolean, channel: string, timestamp: ISO-8601 }`
- **Approval:** **YES — show cert type, address, client name, and delivery message before sending**

#### `get_expiring_certificates`

Find certificates approaching their expiry date.

- **Maps to:** Supabase query on `certificates` WHERE `expiry_date` within range
- **Inputs:** `{ days_ahead: number }`
- **Returns:** `{ certificates: [{ id, type, address, client, expiry_date, days_remaining }] }`
- **Approval:** None (read-only)

#### `generate_shareable_link`

Create a 7-day signed URL for any PDF document.

- **Maps to:** Edge function `generate-temporary-pdf-link`
- **Inputs:** `{ document_id: string, document_type: 'certificate' | 'quote' | 'invoice' }`
- **Returns:** `{ public_url: string, expires_at: ISO-8601, file_name: string }`
- **Approval:** None (link generation only)

#### `send_client_expiry_reminders`

Batch send certificate expiry reminders to clients.

- **Maps to:** Edge function `send-client-expiry-reminders`
- **Inputs:** `{ days_ahead: number, certificate_types?: string[] }`
- **Returns:** `{ sent_count: number, clients_notified: [{ client_id, certificate_type, expiry_date }] }`
- **Approval:** **YES — show client list and message drafts before sending**

---

### 3. INVOICING & PAYMENTS

#### `read_invoices`

Read the electrician's invoices.

- **Maps to:** Supabase `invoices` table (RLS-scoped)
- **Inputs:** `{ status?: 'draft' | 'sent' | 'paid' | 'overdue', client_id?: uuid, date_from?: ISO-8601, limit?: number }`
- **Returns:** `{ invoices: [{ id, client, amount, status, issued_date, due_date, paid_date, job_id }] }`
- **Approval:** None (read-only)

#### `create_invoice`

Create a draft invoice.

- **Maps to:** Supabase `invoices` table INSERT
- **Inputs:** `{ client_id: uuid, job_id?: uuid, line_items: [{ description, quantity, unit_price }], vat_rate?: number, due_days?: number, notes?: string }`
- **Returns:** `{ invoice_id: uuid, total: number, vat: number, status: 'draft' }`
- **Approval:** **YES — show full invoice breakdown, total, client name**

#### `send_invoice`

Send an invoice with payment link to a client.

- **Maps to:** Edge function `create-invoice-payment-link` (Stripe) + delivery
- **Inputs:** `{ invoice_id: uuid, channel: 'whatsapp' | 'email', message?: string }`
- **Returns:** `{ sent: boolean, payment_url: string, session_id: string }`
- **Approval:** **YES — show amount, client, payment link preview**

#### `get_overdue_invoices`

Find invoices past their due date.

- **Maps to:** Supabase query on `invoices` WHERE `status = 'sent'` AND `due_date < now()`
- **Inputs:** `{ min_days_overdue?: number }`
- **Returns:** `{ invoices: [{ id, client, amount, due_date, days_overdue }] }`
- **Approval:** None (read-only)

---

### 4. QUOTING

#### `read_quotes`

Read the electrician's quotes.

- **Maps to:** Supabase `quotes` table (RLS-scoped)
- **Inputs:** `{ status?: 'draft' | 'sent' | 'accepted' | 'declined' | 'expired', client_id?: uuid }`
- **Returns:** `{ quotes: [{ id, client, total, status, sent_date, valid_until, job_type }] }`
- **Approval:** None (read-only)

#### `generate_quote`

Generate a detailed quote using AI pricing.

- **Maps to:** Edge function `ai-quote-generator` + `cost-engineer-agent`
- **Inputs:** `{ job_type: string, property_details: string, client_requirements: string, region?: string }`
- **Returns:** `{ quote: { scope_of_work, materials: [{ item, qty, unit_price }], labour: { hours, rate }, total, vat, compliance_notes } }`
- **Approval:** **YES — show full quote before saving**

#### `generate_quote_pdf`

Generate a PDF version of a quote.

- **Maps to:** Edge function `generate-quote-pdf` → PDFMonkey
- **Inputs:** `{ quote_id: uuid }`
- **Returns:** `{ pdf_url: string, expires_at: ISO-8601 }`
- **Approval:** None (generation only)

#### `send_quote`

Send a quote to a client with accept/decline buttons.

- **Maps to:** Edge function `send-quote-email` + WhatsApp delivery
- **Inputs:** `{ quote_id: uuid, client_id: uuid, channel: 'whatsapp' | 'email', message?: string }`
- **Returns:** `{ sent: boolean, acceptance_url: string }`
- **Approval:** **YES — show full quote summary and message draft**

#### `set_quote_auto_followup`

Configure automated follow-up for a sent quote.

- **Maps to:** Edge function `quote-automated-followup`
- **Inputs:** `{ quote_id: uuid, followup_days: number, max_followups?: number }`
- **Returns:** `{ scheduled: boolean, next_followup_date: ISO-8601 }`
- **Approval:** YES — confirm follow-up schedule

#### `track_quote_email`

Track email open/click events for a sent quote.

- **Maps to:** Edge function `quote-email-tracking`
- **Inputs:** `{ quote_id: uuid }`
- **Returns:** `{ opened: boolean, opened_at?: ISO-8601, clicked: boolean, clicked_at?: ISO-8601 }`
- **Approval:** None (read-only)

---

### 5. CLIENTS & CONTACTS

#### `read_clients`

Read the electrician's client list.

- **Maps to:** Supabase `clients` table (RLS-scoped)
- **Inputs:** `{ search?: string, type?: 'residential' | 'commercial' | 'landlord', limit?: number }`
- **Returns:** `{ clients: [{ id, name, email, phone, address, type, whatsapp_consent, notes, total_jobs, total_revenue }] }`
- **Approval:** None (read-only)

#### `create_client`

Add a new client.

- **Maps to:** Supabase `clients` table INSERT
- **Inputs:** `{ name: string, email?: string, phone?: string, address?: string, type?: string, notes?: string }`
- **Returns:** `{ client_id: uuid }`
- **Approval:** YES — show client details before saving

#### `update_client`

Update client details or notes.

- **Maps to:** Supabase `clients` table UPDATE
- **Inputs:** `{ client_id: uuid, [fields to update] }`
- **Returns:** `{ success: boolean }`
- **Approval:** None for notes. YES for contact detail changes.

#### `generate_client_portal_link`

Generate a tokenised client portal link for a specific client.

- **Maps to:** `/portal/:token` route generation
- **Inputs:** `{ client_id: uuid, include_certs?: boolean, include_invoices?: boolean, include_quotes?: boolean }`
- **Returns:** `{ portal_url: string, token: string, expires_at: ISO-8601 }`
- **Approval:** None (link generation only)

#### `send_signature_request`

Send a document for digital signature via DocuSign.

- **Maps to:** Edge function `docusign-create-envelope`
- **Inputs:** `{ document_id: uuid, document_type: 'certificate' | 'quote' | 'scope_of_work', client_id: uuid, signer_email: string, signer_name: string }`
- **Returns:** `{ envelope_id: string, signing_url: string, status: 'sent' }`
- **Approval:** **YES — show document details and recipient before sending**

#### `send_scope_for_signing`

Send a scope of work document for client signature.

- **Maps to:** Edge function `send-scope-email`
- **Inputs:** `{ scope_id: uuid, client_id: uuid }`
- **Returns:** `{ sent: boolean, signing_url: string }`
- **Approval:** **YES — show scope summary and recipient**

---

### 5B. EXPENSES & FINANCIAL TRACKING

#### `read_expenses`

Read the electrician's expense records.

- **Maps to:** Supabase `expenses` table (RLS-scoped)
- **Inputs:** `{ category?: 'materials' | 'tools' | 'fuel' | 'mileage' | 'insurance' | 'training' | 'other', date_from?: ISO-8601, date_to?: ISO-8601, limit?: number }`
- **Returns:** `{ expenses: [{ id, amount, category, description, supplier, date, receipt_url, synced_to_accounting }] }`
- **Approval:** None (read-only)

#### `create_expense`

Log an expense manually or from OCR receipt scan.

- **Maps to:** Supabase `expenses` table INSERT + optional `parse-expense-receipt` edge function
- **Inputs:** `{ amount: number, category: string, description: string, supplier?: string, date: ISO-8601, receipt_photo_url?: string, job_id?: uuid }`
- **Returns:** `{ expense_id: uuid, status: 'logged' }`
- **Approval:** YES — show expense details before saving

#### `log_mileage`

Log a mileage claim.

- **Maps to:** Supabase `expenses` table INSERT (category: 'mileage')
- **Inputs:** `{ from_address: string, to_address: string, miles: number, date: ISO-8601, job_id?: uuid, rate_per_mile?: number }`
- **Returns:** `{ expense_id: uuid, amount: number, miles: number }`
- **Approval:** YES — show mileage calculation before logging

#### `sync_expense_to_accounting`

Push an expense record to connected accounting software.

- **Maps to:** Edge function `accounting-sync-expense`
- **Inputs:** `{ expense_id: uuid }`
- **Returns:** `{ synced: boolean, accounting_ref?: string }`
- **Approval:** None (if expense already approved; sync is automatic when enabled)

#### `get_expense_summary`

Get expense totals for a period.

- **Maps to:** Supabase aggregation on `expenses` table
- **Inputs:** `{ period: 'month' | 'quarter' | 'year', date_from?: ISO-8601 }`
- **Returns:** `{ total: number, by_category: { materials: number, tools: number, fuel: number, mileage: number, ... }, receipt_count: number }`
- **Approval:** None (read-only)

---

### 6. RAMS & HEALTH & SAFETY

#### `create_rams`

Generate a full RAMS (Risk Assessment & Method Statement).

- **Maps to:** Edge functions `create-health-safety-job` → `generate-rams` (3-layer caching)
- **Inputs:** `{ job_description: string, job_type: string, address: string, hazards?: string[], project_info?: object }`
- **Returns:** `{ rams_id: uuid, status: 'generating' }`
- **Approval:** YES — confirm job details before generation

#### `get_rams_result`

Poll for RAMS generation result.

- **Maps to:** Supabase `rams_generation_jobs` table
- **Inputs:** `{ rams_id: uuid }`
- **Returns:** `{ status: 'pending' | 'complete' | 'failed', rams_data?: object, method_data?: object }`
- **Approval:** None (read-only)

#### `generate_rams_pdf`

Generate RAMS as a downloadable PDF (client-ready).

- **Maps to:** Edge function `generate-rams-pdf`
- **Inputs:** `{ rams_id: uuid }`
- **Returns:** `{ pdf_url: string, expires_at: ISO-8601 }`
- **Approval:** None (generation only — sending requires separate approval)

#### `search_hazard_database`

Search the 200+ industry hazard library.

- **Maps to:** Supabase hazard database tables + `health_safety_intelligence` RAG
- **Inputs:** `{ query: string, risk_level?: 'low' | 'medium' | 'high' | 'extreme', category?: string }`
- **Returns:** `{ hazards: [{ id, hazard, risk_level, controls: [], ppe_required: [], regulation_refs: [] }] }`
- **Approval:** None (read-only)

#### `create_briefing`

Create a team safety briefing from templates.

- **Maps to:** Supabase briefing tables + templates
- **Inputs:** `{ job_id?: uuid, template?: string, attendees: string[], hazards: string[], date: ISO-8601 }`
- **Returns:** `{ briefing_id: uuid, status: 'draft' }`
- **Approval:** YES — show briefing details before saving

#### `log_near_miss`

Report a near-miss incident with photos.

- **Maps to:** Supabase near-miss/observation tables
- **Inputs:** `{ description: string, location: string, date: ISO-8601, severity: string, photos?: string[] }`
- **Returns:** `{ report_id: uuid, logged: boolean }`
- **Approval:** YES — confirm details before logging

#### `get_safe_isolation_procedure`

Get safe isolation procedure steps and register entries.

- **Maps to:** Supabase safe isolation register tables
- **Inputs:** `{ equipment_type?: string, location?: string }`
- **Returns:** `{ procedure_steps: [], register_entries: [{ id, date, equipment, isolated_by, restored_by }] }`
- **Approval:** None (read-only — safety critical reference)

#### `create_permit_to_work`

Create a permit-to-work document.

- **Maps to:** Supabase permit-to-work tables
- **Inputs:** `{ job_id?: uuid, work_description: string, hazards: string[], controls: string[], issuer: string, date_from: ISO-8601, date_to: ISO-8601 }`
- **Returns:** `{ permit_id: uuid, status: 'draft' }`
- **Approval:** YES — show full permit before creating

#### `track_safety_equipment`

Track PPE inventory and calibration dates.

- **Maps to:** Supabase safety equipment tables
- **Inputs:** `{ action: 'list' | 'add' | 'update', equipment_type?: string, calibration_due?: ISO-8601 }`
- **Returns:** `{ equipment: [{ id, type, serial_number, calibration_due, status, last_checked }] }`
- **Approval:** None for listing. YES for updates.

#### `log_accident`

Log an accident to the digital accident book.

- **Maps to:** Supabase accident book tables + edge function `generate-accident-pdf`
- **Inputs:** `{ date: ISO-8601, location: string, description: string, injured_person: string, injury_type: string, first_aid_given: boolean, witnesses?: string[], photos?: string[] }`
- **Returns:** `{ accident_id: uuid, pdf_url?: string, riddor_required: boolean }`
- **Approval:** YES — confirm all details before logging (legal record)

#### `generate_riddor_report`

Generate a RIDDOR report for a reportable incident.

- **Maps to:** Edge function `generate-riddor-report-pdf`
- **Inputs:** `{ accident_id: uuid }`
- **Returns:** `{ pdf_url: string, riddor_reference?: string }`
- **Approval:** **YES — RIDDOR reports are legal documents, show full details before generating**

#### `create_coshh_assessment`

Create a COSHH (Control of Substances Hazardous to Health) assessment.

- **Maps to:** Supabase COSHH tables + edge function `generate-coshh-pdf`
- **Inputs:** `{ substance: string, product_name: string, manufacturer?: string, usage_description: string, controls: string[], ppe_required: string[], storage_requirements?: string }`
- **Returns:** `{ coshh_id: uuid, pdf_url?: string }`
- **Approval:** YES — show assessment details before saving

#### `log_fire_watch`

Log a fire watch period with timer.

- **Maps to:** Supabase fire watch tables + edge function `generate-fire-watch-pdf`
- **Inputs:** `{ location: string, start_time: ISO-8601, end_time: ISO-8601, reason: string, hot_works_permit_id?: uuid, checks_completed: string[] }`
- **Returns:** `{ fire_watch_id: uuid, pdf_url?: string }`
- **Approval:** YES — confirm fire watch details before logging

#### `log_observation`

Log a safety observation (positive or negative).

- **Maps to:** Supabase observation tables + edge function `generate-observation-pdf`
- **Inputs:** `{ type: 'positive' | 'negative', description: string, location: string, date: ISO-8601, corrective_action?: string, photos?: string[] }`
- **Returns:** `{ observation_id: uuid, pdf_url?: string }`
- **Approval:** YES — confirm observation details before logging

#### `get_safe_isolation_record`

Retrieve or create a safe isolation record (GS38 compliant).

- **Maps to:** Supabase safe isolation tables + edge function `generate-safe-isolation-pdf`
- **Inputs:** `{ action: 'read' | 'create', equipment_id?: string, location?: string, voltage_reading?: number, proving_unit_serial?: string }`
- **Returns:** `{ record_id?: uuid, records: [{ id, date, equipment, isolated_by, voltage_confirmed_dead, restored_by }], pdf_url?: string }`
- **Approval:** YES for create (safety-critical record). None for read.

#### `create_pre_use_check`

Create a PUWER pre-use equipment check record.

- **Maps to:** Supabase equipment check tables + edge function `generate-pre-use-check-pdf`
- **Inputs:** `{ equipment_type: string, serial_number?: string, checks: [{ item, pass: boolean, notes?: string }], inspector: string, date: ISO-8601 }`
- **Returns:** `{ check_id: uuid, all_pass: boolean, pdf_url?: string }`
- **Approval:** YES — confirm check results before saving

#### `get_safety_alerts`

Get the latest safety alerts and industry notices.

- **Maps to:** Supabase safety alerts tables
- **Inputs:** `{ category?: string, unread_only?: boolean, limit?: number }`
- **Returns:** `{ alerts: [{ id, title, date, category, severity, summary, source, read: boolean }] }`
- **Approval:** None (read-only)

#### `get_safety_dashboard`

Get the electrician's safety dashboard — score, trends, streak.

- **Maps to:** Supabase safety analytics views
- **Inputs:** `{ period?: 'week' | 'month' | 'quarter' | 'year' }`
- **Returns:** `{ safety_score: number, trend: 'improving' | 'stable' | 'declining', streak_days: number, near_miss_count: number, observations_count: number, briefings_completed: number, overdue_equipment: number }`
- **Approval:** None (read-only)

#### `generate_weekly_safety_summary`

Generate a weekly safety summary report.

- **Maps to:** Edge function `weekly-safety-summary`
- **Inputs:** `{ week_ending?: ISO-8601 }`
- **Returns:** `{ summary: string, metrics: object, pdf_url?: string }`
- **Approval:** None (generation only — sending via WhatsApp requires Rail 14)

#### `generate_toolbox_talk`

Generate a toolbox talk for a specific topic.

- **Maps to:** Edge function `generate-toolbox-talk`
- **Inputs:** `{ topic: string, duration_minutes?: number, attendees?: number }`
- **Returns:** `{ talk_id: uuid, content: string, key_points: string[], questions: string[] }`
- **Approval:** None (generation only)

---

### 7. CIRCUIT DESIGN

#### `create_circuit_design`

Generate an AI circuit design with board layout.

- **Maps to:** Edge functions `create-circuit-design-job` → `process-circuit-design-parallel`
- **Inputs:** `{ property_type: string, loads: string, voltage?: number, earthing_system?: string, special_requirements?: string }`
- **Returns:** `{ design_job_id: uuid, status: 'processing' }`
- **Approval:** YES — confirm design brief before generation

#### `get_circuit_design_result`

Poll for circuit design result.

- **Maps to:** Supabase `circuit_design_jobs` table
- **Inputs:** `{ design_job_id: uuid }`
- **Returns:** `{ status, circuit_design_data?: { circuits: [], board_schedule: {}, cable_sizes: [], protection_devices: [] } }`
- **Approval:** None (read-only)

#### `generate_design_alternatives`

Get alternative designs with cost/complexity tradeoffs.

- **Maps to:** Edge function `generate-design-alternatives`
- **Inputs:** `{ design_job_id: uuid, constraints?: string }`
- **Returns:** `{ alternatives: [{ cable_size, mcb, cost, complexity, notes }] }`
- **Approval:** None (read-only)

#### `generate_circuit_diagram`

Generate a visual circuit diagram.

- **Maps to:** Edge function `generate-circuit-diagrams`
- **Inputs:** `{ circuit_data: object }`
- **Returns:** `{ diagram_url: string, svg_content: string }`
- **Approval:** None (generation only)

---

### 8. ELECTRICAL CALCULATIONS

All calculators are pure functions — no side effects, no approval required.

#### `calculate_voltage_drop`

- **Maps to:** `src/lib/calculators/engines/voltageDropEngine.ts`
- **Inputs:** `{ cable_type, cable_size, length_m, current_a, voltage, power_factor, phase_config, temperature_c }`
- **Returns:** `{ voltage_drop_v, voltage_drop_pct, final_voltage, compliant: boolean, limit_pct }`
- **BS 7671:** Appendix 4 (3% lighting, 5% power)

#### `calculate_cable_capacity`

- **Maps to:** `src/lib/calculators/engines/cableCapacityEngine.ts`
- **Inputs:** `{ cable_type, cable_size, ambient_temp, grouping_circuits, design_current, protective_device_rating, installation_method }`
- **Returns:** `{ tabulated_capacity, derated_capacity, derating_factors: { Ca, Cg }, compliant: boolean, safety_margin_pct }`
- **BS 7671:** Appendix 4 derating tables

#### `calculate_earth_fault_loop`

- **Maps to:** `src/lib/calculators/engines/earthFaultLoopEngine.ts`
- **Inputs:** `{ ze_ohms, cable_size, cable_length, cable_type, conductor_material, device_type, device_rating }`
- **Returns:** `{ zs_calculated, zs_max_permitted, fault_current_a, compliant: boolean, rcd_recommended: boolean }`
- **BS 7671:** Table 41.2/41.3 (maximum Zs), disconnection times

#### `calculate_fault_level`

- **Maps to:** `src/lib/fault-level.ts`
- **Inputs:** `{ source_type, transformer_rating_kva, impedance_pct, cable_segments: [{ size, length, material }] }`
- **Returns:** `{ fault_points: [{ location, fault_current_3ph, fault_current_1ph }], required_breaking_capacity }`
- **BS 7671:** Regulation 434.2, IEC 60909

#### `calculate_arc_flash`

- **Maps to:** `src/lib/arcflash.ts`
- **Inputs:** `{ voltage, fault_current, clearing_time_ms, working_distance_mm, equipment_type, electrode_config }`
- **Returns:** `{ incident_energy_cal_cm2, ppe_category, arc_flash_boundary_mm, boundary_table }`
- **BS 7671:** IEEE 1584-2018, Table 41.1

#### `calculate_selectivity`

- **Maps to:** `src/lib/selectivity.ts`
- **Inputs:** `{ upstream_device, downstream_device, fault_current }`
- **Returns:** `{ selective: boolean, ratio, operating_times, energy_let_through, cascade_eligible: boolean }`
- **BS 7671:** Regulation 536.4.3

#### `calculate_power_quality`

- **Maps to:** `src/lib/powerquality.ts`
- **Inputs:** `{ fundamental_current, fundamental_voltage, harmonic_data: [{ order, magnitude }], system_type }`
- **Returns:** `{ thd_current_pct, thd_voltage_pct, k_factor, transformer_derating, neutral_current, compliant: boolean }`
- **BS 7671:** G5/5 harmonic limits

#### `calculate_ev_charging`

- **Maps to:** `src/lib/ev-calculations.ts`
- **Inputs:** `{ battery_capacity_kwh, charger_type, current_charge_pct, target_charge_pct, electricity_rate, cable_run_m, ambient_temp }`
- **Returns:** `{ charging_time_hrs, cost, cable_size, voltage_drop_pct, zs_compliant: boolean, dno_notification_required: boolean }`
- **BS 7671:** Regulation 722.55

#### `calculate_evse_load`

- **Maps to:** `src/lib/evse-calculations.ts`
- **Inputs:** `{ charging_points: [{ type, quantity }], supply_voltage, diversity_scenario, cable_length_m, ambient_temp }`
- **Returns:** `{ design_current, selected_cable, voltage_drop_pct, zs, derating_factors: { Ca, Ci, Cg }, dno_guidance }`
- **BS 7671:** Appendix 4 derating, voltage drop limits (3%/5%), RCD protection

#### `calculate_emergency_lighting`

- **Maps to:** `src/lib/emergency-lighting.ts`
- **Inputs:** `{ floor_area_m2, ceiling_height_m, occupancy_type, emergency_duration_hrs, fixture_type, battery_chemistry }`
- **Returns:** `{ luminaire_count, battery_capacity_ah, cable_size, illuminance_lux, uniformity_ratio, cost_comparison }`
- **BS 7671:** BS 5266-1

#### `calculate_lightning_protection`

- **Maps to:** `src/lib/lightning-protection.ts`
- **Inputs:** `{ building_dimensions, construction_type, roof_type, contents_risk, occupancy, incoming_services }`
- **Returns:** `{ total_risk, tolerable_risk, protection_required: boolean, lps_class, spd_required: boolean, cost_range }`
- **BS 7671:** BS EN 62305

#### `calculate_touch_step_voltage`

- **Maps to:** `src/lib/touch-step-voltage.ts`
- **Inputs:** `{ fault_current, soil_resistivity, electrode_type, electrode_dimensions, fault_duration_s }`
- **Returns:** `{ touch_voltage, step_voltage, permissible_limits, body_current_ma, iec_zone, compliant: boolean }`
- **BS 7671:** Sections 411/412, BS EN 50522, IEC 60479-1

#### `calculate_battery_backup`

- **Maps to:** `src/lib/battery-backup-calcs.ts`
- **Inputs:** `{ loads: [{ watts, duty_cycle }], battery_chemistry, voltage_config, ambient_temp, cable_run_m }`
- **Returns:** `{ runtime_hrs, required_ah, inverter_size_va, cable_size, voltage_drop_pct, recharge_time_hrs }`
- **BS 7671:** BS EN 62040, Section 721

#### `calculate_transformer`

- **Maps to:** `src/lib/transformer-calcs.ts`
- **Inputs:** `{ primary_voltage, secondary_voltage, kva_rating, power_factor, phase_config, impedance_pct }`
- **Returns:** `{ full_load_current, losses, efficiency_pct, inrush_current, voltage_regulation, derating_factors }`

#### `calculate_heat_pump`

- **Maps to:** `src/lib/heat-pump-calculations.ts`
- **Inputs:** `{ floor_area_m2, insulation_level, design_temp, indoor_temp, heat_pump_type, emitter_type, electricity_rate }`
- **Returns:** `{ heat_load_kw, cop, electrical_power_kw, annual_cost, carbon_savings, bus_grant_eligible: boolean }`
- **BS 7671:** MCS guidelines, Part L

#### `calculate_swimming_pool`

- **Maps to:** `src/lib/swimming-pool.ts`
- **Inputs:** `{ pool_type, loads, supply_voltage, earthing_system, zone_designation, underwater_lighting: boolean }`
- **Returns:** `{ total_load, circuits, zonal_compliance, bonding_requirements, test_schedule }`
- **BS 7671:** Section 702

#### `calculate_marine`

- **Maps to:** `src/lib/marine.ts`
- **Inputs:** `{ vessel_type, loads_by_category, battery_type, charging_sources, cable_run_m }`
- **Returns:** `{ daily_consumption_ah, battery_capacity, inverter_size, cable_size, voltage_drop_pct, compliant: boolean }`
- **BS 7671:** ISO 13297, IEC 60364-7-709

#### `calculate_data_centre`

- **Maps to:** `src/lib/datacentre.ts`
- **Inputs:** `{ it_load_kw, redundancy_level, cooling_method, efficiency_ratio, climate_zone }`
- **Returns:** `{ total_facility_load_kw, pue, dcie_pct, ups_capacity, generator_capacity, annual_cost, capital_cost }`
- **BS 7671:** BS EN 50600, TIA-942

#### `calculate_off_grid`

- **Maps to:** `src/lib/offgrid-calculations.ts`
- **Inputs:** `{ daily_consumption_kwh, peak_sun_hours, autonomy_days, system_voltage, battery_type, location }`
- **Returns:** `{ panel_count, battery_capacity_ah, inverter_size_kw, charge_controller_a, cost_breakdown, efficiency_chain }`

---

### 8B. INSTALLATION, COMMISSIONING, MAINTENANCE & AI AGENTS

#### `get_installation_guidance`

Get step-by-step installation methods with competency requirements.

- **Maps to:** Edge function `installer-v3`
- **Inputs:** `{ installation_type: 'new' | 'upgrade' | 'replacement' | 'temporary', job_description: string, equipment?: string }`
- **Returns:** `{ steps: [{ step, description, competency_required, equipment_needed, regulation_refs }], material_list: [], testing_requirements: [] }`
- **Approval:** None (advisory only)

#### `get_commissioning_guidance`

Get testing and commissioning procedures for an installation.

- **Maps to:** Edge functions `create-commissioning-job` → `commissioning-v3`
- **Inputs:** `{ job_id?: uuid, installation_type: string, circuit_data?: object }`
- **Returns:** `{ job_id: uuid, status: 'processing' }`
- **Approval:** None (advisory — poll for results)

#### `get_commissioning_result`

Poll for commissioning guidance result.

- **Maps to:** Supabase commissioning job tables
- **Inputs:** `{ job_id: uuid }`
- **Returns:** `{ status, test_procedures: [], sequence_validation: [], certification_requirements: [], loto_procedures: [] }`
- **Approval:** None (read-only)

#### `get_maintenance_guidance`

Get preventive maintenance plans and fault diagnosis guidance.

- **Maps to:** Edge function `maintenance-advisor`
- **Inputs:** `{ equipment_type: string, query: string, maintenance_type?: 'periodic' | 'preventive' | 'corrective' }`
- **Returns:** `{ procedures: [], schedule: [], fault_diagnosis: { likely_causes, testing_steps } }`
- **Approval:** None (advisory only)

#### `get_project_management_guidance`

Get AI project management advice for electrical projects.

- **Maps to:** Edge function `project-mgmt-v3`
- **Inputs:** `{ project_type: string, query: string, project_id?: uuid, phase?: string }`
- **Returns:** `{ guidance: string, timeline_suggestions: [], resource_recommendations: [], risk_flags: [] }`
- **Approval:** None (advisory only)

#### `get_tutor_guidance`

Get AI tutor explanations of BS 7671 regulations and electrical theory.

- **Maps to:** Edge function `tutor-v3`
- **Inputs:** `{ topic: string, level?: 'level2' | 'level3' | 'qualified', context?: string }`
- **Returns:** `{ explanation: string, regulation_refs: [], worked_examples: [], further_reading: [] }`
- **Approval:** None (advisory only)

#### `generate_method_statement`

Generate a standalone method statement for a specific task.

- **Maps to:** Method statement generator engine
- **Inputs:** `{ task_description: string, location: string, equipment: string[], sequence_of_works: string[] }`
- **Returns:** `{ method_statement_id: uuid, content: string, pdf_url?: string }`
- **Approval:** YES — show method statement before saving

#### `get_ai_chat`

General-purpose AI chat for electrical queries.

- **Maps to:** Edge functions `chat-assistant` / `electrician-ai-assistant`
- **Inputs:** `{ message: string, context?: string, conversation_id?: uuid }`
- **Returns:** `{ response: string, sources: [], conversation_id: uuid }`
- **Approval:** None (advisory only)

---

### 8C. AI VISUAL ANALYSIS TOOLS

#### `identify_component`

Identify an electrical component from a photograph.

- **Maps to:** AI visual analysis engine (OpenAI Vision)
- **Inputs:** `{ photo_url: string }`
- **Returns:** `{ component_name, specifications, bs7671_requirements, terminal_connections, compliance_score, evidence_url }`
- **Approval:** None (read-only analysis)

#### `get_wiring_instructions`

Generate step-by-step wiring instructions from a photograph.

- **Maps to:** AI visual analysis + wiring guidance engine
- **Inputs:** `{ photo_url: string, scenario?: string }`
- **Returns:** `{ steps: [], colour_codes, terminal_diagrams, safety_checklist: [], regulation_refs: [] }`
- **Approval:** None (advisory only)

#### `diagnose_fault_from_photo`

Diagnose electrical faults from a photograph of damaged/faulty equipment.

- **Maps to:** AI visual analysis + `visual-fault-diagnosis-rag`
- **Inputs:** `{ photo_url: string, symptoms?: string }`
- **Returns:** `{ diagnosis, root_cause, rectification_steps: [], cost_estimate, safety_warnings: [], regulation_refs: [] }`
- **Approval:** None (advisory only)

#### `verify_installation_from_photo`

Verify BS 7671 compliance of a completed installation from a photograph.

- **Maps to:** AI visual analysis engine
- **Inputs:** `{ photo_url: string, installation_type?: string }`
- **Returns:** `{ pass_fail, compliance_score, defects: [{ code: 'C1' | 'C2' | 'C3', description }], rectification_required: [] }`
- **Approval:** None (advisory only)

#### `generate_client_explanation`

Generate a client-friendly explanation of electrical work with simple language and visuals.

- **Maps to:** AI client explainer engine
- **Inputs:** `{ work_description: string, technical_details?: string, include_cost_breakdown?: boolean }`
- **Returns:** `{ explanation: string, simplified_diagrams: [], safety_summary, cost_breakdown?: object }`
- **Approval:** None (generation only — sending requires separate approval)

#### `generate_report`

Generate a professional report (fault diagnosis, installation verification, inspection summary).

- **Maps to:** Report writer engine
- **Inputs:** `{ report_type: string, data: object, template?: string }`
- **Returns:** `{ report_content: string, pdf_url?: string }`
- **Approval:** None (generation only)

---

### 8D. BOARD SCANNER & TESTING

#### `scan_distribution_board`

Photograph a distribution board and extract circuit data using AI recognition.

- **Maps to:** Edge functions `board-read-enhanced` / `board-read-stream`
- **Inputs:** `{ photo_url: string, board_type?: string }`
- **Returns:** `{ board_id: uuid, circuits: [{ position, device_type, rating, label }], phase_balance, confidence_score }`
- **Approval:** None (read-only analysis)

#### `preprocess_board_photo`

Pre-process a board photo for improved OCR accuracy.

- **Maps to:** Edge function `board-ocr-preprocess`
- **Inputs:** `{ photo_url: string }`
- **Returns:** `{ processed_url: string, enhancement_applied: string[], ocr_confidence: number }`
- **Approval:** None (image processing only)

#### `edit_scanned_circuits`

Review and correct AI-extracted circuit data from a board scan.

- **Maps to:** Circuit edit/review sheets
- **Inputs:** `{ board_id: uuid, circuit_edits: [{ position, field, value }] }`
- **Returns:** `{ updated: boolean, circuits: [] }`
- **Approval:** None (data correction)

#### `get_schedule_of_tests`

Get or create a schedule of tests for a board/installation.

- **Maps to:** Supabase schedule of tests tables
- **Inputs:** `{ board_id?: uuid, job_id?: uuid }`
- **Returns:** `{ circuits: [{ name, test_results: { continuity, insulation_resistance, polarity, zs }, status }], progress_pct }`
- **Approval:** None (read-only)

#### `log_test_result`

Log a test result with optional photo evidence.

- **Maps to:** Supabase test results tables
- **Inputs:** `{ circuit_id: uuid, test_type: string, value: number, unit: string, pass: boolean, photo_url?: string }`
- **Returns:** `{ logged: boolean }`
- **Approval:** None (data entry)

---

### 8E. SITE VISITS & PHOTO DOCUMENTATION

#### `create_site_visit`

Create a new site visit record.

- **Maps to:** Supabase site visits tables
- **Inputs:** `{ address: string, client_id?: uuid, property_type: 'residential' | 'commercial' | 'industrial', visit_date: ISO-8601, notes?: string }`
- **Returns:** `{ visit_id: uuid, status: 'in_progress' }`
- **Approval:** YES — show visit details before creating

#### `read_site_visits`

Read site visit history.

- **Maps to:** Supabase site visits tables (RLS-scoped)
- **Inputs:** `{ status?: string, client_id?: uuid, date_from?: ISO-8601, limit?: number }`
- **Returns:** `{ visits: [{ id, address, client, property_type, status, visit_date, photos_count, notes }] }`
- **Approval:** None (read-only)

#### `update_site_visit`

Update a site visit status or add notes/photos.

- **Maps to:** Supabase site visits tables UPDATE
- **Inputs:** `{ visit_id: uuid, status?: string, notes?: string, photos?: string[], completion_checklist?: object }`
- **Returns:** `{ updated: boolean }`
- **Approval:** None for notes/photos. YES for status changes.

#### `capture_site_photos`

Upload and organise site visit photographs with annotations.

- **Maps to:** Supabase storage + photo metadata tables
- **Inputs:** `{ visit_id?: uuid, job_id?: uuid, photos: [{ url, caption?, annotation?, type: 'before' | 'after' | 'evidence' | 'defect' }] }`
- **Returns:** `{ uploaded: number, photo_ids: uuid[] }`
- **Approval:** None (data entry)

---

### 8F. PROJECT MANAGEMENT

#### `create_project`

Create a project with phase-based planning.

- **Maps to:** Supabase project tables
- **Inputs:** `{ title: string, client_id?: uuid, project_type: 'residential' | 'commercial' | 'industrial', description: string, phases?: [{ name, start_date, end_date }] }`
- **Returns:** `{ project_id: uuid, status: 'planning' }`
- **Approval:** YES — show project details before creating

#### `read_projects`

Read project list and status.

- **Maps to:** Supabase project tables (RLS-scoped)
- **Inputs:** `{ status?: string, client_id?: uuid }`
- **Returns:** `{ projects: [{ id, title, client, status, phases, progress_pct, budget, spent }] }`
- **Approval:** None (read-only)

#### `update_project`

Update project status, phases, or resources.

- **Maps to:** Supabase project tables UPDATE
- **Inputs:** `{ project_id: uuid, status?: string, notes?: string, phase_updates?: object }`
- **Returns:** `{ updated: boolean }`
- **Approval:** YES for status changes. None for notes.

---

### 8G. COMPLIANCE MANAGEMENT

#### `get_compliance_status`

Check regulatory compliance status across standards.

- **Maps to:** Supabase compliance tables
- **Inputs:** `{ scope?: 'bs7671' | 'part_p' | 'building_regs' | 'all' }`
- **Returns:** `{ checklists: [{ standard, items: [{ requirement, status: 'compliant' | 'non_compliant' | 'pending', notes }] }], audit_trail: [] }`
- **Approval:** None (read-only)

#### `submit_part_p_notification`

Submit a Part P Building Control notification for notifiable electrical work.

- **Maps to:** Building control notification system
- **Inputs:** `{ certificate_id: uuid, work_type: string, property_address: string, work_description: string, completion_date: ISO-8601 }`
- **Returns:** `{ notification_id: uuid, status: 'submitted', reference_number?: string }`
- **Approval:** **YES — Part P notifications are legal requirements, show full details before submitting**

---

### 8H. ELEC-ID

#### `read_elec_id`

Read the electrician's Elec-ID profile (digital identity card).

- **Maps to:** Supabase Elec-ID tables (RLS-scoped)
- **Inputs:** `{}`
- **Returns:** `{ elec_id: { name, photo_url, qualification_level, scheme, scheme_number, part_p_registered, specialisms, verified: boolean } }`
- **Approval:** None (read-only)

#### `share_elec_id`

Generate a shareable Elec-ID link for clients or contractors.

- **Maps to:** Elec-ID sharing system
- **Inputs:** `{ expires_in_days?: number }`
- **Returns:** `{ share_url: string, qr_code_url: string, expires_at: ISO-8601 }`
- **Approval:** None (link generation only)

---

### 9. ELECTRICAL KNOWLEDGE & REGULATIONS

#### `search_bs7671`

Search BS 7671 regulations using hybrid keyword + embedding search.

- **Maps to:** Edge function `bs7671-rag-search`
- **Inputs:** `{ query: string, match_threshold?: number, match_count?: number }`
- **Returns:** `{ regulations: [{ regulation_number, section, content, amendment, similarity }], results_count }`
- **Approval:** None (read-only)

#### `explain_regulation`

Explain a BS 7671 regulation in plain English.

- **Maps to:** Edge function `explain-regulation`
- **Inputs:** `{ topic: string, context?: string }`
- **Returns:** `{ explanation: string }`
- **Approval:** None (read-only)

#### `visual_fault_diagnosis`

Diagnose electrical faults from a text description using RAG (for text-only queries; see also `diagnose_fault_from_photo` in AI Visual Analysis for photo-based diagnosis).

- **Maps to:** Edge function `visual-fault-diagnosis-rag`
- **Inputs:** `{ fault_description: string, symptoms: string }`
- **Returns:** `{ diagnosis, likely_causes: [], testing_procedures: [] }`
- **Approval:** None (advisory only)

---

### 10. MATERIALS & SUPPLIERS

#### `parse_materials_list`

Parse a free-text materials list into structured items with pricing.

- **Maps to:** Edge function `parse-materials-list`
- **Inputs:** `{ text: string }`
- **Returns:** `{ items: [{ name, quantity, unit, estimated_price, supplier, confidence }] }`
- **Approval:** None (read-only)

#### `get_material_recommendations`

Recommend materials based on a circuit design.

- **Maps to:** Edge function `ai-material-recommendations`
- **Inputs:** `{ circuit_design_id: uuid }`
- **Returns:** `{ recommendations: [{ product, reason, alternatives }] }`
- **Approval:** None (read-only)

#### `compare_material_prices`

Compare pricing across suppliers.

- **Maps to:** Edge function `compare-materials-prices`
- **Inputs:** `{ material_name: string, supplier_filter?: string[] }`
- **Returns:** `{ comparisons: [{ supplier, price, stock_status, url }] }`
- **Approval:** None (read-only)

---

### 11. CALENDAR & SCHEDULING

#### `read_calendar`

Read the electrician's calendar events.

- **Maps to:** Supabase `calendar_events` table (RLS-scoped) + Google Calendar (if connected)
- **Inputs:** `{ date_from?: ISO-8601, date_to?: ISO-8601, limit?: number }`
- **Returns:** `{ events: [{ id, title, date, time, duration, address, client, job_id, source }] }`
- **Approval:** None (read-only)

#### `create_calendar_event`

Create a calendar event.

- **Maps to:** Supabase `calendar_events` INSERT + Google Calendar (if connected)
- **Inputs:** `{ title: string, date: ISO-8601, time: string, duration_minutes: number, address?: string, client_id?: uuid, job_id?: uuid, notes?: string }`
- **Returns:** `{ event_id: uuid, google_event_id?: string }`
- **Approval:** **YES — show date, time, client, address before creating**

#### `get_availability`

Check available time slots.

- **Maps to:** Read calendar + user working hours preferences
- **Inputs:** `{ date_from: ISO-8601, date_to: ISO-8601, duration_minutes: number }`
- **Returns:** `{ available_slots: [{ date, time, duration }] }`
- **Approval:** None (read-only)

---

### 12. MESSAGING & COMMUNICATION

#### `draft_message`

Draft a message for the electrician to review. Does NOT send.

- **Inputs:** `{ client_id: uuid, channel: 'whatsapp' | 'email' | 'sms', subject?: string, body: string, purpose: string }`
- **Returns:** `{ draft_id: uuid, preview: string }`
- **Approval:** None (drafting is not sending)

#### `send_approved_message`

Send a message that has been approved by the electrician.

- **Maps to:** WhatsApp Business API / email / Twilio SMS
- **Inputs:** `{ draft_id: uuid }` OR `{ client_id: uuid, channel: string, body: string }`
- **Returns:** `{ sent: boolean, timestamp: ISO-8601, message_id: string }`
- **Approval:** **YES — always. No exceptions. Show full message and recipient before sending.**
- **Pre-check:** Verify `client.whatsapp_consent = true` before WhatsApp. Fall back to email if no consent.

---

### 13. BUSINESS ANALYTICS

#### `get_business_metrics`

Get summary business metrics.

- **Maps to:** Edge function `business-analytics`
- **Inputs:** `{ period?: 'week' | 'month' | 'quarter' | 'year' }`
- **Returns:** `{ quotes_total, quotes_accepted, conversion_rate, revenue, invoices_outstanding, average_job_value, top_job_types }`
- **Approval:** None (read-only)

---

### 13B. TENDER & OPPORTUNITY SEARCH

#### `search_tenders`

Search public tenders and contract opportunities.

- **Maps to:** Edge function `search-opportunities` + tender sync functions
- **Inputs:** `{ keywords?: string, location?: string, value_min?: number, value_max?: number, sector?: 'residential' | 'commercial' | 'industrial' | 'public', limit?: number }`
- **Returns:** `{ opportunities: [{ id, title, client, location, value_range, deadline, description, source }] }`
- **Approval:** None (read-only — public data)

#### `search_job_vacancies`

Search electrical job vacancies across multiple job boards.

- **Maps to:** Job board integrations (Adzuna, Indeed, Reed, CV-Library, Totaljobs, JIB)
- **Inputs:** `{ location?: string, type?: 'permanent' | 'contract' | 'temporary', min_salary?: number, keywords?: string, limit?: number }`
- **Returns:** `{ vacancies: [{ title, company, location, salary_range, type, posted_date, url, source }] }`
- **Approval:** None (read-only — aggregated public data)

---

### 14. AGENT MEMORY

#### `read_memory`

Read the agent's stored memory and preferences.

- **Maps to:** Agent workspace `MEMORY.md` + Supabase `user_agent_preferences`
- **Inputs:** `{ key?: string }`
- **Returns:** `{ preferences: [{ key, value, source }], memory_summary: string }`
- **Approval:** None (read-only)

#### `write_memory`

Store a preference or learned fact.

- **Maps to:** Agent workspace `MEMORY.md` + Supabase `user_agent_preferences` INSERT/UPDATE
- **Inputs:** `{ key: string, value: string, source: 'user_stated' | 'agent_learned' }`
- **Returns:** `{ stored: boolean }`
- **Approval:** None (internal agent operation)

#### `delete_memory`

Remove a stored preference (triggered by "forget that").

- **Maps to:** Supabase `user_agent_preferences` DELETE
- **Inputs:** `{ key: string }` OR `{ all: true }`
- **Returns:** `{ deleted: boolean }`
- **Approval:** None (user-initiated via command)

---

### 15. ACTIVITY LOG

#### `log_activity`

Log an action to the audit trail.

- **Maps to:** Supabase `agent_activity_log` INSERT
- **Inputs:** `{ action_type: string, action_detail: object, tool_name?: string, client_id?: uuid, approved?: boolean }`
- **Returns:** `{ log_id: uuid }`
- **Approval:** None (internal — every tool call is logged automatically)

#### `read_activity_log`

Read recent agent activity (for "what did you do today?" queries).

- **Maps to:** Supabase `agent_activity_log` SELECT
- **Inputs:** `{ date_from?: ISO-8601, action_type?: string, limit?: number }`
- **Returns:** `{ activities: [{ id, action_type, action_detail, tool_name, created_at }] }`
- **Approval:** None (read-only)

---

## Tool Count Summary

| Category                                         | Tools   | Approval Required           |
| ------------------------------------------------ | ------- | --------------------------- |
| Jobs                                             | 3       | Create/update: YES          |
| Certificates                                     | 6       | Send/reminders: YES         |
| Invoicing                                        | 4       | Create/send: YES            |
| Quoting                                          | 6       | Generate/send/followup: YES |
| Clients & Contacts                               | 6       | Create/send/sign: YES       |
| Expenses & Financial                             | 5       | Create/mileage: YES         |
| RAMS & H&S                                       | 21      | Create/log: YES             |
| Circuit Design                                   | 4       | Create: YES                 |
| Installation/Commissioning/Maintenance/AI Agents | 8       | Method statement: YES       |
| AI Visual Analysis                               | 6       | None (advisory)             |
| Board Scanner & Testing                          | 5       | None (data entry)           |
| Site Visits & Photos                             | 4       | Create: YES                 |
| Project Management                               | 3       | Create/update: YES          |
| Compliance & Part P                              | 2       | Part P: YES                 |
| Elec-ID                                          | 2       | None (read/share)           |
| Regulations                                      | 3       | None (read-only)            |
| Materials                                        | 3       | None (read-only)            |
| Calendar                                         | 3       | Create: YES                 |
| Messaging                                        | 2       | Send: ALWAYS YES            |
| Analytics                                        | 1       | None (read-only)            |
| Tenders & Job Search                             | 2       | None (read-only)            |
| Memory                                           | 3       | None (internal)             |
| Activity Log                                     | 2       | None (internal)             |
| Calculators                                      | 18      | None (pure functions)       |
| **Total**                                        | **122** |                             |

---

## RAG Data Sources

The agent has indirect access to these knowledge bases via edge functions:

| Table                         | Content                                                  | Used By                                                             |
| ----------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------- |
| `regulations_intelligence`    | BS 7671 regulations, amendments, guidance                | `search_bs7671`, `explain_regulation`                               |
| `practical_work_intelligence` | Labour timing, installation methods, trade knowledge     | `generate_quote`, cost engineering                                  |
| `pricing_embeddings`          | Material costs, supplier data, regional pricing          | `generate_quote`, `compare_material_prices`                         |
| `design_knowledge`            | Circuit design patterns, standard board layouts          | `create_circuit_design`                                             |
| `health_safety_intelligence`  | H&S hazards, controls, PPE requirements                  | `create_rams`, `search_hazard_database`                             |
| `bs7671_embeddings`           | Full BS 7671 text embeddings for semantic search         | `search_bs7671`                                                     |
| `safety_knowledge`            | Safety procedures, RIDDOR, COSHH, fire safety            | `log_accident`, `generate_riddor_report`, `create_coshh_assessment` |
| `training_content`            | Study centre content, EPA/AM2 prep, apprentice materials | `search_study_content`, `run_epa_simulator`, `get_toolbox_guides`   |

---

## 16. STUDY CENTRE & APPRENTICE LEARNING (Apprentice Mode Only)

These tools are available when the agent is connected to an apprentice user (`role: 'apprentice'`). They provide access to the full Elec-Mate learning ecosystem.

#### `search_study_content`

Search across all 46 courses, 200+ modules, and 1,000+ sections.

- **Maps to:** Supabase full-text search across study content tables
- **Inputs:** `{ query: string, course_level?: 'level2' | 'level3' | 'cpd' | 'general' | 'personal_development', topic?: string }`
- **Returns:** `{ results: [{ course, module, section, title, summary, url }] }`
- **Approval:** None (read-only)

#### `get_flashcards`

Retrieve flashcard sets for a topic with spaced repetition support.

- **Maps to:** Supabase flashcard tables
- **Inputs:** `{ topic: string, due_only?: boolean, limit?: number }`
- **Returns:** `{ cards: [{ id, question, answer, topic, due_date, difficulty }] }`
- **Approval:** None (read-only)

#### `generate_practice_questions`

Generate quiz questions for a topic from the 2,000+ question bank.

- **Maps to:** Supabase mock exam question tables
- **Inputs:** `{ topic: string, count?: number, difficulty?: 'easy' | 'medium' | 'hard', exam_type?: 'level2' | 'level3' | 'am2' | 'epa' }`
- **Returns:** `{ questions: [{ id, question, options: [], correct_answer, explanation, regulation_ref }] }`
- **Approval:** None (read-only)

#### `log_ojt_hours`

Log off-job training hours for the apprentice.

- **Maps to:** Supabase OJT tracking tables
- **Inputs:** `{ date: ISO-8601, hours: number, activity_type: string, description: string, evidence_url?: string }`
- **Returns:** `{ logged: boolean, total_hours: number, target_hours: number }`
- **Approval:** YES — confirm hours and activity before logging

#### `get_learning_progress`

Get the apprentice's overall learning progress.

- **Maps to:** Supabase progress tracking tables
- **Inputs:** `{ course_id?: string }`
- **Returns:** `{ courses: [{ course, modules_completed, modules_total, quiz_scores, time_spent }], overall_pct: number }`
- **Approval:** None (read-only)

#### `get_portfolio_status`

Check the apprentice's EPA portfolio completeness.

- **Maps to:** Supabase portfolio tables
- **Inputs:** `{}`
- **Returns:** `{ units: [{ unit_name, evidence_count, required_count, status: 'complete' | 'in_progress' | 'not_started' }], overall_ready: boolean }`
- **Approval:** None (read-only)

#### `log_site_diary`

Log a daily site diary entry.

- **Maps to:** Supabase site diary tables
- **Inputs:** `{ date: ISO-8601, activities: string, skills_demonstrated: string[], hours: number, supervisor_notes?: string, photos?: string[] }`
- **Returns:** `{ entry_id: uuid, logged: boolean }`
- **Approval:** YES — confirm entry before saving

#### `search_learning_videos`

Search the curated video library.

- **Maps to:** Supabase learning video tables
- **Inputs:** `{ query: string, category?: string, limit?: number }`
- **Returns:** `{ videos: [{ id, title, category, duration, url, thumbnail }] }`
- **Approval:** None (read-only)

#### `get_exam_results`

Get the apprentice's mock exam history and scores.

- **Maps to:** Supabase exam results tables
- **Inputs:** `{ exam_type?: string }`
- **Returns:** `{ exams: [{ exam_type, date, score_pct, pass, questions_total, time_taken }], best_scores: object }`
- **Approval:** None (read-only)

#### `run_epa_simulator`

Run an EPA (End-Point Assessment) simulator session.

- **Maps to:** Edge functions `epa-knowledge-quiz` + `epa-professional-discussion`
- **Inputs:** `{ mode: 'knowledge_test' | 'professional_discussion', topic?: string, difficulty?: 'standard' | 'stretch' }`
- **Returns:** `{ session_id: uuid, questions: [{ question, type, topic }] }` (knowledge test) OR `{ session_id: uuid, scenario: string, prompts: [] }` (professional discussion)
- **Approval:** None (practice simulation)

#### `run_am2_simulator`

Run an AM2 practical assessment simulator.

- **Maps to:** AM2 simulation engine
- **Inputs:** `{ module: 'safe_isolation' | 'testing' | 'fault_finding' | 'full_assessment', scenario?: string }`
- **Returns:** `{ session_id: uuid, scenario: string, steps: [{ step, instruction, expected_action }], time_limit_minutes: number }`
- **Approval:** None (practice simulation)

#### `get_site_diary_coaching`

Get AI coaching feedback on a site diary entry.

- **Maps to:** Edge functions `diary-coach` + `analyze-diary-entry`
- **Inputs:** `{ entry_id: uuid }` OR `{ entry_text: string }`
- **Returns:** `{ feedback: string, quality_score: number, improvement_suggestions: [], competencies_demonstrated: [] }`
- **Approval:** None (advisory)

#### `get_career_pathways`

Get career progression data, salary info, and growth sectors.

- **Maps to:** Supabase career data tables
- **Inputs:** `{ current_level?: string, interests?: string[] }`
- **Returns:** `{ pathways: [{ role, salary_range, requirements, growth_outlook, specialisms }], recommended_next_steps: [] }`
- **Approval:** None (read-only)

#### `get_apprentice_rights`

Get information about apprentice wages, rights, support contacts, and templates.

- **Maps to:** Supabase apprentice rights knowledge base
- **Inputs:** `{ topic?: 'wages' | 'rights' | 'support' | 'templates' | 'all' }`
- **Returns:** `{ info: string, contacts: [{ name, phone, url }], templates: [{ name, url }] }`
- **Approval:** None (read-only)

#### `log_mood_checkin`

Log a mental health mood check-in.

- **Maps to:** Supabase mood tracking tables (encrypted at rest, highest sensitivity)
- **Inputs:** `{ mood: 'great' | 'good' | 'okay' | 'low' | 'struggling', notes?: string, date?: ISO-8601 }`
- **Returns:** `{ logged: boolean, trend: string, resources_suggested: boolean }`
- **Approval:** None (personal — never shared without explicit consent)
- **IMPORTANT:** Mood data is never included in briefings, digests, or exports without explicit consent. If mood is 'low' or 'struggling', always signpost to Electrical Industries Charity (0800 652 0111).

#### `get_wellbeing_resources`

Get mental health and wellbeing resources.

- **Maps to:** Supabase wellbeing resources tables
- **Inputs:** `{ type?: 'breathing' | 'grounding' | 'crisis' | 'general' }`
- **Returns:** `{ resources: [{ title, type, content, url? }], crisis_contacts: [{ name, phone, available }] }`
- **Approval:** None (read-only)

#### `get_safety_scenarios`

Get interactive safety case studies for learning.

- **Maps to:** Supabase safety scenario tables
- **Inputs:** `{ topic?: string, difficulty?: 'basic' | 'intermediate' | 'advanced' }`
- **Returns:** `{ scenario: { title, description, questions: [{ question, options: [], correct_answer, explanation }] } }`
- **Approval:** None (read-only)

#### `submit_portfolio_for_review`

Submit a portfolio piece for AI quality review.

- **Maps to:** Edge function `review-portfolio-submission`
- **Inputs:** `{ submission_id: uuid, evidence_type: string, description: string, photos?: string[] }`
- **Returns:** `{ review: { quality_score: number, feedback: string, meets_criteria: boolean, improvement_areas: [] } }`
- **Approval:** None (advisory review)

#### `validate_evidence`

Validate the quality of portfolio evidence against EPA criteria.

- **Maps to:** Edge function `validate-evidence-quality`
- **Inputs:** `{ evidence_text: string, unit_reference: string, evidence_type: string }`
- **Returns:** `{ valid: boolean, quality_score: number, missing_elements: [], suggestions: [] }`
- **Approval:** None (advisory)

#### `get_toolbox_guides`

Access the 28 comprehensive study guides (toolbox guides).

- **Maps to:** Supabase toolbox guide tables
- **Inputs:** `{ guide_id?: string, topic?: string }`
- **Returns:** `{ guides: [{ id, title, topic, sections: [{ heading, content }], quiz_available: boolean }] }`
- **Approval:** None (read-only)

#### `search_training_providers`

Search for training providers and courses near the apprentice.

- **Maps to:** Edge function `find-training-providers`
- **Inputs:** `{ location?: string, course_type?: string, qualification?: string, distance_miles?: number }`
- **Returns:** `{ providers: [{ name, address, courses: [], distance, rating, url }] }`
- **Approval:** None (read-only)

---

### 17. APPRENTICE CALCULATORS (79 Specialist Tools)

The apprentice hub includes 79 specialist calculators beyond the 18 core professional calculators. All are pure functions — no approval required.

#### Categories:

**Electrical Engineering (20):**
`calculate_ac_power`, `calculate_ohms_law`, `calculate_diversity_factor`, `calculate_max_demand`, `calculate_earth_electrode`, `calculate_r1r2`, `calculate_ring_circuit`, `calculate_motor_starting_current`, `calculate_power_factor_correction`, `calculate_phase_rotation`, `calculate_series_parallel`, `calculate_star_delta`, `calculate_basic_ac_circuit`, `calculate_load`, `calculate_three_phase_power`, `calculate_wire_gauge`, `calculate_unit_conversion`, `calculate_energy_cost`, `calculate_efficiency`, `calculate_resistor_colour_code`

**Fault & Safety (5):**
`calculate_rcd_trip_time`, `calculate_rcd_discrimination`, `calculate_circuit_breaker_selection`, `calculate_bs7671_zs_lookup`, `calculate_adiabatic`

**Cable & Conduit (3):**
`calculate_trunking_fill`, `calculate_conduit_fill`, `calculate_conduit_bending`

**Renewable Energy (8):**
`calculate_solar_pv`, `calculate_solar_array`, `calculate_grid_tie_inverter`, `calculate_wind_power`, `calculate_micro_hydro`, `calculate_feed_in_tariff`, `calculate_led_driver`, `calculate_battery_storage`

**Lighting (3):**
`calculate_lumen`, `calculate_light_efficiency`, `calculate_led_driver`

**Specialist (4):**
`calculate_instrumentation`, `calculate_ip_rating`, `calculate_time_and_materials`, `calculate_power_quality`

All calculators accept structured inputs and return calculation results with validation status, formula references, and BS 7671 regulation citations where applicable.

---

### 18. BUSINESS TOOLS

#### `get_business_calculators`

Access the 13 business-specific calculators.

- **Tools available:** Job profitability, hourly rate, break-even, capacity planning, tax/NI estimator, VAT scheme comparison, staff cost, minimum charge, equipment ROI, cash flow planner, pricing strategy, quote variance tracker, CIS/CIS deduction helper
- **Inputs:** Vary per calculator
- **Returns:** Calculation results with recommendations
- **Approval:** None (read-only calculations)

#### `search_safety_alerts`

Search industry safety alerts and news.

- **Maps to:** Supabase safety alerts tables
- **Inputs:** `{ query?: string, category?: string, limit?: number }`
- **Returns:** `{ alerts: [{ title, date, category, summary, source }] }`
- **Approval:** None (read-only)

#### `search_job_vacancies`

Search electrical job vacancies (for employed electricians).

- **Maps to:** Supabase job vacancies tables
- **Inputs:** `{ location?: string, type?: string, min_salary?: number }`
- **Returns:** `{ vacancies: [{ title, company, location, salary, type, posted_date }] }`
- **Approval:** None (read-only)

---

## What The Agent Cannot Do

Refer to SECURITY.md for full restrictions. Key limits:

- Cannot access any table not listed above
- Cannot call raw SQL or bypass MCP tools
- Cannot send any outbound message without approval
- Cannot create or modify certificates (only deliver existing ones)
- Cannot process payments directly (Stripe links only)
- Cannot access other users' data (RLS-enforced)
- Cannot install packages, access filesystem, or modify its own skill files

---

## Version

| Field                     | Value                                                                                                       |
| ------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Version                   | 3.0.0                                                                                                       |
| Last updated              | 2026-03-01                                                                                                  |
| Tool count                | 122 core + 79 apprentice calculators                                                                        |
| Certificate types         | 8 (EIC, EICR, Minor Works, EV, Fire Alarm, Emergency Lighting, PAT, Solar PV)                               |
| Calculator count          | 97 (18 core + 79 apprentice)                                                                                |
| AI agents                 | 9 (installer, commissioning, maintenance, project mgmt, tutor, method statement, chat, cost engineer, RAMS) |
| AI visual tools           | 6                                                                                                           |
| Safety tools              | 21                                                                                                          |
| Edge functions mapped     | 60+                                                                                                         |
| Study centre courses      | 46                                                                                                          |
| Assessment questions      | 2,000+                                                                                                      |
| Apprentice learning tools | 14                                                                                                          |
| Toolbox guides            | 28                                                                                                          |
