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
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm7s8-commissioning-vs-m6',
    question: 'Commercial commissioning vs M6.8 domestic commissioning — what changes?',
    options: [
      'Nothing changes — the single-charger sequence is repeated and signed off once for the site',
      'Commercial sites need less testing because factory commissioning covers the assembly',
      'The per-charger sequence × N plus assembly, DNO, OCPP, PCAR and multi-charger DLM',
      'Only the payment terminal and signage are added; the electrical testing is unchanged',
    ],
    correctIndex: 2,
    explanation:
      'Commercial commissioning extends M6.8 domestic with multiple additional layers per the M7 regulatory stack. Per-charger Section 722 commissioning (M6.8 sequence) × N chargers. Plus: BS EN IEC 61439-7 multi-charger assembly verification (manufacturer DoC review + on-site visual + test of cluster-level protection coordination); DNO connection commissioning (HV transformer + LV switchgear at hub sites); CPMS OCPP integration test per charger (boot + heartbeat + auth + smart-charging); PCAR 2023 pillar configuration verification (payment + pricing display + helpline signage + open-data); PAS 1899 accessibility audit; multi-charger DLM commissioning (CT clamp + supply limit + throttle response); fleet CPMS + telematics integration test (if fleet); payment terminal commissioning + PCI-DSS compliance (if public). Cert evidence bundle is substantially thicker than M6.',
  },
  {
    id: 'm7s8-eicr-commercial',
    question: 'How does EICR work for a large commercial / public charging site?',
    options: [
      'No EICR is required for commercial charging sites because the CPMS monitors charger health',
      'A single whole-site EICR is produced once at year 10 covering all chargers together',
      'The CPO is solely responsible; the installing contractor has no inspection obligations',
      'Per-charger EICR × N, assembly and HV inspection, plus CPMS and PCAR-pillar checks',
    ],
    correctIndex: 3,
    explanation:
      'Commercial EICR covers all the install’s regulatory layers. Per-charger EICR: standard M6.8 procedure × N chargers; Type B-capable instrument required for Type B RCD testing; per-charger OPDD + RDC-PD self-tests; per-charger CP/PP signalling verification. Assembly-level: BS EN IEC 61439-7 LV switchgear inspection + protective device coordination verification. Transformer + HV switchgear: separate cycle by HV-qualified engineer (typically annual or per manufacturer schedule). CPMS-side: OCPP integration verified working; OCPI roaming functional; CPMS publishing open-data current. PCAR pillar audit: payment terminals tested, pricing display accurate, helpline answered, accessibility per PAS 1899 maintained. UK 2025-26 typical interval: 5 years standard; some high-utilisation sites on 3-year cycle. Cert evidence bundle for EICR documents all layers.',
  },
  {
    id: 'm7s8-multi-charger-dlm-test',
    question: 'Multi-charger DLM commissioning — what tests are required?',
    options: [
      'CT clamp calibration, controller config, a simulated load test, CPMS link and fail-safe test',
      'A single CT clamp check; the DLM controller self-calibrates with no on-site load testing',
      'Only a visual check that the controller powers up; behaviour is validated remotely by the CPMS',
      'The supply limit is set in software and verified by the factory test, with no on-site testing',
    ],
    correctIndex: 0,
    explanation:
      'Multi-charger DLM commissioning is more involved than single-charger. Required tests: (1) CT clamp installation + orientation + calibration — install on main incoming tails; verify orientation matches DLM controller spec; verify CT reads match site current at typical loads. (2) DLM controller commissioning — supply limit configured (e.g. 95 A per phase margin); per-charger allocation logic activated; site-cluster hierarchy verified. (3) Simulated load test — start a high non-EV site load (e.g. building loads going on / off); verify EV chargers throttle accordingly; verify throttle response time (sub-second typical). (4) Per-charger CP PWM verification — chargers receiving allocation from DLM controller + applying to vehicles. (5) CPMS integration — DLM allocations reflected in CPMS dashboard; OCPP smart-charging messages received. (6) Fail-safe test — disconnect DLM controller comms; verify chargers fall back to safe minimum current (typically 6 A); reconnect; verify normal operation resumes. Cert evidence bundle records all DLM commissioning steps + results.',
  },
  {
    id: 'm7s8-handover-document',
    question: 'Commercial handover document — what does it contain?',
    options: [
      'Just the installation date and the installer’s contact details on a single cover sheet',
      'A structured deliverable: summary, scope split, named contacts, warranty, EICR and access',
      'A photo album of the completed installation, with test results held separately by the installer',
      'A signature page confirming the customer accepts the work, with technical detail kept back',
    ],
    correctIndex: 1,
    explanation:
      'Commercial handover document = structured digital deliverable, much richer than domestic handover pack. Contents: (1) project summary — what was installed, where, when, for whom; (2) site classification — workplace / public AC / public DC fast / fleet / commercial-curtilage; (3) regulatory framework applied — the 8-layer stack from M7.1; (4) cert evidence bundle table of contents — hyperlinks to each section / layer / charger; (5) ongoing operator obligations — clear delineation of installer-completed vs operator-ongoing scope; (6) named contacts — installer technical support, CPO / operator, manufacturer support, CPMS support — phone, email, escalation procedures; (7) first-year warranty terms; (8) EICR schedule + intervals + responsibilities; (9) emergency procedures — what to do if charger fails, what to do in incident; (10) cert evidence bundle digital access — operator receives read-write access. UK 2025-26 mature practice: SharePoint / Confluence / similar shared workspace as the cert evidence bundle storage.',
  },
];

