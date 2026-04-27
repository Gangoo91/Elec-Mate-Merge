/**
 * Module 5 · Section 2 · Subsection 1 — Statutory legislation and guidance
 * Maps to City & Guilds 2365-02 / Unit 210 / LO2 / AC 2.1
 *   AC 2.1 — "Identify the types of statutory legislation and guidance information
 *             that applies to working in the industry"
 *
 * Frame: a Level 2 apprentice's working map of the legal landscape — the
 * three layers (statutory law, official guidance, industry standard), the
 * key Acts and Regulations to recognise on day one, and how BS 7671 sits
 * inside that hierarchy as a non-statutory document that the law has
 * effectively adopted.
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
  'Statutory legislation and guidance (2.1) | Level 2 Module 5.2.1 | Elec-Mate';
const DESCRIPTION =
  'Three layers of rules — statutory Acts and Regulations, HSE guidance and industry standards. Where HASAWA, EAWR, CDM, BS 7671 and Approved Document P sit, and which ones a court will treat as binding.';

/* ── Inline checks ────────────────────────────────────────────────── */

const checks = [
  {
    id: 'mod5-s2-sub1-bs7671-status',
    question:
      "A customer asks you, 'is BS 7671 the law?' What's the most accurate plain-English answer at Level 2?",
    options: [
      "Yes, BS 7671 is an Act of Parliament so it's the law.",
      "Not directly. BS 7671 is a British Standard published by BSI and the IET — it's not an Act of Parliament. But for a domestic install in England, the Building Regulations 2010 Approved Document P treats compliance with BS 7671 as the way to meet the statutory requirement for electrical safety, so in practice the courts will expect the standard to have been followed. It's voluntary in name and effectively mandatory in court.",
      'No, BS 7671 has nothing to do with the law.',
      "Yes, but only when the customer agrees to it in the contract.",
    ],
    correctIndex: 1,
    explanation:
      "This is the single most common public misunderstanding about BS 7671. The Wiring Regulations are not statutory in their own right — Parliament did not pass them. But the statutory Building Regulations 2010 (in England) cite Approved Document P, which in turn names BS 7671 as a route to compliance. So a domestic installation that breaches BS 7671 is also evidence of a breach of the Building Regulations, which IS statutory. Outside of dwellings, BS 7671 is also widely cited in insurance contracts, scheme membership rules and HSE guidance, all of which give it legal teeth indirectly.",
  },
  {
    id: 'mod5-s2-sub1-statute-vs-acop',
    question:
      "What's the difference between a statutory regulation (e.g. EAWR 1989) and an Approved Code of Practice (ACoP) issued by the HSE?",
    options: [
      'There is no difference — both are equally binding.',
      "A statutory regulation is law — breach is a criminal offence with fines and imprisonment available. An ACoP is HSE guidance with special legal status under HASAWA s.16 — it isn't a criminal offence to depart from an ACoP, but if you're prosecuted for the underlying regulation, the ACoP is treated as evidence of what 'reasonably practicable' looks like. To defend a departure you have to show your alternative was at least as good.",
      'ACoPs are stronger than regulations.',
      'Regulations only apply to companies, ACoPs only apply to individuals.',
    ],
    correctIndex: 1,
    explanation:
      "Statute (Acts and Regulations) is the law — breach is criminal. ACoPs sit one rung below — they explain how to meet the law, and HASAWA s.16 gives them a special evidential status: a court will assume an ACoP departure is a breach unless the defendant proves the alternative was equally good. Pure HSE guidance (HSG, INDG, GS series) is one rung lower again — strong evidence, but no s.16 status. Knowing which tier a document sits in tells you how a court will treat it.",
  },
  {
    id: 'mod5-s2-sub1-where-to-find',
    question:
      "You're on a domestic CU change and you want to check the actual wording of a regulation you remember being relevant. Where do you go for the authoritative current text?",
    options: [
      "Wikipedia.",
      "legislation.gov.uk for the statutory text (Acts and Statutory Instruments), HSE.gov.uk for the official guidance and ACoPs, the IET 'Wiring Regulations' (BS 7671:2018+A2:2022, with A4:2026 changes coming in) for the standard, and the Building Regulations Approved Documents on GOV.UK for the building-control angle. Each source publishes the current consolidated text — that's what a court will be reading.",
      'A copy of the regs from a college library shelf without a date stamp.',
      'A trade-forum thread.',
    ],
    correctIndex: 1,
    explanation:
      "Knowing where the authoritative text lives is half of being competent under the regs. legislation.gov.uk hosts the consolidated current versions of Acts and SIs — the same text a court would refer to. HSE.gov.uk hosts the ACoPs and the HSG / INDG / GS guidance. The IET publishes BS 7671 (you need a current copy on the van or in the office). Building Regulations Approved Documents (Part P, Part L, Part M and so on) are on GOV.UK. Forum chat, old training notes and Wikipedia are not authoritative — fine for orientation, useless in front of an inspector or a judge.",
  },
];

