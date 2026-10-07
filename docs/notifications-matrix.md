# Notifications matrix: Employer Hub ↔ workers and apprentices

ELE-1988 / ELE-1986. **Re-verified against the live database on 7 Oct 2026 (afternoon)**: every producer below was fired inside a rolled-back transaction and the rows it wrote were captured (recipient, title, message, link). Every link was then opened in a browser at 390×844 and 1440×900 as the demo worker (who is also a manager of the demo firm), and test rows were clicked in the bell.

Migrations: `20261007340000_employer_notifications_audit`, `20261007340100_notif_tidy_spaces_manager_quote_links`, `20261007340200_notif_copy_polish`.

## How a notification travels

- **Office bell**: `notify_employer_bell(firm, …)` sends to the firm owner **and every active manager** (`employer_admins`, Admin and Office alike). A registered type (`notification_types`) goes through `notify_user()` → `user_notifications.link` + push (one per user, type and `ref_id` per day, subject to the category switch). Otherwise it is a bell-only `employer_notifications` row.
- **Worker bell**: `worker_notify(user, …)` writes `employer_notifications.action_url` and pushes through `team_push`. It **skips an Archived roster member** when the caller passes `employee_id`, and the triggers also filter Archived rows when they look the worker up.
- **Firm money / quote events**: `notify_company(owner, …)` → owner + managers, except **payment events (`invoice_paid`, `payment_failed`, `payment_recovered`, `invoice_due_soon`) go to the owner and Admin managers only, never Office managers**. A manager's copy of a quote/invoice event links into the Employer Hub (`/employer?section=quotes&quote=<id>` or `&tab=invoices`), not the owner's sole-trader page.
- **One tidy rule at every sink** (`_notif_tidy`): capital first letter, no em dashes (" — " becomes ", "), single spaces. Applied in `worker_notify`, `notify_employer_bell`, `notify_company`, `notify_user` (non-college types; college types keep their capital-only rule), and the BEFORE INSERT triggers on `employer_notifications` and `user_notifications`, so edge functions that insert directly are covered too.
- **Link field**: the bell (`useUserNotifications`) reads `link` / `action_url`, falling back to `metadata.route`. Pushes carry `data.route` **and** `data.deep_link` (`team_push` now adds `deep_link`). The service worker honours `route`, then `deep_link`; the native handler honours `route`. Before this, every web/PWA team push opened `/employer/team`, which is not a route.
- **Tapping a row** marks it read (`read_at` on `employer_notifications`, `is_read` + `read_at` on `user_notifications`) and navigates.
- **Unknown or old `section` keys** (`incident`, `invoices`, `progress`, `messages`…) resolve through `URL_SECTION_ALIASES` in `EmployerDashboard.tsx`; anything else falls back to the overview instead of crashing the hub.
- **Office email**: `company_profiles.notification_email` via `queue_office_email()` → `employer-office-alert` (once per employer + kind + ref).
- Every trigger and sender ends in `exception when others → raise warning`; a failing notification never blocks the write.

## Worker / apprentice → office (owner + every active manager)

