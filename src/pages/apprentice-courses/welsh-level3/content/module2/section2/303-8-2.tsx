/**
 * Ported from the English course, combining:
 *   level3/module1/section4/Sub3.tsx
 *   level2/module1/section2/Sub1.tsx
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
} from '@/components/study-centre/learning';

const checks = [
  {
    id: 'l3-m1-s4-sub3-arc',
    question: "What's arc-flash?",
    options: [
      'An explosive release of energy when a fault current ionises the air between conductors, reaching temperatures around 19,000°C.',
      'A combined RCD and MCB in a single device, giving both overcurrent and earth-fault protection on a per-circuit basis.',
      "A rise of the consumer's earthing terminal toward line voltage when an open-circuit fault occurs on a PEN conductor.",
      'The respiratory and impact hazard from sand-and-cement chasing, controlled by FFP3 mask, eye protection and dust extraction.',
    ],
    correctIndex: 0,
    explanation:
      'Arc-flash is an explosive release of energy when fault current ionises air between conductors: temperatures reach 19,000°C+, with a pressure wave, thermal radiation and molten-metal projectiles. Survivable injuries are common but fatalities occur. It is predictable in commercial / industrial switchgear; PPE is rated by ATPV (cal/cm²) to EN 61482, and design controls such as remote racking are preferred.',
  },
  {
    id: 'l3-m1-s4-sub3-second',
    question: 'What’s a "secondary injury" in electrical incidents?',
    options: [
      'Damage to sensitive electronic equipment caused by the voltage transient that accompanies an arc fault, rather than damage to the people working nearby.',
      'A delayed cardiac effect that develops in the hours after a non-fatal shock, requiring the casualty to be kept under observation overnight.',
      'A burn to a second person who touches the casualty before the supply is isolated, completing the circuit through both bodies.',
      'Injury arising from the consequences of an electrical event rather than the electricity itself — such as a fall after a shock startle.',
    ],
    correctIndex: 3,
    explanation:
      'A secondary injury arises from the consequences of an electrical event rather than the electricity itself — a fall from a step-up after a shock startle, a tool dropped from height, a burn from hot equipment after a fire, or a collision while running from smoke. These are common and often more serious than the primary shock, so risk assessment should consider the full consequence chain, not just the electrical event.',
  },
  {
    id: 'l3-m1-s4-sub3-fire',
    question: "What's the most common cause of electrical fire on installed equipment?",
    options: [
      'Lightning surges entering the installation through the supply and igniting the consumer unit, which is why surge protection is now common.',
      'Insulation breaking down with age, allowing a line-to-neutral short that draws enough current to set the cable alight before the protective device clears.',
      'Loose connections — high resistance generates heat, oxidation accelerates, and eventually flashover occurs.',
      'Undersized protective devices failing to trip on overload, allowing cables to overheat steadily under normal everyday load.',
    ],
    correctIndex: 2,
    explanation:
      'Loose connections cause more electrical fires than any other single cause: high resistance generates heat, oxidation accelerates, and eventually flashover occurs. Other common causes are overloaded circuits, damaged cables, water ingress, manufacturing defects (counterfeit kit) and inadequate cooling. Periodic inspection (EICR) catches them; installation discipline (proper torque, periodic re-tightening at high-current terminations) prevents them.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'What’s the threshold above which AC voltage is considered "dangerous" under HSE guidance?',
    options: [
      '25V AC RMS — the limit set for reduced low voltage 110V site supplies (55V to earth), below which no shock controls are needed.',
      '50V AC RMS / 120V DC ripple-free — above this, full EAWR controls apply as routinely shock-hazardous.',
      '230V AC RMS — standard UK mains; only the nominal supply voltage and above is treated as a genuine shock hazard.',
      '120V AC RMS — half of mains; the point at which current through a typical body resistance becomes capable of stopping the heart.',
    ],
    correctAnswer: 1,
    explanation:
      '50V AC RMS / 120V DC ripple-free is the threshold for "danger" in EAWR / HSE practice. Below it is ELV (Extra-Low Voltage), generally not shock-hazardous in normal conditions; above it is LV (Low Voltage), routinely shock-hazardous with full EAWR controls. Mains 230V is well into LV territory.',
  },
  {
    id: 2,
    question: 'What’s "shock"?',
    options: [
      'A sudden surge of voltage on a circuit that damages connected equipment when a fault occurs upstream.',
      'The mechanical jolt felt through a tool when a motor stalls and the back-EMF collapses suddenly.',
      'The physiological response to electric current passing through the body, with effects that scale with the current.',
      'The brief flash and bang when conductors at different potentials are momentarily bridged before the device clears.',
    ],
    correctAnswer: 2,
    explanation:
      "Shock is the physiological response to electric current through the body, scaling with current: perception (1mA), pain (5-10mA), can't-let-go (10-20mA), respiratory paralysis (20-50mA), ventricular fibrillation (50-100mA+). Duration matters — long exposure at lower current can be lethal. Mains 230V routinely produces enough current to cause cardiac arrest.",
  },
  {
    id: 3,
    question: 'What’s an "electrical burn"?',
    options: [
      'A burn caused only by touching equipment that has overheated due to an overloaded circuit, never by the current itself.',
      'Reddening of the skin from prolonged exposure to the UV light given off by a fluorescent or arc lamp.',
      'A friction burn from a cable pulled rapidly through the hand while drawing it into a conduit.',
      'Tissue damage caused by current passing through the body or by an arc / flash heating the skin.',
    ],
    correctAnswer: 3,
    explanation:
      'An electrical burn is tissue damage caused by current passing through the body or by an arc / flash heating the skin. Internal burns can be severe with only small surface marking, unlike thermal burns (cooler at surface, hotter at depth). Always assume worse than it looks.',
  },
  {
    id: 4,
    question: "What's arc-flash temperature?",
    options: [
      '~19,000°C — far hotter than the surface of the sun. The thermal radiation alone causes severe burns at distance; the pressure wave injuries; molten metal projectiles. PPE rated by ATPV (cal/cm²).',
      '~1,500°C — about the temperature of an oxy-acetylene cutting flame, hot enough to ignite clothing but rarely to cause projectile injuries.',
      '~3,000°C — comparable to a welding arc, with the main hazard being the ultraviolet flash to the eyes rather than burns.',
      '~250°C — similar to a domestic oven, causing surface burns only on direct contact with the affected enclosure.',
    ],
    correctAnswer: 0,
    explanation:
      'Arc-flash is extreme. EN 61482 ATPV-rated PPE; design controls (remote racking, arc-resistant switchgear) preferred where reasonably practicable.',
  },
  {
    id: 5,
    question: 'What’s "step potential"?',
    options: [
      'The voltage drop measured across a single step of a staircase where a metal handrail has not been bonded.',
      'The voltage difference between the feet planted on the ground near an earth fault, across the ground gradient.',
      'The incremental rise in earthing-terminal voltage each time another circuit is added to a shared earth bar.',
      'The voltage between successive rungs of a metal ladder leaning against a faulty overhead line.',
    ],
    correctAnswer: 1,
    explanation:
      'Step potential is the voltage difference between feet planted on the ground near an earth fault: current flowing through the ground creates a voltage gradient, and a person standing across it experiences step potential. It is significant near HV faults and can cause shock through the legs — generally not a domestic / LV concern, but the L3 should know the term.',
  },
  {
    id: 6,
    question: 'What’s "touch potential"?',
    options: [
      'The minimum voltage a test instrument must apply to a terminal to confirm reliable contact before a reading.',
      'The static charge that builds up on a person walking across an insulating floor, discharged on touching earthed metalwork.',
      'The voltage between a hand touching an energised object and the feet on the ground during an earth fault.',
      'The voltage required at a switch contact to overcome surface oxidation and pass rated current without overheating.',
    ],
    correctAnswer: 2,
    explanation:
      'Touch potential is the voltage between the hand touching an energised object and the feet on the ground; it drives current through the body if the object is energised by a fault, and is the reason for equipotential bonding and protective conductor sizing. It is the headline LV hazard from earth faults, addressed by BS 7671 disconnection times and bonding.',
  },
  {
    id: 7,
    question: 'What’s "induced voltage"?',
    options: [
      'The small voltage produced by a thermocouple effect where two dissimilar metals are joined at a terminal.',
      'The rise in supply voltage that occurs when a large motor on the same circuit is switched off and its load is removed.',
      'The voltage that remains stored in a capacitor after the supply is isolated, discharging slowly through the body if touched.',
      'Voltage induced in a conductor by the electromagnetic field from a nearby live conductor running parallel to it.',
    ],
    correctAnswer: 3,
    explanation:
      'Induced voltage is induced in a conductor by the electromagnetic field of a nearby live conductor — particularly relevant for cables in trefoil arrangement, parallel cable runs, and in metallic conduit or armouring. It can give a shock or false-live readings on otherwise dead conductors, which is why some "dead" conductors give a tingle. Bond and isolate; understand the source.',
  },
  {
    id: 8,
    question: 'How does the L3 supervisor map a hazard to the relevant regulation?',
    options: [
      'Each hazard is mapped to its own regulatory home — shock, arc-flash, fire and secondary injury each cite different rules.',
      'Every electrical hazard maps to BS 7671 alone, since the Wiring Regulations are the single statutory document governing all electrical safety at work.',
      "Hazards are mapped only to the firm's own RAMS document, because site-specific procedures take legal precedence over the general regulations.",
      'Each hazard is mapped to RIDDOR, because the reporting thresholds determine which controls a supervisor must put in place before work starts.',
    ],
    correctAnswer: 0,
    explanation:
      'Each hazard has its own regulatory home: shock / direct contact → EAWR Reg 4 / 13 + BS 7671; arc-flash → EAWR Reg 4 + 14 + COSHH (combustion products) + EN 61482 PPE; fire → EAWR + RRFSO 2005 + Approved Doc B; secondary injury → MHSWR Reg 3 (consequence chain). Mapping hazard to regulation lets the L3 supervisor cite chapter and verse, strengthening the safety argument and demonstrating competence.',
  },
];

const faqs = [
  {
    question: 'Are LV (50-1,000V AC) and HV (&gt;1kV AC) hazards different?',
    answer:
      'Yes — LV mostly shock and burn (touch potential); HV adds step potential, arc flashover at distance, much higher consequence arc events. HV requires separate competence (SAP appointment).',
  },
  {
    question: "What's the difference between RCBO trip and arc-fault detection?",
    answer:
      "RCBO detects earth-leakage (residual current); AFDD (Arc Fault Detection Device, BS 7671 A4:2026 expansion) detects the signature of arc faults that don't trip RCBOs. Both required in some installations under A4:2026; complementary protection.",
  },
  {
    question: 'What’s "back-EMF" and why does it matter?',
    answer:
      'Back-EMF is voltage induced by collapsing magnetic field in inductive load (motor, transformer) when supply is removed. Can reach high voltages briefly; can give shock; reason for caution before touching disconnected motor terminals.',
  },
  {
    question: 'Why is the second prove on the voltage indicator critical for arc-flash safety?',
    answer:
      'A faulty indicator giving false dead can lead to operator approach and contact with live high-energy switchgear. Arc-flash incidents from approach to falsely-presumed-dead equipment are some of the most severe.',
  },
  {
    question: "What's the difference between AC and DC shock effects?",
    answer:
      'AC at mains frequency (50-60Hz) is particularly hazardous because it can lock muscles in contraction (50Hz is in the resonant range for cardiac muscle). DC tends to throw the casualty clear in shorter contact. Both lethal at higher currents; AC at LV is the everyday hazard.',
  },
  {
    question: 'How does L3 hazard awareness change post-BSA 2022?',
    answer:
      'Higher accountability + golden thread + 30-year retrospective Defective Premises liability mean records and design integrity matter much more. Hazards from inadequate design now travel forward in time more clearly.',
  },
];

/* ── Inline check questions (wired into stats/streaks) ──────────────── */

