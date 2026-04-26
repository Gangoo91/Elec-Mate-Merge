/**
 * Module 1 · Section 1 · Subsection 5 — Environmental legislation and waste
 *
 * AC mapping (Unit 201):
 *   • AC 1.2 — Environmental legislation: roles and responsibilities of duty-
 *     holders (Environmental Protection Act 1990, Hazardous Waste Regs 2005,
 *     WEEE 2013).
 *   • AC 2.5 — Environmental impact of work activities (waste streams, hazards,
 *     fluorescent tubes, batteries, copper recovery).
 *   • AC 2.6 — Waste processing on site (segregation, Site Waste Management
 *     Plans, Duty of Care, transfer notes / consignment notes).
 *   • AC 4.1 — GB CLP hazard pictograms (the nine GHS symbols you’ll meet on
 *     COSHH-controlled stock — solvents, batteries, sealants, primers, gases).
 *
 * Voice + structure follow Module 1 §1.1 (HASAWA) — apprentice-first, money +
 * consequence framing, RegsCallouts paraphrased where the original statute is
 * paraphrased (labelled per § 6 of COURSE_DESIGN_PATTERN).
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
  'Environmental legislation and waste (EPA 1990, Hazardous Waste Regs, WEEE, GB CLP) | Level 2 Module 1.1.5 | Elec-Mate';
const DESCRIPTION =
  "An apprentice’s guide to environmental law on site. Why your van full of old tubes is regulated waste, who pays the fine when it isn’t, and the nine pictograms on the back of every solvent tin.";

/* ── Inline check questions (preserved — wired into stats/streaks) ── */

const checks = [
  {
    id: 'epa-duty-of-care-check',
    question: "What is the 'Duty of Care' under section 34 of the Environmental Protection Act 1990?",
    options: [
      "A duty to look after wildlife on construction sites",
      "A duty on anyone who produces, holds or transports waste to make sure it’s handled safely and only passed to an authorised carrier",
      "A duty to recycle 50% of all materials",
      "A duty to fit solar panels to your van",
    ],
    correctIndex: 1,
    explanation:
      "Section 34 EPA puts a chain of responsibility on everyone who touches the waste — producer, holder, carrier, disposer. You have to make sure the next person down the chain is licensed to take it. If they fly-tip your old tubes in a lay-by, the trail comes back to you.",
  },
  {
    id: 'weee-check',
    question: "Your last job left you with a box of dead LED drivers and two old fluorescent fittings. Where do they legally go?",
    options: [
      "General waste skip — they’re just plastic and metal",
      "WEEE waste stream — separated, recorded, taken to a permitted recycler",
      "Bin them in the customer’s wheelie bin",
      "Take them home for the council kerbside collection",
    ],
    correctIndex: 1,
    explanation:
      "Anything with a plug, a battery or a circuit board is WEEE (Waste Electrical and Electronic Equipment) under the WEEE Regs 2013. Fluorescent fittings count too. They go to a permitted WEEE recycler, with a transfer note. General skip = breach.",
  },
  {
    id: 'clp-pictogram-check',
    question: "You pick up a tin of cable lubricant on site. The label has a black exclamation mark in a red diamond. What does that pictogram mean?",
    options: [
      "Highly flammable — keep away from sparks",
      "Toxic — life-threatening if swallowed",
      "Health hazard / irritant — can irritate skin, eyes or airways",
      "Environmental hazard — harmful to fish",
    ],
    correctIndex: 2,
    explanation:
      "The exclamation mark pictogram (GHS07) means irritant / harmful — skin or eye irritation, respiratory irritation, or acute toxicity at the milder end. Different from the skull (GHS06 = toxic) and the flame (GHS02 = flammable). Nine pictograms total under GB CLP — worth knowing them all.",
  },
];

/* ── End-of-page Quiz (preserved — wires into stats/streaks) ──────── */

