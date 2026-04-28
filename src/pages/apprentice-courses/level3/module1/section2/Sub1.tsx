/**
 * Module 1 · Section 2 · Subsection 1 — Accident response and electric shock (supervisor-grade)
 * Maps to City & Guilds 2365-03 / Unit 201 / LO2 / AC 2.1
 *   AC 2.1 — "state the procedures that should be followed in the case of accidents
 *            which involve injury, including requirements for the treatment of electric
 *            shock/electrical burns"
 *
 * Layered depth (supplementary):
 *   - 2357 Unit 601 ELTK01 / AC 2.1 — same procedure framing, applied at L3
 *
 * L2 covered the casualty response. L3 adds incident scene management,
 * witness handling, evidence preservation and what you say to HSE.
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
  'Accident response & electric shock — supervisor-grade (2.1) | Level 3 Module 1.2.1 | Elec-Mate';
const DESCRIPTION =
  'L3 refresher on accident response — supervisor-grade scene management, casualty handling, electric shock & burn treatment, witness handling and evidence preservation for the inevitable HSE follow-up.';

const checks = [
  {
    id: 'l3-m1-s2-sub1-isolation-first',
    question:
      "An L2 mate is in contact with a live conductor. They've slumped and aren't moving. What's the L3-grade FIRST action?",
    options: [
      "Grab them and pull them off.",
      "ISOLATE the supply at the nearest accessible point — the local switch, the breaker, the supplier's main fuse if necessary. Do NOT touch the casualty until isolation is confirmed. If isolation isn't immediately achievable, use a non-conductive item (dry wood, plastic chair) to break the contact, but isolation is always the first preference. Once free of the source, casualty assessment (DR ABC) and 999.",
      "Call 999 first.",
      "Take a photo for the report.",
    ],
    correctIndex: 1,
    explanation:
      "Remember from L2 — isolation is always the first action. The L3 depth: knowing where the nearest isolation point is for every job is part of the dynamic risk assessment on arrival. If the isolation point is too far away, decide on the spot whether non-conductive separation (dry broom handle, plastic chair) is faster — but isolation remains the gold standard.",
  },
  {
    id: 'l3-m1-s2-sub1-scene',
    question:
      "After an electrical incident the casualty is being treated and ambulance is on the way. What's the L3-grade scene management priority?",
    options: [
      "Tidy up the work area.",
      "PRESERVE the scene. Don't move anything (tools, equipment, locks, voltage indicators), don't tidy, don't restore power. Photograph the scene and the work in progress. Identify witnesses and ask them to write down what they saw. Notify the firm's responsible person immediately. The HSE will likely attend (a specified injury triggers immediate notification under RIDDOR Reg 4); the scene as it was is the prosecution evidence in either direction.",
      "Restart the work to keep schedule.",
      "Throw away anything broken to make space.",
    ],
    correctIndex: 1,
    explanation:
      "L2 framing was 'help the casualty'. L3 framing is 'help the casualty AND preserve what the regulator and the firm need to investigate'. Scene preservation is the single most-impactful supervisor act in the first 30 minutes after an incident. Tidying up before the inspector arrives is one of the worst things you can do.",
  },
  {
    id: 'l3-m1-s2-sub1-medical',
    question:
      "A casualty has had a brief 230V shock through the hand to ground. They feel 'fine' and want to carry on working. What's the L3-grade response?",
    options: [
      "Let them carry on if they say they're OK.",
      "Stop. Even a brief mains shock requires medical assessment because (a) cardiac arrhythmia can develop hours after the event; (b) deep burns can be present with little surface marking; (c) muscle damage may not be felt immediately; (d) psychological shock may impair judgement. Refuse the 'I'm fine' pressure, isolate them from work, get them to A&E for ECG and burn assessment. Document everything. The casualty's preference is not the operative decision-maker.",
      "Give them tea and biscuits.",
      "Send them home unsupervised.",
    ],
    correctIndex: 1,
    explanation:
      "Mains-voltage shock is a medical event regardless of how the casualty feels. Cardiac arrhythmia (particularly atrial fibrillation) can develop several hours after a shock and presents with no immediate warning. The 'I'm fine, let me crack on' is the most-prosecuted post-shock failure — supervisor lets them carry on, casualty collapses later, firm and supervisor both face HASAWA s.7 / s.2 charges.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "What's the immediate response to discovering someone in contact with live electricity?",
    options: [
      "Grab and pull.",
      "ISOLATE the supply first. If immediate isolation isn't possible, use a non-conductive item (dry wood, plastic) to break contact. Do NOT touch the casualty until they're separated from the source. Then DR ABC casualty assessment and 999.",
      "Call the supervisor first.",
      "Take a photo.",
    ],
    correctAnswer: 1,
    explanation:
      "Isolation first — every time. Touching a casualty in contact with live conductors makes you the second casualty.",
  },
  {
    id: 2,
    question: "After an electric shock, what's the appropriate medical response even if the casualty feels OK?",
    options: [
      "Give them a cup of tea.",
      "Mandatory medical assessment. ECG to check for cardiac arrhythmia (which can develop hours after the event). Examination for entry / exit burns (often deep with little surface marking). Assessment for muscle damage and rhabdomyolysis. Even a brief 230V shock warrants A&E.",
      "Send them home alone.",
      "Get them to drink water and continue work.",
    ],
    correctAnswer: 1,
    explanation:
      "L2 baseline — every mains shock = medical assessment. L3 depth — refuse the casualty's 'I'm fine' if they push back. Their preference is not the operative decision-maker.",
  },
  {
    id: 3,
    question: "What's the difference between an electrical burn and a thermal burn for first aid purposes?",
    options: [
      "There's no difference.",
      "Electrical burns are usually small at the surface but deep at the tissue level — current passing through tissue heats it from the inside out. Thermal burns are usually obvious at the surface. Electrical burns may have separate entry and exit wounds. Both need cooling (10-20 min cool running water for thermal; less aggressive for electrical because of underlying tissue damage), covering with a clean non-adherent dressing, and medical assessment.",
      "Electrical burns are less serious.",
      "Thermal burns are less serious.",
    ],
    correctAnswer: 1,
    explanation:
      "Electrical burns are deceptive — small surface mark, large internal damage. Always assume worse than it looks. Casualties commonly underestimate their own burn because the surface mark is small.",
  },
  {
    id: 4,
    question: "Under RIDDOR, when must a specified injury (e.g. fracture from a fall) be reported?",
    options: [
      "Within a year.",
      "Without delay — telephone notification expected before the F2508 follows. F2508 within 10 days. The 'specified injury' list (Schedule 1) includes fractures (excl fingers/thumbs/toes), amputations, sight loss, crush injuries, serious burns, scalpings, head-injury unconsciousness, enclosed-space injuries.",
      "Within 30 days.",
      "Only if the casualty wants to.",
    ],
    correctAnswer: 1,
    explanation:
      "Remember from L2 — RIDDOR is the reporting regulation. L3 depth: knowing the timescales by category and being able to escalate to the responsible person on the day of the incident.",
  },
  {
    id: 5,
    question: "What does 'preserve the scene' mean after a serious incident?",
    options: [
      "Tidy up.",
      "Don't move tools, equipment, locks, voltage indicators or anything else. Don't restore power. Don't continue work. Photograph the scene from multiple angles. Identify witnesses and ask them to record their observations. Notify the firm's responsible person. The scene as it was is the evidence.",
      "Restart work to keep schedule.",
      "Throw away the broken kit.",
    ],
    correctAnswer: 1,
    explanation:
      "Scene preservation is the supervisor act that determines whether the firm has evidence for its defence (or the HSE has evidence for its prosecution). Tidying is one of the worst things you can do.",
  },
  {
    id: 6,
    question: "What's DR ABC in casualty assessment?",
    options: [
      "An alphabet drill.",
      "Danger (check the scene is safe to approach), Response (is the casualty conscious and responding?), Airway (open the airway with head-tilt-chin-lift), Breathing (look, listen, feel for normal breathing for up to 10 seconds), Circulation (look for signs of normal life — colour, movement, response). If breathing absent or abnormal: 999, CPR, defibrillator.",
      "A type of cable code.",
      "A wiring colour mnemonic.",
    ],
    correctAnswer: 1,
    explanation:
      "DR ABC is the standard first-aid casualty assessment. L3 expectation is fluency in the sequence and the ability to apply it without freezing.",
  },
  {
    id: 7,
    question: "Why is witness identification a supervisor-grade priority after an incident?",
    options: [
      "It's not.",
      "Witnesses fade fast — by the next day they've reconstructed events differently, by the next week they've forgotten details, by the next month their memory has merged with what they later read or heard. Asking each witness to write down what they saw, in their own words, on the day of the incident, captures evidence at its strongest. The HSE / insurer / firm's defence team will all want this evidence later.",
      "Only the police can interview witnesses.",
      "Witnesses don't matter.",
    ],
    correctAnswer: 1,
    explanation:
      "Contemporaneous witness statements are gold. Three months later they're worth far less. The L3 supervisor's act of saying 'please write down what you saw, today, in your own words' is one of the highest-value 30-second tasks in incident response.",
  },
  {
    id: 8,
    question: "What's the relationship between the casualty's wishes and the supervisor's decisions after a shock?",
    options: [
      "The casualty decides.",
      "The casualty has autonomy on their own treatment but the supervisor has duties to the firm, the regulator and the wider workplace. Refusing medical assessment is the casualty's right but doesn't discharge the supervisor's HASAWA s.2 / s.7 duty. Supervisor should: strongly recommend assessment, document the conversation, escalate to a more senior manager, decline to release the casualty back to safety-critical work without clearance.",
      "The supervisor decides everything.",
      "The customer decides.",
    ],
    correctAnswer: 1,
    explanation:
      "The L3 nuance: respect autonomy AND discharge the duty. A clear written record of the recommendation, the casualty's response and the escalation route is the defensible evidence trail.",
  },
];

const faqs = [
  {
    question: "Should I use the firm's first aid kit on a non-employee (customer)?",
    answer:
      "First aid kits exist for first aid; they don't discriminate. HSE guidance is to provide first aid as needed regardless of whether the casualty is an employee, customer or member of the public — your HASAWA s.3 duty extends to non-employees. Document use, replace consumed items, log the incident.",
  },
  {
    question: "Do I have to be a qualified First Aider to render first aid?",
    answer:
      "No — anyone can render first aid in good faith. The Social Action, Responsibility and Heroism Act 2015 protects 'good Samaritan' acts. The First Aid at Work qualification is required for designated workplace first aiders under the Health and Safety (First Aid) Regs 1981. The L3 expectation is at minimum Emergency First Aid at Work (EFAW) — many firms now require First Aid at Work (FAW) for L3 supervisors.",
  },
  {
    question: "What records should be made after any first-aid incident?",
    answer:
      "An accident book entry (statutory under SSCBA 1992 + Data Protection Act). Date, time, casualty name, witness names, what happened, what was done. Plus the firm's internal incident form, any photos, any witness statements. RIDDOR considerations escalate from there.",
  },
  {
    question: "If the casualty refuses to go to hospital, what should I do?",
    answer:
      "Strongly recommend in writing (a text or email is fine), document the recommendation and the refusal, escalate to the firm's senior manager, decline to release them back to safety-critical work that day without medical clearance. The casualty's autonomy is respected but your duty isn't waived.",
  },
  {
    question: "What's CPR's role in electric shock cases?",
    answer:
      "Critical. Electric shock can cause ventricular fibrillation (the heart twitches without pumping). CPR maintains some perfusion until defibrillation can be delivered. AED (Automated External Defibrillator) units are increasingly available on construction sites and in commercial premises — knowing where the nearest AED is should be part of your dynamic site assessment.",
  },
  {
    question: "When the HSE arrives the day after an incident, what do I say?",
    answer:
      "Cooperate, identify yourself, provide factual answers about what you saw and did. Don't speculate, don't volunteer opinions about cause, don't admit wider firm-wide practices on the spot. Phone the firm's contracts manager and H&S manager immediately. The firm's solicitor or H&S manager handles the formal interview. ERA 1996 s.44 and HASAWA s.7 both require honesty; nothing requires you to over-volunteer.",
  },
];

export default function Sub1() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module1-section2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 2
          </button>

          <PageHero
            eyebrow="Module 1 · Section 2 · Subsection 1"
            title="Accident response and electric shock — supervisor-grade"
            description="Remember from L2 — DR ABC, isolation first, 999, casualty care. At L3 the response expands to scene preservation, witness handling and the evidence trail the regulator will ask for next week."
            tone="emerald"
          />

          <TLDR
            points={[
              "Isolation first — always. Don't touch the casualty until they're separated from the live source. Then DR ABC, 999, casualty care.",
              "Mandatory medical assessment after any mains shock — even if the casualty 'feels fine'. Cardiac arrhythmia can develop hours later. The casualty's preference doesn't waive the supervisor's duty.",
              "Preserve the scene. Don't tidy, don't restore power, don't continue work. Photograph, identify witnesses and ask them to write down what they saw on the day. The scene as it was IS the evidence.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "State the procedure for response to electrical accidents — isolation, DR ABC casualty assessment, 999, casualty care.",
              "Identify the appropriate first aid for electric shock and electrical burns — including the difference from thermal burns.",
              "Apply scene preservation principles after a serious incident — photographs, witness statements, no tidying, no restoration.",
              "Identify when an incident requires immediate RIDDOR notification (death / specified injury) versus 10-day F2508 reporting.",
              "Describe the supervisor-grade response to a casualty who wishes to return to work after a shock — strong recommendation, documentation, escalation, refusal to release.",
              "State the operative-level response when an HSE inspector arrives the day after an incident — cooperate, factual, don't speculate, escalate to firm.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The L2 baseline — quick recap</ContentEyebrow>

          <ConceptBlock
            title="DR ABC, isolation, 999 — the L2 reflexes"
            plainEnglish="Remember from L2 — the immediate sequence: isolate the source, DR ABC casualty assessment, 999, casualty care. These reflexes are still the right reflexes at L3. The supervisor depth comes after the immediate response."
            onSite="The L2 sequence handles the first 5 minutes. The L3 supervisor work starts at minute 6 — scene preservation, witness handling, escalation, regulator preparation."
          >
            <p>The L2-baseline immediate sequence:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li><strong>ISOLATE</strong> the supply. Local switch, breaker, main fuse — whatever is fastest and effective.</li>
              <li><strong>SEPARATE</strong> casualty from the source if they&apos;re still in contact. Non-conductive material only (dry wood, plastic).</li>
              <li><strong>DR ABC</strong> — Danger, Response, Airway, Breathing, Circulation.</li>
              <li><strong>999</strong> if breathing abnormal, unconscious, or any specified-injury indicator.</li>
              <li><strong>CPR</strong> if breathing absent or abnormal. AED if available.</li>
              <li><strong>Casualty care</strong> — burns cooled, casualty kept warm, monitored until ambulance arrives.</li>
            </ol>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Electric shock and burn first aid — depth</ContentEyebrow>

          <ConceptBlock
            title="Why every mains shock = mandatory medical assessment"
            plainEnglish="Electric shock damages tissue from the inside out. The surface burn (entry / exit) may be small. The internal damage — muscle, nerve, cardiac — may be significant. Cardiac arrhythmia (particularly ventricular fibrillation immediately after, or atrial fibrillation hours later) is the headline lethal risk."
            onSite="The L3 reflex: any mains-voltage shock = A&E for ECG and burn assessment. The casualty's 'I'm fine, let me crack on' is the most-prosecuted post-shock supervisor failure. Decline to release them to work that day; document the conversation; escalate to a senior manager if the casualty pushes back."
          >
            <p>What A&E will actually do:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>12-lead ECG to assess for arrhythmia.</li>
              <li>Examination for entry / exit wounds and tracking burns.</li>
              <li>Blood tests for muscle breakdown markers (CK, troponin).</li>
              <li>Cardiac monitoring for several hours post-shock if any concerning indicators.</li>
              <li>Discharge advice — what to watch for over the next 24-48 hours.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Electrical burns — small at the surface, deep at the tissue"
            plainEnglish="Current passing through tissue heats it from the inside. The skin burn at the entry / exit point may be small (pinhead size); the muscle and nerve damage along the current path may be significant. Treat all electrical burns as more serious than they look."
            onSite="First aid for electrical burns: irrigate with cool (not cold) running water for 10 minutes; cover with a clean non-adherent dressing; avoid creams or ointments; don't burst blisters; medical assessment mandatory. If clothing is stuck, leave it — don't pull."
          >
            <p>Burn classification reminder:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Superficial (1st degree)</strong> — red, painful, no blistering. Heals 3-7 days.</li>
              <li><strong>Partial thickness (2nd degree)</strong> — blistered, intensely painful. Heals 2-3 weeks; scarring possible.</li>
              <li><strong>Full thickness (3rd degree)</strong> — white / charred, often painless (nerves destroyed). Skin grafting often required.</li>
              <li><strong>Electrical</strong> — surface mark may be deceptive; internal injury can be severe.</li>
              <li>RIDDOR Schedule 1 specified injury includes &quot;serious burns covering more than 10% of the body, or causing significant damage to eyes, respiratory system or other vital organs&quot;.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Health and Safety (First Aid) Regulations 1981 — Reg 3(1)"
            clause={
              <>
                &quot;An employer shall provide, or ensure that there are provided, such
                equipment and facilities as are adequate and appropriate in the circumstances
                for enabling first-aid to be rendered to his employees if they are injured or
                become ill at work.&quot;
              </>
            }
            meaning={
              <>
                The first-aid duty. Employer must provide adequate kit and (where appropriate)
                trained first aiders. The HSE&apos;s &quot;First Aid at Work — Approved Code
                of Practice&quot; (L74) sets out how to assess what&apos;s adequate. Most
                construction and industrial sites require trained First Aiders (FAW
                qualification, 3-day course); domestic and small commercial sites may be
                Emergency First Aid at Work (EFAW, 1-day) at minimum. At L3 you should
                hold at least EFAW; many firms now require FAW for L3 and above.
              </>
            }
            cite="Source: Health and Safety (First Aid) Regulations 1981 (SI 1981/917), Reg 3 — verbatim from legislation.gov.uk."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Scene preservation and evidence</ContentEyebrow>

          <ConceptBlock
            title="The 30 minutes after the incident is when evidence is created or destroyed"
            plainEnglish="Once the casualty is being cared for, the supervisor's job is scene preservation. Don't move tools, equipment, locks, voltage indicators. Don't tidy. Don't restore power. Don't continue work. Photograph the scene from multiple angles. The scene as it was is the evidence the HSE, the firm's defence team and the insurer all need."
            onSite="The single biggest L3 supervisor failure post-incident is 'tidying up before the inspector arrives'. It looks helpful; it's catastrophic. Tools moved, locks removed, voltage indicators put back in the toolbox — the evidence chain is gone. The HSE infers (correctly) that the firm has something to hide."
          >
            <p>Evidence preservation checklist for the first 30 minutes:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Photographs from multiple angles — wide shot, mid-shot, close-up of the work area, the equipment, the locks, the voltage indicator readings, any visible damage.</li>
              <li>Position of all tools, instruments and PPE — leave them where they are.</li>
              <li>Position of all isolation devices — locks, MCBs, voltage indicators left as found.</li>
              <li>Ambient conditions noted — lighting, weather, presence of other personnel, time of day.</li>
              <li>Witnesses identified by name and contact, asked to write down what they saw on the day in their own words.</li>
              <li>Notify the firm&apos;s responsible person (H&amp;S manager, contracts manager, director) immediately by phone.</li>
              <li>Notify any principal contractor and any client representative on site.</li>
              <li>Do NOT speculate to anyone (witnesses, bystanders, customer) about cause or fault.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <RegsCallout
            source="Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 — Reg 4 / Schedule 2"
            clause={
              <>
                &quot;Where any person dies as a result of a work-related accident, the
                responsible person must follow the reporting procedure. ... Where any person
                at work suffers any of the injuries or conditions specified in Schedule 1 as a
                result of a work-related accident, the responsible person must follow the
                reporting procedure.&quot; Schedule 1 specified injuries include any injury
                arising from working in an enclosed space which leads to hypothermia or
                heat-induced illness, and any injury requiring resuscitation. Reg 6: any
                accident causing more than 7 consecutive days&apos; incapacitation must be
                reported to HSE within 15 days.
              </>
            }
            meaning={
              <>
                After an electric shock incident, the supervisor&apos;s reporting duty under
                RIDDOR is independent of the casualty&apos;s preference. Death =
                immediate notification. Specified injury (resuscitation, unconsciousness, more
                than 24h hospitalisation) = within 10 days via the F2508 online form. Over-7-day
                incapacitation = within 15 days. Dangerous occurrence (e.g. unintended energy
                release with potential to cause serious harm even if no-one was hurt) is
                reportable in its own right under Schedule 2. Late reporting itself is an
                offence.
              </>
            }
            cite="Source: Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 (SI 2013/1471), Reg 4, Reg 6 — verbatim from legislation.gov.uk."
          />

          <SectionRule />

          <ContentEyebrow>The casualty's wishes vs the supervisor\'s duty</ContentEyebrow>

          <ConceptBlock
            title="Respect autonomy AND discharge the duty"
            plainEnglish="Casualties commonly say \'I\'m fine, let me crack on\'. The L3 nuance: respect their autonomy on their own treatment, BUT don\'t waive your HASAWA s.2/s.7 duty to the firm and the workplace. Strong recommendation, documentation, escalation, and refusal to release them to safety-critical work without medical clearance is the supervisor\'s defensible position."
            onSite="The casualty\'s preference doesn\'t reshape the law. If you let them carry on and they collapse in the afternoon, the HSE will look at your decision to permit continued work — not at the casualty\'s request. Document the recommendation, the response and the escalation chain in writing."
          >
            <p>Defensible supervisor sequence when casualty wants to continue:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>Strongly recommend medical assessment — cite the cardiac arrhythmia risk.</li>
              <li>Document the recommendation in writing — text, email, job-pack note. Time-stamped.</li>
              <li>Escalate to senior manager if casualty refuses — &quot;I have a casualty refusing assessment, please advise&quot;.</li>
              <li>Decline to release the casualty to safety-critical work that day. They can sit in the van with a brew; they can&apos;t isolate live circuits.</li>
              <li>Update the firm&apos;s incident log with the full sequence, including the casualty&apos;s refusal.</li>
              <li>Follow up the next day — is the casualty OK? Have they sought assessment since?</li>
            </ol>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>CPR and AED — the chain of survival</ContentEyebrow>

          <ConceptBlock
            title="Why early defibrillation is the single biggest factor"
            plainEnglish="Cardiac arrest from electric shock is normally caused by ventricular fibrillation — the heart&apos;s electrical activity becomes chaotic and the muscle stops pumping. CPR maintains some perfusion. Defibrillation (a controlled electric shock from an AED) is what restores normal rhythm. Each minute without defibrillation reduces survival probability by around 10%. Early CPR + early AED is the single biggest factor in survival."
            onSite="On-site Automated External Defibrillators are increasingly common — at construction sites, in commercial buildings, in many GP surgeries and community spaces. Knowing where the nearest AED is should be part of your dynamic site assessment. The AED talks the rescuer through the procedure; no specialist training is required to operate one (though training improves confidence and effectiveness)."
          >
            <p>The chain of survival, in order:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Early recognition and call for help</strong> — DR ABC, 999. Tell the
                operator &quot;cardiac arrest, possible electric shock&quot; — they may dispatch
                a community responder with an AED.
              </li>
              <li>
                <strong>Early CPR</strong> — chest compressions at 100-120/min, depth 5-6cm,
                allow full chest recoil. Rescue breaths if trained and willing; compressions-only
                if not.
              </li>
              <li>
                <strong>Early defibrillation</strong> — AED applied as soon as available.
                Follow the device&apos;s voice prompts.
              </li>
              <li>
                <strong>Post-resuscitation care</strong> — handover to ambulance crew with
                accurate timeline of events.
              </li>
              <li>
                <strong>Post-incident review</strong> — supports the AED, the responders, the
                rest of the team and the firm&apos;s future preparation.
              </li>
            </ol>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Recovery position and casualty handover</ContentEyebrow>

          <ConceptBlock
            title="When the casualty is breathing but unresponsive"
            plainEnglish="A breathing but unresponsive casualty needs to be in the recovery position — on their side, head tilted back to maintain airway, top arm and leg supporting the body. This protects the airway from blockage by tongue or vomit. Don&apos;t move a casualty with suspected spinal injury unless you have to (e.g. to maintain airway or remove from immediate danger)."
            onSite="The handover to ambulance crew is itself a defined task — it&apos;s where critical information transfers from the first-aider to the paramedic. The structured handover (often taught as ATMIST or SBAR) makes the handover quick and accurate. The L3 reflex is to have this information ready when the ambulance arrives."
          >
            <p>What to hand over to the ambulance crew (ATMIST format):</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>A — Age</strong> of casualty (estimate if unknown).
              </li>
              <li>
                <strong>T — Time</strong> of incident.
              </li>
              <li>
                <strong>M — Mechanism</strong> of injury — &quot;230V shock from line conductor
                to ground via right hand&quot;.
              </li>
              <li>
                <strong>I — Injuries</strong> seen or suspected — entry / exit burns, possible
                cardiac involvement.
              </li>
              <li>
                <strong>S — Signs</strong> — pulse, breathing rate, conscious level (AVPU
                scale), skin colour and temperature.
              </li>
              <li>
                <strong>T — Treatment</strong> given — CPR, AED shock, burn cooling, recovery
                position.
              </li>
              <li>
                Plus: any known medical history (if available), any medications, any allergies.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Health and Safety (First Aid) Regulations 1981 — Reg 3(2)"
            clause={
              <>
                &quot;An employer shall provide, or ensure that there is provided, such number
                of suitable persons as is adequate and appropriate in the circumstances for
                rendering first-aid to his employees if they are injured or become ill at
                work.&quot;
              </>
            }
            meaning={
              <>
                The first-aider duty. The HSE&apos;s &quot;needs assessment&quot; approach (set
                out in L74 ACoP) determines what counts as adequate. Construction and industrial
                sites typically need at least one trained First Aider per shift / site;
                higher-risk sites need more. At L3 you should hold at least Emergency First Aid
                at Work (EFAW); many firms now require First Aid at Work (FAW) for L3 and above
                because the role frequently includes site responsibility.
              </>
            }
            cite="Source: Health and Safety (First Aid) Regulations 1981 (SI 1981/917), Reg 3 — verbatim from legislation.gov.uk."
          />

          <SectionRule />

          <ContentEyebrow>Post-incident — psychological wellbeing</ContentEyebrow>

          <ConceptBlock
            title="The bit nobody talks about — looking after the responders"
            plainEnglish="A serious incident affects the casualty AND the people who responded — the operative who applied CPR, the colleague who isolated the supply, the witness who watched it happen. Acute stress reactions in the hours and days afterwards are normal; some people develop longer-term issues including PTSD. The L3 supervisor responsibility includes recognising the psychological impact and pointing the team at appropriate support."
            onSite="Practical things firms do well: post-incident debrief (factual, blame-free) within a few days; access to confidential counselling via Employee Assistance Programme; allowing time off for affected operatives without disciplinary penalty; checking in over the following weeks. The HASAWA s.2 duty to ensure health includes mental health — the HSE&apos;s &apos;Working Minds&apos; campaign and HSG265 (managing the causes of work-related stress) are the practitioner references."
          >
            <p>Recognising acute stress reactions in the team:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Immediate</strong> — shock, tearfulness, withdrawal, irritability,
                difficulty concentrating, intrusive replays of the event.
              </li>
              <li>
                <strong>First 1-4 weeks</strong> — sleep disturbance, avoidance of similar
                situations, hypervigilance, mood changes. Often resolves with social support and
                normal life.
              </li>
              <li>
                <strong>Beyond 4 weeks</strong> — if symptoms persist or worsen, that&apos;s
                when professional support (GP, occupational health, EAP counsellor) becomes
                important.
              </li>
              <li>
                <strong>Risk factors for longer-term impact</strong> — close personal connection
                to the casualty, perception of personal responsibility, lack of social support,
                pre-existing mental health vulnerability.
              </li>
              <li>
                <strong>Supervisor actions</strong> — talk to affected team members; allow time
                off without penalty; signpost to EAP and GP; document the support offered.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Tidying the scene before the inspector arrives"
            whatHappens={
              <>
                Apprentice has a shock from a back-box that wasn&apos;t isolated. Casualty
                taken to A&amp;E by ambulance. Supervisor, anxious about how the site
                looks, starts &quot;tidying up&quot; — packs the apprentice&apos;s tools
                back into the toolbox, removes the lock-off devices that weren&apos;t in
                place, puts the voltage indicator back in its case. By the time the HSE
                inspector arrives the next morning the scene is gone. The inspector
                infers the firm has something to hide, formal warning, FFI invoiced for
                investigation time, prosecution likely.
              </>
            }
            doInstead={
              <>
                Photograph everything as it is. Don&apos;t move anything. Notify the firm.
                Wait for the inspector. The cost of the photos is nothing; the cost of a
                tidied scene is enormous because the firm has lost both its evidence AND
                the inspector&apos;s benefit-of-the-doubt.
              </>
            }
          />

          <CommonMistake
            title="Letting the casualty drive themselves home after a shock"
            whatHappens={
              <>
                Casualty had a brief shock; says they&apos;re fine; insists on driving
                themselves home. Supervisor agrees. Casualty has a delayed cardiac event
                en route, crashes the van into a wall, sustains worse injuries than the
                original shock. Insurance investigates; HSE attends; the supervisor&apos;s
                decision to release them to drive becomes the central failure.
              </>
            }
            doInstead={
              <>
                Mandatory medical assessment. No driving alone. Either ambulance or a
                colleague drives them to A&amp;E. The 30-minute delay to find a driver
                is nothing compared to the consequences of an en-route cardiac event.
              </>
            }
          />

          <Scenario
            title="Apprentice shock on a domestic job"
            situation={
              <>
                You&apos;re running a small domestic CU change. Your L2 mate is removing
                an old cable from a back-box on a circuit you both believed was
                isolated. You hear a bang and a yelp; the L2 has had a shock from the
                cable&apos;s line conductor. They&apos;re upright but visibly shaken;
                their hand has a small black mark where the conductor touched. The
                customer is in the next room. The kitchen circuit you were both working
                on is no longer the only thing live — turns out the previous installer
                ran a separate spur off another circuit into the same back-box.
              </>
            }
            whatToDo={
              <>
                Step 1 — isolate the unexpected supply. Identify and lock-off the second
                circuit before doing anything else; you don&apos;t know if there&apos;s
                a third. Step 2 — assess the casualty: DR ABC, ask about feeling, look
                at the burn, check pulse and breathing. Step 3 — call 999 (mains shock,
                visible burn, even if casualty seems OK). Step 4 — phone your supervisor
                / contracts manager and the customer&apos;s point-of-contact. Step 5 —
                preserve the scene: photograph the back-box as found, the visible
                marking on the conductor, the position of locks and voltage indicator,
                the second circuit you discovered. Don&apos;t restore power. Don&apos;t
                continue work. Step 6 — written witness account from yourself and any
                other person present, on the day. Step 7 — once ambulance has the
                casualty, brief the customer factually but don&apos;t speculate on
                cause. Step 8 — RIDDOR consideration: this is potentially a specified
                injury (serious burn) and possibly a dangerous occurrence depending on
                facts. Inform the firm&apos;s responsible person who decides on the
                F2508. Step 9 — document everything in writing in the next 24 hours.
              </>
            }
            whyItMatters={
              <>
                The undiscovered second circuit is the kind of latent hazard the dynamic
                risk assessment exists to flag — but no test is perfect. Once the
                incident has happened, the L3 supervisor response is what determines
                whether the firm has a defensible position. The unexpected second
                circuit is now critical evidence; the moment it&apos;s &quot;tidied up&quot;
                the prosecution&apos;s job becomes much easier. Photographing it and
                preserving the scene is the single most-impactful 60 seconds of the
                response. The casualty&apos;s &quot;I&apos;m fine&quot; doesn&apos;t
                change the medical or regulatory pathway.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Remember from L2 — isolation first, DR ABC, 999, casualty care. These reflexes are still right at L3.",
              "L3 depth: scene preservation, witness handling, evidence chain. The 30 minutes after the incident is when evidence is created or destroyed.",
              "Mandatory medical assessment after any mains shock — even \'I\'m fine\'. Cardiac arrhythmia can develop hours later. Document recommendation, refusal and escalation.",
              "Electrical burns are small at the surface, deep at the tissue. Treat as more serious than they look.",
              "Don\'t tidy the scene. Don\'t restore power. Don\'t continue work. Photograph everything as found. Witness statements on the day, in writing, in their own words.",
              "Casualty\'s wishes ≠ supervisor\'s duty. Respect autonomy on treatment AND discharge HASAWA s.2/s.7 by declining release to safety-critical work without medical clearance.",
              "Notify the firm\'s responsible person immediately by phone. RIDDOR escalation runs through them, not through you.",
              "When HSE arrives next day — cooperate, factual, don\'t speculate, don\'t volunteer past-practice admissions. Phone the firm\'s H&S manager; let them handle the formal interview.",
            ]}
          />

          <Quiz title="Accident response and electric shock — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module1-section2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">Section 2 — Landing</div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module1-section2-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">2.2 Emergency procedures — running the response</div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
