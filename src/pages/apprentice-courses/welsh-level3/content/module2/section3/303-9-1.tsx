/**
 * Unit 303 · Criterion 9.1 — Commonly encountered substances
 *
 * Written to the criterion rather than ported: the lesson works through the
 * hazardous substances an electrician actually handles, how each one gets into
 * a person, what the safety data sheet tells you about it, and the order the
 * controls have to be applied in. Asbestos is covered in its own lesson and is
 * deliberately not repeated here.
 *
 * Technical facts taken from the existing English teaching in
 *   level2/module5/section3/Sub3.tsx (COSHH 2002 Regs 6, 7 and 11, the 16-section
 *     safety data sheet under CLP, GHS pictograms, workplace exposure limits,
 *     the trade chemical inventory)
 *   level3/module1/section1/Sub4.tsx (COSHH hierarchy of control, the substances
 *     that catch electricians, the published exposure limits in EH40)
 *   level3/module1/section4/Sub6.tsx (COSHH framework duties and the wider
 *     hazardous-substance and waste picture)
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
    question: 'What does COSHH 2002 cover?',
    options: [
      'Assessing the risk from hazardous substances, then preventing or controlling exposure through the hierarchy of control, with monitoring, health surveillance and training.',
      'Only the correct labelling and safe storage of hazardous substances on site.',
      'Only the provision of respiratory protective equipment to anyone working with dust, fumes or chemicals.',
      'Only the management of asbestos in non-domestic premises.',
    ],
    correctAnswer: 0,
    explanation:
      'The Control of Substances Hazardous to Health Regulations 2002 run from assessment under Reg 6, through prevention or control under Reg 7, use and maintenance of the controls under Regs 8 and 9, monitoring under Reg 10, health surveillance under Reg 11, information and training under Reg 12, and emergency arrangements under Reg 13. It covers chemicals, fumes, dusts, mists, vapours, gases and biological agents.',
  },
  {
    id: 2,
    question: 'Which substances are outside COSHH because they have their own regulations?',
    options: [
      'Asbestos, lead and ionising radiation.',
      'Solvents, resins and acids, because they are covered by product standards instead.',
      'Anything supplied with a safety data sheet, since the data sheet replaces the assessment.',
      'Dusts and fumes, because they are generated on site rather than supplied in a container.',
    ],
    correctAnswer: 0,
    explanation:
      'Substances with a dedicated regime sit outside COSHH and are covered separately — asbestos by the Control of Asbestos Regulations 2012, lead by the Control of Lead at Work Regulations 2002, and ionising radiation by its own regime. Everything else hazardous that you meet at work is COSHH territory, whether it came out of a tin or out of a wall.',
  },
  {
    id: 3,
    question: 'What is an SDS and what sets its format?',
    options: [
      'A Safety Data Sheet — a 16-section document whose format is fixed by the CLP Regulation, retained as UK law, giving the hazard, handling, exposure and first-aid information for the product.',
      'A Site Dust Survey — a record of airborne dust readings taken by the contractor each day.',
      'A Supplier Declaration Sheet — a statement that the product meets its British Standard.',
      'A Safe Disposal Statement — a waste document accompanying hazardous waste to the tip.',
    ],
    correctAnswer: 0,
    explanation:
      'The Safety Data Sheet is the manufacturer authoritative source for the COSHH assessment. The 16 sections are always in the same order, for every product and every manufacturer, which is what lets you navigate an unfamiliar sheet in seconds. COSHH requires the information to be available to anyone handling the substance.',
  },
  {
    id: 4,
    question: 'Which SDS section gives the immediate first-aid response?',
    options: [
      'Section 4 — First aid measures, with separate responses for inhalation, skin contact, eye contact and ingestion.',
      'Section 8 — Exposure controls and personal protection.',
      'Section 13 — Disposal considerations.',
      'Section 16 — Other information, including the revision history.',
    ],
    correctAnswer: 0,
    explanation:
      'Section 4 sits near the front of the sheet deliberately, because exposure incidents are time-sensitive. For a corrosive substance it typically reads irrigate with copious running water for at least 15 minutes, remove contaminated clothing, and seek medical advice if irritation persists. Section 2 gives the hazards, Section 8 the PPE and exposure controls, and Section 13 the disposal route.',
  },
  {
    id: 5,
    question: 'What is the order of control under the COSHH hierarchy?',
    options: [
      'Eliminate, substitute, engineering controls, administrative controls, and personal protective equipment last.',
      'Personal protective equipment first, then engineering controls if the PPE proves inadequate.',
      'Monitoring first, then health surveillance, then whichever control the monitoring suggests.',
      'Administrative controls only — limiting time and rotating operatives is the whole of the hierarchy.',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 7 requires exposure to be prevented where reasonably practicable and adequately controlled where it is not. PPE comes last because it only protects the wearer, it can fail in use, and it depends on being worn correctly every time. Mask-only working on a routine dust-generating task rarely satisfies the regulation where engineering controls were available.',
  },
  {
    id: 6,
    question: 'What does a workplace exposure limit express?',
    options: [
      'The maximum concentration of an airborne substance an operative may be exposed to over a defined reference period, published by the HSE in EH40.',
      'The maximum quantity of a substance that may be stored on a site at any one time.',
      'The concentration below which a substance is proved to be harmless.',
      'The maximum number of operatives who may work with a substance at the same time.',
    ],
    correctAnswer: 0,
    explanation:
      'Limits are quoted over two reference periods — an 8-hour time-weighted average for long-term exposure and a 15-minute short-term exposure limit for acute peaks. The limit is a legal ceiling, not a target. Not every substance has one, and a substance without a published limit still has to be adequately controlled under Reg 7.',
  },
  {
    id: 7,
    question:
      'A safety data sheet flags respiratory sensitisation in Section 11. What does that mean for the operative?',
    options: [
      'Repeated exposure can sensitise a person even without one large dose, after which tiny future exposures can trigger a response — so controls tighten and health surveillance may be required.',
      'It means the substance smells strong but has no lasting effect on the airway.',
      'It means only operatives with existing asthma need to take precautions.',
      'It means the product may only be used outdoors, with no other controls required.',
    ],
    correctAnswer: 0,
    explanation:
      'Sensitisation is a serious occupational health hazard because it is not reversible. Two-pack isocyanate-containing products and rosin-based solder fluxes are the textbook trade examples. Where exposure is regular, COSHH Reg 11 requires health surveillance — typically lung-function testing and periodic review.',
  },
  {
    id: 8,
    question: 'Where should you look for the safety data sheet for a product on the van?',
    options: [
      'The manufacturer website, the firm COSHH register, and the packaging insert supplied with the product.',
      'A screenshot in the site WhatsApp group, which is the quickest route and always current.',
      'The wholesaler catalogue, which reproduces the hazard information for every line it stocks.',
      'The risk assessment, which replaces the data sheet once the job has been assessed.',
    ],
    correctAnswer: 0,
    explanation:
      'The sheet is a controlled document that the manufacturer updates when a classification changes. The website always has the latest version, and many manufacturers print a code on the container that links straight to it. The firm register holds current sheets for everything regularly carried. The packaging insert reflects the version at the time of purchase and may be out of date.',
  },
];

const faqs = [
  {
    question: 'Do I really need the data sheet for something as harmless as cable lubricant?',
    answer:
      'Yes. Cable lubricant looks like soap but the sheet will still tell you about skin sensitisation potential, eye irritation, disposal restrictions for contaminated rags and the recommended gloves. Many lubricants are surfactant or wax based and cause skin problems with prolonged contact. The Reg 6 assessment duty applies to every hazardous substance, not only the obviously dangerous ones, and a two-minute read at the start of a project covers it.',
  },
  {
    question: 'What is the difference between a hazard and a risk in COSHH terms?',
    answer:
      'A hazard is the intrinsic ability of the substance to cause harm — brick acid is corrosive whether anybody touches it or not. A risk is the likelihood that the hazard actually causes harm in the way you are using it. A sealed bottle on a rack is a low risk; the same bottle being decanted without gloves is a high one. The assessment evaluates the risk in the real use context, not just the hazard printed on the label.',
  },
  {
    question: 'How do I know whether health surveillance applies to me?',
    answer:
      'The data sheet flags sensitisation, carcinogenicity and chronic-toxicity hazards in Sections 2 and 11. If your work involves regular exposure to a substance carrying those flags, the firm should have surveillance arranged — typically lung-function testing, skin checks and periodic occupational health review. Two-pack products containing isocyanates and respirable crystalline silica from masonry chasing are the common trade triggers. If you are regularly exposed and nothing is in place, raise it.',
  },
  {
    question: 'How does the data sheet relate to the risk assessment and method statement?',
    answer:
      'They are three links in one chain. The COSHH register is the firm list of substances in use with a sheet attached to each. The data sheet is the manufacturer technical authority on any one substance. The COSHH assessment applies that to the actual use. The RAMS then turns it into site-specific instructions, with the Section 8 controls baked into the method. A RAMS for a job involving solvents or acids that references no data sheet is a sign the assessment is not suitable and sufficient.',
  },
];

export default function Lesson303_9_1() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'COSHH 2002 is the framework for hazardous substances at work — chemicals, fumes, dusts, mists, vapours, gases and biological agents. Asbestos, lead and ionising radiation sit outside it with their own regulations.',
          'The substances that catch electricians are respirable crystalline silica from chasing and drilling, wood and board dust, solder fume and flux, cleaning solvents, two-pack resins, brick acid, cable lubricant, masonry sealant, battery electrolyte and refrigerants.',
          'They get in four ways — inhalation, skin contact, eye contact and ingestion. Which route dominates decides which control actually protects you.',
          'The safety data sheet is the manufacturer authoritative information, in 16 fixed sections under the CLP Regulation. Know Section 2 hazards, Section 4 first aid, Section 8 exposure controls and PPE, Section 13 disposal.',
          'The control order is fixed by Reg 7: eliminate, substitute, engineering controls, administrative controls, and PPE last. Reaching for a mask first inverts the hierarchy and rarely satisfies the regulation.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'State what COSHH 2002 covers and identify the substances that fall outside it because they have their own regulations.',
          'Identify the hazardous substances an electrician commonly encounters across dusts, fumes, solvents, resins, oils, corrosives and lead.',
          'Explain the four routes by which a hazardous substance enters the body and match each substance to its dominant route.',
          'Navigate a 16-section safety data sheet and extract the hazards, first-aid response, exposure controls and disposal route.',
          'Apply the Reg 7 hierarchy of control in the correct order to a real task, and explain why respiratory protection is the last line rather than the first.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>What COSHH covers, and how it gets in</ContentEyebrow>

      <ConceptBlock
        title="The framework — and where it stops"
        plainEnglish="The Control of Substances Hazardous to Health Regulations 2002 are the general framework for workplace exposure to hazardous substances. Chemicals, fumes, dusts, mists, vapours, gases and biological agents all sit inside it. Substances with a dedicated regime — asbestos, lead, ionising radiation — sit outside and are covered by their own regulations."
        onSite="Two things follow from that. The first is that COSHH applies far more often than apprentices expect, because a hazardous substance does not have to come out of a tin — most of what harms an electrician is generated by the work itself. The second is that finding a substance outside COSHH does not mean it is unregulated; it means the rules are somewhere else and usually stricter."
      >
        <p>The duties the framework imposes, in order:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Reg 6 — assessment.</strong> A suitable and sufficient assessment of the risk,
            made before the work exposes anyone. Identify the substances, the routes of exposure,
            who is exposed, and the controls needed.
          </li>
          <li>
            <strong>Reg 7 — prevention or control.</strong> Prevent exposure where reasonably
            practicable; adequately control it where prevention is not.
          </li>
          <li>
            <strong>Regs 8 and 9 — using and maintaining the controls.</strong> The controls
            provided are actually used, and extraction and respiratory equipment is maintained,
            examined and tested.
          </li>
          <li>
            <strong>Reg 10 — monitoring.</strong> Airborne concentration monitoring where
            appropriate.
          </li>
          <li>
            <strong>Reg 11 — health surveillance.</strong> Where exposure creates an identifiable
            disease and there is a valid technique for detecting it.
          </li>
          <li>
            <strong>Reg 12 — information, instruction and training.</strong> The people doing the
            work know the hazards and the controls.
          </li>
          <li>
            <strong>Reg 13 — emergencies.</strong> Arrangements for accidents, incidents and
            spills.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Four ways in"
        plainEnglish="A substance harms you by getting into you. There are four routes — inhalation, skin contact, eye contact and ingestion — and the safety data sheet gives a separate first-aid response for each because they are genuinely different problems."
        onSite="Work out which route dominates for the task in front of you, because that is what decides which control does the work. A respirator is useless against a substance that harms through the skin. Gloves are useless against a dust that harms through the lung. Matching the control to the route is the difference between wearing protection and being protected."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Inhalation.</strong> Dusts, fumes, vapours, mists and gases. The dominant route
            for chasing dust, solder fume, solvent vapour and exhaust emissions, and the one that
            causes the long-latency lung disease.
          </li>
          <li>
            <strong>Skin contact.</strong> Solvents, resins, oils, acids and lubricants. Some
            substances irritate, some sensitise, and some pass straight through intact skin into
            the bloodstream.
          </li>
          <li>
            <strong>Eye contact.</strong> Splashes when decanting, and airborne dust and mist. The
            fastest-acting route for corrosives, which is why irrigation times in Section 4 are
            measured in minutes rather than seconds.
          </li>
          <li>
            <strong>Ingestion.</strong> Rarely deliberate and usually secondary — contaminated
            hands on a sandwich, a drink left open in a dusty room. It is the route that makes
            hand-washing before breaks a control measure rather than good manners.
          </li>
        </ul>
        <p>
          Routes of exposure are one of the things the Reg 6 assessment has to identify, alongside
          the substances themselves and who is exposed. It is also the part that most often gets
          skipped, which is how a job ends up with three sets of gloves in the van and no
          extraction.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="Control of Substances Hazardous to Health Regulations 2002 — Reg 6"
        clause="An employer shall not carry out work which is liable to expose any employees to any substance hazardous to health unless he has made a suitable and sufficient assessment of the risk created by that work to the health of those employees and of the steps that need to be taken to meet the requirements of these Regulations; and implemented the steps referred to."
        meaning="The assessment happens before the exposure, not after it. Suitable and sufficient is the same test used elsewhere in health and safety law, and the manufacturer safety data sheet is the technical source the assessment draws on. Reading the sheet is how you check that the assessment in front of you actually reflects the substance you are about to open."
        cite="Source: Control of Substances Hazardous to Health Regulations 2002 (SI 2002/2677), Reg 6."
      />

      <InlineCheck
        id="303-9-1-check-1"
        question="You are about to start chasing brick on a refurbishment. Someone hands you a tin of masonry sealant and a tube of two-pack epoxy, neither of which has been on site before and neither of which you have seen a data sheet for. What is the right order of events?"
        options={[
          'Start work — both are common building materials, and you can look the sheets up if you have a reaction.',
          'Start work in a well-ventilated area and read the sheets at the first break, so the programme is not held up.',
          'Ask the supplier to email the sheets and begin with the sealant only, since the epoxy is the higher hazard of the two.',
          'Stop, find the data sheets for both, read at least Section 2, Section 4 and Section 8, confirm you have the right protective equipment for both, and only then start.',
        ]}
        correctIndex={3}
        explanation="COSHH Reg 6 requires the assessment before the work exposes anybody. The data sheet is the manufacturer authoritative information for that assessment, and the three sections that matter before you open a container are the hazards, the first aid and the exposure controls. Having used something similar before is not an assessment — concentrations, solvents and first-aid responses differ between products that look identical on the shelf."
      />

      <SectionRule />

      <ContentEyebrow>Dusts and fumes</ContentEyebrow>

      <ConceptBlock
        title="Dust — the one that does the long-term damage"
        plainEnglish="Dust generated by the work is the biggest single COSHH exposure in the electrical trade, because chasing, drilling and cutting are everyday activities and the dust looks like nothing more than mess."
        onSite="Respirable crystalline silica comes off masonry chasing, brick cutting and concrete drilling. It is a Group 1 carcinogen and the published workplace exposure limit is 0.1 mg per cubic metre as an 8-hour time-weighted average, currently under review. Wood and board dust is the other one — hardwood dust is a carcinogen with a published limit of 3 mg per cubic metre over 8 hours, and softwood dust is a sensitiser at 5 mg per cubic metre."
      >
        <p>
          The trap with dust is that the harm is invisible and delayed. Nothing hurts on the day,
          so the incentive to set up extraction for a twenty-minute chase is weak. Respirable
          crystalline silica is now among the leading causes of occupational lung disease, and the
          exposure that causes it is exactly the routine, unremarkable, twenty-minute kind.
        </p>
        <p>
          Control for dust is engineering control at source before anything else. On-tool
          extraction to a suitable class of vacuum, water suppression, and planning the route so
          there is less to cut at all. A mask on its own, used for routine silica work where
          extraction was reasonably practicable, has been found inadequate — the regulation asks
          what could have been done, not what was convenient.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="Fume — solder, flux and engine exhaust"
        plainEnglish="Fume is not smoke and not dust. It is fine airborne particulate condensed from a vapour, and it goes deep into the lung because the particles are so small."
        onSite="Solder fume, and particularly the flux fume, is the one that catches electricians doing panel and low-voltage work. Rosin-based fluxes are respiratory sensitisers with a published limit of 0.05 mg per cubic metre over 8 hours, and they are a known asthma trigger. Diesel engine exhaust emissions are the other one, significant in confined-space and tunnel work, with the limit position under review."
      >
        <p>
          Sensitisation is what makes flux fume different from a simple irritant. Once a person is
          sensitised, very small future exposures can set off an asthmatic response, and there is
          no way back. That is why the control is extraction at the iron rather than an open
          window, and why regular exposure brings the health surveillance duty into play.
        </p>
        <p>
          The practical set-up is unglamorous: local exhaust ventilation positioned at the joint,
          maintained and tested as a control measure in its own right under Reg 9, plus a working
          arrangement that keeps the operative out of the rising plume. A desk fan blowing the fume
          across the bench is not extraction; it is dilution into somebody else.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="303-9-1-check-2"
        question="A colleague suggests issuing everyone a disposable respirator for a week of masonry chasing and leaving it at that. Why does that not satisfy COSHH?"
        options={[
          'Because respirators cannot filter mineral dust at all, so they provide no protection against silica.',
          'Because Reg 7 requires exposure to be prevented or adequately controlled by measures other than respiratory protection so far as is reasonably practicable — on-tool extraction and water suppression sit above the mask in the hierarchy.',
          'Because respiratory protection may only be issued once airborne monitoring has produced a reading above the exposure limit.',
          'Because disposable respirators are not permitted on construction sites and only reusable half-masks may be used.',
        ]}
        correctIndex={1}
        explanation="The hierarchy is the substance of Reg 7, not a recommendation. Eliminate the chase where the route can be changed, substitute a lower-dust method, engineer the dust out at source with on-tool extraction or water suppression, limit the duration and restrict access, and only then add respiratory protection as the last line. Mask-only working where engineering controls were reasonably practicable is where COSHH prosecutions bite hardest."
      />

      <SectionRule />

      <ContentEyebrow>Solvents, resins, oils and acids</ContentEyebrow>

      <ConceptBlock
        title="The liquid inventory on a van"
        plainEnglish="The electrical trade carries a smaller chemical inventory than plumbing or decorating, but several of the products that are carried are higher-hazard than they look — solvents, acids and reactive resins."
        onSite="None of these should be on the van without a data sheet in the COSHH register. If you turn up and something is in use that is not in the register, that is the moment to stop and raise it, because the Reg 6 assessment has to exist before the exposure."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Contact cleaner and electronic cleaner.</strong> Typically isopropyl alcohol or
            proprietary solvent blends. Flammable, and an eye and respiratory irritant. Gloves, eye
            protection and ventilation, and kept away from ignition sources.
          </li>
          <li>
            <strong>Cable lubricant.</strong> Water-based or wax-based surfactants, used for
            pulling into containment. Skin sensitisation potential, nitrile gloves typical, and
            contaminated rags need a proper disposal route.
          </li>
          <li>
            <strong>Masonry sealant.</strong> Silane or siloxane based, or solvent based. Skin and
            eye irritant, with respiratory protection needed in confined spaces.
          </li>
          <li>
            <strong>Two-pack epoxy resin.</strong> For fixings, panel repairs and conduit seals.
            Often contains isocyanate or amine hardeners, and the toxicological section typically
            flags respiratory sensitisation. Significant protective equipment, and health
            surveillance often required.
          </li>
          <li>
            <strong>Brick acid.</strong> Hydrochloric acid used for cleaning chased surfaces.
            Strongly corrosive. Chemical-resistant gloves, goggles and ventilation, and a
            first-aid response of irrigation with running water for at least 15 minutes.
          </li>
          <li>
            <strong>Dust suppressant.</strong> Water-based polymer or surfactant solutions,
            generally low hazard, used to control respirable dust during chasing and drilling.
          </li>
          <li>
            <strong>Battery electrolyte.</strong> Relevant on lead-acid and large-format lithium
            installation work, and a COSHH substance in its own right.
          </li>
          <li>
            <strong>Machine oil and oil-filled equipment.</strong> Oils from plant and from
            oil-filled transformers and capacitors, where older units may also carry a
            contamination concern and a separate hazardous-waste route.
          </li>
          <li>
            <strong>Refrigerants.</strong> Released from disturbed air-conditioning equipment, with
            fluorinated gas rules applying on top of COSHH.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="Control of Substances Hazardous to Health Regulations 2002 — Reg 7(1)"
        clause="Every employer shall ensure that the exposure of his employees to substances hazardous to health is either prevented or, where this is not reasonably practicable, adequately controlled."
        meaning="Prevention first, control second. Adequately controlled is tied to the workplace exposure limit and to the hierarchy — eliminate, substitute, engineering controls, administrative controls, and personal protective equipment last. PPE sits at the bottom because it protects only the wearer, can fail in use, and depends on being worn correctly every time. Enforcement bites hardest where the hierarchy was inverted."
        cite="Source: Control of Substances Hazardous to Health Regulations 2002 (SI 2002/2677), Reg 7."
      />

      <SectionRule />

      <ContentEyebrow>Lead has its own rules</ContentEyebrow>

      <ConceptBlock
        title="Lead — outside COSHH, and stricter"
        plainEnglish="Lead is not a COSHH substance. It has its own regime under the Control of Lead at Work Regulations 2002, because the hazard profile and the monitoring needed are different."
        onSite="The way an electrician meets it is old paint disturbed during chasing in older housing stock. Sanding, cutting or dry-scraping painted surfaces in a pre-1992 property is the classic exposure, and nothing about the job feels like lead work at the time."
      >
        <p>
          Two things separate the lead regime from ordinary COSHH practice. The first is the action
          level, expressed as an airborne concentration over an 8-hour reference period, which is
          the trigger for the fuller set of duties. The second is biological monitoring — blood
          testing rather than air testing alone, because lead accumulates in the body and airborne
          readings alone do not tell you what dose a person has actually taken on.
        </p>
        <p>
          The practical response is the same shape as the dust response. Avoid dry disturbance of
          painted surfaces where you can, use a method that captures at source where you cannot,
          keep food and drink out of the work area because ingestion from contaminated hands is a
          genuine route, and raise it with the firm rather than improvising. If the work is likely
          to disturb painted surfaces in older housing, that belongs in the plan before the first
          chase is cut.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="303-9-1-check-3"
        question="Halfway through a rewire in older housing stock you realise the chases are cutting through several layers of old paint. What is the correct framing?"
        options={[
          'It is ordinary building dust and the existing COSHH assessment for masonry chasing already covers it.',
          'It is only a hazard if the paint is visibly flaking, because intact paint cannot release anything.',
          'Lead sits outside COSHH under its own regulations, so the exposure needs raising with the firm and planning properly rather than being absorbed into the masonry-dust assessment.',
          'Paint is a finished product rather than a substance, so no assessment applies to disturbing it.',
        ]}
        correctIndex={2}
        explanation="Lead from old paint disturbed during chasing is a recognised exposure in older housing and it is covered by the Control of Lead at Work Regulations 2002 rather than COSHH. That regime brings its own action level over an 8-hour reference period and its own biological monitoring requirement. The mistake is not failing to recognise a hazard; it is filing it under the wrong regime and therefore applying the wrong controls."
      />

      <SectionRule />

      <ContentEyebrow>The data sheet and the control order</ContentEyebrow>

      <ConceptBlock
        title="Reading the safety data sheet"
        plainEnglish="Every safety data sheet for a hazardous substance follows the same 16-section structure, set by the CLP Regulation and retained as UK law. Same sections, same order, same content categories, every product, every manufacturer. Once you know the structure you can navigate any sheet in seconds."
        onSite="Four sections cover the apprentice day-to-day. Section 2 for the hazards, Section 4 for the first aid, Section 8 for the exposure controls and protective equipment, Section 13 for disposal. Know those numbers and you can open an unfamiliar sheet on a phone and find the first-aid response before somebody has finished walking to the tap."
      >
        <p>What the four sections give you:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Section 2 — Hazards identification.</strong> The pictograms, the signal word,
            and the hazard statements. What the substance can do to you.
          </li>
          <li>
            <strong>Section 4 — First aid measures.</strong> Separate responses for inhalation,
            skin contact, eye contact and ingestion. The section where seconds matter.
          </li>
          <li>
            <strong>Section 8 — Exposure controls and personal protection.</strong> The exposure
            limits where they apply, the engineering controls, and the specific gloves, eye
            protection and respiratory protection recommended.
          </li>
          <li>
            <strong>Section 13 — Disposal considerations.</strong> How to dispose of the substance
            and of contaminated equipment and containers.
          </li>
        </ul>
        <p>
          Section 11 is worth one more mention because it is where sensitisation, carcinogenicity
          and chronic toxicity are recorded. A sensitisation flag in Section 11 is what pulls the
          health surveillance duty into the job, so it is the section the health and safety officer
          reads even when the operative does not.
        </p>
        <p>
          The pictograms on the container are the quick version of Section 2 — skull and
          crossbones for acute toxicity, exclamation mark for irritant, sensitiser or narcotic
          effects, flame for flammable, corrosion for skin or metal damage, exploding bomb, gas
          cylinder for compressed gas, the environmental symbol for aquatic toxicity, and the
          health hazard symbol for chronic effects including respiratory sensitisation. Alongside
          them sits the signal word — Danger for higher severity, Warning for lower.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="The control order — and why the mask comes last"
        plainEnglish="Regulation 7 fixes the order. Eliminate the substance or the activity. Substitute something less hazardous. Engineer the exposure out at source. Apply administrative controls. Use personal protective equipment as the last line."
        onSite="Work down the list out loud for the task in front of you rather than jumping to the bottom. For a masonry chase that reads: can the cable go surface or take another route; can a lower-dust method be used; can it be cut with on-tool extraction or water suppression; can the duration be limited and the area restricted; and only then, which respirator."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Eliminate.</strong> Do not create the exposure at all — change the route,
            change the design, do not use the product.
          </li>
          <li>
            <strong>Substitute.</strong> A less hazardous substance, or a method that generates
            less of it.
          </li>
          <li>
            <strong>Engineering controls.</strong> Extraction at source, enclosure, water
            suppression. These protect everyone in the area, not just the person wearing something.
          </li>
          <li>
            <strong>Administrative controls.</strong> Limit the duration, rotate operatives,
            restrict access, brief and supervise.
          </li>
          <li>
            <strong>Personal protective equipment.</strong> Gloves to the standard the data sheet
            specifies, eye protection, and respiratory protection that has been face-fit tested.
            Last, not first.
          </li>
        </ul>
        <p>
          Two consequences follow. The controls actually provided have to be used — that is a
          separate duty under Reg 8, and it means an extraction unit left in the van is the same
          as not having one. And the controls have to be maintained, examined and tested under Reg
          9, which is why an extraction unit and a respirator are items on a maintenance regime
          rather than consumables.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="Control of Substances Hazardous to Health Regulations 2002 — Reg 11"
        clause="Health surveillance is required for employees exposed to specified scheduled substances, and for any work where there is a reasonable likelihood that an identifiable disease or adverse health effect will occur under the particular conditions of work and there are valid techniques for detecting indications of the disease or effect."
        meaning="Where a substance carries sensitisation, carcinogenic or chronic toxicity hazards — flagged in Sections 2 and 11 of the data sheet — and exposure is regular, the employer has to arrange surveillance. In the trade that typically means lung-function testing, skin examination and periodic occupational health review. Two-pack isocyanate products and respirable crystalline silica from masonry chasing are the standard triggers."
        cite="Source: Control of Substances Hazardous to Health Regulations 2002 (SI 2002/2677), Reg 11."
      />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Reading the data sheet only after the spill"
        whatHappens={
          <>
            An operative is decanting brick acid from a large bottle into a smaller container for
            cleaning down a chased wall. No goggles, and thin nitrile gloves rather than the heavier
            chemical-resistant grade the data sheet specifies in Section 8. Acid splashes onto the
            back of the hand, gets through the glove and reaches skin. The sheet then has to be
            looked up in the moment — hand stinging, eyes watering — to find the first-aid
            response. By the time anyone reaches running water the exposure has run for minutes
            and the skin is already burned.
          </>
        }
        doInstead={
          <>
            Read Sections 2, 4 and 8 before handling. It takes two minutes. For brick acid the
            sheet will specify chemical-resistant gloves to a stated standard, goggles and good
            ventilation, and a first-aid response of irrigating with running water for at least 15
            minutes. Knowing that in advance means the right kit is already on, and if a splash
            happens anyway you are at the tap in seconds instead of scrolling for a PDF.
          </>
        }
      />

      <CommonMistake
        title="Treating the exposure limit as a target"
        whatHappens={
          <>
            A firm reads that respirable crystalline silica has a published limit as an 8-hour
            time-weighted average, arranges a single monitoring exercise, and finds the readings
            sit just under it. On that basis they decide the existing arrangements are compliant
            and drop the plan to buy on-tool extraction. Exposure continues at just below the
            limit, every day, for years — on a substance that is a Group 1 carcinogen with no safe
            level.
          </>
        }
        doInstead={
          <>
            The limit is a legal ceiling, not a target. Reg 7 requires exposure to be prevented
            where reasonably practicable and adequately controlled where it is not, and adequately
            controlled means as low as is reasonably practicable. For a carcinogen there is no
            level that is affirmatively safe, so the question is never whether you are under the
            number — it is whether there was a control you could reasonably have applied and did
            not.
          </>
        }
      />

      <Scenario
        title="Solder fume in a plant room panel build in Merthyr Tydfil"
        situation={
          <>
            You are spending three days building out control panels in a plant room on an
            industrial site in Merthyr Tydfil. Most of the work is terminating and soldering
            low-voltage control wiring at a bench, with the plant room door shut because the site
            is live and noisy. The flux in use is a rosin-based cored solder from the stores. By
            the middle of the second day two of you have a dry cough and one has a tight chest.
            There is no extraction on the bench.
          </>
        }
        whatToDo={
          <>
            Stop soldering and get out of the room. Report the symptoms to the supervisor the same
            day, in writing, and make sure they are recorded — symptoms are the trigger for
            reviewing whether the controls are adequate, and an unreported symptom is a control
            failure nobody finds out about. Pull the data sheet for the solder and read Section 2
            and Section 11: a rosin-based flux typically carries a respiratory sensitisation flag,
            and there is a published workplace exposure limit for rosin-based solder flux fume of
            0.05 mg per cubic metre as an 8-hour time-weighted average. Then work the hierarchy.
            Can a less hazardous flux be substituted from the stores. If not, the work needs local
            exhaust ventilation positioned at the joint, and the unit has to be one that is
            maintained, examined and tested rather than something borrowed and unchecked. Limit
            the duration and rotate the task between people. Respiratory protection is the last
            layer, not the fix. Ask whether health surveillance is in place — regular exposure to
            a sensitiser brings Reg 11 into play — and whether the COSHH assessment for this job
            ever addressed the plant room being closed up.
          </>
        }
        whyItMatters={
          <>
            Sensitisation does not reverse. Once someone is sensitised to rosin flux, small future
            exposures can trigger an asthmatic response for the rest of their working life, and it
            takes them off panel work permanently. The symptoms on day two are the warning, and the
            whole point of the Reg 11 surveillance duty is to catch the early signal before the
            damage is fixed. It also shows the hierarchy working in the right order — the answer
            was never a better mask, it was extraction at the joint and a look at whether the room
            should have been sealed up in the first place.
          </>
        }
      />

      <SectionRule />

      <FAQ items={faqs} />

      <SectionRule />

      <KeyTakeaways
        points={[
          'COSHH 2002 covers chemicals, fumes, dusts, mists, vapours, gases and biological agents. Asbestos, lead and ionising radiation sit outside it under their own regulations.',
          'The duties run in order — Reg 6 assessment before exposure, Reg 7 prevention or control, Regs 8 and 9 use and maintenance of the controls, Reg 10 monitoring, Reg 11 health surveillance, Reg 12 information and training, Reg 13 emergencies.',
          'Four routes in: inhalation, skin contact, eye contact and ingestion. Match the control to the dominant route or the protection is decorative.',
          'The trade inventory is dust from chasing and drilling, wood and board dust, solder fume and flux, contact cleaner and solvents, cable lubricant, masonry sealant, two-pack resins, brick acid, dust suppressant, battery electrolyte, oils and refrigerants.',
          'Published exposure limits are quoted as an 8-hour time-weighted average and a 15-minute short-term limit in the HSE list. They are ceilings, not targets, and not every substance has one.',
          'The safety data sheet has 16 fixed sections under the CLP Regulation. Section 2 hazards, Section 4 first aid, Section 8 exposure controls and PPE, Section 13 disposal — and Section 11 for sensitisation and chronic effects.',
          'The control order is eliminate, substitute, engineering controls, administrative controls, PPE last. Reaching for respiratory protection first inverts the hierarchy and rarely satisfies Reg 7.',
          'Read the sheet before you open the container, not after the spill — and if a substance is on site without one in the register, stop and raise it.',
        ]}
      />

      <ContentEyebrow>Check yourself</ContentEyebrow>

      <Quiz questions={quizQuestions} title="Commonly encountered substances — knowledge check" />
    </div>
  );
}
