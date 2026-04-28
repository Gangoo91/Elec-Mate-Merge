/**
 * Module 2 · Section 5 · Subsection 4 — Commissioning paperwork chain for renewables
 * City & Guilds 2365-03 / Unit 301 / LO3 (commissioning) — extended overview
 *
 * Layered depth:
 *   2357 Unit 312 ELTP02 / AC 1.1 — workplace procedures for safe handling, storage and
 *                                   disposal of hazardous materials and products.
 *   2357 Unit 602 ELTK02 / AC 3.1 — operating principles + handover information.
 *
 * This Sub walks the full commissioning paperwork chain a renewables install drops on
 * the apprentice's desk on handover day — DNO notification (G98 / G99), MCS certificate
 * (and MCS Code 4.0 customer-facing duties), the Electrical Installation Certificate,
 * manufacturer commissioning records, and the customer handover pack itself. Detailed
 * design competence remains MCS-track (2399 / 2919 / 2921); this Sub gives the L3
 * electrician the paperwork map.
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
  'Commissioning paperwork chain for renewables (5.4) | Level 3 Module 2.5.4 | Elec-Mate';
const DESCRIPTION =
  "The paperwork chain a renewables install generates on handover day — ENA G98 or G99 DNO notification, MCS certificate, MCS Code 4.0 customer duties, the Electrical Installation Certificate under BS 7671, manufacturer commissioning records, and the handover pack itself. What each document is for, who issues it, and where the L3 electrician's signature lives.";

const checks = [
  {
    id: 'l3-m2-s5-sub4-g98-g99',
    question:
      "A customer is having a 5 kWp single-phase PV array fitted with a 5 kW inverter. Which DNO notification framework applies and when does the paperwork need to be submitted?",
    options: [
      "Neither — domestic PV is exempt from notification.",
      "ENA Engineering Recommendation G98 applies — generation up to and including 16 A per phase per inverter is a fit-and-inform connection. The MCS-certified installer must notify the DNO within 28 days of energising the system, using the standard G98 notification form, including site details, inverter make / model / capacity, type-test reference and the installation date. The DNO does not need to consent before energisation under G98 (that's the difference vs G99). The MCS certificate, the EIC and the G98 notification together unlock the Smart Export Guarantee application with the customer's electricity supplier.",
      "ENA G99 always applies regardless of size — the customer must wait for DNO approval for months before the inverter can be switched on.",
      "Building Regs only — DNOs have no involvement.",
    ],
    correctIndex: 1,
    explanation:
      "G98 is the fit-and-inform regime for inverters up to 16 A per phase per inverter (~3.68 kW per phase, so up to ~11 kW on three-phase). G99 is the apply-to-connect regime for larger systems — the DNO must accept the application before energisation. The 28-day post-energisation notification under G98 is non-negotiable; missing it is a breach of the Distribution Connection and Use of System Agreement (DCUSA) and can void the customer's export tariff. The MCS-certified installer carries the duty.",
  },
  {
    id: 'l3-m2-s5-sub4-mcs-cert',
    question:
      "Why does the customer need an MCS certificate as well as an Electrical Installation Certificate?",
    options: [
      "They don't — the EIC is enough on its own.",
      "Different documents, different jobs. The Electrical Installation Certificate (BS 7671 model form) certifies the electrical installation as compliant with the wiring regulations. The MCS certificate (issued via the Microgeneration Certification Scheme) certifies that the renewable installation has been designed, installed and commissioned by an MCS-certified installer to the relevant MIS standard (MIS 3002 for PV, MIS 3005 for heat pumps, MIS 3007 for biomass etc.) and to the MCS Installation Standards. The MCS certificate is what unlocks the Smart Export Guarantee, the Boiler Upgrade Scheme grant, and the consumer-protection backing under the MCS Code 4.0. Without it the customer can't claim grants or export payments.",
      "MCS only certifies the panels, not the install.",
      "MCS is purely cosmetic and has no legal weight.",
    ],
    correctIndex: 1,
    explanation:
      "The two certificates sit alongside each other and serve different purposes. The EIC is the BS 7671 electrical compliance document the L3 electrician signs. The MCS certificate is the design-and-install quality mark plus the consumer-protection wrapper. Smart Export Guarantee suppliers, Boiler Upgrade Scheme administrators and most insurers will not accept a renewable install that lacks an MCS certificate — it's the gate to the financial and consumer-protection benefits.",
  },
  {
    id: 'l3-m2-s5-sub4-handover-pack',
    question:
      "A customer phones six months after their heat pump install asking for the SCOP figure their installer quoted. The handover pack should already contain it — but where exactly?",
    options: [
      "Nowhere — SCOP is internal to the installer.",
      "Inside the MCS heat-loss calculation document and the MCS performance estimate that the MCS-certified installer is required to provide at handover under MIS 3005. The handover pack should also contain the manufacturer's commissioning record (with measured flow, return, ambient and instantaneous COP at commissioning conditions), the EIC, the G98 / G99 notification, the user instructions, the warranty paperwork, the F-Gas record (if applicable to the refrigerant fill), and the maintenance schedule. The MCS Code 4.0 makes the handover pack contents a customer-facing duty — the installer is contractually bound to hand over a complete, signed pack on the day, not weeks later.",
      "Only on the inverter — the customer should climb into the loft to check.",
      "On the box the heat pump arrived in.",
    ],
    correctIndex: 1,
    explanation:
      "The MCS Code 4.0 (effective 2023) reorganised the customer-facing handover obligations into a single defined pack. SCOP is one of the headline numbers customers ask about — and the MCS estimate document is where it lives. The handover pack also serves as the customer's evidence base if they ever need to invoke the MCS consumer-protection process, switch installers for service, or claim under warranty.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "Which ENA Engineering Recommendation governs the connection of a small single-phase domestic PV inverter (≤16 A per phase) to the public distribution network?",
    options: [
      "G83 — withdrawn and replaced.",
      "G98 — the fit-and-inform regime for generation up to and including 16 A per phase per inverter. The installer notifies the DNO within 28 days of energisation. The inverter must be type-tested to G98 / EREC G99 compliance and the model / type-test number recorded on the notification.",
      "G88 — applies only to wind turbines.",
      "G77 — applies only to commercial three-phase generation.",
    ],
    correctAnswer: 1,
    explanation:
      "G98 (in force from 2018, replacing G83) is the fit-and-inform standard for small generators up to 16 A per phase. G99 covers larger systems and requires DNO acceptance before energisation. The L3 electrician needs to recognise the G98 / G99 split and where each applies; the DNO notification itself is the MCS-certified installer's duty.",
  },
  {
    id: 2,
    question:
      "What is the MCS Code 4.0?",
    options: [
      "A wiring colour code for renewables.",
      "The current Microgeneration Certification Scheme consumer code, in force from 2023, that sets out the contractual and consumer-protection duties of an MCS-certified installer toward the end customer. It covers pre-contract information, contract terms, deposit protection, performance estimates, the handover pack, complaints handling, and post-installation aftercare. It is backed by the MCS-approved alternative dispute resolution provider, currently RECC or HIES depending on installer membership.",
      "A grid frequency standard.",
      "An optional marketing badge with no contractual weight.",
    ],
    correctAnswer: 1,
    explanation:
      "MCS Code 4.0 replaced earlier versions in 2023 and tightened the customer-facing duties significantly. Every MCS-certified installer signs up to it as a condition of certification. As an apprentice on an MCS site you should recognise that the Code is a real contractual document driving how the install is documented and handed over — it is not a marketing label.",
  },
  {
    id: 3,
    question:
      "What are the headline contents of a complete renewables handover pack under MCS Code 4.0?",
    options: [
      "Just the receipt.",
      "MCS certificate; Electrical Installation Certificate (BS 7671); G98 or G99 DNO notification copy; manufacturer commissioning record(s); MCS performance estimate (SCOP, kWh / kWp / yr, payback, etc.); warranty documentation for all major components; user instruction manuals; maintenance schedule and service intervals; F-Gas record (where refrigerant work was carried out); contact details for fault reporting; and the MCS Code complaints process. Pack is provided in physical or durable digital form on handover day.",
      "Only the wiring diagram.",
      "Only a verbal briefing on the doorstep.",
    ],
    correctAnswer: 1,
    explanation:
      "The MCS Code 4.0 makes the contents of the handover pack a defined, auditable list — not the installer's discretion. The pack also serves as the customer's evidence base if they need to invoke MCS consumer protection, switch installers for ongoing service, or claim under warranty. As the L3 electrician on the install team you may be asked to gather your slice of it (the EIC, your test records, signage notes) and feed it to the MCS lead for assembly.",
  },
  {
    id: 4,
    question:
      "Why is the manufacturer's commissioning record kept in the handover pack alongside the EIC?",
    options: [
      "It isn't — the EIC replaces it.",
      "Because they certify different things. The EIC certifies the electrical installation against BS 7671. The manufacturer commissioning record certifies the equipment itself was started up and configured to the manufacturer's specified parameters — flow temperature, pump speed, weather compensation curve, refrigerant charge weight, inverter limits, network export-limitation settings, software firmware version. Manufacturer warranty cover usually requires evidence of correct commissioning and typically references this record. Without it the warranty defaults; without the EIC the BS 7671 compliance line is broken.",
      "It is only kept by the manufacturer, never the customer.",
      "It is purely decorative.",
    ],
    correctAnswer: 1,
    explanation:
      "The two records cover complementary domains and the warranty position usually depends on both. Heat pump and inverter manufacturers in particular treat commissioning records as a precondition of warranty cover — skipped or undocumented commissioning is a common reason for warranty claims being rejected years later.",
  },
  {
    id: 5,
    question:
      "Which document unlocks the Smart Export Guarantee tariff for a domestic PV customer?",
    options: [
      "The receipt only.",
      "The MCS certificate, accompanied by the G98 (or G99) DNO notification copy. The customer applies to a Smart Export Guarantee licensee (typically a major electricity supplier) and uploads both. Without the MCS certificate the supplier will not register the customer for export payments. The smart export meter (the customer's existing smart meter, usually) provides the half-hourly export data that the tariff is paid against.",
      "A Building Regs certificate, on its own.",
      "Nothing is needed beyond the install itself.",
    ],
    correctAnswer: 1,
    explanation:
      "The Smart Export Guarantee was introduced in 2020 and replaced the Feed-in Tariff for new installations. Eligibility for SEG payments is gated on MCS certification (or equivalent quality assurance scheme). The L3 electrician on the install does not handle the application itself — but should recognise that the certificate the customer signs receipt for is what unlocks the financial benefit.",
  },
  {
    id: 6,
    question:
      "What is recorded on the EIC for the renewable circuit specifically that wouldn't be on a normal final-circuit EIC?",
    options: [
      "Nothing different.",
      "The EIC carries the standard schedule of inspections and schedule of test results for the new circuit(s). For a PV install that includes the DC string circuits (with DC voltages and DC IR test results), the AC isolator and AC final connection back into the consumer unit, the labelling and signage at every isolation point, and the dual-supply warning at the consumer unit. Section 712 of BS 7671 (extensively revised in A4:2026) drives the inspection items. The 'designer' / 'constructor' / 'inspector and tester' boxes on the EIC may all be the MCS-certified installer's lead engineer; signatures still have to be physically present.",
      "Only the colour of the cable.",
      "Only the customer's address.",
    ],
    correctAnswer: 1,
    explanation:
      "BS 7671 EIC and the schedules behind it are the universal electrical compliance document. For renewables the schedules pick up the special inspections mandated by Section 712 (PV) / Section 722 (EV) / Section 753 (heat pumps embedded in floors). The L3 electrician carrying out the inspection and test is the person whose signature carries the regulatory weight — even on an MCS-led install.",
  },
  {
    id: 7,
    question:
      "What does an F-Gas record look like and when is it issued?",
    options: [
      "It isn't issued — refrigerants are unregulated.",
      "An F-Gas log entry recording the refrigerant type, the charge weight added or removed, the date, and the F-Gas-certified engineer's name and certificate number. The engineer logs the entry in their own F-Gas register and provides a copy or extract to the customer / installer for the handover pack. Required at every refrigerant transaction (initial commissioning charge, top-up, recovery at decommissioning). Required by the F-Gas Regulations and central to demonstrating compliance during any future enforcement check.",
      "Only a sticker on the unit.",
      "A verbal note only.",
    ],
    correctAnswer: 1,
    explanation:
      "The F-Gas record chain is the legal audit trail for fluorinated refrigerants. The L3 electrician does not handle the refrigerant — that is the F-Gas-certified engineer's role — but the record produced does form part of the customer's handover pack and is referenced again at every annual service and at decommissioning. Missing records typically void the manufacturer warranty.",
  },
  {
    id: 8,
    question:
      "Who carries the legal duty to submit the G98 / G99 notification to the DNO?",
    options: [
      "The customer.",
      "The MCS-certified installer (or, for non-MCS installs, the contractor energising the system). The duty is set out in the Distribution Connection and Use of System Agreement (DCUSA) and is enforced via the licensee framework Ofgem oversees. Failure to notify is a breach of the connection conditions and can result in disconnection and loss of any export tariff. As an apprentice you do not sign the notification — but you should recognise that on the install team the duty has a named owner and a 28-day clock from energisation.",
      "The DNO itself.",
      "Nobody — it is voluntary.",
    ],
    correctAnswer: 1,
    explanation:
      "DCUSA is the contractual framework binding generators, suppliers and DNOs together. Notification under G98 (or pre-energisation acceptance under G99) is a DCUSA obligation on the installer / generator. The MCS-certified installer's procedures should make the 28-day deadline an automatic step on every PV / battery / wind install.",
  },
];

const faqs = [
  {
    question: "Is the EIC enough on its own for a renewables install or do I always need the MCS certificate too?",
    answer:
      "EIC certifies BS 7671 compliance for the electrical work. MCS certifies that an MCS-approved installer designed, installed and commissioned the renewable system to the MCS Installation Standards (MIS 3002 for PV, MIS 3005 for heat pumps, MIS 3007 for biomass etc.) and to the MCS Code 4.0 consumer protection framework. Without the MCS certificate the customer cannot claim Smart Export Guarantee payments, the Boiler Upgrade Scheme grant, or the consumer-protection backing the Code provides. The two documents do different jobs and both belong in the handover pack.",
  },
  {
    question: "What's the practical difference between G98 and G99 for a domestic install?",
    answer:
      "G98 is fit-and-inform — applies to inverter ratings up to and including 16 A per phase per inverter (around 3.68 kW per phase, so up to roughly 11 kW on a three-phase supply across three identical inverters). The installer notifies the DNO within 28 days of energising, using the standard G98 form. No prior consent needed. G99 is apply-to-connect — applies to anything larger. The DNO must accept the application before the inverter is energised, and that can take weeks. Most domestic PV (4-6 kWp single-phase) sits in G98 territory; battery-paired systems and three-phase commercial often cross into G99.",
  },
  {
    question: "What does MCS Code 4.0 actually require the installer to give the customer at handover?",
    answer:
      "A defined pack: the MCS certificate; the EIC; the G98 / G99 notification copy; the manufacturer commissioning record(s); the performance estimate (with SCOP for heat pumps, annual kWh for PV, etc.); component warranty documentation; user instructions; maintenance schedule; F-Gas record where applicable; complaints process and contact details. Pack provided in physical or durable digital form on handover day, not weeks later. The Code also requires post-handover support — typically an aftercare visit at 12 months for heat pumps and PV, plus availability for fault response.",
  },
  {
    question: "Where does the apprentice's signature actually go?",
    answer:
      "On the EIC, in the 'inspector and tester' box, if you are the person who carried out the inspection and test (which on most apprentice-supported installs you will be alongside or under the supervision of a qualifying supervisor). The 'designer' and 'constructor' boxes are typically signed by the MCS-certified lead engineer or qualifying supervisor. The MCS certificate itself is signed by the MCS-certified installer (the company representative authorised under their MCS scheme membership). G98 / G99 notifications are signed by the installer. F-Gas records are signed by the F-Gas-certified engineer.",
  },
  {
    question: "What happens if the G98 notification is missed or sent late?",
    answer:
      "The installer is in breach of the DCUSA connection conditions. The DNO can require disconnection until notification is in place. The customer's Smart Export Guarantee application will be rejected by the supplier because the supplier checks the G98 notification status before registering for export payments. The MCS-certified installer carries the reputational and contractual exposure; the customer carries the financial loss. Practically, the 28-day clock from energisation is treated as a hard internal deadline by competent installer firms.",
  },
  {
    question: "Why does a heat pump install need an F-Gas record in the handover pack?",
    answer:
      "Because the F-Gas Regulations require every refrigerant transaction (initial charge, top-up, recovery) to be logged by the F-Gas-certified engineer carrying out the work. The customer's copy of the record proves the system was commissioned with the right refrigerant in the right quantity, by a certified person. Manufacturer warranty cover usually requires evidence of compliant commissioning and the F-Gas record is the document that provides it. At decommissioning the same record chain proves the refrigerant was recovered rather than vented — defending against any future enforcement question.",
  },
];

export default function Sub4() {
  const navigate = useNavigate();
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module2-section5')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 5
          </button>

          <PageHero
            eyebrow="Module 2 · Section 5 · Subsection 4"
            title="Commissioning paperwork chain for renewables"
            description="What lands on the customer's table on handover day — the DNO notification under ENA G98 or G99, the MCS certificate, the MCS Code 4.0 customer-facing duties, the BS 7671 Electrical Installation Certificate, the manufacturer commissioning record, the F-Gas log entry, and the assembled handover pack itself."
            tone="emerald"
          />

          <TLDR
            points={[
              "Five documents make up the renewables paperwork chain — DNO notification (G98 or G99), MCS certificate, BS 7671 EIC, manufacturer commissioning record, and the customer handover pack assembled around them.",
              "G98 is fit-and-inform for inverters up to 16 A per phase; the MCS-certified installer notifies the DNO within 28 days of energising. G99 is apply-to-connect and needs DNO acceptance before switch-on.",
              "MCS Code 4.0 (in force from 2023) defines the contents of the handover pack and the installer's customer-facing duties. The MCS certificate is what unlocks Smart Export Guarantee and the Boiler Upgrade Scheme.",
              "F-Gas record chain logs every refrigerant transaction. Required by the F-Gas Regulations and central to keeping the manufacturer warranty alive.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Identify the five core documents in a renewables handover paperwork chain — DNO notification, MCS certificate, EIC, manufacturer commissioning record, and the assembled handover pack.",
              "State the difference between ENA Engineering Recommendation G98 (fit-and-inform, up to 16 A per phase) and G99 (apply-to-connect, larger systems) and the 28-day notification deadline under G98.",
              "Recognise the MCS certificate as the trigger for Smart Export Guarantee tariffs, Boiler Upgrade Scheme grants and consumer-protection cover under MCS Code 4.0.",
              "State the contents required in a complete handover pack under MCS Code 4.0 — certificates, performance estimate, warranties, user instructions, maintenance schedule, F-Gas record, complaints process.",
              "Explain why the F-Gas record is kept alongside the EIC and the manufacturer commissioning record in the handover pack, and identify it as F-Gas-certified-engineer-issued.",
              "Describe where the L3 electrician's signature sits within the paperwork chain — typically the EIC inspector / tester role rather than the MCS or DNO notification roles.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The five-document chain</ContentEyebrow>

          <ConceptBlock
            title="Five documents, five jobs — none of them substitutes for any other"
            plainEnglish="A renewables install generates a paperwork chain that walks the system from grid permission through electrical compliance, manufacturer commissioning, customer protection and ongoing maintenance. The five core documents are the DNO notification (G98 or G99), the MCS certificate, the BS 7671 Electrical Installation Certificate, the manufacturer commissioning record, and the assembled handover pack itself. Each does a different job and the customer needs every one of them — for grant claims, export payments, warranty cover, and any future fault investigation."
            onSite="As the L3 electrician you don't own every document, but you should recognise the chain so you can answer customer questions and so your slice of the work (the EIC, the test records, the labelling) feeds the MCS lead's pack assembly cleanly. The handover-day pile of paperwork is not optional and not a tick-box — it is the customer's evidence base for the next 25 years."
          >
            <p>
              The chain in order:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>DNO notification (G98 / G99)</strong> — permission to connect a
                generator to the public distribution network. G98 is fit-and-inform within
                28 days of energising; G99 needs DNO acceptance first. Issued by the
                MCS-certified installer to the local DNO.
              </li>
              <li>
                <strong>MCS certificate</strong> — quality mark and consumer-protection
                wrapper. Issued by the MCS-certified installer through the MCS database;
                the customer receives a printed and digital copy. Triggers Smart Export
                Guarantee eligibility and Boiler Upgrade Scheme grant claims.
              </li>
              <li>
                <strong>BS 7671 Electrical Installation Certificate</strong> — electrical
                compliance against the wiring regulations. Signed by designer, constructor
                and inspector / tester roles. The L3 electrician&apos;s signature usually
                sits in the inspector / tester box.
              </li>
              <li>
                <strong>Manufacturer commissioning record</strong> — equipment-specific
                start-up and configuration log. Records flow temperature, weather
                compensation curve, inverter limits, refrigerant charge, firmware
                version, network settings. Required for manufacturer warranty cover.
              </li>
              <li>
                <strong>Handover pack</strong> — assembled bundle containing all of the
                above, plus user instructions, maintenance schedule, F-Gas record,
                warranty documentation, performance estimate (SCOP for heat pumps, kWh
                yield for PV) and the MCS Code 4.0 complaints process. Provided physically
                or as a durable digital pack on handover day.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>DNO notification — G98 and G99</ContentEyebrow>

          <ConceptBlock
            title="G98 fit-and-inform vs G99 apply-to-connect"
            plainEnglish="Every generator connecting to the public distribution network needs a DNO notification. ENA Engineering Recommendation G98 covers small generators — up to and including 16 A per phase per inverter (around 3.68 kW per phase, so up to roughly 11 kW on three-phase across identical inverters). G98 is fit-and-inform: the installer notifies within 28 days of energisation, no prior consent required, provided the inverter carries a G98 type-test reference. G99 covers larger systems and is apply-to-connect — the DNO must accept the application before energisation, and that can take weeks."
            onSite="The MCS-certified installer carries the notification duty under the Distribution Connection and Use of System Agreement (DCUSA). On a typical 4-5 kWp domestic PV install with a 3-5 kW single-phase inverter, you are firmly in G98 territory and the installer's office submits the notification on energisation day. On a battery-paired system or a three-phase commercial install you may cross into G99, in which case the application work happens weeks before the install starts."
          >
            <p>
              What the G98 notification carries:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Site address, customer details and DNO MPAN (meter point administration
                number).
              </li>
              <li>
                Inverter make, model, capacity, type-test reference (against G98 / G99
                test schedules).
              </li>
              <li>
                System rating in kW and current per phase.
              </li>
              <li>
                Date of energisation (start of the 28-day clock).
              </li>
              <li>
                Installer details and MCS scheme membership reference.
              </li>
              <li>
                Battery storage details where present (some DNOs require additional
                information for storage).
              </li>
            </ul>
            <p>
              Missing the 28-day deadline is a breach of DCUSA. The DNO can require
              disconnection until notification is in place; the customer&apos;s Smart Export
              Guarantee application will be rejected by the supplier because the supplier
              cross-checks the G98 status before registering export. Competent installer
              firms treat the deadline as a hard internal commitment.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="ENA Engineering Recommendation G98 Issue 1 Amendment 7 (2022) — paraphrased scope"
            clause={
              <>
                G98 applies to the connection of fully type-tested micro-generating units
                up to and including 16 A per phase, in single or multiple unit
                installations, that are intended to operate in parallel with the public
                distribution network. The installer must notify the relevant DNO of the
                connection within 28 days of commissioning, providing the information
                specified in the G98 notification form.
              </>
            }
            meaning={
              <>
                G98 is the regulatory anchor for small-generator grid connection in Great
                Britain. The fit-and-inform regime relies on the inverter being
                type-tested against the recommendation&apos;s technical schedules — which
                is why the installer records the type-test reference on the notification.
                The 28-day post-commissioning deadline is non-negotiable. As the L3
                electrician on a small PV install you should recognise where G98 sits in
                the regulation map; the notification itself is the MCS-certified
                installer&apos;s administrative duty.
              </>
            }
            cite="Source: ENA Engineering Recommendation G98 (paraphrased from published Issue 1 Amendment 7, 2022 — full text via the Energy Networks Association)."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>MCS certificate and MCS Code 4.0</ContentEyebrow>

          <ConceptBlock
            title="MCS certifies the install, MCS Code 4.0 protects the customer"
            plainEnglish="The Microgeneration Certification Scheme (MCS) is the UK quality assurance scheme for small-scale renewable energy installations. An MCS certificate confirms that an MCS-certified installer designed, installed and commissioned the system to the relevant MIS Installation Standard (MIS 3002 for PV, MIS 3005 for heat pumps, MIS 3007 for biomass etc.). MCS Code 4.0, in force from 2023, is the consumer-protection wrapper — it sets out the contractual duties, complaint handling, deposit protection and post-handover support requirements every MCS-certified installer signs up to."
            onSite="Customer-facing significance: the MCS certificate is what unlocks Smart Export Guarantee export payments, the Boiler Upgrade Scheme grant for heat pumps, and most insurance / mortgage references for renewables. As the L3 electrician you do not issue the MCS certificate — that is the MCS-certified installer&apos;s role through the MCS database — but you should recognise it as the document the customer needs for every grant or tariff claim downstream."
          >
            <p>
              What the MCS certificate carries:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                MCS certificate number, generated through the MCS database.
              </li>
              <li>
                Installer details and MCS membership reference.
              </li>
              <li>
                Customer details and site address.
              </li>
              <li>
                System type (PV / heat pump / biomass / wind / solar thermal / battery
                storage where MCS-certified).
              </li>
              <li>
                System size (kWp for PV, kW thermal for heat pump etc.) and
                make / model details.
              </li>
              <li>
                Performance estimate (annual kWh for PV, SCOP for heat pump, etc.) used
                for SAP / SBEM and customer expectations.
              </li>
              <li>
                Commissioning date and certifying engineer name.
              </li>
              <li>
                Reference to the MIS standard the system was installed under.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="MCS Code 4.0 — the customer-facing duty list"
            plainEnglish="MCS Code 4.0 turned a previously informal set of installer expectations into a defined contractual document. Every MCS-certified installer signs up to the Code as a condition of certification; breach of the Code can result in suspension or removal from the scheme. From the customer's point of view it gives them a written contract, a defined handover pack, a complaints process backed by alternative dispute resolution (RECC or HIES), and post-installation aftercare commitments."
            onSite="The Code drives the contents and timing of the handover pack — it is the underlying reason every MCS install lands a defined paperwork bundle on the customer's table on handover day, not weeks later. As the L3 electrician you may not see the Code itself, but you will see its consequences in the structured handover process the MCS-certified installer follows."
          >
            <p>
              Headline duties under MCS Code 4.0:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Pre-contract information — clear written quote, performance estimate,
                expected timeline, complaints route.
              </li>
              <li>
                Contract terms — written, customer-friendly, deposit protection where
                deposits are taken.
              </li>
              <li>
                Honest performance claims — no overstated SCOP, no inflated yield,
                evidence-based estimates.
              </li>
              <li>
                Defined handover pack on handover day, in physical or durable digital
                form.
              </li>
              <li>
                Complaints handling with defined response times.
              </li>
              <li>
                Backstop alternative dispute resolution via the installer&apos;s consumer
                code provider (RECC or HIES).
              </li>
              <li>
                Post-installation aftercare — typically a 12-month follow-up visit for
                heat pumps and PV, plus availability for fault response.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="MCS Consumer Code (Code 4.0, in force 2023) — paraphrased customer-facing duties"
            clause={
              <>
                MCS-certified contractors must provide consumers with clear pre-contract
                information including a written quotation and performance estimate; honour
                deposit-protection and contract-cancellation rights; deliver a defined
                handover pack at the time of system handover; operate a documented
                complaints procedure; and refer unresolved disputes to the consumer code
                provider&apos;s alternative dispute resolution scheme.
              </>
            }
            meaning={
              <>
                MCS Code 4.0 is the customer-protection layer that sits over the technical
                MIS Installation Standards. It is contractually binding on every
                MCS-certified installer. The L3 electrician on the install team should
                recognise that the structured handover process — which can feel paperwork-
                heavy — is the Code in action, not optional ceremony. Failure to comply
                exposes the installer to MCS scheme sanctions and to enforceable consumer
                action through RECC or HIES.
              </>
            }
            cite="Source: MCS Consumer Code 4.0 (paraphrased from the published Code available via the MCS website, 2023)."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The EIC for renewables</ContentEyebrow>

          <ConceptBlock
            title="The BS 7671 Electrical Installation Certificate covers the electrical scope"
            plainEnglish="The EIC is the universal BS 7671 compliance document. For a renewables install it certifies the new circuits — the DC strings on a PV install, the AC final connection back to the consumer unit, the EV charger circuit, the heat pump supply — against the wiring regulations. The accompanying schedule of inspections and schedule of test results record the inspection items and measured values. Section 712 (PV), Section 722 (EV) and Section 753 (heat pumps embedded in floors) drive the special inspection items beyond the general requirements."
            onSite="The L3 electrician carrying out the inspection and test signs the inspector / tester box. The designer and constructor boxes are typically signed by the MCS-certified lead engineer or the qualifying supervisor on the installer&apos;s scheme. Test values (continuity, IR, polarity, Zs, RCD operation, plus DC IR for PV strings) are entered on the schedule. Labelling and signage at the consumer unit, the inverter, the DC isolators and the AC isolator are all inspection items."
          >
            <p>
              EIC items the L3 electrician inspects on a renewables install:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Continuity</strong> — protective conductors, ring final continuity
                where applicable.
              </li>
              <li>
                <strong>Insulation resistance</strong> — at the appropriate test voltage
                for the circuit. PV DC strings are tested at 500 V (or as specified by
                Section 712); minimum value usually &gt;= 1 MΩ per module string.
              </li>
              <li>
                <strong>Polarity</strong> — confirmed at every termination on AC and DC
                sides.
              </li>
              <li>
                <strong>Earth fault loop impedance (Zs)</strong> — at every accessible
                point on the AC side; compared with the maximum permissible Zs for the
                protective device.
              </li>
              <li>
                <strong>RCD operation</strong> — operating time at I△n and 5×I△n; smooth-DC
                test for Type B RCDs on EV chargers.
              </li>
              <li>
                <strong>Open-PEN protection</strong> on EV chargers (where the unit has
                built-in open-PEN function), tested per the manufacturer&apos;s procedure.
              </li>
              <li>
                <strong>Labelling and signage</strong> — dual supply warning at consumer
                unit, DC isolator labelling, AC isolator labelling, &quot;solar PV system on
                site&quot; warning at the meter and at the property entrance for emergency
                services.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Manufacturer commissioning and the F-Gas record</ContentEyebrow>

          <ConceptBlock
            title="The manufacturer commissioning record certifies equipment start-up"
            plainEnglish="Every major piece of renewable equipment — heat pump, PV inverter, battery storage system — comes with a manufacturer commissioning record. The engineer who starts up the equipment fills in measured values (flow temperature, weather compensation curve, refrigerant charge weight, inverter export limit, firmware version, network configuration) and signs the record. Manufacturer warranty cover usually requires evidence of correct commissioning and references this record. Without it the warranty defaults; with it the customer has a baseline against which the annual service can compare."
            onSite="On a heat pump install the F-Gas-certified engineer fills in the refrigerant section; the wet-system engineer fills in the flow and balance section; the L3 electrician confirms the electrical connection and isolation. On a PV install the MCS-certified installer fills in the inverter setup including network export limit, MPPT configuration and firmware version. On a battery install the lithium-ion safety setup, charge / discharge limits and firmware version are recorded."
          >
            <p>
              Why the manufacturer record matters years later:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Warranty defence — manufacturer can only honour warranty if commissioning
                was per spec and the record proves it.
              </li>
              <li>
                Annual service baseline — flow temperatures, COP, charge weight all
                referenced against the commissioning baseline.
              </li>
              <li>
                Fault diagnosis — drift from commissioning settings is often the first
                clue when something stops working.
              </li>
              <li>
                Sale of the property — incoming owner&apos;s solicitor often asks for the
                pack as evidence the system was properly commissioned.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="The F-Gas record is the legal audit trail for refrigerant"
            plainEnglish="F-Gas Regulations require every refrigerant transaction — initial commissioning charge, top-up at service, recovery at decommissioning — to be logged by the F-Gas-certified engineer. The engineer logs the entry in their own F-Gas register and provides a copy or extract to the installer for the customer's handover pack. The record carries the refrigerant type (R-32, R-290, R-410A etc.), charge weight, date, and the engineer's certificate number. Required by the F-Gas Regulations and central to demonstrating compliance during any future enforcement check."
            onSite="As the L3 electrician you do not handle refrigerant — that is firmly within F-Gas-certified scope. But you should recognise that the F-Gas record is part of the handover pack and that its absence breaks the warranty chain and exposes the installer to potential enforcement. At decommissioning the same record chain proves the refrigerant was recovered rather than vented — which is a criminal offence under the Environmental Permitting Regulations."
          >
            <p>
              The F-Gas chain in practice:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Initial commissioning — engineer logs refrigerant type and charge weight
                added.
              </li>
              <li>
                Annual service — engineer leak-tests, logs any top-up.
              </li>
              <li>
                Fault repair — engineer logs any recovery and re-charge during repair.
              </li>
              <li>
                Decommissioning — engineer recovers the refrigerant in full to a
                calibrated cylinder, logs the recovered weight, and the cylinder is
                returned to the supplier for recycling or disposal.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="UK F-Gas Regulation (Regulation (EU) No 517/2014 retained as UK law) — paraphrased operator and installer duties"
            clause={
              <>
                Operators of equipment containing fluorinated greenhouse gases must ensure
                leak checks, refrigerant recovery and any servicing involving the
                refrigerant circuit are carried out only by personnel holding the
                appropriate F-Gas certification. Records of refrigerant additions and
                recoveries must be kept for at least five years and made available on
                request.
              </>
            }
            meaning={
              <>
                The F-Gas regime is enforced in Great Britain by the Environment Agency
                (and equivalents in the devolved nations). Improper refrigerant handling
                — most seriously, venting to atmosphere — is a criminal offence with
                significant penalties. The L3 electrician&apos;s role is recognition — you
                do not break into the refrigerant circuit yourself and you make sure the
                F-Gas-certified engineer&apos;s record reaches the customer&apos;s handover
                pack. Manufacturer warranty cover usually requires the record to be
                preserved and updated at every service.
              </>
            }
            cite="Source: Regulation (EU) No 517/2014 on fluorinated greenhouse gases, retained as UK law (paraphrased from the published Regulation; UK guidance via gov.uk and the Environment Agency)."
          />

          <SectionRule />

          <ContentEyebrow>Assembling the handover pack</ContentEyebrow>

          <ConceptBlock
            title="The handover pack pulls every document into one customer-facing bundle"
            plainEnglish="On handover day the MCS-certified installer assembles the paperwork chain into a single customer-facing pack — physical folder or durable digital bundle. The MCS Code 4.0 makes the contents a defined list, not the installer's discretion. The customer receives the pack on the day; the installer keeps a duplicate for their own records and for any future warranty or fault investigation."
            onSite="As the L3 electrician you may be asked to feed your slice of the pack to the MCS lead — the EIC, the test schedules, the labelling photographs, your inspector / tester signature. Do not let the pack go out incomplete. The customer's grant claim, export tariff, warranty cover and consumer-protection rights all depend on it being complete. A handover pack with gaps is the headline reason customers return months later asking the installer to redo paperwork."
          >
            <p>
              Standard handover pack contents under MCS Code 4.0:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                MCS certificate.
              </li>
              <li>
                BS 7671 Electrical Installation Certificate (with schedules of inspection
                and test results).
              </li>
              <li>
                G98 or G99 DNO notification copy.
              </li>
              <li>
                Manufacturer commissioning record(s) — heat pump, inverter, battery,
                MVHR as applicable.
              </li>
              <li>
                MCS performance estimate — SCOP for heat pumps, annual kWh / kWp / yr for
                PV, and the methodology behind the figure.
              </li>
              <li>
                Component warranty documentation — panels (typically 25 years), inverter
                (5-12 years), heat pump (5-10 years), battery (10 years).
              </li>
              <li>
                F-Gas record (where applicable to the install).
              </li>
              <li>
                User instruction manuals.
              </li>
              <li>
                Maintenance schedule and recommended service intervals.
              </li>
              <li>
                Contact details for fault reporting and the MCS Code 4.0 complaints
                process.
              </li>
              <li>
                Photographs of labelling and signage at consumer unit, inverter, DC and
                AC isolators (good practice; some MCS schemes require it).
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Energising a PV system and forgetting to submit the G98 notification"
            whatHappens={
              <>
                Install completes, inverter switches on, customer is delighted, the team
                moves on to the next job. The G98 notification sits in someone&apos;s drafts
                folder and never goes out. Three months later the customer applies for the
                Smart Export Guarantee tariff — the supplier checks G98 status with the
                DNO, finds nothing, rejects the application. The customer gets in touch
                furious. The MCS-certified installer faces reputational exposure and a
                potential DCUSA breach finding from the DNO if the notification is
                particularly late.
              </>
            }
            doInstead={
              <>
                Treat the G98 / G99 deadline as a hard internal step on every install.
                Competent installer firms have a checklist on energisation day — EIC
                signed, MCS certificate generated, G98 notification submitted, customer
                handover pack delivered. The 28-day clock starts on energisation day; do
                not let the paperwork drift. As an apprentice, ask your supervisor where
                the G98 sits in the workflow on the install you&apos;re on.
              </>
            }
          />

          <CommonMistake
            title="Handing over a half-built pack and promising to send the rest later"
            whatHappens={
              <>
                Install finishes late on a Friday. The MCS certificate is still pending
                generation through the database. The installer hands the customer the EIC
                and verbal user instructions and promises to email the MCS certificate,
                the performance estimate and the warranty paperwork &quot;next week&quot;.
                Next week becomes next month. The customer has no documentation, cannot
                claim Smart Export Guarantee, cannot register for the Boiler Upgrade Scheme
                grant (if heat pump), cannot prove warranty status, and is left exposed.
                When something goes wrong they have no evidence trail.
              </>
            }
            doInstead={
              <>
                MCS Code 4.0 makes the complete handover pack a duty on handover day.
                Where genuinely outstanding items exist, agree a defined deadline in
                writing with the customer and follow up. Better practice — do not call the
                handover complete until every document is in the customer&apos;s hands.
                As the L3 electrician feeding the pack, deliver your slice (EIC, test
                schedules, labelling) cleanly so the MCS lead can assemble without delay.
              </>
            }
          />

          <Scenario
            title="Friday handover — 4 kWp PV plus 5 kWh battery on a domestic semi"
            situation={
              <>
                You are the L3 electrician on the install team for a 4 kWp PV install with
                a 5 kWh battery storage unit. The system has been built over three days;
                today is handover. The MCS-certified lead engineer is on site with you.
                The customer is at home and has the day blocked out for the handover walk-
                through. The DNO is the local distribution network operator; the customer
                already has a smart meter with export-capable firmware. The Smart Export
                Guarantee supplier has been chosen by the customer in advance.
              </>
            }
            whatToDo={
              <>
                Walk the chain in order. Energise the AC and DC sides; verify the inverter
                comes up and starts exporting. Carry out the inspection and test under
                BS 7671 — DC IR on the strings, AC continuity, polarity, Zs at the consumer
                unit, RCD operation. Sign the EIC inspector / tester box. The MCS-certified
                lead engineer signs the designer / constructor boxes, generates the MCS
                certificate through the MCS database, and submits the G98 notification to
                the DNO that afternoon (28-day deadline starts today). The manufacturer
                commissioning record for the inverter and the battery is filled in on the
                spot, including the network export-limit setting and firmware version.
                Photograph all labelling and signage. Assemble the handover pack — EIC
                with schedules, MCS certificate, G98 copy, manufacturer commissioning
                records, performance estimate (annual kWh estimate using MCS yield
                methodology), warranties for panels / inverter / battery, user
                instructions, maintenance schedule, contacts for fault reporting and the
                MCS Code 4.0 complaints process. Walk the customer through the pack page
                by page; agree maintenance schedule; demonstrate the user controls and the
                monitoring app; confirm the customer knows how to apply to the Smart
                Export Guarantee supplier with the MCS certificate and G98 copy. Leave the
                pack physically with the customer and email a digital copy as backup.
              </>
            }
            whyItMatters={
              <>
                The customer&apos;s next 25 years of warranty cover, export payments and
                consumer protection all hang on this paperwork being done properly today
                rather than at some indefinite later date. As the L3 electrician you do
                not own every document, but you own the EIC and the test schedules and you
                feed the MCS lead&apos;s pack. A clean handover protects the customer and
                protects the firm&apos;s MCS scheme membership. A scrappy handover stores
                up trouble for everyone.
              </>
            }
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Five-document chain — DNO notification (G98 or G99), MCS certificate, BS 7671 EIC, manufacturer commissioning record, customer handover pack. Each does a different job; the customer needs every one.",
              "G98 is fit-and-inform up to 16 A per phase; 28-day deadline from energisation. G99 is apply-to-connect for larger systems and needs DNO acceptance before switch-on.",
              "MCS certificate unlocks Smart Export Guarantee, the Boiler Upgrade Scheme grant and consumer-protection cover under MCS Code 4.0. It sits alongside (not instead of) the BS 7671 EIC.",
              "MCS Code 4.0 (in force from 2023) defines the contractual customer-facing duties — pre-contract information, handover pack contents, complaints handling, alternative dispute resolution via RECC or HIES.",
              "The L3 electrician&apos;s signature usually sits in the EIC inspector / tester box. Designer / constructor boxes are signed by the MCS-certified lead engineer or qualifying supervisor.",
              "Manufacturer commissioning record certifies equipment start-up and is required for warranty cover. The annual service baseline is referenced against it.",
              "F-Gas record logs every refrigerant transaction; F-Gas-certified engineer only; required by the F-Gas Regulations and central to keeping the warranty alive.",
              "Handover pack is assembled on handover day under MCS Code 4.0. Physical or durable digital. Half-built packs with promises to send the rest later breach the Code.",
            ]}
          />

          <Quiz title="Renewables paperwork chain — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module2-section5-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                5.3 Maintenance requirements
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module2-section5-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                5.5 Long-term maintenance and service intervals
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