const quizQuestions = [
  {
    id: 1,
    question: 'Which Act is the parent piece of UK environmental legislation that sets the Duty of Care for waste?',
    options: [
      'Health and Safety at Work Act 1974',
      'Environmental Protection Act 1990',
      'Building Act 1984',
      'Clean Air Act 1956',
    ],
    correctAnswer: 1,
    explanation:
      "The EPA 1990 is the parent statute. Section 34 sets the Duty of Care for waste; section 33 makes unauthorised deposit / disposal of waste an offence. Most other waste regs (Hazardous Waste Regs, WEEE) sit underneath it.",
  },
  {
    id: 2,
    question: 'You produce 200 kg of hazardous waste in a year at one site. What paperwork do you need when it leaves?',
    options: [
      'Nothing — it’s under the threshold',
      'A standard waste transfer note',
      'A hazardous waste consignment note (kept for 3 years)',
      'A BS 7671 minor works certificate',
    ],
    correctAnswer: 2,
    explanation:
      "Hazardous waste (fluorescent tubes, lead-acid batteries, solvents, asbestos) needs a hazardous waste consignment note under the Hazardous Waste (England and Wales) Regulations 2005. Producer and carrier both keep a copy for at least 3 years. Standard transfer notes are for non-hazardous waste only.",
  },
  {
    id: 3,
    question: "Under WEEE 2013, who is responsible for the cost of recycling commercial electrical equipment at end of life?",
    options: [
      'The end-user always pays',
      'The original producer / importer (Producer Responsibility) — usually via a compliance scheme',
      'The local council',
      'The HSE',
    ],
    correctAnswer: 1,
    explanation:
      "WEEE works on Producer Responsibility — whoever first puts the kit on the UK market pays into a compliance scheme that funds the recycling. That’s why dropping old commercial light fittings at a permitted WEEE site usually costs the producer / importer, not you.",
  },
  {
    id: 4,
    question: 'A fluorescent tube smashes in the back of your van. Why does that matter beyond the broken glass?',
    options: [
      "It doesn’t — sweep it up and bin it",
      "Tubes contain mercury vapour and phosphor powder — both regulated as hazardous; ventilate, don’t sweep up dry, double-bag",
      "Tubes are a fire hazard",
      "Only a problem if the customer sees it",
    ],
    correctAnswer: 1,
    explanation:
      "Old-style fluorescent tubes contain a small amount of mercury vapour plus a phosphor coating. A breakage releases both. HSE guidance says ventilate the area, avoid dry sweeping (use damp paper / cloth), wear gloves, double-bag in a sealed labelled bag, take to a permitted hazardous waste site. Don’t hoover — it spreads the mercury.",
  },
  {
    id: 5,
    question: "What does a Site Waste Management Plan (SWMP) do?",
    options: [
      'Lists every screw used on site',
      'Forecasts the waste a project will produce, sets segregation + recycling targets, records what actually happened',
      "Replaces the Duty of Care",
      'Is the same as a RAMS document',
    ],
    correctAnswer: 1,
    explanation:
      "SWMPs were mandatory in England 2008–2013 (then revoked as a legal requirement) but most main contractors STILL require one because they’re core to ISO 14001 environmental management and to the BREEAM scoring on most commercial jobs. As an apprentice you’ll be told which skip is which — that’s the SWMP at work.",
  },
  {
    id: 6,
    question: 'Which GB CLP pictogram is a flame over a circle?',
    options: [
      'Flammable (GHS02)',
      'Oxidising (GHS03) — can intensify fire / cause a fire by giving off oxygen',
      'Explosive (GHS01)',
      'Health hazard (GHS08)',
    ],
    correctAnswer: 1,
    explanation:
      "Flame-over-circle = oxidiser. Different from the plain flame (GHS02 = flammable). Oxidisers like nitrate-based products or peroxides give off oxygen and can make a small fire much worse. You’ll see it on some industrial cleaners.",
  },
  {
    id: 7,
    question: "Cable offcuts: copper inside, PVC outside. Best practice on site?",
    options: [
      "All in the general skip",
      "Strip the copper for the recycler, bag the PVC sleeve for separate disposal — most metal merchants pay for clean copper",
      "Burn the PVC off the copper to make stripping faster",
      "Take the lot home",
    ],
    correctAnswer: 1,
    explanation:
      "Clean copper is worth real money at a scrap merchant — most firms have an arrangement and the lads share the proceeds. Burning PVC off cable is illegal under the Environmental Permitting Regs (releases dioxins) AND under the Clean Air Act. Mechanical stripping or send mixed cable to a licensed recycler.",
  },
  {
    id: 8,
    question: 'You finish a job and drop the customer’s broken washing machine at a mate’s metal yard who isn’t licensed. What’s the legal risk?',
    options: [
      'No risk — it’s just metal',
      "Breach of EPA s.34 Duty of Care — you passed waste to an unauthorised person; fixed penalty up to £5,000 or unlimited fine on indictment",
      "Just a £100 fine",
      'Only the mate gets in trouble',
    ],
    correctAnswer: 1,
    explanation:
      "The Duty of Care chain is yours until the waste reaches an authorised carrier or permitted site. Hand it to an unlicensed mate and you’ve breached EPA s.34 — fixed penalty notices start around £300, go up to £5k summary, unlimited fine + criminal record on indictment. Always check the carrier’s waste licence number before handing anything over.",
  },
];

/* ── FAQs (apprentice voice) ──────────────────────────────────────── */

