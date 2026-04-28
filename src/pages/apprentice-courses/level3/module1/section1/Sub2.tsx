/**
 * Module 1 · Section 1 · Subsection 2 — EAWR 1989: competence, Reg 16 and supervision
 * Maps to City & Guilds 2365-03 / Unit 201 / LO1 / AC 1.1
 *   AC 1.1 — "identify roles and responsibilities with regard to current relevant
 *            Health and Safety legislation"
 *
 * Layered depth (supplementary):
 *   - 2357 Unit 601 ELTK01 / AC 1.1 — own roles and responsibilities and those
 *     of others with regard to current relevant legislation
 *   - 2357 Unit 601 ELTK01 / AC 1.2 — particular Health and Safety risks
 *
 * EAWR 1989 — the duty system specific to electrical work. L2 covered safe
 * isolation. L3 adds Reg 14 (live working defences), Reg 16 (competence) and
 * the supervisor judgement of "is the apprentice ready to do this alone?".
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
  'EAWR — competence, Reg 16 and supervision (1.1) | Level 3 Module 1.1.2 | Elec-Mate';
const DESCRIPTION =
  'L3 refresher on the Electricity at Work Regulations 1989 — Reg 4 systems, Reg 14 live working, Reg 16 competence, and how an L3 apprentice carries supervisory weight even before formal sign-off.';

const checks = [
  {
    id: 'l3-m1-s1-sub2-reg14',
    question:
      "When can EAWR Reg 14 ever permit live working on a circuit above 50V AC?",
    options: [
      "Whenever the customer is in a hurry.",
      "Only when ALL THREE conditions in Reg 14 are met simultaneously — (a) it is unreasonable in all the circumstances for the conductor to be dead; AND (b) it is reasonable in all the circumstances for the work to be done live; AND (c) suitable precautions (including PPE, insulated tools, controlled access, competent person, second person where appropriate) are taken to prevent injury. All three. The bar is deliberately high.",
      "Whenever the kit is below 32A.",
      "Whenever the operative wears voltage-rated gloves.",
    ],
    correctIndex: 1,
    explanation:
      "Remember from L2 — safe isolation is the default. EAWR Reg 14 is the narrow gateway out of that default. The HSE has prosecuted electricians for live work on circuits where dead-working would have been straightforward (lost commercial time isn't 'unreasonable'). All three limbs of Reg 14 must be defensible in writing — a one-line risk assessment doesn't satisfy it.",
  },
  {
    id: 'l3-m1-s1-sub2-reg16',
    question:
      "An L2 apprentice in your team asks you to sign their initial verification certificate for a small kitchen circuit because the supervisor isn't on site. Under EAWR Reg 16, what's the L3-level call?",
    options: [
      "Sign it — you're L3 so you can sign anything.",
      "Refuse and escalate. EAWR Reg 16 prohibits anyone from being engaged in work that requires technical knowledge or experience to prevent danger unless they possess it themselves OR are under such degree of supervision as is appropriate having regard to the nature of the work. You are not yet a Qualified Supervisor under the BS 7671 sense — and the certificate is a legal document. Sign-off without competence is a Reg 16 breach, and the certificate is fraudulent.",
      "Sign it but write 'apprentice' in small letters.",
      "Sign it but only if the L2 apprentice promises not to tell anyone.",
    ],
    correctIndex: 1,
    explanation:
      "L3 is the boundary year — you're more competent than an L2 mate but not yet a fully qualified electrician with sign-off authority. Reg 16 doesn't grant authority by job title; it requires actual technical knowledge and experience. The kindest thing you can do for the L2 apprentice (and for yourself) is escalate — not sign.",
  },
  {
    id: 'l3-m1-s1-sub2-eawr-bs7671',
    question:
      "What's the relationship between EAWR 1989 and BS 7671:2018+A4:2026 (now A4:2026)?",
    options: [
      "They're the same document.",
      "EAWR is statute — primary legal duty. BS 7671 is non-statutory; it's the IET code of practice. Following BS 7671 is treated by the courts as evidence that you've discharged the EAWR duty (essentially a 'safe harbour'). Departing from BS 7671 doesn't automatically breach EAWR, but you have to demonstrate the alternative is at least as safe — and the burden is on you.",
      "BS 7671 overrides EAWR because it's newer.",
      "BS 7671 only applies in England.",
    ],
    correctIndex: 1,
    explanation:
      "This is one of the most important L3 conceptual moves. EAWR is the legal hook. BS 7671 is the technical playbook that demonstrates compliance. A4:2026 is the current edition — knowing the relationship lets you answer 'why does the regs book matter?' with the right legal framing.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "Who does EAWR 1989 apply to?",
    options: [
      "Only employers.",
      "Employers, self-employed, employees and managers — Reg 3 places duties on each. Some duties are absolute, some are SFAIRP. The employee duty (Reg 3(2)) is to co-operate with the employer's compliance and to comply with EAWR personally so far as it relates to matters within their control.",
      "Only the HSE.",
      "Only large companies.",
    ],
    correctAnswer: 1,
    explanation:
      "EAWR Reg 3 stacks duties on every party — much like HASAWA s.2/s.3/s.7. The L3 step is realising EAWR has its own personal-duty hook on the employee, not just the corporate one.",
  },
  {
    id: 2,
    question: "What does EAWR Reg 4 require?",
    options: [
      "That all electrical work be free of charge.",
      "That all systems shall, so far as is reasonably practicable, be of such construction as to prevent danger; that they be maintained so as to prevent (so far as is reasonably practicable) such danger; that work activities on or near systems be carried out so as not to give rise to danger; and that protective equipment be suitable for the use, properly maintained and properly used.",
      "That the wiring colours be brown and blue.",
      "That all sockets be 13A.",
    ],
    correctAnswer: 1,
    explanation:
      "Reg 4 covers system construction, system maintenance, work activities and protective equipment. It's the broadest single regulation in EAWR. The 'maintained to prevent danger' limb is what catches firms that install correctly but never inspect or test.",
  },
  {
    id: 3,
    question: "What does EAWR Reg 13 require?",
    options: [
      "That the apprentice make the tea.",
      "That adequate precautions be taken to prevent electrical equipment, which has been made dead in order to prevent danger while work is carried out on or near that equipment, from becoming electrically charged during the work if danger may thereby arise. In practice — lock-off, tag-out, prove dead.",
      "That the tea be made by 10am.",
      "That all earth bonding be 16mm sq.",
    ],
    correctAnswer: 1,
    explanation:
      "Reg 13 is the legal hook for the safe-isolation procedure you learned at L2. Lock-off and tag-out aren't best practice — they're how you discharge a Reg 13 duty. Skipping them is an EAWR breach regardless of whether the circuit is actually re-energised.",
  },
  {
    id: 4,
    question: "What's the EAWR Reg 14 'three-test' for live working?",
    options: [
      "Cheap, quick, easy.",
      "(a) Unreasonable in all the circumstances for the conductor to be dead; AND (b) reasonable in all the circumstances for the work to be done live; AND (c) suitable precautions taken to prevent injury. All three must be satisfied. The bar is deliberately high — the HSE prosecutes Reg 14 breaches harshly because the consequences are usually fatal.",
      "Voltage, current, resistance.",
      "Brown, blue, green/yellow.",
    ],
    correctAnswer: 1,
    explanation:
      "Reg 14 is the live-working gateway. The three-test must be evidenced in writing on a permit or RAMS — verbal 'this is fine' won't survive an HSE inspection. Lost commercial time is not 'unreasonable'.",
  },
  {
    id: 5,
    question: "What does EAWR Reg 16 require regarding competence?",
    options: [
      "Nothing — it's about wiring colours.",
      "No person shall be engaged in any work activity where technical knowledge or experience is necessary to prevent danger or, where appropriate, injury, unless he possesses such knowledge or experience, or is under such degree of supervision as may be appropriate having regard to the nature of the work.",
      "Only that you have a CSCS card.",
      "Only that you have an NVQ.",
    ],
    correctAnswer: 1,
    explanation:
      "Reg 16 is the competence regulation. Two routes — possess the knowledge yourself, OR work under appropriate supervision. At L3 you sit in the middle: you have more knowledge than an L2 mate but you're not yet a qualified electrician. Knowing where you sit on the Reg 16 spectrum is part of the L3 step.",
  },
  {
    id: 6,
    question: "How does BS 7671 relate to EAWR?",
    options: [
      "BS 7671 replaces EAWR.",
      "BS 7671 is non-statutory but compliance is treated by the courts as evidence of discharging the EAWR duty. It's a 'safe harbour' — follow BS 7671 and the prosecution has to work much harder to prove you breached EAWR. Depart from BS 7671 and you have to demonstrate the alternative is at least as safe.",
      "BS 7671 only applies to industrial work.",
      "BS 7671 is older than EAWR.",
    ],
    correctAnswer: 1,
    explanation:
      "The safe-harbour framing is the L3 move. The current edition is A4:2026 — knowing the edition matters because departures from older editions can be problematic if the design dates from before the current standard.",
  },
  {
    id: 7,
    question: "Under EAWR, what's the practical difference between Reg 4(1) and Reg 4(2)?",
    options: [
      "There is no difference.",
      "Reg 4(1) is about system construction — building it safe. Reg 4(2) is about system maintenance — keeping it safe. A firm can install correctly (4(1)) and still breach (4(2)) by failing to inspect, test and maintain. EICR work is the legal mechanism for discharging Reg 4(2) on installations after the initial verification.",
      "Reg 4(1) is for England, Reg 4(2) is for Scotland.",
      "Reg 4(1) is for AC, Reg 4(2) is for DC.",
    ],
    correctAnswer: 1,
    explanation:
      "Splitting Reg 4 into 'design and install' vs 'maintain' is the L3 move that explains why EICR isn't optional commercial nice-to-have. It's the legal mechanism for keeping the install on the right side of EAWR Reg 4(2). Landlords (Electrical Safety Standards in the Private Rented Sector (England) Regs 2020) and Building Safety Act dutyholders both rely on it.",
  },
  {
    id: 8,
    question:
      "What's the L3-specific shift in how EAWR Reg 16 (competence) applies to you?",
    options: [
      "It doesn't apply to apprentices.",
      "At L2 you were always 'under supervision' — that was the second limb of Reg 16. At L3 you're moving towards being able to satisfy the first limb (possess the technical knowledge). You also start being looked to by L2 mates as a quasi-supervisor. Knowing where the Reg 16 line sits — for yourself and for the people who ask you to sign things — is the L3 competence judgement.",
      "It only applies to electricians over 25.",
      "It only applies on three-phase work.",
    ],
    correctAnswer: 1,
    explanation:
      "Reg 16 is essentially the legal version of the question 'are you ready to do this alone?'. At L3 the answer is 'sometimes yes, sometimes no, and knowing the difference is the skill'. Honesty about competence boundaries is what keeps you on the right side of Reg 16.",
  },
];

const faqs = [
  {
    question: "Does EAWR apply to extra-low voltage work, or only mains?",
    answer:
      "EAWR applies to all electrical systems where danger may arise. ELV (under 50V AC / 120V DC ripple-free) is generally outside the danger threshold for shock but can still cause burns, arc-flash and ignition. The Reg 4 duties apply regardless of voltage — the SFAIRP qualifier scales the precautions to the risk.",
  },
  {
    question: "If I follow BS 7671 exactly, am I automatically EAWR-compliant?",
    answer:
      "Not automatically — but you're as close as the law gives you. Following BS 7671 is treated by the courts as strong evidence that the EAWR duty has been discharged, but EAWR has its own duties (e.g. Reg 14 live-working, Reg 16 competence, Reg 13 isolation) that BS 7671 doesn't fully cover. You can be BS 7671-compliant on the install and still breach EAWR on the operating practice.",
  },
  {
    question: "Who can lawfully work on an electrical system under EAWR?",
    answer:
      "Anyone who satisfies Reg 16 — either by possessing the technical knowledge themselves, or by being under appropriate supervision. There's no statutory licensing scheme in the UK for general electrical work (NICEIC and similar schemes are voluntary registration). CompEx is required for hazardous-area work; Joint Industry Board (JIB) grading is the industry's competence ladder. The L3 apprentice mostly sits in the 'under supervision' limb.",
  },
  {
    question: "What happens if my supervisor signs me off as competent on something I don't actually feel ready for?",
    answer:
      "The competence sign-off is the supervisor's act, but the personal duty under Reg 16 (and HASAWA s.7) stays with you. If you don't feel ready, say so — preferably in writing — and decline the work. ERA 1996 s.44 protects you from detriment for raising the safety concern. A reluctant 'I'll have a go' that ends in injury reflects on the supervisor under Reg 16, on the firm under Reg 4, and on you under s.7.",
  },
  {
    question: "Is it ever lawful to work live on a domestic consumer unit change?",
    answer:
      "Almost never. The CU change can virtually always be done with the supply isolated at the cut-out (with the DNO's consent for cut-out fuse withdrawal) or by withdrawing the supplier's main fuse. Reg 14's three-test is essentially never satisfied for a CU change — 'we don't want to inconvenience the customer for an hour' is not 'unreasonable in all the circumstances for the conductor to be dead'. The HSE has prosecuted multiple CU-change live-work fatalities.",
  },
  {
    question: "Can I rely on the firm's EICR to discharge my own EAWR duty?",
    answer:
      "Partially. The EICR discharges Reg 4(2) maintenance duty for the installation as a whole, but you still owe the personal Reg 16 (competence) and Reg 13 (isolation) duties on every job you do. A current EICR doesn't mean you can skip prove-test-prove. The EICR is your firm's defence on the system; safe isolation is your personal defence on the day.",
  },
];

export default function Sub2() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module1-section1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 1
          </button>

          <PageHero
            eyebrow="Module 1 · Section 1 · Subsection 2"
            title="EAWR 1989 — competence, Reg 16 and supervision"
            description="Remember from L2 — EAWR is the statute behind safe isolation. At L3 the focus shifts to Reg 14 live-working defences, Reg 16 competence and the moment you start being looked to as a supervisor by L2 mates."
            tone="emerald"
          />

          <TLDR
            points={[
              'EAWR 1989 is the statute that sits behind every electrical job. Reg 4 (systems and maintenance), Reg 13 (isolation), Reg 14 (live working — only via the three-test), Reg 16 (competence). Remember from L2 — Reg 13 is the safe-isolation hook.',
              'Reg 16 has two limbs: possess the knowledge yourself, OR work under appropriate supervision. At L3 you sit between them. Honesty about which limb you fall under for any given task is the L3 competence judgement.',
              'BS 7671:2018+A4:2026 is non-statutory but is treated by the courts as the safe-harbour evidence for EAWR compliance. Follow it and you make the prosecution work hard; depart from it and the burden is on you.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'State the scope and dutyholders under EAWR 1989 — employer, self-employed, employee, manager.',
              'Identify the duties under Reg 4 (system construction, maintenance, work activities, protective equipment).',
              'Describe Reg 13 (precautions for work on equipment made dead) and its role as the legal hook for safe isolation.',
              'Apply the Reg 14 three-test for live working and explain why the bar is deliberately high.',
              'State the Reg 16 competence requirement and identify which limb (own knowledge / supervision) applies in a given situation.',
              'Explain the relationship between EAWR (statutory) and BS 7671 A4:2026 (non-statutory safe harbour).',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Where EAWR sits in the hierarchy</ContentEyebrow>

          <ConceptBlock
            title="From general H&S to electrical-specific duty"
            plainEnglish="HASAWA is the umbrella. EAWR 1989 is the daughter regulation that drills into electrical work specifically. A breach of EAWR is also (usually) a HASAWA breach because EAWR is made under HASAWA's enabling powers. So an electrical incident routinely runs HASAWA s.2/s.3/s.7 in parallel with EAWR Reg 4/13/14/16."
            onSite="The L2-to-L3 step: at L2 you learned EAWR as 'the safe-isolation regulation'. At L3 you should know it covers system construction (Reg 4), maintenance (Reg 4(2)), live working (Reg 14) and competence (Reg 16). Each carries separate prosecutions if breached."
          >
            <p>The structure of EAWR — what to know:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Reg 1–3</strong> — preliminary, citation, application and definitions.
                Reg 3 is the dutyholder regulation — duties on employer, self-employed and
                employee.
              </li>
              <li>
                <strong>Reg 4</strong> — systems, work activities and protective equipment. The
                broadest regulation in the set.
              </li>
              <li>
                <strong>Reg 5–11</strong> — specific technical duties: strength and capability,
                adverse environments, insulation, protection from excess current, means for
                cutting off supply.
              </li>
              <li>
                <strong>Reg 12</strong> — means for cutting off the supply and for isolation.
              </li>
              <li>
                <strong>Reg 13</strong> — precautions for work on equipment made dead. The legal
                hook for lock-off and prove-test-prove.
              </li>
              <li>
                <strong>Reg 14</strong> — work on or near live conductors. The three-test
                gateway.
              </li>
              <li>
                <strong>Reg 15</strong> — working space, access and lighting.
              </li>
              <li>
                <strong>Reg 16</strong> — persons to be competent to prevent danger and injury.
                The competence regulation.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Reg 4 — design, install, maintain</ContentEyebrow>

          <ConceptBlock
            title="The duty doesn't end when the install is signed off"
            plainEnglish="EAWR Reg 4 is split. Reg 4(1) is system construction — design and install it safe. Reg 4(2) is system maintenance — keep it safe. A firm can install perfectly and still breach Reg 4(2) by failing to inspect, test and maintain. EICR is the legal mechanism for discharging the maintenance duty on installations after initial verification."
            onSite="When a customer asks 'do I really need an EICR?' the L3 answer is 'EICR is how the legal duty to maintain the system gets discharged — it is not a commercial upsell, it is evidence that EAWR Reg 4(2) is being satisfied'. That framing is much harder to refuse than 'it is good practice'."
          >
            <p>What Reg 4 covers in practice:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>System construction (Reg 4(1))</strong> — discharged by following BS 7671
                A4:2026 design rules, complete initial verification (BS 7671 Part 6) and EIC
                certification.
              </li>
              <li>
                <strong>System maintenance (Reg 4(2))</strong> — discharged by periodic
                inspection and testing, EICR reporting, repair and remedial work, ongoing
                competence checks of operators where applicable.
              </li>
              <li>
                <strong>Work activities (Reg 4(3))</strong> — safe systems of work, safe
                isolation, permits where appropriate.
              </li>
              <li>
                <strong>Protective equipment (Reg 4(4))</strong> — voltage indicators, insulated
                tools, mats, gloves, PPE — suitable for use, properly maintained, properly used.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Electricity at Work Regulations 1989 — Reg 4"
            clause={
              <>
                <p className="mb-2">
                  <strong>Reg 4(1)</strong> — &quot;All systems shall at all times be of such
                  construction as to prevent, so far as is reasonably practicable, danger.&quot;
                </p>
                <p className="mb-2">
                  <strong>Reg 4(2)</strong> — &quot;As may be necessary to prevent danger, all
                  systems shall be maintained so as to prevent, so far as is reasonably
                  practicable, such danger.&quot;
                </p>
                <p>
                  <strong>Reg 4(4)</strong> — &quot;Any equipment provided under these
                  Regulations for the purpose of protecting persons at work on or near electrical
                  equipment shall be suitable for the use for which it is provided, be maintained
                  in a condition suitable for that use, and be properly used.&quot;
                </p>
              </>
            }
            meaning={
              <>
                Three duties — construct safe, maintain safe, equip safely. The maintenance limb
                (Reg 4(2)) is the legal foundation of the EICR regime. The protective-equipment
                limb (Reg 4(4)) covers your voltage indicator, your locks, your insulated tools
                and your PPE — &quot;maintained in a condition suitable for that use&quot;
                catches the cracked-handle screwdriver and the out-of-calibration test
                instrument.
              </>
            }
            cite="Source: Electricity at Work Regulations 1989 (SI 1989/635), Reg 4 — verbatim from legislation.gov.uk."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Reg 14 — live working, the narrow gateway</ContentEyebrow>

          <ConceptBlock
            title="The three-test must be evidenced in writing"
            plainEnglish="Safe isolation is the default — that's the L2 rule and it's still the rule at L3. Reg 14 is the narrow gateway out of that default. Three conditions, all must be met simultaneously, all must be defensible in writing on a permit or RAMS."
            onSite="The HSE prosecutes Reg 14 breaches harshly because the consequences are usually fatal. Lost commercial time, customer convenience, 'we always do it live' — none of these survive scrutiny. The only situations that genuinely meet Reg 14 are things like fault-finding where a controlled live test is actually safer than dead-working, or work on systems that genuinely cannot be isolated (some life-safety circuits)."
          >
            <p>The three-test, in plain language:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Unreasonable to be dead</strong> — there's a credible reason why
                isolation isn\'t possible. &quot;Customer doesn&apos;t want power off&quot; is not
                unreasonable. &quot;Hospital ICU on this circuit, no UPS, immediate patient risk
                if isolated&quot; is.
              </li>
              <li>
                <strong>Reasonable to do it live</strong> — even if dead-working is unreasonable,
                live-working still has to be the appropriate response. Sometimes the answer is
                &quot;arrange a UPS, then isolate&quot; — not &quot;crack on live&quot;.
              </li>
              <li>
                <strong>Suitable precautions</strong> — competent person, second person where
                appropriate, insulated tools, voltage-rated PPE, controlled access, restricted
                area, time-limited permit. The full kit, not a bit of it.
              </li>
            </ol>
          </ConceptBlock>

          <RegsCallout
            source="Electricity at Work Regulations 1989 — Reg 14"
            clause={
              <>
                &quot;No person shall be engaged in any work activity on or so near any live
                conductor (other than one suitably covered with insulating material so as to
                prevent danger) that danger may arise unless — (a) it is unreasonable in all the
                circumstances for it to be dead; and (b) it is reasonable in all the
                circumstances for him to be at work on or near it while it is live; and (c)
                suitable precautions (including where necessary the provision of suitable
                protective equipment) are taken to prevent injury.&quot;
              </>
            }
            meaning={
              <>
                Three limbs joined by &quot;and&quot;. All three must be true. The HSE&apos;s
                guidance HSG85 (Electricity at Work — Safe Working Practices) sets out how
                inspectors interpret each limb. Lost commercial time and customer convenience
                don&apos;t satisfy limb (a). At L3 you should be able to recite this regulation
                from memory; it&apos;s the single most-prosecuted EAWR clause.
              </>
            }
            cite="Source: Electricity at Work Regulations 1989 (SI 1989/635), Reg 14 — verbatim from legislation.gov.uk."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Reg 16 — competence and supervision</ContentEyebrow>

          <ConceptBlock
            title="Two limbs — own knowledge OR appropriate supervision"
            plainEnglish="Reg 16 is the competence regulation. It bans engagement in work requiring technical knowledge or experience to prevent danger UNLESS you possess that knowledge yourself, OR you\'re under appropriate supervision. At L3 you sit between the two limbs."
            onSite="The L3 step: \'am I competent for this task?' becomes a real question, not a pro-forma. Honesty about what you can and can't do safely without supervision is the difference between an L3 ready to qualify and one who\'s about to cause a Reg 16 incident. Refusing a job because you don\'t yet have the competence is a Reg 16-discharging act, not a failure."
          >
            <p>Where you sit on the Reg 16 spectrum at L3:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Routine domestic install work</strong> — likely first limb (own
                knowledge) by year three, with periodic check-ins.
              </li>
              <li>
                <strong>Three-phase commercial</strong> — likely second limb (supervision)
                throughout L3.
              </li>
              <li>
                <strong>Initial verification and EIC sign-off</strong> — second limb until JIB
                Approved Electrician status; sign-off authority sits with a Qualified Supervisor.
              </li>
              <li>
                <strong>EICR coding judgement</strong> — second limb at L3; the judgement of C1,
                C2, C3, FI requires post-qualification experience.
              </li>
              <li>
                <strong>Hazardous-area work (CompEx)</strong> — neither limb covers you without
                CompEx certification; the work is restricted by separate competence rules.
              </li>
              <li>
                <strong>HV / SAP work</strong> — entirely outside the L3 scope; requires
                separate appointment and authorisation under EAWR Reg 16.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Electricity at Work Regulations 1989 — Reg 16"
            clause={
              <>
                &quot;No person shall be engaged in any work activity where technical knowledge
                or experience is necessary to prevent danger or, where appropriate, injury,
                unless he possesses such knowledge or experience, or is under such degree of
                supervision as may be appropriate having regard to the nature of the work.&quot;
              </>
            }
            meaning={
              <>
                Reg 16 doesn&apos;t define competence — it&apos;s left to be judged in context.
                HSE guidance treats &quot;competent person&quot; as someone with the appropriate
                training, technical knowledge, experience and the personal qualities to do the
                work safely. JIB grading and IET registration are common evidence routes. At L3
                the regulation is your friend — it justifies the &quot;I&apos;m not yet
                competent for this without supervision&quot; conversation.
              </>
            }
            cite="Source: Electricity at Work Regulations 1989 (SI 1989/635), Reg 16 — verbatim from legislation.gov.uk."
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>EAWR vs BS 7671 — the safe-harbour relationship</ContentEyebrow>

          <ConceptBlock
            title="Statute vs code of practice — and why both matter"
            plainEnglish="EAWR is statute; breach is criminal. BS 7671 is non-statutory; it\'s the IET\'s wiring code. The courts treat compliance with BS 7671 as evidence of having discharged the EAWR duty — that\'s the \'safe harbour'. Following the regs book is your defence; departing from it puts the burden on you to show the alternative is at least as safe."
            onSite="The current edition is BS 7671:2018 + Amendment 4:2026 (A4:2026). Earlier installs to earlier amendments are still legitimate — BS 7671 isn't retrospective — but new work and significant alterations should follow the current edition. This matters at L3 because customers ask \'why is my install non-compliant?' and the answer is sometimes 'it complied with the edition in force at the time' (a Code C3 not a C2)."
          >
            <p>How the safe-harbour works in court:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Prosecution alleges EAWR breach (e.g. Reg 4(1) — system not safe).
              </li>
              <li>
                Defence shows install was designed and constructed to BS 7671 A4:2026, with full
                EIC certification and design records.
              </li>
              <li>
                Court treats BS 7671 compliance as strong evidence the SFAIRP duty was
                discharged. Burden on prosecution to show why BS 7671 wasn&apos;t enough in this
                case.
              </li>
              <li>
                Alternative: defence can&apos;t show BS 7671 compliance but can show an
                engineered alternative is at least as safe (e.g. compliance with an equivalent
                European standard, with full design justification). Burden is on the defence.
              </li>
              <li>
                Worst case: neither — install doesn&apos;t comply with BS 7671 and there&apos;s
                no engineered alternative documented. Defence is essentially impossible.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Reg 13 — safe isolation as a legal duty</ContentEyebrow>

          <ConceptBlock
            title="Lock-off, prove-test-prove and the Reg 13 audit trail"
            plainEnglish="Reg 13 is the regulation that sits behind every safe-isolation procedure. It requires adequate precautions to prevent equipment that has been made dead from becoming live during work on or near it. Lock-off, tag-out, prove-test-prove and the inspection of the isolation point are the practical discharges of that duty."
            onSite="The L3 step beyond L2: knowing that &apos;skipping the prove-test-prove because I just isolated 30 seconds ago&apos; is a Reg 13 breach in itself, regardless of whether the circuit was actually re-energised. The HSE prosecutes Reg 13 breaches when an incident exposes a missing isolation step — the absence of the prove is the offence."
          >
            <p>The defensible safe-isolation sequence at L3:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Identify</strong> — the correct circuit, including any unexpected spurs
                or back-fed supplies. Use the schedule, the labels, the sketch.
              </li>
              <li>
                <strong>Isolate</strong> — at the most upstream point you can safely reach.
                Switch off and remove the means of energising (fuse withdrawn or breaker locked
                in the OFF position).
              </li>
              <li>
                <strong>Lock</strong> — your own padlock through the lock-off device. Caged MCB
                lock-off, multi-lock hasp where multiple operatives.
              </li>
              <li>
                <strong>Tag</strong> — name, date, contact. Removes any doubt about whose
                isolation it is.
              </li>
              <li>
                <strong>Prove</strong> the voltage indicator on a known live source first.
              </li>
              <li>
                <strong>Test</strong> the isolated circuit dead at the point of work — line to
                neutral, line to earth, neutral to earth, all combinations.
              </li>
              <li>
                <strong>Prove</strong> the voltage indicator again on the known live source
                after testing — confirms the indicator was working throughout.
              </li>
              <li>
                <strong>Document</strong> in the job pack with photos. The photo of the
                lock-off + tag + voltage-indicator readings is your Reg 13 evidence.
              </li>
            </ol>
          </ConceptBlock>

          <RegsCallout
            source="Electricity at Work Regulations 1989 — Reg 13"
            clause={
              <>
                &quot;Adequate precautions shall be taken to prevent electrical equipment, which
                has been made dead in order to prevent danger while work is carried out on or
                near that equipment, from becoming electrically charged during that work if
                danger may thereby arise.&quot;
              </>
            }
            meaning={
              <>
                Reg 13 is the legal grounding for the safe-isolation procedure you learned at
                L2. The phrase &quot;adequate precautions&quot; is the elastic bit — it scales
                to the risk. On a 230V single-phase final circuit, lock-off + tag + prove-test-
                prove is normally adequate. On three-phase commercial distribution, multi-point
                lock-off, second-person witness and a written permit may be required to be
                adequate. The HSE&apos;s HSG85 (Electricity at Work — Safe Working Practices) is
                the practitioner reference for what counts as adequate in each case.
              </>
            }
            cite="Source: Electricity at Work Regulations 1989 (SI 1989/635), Reg 13 — verbatim from legislation.gov.uk."
          />

          <SectionRule />

          <ContentEyebrow>Reg 12 and Reg 15 — isolation means and working space</ContentEyebrow>

          <ConceptBlock
            title="The two clauses Reg 13 depends on"
            plainEnglish="Reg 13 (precautions during dead working) only works if Reg 12 (means for cutting off the supply and for isolation) and Reg 15 (working space, access and lighting) are also discharged. Reg 12 is what gives you a usable isolation point. Reg 15 is what gives you the room and the light to actually do the work safely once isolated."
            onSite="On a real job: the disused single-throw switch on the ceiling void above a suspended ceiling that you can&apos;t see and can&apos;t lock is a Reg 12 problem. The 600mm-deep cupboard with the DB jammed against the back wall is a Reg 15 problem. Both are L3 things to spot during the dynamic risk assessment — and both can be the reason a job is paused before tools come out."
          >
            <p>Reg 12 and Reg 15 — what to check on arrival:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Reg 12</strong> — is there a means of cutting off the supply that you
                can actually reach, operate and lock? If not, raise it before starting.
              </li>
              <li>
                <strong>Reg 12 (isolation)</strong> — is the isolation device suitable for the
                purpose (BS EN 60947-3 isolator characteristics, lockable in the OFF position)?
              </li>
              <li>
                <strong>Reg 15 (working space)</strong> — adequate room to work without contact
                risk, including for emergency egress. The Code of Practice (BS 7671 ch 13)
                expands on this.
              </li>
              <li>
                <strong>Reg 15 (access)</strong> — ladders, steps, MEWPs as required. Restricted
                access is a Reg 15 issue, not just a comfort issue.
              </li>
              <li>
                <strong>Reg 15 (lighting)</strong> — adequate task lighting. Head torch + the
                customer&apos;s 60W bulb often isn&apos;t. Bring task lighting where needed.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where Reg 16 collides with the certification scheme</ContentEyebrow>

          <ConceptBlock
            title="Scheme registration is evidence of competence, not authority by itself"
            plainEnglish="Reg 16 is satisfied by competence (limb 1) or by appropriate supervision (limb 2). Scheme registration — NICEIC, NAPIT, Stroma, ELECSA — is one piece of evidence the firm uses to demonstrate Reg 16 competence to the world. But scheme registration belongs to the FIRM and is underwritten by a specific Qualified Supervisor; an L3 apprentice working for a registered firm doesn&apos;t inherit Qualified Supervisor authority by association."
            onSite="The L3 trap: the firm&apos;s NICEIC sticker on the van doesn&apos;t make you NICEIC-competent for sign-off purposes. The Qualified Supervisor (named individual on the firm&apos;s registration) is the one whose competence the scheme audits. Sign-off on EICs / EICRs / Minor Works / completion certs sits with that named individual — not with you because you&apos;re the operative who did the work."
          >
            <p>How scheme registration interacts with Reg 16:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Firm registration</strong> — held by the firm; audited annually; covers
                a defined scope (e.g. domestic, commercial, industrial).
              </li>
              <li>
                <strong>Qualified Supervisor (QS)</strong> — named individual whose competence
                underwrites the firm&apos;s registration. QS holds AM2 / AM2S / Approved
                Electrician status.
              </li>
              <li>
                <strong>Operatives</strong> — work under the QS&apos;s scheme. Their competence
                is judged in context — apprentice / Approved / Supervisor.
              </li>
              <li>
                <strong>Sign-off</strong> — certificates are signed by someone with the
                competence to underwrite the work. At L3 you typically don&apos;t sign-off
                certificates; you contribute to the test results that the QS or Approved
                Electrician then signs.
              </li>
              <li>
                <strong>Building Regs Approved Doc P</strong> — for notifiable dwelling work the
                Competent Person Scheme registration replaces the Building Control notification.
                The scheme certificate is what the customer receives.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <CommonMistake
            title="Treating EAWR Reg 14 as a 'just be careful' rule"
            whatHappens={
              <>
                Apprentice on a commercial DB upgrade is told by the contracts manager
                &quot;just work it live, the customer can&apos;t lose the trading floor for
                an hour&quot;. They put on rubber gloves and crack on. A flash-over from
                a slipped screwdriver triggers an arc-flash that puts the apprentice in
                hospital with second-degree burns. HSE prosecutes the firm under Reg 14 and
                the contracts manager personally under HASAWA s.7. Defence offered:
                &quot;commercial necessity&quot;. Court rejects: lost trading time isn&apos;t
                &quot;unreasonable&quot; under Reg 14(a).
              </>
            }
            doInstead={
              <>
                Treat the three-test seriously. If the work can be done dead with reasonable
                planning (out-of-hours, temporary supply, UPS, customer disruption), it
                must be done dead. Document the three-test in writing on the permit if
                live-working is genuinely the only safe option. &quot;We&apos;ve always done it
                this way&quot; is not a Reg 14 defence; the HSE has prosecuted firms with
                decades of incident-free live-working when one event finally went wrong.
              </>
            }
          />

          <CommonMistake
            title="Signing off work you're not yet competent to certify"
            whatHappens={
              <>
                L3 apprentice is left on site by the supervisor and asked to sign the
                initial verification certificate for a small board change. They sign it.
                Three weeks later the customer reports an intermittent trip; the EICR
                discovers a polarity error on the new neutral. HSE asked who signed the
                cert; the apprentice did. Reg 16 breach (incompetent sign-off), forgery
                question on the cert (the apprentice isn&apos;t a Qualified Supervisor),
                firm&apos;s registration with NICEIC put at risk.
              </>
            }
            doInstead={
              <>
                Sign-off is the act of a competent qualified person. At L3 you can carry
                out the verification tests under supervision and you can record the
                results, but the certificate itself is signed by the person whose
                competence underwrites it. If the supervisor isn&apos;t available, the work
                isn&apos;t finished — escalate to the firm&apos;s Qualified Supervisor or
                postpone the energisation. Reg 16 is not insulted by an honest &quot;not
                today&quot;.
              </>
            }
          />

          <Scenario
            title="Live-working pressure on a hospital lighting circuit"
            situation={
              <>
                You&apos;re on a planned EICR + remedial visit at a small NHS surgical
                outpatients site. The clinical manager tells you they need the lighting
                circuit serving the recovery bay kept live during the day — &quot;it&apos;s
                got patients on it, we can&apos;t isolate&quot;. The remedial work needs a
                replacement RCBO swap and a couple of cable terminations re-tightened. The
                site has a backup generator but no UPS on the lighting circuit. Your
                contracts manager has emailed: &quot;just get it done, don&apos;t leave them
                without lights, do whatever it takes&quot;.
              </>
            }
            whatToDo={
              <>
                Stop and apply Reg 14 properly. Limb (a) — &quot;unreasonable for it to be
                dead&quot;: probably yes during clinical hours, but the realistic answer is
                &quot;arrange isolation outside clinical hours&quot;, not &quot;work it
                live&quot;. Limb (b) — &quot;reasonable to be at work on it live&quot;: no.
                The work involves disturbing terminations; that&apos;s exactly the kind of
                contact-risk live-working Reg 14 is designed to prevent. Limb (c) —
                &quot;suitable precautions&quot;: even with full PPE the work is high-
                consequence in a clinical environment. Defensible answer: phone the clinical
                manager, agree an out-of-hours window, isolate properly, do the work dead,
                re-energise before the next clinical session. Document the conversation.
                Email the contracts manager confirming the new plan in writing.
              </>
            }
            whyItMatters={
              <>
                This is a real fact pattern that the HSE prosecutes regularly. The clinical
                manager isn&apos;t a competent decision-maker on EAWR; the contracts manager
                isn&apos;t either; both are pushing you towards a Reg 14 breach. Your
                personal s.7 and Reg 16 duties are the brake. The hospital&apos;s clinical
                continuity matters but it&apos;s a planning problem, not an EAWR override.
                If you do the work live and a fault injures you, the patient or a clinician,
                three prosecutions follow — your firm under Reg 14, the hospital trust under
                HASAWA s.3, and you personally under s.7.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'EAWR 1989 is the electrical-specific daughter regulation under HASAWA. Breach of EAWR usually breaches HASAWA in parallel.',
              'Reg 4 splits into construction (4(1)), maintenance (4(2)) and protective equipment (4(4)). EICR is the legal mechanism for discharging Reg 4(2).',
              'Remember from L2 — Reg 13 is the safe-isolation hook. At L3 the focus shifts to Reg 14 (live working) and Reg 16 (competence).',
              'Reg 14 three-test: unreasonable to be dead AND reasonable to be live AND suitable precautions. All three. The bar is deliberately high.',
              'Reg 16 has two limbs — own knowledge OR appropriate supervision. At L3 you sit between them; honest assessment of which limb covers you for any given task is the L3 competence judgement.',
              'BS 7671 A4:2026 is the safe harbour for EAWR compliance. Following it is strong evidence of discharging the duty; departing from it puts the burden on you to prove the alternative is at least as safe.',
              "'I was told to do it live' is no defence to a Reg 14 prosecution. Live-work permits and the three-test must be evidenced in writing.",
              "Refusing a job because you're not yet competent without supervision is a Reg 16-discharging act, not a failure. Reg 16 is on your side.",
            ]}
          />

          <Quiz title="EAWR competence and supervision — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module1-section1-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                1.1 HASAWA dutyholder responsibilities
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module1-section1-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                1.3 MHSWR + CDM 2015 — the planning duty
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
