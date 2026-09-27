/**
 * Unit 303 · Criterion 4.2 — The types of asbestos
 *
 * Written to the criterion rather than ported: the lesson stays on the three
 * named types, how they differ, which materials each one ended up in, and why
 * an electrician on site treats all three the same way.
 *
 * Technical facts taken from the existing English teaching in
 *   level2/module1/section2/Sub6.tsx (the three types and their banning dates,
 *     typical ACM locations, visual identification is unreliable, licensed work)
 *   level3/module1/section4/Sub6.tsx (CAR 2012 Regs 4, 5, 8 and 10, survey and
 *     sampling methods, asbestos in electrical-trade equipment, disease list)
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
    question: 'What are the three main types of asbestos?',
    options: [
      'Chrysotile (white), amosite (brown) and crocidolite (blue).',
      'Friable, bonded and encapsulated — the three types are classified by fibre release.',
      'Insulation board, asbestos cement and textured coating — the three forms found in buildings.',
      'Tremolite, actinolite and anthophyllite — the three types used in UK construction.',
    ],
    correctAnswer: 0,
    explanation:
      'All three are hazardous. Crocidolite is considered the most carcinogenic. Most UK use was chrysotile in cement products and textured coatings, amosite in insulation board and pipe lagging, and crocidolite in some sprayed insulation. Friable and bonded describe the condition of a material, not the mineral in it.',
  },
  {
    id: 2,
    question: 'Which type was by far the most heavily used in the UK?',
    options: [
      'Chrysotile (white) — cement sheets, textured coatings, gaskets, vinyl floor tiles and some electrical insulation.',
      'Crocidolite (blue) — used across the whole of the building fabric until the late 1990s.',
      'Amosite (brown) — used for every category of asbestos product from the 1930s onwards.',
      'None of them dominated; the three were used in roughly equal quantities throughout.',
    ],
    correctAnswer: 0,
    explanation:
      'Chrysotile was the workhorse and the last to be banned. It turns up in cement sheets, textured coatings such as Artex, gaskets, brake linings, vinyl floor tiles and electrical insulation backing. Amosite is most commonly found in asbestos insulating board and pipe insulation. Crocidolite is the most dangerous fibre but was prohibited earliest.',
  },
  {
    id: 3,
    question: 'When was the use of asbestos in new UK building products finally banned?',
    options: [
      '1999 — chrysotile was the last type to go, and buildings put up or refurbished before 2000 are presumed to contain asbestos.',
      '1985 — the ban on amosite and crocidolite ended all building use at the same time.',
      '2012 — the Control of Asbestos Regulations banned both new use and continued presence.',
      '1970 — the first Asbestos Regulations ended the use of all types in construction.',
    ],
    correctAnswer: 0,
    explanation:
      'Crocidolite and amosite were prohibited in 1985. Chrysotile, the most common type, was not fully banned until 1999. The practical consequence is the pre-2000 rule: any building constructed or significantly refurbished before 2000 may contain asbestos-containing materials until a survey rules it out.',
  },
  {
    id: 4,
    question: 'Which material is most commonly associated with amosite?',
    options: [
      'Asbestos insulating board — panel ceilings, partition boards, soffits and fire-proofing around steel beams.',
      'Vinyl floor tiles and the black bitumen adhesive underneath them.',
      'Textured decorative coatings on domestic ceilings.',
      'Asbestos cement roofing sheets and downpipes.',
    ],
    correctAnswer: 0,
    explanation:
      'Amosite is the classic asbestos insulating board and pipe insulation fibre, typically in 1960s to 1980s commercial suspended ceilings. Insulating board can also be chrysotile. Floor tiles, textured coatings and cement products are chrysotile territory. Working on insulating board beyond very small quantities is licensed work.',
  },
  {
    id: 5,
    question: 'Can you identify the type of asbestos by looking at the material?',
    options: [
      'No. Fibres are usually bound into a matrix that disguises them, and only laboratory analysis of a properly taken sample is definitive.',
      'Yes, reliably — blue, brown and white fibres are visually distinct in every product.',
      'Yes, if you wet the surface first, which brings the fibre colour out clearly.',
      'Only for crocidolite; the other two cannot be told apart by any method.',
    ],
    correctAnswer: 0,
    explanation:
      'The colour names describe the raw mineral, not the finished product. Cement, board and coating all disguise the fibre, and the fibres themselves can look alike to the eye. Bulk samples are identified by polarised light microscopy in an accredited laboratory, which also distinguishes asbestos from non-asbestos minerals. An apprentice does not sample; an apprentice escalates.',
  },
  {
    id: 6,
    question:
      'You have a suspect material and no information about which type it is. What does CAR 2012 require?',
    options: [
      'Assume asbestos is present and that it is not chrysotile alone, and observe the applicable provisions of the Regulations.',
      'Assume it is chrysotile, since that was the most heavily used type in the UK.',
      'Assume it is not asbestos until a laboratory confirms otherwise.',
      'Assume nothing and carry on, provided respiratory protection is worn.',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 5 requires a suitable and sufficient assessment of whether asbestos is present, what type, in what material and in what condition. Where there is doubt, the employer must assume asbestos is present and that it is not chrysotile alone, and apply the full controls. That presumption is deliberately conservative — it removes the incentive to guess low.',
  },
  {
    id: 7,
    question: 'Which of these is the highest-risk group to disturb?',
    options: [
      'Sprayed coatings and pipe or boiler lagging — friable materials that release fibres readily.',
      'Asbestos cement downpipes and soffits, because they are outdoors and weathered.',
      'Vinyl floor tiles, because they are walked on every day.',
      'Window putty, because it sits at head height in occupied rooms.',
    ],
    correctAnswer: 0,
    explanation:
      'Friable means easily crumbled, and friable materials release fibres far more readily than bonded ones. Sprayed coatings and lagging sit at the top of that scale, which is why work on them is licensed work requiring an HSE-licensed contractor. Cement products are bonded and lower release, but still controlled work and still hazardous waste.',
  },
  {
    id: 8,
    question: 'Why does the type matter less than the response when you find suspect material?',
    options: [
      'Because the action is identical for all three types — stop, do not disturb, vacate and close off the area, and escalate before anything else happens.',
      'Because only crocidolite causes disease, so the other two can be worked around.',
      'Because the type determines who pays, and payment is a commercial matter rather than a safety one.',
      'Because the Regulations only apply once the type has been confirmed by a laboratory.',
    ],
    correctAnswer: 0,
    explanation:
      'All three types are hazardous and all three are covered by the same Regulations. You cannot tell them apart on site, you are not permitted to sample, and the procedure on discovery does not branch by mineral. Stop work, do not disturb it further, vacate and close off, document, and escalate to the dutyholder and the firm.',
  },
];

const faqs = [
  {
    question: 'If chrysotile is the least dangerous, can it be treated more casually?',
    answer:
      'No. All three types are hazardous and all three are covered by the same Regulations. Regulation 5 makes the point explicitly — where there is doubt about what is present, the employer must assume asbestos is present and that it is not chrysotile alone. The law deliberately closes the door on treating a material as lower risk because somebody has decided by eye that it is only white asbestos.',
  },
  {
    question: 'Why did the three types get banned at different times?',
    answer:
      'Crocidolite and amosite were prohibited in 1985, and chrysotile followed in 1999 as the last type in use. Crocidolite had already been largely phased out through the late 1970s as the most dangerous form. The Asbestos (Prohibition) Regulations of 1992 and 1999, and the 2003 amendment, closed the supply chain — but they only stopped new material going in. Everything installed before the bans is still in the buildings.',
  },
  {
    question: 'Does any of this turn up in the electrical equipment itself?',
    answer:
      'Yes, and it is easy to overlook because people look at the building and not at the kit. Older fuse boards can have asbestos insulating board backing or cement enclosures, older motor flange and terminal-box gaskets can be asbestos, some older circuit-breaker arc chutes used it, older transformer seals and bushings used it, and very old cables sometimes used asbestos braid as insulation reinforcement. Fire-stopping around cable penetrations in older buildings is another one.',
  },
  {
    question: 'How does the laboratory actually tell the types apart?',
    answer:
      'Bulk samples are examined by polarised light microscopy, which distinguishes the asbestos minerals from each other and from non-asbestos minerals. Airborne fibre counting uses phase-contrast microscopy, and scanning electron microscopy is used at very low concentrations or where the fibre needs positive identification. The laboratory work is accredited; the surveyor taking the sample is qualified and working for an accredited inspection body. None of that is a site job.',
  },
];

export default function Lesson303_4_2() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'Three main types: chrysotile (white), amosite (brown) and crocidolite (blue). All three are hazardous and all three are covered by the Control of Asbestos Regulations 2012.',
          'Crocidolite is considered the most carcinogenic and was largely phased out through the late 1970s. Crocidolite and amosite were both prohibited in 1985; chrysotile, the most heavily used, was not banned until 1999.',
          'The type broadly tracks the product. Chrysotile in cement products, textured coatings, floor tiles and gaskets; amosite in insulating board and pipe insulation; crocidolite in some sprayed insulation and lagging.',
          'Visual identification is unreliable — the fibres are bound into a matrix that disguises them. Only laboratory analysis of a properly taken sample identifies the type, and you do not take the sample.',
          'On site the type changes nothing about what you do. Stop, do not disturb, vacate and close off the area, document it, and escalate to the dutyholder and your firm.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Name the three main types of asbestos and state which is considered the most carcinogenic.',
          'State when each type was prohibited in the UK and explain why the pre-2000 presumption follows from those dates.',
          'Match each type to the materials it was typically used in, across building fabric and electrical equipment.',
          'Explain why the type of asbestos cannot be established by eye and what laboratory analysis is used instead.',
          'Justify why the response to suspect material on site is identical regardless of which type is present.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>One mineral family, three names</ContentEyebrow>

      <ConceptBlock
        title="Why there is more than one kind"
        plainEnglish="Asbestos is a naturally occurring silicate fibre that was used in UK building products for most of the twentieth century because it is cheap, fire-resistant, durable and a good electrical insulator. It was not a single product. Three mineral types dominated UK use, they behave a little differently, and they were banned at different times."
        onSite="The colour names — white, brown, blue — describe the raw mineral as it comes out of the ground. By the time it reaches a building it has been milled and bound into cement, board, coating or textile, and the colour tells you nothing useful. Treat the names as a way of understanding the history of a building, not as a field test."
      >
        <p>
          The reason it is still an electrician&rsquo;s problem is that the buildings are still
          standing. Asbestos in new building products was banned in 1999, so anything constructed
          or significantly refurbished before 2000 is presumed to contain asbestos-containing
          materials until a survey rules it out. Every pre-2000 commercial unit, school, office
          block and council estate falls inside that presumption.
        </p>
        <p>
          The fibres are what cause the harm. Inhaled, they lodge in lung tissue and in the pleural
          lining and cause disease decades later — mesothelioma, asbestos-related lung cancer,
          asbestosis, pleural plaques and diffuse pleural thickening. The latency is long enough
          that what a tradesperson breathes in during their twenties is what kills them in
          retirement.
        </p>
        <p>
          One more reason the type names matter at all: they appear on survey reports and in
          asbestos registers. A register entry saying amosite insulating board above the corridor
          ceiling, in poor condition, means something specific about how the material behaves and
          what category of contractor has to touch it. Being able to read that line without
          guessing is the working use of this knowledge.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>The three types, one at a time</ContentEyebrow>

      <ConceptBlock
        title="Crocidolite — blue"
        plainEnglish="The most dangerous of the three fibres and the one considered most carcinogenic. Prohibited in 1985, and already largely phased out through the late 1970s as the risk became understood."
        onSite="Where you meet it is industrial and institutional buildings from the 1950s to the 1970s — sprayed coatings and pipe lagging in particular. The visual cue people describe is a blue-grey fibrous appearance, often degraded, but the material is usually behind a casing or a coating and the colour is not visible at all."
      >
        <p>
          Crocidolite sits in the high-risk group not because it appears in more products but
          because of where it appears. Sprayed insulation and lagging are friable — they crumble
          readily, and a friable material releases fibres far more easily than a bonded one. That
          combination of the most hazardous fibre in the most readily released form is why work on
          sprayed coatings and lagging is licensed work.
        </p>
        <p>
          The 1985 prohibition is worth holding onto as a date, because it changes how you read a
          building. A structure put up in the 1960s carries a realistic crocidolite risk in its
          insulation; one fitted out in the early 1990s does not, although it may well contain
          chrysotile in its cement, coatings and floor finishes. Neither observation lets you skip
          the register — it just tells you which materials to look hardest at when you read it.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="Amosite — brown"
        plainEnglish="Prohibited in 1985 alongside crocidolite. The workhorse fibre for asbestos insulating board — the panel ceilings, partition boards, soffits and fire-proofing around steel beams — and for pipe and boiler insulation."
        onSite="The classic amosite location for an electrician is a 1960s to 1980s commercial suspended ceiling. You drill through those tiles to fix luminaires, fire-alarm sounders, detectors and emergency lighting, which is exactly the activity that disturbs them. Work on insulating board beyond a very small quantity is licensed work."
      >
        <p>
          Insulating board is not always amosite — it can be chrysotile, or a mixture. That is part
          of why guessing the type from the product is unsafe in both directions. What you can rely
          on is the category: insulating board is a higher-risk material whatever fibre it turns
          out to contain, and it is not something a general electrical contractor works on.
        </p>
        <p>
          Insulating board also sits in more places than the ceiling grid people picture. It was
          used as partition board, as soffit material, and as fire-proofing packed around
          structural steel. On a refurbishment the steelwork casing above a corridor ceiling is a
          standard find, and it is often in worse condition than the tiles below it because nobody
          has looked at it since the building went up.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="Chrysotile — white"
        plainEnglish="By far the most heavily used type in the UK and the last one to be banned, in 1999. It appears in cement sheets, textured decorative coatings such as Artex, gaskets, vinyl floor tiles, brake linings and some electrical insulation."
        onSite="Chrysotile is the one you are statistically most likely to meet, because it is in the ordinary fabric rather than the specialist insulation. Drilling a pre-2000 textured ceiling for a ceiling rose, lifting a commercial corridor floor tile, or unscrewing a cement soffit are all chrysotile-risk activities and none of them feel like asbestos work at the time."
      >
        <p>
          Chrysotile products tend to be bonded rather than friable, which means lower fibre
          release than sprayed coating or lagging. Lower is not low. Drilling, sanding, cutting or
          breaking a bonded product releases fibres, and a small fragment of asbestos cement is
          still hazardous waste that cannot go in the general skip.
        </p>
        <p>
          The 1999 date is the one to remember, because it is what sets the pre-2000 rule. The
          Asbestos (Prohibition) Regulations of 1992 and 1999, with the 2003 amendment, closed the
          supply chain — but the material already installed stays where it is and keeps being
          discovered during refurbishment and demolition.
        </p>
        <p>Chrysotile products an electrician is likely to meet in a single week:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Textured decorative ceilings.</strong> Pre-2000 housing, usually low content,
            disturbed by drilling for a rose or a detector.
          </li>
          <li>
            <strong>Cement flue pipes and soffits.</strong> Old boiler flues running through
            ceiling voids, and soffit boards on pre-2000 houses.
          </li>
          <li>
            <strong>Vinyl floor tiles and the black adhesive under them.</strong> Commercial
            corridors, lifted to run a floor box or a new containment route.
          </li>
          <li>
            <strong>Gaskets.</strong> Woven or compressed, in older switchgear, motor flanges and
            pump glands.
          </li>
          <li>
            <strong>Insulation backing behind old panels.</strong> Board or sheet behind fuse
            boards and switch panels in older commercial and industrial installations.
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id="303-4-2-check-1"
        question="A contractor tells you the ceiling void in a 1970s office is 'only white asbestos, so it is fine to run cable through'. What is wrong with that statement?"
        options={[
          'Nothing — chrysotile was legal until 1999, so a 1970s installation containing it is compliant and can be worked around.',
          'Two things: nobody can identify the type by eye, and all three types are hazardous and covered by the same Regulations, so the material is not fine to disturb either way.',
          'Only the date — chrysotile was banned in 1985, so a 1970s building could not contain it.',
          'Only the colour — white asbestos is actually the most dangerous of the three types.',
        ]}
        correctIndex={1}
        explanation="Two separate errors are packed into that sentence. Identification by eye is unreliable because the fibres are bound into a matrix, so the claim that it is chrysotile is not evidence of anything without a laboratory result. And even a confirmed chrysotile result would not make the material safe to disturb — Regulation 5 requires that where there is doubt you assume asbestos is present and that it is not chrysotile alone."
      />

      <RegsCallout
        source="Control of Asbestos Regulations 2012 — Regulation 5"
        clause="An employer must not undertake work in demolition, maintenance, or any other work which exposes or is liable to expose employees of that employer to asbestos in respect of any premises unless either the employer has carried out a suitable and sufficient assessment as to whether asbestos, what type of asbestos, contained in what material and in what condition is present or is liable to be present in those premises; or, if there is doubt as to whether asbestos is present in those premises, the employer assumes that asbestos is present, and that it is not chrysotile alone, and observes the applicable provisions of these Regulations."
        meaning="Regulation 5 is where the type question actually lands in law. The assessment has to establish what type, in what material, in what condition. Where there is doubt, the employer must assume the worst case — asbestos present, and not chrysotile alone — and apply the full controls. That is the legal basis for treating any suspect material in a pre-2000 building as asbestos until it is proved otherwise."
        cite="Source: Control of Asbestos Regulations 2012 (SI 2012/632), Reg 5."
      />

      <SectionRule />

      <ContentEyebrow>Where each one turns up</ContentEyebrow>

      <ConceptBlock
        title="The building fabric an electrician actually disturbs"
        plainEnglish="Electricians go where other trades do not — ceiling voids, behind consumer units, under floors, in plant rooms, behind soffits, in the bottom of switchgear cubicles. The dust that has sat undisturbed for forty years is the dust the drill throws into the air."
        onSite="Match the material to the likely fibre so you can read a building quickly, then stop relying on it. The register is what tells you; the product knowledge is what tells you which parts of the register to check hardest before the job starts."
      >
        <p>Common asbestos-containing materials and the type usually associated with them:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Asbestos insulating board.</strong> Amosite or chrysotile. Panel and suspended
            ceilings, partition boards, soffits, fire-proofing around steel beams. Licensed work.
          </li>
          <li>
            <strong>Pipe and boiler lagging.</strong> Amosite or crocidolite. Plant rooms, boiler
            houses, service ducts, under stairwells. Friable and high risk. Licensed work.
          </li>
          <li>
            <strong>Sprayed coatings.</strong> Friable, often around steel beams and on the
            underside of metal-deck ceilings in industrial buildings. The most dangerous form to
            disturb. Licensed work.
          </li>
          <li>
            <strong>Textured coatings.</strong> Chrysotile, often low content. Decorative ceilings
            in pre-2000 housing. Drilling, sanding or cutting releases fibres.
          </li>
          <li>
            <strong>Asbestos cement.</strong> Chrysotile-bonded. Roofing sheets, soffits,
            downpipes, flue pipes from old boilers, loft water tanks. Lower release than friable
            forms but still controlled work.
          </li>
          <li>
            <strong>Floor tiles and adhesive.</strong> Chrysotile. Vinyl and thermoplastic tiles,
            and the black bitumen adhesive underneath, common in commercial corridors.
          </li>
          <li>
            <strong>Gaskets and seals.</strong> Often chrysotile, woven or compressed. Mechanical
            and electrical equipment from before the bans.
          </li>
          <li>
            <strong>Window putty and mastics.</strong> Older formulations, easy to miss because
            nobody thinks of putty as an asbestos product.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Asbestos inside the electrical kit itself"
        plainEnglish="Beyond the building fabric, electrical equipment from the asbestos era can contain asbestos in its own construction. The equipment is the thing you are paid to open, which makes this the risk most specific to the trade."
        onSite="When working on pre-2000 electrical equipment, treat the equipment as suspect, not just the wall it is fixed to. Replacing an old fuse board can disturb insulating board backing. Breaking a motor terminal-box gasket during a termination can release fibres. Brief whoever is working with you before the covers come off."
      >
        <p>Equipment-specific risk areas:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Older fuse boards.</strong> Insulating board backing or cement enclosures,
            particularly in industrial and commercial installations from before the mid-1980s. The
            panel you have spent twenty minutes unscrewing may be the asbestos-containing material.
          </li>
          <li>
            <strong>Motor gaskets.</strong> Flange and terminal-box gaskets on older machines.
          </li>
          <li>
            <strong>Switchgear arc chutes.</strong> Some older moulded-case and air circuit-breaker
            designs.
          </li>
          <li>
            <strong>Transformer seals.</strong> Older gaskets and bushings.
          </li>
          <li>
            <strong>Cable insulation.</strong> Very old cables, from before the 1960s, sometimes
            used asbestos braid as insulation reinforcement. Most has gone in later rewires but it
            still surfaces in old industrial buildings and heritage properties.
          </li>
          <li>
            <strong>Bath panels, cisterns and similar fittings.</strong> Not electrical work, but
            routinely in the same rooms and voids you are running cable through.
          </li>
          <li>
            <strong>Penetrations and heat shields.</strong> Original asbestos lining around cable
            runs through fire-rated walls, and heat-resistant barriers around equipment.
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id="303-4-2-check-2"
        question="You are stripping out a pre-1985 industrial distribution board. The board is screwed to a grey panel behind it that you cannot identify. Which risk are you most likely to be underestimating?"
        options={[
          'That the screws are seized and the board will need cutting free, spreading metal swarf.',
          'That the panel is load-bearing and the wall will need making good afterwards.',
          'That the supply cannot be proved dead because the board pre-dates modern isolation practice.',
          'That the backing panel itself may be asbestos insulating board, so removing the board disturbs an asbestos-containing material rather than just a fixing.',
        ]}
        correctIndex={3}
        explanation="Older fuse boards and distribution boards were routinely mounted on asbestos insulating board backing or housed in cement enclosures. The trap is that the attention is on the board while the asbestos-containing material is the thing behind it. Insulating board is a licensed-work material beyond very small quantities, so this stops being an electrical job the moment that panel is suspect."
      />

      <SectionRule />

      <ContentEyebrow>Why you cannot tell by looking</ContentEyebrow>

      <ConceptBlock
        title="Identification is a laboratory job, not a site judgement"
        plainEnglish="Fibres of the three types can look alike to the eye, and in a finished product they are usually bound into cement, board or coating that disguises them entirely. Colour names describe the raw mineral, not the product on the wall."
        onSite="There are visual clues — insulating board tiles often have a fibrous, slightly chalky face; pipe lagging in an old boiler room is a classic; textured coatings on a pre-2000 ceiling are a standard suspect. Clues are for deciding to stop, not for deciding to carry on. If the building is pre-2000 and you do not have a clean survey covering the area, the material is suspect."
      >
        <p>How identification is actually done:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Bulk sample analysis.</strong> Polarised light microscopy identifies the
            asbestos minerals and distinguishes them from non-asbestos minerals.
          </li>
          <li>
            <strong>Airborne fibre counting.</strong> Phase-contrast microscopy is the routine
            method for measuring fibres in air.
          </li>
          <li>
            <strong>Low concentrations and positive identification.</strong> Scanning electron
            microscopy where the fibre needs identifying or the concentration is very low.
          </li>
          <li>
            <strong>Who does it.</strong> Accredited laboratories, with samples taken by qualified
            surveyors working for accredited inspection bodies. Not the contractor on site.
          </li>
        </ul>
        <p>
          That is why the instruction to an apprentice is so blunt: you do not sample. Taking a
          sample is disturbance, it needs the right method and containment, and an informal
          sample taken badly creates the exposure it was meant to investigate.
        </p>
        <p>
          The same logic applies to lifting a tile to look at the back of it. Inspection is
          disturbance. The point of the survey and the register is that a competent surveyor has
          already done the inspection with the right method and the right containment, so nobody
          has to improvise one on a Tuesday afternoon with a screwdriver.
        </p>
        <p>
          It also explains why survey type matters when you ask for the paperwork. A management
          survey assesses the materials in normal use of the building and feeds the register. A
          refurbishment survey is intrusive and pre-disturbance, and it is the one that covers the
          void, wall or ceiling you are about to open. A demolition survey is the most
          comprehensive of the three. Asking for the register is the first move; asking whether
          the survey behind it covers the area you are about to disturb is the second.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="Control of Asbestos Regulations 2012 — Regulation 4"
        clause="In order to manage the risk from asbestos in non-domestic premises, the dutyholder must ensure that a suitable and sufficient assessment is carried out as to whether asbestos is or is liable to be present in the premises; and in making the assessment, the dutyholder must ensure that suitable inspections are made of those parts of the premises which are reasonably accessible."
        meaning="The duty to manage. The dutyholder is the person in control of the premises — typically the owner, landlord or managing agent. They have to determine whether asbestos is present, record its location, condition and type in the asbestos register, and make that information available to anyone whose work could disturb it. Asking for the register before work starts is a legal entitlement, not a favour."
        cite="Source: Control of Asbestos Regulations 2012 (SI 2012/632), Reg 4."
      />

      <RegsCallout
        source="Control of Asbestos Regulations 2012 — Regulation 8(1)"
        clause="Subject to regulation 3(2), an employer must ensure that any work with asbestos undertaken by the employer's employees is carried out in accordance with a licence granted by the Executive under regulation 3(1) of the Asbestos (Licensing) Regulations 1983 unless the work is exempted from the requirement for a licence by regulation 3(2)."
        meaning="Licensed work needs an HSE licence, full stop. The high-risk activities — most disturbance of friable insulation, sprayed coatings, and insulating board beyond very small quantities — sit inside it whichever of the three fibre types the material turns out to contain. The exemptions create the notifiable non-licensed and non-licensed categories for lower-risk activity. Categorising the work is technical; the safe default for an electrical contractor is to escalate to a specialist rather than decide it on site."
        cite="Source: Control of Asbestos Regulations 2012 (SI 2012/632), Reg 8."
      />

      <SectionRule />

      <ContentEyebrow>Type versus response</ContentEyebrow>

      <ConceptBlock
        title="Three types, one procedure"
        plainEnglish="Knowing the types is knowledge for reading a building and for understanding a survey report. It is not a decision tool on site, because the action when you find suspect material does not change with the mineral."
        onSite="Stop work. Do not disturb it any further — no touching, no tools, no moving the material. Vacate the immediate area and close it off. Document what you found and where, from a safe distance. Phone the firm. Inform the dutyholder and the principal contractor where one is appointed. Do not restart in the affected area until the material is confirmed non-asbestos or a licensed contractor has taken over."
      >
        <p>
          The categorisation that does change the route is licensed against non-licensed, and that
          turns mostly on the material and its friability rather than on the fibre type. Sprayed
          coatings, lagging and insulating board beyond very small quantities are licensed work
          requiring an HSE-licensed contractor. Some lower-risk work by trained operatives sits in
          the notifiable non-licensed or non-licensed categories. None of that is an apprentice
          judgement and none of it is an apprentice job.
        </p>
        <p>
          The other thing that does not change with the type is the waste route. Asbestos waste of
          any type is hazardous waste — double-bagged, labelled, consignment note, licensed carrier,
          permitted facility. A small fragment of bonded cement is not an exception to that.
        </p>
        <p>The discovery procedure, in the order it happens:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Stop.</strong> Tools down, hands off the material, and no attempt to finish the
            fixing you were part way through.
          </li>
          <li>
            <strong>Prevent further disturbance.</strong> No touching, no moving the material, no
            sweeping and no vacuuming — domestic cleaning equipment disperses fibres rather than
            capturing them.
          </li>
          <li>
            <strong>Vacate and close off.</strong> Get people out of the immediate area and shut
            the door, or tape and sign the area where there is no door.
          </li>
          <li>
            <strong>Document.</strong> Photograph from a safe distance; note the location, the
            apparent material, its condition, the surrounding materials and what you were doing.
          </li>
          <li>
            <strong>Escalate.</strong> Phone the firm, inform the dutyholder, and inform the
            principal contractor where one is appointed so it cascades through the project.
          </li>
          <li>
            <strong>Update and record.</strong> Revise the risk assessment to reflect the
            discovery, and record any potential exposure of your own on your personal file.
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id="303-4-2-check-3"
        question="You uncover a suspect material mid-job and your supervisor asks over the phone which type it is so they know how urgent it is. What is the right answer to give?"
        options={[
          'That you cannot tell, that identification needs a laboratory, and that the response is the same in the meantime — the area is closed off and nothing restarts until it is confirmed or a licensed contractor takes over.',
          'Your best guess based on the colour, so the supervisor can decide whether to keep the rest of the team working.',
          'That it is chrysotile, because chrysotile was the most common type in UK buildings.',
          'That it does not matter because the dutyholder is responsible, so the job can carry on regardless.',
        ]}
        correctIndex={0}
        explanation="Speculating on the type invites a decision that should not be made on speculation. You cannot identify it, you are not permitted to sample it, and the discovery procedure does not branch by mineral. Describe the location, the material, the condition and what you were doing when you found it — that is what the surveyor and the dutyholder need. The type comes back from the laboratory."
      />

      <SectionRule />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Ranking the types and treating the bottom one as safe"
        whatHappens={
          <>
            An operative learns that crocidolite is the most carcinogenic and chrysotile the most
            common, and quietly turns that into a risk ladder — blue is serious, white is
            paperwork. On a pre-2000 refurbishment they drill a textured ceiling for a ceiling rose
            without checking anything, on the basis that textured coating is only chrysotile and
            the content is low. Dust goes into an occupied room. The exposure is recorded, the
            assessment and prevention duties under the Regulations were not met, and the operative
            is now on the wrong end of both a health record and an investigation.
          </>
        }
        doInstead={
          <>
            Treat the three types as three names for the same problem. All of them are hazardous,
            all of them are covered by the same Regulations, and Regulation 5 requires that where
            there is doubt you assume asbestos is present and that it is not chrysotile alone. Low
            content is not no content, and a bonded product still releases fibres when it is
            drilled. Pre-2000 textured coating is suspect until a survey rules it out.
          </>
        }
      />

      <CommonMistake
        title="Reading the building and forgetting the equipment"
        whatHappens={
          <>
            A team checks the asbestos register before starting a switchroom refurbishment. The
            register covers the fabric — ceilings, lagging, floor finishes — and shows the
            switchroom clear. They strip out a pre-1985 distribution board, break the gasket on an
            adjacent motor terminal box, and bin the offcuts. Nobody considered that the equipment
            itself, rather than the room, was the asbestos-containing item, and the waste went out
            through the general skip.
          </>
        }
        doInstead={
          <>
            When the equipment pre-dates the bans, treat the equipment as suspect as well as the
            building. Fuse board backings, motor and flange gaskets, arc chutes, transformer seals,
            old cable braid and fire-stopping around penetrations are all documented risk areas.
            Ask whether the register covers plant and equipment or only fabric — they are often not
            the same thing — and raise the gap before the covers come off.
          </>
        }
      />

      <Scenario
        title="Suspect lagging behind a plant room panel in Aberystwyth"
        situation={
          <>
            You are installing a new supply to a replacement pump in the plant room of a 1970s
            civic building in Aberystwyth. The asbestos register covers the ceiling voids in the
            offices but says nothing about the plant room. Lifting an access panel to run the cable
            you find old pipework wrapped in a moulded insulation that is cracked at one end, with
            a small amount of debris on the floor of the void. You have already put a hand on the
            panel and moved it.
          </>
        }
        whatToDo={
          <>
            Stop. Put the panel down where it is rather than carrying it anywhere. Move yourself
            and anyone else out of the immediate area and close the plant room door. Do not sweep
            up the debris, do not hoover it, do not bag the panel and do not take a sample.
            Photograph what you can see from a safe distance and note the location, the apparent
            material, its condition and the fact that the panel was moved. Phone your firm&rsquo;s
            health and safety or contracts manager and say plainly that you have found suspect
            lagging and have stopped. Inform the building&rsquo;s dutyholder and ask for the
            register for the plant room specifically — a register that covers offices only is not
            a register that covers this area, and the gap is theirs to close. Record your own
            potential exposure on your personal file. Nothing restarts in that room until the
            material is confirmed non-asbestos or a licensed contractor has dealt with it.
          </>
        }
        whyItMatters={
          <>
            Pipe lagging is the classic amosite or crocidolite material and it is friable, which
            makes it one of the highest-release forms there is. That combination is exactly why
            disturbing lagging is licensed work and why a general electrical contractor cannot
            lawfully deal with it, whatever training the firm holds. The register gap is also the
            point: a management survey assesses normal use of a building, not what happens when
            somebody opens the fabric, and a refurbishment survey is what covers the area you are
            about to disturb. Stopping early turns an incident into a planning problem.
          </>
        }
      />

      <SectionRule />

      <FAQ items={faqs} />

      <SectionRule />

      <KeyTakeaways
        points={[
          'The three main types are chrysotile (white), amosite (brown) and crocidolite (blue). All are hazardous and all are covered by the Control of Asbestos Regulations 2012.',
          'Crocidolite is considered the most carcinogenic and was largely phased out through the late 1970s; crocidolite and amosite were prohibited in 1985.',
          'Chrysotile was by far the most heavily used in the UK and was the last to be banned, in 1999 — which is where the pre-2000 presumption comes from.',
          'Type broadly tracks product: chrysotile in cement, textured coatings, floor tiles and gaskets; amosite in insulating board and pipe insulation; crocidolite in some sprayed insulation and lagging.',
          'Friability matters more than colour on site. Sprayed coatings, lagging and insulating board beyond small quantities are licensed work; bonded cement products are lower release but still controlled.',
          'Electrical equipment from before the bans can contain asbestos in its own construction — fuse board backings, gaskets, arc chutes, transformer seals, old cable braid and fire-stopping.',
          'You cannot identify the type by eye. Bulk samples go to an accredited laboratory for polarised light microscopy; airborne fibres are counted by phase-contrast microscopy. You do not sample.',
          'The response does not branch by type: stop, do not disturb, vacate and close off, document, escalate to the dutyholder and the firm, and do not restart until it is confirmed or handed to a licensed contractor.',
        ]}
      />

      <ContentEyebrow>Check yourself</ContentEyebrow>

      <Quiz questions={quizQuestions} title="The types of asbestos — knowledge check" />
    </div>
  );
}
