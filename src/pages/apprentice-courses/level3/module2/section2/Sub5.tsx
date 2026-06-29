/**
 * Module 2 · Section 2 · Subsection 5 — Inspection and test of environmental tech systems
 * Maps to City & Guilds 2365-03 / Unit 301 / LO2 / AC 2.1 (regulations and standards)
 *   AC 2.1 — "state the relevant Building Regulations and other statutory and
 *             non-statutory requirements for the installation and maintenance of
 *             environmental technology systems"
 *
 * Layered depth: 2357 Unit 312 ELTP02 / AC 2.1 (regulatory framework for
 * environmental technology systems); 2357 Unit 602 ELTK02 / AC 3.1 (operating
 * principles tied to inspection and test).
 *
 * Note: Unit 301 is overview-level. This Sub deepens the inspection and test
 * framework for environmental tech — BS 7671 Part 6 inspection and testing,
 * IEC 62446 PV verification, MCS commissioning evidence, the EICR scope for
 * env tech additions, and the documentation chain.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

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
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'Inspection and test of env tech (2.5) | Level 3 Module 2.2.5 | Elec-Mate';
const DESCRIPTION =
  "Inspection and test framework for environmental technology systems at recognition level for the L3 electrician — BS 7671 Part 6 commissioning, IEC 62446 PV string verification, MCS commissioning certificates, EICR scope for env tech additions, and the documentation chain that lives with the property.";

const checks = [
  {
    id: "l3-m2-s2-sub5-pv-string-test",
    question:
      "Why is the DC string side of a PV array tested separately from the AC side, and what tests are run?",
    options: [
      "The DC strings are tested before the inverter is energised because they stay live in daylight; the tests are Voc, Isc, polarity and insulation resistance per string (IEC 62446-1 / MCS MGD 003).",
      "The DC side is tested separately only because the inverter blocks the test current. The same AC tests — Zs, RCD trip time and ring continuity — are run on the DC strings once the inverter is bypassed, and the strings are de-energised first by opening the DC isolator, which removes all voltage from the array.",
      "The DC and AC sides use identical tests; the only difference is the test voltage. The DC side is insulation-tested at 250 V rather than 500 V because the modules are extra-low voltage, and there is no need to test before energising because the inverter limits the string voltage to a safe level until it is switched on.",
      "The DC side is tested separately purely for record-keeping — the MCS scheme wants a separate sheet. Electrically there is no difference, so the apprentice runs continuity and polarity only; Voc, Isc and insulation resistance are AC-side tests carried out after the inverter is energised and exporting.",
    ],
    correctIndex: 0,
    explanation:
      "PV strings stay live whenever light hits the panels — there is no off switch on the array — so the DC side is tested before the inverter is closed. The standard tests (per IEC 62446-1 / MCS MGD 003) are open-circuit voltage Voc per string with the inverter isolated, short-circuit current Isc per string, polarity at the inverter DC terminals, and insulation resistance array-positive-to-earth and array-negative-to-earth (typically a 1000 V dc test, expected megohms). Skipping them risks energising a faulty or reverse-polarity string into the inverter, missing an insulation defect that trips on first sun, or sending DC through an unintended earth path. Multifunction PV testers automate Voc, Isc and IR in one pass; the apprentice does these under MCS-certified supervision and records the values as commissioning evidence.",
  },
  {
    id: "l3-m2-s2-sub5-eicr-scope",
    question:
      "When carrying out an EICR on a property with an existing PV array and EV charger, what extra checks beyond standard EICR scope must you cover?",
    options: [
      "None beyond standard scope. The PV array and EV charger are separate systems with their own commissioning records, so the EICR covers only the original house wiring; the env tech kit is excluded and inspected by the MCS installer on a separate schedule.",
      "The standard final-circuit checks plus env-tech extras — PV DC isolator and Section 712 signage, the EV open-PEN protection method and RCD type — recorded in the EICR observations.",
      "Only a refrigerant leak check on the PV array and a charge-weight measurement on the EV charger. These F-Gas checks are the only extras the EICR adds for env tech, because the electrical side is identical to any other final circuit and needs nothing beyond the standard tests.",
      "Only the manufacturer's warranty status on the inverter and charge point. The inspector confirms the kit is still in warranty and records the serial numbers; the electrical tests are unchanged from a standard EICR because RCD and Zs requirements do not differ for env tech circuits.",
    ],
    correctIndex: 1,
    explanation:
      "Standard EICR per Part 6 covers the fixed wiring; env tech additions are part of that fixed installation. The extras are: verify the PV DC isolator is accessible, labelled and operates; check inverter signage at the consumer unit, meter and DC isolator (Section 712 plus MCS Code); record the array Voc and inspect for visible cell or junction-box damage from a roof-safe vantage; test the AC final circuit serving the inverter; for the EV charger, verify the open-PEN protection method (built-in, TT electrode or external device), test the RCD type (Type B or Type A + RDC-DD) and check the local isolator is within sight. Findings are coded C1 / C2 / C3 / FI per the EICR Best Practice Guide. Skipping the PV DC side or the EV open-PEN check leaves safety-critical gaps.",
  },
  {
    id: "l3-m2-s2-sub5-commissioning-pack",
    question:
      "What documents make up the commissioning pack for an MCS-certified PV install and why does the customer need to keep them?",
    options: [
      "Only the BS 7671 EIC. The EIC is the single legal record of the install, so it is the only document the customer needs to keep; the MCS certificate, type-test certificate and schematics are working documents the installer files internally and does not hand over.",
      "Only the manufacturer manuals and warranty cards for the panels and inverter. The regulatory documents are held by the DNO and MCS centrally, so the customer's pack is just the product literature needed to make a future warranty claim.",
      "The full set — EIC, PV commissioning record, MCS Commissioning Certificate, inverter type-test certificate, schematics, isolator plan, manuals and the G98/G99 paperwork — kept for SEG, house sale, EICR and insurance.",
      "Only the MCS Commissioning Certificate. Because it references all the other documents by number, the customer keeps just this one master certificate; the EIC, type-test certificate and schematics are summarised within it and do not need to be retained separately.",
    ],
    correctIndex: 2,
    explanation:
      "The pack contains the BS 7671 EIC for the electrical work; the PV commissioning record (Voc, Isc, IR, polarity per string per IEC 62446-1 / MCS MGD 003); the MCS Commissioning Certificate (required for SEG eligibility); the inverter type-test certificate (for DNO G98 / G99 acceptance); the array layout drawing; the single-line schematic; the DC and AC isolator location plan; the inverter and panel manuals; and the G98 notification copy or G99 Connection Offer. The customer needs it for SEG tariff registration, house sale, the next EICR and any insurance claim. The MCS Commissioning Certificate is the master document and everything else hangs off it; hand it over physically and email a digital copy. Lost packs cost real money to reconstruct.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "What does BS 7671 Part 6 require on completion of an environmental tech install?",
    options: [
      "Part 6 requires only a functional test — switch the system on, confirm it works, record the result. Because env tech kit is factory-tested before despatch, no dead or live testing is needed on site; the installer simply demonstrates operation and signs the handover sheet.",
      "Full initial verification before energising — visual, dead tests (continuity, IR, polarity) and live tests (Zs, RCD times) on the EIC — applied to env tech final circuits like any other, plus the env-tech-specific tests.",
      "Part 6 requires only the live tests — Zs and RCD operating time — on env tech circuits. The dead tests (continuity, insulation resistance, polarity) are skipped on PV, EV and heat pump circuits because the electronic equipment can be damaged by the test voltages, so the installer relies on the manufacturer's factory test.",
      "Part 6 requires the installer to commission only the AC side and leave the DC side to the MCS scheme. The EIC records the inverter's AC final circuit; the DC strings, EV charger and heat pump supply are tested under separate scheme rules rather than under BS 7671 Part 6.",
    ],
    correctAnswer: 1,
    explanation:
      "BS 7671 Part 6 (Inspection and testing) requires initial verification before energising — visual inspection, then dead testing (continuity of protective conductors, ring final continuity where applicable, insulation resistance, polarity), then live testing (earth electrode resistance where present, earth fault loop impedance Zs, RCD operating times), all recorded on the EIC. Env tech additions follow the same framework — the PV inverter, EV charger and heat pump supply are each final circuits tested as such — plus env-tech-specific tests (DC PV strings per IEC 62446, anti-islanding verified via the inverter type-test, F-Gas refrigerant integrity by the F-Gas engineer). The underlying Part 6 framework applies to every fixed circuit regardless of installation type.",
  },
  {
    id: 2,
    question:
      "What is IEC 62446-1 and how does it relate to MCS MGD 003?",
    options: [
      "IEC 62446-1 is the international standard for EV charge-point installation and MCS MGD 003 is its UK equivalent. Both define the RCD type, open-PEN protection and control-pilot tests for an EV charger; the PV-side tests are covered by a different standard, IEC 61851.",
      "IEC 62446-1 is the inverter type-test standard and MCS MGD 003 is the UK heat pump commissioning standard. They are unrelated — one verifies anti-islanding in a laboratory, the other sets the SCOP estimation method — and they happen to share a similar numbering scheme.",
      "IEC 62446-1 is the international PV commissioning and inspection standard; MCS MGD 003 is the UK overlay that adopts its method and adds UK-specific requirements.",
      "IEC 62446-1 and MCS MGD 003 are competing standards — IEC 62446-1 applies to commercial PV and MCS MGD 003 to domestic PV. An installer chooses one or the other depending on system size, and the two never apply to the same install.",
    ],
    correctAnswer: 2,
    explanation:
      "IEC 62446-1 is the international standard for grid-connected PV system documentation, commissioning tests and inspection. It defines the string test procedure — Voc, Isc, polarity, insulation resistance — with pass/fail thresholds. MCS MGD 003 is the UK MCS-flavoured equivalent: it adopts the IEC method and adds UK requirements (MCS-eligible product list, installer competence, customer pack contents). Modern multifunction PV testers are calibrated against IEC 62446-1, so the test record satisfies both. The apprentice uses an instrument that automates the IEC 62446-1 sequence; you need to know the procedure exists, what it tests, and what a passing result looks like.",
  },
  {
    id: 3,
    question:
      "What must the Initial Verification record show for a PV install (over and above a standard final-circuit EIC)?",
    options: [
      "Nothing additional — a PV install is recorded on exactly the same EIC schedule as a kitchen ring. Continuity, insulation resistance, polarity and Zs are the only entries; the DC string readings are not recorded because the strings are part of the equipment rather than the fixed wiring.",
      "Only the inverter serial number and the array kWp rating. These two figures are added to the standard EIC particulars box; the per-string Voc, Isc and insulation-resistance readings are kept by the manufacturer rather than recorded.",
      "Only the DNO's G98 reference and the SEG tariff registration number. The Initial Verification record for a PV install replaces the electrical test schedule with the grid-connection paperwork, because the DC strings are a current-limited source that does not require electrical testing.",
      "The AC-side EIC entries plus a PV commissioning record of the per-string DC readings (Voc, Isc, polarity, IR) and the Section 712 signage and isolator checks.",
    ],
    correctAnswer: 3,
    explanation:
      "The EIC records the AC-side verification — Zs at the inverter AC terminals, RCD trip times for any shared RCBO/RCD, continuity of CPC. The PV-specific commissioning record (often a separate sheet attached to the EIC) records per-string Voc against expected, per-string Isc against expected, per-string polarity at the DC isolator, per-string insulation resistance positive-to-earth and negative-to-earth at 1000 V dc, the AC and DC isolator position and labelling checks, and signage at the consumer unit, meter and inverter per Section 712. The two records together evidence that both the AC and DC sides are safe. Modern instruments output both as a single PDF.",
  },
  {
    id: 4,
    question:
      "How do you record signage on the EICR when inspecting an existing PV install?",
    options: [
      "Verify each Section 712 sign is present and legible and code any missing or illegible signage as an observation — usually C3, escalating to C2 where its absence creates a maintainer risk.",
      "Signage is not an EICR item. Because labels are cosmetic rather than safety-critical, the inspector does not check them and missing PV signage is never coded; the customer is simply advised verbally to add labels if they wish.",
      "Missing PV signage is always a C1 (danger present) code, because without it the next worker could be electrocuted. The inspector must record any missing or illegible label as C1 and recommend the property be taken out of service until the signage is reinstated.",
      "Signage is recorded only on the original EIC, never on a later EICR. Since the labels were verified at commissioning, the EICR inspector takes their presence as given and does not re-check them; any deterioration is the customer's responsibility to report.",
    ],
    correctAnswer: 0,
    explanation:
      "BS 7671 Section 712 (extensively revised in A4:2026) requires signage at the consumer unit (presence of PV generator), the meter (alternative supply source), the inverter (DC and AC isolation points) and any external DC isolators. The EICR inspector verifies presence and legibility of each sign; missing or illegible signage is recorded as an observation — typically C3 (improvement recommended), unless the absence creates an immediate maintainer risk, in which case C2. Signage is a safety-critical maintainer interface: the next electrician on the consumer unit needs to know there is a parallel AC source they cannot isolate by opening the DNO main switch. Recommendations should call for the missing signage to be reinstated.",
  },
  {
    id: 5,
    question:
      "What is the test for verifying anti-islanding works on a commissioned PV install?",
    options: [
      "There is no site test for anti-islanding — it can only be verified in a laboratory. On a commissioned install the apprentice simply checks the inverter holds a current type-test certificate and records the number; opening the AC isolator proves nothing because the inverter behaves the same whether or not its loss-of-mains protection works.",
      "Open the AC isolator at the inverter and confirm it detects loss of mains and shuts down within seconds; the type-test certificate covers the detailed fault response.",
      "Anti-islanding is verified by measuring the inverter's earth fault loop impedance at the AC terminals and confirming it is within the maximum Zs for the protective device. A low Zs proves the inverter will disconnect quickly under a loss-of-mains condition, so no isolator switching is needed.",
      "Anti-islanding is verified by an insulation-resistance test between the DC strings and earth. If the IR reading is above 1 megohm the loss-of-mains protection is confirmed working, because the protection relies on a healthy insulation path to sense the grid reference.",
    ],
    correctAnswer: 1,
    explanation:
      "On a commissioned install the verification is to simulate loss of mains by opening the AC isolator at the inverter (with appropriate safety briefing) and confirming the inverter detects the loss within a few seconds and shuts down. The full type-test cannot be reproduced on site — that uses laboratory waveform injection to verify ROCOF/vector shift response across all trip thresholds. The site test confirms response to a complete loss of AC voltage; the type-test certificate covers the more nuanced fault response (frequency droop, voltage dip, harmonic disturbance). After AC is restored the inverter goes through its recovery delay (typically 60-180 s) before re-synchronising — normal behaviour, not a fault, which catches out customers expecting an instant restart after a brief grid blip.",
  },
  {
    id: 6,
    question:
      "What is the role of the MCS-certified umbrella scheme in commissioning?",
    options: [
      "The umbrella scheme is the DNO that owns the local network. It audits the grid connection, issues the G98 / G99 acceptance and runs the export-tariff registration; without its sign-off the customer cannot claim SEG. The MCS-certified installer simply files the commissioning pack with the DNO.",
      "The umbrella scheme is the manufacturer of the inverter or heat pump. It validates its product was installed correctly, issues the warranty-backed commissioning certificate and handles complaints; MCS itself plays no role in certifying individual installs.",
      "The umbrella scheme (NICEIC, NAPIT, etc.) audits the installer's competence and issues the MCS Commissioning Certificate on MCS's behalf; without membership the installer cannot certify and the customer cannot claim SEG or BUS.",
      "The umbrella scheme is the customer's electricity supplier. It commissions the install on the customer's behalf, issues the MCS certificate as part of the SEG sign-up, and pays the export tariff; the installer's only role is to provide the meter readings.",
    ],
    correctAnswer: 2,
    explanation:
      "MCS-certified installers belong to an MCS umbrella scheme (NICEIC, NAPIT, ELECSA, Stroma, BBA HAPAS, etc.) — the umbrella scheme audits the installer, validates competence, processes commissioning certificates and runs the customer-facing complaints framework. It issues the MCS Commissioning Certificate based on the install pack the installer submits. MCS sits over the umbrella schemes as the standards body, not the certifying body. Without active membership the installer cannot issue certificates and the customer cannot claim the Smart Export Guarantee tariff or Boiler Upgrade Scheme grant. The apprentice works under an MCS-certified installer's competence and does not yet hold MCS certification. The certificate carries weight precisely because the umbrella scheme stands behind the installer.",
  },
  {
    id: 7,
    question:
      "How often must a PV install be EICR'd, and what is the customer's legal duty?",
    options: [
      "A property with PV must be EICR'd annually because the array introduces a generation source. The five-year cycle applies only to properties without env tech; adding PV or an EV charger shortens the legal interval to twelve months, and the customer is liable if the annual report is not commissioned.",
      "There is no required interval for an owner-occupied property — EICRs are entirely voluntary for homeowners. Adding PV does not change that, so the customer has no legal duty to inspect at all; only landlords are obliged to hold a current EICR.",
      "A PV install must be EICR'd every ten years, matching the inverter warranty period. The array is a sealed, low-maintenance system, so it extends the inspection interval from five to ten years for the whole property, and the customer commissions the report only at that point.",
      "An EICR roughly every five years (statutory for rented property under the 2020 Regulations in England); env tech additions change the content, not the cadence.",
    ],
    correctAnswer: 3,
    explanation:
      "BS 7671 recommends an EICR every five years for domestic installations regardless of env tech additions (some tenanted property in Scotland on a shorter cycle; England's private rented sector on a five-year statutory cycle under the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020). The customer is responsible for commissioning it, and insurers may require more frequent inspection for some property types or after modification. Env tech additions shift the inspection content but not the cadence — a property with PV plus EV plus heat pump still needs the five-year EICR with extra observation lines. The MCS Code separately suggests an annual visual inspection of PV (panel cleanliness, fixings, junction-box integrity).",
  },
  {
    id: 8,
    question:
      "What is the difference between the EIC and the MCS Commissioning Certificate, and why are both needed?",
    options: [
      "The EIC is the BS 7671 evidence for the electrical work; the MCS Commissioning Certificate is the scheme evidence for design, product and handover — both are needed, for different audiences.",
      "They are the same document under two names — the MCS Commissioning Certificate is simply the renewable-sector title for the EIC. Only one needs to be issued, and the customer presents it both for electrical compliance and for SEG eligibility.",
      "The MCS Commissioning Certificate replaces the EIC on a renewable install. Because the MCS scheme assessment covers the electrical inspection, a separate BS 7671 certificate would duplicate it, so the installer issues only the MCS certificate and references the test results within it.",
      "The EIC is needed only for grid-connected installs and the MCS certificate only for off-grid installs. A standard grid-tied PV system therefore needs just the EIC; the MCS certificate is required solely where there is no DNO connection to notify.",
    ],
    correctAnswer: 0,
    explanation:
      "The EIC (Electrical Installation Certificate) is the BS 7671 Part 6 document issued by the electrical contractor for the electrical work — cable sizing, RCD protection, Zs, polarity, insulation resistance, signage. It does not cover MCS scheme requirements. The MCS Commissioning Certificate is issued by the MCS-certified installer through the umbrella scheme — it covers system design (heat-loss calc and SCOP estimate for a heat pump, yield estimate for PV), product selection (MCS-eligible kit), install quality (refrigerant work by F-Gas personnel, electrical work to BS 7671 with EIC reference) and customer handover. Both are needed — the EIC for electrical compliance, the MCS certificate for SEG/BUS eligibility. Customers regularly conflate the two; explain the difference at handover.",
  },
];

const faqs = [
  {
    question: "Can the L3 apprentice carry out PV string testing alone?",
    answer:
      "Under direct supervision of the MCS-certified installer or a qualified electrician, yes — the apprentice can operate the test instrument and record the readings. Independently signing off the commissioning record requires the supervising person to certify competence. As you progress through the apprenticeship and gain experience, you will spend more time on the test instrument and less time being directly supervised. The MCS-certified sign-off remains with the MCS-certified installer until you hold MCS certification yourself.",
  },
  {
    question: "What insulation resistance value should I expect on a PV string?",
    answer:
      "BS 7671 / IEC 62446-1 typical pass thresholds: above 1 megohm at 1000 V dc test for dry conditions, allowing for the array capacitance to settle. Modern multifunction PV testers automate this with a stabilised reading. Values dropping below ~0.5 megohm indicate insulation defect — water ingress at a junction box, a damaged cable, or a panel cell-laminate fault. The MCS-certified installer interprets the result; values clearly below threshold mean the string is rejected and the fault traced before the inverter is energised.",
  },
  {
    question: "What if I find a PV install where the original commissioning pack is missing?",
    answer:
      "Document the missing pack in the EICR as an observation. Without the pack the customer may have difficulty re-registering for SEG or proving compliance to a buyer on house sale. The MCS-certified installer who originally commissioned the system can sometimes reissue documents from their records (subject to a fee). The umbrella scheme keeps a record of the MCS Commissioning Certificate in their database — the customer can request a copy. The inverter type-test certificate is downloadable from the manufacturer site by model number. The EIC reissue requires the original test data which may have been retained by the original contractor.",
  },
  {
    question: "Does the EICR cover the F-Gas refrigerant side of a heat pump?",
    answer:
      "No. The EICR covers the electrical installation — the supply cable, isolation, RCD protection, controls wiring, bonding. The refrigerant circuit is F-Gas-certified personnel territory and is inspected separately to a different standard (the F-Gas record). On the EICR you record what you can verify electrically (supply intact, isolator works, controls intact, no obvious damage to the indoor or outdoor unit) and note that refrigerant inspection is outside the EICR scope and should be carried out by an F-Gas-certified engineer.",
  },
  {
    question: "What does the customer get at PV handover?",
    answer:
      "Physical and digital copies of the commissioning pack (EIC, PV commissioning record, MCS Commissioning Certificate, inverter type-test certificate, array layout, single-line schematic, isolator location plan, manufacturer manuals, G98 notification copy / G99 Connection Offer). A walk-through of the inverter display showing how to read daily / lifetime kWh. Demonstration of the AC isolator and DC isolator locations. Brief on the manufacturer warranty terms. Handover sheet signed by both parties to evidence the customer received the documentation. The walk-through is often the most useful part for the customer — they remember where the isolators are, which matters for emergency response.",
  },
  {
    question: "What goes on the EV charger commissioning record?",
    answer:
      "EV charger commissioning per BS 7671 Section 722 (significantly amended in A4:2026): final circuit Zs at the unit; RCD type and trip time test (Type B or Type A + RDC-DD); local isolator presence and within-sight check; open-PEN protection verification (built-in detection per IEC 61851-1, dedicated TT electrode, or external open-PEN device); cable size and rating check against the unit nameplate; signage check (presence of EV charger, isolation points). These results are recorded on the EIC plus an EV-specific commissioning sheet that the OZEV grant funding may require. The MCS-certified installer or the OZEV-approved installer signs off.",
  },
];

export default function Sub5() {
  const navigate = useNavigate();
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module2-section2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 2
          </button>

          <PageHero
            eyebrow="Module 2 · Section 2 · Subsection 5"
            title="Inspection and test of environmental tech"
            description="The inspection and test framework for environmental technology systems pulls together BS 7671 Part 6, IEC 62446 PV verification, MCS commissioning evidence and the EICR scope on env tech additions. Recognising the documentation chain is part of the L3 apprentice scope."
            tone="emerald"
          />

          <TLDR
            points={[
              "BS 7671 Part 6 governs initial verification of every fixed circuit including env tech additions — visual, dead test, live test, certified on the EIC.",
              "IEC 62446-1 / MCS MGD 003 codifies PV string testing — Voc, Isc, polarity, IR. Run before energising the inverter because PV strings stay live in daylight.",
              "EICR scope on env tech additions includes signage, DC isolator condition, EV open-PEN method, RCD type, and the standard final-circuit verification.",
              "MCS Commissioning Certificate plus EIC together evidence a compliant install — both are needed; SEG and BUS grant eligibility depend on both.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Describe the BS 7671 Part 6 initial verification sequence as it applies to environmental tech final circuits.",
              "Identify the IEC 62446-1 / MCS MGD 003 PV string commissioning tests — Voc, Isc, polarity, insulation resistance — and pass thresholds.",
              "Describe the additional EICR scope items for an installation with PV, EV charger and heat pump additions.",
              "Recognise the role of the MCS Commissioning Certificate alongside the EIC in the evidence chain.",
              "Identify signage requirements at the consumer unit, meter, inverter and isolators per BS 7671 Section 712.",
              "Describe the on-site sanity check for anti-islanding and explain why it does not replace the inverter type-test certificate.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>BS 7671 Part 6 — initial verification framework</ContentEyebrow>

          <ConceptBlock
            title="Every fixed circuit gets the Part 6 treatment"
            plainEnglish="Initial verification under BS 7671 Part 6 is the dead-and-live test sequence the electrician runs before energising any fixed circuit. The sequence is the same whether the circuit feeds a kitchen ring or a 32 A heat pump radial — visual inspection, continuity tests, insulation resistance, polarity, then live tests for earth fault loop impedance and RCD operating time. Env tech adds layers on top — PV-specific DC tests, EV-specific RCD type verification, F-Gas refrigerant integrity by the refrigeration trade — but the underlying Part 6 framework still applies."
            onSite="The Initial Verification work is recorded on the Electrical Installation Certificate (EIC). The EIC is the legal evidence that the electrical installation was tested before energising. Env tech additions get the same EIC treatment — the PV inverter circuit, the EV charger circuit, the heat pump supply circuit are all final circuits and are tested as such. The PV-specific DC tests are typically recorded on a separate commissioning sheet attached to the EIC. As the L3 apprentice you will operate the test instrument under supervision and learn to read the results."
          >
            <p>
              The Part 6 sequence in plain terms:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Visual inspection</strong> — kit installed correctly, isolators
                accessible, signage present, no visible damage, manufacturer instructions
                followed.
              </li>
              <li>
                <strong>Continuity of protective conductors</strong> — every CPC continuous
                end-to-end. Tested with a low-resistance ohmmeter.
              </li>
              <li>
                <strong>Insulation resistance</strong> — between live conductors, between
                live and earth, at 500 V dc (typical for 230 V circuit). Acceptable values
                normally above 1 megohm. Env tech kit may need to be disconnected for the
                test (inverter, EV charger, heat pump) to avoid damage to electronic
                circuitry.
              </li>
              <li>
                <strong>Polarity</strong> — line and neutral correctly oriented at every
                point. A polarity error in a final circuit is a category C2 defect and
                usually reflects a mistake in the consumer unit termination.
              </li>
              <li>
                <strong>Earth fault loop impedance Zs</strong> — measured with a loop tester
                at the furthest point of each final circuit. Compared to the maximum
                tabulated value for the protective device.
              </li>
              <li>
                <strong>RCD operating time</strong> — verified with an RCD tester at the
                rated tripping current. Type B for EV chargers, Type A for many other
                circuits, time-delayed not allowed for heating per Section 753.
              </li>
            </ul>
            <p>
              Each of these tests is recorded on the EIC schedule. Modern test instruments
              (Megger MFT, Fluke 1664, Metrel MI 3155) automate the sequence and produce a
              digital test record that flows directly into the EIC.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Part 6 (Inspection and Testing) and Section 712 (PV) signage requirements"
            clause={
              <>
                Initial verification is mandatory for every new installation,
                addition or alteration before being put into service. Section
                712 contains specific requirements for PV systems including
                additional inspection items (DC isolation accessibility, dual-source
                signage at the consumer unit and meter position, isolator
                identification, polarity verification on the DC side). The
                requirements are in addition to the general inspection and testing
                requirements of Part 6.
              </>
            }
            meaning={
              <>
                BS 7671 Part 6 plus Section 712 together define the inspection
                and test scope for PV. The L3 apprentice should recognise that
                env tech adds requirements on top of standard Part 6 — DC string
                testing, signage verification, isolator accessibility — and that
                these are recorded on the EIC supplemented by a PV-specific
                commissioning sheet. A4:2026 has tightened the PV signage and
                isolation requirements; check the live edition.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 6 and Section 712 (paraphrased from published IET commentary on the A4:2026 amendment)."
          />

          <SectionRule />

          <ContentEyebrow>IEC 62446-1 — PV string testing in detail</ContentEyebrow>

          <ConceptBlock
            title="Testing the DC side before closing the inverter"
            plainEnglish="PV strings stay live whenever sunlight hits the panels — there is no off switch on the array. Before closing the inverter for first energisation you need to verify each string is healthy, correctly polarised and properly insulated. IEC 62446-1 (international) and MCS MGD 003 (UK) codify the procedure. Modern multifunction PV test instruments (Seaward PV150, Megger PVM210, HT IV400) automate the sequence and record per-string results that go on the commissioning sheet."
            onSite="The test sequence at the inverter DC entry, with the inverter isolated: (1) verify zero voltage at the AC terminals — AC isolator OFF, locked. (2) Verify the DC isolator at the inverter is OFF, locked. (3) Connect the test instrument to the first string DC terminals upstream of the inverter. (4) Measure Voc — open-circuit voltage. Compare to expected (panel rating × number of panels in series, temperature corrected). (5) Measure Isc — short-circuit current. The instrument briefly shorts the string and records the current. (6) Verify polarity — instrument confirms positive and negative. (7) Insulation resistance — instrument applies 1000 V dc between array-positive and earth, then array-negative and earth. Record megohms each. (8) Move to the next string and repeat. (9) When all strings pass, close DC isolator and proceed to AC commissioning."
          >
            <p>
              Common failure modes the test catches:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Reverse polarity</strong> — installer crossed positive and negative
                at a junction box. Energising the inverter on a reverse-polarity string
                damages the inverter input stage. Test catches it before damage.
              </li>
              <li>
                <strong>Shorted bypass diode</strong> — a panel with a failed bypass diode
                shows abnormal Voc (one cell-string worth lower than expected). Indicates
                a faulty panel that needs replacement under warranty.
              </li>
              <li>
                <strong>Insulation defect</strong> — water in a junction box, damaged
                cable insulation, panel laminate fault. IR test below threshold rejects
                the string before energisation.
              </li>
              <li>
                <strong>Wrong number of panels in series</strong> — Voc reading low or
                high compared to expected. Either a panel is missing from the string, or
                an extra panel has been added. MCS designer verifies count.
              </li>
              <li>
                <strong>Ground fault at array</strong> — a damaged frame bonding allowing
                live conductor to touch metalwork. IR test catches it; ground fault tools
                in modern inverters also detect it after energisation.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>EICR scope on env tech additions</ContentEyebrow>

          <ConceptBlock
            title="The five-year inspection covers the whole fixed installation"
            plainEnglish="An Electrical Installation Condition Report (EICR) is the periodic inspection of an existing installation per BS 7671 Part 6. The recommended frequency for domestic is five years (every three for some Scottish tenanted property). The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 made five-year EICR a legal requirement for landlords in England. Env tech additions are part of the fixed installation and fall within EICR scope — the inspector covers them alongside the rest of the property."
            onSite="The EICR follows the same Part 6 dead-and-live test framework but adds visual condition assessment (corrosion, accessibility, signs of overheating, signage legibility, customer modifications). Env tech-specific extras: PV DC isolator accessibility and operation; PV inverter and consumer-unit signage per Section 712; visible inspection of the array from a roof-safe vantage; EV charger open-PEN protection method check; EV charger RCD type and trip-time test; heat pump supply circuit Zs and RCD; bonding of any extraneous-conductive-parts at the heat pump outdoor unit. Findings are coded C1 / C2 / C3 / FI per the EICR Best Practice Guide."
          >
            <p>
              EICR coding for env tech findings — typical examples:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>C1 (Danger present, immediate action)</strong> — exposed live
                parts at a damaged DC isolator; missing earth at the EV charger creating
                a live chassis; exposed DC cable damaged with conductor visible.
              </li>
              <li>
                <strong>C2 (Potentially dangerous, urgent remedial)</strong> — wrong RCD
                type on EV charger (Type AC instead of Type B / Type A + RDC-DD); missing
                open-PEN protection on PME-supplied EV charger; PV DC isolator
                inaccessible or seized.
              </li>
              <li>
                <strong>C3 (Improvement recommended)</strong> — missing or illegible
                Section 712 signage; PV install pre-dating current standards but
                functionally safe; heat pump supply on Type B MCB causing periodic
                nuisance trips on compressor inrush.
              </li>
              <li>
                <strong>FI (Further investigation required)</strong> — anomalous Voc
                reading on a PV string suggesting a faulty panel; intermittent inverter
                fault that cannot be reproduced on inspection day; customer report of
                EV charger tripping that does not appear during test.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The commissioning pack — what the customer keeps</ContentEyebrow>

          <ConceptBlock
            title="The install pack lives with the property for life"
            plainEnglish="On commissioning a PV / EV / heat pump install, the customer receives a commissioning pack — a physical and digital folder of documents that evidence the install was done compliantly. The pack lives with the property — when the customer sells, the next owner needs it; when the EICR comes round in five years, the inspector wants it; when the customer claims SEG tariff, the supplier wants the MCS Commissioning Certificate; when there is a warranty claim, the manufacturer wants the install date and serial numbers."
            onSite="Hand the pack over physically and email a digital copy. Some firms use a customer portal or QR code on the inverter that links to the cloud-stored pack — that helps but does not replace the physical hand-over. Walk the customer through the contents: 'this is your EIC for the electrical work, this is your MCS certificate for SEG eligibility, this is the type-test certificate the DNO needed, these are your inverter and panel manuals, this is the array layout drawing, this is the single-line schematic, this is the isolator location plan'. Five minutes spent on the walk-through saves ten phone calls in the first year."
          >
            <p>
              Pack contents — typical PV install:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>BS 7671 EIC for the electrical work, signed by the contractor.</li>
              <li>PV-specific commissioning record (Voc, Isc, IR, polarity per string per IEC 62446-1 / MCS MGD 003).</li>
              <li>MCS Commissioning Certificate (the MCS-certified installer sign-off — required for SEG eligibility).</li>
              <li>Inverter type-test certificate for DNO G98 / G99 acceptance.</li>
              <li>Array layout drawing showing panel positions on the roof plan.</li>
              <li>Single-line electrical schematic from array → DC isolator → inverter → AC isolator → meter → consumer unit.</li>
              <li>DC and AC isolator location plan with photos.</li>
              <li>Manufacturer manuals for inverter and panels (warranty terms, troubleshooting).</li>
              <li>G98 notification copy or G99 Connection Offer with DNO reference.</li>
              <li>Customer handover sheet signed by both parties.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="DNO notification — G98 vs G99 and what the L3 apprentice should know"
            plainEnglish="Any generation feeding the grid needs DNO awareness. G98 is the 'fit and notify within 28 days' route for small inverter-connected sources up to 16 A per phase (≈3.68 kW single-phase, ≈11 kW three-phase). G99 is the 'apply, get a Connection Offer, then install' route for anything larger. Skipping notification is a real-world commercial risk — DNOs do audit installs."
            onSite="The MCS-certified installer is the legally responsible party for the notification on a domestic PV / battery / EV install. The L3 apprentice contributes the install evidence (G98 form fields like inverter make / model / type-test certificate, AC isolator type, installer name and reference) and learns the framework so they can step into the lead role at L4 / NVQ Level 3 sign-off."
          >
            <p>
              The two engineering recommendations that govern domestic / small commercial
              generation in the UK:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Engineering Recommendation G98:</strong> "Connect and Notify" —
                applies to type-tested fully-fitted inverter generation up to 16 A per phase
                per inverter, on a 230 / 400 V LV supply. The installer fits the unit and
                notifies the DNO within 28 days using the G98 short-form notification.
                Multiple G98 inverters at the same property accumulate; over the 16 A per
                phase aggregate threshold, G99 applies instead.
              </li>
              <li>
                <strong>Engineering Recommendation G99:</strong> "Apply and Wait" — applies
                to anything not covered by G98. The installer (or designer) submits a G99
                application to the DNO with the proposed scheme, the DNO issues a Connection
                Offer (often with conditions on protection settings, fault levels, or
                network reinforcement), the installer accepts and installs to the offer,
                then commissions and submits the G99 commissioning record. Typical G99
                projects: 4 kWp+ PV with battery export, three-phase EV charging banks,
                small commercial CHP / wind / heat pump combinations.
              </li>
              <li>
                <strong>Type-test certificates:</strong> G98 / G99 both rely on the inverter
                being type-tested to the relevant standard (currently BS EN 50549-1 / -2 in
                place of the older G83 / G59 standards). The type-test certificate must be
                included with the notification or application — without it, the inverter
                cannot be lawfully grid-connected. The MCS database carries type-tested
                inverter listings; check before specifying.
              </li>
            </ul>
            <p>
              Why this matters at L3 even though the apprentice does not personally sign the
              notification: the install evidence the apprentice records during commissioning
              (Voc / Isc / IR per string, AC isolator photo, inverter serial number, type-test
              certificate scan) is exactly what the G98 / G99 form needs. A messy commissioning
              record produces a messy notification — and a DNO audit later that finds the
              install does not match the notification can result in disconnection until the
              paperwork is rebuilt.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <ConceptBlock
            title="A4:2026 RCD test change — single AC test at 1×IΔn, full stop"
            plainEnglish="Pre-A4:2026 RCD verification used a multi-current sequence — half-rated, rated, and a five-times-rated test for additional protection. A4:2026 redrafted Reg 643.8 and deleted Table 3A (the multi-current performance table) from Appendix 3. Now there is a single alternating current test at 1×IΔn, regardless of RCD type (Type AC, A, F, B). Older test schedules and older test instruments need updating."
            onSite="On the inverter or EV-charger circuit, the RCD test is now: select the matching IΔn on the MFT, select alternating current, run the test once, record the operating time. Pass criterion per Reg 643.8 is a single 1×IΔn AC test — a general non-delay RCD must disconnect within 300 ms, a delay 'S' type within 130–500 ms. The deleted 5×IΔn / 40 ms test no longer applies. The change matters when reading older EIC and EICR records — anything pre-A4:2026 will quote multi-current readings; anything post-A4:2026 should quote a single 1×IΔn reading."
          >
            <p>
              Practical implications on env tech inspection and test:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>One reading per RCD</strong> — single AC test at 1×IΔn. No five-times
                test, no half-rated test. Records the operating time in milliseconds.
              </li>
              <li>
                <strong>Same procedure across types</strong> — Type AC, Type A, Type F and
                Type B all verified by the same alternating current test. Type B sites still
                need DC residual current sensitivity verified per the manufacturer's stated
                method, but the BS 7671 verification is the AC test.
              </li>
              <li>
                <strong>EV chargers</strong> — Reg 722.531.3.101 requires 30 mA RCD per
                connecting point with DC fault current protection in addition. Verify the
                30 mA RCD with the AC test at 1×IΔn; verify the DC sensing per the
                manufacturer's stated method (often a built-in self-test in modern units).
              </li>
              <li>
                <strong>Older instruments</strong> — multi-function testers calibrated to
                the pre-A4:2026 method still produce valid readings; the 1×IΔn reading is
                the one that goes on the certificate. Some firmware updates re-label the
                test screens to match A4:2026 wording.
              </li>
              <li>
                <strong>Records</strong> — schedule of test results column for RCD
                operating time records the single 1×IΔn AC test value. Where the previous
                inspector's record shows multiple readings, note the change in test method
                in the EICR observations.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 421.1.7 (AFDDs in higher-risk premises)"
            clause={
              <>
                Regulation 421.1.7 has been redrafted. It is now a requirement to protect
                final circuits supplying socket-outlets with a rated current not exceeding
                32 A using arc fault detection devices (AFDDs) in Higher Risk Residential
                Buildings, Houses in Multiple Occupation, Purpose-built student
                accommodation and Care homes. For all other premises, the regulation
                recommends AFDDs for single-phase final circuits.
              </>
            }
            meaning={
              <>
                A4:2026 promoted Reg 421.1.7 from a recommendation to a requirement in four
                premises categories — HRRBs, HMOs, PBSA and care homes. Env tech additions
                in any of those categories (EV charger socket-outlets, garden-room PV
                supplies, heat-pump immersion socket-outlets where 32 A or below) need
                AFDD protection on top of RCD protection. For other premises Reg 421.1.7
                still recommends rather than mandates, but the recommendation should be
                actively considered on every install — the cost differential between an
                RCBO and an AFDD-RCBO has narrowed and the safety case is well-evidenced.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulation 421.1.7."
          />

          <ConceptBlock
            title="Section 712 PV signage — what A4:2026 expects to see at the consumer unit"
            plainEnglish="Section 712 (Solar PV) was redrafted in A4:2026 with tightened signage and isolation requirements. The presence of a parallel generator must be unmissable to the next person who opens the consumer unit. Reg 514.10 (alternative-supply notice) and Reg 514.10.1 (voltage exceeding 230 V to earth) drive the signage scheme; Section 712 fills in the PV-specific detail — DC isolator labelling, AC isolator labelling, inverter location and the system schematic carried with the install pack."
            onSite="At commissioning, walk the property with the customer and point out every label. The next sparks who opens the consumer unit might be ten years from now after the customer has sold the house — the labelling has to survive that timeline. Use durable plates (not paper labels) at the consumer unit, the meter, the inverter and the DC isolator. Photograph each label and include in the install pack so the EICR inspector five years later can match labels to the original commissioning."
          >
            <p>
              The Section 712 / 514.10 signage scheme on a domestic PV install:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Consumer unit</strong> — durable label identifying the property has
                a parallel generator, listing the AC isolator location and the DC isolator
                location. Reg 514.10 wording: 'Caution — this installation has more than
                one source of supply'.
              </li>
              <li>
                <strong>Meter position</strong> — same alternative-supply notice plus
                identification of the inverter make / model and the install date for the
                next meter operative.
              </li>
              <li>
                <strong>AC isolator at the inverter</strong> — labelled with the circuit
                identification at the consumer unit and the rating. The isolator must be
                accessible and within reach of the inverter.
              </li>
              <li>
                <strong>DC isolator</strong> — labelled with voltage rating, polarity
                warning and Reg 514.10.1 'voltage exceeding 230 V to earth' notice where
                array Voc puts the DC string above 230 V to earth.
              </li>
              <li>
                <strong>Single-line schematic at the consumer unit</strong> — laminated
                copy showing array → DC isolator → inverter → AC isolator → meter →
                consumer unit. Carries the install date and the contractor reference for
                later traceability.
              </li>
              <li>
                <strong>Reg 514.13.1 'Safety Electrical Connection — Do Not Remove'</strong>
                — at the MET and at every bonding connection. PV install adds a bonding
                conductor to the array frame; the connection gets the standard safety
                label.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Anti-islanding sanity test on commissioning — what you can and cannot prove on site"
            plainEnglish="The inverter type-test certificate does the heavy lifting on anti-islanding (loss-of-mains protection). The on-site commissioning sanity test is a single check — open the AC isolator and confirm the inverter shuts down within seconds. Fancy fault simulation (frequency excursions, voltage dips, harmonic injection) needs laboratory equipment and is not part of site commissioning."
            onSite="The site test sequence: brief the customer that the system is about to disconnect briefly; with the array generating, open the AC isolator at the inverter output; observe the inverter — within a few seconds the inverter should detect loss of mains, declare a fault, and stop driving the AC terminals. Re-close the AC isolator; the inverter goes through its recovery delay (typically 60-180 seconds depending on G98 / G99 settings) before re-synchronising. Document on the commissioning sheet."
          >
            <p>
              Why the on-site test is a sanity check rather than a full verification:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Type-test covers fault response</strong> — ROCOF, vector shift,
                voltage and frequency thresholds, recovery delay. The laboratory uses
                programmable AC sources to inject the fault profiles; you cannot replicate
                this on site.
              </li>
              <li>
                <strong>Site test confirms the basic mechanism</strong> — the inverter
                actually monitors the AC terminals and disconnects when mains disappears.
                If it does not, the inverter is faulty or wired wrong, regardless of what
                the type-test certificate says.
              </li>
              <li>
                <strong>Recovery delay catches customers out</strong> — a brief grid blip
                makes the inverter shut down for the full recovery delay (one to three
                minutes is normal). Customers ring up convinced the inverter is broken.
                Brief them at handover so they recognise this as designed behaviour.
              </li>
              <li>
                <strong>Document the test</strong> — date, time, who carried out, how
                long the inverter took to disconnect, how long to recover. The record
                belongs in the install pack alongside the type-test certificate.
              </li>
              <li>
                <strong>Annual aftercare</strong> — repeat the sanity test at the
                annual MCS aftercare visit to confirm the inverter still detects loss
                of mains. A degraded LoM detector is a real failure mode that the site
                test catches before the type-test is re-run by the manufacturer.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020"
            clause={
              <>
                Landlords of properties in the private rented sector in England
                are required to have the fixed electrical installation
                inspected and tested at intervals not exceeding five years by a
                qualified person, and to provide a copy of the report to the
                tenant and to the local authority on request. The report shall
                identify any unsatisfactory items and the remedial action
                required. Failure to comply is subject to civil penalty.
              </>
            }
            meaning={
              <>
                The 2020 Regulations made what was BS 7671 best practice into
                statutory duty for landlords. The EICR on a property with env
                tech additions covers the env tech as part of the whole fixed
                installation. As the L3 apprentice carrying out or assisting on
                landlord EICRs, recognise that the inspector is producing a
                statutory document for the landlord and that env tech findings
                are part of that report. Comparable regulations apply in
                Scotland (Housing (Scotland) Act 2006 with five-year EICR for
                most tenanted property; some categories on three-year cycle).
              </>
            }
            cite="Source: Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 (S.I. 2020/312) — paraphrased; full text on legislation.gov.uk."
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Skipping the DC string IR test before energising the inverter"
            whatHappens={
              <>
                Apprentice closes the DC isolator without running the IR test,
                trusting that the strings 'looked fine on visual'. Inverter
                energises, ground fault detector trips, inverter goes into fault
                state. Now the team has to find the insulation defect with the
                inverter offline and the strings still live (sunlight). Worst
                case the inverter input stage is damaged by a reverse-polarity
                string and the warranty is void because commissioning evidence
                shows no IR test was run.
              </>
            }
            doInstead={
              <>
                Run the full IEC 62446-1 / MCS MGD 003 sequence per string
                before closing the DC isolator: Voc, Isc, polarity, IR
                positive-to-earth, IR negative-to-earth. Record the per-string
                results on the commissioning sheet. The discipline takes 5-10
                minutes per string and protects the inverter, the install
                warranty and the apprentice. Skip it once and the cost is
                always greater than the time saved.
              </>
            }
          />

          <CommonMistake
            title="Inspecting an EV charger but missing the open-PEN protection method"
            whatHappens={
              <>
                EICR on a PME-supplied property with a 32 A EV charger. The
                inspector tests the charger as a normal final circuit — Zs,
                RCD trip time, polarity — and signs off. But the inspector did
                not verify the open-PEN protection method (built-in detection,
                dedicated TT electrode for the EV, or external open-PEN device).
                If the charger is on PME with no open-PEN protection, a fault
                on the DNO neutral could rise the chassis and the EV body to
                full phase voltage — a serious shock risk to anyone touching
                the car.
              </>
            }
            doInstead={
              <>
                Verify the open-PEN protection method as a specific EICR check.
                Read the data sheet for the unit to confirm built-in detection,
                or inspect the install for a dedicated TT electrode for the EV
                side, or look for an external open-PEN device upstream. If
                none of the three is present and the supply is PME, code C2
                with a recommendation to fit an open-PEN protection device
                under BS 7671 Section 722 (significantly amended in A4:2026).
              </>
            }
          />

          <Scenario
            title="EICR on a property with PV and EV — what the inspector needs to see"
            situation={
              <>
                You are assisting on the five-year EICR of a domestic property.
                The property has a 4 kWp PV array installed eight years ago
                under the old G83 framework, plus a 7 kW EV charger fitted
                last year. The customer cannot find the original PV
                commissioning pack. The EV charger is a Type B unit installed
                by an OZEV-approved firm and the customer has the install
                paperwork. The supply is PME.
              </>
            }
            whatToDo={
              <>
                For the PV: visual inspection of the consumer unit signage
                (note any missing — Section 712 has tightened signage in
                A4:2026 but the 8-year-old install pre-dates A4:2026 so the
                older signage may be acceptable as 'fit for purpose at time
                of install'); check DC isolator accessibility and operation;
                visual of the array from a roof-safe vantage; test the AC
                final circuit (Zs, RCD, IR with inverter disconnected). Note
                the missing commissioning pack as an observation — the
                customer can request a copy from the original installer or
                their MCS umbrella scheme. For the EV charger: verify Type B
                RCD operating time; check open-PEN protection method per
                Section 722 (likely built-in for a modern unit, but verify
                from the data sheet); check local isolator within sight; test
                Zs and RCD trip time. Record everything on the EICR with
                appropriate codes and a recommendations section.
              </>
            }
            whyItMatters={
              <>
                A thorough EICR on a property with env tech is the inspector
                evidence that the whole fixed installation was assessed. Skipping
                the PV DC side or the EV open-PEN check leaves dangerous gaps —
                the next inspector inherits those gaps; the customer landlord may
                be in breach of the 2020 Regulations; the apprentice professional
                reputation rests on a thorough, documented inspection.
              </>
            }
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Summary of changes (Reg 643.3 insulation resistance & Reg 643.8 RCD test changes)"
            clause={
              <>
                Regulation 643.3 has been redrafted. The requirements for testing insulation
                resistance where equipment is likely to influence the verification test or be
                damaged has been clarified and reference is made to a 250 V DC test following
                the connection of equipment. The requirements for RCD testing have been
                changed and Table 3A (Time/current performance criteria for RCDs) in
                Appendix 3 has been deleted. Regardless of RCD Type, an alternating current
                test at rated residual operating current (IΔn) is used to verify the
                effectiveness.
              </>
            }
            meaning={
              <>
                Two important practical changes for environmental tech testing. First — when
                inverters or sensitive electronics are connected, drop the IR test voltage to
                250 V DC to avoid damaging the kit. Second — the old multi-current sequence
                (½×IΔn, 1×IΔn, 1×IΔn) has been replaced by a single AC test at 1×IΔn,
                irrespective of RCD type. Older test schedules need updating.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Reg 643.3 (insulation resistance) and Reg 643.8 (RCD effectiveness verification)."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "BS 7671 Part 6 governs initial verification — visual, dead test, live test, certified on the EIC. Env tech additions follow the same framework with extra layers.",
              "IEC 62446-1 / MCS MGD 003 codifies PV string testing — Voc, Isc, polarity, IR. Run before energising the inverter because PV strings stay live in daylight.",
              "EICR scope on env tech additions includes PV signage and isolator condition, EV open-PEN method and RCD type, heat pump supply Zs and RCD, plus standard final-circuit verification.",
              "EICR coding C1 / C2 / C3 / FI per the EICR Best Practice Guide. Wrong RCD type on EV is C2; missing Section 712 signage is typically C3.",
              "Five-year EICR on tenanted property in England is a statutory duty under the Electrical Safety Standards in the PRS (England) Regulations 2020.",
              "MCS Commissioning Certificate plus EIC together evidence a compliant install — both are needed; SEG and BUS grant eligibility depend on both.",
              "Hand the commissioning pack to the customer physically and digitally. Walk through the contents — five minutes saves ten phone calls.",
              "On-site anti-islanding test (open AC isolator, watch inverter trip) is a sanity check, not a full type-test. The type-test certificate covers the rest.",
            ]}
          />

          <Quiz title="Inspection and test of env tech — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module2-section2-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                2.4 ENA G98 / G99 grid notification
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module2-section3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Section 3 — Renewable energy systems
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
