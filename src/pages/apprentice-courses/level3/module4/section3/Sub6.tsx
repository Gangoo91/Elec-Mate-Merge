/**
 * Module 4 · Section 3 · Subsection 6 — Equipment-side faults: appliances, motors, EV chargers, PV inverters
 * Maps to C&G 2365-03 / Unit 303 / LO3 / AC 3.2
 *   AC 3.2 — "describe typical types of faults and their likely locations in wiring systems and equipment"
 * Layered: 2357 Unit 608 ELTK07 / AC 3.5 — fault locations in equipment / accessories (switches,
 * luminaires, switchgear and control equipment) and instrumentation / metering.
 *
 * Frame: faults that originate INSIDE customer equipment rather than in the wiring system —
 * appliance faults (motors, immersion heaters, washing machines), electronic loads (LED drivers,
 * dimmers, EV chargers), generation kit (PV inverters, battery storage). The L3 apprentice
 * recognises the L–N–E signature each leaves, the diagnostic test that confirms it, and the
 * boundary between an electrician's fix and a manufacturer's warranty / Part P recall.
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
  'Equipment-side faults (3.6) | Level 3 Module 4.3.6 | Elec-Mate';
const DESCRIPTION =
  "Faults that live INSIDE customer equipment — appliance motors, immersion heaters, LED drivers, EV chargers, PV inverters — and the L–N–E signature each leaves on the meter. The L3 apprentice's recognition discipline for separating wiring faults from equipment faults, and the boundary between an electrician's fix and a manufacturer's warranty.";

const checks = [
  {
    id: 'mod4-s3-sub6-immersion',
    question:
      "A 3 kW immersion heater has been tripping the 30 mA RCBO every time it's switched on for the past week. You isolate, prove dead, disconnect the supply at the switched fused connection unit (SFCU), and put your Megger MFT1741+ on the heater terminals. IR test at 500 V L+N to E reads 0.12 MΩ. What's the diagnosis?",
    options: [
      "3 V — pass. Calculation: Ra x I delta n = 100 x 0.030 = 3 V. The acceptance criterion (Reg 411.5.3(b)) is Ra x I delta n less than or equal to 50 V (the conventional touch-voltage limit). 3 V is well within 50 V — the RCD will operate well before the touch-voltage approaches dangerous level. For the same Ra with a 100 mA RCD: 100 x 0.100 = 10 V — still pass. With a 300 mA RCD: 100 x 0.300 = 30 V — still pass but tighter. The Ra x I delta n calculation is the TT-specific acceptance test.",
      "When you see signs of abuse, neglect, undue pressure, vulnerability or risk that go beyond the scope of an electrical job. Report internally to your firm\\\\\\\\\\\\\\\\\\\\\\\\'s safeguarding lead (where one exists) or contracts manager; signpost to local authority adult/children\\\\\\\\\\\\\\\\\\\\\\\\'s social care if appropriate. Care Act 2014 (England) places statutory duties on local authorities; you don\\\\\\\\\\\\\\\\\\\\\\\\'t make the assessment but you can raise the concern.",
      "Phase 1: Temporary avoiding (separate the parties to prevent escalation while you prepare). Phase 2: Accommodating toward emotional needs (acknowledge both parties' feelings before addressing content). Phase 3: Collaborating on the technical issue (bring both parties together to find the best technical solution). Phase 4: If collaboration stalls on minor points, compromising to maintain progress. This multi-phase approach addresses both the emotional and technical dimensions",
      "The element has gone to earth — most likely a pinhole through the metal sheath into the water, OR moisture has tracked along the brass terminal head from a leaking cylinder. 0.12 MΩ at 500 V is well below the BS 7671 Table 64 minimum of 1 MΩ for a 230 V circuit, and the leakage current calculates to ≈ 1.9 mA — enough to trip a 30 mA RCD on switch-on transient. Replace the element (a brass-flanged Backer / Heatrae Sadia element on most UK cylinders), check the cylinder for leaks, re-test IR after replacement (should read &gt; 200 MΩ on a healthy element), recommission and confirm no trip.",
    ],
    correctIndex: 3,
    explanation:
      "Immersion-element earth-fault is the single most common L3 immersion-circuit fault. The element is the metal coil immersed in water; when the sheath develops a pinhole the conductor is in direct contact with the water and the customer's bonded copper pipework. RCDs see the leakage as a residual current and trip. The diagnosis routine is: isolate the element from the wiring (so the fault is on the element, not the cable); IR-test the element terminals to its body / to earth at 500 V; compare to the &gt; 1 MΩ Reg 643.3 acceptance and to the manufacturer's spec for new (typically &gt; 100 MΩ). Replace, retest, recommission.",
  },
  {
    id: 'mod4-s3-sub6-leddriver',
    question:
      "Six-month-old LED downlights in a kitchen flicker continuously, even with the switch fully on. The 3-gang switch is a Hager dimmer rated for LED. The downlights are 8 W constant-current drivers. What's the L3 hypothesis?",
    options: [
      "WEEE applies to electrical and electronic equipment that has reached end-of-life — and a failed protective device is exactly that. The Regulations make the producer (Hager, MK, Schneider) responsible for funding end-of-life recovery, with the distributor (CEF, Edmundson, Rexel) operating the Take-Back Scheme at the counter. The contractor's role is to ROUTE the WEEE into that scheme rather than into general waste — the firm holds the Duty of Care under Environmental Protection Act 1990 s.34 for any waste it produces. Skipping the scheme and putting WEEE in the customer's bin breaches both the producer-responsibility framework and the Duty of Care.",
      "Because the majority of faults — high-resistance joints, intermittent contact, scorched terminations, RCBO heat-trip — trace back to a connection that has degraded over time. Reg 526.1 says every connection shall be (a) suitable for the conductor and the environment, (b) constructed to maintain the connection over the equipment's life, AND (c) accessible for inspection unless specifically permitted otherwise. For rectification, this means — the new connection has to be made with the right method (screw torque, crimp, Wago / Wieland push-wire, soldered joint as appropriate), with the right material (correct ferrule for stranded into screw, correct lever-actuated connector for solid into Wago), and to the manufacturer's torque. A rectified connection that's done wrong will fail again within months. The L3 apprentice's discipline is to follow Reg 526.1 every time, not just on the obvious connections.",
      "Possibly yes. Heavy usage accelerates wear on the input components (relays in IR/loop test stages, current transformers in clamp meters, switches and connectors). The calibration interval is set assuming 'normal' use; heavy use justifies a shorter interval. Also — any incident (drop, exposure to wet, exposure to heat above operating temperature, fault current through the instrument, blown fuse) is grounds for an interim calibration regardless of date. The general principle: calibration is a confidence interval, not a guarantee — use intelligence about how the instrument has been treated to decide if early re-calibration is justified.",
      "Three candidate hypotheses, in order of likelihood. (1) Dimmer-driver compatibility — even 'LED-rated' dimmers don't work with every driver; the manufacturer publishes a compatibility list and 60–70% of LED flicker complaints come back to a non-listed combination. (2) Cumulative driver load — total wattage below the dimmer's minimum load (typically 10 W) leaves the dimmer unable to fire the triac correctly, so the LEDs flicker. (3) Single failing driver pulling the others into instability through shared neutral. Diagnostic: bypass the dimmer with a normal switch (does the flicker stop? — yes confirms dimmer issue); check the dimmer compatibility list against the actual driver brand; if loads are too low, add a dummy load module or switch the dimmer for a leading-edge / trailing-edge type matched to the drivers.",
    ],
    correctIndex: 3,
    explanation:
      "LED + dimmer compatibility is the dominant L3 lighting fault now that incandescent has gone. The L3 apprentice carries the manufacturer's compatibility chart (Hager, Schneider Lisse, Crabtree, Varilight, MK all publish them) and matches the specific dimmer model to the specific driver brand. The 'all the lamps are faulty' answer is the trap — it's almost never the lamps, it's the dimmer-driver pairing. EAWR Reg 16 expects this product-knowledge layer at L3.",
  },
  {
    id: 'mod4-s3-sub6-ev',
    question:
      "Customer reports their Wallbox Pulsar Plus 7 kW EV charger refuses to start a charge — green ready light goes solid, then drops to flashing red within 3 seconds, no current drawn. You IR-tested the dedicated EV circuit at install (reads 999 MΩ); the RCD-Type-A + DC-leakage detection in the unit is healthy on test. What's the L3 next step?",
    options: [
      "Fracture (other than to fingers, thumbs and toes); amputation; permanent loss of sight or reduction of sight; crush injuries leading to internal organ damage; serious burns covering more than 10% of the body or causing significant damage to eyes, respiratory system or other vital organs; scalpings requiring hospital treatment; loss of consciousness from head injury or asphyxia; any other injury arising from work in an enclosed space leading to hypothermia, heat-induced illness or requiring resuscitation or admittance to hospital for more than 24 hours.",
      "Section 722 applies to circuits intended to supply electric vehicles for charging purposes — both Mode 3 (AC charging through a dedicated charge point) and Mode 4 (DC fast / rapid charging) are within scope. The section adds requirements on top of the general BS 7671 framework for PEN-fault protection on TN-C-S (PNB) supplies, RCD requirements for AC and DC fault detection, additional protection arrangements, cable rating and labelling. A4:2026 has refined Section 722 alongside the broader updates around PNB terminology and AFDD coverage.",
      "Clamping around BOTH conductors (L AND N together) when measuring LOAD current. The clamp reads imbalance — for load current you want one conductor only (L OR N, not both). Reading shows zero or near-zero, apprentice assumes 'no load', misses the actual current. Conversely, when measuring earth leakage, you DO clamp L AND N together (the imbalance IS the leakage). The two use cases are mutually exclusive — load = one conductor, leakage = both conductors. Apprentices learn this in week one and re-learn it every time they pick up a clamp.",
      "Two layers. (1) Check the charger's own diagnostic LEDs / app — the Wallbox app gives a fault code; flashing red on Pulsar Plus typically codes as 'communication or vehicle handshake fail'. The SAE J1772 / IEC 61851 protocol is a low-voltage 12 V handshake (the charger sends a PWM signal on the CP pin; the vehicle pulls the line down through resistors to indicate state); a flaky cable, a dirty plug or an EV-side software issue can fail the handshake without the L–N–E circuit being faulty. (2) Verify with a second known-good vehicle if available — if the second car charges, the fault is in the customer's car, not the charger or the wiring. The L3 apprentice does NOT replace the wallbox without first ruling out the J1772 handshake and the customer's vehicle.",
    ],
    correctIndex: 3,
    explanation:
      "EV charging faults split into three categories: (a) wiring / supply (your job — IR, Zs, RCD test), (b) charger / EVSE itself (manufacturer warranty if &lt; 2 years; sometimes firmware updateable), (c) vehicle-side handshake or onboard charger (the vehicle's problem, not yours). An L3 diagnostic that confirms (a) is healthy hands the case off to the customer to engage the charger manufacturer or the vehicle dealer. Replacing kit before ruling out the handshake is a chargeable mistake the firm wears.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "What's the structural difference between a wiring-side fault and an equipment-side fault from a diagnostic perspective?",
    options: [
      "Equality Act s.26 defines harassment as unwanted conduct related to a relevant protected characteristic that has the purpose OR EFFECT of violating the recipient's dignity, or creating an intimidating, hostile, degrading, humiliating or offensive environment for them. The test is largely about the impact on the recipient, not the intention of the speaker. 'It's just banter' and 'they didn't complain' are not defences. The colleague is committing harassment under the Act, the employer is potentially liable for failing to prevent it, and both could face Employment Tribunal claims.",
      "A wiring-side fault lives in the fixed installation — cables, accessories, terminations, JBs, switchgear. You can isolate the load and the fault remains. An equipment-side fault lives in the connected appliance / load — element, motor, driver, control board. You can isolate at the load and the fault disappears from the fixed installation. The diagnostic move that separates them is to disconnect the load at the SFCU / plug / terminal block and re-test the fixed wiring; if the fixed wiring is healthy, the fault is in the equipment, and the customer's recourse is the manufacturer's warranty / a service engineer, not your fix.",
      "Two layers. (1) Check the charger's own diagnostic LEDs / app — the Wallbox app gives a fault code; flashing red on Pulsar Plus typically codes as 'communication or vehicle handshake fail'. The SAE J1772 / IEC 61851 protocol is a low-voltage 12 V handshake (the charger sends a PWM signal on the CP pin; the vehicle pulls the line down through resistors to indicate state); a flaky cable, a dirty plug or an EV-side software issue can fail the handshake without the L–N–E circuit being faulty. (2) Verify with a second known-good vehicle if available — if the second car charges, the fault is in the customer's car, not the charger or the wiring. The L3 apprentice does NOT replace the wallbox without first ruling out the J1772 handshake and the customer's vehicle.",
      "An Approved Electrician has additional time-served experience (typically 2+ years post-AM2) plus an Inspection and Testing qualification (2391-52 or equivalent), and is recognised by JIB as competent to supervise others, sign off completed work, and lead a gang. The Approved grade carries a higher hourly rate (around £21-22/hr in 2024) and is the JIB grade typically required for site Foreman, Qualified Supervisor and Senior Electrician roles.",
    ],
    correctAnswer: 1,
    explanation:
      "The disconnect-and-retest move is the L3 fault-localisation discipline that separates wiring from equipment. It also has commercial implications — a fault on the customer's appliance is the manufacturer's warranty, not your repair to charge. Misdiagnosing equipment as wiring is a common L2 mistake the L3 step-up corrects.",
  },
  {
    id: 2,
    question:
      "A motor on a workshop extractor fan trips the MCB on every start-up. What's the L3 hypothesis tree?",
    options: [
      "Work at Height Regulations 2005 apply. (1) Risk assessment includes the height work specifically — fall distance, type of platform (ladder / step / platform / scaffold), duration. (2) Working platform: ladder for short-duration access tasks (under 30 minutes per task), platform for longer / heavier work. (3) Securing the ladder — stabiliser, person footing, anti-slip feet, 1:4 angle, three points of contact. (4) Tools secured against falling onto people below. (5) Loft work — board out the loft hatch and a working area; do not stand on plasterboard. (6) Single-operative restriction — solo work at height carries higher risk and the firm's lone-working procedure may bar it. WaHR 2005 is enforced by the HSE alongside EAWR — both apply simultaneously.",
      "Setup: MFT in EFLI / Loop mode (typically position '4' on Megger MFT1741+). Test leads to L and CPC at the test point (typically a socket, an accessory, or the DB output). Safety: this is a LIVE test — circuit must be energised, RCD-protected (MFT injects a low-current test pulse that doesn't trip the RCD on most tests, but use the 'Hi' or 'no-trip' mode for verification on RCD-protected circuits). Press TEST. The MFT measures the current that flows during the brief test pulse and calculates Zs. Reading appears in 1–3 seconds. Compare to BS 7671 Appendix 3 / Table 41.3 maximum for the protective device.",
      "Four hypotheses to walk through. (1) Run capacitor failed open or shorted — single-phase induction motors need the run cap to develop starting torque; a failed cap means the motor draws stalled-rotor current (5–8 × FLA) until the MCB trips. Test cap with a meter on capacitance range or a dedicated cap tester; replace if outside ±10% of rated value. (2) Bearings seized or stiff — manually rotate the rotor; if it doesn't spin freely, replace bearings or motor. (3) Centrifugal switch contacts welded (older motors) — keeps the start winding in circuit constantly, drawing high current. (4) Wiring fault on the motor terminal block (loose or wrong connection). The L3 apprentice walks the tree in order; the cap is the first thing to check because it's the most common fault and the cheapest fix.",
      "Because a faulty proving-dead tester can show 'zero' on a live circuit — and you'd take a fatal shock. The function check confirms the tester responds to a known source. The proving-tester-on-known-source step is built into the JIB six-step (Sub 1.2) for exactly this reason. The Martindale GVD2 proving unit gives a portable known source; alternatively a known-live socket on a different circuit. Either way, the tester's response on a known source is the evidence the tester is working. Without that evidence, a 'zero' reading on the circuit you're about to work on means nothing.",
    ],
    correctAnswer: 2,
    explanation:
      "Single-phase induction motors are the most common motor type on commercial small plant — extractors, circulators, drive units, cooling fans. The capacitor is the most common fault, and the symptom — trip on start-up, runs OK once kicked over by hand — is the diagnostic signature. L3 apprentice carries a cap tester (or a dedicated cap meter on the MFT range) and replaces the cap as a first move before condemning the motor.",
  },
  {
    id: 3,
    question:
      "Customer complaint: 'all my LED downlights are dim'. You arrive, observe the dimming, and IR-test the lighting circuit (reads 200 MΩ — healthy) and Zs (within table). What's the most likely diagnosis?",
    options: [
      "BS 7671 Chapter 46 distinguishes four switching functions: ISOLATION (Reg 462) — all live conductors disconnected, lockable in OFF position, designed to prevent re-energisation; SWITCHING OFF FOR MECHANICAL MAINTENANCE (Reg 463) — hand-operable, lockable, prevents accidental re-energisation; EMERGENCY SWITCHING (Reg 464) — fast-acting, immediately accessible, removes danger from personnel; FUNCTIONAL SWITCHING (Reg 465) — normal operation. For fault diagnosis you use ISOLATION every time. The breaker label and the actual function of the device must match — many older switches that look like isolators are actually only functional switches and don't satisfy Reg 462.",
      "Reg 14(2) requires every employee to inform their employer (or any other employee with specific responsibility for safety) of any work situation which they reasonably consider represented a serious and immediate danger to health and safety, AND any matter which they reasonably consider represented a shortcoming in the employer's protection arrangements for health and safety. The duty extends to near-misses, defective safe systems of work, and any condition the employee believes presents danger.",
      "Four hypotheses to walk through. (1) Run capacitor failed open or shorted — single-phase induction motors need the run cap to develop starting torque; a failed cap means the motor draws stalled-rotor current (5–8 × FLA) until the MCB trips. Test cap with a meter on capacitance range or a dedicated cap tester; replace if outside ±10% of rated value. (2) Bearings seized or stiff — manually rotate the rotor; if it doesn't spin freely, replace bearings or motor. (3) Centrifugal switch contacts welded (older motors) — keeps the start winding in circuit constantly, drawing high current. (4) Wiring fault on the motor terminal block (loose or wrong connection). The L3 apprentice walks the tree in order; the cap is the first thing to check because it's the most common fault and the cheapest fix.",
      "The drivers are at the wrong voltage. Either (a) the supply voltage has dropped below the driver's input range — supply test L–N at the cut-out gives 215 V, drivers spec'd for 220–240 V, drivers under-supply and reduce output proportionally; check the upstream sub-main and the DNO if voltage is &lt; 216 V (UK statutory 230 V −6%). OR (b) the drivers are dimmable and the dimmer is set to its minimum, OR (c) the drivers have aged and their constant-current circuit is degrading (typical onset 4–7 years in a hot environment). Diagnostic: measure supply voltage; bypass dimmer; check driver age and replace one as a test.",
    ],
    correctAnswer: 3,
    explanation:
      "Driver-side dimming faults present as 'wiring-like' symptoms but the wiring tests are always clean — that's the diagnostic separator. The L3 apprentice tests the supply voltage at the cut-out FIRST (Reg 312 supply characteristics), because under-voltage from the DNO is increasingly common as networks come under load from EV charging and PV export. If supply is OK, the drivers are the candidate.",
  },
  {
    id: 4,
    question:
      "What's the BS 7671 Reg 643.3 (A4:2026 redraft) requirement when IR-testing a circuit that has connected electronic equipment?",
    options: [
      "Where equipment is connected and is likely to influence the test or be damaged by the test voltage, a 250 V DC IR test shall be used following connection of the equipment, as clarified in the A4:2026 redraft. Practical implication for fault diagnosis: when you re-IR-test a circuit AFTER fixing a fault and reconnecting electronics (LED drivers, dimmers, electronic timers, smart sockets), use the 250 V range on the MFT to verify the post-fix IR without damaging the kit. The 500 V test still applies before the equipment is connected — that's how you confirm the wiring itself is healthy. The two-stage test (500 V isolated + 250 V with kit re-connected) is the A4:2026-aligned procedure.",
      "Three things. (1) The presence and purpose of the AFDD — fire protection by detecting arc-fault waveform signatures from damaged flexes and loose connections. (2) The quarterly test-button protocol — press T, device should trip, reset. Same as RCDs. (3) What to do if the device trips repeatedly — investigate plugged-in equipment first (a damaged flex is the most common cause), call an electrician if the cause isn\\\\'t obvious. The brief is short but important — without it the customer doesn\\\\'t know they have AFDD protection or how to maintain it.",
      "(1) The site / customer's existing risk-assessment and method statement — what the principal contractor has identified as on-site hazards. (2) Your firm's task RAMS — the document specific to fault diagnosis at this premises, which you may need to produce or update on arrival. (3) A permit-to-work or equivalent authorisation — for commercial / industrial sites only, signed by the authorised manager, defining what you're allowed to do. Without these three you don't have a defensible position if something goes wrong, and the customer's safety policy will record you as an unauthorised worker.",
      "Setup: MFT in EFLI / Loop mode (typically position '4' on Megger MFT1741+). Test leads to L and CPC at the test point (typically a socket, an accessory, or the DB output). Safety: this is a LIVE test — circuit must be energised, RCD-protected (MFT injects a low-current test pulse that doesn't trip the RCD on most tests, but use the 'Hi' or 'no-trip' mode for verification on RCD-protected circuits). Press TEST. The MFT measures the current that flows during the brief test pulse and calculates Zs. Reading appears in 1–3 seconds. Compare to BS 7671 Appendix 3 / Table 41.3 maximum for the protective device.",
    ],
    correctAnswer: 0,
    explanation:
      "The 643.3 redraft is the most diagnostic-relevant A4:2026 change for fault work. The two-stage IR test (500 V isolated, 250 V with electronics re-connected) verifies both the wiring health and the as-installed leakage path without damaging the customer's electronics. Skipping the 250 V follow-up means you don't know whether your repair has introduced any leakage from a damaged driver — and that's how a 'fixed' circuit comes back to trip again the next day.",
  },
  {
    id: 5,
    question:
      "PV inverter (SolarEdge, Solis, Fronius, GoodWe — typical UK brands) reports a fault code on its display. What's the L3 boundary between your job and the inverter manufacturer's job?",
    options: [
      "This is a strong micro-hydro site. With 30 m head and 100 l/s flow, theoretical hydraulic power is approximately ρ × g × h × Q = 1000 × 9.81 × 30 × 0.1 ≈ 29 kW. After turbine and generator efficiency (typically 70-85%) the realistic output is 20-25 kW continuous — significant baseload renewable energy. Practical issues: SEPA (Scottish equivalent of Environment Agency) abstraction licensing, fish-friendly intake design, civils for weir / intake / penstock / power-house, grid connection (G99 for an installation of this size), and the cost of a buried cable from the power-house to the property. The right site is rare; where it exists, micro-hydro outperforms PV and wind by a wide margin on capacity factor.",
      "Three categories. (1) AC-side faults — supply voltage out of spec, grid frequency out of spec, lost neutral, RCD trip on the AC isolator. THESE ARE YOUR JOB — measure the AC supply at the inverter terminals, check the AC isolator and the dedicated RCBO, confirm the inverter is seeing a healthy AC supply within its spec. (2) DC-side faults — string voltage out of spec, isolation fault on a string, broken module. Diagnose with the MFT in PV mode (Megger MFT1741+ has PV functions, Kewtech KT64+ similar) — IR test on the DC string at the inverter's DC isolator, open-circuit voltage check on the string. (3) Inverter-internal faults (firmware, MPPT failure, internal IGBT fault) — the manufacturer's warranty / service engineer's job. The L3 apprentice rules out (1) and (2), then escalates (3) with documented test evidence.",
      "Static discharge from the human body can reach 15 kV — well above the 5–100 V damage threshold of CMOS electronics. Standard ESD discipline: (1) wrist strap connected to the panel earth via a 1 MΩ resistor; (2) anti-static mat under the work area where possible; (3) handle PCBs by the edges, not by the components; (4) keep replacement boards in their anti-static bags until the moment of fitting; (5) avoid working in dry conditions where static builds up rapidly; (6) ground yourself on the chassis before touching any board. Failed boards from ESD damage often work intermittently — they fail months later — so ESD-induced faults are notoriously hard to trace to root cause.",
      "Six essential references. (1) BS 7671:2018+A4:2026 itself (paper or PDF on the laptop/phone) — particularly Chapter 4 (Protection), Chapter 5 (Selection), Chapter 6 (Testing), Appendix 6 (Forms). (2) IET Guidance Note 3 (current edition) for testing methods and result interpretation. (3) IET Code of Practice for In-service Inspection and Testing of Electrical Equipment (5th Edition, 2026) for equipment-side work. (4) HSE GS38 for proving-dead instruments. (5) Manufacturer data sheets for the devices being replaced (downloaded ahead of the visit to the laptop). (6) The site's as-built drawings + Schedule of Test Results from the original EIC / EICR. The L3 apprentice doesn't memorise any of this; the L3 apprentice KNOWS where to look it up in 30 seconds when the question arises on site.",
    ],
    correctAnswer: 1,
    explanation:
      "PV fault diagnosis is layered — AC side (electrician), DC side (electrician with PV competence), inverter internals (manufacturer). The L3 apprentice's role is to confirm the supply boundary and the DC string boundary are healthy with documented evidence, then escalate. PV competence requires additional training (City & Guilds 2399-13 PV installation, MCS) — the L3 apprentice supports the qualified PV installer.",
  },
  {
    id: 6,
    question:
      "What's the diagnostic signature of a failing washing machine motor on the L–N–E test?",
    options: [
      "Stop and verify before testing. Unusual supply arrangements suggest either (a) the property is genuinely TT (rural, older, or specifically designed) which may need different fault-diagnosis approach, OR (b) the customer's installation isn't what you expected from the booking (e.g. an older commercial site with three-phase supply you weren't briefed on). Either way, the test plan needs to match the actual supply. Escalate to supervisor if unsure; update the RAMS to reflect the actual installation; brief the customer if the work scope changes. Never just push ahead with the test plan you arrived with if it doesn't match what you find.",
      "Dominated by Ra. The earth fault loop on TT is: line conductor + R1 + fault + R2 (CPC) + Ra (consumer\\\\\\\\'s electrode) + soil + Ra (transformer\\\\\\\\'s electrode) + transformer winding. The R1+R2 contribution is typically under 1 Omega; Ra dominates. Measured Zs will be approximately Ra + a small contribution from the cabling. With Ra = 150 Omega, Zs at any test point will be approximately 150-152 Omega. Overcurrent ADS is not feasible at that loop impedance — RCD ADS is mandatory on TT, verified by the Ra x I delta n less than or equal to 50 V calculation.",
      "Three signatures depending on failure mode. (1) Insulation breakdown in the motor windings — IR test L–E reads &lt; 1 MΩ at 500 V (the universal motor's commutator and brush gear are exposed to wash-water aerosol and the insulation degrades). RCD trips on start. (2) Short between phases (or in a single-phase motor, between run and start windings) — high in-rush current trips the MCB or burns out the motor. (3) Open-circuit on a winding — motor doesn't start, no current draw, MCB doesn't trip. The L3 disconnects the machine at the plug, plugs in a known-good appliance to confirm the socket is healthy, then advises the customer the fault is in the appliance, not the wiring. Manufacturer service engineer or replacement.",
      "BUS provides £7,500 for ASHP / GSHP and £5,000 for biomass — but the biomass strand is restricted to properties that are not connected to the gas grid AND in defined rural categories AND meet Ecodesign emission limits. The intent: heat pumps are the policy default, biomass is a fallback for properties where heat pumps are not viable (very high heat load, no electrical capacity for the heat pump, off-gas-grid rural) and where the air-quality impact is minimal (rural distance from neighbours, Defra-approved Ecodesign appliance). For a typical suburban property the BUS biomass strand is closed. For a rural off-gas-grid farmhouse with a 30 kW heat load, BUS biomass is sometimes the only viable grant route. The L3 electrician sees biomass overwhelmingly in rural settings.",
    ],
    correctAnswer: 2,
    explanation:
      "Washing machines, dishwashers and tumble dryers are the most common 'appliance trips the RCD' fault on a domestic call-out. The diagnostic move is: isolate the appliance, IR-test the supply circuit (clean), advise the customer that the appliance is at fault. This is a recurring competence test — the L3 apprentice does NOT spend hours testing wiring that's already proven healthy.",
  },
  {
    id: 7,
    question:
      "A 7 kW EV charger has been working fine for 18 months and now intermittently trips the upstream RCBO when starting a charge. The inbuilt RCD-Type-A + 6 mA DC-leakage detection has not flagged. What's the L3 hypothesis?",
    options: [
      "C1 is the most serious EICR code — Danger Present, immediate action required. The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 (and equivalent regulations in Wales / Scotland / NI) require landlords to act on C1 findings within 28 days, and IMMEDIATELY where the danger is live-and-present. The rectification, certificate (MWC), Schedule of Remedial Works closing the C1, and confirmation back to the landlord need to be turned around within the regulation timeline. A landlord who fails to act on a C1 within 28 days faces a fine of up to £30,000 per breach. The L3 apprentice's job is to do the work, document it, and ensure the landlord has the proof of closure to file.",
      "Three signatures depending on failure mode. (1) Insulation breakdown in the motor windings — IR test L–E reads &lt; 1 MΩ at 500 V (the universal motor's commutator and brush gear are exposed to wash-water aerosol and the insulation degrades). RCD trips on start. (2) Short between phases (or in a single-phase motor, between run and start windings) — high in-rush current trips the MCB or burns out the motor. (3) Open-circuit on a winding — motor doesn't start, no current draw, MCB doesn't trip. The L3 disconnects the machine at the plug, plugs in a known-good appliance to confirm the socket is healthy, then advises the customer the fault is in the appliance, not the wiring. Manufacturer service engineer or replacement.",
      "They apply together. Section 712 covers the PV-side electrical requirements (DC isolation, string protection, inverter compliance, AC connection). Section 826 covers the EESS aspects (battery isolation, BMS, fire safety, signage). The hybrid inverter is a single piece of equipment that has to comply with both — the manufacturer's certification typically demonstrates compliance with both sections. The IET Codes of Practice for Grid-Connected PV and for EESS both reference each other. A4:2026 has clarified the interaction in places where ambiguity existed in the 18th Edition.",
      "Cumulative leakage from the charger PLUS other appliances on the same RCD-protected upstream sub-main, NOT the charger alone. Modern EV chargers leak 1–3 mA continuously to earth through their internal filter caps (normal). If the upstream RCBO is shared with other circuits also running their own filter caps (LED drivers, IT kit, induction hob electronics), the cumulative leakage on the RCD can sit at 15–20 mA — well within the 30 mA threshold but close enough that the start-up surge of the EV charger pushes it over. Diagnostic: clamp the upstream RCBO's L+N with a leakage clamp meter (Fluke 360, Megger DCM340), reading the actual residual current; if it's &gt; 15 mA in steady state, the EV charger needs its own dedicated RCD upstream (which is what BS 7671 Reg 722.531.3 + A4:2026 prefer anyway).",
    ],
    correctAnswer: 3,
    explanation:
      "Cumulative leakage on shared RCDs is the dominant cause of intermittent EV-charger trips on retro-fitted EVSE in older boards. The A4:2026 layer reinforces dedicated RCD per EV charger circuit (Reg 722.531.3) for exactly this reason. The diagnostic move is the leakage clamp on the RCBO, not replacing the EV charger.",
  },
  {
    id: 8,
    question:
      "Customer reports the cooker hood (1 kW with built-in LED panel) makes a buzzing noise and the lights flicker when the induction hob below it is in use. What's the L3 diagnosis?",
    options: [
      "Mains-borne electromagnetic interference (EMI) from the induction hob's switching electronics coupling into the LED driver in the hood. Induction hobs run an inverter at 20–100 kHz that puts harmonic content on the supply; cheap LED drivers without proper EMC filtering pick this up and modulate their output, causing the flicker. The buzz is the magnetic coupling to the hood's transformer / driver chassis. The hob is compliant (BS EN IEC 61000-3 EMC standards) and the hood is compliant individually, but together they're a cumulative EMC failure. Fix options: (1) replace the hood's driver with a higher-spec unit with better EMC filtering, (2) fit a mains filter on the hood circuit, (3) escalate to the hood manufacturer as a product compatibility complaint. NOT a wiring fault.",
      "Because scope 3 captures the embodied carbon of purchased materials, and an electrical contractor procures very large quantities of high-embodied-carbon material — copper cable in particular. The conductor in a single 100-metre drum of 16 mm two-core SWA cable can carry 20-30 kg of CO2 equivalent in embodied carbon. A contractor buying tens of thousands of metres of cable per year can easily have scope 3 purchased-goods emissions an order of magnitude larger than the combined diesel and electricity figures of scope 1 and scope 2. The use-phase emissions of installed systems (operational electricity drawn by lighting, power and HVAC over decades) can be larger still on commercial fit-outs.",
      "(1) The site / customer's existing risk-assessment and method statement — what the principal contractor has identified as on-site hazards. (2) Your firm's task RAMS — the document specific to fault diagnosis at this premises, which you may need to produce or update on arrival. (3) A permit-to-work or equivalent authorisation — for commercial / industrial sites only, signed by the authorised manager, defining what you're allowed to do. Without these three you don't have a defensible position if something goes wrong, and the customer's safety policy will record you as an unauthorised worker.",
      "Isolate AC and DC sides, lock-off, prove dead. Disconnect strings panel by panel. Remove panels using safe roof-access procedures. Recover the panels for recycling — established PV recycling streams in the UK take aluminium frames, glass, copper wiring and silicon cells separately. Inverter and any battery component handled as WEEE (electronics) and hazardous waste (battery) respectively. Roof penetrations made good. Update the EIC to reflect the removal. The MCS-certified installer (or successor) typically arranges the decommissioning chain through authorised waste carriers.",
    ],
    correctAnswer: 0,
    explanation:
      "EMC compatibility issues are increasingly common as customer kit gets more electronic. Induction hobs, EV chargers, PV inverters, variable-speed drives all inject high-frequency content onto the supply that interacts with cheap LED drivers and dimmers. The L3 apprentice recognises the signature (problem starts when a specific other appliance is in use, wiring tests are clean), advises the customer it's a product-compatibility issue, and helps them choose a fix (better-spec driver, mains filter, escalation to manufacturer).",
  },
];

const faqs = [
  {
    question: "How do I tell whether a fault is in the wiring or in the customer's equipment?",
    answer:
      "The disconnect-and-retest move. Isolate the equipment at its plug, switched fused connection unit (SFCU), or terminal block; re-test the fixed wiring with IR (500 V to earth, 250 V if other electronics remain connected per Reg 643.3) and continuity. If the wiring is healthy and the equipment fault persists once reconnected, the fault is in the equipment. The diagnostic confidence comes from the contrast — clean wiring tests + faulty operation = equipment problem.",
  },
  {
    question: "What's the boundary between an electrician's repair and a manufacturer's warranty fix?",
    answer:
      "Three layers. Anything inside the customer's equipment (motors, drivers, control boards, internal wiring of an appliance) is the manufacturer's warranty (if &lt; 2 years on most domestic appliances under the Consumer Rights Act 2015) or a service engineer's job. Anything in the fixed installation (cables, accessories, terminations, switchgear) is your job. The terminal block / plug / SFCU is the boundary. The L3 apprentice diagnoses up to the boundary, documents the test evidence, and hands off the equipment side to the manufacturer or service engineer.",
  },
  {
    question: "Why does the A4:2026 IR-test redraft (Reg 643.3) matter so much for equipment-side faults?",
    answer:
      "Because the 250 V follow-up after equipment is reconnected is the test that catches a leakage path the original 500 V isolated test couldn't see. A driver that's degraded but not fully failed leaks a few hundred microamps to earth — the 500 V isolated test (with the driver disconnected) shows clean wiring; the 250 V test with the driver connected shows the actual as-installed leakage. The A4:2026 procedure makes this a documented two-stage test rather than an optional check, and it's exactly the test that prevents 'fixed it but it tripped again' callbacks.",
  },
  {
    question: "Are LED dimmer compatibility issues really that common?",
    answer:
      "Yes — by some industry estimates 60–70% of LED flicker complaints come back to a non-listed dimmer-driver combination. The technology has matured but compatibility hasn't standardised; every dimmer manufacturer publishes a list of tested-and-approved drivers, and pairing outside that list is the dominant cause. The L3 apprentice carries the compatibility chart for the dimmers their firm fits (Hager, Schneider Lisse, Crabtree, Varilight, MK) and matches the driver brand to the chart before installing.",
  },
  {
    question: "What does an L3 apprentice do when a PV inverter fault code appears?",
    answer:
      "Confirm the AC-side and DC-side boundaries are healthy with documented test evidence, then escalate the inverter-internal fault to the manufacturer or to a qualified PV installer. AC side: measure supply voltage at the inverter's AC terminals (within the inverter's spec — typically 207–253 V for a 230 V grid-tie), check the AC isolator, check the dedicated RCBO. DC side: check the DC isolator, IR-test the string, open-circuit voltage on the string. If both boundaries are healthy, the inverter is the issue and you don't open it — manufacturer warranty (typical 5–10 years on UK-installed inverters under MCS) or qualified PV service engineer.",
  },
  {
    question: "Cumulative leakage on a shared RCD — how do I prove it's not one specific circuit?",
    answer:
      "Clamp the L+N together at the RCD with a leakage clamp meter (Fluke 360, Megger DCM340) and read the steady-state residual current. If it's a healthy installation with no faults, you'll typically see 1–8 mA total — that's filter-cap leakage from electronics on the protected circuits. If it's &gt; 15 mA you're close to nuisance trip; if it's &gt; 25 mA you're at imminent trip threshold. Then isolate each protected circuit one at a time and re-clamp — the contribution of each circuit shows as a step-down. The fix is usually to split the loads onto separate RCDs (RCBO per circuit is the A4:2026-aligned best practice) rather than chasing a single 'fault'.",
  },
];

export default function Sub6() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module4-section3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 3
          </button>

          <PageHero
            eyebrow="Module 4 · Section 3 · Subsection 6"
            title="Equipment-side faults"
            description="Faults that live INSIDE customer equipment — appliance motors, immersion heaters, LED drivers, EV chargers, PV inverters — and the L–N–E signature each leaves on the meter. The L3 recognition discipline that separates a wiring fault from an equipment fault, and the boundary between an electrician's fix and a manufacturer's warranty."
            tone="emerald"
          />

          <TLDR
            points={[
              "Equipment-side faults live inside the customer's appliance, not in the fixed installation. The disconnect-and-retest move at the SFCU / plug / terminal block separates them — clean wiring tests + persistent fault = equipment problem.",
              "The boundary matters commercially — an equipment fault is the manufacturer's warranty or a service engineer's job, not your repair. Diagnosing past the boundary without authorisation is uninsured work.",
              "The A4:2026 Reg 643.3 redraft formalises a two-stage IR test — 500 V on the isolated wiring AND 250 V with electronics reconnected — to verify both wiring health and as-installed leakage without damaging electronics.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Distinguish wiring-side faults (cables, accessories, terminations) from equipment-side faults (motors, elements, drivers, internal control boards) using the disconnect-and-retest move.",
              "Diagnose immersion-element earth fault using IR test L+N to E at 500 V with the element isolated from the wiring; recognise the &lt; 1 MΩ signature and the brass-flange replacement procedure.",
              "Recognise LED-driver / dimmer compatibility flicker faults and apply the manufacturer's compatibility chart as the diagnostic reference rather than condemning lamps.",
              "Diagnose single-phase motor faults — capacitor failure (most common), bearing seize, centrifugal-switch weld, terminal-block fault — in priority order.",
              "Apply the BS 7671 Reg 643.3 (A4:2026 redraft) two-stage IR test procedure (500 V isolated, 250 V with electronics connected) to fault verification work.",
              "Identify the boundary between L3 electrician diagnosis and PV inverter / EV charger / appliance manufacturer warranty work; document the AC-side and DC-side boundary test evidence for escalation.",
              "Recognise cumulative leakage as the cause of intermittent RCD trips on shared upstream protection and apply the leakage-clamp diagnostic to confirm.",
              "Recognise EMC compatibility faults between modern electronics (induction hobs, EV chargers, PV inverters) and electronic loads (LED drivers) where individual-product compliance fails to add up to system compatibility.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The wiring vs equipment boundary</ContentEyebrow>

          <ConceptBlock
            title="The disconnect-and-retest move — the L3 fault-localisation discipline"
            plainEnglish="Wiring-side faults live in cables, terminations, accessories and switchgear — the fixed parts of the installation that the customer doesn't unplug. Equipment-side faults live in the appliance — motors, elements, drivers, control boards, internal wiring. The two have different commercial owners (you fix wiring; the manufacturer fixes equipment) and different diagnostic boundaries."
            onSite="The L3 separator move is to disconnect the equipment at its plug, switched fused connection unit (SFCU), or terminal block, then re-test the fixed wiring. If the wiring tests clean (IR &gt; 1 MΩ, continuity intact, Zs within table) AND the fault re-appears when you reconnect the equipment, the fault is in the equipment. That's the diagnostic certainty you need before telling the customer 'this is your appliance, not my wiring'."
          >
            <p>
              The boundary by category:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Wiring side (yours)</strong> &mdash; tails, sub-mains, final circuits, accessories (sockets, switches, SFCUs, junction boxes), switchgear (DBs, RCBOs, MCBs, isolators), terminations.</li>
              <li><strong>Equipment side (manufacturer / service engineer)</strong> &mdash; appliance internals (motor, element, driver, PCB, internal cable), EV charger internals (after the AC isolator), PV inverter internals (after the AC and DC isolators), light fitting drivers (after the ceiling rose / fitting backplate), built-in cooker / hob internals (after the dedicated cooker switch).</li>
              <li><strong>Boundary points (the test point)</strong> &mdash; SFCU terminals, 13 A plug, ceiling-rose terminals, cooker-switch outlet terminals, isolator outlet terminals.</li>
              <li><strong>Commercial implication</strong> &mdash; equipment-side fault is manufacturer warranty (Consumer Rights Act 2015 covers appliances for up to 6 years from purchase if the fault is inherent), service-engineer chargeable work, OR replacement. NOT your fix.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671 Reg 643.3 (A4:2026 redraft) — IR test with equipment connected"
            clause={
              <>
                "Where equipment is connected and the equipment is likely to influence the insulation resistance verification test or be damaged by other test voltages, a 250 V DC insulation resistance test following connection of the equipment shall be used to verify insulation resistance."
              </>
            }
            meaning={
              <>
                The A4:2026 redraft formalises a two-stage IR test procedure for fault verification work where electronics are present. STAGE 1: 500 V test on the isolated wiring (electronics disconnected) confirms the wiring itself is healthy &mdash; the historic Table 64 minimum &gt; 1 M&Omega; applies. STAGE 2: 250 V test on the same circuit with the electronics reconnected confirms the as-installed leakage path through the electronics is healthy without damaging them. Both tests appear on the certificate / report. Skipping STAGE 2 is how a &lsquo;fixed&rsquo; circuit comes back to trip again the next day &mdash; the wiring is clean but the driver is leaking.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Reg 643.3."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Resistive loads — immersion heaters, towel rails, storage heaters</ContentEyebrow>

          <ConceptBlock
            title="Element-to-earth is the dominant failure mode on water-immersed elements"
            plainEnglish="Immersion heaters, towel rails and storage-heater elements are bare resistance wire inside a metal sheath. The sheath develops pinholes from corrosion, scale or thermal cycling; the conductor goes electrically continuous to the metal sheath and through it to the customer's bonded copper pipework. Result: trips the RCD, IR test reads &lt; 1 MΩ at 500 V."
            onSite="A 3 kW Backer / Heatrae Sadia immersion element on a typical UK cylinder is a £20 part with a 30-minute swap. The fault is so common the L3 apprentice carries elements as standard van stock. Diagnostic: isolate, prove dead, disconnect at SFCU, IR-test the element terminals to its body / to earth at 500 V; if &lt; 1 MΩ replace; recommission and confirm IR &gt; 100 MΩ on the new element."
          >
            <p>
              The standard L3 element-replacement procedure:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Isolate at the cylinder&apos;s SFCU, lock-off, prove dead at the immersion head with a Martindale VI-13800 or Kewtech KT1780.</li>
              <li>Disconnect the supply wires at the immersion head; remove the head cover. IR-test L+N to the brass flange / body at 500&nbsp;V on the Megger MFT1741+. &lt; 1 M&Omega; confirms element fault.</li>
              <li>Drain the cylinder below the immersion height (top immersion only needs ~30&nbsp;cm drained; bottom immersion needs the whole tank). Slacken and unscrew the brass nut with the immersion spanner (a sized box spanner, NOT an adjustable &mdash; the nut WILL round off otherwise).</li>
              <li>Withdraw the old element, fit a new washer, insert and torque the new element to manufacturer spec, refill the cylinder, bleed any air through the hot tap, re-test IR (should read &gt; 100 M&Omega; on a healthy new element).</li>
              <li>Recommission &mdash; energise, time the heat-up to confirm rated wattage is being drawn, log the post-work test on the job sheet.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Motors &mdash; capacitor first, bearings second</ContentEyebrow>

          <ConceptBlock
            title="The single-phase induction motor capacitor is the most common motor fault"
            plainEnglish="Single-phase induction motors (workshop extractors, kitchen extractors, CH circulator pumps, cooling fans, drive units on small plant) need a run capacitor to develop starting torque. When the cap fails open or shorted, the motor draws stalled-rotor current — typically 5–8 times full-load amperes — until the MCB trips."
            onSite="A typical 250 W extractor cap is 3–6 µF; a 1 kW circulator might be 10–25 µF. Cap testers on most modern MFTs (Megger MFT1741+, Fluke 1664FC, Kewtech KT64+) read capacitance directly. Out of spec ±10% = replace. £5–15 part, 10-minute swap, fault gone. The L3 apprentice carries spare caps in common values for known site equipment."
          >
            <p>
              The L3 motor-fault hypothesis tree, in priority order:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Run capacitor</strong> &mdash; failed open or shorted; symptom is &lsquo;trips on start, runs OK if kicked over by hand&rsquo;. Test with cap range on the meter; replace if outside &plusmn;10% of rated value.</li>
              <li><strong>Bearings</strong> &mdash; seized or stiff from age / lack of lubrication / contamination; manually rotate the rotor; if it doesn&apos;t spin freely, bearings or motor replacement.</li>
              <li><strong>Centrifugal-switch contacts welded (older motors)</strong> &mdash; keeps the start winding in circuit constantly, drawing high current. Audible chatter from the switch; replace switch or motor.</li>
              <li><strong>Winding insulation breakdown</strong> &mdash; IR test to motor body &lt; 1 M&Omega;; replace motor.</li>
              <li><strong>Terminal-block fault</strong> &mdash; loose, corroded or wrong connection at the motor terminal box; tighten / repair / re-terminate.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671 Reg 134.1.1 — good workmanship"
            clause={
              <>
                "Good workmanship by one or more skilled or instructed persons and proper materials shall be used in the erection of the electrical installation."
              </>
            }
            meaning={
              <>
                Reg 134.1.1 is the &lsquo;competence + materials&rsquo; anchor. When you replace an immersion element, a motor capacitor, or any other equipment-side component, the replacement must be a proper material (manufacturer-equivalent rated part) installed by a skilled person to the same standard. Fitting an under-spec or wrong-rated cap, an element with the wrong wattage, or a driver from outside the dimmer&apos;s compatibility list is a Reg 134.1.1 failing &mdash; even though the work is &lsquo;equipment side&rsquo;. The L3 apprentice respects the spec.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Reg 134.1.1."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Electronic loads &mdash; LED drivers, dimmers, smart kit</ContentEyebrow>

          <ConceptBlock
            title="LED + dimmer compatibility is now the dominant lighting fault"
            plainEnglish="LED downlights use constant-current drivers that need to match the dimmer's output type (leading-edge / trailing-edge / 0–10 V / DALI). Even 'LED-rated' dimmers don't work with every driver — manufacturers publish compatibility lists and pairing outside the list is the dominant cause of flicker, buzz, won't-fully-dim, won't-fully-off."
            onSite="The L3 apprentice's diagnostic move on flicker complaints: bypass the dimmer with a normal switch (does the flicker stop? — yes confirms dimmer issue), check the dimmer manufacturer's compatibility chart against the actual driver brand fitted, advise the customer of the right combination. Common UK dimmer brands and their charts: Hager (Wesco range), Schneider Lisse, Crabtree, Varilight V-Pro, MK Dimensions."
          >
            <p>
              The four common electronic-load fault categories:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Dimmer / driver mismatch</strong> &mdash; check compatibility chart; replace dimmer for matched type or replace drivers for matched make.</li>
              <li><strong>Minimum-load fault</strong> &mdash; total wattage below dimmer&apos;s minimum (typically 10 W); add dummy load module (Varilight V-Pro Adaptor, Hager dummy load) or use a compatible minimum-load-tolerant dimmer.</li>
              <li><strong>Driver age / degradation</strong> &mdash; constant-current circuit degrading after 4&ndash;7 years in hot enclosure; replace driver.</li>
              <li><strong>EMC interaction</strong> &mdash; another appliance on the supply (induction hob, EV charger, PV inverter, VSD) injects high-frequency content that the LED driver picks up; mains filter or higher-spec driver.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>EV chargers &mdash; the boundary at the AC isolator</ContentEyebrow>

          <ConceptBlock
            title="EV charging faults split three ways &mdash; wiring, charger, vehicle"
            plainEnglish="An EV that won't charge is one of three things: (a) a wiring / supply fault upstream of the charger (your job), (b) a charger / EVSE fault inside the unit (manufacturer warranty), or (c) a vehicle-side fault that's failing the IEC 61851 / SAE J1772 handshake (the customer's car). The L3 apprentice rules them out in order."
            onSite="The L3 routine: read the charger's diagnostic LEDs / app fault code; verify supply at the AC isolator (230 V L–N, &lt; 0.5 V N–E, healthy Zs); check the charger's inbuilt RCD-Type-A + 6 mA DC-leakage detection per BS 7671 722.531.3 (A4:2026 reinforces); IR-test the dedicated EV circuit at 500 V; verify with a second known-good vehicle if available. Common UK EV charger brands: Wallbox Pulsar Plus, Ohme Home Pro, EO Mini Pro, Andersen, MyEnergi Zappi."
          >
            <p>
              The three EV-charging fault categories:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Wiring / supply (yours)</strong> &mdash; supply voltage, neutral integrity, Zs at the charger&apos;s terminals, dedicated RCBO healthy, IR clean. Documented evidence that the AC supply boundary is good.</li>
              <li><strong>Charger / EVSE (manufacturer warranty)</strong> &mdash; firmware fault, contactor weld, internal RCD failure, Wi-Fi / app connectivity. Most UK EV chargers carry a 3&ndash;5 year warranty; the customer engages the manufacturer.</li>
              <li><strong>Vehicle handshake (customer&apos;s car)</strong> &mdash; the J1772 / IEC 61851 12 V CP-pin signal is the handshake protocol; a flaky cable, dirty plug, or vehicle-side software issue can fail the handshake without the wiring or charger being faulty. Verify with a second car if possible; otherwise advise the customer to engage the dealer.</li>
              <li><strong>Cumulative leakage</strong> &mdash; the increasingly common fault mode on shared-RCBO installations; clamp the upstream RCBO with a leakage clamp meter (Fluke 360, Megger DCM340) to measure steady-state residual current; if &gt; 15 mA, fit dedicated RCD per Reg 722.531.3.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 722.413.1.2 (Electric vehicle charging — supply via separated source)"
            clause={
              <>
                "722.413.1.2 This protective measure shall be limited to the supply of one electric vehicle supplied from one unearthed source. The circuit shall be supplied through a fixed isolating transformer complying with BS EN 61558-2-4."
              </>
            }
            meaning={
              <>
                Reg 722.413.1.2 sets out the &lsquo;separated source&rsquo; protective measure for EV charging &mdash; one vehicle, one unearthed source, fed through a fixed isolating transformer to BS EN 61558-2-4. Where this protective measure is used in place of standard automatic disconnection, the supply is electrically separated from the upstream system. The diagnostic implication for fault work: confirm which protective measure the EV connecting point uses before assuming a standard 30 mA RCD diagnostic; on a separated-source install the fault behaviour and the test method are different.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 7, Section 722, Regulation 722.413.1.2."
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <VideoCard
            url={videos.faultFinding.url}
            title={videos.faultFinding.title}
            channel={videos.faultFinding.channel}
            duration={videos.faultFinding.duration}
            topic={videos.faultFinding.topic}
          />

          <SectionRule />

          <ContentEyebrow>PV inverters &mdash; the AC and DC boundaries</ContentEyebrow>

          <ConceptBlock
            title="PV fault diagnosis is layered AC, DC, inverter-internal"
            plainEnglish="A PV inverter showing a fault code is one of three things: (a) AC-side fault (supply voltage out of spec, lost neutral, RCD trip on the AC isolator) — your job, (b) DC-side fault (string voltage out of spec, isolation fault on a string, broken module) — your job with PV competence, (c) inverter-internal fault (firmware, MPPT, internal IGBT) — the manufacturer's warranty / service engineer's job."
            onSite="The L3 apprentice without dedicated PV training works the AC boundary only — measure supply at the AC isolator, check the AC RCBO, confirm the inverter sees a healthy AC supply within spec. The DC side and inverter internals are referred to a qualified PV installer. Common UK PV inverter brands: SolarEdge HD-Wave, Solis 3.0K-S5, Fronius Primo, GoodWe DNS, Growatt MIN."
          >
            <p>
              The boundary checks:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>AC supply (your boundary)</strong> &mdash; supply voltage at the inverter&apos;s AC terminals (within spec; typically 207&ndash;253 V for 230 V grid-tie; more strict for G98/G99-compliant kit), Zs at the AC RCBO, RCD test, IR on the dedicated AC circuit.</li>
              <li><strong>DC string (your boundary with PV competence)</strong> &mdash; open-circuit voltage on each string at the DC isolator (matches the design Voc &times; module count), IR test L+&minus; to earth on the string at 500 V (or per inverter manufacturer spec).</li>
              <li><strong>Inverter internal (manufacturer)</strong> &mdash; fault codes inside the unit, firmware updates, internal MPPT or IGBT failures. UK PV inverter warranties typically 5&ndash;10 years under MCS; customer engages installer or manufacturer.</li>
              <li><strong>G99 / G98 grid-tie compliance</strong> &mdash; the inverter must remain compliant with DNO grid-tie standards; if it&apos;s tripping on grid faults (over/under voltage, over/under frequency), that&apos;s the inverter doing its job, not a fault per se &mdash; the supply itself may be the problem (DNO call).</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Cumulative leakage and the A4:2026 RCD test method</ContentEyebrow>

          <ConceptBlock
            title="One AC test at 1×IΔn and a leakage clamp tells you everything"
            plainEnglish="A4:2026 redrafted Reg 643.7 to specify a single alternating current test at 1×IΔn for every RCD verification, regardless of type. Older multi-current sequences (half-rated, rated, five-times) are gone; Table 3A in Appendix 3 has been deleted. For the L3 fault diagnostician investigating intermittent EV-charger or PV-inverter trips, this means the verification is faster — but the diagnosis still needs a leakage clamp on the upstream protection to find the cumulative leakage source."
            onSite="On an intermittent trip, the diagnostic move is unchanged: clamp L+N together at the RCBO with a leakage clamp meter (Fluke 360, Megger DCM340) and read steady-state residual current. Healthy installation 1-8 mA; close to nuisance trip above 15 mA; imminent trip above 25 mA. Then isolate each protected circuit one at a time and read again — each circuit's contribution shows as a step-down. Fix is dedicated RCBO per high-leakage circuit per Reg 722.531.3.101 for EV chargers and the equivalent dedicated-RCD discipline for inverters."
          >
            <p>
              The L3 cumulative-leakage diagnostic routine:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Step 1 — clamp the upstream RCBO at L+N</strong>. Note the
                steady-state residual current. Above 15 mA is the nuisance-trip warning
                zone for a 30 mA RCBO.
              </li>
              <li>
                <strong>Step 2 — verify the RCBO with the A4:2026 single AC test</strong>
                at 1×IΔn. Record the operating time. A drifted RCBO (operating time
                significantly above the BS EN 61009 limit) is itself a fault and should
                be replaced regardless of the leakage source.
              </li>
              <li>
                <strong>Step 3 — isolate each protected circuit one at a time</strong>
                and re-clamp. Each circuit's contribution to the residual current shows as
                a step-down. The biggest contributor is the suspect.
              </li>
              <li>
                <strong>Step 4 — IR test the suspect circuit at 250 V (Reg 643.3)</strong>
                with electronics connected. A degraded driver or a leaking filter cap
                shows as low IR; a clean reading suggests the leakage is filter-cap
                normal rather than a fault.
              </li>
              <li>
                <strong>Step 5 — design fix</strong>. For EV chargers, dedicated 30 mA
                RCD per Reg 722.531.3.101 plus DC fault current protection. For PV
                inverters, dedicated RCBO with Type the inverter manufacturer specifies.
                For accumulating filter-cap loads, RCBO-per-circuit on the consumer unit
                upgrade.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="The Reg 134.1.1 'replacement parts must match' rule on equipment-side fixes"
            plainEnglish="When you swap a motor capacitor, an immersion element, an LED driver or any equipment-side component, Reg 134.1.1 demands the replacement is a 'proper material' — manufacturer-equivalent rated part installed to the same standard. This is not optional even though the work is technically equipment-side rather than wiring-side. Fitting an under-spec or wrong-rated part is a Reg 134.1.1 failing that returns to bite you on warranty and on EICR."
            onSite="Practical L3 discipline: read the part you are removing, match the rating, match the BS / EN reference, match the manufacturer specification. A 6 µF run capacitor cannot be replaced with a 4 µF off-the-shelf cap; an 8 W constant-current LED driver cannot be replaced with a 12 W constant-voltage driver; a 3 kW Backer immersion element cannot be replaced with a 2.75 kW alternative without checking the cylinder thermostat compatibility. The five minutes spent reading the spec saves the comeback work."
          >
            <p>
              The Reg 134.1.1 replacement-parts checklist:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Rating match</strong> — voltage, current, wattage, capacitance, all
                within ±10% of the original part unless the manufacturer's data sheet
                explicitly authorises a different value.
              </li>
              <li>
                <strong>Type match</strong> — leading-edge dimmer replaced by leading-edge,
                Type B RCBO replaced by Type B, constant-current driver replaced by
                constant-current. Cross-type substitutions create EMC and compatibility
                issues that present as the customer's original symptom unchanged.
              </li>
              <li>
                <strong>Standards match</strong> — the BS EN reference on the original
                part is what BS 7671 references for the duty. A BS EN 60898 Type B MCB
                replaced by a non-listed import is a Reg 134.1.1 failing.
              </li>
              <li>
                <strong>Approved-list check</strong> — for LED dimmers and drivers,
                consult the dimmer manufacturer's compatibility chart before fitting.
                Pairing outside the chart is the dominant cause of flicker complaints.
              </li>
              <li>
                <strong>Document the replacement</strong> — record the old part details,
                the new part details and the matching evidence on the job sheet. The
                record protects the firm if the customer later disputes the workmanship.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Replacing the wallbox before ruling out the J1772 handshake"
            whatHappens={
              <>
                Apprentice gets called to a Wallbox Pulsar Plus that won&apos;t charge. AC supply
                tests clean; charger&apos;s inbuilt RCD healthy; IR on the dedicated circuit clean.
                Without checking the charger&apos;s app for fault codes or trying a second vehicle,
                the apprentice condemns the unit and orders a replacement. New unit fitted &mdash;
                same fault. Turns out the customer&apos;s vehicle&apos;s J1772 connector had a bent
                pin from a previous owner&apos;s mishandling, failing the CP-pin handshake. The
                customer&apos;s firm is out of pocket for a &pound;700 replacement charger that
                wasn&apos;t needed. Vehicle dealer fixes the connector; old charger goes back to
                stock.
              </>
            }
            doInstead={
              <>
                Read the diagnostic LEDs / app fault code FIRST. Verify with a second known-good
                vehicle if possible. Confirm with the manufacturer&apos;s technical support before
                ordering any replacement. The cost of a phone call is zero; the cost of a wrongly
                replaced unit is &pound;500&ndash;1000+ plus the visit. EAWR Reg 16 competence
                expects the apprentice to diagnose to certainty before condemning equipment.
              </>
            }
          />

          <CommonMistake
            title="Condemning all the LED downlights when one driver in the chain is failing"
            whatHappens={
              <>
                Customer reports flicker on the kitchen downlights. Apprentice tests one of the
                lamps with a multimeter, sees nothing obviously wrong, then condemns all 8 lamps and
                writes a quote for &pound;240 of replacement units. Turns out one driver in the
                middle of the chain was failing intermittently and pulling the others into
                instability through the shared neutral. Replace that one driver (&pound;15 part)
                and the rest of the chain is fine.
              </>
            }
            doInstead={
              <>
                Walk the LED-driver fault tree before condemning lamps. Bypass the dimmer (does the
                flicker change?). Check minimum load. Test each driver in turn by isolating one at a
                time and observing whether the flicker on the others changes. The faulty driver
                usually betrays itself by being the one that&apos;s warmest to touch or the one
                whose lamp dims slightly differently. Replace ONE driver as a diagnostic step before
                condemning all of them.
              </>
            }
          />

          <Scenario
            title="The cooker-hood that flickers when the induction hob is on"
            situation={
              <>
                Customer reports their integrated cooker hood (1 kW with built-in LED panel,
                Bosch&nbsp;DWB7) makes a buzzing noise and the LED panel flickers continuously, but
                only when the induction hob below it (Neff T16FT76X0) is in use. The LED flicker is
                visible and annoying; the buzz is audible. You isolate, IR-test the hood circuit at
                500 V (reads 800 M&Omega; &mdash; healthy), Zs is within table, RCBO is the right
                rating, no loose connections at the hood&apos;s terminal block.
              </>
            }
            whatToDo={
              <>
                Document the wiring tests as clean. Diagnose the symptom as mains-borne EMC
                interference from the induction hob coupling into the hood&apos;s LED driver.
                Confirm by isolating the hob &mdash; if the hood flicker stops when the hob is off,
                EMC is the cause. Walk the customer through their three options: (1) escalate to
                the hood manufacturer (Bosch) with the documented test evidence and the symptom
                pattern &mdash; this may be a known compatibility issue with a firmware update or a
                replacement driver available, (2) fit a mains filter on the hood&apos;s circuit to
                attenuate the hob&apos;s harmonics, (3) accept the limitation. The fault is NOT a
                wiring fault and NOT a fix that&apos;s commercially viable for you to charge for as
                an electrician &mdash; it&apos;s a product-compatibility issue between two
                independently-compliant kit items. The L3 apprentice&apos;s value here is the clear
                diagnosis and the documented evidence the customer needs to engage the manufacturer.
              </>
            }
            whyItMatters={
              <>
                EMC interaction faults are an increasing fraction of L3 fault calls as more
                customer kit becomes electronic &mdash; induction hobs, EV chargers, PV inverters,
                VSDs, smart-home kit. Each is individually compliant with BS EN IEC 61000-3 EMC
                standards but the combinations weren&apos;t tested by the manufacturers. The L3
                apprentice recognises the signature (problem starts when a specific other appliance
                is in use, wiring tests are clean), documents it cleanly, and helps the customer
                escalate to the right party. Trying to &lsquo;fix&rsquo; an EMC compatibility issue
                with a wiring change is a waste of the customer&apos;s money and a waste of yours.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Equipment-side faults live INSIDE customer kit (motors, elements, drivers, control boards). Wiring-side faults live in the fixed installation. The disconnect-and-retest move at the SFCU / plug separates them.",
              "Immersion-element earth fault is the dominant immersion-circuit fault — IR test the element terminals to its body at 500 V; &lt; 1 MΩ confirms; replace, retest, recommission.",
              "Single-phase motor capacitor failure is the dominant motor fault — symptom is 'trips on start, runs OK if kicked over by hand'. Test cap, replace if outside ±10% of rated value.",
              "LED + dimmer compatibility flicker is the dominant lighting fault — bypass dimmer to confirm, check manufacturer's compatibility chart, replace dimmer or driver to a matched pair.",
              "BS 7671 Reg 643.3 (A4:2026 redraft) two-stage IR test — 500 V on isolated wiring, 250 V with electronics reconnected — is the test that catches a degraded driver leakage path the 500 V isolated test misses.",
              "EV charger faults split three ways — wiring (yours), charger (manufacturer), vehicle handshake (customer's car). Rule them out in order; don't replace the wallbox until you've checked the J1772 handshake.",
              "PV inverter faults split three ways — AC-side (yours), DC-side (yours with PV competence), inverter-internal (manufacturer). Document the boundary tests cleanly before escalating.",
              "Cumulative leakage on shared RCDs is the dominant cause of intermittent EV-charger trips — clamp the upstream RCBO with a leakage clamp meter; the A4:2026 fix is dedicated RCD per Reg 722.531.3.",
            ]}
          />

          <Quiz title="Equipment-side faults — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module4-section3-5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> 3.5
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Special precautions
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module4-section4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Section 4
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