const quizQuestions = [
  {
    question: 'Workplace install — 4 × 22 kW chargers + OZEV grant + OCPP + DLM. Commissioning sequence?',
    options: [
      'Per-charger Section 722 × 4, assembly, DLM, OCPP, grant evidence, then EIC and handover',
      'Energise all four chargers first, then commission only those the customer reports as faulty',
      'Commission one charger fully, assume the other three are identical and sign one certificate',
      'Leave commissioning to the customer’s facilities team to test in service over the first month',
    ],
    correctAnswer: 0,
    explanation:
      'Workplace install commissioning sequence: (1) Per-charger Section 722 commissioning per M6.8 sequence × 4 chargers — visual + IR + RCD trip-time + ADS + OPDD + RDC-PD + CP/PP. (2) BS EN IEC 61439-7 multi-charger assembly verification (if shared distribution panel). (3) DLM commissioning — CT clamp install + orientation + calibration + supply limit configuration + simulated load test + verify throttle response. (4) OCPP integration per charger — boot notification to CPMS + heartbeat verified + RFID / app authentication tested + smart-charging profile reception tested. (5) OZEV WCS grant evidence collection + submission (if grant applies) — installer accreditation, model on approved-product list, customer eligibility evidence, claim submitted to OZEV portal. (6) Final BS 7671 documents — Schedule of Inspections + Schedule of Test Results + EIC per charger. (7) Customer handover with structured digital cert evidence bundle access transfer. Total commissioning time: ~4-8 hours for a 4-charger workplace install vs ~45 min for single-charger domestic.',
  },
  {
    question: 'Public hub install — 6 × 150 kW + 2 × 350 kW. Commissioning + handover scope?',
    options: [
      'The same scope as a workplace AC site, repeated eight times with no DC or HV additions',
      'A single site certificate covers the hub; individual DC chargers need no own records',
      'Section 722 + DC commissioning × 8, HV/DNO sign-off, OCPP/OCPI, PCAR and PAS 1899',
      'Documentation is minimal because public hubs are covered by the CPMS provider’s records',
    ],
    correctAnswer: 2,
    explanation:
      'Public DC fast hub commissioning + handover is the most complex EV install scenario. Per-charger Section 722 + BS EN 61851-23 manufacturer DC commissioning (manufacturer engineer often required for warranty) × 8. BS EN IEC 61439-7 LV multi-charger assembly verification. Transformer + HV switchgear commissioning by HV-qualified engineer + DNO sign-off + grid connection energisation. CPMS / OCPP integration per charger + OCPI roaming integration tested with at least one major hub (Hubject). PCAR 2023 pillar verification per charger: payment terminal (Visa / Mastercard contactless tested), pricing display screens operational + accurate, helpline signage installed + tested, open-data publication confirmed via UK Government feed. PAS 1899 accessibility audit per bay (designated accessible bays, kerb cuts, mounting heights, audio assistance). CMA / consumer protection compliance documentation. Cert evidence bundle: structured digital folder; handover to CPO with full ongoing operator obligations signed + named contacts + 24/7 emergency support agreement. Total commissioning time: weeks to months for a major hub install vs days for single 50 kW commercial.',
  },
  {
    question: 'EICR at year 5 on a workplace site — what additional EV-specific items beyond standard BS 7671?',
    options: [
      'Exactly the same items as inspecting a 1970s installation, with no EV-specific additions',
      'No EV-specific items; a standard EICR fully covers a charging install whatever the kit',
      'The customer decides which chargers to inspect, as EV items are optional in a report',
      'OPDD/RDC-PD self-tests, assembly and DLM checks, OCPP, SCP schedule and PCAR if now public',
    ],
    correctAnswer: 3,
    explanation:
      'EICR year 5 on workplace EV site adds EV-specific items to standard BS 7671 inspection: per-charger OPDD self-test (verify still operating); per-charger RDC-PD self-test (verify smooth-DC detection still working); Type B-capable RCD trip-time test per charger (degradation check); BS EN IEC 61439-7 multi-charger assembly inspection (cluster-level protection coordination still appropriate); DLM CT clamp + supply limit verification (still operating + reading site current correctly + chargers throttle response); OCPP integration verified (CPMS dashboard shows chargers + heartbeat; commissioning logs available); SCP Regulations 2021 default off-peak schedule still active per charger; OZEV WCS records still on file; per-PCAR-pillar check IF site has become public-access since original install (changed-circumstance trigger). Cert evidence bundle for EICR records baseline-vs-current comparison + recommendations. UK 2025-26 mature practice: dedicated EV EICR sub-section within the wider installation EICR.',
  },
  {
    question: 'Multi-vendor charger site — OCPP commissioning across different OEMs?',
    options: [
      'OCPP is open, so any OEM talks to a compatible CPMS; the protocol layer stays consistent',
      'Mixed-vendor sites cannot integrate; each manufacturer needs its own management platform',
      'A multi-vendor site must standardise on a single OEM before any CPMS connection works',
      'No CPMS is needed for different-vendor chargers, as they coordinate directly with each other',
    ],
    correctAnswer: 0,
    explanation:
      'OCPP’s key value is multi-vendor interoperability. Per-charger commissioning is OEM-specific (each manufacturer’s app + portal differs) but the OCPP protocol layer is consistent across vendors. Process: for each charger regardless of OEM, enter the customer’s CPMS endpoint URL + credentials + chargepoint identifier via the manufacturer’s commissioning interface; verify boot notification to CPMS + heartbeat received; test authentication (RFID / app); test smart-charging profile reception (CPMS sends SetChargingProfile via OCPP; charger applies via CP PWM regardless of OEM). UK 2025-26 multi-vendor sites work seamlessly via OCPP. Cert evidence bundle records per-charger: OEM + model + OCPP version + integration test results + commissioning date + commissioning engineer.',
  },
  {
    question: 'Public charging site handover from installer to CPO — what document is signed?',
    options: [
      'A verbal agreement on site is sufficient, as the certificates already record what matters',
      'A simple confirmation email from the customer accepting the work, with no formal scope split',
      'A formal handover recording the scope split, named contacts, warranty and access, signed by both',
      'Nothing is signed; site ownership transfers automatically once the chargers are energised',
    ],
    correctAnswer: 2,
    explanation:
      'Formal handover document is essential for public install handover. Contents: (1) installer scope completed — Section 722 + BS EN IEC 61439-7 + DNO + commissioning per BS EN 61851 + PCAR pillar configuration + PAS 1899 accessibility evidence + cert evidence bundle structure + access. (2) CPO ongoing scope accepted — PCAR 2023 ongoing compliance (payment, reliability, pricing, roaming, helpline, open-data); accessibility maintenance + ongoing PAS 1899 compliance; customer service; billing; firmware updates; EICR ownership. (3) Named contacts — installer technical support, CPO operator, manufacturer support, CPMS support, DNO emergency. (4) Warranty terms — installer first-year + manufacturer hardware. (5) Cert evidence bundle access transfer — read-write to CPO; installer retains read-only. (6) Both installer + CPO sign. UK 2025-26 mature industry practice: structured digital document via shared workspace (SharePoint / Confluence / similar); included in cert evidence bundle as the formal handover artefact.',
  },
  {
    question: 'Year-10 EICR on a public DC fast hub — what is materially different?',
    options: [
      'Nothing changes; a year-10 EICR is identical in scope to the year-5 report',
      'No EICR is carried out at year 10 because the equipment is by then out of warranty',
      'The customer decides whether inspection happens, as reports become optional after five years',
      'Charger end-of-life, transformer mid-life, support continuity and site-refresh assessment begin',
    ],
    correctAnswer: 3,
    explanation:
      'Year-10 EICR on a public DC fast hub is more substantial than year-5. Wallbox / charger end-of-life consideration — UK 2025-26 typical service life 7-15 years for Mode 4 ultra-rapid; year-10 sees end-of-life chargers; replacement planning begins. Transformer mid-life inspection per HV schedule (typically 10-15 year intervals for major transformer testing). Manufacturer support continuity check — some brands consolidate / change over 10 years; cloud services for smart-charging may be deprecated. Regulatory evolution — PCAR amendments + new accessibility standards (PAS 1899:2032 likely revision); BS 7671 may have new Amendment with new sections. Roaming hub evolution — OCPI version migration (1.6 → 2.2 → future); cross-network roaming maturity. CPMS migration consideration — over a 10-year horizon, customer may want to switch CPMS vendor; OCPP-compliance enables this without charger replacement. Total site refresh assessment — chargers + LV switchgear + signage + accessibility infrastructure all considered together. Cert evidence bundle compares year-0 baseline to current state + planning for site refresh begins.',
  },
];

