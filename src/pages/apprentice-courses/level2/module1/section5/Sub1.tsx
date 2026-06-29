/**
 * Module 1 · Section 5 · Subsection 1 — Why safe isolation matters
 *
 * Unit 201, LO3, AC 3.8 + 3.9 — apprentice has to be able to describe the
 * procedures for safe isolation AND the implications of not following them.
 *
 * This sub focuses on the WHY: HSE fatality numbers, the EAWR duty that makes
 * "dead before you touch it" the legal default, the criminal liability that
 * sits on the individual under HASAWA s.7 + EAWR Reg 3, and what happens
 * when the procedure isn't followed.
 *
 * Cross-references: §1 (HASAWA + EAWR), §2 (shock hazards / current numbers).
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

const TITLE = 'Why safe isolation matters | Level 2 Module 1.5.1 | Elec-Mate';
const DESCRIPTION =
  'The legal default in UK electrical work is dead, not live. The HSE numbers, the EAWR duty, the prison time — and why "I just had a quick look" puts you in court.';

/* ── Inline checks (wired into stats/streaks) ─────────────────────── */

const checks = [
  {
    id: 's5-1-default-state-check',
    question: 'Under EAWR 1989, what is the default state for any conductor you work on?',
    options: [
      'Live, as long as you wear insulating gloves',
      'Live, provided the circuit is below 50 V',
      'Dead, unless live working is justified, planned and authorised',
      'Either, at the discretion of the person doing the work',
    ],
    correctIndex: 2,
    explanation:
      "EAWR Reg 14 is hard: no work on or near a live conductor unless it’s unreasonable to be dead, AND it’s reasonable for the work to be carried out live, AND suitable precautions are in place. All three. So in practice — dead, every time.",
  },
  {
    id: 's5-1-fatalities-check',
    question: 'Roughly how many people die from electrical accidents at work in the UK each year?',
    options: [
      'About 3',
      'About 30',
      'About 300',
      'About 3,000',
    ],
    correctIndex: 1,
    explanation:
      "HSE figures: around 30 fatal electrical accidents per year on average, plus around 1,000 reported electric-shock and burn incidents. Most of those fatalities are at 230 V or 400 V — not exotic HV gear.",
  },
  {
    id: 's5-1-personal-liability-check',
    question: "Your supervisor told you to crack on without proving dead. Something goes wrong. Who can the HSE prosecute?",
    options: [
      'Only the company, never an individual',
      'You personally, the supervisor and the company — all three',
      'Only the supervisor who gave the instruction',
      'Nobody, because you were following orders',
    ],
    correctIndex: 1,
    explanation:
      "HASAWA s.7 puts a duty on YOU. EAWR Reg 3 names every duty-holder, including employees. 'I was told to' is not a defence. The HSE regularly prosecutes individuals — apprentices, electricians and supervisors — alongside the company.",
  },
];

