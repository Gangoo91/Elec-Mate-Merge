/**
 * Module 1 · Section 5 — Working safely around instrumentation
 *
 * NEW SECTION, written 2026-08-29. It did not exist before.
 *
 * 🔴 WHY IT WAS ADDED. Across the whole eight-module syllabus, safety appeared
 * only twice and both times late: Module 7 Section 5 (barriers, isolators and
 * intrinsically safe loops) and Module 8 Section 6 (safety during
 * troubleshooting). A learner therefore read seven modules before meeting
 * anything about working on running plant or in a classified area — on a
 * subject where they will routinely do both. An introduction module that never
 * says "this work happens on live plant, often in a flammable atmosphere" has a
 * hole in it.
 *
 * This section is an ORIENTATION, not a technique page. It establishes what a
 * hazardous area is, why instruments inside one are built differently, and what
 * the law asks of the employer and of you. The technique — barrier selection,
 * entity parameters, loop testing in a live circuit — stays in Modules 7 and 8
 * where it belongs, and is signposted rather than duplicated.
 *
 * 🔴 SOURCING. Every legal and classification statement on this page comes from
 * HSE INDG370 ("Controlling fire and explosion risks in the workplace", the
 * brief guide to DSEAR), held at ~/Desktop/hav/instrumentation. The zone
 * definitions are quoted close to verbatim because paraphrasing a
 * classification is how errors get introduced. Nothing about protection
 * concepts (Ex ia, Ex d and the rest) is stated in detail, because that lives
 * in BS EN 60079-11, which is paywalled and NOT held — see the note in
 * NOTE-instrumentation-sources.md. Where the detail is missing it is signposted
 * as such rather than guessed at.
 */

import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
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
  Pullquote,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Working safely around instrumentation | Instrumentation Module 1.5 | Elec-Mate';
const DESCRIPTION =
  'Instrument work happens on running plant, often in a classified area. What DSEAR asks of an employer, what the hazardous area zones actually mean, why instruments in those areas are built differently, and what changes when the process cannot be switched off.';

const outcomes = [
  'Explain why instrument work is usually carried out on live, running plant, and what that changes',
  'Say what DSEAR is for and when it applies to a workplace',
  'Define a dangerous substance and an explosive atmosphere in the terms the regulations use',
  'State what Zones 0, 1 and 2 mean, and how the dust zones 20, 21 and 22 map onto them',
  'Describe what an employer must ensure about equipment used inside a classified area',
  'Recognise the Ex marking and say what competence is expected of people working on those installations',
  'Identify the instrument-specific hazards that have no equivalent on a dead installation',
];