const faqs = [
  {
    question: 'Installer + CPO + operator + customer — who keeps which records?',
    answer:
      'Cert evidence bundle is the shared truth. INSTALLER keeps read-only access permanently (warranty + technical support reference). CPO / OPERATOR keeps read-write access (primary ongoing operator). CUSTOMER (site owner if different from operator) keeps read-only access (operational visibility). UK 2025-26 mature practice: shared workspace (SharePoint / Confluence / similar) with explicit role-based permissions.',
  },
  {
    question: 'EV-specific items added to standard Part 6 commissioning?',
    answer:
      'M7.1 8-layer stack from M6.8 + commercial extensions: per-charger OPDD + RDC-PD self-tests; BS EN 61851 functional test per charger; BS EN IEC 61439-7 assembly verification; DLM commissioning + simulated load test; OCPP integration per charger; PCAR pillar configuration (if public); PAS 1899 accessibility audit (if public); payment terminal commissioning + PCI-DSS; fleet CPMS + telematics integration (if fleet); manufacturer DC commissioning per BS EN 61851-23 (if DC fast).',
  },
  {
    question: 'EICR interval — same 5 years for commercial as domestic?',
    answer:
      'Typically yes, 5 years for commercial. Some operators use 3-year cycle for high-utilisation sites (public DC fast hubs especially). UK Electrical Safety Standards in the Private Rented Sector Regulations 2020 set 5-year for landlord-owned domestic; commercial / public not strictly statutory but industry practice. CPO contracts often specify EICR interval as a deliverable.',
  },
  {
    question: 'Failed EICR finding — what’s the typical remediation timeline?',
    answer:
      'Severity-dependent. C1 (immediate danger): isolated immediately, remediated within hours / days. C2 (potential danger, urgent): remediated within ~28 days typically. C3 (improvement recommended): captured for next maintenance cycle (3-6 months typical). FI (further investigation): investigated promptly + appropriate code assigned. Cert evidence bundle records the finding + remediation completion + closure.',
  },
  {
    question: 'M7 install — total project timeline?',
    answer:
      'Variable by scope. Workplace 4-bay: 2-6 weeks design + DNO + install + commissioning. Workplace 12-bay with BESS: 8-16 weeks. Public hub 4-8 × 150 kW: 6-12 months (DNO HV connection drives timeline). Public ultra-rapid hub 6 × 150 kW + 2 × 350 kW: 12-24 months. HGV depot: 18-30 months. Cert evidence bundle accumulates throughout — early design + DNO documents + manufacturer DoCs + site survey + planning + civils + commissioning + handover.',
  },
];

