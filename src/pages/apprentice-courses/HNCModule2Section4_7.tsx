/**
 * Module 2 · Section 4 · Subsection 7 — Lighting and Acoustic Standards
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   The reference shelf: how statute, Approved Documents, British/European standards
 *   and CIBSE/SLL guidance stack up, how to read and cite them correctly, and how the
 *   design criteria schedule turns them into an auditable paper trail.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  LearningOutcomes,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Lighting and Acoustic Standards - HNC Module 2 Section 4.7';
const DESCRIPTION =
  'Industry standards and guidelines including CIBSE, BS and EN codes';

const quickCheckQuestions = [
  {
    id: 'approved-document-status',
    question: 'What is the legal status of an Approved Document?',
    options: [
      'It is the law itself — departing from it is an offence',
      'It is a voluntary trade association leaflet with no standing',
      'It is statutory guidance — one recognised way of showing compliance',
      'It is a British Standard published by BSI under a different name',
    ],
    correctIndex: 2,
    explanation:
      'The functional requirement in the Building Regulations is the law. An Approved Document is statutory guidance issued to illustrate one way of meeting it. You may design an alternative route, but you must then evidence that the functional requirement is still satisfied.',
  },
  {
    id: 'shall-vs-should',
    question:
      'In a British Standard, which word signals a normative requirement you must meet to claim conformity?',
    options: [
      'May',
      'Shall',
      'Should',
      'Can',
    ],
    correctIndex: 1,
    explanation:
      "'Shall' expresses a requirement. 'Should' is a recommendation, 'may' is permission and 'can' states a possibility. Only 'shall' clauses in normative text bind a claim of conformity — informative annexes never do.",
  },
  {
    id: 'dated-reference',
    question:
      'Your specification cites a standard without a year (an undated reference). What does that mean on site three years later?',
    options: [
      'The edition current at the time of tender is frozen for the contract',
      'The reference is invalid and must be replaced by a dated one',
      'The contractor may choose whichever edition is cheapest to comply with',
      'The latest edition in force, including amendments, applies',
    ],
    correctIndex: 3,
    explanation:
      'An undated reference means the latest published edition, including amendments, applies. That is fine for slow-moving standards but dangerous where a revision changes performance targets mid-project — use a dated reference when you need the criteria frozen, and manage the change if the standard is revised.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which of these documents carries statutory force in England for the sound insulation of dwellings?',
    options: [
      'The functional requirement in the Building Regulations, with Approved Document E as guidance',
      'BS 8233, which is cited directly in the Building Act',
      'The CIBSE Guide B4 chapter on noise and vibration',
      'The manufacturer’s partition test certificate',
    ],
    correctAnswer: 0,
    explanation:
      'The Building Regulations set the functional requirement — reasonable provision for resistance to the passage of sound. Approved Document E is the statutory guidance showing one way to satisfy it. BS 8233 and CIBSE Guide B4 are industry guidance: authoritative, but not law.',
  },
  {
    id: 2,
    question: 'What does the designation "BS EN ISO" tell you about a standard?',
    options: [
      'It is a draft for public comment and not yet published',
      'It is a British-only document with an international bibliography',
      'It is a UK-published standard that is not recognised in Europe',
      'The same text is adopted as a British, European and international standard',
    ],
    correctAnswer: 3,
    explanation:
      'BS EN ISO means one technical text adopted at all three levels — international (ISO), European (EN) and national (BS). BS EN is European plus national; a plain BS is UK-only. PD, PAS and TS prefixes indicate published documents, publicly available specifications and technical specifications, which sit below full standard status.',
  },
  {
    id: 3,
    question:
      'Which pair of documents would you cite for the design of emergency escape lighting in a UK building?',
    options: [
      'BS 5266-1 (code of practice) alongside BS EN 1838 (lighting requirements)',
      'BS EN 12464-2 and CIBSE LG7',
      'BS 4142 and BS 8233',
      'BS EN ISO 3382 and CIBSE TM52',
    ],
    correctAnswer: 0,
    explanation:
      'BS EN 1838 sets out the lighting requirements for emergency lighting; BS 5266-1 is the UK code of practice covering application, system design, installation and the testing regime. The two are used together on every escape lighting design and on the completion certification.',
  },
  {
    id: 4,
    question:
      'Which family of documents provides UK sector-by-sector commentary on lighting design — offices, industry, healthcare, education?',
    options: [
      'The BS EN 12354 calculation series',
      'The Approved Documents',
      'The CIBSE/SLL Lighting Guides and the Code for Lighting',
      'The ILP obtrusive light guidance notes',
    ],
    correctAnswer: 2,
    explanation:
      'The Society of Light and Lighting (part of CIBSE) publishes the Code for Lighting and the numbered Lighting Guides (LG series) which interpret the European standard for UK practice, sector by sector. ILP guidance covers exterior obtrusive light; BS EN 12354 is an acoustics calculation series.',
  },
  {
    id: 5,
    question:
      'Two items of plant produce 52 dB and 48 dB individually at the same receiver position. What is the combined level?',
    options: [
      '100 dB',
      '53.5 dB',
      '50 dB',
      '52 dB',
    ],
    correctAnswer: 1,
    explanation:
      'Levels add logarithmically: L = 10 log(10^5.2 + 10^4.8) = 10 log(158,489 + 63,096) = 10 log(221,585) = 53.5 dB. Never add decibels arithmetically — the standards assume logarithmic summation throughout.',
  },
  {
    id: 6,
    question:
      'A classroom has a volume of 268.8 m³ and a reverberation time target of 0.8 s. Using Sabine, what total absorption is required?',
    options: [
      '43 m² sabins',
      '34 m² sabins',
      '54 m² sabins',
      '67 m² sabins',
    ],
    correctAnswer: 2,
    explanation:
      'A = 0.161 V / T = (0.161 × 268.8) / 0.8 = 43.28 / 0.8 = 54.1 m² sabins. Compare that with the absorption the existing finishes already provide; the shortfall is what the acoustic ceiling or wall panels must supply.',
  },
  {
    id: 7,
    question:
      'Rw, DnT,w and L′nT,w are single-figure ratings. Which standard family defines how measured third-octave data is converted into those single numbers?',
    options: [
      'The BS EN ISO 717 series',
      'The BS EN 12464 series',
      'The BS EN 60598 series',
      'The BS EN 15193 series',
    ],
    correctAnswer: 0,
    explanation:
      'BS EN ISO 717 defines the reference-curve shifting procedure that converts frequency-band results into single-figure ratings, plus the spectrum adaptation terms C and Ctr. Measurement itself is covered by the BS EN ISO 16283 field series and BS EN ISO 10140 laboratory series.',
  },
  {
    id: 8,
    question:
      'Which standard sets out the method for rating and assessing sound of an industrial or commercial nature affecting nearby residential receptors?',
    options: [
      'BS 8233',
      'BS EN 12354',
      'BS EN ISO 3382',
      'BS 4142',
    ],
    correctAnswer: 3,
    explanation:
      'BS 4142 gives the method: establish the specific sound level of the source, apply character corrections to obtain the rating level, measure the representative background sound level, and assess the difference in context. It is the standard planners expect to see behind a plant noise assessment.',
  },
  {
    id: 9,
    question:
      'What is the correct way to record a departure from an industry guidance document on a project?',
    options: [
      'Say nothing — guidance is not mandatory, so a departure is not a change',
      'Verbally agree it with the site manager and continue',
      'Record it in writing with the reason, the alternative criterion and the approver',
      'Delete the guidance reference from the specification retrospectively',
    ],
    correctAnswer: 2,
    explanation:
      'A departure is only defensible if it is documented: which criterion was relaxed, why, what alternative was adopted, who accepted it and on what evidence. An undocumented departure looks identical to a mistake when the building is tested or a dispute goes to adjudication.',
  },
  {
    id: 10,
    question:
      'A 12 m × 8 m classroom is lit by 16 luminaires of 32 W each. What is the installed lighting power density?',
    options: [
      '5.33 W/m²',
      '11.0 W/m²',
      '2.67 W/m²',
      '32 W/m²',
    ],
    correctAnswer: 0,
    explanation:
      'Installed power = 16 × 32 = 512 W. Floor area = 12 × 8 = 96 m². Power density = 512 / 96 = 5.33 W/m². Energy-related requirements are usually expressed as W/m², efficacy in lm/W, or an annual energy indicator — check which metric the current edition of the governing document actually asks for.',
  },
];

const faqs = [
  {
    question: 'If a standard is only guidance, why does my design have to follow it?',
    answer:
      'Three reasons. First, contract: the specification usually makes the standard a contractual obligation, so departing from it is a breach whatever its legal status. Second, evidence: following a recognised standard is the simplest way to show a court, a building control body or an insurer that the design was reasonable. Third, competence: standards encode the profession’s accumulated failures. Departing is allowed — departing without a documented, engineered justification is not.',
  },
  {
    question: 'How do I know whether a standard I am citing is still current?',
    answer:
      'Check the publisher’s catalogue record, not your memory or an old PDF. A standard record shows its status (current, superseded, withdrawn, revised), the amendments in force and what replaced it. Build the check into the design programme: at concept, at tender issue and again before construction issue. On long projects a standard can be revised between your calculation and the building being tested.',
  },
  {
    question: 'What is the difference between a normative and an informative annex?',
    answer:
      'A normative annex is part of the requirements — you must comply with it to claim conformity. An informative annex is explanatory: worked examples, background, guidance on application. Quoting an informative annex as if it were a requirement is a classic HNC report error and it also weakens a real specification, because the contractor can correctly refuse to price it as mandatory.',
  },
  {
    question:
      'Lighting and acoustics have separate standards. How do I stop them contradicting each other?',
    answer:
      'Put every criterion for every room type into one design criteria schedule — illuminance, uniformity, glare rating, colour rendering, background noise rating, reverberation time, sound insulation between spaces — with the governing document named against each line. Conflicts then become visible on one page: a perforated acoustic ceiling changes luminaire integration; a high-illuminance industrial scheme adds fan-cooled gear and fan noise. Resolve on paper, not on site.',
  },
  {
    question: 'Which documents should a UK building services engineer actually keep to hand?',
    answer:
      'For lighting: the European indoor and outdoor workplace lighting standards, the emergency lighting requirements standard and its UK code of practice, the lighting terminology and photometric data standards, plus the CIBSE/SLL Code for Lighting and the relevant Lighting Guide for the sector. For acoustics: the Approved Document covering sound in dwellings, the general building sound insulation guidance standard, the industrial and commercial sound assessment standard, the single-figure rating and field measurement series, and CIBSE Guide B4 for plant noise. Add the sector document — schools, healthcare, sports — for the project in hand.',
  },
  {
    question: 'How do standards feed into commissioning and handover?',
    answer:
      'Every design criterion should have a matching verification method and a record. Illuminance is verified by a grid measurement with a calibrated meter against the maintained target; emergency lighting by duration testing and a logbook; sound insulation by field measurement to the relevant test standard; reverberation time by a room measurement; plant noise by an in-situ level at the specified position. The handover file should show criterion, source document, predicted value, measured value and the instrument calibration certificate.',
  },
];

const HNCModule2Section4_7 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 2 · Section 4 · Subsection 7"
            title="Standards and Guidelines (CIBSE, BS, EN codes)"
            description="Industry standards and compliance requirements for lighting and acoustic design."
            tone="purple"
          />

          <TLDR
            points={[
              'You place every document on the ladder: statute, statutory guidance (Approved Documents), standards (BS / BS EN / BS EN ISO), industry guidance (CIBSE, SLL, ILP), then client and sector specifications.',
              'You read standards properly — normative versus informative, shall versus should, dated versus undated references, amendments and national annexes.',
              'You know the lighting shelf and the acoustics shelf, and which document owns which descriptor.',
              'You turn all of it into one design criteria schedule per room type, and a verification record at handover that proves each criterion was met.',
            ]}
          />

          <RegsCallout
            source="Building Regulations 2010 — Approved Documents (statutory guidance)"
            clause="An Approved Document illustrates one way of meeting the functional requirement in the Regulations. It is not the only way, and it is not itself the law."
            meaning={
              <>
                The functional requirement is the legal duty; the Approved Document is
                practical guidance issued to show how it can be satisfied. Following it
                is evidence — not proof — of compliance, and an alternative approach is
                permitted provided you can demonstrate the requirement is still met.
                Approved Document E deals with resistance to the passage of sound and
                Approved Document L with the conservation of fuel and power, which is
                where lighting energy performance is picked up. Always work from the
                edition in force for the project, including any amendments.
              </>
            }
            cite="Sources: Building Regulations 2010 and the Approved Documents (gov.uk); CIBSE/SLL Code for Lighting; CIBSE Guide B4 — Noise and Vibration Control for Building Services Systems; BS 8233; BS 4142."
          />

          <LearningOutcomes
            outcomes={[
              'Rank statute, statutory guidance, standards and industry guidance by legal weight',
              'Interpret standards terminology: normative, informative, shall, should, annexes',
              'Identify the principal UK lighting standards and CIBSE/SLL guidance documents',
              'Identify the principal UK building and environmental acoustics standards',
              'Map each design descriptor to the document that defines it',
              'Build a design criteria schedule and a matching verification record',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock
            title="The Hierarchy of Documents"
            plainEnglish="Not every document on your desk has the same weight. Law at the top, guidance below it, and the contract can promote anything to mandatory."
          >
            <p>
              Lighting and acoustic design in the UK is governed by a stack of documents with
              very different legal standing. Confusing the levels is the most common failure in
              HNC assignments — and in real specifications, where it produces criteria nobody
              priced and criteria nobody can enforce.
            </p>
            <p>
              <strong>The ladder, from the top down:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Primary legislation:</strong> Acts of Parliament — the Building Act, the
                Health and Safety at Work etc. Act. Broad duties, rarely quoted in a design.
              </li>
              <li>
                <strong>Secondary legislation:</strong> Regulations made under an Act — the
                Building Regulations, the Construction (Design and Management) Regulations, the
                Control of Noise at Work Regulations, the Workplace (Health, Safety and Welfare)
                Regulations. These are the law and are mandatory.
              </li>
              <li>
                <strong>Statutory guidance:</strong> the Approved Documents. They illustrate one
                way of meeting a functional requirement. Alternatives are permitted if you can
                evidence compliance.
              </li>
              <li>
                <strong>Standards:</strong> BS, BS EN and BS EN ISO documents. Voluntary in
                themselves, but frequently referenced by legislation, by guidance and by the
                contract — which makes them mandatory in practice.
              </li>
              <li>
                <strong>Industry guidance:</strong> CIBSE Guides and Technical Memoranda, SLL
                Code for Lighting and Lighting Guides, ILP guidance notes, trade association
                specifications. Authoritative professional practice, not law.
              </li>
              <li>
                <strong>Client and sector documents:</strong> departmental output specifications,
                healthcare technical memoranda, education acoustic requirements, estate standards.
                Often stricter than everything above them.
              </li>
              <li>
                <strong>The contract:</strong> the employer&rsquo;s requirements and the
                specification. Whatever they cite becomes a contractual obligation regardless of
                its status elsewhere on the ladder.
              </li>
            </ul>
            <p>
              <strong>Why the ranking matters:</strong> a building control body enforces the
              Regulations. A planning authority enforces conditions, often written around an
              assessment standard. A client enforces the contract. An insurer, after a claim,
              asks whether you followed recognised practice. Each audience reads a different rung
              of the ladder, and your design has to satisfy all of them at once.
            </p>
            <p>
              <strong>Occupational noise is a separate track.</strong> Where employees are exposed
              to high noise levels at work, the Control of Noise at Work Regulations impose duties
              on the employer through daily and weekly exposure action values and an absolute
              exposure limit value. That is health and safety law, enforced by the HSE, and it
              runs alongside — not instead of — the building acoustics documents. A plant room
              can simultaneously comply with a residential sound insulation requirement and
              breach an occupational exposure duty.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock
            title="How to Read a Standard"
            plainEnglish="Standards have their own grammar. Learn shall versus should, normative versus informative, and dated versus undated references — then you can quote them without over-committing."
          >
            <p>
              A standard is a legal-technical document with fixed conventions. Reading it
              correctly is a skill in its own right, and it separates an engineer who cites
              standards from one who merely name-drops them.
            </p>
            <p>
              <strong>Understanding the designation:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>BS:</strong> a British Standard — UK origin, UK application.
              </li>
              <li>
                <strong>BS EN:</strong> a European Standard adopted identically as a British
                Standard. Conflicting national standards are withdrawn on adoption.
              </li>
              <li>
                <strong>BS EN ISO:</strong> one text adopted at international, European and
                national level.
              </li>
              <li>
                <strong>PD / PAS / TS / DD:</strong> published documents, publicly available
                specifications, technical specifications and drafts for development. Useful, but
                below full standard status — never present one as a requirement.
              </li>
              <li>
                <strong>Part numbers:</strong> a hyphenated suffix denotes a part of a series
                (indoor versus outdoor, laboratory versus field measurement). Citing the series
                without the part is ambiguous.
              </li>
              <li>
                <strong>Amendments:</strong> shown as +A1, +A2 with a year. A standard plus its
                amendments is a different document from the original print.
              </li>
              <li>
                <strong>National annex (NA):</strong> UK-specific parameters permitted by the
                European text. Where an NA exists, the UK values in it override the default.
              </li>
            </ul>
            <p>
              <strong>Requirement language:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Shall:</strong> a requirement. Mandatory for a claim of conformity.
              </li>
              <li>
                <strong>Should:</strong> a recommendation. Depart from it with a reason.
              </li>
              <li>
                <strong>May:</strong> permission — an allowed option, not an instruction.
              </li>
              <li>
                <strong>Can:</strong> a statement of possibility or capability only.
              </li>
            </ul>
            <p>
              <strong>Normative versus informative:</strong> normative clauses and normative
              annexes carry requirements. Informative annexes, notes, examples and bibliographies
              do not. A note in a standard never contains a requirement — if it appears to, the
              requirement lives in the clause the note is attached to.
            </p>
            <p>
              <strong>Dated and undated references:</strong> a dated reference (standard plus
              year) freezes the edition; only that edition applies. An undated reference means
              the latest edition, including amendments, applies. In a specification the choice is
              a risk decision: date the reference when you need the criteria fixed for the
              contract, leave it undated when you want the contractor to build to current
              practice.
            </p>
            <p>
              <strong>Scope clause first.</strong> Every standard opens by stating what it covers
              and what it excludes. Half of all misapplications are caught by reading the scope:
              an indoor workplace standard does not cover a car park approach; a laboratory
              measurement standard does not describe a site test.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock
            title="The Lighting Shelf"
            plainEnglish="One European standard sets the workplace targets, a family of BS ENs handles emergency lighting, terminology and photometric data, and CIBSE/SLL translates it all into UK sector practice."
          >
            <p>
              Lighting design references divide into performance standards (what the space must
              achieve), product and data standards (what the manufacturer must declare) and
              application guidance (how to do it in a UK office, ward or workshop).
            </p>
            <p>
              <strong>Performance standards — what the space must achieve:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>BS EN 12464-1</strong> — lighting of indoor work places. The reference
                document for maintained illuminance, uniformity, glare rating, colour rendering
                and colour appearance by task and area type.
              </li>
              <li>
                <strong>BS EN 12464-2</strong> — the outdoor work places companion: yards,
                loading bays, external circulation, external plant areas.
              </li>
              <li>
                <strong>BS EN 12193</strong> — sports lighting, with performance classes tied to
                the level of competition and to broadcast requirements.
              </li>
              <li>
                <strong>BS EN 1838</strong> — lighting applications, emergency lighting. Sets out
                what escape route, open area and high-risk task area lighting must deliver.
              </li>
              <li>
                <strong>BS 5266-1</strong> — the UK code of practice for emergency lighting of
                premises: system selection, design application, installation, commissioning and
                the periodic test regime.
              </li>
            </ul>
            <p>
              <strong>Terminology, data and measurement:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>BS EN 12665</strong> — basic terms and criteria for specifying lighting
                requirements. The dictionary the other standards assume you have read.
              </li>
              <li>
                <strong>BS EN 13032 series</strong> — measurement and presentation of photometric
                data. This is why an intensity distribution file from one manufacturer can be
                compared with another&rsquo;s.
              </li>
              <li>
                <strong>BS EN 12464 supporting practice</strong> — verification by measurement:
                a calibrated meter, a defined grid on the working plane, and the maintained value
                as the comparison basis rather than the initial value.
              </li>
            </ul>
            <p>
              <strong>Product and installation standards:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>BS EN 60598 series</strong> — luminaires: general requirements and the
                particular requirements for each luminaire type, including IP and IK ratings.
              </li>
              <li>
                <strong>BS EN 62471</strong> — photobiological safety of lamps and lamp systems,
                which matters for high-output LED and UV sources.
              </li>
              <li>
                <strong>BS EN 15193 series</strong> — energy performance of buildings, energy
                requirements for lighting. Source of the annual lighting energy indicator concept
                used in energy assessments.
              </li>
            </ul>
            <p>
              <strong>UK application guidance:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>SLL Code for Lighting</strong> — the CIBSE Society of Light and Lighting
                overarching design reference.
              </li>
              <li>
                <strong>SLL Lighting Guides (LG series)</strong> — sector-specific commentary:
                industrial, hospitals and healthcare, lecture and conference rooms, exterior
                environment, offices, daylighting and others.
              </li>
              <li>
                <strong>SLL Lighting Handbook</strong> — a condensed practitioner reference for
                day-to-day design decisions.
              </li>
              <li>
                <strong>ILP guidance notes</strong> — Institution of Lighting Professionals
                guidance on obtrusive light and exterior lighting, routinely cited in planning
                conditions for external schemes.
              </li>
              <li>
                <strong>Approved Document L</strong> — energy requirements affecting lighting,
                expressed through efficacy and control provisions. Read the edition in force.
              </li>
            </ul>
            <p>
              <strong>Discipline point:</strong> the European workplace standard gives the target;
              the CIBSE/SLL guide explains how UK practice interprets it; the product standards
              let you prove the equipment can deliver it. Cite the one that actually supports the
              statement you are making.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock
            title="The Acoustics Shelf"
            plainEnglish="Approved Document E for dwellings, BS 8233 for general building sound insulation, BS 4142 for plant noise at a neighbour, the ISO series for rating and measurement, CIBSE Guide B4 for services noise."
          >
            <p>
              Acoustic references split into statutory requirements, assessment methods,
              measurement and rating procedures, prediction methods and sector requirements. A
              competent HNC engineer can say which of those five a document belongs to before
              opening it.
            </p>
            <p>
              <strong>Statutory and planning:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Approved Document E</strong> — resistance to the passage of sound: sound
                insulation between and within dwellings and rooms for residential purposes,
                internal walls and floors, common internal parts and school acoustics by
                cross-reference.
              </li>
              <li>
                <strong>Pre-completion testing and Robust Details</strong> — two alternative
                routes to demonstrating separating element performance in new residential work.
                One tests the building; the other adopts pre-approved constructions registered
                and inspected under a scheme.
              </li>
              <li>
                <strong>Planning conditions</strong> — typically written around an assessment
                standard and a stated criterion at a defined receptor position. Read the
                condition wording precisely; it, not the standard, is what gets discharged.
              </li>
            </ul>
            <p>
              <strong>Assessment and design guidance:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>BS 8233</strong> — guidance on sound insulation and noise reduction for
                buildings. The general design reference for internal ambient noise and building
                envelope performance.
              </li>
              <li>
                <strong>BS 4142</strong> — methods for rating and assessing industrial and
                commercial sound. The method behind almost every plant noise report submitted
                with a planning application.
              </li>
              <li>
                <strong>CIBSE Guide B4</strong> — noise and vibration control for building
                services systems: plant selection, attenuator sizing, breakout, vibration
                isolation, design criteria for room types.
              </li>
              <li>
                <strong>CIBSE Guide A</strong> — environmental design, which supplies the
                background environmental criteria the acoustic targets sit within.
              </li>
            </ul>
            <p>
              <strong>Rating, measurement and prediction:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>BS EN ISO 717 series</strong> — rating of sound insulation. Converts
                frequency-band results into single-figure ratings (Rw, DnT,w, Ln,w) and defines
                the spectrum adaptation terms C and Ctr.
              </li>
              <li>
                <strong>BS EN ISO 10140 series</strong> — laboratory measurement of sound
                insulation of building elements. Where a manufacturer&rsquo;s partition data
                comes from.
              </li>
              <li>
                <strong>BS EN ISO 16283 series</strong> — field measurement of sound insulation
                in buildings: airborne, impact and facade. The site test procedure.
              </li>
              <li>
                <strong>BS EN ISO 3382 series</strong> — measurement of room acoustic parameters,
                including reverberation time.
              </li>
              <li>
                <strong>BS EN 12354 series</strong> — estimation of the acoustic performance of
                buildings from the performance of elements. The prediction route, including
                flanking transmission.
              </li>
              <li>
                <strong>BS EN ISO 1996 series</strong> — description, measurement and assessment
                of environmental noise.
              </li>
            </ul>
            <p>
              <strong>Sector requirements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Education</strong> — acoustic design of schools guidance, giving
                performance standards for teaching and learning spaces, referenced from the
                Approved Document.
              </li>
              <li>
                <strong>Healthcare</strong> — health technical memoranda covering acoustics in
                healthcare premises.
              </li>
              <li>
                <strong>Occupational</strong> — the Control of Noise at Work Regulations and HSE
                guidance, where the concern is employee exposure rather than building
                performance.
              </li>
            </ul>
            <p>
              <strong>Discipline point:</strong> do not quote a laboratory rating where a field
              rating is required. Laboratory Rw excludes flanking; the field descriptor DnT,w
              includes everything the real building does. Specifications that mix them produce
              partitions that pass on paper and fail on test.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock
            title="Descriptors and Who Owns Them"
            plainEnglish="Every symbol on a criteria schedule belongs to a document. Know which, and your schedule becomes defensible instead of decorative."
          >
            <p>
              A design criteria schedule is a list of symbols. Each one has a defining document,
              a measurement method and a tolerance. If you cannot name all three for a line on
              your schedule, that line cannot be enforced.
            </p>
            <p>
              <strong>Lighting descriptors:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Ēm</strong> — maintained illuminance on the reference surface, in lux.
                The design target and the value verified on site.
              </li>
              <li>
                <strong>U₀</strong> — illuminance uniformity, the ratio of minimum to average over
                the reference area.
              </li>
              <li>
                <strong>UGR</strong> — unified glare rating, a calculated discomfort glare index
                for the observer positions and viewing directions stated.
              </li>
              <li>
                <strong>Ra / CRI</strong> — colour rendering index, how faithfully surface
                colours appear under the source.
              </li>
              <li>
                <strong>CCT</strong> — correlated colour temperature in kelvin, the apparent
                warmth or coolness of the light.
              </li>
              <li>
                <strong>MF</strong> — maintenance factor, the depreciation allowance linking
                initial to maintained illuminance.
              </li>
              <li>
                <strong>Efficacy</strong> — luminaire lumens per circuit watt, and installed power
                density in W/m², used in energy compliance.
              </li>
            </ul>
            <p>
              <strong>Acoustic descriptors:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Rw</strong> — weighted sound reduction index of an element, measured in a
                laboratory without flanking.
              </li>
              <li>
                <strong>DnT,w</strong> — weighted standardised level difference between two rooms
                as built, including flanking. Add C or Ctr where the spectrum matters.
              </li>
              <li>
                <strong>L&prime;nT,w</strong> — weighted standardised impact sound pressure level
                in the receiving room. Lower is better, which catches people out.
              </li>
              <li>
                <strong>T (or T₆₀)</strong> — reverberation time, the time for the sound pressure
                level to decay by 60 dB.
              </li>
              <li>
                <strong>LAeq,T</strong> — equivalent continuous A-weighted level over a stated
                period. The general-purpose average.
              </li>
              <li>
                <strong>LA90,T</strong> — the level exceeded for 90% of the period, used as the
                background sound level in an industrial and commercial assessment.
              </li>
              <li>
                <strong>LAFmax</strong> — maximum A-weighted level with fast time weighting, used
                for intermittent events such as a night-time delivery or a plant start.
              </li>
              <li>
                <strong>NR / NC</strong> — noise rating and noise criteria curves, single-figure
                room criteria derived by comparing octave-band levels against a family of curves.
              </li>
            </ul>
            <p>
              <strong>The three questions for every criterion:</strong> which document defines the
              descriptor, what measurement method verifies it, and at what position and time is
              it assessed? &ldquo;NR 30&rdquo; alone is not a criterion. &ldquo;NR 30 from
              building services plant, measured in the centre of the room with the space
              unoccupied and all systems at design duty&rdquo; is.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock
            title="Worked examples"
            plainEnglish="Turning documents into numbers: a criteria schedule, a power-density check, an industrial and commercial noise assessment, and a reverberation-time shortfall."
          >
            <p>
              <strong>Example 1: Building a design criteria schedule.</strong> A mixed-use scheme
              contains offices, a school teaching block, a plant room adjoining flats and an
              external service yard. Which document governs which line?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Office illuminance, uniformity, glare and colour rendering →{' '}
                <strong>BS EN 12464-1</strong>, interpreted through the SLL Lighting Guide for
                offices.
              </li>
              <li>
                Office escape lighting → <strong>BS EN 1838</strong> for the requirements,{' '}
                <strong>BS 5266-1</strong> for the application and testing regime.
              </li>
              <li>
                Teaching space reverberation time and sound insulation → the{' '}
                <strong>education sector acoustic requirements</strong>, referenced from{' '}
                <strong>Approved Document E</strong>.
              </li>
              <li>
                Plant room to flat separating construction → <strong>Approved Document E</strong>,
                verified by field measurement to the{' '}
                <strong>BS EN ISO 16283 series</strong> and rated to the{' '}
                <strong>BS EN ISO 717 series</strong>.
              </li>
              <li>
                Plant noise at the nearest residential facade → <strong>BS 4142</strong>, against
                the planning condition wording.
              </li>
              <li>
                Service yard lighting → <strong>BS EN 12464-2</strong>, with{' '}
                <strong>ILP obtrusive light guidance</strong> for spill and upward light.
              </li>
              <li>
                Lighting energy → <strong>Approved Document L</strong> in force, with the annual
                lighting energy indicator from the{' '}
                <strong>BS EN 15193 series</strong> where an assessment requires it.
              </li>
              <li>
                <strong>Take the numeric targets from the current edition of each document</strong>{' '}
                at the time you issue the schedule — never from a previous project&rsquo;s
                spreadsheet.
              </li>
            </ul>
            <p>
              <strong>Example 2: Installed power density and efficacy check.</strong> The 12 m ×
              8 m classroom from Subsection 4.2 has been lit with 16 LED panels, each 4,000 lm at
              32 W circuit power, for a 300 lux maintained target. Check the energy metrics before
              issuing.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Floor area A = 12 × 8 = <strong>96 m²</strong>
              </li>
              <li>
                Installed circuit power = 16 × 32 = <strong>512 W</strong>
              </li>
              <li>
                Installed power density = 512 / 96 = <strong>5.33 W/m²</strong>
              </li>
              <li>
                Luminaire efficacy = 4,000 / 32 = <strong>125 lm/W</strong>
              </li>
              <li>
                Power density per 100 lux = 5.33 / (300 / 100) = 5.33 / 3 ={' '}
                <strong>1.78 W/m² per 100 lux</strong>
              </li>
              <li>
                Compare each figure against the metric the current energy document actually asks
                for — efficacy, power density or an annual indicator are three different tests and
                a scheme can pass one and fail another.
              </li>
            </ul>
            <p>
              <strong>Example 3: Structure of an industrial and commercial noise assessment.</strong>{' '}
              A roof-mounted chiller serves the office block; the nearest flat is 25 m away. The
              measured specific sound level from the chiller at the facade is 44 dB LAeq. The
              source has an audible tonal component, so a character correction of +3 dB is applied.
              The representative background sound level in the assessment period is 39 dB LA90.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Specific sound level = <strong>44 dB</strong>
              </li>
              <li>
                Character correction (tonality) = <strong>+3 dB</strong>
              </li>
              <li>
                Rating level = 44 + 3 = <strong>47 dB</strong>
              </li>
              <li>
                Background sound level = <strong>39 dB LA90</strong>
              </li>
              <li>
                Excess of rating level over background = 47 − 39 = <strong>+8 dB</strong>
              </li>
              <li>
                The standard then requires the margin to be interpreted{' '}
                <strong>in context</strong> — absolute levels, the character of the residual
                environment, the sensitivity of the receptor and any mitigation already applied.
                Take the interpretation wording from the current edition; do not reduce it to a
                remembered pass/fail number.
              </li>
              <li>
                Design response: if mitigation is needed, an attenuated condenser, a screen
                breaking line of sight, or a lower fan speed at night each reduce the specific
                level — and removing the tonal character removes the correction as well, worth
                3 dB on its own here.
              </li>
            </ul>
            <p>
              <strong>Example 4: Reverberation-time shortfall in a classroom.</strong> The same
              12 m × 8 m room has a 2.8 m floor-to-ceiling height, and the project&rsquo;s
              governing document sets a mid-frequency reverberation time target of 0.8 s. Existing
              finishes provide roughly 20 m² sabins of absorption. How much acoustic ceiling is
              needed?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Room volume V = 12 × 8 × 2.8 = <strong>268.8 m³</strong>
              </li>
              <li>
                Sabine: T = 0.161 V / A, so A = 0.161 V / T
              </li>
              <li>
                A = (0.161 × 268.8) / 0.8 = 43.28 / 0.8 = <strong>54.1 m² sabins</strong>
              </li>
              <li>
                Shortfall = 54.1 − 20 = <strong>34.1 m² sabins</strong>
              </li>
              <li>
                With a ceiling tile of absorption coefficient α = 0.9 at mid frequencies, area
                required = 34.1 / 0.9 = <strong>37.9 m²</strong>, roughly 40% of the 96 m² ceiling.
              </li>
              <li>
                Coordination consequence: 38 m² of perforated tile has to coexist with 16
                luminaires, diffusers, detectors and speakers on the same grid — which is why the
                acoustic criterion belongs on the reflected ceiling plan, not just in a report.
              </li>
              <li>
                Verify on completion by measurement to the room-acoustics measurement standard,
                with the room in its stated furnished condition.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock
            title="Practical guidance"
            plainEnglish="Cite properly, keep the register current, and make every criterion testable. That is what turns a standards list into compliance evidence."
          >
            <p>
              <strong>How to cite a standard in a specification:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Give the full designation including part number.</li>
              <li>Decide deliberately between a dated and an undated reference.</li>
              <li>State the clause topic in words rather than relying on a number alone.</li>
              <li>Say what is required of the contractor: design to it, test to it, or both.</li>
              <li>State the verification method and who witnesses it.</li>
              <li>State the record that will be produced and where it lands in the O&amp;M file.</li>
            </ul>
            <p>
              <strong>Keep a project standards register:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Every document cited, with edition and amendment status.</li>
              <li>Date the status was last checked, and by whom.</li>
              <li>Which specification clauses depend on it.</li>
              <li>Re-check at concept, tender and construction issue.</li>
              <li>Log any revision published mid-project as a formal change.</li>
            </ul>
            <p>
              <strong>Make every criterion testable:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Descriptor, value, position, operating condition and tolerance.</li>
              <li>Instrument type and calibration requirement.</li>
              <li>Who tests, who witnesses, what happens on a failure.</li>
              <li>Where the result is recorded for handover.</li>
            </ul>
            <p>
              <strong>Recording a departure:</strong> state the criterion departed from, the reason,
              the alternative adopted, the evidence that the underlying requirement is still met,
              and the name and date of the person who accepted it. A documented departure is
              engineering judgement; an undocumented one is indistinguishable from an error.
            </p>
            <p>
              <strong>The compliance chain:</strong> criterion (from the standard) → calculation
              (design stage) → specification clause (contract) → installed system (construction) →
              measurement (commissioning) → record (handover file). A break anywhere in that chain
              is where disputes start.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Quoting a superseded edition:</strong> values carried over from an old
                  project spreadsheet, never re-checked against the current document
                </li>
                <li>
                  <strong>Treating guidance as law (or law as optional):</strong> both errors
                  produce indefensible specifications
                </li>
                <li>
                  <strong>Citing an informative annex as a requirement:</strong> the contractor is
                  right to refuse to price it as mandatory
                </li>
                <li>
                  <strong>Mixing laboratory and field descriptors:</strong> specifying Rw where
                  DnT,w is what will actually be tested on site
                </li>
                <li>
                  <strong>Criteria with no verification method:</strong> a number nobody can
                  measure is a number nobody has to achieve
                </li>
                <li>
                  <strong>Ignoring the sector document:</strong> healthcare and education
                  requirements are frequently stricter than the general standard
                </li>
              </ul>
            }
            doInstead="Check the publisher's catalogue record for every document before you issue, name the document and its status on each line of the criteria schedule, quote only normative text as a requirement, specify the field descriptor that will actually be tested, attach a verification method and record to every criterion, and check the sector-specific document before you assume the general standard governs."
          />

          <SectionRule />

          <Scenario
            title="Compliance evidence pack for a school block handover"
            situation={
              <>
                You are the building services engineer on a two-storey teaching block
                reaching practical completion. The contractor has asked for sign-off on
                lighting and acoustics. Approved Document E applies via the education
                sector acoustic requirements, the lighting was designed to the European
                indoor workplace standard interpreted through the relevant SLL Lighting
                Guide, escape lighting to the emergency lighting standard and its UK code
                of practice, and a planning condition on plant noise was written around
                the industrial and commercial sound assessment standard. The client&rsquo;s
                technical adviser has asked for the evidence, not the assurances.
              </>
            }
            whatToDo={
              <>
                Assemble one row per criterion. For lighting: design calculation, the
                maintained illuminance and uniformity targets with the governing document
                named, and a grid measurement with a calibrated meter for each room type.
                For escape lighting: the design layout, the duration test result and the
                completion certificate, plus the logbook handed to the responsible person.
                For teaching-space acoustics: predicted reverberation time, the installed
                absorption schedule, and a room measurement to the room-acoustics standard
                in the stated furnished condition. For separating constructions: field sound
                insulation tests to the field measurement standard, rated to the single-figure
                rating standard, reported as the field descriptor — not the manufacturer&rsquo;s
                laboratory figure. For plant noise: an in-situ measurement at the position
                named in the planning condition, assessed by the method the condition cites.
                Attach every instrument calibration certificate. Where anything departs from
                the design criterion, record the departure formally with the acceptance.
              </>
            }
            whyItMatters={
              <>
                Handover is where the standards stop being reading and start being liability.
                A school that fails an acoustic test after occupation is a remediation project
                inside a live building, during term. An escape lighting system without a
                logbook leaves the responsible person unable to discharge their duty from day
                one. The evidence pack is the only thing that shows the design criteria were
                real — and years later, in a dispute, it is the only thing anybody reads.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'The ladder: legislation (mandatory) → Approved Documents (statutory guidance) → BS/BS EN/BS EN ISO standards → CIBSE, SLL and ILP guidance → client and sector specifications → the contract, which can make any of them binding.',
              "Standards grammar: 'shall' is a requirement, 'should' a recommendation; normative text binds, informative annexes do not.",
              'Dated reference = that edition only. Undated reference = the latest edition including amendments. Choose deliberately.',
              'Lighting shelf: BS EN 12464-1 and -2 for workplaces, BS EN 1838 with BS 5266-1 for emergency lighting, BS EN 12665 for terms, BS EN 13032 for photometric data, SLL Code for Lighting and the LG series for UK practice.',
              'Acoustics shelf: Approved Document E, BS 8233, BS 4142, the BS EN ISO 717 / 10140 / 16283 / 3382 series, BS EN 12354 for prediction, CIBSE Guide B4 for services noise.',
              'Never mix a laboratory rating (Rw) with a field rating (DnT,w) — flanking is the difference, and the site test measures the field value.',
              'Every criterion needs a descriptor, a value, a position, an operating condition, a verification method and a record. Anything less is unenforceable.',
              'Check the edition status of every cited document at concept, tender and construction issue — and record any departure in writing with the approver named.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section4-6')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Human Comfort
              </div>
            </button>
            {/* Final subsection of the final section — return to the Section 4 overview. */}
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Section overview <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Lighting and acoustics
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule2Section4_7;
