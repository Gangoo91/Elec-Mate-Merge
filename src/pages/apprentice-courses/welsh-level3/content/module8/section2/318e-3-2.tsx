/**
 * Ported from the English course, combining:
 *   level3/module4/section3/Sub3.tsx
 *   level3/module4/section3/Sub6.tsx
 *
 * The Welsh Level 3 qualification covers this material, so the teaching is
 * carried into this course rather than sending a learner out to read it in
 * another one. The text is unchanged; only the page shell was removed.
 *
 * 🔴 Never describe this content as EAL-approved, EAL-mapped or endorsed.
 */

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
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

const checks = [
  {
    id: 'mod4-s3-sub3-terms',
    question:
      'BS 7671 526.1 covers terminations. Where do most termination faults appear in domestic installations and why?',
    options: [
      'Three locations dominate: consumer unit busbar terminations, socket back-terminals on ring-final loop-in conductors, and junction boxes. The common factor is that a termination is where mechanical contact is the only thing maintaining electrical contact, so any disturbance loosens it.',
      'Each brand has known failure modes that point you to likely fault locations. Hager 6 kA RCBOs (popular UK domestic) — known for thermal element drift after 15+ years, busbar terminations need annual re-torque. Wylex NHX — known for plastic enclosure stress fractures around the busbar after thermal cycling. Schneider Acti9 — generally robust, known for incoming terminal block failures on the larger 100 A units. MK Sentry — known for poor manufacturer warranty support but generally reliable hardware. Crabtree Starbreaker — older series, RCBO trip-time slows significantly past 12 years. The brand tells you where to look first.',
      'Termination faults are rare in domestic work because back-terminals are torqued at installation and never disturbed again. The dominant domestic fault is cable insulation breakdown mid-run, so the first place to look is always the cable inside the wall, not the terminations.',
      'Most domestic termination faults appear at the meter tails between the cut-out and the consumer unit, because that is the only termination carrying the full incoming load. Socket back-terminals and junction boxes rarely fail because they carry only a fraction of the current.',
    ],
    correctIndex: 0,
    explanation:
      "Terminations are the weakest link in any installation. BS 7671 526.1 ('durable electrical continuity AND adequate mechanical strength AND protection') captures all three failure modes — electrical continuity loss, mechanical loosening, and physical exposure. The three high-frequency sites: CU busbar terminations (under-torqued, oxidised, exposed under inrush), socket back-terminals (cheap accessories where the screw stops short of clamping), and junction boxes (old screw boxes loosening, Wago push-fit going intermittent on solid copper). The vast majority of in-service faults trace back to a termination somewhere on the affected circuit.",
  },
  {
    id: 'mod4-s3-sub3-luminaire',
    question: "Where do faults typically appear in luminaires and what's the relevant pattern?",
    options: [
      'Luminaire faults appear almost exclusively in the supply cable feeding the fitting, not in the fitting itself. The lampholder, driver and internal wiring are sealed at manufacture and effectively maintenance-free, so the investigator traces the circuit cable back to the rose and ignores the fitting.',
      'Three categories: lampholder terminals (spring contacts oxidise or arc), driver / control-gear failure (LED drivers and ballasts have a 5–10 year life and often take the lamp with them), and internal wiring degradation from heat. Brand quality drives the failure rate.',
      "Luminaire faults are always a CPC continuity problem. Because the fitting's exposed metalwork must be earthed, the only failure mode worth checking is the earth path; test R2 to the fitting body, and if it is high, that is the fault — the lamp, lampholder and driver never fail in service.",
      'The dominant luminaire fault is over-voltage from the supply. Mains spikes above 253 V destroy lamps and drivers across the whole circuit at once, so the diagnostic is to fit a surge protective device at the consumer unit and replace every lamp on the affected circuit together.',
    ],
    correctIndex: 1,
    explanation:
      "Luminaires fail at predictable points — lampholder, driver, internal wiring. Brand quality directly affects failure rate; cheap fittings fail early, mid-tier and premium fittings last decades. The fault investigator learns to distinguish 'fitting at end of life' from 'wiring fault upstream of fitting' — the diagnostic is whether the same model fitting works elsewhere on the same circuit.",
  },
  {
    id: 'mod4-s3-sub3-rcbo',
    question: 'Where do faults appear in switchgear (MCBs, RCBOs, RCDs) and how do you tell?',
    options: [
      'Switchgear effectively never fails — MCBs, RCBOs and RCDs are sealed solid-state devices with no moving parts and no wear mechanism. If a breaker appears faulty the cause is always elsewhere on the circuit, so you investigate the load and the cable, never the device itself.',
      'The only switchgear failure worth diagnosing is a tripped MCB. Reset it; if it holds, there was no fault; if it trips again, the cable downstream is shorted. RCDs and RCBOs do not degrade with age, so trip-time testing them is unnecessary on an in-service board.',
      "Three failure modes: mechanical wear (sluggish toggle, won't latch or trip after thousands of operations), electrical wear (contacts pitted by arc erosion, becoming an HRJ at the breaker), and RCD-specific drift (coil saturation or electronic detection drift, showing as slow trip-time on the MFT test).",
      'Switchgear faults are detected purely by insulation-resistance testing. IR-test each breaker at 500 V to its enclosure; a reading below 1 MΩ condemns the device. Mechanical wear and slow RCD trip-times do not show as faults because they do not affect insulation.',
    ],
    correctIndex: 2,
    explanation:
      'Switchgear has finite life and fails in predictable ways. The MFT trip-time test reveals slow-tripping RCDs that are approaching failure; visual inspection reveals pitted contacts and signs of overheating. BS 7671 651 (periodic inspection) captures the periodic check cycle that catches switchgear before it fails in service.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "What's the diagnostic value of knowing the brand of a CU when investigating a fault?",
    options: [
      'None — the brand of consumer unit tells you nothing useful about where a fault is. Every CU is built to the same BS EN standard, so they all fail in identical ways; brand knowledge is marketing trivia that has no place in fault diagnosis.',
      'Each brand has known failure modes that point you to the likely fault location, so the brand tells you where to look first instead of testing every circuit blind.',
      'It tells you which replacement parts to order, nothing more. Knowing the brand lets you buy the matching RCBO from the wholesaler, but it gives no clue to fault location — you still have to test every circuit blind because failure points are random and brand-independent.',
      'It tells you the breaking capacity rating only. The brand fixes whether the board is 6 kA or 10 kA rated, which matters for PSCC, but it has no bearing on where in-service faults appear or which component to check first.',
    ],
    correctAnswer: 1,
    explanation:
      'Brand-specific knowledge is what separates an experienced fault diagnostician from a beginner. Typical patterns: Hager 6 kA RCBOs drift on the thermal element after 15+ years (busbar needs re-torque); Wylex NHX develops enclosure stress fractures around the busbar; Schneider Acti9 sees incoming terminal-block failures on larger 100 A units; Crabtree Starbreaker RCBO trip-time slows past 12 years. Trade publications, manufacturer technical bulletins and industry forums document these; the apprentice builds the knowledge base over time, the senior carries it as standard.',
  },
  {
    id: 2,
    question: 'Where do faults appear most often on a domestic ring final circuit?',
    options: [
      "At the consumer unit only. The ring's two legs land on a single MCB, so any fault on the ring shows up at that breaker terminal; you re-make the two terminations at the CU and the ring is restored. The sockets and spurs around the ring never fail.",
      "Faults on a ring final are evenly distributed along the cable, so there is no 'likely location' to check first. The only reliable approach is to disconnect every accessory and IR-test each leg in turn, because any point is as probable as any other.",
      'In approximate frequency order: socket back-terminals on the loop-in conductors (loosen over time, expose under load), the ring-break point where a previous installer cut and rejoined the ring, spur joins, and damaged cable where chases were re-plastered over.',
      'The fuse in the plug-top of whatever appliance is plugged in. Ring final faults are almost always a blown 13 A plug fuse; replace the fuse in each appliance in turn until the circuit works, and the ring wiring itself rarely needs investigation.',
    ],
    correctAnswer: 2,
    explanation:
      'Ring final fault locations are predictable because the ring topology has known weak points — every loop-in termination, every junction, every cable transition. The diagnostic approach — the ring continuity test — localises the fault to a branch; visual / thermal inspection of that branch finds the specific point.',
  },
  {
    id: 3,
    question:
      'Where do faults typically appear in metal-clad SWA installations on commercial sites?',
    options: [
      'Faults cluster in the middle of the cable run, where the steel wire armour flexes most. SWA glands are mechanically robust and rarely fail; trace the buried or clipped run to find the damaged section and replace the whole length.',
      'The most common SWA fault is at the MCB feeding it. The high inrush of a long SWA run pits the breaker contacts; replace the protective device and the fault clears. The glands and armour, being steel, do not degrade in service.',
      'SWA faults appear almost entirely as conductor over-temperature inside the cores. The armour holds heat in, so the insulation breaks down along the whole run; the only rectification is to de-rate the circuit or upsize the cable, never to touch the glands.',
      "Three locations: the SWA gland's earth path through the armour to the gland body (poorly made, causing intermittent earth faults), the compound seal that hardens and lets water into the cores, and the cable run itself only when physically damaged.",
    ],
    correctAnswer: 3,
    explanation:
      'SWA fault locations cluster at the glands because the gland is the only point where the armour (the CPC) makes mechanical contact with earth. Bad gland = bad CPC = no earth fault clearance. The earth-path failure modes are insufficient armour compression, a missing earth tag, or paint between gland and box; cheap gland kits often fail at the earth-tag connection while CMP glands and Pratley compound are the trade standard. The diagnostic at this stage is recognising the gland as the most likely fault location.',
  },
  {
    id: 4,
    question: 'Where do faults appear in instrumentation and metering circuits?',
    options: [
      'Three categories: smart / utility meter internal failure (DNO replaces), sub-meter CT failure or terminal corrosion (electrician fix), and building instrument circuits where SELV sensor signals are disrupted by EMI from nearby high-current cables (substitution diagnosis).',
      'Metering circuits never develop faults you can work on — the meter belongs to the supplier and is sealed, so any metering complaint is purely a billing dispute. Refer the customer to their supplier and take no measurements; there is nothing on the installation side to investigate.',
      'Faults in metering only ever appear as low insulation resistance on the tails between the meter and the consumer unit. IR-test the tails at 500 V; if they pass, the meter is fine and the customer is mistaken. Sub-meters and instrument sensors do not fail.',
      'Instrumentation faults are always an earthing problem. Because sensors carry low signal voltages, a poor CPC lets noise swamp the signal; re-bond the metalwork and every metering fault clears. CT failures and sensor failures do not occur in practice.',
    ],
    correctAnswer: 0,
    explanation:
      'Instrumentation and metering have their own fault patterns. Smart meters fail internally (DNO replacement); sub-meters fail at terminations (electrician fix); building instrumentation fails at the sensor or in EMI-coupled signal wiring (substitution diagnosis). The apprentice meets these on commercial sites and needs the basic categorisation.',
  },
  {
    id: 5,
    question:
      'Why are control panels (motor starters, BMS controllers, fire alarm panels) common fault locations and how should they be approached?',
    options: [
      "They aren't common fault locations — control panels are factory-built and tested, so they almost never fail in service. Any fault on a machine traces back to the field wiring or the motor, never to the panel, so the apprentice skips the panel and checks the load.",
      'Three reasons combine: density (many terminations in a small space), heat (control electronics with inadequate cooling), and vibration (loosening terminations over time). Work them de-energised under permit-to-work, using the panel schedule to identify and replace components and retest each output.',
      'Because they are always wired in SELV, control panels can be worked on live with no isolation. The low voltage removes the shock risk, so the approach is simply to probe each terminal with a multimeter while the panel runs and replace whatever reads wrong.',
      'The only fault mode in a control panel is a blown control fuse. Replace the fuse; if it blows again, replace the whole panel. Density, heat and vibration play no part, and there is no need for a panel schedule or permit-to-work.',
    ],
    correctAnswer: 1,
    explanation:
      "Control panels are concentrated fault zones because density + heat + vibration combine. The apprentice doesn't normally LEAD control-panel fault investigation but does support a senior who's working on one. The supporting role includes documentation, isolation, retest, restoration.",
  },
  {
    id: 6,
    question:
      'Where do faults appear in EV charger installations (Zappi, Ohme, Pod Point, Tesla Wall Connector)?',
    options: [
      'EV chargers do not have characteristic fault locations — every brand is electronically different, so there is no pattern to exploit. The only diagnostic is to swap the whole unit for a new one and see if the fault clears, because the internals cannot be tested in the field.',
      "Faults appear only in the vehicle, never in the charger or its wiring. A charger that won't deliver a charge is always the car's onboard charger at fault; send the customer to the dealer and take no measurements on the installation.",
      "Five locations in frequency order: the CP (control pilot) signal connector, the charger's internal 6 mA DC RCM, the supply tail termination loosening under sustained 32 A load, the TT earth electrode, and the internal contactor after years of daily switching.",
      "The dominant EV charger fault is over-voltage from the supply. A supply above 253 V trips the charger's protection; the fix is to ask the DNO to drop the voltage. The control pilot, RCM, supply tail and contactor are sealed and effectively maintenance-free.",
    ],
    correctAnswer: 2,
    explanation:
      'EV chargers are increasingly common in domestic installations and bring their own fault patterns. The CP signal fails through a corroded or wet J1772/Type 2 connector; the 6 mA DC RCM is often behind a charger that will not start; the supply tail loosens under 32 A continuous for 5+ hours per charge; the TT electrode (Reg 722.411) degrades, causing earth-fault timing issues; the contactor wears after 5+ years. Manufacturer technical bulletins (Zappi, Ohme) document the typical fail modes and replacement procedures.',
  },
  {
    id: 7,
    question:
      'Where do faults appear in fluorescent and LED lighting installations on commercial sites?',
    options: [
      'Commercial lighting faults appear only in the distribution board feeding the lighting circuits. Because hundreds of fittings share a few circuits, the fault is always at the MCB or RCBO; reset or replace the protective device and the lighting returns. Individual fittings do not fail.',
      'The only lighting fault worth diagnosing on a commercial site is cable insulation breakdown in the trunking. The heat of densely packed fittings degrades the insulation along the run; IR-test each circuit and replace the cable. Ballasts, drivers and lampholders are sealed and maintenance-free.',
      'Lighting faults are almost always over-voltage events. Commercial supplies run hot and spike above 253 V, destroying lamps and drivers across whole banks at once; the fix is a surge protective device at the board plus a wholesale lamp replacement, not component-level diagnosis.',
      'Five categories: fluorescent ballast failure, starter failure on older fittings, LED driver failure (often fitting-specific), lampholder oxidation (especially GU10), and overloaded circuits where LED inrush trips a circuit designed for fluorescent.',
    ],
    correctAnswer: 3,
    explanation:
      'Lighting is one of the most-common fault categories on commercial sites because the installations are large (hundreds of fittings) and the components have finite life (5–10 years for drivers, 20+ for fittings). Ballasts hum or go silent, starters cause repeated start attempts, LED drivers go dark or flicker (Aurora, Ansell, Bell drivers are matched to the fitting), GU10 spring contacts arc, and too many LED drivers on a fluorescent-rated circuit nuisance-trips on inrush. Knowing the modes lets you replace components rather than whole fittings, saving cost and time.',
  },
  {
    id: 8,
    question: 'Where do faults appear on outdoor / external electrical installations?',
    options: [
      'Five high-frequency locations: outdoor sockets (gasket degradation, rain-triggered RCD trips), garden lighting transformers (condensation), outdoor fittings whose seals break with age, conduit and containment (UV, frost, rodents), and underground cable runs (settlement, root or dig damage).',
      'Outdoor installations fail in exactly the same places as indoor ones — at terminations and accessories — and the weather makes no difference. Diagnose an outdoor fault identically to an indoor one and ignore gaskets, UV and frost, which do not affect modern materials.',
      'The only outdoor fault location worth checking is the RCD at the consumer unit. Outdoor circuits trip their RCD on rain because the RCD becomes over-sensitive outdoors; replace the RCD and the trips stop. The outdoor sockets, fittings and cable runs themselves do not degrade.',
      'Outdoor faults appear almost entirely as volt-drop on long garden cable runs. The distance to the outbuilding starves the load; upsize the cable and the fault clears. Water ingress, UV and frost are minor and rarely cause an in-service fault.',
    ],
    correctAnswer: 0,
    explanation:
      "Outdoor installations face environmental stress that indoor wiring doesn't. Water, UV, frost, vermin, settlement — all attack the installation. Knowing the specific failure modes by location category helps the apprentice predict where to look first.",
  },
];

