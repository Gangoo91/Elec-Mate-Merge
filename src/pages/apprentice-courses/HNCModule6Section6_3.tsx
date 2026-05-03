/**
 * Module 6 · Section 6 · Subsection 3 — Integrated Design Process
 * HNC Electrical Engineering for Building Services (Sustainability and Environmental Engineering)
 *   Multi-disciplinary collaboration, early engagement, design workshops, BIM coordination, and value engineering for sustainable outcomes
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  CommonMistake,
  ConceptBlock,
  FAQ,
  KeyTakeaways,
  LearningOutcomes,
  RegsCallout,
  Scenario,
  SectionRule,
  TLDR,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Integrated Design Process - HNC Module 6 Section 6.3';
const DESCRIPTION =
  'Master integrated design processes for sustainable building services: multi-disciplinary collaboration, early MEP engagement, design workshops, BIM coordination, RIBA stages, value engineering, soft landings, and POE preparation.';

const quickCheckQuestions = [
  {
    id: 'idp-definition',
    question: 'What is the primary characteristic of an integrated design process?',
    options: [
      'Sequential handoffs between disciplines',
      'Multi-disciplinary collaboration from project inception',
      'Design led by a single discipline',
      'Minimal stakeholder involvement until construction',
    ],
    correctIndex: 1,
    explanation:
      'An integrated design process (IDP) brings together all relevant disciplines from the earliest project stages to collaborate on design solutions, ensuring sustainability objectives are embedded throughout rather than added retrospectively.',
  },
  {
    id: 'early-engagement',
    question: 'Why is early MEP engagement critical for sustainable building design?',
    options: [
      'It reduces consultant fees',
      'It allows mechanical systems to be oversized',
      'It enables passive design strategies to be maximised before active systems are specified',
      'It speeds up the planning approval process',
    ],
    correctIndex: 2,
    explanation:
      'Early MEP engagement allows engineers to influence building form, orientation, and fabric design to maximise passive strategies (natural ventilation, daylighting, thermal mass), reducing reliance on active mechanical and electrical systems.',
  },
  {
    id: 'value-engineering',
    question: 'How should value engineering be applied without compromising sustainability?',
    options: [
      'Focus solely on capital cost reduction',
      'Consider whole-life cost and performance outcomes',
      'Remove all renewable energy systems',
      'Standardise all specifications to lowest cost',
    ],
    correctIndex: 1,
    explanation:
      'True value engineering optimises whole-life value, considering operational costs, maintenance, replacement cycles, and sustainability outcomes alongside capital expenditure. Short-term cost cuts often increase long-term costs and carbon.',
  },
  {
    id: 'soft-landings',
    question: 'What is the purpose of a soft landings approach?',
    options: [
      'To reduce construction defects',
      'To ensure smooth transition to operation and achieve design performance',
      'To accelerate project handover',
      'To minimise commissioning requirements',
    ],
    correctIndex: 1,
    explanation:
      'Soft landings ensures buildings perform as designed in operation by maintaining design team involvement through commissioning, handover, and early occupation, addressing the performance gap between design intent and actual outcomes.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'At which RIBA stage should sustainability targets and strategies be established?',
    options: [
      'Stage 0 Strategic Definition',
      'Stage 2 Concept Design',
      'Stage 4 Technical Design',
      'Stage 5 Construction',
    ],
    correctAnswer: 0,
    explanation:
      'Sustainability targets should be established at Stage 0 Strategic Definition when the project brief is being developed. This ensures sustainability is embedded from inception rather than retrofitted later.',
  },
  {
    id: 2,
    question: 'What is the primary benefit of design charrettes for sustainable building projects?',
    options: [
      'They reduce design fees',
      "They compress multiple disciplines' input into intensive collaborative sessions",
      'They eliminate the need for BIM',
      'They replace formal design reviews',
    ],
    correctAnswer: 1,
    explanation:
      'Design charrettes bring together all stakeholders for intensive, focused workshops where integrated solutions can be developed collaboratively, identifying synergies and conflicts early when changes are easiest to implement.',
  },
  {
    id: 3,
    question: "In BIM Level 2 projects, what does the term 'clash detection' primarily refer to?",
    options: [
      'Identifying conflicts between team members',
      'Finding geometric conflicts between building elements and services',
      'Detecting errors in cost estimates',
      'Checking programme conflicts',
    ],
    correctAnswer: 1,
    explanation:
      'Clash detection uses BIM software to identify geometric conflicts between building elements (structure, services, architecture) before construction, preventing costly on-site changes and enabling more efficient coordination.',
  },
  {
    id: 4,
    question: "What is the 'performance gap' in sustainable building design?",
    options: [
      'The difference between design fees and actual costs',
      'The gap between predicted and actual energy performance in operation',
      'The time delay between design and construction',
      'The difference between architect and engineer specifications',
    ],
    correctAnswer: 1,
    explanation:
      'The performance gap refers to the common finding that buildings use significantly more energy in operation than predicted during design. This can be 2-10 times higher, undermining sustainability targets.',
  },
  {
    id: 5,
    question: 'Which of these is NOT a typical activity in RIBA Stage 1 Preparation and Briefing?',
    options: [
      'Establishing sustainability aspirations',
      'Developing the project brief',
      'Completing detailed M&E specifications',
      'Undertaking site appraisals',
    ],
    correctAnswer: 2,
    explanation:
      'Detailed M&E specifications are developed in Stage 4 Technical Design. Stage 1 focuses on strategic planning including sustainability aspirations, brief development, feasibility, and site assessment.',
  },
  {
    id: 6,
    question: 'What role does Post-Occupancy Evaluation (POE) play in sustainable design?',
    options: [
      'It is only required for BREEAM Outstanding projects',
      'It provides feedback to improve future designs and identify performance issues',
      'It replaces building handover documentation',
      'It is completed before practical completion',
    ],
    correctAnswer: 1,
    explanation:
      "POE systematically evaluates building performance after occupation, providing valuable feedback for the design team to understand what worked, what didn't, and how to improve future projects.",
  },
  {
    id: 7,
    question: 'During value engineering, which approach best maintains sustainability performance?',
    options: [
      'Removing renewable energy systems to reduce capital cost',
      'Substituting specified materials with cheaper alternatives',
      'Challenging design decisions while protecting defined sustainability outcomes',
      'Reducing insulation thickness to save on materials',
    ],
    correctAnswer: 2,
    explanation:
      'Effective value engineering challenges assumptions and seeks alternatives while protecting agreed sustainability outcomes. Performance specifications should be maintained even if delivery methods change.',
  },
  {
    id: 8,
    question: 'What is the purpose of the Government Soft Landings (GSL) Gateway 2?',
    options: [
      'To confirm practical completion',
      'To review design proposals against sustainability targets',
      'To approve the construction budget',
      'To sign off commissioning results',
    ],
    correctAnswer: 1,
    explanation:
      'GSL Gateway 2 occurs during design development and reviews how design proposals address sustainability, functionality, and operational requirements established in the brief.',
  },
  {
    id: 9,
    question:
      'In an integrated design team, who typically leads coordination of sustainability targets?',
    options: [
      'The contractor',
      'The quantity surveyor',
      'A dedicated sustainability consultant or the lead designer',
      'The building control officer',
    ],
    correctAnswer: 2,
    explanation:
      "A sustainability consultant or the lead designer typically coordinates sustainability targets across disciplines, ensuring all team members work towards common goals and that no discipline's decisions undermine overall objectives.",
  },
  {
    id: 10,
    question: "What is 'design freeze' and why is it important for sustainability?",
    options: [
      'When heating systems are tested in winter',
      'A defined point when changes become significantly more costly',
      'When refrigeration systems are commissioned',
      'A pause in design work for holidays',
    ],
    correctAnswer: 1,
    explanation:
      'Design freeze is a defined project milestone after which changes become increasingly expensive and disruptive. For sustainability, key decisions must be locked in before freeze to avoid late compromises.',
  },
  {
    id: 11,
    question: 'How does the circular economy principle influence integrated design?',
    options: [
      'It requires all buildings to be circular in plan',
      'It encourages design for disassembly, material reuse, and waste minimisation',
      'It mandates the use of recycled materials only',
      'It applies only to waste management during construction',
    ],
    correctAnswer: 1,
    explanation:
      'Circular economy principles encourage designing buildings for future adaptation, disassembly, and material recovery, considering end-of-life from the start and minimising waste throughout the lifecycle.',
  },
  {
    id: 12,
    question: 'What is the key difference between a design workshop and a design review?',
    options: [
      'Workshops are longer than reviews',
      'Workshops generate solutions collaboratively; reviews assess existing proposals',
      'Reviews involve more stakeholders',
      'Workshops only occur at project start',
    ],
    correctAnswer: 1,
    explanation:
      'Design workshops are creative, collaborative sessions where multi-disciplinary teams develop solutions together. Design reviews are structured assessments of existing proposals against defined criteria.',
  },
];

const faqs = [
  {
    question: 'How do I convince clients to invest in early design collaboration?',
    answer:
      'Present evidence of cost savings from avoided changes, improved building performance, and reduced risk. Studies show that every £1 spent on early integrated design can save £10-20 in construction changes. Early collaboration also reduces programme risk, improves predictability, and delivers better-performing buildings that enhance reputation and asset value.',
  },
  {
    question: 'What if disciplines join the project at different times?',
    answer:
      'Capture key decisions and their rationale in the project information model so late-joining disciplines understand the context. Use onboarding workshops to bring new team members up to speed quickly. Where possible, advocate for earlier engagement in the procurement strategy, particularly for MEP consultants whose input significantly affects building form and performance.',
  },
  {
    question: 'How do I handle conflicts between disciplines during design workshops?',
    answer:
      'Focus discussions on project outcomes and performance criteria rather than individual preferences. Use objective metrics (energy, carbon, cost, programme) to evaluate options. Where trade-offs are necessary, document the decision rationale and ensure the client understands implications. A skilled facilitator can help navigate conflicts productively.',
  },
  {
    question: 'When does value engineering become value destruction?',
    answer:
      'Value engineering crosses into value destruction when it compromises defined performance outcomes, shifts costs from capital to operational budgets without acknowledging this, creates maintenance or replacement problems, or undermines sustainability targets. Always test proposals against whole-life cost and the original project objectives, not just capital cost reduction.',
  },
  {
    question: 'How long should soft landings continue after handover?',
    answer:
      'Government Soft Landings recommends a minimum of three years post-completion involvement, with intensive support in Year 1 (monthly reviews), reducing in Year 2 (quarterly), and annual review in Year 3. This duration allows seasonal performance assessment and addresses emerging issues as occupants learn to use the building.',
  },
  {
    question: 'What happens if POE reveals significant performance gaps?',
    answer:
      'POE findings should trigger systematic investigation of causes (design assumptions, installation quality, controls setup, occupant behaviour). Develop remediation plans prioritising highest-impact issues. Use findings to improve design standards, specifications, and processes for future projects. Serious gaps may require contractual discussions if they relate to non-compliance with performance specifications.',
  },
];

const HNCModule6Section6_3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section6")}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 6 · Section 6 · Subsection 3"
            title="Integrated Design Process"
            description="Multi-disciplinary collaboration, early engagement, design workshops, BIM coordination, and value engineering for sustainable outcomes"
            tone="purple"
          />

          <TLDR
            points={[
              "Integrated Design Process (IDP) brings architect, M&E, structural, sustainability, cost, FM and end-user together from Stage 0 — replacing sequential hand-offs with iterative collaboration around shared performance targets.",
              "BIM (ISO 19650) is the technical enabler — shared federated model, common data environment, defined Levels of Information Need at each project stage.",
              "Soft Landings (BSRIA BG 54) extends integration through handover into a 12-month aftercare period — closing the design-vs-actual performance gap.",
            ]}
          />

          <RegsCallout
            source="ISO 19650 (BIM Information Management) + BSRIA BG 54 Soft Landings Framework"
            clause="Information management shall be carried out in accordance with the BS EN ISO 19650 series. The Appointing Party shall establish project information requirements, define the level of information need at each project stage, and require the information delivery in a common data environment. The Soft Landings Framework recommends early engagement of operators and users from RIBA Stage 0, alignment of design with operational requirements, and structured aftercare for 1–3 years post-handover."
            meaning={
              <>
                ISO 19650 is the BIM information management standard — replacing PAS 1192. The CDE (Common Data Environment) is mandatory. BSRIA Soft Landings is the operational complement — ensuring the building delivered actually performs as designed. Both are increasingly contractual on major UK projects.
              </>
            }
            cite="Source: BS EN ISO 19650-1:2018 + 19650-2:2018 — bsigroup.com; BSRIA BG 54 Soft Landings Framework (2018) — bsria.com"
          />

          <LearningOutcomes
            outcomes={[
              "Apply integrated design principles to sustainable building projects",
              "Facilitate effective design workshops and charrettes",
              "Coordinate MEP design using BIM for clash detection and optimisation",
              "Align sustainability activities with RIBA Plan of Work stages",
              "Conduct value engineering without compromising sustainability",
              "Implement soft landings and prepare for post-occupancy evaluation",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Integrated Design Process Fundamentals">
            <p>The integrated design process (IDP) fundamentally differs from traditional linear design approaches. Rather than passing design between disciplines in sequence, IDP brings together all stakeholders from project inception to collaborate on holistic solutions that embed sustainability throughout.</p>
            <p><strong>Key principles of integrated design:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Early collaboration:</strong> All disciplines engaged from Stage 0-1, not just architect-led</li>
              <li><strong>Whole-systems thinking:</strong> Consider interactions between building elements, not isolated systems</li>
              <li><strong>Performance-based targets:</strong> Define outcomes (energy, carbon, comfort) not just specifications</li>
              <li><strong>Iterative optimisation:</strong> Test and refine solutions through analysis and feedback loops</li>
            </ul>
            <p><strong>Traditional vs Integrated Approach</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>MEP involvement:</strong> Stage 2-3 onwards — Stage 0-1 from inception</li>
              <li><strong>Design approach:</strong> Sequential, discipline-by-discipline — Concurrent, multi-disciplinary</li>
              <li><strong>Sustainability:</strong> Added to meet requirements — Embedded from project start</li>
              <li><strong>Passive strategies:</strong> Limited by fixed architecture — Maximised through early input</li>
              <li><strong>Cost of changes:</strong> High - late discovery — Low - early resolution</li>
            </ul>
            <p><strong>The MacLeamy Curve</strong></p>
            <p>The MacLeamy curve demonstrates that design effort applied early has the greatest impact on project outcomes at the lowest cost. Moving effort forward (left on the curve) increases ability to influence cost and performance while reducing the cost of changes. Integrated design deliberately front-loads collaboration when influence is highest.</p>
            <p><strong>Key insight:</strong> Early engagement is not just about starting sooner - it's about ensuring MEP input shapes fundamental decisions about building form, orientation, and fabric.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Design Workshops and BIM Coordination">
            <p>Effective integrated design requires structured opportunities for collaboration. Design workshops, charrettes, and BIM coordination meetings provide forums for multi-disciplinary problem-solving and conflict resolution.</p>
            <p><strong>Design Charrettes</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Intensive 1-3 day workshops</li>
              <li>All key stakeholders present</li>
              <li>Rapid iteration of concepts</li>
              <li>Real-time problem solving</li>
              <li>Consensus building on direction</li>
            </ul>
            <p><strong>Technical Workshops</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Focused on specific systems</li>
              <li>Detailed coordination issues</li>
              <li>Interface resolution</li>
              <li>Performance optimisation</li>
              <li>Specification development</li>
            </ul>
            <p><strong>BIM Coordination for Sustainability</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Clash detection:</strong> Optimise services routing, reduce materials — Navisworks, Solibri</li>
              <li><strong>Energy analysis:</strong> Test design options against energy targets — IES VE, DesignBuilder</li>
              <li><strong>Daylight simulation:</strong> Optimise glazing and artificial lighting — Radiance, DIVA, Sefaira</li>
              <li><strong>Quantity take-off:</strong> Calculate embodied carbon from materials — One Click LCA, eToolLCD</li>
              <li><strong>4D simulation:</strong> Plan logistics to reduce site transport — Synchro, Navisworks</li>
            </ul>
            <p><strong>Workshop Best Practice</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Prepare:</strong> Circulate agenda, background information, and specific questions in advance</li>
              <li><strong>Facilitate:</strong> Use an independent facilitator for complex or contentious issues</li>
              <li><strong>Visualise:</strong> Use models, drawings, and simulations to support discussion</li>
              <li><strong>Record:</strong> Document decisions, actions, and rationale immediately</li>
              <li><strong>Follow up:</strong> Distribute minutes within 48 hours, track action completion</li>
            </ul>
            <p><strong>Coordination tip:</strong> Schedule regular BIM coordination meetings (fortnightly minimum) throughout design development to catch clashes early and maintain design alignment.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="RIBA Stages and Value Engineering">
            <p>The RIBA Plan of Work provides a framework for design development. Aligning sustainability activities with RIBA stages ensures targets are set early, tested through design development, and verified in construction and operation.</p>
            <p><strong>Sustainability Activities by RIBA Stage</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>0 Strategic Definition:</strong> Set sustainability aspirations, identify targets (BREEAM, net zero, etc.)</li>
              <li><strong>1 Preparation & Brief:</strong> Develop sustainability brief, site analysis, establish energy strategy</li>
              <li><strong>2 Concept Design:</strong> Passive design options, initial energy modelling, BREEAM pre-assessment</li>
              <li><strong>3 Spatial Coordination:</strong> Detailed energy modelling, services coordination, embodied carbon assessment</li>
              <li><strong>4 Technical Design:</strong> Specification completion, compliance calculations, commissioning plan</li>
              <li><strong>5 Manufacturing & Construction:</strong> Site waste management, sustainable procurement, commissioning</li>
              <li><strong>6 Handover:</strong> Building log book, training, metering setup, BREEAM certification</li>
              <li><strong>7 Use:</strong> POE, seasonal commissioning, performance monitoring, aftercare</li>
            </ul>
            <p><strong>Value Engineering: Right Approach</strong></p>
            <p>Value engineering should optimise whole-life value, not simply reduce capital cost. Effective VE maintains performance outcomes while finding more efficient solutions.</p>
            <p>Good VE Practice:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Challenge assumptions, not outcomes</li>
              <li>Consider whole-life cost</li>
              <li>Protect defined performance targets</li>
              <li>Seek alternative delivery methods</li>
              <li>Document trade-off rationale</li>
            </ul>
            <p>Poor VE Practice:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Focus only on capital reduction</li>
              <li>Remove renewable systems</li>
              <li>Reduce insulation below target</li>
              <li>Delete commissioning scope</li>
              <li>Substitute without analysis</li>
            </ul>
            <p><strong>Design freeze considerations:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Stage 3 freeze:</strong> Lock building form, orientation, fabric performance, major systems strategy</li>
              <li><strong>Stage 4 freeze:</strong> Lock specifications, product selections, detailed performance criteria</li>
              <li><strong>Post-freeze changes:</strong> Require formal change control with impact assessment on sustainability targets</li>
            </ul>
            <p><strong>VE principle:</strong> If a VE proposal cannot demonstrate neutral or positive whole-life value impact, it is cost-cutting, not value engineering.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Soft Landings and Post-Occupancy Evaluation">
            <p>The soft landings approach addresses the common problem of buildings failing to perform as designed in operation. By maintaining design team involvement through handover and early occupation, soft landings bridges the gap between design intent and operational reality.</p>
            <p><strong>Government Soft Landings (GSL) Framework</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Briefing:</strong> Gateway 1 — Define operational requirements, success criteria</li>
              <li><strong>Design:</strong> Gateway 2 — Review design against operational needs</li>
              <li><strong>Construction:</strong> Gateway 3 — Commissioning planning, reality checking</li>
              <li><strong>Handover:</strong> Gateway 4 — Training, documentation, initial occupation support</li>
              <li><strong>In-use:</strong> Gateway 5 — POE, seasonal commissioning, performance review</li>
            </ul>
            <p><strong>Extended Aftercare Timeline</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Month 1-3:</strong> Intensive support, weekly reviews</li>
              <li><strong>Month 4-12:</strong> Monthly reviews, seasonal commissioning</li>
              <li><strong>Year 2:</strong> Quarterly reviews, performance fine-tuning</li>
              <li><strong>Year 3:</strong> Annual review, lessons learned report</li>
            </ul>
            <p><strong>POE Components</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Energy performance:</strong> Actual vs predicted consumption</li>
              <li><strong>Occupant satisfaction:</strong> Comfort, functionality surveys</li>
              <li><strong>Systems performance:</strong> Commissioning verification</li>
              <li><strong>Maintenance review:</strong> Issues log, remediation tracking</li>
            </ul>
            <p><strong>Addressing the Performance Gap</strong></p>
            <p>The performance gap - where buildings use 2-10 times more energy than predicted - has multiple causes that soft landings helps address:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Design assumptions:</strong> Unrealistic occupancy, equipment loads, operating hours</li>
              <li><strong>Installation quality:</strong> Air leakage, thermal bridging, controls errors</li>
              <li><strong>Commissioning gaps:</strong> Incomplete testing, suboptimal settings</li>
              <li><strong>Occupant behaviour:</strong> Opening windows with heating on, lights left on</li>
              <li><strong>FM capability:</strong> Complex systems not understood or maintained</li>
            </ul>
            <p><strong>POE preparation checklist:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Install sub-metering for all major energy uses (lighting, HVAC, small power, lifts)</li>
              <li>Establish BMS data logging with appropriate trending intervals</li>
              <li>Create baseline predictions for comparison (monthly profiles)</li>
              <li>Develop occupant survey methodology and schedule</li>
              <li>Define performance thresholds and escalation procedures</li>
              <li>Allocate budget and responsibility for POE activities</li>
            </ul>
            <p><strong>Reality check:</strong> Buildings are used by people, maintained by FM teams, and operate in real weather - not the idealised conditions of design models. Soft landings acknowledges this gap and actively manages it.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Early MEP Engagement Influence</strong>
            </p>
            <p><strong>Scenario:</strong> A commercial office project where MEP was engaged at Stage 1 vs a similar project where engagement was delayed to Stage 3.</p>
            <p>Project A: Early MEP Engagement (Stage 1)</p>
            <p>MEP Input on Building Form:</p>
            <p>- Optimised orientation for solar gain control</p>
            <p>- Floor-to-ceiling heights allow natural ventilation</p>
            <p>- Core position enables efficient services distribution</p>
            <p>- Facade design supports mixed-mode operation</p>
            <p>Result: Mixed-mode HVAC, 40% reduction in cooling load</p>
            <p>Project B: Late MEP Engagement (Stage 3)</p>
            <p>MEP Response to Fixed Design:</p>
            <p>- Deep plan requires full mechanical ventilation</p>
            <p>- Low floor-to-floor constrains ductwork routing</p>
            <p>- Glazed facade requires extensive solar control</p>
            <p>- Core position creates long distribution runs</p>
            <p>Result: Full mechanical HVAC, energy target missed by 35%</p>
            <p>
              <strong>Example 2: Value Engineering Assessment</strong>
            </p>
            <p><strong>Scenario:</strong> Evaluate a VE proposal to substitute specified LED luminaires with a cheaper alternative.</p>
            <p>VE Proposal Assessment Framework:</p>
            <p>Specified luminaire: £180/unit, 95 lm/W, 50,000hr life, 5yr warranty</p>
            <p>VE alternative: £120/unit, 85 lm/W, 30,000hr life, 2yr warranty</p>
            <p>Capital saving: 500 fittings × £60 = £30,000</p>
            <p>Whole-life impact (25 year):</p>
            <p>Additional energy: 10% higher = £45,000</p>
            <p>Additional replacements: 2× more = £60,000</p>
            <p>Additional labour: £15,000</p>
            <p>Carbon impact: +12 tonnes CO2</p>
            <p>Net whole-life cost: +£90,000 vs specified</p>
            <p>Recommendation: REJECT - not value engineering, cost-cutting</p>
            <p>
              <strong>Example 3: POE Performance Gap Analysis</strong>
            </p>
            <p><strong>Scenario:</strong> Analyse first-year energy data from a new office building against design predictions.</p>
            <p>Annual Energy Comparison:</p>
            <p>| End Use | Predicted | Actual | Gap |</p>
            <p>|--------------|-----------|---------|--------|</p>
            <p>| Heating | 25 kWh/m² | 18 kWh/m²| -28% |</p>
            <p>| Cooling | 30 kWh/m² | 52 kWh/m²| +73% |</p>
            <p>| Lighting | 20 kWh/m² | 35 kWh/m²| +75% |</p>
            <p>| Small power | 35 kWh/m² | 48 kWh/m²| +37% |</p>
            <p>| TOTAL |110 kWh/m² |153 kWh/m²| +39% |</p>
            <p>Investigation findings:</p>
            <p>Cooling: BMS setpoints 2°C lower than design, economiser disabled</p>
            <p>Lighting: Daylight dimming not commissioned, occupancy sensors bypassed</p>
            <p>Small power: 30% more equipment than design assumption</p>
            <p>Actions: Seasonal commissioning + training = 25% reduction expected</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Integrated Design Process Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Engage MEP consultant at Stage 0-1, not Stage 2-3</li>
              <li>Establish sustainability targets before design begins</li>
              <li>Schedule regular multi-disciplinary design workshops</li>
              <li>Use BIM for coordination and performance analysis</li>
              <li>Test design options against performance criteria iteratively</li>
              <li>Include FM input in design development</li>
            </ul>
            <p>
              <strong>Key Stages for MEP Sustainability Input:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Stage 0: Sustainability targets, energy strategy direction</li>
              <li>Stage 1: Site analysis, passive design potential, system concepts</li>
              <li>Stage 2: Detailed energy modelling, system selection, renewables sizing</li>
              <li>Stage 3: Services coordination, controls strategy, metering specification</li>
            </ul>
            <p>
              <strong>Common Integration Failures:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Late MEP appointment:</strong> Building form fixed before services input</li>
              <li><strong>Siloed design:</strong> Each discipline optimises independently</li>
              <li><strong>Paper coordination:</strong> No proper BIM clash detection</li>
              <li><strong>VE as cost-cutting:</strong> Sustainability features removed to save capital</li>
            </ul>
          </ConceptBlock>

          <Scenario
            title="BIM clash between MEP and structural at Stage 4 — programme impact"
            situation={
              <>
                A federated BIM model on a 12-storey hospital reaches Stage 4 (Technical Design). MEP has routed 1,200 mm twin-wall ductwork through what structural has now identified as a primary transfer beam zone. Resolution requires either MEP re-routing (4-week design + procurement re-issue) or structural re-design (6-week + Building Control re-submission).
              </>
            }
            whatToDo={
              <>
                Convene a clash resolution meeting using the federated model — MEP, structural, architectural together. Most clashes have a coordination solution that is cheaper than either single-discipline rework: typically MEP routes around with shallower duct (parallel runs), structural penetrates with engineered openings, or architecture compromises ceiling void. Update the BIM model and re-run clash detection. Lesson: Stage 3 spatial coordination should have caught this — Stage 4 clashes are programme-critical.
              </>
            }
            whyItMatters={
              <>
                BIM clashes at Stage 4+ are the most expensive errors on a project — programme drives commercial loss. Investment in Stage 2/3 coordination (regular ICE — Integrated Concurrent Engineering — sessions, weekly federated model reviews) pays for itself many times over. The clash report is a project-management dashboard, not just a technical document.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "IDP = architect, M&E, structural, sustainability, cost, FM, user from Stage 0.",
              "ISO 19650 is the BIM information management standard.",
              "CDE (Common Data Environment) for federated model + project information.",
              "Levels of Information Need defined per stage.",
              "Soft Landings (BSRIA BG 54) extends integration through handover + 12-month aftercare.",
              "Stage 4 clashes are programme-critical — invest in Stage 2/3 coordination.",
              "Integrated Concurrent Engineering (ICE) sessions and regular federated reviews.",
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section6-2")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Fabric first approach
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section6-4")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Whole life carbon assessment
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule6Section6_3;
