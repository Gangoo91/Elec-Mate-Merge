# Notifications matrix: Employer Hub ↔ workers and apprentices

ELE-1988 / ELE-1986. Checked against the live database on 7 Oct 2026.

**How a notification travels**

- **Office bell**: `notify_employer_bell(firm, …)` sends to the firm owner **and every active manager** (`employer_admins`). If the type is registered in `notification_types`, it goes through `notify_user()` → `user_notifications` with **push** (subject to the person's category preference; one push per user, type and `ref_id` per day). Otherwise it is a bell-only row in `employer_notifications`.
- **Worker bell**: `worker_notify(user, …)` writes an `employer_notifications` row and sends a **push** (`team_push`).
- Both appear in the one header bell (`useUserNotifications`, realtime on both tables). Tapping a row opens its deep link.
- `employer_notifications.employee_id`, `job_id` and `action_url` are filled by the `fill_employer_notification_fields` BEFORE INSERT trigger. It uses the metadata (`employee_id`, `leave_id`, `expense_id`, `timesheet_id`, `issue_id`, `task_id`, `incident_id`, `location_id`, OTJ `entry_id`) and falls back to the recipient's own roster record on worker-facing rows. Office rows carry the worker's id, and RLS only shows a row to its `user_id`.
- **Office email**: goes to `company_profiles.notification_email` (Settings → Notifications → Office email). Flow: `queue_office_email()` → `net.http_post` → edge function `employer-office-alert`. `employer_office_email_log` (unique employer + kind + ref) means each event is emailed once at most.
- Every notify trigger and both senders end in `exception when others → raise warning`, so a failing notification can never block the write that caused it. This was tested by forcing the notification tables to reject inserts: the timesheet, incident and progress note writes still committed.

## Worker / apprentice → office

| Event | Office bell | Push | Office email | Deep link | Trigger / function |
|---|---|---|---|---|---|
| Timesheet submitted | ✓ | ✓ | Weekday summary (count + oldest) | `/employer?section=timesheets&tab=pending` | `trg_notify_timesheet_submission` on `employer_timesheets` |
| Leave requested | ✓ | ✓ | Weekday summary (count) | `/employer?section=timesheets&tab=leave` | `trg_notify_leave_request` on `employer_leave_requests` |
| Approved leave cancelled by worker | ✓ | ✓ | — | `/employer?section=timesheets&tab=leave` | RPC `cancel_my_leave_request` |
| Expense claimed | ✓ | ✓ | Weekday summary (count) | `/employer?section=expenses` | `trg_notify_expense_claim` on `employer_expense_claims` |
| Snag reported | ✓ | ✓ | — | `/employer?section=quality` | `trg_notify_snag` on `job_issues` |
| Job pack signed | ✓ | ✓ | — | `/employer?section=jobpacks` | `trg_notify_pack_ack` on `employer_job_pack_acknowledgements` |
| Task marked Done / Blocked | ✓ | ✓ | — | `/employer?section=jobs&job=<id>` | `trg_notify_task_status` on `employer_job_tasks` |
| Comment on a task | ✓ | ✓ | — | `/employer?section=jobs` | `trg_notify_task_comment` on `employer_job_comments` |
| **Progress note** (new) | ✓ | bell only | — | `/employer?section=progresslogs` | `notify_progress_note` → `trg_notify_progress_note` on `employer_job_comments` (`comment_type='progress'`) |
| **Incident / near miss reported** | ✓ | ✓ | **✓ instant** | `/employer?section=incidents&incident=<id>` | `notify_incident` on `employer_incidents` (+ `queue_office_email`) |
| Corrective action completed | ✓ | ✓ | — | `/employer?section=incidents&incident=<id>` | RPC `complete_my_incident_action` |
| Apprentice OTJ hours submitted / resubmitted | ✓ | ✓ | — | `/employer?section=apprentices&entry=<id>` | `notify_employer_otj_submission` on `college_otj_entries` |
| **Briefing signed** (new) | ✓ to the briefing's creator (+ managers) | ✓ (one per briefing per day) | — | `/employer?section=briefings` | `notify_briefing_signed` → `trg_notify_briefing_signed` on `briefing_attendees` (notify only; quiet when signed on the presenter's own device) |
| Certificate sent for QS review | ✓ | ✓ (`qs_review_push`) | — | `/employer?section=qsreviews` | RPC `submit_report_for_qs_review` (row now tappable via the fill trigger) |
| **Worker joined the team** (new) | ✓ | ✓ | — | `/employer?section=team&member=<id>` | `notify_team_member_joined` → `trg_notify_team_member_joined` on `employer_seats` |
| Team invite declined | ✓ | — | — | `/employer?section=team` | RPC `respond_team_invite` |
| Manager accepted invite | ✓ (owner) | ✓ | — | `/employer?section=settings` | RPC `respond_co_admin_invite` |

## Office → worker / apprentice