const faqs = [
  {
    question:
      'Why do socket terminals loosen over time even when they were properly tightened at installation?',
    answer:
      "Three factors. (1) Thermal cycling — every load on the socket heats the conductor at the terminal; cooling contracts the conductor; the screw doesn't follow the contraction perfectly, gap forms, contact resistance rises, more heat next cycle. (2) Vibration — building vibration over years (footfall, traffic, machinery) loosens marginally-tight screws. (3) Conductor creep — copper under sustained pressure deforms slowly; the conductor cross-section under the screw flattens, the screw effectively backs out. Modern push-fit terminals (Wago lever clamps, Click Smart spring terminals) avoid the screw-loosening problem but introduce other failure modes (intermittent contact on solid copper).",
  },
  {
    question: 'Which brand of CU is most reliable for the long term?',
    answer:
      "Schneider Acti9 and Hager — both at the top of trade preference for long-term reliability. Wylex NHX is good mid-market. MK Sentry is reliable hardware but the manufacturer's warranty support has been criticised. Crabtree Starbreaker is older but still in service in many properties. The 6 kA fault current rating is standard; 10 kA rating (Schneider, Hager premium ranges) gives more headroom for properties near substation or with high PSCC. Avoid: anything unbranded, anything below 6 kA rated.",
  },
  {
    question: "What's the most-likely fault location on a 1990s rubber-cable installation?",
    answer:
      "The cables themselves. Rubber-insulated cables degrade — the rubber hardens, cracks, the cores eventually short or earth. Standard finding on EICRs of 1980s and earlier installations. The fault locations on these aren't terminations or accessories — they're entire cable runs. Rectification is rewire of the affected circuits, not patch repair. The apprentice meets these on heritage / older property surveys; the recommendation is usually 'recommend full rewire — Code 2 (improvement recommended)' on EICR.",
  },
  {
    question: 'How do I know if a fault is at a junction box rather than at a socket?',
    answer:
      'Sequential testing. Disconnect the suspected socket and IR test from the DB end. If the fault clears, the issue is downstream of the socket (likely the socket itself or a downstream connection). If it persists, the fault is upstream — likely a junction box on the cable run between the socket and the DB. Re-check at each accessible junction box back to the DB. Modern installations have fewer junction boxes (most use accessible accessories or Wago in-line connectors); older installations have many hidden JBs in lofts, ceiling voids, under floors.',
  },
  {
    question:
      "What's the difference between a 'spur' and a branch on a ring final, and why does it affect fault diagnosis?",
    answer:
      "A SPUR is a single-socket extension from a ring, drawing from one point only (one conductor pair from the ring). A BRANCH is a deviation from the main ring topology (loop-in, loop-out, possibly to multiple sockets). Spurs are limited to one accessory under BS 7671 433.1.5 and have no return path — fault diagnosis on a spur is straightforward (open / short / leak in or to the spur). A branch becomes a sub-ring or radial — fault diagnosis depends on the topology, which often isn't documented. The customer's 'we added that socket years ago' often signals a spur or branch that's the fault location.",
  },
  {
    question:
      'Where do faults appear in newer Smart Home installations (Hue, smart switches, KNX, Loxone)?',
    answer:
      "Smart Home installations have all the standard fault locations plus three new categories. (1) Comms failure — wireless signal loss (Hue Hub disconnected, Zigbee mesh broken), wired bus failure (KNX bus damaged), router issues. (2) Power supply failure — many Smart Home systems run on 12 V or 24 V DC PSUs which fail. (3) Configuration drift — software updates change behaviour, devices get re-paired, settings get lost. The apprentice deals with the electrical layer (mains supply, power supply, hard-wired switches); the smart-home configuration is usually the integrator's responsibility (Crestron, Loxone partner, Hue support).",
  },
];

const DESCRIPTION2 =
  "Faults that live INSIDE customer equipment — appliance motors, immersion heaters, LED drivers, EV chargers, PV inverters — and the L–N–E signature each leaves on the meter. The apprentice's recognition discipline for separating wiring faults from equipment faults, and the boundary between an electrician's fix and a manufacturer's warranty.";