| Event | Title (as written) | Deep link | Channel | Producer |
|---|---|---|---|---|
| Timesheet submitted / resubmitted | Timesheet submitted / resubmitted | `/employer?section=timesheets&tab=pending` | bell + push, weekday email summary | `trg_notify_timesheet_submission` |
| Leave requested | Leave request | `/employer?section=leave` | bell + push, email summary | `trg_notify_leave_request` |
| Approved leave cancelled | Approved leave cancelled | `/employer?section=leave` | bell + push | RPC `cancel_my_leave_request` |
| Expense claimed | Expense claim | `/employer?section=expenses&expense=<id>` (opens the claim) | bell + push, email summary | `trg_notify_expense_claim` |
| Snag reported | Snag reported | `/employer?section=quality&job=<job>` | bell + push | `trg_notify_snag` |
| Job pack signed | Job pack signed | `/employer?section=jobpacks&job=<job>` | bell + push | `trg_notify_pack_ack` |
| Task done / blocked | Task done / Task blocked | `/employer?section=jobs&job=<job>` | bell + push | `trg_notify_task_status` |
| Comment on a task | Comment on task | `/employer?section=jobs&job=<job>` (was `section=jobs` only) | bell + push | `trg_notify_task_comment` |
| Progress note | <Name> added a progress note | `/employer?section=progresslogs&job=<job>` | bell | `notify_progress_note` |
| Finished my part / back on the job | <Name> finished their part / is back on the job | `/employer?section=jobs&job=<job>` | bell | RPCs `finish_my_part`, `reopen_my_part` |
| Incident / near miss | Near miss reported by <Name> | `/employer?section=incidents&incident=<id>` | bell + push + instant email | `notify_incident` |
| Safety action done | Safety action done | `/employer?section=incidents&incident=<id>` | bell + push | RPC `complete_my_incident_action` |
| Apprentice OTJ hours | <First name> logged N training hours | `/employer?section=apprentices&entry=<id>` | bell + push | `notify_employer_otj_submission` |
| Reply in a comms thread | <Name> replied | `/employer?section=comms&thread=<id>` | bell + push | RPC `comms_reply` |
| Worker joined | <Name> joined your team | `/employer?section=team&member=<id>` | bell + push | `notify_team_member_joined` |
| Team invite declined | <Name> said the invite isn't for them | `/employer?section=team&tab=invited&member=<id>` | bell | RPC `respond_team_invite` |
| Manager accepted | <Name> is now a manager | `/employer?section=settings` (Managers card) | bell + push, **owner only** | RPC `respond_co_admin_invite` |
| Certificate for QS review | Certificate awaiting QS review | `/employer?section=qsreviews&review=<id>` | bell + push, **owner + Admin managers** (they can sign) | RPC `submit_report_for_qs_review` |
| Briefing signed (Site Safety, not changed here) | Briefing signed | `/employer?section=briefings` | bell + push | `notify_briefing_signed` |

## Clients → office

| Event | Recipients | Title | Deep link | Producer |
|---|---|---|---|---|
| Quote-page lead | owner + **all** managers (was owner only) | New quote request | `/employer?section=leads&lead=<id>` (opens the lead) | `notify_owner_new_lead` |
| Client portal message | owner + managers | New message from <client> | `/employer?section=clients&client=<id>&tab=messages` | `notify_client_portal_message` |
| Quote viewed / accepted | owner (`/electrician/quote-builder/<id>`), managers (`/employer?section=quotes&quote=<id>`) | <Client> viewed / accepted your quote | per recipient | `mark_quote_viewed`, `trigger_quote_signed_push` → `notify_company` |
| Invoice paid (legacy `invoices` table) | owner + **Admin** managers only | <Client> has paid | owner `/electrician/invoices`, Admin `/employer?section=quotes&tab=invoices` | `trigger_invoice_paid_push` → `notify_company` |
| Invoice paid (office email) | `notification_email` | <Client> paid <number> | `/employer?section=quotes&invoice=<id>` (quotes) or `/electrician/invoices` (legacy) | `notify_office_invoice_paid` → `employer-office-alert` (**edited, not deployed**) |
| Signature signed / declined (ELE-1993) | owner + managers | <Name> signed / declined <document> | `/employer?section=signatures&request=<id>` | `sign_signing_document`, `decline_signing_document` |

## Office → worker (that worker's active roster user only)

