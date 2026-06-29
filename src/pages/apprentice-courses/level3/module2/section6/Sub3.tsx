/**
 * Module 2 · Section 6 · Subsection 3 — Hazardous Waste Regs 2005, EPR 2016 and the waste hierarchy
 * City & Guilds 2365-03 / Unit 301 / Sustainable working practices
 *
 * Layered depth: 2357 Unit 602 ELTK02 / LO2 supplementary — UK hazardous waste consignment
 * regime, the Environmental Permitting (England and Wales) Regulations 2016 framework, and
 * the statutory waste hierarchy (prevention → re-use → recycling → recovery → disposal).
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
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
import useSEO from '@/hooks/useSEO';

const TITLE =
  'Hazardous Waste, EPR and the waste hierarchy (6.3) | Level 3 Module 2.6.3 | Elec-Mate';
const DESCRIPTION =
  'Hazardous Waste (England and Wales) Regulations 2005, the Environmental Permitting Regulations 2016, and the statutory waste hierarchy. How fluorescent tubes, asbestos-bearing accessories, oil-filled transformers and other hazardous electrical waste must be consigned, where the waste hierarchy applies on a typical electrical install, and how to use the European Waste Catalogue codes correctly.';

const checks = [
  {
    id: 'l3-m2-s6-sub3-fluorescents',
    question:
      "You are stripping out a 1990s commercial unit and removing 60 fluorescent tubes plus several PCB-suspected ballasts. Which UK waste regime applies and what paperwork do you need?",
    options: [
      "Only the WEEE Regulations apply — fluorescent tubes are Category 3 lamps, so a standard waste transfer note and the wholesaler take-back scheme cover them, with no consignment note or permit check and tubes carried loose in the van.",
      "Only the Duty of Care under the Environmental Protection Act 1990 applies — with a waste transfer note and a registered carrier, tubes and ballasts go as general commercial waste, since mercury and PCBs only matter at industrial concentrations.",
      "Both WEEE and the Hazardous Waste Regulations apply — mercury tubes (EWC 20 01 21*) and PCB ballasts are hazardous, needing a Hazardous Waste Consignment Note, permitted carrier and destination, and three-year record retention. Transport tubes intact.",
      "The Control of Pollution Act and a Special Waste Consignment Note apply — crush the tubes on site to cut transport volume, then move the glass under one annual consignment note for all sites, with twelve-month record retention.",
    ],
    correctIndex: 2,
    explanation:
      "Hazardous waste sits under a stricter regime than non-hazardous WEEE. The Hazardous Waste Consignment Note is the controlling document; the Environment Agency uses the consignment data to track movements end-to-end. Crushing fluorescent tubes on site without an appropriate permit is a separate breach because of the mercury release. The PCB ballast issue is real for older fittings — pre-1986 ballasts in particular may contain PCBs and require specialist treatment.",
  },
  {
    id: 'l3-m2-s6-sub3-hierarchy',
    question:
      "A customer is replacing all the fluorescent fittings in their warehouse with LED panels. Apply the waste hierarchy to the old fluorescent fittings — what is the correct order of preference?",
    options: [
      "Prevention (retrofit LED tubes rather than replace), then preparation for re-use, then recycling, then other recovery, then disposal as the last resort — the order regulation 12 of the Waste (England and Wales) Regulations 2011 requires.",
      "Recycling first as the most responsible option, then preparation for re-use, then prevention, then disposal, with energy recovery last — the aim being to get as much material into the recycling stream as possible.",
      "Disposal first for obviously end-of-life fittings, then recovery, then recycling, then re-use, then prevention — running from easiest to hardest, so a busy site can start at disposal and move up only if time allows.",
      "There is no fixed order — the producer freely chooses any of prevention, re-use, recycling, recovery or disposal provided a waste transfer note is completed, because the hierarchy is guidance only and imposes no legal duty.",
    ],
    correctIndex: 0,
    explanation:
      "The waste hierarchy is the legal framework for waste decision-making in the UK. Regulation 12 of the Waste (England and Wales) Regulations 2011 imposes a duty on waste producers to take all reasonable steps to apply the hierarchy in order. On a fluorescent-to-LED retrofit, prevention via tube-only retrofit and preparation for re-use of the fittings should both be considered before bulk recycling. The hierarchy is the right answer to the customer who asks whether the old fittings can be used somewhere else.",
  },
  {
    id: 'l3-m2-s6-sub3-permits',
    question:
      "What is the role of the Environmental Permitting Regulations 2016 (EPR) in waste handling on an electrical contracting business?",
    options: [
      "EPR is purely a planning regime governing where new waste plants can be built — with public liability insurance and a licensed skip company you have no direct duties and no need to register as a carrier for your own waste.",
      "EPR is administered by the HSE, not the Environment Agency, and applies only to businesses with more than fifty employees, so a small contractor is exempt from carrier registration and from checking who removes their waste.",
      "EPR simply re-enacts the WEEE Regulations under a new name — its only effect is that fluorescent lamps and small electrical items go to a WEEE point, with no carrier registration duty and no permit checks on destinations.",
      "EPR is the umbrella permitting framework for waste, water discharges and certain installations — anyone carrying, treating or disposing of waste needs authorisation, so a contractor most likely needs lower-tier waste carrier registration.",
    ],
    correctIndex: 3,
    explanation:
      "EPR 2016 consolidated dozens of older permitting regimes into one framework. For an electrical contractor the immediate practical effects are: register as a waste carrier (free for lower-tier registration if you only carry your own waste), check the waste carrier registration of anyone removing waste from your sites, and check the environmental permit of the destination treatment facility. The Environment Agency operates a free public register where these checks take 30 seconds.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "What is the difference between a waste transfer note and a Hazardous Waste Consignment Note?",
    options: [
      "There is no real difference — 'consignment note' is the term larger contractors use and 'transfer note' the term smaller ones use, both covering hazardous and non-hazardous waste equally and retained for the same period.",
      "A transfer note is the standard Duty of Care document for non-hazardous waste; a consignment note is the stricter hazardous-waste document, needing the EWC and HP codes plus chain signatures, retained for at least three years (transfer notes two).",
      "A transfer note is for waste leaving the site and a consignment note for waste arriving — the producer completes the transfer note and the receiving facility the consignment note, so the producer never handles one themselves.",
      "A consignment note is only needed when waste crosses an international border, while a transfer note covers all domestic movements, so hazardous waste handled within England and Wales needs only a transfer note.",
    ],
    correctAnswer: 1,
    explanation:
      "The hazardous waste regime layers extra duties on top of the general Duty of Care. The consignment note is the audit trail the Environment Agency uses to follow hazardous waste from cradle to grave. Skipping it because it feels like extra paperwork is a documented enforcement target. The notes are simple to complete once the team has done it a few times.",
  },
  {
    id: 2,
    question:
      "What does the waste hierarchy require waste producers to do under regulation 12 of the Waste (England and Wales) Regulations 2011?",
    options: [
      "Send all controlled waste to landfill but pay full Landfill Tax on each load — once the tax is paid the duty is discharged, because the tax funds recycling infrastructure and satisfies the hierarchy by the payment itself.",
      "Recover the maximum financial value — sell scrap copper and aluminium, recycle whatever else has resale value, and dispose of the rest, the duty being essentially commercial and aimed at cutting the producer's disposal costs.",
      "Take all reasonable measures to apply the hierarchy in order — prevention, preparation for re-use, recycling, other recovery, disposal — and record the steps taken, with departures justified on environmental grounds.",
      "Segregate waste into exactly two streams, hazardous and non-hazardous, and consign each separately — regulation 12 being solely a segregation duty that says nothing about preferring prevention or re-use over disposal.",
    ],
    correctAnswer: 2,
    explanation:
      "Regulation 12 turns the hierarchy from policy into duty. The waste transfer note now includes a tick-box requiring the producer to confirm the hierarchy has been applied. On a typical electrical install the practical application is: design out waste at order stage (prevention), keep usable accessories aside for re-use, separate cable copper for recycling, and only what genuinely cannot be recovered goes to disposal.",
  },
  {
    id: 3,
    question:
      "Which of these is classed as absolute hazardous waste and triggers the consignment note regime regardless of quantity?",
    options: [
      "Clean copper cable offcuts and stripped scrap copper — because copper has a high scrap value it is closely controlled, so any quantity must travel under a consignment note however small the amount removed from site.",
      "Mixed general builders' waste — plaster, timber, packaging and broken accessories in one skip — because once different waste types are combined in a single container the whole load is automatically classed as absolute hazardous.",
      "Standard PVC twin-and-earth cable removed during a rewire — because PVC insulation contains chlorine, all removed PVC cable is absolute hazardous waste and triggers the consignment note regime however little is taken away.",
      "Fluorescent tubes (EWC 20 01 21*), PCB transformers and capacitors (16 02 09*), lead, mercury or cadmium batteries (16 06 01* and similar), asbestos-cement backplates (17 06 05*) and waste oils — the asterisk marking absolute hazardous waste.",
    ],
    correctAnswer: 3,
    explanation:
      "The EWC (now the List of Waste in UK terminology) is the single catalogue of waste types. Codes ending in * are absolute hazardous waste — always hazardous regardless of concentration or other tests. Other codes are mirror entries — hazardous only if certain hazardous properties (HP codes) are present above thresholds. Knowing which EWC codes apply to common electrical waste streams is part of the consignment note completion task.",
  },
  {
    id: 4,
    question:
      "Why has the lower-tier waste carrier registration regime become essentially mandatory for electrical contractors in the UK?",
    options: [
      "Because any business transporting waste it produced from a customer site is carrying controlled waste and needs registration — lower-tier (own waste) is free, upper-tier (third-party or C&D waste) carries a fee, and failing to register is a criminal offence.",
      "Because a waste carrier registration doubles as the firm's public liability insurance for environmental damage — without it the insurer can refuse any pollution claim, so it is a commercial rather than legal necessity and only the upper tier matters.",
      "Because every van moving waste must now display a registration plate issued by the DVSA, similar to an O-licence for HGVs, and the lower-tier registration is what authorises a light commercial vehicle to carry trade waste on the highway.",
      "Because the registration is the route to reclaiming the Landfill Tax paid on disposed waste — lower-tier registration unlocks the tax rebate, which is why most contractors hold it even though carrying their own waste does not require it.",
    ],
    correctAnswer: 0,
    explanation:
      "Most electrical contractors carry waste they have produced themselves (offcuts, removed kit, packaging) and qualify for lower-tier registration which is free. The Environment Agency online registration takes about ten minutes. Upper-tier registration is needed for anyone carrying third-party waste or third-party construction and demolition waste. The check on the wholesaler or skip operator removing waste from your site needs to confirm they hold the correct tier of registration for the activity.",
  },
  {
    id: 5,
    question:
      "A customer in Wales asks you to remove an old asbestos-cement consumer unit backplate during a rewire. What is the correct response?",
    options: [
      "Asbestos-cement is bonded and low-risk, so a competent electrician may remove the backplate without asbestos training provided it is double-bagged, labelled and skipped — the Control of Asbestos Regulations covering only loose or sprayed asbestos.",
      "Work is restricted under the Control of Asbestos Regulations 2012, even non-licensed removal needs non-licensable training, and the waste is hazardous (EWC 17 06 05*) — so do not remove it yourself unless trained; refer to a competent contractor.",
      "Because the job is in Wales the Control of Asbestos Regulations do not apply — asbestos is devolved and Wales has no equivalent regime, so the backplate goes as ordinary waste and the customer handles disposal.",
      "Wet the backplate, snap it out quickly to minimise dust, and skip it with the rest of the rewire waste under a transfer note — asbestos only becoming hazardous once finely powdered, so an intact cement board is fine.",
    ],
    correctAnswer: 1,
    explanation:
      "Asbestos work crosses both the Health and Safety at Work Act regime (Control of Asbestos Regulations 2012) and the hazardous waste regime. The right answer is rarely to handle it yourself. The customer house may have an asbestos register; commercial premises always should. The cost of a competent referral is small relative to the cost of an HSE prosecution or a long-term health consequence to you.",
  },
  {
    id: 6,
    question:
      "What does the European Waste Catalogue code with an asterisk (e.g. 16 06 01*) tell you?",
    options: [
      "It marks a mirror code requiring a hazardous-property assessment on every load, so the waste is only hazardous if that assessment exceeds the HP thresholds — without the asterisk an entry would always be hazardous by default.",
      "It indicates the waste is subject to international Basel Convention controls and may only be exported, with no bearing on whether the waste is hazardous within the UK — simply flagging cross-border movement restrictions.",
      "It marks absolute hazardous waste — always hazardous regardless of concentration or test result. Non-asterisked entries are non-hazardous; mirror codes (one starred, one not) need a hazardous-property assessment to choose between them.",
      "It shows the entry has been superseded by a newer code in the latest List of Waste revision, so an asterisked code is deprecated and should not be used on consignment notes — the Environment Agency publishing replacements annually.",
    ],
    correctAnswer: 2,
    explanation:
      "Reading the EWC code is part of being a competent waste producer. Most electrical hazardous waste streams have well-known absolute codes — 20 01 21* for fluorescent tubes, 16 06 01* for lead-acid batteries, 16 06 02* for nickel-cadmium batteries, 16 02 09* for PCB-containing transformers, 17 06 05* for asbestos-containing construction materials. Memorising the half-dozen common codes for your trade saves time on consignment note completion.",
  },
  {
    id: 7,
    question:
      "Why is energy recovery (incineration with energy capture) ranked below recycling in the waste hierarchy?",
    options: [
      "Because energy recovery produces carbon emissions at the point of incineration whereas recycling produces none — the hierarchy ranking options purely by direct CO₂ output, so any process that burns waste sits below any that does not.",
      "Because recycling is always cheaper than energy recovery for the producer — the hierarchy being ordered by cost to the producer with the lowest-cost option at the top, so recycling outranks recovery on price rather than environment.",
      "Because energy recovery is only available at a handful of UK incinerator sites, making transport impractical — the hierarchy ranking by infrastructure availability, so recycling outranks recovery on the number of facilities.",
      "Because recycling preserves the material value for new manufacturing while energy recovery destroys the material and recovers only the chemical energy — keeping materials in use being preferred, though recovery still beats landfill.",
    ],
    correctAnswer: 3,
    explanation:
      "The hierarchy reflects the circular-economy principle that materials should stay in use as long as possible. Recycling extends material life; energy recovery ends it. Energy recovery is still preferable to landfill because at least the chemical energy is captured, but the loss of the original material value is permanent. The hierarchy gives the waste producer a clear ladder to climb in any given decision.",
  },
  {
    id: 8,
    question:
      "Which UK regulator enforces the Hazardous Waste Regulations 2005 and the EPR 2016 regimes in England?",
    options: [
      "The Environment Agency, which operates the consignment note tracking, carrier registration and permit registers in England, with SEPA, NRW and NIEA covering the devolved nations and a full range of civil and criminal sanctions available.",
      "The Health and Safety Executive — because hazardous waste presents a health risk to workers, the HSE leads enforcement of both the Hazardous Waste Regulations and EPR, operating the consignment note system alongside its workplace-safety duties.",
      "The local authority environmental health department — waste enforcement being a council function, so the borough or district council issues carrier registrations, holds consignment records and prosecutes producers who breach the regime locally.",
      "Ofgem — as the regulator already responsible for energy and the Smart Export Guarantee, Ofgem also administers the waste regimes, maintaining the environmental permit register and prosecuting illegal disposal of hazardous waste.",
    ],
    correctAnswer: 0,
    explanation:
      "The EA is the lead environmental regulator in England across the waste regimes. Their enforcement activity is data-driven — the consignment note system flags anomalies which trigger compliance visits. As a contractor your best defence is well-kept paperwork and correctly registered carriers. The free Environment Agency public registers (waste carriers, environmental permits, hazardous waste producers) are the right tool for routine compliance checks.",
  },
];

const faqs = [
  {
    question: "Do I need to register as a hazardous waste producer with the Environment Agency?",
    answer:
      "Since 1 April 2016 hazardous waste producer premises registration in England has been abolished — you no longer need to pre-register the premises with the Environment Agency. However the consignment note duties remain in full force: every transfer of hazardous waste needs a consignment note, the carrier and destination must hold the appropriate environmental permit and waste carrier registration, and the producer must retain the consignment note for at least three years. In Wales premises notification still applies; in Scotland the SEPA consignment note (Special Waste Consignment Note) and pre-notification regime applies. Always check the regional rules where you work.",
  },
  {
    question: "What is a mirror code in the European Waste Catalogue?",
    answer:
      "A mirror code is a pair of EWC entries — one with an asterisk (hazardous) and one without (non-hazardous) — describing the same general waste stream. The producer must assess the specific waste against the hazardous property (HP) thresholds to decide which code applies. For example, paint waste has both a hazardous and a non-hazardous mirror code; the right code depends on the actual paint composition. Absolute entries (always asterisked, no non-hazardous mirror) bypass the assessment — they are always hazardous. Most electrical-trade waste streams use absolute codes, simplifying the decision.",
  },
  {
    question: "Are LED lamps hazardous waste like fluorescent tubes?",
    answer:
      "Generally no — LED lamps do not contain mercury and so do not fall under the absolute hazardous EWC code 20 01 21* that catches fluorescents. LED lamps are still WEEE (Cat 3 Lamps) and must be routed via the WEEE channels for recycling. Some LED lamps contain small electronic components or specific materials that might trigger hazardous classification under specific assessment, but the general consumer LED lamp is non-hazardous WEEE. Fluorescent tubes, CFLs, sodium lamps, metal halide lamps and similar gas-discharge sources do contain mercury or other regulated substances and follow the hazardous waste regime.",
  },
  {
    question: "What is the European Waste Catalogue called now in UK law?",
    answer:
      "After Brexit the catalogue is referred to as the List of Waste in UK regulations (the List of Wastes (England) Regulations 2005 originally implemented it and remain in force). The structure and codes remain the same six-digit format inherited from the EU Waste Framework Directive — chapter, sub-chapter and entry, with an asterisk for absolute hazardous entries. Most waste documentation still calls it the EWC code in everyday usage and either term is understood by waste carriers and treatment facilities.",
  },
  {
    question: "What is an environmental permit and which destinations need one?",
    answer:
      "An environmental permit under EPR 2016 is a site-specific authorisation issued by the Environment Agency (or SEPA / NRW / NIEA) covering a regulated activity — typically waste treatment, energy from waste, water discharge or installation operations. Any waste treatment facility you transfer waste to must hold the appropriate permit for the waste types and operations involved. The EA public register lets you confirm by site name or permit reference that the destination is properly authorised. A 30-second check at the point of transfer is the standard compliance step. Where the destination is operating without a valid permit, the Duty of Care passes the liability for any subsequent illegal disposal back to the producer.",
  },
  {
    question: "Where does the waste hierarchy duty actually apply on a small electrical job?",
    answer:
      "On every job. The most practical application is at three points. First, at order stage — order accurately to avoid surplus that becomes waste. Second, at strip-out — segregate accessories that could be cleaned and resold for re-use, copper for recycling, mixed waste for recovery. Third, at the documentation step — the waste transfer note now requires the producer to declare the hierarchy has been applied. The whole exercise is light-touch on a small job once the team is in the habit; on a large strip-out it can save real money by identifying re-usable kit before it goes to bulk recycling.",
  },
];

export default function Sub3() {
  const navigate = useNavigate();
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module2-section6')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 6
          </button>

          <PageHero
            eyebrow="Module 2 · Section 6 · Subsection 3"
            title="Hazardous Waste Regs, EPR and the waste hierarchy"
            description="The Hazardous Waste Regulations 2005, the Environmental Permitting Regulations 2016, and the statutory waste hierarchy under regulation 12 of the Waste (England and Wales) Regulations 2011. The complete framework for what counts as hazardous, who needs what permit, and the legal order of preference for disposing of any waste an electrician produces."
            tone="emerald"
          />

          <TLDR
            points={[
              "The Hazardous Waste Regulations 2005 require a Hazardous Waste Consignment Note for every transfer of hazardous waste — fluorescent tubes, PCB ballasts, batteries, oil-filled transformers, asbestos-bearing accessories. Retain for at least three years.",
              "The Environmental Permitting Regulations 2016 are the umbrella permitting framework — waste carrier registration, environmental permits for treatment facilities, brokers and dealers all sit under EPR.",
              "The waste hierarchy (prevention then preparation for re-use then recycling then other recovery then disposal) is a legal duty under regulation 12 of the Waste (England and Wales) Regulations 2011 — the producer must take all reasonable steps to apply it in order.",
              "EWC codes with an asterisk (e.g. 20 01 21* fluorescent tubes) are absolute hazardous waste, always hazardous regardless of concentration. Mirror codes require a hazardous-property assessment.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Distinguish a Hazardous Waste Consignment Note from a standard waste transfer note and identify which document is required for which waste stream on a typical electrical strip-out.",
              "Apply the waste hierarchy under regulation 12 of the Waste (England and Wales) Regulations 2011 to a real strip-out scenario and justify departures from the order on environmental grounds.",
              "Identify the role of the Environmental Permitting Regulations 2016 in waste carrier registration, brokerage, treatment site authorisation and producer compliance.",
              "Recognise the absolute hazardous waste EWC codes for the common electrical-trade waste streams (fluorescent tubes, PCB ballasts, lead-acid batteries, nickel-cadmium batteries, asbestos-bearing construction materials).",
              "Use the Environment Agency public registers to verify waste carrier registration and environmental permit authorisation at the point of transfer.",
              "Describe the consequence chain for breach of Duty of Care, including civil sanctions, variable monetary penalties and criminal prosecution under the Environmental Protection Act 1990 and the Environmental Permitting Regulations 2016.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Hazardous waste — what counts and what to do with it</ContentEyebrow>

          <ConceptBlock
            title="Hazardous Waste Regulations 2005 — a stricter regime layered on the Duty of Care"
            plainEnglish="The Hazardous Waste (England and Wales) Regulations 2005 (and the equivalent Special Waste Regulations 1996 in Scotland) define waste as hazardous when it has one or more of the hazardous properties listed in the Waste Framework Directive — flammable, toxic, ecotoxic, irritant, infectious, carcinogenic and similar. The catalogue (List of Waste, formerly EWC) provides codes for every recognised waste stream; codes with an asterisk are absolute hazardous, codes without are non-hazardous, and mirror codes require an assessment. Hazardous waste must travel under a Hazardous Waste Consignment Note rather than a standard waste transfer note, and the regime imposes additional duties on the producer, carrier and destination."
            onSite="Most electrical strip-outs generate at least some hazardous waste — fluorescent tubes from any commercial site refit, lead-acid batteries from older alarm or emergency-light installations, nickel-cadmium batteries from older battery-backed kit, oil-filled transformers in rare commercial applications, and asbestos-bearing items in older installations. Identifying the hazardous fraction at strip-out and routing it correctly is part of the waste segregation routine. Mixing hazardous and non-hazardous waste contaminates the entire stream and is itself a breach. A two-bin segregation (hazardous in one container, general WEEE in another) is the simplest control."
          >
            <p>
              The hazardous electrical-trade waste streams you will most commonly meet:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Fluorescent tubes (EWC 20 01 21*)</strong> — mercury-containing,
                absolute hazardous. Transport intact (do not crush) to prevent mercury
                vapour release. Specialist tube-recycling collection is the standard
                route; many wholesalers provide a take-back tube.
              </li>
              <li>
                <strong>Compact fluorescent lamps and other discharge lamps</strong> — same
                EWC code as tubes, same handling rules, same mercury content.
              </li>
              <li>
                <strong>Older transformer / capacitor units containing PCBs (EWC 16 02 09*)</strong>{' '}
                — pre-1986 ballasts and transformer oils may contain polychlorinated
                biphenyls. Specialist PCB disposal route, never general WEEE.
              </li>
              <li>
                <strong>Lead-acid batteries (EWC 16 06 01*)</strong> — old emergency
                lighting battery packs, alarm system battery packs, UPS battery strings.
                Lead is a regulated heavy metal; battery recycling is well-established.
              </li>
              <li>
                <strong>Nickel-cadmium batteries (EWC 16 06 02*)</strong> — older battery
                backed equipment. Cadmium is highly toxic; specialist recycling route.
              </li>
              <li>
                <strong>Lithium-ion batteries</strong> — listed under EWC 16 06 05 (and
                related codes); some categorisations treat damaged Li-ion as hazardous and
                some not, but the safer site practice is to treat all Li-ion as
                requiring specialist recycling and to treat damaged Li-ion as hazardous
                regardless.
              </li>
              <li>
                <strong>Asbestos-containing electrical accessories (EWC 17 06 05*)</strong>{' '}
                — pre-2000 consumer unit backplates, distribution board enclosures,
                cement-bound wiring containment in older industrial installations. Falls
                under the Control of Asbestos Regulations 2012 in addition to the
                hazardous waste regime.
              </li>
              <li>
                <strong>Waste oils (EWC 13 02 05* and related)</strong> — transformer oil,
                some heating system oils. Specialist oil recovery contractors handle the
                transport and treatment.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Hazardous Waste (England and Wales) Regulations 2005 (SI 2005/894), regulation 35 (Consignment notes)"
            clause={
              <>
                Hazardous waste shall not be removed from any premises unless a
                consignment note has been completed in accordance with the regulations,
                accompanies the waste throughout its transfer, and is signed by the
                producer or holder, the carrier, and the consignee. The producer (and
                where different the holder) shall retain a copy of the consignment note
                for a period of at least three years.
              </>
            }
            meaning={
              <>
                The consignment note is the legal instrument that distinguishes the
                hazardous waste regime from the standard Duty of Care. Skipping the
                consignment note (because it feels like extra paperwork or because the
                quantity feels small) is one of the most commonly enforced breaches in
                the hazardous waste regime. The Environment Agency uses consignment data
                to track flows and identify anomalies; producers whose hazardous waste
                outflows do not match expected production are routinely flagged for
                compliance review. Proper paperwork is the simplest defence.
              </>
            }
            cite="Source: Hazardous Waste (England and Wales) Regulations 2005, regulation 35 (paraphrased); full text at legislation.gov.uk."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The waste hierarchy — a legal duty, not a slogan</ContentEyebrow>

          <ConceptBlock
            title="Prevention beats re-use beats recycling beats recovery beats disposal"
            plainEnglish="The waste hierarchy is the order of preference for handling any waste stream. Prevention sits at the top — the best waste is the waste that never gets created. Preparation for re-use is next — repurposing items in their original form for the same or a different use. Recycling follows — material recovery for use in new manufacturing. Other recovery — including energy recovery from non-recyclable waste — sits below recycling because the material is destroyed even if some energy is captured. Disposal (typically landfill) is the last resort. Regulation 12 of the Waste (England and Wales) Regulations 2011 makes the hierarchy a legal duty on waste producers."
            onSite="On a typical electrical job the hierarchy applies in three places. First, at the order stage — accurate ordering prevents surplus material. Second, at strip-out — segregate items that could be re-used (working accessories, intact luminaires) from items destined for recycling (cable copper, plastic) from items destined for recovery or disposal (irreparable broken kit). Third, at the documentation step — the standard waste transfer note now includes a producer declaration that the hierarchy has been applied. The exercise is light-touch on a small job; on a large commercial strip-out it can identify thousands of pounds of re-usable kit that would otherwise have been bulk-recycled."
          >
            <p>
              The five levels of the hierarchy with practical electrical-trade examples:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>1. Prevention</strong> — order accurately, design out waste at
                specification stage, choose modular accessories that can be partially
                replaced rather than fully discarded. The cheapest waste is the waste that
                never existed.
              </li>
              <li>
                <strong>2. Preparation for re-use</strong> — clean and resell working
                accessories on second-hand commercial markets, donate working kit to
                community projects or charities (some accept stripped-out commercial
                lighting), retain spare parts for stock.
              </li>
              <li>
                <strong>3. Recycling</strong> — separate cable copper for scrap merchant
                sale, separate aluminium for scrap, route plastic and glass through
                appropriate recycling streams, route WEEE through AATFs for material
                recovery.
              </li>
              <li>
                <strong>4. Other recovery</strong> — non-recyclable plastics into
                energy-from-waste plant which captures the chemical energy as electricity
                and heat. Above landfill in the hierarchy because some value is recovered.
              </li>
              <li>
                <strong>5. Disposal</strong> — landfill or incineration without energy
                recovery. The last resort, used only where no higher hierarchy step is
                practicable on environmental grounds.
              </li>
            </ul>
            <p>
              Departures from the order are allowed where they deliver a better
              environmental outcome on a life-cycle assessment basis — but the burden of
              justifying the departure sits on the waste producer. In practice that means
              recording the reasoning on the waste transfer note or in the project waste
              management plan.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Waste (England and Wales) Regulations 2011 (SI 2011/988), regulation 12 (Duty in relation to the waste hierarchy)"
            clause={
              <>
                An establishment or undertaking which imports, produces, collects,
                transports, recovers or disposes of waste, or which as a dealer or broker
                has control of waste, must on the transfer of waste take all such measures
                available to it as are reasonable in the circumstances to apply the
                following waste hierarchy as a priority order: prevention; preparation
                for re-use; recycling; other recovery (including energy recovery); and
                disposal.
              </>
            }
            meaning={
              <>
                Regulation 12 is the legal hook that elevates the waste hierarchy from
                guidance to duty. Every waste transfer note in England and Wales now
                includes a producer declaration that the hierarchy has been applied. A
                contractor who routinely defaults to bulk skip disposal without
                considering re-use or recycling is in breach even if the disposal route is
                otherwise legal. The Environment Agency does not normally enforce against
                isolated minor cases but does use the regulation as a basis for systemic
                action against contractors with no demonstrable hierarchy practice.
              </>
            }
            cite="Source: Waste (England and Wales) Regulations 2011, regulation 12 (paraphrased); full text at legislation.gov.uk."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>EPR 2016 — the permitting umbrella</ContentEyebrow>

          <ConceptBlock
            title="Environmental Permitting Regulations 2016 — one framework, many activities"
            plainEnglish="The Environmental Permitting (England and Wales) Regulations 2016 (EPR 2016) consolidated dozens of older permitting regimes into one framework. EPR covers waste activities (carrying, brokering, treating, transferring, depositing), water discharges, radioactive substances and certain installations. For an electrical contractor the relevant parts of EPR are the waste carrier registration regime (lower-tier free for own-waste-only businesses, upper-tier paid for businesses carrying third-party or construction waste), the broker / dealer registration, and the environmental permitting of waste treatment destinations. Anyone the contractor transfers waste to must hold the appropriate authorisation under EPR."
            onSite="The practical compliance routine is short. Register the business as a lower-tier waste carrier with the Environment Agency (free, online, takes about ten minutes). Where waste is collected by a third party, check their waste carrier registration on the EA public register at the point of transfer. Where waste goes to a treatment destination, check the environmental permit on the EA public register before the first transfer. Keep records of the checks. The whole compliance overhead, once set up, is small per job; the cost of being caught transferring waste to an unauthorised carrier or destination is large."
          >
            <p>
              The EPR-relevant activities for an electrical contracting business:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Lower-tier waste carrier registration</strong> — free, for
                businesses carrying only their own controlled waste. Mandatory for any
                contractor transporting waste from customer sites in their own vehicles.
              </li>
              <li>
                <strong>Upper-tier waste carrier registration</strong> — paid (currently
                around 150 pounds for three years), for businesses carrying third-party
                waste or carrying construction and demolition waste from sites they did
                not generate it on. Required if the business operates as a waste
                clearance contractor in addition to electrical contracting.
              </li>
              <li>
                <strong>Broker or dealer registration</strong> — for businesses that
                arrange waste transfers without taking physical possession. Less common
                in the electrical trade.
              </li>
              <li>
                <strong>Environmental permit</strong> — for businesses operating a waste
                treatment site, energy from waste plant, or other regulated installation.
                Not normally relevant to electrical contractors but always relevant to
                the destination they send waste to.
              </li>
              <li>
                <strong>Exempt waste activities</strong> — certain low-impact waste
                activities are exempt from full permitting but require registration with
                the EA. Storage of small quantities of certain wastes pending transfer
                may fall here.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Reading and using EWC codes correctly</ContentEyebrow>

          <ConceptBlock
            title="The List of Waste structure — six digits, with the asterisk telling you everything"
            plainEnglish="The List of Waste (formerly the European Waste Catalogue, EWC) is a single hierarchical catalogue of every recognised waste type. Every entry has a six-digit code structured as chapter (first two digits, e.g. 16 for waste not otherwise specified), sub-chapter (next two digits, e.g. 06 for batteries and accumulators) and entry (final two digits, e.g. 01 for lead-acid batteries). The asterisk on an entry (e.g. 16 06 01*) marks it as absolute hazardous waste — always hazardous regardless of any test or assessment. Non-asterisked entries are non-hazardous. Mirror entries (a hazardous and a non-hazardous code describing the same general waste type) require a hazardous-property assessment to choose between them."
            onSite="Reading the EWC code is part of the waste consignment note completion task. Most electrical-trade waste streams have well-known absolute codes, so consignment note completion is mostly a matter of looking up the standard code for the waste type. Memorising the half-dozen codes you will use most often (fluorescents, batteries, asbestos-bearing materials) makes the paperwork quick. Where the waste falls under a mirror code, a competent waste contractor will handle the hazardous-property assessment and recommend the right code; you then record it on the consignment note and retain the documentation."
          >
            <p>
              The EWC chapter structure with the chapters most relevant to the
              electrical trade highlighted:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Chapter 13</strong> — oil wastes and wastes of liquid fuels
                (transformer oils, hydraulic oils).
              </li>
              <li>
                <strong>Chapter 16</strong> — wastes not otherwise specified in the
                List. Includes batteries (16 06), end-of-life vehicles, transformers
                and capacitors (16 02), out-of-spec products. The most-used chapter for
                electrical-trade hazardous waste.
              </li>
              <li>
                <strong>Chapter 17</strong> — construction and demolition wastes,
                including asbestos-containing construction materials (17 06 05*) and
                cables (17 04 11 for non-hazardous, 17 04 10* for cables containing oil
                or hazardous substances).
              </li>
              <li>
                <strong>Chapter 19</strong> — wastes from waste management facilities
                (typically downstream of the original waste generator; less relevant to
                site work).
              </li>
              <li>
                <strong>Chapter 20</strong> — municipal wastes including separately
                collected fractions. Fluorescent tubes (20 01 21*), discarded
                electrical and electronic equipment (20 01 35* hazardous, 20 01 36
                non-hazardous mirror).
              </li>
            </ul>
            <p>
              Common electrical-trade absolute hazardous codes worth memorising:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>20 01 21*</strong> — fluorescent tubes and other mercury-containing waste</li>
              <li><strong>20 01 35*</strong> — discarded EEE containing hazardous components</li>
              <li><strong>16 06 01*</strong> — lead-acid batteries</li>
              <li><strong>16 06 02*</strong> — Ni-Cd batteries</li>
              <li><strong>16 02 09*</strong> — transformers and capacitors containing PCBs</li>
              <li><strong>16 02 13*</strong> — discarded equipment containing hazardous components other than those covered by 16 02 09 to 16 02 12</li>
              <li><strong>17 06 05*</strong> — construction materials containing asbestos</li>
              <li><strong>13 02 05*</strong> — non-chlorinated mineral-based engine, gear and lubricating oils</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Verifying carriers and destinations on the EA register</ContentEyebrow>

          <ConceptBlock
            title="The 30-second compliance check — using the Environment Agency public registers"
            plainEnglish="The Environment Agency operates a public online register of authorised waste carriers, brokers and dealers. SEPA (Scotland), NRW (Wales) and NIEA (Northern Ireland) operate equivalent registers. The register lets anyone look up a carrier by registration number, business name or location to confirm the carrier is currently authorised, the tier of registration (lower or upper) and the activities permitted. A second register lists environmental permits issued under EPR 2016, allowing verification of waste treatment destinations. Both registers are free to use and the look-up takes about 30 seconds per check."
            onSite="The right routine before any first waste transfer to a new carrier or destination: ask for the carrier registration number (or environmental permit number for a treatment site), look it up on the EA public register, confirm it is current and covers the waste types and activities involved, and note the result in the project waste records. Repeat the check periodically for repeat carriers — registrations lapse and carriers occasionally lose authorisation. The cost of a 30-second check before a transfer is small; the cost of being part of a chain that routes waste to an unauthorised destination is significant under the Duty of Care."
          >
            <p>
              The compliance check routine for a new waste carrier or destination:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Ask for the registration number</strong> — every authorised
                waste carrier has a registration number issued by the EA, SEPA, NRW or
                NIEA. The number should be displayed on the carrier vehicle and on
                paperwork.
              </li>
              <li>
                <strong>Look up on the EA register</strong> — gov.uk hosts the EA Waste
                Carrier register; SEPA, NRW and NIEA host equivalent regional registers.
                Look up by registration number, business name or location.
              </li>
              <li>
                <strong>Confirm tier and activities</strong> — lower-tier covers
                businesses carrying only their own waste; upper-tier covers third-party
                and construction waste. Check the registration covers the activity
                involved.
              </li>
              <li>
                <strong>For destinations, look up the environmental permit</strong> —
                the EA Environmental Permit register lists permitted waste treatment
                sites. Confirm the permit covers the waste types and activities
                involved.
              </li>
              <li>
                <strong>Document the check</strong> — record the lookup date,
                registration / permit number and result in the project waste records.
                A simple spreadsheet log is enough.
              </li>
              <li>
                <strong>Repeat periodically</strong> — annually for repeat carriers, or
                if any concern arises about the carrier credibility.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Departures from the hierarchy — when they are justifiable</ContentEyebrow>

          <ConceptBlock
            title="When can a producer go down the hierarchy rather than up?"
            plainEnglish="Regulation 12 of the Waste (England and Wales) Regulations 2011 requires producers to take all reasonable steps to apply the waste hierarchy in order. But the regulation also recognises that strict adherence is not always the best environmental outcome — sometimes a lower hierarchy step delivers better whole-life environmental performance than a higher one when transport, treatment energy and cross-contamination are factored in. A producer may depart from the hierarchy where the departure delivers a better environmental outcome on a life-cycle assessment basis, but the burden of justification sits on the producer."
            onSite="Departures arise rarely on a typical electrical strip-out but they do occur. Examples: heavily contaminated cable that cannot be cleanly recycled may be better handled through energy recovery than through a low-quality recycling stream that produces poor-grade output. Bulky obsolete switchgear with little material recovery value may be more efficiently handled through energy from waste than through a long-distance transport to a specialist recycler. The key is to record the reasoning. The waste transfer note should note the hierarchy decision and the reason; on a larger project the project waste management plan should document the departure with supporting evidence (life-cycle considerations, transport distances, treatment options)."
          >
            <p>
              Examples of legitimate departures from the strict hierarchy order:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Heavily contaminated material</strong> — where the recycling
                output would be very low quality or where the recycling process itself
                would generate hazardous secondary waste, energy recovery may deliver
                better whole-life performance.
              </li>
              <li>
                <strong>Long-distance transport for marginal recycling gain</strong> —
                where the transport carbon outweighs the recycling benefit, local
                energy recovery can be more environmentally sound than long-distance
                specialist recycling.
              </li>
              <li>
                <strong>Negligible quantity</strong> — for very small quantities the
                administrative and environmental cost of a separate specialist stream
                may exceed the benefit; aggregation through a general WEEE stream may
                be the pragmatic answer.
              </li>
              <li>
                <strong>Health and safety risk in handling</strong> — where preparation
                for re-use or recycling would create a disproportionate health and
                safety risk to the workers handling it, a lower hierarchy step may be
                justified.
              </li>
            </ul>
            <p>
              In all cases the reasoning must be documented. An undocumented departure
              from the hierarchy looks like a Duty of Care breach; a documented one is
              defensible.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Project Waste Management Plans</ContentEyebrow>

          <ConceptBlock
            title="On larger projects, a Site Waste Management Plan is the working tool"
            plainEnglish="Site Waste Management Plans (SWMPs) were a statutory requirement for construction projects above a value threshold in England under the Site Waste Management Plans Regulations 2008 — that statutory requirement was repealed in 2013 in England, but SWMPs remain widely used as a voluntary best-practice tool and are required by some clients (BREEAM, public sector procurement, large prime contractors). A SWMP forecasts the waste types and quantities to be generated by a project, identifies the disposal routes, sets reduction and recycling targets, and tracks actual outcomes against the plan. On large electrical fit-outs and rewires the SWMP often sits within the broader project quality and environmental management documentation."
            onSite="As an apprentice on a project that uses a SWMP your role is normally data collection and segregation rather than plan authorship. The SWMP will define which waste streams are segregated on site (e.g. cable copper to one container, fluorescent tubes to another, general WEEE to a third, mixed builder waste to the skip) and which carriers are authorised for each. Following the segregation discipline accurately is part of the apprentice contribution to the SWMP. The same disciplines feed into the BREEAM Wst credits, the firm Carbon Reduction Plan scope 3 reporting and the customer sustainability questionnaires."
          >
            <p>
              The typical structure of a SWMP for an electrical fit-out:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Project description</strong> — scope, value, expected duration
                and the responsible site manager and waste champion.
              </li>
              <li>
                <strong>Waste forecast</strong> — anticipated waste streams (WEEE
                categories, hazardous waste, cable copper, packaging, mixed
                construction waste) with estimated quantities by stream.
              </li>
              <li>
                <strong>Segregation strategy</strong> — which streams are segregated on
                site, what containers are provided, which areas they are placed in.
              </li>
              <li>
                <strong>Authorised carriers and destinations</strong> — named carriers
                and destinations for each stream with registration / permit numbers
                pre-verified against the EA register.
              </li>
              <li>
                <strong>Hierarchy targets</strong> — minimum recycling rate, minimum
                re-use rate, maximum landfill rate. BREEAM-certified projects normally
                target above-95% diversion from landfill.
              </li>
              <li>
                <strong>Tracking and reporting</strong> — actual waste tonnages by
                stream, transfer note and consignment note references, comparison
                against forecast and targets.
              </li>
              <li>
                <strong>Lessons learned</strong> — captured at project closeout for
                feedback into future SWMPs.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Enforcement and the consequence chain</ContentEyebrow>

          <ConceptBlock
            title="What actually happens when the Environment Agency catches a breach"
            plainEnglish="The Environment Agency operates a graduated enforcement model that scales the regulatory response to the seriousness of the breach. Minor or first-instance breaches typically attract advice and guidance with a request to take corrective action. Repeated or more serious breaches attract civil sanctions including compliance notices, restoration notices and variable monetary penalties. The most serious breaches, including deliberate or repeated illegal disposal, attract criminal prosecution under the Environmental Protection Act 1990, the Environmental Permitting Regulations 2016 or the Hazardous Waste Regulations 2005. Penalties on conviction can include unlimited fines and, in extreme cases, imprisonment of company directors and officers personally."
            onSite="For an electrical contractor the practical exposure is mostly civil sanctions on minor breaches and reputational damage on the rest. A formal warning or variable monetary penalty appears on the public Environment Agency enforcement bulletin and will be picked up by procurement teams of any large customer doing supplier due diligence. The reputational consequences typically outweigh the direct financial penalty. The defence against this exposure is the routine compliance discipline this whole subsection has covered: segregate at source, use the right paperwork, verify carriers and destinations, retain records for the required periods, document hierarchy decisions. None of it is hard once embedded as habit; the cost of doing it well is small relative to the cost of doing it badly."
          >
            <p>
              The graduated EA enforcement model in practice:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Advice and guidance</strong> — first-instance minor breach,
                typically a written request to take corrective action with no formal
                penalty.
              </li>
              <li>
                <strong>Compliance notice</strong> — formal notice requiring specific
                corrective action by a specific date. Failure to comply escalates to
                further sanction.
              </li>
              <li>
                <strong>Restoration notice</strong> — notice requiring the operator to
                restore the environmental damage caused by the breach.
              </li>
              <li>
                <strong>Variable monetary penalty</strong> — civil financial penalty
                proportionate to the breach. Published on the EA enforcement bulletin.
              </li>
              <li>
                <strong>Enforcement undertaking</strong> — voluntary agreement between
                operator and regulator to take specified action in lieu of formal
                sanction.
              </li>
              <li>
                <strong>Stop notice</strong> — formal notice prohibiting an activity
                pending compliance.
              </li>
              <li>
                <strong>Criminal prosecution</strong> — for the most serious or repeated
                breaches. Penalties on conviction include unlimited fines for the
                company and personal liability for directors and officers in extreme
                cases.
              </li>
            </ul>
            <p>
              The graduated model means most breaches do not escalate to criminal
              prosecution — but the lower steps still carry public reporting and
              reputational consequence that affects future tendering. The compliance
              discipline is its own defence.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Treating fluorescent tubes as ordinary WEEE and routing them through the general lamp recycling stream"
            whatHappens={
              <>
                A commercial site refit generates a hundred old fluorescent tubes. The
                contractor bundles them into the WEEE collection at the wholesaler with
                the LED replacements. The wholesaler take-back is set up for non-hazardous
                lamps and accessories — not mercury-containing fluorescents. The tubes
                contaminate the lamp recycling stream, the wholesaler raises a complaint,
                and the contractor is exposed for failing to consign the hazardous waste
                correctly. The Environment Agency picks it up at the wholesaler audit.
                Civil sanction or formal warning follows.
              </>
            }
            doInstead={
              <>
                Segregate fluorescent tubes (and CFLs and other discharge lamps) into a
                dedicated container at strip-out. Transport intact — do not crush. Use a
                specialist fluorescent tube recycling carrier with the appropriate
                hazardous waste authorisation. Complete a Hazardous Waste Consignment
                Note for the transfer. Retain the consignment note for at least three
                years. The cost difference between general WEEE collection and specialist
                tube collection is small per tube and the compliance benefit is
                significant.
              </>
            }
          />

          <CommonMistake
            title="Defaulting to bulk skip disposal without considering re-use or recycling"
            whatHappens={
              <>
                A commercial fit-out generates several hundred working luminaires that the
                client wants stripped out as part of a brand refresh. The contractor
                sticks them all in a skip bound for landfill or general recycling. The
                luminaires were five years old, working, and in good condition — a
                second-hand commercial lighting market would have paid for some of them
                or taken the rest free. The waste hierarchy duty under regulation 12 has
                been ignored. On a competitive tender review the contractor cannot
                evidence any hierarchy practice and loses repeat work to a competitor
                that can.
              </>
            }
            doInstead={
              <>
                At pre-strip survey identify items that could be prepared for re-use.
                Maintain relationships with second-hand commercial fixture buyers,
                community re-use schemes and charities. Document the hierarchy decisions
                in a project waste management plan and reference them on the waste
                transfer note. The activity is largely common sense once established as
                routine; the regulatory benefit and the customer marketing benefit both
                line up with the environmental benefit.
              </>
            }
          />

          <Scenario
            title="Old commercial unit strip-out — the asbestos surprise"
            situation={
              <>
                You arrive at a small commercial unit for a full electrical strip-out
                ahead of a refit. The customer mentioned the building dates from the late
                1970s. As you start removing the old consumer unit you notice the
                backplate is a dense, fibrous, cement-like board rather than the metal or
                plastic of modern boards. The customer cannot find an asbestos register
                for the building. You have not received non-licensable asbestos training.
                What do you do?
              </>
            }
            whatToDo={
              <>
                Stop work immediately on that fitting. Do not disturb the backplate
                further. Asbestos-cement consumer unit backplates were used in some
                installations from the 1960s through the 1970s and into the 1980s; the
                visual cues you have noted are consistent with possible asbestos content.
                Without an asbestos register and without your own non-licensable asbestos
                training the right answer is to defer the work. Notify the customer in
                writing, request that they commission an asbestos survey from a UKAS
                accredited surveyor, and once the material is confirmed (or ruled out)
                arrange for either a licensed asbestos contractor or a competent
                non-licensable contractor to remove the backplate as appropriate. Do not
                proceed yourself. The waste, once removed, is hazardous waste under EWC
                17 06 05* and requires a Hazardous Waste Consignment Note to a permitted
                asbestos disposal facility.
              </>
            }
            whyItMatters={
              <>
                Asbestos remains one of the leading causes of occupational disease deaths
                in the UK trades and the regulatory regime is correspondingly strict.
                Even non-licensable asbestos work requires specific training and
                competence. The cost of a survey and a competent asbestos contractor is
                small relative to the cost of a disturbed asbestos exposure event. As an
                apprentice the safe answer is always to stop, document, and refer up.
                Customers may grumble at the delay; nobody complains in retrospect about
                an electrician who did not give them an asbestos exposure.
              </>
            }
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Chapter 57 (stationary secondary battery installations)"
            clause={
              <>
                For the purposes of Chapter 57, &apos;stationary secondary battery installations&apos;
                refers to batteries whose designed purpose is for storage and supply of electrical
                installations. Where a stationary secondary battery is incorporated into a product
                that is covered by product safety standards, Chapter 57 is not applicable to that
                battery installation.
              </>
            }
            meaning={
              <>
                When decommissioning end-of-life kit, the line between &quot;Chapter 57 stationary
                battery&quot; (home BESS) and &quot;product-integrated battery&quot; (UPS, emergency
                lighting unit) decides which disposal route applies. Get this wrong and you risk
                applying the wrong waste classification — fire-risk packaging, transport rules and
                producer-responsibility paperwork all differ.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Chapter 57."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Hazardous Waste Regulations 2005 require a Hazardous Waste Consignment Note for every transfer of hazardous waste — fluorescent tubes, PCB ballasts, batteries, asbestos-bearing items.",
              "Retain consignment notes for at least three years (versus two years for standard waste transfer notes).",
              "Environmental Permitting Regulations 2016 are the umbrella permitting framework — register as a lower-tier waste carrier (free) and check carriers / destinations on the Environment Agency public registers.",
              "The waste hierarchy under regulation 12 of the Waste (England and Wales) Regulations 2011 is a legal duty: prevention, preparation for re-use, recycling, other recovery, disposal.",
              "EWC codes ending with an asterisk (e.g. 20 01 21*) are absolute hazardous waste regardless of concentration. Mirror codes require a hazardous-property assessment.",
              "Common electrical-trade hazardous waste streams: fluorescent tubes, PCB ballasts, lead-acid batteries, nickel-cadmium batteries, asbestos-bearing electrical materials, waste oils.",
              "Mixing hazardous and non-hazardous waste contaminates the entire stream and is itself a breach. Segregate at source.",
              "The Environment Agency, SEPA, NRW and NIEA enforce. Civil sanctions, variable monetary penalties and criminal prosecution are all available.",
            ]}
          />

          <Quiz title="Hazardous waste, EPR and the hierarchy — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module2-section6-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                6.2 WEEE and lithium-ion safety
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module2-section6-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                6.4 EPDs and cable manufacturer disclosures
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
