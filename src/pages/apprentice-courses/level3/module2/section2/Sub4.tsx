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
      "G98 (fast-track) covers grid-connected generation up to and including 16 A per phase per inverter — single-phase 230 V that means 3.68 kW. G99 (pre-application) applies above that limit, on three-phase, on multi-inverter systems whose total exceeds the G98 cap, and on any second generator at a site that already has G98-connected generation. Mode of generation does not decide the document — capacity does. A 4 kWp PV array with a 3.68 kW inverter sits in G98; a 5 kWp array driving a 5 kW single-phase inverter sits in G99. The DNO needs the full G99 connection-application before commissioning, which adds typically 4-12 weeks of paperwork.",
      "(1) COLLECT SYMPTOMS — customer interview + visual inspection. (2) FORMULATE HYPOTHESIS — what fault types match the symptoms? Narrow to 2–3 candidates. (3) PLAN TESTS — which tests will distinguish the candidates? Order them safely (dead before live). (4) EXECUTE TESTS — using the right instruments per Sub 2.x. (5) ANALYSE RESULTS — do the readings confirm or refute each hypothesis? Update hypothesis based on findings. (6) FORMULATE FIX — what action corrects the confirmed fault? Consider repair vs replace. (7) EXECUTE FIX — make safe, repair / replace, verify with retest, document. The stages turn diagnosis into a structured process; skipping a stage almost always returns to bite you.",
      "Both theories share autonomy as a core element. SDT\\\\\\\\\\\\'s \\\"competence\\\" maps closely to Pink\\\\\\\\\\\\'s \\\"mastery\\\" (both involve developing skills and feeling effective). The integration comes through recognising that Pink\\\\\\\\\\\\'s \\\"purpose\\\" and SDT\\\\\\\\\\\\'s \\\"relatedness\\\" both address connection to something beyond the self — purpose through meaning, relatedness through people. Together they form a five-factor model: autonomy, mastery/competence, purpose, relatedness, and intrinsic engagement",
      "The ECA is a trade body — voluntary membership organisation representing contractors' commercial interests, providing technical / commercial / legal support, lobbying, training and standard-form contracts. The JIB is the joint employer/union body that sets pay, conditions and grading on JIB-affiliated jobs. ECA members typically apply JIB rules but the bodies are separate. SELECT plays a similar (but distinct) role for the contracting industry in Scotland.",
    ],
    correctIndex: 0,
    explanation:
      "16 A per phase per inverter is the bright line. The MCS-certified designer specifies the inverter to keep the system under the cap where possible — a 4 kWp PV array oversized to a 3.68 kW inverter is a deliberate cost-saving choice (slightly clips peak summer output, keeps the install in G98 fast-track). Above the cap, the customer pays for the G99 process and waits.",
  },
  {
    id: "l3-m2-s2-sub4-anti-islanding",
    question:
      "What is anti-islanding (loss-of-mains protection) and why does the DNO insist on it?",
    options: [
      "Anti-islanding is the inverter loss-of-mains (LoM) protection. The inverter constantly monitors voltage and frequency on the AC terminals; if the grid trips, the inverter detects the loss and shuts down within tens of milliseconds. Without it, an islanded inverter keeps energising the local network — a deadly hazard for DNO line workers who think the line is dead. ENA G98 / G99 mandates type-tested LoM protection (ROCOF — rate-of-change-of-frequency, vector shift, or hybrid algorithms). A4:2026 BS 7671 work and the parallel ENA EREC G98 Issue 6 update have aligned UK requirements with EU EN 50549. The L3 electrician does not configure these algorithms; the inverter ships with a type-test certificate that the MCS designer files with the DNO.",
      "The EPC should be re-issued to reflect the new performance — heat pump, PV, MVHR, insulation upgrades all change the SAP rating. The MCS-certified installer normally arranges the EPC update. An updated EPC matters for: (a) future house sale (the buyer's solicitor sees current performance); (b) mortgage applications (lenders increasingly weight EPC ratings); (c) insurance (some insurers now adjust premium for low-EPC properties); (d) BUS grant requires a valid EPC at the time of install. EPCs are valid for 10 years from issue.",
      "Modern crystalline silicon modules typically have a Voc (open-circuit voltage) of 40-50 V per module. A residential string of 8-12 modules in series produces a string Voc of 350-600 V DC under standard conditions, with voltages running higher in cold conditions (Voc rises as temperature falls — the temperature-corrected maximum is what determines the inverter input rating). String inverters operate at these voltages; microinverters convert DC to AC at module level so the cable run between modules and the rest of the system is at AC; module-level DC optimisers raise or lower module voltage to keep the string at MPPT regardless of shading on individual modules. The architecture choice affects the cable type, the protective measures and the rapid-shutdown options.",
      "Live working is permitted under EAWR Reg 14 only when (a) it's unreasonable for the conductor to be dead, (b) it's reasonable for work to be carried out live, and (c) suitable precautions are taken — ALL three. Choosing live work to avoid customer inconvenience does NOT pass test (a) — convenience isn't 'unreasonable for the conductor to be dead'. The L3 apprentice doesn't get to make that trade-off; the firm's risk assessment makes it, with documented justification, and the supervisor authorises it. The 'I'll just do it live, the customer doesn't want the power off' is the exact failure mode the HSE prosecutes after the inevitable shock.",
    ],
    correctIndex: 0,
    explanation:
      "LoM is the single most safety-critical inverter function from the DNO point of view. A linesman approaching what looks like a dead pole-mounted transformer should not find a 4 kWp array still pumping 230 V back at them. The inverter type-test certificate is the proof that LoM works to the standard the DNO will accept. As an apprentice you should recognise the certificate when you see it on the install pack.",
  },
  {
    id: "l3-m2-s2-sub4-second-generator",
    question:
      "A customer with an existing G98-registered 3.68 kW PV array now wants a battery storage system that can export to grid. What document applies and why?",
    options: [
      "Three categories. (1) Lampholder terminals — for incandescent / halogen, the spring contacts oxidise / fatigue; for compact GU10 fittings, the spring clip arcs under poor contact. (2) Driver / control gear failure — LED drivers, fluorescent ballasts have finite life (5–10 years typically), fail open or short, often take the lamp with them. (3) Internal wiring degradation — flex inside fittings degrades from heat over years, especially in enclosed pendant fittings. Brand patterns: cheap GU10 downlighters (£5 unbranded) fail at 2–3 years; LED downlighters from established brands (Aurora, Ansell, JCC) typically last 10+ years; fluorescent fittings from Thorlux / Crompton last 20+ years before driver replacement.",
      "On TN-C-S, the neutral and protective earth share the PEN conductor between transformer and cut-out. If the PEN breaks anywhere upstream, the customer's neutral floats relative to the transformer star point. Customer's bonded metalwork (kitchen taps, sinks, radiators, EV charger chassis, all bonded to the customer earth terminal) rises toward phase voltage relative to true earth. RCD doesn't see it (no residual current — the lifted-neutral voltage flows through bonding network as L–E volt-drop, not as imbalance). First sign: tingle on metal taps or 30+ V N–E reading at cut-out. A4:2026 added explicit Open PEN protection requirements (Reg 411.3.3, especially for EV chargers).",
      "G99 applies. ENA G98 only allows ONE inverter (or one inverter with a single MPPT) at a site under the fast-track route. Adding a second exporting device — including a battery inverter capable of grid export — converts the site to a multi-generator configuration that requires G99 pre-application. The DNO needs to model the cumulative export against the local network capacity. The customer pays for G99 paperwork and waits for connection approval before commissioning. This often surprises customers who thought adding a battery to existing PV was a quick upgrade. The MCS-certified installer files the G99 application; the L3 apprentice should recognise the trigger and not mis-quote the customer on timing.",
      "Five-step. (1) DEMONSTRATE the fix — show the customer that the original symptom is no longer present (e.g. 'the breaker's not tripping any more — try plugging in your kettle'). (2) WALK THROUGH the work done — what was found, what was fixed, what tests confirmed. (3) PROVIDE documentation — job sheet copy, any certificates, customer-friendly summary. (4) EDUCATE on prevention — what behaviours / conditions might cause recurrence, what to watch for. (5) AGREE next steps — any further work recommended, follow-up visit if needed, payment terms. The hand-back is what turns a job from 'work done' to 'customer satisfied'. Skipping it leaves customer feeling unfinished.",
    ],
    correctIndex: 2,
    explanation:
      "The 'one G98 per site' rule trips up a lot of upgrade projects. AC-coupled batteries that can export to grid count as additional generators. DC-coupled batteries inside the existing PV inverter (where the inverter has battery support built in) sometimes stay within the original G98 envelope — but only if the inverter export rating did not change. The MCS designer reads the inverter data sheet and confirms the boundary.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "Who notifies the DNO under G98, and when?",
    options: [
      "SYMPTOM-LEVEL — addresses the visible / immediate problem (replace the burnt socket, reset the tripped breaker, replace the failed bulb). Quick, low-cost, but doesn't prevent recurrence if the root cause persists. ROOT-CAUSE — addresses the design / installation / maintenance failure that produced the symptom (redesign the ring final to handle the actual load, re-train the customer to avoid overload, replace the undersized cable to current spec). Slower, higher-cost, but prevents recurrence. Engineering decision: do BOTH where possible; fix the symptom AND the root cause; quote both in the customer brief.",
      "The MCS-certified installer notifies the DNO under G98 within 28 days of commissioning. G98 is post-notification — the installer commissions the system, then notifies. The DNO accepts the notification on the basis that the inverter is type-tested to G98 and the install is MCS-certified. The form contains site address, MPAN, inverter make and model, type-test certificate reference, capacity and commissioning date. The L3 electrician does not file the G98 form — that sits with the MCS-certified installer or designer — but you should recognise it as part of the install pack handed to the customer.",
      "Face him directly so he can see your mouth and expression, speak at normal pace and volume (not exaggerated), use written notes for technical details, provide the permit-to-work document in advance for him to read, confirm understanding by asking specific questions ('what's the agreed comms signal if I see something wrong?'). Don't cover your mouth, don't turn away mid-sentence, don't have him facing into bright light behind you. If the work involves shared comms (radio), agree visual hand signals as the primary channel for him.",
      "Half-split = at each step you eliminate half the remaining circuit. Step 1: open the ring at a socket roughly half-way around the ring; test continuity from the DB to that point on each leg; if both legs read continuity, the break is between this socket and the OTHER end of the ring; if one leg reads OL, the break is between this socket and the DB on that leg. Step 2: pick the half that contains the break, repeat at its mid-point. With a 12-socket ring you locate the break in 4 measurements (log&#8322;12 &asymp; 3.6, rounded up). Random walking would take 6 measurements on average. The technique is from logarithmic search algorithms — formalised diagnostic discipline beats random.",
    ],
    correctAnswer: 1,
    explanation:
      "G98 is light-touch precisely because the type-test certificate carries the technical assurance. The DNO accepts the certificate as evidence the inverter behaves correctly under fault conditions, and the MCS install ticket as evidence the kit was installed competently. The installer just has to tell the DNO it has happened.",
  },
  {
    id: 2,
    question:
      "What is the practical timeline for a G99 connection compared with a G98?",
    options: [
      "MCS MIS 3002 is the installer-competence and installation-quality standard for solar PV. BS 7671 Section 712 is the electrical-design standard for the wiring, protection, isolation and labelling. Both apply on every install. MIS 3002 references BS 7671 explicitly for the electrical detail; BS 7671 applies regardless of whether the install is MCS-certified. MCS certification is required if the customer wants Smart Export Guarantee payments; BS 7671 compliance is required because it's the electrical regulation.",
      "Fracture (other than to fingers, thumbs and toes); amputation; permanent loss of sight or reduction of sight; crush injuries leading to internal organ damage; serious burns covering more than 10% of the body or causing significant damage to eyes, respiratory system or other vital organs; scalpings requiring hospital treatment; loss of consciousness from head injury or asphyxia; any other injury arising from work in an enclosed space leading to hypothermia, heat-induced illness or requiring resuscitation or admittance to hospital for more than 24 hours.",
      "G98 is post-notification — install, commission, notify within 28 days. The whole transaction completes inside 28 days from commissioning. G99 is pre-application — submit the application before commissioning, wait for the DNO to model the network, receive a Connection Offer, accept the Offer (which may contain export limits or fault-level conditions), then commission. Typical G99 timeline is 4-12 weeks for a domestic system; longer for commercial. On a fast-moving install programme the G99 paperwork is usually the long pole — start it early.",
      "3 percent for lighting circuits, 5 percent for other circuits (sockets, fixed loads). Measured from the origin of the installation to the load. Verified by calculation during design (cable size + length + load) and confirmed by measurement under load during commissioning if there\\\\\\\\'s any doubt. On long runs (above 30-40 m), voltage drop becomes the limiting factor in cable size selection — often requiring a larger cable than overcurrent protection alone would dictate.",
    ],
    correctAnswer: 2,
    explanation:
      "Customers who hear 'add a battery' often expect a one-day visit. If the addition pushes the site into G99 territory the DNO timeline is the gating factor, not the installer diary. The MCS designer should warn the customer up front. The L3 apprentice should not commit the firm to commissioning dates before the G99 process is confirmed.",
  },
  {
    id: 3,
    question:
      "Why does the inverter have a type-test certificate and what is it for?",
    options: [
      "CAT III 600 V minimum (CAT IV 600 V preferred). The DB is a fixed-installation distribution location, which is CAT III by definition. The Fluke 376FC is CAT IV 600 V / CAT III 1000 V — adequate. The Megger DCM340 is CAT IV 300 V / CAT III 600 V — adequate for 230/400 V three-phase. Cheap clamp meters with only CAT II rating are not safe at this location — they can fail catastrophically on a transient. Always check the CAT rating before using a borrowed or new clamp meter at a DB.",
      "Three locations. (1) SWA gland terminations — the brass gland's earth path through the armour to the gland body is critical and often poorly made (insufficient compression on the armour, missing earth tag, paint between gland and box). Causes intermittent earth faults. (2) Compound seal at gland — over years the seal hardens / shrinks, water ingress to the cable cores. (3) The cable run itself only when physically damaged (forklift impact, settlement, vermin). Brand patterns: CMP industrial glands and Pratley sealing compound are the trade standard; cheap gland kits (Vinco, generic OEM) often fail at the earth-tag connection.",
      "Rented domestic properties in England — including most assured shorthold tenancies, licences to occupy, and HMOs. Excludes social housing tenancies under separate regulation, lodger arrangements where the landlord shares the dwelling, long leases (7+ years), student halls of residence under separate regimes, and accommodation provided to family members. Wales has its own equivalent (Renting Homes Wales Act 2016 plus the Renting Homes — Fitness for Human Habitation Regulations 2022); Scotland has the Housing (Scotland) Act 2006 plus tolerable standard / repairing standard guidance; Northern Ireland follows similar requirements via the Housing (Northern Ireland) Order 2003.",
      "The type-test certificate is the manufacturer's evidence — issued by an accredited test lab — that the inverter model has been tested to the EREC G98 / G99 / EN 50549 protection requirements. It records the LoM detection method (ROCOF, vector shift, hybrid), the trip thresholds for over-voltage / under-voltage / over-frequency / under-frequency, the disconnection time, and the recovery delay. The DNO accepts the type-test certificate at face value — they do not retest each inverter on each install. Without a current type-test certificate, the DNO will refuse to accept G98 / G99 notification and the install cannot legally export.",
    ],
    correctAnswer: 3,
    explanation:
      "Type-test certificates are the technical foundation of the whole fast-track scheme. They are typically valid for the inverter model life and you can download them from the manufacturer site. Beware: counterfeit / out-of-date certificates do circulate. The MCS-certified designer is responsible for verifying the certificate is current and matches the inverter installed.",
  },
  {
    id: 4,
    question:
      "What does export limitation mean on a G99 connection offer and why does the DNO sometimes require it?",
    options: [
      "Export limitation caps the maximum kW the system is allowed to send back to the grid, regardless of how much the array can produce. Implemented by a current transformer (CT) clamp at the supply head, feeding a smart meter or export controller that throttles the inverter when export approaches the limit. The DNO requires it where adding the customer full inverter output to the local network would push voltage outside statutory limits or exceed substation thermal capacity. A 5 kWp array might be limited to 3.68 kW export with the rest used on site (charge a battery, run a heat pump, charge an EV). The MCS designer specifies the limiter; the L3 electrician fits the CT and routes the data cable to the inverter.",
      "Because Future Homes Standard requires very low fabric U-values, very low air permeability, and Part F controlled ventilation. At those airtightness levels the building cannot rely on infiltration for air change — it needs deliberate mechanical ventilation. MVHR provides that mechanical ventilation while recovering 80-90% of the heat. SAP credits MVHR with significant carbon savings in airtight new-build, contributing materially to the Part L target rate. Fitting MEV (mechanical extract ventilation only, no recovery) instead loses the recovery benefit and harms the SAP score.",
      "A published document that confirms the supplier commitment to achieving net-zero by 2050, sets out the current annual emissions broken down by scope (with scope 3 covering at least the categories identified in the PPN 06/21 guidance), describes the environmental management measures in place, and is signed off by a director of the supplier organisation. The CRP must be published on the supplier website, updated at least annually, and provided as part of any in-scope tender submission. The format follows a standard template provided in the PPN 06/21 guidance.",
      "Section 722 'Electric vehicle charging installations' is the special-installations chapter of BS 7671 covering electrical requirements for EV charging points. Topics include circuit design for the charging point, RCD selection (Type B or RDC-DD with DC fault detection), protection against the PEN-fault risk on PME supplies, isolation, and EV-specific inspection and test. Section 722 was significantly amended in BS 7671:2018+A4:2026 to reflect updated requirements for modern charging hardware and the smart-charging regulatory landscape.",
    ],
    correctAnswer: 0,
    explanation:
      "Export limitation is the DNO way of saying 'yes, you can install — but you cannot push more than X kW into our network'. The G99 Connection Offer states the limit. Failure to enforce it is a breach of the connection agreement and exposes the customer to disconnection. The CT and limiter wiring is the apprentice territory; verifying the configured limit matches the offer is the designer's.",
  },
  {
    id: 5,
    question:
      "Who is the DNO and how does the L3 apprentice know which DNO covers the install?",
    options: [
      "Three-part brief in plain English. (1) WHAT WAS HAPPENING — 'Your kitchen RCBO was tripping because there was a small earth leak from a damaged terminal in the ceiling rose'. (2) WHAT WE DID — 'We replaced the damaged terminal, re-tested the circuit, and confirmed the leak is gone'. (3) WHAT TO WATCH FOR — 'If the breaker trips again in the next month, give us a call straight away — that would suggest a related issue we should investigate'. Plus a written summary on the job sheet / certificate. The customer leaves understanding the fault, the fix, and what to do if it returns.",
      "The DNO (Distribution Network Operator) is the company that owns and maintains the local low-voltage and medium-voltage distribution network — the poles, cables and substations between the National Grid and the customer meter. There are six DNO regions in Great Britain (UK Power Networks, Northern Powergrid, SP Energy Networks, Electricity North West, National Grid Electricity Distribution, SSEN). The DNO is NOT the supplier — the supplier sends the customer bill but does not own wires. You find the DNO from the postcode (the ENA Distribution map) or from the MPAN supply number at the customer meter (digit 1 of the bottom-line MPAN identifies the supply area). G98 / G99 notifications go to the relevant DNO, not to OFGEM, not to the supplier.",
      "FAIL — well above the BS 7671 Table 41.3 maximum of 1.37 Ω for B32 at 0.4 s disconnection. The protective device cannot guarantee disconnection within the required time. Action: (1) Verify the reading. (2) Check supply Ze first — is the high Zs caused by high origin Ze (possible PEN issue) or by added impedance on the circuit (HRJ, undersized cable)? (3) Make safe — isolate the affected circuit. (4) Investigate and rectify. (5) Document as Code 1 if safety is at imminent risk; Code 2 if safety is compromised but not immediately dangerous.",
      "Direct correlation but not identical. BS 7671 thresholds tell you whether something meets the standard. EICR codes (C1 / C2 / C3 / FI) tell you the safety implication: C1 (Danger Present — immediate action), C2 (Potentially Dangerous — urgent action), C3 (Improvement Recommended — further work advised), FI (Further Investigation needed). A FAIL on Zs gives a C1 or C2 depending on actual safety implication. A borderline pass gives a C3. The MFT measurement is the data; the EICR coding is the safety judgment based on the data + context.",
    ],
    correctAnswer: 1,
    explanation:
      "Customers regularly confuse DNO with supplier. The DNO is the wires company; the supplier is the bills company. The two do not always know what each other is doing. G98 / G99 notification is a wires-side activity — it goes to the DNO, who updates their network model. The supplier is only involved when the customer applies for the Smart Export Guarantee (SEG) tariff and needs an MPAN-linked export-capable smart meter.",
  },
  {
    id: 6,
    question:
      "When does an installer need to apply for G100 instead of G98 / G99?",
    options: [
      "Adding a battery changes the maximum potential export from the property and changes the inverter behaviour as seen from the network. ENA G98 (single-phase up to 16 A per phase) and G99 (above 16 A or three-phase) require the combined system to be notified. For a connect-and-notify install (G98) the installer notifies the DNO within 28 days of energising. For G99 the installer applies in advance and the DNO returns connection conditions before energising. The MCS-certified installer handles the paperwork; the apprentice should understand that the existing PV notification does not cover the added storage.",
      "The training-provider tutor first — they have responsibility for the quality of the apprentice's training experience and the authority to intervene with the employer. The apprenticeship agreement is a tripartite document (apprentice, employer, training provider) and the training provider can hold the employer to account on training delivery. If that doesn't resolve it, the apprentice can raise a formal grievance with the employer under the ACAS Code, escalate to ACAS conciliation, and ultimately to an employment tribunal.",
      "G100 (active export limitation scheme) applies where the customer wants to install a system bigger than the DNO would otherwise accept, on the basis that an active limiter will cap exported power to a level the network can accommodate. It is a way to install (say) a 12 kWp PV array on a network that cannot accept 12 kW export, by limiting export to 3.68 kW with self-consumption and battery storage soaking up the rest. G100 sits within the broader G99 process — the DNO Connection Offer will include the G100 export limit and the limiter type-test requirement. The L3 apprentice will not run the G100 application but should recognise it as the technical mechanism behind 'oversized array, limited export' designs.",
      "PAS 2035 (Publicly Available Specification — Retrofitting dwellings for improved energy efficiency) is the standard that governs domestic energy efficiency retrofit projects. It requires a 'whole-house' approach — fabric assessment, ventilation strategy, moisture risk management, and any retrofit measures (including heat pump installation) must be coordinated by a Retrofit Coordinator and designed by a Retrofit Designer. Required for grant-funded retrofits (ECO4, Boiler Upgrade Scheme in some cases, local authority schemes). Helps avoid the failure mode where a heat pump is fitted to an uninsulated leaky house and posts a poor SCOP. The MCS-certified heat pump installer works within the PAS 2035 framework on grant-funded projects.",
    ],
    correctAnswer: 2,
    explanation:
      "G100 is the 'how to limit export' technical specification that supports G99. Modern oversized PV-with-battery installs in suburban areas frequently rely on G100 because the local network cannot accept full inverter output. The customer gets the bigger system; the DNO gets the comfort that exports are capped.",
  },
  {
    id: 7,
    question:
      "What is the practical commissioning sequence for a G98 PV install?",
    options: [
      "Five categories. (1) FLUORESCENT BALLAST FAILURE — magnetic ballasts hum, electronic ballasts go silent and the lamp flashes; replacement standard. (2) STARTER FAILURE (older fluorescent) — the lamp tries to start repeatedly, eventually fails. (3) LED DRIVER FAILURE — fitting goes dark or starts flickering; many drivers are specific to the fitting (Aurora, Ansell, Bell, Forest Lighting); replacement requires matching driver to fitting. (4) LAMPHOLDER OXIDATION (especially GU10) — spring contacts arc, lamp fails to start; clean and re-seat or replace lampholder. (5) OVERLOADED CIRCUIT — too many LED drivers on a circuit designed for fluorescent; LED inrush causes nuisance trips.",
      "A boiler drives a wet heating system — pumps hot water around radiators / underfloor circuits and a hot-water cylinder. Typical output 10-50 kW, located in a utility room or outhouse, automatic fuel feed (auger from a hopper), automatic ignition, automatic ash handling. A stove is a room heater — radiates heat directly into the room it sits in, plus optional back-boiler for some hot water. Lower output (5-15 kW typical), manual loading (logs or pellets), no automatic ash removal. Different installation regulations, different MCS standards, different customer expectations.",
      "Three. (1) Field exposure limits — ICNIRP / HSE guidance on RF field strength; standby fields can couple to your body even when you're not in direct contact. (2) Pacemaker / metal implant warning — RF fields interfere with cardiac pacemakers and can heat metallic implants; warn anyone with implants to stay clear (signage at the equipment). (3) Capacitive discharge — RF tank circuits store significant energy in capacitor banks; isolation procedure includes wait period (manufacturer-specified, typically 5–15 minutes) for capacitor bleed before working near. The L3 apprentice doesn't typically commission RF equipment but does meet it on workshop sites; the precautions need to be respected.",
      "Standard sequence: (1) verify the AC isolator is OFF; (2) DC-side test the strings (Voc, Isc, polarity, insulation resistance to MCS MGD 003 / IEC 62446 method); (3) close the DC isolator and verify inverter starts up but does not export (AC still off); (4) close the AC isolator and verify the inverter synchronises and exports; (5) record kWh meter reading at handover; (6) MCS-certified installer files the G98 form with the DNO within 28 days; (7) provide the customer with the install pack including type-test certificate, MCS commissioning certificate and the EIC. The L3 apprentice contributes to steps 1-5 and learns the documentation pack from steps 6-7. Skipping the DC-side IR test is a common defect pickup on later EICRs.",
    ],
    correctAnswer: 3,
    explanation:
      "Commissioning sequence matters because the DC side stays live as long as light hits the array. The discipline of testing strings before closing the inverter is what protects the apprentice and the inverter. MCS MGD 003 codifies the method; IEC 62446 is the international equivalent that the test instruments are calibrated against.",
  },
  {
    id: 8,
    question:
      "What goes in the G98 install pack the customer should keep for life?",
    options: [
      "MCS commissioning certificate (the MCS-certified installer sign-off — required to claim Smart Export Guarantee tariff), the inverter type-test certificate, the array layout drawing, the single-line electrical schematic, the DC and AC isolator location plan, the BS 7671 EIC for the electrical work, the manufacturer manuals for inverter and panels, and the G98 notification copy filed with the DNO. The pack lives with the property — when the customer sells, the next owner needs it for their EICR and to maintain SEG eligibility. Lost packs cost real money to replace, especially the MCS commissioning certificate. Hand the pack over physically and email a digital copy.",
      "Near-miss = an unsafe condition or unsafe action that could have caused harm but didn't, by chance or by intervention. Examples in fault diagnosis — apprentice cuts a cable they thought was dead and it sparks (lucky there was no harm); a tool drops from a ladder onto an empty workspace; a meter is touched to a live conductor through poor probe technique. Near-miss reporting is the early-warning system — the same condition will eventually cause harm if not addressed. Most major incidents have a trail of near-misses preceding them (the 'Heinrich pyramid' or similar safety models). Reporting near-misses is normalised in safety-mature organisations; suppressing them (because of fear of blame) is the cultural pattern that precedes major incidents. The L3 apprentice's job is to report their near-misses honestly and to learn from others' reports.",
      "Trip-time test injects a calibrated residual current and measures how long the RCD takes to disconnect. BS 7671 Reg 643.7.3 maximums: at I∆n (rated trip current, e.g. 30 mA): ≤ 300 ms (general type, ≤ 40 ms for type S); at 1×IΔn: ≤ 40 ms (general type). Modern RCDs typically trip at I∆n in 10–30 ms — well under the limit. Slow tripping (&gt;50 ms at I∆n) indicates a failing RCD. The MFT (Megger MFT1741+) tests at multiple injection levels and at 0° / 180° phase angles — the slowest of the four readings is the recorded trip time.",
      "Two possibilities. (1) Active arc fault on the circuit — there's a real arc happening that the AFDD is correctly detecting and refusing to ignore. Investigate as a real fault: visual inspection, IR test, thermal imaging. (2) AFDD itself has failed in the 'trip' state — internal electronics fault. Test by removing the AFDD from the busbar (load disconnected) and trying to latch it; if it still won't latch, the AFDD is faulty and needs replacement. The L3 apprentice's protocol: investigate as real fault first; only if no fault is found, consider AFDD failure and substitute with known-good unit.",
    ],
    correctAnswer: 0,
    explanation:
      "The install pack is the customer evidence of a compliant install. They will need it on house sale, on EICR every five years, and on any SEG dispute with their supplier. The MCS commissioning certificate is the master document; everything else hangs off it. As an apprentice, treat the handover pack with the same care as you would the EIC itself.",
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