const checks2 = [
  {
    id: 'shock-current-vs-voltage-check',
    question: 'What does the actual damage in an electric shock?',
    options: [
      'The voltage measured across the contact points',
      'The current that ends up flowing through your body',
      'The resistance of your skin at the point of contact',
      'The frequency of the supply feeding the fault',
    ],
    correctIndex: 1,
    explanation:
      'Voltage just sets up the pressure. It’s the current — measured in milliamps — flowing through your tissue that stops your heart and your lungs. That’s why every BS 7671 protective device is rated in current, not volts.',
  },
  {
    id: 'let-go-threshold-check',
    question: "Roughly what current makes 'let-go' impossible for most people?",
    options: ['1 mA', '100 mA', '10 mA', '1 A'],
    correctIndex: 2,
    explanation:
      'Around 10-15 mA your forearm muscles clamp shut and you can’t release the conductor. That’s why 30 mA RCDs are sized to trip well below the next threshold up — respiratory paralysis and fibrillation.',
  },
  {
    id: 'shocked-mate-check',
    question: 'A mate is gripped to a live cable, can’t let go. What’s the FIRST move?',
    options: [
      'Grab their arm and pull them off the cable',
      'Isolate the supply at the breaker or main switch',
      'Throw a bucket of water over the contact point',
      'Call 999 and wait for the paramedics to arrive',
    ],
    correctIndex: 1,
    explanation:
      'Don’t touch them. The current’s still flowing — touching them makes you the second casualty. Get the supply off first. Then 999, then first aid. If you genuinely can’t isolate, use a non-conductive object (broom handle, dry timber) to break the contact.',
  },
];

/* ── End-of-page Quiz (wires into stats/streaks) ─────────────────────── */