/* ── End-of-page Quiz ─────────────────────────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      "Which of the following is the headline 'umbrella' Act of Parliament that all UK workplace health and safety law sits under?",
    options: [
      'Building Regulations 2010.',
      "Health and Safety at Work etc Act 1974 (HASAWA). It's the framework Act — most modern H&S Regulations (EAWR, CDM, RIDDOR, COSHH, MHSWR, PUWER, Manual Handling, PPE, WAHR) are Statutory Instruments made under HASAWA's enabling powers, which means a breach of any of them also feeds back into a HASAWA breach.",
      'Equality Act 2010.',
      'Companies Act 2006.',
    ],
    correctAnswer: 1,
    explanation:
      "HASAWA 1974 is the constitutional Act for UK workplace H&S. It sets out the broad duties of employers (s.2 to employees, s.3 to non-employees), employees (s.7), suppliers (s.6), and the powers of the HSE. Almost every more specific regulation since 1974 — EAWR, CDM, RIDDOR, COSHH, MHSWR, PUWER, Manual Handling, PPE at Work, WAHR — is a Statutory Instrument made under HASAWA's enabling sections, so it inherits HASAWA's enforcement regime.",
  },
  {
    id: 2,
    question:
      "What's the single biggest legal difference between a Statutory Instrument (e.g. EAWR 1989, SI 1989/635) and a British Standard (e.g. BS 7671)?",
    options: [
      'There is none — both are law.',
      "A Statutory Instrument is secondary legislation — passed under the authority of an Act of Parliament. Breach is a criminal offence and the HSE can prosecute. A British Standard is a voluntary technical document published by the British Standards Institution. Breach is not in itself a criminal offence — but where another statute (e.g. Approved Document P, which references BS 7671) effectively requires compliance, departure becomes evidence of a statutory breach.",
      'Statutory Instruments only apply to construction sites.',
      'British Standards are stronger than Statutory Instruments.',
    ],
    correctAnswer: 1,
    explanation:
      "Statute = law, prosecutable. Standard = voluntary technical guidance, but often cited by statute and therefore de facto required. Knowing which side of the line a document sits on tells you what happens after a breach. EAWR Reg 14 breach = HSE prosecution. BS 7671 Reg 411.3.3 'breach' = no direct prosecution, but a strong evidential problem if it leads to an injury or a Building Regulations failure on a notifiable installation.",
  },
  {
    id: 3,
    question:
      "Which set of regulations specifically governs electrical work in the UK — covering the design, construction, operation and maintenance of electrical systems?",
    options: [
      'Building Regulations Part L (energy efficiency).',
      "Electricity at Work Regulations 1989 (EAWR), Statutory Instrument 1989/635. EAWR applies to ALL work activities involving electricity, in nearly all workplaces. It covers design, construction, operation and maintenance of electrical systems, and the competence of those carrying out the work. Reg 14 (live working) and Reg 16 (competence) are the two an apprentice meets first.",
      'CDM 2015 (covers design and construction of buildings, not electrical specifically).',
      'PUWER 1998 (covers work equipment generally).',
    ],
    correctAnswer: 1,
    explanation:
      "EAWR 1989 is the electrical-specific Statutory Instrument. It's deliberately broad — written in the language of duties rather than design specifics, so it stays current as technology changes. The technical detail of HOW to comply with EAWR is found in BS 7671 (for fixed installations), in HSR25 (HSE guidance on EAWR), and in industry codes — but the legal duty itself sits in EAWR.",
  },
  {
    id: 4,
    question:
      "Approved Document P (Electrical Safety — Dwellings) is part of the statutory Building Regulations regime in England. What does it actually require?",
    options: [
      'It bans all electrical work in dwellings.',
      "Schedule 1 Part P of the Building Regulations 2010 sets the legal requirement that 'reasonable provision shall be made in the design and installation of electrical installations in order to protect persons operating, maintaining or altering the installations from fire or injury'. The Approved Document P guidance then names BS 7671 as the recognised way to meet that requirement. So in a dwelling in England, BS 7671 compliance is the practical route to legal compliance.",
      'It only applies to commercial buildings.',
      'It is voluntary.',
    ],
    correctAnswer: 1,
    explanation:
      "Approved Document P is the bridge that turns BS 7671 from a voluntary standard into something a court will treat as effectively required for domestic work in England. The legal hook is in Schedule 1 Part P of the Building Regulations 2010 (a Statutory Instrument). The how-to-comply text is in the Approved Document, which the courts treat under s.7 of the Building Act 1984 as evidence of what reasonable provision looks like. Wales has equivalent provisions; Scotland has its own Building Standards system.",
  },
  {
    id: 5,
    question:
      "Which HSE guidance document is the standard reference for live-line test instruments and probes used by electricians?",
    options: [
      'HSG107.',
      "GS38 — 'Electrical test equipment for use by electricians'. It's HSE guidance, not statute, but the courts treat it as the reference for what 'safe' test probes, leads and instruments look like in practice. It specifies probe finger barriers, exposed metal length (no more than 4 mm), insulated leads, fused leads where appropriate, and the use of voltage indicators rather than meters where possible.",
      'BS 7671.',
      'PUWER 1998.',
    ],
    correctAnswer: 1,
    explanation:
      "GS38 is the document an HSE inspector will reach for if your test leads are home-made or your probes have 25 mm of exposed metal. It's guidance, but it's the recognised benchmark — departing from it puts the burden of proof on you to show your alternative was at least as safe. HSG107 covers maintaining portable electric equipment; HSG230 covers keeping electrical switchgear safe. All three are HSE-published guidance and all three carry strong evidential weight.",
  },
  {
    id: 6,
    question:
      "What is RIDDOR 2013 and what does it require an electrical contractor to do?",
    options: [
      'A trade union.',
      "Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 (SI 2013/1471). It places a statutory duty on the employer (and certain self-employed people) to report specified workplace injuries, occupational diseases, dangerous occurrences and fatalities to the HSE. Reportable items include fatalities, specified injuries (amputation, fracture other than fingers/toes/thumbs, loss of sight, scalping, etc.), over-7-day absences, and a defined list of dangerous occurrences. Reporting is via the F2508 form on hse.gov.uk.",
      'A British Standard for cable colours.',
      'A type of consumer unit.',
    ],
    correctAnswer: 1,
    explanation:
      "RIDDOR 2013 is the statutory reporting regime — without it, the HSE wouldn't know workplace harm was happening. The duty falls on the 'responsible person' (usually the employer). For an apprentice that means: tell your supervisor immediately if anything reportable happens. The supervisor / employer makes the F2508 report. Failure to report when required is itself a criminal offence under the Regulations.",
  },
  {
    id: 7,
    question:
      "Which set of regulations governs construction projects — including the duties of clients, designers, principal contractors and workers from the planning stage to handover?",
    options: [
      'PUWER 1998.',
      "Construction (Design and Management) Regulations 2015 (CDM 2015), Statutory Instrument 2015/51. CDM 2015 covers ALL construction work, with extra duties triggered when the project is 'notifiable' (longer than 30 working days with more than 20 workers simultaneously, or exceeding 500 person-days). It sets duties for clients, principal designers, principal contractors, contractors and workers — including the apprentice's duty under Reg 8 to co-operate, take reasonable care and report defects.",
      'BS 7671.',
      'COSHH 2002.',
    ],
    correctAnswer: 1,
    explanation:
      "CDM 2015 is the construction-specific umbrella. It applies to any construction work, but the heavier paperwork (notification to HSE, construction phase plan, principal contractor and principal designer roles) only kicks in on notifiable projects. As an apprentice you'll mostly meet CDM through the site induction (Reg 13) and your personal duty under Reg 8 to co-operate with safety arrangements and report defects.",
  },
  {
    id: 8,
    question:
      "You're working in a 1960s factory unit and you notice a chemical drum leaking near where you're terminating a sub-main. Which set of regulations governs the response?",
    options: [
      'EAWR 1989.',
      "Control of Substances Hazardous to Health Regulations 2002 (COSHH), SI 2002/2677. COSHH places a statutory duty on the employer to assess and control exposure to hazardous substances — solvents, paints, cleaning products, dust, fumes — and on workers to use the controls provided and report defects. A leaking chemical drum is a COSHH issue: stop work, evacuate the immediate area, report to the supervisor and the site responsible person, and don't try to clean it up yourself unless trained.",
      'BS 7671.',
      'Building Regulations Part P.',
    ],
    correctAnswer: 1,
    explanation:
      "COSHH 2002 is the substance-hazard regime. It requires risk assessment, control measures, monitoring, health surveillance where relevant, and emergency procedures. The apprentice meets COSHH through the substances they use directly (solvents, contact cleaners, lubricants — all should have safety data sheets) and through site-wide hazards like the leaking drum. The default response is stop, withdraw, report — the same response as for a serious electrical hazard.",
  },
];

/* ── FAQs ─────────────────────────────────────────────────────────── */

