/**
 * Unit 313 — Establish and Maintain Relationships in the Building Services Engineering Sector
 * Learning Outcome 2 — Understand the procedures for supplying technical and functional
 * information to relevant people
 * Criterion 2.4 — The importance of ensuring that information provided is accurate and complete,
 * that it is provided clearly, courteously and professionally, and that copies are retained
 *
 * Approach: the criterion reads like an office poster, so this page refuses to restate it. Each
 * idea is taught through the failure it prevents — the half-truth that gets acted on, the
 * omission nobody knew to ask about, the schedule entry that misleads an electrician in 2041,
 * the handover written for the writer rather than the reader, and the query you cannot answer
 * because you kept nothing. Technical information (how it is built) and functional information
 * (what it does and how it is used) are held apart throughout, because they fail differently.
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
      'Why is a confidently worded half-truth on a handover generally more damaging than simply leaving the information out?',
    options: [
      'A half-truth gets acted on, whereas a gap usually prompts someone to ask',
      'A half-truth takes longer to write than a complete answer',
      'A gap is always picked up by the client before anyone works on the installation',
      'A half-truth cannot be corrected once the document has been issued',
    ],
    correctAnswer: 0,
    explanation:
      'Missing information announces itself — the caretaker rings you. Wrong information looks finished, so the next person isolates the wrong way, orders the wrong part, or reassures a tenant on the strength of it.',
  },
  {
    id: 2,
    question:
      'A client asks whether the whole building has been checked. You only inspected the ground floor. What makes your answer complete?',
    options: [
      'Stating what you inspected and stating plainly that the first and second floors were not covered',
      'Stating what you inspected and letting the scope be inferred from the circuits listed',
      'Saying the building was checked, because the part you did check passed',
      'Saying nothing about scope, because the client only asked about faults',
    ],
    correctAnswer: 0,
    explanation:
      'Completeness includes the negative. If you do not write down what you did not cover, the reader will assume you covered it, and that assumption becomes their record.',
  },
  {
    id: 3,
    question: 'Who decides whether a piece of information has been provided clearly?',
    options: [
      'The person receiving it, judged by whether they can act on it correctly',
      'The person writing it, judged by whether it is technically correct',
      'The contracts manager, judged by whether it matches the template',
      'The manufacturer, judged by whether it matches their literature',
    ],
    correctAnswer: 0,
    explanation:
      'Clarity is a property of the transaction, not of the sentence. Technically perfect wording that a ward sister cannot act on has failed.',
  },
  {
    id: 4,
    question:
      'Which of these is a professional way to record that the previous installation was poor?',
    options: [
      'Describe the observed condition and its effect, with no comment on who did it',
      'Note that the previous contractor was not competent to do the work',
      'Tell the client informally on site and leave it out of the written record',
      'Describe the condition and add your opinion of the firm that installed it',
    ],
    correctAnswer: 0,
    explanation:
      'Record the installation, not the installer. Observed facts are defensible; a judgement about another firm is an opinion you may have to justify, and it makes you look like the problem.',
  },
  {
    id: 5,
    question:
      'Two years after a job, a solicitor asks what the client was told about a remaining limitation. What single thing decides whether you can answer?',
    options: [
      'Whether you retained a copy of exactly what you issued, and when',
      'Whether you can remember the conversation clearly',
      'Whether the client kept their own copy of the paperwork',
      'Whether the work was signed off by a second person at the time',
    ],
    correctAnswer: 0,
    explanation:
      'Memory is not evidence and the client copy is not in your control. A retained copy, with a date, is the only thing that answers the question.',
  },
  {
    id: 6,
    question:
      'What is the practical difference between technical and functional information at handover?',
    options: [
      'Technical describes how the installation is built; functional describes what it does and how it is used',
      'Technical is written down; functional is always explained verbally',
      'Technical is for the client; functional is for the designer',
      'Technical is regulated; functional is optional courtesy',
    ],
    correctAnswer: 0,
    explanation:
      'Cable sizes, protective device ratings and test results are technical. Which switch does what, how to reset it and who to ring is functional. The same reader often needs both, written differently.',
  },
  {
    id: 7,
    question:
      'A circuit schedule entry says “Ring final — kitchen” but the circuit is actually a radial serving the kitchen and the utility room. Why does this matter years later?',
    options: [
      'A future electrician may test, extend or isolate on the strength of that entry and get it wrong',
      'It makes the paperwork look untidy at the next inspection',
      'The client may be charged for the wrong circuit type',
      'It only matters if the installation is later altered by the same firm',
    ],
    correctAnswer: 0,
    explanation:
      'A schedule is read by strangers long after you have gone. A wrong entry does not decay — it is trusted, and it misdirects the isolation, the test method and the load assumptions.',
  },
  {
    id: 8,
    question:
      'A site manager is shouting at you about a delay caused by another trade. What does courtesy under pressure look like?',
    options: [
      'Answer the factual question calmly, in writing afterwards, without matching the tone',
      'Match the urgency of the tone so he knows you are taking it seriously',
      'Say nothing until he has calmed down and raise it at the next meeting',
      'Reply informally so the exchange does not become part of the record',
    ],
    correctAnswer: 0,
    explanation:
      'Courtesy is cheap when everyone is happy. The only version that counts is the one under pressure, and a calm written answer is what survives the argument.',
  },
];

export default function Lesson313_2_4() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'A gap gets questioned. A wrong statement gets acted on. That is why accuracy outranks completeness when you are short of time.',
          'Completeness includes the negative — what you did not inspect, did not test and did not energise.',
          'Clarity is measured at the receiving end. If the caretaker cannot act on it, it is not clear, however correct it is.',
          'Professional means describing the installation, never judging the previous contractor.',
          'A document you did not keep is a question you cannot answer in two years.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Explain why an inaccurate statement causes more harm than a missing one, and what that means for how you word a handover',
          'Describe what completeness requires, including recording the scope you did not cover',
          'Judge clarity from the position of the reader rather than the writer, and adapt technical and functional information to the audience',
          'Give courteous, professional information under pressure without commenting on other people or other firms',
          'Explain what copies you retain, why you retain them, and what you lose when you do not',
        ]}
        initialVisibleCount={3}
      />

      <SectionRule />

      <ContentEyebrow>Accuracy and the half-truth</ContentEyebrow>

      <ConceptBlock
        title="Accurate means it matches the installation, not your intention"
        plainEnglish="Write down what is actually there, on the day you write it, not what the drawing said or what you meant to do."
      >
        <p>
          Most inaccurate paperwork is not dishonest. It is out of date. The design said a 32 A Type
          B, the store had none, you fitted a Type C and told the supervisor, and the schedule still
          says Type B because it was filled in from the drawing on Tuesday. Nobody lied. The record
          is still wrong, and the record is what survives. A statement that was true when you wrote
          it and false by the time you issued it is a false statement to the reader, so the last
          thing you do before issuing is walk the job against the paperwork, not the paperwork
          against the drawing.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Fill from the installation.</strong> Boards, devices and cable routes get read
            off the job, not copied from the design intent.
          </li>
          <li>
            <strong>Re-check anything that changed.</strong> Every variation is a candidate for a
            stale entry somewhere else in the pack.
          </li>
          <li>
            <strong>Date it honestly.</strong> A document dated before the last change invites the
            reader to trust something that has moved on.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="A half-truth is worse than a gap, because a gap gets questioned"
        onSite="If you are unsure and out of time, write the uncertainty down. Never round it up into a clean sentence."
      >
        <p>
          This is the single most useful idea on this page. Missing information behaves well: the
          caretaker notices the blank, rings you, and you fill it in. Wrong information behaves
          badly: it looks finished, so nobody rings anybody. It gets used.
        </p>
        <p>
          Think about what the reader does next. A blank against a circuit means someone proves it
          before they touch it. A confident but wrong entry means someone isolates the wrong way and
          works on a live conductor believing your paperwork. So when you are finishing paperwork at
          half four on a Friday and you are not certain, &ldquo;not confirmed on site — verify
          before alteration&rdquo; is a professional sentence. A guess that reads like a fact is
          not.
        </p>
      </ConceptBlock>

      <ContentEyebrow>Completeness, and what outlives you</ContentEyebrow>

      <ConceptBlock
        title="Completeness includes what you did not cover"
        plainEnglish="Say where you stopped. Silence about the rest reads as a clean bill of health."
      >
        <p>
          Ask a client what they think they bought and they will describe something larger than your
          scope. That is not them being difficult — it is what happens when a document lists
          findings and never lists boundaries. If your record names six circuits and says nothing
          else, the reader concludes there were six circuits. Recording the negative is the part
          most often left out, because the things you did not do never sit in front of you asking to
          be written down.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Scope.</strong> Which areas, boards and circuits were in, and which were
            explicitly out.
          </li>
          <li>
            <strong>Limitations.</strong> Ceilings not lifted, the plant room locked, the ward in
            use, the loft with no safe access.
          </li>
          <li>
            <strong>Not energised.</strong> Anything left dead, isolated or locked off, and what
            must happen before it goes live.
          </li>
          <li>
            <strong>Outstanding items.</strong> Work agreed but not done, and who is doing it.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="An inaccuracy in a schedule outlives everybody on the job"
        onSite="Assume a stranger will read your circuit schedule in twenty years and believe every word of it."
      >
        <p>
          Most of your work is read once and forgotten. A schedule of circuit details is different.
          It sits in a cupboard or a folder and gets consulted by people who never met you, for as
          long as the installation exists. It does not go out of date politely — it stays confident.
          Get a circuit description wrong and you have not made a clerical error, you have planted a
          decision. The next electrician chooses an isolation point from it, chooses a test method
          from it, and assumes a load from it. If it says ring final and it is a radial, their
          continuity results will not make sense and the temptation is to doubt the meter rather
          than the paperwork. The boring fields matter just as much: a wrong board reference sends
          someone to the wrong cupboard, and a wrong protective device rating changes what a
          designer thinks the installation can carry when an extension is priced years later.
        </p>
      </ConceptBlock>

      <SectionRule />

      <InlineCheck
        id="313-2-4-check-1"
        question="You cannot confirm whether a spare way in a distribution board is connected to anything. It is five o&rsquo;clock and the pack is due. What goes in the schedule?"
        options={[
          'Spare — because it is almost certainly not connected',
          'Leave the row blank and mention it verbally to the caretaker',
          'Connected — so that whoever follows treats it with caution',
          'A clear note that the way is unconfirmed and must be proved before use',
        ]}
        correctIndex={3}
        explanation="Recording the uncertainty is accurate and complete at once. Writing &ldquo;spare&rdquo; is a guess that will be trusted; writing &ldquo;connected&rdquo; is a different guess; a blank with a verbal aside dies the moment the caretaker leaves the job."
      />

      <ContentEyebrow>Clarity and courtesy</ContentEyebrow>

      <ConceptBlock
        title="Clarity belongs to the reader, and jargon is the writer&rsquo;s failure"
        plainEnglish="Before you write, decide who is reading and what they have to do next."
      >
        <p>
          Two people can receive the same information about the same board and need entirely
          different documents. The consulting engineer needs the technical picture — how it is
          built, what it was tested to, what the results were. The ward sister needs the functional
          picture — what this thing does, what it looks like when it is working, and what to do at
          two in the morning when it is not. Writing one document and posting it to both is not
          efficiency, it is a decision to be understood by one of them. Clarity is judged by whether
          the reader takes the right action, so you need to know what action you are asking for
          before you start.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Name the reader.</strong> Site manager, tenant, caretaker, designer, duty holder
            — each needs a different level.
          </li>
          <li>
            <strong>Name the action.</strong> Sign it, file it, operate it, price from it, or act on
            it in an emergency.
          </li>
          <li>
            <strong>Front-load it.</strong> The thing they must do goes first, not after three
            paragraphs of background.
          </li>
          <li>
            <strong>One idea per sentence.</strong> Long sentences hide the instruction inside the
            explanation.
          </li>
        </ul>
        <p>
          And jargon aimed at a client is the writer&rsquo;s failure, not the reader&rsquo;s.
          Telling a tenant in a flat that &ldquo;the RCBO tripped on an earth fault on the final
          circuit&rdquo; is not communication, it is noise with your competence stapled to it. The
          functional version is: the switch protecting your kitchen sockets turned the power off
          because something plugged in was leaking electricity to earth; unplug the kettle, push the
          switch back up, and ring us if it goes again. Nothing was dumbed down there and nothing
          untrue was said: the technical content still exists in the certificate and the schedule,
          where the next electrician will find it. What changed is the register, matched to the
          person and to the action they have to take. Keeping the jargon usually comes from wanting
          to sound like a professional. It does the opposite — being understood first time is what a
          professional sounds like.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="Courtesy counts when it is expensive"
        plainEnglish="Being polite when everything is going well proves nothing. Being polite when you are being blamed is the skill."
      >
        <p>
          You will be asked for information at the worst moment — a site manager standing over you
          about a delay that was not yours, a client on the phone about a bill, a housing officer
          relaying a complaint from a tenant who is frightened. That is the exact moment the
          information has to be accurate, clear and courteous, and the exact moment it is hardest.
          Separate the tone from the content. Answer the factual question, in the order it was
          asked, and put it in writing afterwards. Do not defend, do not counter-accuse, and do not
          answer a question you were not asked. The written version is what survives the row, and a
          calm written answer wins arguments that a shouted one loses.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Answer first.</strong> Facts before explanation, explanation before feelings.
          </li>
          <li>
            <strong>Confirm in writing.</strong> A short email the same day beats a long one next
            week.
          </li>
          <li>
            <strong>Stay inside your role.</strong> If it is a commercial or contractual question,
            say who it belongs to rather than guessing.
          </li>
        </ul>
      </ConceptBlock>

      <ContentEyebrow>Professional tone</ContentEyebrow>

      <ConceptBlock
        title="Professional means describing the installation, not the installer"
        onSite="Record what you found. Leave out who you think caused it."
      >
        <p>
          You will walk into work that is genuinely poor, and the client will fish for a verdict on
          the firm that did it. Give them the condition instead: what is there, what is wrong with
          it, what risk it presents, what it needs. That is information they can act on. &ldquo;The
          last lot were cowboys&rdquo; is not information, it is a liability.
        </p>
        <p>
          There are three reasons to hold that line. It keeps your record defensible — observed
          facts you can point at, not opinions you would have to justify. It keeps the client
          focused on the remedy rather than the grievance. And it protects your own reputation,
          because a client who hears you rubbishing another firm assumes you will rubbish them too.
          The same discipline applies in-house: that the apprentice made a mess of the second-fix
          belongs nowhere near a document going to a client. Describe the defect and the correction.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="313-2-4-check-2"
        question="A landlord asks you, in writing, what you think of the firm that wired the extension badly. What is the professional reply?"
        options={[
          'Confirm that the standard of work suggests the firm was not competent',
          'Set out the specific defects found, the risk each presents and what remedial work is needed',
          'Decline to comment at all and provide no detail about the extension',
          'Give your opinion verbally so that it is not in the written record',
        ]}
        correctIndex={1}
        explanation="The landlord needs to act, so withholding detail fails them. What they do not need is a verdict on another business. Defects, risks and remedies are factual, useful and defensible."
      />

      <SectionRule />

      <ContentEyebrow>Keeping what you issued</ContentEyebrow>

      <ConceptBlock
        title="Retention: you cannot answer a query about a document you did not keep"
        plainEnglish="Keep a copy of exactly what you issued, to whom, and when — not a rough version of it."
      >
        <p>
          Two years after a job, somebody asks a question. A solicitor, an insurer, a new landlord,
          or just the client who has lost their pack. The question is always the same underneath:
          what did you tell them at the time? If you kept a copy, this is a ten minute job. If you
          did not, you are relying on memory against someone else&rsquo;s memory, and memory loses.
          Retention is not filing for the sake of filing — it does several separate jobs, and the
          last two are the ones firms forget.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>It protects you.</strong> The retained copy proves what was issued and when,
            including the limitations you recorded.
          </li>
          <li>
            <strong>It protects the client.</strong> When they lose their copy — and they will — you
            can reissue it rather than re-survey the building.
          </li>
          <li>
            <strong>It is how the firm learns.</strong> Patterns only show up across jobs: the same
            defect on the same housing stock, the same question from every caretaker, the same field
            left blank on every schedule.
          </li>
          <li>
            <strong>It makes the next visit cheaper.</strong> Returning to an installation you have
            records for is a different job from returning blind.
          </li>
        </ul>
        <p>
          Keep the issued version, not the draft. Keep the covering email or the signed receipt, so
          you know it reached the right person. And keep it somewhere the firm can find it without
          you, because the query will arrive on a week you are on holiday.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026"
        clause="Regulation 644.4"
        meaning="Certification is not a piece of admin you post to whoever asks. It goes to the person who ordered the work, issued by the people responsible for the design, the construction and the verification, each signing for their own part. That is why the content has to be accurate and complete before it leaves you — you are not describing the installation in general terms, you are signing for a defined share of it. It is also why you keep a copy: the signature is yours long after the job has closed."
        cite="The Electrical Installation Certificate shall be issued to the person ordering the work ... by the person or persons responsible for the design, construction and verification of the installation, taking account of their respective responsibilities."
      />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Smoothing over an uncertainty so the paperwork looks finished"
        whatHappens={
          <>
            <p>
              The pack is due, one circuit description is unconfirmed, and a blank row looks
              unprofessional. So it gets filled in with the most likely answer. The document now
              reads as complete and certain, and it is issued, filed and trusted. Eighteen months
              later somebody isolates on the strength of that row, and nobody questions it because
              nothing about it invited a question. The error was invisible precisely because it was
              tidy, and the person who pays is a stranger working on an installation they were told
              they understood.
            </p>
          </>
        }
        doInstead={
          <>
            <p>
              Write the uncertainty into the document in words a stranger will act on:
              &ldquo;Circuit description not confirmed on site — prove dead and verify before any
              alteration.&rdquo; That is an accurate statement, it is complete, and it makes the
              next person careful rather than confident.
            </p>
            <p>
              Then put the item on the outstanding list with a name against it. An honest gap that
              someone owns is worth more than a tidy document nobody can rely on.
            </p>
          </>
        }
      />

      <CommonMistake
        title="Sending the technical version to somebody who needed the functional one"
        whatHappens={
          <>
            <p>
              The tenant rings because her kitchen sockets are dead. You reply that the RCBO
              tripped on an earth fault on the final circuit and she can reset it. Every word is
              true and none of it helps: she does not know what an RCBO is, where it lives or what
              resetting involves.
            </p>
            <p>
              So she rings again, or she does not ring at all and lives with half a kitchen for a
              fortnight while deciding the new installation is unreliable. The same thing happens
              when one document is written once and sent to both the consulting engineer and the
              ward sister &mdash; one of them was always going to be left with noise.
            </p>
          </>
        }
        doInstead={
          <>
            <p>
              Name the reader and name the action before you write a word. Then put the action
              first, keep one idea to a sentence, and pitch the register at the person who has to
              do something rather than at the person who would be impressed by it.
            </p>
            <p>
              Translate without losing anything: the switch protecting your kitchen sockets turned
              the power off because something plugged in was leaking electricity to earth &mdash;
              unplug the kettle, push the switch back up, and ring us if it goes again. Nothing has
              been dumbed down, because the technical content still sits in the certificate and the
              schedule where the next electrician will look for it.
            </p>
          </>
        }
      />

      <InlineCheck
        id="313-2-4-check-3"
        question="Which set of records most reliably answers the question &ldquo;what did we tell the client, and when?&rdquo;"
        options={[
          'The final draft held on the job folder on the office computer',
          'Your site diary entry saying the handover pack was completed that week',
          'The issued document as sent, plus the covering email or signed receipt showing the recipient and date',
          'The client copy, which you can request back if a query ever arises',
        ]}
        correctIndex={2}
        explanation="You need the exact version that left the building, and evidence of who received it and when. A draft may differ from what was issued, a diary note does not show the content, and a copy in someone else&rsquo;s control is not a record you hold."
      />

      <SectionRule />

      <Scenario
        title="Merthyr Tydfil — a care home rewire, a locked wing and a phone call in 2028"
        situation={
          <>
            <p>
              You are second on a partial rewire at a residential care home in Merthyr Tydfil. The
              east wing is done and tested. The west wing was supposed to be done in the same visit,
              but two rooms were occupied throughout and the home manager, Bethan, would not move
              the residents. Those two rooms still have the original wiring on the original board.
              On the Friday the office wants the pack out so the invoice can go, the supervisor is
              on another site, and Bethan is polite but pushing — she has a compliance folder and
              wants something in it. The easy version is a clean certificate and schedule covering
              the boards you worked on, with nothing said about the two rooms, because you did not
              touch them.
            </p>
          </>
        }
        whatToDo={
          <>
            <p>
              Issue for what you did, and make the boundary impossible to miss. The certification
              covers the east wing and the new west wing board. Alongside it, written in plain
              language for Bethan and not only in schedule shorthand: rooms 14 and 16 were occupied
              and could not be accessed; their wiring and their existing board are unchanged, were
              not inspected or tested on this visit, and remain on the old arrangement.
            </p>
            <p>
              Say what happens next and who owns it — a return visit arranged with the home, the two
              rooms outstanding until then. Do not editorialise about the original installation or
              the firm that did it. Then keep it all: the issued pack, the covering email to Bethan
              and the date, filed where the office can find it without you.
            </p>
          </>
        }
        whyItMatters={
          <>
            <p>
              Here is the cost of the easy version. Bethan puts the clean pack in the compliance
              folder. She leaves in 2028. The new manager reads the folder, sees the home described
              as rewired, and prices a room refurbishment on that basis — including new load in room
              14, off a board nobody has looked at since the nineteen-nineties. An inspector asks
              why a certificate appears to cover a wing that plainly was not touched. You are rung
              and asked what was actually agreed. With the limitation written down and the copy
              retained, that call takes ten minutes and you come out of it well. Without it, you are
              arguing from memory about a document with your name on it, defending a silence that a
              reasonable person read as a clean bill of health.
            </p>
          </>
        }
      />

      <SectionRule />

      <FAQ
        items={[
          {
            question:
              'If I do not know something, will writing that down make me look incompetent?',
            answer:
              'The opposite. A recorded uncertainty with a clear instruction — verify before alteration, prove dead before use — reads as someone who knows exactly where the edge of their knowledge is. What looks incompetent is a confident entry that turns out to be wrong, because then the reader cannot trust any of the others either.',
          },
          {
            question: 'How much detail does a client actually want in a handover?',
            answer:
              'Less than you think, and in a different order. Put what they must do, what is outstanding and who to ring at the front, in plain language. The full technical detail still goes in the certification and schedules — that is where the next electrician looks. Two registers, one truth.',
          },
          {
            question:
              'The existing work really is dangerous. Can I say the previous contractor was at fault?',
            answer:
              'Say what is dangerous, why it is dangerous and what must be done about it, with the urgency the condition deserves. That is the part the client can act on and the part you can stand behind. Who installed it, and why, is not something you observed — and a written judgement on another firm is a fight you have volunteered for.',
          },
          {
            question: 'Is keeping a copy just about covering myself if there is a dispute?',
            answer:
              'That is the reason people remember, but it is the narrowest one. Retained records let you reissue a pack the client has lost without re-surveying, let you return to an installation informed rather than blind, and let the firm see patterns across jobs that no single job reveals.',
          },
        ]}
      />

      <KeyTakeaways
        points={[
          'Accuracy means the record matches the installation on the day it is issued, not the design intent or last week’s reality.',
          'A half-truth is worse than a gap: a gap gets questioned, a confident error gets acted on.',
          'Completeness includes the negative — scope not covered, areas not accessed, circuits not energised, items outstanding.',
          'A wrong entry in a schedule keeps misdirecting strangers for the life of the installation.',
          'Clarity is judged by whether the reader can take the right action, so name the reader and the action before you write.',
          'Jargon aimed at a client is the writer’s failure; keep the technical detail in the technical document and translate the functional part.',
          'Professional means describing the installation and never delivering a verdict on the previous contractor.',
          'Retain the issued version, the recipient and the date — it protects you, protects the client, and is how a firm learns.',
        ]}
      />

      <SectionRule />

      <ContentEyebrow>Check yourself</ContentEyebrow>
      <Quiz questions={quizQuestions} title="2.4 — Accurate, clear, courteous and kept" />
    </div>
  );
}
