# SEO Phase 1 Audit

Date: 2026-04-12

This report covers the first practical SEO cleanup pass:

- duplicate routes
- sitemap overlap
- manual SEO pages
- template consistency gaps
- the first pages and clusters to improve

## Executive Read

The SEO system is good enough to scale. The biggest risk is not weak content. The biggest risk is structural drift.

The strongest part of the estate is the template-driven content:

- `GuideTemplate`
- `ToolTemplate`
- `CourseTemplate`
- `BusinessTemplate`
- `ComparisonTemplate`

The weakest part is the set of `54` manually built `PublicPageLayout` pages. Those pages are mostly commercial landing pages, tool pages, calculator pages, and training landers. They are important pages, but they are not getting the same systematic SEO treatment as the template pages.

## 1. Duplicate Route Audit

There are `8` duplicated public SEO route paths in `src/routes/SEORoutes.tsx`.

### Duplicates found

- `/guides/appendix-4-tables-bs-7671`
- `/guides/building-regulations-electrical`
- `/guides/eicr-for-commercial-premises`
- `/guides/going-self-employed-electrician`
- `/guides/heat-pump-electrical-requirements`
- `/guides/insulation-resistance-minimum-values`
- `/guides/napit-certificate-guide`
- `/guides/prospective-fault-current-explained`

### Evidence

Examples in `src/routes/SEORoutes.tsx`:

- `appendix-4-tables-bs-7671` appears at lines `1372` and `4534`
- `building-regulations-electrical` appears at lines `1540` and `4670`
- `eicr-for-commercial-premises` appears at lines `1844` and `5230`
- `going-self-employed-electrician` appears at lines `2412` and `4270`
- `heat-pump-electrical-requirements` appears at lines `2428` and `6526`
- `insulation-resistance-minimum-values` appears at lines `2564` and `4302`
- `napit-certificate-guide` appears at lines `2724` and `4350`
- `prospective-fault-current-explained` appears at lines `2948` and `4382`

### Why this matters

This is the highest-priority technical cleanup because it creates ambiguity in route ownership and makes the SEO estate look less controlled than it actually is.

## 2. Sitemap Audit

The sitemap strategy is too overlapping.

### Current overlap

`public/sitemap-seo.xml` overlaps with the specialist sitemaps:

- `59` URLs also appear in `sitemap-tools.xml`
- `261` URLs also appear in `sitemap-guides.xml`
- `22` URLs also appear in `sitemap-training.xml`
- `4` URLs also appear in `sitemap-compare.xml`

### Why this matters

This is not an indexing disaster, but it is messy.

If a URL appears in multiple sitemap files, the sitemap system stops acting like a clean source of truth and starts acting like several competing exports of roughly the same inventory.

### Likely cause

The repo contains a legacy-style sitemap generator in [`scripts/generateSitemap.mjs`](</Users/andrewmoore/elec-mate-merge/scripts/generateSitemap.mjs:1>) that is separate from the SEO page system and mostly focused on app/study-centre routes rather than the actual `src/pages/seo` inventory.

That suggests the sitemap system has grown in layers rather than from one source of truth.

### Recommendation

Pick one sitemap strategy:

- either one authoritative SEO sitemap for all SEO pages
- or specialist sitemaps split by cluster, with each URL appearing once only

Do not keep both styles partially overlapping.

## 3. Template Consistency Audit

### Strong baseline

The template-driven pages are doing the right things.

For example:

- [`ToolTemplate.tsx`](</Users/andrewmoore/elec-mate-merge/src/pages/seo/templates/ToolTemplate.tsx:128>) passes `schemas`, `breadcrumbs`, `datePublished`, `dateModified`, and `author` into `useSEO`
- [`GuideTemplate.tsx`](</Users/andrewmoore/elec-mate-merge/src/pages/seo/templates/GuideTemplate.tsx:144>) does the same

This is the standard to preserve.

### Manual-page gap

Many of the manual pages only pass basic title/description into `useSEO`, then inject custom JSON-LD manually with `Helmet`.

Examples:

