/**
 * Unit 301 — Understanding the building services engineering sector
 * Learning outcome 1 — Know the relevant trade bodies and organisations within the sector
 * Criterion 1.4 — Professional registration as an Engineering Technician
 *
 * Approach: this page separates three things learners routinely run together — a
 * qualification, a competence card and professional registration. Registration is treated
 * as an individual being recognised at a defined level of professional competence by an
 * institution, applied for by the individual, maintained through continuing professional
 * development, and freely chosen rather than required to work.
 * No institution scheme names, application fees, specific entry requirements or renewal
 * periods are asserted, and no card names, colours or validity periods are asserted,
 * because none of those details could be verified against a primary source.
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
    question: 'What is professional registration?',
    options: [
      'An individual being recognised at a defined level of professional competence by a professional engineering institution',
      'A licence issued by government that permits a person to work as an electrician',
      'A qualification awarded at the end of a college course',
      'A record kept by an employer of who is allowed to sign off work',
    ],
    correctAnswer: 0,
    explanation:
      'Registration is recognition of the individual at a defined level by an institution. It is separate from the qualification that helped you get there and separate from anything an employer issues.',
  },
  {
    id: 2,
    question: 'EngTech sits at which level of professional registration?',
    options: [
      'The technician level',
      'The chartered level',
      'The incorporated level',
      'A level below any formal recognition',
    ],
    correctAnswer: 0,
    explanation:
      'EngTech is the technician level of professional registration. Higher levels exist, and registering at technician level is a recognised step towards them.',
  },
  {
    id: 3,
    question: 'What does the JTL apprentice handbook say about completing the electrotechnical apprenticeship?',
    options: [
      'Completion is designed to be recognised by relevant Professional Engineering Institutions at the appropriate level of professional registration, EngTech',
      'Completion automatically enters every apprentice onto a professional register',
      'Completion replaces the need for any further professional development',
      'Completion is recognised only once five years of post-apprenticeship experience are logged',
    ],
    correctAnswer: 0,
    explanation:
      'The wording is designed to be recognised at the appropriate level. The apprenticeship is built with that recognition in mind, but the individual still has to apply.',
  },
  {
    id: 4,
    question: 'Who applies for professional registration?',
    options: [
      'The individual, because registration recognises that person rather than their employer',
      'The employer, on behalf of everyone in the firm',
      'The college, at the end of the final year',
      'The principal contractor, as part of site onboarding',
    ],
    correctAnswer: 0,
    explanation:
      'It is your application and your registration. An employer may support and encourage it, but the recognition attaches to you and moves with you.',
  },
  {
    id: 5,
    question: 'Registration is maintained rather than granted once. What does that mainly involve?',
    options: [
      'Continuing professional development, so that the recognition reflects a person who is still current',
      'Repeating the original apprenticeship end assessment periodically',
      'Reapplying from scratch each time you change employer',
      'Having your work inspected by the institution on every job',
    ],
    correctAnswer: 0,
    explanation:
      'Continuing professional development is part of holding registration. The point is that the recognition keeps meaning something as the work and the standards move on.',
  },
  {
    id: 6,
    question: 'Is professional registration required in order to work as an electrician?',
    options: [
      'No, it is a professional choice, unlike a competence card which is often a condition of site access',
      'Yes, no electrical work may be carried out without it',
      'Yes, but only on domestic work',
      'No, and it carries no recognised value either',
    ],
    correctAnswer: 0,
    explanation:
      'Registration is voluntary. Saying otherwise would be dishonest. Its value is recognition against a defined standard, not permission to work.',
  },
  {
    id: 7,
    question: 'Registration is described as demonstrating competence and commitment. Why does commitment feature?',
    options: [
      'Because registration is an ongoing undertaking to work to a professional standard and keep developing, not a one-off test result',
      'Because institutions need members to attend a set number of social events',
      'Because commitment means agreeing to stay with one employer',
      'Because it measures how many hours of overtime a person works',
    ],
    correctAnswer: 0,
    explanation:
      'You are being recognised as a professional who will keep working to a standard. That forward-looking undertaking is what commitment means here.',
  },
  {
    id: 8,
    question: 'What is the correct way to find out what a particular institution requires for registration?',
    options: [
      'Read the published requirements of that institution itself, because entry routes, evidence and renewal arrangements are set by the institution and change',
      'Assume the requirements are identical to your competence card application',
      'Ask a colleague who registered several years ago',
      'Assume your apprenticeship certificate is accepted without any application',
    ],
    correctAnswer: 0,
    explanation:
      'Requirements are published by each institution and they differ. Going to the published source is both the accurate answer and the one an assessor will expect.',
  },
];

export default function Lesson301_1_4() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'Professional registration is an individual being recognised at a defined level of professional competence by a professional engineering institution.',
          'EngTech is the technician level, and completion of an electrotechnical apprenticeship is designed to be recognised at that level.',
          'You apply for it yourself, you demonstrate competence and commitment, and you maintain it through continuing professional development.',
          'Its value is recognition that belongs to you rather than your employer, a defined standard you can point at, and a route towards higher levels later.',
          'It is not required in order to work as an electrician, which is exactly how it differs from a card that a site demands at the gate.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Explain what professional registration is and how it differs from a qualification and from a competence card.',
          'State that EngTech is the technician level of professional registration and describe what it recognises.',
          'Explain how completion of an electrotechnical apprenticeship relates to recognition at EngTech level.',
          'Describe what demonstrating competence and commitment means, and why registration is maintained rather than granted once.',
          'Give an honest account of why somebody would register, including the fact that registration is not required in order to work.',
        ]}
        initialVisibleCount={3}
      />

      <SectionRule />

      <ContentEyebrow>Registration, qualification and cards</ContentEyebrow>

      <ConceptBlock
        title="Three different things people confuse"
        plainEnglish="A qualification, a card and professional registration answer three different questions."
      >
        <p>
          Before anything else, get these apart in your head. Apprentices lose marks on this
          criterion because they describe registration as though it were another certificate.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>A qualification.</strong> Proof that you were assessed against a syllabus and
            passed. It is a record of an assessment.
          </li>
          <li>
            <strong>A competence card.</strong> A portable, third-party-checked claim tied to a
            discipline and level, usually used to get you through a gate.
          </li>
          <li>
            <strong>Professional registration.</strong> Recognition of you as an individual at a
            defined level of professional competence, by a professional engineering institution,
            held and maintained by you.
          </li>
        </ul>
        <p>
          The qualification is behind you. The card is about access. Registration is about standing:
          a statement that you meet a defined professional standard and intend to keep meeting it.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="What EngTech is"
        plainEnglish="The technician level of professional registration."
      >
        <p>
          Professional registration exists at more than one level. EngTech is the technician level.
          It recognises somebody who applies proven techniques and procedures competently, takes
          responsibility for their own work, and works to a professional standard.
        </p>
        <p>
          That description should sound familiar, because it is close to what a good third-year is
          being trained to be. You are not being asked to be a designer or a researcher. You are
          being asked to do skilled technical work properly, safely and to a standard somebody else
          can rely on.
        </p>
        <p>
          It is also a step rather than a ceiling. Higher levels of registration exist, and
          registering at technician level is a recognised starting point for anybody who later moves
          into design, engineering or management.
        </p>
      </ConceptBlock>

      <SectionRule />

      <RegsCallout
        source="JTL apprentice handbook"
        clause="Professional registration on completion of the apprenticeship"
        meaning="The handbook states that completion of the apprenticeship is designed to be recognised by relevant Professional Engineering Institutions at the appropriate level of professional registration (EngTech). Read that carefully: the apprenticeship has been built so that what you do in it lines up with what technician-level registration looks for. It does not mean you are registered automatically on the day you finish. You still apply, as an individual, to an institution, and you still have to demonstrate competence and commitment against that institution's published requirements."
        cite="JTL apprentice handbook"
      />

      <SectionRule />

      <ContentEyebrow>How the apprenticeship maps across</ContentEyebrow>

      <ConceptBlock
        title="Your apprenticeship is designed to line up with it"
        plainEnglish="Completion is designed to be recognised at EngTech level, but you still have to apply."
      >
        <p>
          This is the single most useful fact on the page for a third-year. The work you are already
          doing, the evidence you are already gathering and the standard you are already being held
          to were designed with technician-level recognition in mind.
        </p>
        <p>
          That has a practical consequence for how you keep your portfolio. Evidence that shows you
          taking responsibility for a job, solving a real problem, working safely and to standard,
          and reflecting on what you learned is exactly the kind of material a registration
          application draws on. Evidence that is a bare list of jobs is not.
        </p>
        <p>
          So do not treat your portfolio as a hoop. Keep it in a state where a stranger could read it
          and see a technician. That is the same test registration applies.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="301-1-4-check-1"
        question="You finish your apprenticeship. What is your professional registration position?"
        options={[
          'Completion is designed to be recognised at EngTech level, but registration is something you apply for as an individual',
          'You are automatically registered as an EngTech on completion',
          'You must wait until you hold a competence card before registration is possible',
          'Registration is arranged by your employer as part of sign-off',
        ]}
        correctIndex={0}
        explanation="The apprenticeship is designed to line up with technician-level recognition. Lining up is not the same as being registered. The application is yours to make."
      />

      <SectionRule />

      <ContentEyebrow>What you have to demonstrate</ContentEyebrow>

      <ConceptBlock
        title="Competence and commitment"
        plainEnglish="You show what you can do now, and you undertake to keep working to that standard."
      >
        <p>
          Registration is usually described as demonstrating competence and commitment. Both halves
          matter and they do different jobs.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Competence.</strong> Backward-looking evidence. What have you actually done, to
            what standard, with what responsibility, and can you show it rather than assert it.
          </li>
          <li>
            <strong>Commitment.</strong> Forward-looking undertaking. You agree to work to a
            professional standard, to keep developing, and to conduct yourself accordingly.
          </li>
        </ul>
        <p>
          That second half is why registration is not simply a certificate with a different name on
          it. A certificate records a moment. Registration is a continuing relationship with a
          standard, and it can be relinquished or lost as well as gained.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="Getting your evidence into a usable state"
        plainEnglish="Registration is evidenced, so keep records that show responsibility rather than attendance."
      >
        <p>
          Whatever the institution asks for in detail, the underlying problem is the same: a
          stranger has to read your record and conclude that you work at technician level. Most
          people fail that test not because they lack the experience but because they never wrote
          any of it down while it was happening.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Responsibility, not attendance.</strong> Record what you were accountable for on
            a job, not simply that you were on it.
          </li>
          <li>
            <strong>Problems and decisions.</strong> A fault you diagnosed, a design constraint you
            worked around, a call you made on site and why you made it.
          </li>
          <li>
            <strong>Standards applied.</strong> Which requirement or procedure governed what you
            did, and how you satisfied it.
          </li>
          <li>
            <strong>Development.</strong> Training, new systems, new equipment, and what changed in
            how you work as a result.
          </li>
        </ul>
        <p>
          Keep that record yourself, in your own hands, from now. It feeds your portfolio, it feeds
          any registration application later, and it is the only version of your career that does
          not disappear when you leave a firm.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Applying and keeping it current</ContentEyebrow>

      <ConceptBlock
        title="You apply for it, and you maintain it"
        plainEnglish="The application is yours, and so is keeping it alive."
      >
        <p>
          Registration recognises a person, so a person applies. Your employer may encourage it, may
          support the evidence gathering, may even pay. None of that makes it their registration.
        </p>
        <p>
          Maintaining it is the part people underestimate. Registration is held rather than
          collected. Continuing professional development is part of holding it: keeping up with
          changes in standards, learning new systems, taking on work that stretches you, and being
          able to show that you have done so.
        </p>
        <p>
          The logic is the same as the logic behind card renewal. A recognition that never had to be
          maintained would slowly stop describing the person holding it. Requiring development is
          how the institution keeps the recognition worth something.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>What it is worth</ContentEyebrow>

      <ConceptBlock
        title="Why it is worth having"
        plainEnglish="Recognition that is yours, measured against a standard you can name."
      >
        <p>
          Be clear-eyed about the benefits rather than romantic. There are four that hold up.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>It is independent of your employer.</strong> A good reference from a firm you
            left three years ago fades. Registration does not, and it travels with you.
          </li>
          <li>
            <strong>It is a defined standard.</strong> Saying you are experienced is an opinion.
            Being registered at a stated level points at something external that somebody else
            assessed.
          </li>
          <li>
            <strong>It is a route.</strong> Technician level is a recognised step towards higher
            levels of registration later, if your career moves that way.
          </li>
          <li>
            <strong>It carries weight.</strong> With clients, with specifiers and with colleagues,
            particularly in commercial, industrial and consultancy work where people are used to
            seeing registered engineers.
          </li>
        </ul>
        <p>
          It also does something quieter. Preparing an application forces you to write down what you
          can actually do and find the evidence for it. Most people finish that exercise knowing
          their own value more precisely than when they started.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="The honest caveat"
        plainEnglish="Registration is a choice. A card is often a condition. Do not mix the two up."
      >
        <p>
          Nobody will stop you at a gate for not being registered. You can spend a full career as a
          skilled, respected, well-paid electrician without ever applying, and plenty of very good
          people have.
        </p>
        <p>
          That is the honest distinction between this criterion and the one on card schemes. Site
          access frequently depends on holding the right card, and for agency and temporary
          self-employed operatives working for a member firm a current card is written into the JIB
          National Working Rules. Registration carries no equivalent requirement.
        </p>
        <p>
          Say that plainly in an assessment. Overselling registration as compulsory is a factual
          error, and it also misses the real argument: it is worth having because of what it says
          about you, not because somebody is forcing you.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="301-1-4-check-2"
        question="Which statement about registration and cards is accurate?"
        options={[
          'Both are legally required before any electrical work is carried out',
          'Registration replaces the need for a competence card on site',
          'A card is often a condition of site access, while registration is a professional choice that nobody requires in order to work',
          'A card is voluntary and registration is compulsory',
        ]}
        correctIndex={2}
        explanation="Cards gate access, especially for agency and temporary self-employed operatives under the JIB National Working Rules. Registration is voluntary recognition of the individual."
      />

      <SectionRule />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Describing registration as another certificate you get handed"
        whatHappens={
          <>
            An apprentice writes that when he finishes his apprenticeship he will &ldquo;receive his
            EngTech&rdquo; alongside his other certificates, and that once he has it he is set for
            life. Two things are wrong. He has not applied for anything, so nothing has been
            recognised. And he has treated a maintained registration as a one-off award, so he has
            no plan for the continuing professional development that keeps it meaningful.
          </>
        }
        doInstead={
          <>
            Write it the way it actually works. Completion of the apprenticeship is designed to be
            recognised by relevant Professional Engineering Institutions at the appropriate level of
            professional registration, EngTech. You then apply, as an individual, demonstrating
            competence and commitment against the requirements that institution publishes. If you
            are registered, you maintain it through continuing professional development. Check the
            institution&rsquo;s published requirements rather than assuming them.
          </>
        }
      />

      <CommonMistake
        title="Leaving the evidence until the day you decide to apply"
        whatHappens={
          <>
            <p>
              You decide a few years in that registration is worth having, sit down at the kitchen
              table and try to reconstruct your working life from memory. The jobs blur into one
              another. You know you took responsibility for real work and solved real problems, and
              you cannot put a decision, a standard or an outcome against any of it.
            </p>
            <p>
              People who stall here are rarely short of experience. They simply never wrote any of
              it down while it was happening, and the records that would have shown it sit in a
              former employer&rsquo;s filing cabinet you no longer have access to.
            </p>
          </>
        }
        doInstead={
          <>
            <p>
              Keep the record yourself, from now, in your own hands. Write what you were
              accountable for rather than that you were on the job. Write the fault you diagnosed,
              the constraint you worked around, the call you made on site and why you made it.
              Write which requirement or procedure governed the work and how you satisfied it, and
              write what changed in how you work after training or a new system.
            </p>
            <p>
              It costs a few minutes a week and it does three jobs at once: it feeds your portfolio
              now, it feeds an application later, and it is the only version of your career that
              does not disappear when you leave a firm.
            </p>
          </>
        }
      />

      <SectionRule />

      <Scenario
        title="Two years out, and a decision in Wrexham"
        situation={
          <>
            You finished your apprenticeship two years ago and you are working for a contractor in
            Wrexham, mostly commercial fit-out and a growing amount of work on a couple of industrial
            sites. A consultant you deal with regularly is registered and mentions it. You look into
            it. The application will cost you money you would rather spend, and several evenings
            pulling evidence together after full days on site. Nobody at work has asked you to do it,
            and none of your sites care whether you are registered. Meanwhile a mate the same age
            says it is a waste of time because it does not get you through a single gate. He is right
            about the gates, and you still cannot decide.
          </>
        }
        whatToDo={
          <>
            Separate the question from the noise. First, be honest that registration is not required
            to work, so this is a choice about standing and not about permission. Then ask what you
            want in five years: if any part of that is design, supervision, consultancy or working
            for yourself with commercial clients, recognition that is independent of your current
            employer is worth real money. Read the published requirements of the institution you
            would apply to rather than guessing what they want, and check what your employer supports.
            Gather the evidence from work you are already doing rather than inventing a project for
            it. If you go ahead, plan the continuing professional development from the start, because
            registration is maintained rather than granted once.
          </>
        }
        whyItMatters={
          <>
            The cost is real and so is the benefit, and pretending either away helps nobody. Your
            mate is right that no gate in Wrexham will ask for it. What he is missing is that the
            gate is not the only audience. A client choosing between two contractors, a consultant
            deciding whose word to take on site, and an employer deciding who supervises the next job
            are all making judgements about standing. Registration is a defined standard you can
            point at, assessed by somebody other than the firm currently paying you, and it stays
            yours when the firm does not.
          </>
        }
      />

      <SectionRule />

      <InlineCheck
        id="301-1-4-check-3"
        question="Why is continuing professional development part of holding registration?"
        options={[
          'Because institutions require a fixed number of courses each year from every member',
          'Because it replaces the need to hold a competence card',
          'Because development hours are reported to the Health and Safety Executive',
          'Because registration is maintained rather than granted once, so it has to keep describing somebody who is current',
        ]}
        correctIndex={3}
        explanation="Registration is an ongoing recognition. Development is how it keeps meaning something as standards, systems and the work itself change."
      />

      <SectionRule />

      <FAQ
        items={[
          {
            question: 'What exactly do I have to submit, and what does it cost?',
            answer:
              'Requirements, evidence, fees and renewal arrangements are set by each institution and they change, so read the published requirements of the institution you would apply to. What you can rely on generally is the shape: you apply as an individual, you evidence competence at the level you are claiming, you give an undertaking about professional conduct and development, and you maintain the registration afterwards.',
          },
          {
            question: 'Is EngTech the same thing as a competence card?',
            answer:
              'No. A card is a portable claim tied to a discipline and level that a site can check at a gate, and it is often a condition of access. Registration is recognition of you as a professional at a defined level by an institution, and nobody requires it to let you work. You can hold either, both or neither, and they are assessed by different bodies for different purposes.',
          },
          {
            question: 'Does registration let me sign off work that I could not sign off before?',
            answer:
              'No. Who may certify particular work is governed by competence for that work and by the arrangements that apply to it, not by whether you appear on a professional register. Registration is recognition of professional standing. It does not by itself grant any new authority on site.',
          },
          {
            question: 'Should I apply as soon as I finish, or wait?',
            answer:
              'Completion of the apprenticeship is designed to be recognised at EngTech level, so finishing is a sensible point to look at it seriously. The practical answer depends on your evidence: if you can show responsibility for real work at the standard claimed, you are in a good position. Read the published requirements, look honestly at what you can evidence, and apply when those two line up.',
          },
        ]}
      />

      <SectionRule />

      <KeyTakeaways
        points={[
          'Professional registration is an individual being recognised at a defined level of professional competence by a professional engineering institution.',
          'It is separate from a qualification, which records an assessment, and from a competence card, which is about verified access.',
          'EngTech is the technician level of professional registration, and higher levels exist above it.',
          'Completion of an electrotechnical apprenticeship is designed to be recognised by relevant Professional Engineering Institutions at EngTech level.',
          'Registration is applied for by the individual, not issued by an employer or a college.',
          'It is about demonstrating competence and commitment: evidence of what you have done, and an undertaking about how you will work.',
          'It is maintained rather than granted once, with continuing professional development as part of holding it.',
          'It is not required in order to work as an electrician, so it is a professional choice made for recognition, standing and the route to higher levels.',
        ]}
      />

      <SectionRule />

      <ContentEyebrow>Check yourself</ContentEyebrow>
      <Quiz questions={quizQuestions} title="Professional registration as an Engineering Technician — check yourself" />
    </div>
  );
}
