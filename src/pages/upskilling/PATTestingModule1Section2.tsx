import { ArrowLeft, ChevronLeft, ChevronRight, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  LearningOutcomes,
  ContentEyebrow,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'patm1-s2-eawr-scope',
    question: 'Which of the following is OUTSIDE the scope of EAWR 1989?',
    options: [
      'A 230 V kettle in a staff kitchenette.',
      'A 110 V site transformer powering hand tools.',
      'A purely battery-operated cordless drill at 18 V dc, used at work (battery only, charger not connected).',
      'A 400 V three-phase mobile welder.',
    ],
    correctIndex: 2,
    explanation:
      'EAWR Reg 2(1) defines "electrical equipment" broadly, but the courts and HSE guidance generally treat pure battery-only equipment without an integrated mains connection as outside the EAWR scope while in battery use. The moment the charger is plugged in (the charger is mains-powered electrical equipment), EAWR engages. The IET CoP §3.2 covers chargers and battery equipment together; the EAWR boundary turns on whether mains energy is involved.',
  },
  {
    id: 'patm1-s2-puwer-link',
    question:
      'A site grinder with a frayed flex causes injury. Which TWO statutory regimes are likely to be cited together by the HSE inspector?',
    options: [
      'BS 7671 Reg 643 and CDM 2015 Reg 13.',
      'EAWR 1989 Reg 4(2) (system maintenance) AND PUWER 1998 Reg 5/6 (work-equipment maintenance and inspection).',
      'EAWR Reg 14 and HSWA s.6.',
      'PUWER Reg 4 only.',
    ],
    correctIndex: 1,
    explanation:
      'Portable site equipment sits inside both the EAWR (electrical-specific maintenance duty) and PUWER (work-equipment-specific maintenance and inspection) regimes. The HSE will almost always cite both because each tightens the burden in a different way: EAWR covers the electrical danger, PUWER covers the equipment-as-work-tool.',
  },
  {
    id: 'patm1-s2-soFar',
    question:
      'What does "so far as is reasonably practicable" mean as a legal test, in the context of EAWR Reg 4(2)?',
    options: [
      'Whatever the duty-holder considers reasonable.',
      'A balancing test (Edwards v National Coal Board, 1949): the cost / time / trouble of the precaution is weighed against the risk it prevents. The duty-holder must show the balance was struck — and the burden of proof reverses onto the duty-holder where the matter is in their knowledge (HSWA s.40).',
      'The same as "absolutely safe".',
      'A subjective test based on the duty-holder industry.',
    ],
    correctIndex: 1,
    explanation:
      'Edwards v NCB sets the test. HSWA s.40 reverses the burden — once the prosecution proves a duty existed, it is for the defendant to prove they did what was reasonably practicable. That is why records matter: without records, the s.40 burden is effectively impossible to discharge.',
  },
  {
    id: 'patm1-s2-section7',
    question:
      'A user employee notices visible flex damage on their work kettle and continues to use it without reporting it. After a shock incident, the HSE considers prosecution. What duty might the user themselves have breached?',
    options: [
      'EAWR Reg 4(2) — they are not the duty-holder.',
      'HSWA 1974 s.7 — the duty of every employee to take reasonable care for their own and others safety, and to co-operate with the employer arrangements (including reporting defective equipment).',
      'PUWER Reg 6 — only the employer has duties.',
      'No duty — only the employer can be prosecuted.',
    ],
    correctIndex: 1,
    explanation:
      'HSWA s.7 places duties on employees too. Continuing to use visibly damaged equipment in defiance of the employer arrangements is a s.7 breach. The user-check pillar of HSG107 is the practical bridge between the employer s.2 duty and the employee s.7 duty.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'EAWR 1989 Reg 4(2) reads "all systems shall be maintained so as to prevent, so far as is reasonably practicable, such danger". What does "system" include in this regulation?',
    options: [
      'Only the fixed installation.',
      'Only the appliance itself.',
      'Per Reg 2(1), "system" means an electrical system in which all the electrical equipment is, or may be, electrically connected to a common source of electrical energy — covering generation, distribution, fixed installation, AND the connected appliance, its flex, plug and connectors.',
      'Only equipment over 50 V.',
    ],
    correctAnswer: 2,
    explanation:
      'Reg 2(1) is the definitional gateway. The breadth of "system" is what makes Reg 4(2) the workhorse of PAT — it pulls in the appliance and its supply lead alongside the fixed wiring. Treating the appliance as outside the system is a misreading.',
  },
  {
    id: 2,
    question: 'HSWA 1974 s.40 is critical to PAT-related prosecutions. What does it do?',
    options: [
      'It defines "employee".',
      'It reverses the burden of proof: once the prosecution has proved a duty, it is for the defendant to prove that it was not reasonably practicable to do more than was in fact done. This makes records the practical demonstration of compliance.',
      'It sets a fixed annual testing interval.',
      'It exempts low-risk environments.',
    ],
    correctAnswer: 1,
    explanation:
      's.40 is the reason HSG107 §22-25 emphasises records. Without contemporaneous records of risk-assessed frequencies, formal visual inspections, instrument readings and defect handling, the s.40 reverse burden is effectively impossible to discharge — leaving a duty-holder with a de facto strict-liability outcome.',
  },
  {
    id: 3,
    question:
      'PUWER 1998 Reg 5(1) requires every employer to ensure work equipment is maintained in efficient working order and good repair. How does Reg 5 differ from EAWR Reg 4(2)?',
    options: [
      'They are identical.',
      'EAWR Reg 4(2) is electrical-specific (the danger to be prevented is electrical danger); PUWER Reg 5 is work-equipment-specific (the duty is "efficient working order and good repair", regardless of the cause of failure). They overlap on portable electrical equipment but apply different tests.',
      'PUWER applies only to mechanical equipment.',
      'EAWR is for fixed wiring only; PUWER is for everything else.',
    ],
    correctAnswer: 1,
    explanation:
      'Each regulation imposes a different lens. The EAWR lens is the electrical danger; the PUWER lens is the equipment function as a work tool. A defect that causes the kettle to scald an employee is a PUWER Reg 5 issue; a defect that causes it to shock an employee is both Reg 5 and EAWR Reg 4(2).',
  },
  {
    id: 4,
    question:
      'PUWER 1998 Reg 6 requires inspection of work equipment. Which work equipment falls within Reg 6, in the context of portable electrical equipment?',
    options: [
      'All work equipment, regardless of risk.',
      'Equipment whose safety depends on installation conditions, OR equipment exposed to conditions causing deterioration liable to result in dangerous situations. In practice, this captures most portable electrical equipment in workplace use.',
      'Only equipment over 1 kW.',
      'Only equipment leased from a third party.',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 6(1)(a) and 6(1)(b) set the trigger. Portable electrical equipment in workplace service almost always satisfies (b) — it is moved, plugged, unplugged, exposed to dust, moisture or mechanical handling. Reg 6(2) requires the inspection to be at "suitable intervals" and recorded.',
  },
  {
    id: 5,
    question:
      'A duty-holder argues that PUWER Reg 6 inspection records are unnecessary because they have a comprehensive PAT regime. Why is that argument legally weak?',
    options: [
      'It is not — PAT records satisfy PUWER Reg 6 by themselves.',
      'PAT records made under HSG107 / IET CoP guidance generally DO satisfy PUWER Reg 6 — but only if they include the matters Reg 6(2) requires (date, identity of inspector, results, defects, action taken). Records that are only pass labels do not satisfy Reg 6(2).',
      'PUWER does not apply to electrical equipment.',
      'PUWER inspection records must be on paper.',
    ],
    correctAnswer: 1,
    explanation:
      'PUWER Reg 6(2) and (3) prescribe what an inspection record must contain. A well-constructed PAT programme produces records that satisfy both EAWR (electrical danger discharged) and PUWER (work-equipment inspected). A label-only programme satisfies neither.',
  },
  {
    id: 6,
    question:
      'HSWA 1974 s.3(1) imposes a duty on every employer to conduct their undertaking so that "persons not in his employment who may be affected" are not exposed to risks to their health or safety. How does s.3 connect to PAT in a contractor / sub-contractor context?',
    options: [
      's.3 only applies to large companies.',
      'A contractor bringing portable equipment onto a third-party site engages s.3 — the contractor must protect the site own employees and any other contractors from defects in the equipment they bring. The site occupier likewise owes s.3 duties to contractor employees.',
      's.3 is irrelevant to electrical equipment.',
      's.3 has been superseded by CDM 2015.',
    ],
    correctAnswer: 1,
    explanation:
      's.3 is the bridge between an employer s.2 duty (to its own employees) and the practical reality of multi-employer workplaces. CDM 2015 reinforces it for construction; PUWER and EAWR remain active. For PAT, s.3 is the reason a site "we hire competent contractors" defence is incomplete — the duty travels with both parties.',
  },
  {
    id: 7,
    question:
      'EAWR 1989 Reg 16 defines competence: "no person shall be engaged in any work activity where technical knowledge or experience is necessary to prevent danger… unless he possesses such knowledge or experience". How does Reg 16 affect who can perform PAT?',
    options: [
      'Anyone can perform PAT — Reg 16 does not apply.',
      'PAT involves work on electrical systems where technical knowledge or experience is necessary to prevent danger. Reg 16 means the person performing the test must be competent for the scope of equipment and environment they are testing — knowledge, training and experience as set out in IET CoP §13.',
      'Only registered electricians can perform PAT.',
      'Reg 16 applies only to high-voltage work.',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 16 is the legal basis for the IET CoP §13 competence framing. There is no specific qualification mandated, but the duty-holder must be able to demonstrate the inspector competence is matched to the scope of the work — a 2377-22 holder with no exposure to industrial environments is not competent to test those environments.',
  },
  {
    id: 8,
    question:
      'A workplace electrical fatality is investigated by the HSE. The duty-holder produces excellent risk assessments, frequencies, and label records — but cannot produce instrument readings or defect logs. Which legal test fails?',
    options: [
      'No test fails — labels are sufficient.',
      'The HSWA s.40 test fails. The defendant cannot prove they did what was reasonably practicable, because absent numerical readings and defect records there is no contemporaneous evidence the regime actually operated. Pass labels alone are not records of what was inspected, by whom, with what instrument, against what acceptance values.',
      'The PUWER Reg 6 test passes regardless.',
      'EAWR Reg 4(2) does not apply to fatalities.',
    ],
    correctAnswer: 1,
    explanation:
      'This is the classic gap. The duty-holder appears to have a programme on paper but cannot evidence its operation. HSWA s.40 reverses the burden onto them, and the missing evidence converts the prosecution case into a near-certainty.',
  },
  {
    id: 9,
    question:
      'EAWR 1989 Reg 29 ("Defence") permits a defendant to escape liability for some EAWR contraventions if they prove they took "all reasonable steps and exercised all due diligence" to avoid the contravention. How does this interact with HSWA s.40?',
    options: [
      'They are mutually exclusive.',
      'They run in parallel for the regulations Reg 29 covers. HSWA s.40 reverses the burden of proving "reasonably practicable"; EAWR Reg 29 provides a separate "all reasonable steps + all due diligence" defence. Both require contemporaneous evidence of a working programme — HSG107 records and IET CoP test data are how either defence is built.',
      'Reg 29 has been repealed.',
      'Reg 29 is automatic.',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 29 is a parallel route to defence for the regulations it covers. In practice, the evidence that supports a Reg 29 defence is the same evidence that satisfies the s.40 reverse-burden test: the programme records.',
  },
  {
    id: 10,
    question:
      'The Provision and Use of Work Equipment Regulations 1998 Reg 5(2) requires that "where any machinery has a maintenance log, the log is kept up to date". Why is this provision particularly relevant to PAT?',
    options: [
      'It is not relevant — PAT is governed by EAWR only.',
      'A PAT programme in essence creates the maintenance log for portable electrical work equipment. Reg 5(2) makes keeping that log up to date a stand-alone PUWER duty — failure to maintain the log is itself a contravention, even before any defect arises.',
      'Reg 5(2) applies only to manufacturer-issued logs.',
      'Reg 5(2) is advisory, not statutory.',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 5(2) creates an independent obligation to maintain the log. For portable equipment, the PAT register / records IS the log. Letting it lapse — even if no defect has been identified — is a contravention in its own right.',
  },
];

const PATTestingModule1Section2 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Legal duties: EAWR, PUWER, HSWA | PAT Module 1.2 | Elec-Mate',
    description:
      'EAWR 1989 Reg 4(2) and Reg 16, PUWER 1998 Reg 5/6, HSWA 1974 s.2/3/7/40 — the statutory pyramid behind PAT, the reverse burden of proof, and how the records discharge each duty.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('/electrician/upskilling/pat-testing-module-1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 1
          </button>

          <PageHero
            eyebrow="Module 1 · Section 2"
            title="Legal duties — EAWR, PUWER, HSWA"
            description="The statutory pyramid behind PAT. HSWA 1974 sets the over-arching duty; EAWR 1989 narrows it to electrical danger; PUWER 1998 narrows it to work equipment. All three apply to portable equipment simultaneously, and the records that discharge them are the same records."
            tone="yellow"
          />

          <TLDR
            points={[
              'HSWA 1974 s.2 places the over-arching "so far as is reasonably practicable" duty on the employer. s.3 extends it to non-employees. s.7 puts duties on employees themselves.',
              'EAWR 1989 Reg 4(2) is the electrical-specific maintenance duty: "all systems shall be maintained so as to prevent, so far as is reasonably practicable, danger". Reg 16 sets the competence requirement.',
              'PUWER 1998 Reg 5 mandates maintenance and Reg 6 mandates inspection of work equipment. For portable electrical equipment, both apply alongside EAWR — the regimes overlap, they do not replace each other.',
              'HSWA s.40 reverses the burden of proof: once the prosecution proves the duty existed, the defendant must prove they did what was reasonably practicable. Without records, that burden is effectively unmovable.',
              'The same PAT records — register, risk assessment, formal visual, combined inspection-and-test, defect log — discharge EAWR Reg 4(2), PUWER Reg 5(2) (maintenance log) and PUWER Reg 6(3) (inspection record) simultaneously.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Cite the four statutory anchor points for PAT — HSWA s.2/3/7/40, EAWR Reg 4(2)/16/29, PUWER Reg 5/6 — and state what each adds to the duty-holder burden',
              'Explain the "so far as is reasonably practicable" balancing test (Edwards v NCB 1949) and how HSWA s.40 reverses the burden of proof',
              'Apply the EAWR Reg 2(1) definition of "system" to portable equipment and explain why the appliance, flex, plug and connectors are inside the regulation, not outside it',
              'Describe the difference between PUWER Reg 5 (maintenance) and PUWER Reg 6 (inspection), and identify when each applies to portable electrical equipment',
              'State the contents required of a PUWER Reg 6(3) inspection record and verify that a PAT programme satisfies them',
              'Identify the EAWR Reg 16 competence test and apply it to scope-matching of inspectors to equipment / environment',
              'Identify HSWA s.7 user duties and design a user-check programme that engages those duties without overreach',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>HSWA 1974 — the over-arching duty</ContentEyebrow>

          <ConceptBlock
            title="Why HSWA s.2 is the starting point of every PAT analysis"
            plainEnglish="The Health and Safety at Work etc Act 1974 is the parent statute. Every more-specific health-and-safety regulation, including EAWR and PUWER, is made under enabling powers in HSWA. When an HSE inspector or a court asks the foundational question — did the employer ensure, so far as is reasonably practicable, the safety of the employees? — they are asking an HSWA s.2 question. PAT is one of the routes by which the answer is yes."
            onSite="Read s.2(2)(a) word for word: the provision and maintenance of plant and systems of work that are, so far as is reasonably practicable, safe and without risks to health. The kettle is plant. The site grinder is plant. The IT power supply is plant. None of them are excluded."
          >
            <p>The structure of HSWA s.2 is:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>s.2(1)</strong> — the general duty of every employer to ensure, so far as is
                reasonably practicable, the health, safety and welfare at work of all employees.
              </li>
              <li>
                <strong>s.2(2)(a)</strong> — the duty extends in particular to the provision and
                maintenance of plant and systems of work.
              </li>
              <li>
                <strong>s.2(2)(c)</strong> — the duty to provide such information, instruction,
                training and supervision as is necessary. This is where user-check training under
                HSG107 lands.
              </li>
              <li>
                <strong>s.2(2)(d)</strong> — the duty to provide and maintain a place of work in a
                safe condition.
              </li>
              <li>
                <strong>s.2(3)</strong> — the duty (where there are five or more employees) to
                produce a written safety policy. PAT programmes typically appear as a sub-policy.
              </li>
            </ul>
            <p>
              s.2 frames PAT as a contributing component of a wider safety case. EAWR and PUWER then
              prescribe what the contribution must look like in detail.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Health and Safety at Work etc Act 1974 · s.2(1) and s.2(2)(a)"
            clause={
              <>
                It shall be the duty of every employer to ensure, so far as is reasonably
                practicable, the health, safety and welfare at work of all his employees. The
                matters to which that duty extends include, in particular, the provision and
                maintenance of plant and systems of work that are, so far as is reasonably
                practicable, safe and without risks to health.
              </>
            }
            meaning="Two phrases earn close reading. So far as is reasonably practicable imports the Edwards v NCB balancing test (cost / time / trouble vs risk averted). Plant and systems of work is broad enough to capture every item of portable electrical equipment in workplace service — the kettle, the IT desktop, the grinder, the floor cleaner."
          />

          <ConceptBlock
            title="HSWA s.3 — the duty to others"
            plainEnglish="An employer duty does not stop at their own employees. s.3 extends it to anyone who may be affected by their work activity — visitors, contractors, contractors employees, members of the public on site. Mutual s.3 duties are how PAT obligations propagate across multi-employer workplaces."
          >
            <p>In a typical contractor-on-site situation:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                The contractor owes s.2 to their own operatives AND s.3 to the site employees and
                any other contractors who could be affected by the contractor tools.
              </li>
              <li>
                The site occupier owes s.2 to their own employees AND s.3 to the contractor
                operatives — including verifying (proportionately, via PQQ / RAMS) that the
                contractor has a maintenance programme.
              </li>
              <li>
                CDM 2015 layers additional construction-specific duties on top, but does not
                displace s.3.
              </li>
            </ul>
            <p>
              The practical implication is that &ldquo;we hire competent contractors&rdquo; is a
              true but incomplete defence. A site occupier still owes s.3 — they cannot ignore
              obvious defects in a contractor equipment, and they should hold evidence of having
              verified the contractor programme proportionately to the risk.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="HSWA s.7 — the user duty"
            plainEnglish="Employees themselves carry duties under HSWA. s.7 requires every employee to take reasonable care for their own safety and that of others, and to co-operate with the employer safety arrangements. The user-check pillar of PAT is the practical bridge between the employer s.2 duty and the employee s.7 duty."
          >
            <p>
              s.7 is sometimes overlooked in PAT discussion. It matters for two reasons: it
              underpins the legitimacy of mandating user checks (employees must co-operate), and it
              engages the employee&rsquo;s own potential liability if they continue to use visibly
              dangerous equipment. The HSE has prosecuted under s.7 in egregious cases — the more
              common outcome is contributory consideration in civil claims.
            </p>
            <p>For PAT programme design, s.7 implies:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                User-check training must be documented (toolbox talks, intranet briefings,
                attendance logs).
              </li>
              <li>A clear route for users to report defects must exist and be known.</li>
              <li>
                Equipment withdrawn from service must be visibly tagged so a different user does not
                pick it up.
              </li>
              <li>
                Repeat failures by an individual user to act on visible damage may need to be
                addressed as a competence / disciplinary matter, not as an equipment matter.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="HSWA 1974 · s.40 (Onus of proving limits of what is practicable)"
            clause={
              <>
                In any proceedings for an offence under any of the relevant statutory provisions
                consisting of a failure to comply with a duty or requirement to do something so far
                as is practicable or so far as is reasonably practicable, or to use the best
                practicable means to do something, it shall be for the accused to prove that it was
                not practicable or not reasonably practicable to do more than was in fact done.
              </>
            }
            meaning="The reverse burden. Once the prosecution shows the duty existed, the defendant proves they did enough. Without contemporaneous records of risk-assessed frequencies, formal visual inspections and instrument readings, the defendant has no material to discharge the burden — making s.40 the silent backbone of every PAT-related prosecution."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>EAWR 1989 — the electrical-specific duty</ContentEyebrow>

          <ConceptBlock
            title="Reg 4(2) — the maintenance duty"
            plainEnglish="The Electricity at Work Regulations 1989 are the headline regulations for electrical safety at work. Reg 4(2) is the maintenance duty: all electrical systems shall be maintained so as to prevent, so far as is reasonably practicable, danger. Reg 4(2) is the regulation that PAT most directly discharges."
            onSite="Reg 4(2) is short. Read it together with Reg 2(1) (the definitions), Reg 4(1) (the construction duty), Reg 4(3) (the working practices duty) and Reg 16 (competence). Each adds layer to what so as to prevent danger requires in practice."
          >
            <p>The structure of Reg 4 is:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Reg 4(1)</strong> — all systems shall at all times be of such construction
                as to prevent, so far as is reasonably practicable, danger.
              </li>
              <li>
                <strong>Reg 4(2)</strong> — as may be necessary to prevent danger, all systems shall
                be maintained so as to prevent, so far as is reasonably practicable, such danger.
              </li>
              <li>
                <strong>Reg 4(3)</strong> — every work activity, including operation, use and
                maintenance, shall be carried out in such a manner as not to give rise, so far as is
                reasonably practicable, to danger.
              </li>
              <li>
                <strong>Reg 4(4)</strong> — any equipment provided for the purpose of protecting
                persons shall be suitable, properly maintained, and used.
              </li>
            </ul>
            <p>
              The PAT regime sits squarely under Reg 4(2). An equipment register, risk-assessed
              frequencies, formal visual records, combined inspection-and-test results and a defect
              / repair log are the practical demonstration that the maintenance duty has been
              discharged.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Electricity at Work Regulations 1989 · Reg 2(1) (definition of system)"
            clause={
              <>
                &ldquo;System&rdquo; means an electrical system in which all the electrical
                equipment is, or may be, electrically connected to a common source of electrical
                energy, and includes such source and such equipment.
              </>
            }
            meaning="The breadth of system pulls portable equipment into the EAWR. The kettle is electrical equipment; it is, or may be, electrically connected to a common source (the building supply) — so it is part of the system, and Reg 4(2) applies to it. The notion that EAWR is for fixed wiring is a misreading of Reg 2(1)."
          />

          <ConceptBlock
            title="Reg 16 — competence"
            plainEnglish="Reg 16 says no person shall be engaged in any work activity where technical knowledge or experience is necessary to prevent danger or injury, unless they possess such knowledge and experience, or are under such degree of supervision as may be appropriate. This is the legal basis for the IET CoP §13 competence framing — knowledge, training, experience matched to scope."
          >
            <p>
              Reg 16 does not mandate any specific qualification. The HSE has been deliberate in
              keeping it that way: a qualification is evidence of competence, not a substitute for
              it. The duty-holder must be able to show that the inspector competence is matched to
              the equipment and environment under test.
            </p>
            <p>In practice, scope-matching looks like this:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                Office Class II IT equipment in a low-risk environment — a trained internal staff
                member with C&amp;G 2377-22 or equivalent and supervised induction is typically
                sufficient.
              </li>
              <li>
                Construction-site 110 V transformers, hand tools and extension leads — meaningfully
                higher knowledge bar (rate-of-change of conditions, PUWER overlap, the supply
                arrangements at site distribution) and direct site experience is part of the
                competence claim.
              </li>
              <li>
                Three-phase mobile equipment, wash-down environments, hazardous areas — scope
                requires specialist competence beyond a generic PAT qualification.
              </li>
            </ul>
            <p>
              The duty-holder defendable position is to hold a competence matrix that maps each
              inspector knowledge / training / experience against each scope of equipment they are
              authorised to test, and to refresh it as scopes change.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Reg 29 — the defence"
            plainEnglish="Reg 29 provides a defence in proceedings for any contravention of Regs 4(4), 5, 8, 9, 10, 11, 12, 13, 14, 15, 16 or 25 — that the defendant took all reasonable steps and exercised all due diligence to avoid the commission of the offence. Reg 29 runs in parallel with HSWA s.40 and is satisfied by the same evidence — the programme records."
          >
            <p>
              The Reg 29 defence is not available for breach of Reg 4(1), 4(2) or 4(3) — the core
              maintenance duties — because the &ldquo;so far as is reasonably practicable&rdquo;
              qualification is built into those regulations directly. For Reg 4(2), the route to
              defence is to show that what was done was reasonably practicable; for the regulations
              Reg 29 covers, the defendant additionally has the all-reasonable-steps +
              all-due-diligence route.
            </p>
            <p>
              Both routes need the same supporting evidence: contemporaneous records of a risk-based
              programme. The records discharge the burdens; their absence imposes them.
            </p>
          </ConceptBlock>

          <Scenario
            title="The we contracted it out defence"
            situation="A workplace shock incident occurs. The duty-holder produces a contract with a national PAT testing company, dated 14 months earlier, with a list of items tested. There is no equipment register beyond the contractor list. The duty-holder argues they have discharged Reg 4(2) by engaging a competent contractor."
            whatToDo="Sub-contracting the work does not sub-contract the duty. The duty-holder defence under Reg 4(2) requires evidence that they (a) commissioned a programme proportionate to risk, (b) verified the contractor competence, (c) acted on defects identified, and (d) maintained the programme between contractor visits — i.e. user checks, formal visual where appropriate, additions to the register, and risk-assessed frequencies. The contractor line-item list is one input to that defence; on its own it is not the defence."
            whyItMatters="HSE Investigation Manual approaches always trace the duty-holder system, not just the contractor system. The we-contracted-it-out framing is one of the most common reasons Reg 4(2) prosecutions succeed — the duty-holder has under-estimated what the duty actually requires of them."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>PUWER 1998 — work-equipment duties</ContentEyebrow>

          <ConceptBlock
            title="Reg 5 — maintenance"
            plainEnglish="The Provision and Use of Work Equipment Regulations 1998 Reg 5 imposes a stand-alone duty: every employer shall ensure work equipment is maintained in efficient working order and good repair. Where any machinery has a maintenance log, the log shall be kept up to date. Reg 5 sits alongside EAWR Reg 4(2) — both apply, neither replaces the other."
          >
            <p>Reg 5 has two limbs:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Reg 5(1)</strong> — maintenance to efficient working order and good repair.
                The HSE ACOP L22 makes clear &ldquo;efficient&rdquo; here is about safety and
                health, not productivity. A kettle that boils water but has a damaged earth wire is
                not in efficient working order in the Reg 5 sense.
              </li>
              <li>
                <strong>Reg 5(2)</strong> — keeping any maintenance log up to date. For portable
                electrical equipment, the PAT register / inspection record IS the maintenance log. A
                lapsed register is itself a contravention, even before any defect materialises.
              </li>
            </ul>
            <p>
              Reg 5 differs from EAWR Reg 4(2) in lens: Reg 4(2) is about the prevention of
              electrical danger; Reg 5 is about the equipment function as a safe work tool. In
              practice they overlap, and the same records discharge both — but each adds a distinct
              layer of duty.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Reg 6 — inspection"
            plainEnglish="PUWER Reg 6 mandates inspection of work equipment whose safety depends on installation conditions or which is exposed to deteriorating conditions. Most portable electrical equipment in workplace service satisfies the trigger. The inspection must be at suitable intervals, by a competent person, with the results recorded."
          >
            <p>Reg 6 has three triggers:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Reg 6(1)(a)</strong> — equipment whose safety depends on installation
                conditions. Inspect after installation and before first use, after assembly at any
                new location.
              </li>
              <li>
                <strong>Reg 6(1)(b)</strong> — equipment exposed to conditions causing deterioration
                which is liable to result in dangerous situations. Inspect at suitable intervals,
                and after any exceptional event liable to compromise safety.
              </li>
              <li>
                <strong>Reg 6(2)</strong> — every employer shall ensure the result of an inspection
                under Reg 6 is recorded and kept until the next inspection is recorded.
              </li>
            </ul>
            <p>
              For portable electrical equipment, Reg 6(1)(b) is almost always engaged — flexes are
              repeatedly bent, plugs are repeatedly inserted and removed, equipment is moved,
              dropped, exposed to dust or moisture. The HSE expectation is that PUWER Reg 6 is
              actively running in parallel with EAWR Reg 4(2), and the records of a PAT programme
              should explicitly cover both.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="PUWER 1998 · Reg 6(1) and 6(2)"
            clause={
              <>
                Every employer shall ensure that, where the safety of work equipment depends on the
                installation conditions, it is inspected (a) after installation and before being put
                into service for the first time, or (b) after assembly at a new site or in a new
                location, to ensure that it has been installed correctly and is safe to operate.
                Every employer shall ensure that work equipment exposed to conditions causing
                deterioration which is liable to result in dangerous situations is inspected at
                suitable intervals, and each time that exceptional circumstances which are liable to
                jeopardise the safety of the work equipment have occurred, to ensure that health and
                safety conditions are maintained and that any deterioration can be detected and
                remedied in good time.
              </>
            }
            meaning="Two distinct triggers — installation conditions and deteriorating conditions — and a suitable-intervals + exceptional-circumstances obligation. The exceptional-circumstances limb is what brings extra inspections after a building flood, after a forklift crush, or after equipment has been involved in a near-miss."
          />

          <ConceptBlock
            title="Reg 6(3) — what an inspection record must contain"
            plainEnglish="PUWER Reg 6(3) is prescriptive: a record of inspection must identify the equipment, the date of inspection, the identity of the person who carried out the inspection, the matters inspected, and the result. Pass-labels alone do not meet this — they identify only the date and (sometimes) the inspector ID number. A defendable PAT record covers the full Reg 6(3) list."
          >
            <p>The Reg 6(3) checklist:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>Equipment identification — unique asset ID and description.</li>
              <li>Date of inspection.</li>
              <li>Person who carried out the inspection — name, role, competence reference.</li>
              <li>
                Matters inspected — the formal visual checklist, the test sequence applied, the
                acceptance criteria.
              </li>
              <li>
                Result — pass / fail / conditional, supported by numerical readings (continuity, IR,
                leakage, where applicable).
              </li>
              <li>Any defects found, action taken, and re-test result.</li>
            </ul>
            <p>
              A multifunction-tester print or modern PAT software output covers all of this for each
              item. The duty-holder job is to make sure the output is retained, retrievable and
              supplemented with the matters Reg 6(3) requires that the instrument cannot capture
              (formal visual results, defect actions taken).
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Treating EAWR and PUWER as alternatives"
            whatHappens="The duty-holder believes a PAT programme satisfies the regulations without distinguishing which. After an incident, they discover EAWR Reg 4(2) was discharged adequately but PUWER Reg 6(3) was not — because the records do not contain the matters-inspected detail Reg 6(3) requires. A PUWER prosecution proceeds even though the EAWR position is defendable."
            doInstead="Design the records to satisfy both regimes from the start. Every inspection record should explicitly capture: the EAWR-side electrical readings (continuity, IR, leakage), the PUWER-side mechanical / condition matters (flex condition, plug condition, casing, controls, signs of misuse), the inspector identity, the date, and the result. One record satisfies both — but only if it is designed to."
          />

          <CommonMistake
            title="Letting the maintenance log lapse"
            whatHappens="A duty-holder runs a strong programme for 18 months, then loses the in-house champion. The programme drifts. After 6 months without any new inspections, an incident occurs. PUWER Reg 5(2) — keep the maintenance log up to date — is engaged on its own as a contravention, separately from any defect that contributed to the incident. The lapsed-log finding is on the prosecution charge sheet before the actual injury investigation begins."
            doInstead="Build programme continuity into the system, not the person. Calendar reminders, scheduled handover, designated deputy, supplier-side ticketing on a service contract that fires automatically. PUWER Reg 5(2) does not care that your champion left."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The reasonably-practicable test in practice</ContentEyebrow>

          <ConceptBlock
            title="Edwards v National Coal Board (1949) — the balancing test"
            plainEnglish="The Court of Appeal in Edwards v NCB defined reasonably practicable as a balance: the cost / time / trouble of the precaution is set against the risk it averts, and if there is a gross disproportion between them — the risk being insignificant in relation to the sacrifice — the defendants discharge the onus on them. The duty-holder must show the balance was struck."
          >
            <p>The practical implications for PAT:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                The cost of additional inspections is one side of the balance, but it is rarely
                decisive — PAT is cheap relative to the risks.
              </li>
              <li>
                The wear-and-false-confidence argument under HSG107 §10 is the rare case where more
                is worse — and the duty-holder needs evidence of having considered this if they are
                testing more frequently than the IET CoP starting frequencies.
              </li>
              <li>
                The risk side of the balance is informed by environment, history, user, and
                consequence — these are the inputs to the risk assessment that drives frequency.
              </li>
              <li>
                The defendable position is that frequencies were chosen by reference to identified
                risks, with reasoning recorded, and reviewed when conditions changed.
              </li>
            </ul>
            <p>
              The Edwards test is what HSWA s.40 reverses the burden on. A duty-holder who cannot
              show the balance was struck — because no risk assessment exists, or because the
              assessment was not maintained — cannot discharge the s.40 burden. The records are the
              answer.
            </p>
          </ConceptBlock>

          <Scenario
            title="An office vs a wet-room — same equipment, different duty"
            situation="A small organisation operates an office and a small commercial wet-room (a hand-car-wash facility). Both use 13 A extension leads. The duty-holder has a single PAT regime: annual combined inspection-and-test for both. After a shock incident at the wet-room, the HSE asks how the frequency was set."
            whatToDo="The single regime is the defect. Wet-room conditions accelerate insulation breakdown, plug-pin corrosion, and cord-grip fatigue — the IET CoP §7 and Table 7.1 explicitly distinguish indoor / dry from wet, washdown, harsh environments. The defendable position is two regimes: office equipment on the IET CoP starting frequency for low-risk indoor, wet-room equipment on a substantially shorter cycle, with documented reasoning. The single annual cycle satisfies the calendar but fails the Edwards balancing test for the wet-room half of the estate."
            whyItMatters="The HSE Reg 4(2) and Reg 6 inspections look for equipment-environment matching. A flat regime applied to mixed environments is one of the most common findings and one that converts into formal enforcement quickly."
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>How the duties interlock</ContentEyebrow>

          <ConceptBlock
            title="One programme, three statutes, one set of records"
            plainEnglish="A well-designed PAT programme discharges HSWA s.2/s.3, EAWR Reg 4(2)/16/29 and PUWER Reg 5/6 simultaneously. The records are the same records — the design choice is to make sure they capture what each regime needs."
          >
            <p>The mapping:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-[13.5px] my-2">
                <thead>
                  <tr className="border-b border-white/15">
                    <th className="text-left text-white/80 py-2">Programme element</th>
                    <th className="text-left text-white/80 py-2">Discharges</th>
                  </tr>
                </thead>
                <tbody className="text-white/95">
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">Equipment register</td>
                    <td>
                      EAWR 4(2) (system identified); PUWER 5(2) (log scope); HSWA 2(2)(a) (plant
                      identified)
                    </td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">Risk-assessed frequencies</td>
                    <td>
                      HSWA s.2 reasonable-practicable; EAWR 4(2) &ldquo;as may be necessary&rdquo;;
                      PUWER 6 &ldquo;suitable intervals&rdquo;
                    </td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">User-check programme</td>
                    <td>
                      HSWA 2(2)(c) (info / training); HSWA s.7 (employee duty); EAWR 4(2)
                      (continuous monitoring)
                    </td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">Formal visual records</td>
                    <td>EAWR 4(2); PUWER 6(3); HSWA s.40 (records to discharge reverse burden)</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">Combined inspection-and-test data</td>
                    <td>EAWR 4(2) (numerical evidence); PUWER 6(3) (matters-inspected + result)</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">Defect / repair / disposal log</td>
                    <td>
                      EAWR 4(2) (action taken on defect); PUWER 5(1) (good repair); HSWA s.40 (acted
                      on findings)
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2">Inspector competence matrix</td>
                    <td>EAWR Reg 16; HSWA s.2 (suitable training); PUWER 6 (competent person)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              The single design rule that makes one programme satisfy three statutes is to capture
              the why alongside the what. The why is the risk-based reasoning that turns a calendar
              entry into evidence of having struck the Edwards balance.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'HSWA s.2 is the over-arching duty; s.3 extends it to non-employees; s.7 puts duties on employees themselves; s.40 reverses the burden of proof.',
              'EAWR 1989 Reg 4(2) is the electrical-specific maintenance duty — the regulation PAT most directly discharges. Reg 16 sets competence; Reg 29 provides the all-reasonable-steps + all-due-diligence defence for some regulations (not Reg 4 itself).',
              'EAWR Reg 2(1) defines system broadly enough to capture appliance, flex, plug and connectors — there is no fixed-wiring-only reading.',
              'PUWER 1998 Reg 5 mandates maintenance (efficient working order and good repair) and a maintenance log kept up to date. Reg 6 mandates inspection at suitable intervals with prescribed record contents.',
              'PUWER Reg 6(3) is prescriptive: equipment ID, date, inspector, matters inspected, result. A pass-label alone does not satisfy Reg 6(3) — the underlying records do.',
              'Edwards v NCB (1949) defines reasonably practicable: cost / time / trouble vs risk averted. HSG107 §10 prevents over-testing on the cost-of-precaution side.',
              'One programme, three statutes — the same records discharge HSWA s.2, EAWR Reg 4(2) and PUWER Reg 5/6 if designed to capture both the what and the why.',
              'Sub-contracting the work does not sub-contract the duty. The duty-holder remains the duty-holder; the contractor adds professional support, not legal transfer.',
            ]}
          />

          <FAQ
            items={[
              {
                question: 'Is PAT testing legally required?',
                answer:
                  'Not by name. EAWR 1989 Reg 4(2) requires the duty-holder to maintain electrical systems so as to prevent danger so far as is reasonably practicable. PUWER 1998 Reg 5/6 requires maintenance and inspection of work equipment. HSWA 1974 s.2 sits above both. PAT is the recognised industry route by which a duty-holder demonstrates these duties have been discharged for portable electrical equipment.',
              },
              {
                question: 'Who is the duty-holder for the purposes of EAWR Reg 4(2)?',
                answer:
                  'EAWR Reg 3 defines duty-holders broadly. For portable equipment in workplace use, the duty-holder is generally the employer (in respect of equipment used by employees) and the occupier (in respect of equipment in their premises). Sub-contracting the test work does not transfer the statutory duty.',
              },
              {
                question: 'How does HSWA s.40 affect a PAT-related prosecution?',
                answer:
                  's.40 reverses the burden of proof for so-far-as-is-reasonably-practicable duties. Once the prosecution proves the duty existed, the defendant must prove they did what was reasonably practicable. Without contemporaneous records of risk-assessed frequencies, formal visual inspections and instrument readings, that burden is effectively impossible to discharge.',
              },
              {
                question: 'Does PUWER apply to electrical equipment, or only mechanical?',
                answer:
                  'It applies to electrical equipment as well. PUWER Reg 2 defines work equipment broadly to include machinery, appliances, apparatus, tools or installations for use at work. A 230 V kettle in a staff kitchen is work equipment. PUWER Reg 5/6 apply alongside EAWR Reg 4(2).',
              },
              {
                question: 'What does a PUWER Reg 6(3) inspection record have to contain?',
                answer:
                  'Reg 6(3) prescribes: identification of the equipment, date of inspection, identity of the person who carried it out, the matters inspected, and the result. A modern PAT software output captures these for the electrical tests; the formal visual results and any defect actions taken should be added so the record is complete on its own.',
              },
              {
                question:
                  'If an employee continues to use visibly damaged equipment, can they themselves be prosecuted?',
                answer:
                  'Potentially under HSWA s.7. The HSE has prosecuted under s.7 in egregious cases. More commonly, s.7 is engaged in civil claims as contributory negligence and in disciplinary frameworks. The user-check pillar of HSG107 is the practical bridge between the employer s.2 duty and the employee s.7 duty — making clear what users must check and what to do if they find a defect.',
              },
              {
                question: 'Does the EAWR Reg 29 defence cover Reg 4(2)?',
                answer:
                  'No. Reg 29 covers Regs 4(4), 5, 8, 9, 10, 11, 12, 13, 14, 15, 16 and 25. Reg 4(2) has the so-far-as-is-reasonably-practicable qualification built in, so the defence to Reg 4(2) is to show the practicable steps were taken — i.e. the same evidence that would support a Reg 29 defence elsewhere, but framed as discharging the Reg 4(2) duty directly.',
              },
              {
                question: 'How does HSG107 fit into the legal pyramid — is it law?',
                answer:
                  'HSG107 is HSE guidance, not law. Following HSG107 is generally enough to demonstrate compliance with EAWR Reg 4(2); diverging from it is permissible if the alternative produces equivalent or better risk control, but the duty-holder must be able to show why. Diverging without evidence is the opposite of defensible.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Legal duties — Module 1.2" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/pat-testing-module-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 1
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/pat-testing-module-1-section-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                1.3 Equipment covered by PAT
              </div>
            </button>
          </div>

          <div className="hidden">
            <Activity />
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default PATTestingModule1Section2;