const faqs = [
  {
    question: "Why does environmental law care about an electrician? I’m not a chemical plant.",
    answer:
      "Because a single van does more environmental damage than people think. An electrician working full-time generates fluorescent tubes, LED drivers, dead batteries, copper offcuts, sealant tubes, contact cleaner, isopropyl alcohol, broken switchgear — most of it regulated. Multiply by 250,000 electricians in the UK and you’ve got a significant waste stream. The law treats your van as a mobile waste-producing site, same as a factory.",
  },
  {
    question: "What’s the difference between a transfer note and a consignment note?",
    answer:
      "Transfer note = non-hazardous waste, simpler form, kept 2 years. Consignment note = HAZARDOUS waste (fluorescent tubes, lead-acid batteries, solvents, asbestos, anything carrying a CLP hazard pictogram), more detail, kept 3 years. Both are paper trails proving you handed the waste to someone licensed. No paperwork = no defence if it shows up in a hedgerow.",
  },
  {
    question: "Do I really have to keep that pile of old fluorescent tubes separate?",
    answer:
      "Yes. Fluorescent tubes contain mercury — they’re classified as hazardous waste under the Hazardous Waste Regs 2005, code 20 01 21*. They go in a dedicated tube box (your wholesaler sells them or takes them back), kept upright, away from impact, with a consignment note when collected. Mixing them into general waste = Duty of Care breach AND a Hazardous Waste Regs offence. Two breaches, one bin.",
  },
  {
    question: "What about LED tubes — are they hazardous too?",
    answer:
      "LED tubes are still WEEE under the 2013 regs, so they go down the WEEE waste stream — but most aren’t classed as hazardous in the same way fluorescents are (no mercury). They contain electronics, small amounts of solder, sometimes small batteries on emergency-fitted ones. Permitted WEEE recycler, transfer note, done.",
  },
  {
    question: "I’ve never seen a CLP pictogram tested in college. Why bother learning all nine?",
    answer:
      "Recognising the GB CLP pictograms is on the syllabus for a reason — every can of contact cleaner, sealant, primer, lubricant, paint, solvent and battery on your van has them on the label. Knowing what each one means is what stops you putting an oxidiser next to a flammable in a hot van in summer. That’s real-world COSHH applied through CLP labelling.",
  },
  {
    question: "Site Waste Management Plans — aren’t those a thing of the past?",
    answer:
      "The legal requirement (the SWMP Regs 2008) was scrapped in 2013 in England — but the practice didn’t go anywhere. Main contractors on commercial sites still require one because (a) it’s a BREEAM credit, (b) it’s a core part of ISO 14001 environmental management, and (c) it’s still law in some other UK administrations. As an apprentice you’ll see the segregated skips and the colour-coded labels — that’s an SWMP being executed even if no one calls it that.",
  },
];