- [`AICostEngineerPage.tsx`](</Users/andrewmoore/elec-mate-merge/src/pages/seo/AICostEngineerPage.tsx:140>) only passes `title` and `description` into `useSEO`
- [`InspectionTestingCoursePage.tsx`](</Users/andrewmoore/elec-mate-merge/src/pages/seo/InspectionTestingCoursePage.tsx:178>) passes `title`, `description`, and a single `schema`, but still handles FAQ and breadcrumbs manually in `Helmet`

This means the manual pages often miss the standardised handling of:

- breadcrumbs via `useSEO`
- date metadata via `useSEO`
- related page structure
- consistent internal bridge patterns
- consistent freshness treatment

### Important note

This does not mean the manual pages are bad. Many are strong pages. It means they are harder to maintain at scale and more likely to drift.

## 4. Manual SEO Pages Audit

There are `54` manual `PublicPageLayout` pages.

Breakdown:

- tools/commercial tool pages: `40`
- training pages: `9`
- guides: `4`
- root/other: `1`

### Why this matters

This is actually useful. It means the manual pages are not random. They are concentrated in the commercial areas that matter most.

That gives a clear priority:

- fix the manual commercial pages first
- leave the big `GuideTemplate` estate alone unless there is a specific problem

### Manual pages by cluster

#### Tools / commercial pages

- `AICircuitDesignerPage.tsx`
- `AICostEngineerPage.tsx`
- `AIElectricianToolsPage.tsx`
- `AIHealthSafetyAgentPage.tsx`
- `AdiabaticEquationCalculatorPage.tsx`
- `BS7671ObservationCodesPage.tsx`
- `BestElectricianAppPage.tsx`
- `CableSizingCalculatorPage.tsx`
- `CashFlowPlannerPage.tsx`
- `CityGuilds2391Page.tsx`
- `ConduitFillCalculatorPage.tsx`
- `ConsumerUnitRegulationsPage.tsx`
- `DiversityFactorCalculatorPage.tsx`
- `EICCertificatePage.tsx`
- `EVChargerCertificatePage.tsx`
- `EarthLoopImpedanceCalculatorPage.tsx`
- `EarthingArrangementsPage.tsx`
- `EighteenthEditionCoursePage.tsx`
- `ElecMateVsCertsAppPage.tsx`
- `ElecMateVsICertifiPage.tsx`
- `ElectricalQuotingAppPage.tsx`
- `ElectricalTestingCalculatorsPage.tsx`
- `ElectricianInvoiceAppPage.tsx`
- `EmergencyLightingCertificatePage.tsx`
- `FireAlarmCertificatePage.tsx`
- `HowToFillInEICRPage.tsx`
- `HowToSizeCablesPage.tsx`
- `JobProfitabilityCalculatorPage.tsx`
- `Level3ElectricalPage.tsx`
- `ManualHandlingCoursePage.tsx`
- `MaxDemandCalculatorPage.tsx`
- `PATTestingPage.tsx`
- `PowerFactorCalculatorPage.tsx`
- `ProspectiveFaultCurrentCalculatorPage.tsx`
- `RingCircuitCalculatorPage.tsx`
- `SolarPVCertificatePage.tsx`
- `TestingSequenceGuidePage.tsx`
- `ThreePhasePowerCalculatorPage.tsx`
- `TrunkingFillCalculatorPage.tsx`
- `VoltageDropCalculatorPage.tsx`

#### Training pages

- `AM2ExamPreparationPage.tsx`
- `ApprenticePortfolioGuidePage.tsx`
- `ApprenticeTrainingPage.tsx`
- `BMSCoursePage.tsx`
- `EPAPreparationPage.tsx`
- `IPAFTrainingPage.tsx`
- `InspectionTestingCoursePage.tsx`
- `Level2ElectricalPage.tsx`
- `PASMATrainingPage.tsx`

#### Guides

- `HowToDoSafeIsolationPage.tsx`
- `HowToTestInsulationResistancePage.tsx`
- `MinorWorksCertificatePage.tsx`
- `PartPBuildingRegulationsPage.tsx`

#### Root / other

- `RAMSGeneratorPage.tsx`

## 5. Manual Pages: What Is Actually Missing

The gap is not "more words". The gap is system consistency.

