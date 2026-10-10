/**
 * BMS Module 1 · Section 5 — Standards and regulations
 *
 * Rebuilt 10 Oct 2026 on the learning primitives. Teaches the rules that decide whether a
 * building needs a BMS and what that BMS must be able to do: Approved Document L as statutory
 * guidance (not law in itself), the 180 kW effective rated output trigger in England (and the
 * Welsh and Scottish figures), what counts towards effective rated output, the four functions
 * an installed system should provide, BS EN ISO 16484 as the BACS standards series, BS EN ISO
 * 52120-1 and its classes A to D, sub-metering, commissioning and the building log book. The
 * old page taught EN 15232 as the current standard, described Class D as "non-automated",
 * claimed a 20–30% saving from moving D to A, said BREEAM "often requires" compliance and
 * carried an invented Class C to Class A case study. All of that is gone. Every paragraph
 * reference and figure is traced in BMSModule1Section5.notes.md.
 */
import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PrevNext } from '@/components/study-centre/course-kit';
import {
  TLDR,
  ConceptBlock,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
  Pullquote,
  RegsCallout,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Standards and regulations | BMS Module 1.5 | Elec-Mate';
const DESCRIPTION =
  'When Approved Document L expects a BMS, what it must do, BS EN ISO 16484 and 52120-1 classes A to D, sub-metering, commissioning and the log book, for UK electricians.';

const outcomes = [
  'Explain what Approved Document L is, and why following it is one way, not the only way, to meet the Building Regulations',
  'State the effective rated output above which a building automation and control system is expected in England, Wales and Scotland',
  'Work out what does and does not count towards effective rated output on a real building',
  'List the four things an installed system should be able to do, and say which standard it should comply with',
  'Describe the BS EN ISO 52120-1 classes A to D, and explain why EN 15232 should no longer be quoted as current',
  'Say what the sub-metering, commissioning and log book guidance asks of the people who install the system',
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A client says: "Approved Document L is the law, so we have to do exactly what it says." What is the accurate reply?',
    options: [
      'It is guidance; another route is allowed if agreed with building control',
      'It is the law, and every paragraph in it must be followed word for word',
      'It is voluntary best practice with no link to the Building Regulations at all',
      'It only applies to dwellings, so a commercial building can ignore it',
    ],
    correctIndex: 0,
    explanation:
      'Approved Document L is statutory guidance. The legal requirements sit in the Building Regulations themselves; the approved document shows common ways of meeting them. Following it is the usual route, and a different route is allowed if it is agreed with the building control body early. Nor is it limited to homes: Volume 2 is written for buildings other than dwellings.',
  },
  {
    id: 2,
    question:
      'A new office in England will have heating plant with an effective rated output of 220 kW. What does Approved Document L expect?',
    options: [
      'Nothing, because the trigger is 290 kW in England',
      'A building automation and control system (BACS) is expected',
      'Only centralised switches so the facilities manager can turn plant off',
      'A BMS only if the building also has comfort cooling',
    ],
    correctIndex: 1,
    explanation:
      'In England the trigger is an effective rated output greater than 180 kW for space heating or air conditioning, so 220 kW is over it and the guidance expects a BACS to be fitted. The 290 kW figure belongs to Scotland and to Wales until March 2027. Centralised switching is what the guidance suggests considering for buildings below the trigger.',
  },
  {
    id: 3,
    question:
      'Which of these should be left out when you add up the effective rated output of a heating system?',
    options: [
      'A secondary space heating system serving the reception',
      'The heating coils in an air handling unit that warms the offices',
      'A water heater serving only the domestic hot water',
      'The primary boilers serving the radiator circuits',
    ],
    correctIndex: 2,
    explanation:
      'Heating for domestic hot water does not count, and nor do frost protection, emergency or occasional backup plant, or industrial process heat. Primary and secondary space heating both count, and so does space heating combined with a ventilation system, which is why the AHU heating coils go in the total.',
  },
  {
    id: 4,
    question:
      'Under the 2026 England edition of Approved Document L, which level should comfort cooling controls meet?',
    options: [
      'BS EN ISO 52120-1 Class A',
      'BS EN 15232 Band C',
      'BS EN ISO 52120-1 Class C',
      'None, as cooling controls are not covered',
    ],
    correctIndex: 2,
    explanation:
      'The 2026 edition, which takes effect on 24 March 2027, says comfort cooling controls should meet BS EN ISO 52120-1 Class C (para 5.40e). BS EN 15232 Band C is the wording of the 2021 edition (para 6.35e), which is in force until then. Class A comes from the note on BACS functions; it is not the level asked of cooling controls.',
  },
  {
    id: 5,
    question:
      'A specification calls for BS EN ISO 52120-1 Class B. What does that tell you about the room controllers?',
    options: [
      'They can be stand-alone thermostats with no network link',
      'They should talk to the building automation system',
      'They must control ventilation from CO2 in every room',
      'They are not needed, as Class B covers central plant only',
    ],
    correctIndex: 1,
    explanation:
      'Class B is advanced automation with central, coordinated management of the plant, and room controls that communicate with the building automation system. Ventilation driven by CO2 is the Class A approach. Stand-alone conventional controls belong to Class C or D. Class B still includes room control.',
  },
  {
    id: 6,
    question:
      'Which of these is one of the functions Approved Document L expects an installed BACS to provide?',
    options: [
      'Spotting HVAC efficiency losses and telling the building manager',
      'Driving the fire alarm shutdown of every air handling unit in the building',
      'Producing the Energy Performance Certificate for the building automatically',
      'Replacing the need for any sub-metering of the building',
    ],
    correctIndex: 0,
    explanation:
      'The system should benchmark efficiency, spot losses in HVAC efficiency and inform whoever is responsible for managing the building, alongside continuous monitoring and logging, compliance with BS EN ISO 16484 and interoperability. Fire shutdown is the fire system’s job, not the BMS’s, and the BMS does not replace the sub-metering guidance.',
  },
  {
    id: 7,
    question:
      'You are wiring sub-meters on a new building in England. What is the sub-metering guidance aiming for on each fuel?',
    options: [
      'One main meter per fuel, read by the supplier each quarter',
      'At least 90% of yearly use assignable to an end use',
      'Every final circuit in the building has its own meter',
      'Only the renewable systems are metered, nothing else',
    ],
    correctIndex: 1,
    explanation:
      'The guidance asks for end uses such as heating, lighting and cooling to be sub-metered so that at least 90% of each fuel’s yearly consumption can be attributed to an end use. It does not ask for a meter on every circuit. Renewables should be monitored separately, as well as, not instead of, the end-use metering.',
  },
  {
    id: 8,
    question:
      'A new building has a total useful floor area of 3,000 m². What does that add to the metering guidance?',
    options: [
      'Nothing; floor area does not affect metering',
      'Each tenant no longer needs to be metered separately',
      'The renewable systems can be metered with the lighting',
      'Automatic meter reading and data collection',
    ],
    correctIndex: 3,
    explanation:
      'Above 1000 m² total useful floor area, the guidance adds automatic meter reading with data collection. In practice that usually means the meters are wired back to the BMS or a dedicated energy system. Tenant metering and separate renewables monitoring apply regardless of size.',
  },
  {
    id: 9,
    question:
      'Commissioning of the fixed building services is finished. Where does the commissioning record end up for the building owner?',
    options: [
      'Nowhere; commissioning records stay with the controls contractor',
      'Only on the electrical installation certificate',
      'In the building log book handed to the owner',
      'Only with the building control body, never with the owner',
    ],
    correctIndex: 2,
    explanation:
      'The building log book given to the owner should include a copy of the completed commissioning records along with the information needed to run the building efficiently. Separately, a notice that commissioning is complete goes to building control and the owner. The electrical installation certificate is a BS 7671 document and does not cover controls commissioning.',
  },
  {
    id: 10,
    question:
      'An existing building with 400 kW of heating in England is having its old BMS replaced. Which statement is right?',
    options: [
      'The new system should meet the specification paragraphs for a BACS',
      'Existing buildings are outside the guidance, so any controls will do',
      'The BMS must be removed, because only new buildings may have one',
      'The rules only start to apply once the boilers are replaced too',
    ],
    correctIndex: 0,
    explanation:
      'Where an existing building is over the 180 kW trigger and its BACS is being installed or replaced, that system should follow the specification paragraphs: BS EN ISO 16484, monitoring and analysis, benchmarking and interoperability, with capabilities suited to the building. A controls replacement on its own is enough to bring it in.',
  },
];

