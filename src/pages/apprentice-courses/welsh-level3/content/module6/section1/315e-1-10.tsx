/**
 * Unit 315E — Understand the Principles of Electrical Installation Design
 * Learning Outcome 1 — Understand the requirements and constraints that govern installation design
 * Criterion 1.10 — The requirements and applications of functional earthing
 *
 * Approach: the page is built around one distinction and repeats it deliberately — functional
 * earthing is for the equipment to work, protective earthing is for people not to die. Everything
 * else hangs off that: where functional earthing is actually needed, functional equipotential
 * bonding, the conductor requirements, and the identification of a combined conductor.
 * This criterion was a gap in our course library — no existing lesson taught it, so this is the
 * only place a learner will meet it.
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
    question: 'What is the purpose of functional earthing?',
    options: [
      'To allow equipment to operate correctly',
      'To protect people against electric shock',
      'To provide a path for fault current to operate a protective device',
      'To replace the main protective bonding in a comms room',
    ],
    correctAnswer: 0,
    explanation:
      'Functional earthing exists so the equipment works. Protective earthing exists so people do not die. They are two different jobs and one never substitutes for the other.',
  },
  {
    id: 2,
    question: 'Which section of BS 7671 deals with functional earthing and functional equipotential bonding for ICT equipment and systems?',
    options: [
      'Section 545, introduced by Amendment 4',
      'The chapter dealing with protection against electric shock',
      'The chapter dealing with initial verification',
      'The appendix containing the current-carrying capacity tables',
    ],
    correctAnswer: 0,
    explanation:
      'Section 545 was introduced by Amendment 4 and covers functional earthing and functional equipotential bonding for information and communication technology equipment and systems.',
  },
  {
    id: 3,
    question: 'A functional earth conductor may be used as a substitute for a protective earthing conductor when:',
    options: [
      'Never — functional earthing is never a substitute for protective earthing',
      'The equipment is Class II and no protective conductor is required',
      'The functional earth has a lower impedance than the protective conductor',
      'The installation is in a comms room with a dedicated earth bar',
    ],
    correctAnswer: 0,
    explanation:
      'There is no condition under which a functional earth stands in for a protective earth. They do different jobs. Treating one as the other is a dangerous error.',
  },
  {
    id: 4,
    question: 'What is functional equipotential bonding?',
    options: [
      'Bonding provided so that equipment operates correctly, rather than for protection against electric shock',
      'Bonding of extraneous-conductive-parts at the origin of the installation for shock protection',
      'Supplementary bonding in a location containing a bath or shower',
      'The connection between the means of earthing and the main earthing terminal',
    ],
    correctAnswer: 0,
    explanation:
      'Functional equipotential bonding ties metalwork together so equipment references the same potential and operates reliably. It is about correct operation, not shock protection.',
  },
  {
    id: 5,
    question: 'Why is ICT the place where functional earthing mostly lives?',
    options: [
      'Equipment that exchanges signals needs a common reference and freedom from interference to work reliably',
      'ICT equipment draws more current than other equipment and needs a larger earth',
      'ICT equipment is exempt from protective earthing requirements',
      'ICT cabling cannot carry a protective conductor',
    ],
    correctAnswer: 0,
    explanation:
      'Signal reference, noise and interference between items of equipment that have to talk to each other are what drive the requirement. Section 545 applies to ICT installations such as broadcast and communication technology where functional earthing or bonding is necessary for correct operation.',
  },
  {
    id: 6,
    question: 'What does Section 545 say about the size of functional bonding conductors?',
    options: [
      'It includes requirements for minimum cross-sectional area of functional bonding conductors',
      'It states that any conductor size is acceptable because no fault current flows',
      'It requires them to be the same size as the main protective bonding conductor in every case',
      'It leaves the size entirely to the equipment manufacturer with no requirement in BS 7671',
    ],
    correctAnswer: 0,
    explanation:
      'Section 545 includes requirements for minimum cross-sectional area of functional bonding conductors. The numbers are in the section, and you read them there rather than guessing.',
  },
  {
    id: 7,
    question: 'A conductor that provides both protective earthing and a required functional earth connection must be:',
    options: [
      'Identified in accordance with the revised Table 51 identification rules',
      'Coloured blue so it is not confused with a protective conductor',
      'Left unmarked because it performs two functions',
      'Run in a separate containment from all other earthing conductors',
    ],
    correctAnswer: 0,
    explanation:
      'Table 51 in Chapter 51 has been revised to include identification for a combined protective and functional earthing conductor. Correct marking is what stops somebody confusing a protective conductor with a functional-only one.',
  },
  {
    id: 8,
    question: 'You find a green-and-yellow conductor in a data cabinet with a label saying functional earth. What do you do?',
    options: [
      'Leave it connected and find out what it serves before touching it',
      'Disconnect it, since a functional earth serves no protective purpose',
      'Reconnect it to the main earthing terminal as a protective conductor',
      'Cut it back and make it off as a spare for future use',
    ],
    correctAnswer: 0,
    explanation:
      'A labelled functional earth is there because a design called for it. You do not invent functional earthing and you do not remove it. Find out what it serves first.',
  },
];

export default function Lesson315e_1_10() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'Functional earthing is for the equipment to work. Protective earthing is for people not to die. Two different jobs, and they must never be confused.',
          'A functional earth is never a substitute for a protective earth, and a functional requirement must never be allowed to compromise the protective earthing arrangement.',
          'Section 545, introduced by Amendment 4, covers functional earthing and functional equipotential bonding for information and communication technology equipment and systems.',
          'Functional equipotential bonding ties metalwork together so equipment references the same potential and operates reliably, not to provide shock protection.',
          'A conductor doing both jobs has its own identification in the revised Table 51, because somebody who mistakes a functional earth for a protective earth has made a dangerous error.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'State the difference between functional earthing and protective earthing, and explain why one can never substitute for the other.',
          'Identify where functional earthing and functional equipotential bonding are required, particularly in ICT, broadcast and communication technology installations.',
          'Explain what functional equipotential bonding is and how it differs from bonding provided for protection against electric shock.',
          'Describe why signal reference, noise and interference make ICT the main home of functional earthing requirements.',
          'Explain the identification requirements for a combined protective and functional earthing conductor, and why misidentification is dangerous.',
        ]}
        initialVisibleCount={3}
      />

      <SectionRule />

      <ContentEyebrow>Two earths, two jobs</ContentEyebrow>

      <ConceptBlock
        title="The one thing to take away — two earths, two jobs"
        plainEnglish="Functional earthing is so the kit works. Protective earthing is so nobody dies. Say it out loud until it sticks."
      >
        <p>
          This is the sentence the whole criterion turns on. <strong>Functional earthing exists so
          equipment operates correctly. Protective earthing exists so people are not killed or injured by
          electric shock.</strong> They are different requirements, with different reasons, doing different
          jobs.
        </p>
        <p>
          Everything that goes wrong with this topic on site goes wrong because somebody collapsed those
          two ideas into one. It is easy to do. Both end up connected to earth. Both may be green and
          yellow. Both land on a bar in a cabinet. From two metres away they look like the same thing.
        </p>
        <p>
          They are not the same thing, and the consequences of confusing them run in one direction only.
          If you lose a functional earth, some equipment misbehaves. Data gets noisy. A system becomes
          unreliable. Somebody has a bad afternoon. If you lose a protective earth, or you rely on a
          functional earth to do a protective job, the first fault that appears has nowhere to go and a
          person becomes the path.
        </p>
        <ul className="space-y-2 text-white">
          <li><strong>Protective earthing.</strong> Safety. It is part of the protective measure against electric shock. It is sized, verified, tested and recorded as a safety function.</li>
          <li><strong>Functional earthing.</strong> Operation. It is there because the equipment needs a reference or a bonded environment to work properly.</li>
          <li><strong>Never a substitute.</strong> A functional earth does not become a protective earth because it happens to be connected and happens to be low impedance.</li>
          <li><strong>Never a compromise.</strong> A functional earthing requirement is never a reason to weaken, reroute or disconnect part of the protective earthing arrangement.</li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Why the confusion is so dangerous"
        onSite="The failure mode is silent. Nothing looks wrong until somebody touches something."
      >
        <p>
          Consider the two mistakes in turn. First, somebody treats a protective conductor as if it were
          functional. It is in the way, it looks like duplication, so they move it or take it out. Nothing
          happens. No alarm, no trip, no fault indication. The installation looks exactly as it did
          yesterday. The protection is simply not there any more, and nobody will discover that until the
          day a fault appears.
        </p>
        <p>
          Second, somebody treats a functional conductor as if it were protective. They see a green and
          yellow conductor on an equipment frame, assume the frame is earthed for safety, and go no
          further. The frame may in fact have no protective connection at all. The functional earth was
          never designed, sized or verified to carry fault current or to operate a protective device.
        </p>
        <p>
          Both errors are invisible on a walk round, which is exactly why identification matters so much
          here.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Where functional earthing applies</ContentEyebrow>

      <ConceptBlock
        title="Where functional earthing is actually needed"
        plainEnglish="Information and communication technology. Data cabinets, comms rooms, structured cabling, broadcast."
      >
        <p>
          Functional earthing is not a general requirement scattered across every installation. It has a
          home, and that home is information and communication technology equipment and systems. Section
          545 requires the provision of functional earthing and functional equipotential bonding for ICT
          equipment and systems, and it applies to ICT installations such as broadcast and communication
          technology where functional earthing or bonding is necessary for correct operation.
        </p>
        <ul className="space-y-2 text-white">
          <li><strong>Data cabinets and racks.</strong> Cabinet frames, rack rails, patch panels and cable management that need to sit at a common reference.</li>
          <li><strong>Comms rooms.</strong> Rooms full of equipment that has to exchange signals reliably, often from several different manufacturers.</li>
          <li><strong>Structured cabling.</strong> Screened cabling systems, containment and the metalwork associated with them.</li>
          <li><strong>Broadcast installations.</strong> Studios, technical areas and equipment rooms where signal integrity is the entire point of the installation.</li>
        </ul>
        <p>
          Read the condition carefully: <em>where functional earthing or bonding is necessary for correct
          operation</em>. That is the trigger. Not every socket in an office needs a functional earth.
          A rack of interconnected equipment that has to talk to itself cleanly might.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="315e-1-10-check-2"
        question="Where does BS 7671 place the requirements for functional earthing and functional equipotential bonding for ICT equipment and systems?"
        options={[
          'In the requirements for protection against electric shock',
          'In the requirements for initial verification',
          'In the appendix holding the current-carrying capacity tables',
          'Section 545, introduced by Amendment 4',
        ]}
        correctIndex={3}
        explanation="Amendment 4 introduced a new Section 545 dealing with functional earthing and functional equipotential bonding for ICT equipment and systems, including broadcast and communication technology."
      />

      <ConceptBlock
        title="Functional equipotential bonding"
        plainEnglish="Bonding metalwork together so equipment works properly, rather than so people are protected."
      >
        <p>
          You already know equipotential bonding as a shock protection idea. Tie conductive parts together
          so that, under fault conditions, the difference in potential between things a person can touch
          simultaneously is not dangerous.
        </p>
        <p>
          Functional equipotential bonding borrows the technique and applies it for a completely different
          reason. Here you are tying metalwork together so that items of equipment share the same reference
          potential and therefore work reliably together. Rack frames, cabinet panels, containment,
          equipment chassis. The goal is a stable, common reference, not shock protection.
        </p>
        <p>
          Two things follow from that. First, the fact that a cabinet is functionally bonded tells you
          nothing about whether it is protectively earthed. Second, the reverse also holds. A cabinet that
          is properly protectively earthed may still not meet the functional requirement, because the
          protective arrangement was never designed to give a clean common reference.
        </p>
        <p>
          The two arrangements can coexist in the same cabinet, on the same metalwork, using separate
          conductors. That is normal. What is not acceptable is assuming one gives you the other.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="315e-1-10-check-1"
        question="A rack frame in a comms room has a functional bonding conductor to the cabinet bonding bar. What can you conclude about its protective earthing?"
        options={[
          'It is protectively earthed, because the bonding bar is connected to earth',
          'It does not need a protective connection because functional bonding covers it',
          'Nothing — the functional bonding tells you nothing about whether a protective connection exists',
          'It is protectively earthed provided the conductor is green and yellow',
        ]}
        correctIndex={2}
        explanation="Functional bonding is provided for correct operation. It is not a protective measure and it proves nothing about the protective earthing arrangement. You have to establish that separately."
      />

      <SectionRule />

      <ContentEyebrow>ICT systems and conductors</ContentEyebrow>

      <ConceptBlock
        title="Why ICT is where this lives"
        onSite="Signal reference, noise, and equipment that has to talk to other equipment."
      >
        <p>
          Power equipment mostly does not care about small differences in potential between one piece of
          metalwork and another. A motor does not mind. A luminaire does not mind. ICT equipment minds a
          great deal, because the signals it is handling are small, fast, and measured against a reference.
        </p>
        <ul className="space-y-2 text-white">
          <li><strong>Signal reference.</strong> Equipment that exchanges data needs a common reference. If two items sit at different potentials, the receiving end may not read what the sending end sent.</li>
          <li><strong>Noise.</strong> Electrical noise coupled into cabling and metalwork degrades signals. A properly bonded environment reduces it.</li>
          <li><strong>Interference between equipment.</strong> Kit in the same rack can interfere with its neighbours. Functional bonding is part of how that is managed.</li>
          <li><strong>Reliability, not safety.</strong> The symptom of getting this wrong is intermittent faults, dropped links and equipment that works on the bench and not in the rack.</li>
        </ul>
        <p>
          Bad functional earthing does not blow anything up. It produces an installation that mostly works,
          with an intermittent problem everyone blames on the equipment. That is a miserable fault to
          chase, and it starts as an installation decision.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="The conductor question"
        plainEnglish="Functional bonding conductors have minimum cross-sectional area requirements, and they are in Section 545."
      >
        <p>
          A reasonable question at this point is how big these conductors need to be. Since they are not
          carrying fault current, is any old wire acceptable?
        </p>
        <p>
          No. Section 545 includes requirements for the minimum cross-sectional area of functional bonding
          conductors. The requirement exists, it is written down, and the place to read it is the section
          itself.
        </p>
        <p>
          So do not pick a size by eye on the reasoning that it is only a functional connection, and do not
          copy whatever was in the last cabinet. Look the requirement up, apply it, record what you
          installed.
        </p>
        <p>
          There is also a design-coordination point here. Equipment manufacturers frequently specify
          functional earthing arrangements for their own kit. Those instructions sit alongside the
          requirements of the standard, not instead of them, and where a manufacturer asks for something
          that would compromise the protective earthing arrangement, the protective arrangement wins and
          the conflict goes back to the designer.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Identifying the conductor</ContentEyebrow>

      <ConceptBlock
        title="Identification — and why it matters more here than almost anywhere"
        onSite="A conductor doing both jobs now has its own identification. Use it."
      >
        <p>
          Table 51 in Chapter 51 has been revised to include identification for a combined protective and
          functional earthing conductor. A combined protective and functional earthing conductor is a
          conductor that provides both protective earthing, meaning safety earthing to prevent electric
          shock, and a required functional earth connection for the operation of electrical equipment.
        </p>
        <p>
          Where a conductor performs combined protective and functional earthing or bonding, it shall be
          identified in accordance with the revised Table 51 identification rules. The reason is stated as
          plainly as anything in the standard: using correct marking avoids confusion between protective
          conductors and functional-only conductors.
        </p>
        <p>
          Think about who reads that marking. Not you, on the day you install it. The person who opens the
          cabinet in five years, under time pressure, to add a rack. They will make a decision about every
          conductor they see in the first thirty seconds. The marking is the only thing telling them which
          conductors are keeping somebody alive.
        </p>
        <p>
          Labelling inside comms cabinets is therefore not cosmetic. An unmarked conductor is a guess
          waiting to happen.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 545.1.3"
        clause="545.1.3 Identification A functional earthing conductor shall be identified by colour or alphanumeric designation according to Table 51. A functional bonding conductor shall be identified by colour or alphanumeric designation according to Table 51."
        meaning="Identification is not a nicety you add if there is time. Every functional earthing conductor and every functional bonding conductor you install has to carry an identification taken from Table 51, either by colour or by an alphanumeric marking. On site that means you look Table 51 up rather than reaching for whatever sleeve is in the van, and you mark the conductor before you close the cabinet &mdash; because the next person to open it will read your marking, not your intentions."
        cite="BS 7671 Part 5, Chapter 54, Section 545 — Regulation 545.1.3"
      />

      <InlineCheck
        id="315e-1-10-check-3"
        question="Why does a combined protective and functional earthing conductor need its own identification?"
        options={[
          'It carries more current than an ordinary protective conductor',
          'Correct marking avoids confusion between protective conductors and functional-only conductors',
          'It must be distinguished from the main protective bonding conductor for testing purposes',
          'It is installed by a different trade and needs to be labelled for handover',
        ]}
        correctIndex={1}
        explanation="Table 51 was revised to include identification for a combined protective and functional earthing conductor, precisely so nobody confuses a protective conductor with a functional-only one. That confusion is a safety error."
      />

      <ContentEyebrow>What you actually do on site</ContentEyebrow>

      <ConceptBlock
        title="What the electrician actually does on site"
        plainEnglish="Install it where the design calls for it. Do not invent it. Do not remove it."
      >
        <p>
          The practical rules are short, and they are the part of this page most likely to matter to you in
          the next twelve months.
        </p>
        <ul className="space-y-2 text-white">
          <li><strong>Install what the design calls for.</strong> Functional earthing and functional bonding come from a design and from equipment requirements. Follow them.</li>
          <li><strong>Never invent it.</strong> Adding an undesigned functional earth can create an unintended path between systems. If you think one is needed, raise it with the designer.</li>
          <li><strong>Never remove it.</strong> A conductor labelled as a functional earth is not a spare. It is not a leftover from a previous job. Find out what it serves before you touch it.</li>
          <li><strong>Never let it compromise protective earthing.</strong> If meeting a functional requirement would weaken the protective arrangement, stop and refer it back.</li>
          <li><strong>Identify everything.</strong> Especially a combined conductor, which now has identification of its own.</li>
          <li><strong>Record it.</strong> The next person needs to know what you installed and why.</li>
        </ul>
        <p>
          One more point of honesty about the state of the standard. This is a new and growing area.
          Section 545 was introduced by Amendment 4, and Table 51 was revised at the same time to add the
          combined conductor identification. Do not assume the arrangements you find in an older comms room
          reflect what is required now, and do not assume everyone on site is aware the requirements have
          been added.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 545.1.4"
        clause="545.1.4 Electrical continuity of functional bonding conductors The requirements of Regulation 543.3, except for Regulation 543.3.5, also apply for functional bonding. If part of an item of equipment can be removed, the functional bonding conductor for the remaining part of the electrical installation shall not be disconnected."
        meaning="This is the regulation behind &ldquo;never remove it&rdquo;. Pulling one unit out of a rack or a cabinet must not break the functional bonding of everything left behind, so the bonding has to be arranged and connected such that removing that item leaves the rest still bonded. In practice: do not daisy-chain the functional bonding through a removable item, and do not lift a functional bonding conductor to get a bit of slack while you work."
        cite="BS 7671 Part 5, Chapter 54, Section 545 — Regulation 545.1.4"
      />

      <SectionRule />

      <RegsCallout
        source="BS 7671:2018+A4:2026"
        clause="Section 545 — Functional earthing and functional equipotential bonding (new in Amendment 4)"
        meaning="Section 545 requires provision of functional earthing and functional equipotential bonding for information and communication technology (ICT) equipment and systems. It applies to ICT installations such as broadcast and communication technology where functional earthing or bonding is necessary for correct operation, and includes requirements for minimum cross-sectional area of functional bonding conductors."
        cite="BS 7671 Part 5, Chapter 53, Section 545"
      />

      <SectionRule />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Treating a functional earth as a spare conductor"
        whatHappens={
          <>
            An electrician is adding equipment to a data cabinet and needs the space. There is a green and
            yellow conductor landed on a small bar at the bottom of the cabinet, going off into the
            containment, apparently duplicating an earth that is already there. It has a faded label
            nobody reads. It looks like somebody else&rsquo;s leftover, so it gets disconnected and made
            off. Nothing trips. Nothing alarms. Two weeks later a link between two racks starts dropping
            packets at random and three people spend a fortnight blaming the switches. In the worse version
            of the same story the conductor was a combined protective and functional earthing conductor,
            and what has actually been removed is the protective connection to a piece of metalwork people
            touch every day.
          </>
        }
        doInstead={
          <>
            Treat every earthing conductor in an ICT installation as deliberate until you have proved
            otherwise. Do not disconnect a conductor because it looks like a duplicate. Trace it, read the
            identification, and check the design and the record drawings for what functional earthing and
            functional bonding were specified. If it really is redundant, that is a decision for the
            designer, made in writing, not one for the person who needs the space. Where a conductor
            performs combined protective and functional earthing or bonding, make sure it is identified in
            accordance with the revised Table 51 rules, and mark any you find unmarked before you close the
            cabinet.
          </>
        }
      />

      <CommonMistake
        title="Seeing a bonded rack frame and assuming it is protectively earthed"
        whatHappens={
          <>
            Somebody opens a comms cabinet, sees green and yellow landed on the cabinet bonding bar from
            the rack frames, and concludes the metalwork is earthed for safety. The tick goes in, the
            cabinet is closed, and nobody looks any further. What they have actually seen is the
            functional bonding — conductors installed so the equipment in the rack shares a common
            reference and works reliably. That arrangement was never designed, sized or verified to carry
            fault current or to operate a protective device. The frame may have no protective connection
            at all. Nothing about the installation looks wrong from that day onward, because the failure
            is silent: the equipment runs perfectly, the data is clean, and the missing protection shows
            up only when a fault appears on something a person is touching.
          </>
        }
        doInstead={
          <>
            Establish the protective earthing separately, every time, and never infer it from the presence
            of bonding. Functional bonding tells you nothing about whether a protective connection exists,
            and the reverse also holds — a properly protectively earthed cabinet may still not satisfy the
            functional requirement. Work out which conductor is doing which job by tracing it and reading
            its identification, and where a conductor performs combined protective and functional earthing
            or bonding, check it is identified in accordance with the revised Table 51 rules. If you cannot
            say from the design and the records which arrangement each conductor belongs to, you have not
            verified the protective earthing and you should not be recording that you have.
          </>
        }
      />

      <SectionRule />

      <Scenario
        title="Wrexham — the broadcast fit-out with a conductor nobody could explain"
        situation={
          <>
            You are on a technical fit-out at a media production unit on an industrial estate in Wrexham.
            Two equipment racks, screened structured cabling, and a small studio area. The design pack
            includes a functional earthing and functional bonding arrangement for the racks and the
            containment. On the second day you find, in the existing riser, a heavy green and yellow
            conductor that is not on any drawing, landed on the same bar the design wants you to use. The
            site manager wants the racks energised for a client demonstration on Thursday and tells you to
            work round it. One of the other electricians suggests just lifting it, since it is not on the
            drawing and is in the way of the new containment. Nobody on site can say what it serves.
          </>
        }
        whatToDo={
          <>
            Do not lift it, and do not land your new functional bonding on that bar until you know what the
            bar is. An unidentified conductor of that size in a riser is more likely to be protective than
            functional, and if it is a combined protective and functional earthing conductor then removing
            it takes away shock protection from metalwork somewhere in the building. Trace it properly.
            Check the existing installation records and the record drawings for any previous fit-out. In
            the meantime install the designed functional bonding exactly as specified, keeping it separate
            and clearly identified, so your work does not depend on a conductor you cannot account for.
            Report the finding to the designer in writing the same day, with a photograph and a location,
            and ask for a decision. When it is resolved, identify it in accordance with the revised Table 51
            rules. Thursday is not actually blocked: energising the racks does not require the unknown
            conductor to be disturbed.
          </>
        }
        whyItMatters={
          <>
            The commercial pressure here is real and it points the wrong way. Lifting the conductor takes
            two minutes and solves the containment problem. Tracing it costs half a day and delays nothing
            that anybody can see. That asymmetry is exactly how protective conductors get removed. In a
            broadcast installation the incentive is worse than usual, because the functional side of the
            earthing is highly visible — if the signal is noisy everyone notices immediately — while the
            protective side is invisible right up until somebody gets a shock off a rack frame. Keeping the
            two straight, and keeping them both, is the job. Functional earthing is so the kit works.
            Protective earthing is so nobody dies. On this site you are being asked to trade the second
            for convenience, and the answer is no.
          </>
        }
      />

      <SectionRule />

      <FAQ
        items={[
          {
            question: 'If a cabinet already has a protective earth, does it still need a functional earth?',
            answer:
              'It may. The two arrangements are provided for different reasons and one does not satisfy the other. Where the design or the equipment requires functional earthing or functional equipotential bonding for correct operation, it is installed in addition to the protective earthing, not instead of it.',
          },
          {
            question: 'Can I size a functional bonding conductor by eye since it carries no fault current?',
            answer:
              'No. Section 545 includes requirements for the minimum cross-sectional area of functional bonding conductors. Read the requirement in the section and apply it. Copying whatever was in the last cabinet is not a method.',
          },
          {
            question: 'What do I do if a manufacturer asks for an earthing arrangement that conflicts with the protective earthing?',
            answer:
              'Stop and refer it to the designer. Manufacturer requirements sit alongside the standard, not above it. A functional requirement must never be allowed to compromise the protective earthing arrangement, so the conflict is resolved on paper before anything is installed.',
          },
          {
            question: 'Is functional earthing something that has always been in BS 7671?',
            answer:
              'This is a new and growing area. Amendment 4 introduced a new Section 545 dealing with functional earthing and functional equipotential bonding for ICT equipment and systems, and revised Table 51 to add identification for a combined protective and functional earthing conductor. Do not assume older installations were built to these requirements.',
          },
        ]}
      />

      <SectionRule />

      <KeyTakeaways
        points={[
          'Functional earthing is for the equipment to work. Protective earthing is for people not to die. Never confuse them.',
          'A functional earth is never a substitute for a protective earth, and a functional requirement never justifies compromising the protective earthing arrangement.',
          'Section 545, new in Amendment 4, requires functional earthing and functional equipotential bonding for ICT equipment and systems.',
          'It applies to ICT installations such as broadcast and communication technology where functional earthing or bonding is necessary for correct operation.',
          'Functional equipotential bonding ties metalwork together so equipment shares a reference potential, not for shock protection.',
          'ICT is where this lives because of signal reference, noise and interference between equipment that has to talk to each other.',
          'Section 545 includes requirements for minimum cross-sectional area of functional bonding conductors — look them up rather than sizing by eye.',
          'Table 51 has been revised to identify a combined protective and functional earthing conductor, because correct marking prevents a dangerous mix-up.',
        ]}
      />

      <SectionRule />

      <ContentEyebrow>Check yourself</ContentEyebrow>

      <Quiz questions={quizQuestions} title="Requirements and applications of functional earthing" />
    </div>
  );
}