const faqs = [
  {
    question: "If BS 7671 isn't actually the law, why does everyone act like it is?",
    answer:
      "Because the system is set up so that breach has near-certain consequences even though the standard itself isn't statute. For domestic work in England, Building Regs Approved Document P names BS 7671 as the route to compliance — break BS 7671 and you've broken the statutory Building Regs. For commercial and industrial work, EAWR Reg 4 requires electrical systems to be 'safe' and the courts treat BS 7671 as the practical benchmark for what 'safe' looks like. Insurance contracts, scheme membership (NICEIC, NAPIT, Stroma) and most commercial contracts also explicitly require compliance. So while you can't be prosecuted for breaching BS 7671 directly, you'll be prosecuted, sued or thrown out of your scheme indirectly.",
  },
  {
    question: "How do I tell whether a document is statute, ACoP or just guidance?",
    answer:
      "Look at where it was published and what it calls itself. Statute is published on legislation.gov.uk and is named as an Act (e.g. 'Health and Safety at Work etc Act 1974') or as Regulations made under an Act (e.g. 'Electricity at Work Regulations 1989, SI 1989/635'). ACoPs are published by the HSE and explicitly say 'Approved Code of Practice' on the cover — they have a unique L-series code (e.g. L22 for PUWER ACoP). HSE guidance is also published by the HSE but doesn't carry the ACoP label — it sits in the HSG, INDG or GS series. British Standards come from BSI / IET — BS or PD numbers. If you're not sure, the source URL gives it away.",
  },
  {
    question: "Do I need to know the regulation numbers off by heart at Level 2?",
    answer:
      "No. What you need at Level 2 is to know which documents exist, what they broadly cover, and where to find the current text when you need it. For a few headline ones — HASAWA 1974, EAWR 1989, BS 7671, Building Regs Part P — knowing the names and the rough purpose is enough. Specific regulation numbers (e.g. EAWR Reg 14 for live work, MHSWR Reg 3 for risk assessment) become easier to remember the more you actually meet them on site. Level 3 will go deeper. AM2 will test specific clauses against scenarios.",
  },
  {
    question: "What's the difference between an Act of Parliament and a Statutory Instrument?",
    answer:
      "An Act of Parliament is primary legislation — debated and passed by both Houses and given Royal Assent. HASAWA 1974, the Equality Act 2010 and the Building Act 1984 are Acts. A Statutory Instrument (SI) is secondary legislation — made by a Minister or body using powers given to them by an Act. EAWR 1989, CDM 2015, MHSWR 1999 and the Building Regulations 2010 are all SIs made under HASAWA or the Building Act. Both are equally binding law — the SI form is just faster to update than putting a new Act through Parliament.",
  },
  {
    question: "Where does ESQCR fit in — do I need to know about it?",
    answer:
      "ESQCR — the Electricity Safety, Quality and Continuity Regulations 2002 (SI 2002/2665) — is the Statutory Instrument that governs DNOs (distribution network operators) and meter operators. It's the law your DNO works under, and it's the reason you don't touch the cut-out fuse or break the meter seal — those are DNO equipment under ESQCR. As an apprentice you don't apply ESQCR directly, but you respect the boundary it sets at the cut-out / meter / consumer-tail interface.",
  },
  {
    question: "Has anything in the headline list changed recently or is about to?",
    answer:
      "Yes — three big things to be aware of. First, BS 7671 A4:2026 is the next amendment to the Wiring Regulations and brings in updated requirements around AFDDs (arc fault detection devices), TN-C-S protective earthing and several model-form changes. Second, the PPE at Work Regulations were amended in 2022 to extend duties to limb (b) workers (most casual / agency / gig-economy workers). Third, the Building Safety Act 2022 has reshaped responsibilities on higher-risk buildings — relevant if you end up working on residential blocks above 18 m. Keep an eye on legislation.gov.uk and HSE.gov.uk for the current text.",
  },
];