| Event | Title | Deep link | Producer |
|---|---|---|---|
| Added to a job | New job assignment | `/electrician/worker-tools/jobs?job=<id>` (opens the job; was the list) | `trg_notify_assignment` |
| Week changed (batched) | Your week has changed | `/electrician/worker-tools/my-week?week=<monday>` | `flush_dispatch_changes` (cron 197, every minute) |
| Task assigned | New task: <title> | `/electrician/worker-tools/tasks?task=<id>` | `trg_notify_task_assignment` |
| Office comment on a task | Comment on: <title> | `/electrician/worker-tools/tasks?task=<id>` | `trg_notify_task_comment` |
| Task due today | Due today: <title> | `/electrician/worker-tools/tasks?task=<id>` | `notify_task_due_reminders()`, **cron 198, 05:45 UTC** |
| Job pack to sign / chase | Job pack to sign / Reminder: sign your job pack | `/electrician/worker-tools/signoffs?signoff=<id>` | `trg_notify_pack_ack`, RPC `chase_pack_signoff` |
| Timesheet approved / rejected | Timesheet approved / rejected | `/electrician/worker-tools/timesheets` | `trg_notify_timesheet_decision` |
| Leave approved / declined / booked by office | Leave approved / declined / booked for you | `/electrician/worker-tools/leave` | `trg_notify_leave_decision`, `trg_notify_leave_request` |
| Expense approved / rejected / paid | Expense <status> | `/electrician/worker-tools/expenses` | `trg_notify_expense_decision` |
| Snag resolved | Snag resolved | `/electrician/worker-tools/reports?job=<job>` | `trg_notify_snag_decision` |
| Report seen / closed / action for you / incident on your team | The office has seen your report, … | `/electrician/worker-tools/reports?job=<job>&incident=<id>` (scrolls to and outlines the report) | `acknowledge_incident`, `notify_incident`, `notify_incident_action_owners`, `notify_incident_supervisors` |
| New team message / office reply / chase | <message title> / Reply: … / Please acknowledge: … | `/electrician/worker-tools/comms?thread=<id>` | `trg_notify_communication`, `comms_reply`, `comms_chase` |
| Status changed by the office | Your status was changed | `/electrician/worker-tools/status` | `notify_worker_status_override` |
| Apprentice hours to confirm (supervisor) | <Name> logged N training hours | `/electrician/worker-tools/apprentice-hours?entry=<id>` | `notify_otj_supervisors` |
| OTJ hours confirmed / sent back | <Name> confirmed your hours | `/apprentice/ojt-hub?entry=<id>` | `notify_employer_otj_submission` |
| QS approved / returned your certificate | Certificate approved / returned by QS | `/electrician/worker-tools/qs-reviews?review=<id>` (opens it) | `approve_qs_review`, `return_qs_review` |
| Colleague's certificate for you to review (team QS) | Certificate awaiting QS review | `/electrician/worker-tools/qs-reviews?side=review&review=<id>` (bell + push; was push-only to an `/employer` link a worker cannot open) | `submit_report_for_qs_review` |
| QS review withdrawn (team QS) | QS review withdrawn | `/electrician/worker-tools/qs-reviews?side=review` | `cancel_qs_reviews_on_report_delete` |
| Asked to be a manager | <Firm> asked you to be a manager | `/dashboard` (accept sheet shows on every page) | `invite_co_admin` |

## Daily, office (cron 147, 08:15 UTC)

`notify_compliance_expiries()` → `notify_employer_expiries()`: vehicles (`section=fleet`), policies (`section=policies`), compliance documents (`section=compliance`), tools (`section=procurement`), team certificates (`section=team&member=<id>`), RAMS not signed off before the job (`section=rams`); 30 days, 7 days and overdue. Weekday office summary email when something is waiting.

## Not notified, by design

Office-entered records (the office already knows), clock-in/out (shown live on Tracking), comms read receipts, the author of a reply, and anything for an Archived worker.

## Known gaps (not fixed here)

- Edge functions edited but **not deployed**: `employer-office-alert`, `stripe-connect-webhook`, `manage-employer-seats`.
- `quote-page-notify` (email to the firm) still links `/employer?section=leads` without `&lead=`; file was being edited by another session.
- Jobs section ignores `&task=`: task events open the job, not the task.
- Several electrician-hub senders (enquiries, public-booking, release-certificate, invoice-payment-prompts, docusign, quote-action) still use Title Case, emoji or no link; see the audit report.