const checks2 = [
  {
    id: 'mod4-s3-sub6-immersion',
    question:
      "A 3 kW immersion heater has been tripping the 30 mA RCBO every time it's switched on for the past week. You isolate, prove dead, disconnect the supply at the switched fused connection unit (SFCU), and put your Megger MFT1741+ on the heater terminals. IR test at 500 V L+N to E reads 0.12 MΩ. What's the diagnosis?",
    options: [
      'The element is healthy at 0.12 MΩ; the RCBO trips because of a high-resistance joint at the SFCU back-terminal dropping voltage under load. Re-terminate the SFCU and recommission — the element does not need replacing.',
      'The element has gone to earth — a sheath pinhole into the water, or moisture tracking the brass head from a leaking cylinder. 0.12 MΩ is well below the 1 MΩ minimum and leaks enough to trip the RCD on switch-on. Replace the element and check the cylinder for leaks.',
      'The thermostat has welded its contacts closed, holding the element energised and overloading the circuit on every switch-on. Replace the immersion thermostat only, leave the element in place, and recommission.',
      'The reading is acceptable — 0.12 MΩ exceeds the 0.1 MΩ minimum for heating elements, so the element is serviceable. The trip is nuisance tripping; fit a 100 mA RCBO to stop it and leave the element alone.',
    ],
    correctIndex: 1,
    explanation:
      "Immersion-element earth-fault is the single most common immersion-circuit fault. The element is the metal coil immersed in water; when the sheath develops a pinhole the conductor is in direct contact with the water and the customer's bonded copper pipework, so the RCD sees the leakage as a residual current and trips. 0.12 MΩ at 500 V is well below the 1 MΩ Reg 643.3 acceptance, and the leakage calculates to roughly 1.9 mA — enough to trip a 30 mA RCD on the switch-on transient. The routine: isolate the element from the wiring; IR-test its terminals to body/earth at 500 V; replace with a brass-flanged Backer / Heatrae Sadia element; re-test IR (a healthy new element reads > 200 MΩ), check the cylinder for leaks, and recommission confirming no trip.",
  },
  {
    id: 'mod4-s3-sub6-leddriver',
    question:
      "Six-month-old LED downlights in a kitchen flicker continuously, even with the switch fully on. The 3-gang switch is a Hager dimmer rated for LED. The downlights are 8 W constant-current drivers. What's the hypothesis?",
    options: [
      "Dimmer-driver incompatibility — even an 'LED-rated' dimmer doesn't work with every driver, and a non-listed combination is the most likely cause. Bypass the dimmer with a normal switch to confirm, then check the compatibility list against the driver brand.",
      'All six lamps are faulty and need replacing. Six-month-old LED lamps commonly fail together from a poor batch; condemn the lamps, fit a known-good brand, and the flicker will clear regardless of the dimmer.',
      'The supply voltage is too high. A 250 V supply over-drives the constant-current drivers and makes them pulse; ask the DNO to reduce the supply and fit a step-down transformer on the lighting circuit meanwhile.',
      'The CPC on the lighting circuit is disconnected, so the drivers have no earth reference and float, producing flicker. Re-terminate the CPC at the ceiling roses and the flicker will stop; no need to look at the dimmer.',
    ],
    correctIndex: 0,
    explanation:
      "LED + dimmer compatibility is the dominant lighting fault now that incandescent has gone. The candidate hypotheses in order: (1) dimmer-driver compatibility — even 'LED-rated' dimmers don't work with every driver, and 60–70% of flicker complaints trace to a non-listed combination; (2) total wattage below the dimmer's minimum load (typically 10 W), leaving it unable to fire the triac; (3) a single failing driver pulling the others into instability through a shared neutral. The apprentice carries the manufacturer's compatibility chart (Hager, Schneider Lisse, Crabtree, Varilight, MK) and matches the dimmer model to the driver brand; if loads are too low, add a dummy-load module or fit a matched leading-/trailing-edge dimmer. The 'all the lamps are faulty' answer is the trap — it's almost never the lamps. EAWR Reg 16 expects this product-knowledge layer at this level.",
  },
  {
    id: 'mod4-s3-sub6-ev',
    question:
      "Customer reports their Wallbox Pulsar Plus 7 kW EV charger refuses to start a charge — green ready light goes solid, then drops to flashing red within 3 seconds, no current drawn. You IR-tested the dedicated EV circuit at install (reads 999 MΩ); the RCD-Type-A + DC-leakage detection in the unit is healthy on test. What's the next step?",
    options: [
      'Immediately replace the wallbox under warranty — a flashing red light within 3 seconds always means an internal contactor failure, and nothing further can be tested once the install IR is good. Order a replacement Pulsar Plus and swap it.',
      "Re-test the install IR at 250 V instead of 500 V. The original 999 MΩ reading at 500 V damaged the charger's electronics; repeating at 250 V will verify the wiring and reset the fault, so no further investigation is needed.",
      'Increase the upstream protective device from 32 A to 40 A. The charger drops out because the 32 A RCBO cannot supply the 7 kW start-up surge; uprating it lets the charge begin once the cable CSA is confirmed to support the larger device.',
      "Check the charger's diagnostic LEDs / app fault code first — flashing red on a Pulsar Plus typically codes as a communication or vehicle-handshake fail, which the L–N–E circuit being healthy won't show. Then verify with a second known-good vehicle before condemning anything.",
    ],
    correctIndex: 3,
    explanation:
      "EV charging faults split into three categories: (a) wiring / supply — your job (IR, Zs, RCD test); (b) the charger / EVSE itself — manufacturer warranty if < 2 years, sometimes firmware-updateable; (c) vehicle-side handshake or onboard charger — the vehicle's problem. The SAE J1772 / IEC 61851 protocol is a low-voltage 12 V handshake: the charger sends a PWM signal on the CP pin and the vehicle pulls the line down through resistors to indicate state, so a flaky cable, dirty plug or EV-side software issue can fail it without any L–N–E fault. The apprentice confirms (a) is healthy, rules out the handshake and the customer's vehicle (a second car that charges proves the fault is the original car), then hands off — never replacing the wallbox first. Replacing kit before ruling out the handshake is a chargeable mistake the firm wears.",
  },
];

const quizQuestions2 = [
  {
    id: 1,
    question:
      "What's the structural difference between a wiring-side fault and an equipment-side fault from a diagnostic perspective?",
    options: [
      'The two are diagnosed identically — both show up as a low insulation-resistance reading at the consumer unit, so there is no need to isolate the load. Whichever reads below 1 MΩ at 500 V is the fault, and you rectify it on the spot.',
      'A wiring-side fault stays present when you isolate the load; an equipment-side fault disappears from the fixed installation once the load is disconnected. The separator is to disconnect at the SFCU / plug and re-test the wiring — clean wiring means the fault is in the equipment.',
      'A wiring-side fault only ever trips the MCB, and an equipment-side fault only ever trips the RCD. You tell them apart by reading the trip-cause flag on the RCBO — a red flag is always wiring, a yellow flag is always the appliance.',
      'An equipment-side fault is always the more dangerous of the two because the appliance is what the customer touches. Treat any appliance fault as a Code 1 (Danger Present) and isolate the whole installation until the manufacturer attends, regardless of what the wiring tests show.',
    ],
    correctAnswer: 1,
    explanation:
      "A wiring-side fault lives in the fixed installation (cables, accessories, terminations, JBs, switchgear) and remains when you isolate the load; an equipment-side fault lives in the connected appliance (element, motor, driver, control board) and vanishes from the fixed wiring once the load is disconnected. The disconnect-and-retest move at the SFCU / plug / terminal block is the fault-localisation discipline that separates them — if the fixed wiring tests clean, the fault is in the equipment, and the customer's recourse is the manufacturer's warranty or a service engineer, not your repair to charge. Misdiagnosing equipment as wiring is a common and costly mistake.",
  },
  {
    id: 2,
    question:
      "A motor on a workshop extractor fan trips the MCB on every start-up. What's the hypothesis tree?",
    options: [
      'Insulation breakdown in the motor windings is the only realistic cause. IR-test the motor at 500 V; a reading below 1 MΩ confirms it, and the motor must be rewound or replaced. There is no point checking anything else first.',
      "The MCB is the wrong type. Trip-on-start always means a B-curve breaker that can't tolerate inrush; the only fix is to uprate the breaker to a D-curve and the symptom will clear, whatever the motor's internal condition.",
      'Check the run capacitor first, then bearings, centrifugal switch and terminal block in turn. A failed cap is the most common fault and cheapest fix — test it on the capacitance range and replace if outside ±10% of rated value before condemning the motor.',
      'The fault is always upstream in the fixed wiring. A motor that trips on start has a high-resistance joint at the SFCU feeding it; re-terminate the SFCU and the inrush will flow cleanly. The motor itself never causes a start-up trip.',
    ],
    correctAnswer: 2,
    explanation:
      "Single-phase induction motors are the most common motor type on commercial small plant — extractors, circulators, drive units, cooling fans. The hypothesis tree, walked in order: (1) run capacitor failed open or shorted — these motors need the run cap for starting torque, and a failed cap means stalled-rotor current of 5–8 × FLA until the MCB trips; test on the capacitance range and replace if outside ±10%; (2) bearings seized or stiff — rotate the rotor by hand; (3) centrifugal-switch contacts welded on older motors, keeping the start winding in circuit; (4) a loose or wrong connection at the motor terminal block. The capacitor is checked first because it's the most common fault and the cheapest fix, and the symptom — trips on start, runs OK once kicked over by hand — is its diagnostic signature.",
  },
  {
    id: 3,
    question:
      "Customer complaint: 'all my LED downlights are dim'. You arrive, observe the dimming, and IR-test the lighting circuit (reads 200 MΩ — healthy) and Zs (within table). What's the most likely diagnosis?",
    options: [
      'A high-resistance joint somewhere on the lighting circuit. The HRJ drops voltage and dims every fitting downstream of it; trace the circuit with a low-ohms test, find the loose terminal, re-make it and full brightness returns. The clean IR and Zs results rule nothing out.',
      'The CPC has gone open-circuit. With no earth reference the drivers cannot regulate and run dim; re-terminate the CPC at each rose and the lamps return to full output. The healthy IR and Zs readings are irrelevant to this fault.',
      "The lamps are simply at end of life. LED downlights dim gradually as the phosphor degrades; after a few years they all dim together. Replace the lamps and the problem clears — measuring the supply would waste the customer's time.",
      'The drivers are running outside their normal voltage — most likely supply under-voltage starving them, or the dimmer at minimum, or ageing constant-current circuits. Measure supply voltage at the cut-out first, bypass the dimmer, then replace one driver as a test.',
    ],
    correctAnswer: 3,
    explanation:
      "Driver-side dimming faults present as 'wiring-like' symptoms but the wiring tests are always clean — that's the diagnostic separator. The candidates are: (a) supply voltage below the driver's input range — e.g. L–N reads 215 V against a 220–240 V driver spec, so check the upstream sub-main and the DNO if voltage is < 216 V (statutory 230 V −6%); (b) a dimmable driver with the dimmer set to minimum; (c) drivers ageing, with the constant-current circuit degrading (typical onset 4–7 years in a hot environment). The apprentice tests supply voltage at the cut-out FIRST (Reg 312 supply characteristics), because DNO under-voltage is increasingly common as networks come under load from EV charging and PV export; if supply is OK, the drivers are the candidate.",
  },
  {
    id: 4,
    question:
      "What's the BS 7671 Reg 643.3 (A4:2026 redraft) requirement when IR-testing a circuit that has connected electronic equipment?",
    options: [
      'Where connected equipment could influence the test or be damaged by the test voltage, a 250 V DC IR test is used after the equipment is connected; the 500 V test still applies first with the equipment disconnected to confirm the wiring itself. This two-stage test (500 V isolated, 250 V re-connected) is the A4:2026-aligned procedure.',
      'Always IR-test the whole installation at 1000 V DC with all electronics left connected. The higher voltage gives the most reliable reading, and modern electronic equipment is designed to survive it; a 250 V test is too low to detect a real insulation fault.',
      'Disconnect every item of connected equipment and test at 500 V only. A 250 V test is never acceptable for verification because the 1 MΩ minimum can only be confirmed at 500 V, so the equipment must always be removed before any IR test.',
      "Skip the IR test entirely where electronic equipment is present, because any test voltage will damage the kit. Record the circuit as 'IR limitation — electronics fitted' and rely on the RCD test alone to verify the circuit's integrity.",
    ],
    correctAnswer: 0,
    explanation:
      "The 643.3 redraft is the most diagnostic-relevant A4:2026 change for fault work. After fixing a fault and reconnecting electronics (LED drivers, dimmers, electronic timers, smart sockets), the 250 V range verifies the post-fix IR without damaging the kit, while the 500 V isolated test confirms the wiring is healthy. The two-stage test verifies both the wiring and the as-installed leakage path; skipping the 250 V follow-up means you don't know whether your repair introduced leakage from a damaged driver — and that's how a 'fixed' circuit comes back to trip the next day.",
  },
  {
    id: 5,
    question:
      "PV inverter (SolarEdge, Solis, Fronius, GoodWe — typical UK brands) reports a fault code on its display. What's the boundary between your job and the inverter manufacturer's job?",
    options: [
      'Any fault code on the display means the whole job is yours. Open the inverter, read the internal board indicators and replace whichever component the code points to; a competent electrician is expected to repair inverter internals before calling the manufacturer.',
      'Confirm the AC-side boundary (supply voltage, neutral, AC isolator and RCBO) and the DC-string boundary (string voltage, IR, open-circuit voltage) are healthy with documented evidence, then escalate inverter-internal faults to the manufacturer. The AC side is yours, the DC side yours with PV competence, the internals are not.',
      'None of it is your job once a fault code shows. A displayed fault code is always an internal inverter problem, so escalate straight to the manufacturer without touching the AC supply or the DC strings — testing them would only void the warranty.',
      "Isolate the AC side only and leave the DC strings energised, then call the customer's energy supplier. PV faults are a supplier metering matter, not an electrical one; the supplier resets the inverter remotely and clears the code over the network.",
    ],
    correctAnswer: 1,
    explanation:
      "PV fault diagnosis is layered across three categories: (1) AC-side faults — supply or grid frequency out of spec, lost neutral, RCD trip on the AC isolator — your job: measure the AC supply at the inverter terminals, check the AC isolator and dedicated RCBO; (2) DC-side faults — string voltage out of spec, string isolation fault, broken module — your job with PV competence, using the MFT in PV mode for an IR test and open-circuit voltage check at the DC isolator; (3) inverter-internal faults (firmware, MPPT, internal IGBT) — the manufacturer's warranty or service engineer's job. The apprentice rules out (1) and (2), then escalates (3) with documented evidence. PV competence requires additional training (City & Guilds 2399-13, MCS); the apprentice supports the qualified PV installer.",
  },
  {
    id: 6,
    question:
      "What's the diagnostic signature of a failing washing machine motor on the L–N–E test?",
    options: [
      'There is no diagnostic signature — a failing washing machine motor reads identically to healthy fixed wiring on every L–N–E test. The only way to confirm it is to dismantle the machine, so the apprentice strips the appliance down on site.',
      "A failing motor always raises the circuit's Zs above the Table 41.3 maximum. Measure Zs at the socket; if it is high, the motor is the cause, and you rectify by re-terminating the socket back-box rather than touching the machine.",
      'The signature depends on the failure mode — winding insulation breakdown reads < 1 MΩ L–E and trips the RCD on start, a winding short trips the MCB on inrush, an open-circuit winding draws nothing. Isolate the machine at the plug, prove the socket healthy with a known-good appliance, then advise the customer the appliance is at fault.',
      "A failing motor only ever shows as cumulative earth leakage on a clamp meter and never as low IR. Clamp L+N at the consumer unit; if leakage is above 30 mA the motor is failing, but the machine's own IR will always read healthy.",
    ],
    correctAnswer: 2,
    explanation:
      "Washing machines, dishwashers and tumble dryers are the most common 'appliance trips the RCD' fault on a domestic call-out. The three signatures: (1) insulation breakdown in the windings — IR L–E reads < 1 MΩ at 500 V as the commutator and brush gear degrade in wash-water aerosol, tripping the RCD on start; (2) a short between phases (or run/start windings) — high inrush trips the MCB or burns out the motor; (3) an open-circuit winding — no start, no current, no trip. The diagnostic move is to isolate the appliance, IR-test the supply circuit (clean), and advise the customer the appliance is at fault — the apprentice does NOT spend hours testing wiring already proven healthy.",
  },
  {
    id: 7,
    question:
      "A 7 kW EV charger has been working fine for 18 months and now intermittently trips the upstream RCBO when starting a charge. The inbuilt RCD-Type-A + 6 mA DC-leakage detection has not flagged. What's the hypothesis?",
    options: [
      "The charger's internal contactor has failed. After 18 months of daily switching the contacts pit and arc on closing, tripping the upstream RCBO. The fix is to replace the wallbox; nothing on the supply side needs checking because the install IR was good.",
      'The dedicated EV cable has been damaged by rodents and is now leaking to earth. Re-run the supply cable in steel conduit and the intermittent trips will stop; a clamp meter would only confirm what the symptom already tells you.',
      'The upstream RCBO has drifted and is now tripping below its rated 30 mA. Swap it for a fresh 30 mA RCBO and the problem clears; the charger and the rest of the installation are healthy.',
      "Cumulative leakage from the charger PLUS other appliances on the same shared upstream RCBO, not the charger alone. Clamp the RCBO's L+N with a leakage clamp meter to read steady-state residual current; if it's > 15 mA, the charger needs its own dedicated RCD per Reg 722.531.3.",
    ],
    correctAnswer: 3,
    explanation:
      "Cumulative leakage on shared RCDs is the dominant cause of intermittent EV-charger trips on retro-fitted EVSE in older boards. Modern chargers leak 1–3 mA continuously to earth through their internal filter caps (normal); if the upstream RCBO is shared with other circuits also running filter caps (LED drivers, IT kit, induction hob electronics), the cumulative leakage can sit at 15–20 mA — within the 30 mA threshold but close enough that the charger's start-up surge pushes it over. The diagnostic move is the leakage clamp (Fluke 360, Megger DCM340) on the RCBO, not replacing the EV charger; the A4:2026 layer reinforces a dedicated RCD per EV charger circuit (Reg 722.531.3) for exactly this reason.",
  },
  {
    id: 8,
    question:
      "Customer reports the cooker hood (1 kW with built-in LED panel) makes a buzzing noise and the lights flicker when the induction hob below it is in use. What's the diagnosis?",
    options: [
      "Mains-borne EMC interference — the induction hob's high-frequency switching couples into the hood's LED driver, modulating its output and buzzing its chassis. Both items are individually compliant but incompatible together. Fix by fitting a higher-spec driver or a mains filter, or escalate to the hood manufacturer. Not a wiring fault.",
      "A shared neutral fault between the hood circuit and the hob circuit. The hob's load current is returning through the hood's neutral, dropping voltage and dimming the LED panel. Trace and separate the neutrals at the consumer unit and the buzz and flicker will stop.",
      "Volt-drop on an undersized supply cable. The hob's heavy current pulls the voltage down whenever it runs, starving the hood's LED panel. Upsize the supply tail to the kitchen and the flicker clears; the buzz is just the cable resonating under load.",
      "A high-resistance joint at the hood's connection unit. The HRJ heats and arcs only when the hob's load raises the circuit current, which is why the buzz and flicker appear together. Re-make the connection-unit terminals and both symptoms disappear.",
    ],
    correctAnswer: 0,
    explanation:
      "Induction hobs run an inverter at 20–100 kHz that puts harmonic content on the supply; cheap LED drivers without proper EMC filtering pick it up and modulate their output, causing the flicker, while magnetic coupling to the hood's transformer / chassis is the buzz. Both items are individually compliant with BS EN IEC 61000-3 but together they're a cumulative EMC failure. EMC compatibility issues are increasingly common as customer kit (induction hobs, EV chargers, PV inverters, VSDs) gets more electronic. The apprentice recognises the signature — problem starts when a specific other appliance is in use, wiring tests are clean — and helps the customer choose a fix (better-spec driver, mains filter, escalation to the manufacturer).",
  },
];

