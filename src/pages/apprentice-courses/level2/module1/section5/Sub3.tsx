/**
 * Module 1 · Section 5 · Subsection 3 — Lock-off, tag-out, prove–test–prove
 *
 * Unit 201, LO3, AC 3.8 — apprentice has to be able to use isolation
 * equipment correctly: lock-off devices, tags, proving units and GS38
 * voltage indicators.
 *
 * Hands-on detail on the kit: what each item is for, how to choose it, how
 * to use it correctly, and how to spot when it’s no longer fit for service.
 *
 * Cross-references: §5.2 (the procedure), §1.4 (PPE/test kit overview),
 * §2.1 (current thresholds the kit is designed to keep you below).
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

const TITLE = 'Lock-off, tag-out and prove–test–prove | Level 2 Module 1.5.3 | Elec-Mate';
const DESCRIPTION =
  'The kit on your belt for safe isolation: lock-off devices, padlocks, tags, multi-hasps, group lock boxes, GS38 voltage indicators and proving units. What to buy, how to use it, when to bin it.';

/* ── Inline checks ────────────────────────────────────────────────── */

const checks = [
  {
    id: 's5-3-vi-vs-multimeter-check',
    question: 'Why is a two-pole voltage indicator preferred over a multimeter for proving dead?',
    options: [
      'It gives a precise numerical reading you can record',
      'It can’t be on the wrong range, has fixed leads, and gives a positive ‘live’ indication you can’t miss',
      'It can also measure insulation resistance and continuity',
      'It is cheaper and smaller than a two-pole indicator',
    ],
    correctIndex: 1,
    explanation:
      "Voltage indicators are purpose-built for safe isolation: no rotary range switch to be on the wrong range, no detachable leads, and integral GS38 features (finger guards, ≤4 mm tip, often LED + haptic + audible indication). A multimeter on AC volts will happily read 0 V because the circuit is dead OR because it’s on amps OR the leads are in the wrong sockets.",
  },
  {
    id: 's5-3-gs38-tip-check',
    question: 'What is the maximum exposed metal at the tip of a GS38 test probe?',
    options: [
      '2 mm (preferably) or 4 mm maximum',
      '8 mm to reach into deep terminals',
      '15 mm so it can bridge two terminals',
      'There is no maximum if a finger guard is fitted',
    ],
    correctIndex: 0,
    explanation:
      "GS38 wants ≤4 mm of bare metal at the tip — and ‘preferably 2 mm’ — so a slipped probe can’t bridge two adjacent terminals. Older multimeter probes with 30+ mm of bare metal don’t meet GS38 and shouldn’t be used for proving dead.",
  },
  {
    id: 's5-3-multi-hasp-check',
    question: 'You and another electrician are working on the same isolated sub-main. How should the lock-off be arranged?',
    options: [
      'One padlock and one shared key between the two of you',
      'One padlock per person, both clipped onto the same multi-hasp on the device',
      'Whoever isolates first locks off; the other just relies on it',
      'No padlock needed — a warning tag is enough for two people',
    ],
    correctIndex: 1,
    explanation:
      "Multi-hasp (sometimes called a multi-padlock hasp) — designed to take up to 6 padlocks. Every person working on the circuit clips their own padlock to it, keeps their own key. Circuit can’t be re-energised until the LAST padlock comes off — so nobody is forgotten.",
  },
];