export default function RenewableEnergyModule7Section8() {
  const navigate = useNavigate();

  useSEO({
    title: 'Commercial commissioning, EICR & handover | Renewable Energy 7.8 | Elec-Mate',
    description:
      'Commercial EV install commissioning + EICR + handover — multi-charger sequence, BS EN IEC 61439-7 verification, DNO HV commissioning, OCPP integration per charger, PCAR pillar verification, PAS 1899 audit, multi-charger DLM tests, handover document to CPO with cert evidence bundle.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../renewable-energy-module-7')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 7
          </button>

          <PageHero
            eyebrow="Module 7 · Section 8 · BS 7671:2018+A4:2026 · Part 6 + 8-layer commercial stack"
            title="Commercial commissioning, EICR & handover"
            description="Commercial EV install commissioning, EICR + handover — the convergence point of the M7 8-layer regulatory stack. Multi-charger sequence, BS EN IEC 61439-7, DNO HV, OCPP per charger, PCAR pillars, PAS 1899, DLM tests, structured handover to CPO."
            tone="yellow"
          />

          <TLDR
            points={[
              'Commercial commissioning extends M6.8 domestic sequence with multiple additional layers per the M7 8-layer stack. Per-charger Section 722 × N + BS EN IEC 61439-7 + DNO + OCPP + PCAR (if public) + PAS 1899 + DLM + fleet CPMS (if fleet).',
              'Per-charger Section 722 commissioning (M6.8 sequence) × all chargers — Type B-capable RCD tester + OPDD + RDC-PD self-tests + CP/PP verification.',
              'BS EN IEC 61439-7 multi-charger assembly verification — manufacturer DoC + visual + protective device coordination + LV switchgear conformity.',
              'DNO HV connection commissioning — transformer + HV switchgear by HV-qualified engineer; LV switchgear; DNO sign-off + grid energisation.',
              'OCPP integration per charger — boot notification + heartbeat + auth + smart-charging profile test; CPMS dashboard verification.',
              'PCAR 2023 pillar configuration (if public): payment terminal + pricing display + helpline signage + OCPI roaming + open-data publication. PAS 1899 accessibility audit per bay.',
              'Multi-charger DLM commissioning — CT clamp + supply limit + simulated load test + per-charger throttle response + fail-safe behaviour.',
              'Handover document to CPO — structured digital deliverable; installer scope completed + CPO ongoing scope accepted + named contacts + warranty + cert evidence bundle access.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Plan commercial commissioning sequence across the M7 8-layer regulatory stack.',
              'Execute per-charger Section 722 commissioning × N chargers using Type B-capable instruments.',
              'Verify BS EN IEC 61439-7 multi-charger assembly conformity at commissioning.',
              'Commission DNO HV connection + transformer + LV switchgear with HV-qualified engineer + DNO sign-off.',
              'Integrate OCPP per charger; verify boot + heartbeat + auth + smart-charging profile.',
              'Verify PCAR 2023 pillar configuration per charger (if public): payment + pricing + helpline + OCPI + open-data.',
              'Conduct PAS 1899:2022 accessibility audit per bay (if public + accessibility scope).',
              'Commission multi-charger DLM: CT clamp + supply limit + simulated load test + fail-safe behaviour.',
              'Produce structured handover document to CPO: installer scope completed + CPO ongoing scope accepted + named contacts + warranty + cert evidence bundle access transfer.',
              'Apply year-5 + year-10 EICR procedures to commercial sites; document baseline-to-current comparison.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>
            Commercial commissioning is M6.8 raised to the power of N chargers + layered with the M7 regulatory stack. Methodical execution prevents tomorrow’s problem.
          </Pullquote>

          <ContentEyebrow>Commercial commissioning sequence — layered onto per-charger Section 722</ContentEyebrow>

          <ConceptBlock
            title="The commercial commissioning sequence"
            plainEnglish="Commercial EV install commissioning is the convergence point of the M7 8-layer regulatory stack from M7.1. The M6.8 single-charger sequence is per-charger × N; multiple additional layers stack on top. Methodical execution — layer by layer — produces a cert evidence bundle that is structured + defensible + future-proof."
            onSite="UK 2025-26 mature commercial commissioning workflow: pre-commissioning preparation; sequential layer commissioning; per-layer cert evidence bundle entries; final handover document. Total commissioning time scales from hours (small workplace) to weeks (major public hub)."
          >
            <p>The full sequence:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Layer 1: per-charger Section 722</strong>
                — M6.8 sequence × N chargers. Type B-capable RCD tester + OPDD + RDC-PD
                self-tests + CP/PP signalling. Reg 643 IR + ADS + 250 V follow-up. Per
                Reg 411 ADS + Reg 722.531.3.101 RCD architecture + Reg 722.411.4 PME-on-EV
                alternative. EIC per charger
              </li>
              <li>
                <strong className="text-white">Layer 2: BS EN IEC 61439-7
                  assembly</strong> — manufacturer DoC review + on-site visual + LV
                switchgear conformity + protective device coordination verification
              </li>
              <li>
                <strong className="text-white">Layer 3: DNO connection</strong>
                — HV side (if hub): transformer + HV switchgear commissioning by
                HV-qualified engineer + DNO inspection + grid energisation sign-off. LV
                side: commissioning per BS EN IEC 61439-1 / -2
              </li>
              <li>
                <strong className="text-white">Layer 4: OCPP integration</strong>
                — per charger: endpoint URL + credentials + identifier + boot
                notification + heartbeat + auth test + smart-charging profile test.
                CPMS dashboard verification
              </li>
              <li>
                <strong className="text-white">Layer 5: PCAR 2023 (if
                  public)</strong> — payment terminal commissioning + PCI-DSS compliance
                + pricing display configuration + helpline signage installation +
                OCPI roaming test + open-data publication configuration
              </li>
              <li>
                <strong className="text-white">Layer 6: PAS 1899 (if public +
                  accessibility scope)</strong> — accessibility audit per bay: mounting
                heights, connector reach, payment terminal accessibility, bay layout
                (kerb cuts, level approach), signage, audio + tactile assistance
              </li>
              <li>
                <strong className="text-white">Layer 7: DLM commissioning</strong>
                — CT clamp install + orientation + calibration + supply limit
                configuration + simulated load test + per-charger throttle response +
                fail-safe behaviour test
              </li>
              <li>
                <strong className="text-white">Layer 8: fleet CPMS + telematics
                  (if fleet)</strong> — CPMS fleet variant configuration + telematics
                platform integration test + sequential scheduling logic verification
              </li>
              <li>
                <strong className="text-white">Cert evidence bundle</strong> —
                structured digital folder; per-layer entries with hyperlinks; final
                handover document at completion
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Part 6 (Inspection + Testing) — applied to commercial multi-charger sites"
            clause="Part 6 (Chapters 64 + 65) sets the verification framework. Reg 641 (initial verification); Reg 642 (visual + functional); Reg 643 (testing — IR, RCD, ADS, Zs etc.); Reg 644 (production + verification of certificates). Per Reg 643.1, instruments comply with BS EN 61557 — Type B-capable RCD tester required for Type B / RDC-PD architecture (M6.3). Commercial multi-charger commissioning applies per-charger + adds layered commercial verification."
            meaning="Part 6 / Chapter 64 sets the verification framework for any electrical installation. Commercial multi-charger sites extend the per-charger verification × N + layered commercial verification (BS EN IEC 61439-7, DNO HV, OCPP, PCAR, PAS 1899, DLM, fleet CPMS). Reg 643.1 mandates BS EN 61557 instrument compliance — Type B-capable RCD tester (Megger MFT1731, Fluke 1664 FC, Kewtech KT64DL) essential. Cert evidence bundle records per-charger EIC + assembly EIC + DNO connection + OCPP + PCAR + PAS 1899 + DLM + fleet CPMS — structured digital folder."
          />

          <InlineCheck {...inlineChecks[0]} />

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>OCPP + PCAR + DLM commissioning layers</ContentEyebrow>

          <Pullquote>
            The cert evidence bundle is the install’s spine. Without it, every future EICR / audit / regulatory query is reconstruction work.
          </Pullquote>

          <ConceptBlock
            title="OCPP integration commissioning per charger"
            plainEnglish="Each charger is commissioned to talk to the customer’s CPMS via OCPP. Per-charger sequence: endpoint URL + credentials + chargepoint identifier + boot notification + heartbeat + auth test + smart-charging profile test. CPMS dashboard verification."
            onSite="UK 2025-26 multi-vendor sites use OCPP’s open-protocol value — chargers from different OEMs all talk OCPP to a single CPMS. Per-charger commissioning is OEM-specific (each manufacturer’s app differs) but the OCPP protocol layer is consistent."
          >
            <p>OCPP commissioning per charger:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Endpoint URL</strong>
                — customer’s CPMS WebSocket URL (e.g.
                wss://cpms.example.com/ocpp/1.6 or 2.0.1)
              </li>
              <li>
                <strong className="text-white">Credentials</strong>
                — username + password / token issued by CPMS operator; TLS client
                certificate (OCPP 2.0.1 mandatory)
              </li>
              <li>
                <strong className="text-white">Chargepoint
                  identifier</strong> — unique string registered in CPMS database
              </li>
              <li>
                <strong className="text-white">Boot notification
                  test</strong> — charger reports to CPMS on first energise; appears in
                CPMS dashboard
              </li>
              <li>
                <strong className="text-white">Heartbeat
                  verification</strong> — periodic keep-alive received at CPMS
              </li>
              <li>
                <strong className="text-white">Authentication
                  test</strong> — RFID / app session start; verify session recorded in
                CPMS
              </li>
              <li>
                <strong className="text-white">Smart-charging profile
                  test</strong> — CPMS sends SetChargingProfile; charger applies via CP
                PWM
              </li>
              <li>
                <strong className="text-white">Cert evidence bundle</strong>
                — OCPP version + endpoint + identifier + commissioning test results +
                CPMS account holder details
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="PCAR 2023 pillar verification at commissioning"
            plainEnglish="For public chargepoints, each of the PCAR 2023 six pillars is verified at commissioning. Payment terminal operational + PCI-DSS compliance; pricing display configured + accurate; helpline signage installed; OCPI roaming integration tested; open-data publication configured + flowing."
            onSite="The installer + CPO collaborate at this stage. Installer commissions the hardware + initial configuration; CPO operates ongoing. Cert evidence bundle captures both."
          >
            <p>PCAR pillar verification:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Payment terminal</strong>
                — contactless bank card terminal operational at each charger ≥8 kW. Tap
                test with test card; verify session start. PCI-DSS compliance: payment
                processor + terminal certification + secure transmission to acquiring
                bank
              </li>
              <li>
                <strong className="text-white">Pricing display</strong>
                — price per kWh + ancillary fees displayed BEFORE session start. Verify
                accuracy (e.g. 65p/kWh + £1 connection fee shown). Display format clear +
                visible from approach
              </li>
              <li>
                <strong className="text-white">24/7 helpline
                  signage</strong> — phone number on each charger (typically printed
                sticker or LCD display); test call to verify line answered
              </li>
              <li>
                <strong className="text-white">OCPI roaming
                  integration</strong> — CPMS connected to OCPI hub (Hubject typical);
                test roaming session with at least one partner network (Octopus
                Electroverse, ChargeUp Europe etc.)
              </li>
              <li>
                <strong className="text-white">Open-data
                  publication</strong> — CPMS configured to publish uptime + pricing +
                availability via standardised API to UK Government open-data feed; verify
                data flowing
              </li>
              <li>
                <strong className="text-white">Reliability
                  monitoring</strong> — CPMS reliability dashboard configured + tracking
                charger uptime against 99% target
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — per-pillar verification result + photographs + CPMS
                configuration details
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Multi-charger DLM commissioning"
            plainEnglish="DLM commissioning is more involved at multi-charger sites than single-charger. CT clamp install + orientation + calibration; DLM controller commissioning (supply limit + per-charger allocation logic); simulated load test (verify chargers throttle when site load rises); per-charger CP PWM verification; CPMS integration; fail-safe behaviour test."
            onSite="UK 2025-26 commercial standard practice: methodical DLM commissioning + documented test results. Cert evidence bundle records each step."
          >
            <p>DLM commissioning sequence:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">CT clamp install</strong>
                — on main incoming tails; orientation per DLM controller spec
                (current-flow direction); verify CT reads match expected site current at
                typical loads
              </li>
              <li>
                <strong className="text-white">DLM controller
                  config</strong> — supply limit (e.g. 95 A per phase, margin below 100 A);
                cluster hierarchy if multi-cluster; per-charger allocation policy (e.g.
                proportional or priority-based)
              </li>
              <li>
                <strong className="text-white">Simulated load
                  test</strong> — start a high non-EV site load (e.g. building loads on /
                off); verify EV chargers throttle accordingly; verify throttle response
                time (sub-second typical)
              </li>
              <li>
                <strong className="text-white">Per-charger CP PWM
                  verification</strong> — chargers receiving allocation from DLM
                controller + applying to vehicles correctly
              </li>
              <li>
                <strong className="text-white">CPMS
                  integration</strong> — DLM allocations reflected in CPMS dashboard;
                OCPP smart-charging messages received correctly
              </li>
              <li>
                <strong className="text-white">Fail-safe
                  test</strong> — disconnect DLM controller comms; verify chargers fall
                back to safe minimum current (typically 6 A); reconnect; verify normal
                operation resumes
              </li>
              <li>
                <strong className="text-white">Cert evidence bundle</strong>
                — CT clamp position photo + supply limit configuration + per-charger
                allocation logic + simulated load test results + fail-safe test result
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Handover to CPO + ongoing EICR</ContentEyebrow>

          <ConceptBlock
            title="The commercial handover document"
            plainEnglish="Structured digital deliverable handed from installer to CPO at commissioning completion. Contents: project summary; site classification; regulatory framework applied; cert evidence bundle table of contents with hyperlinks; ongoing operator obligations; named contacts; first-year warranty; EICR schedule; emergency procedures; cert evidence bundle access transfer."
            onSite="UK 2025-26 mature practice: SharePoint / Confluence / similar shared workspace as the cert evidence bundle storage. Read-write transferred to CPO; installer retains read-only access (warranty + technical support reference)."
          >
            <p>Handover document contents:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Project summary</strong>
                — what was installed, where, when, for whom; total cost, grant funding
                received (if applicable)
              </li>
              <li>
                <strong className="text-white">Site
                  classification</strong> — workplace / public AC / public DC fast / fleet
                / commercial-curtilage. Drives applicable regulatory layers
              </li>
              <li>
                <strong className="text-white">Regulatory framework
                  applied</strong> — the 8-layer stack from M7.1; which layers apply +
                where evidence is in the cert evidence bundle
              </li>
              <li>
                <strong className="text-white">Cert evidence bundle table
                  of contents</strong> — hyperlinks to each section / layer / charger
                / pillar / scenario. Master index document
              </li>
              <li>
                <strong className="text-white">Ongoing operator
                  obligations</strong> — clear delineation of installer-completed vs
                operator-ongoing scope. PCAR 2023 ongoing pillars + PAS 1899 maintenance
                + customer service + billing + open-data + EICR ownership
              </li>
              <li>
                <strong className="text-white">Named contacts</strong>
                — installer technical support; CPO / operator; manufacturer support;
                CPMS support; DNO emergency line. Phone + email + escalation procedures
              </li>
              <li>
                <strong className="text-white">First-year warranty
                  terms</strong> — what the installer warrants; what the manufacturer
                warrants; what the CPO is responsible for; warranty exclusions
              </li>
              <li>
                <strong className="text-white">EICR schedule</strong>
                — typical 5-year cycle; high-utilisation sites 3-year; specific dates +
                responsibilities
              </li>
              <li>
                <strong className="text-white">Emergency
                  procedures</strong> — what to do if charger fails / hazardous
                condition / fire / vehicle incident
              </li>
              <li>
                <strong className="text-white">Cert evidence bundle
                  access</strong> — digital access transfer; read-write to CPO; read-only
                to installer retained
              </li>
              <li>
                <strong className="text-white">Sign-off</strong>
                — both installer + CPO sign formal handover document
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Commercial EICR — year-5 + year-10 procedure"
            plainEnglish="EICR cycle for commercial EV sites: typically 5 years standard; 3 years high-utilisation public DC fast. Procedure extends standard BS 7671 EICR with EV-specific items per the 8-layer regulatory stack. Year-10 EICR triggers end-of-life consideration + site refresh planning."
            onSite="CPO owns EICR cycle. UK 2025-26 mature practice: scheduled annual visual + biennial functional + 5-yearly full EICR. Cert evidence bundle accumulates findings + remediation evidence + baseline-to-current comparison."
          >
            <p>EICR procedure for commercial EV sites:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Per-charger Section 722
                  inspection</strong> — standard EICR procedure × N chargers; Type B
                RCD trip-time; OPDD + RDC-PD self-tests; CP/PP verification; cable +
                connector inspection; warning notice integrity
              </li>
              <li>
                <strong className="text-white">BS EN IEC 61439-7 assembly
                  inspection</strong> — LV multi-charger assembly: visual + protective
                device coordination + termination integrity + thermal imaging
                (recommended)
              </li>
              <li>
                <strong className="text-white">Transformer + HV
                  inspection</strong> — separate cycle (annual or per manufacturer
                schedule); HV-qualified engineer; transformer oil sampling + insulation
                + buchholz protection + temperature monitoring
              </li>
              <li>
                <strong className="text-white">CPMS-side
                  checks</strong> — OCPP integration still operational; OCPI roaming
                functional; open-data publication current; CPMS dashboard reflecting
                accurate charger states
              </li>
              <li>
                <strong className="text-white">PCAR pillar audit (if
                  public)</strong> — payment terminal operational; pricing display
                accurate; helpline answered; reliability metric tracking ≥99%;
                accessibility per PAS 1899 maintained
              </li>
              <li>
                <strong className="text-white">DLM
                  inspection</strong> — CT clamp + supply limit + per-charger throttle
                response still functional; fail-safe behaviour verified
              </li>
              <li>
                <strong className="text-white">Year-10 end-of-life
                  consideration</strong> — wallbox / charger service-life assessment;
                manufacturer support continuity check; regulatory evolution review
                (PCAR amendments, new accessibility standards, BS 7671 amendments);
                roaming + CPMS migration consideration; site refresh planning begins
              </li>
              <li>
                <strong className="text-white">Cert evidence bundle
                  update</strong> — EICR findings + remediation + baseline-to-current
                comparison + recommendations for next cycle
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[1]} />

          <InlineCheck {...inlineChecks[3]} />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 643 + Chapter 64 — commercial verification scope"
            clause="Reg 643 sets out testing requirements: insulation resistance, RCD trip-time, ADS verification, polarity, continuity, Zs. Chapter 64 (Initial verification) requires the verification to be carried out by competent persons + the results recorded in a Schedule of Inspections + Schedule of Test Results + Certificate. At commercial scale, each charger has its own dedicated final circuit (IET Code of Practice for EV Charging Equipment Installation) requiring its own verification record + cert."
            meaning="Reg 643 + Chapter 64 set the BS 7671 verification framework. At commercial scale, this scales per-charger: each charger has its own dedicated final circuit per IET Code of Practice for EV Charging Equipment Installation, its own RCD architecture per Reg 722.531.3.101, its own PME-on-EV alternative per Reg 722.411.4 — each requiring its own Reg 643 testing + Chapter 64 verification record. EIC per charger + collective Schedule of Inspections + Schedule of Test Results structured by charger. Cert evidence bundle entry per charger: dedicated final circuit ID + protective device + RCD test + ADS + Zs + OPDD + RDC-PD self-tests + CP/PP verification + commissioning engineer signature. Type B-capable instrument per Reg 643.1 + BS EN 61557 compliance."
          />

          <Pullquote>
            Reg 643 doesn’t scale by averaging. Twenty chargers = twenty test records. The cert evidence bundle is the structured proof.
          </Pullquote>

          <ConceptBlock
            title="Commercial cert evidence bundle structure"
            plainEnglish="At commercial scale the cert evidence bundle is a structured digital folder hierarchy, not a paper pack. Per-layer subfolders (Section 722, 61439-7, DNO, OCPP, PCAR, PAS 1899, DLM, fleet CPMS) + per-charger sub-subfolders within Section 722. Master index document at the root with hyperlinks. UK 2025-26 mature practice: SharePoint / Confluence / similar with role-based permissions."
            onSite="The bundle structure mirrors the regulatory stack from M7.1. Index document at the root makes every layer + every charger findable. Year-5 EICR engineer opens the index + navigates to the specific evidence; year-10 site refresh planning compares baseline to current via the index; OPSS / CMA / DNO enquiry → installer or CPO pulls the specific evidence."
          >
            <p>Bundle folder hierarchy:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Root</strong> — Master index +
                project summary + handover document
              </li>
              <li>
                <strong className="text-white">/01-Section-722/</strong> —
                per-charger subfolders (CP-001, CP-002, …) with EIC + RCD test +
                ADS + Zs + OPDD self-test + RDC-PD self-test + CP/PP verification
              </li>
              <li>
                <strong className="text-white">/02-Assembly-61439-7/</strong> —
                multi-charger LV assembly DoC + visual inspection + protective
                device coordination test
              </li>
              <li>
                <strong className="text-white">/03-DNO/</strong> — connection
                agreement + G98 / G99 reference + transformer + HV switchgear
                commissioning + grid energisation sign-off
              </li>
              <li>
                <strong className="text-white">/04-OCPP/</strong> — per-charger
                OCPP commissioning records + CPMS account details + integration
                tests
              </li>
              <li>
                <strong className="text-white">/05-PCAR-2023/</strong> (if
                public) — per-pillar verification per charger + payment terminal
                PCI-DSS + pricing display + helpline signage + OCPI roaming +
                open-data publication
              </li>
              <li>
                <strong className="text-white">/06-PAS-1899/</strong> (if
                public) — accessibility audit per bay + designated accessible
                bays + photographs
              </li>
              <li>
                <strong className="text-white">/07-DLM/</strong> — CT clamp
                position + supply limit + simulated load test + fail-safe test
              </li>
              <li>
                <strong className="text-white">/08-Fleet-CPMS/</strong> (if
                fleet) — telematics integration + sequential scheduling logic +
                per-driver / per-vehicle reporting setup
              </li>
              <li>
                <strong className="text-white">/09-Handover/</strong> — formal
                handover document + named contacts + warranty + emergency
                procedures + cert evidence bundle access transfer record
              </li>
              <li>
                <strong className="text-white">/10-EICR-history/</strong> —
                empty at install; populated at each EICR cycle
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <Scenario
            title="Workplace 4-bay install commissioning + handover"
            situation="Workplace site, 4 × 22 kW three-phase wallboxes + OZEV WCS grant + OCPP integration with customer’s existing CPMS (Driivz). Customer is a registered business — employer responsible for operation."
            whatToDo="Layered commissioning: (1) Per-charger Section 722 (M6.8 sequence) × 4 — 4-pole Type B RCBO trip-time test, OPDD + RDC-PD self-tests, CP/PP signalling verification, EIC per charger. (2) BS EN IEC 61439-7 verification — multi-charger LV assembly manufacturer DoC reviewed + on-site visual. (3) OCPP integration × 4 — endpoint, credentials, identifier, boot notification, heartbeat, auth test, smart-charging profile test; CPMS Driivz dashboard shows 4 chargers online. (4) DLM commissioning — CT clamp on incoming three-phase tails, supply limit 95 A per phase, simulated load test, fail-safe behaviour. (5) OZEV WCS grant evidence — installer accreditation, wallbox models on approved-product list, customer eligibility evidence, claim submitted (£350 × 4 = £1,400). (6) Schedule of Inspections + Schedule of Test Results + EIC per charger. (7) Handover document — installer scope completed; customer / employer scope: ongoing operation + SCP-Regs 2021 default off-peak verified + customer service; named contacts; first-year warranty; EICR 5-year cycle. (8) Cert evidence bundle access transferred to customer’s facilities manager; installer retains read-only. Total commissioning time: ~6 hours."
            whyItMatters="Workplace 4-bay is the volume install pattern for UK 2025-26 commercial EV. Methodical layered commissioning produces a structured cert evidence bundle that supports future EICR + grant audits + regulatory enquiries. The customer / employer takes ownership at handover; installer retains warranty + support contact."
          />

          <Scenario
            title="Public hub commissioning + handover — 6 × 150 kW + 2 × 350 kW"
            situation="Public DC fast hub install complete. CPO (e.g. Gridserve) operates ongoing. Commissioning + handover from electrical contractor + manufacturer engineer to CPO."
            whatToDo="Substantial commissioning project. (1) Per-charger Section 722 + BS EN 61851-23 manufacturer DC commissioning × 8 — manufacturer engineer attendance per warranty; high-voltage DC isolation + DC contactor + thermal monitoring + payment terminal + OCPP per charger. (2) BS EN IEC 61439-7 LV multi-charger assembly verification — manufacturer DoC + protective device coordination verified. (3) DNO HV connection commissioning — transformer + HV switchgear by HV-qualified engineer + DNO sign-off + grid energisation. (4) OCPP 2.0.1 + OCPI roaming integration × 8 — TLS certificates per charger + boot + heartbeat + auth + smart-charging + Hubject roaming tested. (5) PCAR 2023 pillar verification per charger — payment terminal tap test + PCI-DSS confirmed + pricing display accurate + helpline signage + open-data publication. (6) PAS 1899 accessibility audit — 2 of 8 designated accessible bays; kerb cuts + mounting heights + audio assistance; PAS 1899 evidence pack. (7) DLM commissioning — site-level master DLM + cluster DLM + transformer-level monitoring. (8) Formal handover document — installer scope completed; CPO ongoing scope accepted; PCAR + PAS 1899 ongoing compliance; cert evidence bundle access transferred read-write. (9) First-year warranty (installer) + manufacturer hardware warranty (2-5 years). (10) EICR 5-year cycle scheduled. Total commissioning time: 2-4 weeks across multiple visits + manufacturer engineer + DNO sign-off + accessibility audit."
            whyItMatters="Public DC fast hub commissioning is the most complex commercial EV install scenario. Multi-vendor coordination + multiple regulatory layers + manufacturer engineer attendance + DNO sign-off + CPO acceptance all converge at commissioning. Cert evidence bundle is structured + substantial + critical for ongoing operation under PCAR 2023 + PAS 1899 + OPSS enforcement. UK 2025-26 reality: dozens of such hubs commissioned per year by Gridserve, InstaVolt, IONITY, Tesla Supercharger, MFG EV Power, BP Pulse + others."
          />

          <CommonMistake
            title="Skipping per-PCAR-pillar verification at commissioning"
            whatHappens="Installer commissions the physical install (Section 722 + 61439-7 + DNO) + hands over to CPO without verifying PCAR pillars. CPO discovers later that payment terminal config is incomplete, pricing display shows wrong rates, OCPI roaming not actually working, open-data publication not configured. Operational gaps + OPSS exposure + customer-side delay."
            doInstead="PCAR pillar verification is part of commissioning, not a CPO-only task. Installer verifies pillar configuration at commissioning (payment terminal commissioned + PCI-DSS compliance confirmed, pricing display accurate, helpline signage installed, OCPI roaming tested, open-data publication configured + flowing). CPO accepts ongoing pillar operation at handover. Cert evidence bundle records both."
          />

          <CommonMistake
            title="Year-5 EICR without baseline cert evidence bundle"
            whatHappens="EICR engineer arrives at year-5 with no cert evidence bundle — original installer’s records lost / inaccessible / never delivered. EICR becomes reconstruction work: visual inspection + manufacturer DoC retrieval + best-effort testing without baseline comparison. Time + cost overruns; gaps in EICR coverage; customer frustration."
            doInstead="Cert evidence bundle handover at commissioning is the install’s long-term truth. Installer + CPO maintain structured digital folder with role-based permissions. UK 2025-26 mature practice: cloud storage (SharePoint / Confluence / similar) with explicit access management; cert evidence bundle survives organisational changes + property transfers. Cost of bundle management at install: trivial; cost of reconstruction at EICR: substantial."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Commercial commissioning extends M6.8 domestic sequence: per-charger Section 722 × N + 7 additional commercial layers (61439-7, DNO HV, OCPP, PCAR, PAS 1899, DLM, fleet CPMS).',
              'Per-charger Section 722 commissioning uses Type B-capable RCD tester per Reg 643.1 (BS EN 61557 compliance) — Megger MFT1731, Fluke 1664 FC, Kewtech KT64DL or equivalent.',
              'BS EN IEC 61439-7 multi-charger assembly verification — manufacturer DoC + visual + protective device coordination at commissioning.',
              'DNO HV connection commissioning — transformer + HV switchgear by HV-qualified engineer + DNO sign-off + grid energisation. Months lead time pre-commissioning.',
              'OCPP integration per charger — endpoint + credentials + identifier + boot + heartbeat + auth + smart-charging profile test; CPMS dashboard verification.',
              'PCAR 2023 pillar verification at commissioning (if public): payment terminal + pricing display + helpline signage + OCPI roaming + open-data publication + reliability monitoring.',
              'PAS 1899 accessibility audit per bay (if public + accessibility scope): mounting heights, connector reach, kerb cuts, designated bays, audio + tactile assistance.',
              'Multi-charger DLM commissioning: CT clamp + supply limit + simulated load test + per-charger throttle response + fail-safe behaviour test.',
              'Handover document is the formal handover artefact: installer scope completed + CPO ongoing scope accepted + named contacts + warranty + cert evidence bundle access transfer.',
              'EICR cycle: 5-year standard; 3-year for high-utilisation public DC fast. Year-10 EICR triggers end-of-life consideration + site refresh planning.',
              'Cert evidence bundle is the install’s long-term truth. Structured digital folder; role-based permissions; survives organisational changes + property transfers.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 8 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/renewable-energy-module-7-section-7')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section 7
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                CPO regulations & PCAR 2023
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/renewable-energy-module-7')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Module overview <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Module 7 complete
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