const faqs2 = [
  {
    question: "How do I tell whether a fault is in the wiring or in the customer's equipment?",
    answer:
      'The disconnect-and-retest move. Isolate the equipment at its plug, switched fused connection unit (SFCU), or terminal block; re-test the fixed wiring with IR (500 V to earth, 250 V if other electronics remain connected per Reg 643.3) and continuity. If the wiring is healthy and the equipment fault persists once reconnected, the fault is in the equipment. The diagnostic confidence comes from the contrast — clean wiring tests + faulty operation = equipment problem.',
  },
  {
    question:
      "What's the boundary between an electrician's repair and a manufacturer's warranty fix?",
    answer:
      "Three layers. Anything inside the customer's equipment (motors, drivers, control boards, internal wiring of an appliance) is the manufacturer's warranty (if < 2 years on most domestic appliances under the Consumer Rights Act 2015) or a service engineer's job. Anything in the fixed installation (cables, accessories, terminations, switchgear) is your job. The terminal block / plug / SFCU is the boundary. The apprentice diagnoses up to the boundary, documents the test evidence, and hands off the equipment side to the manufacturer or service engineer.",
  },
  {
    question:
      'Why does the A4:2026 IR-test redraft (Reg 643.3) matter so much for equipment-side faults?',
    answer:
      "Because the 250 V follow-up after equipment is reconnected is the test that catches a leakage path the original 500 V isolated test couldn't see. A driver that's degraded but not fully failed leaks a few hundred microamps to earth — the 500 V isolated test (with the driver disconnected) shows clean wiring; the 250 V test with the driver connected shows the actual as-installed leakage. The A4:2026 procedure makes this a documented two-stage test rather than an optional check, and it's exactly the test that prevents 'fixed it but it tripped again' callbacks.",
  },
  {
    question: 'Are LED dimmer compatibility issues really that common?',
    answer:
      "Yes — by some industry estimates 60–70% of LED flicker complaints come back to a non-listed dimmer-driver combination. The technology has matured but compatibility hasn't standardised; every dimmer manufacturer publishes a list of tested-and-approved drivers, and pairing outside that list is the dominant cause. The apprentice carries the compatibility chart for the dimmers their firm fits (Hager, Schneider Lisse, Crabtree, Varilight, MK) and matches the driver brand to the chart before installing.",
  },
  {
    question: 'What does an apprentice do when a PV inverter fault code appears?',
    answer:
      "Confirm the AC-side and DC-side boundaries are healthy with documented test evidence, then escalate the inverter-internal fault to the manufacturer or to a qualified PV installer. AC side: measure supply voltage at the inverter's AC terminals (within the inverter's spec — typically 207–253 V for a 230 V grid-tie), check the AC isolator, check the dedicated RCBO. DC side: check the DC isolator, IR-test the string, open-circuit voltage on the string. If both boundaries are healthy, the inverter is the issue and you don't open it — manufacturer warranty (typical 5–10 years on UK-installed inverters under MCS) or qualified PV service engineer.",
  },
  {
    question: "Cumulative leakage on a shared RCD — how do I prove it's not one specific circuit?",
    answer:
      "Clamp the L+N together at the RCD with a leakage clamp meter (Fluke 360, Megger DCM340) and read the steady-state residual current. If it's a healthy installation with no faults, you'll typically see 1–8 mA total — that's filter-cap leakage from electronics on the protected circuits. If it's > 15 mA you're close to nuisance trip; if it's > 25 mA you're at imminent trip threshold. Then isolate each protected circuit one at a time and re-clamp — the contribution of each circuit shows as a step-down. The fix is usually to split the loads onto separate RCDs (RCBO per circuit is the A4:2026-aligned best practice) rather than chasing a single 'fault'.",
  },
];

