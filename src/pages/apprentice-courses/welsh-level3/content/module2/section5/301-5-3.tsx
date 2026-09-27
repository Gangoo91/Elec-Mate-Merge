/**
 * Unit 301 — Understanding Building Services Engineering Practice in Wales
 * Learning outcome 5 — Understand the relationship between trades and the environment
 * Criterion 5.3 — Sustainable approaches
 *
 * Approach: sustainability here is a set of ordinary trade decisions, not a slogan.
 * Accurate take-off, designing so the installation can be maintained, selecting kit
 * with replaceable parts, thinking about whole life rather than install price,
 * reusing what is sound, moving material efficiently, and commissioning controls so
 * the efficiency actually arrives. The electrician influence is in advice and in
 * waste avoided.
 *
 * This page names no environmental statute, regulation, policy or target, because
 * none could be verified for this course, and it quotes no statistics.
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
    question: 'Which material has the lowest impact on a job?',
    options: [
      'The material you never ordered, because an accurate take-off avoided it',
      'The cheapest material available on the day',
      'The material with the most packaging removed before delivery',
      'The material delivered in the largest single load',
    ],
    correctAnswer: 0,
    explanation:
      'Nothing beats not buying it. An accurate take-off with a sensible allowance is the single biggest contribution an electrician makes, because material never ordered is never made, moved, stored, damaged or skipped.',
  },
  {
    id: 2,
    question: 'What does designing for maintainability mean in practice on an electrical installation?',
    options: [
      'Access, labelling, spare capacity and routes that somebody can get back into without destroying the building',
      'Fitting the most expensive equipment available',
      'Leaving the drawings with the client and nothing else',
      'Installing everything surface mounted regardless of the finish',
    ],
    correctAnswer: 0,
    explanation:
      'Maintainability is access, identification, spare ways and sensible routes. An installation that can be worked on is an installation that gets repaired rather than ripped out.',
  },
  {
    id: 3,
    question: 'Two luminaires meet the lighting design. One has a replaceable driver and module, one is fully sealed. What is the whole-life argument?',
    options: [
      'The repairable one can be fixed in place when the driver fails, so the fitting, the access and the disposal are all avoided',
      'The sealed one is always better because it needs no spares',
      'There is no difference once they are installed',
      'The sealed one is better because it is quicker to install',
    ],
    correctAnswer: 0,
    explanation:
      'A sealed fitting fails as a whole unit. A repairable one turns a replacement into a part swap, which saves the fitting, the packaging, the disposal and often most of the access cost.',
  },
  {
    id: 4,
    question: 'Why is lowest install price a poor basis for selecting equipment on a long-life building?',
    options: [
      'It ignores running cost, replacement frequency and the cost of getting access to replace things',
      'It is always more expensive to buy',
      'It makes the installation harder to test',
      'It has no effect on anything once the job is handed over',
    ],
    correctAnswer: 0,
    explanation:
      'The install price is one cost out of several. Energy, maintenance, access and replacement all continue after handover, and on a high-level or awkward installation the access cost alone can dwarf the saving.',
  },
  {
    id: 5,
    question: 'Which of these is reasonable to reclaim and reuse on a strip-out?',
    options: [
      'Sound cable tray, trunking and steel enclosures that are undamaged and can be inspected',
      'Accessories of unknown age and history, refitted because they still work',
      'Cable pulled out of an old installation with visible damage to the sheath',
      'A distribution board with no records, reused because the ways match',
    ],
    correctAnswer: 0,
    explanation:
      'Containment and steelwork are the honest reuse. Anything carrying current, or anything whose history and condition you cannot establish, is not worth the risk and is not what reuse means.',
  },
  {
    id: 6,
    question: 'What is the practical way to reduce transport on a job?',
    options: [
      'Plan the take-off so deliveries are consolidated, and stop the daily trip to the wholesaler for one item',
      'Use a larger van',
      'Order everything on separate days so nothing is stored on site',
      'Collect material yourself instead of having it delivered, every time',
    ],
    correctAnswer: 0,
    explanation:
      'Repeated small trips are the waste. They cost fuel, they cost labour, and they are almost always caused by a take-off that was not done properly at the start.',
  },
  {
    id: 7,
    question: 'A lighting scheme is designed with occupancy and daylight control but the controls are never set up at handover. What happens?',
    options: [
      'The efficiency does not arrive, because the saving was in the control rather than in the luminaire',
      'Nothing, because the luminaires are efficient on their own',
      'The installation fails inspection immediately',
      'The client saves more, because the lights stay on and last longer',
    ],
    correctAnswer: 0,
    explanation:
      'Efficient luminaires running all day are efficient luminaires wasting energy. Commissioning the control and showing the user how it works is the step that delivers what was designed.',
  },
  {
    id: 8,
    question: 'Where does an electrician have the most real influence on how sustainable a job turns out?',
    options: [
      'In the advice given at specification stage, and in the waste avoided on site',
      'In the choice of skip company',
      'In the brand of hand tools used',
      'In how quickly the work is finished',
    ],
    correctAnswer: 0,
    explanation:
      'You rarely write the specification, but you are asked what you think, and you decide what gets ordered and what gets thrown. Those two are where the influence sits.',
  },
];

export default function Lesson301_5_3() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'The most sustainable material on any job is the one you did not over-order, which makes the take-off the most important thing on this page.',
          'Design so the installation can be maintained: access, labelling, spare ways and routes somebody can get back into.',
          'Choose kit with replaceable parts where you can, because a driver swap avoids a whole fitting, its packaging and its disposal.',
          'Lowest install price ignores running cost, replacement frequency and access cost, and on high-level work access is usually the big number.',
          'Efficiency is delivered by controls that are commissioned and explained, not by the specification sheet.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Explain why an accurate take-off with a sensible allowance is the single largest contribution an electrician makes to reducing waste.',
          'Describe how designing for access, identification and spare capacity keeps an installation repairable instead of disposable.',
          'Compare equipment on repairability and the availability of replaceable parts, not only on the price on the quotation.',
          'Apply whole-life thinking by weighing install cost against running cost, replacement frequency and the cost of access.',
          'Identify what can honestly be reclaimed and reused on a strip-out, and what must never be, and explain why commissioning controls is what delivers the designed efficiency.',
        ]}
        initialVisibleCount={3}
      />

      <SectionRule />

      <ContentEyebrow>Ordering only what you need</ContentEyebrow>

      <ConceptBlock
        title="The most sustainable material is the one you did not over-order"
        plainEnglish="Material that was never bought was never made, never moved, never stored, never damaged and never skipped."
      >
        <p>
          Every other idea on this page is smaller than this one. A take-off done properly, with an
          allowance that reflects the job rather than nerves, decides how much of the site budget
          ends up in a skip. Over-ordering feels safe, and it is the most expensive habit in the
          trade.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Measure, do not guess.</strong> Scale off the drawing, walk the route, add the
            drops and the terminations, then add an allowance you can justify out loud.
          </li>
          <li>
            <strong>Match the drum to the run.</strong> Ordering the next size up because it is on
            the shelf turns the remainder into an offcut nobody will use.
          </li>
          <li>
            <strong>Order in stages on a long job.</strong> First fix quantities are known; second
            fix quantities firm up as the layout settles.
          </li>
          <li>
            <strong>Check the store before you order again.</strong> Most sites have the item
            already, in a box behind something else.
          </li>
          <li>
            <strong>Protect what you have ordered.</strong> Material ruined in a wet corner is
            waste you paid for twice.
          </li>
        </ul>
        <p>
          An accurate take-off also makes you look competent to the people who decide who gets the
          next job, which is the version of this argument that lands with a contracts manager.
        </p>
      </ConceptBlock>

      <ContentEyebrow>Long life and repairability</ContentEyebrow>

      <ConceptBlock
        title="Design for maintainability and long life"
        onSite="If nobody can get at it, nobody repairs it. They replace it, or they leave it broken."
      >
        <p>
          An installation that is easy to work on stays in service for decades. One that is buried,
          unlabelled and full to capacity gets ripped out at the first change of use, and the whole
          lot goes in a skip long before it had to.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Access.</strong> Boards where you can stand in front of them, containment you
            can lift a lid off, draw points where a cable can actually be drawn.
          </li>
          <li>
            <strong>Identification.</strong> Proper labelling and an accurate schedule means the
            next person diagnoses in an hour instead of guessing for a day.
          </li>
          <li>
            <strong>Spare capacity.</strong> Spare ways, a spare draw wire in the duct, a little
            room on the tray. Change is certain; capacity for it is cheap at first fix.
          </li>
          <li>
            <strong>Sensible routes.</strong> Avoid running through areas that will be sealed,
            decorated or handed to another tenant.
          </li>
          <li>
            <strong>Records handed over.</strong> Drawings and schedules that match what is actually
            installed. An undocumented installation is treated as disposable.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Select for repairability and replaceable parts"
        plainEnglish="Ask one question at selection: when this fails, what gets thrown away?"
      >
        <p>
          A great deal of modern equipment is designed to be discarded whole. Sometimes there is no
          alternative; often there is, and the difference at purchase is small compared with what it
          saves later.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Separately replaceable driver and light module.</strong> The commonest failure is
            the driver, and it is the cheapest part.
          </li>
          <li>
            <strong>Standard sizes and standard fixings.</strong> A luminaire on a standard module
            can be matched years later. A proprietary shape cannot.
          </li>
          <li>
            <strong>Spares availability.</strong> Ask whether parts will still be obtainable, and
            whether the manufacturer actually sells them separately.
          </li>
          <li>
            <strong>Serviceable emergency provision.</strong> Replaceable battery packs rather than
            a sealed unit that is binned when the cells go.
          </li>
          <li>
            <strong>Enclosures and gear you can get inside.</strong> Terminals that can be worked
            on, gland plates that come off, doors with room behind them.
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id="301-5-3-check-1"
        question="You are asked to price a relight of a workshop with a high roof. Which selection question matters most for whole-life cost?"
        options={[
          'Whether the fitting comes in a smaller box',
          'Whether the fitting is the cheapest on the wholesaler list',
          'Whether the fitting is available in more than one colour',
          'Whether the driver and module can be replaced in place, because access at that height is the expensive part of any future failure',
        ]}
        correctIndex={3}
        explanation="At height, the cost of a failure is dominated by access. A fitting that can be repaired on the platform in one visit avoids a full replacement, a second delivery and a disposal, and the difference at purchase is usually small."
      />

      <ContentEyebrow>Whole-life cost</ContentEyebrow>

      <ConceptBlock
        title="Whole life, not lowest install price"
        onSite="The cheap floodlight fitted three times is not the cheap floodlight."
      >
        <p>
          Whole-life thinking means adding up the costs that keep happening after the job is handed
          over, and it is an argument you can make to a client in plain money without any reference
          to anything else.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Install cost.</strong> Material and labour, paid once, and the only number most
            people look at.
          </li>
          <li>
            <strong>Running cost.</strong> Energy for as long as the building is used, which on
            lighting and heating dwarfs the purchase.
          </li>
          <li>
            <strong>Maintenance cost.</strong> Lamps, drivers, batteries, cleaning, testing.
          </li>
          <li>
            <strong>Access cost.</strong> Platform hire, night working, shutting a production line.
            This is the one people forget and it is often the largest.
          </li>
          <li>
            <strong>Replacement frequency.</strong> How many times this will be done again before
            the building changes use.
          </li>
          <li>
            <strong>End of life.</strong> What has to be taken out, separated and disposed of, and
            who pays for that.
          </li>
        </ul>
      </ConceptBlock>

      <ContentEyebrow>Reuse, reclaim and deliveries</ContentEyebrow>

      <ConceptBlock
        title="Reuse and reclaim where it is genuinely sound"
        plainEnglish="Reuse means containment and steel, not accessories with an unknown history."
      >
        <p>
          On a strip-out there is usually good material coming out. Some of it is worth keeping and
          some of it is a liability dressed up as a saving. The test is whether you can inspect it,
          establish its condition and stand behind it afterwards.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Reuse readily.</strong> Cable tray, ladder, trunking, steel enclosures, unistrut,
            drum stands, undamaged conduit and fixings.
          </li>
          <li>
            <strong>Reuse with care.</strong> Full drums and part drums of cable in known condition,
            kept dry and labelled with what they are.
          </li>
          <li>
            <strong>Do not reuse.</strong> Cable with damaged sheath, accessories of unknown age,
            protective devices you cannot verify, anything heat damaged, anything that failed
            inspection.
          </li>
          <li>
            <strong>Offer it before you skip it.</strong> Another site in the company, the client
            maintenance store, or a training centre will often take sound surplus.
          </li>
          <li>
            <strong>Store it so it stays usable.</strong> Reclaimed material left in the rain is just
            a slower way of skipping it.
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id="301-5-3-check-2"
        question="During a strip-out you recover a length of galvanised tray, a part drum of cable and a box of used accessories. What is the sensible split?"
        options={[
          'Keep the tray, keep the part drum if it is undamaged and label it, and do not refit used accessories of unknown history',
          'Keep all three, because everything still works',
          'Skip all three, because nothing from a strip-out should be reused',
          'Keep the accessories and skip the tray, because the tray is heavy',
        ]}
        correctIndex={0}
        explanation="Containment and identified, undamaged cable are honest reuse. Used accessories whose age, loading and history you cannot establish are a liability you would have to sign for, and the saving is trivial next to the risk."
      />

      <SectionRule />

      <ConceptBlock
        title="Transport, deliveries and the wholesaler run"
        onSite="Three trips for one box of glands is a take-off problem, not a driving problem."
      >
        <p>
          Movement is the quiet cost on a job. It burns fuel, it burns labour, and every hour in a
          van is an hour not spent installing. The fix is almost always better planning at the front
          rather than discipline at the wheel.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Consolidate deliveries.</strong> One planned delivery for a phase beats five
            small ones, and it usually gets a better price too.
          </li>
          <li>
            <strong>Keep a sensible van stock.</strong> The small consumables that cause emergency
            trips: glands, grommets, terminals, fixings, tape.
          </li>
          <li>
            <strong>Order to the programme.</strong> Material on site long before it is needed gets
            damaged, gets walked off, and gets in the way.
          </li>
          <li>
            <strong>Plan access for the delivery.</strong> A lorry that cannot get in becomes a
            second delivery.
          </li>
          <li>
            <strong>Combine the collection with something else.</strong> If somebody has to go, give
            them the full list and the returns to take back.
          </li>
        </ul>
      </ConceptBlock>

      <ContentEyebrow>Controls and your own influence</ContentEyebrow>

      <ConceptBlock
        title="Energy efficiency is delivered by the controls"
        plainEnglish="An efficient luminaire left on all night is an efficient way of wasting energy."
      >
        <p>
          The specification promises the saving. The commissioning delivers it. This is the step that
          gets squeezed at the end of a job, and it is the step where most of the designed
          performance is lost.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Set the levels properly.</strong> Over-lit spaces waste energy permanently and
            nobody ever turns them back down.
          </li>
          <li>
            <strong>Commission occupancy and daylight control.</strong> Detection zones, time delays
            and thresholds set for the room, not left at factory default.
          </li>
          <li>
            <strong>Time controls set to the building.</strong> Actual opening hours, actual shift
            patterns, not a guess typed in on handover day.
          </li>
          <li>
            <strong>Show the user how it works.</strong> A control that irritates people gets
            overridden, and an overridden control saves nothing.
          </li>
          <li>
            <strong>Leave the settings written down.</strong> The next person needs to know what was
            set and why, or it goes back to default at the first fault.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Where your influence actually is"
        onSite="You will not write the specification. You will be asked what you think, and you decide what gets thrown."
      >
        <p>
          It is easy to conclude that none of this is in your gift because somebody else designs the
          job. In practice an electrician changes the outcome in two places, and both of them are
          ordinary parts of the working day.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Advice at the right moment.</strong> When the client or the contracts manager
            asks what you would fit, that is the moment. Offer the alternative with the reasoning in
            money and access, not in principle.
          </li>
          <li>
            <strong>Propose it properly.</strong> A written alternative with the difference in
            install cost, running cost and replacement frequency gets taken seriously. A grumble on
            site does not.
          </li>
          <li>
            <strong>Waste avoided on site.</strong> What you order, what you protect, what you
            return, what you reuse and what you segregate is entirely yours.
          </li>
          <li>
            <strong>Returns are a real saving.</strong> Unopened surplus back to the wholesaler is
            money and material recovered, and it takes one phone call.
          </li>
          <li>
            <strong>Do it consistently.</strong> The contractor who is known for tight material
            control gets asked back, which is the incentive that makes this stick.
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id="301-5-3-check-3"
        question="A new office lighting scheme is finished but the occupancy sensors are still on their factory settings and nobody has shown the client how to use the panel. What should happen before handover?"
        options={[
          'Nothing, because the sensors work out of the box',
          'Commission the detection zones, delays and levels for the actual rooms, demonstrate it to the client and leave the settings recorded',
          'Disable the sensors so the client is not annoyed by them',
          'Leave a manual in the cupboard and close the job',
        ]}
        correctIndex={1}
        explanation="Default settings rarely suit the room, and a control nobody understands gets overridden within a fortnight. Commissioning, demonstrating and recording the settings is how the designed efficiency actually arrives."
      />

      <SectionRule />

      <RegsCallout
        source="CDM 2015"
        clause="Regulation 18 — each part of a construction site must, so far as is reasonably practicable, be kept in good order, and parts where construction work is being carried out must be kept in a reasonable state of cleanliness."
        meaning="Good order is also material control. Cable, containment and fittings stored properly stay usable, get returned or get reused; the same material stacked in a wet corner and walked over becomes waste you already paid for. The same regulation adds that no material with projecting nails or similar sharp objects may be used or left where it could be a danger, which is the reason stripped-out timber, packaging and offcuts get broken down and stacked rather than left where they fall."
        cite="HSE L153, Managing health and safety in construction"
      />

      <SectionRule />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Adding a comfortable margin to every single line of the order"
        whatHappens={
          <>
            <p>
              The take-off is done quickly and a generous margin is added to everything, on the basis
              that running short costs more than running over. The surplus arrives, gets stacked in a
              corner of the unit, and is gradually buried by the other trades. At the end of the job
              the part drums have lost their labels, the boxes are open and damp, and nobody is
              willing to sign for a return. The whole lot is loaded into a mixed skip because
              clearing the unit is on the critical path and there is no time to sort it. The
              contractor pays for the material twice and for the skip once, and the estimator uses
              the same inflated figures on the next job because that is what was drawn from stock.
            </p>
          </>
        }
        doInstead={
          <>
            <p>
              Do the take-off from the drawings and the route walk, and set one allowance you can
              explain, rather than padding every line by instinct. Order in stages so second fix
              quantities are confirmed by what is actually on the wall. Keep surplus dry, labelled
              and in one place from day one, and start the returns conversation with the wholesaler
              while the boxes are still sealed. Book an hour for material clearance before the final
              week rather than during it, so sorting is possible when it is still cheap.
            </p>
          </>
        }
      />

      <CommonMistake
        title="Handing over efficient kit on its factory settings"
        whatHappens={
          <>
            <p>
              The luminaires and sensors are exactly what was specified and every one of them
              works. Commissioning is the last thing on a job that is already late, so the
              detection zones, the time delays and the daylight thresholds are left as they came
              out of the box, and nobody is shown the panel.
            </p>
            <p>
              Within a fortnight the lights are dropping out on people at their desks and coming
              on in an empty store, so somebody finds the override and the whole scheme ends up
              running fixed from seven till seven. The efficient installation is now an efficient
              way of wasting energy, and every saving the client was quoted has quietly gone.
            </p>
          </>
        }
        doInstead={
          <>
            <p>
              Treat commissioning as part of the installation rather than the thing you do if there
              is time. Set the levels for the room instead of over-lighting it, set detection
              zones, delays and thresholds for how the space is actually used, and set time
              controls to the real opening hours rather than a guess typed in on handover day.
            </p>
            <p>
              Then make it survive you. Demonstrate it to the person who will live with it, because
              a control that irritates people gets overridden and an overridden control saves
              nothing, and leave the settings written down so the next person does not reset it all
              to default at the first fault.
            </p>
          </>
        }
      />

      <SectionRule />

      <Scenario
        title="Wrexham — a workshop relight and the cheapest fitting on the list"
        situation={
          <>
            <p>
              You are pricing a relight of a light industrial unit in Wrexham. The roof is high, the
              floor is full of machinery, and any work up there needs a platform and a weekend
              shutdown. The client has been sent a quotation by another firm using a sealed LED high
              bay with no replaceable parts, and yours uses a fitting with a separately replaceable
              driver and module. Yours is dearer per fitting and the client has noticed. He asks you
              to match the other price.
            </p>
          </>
        }
        whatToDo={
          <>
            <p>
              Do not argue about principle. Put the whole-life case on one side of paper. Set out
              what happens at the first driver failure with each option: with the sealed fitting the
              whole unit is replaced, so a new fitting is bought, the old one is taken away and
              disposed of, and the platform and shutdown are needed for the change. With the
              repairable fitting the same platform visit swaps a driver and the fitting stays. Then
              point out the access cost is the same either way, so the comparison is really between
              buying one part and buying a whole luminaire, every time. Offer to price both properly
              rather than to match a number, and offer a middle option: the repairable fitting in the
              bays over the machinery where access is worst, and the cheaper fitting in the store and
              the corridor where a ladder reaches.
            </p>
          </>
        }
        whyItMatters={
          <>
            <p>
              This is exactly where an electrician has influence. Nobody asked you to write a policy;
              they asked you what you would fit. The zoned answer is the one that usually gets
              accepted, because it respects the budget and still puts the durable kit where the
              access cost lives. It also means that when a driver fails in three winters time the
              client is not paying for a full set of new luminaires, a full set of new packaging and
              a skip, and you are the firm he rings.
            </p>
          </>
        }
      />

      <SectionRule />

      <FAQ
        items={[
          {
            question: 'How much allowance should I add to a cable take-off?',
            answer:
              'Enough to cover the terminations, drops, sets and the route as actually walked, plus a margin you could justify to a contracts manager. The test is whether you can explain it. A figure added out of nerves is the one that ends up in the skip.',
          },
          {
            question: 'Is it worth returning surplus material?',
            answer:
              'Yes, and it is the most overlooked saving on a job. Unopened boxes and full drums are usually returnable if you ask early, keep the paperwork and keep them dry. Start the conversation while the job is running, not in the week you have to clear the unit.',
          },
          {
            question: 'The client just wants the cheapest quote. Is whole-life thinking wasted?',
            answer:
              'Not if you put it in money. Show the cost of the first failure including access, and offer a zoned option that puts durable kit only where it is hard to reach. Clients accept that far more often than they accept a lecture, and you have then done your part of the job properly.',
          },
          {
            question: 'Can I reuse cable I have pulled out of an old installation?',
            answer:
              'Only if you can establish exactly what it is, see that the sheath and insulation are undamaged, and keep it identified and dry. If any of those are in doubt, it is scrap with a value at the metal merchant rather than material for the next job.',
          },
        ]}
      />

      <SectionRule />

      <KeyTakeaways
        points={[
          'The largest single saving is the material you never ordered, so the take-off and the allowance are where this criterion really lives.',
          'Order to the programme and in stages, and check the store before ordering again.',
          'Maintainability is access, identification, spare capacity and routes somebody can get back into.',
          'Ask at selection what gets thrown away when this fails, and favour replaceable drivers, modules and battery packs.',
          'Compare install cost, running cost, maintenance, access and replacement frequency, because access usually dominates at height.',
          'Reuse containment, steelwork and identified undamaged cable, and never refit accessories or protective devices with an unknown history.',
          'Consolidate deliveries and carry sensible van stock, because repeated small trips are a planning failure.',
          'Commission the controls, demonstrate them and record the settings, or the designed efficiency never arrives.',
        ]}
      />

      <SectionRule />

      <ContentEyebrow>Check yourself</ContentEyebrow>
      <Quiz questions={quizQuestions} title="5.3 Sustainable approaches" />
    </div>
  );
}
