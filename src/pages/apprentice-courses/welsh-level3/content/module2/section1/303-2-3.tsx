/**
 * Unit 303 · Criterion 2.3 — Control measures of inspectors
 *
 * Written to the criterion rather than ported: the lesson stays on what an
 * inspector can actually do the moment they walk on site — the statutory
 * powers they carry, the two notices they can serve, what each notice does to
 * the work in progress, and how an electrician is expected to behave while
 * they are there.
 *
 * Technical facts taken from the existing English teaching in
 *   level3/module1/section1/Sub6.tsx (HASAWA s.20–25, s.33, notices, FFI,
 *     Notice of Contravention, Enforcement Management Model, public register)
 *   level2/module5/section2/Sub3.tsx (enforcing authority split, s.20 powers,
 *     s.21 / s.22 appeal routes, escalation ladder, public databases)
 *
 * 🔴 Never describe this content as EAL-approved, EAL-mapped or endorsed.
 */

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
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';

const quizQuestions = [
  {
    id: 1,
    question:
      'An inspector arrives at a site unannounced and asks to come in. What is the legal position?',
    options: [
      'They may enter any premises they have reason to believe they need to enter, at any reasonable time, without a warrant.',
      'They must give at least 48 hours written notice and agree an appointment with the dutyholder before entering.',
      'They may only enter if a police officer is present and a magistrate has granted a warrant in advance.',
      'They may only look from public areas and must request everything else by post afterwards.',
    ],
    correctAnswer: 0,
    explanation:
      'HASAWA s.20 gives a right of entry at any reasonable time — and at any time where the inspector believes the situation is or may be dangerous. No warrant is needed to enter; a warrant is only needed for entry by force. Refusing entry without lawful excuse is a separate offence under s.33. The practical response at the door is to identify yourself and fetch the senior person on site.',
  },
  {
    id: 2,
    question: 'What does an improvement notice under HASAWA s.21 require?',
    options: [
      'That the contravention is remedied within the period specified in the notice, which cannot end before the appeal period has run.',
      'That all work on site stops immediately and does not restart until the inspector has returned and signed it off.',
      'That a fixed penalty is paid within 28 days, after which the matter is automatically closed.',
      'Nothing — it is an informal warning with no legal force and no right of appeal.',
    ],
    correctAnswer: 0,
    explanation:
      'Section 21 lets the inspector serve a notice where they are of the opinion that a person is contravening a statutory provision, or has contravened one in circumstances making repetition likely. The notice states the opinion, specifies the provision, gives the reasons and sets a period to remedy it. The minimum compliance period is 21 days because the notice cannot expire before the appeal window closes. Work carries on while the fix is made.',
  },
  {
    id: 3,
    question: 'What does a prohibition notice under HASAWA s.22 do to the work?',
    options: [
      'It stops the activity — immediately, or from the time stated on the notice — until the matters giving rise to the risk are remedied.',
      'It gives the dutyholder 90 days to complete the remedial work because prohibition cases are more complex.',
      'It transfers ownership of the offending equipment to the enforcing authority for the duration of the investigation.',
      'It records the breach for the file but allows the activity to continue while the remedy is planned.',
    ],
    correctAnswer: 0,
    explanation:
      'The s.22 trigger is the inspector being of the opinion that the activity involves, or will involve, a risk of serious personal injury. There is no compliance period — the activity stops. An appeal to an Employment Tribunal can be lodged within 21 days, but unlike an improvement notice appeal it does NOT suspend the prohibition. Carrying on the prohibited activity is a serious s.33 offence.',
  },
  {
    id: 4,
    question: 'Which appeal suspends the notice while the tribunal hears it?',
    options: [
      'An appeal against an improvement notice suspends it; an appeal against a prohibition notice does not.',
      'Both appeals suspend the notice, because a dutyholder cannot be penalised before a hearing.',
      'Neither appeal suspends the notice — both stay fully in force until the tribunal decides.',
      'An appeal against a prohibition notice suspends it; an appeal against an improvement notice does not.',
    ],
    correctAnswer: 0,
    explanation:
      'Both notices carry a right of appeal to an Employment Tribunal within 21 days. The improvement notice is suspended by the appeal — the clock stops while the tribunal looks at it. The prohibition notice is not, because the whole point of it is that someone could be seriously hurt today. The activity stays stopped while the appeal is heard.',
  },
  {
    id: 5,
    question: 'Under HASAWA s.25, what can an inspector do with a dangerous article or substance?',
    options: [
      'Seize it and render it harmless where it poses an imminent danger of serious personal injury.',
      'Nothing — seizure requires a separate court order obtained after the visit.',
      'Only photograph it and ask the dutyholder to keep it in a locked store.',
      'Sell it to recover the cost of the investigation from the proceeds.',
    ],
    correctAnswer: 0,
    explanation:
      'Section 25 is the seizure power. It bites where the inspector believes an article or substance is a cause of imminent danger of serious personal injury. It sits alongside the separate s.20 power to take possession of articles for examination, testing or preservation as evidence — a different purpose, a different power.',
  },
  {
    id: 6,
    question:
      'An inspector asks you to answer questions and sign a declaration of the truth of your answers. What is that?',
    options: [
      'A statutory power under HASAWA s.20 — the statement is formal evidence, usable in any later proceedings.',
      'An informal chat with no legal standing, which you can decline without any consequence.',
      'A supplier declaration confirming the equipment on site meets its product standard.',
      'A company document your employer must complete on your behalf before you may answer anything.',
    ],
    correctAnswer: 0,
    explanation:
      'Section 20(2)(j) lets the inspector require any person they reasonably believe can give relevant information to answer questions and sign a declaration of truth. It is an evidence-gathering procedure, not a conversation. Answer on what you saw, did and were told. Read the typed statement before signing, insist on corrections, initial each amendment, and take a copy.',
  },
  {
    id: 7,
    question:
      'A written Notice of Contravention lands at the office after an inspection. What has it triggered?',
    options: [
      'Fee for Intervention — the HSE recovers the inspector time spent on the material breach at an hourly rate.',
      'An automatic prosecution in the Crown Court, with no further decision to be made.',
      'The removal of the firm from every competent-person scheme it belongs to.',
      'Nothing chargeable — cost recovery only begins once a prosecution is brought.',
    ],
    correctAnswer: 0,
    explanation:
      'Fee for Intervention is triggered when an inspector identifies a material breach AND writes it up in a letter, notice or report. Verbal advice does not trigger it. The Notice of Contravention states the regulation breached, what was observed, the action expected and the itemised inspector time. It is an administrative document supporting FFI, not itself a s.21 or s.22 notice.',
  },
  {
    id: 8,
    question: 'What is the right behaviour when an inspector arrives while you are mid-job?',
    options: [
      'Stop work safely, identify yourself and your role, direct them to the senior person on site, and answer factual questions truthfully without speculating.',
      'Refuse to speak until your employer arrives, since anything you say could be held against the firm.',
      'Answer every question in as much detail as you can, guessing where you are unsure so they get a full picture.',
      'Down tools and leave site, because an inspection means all work must stop until a solicitor attends.',
    ],
    correctAnswer: 0,
    explanation:
      'Cooperation discharges the HASAWA s.7 duty and the CDM cooperation duty, and obstructing an inspector is a separate offence under s.33. If a question is outside your competence, say so rather than guessing — a guess dressed up as fact ends up in the file. Phone your supervisor and the contracts manager straight away so the firm knows an inspector is on site.',
  },
];