| Event | Worker bell | Push | Deep link | Trigger / function |
|---|---|---|---|---|
| Added to a job | ✓ | ✓ | `/electrician/worker-tools/jobs` | `trg_notify_assignment` on `employer_job_assignments` |
| **Task assigned** (was push only) | ✓ | ✓ | `/electrician/worker-tools?task=<id>` | `trg_notify_task_assignment` on `employer_job_tasks` |
| **Office comment on a task** (was push only) | ✓ | ✓ | `/electrician/worker-tools?task=<id>` | `trg_notify_task_comment` (managers now count as office) |
| **Job pack to sign** (was push only) | ✓ | ✓ | `/electrician/worker-tools/signoffs?signoff=<id>` | `trg_notify_pack_ack` |
| **Job pack chase** (was push only) | ✓ | ✓ | `/electrician/worker-tools?signoff=<id>` | RPC `chase_pack_signoff` |
| Timesheet approved / rejected, **now with the reason** | ✓ | ✓ | `/electrician/worker-tools/timesheets` | `trg_notify_timesheet_decision` |
| Leave approved / declined with the reason | ✓ | ✓ | `/electrician/worker-tools/leave` | `trg_notify_leave_decision` (`rejected_reason`, set by the decline sheet) |
| Expense approved / rejected (reason) / paid | ✓ | ✓ | `/electrician/worker-tools/expenses` | `trg_notify_expense_decision` |
| Snag resolved | ✓ | ✓ | `/electrician/worker-tools/reports` | `trg_notify_snag_decision` |
| New message / notice | ✓ | ✓ | `/electrician/worker-tools/comms` | `trg_notify_communication` on `employer_communication_recipients` |
| Status changed by the office | ✓ | ✓ | `/electrician/worker-tools/status` | `notify_worker_status_override` on `employer_worker_locations` |
| Your safety report was seen | ✓ | ✓ | `/electrician/worker-tools/reports` | RPC `acknowledge_incident` |
| Your safety report was closed | ✓ | ✓ | `/electrician/worker-tools/reports` | `notify_incident` (UPDATE) |
| Incident on your team (supervisor / apprentice co-ordinator) | ✓ | ✓ | `/electrician/worker-tools/reports` | `notify_incident_supervisors` |
| Safety action assigned to you | ✓ | ✓ | `/electrician/worker-tools/reports` | `notify_incident_action_owners` |
| Apprentice hours to confirm (supervisor) | ✓ | ✓ | `/electrician/worker-tools/apprentice-hours?entry=<id>` | `notify_otj_supervisors` |
| OTJ hours confirmed / sent back by employer | ✓ | ✓ | `/apprentice/ojt-hub` | `notify_employer_otj_submission` (UPDATE) |
| QS approved / returned your certificate | ✓ | ✓ | `/electrician/worker-tools/qs-reviews` | RPCs `approve_qs_review`, `return_qs_review` |
| Asked to be a manager | ✓ | ✓ | `/dashboard` | RPC `invite_co_admin` |

## Clients → office

| Event | Office bell | Push | Office email | Deep link | Trigger / function |
|---|---|---|---|---|---|
| Client portal message | ✓ (now owner + managers) | — | — | `/employer?section=clientportal` | `notify_client_portal_message` on `employer_client_messages` |
| New lead / quote request | ✓ (owner) | ✓ | — | `/employer?section=leads` | `notify_owner_new_lead` on `employer_leads` |
| Quote accepted / declined | ✓ | ✓ | — | `/employer?section=quotes&quote=<id>` | RPC `decide_employer_quote` |
| **Invoice paid** | ✓ (existing invoice-paid bell) | ✓ | **✓ instant** | `/electrician/invoices/<id>` | `trg_office_email_invoice_paid` on `quotes` (`invoice_status → paid`) and on `invoices` (`paid_at` set) → `notify_office_invoice_paid` |

## Daily, office (cron job 147 `daily-compliance-expiry-reminders`, 08:15 UTC)

`notify_compliance_expiries()` now also calls `notify_employer_expiries()`. This extends the existing job; no new cron job was added. Each dated item rings the bell once about 30 days before, once inside 7 days and once when overdue (up to 60 days late). Type is `employer_expiry` (bell + push), and `ref_id` is unique per item, date and stage.

| Item | Source | Deep link |
|---|---|---|
| Vehicle MOT, road tax, insurance, service due (not "Off Road") | `vehicles` | `/employer?section=fleet` |
| Policy review date (not Draft / Archived) | `employer_policies.review_date` | `/employer?section=policies` |
| Compliance document expiry | `compliance_documents.expiry_date` | `/employer?section=compliance` |
| Tool PAT test / calibration due | `employer_company_tools` | `/employer?section=procurement` |
| Team member certificate expiry | `employer_certifications` | `/employer?section=team&member=<id>` |
| RAMS not approved/issued for a job starting within 3 days | `rams_documents.employer_job_id` → `employer_jobs.start_date` | `/employer?section=rams` |
| **Office summary email** (weekdays, only when something is waiting): timesheets, leave and expenses awaiting approval, plus renewals due in 30 days | same sources | `/employer` |

RAMS have no review or expiry date in the schema. The RAMS alert is therefore "not signed off before the job starts".

## Not notified, by design

- Office-entered records (office adds leave, logs an incident, adds a progress note, ticks a briefing signature on the presenter's device): the office already knows.
- Worker clock-in/out (presence): shown live on Tracking, not as a bell.
- Comms read receipts: shown in Comms.