const quizQuestions2 = [
  {
    id: 1,
    question: 'What actually causes the damage in an electric shock?',
    options: [
      'The voltage present at the point of contact',
      'The current flowing through body tissue',
      'The resistance of the skin where contact is made',
      'The static charge stored on the conductor',
    ],
    correctAnswer: 1,
    explanation:
      'Voltage is the pressure — current is what passes through you. Measured in milliamps. A few tens of milliamps is enough to fibrillate the heart. That’s why protective devices are rated in current.',
  },
  {
    id: 2,
    question: "Roughly what current is the 'let-go' threshold for most people?",
    options: ['100 mA', '1–2 mA', '10–15 mA', '1 A'],
    correctAnswer: 2,
    explanation:
      'Around 10-15 mA. Below that you can usually pull away. Above it, the muscles in your forearm contract so hard you can’t release the conductor — and the longer you’re held on, the worse it gets.',
  },
  {
    id: 3,
    question: 'Which current path through the body is the most dangerous?',
    options: [
      'Hand to hand across the chest',
      'Hand to foot down one side',
      'Foot to foot across the ground',
      'Finger to finger on one hand',
    ],
    correctAnswer: 0,
    explanation:
      "Hand-to-hand drives the current straight across the chest cavity and through the heart. Highest risk of ventricular fibrillation. It’s the reason you’ll hear electricians talk about 'one-handed working' near anything that might still be live.",
  },
  {
    id: 4,
    question: 'What is ventricular fibrillation?',
    options: [
      'The lungs filling with fluid after a shock',
      'A deep burn at the current entry and exit points',
      'The heart twitching chaotically instead of pumping properly',
      'A sustained contraction that locks the breathing muscles',
    ],
    correctAnswer: 2,
    explanation:
      'The heart muscle stops beating in rhythm and just quivers. Blood stops moving. Brain damage starts within 3-7 minutes. It’s why a small fault current can be fatal — it’s not the burn that gets you, it’s the heart.',
  },
  {
    id: 5,
    question: 'What’s the BS 7671 voltage band for Low Voltage AC?',
    options: [
      'Up to 50 V AC',
      'Above 50 V AC up to 1000 V AC',
      'Anything above 10 kV AC',
      'Above 1000 V AC up to 10 kV AC',
    ],
    correctAnswer: 1,
    explanation:
      'Extra-Low is up to 50 V AC. Low Voltage is 50 V to 1000 V AC — the band that includes 230 V single-phase and 400 V three-phase, where most apprentice work happens. Above 1000 V is High Voltage.',
  },
  {
    id: 6,
    question: 'What’s the difference between direct contact and indirect contact?',
    options: [
      'Direct = touching a metal part that’s gone live through a fault; indirect = touching a live conductor',
      'Direct = a shock through one hand; indirect = a shock across both hands',
      'Direct = touching a live conductor; indirect = touching a metal part that’s become live through a fault',
      'Direct = a shock at low voltage; indirect = a shock at high voltage',
    ],
    correctAnswer: 2,
    explanation:
      'Direct = touching something meant to be live (a bare conductor). Indirect = touching something not meant to be live but that’s gone live through a fault (a metal enclosure). Basic protection deals with the first, ADS with the second.',
  },
  {
    id: 7,
    question:
      'A colleague has been thrown clear of a 230 V cable and is awake but shaken. What now?',
    options: [
      'Get them checked at hospital and report it under RIDDOR',
      'Send them home to rest for the remainder of the day',
      'Wait to see if any symptoms develop over the next week',
      'Fill out the accident book and let them carry on working',
    ],
    correctAnswer: 0,
    explanation:
      'Any electric shock that needs medical attention or causes loss of consciousness is RIDDOR-reportable. Internal damage from electrical contact can show up hours or days later — heart rhythm issues especially. Hospital, then report.',
  },
  {
    id: 8,
    question: 'How does a 30 mA RCD protect against electric shock?',
    options: [
      'It limits the voltage at the socket to a safe level',
      'It trips when the total circuit current exceeds 30 mA',
      'It raises the resistance of the earth path to block current',
      'It detects current leaking to earth and disconnects within milliseconds',
    ],
    correctAnswer: 3,
    explanation:
      'An RCD compares the current going out on the line with the current coming back on the neutral. If they don’t match (because some current is leaking to earth — through a person, for example), it cuts the supply, typically within 40 ms. 30 mA is set deliberately below the fibrillation threshold.',
  },
];

/* ── FAQs (apprentice voice) ─────────────────────────────────────────── */

const faqs2 = [
  {
    question: "How can a 'low' voltage like 230 V actually kill someone?",
    answer:
      'Easily. 230 V across a hand-to-hand path with damp skin pushes well over 100 mA through the body — more than enough to fibrillate the heart in under a second. Most UK electrical fatalities at work happen at 230 V, not on HV systems.',
  },
  {
    question: 'Why do electricians talk about working one-handed?',
    answer:
      'If a fault catches you, you’d much rather the current go hand-to-hand-via-tool-to-floor than hand-to-hand-across-the-chest. Keep your spare hand in your pocket or behind your back when you’re near anything that might still be live. Breaks the path that goes through the heart.',
  },
  {
    question: 'I felt a tingle off something. Is that worth flagging?',
    answer:
      'Yes — every time. A tingle means current is finding a path it shouldn’t. Could be a failing earth, a loose neutral, capacitive coupling, a dodgy appliance. Don’t keep using it. Isolate it, label it, tell the supervisor. Today’s tingle is tomorrow’s shock.',
  },
  {
    question: 'What’s the difference between an electric burn and an arc burn?',
    answer:
      'Electric burns happen when current flows through your body — they’re often deep, internal, with small entry/exit wounds that look minor but can hide serious damage. Arc burns are radiated heat from the arc itself — the air round an arc can hit thousands of degrees in a millisecond, and it’ll melt clothing into skin. You can pick up both at the same incident.',
  },
  {
    question: 'Do all electric shocks at work have to be reported?',
    answer:
      'Under RIDDOR, you report a shock if it caused loss of consciousness, needed resuscitation, kept the person in hospital over 24 hours, or stopped them working for more than 7 consecutive days. Plus any specified injury (serious burns, etc). Even shocks that don’t meet RIDDOR still go in the company accident book.',
  },
  {
    question: 'How does BS 7671 actually stop me getting shocked?',
    answer:
      'Layered protection. Basic protection (insulation, enclosures) keeps you off live parts in the first place. Fault protection (earthing, bonding, ADS) disconnects the supply fast if a metal part goes live. Additional protection (30 mA RCDs) catches the bits that slip through both — and that’s what saves you when the drill bit goes through a buried cable.',
  },
];

