/**
 * Module 2 · Section 3 · Subsection 1 — Solar PV overview for the L3 electrician
 * Maps to City & Guilds 2365-03 / Unit 301 / LO1 / AC 1.2
 *   AC 1.2 — "specify the main types, characteristics, and purposes of environmental
 *             technology systems"
 *
 * Layered depth: 2357 Unit 602 ELTK02 / AC 3.1 (fundamental operating principles) and
 * AC 3.2 (applications and limitations).
 *
 * Note: Unit 301 is a 6-AC overview unit. Detailed PV competence — array design, MCS
 * sign-off, string sizing, shading analysis, MCS Yield Calculator — belongs in MCS
 * standalone qual 2399, not 2365-03. This Sub gives the L3 electrician enough working
 * knowledge to be a competent installer-side hand on a PV install, not the lead
 * designer.
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
import { videos } from '@/data/study-centre/video-library';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'Solar PV overview (3.1) | Level 3 Module 2.3.1 | Elec-Mate';
const DESCRIPTION =
  'Solar PV system overview for the Level 3 electrician — DC array side, inverter, AC interface, BS 7671 Section 712 (extensively revised in A4:2026), MCS MIS 3002, ENA G98/G99 grid connection. The working knowledge to be a competent installer-side hand on a PV install without claiming MCS-designer competence.';

const checks = [
  {
    id: 'l3-m2-s3-sub1-pv-strings',
    question:
      'On a domestic PV install you see two strings of 8 panels each going into a single MPPT input on the inverter. Each panel is rated 400 W at 40 V Voc, 10 A Isc. What does that tell you about the DC voltage at the inverter input on a cold sunny morning?',
    options: [
      "Customer name and address; installer name and MCS certification number; install date; technology and rating (e.g. 5 kWp PV with 10 kWh battery); manufacturer and model details for the major components; performance estimate (annual generation kWh, SCOP, etc.); MCS Installation Standard reference (e.g. MIS 3002 v6.0); Workmanship Warranty period and what it covers; aftercare contact details. The certificate is the customer's proof of MCS-certified installation, used for BUS grant, SEG enrolment, manufacturer warranty registration and future house sale.",
      "Around 320 V at Vmp (8 panels × 40 V each in series), and the open-circuit voltage on a cold morning could push that toward 380-400 V due to the temperature coefficient of Voc (typically -0.3% per °C above 25°C). Strings put cells in series — voltages add. Two strings paralleled at the same MPPT contributes 20 A combined Isc but the same string voltage. The inverter's max DC input voltage spec must exceed the worst-case cold-morning Voc with margin. The DC isolator at the array must be rated for that voltage.",
      "Both can be held liable. The individual harasser is personally liable under s.110 (helping a discriminatory act). The employer is vicariously liable under s.109 for acts done by the employee 'in the course of employment'. The employer's defence is to show they took 'all reasonable steps' to prevent the conduct — i.e. proper policies, training, monitoring and enforcement. A claimant can name both the individual and the employer in the same claim.",
      "Panels are warrantied 25 years and often deliver useful output well beyond. Inverters are warrantied 5-12 years depending on type (string inverters typically 10-12 years; microinverters often 25 years). Most domestic PV systems will need at least one inverter replacement during the 25-year panel lifetime. The replacement is straightforward — disconnect old, fit replacement of compatible spec, recommission, update the EIC. The cost should be factored into the system's whole-life economic case rather than treated as a surprise.",
    ],
    correctIndex: 1,
    explanation:
      "DC string voltage is the textbook source of an electrocution risk on PV installs. Strings aren't 'low voltage' — a typical domestic string sits at 300-600 V DC even with the inverter off and the AC isolated. The DC isolator at the array end and the DC isolator at the inverter end must both be operated and locked-off before any work on the string. Cold morning + clear sky = highest open-circuit voltage; the temperature coefficient is published on every panel datasheet and the system designer accounts for it.",
  },
  {
    id: 'l3-m2-s3-sub1-g98-g99',
    question:
      'A customer asks you to install an 8 kWp PV array with a single-phase 7 kW inverter. What\'s the DNO notification path?',
    options: [
      "Construction site practice (HSE INDG291 and CDM-driven site rules) requires reduced low-voltage 110 V CTE (centre-tapped earthed) supplies for portable tools — fed by a site transformer. The voltage to earth is 55 V on each leg, which dramatically reduces shock energy if a tool fault develops. 230 V tools are not banned by statute but are considered the wrong tool for the construction environment under PUWER Reg 4 — and most principal contractors enforce 110 V as a site rule.",
      "Old radiators were sized for 70-80°C flow temperature from a gas boiler. To deliver the same heat output at lower flow temperature, the radiators need to be larger. If you ask a heat pump to drive undersized old radiators at 70-80°C flow, the temperature lift is much bigger than at 35-40°C flow — so the COP drops sharply. SCOP reflects the actual flow temperature the system runs at across the heating season. Properly designed heat-pump retrofits include a radiator survey and upsize plan, or convert to underfloor where possible.",
      "ENA Engineering Recommendation G99 — the 7 kW inverter exceeds the 16 A per phase G98 fast-track limit (3.68 kW at 230 V single-phase). G99 is a pre-installation application to the DNO, who will confirm or reject the connection based on the local network capacity. The application is normally submitted by the MCS-certified installer using the standard G99 application form. Without the G99 approval the DNO can require disconnection. G98 (notification within 28 days of commissioning) only applies to inverters at or below 16 A per phase per inverter.",
      "The multimeter has 10 MΩ input impedance and will read induced voltages and 'phantom' voltages that aren't a real source — it can show 30–80 V on a dead conductor that has nothing dangerous on it, leading you to assume the circuit is live when it isn't (a false positive). The two-pole tester has low input impedance (typically a few kΩ) and 'loads' the circuit — phantom voltages collapse to zero, real sources hold. GS38 specifically prefers two-pole testers for proving dead because the low impedance gives an unambiguous answer.",
    ],
    correctIndex: 2,
    explanation:
      "The 16 A per phase boundary is the practical line. A single-phase 16 A export = 230 V × 16 A = 3.68 kW. Most 4 kW inverters sit just below this (deliberately). Anything bigger needs G99 pre-approval. G99 can take weeks to months depending on network constraints; the customer needs to know the timeline before the installer commits to a fitting date. G98 / G99 replaced the older G83 / G59 in 2019 and now apply to all parallel-connected generators — PV, battery storage, micro-CHP, micro-wind.",
  },
  {
    id: 'l3-m2-s3-sub1-shading',
    question:
      'A 10-panel string runs across a roof and one panel sits in partial shadow from a chimney each afternoon. What\'s the realistic effect on the string output?',
    options: [
      "MCS-certified installers belong to an MCS umbrella scheme (NICEIC, NAPIT, ELECSA, Stroma, BBA HAPAS, etc.) — the umbrella scheme audits the installer, validates competence, processes commissioning certificates, and runs the customer-facing complaints framework. The umbrella scheme issues the MCS Commissioning Certificate based on the install pack the installer submits. MCS sits over the umbrella schemes — it is the standards body, not the certifying body. Without an active MCS umbrella scheme membership, the installer cannot issue MCS Commissioning Certificates, and the customer cannot claim Smart Export Guarantee tariff or Boiler Upgrade Scheme grant. The L3 apprentice will work under an MCS-certified installer's competence; you do not yet hold MCS certification yourself.",
      "Section 722 of BS 7671 (Electric vehicle charging installations) is the regulation anchor. It applies in addition to the rest of BS 7671 and covers the supply, the charging point, the protective measures (especially the PEN-fault and additional protection requirements), the cable rating and the means of isolation. A4:2026 has refined Section 722 alongside the broader updates around TN-C-S systems (now PNB) and AFDD requirements.",
      "Without bypass diodes or panel-level optimisation, the shaded panel limits the current through the entire string — like a kink in a hose. A 30% shade on one panel can drop the whole string output by 30% or more. Bypass diodes within each panel partially mitigate this by allowing current to bypass the affected substring. Panel-level optimisation (Tigo / SolarEdge / micro-inverter architecture) goes further — each panel runs at its own MPP regardless of neighbours. For a string-heavy install with predictable shading, the design choice of optimisers vs plain string matters more than the panel choice.",
      "Five-step. (1) VERIFY the reading — repeat the test; check leads / instrument condition; compare with second instrument if available. (2) IDENTIFY the failure mode — what does the unsatisfactory reading indicate (insulation breakdown, HRJ, polarity error, RCD slow trip)? (3) MAKE SAFE — isolate the affected circuit / component; label / signage if you'll be away from site. (4) DOCUMENT — record the failed reading, the verification, the action, on the job sheet AND inform customer in writing if Code 1 (Danger Present). (5) RECTIFY OR ESCALATE — fix if within competence; escalate to supervisor / specialist if not. Never leave a Code 1 fault unactioned even if outside the original call-out scope.",
    ],
    correctIndex: 2,
    explanation:
      "Shading is the headline real-world performance issue on UK roofs — chimneys, dormers, neighbouring trees, satellite dishes. The MCS Yield Calculator includes a shading factor based on the array's site survey. Where shading is hard to avoid, panel-level optimisation is usually specified at design stage. As an apprentice you don't choose the architecture but you should recognise the difference between a plain-string and an optimised installation when you see them on a roof.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'What\'s the basic chain of equipment on a typical UK domestic PV install, from sunlight to the consumer unit?',
    options: [
      "Generators (PV, wind, micro-CHP) put energy into the system that wasn't there before from the user's point of view. Demand-reduction tech (LED lighting, smart controls, MVHR, insulation) makes the existing energy do more useful work. From a carbon perspective the cheapest watt is the one you don't use — demand reduction usually has a shorter payback than generation. From a Building Regs perspective both count toward Part L compliance via the SAP / SBEM calculation.",
      "Sunlight → silicon cells → DC voltage in panel → DC string conductors (panels in series) → DC string isolator at the array → inverter (MPPT, DC-AC conversion) → AC isolator at the inverter → MID-compliant generation meter → AC isolator at the consumer unit (or directly into a dedicated MCB) → consumer unit / DNO supply. Earth-bonding of the array frame to MET; labels at each isolator; manufacturer's signage at the meter position. Battery storage adds a DC battery and BMS in parallel with the inverter (hybrid topology) or a separate AC-coupled battery inverter.",
      "Test instruments drift over time — components age, shock and vibration cause small errors. A drifted instrument produces wrong test results that fail BS 7671 Chapter 61 verification. Annual calibration to a UKAS-traceable standard (with a calibration certificate) is the standard requirement. NICEIC, NAPIT and ELECSA all check for in-date calibration certificates at scheme audit; an out-of-date instrument used to demonstrate compliance invalidates the certificate it was used to produce.",
      "AVERAGING — measures the average of the rectified waveform and multiplies by a form factor (1.11 for sine wave) to give 'RMS equivalent'. Accurate for pure sine waves; under-reads for distorted waves (LED drivers, VFDs, switching power supplies). TRUE RMS — measures the actual heating effect of the waveform, accurate for any wave shape. For modern installations heavy with electronic loads (LEDs, VFDs, IT equipment), TRMS is essential — average-reading instruments can under-read by 20–40% on harmonic-rich circuits and miss nuisance-trip-causing voltage spikes.",
    ],
    correctAnswer: 1,
    explanation:
      "The chain matters because each link has its own isolation point and labelling requirement. BS 7671 Section 712 requires multiple means of isolation, both DC and AC, to enable safe maintenance. The MCS Code requires durable signage at the meter position warning a maintainer that there is a parallel generation source on site.",
  },
  {
    id: 2,
    question:
      'Why does the inverter in a grid-tied PV install need to "follow" the grid, and what happens if the grid fails?',
    options: [
      "Because the install is a long-lived asset that will outlast the original installer's involvement. Notices communicate critical information — main earth location, RCD test interval, mixed supplies, isolator function — to whoever interacts with the install in future, including the customer in an emergency, the next electrician on a fault visit, and the EICR engineer in five years' time. The labels are how the install talks to people when the original installer isn't there.",
      "You can't make someone seek help, but you can keep listening, keep checking in, and keep signposting gently. Suggest the Lighthouse Club 24/7 helpline (0345 605 1956) — confidential, no referral needed, no qualifying period. Mention Samaritans (116 123). Mention Mates in Mind resources. Don't break their confidence without asking, but if you genuinely believe they're at imminent risk of harm to themselves, the right thing is to call 999 or take them to A&E — that's a safeguarding step, not a betrayal. Look after yourself too — supporting a peer can be heavy. The same charities are available to you.",
      "A grid-tied (parallel-connected) inverter synchronises its output voltage and frequency to the grid using the grid as its reference. When the grid fails, the inverter must disconnect (anti-islanding protection) — it cannot legally continue exporting into a dead network because that would put live voltage onto cables that the DNO has isolated for fault repair, putting linespeople at risk. ENA G98/G99 specifies the loss-of-mains detection settings (vector shift, ROCOF, voltage and frequency limits). Without backup hardware, when the grid drops the PV stops — the customer's house goes dark even with sun on the roof.",
      "Same as PV — durable warning signs notifying anyone working on the installation that there is a parallel generation source on site. Signs at the consumer unit, at the main isolation, at the inverter and at any DC isolators. Wind connections fall under the same ENA G98 (≤16 A per phase) or G99 (&gt;16 A per phase) framework as PV. The DNO needs to know the installation exists; the maintainer who turns up to a fault call needs to know there's a parallel generator.",
    ],
    correctAnswer: 2,
    explanation:
      "Anti-islanding is a safety-critical function. It's tested at commissioning and verified at periodic inspection. Customers who want backup operation (lights stay on in a power cut) need either a hybrid inverter with islanded operation, or a separate ATS-and-battery arrangement. The MCS installer specifies and configures both; the apprentice should recognise the limitation when explaining to customers why their PV isn't giving them backup.",
  },
  {
    id: 3,
    question:
      'What\'s the safe approach to the DC side of a PV array if you have to work near it?',
    options: [
      "All charge points sold for use in domestic and workplace settings in Great Britain must be 'smart' — capable of being scheduled, default off-peak charging hours pre-set, randomised delay function (to avoid grid spikes when half a million chargers turn on at midnight), data privacy / cybersecurity baseline, and a 'safety provision' that disconnects on certain fault detections. Compliance is a condition of sale; the installer should fit a unit that the manufacturer has self-certified as Regulations-compliant. The apprentice does not need to verify each technical clause but should recognise that any new domestic install is using a smart-compliant unit.",
      "Six fault-specific categories on top of the generic shock + arc + burn list: (1) hidden parallel paths and borrowed neutrals, (2) induced voltages from adjacent live circuits, (3) capacitive / inductive stored energy in equipment, (4) compromised protective conductors (CPC missing or high-resistance), (5) compromised supply earthing (open PEN, lost main earth), (6) unverified circuit identification (the breaker label says 'lights' but actually feeds the boiler). All six are present BECAUSE the system is in fault — the fault itself created or revealed the hazard.",
      "PPE Regs Reg 7 places a duty on the employer to maintain (and replace) PPE. The corresponding duty on the employee under Reg 10 is to use the PPE in accordance with training and to report any loss of, or obvious defect in, the PPE. Damaged PPE doesn't provide the rated protection — a cracked safety glass lens, a dust mask with a broken strap, a hi-vis with the reflective material peeling off — all need to be taken out of service and replaced before use.",
      "Treat the DC side as live until proven dead with a meter rated for the voltage. The DC isolator at the array end and the DC isolator at the inverter end must both be operated and locked-off, then verify dead with a meter at both ends of the string. Even with the inverter AC-side isolated and switched off, the array continues to generate as long as light hits the panels. Covering the panels reduces but does not eliminate the DC output. Inverter manufacturer's instructions usually require a dwell time after isolation to allow internal capacitors to discharge.",
    ],
    correctAnswer: 3,
    explanation:
      "PV is the most under-rated electrocution risk in the trade. The DC voltages are non-trivial (300-600 V is typical), the DC arc behaviour is different from AC (no zero-crossing means an arc keeps going once started), and the source is essentially impossible to switch off — you can only isolate the conductors. Always work to a safe-isolation procedure with a tested meter, and treat the DC side as a separate isolation problem from the AC side.",
  },
  {
    id: 4,
    question:
      'On a UK domestic PV install, which document covers installer competence and which document covers the electrical design?',
    options: [
      "MCS MIS 3002 is the installer-competence and installation-quality standard for solar PV. BS 7671 Section 712 is the electrical-design standard for the wiring, protection, isolation and labelling. Both apply on every install. MIS 3002 references BS 7671 explicitly for the electrical detail; BS 7671 applies regardless of whether the install is MCS-certified. MCS certification is required if the customer wants Smart Export Guarantee payments; BS 7671 compliance is required because it's the electrical regulation.",
      "The RAMS is the documented safe system of work for the task. Substituting a step ladder for a podium is a deviation from the documented control. Either the podium gets sourced, or the RAMS gets formally amended and re-signed before any work proceeds. Verbally working around the document leaves you outside the safe system of work — and outside any legal protection if something goes wrong. WAHR 2005 Reg 6 puts the duty on the employer to use the most suitable equipment.",
      "You don't have to break the circuit — the clamp meter senses the magnetic field around the conductor and reads the current without electrical contact. Faster, safer (no need to disconnect), and possible on energised circuits without isolation. Standard for measuring load currents at distribution boards, on submains, on motor circuits, and for energy auditing. Most modern clamp meters also have voltage and continuity functions, making them effectively a multimeter + clamp in one.",
      "The certificate references the edition in force on the date of installation (e.g. BS 7671:2018+A4:2026). Subsequent amendments don't make the install non-compliant retrospectively, but they DO change what's required for any future addition / alteration / EICR you do on the same installation. Periodic inspection (EICR) is carried out to the standard in force at the time of the inspection — so a 2026 install will be EICR'd against whatever amendment is current in 2031.",
    ],
    correctAnswer: 0,
    explanation:
      "MIS 3002 is the most recent revision of the MCS PV installation standard — covers site survey, design, installation quality, commissioning, handover and labelling. Section 712 is the BS 7671 chapter for PV electrical design. The two standards work together: MIS 3002 says 'comply with BS 7671'; BS 7671 Section 712 provides the electrical detail. Section 712 was extensively revised in the A4:2026 amendment.",
  },
  {
    id: 5,
    question:
      'What\'s the practical effect of orientation and pitch on UK PV yield?',
    options: [
      "The multimeter has 10 MΩ input impedance and will read induced voltages and 'phantom' voltages that aren't a real source — it can show 30–80 V on a dead conductor that has nothing dangerous on it, leading you to assume the circuit is live when it isn't (a false positive). The two-pole tester has low input impedance (typically a few kΩ) and 'loads' the circuit — phantom voltages collapse to zero, real sources hold. GS38 specifically prefers two-pole testers for proving dead because the low impedance gives an unambiguous answer.",
      "Significant. A south-facing roof at 30-40° pitch is the optimal UK orientation, posting 100% of reference yield. East-facing or west-facing roofs typically produce 80-85% of optimal. North-facing produces 50-65% (still positive but with much longer payback). Steeper pitches favour winter performance; shallower pitches favour summer performance. Flat roofs get an A-frame mount to set a target pitch and azimuth. The MCS Yield Calculator handles all of this — produces the kWh figure for the SAP and the customer handover.",
      "No. EAWR Reg 14(c) requires 'suitable precautions including where necessary the provision of suitable protective equipment'. The risk being 'low' doesn't dispense with the precaution — it informs which precaution. For 230 V live work, Class 0 insulated gloves (rated 1000 V AC) plus insulated tools are the standard precaution. The senior is exposing both themselves and the firm to liability under EAWR (failure to take suitable precautions) and HSWA Section 7 (employee duty to take reasonable care of own and others' safety). The apprentice's defence: 'I followed the firm's PPE matrix' — so make sure there IS one and it specifies gloves for live work.",
      "Durable warning signs notifying anyone working on the installation that there is a parallel generation source on site. Signs at the consumer unit / meter, at the main isolation, at the inverter and at the DC isolators. The Distribution Network Operator's emergency contacts. The PV system identification (kWp rating, inverter manufacturer/model). The signage requirements come from BS 7671 Section 712, MCS MIS 3002 and the DNO's G98/G99 connection conditions. A future maintainer who turns up to a 'normal' fault call must know there's a generator on the property.",
    ],
    correctAnswer: 1,
    explanation:
      "South + 30-40° is the UK optimum because the roof catches the sun's mid-day arc through most of the year. The ±15-20° latitude band where most UK roofs sit gives plenty of east-facing and west-facing options that still post viable yields. Customers fixated on 'south or nothing' often miss good east-or-west opportunities. The MCS calculator gives the realistic figure for any orientation.",
  },
  {
    id: 6,
    question:
      'Why are dual-MPPT inverters often preferred over single-MPPT for UK domestic installs?',
    options: [
      "Pre-Construction Information is the H&S information that the Client (with help from the Principal Designer) provides to designers and contractors before they start on the project. It covers the site (location, existing structures, services, ground conditions), the project (description, programme, key dates, design assumptions), the relevant H&S information (asbestos surveys, condition reports, environmental risks) and the Client's H&S file from any previous works.",
      "Fluorescent tubes (mercury-containing, EWC 20 01 21* — the asterisk denotes hazardous), oil-filled transformers and capacitors containing PCBs (EWC 16 02 09*), batteries containing lead, mercury or cadmium (EWC 16 06 01* and similar), asbestos-cement consumer unit backplates from older installations (EWC 17 06 05*), and waste oils. The asterisk in the EWC code is the marker for absolute hazardous waste.",
      "They allow two independent strings to run at their own MPP. A roof with both an east-facing and a west-facing slope gets one string per slope, each tracked independently — the east string MPPs in the morning, the west string MPPs in the afternoon, and the inverter combines the AC outputs. Without dual-MPPT, mixing east and west panels in one string forces a compromise MPP that wastes 10-20% of the available energy. Many domestic UK installs benefit from dual-MPPT given typical roof geometries.",
      "Coaching focuses on individual development (asking \\\\\\\"what do you want to become?\\\\\\\" and helping bridge the gap through challenging assignments and feedback), while affiliative focuses on team harmony and emotional bonds (asking \\\\\\\"how is everyone feeling?\\\\\\\" and strengthening connections). Coaching is most appropriate for developing potential; affiliative is most appropriate for healing rifts or building morale",
    ],
    correctAnswer: 2,
    explanation:
      "Dual-MPPT inverters are now standard on most domestic units. The cost premium over single-MPPT is small and the design flexibility is significant. As an apprentice you should recognise the inverter spec sheet's MPPT count — it tells you how many independent string groups the design can use.",
  },
  {
    id: 7,
    question:
      'What signage is required at the consumer unit / meter position on a PV-installed property?',
    options: [
      "Three steps. (1) MINIMISE the damage during the work — score around the tile carefully; remove only the affected tile(s); save them for re-fit if intact. (2) MAKE SAFE the tile area — no exposed substrate, no sharp edges, no water-ingress path. (3) BRIEF THE CUSTOMER — explain what tiles were affected; recommend a tiler for re-fit (referrals are good business); document the damage on the job sheet. The electrician doesn't normally re-tile (specialist trade with tile-cutting tools, adhesives, grout) but is responsible for minimising damage AND informing the customer.",
      "Because EAWR is the trade-specific instrument made under HASAWA's enabling powers (s.15) — but HASAWA's general duties (s.2, s.3, s.7) sit underneath the EAWR breach as the broader safe-system / personal-duty obligations. Charging both gives the prosecution two routes to conviction and lets the court assess culpability across both the specific technical reg AND the broader systems-of-work failure.",
      "(a) To use any machinery, equipment, dangerous substance, transport equipment, means of production or safety device provided in accordance with any training in the use of that equipment and the instructions respecting that use; AND (b) to inform the employer of any work situation which a person with the training and instruction given to them would reasonably consider represented a serious and immediate danger to health and safety, AND of any matter which a person with the training given would reasonably consider represented a shortcoming in the employer's protection arrangements.",
      "Durable warning signs notifying anyone working on the installation that there is a parallel generation source on site. Signs at the consumer unit / meter, at the main isolation, at the inverter and at the DC isolators. The Distribution Network Operator's emergency contacts. The PV system identification (kWp rating, inverter manufacturer/model). The signage requirements come from BS 7671 Section 712, MCS MIS 3002 and the DNO's G98/G99 connection conditions. A future maintainer who turns up to a 'normal' fault call must know there's a generator on the property.",
    ],
    correctAnswer: 3,
    explanation:
      "Signage saves lives. A maintainer arriving to investigate a fault and finding a 'just a normal property' assumption can put themselves at risk if they don't know the inverter is feeding a parallel supply. The MCS Code of Practice specifies the durable label format; BS 7671 Section 712 references the requirement; the DNO's connection conditions reinforce it.",
  },
  {
    id: 8,
    question:
      'What\'s the realistic carbon and financial payback for a UK domestic PV install?',
    options: [
      "Carbon payback for typical UK PV is 1-3 years (the time taken for operating CO₂ savings to offset the manufacturing CO₂ cost). Financial payback depends on system cost, self-consumption, export tariff and electricity price — typically 6-12 years for a standalone PV install in 2026, often shorter if a battery is added (improves self-consumption from 25-40% to 70-90%). After payback the system continues for the rest of its 25-year warranted life essentially as free energy. The carbon case is much stronger than the financial case in isolation; together they make PV the dominant UK domestic environmental tech.",
      "Two reasons. (1) Auditability — readings are stored against a circuit ID and timestamp, providing tamper-evident evidence at scheme audit and dispute. (2) Cert generation — test results download directly into certificate software (NICEIC PartnerNet, NAPIT, custom firm software, Elec-Mate) and auto-populate the EIC / EICR test schedule, eliminating transcription errors. The combination saves the time previously spent hand-writing and double-checking test schedules.",
      "Pregnancy and maternity (s.18). The Act prohibits unfavourable treatment of women because of pregnancy or maternity leave during the 'protected period' (broadly, from the start of pregnancy to the end of maternity leave). This is a separate category to sex discrimination — pregnancy / maternity claims don't need a male comparator. It's one of the most enforced parts of the Act and a leading source of Employment Tribunal awards.",
      "Six triggers. (1) Cost decision &gt; £500 (budget threshold typically defined by firm policy). (2) Code 1 / Code 2 EICR finding requiring engineering judgment on coding. (3) Engineering compromise that may not be straightforward compliance. (4) Customer dispute about scope or quality. (5) Specialist work outside L3 competence (HV, three-phase plant, BMS, fire alarm signal-only work). (6) Anything you're not sure about. Escalation is competence, not weakness — the EAWR Reg 16 'competent person' duty includes knowing where your competence stops. The supervisor is paid to make the harder calls.",
    ],
    correctAnswer: 0,
    explanation:
      "Carbon payback figures come from manufacturer LCA studies and academic reviews (typically 1-3 years on UK grid mix). Financial payback figures shifted in 2022-2023 with electricity price spikes — at 30p/kWh import the payback shortens significantly. The MCS install handover includes a Performance Estimate that gives the customer realistic numbers; the apprentice should reinforce these, not over-promise.",
  },
];

const faqs = [
  {
    question: "What's the difference between mono-crystalline, polycrystalline and thin-film PV panels?",
    answer:
      "Different cell technologies. Mono-crystalline (cells cut from a single silicon crystal) has the highest efficiency (typically 20-22%) and is the dominant technology in 2026. Polycrystalline (multiple silicon crystals fused) was cheaper but lower efficiency (15-17%) — largely outcompeted now. Thin-film (amorphous silicon, CdTe, CIGS) has lower efficiency but performs better in low light and at higher temperatures — used in some commercial / utility-scale applications, rare on UK domestic. The MCS-certified designer chooses the panel; the apprentice should recognise the spec sheet differences.",
  },
  {
    question: "Why does the inverter sometimes derate (output less than the DC available)?",
    answer:
      "Several reasons. Heat — inverters derate when their internal temperature rises above design limits (usually mid-summer afternoon on south-facing arrays). DC over-voltage — if the array Voc exceeds the inverter's max DC input. Grid frequency excursion — under G98/G99 the inverter must reduce output if grid frequency rises above set thresholds (a network-stability mechanism). Customer monitoring may show 'lost generation' on hot days; this is normal and unavoidable beyond a certain point. System design accounts for it via the inverter:array ratio (often 0.85-0.95 — i.e. inverter slightly smaller than array kWp).",
  },
  {
    question: "Should the customer expect their meter to 'spin backwards' with PV?",
    answer:
      "No. UK electronic meters do not spin backwards — they have separate import and export registers. The Smart Export Guarantee (SEG) requires a smart meter that can record export for the supplier to pay the export tariff. Some older import-only meters need replacing for the customer to claim SEG payments. The MCS installer arranges meter replacement as part of the install; the customer signs up for the SEG scheme separately with their chosen supplier.",
  },
  {
    question: "Can I leave the inverter switched on while I work on the AC side?",
    answer:
      "No. Safe isolation is non-negotiable. The procedure is: AC isolator off and locked-off, DC isolator at the inverter off and locked-off, DC isolator at the array off and locked-off, verify dead with a tested meter at every accessible isolation point. The DC side remains live as long as light hits the panels — the AC isolation alone is not safe isolation of the DC side. The inverter manufacturer's instructions specify a dwell time after isolation for internal capacitors to discharge.",
  },
  {
    question: "How long do PV panels actually last?",
    answer:
      "Manufacturer warranties are typically 25 years on output (90% of nameplate at year 10, 80% at year 25). Real-world degradation is usually 0.5% per year or less for quality panels. Inverters are typically warranted 5-12 years and may need replacement once during the panel lifetime. Battery warranties are typically 10 years or 6,000-10,000 cycles. The customer's expected life of the asset should reflect these realities — PV is a 25+ year decision; battery is a 10-15 year decision; inverter is a mid-life replacement.",
  },
  {
    question: "If the customer asks me about MCS, what's the honest answer for the apprentice?",
    answer:
      "MCS isn't a regulatory requirement to install — but it is a financial requirement for the customer to claim Smart Export Guarantee payments and was historically required for the Renewable Heat Incentive and Feed-in Tariff. Without MCS sign-off the customer can still have a working PV system; they just don't get paid for export. Most install firms are MCS-certified. The MCS installer is responsible for the design, the MCS handover pack and the SEG-compliant labelling. As an apprentice on the install you work to the certified installer's design; you don't sign off the MCS paperwork yourself unless you're personally certified.",
  },
];

export default function Sub1() {
  const navigate = useNavigate();
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module2-section3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 3
          </button>

          <PageHero
            eyebrow="Module 2 · Section 3 · Subsection 1"
            title="Solar PV — system overview for the L3 electrician"
            description="DC array, inverter, AC interface, BS 7671 Section 712 (extensively revised in A4:2026), MCS MIS 3002, ENA G98/G99 grid connection. Working knowledge to be a competent installer-side hand on a PV install — not the lead designer."
            tone="emerald"
          />

          <TLDR
            points={[
              "PV chain — sunlight → DC string → inverter → AC isolator → meter → consumer unit. Every isolation point needs labelling, every conductor needs sizing.",
              "DC strings sit at 300-600 V even with the inverter off and the AC isolated. DC isolation is a separate problem from AC isolation; both must be locked-off before any work on the string.",
              "G98 fast-track applies up to 16 A per phase per inverter (3.68 kW single-phase). G99 pre-application required above that. Both are downstream of the ENA Engineering Recommendations.",
              "MCS MIS 3002 covers installer competence; BS 7671 Section 712 covers electrical design. Both apply on every install. MCS is the gateway to Smart Export Guarantee payments.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Describe the equipment chain on a typical UK domestic PV install — DC array, string isolator, inverter, AC isolator, generation meter, consumer unit.",
              "Identify the DC voltage hazard on a PV string and apply a safe-isolation procedure that addresses both DC and AC sides.",
              "Distinguish ENA G98 fast-track notification from G99 pre-application based on inverter rating per phase.",
              "Recognise BS 7671 Section 712 (extensively revised in the A4:2026 amendment) as the electrical regulatory home for PV.",
              "Recognise MCS MIS 3002 as the installer-competence and installation-quality standard for PV; understand its role in Smart Export Guarantee eligibility.",
              "Identify the role of dual-MPPT inverter architecture and panel-level optimisation in addressing real-world UK roof shading and orientation constraints.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The equipment chain</ContentEyebrow>

          <ConceptBlock
            title="Sunlight in, AC out — the chain of equipment"
            plainEnglish="A typical UK domestic PV install runs from sunlight on the panels through a DC string to the inverter, then from the inverter as AC through an isolator and a meter into the consumer unit. Battery storage adds a parallel DC battery and BMS (hybrid topology) or a separate AC-coupled battery inverter."
            onSite="Each link in the chain has its own isolation point and its own labelling requirement. The DC isolation problem is distinct from the AC isolation problem — you have to address both before working on any part of the system. The MCS-certified designer specifies the equipment; you fit, terminate and verify."
          >
            <p>
              The chain in detail:
            </p>
            <ol className="space-y-2 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Panels</strong> — silicon cells in a sealed module. Wired in series
                inside the panel; multiple panels wired in series via MC4 connectors to form
                a DC string.
              </li>
              <li>
                <strong>DC string isolator at the array</strong> — typically rooftop or
                immediately accessible, rated for the string's worst-case open-circuit
                voltage. Allows the array to be isolated from the inverter for maintenance.
              </li>
              <li>
                <strong>DC string conductors</strong> — UV-stable solar cable (typically 4 mm²
                or 6 mm² double-insulated DC cable), routed from array to inverter.
              </li>
              <li>
                <strong>Inverter</strong> — converts DC to grid-synchronised AC. Modern units
                are dual-MPPT (two independent string inputs), 3-10 kW for domestic. Located
                indoors in a ventilated location, typically a utility room, garage or loft.
              </li>
              <li>
                <strong>AC isolator at the inverter</strong> — local, accessible, allows the
                inverter to be isolated from the AC side without opening the consumer unit.
              </li>
              <li>
                <strong>Generation meter (MID-compliant)</strong> — Smart Export Guarantee
                requires accurate export measurement. Many installs use a smart meter for
                both import and export.
              </li>
              <li>
                <strong>Connection to the consumer unit</strong> — dedicated MCB, RCD per BS
                7671, durable warning signage at the CU and meter position.
              </li>
            </ol>
          </ConceptBlock>

          <VideoCard
            url={videos.inverter.url}
            title={videos.inverter.title}
            channel={videos.inverter.channel}
            duration={videos.inverter.duration}
            topic="Solar PV inverter — DC to grid-quality AC"
            caption="The inverter is the heart of the PV install — taking variable DC from the array and synthesising a 230 V 50 Hz sinusoid that the consumer unit can accept. Understanding the inverter is the foundation for everything else on the AC side."
          />

          <SectionRule />

          <ContentEyebrow>The DC side — voltages and isolation</ContentEyebrow>

          <ConceptBlock
            title="DC isolation is a separate problem from AC isolation"
            plainEnglish="On a typical 3-6 kW domestic PV install the DC string voltage sits at 300-600 V whenever the panels see daylight. That voltage is independent of the AC side — switching off the inverter, isolating the AC at the consumer unit, even pulling the main switch on the property does nothing to the DC voltage on the array conductors. You isolate the DC by operating the DC string isolator and locking it off, then verifying dead with a tested meter at each end of the string."
            onSite="DC arc behaviour is different from AC. Without the AC zero-crossing to extinguish an arc, a DC arc once started will continue burning until the conductors physically separate. That\'s why DC isolators are constructed differently from AC isolators (multiple breaks, magnetic blow-out, designed for the DC interrupting duty). Never use an AC-rated isolator on a DC circuit."
          >
            <p>
              Safe isolation procedure for PV:
            </p>
            <ol className="space-y-2 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                AC isolator at the consumer unit off and locked-off.
              </li>
              <li>
                AC isolator at the inverter off and locked-off.
              </li>
              <li>
                DC isolator at the inverter off and locked-off.
              </li>
              <li>
                DC isolator at the array (rooftop or accessible location) off and locked-off.
              </li>
              <li>
                Wait for the inverter dwell time per manufacturer\'s instructions (allows
                internal DC capacitors to discharge — typically 5-15 minutes).
              </li>
              <li>
                Verify dead with a tested meter at the DC inverter terminals and the AC
                inverter terminals. Test the meter on a known live source before and after.
              </li>
              <li>
                Apply lock-out tag and proceed.
              </li>
            </ol>
            <p>
              Covering the panels with opaque material reduces but does not eliminate the DC
              output. Diffuse daylight at low light levels still produces a non-trivial Voc.
              Always treat the DC side as live until proven dead with a meter.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The grid-connection regime</ContentEyebrow>

          <ConceptBlock
            title="ENA G98 fast-track vs G99 pre-application"
            plainEnglish="Every parallel-connected generator in the UK — PV, battery, micro-CHP, micro-wind — connects under one of two ENA Engineering Recommendations. G98 is a fast-track notification process for inverters at or below 16 A per phase per inverter (3.68 kW single-phase). G99 is a pre-application process for anything bigger; the DNO will assess local network capacity and either approve, request modifications, or in rare cases require network reinforcement before connection."
            onSite="The MCS-certified installer submits the G98 / G99 paperwork — not the apprentice. But you should know which scheme applies and what the timeline is. G98 is essentially a \'fit and tell' (notify within 28 days of commissioning) and is the default for most domestic PV. G99 can take weeks to months and the customer\'s commission date depends on DNO approval."
          >
            <p>
              The 16 A per phase boundary in numbers:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Single-phase G98 limit</strong> — 16 A × 230 V = 3.68 kW per inverter.
                Most 4 kW inverters quote 3.68 kW max output to stay G98-eligible.
              </li>
              <li>
                <strong>Three-phase G98 limit</strong> — 16 A × 230 V × 3 = 11.04 kW total.
                Some installers split a larger system into multiple G98 inverters to avoid
                G99.
              </li>
              <li>
                <strong>G99 above 16 A</strong> — pre-application required, DNO assesses
                network capacity, may require connection at higher voltage if local
                constraints apply.
              </li>
              <li>
                <strong>Storage included</strong> — battery storage with grid-export
                capability falls under the same G98/G99 rules. The total combined export
                capacity matters, not just the PV inverter rating.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="ENA Engineering Recommendation G98 (Issue 1, Amendment 7) / G99 — paraphrased"
            clause={
              <>
                <p className="mb-2">
                  <strong>G98</strong> — applies to fully-type-tested generators with output up
                  to and including 16 A per phase per inverter. Connection notification can be
                  made after commissioning (within 28 days). The DNO does not pre-approve the
                  connection.
                </p>
                <p>
                  <strong>G99</strong> — applies to generators above 16 A per phase, and to
                  all generators (regardless of size) at sites where pre-existing G98 or G99
                  generators already exist. Pre-application required; the DNO assesses local
                  network capacity and confirms or qualifies the connection.
                </p>
              </>
            }
            meaning={
              <>
                The G98 / G99 split is the operational reality of grid-connecting any
                parallel generator in the UK. Most domestic PV (≤4 kW per inverter, single-
                phase) sits comfortably in G98. As soon as the inverter exceeds 3.68 kW, or
                the system has a battery with export capability that combines with PV to
                exceed 16 A per phase, G99 kicks in. The MCS installer manages the
                application; the apprentice needs to recognise which regime applies and the
                associated timeline implications for the customer.
              </>
            }
            cite="Source: ENA Engineering Recommendation G98 / G99 — paraphrased from the published recommendations available via the Energy Networks Association."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Real-world UK roof constraints</ContentEyebrow>

          <ConceptBlock
            title="Orientation, pitch, shading — what eats yield in practice"
            plainEnglish="Manufacturer kWp ratings assume Standard Test Conditions; UK roofs almost never see those conditions. The two big real-world constraints on yield are roof orientation/pitch and partial shading. Both are captured in the MCS Yield Calculator that the certified installer runs at design stage."
            onSite="A south-facing roof at 30-40° pitch is the UK optimum. East / west typically posts 80-85% of optimum; north 50-65% (still positive but slow payback). Partial shading from chimneys, dormers, neighbouring trees, satellite dishes and adjacent buildings can knock 20-50% off string output if not addressed by panel-level optimisation."
          >
            <p>
              How the design choice responds:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Plain string</strong> — cheapest, simplest. Suits unshaded uniform
                roofs. Shading on one panel impacts the entire string.
              </li>
              <li>
                <strong>Bypass diodes within each panel</strong> — partially mitigates
                shading by allowing current to bypass affected substrings. Standard on all
                modern panels.
              </li>
              <li>
                <strong>Power optimisers (Tigo, SolarEdge)</strong> — DC-DC converter behind
                each panel. Each panel runs at its own MPP. String inverter sees an
                aggregated MPP. Costs more, recovers shading losses well.
              </li>
              <li>
                <strong>Micro-inverters (Enphase)</strong> — full DC-AC conversion behind
                each panel. AC string back to the consumer unit. No high-voltage DC anywhere
                except inside the panel. Highest cost, simplest topology, best per-panel
                monitoring.
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

          <ContentEyebrow>BS 7671 Section 712 — the electrical regulatory home</ContentEyebrow>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Section 712 Solar photovoltaic (PV) power supply systems"
            clause={
              <>
                Section 712 contains particular requirements for PV installations. The
                requirements apply to PV installations not connected to public distribution,
                in parallel with public distribution, and as an alternative to public
                distribution. The technical content was extensively revised and expanded in
                the A4:2026 amendment.
              </>
            }
            meaning={
              <>
                Section 712 sits in Part 7 of BS 7671 (Special Installations or Locations) and
                applies in addition to the general requirements of Parts 1-6. Topics covered
                include array voltage and isolation, DC and AC overcurrent protection,
                additional protection by RCD where required, equipotential bonding of array
                frames, signage and labelling, anti-islanding requirements at the AC
                interface, and the inspection-and-test requirements specific to PV. The A4:
                2026 revision strengthened several areas — designers and installers
                must apply the current text. Detailed application is taught in MCS qual 2399.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Section 712 (paraphrased from the published amendment text)."
          />

          <SectionRule />

          <ContentEyebrow>Panel technology — mono PERC, half-cut, bifacial</ContentEyebrow>

          <ConceptBlock
            title="Modern UK PV panels are almost universally mono PERC half-cut, often bifacial"
            plainEnglish="The panels you will see on a 2024-2026 UK domestic install are almost all monocrystalline silicon with PERC (Passivated Emitter Rear Cell) architecture, half-cut cells (each cell physically split in half to halve the current per cell and reduce I2R losses), and increasingly bifacial construction (the back of the panel also generates from reflected light). Typical 400-450 W per panel at module level; modules typically 1.7 m by 1.1 m."
            onSite="The L3 apprentice does not need to choose the panel — that is the MCS-certified designer&apos;s scope. But you should recognise the kit you are mounting and the module data sheet you are reading. Module open-circuit voltage (Voc), short-circuit current (Isc), maximum power point voltage (Vmpp) and current (Impp), temperature coefficients and module dimensions all matter for the system designer; the apprentice ensures the modules fitted on site match those specified in the design (substituting a different module changes the string voltage and current, which can break inverter compatibility and string fusing assumptions)."
          >
            <p>
              The panel landscape in 2026:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Monocrystalline PERC</strong> — the dominant cell architecture.
                Higher efficiency (20-22%) than older polycrystalline (15-17%).
                Black appearance.
              </li>
              <li>
                <strong>Half-cut cells</strong> — each cell physically split in half,
                wired to halve current per cell. Lower I2R losses, better partial-shade
                tolerance, slightly higher module efficiency.
              </li>
              <li>
                <strong>Bifacial</strong> — generates from light hitting the back of the
                panel as well as the front. Most useful on ground-mount and flat-roof
                installs over reflective surfaces; modest gain on pitched-roof
                domestic.
              </li>
              <li>
                <strong>TOPCon and HJT (next generation)</strong> — Tunnel Oxide
                Passivated Contact and Heterojunction Technology cells. Slightly
                higher efficiency (22-24%) and better temperature performance than
                PERC. Mainstream by late 2020s.
              </li>
              <li>
                <strong>Module power rating trajectory</strong> — typical UK domestic
                modules have moved from 250 W (early 2010s) to 400-450 W (2024+) to
                500 W+ (commercial / coming domestic). System kWp from a typical
                domestic roof has roughly doubled in a decade.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Mounting and structural considerations</ContentEyebrow>

          <ConceptBlock
            title="The roof has to take the load — structural sign-off is a real step"
            plainEnglish="A typical 4-6 kWp PV array adds 250-400 kg of distributed load to the roof, plus wind and snow loads transferred through the mounting points into the rafters. Most UK domestic roofs are designed to take this without issue, but very old roofs, lightweight constructions, or roofs already loaded with insulation upgrades may need structural assessment. The MCS-certified installer is responsible for confirming the structural adequacy; the apprentice executes the mounting per the design."
            onSite="The mounting system on a typical pitched UK domestic install: stainless-steel roof hooks fixed into the rafters, an aluminium rail system spanning the hooks, panels clamped to the rails. On flat roofs, ballasted frames or penetrating fixings spread the load. On in-roof installs (panels replacing tiles, common on new-build), the mounting becomes the weatherproofing too. The L3 apprentice contribution: cable management at the array (UV-stable cable, MC4 connectors, weatherproof routing), mounting alignment for the roof edge clearance regulation (typically 300-500 mm clear of every roof edge for fire-fighter access), and verification that the mounting system used matches the structural sign-off."
          >
            <p>
              Structural and mounting considerations:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Roof load assessment</strong> — older properties (pre-1960s)
                and roofs already burdened with insulation upgrades may need
                structural sign-off. The MCS designer arranges.
              </li>
              <li>
                <strong>Roof-edge clearance</strong> — typically 300-500 mm clear of
                every roof edge for fire-fighter access. Local fire-service guidance
                may dictate.
              </li>
              <li>
                <strong>Ridge tile clearance</strong> — minimum clearance from the
                ridge per the mounting system manufacturer.
              </li>
              <li>
                <strong>Weatherproofing at penetrations</strong> — every roof hook is
                a potential leak point. The mounting system manufacturer&apos;s
                instructions specify the flashing or sealant arrangement.
              </li>
              <li>
                <strong>Listed buildings and conservation areas</strong> — planning
                permission may apply. Slate-roof properties in conservation areas may
                require lower-profile or in-roof systems for visual reasons.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Inverter sizing and clipping</ContentEyebrow>

          <ConceptBlock
            title="DC-to-AC ratio and inverter clipping — why a 5 kWp array often gets a 4 kW inverter"
            plainEnglish="A PV array&apos;s nameplate kWp is its output at Standard Test Conditions (1000 W/m2, 25 degC, AM 1.5). UK roofs almost never see those conditions — typical real-world peak output on a sunny day is 70-85% of nameplate. So pairing a 5 kWp array with a 4 kW inverter (a DC-to-AC ratio of around 1.25) actually wastes very little energy, while keeping the install in the G98 (≤16 A per phase) connect-and-notify band. The few hours per year when the array could exceed 4 kW are clipped by the inverter; the lost energy is small compared to the regulatory and cost savings of staying within G98."
            onSite="The MCS-certified designer specifies the inverter rating. The apprentice fits per the design. Recognise that &apos;the inverter is smaller than the array&apos; is normal and intentional, not a fault. The inverter manufacturer publishes a maximum DC input power rating that should not be exceeded; the system designer sizes the array to stay within that limit. Clipping behaviour is logged by the inverter portal — the customer may see &apos;clipping events&apos; reported, which are not faults but design-intent moments where the array briefly exceeded the inverter&apos;s AC output rating."
          >
            <p>
              DC-to-AC ratio considerations:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Typical UK domestic ratio</strong> — 1.1 to 1.3 (kWp DC array
                divided by kW AC inverter). Higher ratios are common where staying in
                G98 matters.
              </li>
              <li>
                <strong>G98 boundary management</strong> — 4 kW (3.68 kW) per phase
                inverter ceiling drives many oversize-DC, sized-AC designs. A 5 kWp
                array with a 3.68 kW inverter sits firmly in G98 with negligible
                clipping loss.
              </li>
              <li>
                <strong>Inverter maximum DC input</strong> — published in the
                manufacturer&apos;s spec sheet. The array must not exceed this even at
                the worst-case low-temperature high-irradiance moment.
              </li>
              <li>
                <strong>Clipping loss in numbers</strong> — typical UK domestic install
                with a 1.2 ratio loses 1-3% of annual generation to clipping. Trivial
                compared to the regulatory and cost savings of staying in G98.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>MCS commissioning and customer handover pack</ContentEyebrow>

          <ConceptBlock
            title="The MCS handover pack is the customer&apos;s evidence base for SEG and warranty"
            plainEnglish="At the end of an MCS-certified PV install the customer receives a handover pack documenting the install, certifying compliance with the relevant standards, and providing the evidence base for Smart Export Guarantee registration with their electricity supplier. Without the MCS handover the customer cannot claim SEG payments and warranty claims become significantly harder. The pack is generated by the MCS-certified installer; the L3 apprentice contributes to the install but is not the certifier."
            onSite="The handover pack typical contents: MCS installation certificate (system specification, MCS-certified installer details, MCS-eligible product details), BS 7671 Electrical Installation Certificate for the new circuits, the SAP / EPC update if applicable, the design drawings and schematic, the commissioning data (string voltages, inverter portal access credentials, generation meter reading), the labelling photographs, the structural sign-off if applicable, the G98 / G99 paperwork, the manufacturer warranties, and the customer guidance on app monitoring and routine checks. Customers ask the apprentice for handover pack copies long after the install — keep a digital copy filed for the customer&apos;s reference."
          >
            <p>
              The MCS handover pack contents:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>MCS installation certificate</strong> — system spec,
                installer details, eligible product details.
              </li>
              <li>
                <strong>BS 7671 EIC</strong> — for new circuits installed.
              </li>
              <li>
                <strong>Design drawings and schematic</strong> — single-line diagram
                of the system with all isolation points marked.
              </li>
              <li>
                <strong>Commissioning data</strong> — string voltages and currents at
                commissioning, inverter portal credentials, generation meter starting
                reading.
              </li>
              <li>
                <strong>G98 / G99 paperwork</strong> — DNO notification confirmation.
              </li>
              <li>
                <strong>Labelling photographs</strong> — evidence of installed labels
                at every isolation point.
              </li>
              <li>
                <strong>Structural sign-off</strong> — if structural assessment was
                required.
              </li>
              <li>
                <strong>Manufacturer warranties</strong> — panel, inverter, mounting
                system warranty certificates.
              </li>
              <li>
                <strong>Customer guidance</strong> — what to expect day-to-day, app
                monitoring instructions, when to call back.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Treating DC isolation as \'AC off = safe\'"
            whatHappens={
              <>
                Apprentice arrives to a PV-equipped property to do an unrelated electrical
                job. They isolate the consumer unit AC main switch and assume the property
                is dead. The PV array continues generating; the DC string conductors between
                the array and the inverter remain live at 300-600 V. If the apprentice opens
                the inverter or touches the DC terminals, they can take a 400 V DC shock —
                serious injury or fatality. The post-incident report finds \'inadequate
                isolation procedure for PV-equipped property\'.
              </>
            }
            doInstead={
              <>
                Always identify a PV install before starting any electrical work on the
                property. Look for the inverter (utility room, loft, garage), the meter
                position signage, and the DC isolator. Run the full safe-isolation procedure
                — AC isolator off and locked, DC isolator off and locked, dwell time
                respected, dead-test verified at every accessible point with a tested meter.
                If the property has PV and you don&apos;t have the procedure for it, stop and
                escalate.
              </>
            }
          />

          <CommonMistake
            title="Promising the customer they\'ll have power during a grid outage"
            whatHappens={
              <>
                Customer asks &quot;so when there&apos;s a power cut my solar still works,
                right?&quot;. Apprentice says yes, customer signs the contract, installer
                fits a standard grid-tied inverter without backup hardware. First power cut
                — house goes dark even with sun on the roof. Customer is furious; the trade
                gets the blame.
              </>
            }
            doInstead={
              <>
                Be clear with the customer up front. A standard grid-tied inverter must
                disconnect when the grid fails (anti-islanding under G98/G99 — protects
                linespeople). The lights only stay on in a power cut if the install includes
                either a hybrid inverter with islanded operation, or a separate ATS-and-
                battery arrangement. Both add cost and complexity. The customer who wants
                blackout-resilience needs to specify it up front so the MCS designer can
                size the kit accordingly.
              </>
            }
          />

          <Scenario
            title="Existing PV property — emergency call-out for a tripped consumer unit"
            situation={
              <>
                You&apos;re called to a property at 7pm in October. The customer reports the
                consumer unit has tripped and won&apos;t reset. As you arrive you notice an
                inverter labelled &quot;Solar PV — 4 kW&quot; on the garage wall and a
                generation meter next to the main meter. The customer says &quot;the solar
                people fitted it three years ago, no problems since&quot;. The light is
                fading and the array on the south-facing roof is only marginally
                illuminated.
              </>
            }
            whatToDo={
              <>
                Treat the install as live until proven dead. Identify all isolation points —
                AC isolator at the inverter, AC isolator at the consumer unit, DC isolator
                at the inverter, DC isolator at the array (look on the rooftop or in the
                loft). Even with the consumer unit tripped, the inverter has its own AC and
                DC supplies that need separately isolating. Run the full safe-isolation
                procedure before opening any cover. Wait the manufacturer&apos;s dwell time
                for capacitor discharge. Verify dead at every accessible point. Then proceed
                with the fault diagnosis on the rest of the installation. If the customer
                asks why it&apos;s taking longer than they expected, explain — &quot;safe
                isolation on a PV property is two systems, not one&quot;.
              </>
            }
            whyItMatters={
              <>
                PV is now common enough that any electrician on emergency call-out work needs
                a standard procedure for a PV-equipped property. The DC voltage on the
                strings is non-trivial even at low light levels; the inverter capacitors
                hold charge after isolation. The customer doesn&apos;t see the safety-
                critical detail; they just see &quot;an electrician taking a long time&quot;.
                Explaining the procedure as you do it builds trust and prevents the
                emergency from becoming an incident.
              </>
            }
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Section 712 (Solar PV power supply systems) — extensive revision"
            clause={
              <>
                Section 712 &apos;Solar photovoltaic (PV) power supply systems&apos; has been
                extensively revised and expanded in BS 7671:2018+A4:2026. The technical content
                of this section has been extensively revised and expanded and now contains
                updated requirements specific to PV systems.
              </>
            }
            meaning={
              <>
                Renewable PV is the most-revised special-installation section in A4:2026.
                Pre-amendment training notes and reference books should be checked against the
                published amendment text before being used as authority. The MCS MIS 3002
                installer-competence standard is the practical companion document.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Section 712."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "PV chain — sunlight → DC string → inverter → AC isolator → meter → consumer unit. Every link has its own isolation and labelling.",
              "DC isolation is a separate safety problem from AC isolation. Both must be locked-off before work; the DC side stays live whenever light hits the panels.",
              "Modern PV strings sit at 300-600 V DC. DC arc behaviour is different from AC — only DC-rated isolators and DC-rated meters are suitable.",
              "G98 fast-track applies up to 16 A per phase per inverter (3.68 kW single-phase). G99 pre-application required above that.",
              "BS 7671 Section 712 (extensively revised in A4:2026) is the electrical regulatory home for PV. MCS MIS 3002 is the installer-competence standard.",
              "Dual-MPPT inverters allow east-and-west string designs to track independently. Panel-level optimisation (Tigo, SolarEdge, Enphase) addresses partial shading.",
              "UK PV yield is typically 800-1100 kWh per kWp per year on south-facing roofs at 30-40° pitch. East/west posts 80-85%, north 50-65%.",
              "Grid-tied inverters disconnect during grid outages (anti-islanding under G98/G99). Customers wanting blackout backup need hybrid inverter or ATS-and-battery.",
            ]}
          />

          <Quiz title="Solar PV overview — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module2-section1-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                1.2 Main types and characteristics
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module2-section3-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                3.2 Heat pumps overview
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