const faqs = [
  {
    question: 'Can a notice be served on me personally, or only on the firm?',
    answer:
      'Improvement and prohibition notices are normally served on the dutyholder responsible for the activity, which is usually the employer. But where an individual operative is the source of the breach — defeating a control, working unsafely — the inspector can also pursue that individual under HASAWA s.7 and s.33. The two are not alternatives; a notice on the firm and a charge against a person can come out of the same set of facts.',
  },
  {
    question: 'Does it matter whether the inspector is from the HSE or the council?',
    answer:
      'Not for the powers. The Health and Safety (Enforcing Authority) Regulations 1998 split premises by main activity — factories, construction sites, hospitals and schools to the HSE; offices, shops, hotels, leisure and similar to Local Authority Environmental Health Officers. Both carry the full HASAWA powers: s.20 entry and inspection, s.21 improvement notices, s.22 prohibition notices, s.33 prosecution. The name on the notice differs; the law applied does not.',
  },
  {
    question: 'How long does a notice follow the firm around?',
    answer:
      'Notices appear on the public HSE register, searchable by company name, and typically stay visible for five years. Convictions can stay longer. Procurement teams check the register during pre-qualification, insurers check it at renewal, and framework agreements routinely require disclosure of any notice in the past five years or more. The commercial cost often outstrips the cost of the remedial work itself.',
  },
  {
    question: 'If a prohibition notice is served, when can we start again?',
    answer:
      'When the matters specified in the notice have been remedied and the inspector is satisfied. There is no compliance period to run down and no automatic restart date — the activity stays stopped. Restarting before that point, on the basis that the job is nearly right, is a serious offence under s.33 and sits on top of whatever the original breach was.',
  },
];

