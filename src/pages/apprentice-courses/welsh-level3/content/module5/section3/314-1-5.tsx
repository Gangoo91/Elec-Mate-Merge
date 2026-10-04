/**
 * Unit 314 · Learning outcome 1 · Criterion 1.5 — The current versions of
 * appropriate industry standards and regulations relevant to the identified
 * building services engineering system
 *
 * The page where "keep up to date" becomes something concrete. Grounded on the
 * BS 7671 Foreword position on earlier editions, and on real A4:2026 changes
 * pulled from bs7671_facets — insertions, modifications and deletions — which
 * are the evidence that a superseded copy is not merely old but wrong.
 *
 * ⚠️ The facets record THAT 411.6.5 and group 419 were inserted and say the
 * wording is not in the extract. This page therefore never states what they
 * say — which is also the teaching point: you cannot work from a summary.
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
    question: 'An installation was built to an earlier edition of BS 7671. What does that mean?',
    options: [
      'Not necessarily that it is unsafe or needs upgrading — judge on actual safety and risk',
      'That it must be brought up to the current edition',
      'That it cannot be certified',
      'That it should be reported as dangerous',
    ],
    correctAnswer: 0,
    explanation:
      'The Foreword says it directly: lack of full compliance with the current edition does not necessarily mean an existing installation is unsafe for continued use or requires upgrading.',
  },
  {
    id: 2,
    question: 'Why is an out-of-date copy of a standard worse than no copy?',
    options: [
      'It gives confident answers that are no longer correct',
      'It is heavier to carry',
      'It cannot be used for certification',
      'It is not worse — old guidance is still guidance',
    ],
    correctAnswer: 0,
    explanation:
      'Nobody checks a source they trust. A superseded table or annex looks exactly as authoritative as a current one and is consulted with the same confidence.',
  },
  {
    id: 3,
    question: 'A2:2022 deleted Table 3A from Appendix 3. What is the practical consequence?',
    options: [
      'Its time/current criteria are no longer the basis for RCD test pass/fail in the current edition',
      'RCDs no longer need testing',
      'The table moved to another appendix',
      'Nothing — deleted material still applies',
    ],
    correctAnswer: 0,
    explanation:
      'Material that has been deleted is not merely old, it is no longer part of the standard. Relying on it produces a confidently wrong answer.',
  },
  {
    id: 4,
    question: 'What is the right response to an amendment summary or a bulletin?',
    options: [
      'Use it to find out what changed, then read the actual text before applying it',
      'Apply it directly — summaries are written by experts',
      'Ignore it until the next edition',
      'Circulate it to the team as the new requirement',
    ],
    correctAnswer: 0,
    explanation:
      'A summary tells you where to look. It is not the standard, and applying a paraphrase of a regulation is how people get the detail wrong.',
  },
  {
    id: 5,
    question: 'Why does this criterion sit in a coordination unit?',
    options: [
      'Because the people working for you use whichever version they have, unless you manage it',
      'Because coordinators write the standards',
      'Because it is only relevant to supervisors',
      'It does not — it belongs in a design unit',
    ],
    correctAnswer: 0,
    explanation:
      'Being personally up to date is not enough once you are coordinating. What matters is the version the site is working from.',
  },
  {
    id: 6,
    question: 'Which of these is NOT part of "appropriate standards" on a typical job?',
    options: [
      'The contractor’s pricing schedule',
      'BS 7671 and its supporting guidance',
      'Manufacturer instructions for the equipment installed',
      'The project specification',
    ],
    correctAnswer: 0,
    explanation:
      'The standards that govern the work are the wiring regulations, the guidance behind them, the manufacturer’s instructions and the specification. What you charged is not one of them.',
  },
  {
    id: 7,
    question: 'Where should manufacturer instructions sit in the hierarchy?',
    options: [
      'Alongside the standard — equipment has to be installed as its maker requires as well as to BS 7671',
      'Below the standard, and ignorable if BS 7671 is satisfied',
      'Above the standard in all cases',
      'They are advisory only',
    ],
    correctAnswer: 0,
    explanation:
      'They are not an alternative to the standard, and a compliant installation that ignores the maker’s instructions is still wrong — frequently in the ways that void a warranty.',
  },
  {
    id: 8,
    question: 'How should a change of edition be handled across a team?',
    options: [
      'Establish which version everyone is using and make the current text available on site',
      'Assume everyone updates themselves',
      'Wait until someone gets something wrong',
      'Rely on the apprentices, who were taught most recently',
    ],
    correctAnswer: 0,
    explanation:
      'This is the coordination act. Nobody deliberately works to a superseded copy — they work to the one in the van, which is whichever one they bought.',
  },
];

export default function Lesson314_1_5() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'An existing installation not fully complying with the current edition is not automatically unsafe — judge on actual safety and risk.',
          'A superseded copy is worse than none: it answers confidently and nobody checks a source they trust.',
          'Amendments insert, modify AND delete. Deleted material is not old guidance, it is no longer the standard.',
          'A summary tells you where to look; read the text before you apply it.',
          'Coordinating means managing which version the site is working from, not just which one you own.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'State what BS 7671 says about installations built to an earlier edition.',
          'Explain why a superseded copy is more dangerous than no copy at all.',
          'Give concrete examples of material that an amendment has inserted, modified or deleted.',
          'Use a summary or bulletin correctly — to locate a change, not to apply one.',
          'Manage which version the people working for you are actually using.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>Which edition applies</ContentEyebrow>

      <ConceptBlock
        title="Two different questions about editions"
        plainEnglish="What do I build to? And what do I do about what is already there?"
      >
        <p>
          &ldquo;Current versions&rdquo; sounds like one topic and is really two, and confusing them
          causes a lot of unnecessary argument with clients.
        </p>
        <p>
          <strong>New work</strong> is designed, installed and verified to the edition in force.
          That is straightforward.
        </p>
        <p>
          <strong>Existing installations</strong> are a different matter. BS 7671&rsquo;s Foreword
          is explicit that an existing installation&rsquo;s lack of full compliance with the current
          edition does not necessarily mean it is unsafe for continued use or requires upgrading.
          When reporting on a condition or advising a client, what you are assessing is actual
          safety and risk — not the date on the edition it was built to.
        </p>
        <p>
          That distinction protects clients from being told their installation is
          &ldquo;illegal&rdquo; because the Regulations moved on, and it protects you from making a
          claim you cannot support. It is also one of the most misquoted points in the trade.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026"
        clause="Foreword"
        meaning="An existing installation's lack of full compliance with the current edition does not necessarily mean that it is unsafe for continued use or that it requires upgrading. When carrying out condition reporting or advising a client, consider actual safety and risk rather than edition compliance alone."
        cite="BS 7671 Foreword"
      />

      <InlineCheck
        id="314-1-5-check-1"
        question="A client is told their 2004-era installation 'does not meet the current regs and is therefore unsafe'. What is wrong with that?"
        options={[
          'It conflates edition compliance with safety, which the Foreword expressly separates',
          'Nothing — it is accurate',
          'It should say "illegal" rather than "unsafe"',
          'Only an inspector can say it',
        ]}
        correctIndex={0}
        explanation="Not complying with the current edition and being unsafe are two different findings. Merging them oversells the work and is not supportable if anyone asks you to justify it."
      />

      <SectionRule />

      <ContentEyebrow>Superseded copies and amendments</ContentEyebrow>

      <ConceptBlock
        title="Why the superseded copy is the dangerous one"
        onSite="Nobody double-checks a source they already trust."
      >
        <p>
          Working with no reference to hand is uncomfortable, and discomfort makes people careful:
          they ask, they look it up, they check with somebody.
        </p>
        <p>
          A superseded copy removes that. It sits on the van, it looks authoritative, it has the
          right cover, and it gives a confident answer to the question you asked. Nothing about the
          experience signals that the answer stopped being correct two years ago — so nobody
          verifies it, which is precisely the failure mode a reference book is supposed to prevent.
        </p>
        <p>
          The risk is largest for the things people look up rather than know: a table, an annex, a
          set of criteria, a notice format. Those are exactly the items amendments change, and
          exactly the items nobody re-derives from first principles.
        </p>
      </ConceptBlock>

      <ConceptBlock title="What an amendment actually does">
        <p>
          It is easy to imagine an amendment as a handful of new requirements bolted on. In
          practice an amendment does three different things, and the third catches people out:
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Inserts.</strong> New regulations appear. In A4:2026, for example, Regulation
            411.6.5 was inserted in Chapter 41, and an entire new regulation group — 419 — was
            inserted in the same chapter, relating to automatic disconnection. Chapter 54, on
            earthing arrangements and protective conductors, gained two new regulations.
          </li>
          <li>
            <strong>Modifies.</strong> Existing regulations change wording or scope. Regulation
            527.1.3 was modified to add a note that cables must also satisfy the Construction
            Products Regulation for their reaction to fire. Regulation 133.1.3 on selection of
            equipment was modified so that certain usages must be recorded on the certification.
          </li>
          <li>
            <strong>Deletes.</strong> Material disappears. Annex A443 and Annex B443 were deleted.
            Table 3A — the time/current performance criteria for RCDs in Appendix 3 — was deleted.
            The illustrations of notices that used to appear in Section 514 were removed.
          </li>
        </ul>
        <p>
          Deletion is the one that produces confidently wrong work, because the person using the old
          table has no reason to suspect it. If your copy still has Table 3A in it, it will answer
          an RCD question for you, and the answer will not be the current basis for pass or fail.
        </p>
      </ConceptBlock>

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Working from the summary"
        whatHappens={
          <>
            An amendment lands, and what circulates is a bulletin, a training slide or a video
            summarising the changes. Somebody reads &ldquo;new requirements around automatic
            disconnection&rdquo; and applies their impression of it. The impression is approximately
            right and wrong in the detail — which conditions, which installations, which exceptions
            — and the detail is the whole of the regulation.
          </>
        }
        doInstead={
          <>
            Treat summaries as an index. They are genuinely useful for finding out{' '}
            <em>that</em> something changed and roughly where. Then open the consolidated text and
            read the regulation before you apply it, because the wording is the requirement and a
            paraphrase never is.
          </>
        }
      />

      <CommonMistake
        title="Telling a client their installation is unsafe because it is old"
        whatHappens={
          <>
            <p>
              The installation was built to an earlier edition and it shows. What comes out of your
              mouth at the front door is that it does not meet the current regulations and is
              therefore unsafe, which sounds like the responsible thing to say and merges two
              separate findings into one.
            </p>
            <p>
              Now you are committed to a claim you cannot support if anybody asks you to justify
              it item by item, and the client has been frightened into work on the basis of a date
              rather than a risk. It also damages the findings that were genuine, because they are
              now mixed in with everything else you swept up.
            </p>
          </>
        }
        doInstead={
          <>
            <p>
              Keep the two questions apart. New work is designed, installed and verified to the
              edition in force. An existing installation is judged on actual safety and risk, and
              lack of full compliance with the current edition does not by itself mean it is
              unsafe for continued use or that it needs upgrading.
            </p>
            <p>
              Then report what you actually found, item by item, on its own merits. A real defect
              recorded plainly is far more persuasive than a general statement about the edition,
              and it is the version you can stand behind when somebody asks you which regulation
              you mean.
            </p>
          </>
        }
      />

      <SectionRule />

      <ContentEyebrow>More than BS 7671</ContentEyebrow>

      <ConceptBlock
        title="More than one standard applies"
        plainEnglish="The Regs, the guidance, the maker's instructions and the specification — all at once."
      >
        <p>
          The criterion says &ldquo;standards and regulations relevant to the identified building
          services engineering system&rdquo;, which is broader than BS 7671 alone. On a typical job
          you are working to at least four things simultaneously:
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>BS 7671</strong> in the edition in force — the requirements themselves.
          </li>
          <li>
            <strong>Supporting guidance</strong> — the On-Site Guide and the Guidance Notes, which
            interpret and illustrate rather than add requirements, and which are revised alongside
            the standard.
          </li>
          <li>
            <strong>Manufacturer instructions</strong> for what you install. These are not
            advisory and not an alternative to the standard: equipment has to be installed as its
            maker requires as well as to BS 7671, and ignoring them is how warranties are voided
            and how otherwise-compliant work turns out wrong.
          </li>
          <li>
            <strong>The project specification</strong>, which can be more demanding than the
            standard and frequently is.
          </li>
        </ul>
        <p>
          Where two of them conflict — a specification that asks for something the manufacturer
          prohibits, say — that is a query to raise, not a judgement call to make quietly on site.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="314-1-5-check-2"
        question="The specification calls for an installation method the equipment manufacturer's instructions prohibit. What do you do?"
        options={[
          'Follow the specification — it is the contract',
          'Raise it as a query before installing anything',
          'Follow the manufacturer and say nothing',
          'Choose whichever is easier on site',
        ]}
        correctIndex={1}
        explanation="Both documents govern the work, so a conflict between them is a design question rather than a site decision. Installing either way silently leaves you owning a problem somebody else created."
      />

      <SectionRule />

      <ContentEyebrow>Keeping the team current</ContentEyebrow>

      <ConceptBlock
        title="This is a coordination problem, not a personal one"
        onSite="The question is not which edition you own. It is which one the site is using."
      >
        <p>
          On your own work, being up to date is a matter of personal diligence. The moment you are
          coordinating, it stops being about you: the people doing the work will use whatever copy
          they happen to have, and nobody deliberately works to a superseded edition — they work to
          the one in the van, which is whichever one they bought when they needed one.
        </p>
        <p>Three things make this manageable, and none of them takes long:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Ask.</strong> Find out what people are carrying. It is not an accusation and
            the answer is often surprising.
          </li>
          <li>
            <strong>Make the current text available on site.</strong> One current copy where
            everybody can reach it, and say that it is the one that settles arguments.
          </li>
          <li>
            <strong>Say what changed that affects this job.</strong> Not the whole amendment — the
            two or three items that touch the work in front of you.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock title="Keeping track without drowning">
        <p>
          You are not expected to memorise an amendment. What is expected is knowing that one has
          happened and knowing where to look — which is a much smaller job.
        </p>
        <p>
          A change-control note is the practical version: a dated line recording that an amendment
          was published, what it touched at a headline level, and what you did about it. For
          example: <em>BS 7671:2018+A4:2026 — Chapter 41: 411.6.5 inserted and a new group 419
          inserted; Chapter 52: 527.1.3 modified; Appendix 3: Table 3A deleted. Action: obtain
          consolidated text, brief the team on the RCD testing change.</em>
        </p>
        <p>
          That takes five minutes, it survives staff changes, and it is the difference between a
          firm that knows its position and one that finds out during an inspection.
        </p>
      </ConceptBlock>

      <Scenario
        title="The table that was not there any more"
        situation={
          <>
            A periodic inspection on a light industrial unit near Deeside. Two electricians, both
            experienced, testing RCDs. One has a current copy; the other has been using the same
            well-thumbed book for years and reaches for the RCD performance criteria in Appendix 3
            to settle a borderline reading. The table he is reading was deleted in the current
            amendment.
          </>
        }
        whatToDo={
          <>
            On the day it is resolved by checking against the current text and re-verifying the
            handful of results that were judged against the old criteria. What it should prompt is
            wider: if one person on this job is working from a superseded copy, that is true across
            the firm and nobody has ever asked.
          </>
        }
        whyItMatters={
          <>
            Nobody was careless. An experienced electrician looked up a table in a book he trusted
            and got an answer — the process that is supposed to prevent mistakes produced one,
            because the source was silently out of date. This is exactly why the criterion says{' '}
            <em>current versions</em> rather than &ldquo;relevant standards&rdquo;.
          </>
        }
      />

      <InlineCheck
        id="314-1-5-check-3"
        question="An amendment bulletin says a new regulation group was inserted covering automatic disconnection. What can you legitimately do with that?"
        options={[
          'Brief the team on the new requirement as described in the bulletin',
          'Use it to find the chapter, then read the inserted text before applying anything',
          'Apply it as written in the bulletin',
          'Wait for the next full edition',
        ]}
        correctIndex={1}
        explanation="A bulletin records that something was inserted. It is not the wording, and the wording — the conditions, the exceptions, the scope — is the requirement."
      />

      <SectionRule />

      <ContentEyebrow>Certificates and guidance</ContentEyebrow>

      <ConceptBlock title="Certification is edition-stamped">
        <p>
          One practical consequence people miss: the certificate you issue states the edition the
          installation was verified against. That is not administrative detail — it is the record of
          what the work was judged by, and it is what a future inspector reads to understand the
          basis of the original verification.
        </p>
        <p>
          It also means the edition question has a date attached. Work verified during the overlap
          around an amendment needs the edition on the certificate to match what you actually
          applied, not whichever line was already printed on the template you have been using since
          last year.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ConceptBlock title="Guidance changes with the standard">
        <p>
          When an amendment lands, the supporting publications follow. The On-Site Guide and the
          Guidance Notes are revised to match, and that revision is the point at which most people
          actually meet the change — because those are the books that get opened on site.
        </p>
        <p>
          The trap is the interval. For a period after an amendment, the guidance on your shelf
          illustrates the previous position perfectly well, in a book that has not obviously become
          out of date. The same problem as the superseded standard, one step removed, and rather
          easier to miss because guidance feels less formal.
        </p>
        <p>
          A4:2026 gives a concrete example: the Appendix 6 schedule of inspections was simplified
          for initial verification, and a new example checklist was added which is guidance only and
          is not required to be provided with the certificate. A team working from older material
          may well be issuing the previous schedule and treating the checklist as mandatory — both
          wrong, neither dangerous, both the kind of thing that erodes confidence in the paperwork.
        </p>
      </ConceptBlock>

      <FAQ
        items={[
          {
            question: 'Do I have to rewire everything that was done to an older edition?',
            answer:
              'No, and saying otherwise to a client is not supportable. The Foreword separates edition compliance from safety precisely so that existing installations are assessed on actual risk. Where something genuinely is unsafe or does not meet a requirement that matters for safety, that is a finding in its own right and should be recorded as such — on its merits, not on the date it was installed.',
          },
          {
            question: 'How do I know when an amendment has landed?',
            answer:
              'Publisher and institution announcements are the usual route, and wholesalers tend to be quick to mention it because they have books to sell. The practical discipline is not the noticing — it is having somewhere to record what you then did about it, so that the knowledge belongs to the firm rather than to whoever happened to read the email.',
          },
          {
            question: 'Is the On-Site Guide a standard?',
            answer:
              'It is supporting guidance rather than the standard itself — it interprets and illustrates BS 7671 for common situations. That makes it enormously useful on site and means it is not the thing you cite when something is disputed. When it matters, the wording of the regulation settles it, and the guidance is what helped you find the regulation.',
          },
          {
            question: 'Whose job is it to make sure the team is current?',
            answer:
              'Whoever is coordinating the work, which on the jobs this unit is about is you. That does not mean buying everyone a book — it means knowing what people are working from, having a current copy available, and telling the team the two or three changes that touch this job. The alternative is discovering the gap the way the scenario above did.',
          },
        ]}
      />

      <KeyTakeaways
        points={[
          'New work is built to the edition in force; existing installations are judged on safety and risk.',
          'The Foreword: lack of full compliance with the current edition does not necessarily mean unsafe or needing upgrade.',
          'A superseded copy answers confidently, which is why it is more dangerous than no copy.',
          'Amendments insert, modify and delete — deletion is the one that produces confidently wrong work.',
          'A4:2026 examples: 411.6.5 and group 419 inserted, 527.1.3 modified, Table 3A and Annexes A443/B443 deleted.',
          'Summaries and bulletins locate a change; the consolidated text is what you apply.',
          'Four things govern the work at once: the standard, its guidance, the maker’s instructions, the specification.',
          'Coordinating means managing which version the site uses — ask, provide a current copy, brief what changed here.',
        ]}
      />

      <ContentEyebrow>Check yourself</ContentEyebrow>
      <Quiz questions={quizQuestions} title="Working to the current versions of standards" />
    </div>
  );
}
