# Apprentice ↔ College integration — audit & handover (2026-06-11)

For the college value stream. Maps every surface where the apprentice side
talks to college data: the contract (tables / RPCs / triggers / hooks), the
direction of flow, and the gaps. Everything verified against origin/main
@ 6f2ede7c6 and the **live database** on 2026-06-11 — claims from earlier
audits that didn't survive verification are corrected here.

The apprentice stream treats everything below as **read-only consumption +
its own user_id-keyed writes**; it will not modify invite/assignment flows,
college-side pages, or college-owned policies without coordinating.

---

## 0. Identity spine

- One login: `profiles.id`. Roll row: `college_students.user_id` (unique
  partial index — one college per learner; transfers unmodelled).
- Join: `accept_college_invite(code)` — links bulk-imported row by email or
  creates a fresh one; sets `course_id` (from invite), derives
  `qualification_id` (invite → course → learner's self-selection), creates
  `college_student_assignments` with tutor/assessor/IQA **NULL**.
- Apprentice-side entry points: `JoinCollegeCard` (on MyCollegePlanPage) and
  the hub college card. `profiles.college_id` is deliberately NOT set for
  students — RLS relies on this invariant.

## 1. The college card & College Plan (apprentice front door)

- Hub card (`src/pages/ApprenticeHub.tsx`, section 02) is driven by
  `useMyIlp()` (`hasCollegeLink` ⇐ existence of own `college_students` row),
  `useMyAssignedQuizzes()`, and rolls up overdue/new counts.
- `MyCollegePlanPage` → `useMyCollegeOverview()` reads own
  `college_students` row + `course:college_courses(name)`, KPI strip reads
  verified OTJ minutes, open ILP goals, quiz + portfolio status.
- NEW from apprentice stream (uncommitted branch): solo-mode dismissal of the
  card for unlinked learners (localStorage only — no schema impact) and
  reframed copy ("Link your college — optional"). The card remains the join
  path; nothing college-side changes.

## 2. ILP

- Tables: `college_ilps`, `college_ilp_goals` (keyed `college_students.id`).
- Apprentice writes: `propose_ilp_goal()` RPC (`source='student'`); learner
  edits are column-guarded by `_ilp_goals_learner_field_guard` (tutor fields
  immutable; status restricted).
- College → apprentice: `tg_notify_ilp_reviewed` → push (works; body is
  generic, no detail of what changed).
- Gap: apprentice cannot edit tutor goals (by design) but also gets no
  surface showing **who** set them (tutor identity — see §9).

## 3. Tutor quizzes

- Tables: `tutor_quizzes` → `tutor_quiz_questions` → `tutor_quiz_attempts`
  (+ `tutor_quiz_answer_grades`). `student_id` = profiles.id.
- Apprentice side: `useMyAssignedQuizzes` (5-query load + realtime),
  `TakeQuizPage` (answers + client-side grading + `learning_activity_log`
  entry with `counted_as_ojt: true`).
- ⚠️ **Forgeable until the apprentice stream's `submit_quiz_attempt` RPC
  lands** (in progress): learner SELECT exposes `correct_answer_index` +
  marking guidance via REST before the quiz opens; `student_own_attempts`
  policy is `cmd=ALL` so a learner can PATCH `score`/`completed_at`. Treat
  Student 360 quiz scores and risk-engine quiz inputs as advisory this week;
  don't build new decisions on them.
- Scale note (apprentice-stream lane to fix): `useMyAssignedQuizzes`
  subscribes to ALL of `tutor_quizzes` unfiltered — every tutor edit
  triggers a refetch stampede across all connected learners.

## 4. Portfolio & evidence

- Learner writes: `portfolio_items` (user_id-keyed; capture via
  `UnifiedCaptureSheet`) and `portfolio_submissions` for formal review.
- AC coverage sync is **trigger-based**: `trg_sync_portfolio_ac_evidence`
  on `portfolio_items` (20260531 + 20260601 robust) updates
  `student_ac_coverage` — no client involvement.
- College reads: `college_portfolio_summaries()` RPC, `SubmissionReviewPanel`,
  AC bulk matrix (records `assessor_id` since d79aa6f80).
- College → apprentice: `trg_notify_submission_reviewed` on
  `portfolio_submissions` (feedback_given / signed_off / iqa_verified) →
  push. Audit trail: `portfolio_submission_audit_trigger` →
  `log_portfolio_submission_change`.
- Supervisor verification (no college needed): `PortfolioDetailSheet` →
  "Verify" → `SupervisorVerificationQRSheet` → public token page →
  `portfolio_evidence_verifications` (signature + hash + geo). Reachable and
  live — an earlier audit claimed otherwise; that was wrong.
- Evidence storage: your `evidenceUrl.ts` design (store public-URL strings,
  sign at display) is adopted by the apprentice stream; its capture sheets
  write parseable refs and now block saves without a real storage URL.
- Known portfolio-side debt in the apprentice lane (not yours): evidence
  status lifecycle is weak (no submit→locked flow on `portfolio_items`
  itself), and AC claims aren't validated against
  `qualification_requirements` at capture time.

## 5. OTJ

- Table: `college_otj_entries` (`student_id` = **profiles.id**;
  `verified_by` = profiles.id; staff scoping via `_ch_same_college`).
- Apprentice submit: `SubmitWorkOtjSheet` → INSERT constrained by policy to
  `source_kind='apprentice_submitted'`, `verification_status='pending'` ✓.
- Verification paths: tutor (OtjInboxPage / Student 360 panel), employer
  attestation (`ojt-employer-attest` edge fn, no-login signed link →
  `verified_by_employer`), IQA sampling (`record_iqa_otj_sample`, `iqa_*`
  columns).
- ⚠️ **Live hole, fix drafted:** the UPDATE policy ("Recorder can update",
  no WITH CHECK) lets a learner flip their own entry to verified or inflate
  `duration_minutes` post-hoc. Related, for your decision: the live DELETE
  policy ("Recorder can delete", no status check) lets a learner delete a
  VERIFIED entry — no fraud gain (it reduces their hours) but it destroys
  audit trail. Restricting it to pending would also stop staff deleting their
  own college-led entries, so the right WITH CHECK is a policy call for the
  college stream. Guard trigger drafted on the apprentice
  branch (`supabase/migrations/20260611_otj_verification_guard.sql`):
  staff unrestricted, service-role passthrough (attestation fn keeps
  working), learner can edit only while `pending` and never
  verification/attestation/IQA/identity columns. Will be applied with
  Andrew's sign-off — heads-up since it adds a trigger to your table.
- App-tracked sources merged apprentice-side (`useApprenticeOtj`):
  `learning_activity_log` (`counted_as_ojt=true`), `study_sessions`
  (vestigial — 4 rows ever), `user_video_watches`, + `college_otj_entries`.
  NEW: Study Centre active time now logs measured `study_module` minutes
  (apprentice branch) — these surface in Student 360's OTJ section and in
  `ai-epa-readiness` (it sums `counted_as_ojt` rows), so expect study-time
  minutes to start appearing in your rollups when the branch ships.
- Ledger smell (apprentice lane, flagged): the live `trg_auto_log_ojt`
  trigger double-writes learning activity into `time_entries` (old system,
  5,246 rows) which the OJT Hub never reads — two "hours" numbers exist.
- **`college_students.otj_required_hours` is never set by anything** (invite
  RPC, bulk import, UI — nothing writes it). Every learner falls back to
  estimated targets. Best fixed on your side of the fence (derive from
  course on invite; editable in course/invite UI).

## 6. EPA readiness & gateway

- Apprentice side: `epa_gateway_checklist` (user_id-keyed),
  `EPAReadinessDashboard` + `useEPAReadiness`, `ai-epa-readiness` edge fn
  (aggregates portfolio coverage + OTJ counted minutes + mock results),
  EPA/AM2 simulators write `epa_mock_sessions`.
- College side: `college_epa` (keyed `college_students.id`),
  `college_epa_judgements` (demote-previous trigger), `useEPAGateway`,
  risk engine (`compute-student-risk`) factors observations + OTJ + gateway.
- College → apprentice: `tg_notify_gateway_passed` fires **only on pass** —
  a failed gateway is silent and the learner is never shown the reason.
  Apprentice-side display exists for status but not for assessor notes.
- Keying mismatch to keep in mind: gateway checklist is user_id-keyed,
  college_epa is roll-row-keyed — joins must go through
  `college_students.user_id`.

## 7. AC coverage & grades

- `student_ac_coverage` keyed `college_students.id` (NOT user_id) — the
  apprentice card (`MyAcCoverageCard`) resolves uid → csId first; the
  apprentice stream's new progress tile does the same (read-only).
- Seeding: `seed_student_ac_coverage(_all)`; evidence sync per §4; grade
  sync on sign-off via `trigger_grade_sync_on_signoff`.
- `college_grades` keyed `college_students.id`; learner notified on grade
  (`tg_notify_grade_recorded`) but sees only a summary — no feedback detail,
  no assessor name.

## 8. Notification matrix (live-verified)

| Event | Direction | Mechanism | Status |
|---|---|---|---|
| Grade recorded | college → learner | `tg_notify_grade_recorded` | ✅ works, generic body |
| Gateway passed | college → learner | `tg_notify_gateway_passed` | ✅ pass only — **fail is silent** |
| Portfolio feedback / sign-off / IQA | college → learner | `tg_notify_submission_reviewed` | ✅ |
| ILP reviewed | college → learner | `tg_notify_ilp_reviewed` | ✅ |
| Student message | both | `trg_notify_student_message` → edge fn | ✅ wired |
| OTJ entry submitted | learner → tutor | `trg_notify_tutor_otj` → pg_net → `notify-tutor-otj` edge fn | ⚠️ **wired but unproven** — 0 OTJ pushes in `push_notification_log` ever; pg_net+vault pattern has a history of silent 401 death. Verify delivery end-to-end. |
| Portfolio submitted | learner → tutor | none | ❌ tutors must poll Student 360 |
| ILP goal proposed | learner → tutor | none | ❌ |
| Attendance marked | college → learner | none | ❌ (learner can't see own attendance at all) |
| Tripartite scheduled | college → learner | none | ❌ |

## 9. Apprentice visibility asymmetries (deliberate-decision list)

- Own **attendance**: zero learner visibility.
- **EPA failure reason**: never shown (and no notification — §6).
- **Tutor/assessor identity**: assignment rows exist, no learner surface
  shows who they are.
- **Tutor-logged college OTJ sessions**: invisible to the learner.

## 10. Bucket-flip blockers (signed-URL rollout)

Do NOT flip `portfolio-evidence` / `evidence-files` private until:

1. **`src/pages/public/SupervisorVerificationPage.tsx:787`** — public
   no-login page renders evidence via raw `<img>`; anon can't mint signed
   URLs. Needs server-side signing in the token-validated path.
2. **`src/pages/college/OtjInboxPage.tsx:610`** — raw `<img src={url}>` +
   `<a href>`; mechanical swap to `<EvidenceImage>` / `openEvidence()`.

Verified unaffected: site diary (`visual-uploads` bucket), `AttestOJT`
(no images), AI hooks (already send signed URLs to the analyse/validate
edge fns). Quick confirm suggested: `SharedPortfolioView`.

## 11. Invite-flow & roster gaps

- `otj_required_hours` never set (§5).
- Tutor/assessor/IQA unassigned at invite — queues can't find the learner
  until AssignStaffSheet is run manually.
- Cohort + `expected_end_date` only set via bulk import, never via invite.
- `no_qualification_selected` dead end — invite without course + learner
  without self-selection fails with no UI path to fix mid-flow.
- **Bulk-import duplicates**: NULL-user_id rows match on case-insensitive
  email only at invite-accept; a mismatched email creates a second roll row
  and orphans the first (with its attendance/grades). No dedupe/merge UI.

## 12. Tripartite reviews

`college_tripartite_reviews` is a scaffold only — no scheduling UI, no
reminders, no employer pre-share, no `agreed_actions` completion tracking.
Flagged so it's deliberate backlog, not assumed done.

## 13. Apprentice-stream changes in flight (branch `apprentice-hub-hardening`)

- Study Centre measured study time → `learning_activity_log` (`study_module`,
  real minutes, evidence metadata) — affects Student 360 OTJ + EPA readiness
  inputs (§5, §6).
- `useApprenticeData` progress tile now reads `student_ac_coverage`
  (read-only via own csId) + `useOtjProgramme`/`useApprenticeOtj`.
- Capture sheets: upload failures surfaced, saves blocked without storage
  URLs, no more blob-URL persistence.
- Mock exam fixes: 12 live questions taught pre-Cmin Zs values — corrected
  against `bs7671_facets` (B6 7.28, B20 2.19, B32 1.37, B40 1.09, C16 1.37);
  3 orphaned mock-exam files deleted.
- Hub: solo mode + first-run tour (localStorage only).
- **OTJ merge now includes manual `time_entries`** (site-diary / old
  time-tracking logs, `is_automatic` false/null — 48 learners, ~693h that the
  OJT Hub previously ignored). Because Student 360's OTJ section shares
  `useApprenticeOtj`, your totals/timeline will now include these as source
  `time_entry` ("Site diary"); a 3-line type-only addition was made to
  SectionApprenticeOtj's label maps (rendered output unchanged — its explicit
  sources array was not extended; extend it when you want them shown).
  Supervisor-verified manual hours count as defensible apprentice-side;
  self-logged ones count as pending. Pre-existing bug noted in passing:
  OJTHub's SourceMixBar denominator double-counts autoTrackedMin.

Planned migrations (each individually approved before applying):
1. `submit_quiz_attempt` server-side grading + column-restricted learner
   read + drop learner UPDATE on graded fields (closes §3).
2. OTJ verification guard (drafted — §5).
3. `log_study_activity` clamp RPC (per-entry + daily caps on study minutes).
