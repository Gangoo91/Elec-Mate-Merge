import { ArrowLeft, ChevronLeft, ChevronRight, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  LearningOutcomes,
  ContentEyebrow,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'elm1-s4-bs5266-status',
    question:
      'What is the legal status of BS 5266-1:2025 in the UK regulatory regime, and how does following it deliver compliance with the legal duties under the Regulatory Reform (Fire Safety) Order 2005?',
    options: [
      'It is statute in its own right, and an enforcing authority can prosecute directly under it.',
      'It is a recommendatory Code of Practice — not law, but the standard route to compliance.',
      'It has no legal effect at all and is purely advisory marketing guidance from the manufacturers.',
      'It applies only in Scotland, under the Building (Scotland) Regulations and Technical Handbooks.',
    ],
    correctIndex: 1,
    explanation:
      'A British Standard Code of Practice is recommendatory — it gives a recognised method of meeting a legal duty without being the law itself. Following it provides a defensible compliance route. The legal duty stays with the statute (RRO, Workplace Regs, HSAW, Building Regs); the standard is the technical route to satisfying that duty. The committee that produces the standard is a recognised body of UK industry experts (BSI Committee CPL/34) drawn from manufacturers, designers, contractors, regulators, and insurance interests.',
  },
  {
    id: 'elm1-s4-en1838-vs-50172',
    question:
      'BS EN 1838:2024 and BS EN 50172:2024 are both European Norm standards adopted in the UK with effect from 2024. What is the principal difference between them in terms of subject matter?',
    options: [
      'They are identical documents — direct duplicates of each other with the same scope and content.',
      'BS EN 1838:2024 is the lighting-application standard; BS EN 50172:2024 is the system standard.',
      'BS EN 1838 applies only to hospitals and healthcare premises, not to general commercial buildings.',
      'BS EN 50172 has been withdrawn with no replacement; only BS EN 1838 now applies in the UK.',
    ],
    correctIndex: 1,
    explanation:
      'A useful mnemonic: "1838 = illumination" (what light hits the floor); "50172 = system" (how the whole system delivers, tests, documents). BS 5266-1:2025 is the UK Code of Practice that pulls them together with the BS EN 60598-2-22 luminaire product standard and BS EN 50171 central battery equipment standard to give the integrated UK design and maintenance regime.',
  },
  {
    id: 'elm1-s4-effective-date',
    question:
      'When does BS 5266-1:2025 take effect, and what does that mean for designs in progress at that date?',
    options: [
      'It took effect on 1 January 2024, superseding the previous 2016 edition immediately.',
      'It took effect on 31 October 2025; designs in progress should be reviewed before issue.',
      'It will not take effect until a long transitional period finally ends in the year 2030.',
      'It never formally takes effect — only the parallel European Norm BS EN 1838 applies.',
    ],
    correctIndex: 1,
    explanation:
      'Effective date 31 October 2025. New designs from that date must comply with the 2025 edition. Existing installations comply with the edition in force at design / installation; remediation to the 2025 edition follows the 5-year photometric verification cycle. Design teams should adopt the 2025 edition for any new project not yet at issue stage; transitional designs near the changeover date need careful review.',
  },
  {
    id: 'elm1-s4-560-cross-ref',
    question:
      'BS 7671:2018+A4:2026 Section 560 covers safety services. How does it relate to the emergency lighting standards (BS 5266-1, BS EN 1838, BS EN 50172, BS EN 50171, BS EN 60598-2-22)?',
    options: [
      'Section 560 supersedes BS 5266-1 and is the single lead document for emergency lighting.',
      'Section 560 covers the electrical-installation side; the lighting standards cover performance.',
      'They cover entirely separate subjects with no overlap, cross-reference or shared scope at all.',
      'Section 560 applies only to fire-alarm systems and their wiring, not to emergency lighting.',
    ],
    correctIndex: 1,
    explanation:
      'BS 7671 Section 560 is the wiring-regulations layer for emergency lighting. Reg 560.5 covers safety services circuits; Reg 560.6 covers wiring; Reg 560.7 covers segregation; Reg 560.8 covers sources of supply; Reg 560.10 (refined under A4:2026) covers the supply arrangement specifically. The lighting standards (BS 5266 / EN 1838 / EN 50172) sit on top of the wiring regulations. Both must be met. The certificate trail also includes an Electrical Installation Certificate or EICR per BS 7671 alongside the BS 5266 certificate trail.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which UK standard is the principal Code of Practice for emergency escape lighting?',
    options: [
      'BS 7671:2018+A4:2026 — the IET Wiring Regulations for the electrical installation.',
      'BS EN 1838:2024 — the European lighting application standard for illuminance levels.',
      'BS 5266-1:2025 — the UK "Code of Practice for emergency escape lighting".',
      'BS EN 50172:2024 — the European system requirements and testing-regime standard.',
    ],
    correctAnswer: 2,
    explanation:
      'BS 5266-1:2025 is the UK Code of Practice. The European Norms (BS EN 1838 for lighting application, BS EN 50172 for system requirements, BS EN 50171 for central battery equipment, BS EN 60598-2-22 for luminaires) are the European-level technical standards that BS 5266-1 calls up as normative references. Together they form the integrated UK regime.',
  },
  {
    id: 2,
    question:
      'BS EN 1838:2024 specifies which of the following emergency lighting requirements?',
    options: [
      'The illuminance levels, uniformity ratios and switch-on times for escape, anti-panic and high-risk lighting.',
      'Only the rated duration of the emergency lighting, expressed in hours of battery autonomy.',
      'Only the wiring and circuit arrangement supplying the emergency luminaires on each escape route.',
      'Only the colour, shape and dimensions of the running-man exit-sign pictogram.',
    ],
    correctAnswer: 0,
    explanation:
      'BS EN 1838 is the lighting application standard. The 2024 edition introduces the full-width-of-escape-route requirement with explicit edge exclusions (replacing the 2013 centre-line + central-band wording) and formally recognises local-area lighting. The illuminance levels, ratios, and switch-on times are the core content; designers calculate to these targets; commissioning verifies them; the 5-year photometric survey re-verifies them.',
  },
  {
    id: 3,
    question:
      'BS EN 50172:2024 specifies the testing regime for emergency lighting. What is its standard test schedule?',
    options: [
      'A single annual full-duration discharge test, with no daily, monthly or five-yearly checks.',
      'A single five-yearly photometric survey, with no daily, monthly or annual functional checks.',
      'No formal periodic test regime is specified by the standard; testing is left to the duty holder.',
      'Daily indicator check, monthly functional test, annual full discharge and a 5-year photometric survey.',
    ],
    correctAnswer: 3,
    explanation:
      'The four-tier test schedule is the BS EN 50172:2024 framework. Daily for central battery (visual indicator check). Monthly functional test of each luminaire. Annual full discharge. 5-year photometric. The 5-year photometric is the 2024 introduction and is the new audit point. The log book per §6 of the standard is the legal record; without it the responsible person cannot demonstrate Article 17 (RRO) maintenance compliance.',
  },
  {
    id: 4,
    question:
      'BS EN 50171 covers:',
    options: [
      'Domestic lamps, light bulbs and general-purpose lighting fittings for dwellings.',
      'Central power supply systems (battery, charger, monitoring) for emergency safety services.',
      'Smoke and heat detectors, sounders and control panels for fire-alarm systems.',
      'Solar PV arrays, inverters and battery-storage installations for buildings.',
    ],
    correctAnswer: 1,
    explanation:
      'BS EN 50171 is the central-battery-equipment product standard. Specifies the kit. Compliance is the manufacturer\'s responsibility; the design specifies "central battery shall comply with BS EN 50171". On site verification at handover: the equipment data sheet and CE / UKCA marking declares compliance. Cross-reference to BS 5266-1:2025 §6, BS EN 50172:2024 §5, and BS 7671:2018+A4:2026 §560.',
  },
  {
    id: 5,
    question:
      'BS EN 60598-2-22 is the product standard for:',
    options: [
      'Cable trays, trunking and containment systems for safety-service wiring.',
      'Smoke detectors, heat detectors and manual call points for fire alarms.',
      'Emergency luminaires — the fitting itself, including construction, safety and battery integration.',
      'Portable and fixed fire extinguishers and their wall-mounting brackets.',
    ],
    correctAnswer: 2,
    explanation:
      'BS EN 60598-2-22 is the product standard. Every emergency luminaire on a UK project must be compliant with it. Specification documents and procurement orders should require it. On audit, cross-reference the luminaire data sheet against the standard\'s declaration of mode, duration, IP rating, photometric data, battery type, and changeover behaviour.',
  },
  {
    id: 6,
    question:
      'What is the relationship between BS 5266-1 and BS EN 1838 / BS EN 50172?',
    options: [
      'BS 5266-1:2025 is the integrating UK Code of Practice; it calls up the European Norms as normative references.',
      'They directly contradict each other on the required escape-route illuminance levels.',
      'They are entirely separate documents with no cross-references or normative links at all.',
      'BS 5266-1 has been fully withdrawn and replaced by the European Norm BS EN 1838.',
    ],
    correctAnswer: 0,
    explanation:
      'The UK regime uses BS 5266-1 as the integrating Code of Practice and the European Norms as the technical building blocks. Specifying "design to BS 5266-1:2025" implicitly invokes BS EN 1838:2024, BS EN 50172:2024, BS EN 50171, BS EN 60598-2-22, plus the BS 7671 Section 560 wiring rules. All are needed; together they form the design framework.',
  },
  {
    id: 7,
    question:
      'BS 5266-7 has historical relevance but is no longer the current technical reference. What replaced it?',
    options: [
      'It still applies unchanged as the current technical reference for the lighting application.',
      'It was renumbered to become BS 5266-3, retaining the same lighting-application content.',
      'It was renumbered as BS 5266-99 and remains the active application standard for the UK.',
      'It was withdrawn and superseded by the European Norm BS EN 1838 (now the 2024 edition).',
    ],
    correctAnswer: 3,
    explanation:
      'BS 5266-7 is a withdrawn legacy document. The European Norm process replaced national lighting-application standards with the BS EN 1838 series. Old specifications referencing BS 5266-7 should be updated to BS EN 1838:2024. Designers reading legacy specs need to map old references to current standards.',
  },
  {
    id: 8,
    question:
      'Where does BS 5266-1:2025 sit in relation to ICEL guidance and LIA technical statements?',
    options: [
      'ICEL and LIA guidance directly contradicts the standard on key design requirements.',
      'ICEL and LIA produce supplementary guidance that sits alongside BS 5266-1, not above it.',
      'ICEL guidance is statutory and legally overrides BS 5266-1 where the two differ.',
      'The LIA is a division of the HSE holding direct enforcement and prosecution powers.',
    ],
    correctAnswer: 1,
    explanation:
      'ICEL and LIA produce industry guidance — typically more detailed and updated more frequently than the BS standard. ICEL Approved Contractor and LIA-aligned competence are increasingly required by insurers and large clients. The standard is the legal anchor; the industry guidance is the working detail. Use both.',
  },
  {
    id: 9,
    question:
      'BS 7671:2018+A4:2026 Section 560 covers safety services. Which of the following is one of the regulations within Section 560 that is most directly relevant to emergency lighting?',
    options: [
      'Reg 411.3.4 — the automatic disconnection times for fault protection.',
      'Reg 433.1 — the coordination of protection against overload current.',
      'The Section 560 source-of-supply regulations — independent supply, switching and transfer time.',
      'Reg 132 — the assessment of general characteristics of the installation.',
    ],
    correctAnswer: 2,
    explanation:
      'Section 560 is dedicated to safety services. Its source-of-supply regulations bridge the lighting system (BS 5266) and the electrical installation (BS 7671). Anyone designing emergency lighting must read Section 560 alongside BS 5266-1:2025; the certificate trail covers both. Reg 411.3.4, 433.1 and 132 belong to unrelated parts of BS 7671.',
  },
  {
    id: 10,
    question:
      'Approved Document B and the equivalents in Wales, Scotland and Northern Ireland are STATUTORY GUIDANCE under the Building Regulations. How does this differ from BS 5266-1:2025?',
    options: [
      'Approved Document B is statutory guidance saying WHERE emergency lighting is required; BS 5266-1:2025 says HOW to deliver it.',
      'They are identical documents covering the same scope, content and legal status throughout.',
      'BS 5266-1 is statutory law, while Approved Document B is merely recommendatory guidance.',
      'Neither document has any legal effect whatsoever; both are purely advisory good practice.',
    ],
    correctAnswer: 0,
    explanation:
      'Both have legal weight but in different ways. Approved Document B is statutory guidance — a recognised route to compliance with the Building Regulations. BS 5266-1 is the technical British Standard that delivers the engineering compliance the Approved Document presumes. RRO 2005 is the broader fire-safety statute that applies in occupation. Each layer adds something; together they form the legal-and-technical regime.',
  },
];