/* ── End-of-page Quiz ─────────────────────────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question: 'What does GS38 cover?',
    options: [
      'The minimum insulation resistance values for a new circuit',
      'Test equipment safety for electrical work on LV systems (probes, leads, indicators)',
      'The selection of protective devices for final circuits',
      'Safe working loads for ladders and mobile towers',
    ],
    correctAnswer: 1,
    explanation:
      "GS38 (HSE Guidance Note GS38) sets out what counts as safe test equipment for working on LV systems. It defines probe geometry, finger guards, fused leads, voltage indicator features and the ‘prove on a known source’ requirement.",
  },
  {
    id: 2,
    question: 'What item is specifically designed to test that your voltage indicator is working?',
    options: [
      'A calibration certificate from an accredited laboratory',
      'A socket tester that lights three LEDs',
      'A proving unit (battery-powered known voltage source)',
      'A second voltage indicator used as a back-up',
    ],
    correctAnswer: 2,
    explanation:
      "A proving unit. Battery-powered, generates a known AC voltage (typically 230 V or higher) and often a DC voltage too, with a contact pad/probe set you can press the indicator probes against. Lets you confirm the indicator works without going near a live circuit.",
  },
  {
    id: 3,
    question: 'Your voltage indicator’s LEDs work but the haptic/buzzer doesn’t. Is the indicator still safe to use?',
    options: [
      'Yes — as long as the LEDs work, the buzzer is just a bonus',
      'Yes — the buzzer is only needed in noisy plant rooms',
      'Yes — provided you prove it on the proving unit first',
      'No — GS38 expects multiple indication modes; one failure means the unit is suspect and goes out of service',
    ],
    correctAnswer: 3,
    explanation:
      "GS38 wants more than one indication mode (LED + buzzer/vibration + sometimes a digital display) precisely so a single failure doesn’t leave you with a silent ‘dead’ reading. If any one indicator stops working, the unit goes out of service until repaired or replaced.",
  },
  {
    id: 4,
    question: 'What should be on a lock-off tag?',
    options: [
      "Worker’s name, date applied, brief description of work, contact phone number",
      "Just the word 'DANGER' in large red letters",
      "The circuit reference number and nothing else",
      "The make and model of the lock-off padlock used",
    ],
    correctAnswer: 0,
    explanation:
      "Name (so anyone wanting to re-energise can find the right person), date applied, brief description of work, and a contact number. Without the name + number, the tag tells nobody anything they can act on.",
  },
  {
    id: 5,
    question: 'What is a CAT rating on test equipment, and what should you use for distribution-board work?',
    options: [
      'The continuity-test current the instrument can deliver',
      'It’s the IEC 61010 measurement category — CAT III 600 V or higher for LV distribution work',
      'The IP rating against dust and water ingress',
      'The maximum cable size the leads can connect to',
    ],
    correctAnswer: 1,
    explanation:
      "CAT (Category) ratings under IEC 61010 describe the transient over-voltages the meter can survive. CAT II is appliances and short cords, CAT III is fixed installation / distribution, CAT IV is supply origin (DNO side). For a CU or sub-main use CAT III 600 V minimum, ideally CAT IV.",
  },
  {
    id: 6,
    question: 'What kind of padlock should you use for personal lock-off?',
    options: [
      'A keyed-alike set so the whole team can open any lock',
      'A combination padlock so there’s no key to lose',
      'A padlock with a unique key — never a ‘keyed-alike’ set someone else could open',
      'Any padlock from the van, as long as it closes firmly',
    ],
    correctAnswer: 2,
    explanation:
      "Personal padlocks are ‘keyed-different’ — your key is the only one that opens YOUR lock. ‘Keyed-alike’ sets defeat the entire point of personal control. A combination lock is also unsafe because anyone watching can re-use the combination.",
  },
  {
    id: 7,
    question: 'A pull-out fuse carrier is the only means of isolation and you can’t fit a lock-off. What do you do?',
    options: [
      'Leave the carrier in and just post a warning notice',
      'Tape the carrier in place so it can’t be pulled out',
      'Skip isolation — there’s nothing lockable, so carry on',
      'Withdraw the fuse carrier and keep it physically with you (in your toolbox or van)',
    ],
    correctAnswer: 3,
    explanation:
      "Withdraw the carrier and keep possession of it. The circuit cannot be re-energised without you and the carrier being present. HSE HSG85 explicitly recognises this method where lockable devices aren’t fitted.",
  },
  {
    id: 8,
    question: 'You drop your voltage indicator off a step-up. It still appears to work. What now?',
    options: [
      "Take it out of service immediately, prove it on a proving unit + visually inspect, and if there’s any doubt replace it",
      "Carry on using it — if it still reads, it’s fine",
      "Give it a shake and use it for the rest of the day",
      "Only replace it if the case is visibly cracked",
    ],
    correctAnswer: 0,
    explanation:
      "A drop can crack internal components, displace a fuse, fracture a lead. Take it out of service, prove on a proving unit, visually check leads/probes/case. ANY doubt — bin it. The cost of a £100 indicator is nothing compared with a false ‘dead’ reading.",
  },
];

/* ── FAQs ─────────────────────────────────────────────────────────── */