export default function Sub1() {
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
            <ArrowLeft className="h-4 w-4" /> Section 2
          </button>

          <PageHero
            eyebrow="Module 5 · Section 2 · Subsection 1"
            title="Statutory legislation and guidance"
            description="Three layers of rules — statutory law, official guidance, industry standards. Where HASAWA, EAWR, CDM, BS 7671 and Approved Document P sit, and which ones a court treats as binding."
            tone="emerald"
          />

          <TLDR
            points={[
              "Three layers — STATUTORY (Acts and SIs, breach is criminal), GUIDANCE (HSE ACoPs and HSG / INDG / GS, strong evidence in court), STANDARD (BS 7671 and similar, voluntary in name but cited by statute so effectively required).",
              "HASAWA 1974 is the umbrella Act. EAWR 1989, CDM 2015, MHSWR 1999, RIDDOR 2013, COSHH 2002, Manual Handling, PPE at Work, WAHR — all SIs made under HASAWA. Knowing the family is more useful than memorising the SI numbers.",
              "BS 7671 isn't an Act. But Building Regs 2010 Approved Document P (England) names it as the route to comply with the statutory Schedule 1 Part P, so a domestic departure is a Building Regs breach. Voluntary in name, mandatory in court.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Identify the three layers of rule — statutory law (Acts and Statutory Instruments), official HSE guidance (ACoPs, HSG, INDG, GS series) and industry standards (BS 7671 and similar).",
              "Name the headline statutory legislation governing UK electrical work — HASAWA 1974, EAWR 1989, CDM 2015, MHSWR 1999, RIDDOR 2013, COSHH 2002, Manual Handling Regulations 1992, PPE at Work Regulations 1992 (as amended 2022), WAHR 2005, Equality Act 2010 and the Building Regulations 2010.",
              "Explain the legal status of BS 7671 and how Approved Document P bridges the standard into the statutory Building Regulations regime in England.",
              "State the role of ESQCR 2002 in defining the boundary between DNO equipment and the consumer's installation.",
              "Recognise the key HSE guidance documents an electrician meets — HSG107 (portable equipment), HSG230 (switchgear), GS38 (test equipment).",
              "Identify the authoritative sources for the current text of UK electrical legislation, guidance and standards — legislation.gov.uk, HSE.gov.uk, the IET Wiring Regulations and the Building Regulations Approved Documents on GOV.UK.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why three layers, not one</ContentEyebrow>

          <ConceptBlock
            title="The legal landscape an electrician works inside has three tiers — statute, guidance, standard"
            plainEnglish="Not every document that tells you how to do the job has the same legal weight. Some are Acts of Parliament — straightforward criminal law. Some are official guidance from the HSE — not law in themselves, but treated very seriously by the courts. Some are technical standards — voluntary in principle, but written into the law indirectly. Knowing which tier a document sits in tells you what happens if you breach it."
            onSite="On a job, the three tiers feel about the same — you follow the rule because that's the rule. But after an incident, the difference matters a lot. A breach of statute (e.g. EAWR Reg 14) is a criminal prosecution route. A departure from an ACoP is evidence of breach but defendable if you can show your alternative was equally good. A departure from BS 7671 isn't directly criminal but, on a notifiable domestic install in England, it lands you in breach of Building Regs Part P, which IS criminal."
          >
            <p>
              The three tiers in practical order:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Statutory law</strong> — Acts of Parliament and the Statutory Instruments
                made under them. Published on legislation.gov.uk. Breach is a criminal offence
                with fines and (in serious cases) imprisonment available. Examples: HASAWA 1974,
                EAWR 1989, CDM 2015, MHSWR 1999, RIDDOR 2013, COSHH 2002, Manual Handling Regs
                1992, PPE at Work Regs 1992 (as amended 2022), Working at Height Regulations
                2005, Equality Act 2010, Building Regulations 2010.
              </li>
              <li>
                <strong>Official guidance</strong> — HSE-published documents. The top tier is
                an Approved Code of Practice (ACoP) under HASAWA s.16, which has special
                evidential status — a court will assume an ACoP departure is a breach unless you
                prove the alternative was equally good. Below ACoPs sit the HSG (Health &amp;
                Safety Guidance), INDG (Industry Guidance), and GS (General Series) documents —
                strong evidence of best practice but no s.16 status.
              </li>
              <li>
                <strong>Industry standard</strong> — British Standards published by BSI, often
                in collaboration with the IET. BS 7671 (the Wiring Regulations) is the headline
                example. Voluntary in their own right, but routinely cited by statute (Approved
                Document P), by insurance contracts, by scheme membership rules, and by the
                courts as the practical benchmark for what 'safe' looks like.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Health and Safety at Work etc Act 1974 — s.1(1)"
            clause={
              <>
                &quot;The provisions of this Part shall have effect with a view to — (a) securing
                the health, safety and welfare of persons at work; (b) protecting persons other
                than persons at work against risks to health or safety arising out of or in
                connection with the activities of persons at work; (c) controlling the keeping
                and use of explosive or highly flammable or otherwise dangerous substances, and
                generally preventing the unlawful acquisition, possession and use of such
                substances; (d) controlling the emission into the atmosphere of noxious or
                offensive substances from premises of any class prescribed for the purposes of
                this paragraph.&quot;
              </>
            }
            meaning={
              <>
                HASAWA s.1 sets the purpose of the entire UK workplace H&amp;S regime. Two
                duties matter most for the apprentice. (a) protects you and your colleagues
                while you&apos;re at work — that&apos;s the s.2 duty on the employer and the s.7
                duty on you. (b) protects everyone else who could be affected by what you do —
                customers, the public, other trades — and is the s.3 duty on the employer. The
                rest of the H&amp;S Regulations you&apos;ll meet (EAWR, CDM, MHSWR, RIDDOR and
                so on) are Statutory Instruments made under HASAWA&apos;s enabling powers, so
                they all inherit this purpose.
              </>
            }
            cite="Source: Health and Safety at Work etc Act 1974 (1974 c.37), Part I, s.1 — verbatim from legislation.gov.uk."
          />

          <SectionRule />

          <ContentEyebrow>The headline Acts and Regulations</ContentEyebrow>

          <ConceptBlock
            title="HASAWA 1974 — the umbrella Act"
            plainEnglish="The Health and Safety at Work etc Act 1974 is the constitutional Act for UK workplace H&S. It sets out the broad duties — the employer to employees (s.2), the employer to non-employees (s.3), the employee to themselves and others (s.7), the supplier of articles for use at work (s.6), and the powers of the HSE (Part I generally)."
            onSite="HASAWA is rarely cited on its own day-to-day — you'll hear EAWR, CDM, MHSWR much more often. But every one of those Regulations is an SI made under HASAWA. After an incident the prosecution will often charge both the specific Regulation breach and the underlying HASAWA section — belt and braces."
          >
            <p>
              The HASAWA sections most relevant to an apprentice:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>s.2</strong> — duty of every employer to ensure, so far as is reasonably
                practicable, the H&amp;S of all employees at work.
              </li>
              <li>
                <strong>s.3</strong> — duty of every employer to conduct the undertaking so that
                non-employees affected by the work are not exposed to risk SFAIRP.
              </li>
              <li>
                <strong>s.7</strong> — duty of every employee to take reasonable care for their
                own H&amp;S and that of others affected by their acts or omissions, AND to
                co-operate with the employer&apos;s arrangements.
              </li>
              <li>
                <strong>s.8</strong> — no person shall intentionally or recklessly interfere with
                or misuse anything provided for H&amp;S purposes (e.g. removing a guard, defeating
                an interlock, taking down a barrier).
              </li>
              <li>
                <strong>s.37</strong> — director / senior manager personal liability where an
                offence by the company is committed with their consent, connivance or neglect.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="EAWR 1989 — the electrical Statutory Instrument"
            plainEnglish="The Electricity at Work Regulations 1989 (SI 1989/635) are the electrical-specific SI made under HASAWA. EAWR applies to all work activities involving electricity, in nearly all workplaces, and covers the design, construction, operation and maintenance of electrical systems plus the competence of people doing the work."
            onSite="EAWR is the legal hook for almost every electrical safety control you put in place — isolation, lock-off, dead testing, PPE selection, the live-work prohibition. The technical detail of HOW to comply lives in BS 7671 (for fixed installations) and HSE guidance HSR25 (the HSE memorandum of guidance on EAWR)."
          >
            <p>
              The EAWR regulations a Level 2 apprentice meets first:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Reg 3</strong> — the duty to comply with EAWR extends to ALL persons
                working on electrical systems, including apprentices and the self-employed,
                not just the employer.
              </li>
              <li>
                <strong>Reg 4</strong> — all electrical systems shall, so far as is reasonably
                practicable, be of such construction as to prevent danger; and be maintained so
                as to prevent danger.
              </li>
              <li>
                <strong>Reg 14</strong> — no person shall work on or near a live conductor unless
                three conditions are all met: it&apos;s unreasonable to make it dead, it&apos;s
                reasonable in all the circumstances to do the work live, AND suitable precautions
                are taken to prevent injury.
              </li>
              <li>
                <strong>Reg 16</strong> — no person shall be engaged in any work activity where
                technical knowledge or experience is necessary to prevent danger, unless they
                possess such knowledge or experience or are under appropriate supervision.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="The wider H&S Statutory Instruments — MHSWR, CDM, COSHH, RIDDOR, Manual Handling, PPE, WAHR"
            plainEnglish="A cluster of Statutory Instruments under HASAWA covers everything around the electrical work — risk assessment, construction projects, hazardous substances, accident reporting, manual handling, PPE and working at height. Each SI has its own duties, its own enforcing authority and its own ACoP / guidance."
            onSite="You don't need to memorise the SI numbers. You do need to know each Regulation exists, broadly what it covers, and which Regulation is in play when something happens. After an incident the inspector will work backwards from the harm to find the SI that was breached — and 'I didn't know that Regulation existed' is not a defence."
          >
            <p>
              The key Statutory Instruments to recognise at Level 2:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>MHSWR 1999</strong> — Management of Health and Safety at Work Regulations
                1999 (SI 1999/3242). Reg 3 is the duty to make a &apos;suitable and sufficient&apos;
                risk assessment. Reg 5 is the duty to plan, organise, control, monitor and review.
                The SI that turns HASAWA s.2 / s.3 into a paperwork regime.
              </li>
              <li>
                <strong>CDM 2015</strong> — Construction (Design and Management) Regulations 2015
                (SI 2015/51). Covers construction projects, with extra duties on notifiable
                projects (over 30 working days with 20+ workers, or over 500 person-days). Reg 13
                is site induction. Reg 8 is the duty on every worker.
              </li>
              <li>
                <strong>COSHH 2002</strong> — Control of Substances Hazardous to Health Regulations
                2002 (SI 2002/2677). Solvents, paints, dusts, fumes — risk assessment, control
                measures, monitoring, emergency procedures.
              </li>
              <li>
                <strong>RIDDOR 2013</strong> — Reporting of Injuries, Diseases and Dangerous
                Occurrences Regulations 2013 (SI 2013/1471). Statutory reporting of fatalities,
                specified injuries, over-7-day absences, occupational diseases and listed
                dangerous occurrences via the F2508 form on hse.gov.uk.
              </li>
              <li>
                <strong>Manual Handling Regs 1992</strong> — Manual Handling Operations Regulations
                1992 (SI 1992/2793). Avoid where reasonably practicable; assess where unavoidable;
                reduce the risk of injury.
              </li>
              <li>
                <strong>PPE at Work Regs 1992 (as amended 2022)</strong> — Personal Protective
                Equipment at Work Regulations 1992 (SI 1992/2966). Last resort in the hierarchy
                of control. The 2022 amendment extended duties to most limb (b) (casual / agency)
                workers.
              </li>
              <li>
                <strong>WAHR 2005</strong> — Working at Height Regulations 2005 (SI 2005/735).
                Covers anything where a fall could cause injury. The hierarchy: avoid, prevent,
                mitigate.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>BS 7671 and the Building Regulations bridge</ContentEyebrow>

          <ConceptBlock
            title="BS 7671 — the standard the whole trade revolves around"
            plainEnglish="BS 7671 — the Wiring Regulations, currently BS 7671:2018 incorporating Amendments 1, 2 and the upcoming A4:2026 — is the British Standard for low-voltage electrical installations. Published jointly by BSI and the IET. It is NOT an Act of Parliament. It IS a voluntary technical document that the rest of the regulatory system has effectively adopted as the working benchmark."
            onSite="Every cert you write — EIC, MWC, EICR, fire alarm cert — is referenced back to BS 7671. Every test result is judged against BS 7671 thresholds. Every scheme assessment (NICEIC, NAPIT, Stroma, ELECSA) is judged against BS 7671 compliance. So while it isn't statute in its own right, it is the document you live inside professionally — and the document a court will reach for when asked 'was this installation safe?'"
          >
            <p>
              How BS 7671 acquires legal weight even though it isn&apos;t statute:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Approved Document P (England)</strong> names BS 7671 as the recognised way
                to meet the statutory Schedule 1 Part P requirement for &apos;reasonable
                provision&apos; in dwelling installations. So a domestic departure from BS 7671 is
                evidence of a Building Regs breach, which IS statute.
              </li>
              <li>
                <strong>EAWR Reg 4</strong> requires electrical systems to be &apos;safe&apos;.
                The HSE and the courts treat BS 7671 as the practical benchmark for what
                &apos;safe&apos; looks like in fixed installations.
              </li>
              <li>
                <strong>Insurance contracts</strong> typically require BS 7671 compliance —
                breach can void cover after an incident.
              </li>
              <li>
                <strong>Scheme membership</strong> (NICEIC, NAPIT, Stroma, ELECSA, NAPIT, Certsure
                and similar) requires BS 7671 compliance and audits to it. Persistent breach gets
                you removed from the scheme.
              </li>
              <li>
                <strong>Most commercial contracts</strong> explicitly write in BS 7671 compliance
                as a contract term — breach is a contractual claim before it&apos;s anything
                else.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Building Regulations 2010 (SI 2010/2214), Schedule 1, Part P — P1"
            clause={
              <>
                &quot;Reasonable provision shall be made in the design and installation of
                electrical installations in order to protect persons operating, maintaining or
                altering the installations from fire or injury.&quot;
              </>
            }
            meaning={
              <>
                Schedule 1 Part P is the statutory hook that turns BS 7671 from a voluntary
                standard into the de facto law for dwelling installations in England. The
                Building Regulations 2010 are a Statutory Instrument made under the Building Act
                1984 — full statute. The duty in P1 is to provide &apos;reasonable&apos;
                protection. The Approved Document P guidance then tells you what
                &apos;reasonable&apos; means in practice — and it names BS 7671 as the route. So
                a domestic install that breaches BS 7671 is evidence of a P1 breach, which is
                statutory and prosecutable. Wales has equivalent provisions; Scotland operates
                its own Building Standards system with similar effect.
              </>
            }
            cite="Source: Building Regulations 2010 (SI 2010/2214), Schedule 1, Part P (P1) — verbatim from legislation.gov.uk."
          />

          <RegsCallout
            source="Electricity at Work Regulations 1989 (SI 1989/635) — Reg 4(1) and (2)"
            clause={
              <>
                <p className="mb-2">
                  <strong>Reg 4(1)</strong> — &quot;All systems shall at all times be of such
                  construction as to prevent, so far as is reasonably practicable, danger.&quot;
                </p>
                <p>
                  <strong>Reg 4(2)</strong> — &quot;As may be necessary to prevent danger, all
                  systems shall be maintained so as to prevent, so far as is reasonably
                  practicable, such danger.&quot;
                </p>
              </>
            }
            meaning={
              <>
                EAWR Reg 4 is the legal duty to make and keep electrical systems safe. The HSE
                and the courts treat BS 7671 as the practical benchmark for what &apos;safe&apos;
                construction and maintenance look like — so a breach of BS 7671 in a fixed
                installation is also evidence of a breach of EAWR Reg 4. &apos;Reasonably
                practicable&apos; (SFAIRP) means the cost of further precaution must be weighed
                against the risk it would prevent — but the burden of proving SFAIRP sits on
                the duty-holder.
              </>
            }
            cite="Source: Electricity at Work Regulations 1989 (SI 1989/635), Reg 4 — verbatim from legislation.gov.uk."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>HSE guidance — ACoPs and the HSG / INDG / GS series</ContentEyebrow>

          <ConceptBlock
            title="ACoPs have special legal status under HASAWA s.16 — guidance below them does not"
            plainEnglish="An Approved Code of Practice is HSE guidance that has been formally approved under HASAWA s.16. That gives it special evidential status in court — if you depart from an ACoP and you're prosecuted for the underlying Regulation, the court will assume the departure was a breach unless you prove your alternative was at least as good. Below ACoPs sit the HSG, INDG and GS series — strong evidence of best practice, but without the s.16 'reverse burden of proof' status."
            onSite="On a job, the difference rarely matters — you follow the guidance because the guidance is right. The difference matters in court. Knowing whether the document you departed from was an ACoP or 'just' guidance tells you how heavy the burden of justification is going to be."
          >
            <p>
              The HSE documents an electrician meets most often:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>HSR25</strong> — Memorandum of guidance on the Electricity at Work
                Regulations 1989. The HSE&apos;s explanation of how EAWR works in practice.
              </li>
              <li>
                <strong>HSG107</strong> — Maintaining portable electric equipment in low-risk
                environments. The reference for portable appliance testing (PAT) practice.
              </li>
              <li>
                <strong>HSG230</strong> — Keeping electrical switchgear safe. Industrial
                switchgear maintenance and operation.
              </li>
              <li>
                <strong>GS38</strong> — Electrical test equipment for use by electricians. Probe
                and lead specifications, voltage indicators, instrument selection.
              </li>
              <li>
                <strong>INDG163</strong> — Risk assessment: a brief guide for employers. Plain-
                English explainer for MHSWR Reg 3 risk assessment.
              </li>
              <li>
                <strong>INDG259</strong> — An introduction to health and safety. The HSE
                pocket-guide covering H&amp;S basics for any worker.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Where the authoritative current text actually lives"
            plainEnglish="Knowing where to find the current authoritative text of a regulation, an ACoP, a piece of guidance or a standard is half of being competent in the regulatory landscape. Each tier has its own canonical home, and only that home counts in front of an inspector or a court."
            onSite="On a job, you'll occasionally need to check what a regulation actually says — when a customer challenges, when a supervisor's instruction seems wrong, when something doesn't match the RAMS. Going to the right source is the difference between a defensible answer and an embarrassed back-track. Bookmark the four main sources on your phone."
          >
            <p>
              The four authoritative sources for UK electrical compliance:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>legislation.gov.uk</strong> — the official source for the current
                consolidated text of every Act and Statutory Instrument. Free, indexed, version-
                controlled. The text a court reads. Acts (HASAWA), SIs (EAWR, CDM, MHSWR,
                RIDDOR, COSHH, Building Regs).
              </li>
              <li>
                <strong>HSE.gov.uk</strong> — the official source for ACoPs (the L-series),
                HSG / INDG / GS guidance, RIDDOR reporting and inspector contact. Includes the
                public Notices and Convictions databases.
              </li>
              <li>
                <strong>The IET Wiring Regulations (BS 7671)</strong> — the standard. Available
                in print from BSI / IET, in digital form via the IET&apos;s online subscription,
                and on the IET&apos;s online courses. The current edition is BS 7671:2018
                incorporating Amendments 1, 2 and the upcoming A4:2026.
              </li>
              <li>
                <strong>GOV.UK Building Regulations</strong> — the Approved Documents (Part L,
                Part M, Part P, Part S, etc.) for England. Wales has its own equivalent
                published by the Welsh Government; Scotland has the Scottish Building Standards
                published by the Scottish Government.
              </li>
            </ul>
            <p>
              What is NOT authoritative — Wikipedia, trade-forum threads, old college notes
              without date stamps, AI-generated summaries, manufacturer-marketing
              interpretations of standards, and out-of-date printed copies of regulations.
              Fine for orientation; useless in front of an inspector.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The DNO boundary — ESQCR 2002</ContentEyebrow>

          <ConceptBlock
            title="ESQCR 2002 sets the legal boundary at the cut-out fuse and the meter"
            plainEnglish="The Electricity Safety, Quality and Continuity Regulations 2002 (SI 2002/2665) are the Statutory Instrument that governs distribution network operators (DNOs) and meter operators. They set the duties for the equipment that brings electricity to your customer's premises and stops at the cut-out fuse / meter / consumer tail interface. Beyond that point, BS 7671 takes over."
            onSite="ESQCR is the reason an electrician doesn't touch the cut-out fuse, doesn't break the meter seal and doesn't move the meter tails without authorisation from the meter operator or DNO. Those are DNO assets under ESQCR Reg 24 / 25. Touching them without authority is a criminal offence under ESQCR — and a much bigger problem than an EAWR breach because the DNO will rarely settle informally."
          >
            <p>
              The practical ESQCR rules every apprentice meets:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>The cut-out fuse is DNO property.</strong> You don&apos;t pull it for
                your own work. If you need a temporary isolation, you ask the DNO or the meter
                operator. The exception (in some scheme rules and DNO codes of practice) allows
                a competent person to pull the cut-out under specific conditions for a CU change
                — but this is granted by code of practice, not by ESQCR itself, and the
                conditions are strict.
              </li>
              <li>
                <strong>The meter is the meter operator&apos;s property.</strong> You don&apos;t
                break the seal. If you need to move the meter, the meter operator does it.
              </li>
              <li>
                <strong>The meter tails are usually DNO / MOP responsibility up to the meter
                terminals.</strong> Beyond that, your responsibility starts.
              </li>
              <li>
                <strong>Earthing arrangement (TN-S, TN-C-S / PME, TT)</strong> is set by the DNO
                under ESQCR. Your installation has to work safely with whatever the DNO has
                provided — TN-C-S in particular has implications for bonding which BS 7671
                Section 411 then governs.
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

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Telling a customer 'BS 7671 is the law'"
            whatHappens={
              <>
                Apprentice on a CU change is asked by the homeowner whether their old board
                &apos;passed the regs&apos;. Apprentice answers &quot;yes, BS 7671 is the law,
                and the old one breaks it.&quot; Customer challenges this on the basis that
                BS 7671 isn&apos;t actually an Act of Parliament — they&apos;ve looked it up.
                Apprentice doubles down. Customer loses confidence, complains to the firm, and
                the firm has to apologise for the technically incorrect statement even though
                the underlying advice (replace the board) was sound. The credibility damage is
                avoidable.
              </>
            }
            doInstead={
              <>
                Be precise. &quot;BS 7671 isn&apos;t an Act of Parliament. But for a domestic
                install in England the Building Regulations Approved Document P names BS 7671 as
                the way to meet the statutory requirement for electrical safety, so in practice
                the courts and Building Control treat BS 7671 compliance as required. Your old
                board doesn&apos;t meet the current standard, so it doesn&apos;t meet the route
                Building Control expect for a notifiable change. That&apos;s why we&apos;re
                replacing it.&quot; This wording is accurate, defensible and explains the WHY in
                language the customer can verify.
              </>
            }
          />

          <CommonMistake
            title="Treating HSE guidance as 'optional advice'"
            whatHappens={
              <>
                Apprentice reads HSG230 on switchgear safety, decides the precautions are
                excessive for the small panel they&apos;re working on, and skips the lock-off
                check. Six weeks later there&apos;s an incident — not the apprentice but a
                colleague switches the wrong way and gets a flash. The HSE investigation
                identifies HSG230 as the relevant guidance, finds the firm departed from it
                without any documented alternative, and treats the departure as evidence of an
                EAWR Reg 4 breach. The fact that HSG230 is &apos;guidance, not law&apos; doesn&apos;t
                save the firm — the underlying Regulation is law, and the guidance is the court&apos;s
                yardstick for what compliance looks like.
              </>
            }
            doInstead={
              <>
                Treat HSE guidance as the working benchmark for safe practice. If you have a good
                reason to depart, document it in writing in your firm&apos;s safety system, with
                the alternative control and the rationale. Being able to say &quot;we knew about
                the guidance, here&apos;s why our alternative was at least as safe, here&apos;s
                the documented decision&quot; is what turns a prosecution into a defendable
                position. Silently ignoring guidance gives you nothing to point at when the
                investigation arrives.
              </>
            }
          />

          <Scenario
            title="Customer asks 'is this rewire actually legal?' on a 1970s domestic property"
            situation={
              <>
                You&apos;re on a partial domestic rewire — kitchen and bathroom circuits being
                replaced, the rest of the property left as-is. The customer asks &quot;is what
                you&apos;re leaving in place actually legal? It&apos;s 1970s wiring with rubber
                insulation in places. Surely that breaks the regulations?&quot;
              </>
            }
            whatToDo={
              <>
                Walk the customer through the layered answer. (1) The work YOU&apos;re doing
                today has to comply with the current edition of BS 7671 — that&apos;s a
                contractual and Building Regs Part P requirement on a notifiable circuit change.
                The new kitchen and bathroom circuits will meet BS 7671:2018+A2:2022 (and the
                upcoming A4:2026 once it&apos;s in force). (2) The existing parts of the
                installation are not retrospectively required to comply with the current
                edition — installations are tested against the edition in force at the time they
                were installed, with safety judged against the current edition for the purpose of
                an EICR. (3) However, if the EICR shows the existing wiring is unsafe (rubber
                insulation perished, bonding inadequate, no RCD protection on bathroom circuits)
                then BS 7671 511.1 and the EICR coding (C1 / C2) flag those as requiring action.
                (4) The customer has the choice — fix the EICR-coded items now while the
                contractor is on site, or accept the report and decide later, knowing that an
                insurer or future buyer&apos;s surveyor will see the same report. (5) Walk
                through the cost and risk implications honestly.
              </>
            }
            whyItMatters={
              <>
                This is the exact moment a Level 2 apprentice often loses credibility — by
                saying &quot;yeah it&apos;s probably fine&quot; or &quot;the law says you have to
                replace it all&quot;. Both are wrong. The correct answer is layered and accurate
                — current edition for new work, edition-of-installation for existing work,
                EICR coding for safety judgement, customer choice on remediation. Knowing the
                three-tier structure (statutory, guidance, standard) is what makes that answer
                possible.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Three tiers — STATUTORY (Acts and SIs, criminal), GUIDANCE (HSE ACoPs and HSG / INDG / GS, strong evidence), STANDARD (BS 7671 and similar, voluntary in name but cited by statute). Knowing which tier a document sits in tells you what happens after a breach.",
              "HASAWA 1974 is the umbrella. Most workplace H&S Regulations (EAWR, CDM, MHSWR, RIDDOR, COSHH, Manual Handling, PPE, WAHR) are SIs made under HASAWA — they inherit its enforcement regime.",
              "EAWR 1989 is the electrical-specific SI. Reg 3 covers everyone working on systems including apprentices. Reg 4 is the safety duty. Reg 14 is the live-work prohibition. Reg 16 is the competence requirement.",
              "BS 7671 isn't an Act. But Building Regs Part P (England) names it as the route to comply with the statutory P1 duty — so a domestic departure is a Building Regs breach, which IS criminal.",
              "ESQCR 2002 sets the legal boundary at the cut-out fuse and meter. DNO equipment beyond that point is off-limits to electricians without specific authorisation.",
              "ACoPs have special evidential status under HASAWA s.16 — departure shifts the burden of proof onto you. HSG / INDG / GS guidance is strong evidence of best practice but without s.16 status. Either way, departing from HSE guidance without a documented alternative is a bad position to defend.",
              "Authoritative sources: legislation.gov.uk for statute, HSE.gov.uk for guidance, IET for BS 7671, GOV.UK for Building Regs Approved Documents. Forum chat and old training notes are not authoritative.",
              "Three changes to watch: BS 7671 A4:2026 (AFDD, TN-C-S, schedule columns), PPE at Work Regs 2022 amendment (limb (b) workers), Building Safety Act 2022 (high-rise residential).",
            ]}
          />

          <Quiz title="Statutory legislation and guidance — knowledge check" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module5/section1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Section 1 — Site roles and team responsibilities
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module5/section2/2-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                2.2 HASAWA &amp; EAWR — your duties
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