const quizQuestions = [
  {
    id: 1,
    question: 'Under DSEAR, which of these best describes an explosive atmosphere?',
    options: [
      'Any workplace where flammable substances are stored',
      'A mixture of a dangerous substance — gas, mist, dust or vapour — with air, which has the potential to catch fire or explode',
      'An area where an explosion has previously occurred',
      'Any confined space',
    ],
    correctIndex: 1,
    explanation:
      'DSEAR defines an explosive atmosphere as a mixture of a dangerous substance (gas, mist, dust or vapour) with air, which has the potential to catch fire or explode. It does not have to explode to qualify — the potential is what matters. Note that storage alone is not the test; it is the mixture with air.',
  },
  {
    id: 2,
    question:
      'A part of a hazardous area where an explosive atmosphere is likely to occur occasionally in normal operation is classified as:',
    options: ['Zone 0', 'Zone 1', 'Zone 2', 'Zone 22'],
    correctIndex: 1,
    explanation:
      'Zone 1 is that part of a hazardous area in which an explosive atmosphere is likely to occur occasionally in normal operation. Zone 0 is continuous, long-period or frequent presence; Zone 2 is not likely in normal operation and short-lived if it happens. Zone 22 is the dust equivalent of Zone 2.',
  },
  {
    id: 3,
    question: 'What is the difference between Zone 1 and Zone 21?',
    options: [
      'Zone 21 is more dangerous than Zone 1',
      'Zone 1 refers to gases, vapours or mists; Zone 21 refers to combustible dusts',
      'Zone 21 applies only outdoors',
      'There is no difference — they are alternative names',
    ],
    correctIndex: 1,
    explanation:
      'Zones 0, 1 and 2 are used for explosive atmospheres formed of flammable gases, vapours or mists. Zones 20, 21 and 22 are used for those formed of combustible dusts. The likelihood tier is the same; the substance is what differs.',
  },
  {
    id: 4,
    question:
      'Why can instrument work rarely be made safe simply by isolating the circuit, as you would on a lighting installation?',
    options: [
      'Because instrument circuits carry dangerous voltages',
      'Because the electrical isolation is easy, but the process the instrument is attached to is often still running, hot, pressurised or full',
      'Because instrument circuits cannot be isolated',
      'Because isolation is not required on extra-low voltage circuits',
    ],
    correctIndex: 1,
    explanation:
      'The electrical side of an instrument loop is usually low energy and straightforward to isolate. The hazard is the process: a thermowell withdrawn from a live line, a pressure tapping cracked open, or a level device removed from a full vessel. Electrical isolation does nothing about any of that.',
  },
  {
    id: 5,
    question: 'What does the Ex symbol in a hexagon on a piece of equipment indicate?',
    options: [
      'That the equipment has been PAT tested',
      'That it is intended for use in a potentially explosive atmosphere and meets the relevant equipment regulations',
      'That the equipment is intrinsically safe by design',
      'That it is exempt from inspection',
    ],
    correctIndex: 1,
    explanation:
      'Equipment for use in hazardous areas must meet the Equipment and Protective Systems Intended for Use in Potentially Explosive Atmospheres Regulations 1996, and such equipment carries the Ex symbol in a hexagon. It does not by itself tell you which protection concept applies or which zone the item is suitable for — that requires reading the full marking.',
  },
  {
    id: 6,
    question:
      'Who should verify, before a hazardous-area installation is brought into operation for the first time, that the equipment is suitable?',
    options: [
      'The equipment supplier',
      'Any employee working in the area',
      'A person competent to do so, as part of the commissioning procedure',
      'The insurer',
    ],
    correctIndex: 2,
    explanation:
      'HSE guidance is explicit that before bringing equipment and protective systems into operation for the first time, and as part of the commissioning procedure, a person competent to do so should verify that they are suitable and sufficient to control the fire and explosion risks.',
  },
];

