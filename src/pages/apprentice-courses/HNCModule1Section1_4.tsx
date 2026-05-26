/**
 * Module 1 · Section 1 · Subsection 4 — COSHH and Hazardous Substances
 * HNC Electrical Engineering for Building Services (Pearson U4001 + Building Services context)
 *   The Control of Substances Hazardous to Health Regulations 2002. Engineer-in-training
 *   perspective: how COSHH bites on building services work — solvents, fluxes, refrigerants,
 *   battery electrolyte, asbestos in older switchrooms, silica from chasing.
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
  ContentEyebrow,
  SectionRule,
  LearningOutcomes,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'COSHH and Hazardous Substances - HNC Module 1 Section 1.4';
const DESCRIPTION =
  'Comprehensive guide to COSHH regulations, hazardous substance assessments, control measures hierarchy and health surveillance requirements for building services engineering.';

const quickCheckQuestions = [
  {
    id: 'coshh-definition',
    question: 'What does COSHH stand for?',
    options: [
      'Control of Safety Hazards on Highways',
      'Classification of Substances Harmful to Health',
      'Control of Substances Hazardous to Health',
      'Compliance of Substances and Health Hazards',
    ],
    correctIndex: 2,
    explanation:
      'COSHH stands for Control of Substances Hazardous to Health. These regulations (2002) require employers to control exposure to hazardous substances to prevent ill health in the workplace.',
  },
  {
    id: 'control-hierarchy',
    question: 'In the hierarchy of control measures, what should be considered first?',
    options: [
      'Elimination or substitution',
      'Personal protective equipment',
      'Administrative controls',
      'Engineering controls',
    ],
    correctIndex: 0,
    explanation:
      'Elimination (removing the hazard entirely) or substitution (replacing with a less hazardous substance) should always be considered first. PPE should only be used as a last resort when other controls are not reasonably practicable.',
  },
  {
    id: 'ghs-pictogram',
    question: 'Which GHS pictogram indicates a substance is harmful to the environment?',
    options: [
      'Dead fish and tree',
      'Flame',
      'Skull and crossbones',
      'Exclamation mark',
    ],
    correctIndex: 0,
    explanation:
      'The GHS pictogram showing a dead fish and tree indicates environmental hazards. This warns that the substance is dangerous to aquatic life and should not be released into drains or watercourses.',
  },
  {
    id: 'health-surveillance',
    question: 'When is health surveillance required under COSHH?',
    options: [
      'The centre of the space is left in darkness, creating trip hazards and panic',
      'Bearing failure (mechanical) or insulation breakdown (electrical)',
      'To provide safe holding areas and guide occupants to staircases during lift failures',
      'When there is a reasonable likelihood of disease related to exposure',
    ],
    correctIndex: 3,
    explanation:
      'Health surveillance is required when there is a reasonable likelihood that an identifiable disease or adverse health effect may be related to the exposure, and valid techniques exist for detecting the disease or effect.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Under COSHH 2002, which of the following is NOT classified as a hazardous substance?',
    options: [
      'Soldering flux fumes',
      'Untreated wood shavings',
      'Refrigerant gases',
      'Cement dust',
    ],
    correctAnswer: 1,
    explanation:
      'Untreated natural wood is not classified as hazardous under COSHH (though hardwood dust is). Soldering flux produces harmful fumes, refrigerants can displace oxygen and cause cold burns, and cement dust is alkaline and causes skin and respiratory irritation.',
  },
  {
    id: 2,
    question: 'What is the Workplace Exposure Limit (WEL) for?',
    options: [
      'The maximum number of workers exposed to a substance',
      'The maximum time a worker can spend in a hazardous area',
      'The maximum concentration of a hazardous substance in workplace air',
      'The minimum ventilation rate required',
    ],
    correctAnswer: 2,
    explanation:
      'Workplace Exposure Limits (WELs) set the maximum concentration of airborne substances averaged over a reference period (usually 8 hours or 15 minutes for short-term limits). They are published in HSE document EH40.',
  },
  {
    id: 3,
    question: 'A COSHH assessment must be reviewed:',
    options: [
      'Replacing solvent-based adhesive with water-based',
      'The maximum concentration of a hazardous substance in workplace air',
      'To detect early signs of work-related ill health',
      'When there is reason to suspect it is no longer valid',
    ],
    correctAnswer: 3,
    explanation:
      'COSHH assessments must be reviewed when there is reason to suspect they are no longer valid - this includes changes to work processes, new information about hazards, incidents, or ill health reports. Regular review is good practice, but the legal trigger is when validity is in doubt.',
  },
  {
    id: 4,
    question:
      'Which refrigerant type poses the greatest environmental concern for ozone depletion?',
    options: [
      'HCFCs (hydrochlorofluorocarbons)',
      'HFCs (hydrofluorocarbons)',
      'Natural refrigerants (CO2, ammonia)',
      'HFOs (hydrofluoroolefins)',
    ],
    correctAnswer: 0,
    explanation:
      'HCFCs contain chlorine which depletes the ozone layer. While being phased out under the Montreal Protocol, they may still be found in older systems. HFCs have zero ODP but high GWP. Natural refrigerants and HFOs have minimal environmental impact.',
  },
  {
    id: 5,
    question: 'What information must be included in Section 8 of a Safety Data Sheet?',
    options: [
      'Local exhaust ventilation (fume extraction)',
      'Exposure controls and personal protection',
      'HCFCs (hydrochlorofluorocarbons)',
      'To detect early signs of work-related ill health',
    ],
    correctAnswer: 1,
    explanation:
      'Section 8 of an SDS covers exposure controls and personal protection, including occupational exposure limits and recommended PPE. First aid is Section 4, physical properties Section 9, and ecological information Section 12.',
  },
  {
    id: 6,
    question: 'When working with soldering flux, which control measure is most appropriate?',
    options: [
      'Working near an open window',
      'Respiratory protective equipment only',
      'Local exhaust ventilation (fume extraction)',
      'Limiting work to 4 hours per day',
    ],
    correctAnswer: 2,
    explanation:
      "Local exhaust ventilation (LEV) captures fumes at source before they enter the breathing zone. It is the preferred engineering control for soldering operations. Natural ventilation is inadequate, RPE should be a last resort, and time limits alone don't prevent exposure.",
  },
  {
    id: 7,
    question: "Under CLP Regulations, what does the signal word 'Danger' indicate?",
    options: [
      'A minor hazard requiring attention',
      'The substance requires special disposal',
      'The substance is flammable',
      'A more severe hazard category',
    ],
    correctAnswer: 3,
    explanation:
      "Under CLP (Classification, Labelling and Packaging), 'Danger' is the signal word for more severe hazard categories, while 'Warning' is used for less severe hazards. The signal word provides an immediate indication of hazard severity.",
  },
  {
    id: 8,
    question:
      'What is the primary health risk from prolonged exposure to silica dust in construction?',
    options: [
      'Silicosis and lung cancer',
      'Hearing loss',
      'Contact dermatitis',
      'Musculoskeletal disorders',
    ],
    correctAnswer: 0,
    explanation:
      'Respirable crystalline silica (RCS) causes silicosis - an irreversible lung disease - and is a known carcinogen causing lung cancer. It is generated when cutting, drilling, or grinding concrete, brick, or stone - common activities in building services installation.',
  },
  {
    id: 9,
    question: 'Which document provides details of Workplace Exposure Limits in the UK?',
    options: [
      'A more severe hazard category',
      'EH40 Workplace Exposure Limits',
      'HCFCs (hydrochlorofluorocarbons)',
      'Silicosis and lung cancer',
    ],
    correctAnswer: 1,
    explanation:
      "EH40 'Workplace Exposure Limits' is the HSE publication listing all UK WELs, updated regularly. It provides the legal limits that must not be exceeded and guidance on measurement and control.",
  },
  {
    id: 10,
    question:
      'A building services engineer discovers an unlabelled chemical container on site. What should they do?',
    options: [
      'Dispose of it in general waste',
      'Assume it is safe and use it',
      'Not use it and report it to the supervisor',
      'Label it themselves based on appearance',
    ],
    correctAnswer: 2,
    explanation:
      'Unlabelled containers must never be used - the contents are unknown and could be hazardous. Report to the supervisor so proper identification can be arranged. Never assume safety or attempt to identify by smell, colour, or appearance.',
  },
  {
    id: 11,
    question: 'Which of these is an example of substitution as a control measure?',
    options: [
      'Not use it and report it to the supervisor',
      'Local exhaust ventilation (fume extraction)',
      'Exposure controls and personal protection',
      'Replacing solvent-based adhesive with water-based',
    ],
    correctAnswer: 3,
    explanation:
      'Substitution means replacing a hazardous substance with a less hazardous alternative. Replacing solvent-based products with water-based versions eliminates volatile organic compound (VOC) exposure. This is higher in the hierarchy than engineering controls or PPE.',
  },
  {
    id: 12,
    question: 'What is the purpose of COSHH health surveillance records?',
    options: [
      'To detect early signs of work-related ill health',
      'Local exhaust ventilation (fume extraction)',
      'Not use it and report it to the supervisor',
      'When there is reason to suspect it is no longer valid',
    ],
    correctAnswer: 0,
    explanation:
      'Health surveillance aims to detect early signs of work-related ill health so action can be taken before serious harm occurs. Records must be kept for at least 40 years as some occupational diseases have long latency periods.',
  },
];

const faqs = [
  {
    question: 'What substances are covered by COSHH?',
    answer:
      'COSHH covers chemicals, products containing chemicals, fumes, dusts, vapours, mists, nanotechnology, gases, biological agents, and germs causing diseases. In building services, common examples include refrigerants, soldering flux, adhesives, sealants, cleaning chemicals, and dusts from cutting concrete or cable materials.',
  },
  {
    question: 'Who is responsible for carrying out COSHH assessments?',
    answer:
      'The employer has legal responsibility for COSHH assessments, but they can delegate the task to a competent person. On construction sites, assessments may be carried out by the principal contractor, but each employer remains responsible for their own workers. Self-employed persons must assess their own exposure.',
  },
  {
    question: 'How long must COSHH assessments and health records be kept?',
    answer:
      'COSHH assessments should be reviewed and updated regularly - there is no statutory retention period but keeping them for at least 5 years is recommended. Health surveillance records must be kept for 40 years from the date of the last entry, as some occupational diseases can take decades to develop.',
  },
  {
    question: 'What is the difference between a Safety Data Sheet and a COSHH assessment?',
    answer:
      'A Safety Data Sheet (SDS) is provided by the manufacturer/supplier and gives information about the substance itself - hazards, properties, handling. A COSHH assessment is carried out by the employer and considers the specific way the substance is used in their workplace, the actual exposure, and the control measures needed.',
  },
  {
    question: 'Are there any substances not covered by COSHH?',
    answer:
      'COSHH does not cover lead (covered by Control of Lead at Work Regulations 2002), asbestos (covered by Control of Asbestos Regulations 2012), radioactive substances, or hazards from the physical properties of substances such as high pressure, temperature, or explosive properties.',
  },
  {
    question: 'What training is required for workers exposed to hazardous substances?',
    answer:
      'Workers must receive suitable and sufficient information, instruction and training on: the nature of substances and their risks; the findings of the COSHH assessment; precautions to take; results of exposure monitoring; health surveillance requirements; and emergency procedures. Training must be repeated when circumstances change.',
  },
];

const HNCModule1Section1_4 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('../h-n-c-module1-section1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 1
          </button>

          <PageHero
            eyebrow="Module 1.1.4"
            title="COSHH and Hazardous Substances"
            description="Understanding the Control of Substances Hazardous to Health and protecting workers in building services"
            tone="purple"
          />

          <TLDR
            points={[
              'You will treat COSHH 2002 as a parallel duty to BS 7671 — every refrigerant, solvent, sealant, lubricant or battery electrolyte specified is also a COSHH item.',
              'You can step through the eight-stage COSHH process — assess, plan, train, monitor, surveil, review — on a building services project.',
              'You apply the hierarchy of control (eliminate, substitute, engineer, administer, PPE) and reject any plan that leaps straight to PPE.',
              'You recognise notifiable substances (asbestos, lead, isocyanates, silica) and trigger the right separate regimes (CAR, CLAW, ACoP L132).',
            ]}
          />

          <RegsCallout
            source="COSHH 2002 — Regulation 7(1)"
            clause="Every employer shall ensure that the exposure of his employees to substances hazardous to health is either prevented or, where this is not reasonably practicable, adequately controlled."
            meaning={
              <>
                Reg 7 hard-codes the prevention-first principle into UK law. As a building services
                HNC engineer your first design move on any product specification with a hazardous
                substance is to ask: can we eliminate or substitute? Only when both fail do you
                move down the hierarchy to engineering controls and finally PPE.
              </>
            }
            cite="Source: Control of Substances Hazardous to Health Regulations 2002, Reg 7(1) — legislation.gov.uk"
          />

          <LearningOutcomes
            outcomes={[
              "Define what constitutes a hazardous substance under COSHH",
              "Explain the five steps of COSHH assessment",
              "Apply the hierarchy of control measures correctly",
              "Identify when health surveillance is required",
              "Recognise hazardous substances in building services work",
              "Interpret Safety Data Sheets and GHS/CLP labelling",
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ContentEyebrow>What Are Hazardous Substances?</ContentEyebrow>

          <ConceptBlock title="What Are Hazardous Substances?">
            <p>
            The Control of Substances Hazardous to Health Regulations 2002 (COSHH) requires
            employers to control exposure to hazardous substances to prevent ill health. A
            hazardous substance is any substance that can cause harm to health.
            </p>

            
            <p className="text-sm font-medium text-white mb-2">Substances covered by COSHH:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Chemicals:</strong> Acids, alkalis, solvents, adhesives
            </li>
            <li>
            <strong>Fumes:</strong> Welding fumes, soldering flux fumes
            </li>
            <li>
            <strong>Dusts:</strong> Wood dust, silica dust, insulation fibres
            </li>
            <li>
            <strong>Vapours and mists:</strong> Paint spray, cleaning agent vapours
            </li>
            <li>
            <strong>Gases:</strong> Refrigerants, carbon monoxide, nitrogen
            </li>
            <li>
            <strong>Biological agents:</strong> Bacteria, viruses (e.g., legionella in water
            systems)
            </li>
            </ul>
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Routes of Entry into the Body
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>Inhalation</strong> — Description: Breathing in fumes, dusts, gases. Building Services Examples: Soldering flux fumes, refrigerant gases, silica dust</li>
            <li><strong>Skin absorption</strong> — Description: Contact with skin allowing penetration. Building Services Examples: Solvents, oils, some adhesives</li>
            <li><strong>Ingestion</strong> — Description: Swallowing (often from contaminated hands). Building Services Examples: Lead from older solder, contamination from poor hygiene</li>
            <li><strong>Injection</strong> — Description: Entry through cuts or puncture wounds. Building Services Examples: Contaminated sharps, high-pressure injection</li>
            </ul>
            
            

            <CommonMistake
            title="strongNot covered by COSHH:/strong Lead (Control of Lead at Work Regulations 2002), asbestos (Control of Asbestos Regulations 2012), radioactive substances, and physical hazards such as high pressure, temperature extremes, or explosive properties."
            whatHappens={<><p>See guidance.</p></>}
            doInstead={<>Follow the safe-system procedure: stop work, escalate, document, and only resume once controls are verified.</>}
            />
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>COSHH Assessment Process</ContentEyebrow>

          <ConceptBlock title="COSHH Assessment Process">
            <p>
            Employers must carry out a suitable and sufficient assessment of health risks from
            hazardous substances. The assessment must be reviewed when circumstances change or
            there is reason to believe it is no longer valid.
            </p>

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            The Five Steps of COSHH Assessment
            </p>
            
            
            <p className="font-medium text-elec-yellow mb-1">Step 1: Identify the Hazards</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>List all substances used, produced, or encountered</li>
            <li>Obtain Safety Data Sheets from suppliers</li>
            <li>Consider by-products (fumes from heating materials)</li>
            <li>Include substances brought on site by others</li>
            </ul>
            
            
            <p className="font-medium text-elec-yellow mb-1">Step 2: Evaluate the Risks</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Who might be exposed and how?</li>
            <li>What is the level and duration of exposure?</li>
            <li>Compare to Workplace Exposure Limits (WELs)</li>
            <li>Consider combined effects of multiple substances</li>
            </ul>
            
            
            <p className="font-medium text-elec-yellow mb-1">Step 3: Control the Risks</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Apply hierarchy of control measures</li>
            <li>Select appropriate controls for each substance</li>
            <li>Document control measures in writing</li>
            <li>Ensure controls are properly implemented</li>
            </ul>
            
            
            <p className="font-medium text-elec-yellow mb-1">Step 4: Record and Implement</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Document assessment findings</li>
            <li>Communicate to all affected workers</li>
            <li>Provide information, instruction and training</li>
            <li>Ensure adequate supervision</li>
            </ul>
            
            
            <p className="font-medium text-elec-yellow mb-1">Step 5: Review and Update</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Review when no longer valid</li>
            <li>Update when processes or substances change</li>
            <li>Review after incidents or ill health reports</li>
            <li>Consider new information about hazards</li>
            </ul>
            
            
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Workplace Exposure Limits (WELs)
            </p>
            <p className="text-sm text-white mb-3">
            WELs are published in HSE document EH40 and set the maximum concentration of
            hazardous substances in workplace air. Two types exist:
            </p>
            
            
            <p className="font-medium text-white mb-1">Long-term (8-hour TWA)</p>
            <p className="text-sm text-white">
            Time-weighted average over 8-hour reference period
            </p>
            
            
            <p className="font-medium text-white mb-1">Short-term (15-minute)</p>
            <p className="text-sm text-white">
            Maximum for any 15-minute period during the day
            </p>
            
            
            

            <p className="text-sm text-elec-yellow/70">
            <strong>Remember:</strong> A COSHH assessment is site-specific. A generic assessment
            may be a starting point, but must be adapted to actual working conditions.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Control Measures Hierarchy</ContentEyebrow>

          <ConceptBlock title="Control Measures Hierarchy">
            <p>
            Control measures must be applied in order of preference. Higher-level controls are
            more effective as they address the hazard at source rather than relying on human
            behaviour or protective equipment.
            </p>

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Hierarchy of Control (Most to Least Effective)
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>1st</strong> — Control Type: <strong>Elimination</strong>. Building Services Examples: Use mechanical joints instead of soldering; prefabricate off-site</li>
            <li><strong>2nd</strong> — Control Type: <strong>Substitution</strong>. Building Services Examples: Water-based adhesives instead of solvent-based; lead-free solder</li>
            <li><strong>3rd</strong> — Control Type: <strong>Engineering controls</strong>. Building Services Examples: Local exhaust ventilation; enclosure; wet cutting to suppress dust</li>
            <li><strong>4th</strong> — Control Type: <strong>Administrative controls</strong>. Building Services Examples: Safe systems of work; job rotation; warning signs; training</li>
            <li><strong>5th</strong> — Control Type: <strong>PPE (last resort)</strong>. Building Services Examples: Respirators; gloves; goggles; protective clothing</li>
            </ul>
            
            

            
            <div>
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Engineering Control Examples
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>LEV:</strong> Fume extraction for soldering
            </li>
            <li>
            <strong>Enclosure:</strong> Dust extraction at cutting point
            </li>
            <li>
            <strong>Isolation:</strong> Separate storage for chemicals
            </li>
            <li>
            <strong>Dilution ventilation:</strong> General air exchange
            </li>
            </ul>
            </div>
            <div>
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            PPE Selection Factors
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Suitable for the hazard (check protection factor)</li>
            <li>Correctly fitted (face-fit testing for RPE)</li>
            <li>Compatible with other PPE</li>
            <li>Properly maintained and stored</li>
            </ul>
            </div>
            

            <CommonMistake
            title="strongPPE Limitation:/strong PPE only protects the individual wearing it and only when worn correctly. It can fail, be uncomfortable, and requires training, maintenance and supervision. Always exhaust higher-level controls first."
            whatHappens={<><p>See guidance.</p></>}
            doInstead={<>Follow the safe-system procedure: stop work, escalate, document, and only resume once controls are verified.</>}
            />
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Building Services Hazards and Safety Data Sheets</ContentEyebrow>

          <ConceptBlock title="Building Services Hazards and Safety Data Sheets">
            <p>
            Building services engineers encounter numerous hazardous substances. Understanding
            Safety Data Sheets (SDS) and GHS/CLP labelling is essential for safe working.
            </p>

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Common Building Services Hazardous Substances
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong><strong>Refrigerants</strong></strong> — Hazards: Asphyxiation, frostbite, cardiac sensitisation. Control Measures: Ventilation, leak detection, F-gas certification</li>
            <li><strong><strong>Soldering flux</strong></strong> — Hazards: Respiratory sensitisation, occupational asthma. Control Measures: LEV fume extraction, use less hazardous flux</li>
            <li><strong><strong>Solvents</strong></strong> — Hazards: Narcosis, dermatitis, organ damage. Control Measures: Ventilation, gloves, substitute with water-based</li>
            <li><strong><strong>Silica dust</strong></strong> — Hazards: Silicosis, lung cancer (RCS). Control Measures: Wet cutting, on-tool extraction, RPE</li>
            <li><strong><strong>Cable lubricants</strong></strong> — Hazards: Skin irritation, sensitisation. Control Measures: Gloves, barrier cream, wash facilities</li>
            <li><strong><strong>Fibrous insulation</strong></strong> — Hazards: Skin, eye and respiratory irritation. Control Measures: Coveralls, gloves, goggles, dust mask</li>
            </ul>
            
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Safety Data Sheet (SDS) - 16 Sections
            </p>
            <div className="grid sm:grid-cols-2 gap-2 text-sm">
            <div className="p-2 rounded bg-white/5">1. Identification</div>
            <div className="p-2 rounded bg-white/5">2. Hazard identification</div>
            <div className="p-2 rounded bg-white/5">3. Composition/ingredients</div>
            <div className="p-2 rounded bg-white/5">4. First-aid measures</div>
            <div className="p-2 rounded bg-white/5">5. Fire-fighting measures</div>
            <div className="p-2 rounded bg-white/5">6. Accidental release</div>
            <div className="p-2 rounded bg-white/5">7. Handling and storage</div>
            <div className="p-2 rounded bg-elec-yellow/20 border border-elec-yellow/30">
            8. Exposure controls/PPE
            </div>
            <div className="p-2 rounded bg-white/5">9. Physical/chemical properties</div>
            <div className="p-2 rounded bg-white/5">10. Stability and reactivity</div>
            <div className="p-2 rounded bg-white/5">11. Toxicological information</div>
            <div className="p-2 rounded bg-white/5">12. Ecological information</div>
            <div className="p-2 rounded bg-white/5">13. Disposal considerations</div>
            <div className="p-2 rounded bg-white/5">14. Transport information</div>
            <div className="p-2 rounded bg-white/5">15. Regulatory information</div>
            <div className="p-2 rounded bg-white/5">16. Other information</div>
            </div>
            <p className="text-xs text-white mt-2">
            Section 8 (highlighted) is particularly important for COSHH assessments.
            </p>
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            GHS/CLP Hazard Pictograms
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-3 gap-3 text-center text-xs">
            
            <p className="font-bold text-white mb-1">Flame</p>
            <p className="text-white">Flammable substances</p>
            
            
            <p className="font-bold text-white mb-1">Skull &amp; Crossbones</p>
            <p className="text-white">Acute toxicity (severe)</p>
            
            
            <p className="font-bold text-white mb-1">Exclamation Mark</p>
            <p className="text-white">Irritant, harmful</p>
            
            
            <p className="font-bold text-white mb-1">Corrosion</p>
            <p className="text-white">Corrosive to skin/metals</p>
            
            
            <p className="font-bold text-white mb-1">Health Hazard</p>
            <p className="text-white">CMR, sensitiser, STOT</p>
            
            
            <p className="font-bold text-white mb-1">Environment</p>
            <p className="text-white">Aquatic toxicity</p>
            
            
            <p className="font-bold text-white mb-1">Gas Cylinder</p>
            <p className="text-white">Gases under pressure</p>
            
            
            <p className="font-bold text-white mb-1">Oxidiser</p>
            <p className="text-white">May cause fire</p>
            
            
            <p className="font-bold text-white mb-1">Explosive</p>
            <p className="text-white">Explosion hazard</p>
            
            </div>
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">CLP Signal Words</p>
            
            <div className="p-3 rounded bg-red-500/10 border border-red-500/30">
            <p className="font-medium text-red-300 mb-1">DANGER</p>
            <p className="text-sm text-white">More severe hazard categories</p>
            </div>
            <div className="p-3 rounded bg-orange-500/10 border border-orange-500/30">
            <p className="font-medium text-orange-300 mb-1">WARNING</p>
            <p className="text-sm text-white">Less severe hazard categories</p>
            </div>
            
            

            <p className="text-sm text-elec-yellow/70">
            <strong>Key point:</strong> Never use unlabelled containers. If you find one, do not
            attempt to identify contents - report to supervisor for proper identification and
            disposal.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Health Surveillance Requirements">
            <p>
            Health surveillance is required when there is a reasonable likelihood that an
            identifiable disease or adverse health effect may result from workplace exposure to
            hazardous substances, and valid techniques exist to detect the condition.
            </p>

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            When Health Surveillance is Required
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            Exposure to substances causing occupational asthma (e.g., rosin-based flux)
            </li>
            <li>
            Work with substances assigned 'Sk' or 'Sen' notations in EH40
            </li>
            <li>Exposure to substances causing dermatitis</li>
            <li>Exposure to certain carcinogens and mutagens</li>
            <li>When specified in other regulations (e.g., lead, asbestos)</li>
            </ul>
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Types of Health Surveillance
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>Biological monitoring</strong> — Description: Measurement of substances/metabolites in body. Examples: Blood lead levels, urinary mercury</li>
            <li><strong>Biological effect monitoring</strong> — Description: Measurement of early biological changes. Examples: Lung function tests (spirometry)</li>
            <li><strong>Medical examination</strong> — Description: Clinical examination by doctor. Examples: Skin examination for dermatitis</li>
            <li><strong>Health questionnaire</strong> — Description: Regular symptom enquiries. Examples: Respiratory symptom questionnaire</li>
            </ul>
            
            

            <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
            <p className="text-sm text-blue-300">
            <strong>Record retention:</strong> Health surveillance records must be kept for at
            least 40 years from the date of the last entry. This is because some occupational
            diseases, such as mesothelioma from asbestos exposure, can take decades to develop.
            </p>
            </div>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Practical Guidance">
            <div>
            <p><strong>Key COSHH Duties</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Assessment:</strong> Carry out suitable and sufficient risk assessment
            </li>
            <li>
            <strong>Prevention/Control:</strong> Prevent exposure or adequately control it
            </li>
            <li>
            <strong>Use of controls:</strong> Ensure control measures are used and maintained
            </li>
            <li>
            <strong>Monitoring:</strong> Monitor exposure where required
            </li>
            <li>
            <strong>Surveillance:</strong> Provide health surveillance where appropriate
            </li>
            <li>
            <strong>Information:</strong> Provide information, instruction and training
            </li>
            </ul>
            </div>

            <div>
            <p><strong>Emergency Procedures</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Know location of emergency equipment (eyewash, spill kits)</li>
            <li>Understand evacuation procedures for gas leaks</li>
            <li>Know first aid procedures for chemical exposure</li>
            <li>Report all spills, leaks and exposure incidents</li>
            </ul>
            </div>

            <div>
            <p><strong>Common Mistakes to Avoid</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Generic assessments:</strong> Must be specific to actual work conditions
            </li>
            <li>
            <strong>PPE first:</strong> Using PPE before considering elimination/substitution
            </li>
            <li>
            <strong>Ignoring by-products:</strong> Fumes from heating are still hazardous
            </li>
            <li>
            <strong>No review:</strong> Assessments must be kept up to date
            </li>
            </ul>
            </div>
          </ConceptBlock>

          <SectionRule />

          <Scenario
            title="Lead-acid UPS battery replacement in a basement plant room"
            situation={
              <>
                You are supervising replacement of a 480 V lead-acid VRLA battery bank in a
                ventilated basement UPS room. The plant room ventilation has degraded and
                hydrogen accumulation is a risk during equalising charge.
              </>
            }
            whatToDo={
              <>
                Produce a COSHH assessment that names sulphuric acid (skin/eye burn), hydrogen
                (flammable, explosive) and the dust hazard. Apply the hierarchy: substitute to
                sealed VRLA over flooded where the spec allows; engineer the ventilation back to
                BS EN 50272-2 (5 air changes per hour minimum near a vented battery); administer
                a permit-to-work that prohibits sources of ignition and limits charge rate; PPE
                for handlers (face shield, acid-resistant gauntlets, apron). Health surveillance
                is needed for any operative with regular acid exposure.
              </>
            }
            whyItMatters={
              <>
                A hydrogen ignition event in a confined plant room is catastrophic. COSHH plus
                EAWR plus DSEAR all overlap here, and an HSE inspector will examine all three
                regimes after any incident.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'COSHH 2002 covers any substance hazardous to health except asbestos (CAR 2012), lead (CLAW 2002) and ionising radiation (IRR 2017).',
              'Reg 6 mandates a suitable and sufficient assessment before work starts — generic SDS is not an assessment.',
              'Reg 7 prevention-first: eliminate, substitute, engineer, administer, PPE — in that order.',
              'WELs (Workplace Exposure Limits) in EH40 are legal ceilings; below them, you still need to apply the hierarchy.',
              'Reg 9 requires control measures to be maintained, examined and tested — LEV thorough examination at least every 14 months.',
              'Reg 10 health surveillance is triggered for substances with a defined health effect (lead, isocyanates, etc).',
              'Reg 12 information, instruction and training is mandatory and must be records-evidenced.',
              'On building services projects the recurring COSHH items are solvents, fluxes, sealants, refrigerants, battery electrolyte, silica dust and (in older buildings) asbestos and lead paint.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('../h-n-c-module1-section1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back to section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Section 1
              </div>
            </button>
            <button
              onClick={() => navigate('../h-n-c-module1-section1-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Section
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule1Section1_4;