const faqs = [
  {
    question: "What’s the difference between a voltage indicator and a multimeter?",
    answer:
      "Voltage indicator (sometimes called a two-pole tester or VI): purpose-built, fixed leads, no range switch, GS38 probes, multiple indication modes. Designed for one job — telling you whether a conductor is live. Multimeter: general-purpose lab/diagnostic tool, detachable leads, rotary range switch, lots of failure modes (wrong range, wrong socket, blown internal fuse). Multimeters have a place in fault-finding, but proving dead during safe isolation is a VI job.",
  },
  {
    question: "Do I need to test my proving unit too?",
    answer:
      "Visually before each use (case intact, no cracks, batteries fresh). The proving unit is itself proved against the voltage indicator each time you use it — if the indicator lights up, the proving unit is working AND the indicator is working. They’re a pair. Have both calibrated annually if your firm follows that policy; many manufacturers also recommend battery replacement on a defined schedule.",
  },
  {
    question: "How many lock-off devices should I carry?",
    answer:
      "A practical kit covers most of what you’ll meet: universal MCB lockouts (clip onto common breaker bodies), wide-jaw lockouts for older breakers, three-phase isolator lockouts (for rotary switch-disconnectors), socket lockouts for plug-and-socket isolation, plus 4-6 personal padlocks (keyed-different) and at least one multi-hasp. Tags pre-printed and ready to write on.",
  },
  {
    question: "Do I really need a proving unit if there’s a known live socket nearby?",
    answer:
      "A proving unit is the safer default — it’s a defined source, it can’t be turned off mid-job, and it lives on the same belt as your indicator. Using a known-live socket means you’re putting your VI’s probes on a live circuit twice (before and after) — defeating part of the point of isolation. Proving units are ~£40-80 and pay for themselves the first time you’re working somewhere with no obvious live source nearby.",
  },
  {
    question: "Can I use the same padlock for two jobs at once?",
    answer:
      "If both isolations are for one continuous piece of work that you’re fully in control of and they’re feet apart, yes — one padlock per device, all under your personal control. If the jobs are physically separated (different floor, different room) it’s safer to carry one padlock per device — easier to track and harder to forget on re-instatement.",
  },
  {
    question: "What’s a group lock box, and when do I need one?",
    answer:
      "A group lock box is a sealed box where the keys to a set of isolators get locked away. Each person working on the system clips their own personal padlock onto the box. Until every personal padlock is removed, the keys can’t come out and the system can’t be re-energised. Used on big jobs (switchroom upgrades, factory shutdowns) where one ‘master’ isolation has been done by an authorised person and many trades are then working on different bits of the dead system. Covered in more detail with permit-to-work systems in §5.4-equivalent material on multi-trade sites.",
  },
];