const BMSModule1Section5 = () => {
  useSEO(TITLE, DESCRIPTION);
  return (
    <HubPage>
      <HubMasthead
        section="Module 1 · Section 5"
        title="Standards and regulations"
        backTo="/study-centre/upskilling/bms-module-1"
      />
      <HubBody>
        <p className="max-w-3xl text-[15px] leading-relaxed text-white lg:text-[17px]">
          When a building is expected to have a BMS, what that BMS should be able to do, and the
          standards and paperwork that sit around it.
        </p>

        <TLDR
          points={[
            'Approved Document L is statutory guidance on meeting the Building Regulations. It is the usual route, not the only one, and the legal requirements sit in the Regulations themselves.',
            'In England, a building automation and control system is expected where space heating or air conditioning has an effective rated output above 180 kW. Scotland uses 290 kW; Wales uses 290 kW until 4 March 2027 and 180 kW from then.',
            'An installed system should comply with BS EN ISO 16484, monitor and analyse energy use, flag efficiency losses to whoever runs the building, and talk to other makers’ equipment.',
            'BS EN ISO 52120-1 has replaced EN 15232. It sorts building automation into classes A (high energy performance) to D (not energy efficient), with C as the reference.',
            'The same guidance covers sub-metering, commissioning and the building log book, which is where much of the electrician’s work and paperwork sits.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <SectionRule />
        <ContentEyebrow>Where the rules come from</ContentEyebrow>

        <ConceptBlock
          title="Approved Document L is guidance on meeting the law, not the law itself"
          plainEnglish="The Building Regulations say what must be achieved. Approved Document L shows a common, accepted way of achieving it."
          onSite="If a designer or client wants to do something differently from the approved document, that is a conversation with building control, early, before the plant is ordered."
        >
          <p>
            The energy efficiency rules for buildings in England live in Part L of the Building
            Regulations 2010 (it sits in Schedule 1). Approved Document L is the statutory guidance
            that sits alongside them. Volume 2 is the one that matters for BMS work, because it
            covers buildings other than dwellings: offices, schools, hospitals, shops, warehouses.
          </p>
          <p>
            The document itself is clear about its own status. The boxed text at the start of each
            section is taken from the Regulations and is the legal requirement. Everything after it
            is guidance, setting out one or more ways to show the requirement has been met in common
            situations. There can be other ways to comply, but anyone choosing a different route is
            told to agree it with the building control body at an early stage.
          </p>
          <p>Two consequences follow, and both matter on site:</p>
          <ul>
            <li>
              <strong>Following the guidance is not a guarantee.</strong> The approved document says
              plainly that simply following it does not guarantee compliance. Whoever applies it
              needs enough knowledge to apply it properly to the building in front of them.
            </li>
            <li>
              <strong>Installers are in the frame.</strong> The people it lists as responsible for
              building work include designers, builders, agents, installers and the owner of the
              building. If you install fixed building services, that includes you.
            </li>
          </ul>
          <p>
            A word on editions. In England the 2021 edition of Approved Document L Volume 2, in
            force since 15 June 2022, is the one in use now. A 2026 edition has been published. It
            takes effect on 24 March 2027 for most building work, and on 24 September 2027 for
            higher-risk building work, subject to transitional arrangements. For BMS work the core
            rules below are the same in both; the paragraph numbers move, and the 2026 edition
            replaces the references to EN 15232 with BS EN ISO 52120-1. This page quotes the 2021
            paragraph numbers that apply now, and gives the 2026 numbers, which apply from 24 March
            2027, alongside them.
          </p>
        </ConceptBlock>

        <Pullquote>
          The Regulations set the requirement. The approved document shows a way to meet it. Knowing
          which is which is what lets you answer a client’s question accurately.
        </Pullquote>

        <InlineCheck
          id="bms-1-5-guidance"
          question="Approved Document L lists who is responsible for building work meeting the requirements. Does that include the electrician installing the BMS?"
          options={[
            'No, only the designer and the building owner are listed',
            'Yes, installers are among those it lists as responsible',
            'No, responsibility sits only with building control',
            'Only if the electrician also signed the design drawings',
          ]}
          correctIndex={1}
          explanation="The approved document lists agents, designers, builders, installers and the building owner as responsible for building work. If you install fixed building services, that includes you. Building control checks the work but does not carry the responsibility for it, and signing drawings has nothing to do with it."
        />

        <SectionRule />
        <ContentEyebrow>When a BMS is expected</ContentEyebrow>

        <ConceptBlock
          title="The trigger is 180 kW of effective rated output in England"
          plainEnglish="If the heating or air conditioning in a non-domestic building is big enough, the guidance expects a proper building automation and control system, not just a few time clocks and thermostats."
          onSite="Ask for the plant schedule early. The kW figure on it decides whether the controls package has to meet the specification paragraphs, and that changes what gets priced."
        >
          <p>
            Approved Document L uses the term{' '}
            <strong>building automation and control system</strong> (BACS). In everyday site
            language that is the BMS. The guidance sets the trigger in terms of the{' '}
            <strong>effective rated output</strong> of the space heating or air-conditioning system:
          </p>
          <ul>
            <li>
              <strong>New buildings:</strong> where the effective rated output is greater than 180
              kW, a BACS should be installed (2021 para 6.66; 5.76 in the 2026 edition).
            </li>
            <li>
              <strong>Existing buildings:</strong> where the effective rated output is greater than
              180 kW and a system is being installed or replaced, it should follow the specification
              paragraphs 6.72 and 6.73 (2021 para 6.67; in the 2026 edition, para 5.77 pointing to
              paras 5.84 and 5.85).
            </li>
            <li>
              <strong>Combined systems:</strong> both apply where heating and air conditioning are
              combined with ventilation.
            </li>
            <li>
              <strong>Below the trigger:</strong> the guidance asks for centralised controls to be
              considered, so the facilities manager can switch equipment off when it is not needed,
              automated with a manual override where appropriate, while keeping essential loads such
              as life safety systems in mind (2021 para 6.68; 5.78 in the 2026 edition).
            </li>
          </ul>
          <p>
            The rest of the UK does not all use the same figure, and you will work across borders:
          </p>
          <ul>
            <li>
              <strong>Wales:</strong> the Welsh Approved Document L Volume 2 currently uses 290 kW.
              The Welsh 2026 edition takes effect on 4 March 2027 and lowers the trigger to 180 kW.
            </li>
            <li>
              <strong>Scotland:</strong> the guidance supporting the Scottish building standards for
              non-domestic building services uses 290 kW, with the same set of expected functions.
            </li>
            <li>
              <strong>Northern Ireland:</strong> has its own building regulations and guidance. This
              course does not state a figure for it; check the current guidance for the job.
            </li>
          </ul>
        </ConceptBlock>

        <RegsCallout
          source="Approved Document L Volume 2 (England)"
          clause="Paragraph 6.66 of the 2021 edition (5.76 in the 2026 edition), summarised: a new building whose space heating or air-conditioning system has an effective rated output above 180 kW should have a BACS installed. Paragraph 6.67 (5.77) applies the specification to existing buildings over the same figure when a system is installed or replaced."
          meaning={
            <>
              <p>
                This is the paragraph that turns a BMS from a nice-to-have into an expectation. The
                2021 edition is in force now. The 2026 edition, which takes effect on 24 March 2027,
                keeps the same 180 kW trigger at paragraphs 5.76 and 5.77.
              </p>
              <p>
                Note the word &ldquo;replaced&rdquo;. On an existing building over the trigger, a
                controls replacement on its own brings the new system under the specification
                paragraphs, even if no boiler or chiller is touched.
              </p>
            </>
          }
          cite="Paraphrased from ADL Vol 2 (2021) paras 6.66–6.67; (2026, takes effect 24 March 2027) paras 5.76–5.77."
        />

        <ConceptBlock
          title="What counts towards effective rated output"
          plainEnglish="Add up the plant that heats or cools the occupied spaces for comfort. Leave out the plant that does something else."
          onSite="Hot water plant, frost heaters and process cooling are the usual items people wrongly include, or wrongly use to argue a building is under the line."
        >
          <p>
            Effective rated output means the total output of the plant in the building that heats or
            cools the indoor space during normal running, so the occupants are comfortable (2021
            para 6.69; 5.79 in the 2026 edition). It is assessed on the final installed capacity,
            and the guidance tells designers to allow for oversizing and equipment substitution when
            they estimate it at design stage (2021 para 6.71; 5.80 in the 2026 edition).
          </p>
          <p>
            For <strong>air conditioning</strong>, it includes the combined maximum output, as
            specified by the manufacturer, of air-conditioning systems and of air conditioning
            combined with or forming part of a ventilation system (2021 para 6.69; 5.81 in the 2026
            edition).
          </p>
          <p>
            For <strong>heating</strong>, it includes the combined maximum output of primary space
            heating, space heating combined with or forming part of a ventilation system, and
            secondary space heating (2021 para 6.69; 5.82 in the 2026 edition). It does <em>not</em>{' '}
            include:
          </p>
          <ul>
            <li>plant that only runs as an emergency or occasional backup</li>
            <li>heaters that are there purely to stop things freezing</li>
            <li>water heating for hot taps and showers</li>
            <li>heating or cooling that serves a manufacturing or other process, not people</li>
          </ul>
          <p>
            Where a building takes its heat from a district or communal heat network, the figure is
            based on the capacity of the plant inside the building itself, with reasonable
            assumptions about how the network runs, including its flow temperatures (2021 para 6.70;
            5.83 in the 2026 edition).
          </p>
        </ConceptBlock>

        <CommonMistake
          title="Adding up every boiler on the plant room wall"
          whatHappens="Someone totals the nameplate outputs of everything in the plant room, including a standby boiler kept for breakdowns and the water heaters that only serve the domestic hot water, and declares the building comfortably over the trigger. On a different job the opposite happens: the air handling unit heating coils are forgotten because they are not in the boiler house, and a building that is over the line is treated as under it."
          doInstead="Work from the definition. Count the plant that heats or cools occupied space for comfort in normal operation, including heating and cooling inside ventilation plant and any secondary heating. Leave out backup-only plant, frost protection, domestic hot water and process loads. Use the final installed capacity, not an early estimate. Where the figure is close to the line, it is the designer's call to make and record, not yours to guess."
        />

        <InlineCheck
          id="bms-1-5-threshold"
          question="At design stage a new office's comfort heating was estimated at 175 kW. The boilers finally installed give 190 kW, with no other heating. Against the England trigger, which figure counts?"
          options={[
            '175 kW, because the design estimate fixes the figure',
            '190 kW, because the final installed capacity is used',
            '182.5 kW, the average of the estimate and the install',
            'Neither, until a year of metered data is available',
          ]}
          correctIndex={1}
          explanation="Effective rated output is assessed on the final installed capacity, and designers are told to allow for oversizing and equipment substitution when they estimate it. The figure is 190 kW, which is over the 180 kW trigger, so a BACS is expected. Averaging the two figures, or waiting for metered data, has no basis in the guidance."
        />

        <SectionRule />
        <ContentEyebrow>What the system should do</ContentEyebrow>

        <ConceptBlock
          title="Four functions, and controls that suit the building"
          plainEnglish="Over the trigger, the BMS is expected to do more than run plant on a timetable. It has to watch energy use, spot when things are getting worse, tell someone, and work with other makers' kit."
          onSite="Ask to see the specification clause for the BMS. If it does not mention energy logging, benchmarking or interoperability, raise it before the points schedule is fixed."
        >
          <p>
            Where a BACS is installed, paragraph 6.72 of the 2021 edition sets out what it should do
            (5.84 in the 2026 edition). In plain terms, it should:
          </p>
          <ul>
            <li>
              <strong>Comply fully with BS EN ISO 16484</strong>, the standards series for building
              automation and control systems.
            </li>
            <li>
              <strong>Monitor energy use continuously</strong>, log it, analyse it and allow it to
              be adjusted.
            </li>
            <li>
              <strong>Benchmark the building’s energy efficiency</strong>, detect where heating,
              ventilation and air conditioning are losing efficiency, and tell the person
              responsible for managing the building where improvements can be made.
            </li>
            <li>
              <strong>Communicate and interoperate</strong> with connected fixed building services
              and other appliances in the building, across different proprietary technologies,
              devices and manufacturers.
            </li>
          </ul>
          <p>
            The 2021 edition adds a note that a BS EN 15232 Class A rated system would meet these
            requirements, and the 2026 edition says the same of a BS EN ISO 52120-1 Class A system.
            That does not make Class A compulsory; it is a recognised way of showing the functions
            are there.
          </p>
          <p>
            Paragraph 6.73 then asks that the system’s control capabilities suit the building, the
            way it is expected to be used and the building services specification (5.85 in the 2026
            edition). A district library and a hospital theatre suite should not get the same
            controls package just because both are over 180 kW.
          </p>
        </ConceptBlock>

        <RegsCallout
          source="Approved Document L Volume 2 (England)"
          clause="Paragraph 6.72 of the 2021 edition (5.84 in the 2026 edition), summarised: an installed BACS should comply fully with BS EN ISO 16484; monitor, log and analyse energy use continuously and allow it to be adjusted; benchmark efficiency, detect HVAC efficiency losses and inform the person managing the building; and interoperate with fixed building services across manufacturers. Paragraph 6.73 (5.85): its control capabilities should suit the building, its use and its services."
          meaning={
            <>
              <p>
                Read this as a description of what the finished system can do, not a list of parts
                to buy. Energy monitoring needs meters wired back to it. Interoperability needs an
                open protocol and a points schedule another contractor could pick up.
              </p>
              <p>
                The note under 6.72 says a BS EN 15232 Class A rated system would meet these
                requirements. From 24 March 2027 the 2026 edition says the same of a BS EN ISO
                52120-1 Class A system.
              </p>
            </>
          }
          cite="Paraphrased from ADL Vol 2 (2021) paras 6.72–6.73; (2026, takes effect 24 March 2027) paras 5.84–5.85."
        />

        <InlineCheck
          id="bms-1-5-functions"
          question="A tender asks for a BMS that runs the heating on a time schedule only, with a single maker's closed protocol. On a building over the trigger, which expected function is most clearly missing?"
          options={[
            'Interoperability with other makers’ equipment',
            'A frost protection routine for the boiler plant',
            'A head end screen showing plant graphics',
            'Hand/Off/Auto switches on every motor starter',
          ]}
          correctIndex={0}
          explanation="Paragraph 6.72 (5.84 in the 2026 edition) expects the system to interoperate with fixed building services across different manufacturers, which a closed single-maker system cannot do. Frost protection, graphics and Hand/Off/Auto switches are good practice but are not among the functions the guidance lists."
        />

        <SectionRule />
        <ContentEyebrow>The standards named in the guidance</ContentEyebrow>

        <ConceptBlock
          title="BS EN ISO 16484: the standards series for the system itself"
          plainEnglish="BS EN ISO 16484 is the family of standards about building automation systems: the kit, the functions it performs, and how it communicates."
          onSite="You will rarely need to open it, but you will see it in specifications. When you do, it is a statement about the quality and openness of the system, not about energy class."
        >
          <p>
            BS EN ISO 16484 is a multi-part series covering building automation and control systems:
            the equipment, the functions it performs, and the BACnet data communication protocol and
            how devices are tested against it. Approved Document L cites the series as a whole, and
            so does this course.
          </p>
          <p>
            The standards are sold, not free, so on this course we describe what they are for rather
            than quote them. The useful thing to carry is the division of labour: BS EN ISO 16484 is
            about how the system is built and how it talks; BS EN ISO 52120-1, below, is about which
            energy-saving functions it performs.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="BS EN ISO 52120-1 has replaced EN 15232"
          plainEnglish="The old EN 15232 grading of building controls has been carried forward into an updated standard, BS EN ISO 52120-1. Quote the new one."
          onSite="If a specification or an old O&M manual says EN 15232, it was right when written and is out of date as a standard now. Query it rather than copy it into new documents."
        >
          <p>
            For years the standard that graded the energy impact of building controls was EN 15232.
            It has been replaced by <strong>BS EN ISO 52120-1</strong>, which covers the
            contribution of building automation, controls and building management to a
            building&rsquo;s energy performance. It is an update rather than a fresh start: the
            control functions that sat in a table in EN 15232 have moved into the new standard, some
            functions have changed class, functions for hydronic balancing of heating and cooling
            distribution are new, and the annex setting out minimum function types has become a
            normative (required) part rather than an informative one.
          </p>
          <p>
            You can see the change happening in the guidance. The 2021 England edition, in force
            now, says comfort cooling controls should meet <em>BS EN 15232 Band C</em> (para 6.35e)
            and that an <em>EN 15232 Class A</em> system would meet the BACS functions. The 2026
            edition, which takes effect on 24 March 2027, expects comfort cooling controls to reach{' '}
            <strong>BS EN ISO 52120-1 Class C</strong> (para 5.40e) and says that a{' '}
            <strong>BS EN ISO 52120-1 Class A</strong> system meets the BACS functions. The Scottish
            guidance also still refers to EN 15232. That does not make EN 15232 current as a
            standard; it means the guidance has not yet caught up.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Classes A to D: a way to describe how good the controls are"
          plainEnglish="The classes give everyone one shorthand for the level of automation. A is the best for energy, C is ordinary, D is controls that waste energy."
          onSite="Being told a job is 'Class B' tells you the room controllers will need to talk to the BMS. Being told 'Class A' tells you to expect presence, air quality and cross-service functions, with the wiring that goes with them."
        >
          <p>
            BS EN ISO 52120-1 places building automation and control into four efficiency classes:
          </p>
          <ul>
            <li>
              <strong>Class A: high energy performance.</strong> Automatic control complete and
              precise enough to give high energy performance. Room controls manage the HVAC using
              factors such as occupancy detection and air quality, and functions are linked across
              services, for example HVAC with lighting, electricity and solar shading.
            </li>
            <li>
              <strong>Class B: advanced.</strong> An advanced BACS with technical building
              management functions for central, coordinated management of the plant. Room controls
              communicate with the building automation system.
            </li>
            <li>
              <strong>Class C: standard.</strong> Conventional building automation and controls,
              possibly networked, at a minimum performance level. This is the reference class others
              are compared with.
            </li>
            <li>
              <strong>Class D: not energy efficient.</strong> Traditional controls that are not
              energy efficient. Note that this is not the same as &ldquo;no controls&rdquo;.
            </li>
          </ul>
          <p>
            Each class is defined by the functions that must be present, and those function lists
            are minimum requirements to qualify. That makes the classes useful in two places. At
            tender, a client can state a class and every bidder knows what functions to include.
            After installation, the class can be checked: if Class A was specified, the functions
            that define it should be there and working, not just drawn on the schematic.
          </p>
          <p>
            You will see energy-saving percentages attached to the classes in sales literature. They
            are estimates for typical buildings, not promises, and this course does not quote them.
            The standard’s job is to describe functions; what a building saves depends on how it is
            used and how well the system is commissioned and maintained.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-1-5-classes"
          question="An old surveyor's report describes a building's controls as 'Class D, non-automated'. What is wrong with that description?"
          options={[
            'Nothing; Class D means no automatic controls at all',
            'Class D is the highest class, so it should read Class A',
            'The classes apply only to lighting, not to HVAC',
            'Class D means controls that are not energy efficient',
          ]}
          correctIndex={3}
          explanation="Class D describes traditional controls that are not energy efficient. It does not mean there are no controls. A building can have plenty of automatic controls and still be Class D if they lack the functions the higher classes need. Class A is the highest, and the classes cover HVAC and other services, not lighting alone."
        />

        <SectionRule />
        <ContentEyebrow>Metering, commissioning and the log book</ContentEyebrow>

        <ConceptBlock
          title="Sub-metering: the BMS can only report what is metered"
          plainEnglish="If nobody can tell how much energy the lighting or the cooling uses, nobody can spot when it starts wasting energy. Sub-meters are what make the BMS energy functions possible."
          onSite="Sub-meters and their communications wiring are usually on the electrician's drawings. Get the meter schedule, the CT ratios and the bus addressing agreed before first fix, not at commissioning."
        >
          <p>
            Paragraph 5.17 of the 2021 England edition (4.19 in the 2026 edition) says energy
            sub-metering should be fitted in new buildings, and in existing buildings whenever fixed
            building services are added or extended. The system should:
          </p>
          <ul>
            <li>
              sub-meter end uses such as heating, lighting and cooling so that{' '}
              <strong>at least 90%</strong> of the annual consumption of each fuel can be allocated
              to an end use
            </li>
            <li>
              let the forecast energy use be compared with actual use in operation, and support
              energy reporting
            </li>
            <li>measure each tenant’s energy use</li>
            <li>monitor the output of any renewable systems separately</li>
            <li>
              in buildings over <strong>1000 m²</strong> total useful floor area, include automatic
              meter reading and data collection
            </li>
          </ul>
          <p>
            This is where the BMS and the metering meet. The specification paragraph expects the BMS
            to monitor, log and analyse energy; the metering paragraph provides the data. In
            practice the electrician installs the meters and current transformers on the
            distribution boards, and either pulse outputs or a meter bus back to the BMS. How those
            meters connect is covered in Sections 4.5 and 5.4.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Commissioning: proving it, and telling building control"
          plainEnglish="Fixed building services have to be tested and adjusted so they do not waste fuel and power, and building control has to be told when that is done."
          onSite="Your point-to-point and functional test sheets are part of the evidence that commissioning happened. Keep them clean, dated and signed, because they end up in the owner's log book."
        >
          <p>
            ADL Section 8 of the 2021 England edition (Section 7 in the 2026 edition) deals with
            commissioning. Fixed building services must be commissioned so that they do not burn
            more fuel and power than the circumstances reasonably call for, and the commissioning
            should involve testing and adjusting the services (2021 para 8.1; 7.1 and 7.6 in the
            2026 edition). The guidance says to commission them with the aim of optimising how they
            perform in use (para 8.2; 7.2), and a large or complex project should have a
            commissioning manager appointed (para 8.3; 7.3).
          </p>
          <p>
            Once commissioning is finished, the building control body and the building owner each
            receive a <strong>notice of completion of commissioning</strong> (2021 para 8.7; 7.7 in
            the 2026 edition). The notice confirms that the commissioning plan was followed, that
            systems were inspected in a sensible order and to a reasonable standard, and that test
            results show performance reasonably in line with the design, with written comment
            wherever a service falls short. It should normally be given within five days of
            commissioning being completed (para 8.8; 7.8).
          </p>
          <p>
            For a BMS, &ldquo;commissioned&rdquo; means more than &ldquo;powered up&rdquo;. Every
            point proved, every sequence tested against the description of operation, every meter
            reading sensibly on the head end. Section 7.5 covers how that is done.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="The building log book: what the owner is left with"
          plainEnglish="At the end of the job the owner gets a log book that tells them how to run the building efficiently, with the commissioning records inside it."
          onSite="If you install new energy meters in an existing building, they belong in the log book. Make sure the meter details reach whoever is compiling it."
        >
          <p>
            ADL Section 9 of the 2021 edition (Section 8 in the 2026 edition) asks for operating and
            maintenance instructions to be given to the building owner in a{' '}
            <strong>building log book</strong>, for new buildings and for work to existing ones
            (2021 para 9.1; 8.1 in the 2026 edition). The log book can draw on or point to the
            O&amp;M manuals and the health and safety file rather than duplicate them. It should
            include:
          </p>
          <ul>
            <li>
              information to let the building be run efficiently: the building, the fixed building
              services and on-site generation, and their maintenance needs (para 9.3a; 8.2a)
            </li>
            <li>a copy of the completed commissioning records (para 9.3b; 8.2b)</li>
            <li>
              for new buildings over 1000 m² total useful floor area, a forecast of annual energy
              use in kWh broken down by fuel (para 9.4; 8.3)
            </li>
            <li>
              where a BACS is installed in a new building, information about its energy performance
              (para 9.6; 8.5)
            </li>
            <li>
              for work in existing buildings, details of any newly installed energy meters, among
              other items (para 9.7c; 8.6c)
            </li>
          </ul>
          <p>
            Put the pieces together and the logic is plain. The forecast sits in the log book, the
            sub-meters measure actual use, and the BMS compares the two and tells someone when they
            drift apart. Each part relies on the others being done properly.
          </p>
        </ConceptBlock>

        <Scenario
          title="A controls replacement in an occupied office block"
          situation="You are pricing the electrical package for replacing the BMS in a 1990s office block in England. The heating and cooling plant is staying. The plant schedule shows boilers and chillers whose comfort heating and cooling outputs are well over 180 kW. The client wants the cheapest like-for-like swap from the original maker, keeping the old closed protocol, and asks why the consultant's specification mentions BS EN ISO 16484, energy logging and sub-meters."
          whatToDo="Explain, without overstating it, that because the building is over the trigger and its BACS is being replaced, the guidance expects the new system to meet the specification paragraphs: compliance with BS EN ISO 16484, continuous energy monitoring and analysis, benchmarking with alerts to the building manager, and interoperability across manufacturers. A closed like-for-like swap will struggle on the last point. Price the sub-meters, CTs and the bus wiring back to the new controllers, confirm with the consultant which meters are new so they can be recorded, and plan the test sheets so they can go into the log book with the commissioning records."
          whyItMatters="Controls replacements are where the BACS guidance is most often missed, because no boiler is changing and nobody thinks of it as building work. Raising it at pricing is cheap. Discovering it when building control or the client's energy manager asks for the logged data is not, and it is your installation that gets reopened."
        />

        <CommonMistake
          title="Selling a standard as if it carried a fine"
          whatHappens="A contractor tells a client that failing to meet BS EN ISO 52120-1 Class A will bring legal penalties, to win a bigger controls package. The client checks, finds the standard is a voluntary document and that the approved document only says Class A is one way of showing the functions are met, and stops trusting anything else the contractor says."
          doInstead="Be precise about what each document is. The Building Regulations carry the legal requirement. Approved Document L is statutory guidance on meeting it. BS EN ISO 16484 and BS EN ISO 52120-1 are standards the guidance points to; a contract or specification can make them binding on a project. Say which one you are relying on, and the accurate version is persuasive enough."
        />

        <FAQ
          items={[
            {
              question: 'Does every commercial building need a BMS?',
              answer:
                'No. In England the expectation applies where the space heating or air-conditioning system has an effective rated output above 180 kW. Below that, the guidance asks for centralised switch-off controls to be considered rather than a full BACS. Plenty of small shops and offices have no BMS and are perfectly compliant.',
            },
            {
              question: 'Is Class A compulsory for a building over 180 kW?',
              answer:
                'No. The approved document lists the functions the system should provide and notes that a Class A system meets them (BS EN 15232 Class A in the 2021 edition, BS EN ISO 52120-1 Class A in the 2026 edition). Class A is a recognised way of showing compliance, not a requirement in itself. Separately, comfort cooling controls should meet BS EN 15232 Band C under the 2021 England edition, and BS EN ISO 52120-1 Class C under the 2026 edition from 24 March 2027.',
            },
            {
              question: 'Why does my specification still say EN 15232?',
              answer:
                'Because it was the standard for years and older guidance and templates still quote it, including the 2021 England edition of Approved Document L and the Scottish guidance. As a standard it has been replaced by BS EN ISO 52120-1, and the 2026 England edition, which takes effect on 24 March 2027, moves to it. Query the reference rather than repeat it in anything new you write.',
            },
            {
              question: 'Which edition of Approved Document L applies to my job?',
              answer:
                'In England, the 2021 edition applies until the 2026 edition takes effect on 24 March 2027, or 24 September 2027 for higher-risk building work, and transitional arrangements can keep a project on the older edition after that. In Wales, the 2026 edition takes effect on 4 March 2027. The designer and building control body will confirm which applies; for BMS work the core functions are the same in both England editions.',
            },
            {
              question: 'Does BS 7671 say anything about whether a building needs a BMS?',
              answer:
                'No. BS 7671 covers the safety of the electrical installation, including the control and signalling circuits that a BMS uses, which Section 1.6 introduces. Whether a building should have a BMS, and what it should do, comes from Approved Document L and the equivalent guidance in Wales and Scotland.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            'Approved Document L is statutory guidance on meeting Part L of the Building Regulations. It is the usual route, other routes must be agreed with building control, and installers are among those responsible.',
            'England expects a BACS above 180 kW effective rated output. Scotland uses 290 kW. Wales uses 290 kW until 4 March 2027, then 180 kW.',
            'Effective rated output is comfort heating and cooling, including in ventilation plant and secondary heating. Domestic hot water, frost protection, backup-only and process plant are left out.',
            'An installed system should comply with BS EN ISO 16484, monitor and analyse energy use, flag HVAC efficiency losses to the building manager, and interoperate across manufacturers.',
            'BS EN ISO 52120-1 has replaced EN 15232. Classes run from A (high energy performance) to D (not energy efficient), with C as the standard reference.',
            'Sub-metering should let at least 90% of each fuel be assigned to an end use, with automatic meter reading above 1000 m².',
            'Commissioning ends with a notice to building control and the owner, and the commissioning records go into the building log book.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself" />

        <PrevNext
          noun="section"
          prevHref="/study-centre/upskilling/bms-module-1-section-4"
          prevLabel="Where you will meet a BMS"
          nextHref="/study-centre/upskilling/bms-module-1-section-6"
          nextLabel="The electrician's role and working safely"
        />
      </HubBody>
    </HubPage>
  );
};

export default BMSModule1Section5;
