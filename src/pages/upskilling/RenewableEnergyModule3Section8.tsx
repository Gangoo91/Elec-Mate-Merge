import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
  Pullquote,
} from '@/components/study-centre/learning';
import { Reg712WorkflowMap, CertBundleStructure } from '@/components/study-centre/diagrams/renewableM3';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm3s8-712-scope',
    question:
      "BS 7671 Section 712 is the regulatory framework for PV electrical installations. What's its scope?",
    options: [
      'Just the modules',
      'The DC side of grid-connected PV installations — from module up to and including the AC-side connection to the building installation. Covers selection / erection requirements: voltage / current sizing, fire and lightning protection, bonding and earthing, isolation, marking and labelling, fault protection, commissioning evidence. Does NOT cover wider building installation rules (those are in BS 7671 main body) but interacts with them at the AC-side boundary',
      'Only commercial PV',
      'Customer feelings',
    ],
    correctIndex: 1,
    explanation:
      'BS 7671 Section 712 covers PV electrical installations from the module to the AC-side connection. Includes: voltage / current sizing methodology (712.433.101.1); fault protection on the DC side (712.421, 712.421.101.1 IMD); bonding and earthing (712.542.101, 712.542.102, 712.521.102); thermal arrangement (712.512.2.1); cable selection (712.521.1041, 712.523.101); connectors (712.526.1, 712.526.101); RCD type (712.531.3.5.1); SPDs (712.534.102); notices (712.514.101 / 102 / 103); inspection (712.6.101). Interacts with wider BS 7671 at the AC-side boundary (Reg 551.7.1(c) and (d) new in A4:2026; Reg 531.3.3 general RCD type rule).',
  },
  {
    id: 'm3s8-712-512',
    question: 'Where does Reg 712.512.2.1 fit in the design / install workflow?',
    options: [
      'Only at handover',
      "At design (Module 3 Section 1 — site irradiance assessment) AND install (Module 3 Section 3 — 70-100 mm standoff for natural convection cooling). The reg makes the installer responsible for adequate heat dissipation under site's maximum solar radiation. Evidence path: site irradiance assessment + manufacturer mounting spec + as-installed standoff dimension + cert evidence bundle records all three",
      'Never applies in UK',
      "Customer's preference",
    ],
    correctIndex: 1,
    explanation:
      'Reg 712.512.2.1 is the site-radiation / thermal-arrangement responsibility. Operationalised at: (1) design — site irradiance assessment recorded in the design pack (Module 3 Section 1); (2) install — 70-100 mm standoff for natural convection cooling, per manufacturer mounting spec (Module 3 Section 3); (3) cert evidence — bundle records site irradiance assumption, manufacturer mounting spec, as-installed standoff dimension. The MCS audit reads the bundle against the reg.',
  },
  {
    id: 'm3s8-712-433',
    question: 'Where does Reg 712.433.101.1 fit in the design / install workflow?',
    options: [
      'Customer satisfaction',
      'At design (Module 3 Section 2 — inverter MPPT sizing). Sets the V_oc_max / Upc_max / Isc_max determination basis. Two paths: (a) manufacturer temperature coefficient + site temperature extremes; (b) conservative defaults V_oc_max = 1.2 × V_oc_stc, I_sc_max = 1.25 × I_sc_stc. Used in the three voltage-rule checks against inverter datasheet. Cert evidence bundle records the calculation methodology and result',
      'Just at handover',
      'No application',
    ],
    correctIndex: 1,
    explanation:
      'Reg 712.433.101.1 is the V_oc_max / Upc_max / Isc_max determination — used in inverter MPPT sizing and DC cable sizing. Two calculation paths per the regulation: (a) manufacturer temperature coefficient + site temperature extremes for calculated values; (b) conservative default multipliers (1.2 × V_oc_stc, 1.25 × I_sc_stc) when manufacturer data not used. The design pack records the methodology and result; cert evidence bundle archives the calculation.',
  },
  {
    id: 'm3s8-712-431',
    question:
      'Where do Reg 712.431.101 / 712.431.102 / 712.432 / 712.432.101-103 fit in the design / install workflow?',
    options: [
      'No fit',
      'At design (Module 3 Section 2 — string-protection condition and device selection). Reg 712.431.101: protection required (above 2 strings) where condition 1.35 × I_mod_max_ocer < (Ns-1) × I_sc_max IS MET — 1 or 2 strings never need protection. Reg 712.432.103: device options include gPV per BS EN 60269-6, fuse-combination per BS EN 60947-3, or DC-rated MCBs per BS EN 60947-2 / 60898-2 / IEC 60898-3. Reg 712.432 sizing: 1.1 × I_sc_max < I_n ≤ I_mod_max_ocer. Reg 712.432.101: both polarities protected. Reg 712.432.102: blocking diodes NOT acceptable',
      'No application',
      'AC fuses only',
    ],
    correctIndex: 1,
    explanation:
      'Reg 712.431.101 sets the explicit rule: 1 or 2 parallel strings never need protection; above 2 strings, protection required when condition LHS < RHS is met. Reg 712.432.103 permits four device standards (not just gPV). Reg 712.432 sizes the devices: 1.1 × I_sc_max < I_n ≤ I_mod_max_ocer (lower bound 1.375 × I_sc_stc with the 1.25 conservative I_sc_max multiplier). Both polarities protected per 712.432.101; blocking diodes NOT acceptable as protection per 712.432.102. The design pack records the condition calculation, the device selection per 712.432.103, and the sizing.',
  },
  {
    id: 'm3s8-712-421',
    question: 'Where does Reg 712.421 fit in the design / install workflow?',
    options: [
      'Not applicable',
      'Throughout — design (cable spec BS EN 50618 / 62930, connector spec BS EN 62852, isolator spec BS EN 60947-3); install (matched-brand MC4, manufacturer-torque crimping, correct flashing-tile, secure DC isolator placement); commissioning (functional test of isolator under load per BS EN 62446-1). Reg 712.421 = protection against fire caused by electrical equipment on the DC side. The PWI common-mistakes that violate this regulation are the most-flagged DC-side audit findings',
      'Only fires',
      'No relevance',
    ],
    correctIndex: 1,
    explanation:
      'Reg 712.421 is the umbrella fire-protection requirement on the DC side, operationalised across the workflow: (1) design — specify BS EN 50618 / 62930 cable, BS EN 62852 connectors, BS EN 60947-3 isolators; (2) install — matched-brand MC4, manufacturer-torque crimping, mechanical test, correct flashing-tile, secure DC isolator placement; (3) commissioning — functional test of isolator under load. The PWI common-mistakes that violate Reg 712.421 (mixed MC4 brands, improper crimping, AC-only isolator) are the most-flagged DC-side audit findings.',
  },
  {
    id: 'm3s8-712-542',
    question: 'Where do Reg 712.542.102 and Reg 712.521.102 fit in the design / install workflow?',
    options: [
      "Customer's preference",
      'Reg 712.542.102 (functional bonding): at design (Module 3 Section 5 — check module manufacturer requirement and inverter galvanic isolation; single-point bonding only if both conditions met); install (route single bonding conductor from specified DC polarity to building MET). Reg 712.521.102 (lightning loop): at design (route DC + bonding side-by-side); install (cables strapped together / same conduit, minimising enclosed area)',
      'AC side only',
      'No application',
    ],
    correctIndex: 1,
    explanation:
      'Reg 712.542.102 (functional bonding): design-stage check that BOTH (a) inverter is galvanically isolated AND (b) module manufacturer specifies bonding before applying; install-stage single-point bonding only. Reg 712.521.102 (lightning loop): design-stage routing plan that puts DC + equipotential bonding side-by-side along the same path; install-stage cables strapped together or in same conduit, minimising enclosed loop area. Both regs operationalised at design AND install; cert evidence bundle records the design decisions and install photos evidence the as-installed arrangement.',
  },
  {
    id: 'm3s8-cert-bundle',
    question:
      "The cert evidence bundle is the audit trail for the install life. What's its structure?",
    options: [
      'No structure',
      '(1) MCS MIS 3002 design pack — site survey, yield modelling, schematic, schedule, MPPT calculations, cable sizing, string-fuse inequality, customer info pack. (2) Install photographs — DC, AC, mounting, flashing, labels, isolator placements. (3) BS EN 62446-1 commissioning records and SoTR. (4) MCS certificate. (5) EREC G98 / G99 / G100 application / approval / notification. (6) DNO confirmation. (7) Customer handover pack signed by customer. Archived for 25 years. Reference for MCS audit, EICR-style periodic inspection, and customer service',
      'Just paperwork',
      'No purpose',
    ],
    correctIndex: 1,
    explanation:
      'The cert evidence bundle is the structured archive of every install document. Contents: (1) MCS MIS 3002 design pack; (2) install photographs; (3) BS EN 62446-1 commissioning records and SoTR; (4) MCS certificate; (5) EREC G98 / G99 / G100 documents; (6) DNO confirmation; (7) customer handover pack with customer signature. Archived for the install life (25 years). Reference for MCS audit, EICR-style periodic inspection, customer service, fault investigation, ownership transfer.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A new PV install is in progress. The installer is working on the DC side. Which Section 712 regulations does this stage of work touch?',
    options: [
      'None',
      'Multiple: 712.433.101.1 (V_oc_max / Isc_max basis from earlier design); 712.431.101 / 712.431.102 (string fuses if applicable); 712.421 (fire protection — cable spec, connectors, crimping, isolator); 712.512.2.1 (thermal arrangement — standoff dimension confirmed at install); 712.521.102 (lightning loop — DC + bonding routed side-by-side); 712.542.102 (functional bonding if applicable). Plus IET CoP for Grid-Connected Solar PV Installations operationalising these into install workflow',
      'Only one',
      'No regulations apply',
    ],
    correctAnswer: 1,
    explanation:
      'A DC-side install touches multiple Section 712 regs simultaneously: voltage / current sizing (712.433.101.1 — design carrying through to install verification); string fuses where applicable (712.431.101 / 712.431.102); fire protection (712.421 — cable, connectors, isolator); thermal arrangement (712.512.2.1 — standoff dimension); lightning loop (712.521.102 — routing); functional bonding (712.542.102 — single-point if applicable). The IET CoP gives the operational workflow that integrates all these. The cert evidence bundle records compliance evidence per reg.',
  },
  {
    id: 2,
    question:
      'A 6 kWp PV install is being commissioned. Which Section 712 regs are tested explicitly by BS EN 62446-1 commissioning?',
    options: [
      'None',
      '712.421 fire protection (functional test of DC isolator under load — confirms BS EN 60947-3 DC-21 working correctly); 712.433.101.1 (V_oc / I_sc per string measured at test conditions and translated to STC for comparison against design); 712.542.102 (continuity of equipotential bonding — confirms single-point bonding integrity); 712.512.2.1 (visual inspection of standoff dimension at install). Plus IR test (BS EN 62446-1) confirms no inadvertent DC-to-earth path. SoTR records each test result',
      'No regs tested',
      'Only customer satisfaction',
    ],
    correctAnswer: 1,
    explanation:
      'BS EN 62446-1 commissioning explicitly tests multiple Section 712 regs: (1) 712.421 — functional test of DC isolator under load confirms BS EN 60947-3 DC-21 operation; (2) 712.433.101.1 — V_oc / I_sc per string measured and translated to STC; (3) 712.542.102 — continuity test confirms bonding network integrity and single-point bonding; (4) 712.512.2.1 — visual inspection of standoff dimension; (5) IR test catches insulation breakdown. The SoTR records each test against the design pack reference.',
  },
  {
    id: 3,
    question:
      "An MCS auditor reviews a 12-month-old PV install. The cert evidence bundle is incomplete — missing the inverter MPPT calculations from the design pack. What's the audit finding?",
    options: [
      'Pass',
      'Major finding — Reg 712.433.101.1 not evidenced. The MCS MIS 3002 design pack must explicitly show the inverter MPPT sizing calculations (three voltage checks per Reg 712.433.101.1, plus current checks). Rectification: produce the calculations retrospectively (with the as-installed string and inverter), evidence against Reg 712.433.101.1, update the design pack, re-issue the cert evidence bundle. Customer informed about the rectification',
      'No issue',
      "Customer's fault",
    ],
    correctAnswer: 1,
    explanation:
      'Missing inverter MPPT calculations is a major MCS audit finding — Reg 712.433.101.1 not evidenced in the design pack. Rectification: produce the calculations retrospectively, evidence against the as-installed string and inverter, update the design pack, re-issue the cert evidence bundle. The competent installer avoids this by including the MPPT calculations EXPLICITLY in the design pack at install — three voltage checks per Reg 712.433.101.1 with manufacturer temperature coefficients, site extremes, and resulting V_oc_max / V_mp / V_oc_max-vs-MPPT-max.',
  },
  {
    id: 4,
    question:
      "A 5-year-old PV install is being inspected after a customer report of inverter failure. The cert evidence bundle reveals: A4:2026 isn't referenced (install pre-dates A4); Reg 551.7.1(d) isn't addressed (single-RCD CU). Is this a finding?",
    options: [
      'Always a finding',
      'Not a finding for the original install — at the time of install, A4:2026 wasn\'t in force; the install complies with the regs effective at that date. The inspector MAY flag the arrangement as a "Code C2 — Potentially Dangerous" for the customer\'s information, recommending CU upgrade at next opportunity. The inverter failure investigation continues — root cause may be unrelated (component failure, lightning damage, etc.) or related (source-side RCD trip created hazardous conditions). Cert evidence bundle and EICR record the findings transparently',
      'Customer at fault',
      'Inverter problem',
    ],
    correctAnswer: 1,
    explanation:
      "Existing installs comply with the regs at their install date. A4:2026 doesn't apply retroactively. The inspector MAY flag the single-RCD-CU + PV arrangement as Code C2 (Potentially Dangerous) for the customer's information — recommending CU upgrade at next opportunity. The inverter failure investigation proceeds: identify root cause (failed component, lightning damage, source-side RCD trip aggravation, etc.); rectify; record in updated cert evidence bundle. The EICR documents the findings transparently for the customer's informed decision.",
  },
  {
    id: 5,
    question:
      "IET CoP for Grid-Connected Solar PV Installations — what's its relationship to BS 7671 Section 712?",
    options: [
      'They contradict each other',
      'Complementary. BS 7671 Section 712 sets the regulatory framework — what the install must achieve. The IET CoP (5th edition) operationalises Section 712 into the day-to-day install workflow — worked examples, decision charts, design-pack templates, troubleshooting, photo records. The MCS MIS 3002 design pack typically references both. The cert evidence bundle archives compliance evidence per both. Section 712 + IET CoP together = the full UK PV install standard',
      'No relationship',
      'IET CoP overrides BS 7671',
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671 Section 712 (regulatory framework: what to achieve) and the IET CoP for Grid-Connected Solar PV Installations (operational guidance: how to achieve it) are complementary. Section 712 sets the regs; the IET CoP gives the worked examples, decision charts, design-pack templates, and troubleshooting. The competent UK PV install workflow uses BOTH — Section 712 for compliance, IET CoP for operationalisation. MCS MIS 3002 design pack typically references both. Cert evidence bundle archives both.',
  },
  {
    id: 6,
    question:
      "A new PV install in 2026 must satisfy both BS 7671:2018+A4:2026 (regulatory) and MCS MIS 3002 (scheme). What's in common, and what's different?",
    options: [
      'Identical',
      'BS 7671:2018+A4:2026 = the legal regulatory framework for the electrical install (what the install must achieve to be safe and compliant). MCS MIS 3002 = the scheme requirements for grant-funded PV installs (the design pack contents, audit trail, customer information). They overlap (the design pack contents are largely the same — sizing calculations, schematic, schedule, commissioning records), but MCS MIS 3002 adds: scheme-specific reporting, MCS cert issuance, customer information pack format, MCS audit process. Both must be satisfied for a typical grant-funded install',
      'BS 7671 not required',
      'MCS not required',
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671:2018+A4:2026 (the legal regulatory framework) and MCS MIS 3002 (the scheme requirements) overlap and complement. Both required for a typical UK grant-funded PV install. BS 7671 sets the regulatory safety requirements; MCS MIS 3002 adds scheme-specific reporting, MCS cert issuance, customer information pack format, audit process. The cert evidence bundle archives compliance evidence for BOTH — the audit trail covers the regulatory and the scheme dimensions.',
  },
  {
    id: 7,
    question:
      'An EICR-style periodic inspection of a 7-year-old PV install. The inspector uses the cert evidence bundle as the reference. Which documents are key?',
    options: [
      'None',
      '(1) MCS MIS 3002 design pack — for the as-designed inputs (orientation, kWp, modules, inverter, string topology, V_oc / I_sc design values); (2) Install photographs — for the as-installed configuration (DC routing, AC connection, mounting, labels); (3) BS EN 62446-1 SoTR — for the baseline commissioning measurements (continuity, polarity, V_oc / I_sc, IR, functional tests). Inspector measures current values and compares against the SoTR baseline. Deviations identify degradation, faults, or operational issues',
      "Customer's opinion only",
      'No documents needed',
    ],
    correctAnswer: 1,
    explanation:
      'EICR-style periodic inspection uses the cert evidence bundle as the reference. Key documents: (1) MCS MIS 3002 design pack — as-designed inputs; (2) install photographs — as-installed configuration; (3) BS EN 62446-1 SoTR — baseline commissioning measurements. The inspector compares current measurements against the SoTR baseline; deviations identify degradation, faults, or operational issues. Without the bundle, the inspection starts from scratch — much harder, more expensive. The cert evidence bundle is the multi-decade investment that makes future inspections efficient.',
  },
  {
    id: 8,
    question:
      "The competent installer's end-to-end Section 712 workflow integrates all regs. What's the workflow sequence?",
    options: [
      'No workflow',
      'Design (712.433.101.1 sizing; 712.431.101 fuse inequality; 712.512.2.1 site irradiance; 712.542.102 bonding decision); Install (712.421 cable + connectors + isolator; 712.512.2.1 standoff; 712.521.102 routing; 712.542.102 single-point bonding); Commissioning (BS EN 62446-1 SoTR confirming all regs); Handover (cert evidence bundle for MCS audit + customer + future EICR); Periodic (5-yearly inspection vs SoTR baseline). Each stage cross-references the regs and the operational source (IET CoP)',
      "Customer's choice only",
      'Random order',
    ],
    correctAnswer: 1,
    explanation:
      'The integrated Section 712 workflow: (1) Design — sizing calculations per Reg 712.433.101.1, string-fuse inequality per Reg 712.431.101 / 102, site irradiance per Reg 712.512.2.1, bonding decision per Reg 712.542.102; (2) Install — cable + connectors + isolator per Reg 712.421, standoff dimension per Reg 712.512.2.1, routing per Reg 712.521.102, single-point bonding per Reg 712.542.102; (3) Commissioning — BS EN 62446-1 SoTR confirming compliance; (4) Handover — cert evidence bundle; (5) Periodic inspection vs SoTR baseline. The IET CoP operationalises each stage.',
  },
];

const faqs = [
  {
    question: 'How is BS 7671 Section 712 likely to change in the 19th Edition?',
    answer:
      'Section 712 will evolve in the 19th Edition (currently planned for late-2020s) to reflect emerging UK PV practice — larger arrays, more complex multi-MPPT topologies, integration with BESS (Chapter 57 also evolving) and prosumer arrangements (Chapter 82 added in A4:2026). Expected directions: more explicit rapid-shutdown / arc-fault requirements; refined Type B RCD criteria with the growth of transformerless-with-internal-DC-management inverters; tighter integration with BESS for the prosumer use case; energy-efficiency requirements (Appendix 17 planned to become Part 8). Exact timing and content not yet published; the 19th Edition development is ongoing through 2026-2028.',
  },
  {
    question: "What's the difference between Section 712, the IET CoP, and MCS MIS 3002?",
    answer:
      'Three different documents with overlapping scope: (1) BS 7671 Section 712 — the legal regulatory framework (what the install must achieve to be safe and compliant); (2) IET CoP for Grid-Connected Solar PV Installations — the operational guidance (how to achieve compliance, with worked examples, decision charts, templates); (3) MCS MIS 3002 — the scheme requirements (additional reporting, audit trail, customer information for grant-funded installs). All three referenced by a competent UK PV install workflow. The cert evidence bundle archives compliance evidence per all three.',
  },
  {
    question:
      'How does the cert evidence bundle support customer ownership transfer (e.g. house sale)?',
    answer:
      "When a property with PV is sold, the cert evidence bundle transfers to the new owner. The bundle provides: (1) install spec (kWp, modules, inverter, mounting); (2) commissioning baseline (BS EN 62446-1 SoTR); (3) MCS certificate (for property EPC value); (4) DNO confirmation (for SEG export continuity); (5) warranty details. EICR-style periodic inspection at the time of sale (or shortly after) uses the bundle to verify install condition. Property valuation typically reflects the PV install (positive value contribution) on the basis of the bundle's documentation.",
  },
  {
    question: 'What happens at the end of the 25-year nominal life of a PV install?',
    answer:
      'PV modules degrade gradually (linear to ~80-85% of nameplate by year 25). The install doesn\'t "stop" at year 25 — most modules continue operating beyond. Decision options at year 25-30: (a) continue operating (modules still producing usable power at lower level); (b) repower (replace modules with current-generation; retain mounting and inverter if compatible); (c) full replacement (new install, new design pack). The cert evidence bundle informs the decision — original install spec, accumulated maintenance / fault history. Customer\'s informed choice at end-of-life.',
  },
  {
    question: 'How does an EICR-style periodic inspection differ from MCS audit?',
    answer:
      'EICR-style periodic inspection (typically 5-yearly for PV) focuses on safety and condition of the install — measurements vs SoTR baseline, visual inspection of components, identification of degradation / faults. Issues coded per BS 7671 EICR coding (C1 immediate danger, C2 potentially dangerous, C3 improvement recommended). MCS audit (typically random sample of installs) focuses on compliance with the MCS MIS 3002 scheme — design pack contents, BS EN 62446-1 commissioning records, customer information, contractor competency. Different purpose, different scope, both reference the cert evidence bundle.',
  },
  {
    question: 'Does the cert evidence bundle need to be digital or paper-based?',
    answer:
      'No prescribed format — paper, PDF, or cloud-based digital system all acceptable. Modern UK PV contractors typically use a digital system (cloud-based document management) for ease of customer access, contractor access, and archive integrity. Customer handover typically includes a physical paper copy of the key documents PLUS digital access. The bundle must be durable for the install life (25 years) — paper degrades, drives fail, cloud services close — so multiple-format archive is the resilient approach.',
  },
  {
    question: 'How does the bundle support insurance claims?',
    answer:
      "Customer's insurance covering the property typically requires evidence that the PV install was professionally designed and commissioned. The cert evidence bundle provides: (1) MCS certificate (the install was scheme-compliant); (2) DNO notification / approval (the install was registered); (3) BS EN 62446-1 SoTR (the install was commissioned correctly); (4) install photographs (the install matches the design); (5) ongoing periodic inspection records. Insurance claim — e.g. lightning damage, fire — requires the bundle as the basis. Without the bundle, claim processing is significantly harder.",
  },
  {
    question: 'What if the original installer has gone out of business — who maintains the bundle?',
    answer:
      "Customer maintains the bundle (or the property's current owner). The bundle is the customer's archive. If the original installer has gone out of business, the customer should: (1) verify they have a complete copy of the bundle; (2) make multiple-format copies (paper + digital); (3) reference the MCS scheme database (MCS holds the cert reference); (4) reference the DNO confirmation (DNO holds the notification record). Future maintenance / inspection contractors work from the customer's bundle. The cert evidence bundle's value increases over time as the original install team becomes less accessible.",
  },
  {
    question: 'How does Module 4 (diverters, off-grid, hybrid) build on Module 3?',
    answer:
      'Module 4 extends the Module 3 grid-tied workflow into specialised installs: diverters (excess PV to heat / EV charging — DC-coupled or AC-coupled); off-grid (PV + BESS + back-up generator, no grid connection); hybrid (grid-tied + BESS + smart energy management). Each extension uses the Module 3 foundations: site survey, MPPT sizing, DC + AC design, BS EN 62446-1 commissioning, cert evidence bundle. Module 5 covers BESS in depth (Chapter 57 + Chapter 82 of BS 7671 + the BESS-specific regs). The course builds up to commercial / industrial PV in later modules.',
  },
];

export default function RenewableEnergyModule3Section8() {
  const navigate = useNavigate();

  useSEO({
    title:
      'Section 712 in plain language — the integrated reading | Renewable Energy 3.8 | Elec-Mate',
    description:
      'BS 7671 Section 712 mapped to the design / install / commissioning workflow. Every reg cross-referenced; cert evidence bundle structure; IET CoP for Grid-Connected Solar PV Installations operationalisation; A4:2026 changes; preparation for 19th Edition.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../renewable-energy-module-3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 3
          </button>

          <PageHero
            eyebrow="Module 3 · Section 8 · BS 7671:2018+A4:2026"
            title="Section 712 in plain language — the integrated reading"
            description="Every Section 712 clause mapped to the design / install / commissioning workflow; the cert evidence bundle structure; IET CoP for Grid-Connected Solar PV Installations operationalisation; A4:2026 changes; preparation for 19th Edition."
            tone="yellow"
          />

          <TLDR
            points={[
              'BS 7671 Section 712 is the regulatory framework for PV electrical installations. Covers DC side from module to AC-side connection: voltage / current sizing, fire / lightning protection, bonding / earthing, isolation, marking, fault protection, commissioning evidence.',
              'Section 712 + IET CoP for Grid-Connected Solar PV Installations + MCS MIS 3002 = the full UK PV install standard. Section 712 sets the regs; IET CoP operationalises; MCS MIS 3002 adds scheme requirements.',
              'A4:2026 changes affecting PV: Reg 551.7.1(d) source-connection rule (NEW — PV not on load side of existing RCD); Reg 551.7.1(c) bidirectional protective device (NEW); Chapter 82 Prosumer\'s Electrical Installations (NEW); Reg 531.3.3 Type AC RCD restriction (UPDATED — only for fixed equipment with no DC components); the PV-specific Reg 712.531.3.5.1 sets Type B default with three exceptions; "TN-C-S (PNB)" terminology update.',
              'Every Section 712 reg maps to a design / install / commissioning stage: 712.433.101.1 (design sizing); 712.431.101 / 102 (design + install string fuses); 712.421 (throughout — cable / connectors / isolators / install / commissioning); 712.512.2.1 (design + install thermal); 712.542.102 (design + install bonding); 712.521.102 (design + install routing).',
              'Cert evidence bundle structure: (1) MCS MIS 3002 design pack; (2) install photographs; (3) BS EN 62446-1 commissioning records + SoTR; (4) MCS certificate; (5) EREC G98/G99/G100 documents; (6) DNO confirmation; (7) customer handover pack. Archived 25 years.',
              '19th Edition (planned late-2020s) will evolve Section 712 — likely additions: explicit rapid-shutdown / arc-fault requirements; refined Type B RCD criteria; tighter BESS / prosumer integration; energy-efficiency (Appendix 17 → Part 8). Development ongoing 2026-2028.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Map every Section 712 regulation to its design / install / commissioning stage and the supporting evidence in the cert evidence bundle.',
              'Apply the A4:2026 changes affecting PV: Reg 551.7.1(c)/(d) source connection, Chapter 82 PEIs, Chapter 57 BESS, Reg 712.531.3.5.1 Type B default cross-ref Reg 531.3.3 general rule, Reg 722.411.4.1 PME exception removal, TN-C-S (PNB) terminology.',
              'Use BS 7671 Section 712 + IET CoP for Grid-Connected Solar PV Installations + MCS MIS 3002 as the full UK PV install standard.',
              'Assemble the cert evidence bundle — design pack, install photographs, BS EN 62446-1 records, MCS cert, EREC documents, DNO confirmation, customer handover pack.',
              'Read the cert evidence bundle as the audit trail for the install life — MCS audit, EICR-style periodic inspection, customer service, ownership transfer.',
              'Anticipate 19th Edition direction: likely additions / refinements to Section 712 for emerging UK PV practice.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>
            Section 712 is the regulation. IET CoP is the workflow. MCS MIS 3002 is the scheme. Cert
            bundle is the audit trail.
          </Pullquote>

          <ContentEyebrow>Section 712 mapped to the workflow</ContentEyebrow>

          <ConceptBlock
            title="Every Section 712 reg — and where it operationalises"
            plainEnglish="Section 712 reads as a regulatory list. The competent install workflow ties each reg to a specific design / install / commissioning stage and the supporting evidence in the cert evidence bundle."
            onSite="The mapping below is the synthesis of Modules 3 Sections 1-7. Each reg has its workflow location; the cert evidence bundle archives the evidence."
          >
            <p>Section 712 regs by workflow stage:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">
                  712.433.101.1 (V_oc_max / Upc_max / Isc_max determination)
                </strong>{' '}
                — design stage (Section 2). Conservative defaults 1.2 / 1.25 OR manufacturer
                temperature coefficient + site extremes. Used in inverter MPPT sizing (three voltage
                rules) and DC cable sizing
              </li>
              <li>
                <strong className="text-white">712.431.101 (string-protection condition)</strong> —
                design stage (Section 2). Above 2 strings: protection required where 1.35 ×
                I_mod_max_ocer &lt; (Ns-1) × I_sc_max IS MET. Explicit: 1 or 2 strings never need
                protection
              </li>
              <li>
                <strong className="text-white">712.431.102 (string-protection requirement)</strong>{' '}
                — design stage. Where Reg 712.431.101 mandates protection, devices specified per Reg
                712.432.103 (gPV per BS EN 60269-6 / fuse-combination per BS EN 60947-3 / DC-MCBs
                per BS EN 60947-2 / 60898-2 / IEC 60898-3)
              </li>
              <li>
                <strong className="text-white">712.421 (fire protection)</strong> — throughout.
                Design: cable per Reg 712.521.1041 (BS EN 50618), connectors per Reg 712.526.101 (BS
                EN 62852), isolator BS EN 60947-3. Install: compatible MC4 pairs,
                manufacturer-torque, flashing-tile, cables NOT directly on roof surface, notices per
                Reg 712.514.102 / 103. Commissioning: functional test of isolator under load + IMD
                verification
              </li>
              <li>
                <strong className="text-white">712.512.2.1 (thermal arrangement)</strong> — design +
                install. Design: site irradiance assessment (Section 1). Install: 70-100 mm standoff
                (Section 3) + manufacturer mounting spec
              </li>
              <li>
                <strong className="text-white">712.542.102 (functional bonding)</strong> — design +
                install. Design: check module manufacturer requirement and inverter galvanic
                isolation. Install: single-point bonding only when both conditions met
              </li>
              <li>
                <strong className="text-white">712.521.102 (lightning loop minimisation)</strong> —
                design + install. Design: route DC + bonding side-by-side. Install: cables strapped
                together or in same conduit, minimising enclosed area
              </li>
              <li>
                <strong className="text-white">
                  712.410.101 (DC side energised when AC disconnected)
                </strong>{' '}
                — install + commissioning + handover. Drives Reg 712.514.102 / 712.514.103 notice
                content; drives DC-isolator requirement
              </li>
              <li>
                <strong className="text-white">712.412.101 (Class II insulation on DC side)</strong>{' '}
                — design + install. Drives cable selection per Reg 712.521.1041 (BS EN 50618
                single-core, etc.)
              </li>
              <li>
                <strong className="text-white">
                  712.421.101.1 / 712.538.101 (Insulation Monitoring Device)
                </strong>{' '}
                — install + commissioning. IMD per BS EN 61557-8 mandatory; usually
                inverter-integrated per BS EN 62109-2 — manufacturer datasheet evidences
              </li>
              <li>
                <strong className="text-white">
                  712.432 / 712.432.101 / 712.432.102 / 712.432.103 (protective device
                  characteristics)
                </strong>{' '}
                — design. Sizing 1.1 × I_sc_max &lt; I_n ≤ I_mod_max_ocer; both polarities
                protected; blocking diodes NOT acceptable; devices gPV (BS EN 60269-6) /
                fuse-combination (BS EN 60947-3) / DC-MCBs (BS EN 60947-2 / 60898-2 / IEC 60898-3)
              </li>
              <li>
                <strong className="text-white">
                  712.433.1 / 712.433.103 (overload protection omission)
                </strong>{' '}
                — design. Overload may be omitted when cable CCC ≥ 1.25 × I_sc_stc at any location
              </li>
              <li>
                <strong className="text-white">712.433.104 (AC supply cable)</strong> — design. AC
                cable OCPD basis: max AC current or 1.1 × rated AC if not specified
              </li>
              <li>
                <strong className="text-white">
                  712.511.101 / 712.511.102 / 712.511.103 (equipment standards)
                </strong>{' '}
                — design + handover. Modules per BS EN 61215; inverters per BS EN 62109-1 / -2;
                combiner boxes per BS EN [IEC] 61439 (or BS EN 60670-24 residential)
              </li>
              <li>
                <strong className="text-white">712.512.102 (outdoor enclosures)</strong> — install.
                IP44 + IK07 minimum per BS EN 60529 / 62262
              </li>
              <li>
                <strong className="text-white">
                  712.514.101 / 712.514.102 / 712.514.103 (notices)
                </strong>{' '}
                — install + handover. Instruction notice at origin / metering / CU; "SOLAR DC — Live
                parts can remain energized after isolation" at each DC access point; "Isolate both
                AC and DC sides before servicing" on inverter
              </li>
              <li>
                <strong className="text-white">712.521.1041 (DC cable selection)</strong> — install.
                H1Z2Z2-K to BS EN 50618 OR insulated single-core in conduit; cables NOT directly on
                roof surface
              </li>
              <li>
                <strong className="text-white">712.523.101 (cable design ambient)</strong> — design.
                70°C ambient for cables under PV modules
              </li>
              <li>
                <strong className="text-white">712.526.1 / 712.526.101 (connectors)</strong> —
                install. Compatible pairs (recommended manufacturer check) per BS EN
                62852:2015+A1:2020; key/tool isolation if accessible to ordinary persons
              </li>
              <li>
                <strong className="text-white">
                  712.531.3.5.1 (RCD type for PV AC supply circuit)
                </strong>{' '}
                — design. Type B per BS EN 62423 or BS EN 60947-2 default, with three exceptions:
                (a) inverter simple AC/DC separation; (b) transformer-winding separation; (c)
                manufacturer states Type B not required. Cross-refs Reg 531.3.3 (general rule
                restricting Type AC)
              </li>
              <li>
                <strong className="text-white">
                  712.534.101 / 712.534.102 / 712.534.102.1 / 712.534.102.4 (SPDs)
                </strong>{' '}
                — design + install. DC SPDs per BS EN 61643-31; Type 2 default; Type 1 where
                direct-strike LPS separation not maintained; minimum I_n = 5 kA; LPS separation per
                BS EN 62305-3
              </li>
              <li>
                <strong className="text-white">
                  712.537.2.2.104 (lockable non-breaking devices)
                </strong>{' '}
                — install. Devices without breaking capacity (e.g. SPDs) shall be locked against
                inadvertent operation
              </li>
              <li>
                <strong className="text-white">
                  712.542.101 (equipotential bonding of PV metal structures)
                </strong>{' '}
                — install. Mounting structures + metal cable management bonded; aluminium requires
                corrosion-protected terminations
              </li>
              <li>
                <strong className="text-white">712.542.3.101 (functional bonding conductor)</strong>{' '}
                — install. Minimum 4 mm² copper equivalent (insulated or bare)
              </li>
              <li>
                <strong className="text-white">712.6.101 (inspection and testing)</strong> —
                commissioning. Authorises BS EN 62446 series commissioning workflow; SoTR records
                the result
              </li>
              <li>
                <strong className="text-white">712.1 (scope)</strong> — design. Section 712 covers
                PV generators (a) supplying an installation not connected to the public grid, (b) in
                parallel with the grid, or (c) as an alternative to the grid. NOTE: stand-alone
                (off-grid) PV power supply systems are &ldquo;under consideration&rdquo; — Section
                712 does NOT yet fully cover them. Off-grid PV (covered in Module 4) draws
                additional design discipline from manufacturer specs and the IET CoP
              </li>
              <li>
                <strong className="text-white">
                  712.410.102 (permitted DC protective measures)
                </strong>{' '}
                — design. On the DC side, ONE of: (a) double or reinforced insulation per Section
                412; OR (b) extra-low voltage (SELV / PELV) per Section 414. Typical UK domestic PV
                uses (a) Class II — V_oc_max far exceeds the 120 V DC SELV/PELV limit of Reg
                712.414.1.1
              </li>
              <li>
                <strong className="text-white">
                  712.410.3.5 / 712.410.3.6 (protective measures NOT permitted)
                </strong>{' '}
                — design. The following protective measures SHALL NOT be used on the DC side:
                obstacles and placing out of reach (Section 417); non-conducting location (Reg
                418.1); earth-free local equipotential bonding (Reg 418.2); electrical separation
                for the supply of more than one item of current-using equipment (Reg 418.3).
                Practical implication: typical UK PV must use Class II (Reg 712.412.101) — the
                alternatives are excluded
              </li>
              <li>
                <strong className="text-white">
                  712.414.1.1 / 712.414.4.5 (SELV / PELV constraints)
                </strong>{' '}
                — design. If SELV / PELV is chosen, U_oc_max ≤ 120 V DC and basic protection
                required where nominal V &gt; 30 V DC. Typical UK domestic PV (V_oc_max 400-600 V)
                is OUTSIDE the SELV / PELV envelope — Class II (Reg 712.412.101) is the operational
                choice
              </li>
              <li>
                <strong className="text-white">712.2 (functional bonding disconnect device)</strong>{' '}
                — install. Where functional bonding per Reg 712.542.102 is applied, the automatic
                disconnecting device in the functional bonding conductor is sized per the Reg 712.2
                table: ≤25 kW = 1 A; &gt;25-50 kW = 2 A; &gt;50-100 kW = 3 A; &gt;100-250 kW = 4 A;
                &gt;250 kW = 5 A
              </li>
              <li>
                <strong className="text-white">
                  712.312.2 (DC live-conductor earthing permission)
                </strong>{' '}
                — design. Earthing of one DC live conductor permitted with at least simple
                separation between AC and DC; the foundational reg behind functional bonding
                (712.542.102). NOTE: corrosion prevention per BS EN 13636 / BS EN 15112
              </li>
              <li>
                <strong className="text-white">
                  712.421.101 / 712.421.101.2 (functional-earthing fault interruption)
                </strong>{' '}
                — install. Where functional earthing applied to a DC live conductor, means provided
                to interrupt fault current; the automatic disconnecting device per Reg 712.2
                satisfies this
              </li>
              <li>
                <strong className="text-white">712.444.4.2.14 (general loop minimisation)</strong> —
                install. General reg: area of all wiring loops shall be as small as possible. Reg
                712.521.102 is the PV-specific implementation of this principle
              </li>
              <li>
                <strong className="text-white">712.512.101 (blocking diodes)</strong> — design. If
                blocking diodes used (for polarity, NOT overcurrent per Reg 712.432.102): reverse
                voltage ≥ 2 × U_oc_max of string; rated current ≥ 1.1 × I_sc_max; connected in
                series with PV strings
              </li>
              <li>
                <strong className="text-white">712.533.101 (bidirectional OCPDs)</strong> — design.
                DC-side overcurrent protective devices SHALL be bidirectional. Voltage U_e ≥
                U_oc_max; breaking capacity ≥ I_sc_max of array
              </li>
              <li>
                <strong className="text-white">
                  712.534.102.2 + Table 712.1 (SPD U_imp selection)
                </strong>{' '}
                — design. Where manufacturer info not provided, rated impulse withstand voltage
                U_imp selected from Table 712.1 by V_oc_max
              </li>
              <li>
                <strong className="text-white">712.551 (parallel-operation requirements)</strong> —
                design. Additional requirements where the generating set operates in parallel with
                other sources including the public distribution network
              </li>
              <li>
                <strong className="text-white">Wider BS 7671 (interacts with Section 712)</strong> —
                Reg 551.7.1(c) bidirectional protective device (A4:2026 NEW); Reg 551.7.1(d) source
                connection (A4:2026 NEW); Reg 531.3.3 general RCD type rule (cross-ref from
                712.531.3.5.1); Reg 722.411.4.1 PME exception removed (A4:2026); TN-C-S (PNB) supply
                terminology (A4:2026)
              </li>
            </ul>
          </ConceptBlock>

          <Reg712WorkflowMap
            caption="Section 712 reg-to-workflow map — table layout. Columns: Reg, Workflow stage (Design / Install / Commissioning), Operational source (which course section), Evidence in cert bundle. Rows for each Section 712 reg covered in Module 3 Sections 1-7, plus A4:2026 NEW regs (551.7.1(d), 531.3.3, Chapter 82)."
          />

          <InlineCheck {...inlineChecks[0]} />

          <InlineCheck {...inlineChecks[1]} />

          <InlineCheck {...inlineChecks[2]} />

          <InlineCheck {...inlineChecks[3]} />

          <InlineCheck {...inlineChecks[4]} />

          <InlineCheck {...inlineChecks[5]} />

          <SectionRule />

          <ContentEyebrow>A4:2026 changes affecting PV</ContentEyebrow>

          <Pullquote>
            Reg 551.7.1(d) source connection. Chapter 82 PEIs. Type B default. TN-C-S (PNB).
          </Pullquote>

          <ConceptBlock
            title="The A4:2026 changes that affect PV install design"
            plainEnglish="A4:2026 (effective 15 April 2026, A3 withdrawn 15 October 2026) brought several changes affecting PV installs. Some are new regs; some are clarifications of existing regs."
            onSite="The MCS-certified contractor must understand each change and update the install workflow / design pack accordingly. The IET CoP for Grid-Connected Solar PV Installations is expected to update to reflect A4:2026 in its next edition."
          >
            <p>Key A4:2026 changes affecting PV:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">
                  Reg 551.7.1(d) — source connection rule (NEW)
                </strong>
                : PV / BESS inverter must NOT be on the load side of an RCD protecting the rest of
                the installation. Triggers dedicated RCBO, split-load CU, or all-RCBO CU. Detailed
                in Section 6
              </li>
              <li>
                <strong className="text-white">
                  Chapter 82 — Prosumer\'s Electrical Installations (PEIs) (NEW)
                </strong>
                : regulatory framework for installations that BOTH consume and generate / store
                electricity. Covers integration of PV + BESS + EV charging + grid in a single
                &ldquo;prosumer&rdquo; install. Detailed in Module 1 Section 2 and Module 10
              </li>
              <li>
                <strong className="text-white">
                  Chapter 57 — Stationary secondary batteries (NEW)
                </strong>
                : regulatory framework for batteries in electrical installations. Detailed in Module
                5 (BESS)
              </li>
              <li>
                <strong className="text-white">
                  Reg 531.3.3 — RCD Type AC restriction (UPDATED in A4:2026)
                </strong>
                : Type AC RCDs shall only be used to serve fixed equipment where it is KNOWN the
                load current contains no DC components. For PV inverter circuits specifically, the
                PV-specific rule is Reg 712.531.3.5.1 — Type B default per BS EN 62423 or BS EN
                60947-2, with three exceptions: (a) inverter provides simple separation between AC
                and DC; (b) separate transformer windings between inverter and RCD; (c) inverter
                manufacturer states Type B not required. Detailed in Section 6
              </li>
              <li>
                <strong className="text-white">Appendix 17 — Energy efficiency (NEW)</strong>:
                planning framework for energy-efficient install design. Planned to become Part 8 in
                19th Edition
              </li>
              <li>
                <strong className="text-white">TN-C-S (PNB) terminology (UPDATED)</strong>: UK PME
                supplies now formally termed "TN-C-S (PNB)" — Protective Neutral Bonded. Functional
                behaviour unchanged; terminology aligned with international IEC convention
              </li>
              <li>
                <strong className="text-white">Reg 722.411.4.1 PME exception (REMOVED)</strong>:
                A3\'s "reasonably practicable" exception to the PME requirement for EV charging was
                removed in A4. Detailed in Module 6 (EV charging)
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The cert evidence bundle — structure and purpose</ContentEyebrow>

          <Pullquote>
            Seven sections. 25-year archive. The audit trail for the install life.
          </Pullquote>

          <ConceptBlock
            title="Cert evidence bundle — what it is and what it does"
            plainEnglish="The cert evidence bundle is the structured archive of every install document. Audit trail for MCS, EICR, customer service, ownership transfer. Archived for the install life (25 years)."
            onSite="The bundle is the customer\'s archive. The competent installer hands over a complete bundle at install completion; the customer signs receipt. The bundle is referenced for the install life."
          >
            <p>Cert evidence bundle structure:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">1. MCS MIS 3002 design pack</strong> — site survey,
                yield modelling, single-line schematic, component schedule, MPPT calculations, cable
                sizing, string-fuse inequality, customer information pack content
              </li>
              <li>
                <strong className="text-white">2. Install photographs</strong> — DC routing, AC
                routing, mounting + flashing-tile, modules + frame bonding, MC4 connector +
                crimping, isolator placements + labelling, all labels (residual-energy warnings,
                isolator labels)
              </li>
              <li>
                <strong className="text-white">3. BS EN 62446-1 commissioning records</strong> —
                continuity, polarity, V_oc / I_sc per string (with test conditions), I-V curve
                (where measured), IR test (test voltage + measured + conditions), functional tests
                of isolators and protective devices. Schedule of Test Results signed off
              </li>
              <li>
                <strong className="text-white">4. MCS certificate</strong> — issued after install
                completion. Feeds the EPC and property valuation
              </li>
              <li>
                <strong className="text-white">5. EREC G98 / G99 / G100 documents</strong> — G98
                notification (for ≤16 A installs); G99 application + DNO approval letter (for &gt;16
                A); G100 verification testing record (for export-limited installs)
              </li>
              <li>
                <strong className="text-white">6. DNO confirmation</strong> — DNO\'s confirmation of
                receipt and acceptance of the G98 / G99 notification
              </li>
              <li>
                <strong className="text-white">7. Customer handover pack</strong> — operating
                manual, maintenance schedule, warranty details, emergency contacts, scheduled
                inspection reminders. Customer signs receipt
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="How the bundle is used over the install life"
            plainEnglish="The bundle is referenced at multiple points over the install life — MCS audit (random sample), EICR-style periodic inspection (5-yearly typical), customer service, ownership transfer, insurance claim, end-of-life decision."
            onSite="The competent installer designs the bundle for future readability — clear structure, complete content, durable archive (paper + digital). The customer\'s long-term install reliability depends on the bundle\'s continued accessibility."
          >
            <p>Bundle use cases:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">MCS audit</strong> — random sample of installs;
                auditor reads design pack against BS 7671 Section 712 + MCS MIS 3002; gaps trigger
                major findings requiring rectification
              </li>
              <li>
                <strong className="text-white">
                  EICR-style periodic inspection (typically 5-yearly for PV)
                </strong>{' '}
                — inspector reads SoTR baseline; measures current values; compares; identifies
                degradation / faults / operational issues
              </li>
              <li>
                <strong className="text-white">Customer service / fault investigation</strong> —
                fault diagnosis references the design pack, SoTR baseline, install photographs to
                localise the root cause efficiently
              </li>
              <li>
                <strong className="text-white">Property ownership transfer</strong> — bundle
                transfers to new owner; supports property valuation (PV cert + EPC) and continuity
                of SEG export tariff
              </li>
              <li>
                <strong className="text-white">Insurance claim</strong> — bundle evidences
                professional design and install; supports claim for lightning damage, fire, or other
                insured loss
              </li>
              <li>
                <strong className="text-white">End-of-life decision (year 25-30)</strong> — bundle
                informs repower / replace / continue decision
              </li>
            </ul>
          </ConceptBlock>

          <CertBundleStructure
            caption="Cert evidence bundle structure diagram — folder layout with 7 sections labelled. Each section labelled with content summary and the workflow stage that produces it. Annotated with the use cases over the install life (MCS audit, EICR, customer service, ownership transfer, insurance, end-of-life)."
          />

          <InlineCheck {...inlineChecks[6]} />

          <InlineCheck {...inlineChecks[7]} />

          <SectionRule />

          <ContentEyebrow>
            BS 7671 Section 712 + IET CoP + MCS MIS 3002 — the full UK PV install standard
          </ContentEyebrow>

          <Pullquote>Three documents. One competent workflow.</Pullquote>

          <ConceptBlock
            title="The three-document standard"
            plainEnglish="The full UK PV install standard combines three documents with overlapping but distinct purposes: BS 7671 Section 712 (regulatory), IET CoP (operational), MCS MIS 3002 (scheme)."
            onSite="The competent installer uses all three. Section 712 sets the regs; IET CoP gives the worked examples and templates; MCS MIS 3002 adds scheme reporting and audit trail. The cert evidence bundle archives compliance evidence per all three."
          >
            <p>The three documents in detail:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">BS 7671:2018+A4:2026 Section 712</strong> —
                regulatory framework. Legal requirements for safe and compliant PV electrical
                installations. What the install MUST achieve. Currently A4:2026 (effective 15 April
                2026). Next major update: 19th Edition (planned late-2020s)
              </li>
              <li>
                <strong className="text-white">
                  IET Code of Practice for Grid-Connected Solar PV Installations (5th edition)
                </strong>{' '}
                — operational guidance. Worked examples, decision charts, design-pack templates,
                troubleshooting, photo / record discipline. HOW to achieve compliance. Expected next
                edition to reflect A4:2026 changes
              </li>
              <li>
                <strong className="text-white">MCS MIS 3002</strong> — scheme requirements for
                grant-funded installs. Design pack contents, audit trail, customer information pack
                format, MCS audit process, contractor competency requirements. The grant-funded
                install ADDITIONS to Section 712 + IET CoP
              </li>
            </ul>
            <p>
              The three combine into a coherent workflow: design per Section 712 + IET CoP + MCS MIS
              3002; install per Section 712 + IET CoP; commission per Section 712 + IET CoP + BS EN
              62446-1; archive per MCS MIS 3002. The cert evidence bundle is the unified archive.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>19th Edition outlook</ContentEyebrow>

          <Pullquote>
            The next major revision after A4:2026 — late-2020s. Direction known; detail TBD.
          </Pullquote>

          <ConceptBlock
            title="What the 19th Edition is likely to bring for PV"
            plainEnglish="The 19th Edition is the next major BS 7671 revision after A4:2026. Development is ongoing through 2026-2028. Detail not yet published; direction can be inferred from current development discussion."
            onSite="The competent installer\'s investment in Section 712 + IET CoP + MCS MIS 3002 workflow remains valid — the 19th Edition will refine, not revolutionise. The cert evidence bundle structure carries forward."
          >
            <p>Likely 19th Edition direction for PV:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">
                  Explicit rapid-shutdown / arc-fault requirements
                </strong>{' '}
                — currently optional in UK; some markets (US NEC, Germany) mandate. 19th Edition may
                codify UK rapid-shutdown for new installs
              </li>
              <li>
                <strong className="text-white">Refined Type B RCD criteria</strong> — with the
                growth of transformerless-with-internal-DC-management inverters, the three permitted
                exceptions in Reg 712.531.3.5.1 (and the general Reg 531.3.3 rule) may be refined
              </li>
              <li>
                <strong className="text-white">Tighter BESS / prosumer integration</strong> —
                Chapter 57 (BESS) and Chapter 82 (PEIs) added in A4:2026 will mature in 19th Edition
                with more integrated cross-references and design workflows
              </li>
              <li>
                <strong className="text-white">Energy efficiency — Appendix 17 → Part 8</strong> —
                A4:2026\'s Appendix 17 planned to become a full Part 8 in 19th Edition.
                Energy-efficiency design requirements will become more prominent
              </li>
              <li>
                <strong className="text-white">
                  Updates to IET CoP for Grid-Connected Solar PV Installations
                </strong>{' '}
                — likely 6th edition aligned with 19th Edition publication
              </li>
              <li>
                <strong className="text-white">MCS MIS 3002 evolution</strong> — likely additions
                for prosumer / BESS / EV-coupled installs; refined audit criteria
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>What it looks like in the wild</ContentEyebrow>

          <Scenario
            title="MCS audit visit — competent contractor walks through the cert evidence bundle"
            situation="MCS auditor arrives at a UK contractor\'s office for a scheduled audit. The auditor selects a random sample of 5 installs from the previous 12 months. The contractor produces each install\'s cert evidence bundle for review."
            whatToDo="Walk through each bundle systematically with the auditor: (1) MCS MIS 3002 design pack — auditor reads against BS 7671 Section 712 (sizing calculations per Reg 712.433.101.1, string-fuse inequality per Reg 712.431.101, etc.); (2) Install photographs — auditor verifies DC routing per Reg 712.521.102 (side-by-side with bonding), connector brand consistency per Reg 712.421, flashing-tile orientation per Section 3, standoff per Reg 712.512.2.1; (3) BS EN 62446-1 commissioning records — auditor verifies SoTR completeness and the test results; (4) MCS cert; (5) EREC G98/G99/G100 documents; (6) DNO confirmation; (7) Customer handover pack with customer signature. Where the auditor identifies a finding, the contractor records the rectification plan; both parties sign the audit report."
            whyItMatters="The MCS audit is the contractor\'s validation that the install workflow is operating correctly. Findings prompt rectification; recurring findings prompt workflow improvement. The competent contractor\'s cert evidence bundle structure makes the audit efficient and the rectification surface area minimal."
          />

          <Scenario
            title="Customer\'s house sale — cert evidence bundle transferred to new owner"
            situation="A property with a 7-year-old PV install is sold. The seller (current owner) transfers the cert evidence bundle to the buyer (new owner) as part of the conveyance."
            whatToDo="The seller provides: (1) physical paper copy of the bundle (most-referenced documents — design pack summary, MCS cert, BS EN 62446-1 SoTR, customer handover pack); (2) digital copy (cloud link or USB) of the full bundle including install photographs and detailed records. The buyer verifies: (a) MCS certificate is current and matches the install; (b) BS EN 62446-1 SoTR provides the baseline for future EICR; (c) any updates to the bundle (e.g. 5-yearly inspection records, repairs / replacements). The property valuation reflects the PV install positively based on the bundle\'s evidence. The buyer becomes the new bundle custodian."
            whyItMatters="Cert evidence bundles transfer between owners over the install life. The bundle\'s value grows as the original install team becomes less accessible. Competent contractors design bundles for multi-decade readability — clear structure, durable archive, multi-format (paper + digital + cloud)."
          />

          <CommonMistake
            title="Section 712 regs treated as separate checklists rather than an integrated workflow"
            whatHappens="An installer treats each Section 712 reg as a separate compliance checkbox — sizing calculations done, string fuses considered, isolator specified, bonding done. The install is technically compliant but the cert evidence bundle is fragmented; the regs aren\'t cross-referenced; the BS EN 62446-1 commissioning records don\'t link back to the design pack sizing inputs. MCS audit finds the disconnects — major finding for cert evidence bundle integrity."
            doInstead="Treat Section 712 + IET CoP + MCS MIS 3002 as an integrated workflow. Every design pack section references the relevant Section 712 reg AND the BS EN 62446-1 commissioning test that validates it. The cert evidence bundle is the unified archive — design through commissioning through handover, with cross-references throughout. The IET CoP provides the operational templates that enforce this integration."
          />

          <CommonMistake
            title="Cert evidence bundle archived in single-format (only paper or only digital) — accessibility risk"
            whatHappens="An installer archives the cert evidence bundle only in paper format. 10 years later, the customer needs the bundle for an insurance claim. The paper archive has been water-damaged or partially lost. Or — an installer archives only in digital format on a cloud service; 10 years later, the service has closed and the customer\'s digital bundle is inaccessible."
            doInstead="Multi-format archive — paper + digital + cloud. The bundle\'s 25-year accessibility depends on resilient archive strategy. Modern UK contractors typically use a cloud-based document management system PLUS provide paper / USB copy to the customer. Customer educated on multi-format archive value."
          />

          <CommonMistake
            title="A4:2026 changes not propagated through the install workflow"
            whatHappens="A contractor continues to use pre-A4:2026 design pack templates after April 2026. New installs are connected on the load side of single-RCD CUs (Reg 551.7.1(d) violation); RCD type defaults per Reg 712.531.3.5.1 not updated; A4:2026 references missing from cert evidence bundles. MCS audit at the end of 2026 finds the A4:2026 non-compliance — multiple major findings across the contractor\'s post-April installs."
            doInstead="Propagate A4:2026 changes through the install workflow from the effective date (15 April 2026): update design pack templates to reflect Reg 551.7.1(c) / (d); update RCD type defaults per Reg 712.531.3.5.1 with the three exception conditions; update cert evidence bundle reg references; train the install team on the A4:2026 changes. The competent contractor pre-trained on A4:2026 from late-2025; readiness review at January 2026; transition complete by April 2026 effective date."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'BS 7671 Section 712 is the regulatory framework for UK PV electrical installations. Covers DC side from module to AC-side connection.',
              'Section 712 + IET CoP for Grid-Connected Solar PV Installations + MCS MIS 3002 = the full UK PV install standard. Three documents, one competent workflow.',
              "A4:2026 changes affecting PV: Reg 551.7.1(c)/(d) source-connection rules (NEW); Chapter 82 Prosumer's Electrical Installations (NEW); Chapter 57 Stationary Secondary Batteries (NEW); Reg 531.3.3 Type AC restriction (UPDATED); the PV-specific Reg 712.531.3.5.1 sets Type B default with three exceptions; Appendix 17 energy efficiency (planned Part 8 in 19th Edition); Reg 722.411.4.1 PME exception removed; TN-C-S (PNB) terminology update.",
              'Every Section 712 reg maps to a design / install / commissioning stage: 712.433.101.1 (sizing); 712.431.101 / 102 (fuses); 712.421 (fire — throughout); 712.512.2.1 (thermal); 712.542.102 (bonding); 712.521.102 (lightning loop).',
              'Cert evidence bundle structure: (1) MCS MIS 3002 design pack; (2) install photographs; (3) BS EN 62446-1 commissioning records + SoTR; (4) MCS certificate; (5) EREC G98/G99/G100 documents; (6) DNO confirmation; (7) customer handover pack. Archived 25 years, multi-format.',
              'Bundle used over install life for: MCS audit (sample), EICR-style periodic inspection (5-yearly), customer service / fault investigation, ownership transfer, insurance claim, end-of-life decision.',
              '19th Edition (planned late-2020s) will refine Section 712: likely additions for rapid-shutdown / arc-fault, refined Type B criteria, tighter BESS / prosumer integration, energy efficiency (Appendix 17 → Part 8).',
              'The next courses (Module 4-12) build on Module 3 foundations: diverters, off-grid, hybrid (Module 4); BESS (Module 5 + Chapter 57); EV charging (Modules 6-7); heat pumps (Module 8); other LCT (Module 9); hybrid + EMS (Module 10); arc-fault + lightning + 19th Edition (Module 11); commissioning + handover at integration scale (Module 12).',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 8 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-3-section-7')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section 7
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                BS EN 62446-1 testing
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/renewable-energy-module-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next module <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Module 4 · Diverters &amp; hybrid
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