export default function Lesson303_2_3() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'An inspector arriving on site carries statutory powers, not requests. HASAWA s.20 gives entry at any reasonable time without a warrant, plus examination, photographs, measurements, samples, possession of articles, statements and document production.',
          'Two notices do the heavy lifting. An improvement notice under s.21 requires the contravention to be remedied within a specified period; the work carries on while it is fixed.',
          'A prohibition notice under s.22 stops the activity — immediately or from a stated time — because the inspector judges there is a risk of serious personal injury. It stays stopped even if the firm appeals.',
          'Section 25 lets the inspector seize and render harmless an article or substance that is a cause of imminent danger of serious personal injury. Section 33 makes obstruction, false statements and failing to comply with a notice separate offences.',
          'Your job on the day is to cooperate, identify yourself, fetch the senior person, answer factual questions truthfully and notify the firm. What you say shapes what the inspector writes down.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'State the statutory powers an inspector exercises under HASAWA s.20 and explain what each one allows them to do on a live job.',
          'Distinguish an improvement notice under s.21 from a prohibition notice under s.22 by trigger, effect on the work, compliance period and appeal route.',
          'Explain what happens to the work in progress while each notice is in force, and what has to happen before a prohibited activity can restart.',
          'Describe the seizure power under s.25 and how it differs from taking possession of an article for examination under s.20.',
          'Apply the correct on-site behaviour when an inspector arrives — cooperate, identify, escalate, answer factually, record what happened.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>What an inspector walks in with</ContentEyebrow>

      <ConceptBlock
        title="Statutory powers, not requests"
        plainEnglish="An inspector on your job is exercising powers granted by Part I of the Health and Safety at Work etc Act 1974. Entry under s.20, notices under s.21 and s.22, seizure under s.25, and prosecution under s.33. None of it depends on the dutyholder agreeing."
        onSite="The distinction matters the moment somebody on site says no. Declining to produce a document, refusing to answer a question, or blocking access is not a negotiating position — refusal without lawful excuse is an offence under s.33 in its own right, entirely separate from whatever brought the inspector to the door."
      >
        <p>The tools an inspector carries into a site visit:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>s.20 entry.</strong> Enter any premises they have reason to believe it is
            necessary to enter, at any reasonable time — and at any time where the situation is or
            may be dangerous.
          </li>
          <li>
            <strong>s.20 examination and investigation.</strong> Examine and investigate, and
            direct that premises or articles be left undisturbed for as long as is reasonable.
          </li>
          <li>
            <strong>s.20 evidence.</strong> Take measurements, photographs and recordings; take
            samples; take possession of articles or substances for examination, testing or
            preservation as evidence.
          </li>
          <li>
            <strong>s.20 statements.</strong> Require any person believed to hold relevant
            information to answer questions and sign a declaration of the truth of the answers.
          </li>
          <li>
            <strong>s.20 documents.</strong> Require production of books and documents, and inspect
            and copy them.
          </li>
          <li>
            <strong>s.21 improvement notice.</strong> Require a contravention to be remedied within
            a specified period.
          </li>
          <li>
            <strong>s.22 prohibition notice.</strong> Stop an activity that involves, or will
            involve, a risk of serious personal injury.
          </li>
          <li>
            <strong>s.25 seizure.</strong> Seize an article or substance that is a cause of imminent
            danger of serious personal injury, and render it harmless.
          </li>
          <li>
            <strong>s.33 offences.</strong> Prosecute for obstruction, false statements, and failure
            to comply with a notice.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Entry, examination and leaving things alone</ContentEyebrow>

      <ConceptBlock
        title="Entry without a warrant — and the direction to preserve the scene"
        plainEnglish="Entry under s.20 needs no warrant. A warrant is only required for entry by force, and the inspector can bring a constable if obstruction is expected. They can also bring any equipment or material they need with them."
        onSite="The power that surprises people is the direction to leave the premises or an article undisturbed for a reasonable period. That means you may be told to walk away from a part-dismantled board exactly as it is — no making safe, no tidying, no putting the covers back. If that leaves an exposed hazard, say so and agree how the area gets guarded; do not unilaterally start putting it right."
      >
        <p>
          The examination power runs further than looking. The inspector can investigate, and can
          dismantle equipment where that is necessary to work out what caused an event. On a fault
          investigation that can mean the very board you were working in becomes the subject of the
          examination rather than the job.
        </p>
        <p>
          Preserving the scene is not obstruction of your work, it is part of the investigation.
          The reasonable-period limit is what keeps it proportionate — an inspector cannot freeze a
          switchroom indefinitely, but they can hold it long enough to examine it properly.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="Taking things away — two different powers for two different reasons"
        plainEnglish="Section 20 lets the inspector take samples of substances, materials and atmosphere, and take possession of articles for examination, testing, or to preserve them as evidence. Section 25 is a separate power: seize an article or substance that is a cause of imminent danger of serious personal injury, and render it harmless."
        onSite="In practice the s.20 possession power is the one an electrician meets — a damaged extension lead, a faulty voltage indicator, a scorched device out of a board. The s.25 seizure power is reserved for things that are dangerous right now. Something seized under s.25 is not coming back in a usable state; rendering it harmless is the point of the power."
      >
        <p>What can go into an inspector&rsquo;s van or evidence bag:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Samples.</strong> Of substances, materials, and the atmosphere in the work area.
          </li>
          <li>
            <strong>Articles for examination.</strong> Test instruments, tools, a failed accessory,
            a length of damaged cable — taken under s.20 for examination or testing.
          </li>
          <li>
            <strong>Articles as evidence.</strong> The same power covers preservation, so an item
            may be held for a long time if a prosecution is being considered.
          </li>
          <li>
            <strong>Articles seized under s.25.</strong> Where the article or substance is a cause
            of imminent danger of serious personal injury, it can be seized and made harmless.
          </li>
          <li>
            <strong>Copies of documents.</strong> RAMS, training records, calibration certificates,
            certification files — production can be required and copies taken.
          </li>
        </ul>
        <p>
          The document side catches firms out more often than the physical side. Production can be
          required of the books and documents kept under the relevant statutory provisions, and the
          inspector can take copies. For an electrical contractor that reaches the job pack, the
          risk assessment and method statement, the safe-isolation records, the instrument
          calibration certificates and the certification files for the work. If a document exists
          and is relevant, it can be asked for; if it should exist and does not, that absence is
          itself part of what the inspector writes down.
        </p>
        <p>
          The facilities-and-assistance power completes the set. Anyone who owes a duty under the
          Act — which includes an operative through s.7 — can be required to provide the facilities
          and assistance the inspector needs to exercise their powers. In practice that is holding
          a torch, opening a panel, or walking somebody to a plant room, and it is not optional.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="Health and Safety at Work etc Act 1974 — s.20(2)"
        clause="The powers of an inspector include, at any reasonable time (or, in a situation which in his opinion is or may be dangerous, at any time) to enter any premises which he has reason to believe it is necessary for him to enter; and to require any person whom he has reasonable cause to believe to be able to give any information relevant to any examination or investigation to answer such questions as the inspector thinks fit to ask and to sign a declaration of the truth of his answers."
        meaning="Section 20(2) is the power-pack: entry without a warrant, examination and investigation, direction to leave premises or articles undisturbed, measurements, photographs and recordings, samples, possession of articles, statements under declaration of truth, production and copying of documents, and the provision of facilities and assistance. Refusing any of them without lawful excuse is an offence under s.33. The statement power is the one most operatives do not expect — it is a formal evidence-gathering procedure, not a chat."
        cite="Source: Health and Safety at Work etc Act 1974 (1974 c.37), Part I, s.20."
      />

      <InlineCheck
        id="303-2-3-check-1"
        question="An inspector attending after a switchroom incident tells you to leave the part-dismantled board exactly as it is and step away. Your instinct is to refit the covers so nobody can touch live parts. What is the right move?"
        options={[
          'Refit the covers anyway — making safe always overrides an instruction from a visitor to the site.',
          'Photograph the board yourself first, then refit the covers so you can show you left it safe.',
          'Leave the board undisturbed as directed, raise the exposure risk with the inspector immediately, and agree how the area is guarded and who is kept out.',
          'Leave the board and say nothing, because the inspector has taken responsibility for the area by giving the direction.',
        ]}
        correctIndex={2}
        explanation="Directing that premises or an article be left undisturbed for a reasonable period is an express power under HASAWA s.20, so overriding it is obstruction. That does not mean you swallow a live hazard in silence. Tell the inspector what the exposure is, agree a barrier and an exclusion, and record what was agreed. Preserving the evidence and controlling the risk are not in conflict once somebody says out loud what the risk is."
      />

      <SectionRule />

      <ContentEyebrow>The improvement notice — fix it, keep working</ContentEyebrow>

      <ConceptBlock
        title="Section 21 — a period to put it right"
        plainEnglish="An improvement notice is served where the inspector is of the opinion that a person is contravening a statutory provision, or has contravened one in circumstances that make continuation or repetition likely. The notice states that opinion, specifies the provision, gives the reasons, and requires the contravention to be remedied within a specified period."
        onSite="The work does not stop. That is the whole character of an improvement notice — it names a defect and gives time to cure it. What changes on site is that a dated obligation now exists and somebody has to own it. If the notice concerns something you touch daily, make sure you know what the fix is and when it lands, because working on regardless of it is how a single notice becomes a prosecution."
      >
        <p>The mechanics of an improvement notice:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Compliance period.</strong> Minimum 21 days, because the notice cannot expire
            before the appeal window has run. The inspector can specify longer where the remedy is
            more involved.
          </li>
          <li>
            <strong>Appeal.</strong> To an Employment Tribunal, within 21 days. The appeal suspends
            the notice while it is heard.
          </li>
          <li>
            <strong>Non-compliance.</strong> Failing to comply with an unappealed notice is itself a
            criminal offence under s.33 — separate from the underlying breach.
          </li>
          <li>
            <strong>Publication.</strong> The notice goes on the public HSE notices database with
            the firm name, date, breach and compliance period.
          </li>
        </ul>
        <p>
          Read the notice properly rather than skimming it. It has to specify the provision the
          inspector says is being contravened and give particulars of the reasons. That is what
          tells the firm exactly what has to change, and it is also what an appeal would be argued
          against. A notice that names a regulation you work to every day is worth understanding
          in detail, because the remedy is likely to change how the job is done from the day it
          lands.
        </p>
        <p>
          In practice most improvement notices are accepted and complied with. Appeals are rare
          and rarely succeed, and the tribunal outcome goes on the record alongside the notice.
          The cheapest route through is almost always to fix the thing inside the period and
          evidence the fix.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="Health and Safety at Work etc Act 1974 — s.21"
        clause="If an inspector is of the opinion that a person is contravening one or more of the relevant statutory provisions, or has contravened one or more of those provisions in circumstances that make it likely that the contravention will continue or be repeated, he may serve on him a notice stating that he is of that opinion, specifying the provision or provisions as to which he is of that opinion, giving particulars of the reasons why he is of that opinion, and requiring that person to remedy the contravention within such period as may be specified in the notice."
        meaning="Improvement notice = remedy within the deadline. The specified period cannot end earlier than the period within which an appeal can be brought, which is what sets the 21-day minimum. Appeal lies to an Employment Tribunal within 21 days and suspends the notice. Failure to comply is an offence under s.33, and the notice is published on the HSE public register."
        cite="Source: Health and Safety at Work etc Act 1974 (1974 c.37), Part I, s.21."
      />

      <ContentEyebrow>The prohibition notice — the activity stops</ContentEyebrow>

      <ConceptBlock
        title="Section 22 — risk of serious personal injury, so it stops now"
        plainEnglish="A prohibition notice is served where the inspector is of the opinion that an activity involves, or will involve, a risk of serious personal injury. It states the opinion, specifies the matters giving rise to the risk, and stops the activity — immediately on service, or from a stated time where the notice is deferred."
        onSite="Unlike an improvement notice, there is no period to run down. The activity named on the notice stops, and it stays stopped until the matters specified have been remedied and the inspector is satisfied. That can mean a whole trade standing down while a scaffold, an access platform, a piece of work equipment or an unsafe working practice is put right."
      >
        <p>What makes a prohibition notice the heavier weapon:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Trigger.</strong> Risk of serious personal injury — not a regulatory breach as
            such. The inspector does not have to show a specific contravention to serve one.
          </li>
          <li>
            <strong>Effect.</strong> The activity stops on service, or from the deferred time stated
            on the notice.
          </li>
          <li>
            <strong>Appeal.</strong> Employment Tribunal within 21 days, but the appeal does NOT
            suspend the prohibition. The activity stays stopped while the tribunal decides.
          </li>
          <li>
            <strong>Restart.</strong> Only once the matters specified are remedied and the inspector
            is satisfied. There is no automatic restart date.
          </li>
          <li>
            <strong>Breach.</strong> Working in defiance of a prohibition notice is a serious s.33
            offence, carrying an unlimited fine and, on indictment, up to two years imprisonment.
          </li>
        </ul>
        <p>
          A deferred prohibition notice is the version people misread. Where the notice states a
          time rather than biting on service, the activity can continue up to that stated time and
          no further. That is not a grace period to negotiate with — it exists so that a process
          can be brought to a safe stop rather than dropped where it stands.
        </p>
        <p>
          Typical prohibition subjects in electrical work are exactly the things you would expect:
          unsafe live working that has been observed, a damaged piece of work equipment, an unsafe
          access platform, an installation left in a condition that puts people at risk. The notice
          attaches to the activity, not to the person who happened to be doing it.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="Health and Safety at Work etc Act 1974 — s.22"
        clause="If as regards any activities to which this section applies an inspector is of the opinion that, as carried on or about to be carried on by or under the control of the person on whom the notice is to be served, the activities involve or will involve a risk of serious personal injury, the inspector may serve on that person a notice. A prohibition notice shall state that the inspector is of the said opinion, and specify the matters which in his opinion give or will give rise to the said risk."
        meaning="Prohibition notice = stop. Service is the moment it bites unless the notice is deferred to a stated time. There is no compliance period; the activity does not resume until the specified matters are remedied. An appeal exists but does not suspend the notice, which is the key practical difference from s.21. Like improvement notices, prohibition notices are published on the public HSE database."
        cite="Source: Health and Safety at Work etc Act 1974 (1974 c.37), Part I, s.22."
      />

      <InlineCheck
        id="303-2-3-check-2"
        question="A prohibition notice is served on the use of a damaged mobile access platform on your site. The firm lodges an appeal to the Employment Tribunal the same afternoon. Can the platform be used while the appeal is pending?"
        options={[
          'No. An appeal against a prohibition notice does not suspend it, so the activity stays stopped until the specified matters are remedied and the inspector is satisfied.',
          'Yes. Lodging the appeal suspends the notice in the same way it suspends an improvement notice.',
          'Yes, but only for work at low level and only while a supervisor is watching.',
          'It depends on the tribunal — the platform can be used unless the tribunal issues an interim order stopping it.',
        ]}
        correctIndex={0}
        explanation="Both notices carry a 21-day right of appeal to an Employment Tribunal, and the suspension rule is the thing that separates them. An improvement notice is suspended by the appeal; a prohibition notice is not, because it was served on a judgement that someone could be seriously hurt. Using the prohibited equipment while the appeal runs is a s.33 offence in its own right, on top of the original risk."
      />

      <SectionRule />

      <ContentEyebrow>The ladder, the letter and the cost</ContentEyebrow>

      <ConceptBlock
        title="Advice, letter, notice, prosecution — and the invoice that comes with the letter"
        plainEnglish="Enforcement is graded. Verbal advice for minor or first-time issues. A formal letter for repeats or moderate issues. An improvement notice for a clear breach. A prohibition notice for an immediate serious-injury risk. Prosecution for the worst cases or for repeated non-compliance."
        onSite="Once the inspector writes anything down, the clock starts on cost recovery. Fee for Intervention bills the dutyholder for inspector time on a material breach, at an hourly rate — around £170 an hour, and check the current HSE rate. Verbal advice does not trigger it; a letter, notice or report does. A routine visit that finds nothing material costs the firm nothing."
      >
        <p>
          The document that arrives afterwards is usually a Notice of Contravention. It is not
          itself a s.21 or s.22 notice — it is an administrative document supporting FFI. It names
          the inspector, the date and location, the specific regulation alleged to have been
          breached, a factual description of what was observed, the action expected, and an
          itemised FFI invoice with payment terms and a dispute route.
        </p>
        <p>
          Behind the choice of tool sits the Enforcement Management Model — the published decision
          tool the inspector uses to compare what the benchmark required against what was actually
          done, weigh the actual or potential harm, and arrive at an initial enforcement
          expectation. It is why two inspectors looking at the same defect tend to land in the same
          place.
        </p>
        <p>What sits on each rung, and what becomes public:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Verbal advice.</strong> Minor or first-time issues. Held in the enforcing
            authority&rsquo;s own records, not published, and no Fee for Intervention.
          </li>
          <li>
            <strong>Formal letter.</strong> Repeats or moderate issues. Written, so it can trigger
            Fee for Intervention where a material breach is identified.
          </li>
          <li>
            <strong>Improvement notice.</strong> A clear contravention with time to remedy it.
            Published with the firm name, date, breach and compliance period.
          </li>
          <li>
            <strong>Prohibition notice.</strong> An immediate risk of serious personal injury.
            Published in the same way, and the immediacy is what makes it damaging on a tender
            questionnaire.
          </li>
          <li>
            <strong>Prosecution.</strong> The most serious cases or repeated non-compliance.
            Published on the convictions database with the offence, the court, the sentence and the
            date.
          </li>
        </ul>
        <p>
          Most issues stop at the lower rungs, because most firms fix them. The ones that end up
          prosecuted are usually the ones that ignored the earlier warnings — which is why the
          response to an early letter matters more than it looks at the time.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="What the notice costs after the site has moved on"
        plainEnglish="Both notices are published on the public HSE notices database, searchable by company name. Prosecutions go on the convictions database. Both are free to search and widely used."
        onSite="The people reading it are the ones who decide whether the firm works next year. Procurement teams check it at pre-qualification, insurers check it at renewal, main contractors check it before adding a firm to an approved-supplier list, and competent-person scheme bodies such as NICEIC and NAPIT monitor the databases and can take their own action. A prohibition notice on the record can cost a small contractor tier-one work for years."
      >
        <p>Where a published notice shows up later:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Pre-qualification questionnaires.</strong> Most ask whether the firm has
            received any health and safety notice in the past three or five years. The database
            makes any answer easy to check.
          </li>
          <li>
            <strong>Insurance renewal.</strong> Employer&rsquo;s and public liability premiums rise;
            some insurers decline.
          </li>
          <li>
            <strong>Framework agreements.</strong> Public-sector and major private frameworks can
            exclude firms carrying certain notices or convictions.
          </li>
          <li>
            <strong>Scheme membership.</strong> Registration bodies monitor the databases and may
            open their own disciplinary process.
          </li>
          <li>
            <strong>Customers.</strong> Clients increasingly search a contractor name before
            engaging.
          </li>
        </ul>
        <p>
          None of that is the fine. Criminal fines are not insurable — public liability and
          employer&rsquo;s liability policies do not and cannot pay them, because insuring the cost
          of breaking the law is against public policy. Insurance can cover defence costs and civil
          compensation to a victim; the penalty itself comes straight off the firm&rsquo;s bottom
          line, and the lost work that follows the published notice comes off it again.
        </p>
        <p>
          That is why the sensible target is a clean register rather than a well-argued appeal. An
          apprentice cannot control what a director signs off, but the everyday behaviours — lock
          off properly, work to the RAMS, stop when something does not match, raise it in writing —
          are what keep the firm off the database in the first place.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="303-2-3-check-3"
        question="An inspector spends most of a morning on your site and leaves having given verbal advice only — nothing written. What is the Fee for Intervention position?"
        options={[
          'FFI is charged for the whole visit, because inspector time on site is always recoverable.',
          'FFI is charged at half the hourly rate, because no formal notice was served.',
          'FFI is charged only if the firm has had a previous notice within the last five years.',
          'No FFI is charged. Cost recovery is triggered by a material breach being written up in a letter, notice or report — verbal advice does not trigger it.',
        ]}
        correctIndex={3}
        explanation="Fee for Intervention recovers inspector time spent on a material breach, and the trigger is the inspector formally writing it down. That is why a compliant visit — or one ending in verbal advice — costs the firm nothing, while a visit that produces a Notice of Contravention can run into thousands. The written record is both the trigger and the evidence."
      />

      <ConceptBlock
        title="How you behave while the inspector is standing next to you"
        plainEnglish="Cooperation is a duty, not a courtesy. HASAWA s.7 requires every employee to take reasonable care and to co-operate with the employer so far as is necessary for the employer to meet their own duties, and the CDM cooperation duty pulls in the same direction on a construction site."
        onSite="The sequence is short. Stop work safely. Give your name and role. Fetch the senior person on site. Answer what you actually know. Say so where you do not know. Phone your supervisor and the contracts manager. Write down afterwards what was asked and what you said, with the time and the names."
      >
        <p>
          Anything you say can end up in evidence, which is exactly why guessing is the dangerous
          option and honesty about the gaps is the safe one. Inspectors expect an operative not to
          know the answer to a question about company policy or another trade&rsquo;s work — they
          do not expect an invented answer. If you are asked for a formal statement, read it
          carefully before signing, insist on changes where it does not match what you said,
          initial each amendment and take a copy away with you.
        </p>
        <p>
          Nothing in that sequence involves advocacy. You are not there to defend the firm, argue
          about the coding of a defect, or speculate on how something came to be the way it is. The
          firm&rsquo;s health and safety manager or solicitor handles the substantive engagement
          once they arrive.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Trying to talk the inspector out of writing the notice"
        whatHappens={
          <>
            An apprentice is on site when the inspector arrives and finds a partially isolated board
            with no lock-off fitted. Trying to head it off, they explain that the lock normally goes
            on but the lock is in the van and it is only for a few minutes. The inspector writes the
            notice anyway and records the admission. The firm now has a notice on the public
            register AND a contemporaneous note that the breach was knowing rather than accidental
            — which pushes the culpability assessment in exactly the wrong direction.
          </>
        }
        doInstead={
          <>
            Cooperate, identify yourself, direct the inspector to the senior person on site. Answer
            factual questions truthfully, but do not volunteer speculation, opinion, or admissions
            about how things are normally done on other jobs. The firm&rsquo;s response is handled
            by the health and safety manager or the solicitor. Your job on the day is to be
            cooperative and factual, and to phone your supervisor as soon as the inspector is
            through the door.
          </>
        }
      />

      <CommonMistake
        title="Treating a stopped activity as a pause you can judge for yourself"
        whatHappens={
          <>
            A prohibition notice stops the use of a damaged access tower. Overnight the site team
            replaces the broken brace and swaps a missing toe board. Next morning somebody decides
            the tower is obviously fine now and puts it back into use so the programme does not
            slip. The inspector returns, finds the tower in service, and the firm is now facing a
            s.33 charge for working in defiance of a prohibition notice on top of the original
            defect.
          </>
        }
        doInstead={
          <>
            A prohibition notice ends when the matters specified in it are remedied and the
            inspector is satisfied — not when the site thinks the job is done. Fix the defects,
            record what was done with photographs and part details, and get confirmation before the
            activity restarts. If the programme genuinely cannot wait, that is a conversation to
            have with the inspector, not a decision to take on site.
          </>
        }
      />

      <Scenario
        title="An inspector arrives mid fault-find on a Wrexham factory switchroom"
        situation={
          <>
            You are two hours into a fault-finding visit in the switchroom of a small manufacturing
            unit in Wrexham. The affected sub-circuit is isolated and locked off, the rest of the
            board is live, you are in flame-resistant overalls using insulated tools. An inspector
            arrives on a routine visit programme and the site manager brings them straight to you.
            They want to see the RAMS, your safe-isolation evidence, your instrument calibration
            certificate and your competence record. Your supervisor is off site.
          </>
        }
        whatToDo={
          <>
            Stop work safely — do not leave anything part-dismantled if you can bring it to a stable
            state without disturbing anything you have been asked to leave. Give your name and your
            role. Produce what you have: the RAMS from the job pack, the lock-off photograph and
            voltage-indicator readings, the calibration certificate from the instrument case, your
            competence card. Be plain about what you have done — the sub-circuit is isolated, here
            is the evidence, the remainder of the board is live and that is why the guarding and the
            personal protective equipment are as they are. Phone your supervisor and the contracts
            manager immediately so the firm knows. If you are asked something outside your
            competence, say you do not know and name who can answer it. If you are asked for a
            statement, read it before you sign, correct anything that does not match what you said,
            initial the changes and take a copy.
          </>
        }
        whyItMatters={
          <>
            The inspector forms a view of the whole firm&rsquo;s safety culture from about half an
            hour with whoever happens to be on site. A cooperative operative who produces the paper
            calmly makes a very different impression from one who argues or goes quiet. What you
            say during the visit can be used as evidence later, so accuracy is protection, not
            exposure. Cooperating discharges your own duty under HASAWA s.7, and obstructing the
            inspector would be a separate offence under s.33. Telling the truth to a regulator is
            protected — the firm cannot lawfully penalise you for it.
          </>
        }
      />

      <SectionRule />

      <FAQ items={faqs} />

      <SectionRule />

      <KeyTakeaways
        points={[
          'An inspector on site is exercising statutory powers under Part I of the Health and Safety at Work etc Act 1974, not asking permission.',
          'Section 20 covers entry without a warrant at any reasonable time, examination and investigation, a direction to leave things undisturbed, photographs, measurements, samples, possession of articles, statements under declaration of truth, and production of documents.',
          'An improvement notice under s.21 requires the contravention to be remedied within a specified period. The minimum period is 21 days and the work carries on while the fix is made.',
          'A prohibition notice under s.22 stops the activity — immediately or from a stated time — because of a risk of serious personal injury. It does not restart until the specified matters are remedied and the inspector is satisfied.',
          'Both notices carry a 21-day appeal to an Employment Tribunal. The appeal suspends an improvement notice; it does not suspend a prohibition notice.',
          'Section 25 allows seizure of an article or substance that is a cause of imminent danger of serious personal injury. Section 33 makes obstruction, false statements and non-compliance with a notice separate offences.',
          'Writing a material breach up in a letter, notice or report triggers Fee for Intervention. Verbal advice does not. The Notice of Contravention carries the itemised invoice.',
          'Notices and convictions are published, searchable and long-lived — and cooperating, identifying yourself, answering factually and telling the firm immediately is the whole of your job on the day.',
        ]}
      />

      <ContentEyebrow>Check yourself</ContentEyebrow>

      <Quiz questions={quizQuestions} title="Control measures of inspectors — knowledge check" />
    </div>
  );
}
