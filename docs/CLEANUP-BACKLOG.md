# Elec-Mate — Cleanup Backlog

Derived from the code-level feature audit (2026-05-29). Prioritised by risk. Items marked **✓ verified** were confirmed by reading the code / checking deployed edge functions; items marked **needs check** are audit observations not yet confirmed end-to-end.

> Per project rule: this is a backlog only. No Linear tickets have been created — say the word and I'll file the P1/P2 set.

## P1 — Duplication & correctness risk

These are cases where two implementations of the same thing coexist, risking divergence, double-maintenance and inconsistent output.

1. **Dual RAMS generators.** ✓ verified — `AIRAMSGenerator` calls the `rams-generator` edge function (6 sites); the separate Health & Safety Specialist page calls `health-safety-specialist` (2 sites). Both are deployed and live. Decide on one canonical RAMS engine and fold the other in.
2. **Orphaned `health-safety-v3` edge function.** ✓ verified deployed, **not called from the frontend.** Either it's chained server-side or it's legacy. Confirm and retire if dead. Also **update CLAUDE.md** — it documents `health-safety-v3`/`create-health-safety-job` as the RAMS path, but the app actually calls `rams-generator` / `health-safety-specialist`.
3. **Dual Method Statement implementations.** ✓ verified — standalone `/electrician/method-statement` (`AIMethodStatementGenerator`) vs the in-hub Site Safety `MethodStatementWizard`. Different components, same job.
4. **Dual Permit-to-Work.** ✓ verified — an Inspection-area `PermitToWorkPage` (`/inspection/permit-to-work`) and a Site-Safety in-hub `PermitToWork` tool. Pick one home.
5. **Circuit Designer / Diagram Builder multiple entry points.** Circuit Designer is reachable standalone and embedded in Install Planner; Diagram Builder resolves from two routes (`/business/room-planner` and `/ai-tools/diagram-builder`). Consolidate routes/redirects.

## P2 — Dead / unrouted code (safe to delete)

6. **Unrouted AI pages.** ✓ verified — delete or wire up: `MaintenanceAdvisorPage`, `VisualAnalysisPage`, `ApprenticeAITools` (zero refs); `ReportWriterPage`, `RegulationsPage` (imported in `ElectricianRoutes.tsx` lines 30-31 but never rendered).
7. **Legacy `SafetyDashboard`** component on the Site Safety hub — superseded by the editorial redesign (`SafetyHeadlineStats` + `SafetyScoreSheet`); appears unrendered.
8. **Superseded feature versions.** `ElectricalMaterials` (`/materials-old`) vs live Materials Marketplace; `LivePricing` + `LivePricingRedesigned` vs `LivePricingHub`; legacy `InstallPlanner` vs V2; unused `cable-sizing/` and `testing-projects/` directories.
9. **Duplicate nested directories.** `/customers/customers/` and `/mobile/mobile/` (e.g. `MobileHorizontalScrollTable` exists twice).
10. **Apprentice legacy duplicates.** Several pages exist at two paths (e.g. `PortfolioBuilding` at `/apprentice/PortfolioBuilding` *and* `/apprentice/toolbox/PortfolioBuilding`). `/apprentice/portfolio-hub/*` already redirects to `/apprentice/hub` — finish the cleanup.
11. **Naming / shims.** `EnhancedHazardDatabase` is a back-compat re-export of `HazardDatabaseV2`; `EmailSettingsTab` exists but isn't exposed in Settings. Tidy internal "V2/V3" labels.

## P3 — Data accuracy & maturity to confirm

12. **Safety Shares sample data.** ✓ verified — `SampleDataLoader` seeds sample alerts when the table is empty. Confirm production shows real content, and guard/remove the sample loader for prod.
13. **OTJ compliance forecast is approximate.** ✓ verified — uses hard-coded constants (`WEEKLY_TARGET_HOURS=7.5`, `YEAR_TARGET_HOURS=400`, `PROGRAMME_WEEKS_REMAINING=30`). The "weeks remaining" is a fixed estimate, not derived from each learner's real programme end date — so the gateway projection isn't per-learner exact. Wire it to actual programme dates.
14. **AI RAMS timing copy.** ✓ verified — marketing says "about a minute" but the countdown is `EXPECTED_TOTAL_SECONDS = 180` (3 min). Align the copy (1-3 min).
15. **Partial backends to confirm/finish.** Marked 🟡 in the catalogue: Voice Survey, Policy Management, Calendar, Messaging, Worker Tools, Business AI dashboard. Verify each backend is complete before promoting them in marketing.

## Suggested order

P1 #1-2 (RAMS) first — it's live duplication with real divergence risk and a stale doc. Then the P2 dead-code sweep (low-risk deletions, shrinks the bundle). P3 as part of normal hardening.