const InstrumentationModule1Section5 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage>
      <HubMasthead
        section="Module 1 · Section 5"
        title="Working safely around instrumentation"
        backTo="/electrician/upskilling/instrumentation-module-1"
      />
      <HubBody>
        <p className="max-w-3xl text-[13px] leading-relaxed text-white">
          Instrument work happens on plant that is usually still running, and often in an area
          classified because the air itself can catch fire. Both change how you approach the job.
        </p>

        <TLDR
          points={[
            'The electrical side of an instrument loop is low energy and easy to isolate. The process it is bolted to is frequently hot, pressurised, full or toxic — and isolating the circuit does nothing about that.',
            'DSEAR places duties on employers to protect people from fire and explosion risks arising from dangerous substances and potentially explosive atmospheres.',
            'An explosive atmosphere is a mixture of a dangerous substance — gas, mist, dust or vapour — with air, which has the potential to catch fire or explode.',
            'Areas are classified into zones by how likely and how persistent that atmosphere is: Zone 0, 1 and 2 for gases, vapours and mists; Zone 20, 21 and 22 for combustible dusts.',
            'Equipment for those areas must meet the 1996 explosive atmospheres equipment regulations and carries the Ex symbol in a hexagon. The people who provide, maintain or verify it must be competent — CompEx training is the usual route.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <SectionRule />
        <ContentEyebrow>Why this comes first</ContentEyebrow>

        <ConceptBlock
          title="You will be working on plant that has not been switched off"
          plainEnglish="On an installation you make it dead and then work. On a process plant the electrical part may be dead while everything that actually hurts you is still running."
          onSite="Ask two questions before any instrument job, not one. Not just 'is it electrically isolated?' but 'what is on the other side of this fitting, and what is it doing right now?'"
        >
          <p>
            This is the single biggest shift coming from installation work, and it is why safety
            appears in the introduction rather than being left to the practical modules.
          </p>
          <p>
            An instrument loop is usually a low-energy circuit — 24 V DC, a few tens of milliamps.
            Electrically it is among the least dangerous things you will ever put a screwdriver on.
            The danger is on the other side of the instrument:
          </p>
          <ul>
            <li>
              A <strong>thermowell</strong> penetrates a pipe or vessel. Withdrawing the sensor is
              routine; withdrawing the well itself opens the process.
            </li>
            <li>
              A <strong>pressure tapping</strong> is a direct connection to a pressurised system.
              Cracking the wrong fitting releases whatever is behind it, at whatever pressure and
              temperature it happens to be.
            </li>
            <li>
              A <strong>level device</strong> may be mounted on a vessel that is full, and full of
              something you would not want on your skin.
            </li>
            <li>
              A <strong>final control element</strong> can move. A valve that strokes while someone
              has a hand near the actuator does not care that the loop was in manual.
            </li>
          </ul>
          <p>
            None of that is addressed by proving dead. Safe isolation of the electrical supply
            remains essential and unchanged — it is simply no longer the whole job.
          </p>
        </ConceptBlock>

        <Pullquote>
          Proving dead tells you the wiring is safe to touch. It tells you nothing at all about what
          is behind the flange.
        </Pullquote>

        <SectionRule />
        <ContentEyebrow>The law that shapes the work</ContentEyebrow>

        <ConceptBlock
          title="DSEAR — what it is and when it applies"
          plainEnglish="The regulations that make an employer find, assess and control anything at work that could cause a fire or explosion."
          onSite="If a site has a hazardous area drawing, DSEAR is why. That drawing is the output of the employer's assessment, and it governs what may be installed where."
        >
          <p>
            The <strong>Dangerous Substances and Explosive Atmospheres Regulations 2002</strong> —
            DSEAR — place duties on employers to protect people from risks to their safety from
            fires, explosions and similar events in the workplace. Those duties also apply to
            self-employed people whose work may pose a risk to others.
          </p>
          <p>The regulations apply to the majority of work activities where:</p>
          <ul>
            <li>work is being carried out by an employer or self-employed person</li>
            <li>
              a dangerous substance is present, or liable to be present or generated, at the
              workplace
            </li>
            <li>a potentially explosive atmosphere may occur</li>
            <li>
              that substance or atmosphere could be a risk to people&rsquo;s safety from fire,
              explosion or similar energetic events
            </li>
          </ul>
          <p>
            Note how wide that is. It covers moveable structures, outdoor areas and domestic
            premises — not just refineries. Activities expressly within scope include the storage
            and use of flammable liquid-based paints and inks, storage of LPG, storage and use of
            oxygen, the storage and transport of powders in pharmaceutical and food industries,
            handling flammable waste solvents, and hot work on tanks and drums that have contained
            flammable material.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Dangerous substance, and explosive atmosphere — the two definitions that matter"
          plainEnglish="A dangerous substance is anything at work that could cause harm through fire or explosion. An explosive atmosphere is that substance mixed with air in a way that could ignite."
          onSite="Dust counts. Flour, sugar, sanding dust and machining dust have all caused serious explosions, and people are far more surprised by dust than by solvent."
        >
          <p>
            <strong>Dangerous substances</strong> are any substances used or present at work that
            could, if not properly controlled, cause harm to people as a result of a fire, explosion
            or similar incident such as an uncontrolled chemical reaction. They are found in nearly
            all workplaces, and include solvents, paints, varnishes, flammable gases, LPG, dusts
            from machining and sanding operations, and dusts from foodstuffs.
          </p>
          <p>
            Not everything that can catch fire is a dangerous substance under DSEAR. But some
            materials that cause rapid escalation of a fire when handled in a certain way are also
            classed as dangerous substances — cellular plastic foams among them.
          </p>
          <p>
            An <strong>explosive atmosphere</strong> is a mixture of a dangerous substance or
            substances — gas, mist, dust or vapour — with the air, which has the potential to catch
            fire or explode. It does not always result in an explosion. But if it does catch fire
            the flames travel quickly, and in a confined space such as inside plant the rapid spread
            of flame or the rise in pressure could cause an explosion.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-1-5-substance"
          question="A food production line generates fine flour dust in the packing hall. Is that within DSEAR's scope?"
          options={[
            'Yes — dusts from foodstuffs are expressly named as dangerous substances',
            'No — DSEAR covers only liquids and gases',
            'Only if the dust is visibly airborne at all times',
            'Only in premises over a certain size',
          ]}
          correctIndex={0}
          explanation="Dusts from foodstuffs are expressly named among dangerous substances, alongside dusts from machining and sanding. Combustible dust is one of the most commonly underestimated hazards, and it has its own zone classifications — 20, 21 and 22."
        />

        <SectionRule />
        <ContentEyebrow>Reading the drawing</ContentEyebrow>

        <ConceptBlock
          title="Hazardous area classification — what the zones actually mean"
          plainEnglish="Areas are sorted by how likely an explosive atmosphere is, and how long it hangs around. That ranking decides what equipment may be installed there."
          onSite="Zone numbers go DOWN as the danger goes UP. Zone 0 is the worst. It catches people out constantly."
        >
          <p>
            Control measures aim to prevent explosive atmospheres forming, or to limit their extent.
            But because of the way dangerous substances are stored, handled and used, the risk
            cannot be entirely avoided. So the areas where they may occur are identified and
            classified into zones based on <strong>likelihood and persistence</strong>. This is{' '}
            <strong>hazardous area classification</strong>.
          </p>
          <ul>
            <li>
              <strong>Zone 0</strong> — that part of a hazardous area in which an explosive
              atmosphere is{' '}
              <em>continuously present, or present for long periods, or frequently</em>.
            </li>
            <li>
              <strong>Zone 1</strong> — that part in which an explosive atmosphere is{' '}
              <em>likely to occur occasionally in normal operation</em>.
            </li>
            <li>
              <strong>Zone 2</strong> — that part in which an explosive atmosphere is{' '}
              <em>not likely to occur in normal operation</em> but, if it does, will persist for a
              short period only.
            </li>
          </ul>
          <p>
            Those three are used for explosive atmospheres formed of{' '}
            <strong>flammable gases, vapours or mists</strong>. For atmospheres formed of{' '}
            <strong>combustible dusts</strong>, the same three tiers are numbered{' '}
            <strong>Zone 20, Zone 21 and Zone 22</strong> respectively.
          </p>
          <p>
            The classification is the employer&rsquo;s to make, and it is recorded on a hazardous
            area drawing. As an instrument person you are usually a consumer of that drawing rather
            than its author — but you must be able to read it, because it dictates what may be
            installed and how it must be maintained.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-1-5-zones"
          question="Which zone represents the HIGHEST likelihood of an explosive atmosphere being present?"
          options={['Zone 2', 'Zone 0', 'Zone 1', 'Zone 22']}
          correctIndex={1}
          explanation="Zone 0 — continuously present, present for long periods, or frequently. The numbering is counter-intuitive: lower number, higher risk. Zone 22 is the dust equivalent of Zone 2, so it is the least severe of the dust zones."
        />

        <RegsCallout
          source="HSE INDG370 — DSEAR"
          clause="An explosive atmosphere is a mixture of a dangerous substance or substances (gas, mist, dust or vapour) with the air, which has the potential to catch fire or explode. An explosive atmosphere does not always result in an explosion but, if it does catch fire, the flames travel quickly."
          meaning={
            <>
              <p>
                Two things in that sentence do real work. First, <strong>potential</strong> — the
                atmosphere qualifies whether or not anything ignites, so an area is classified on
                what could happen, not on what has happened.
              </p>
              <p>
                Second, <strong>dust and mist sit alongside gas and vapour</strong>. A flour mill
                and a solvent store are both in scope, and the dust case is the one people routinely
                miss because there is no smell to warn them.
              </p>
            </>
          }
          cite="HSE INDG370(rev1), 'Controlling fire and explosion risks in the workplace' — a brief guide to DSEAR."
        />

        <SectionRule />
        <ContentEyebrow>Why the kit looks different</ContentEyebrow>

        <ConceptBlock
          title="Equipment in a classified area is built and marked differently"
          plainEnglish="Instruments for hazardous areas are designed so they cannot supply enough energy — as a spark or as heat — to set off the atmosphere around them."
          onSite="Never substitute a like-for-like instrument in a classified area on the basis that it does the same job. It has to be the right protection concept for that zone."
        >
          <p>For areas identified as hazardous, an employer must ensure that:</p>
          <ul>
            <li>
              <strong>All potential ignition sources are excluded</strong> — sparks, hot surfaces,
              smoking materials, naked flames and unsuitable equipment.
            </li>
            <li>
              <strong>Only compliant equipment is used and installed</strong>, including portable
              equipment, meeting the requirements of the Equipment and Protective Systems Intended
              for Use in Potentially Explosive Atmospheres Regulations 1996. Such equipment is CE
              marked and carries the <strong>Ex symbol in a hexagon</strong>.
            </li>
            <li>
              <strong>Suitability is verified before first operation</strong>, as part of the
              commissioning procedure, by a person competent to do so.
            </li>
            <li>
              <strong>The people involved are competent</strong> — those who provide, maintain or
              verify electrical installations and equipment in, or associated with, hazardous areas.{' '}
              <strong>CompEx</strong> training is the usual route to demonstrating that.
            </li>
            <li>
              <strong>Warning signs are posted where necessary</strong> at entry points to
              classified places, so those entering know special precautions apply.
            </li>
            <li>
              <strong>Clothing does not create a static discharge risk</strong> capable of igniting
              the atmosphere.
            </li>
          </ul>
          <p>
            Equipment placed in service before July 2003 may continue to be used provided the risk
            assessment shows it is safe to do so.
          </p>
          <p>
            There is a family of <strong>protection concepts</strong> — different engineering
            strategies for making equipment safe in these areas, of which intrinsic safety is the
            one you will meet most often on instrument loops. The detail of those concepts, and of
            the barriers and isolators that make a loop intrinsically safe, is covered in{' '}
            <strong>Module 7</strong>. What matters here is the principle: the marking on the
            instrument tells you which zone it is fit for, and it is not interchangeable with an
            unmarked one.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="What counts as an ignition source is broader than a spark"
          plainEnglish="An explosive atmosphere needs very little to set it off, and several of the things that will do it are not obviously electrical."
          onSite="The tools and clothing you bring in are part of the assessment. So is the phone in your pocket, on many sites."
        >
          <p>
            For any identified hazardous area, all potential ignition sources must be excluded. HSE
            guidance names them plainly:
          </p>
          <ul>
            <li>
              <strong>Sparks</strong> — electrical, but also mechanical, from a dropped tool or a
              grinding operation.
            </li>
            <li>
              <strong>Hot surfaces</strong> — which is why equipment for these areas carries a
              temperature classification as well as a zone rating.
            </li>
            <li>
              <strong>Smoking materials</strong> and <strong>naked flames</strong>.
            </li>
            <li>
              <strong>Unsuitable equipment</strong> — anything brought in that is not rated for the
              area, including portable test gear.
            </li>
          </ul>
          <p>
            Static discharge sits alongside these, and it is why the guidance extends to clothing:
            employees working in these areas should be provided with clothing that does not create a
            risk of an electrostatic discharge capable of igniting the atmosphere. A synthetic
            fleece is not neutral in a Zone 1.
          </p>
          <p>
            This is the part that most often surprises people arriving from installation work. On a
            normal site, the question about a tool is whether it is in calibration and safe to use.
            In a classified area there is a prior question: is this thing allowed in here at all?
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-1-5-ignition"
          question="Which of these is NOT among the ignition sources HSE names for exclusion from a hazardous area?"
          options={[
            'Hot surfaces',
            'Smoking materials',
            'Any equipment operating below 50 V',
            'Equipment that is unsuitable for the area',
          ]}
          correctIndex={2}
          explanation="Operating voltage is not the test. A low-voltage circuit can still produce a spark with enough energy to ignite an atmosphere — which is exactly why intrinsic safety is about energy, not about whether a voltage is dangerous to a person. Sparks, hot surfaces, smoking materials, naked flames and unsuitable equipment are all named."
        />

        <Scenario
          title="A like-for-like replacement that is not like for like"
          situation="A pressure transmitter has failed on a solvent recovery skid. The stores have a transmitter of the same manufacturer, same range and same process connection. It will bolt straight on and the loop will read correctly. The area is classified Zone 1."
          whatToDo="Stop at the marking. Compare the Ex marking on the failed unit against the replacement, not the model number or the range. If the replacement does not carry equipment marking appropriate to that zone, it does not go in — regardless of the fact that it fits and would work perfectly. Escalate for the correct part rather than closing the job."
          whyItMatters="Everything about this swap looks right on an instrument datasheet, and nothing about the loop reading would tell you afterwards that anything was wrong. The failure mode is not a bad measurement — it is that a piece of equipment capable of releasing enough energy to ignite the atmosphere has just been installed in a place where that atmosphere is likely to occur in normal operation."
        />

        <SectionRule />
        <ContentEyebrow>The hazards with no installation equivalent</ContentEyebrow>

        <ConceptBlock
          title="Things that can go wrong on a loop and nowhere else"
          plainEnglish="Some instrument hazards have no equivalent on a fixed wiring job, because they come from the loop being part of a running control system."
          onSite="Before you break into any loop, know what is downstream of it and whether anything is controlling on it right now."
        >
          <p>
            Beyond the process itself, instrument work carries hazards that come from the loop being
            live in a control sense rather than an electrical one:
          </p>
          <ul>
            <li>
              <strong>Breaking a loop moves a valve.</strong> Interrupting a 4&ndash;20 mA signal
              does not merely stop a reading. Depending on how the receiving device is configured,
              the controller may see a failed measurement and drive its output somewhere — which
              strokes a final control element on a running process.
            </li>
            <li>
              <strong>De-energising a two-wire transmitter.</strong> On a loop-powered device the
              signal pair is also the supply. Disconnecting to take a reading does not just
              disconnect you; it kills the instrument.
            </li>
            <li>
              <strong>Injecting a simulated signal.</strong> A loop calibrator can drive any value
              you like into the control system. If that loop is in automatic, the plant will act on
              it.
            </li>
            <li>
              <strong>Defeating a trip.</strong> Some loops exist to shut the plant down. Working on
              one without knowing that is how a protective function ends up bypassed and forgotten.
            </li>
          </ul>
          <p>
            The controls for all of this are procedural rather than electrical: a permit to work,
            agreement with the control room, putting affected loops into manual deliberately, and
            recording anything inhibited so it gets restored. Module 8 covers the technique in
            detail.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>How isolations actually fail</ContentEyebrow>

        <ConceptBlock
          title="Isolation goes wrong in a small number of predictable ways"
          plainEnglish="Incidents rarely happen because somebody did not know the rules. They happen because a step was missed, a drawing was wrong, or a handover lost something."
          onSite="The failure is almost never exotic. It is a valve left open, a line nobody tagged, or a job that changed hands halfway through."
        >
          <p>
            HSE guidance on the safe isolation of plant identifies a recognisable set of human
            failures behind isolation incidents:
          </p>
          <ul>
            <li>
              <strong>Failure to complete or reverse isolations fully</strong> before starting work
              or restarting plant.
            </li>
            <li>
              <strong>Failure to prove and monitor isolated valves</strong> — assuming an isolation
              holds rather than demonstrating it, and then not watching it.
            </li>
            <li>
              <strong>Poor communication</strong>, particularly at shift handover.
            </li>
            <li>
              <strong>
                Failure to check P&amp;IDs and schematic diagrams against the plant as actually
                installed.
              </strong>
            </li>
          </ul>
          <p>
            That last one should land hard for anyone who has just learned to read a P&amp;ID. The
            drawing is the plan, not the plant. Lines get added, valves get replaced, modifications
            get made and not drawn. Checking the document against what is physically in front of you
            is part of the isolation, not a formality before it.
          </p>
          <p>
            Guidance also notes that these failures are driven by pressure as much as ignorance — a
            desire to get the job done despite time pressure, short staffing, unavailable tools or
            bad weather. Competent people make these errors too. Being experienced is not the
            control.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="What actually makes isolation reliable"
          plainEnglish="Not heroics or memory. Clear identification, tagging, proving, independent checking, and a handover that carries the information."
          onSite="If you cannot point at the tag, you have not proved the isolation — you have assumed it."
        >
          <p>
            The controls that make isolation failures less likely, and help catch them when they
            happen, are unglamorous and largely procedural:
          </p>
          <ul>
            <li>
              <strong>Clear identification of plant and equipment</strong>, valves included. This is
              where instrument tag discipline earns its keep.
            </li>
            <li>
              <strong>A clear system for tagging valves</strong>, and recording that on P&amp;IDs
              and schematics.
            </li>
            <li>
              <strong>Well-designed, current, usable procedures</strong> — including checklists and
              job aids that people actually accept and use.
            </li>
            <li>
              <strong>Effective checking and supervision</strong> for proving, monitoring and
              reinstatement — independent where the risk warrants it.
            </li>
            <li>
              <strong>Good access and working environment</strong> for the isolation task, including
              something as ordinary as adequate lighting.
            </li>
            <li>
              <strong>Good communications</strong>, especially at shift handover.
            </li>
          </ul>
          <p>
            Reinstatement deserves its own attention. Guidance is explicit that correct
            reinstatement is critical, that the worksite should be inspected before it, and that a
            sample of isolation work should be monitored by an independent person. One documented
            incident involved a vent valve, used to verify a mechanical isolation, simply being left
            open — and a gas leak when the system was re-pressurised. Nothing about that failure was
            technically difficult.
          </p>
          <p>
            Work on a permit system where one exists, and treat the permit as the record of who
            agreed what — not as paperwork to be completed afterwards.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-1-5-isolation"
          question="You are working from a P&ID that shows the isolation points for a job. What does HSE guidance identify as a recognised failure mode here?"
          options={[
            'Using a P&ID at all, rather than a loop diagram',
            'Isolating more points than strictly necessary',
            'Recording the isolation on the drawing',
            'Failing to check the drawing against the plant and equipment as actually installed',
          ]}
          correctIndex={3}
          explanation="Failure to check P&IDs and schematics against the actual installed plant is named among the human failures behind isolation incidents. Plant gets modified and drawings lag behind, so the document is the plan rather than the truth — verifying it against reality is part of the isolation."
        />

        <CommonMistake
          title="Treating electrical isolation as the whole of the safety case"
          whatHappens="A technician proves the loop dead at the marshalling cabinet, signs the isolation, and goes to the field to remove a temperature assembly. The circuit is genuinely dead. The line is at 180 °C and pressurised, and withdrawing the thermowell rather than just the sensor opens it."
          doInstead="Separate the two questions and answer both. Electrical isolation makes the wiring safe to handle. Process isolation — draining, depressurising, cooling, or simply confirming that only the sensor and not the well is being removed — is a different control with different evidence. On most plant that means a permit to work naming both."
        />

        <CommonMistake
          title="Assuming a hazardous area stops at the wall"
          whatHappens="An instrument is mounted just outside a classified enclosure and treated as being in a safe area. In reality the classification extends beyond the physical structure, and the drawing shows the boundary several metres further out than anybody assumed."
          doInstead="Read the hazardous area drawing rather than inferring the boundary from the building. Classification follows where an explosive atmosphere may occur, not where the walls happen to be — and it is the employer's assessment, recorded on that drawing, which decides it. If you cannot find the drawing, that is the job to do first."
        />

        <SectionRule />
        <ContentEyebrow>When something is not right</ContentEyebrow>

        <ConceptBlock
          title="Stopping is a legitimate outcome of a job"
          plainEnglish="Finding that you cannot do the work safely is a successful result, not a failed one. The failure is doing it anyway."
          onSite="The pressure to carry on is the hazard. Name it out loud and it loses most of its force."
        >
          <p>
            HSE guidance on isolation is unusually direct about this: incidents arise from a desire
            to carry out the job despite barriers — work or time pressure, lack of staff,
            unavailability of the right equipment or tools, extreme weather. Those are the
            circumstances in which people take the shortcut, and they are entirely predictable.
          </p>
          <p>Situations on an instrument job where stopping is the right answer:</p>
          <ul>
            <li>The replacement part does not carry equipment marking appropriate to the zone.</li>
            <li>
              The hazardous area drawing cannot be found, or does not match what is in front of you.
            </li>
            <li>
              You are asked to work on a loop that forms part of a protective function, without a
              clear agreement on what happens to that protection meanwhile.
            </li>
            <li>The isolation cannot be proved — only assumed.</li>
            <li>Nobody in the control room knows the loop is about to be disturbed.</li>
          </ul>
          <p>
            Escalating is not an admission that you could not work it out. On a running plant it is
            the correct technical judgement, and the organisations that run well are the ones where
            it is uneventful to do.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="What this section does not cover, and where it lives"
          plainEnglish="This has been orientation. The technique comes later, deliberately."
          onSite="Do not attempt hazardous-area work on the strength of this page. It tells you what the ground rules are, not how to do the job."
        >
          <p>
            Three things have been named here but not taught, because they need more room than an
            introduction allows:
          </p>
          <ul>
            <li>
              <strong>Protection concepts and intrinsic safety in detail</strong> — how a barrier or
              galvanic isolator limits energy, how a loop is certified as a system rather than as
              individual parts, and how to read a full equipment marking. <strong>Module 7</strong>.
            </li>
            <li>
              <strong>Working on live loops</strong> — simulating and injecting safely, what to tell
              the control room, and how to record anything inhibited so it is restored.{' '}
              <strong>Module 8</strong>.
            </li>
            <li>
              <strong>Calibration in a hazardous area</strong> — including which test equipment may
              be taken in. <strong>Module 6</strong>, alongside the calibration method itself.
            </li>
          </ul>
          <p>
            The reason for splitting it this way is that hazardous-area technique is a competence
            subject with its own training route. This page exists so that you recognise when you are
            standing in one of these areas and know what that means. Recognising it is the part that
            has to come first.
          </p>
        </ConceptBlock>

        <FAQ
          items={[
            {
              question: 'Does DSEAR only apply to big industrial sites?',
              answer:
                'No. The regulations apply to the majority of work activities, including those in moveable structures, outdoor areas and domestic premises, wherever a dangerous substance is present and could create a risk. A paint store, an LPG installation or a workshop generating sanding dust can all be in scope.',
            },
            {
              question: 'Who decides which zone an area is?',
              answer:
                'The employer, as part of their risk assessment — the process is hazardous area classification, and the result is recorded on a hazardous area drawing. HSE guidance points to published methods and notes that suppliers and trade associations can advise. As an instrument person you normally work to that drawing rather than producing it.',
            },
            {
              question: 'Is CompEx a legal requirement?',
              answer:
                'The legal requirement is competence: people who provide, maintain or verify electrical installations and equipment in or associated with hazardous areas must be competent to do the task. CompEx is the training route most commonly used to demonstrate that competence, and many sites make it a condition of access — but the duty in the regulations is competence itself.',
            },
            {
              question: 'Can I use my normal test meter in a classified area?',
              answer:
                'Not unless it is suitable for that area. The requirement covers portable equipment as well as installed equipment, so a standard multimeter or loop calibrator is not automatically acceptable. Test equipment intended for these areas is marked accordingly, and site procedures usually govern what may be taken in.',
            },
            {
              question: 'What does intrinsically safe actually mean?',
              answer:
                'In principle: the circuit is designed so it cannot store or release enough energy — by spark or by heat — to ignite the atmosphere, even when faulted. It is one of several protection concepts. The engineering detail, including barriers, isolators and how a loop is certified as a system, is covered in Module 7 rather than here.',
            },
            {
              question: 'If the loop is only 24 V, why does any of this matter?',
              answer:
                'Because ignition depends on energy released in a spark, not on voltage being dangerous to a person. A circuit entirely harmless to touch can still produce a spark capable of igniting a flammable atmosphere — which is exactly why intrinsic safety exists as a discipline.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            'The electrical side of an instrument loop is usually the least dangerous part of the job. The process behind the instrument is the hazard, and electrical isolation does nothing about it.',
            'DSEAR places duties on employers to protect people from fire and explosion risks from dangerous substances and potentially explosive atmospheres, across most work activities.',
            'An explosive atmosphere is a dangerous substance — gas, mist, dust or vapour — mixed with air with the potential to catch fire or explode. Potential is the test, not occurrence.',
            'Zone 0 continuous or frequent, Zone 1 likely occasionally in normal operation, Zone 2 not likely and short-lived. Lower number, higher risk.',
            'Zones 0, 1 and 2 are gases, vapours and mists. Zones 20, 21 and 22 are the same tiers for combustible dusts — and dust is the one people underestimate.',
            'Equipment for classified areas must meet the 1996 explosive atmospheres equipment regulations, carries the Ex symbol in a hexagon, and must be verified as suitable by a competent person before first operation.',
            'Competence is a legal requirement for those who provide, maintain or verify equipment in these areas; CompEx is the usual route to demonstrating it.',
            'Breaking a live loop can move a valve, kill a two-wire transmitter or defeat a trip. The controls for that are procedural — permits, control-room agreement, and recording anything inhibited.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself — Module 1.5" />

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-1-section-4')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-left touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              <ChevronLeft className="h-3 w-3" /> Previous
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Standards, traceability and why they matter
            </span>
          </button>
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-2')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-right touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center justify-end gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              Next module <ChevronRight className="h-3 w-3" />
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Module 2 · Sensors and transducers
            </span>
          </button>
        </div>
      </HubBody>
    </HubPage>
  );
};

export default InstrumentationModule1Section5;