/* ── End-of-page Quiz ─────────────────────────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question: 'What is the main reason "safe isolation" exists as a procedure?',
    options: [
      'Fault current is higher at the origin than downstream',
      'To make sure the conductors you’re working on can’t shock or burn you',
      'Achieve comfortable conditions at start of occupancy',
      'Typically 12 months to capture seasonal variations',
    ],
    correctAnswer: 1,
    explanation:
      "Safe isolation makes sure the conductors are dead, stay dead, and are PROVED dead before any tool touches them. Everything else (paperwork, PPE, RAMS) wraps around that one job — keeping current off you.",
  },
  {
    id: 2,
    question: 'Roughly how many electric-shock and burn incidents are reported to the HSE each year in the UK?',
    options: [
      'Around 10,000',
      'Around 100',
      'Around 1,000',
      'Around 100,000',
    ],
    correctAnswer: 2,
    explanation:
      "Around 1,000 reported each year. About 30 are fatal. Most happen on Low Voltage systems (230 V / 400 V) — the same systems you work on every day.",
  },
  {
    id: 3,
    question: 'Which regulation makes "dead by default" the legal rule for electrical work in the UK?',
    options: [
      'The Health and Safety at Work Act 1974, Section 2',
      'BS 7671:2018+A4:2026, Regulation 537.2',
      'The Management of Health and Safety at Work Regulations 1999',
      'Electricity at Work Regulations 1989, Reg 14',
    ],
    correctAnswer: 3,
    explanation:
      "EAWR 1989 Reg 14 — no work on or near live conductors unless it’s unreasonable for them to be dead, reasonable to do live AND suitable precautions are taken. All three. In practice that means: isolate, every time.",
  },
  {
    id: 4,
    question: "What's the maximum prison sentence on conviction for an individual under HASAWA / EAWR in the Crown Court?",
    options: [
      '2 years',
      '6 months',
      '3 months',
      '10 years',
    ],
    correctAnswer: 0,
    explanation:
      "Up to 2 years in prison plus an unlimited fine. Add gross negligence manslaughter on top if someone dies — that’s up to life. Electricians have done time for it. It’s not theoretical.",
  },
  {
    id: 5,
    question: "An apprentice sees their supervisor working live on a CU 'just for two minutes'. What's the apprentice's position in law?",
    options: [
      'Nothing to do with them — it’s the supervisor’s job',
      'They have a duty under HASAWA s.7 and EAWR Reg 3 to raise it',
      'Apprentices are exempt because they’re still learning',
      'Only the company’s safety officer can flag it',
    ],
    correctAnswer: 1,
    explanation:
      "From day one on site you’re a duty-holder. If you SEE unsafe practice and don’t flag it, you’ve breached your own duty. Quiet word first, written if it doesn’t change. The law backs you for raising it.",
  },
  {
    id: 6,
    question: 'Most UK electrical fatalities at work happen at which voltage?',
    options: [
      'Extra-Low Voltage (under 50 V)',
      'High Voltage (above 1 kV)',
      'Low Voltage (230 V / 400 V)',
      'It’s split equally',
    ],
    correctAnswer: 2,
    explanation:
      "230 V single-phase and 400 V three-phase — the bread-and-butter voltages on every domestic and commercial site. The 'Low' in Low Voltage is relative to HV. It’s still well above the fibrillation threshold for the human heart.",
  },
  {
    id: 7,
    question: 'You disturb a 230 V circuit you "knew was off" and it shocks you. You feel fine ten minutes later. What do you do?',
    options: [
      'Carry on — if you feel fine, no harm was done',
      'Wait until the end of the day, then mention it to the supervisor',
      'Take a short break and resume once you’ve recovered',
      'Stop, report it, get checked at A&E, log it under RIDDOR if it qualifies',
    ],
    correctAnswer: 3,
    explanation:
      "Cardiac rhythm problems can show hours later. Internal burns can be hidden under tiny entry/exit marks. Stop, report, hospital — and if it caused unconsciousness, needed resuscitation, or kept you off >7 days, the responsible person reports under RIDDOR.",
  },
  {
    id: 8,
    question: 'Why is "I just had a quick look" so often the moment people get killed?',
    options: [
      "Skipping isolation feels harmless once and gets normalised — and a single live touch is enough",
      "Quick looks are usually done on dead circuits anyway",
      "The risk only applies to big projects, not small jobs",
      "A quick look means less time exposed, so it’s actually safer",
    ],
    correctAnswer: 0,
    explanation:
      "Most fatalities aren’t on big projects. They’re on routine maintenance, fuse swaps, accessory changes — exactly the moments you’re tempted to skip the procedure. EAWR covers ALL electrical work, no matter how small.",
  },
];

/* ── FAQs ─────────────────────────────────────────────────────────── */

