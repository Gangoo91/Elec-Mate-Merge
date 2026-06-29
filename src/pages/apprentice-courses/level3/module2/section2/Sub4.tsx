/**
 * Module 2 · Section 2 · Subsection 4 — ENA G98 / G99 grid notification deeper
 * Maps to City & Guilds 2365-03 / Unit 301 / LO2 / AC 2.1 (regulations and standards)
 *   AC 2.1 — "state the relevant Building Regulations and other statutory and
 *             non-statutory requirements for the installation and maintenance of
 *             environmental technology systems"
 *
 * Layered depth: 2357 Unit 312 ELTP02 / AC 2.1 (regulatory framework for
 * environmental technology systems); 2357 Unit 602 ELTK02 / AC 2.1 (regulations
 * for the installation of environmental technology systems).
 *
 * Note: Unit 301 is overview-level. This Sub deepens the ENA G98 / G99 framework
 * for grid-connected generation — the practical document map an L3 apprentice
 * meets on every PV, battery, micro-wind or micro-CHP install in the UK.
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
  VideoCard,
} from '@/components/study-centre/learning';
import { TransformerSchematic } from '@/components/study-centre/diagrams';
import { videos } from '@/data/study-centre/video-library';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'ENA G98 / G99 grid notification deeper (2.4) | Level 3 Module 2.2.4 | Elec-Mate';
const DESCRIPTION =
  "ENA Engineering Recommendations G98 (fast-track up to 16 A per phase) and G99 (pre-application above that) at recognition level for the L3 electrician — what each document does, how the DNO timeline works, anti-islanding under loss-of-mains, the type-test certificate trail and what happens when generators are added at a site that already has one.";

const checks = [
  {
    id: "l3-m2-s2-sub4-g98-vs-g99",
    question:
      "What is the actual technical line that splits G98 from G99 for a UK domestic install?",
    options: [
      "G98 (fast-track) covers generation up to 16 A per phase per inverter (3.68 kW single-phase); G99 applies above that, on three-phase, on multi-inverter systems and on a second generator at an existing G98 site. Capacity decides, not technology.",
      "Technology decides the document, not capacity. G98 covers solar PV of any size, and G99 covers wind, hydro and battery generation of any size. So a 6 kWp PV array stays in G98 because it is solar, while a 2 kW micro-wind turbine needs G99 because it is wind, regardless of either system's export rating.",
      "The split is set by whether the property is single-phase or three-phase. All single-phase domestic installs are G98 and all three-phase installs are G99, so a 5 kW single-phase inverter sits comfortably in G98 because the supply is single-phase; the 16 A figure relates only to cable sizing, not to the document.",
      "The split is set by whether the system exports to grid. A system that exports any power is G99 and one that only self-consumes is G98, so a 3.68 kW array that exports is automatically G99 while a larger array configured for self-consumption only stays in G98.",
    ],
    correctIndex: 0,
    explanation:
      "16 A per phase per inverter is the bright line — single-phase 230 V means 3.68 kW. G99 (pre-application) applies above that, on three-phase, on multi-inverter systems whose total exceeds the cap, and on any second generator at a G98 site. A 4 kWp PV array with a 3.68 kW inverter sits in G98; a 5 kW single-phase inverter sits in G99. The MCS designer often oversizes the array to a 3.68 kW inverter deliberately — it slightly clips peak summer output but keeps the install in G98 fast-track. Above the cap, the customer pays for the G99 process (typically 4-12 weeks) and waits.",
  },
  {
    id: "l3-m2-s2-sub4-anti-islanding",
    question:
      "What is anti-islanding (loss-of-mains protection) and why does the DNO insist on it?",
    options: [
      "Anti-islanding is the inverter's ability to keep running as a standalone island during a power cut, so the property keeps power from the array while the grid is down. The DNO insists on it so customers are not left in the dark, and ENA G98 / G99 sets the minimum hold-up time before reconnecting.",
      "Anti-islanding is loss-of-mains protection: the inverter detects a grid trip and shuts down within tens of milliseconds, so it cannot energise the network and electrocute DNO line workers.",
      "Anti-islanding is the requirement to keep the generator on its own islanded earth electrode, separate from the property's main earthing, so a fault on the house cannot reach the array. The DNO insists on it to isolate the generation electrically, and ENA G98 / G99 specifies the electrode separation distances.",
      "Anti-islanding is the inverter's protection against shaded 'islands' on the array dragging down output. The DNO insists on it because a poorly performing array draws reactive power from the network, and ENA G98 / G99 sets the minimum power factor the inverter must maintain under partial shade.",
    ],
    correctIndex: 1,
    explanation:
      "Loss-of-mains (LoM) protection has the inverter constantly monitor voltage and frequency on the AC terminals; if the grid trips, it disconnects within tens of milliseconds. Without it, an islanded inverter keeps energising the local network — a deadly hazard for line workers who think the line is dead. ENA G98 / G99 mandates type-tested LoM protection (ROCOF, vector shift or hybrid algorithms); A4:2026 and ENA EREC G98 Issue 6 have aligned UK requirements with EU EN 50549. The L3 electrician does not configure these algorithms — the inverter ships with a type-test certificate that the MCS designer files with the DNO. It is the single most safety-critical inverter function from the DNO point of view.",
  },
  {
    id: "l3-m2-s2-sub4-second-generator",
    question:
      "A customer with an existing G98-registered 3.68 kW PV array now wants a battery storage system that can export to grid. What document applies and why?",
    options: [
      "No new document is needed. The existing G98 notification covers any future additions at the site, so the battery can simply be added and commissioned, with the installer updating the original G98 form's capacity figure within 28 days of energising the storage.",
      "A fresh G98 notification applies. Because the battery inverter is individually under 16 A per phase, it qualifies for its own separate G98 fast-track notification, filed within 28 days; the two G98 systems coexist without any DNO pre-approval.",
      "G99 applies, because G98 allows only one inverter per site and the export-capable battery is a second generator that the DNO must model before commissioning.",
      "G100 applies. Adding any battery automatically requires an export-limitation application under G100, regardless of network capacity, because the battery can export at any time of day. The installer fits a limiter set to 3.68 kW and notifies the DNO; no G99 modelling is involved.",
    ],
    correctIndex: 2,
    explanation:
      "ENA G98 only allows ONE inverter at a site under the fast-track route. Adding a second exporting device — including a battery inverter capable of grid export — converts the site to a multi-generator configuration that requires G99 pre-application, so the DNO can model the cumulative export against local network capacity. The customer pays for G99 paperwork and waits for connection approval before commissioning, which often surprises those who thought adding a battery was a quick upgrade. The MCS-certified installer files the application; the apprentice should recognise the trigger and not mis-quote timing. AC-coupled export-capable batteries count as additional generators; a DC-coupled battery inside the existing PV inverter sometimes stays within the original G98 envelope, but only if the export rating did not change.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "Who notifies the DNO under G98, and when?",
    options: [
      "The customer notifies the DNO themselves, before the install, by completing the online G98 application and waiting for written consent. The installer cannot energise the system until that consent arrives, which is the whole point of the G98 fast-track process.",
      "The MCS-certified installer notifies the DNO within 28 days of commissioning; G98 is post-notification, so the install goes ahead first and the DNO is told afterwards.",
      "The electricity supplier notifies the DNO as part of setting up the Smart Export Guarantee tariff. The installer's only duty is to issue the EIC; once the customer signs up for SEG, the supplier passes the inverter details to the DNO within 90 days of the first export reading.",
      "Nobody needs to notify the DNO under G98 — that is what makes it 'fast-track'. The type-test certificate is self-certifying, so the installer commissions and files the certificate with the customer's paperwork; the DNO is informed only if a fault later arises.",
    ],
    correctAnswer: 1,
    explanation:
      "G98 is post-notification — the installer commissions the system, then notifies the DNO within 28 days. The DNO accepts it on the basis that the inverter is type-tested to G98 and the install is MCS-certified. The form carries the site address, MPAN, inverter make and model, type-test certificate reference, capacity and commissioning date. The L3 electrician does not file the form (that sits with the MCS-certified installer or designer) but should recognise it in the install pack. G98 is light-touch precisely because the type-test certificate carries the technical assurance — the installer just has to tell the DNO it has happened.",
  },
  {
    id: 2,
    question:
      "What is the practical timeline for a G99 connection compared with a G98?",
    options: [
      "Both are post-notification with a 28-day window. The only difference is that G99 requires the form to be sent by recorded delivery rather than online, so the practical timeline is identical — the installer commissions, then notifies within 28 days in both cases.",
      "G99 is actually the faster of the two. Because larger systems are commercial and the DNO prioritises them, a G99 Connection Offer is typically returned within a week, whereas a G98 notification can sit in the queue for several weeks before acknowledgement.",
      "G98 completes within 28 days post-commissioning; G99 is pre-application, so the DNO must model the network and issue a Connection Offer before commissioning — typically 4-12 weeks domestic.",
      "There is no timeline difference because neither requires DNO involvement before energising. Both G98 and G99 are self-certified against the inverter type-test certificate, so the installer commissions on the same day in both cases and files the relevant form afterwards.",
    ],
    correctAnswer: 2,
    explanation:
      "G98 is post-notification — install, commission, notify within 28 days, and the whole transaction completes inside that window. G99 is pre-application — submit before commissioning, wait for the DNO to model the network, receive a Connection Offer (which may contain export limits or fault-level conditions), accept it, then commission. Typical G99 timeline is 4-12 weeks domestic, longer commercial. On a fast-moving install programme the G99 paperwork is usually the long pole, so start it early; the apprentice should not commit the firm to commissioning dates before the process is confirmed.",
  },
  {
    id: 3,
    question:
      "Why does the inverter have a type-test certificate and what is it for?",
    options: [
      "It is the installer's own sign-off confirming the inverter was wired correctly on this install. The L3 electrician completes it at commissioning, recording the Zs and RCD readings at the inverter, and it is unique to each property rather than to the inverter model.",
      "It is the DNO's written permission to connect, issued after the network has been modelled for this site. It states the agreed export capacity and any limitation, and authorises energisation under G99; without it the inverter cannot be switched on.",
      "It is the calibration certificate for the test instruments used at commissioning. The DNO requires it to prove the Voc, Isc and insulation-resistance readings were taken with in-date equipment, and it is filed alongside the EIC in the customer pack.",
      "It is the manufacturer's accredited-lab evidence that the inverter model meets the EREC G98 / G99 / EN 50549 protection requirements; the DNO accepts it instead of retesting each unit.",
    ],
    correctAnswer: 3,
    explanation:
      "The type-test certificate is the manufacturer's evidence, issued by an accredited test lab, that the inverter model has been tested to the EREC G98 / G99 / EN 50549 protection requirements. It records the LoM detection method (ROCOF, vector shift, hybrid), the trip thresholds for over-voltage/under-voltage/over-frequency/under-frequency, the disconnection time and the recovery delay. The DNO accepts it at face value and does not retest each inverter; without a current certificate the DNO refuses the G98 / G99 notification and the install cannot legally export. It is the technical foundation of the whole fast-track scheme. Beware counterfeit or out-of-date certificates — the MCS designer verifies it is current and matches the inverter installed.",
  },
  {
    id: 4,
    question:
      "What does export limitation mean on a G99 connection offer and why does the DNO sometimes require it?",
    options: [
      "Export limitation caps the kW sent back to grid, regardless of array output; the surplus is used on site. The DNO requires it where full inverter output would breach network voltage or thermal limits.",
      "Export limitation caps the array's total generation, not just its export. The limiter physically reduces the inverter's output so the panels can never produce more than the agreed figure, so the customer loses the surplus rather than using it on site. The DNO requires it to keep the array within the inverter's thermal rating.",
      "Export limitation is the cap the supplier places on how much the customer can be paid under the Smart Export Guarantee. It is a billing limit set by the energy supplier, not a technical control, and the DNO requires it so the customer cannot claim payment for more export than the tariff allows.",
      "Export limitation is the requirement to disconnect the inverter whenever grid voltage rises, to avoid pushing power into an over-voltage network. It is a protection function built into the inverter's anti-islanding settings rather than a separate device, and the DNO requires it on every G99 connection regardless of capacity.",
    ],
    correctAnswer: 0,
    explanation:
      "Export limitation caps the maximum kW the system may send to grid, regardless of array output, implemented by a current transformer (CT) clamp at the supply head feeding a controller that throttles the inverter as export approaches the limit. The DNO requires it where the full inverter output would push voltage outside statutory limits or exceed substation thermal capacity. A 5 kWp array might be limited to 3.68 kW export with the rest used on site — charging a battery, running a heat pump, charging an EV. The MCS designer specifies the limiter; the L3 electrician fits the CT and routes the data cable. The G99 Connection Offer states the limit, and failure to enforce it breaches the connection agreement.",
  },
  {
    id: 5,
    question:
      "Who is the DNO and how does the L3 apprentice know which DNO covers the install?",
    options: [
      "The DNO is the customer's chosen electricity supplier — the company that sends the bill and sets the tariff. You find it from the latest electricity bill, and the G98 / G99 notification goes to whichever supplier the customer signed up with for their Smart Export Guarantee tariff.",
      "The DNO is the wires company that owns the local network; you identify it from the postcode or the MPAN supply number, and G98 / G99 notifications go to it, not the supplier.",
      "The DNO is OFGEM, the national energy regulator. It is identified the same way everywhere because there is a single national network operator, and G98 / G99 notifications go to OFGEM's central portal regardless of where the property is.",
      "The DNO is National Grid, which owns all the wires in Great Britain. Because there is only one DNO nationally, there is nothing to identify — every G98 / G99 notification goes to National Grid's single connections team for the whole country.",
    ],
    correctAnswer: 1,
    explanation:
      "The DNO (Distribution Network Operator) owns and maintains the local low- and medium-voltage network — the poles, cables and substations between the National Grid and the meter. There are six DNO regions in Great Britain (UK Power Networks, Northern Powergrid, SP Energy Networks, Electricity North West, National Grid Electricity Distribution, SSEN). The DNO is NOT the supplier — the supplier sends the bill but owns no wires. You find the DNO from the postcode (the ENA Distribution map) or the MPAN supply number at the meter (the bottom-line distributor ID identifies the supply area). G98 / G99 notifications go to the relevant DNO, not OFGEM, not the supplier. The supplier is involved only when the customer applies for the Smart Export Guarantee tariff and needs an MPAN-linked export-capable smart meter.",
  },
  {
    id: 6,
    question:
      "When does an installer need to apply for G100 instead of G98 / G99?",
    options: [
      "Whenever the install is three-phase. G100 is the three-phase equivalent of G98 / G99 — single-phase systems use G98 or G99, and any three-phase generator uses G100 instead, regardless of size or export limitation.",
      "Whenever the inverter is a microinverter rather than a string inverter. G100 is the route specific to module-level power electronics, because each microinverter must be type-tested individually; string-inverter systems stay on G98 or G99.",
      "G100 (active export limitation) applies where an active limiter caps export so an oversized system can connect to a network that could not accept its full output.",
      "Whenever the system has no export at all. G100 is the route for off-grid and self-consumption-only installs, replacing G98 / G99 where the inverter never feeds the public network; grid-connected systems always use G98 or G99 instead.",
    ],
    correctAnswer: 2,
    explanation:
      "G100 (active export limitation scheme) lets the customer install a system bigger than the DNO would otherwise accept, on the basis that an active limiter caps exported power to a level the network can take — for example a 12 kWp array on a network that cannot accept 12 kW export, limited to 3.68 kW with self-consumption and battery soaking up the rest. It sits within the broader G99 process: the Connection Offer includes the G100 export limit and the limiter type-test requirement. The apprentice will not run the application but should recognise it as the mechanism behind 'oversized array, limited export' designs. The customer gets the bigger system; the DNO gets the comfort that exports are capped.",
  },
  {
    id: 7,
    question:
      "What is the practical commissioning sequence for a G98 PV install?",
    options: [
      "Close the AC isolator first to bring the grid reference up, then close the DC isolator so the inverter can synchronise, and only then test the DC strings live with the inverter running. Testing the strings energised gives the most representative Voc and Isc readings.",
      "There is no fixed sequence for a domestic G98 install — the strings are tested for continuity only, the inverter is energised, and the kWh meter is read. The DC-side insulation-resistance test is not part of PV commissioning because the modules are a current-limited source.",
      "Energise the whole system at once by closing both isolators together, confirm the inverter exports, then carry out all the dead and live tests retrospectively with the system running. Commissioning a PV array follows the same order as any final circuit, so the strings are not isolated for testing.",
      "Test the DC strings dead first, then bring up the inverter, then close the AC side to export, then record the meter and file the DNO notification.",
    ],
    correctAnswer: 3,
    explanation:
      "Standard sequence: (1) verify the AC isolator is OFF; (2) DC-side test the strings (Voc, Isc, polarity, insulation resistance to MCS MGD 003 / IEC 62446 method); (3) close the DC isolator and verify the inverter starts but does not export (AC still off); (4) close the AC isolator and verify the inverter synchronises and exports; (5) record the kWh meter reading at handover; (6) the MCS-certified installer files the G98 form within 28 days; (7) hand the customer the install pack including type-test certificate, MCS commissioning certificate and EIC. The apprentice contributes to steps 1-5. The DC side stays live as long as light hits the array, so testing strings dead before closing the inverter is what protects the apprentice and the inverter — skipping the DC-side IR test is a common defect pickup on later EICRs.",
  },
  {
    id: 8,
    question:
      "What goes in the G98 install pack the customer should keep for life?",
    options: [
      "The full set — MCS commissioning certificate, inverter type-test certificate, EIC, schematics and isolator plan, manuals and the G98 notification copy — kept for the life of the install.",
      "Only the BS 7671 EIC. Because the EIC certifies the whole install as electrically safe, it is the single document the customer needs to keep; the MCS certificate, type-test certificate and G98 copy are retained by the installer for their own audit and are not part of the customer pack.",
      "Only the manufacturer's warranty cards for the panels and inverter. The regulatory documents (EIC, MCS certificate, G98 notification) are held centrally by the DNO and MCS, so the customer only needs the warranty paperwork to make any future claim.",
      "Only the DNO's written connection offer. As the document that authorised the connection, it is the one record the customer must retain; the EIC and MCS certificate are working documents that expire once commissioned and do not need to be kept.",
    ],
    correctAnswer: 0,
    explanation:
      "The pack includes the MCS commissioning certificate (the installer sign-off, required to claim the Smart Export Guarantee tariff), the inverter type-test certificate, the array layout drawing, the single-line schematic, the DC and AC isolator location plan, the BS 7671 EIC, the inverter and panel manuals, and the G98 notification copy filed with the DNO. It lives with the property — the next owner needs it for their EICR and to maintain SEG eligibility. The MCS commissioning certificate is the master document and everything else hangs off it; lost packs cost real money to replace. Hand it over physically and email a digital copy.",
  },
];

const faqs = [
  {
    question: "What is the difference between ENA, OFGEM and the DNO?",
    answer:
      "Three different bodies. The ENA (Energy Networks Association) is the trade body for the DNOs and gas networks — it publishes the Engineering Recommendations (G98, G99, G100, G83 historic) that codify how generators connect to the grid. OFGEM (Office of Gas and Electricity Markets) is the regulator — it sets the rules the DNOs must follow and runs schemes like the Smart Export Guarantee. The DNO (Distribution Network Operator) is the company that physically owns the wires in a region. G98 and G99 are ENA documents, accepted by all DNOs, with each DNO having its own application portal and timeline.",
  },
  {
    question: "Can I just install a PV array and not tell the DNO?",
    answer:
      "Not legally. Connecting a generator to the public network without notification is a breach of the Distribution Connection and Use of System Agreement (DCUSA) and the Electricity Safety, Quality and Continuity Regulations 2002. The DNO can disconnect the supply on discovery. The customer home insurer may refuse to cover damage from an undeclared install. The Smart Export Guarantee tariff requires an MCS commissioning certificate which in turn requires a valid G98 / G99 notification. There is no legitimate route to skip the DNO step.",
  },
  {
    question: "How does G98 relate to BS 7671?",
    answer:
      "BS 7671 governs the electrical safety inside the building — cable sizing, isolation, RCD protection, fault loop impedance. G98 / G99 governs the interface with the public network — anti-islanding, voltage / frequency limits, type-tested protection. Both apply on the same install. BS 7671 Section 712 (PV) was extensively revised in A4:2026 to align with the G98 / G99 framework — for example, requirements for clear DC and AC isolation, signage, and labelling at the consumer unit.",
  },
  {
    question: "Does battery storage on its own (not exporting) need G98 / G99?",
    answer:
      "If the battery inverter can never export to grid (a true 'private wire' battery whose inverter has export hard-disabled in firmware and verified by type-test certificate) then no G98 / G99 is required. In practice almost every residential battery system on the market today supports grid-export — even if the customer chooses not to use it — and is therefore caught by G98 / G99. The MCS designer reads the data sheet and confirms the boundary.",
  },
  {
    question: "What if the customer adds a generator without telling anyone and the EICR picks it up?",
    answer:
      "The EICR inspector documents the unnotified generator as a code C2 / C3 observation depending on the actual safety risk, and recommends the customer engage an MCS-certified installer to retrospectively notify under G98 / G99 (and pay any DNO inspection charges). The DNO can require remedial work — for example, fitting an external LoM relay if the existing inverter has no acceptable type-test certificate. This conversation is uncomfortable for the customer but it is the only legal path back to compliance.",
  },
  {
    question: "Are EVs covered by G98 / G99?",
    answer:
      "EV chargers in normal AC charging mode are loads, not generators — G98 / G99 do not apply. Bi-directional EV chargers (V2H, V2G) that can push energy from the EV battery back to the building or to the grid are generators in the export direction and do fall under G98 / G99. The market for V2G chargers in the UK is small but growing; expect this boundary to matter more over the next 5 years. BS 7671 Section 722 (EV charging, significantly amended in A4:2026) covers the load-direction safety requirements.",
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
            onClick={() => navigate('/study-centre/apprentice/level3-module2-section2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 2
          </button>

          <PageHero
            eyebrow="Module 2 · Section 2 · Subsection 4"
            title="ENA G98 / G99 grid notification deeper"
            description="Every grid-connected generator in the UK passes through the ENA framework. G98 fast-track up to 16 A per phase, G99 pre-application above. The L3 apprentice should recognise the documentation chain, the timeline implications and where the inverter type-test certificate fits in."
            tone="emerald"
          />

          <TLDR
            points={[
              "G98 is post-notification fast-track for one inverter up to 16 A per phase per inverter (3.68 kW single-phase). Install, commission, notify the DNO within 28 days.",
              "G99 is pre-application — needed above the G98 cap, on multi-inverter systems, on three-phase, and on every second generator at a site that already has G98 generation.",
              "Anti-islanding (loss-of-mains protection) is the safety-critical inverter function. The type-test certificate is the proof the inverter meets EREC G98 / G99 / EN 50549 requirements.",
              "G100 is the active export limitation scheme inside G99 — how oversized arrays can connect to networks that cannot accept full inverter output.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Identify the technical line that splits ENA G98 from G99 — 16 A per phase per inverter, single-phase 230 V, capacity not technology.",
              "Describe the role of the inverter type-test certificate in G98 / G99 fast-track and pre-application notification.",
              "Explain anti-islanding (loss-of-mains protection) at apprentice level — what it does, why the DNO needs it, what the inverter does to detect grid loss.",
              "Recognise when adding a second generator at an existing G98-registered site triggers a G99 application and what that means for project timeline.",
              "Identify the DNO from postcode or MPAN, distinguishing the DNO (wires) from the supplier (bills).",
              "Describe the G98 commissioning sequence at apprentice level — DC-side testing, AC isolation, inverter sync, kWh handover and the DNO notification.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>What G98 and G99 actually are</ContentEyebrow>

          <ConceptBlock
            title="ENA Engineering Recommendations — the grid-connection rulebook"
            plainEnglish="The Energy Networks Association publishes Engineering Recommendations (EREC) — technical standards that every UK Distribution Network Operator accepts. G98 covers fast-track fit-and-notify connection for small generators; G99 covers pre-application connection for everything else. They are not Acts of Parliament — they are industry standards — but they are referenced by the Distribution Connection and Use of System Agreement (DCUSA), which is statutory. In practical terms, G98 / G99 compliance is mandatory."
            onSite="As an L3 apprentice you do not file the G98 / G99 paperwork — that sits with the MCS-certified designer or installer on every domestic install. Your job is to recognise where the documentation lives in the install pack, understand what each piece does, and not commit the firm to commissioning dates before the DNO process is confirmed. On a G99 job, the DNO timeline is usually the long pole."
          >
            <p>
              The two documents in plain terms:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>G98 — fast-track</strong>. Single inverter up to 16 A per phase
                (3.68 kW single-phase, 11 kW three-phase). Install first, notify the DNO
                within 28 days. Allowed because the inverter holds a type-test certificate
                proving its protection settings meet G98.
              </li>
              <li>
                <strong>G99 — pre-application</strong>. Above the G98 cap, multi-inverter
                systems, all three-phase commercial, every second generator at a site that
                already has G98 generation, and any system the DNO flags as needing network
                modelling. Submit application, receive Connection Offer, accept Offer,
                then commission. Timeline 4-12 weeks domestic, longer commercial.
              </li>
              <li>
                <strong>G100 — active export limitation</strong>. A technical specification
                inside G99 that allows oversized inverters to connect on networks that
                cannot accept their full export, by capping export with a CT clamp and
                limiter. Lets a 12 kWp array with battery sit on a network that would
                otherwise refuse 12 kW export.
              </li>
            </ul>
            <p>
              All three documents are downloadable from the ENA website. The MCS-certified
              designer reads the live editions; the L3 apprentice should recognise the
              names and the role each plays in the install map.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="ENA EREC G98 — Recommendations for the connection of fully type-tested micro-generators (up to and including 16 A per phase) in parallel with public low-voltage distribution networks"
            clause={
              <>
                G98 sets out the fit-and-notify route for micro-generators. The
                installer notifies the DNO within 28 days of commissioning. The
                inverter must hold a current type-test certificate evidencing
                compliance with the G98 protection settings (over-voltage,
                under-voltage, over-frequency, under-frequency, loss-of-mains,
                trip times, recovery delay).
              </>
            }
            meaning={
              <>
                G98 is the document behind almost every domestic single-phase PV
                install in the UK. The L3 apprentice meets it indirectly — the
                MCS-certified installer files the form, but the type-test
                certificate sits in the install pack and the apprentice should
                recognise it as the technical foundation of the connection. ENA
                G98 has been updated through Issue 6 to align with EU EN 50549;
                check the live version on the ENA website.
              </>
            }
            cite="Source: ENA EREC G98 (paraphrased from the latest published Issue — full text on the Energy Networks Association website)."
          />

          <TransformerSchematic />

          <VideoCard
            url={videos.threePhaseTransformers.url}
            title={videos.threePhaseTransformers.title}
            channel={videos.threePhaseTransformers.channel}
            duration={videos.threePhaseTransformers.duration}
            topic="Three-phase distribution — the network G98/G99 protects"
            caption="G98 and G99 exist because the DNO needs to manage how customer-side generation interacts with the distribution transformer and the rest of the local network. Knowing how the transformer behaves makes the 16 A per phase boundary and the anti-islanding requirements easier to read."
          />

          <SectionRule />

          <ContentEyebrow>The 16 A per phase boundary</ContentEyebrow>

          <ConceptBlock
            title="Capacity, not technology, decides which document applies"
            plainEnglish="A common misunderstanding is that G98 is for solar and G99 is for wind, or G98 is domestic and G99 is commercial. Wrong. The dividing line is the export current per phase per inverter. Single-phase 230 V multiplied by 16 A is 3.68 kW. That single number — 3.68 kW per inverter — is the G98 ceiling for single-phase. Three-phase at 16 A per phase is roughly 11 kW. The technology behind the export (PV, wind, micro-hydro, micro-CHP, battery) does not change the boundary."
            onSite="MCS designers routinely 'over-panel' arrays to maximise summer harvest while sizing the inverter to stay inside G98. A 4 kWp array with a 3.68 kW inverter is a deliberate cost-optimisation — slightly clips the brightest summer hours but keeps the install in G98 fast-track and saves the customer the G99 paperwork wait. As an apprentice you should expect to see this pattern on small domestic installs."
          >
            <p>
              Worked examples — which document applies?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>3.68 kW single-phase PV inverter on a new install</strong> — G98.
                Fast-track. Notify the DNO within 28 days of commissioning.
              </li>
              <li>
                <strong>5 kW single-phase PV inverter (single)</strong> — G99. Above the
                16 A per phase ceiling. Pre-application required. Wait for Connection
                Offer before commissioning.
              </li>
              <li>
                <strong>3.68 kW PV inverter PLUS a 5 kW battery inverter capable of
                grid export, same site</strong> — G99. The site now has more than one
                generator. G98 fast-track only allows one. Pre-application required.
              </li>
              <li>
                <strong>11 kW three-phase PV inverter (16 A on each of three phases)</strong> — at
                or just under G98 ceiling, depending on inverter rated current. Read the
                data sheet carefully; many DNOs treat any three-phase generator as G99 by
                policy regardless of capacity.
              </li>
              <li>
                <strong>Customer adds a 3.68 kW PV system at a property that already has a
                G98-registered 3.68 kW PV system</strong> — G99. Second generator triggers
                G99 even if both are individually under the cap.
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

          <ContentEyebrow>Anti-islanding — the safety critical bit</ContentEyebrow>

          <ConceptBlock
            title="Loss-of-mains protection keeps DNO line workers alive"
            plainEnglish="When the public network trips for any reason — a fault, a planned outage, a storm — the inverter must detect that the grid has gone, disconnect from the AC terminals, and stop generating within tens of milliseconds. Without it, the inverter would continue to energise the local circuit (an 'island') including the DNO overhead lines. A line worker approaching what they believe to be a dead pole could be electrocuted by an islanded inverter still pushing 230 V. Anti-islanding is the single most safety-critical inverter function from the DNO point of view."
            onSite="The inverter detects loss of mains by monitoring voltage and frequency on the AC terminals. Standard methods are ROCOF (Rate-of-Change-of-Frequency — looks for sudden frequency excursions), vector shift (detects abrupt phase angle change), or hybrid algorithms. The thresholds are set in the inverter firmware and verified by the type-test laboratory. As the L3 apprentice you do not configure these — they ship from the factory pre-set. Your role is to make sure the AC isolation is correctly fitted so the inverter can actually disconnect when it decides to."
          >
            <p>
              Why the DNO insists on this:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                A planned DNO outage to repair a substation should leave the local
                feeders dead. If a customer-owned inverter is still energising the local
                LV cable, the line workers can be killed.
              </li>
              <li>
                A fault on a feeder should self-clear under DNO protection. An islanded
                customer inverter prolongs the fault, damages equipment, and can re-ignite
                arcs that the upstream protection thought it had cleared.
              </li>
              <li>
                Reconnection of a trip needs the local network to be fully de-energised
                before re-closing. Islanded inverters block this and can damage equipment
                during reconnection.
              </li>
            </ul>
            <p>
              The trip thresholds vary slightly between G98 / G99 / G100 and across
              jurisdictions but typically include over-voltage above ~1.10 p.u., under-voltage
              below ~0.85 p.u., over-frequency above 51-52 Hz, under-frequency below 47-48 Hz,
              with disconnection times in the order of 0.2 to 2 seconds depending on the trip
              category. ROCOF detection responds in tens of milliseconds.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="ENA EREC G99 — Requirements for the connection of generation equipment in parallel with public distribution networks (over 16 A per phase or otherwise required by the DNO)"
            clause={
              <>
                G99 sets out the application-and-offer process. The Connection
                Offer issued by the DNO contains the agreed export capacity, any
                export limitation requirement (under G100), the protection
                settings (loss-of-mains method and thresholds), reactive power
                capability requirements, and the network charging implications.
                Generation equipment must hold a current type-test certificate
                aligned to the EU EN 50549 / EREC G99 protection schedule.
              </>
            }
            meaning={
              <>
                G99 is the document the customer project sits inside whenever
                the system exceeds G98 fast-track or whenever the DNO requires
                pre-application. The L3 apprentice interface is recognising
                that the Connection Offer governs commissioning — you cannot
                energise the inverter on the AC side before the Offer is in
                place. On a fast-moving install programme, the G99 timeline is
                often the gating factor and the MCS designer should warn the
                customer up front.
              </>
            }
            cite="Source: ENA EREC G99 (paraphrased from the latest published Issue — full text on the Energy Networks Association website)."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The DNO timeline and why it matters</ContentEyebrow>

          <ConceptBlock
            title="G98 is fast; G99 is the long pole on the project"
            plainEnglish="Customers typically expect a renewable install to be a one-week affair — survey, design, install. For G98 jobs that holds. For G99 jobs the DNO process can run 4-12 weeks for a domestic system and longer for commercial. The customer needs to be told this at design stage, not the day before commissioning. As the L3 apprentice you should not commit the firm to a commissioning date before the G99 Connection Offer is in place."
            onSite="The G99 chain is: (1) MCS designer drafts the design; (2) installer files the G99 application with the DNO via their connection portal; (3) DNO acknowledges receipt; (4) DNO models the local network — voltage rise, fault level, transformer thermal capacity; (5) DNO issues a Connection Offer with terms and any export limitation; (6) customer accepts and pays any connection charges; (7) installer commissions; (8) installer notifies completion. Steps 4 and 5 are the variable ones — the DNO has up to a contractual 65 days for some categories. Plan around it."
          >
            <p>
              Common reasons G99 takes longer than expected:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Network constraint area</strong> — the local LV network is at or
                near voltage / thermal capacity. The DNO needs to model whether your install
                can be accommodated and whether export limitation under G100 is needed.
              </li>
              <li>
                <strong>Other applications in queue</strong> — the DNO processes
                applications in order. Busy areas (parts of the South West with high PV
                density, parts of Scotland with rural single-phase networks) have multi-month
                queues.
              </li>
              <li>
                <strong>Three-phase upgrades</strong> — if the application requires the
                customer supply to be upgraded from single-phase to three-phase, the DNO
                quotes the upgrade work separately and the timeline includes scheduling the
                physical upgrade.
              </li>
              <li>
                <strong>Application errors</strong> — incomplete site address, missing
                inverter type-test certificate reference, incorrect MPAN. The DNO returns
                the application for correction and the clock restarts. Submit a complete
                application first time.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Type-test certificate — the technical foundation</ContentEyebrow>

          <ConceptBlock
            title="The type-test certificate is the inverter passport"
            plainEnglish="Every inverter sold for grid connection in the UK carries a type-test certificate issued by an accredited test laboratory. The certificate documents the protection settings the inverter applies — voltage and frequency trip thresholds, disconnection times, recovery delays, anti-islanding method — and certifies these meet the relevant EREC and EN standards. The DNO accepts the certificate at face value: they do not retest each inverter. Without a current type-test certificate, the inverter cannot be legally connected to the public network."
            onSite="On the install pack you should be able to point to the type-test certificate alongside the manufacturer product manual. The MCS-certified designer is responsible for verifying it is current and matches the inverter model. As an apprentice, recognise it as the document that authorises the export — if it is missing or out of date, the install cannot legally commission. Do not accept a verbal 'the manufacturer says it is compliant' assurance — the DNO requires the certificate, not the assurance."
          >
            <p>
              What the certificate records — at apprentice level:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Inverter model and firmware version</strong>. Different firmware
                can change the protection behaviour — the certificate matches a specific
                version. Field-flashing firmware on a commissioned inverter without
                checking certificate validity is a regulatory pitfall.
              </li>
              <li>
                <strong>Protection thresholds</strong>. Over-voltage, under-voltage,
                over-frequency, under-frequency, ROCOF or vector shift settings, plus
                trip times.
              </li>
              <li>
                <strong>Connection categories</strong>. The certificate states the EREC
                document(s) the inverter is approved against — G98 only, G99 only, both,
                EN 50549. Match the certificate to the application route.
              </li>
              <li>
                <strong>Country of test</strong>. EU EN 50549 type-tests are accepted in
                the UK under post-Brexit equivalence, but the DNO can ask for a
                UK-specific G98 / G99 certificate. The MCS designer confirms acceptance.
              </li>
              <li>
                <strong>Validity period</strong>. Certificates have a validity. Check the
                expiry date before each install if you handle older stock.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="BS 7671 A4:2026 alignment with G98 / G99 — what changed for the L3 apprentice"
            plainEnglish="The 2026 amendment tightened the BS 7671 side of the grid-tie boundary. Section 712 (PV) signage and DC isolation requirements have been redrafted; Section 551 (low-voltage generating sets) added requirements for parallel-operation with other sources including the public network; and Section 826 / Chapter 82 cover battery storage as energy-source kit. The L3 apprentice does not need to recite the section numbers but should recognise the shift — BS 7671 and the ENA framework are now joined up rather than running in parallel."
            onSite="Practical effect on the apprentice: when you turn up at a domestic install pack post-A4:2026 you should expect clearer signage at the consumer unit (presence of generator, alternative supply source), labelled DC isolators with a distinct colour scheme, AC isolator within reach of the inverter, and the install pack itself referencing both the relevant BS 7671 sections and the ENA G98 / G99 documents. Older installs (pre-A4:2026) sat in a looser regime; the EICR inspector codes the gap accordingly — typically C3 improvement recommended unless the absence of signage creates a demonstrable maintainer hazard."
          >
            <p>
              What you can expect to see on a 2026-aligned install pack:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Generator notice at the consumer unit</strong> — durable label
                identifying that the property has a parallel generator, signposting to
                isolation points. Reg 514.10 (warning notice — alternative supply) drives this.
              </li>
              <li>
                <strong>DC isolator labelling</strong> — clearly marked DC isolators with
                voltage rating, polarity warning and instruction not to operate under load.
                Section 712 redraft reinforces.
              </li>
              <li>
                <strong>Reg 551.7 parallel-operation references</strong> — the install pack
                cites Reg 551.7 alongside G98 / G99 because Reg 551.7 added requirements for
                generating sets operating in parallel with the public network.
              </li>
              <li>
                <strong>Battery storage as energy source</strong> — battery installs now
                treated as parallel generation under both BS 7671 and ENA G98 / G99, not as
                load-side kit. Pack should reflect that with explicit isolation and
                labelling for the battery DC and AC sides.
              </li>
              <li>
                <strong>EV bi-directional charging readiness</strong> — Section 722 in
                A4:2026 acknowledges V2G / V2H bi-directional units; pack should flag whether
                the EV charger is bi-directional and, if so, treat as ENA-notifiable
                generation.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="DNO regions and finding the right one"
            plainEnglish="There are six DNO regions in Great Britain. Each owns the wires in its geographic area. The DNO is not the supplier (the company on the customer bill) — the DNO is the company that owns the cables outside. G98 and G99 notifications go to the relevant DNO via that DNO connection portal."
            onSite="You find the DNO from postcode (the ENA Distribution map online), from the customer energy bill (some bills list the DNO), or from the MPAN supply number printed on the meter. The MPAN bottom-line distributor ID code identifies the supply area. The L3 apprentice should be able to identify the DNO at survey stage so the project plan accounts for the right portal and the right timeline."
          >
            <p>
              The six GB DNO regions, plus distribution operators in NI:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>UK Power Networks (UKPN)</strong> — South East England, East of
                England, London.
              </li>
              <li>
                <strong>Northern Powergrid</strong> — North East England and Yorkshire.
              </li>
              <li>
                <strong>SP Energy Networks</strong> — Central and Southern Scotland,
                Merseyside, Cheshire, North Wales.
              </li>
              <li>
                <strong>Electricity North West</strong> — North West England.
              </li>
              <li>
                <strong>National Grid Electricity Distribution</strong> — Midlands, South
                Wales, South West England (formerly Western Power Distribution).
              </li>
              <li>
                <strong>SSEN (Scottish and Southern Electricity Networks)</strong> —
                Northern Scotland and Central Southern England.
              </li>
              <li>
                <strong>Northern Ireland Electricity Networks (NIE)</strong> — Northern
                Ireland (separate framework, not GB G98 / G99).
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Electricity Safety, Quality and Continuity Regulations 2002 (ESQCR) — regulation 22 (generators in parallel with the network)"
            clause={
              <>
                ESQCR 2002 places statutory obligations on distributors and on
                anyone connecting generation equipment in parallel with the
                distributor network. Connection without proper notification
                and without protection arrangements compliant with the
                distributor published technical requirements is a breach of
                the regulations.
              </>
            }
            meaning={
              <>
                ESQCR 2002 is the statutory backbone behind G98 / G99. The
                Engineering Recommendations are the technical implementation;
                ESQCR is what makes connection without notification an offence
                rather than just a paperwork nicety. The L3 apprentice does not
                need to cite ESQCR clause numbers, but should recognise that
                ignoring G98 / G99 is not just bad practice — it is statutory
                non-compliance.
              </>
            }
            cite="Source: Electricity Safety, Quality and Continuity Regulations 2002 (S.I. 2002/2665) — paraphrased; full text on legislation.gov.uk."
          />

          <SectionRule />

          <ContentEyebrow>Export limitation under G100</ContentEyebrow>

          <ConceptBlock
            title="When the network cannot accept the full inverter output"
            plainEnglish="Some local LV networks are at or near voltage / thermal capacity and cannot absorb a typical home install at full output. Rather than refuse the connection outright, the DNO can issue a Connection Offer that includes export limitation under G100 — the customer can install a bigger system, but a real-time controller caps the kW exported to a limit the network can accept. The excess generation is consumed on site, charges a battery or charges an EV. The system runs as designed; the export simply cannot exceed the cap."
            onSite="The export limiter is a current-transformer (CT) clamp at the supply head plus a controller (often the inverter itself, sometimes a separate Energy Management System) that monitors the export reading and throttles inverter output. The L3 apprentice fits the CT, routes the data cable to the inverter or controller, and the MCS-certified commissioning engineer configures the export limit per the Connection Offer. Verifying the configured limit matches the Offer is part of commissioning."
          >
            <p>
              Practical implications:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Customer payback is unchanged for energy used on site — the export
                limit only caps what goes to grid. Self-consumption is unaffected.
              </li>
              <li>
                Smart Export Guarantee tariff payments are limited by the export cap. A
                customer with a 12 kWp array on a 3.68 kW G100 export limit will see
                much of their summer surplus self-consumed (battery, EV, hot water diverter)
                rather than exported.
              </li>
              <li>
                The CT clamp must be correctly sized and oriented. Reverse-fitted CTs
                (the arrow pointing the wrong way) cause the inverter to read import as
                export and clip output unnecessarily. Common commissioning error.
              </li>
              <li>
                The Connection Offer states the CT type and any specific data-cable
                requirements. Wireless CT-to-inverter links exist but are less reliable
                than a hardwired pair on a long property.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Quoting a customer a one-week timeline on a job that is actually a G99 application"
            whatHappens={
              <>
                Customer wants a 5 kW PV inverter (above the G98 cap). Sales rep
                quotes a one-week install timeline. Survey happens, design happens,
                install kit lands on site — and the G99 application has not been
                filed. The customer is now waiting 4-12 weeks for the DNO to issue
                a Connection Offer. The kit is in their garage, the firm has been
                paid a deposit, and the customer is angry because they were never
                told. Worst case the firm tries to commission anyway without an
                Offer in place — that is a regulatory breach and an ESQCR offence.
              </>
            }
            doInstead={
              <>
                File the G99 application as the first step after the customer
                signs the design proposal — before kit is ordered. Tell the
                customer that the G99 timeline (typically 4-12 weeks domestic) is
                outside the firm control. Schedule install only after the
                Connection Offer has been issued and accepted. As the L3
                apprentice on site, do not commit to commissioning dates until you
                have seen the accepted Offer.
              </>
            }
          />

          <CommonMistake
            title="Adding a battery to existing G98 PV without filing a new G99 application"
            whatHappens={
              <>
                Customer rings up: I want to add a battery to my existing solar.
                Installer turns up, fits an AC-coupled battery inverter, commissions
                the system, hands over. No new DNO notification. The site now has
                two generators on a G98 framework that only allows one. The
                customer home insurer may decline cover; the next EICR will pick
                up the unnotified second generator; the DNO can require remedial
                G99 paperwork retrospectively (and may fine the customer for the
                non-compliant period).
              </>
            }
            doInstead={
              <>
                Treat any addition of a second generator at an existing G98 site
                as a G99 trigger. File the G99 application before commissioning the
                battery. The MCS-certified designer reads the battery inverter data
                sheet to confirm whether it is grid-export-capable; if it is, G99
                applies. As the L3 apprentice the test is simple — does the
                battery inverter have an AC export rating in its specs? If yes, it
                is a generator, and the site is now a multi-generator site under
                ENA framework.
              </>
            }
          />

          <Scenario
            title="Customer call — I want to add a battery"
            situation={
              <>
                You are the apprentice on a service van. The firm office sends
                you to a domestic property — the customer has an existing 3.68 kW
                PV system installed five years ago under G98 fast-track. They have
                bought a 5 kWh battery from a high-street retailer and want it
                fitted alongside the PV. They expect a one-day visit. The PV
                inverter is grid-tied only (no battery support); the battery is
                an AC-coupled hybrid inverter with full grid export capability.
              </>
            }
            whatToDo={
              <>
                Stop. Ring the office and explain. The site has G98 generation and
                this addition is a second grid-export-capable inverter, which is
                outside G98 scope. The MCS-certified designer needs to file a G99
                application with the DNO before the battery can be commissioned to
                grid-export. The kit can be fitted physically — cabling, isolators,
                bonding, controls — but the AC export side stays disabled until the
                G99 Connection Offer is issued. Tell the customer politely: the kit
                will be installed; the export will be enabled the day the DNO
                Offer comes through; the timeline is typically 4-12 weeks; the
                firm is doing this because the alternative is an unsafe,
                unregistered second generator that the customer home insurer
                would not cover.
              </>
            }
            whyItMatters={
              <>
                A lot of homeowners assume add a battery is a quick upgrade. The
                ENA framework treats it as a new generator addition and the
                paperwork follows accordingly. As the L3 apprentice you do not run
                the G99 process, but you should recognise the trigger and not
                commit the firm to commissioning the export side before the Offer
                is in place. Your professional credibility hangs on getting that
                conversation right.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "G98 is fast-track post-notification up to 16 A per phase per inverter (3.68 kW single-phase, 11 kW three-phase). Notify within 28 days of commissioning.",
              "G99 is pre-application — needed above G98 cap, on multi-inverter sites, on most three-phase, and on every second generator at an existing G98 site.",
              "The 16 A per phase boundary is set by capacity, not technology. PV, wind, micro-CHP, battery — all the same rule.",
              "Anti-islanding (loss-of-mains protection) is the safety-critical inverter function. Without it, customer inverters could energise downed DNO cables.",
              "The inverter type-test certificate is the manufacturer evidence that protection settings meet G98 / G99 / EN 50549 — the DNO accepts it at face value.",
              "G100 is active export limitation inside G99 — lets oversized arrays connect to constrained networks by capping export with a CT clamp and limiter.",
              "The DNO is the wires company, not the supplier. Six DNO regions in Great Britain plus NIE in Northern Ireland. G98 / G99 notifications go to the relevant DNO portal.",
              "Adding a battery to existing G98 PV is a G99 trigger — second grid-export-capable inverter. Do not commission export before the Connection Offer is in place.",
            ]}
          />

          <Quiz title="ENA G98 / G99 deeper — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module2-section2-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                2.3 BS 7671 Section 753 (heating)
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module2-section2-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                2.5 Inspection and test of env tech
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