const EmergencyLightingModule1Section4 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'BS 5266 and related standards | Emergency Lighting M1.4 | Elec-Mate',
    description:
      'BS 5266-1:2025 (UK Code of Practice), BS EN 1838:2024 (lighting application), BS EN 50172:2024 (system requirements), BS EN 50171 (central battery), BS EN 60598-2-22 (luminaire), BS 7671:2018+A4:2026 §560 — the integrated UK standards stack.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('/electrician/upskilling/emergency-lighting-module-1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 1
          </button>

          <PageHero
            eyebrow="Module 1 · Section 4"
            title="Overview of BS 5266 and related standards"
            description="BS 5266-1:2025 as the UK Code of Practice, the BS EN 1838:2024 / 50172:2024 / 50171 / 60598-2-22 stack, and the BS 7671 §560 wiring-regulations link — how the documents fit together as one regime."
            tone="yellow"
          />

          <TLDR
            points={[
              'BS 5266-1:2025 is the UK Code of Practice for emergency escape lighting — the integrating document. Recommendatory, not statutory; following it is the standard route to demonstrating compliance with the RRO 2005, Workplace Regulations 1992, HSAW Act 1974, and Building Regulations.',
              'BS EN 1838:2024 is the lighting application standard — illuminance levels (1 lx escape, 0.5 lx anti-panic, 15 lx high-risk), switch-on times (5 s / 60 s / 0.5 s), uniformity ratios (40:1 / 10:1), full-open-width escape route (2024 NEW), local-area lighting recognition (2024 NEW).',
              'BS EN 50172:2024 is the system requirements standard — testing regime (daily / monthly / annual / 5-year photometric — 2024 NEW), log book, design considerations, system architecture.',
              'BS EN 50171 is the central battery equipment product standard — required where central battery is used.',
              'BS EN 60598-2-22 is the luminaire product standard — required for all emergency luminaires alongside BS EN 60598-1 general luminaires.',
              'BS 7671:2018+A4:2026 Section 560 covers safety services electrical installation — supply, wiring, segregation, sources (Reg 560.10 refined under A4:2026).',
              'Approved Document B Vol 2 cl. 5 is statutory guidance under Building Regulations — tells you WHERE emergency lighting is required for new build / material alteration.',
              'Industry guidance from ICEL and LIA supplements the standards with practical design / install / maintain detail.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Place BS 5266-1:2025 within the UK regulatory regime and explain its status as a recommendatory Code of Practice',
              'Identify the European Norms called up by BS 5266-1:2025 — BS EN 1838:2024 (lighting application), BS EN 50172:2024 (system), BS EN 50171 (central battery equipment), BS EN 60598-2-22 (luminaire product)',
              'Distinguish lighting application standards (what illuminance to deliver) from system requirements standards (how to design / test / document) from product standards (the kit itself)',
              'Recognise the 2024 BS EN 1838 changes — full open-width escape route requirement, local-area lighting recognition',
              'Recognise the 2024 BS EN 50172 changes — 5-year photometric verification added to the test regime',
              'Apply the BS 7671:2018+A4:2026 Section 560 wiring-regulations layer alongside the lighting standards',
              'Use Approved Document B Vol 2 cl. 5 as the statutory-guidance starting point for new build / material alteration',
              'Reference industry guidance (ICEL, LIA technical statements) appropriately as supplementary material',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>BS 5266-1:2025 — the integrating Code of Practice</ContentEyebrow>

          <ConceptBlock
            title="What it is, what it does"
            plainEnglish="BS 5266-1:2025 is the British Standard 'Code of Practice for emergency escape lighting'. It came into effect on 31 October 2025, superseding BS 5266-1:2016. As a Code of Practice, it sets out the recommended way to design, install, commission, operate and maintain emergency lighting in UK premises. It is the document UK contractors, designers, fire risk assessors, insurers, and Building Control reference as 'how it should be done'. Following it provides a defensible compliance position; departing from it requires a documented engineering case for the alternative method."
            onSite="Treat BS 5266-1:2025 as the engineering brief. The legal duty defines the goal; the standard defines a known-safe path to the goal. Any design, installation, commissioning, or maintenance work in the UK references BS 5266-1 by default. Specifications often state 'design and install in accordance with BS 5266-1:2025'; that single reference draws in the entire supporting standards stack as normative references."
          >
            <p>What BS 5266-1:2025 covers (high-level structure):</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Section 1 — Scope.</strong> Covers escape lighting (escape route, open
                area / anti-panic, high-risk task), local-area lighting, and standby lighting.
                Borrowed light is excluded from design provision (NEW in 2025).
              </li>
              <li>
                <strong>Section 2 — Normative references.</strong> Calls up BS EN 1838:2024 for
                illuminance application, BS EN 50172:2024 for system requirements, BS EN 50171
                for central battery equipment, BS EN 60598-2-22 for luminaires, BS 7671 for
                electrical installation, plus other supporting references.
              </li>
              <li>
                <strong>Section 3 — Terms and definitions.</strong> The vocabulary used in the
                standard — escape route, open area, high-risk task area, local area, standby
                lighting, point of emphasis, contour limits, maintained / non-maintained /
                sustained luminaires.
              </li>
              <li>
                <strong>Section 4 — General principles.</strong> Function (the four-plus-one
                purposes), system architecture options (self-contained / central battery /
                hybrid), design approach (risk-driven), durations.
              </li>
              <li>
                <strong>Section 5 — Design.</strong> Calculation methods, points of emphasis,
                illuminance distribution, layout. The borrowed-light exclusion sits here in
                Cl. 5.2. Direct illumination requirement.
              </li>
              <li>
                <strong>Section 6 — Wiring and electrical supplies.</strong> Cross-references
                BS 7671 §560. NEW in 2025: high-risk segmentation rule (≥ 2 separate circuits,
                ≤ 20 luminaires per fault).
              </li>
              <li>
                <strong>Section 7 — Installation, commissioning, certification.</strong>
                Documentation pack: design certificate, installation certificate, commissioning
                certificate, photometric survey at handover.
              </li>
              <li>
                <strong>Section 8 — Inspection, servicing, testing.</strong> Aligns with BS EN
                50172:2024. Test schedule (daily / monthly / annual / 5-year photometric).
                Log book requirements. NEW in 2025: 5-year photometric verification (Cl. 8.3).
              </li>
              <li>
                <strong>Annexes.</strong> Sample log book, design worked examples, test record
                templates, special premises supplements.
              </li>
            </ul>
            <p>
              The structure is broadly continuous with the 2016 edition; the substantive
              changes are concentrated in scope (Section 1), design (Section 5 borrowed-light),
              wiring (Section 6 segmentation), and inspection (Section 8 photometric
              verification). The annexes have been refined.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5266-1:2025 · Foreword (status of the standard)"
            clause={
              <>
                This British Standard is a Code of Practice. It takes the form of guidance
                and recommendations. It should not be quoted as if it were a specification or
                a legal document, and particular care should be taken to ensure that claims
                of compliance are not misleading. Following the recommendations in this Code
                of Practice does not in itself guarantee that the law has been complied with;
                however, it is intended to assist the user in complying with relevant
                statutory provisions.
              </>
            }
            meaning="The status statement is important. The standard is not law; it is a recommended method. Following it provides a defensible compliance route. The legal duty stays with statute (RRO, Workplace Regs, HSAW, Building Regs); the standard is the technical route. Departing from it is permitted but requires documented engineering justification."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          {/* Standards hierarchy chart */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Standards hierarchy — the integrated UK regime
            </h4>
            <svg
              viewBox="0 0 820 440"
              className="w-full h-auto"
              role="img"
              aria-label="Hierarchy of standards for emergency lighting in the UK. At the top, the legal regime — RRO 2005, Workplace Regulations 1992, HSAW 1974, Building Regulations Approved Document B. In the middle layer, BS 5266-1:2025 as the UK Code of Practice that integrates the European Norms below. Bottom layer: BS EN 1838:2024 for lighting application, BS EN 50172:2024 for system requirements, BS EN 50171 for central battery equipment, BS EN 60598-2-22 for luminaire products. Linked to BS 7671:2018+A4:2026 §560 for the electrical installation."
            >
              {/* Legal layer */}
              <rect x="20" y="20" width="780" height="60" rx="8" fill="rgba(168,85,247,0.06)" stroke="rgba(168,85,247,0.4)" strokeWidth="1.4" />
              <text x="410" y="42" textAnchor="middle" fill="#A855F7" fontSize="11" fontWeight="bold">LEGAL LAYER · the duty</text>
              <text x="410" y="58" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9.5">RRO 2005 · Workplace Regs 1992 · HSAW 1974 · Building Regs (Approved Doc B)</text>
              <text x="410" y="72" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">"What you must achieve" — the legal duty on the responsible person</text>

              {/* Connector */}
              <line x1="410" y1="84" x2="410" y2="98" stroke="rgba(255,255,255,0.35)" strokeWidth="1.4" />
              <polygon points="410,98 406,90 414,90" fill="rgba(255,255,255,0.55)" />

              {/* UK Code of Practice */}
              <rect x="180" y="104" width="460" height="62" rx="8" fill="rgba(251,191,36,0.08)" stroke="#FBBF24" strokeWidth="1.6" />
              <text x="410" y="124" textAnchor="middle" fill="#FBBF24" fontSize="11" fontWeight="bold">BS 5266-1:2025 · UK CODE OF PRACTICE</text>
              <text x="410" y="140" textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="9.5">The integrating document — design, install, commission, operate, maintain</text>
              <text x="410" y="156" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">Effective 31 Oct 2025 · "How to deliver the duty" — recommendatory, not statutory</text>

              {/* Connector down with branches */}
              <line x1="410" y1="170" x2="410" y2="184" stroke="rgba(255,255,255,0.35)" strokeWidth="1.4" />
              <polygon points="410,184 406,176 414,176" fill="rgba(255,255,255,0.55)" />

              {/* Normative-reference layer header */}
              <rect x="20" y="190" width="780" height="36" rx="6" fill="rgba(34,197,94,0.05)" stroke="rgba(34,197,94,0.4)" strokeWidth="1.2" />
              <text x="410" y="210" textAnchor="middle" fill="#22C55E" fontSize="10.5" fontWeight="bold">EUROPEAN NORM TECHNICAL STANDARDS · the building blocks</text>
              <text x="410" y="222" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">Called up as normative references by BS 5266-1:2025</text>

              {/* 4 columns of EN standards */}
              <g>
                <rect x="32" y="238" width="180" height="118" rx="8" fill="rgba(34,197,94,0.06)" stroke="#22C55E" strokeWidth="1.4" />
                <text x="122" y="258" textAnchor="middle" fill="#86EFAC" fontSize="10" fontWeight="bold">BS EN 1838:2024</text>
                <text x="122" y="274" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">Lighting application</text>
                <text x="122" y="290" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">1 lx escape · 0.5 lx anti-panic</text>
                <text x="122" y="304" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">15 lx high-risk · 5/60/0.5 s</text>
                <text x="122" y="318" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">2024: full open-width</text>
                <text x="122" y="332" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">2024: local-area lighting</text>
                <text x="122" y="346" textAnchor="middle" fill="rgba(34,197,94,0.85)" fontSize="9" fontWeight="bold">"What light to deliver"</text>
              </g>

              <g>
                <rect x="222" y="238" width="180" height="118" rx="8" fill="rgba(34,197,94,0.06)" stroke="#22C55E" strokeWidth="1.4" />
                <text x="312" y="258" textAnchor="middle" fill="#86EFAC" fontSize="10" fontWeight="bold">BS EN 50172:2024</text>
                <text x="312" y="274" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">System requirements</text>
                <text x="312" y="290" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">Daily · monthly · annual</text>
                <text x="312" y="304" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">2024 NEW: 5-year photometric</text>
                <text x="312" y="318" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">Log book §6</text>
                <text x="312" y="332" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">System architecture</text>
                <text x="312" y="346" textAnchor="middle" fill="rgba(34,197,94,0.85)" fontSize="9" fontWeight="bold">"How the system works"</text>
              </g>

              <g>
                <rect x="412" y="238" width="180" height="118" rx="8" fill="rgba(34,197,94,0.06)" stroke="#22C55E" strokeWidth="1.4" />
                <text x="502" y="258" textAnchor="middle" fill="#86EFAC" fontSize="10" fontWeight="bold">BS EN 50171</text>
                <text x="502" y="274" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">Central battery equipment</text>
                <text x="502" y="290" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">Performance · monitoring</text>
                <text x="502" y="304" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">Charging · environmental</text>
                <text x="502" y="318" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">Required for central battery</text>
                <text x="502" y="332" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">Manufacturer compliance</text>
                <text x="502" y="346" textAnchor="middle" fill="rgba(34,197,94,0.85)" fontSize="9" fontWeight="bold">"Central battery kit"</text>
              </g>

              <g>
                <rect x="602" y="238" width="180" height="118" rx="8" fill="rgba(34,197,94,0.06)" stroke="#22C55E" strokeWidth="1.4" />
                <text x="692" y="258" textAnchor="middle" fill="#86EFAC" fontSize="10" fontWeight="bold">BS EN 60598-2-22</text>
                <text x="692" y="274" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">Luminaire product standard</text>
                <text x="692" y="290" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">Construction · marking</text>
                <text x="692" y="304" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">Photometric · charging</text>
                <text x="692" y="318" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">Mode classification (X0/X1/C)</text>
                <text x="692" y="332" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">Required for all EL fittings</text>
                <text x="692" y="346" textAnchor="middle" fill="rgba(34,197,94,0.85)" fontSize="9" fontWeight="bold">"The luminaire"</text>
              </g>

              {/* BS 7671 cross-reference strip */}
              <rect x="20" y="378" width="780" height="48" rx="8" fill="rgba(34,211,238,0.06)" stroke="rgba(34,211,238,0.4)" strokeWidth="1.4" />
              <text x="410" y="398" textAnchor="middle" fill="#22D3EE" fontSize="11" fontWeight="bold">+ BS 7671:2018+A4:2026 · Section 560 (Safety services)</text>
              <text x="410" y="414" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9.5">Reg 560.5/.6/.7/.8/.10 — supply, wiring, segregation, sources of supply (refined under A4:2026)</text>
            </svg>
          </div>

          <SectionRule />

          <ContentEyebrow>BS EN 1838:2024 — the lighting application standard</ContentEyebrow>

          <ConceptBlock
            title="What 1838 specifies"
            plainEnglish="BS EN 1838:2024 is the European Norm for emergency lighting application. It specifies the illuminance levels that must be achieved on the floor (or relevant working plane), the switch-on times, the uniformity ratios, and the categorisation of emergency lighting (escape route, open-area / anti-panic, high-risk task area). The 2024 edition introduced two material updates: the full-width escape route requirement with explicit edge exclusions (replacing the 2013 centre-line + central-band wording) and formal recognition of local-area lighting for occupants permitted to remain during a mains-failure event."
          >
            <p>What 1838:2024 specifies in detail:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Escape route lighting (Cl. 4.3).</strong> 1 lx minimum across the full
                width of the escape route at floor level, with the outer 0.5 m on each side
                excluded for routes wider than 2 m and the outer ¼ width on each side excluded
                for routes 2 m or narrower. The 2024 edition replaces the 2013 wording (1 lx on
                the centre line + 0.5 lx on a 2 m central band) with this full-width rule plus
                edge exclusions, closing the loophole that allowed dim edges.
              </li>
              <li>
                <strong>Open-area / anti-panic lighting (Cl. 4.2).</strong> 0.5 lx minimum
                across the empty core area (excluding 0.5 m perimeter strip). Maximum 40:1
                ratio of brightest to darkest point. The trigger thresholds (when this
                category applies) are in BS 5266-1, not in 1838.
              </li>
              <li>
                <strong>High-risk task area lighting (Cl. 4.4).</strong> 15 lx OR 10% of
                normal task illuminance, whichever is greater. Maximum 10:1 ratio. Switch-on
                within 0.5 s. Free from harmful stroboscopic effects. The category serves the
                continued-operation-for-safe-shutdown function.
              </li>
              <li>
                <strong>Local-area lighting (Cl. 4.5 — NEW in 2024).</strong> For occupants
                permitted to remain during the mains-failure event. Levels per the application
                — the 2024 edition gives recommendations rather than a single minimum
                illuminance.
              </li>
              <li>
                <strong>Switch-on times (Cl. 4.3, 4.4).</strong> Escape and anti-panic: 50%
                of required illuminance within 5 s; 100% within 60 s. High-risk: 100% within
                0.5 s.
              </li>
              <li>
                <strong>Photometric measurement (Cl. 5).</strong> Where measurements are
                taken, what calibration the luxmeter must have, the measurement spacing on
                the floor, the conditions for measurement (clean luminaires, mains
                disconnected, room in normal occupational state).
              </li>
            </ul>
            <p>
              The standard does not specify which premises need which categories — that is
              BS 5266-1's job. 1838 specifies the performance requirements once the category
              is identified. The 2024 edition's most material additions — full-width-with-edge-
              exclusions escape route and local-area recognition — flow into the
              BS 5266-1:2025 design guidance.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 1838:2024 · Clause 4.3 (Escape route lighting)"
            clause={
              <>
                The horizontal illuminance at floor level on the escape route shall be not less
                than 1 lx across the full width of the route. For escape routes wider than 2 m,
                an outer border of 0.5 m on each side may be excluded. For escape routes of 2 m
                width or less, an outer border of one quarter of the route width on each side
                may be excluded. The maximum ratio of the maximum illuminance to the minimum
                illuminance along the route within the non-excluded width shall not exceed 40:1.
              </>
            }
            meaning="The 2024 update replaces the 2013 wording (1 lx on the centre line + 0.5 lx on a 2 m central band) with a full-width 1 lx rule and explicit edge exclusions. Now 1 lx must be achieved across the FULL non-excluded width of the route, not just at the geometric centre. The change forces designers to use luminaires that distribute light wider, or place luminaires closer to the corridor walls."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>BS EN 50172:2024 — the system requirements standard</ContentEyebrow>

          <ConceptBlock
            title="What 50172 specifies"
            plainEnglish="BS EN 50172:2024 is the European Norm for emergency escape lighting systems — the SYSTEM as a whole, not the lighting application or the luminaire product. It specifies the design requirements (where luminaires go, the circuiting principles, the supply arrangements), the testing regime (the test schedule including the 2024-introduced 5-year photometric verification), the log book and documentation requirements, and the system architecture options."
          >
            <p>What 50172:2024 specifies in detail:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Cl. 4 — Design.</strong> Where emergency luminaires must be placed at
                a system level (escape route, open-area, points of emphasis). Cross-reference
                to BS EN 1838 for the photometric application.
              </li>
              <li>
                <strong>Cl. 5 — System architecture.</strong> Self-contained, central
                battery, hybrid. Cross-reference to BS EN 50171 for central battery
                equipment.
              </li>
              <li>
                <strong>Cl. 6 — Documentation and log book.</strong> What records must be
                kept — design, installation, commissioning, periodic tests, defects, repairs.
                Retention period (minimum 5 years).
              </li>
              <li>
                <strong>Cl. 7 — Inspection and testing.</strong> THE TEST SCHEDULE — daily
                visual checks for central battery indicator panels, monthly functional test
                of each luminaire, annual full-duration discharge test, NEW IN 2024: 5-year
                photometric verification.
              </li>
              <li>
                <strong>Cl. 8 — Specific applications.</strong> Sector annexes and special
                considerations for healthcare, places of assembly, etc.
              </li>
            </ul>
            <p>
              The 5-year photometric verification is the highest-impact change in the 2024
              edition. Previously the test regime stopped at the annual discharge test;
              actual measured illuminance was checked at commissioning and not
              systematically thereafter. The 2024 edition introduces the 5-year survey as a
              mandatory periodic check that the actual illuminance still meets the BS EN
              1838 levels. This catches lumen depreciation, dirt, decoration changes, and
              layout changes that the annual functional test cannot detect.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 50172:2024 · Clause 7.4 (Photometric verification — NEW)"
            clause={
              <>
                In addition to the periodic functional and duration tests specified in this
                clause, the photometric performance of the emergency lighting installation
                shall be verified at intervals not exceeding five years. The verification
                shall use a calibrated luxmeter to measure the actual illuminance at the
                points of emphasis, across the full width of the escape route (within the
                BS EN 1838:2024 non-excluded boundary), across the empty core of any open
                area requiring anti-panic lighting, and at any high-risk task points. The
                measured values shall be compared to the values required by BS EN 1838:2024.
                The results shall be recorded in the log book and retained for not less than
                five years.
              </>
            }
            meaning="The 5-year photometric is THE NEW AUDIT POINT. It puts real-world illuminance measurement on a periodic schedule for the first time. Annual discharge proves the system runs for 3 hours; the photometric proves the floor is still illuminated to BS EN 1838 levels at year 5. The two together provide complete verification of the installation's continued performance."
          />

          <SectionRule />

          <ContentEyebrow>BS EN 50171, BS EN 60598-2-22, BS 7671 §560 — the supporting cast</ContentEyebrow>

          <ConceptBlock
            title="BS EN 50171 — central battery equipment"
            plainEnglish="BS EN 50171 is the product standard for central battery equipment. It specifies what a compliant central battery system must do — performance under fault conditions, monitoring of charging and battery health, automatic testing facilities, environmental conditions (operating temperature, ventilation, fire protection of the equipment room), labelling and identification."
          >
            <p>Key 50171 requirements:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Performance.</strong> Battery must support rated load for rated
                duration (typically 3 hours), with end-of-discharge cell voltage above the
                cut-off limit. Charger must replace the discharge in a defined recharge time.
              </li>
              <li>
                <strong>Monitoring.</strong> Indicator panel showing charge state, fault
                states, test results. The daily visual check (BS EN 50172:2024) is performed
                against this panel.
              </li>
              <li>
                <strong>Test facilities.</strong> Means to initiate functional and
                full-discharge tests; means to record results.
              </li>
              <li>
                <strong>Environmental.</strong> Battery room ventilation (especially for
                vented lead-acid), temperature limits, fire protection of the equipment.
              </li>
              <li>
                <strong>Labelling.</strong> Identification of the system, ratings, hazard
                warnings.
              </li>
            </ul>
            <p>
              When specifying central battery, require BS EN 50171 compliance in the
              specification document. The manufacturer's declaration of compliance, plus the
              CE / UKCA marking of the equipment, demonstrates conformity. Cross-reference
              also to BS 7671:2018+A4:2026 §560 for the electrical installation aspects of
              the supply.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="BS EN 60598-2-22 — luminaires for emergency lighting"
            plainEnglish="BS EN 60598-2-22 is the product standard for emergency lighting luminaires. Every emergency luminaire — self-contained or central-battery-fed — must comply. It is part of the BS EN 60598 series; the -1 part (BS EN 60598-1) covers general luminaires; the -2-22 part adds emergency-specific requirements for the integral battery, electronics, automatic operation on mains failure, photometric duty, mode classification, marking and rating-plate symbology."
          >
            <p>Key 60598-2-22 elements:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Mode classification.</strong> Type X0 (non-maintained), Type X1
                (maintained), Type C (combined / sustained). Each mode has specific
                requirements for operating behaviour.
              </li>
              <li>
                <strong>Battery integration.</strong> The internal battery must be matched to
                the luminaire's load and rated duration. Charging must be controlled to
                preserve battery life. Monitoring must indicate readiness, fault state, and
                end-of-life.
              </li>
              <li>
                <strong>Changeover.</strong> The luminaire must change from mains operation
                to battery operation automatically and within the BS EN 1838 switch-on time
                (5 s for general escape; 0.5 s for high-risk).
              </li>
              <li>
                <strong>Photometric performance.</strong> The luminaire's declared
                photometric data must be reliable for design calculations. Manufacturer's
                LDT files (lighting data) used in design software conform to standardised
                formats.
              </li>
              <li>
                <strong>Marking.</strong> Rating plate must show mode, duration, IP rating,
                voltage, lamp type, manufacturer identification, batch / serial number.
              </li>
            </ul>
            <p>
              On site, verify product compliance at procurement (data sheet declares
              60598-2-22) and at installation (rating plate visible after install). The
              certificate trail at handover includes product compliance evidence — typically
              the manufacturer's DoC (Declaration of Conformity) plus type-test results.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="BS 7671:2018+A4:2026 Section 560 — the wiring regulations layer"
            plainEnglish="BS 7671:2018+A4:2026 is the IET Wiring Regulations — the UK electrical installation standard. Section 560 covers safety services, including emergency lighting. While BS 5266-1 / BS EN 1838 / BS EN 50172 cover the lighting performance and system requirements, Section 560 covers the electrical installation — the supply arrangement, the wiring, the segregation, the sources of supply, the cable selection. Both layers must be met. The A4:2026 amendment (effective 2026) refined Section 560, particularly Reg 560.10 on sources of supply."
          >
            <p>Key Section 560 regulations relevant to emergency lighting:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Reg 560.5 (Circuits).</strong> Safety service circuits must be
                independent of other circuits and identified clearly.
              </li>
              <li>
                <strong>Reg 560.6 (Wiring systems).</strong> Cables for safety services have
                specific requirements — fire resistance for circuits whose continued
                operation is required during fire conditions, e.g. central battery feeds to
                emergency luminaires in some applications.
              </li>
              <li>
                <strong>Reg 560.7 (Segregation).</strong> Safety service circuits must be
                segregated from non-safety circuits to prevent fault propagation.
              </li>
              <li>
                <strong>Reg 560.8 (Sources of supply — general).</strong> Requirements for
                independent sources of supply.
              </li>
              <li>
                <strong>Reg 560.10 (Sources of supply — refined under A4:2026).</strong>
                Specific requirements for the source of supply for safety services. The 2026
                amendment refined the wording and clarified the requirement for monitoring,
                automatic transfer, and changeover behaviour.
              </li>
              <li>
                <strong>Reg 560.11 (Wiring — protection).</strong> Protection from disconnection
                of safety service circuits during faults on other circuits.
              </li>
            </ul>
            <p>
              The certificate trail for emergency lighting therefore includes BOTH a BS 5266
              certification (design / install / commission / photometric) AND a BS 7671
              Electrical Installation Certificate or EICR covering the supply and wiring of
              the system. The two are produced by complementary disciplines — lighting
              specialist and electrical contractor — though increasingly delivered by
              integrated teams.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Regulation 560.10 (Sources of supply)"
            clause={
              <>
                The source of supply for safety services shall be one of the following: (a)
                storage batteries; (b) primary cells; (c) generator sets independent of the
                normal supply; (d) a separate feeder of the supply network independent of
                the normal feeder. The source of supply shall be capable of supplying the
                rated current of the safety service equipment for the rated duration.
                Automatic transfer between the normal and safety supply shall be provided,
                and the transfer arrangement shall comply with the requirements of the
                relevant product standards for the safety service equipment.
              </>
            }
            meaning="A4:2026 refined the wording on sources of supply — particularly clarifying that the safety supply must be capable of the rated current AND rated duration, and that the automatic transfer must comply with the relevant product standard (BS EN 50171 for central battery, BS EN 60598-2-22 for self-contained). The regulation now directly couples the wiring-regulations layer with the lighting product standards layer."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Approved Document B and the building-regulations route</ContentEyebrow>

          <ConceptBlock
            title="Approved Document B Volume 2 cl. 5"
            plainEnglish="Approved Document B is statutory guidance under the Building Regulations 2010 in England (with parallel documents in Wales / Scotland / Northern Ireland). Volume 2 covers buildings other than dwellinghouses. Cl. 5 covers emergency escape lighting. It tells the designer and Building Control which premises types and locations need emergency lighting as part of the means of escape — the WHERE — and references BS 5266-1 for the engineering — the HOW. Following Approved Document B is one route to compliance with Building Regulations Requirement B1 (means of warning and escape)."
          >
            <p>The Approved Document layer in summary:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Statutory guidance.</strong> Issued by Department for Levelling Up,
                Housing and Communities (DLUHC) under the Building Regulations 2010.
                "Statutory guidance" means: following it satisfies the regulation; departing
                from it is permitted but the alternative method must demonstrate equivalent
                or better outcome.
              </li>
              <li>
                <strong>Cl. 5 list of premises.</strong> Internal corridors &gt; 30 m,
                escape stairs, basements / windowless areas, places of assembly, sleeping
                accommodation, escape routes serving high-risk areas, lifts, toilets above
                threshold, plant rooms.
              </li>
              <li>
                <strong>Reference to BS 5266-1.</strong> "Emergency lighting should comply
                with BS 5266-1." The Approved Document tells you what category of premises
                needs EL; BS 5266-1 tells you how to engineer it.
              </li>
              <li>
                <strong>Application.</strong> Applies to new build, material alteration,
                change of use. Does not apply retroactively to existing buildings (the RRO
                applies to existing buildings; Approved Document B applies at the point of
                construction work).
              </li>
              <li>
                <strong>Higher-risk buildings.</strong> Following the Building Safety Act
                2022, higher-risk buildings are now regulated by the Building Safety
                Regulator. Approved Document B continues to apply but the enforcement
                authority for HRBs has changed.
              </li>
              <li>
                <strong>Devolution.</strong> Wales has parallel Approved Documents under the
                Welsh Building Regulations; Scotland uses the Technical Handbooks under the
                Building (Scotland) Regulations; Northern Ireland uses the Building
                Regulations (NI) Technical Booklet E. The principles are similar; the
                document references differ.
              </li>
            </ul>
            <p>
              The combination of Approved Document B (where), BS 5266-1:2025 (how), and the
              RRO 2005 (legal duty) is the typical compliance route for new build /
              alteration projects. Building Control checks Approved Document B at design
              stage; the BS 5266-1 documentation pack delivers the technical evidence; the
              RRO continues to apply once the building is occupied.
            </p>
          </ConceptBlock>

          <Scenario
            title="Mapping the standards stack onto a real project"
            situation="A new 4-storey medical clinic is at design stage. The design team includes an architect, an M&E consultant, a fire-safety consultant, and (engaged on subcontract) an emergency lighting specialist contractor. The Building Control submission is due. The project will be procured under a Building-Safety-Act-compliant scheme since the building has occupied healthcare floors."
            whatToDo="Map the standards stack to the project deliverables. Step 1 — Approved Document B Vol 2 cl. 5 + the healthcare-specific HTM 06-01 supplement: identify all premises locations needing EL (escape routes, stairs, plant rooms, lifts, treatment rooms with high-risk tasks, sleeping accommodation in any overnight wards). Step 2 — BS 5266-1:2025 design: produce schedule mapping every space to its category, mode, architecture; design layout and supply; document points of emphasis; comply with high-risk segmentation rule for any treatment-room areas; do NOT use borrowed light. Step 3 — BS EN 1838:2024: verify illuminance levels (1 lx escape, 0.5 lx anti-panic, 15 lx high-risk in any treatment room with hazardous-process consideration), full-width of escape route, switch-on times. Step 4 — BS EN 50172:2024: design the system to enable daily / monthly / annual / 5-year photometric tests; specify log book; specify documentation. Step 5 — BS EN 50171: if central battery is used (likely for the clinical wing), specify compliance and integrate with BMS. Step 6 — BS EN 60598-2-22: specify all luminaires to comply; require manufacturer DoCs. Step 7 — BS 7671:2018+A4:2026 §560: design the supply, wiring, segregation, source arrangements; produce the EIC at handover. Step 8 — RRO 2005: provide the responsible person (the clinic operator) with the complete documentation pack for ongoing compliance."
            whyItMatters="The standards stack is integrated by design. A modern UK emergency lighting project draws on every layer: legal duty (RRO), statutory guidance (Approved Doc B), Code of Practice (BS 5266-1:2025), application standards (BS EN 1838:2024), system standards (BS EN 50172:2024), product standards (BS EN 50171, BS EN 60598-2-22), wiring regulations (BS 7671 §560). The deliverable for the responsible person is a documentation pack proving compliance with every layer. Anything missing is an audit risk; anything contradicted is a design fault. The professional EL contractor manages all the layers as one regime."
          />

          <CommonMistake
            title="Designing only to BS EN 1838 and missing BS 5266-1 UK-specific elements"
            whatHappens="A continental designer used to the European Norms designs an emergency lighting installation for a UK building using only BS EN 1838:2024 + BS EN 50172:2024 — assuming these European standards are sufficient for UK compliance. The design fails to apply the BS 5266-1:2025 borrowed-light exclusion (because that is UK-specific in Cl. 5.2), fails to apply the high-risk segmentation rule (because that is UK-specific in Cl. 6), and uses old illuminance assumptions in escape route design (centre-line + central-band rather than the 2024 full-width-with-edge-exclusions rule). The handover photometric survey identifies the deficiencies; remedial work is required."
            doInstead="On UK projects, design to BS 5266-1:2025 as the integrating Code of Practice. The European Norms are CALLED UP by BS 5266-1:2025; you cannot skip the BS 5266-1 layer and rely on the ENs alone. The UK-specific elements (borrowed light, high-risk segmentation, 5-year photometric verification) sit in BS 5266-1, not the ENs. Continental designs targeting EN-only compliance miss these and will fail UK audit."
          />

          <CommonMistake
            title="Using outdated BS 5266-7 or pre-2024 EN references in specifications"
            whatHappens="An old specification template is reused for a 2026 project. The template references BS 5266-7 (withdrawn — replaced by adoption of BS EN 1838), references BS EN 1838:2013 (superseded by 2024 edition), references BS EN 50172:2004 (superseded by 2024 edition). The contractor follows the specification literally and ends up designing to obsolete standards. Audit at handover identifies the obsolete references; significant rework needed to bring the design and documentation up to current standards."
            doInstead="On every new project, refresh the specification template with current standard references. As of late 2026: BS 5266-1:2025, BS EN 1838:2024, BS EN 50172:2024, BS EN 50171 (latest current edition), BS EN 60598-2-22 (latest current edition), BS 7671:2018+A4:2026, Approved Document B (current edition with applicable amendments). Cite the standard with the year. The contractor is then bound to the current edition."
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Industry guidance — ICEL, LIA, BAFE, manufacturer technical notes</ContentEyebrow>

          <ConceptBlock
            title="Supplementary guidance and competence schemes"
            plainEnglish="The British Standard is the legal anchor; the European Norms supply the technical building blocks; but the day-to-day design and installation questions — particularly in evolving areas like wireless self-test, addressable lighting, hybrid architectures — are addressed by industry guidance from ICEL, the LIA, and competence-scheme bodies like BAFE."
          >
            <p>The principal industry guidance and competence schemes:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>ICEL (Industry Committee for Emergency Lighting).</strong> Industry
                committee producing technical guidance, training, and the ICEL Approved
                Contractor scheme. ICEL guidance documents (e.g. ICEL 1001 Self-contained
                emergency luminaires; ICEL 1004 Central battery systems; periodic updates)
                provide practical detail beyond the standard. ICEL Approved Contractor
                registration is increasingly required by insurers and large clients.
              </li>
              <li>
                <strong>LIA (Lighting Industry Association).</strong> Industry body covering
                lighting more broadly. Produces technical statements on emerging topics,
                interfaces with standards committees, runs technical training. LIA-aligned
                competence (e.g. LIA Lighting Diploma) is recognised in the trade.
              </li>
              <li>
                <strong>BAFE SP203.</strong> Competence scheme for fire safety contractors.
                BAFE-registered contractors have demonstrated competence to install, service,
                and maintain emergency lighting (and other fire safety systems). Increasingly
                a procurement requirement.
              </li>
              <li>
                <strong>Manufacturer technical notes.</strong> The major emergency lighting
                manufacturers (Hochiki, Eaton, Mackwell, Beghelli, Tridonic, etc.) publish
                technical notes on product application, lighting design software (Relux,
                DIALux EVO), commissioning support. Specific to their product line but
                generalisable to similar products.
              </li>
              <li>
                <strong>Local authority and fire-and-rescue service guidance.</strong>
                Sometimes produce local guidance on enforcement priorities, common findings,
                expectations for documentation. Worth understanding for the specific area.
              </li>
              <li>
                <strong>HSE guidance.</strong> The Health and Safety Executive publishes
                general guidance (e.g. HSG107 — though that is PAT-related) and sector
                specifics that are relevant to emergency lighting in some industrial
                contexts.
              </li>
            </ul>
            <p>
              Industry guidance is supplementary, not substitute. It is updated more
              frequently than standards; it covers practical questions standards do not
              detail; it provides the trade context. Use it alongside the standard, not
              instead of it. Cite both in your design documents.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Sector-specific guidance"
            plainEnglish="On top of the general standards stack, sector-specific guidance applies to particular premises types. These supplementary documents address sector concerns the general standards cannot. The competent designer reads the relevant sector guide alongside BS 5266-1:2025 for the project type."
          >
            <p>Principal sector overlays:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Healthcare — HTM 06-01 (Electrical services supply and
                distribution).</strong> Department of Health technical memorandum. Covers
                hospital electrical infrastructure including IPS / UPS / safety services.
                Cross-references BS 5266 and BS EN 50171. Mandatory reading for hospital
                projects.
              </li>
              <li>
                <strong>Education — BB 100 (Design for fire safety in schools).</strong>
                Department for Education building bulletin. Includes emergency lighting
                provisions for educational premises. Used alongside Approved Document B.
              </li>
              <li>
                <strong>Places of assembly — Purple Guide.</strong> Health and Safety at
                Outdoor Events. Industry guide for organisers. Includes temporary emergency
                lighting provisions. Used alongside event-specific risk assessment.
              </li>
              <li>
                <strong>Care homes — CQC fundamental standards.</strong> Care Quality
                Commission registration requirements. Include fire safety and emergency
                lighting expectations. Used alongside the RRO and BS 5266-1.
              </li>
              <li>
                <strong>Prison estate, MoD, transport — sector-specific.</strong> Each has
                its own supplementary guidance. Project teams in those sectors must reference
                the applicable sector guide.
              </li>
              <li>
                <strong>HMOs — local authority HMO standards.</strong> Many local
                authorities publish HMO licensing standards including emergency lighting in
                shared parts. Used alongside the RRO.
              </li>
            </ul>
            <p>
              Sector-specific overlays do not replace the general standards stack — they sit
              on top. A care home design follows BS 5266-1:2025 PLUS CQC fundamental
              standards PLUS local authority HMO requirements (if applicable). A hospital
              design follows BS 5266-1:2025 PLUS HTM 06-01 PLUS the Building Safety Act for
              higher-risk buildings.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>How the regime works in practice — a layered map</ContentEyebrow>

          <ConceptBlock
            title="The competent contractor's mental model"
            plainEnglish="A working contractor or designer carries a mental model of how the layers fit together. The model is helpful when explaining the regime to clients, when scoping a project, when documenting compliance, or when responding to an audit query. Below is the layered map most professionals use."
          >
            <p>The layered mental model:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Layer 1 — the legal duty.</strong> RRO 2005 (responsible person duty);
                Workplace Regulations 1992 Reg 8 (workplaces); HSAW Act 1974 (general duty);
                Building Regulations 2010 (applied at construction). Tells you THAT you must
                provide adequate emergency lighting.
              </li>
              <li>
                <strong>Layer 2 — statutory guidance.</strong> Approved Document B Vol 2 cl. 5
                (England); parallel documents in Wales / Scotland / Northern Ireland. Tells
                you WHERE emergency lighting is required as a means of compliance with
                Building Regs. References BS 5266-1.
              </li>
              <li>
                <strong>Layer 3 — UK Code of Practice.</strong> BS 5266-1:2025 — the
                integrating standard. Tells you HOW to design, install, commission, operate,
                and maintain emergency lighting. Calls up the European Norms below.
              </li>
              <li>
                <strong>Layer 4 — European Norms (technical building blocks).</strong> BS EN
                1838:2024 (lighting application — what light to deliver); BS EN 50172:2024
                (system requirements — how the system works); BS EN 50171 (central battery
                equipment); BS EN 60598-2-22 (luminaire product standard). The technical
                detail underlying BS 5266-1:2025.
              </li>
              <li>
                <strong>Layer 5 — wiring regulations.</strong> BS 7671:2018+A4:2026 Section
                560 (Safety services). The electrical installation requirements — supply,
                wiring, segregation, sources. Refined under A4:2026.
              </li>
              <li>
                <strong>Layer 6 — sector-specific guidance.</strong> HTM 06-01 (healthcare),
                BB 100 (education), Purple Guide (events), CQC standards (care), Building
                Safety Regulator (higher-risk buildings). Layered on top for specific premises
                types.
              </li>
              <li>
                <strong>Layer 7 — industry guidance.</strong> ICEL, LIA, BAFE, manufacturer
                technical notes. Practical detail and competence schemes. Supplementary
                material.
              </li>
            </ol>
            <p>
              When asked "what standard applies?" the answer is rarely just one. A typical
              project draws on every layer. The deliverable for the responsible person is a
              documentation pack proving compliance with every applicable layer. Cite the
              layers in the design certificate, the commissioning certificate, and the
              maintenance regime. The pack is the defence.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'BS 5266-1:2025 is the UK Code of Practice — the integrating document. Recommendatory, not statutory; following it is the standard route to compliance with the legal duty.',
              'BS EN 1838:2024 = lighting application (what light to deliver). 2024 NEW: full open-width escape route; local-area lighting recognition.',
              'BS EN 50172:2024 = system requirements (how the system works). 2024 NEW: 5-year photometric verification.',
              'BS EN 50171 = central battery equipment product standard. Required when central battery is used.',
              'BS EN 60598-2-22 = luminaire product standard. Required for ALL emergency luminaires.',
              'BS 7671:2018+A4:2026 §560 = wiring regulations for safety services. Reg 560.10 (sources of supply) refined under A4:2026.',
              'Approved Document B Vol 2 cl. 5 = statutory guidance. Tells you WHERE EL is required for new build / material alteration. Calls up BS 5266-1.',
              'Industry guidance from ICEL / LIA / BAFE / manufacturers + sector overlays (HTM 06-01, BB 100, Purple Guide, CQC) supplement the standards with practical and sector-specific detail.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'Is following BS 5266-1:2025 enough for full legal compliance?',
                answer:
                  'It is the standard route to demonstrating compliance, but you also need to comply with the wiring regulations (BS 7671:2018+A4:2026 §560), the legal duty (RRO 2005, Workplace Regs 1992, HSAW 1974), and any applicable sector guidance (HTM, BB, CQC etc.). A typical project produces a documentation pack covering all layers. Following BS 5266-1 alone, without the BS 7671 supply / wiring / source-of-supply work, leaves the installation incomplete.',
              },
              {
                question:
                  'Can I still rely on BS 5266-1:2016 for an existing system?',
                answer:
                  'Yes — for an existing system installed under the 2016 edition, the system was compliant with the standard in force at design / installation. The 2025 edition does not retroactively render existing systems non-compliant. However, the 5-year photometric verification cycle is the audit point at which the 2016 design is reviewed against current performance expectations. A 2016-design system relying on borrowed light will fail the 2026 photometric survey because the borrowed-light approach does not deliver direct illuminance to the affected space; remediation follows.',
              },
              {
                question:
                  'What is the difference between a British Standard and a European Norm adopted in the UK?',
                answer:
                  'A British Standard (BS) is published by BSI (the British Standards Institution). A European Norm (EN) is published by CEN/CENELEC and is adopted as a National Standard by each national standards body (in the UK, BSI publishes it as a BS EN). When BSI adopts an EN as a BS EN, it has the same status as any other BS. UK-specific Codes of Practice like BS 5266-1 typically adopt EN content as normative references but add UK-specific provisions (like the borrowed-light exclusion and high-risk segmentation rule).',
              },
              {
                question:
                  'How often are these standards updated?',
                answer:
                  'European Norms are reviewed approximately every 5-7 years; BS 5266-1 has been updated in 2005, 2011, 2016, 2025; BS EN 1838 in 1999, 2013, 2024; BS EN 50172 in 2004, 2024. The current cycle is producing 2024-2025 editions of most documents in this space. Always cite the year of the standard in your specifications and design notes; "BS 5266-1" without a year is ambiguous as multiple editions exist.',
              },
              {
                question:
                  'Do I need to physically own a printed copy of every standard?',
                answer:
                  'Not necessarily — BSI offers digital subscription access (BSOL) to British Standards. ICEL members and LIA members get access to relevant standards through their membership. Manufacturers often summarise the relevant requirements in their technical literature. For a working contractor, having access to BS 5266-1:2025, BS EN 1838:2024, BS EN 50172:2024, BS 7671:2018+A4:2026, and Approved Document B Vol 2 — physically or digitally — is the minimum kit. Print copies are convenient on site; digital is convenient at the desk.',
              },
              {
                question:
                  'What about the changes from BS 5266-1:2016 to BS 5266-1:2025 — is there an official "what changed" document?',
                answer:
                  'BSI publishes a foreword in BS 5266-1:2025 noting the principal changes from 2016. The headline changes covered in this course: (1) scope expansion (escape + local-area + standby); (2) borrowed-light exclusion; (3) 5-year photometric verification (Cl. 8.3); (4) high-risk segmentation (Cl. 6); (5) refined documentation requirements; (6) updated cross-references to BS EN 1838:2024 and BS EN 50172:2024. ICEL has also produced industry-summary commentary on the 2025 changes for member contractors.',
              },
              {
                question:
                  'How does Building Safety Regulator oversight (HRBs) affect emergency lighting compliance?',
                answer:
                  'Higher-risk buildings under the Building Safety Act 2022 are now regulated by the Building Safety Regulator (BSR). The BSR enforces Building Regulations compliance at construction (Approved Document B + BS 5266-1) and ongoing safety case requirements for occupation. For emergency lighting specifically, the BSR will expect the documentation pack at handover — design certificate, installation certificate, commissioning certificate including photometric survey, BS 7671 EIC. Ongoing the BSR will expect evidence of the BS EN 50172:2024 test regime in the safety case. The BSR oversight does not change the technical standards but raises the documentation expectations.',
              },
              {
                question:
                  'What if my client wants to depart from BS 5266-1 — for cost or aesthetic reasons?',
                answer:
                  'Departure is legally possible — the standard is recommendatory — but the burden of justification falls on the responsible person. They must show the alternative method delivers an equivalent or better outcome. In practice, departures are rare and require: (a) a clearly documented engineering case, (b) sign-off from a competent specialist, (c) acceptance by Building Control (for new build) or the fire risk assessor (for ongoing operation), and (d) acceptance by the insurer. The documentation must be retained for the life of the system. For most clients, the cost of justifying a departure exceeds the cost of complying with the standard.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz
            title="Overview of BS 5266 and related standards — Emergency Lighting Module 1.4"
            questions={quizQuestions}
          />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/emergency-lighting-module-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 1
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/emergency-lighting-module-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next module <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Module 2 · Design principles
              </div>
            </button>
          </div>

          <div className="hidden">
            <Activity />
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default EmergencyLightingModule1Section4;