const faqs = [
  {
    question: "If it’s 'only' a 230 V job, do I really have to lock off?",
    answer:
      "Yes. 230 V kills more electricians in the UK than any other voltage. The procedure doesn’t scale with how routine the job feels — EAWR Reg 14 applies whether it’s a £20 socket swap or a £20k switchroom upgrade. The day you skip it because it ‘felt fine last time’ is the day you find out otherwise.",
  },
  {
    question: "What happens to me legally if I cut a corner and someone gets hurt?",
    answer:
      "Worst case: prosecution under HASAWA s.7 (your personal duty) and EAWR Reg 3 (named duty-holder). Magistrates’ court: unlimited fine, up to 6 months. Crown Court: unlimited fine, up to 2 years. If someone dies and the prosecution can prove gross negligence, you’re looking at manslaughter — life as the maximum. Companies get done at the same time, but the individual conviction sits on YOUR record forever.",
  },
  {
    question: "What if I follow the procedure and something still goes wrong?",
    answer:
      "Then you’ve done your bit. The legal test is whether you took the precautions that a competent person reasonably would. Following safe isolation, using GS38 kit, recording what you did — that’s the defence. The HSE goes after corner-cutters, not people who genuinely tried to stay safe.",
  },
  {
    question: "Do customers ever have the right to demand live working?",
    answer:
      "No. The customer can ask, but the duty-holder under EAWR is YOU and your boss — not the client. Power down the freezers for an hour or come back at 4am, but don’t work live to suit a shop. If your boss agrees to it, the boss is on the hook AND you still are under s.7.",
  },
  {
    question: "Where does ‘safe isolation’ actually come from as a procedure?",
    answer:
      "It’s built up from EAWR 1989 Reg 12, 13 and 14 (cutting off supply, working dead, when live is permitted), BS 7671 Section 537 (devices for isolation and switching), and HSE guidance — particularly HSG85 (Electricity at Work — Safe working practices) and HSG230 (Keeping electrical switchgear safe). The 7-step (some firms teach 9) procedure is the industry’s practical interpretation of all of them.",
  },
  {
    question: "I’m an apprentice — does my supervisor’s sign-off cover me?",
    answer:
      "Their supervision means you can do work that needs more knowledge than you’ve got yet (EAWR Reg 16). It does NOT remove your s.7 duty. If they tell you to do something obviously unsafe, you’re still in the wrong if you do it. Stop, ask, escalate — that’s how the law expects an instructed person to act.",
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
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 5
          </button>

          <PageHero
            eyebrow="Module 1 · Section 5 · Subsection 1"
            title="Why safe isolation matters"
            description="The single most important habit on site. Around 30 electricians a year die at work in the UK and most of them are on the same 230 V and 400 V systems you’ll work on every day. Here’s why dead-by-default is the law, not the suggestion."
            tone="emerald"
          />

          <TLDR
            points={[
              "EAWR 1989 Reg 14 makes ‘dead’ the legal default. Live working is the exception, and only when three tests are met — not when it’s convenient.",
              "About 1,000 electric-shock or burn injuries are reported to the HSE each year, around 30 fatal. The majority are on Low Voltage (230 V / 400 V) — your everyday voltages.",
              "If you cut a corner and somebody gets hurt, the HSE can come for the company, your boss AND you personally. ‘I was told to’ has never worked as a defence.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "State the legal default for working on electrical systems under EAWR Reg 14, and the three tests that must be met before live work is even considered.",
              "Quote rough HSE figures for electrical fatalities and shock incidents at work in the UK.",
              "Describe the criminal penalties that apply to individuals (apprentices, electricians, supervisors) and to companies under HASAWA and EAWR.",
              "Explain why the apprentice has a personal duty of care under HASAWA s.7 and why ‘following orders’ is not a legal defence.",
              "Recognise the moments where isolation is most often skipped (routine work, ‘quick look’, customer pressure) and why those moments produce most of the fatalities.",
              "Link safe isolation back to the layered shock protection in BS 7671 (basic, fault, additional) covered in Section 2.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why this is the most important habit you’ll learn</ContentEyebrow>

          <ConceptBlock title="It’s the procedure between you and a fatal shock">
            <p>
              Every other safety habit on site supports this one. PPE, RAMS, lock-off keys, GS38
              probes, training cards — the whole stack exists so that when a screwdriver finally
              touches a conductor, that conductor is dead. Get the isolation right and most of the
              other risks shrink. Get it wrong and none of the other layers can save you.
            </p>
            <p>
              The HSE’s long-running figures put around <strong>1,000 electric-shock and burn
              accidents at work in front of them every year</strong>, with about{' '}
              <strong>30 fatal</strong>. Most of the fatalities involve direct contact with
              ‘ordinary’ Low Voltage systems — 230 V single-phase and 400 V three-phase. The same
              voltages you’ll work on every day from your first week as an apprentice.
            </p>
            <p>
              Skipping the procedure isn’t a personality trait or a test of who’s ‘proper time-served’.
              It’s the single most reliable way to end up dead, in court, or both.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The legal default</ContentEyebrow>

          <ConceptBlock
            title="Dead is the rule. Live is the exception."
            plainEnglish="UK electrical law is set up so that ‘off’ is what you do unless you can prove ‘on’ was justified. Not the other way round."
            onSite="If a foreman tells you ‘crack on, it’s only a quick one,’ they’re asking you to flip the law upside down. Politely decline."
          >
            <p>
              The Electricity at Work Regulations 1989 are made under HASAWA and apply to every
              workplace where electrical work is done. <strong>Reg 14</strong> is the bit that
              decides what’s allowed:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>It must be unreasonable for the conductor to be dead.</li>
              <li>It must be reasonable for the work to be carried out live.</li>
              <li>Suitable precautions (training, PPE, instruments, supervision) must be in place.</li>
            </ul>
            <p>
              All three at once. If any one of them isn’t met, the work has to be done dead — and
              that means safely isolated. In practice, almost nothing on a domestic or commercial
              site clears all three. The textbook example of legitimate live work is fault-finding
              that genuinely cannot be done dead, by a competent person, with the right kit. Even
              then, you’re still expected to make as much of the surrounding work dead as possible.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Electricity at Work Regulations 1989 — Regulation 14"
            clause="No person shall be engaged in any work activity on or so near any live conductor (other than one suitably covered with insulating material so as to prevent danger) that danger may arise unless — (a) it is unreasonable in all the circumstances for it to be dead; and (b) it is reasonable in all the circumstances for him to be at work on or near it while it is live; and (c) suitable precautions (including where necessary the provision of suitable protective equipment) are taken to prevent injury."
            meaning={
              <>
                Three tests, ALL of which have to be passed before anyone touches a live conductor.
                If your boss can’t honestly say all three are met, the legal answer is to isolate.
                ‘It’s only a small job’ doesn’t pass test (a). ‘The shop won’t close for half an
                hour’ doesn’t pass (a) either — that’s convenience, not necessity.
              </>
            }
            cite="Reference: HSE — Electricity at Work Regulations 1989 (Statutory Instrument 1989 No. 635)"
          />

          <RegsCallout
            source="Electricity at Work Regulations 1989 — Regulation 13"
            clause="Adequate precautions shall be taken to prevent electrical equipment, which has been made dead in order to prevent danger while work is carried out on or near that equipment, from becoming electrically charged during that work if danger may thereby arise."
            meaning={
              <>
                Reg 13 is the lock-off reg. Once you’ve made it dead, you’ve got to keep it dead.
                That means physically locking off (so it can’t be switched on by anyone else),
                tagging (so anyone wandering past knows what’s going on), and checking (proving
                dead before any tool goes near a conductor). All three of those are precautions
                Reg 13 expects.
              </>
            }
            cite="Reference: HSE HSG85 — Electricity at work: Safe working practices"
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The numbers you should know</ContentEyebrow>

          <ConceptBlock
            title="What ‘about 30 a year’ actually means in practice"
            onSite="When the HSE turns up at a fatal incident, the first thing they ask for is the safe isolation procedure and the test records. If those don’t exist, the prosecution writes itself."
          >
            <p>
              The HSE’s headline figures for the UK have been broadly stable for years — even as
              the workforce has grown:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>~1,000</strong> reported electric-shock or burn accidents at work each
                year.
              </li>
              <li>
                <strong>~30</strong> of those are fatal — about one funeral every other Tuesday.
              </li>
              <li>
                Most fatalities involve <strong>direct contact with conductors at LV</strong>
                {' '}— the 230 V or 400 V you handle daily.
              </li>
              <li>
                A large share of survivors carry <strong>permanent damage</strong> — burns that
                need grafts, heart-rhythm issues, neurological problems, falls from height after
                shock.
              </li>
            </ul>
            <p>
              The fatalities are not concentrated at the ‘exotic’ end of the trade. They cluster
              around the routine: socket changes, light fittings, fuse swaps, fault-finding,
              maintenance — exactly the work apprentices are sent to do. The pattern is almost
              always the same: the conductor was thought to be dead and wasn’t, OR it was made
              dead but wasn’t locked off and somebody re-energised it.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="HSE HSG85 — Electricity at work: Safe working practices"
            clause="The majority of accidents during work on, or near, electrical equipment occur because people are expected to work on equipment that has not been made dead, or because people work on or test electrical equipment that has not been proved dead."
            meaning={
              <>
                Read that sentence again. The HSE’s own analysis is that most accidents happen for
                two reasons: (a) people work on stuff that hasn’t been made dead, or (b) they
                work on stuff that wasn’t <em>proved</em> dead. Safe isolation as you’ll learn it
                in §5.2-5.5 is the procedure that closes both of those gaps.
              </>
            }
            cite="Reference: HSE HSG85 (Edition 4) — Electricity at work: Safe working practices for low-voltage electrical systems"
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Personal criminal liability</ContentEyebrow>

          <ConceptBlock
            title="The HSE will name you, not just the company"
            plainEnglish="If something goes wrong, the prosecution doesn’t just go after a faceless ‘Acme Electrical Ltd’. It can — and routinely does — name the apprentice, the electrician on site, the supervisor and the director."
          >
            <p>
              Three stacked duties make this personal:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>HASAWA s.7</strong> — every employee has a personal duty to take
                reasonable care for themselves and others, and to cooperate with the employer’s
                safety system.
              </li>
              <li>
                <strong>EAWR Reg 3</strong> — names ‘every employer, self-employed person and
                employee’ as duty-holders. There’s no ‘too junior to count’ clause.
              </li>
              <li>
                <strong>EAWR Reg 14</strong> — the live-working ban. If you’re the one with the
                screwdriver in the live conductor, you breached it personally, regardless of who
                told you to.
              </li>
            </ul>
            <p>The penalty band on conviction:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
              <li>
                <strong>Magistrates’ court (summary):</strong> unlimited fine and/or up to{' '}
                <strong>6 months in prison</strong>.
              </li>
              <li>
                <strong>Crown Court (indictment):</strong> unlimited fine and/or up to{' '}
                <strong>2 years in prison</strong>.
              </li>
              <li>
                <strong>If someone dies</strong> and gross negligence can be shown:{' '}
                <strong>gross negligence manslaughter</strong> — up to life. Electricians have done
                multi-year stretches for it.
              </li>
              <li>
                On top of any of those: <strong>permanent loss of competence card</strong>{' '}
                (ECS, JIB, etc.) and effective exit from the trade.
              </li>
            </ul>
            <p>
              You don’t need someone to die for it to be career-ending. A serious shock, a near
              miss with a witness, a recorded incident — any of those can be enough for an
              improvement notice or a prohibition notice that follows you around for years.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Trusting the breaker label without proving"
            whatHappens={
              <>
                You walk up to a CU. The breaker is labelled ‘Kitchen sockets’ and that’s the
                circuit you want off. You flip the breaker, watch the kitchen sockets go dead on
                a plug-in tester, and assume you’re sorted. You start work. Turns out the
                breaker for the kitchen DOWNLIGHTS is in there too — somebody re-used a spare way
                without updating the label — and you’ve just opened a junction box on a circuit
                that’s still live.
              </>
            }
            doInstead={
              <>
                Labels are a clue, not a fact. Always prove dead at the actual point of work, on
                every conductor (line-line, line-neutral, line-earth, neutral-earth as
                appropriate), with a proven GS38 voltage indicator. The label tells you where to
                start; the proving unit + voltage indicator tells you whether you’re right.
              </>
            }
          />

          <CommonMistake
            title="Touching a known-dead conductor without a final voltage test at the point of work"
            whatHappens={
              <>
                You isolated upstream at the CU half an hour ago. You proved the indicator on the
                proving unit, then proved dead at the local DB. Confidence high. You walk down the
                corridor to the actual termination, take the cover off, and reach in to make the
                connection without re-testing AT the point of work. In between, the apprentice
                from the other firm has reset what he thought was a tripped breaker, the standby
                generator's auto-start has kicked in for ten seconds, or you've simply walked to
                a different circuit than the one you isolated. The conductor you treated as dead
                was live the moment you touched it.
              </>
            }
            doInstead={
              <>
                Dead-at-point-of-work is a separate test, every time, on every conductor you’re
                about to touch — even if you isolated five minutes ago at the CU you can still
                see. Walk back to the indicator, prove on the proving unit, test L-E / L-N / N-E
                at the conductor, prove on the proving unit again, THEN connect. Time-lag and
                changed location are exactly when re-energisation incidents happen.
              </>
            }
          />

          <Scenario
            title="The ‘two-minute job’ that took an electrician to A&E"
            situation={
              <>
                A second-year is asked to swap a damaged single 13 A socket-outlet in a small
                shop. The supervisor says: ‘Just snap the breaker off, two minutes, customer
                doesn’t want the freezer down.’ No lock-off. No proving unit on him — it’s on the
                van. He flips the breaker, removes the screws and pulls the socket out. The
                cleaner walks past the open CU door, sees ‘a flipped breaker’ and helpfully
                resets it. He gets a hand-to-hand shock as he’s pulling the cable through the
                back box.
              </>
            }
            whatToDo={
              <>
                Two things should never have happened. First: the supervisor told him to skip
                lock-off and proving — that’s an EAWR Reg 13 / Reg 14 breach the supervisor’s on
                the hook for. Second: he went along with it. HASAWA s.7 puts that breach on him
                too. Right move on the day was: ‘I’ll grab the lock-off kit from the van — five
                more minutes.’ If pushed: ‘I can’t work on it without isolating, that’s the law,
                not me being awkward.’
              </>
            }
            whyItMatters={
              <>
                That electrician was lucky — A&E, a few weeks of palpitations, kept his job. The HSE
                investigated. The company was fined £24k, the supervisor was fined personally
                and got a suspended sentence. The apprentice escaped prosecution because he’d
                only just started — but the next year up he’d have been named too.
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

          <ContentEyebrow>Where this fits in the bigger picture</ContentEyebrow>

          <ConceptBlock
            title="Safe isolation = the practical floor of all the protection in BS 7671"
            plainEnglish="The whole protective stack from §1 and §2 — basic, fault, additional protection, RCDs, ADS — is built around energised conductors that you’ll occasionally have to work on. Safe isolation is what removes you from that whole picture."
          >
            <p>
              In Section 2.1 you covered what current does to a body and how BS 7671 layers
              protection — basic (insulation, enclosures), fault (ADS, earthing, bonding),
              additional (30 mA RCDs). All of that is designed to stop a shock during
              <em> normal use </em>of the installation.
            </p>
            <p>
              The moment you remove an accessory cover, open a CU, or expose a conductor for
              maintenance, every one of those protective layers is briefly bypassed. Insulation:
              gone. Enclosure: open. RCDs: still there but they only trip after current has
              already started flowing. The only protection that remains is the procedure you
              follow — safe isolation. That’s why this section sits where it does in your
              learning, and why every other section builds on it.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 132.12 (Accessibility of electrical equipment) (paraphrased)"
            clause="Electrical equipment shall be arranged so as to afford, as may be necessary: sufficient space for the initial installation and later replacement of individual items of electrical equipment; and accessibility for operation, inspection, testing, fault detection, maintenance and repair."
            meaning={
              <>
                Reg 132.12 is the design-side companion to safe isolation. The reason isolators,
                main switches and CUs have to be accessible is so that competent people can
                actually carry out a safe isolation when work is needed. If you turn up to a job
                and the means of isolation is buried behind a dishwasher or above a 4 m ceiling
                with no access, that’s a 132.12 issue — flag it, don’t just shrug. (Reg 132.16
                is a separate provision covering additions and alterations to an installation.)
              </>
            }
            cite="Verbatim wording paraphrased — see BS 7671:2018+A4:2026 Part 1 Chapter 13 Regulation 132.12 for the full text."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "EAWR Reg 14 makes dead the default — live work needs three tests to be met, not just one ‘good reason’.",
              "Around 1,000 reported shock/burn incidents per year in the UK; about 30 fatalities, mostly on 230 V / 400 V.",
              "Personal liability is real: HASAWA s.7 + EAWR Reg 3 name YOU as a duty-holder — apprentice or not.",
              "Penalties stack from unlimited fines through 2 years inside (HASAWA / EAWR) to life (gross negligence manslaughter).",
              "Most fatalities cluster around routine work — socket swaps, fuse changes, ‘quick looks’ — exactly the moments you’re tempted to skip the procedure.",
              "Safe isolation is the practical floor of every protective layer in BS 7671. The moment you open an enclosure, isolation is the only protection left.",
            ]}
          />

          {/* ── Quiz (preserved — links to streaks/stats) ───────── */}

          <Quiz title="Why safe isolation matters knowledge check" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module1/section4/4-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Manual handling and tool safety
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module1/section5/5-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                The safe isolation procedure
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
