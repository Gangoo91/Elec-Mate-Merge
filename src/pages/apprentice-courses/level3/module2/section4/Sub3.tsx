/**
 * Module 2 · Section 4 · Subsection 3 — BS 7671 Section 712 PV deep + ENA G98/G99 + anti-islanding
 * Maps to C&G 2365-03 / Unit 301 / LO2 / AC 2.1
 *   AC 2.1 — "state the relevant Building Regulations and other statutory and non-statutory
 *             requirements for the installation and maintenance of environmental technology
 *             systems"
 * Layered: 2357 Unit 312 ELTP02 / AC 3.1 (provide information on operational requirements
 * and benefits) and 2357 Unit 602 ELTK02 / AC 3.3 (Local Authority Building Control
 * requirements which apply to the installation of environmental technology systems).
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
  'BS 7671 Section 712 PV deep, ENA G98/G99 and anti-islanding (4.3) | Level 3 Module 2.4.3 | Elec-Mate';
const DESCRIPTION =
  'A regulatory deep dive into solar PV — BS 7671:2018+A4:2026 Section 712 (string protection, equipment selection, IMD, SPDs, equipotential bonding), ENA Engineering Recommendation G98 (under 16 A per phase) and G99 (over 16 A per phase) connection regimes, and the anti-islanding loss-of-mains protection that keeps DNO engineers safe.';

const checks = [
  {
    id: 'l3-m2-s4-sub3-string-fusing',
    question:
      "An installer presents you with a 12-string commercial PV array. Each string short-circuit current (Isc) is 11 A. They have not fitted string overcurrent protective devices and have run 16 mm² cable from each string to the combiner. Should you accept this on a Section 712 inspection?",
    options: [
      "Reject straight away — string fuses are mandatory on every PV array regardless of string count.",
      "Check the cable continuous current-carrying capacity (Iz) against the calculated reverse current. Regulation 712.433.102(b) gives two compliance routes for arrays with more than two parallel sub-arrays — either no OCPD with Iz at least equal to (N − 1) times Isc max, or fit OCPDs with rated current between 1.1 times Isc max and Iz. With N=12 and Isc=11 A, the no-OCPD route demands Iz of at least 11 times 11 = 121 A. A 16 mm² cable does not meet that, so as installed it is non-compliant. Either upsize the cable or fit per-string OCPDs sized between 1.1 times 11 = 12.1 A and the cable Iz.",
      "Accept the install because string fuses are only required for arrays over 100 kW.",
      "Accept because the inverter has built-in DC overcurrent detection.",
    ],
    correctIndex: 1,
    explanation:
      "Section 712.433.101 and 712.433.102 set the rules for PV string protection. The rationale is reverse-current fault protection — under a string short-circuit fault the surrounding strings can backfeed current into the faulty string, and that current must either be safely carried by the cable or interrupted by a per-string OCPD. The 1.1 coefficient in route (b) reflects the worst-case Isc multiplier; A4:2026 notes the coefficient is to be adapted upward for special module technologies or reflective conditions. The acceptance criterion appears verbatim in bs7671_facets — practitioners should never accept an array of N greater than two parallel sub-arrays without checking one of the two routes.",
  },
  {
    id: 'l3-m2-s4-sub3-g98-g99',
    question:
      "A customer wants a 5 kWp single-phase PV array on a domestic install. The inverter is rated 16 A nominal output. Which DNO connection regime applies, and who notifies the DNO?",
    options: [
      "G99 — every PV array goes through G99 application.",
      "G98 — single-phase PV up to and including 16 A per phase falls under ENA Engineering Recommendation G98 'Connect and Notify'. The MCS-certified installer notifies the DNO within 28 days of commissioning using the standard G98 form. No prior approval is required for G98 connections.",
      "Neither — domestic PV under 4 kWp does not need DNO notification.",
      "G83 — that is still the current document for domestic PV.",
    ],
    correctIndex: 1,
    explanation:
      "ENA Engineering Recommendation G98 governs grid connection of small-scale embedded generators up to and including 16 A per phase per inverter (for single-phase, that is roughly 3.68 kW per inverter at 230 V; for three-phase, around 11 kW). G99 governs everything above that threshold and requires prior DNO approval before energising. G83 is the legacy document G98 replaced — you may still see it cited on older paperwork but new installs reference G98 / G99. Notification is the MCS installer's duty; on a non-MCS install (rare) the customer would need to pursue this themselves.",
  },
  {
    id: 'l3-m2-s4-sub3-anti-islanding',
    question:
      "Why does a grid-connected PV inverter shut down within 0.5 seconds when the mains supply fails, even though the array is still producing DC?",
    options: [
      "The inverter is broken — it should keep running through a power cut.",
      "Anti-islanding — the inverter detects loss of grid reference and shuts down within the time limits of G98 / G99 (typically loss-of-mains protection per ENA EREC G98 / G99). This protects DNO engineers who may be working on what they believe is a dead supply, prevents asynchronous reclosure damage, and stops a small generator trying to support a much larger network it cannot stabilise. To run through a power cut you need a hybrid inverter with explicit islanded-mode capability and a transfer arrangement that isolates the property from the grid first.",
      "The inverter only works in daylight.",
      "DC current cannot flow without an AC sine wave to follow.",
    ],
    correctIndex: 1,
    explanation:
      "Loss-of-mains (LoM) protection is the engineering term and anti-islanding is the everyday name. ENA Engineering Recommendation G99 sets out vector-shift, rate-of-change-of-frequency (RoCoF) and voltage / frequency window thresholds. Modern inverters use multiple methods in combination. The 'why' is operational safety — a tiny PV inverter trying to keep a substation alive after the network has tripped is dangerous to anyone restoring the supply. Hybrid inverters with battery and a changeover arrangement can power the home in a power cut, but only after they have first electrically separated the home from the failed grid.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "What is the scope of BS 7671:2018+A4:2026 Section 712, and how was it changed in the A4:2026 amendment?",
    options: [
      "Only off-grid PV — grid-connected systems are outside BS 7671.",
      "Section 712 covers PV installations not connected to the public distribution network, in parallel with it, and as an alternative to it. The scope was reaffirmed in A4:2026 with the section extensively revised — new and amended clauses cover string OCPD selection (712.433), maximum DC voltage calculation (712.433.101.1), measures to prevent DC on-load interruption (712.537.2.2.104), remote operation in combiner boxes (712.537.2.2.105), Insulation Monitoring Device selection (712.538.101 referencing BS EN 61557-8), equipotential bonding of PV metal structures (712.542.101), DC functional bonding ratings (712.2 table), enclosure standards for outdoor installation (712.512.102 IP44 plus IK07), and PV module conformity to relevant electrical equipment standards (712.511.101 referencing BS EN 61215 series).",
      "Section 712 only applies to industrial PV over 100 kW.",
      "Section 712 was deleted in A4:2026 and its content moved to a separate IET Code of Practice.",
    ],
    correctAnswer: 1,
    explanation:
      "The scope wording from Section 712 is unambiguous in the published amendment commentary. A4:2026 represents the most significant rewrite of Section 712 since the 18th Edition was published, reflecting the maturity of UK PV deployment and the increasing prevalence of hybrid and battery-coupled systems. The Action: consult Section 712 facet captured in bs7671_facets makes this explicit — anyone designing, installing, inspecting or certifying PV must work to the revised section.",
  },
  {
    id: 2,
    question:
      "What does Regulation 712.512.102 require for the enclosure of PV electrical equipment installed outdoors?",
    options: [
      "Any enclosure marked IP rating is acceptable.",
      "Outdoor PV electrical equipment shall have a degree of protection not less than IP44 to BS EN 60529 and an impact rating not less than IK07 to BS EN 62262. On a Section 712 acceptance the enclosure shall be labelled accordingly or be accompanied by manufacturer documentation evidencing compliance — absence of evidence is non-compliance.",
      "IP55 is the minimum but only on roof-mounted equipment.",
      "There is no IP requirement for PV equipment.",
    ],
    correctAnswer: 1,
    explanation:
      "IP44 is splash protection plus protection against tools and small objects 1 mm and over. IK07 is a 2 J impact rating. The combination is appropriate for typical UK outdoor weather and incidental contact, including hail and minor mechanical knocks. The acceptance facet from bs7671_facets is direct — labelling or documentation is required, and a verifier confronted with neither must record non-compliance.",
  },
  {
    id: 3,
    question:
      "What does Regulation 712.538.101 require for an Insulation Monitoring Device on a PV installation, and how is compliance evidenced?",
    options: [
      "Any IMD will do, no standard reference applies.",
      "Where an IMD is provided, it shall be selected in accordance with BS EN 61557-8. Compliance is evidenced by documentation, marking or a declaration of conformity to the standard. Where no such evidence exists, the installation does not meet the requirement and must be treated as non-compliant until evidence is produced.",
      "IMDs are only required on three-phase PV systems.",
      "IMDs must be calibrated by the installer on site, no standard applies.",
    ],
    correctAnswer: 1,
    explanation:
      "BS EN 61557-8 is the product standard for Insulation Monitoring Devices used in IT systems and selected DC applications. The acceptance facet captured in bs7671_facets is precise — absence of conformity evidence is non-compliance, and the verifier should not accept verbal assurance. IMDs detect insulation degradation on the DC side before the fault becomes a hazard. Section 712 requires their use in defined configurations.",
  },
  {
    id: 4,
    question:
      "What is the Regulation 712.2 functional bonding conductor automatic disconnecting device requirement for a PV array peak rating in the 50 to 100 kW band?",
    options: [
      "1 A irrespective of array size.",
      "The maximum rated current of the automatic disconnecting device in the functional bonding conductor shall be 3 A for arrays over 50 kW up to 100 kW. The full table of the same regulation specifies 1 A for arrays under 25 kW, 2 A for 25 to 50 kW, 3 A for 50 to 100 kW, 4 A for 100 to 250 kW and 5 A above 250 kW.",
      "10 A regardless of array power.",
      "The bonding conductor never has an automatic disconnecting device.",
    ],
    correctAnswer: 1,
    explanation:
      "The Reg 712.2 table is short but very specific — a stepped scale of permitted device ratings in the functional bonding conductor based on PV array peak power. The complete five-row table appears verbatim in bs7671_facets. This functional bonding handles transient and induced currents, not fault clearance, so the device ratings are deliberately small and ascend slowly with array size.",
  },
  {
    id: 5,
    question:
      "An MCS-certified installer commissions a 4 kWp domestic PV array with a single-phase 16 A inverter. What is the DNO notification regime, and what is the timing requirement?",
    options: [
      "G99, application required before any work begins.",
      "G98 'Connect and Notify' applies because the inverter output is up to and including 16 A per phase. The MCS installer notifies the DNO within 28 days of commissioning using the standard G98 notification form. No prior DNO approval is required for G98 connections — the installer connects, then notifies. The DNO is required to update its network records and confirm receipt.",
      "No notification is required for any domestic PV.",
      "G83 — the document used by the previous regime.",
    ],
    correctAnswer: 1,
    explanation:
      "ENA G98 is the connect-and-notify regime for small embedded generators up to and including 16 A per phase. G99 is the larger-system regime requiring prior approval. The MCS Installer Standard places the notification duty on the installer, not the homeowner. The 28-day window is the standard expectation.",
  },
  {
    id: 6,
    question:
      "Why does a grid-connected PV inverter shut down within sub-second timing when the public distribution supply fails, and what is the engineering term for this protective function?",
    options: [
      "Inverter overheating cut-out.",
      "Loss-of-mains (LoM) protection, commonly called anti-islanding. The inverter monitors voltage, frequency, vector shift and rate of change of frequency on the AC side. When the grid reference is lost or moves outside the permitted window defined in ENA G98 / G99, the inverter ceases to export within the specified timing. The intent is to protect DNO engineers, prevent asynchronous reclosure damage and stop a small generator attempting to support a much larger network it cannot stabilise.",
      "An undocumented manufacturer feature.",
      "DC starvation when the panels darken.",
    ],
    correctAnswer: 1,
    explanation:
      "Loss-of-mains protection is one of the most important grid-connection safety features. The rationale is straightforward — anyone working on a network they believe to be dead must remain safe even if a domestic inverter is still trying to push power. Modern inverters combine vector-shift, RoCoF, voltage and frequency window detection. The G99 type-test regime checks each method.",
  },
  {
    id: 7,
    question:
      "A customer wants their PV system to keep running during a power cut. Why won't a standard grid-tied inverter do this, and what is the alternative?",
    options: [
      "It will, the customer just needs to flick a switch.",
      "A standard grid-tied inverter is required to shut down on loss of mains because of anti-islanding rules. Continuous operation through a power cut needs a hybrid inverter with explicit islanded-mode capability, paired with a battery and a changeover arrangement that first electrically isolates the property from the failed grid before re-energising selected circuits. The MCS designer specifies which loads stay alive, the battery sizing, and the transfer time.",
      "The inverter has a software bug.",
      "Power cuts permanently damage PV panels.",
    ],
    correctAnswer: 1,
    explanation:
      "Anti-islanding makes a standard grid-tied inverter useless during a power cut by design. Hybrid inverters get around it by separating the home from the grid first — a contactor or relay opens, the home becomes its own micro-grid, and the inverter then provides the voltage and frequency reference itself. This is governed by Section 712 plus the manufacturer's installation manual, and on larger systems by G99 and the DNO connection agreement.",
  },
  {
    id: 8,
    question:
      "What does Regulation 712.542.101 require for the equipotential bonding of PV metal structures?",
    options: [
      "Bonding is optional for PV metalwork.",
      "Continuity of the bonding conductor from the metallic PV structures to the chosen suitable earthing terminal shall be demonstrable. The acceptance criterion is a continuity test showing low resistance and a secure, permanent connection to the earthing terminal. Where continuity cannot be demonstrated, the installation is non-compliant.",
      "Bonding is only required where the modules are at over 1500 V DC.",
      "Bonding is required only on flat-roof installations.",
    ],
    correctAnswer: 1,
    explanation:
      "Regulation 712.542.101 covers the electrical bonding of the structural metalwork that holds the PV modules in place. The intent is to ensure that any fault current finding its way onto the array frames, rails or fixings has a low-impedance return to earth. The acceptance facet captured in bs7671_facets is direct — continuity must be measurable and the connection must be permanent and secure.",
  },
];

const faqs = [
  {
    question: "Section 712 keeps citing 'Uoc max' and 'Upc max' — what do these mean and why do they matter for equipment selection?",
    answer:
      "Uoc max is the maximum open-circuit DC voltage the array can produce at the lowest expected ambient temperature (PV cell open-circuit voltage rises as temperature falls). Upc max is the maximum operating DC voltage. Regulation 712.512.1.1 requires that the equipment voltage ratings (cables, isolators, fuses, the inverter DC input) shall be greater than or equal to the calculated Uoc max and Upc max determined in accordance with Regulation 712.433.101.1. Underrated equipment — for example a 600 V DC isolator on a string that hits 720 V on a frosty morning — is non-compliant and a real-world cause of fires. The MCS designer calculates these voltages; you, as the installer, verify them on the equipment labels.",
  },
  {
    question: "ENA G98 versus G99 — how do I know which one applies?",
    answer:
      "The threshold is 16 A per phase per inverter measured at nominal output. Single-phase under or equal to 16 A (around 3.68 kW at 230 V) is G98. Single-phase over 16 A or any three-phase system over 16 A per phase is G99. There is also the 'multiple inverters' rule — if you have several G98 inverters on the same site, the cumulative export can push the site into G99 territory regardless of individual unit rating, and the DNO will tell you on application. Always check the inverter datasheet for the AC-side current rating, not the kWp rating of the array.",
  },
  {
    question: "What is the 28-day rule for G98 notification, and what happens if it's missed?",
    answer:
      "ENA G98 obliges the installer to notify the DNO within 28 days of commissioning. The notification is on the standard G98 form and includes installation address, MPAN, inverter make and model, type-test certificate reference, total export capacity and commissioning date. Missing the deadline is a breach of the connection conditions — the DNO can require disconnection until notification is regularised, and the installer's MCS standing can be affected. From the customer side, no Smart Export Guarantee tariff payment can flow without the DNO notification on file.",
  },
  {
    question: "How does the A4:2026 revision of Section 712 affect a PV install I'm working on now?",
    answer:
      "If the install commenced after the A4:2026 effective date, the revised Section 712 applies in full — including the new and amended clauses on DC voltage calculation, IMD selection (BS EN 61557-8), enclosure ratings (IP44 plus IK07), string OCPD selection routes, equipotential bonding continuity acceptance criteria and the functional-bonding-conductor device ratings table at 712.2. Designs commenced before the effective date but completed after it sit in the transitional window — the IET commentary and the customer's MCS designer should advise. The Action: consult Section 712 facet from bs7671_facets is the safe default for any post-effective-date work.",
  },
  {
    question: "Anti-islanding sometimes trips for no obvious reason and the customer loses generation. What's going on?",
    answer:
      "Loss-of-mains protection has to be sensitive enough to catch genuine loss of grid quickly, and that sensitivity occasionally trips on grid disturbances that are not loss of mains — voltage sag from a nearby fault, frequency excursion from a large generator tripping elsewhere, RoCoF events on a stressed network. ENA G99 has revised the LoM thresholds over the years to balance safety against nuisance trips. Modern inverters with G99-compliant settings are tuned tighter than the old G83 generation. If a customer reports frequent trips, check the inverter event log, confirm firmware is current and ask the DNO whether nearby network events correlate with the trips. Do not loosen LoM settings without the DNO's agreement — it is a safety function.",
  },
  {
    question: "Where do MCS MIS 3002 and BS 7671 Section 712 sit relative to each other?",
    answer:
      "MCS MIS 3002 is the installer competence standard for solar PV — design competence, installation competence, commissioning competence, customer documentation. BS 7671 Section 712 is the electrical installation standard — what the wiring, protection and equipment selection must look like. They overlap in places (both require certain documentation) but they do different jobs. MCS MIS 3002 says the installer is competent to do the work. Section 712 says the work meets the wiring regs. A Section 712 inspection answers 'is this electrically safe and compliant?'. The MCS audit answers 'did a competent firm do it?'. You need both — and the customer needs both for Smart Export Guarantee and for warranty.",
  },
];

export default function Sub3() {
  const navigate = useNavigate();
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module2-section4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 4
          </button>

          <PageHero
            eyebrow="Module 2 · Section 4 · Subsection 3"
            title="Section 712 PV deep, ENA G98/G99 and anti-islanding"
            description="Section 712 of BS 7671:2018+A4:2026 was extensively revised — string protection routes, equipment voltage selection, enclosure ratings, IMDs, equipotential bonding and functional bonding conductor device ratings. ENA G98 and G99 set the grid-connection regime, and anti-islanding loss-of-mains protection keeps DNO engineers safe."
            tone="emerald"
          />

          <TLDR
            points={[
              "BS 7671:2018+A4:2026 Section 712 covers PV not connected, in parallel with, and as an alternative to the public distribution network. A4:2026 was an extensive revision.",
              "String OCPD selection follows Reg 712.433.102 — for arrays of more than two parallel sub-arrays, either no OCPD with cable Iz at least (N − 1) times Isc max, or fit OCPDs sized between 1.1 times Isc max and Iz.",
              "ENA G98 covers grid connection up to and including 16 A per phase per inverter — connect and notify within 28 days. G99 covers anything above and requires prior DNO approval.",
              "Anti-islanding (loss-of-mains protection) shuts the inverter down within sub-second timing on grid loss. It protects DNO engineers, prevents asynchronous reclosure, and stops a small generator trying to support a much larger network.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "State the relevant Building Regulations and other statutory and non-statutory requirements for the installation and maintenance of environmental technology systems (2365-03 Unit 301 / AC 2.1) — specifically BS 7671 Section 712, MCS MIS 3002 and ENA Engineering Recommendations G98 and G99.",
              "Provide information on the operational requirements and benefits of environmental technology systems (2357 Unit 312 ELTP02 / AC 3.1) — applied to grid-connected PV with anti-islanding and the engineering reasoning behind loss-of-mains protection.",
              "State the Local Authority Building Control requirements which apply to the installation of environmental technology systems (2357 Unit 602 ELTK02 / AC 3.3) — including the MCS / Building Regs notification chain for PV.",
              "Apply the string OCPD selection rules of Section 712 to a PV array of more than two parallel sub-arrays and identify which of the two compliance routes applies.",
              "Apply the Regulation 712.512.102 enclosure rating requirements (IP44 plus IK07) to outdoor PV equipment and reject installs that lack documented evidence of compliance.",
              "Distinguish between the ENA G98 'Connect and Notify' regime and the G99 approval regime for grid-connected PV inverters, and identify which applies based on inverter AC-side current rating per phase.",
              "Explain the function of anti-islanding loss-of-mains protection in a grid-connected PV inverter and the engineering reasons why it must operate within the timing windows defined by G98 / G99.",
            ]}
            initialVisibleCount={4}
          />

          <ContentEyebrow>Section 712 — what it is, what changed in A4:2026</ContentEyebrow>

          <ConceptBlock
            title="Section 712 covers every PV configuration you'll see in the UK"
            plainEnglish="BS 7671:2018+A4:2026 Section 712 is the electrical installation standard for solar photovoltaic power supply systems. Its scope deliberately captures every configuration — PV not connected to the public network (off-grid), PV in parallel with the public network (grid-tied), and PV as an alternative to the public network (private wire / direct supply). If electrical PV is the topic, Section 712 is the section."
            onSite="On site you treat Section 712 as additive to the general parts of BS 7671 — Parts 1 to 6 still apply, Section 712 layers PV-specific requirements on top. The MCS designer applies the section to the design; you, as the installer or verifier, apply it to the equipment, the wiring, the labelling and the test results. A4:2026 reorganised and expanded the section significantly — anyone working from a pre-A4 copy of BS 7671 is working from out-of-date guidance."
          >
            <p>
              The A4:2026 revision touches almost every part of Section 712. The clauses you
              are most likely to meet on site:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>712.2</strong> — table of functional bonding conductor automatic
                disconnecting device ratings (1 A under 25 kW, ascending to 5 A above 250 kW).
              </li>
              <li>
                <strong>712.412</strong> — protective measure of double or reinforced
                insulation on the DC side; acceptance criterion requires intact insulation
                verified before handover.
              </li>
              <li>
                <strong>712.414</strong> — SELV / PELV on the DC side, with measured Ugc
                limited to 120 V DC for SELV / PELV compliance.
              </li>
              <li>
                <strong>712.421</strong> — fire protection, with the acceptance criterion that
                no obvious ignition sources remain after installation.
              </li>
              <li>
                <strong>712.431 / 712.433</strong> — string protection rules and the two
                compliance routes for arrays of more than two parallel sub-arrays.
              </li>
              <li>
                <strong>712.433.103</strong> — PV array cable Iz (after correction) shall be
                at least the documented array maximum DC current.
              </li>
              <li>
                <strong>712.511</strong> series — module conformity (BS EN 61215 series),
                residential enclosures (BS EN 60670-24).
              </li>
              <li>
                <strong>712.512.102</strong> — outdoor enclosures shall meet IP44 (BS EN
                60529) and IK07 (BS EN 62262) as a minimum.
              </li>
              <li>
                <strong>712.534.102.1</strong> — SPD selection; Type 2 SPDs acceptable where
                no direct lightning protection or where separation distance s in BS EN 62305-3
                is observed.
              </li>
              <li>
                <strong>712.537.2.2.104 / .105</strong> — measures to prevent DC on-load
                interruption, and remote operation of devices for opening operation in
                combiner boxes.
              </li>
              <li>
                <strong>712.538.101</strong> — IMD selection per BS EN 61557-8.
              </li>
              <li>
                <strong>712.542.101</strong> — equipotential bonding of PV metal structures
                with continuity to earthing terminal demonstrable by test.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 712.512.102 (Enclosures for electrical equipment installed outdoors)"
            clause={
              <>
                <p className="mb-2">
                  Acceptance criterion (verbatim from bs7671_facets):
                </p>
                <p>
                  &quot;For acceptance on site, the enclosure shall be labelled or accompanied
                  by manufacturer documentation showing a degree of protection not less than
                  IP44 (BS EN 60529) and impact rating not less than 1K07 (BS EN 62262).
                  Absence of such evidence constitutes non-compliance with Regulation
                  712.512.102.&quot;
                </p>
              </>
            }
            meaning={
              <>
                IP44 (splash protection plus protection against tools and small objects 1 mm
                and over) and IK07 (a 2 J impact rating) is the floor for outdoor PV
                equipment. The acceptance criterion is documentary — labelling on the
                enclosure or manufacturer paperwork must evidence both ratings. Verbal
                assurance is not acceptance. A verifier confronted with neither shall record
                non-compliance under Section 712.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Reg 712.512.102 (verbatim acceptance criterion via bs7671_facets — IET Wiring Regulations 18th Edition A4:2026)."
          />

          <SectionRule />

          <ContentEyebrow>String OCPDs — the two compliance routes</ContentEyebrow>

          <ConceptBlock
            title="More than two parallel sub-arrays — pick route (a) or route (b)"
            plainEnglish="If a PV array has more than two parallel strings (sub-arrays) feeding a common DC bus, a fault on one string can be back-fed by the other strings. Section 712 gives two routes to cope. Route (a) — fit no string OCPDs but ensure each string cable can carry the worst-case reverse current (N − 1 strings backfeeding into one). Route (b) — fit per-string OCPDs sized between 1.1 times Isc max and the cable Iz. Either route is compliant; the design choice is usually about cable economics versus device cost."
            onSite="On a typical large commercial array with many strings, route (a) (oversized cable, no string fuses) becomes uneconomic quickly — every cable would have to carry many times Isc. Route (b) (per-string OCPDs in a combiner box) is the normal commercial answer. On small domestic two-string installs, Section 712 acceptance allows no OCPD because N is at most 2, removing the back-feed risk by definition. The acceptance facet captured in bs7671_facets makes this explicit — N at most 2 needs no string OCPDs."
          >
            <p>
              The numbers, made concrete with a worked example. Suppose N = 6 parallel
              strings each with Isc = 11 A, common DC bus, no string OCPDs:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Route (a) requirement</strong> — each string cable Iz at least
                (N − 1) times Isc max = 5 × 11 = 55 A continuous. That is well above the
                normal 11 A operating current of one string and forces a much larger
                cable than the operating current alone would suggest.
              </li>
              <li>
                <strong>Route (b) requirement</strong> — fit per-string OCPDs between 1.1 ×
                Isc max = 12.1 A and the cable Iz. A 15 A or 16 A PV string fuse (gPV) sits
                comfortably in that band and lets you size the cable to its normal operating
                current plus margin, not to the back-fed worst case.
              </li>
              <li>
                <strong>The 1.1 coefficient is not fixed</strong> — Reg 712.433.102(b)(ii)
                notes it shall be adapted upward for special module technologies or
                reflective conditions (snow, water, rooftop reflective surfaces). The
                designer documents the chosen coefficient and the rationale.
              </li>
              <li>
                <strong>Cable Iz includes all derate factors</strong> — temperature, grouping,
                installation method. Reg 712.433.103 acceptance criterion is that recorded
                Iz (corrected) is at least the recorded PV array maximum DC current.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 712.433.102 (Protection of PV strings, acceptance criterion verbatim)"
            clause={
              <>
                &quot;For PV arrays with N greater than 2 parallel sub-arrays, compliance is
                achieved by meeting one of two acceptance criteria from Reg. 712.433.102(b):
                (a) no OCPD and continuous cable current-carrying capacity Iz is at least
                (N − 1) times Isc max, or (b) fit OCPDs with rated current I satisfying
                1.1 times Isc max less than I and I at most Iz. Either criterion shall be
                used to demonstrate compliance.&quot;
              </>
            }
            meaning={
              <>
                The two-route framing is deliberate — designers have a genuine choice between
                heavier cable with no devices, or lighter cable with per-string OCPDs.
                Acceptance on site requires evidence of which route was chosen and that the
                relevant numerical condition is met. A verifier should reject any array of
                N greater than 2 that meets neither route — that is the most common Section
                712 non-compliance you will encounter on inspection.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Reg 712.433.102 (verbatim acceptance criterion via bs7671_facets — IET Wiring Regulations 18th Edition A4:2026)."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Equipment selection — voltage, IMD, bonding</ContentEyebrow>

          <ConceptBlock
            title="Uoc max and Upc max set the floor for every DC-side rating"
            plainEnglish="DC voltage on a PV string rises in cold weather. The open-circuit voltage of a silicon module increases as cell temperature falls — typical figures around 0.3 to 0.4 percent per degree Celsius below 25 degrees. On a frosty UK morning a string rated 600 V Uoc at STC can hit 680 to 720 V before the inverter starts pulling current. Every piece of DC-side equipment — cable, isolator, fuse, combiner, inverter input — must be rated for Uoc max at the lowest expected ambient. Equipment underrated for that worst case is non-compliant under Reg 712.512.1.1 and is a real-world cause of arc faults and fires."
            onSite="On Section 712 acceptance you check the labels on every DC-side device against the Uoc max calculation in the design pack. If the design pack says Uoc max = 720 V and the DC isolator label says 600 V DC, the isolator is non-compliant regardless of what the installer says about it usually being fine. The acceptance facet captured in bs7671_facets is direct — equipment voltage ratings shall be at least Uoc max (considered nominal) and Upc max determined per Reg 712.433.101.1."
          >
            <p>
              Three other equipment-selection rules from Section 712 worth committing to
              memory:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>PV module conformity</strong> — Reg 712.511.101 requires modules to
                comply with the relevant electrical equipment standard. Acceptance is by
                documentary evidence of compliance with BS EN 61215 series (or equivalent).
                No certificate, no acceptance.
              </li>
              <li>
                <strong>Residential enclosures</strong> — Reg 712.511.103 acceptance route
                allows compliance with BS EN 60670-24 for residential premises enclosures
                with documented evidence.
              </li>
              <li>
                <strong>IMD selection</strong> — Reg 712.538.101 requires any IMD provided
                to be selected per BS EN 61557-8. Documentary evidence required for
                acceptance — no evidence, non-compliant.
              </li>
              <li>
                <strong>SPD selection</strong> — Reg 712.534.102.1 acceptance route allows
                Type 2 SPDs where direct lightning protection is not specified, or where
                separation distance s per BS EN 62305-3 is observed. Otherwise Type 1
                SPDs are required.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Equipotential bonding of PV metal structures — continuity must be measurable"
            plainEnglish="The frames, rails, fixings and roof penetrations holding a PV array together are metallic and they need to be brought into the property's earthing arrangement. Reg 712.542.101 requires continuity of the bonding conductor from those metallic structures to a chosen suitable earthing terminal, demonstrable by test. The intent is that any fault current finding its way onto the array structure has a low-impedance return to earth and any RCD or overcurrent protection upstream operates within its required time."
            onSite="The acceptance test is a continuity measurement showing low resistance, plus a visual confirmation of a secure permanent connection. On a typical domestic install the bonding conductor lands on the inverter earth terminal or on a dedicated earthing terminal at the AC isolator — the design pack will specify. On larger commercial installs the bonding scheme can be more elaborate (separate earthing electrode for the array, multiple bonding conductors). Either way, the test result and the visual go on the certification."
          >
            <p>
              Things that go wrong with PV array bonding and how to spot them:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Aluminium-on-stainless interface corrosion</strong> — bonding lugs
                bolted directly to aluminium rails without an anti-corrosion paste fail
                continuity over a few winters as oxide builds up. Reseal or replace.
              </li>
              <li>
                <strong>Single-point bonding on long rail runs</strong> — long aluminium
                rails sometimes rely on one bonding lug at one end, with the rail joints
                providing the rest of the path. Joints can corrode. Multiple bonding points
                are safer.
              </li>
              <li>
                <strong>Roof-tile clip continuity</strong> — some installation methods use
                tile-hook clips that are themselves part of the bonding path. Verify the
                continuity test covers the full route.
              </li>
              <li>
                <strong>Lightning protection coordination</strong> — if the building has a
                BS EN 62305 lightning protection system, the PV bonding must coordinate with
                it (separation distance s, or bonding to the LPS earth where separation
                cannot be achieved).
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 712.538.101 (IMD selection per BS EN 61557-8)"
            clause={
              <>
                Acceptance criterion (verbatim): &quot;Where an IMD is provided but cannot be
                shown to be selected in accordance with BS EN 61557-8 (no documentation,
                marking or declaration of conformity), the installation does not meet the
                requirement of Regulation 712.538.101 and should be treated as non-compliant
                until evidence of conformity is produced.&quot;
              </>
            }
            meaning={
              <>
                Insulation Monitoring Devices detect insulation degradation on the DC side
                before it becomes a hazard. Section 712 requires their use in defined
                configurations (the section itself sets when an IMD is required). Where
                fitted, the device shall be selected to BS EN 61557-8 — the product standard
                for IMDs. Documentary evidence of conformity is the acceptance test on site.
                Verbal assurance is not enough.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Reg 712.538.101 (verbatim acceptance criterion via bs7671_facets — IET Wiring Regulations 18th Edition A4:2026)."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>ENA G98 and G99 — the grid-connection regime</ContentEyebrow>

          <ConceptBlock
            title="G98 connect-and-notify versus G99 prior-approval"
            plainEnglish="Distribution Network Operators (DNOs) need to know what is being connected to their network. The Energy Networks Association (ENA) Engineering Recommendations G98 and G99 set the framework for embedded generators (including PV inverters). G98 covers small generators up to and including 16 A per phase per inverter — the installer connects, then notifies the DNO within 28 days. G99 covers everything larger and requires the DNO to approve the design before any connection is made. The threshold drove the legacy G83 to G98 transition and the G59 to G99 transition in the late 2010s."
            onSite="On a typical domestic PV install with a single-phase inverter rated 16 A or under, G98 applies — the MCS installer connects the system, commissions it, and sends the G98 notification form to the DNO within 28 days. The form goes via the ENA Connect Direct portal or directly to the DNO. On larger systems (commercial PV, three-phase inverters over 16 A per phase, multiple-inverter sites that aggregate over the threshold) G99 applies — the design and the inverter type-test certificates go to the DNO first, the DNO issues a connection agreement, and only then can the work proceed."
          >
            <p>
              Practical points the L3 electrician needs to recognise:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Aggregation matters</strong> — multiple G98 inverters on one site
                can aggregate above the threshold and trip the install into G99 territory.
                The DNO will tell you on application; do not assume.
              </li>
              <li>
                <strong>Type-test certificates are inverter-specific</strong> — every
                inverter sold for UK grid connection should hold a current G98 or G99
                type-test certificate. The MCS installer references the certificate on the
                notification form. No certificate, no compliant connection.
              </li>
              <li>
                <strong>The DNO can require disconnection</strong> if a system is
                connected without notification or against an unapproved design. That
                disconnection right is in the connection conditions; it is not a soft
                request.
              </li>
              <li>
                <strong>Smart Export Guarantee depends on it</strong> — the customer cannot
                receive SEG payments without the G98 / G99 paperwork on file with the DNO
                and the supplier.
              </li>
              <li>
                <strong>Three-phase domestic is increasingly common</strong> — high-power
                EV chargers and heat pumps are pushing more domestic supplies onto
                three-phase, and three-phase PV inverters of any capacity must be checked
                against the G98 or G99 threshold per phase.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="The notification form and what goes on it"
            plainEnglish="The G98 'Installation Document' captures the basic data the DNO needs to update its network records — site address, MPAN, customer name, installer name and accreditation number, inverter make and model, type-test certificate reference, total installed capacity (kW AC), commissioning date, plus any battery storage details where present. The form is short by design — G98 is the streamlined route. The G99 application is much longer because the DNO has to assess the impact on the network."
            onSite="As an apprentice on an MCS install you will not normally fill in the notification form, but you will be present for the data capture — meter serial numbers, inverter labels, RCBO ratings, isolator ratings. Get into the habit of taking clear photos of every label as you commission. The MCS installer needs them for the notification form, the MCS audit trail and the customer's handover pack. On a G99 install the documentation chain is more demanding — single-line diagrams, protection settings, type-test certificates, witness-test records — and you may be asked to support the design and witness-test process."
          >
            <p>
              Documentation that should be in the customer handover pack on every PV
              install:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Electrical Installation Certificate (EIC)</strong> — covers the
                electrical install per BS 7671 including the Section 712 verification.
              </li>
              <li>
                <strong>MCS certificate</strong> — issued by the MCS installer to the
                customer, evidence of MCS-certified installation.
              </li>
              <li>
                <strong>G98 or G99 notification</strong> — copy of the form sent to the DNO
                with confirmation of receipt.
              </li>
              <li>
                <strong>SAP / yield estimate</strong> — the MCS-calculated annual energy
                yield (kWh per year) that informed the customer's purchasing decision.
              </li>
              <li>
                <strong>Manufacturer documentation</strong> — module datasheets, inverter
                manual, battery manual where present, all warranties.
              </li>
              <li>
                <strong>Maintenance schedule</strong> — recommended periodic inspection and
                cleaning intervals.
              </li>
              <li>
                <strong>Building Regs / Building Control evidence</strong> — Part P
                notification (England and Wales) or relevant local authority confirmation.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="ENA Engineering Recommendation G98 — connect-and-notify regime"
            clause={
              <>
                G98 applies to embedded generators connected in parallel with the
                low-voltage public distribution network where the total installed capacity
                is up to and including 16 A per phase per inverter. The installer connects
                the system on commissioning and notifies the DNO within 28 days using the
                standard G98 Installation Document. No prior DNO approval is required for
                G98 connections.
              </>
            }
            meaning={
              <>
                G98 is a streamlined regime that recognises the engineering case — small
                inverters with type-test certificates have a known impact on the network
                and do not need bespoke approval. The 28-day notification keeps the DNO's
                records current. Crossing the 16 A per phase threshold (or aggregating
                multiple inverters above it) escalates the project to G99, which requires
                prior approval and a connection agreement before any work begins on site.
              </>
            }
            cite="Source: ENA Engineering Recommendation G98 (paraphrased) — published by the Energy Networks Association; available via ena.org.uk."
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Anti-islanding — loss-of-mains protection</ContentEyebrow>

          <ConceptBlock
            title="Loss-of-mains protection keeps DNO engineers safe"
            plainEnglish="When the public distribution network fails (a transformer trip, a downed line, a substation fault), engineers go out to repair it. They need the network they are working on to be dead. A small PV inverter still pushing power onto a section of network that the DNO has isolated creates an 'island' — a small piece of energised network where everyone reasonably believes the supply is off. That is dangerous. Anti-islanding protection (loss-of-mains protection in engineering language) makes every grid-tied inverter detect the loss of grid reference and shut itself down within sub-second timing, before anyone touches a conductor expecting it to be dead."
            onSite="Modern inverters with G98 or G99 type-test certificates use multiple detection methods in combination — voltage and frequency window detection (the inverter trips if the AC voltage or frequency moves outside the configured band), vector shift detection (the inverter trips on a sudden phase angle change consistent with grid loss), and rate-of-change-of-frequency or RoCoF detection (the inverter trips on a fast frequency excursion). The G99 type test verifies each method against the published thresholds. On site you see this as the inverter's grid-protection settings — readable from the inverter display, recorded on the commissioning sheet, never to be loosened without DNO agreement."
          >
            <p>
              Why anti-islanding cannot be turned off, even when the customer asks:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>DNO engineer safety</strong> — the primary case. The Electricity
                Safety, Quality and Continuity Regulations 2002 place safety duties on the
                DNO and on anyone connecting generation to the network.
              </li>
              <li>
                <strong>Asynchronous reclosure damage</strong> — when the DNO restores the
                network, an island that has drifted out of phase will smash equipment when
                it reconnects. Anti-islanding stops the island forming in the first place.
              </li>
              <li>
                <strong>Quality of supply for other customers</strong> — a small inverter
                trying to support an islanded network cannot maintain proper voltage and
                frequency for other customers' equipment. Damage to neighbours' kit follows.
              </li>
              <li>
                <strong>Connection conditions</strong> — every G98 or G99 connection
                agreement requires the inverter to remain compliant with the type-test
                settings. Tampering breaches the agreement and the DNO can require
                disconnection.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Hybrid inverters can run through a power cut — but only by isolating first"
            plainEnglish="Customers often want their PV system to keep their lights on through a power cut. A standard grid-tied inverter cannot do this — anti-islanding shuts it down. The route to power-cut operation is a hybrid inverter (PV plus battery plus mains, with explicit islanded-mode capability) and a transfer arrangement that first electrically isolates the property from the failed grid before re-energising selected circuits as a self-contained micro-grid. The MCS designer specifies which loads stay alive, the battery sizing, the inverter rating and the transfer time."
            onSite="On a hybrid install you will see the changeover arrangement clearly in the design pack — typically a mechanical or contactor-based transfer that opens between the property's incoming supply and the inverter's AC output. When grid voltage is detected as healthy the transfer is closed and the inverter exports normally. When grid is lost the transfer opens, the inverter switches to island mode (it now provides the voltage and frequency reference itself), and the chosen circuits stay alive on inverter and battery. When grid is restored the inverter resyncs, the transfer recloses, and grid-tied operation resumes. Section 712 still applies in full — and the design must coordinate with G98 / G99 because the hybrid inverter still needs LoM-compliant grid-tied behaviour when the grid is up."
          >
            <p>
              Three things to verify on a hybrid install during commissioning:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Transfer time and behaviour</strong> — simulate a grid loss
                (typically by opening the supply isolator) and confirm the inverter
                transitions to island mode within the design specification. Confirm the
                circuits intended to stay alive do, and that circuits intended to drop
                actually drop.
              </li>
              <li>
                <strong>Resync and reclose</strong> — restore the grid and confirm the
                inverter resyncs cleanly, the transfer recloses without nuisance, and
                grid-tied export resumes within the expected time.
              </li>
              <li>
                <strong>Battery state-of-charge management</strong> — the inverter should
                not deplete the battery to zero in island mode if the customer needs the
                battery for grid-tied time-shifting once the supply returns. Verify the
                MCS-designed reserve.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="ENA Engineering Recommendation G99 — loss-of-mains protection (summary of intent)"
            clause={
              <>
                G99 sets out the loss-of-mains protection requirements for embedded
                generators connected to the public distribution network. Generators shall
                cease to export within the timing windows defined by the type-test regime
                when grid reference is lost. Methods include voltage and frequency window
                detection, vector shift detection, and rate-of-change-of-frequency
                detection. Settings shall remain at type-tested values; alteration without
                DNO agreement is a breach of the connection conditions.
              </>
            }
            meaning={
              <>
                The combined effect of G98 and G99 LoM requirements is that no
                grid-connected inverter may continue to export onto a section of network
                that has lost its supply reference. The engineering reasons are operational
                safety (DNO engineers), equipment safety (asynchronous reclosure), and
                quality of supply (other customers). The regulations make LoM a non-optional
                feature of every grid-tied inverter sold for the UK market.
              </>
            }
            cite="Source: ENA Engineering Recommendation G99 (paraphrased) — published by the Energy Networks Association; available via ena.org.uk."
          />

          <SectionRule />

          <ContentEyebrow>The MCS chain — design, install, certify</ContentEyebrow>

          <ConceptBlock
            title="MCS MIS 3002 sits alongside Section 712 and the ENA EREC framework"
            plainEnglish="The Microgeneration Certification Scheme (MCS) is the UK's quality assurance scheme for small-scale renewable energy systems. MIS 3002 is the installer competence standard for solar PV — design competence, installation competence, commissioning competence, customer documentation. MCS MIS 3002, BS 7671 Section 712 and ENA G98 / G99 form a three-leg stool. MCS proves the firm is competent. Section 712 sets the electrical standard. G98 / G99 sets the grid-connection regime. All three apply to every MCS PV install and the customer needs all three to access Smart Export Guarantee tariffs."
            onSite="Most domestic PV in the UK goes through an MCS-certified installer because that is the route to SEG payments and to most of the available finance. As an L3 electrician working for an MCS firm you operate within the MIS 3002 process — pre-install survey, design pack, install, commissioning, documentation. The firm's internal QA system audits a sample of installs against MIS 3002, and the MCS audit body audits the firm. Working outside MCS is technically possible but the customer loses access to SEG and many finance routes, so it is rare on domestic work."
          >
            <p>
              The documentation chain on a typical MCS PV install:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Site survey</strong> — pitch, azimuth, shading, roof structural
                assessment, existing electrical infrastructure.
              </li>
              <li>
                <strong>Design pack</strong> — module layout, string design, inverter
                selection, cable schedule, Uoc max calculation, OCPD selection, bonding
                arrangement, single-line diagram.
              </li>
              <li>
                <strong>SAP yield estimate</strong> — the kWh per year prediction the
                customer is buying.
              </li>
              <li>
                <strong>Quotation</strong> — capital, payback, expected SEG income.
              </li>
              <li>
                <strong>Install records</strong> — install photos, label photos, test
                results, EIC.
              </li>
              <li>
                <strong>Commissioning records</strong> — inverter settings, grid-protection
                settings, hand-over checklist.
              </li>
              <li>
                <strong>Notification</strong> — G98 or G99 to the DNO, Part P (England and
                Wales) to Building Control, MCS certificate to customer.
              </li>
              <li>
                <strong>Handover pack</strong> — full documentation given to the customer.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Underrated DC isolators on cold-morning Uoc max"
            whatHappens={
              <>
                A 600 V DC isolator is fitted on a string with a calculated Uoc max of 720 V
                at the lowest expected ambient. The installer claims it has been fine for
                months. On the first frosty morning the array open-circuit voltage exceeds
                the isolator rating, the dielectric strength of the isolator is overstressed,
                and an arc develops. The result is a fire risk, an inverter trip, and a
                non-compliance under Reg 712.512.1.1 that should have been caught at design
                stage.
              </>
            }
            doInstead={
              <>
                Always check DC equipment voltage labels against the design pack Uoc max
                calculation, not against the array nameplate STC voltage. STC is at 25
                degrees Celsius cell temperature; UK winter ambients drop well below that
                and Uoc rises proportionally. The MCS designer calculates Uoc max with the
                cold coefficient. The installer and verifier check the labels. A 1000 V DC
                rated chain is standard on most modern domestic installs.
              </>
            }
          />

          <CommonMistake
            title="No string OCPDs on a multi-string array, no oversized cable either"
            whatHappens={
              <>
                A six-string array is installed without per-string OCPDs and with cables
                sized to the operating current of one string (around 11 A). Section 712
                offers two compliance routes — neither is met. Route (a) demands cable Iz of
                at least (N − 1) times Isc max, which here would be 55 A. Route (b) demands
                per-string OCPDs sized between 1.1 times Isc max and Iz, which were not
                fitted. The install is non-compliant and a single-string fault can back-feed
                from the other strings into the cable in a way the cable cannot safely carry.
              </>
            }
            doInstead={
              <>
                For any array of more than two parallel sub-arrays, work the two routes at
                design stage and pick one explicitly. Route (b) (per-string OCPDs in a
                combiner box) is the normal commercial answer on larger arrays — lighter
                cable, modest device cost, clean compliance. Route (a) is occasionally
                economic on small arrays with short cable runs. Document the choice on the
                certification.
              </>
            }
          />

          <Scenario
            title="Domestic 5 kWp single-phase install, frosty morning commissioning"
            situation={
              <>
                You are commissioning a domestic 5 kWp PV array on a single-phase 16 A
                inverter, two strings of 8 modules each (N at most 2 — no string OCPDs
                needed under Reg 712.431.101 acceptance). The MCS designer's Uoc max
                calculation says 690 V at the design lowest ambient. The fitted DC isolator
                is rated 1000 V DC. The array is on a south-facing pitched tile roof with no
                shading. Inverter is G98 type-test certified and labelled accordingly. You
                arrive at 7am, frost on the panels, and the inverter is showing 685 V DC
                open-circuit on the string display.
              </>
            }
            whatToDo={
              <>
                Start with the document check — design pack present, MCS certificate ready
                to issue, EIC template open. Work the Section 712 acceptance checklist —
                module conformity certificates (Reg 712.511.101), enclosure ratings IP44
                plus IK07 (Reg 712.512.102), DC isolator voltage rating against design Uoc
                max (1000 V at most 690 V — pass), bonding continuity test on the array
                metalwork (Reg 712.542.101 — measure, record), insulation resistance of the
                DC side per Reg 712.412 acceptance, fire-protection visual (Reg 712.421 — no
                obvious ignition sources). Read the inverter grid-protection settings and
                confirm they match the G98 type-test values. Commission the inverter,
                confirm export onto the grid, watch the LoM operation by simulating a grid
                trip via the AC isolator and confirming the inverter ceases export within
                the design timing. Sign the EIC, issue the MCS certificate, prepare the G98
                notification form, photograph every label and every test reading, hand the
                customer the handover pack.
              </>
            }
            whyItMatters={
              <>
                The frosty 685 V open-circuit reading is exactly the scenario Section 712 is
                designed to catch. A 600 V DC isolator on this string would have failed the
                test on day one of operation. The 1000 V DC isolator passes by a wide
                margin. The two-string configuration is the easy compliance route — N at
                most 2 needs no string OCPDs by Reg 712.431.101 acceptance. The G98
                notification keeps the customer's SEG entitlement alive. Section 712 plus
                MCS plus G98 work together as a single coherent quality regime, and the
                customer gets a paper trail that survives any future audit.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "BS 7671:2018+A4:2026 Section 712 covers PV not connected, in parallel with, or as an alternative to the public distribution network. The A4:2026 revision was extensive.",
              "String OCPD selection on arrays of more than two parallel sub-arrays follows Reg 712.433.102 — either no OCPD with Iz at least (N − 1) times Isc max, or fit OCPDs sized between 1.1 times Isc max and Iz.",
              "Outdoor PV equipment enclosures must meet IP44 (BS EN 60529) and IK07 (BS EN 62262) per Reg 712.512.102 — labelling or documentation is required for acceptance.",
              "DC equipment voltage ratings must be at least Uoc max (calculated at lowest expected ambient) and Upc max per Reg 712.512.1.1 — not the STC Uoc.",
              "Insulation Monitoring Devices, where fitted, shall be selected to BS EN 61557-8 per Reg 712.538.101 with documentary evidence on site.",
              "ENA G98 covers grid connection up to and including 16 A per phase per inverter — connect and notify within 28 days. G99 covers anything above and requires prior DNO approval.",
              "Anti-islanding (loss-of-mains protection) is non-optional on every grid-tied inverter — it protects DNO engineers, prevents asynchronous reclosure, and stops a small inverter trying to support a much larger network.",
              "MCS MIS 3002, Section 712 and ENA G98 / G99 form a three-leg stool — together they certify a competent firm, a compliant electrical install, and an authorised grid connection.",
            ]}
          />

          <Quiz title="Section 712 PV deep, G98/G99 and anti-islanding — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module2-section4-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                4.2 BS 7671 712/722/753 + ENA G98/G99
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module2-section4-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                4.4 Section 722 EV + Open-PEN + 722.411.4
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