export default function Sub5() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 1
          </button>

          <PageHero
            eyebrow="Module 1 · Section 1.1 · Subsection 5"
            title="Environmental legislation and waste"
            description="Fines aren’t just for spills — your van’s full of WEEE. The EPA, the Hazardous Waste Regs, WEEE 2013, the nine GB CLP pictograms, and what to actually do with the box of dead fluorescent tubes after a strip-out."
            tone="emerald"
          />

          <TLDR
            points={[
              "Environmental Protection Act 1990 is the parent law. Section 34 = Duty of Care for waste. Breach it and the fine follows YOU, not just the supervisor.",
              "Anything with a plug, battery or circuit board is WEEE — segregated, recorded, only handed to a permitted recycler. Fluorescent tubes are hazardous waste because of the mercury.",
              "Nine GB CLP pictograms cover everything from flammable solvents to environmental hazards. They’re on every COSHH-controlled tin in the van — learn the lot.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Name the main UK environmental laws that affect electrical work and explain who carries which duty (AC 1.2).",
              "Describe the environmental impact of common electrical work activities — copper offcuts, PVC, fluorescent tubes, WEEE, packaging (AC 2.5).",
              "Apply on-site waste processing rules: segregation, Site Waste Management Plans, transfer notes vs hazardous waste consignment notes (AC 2.6).",
              "Recognise the nine GB CLP hazard pictograms and explain what each one means in plain English (AC 4.1).",
              "Know who to call when waste paperwork goes missing or you spot illegal dumping on a job.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why environmental law matters on site</ContentEyebrow>

          <ConceptBlock title="Fines aren’t just for oil spills — your van’s a mobile waste site">
            <p>
              People hear "environmental law" and picture an oil refinery. Reality is closer to home.
              A working electrician generates a steady stream of regulated waste every week — old
              fluorescent tubes, dead emergency lights, smoke alarm packs, drill batteries, contact
              cleaner cans, sealant tubes, copper offcuts, PVC sleeve, broken switchgear. Most of it
              is covered by at least one of three regs: the{' '}
              <strong>Environmental Protection Act 1990</strong>, the{' '}
              <strong>Hazardous Waste Regulations 2005</strong>, or the{' '}
              <strong>WEEE Regulations 2013</strong>.
            </p>
            <p>
              When the Environment Agency turns up at a fly-tipping site and finds three old
              consumer units in a layby, they don’t just trace the white van. They trace the boxes
              back to the wholesaler invoice, then back to the firm, then to the electrician who signed
              the job sheet. That’s the Duty of Care chain in action — and it ends with whoever
              dropped the ball, not whoever did the dumping.
            </p>
            <p>
              Same way HASAWA puts a personal duty on you (s.7), the EPA puts a personal duty on
              you for any waste you’ve handled. "I just put it in the van, the foreman dealt with
              it" isn’t a defence under s.34. You touched it, you’re in the chain.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The parent statute</ContentEyebrow>

          <ConceptBlock
            title="Environmental Protection Act 1990 — the umbrella"
            plainEnglish="The big environmental law in the UK. Most other waste and pollution regs sit underneath it. Section 33 makes illegal dumping an offence. Section 34 puts a Duty of Care on anyone who handles waste."
            onSite="Every time the supervisor signs a transfer note for a skip pickup, that’s s.34 EPA being executed. Every time someone fly-tips and gets caught, that’s s.33."
          >
            <p>
              The EPA is to environmental law what HASAWA is to safety law — the umbrella. It came
              in to clean up a patchwork of older Acts (Control of Pollution Act 1974, Public Health
              Acts) and put one general framework over the top.
            </p>
            <p>The bits that matter on site:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Section 33</strong> — offence to deposit, treat or dispose of controlled
                waste without an environmental permit. This is the fly-tipping offence. Unlimited
                fine, up to 5 years inside on indictment.
              </li>
              <li>
                <strong>Section 34</strong> — the Duty of Care. Anyone who imports, produces,
                carries, keeps, treats or disposes of waste has to take all reasonable steps to make
                sure it’s handled properly and only passed to an authorised person.
              </li>
              <li>
                <strong>Section 79</strong> — statutory nuisance (noise, smoke, fumes, dust). Electricians
                meet this when running gennies overnight or generating dust on a refurb.
              </li>
            </ul>
            <p>
              Every other waste reg you’ll meet — Hazardous Waste, WEEE, Batteries, Packaging — is a
              specific implementation of the EPA’s general principles, dialled in for a particular
              waste stream.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Environmental Protection Act 1990 — section 34(1) (paraphrased)"
            clause="It shall be the duty of any person who imports, produces, carries, keeps, treats or disposes of controlled waste, or as a broker has control of such waste, to take all such measures as are reasonable in the circumstances: to prevent any contravention by any other person of section 33; to prevent the escape of the waste; to secure that the waste is transferred only to an authorised person or to a person for authorised transport purposes; and on the transfer of the waste, to secure that it is accompanied by a written description sufficient to enable other persons to comply with their duty under this section."
            meaning={
              <>
                Plain English: if you’ve touched the waste, you’re responsible for what happens to
                it next. You have to (a) stop it escaping, (b) only hand it to someone licensed,
                and (c) provide written paperwork describing what it is. That’s the basis of every
                waste transfer note and every hazardous waste consignment note you’ll ever sign.
              </>
            }
            cite="Source: Environmental Protection Act 1990, s.34 (paraphrased — refer to legislation.gov.uk for the verbatim text)."
          />

          <SectionRule />

          <ContentEyebrow>The hazardous bit</ContentEyebrow>

          <ConceptBlock
            title="Hazardous Waste Regulations 2005 — when the Duty of Care steps up"
            plainEnglish="Some waste is more dangerous than the rest. Mercury in fluorescent tubes, lead in old switchgear batteries, asbestos, solvents, oily rags. The Hazardous Waste Regs treat those streams more strictly — separate paperwork, separate storage, separate carriers."
            onSite="Your wholesaler sells dedicated tube boxes for a few quid. They take a stack of fluorescents, keep them upright, and the wholesaler often takes them back when you collect new stock. That’s your hazardous waste route, sorted before you even leave the trade counter."
          >
            <p>
              The Hazardous Waste (England and Wales) Regulations 2005 (and the Special Waste
              Regulations in Scotland) define a long list of waste types as "hazardous" using the
              List of Wastes (LoW) codes. The ones an electrician meets regularly:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>20 01 21*</strong> — fluorescent tubes and other mercury-containing waste.
              </li>
              <li>
                <strong>16 06 01*</strong> — lead-acid batteries (vehicle batteries, larger UPS
                packs, some emergency lighting batteries).
              </li>
              <li>
                <strong>16 06 04 / 05</strong> — alkaline and other batteries (PP9, AAs from
                detectors). Not all are starred-hazardous, but treated as WEEE / batteries
                separately under the Batteries Regs 2009.
              </li>
              <li>
                <strong>15 01 10*</strong> — packaging containing residues of dangerous substances
                (empty contact cleaner cans, primer tins).
              </li>
              <li>
                <strong>17 09 03*</strong> — construction waste containing dangerous substances
                (asbestos board offcuts, lead flashing).
              </li>
            </ul>
            <p>
              Two key procedural differences from non-hazardous waste:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Hazardous waste consignment note (HWCN)</strong>, not a standard transfer
                note. Producer + carrier + receiver each keep a copy for at least 3 years. The
                Environment Agency can audit any of you at any time.
              </li>
              <li>
                <strong>Mixing is an offence.</strong> Putting hazardous waste in with general
                waste, or mixing two different hazardous wastes, is a separate offence under reg 19
                — even if you eventually take it to a permitted site.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Hazardous Waste (England and Wales) Regulations 2005 — reg 19 (paraphrased)"
            clause="No establishment or undertaking which produces, collects or transports hazardous waste, or which as a dealer or broker arranges for the disposal or recovery of hazardous waste, may mix that waste with another category of hazardous waste, with non-hazardous waste, or with any other substance or material, except where the mixing operation is carried out at an authorised facility under an environmental permit."
            meaning={
              <>
                One sentence to remember: <strong>don’t mix.</strong> You cannot put a fluorescent
                tube in a general waste skip. You cannot put a leaking battery in with cardboard.
                Mixing is its own offence — and the fact that you "were going to deal with it later"
                doesn’t help. Segregate at the point you generate the waste.
              </>
            }
            cite="Source: Hazardous Waste (England and Wales) Regulations 2005 (SI 2005/894), reg 19 (paraphrased — refer to legislation.gov.uk for the verbatim text)."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Anything with a plug or a chip</ContentEyebrow>

          <ConceptBlock
            title="WEEE Regulations 2013 — Producer Responsibility for electricals"
            plainEnglish="WEEE = Waste Electrical and Electronic Equipment. The 2013 regs say whoever first put the equipment on the UK market has to fund its end-of-life recycling — usually via a compliance scheme."
            onSite="That’s why most wholesalers will take your old fluorescent tubes, dead emergency packs, even broken consumer units back when you bring new stock in. The producer’s already paid for it through the scheme."
          >
            <p>
              The Waste Electrical and Electronic Equipment Regulations 2013 (the "WEEE Regs")
              implement the EU WEEE Directive in UK law (kept after Brexit). The principle is
              "Producer Responsibility" — the person who first puts the kit on the UK market is on
              the hook for what happens at end of life.
            </p>
            <p>WEEE is split into 14 categories. The ones an electrician meets:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Category 5 (lighting equipment)</strong> — fluorescent fittings, LED
                fittings, control gear, drivers, transformers.
              </li>
              <li>
                <strong>Category 13 (gas discharge lamps)</strong> — fluorescent tubes themselves
                (also hazardous because of mercury — gets the consignment note treatment too).
              </li>
              <li>
                <strong>Category 1 / 2 (large + small household appliances)</strong> — anything you
                disconnect on a kitchen rip-out.
              </li>
              <li>
                <strong>Category 6 (electrical and electronic tools)</strong> — your dead drill,
                broken SDS, knackered MFT.
              </li>
            </ul>
            <p>
              For an electrician, the practical impact:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                You can drop WEEE off at any "Designated Collection Facility" (DCF) — most council
                tips count, plus most electrical wholesalers.
              </li>
              <li>
                On commercial jobs, the WEEE waste stream is usually arranged separately by the
                main contractor — you’ll see the WEEE cage on site.
              </li>
              <li>
                Transfer notes still apply — a DCF will give you (or the firm) a receipt that
                doubles as the paperwork.
              </li>
            </ul>
          </ConceptBlock>

          <Scenario
            title="Refurb job: 200 old fluorescent tubes from a school strip-out"
            situation={
              <>
                You and the supervisor are stripping out an old school office block — 200+ T8
                fluorescent fittings to come out, replace with LED panels. The skip’s in the
                playground. Foreman from another trade says "stick the lot in there, mate, easier
                that way".
              </>
            }
            whatToDo={
              <>
                Don’t. The tubes are hazardous waste (mercury, code 20 01 21*) AND WEEE (gas
                discharge lamps). They go in dedicated tube boxes — most wholesalers loan them out
                — kept upright, packed so they can’t break, and collected by a permitted carrier
                with a hazardous waste consignment note. The fittings themselves are WEEE Category
                5 — separate cage on site, transfer note from the WEEE recycler. Two waste streams,
                two pieces of paperwork.
              </>
            }
            whyItMatters={
              <>
                Putting 200 mercury tubes in a general skip is three offences in one go: EPA s.34
                (Duty of Care), Hazardous Waste Regs reg 19 (mixing), and WEEE Regs (failing to
                separate). Environment Agency fixed penalties on a job that size start in the
                low-thousands per breach and can go to unlimited on indictment. Plus the school
                will fail their environmental audit and your firm won’t be back next year.
              </>
            }
          />

          <CommonMistake
            title="Bagging fluorescent tubes with general waste 'just this once'"
            whatHappens={
              <>
                One of the lads sweeps a few cracked tubes into the general skip at the end of a
                Friday because the dedicated box is on Monday’s wagon. Skip company tips it, glass
                cuts a sorter on the conveyor, mercury exposure gets logged. RIDDOR notification
                kicks in, the Environment Agency follows the trail back through the transfer note,
                two breaches stack: EPA s.34 (Duty of Care, mixed waste streams) plus Hazardous
                Waste Regs reg 19 (mixing). Fixed penalty around £300 minimum, easily £5k+ if it
                goes formal.
              </>
            }
            doInstead={
              <>
                Tubes go in the tube box, full stop. If the box isn’t there, leave the tubes
                somewhere safe (upright, taped together, out of traffic) until it is. Five minutes
                of inconvenience beats a Duty of Care prosecution and an injured worker.
              </>
            }
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Site Waste Management Plans</ContentEyebrow>

          <ConceptBlock
            title="SWMPs — gone as a legal requirement, alive on every commercial site"
            plainEnglish="A Site Waste Management Plan is a document that forecasts the waste a project will produce, sets segregation targets, and records what actually happened. Mandatory under the SWMP Regs 2008–2013, then revoked in England — but main contractors still require them through ISO 14001 and BREEAM."
            onSite="As an apprentice you usually don’t write the SWMP — you live in it. The labelled skips, the colour-coded waste cages, the segregation rules in the site induction — all of that is the SWMP being executed."
          >
            <p>
              The Site Waste Management Plans Regulations 2008 made SWMPs mandatory on construction
              projects over £300k in England. They were revoked in 2013 as part of a deregulation
              push — but practically, they didn’t go anywhere because:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Main contractors carrying <strong>ISO 14001</strong> (environmental management
                certification) need an SWMP-equivalent on every project to keep their cert.
              </li>
              <li>
                <strong>BREEAM</strong> (the main UK sustainability rating for buildings) gives
                credits for waste plans and segregation — points the developer wants.
              </li>
              <li>
                Most public-sector procurement frameworks <em>require</em> an SWMP as a contract
                condition.
              </li>
            </ul>
            <p>What an SWMP actually contains:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Forecast</strong> — what waste streams the job will generate, by tonnage.
              </li>
              <li>
                <strong>Segregation plan</strong> — which skips/cages, what goes where, where they
                live on site.
              </li>
              <li>
                <strong>Carrier list</strong> — who’s licensed to take each stream, with their
                Environment Agency Waste Carrier registration number.
              </li>
              <li>
                <strong>Recording</strong> — actual quantities removed, transfer notes / consignment
                notes filed.
              </li>
              <li>
                <strong>Targets</strong> — typically 90%+ diverted from landfill, X% reused on site.
              </li>
            </ul>
            <p>
              Your job as an apprentice: read the site induction, follow the segregation, ask if
              you’re not sure which skip something goes in. Wrong skip = SWMP breach = the firm
              gets pulled up at the next site walk.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Your stream-by-stream playbook</ContentEyebrow>

          <ConceptBlock
            title="Cable offcuts and PVC strippings — the scrap that pays you back"
            plainEnglish="Copper has real money in it. Most firms have a deal with a local metal merchant — clean copper out, cash in. PVC sleeve goes the other way."
            onSite="The 'tin' in the back of the van for offcuts pays for the Christmas night out at most firms. Don’t bin it — strip and save it."
          >
            <p>
              Copper prices move with global markets but clean copper has been worth roughly
              £4–£7/kg over the last few years. A busy commercial electrician generates several kilos a
              week. That adds up.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Clean copper</strong> (stripped, no sleeve, no tinning) — best price,
                straight to the metal merchant.
              </li>
              <li>
                <strong>Bright wire</strong> (single solid core, freshly cut) — second best.
              </li>
              <li>
                <strong>Mixed cable</strong> (copper inside, PVC sleeve still on) — taken at lower
                rate, sometimes by the kg, sometimes by truck-load.
              </li>
              <li>
                <strong>PVC sleeve / strippings</strong> — bagged separately, goes to plastics
                recycling. Don’t put it in general waste if you can avoid it.
              </li>
            </ul>
            <p>
              <strong>One thing you cannot do:</strong> burn the PVC off cable to strip it faster.
              It’s illegal under the Environmental Permitting Regs (uncontrolled combustion of
              waste) AND the Clean Air Act AND it releases dioxins, which are very persistent
              carcinogens. Mechanical strippers exist, or send mixed cable to a licensed cable
              recycler who runs it through a granulator.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Mercury in fluorescent tubes — handling and breakage protocol"
            plainEnglish="Old-style fluorescent tubes (T8, T12, compact fluorescents) contain a small amount of mercury vapour and a phosphor coating. Both are hazardous. Whole tubes are fine if handled carefully. Broken tubes need a specific clean-up routine."
            onSite="Tube boxes from the wholesaler are designed to stop breakage in transit. Always upright, always labelled, never in the back of a moving van without packing."
          >
            <p>
              A typical 1500mm T8 fluorescent contains about 5 milligrams of mercury — not a huge
              amount, but mercury bioaccumulates and is toxic to the nervous system. Multiply by
              the 200 tubes from a school strip-out and you’re moving a regulated quantity.
            </p>
            <p>
              <strong>Whole tubes (the normal case):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Stored upright in a dedicated tube box (most wholesalers loan them).
              </li>
              <li>
                Box labelled "Hazardous Waste" with the LoW code 20 01 21*.
              </li>
              <li>
                Collected by a permitted hazardous waste carrier with a consignment note.
              </li>
            </ul>
            <p>
              <strong>If a tube breaks (HSE / EA guidance):</strong>
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-orange-400/70">
              <li>
                <strong>Ventilate the area</strong> — open doors and windows, leave for at least
                10–15 minutes.
              </li>
              <li>
                <strong>Don’t hoover.</strong> A hoover spreads mercury vapour through its exhaust
                and contaminates the machine.
              </li>
              <li>
                <strong>Don’t sweep dry.</strong> Use damp paper towel or a damp cloth to pick up
                glass and powder.
              </li>
              <li>
                Wear nitrile gloves. Skin contact with mercury is bad news.
              </li>
              <li>
                Double-bag the lot in a sealed plastic bag, label it, treat it as hazardous waste.
              </li>
              <li>
                Ventilate the room for several hours afterwards if you can.
              </li>
            </ol>
          </ConceptBlock>

          <ConceptBlock
            title="Battery waste — PP3, AA, lithium drill packs, lead-acid"
            plainEnglish="Batteries are NEVER general waste. They’re covered by the Waste Batteries Regulations 2009 (separate stream from WEEE). Lithium packs in particular are a fire risk in waste streams."
            onSite="Most builders' merchants have a battery box at the trade counter. Drop your dead AAs and PP3s in there. Lithium drill packs go to a specialist — your tool retailer usually accepts them under their producer scheme."
          >
            <p>
              The Waste Batteries and Accumulators Regulations 2009 cover all batteries — portable
              (AAs, PP3, button cells, drill packs), industrial (UPS), and automotive (lead-acid).
              Producers fund the recycling through compliance schemes. Disposal routes differ by
              type.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>AAs, PP3, button cells</strong> — battery drop-off bin at any retailer
                selling more than 32kg of batteries a year (most supermarkets, builders' merchants,
                wholesalers).
              </li>
              <li>
                <strong>Lithium drill packs / power tool batteries</strong> — return to retailer
                under their producer compliance, OR a permitted WEEE site that handles lithium.
                NEVER in general waste — fire risk in compactors.
              </li>
              <li>
                <strong>Lead-acid (vehicle, large UPS, some EM lighting backup)</strong> — hazardous
                waste, code 16 06 01*, consignment note required, scrap merchant pays for the lead.
              </li>
              <li>
                <strong>Smoke-alarm batteries (PP3 lithium long-life)</strong> — battery drop-off
                if removed; some have a sealed 10-year battery integrated, in which case the whole
                alarm goes WEEE.
              </li>
            </ul>
            <p>
              Lithium fires in waste vehicles are a growing problem nationally — one bin lorry
              fire from a single damaged drill pack can write off a £200k vehicle. That’s why the
              segregation isn’t just paperwork.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Reading the labels — GB CLP pictograms (AC 4.1)</ContentEyebrow>

          <ConceptBlock
            title="The nine hazard pictograms you need to know"
            plainEnglish="GB CLP = Great Britain Classification, Labelling and Packaging Regulation. It’s the UK version of the global GHS (Globally Harmonised System). Nine red-bordered diamond pictograms cover every chemical hazard you’ll meet on site."
            onSite="Look at the back of the next can of contact cleaner you pick up. There’ll be one or two of these diamonds on the label. Each one tells you something specific you need to do — ventilation, gloves, no naked flame, lock it away from the oxidiser."
          >
            <p>
              Under GB CLP (which mirrors the EU CLP Regulation 1272/2008 — kept post-Brexit),
              every hazardous substance sold in Great Britain has to carry the appropriate
              pictogram(s) plus a signal word ("Warning" or "Danger"), hazard statements (H-codes)
              and precautionary statements (P-codes). The nine pictograms:
            </p>
            <ul className="space-y-2 list-none pl-0">
              <li>
                <strong>1. Exploding bomb (GHS01) — Explosive.</strong> Self-reactive substances,
                explosives, organic peroxides. Rare on an electrician’s van but you’ll see it in some
                aerosol propellants.
              </li>
              <li>
                <strong>2. Flame (GHS02) — Flammable.</strong> The big one for electricians. Contact
                cleaner, IPA wipes, electrical solvents, some sealants. Means: keep away from heat,
                sparks, open flames, hot surfaces.
              </li>
              <li>
                <strong>3. Flame over circle (GHS03) — Oxidiser.</strong> Substances that release
                oxygen and intensify fire. Less common on site but you’ll meet it on some
                industrial cleaners and pool chemicals.
              </li>
              <li>
                <strong>4. Gas cylinder (GHS04) — Gas under pressure.</strong> Compressed, liquefied
                or refrigerated gases. Aerosol cans of contact cleaner often carry both this and the
                flame symbol. Means: store cool, don’t pierce, don’t leave in a hot van.
              </li>
              <li>
                <strong>5. Corrosive (GHS05) — Skin / metal corrosive.</strong> Hand on a dripping
                liquid above a damaged metal bar. Acids (drain cleaner, descaler), strong alkalis
                (oven cleaner). Means: full-face protection, gloves, ventilation.
              </li>
              <li>
                <strong>6. Skull and crossbones (GHS06) — Acute toxic.</strong> Life-threatening
                even at small doses (oral, dermal, inhalation). Less common on an electrician’s tools but
                you’ll see it on some specialist solvents and pesticides.
              </li>
              <li>
                <strong>7. Exclamation mark (GHS07) — Irritant / harmful.</strong> Skin or eye
                irritant, respiratory irritant, mild acute toxicity, sensitiser. The most common
                pictogram on the van — most spray cleaners, lubricants, cable pulling compounds.
              </li>
              <li>
                <strong>8. Health hazard (GHS08) — Serious health hazard.</strong> Outline of a
                person with a starburst over the chest. Carcinogens, mutagens, reproductive
                toxicity, target organ toxicity (liver, kidney), respiratory sensitisers (asthma).
                Some old paint solvents and degreasers carry this.
              </li>
              <li>
                <strong>9. Environment (GHS09) — Hazardous to the environment.</strong> Dead tree
                and dead fish. Aquatic toxicity. Some lubricants and surface coatings. Means: don’t
                let it reach drains or watercourses.
              </li>
            </ul>
            <p>
              The pictograms come with <strong>signal words</strong>: "Danger" (more severe) or
              "Warning" (less severe), plus <strong>H-statements</strong> (Hazard) and{' '}
              <strong>P-statements</strong> (Precautionary) on the label. Your COSHH risk
              assessment for a substance is built straight off this label data.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Great Britain CLP Regulation — Article 17 (paraphrased)"
            clause="A hazardous substance or mixture supplied in the Great Britain market shall be labelled with: the supplier’s name, address and telephone number; the nominal quantity; product identifiers; where applicable, hazard pictograms; where applicable, signal words; where applicable, hazard statements; where applicable, the appropriate precautionary statements; and a section for supplemental information where applicable."
            meaning={
              <>
                Every CLP-controlled substance you’ll meet has the full label package — pictogram(s)
                + signal word + H-statements + P-statements + supplier details. That label IS your
                first risk assessment for the substance. Read it before you crack the seal.{' '}
                <strong>No label = don’t use the substance.</strong> Decanted into an unlabelled
                bottle is a COSHH offence and a CLP supply offence rolled into one.
              </>
            }
            cite="Source: REACH and CLP (Amendment etc.) (EU Exit) Regulations 2020 — implementing GB CLP. Refer to HSE 'CLP Regulation' guidance for verbatim wording."
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>How it all fits together</ContentEyebrow>

          <ConceptBlock title="EPA → Hazardous Waste Regs / WEEE / Batteries → SWMP → your skip choice">
            <p>
              Same layered structure as HASAWA. <strong>EPA 1990</strong> is the parent — sets the
              Duty of Care (s.34) and the disposal offences (s.33). Under it sit the
              specific-stream regs: <strong>Hazardous Waste Regs 2005</strong>,{' '}
              <strong>WEEE Regs 2013</strong>, <strong>Waste Batteries Regs 2009</strong>,{' '}
              <strong>Packaging (Essential Requirements) Regs 2015</strong>. The{' '}
              <strong>Site Waste Management Plan</strong> on a commercial job is how all of those
              get implemented in one place — colour-coded skips, named carriers, target percentages.
              Your bit, on site, is the segregation at the point of generation.
            </p>
            <p>
              And <strong>GB CLP</strong> sits across the top of all of it on the substance side —
              the labels on every can and tube tell you what kind of waste it’ll be at end of life,
              what kind of PPE you need now, and what kind of paperwork has to go with it when it
              leaves site.
            </p>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "EPA 1990 is the parent law. Section 34 (Duty of Care) puts a personal responsibility on YOU for any waste you handle, all the way down the chain.",
              "Hazardous Waste Regs 2005 — fluorescent tubes, lead-acid batteries, solvent residues. Consignment note required, no mixing, kept 3 years.",
              "WEEE Regs 2013 — anything with a plug, battery or circuit board. Producer Responsibility funds recycling; segregate, transfer note, drop at a permitted site or wholesaler.",
              "Site Waste Management Plans aren’t legally mandatory in England since 2013, but every main contractor uses them through ISO 14001 / BREEAM. Follow the segregation, ask which skip.",
              "Nine GB CLP pictograms — flame, exclamation mark, skull, corrosive, gas cylinder, environment, exploding bomb, oxidising flame-over-circle, health hazard. Learn them all (AC 4.1).",
              "Burning PVC off cable, dumping tubes in general skips, handing waste to unlicensed mates — all are EPA s.34 offences. Fines start small but go to unlimited on indictment.",
            ]}
          />

          {/* ── Quiz (preserved — links to streaks/stats) ───────── */}

          <Quiz title="Environmental legislation and waste knowledge check" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module1/section1/1-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                The role of regulatory bodies
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module1/section2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Section 2 — Common electrical hazards
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