export default function Lesson318E_3_2() {
  return (
    <div className="space-y-8">

      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        Where faults appear, by category — terminations (BS 7671 526.1), wiring systems,
        accessories, switchgear, instrumentation. Brand-specific failure modes for Hager /
        Schneider / Wylex / MK / Crabtree / BG / Aurora / JCC.
      </p>

      <TLDR
        points={[
          'Most faults are at terminations — busbar, socket back-terminal, junction box. BS 7671 526.1 is the regulation; thermal cycling, vibration and conductor creep are the mechanisms.',
          'Each brand has known failure modes — Hager busbar drift, Wylex enclosure stress, Schneider terminal blocks. Brand knowledge speeds diagnosis.',
          'SWA glands fail at the earth-tag connection. EV chargers fail at the CP signal, the DC RCM, or the supply tail termination. Outdoor sockets fail at the gasket.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Identify the three high-frequency termination locations — busbar, socket back-terminal, junction box — and explain why each fails.',
          'Recognise brand-specific failure modes for common UK CU brands (Hager, Schneider, Wylex, MK, Crabtree).',
          'Locate faults on ring final circuits — sockets, spurs, branches, ring breaks — using sequential testing.',
          'Identify SWA gland failure modes (earth-tag, compound seal) and locate them as common commercial fault sites.',
          'Recognise EV charger fault locations — CP signal, DC RCM, supply tail, earth electrode, internal contactor.',
          'Apply brand and category knowledge to predict where to look first when investigating a fault.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>Terminations — the dominant fault location</ContentEyebrow>

      <ConceptBlock
        title="Three high-frequency termination locations"
        plainEnglish="Most faults are at terminations because terminations are where two conductors meet and mechanical contact is the only thing maintaining electrical contact. Any disturbance loosens the contact; loose contact is HRJ; HRJ is fire risk."
        onSite="The apprentice's mental model: 'where would a previous installer have made a connection?' is usually the right answer to 'where's the fault?'. CU busbar, back-of-socket terminals, junction boxes — investigate in that order."
      >
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Consumer unit busbar terminations</strong> — under-torqued at install,
            oxidised over time, exposed under high inrush. Common in Hager / Schneider / Wylex
            CUs.
          </li>
          <li>
            <strong>Socket back-terminals</strong> — particularly on ring final loop-in
            conductors; cheap accessories where the screw stops short of fully clamping the
            conductor. MK / Crabtree / BG.
          </li>
          <li>
            <strong>Junction boxes</strong> — old porcelain/screw boxes (loose over time), Wago
            push-fit on solid copper conductors (intermittent contact issue), unidentified JBs
            hidden in lofts.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Reg 526.1 (Connections)"
        clause={
          <>
            "Every connection between conductors or between a conductor and other equipment shall
            provide durable electrical continuity and adequate mechanical strength and
            protection."
          </>
        }
        meaning={
          <>
            Three requirements: durable continuity (low resistance over time), mechanical strength
            (doesn't loosen), protection (doesn’t expose live parts). The fault
            diagnostician’s most-often-cited regulation — every HRJ is a 526.1 failure on at
            least one of the three legs.
          </>
        }
        cite="Source: BS 7671:2018 incorporating Amendment 2:2022, Reg 526.1."
      />

      <InlineCheck {...checks[0]} />

      <SectionRule />

      <ContentEyebrow>Brand-specific failure modes</ContentEyebrow>

      <ConceptBlock
        title="Each brand has known weaknesses — knowing them speeds diagnosis"
        onSite="Brand knowledge separates an experienced fault diagnostician from a beginner. The trade press, manufacturer technical bulletins and forums document the patterns. The apprentice builds the knowledge over time; the senior carries it as standard."
      >
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Hager 6 kA RCBOs</strong> — thermal element drift after 15+ years; busbar
            terminations need annual re-torque. Look at the busbar first.
          </li>
          <li>
            <strong>Wylex NHX</strong> — plastic enclosure stress fractures around the busbar
            after thermal cycling. Look for cracks, then terminations.
          </li>
          <li>
            <strong>Schneider Acti9</strong> — generally robust; known for incoming terminal block
            failures on the larger 100 A units.
          </li>
          <li>
            <strong>MK Sentry</strong> — reliable hardware; warranty support criticised. Look at
            standard termination locations.
          </li>
          <li>
            <strong>Crabtree Starbreaker</strong> — older series; RCBO trip-time slows
            significantly past 12 years. Test trip-time first.
          </li>
          <li>
            <strong>Aurora downlighters</strong> — driver failure at 7–10 years typical; replace
            driver, retain fitting.
          </li>
          <li>
            <strong>JCC LED panels</strong> — internal driver / LED failure; manufacturer warranty
            good for 5 years.
          </li>
          <li>
            <strong>BG outdoor sockets</strong> — gasket degrades at 8–10 years; replace gasket,
            retain socket if otherwise sound.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Wiring systems — ring finals, radials, SWA</ContentEyebrow>

      <ConceptBlock title="Where faults appear by circuit topology">
        <p>
          <strong>Ring final fault locations</strong> in approximate frequency order:
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>Socket back-terminals (loop-in conductors loosen over time).</li>
          <li>The ring break point (where a previous installer cut and rejoined the ring).</li>
          <li>Spur joins (1-socket spurs from the ring; the join is in a JB).</li>
          <li>
            Cable damage from chasing-and-replastering, particularly where chases got dampened.
          </li>
        </ul>
        <p>
          <strong>SWA fault locations</strong>:
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>Gland earth-tag — armour-to-earth path through the gland body.</li>
          <li>Compound seal — hardens / shrinks over years, water ingress.</li>
          <li>Cable run only when physically damaged (forklift, settlement, vermin).</li>
        </ul>
        <p>
          <strong>Radial circuit fault locations</strong>:
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>Terminal at the load (the end-point under highest stress).</li>
          <li>Cable damage along the run.</li>
          <li>Breaker terminal at the DB.</li>
        </ul>
      </ConceptBlock>

      <InlineCheck {...checks[1]} />

      <SectionRule />

      <ContentEyebrow>Accessories, switchgear, instrumentation</ContentEyebrow>

      <ConceptBlock title="Where faults appear in equipment beyond cable + terminal">
        <p>
          <strong>Switches and accessories</strong>:
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            Switch contacts pit / oxidise over years of operation; click-and-hold operation
            suggests contact issue.
          </li>
          <li>
            Plastic switch plates crack from over-tightening at install or thermal stress in
            service.
          </li>
          <li>
            Combined switch+socket faceplates concentrate failure points (switch contact + socket
            terminal in one).
          </li>
        </ul>
        <p>
          <strong>Switchgear (MCBs, RCBOs, RCDs)</strong>:
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>Mechanical wear of toggle / contacts after thousands of operations.</li>
          <li>Electrical wear from repeated fault clearance (pitted contacts).</li>
          <li>RCD coil saturation, electronic detection drift — slow trip-time on MFT test.</li>
        </ul>
        <p>
          <strong>Instrumentation and metering</strong>:
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>Smart meter internal failure (DNO replacement).</li>
          <li>Sub-meter terminal corrosion and CT failure.</li>
          <li>Building instrumentation sensor failure, EMI on signal cabling.</li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Reg 522.6.202"
        clause={
          <>
            "A cable installed in a wall or partition shall comply with the requirements set out
            in Table 52.1: (a) be installed in a prescribed zone; and (b) be provided with
            additional protection by means of an RCD having the characteristics specified in
            Regulation 415.1.1; or (c) comply with Regulation 522.6.204."
          </>
        }
        meaning={
          <>
            Likely fault locations include cables that aren&apos;t where you expect them. The
            Regulation defines the prescribed zones (vertical/horizontal lines from accessories)
            and gives the alternative routes &mdash; RCD plus zone, or a 522.6.204 covering
            (earthed metallic, conduit, trunking, mechanical protection). A cable found outside
            any of these is itself a defect to record.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026 — Reg 522.6.202 / Table 52.1, verbatim."
      />

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Reg 514.1.2"
        clause={
          <>
            "So far as is reasonably practicable, wiring shall be so arranged or marked that it
            can be identified for inspection, testing, repair or alteration of the installation."
          </>
        }
        meaning={
          <>
            When tracing a fault back through a building you depend on the original
            installer&apos;s identification &mdash; cable colours, sleeving, junction-box labels,
            schedule of circuits. The Regulation puts that identification duty on whoever
            installed it. If the wiring you&apos;re investigating isn&apos;t identifiable,
            that&apos;s a 514.1.2 finding to log alongside the fault itself.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026 — Reg 514.1.2, verbatim."
      />

      <InlineCheck {...checks[2]} />

      <SectionRule />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Replacing the accessory without investigating upstream"
        whatHappens={
          <>
            Apprentice finds a melted socket. Replaces socket. Retests, all fine, leaves. Three
            months later same socket melts again. Real fault: the upstream cable has an HRJ inside
            the wall (where it joins a previous extension) that’s progressively damaging the
            downstream socket terminal. The accessory was the symptom; the cable joint was the
            cause. Replacing accessories without finding the upstream fault creates a repeating
            call-out cycle.
          </>
        }
        doInstead={
          <>
            For any termination-failure fault, ask ‘why?' before replacing. Inspect the upstream
            cable end for signs of heat damage. If the conductor is discoloured, the heat is
            coming from upstream. Trace back along the circuit (sequential continuity / IR /
            thermal) until you find the source of the heat.
          </>
        }
      />

      <CommonMistake
        title="Assuming all CU brands fail in the same way"
        whatHappens={
          <>
            Apprentice arrives at a 25-year-old Wylex Standard CU with a tripped MCB. They focus
            on the MCB without checking the busbar — the Wylex Standard plastic enclosure has
            stress fractures around the busbar, exposing one of the busbar terminations. The MCB
            was tripping because of an HRJ at the busbar, not because of an MCB fault. They
            replace the MCB; problem returns in two days; they replace again; problem persists;
            eventually they realise the issue is the enclosure, not the MCB. The brand-specific
            failure mode would have pointed them to the busbar first.
          </>
        }
        doInstead={
          <>
            Build brand knowledge through experience and reference materials (manufacturer
            technical bulletins, ElectriciansForums, IET communities). Each common UK brand has
            2–3 typical failure modes; knowing them gives you a 'where to look first' map.
          </>
        }
      />

      <Scenario
        title="Diagnosing a recurring fault on a SWA-fed garage"
        situation={
          <>
            Customer reports the garage RCD trips two or three times per month. The garage is fed
            by a 25 m run of 16 mm² SWA from the main house CU to a sub-DB in the garage.
            Investigation has been done twice before by other firms; both replaced the RCD;
            problem returned within weeks each time.
          </>
        }
        whatToDo={
          <>
            Knowing SWA fault locations cluster at glands: (1) Visual inspection of both glands
            (house end and garage end). At the garage end, find the gland’s earth-tag is loose —
            corrosion between the brass gland body and the steel adapter back-box has reduced the
            armour-earth path. (2) Test continuity from the SWA armour to the garage CU’s CPC bar
            — reads 8 Ω instead of expected near zero. (3) Diagnose: bad earth-tag at gland; the
            armour is providing intermittent CPC return; on certain fault conditions the path
            opens entirely and the RCD trips on residual current that has no return path. (4)
            Rectification: clean and re-make the earth-tag, re-torque the gland, retest continuity
            (now 0.05 Ω). (5) Verify with EFLI test at the garage sub-DB — Zs now within Table
            41.3 limits. Fault corrected; RCD will not trip on the same fault mode again.
          </>
        }
        whyItMatters={
          <>
            Two previous firms replaced the wrong component because they didn’t recognise the SWA
            gland as the most likely fault location. The brand and category knowledge (‘SWA
            glands fail at the earth-tag') would have led to the right diagnosis on visit one.
            Building this kind of pattern recognition is what separates the apprentice's
            diagnostic speed from a beginner’s hit-and-miss approach.
          </>
        }
      />

      <SectionRule />

      <ContentEyebrow>Consumer unit failure modes — by brand</ContentEyebrow>

      <ConceptBlock
        title="Hager / Schneider / Wylex / MK — what fails on each"
        plainEnglish="Different CU brands have different characteristic failure modes. Knowing the patterns lets you check the most likely location first instead of running through every possibility."
        onSite="UK domestic CU market: Hager (largest market share), Schneider Electric (Acti9 / Easy9), Wylex (Amendment 3 onwards has metal enclosures), MK (Sentry, Echo, K series), Crabtree, BG, Lewden. Each has distinct switchgear, terminal designs, and known failure modes. Use the brand label on the front of the CU to focus your diagnostic effort."
      >
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Hager VML / VMLS / Design 50</strong> — common failures: RCBO won't reset
            (internal trip latch worn), busbar tab failure where a 2-pole RCBO has been forced
            into a wrong-pitch busbar, neutral bar grub-screw loose under thermal cycling.
          </li>
          <li>
            <strong>Schneider Acti9</strong> — failures: incomer cable terminal browning under
            continuous full load (replace incomer with copper bar), iC60 RCBOs with tripped
            indicator stuck (mechanical), MGN bar (neutral) loose at end terminations.
          </li>
          <li>
            <strong>Wylex NM range</strong> — older plastic enclosures, post-Amendment 3 metal.
            Failures: incomer screw vibrating loose (1.5 Nm typical, often left at 0.8 Nm),
            B-curve MCBs nuisance-tripping on large inrush, shared neutrals across RCBOs causing
            misdiagnosis.
          </li>
          <li>
            <strong>MK Sentry / Echo</strong> — failures: 2-pole RCBO neutral terminal failure
            (the coupling between the L pole and the N pole loosens), older Sentry models pre-2010
            had stuck mechanical interlocks.
          </li>
          <li>
            <strong>BG Fortress / Compact</strong> — failures: incomer connection burning under
            sustained heavy load, RCBO trip lever cracked from rough operation, neutral bar
            terminal stripped from over-torque.
          </li>
          <li>
            <strong>Surge protective devices</strong> — Hager SPN302D, Schneider iPRD40r, Wylex
            SPDs all use replaceable cartridges. Status indicator (red flag = operated, replace).
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Wiring system failure points</ContentEyebrow>

      <ConceptBlock
        title="Where cables and containment fail — predictable locations"
        plainEnglish="Wiring system failures cluster at predictable points: terminations (the most common location for any fault), penetrations (cables passing through walls / floors / ceilings), bends and pull points (mechanical stress), supports (clip / cleat / stud points), expansion joints, and where rodents and pests can access."
        onSite="Standard UK wiring systems and their failure modes: Twin-and-earth (T&E) PVC — terminations and accessory back-boxes; SWA — glands and bends, especially at SWA-to-CU entries; FP200 fire-rated — terminations into fire-rated accessories; LSF (low smoke and fume) — same as T&E plus more brittle insulation in old age; PVC singles in conduit — pull points and conduit bend pressure; flat MICC (mineral insulated copper-clad) — moisture ingress at terminations."
      >
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>T&E in joist voids</strong> — staple/clip damage (driven through cable), nail
            damage from later trades, rodent gnawing on insulation.
          </li>
          <li>
            <strong>SWA at glands</strong> — earth-tag failure (broken contact between armour and
            gland), gland not torqued (water ingress around the cable bedding), SWA cut and
            re-terminated badly.
          </li>
          <li>
            <strong>Cable in conduit</strong> — pulling damage at install (insulation scuffed
            against bushed entries), excessive bend radius cracking conductor, conduit corroded at
            bends causing earth path issues.
          </li>
          <li>
            <strong>Cable in trunking</strong> — segregation issues (Cat 5 alongside mains),
            trunking lid removed and not refitted, capacity oversubscribed leading to overheating.
          </li>
          <li>
            <strong>Outdoor wiring</strong> — UV degradation of PVC over 10+ years; cable jacket
            cracks; sun-side of cable runs more vulnerable.
          </li>
          <li>
            <strong>Cellar / under-stair runs</strong> — damp ingress, vermin access, fall damage
            from tools or stored items.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Accessory failure modes — sockets, switches, light fittings</ContentEyebrow>

      <ConceptBlock
        title="MK / Crabtree / BG / Click / Hager Sollysta — accessory failures"
        plainEnglish="Wiring accessories fail in predictable ways depending on brand and design. Knowing the typical failure mode for each brand speeds diagnosis."
        onSite="UK accessory market: MK Logic Plus (premium), Crabtree (Capital, Platinum), BG Nexus, Click Mode, Hager Sollysta. Each has typical failure modes that the apprentice should recognise. Common across all brands: terminal screw loose under thermal cycling; multi-strand conductor with strands escaping the terminal; back-box overcrowded preventing cover seating; broken cover from impact damage."
      >
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>MK Logic Plus</strong> — premium quality; failures rare but: terminal screw
            vibration on circuits with heavy contactor cycling; switch mechanism wear after
            50,000+ operations.
          </li>
          <li>
            <strong>Crabtree Capital / Platinum</strong> — sometimes seen with terminal block
            discolouration on appliance circuits; switch rocker mechanism wear on lighting
            circuits with heavy cycling.
          </li>
          <li>
            <strong>BG Nexus</strong> — value-priced; common failures include socket shutters
            jamming (resists insertion), terminal screw stripping under over-torque, USB-A/USB-C
            charger sockets failing prematurely.
          </li>
          <li>
            <strong>Click Mode</strong> — modular dimmer plates have known compatibility issues
            with cheap LED drivers; specify Aurora Enlite or LightwaveRF compatible drivers.
          </li>
          <li>
            <strong>Hager Sollysta</strong> — terminal screws with anti-rotation feature; failures
            rare; tend to fail at the cable strain reliever rather than the terminal.
          </li>
          <li>
            <strong>Lampholders</strong> — pendant fittings: brass fittings corrode in damp
            environments; ceramic E27 holders crack from over-torque; GU10 spring contacts lose
            tension after repeated lamp swaps.
          </li>
          <li>
            <strong>Downlights (Aurora, Collingwood, JCC)</strong> — driver failure (SMPS aging in
            hot ceiling voids), connector failure between driver and lamp, IP rating compromised
            by overspray of paint or plaster.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Switchgear failure modes</ContentEyebrow>

      <ConceptBlock
        title="MCB / RCD / RCBO / MCCB — predictable failure modes"
        plainEnglish="Protective switchgear ages mechanically and electrically. Failures cluster at end-of-life or after multiple high-current trips. The apprentice recognises the symptoms and knows when to recommend replacement."
        onSite="Switchgear failure modes by category: MCB — won't reset (internal trip mechanism damage from high fault current); RCD — won't trip on test (contamination, internal corrosion, ageing); RCBO — combined failure of either function; MCCB — terminal pitting from arcing under repeated overload, mechanism wear after thousands of operations."
      >
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>MCB won't reset</strong> — internal trip latch damaged after high fault.
            Replace, don't try to reset by force. Common on B6/B16 MCBs that have cleared a short.
          </li>
          <li>
            <strong>MCB nuisance trips</strong> — wrong type curve (B-curve on a circuit with high
            inrush, e.g. large LED drivers, motors). Upgrade to C or D curve or upsize the MCB.
          </li>
          <li>
            <strong>RCD won't trip on test button</strong> — internal mechanism corroded (humid
            environment), contacts welded after high-current event, or the test button itself is
            mechanically broken. Replace.
          </li>
          <li>
            <strong>RCD over-sensitive</strong> — Megger MFT1741+ ramp test shows trip below 15 mA
            on a 30 mA device. Common after years of service; replace.
          </li>
          <li>
            <strong>RCBO won't reset after trip</strong> — combined latch / electronic detection
            fault. Replace; don't attempt repair.
          </li>
          <li>
            <strong>MCCB (Schneider NSX, ABB Tmax, Eaton xEffect)</strong> — terminal pitting
            visible under cover; mechanism wear after 5000+ operations; thermal-magnetic settings
            drift over decades.
          </li>
          <li>
            <strong>AFDD nuisance trips</strong> — Type AFDD detects arc-fault signatures;
            nuisance trips from VSDs, dimmers, switching power supplies. A4:2026 expanded AFDD
            requirements; matching device type to load is critical.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <FAQ items={faqs} />

      <SectionRule />

      <KeyTakeaways
        points={[
          'Most faults are at terminations — CU busbar, socket back-terminals, junction boxes. BS 7671 526.1 is the regulation.',
          'Each CU brand has known failure modes — Hager busbar drift, Wylex enclosure stress, Schneider terminal block. Brand knowledge speeds diagnosis.',
          'Ring final faults cluster at socket loop-in terminals, ring break points, and spur joints. Sequential testing localises to a branch; visual / thermal finds the point.',
          'SWA glands fail at the earth-tag connection (most common) and the compound seal (water ingress). Visual + continuity testing diagnoses.',
          'EV chargers have specific fault locations — CP signal, DC RCM, supply tail termination, earth electrode (TT), internal contactor.',
          'Lighting faults cluster at lampholders, drivers and internal wiring. Brand quality directly affects failure rate (cheap GU10 fails at 2 years, mid-tier at 10+).',
          'Switchgear ages — mechanical wear, electrical wear, RCD coil saturation. MFT trip-time test catches slow-tripping RCDs before failure.',
          'Outdoor installations face environmental stress — water at gaskets, UV on PVC, frost cracking, vermin. Each location category has predictable failure modes.',
        ]}
      />

      <Quiz title="Likely fault locations — knowledge check" questions={quizQuestions} />

      <SectionRule />


      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        Faults that live INSIDE customer equipment — appliance motors, immersion heaters, LED
        drivers, EV chargers, PV inverters — and the L–N–E signature each leaves on the meter. The
        recognition discipline that separates a wiring fault from an equipment fault, and the
        boundary between an electrician's fix and a manufacturer's warranty.
      </p>

      <TLDR
        points={[
          "Equipment-side faults live inside the customer's appliance, not in the fixed installation. The disconnect-and-retest move at the SFCU / plug / terminal block separates them — clean wiring tests + persistent fault = equipment problem.",
          "The boundary matters commercially — an equipment fault is the manufacturer's warranty or a service engineer's job, not your repair. Diagnosing past the boundary without authorisation is uninsured work.",
          'The A4:2026 Reg 643.3 redraft formalises a two-stage IR test — 500 V on the isolated wiring AND 250 V with electronics reconnected — to verify both wiring health and as-installed leakage without damaging electronics.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Distinguish wiring-side faults (cables, accessories, terminations) from equipment-side faults (motors, elements, drivers, internal control boards) using the disconnect-and-retest move.',
          'Diagnose immersion-element earth fault using IR test L+N to E at 500 V with the element isolated from the wiring; recognise the < 1 MΩ signature and the brass-flange replacement procedure.',
          "Recognise LED-driver / dimmer compatibility flicker faults and apply the manufacturer's compatibility chart as the diagnostic reference rather than condemning lamps.",
          'Diagnose single-phase motor faults — capacitor failure (most common), bearing seize, centrifugal-switch weld, terminal-block fault — in priority order.',
          'Apply the BS 7671 Reg 643.3 (A4:2026 redraft) two-stage IR test procedure (500 V isolated, 250 V with electronics connected) to fault verification work.',
          'Identify the boundary between electrician diagnosis and PV inverter / EV charger / appliance manufacturer warranty work; document the AC-side and DC-side boundary test evidence for escalation.',
          'Recognise cumulative leakage as the cause of intermittent RCD trips on shared upstream protection and apply the leakage-clamp diagnostic to confirm.',
          'Recognise EMC compatibility faults between modern electronics (induction hobs, EV chargers, PV inverters) and electronic loads (LED drivers) where individual-product compliance fails to add up to system compatibility.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>The wiring vs equipment boundary</ContentEyebrow>

      <ConceptBlock
        title="The disconnect-and-retest move — the fault-localisation discipline"
        plainEnglish="Wiring-side faults live in cables, terminations, accessories and switchgear — the fixed parts of the installation that the customer doesn't unplug. Equipment-side faults live in the appliance — motors, elements, drivers, control boards, internal wiring. The two have different commercial owners (you fix wiring; the manufacturer fixes equipment) and different diagnostic boundaries."
        onSite="The separator move is to disconnect the equipment at its plug, switched fused connection unit (SFCU), or terminal block, then re-test the fixed wiring. If the wiring tests clean (IR > 1 MΩ, continuity intact, Zs within table) AND the fault re-appears when you reconnect the equipment, the fault is in the equipment. That's the diagnostic certainty you need before telling the customer 'this is your appliance, not my wiring'."
      >
        <p>The boundary by category:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Wiring side (yours)</strong> &mdash; tails, sub-mains, final circuits,
            accessories (sockets, switches, SFCUs, junction boxes), switchgear (DBs, RCBOs, MCBs,
            isolators), terminations.
          </li>
          <li>
            <strong>Equipment side (manufacturer / service engineer)</strong> &mdash; appliance
            internals (motor, element, driver, PCB, internal cable), EV charger internals (after
            the AC isolator), PV inverter internals (after the AC and DC isolators), light fitting
            drivers (after the ceiling rose / fitting backplate), built-in cooker / hob internals
            (after the dedicated cooker switch).
          </li>
          <li>
            <strong>Boundary points (the test point)</strong> &mdash; SFCU terminals, 13 A plug,
            ceiling-rose terminals, cooker-switch outlet terminals, isolator outlet terminals.
          </li>
          <li>
            <strong>Commercial implication</strong> &mdash; equipment-side fault is manufacturer
            warranty (Consumer Rights Act 2015 covers appliances for up to 6 years from purchase
            if the fault is inherent), service-engineer chargeable work, OR replacement. NOT your
            fix.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671 Reg 643.3 (A4:2026 redraft) — IR test with equipment connected"
        clause={
          <>
            "Where equipment is connected and the equipment is likely to influence the insulation
            resistance verification test or be damaged by other test voltages, a 250 V DC
            insulation resistance test following connection of the equipment shall be used to
            verify insulation resistance."
          </>
        }
        meaning={
          <>
            The A4:2026 redraft formalises a two-stage IR test procedure for fault verification
            work where electronics are present. STAGE 1: 500 V test on the isolated wiring
            (electronics disconnected) confirms the wiring itself is healthy &mdash; the historic
            Table 64 minimum &gt; 1 M&Omega; applies. STAGE 2: 250 V test on the same circuit with
            the electronics reconnected confirms the as-installed leakage path through the
            electronics is healthy without damaging them. Both tests appear on the certificate /
            report. Skipping STAGE 2 is how a &lsquo;fixed&rsquo; circuit comes back to trip again
            the next day &mdash; the wiring is clean but the driver is leaking.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026, Reg 643.3."
      />

      <InlineCheck
        id={checks2[0].id}
        question={checks2[0].question}
        options={checks2[0].options}
        correctIndex={checks2[0].correctIndex}
        explanation={checks2[0].explanation}
      />

      <SectionRule />

      <ContentEyebrow>
        Resistive loads — immersion heaters, towel rails, storage heaters
      </ContentEyebrow>

      <ConceptBlock
        title="Element-to-earth is the dominant failure mode on water-immersed elements"
        plainEnglish="Immersion heaters, towel rails and storage-heater elements are bare resistance wire inside a metal sheath. The sheath develops pinholes from corrosion, scale or thermal cycling; the conductor goes electrically continuous to the metal sheath and through it to the customer's bonded copper pipework. Result: trips the RCD, IR test reads < 1 MΩ at 500 V."
        onSite="A 3 kW Backer / Heatrae Sadia immersion element on a typical UK cylinder is a £20 part with a 30-minute swap. The fault is so common the apprentice carries elements as standard van stock. Diagnostic: isolate, prove dead, disconnect at SFCU, IR-test the element terminals to its body / to earth at 500 V; if < 1 MΩ replace; recommission and confirm IR > 100 MΩ on the new element."
      >
        <p>The standard element-replacement procedure:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            Isolate at the cylinder&apos;s SFCU, lock-off, prove dead at the immersion head with a
            Martindale VI-13800 or Kewtech KT1780.
          </li>
          <li>
            Disconnect the supply wires at the immersion head; remove the head cover. IR-test L+N
            to the brass flange / body at 500&nbsp;V on the Megger MFT1741+. &lt; 1 M&Omega;
            confirms element fault.
          </li>
          <li>
            Drain the cylinder below the immersion height (top immersion only needs ~30&nbsp;cm
            drained; bottom immersion needs the whole tank). Slacken and unscrew the brass nut
            with the immersion spanner (a sized box spanner, NOT an adjustable &mdash; the nut
            WILL round off otherwise).
          </li>
          <li>
            Withdraw the old element, fit a new washer, insert and torque the new element to
            manufacturer spec, refill the cylinder, bleed any air through the hot tap, re-test IR
            (should read &gt; 100 M&Omega; on a healthy new element).
          </li>
          <li>
            Recommission &mdash; energise, time the heat-up to confirm rated wattage is being
            drawn, log the post-work test on the job sheet.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Motors &mdash; capacitor first, bearings second</ContentEyebrow>

      <ConceptBlock
        title="The single-phase induction motor capacitor is the most common motor fault"
        plainEnglish="Single-phase induction motors (workshop extractors, kitchen extractors, CH circulator pumps, cooling fans, drive units on small plant) need a run capacitor to develop starting torque. When the cap fails open or shorted, the motor draws stalled-rotor current — typically 5–8 times full-load amperes — until the MCB trips."
        onSite="A typical 250 W extractor cap is 3–6 µF; a 1 kW circulator might be 10–25 µF. Cap testers on most modern MFTs (Megger MFT1741+, Fluke 1664FC, Kewtech KT64+) read capacitance directly. Out of spec ±10% = replace. £5–15 part, 10-minute swap, fault gone. The apprentice carries spare caps in common values for known site equipment."
      >
        <p>The motor-fault hypothesis tree, in priority order:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Run capacitor</strong> &mdash; failed open or shorted; symptom is &lsquo;trips
            on start, runs OK if kicked over by hand&rsquo;. Test with cap range on the meter;
            replace if outside &plusmn;10% of rated value.
          </li>
          <li>
            <strong>Bearings</strong> &mdash; seized or stiff from age / lack of lubrication /
            contamination; manually rotate the rotor; if it doesn&apos;t spin freely, bearings or
            motor replacement.
          </li>
          <li>
            <strong>Centrifugal-switch contacts welded (older motors)</strong> &mdash; keeps the
            start winding in circuit constantly, drawing high current. Audible chatter from the
            switch; replace switch or motor.
          </li>
          <li>
            <strong>Winding insulation breakdown</strong> &mdash; IR test to motor body &lt; 1
            M&Omega;; replace motor.
          </li>
          <li>
            <strong>Terminal-block fault</strong> &mdash; loose, corroded or wrong connection at
            the motor terminal box; tighten / repair / re-terminate.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671 Reg 134.1.1 — good workmanship"
        clause={
          <>
            "Good workmanship by one or more skilled or instructed persons and proper materials
            shall be used in the erection of the electrical installation."
          </>
        }
        meaning={
          <>
            Reg 134.1.1 is the &lsquo;competence + materials&rsquo; anchor. When you replace an
            immersion element, a motor capacitor, or any other equipment-side component, the
            replacement must be a proper material (manufacturer-equivalent rated part) installed
            by a skilled person to the same standard. Fitting an under-spec or wrong-rated cap, an
            element with the wrong wattage, or a driver from outside the dimmer&apos;s
            compatibility list is a Reg 134.1.1 failing &mdash; even though the work is
            &lsquo;equipment side&rsquo;. The apprentice respects the spec.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026, Reg 134.1.1."
      />

      <InlineCheck
        id={checks2[1].id}
        question={checks2[1].question}
        options={checks2[1].options}
        correctIndex={checks2[1].correctIndex}
        explanation={checks2[1].explanation}
      />

      <SectionRule />

      <ContentEyebrow>Electronic loads &mdash; LED drivers, dimmers, smart kit</ContentEyebrow>

      <ConceptBlock
        title="LED + dimmer compatibility is now the dominant lighting fault"
        plainEnglish="LED downlights use constant-current drivers that need to match the dimmer's output type (leading-edge / trailing-edge / 0–10 V / DALI). Even 'LED-rated' dimmers don't work with every driver — manufacturers publish compatibility lists and pairing outside the list is the dominant cause of flicker, buzz, won't-fully-dim, won't-fully-off."
        onSite="The apprentice's diagnostic move on flicker complaints: bypass the dimmer with a normal switch (does the flicker stop? — yes confirms dimmer issue), check the dimmer manufacturer's compatibility chart against the actual driver brand fitted, advise the customer of the right combination. Common UK dimmer brands and their charts: Hager (Wesco range), Schneider Lisse, Crabtree, Varilight V-Pro, MK Dimensions."
      >
        <p>The four common electronic-load fault categories:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Dimmer / driver mismatch</strong> &mdash; check compatibility chart; replace
            dimmer for matched type or replace drivers for matched make.
          </li>
          <li>
            <strong>Minimum-load fault</strong> &mdash; total wattage below dimmer&apos;s minimum
            (typically 10 W); add dummy load module (Varilight V-Pro Adaptor, Hager dummy load) or
            use a compatible minimum-load-tolerant dimmer.
          </li>
          <li>
            <strong>Driver age / degradation</strong> &mdash; constant-current circuit degrading
            after 4&ndash;7 years in hot enclosure; replace driver.
          </li>
          <li>
            <strong>EMC interaction</strong> &mdash; another appliance on the supply (induction
            hob, EV charger, PV inverter, VSD) injects high-frequency content that the LED driver
            picks up; mains filter or higher-spec driver.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>EV chargers &mdash; the boundary at the AC isolator</ContentEyebrow>

      <ConceptBlock
        title="EV charging faults split three ways — wiring, charger, vehicle"
        plainEnglish="An EV that won't charge is one of three things: (a) a wiring / supply fault upstream of the charger (your job), (b) a charger / EVSE fault inside the unit (manufacturer warranty), or (c) a vehicle-side fault that's failing the IEC 61851 / SAE J1772 handshake (the customer's car). The apprentice rules them out in order."
        onSite="The routine: read the charger's diagnostic LEDs / app fault code; verify supply at the AC isolator (230 V L–N, < 0.5 V N–E, healthy Zs); check the charger's inbuilt RCD-Type-A + 6 mA DC-leakage detection per BS 7671 722.531.3 (A4:2026 reinforces); IR-test the dedicated EV circuit at 500 V; verify with a second known-good vehicle if available. Common UK EV charger brands: Wallbox Pulsar Plus, Ohme Home Pro, EO Mini Pro, Andersen, MyEnergi Zappi."
      >
        <p>The three EV-charging fault categories:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Wiring / supply (yours)</strong> &mdash; supply voltage, neutral integrity, Zs
            at the charger&apos;s terminals, dedicated RCBO healthy, IR clean. Documented evidence
            that the AC supply boundary is good.
          </li>
          <li>
            <strong>Charger / EVSE (manufacturer warranty)</strong> &mdash; firmware fault,
            contactor weld, internal RCD failure, Wi-Fi / app connectivity. Most UK EV chargers
            carry a 3&ndash;5 year warranty; the customer engages the manufacturer.
          </li>
          <li>
            <strong>Vehicle handshake (customer&apos;s car)</strong> &mdash; the J1772 / IEC 61851
            12 V CP-pin signal is the handshake protocol; a flaky cable, dirty plug, or
            vehicle-side software issue can fail the handshake without the wiring or charger being
            faulty. Verify with a second car if possible; otherwise advise the customer to engage
            the dealer.
          </li>
          <li>
            <strong>Cumulative leakage</strong> &mdash; the increasingly common fault mode on
            shared-RCBO installations; clamp the upstream RCBO with a leakage clamp meter (Fluke
            360, Megger DCM340) to measure steady-state residual current; if &gt; 15 mA, fit
            dedicated RCD per Reg 722.531.3.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 722.413.1.2 (Electric vehicle charging — supply via separated source)"
        clause={
          <>
            "722.413.1.2 This protective measure shall be limited to the supply of one electric
            vehicle supplied from one unearthed source. The circuit shall be supplied through a
            fixed isolating transformer complying with BS EN 61558-2-4."
          </>
        }
        meaning={
          <>
            Reg 722.413.1.2 sets out the &lsquo;separated source&rsquo; protective measure for EV
            charging &mdash; one vehicle, one unearthed source, fed through a fixed isolating
            transformer to BS EN 61558-2-4. Where this protective measure is used in place of
            standard automatic disconnection, the supply is electrically separated from the
            upstream system. The diagnostic implication for fault work: confirm which protective
            measure the EV connecting point uses before assuming a standard 30 mA RCD diagnostic;
            on a separated-source install the fault behaviour and the test method are different.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026 Part 7, Section 722, Regulation 722.413.1.2."
      />

      <InlineCheck
        id={checks2[2].id}
        question={checks2[2].question}
        options={checks2[2].options}
        correctIndex={checks2[2].correctIndex}
        explanation={checks2[2].explanation}
      />

      <VideoCard {...videos.faultFinding} topic="Fault finding and how to describe a fault" />

      <SectionRule />

      <ContentEyebrow>PV inverters &mdash; the AC and DC boundaries</ContentEyebrow>

      <ConceptBlock
        title="PV fault diagnosis is layered AC, DC, inverter-internal"
        plainEnglish="A PV inverter showing a fault code is one of three things: (a) AC-side fault (supply voltage out of spec, lost neutral, RCD trip on the AC isolator) — your job, (b) DC-side fault (string voltage out of spec, isolation fault on a string, broken module) — your job with PV competence, (c) inverter-internal fault (firmware, MPPT, internal IGBT) — the manufacturer's warranty / service engineer's job."
        onSite="The apprentice without dedicated PV training works the AC boundary only — measure supply at the AC isolator, check the AC RCBO, confirm the inverter sees a healthy AC supply within spec. The DC side and inverter internals are referred to a qualified PV installer. Common UK PV inverter brands: SolarEdge HD-Wave, Solis 3.0K-S5, Fronius Primo, GoodWe DNS, Growatt MIN."
      >
        <p>The boundary checks2:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>AC supply (your boundary)</strong> &mdash; supply voltage at the
            inverter&apos;s AC terminals (within spec; typically 207&ndash;253 V for 230 V
            grid-tie; more strict for G98/G99-compliant kit), Zs at the AC RCBO, RCD test, IR on
            the dedicated AC circuit.
          </li>
          <li>
            <strong>DC string (your boundary with PV competence)</strong> &mdash; open-circuit
            voltage on each string at the DC isolator (matches the design Voc &times; module
            count), IR test L+&minus; to earth on the string at 500 V (or per inverter
            manufacturer spec).
          </li>
          <li>
            <strong>Inverter internal (manufacturer)</strong> &mdash; fault codes inside the unit,
            firmware updates, internal MPPT or IGBT failures. UK PV inverter warranties typically
            5&ndash;10 years under MCS; customer engages installer or manufacturer.
          </li>
          <li>
            <strong>G99 / G98 grid-tie compliance</strong> &mdash; the inverter must remain
            compliant with DNO grid-tie standards; if it&apos;s tripping on grid faults
            (over/under voltage, over/under frequency), that&apos;s the inverter doing its job,
            not a fault per se &mdash; the supply itself may be the problem (DNO call).
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Cumulative leakage and the A4:2026 RCD test method</ContentEyebrow>

      <ConceptBlock
        title="One AC test at 1×IΔn and a leakage clamp tells you everything"
        plainEnglish="A4:2026 redrafted Reg 643.7 to specify a single alternating current test at 1×IΔn for every RCD verification, regardless of type. Older multi-current sequences (half-rated, rated, five-times) are gone; Table 3A in Appendix 3 has been deleted. For the fault diagnostician investigating intermittent EV-charger or PV-inverter trips, this means the verification is faster — but the diagnosis still needs a leakage clamp on the upstream protection to find the cumulative leakage source."
        onSite="On an intermittent trip, the diagnostic move is unchanged: clamp L+N together at the RCBO with a leakage clamp meter (Fluke 360, Megger DCM340) and read steady-state residual current. Healthy installation 1-8 mA; close to nuisance trip above 15 mA; imminent trip above 25 mA. Then isolate each protected circuit one at a time and read again — each circuit's contribution shows as a step-down. Fix is dedicated RCBO per high-leakage circuit per Reg 722.531.3.101 for EV chargers and the equivalent dedicated-RCD discipline for inverters."
      >
        <p>The cumulative-leakage diagnostic routine:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Step 1 — clamp the upstream RCBO at L+N</strong>. Note the steady-state
            residual current. Above 15 mA is the nuisance-trip warning zone for a 30 mA RCBO.
          </li>
          <li>
            <strong>Step 2 — verify the RCBO with the A4:2026 single AC test</strong>
            at 1×IΔn. Record the operating time. A drifted RCBO (operating time significantly
            above the BS EN 61009 limit) is itself a fault and should be replaced regardless of
            the leakage source.
          </li>
          <li>
            <strong>Step 3 — isolate each protected circuit one at a time</strong>
            and re-clamp. Each circuit's contribution to the residual current shows as a
            step-down. The biggest contributor is the suspect.
          </li>
          <li>
            <strong>Step 4 — IR test the suspect circuit at 250 V (Reg 643.3)</strong>
            with electronics connected. A degraded driver or a leaking filter cap shows as low IR;
            a clean reading suggests the leakage is filter-cap normal rather than a fault.
          </li>
          <li>
            <strong>Step 5 — design fix</strong>. For EV chargers, dedicated 30 mA RCD per Reg
            722.531.3.101 plus DC fault current protection. For PV inverters, dedicated RCBO with
            Type the inverter manufacturer specifies. For accumulating filter-cap loads,
            RCBO-per-circuit on the consumer unit upgrade.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="The Reg 134.1.1 'replacement parts must match' rule on equipment-side fixes"
        plainEnglish="When you swap a motor capacitor, an immersion element, an LED driver or any equipment-side component, Reg 134.1.1 demands the replacement is a 'proper material' — manufacturer-equivalent rated part installed to the same standard. This is not optional even though the work is technically equipment-side rather than wiring-side. Fitting an under-spec or wrong-rated part is a Reg 134.1.1 failing that returns to bite you on warranty and on EICR."
        onSite="Practical discipline: read the part you are removing, match the rating, match the BS / EN reference, match the manufacturer specification. A 6 µF run capacitor cannot be replaced with a 4 µF off-the-shelf cap; an 8 W constant-current LED driver cannot be replaced with a 12 W constant-voltage driver; a 3 kW Backer immersion element cannot be replaced with a 2.75 kW alternative without checking the cylinder thermostat compatibility. The five minutes spent reading the spec saves the comeback work."
      >
        <p>The Reg 134.1.1 replacement-parts checklist:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Rating match</strong> — voltage, current, wattage, capacitance, all within
            ±10% of the original part unless the manufacturer's data sheet explicitly authorises a
            different value.
          </li>
          <li>
            <strong>Type match</strong> — leading-edge dimmer replaced by leading-edge, Type B
            RCBO replaced by Type B, constant-current driver replaced by constant-current.
            Cross-type substitutions create EMC and compatibility issues that present as the
            customer's original symptom unchanged.
          </li>
          <li>
            <strong>Standards match</strong> — the BS EN reference on the original part is what BS
            7671 references for the duty. A BS EN 60898 Type B MCB replaced by a non-listed import
            is a Reg 134.1.1 failing.
          </li>
          <li>
            <strong>Approved-list check</strong> — for LED dimmers and drivers, consult the dimmer
            manufacturer's compatibility chart before fitting. Pairing outside the chart is the
            dominant cause of flicker complaints.
          </li>
          <li>
            <strong>Document the replacement</strong> — record the old part details, the new part
            details and the matching evidence on the job sheet. The record protects the firm if
            the customer later disputes the workmanship.
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
            replaced unit is &pound;500&ndash;1000+ plus the visit. EAWR Reg 16 competence expects
            the apprentice to diagnose to certainty before condemning equipment.
          </>
        }
      />

      <CommonMistake
        title="Condemning all the LED downlights when one driver in the chain is failing"
        whatHappens={
          <>
            Customer reports flicker on the kitchen downlights. Apprentice tests one of the lamps
            with a multimeter, sees nothing obviously wrong, then condemns all 8 lamps and writes
            a quote for &pound;240 of replacement units. Turns out one driver in the middle of the
            chain was failing intermittently and pulling the others into instability through the
            shared neutral. Replace that one driver (&pound;15 part) and the rest of the chain is
            fine.
          </>
        }
        doInstead={
          <>
            Walk the LED-driver fault tree before condemning lamps. Bypass the dimmer (does the
            flicker change?). Check minimum load. Test each driver in turn by isolating one at a
            time and observing whether the flicker on the others changes. The faulty driver
            usually betrays itself by being the one that&apos;s warmest to touch or the one whose
            lamp dims slightly differently. Replace ONE driver as a diagnostic step before
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
            interference from the induction hob coupling into the hood&apos;s LED driver. Confirm
            by isolating the hob &mdash; if the hood flicker stops when the hob is off, EMC is the
            cause. Walk the customer through their three options: (1) escalate to the hood
            manufacturer (Bosch) with the documented test evidence and the symptom pattern &mdash;
            this may be a known compatibility issue with a firmware update or a replacement driver
            available, (2) fit a mains filter on the hood&apos;s circuit to attenuate the
            hob&apos;s harmonics, (3) accept the limitation. The fault is NOT a wiring fault and
            NOT a fix that&apos;s commercially viable for you to charge for as an electrician
            &mdash; it&apos;s a product-compatibility issue between two independently-compliant
            kit items. The apprentice&apos;s value here is the clear diagnosis and the
            documented evidence the customer needs to engage the manufacturer.
          </>
        }
        whyItMatters={
          <>
            EMC interaction faults are an increasing fraction of fault calls as more customer
            kit becomes electronic &mdash; induction hobs, EV chargers, PV inverters, VSDs,
            smart-home kit. Each is individually compliant with BS EN IEC 61000-3 EMC standards
            but the combinations weren&apos;t tested by the manufacturers. The apprentice
            recognises the signature (problem starts when a specific other appliance is in use,
            wiring tests are clean), documents it cleanly, and helps the customer escalate to the
            right party. Trying to &lsquo;fix&rsquo; an EMC compatibility issue with a wiring
            change is a waste of the customer&apos;s money and a waste of yours.
          </>
        }
      />

      <SectionRule />

      <FAQ items={faqs2} />

      <SectionRule />

      <KeyTakeaways
        points={[
          'Equipment-side faults live INSIDE customer kit (motors, elements, drivers, control boards). Wiring-side faults live in the fixed installation. The disconnect-and-retest move at the SFCU / plug separates them.',
          'Immersion-element earth fault is the dominant immersion-circuit fault — IR test the element terminals to its body at 500 V; < 1 MΩ confirms; replace, retest, recommission.',
          "Single-phase motor capacitor failure is the dominant motor fault — symptom is 'trips on start, runs OK if kicked over by hand'. Test cap, replace if outside ±10% of rated value.",
          "LED + dimmer compatibility flicker is the dominant lighting fault — bypass dimmer to confirm, check manufacturer's compatibility chart, replace dimmer or driver to a matched pair.",
          'BS 7671 Reg 643.3 (A4:2026 redraft) two-stage IR test — 500 V on isolated wiring, 250 V with electronics reconnected — is the test that catches a degraded driver leakage path the 500 V isolated test misses.',
          "EV charger faults split three ways — wiring (yours), charger (manufacturer), vehicle handshake (customer's car). Rule them out in order; don't replace the wallbox until you've checked the J1772 handshake.",
          'PV inverter faults split three ways — AC-side (yours), DC-side (yours with PV competence), inverter-internal (manufacturer). Document the boundary tests cleanly before escalating.',
          'Cumulative leakage on shared RCDs is the dominant cause of intermittent EV-charger trips — clamp the upstream RCBO with a leakage clamp meter; the A4:2026 fix is dedicated RCD per Reg 722.531.3.',
        ]}
      />

      <Quiz title="Equipment-side faults — knowledge check" questions={quizQuestions2} />
    </div>
  );
}