export default function Lesson303_8_2() {
  return (
    <div className="space-y-8">

      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        {
          'Remember from L2 — shock, burn, fire are the headline electrical hazards. At L3 you map each to regulation, understand arc-flash and secondary injury, and apply control hierarchies.'
        }
      </p>

      <TLDR
        points={[
          'Five primary electrical hazards: shock, burn, arc-flash, fire, secondary injury. Each has its regulatory home.',
          "Shock thresholds: perception 1mA, pain 5-10mA, can't-let-go 10-20mA, respiratory 20-50mA, ventricular fibrillation 50-100mA+.",
          'Arc-flash temperatures ~19,000°C. EN 61482 PPE rated by ATPV (cal/cm²). Design controls (remote racking, arc-resistant switchgear) preferred.',
        ]}
      />
      <LearningOutcomes
        outcomes={[
          'Identify specific hazards associated with installation and maintenance of electrical systems and equipment.',
          'Distinguish shock, burn, arc-flash, fire and secondary injury hazards.',
          'Map each hazard to the relevant regulation (EAWR, BS 7671, RRFSO, COSHH, MHSWR).',
          'Apply hierarchy of control to electrical hazards with engineering / administrative / PPE responses.',
          'Recognise step potential, touch potential and induced voltage concepts.',
          'Recognise arc-flash as a high-consequence commercial / industrial hazard requiring specific PPE.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>The five primary electrical hazards</ContentEyebrow>
      <ConceptBlock
        title="Shock"
        plainEnglish="Current passing through the body causes physiological effects. Effects scale with current magnitude and duration. Mains 230V routinely delivers enough current through a person to cause cardiac arrest."
        onSite="Control: isolation (EAWR Reg 13), insulation, RCD protection (BS 7671), competence (Reg 16), PPE as last line. The L3 supervisor verifies controls are in place AND working."
      >
        <p>Current effects (rough thresholds, AC at mains frequency):</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>1 mA — perception (tingle).</li>
          <li>5-10 mA — pain.</li>
          <li>10-20 mA — &quot;can&apos;t let go&quot; (sustained muscle contraction).</li>
          <li>20-50 mA — respiratory paralysis if sustained.</li>
          <li>50-100 mA+ — ventricular fibrillation possible; cardiac arrest.</li>
          <li>1A+ — sustained cardiac arrest, severe burns.</li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Burn — direct and arc"
        plainEnglish="Two burn mechanisms. Direct contact = current heating tissue along its path; small surface mark, deep internal damage. Arc = thermal radiation from electrical arc, can burn at distance, can be severe over large body area."
        onSite="Both burn types require medical assessment regardless of how they look. Direct contact burns commonly underestimated by casualty because the surface is small."
      >
        <p>Burn-related considerations:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>Direct contact = entry / exit wounds along the current path.</li>
          <li>Arc = surface burns over body area exposed to the radiation.</li>
          <li>Both can cause cardiac arrest, muscle damage (rhabdomyolysis), nerve damage.</li>
          <li>Mandatory A&amp;E assessment.</li>
          <li>RIDDOR specified injury for serious burns &gt;10% body / vital organ damage.</li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="EAWR 1989 — Reg 4(1) and Reg 14"
        clause={
          <>
            Reg 4(1): "All systems shall at all times be of such construction as to prevent, so
            far as is reasonably practicable, danger." Reg 14: live working only via the
            three-test (unreasonable to be dead AND reasonable to be live AND suitable
            precautions).
          </>
        }
        meaning={
          <>
            The legal framework for electrical hazard control. Reg 4 = system level (design and
            maintain safe). Reg 14 = work activity level (default to dead-working; live only via
            three-test). Reg 13 = isolation. Reg 16 = competence. Together they cover the
            electrical hazard system.
          </>
        }
        cite="Source: Electricity at Work Regulations 1989 (SI 1989/635), Regs 4, 13, 14, 16."
      />

      <InlineCheck {...checks[0]} />

      <SectionRule />
      <ContentEyebrow>Arc-flash, fire and secondary injury</ContentEyebrow>
      <ConceptBlock
        title="Arc-flash — the catastrophic electrical event"
        plainEnglish="Fault current ionises air between conductors; explosive energy release; temperatures ~19,000°C; pressure wave; thermal radiation; molten metal projectiles. Survivable injuries common; fatalities occur. Predictable in commercial / industrial switchgear and DBs."
        onSite="Design controls: remote racking, arc-resistant switchgear, arc-fault detection. PPE: EN 61482 with ATPV cal/cm² rating matched to incident energy. EAWR Reg 14 three-test should rule out unnecessary live work that creates arc-flash exposure."
      >
        <p>Arc-flash hierarchy of control:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Eliminate</strong> — de-energise (always preferred).
          </li>
          <li>
            <strong>Substitute</strong> — design with arc-resistant switchgear.
          </li>
          <li>
            <strong>Engineer</strong> — remote racking, arc-fault detection, current-limiting
            devices.
          </li>
          <li>
            <strong>Administer</strong> — permit-to-work, restricted approach, training,
            competence (HV / SAP for high-energy).
          </li>
          <li>
            <strong>PPE</strong> — EN 61482 ATPV-rated kit, face shield, balaclava, gloves over
            insulating + leather.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Fire from electrical causes"
        plainEnglish="Common causes: loose connections (heat from high-resistance), overloaded circuits, damaged cables, water ingress, counterfeit / sub-standard kit, inadequate cooling. Most common single cause = loose connections at high-current terminations."
        onSite="Control: installation discipline (proper torque), inspection (EICR), maintenance, AFDD where appropriate (BS 7671 A4:2026 expansion), proper cable rating and protection. Periodic re-tightening at high-current terminations recommended for industrial switchgear."
      >
        <p>Fire hazard categories:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            Loose connection → high resistance → heat → ignition of insulation / surrounding
            materials.
          </li>
          <li>Overload → cable insulation failure → short circuit → arc.</li>
          <li>Cable damage (chasing, vermin, age) → short to ground / between phases.</li>
          <li>Water ingress → tracking → arcing → ignition.</li>
          <li>Counterfeit components → undersized / mis-rated → fail under fault.</li>
          <li>Inadequate cooling (transformer rooms, switchrooms) → thermal runaway.</li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Secondary injury"
        plainEnglish="Injury arising from the consequences of an electrical event rather than the electricity itself. Fall after a startle shock. Tool drop from height. Burn from hot equipment after fire. Collision while running. Often more severe than the primary electrical event."
        onSite="Risk assessment should consider the consequence chain, not just the immediate electrical event. Working at height + electrical work compounds the secondary injury risk; the WaH controls and the electrical controls both matter."
      >
        <p>Common secondary injuries:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>Fall from ladder / step-up after shock startle.</li>
          <li>Tool drop from height after shock or arc.</li>
          <li>Cut from broken glass / cover after explosion.</li>
          <li>Smoke inhalation when escaping fire.</li>
          <li>Crush injury from falling debris.</li>
          <li>Heart attack triggered by stress of incident.</li>
          <li>Hearing damage from arc-flash pressure wave.</li>
        </ul>
      </ConceptBlock>

      <InlineCheck {...checks[1]} />
      <InlineCheck {...checks[2]} />

      <SectionRule />
      <ContentEyebrow>Step, touch and induced voltage</ContentEyebrow>
      <ConceptBlock
        title="Three voltage-gradient hazards"
        plainEnglish="Step potential = voltage difference between feet planted in the ground near an earth fault. Touch potential = voltage between hand on energised object and feet on ground. Induced voltage = voltage induced in nearby conductors by electromagnetic field."
        onSite='Step potential mostly HV concern. Touch potential = headline LV hazard; addressed by bonding and disconnection times. Induced voltage explains why "dead" conductors near live ones can still give a reading or a tingle; bond and isolate.'
      >
        <p>Mitigation:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            Step potential — restricted approach to HV faults; insulating barriers; equipotential
            mats.
          </li>
          <li>
            Touch potential — equipotential bonding (BS 7671 Section 411), disconnection times,
            RCD protection.
          </li>
          <li>
            Induced voltage — bond conductors at both ends; understand parallel runs; verify dead
            with proper indicator.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />
      <ContentEyebrow>BS 7671 protection, RCD/AFDD and post-incident response</ContentEyebrow>
      <ConceptBlock
        title="BS 7671 protective measures — engineered shock prevention"
        plainEnglish="Chapter 41 of BS 7671 sets out protection against electric shock. Two layers: basic protection (against direct contact — insulation, barriers, enclosures, obstacles, placing out of reach) and fault protection (against indirect contact — automatic disconnection of supply via protective earthing + bonding + ADS, or alternative methods like SELV / electrical separation / Class II)."
        onSite="The L3 supervisor verifies both layers exist on every install. Basic protection is the design / installation discipline; fault protection is the earthing / bonding / disconnection time discipline. Together they remove most LV shock risk before PPE is needed."
      >
        <p>Protection layers per BS 7671 Chapter 41:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Basic protection (s.416)</strong> — insulation, barriers / enclosures (IP2X /
            IPXXB minimum), obstacles, placing out of reach, additional RCD ≤30mA.
          </li>
          <li>
            <strong>Fault protection (s.411)</strong> — automatic disconnection of supply (ADS)
            via protective earthing, bonding, ADS within disconnection times.
          </li>
          <li>
            <strong>Disconnection times (Table 41.1)</strong> — TN system 0.4s for final circuits
            ≤32A; TT system 0.2s.
          </li>
          <li>
            <strong>Additional protection (s.415)</strong> — RCD ≤30mA for sockets up to 32A in
            domestic; certain locations.
          </li>
          <li>
            <strong>SELV / PELV (s.414)</strong> — Separated Extra Low Voltage; alternative to
            ADS.
          </li>
          <li>
            <strong>Electrical separation (s.413)</strong> — single isolated supply circuit.
          </li>
          <li>
            <strong>Class II equipment (s.412)</strong> — double / reinforced insulation; no
            protective earth required.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="RCDs, AFDDs and BS 7671 A4:2026 expansion"
        plainEnglish="RCDs detect earth-leakage current and disconnect within tens of milliseconds — life-saving for direct contact. AFDDs (Arc Fault Detection Devices) detect the signature of arc faults that don't trip RCDs — fire-prevention. BS 7671 A4:2026 expanded the scenarios where AFDDs are required, particularly for higher-risk premises (HMOs, sleeping accommodation, care homes)."
        onSite="The L3 supervisor knows the new A4:2026 scope and applies on relevant installs. Verifying RCD operation (test button + Ramp / x1 / x5 instrument testing) is part of the EICR / handover routine."
      >
        <p>Protection device types:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>RCD</strong> — Residual Current Device. Detects earth-leakage; trips at rated
            I&Delta;n (typically 30mA for additional protection).
          </li>
          <li>
            <strong>RCBO</strong> — RCD + MCB combined; per-circuit protection.
          </li>
          <li>
            <strong>SRCD</strong> — Socket-outlet RCD; portable.
          </li>
          <li>
            <strong>AFDD</strong> — Arc Fault Detection Device. Detects arc signature; A4:2026
            expansion.
          </li>
          <li>
            <strong>Type AC</strong> — sinusoidal AC residual current only (largely superseded).
          </li>
          <li>
            <strong>Type A</strong> — AC + pulsating DC; current standard.
          </li>
          <li>
            <strong>Type F</strong> — Type A + high-frequency components (variable speed drives).
          </li>
          <li>
            <strong>Type B</strong> — full DC capability (EV charging, PV, some industrial).
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Post-incident response — preserving the scene"
        plainEnglish="After any electrical incident with potential injury or significant equipment damage, preserve the scene for investigation. Don't restore power; don't move components; photograph extensively; document witness accounts contemporaneously. The investigation evidence comes from the scene as it was."
        onSite="The L3 supervisor's reflex: stop, isolate, render aid, preserve. The temptation to 'tidy up' or 'just check what happened' destroys evidence. Wait for the firm's investigator / HSE inspector. Only act on the casualty's welfare and the immediate hazard."
      >
        <p>Scene preservation steps:</p>
        <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
          <li>Casualty welfare first — first aid, 999, isolation as needed.</li>
          <li>Make area safe — eliminate ongoing hazard without disturbing scene.</li>
          <li>Restrict access — barriers, signs, person on guard.</li>
          <li>Photograph — wide context shots, mid-distance, close-ups; multiple angles.</li>
          <li>
            Preserve equipment in place — don&apos;t open covers further, don&apos;t reset
            breakers.
          </li>
          <li>Note witness accounts contemporaneously — name, what they saw, when.</li>
          <li>Notify firm immediately — H&amp;S manager, contracts manager, director.</li>
          <li>
            RIDDOR notification by responsible person if specified injury / dangerous occurrence.
          </li>
          <li>
            HSE notification within statutory windows (immediate phone for fatal / specified;
            F2508 within 10 days for others).
          </li>
          <li>
            Don&apos;t admit liability or speculate on cause to anyone — let the investigation
            determine.
          </li>
        </ol>
      </ConceptBlock>

      <RegsCallout
        source="EAWR 1989 — Reg 16 (Persons to be competent to prevent danger and injury)"
        clause={
          <>
            "No person shall be engaged in any work activity where technical knowledge or
            experience is necessary to prevent danger or, where appropriate, injury, unless he
            possesses such knowledge or experience, or is under such degree of supervision as may
            be appropriate having regard to the nature of the work."
          </>
        }
        meaning={
          <>
            Reg 16 — competence and supervision. Technical knowledge / experience required, OR
            appropriate supervision. The L3 is often the &apos;appropriate supervision&apos; for
            L2 / apprentices. Failure to provide competent supervision where the work requires it
            is a Reg 16 breach.
          </>
        }
        cite="Source: Electricity at Work Regulations 1989 (SI 1989/635), Reg 16."
      />

      <RegsCallout
        source="RIDDOR 2013 — Reg 7 (Reportable dangerous occurrences)"
        clause={
          <>
            "Where an event listed in Schedule 2 (electrical short circuit / overload causing fire
            or explosion) occurs at any place of work which results in stoppage of the plant
            involved for more than 24 hours or could have caused death or serious injury, the
            responsible person must follow the reporting procedure."
          </>
        }
        meaning={
          <>
            RIDDOR Reg 7 + Sched 2 — dangerous occurrences. Electrical short circuit causing fire
            / explosion / 24h stoppage / could-have-caused serious injury all reportable. Even
            without injury, the dangerous occurrence is RIDDOR-reportable. The L3 supervisor
            recognises and escalates.
          </>
        }
        cite="Source: Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 (SI 2013/1471), Reg 7 + Sched 2."
      />

      <SectionRule />
      <CommonMistake
        title="Treating arc-flash as something that 'happens to other electricians'"
        whatHappens={
          <>
            Apprentice working on a 250A commercial DB without arc-flash PPE; assumes it&apos;s
            &quot;just a switchroom&quot;. Slipped screwdriver triggers phase-to-phase fault;
            arc-flash incident; serious burns; multi-week hospital stay; HSE prosecution; firm +
            supervisor liable; arc-flash PPE was available but not used.
          </>
        }
        doInstead={
          <>
            Treat all commercial / industrial switchgear as arc-flash hazardous until proven
            otherwise. EN 61482 ATPV-rated PPE for any work at the working position. Design
            controls (de-energise, remote racking) preferred to working live.
          </>
        }
      />

      <CommonMistake
        title="Treating loose connections as 'someone else's problem' on EICR"
        whatHappens={
          <>
            EICR identifies several loose terminations in a small commercial DB; codes them C2 /
            C3; firm reports to dutyholder; doesn&apos;t make safe on the day. Six weeks later one
            of the connections starts to overheat; small fire in the switchroom; significant smoke
            damage; insurance claim.
          </>
        }
        doInstead={
          <>
            Loose connections discovered during EICR should typically be re-torqued on the day
            where safely possible (small terminations, accessible). The EICR is the report; making
            safe within the visit is the operative response. Document the action.
          </>
        }
      />

      <Scenario
        title="Switchroom inspection — mapping hazards to regulations"
        situation={
          <>
            You're scheduled for a planned EICR + remedial visit at a small commercial switchroom:
            400V three-phase distribution, 250A main switch, several sub-DBs, mid-week,
            customer’s operations continuing in the building.
          </>
        }
        whatToDo={
          <>
            Map hazards. Shock — EAWR Reg 13 isolation. Arc-flash — EAWR Reg 14 (default to dead
            working; if any live work needed, three-test + permit + EN 61482 PPE). Fire — RRFSO
            2005 + EAWR Reg 4 (system maintained safely); CO2 extinguisher available. Secondary
            injury — MHSWR Reg 3 risk assessment of consequence chain (e.g. fall from access
            platform if startled). Specific controls: full isolation strategy planned in advance
            with customer (out-of-hours window if needed); GS38 voltage indicator + proving unit;
            lock-off on each sub-DB worked; EN 61482 PPE + EN 60903 Class 0 gloves for any live
            test work; second person present for arc-flash potential; clear access route
            maintained for emergency egress; CO2 extinguisher within reach; first-aid kit on site;
            FAW first aider identified. Document on dynamic risk assessment. Brief any L2 mate on
            the specific hazards. Customer briefed on which areas will be isolated and when.
          </>
        }
        whyItMatters={
          <>
            Mapping each hazard to its regulation gives the assessment structure and demonstrates
            competence. The HSE inspector reviewing after any incident sees thoughtful engagement
            with the framework. The customer sees a professional approach. The L3
            supervisor&apos;s reflex to map hazard → regulation → control is what distinguishes
            mature practice from intuition.
          </>
        }
      />

      <SectionRule />
      <ContentEyebrow>Arc-flash incident energy — the IEEE 1584 framework</ContentEyebrow>

      <ConceptBlock
        title="Why the same DB can have different arc-flash energies at different positions"
        plainEnglish="Arc-flash incident energy at a given working position depends on the available fault current, the system voltage, the protective device clearing time, the working distance from the arc, the gap between conductors, and the enclosure geometry. The IEEE 1584 method (and the simpler Lee method for higher voltages) calculates incident energy in cal/cm² for a given position. The same DB can show 8 cal/cm² at the closed cover with a quick-clearing breaker and 25+ cal/cm² with the cover open, the breaker degraded, or working close to the bus. PPE selection has to match the calculated energy at the actual working position."
        onSite="The L3 supervisor doesn't typically perform the IEEE 1584 calculation but should know it exists and should ask 'what is the arc-flash study at this site?'. Modern industrial sites increasingly have labels on switchgear showing the incident energy and required PPE class. Where no study exists, conservative assumption (treat as 12 cal/cm² minimum for any commercial DB; 25+ for any large industrial gear) is the practical fallback."
      >
        <p>Factors driving arc-flash incident energy:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Available fault current</strong> — higher fault current = more energy
            released; depends on transformer size and impedance.
          </li>
          <li>
            <strong>Protective device clearing time</strong> — quicker disconnection = less
            energy; coordination affects the time.
          </li>
          <li>
            <strong>Working distance</strong> — incident energy reduces with distance from arc;
            closer working = higher energy.
          </li>
          <li>
            <strong>Conductor gap</strong> — wider gaps sustain longer arcs.
          </li>
          <li>
            <strong>Enclosure geometry</strong> — enclosed arcs reflect heat outward; higher
            delivered energy.
          </li>
          <li>
            <strong>System voltage</strong> — higher voltage = higher energy per second.
          </li>
          <li>
            <strong>Equipment condition</strong> — degraded contacts, contamination affect arc
            behaviour.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />
      <FAQ items={faqs} />
      <SectionRule />
      <KeyTakeaways
        points={[
          'Remember from L2 — shock, burn, fire are headline electrical hazards. At L3 you add arc-flash and secondary injury and map each to regulation.',
          "Shock thresholds: perception 1mA, pain 5-10mA, can't-let-go 10-20mA, ventricular fibrillation 50-100mA+.",
          'Burns deceptive — small surface, deep internal. Mandatory A&E.',
          'Arc-flash ~19,000°C. EN 61482 ATPV PPE; design controls preferred (de-energise, remote racking).',
          'Most common electrical fire cause = loose connections. Installation discipline + periodic inspection.',
          'Secondary injury (fall, tool drop, smoke inhalation) often more severe than primary shock. Risk assessment includes the consequence chain.',
          'Step / touch / induced voltage — three voltage-gradient hazards. Touch potential is the LV headline; addressed by bonding and disconnection times.',
          'Map hazard → regulation → control. EAWR + BS 7671 + RRFSO + COSHH + MHSWR each have their domain.',
        ]}
      />
      <Quiz title="Specific electrical hazards — knowledge check" questions={quizQuestions} />

      <SectionRule />


      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        What electricity actually does to a human body — the currents, the paths, the burns, and
        the numbers every BS 7671 protective device is sized to stop. The reason every other
        safety habit on site exists.
      </p>

      <TLDR
        points={[
          'It’s the CURRENT through your body that does the damage, not the voltage. Tens of milliamps is enough to stop your heart.',
          'Path matters. Hand-to-hand across the chest is the killer. One-handed working breaks that path.',
          'BS 7671’s protective layers — basic protection, ADS, 30 mA RCDs — are all sized around what current does to a human body.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Explain the physiological effects of electric current at the key threshold levels (1 mA, 10 mA, 30 mA, 50 mA+).',
          "Describe why current path through the body matters and what 'one-handed working' is for.",
          'Tell the difference between electric burns, arc burns and contact burns.',
          'Distinguish direct contact from indirect contact, and the BS 7671 voltage bands (ELV, LV, HV).',
          'React correctly to someone who’s been shocked — isolate, call, treat, report.',
          'Link RCDs, ADS, double insulation and SELV/PELV back to the body’s actual tolerance.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>Why this is the first hazard you learn</ContentEyebrow>

      <ConceptBlock title="Most common serious injury on site — and the reason for every other safety habit">
        <p>
          The HSE gets reports of around{' '}
          <strong>1,000 electric-shock and burn accidents at work each year</strong>. About{' '}
          <strong>30 of those are fatal</strong>. Most of the fatalities come from contact with
          overhead or underground power cables — but the non-fatal ones are everywhere:
          distribution boards, dodgy appliances, that "I’ll just have a quick look while it’s on"
          moment.
        </p>
        <p>
          Even a non-fatal shock can wreck a career. Burns that need skin grafts. Heart-rhythm
          issues that show up months later. Or a fall off a ladder because the shock made you
          jump. This is why every isolation procedure, every RCD, every PPE rule that follows
          exists.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>What a shock actually does</ContentEyebrow>

      <ConceptBlock
        title="Voltage is the pressure. Current is what hurts you."
        plainEnglish="Voltage pushes — but it’s the current that actually flows through your tissue and disrupts your nerves, muscles and heart. That’s why every protective device in BS 7671 is rated in current, not voltage."
        onSite="A 12 V car battery is harmless to touch. A 230 V socket can kill you. Same person, same body resistance — the difference is how much CURRENT the voltage can push through you."
      >
        <p>
          When current passes through the body it does three things at once: it scrambles the
          nerve signals to your muscles, it heats the tissue it flows through, and — if it reaches
          the heart — it can throw the heart out of rhythm. Which of those gets you first depends
          on how much current, where it flows, and how long for.
        </p>
        <p>
          The body has both <strong>skin impedance</strong> (high when dry, much lower when wet)
          and <strong>internal impedance</strong> (fairly low). Wet hands, sweat, a cut, or a
          conductor that punctures the skin all crash the resistance and let far more current
          through for the same voltage. That’s why "it’s only 230" gets people killed.
        </p>
      </ConceptBlock>

      <ConceptBlock title="The threshold currents — the numbers behind the regs">
        <p>
          These figures come from decades of medical research. They assume a current path through
          the body lasting more than about 200 ms. Round figures, not exact, but they’re the
          numbers BS 7671 protective devices are sized against:
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>1-2 mA</strong> — perception threshold. You feel a tingle.
          </li>
          <li>
            <strong>5-10 mA</strong> — painful but you can usually still let go.
          </li>
          <li>
            <strong>10-15 mA</strong> — <em>let-go threshold</em>. Your forearm muscles contract
            and clamp onto the conductor. You can’t release.
          </li>
          <li>
            <strong>20-30 mA</strong> — severe shock. Sustained muscle contraction, respiratory
            paralysis if it crosses the chest.
          </li>
          <li>
            <strong>50 mA and above</strong> — ventricular fibrillation likely. Heart stops
            pumping, brain damage in 3-7 minutes if not reversed.
          </li>
          <li>
            <strong>100 mA+</strong> — fibrillation almost certain at typical durations. Plus deep
            tissue burns at the entry and exit points.
          </li>
        </ul>
        <p>
          For perspective: a 100 W bulb draws about 400 mA. The current in a kettle is around 13
          amps. Compared to those, the current that kills you is tiny. That’s why a 30 mA RCD
          trips well below the lethal range — and why it’s the main safeguard for sockets and most
          domestic final circuits.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="HSE HSG85 — Electricity at work: safe working practices"
        clause="Each year about 1,000 accidents at work involving electric shock or burns are reported to the Health and Safety Executive (HSE). Around 30 of these are fatal. Most of these fatalities arise from contact with overhead or underground power cables. Even non-fatal shocks can cause severe and permanent injury."
        meaning={
          <>
            Electrical injury is the most common serious electrical incident on UK sites.
            Non-fatal doesn’t mean minor — burns, falls, long-term cardiac issues all sit in the
            "non-fatal" column. Treat every potential shock path like it could be the one.
          </>
        }
        cite="Reference: HSE HSG85 — Electricity at work: safe working practices"
      />

      <InlineCheck
        id={checks2[0].id}
        question={checks2[0].question}
        options={checks2[0].options}
        correctIndex={checks2[0].correctIndex}
        explanation={checks2[0].explanation}
      />

      <SectionRule />

      <ContentEyebrow>Path of the current</ContentEyebrow>

      <ConceptBlock
        title="Hand-to-hand is the killer path"
        plainEnglish="The danger isn’t just how much current — it’s WHERE it flows. Anything across the chest goes through the heart. That’s the path you want to break."
        onSite="One-handed working: keep your spare hand in your pocket, behind your back, or holding a non-conductive surface. If something does catch you, the path is hand-to-foot at worst, not hand-to-hand-through-the-chest."
      >
        <p>
          Hand-to-hand current crosses the heart cavity directly. It’s the path most likely to
          cause ventricular fibrillation at low currents. Hand-to-foot is also dangerous but
          generally lower risk than hand-to-hand. Foot-to-foot — like getting a step voltage off a
          downed line — usually misses the chest, though it can still throw you off balance.
        </p>
        <p>
          That’s why the experienced electricians you’ll see drop test leads and screwdrivers
          don’t just grab the bare end with two hands. They isolate the path. It looks fussy until
          the day it doesn’t.
        </p>
      </ConceptBlock>

      <InlineCheck
        id={checks2[1].id}
        question={checks2[1].question}
        options={checks2[1].options}
        correctIndex={checks2[1].correctIndex}
        explanation={checks2[1].explanation}
      />

      <SectionRule />

      <ContentEyebrow>Burns — three different kinds</ContentEyebrow>

      <ConceptBlock title="Contact burns, arc burns and internal burns">
        <p>
          Electrical burns aren’t all the same. You can get any combination of these from one
          incident:
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Contact burns</strong> — at the point where the current entered or left the
            body. Often look small but can be deep. Tissue cooked from the inside.
          </li>
          <li>
            <strong>Arc burns (arc flash)</strong> — radiated heat from an electrical arc. An arc
            can hit several thousand degrees in milliseconds. Hot enough to ignite clothing, melt
            tools, and cause flash burns to skin and eyes from a metre or more away.
          </li>
          <li>
            <strong>Internal burns</strong> — deep tissue damage along the current path. The most
            dangerous and the easiest to underestimate, because the skin entry/exit wounds can
            look unimpressive while the muscle and nerve damage underneath is severe.
          </li>
        </ul>
        <p>
          An arc flash event is a different beast from a "just" shock. The pressure wave can
          rupture eardrums and knock you down; the light can blind; the vapourised metal can burn
          lungs. Switching faulty gear, racking a faulty MCCB, or shorting a busbar with a
          screwdriver are classic causes. You’ll learn more about this later in this course, under
          overloads, short circuits and arcing.
        </p>
      </ConceptBlock>

      <CommonMistake
        title="Treating electrical burns like ordinary burns and missing what’s underneath"
        whatHappens={
          <>
            Casualty took a shock through the hand. Small black mark on the palm, looks minor,
            they say "I’m fine, just got a tingle". You patch it up and let them carry on. Hours
            later they collapse — the heart’s gone into an irregular rhythm from the original
            current path, or there’s deep tissue damage cooking the muscle.
          </>
        }
        doInstead={
          <>
            Any electric shock that broke the skin, caused unconsciousness, or made the casualty
            fall, gets a hospital check. Full stop. Internal electrical damage and cardiac issues
            can take hours to show. Don’t let macho "I’m alright, mate" talk you out of A&E.
          </>
        }
      />

      <SectionRule />

      <ContentEyebrow>Direct vs indirect contact</ContentEyebrow>

      <ConceptBlock
        title="Touching something live vs touching something that’s GONE live"
        plainEnglish="Direct contact = you touched a bare live conductor. Indirect contact = you touched a metal case that shouldn’t have been live but is, because something inside has faulted."
        onSite="The metal washing-machine case that gives you a tingle, the dishwasher that buzzes when you brush it — that’s indirect contact. The fault has put line voltage onto the case because the earth or insulation has failed."
      >
        <p>
          <strong>Basic protection</strong> stops direct contact. Insulation on cables, barriers,
          enclosures, plug shutters — anything that keeps you off the live parts in the first
          place.
        </p>
        <p>
          <strong>Fault protection</strong> deals with indirect contact. The main system for this
          in BS 7671 is <strong>Automatic Disconnection of Supply (ADS)</strong>: everything
          metallic gets connected back to earth via a circuit protective conductor (CPC), and if a
          fault dumps line voltage onto a casing, the resulting fault current trips the protective
          device fast enough to stop you getting a fatal shock.
        </p>
        <p>
          On top of that, <strong>additional protection</strong> (the 30 mA RCD) is the backstop —
          for when the basic and fault protection both fail, or when you’ve done something neither
          of them can predict, like driving a nail through a buried cable.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Part 2 (Definitions)"
        clause="Automatic disconnection of supply: a protective measure in which (a) basic protection is provided by basic insulation of live parts or by barriers or enclosures in accordance with Section 416; and (b) fault protection is provided by protective earthing, protective equipotential bonding and automatic disconnection in case of a fault, in accordance with Regulations 411.3 to 411.6."
        meaning={
          <>
            ADS is the standard protective regime for nearly every circuit you’ll wire as an
            apprentice. Three legs: <strong>earthing</strong> (every exposed-conductive-part
            connected back to the MET), <strong>bonding</strong> (extraneous metalwork tied in
            too, so everything sits at the same potential), and{' '}
            <strong>automatic disconnection</strong> (the MCB or RCD that trips on fault). All
            three have to be there — earth without disconnection just keeps the casing live.
          </>
        }
        cite="Reference: BS 7671:2018+A4:2026 Part 4 Chapter 41"
      />

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 415.1.1 (additional protection)"
        clause="The use of RCDs with a rated residual operating current not exceeding 30 mA is recognized in AC systems as additional protection in the event of failure of the provision for basic protection and/or the provision for fault protection or carelessness by users."
        meaning={
          <>
            30 mA is the magic number. It’s set deliberately below the threshold at which
            ventricular fibrillation becomes likely, and modern RCDs disconnect typically within
            40 ms of detecting that imbalance. That’s the difference between a survivable jolt and
            a cardiac arrest. Almost every socket-outlet up to 32 A in a domestic install needs 30
            mA RCD protection — and most lighting circuits too.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026 Part 4 Chapter 41 Regulation 415.1.1."
      />

      <SectionRule />

      <ContentEyebrow>Voltage bands</ContentEyebrow>

      <ConceptBlock title="Extra-Low, Low Voltage, High Voltage — and why it matters">
        <p>BS 7671 splits AC voltages into three bands:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Extra-Low Voltage (ELV):</strong> up to 50 V AC (or 120 V ripple-free DC).
            SELV and PELV systems live here — used for things like bathroom shaver sockets,
            doorbells, low-voltage lighting.
          </li>
          <li>
            <strong>Low Voltage (LV):</strong> 50 V to 1000 V AC. This is where 99% of your
            apprenticeship lives — 230 V single-phase, 400 V three-phase. The "Low" is relative to
            HV; it’ll still kill you.
          </li>
          <li>
            <strong>High Voltage (HV):</strong> above 1000 V AC. Substations, distribution
            transformers, the DNO’s side of the meter. Specialist competence required — you’ll
            never touch HV without specific training and authorisation.
          </li>
        </ul>
        <p>
          SELV (Separated Extra-Low Voltage) is the safest tier — isolated source, no earth
          connection, and below 50 V AC there’s not enough pressure to push a dangerous current
          through normal dry skin. That’s why it’s mandated for the riskiest spots, like inside
          zone 0 of a bathroom (where it has to be even lower, 12 V AC max).
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>If someone gets shocked</ContentEyebrow>

      <ConceptBlock
        title="Isolate first. Always. Don’t make it two casualties."
        onSite="Lock-off keys live on the same belt as your VI. If a mate’s hung up on a live cable, you want the supply off in seconds, not minutes hunting for the right key."
      >
        <p>Order of operations when you find someone in contact with a live source:</p>
        <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Don’t touch them.</strong> While the current’s flowing, they’re a conductor.
            Touching them adds you to the circuit.
          </li>
          <li>
            <strong>Isolate the supply.</strong> Main switch, the relevant MCB, the plug —
            whatever drops the supply fastest. Get it off and locked off if you can.
          </li>
          <li>
            <strong>If you genuinely cannot isolate</strong> (the supply isn’t accessible, an HV
            line, a fallen cable on a public road), use a non-conductive object — a dry broom
            handle, a length of timber — to break the contact. Don’t use anything damp or metal.
          </li>
          <li>
            <strong>Call 999.</strong> Tell them it’s an electrical injury — paramedics will bring
            cardiac monitoring, which they should do for any electric-shock casualty.
          </li>
          <li>
            <strong>First aid.</strong> Check responsiveness and breathing. CPR if trained and
            needed. Cool any burns under cool running water for at least 20 minutes — cling film
            over the burn afterwards is ideal. Don’t pop blisters, don’t apply creams.
          </li>
          <li>
            <strong>Preserve the scene.</strong> Don’t tidy up. The investigation needs to see
            what happened.
          </li>
        </ol>
      </ConceptBlock>

      <Scenario
        title="The apprentice with the screwdriver in the consumer unit"
        situation={
          <>
            You’re working alongside another second-year. He’s putting a new circuit into a
            consumer unit. You hear a yelp, turn round and see him locked onto the busbar — left
            hand on the case, right hand still gripping a screwdriver wedged against a live tail.
            He’s not moving and his eyes are open but blank.
          </>
        }
        whatToDo={
          <>
            Don’t grab him — current’s still flowing through both of you the second you touch him.
            The main switch is right there in the same enclosure: hit it. As soon as it drops, get
            him on his back, check breathing, call 999 and say "electrical injury". Start CPR if
            he’s not breathing. Keep him warm. Once paramedics are en route, isolate at the meter
            as well so nobody re-energises anything. Note times, what you saw, who was on site.
          </>
        }
        whyItMatters={
          <>
            Hand-to-hand across the chest at 230 V is the textbook fibrillation path. Seconds
            matter. The reason "isolate first" is drilled into you is exactly this — a panicked
            grab kills two people instead of one. Even after he wakes up, he goes to hospital, and
            it goes in as a RIDDOR report.
          </>
        }
      />

      <InlineCheck
        id={checks2[2].id}
        question={checks2[2].question}
        options={checks2[2].options}
        correctIndex={checks2[2].correctIndex}
        explanation={checks2[2].explanation}
      />

      <SectionRule />

      <ContentEyebrow>Reporting it</ContentEyebrow>

      <ConceptBlock title="RIDDOR — when an electric shock has to be reported to HSE">
        <p>
          Under the Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013
          (RIDDOR), the responsible person at work has to report certain electrical accidents. For
          an electric shock, the triggers include:
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>Loss of consciousness caused by the shock or asphyxia.</li>
          <li>
            Any specified injury — serious burns covering &gt;10% of the body, burns to the eyes,
            respiratory damage from fume or arc flash.
          </li>
          <li>Any worker incapacitated for more than 7 consecutive days as a result.</li>
          <li>An accident requiring the casualty to be taken to hospital (if not at work).</li>
          <li>
            Any "dangerous occurrence" — including electrical short or overload that causes a fire
            or explosion stopping plant for more than 24 hours, or that posed a significant risk
            of death.
          </li>
        </ul>
        <p>
          Even shocks that don’t meet RIDDOR thresholds still go in the company accident book.
          That record is what the HSE looks at if something later goes wrong, and it’s what your
          boss uses to spot recurring kit or procedural issues. Don’t shrug them off. Write them
          down.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>How BS 7671 protects against all this</ContentEyebrow>

      <ConceptBlock
        title="Layered protection — basic, fault, additional"
        plainEnglish="There’s no single thing that stops electric shock. There’s a stack: keep you off the live parts, kill the supply fast if metalwork goes live, and a 30 mA backstop on top for when the first two fail."
      >
        <p>
          Everything in Part 4 of BS 7671 (Protection for Safety) ladders up from the physiology
          you’ve just read. The protective measures are designed to either keep dangerous current
          off you, or disconnect it before it can reach the dangerous thresholds:
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Basic protection:</strong> insulation, barriers, enclosures, IP-rated casings.
            Stops direct contact in normal use.
          </li>
          <li>
            <strong>Fault protection (ADS):</strong> earthing + bonding + a protective device that
            disconnects within the time required by Reg 411.3.2 (typically 0.4 s on a 230 V TN
            final circuit). Stops indirect contact lasting long enough to fibrillate.
          </li>
          <li>
            <strong>Class II equipment:</strong> double or reinforced insulation. No exposed metal
            that can become live, so no need for an earth connection. The "double square" symbol
            on a power tool.
          </li>
          <li>
            <strong>SELV / PELV:</strong> reduce the voltage so far it can’t push a dangerous
            current through a person. Used in special locations like bathroom zones.
          </li>
          <li>
            <strong>Additional protection (30 mA RCD):</strong> the catch-all. Required for most
            socket-outlets, lighting circuits, mobile equipment used outdoors, and any cable
            buried less than 50 mm in a wall without earthed mechanical protection.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 411.3.4"
        clause="Within domestic (household) premises, additional protection by an RCD with a rated residual operating current not exceeding 30 mA shall be provided for AC final circuits supplying luminaires."
        meaning={
          <>
            Lighting circuits in homes now need 30 mA RCD protection — not just sockets. That’s a
            recent shift driven by the realisation that most domestic shocks happen from changing
            bulbs, dodgy fittings, or kids poking at lampholders. If you’re installing or
            modifying domestic lighting, that RCD has to be there.
          </>
        }
        cite="Reference: BS 7671:2018+A4:2026 Part 4 Chapter 41 Regulation 411.3.4"
      />

      <SectionRule />

      <FAQ items={faqs2} />

      <SectionRule />

      <KeyTakeaways
        points={[
          'Current does the damage, not voltage. Tens of milliamps through the chest can fibrillate the heart.',
          'Threshold numbers to know: 1 mA tingle, 10 mA can’t-let-go, 30 mA respiratory paralysis, 50 mA+ fibrillation likely.',
          'Hand-to-hand is the killer path. One-handed working breaks it.',
          'Three burn types: contact (entry/exit), arc (radiated heat), internal (deep tissue along the current path). All three can happen in one incident.',
          'Direct contact = touching live parts (basic protection stops it). Indirect contact = touching something that’s gone live (ADS + RCD stop it).',
          'If a mate’s been shocked: isolate first, never touch them while live, call 999, treat for shock and burns, RIDDOR-report if it meets the threshold.',
        ]}
      />

      {/* ── Quiz (preserved — links to streaks/stats) ───────── */}

      <Quiz title="Electric shock and burns knowledge check" questions={quizQuestions2} />

      {/* ── Prev / next nav ─────────────────────────────────── */}
    </div>
  );
}
