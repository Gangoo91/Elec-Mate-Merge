/**
 * Unit 315E · Criterion 3.2 — The application of the Degrees of Protection
 * Provided by Enclosures (IP Code)
 *
 * Approach: teach the code as something you read and then apply. First how
 * the digits are structured and what each one means, then how a rating is
 * chosen for a real location, then the limits of what an IP rating actually
 * tells you — impact and mechanical damage are a separate question.
 *
 * Only the digits and meanings given in the source lessons are stated. No IP
 * table has been reproduced from memory.
 *
 * Sources used (existing verified teaching):
 *   level3/module5/section2/Sub5.tsx — special locations, IP and IK ratings
 *   level2/module3/section3/Sub2.tsx — wiring systems for different environments
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
  VideoCard,
} from '@/components/study-centre/learning';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { videos } from '@/data/study-centre/video-library';

const quizQuestions = [
  {
    id: 1,
    question: 'What does the rating IP44 tell you about an enclosure?',
    options: [
      'Protected against ingress of solid objects greater than 1 mm, and protected against splashing water from any direction.',
      'Protected against dust entirely, and protected against temporary immersion in water up to 1 m.',
      'Protected against solid objects greater than 12.5 mm, and protected against water spray up to 60 degrees from vertical.',
      'Protected against powerful water jets, with no defined level of protection against solid objects.',
    ],
    correctAnswer: 0,
    explanation:
      'The first digit covers solids and the second covers water. First digit 4 is protection against solids greater than 1 mm; second digit 4 is protection against splashing water from any direction. IP44 is the common requirement for basic outdoor accessories and for equipment in the outer bathroom zone.',
  },
  {
    id: 2,
    question: 'In the IP code, what does a first digit of 6 mean?',
    options: [
      'Dust-tight — the top of the solids scale, which runs from 0 for no protection through to 6.',
      'Protected against solid objects greater than 1 mm, which is the top of the solids scale.',
      'Protected against powerful water jets, because the first digit covers water on enclosures rated above IP50.',
      'Protected against continuous immersion, because 6 is the highest figure the code uses.',
    ],
    correctAnswer: 0,
    explanation:
      'The solids digit runs 0 to 6: 0 none, 1 solids over 50 mm, 2 over 12.5 mm, 3 over 2.5 mm, 4 over 1 mm, 5 dust-protected, 6 dust-tight. Immersion and jets are all second-digit properties.',
  },
  {
    id: 3,
    question: 'On the water digit of the IP code, what do 5, 7 and 8 mean?',
    options: [
      '5 is jets, 7 is immersion to 1 m, and 8 is continuous immersion.',
      '5 is splashing, 7 is powerful jets, and 8 is high-pressure steam cleaning.',
      '5 is spray, 7 is condensation, and 8 is immersion to 1 m.',
      '5 is vertical drips, 7 is splashing, and 8 is powerful jets.',
    ],
    correctAnswer: 0,
    explanation:
      'The water digit runs 0 none, 1 vertical drips, 2 drips at 15 degrees, 3 spray, 4 splash, 5 jets, 6 powerful jets, 7 immersion 1 m, 8 continuous immersion, 9 high pressure and steam. Jets and immersion are two very different exposures and picking the wrong one is how enclosures fill with water.',
  },
  {
    id: 4,
    question: 'What water-ingress rating applies to equipment in Zone 0 of a swimming pool?',
    options: [
      'IPX8 — equipment immersed in water requires the continuous-immersion rating.',
      'IPX4 — splash protection is sufficient because the equipment is fixed below the water line.',
      'IPX5 — jet protection, because pool surfaces are cleaned with hoses.',
      'IPX2 — drip protection, because Zone 0 equipment is sealed by the pool structure itself.',
    ],
    correctAnswer: 0,
    explanation:
      'Zone 0 of a pool is the interior of the pool, so equipment there is permanently under water and needs IPX8. Zone 1 above the pool surface is IPX5 or IPX4 depending on the detail, and Zone 2 is IPX2 minimum.',
  },
  {
    id: 5,
    question:
      'Why must trunking containing non-sheathed cables provide at least IPXXD or IP4X where the cover can be removed?',
    options: [
      'Because non-sheathed cables have only one layer of insulation, so basic protection depends on nobody being able to reach the conductor — IPXXD or IP4X means the standard test finger or wire cannot reach it.',
      'Because the rating prevents dust building up on the conductors and causing tracking between them.',
      'Because the rating is what allows the trunking to be used as a protective conductor for the circuits inside it.',
      'Because the rating is required before any cable may share a containment with data or communications cabling.',
    ],
    correctAnswer: 0,
    explanation:
      'Single-core non-sheathed cable has one layer of insulation. If a finger could reach a live conductor through a gap, basic protection has failed. The requirement, together with a cover that can only be removed with a tool or a deliberate action, keeps that single layer effective.',
  },
  {
    id: 6,
    question: 'What are the water-ingress requirements for the bathroom zones?',
    options: [
      'Zone 0 IPX7 minimum for immersion, Zone 1 IPX4 minimum rising to IPX5 where water jets are used for cleaning, and Zone 2 the same IPX4 minimum rising to IPX5 with water jets.',
      'Zone 0 IPX4, Zone 1 IPX5 and Zone 2 IPX7, with the rating increasing as you move away from the bath.',
      'All three zones require IPX8 because a bathroom is classed throughout as a wet location.',
      'No IP rating applies inside a bathroom provided every circuit has residual current protection.',
    ],
    correctAnswer: 0,
    explanation:
      'Zone 0 is the interior of the bath or shower basin, so immersion protection at IPX7 is the minimum there. Zones 1 and 2 are splash environments at IPX4, rising to IPX5 where the room is cleaned with water jets.',
  },
  {
    id: 7,
    question: 'An enclosure is marked IP66 IK10. What does the IK part add?',
    options: [
      'Impact resistance — IK10 is the top of the scale at 20 J, roughly a 5 kg mass dropped from 400 mm. The IP digits say nothing about impact.',
      'A second water rating for pressure washing, which the IP digits do not cover.',
      'A temperature rating for the enclosure material in hot environments.',
      'A corrosion rating for enclosures used where livestock effluent is present.',
    ],
    correctAnswer: 0,
    explanation:
      'IP describes ingress; IK describes impact. The scale runs from IK00, meaning no impact testing, up to IK10 at 20 J. A car park bollard is typically around IK07 at 2 J, and vandal-prone or vehicle-exposed positions call for IK10.',
  },
  {
    id: 8,
    question: 'What level of ingress protection is typically required on a construction site?',
    options: [
      'IP44 as a typical minimum, rising to IP65 for outdoor wet positions, matched to the rain, dust and mud the site actually produces.',
      'IP20 throughout, because site equipment is temporary and is removed at the end of each shift.',
      'IPX8 throughout, because all site equipment must be able to withstand immersion.',
      'No IP requirement applies, because site supplies are reduced to 110 V centre-tapped earth.',
    ],
    correctAnswer: 0,
    explanation:
      'Construction sites bring rain, dust and mud together. The typical minimum is IP44, with IP65 where equipment is outdoors and wet. The reduced-voltage supply arrangement is a shock control and does nothing about ingress.',
  },
];

export default function Lesson315e_3_2() {
  return (
    <div className="space-y-8">
      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        The IP code is two digits that tell you exactly what an enclosure keeps out. Reading it is
        easy. Applying it — deciding what the location will actually throw at the equipment, and
        picking a rating that survives it — is the part that separates a specification that lasts
        from one that fills with water in its first winter.
      </p>

      <TLDR
        points={[
          'IP stands for ingress protection. The first digit describes protection against solid objects and runs from 0 to 6. The second digit describes protection against water and runs from 0 to 9.',
          'An X in place of a digit means that property is not rated or not being stated. IPX8 rates water only; IPXXD rates access with a wire only.',
          'Applying the code means starting from the location, not the catalogue. Ask what solids and what water the position actually sees, then select a rating that covers both.',
          'Special locations set their own minimum ratings by zone — the interior of a bath or shower basin, the inside of a pool, a washdown area and an exposed outdoor position all have different answers.',
          'IP says nothing about impact. That is the IK rating, and mechanical damage from nails, screws and vehicles is a separate requirement again.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Read an IP rating correctly and state what each of the two digits describes.',
          'Recall the meaning of each figure on the solids scale from 0 to 6 and on the water scale from 0 to 9, and explain what the letter X means in a rating such as IPX8, IPXXD or IP4X.',
          'Select an appropriate degree of protection for a given location by assessing the solids and water present at that position.',
          'Apply the zone-based minimum ratings used in bathrooms, swimming pools, construction sites and agricultural premises.',
          'Explain why an IP rating alone does not address impact or mechanical damage, and identify what does.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>What the code is for</ContentEyebrow>

      <ConceptBlock
        title="Two digits, two different questions"
        plainEnglish="The IP code describes the degrees of protection provided by an enclosure. The first digit answers what solid objects can get in. The second digit answers what water can get in. Both are measured against defined tests, so the marking on an enclosure means the same thing whoever made it."
        onSite="Every accessory, enclosure and isolator you fit has a rating printed or moulded on it somewhere. Get into the habit of reading it before it goes on the wall, not after the customer rings about water in the box."
      >
        <p>Why the code exists at all:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>It replaces vague words.</strong> Weatherproof, splashproof and outdoor-rated
            mean nothing in a specification. IP55 means one specific tested performance.
          </li>
          <li>
            <strong>It is comparable across manufacturers.</strong> The digits are defined the same
            way whoever makes the product, so a selection can be made from a schedule without
            handling the item.
          </li>
          <li>
            <strong>It maps onto the location.</strong> Once you can describe what the position
            throws at equipment — dust, splash, jets, immersion — you can convert that description
            straight into a pair of digits.
          </li>
          <li>
            <strong>It is verifiable afterwards.</strong> The marking is physically on the product,
            so anybody inspecting the installation can check what was fitted against what the
            location needed.
          </li>
        </ul>
      </ConceptBlock>

      <VideoCard {...videos.ipRatings} />

      <SectionRule />

      <ContentEyebrow>Reading the two digits</ContentEyebrow>

      <ConceptBlock
        title="First digit — solid objects, 0 to 6"
        plainEnglish="The solids scale starts at no protection and works up through progressively smaller objects, finishing with dust. The steps are about the size of the thing that can get in, which is why the middle of the scale is measured in millimetres."
        onSite="On an indoor distribution board the solids digit is doing the safety work — it is what stops fingers and tools reaching live parts. Outdoors and in dusty premises it is doing a reliability job as well."
      >
        <p>The solids scale in full:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>0.</strong> No protection.
          </li>
          <li>
            <strong>1.</strong> Protected against solids greater than 50 mm.
          </li>
          <li>
            <strong>2.</strong> Protected against solids greater than 12.5 mm.
          </li>
          <li>
            <strong>3.</strong> Protected against solids greater than 2.5 mm.
          </li>
          <li>
            <strong>4.</strong> Protected against solids greater than 1 mm.
          </li>
          <li>
            <strong>5.</strong> Dust-protected.
          </li>
          <li>
            <strong>6.</strong> Dust-tight.
          </li>
        </ul>
        <p>
          Note the difference between 5 and 6. Dust-protected means dust may enter but not in a
          quantity that interferes with operation. Dust-tight means it does not get in. In a joinery
          workshop or a grain store that distinction decides whether the enclosure is still working
          in five years.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="Second digit — water, 0 to 9"
        plainEnglish="The water scale runs from nothing, through drips and spray, into splashing, then jets, then immersion, and finally high pressure and steam. Each step is a harder test than the one before it."
        onSite="The step that catches people out is the jump from splash to jets. Splash is weather. Jets are a hose. If the area gets washed down, splash protection is not enough no matter how sheltered the position looks."
      >
        <p>The water scale in full:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>0.</strong> No protection.
          </li>
          <li>
            <strong>1.</strong> Vertically falling drips.
          </li>
          <li>
            <strong>2.</strong> Drips at 15 degrees from vertical.
          </li>
          <li>
            <strong>3.</strong> Spray.
          </li>
          <li>
            <strong>4.</strong> Splashing from any direction.
          </li>
          <li>
            <strong>5.</strong> Water jets.
          </li>
          <li>
            <strong>6.</strong> Powerful water jets.
          </li>
          <li>
            <strong>7.</strong> Immersion to 1 m.
          </li>
          <li>
            <strong>8.</strong> Continuous immersion.
          </li>
          <li>
            <strong>9.</strong> High pressure and steam.
          </li>
        </ul>
        <p>
          Immersion and jets test different things, so the scale is not a simple ladder at the top
          end. An enclosure tested for immersion has not necessarily been tested against a
          high-pressure jet, which is why some products carry more than one water figure.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="315e-3-2-check-1"
        question="An accessory is fitted in a position that is regularly hosed down as part of cleaning. Which water digit is the minimum you should be looking for?"
        options={[
          '4, because splashing from any direction covers water arriving at the enclosure from a hose.',
          '5, because a hose is a water jet, and the splash rating below it is only tested against splashing.',
          '7, because any cleaning regime that involves water means the enclosure must be rated for immersion.',
          '2, because the water is only falling on the enclosure from above during cleaning.',
        ]}
        correctIndex={1}
        explanation="Jets are the fifth step on the water scale and a hose is a jet. Splash protection at 4 is a weather rating, not a washdown rating. Where the cleaning is more aggressive again, the ratings above 5 cover powerful jets and then high pressure and steam."
      />

      <SectionRule />

      <ContentEyebrow>X, and what it is hiding</ContentEyebrow>

      <ConceptBlock
        title="IPX8, IP4X and IPXXD — when a digit is replaced by a letter"
        plainEnglish="An X in a rating means that property has not been rated, or is not being stated in that context. It does not mean zero. IPX8 tells you about water and says nothing about solids. IP4X tells you about solids and says nothing about water."
        onSite="Zone requirements are usually written with an X in them precisely because the location is only concerned with one of the two properties. A pool zone cares about water. A trunking lid cares about fingers."
      >
        <p>The forms you will actually meet:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>IPX4, IPX5, IPX7, IPX8.</strong> Water-only statements used where the
            requirement is about wet conditions — the bathroom and swimming pool zones are written
            this way.
          </li>
          <li>
            <strong>IP4X.</strong> A solids-only statement at the fourth step, so nothing greater
            than 1 mm can enter. Used where the concern is access to live parts rather than weather.
          </li>
          <li>
            <strong>IPXXD.</strong> A statement about access with a wire, using the additional
            letter rather than the numeric solids digit. Same practical purpose as IP4X in the
            context of containment covers.
          </li>
        </ul>
        <p>
          The reason the containment requirement is written with these forms is that the risk being
          controlled is contact with a live conductor, not ingress of weather. Non-sheathed
          single-core cable has one layer of insulation and nothing else. If a finger or a wire can
          reach the conductor, basic protection has failed.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 521.10.1"
        clause="Non-sheathed cables for fixed wiring shall be enclosed in conduit, ducting or trunking. This requirement does not apply to a protective conductor complying with Section 543. Non-sheathed cables are permitted if the cable trunking system provides at least the degree of protection IPXXD or IP4X, and if the cover can only be removed by means of a tool or a deliberate action."
        meaning="This is the IP code used as a safety requirement rather than a weather requirement. Singles have one layer of insulation, so the containment has to stop a finger or a wire reaching the conductor. The two conditions work together — the degree of protection, and a cover that cannot come off by accident. Loose singles in a cable basket satisfy neither."
        cite="Source: BS 7671:2018+A4:2026 — Regulation 521.10.1."
      />

      <SectionRule />

      <ContentEyebrow>Choosing a rating for a location</ContentEyebrow>

      <ConceptBlock
        title="Start from the position, not from the catalogue"
        plainEnglish="The selection question is always the same two-part question. What solids reach this position, and what water reaches this position. Answer both honestly and the rating writes itself."
        onSite="Walk the position before you specify. Is there a hose reel on the wall? Is the door left open in the rain? Does the extract blow dust across that corner? Those observations are the specification."
      >
        <p>The common ratings and where each of them belongs:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>IP20.</strong> Indoor, finger-touch protected. The everyday domestic and office
            accessory rating.
          </li>
          <li>
            <strong>IP44.</strong> Splash resistant. Basic outdoor positions and the outer bathroom
            zone.
          </li>
          <li>
            <strong>IP55.</strong> Jet resistant. Most genuinely outdoor work, where IP44 is not
            enough for direct exposure to rain.
          </li>
          <li>
            <strong>IP65.</strong> Dust-tight plus jets. Harsh outdoor positions and washdown areas.
          </li>
          <li>
            <strong>IP67.</strong> Immersion rated.
          </li>
          <li>
            <strong>IPX8.</strong> Continuous immersion, which is what the interior of a swimming
            pool demands.
          </li>
        </ul>
        <p>
          The single most common specification error is treating IP44 as the outdoor rating. It is
          not. IP44 is splash. Direct exposure to rain needs IP55 or better, and anywhere that is
          hosed or washed down needs IP65.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="Locations that set their own minimum"
        plainEnglish="Some locations do not leave the rating to your judgement — the zone you are working in carries a stated minimum. Bathrooms, swimming pools, construction sites and agricultural premises are the ones you will meet most."
        onSite="Identify the location type before you pick equipment, then work zone by zone with a tape measure where the zones are dimensional. Fitting a Zone 2 accessory in Zone 1 is one of the most common defects there is."
      >
        <p>The minimums by location:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Bathrooms.</strong> Zone 0, the interior of the bath or shower basin, is IPX7
            minimum. Zone 1 is IPX4 minimum, rising to IPX5 where water jets are used for cleaning.
            Zone 2 is the same, IPX4 minimum and IPX5 with water jets.
          </li>
          <li>
            <strong>Swimming pools.</strong> Zone 0, the interior of the pool, is IPX8 for
            continuous immersion. Zone 1 above the pool surface is IPX5 or IPX4 depending on the
            detail. Zone 2 is IPX2 minimum.
          </li>
          <li>
            <strong>Construction sites.</strong> The rating is matched to the site conditions —
            rain, dust and mud. Typically IP44 as a minimum, and IP65 for outdoor wet positions.
          </li>
          <li>
            <strong>Agricultural and horticultural premises.</strong> Typically IP65 or higher in
            milking parlours where hose-down resistance is needed, IP54 in covered areas and IP44
            in dry stores.
          </li>
          <li>
            <strong>Outdoor charging equipment.</strong> An isolator mounted next to an exposed
            outdoor charging unit is typically IP65.
          </li>
        </ul>
        <p>
          Notice how much of this is written water-first. In wet locations the water digit is doing
          nearly all the work, which is why the requirements are stated as IPX-something rather
          than as a full pair of digits.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="315e-3-2-check-2"
        question="You are selecting a rotary isolator to mount on an external wall beside a vehicle charging unit on an exposed driveway. What are you looking for and why?"
        options={[
          'IP20, because the isolator is a switching device rather than an enclosure containing terminations.',
          'IPX2, because the position is vertical and only drips will reach the enclosure.',
          'IP44, because splash protection is the recognised rating for all outdoor accessories.',
          'IP65 — the position is outdoors and exposed, so it needs dust-tight construction and protection against water jets rather than splash only.',
        ]}
        correctIndex={3}
        explanation="An exposed outdoor position sees wind-driven rain and, sooner or later, a pressure washer aimed at the driveway. IP44 is a splash rating and does not cover direct rain exposure; IP65 gives dust-tight construction plus jet protection, which is the usual answer for an isolator in that position."
      />

      <SectionRule />

      <ContentEyebrow>What the IP code does not tell you</ContentEyebrow>

      <ConceptBlock
        title="Impact is a separate rating, and damage is a separate requirement again"
        plainEnglish="An enclosure can be completely dust-tight and immersion-proof and still shatter the first time a trolley hits it. Ingress and impact are different properties, tested differently and rated separately."
        onSite="Check both markings on anything going into a public area, a car park, a school or a sports facility. Premature equipment failure in those environments is very often an impact problem wearing an ingress-rated jacket."
      >
        <p>How the impact scale works:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>IK00.</strong> No impact testing.
          </li>
          <li>
            <strong>IK07.</strong> Around 2 J — the typical level for something like a car park
            bollard.
          </li>
          <li>
            <strong>IK10.</strong> 20 J, equivalent to a 5 kg mass dropped from 400 mm. Exposed and
            vandal-prone positions.
          </li>
        </ul>
        <p>
          Impact resistance matters wherever there is foreseeable contact — public areas, vehicle
          proximity, sports facilities and schools. Selecting the right IK is part of the same
          conversation as selecting the right IP, and a mismatch on either one is recordable when
          the installation is inspected.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="Ingress ratings and buried cable are different problems"
        plainEnglish="No IP rating protects a cable from a nail. Where the risk is penetration or mechanical damage rather than dust and water, the requirement comes from the rules on cables in walls and partitions, not from the IP code."
        onSite="Keep the two risks separate when you are thinking about a run. Water and dust get answered by the enclosure rating. Nails, screws, shovels and forklifts get answered by position, by containment and by additional protection."
      >
        <p>Where the line falls:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>IP answers ingress.</strong> What can get into the enclosure — solids, then
            water.
          </li>
          <li>
            <strong>IK answers impact.</strong> How much energy the enclosure survives.
          </li>
          <li>
            <strong>The wiring system answers penetration.</strong> Depth, prescribed zones,
            earthed mechanical protection and residual current protection are what deal with the
            screw going into the wall later.
          </li>
        </ul>
        <p>
          The three requirements stack rather than substitute. A washdown area with forklift traffic
          needs a high ingress rating, a high impact rating and a wiring system that is protected
          against physical damage. Meeting one of the three and calling the position covered is how
          installations fail early.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 522.6.202 (cables in walls or partitions)"
        clause="A cable installed in a wall or partition shall comply with the requirements set out in Table 52.1: depth of cable from the surface (≤50 mm or ≥50 mm), wall construction (with or without metallic parts), prescribed zone or 30 mA RCD additional protection per 415.1.1, or compliance with Regulation 522.6.204 (additional mechanical protection). A prescribed zone is a zone within 150 mm from the top of the wall or partition or within 150 mm of an angle formed by two adjoining walls."
        meaning="This is the requirement that deals with what an IP rating cannot touch. A cable buried shallow in a wall is not at risk from dust or splashing — it is at risk from a nail. The answer is position within a prescribed zone plus additional protection, or mechanical protection, rather than any degree of ingress protection."
        cite="Source: BS 7671:2018+A4:2026 — Regulation 522.6.202 and Table 52.1."
      />

      <InlineCheck
        id="315e-3-2-check-3"
        question="A customer asks why the IP65 enclosure you fitted in their workshop still needs the cable to it run in conduit. What is the correct explanation?"
        options={[
          'The IP rating describes what gets into the enclosure. It says nothing about the cable outside it, where the risk is mechanical damage and penetration rather than dust or water.',
          'The IP rating only applies while the enclosure lid is closed, so the conduit maintains it when the lid is open.',
          'The conduit is required so that the enclosure rating can be increased from IP65 to IP67.',
          'The IP rating covers the cable as well, but only up to 1 m from the gland, so conduit is needed beyond that.',
        ]}
        correctIndex={0}
        explanation="Ingress protection is a property of the enclosure. The cable approaching it lives in a different risk world — impact, abrasion and penetration — and those are answered by containment, by position and by additional protection, not by the IP digits."
      />

      <SectionRule />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Treating IP44 as the outdoor rating"
        whatHappens={
          <>
            An IP44 accessory goes on a north-facing wall that takes the weather head on. Splash
            protection copes with the first few showers, then wind-driven rain finds the gasket
            line and water starts collecting in the base. Within a couple of winters the
            terminations are corroded, the residual current protection is tripping and nobody can
            work out why. The enclosure was doing exactly what it was rated to do — it was simply
            never rated for the exposure it was given.
          </>
        }
        doInstead={
          <>
            Treat IP44 as splash, not as outdoor. Direct exposure to rain wants IP55 or better, and
            anywhere subject to hosing or washdown wants IP65. Where the position is genuinely
            sheltered, say so on the record so the next person understands why the lower rating was
            acceptable there.
          </>
        }
      />

      <CommonMistake
        title="Reading the second digit as though the scale were a simple ladder"
        whatHappens={
          <>
            An enclosure carries an immersion rating, so it gets fitted in a washdown bay on the
            assumption that immersion must be harder than a jet. The cleaning lance goes over the
            seal at close range and drives water straight past it. Immersion and jets are different
            tests — one is about sustained pressure from depth, the other is about a concentrated
            stream — and passing one does not automatically mean passing the other.
          </>
        }
        doInstead={
          <>
            Match the digit to the actual exposure rather than assuming a higher number is always
            better. If the position is hosed, look for the jet ratings. If the position floods or
            the equipment sits under water, look for the immersion ratings. Where both happen,
            check the product literature for both figures rather than inferring one from the other.
          </>
        }
      />

      <Scenario
        title="Washdown bay at a food unit in Llanelli"
        situation={
          <>
            You are pricing a small fit-out at a chilled food unit on an industrial estate in
            Llanelli. One end of the room is a washdown bay: stainless walls, a floor gully and a
            hose reel on the wall. The specification you have been handed lists IP44 enclosures
            throughout the unit, and the dry storage end is genuinely dry. Two isolators and a
            local control station need to go on the wall inside the bay.
          </>
        }
        whatToDo={
          <>
            Split the room by exposure rather than accepting a single rating for the whole unit. In
            the dry storage end IP44 is defensible. Inside the washdown bay the equipment is going
            to meet a hose, so the water digit has to be at least 5 for jets, and the environment
            is dusty enough during stocking to justify a dust-tight first digit. IP65 is the
            sensible answer for the isolators and the control station. Raise it as a specification
            query in writing rather than quietly substituting, so the change is recorded and
            priced. Check the impact rating at the same time — a bay with trolleys in it is a
            foreseeable impact environment, and the IP figures say nothing about that.
          </>
        }
        whyItMatters={
          <>
            A single blanket rating across a building is a specification that has not looked at the
            building. The IP code is applied position by position, and the two ends of this unit
            are completely different environments. Fitting splash-rated equipment into a washdown
            bay is not a small compromise — it is the failure mode that brings you back inside a
            year, at your own cost, with a customer who has lost production.
          </>
        }
      />

      <SectionRule />

      <FAQ
        items={[
          {
            question: 'Does a higher IP number always mean a better enclosure for my job?',
            answer:
              'Not necessarily. The two digits describe two different properties, and the top of the water scale covers different tests rather than one continuous ladder — jets and immersion are not the same exposure. Select against what the position actually produces. Over-specifying also costs money and can make an enclosure harder to work in.',
          },
          {
            question: 'Why do the bathroom and pool requirements use IPX rather than two digits?',
            answer:
              'Because in those locations the concern is water. The X is a way of stating the water requirement without making a claim about solids. It does not mean the solids performance is zero — it means that property is not what the zone requirement is about.',
          },
          {
            question: 'What is the practical difference between IP4X and IPXXD?',
            answer:
              'Both are used to express the same practical outcome for containment covers: that a finger or a wire cannot reach a live conductor. One states it using the numeric solids digit at the fourth step, the other using the additional letter. For non-sheathed cables in trunking, either satisfies the requirement, provided the cover can only be removed with a tool or a deliberate action.',
          },
          {
            question: 'Where do I find the rating on a product on site?',
            answer:
              'It is marked on the product — moulded into the body, printed on a label or stated on the rating plate — and repeated in the manufacturer literature. Check it before installation. Where equipment is already installed, the marking is what an inspector will read when confirming that the selection suits the external influences at that position.',
          },
        ]}
      />

      <SectionRule />

      <KeyTakeaways
        points={[
          'IP is ingress protection. The first digit is solids and the second is water, and each is verified against a defined test so the marking means the same thing whoever made the product.',
          'Solids scale: 0 none, 1 over 50 mm, 2 over 12.5 mm, 3 over 2.5 mm, 4 over 1 mm, 5 dust-protected, 6 dust-tight.',
          'Water scale: 0 none, 1 vertical drips, 2 drips at 15 degrees, 3 spray, 4 splash, 5 jets, 6 powerful jets, 7 immersion to 1 m, 8 continuous immersion, 9 high pressure and steam.',
          'An X means that property is not being stated. IPX8 is a water-only claim; IP4X and IPXXD are access-only claims used where the risk is contact with a live conductor.',
          'Trunking containing non-sheathed cables must provide at least IPXXD or IP4X with a cover removable only by a tool or deliberate action, because singles carry only one layer of insulation.',
          'Common selections: IP20 indoor, IP44 splash, IP55 jets and most genuine outdoor work, IP65 dust-tight plus jets for harsh outdoor and washdown, IP67 immersion, IPX8 continuous immersion.',
          'Location minimums: bathroom Zone 0 IPX7, Zones 1 and 2 IPX4 rising to IPX5 with water jets; pool Zone 0 IPX8, Zone 1 IPX5 or IPX4, Zone 2 IPX2; construction sites typically IP44 rising to IP65 outdoor wet; agricultural premises IP65 in milking parlours, IP54 covered, IP44 dry stores.',
          'IP says nothing about impact. IK00 to IK10 covers that, with IK10 at 20 J, and penetration of cables in walls is answered by position, containment and additional protection instead.',
        ]}
      />

      <ContentEyebrow>Check yourself</ContentEyebrow>

      <Quiz questions={quizQuestions} title="Applying the IP code — knowledge check" />
    </div>
  );
}
