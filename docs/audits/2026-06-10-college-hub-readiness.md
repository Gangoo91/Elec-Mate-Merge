# College Hub — Production Readiness Audit

**Date:** 2026-06-10
**Scenario tested:** A paying FE college signs today and onboards 200 apprentices in 14 days.
**Method:** Live Supabase schema/RLS/advisor inspection + four parallel code-reconnaissance passes over the routed (live) code paths. Every P0/P1 below is confirmed against the live path or the live DB — subagent claims that did not survive verification are listed in §0 so they don't pollute the register.

---

## 0. Corrections — subagent claims that FAILED verification

Three "P0" findings from the automated passes are **false positives**. Recording them so nobody burns 14 days fixing non-bugs (the same over-correction trap that has bitten this repo before — RAG absence ≠ fabrication, and here, an *assumed* FK ≠ the real FK).

| Claimed P0 | Reality (verified) |
|---|---|
| "FK domain mismatch — `college_student_assignments.tutor_id/assessor_id/iqa_id` FK to `college_staff.id`, so tutors/assessors see zero students" | **FALSE.** DB FKs show these columns reference **`profiles.id`**. The hooks (`usePortfolioSubmissions.ts:88`, `useCollegePortfolios.ts:199`, `useEPAGateway.ts:175`) filter `.eq('assessor_id', user.id)` where `user.id` = `auth.uid()` = `profiles.id`. The comparison is **correct**. RLS policies on these tables also compare `csa.tutor_id = auth.uid()` — consistent. Not a bug. |
| "`useAssessorActions.ts:243` writes `auth.uid()` into a `college_staff.id` FK → orphaned rows" | **FALSE.** `assessor_observations.assessor_id` FK → `profiles.id`. Writing `auth.uid()` is correct. |
| "Broadcast silent — no notification system exists at all" | **PARTLY FALSE.** Edge functions `notify-otj-status`, `notify-tutor-otj`, `notify-student-message`, `notify-college-message` exist and **are** invoked (from `useStudentOtjVerification`, `useTutorOtjInbox`, `collegeChatService`). The real gap (below, P1-N1) is narrower: grades, observations, attendance, ILP reviews, EPA-ready and safeguarding flags do **not** notify. |

The `college_staff.id` vs `auth.uid()` trap **is** real in this codebase generally — but not on the tables the passes flagged. It bites where a column FKs to `college_staff.id` (e.g. `college_iqa_findings.assessor_id`, `college_iqa_samples.iqa_id`). Those need a separate targeted sweep (P1-D2).

**Phase 4/7 (persona + UX) pass — claims that failed verification:**

| Claimed | Reality (verified) |
|---|---|
| P0: "Apprentices have no dashboard / no learning-journey view" | **FALSE.** The pass was scoped to `/college/*` pages so it never saw the apprentice surface. `/apprentice/hub` (`UnifiedApprenticeHub`) is a full dashboard; `useMyIlp`, `useMyAssignedQuizzes`, `MyOtjSubmitCard` are wired. Apprentices have a dedicated hub. |
| P0: "IQA sampling plan never reaches Completed — no sign-off action exists" | **PARTLY FALSE / downgraded.** `useIQASampling.ts:256` exposes a `completeVerification` mutation (per-sample → `verified`/`concerns_raised`). Per-sample completion exists; only a *plan-level* rollup/close button is missing — that's P2 polish, not a P0 audit-trail gap. |
| P0: "Bulk role assignment = 600+ clicks per intake" | **Reframed (and worse).** There is no per-learner assign UI to click at all — see P0-11. The defect is a missing write path, not click-count. |

---

## 1. The headline: two disjoint student identities that never join

This is the single most important finding and the reason I would not onboard 200 apprentices on the current build without a fix.

There are **two parallel student-linking models**, with different ID spaces, different RLS, and different write paths — and **nothing reliably joins them**:

