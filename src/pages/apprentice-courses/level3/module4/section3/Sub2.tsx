/**
 * Module 4 · Section 3 · Subsection 2 — Common symptoms of electrical faults
 * Maps to C&G 2365-03 / Unit 303 / LO3 / AC 3.2
 *   AC 3.2 — "describe typical types of faults and their likely locations in wiring systems and equipment"
 *
 * Layered depth: 2357 Unit 608 ELTK07 / AC 3.3 — identify and describe common
 * symptoms of electrical faults.
 *
 * Frame: the customer-language symptoms (flicker, trip, dim, intermittent,
 * smell of burning, warm, no power) translated into engineering categories
 * and likely fault hypotheses. The interview discipline that turns a vague
 * complaint into a focused investigation.
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
  'Common symptoms of electrical faults (3.2) | Level 3 Module 4.3.2 | Elec-Mate';
const DESCRIPTION =
  'Customer-language symptoms — flicker, trip, smell of burning, warm to touch, intermittent — translated into engineering categories and likely fault hypotheses. The interview discipline that turns vague complaints into focused investigations.';

const checks = [
  {
    id: 'mod4-s3-sub2-flicker',
    question:
      "Customer reports 'lights flicker every time the fridge cycles on'. What's the engineering interpretation and the most likely fault?",
    options: [
      "The fridge motor's start-up inrush (6–10× running current) causes a brief voltage drop along a shared supply path. If that path has higher-than-design impedance — an HRJ at the tails or undersized cable — the drop is enough to dim the lights momentarily.",
      "The fridge is generating electrical noise that interferes with the lighting circuit through electromagnetic coupling — the compressor's switching pulses radiate onto the adjacent lighting cable. The fix is a mains filter on the fridge. EMI from a domestic fridge does not modulate filament or LED brightness; visible flicker on load cycling is a voltage-drop symptom on a shared supply path, not electromagnetic coupling.",
      "The lights and the fridge are on the same final circuit, so the fridge's running current reduces the current available to the lights. The fix is to move the lights to a separate circuit. Lighting and a fridge socket are not on a shared final circuit in a compliant install, and steady running current does not dim lights; the flicker is caused by the brief inrush voltage drop on the common supply.",
      "The flicker means the lighting circuit's RCD is on the edge of tripping each time the fridge starts, because the inrush adds earth leakage. The fix is a less sensitive RCD. Motor inrush is load current, not earth-leakage current, so it does not push an RCD toward its residual trip threshold; the flicker is a voltage-drop effect, and fitting a less sensitive RCD would be unsafe.",
    ],
    correctIndex: 0,
    explanation:
      "Flicker on a known load cycling is one of the diagnostic gold-standards — it tells you the fault is on the supply side of the lighting circuit (otherwise the load on a separate circuit wouldn't affect the lighting). The voltage drop magnitude scales with impedance times inrush current; an HRJ at the supply tails is the classic cause on older installations, undersized cable on newer ones. Diagnosis: clamp meter on the incoming tail during the fridge cycle reveals the drop magnitude; thermal imaging finds the HRJ.",
  },
  {
    id: 'mod4-s3-sub2-burning',
    question:
      "Customer reports 'smell of burning plastic, can't find the source'. What's the L3 response?",
    options: [
      "Reassure the customer it's probably a new appliance burning off manufacturing residue and ask them to ventilate the room — most burning smells clear in a day or two. Burning-plastic odour from an electrical source signals charring at a heating joint, not a benign burn-off; advising the customer to wait and ventilate leaves a live fire risk in place.",
      "Tell the customer to switch off any recently-fitted LED downlights, since LED drivers commonly emit a faint smell when running hot, then leave and book a return visit for next week. A driver running merely warm does not smell of burning plastic; deferring an unlocated burning smell for a week ignores an active fire-risk window and breaches the duty to make safe.",
      "Use your nose to follow the smell to the strongest point, open only that one accessory, and if nothing is visibly damaged there, conclude the smell is coming from outside the property. Scent-tracking alone is unreliable and stopping at one accessory misses HRJs elsewhere on the circuit; an unlocated electrical burning smell must be treated as a Danger-Present hazard and investigated systematically.",
      "Treat as an immediate Code 1 hazard. A burning-plastic smell almost always means an HRJ already heating to char-point; isolate at the main switch and investigate the affected area systematically before leaving site.",
    ],
    correctIndex: 3,
    explanation:
      "Burning plastic smell is the alarm bell of HRJ progression. By the time the smell is noticeable, charring is happening — the fire-risk window is open. Steps: narrow the location (which floor, which area, when it started); isolate at the main switch if the source is unlocated; open every consumer unit, junction box and accessory in the affected area for visual inspection; use a thermal camera on enclosures during operation only with informed consent. HSE/fire investigators repeatedly find customers reported burning smells for days or weeks before the actual fire. Treating it as urgent is the L3 expectation.",
  },
  {
    id: 'mod4-s3-sub2-interview',
    question:
      "What's the structured interview an L3 apprentice should run with a customer reporting an unspecified electrical problem?",
    options: [
      "Skip the questions and go straight to testing — measurements are objective and the customer's account is unreliable, so the fastest route is a full Schedule of Test Results on every circuit. Blanket-testing every circuit without first narrowing the hypothesis wastes hours; the interview is what focuses the investigation, and the customer holds facts (timing, triggers, recent changes) no test can recover.",
      "Two questions are enough: 'What's wrong?' and 'How much do you want to spend?' — the rest you work out with the meter. A two-question intake misses the when/where/what-changed detail that pins down intermittent faults; the structured interview is six questions precisely because vague complaints need systematic extraction.",
      "Ask the customer to write a full technical description of the fault including suspected circuit and probable cause before you arrive, so you can pre-order parts. Customers rarely describe faults in accurate engineering terms, and pre-diagnosing from a layperson's written guess leads to wrong parts and wrong hypotheses; the on-site structured interview is the reliable method.",
      "Six questions in order: WHAT exactly happens, WHEN, WHERE in the property, HOW LONG it's been happening, WHAT they've tried, and WHAT CHANGED recently. The answers narrow the fault hypothesis from infinity to a small set.",
    ],
    correctIndex: 3,
    explanation:
      "The structured customer interview is the single most under-used L3 fault-diagnosis tool. The six questions — what, when (time/day/season/weather/activity), where, how long (and trending), what tried, what changed — extract the diagnostic detail that lives in the customer's head. Most apprentices skip it; the senior who built the habit saves an hour per call-out by spending five minutes on it, instead of chasing the wrong fault hypothesis.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "Customer reports 'breaker keeps tripping when I plug in the kettle'. What's the differential diagnosis?",
    options: [
      "It's certainly an overloaded circuit — a 3 kW kettle alone exceeds a 13 A socket rating, so the breaker is doing its job and the only fix is a dedicated kettle circuit. A 3 kW kettle draws about 13 A, within a ring final's capacity; tripping on one specific kettle/socket points to a fault, not a simple overload, so jumping to 'add a circuit' skips the differential diagnosis.",
      "Three hypotheses to test in order: the kettle itself (swap kettle / swap circuit), the socket (IR test with the kettle disconnected), or genuine overload (clamp the existing circuit load before plugging in). The high inrush of a 3 kW kettle exposes any HRJ on the socket.",
      "It's a worn breaker — RCBOs weaken with age and trip below their rated current, so the fix is simply to swap the device for a new one of the same rating without further testing. Replacing the device without identifying why it trips ignores a likely real fault (leaky kettle element or HRJ at the socket); a tripping breaker is a symptom to diagnose, not just a part to replace.",
      "It's a polarity fault — the kettle reverses live and neutral when switched on, which the RCD detects as a residual current. Reversed polarity is a fixed wiring condition, not something a kettle switch creates, and it does not by itself cause RCD tripping; the realistic causes are an earth-leaking element, a socket fault or genuine overload.",
    ],
    correctAnswer: 1,
    explanation:
      "Differential diagnosis — listing the possibilities and testing each — is the L3 method. Three hypotheses cover most cases (load fault, socket fault, circuit fault); the customer's other answers narrow which is most likely. Kettle inrush is high (9–13 A peak for a 3 kW kettle) and exposes any HRJ on the socket / cable run.",
  },
  {
    id: 2,
    question: "Customer reports 'the upstairs lights are dim, the downstairs lights are normal'. Engineering interpretation?",
    options: [
      "The upstairs bulbs are simply older or a lower wattage than the downstairs ones — replace them with matching new lamps and the difference disappears. Mismatched lamps cause a constant difference in brightness, but a 'dim circuit' reported as a fault is an electrical symptom (voltage drop), not a lamp-choice issue; swapping bulbs would not fix an HRJ or high-resistance neutral.",
      "The upstairs lighting is on a separate phase of a three-phase supply that is running at a lower voltage. Domestic dwellings are single-phase, and even on three-phase the lines sit at the same nominal voltage; localised dimming on one circuit points to added impedance on that circuit, not a phase difference.",
      "Voltage drop on the upstairs lighting circuit, or a problem at its tap-off — typically an HRJ at a junction box, a loose RCBO terminal, or a high-resistance neutral upstream of the upstairs lights. Measure voltage at an upstairs lampholder under load and trace upstream.",
      "The dimmer switch serving the upstairs lights has failed to its minimum setting; replacing the dimmer restores full brightness. This only applies if those lights are actually on a dimmer and all of them dim together by chance; a whole-circuit dim with no dimmer involved is a supply-side voltage-drop fault to be traced upstream.",
    ],
    correctAnswer: 2,
    explanation:
      "Localised dim lighting is voltage drop on the affected circuit. The L3 differential narrows quickly: if downstairs is fine, the issue is upstream of the upstairs tap-off but downstream of the supply common point. A few targeted voltage measurements pinpoint the HRJ location.",
  },
  {
    id: 3,
    question: "Customer reports 'fire alarm panel showing 'EARTH FAULT' on the LCD'. What does this mean and what's the L3 action?",
    options: [
      "An EARTH FAULT on the panel means the mains earth to the panel has been lost, so the panel is running on battery only and must be left to discharge until an engineer attends. Loss of mains earth shows as a separate supply/PSU fault; the panel's EARTH FAULT indication specifically flags a conductor-to-earth leak on the monitored detection or sounder wiring, and leaving it to discharge is wrong.",
      "An EARTH FAULT indication is a routine status message that clears itself once the panel completes its daily self-test — no action is needed beyond noting it in the log. An earth fault is a genuine wiring fault that does not self-clear; it must be investigated and rectified, and recorded under the fire log and RR(FS)O 2005.",
      "An EARTH FAULT means a detector head has been removed for cleaning and the panel has lost the device on that address; refitting the head clears it. A missing device registers as a device/fault-on-address condition, not an earth fault; an earth fault is a low-resistance path from a system conductor to earth, typically water ingress or a damaged cable.",
      "Fire alarm panels under BS 5839-1 monitor for a connection (typically high-resistance) between a system conductor and earth — water ingress at a detector/sounder, damaged cable or a contaminated terminal. It compromises reliable operation and may mask other faults, so it must be documented, investigated and rectified.",
    ],
    correctAnswer: 3,
    explanation:
      "Fire alarm earth faults are a regulated category — BS 5839-1 + RR(FS)O 2005 require documented investigation and rectification within defined timescales. The action sequence: record on the fire log book, isolate the affected zone at the panel, IR test each loop/circuit on that zone, find and rectify, retest and restore, then inform the responsible person. The L3 apprentice does the investigation under supervision (a specialist fire-alarm engineer typically leads); the apprentice's role is correct fault identification + documentation.",
  },
  {
    id: 4,
    question: "Customer reports 'the socket in the bathroom feels warm, even when nothing's plugged in'. What does this tell you?",
    options: [
      "The socket has an active heat source — current is flowing through it even with nothing plugged in. The usual cause is an HRJ at a terminal carrying transit current for the rest of the ring. Isolate, prove dead, IR test the socket, and replace it or trace upstream if the socket itself reads sound.",
      "It's residual heat from the bathroom — warm air, towel rails and the immersion cupboard raise the ambient temperature, so the socket only feels warm to the touch. Ambient warmth heats the whole wall evenly; a single socket noticeably warmer than its surroundings with no load is a sign of internal current and heating, which must be investigated.",
      "Nothing to worry about — all sockets run slightly warm because the spring contacts that grip a plug generate friction heat continuously. With no plug inserted there is no contact friction and no current, so a warm socket is abnormal and points to an internal HRJ or leakage path carrying transit current on the ring.",
      "It means the socket's built-in RCD has tripped and is dissipating heat as it holds the circuit open. Standard sockets don't contain an RCD, and a tripped device would not heat up; a socket warm with no load indicates current flowing through an internal fault, not a protective device holding open.",
    ],
    correctAnswer: 0,
    explanation:
      "A socket warm to touch with no load plugged in means current is flowing inside the socket. On a ring final, the socket carries transit current for downstream loads — an HRJ at one terminal heats up under that transit load. Bathroom moisture can accelerate the problem but isn't usually the root cause; the HRJ is.",
  },
  {
    id: 5,
    question: "Customer reports 'every Tuesday morning around 7am the broadband router restarts'. How do you investigate?",
    options: [
      "Tell the customer it's almost certainly their broadband provider's scheduled maintenance window and to raise it with their ISP — electrical faults don't follow a weekly clock. A genuinely weekly, time-locked electrical event points to something on the installation switching on at that time; dismissing it as an ISP issue without investigating misses a real marginal-supply fault.",
      "Time-correlated faults are caused by something that switches on at that time. Check the household schedule (heating/immersion timer, washing cycle) and any external supply event, then log it with a power-quality analyser. The router restart is a symptom of a brief voltage dip from whatever switches on then.",
      "Replace the router's plug-top power supply — a restart on a fixed schedule is a failing PSU that browns out as it warms up. A failing PSU would restart on its own internal pattern, not reliably at the same time and day each week; the weekly timing strongly implicates an external switching event, which testing should confirm before replacing the router's PSU.",
      "It's a thermal effect — the loft warms up on Tuesday mornings when the sun comes round, expanding the cable and breaking an HRJ. Solar warming is gradual and not locked to a specific weekday; a precise weekly time signature points to a scheduled load switching on, best captured with a power-quality logger over the week.",
    ],
    correctAnswer: 1,
    explanation:
      "Time-correlated faults are the easiest intermittents to diagnose because the time is the clue. The 'router restarts' symptom is consumer-grade (modern routers reboot on transient under-voltage); the cause is something else operating at the same time. The PQ analyser captures the moment; correlation with household schedule identifies the source.",
  },
  {
    id: 6,
    question: "Customer reports 'half the house has no power, the other half is fine'. What does this tell you about the fault location?",
    options: [
      "Half the circuits being dead means an open neutral in the final circuit wiring of those rooms — find the broken neutral in the affected accessories and re-terminate it. A single broken final-circuit neutral kills one circuit, not a whole half of the board; loss of a block of circuits points to a shared upstream device or busbar section, which is where to trace.",
      "It indicates reversed polarity across half the installation, which has disabled those circuits' protective devices. Reversed polarity does not switch circuits off and is not what 'half the house is dead' means; the symptom maps to a failed upstream split point such as one RCD, its busbar, or a sub-main.",
      "The fault is at a point that splits the supply — typically a consumer unit busbar section, one RCD/RCBO, or a sub-main feeding the dead portion. Map the boundary between dead and live circuits and trace upstream; the fault sits where dead becomes live.",
      "It means the prospective fault current has exceeded the board's rating and tripped the main switch on half the busbar. Boards don't selectively de-energise half the busbar on a fault-current basis; a dead block of circuits is a localised supply-split failure (RCD, busbar section or sub-main), traced from the boundary between dead and live.",
    ],
    correctAnswer: 2,
    explanation:
      "Localised power loss reveals the fault location by the boundary it creates. The boundary tells you which protective device or distribution point has failed. Standard L3 method: map the dead zone, trace upstream, find the point where supply is restored, the fault is at that boundary point.",
  },
  {
    id: 7,
    question: "Customer reports 'when I turn on the shower, the lights upstairs flicker briefly then settle'. What's the engineering interpretation?",
    options: [
      "The shower and the lights share a neutral that has been borrowed between circuits, so switching the shower forces current down the lighting neutral and the lamps glow brighter, not dimmer. A borrowed neutral is a real and serious fault, but it typically makes lights brighten or behave erratically rather than dim-then-settle on inrush; the described symptom is a classic inrush voltage-drop pattern.",
      "The shower's RCD is sharing a busbar with the lighting RCD and the inrush briefly pulls the lighting RCD toward its trip point, dimming the lamps. Inrush is load current, not residual current, so it does not drive an RCD toward tripping; the dimming is a voltage-drop effect on a shared supply path.",
      "The shower element is partially failed and arcing on start-up, injecting harmonics that distort the lighting supply for a moment. An arcing element would more likely trip the RCD or blow the circuit, and would not produce a clean dim-then-settle; the symptom matches normal-to-marginal inrush voltage drop, assessed against the Appendix 4 limits.",
      "Inrush from the shower heater (35–50 A for an 8.5 kW shower) causes a brief voltage drop on the shared supply path, dimming the lighting branch until the heater reaches steady state. Whether it matters depends on the size of the drop.",
    ],
    correctAnswer: 3,
    explanation:
      "Brief flicker on high-load inrush is sometimes normal (small voltage drop) and sometimes a symptom (large voltage drop). If the drop is significant (&gt;5% of nominal) it suggests high impedance — a shared neutral, undersized supply tail or HRJ at the CU; if small (&lt;2%) it's normal. Diagnose with a clamp meter on the supply tail during shower start plus a voltage measurement at the upstairs lighting, compared against BS 7671 Appendix 4 limits (3% lighting, 5% other).",
  },
  {
    id: 8,
    question: "Customer reports 'the RCD trips when it rains heavily but not when it's dry'. What's the most likely fault?",
    options: [
      "Water ingress at an outdoor accessory. Rain creates a leakage path between live and earth; once total leakage exceeds 30 mA the RCD trips. With the customer's permission, simulate rain with a garden hose on each outdoor accessory in turn — the one that triggers the trip is the leak point.",
      "Lightning during the storm is inducing surges that trip the RCD; the fix is to fit a surge protection device at the consumer unit. SPDs clamp transient over-voltages, not residual current, and would not stop weather-driven nuisance tripping; the rain correlation points to moisture creating an earth-leakage path at an outdoor accessory.",
      "Rain cools the consumer unit and the temperature drop shifts the RCD's trip threshold below its rated 30 mA, so it nuisance-trips. RCD trip thresholds are not meaningfully shifted by mild ambient cooling, and the CU is indoors; the real mechanism is water bridging live and earth at an outdoor fitting, raising leakage past 30 mA.",
      "Heavy rain raises the damp in the masonry around the meter tails, increasing the earth resistance until the RCD detects the imbalance and trips. Damp masonry around tails does not create the residual imbalance an RCD responds to; the fault is a moisture-driven leakage path inside an outdoor accessory, located by simulating rain on each one.",
    ],
    correctAnswer: 0,
    explanation:
      "Weather-correlated faults are caused by environmental conditions affecting the installation. Rain triggers earth-leakage on damaged outdoor accessories. The investigation pattern is — when does it happen, what's different at that time, simulate the condition to reproduce and locate. A garden hose simulation is a legitimate L3 diagnostic technique on outdoor accessories.",
  },
];

const faqs = [
  {
    question: "How do I tell when a customer's symptom description is unreliable?",
    answer:
      "When the timeline is vague ('it's been a while'), the description is technical-sounding but inconsistent ('the polarity reversed itself'), or there's a clear emotional bias ('the previous electrician put it in wrong'). Treat all customer descriptions as starting hypotheses, not facts. Verify with measurement. Customers describe symptoms accurately about 70% of the time; the other 30% they misremember, exaggerate, or mis-attribute. The structured interview pulls out the verifiable facts — when, what, how often — that you can test against.",
  },
  {
    question: "Should I trust customer descriptions of intermittent faults?",
    answer:
      "Yes, for the timing pattern. Customers are usually correct about WHEN something happened ('every morning', 'after the storm', 'when I run the washing machine') even if they're wrong about what happened. Time-pattern is gold for diagnosing intermittents — it gives you the trigger to investigate. Use a power quality analyser (Sub 2.3) to capture the actual electrical conditions at the reported time; correlate with the customer's schedule.",
  },
  {
    question: "What should I do if the customer can't reproduce the fault while I'm there?",
    answer:
      "Document the customer's description on the job sheet, run a baseline test of the affected circuits (continuity, IR, EFLI), look for evidence of past faults (scorched terminals, signs of arcing, replaced fuses), recommend either a return visit when the symptom recurs OR installation of a power-quality analyser to log conditions over a week. Don't pretend to find a fault that isn't there; don't dismiss the customer's report. Most intermittent faults need data over time to characterise.",
  },
  {
    question: "How do I deal with customers who describe symptoms in panic / dramatic terms?",
    answer:
      "Calm, structured interview. 'Tell me exactly what happened — start from the beginning'. Let them tell the full story without interruption first. Then go back through with structured questions — what exactly, when, how often. Acknowledge their concern without dismissing or amplifying. The factual content is usually within the dramatic narrative; you extract it through patient listening + targeted follow-up.",
  },
  {
    question: "What's the most common 'symptom' that turns out to NOT be an electrical fault?",
    answer:
      "'The lights flicker' — about half the time it's actually an LED driver / lamp incompatibility (cheap LED bulb in a dimmable fitting, dimmer not rated for LEDs, mismatched bulbs in the same fitting) rather than a wiring fault. Standard diagnostic: substitute known-good lamps; if flicker stops, it's the original lamp / driver. Other common false alarms: 'the breaker keeps tripping' (sometimes user has an overloaded extension lead pattern, not a circuit fault); 'the socket isn't working' (sometimes a tripped GFCI on a different floor that the customer doesn't know about).",
  },
  {
    question: "How do I document my customer interview for the job sheet?",
    answer:
      "Standard fault-diagnosis job sheet template includes a 'Symptoms' section: customer's words (in quotes), timeline, conditions, what they've tried. A 'Diagnosis' section: tests run, findings, identified fault category and location. A 'Rectification' section: action taken. A 'Verification' section: post-repair tests. The interview goes in 'Symptoms'; the test results in 'Diagnosis'. The structured format protects the customer (clear record of what was reported and done) and the firm (defensible record if disputed).",
  },
];

export default function Sub2() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button onClick={() => navigate('/study-centre/apprentice/level3-module4-section3')} className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start">
            <ArrowLeft className="h-4 w-4" /> Section 3
          </button>

          <PageHero
            eyebrow="Module 4 · Section 3 · Subsection 2"
            title="Common symptoms of electrical faults"
            description="Customer-language symptoms — flicker, trip, smell of burning, warm to touch, intermittent — translated into engineering categories and likely fault hypotheses. The structured customer interview that turns a vague complaint into a focused investigation."
            tone="emerald"
          />

          <TLDR
            points={[
              "Customer symptoms are starting hypotheses, not facts. Structured interview (what / when / where / how long / what tried / what changed) extracts the verifiable details.",
              "Time-correlated faults are easiest to diagnose — the trigger time identifies the cause. Power quality analyser captures the electrical conditions at the reported moment.",
              "Burning plastic smell is always urgent — HRJ progressing to char point, fire-risk window open. Treat as Code 1.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Translate customer-language symptoms (flicker, trip, dim, warm, smell, intermittent) into engineering fault hypotheses.",
              "Conduct a structured customer interview using the six-question framework — what, when, where, how long, what tried, what changed.",
              "Recognise time-correlated, weather-correlated and load-correlated fault patterns and use the correlation to identify the cause.",
              "Treat 'smell of burning plastic' as a Code 1 immediate-hazard report and respond accordingly.",
              "Distinguish symptoms that are likely electrical faults from symptoms that are usually false alarms (LED flicker from cheap lamps, etc.).",
              "Document customer interviews in the standard fault-diagnosis job sheet format.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The structured customer interview</ContentEyebrow>

          <ConceptBlock
            title="Six questions that turn vague complaints into focused investigations"
            plainEnglish="The customer holds the diagnostic information in their head. The interview extracts it. Most apprentices skip this step and waste time chasing the wrong fault hypothesis. The senior who built the habit saves an hour per call-out."
          >
            <p>The six questions in order:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>WHAT exactly happens?</strong> In customer's own words. Don\'t paraphrase or interpret yet.</li>
              <li><strong>WHEN does it happen?</strong> Time of day, day of week, season, weather, after specific activity.</li>
              <li><strong>WHERE in the property?</strong> Single room, multiple rooms, only when specific accessories used.</li>
              <li><strong>HOW LONG has it been happening?</strong> First noticed when, getting worse / better / same.</li>
              <li><strong>WHAT have you tried?</strong> Reset breakers, unplug appliances, switched off / on, called a previous electrician.</li>
              <li><strong>WHAT CHANGED recently?</strong> New appliance, building work, leak, anything in the last weeks / months.</li>
            </ul>
          </ConceptBlock>

          <VideoCard
            url={videos.faultFinding.url}
            title={videos.faultFinding.title}
            channel={videos.faultFinding.channel}
            duration={videos.faultFinding.duration}
            topic="Fault finding and how to describe a fault · Unit 303 AC 3.2"
            caption={<>Craig Wiltshire walks through how to describe a fault for an NVQ assessment — the same structured language that turns a customer's vague symptom into an engineering hypothesis. Watch how the symptom (flicker, trip, smell) is named, then the hypothesis is stated, then the test is chosen.</>}
          />

          <RegsCallout
            source="IET Guidance Note 3 (Inspection and Testing) — fault diagnosis principles (paraphrased framework)"
            clause={<>Paraphrased framework summary: diagnosis of faults takes a systematic approach — start from the reported symptoms, work through inspection of the system, instrument verification, and only then formulate an action plan. Premature action without diagnosis risks harm to operative, customer and equipment.</>}
            meaning={<>The systematic approach starts with the symptom — the customer interview. Without the symptom information, the investigation has no anchor and is likely to chase the wrong hypothesis. The interview is the first step in the procedure, not an optional preamble.</>}
            cite="Source: IET Guidance Note 3 (Inspection and Testing) — fault diagnosis framework, paraphrased."
          />

          <InlineCheck {...checks[2]} />

          <SectionRule />

          <ContentEyebrow>The common symptom catalogue</ContentEyebrow>

          <ConceptBlock
            title="Customer language vs engineering interpretation"
            onSite="Each common symptom maps to a small set of engineering hypotheses. The customer\'s other answers (when, where, what changed) narrow which hypothesis is most likely."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>\'Lights flicker when X starts'</strong> — voltage drop on supply path during X's inrush; HRJ on supply tails or undersized supply cable.</li>
              <li><strong>\'Smell of burning plastic'</strong> — HRJ at char point; fire-risk; immediate isolation + investigation.</li>
              <li><strong>'Socket warm to touch (no load)'</strong> — HRJ at socket terminal carrying transit current on a ring; isolate, IR test, replace if poor.</li>
              <li><strong>'Half the house has no power'</strong> — fault at boundary; trace upstream from boundary to find protective device / distribution point.</li>
              <li><strong>'Breaker trips when I plug in X'</strong> — load fault, socket fault, or circuit fault; differential diagnosis on each.</li>
              <li><strong>'RCD trips when it rains'</strong> — water ingress at outdoor accessory; simulate with hose to localise.</li>
              <li><strong>'Lights dim only upstairs'</strong> — voltage drop on upstairs circuit; HRJ on tap-off or sub-main.</li>
              <li><strong>'Fault every Tuesday at 7am'</strong> — time-correlated; identify what runs at that time; PQ analyser captures the moment.</li>
              <li><strong>'Lights flicker constantly'</strong> — usually LED driver / lamp incompatibility; substitute known-good lamps first.</li>
              <li><strong>'Tingles when I touch the tap'</strong> — open PEN or compromised main bonding; STOP, check N–E voltage at cut-out; possible DNO call.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[0]} />

          <SectionRule />

          <ContentEyebrow>Time-, weather- and load-correlated faults</ContentEyebrow>

          <ConceptBlock
            title="Correlation reveals causation"
            plainEnglish="Intermittent faults that correlate with time, weather or load have a trigger that's visible in the correlation. Use the correlation to find the trigger; the trigger leads to the cause."
          >
            <p>Three correlation patterns and their typical causes:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Time-correlated</strong> — domestic schedules (heating timer, immersion timer, washing cycle), neighbour activity (street lighting switch-on, industrial start-up), weather (overnight cooling causing condensation).</li>
              <li><strong>Weather-correlated</strong> — water ingress (rain → outdoor leakage), temperature (hot day → cable derating, cold day → contraction at terminations), wind (cable swing on overhead supplies, structural movement at terminations).</li>
              <li><strong>Load-correlated</strong> — specific appliance use (kettle, shower, oven, EV charger), total household load (overloaded ring, marginal supply), inrush current (motors, fluorescent ballasts, transformers starting).</li>
            </ul>
            <p>
              Investigation method: install a power quality analyser (Sub 2.3) for a week, capture voltage / current / harmonic data continuously, correlate the captured electrical events with the customer's schedule and weather conditions. The correlation reveals the trigger; targeted investigation finds the cause.
            </p>
          </ConceptBlock>

          <InlineCheck {...checks[1]} />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 651.4"
            clause={
              <>
                "Details of any damage, deterioration, defects or dangerous conditions shall be recorded in a report."
              </>
            }
            meaning={
              <>
                Symptoms aren&apos;t just data for your diagnosis &mdash; they&apos;re reportable. Anything that points to damage, deterioration, defect or dangerous condition has to land on a report. The customer interview produces evidence, the report records it; both are part of the audit trail when something goes wrong later.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Reg 651.4."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 642.1"
            clause={
              <>
                "Inspection shall precede testing and shall normally be done with that part of the installation under inspection disconnected from the supply."
              </>
            }
            meaning={
              <>
                The structured symptom hunt sits inside the inspection step &mdash; visual evidence (scorch marks, discoloured terminals, soft cable insulation, water staining) before any meter goes on. The Regulation makes the order explicit: look first, test second. Most missed faults are the visible ones an apprentice rushed past.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Reg 642.1."
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Skipping the customer interview"
            whatHappens={<>Apprentice arrives at a \'lights flickering' job, immediately starts testing the lighting circuits. Spends 90 minutes investigating, finds no fault on the lighting circuits. Customer mentions in passing 'oh, it only flickers when the heat pump turns on\'. Apprentice realises they\'ve been investigating the wrong circuit — the issue is on the supply tail to the heat pump, dropping voltage on every cycle. 90 minutes wasted; customer charged for time; customer dissatisfied.</>}
            doInstead={<>Always run the structured interview before opening any enclosure. Five minutes of interview saves thirty minutes of misdirected testing. The customer\'s \'oh by the way' details are usually the clue that points to the actual fault.</>}
          />

          <CommonMistake
            title="Treating burning plastic smell as a non-urgent investigation"
            whatHappens={<>Customer reports a faint burning smell in the meter cupboard. Apprentice books a return visit for next week (other jobs in the diary). Three days later the customer reports a fire in the meter cupboard — the HRJ that was creating the smell ignited the surrounding plastic. Property damage, displaced family, insurance dispute. The HSE / fire service investigation finds the firm had been notified of the smell and didn't act urgently.</>}
            doInstead={<>Burning plastic smell is always immediate. Reschedule lower-priority jobs if needed; isolate at the main switch on arrival to remove the heat source; investigate, find, rectify before leaving site. The \'we\'ll come back' approach is wrong for any fire-risk symptom.</>}
          />

          <Scenario
            title="Diagnosing 'the lights have been weird for months'"
            situation={<>Customer is vague — 'the lights have been a bit weird for months, sometimes they flicker, sometimes they\'re dim, my husband says it\'s nothing but I\'m worried\'. They don\'t know which lights, when, or what triggers it.</>}
            whatToDo={<>Run the structured interview methodically. (1) WHAT — \'tell me about the most recent time you noticed it; what exactly happened?' (Customer recalls: dimming in the kitchen yesterday evening). (2) WHEN — 'what time, what was happening?' (7pm, kettle was boiling). (3) WHERE — 'just the kitchen, or other rooms?' (Mostly kitchen, sometimes hallway). (4) HOW LONG — 'when did you first notice?' (Six months ago, after they had the kitchen extension built). (5) WHAT TRIED — 'have you tried anything?' (Replaced the bulbs, didn't help). (6) WHAT CHANGED — \'kitchen extension built' answers it. Investigation focuses on the kitchen extension\'s wiring — likely an HRJ at the junction where the new wiring meets the existing circuit, exposed under high-current loads (kettle inrush). Thermal imaging at the kitchen junction box during a controlled kettle test confirms the hotspot. Open box, find loose terminal, re-terminate, retest, fault corrected.</>}
            whyItMatters={<>The customer\'s vague initial description hid a clear engineering picture — recent building work introduced a high-resistance termination, exposed under load. Without the structured interview the apprentice would have wasted hours chasing \'lights are dim\'. With the interview, the building-work clue points directly to the fault location. This is the L3 step-up — using the interview as the primary diagnostic tool, not an optional preamble.</>}
          />

          <SectionRule />

          <ContentEyebrow>Symptom: lights flicker</ContentEyebrow>

          <ConceptBlock
            title="Flicker — five candidate causes, prioritised by likelihood"
            plainEnglish="Customer reports lights flicker. Five candidate hypotheses to test: (1) loose neutral somewhere on the circuit (HRJ); (2) supply-side voltage instability; (3) LED driver / dimmer incompatibility; (4) heavy intermittent load on the same circuit (immersion thermostat cycling); (5) Open PEN starting to develop on TN-C-S."
            onSite="Diagnostic order: Megger MFT1741+ Zs at lampholder (compares to design); Fluke 117 voltage at lampholder during flicker event (transient dip suggests source); Fluke 369 leakage clamp on circuit (intermittent leakage suggests insulation); thermal camera on suspect terminations; PQ analyser deployment if unable to reproduce."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Loose neutral / HRJ</strong> — Zs above expected; voltage drops on load. Likely cause if recent building work, vibration, age.</li>
              <li><strong>Supply instability</strong> — multiple properties affected; PQ analyser shows correlated dips. DNO call.</li>
              <li><strong>LED driver / dimmer</strong> — only on dimmable circuits; flicker pattern matches dimmer setting. Replace with compatible driver / dimmer pair (Click Mode dimmer + Aurora Enlite drivers, or LightwaveRF leading-edge dimmer + retrofit-rated lamps).</li>
              <li><strong>Intermittent load</strong> — flicker correlates with appliance cycling (boiler, immersion, freezer). Calculate voltage drop on circuit; oversized cable or split circuit.</li>
              <li><strong>Open PEN developing</strong> — N-E voltage at cut-out elevated. STOP, DNO.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Symptom: smell of burning</ContentEyebrow>

          <ConceptBlock
            title="Burning smell — STOP, isolate, investigate by elimination"
            plainEnglish="A burning smell is a STOP-WORK condition. The customer should be advised to switch the property off at the main switch immediately and stay clear until the fault is located. Burning suggests overheating somewhere — typically a HRJ at a terminal, an overloaded conductor, or a failed component generating heat without yet causing fault current."
            onSite="Investigation: full installation isolation, then thermal camera scan (Fluke Ti401 / FLIR E54) of every accessory in the affected area looking for hot spots that have cooled. Visual inspection for char marks, melted plastic, discolouration. The pattern of damage often points to the fault — burnt back-box = terminal HRJ; melted MCB = chronic overload; charred SWA gland = water ingress and arcing."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Customer brief</strong> — switch off at main, stay clear, ventilate, no candles or open flames (carbon monoxide risk if it's a fuel-burning appliance fault).</li>
              <li><strong>Visual inspection</strong> — discolouration on plastic accessories, char marks at terminations, melted insulation visible at any cable end.</li>
              <li><strong>Thermal camera</strong> — even after isolation, thermal mass holds heat for 10-20 minutes. Scan immediately on arrival.</li>
              <li><strong>Smell isolation</strong> — bakelite / phenolic resin smell = old plastic accessories overheating; PVC smell = modern accessory melting; ozone = arcing; metal-burn smell = busbar damage.</li>
              <li><strong>Common locations</strong> — high-current connections (CU incomer, immersion, shower, kitchen radial), points where flexes plug into accessories (multi-way adaptors, extension leads), inside lamp fittings (especially old halogen downlights).</li>
              <li><strong>Document and report</strong> — fault may have caused damage requiring replacement of multiple accessories. Issue Dangerous Situation Report to customer; recommend full electrical condition review.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Symptom: RCD trip on power-up</ContentEyebrow>

          <ConceptBlock
            title="RCD trips immediately when reset — six candidate causes"
            plainEnglish="The RCD won't stay reset. Either it's catching a real fault, or the RCD itself is faulty, or there's cumulative leakage above the trip threshold from healthy loads."
            onSite="Diagnostic sequence: (1) disconnect ALL loads from the affected circuit; reset RCD; if holds, the fault is in a load. (2) Plug loads back one at a time; the load that trips the RCD is the fault. (3) If the RCD trips with no loads connected, the fault is in the fixed wiring — IR test with the Megger MFT1741+ between L-E, N-E and L-N at 500 V."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Earth fault on fixed wiring</strong> — IR L-E reads low. Locate by halving and retest.</li>
              <li><strong>Earth fault on appliance</strong> — IR drops when appliance plugged in. Replace appliance or PAT-test.</li>
              <li><strong>Cumulative leakage</strong> — many electronics on one circuit, each leaking 1-2 mA, total exceeds 30 mA. Split circuit or upgrade to 100 mA RCD with downstream 30 mA RCBOs.</li>
              <li><strong>Faulty RCD</strong> — Megger MFT1741+ AutoRCD test shows trip outside spec (e.g. trip at 8 mA on a 30 mA device).</li>
              <li><strong>Wrong-type RCD on DC-injecting load</strong> — Type AC RCD on a circuit feeding LED drivers / VSDs / EV charger. DC component blinds the RCD or causes nuisance trips. Upgrade to Type A or Type B as appropriate.</li>
              <li><strong>Borrowed neutral</strong> — circuit shares neutral with another circuit. RCD sees imbalance. BS 7671 314.4 violation. Trace and rectify.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Symptom: warm to touch</ContentEyebrow>

          <ConceptBlock
            title="Warm or hot accessory — early-warning HRJ signal"
            plainEnglish="A socket, switch, accessory or breaker that's warm to touch (&gt;40 °C is noticeable, &gt;60 °C is dangerous) is generating heat — typically from a high-resistance termination or chronic overload. Catch it before it becomes a fire."
            onSite="Diagnosis: thermal camera (Fluke Ti401, FLIR E54) on the affected accessory under load. Compare to identical adjacent accessories — single hot accessory in a row of cold ones is the fault. Then isolate, open the accessory, inspect terminals — typically loose screw, work-hardened conductor, copper-on-aluminium corrosion (rare but seen on older installations)."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Thermal scan under load</strong> — energise circuit at expected load (kettle on a kitchen socket, drill on a workshop socket). Image under load; compare to ambient.</li>
              <li><strong>Touch comparison</strong> — bare hand back-of-fingers comparison between suspect and adjacent accessories. Significant temperature difference = fault.</li>
              <li><strong>Voltage drop</strong> — Fluke 117 voltage measurement at the suspect accessory under load vs at the supply end. Drop above 2-3% = significant resistance somewhere in between.</li>
              <li><strong>Visual on opening</strong> — discolouration on terminal screws, brown stains on conductor insulation near terminals, blackened terminal block, cracked accessory body.</li>
              <li><strong>Common causes</strong> — terminal screw not torqued to spec (typical 0.8-2.0 Nm for accessories), conductor partially insulated under terminal screw, multi-strand conductor with strands escaping the terminal, repeated plug-in cycles loosening socket contacts.</li>
              <li><strong>Repair</strong> — cut back to clean conductor, re-strip, re-terminate to manufacturer's torque (Wera 7440 1/4" torque screwdriver, Knipex Twistor Plus). Retest with thermal camera under load to confirm.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Symptom: intermittent — the hardest fault to diagnose</ContentEyebrow>

          <ConceptBlock
            title="Intermittent faults — when the fault isn't there when you arrive"
            plainEnglish="The customer reports a fault that you can't reproduce. Common intermittent faults: thermal expansion opening a HRJ when warm; humidity bridging an L-E gap; load cycling triggering an RCD only at certain loads; PQ events from supply or neighbouring property."
            onSite="Investigation: PQ analyser deployment (Fluke 1730 / 1760, Hioki PW3198) for 24-72 hours captures the event. Customer interview to identify timing patterns (every morning at 6 AM = correlate with timers; only during rain = water ingress; only on hot days = thermal expansion). Targeted load testing under suspect conditions (heat the circuit with a hairdryer, soak the suspect accessory with a wet cloth — under controlled isolation)."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Customer log</strong> — ask customer to log every event (time, what was on, weather, anything unusual). Pattern often reveals the cause.</li>
              <li><strong>PQ analyser deployment</strong> — Fluke 1730 logs voltage, current, harmonics, dips, swells continuously. Catches the event in real time with timestamp.</li>
              <li><strong>Thermal cycling</strong> — heat suspect terminations with hot air gun (Steinel HG2120E on low setting), retest immediately. HRJ that's stable cold may open when heated.</li>
              <li><strong>Humidity testing</strong> — apply controlled moisture (damp cloth at suspect accessory under isolation), retest IR. Shows water-ingress faults.</li>
              <li><strong>Load testing</strong> — apply expected loads in sequence to reproduce conditions. Use a Megger Loadbox or similar to simulate large fixed loads.</li>
              <li><strong>Time of day</strong> — correlate with neighbouring property activity (factory startup, large equipment cycling, EV charging). Intermittent supply-quality issues common in shared-feeder situations.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Structured customer interview (what / when / where / how long / what tried / what changed) is the L3 fault-diagnosis primary tool. 5 minutes saves 30 minutes of misdirected testing.",
              "Customer symptoms are starting hypotheses, not facts. Verify with measurement; treat customer descriptions as approximately 70% accurate.",
              "Time-correlated faults are easiest to diagnose — the trigger time identifies the cause. PQ analyser captures the conditions at the reported moment.",
              "Burning plastic smell is always urgent — HRJ at char point, fire-risk window open. Treat as Code 1; isolate immediately; investigate same visit.",
              "Common false-alarm symptoms: 'lights flicker' often = LED lamp/dimmer incompatibility; 'breaker trips' often = overloaded extension; 'socket dead' sometimes = upstream tripped GFCI.",
              "Weather-correlated faults indicate environmental triggers — rain → outdoor leakage, temperature → cable / termination effects, wind → mechanical movement at supply.",
              "Load-correlated faults reveal the load that exposes the fault — kettle inrush exposes HRJ on the supply, motor start exposes loose terminal in the breaker.",
              "Document interviews in the standard job sheet 'Symptoms' section — customer's words in quotes, timeline, conditions, what they've tried.",
            ]}
          />

          <Quiz title="Common symptoms — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button onClick={() => navigate('/study-centre/apprentice/level3-module4-section3-1')} className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white"><ChevronLeft className="h-3 w-3" /> Previous</div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">3.1 Types and causes</div>
            </button>
            <button onClick={() => navigate('/study-centre/apprentice/level3-module4-section3-3')} className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">Next subsection <ChevronRight className="h-3 w-3" /></div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">3.3 Fault locations</div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