Compared with the template pages, the manual pages are more likely to miss:

- `breadcrumbs` passed through `useSEO`
- `datePublished`
- `dateModified`
- standard related page blocks
- standard CTA / app-bridge patterns
- consistent schema injection through a shared template

The best example of the difference is:

- manual page: [`AICostEngineerPage.tsx`](</Users/andrewmoore/elec-mate-merge/src/pages/seo/AICostEngineerPage.tsx:140>)
- shared template baseline: [`ToolTemplate.tsx`](</Users/andrewmoore/elec-mate-merge/src/pages/seo/templates/ToolTemplate.tsx:128>)

## 6. Outlier Audit

There is one important outlier: [`EICRCertificatePage.tsx`](</Users/andrewmoore/elec-mate-merge/src/pages/seo/EICRCertificatePage.tsx:1>)

This page is not using `PublicPageLayout`, but it also is not one of the shared template families. It uses the shared SEO components directly:

- `SEOPageShell`
- `SEOFAQAccordion`
- `SEOHowToSteps`
- `SEORelatedPages`
- `SEOCTASection`
- `SEOAppBridge`

That page is not a problem, but it should be treated as a custom high-value page and protected from drift.

## 7. Where SEO Can Work Harder For Elec-Mate

The pages need to act more like a funnel.

The main commercial pillars should be:

- certificates
- calculators
- inspection/testing
- apprentice training
- AI tools
- quoting / invoicing / business tools
- RAMS / safety / compliance

Each cluster should behave like:

`traffic page -> hub page -> product page -> signup`

### Example flows

- testing guides -> calculator pages -> certificate pages -> signup
- apprenticeship guides -> training pages -> app/course pages -> signup
- business guides -> quote/invoice/RAMS pages -> signup
- AI educational pages -> AI agent pages -> signup

## 8. Priority Pages To Improve First

These are the manual pages I would treat as highest-value first because they are close to commercial intent and important to brand positioning.

### First group: Elec-Mate money pages

- `BestElectricianAppPage.tsx`
- `ElectricalQuotingAppPage.tsx`
- `ElectricianInvoiceAppPage.tsx`
- `AICostEngineerPage.tsx`
- `AICircuitDesignerPage.tsx`
- `AIHealthSafetyAgentPage.tsx`
- `AIElectricianToolsPage.tsx`
- `RAMSGeneratorPage.tsx`

### Second group: certificate and workflow pages

- `EICCertificatePage.tsx`
- `EVChargerCertificatePage.tsx`
- `EmergencyLightingCertificatePage.tsx`
- `FireAlarmCertificatePage.tsx`
- `SolarPVCertificatePage.tsx`
- `InspectionTestingCoursePage.tsx`

### Third group: calculator hub candidates

- `ElectricalTestingCalculatorsPage.tsx`
- `CableSizingCalculatorPage.tsx`
- `EarthLoopImpedanceCalculatorPage.tsx`
- `ProspectiveFaultCurrentCalculatorPage.tsx`
- `VoltageDropCalculatorPage.tsx`

## 9. What To Leave Alone For Now

Do not start by rewriting the `GuideTemplate` estate.

The template-driven guide cluster is already the strongest part of the system. Unless a specific page is overlapping or underperforming, it should not be the first place to spend time.

## 10. Immediate Action List

### Phase 1A

- remove the 8 duplicate routes from `SEORoutes.tsx`
- decide the sitemap source of truth
- stop sitemap URL duplication across files

### Phase 1B

- review the 54 manual pages one by one
- sort them into:
  - keep as custom page
  - migrate to shared template
  - merge with another page
  - rewrite internal linking / CTA structure only

### Phase 1C

- define the main hub pages for:
  - AI tools
  - calculators
  - certificates
  - apprentice training
  - business tools

### Phase 1D

- resolve cannibalisation on the obvious duplicate-intent pages

## Bottom Line

The SEO estate is already strong enough to win.

The next gains come from:

- cleaner technical structure
- stricter cluster ownership
- stronger internal product funnels
- fewer overlapping pages
- moving the commercial manual pages closer to the stronger template standard

That is how the SEO pages start working harder for Elec-Mate rather than simply adding page count.