export default function Sub3() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 5
          </button>

          <PageHero
            eyebrow="Module 1 · Section 5 · Subsection 3"
            title="Lock-off, tag-out and prove–test–prove"
            description="The kit on your belt that turns the procedure into reality. Lockouts, padlocks, multi-hasps, tags, GS38 voltage indicators, proving units. What to carry, how to use each piece, and when to take a damaged item out of service."
            tone="emerald"
          />

          <TLDR
            points={[
              "GS38 is the standard for LV test kit. Two-pole voltage indicator (NOT a multimeter), ≤4 mm probe tip, finger guards, fused leads, multiple indication modes.",
              "Personal padlock, personal key. Multi-hasp for shared work. Group lock box for large multi-trade jobs.",
              "Prove – test – prove every time. Voltage indicator on proving unit before testing the circuit; on the proving unit again afterwards. Two seconds at each end.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "List the items in a competent isolation kit and the role of each (lockouts, padlocks, hasps, tags, voltage indicator, proving unit, GS38 leads).",
              "Explain why a GS38-compliant two-pole voltage indicator is required for proving dead and why a multimeter is not.",
              "Describe the GS38 features that make a probe and lead set safe (≤4 mm tip, finger guards, fused leads, multiple indication modes).",
              "Apply ‘personal control’ correctly using individual padlocks, multi-hasps and group lock boxes.",
              "Identify when a piece of isolation kit must be taken out of service (drop, damage, missing indication mode, expired calibration).",
              "Choose the right CAT rating (CAT III 600 V minimum for distribution work) and the right voltage range for the system you’re testing.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The kit on your belt</ContentEyebrow>

          <ConceptBlock
            title="Six items make up a competent isolation kit"
            plainEnglish="No competent person turns up to a job without these. Treat the kit like the harness on a roof — if any of it’s missing or damaged, you don’t do the work."
          >
            <p>What lives on your belt or in your tool bag for every isolation:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Lock-off devices</strong> — the bits that physically prevent the
                isolating device being switched on. Different shapes for MCBs, RCBOs, rotary
                isolators, plug-and-socket connections, fuse carriers.
              </li>
              <li>
                <strong>Personal padlocks</strong> — keyed-different (your key only opens YOUR
                lock). Bright colour helps anyone glancing at the board see ‘someone is working
                on this’. 4-6 in a kit is normal.
              </li>
              <li>
                <strong>Multi-hasp</strong> — a clamp that fits onto a single lock-off device
                and accepts up to 6 padlocks, so multiple workers can each apply their own lock
                to the same isolation.
              </li>
              <li>
                <strong>Tags / warning labels</strong> — pre-printed laminated tags with space
                for name, date, work description, contact number.
              </li>
              <li>
                <strong>Voltage indicator (GS38)</strong> — two-pole, fixed leads, multiple
                indication modes (LED + buzzer + vibration is typical), CAT III 600 V minimum.
              </li>
              <li>
                <strong>Proving unit</strong> — battery-powered known voltage source. AC and DC
                outputs, contact pads sized for the voltage indicator’s probes.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The voltage indicator</ContentEyebrow>

          <ConceptBlock
            title="Two-pole voltage indicator — purpose-built for safe isolation"
            plainEnglish="A device with one job: tell you whether two conductors have voltage between them. No rotary switch, no detachable leads, no chance of being on the wrong range."
            onSite="Check it before every job: visual inspection of leads (any cuts, splits or kinked insulation = bin it), shake it to listen for loose internals, prove on the proving unit."
          >
            <p>What makes a voltage indicator different from a multimeter:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Fixed leads</strong> — can’t be plugged into the wrong sockets. No
                ‘tester reads zero because leads are in the amps holes’ failure mode.
              </li>
              <li>
                <strong>No range switch</strong> — typically auto-ranges across LV bands (12 V,
                24 V, 50 V, 120 V, 230 V, 400 V, 690 V) with LEDs to show the band detected.
              </li>
              <li>
                <strong>Multiple indication modes</strong> — usually a row of LEDs (bright, easy
                to see in a CU shadow), a buzzer (audible in a noisy plant room), and often a
                vibration alert (haptic — felt through gloves). One failure mode doesn’t leave
                you blind.
              </li>
              <li>
                <strong>GS38 probes</strong> — finger barriers (the moulded ridge stops your
                finger sliding onto the conductor), ≤4 mm exposed tip (preferably 2 mm), often
                with retractable shrouds.
              </li>
              <li>
                <strong>Continuity test</strong> — many include a low-voltage continuity test
                you can use without batteries, useful for ringing out cables.
              </li>
            </ul>
            <p>
              Common UK brands: Martindale VI-13700 series, Fluke T100/T150, Megger TPT420.
              Whichever brand, look for GS38 marking and the IEC 61010 CAT rating you need
              (CAT III 600 V minimum for distribution work, CAT IV 600 V if you’re anywhere near
              the supply origin).
            </p>
          </ConceptBlock>

          <RegsCallout
            source="HSE GS38 — Electrical test equipment for use on low-voltage electrical systems"
            clause="Test probes should be designed and constructed in such a way as to minimise the risk of inadvertent contact with live conductors. They should incorporate finger barriers or be shaped to guard against inadvertent hand contact. The exposed metal tip should not exceed 4 mm and preferably should not exceed 2 mm. Test leads should be flexible and adequately insulated, ideally fitted with high-rupturing-capacity (HRC) fuses."
            meaning={
              <>
                The probe specification is the bit you can SEE every time you pick the kit up.
                If your VI’s probes have more than 4 mm of bare metal at the tip — or no finger
                barrier — they don’t meet GS38. Old-school multimeter probes with long bare tips
                and no guards are common in older toolboxes; bin them and buy GS38 sets.
              </>
            }
            cite="Reference: HSE GS38 (Edition 5) — sections on probes, leads and indicators"
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The proving unit</ContentEyebrow>

          <ConceptBlock
            title="Your portable known voltage source"
            onSite="Some electricians clip the proving unit to the same belt loop as the VI so they’re always together. Others keep it in the same pouch. Either way: if the VI is in your hand, the proving unit is within arm’s reach."
          >
            <p>
              A proving unit is a battery-powered device that generates a known voltage you can
              touch the VI’s probes against to confirm the VI is working. Two designs are common:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Switched output</strong> — press a button, the unit generates ~230 V AC
                (and often a DC test voltage and lower AC bands too) for a few seconds across
                two contact points.
              </li>
              <li>
                <strong>Always-on contact pad</strong> — touch both probes to the marked pads,
                voltage is generated automatically.
              </li>
            </ul>
            <p>
              Modern units typically generate three test voltages (e.g. 50 V, 230 V, 400 V) so
              you can confirm the indicator’s LEDs light up across the range, not just one band.
            </p>
            <p>
              <strong>When to take it out of service:</strong> any cracks in the case (battery
              voltage exposed, indicator may be unreliable), failure to generate the test
              voltage when the VI is known good, batteries that won’t hold charge, expired
              calibration sticker if your firm calibrates annually. Replacement is ~£40-80 — well
              under the cost of a single near-miss.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The lock-off devices</ContentEyebrow>

          <ConceptBlock
            title="One device for each kind of isolator you’ll meet"
            plainEnglish="The lock-off device clips, slides or wraps onto the isolating device and presents a hole that takes a padlock. With a padlock through the hole, the device physically can’t be operated."
            onSite="Carry a small bag of common types — universal MCB clips, wide-jaw RCBO clips, three-phase rotary lockouts, plug lockouts. A weird isolator without a matching lockout? Withdraw the fuse carrier or remove the supply at a parent device instead."
          >
            <p>The main types you’ll come across:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Universal MCB lockouts</strong> — colour-coded clips that fit over the
                toggle of a switched-off MCB and present a padlock hole. ‘Universal’ models cover
                most modern slim breakers; older or unusually-shaped breakers may need a
                manufacturer-specific lockout.
              </li>
              <li>
                <strong>Wide-jaw lockouts</strong> — for breakers with a wider toggle (some
                older Crabtree, Wylex Standard, MEM). Same idea, larger jaws.
              </li>
              <li>
                <strong>Switch-disconnector / rotary isolator lockouts</strong> — for the
                square-bodied isolator switches you’ll find on three-phase distribution and
                fixed-equipment supplies. Slide over the rotary handle in the off position and
                accept a padlock.
              </li>
              <li>
                <strong>Plug-and-socket lockouts</strong> — boxes that enclose a 13 A plug or a
                BS EN 60309 commando connector so it can’t be plugged back in. Useful where the
                only means of isolation is unplugging.
              </li>
              <li>
                <strong>Multi-hasps</strong> — the multi-padlock clamp that fits onto a
                lock-off’s padlock hole and accepts up to 6 personal padlocks, one per worker.
              </li>
            </ul>
            <p>
              Padlocks are <strong>keyed-different</strong> (your key, your lock, only one
              works). Bright colour (red, yellow) is the convention so anyone glancing at the
              CU sees ‘someone is working on this — leave it alone’. Combination locks are
              not used for personal isolation — anyone observing you set the combination can
              re-use it.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 537.2.5 (Securing of isolation)"
            clause="Provision shall be made for securing off-load isolating devices against unwanted or unintentional opening. This may be achieved, for example, by locating the device in a lockable space or lockable enclosure or by padlocking. Alternatively, the off-load device may be interlocked with a load-breaking one."
            meaning={
              <>
                BS 7671 expects the means of isolation to be securable in the off position — the
                regulation behind why we lock off, and behind why a flick-switch with no
                provision for a padlock isn’t a means of isolation. If a device can’t be
                secured, you have to use the next device upstream that CAN be secured.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 5 Chapter 53 Regulation 537.2.5."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Tags and notices</ContentEyebrow>

          <ConceptBlock
            title="Anyone walking past should know who locked it, when, and how to reach you"
            onSite="Sharpie + scrap of duct tape is not a tag. Pre-printed laminated tags cost pennies and survive a wet meter cupboard."
          >
            <p>A complete isolation tag has:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Your name</strong> — the person whose padlock is on this device.
              </li>
              <li>
                <strong>Date and time applied.</strong>
              </li>
              <li>
                <strong>Brief description of work</strong> (‘CU change’, ‘kitchen ring extension’).
              </li>
              <li>
                <strong>Contact phone number</strong> — so anyone needing to re-energise can call
                first instead of cutting your padlock off.
              </li>
              <li>
                Optional: company name, permit number (on permit-to-work jobs).
              </li>
            </ul>
            <p>
              Separately from the personal tag on the lock, a larger ‘DO NOT OPERATE — Electrician
              Working’ sign goes on the CU door (or as appropriate) so anyone who doesn’t open the
              door and read the small tag still gets the message.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Using the indicator-only mode and missing a failed LED"
            whatHappens={
              <>
                Your voltage indicator has LED + buzzer + vibration. The buzzer’s broken (you’ve
                been meaning to replace it for weeks). You prove on the proving unit, all the
                LEDs light up, but your hand’s on the case so you don’t notice the buzzer is
                silent. Test on the circuit — no LEDs light, you call it dead. Two days later the
                LEDs themselves fail in a way you don’t spot, and your ‘dead’ reading is actually
                ‘can’t indicate anything’.
              </>
            }
            doInstead={
              <>
                Multiple indication modes is GS38’s redundancy. If ANY of them stops working —
                an LED out, the buzzer silent, the haptic dead — the indicator is out of service
                until repaired or replaced. ‘It still works mostly’ is exactly the failure-mode
                trail that GS38 was written to break.
              </>
            }
          />

          <CommonMistake
            title="Believing a socket tester proves dead"
            whatHappens={
              <>
                You're working on a faulty socket. You plug in your three-LED socket tester (the
                little green / amber / red plug-in unit), all the LEDs are off, you assume the
                circuit is dead and start unscrewing the faceplate. The socket tester reads
                'no power' for all sorts of reasons that aren't 'circuit is isolated and dead' —
                a broken neutral elsewhere on the ring, the tester's own internal LEDs failing,
                or a partial isolation that drops voltage to one socket but leaves the line
                conductor live. You take a shock from the line terminal as you pull the
                faceplate off.
              </>
            }
            doInstead={
              <>
                A socket tester is a quick functional check, not a means of proving dead. It is
                NOT a GS38-compliant voltage indicator and HSE GS38 explicitly excludes it from
                the safe-isolation procedure. Prove dead with a proper two-pole voltage
                indicator on a proving unit, test L-E / L-N / N-E at the actual conductors with
                the faceplate already off, then re-prove on the proving unit. The plug-in tester
                tells you about polarity and continuity once power is back; it tells you nothing
                reliable about whether the conductors you're about to touch are dead.
              </>
            }
          />

          <Scenario
            title="The CU with no obvious means of isolation"
            situation={
              <>
                You arrive at a 1970s flat to swap a damaged 32 A ring final MCB. The CU has a
                main switch, but it’s a Wylex Standard with rewireable fuses — the ‘breakers’ on
                the ring final are actually pull-out fuse carriers. There’s no MCB lock-off that
                fits, the main switch isn’t lockable either, and the customer needs the freezer
                circuit (different fuseway) to stay live.
              </>
            }
            whatToDo={
              <>
                Withdraw the fuse carrier for the ring final and put it in your tool bag. Post a
                ‘DO NOT OPERATE — fuse withdrawn for work in progress’ sign on the empty fuseway
                AND on the CU door. Brief the customer. The circuit physically cannot be
                re-energised without you putting the fuse carrier back in. HSG85 explicitly
                recognises this as a valid method where lockable devices aren’t fitted. Keep the
                carrier on YOU, not on top of the CU — that’s the equivalent of ‘key in the
                lock’.
              </>
            }
            whyItMatters={
              <>
                Older installs frequently lack lockable isolating devices. The procedure adapts:
                physical removal of the fuse / carrier achieves the same outcome (circuit cannot
                be re-energised by anyone without you). Skipping isolation because ‘there’s
                nothing to lock’ is the wrong answer.
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

          <ContentEyebrow>When kit goes out of service</ContentEyebrow>

          <ConceptBlock
            title="Bin it before it bins you"
            plainEnglish="Test kit is a consumable. The cost of replacing an indicator or proving unit is nothing compared with the cost of a false ‘dead’ reading."
          >
            <p>Triggers for taking an item out of service immediately:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
              <li>
                Any visible damage to leads, probes, finger guards or the case (cracks, splits,
                exposed conductors, melted insulation).
              </li>
              <li>
                Any indication mode not working (LED, buzzer, vibration). One failure = out.
              </li>
              <li>
                Failure to register on the proving unit at any voltage band.
              </li>
              <li>
                Drop or impact (especially proving units — battery electrolyte can leak into the
                voltage-generation circuitry).
              </li>
              <li>
                Calibration sticker expired (where the firm or the manufacturer specifies an
                interval — usually annually).
              </li>
              <li>
                Padlock that won’t close cleanly, lockout that won’t grip the device firmly,
                multi-hasp with a damaged hinge.
              </li>
            </ul>
            <p>
              Don’t leave failed kit in the toolbox where you might absent-mindedly grab it next
              week. Bin it, or quarantine it in a clearly-marked ‘NOT FOR USE’ pouch until it
              gets repaired/replaced.
            </p>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Six items make a competent isolation kit: lockouts, padlocks, multi-hasp, tags, voltage indicator, proving unit.",
              "Voltage indicators (not multimeters) for proving dead — fixed leads, no range switch, multiple indication modes, GS38 probes.",
              "GS38 probe geometry: ≤4 mm tip (2 mm preferred), finger barriers, fused leads, ideally HRC fuses.",
              "Personal padlock + personal key + your pocket. Multi-hasp for shared work — one personal lock per person.",
              "Where lock-off can’t be applied (older installs, fuse carriers), withdraw the carrier and keep it with you. HSG85 recognises this as valid.",
              "Test kit is consumable. Drop, damage, missing indication mode, failed prove = out of service immediately. Cheap to replace, expensive to misuse.",
            ]}
          />

          <Quiz title="Lock-off, tag-out and prove–test–prove knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module1/section5/5-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                The safe isolation procedure
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module1/section5/5-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Isolation in different scenarios
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