| Model | Table | Keyed by | Hangs off it |
|---|---|---|---|
| **A — "the roll"** | `college_students` | `college_students.id`; `user_id` → `profiles` (**nullable**) | attendance, grades, EPA, ILP (`student_id` → `college_students.id`), cohorts |
| **B — "assignments"** | `college_student_assignments` | `student_id` → `profiles.id` (= login) | portfolio, OTJ, quizzes, the tutor/assessor/IQA dashboards |

The two write paths populate **different** tables:

- **`accept_college_invite` RPC** (student accepts an invite code): inserts into **`college_student_assignments` only**. Does **not** insert `college_students`, does **not** set `profiles.college_id`.
- **`BulkAddStudentsSheet` / CSV paste**: inserts into **`college_students`** with **`user_id = null`** (`BulkAddStudentsSheet.tsx:287`). Creates no assignment, no login link.

So a learner who is bulk-imported to the roll and the same learner who later logs in and accepts an invite become **two unrelated records**. Attendance/grades/EPA/ILP attach to model A; their actual portfolio/OTJ/login lives in model B; the join (`college_students.user_id`) is set by hand or not at all.

**Live proof from current seed data:**
- 9 students on the roll, **6 have `user_id = NULL`** (never linked to a login).
- 1 assignment row exists total; **2 of 3 linked roll-students have no assignment**.

At 9 records this is "messy." At 200 it is a guaranteed support fire on week 1: tutors mark attendance for roll-students who can't see it, apprentices log OTJ that never appears against their grade record, and Student 360 shows half a person. **P0.**

---

## 2. Technical Debt Register

Severity: **P0** = blocks a 200-apprentice launch · **P1** = fix within 30 days · **P2** = later.

### P0 — Must fix before launch

