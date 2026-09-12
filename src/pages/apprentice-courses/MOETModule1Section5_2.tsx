/**
 * MOET · Module 1 · Section 1.5 · Subsection 2 — Hazardous Substances: COSHH Awareness
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option. NOT ST0154 (the "MOET" the course is named after) —
 * ST0154 v1.6 is still live, but its own EPA plan records that the Electrical
 * Technician option "was retired 31/12/2025" and was replaced by ST1426
 * (single discipline) or ST1443 (dual discipline). The course keeps the MOET
 * name because that is what employers and colleges still call the role.
 *
 * KSBs covered, quoted rather than numbered: the IfATE/Skills England API
 * publishes these statements without their K/S/B codes, and the published
 * numbering has not been verified against a primary source — so do not invent
 * codes here.
 *   Skills · "Identify environmental and health and safety  hazards and risks
 *             and apply control measures."
 *          · "Apply health, safety, and environmental procedures in
 *                 compliance with regulations, standards, and guidance."
 *
 * Converted onto the study-centre learning kit. Content preserved from the
 * original page; structure, shell and reading measure rebuilt.
 */

import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import {
  StudyPage,
  Bleed,
  ReadingProgress,
  TLDR,
  ConceptBlock,
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Hazardous Substances — COSHH Awareness - MOET Module 1 Section 5.2';
const DESCRIPTION =
  'Comprehensive guide to COSHH Regulations 2002 for electrical maintenance technicians: hazardous substance categories, GHS pictograms, the 8-step COSHH assessment process, workplace exposure limits, safety data sheets, and common hazardous substances in electrical work aligned to ST1426.';

const quickCheckQuestions = [
  {
    id: 'coshh-purpose',
    question: 'What is the primary purpose of the COSHH Regulations 2002?',
    options: [
      'To require manufacturers to label all chemical products with hazard warnings before sale',
      'To set a list of banned substances that may not be used in any UK workplace',
      'To require employers to provide free PPE to all workers handling any chemical',
      'To require employers to assess and control exposure to hazardous substances to prevent ill health',
    ],
    correctIndex: 3,
    explanation:
      "The Control of Substances Hazardous to Health (COSHH) Regulations 2002 require employers to assess the risks from hazardous substances in the workplace and put in place adequate control measures to prevent or adequately control exposure. The aim is to protect workers' health — COSHH does not ban substances, but ensures they are used safely.",
  },
  {
    id: 'exposure-route',
    question: 'What are the three main routes of entry for hazardous substances into the body?',
    options: [
      'Inhalation, skin absorption (including eyes) and ingestion',
      'Inhalation, injection and radiation exposure',
      'Skin contact, ingestion and electrical conduction',
      'Inhalation, ingestion and hearing damage',
    ],
    correctIndex: 0,
    explanation:
      'The three main routes of entry are: inhalation (breathing in dusts, vapours, fumes, gases), skin/eye absorption (contact with liquids, dusts or vapours that penetrate the skin or damage the eyes), and ingestion (swallowing contaminated food, drink, or transferring substances hand-to-mouth). Inhalation is the most common route for occupational exposure.',
  },
  {
    id: 'sds-sections',
    question:
      'How many sections does a safety data sheet (SDS) contain under GHS/CLP requirements?',
    options: ['12 sections', '8 sections', '16 sections', '20 sections'],
    correctIndex: 2,
    explanation:
      'Under the Globally Harmonised System (GHS) as implemented by the CLP Regulation, a safety data sheet must contain 16 sections in a standardised order. These cover identification, hazards, composition, first aid, fire-fighting, accidental release, handling/storage, exposure controls, physical/chemical properties, stability, toxicology, ecology, disposal, transport, regulatory and other information.',
  },
  {
    id: 'control-hierarchy',
    question: 'In the COSHH hierarchy of control, what should be considered first?',
    options: [
      'Eliminating the substance or substituting it with a less hazardous alternative',
      'Issuing respiratory protective equipment to all workers in the area',
      'Installing local exhaust ventilation at the point of generation',
      'Limiting the time each worker is exposed to the substance',
    ],
    correctIndex: 0,
    explanation:
      'The COSHH hierarchy of control requires you to consider elimination first — can you avoid using the hazardous substance entirely? If not, can you substitute it with a less hazardous alternative? Only when elimination and substitution are not reasonably practicable should you move down the hierarchy to engineering controls, administrative controls and finally PPE.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'COSHH Regulations 2002 apply to:',
    options: [
      'Only substances supplied with a hazard label bearing a skull-and-crossbones pictogram',
      'Any substance that could cause harm to health through workplace exposure, including dusts, vapours, gases, fumes and biological agents',
      'Only chemicals purchased in containers, not substances produced by work processes',
      'Lead, asbestos and radioactive substances encountered on site',
    ],
    correctAnswer: 1,
    explanation:
      'COSHH applies to any substance hazardous to health encountered in the workplace, including chemicals, products containing chemicals, dusts, fumes, vapours, mists, nanotechnology, gases, biological agents and germs. This includes substances generated by work processes (e.g., solder fumes, dust from chasing walls) as well as purchased products.',
  },
  {
    id: 2,
    question:
      'Which GHS pictogram indicates that a substance is harmful to the aquatic environment?',
    options: [
      'Flame on white diamond',
      'Skull and crossbones on white diamond',
      'Dead fish and tree on white diamond',
      'Exclamation mark on white diamond',
    ],
    correctAnswer: 2,
    explanation:
      "The 'environment' pictogram — showing a dead fish and a dead tree — indicates that the substance is hazardous to the aquatic environment. This is relevant when handling substances near drains or watercourses. Some substances used in electrical maintenance, such as transformer oil and certain cleaning solvents, carry this pictogram.",
  },
  {
    id: 3,
    question: 'A workplace exposure limit (WEL) expressed as an 8-hour TWA of 5 mg/m³ means:',
    options: [
      '5 mg/m³ is the safe level with no health effects',
      'No worker may be exposed to more than 5 mg/m³ at any instant',
      'Workers can be exposed to 5 mg/m³ for a maximum of 8 minutes',
      'The average exposure over an 8-hour working day must not exceed 5 mg/m³',
    ],
    correctAnswer: 3,
    explanation:
      'A WEL expressed as an 8-hour time-weighted average (TWA) means that the average exposure concentration over an 8-hour reference period must not exceed the stated value. Short-term peaks above this level may occur provided the overall average remains below the WEL. For substances with short-term exposure limits (STELs), there is also a 15-minute reference period.',
  },
  {
    id: 4,
    question: 'When soldering electrical connections, the primary COSHH hazard is:',
    options: [
      'Inhalation of solder flux fumes containing colophony (rosin)',
      'Skin contact with the molten solder causing chemical burns',
      'Ingestion of lead from handling the solder wire',
      'Ultraviolet radiation emitted by the heated soldering iron tip',
    ],
    correctAnswer: 0,
    explanation:
      'When solder containing rosin-based (colophony) flux is heated, it produces fumes that can cause occupational asthma — a serious and potentially permanent lung condition. The WEL for rosin-based solder flux fumes is 0.05 mg/m³ (8-hour TWA) and 0.15 mg/m³ (15-minute STEL). Controls include local exhaust ventilation (fume extraction), lead-free solder, and avoiding breathing in the fume plume.',
  },
  {
    id: 5,
    question: 'The 8 steps of a COSHH assessment, in order, are:',
    options: [
      'Issue PPE, train workers, monitor exposure, record findings, review the assessment, audit, certify, archive',
      'Identify hazards, decide who might be harmed, evaluate risks, record findings, implement controls, plan monitoring, provide information/training, review assessment',
      'Substitute the substance, eliminate the hazard, ventilate, isolate, train, sign off, file the record, dispose of waste',
      'Risk-assess, permit to work, atmospheric-test, ventilate, supervise, rescue-plan, debrief, report',
    ],
    correctAnswer: 1,
    explanation:
      'The COSHH assessment follows a structured 8-step process: (1) Identify the hazardous substances present and how they could cause harm; (2) Decide who might be harmed and how; (3) Evaluate the risks and decide on precautions; (4) Record the significant findings; (5) Implement the control measures; (6) Plan for monitoring and maintenance of controls; (7) Provide information, instruction and training; (8) Review the assessment regularly and update when necessary.',
  },
  {
    id: 6,
    question: 'SF6 gas, used in some HV switchgear, poses a COSHH risk because:',
    options: [
      'It is highly flammable and can ignite explosively if exposed to a spark',
      'It is corrosive to skin and eyes on direct contact with the liquid form',
      'It is a simple asphyxiant that can displace oxygen in enclosed spaces, and its decomposition products from arcing are toxic',
      'It is a respiratory sensitiser that causes occupational asthma after repeated exposure',
    ],
    correctAnswer: 2,
    explanation:
      'SF6 is an odourless, colourless gas that is denser than air. In enclosed spaces such as indoor GIS switchgear rooms, a leak can displace oxygen causing asphyxiation without warning. Additionally, when SF6 is exposed to electrical arcing, it decomposes into highly toxic by-products including sulphur dioxide, hydrogen fluoride, and metal fluorides. Specific COSHH controls including gas detection, ventilation and respiratory protection are required.',
  },
  {
    id: 7,
    question: 'Under COSHH, health surveillance is required when:',
    options: [
      'Any hazardous substance is stored on the premises, regardless of whether workers are exposed',
      'A worker requests it after handling any chemical product during their shift',
      'PPE has been issued, because surveillance confirms the PPE is being worn correctly',
      'There is a reasonable likelihood that workers are exposed to a substance linked to a specific disease or adverse health effect, and valid techniques exist to detect it',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 11 of COSHH requires health surveillance when there is a reasonable likelihood of disease or adverse health effect occurring in the conditions of the work, there are valid techniques for detecting indications of the disease/effect, and the technique is of low risk to the employee. For electrical maintenance, this may apply to workers regularly exposed to solder fumes (lung function tests) or certain cleaning solvents.',
  },
  {
    id: 8,
    question: 'Battery acid (dilute sulphuric acid) from UPS systems should be stored:',
    options: [
      'In acid-resistant, sealed containers within a bunded area, away from incompatible materials such as alkalis and oxidisers',
      'In open containers in a warm room to prevent the acid from freezing',
      'Alongside alkaline cleaning products so neutralising agents are readily to hand',
      'In sealed metal drums to provide maximum mechanical protection against impact',
    ],
    correctAnswer: 0,
    explanation:
      'Battery acid is corrosive and must be stored in acid-resistant containers within a bund capable of containing at least 110% of the largest container. It must be kept away from incompatible materials — particularly alkalis (violent reaction), oxidising agents, and metals (hydrogen generation). The storage area should be well-ventilated, clearly signed, and have appropriate spill response equipment nearby.',
  },
  {
    id: 9,
    question: 'A safety data sheet (SDS) must be provided by:',
    options: [
      'The Health and Safety Executive on request from any employer',
      'The supplier or manufacturer of the hazardous substance',
      'The worker who first opens and uses the product on site',
      'The site principal contractor as part of the construction phase plan',
    ],
    correctAnswer: 1,
    explanation:
      'Under the CLP Regulation and REACH, the supplier or manufacturer of a hazardous substance must provide a safety data sheet to the downstream user (your employer) free of charge. The SDS must be in the language of the country where the product is used, be kept up to date, and be made available to workers who may be exposed. Your employer must then use the SDS information to complete the COSHH assessment.',
  },
  {
    id: 10,
    question: 'Cable-pulling lubricant is classified as a COSHH substance because:',
    options: [
      'It is highly flammable and presents a significant fire risk in conduit',
      'It releases toxic gases when it comes into contact with copper conductors',
      'It may contain substances that can cause skin irritation, eye irritation or respiratory sensitisation on prolonged or repeated exposure',
      'It is corrosive and degrades the PVC insulation of the cables being pulled',
    ],
    correctAnswer: 2,
    explanation:
      'Many cable-pulling lubricants contain petroleum-based or synthetic compounds that can cause skin dermatitis on prolonged contact, eye irritation from splashes, and in some formulations, respiratory sensitisation from vapour inhalation in poorly ventilated spaces. The SDS for the specific product must be consulted, and appropriate controls (gloves, eye protection, ventilation) implemented. Some modern products are water-based with lower hazard profiles.',
  },
  {
    id: 11,
    question: 'Which of the following is NOT a valid COSHH control measure for solder fumes?',
    options: [
      'Local exhaust ventilation (fume extraction at the point of generation)',
      'Using solder with a less hazardous flux (e.g., water-soluble instead of rosin-based)',
      'Positioning work so the fume plume drifts away from the breathing zone',
      'Working near an open window and assuming natural ventilation is adequate',
    ],
    correctAnswer: 3,
    explanation:
      'Relying on natural ventilation from an open window is NOT an adequate control for solder fumes. Colophony fumes require local exhaust ventilation (LEV) that captures fumes at source, typically a bench-top extraction unit or arm-mounted extractor positioned within 100 mm of the solder joint. Natural ventilation cannot reliably prevent fume exposure and does not meet COSHH requirements for adequate control.',
  },
  {
    id: 12,
    question: 'Under COSHH, how often should a risk assessment be reviewed as a minimum?',
    options: [
      'At least annually, or sooner if there is reason to believe the assessment is no longer valid',
      'Only once, when the substance is first introduced to the workplace',
      'Every five years, in line with the fixed-wiring inspection cycle',
      'Each working day, before the substance is used for the first time that shift',
    ],
    correctAnswer: 0,
    explanation:
      'COSHH assessments should be reviewed at least annually as a minimum, but also whenever there is reason to believe the assessment is no longer valid — for example, when new substances are introduced, work processes change, exposure monitoring shows elevated levels, cases of ill health are reported, or new information about a substance becomes available. Regular review ensures controls remain effective and up to date.',
  },
];

const faqs = [
  {
    question: 'Does COSHH apply to substances I only use occasionally?',
    answer:
      'Yes. COSHH applies to all hazardous substances used in the workplace, regardless of how frequently they are used. Even occasional exposure to certain substances — such as isocyanates in some spray coatings or colophony in solder flux — can cause sensitisation, leading to severe reactions on any subsequent exposure. The COSHH assessment must cover all substances used, including those used infrequently, and the controls must be in place whenever the substance is used.',
  },
  {
    question: 'Where can I find the safety data sheet for a product?',
    answer:
      'Your employer should hold SDS documents for all hazardous substances used on site, typically in a COSHH register or folder. The supplier must provide an SDS with the first delivery of a hazardous product. Most manufacturers also make SDS documents available on their websites for download. If you cannot find the SDS for a product, ask your supervisor — never use a hazardous substance without first understanding its risks and required controls.',
  },
  {
    question: 'What should I do if I am accidentally exposed to a hazardous substance?',
    answer:
      'Follow the first aid measures described in Section 4 of the safety data sheet. For skin contact, remove contaminated clothing and wash the affected area thoroughly with water. For eye contact, irrigate with clean water for at least 15 minutes and seek medical attention. For inhalation, move to fresh air immediately. For ingestion, do not induce vomiting unless specifically advised to do so. Report all exposures to your supervisor and ensure they are recorded — even if you feel fine at the time, some effects are delayed.',
  },
  {
    question: 'Is PPE always required when handling COSHH substances?',
    answer:
      'No. PPE is the last resort in the COSHH hierarchy of control. You should first try to eliminate the hazard, substitute with a less hazardous alternative, use engineering controls (e.g., ventilation, enclosed systems), and implement administrative controls (e.g., reduced exposure time, safe working procedures). PPE is only used when these higher-level controls do not adequately control the risk. When PPE is required, it must be suitable for the specific hazard, properly fitted, maintained, and stored correctly.',
  },
  {
    question: 'How does COSHH relate to the ST1426 apprenticeship standard?',
    answer:
      'ST1426 requires maintenance technicians to understand health and safety regulations including COSHH. You must be able to identify hazardous substances in your work environment, understand the information on labels and safety data sheets, follow COSHH assessments and control measures, and use appropriate PPE correctly. This knowledge is assessed in your end-point assessment and contributes to the safe working practices competencies required for the standard.',
  },
];

const MOETModule1Section5_2 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 1 · Section 1.5 · Subsection 2"
        title="Hazardous Substances — COSHH Awareness"
        backTo="/study-centre/apprentice/m-o-e-t-module1-section5"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Identifying, assessing and controlling exposure to hazardous substances in electrical
            maintenance.
          </p>

          <TLDR
            points={[
              'COSHH: Control of Substances Hazardous to Health Regulations 2002.',
              'Duty: Assess exposure risks and implement adequate controls.',
              'Hierarchy: Eliminate, substitute, control, PPE (last resort).',
              'SDS: 16-section safety data sheet — your key information source.',
              'Solder flux: Colophony fumes cause occupational asthma.',
              'SF6 gas: Asphyxiant; toxic decomposition products from arcing.',
              'Battery acid: Corrosive; requires bunded storage.',
              'ST1426: Maps to safe working practices and health awareness KSBs.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Explain the purpose and scope of the COSHH Regulations 2002',
              'Identify hazardous substance categories and interpret GHS/CLP pictograms',
              'Describe the 8-step COSHH assessment process',
              'Understand workplace exposure limits (WELs) and how they protect workers',
              'Identify hazardous substances commonly encountered in electrical maintenance',
              'Apply the hierarchy of control to reduce exposure in practical work situations',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>COSHH Regulations and Hazardous Substance Categories</ContentEyebrow>

          <ConceptBlock title="COSHH Regulations and Hazardous Substance Categories">
            <p>
              The Control of Substances Hazardous to Health (COSHH) Regulations 2002 are the primary
              legislation protecting workers from exposure to hazardous substances. Under COSHH,
              your employer must identify all hazardous substances present in the workplace, assess
              the risks they pose, implement adequate control measures, monitor exposure where
              necessary, provide health surveillance where appropriate, and ensure workers receive
              proper information, instruction and training.
            </p>
            <p>
              COSHH covers a very wide range of substances — not just chemicals with
              skull-and-crossbones labels. It includes dusts (from chasing walls, cutting cable
              tray), fumes (from soldering, welding), vapours (from cleaning solvents, adhesives),
              gases (SF6, refrigerants), mists (from spray applications), and even biological agents
              (mould in damp electrical enclosures).
            </p>
          </ConceptBlock>

          <ConceptBlock title="What COSHH Covers">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Chemicals:</strong> Solvents, acids, alkalis, adhesives, cleaning agents,
                lubricants, paints
              </li>
              <li>
                <strong>Products containing chemicals:</strong> Solder flux, cable-pulling
                lubricant, PVC cement, resin compounds
              </li>
              <li>
                <strong>Dusts:</strong> Wood dust, silica dust (from concrete), general construction
                dust, mineral fibre
              </li>
              <li>
                <strong>Fumes:</strong> Solder fumes, welding fumes, metal fumes from cutting
                operations
              </li>
              <li>
                <strong>Vapours:</strong> Solvent vapours, fuel vapours, SF6 decomposition products
              </li>
              <li>
                <strong>Gases:</strong> SF6, carbon monoxide, hydrogen (from battery charging),
                refrigerants
              </li>
              <li>
                <strong>Biological agents:</strong> Bacteria, fungi, viruses encountered during
                maintenance work
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="What COSHH Does NOT Cover">
            <p>
              COSHH does not cover lead (covered by the Control of Lead at Work Regulations 2002),
              asbestos (covered by the Control of Asbestos Regulations 2012), or radioactive
              substances (covered by the Ionising Radiations Regulations 2017). However, you may
              encounter lead and asbestos in older electrical installations, and separate
              regulations apply to these substances.
            </p>
          </ConceptBlock>

          <ConceptBlock title="GHS Pictograms (CLP Regulation)">
            <p>
              The Globally Harmonised System (GHS), implemented in the UK through the CLP Regulation
              (Classification, Labelling and Packaging), uses standardised red-bordered
              diamond-shaped pictograms to communicate hazards. You must recognise these pictograms
              to understand the hazards of substances you encounter:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">Pictogram</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Hazard</th>
                    <th className="border border-white/10 px-3 py-2 text-left">
                      Electrical Maintenance Example
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Flame</td>
                    <td className="border border-white/10 px-3 py-2">Flammable</td>
                    <td className="border border-white/10 px-3 py-2">
                      Contact cleaners, solvents, cable-pulling lubricants
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Skull and crossbones</td>
                    <td className="border border-white/10 px-3 py-2">
                      Acute toxicity (fatal/toxic)
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Certain pesticides used in cable ducts, some industrial solvents
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Exclamation mark</td>
                    <td className="border border-white/10 px-3 py-2">Harmful / irritant</td>
                    <td className="border border-white/10 px-3 py-2">
                      Many cleaning products, some adhesives, mild solvents
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Corrosion</td>
                    <td className="border border-white/10 px-3 py-2">Corrosive</td>
                    <td className="border border-white/10 px-3 py-2">
                      Battery acid, drain cleaners, strong flux residue removers
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Health hazard</td>
                    <td className="border border-white/10 px-3 py-2">
                      Serious health hazard (CMR, respiratory sensitiser)
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Colophony-based solder flux (respiratory sensitiser), some resins
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Gas cylinder</td>
                    <td className="border border-white/10 px-3 py-2">Gas under pressure</td>
                    <td className="border border-white/10 px-3 py-2">
                      SF6 cylinders, refrigerant cylinders, compressed air
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Environment</td>
                    <td className="border border-white/10 px-3 py-2">
                      Hazardous to aquatic environment
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Transformer oil, some cleaning solvents
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Flame over circle</td>
                    <td className="border border-white/10 px-3 py-2">Oxidising</td>
                    <td className="border border-white/10 px-3 py-2">
                      Some cleaning agents, peroxide-based products
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Exploding bomb</td>
                    <td className="border border-white/10 px-3 py-2">Explosive</td>
                    <td className="border border-white/10 px-3 py-2">
                      Cartridge-operated fixing tools, some gas mixtures
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              <strong>Key point:</strong> Always check the label and SDS before using any substance.
              If a product has no label or the label is damaged and unreadable, do not use it —
              return it and obtain a properly labelled replacement.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>The 8-Step COSHH Assessment Process</ContentEyebrow>

          <ConceptBlock title="The 8-Step COSHH Assessment Process">
            <p>
              A COSHH assessment is a structured evaluation of the risks from hazardous substances
              in the workplace and the controls needed to manage those risks. It is a legal
              requirement under Regulation 6 of COSHH, and it must be carried out before any work
              involving hazardous substances begins. The assessment must be &apos;suitable and
              sufficient&apos; — meaning it must genuinely identify the risks and determine
              effective controls, not just be a tick-box exercise.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Step 1 — Identify Hazardous Substances">
            <p>
              List all substances present in the workplace or generated by work activities. This
              includes purchased products (check SDS documents), substances produced by processes
              (solder fumes, dust from chasing), and naturally occurring substances (mould,
              bacteria). For electrical maintenance, survey your van stock, workshop chemicals, and
              substances encountered on client sites.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Step 2 — Decide Who Might Be Harmed">
            <p>
              Consider not just the person using the substance, but also others nearby — colleagues
              working in the same area, building occupants, cleaners, visitors. Pay particular
              attention to vulnerable groups: pregnant workers, young workers, workers with
              pre-existing health conditions (e.g., asthma), and members of the public who might be
              affected.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Step 3 — Evaluate the Risks">
            <p>
              Consider the hazard properties of the substance (from the SDS), the route of exposure
              (inhalation, skin, ingestion), the duration and frequency of exposure, the amount
              used, the work environment (ventilation, temperature, confined space), and the
              effectiveness of existing controls. Compare exposure levels with workplace exposure
              limits (WELs) where applicable.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Step 4 — Record Significant Findings">
            <p>
              Document the assessment in a clear, accessible format. Record the substances
              identified, who is at risk, the nature of the risk, and the control measures needed.
              The record must be accessible to workers and available for inspection by enforcement
              authorities. Electronic records are acceptable provided they can be retrieved and
              presented when needed.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Step 5 — Implement Control Measures">
            <p>
              Put in place the controls identified in the assessment, following the hierarchy:
              elimination, substitution, engineering controls (ventilation, enclosure),
              administrative controls (procedures, rotation, time limits), and PPE. Ensure all
              controls are in place before work begins. Controls must be proportionate to the risk —
              you do not need a full-face respirator to use a marker pen, but you do need fume
              extraction to solder.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Step 6 — Plan Monitoring and Maintenance">
            <p>
              Establish how you will verify that controls remain effective. This may include routine
              inspection of LEV systems (LEV testing is required at least every 14 months under
              Regulation 9), exposure monitoring (air sampling), workplace inspections, and
              maintenance schedules for engineering controls. Record all monitoring results.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Step 7 — Provide Information, Instruction and Training">
            <p>
              Workers must understand the hazards of the substances they work with, the control
              measures in place, how to use those controls correctly (including PPE), the results of
              exposure monitoring and health surveillance, and what to do in an emergency. Training
              must be repeated when circumstances change and refreshed at suitable intervals.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Step 8 — Review the Assessment">
            <p>
              Review the assessment regularly (at least annually) and whenever there is reason to
              believe it is no longer valid — for example, if new substances are introduced,
              processes change, monitoring reveals unexpectedly high exposure, or cases of ill
              health are reported. Update the assessment and communicate changes to all affected
              workers.
            </p>
            <p>
              <strong>Practical note:</strong> As a maintenance technician, you may not write COSHH
              assessments yourself (this is typically done by your employer or a health and safety
              adviser), but you must understand the assessment for your work activities, follow the
              control measures specified, and report any concerns about the adequacy of the
              controls.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Workplace Exposure Limits and Health Surveillance</ContentEyebrow>

          <ConceptBlock title="Workplace Exposure Limits and Health Surveillance">
            <p>
              Workplace exposure limits (WELs) are legal limits on the concentration of hazardous
              substances in the air that workers breathe. They are published in the HSE document
              EH40/2005 (Workplace Exposure Limits) and are set at levels intended to prevent ill
              health in most workers. However, WELs are not &apos;safe&apos; levels — they are
              maximum permitted levels, and exposure should always be reduced to as low as is
              reasonably practicable, even when it is below the WEL.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Types of Exposure Limit">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>8-hour TWA (Time-Weighted Average):</strong> The maximum average
                concentration over an 8-hour working day. This accounts for variable exposure
                throughout the day — short periods above the TWA are acceptable provided the overall
                average stays below the limit.
              </li>
              <li>
                <strong>15-minute STEL (Short-Term Exposure Limit):</strong> The maximum average
                concentration over a 15-minute reference period. This protects against acute effects
                from short, high-intensity exposures. No more than 4 STELs in any 8-hour period,
                with at least 60 minutes between them.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="WELs Relevant to Electrical Maintenance">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">Substance</th>
                    <th className="border border-white/10 px-3 py-2 text-left">8-hour TWA</th>
                    <th className="border border-white/10 px-3 py-2 text-left">15-min STEL</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Context</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">
                      Rosin-based solder flux fume
                    </td>
                    <td className="border border-white/10 px-3 py-2">0.05 mg/m³</td>
                    <td className="border border-white/10 px-3 py-2">0.15 mg/m³</td>
                    <td className="border border-white/10 px-3 py-2">
                      Soldering electrical connections
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Sulphuric acid mist</td>
                    <td className="border border-white/10 px-3 py-2">0.05 mg/m³</td>
                    <td className="border border-white/10 px-3 py-2">0.15 mg/m³</td>
                    <td className="border border-white/10 px-3 py-2">
                      Battery maintenance, charging areas
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Isopropyl alcohol</td>
                    <td className="border border-white/10 px-3 py-2">999 mg/m³</td>
                    <td className="border border-white/10 px-3 py-2">1250 mg/m³</td>
                    <td className="border border-white/10 px-3 py-2">
                      Contact cleaner for PCBs and relays
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Respirable dust (general)</td>
                    <td className="border border-white/10 px-3 py-2">4 mg/m³</td>
                    <td className="border border-white/10 px-3 py-2">—</td>
                    <td className="border border-white/10 px-3 py-2">
                      Dust from chasing, drilling, cutting
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">
                      Respirable crystalline silica
                    </td>
                    <td className="border border-white/10 px-3 py-2">0.1 mg/m³</td>
                    <td className="border border-white/10 px-3 py-2">—</td>
                    <td className="border border-white/10 px-3 py-2">
                      Cutting/chasing concrete and brick
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Health Surveillance">
            <p>
              Where workers are exposed to substances that can cause identifiable diseases or
              adverse health effects, and valid techniques exist to detect early signs, your
              employer must provide health surveillance. For electrical maintenance technicians,
              this may include:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Lung function tests:</strong> For workers regularly exposed to solder fumes
                (colophony can cause occupational asthma)
              </li>
              <li>
                <strong>Skin checks:</strong> For workers regularly handling solvents, oils or
                cutting fluids (can cause dermatitis)
              </li>
              <li>
                <strong>Biological monitoring:</strong> Blood or urine tests for specific substances
                where indicated
              </li>
            </ul>
            <p>
              You have a duty to attend health surveillance appointments when required. If you
              develop any symptoms that might be related to workplace exposure — persistent cough,
              skin rashes, breathing difficulty — report them immediately.
            </p>
            <p>
              <strong>Remember:</strong> A WEL is a legal maximum, not a target. Your employer must
              reduce exposure to as low as is reasonably practicable, even if current levels are
              below the WEL. If a substance is a known carcinogen, mutagen or reproductive toxicant,
              exposure must be reduced to as low as is technically possible.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Hazardous Substances in Electrical Maintenance</ContentEyebrow>

          <ConceptBlock title="Hazardous Substances in Electrical Maintenance">
            <p>
              Electrical maintenance technicians encounter a surprising range of hazardous
              substances in their daily work. Many of these are so familiar that complacency can set
              in — the solder you use every week, the contact cleaner in your tool bag, the battery
              acid you top up periodically. Understanding the specific hazards and required controls
              for each substance is essential for protecting your health.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Solder and Solder Flux">
            <p>
              Traditional tin-lead solder with rosin (colophony) flux is one of the most significant
              COSHH hazards for electricians. When heated, the flux produces a complex mixture of
              fumes that includes aldehydes and organic acids. These fumes are a known respiratory
              sensitiser — meaning they can cause occupational asthma, a condition that may be
              permanent and disabling.
            </p>
            <ul className="list-disc space-y-1 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Hazard:</strong> Respiratory sensitisation, skin sensitisation, eye
                irritation
              </li>
              <li>
                <strong>Controls:</strong> Local exhaust ventilation (fume extraction), lead-free
                solder where possible, avoid leaning over the work, good hand hygiene
              </li>
              <li>
                <strong>PPE (if LEV insufficient):</strong> FFP2 respirator as a minimum, safety
                glasses
              </li>
              <li>
                <strong>Health surveillance:</strong> Lung function testing for regular solderers
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Contact Cleaners and Solvents">
            <p>
              Electrical contact cleaners typically contain isopropyl alcohol, acetone, or
              proprietary solvent blends. They are used to clean relay contacts, PCB surfaces, and
              switchgear components. The rapid evaporation that makes them effective also means they
              produce significant vapour concentrations, especially in enclosed spaces.
            </p>
            <ul className="list-disc space-y-1 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Hazard:</strong> Flammable vapours, CNS depression from inhalation, skin
                defatting, eye irritation
              </li>
              <li>
                <strong>Controls:</strong> Adequate ventilation, minimal quantities, no ignition
                sources nearby, sealed containers when not in use
              </li>
              <li>
                <strong>PPE:</strong> Chemical-resistant gloves (nitrile), safety glasses,
                respiratory protection in poorly ventilated areas
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Cable-Pulling Lubricants">
            <p>
              Used to reduce friction when drawing cables through conduit and trunking. Products
              range from water-based (lower hazard) to petroleum-based (higher hazard). Prolonged
              skin contact can cause dermatitis, and inhalation of mist in enclosed spaces is a
              concern.
            </p>
            <ul className="list-disc space-y-1 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Hazard:</strong> Skin irritation/dermatitis, eye irritation, slipping hazard
              </li>
              <li>
                <strong>Controls:</strong> Use water-based products where possible (substitution),
                barrier cream, wash hands frequently
              </li>
              <li>
                <strong>PPE:</strong> Nitrile gloves, safety glasses when applying
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Battery Acid (Sulphuric Acid)">
            <p>
              Lead-acid batteries in UPS systems, emergency lighting, and standby power supplies
              contain dilute sulphuric acid (typically 30-40% concentration). During charging,
              batteries can also release hydrogen gas, creating an explosion risk, and acid mist,
              which is a respiratory hazard.
            </p>
            <ul className="list-disc space-y-1 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Hazard:</strong> Severe burns to skin and eyes, respiratory damage from acid
                mist, hydrogen gas explosion risk
              </li>
              <li>
                <strong>Controls:</strong> Bunded, ventilated battery rooms; no naked flames; eye
                wash stations; spill kits
              </li>
              <li>
                <strong>PPE:</strong> Chemical splash goggles, acid-resistant gloves, face shield
                for topping up, apron
              </li>
              <li>
                <strong>Storage:</strong> Acid-resistant containers, bunded area (110% of largest
                container), away from alkalis and metals
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="SF6 Gas (Sulphur Hexafluoride)">
            <p>
              Used as an insulating and arc-quenching medium in medium and high-voltage switchgear
              (gas-insulated switchgear — GIS). While SF6 itself has low toxicity, it is denser than
              air and can displace oxygen in enclosed spaces. More critically, when SF6 is exposed
              to electrical arcing, it decomposes into highly toxic by-products.
            </p>
            <ul className="list-disc space-y-1 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Hazard:</strong> Asphyxiation (oxygen displacement), toxic decomposition
                products (SO2, HF, metal fluorides)
              </li>
              <li>
                <strong>Controls:</strong> Gas detection/monitoring, forced ventilation in GIS
                rooms, leak detection, certified personnel only
              </li>
              <li>
                <strong>PPE:</strong> Self-contained breathing apparatus (SCBA) for emergency
                response; air-supplied respirator for decomposition products
              </li>
              <li>
                <strong>Regulation:</strong> F-Gas Regulations require recovery; SF6 is also covered
                by COSHH for health risks
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Transformer Oil">
            <p>
              Mineral insulating oil used in power transformers. Prolonged skin contact causes
              dermatitis, and older oils may be contaminated with PCBs (polychlorinated biphenyls),
              which are carcinogenic. Oil mist from heated transformers is a respiratory hazard.
            </p>
            <ul className="list-disc space-y-1 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Hazard:</strong> Skin irritation/dermatitis, potential PCB contamination
                (carcinogen), oil mist inhalation, environmental pollution
              </li>
              <li>
                <strong>Controls:</strong> PCB testing before maintenance, bunded storage, drip
                trays during work, oil-resistant gloves
              </li>
              <li>
                <strong>PPE:</strong> Oil-resistant gloves, safety glasses, overalls, RPE if oil
                mist present
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Storage Requirements">
            <p>
              All hazardous substances must be stored in accordance with their SDS requirements.
              General principles include: store in original containers with labels intact; keep
              incompatible substances separated (acids from alkalis, flammables from oxidisers);
              ensure adequate ventilation; keep quantities to the minimum needed; provide bunding
              for liquids; secure against unauthorised access; maintain appropriate temperature; and
              ensure spill response equipment is nearby. In your van, secure chemicals so they
              cannot spill or leak during transit.
            </p>
            <p>
              <strong>ST1426 link:</strong> Understanding the hazardous substances in your work
              environment and knowing how to work safely with them is a core competency for the
              maintenance technician standard. You must demonstrate that you can identify hazards,
              follow COSHH assessments, use PPE correctly, and report concerns.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Safety Data Sheets and Practical Application</ContentEyebrow>

          <ConceptBlock title="Safety Data Sheets and Practical Application">
            <p>
              The safety data sheet (SDS) is the most important source of information about a
              hazardous substance. Under the CLP Regulation and REACH, suppliers must provide an SDS
              for any substance or mixture classified as hazardous. The SDS contains everything you
              need to know to use, store and dispose of the substance safely — but only if you
              actually read it.
            </p>
          </ConceptBlock>

          <ConceptBlock title="The 16 Sections of an SDS">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">Section</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Content</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Why It Matters</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">1</td>
                    <td className="border border-white/10 px-3 py-2">Identification</td>
                    <td className="border border-white/10 px-3 py-2">
                      Product name, supplier, emergency contact
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">2</td>
                    <td className="border border-white/10 px-3 py-2">Hazards identification</td>
                    <td className="border border-white/10 px-3 py-2">
                      Classification, pictograms, signal words, hazard statements
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">3</td>
                    <td className="border border-white/10 px-3 py-2">Composition</td>
                    <td className="border border-white/10 px-3 py-2">
                      Chemical ingredients and concentrations
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">4</td>
                    <td className="border border-white/10 px-3 py-2">First aid measures</td>
                    <td className="border border-white/10 px-3 py-2">
                      Immediate actions for each exposure route
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">5</td>
                    <td className="border border-white/10 px-3 py-2">Fire-fighting measures</td>
                    <td className="border border-white/10 px-3 py-2">
                      Suitable extinguishing media, special hazards in fire
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">6</td>
                    <td className="border border-white/10 px-3 py-2">Accidental release</td>
                    <td className="border border-white/10 px-3 py-2">Spill response procedures</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">7</td>
                    <td className="border border-white/10 px-3 py-2">Handling and storage</td>
                    <td className="border border-white/10 px-3 py-2">
                      Safe handling precautions, storage conditions
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">8</td>
                    <td className="border border-white/10 px-3 py-2">Exposure controls / PPE</td>
                    <td className="border border-white/10 px-3 py-2">
                      WELs, engineering controls, PPE specifications
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">9–16</td>
                    <td className="border border-white/10 px-3 py-2">
                      Physical/chemical, stability, toxicology, ecology, disposal, transport,
                      regulatory, other
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Detailed technical information for specialist use
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <Scenario
            title="Practical COSHH Application: Replacing a UPS Battery Bank"
            situation={
              <>
                You are tasked with replacing a failed UPS battery bank in a small plant room. Here
                is how COSHH applies to this routine maintenance task.
              </>
            }
            whatToDo={
              <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Hazardous substances:</strong> Sulphuric acid (battery electrolyte),
                  hydrogen gas (from charging), lead dust (from corroded terminals)
                </li>
                <li>
                  <strong>COSHH assessment:</strong> Check the assessment covers battery maintenance
                  in confined plant rooms
                </li>
                <li>
                  <strong>Controls:</strong> Ensure plant room ventilation is working (hydrogen gas
                  accumulation risk); use acid-resistant PPE; have eye wash and spill kit available
                </li>
                <li>
                  <strong>PPE:</strong> Chemical splash goggles, acid-resistant gloves, face shield,
                  overalls
                </li>
                <li>
                  <strong>Waste:</strong> Old batteries are hazardous waste — arrange collection by
                  a licensed carrier with consignment note
                </li>
                <li>
                  <strong>Emergency:</strong> Know the first aid procedures for acid splash to eyes
                  and skin before starting work
                </li>
              </ul>
            }
          />

          <ConceptBlock title="COSHH Register">
            <p>
              Your company should maintain a COSHH register — a list of all hazardous substances
              used, with the corresponding SDS and COSHH assessment for each. The register should be
              kept up to date and accessible to all workers. When you bring a new product onto site,
              check whether it is on the register. If not, obtain the SDS and ensure an assessment
              is carried out before use.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Reporting Concerns">
            <p>
              If you believe that COSHH controls are inadequate, that you are being exposed to
              substances without proper assessment, or that you are developing symptoms that might
              be related to substance exposure, you have a duty to report this to your supervisor.
              Under the Health and Safety at Work Act 1974, you also have the right to raise safety
              concerns without fear of detriment. RIDDOR requires reporting of occupational diseases
              including occupational asthma.
            </p>
          </ConceptBlock>

          <ConceptBlock title="COSHH Compliance is Not Optional">
            <p>
              COSHH compliance is not optional. Under the Health and Safety at Work Act 1974 and
              COSHH Regulations 2002, employers face unlimited fines and imprisonment for failure to
              control exposure to hazardous substances. Workers who deliberately bypass COSHH
              controls may also face personal prosecution.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              '1. Identify hazardous substances.',
              '2. Decide who might be harmed.',
              '3. Evaluate the risks.',
              '4. Record significant findings.',
              '5. Implement control measures.',
              '6. Plan monitoring and maintenance.',
              '7. Provide information/training.',
              '8. Review the assessment.',
              'COSHH Regulations 2002 — Primary legislation.',
              'CLP Regulation — Classification and labelling.',
              'EH40/2005 — Workplace exposure limits.',
              'HSG97 — A Step by Step Guide to COSHH.',
              'INDG136 — Working with substances hazardous to health.',
              'ST1426 — Safe working practices KSBs.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz title="COSHH awareness knowledge check" questions={quizQuestions} />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module1-section5-1')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Waste Management and Recycling
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module1-section5-3')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Energy Efficiency in Maintenance
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule1Section5_2;