| # | Area | Evidence | Issue | Impact at 200 |
|---|---|---|---|---|
| P0-1 | Data model | §1; `accept_college_invite`, `BulkAddStudentsSheet.tsx:287` | Two disjoint student identities; no reliable link between `college_students` and `college_student_assignments`/`profiles`. | Attendance/grades/EPA/ILP detach from portfolio/OTJ/login. Student 360 fragments. Mass manual reconciliation. |
| P0-2 | Onboarding | `accept_college_invite` (student branch); FK `college_grades/attendance/epa/ilps.student_id → college_students.id` | Facet of P0-1, stated precisely: the student invite creates **only** a `college_student_assignments` row and **no `college_students` row**. But grades/attendance/EPA/ILP all FK their `student_id` to `college_students.id`. So for an invited-only learner those rows **cannot be created at all** (FK has nothing to point at), and the student-self-read branch (`cs.user_id = auth.uid()`) has no roll row to match. (NB: the mechanism is the missing roll row + FK, **not** a `profiles.college_id`/`_ch_same_college` gate as I first wrote — `_ch_same_college` keys off the *querying staff's* `college_id`, which the staff invite does set.) | Tutors literally cannot record attendance/grades/EPA for any apprentice who joined by invite code rather than bulk import. |
| P0-3 | Onboarding | `accept_college_invite` student branch — `qualification_id` fallback `(SELECT id FROM qualifications LIMIT 1)` | If the apprentice has no active qualification selection, they're assigned an **arbitrary** qualification. | Wrong course/KSBs/EPA standard attached to real learners. Corrupts the entire 360 + EPA chain. |
| P0-4 | Performance | `useEPAGateway.ts:180-184` | N+1: `for (const assignment …) await fetchSingleGateway(...)`, each doing 3+ sequential queries. | 200 learners × ~3 sub-queries serialized = page load 30s+ / timeouts on college wifi. EPA dashboard unusable. |
| P0-5 | Performance | `useCollegePortfolios.ts:208-218`; `usePortfolioSubmissions.ts:99-121` | `.in('user_id', studentIds)` on `portfolio_items` + `portfolio_submissions` with **no `.range()`/`.limit()`**; client-side aggregation of the full set. | 200 learners × dozens of items = 10k+ rows per refetch. Mobile memory/jank. Degrades within days. |
| P0-6 | Security (RLS) | Advisor: `rls_disabled_in_public` | **6 public tables with RLS disabled**, including **`user_settings`** and **`_nathan_recovery_chunks`** (a leftover recovery table). | `user_settings` exposed/writable cross-user. A college doing due diligence will fail you here. Drop `_nathan_*`; enable RLS on `user_settings`. |
| P0-7 | Security (views) | Advisor: `security_definer_view` (22) | 22 `SECURITY DEFINER` views selectable by `authenticated` (incl. `v_assessor_workload`, practical-work views) bypass the querying user's RLS. | Cross-college / cross-user data leakage vector through views. Must audit each; convert to `security_invoker` where possible. |
| P0-8 | Security (storage) | Advisor: `public_bucket_allows_listing` (16) | `portfolio-evidence`, `evidence-files`, `certificates`, `cv-documents` are **public buckets with broad SELECT** → any authenticated user can **list and read every learner's evidence/cert/CV**. | Learner PII + assessment evidence browseable across colleges. Direct GDPR breach. Hard blocker for a data-processor agreement. |
| P0-9 | Validation | `BulkAddStudentsSheet` (no ULN/dup-account guard beyond email); grade inputs accepted as free strings | No server-side constraint on grade enum or score range; bulk import dedupes on email only, `user_id` left null. | Invalid grades aggregate into EPA recommendations; duplicate/059 learners; no integrity guarantee. |
| ~~P0-10~~ → **P1-MUT** | Mutations | verified below | Downgraded after direct verification — real, but narrower than first claimed and caller-fixable. | See corrected entry P1-MUT. |

| P0-11 | Data model / UX | live-verified: 8 SELECTs on `college_student_assignments`, **zero writes**; `accept_college_invite` inserts the row but sets no `tutor_id/assessor_id/iqa_id`; `usePortfolioSubmissions.ts:88`, `useEPAGateway.ts:173`, `useCollegePortfolios.ts:182`, `useIQASampling.ts:59` filter on those columns and `return []` with no fallback | **No mechanism exists to assign a tutor/assessor/IQA to a learner** in the table the dashboards read. Invite-created rows have NULL role columns; nothing populates them. Compounds P0-1 (cohorts carry a *separate* per-cohort `cohort.tutor_id`, a third parallel model). | Assessor queue, EPA gateway, IQA sampling, portfolio review render **empty for everyone** in production. (`TutorTodayPage`/`AiNotebookPage` survive only because they fall back to "all college learners" — the others don't.) |

### P1 — Within 30 days

| # | Area | Evidence | Issue |
|---|---|---|---|
| P1-D1 | DB indexes | Advisor `unindexed_foreign_keys` (subset shown) | ~60 FKs without covering indexes across `college_*`/`portfolio_*`/`epa_*` (`college_ilps.tutor_id`, `college_iqa_findings.*`, `college_scheduled_assessments.student_id`, `portfolio_submissions.iqa_sampled_by`, etc.). Seq-scans grow with the roll. |
| P1-D2 | RLS id-space | `college_iqa_findings.assessor_id/iqa_id`, `college_iqa_samples.iqa_id` FK → `college_staff.id` | Targeted sweep needed: any hook comparing these to `auth.uid()` silently returns zero. (Real version of the trap the passes mis-located.) |
| P1-N1 | Notifications | edge fns exist for OTJ/messages only | Grades, observations, attendance, **ILP reviews, EPA-ready, safeguarding flags** trigger **no** apprentice/employer notification. Feedback never reaches the learner; safeguarding escalation never leaves the college surface. |
| P1-I1 | Integration | `Student360Page.tsx` render loop | Study Centre quiz attempts (`quiz_attempt`), mock exams, Elec-ID, site diary, AI-tool usage are **not** surfaced in Student 360. Tutor is blind to the apprentice's actual learning activity. |
| P1-I2 | Integration | Employer hub | **Zero** college↔employer data flow. `TripartiteReviewSheet` lets a tutor *request* a review the employer can never see. Tripartite review is one-way theatre. |
| P1-RT | Realtime | `useWorkQueueState.ts:67-85` | Subscription cleanup not guarded on `collegeId` change → double-subscribe / stale data on context switch. (Most other channels correctly use `realtimeChannelName()`.) |
| P1-IQA | Mutations | `useIqaWorkflow.ts:430-471` | Optimistic `addFinding` with shallow rollback context; server reject can drop a finding silently — audit-trail integrity. |
| P1-PG | Platform | Advisor `vulnerable_postgres_version` (`supabase-postgres-15.8.1.079`) | Outstanding security patches; schedule the managed upgrade. |
| P1-MFA | Auth | Advisor `auth_insufficient_mfa_options` | Only one MFA factor enabled. A college handling safeguarding data will expect MFA available for staff. |
| P1-UX1 | UX | `Student360Page` per-section loading | Sections render before their data → blank flicker; no skeletons. |
| P1-UX2 | UX | `IqaSamplingPlanPage`, `CohortComparePage` | Wide tables, no responsive treatment → unusable on a tutor's phone. Violates the mobile-flat/full-width house rule. |
| P1-OPS | Ops | (no Sentry refs in college routes) | No error monitoring/alerting wired for college surfaces → support is blind; first signal of breakage is an angry college. |
| P1-MUT | Mutations (verified) | `useCollegeGrades.ts`/`useCollegeAttendance.ts` (no `onError`); `RubricGradingDialog.tsx:182`, `RecordGradeDialog.tsx:93`, `TakeAttendanceDialog.tsx:147` | **Verified, corrected from P0-10.** The hooks have no `onError` — true, but most callers handle errors, so it is NOT universal silent loss. Real defects: (1) `RubricGradingDialog` and `RecordGradeDialog` wrap **`.mutate()`** (fire-and-forget — does **not** throw) in a `try/catch`. The catch can never fire on a mutation failure, and there's no hook `onError` → **grade-save failures are genuinely swallowed with no toast** in 2 of 3 grade-entry paths. (2) `TakeAttendanceDialog` correctly `await`s but the catch only `console.error`s — **no error toast**, so a failed register save gives the tutor no message (dialog does stay open, so not a false "saved"). `RecordGradeSheet.tsx:140` is the correct pattern (`mutateAsync` + toast). Fix: add `onError` toasts to the hooks (covers all callers) and switch the two dialogs to `mutateAsync`. ~3h. Not a launch-blocker (data re-enterable, low frequency) but a real data-trust bug. |

### P2 — Later

| # | Area | Evidence | Issue |
|---|---|---|---|
| P2-1 | Dead code | §3 | ~1/3 of apprentice-side files unreachable; 34 orphaned `pages/apprentice/*`; `portfolio/*` 100% dead; `portfolio-hub/ai/*` dead; duplicate `Quiz.tsx`. |
| P2-2 | Settings cache | `useCollegeSettings.ts:120` | 60s staleTime → settings changes lag up to a minute; minor confusion. |
| P2-3 | Logging | `console.error` left in `useCollegeSettings`, `useWorkQueueState`, `useIqaWorkflow` | Replace with structured logging. |
| P2-4 | Hygiene | `src/pages/apprentice-courses.FullName` | Git/PowerShell artifact file; delete. |
| P2-5 | Maintainability | 28 `rls_policy_always_true` policies | Mostly legitimate service-role rows, but audit — `user_consents`/`briefing_attendees` "anyone can insert/update" warrant a look. |
| P2-6 | Confusing config | `CurriculumSettingsPage`, `OperationalSettingsPage` | Compliance thresholds (sampling %, attendance band) have no help text → mis-set silently. |

---

## 3. Architecture & dead code

**Routes:** 31 college routes, all lazy, all behind `CollegeGuard` (which checks `profile.college_id` **only** — no tutor/IQA/assessor differentiation at the gate; role separation relies on in-page logic and RLS). Apprentice side: `/apprentice` → `ApprenticeHub`, `/apprentice/hub` → `UnifiedApprenticeHub`. `portfolio-hub/*` route retired (redirects to `/apprentice/hub`) but its `comments/`, `SupervisorVerificationQRSheet`, `EvidenceValidationReport` components are still live — directory name is misleading, not dead.

**Dead code (~32-40% of ~950 apprentice files):** `components/portfolio/*` (5 files, 100% dead), `portfolio-hub/ai/*` (SmartCaptureFlow/KSBMappingAssistant, 0 imports), `apprentice/content/subsection*` archive trees, pre-`enhanced` `apprentice/ojt/*`, 34 orphaned `pages/apprentice/*`, a dormant second `Quiz.tsx`. None blocks launch; it slows every future change and inflates the "false-gap" risk for audits like this one.

**Five hubs, weakly bolted:** OTJ is genuinely unified (`college_otj_entries`, real-time both sides). Portfolio is one-way (college reads; assessor feedback not surfaced to apprentice). ILP **is** bidirectional (`useMyIlp` — apprentice reads goals, comments, acknowledges; tutor fields RLS-guarded — better than the integration pass claimed). Everything else (Study Centre activity, mock exams, Elec-ID, employer) is siloed.

**Scaling verdict:**
- **500 apprentices:** P0-4/P0-5 already cause timeouts and mobile jank; identity fragmentation (P0-1) generates daily support tickets. Not viable without those fixes.
- **2,000:** unindexed FKs (P1-D1) turn list/aggregate queries into seq-scans; client-side aggregation in portfolio hooks OOMs mobile. Needs server-side aggregation + pagination.
- **10,000:** needs materialized rollups for Student 360 / cohort compare, cursor pagination everywhere, and the identity model collapsed to one source of truth. Current design does not reach this without redesign.

---

## 3b. Persona friction & UX (Phase 4/7)

From the persona/UX pass over the 31 live pages, after stripping the false positives above. These UX items are **lower verification confidence** than the P0/P1 register (catalogued by reading, not all individually reproduced) — treat as a prioritised worklist, not gospel.

**Highest-impact UX (P1):**
- **No admin/HoD KPI strip.** Tutors land on `/college/today` with a 5-stat strip; the principal/HoD `/college` overview (`CollegeDashboard.tsx:534`) has section cards but no rolled-up "% at gateway / % at risk / attendance / overdue." A board-level glance takes multiple clicks. *(This is the most common first impression in a sales demo — fix early.)*
- **Mobile tables crush.** `ReportsPage.tsx:484` (`min-w-full text-[12px]`), `MarkingQueuePage.tsx:97-300` (`max-w-[1100px]` h-scroll table), `IqaSamplingPlanPage`, `CohortComparePage` — no card fallback under ~375px. Violates the mobile-flat/full-width house rule; field tutors can't use them on a phone.
- **Student 360 is an ~8000px scroll with no sticky TOC / deep-link recovery** (`Student360Page.tsx`). The tutor's most-used page; jumping between its 15+ sections means long scrolls, and hash deep-links don't auto-scroll after lazy sections settle.
- **`TutorTodayPage` actions full-page-navigate away** (`:225` → `/college/inbox`) with no breadcrumb/return — breaks the daily-dashboard flow.
- **Bulk-add reports no itemised skips** (`BulkAddStudentsSheet.tsx:189`) — duplicate ULNs are silently dropped; a manager can't audit "did all 60 land?". (Pairs with P0-1: it also leaves `user_id` null.)
- **Portfolio review feedback has weak AC traceability + ambiguous save** (`SubmissionReviewPanel.tsx:77-150`, `toggleCriterion` at `:87`) — feedback is largely free-text and the criteria toggle's persistence isn't obvious. Worth a focused check given it's the assessment audit trail.

**Notable P2 (post-launch, will generate support tickets):**
- IQA finding closure uses `window.prompt()` (`IqaDashboardPage.tsx:245`) — no formatting, attachment, or date capture for a compliance artefact.
- No "request more evidence" action in portfolio review; assessor must hunt the student down to message them.
- No save-draft/autosave on long OTJ/observation logs (`RecordObservationSheet`, `LogCollegeOtjSheet`).
- Compliance threshold inputs (sampling %, attendance band) and ULN/end-date fields have no help text → silent mis-set.
- `CollegeDashboard` lazy-loads 18 sections with no error boundary → a failing section renders a blank card with no signal.
- OTJ inbox bulk actions reset filter state; OfstedEifPage evidence rows don't deep-link to the at-risk learners they cite.

## 4. FE-college requirements gaps (against real operations)

| Requirement | State | Sev |
|---|---|---|
| Bulk onboarding 200 learners | `BulkAddStudentsSheet` exists (paste/CSV) but writes roll-only with `user_id=null`; **no account provisioning / invite emailing in the same flow** | P0 |
| OTJ hours | Correct — fixed-hours model (`useApprenticeData` target hours, not 20%). ⚠️ but `ComplianceTrackingTab.tsx:20,188` and `TrainingTimeTracker.tsx:516` render hardcoded **"20%"** mock text — cosmetic defect, must delete | P1 |
| ILP / reviews | Present and bidirectional | OK |
| EPA / gateway | Present (`epa_gateway_checklist`, `college_epa`) but apprentice never notified of gateway-ready; N+1 perf (P0-4) | P1 |
| Attendance | Present; no apprentice self-view; no notification; silent-failure mutations (P0-10) | P0/P1 |
| Evidence/portfolio | Present but public-bucket exposure (P0-8) | P0 |
| Safeguarding visibility | Flags writable but **never escalate** out of the college surface (no notify, no employer/parent routing) | P1 |
| Intervention tracking | `student_risk_scores` + Next Best Action exist | OK |
| Reporting | CSV export hub exists; funding/Ofsted packs present | OK |

---

## 5. Scores & verdict

| Dimension | /10 | Note |
|---|---|---|
| Code quality | 6 | Competent, consistent patterns; let down by silent-failure mutations and ~1/3 dead code |
| Architecture | 4 | Dual student identity (P0-1) is a foundational flaw |
| UX | 6 | Rich surfaces; weak loading/empty states, mobile tables |
| College readiness | 5 | Feature breadth is genuinely strong; onboarding + identity gaps block it |
| Apprentice integration | 5 | OTJ + ILP solid; everything else siloed/one-way |
| Security | 3 | Public evidence/CV/cert buckets + 6 RLS-off tables + 22 definer views |
| Scalability | 3 | N+1 + unbounded client aggregation + unindexed FKs |
| Commercial readiness | 4 | Demos beautifully; breaks under real cohort load/onboarding |

**Overall: 4.5/10 today. Reaches ~7.5 with the P0 list closed — and the P0 list is ~2 weeks of focused work, not a rewrite.**

**Would I stake my reputation launching this to a paying FE college in 14 days?** Not on today's build. Two things alone disqualify it: the public buckets exposing every learner's evidence/CV/certificates across colleges (a GDPR incident waiting to happen the moment a second college is on the platform), and the dual student-identity model that will fragment attendance/grades/EPA from the apprentice's actual login at scale. **But** every P0 is bounded and fixable in the window — none requires re-architecting the product, only consolidating the identity model, fixing the invite RPC, locking the buckets, and adding pagination/error-handling. With the §6 plan executed, I would launch on day 14 with one pilot college (not three) and a manually-verified roll.

**Top 10 issues most likely to stop a college *buying*:**
1. Public evidence/CV/certificate buckets (fails their data-protection review). 2. No clean bulk-onboarding that actually creates working logins. 3. Student 360 showing fragmented/half-populated learners in the demo. 4. EPA/portfolio pages timing out on their cohort size. 5. No MFA for staff. 6. No error monitoring story when they ask "what happens when it breaks." 7. Attendance/grades that can fail silently. 8. Tutor blind to Study Centre/mock-exam activity they expect to see. 9. Tripartite/employer workflow that doesn't reach the employer. 10. Vulnerable Postgres version flagged in any security questionnaire.

**Top 10 issues most likely to stop a college *renewing*:**
1. Daily support tickets from identity fragmentation. 2. Data-entry doubled because roll and login don't link. 3. Feedback (grades/observations/ILP) never reaching apprentices → low apprentice engagement → college blamed. 4. Safeguarding flags that don't escalate. 5. Mobile unusable for field tutors. 6. Slow dashboards as the cohort grows. 7. Silent data loss eroding trust in the numbers. 8. No employer loop → tripartite reviews done off-platform anyway. 9. Manual reconciliation work that the product was supposed to remove. 10. Each release risks regressions because a third of the code is dead and untested.

---

## 6. 14-day execution plan (P0 only — adoption/scale/readiness)

| Day | Work | P0s | Est |
|---|---|---|---|
| 1-2 | **Lock storage.** Flip `portfolio-evidence`, `evidence-files`, `certificates`, `cv-documents` to private; switch reads to signed URLs; drop the broad listing SELECT policies. Enable RLS on `user_settings`; drop `_nathan_recovery_chunks`. | P0-6, P0-8 | 12h |
| 3-5 | **Collapse student identity + build the assignment write-path.** Decide single source of truth (recommend `profiles.id` everywhere via `college_student_assignments`; make `college_students` a view/projection or backfill+enforce `user_id NOT NULL`). Migration to link existing rows. Fix `accept_college_invite`: set `profiles.college_id`, upsert `college_students`, remove the arbitrary-qualification fallback (fail loudly instead). **Add an assign-tutor/assessor/IQA UI that writes `college_student_assignments` role columns (per-cohort batch + per-learner override), and give the portfolio/EPA/IQA hooks the same college-wide fallback `TutorToday`/`AiNotebook` already have** so dashboards aren't empty pre-assignment. | P0-1, P0-2, P0-3, P0-11 | 28h |
| 6-7 | **Bulk onboarding that works.** Extend bulk import to provision/invite accounts and link `user_id` (email-match + invite email), validate ULN + grade enums server-side. Dry-run preview before commit. | P0-9 | 14h |
| 8-9 | **Kill the N+1 + unbounded reads.** Batch `fetchAllGateways` into set-based queries (or an RPC); add `.range()`/server-side aggregation to portfolio hooks. EXPLAIN ANALYZE at 200-row fixtures. | P0-4, P0-5 | 14h |
| 10 | **Mutation safety + indexes.** Add `onError` toasts to the grade/attendance hooks and switch `RubricGradingDialog`/`RecordGradeDialog` from `.mutate()` to `mutateAsync` (P1-MUT — pulled forward, cheap); add the missing FK indexes (P1-D1). | P1-MUT, P1-D1 | 8h |
| 11 | **Definer views audit.** Convert the 22 `SECURITY DEFINER` views to `security_invoker` where the underlying RLS suffices; document the few that must stay. | P0-7 | 8h |
| 12-13 | **Seed a real pilot college, dry-run onboarding 200 fixtures**, click every persona journey (principal/AM/IQA/tutor/assessor/apprentice), fix what breaks. Wire Sentry on college routes (P1-OPS pulled forward — it's how you'll see day-14 problems). | verify | 16h |
| 14 | **Go/no-go** with one pilot college, manually verified roll, MFA enabled for their staff. | — | — |

**Total P0 effort ≈ 110-120h** (incl. P0-11 assignment write-path) — one focused fortnight for one strong engineer, or a few days with help. The UX P1s in §3b (admin KPI strip, mobile tables, Student 360 TOC) are not in this total; budget ~40-60h more across the following 30 days.

**If you were CTO + Product + College Director for the next 14 days:** ship the six P0 fixes above, launch **one** pilot college (Cwmbran) not three, hand-verify their first cohort's roll-to-login links before day 1, and instrument everything so the first sign of trouble is a Sentry alert and not a phone call. Sell the breadth you genuinely have (OTJ unification, ILP loop, EPA/Ofsted packs) and hold back the employer/tripartite and Study-Centre-visibility stories until the integration work (P1-I1/I2) lands in the following 30 days. Retention will be won or lost on whether the apprentice actually *receives* the tutor's feedback — make P1-N1 the first thing you do after launch.
