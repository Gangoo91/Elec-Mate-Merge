/**
 * Module 4 · Section 6 · Subsection 6 — BIM and Digital Delivery
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   ISO 19650 information management framework, Level of Development (LOD 100-500), COBie
 *   structured FM data exchange, Common Data Environment information states (WIP / Shared
 *   / Published / Archived) and digital handover for asset operation. Final subsection of
 *   Module 4; cross-section forward to HNC Module 5.
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

const TITLE = 'BIM and Digital Delivery - HNC Module 4 Section 6.6';
const DESCRIPTION =
  'Master BIM and digital delivery for building services: Level of Development (LOD), COBie data exchange, common data environment, ISO 19650 and digital handover.';

const quickCheckQuestions = [
  {
    id: 'bim-definition',
    question: 'What does BIM stand for in construction?',
    options: [
      'Building Information Model',
      'Building Integrated Management',
      'Basic Installation Method',
      'Built Infrastructure Mapping',
    ],
    correctIndex: 0,
    explanation:
      'BIM stands for Building Information Modelling/Model - a digital representation of the physical and functional characteristics of a facility.',
  },
  {
    id: 'lod-meaning',
    question: 'What does LOD (Level of Development) define?',
    options: [
      'The cost of the model',
      'The completeness and reliability of model element information',
      'Only the visual detail',
      'The software version used',
    ],
    correctIndex: 1,
    explanation:
      'LOD defines how complete and reliable the information is for each model element at different project stages, from conceptual to as-built.',
  },
  {
    id: 'cobie-purpose',
    question: 'What is the purpose of COBie?',
    options: [
      '3D visualisation',
      'Structured data exchange for facility management',
      'Cost estimation',
      'Project scheduling',
    ],
    correctIndex: 1,
    explanation:
      'COBie (Construction Operations Building Information Exchange) provides a structured format for exchanging facility management data from design through to operation.',
  },
  {
    id: 'cde-function',
    question: 'What is a Common Data Environment (CDE)?',
    options: [
      'A CAD software package',
      'A shared digital space for project information management',
      'A physical document storage room',
      'A BIM model viewer',
    ],
    correctIndex: 1,
    explanation:
      'A CDE is a shared digital platform where all project information is stored, managed and exchanged according to defined processes and workflows.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Which international standard covers BIM information management?',
    options: ['BS 7671', 'ISO 19650', 'BS EN 61082', 'ISO 9001'],
    correctAnswer: 1,
    explanation:
      "ISO 19650 is the international standard for information management using BIM, replacing the UK's BS/PAS 1192 series.",
  },
  {
    id: 2,
    question: "What LOD level typically represents 'for construction' information?",
    options: ['LOD 100', 'LOD 200', 'LOD 350/400', 'LOD 500'],
    correctAnswer: 2,
    explanation:
      'LOD 350/400 represents detailed design for construction with accurate geometry, connections and specified products. LOD 500 is as-built verification.',
  },
  {
    id: 3,
    question: 'What information does COBie capture for electrical equipment?',
    options: [
      'Only the 3D geometry',
      'Equipment attributes, maintenance requirements, warranty information',
      'Just the specification clauses',
      'Only the manufacturer name',
    ],
    correctAnswer: 1,
    explanation:
      'COBie captures equipment attributes (ratings, model numbers), maintenance requirements, warranty information, location data and other operational information.',
  },
  {
    id: 4,
    question: "What is a 'federated model' in BIM?",
    options: [
      'A government-owned model',
      'Multiple discipline models combined for coordination',
      'A model stored on multiple servers',
      'An encrypted model',
    ],
    correctAnswer: 1,
    explanation:
      'A federated model combines separate discipline models (architectural, structural, MEP) to enable coordination, clash detection and overall project review.',
  },
  {
    id: 5,
    question: 'What software is commonly used for MEP BIM modelling?',
    options: ['Microsoft Word', 'Autodesk Revit MEP', 'Adobe Photoshop', 'Microsoft Excel'],
    correctAnswer: 1,
    explanation:
      'Autodesk Revit MEP is the most widely used BIM software for mechanical, electrical and plumbing design in the UK construction industry.',
  },
  {
    id: 6,
    question: 'What is the purpose of clash detection in BIM?',
    options: [
      'To check spelling errors',
      'To identify spatial conflicts between building elements before construction',
      'To verify electrical calculations',
      'To check colour schemes',
    ],
    correctAnswer: 1,
    explanation:
      'Clash detection identifies where building elements from different disciplines occupy the same space, allowing conflicts to be resolved before construction.',
  },
  {
    id: 7,
    question: "What does 'Work in Progress' (WIP) mean in CDE terminology?",
    options: [
      'Final approved information',
      'Information being developed, not ready for sharing',
      'Archived documents',
      'Published for construction',
    ],
    correctAnswer: 1,
    explanation:
      "WIP is information currently being developed that is not yet ready for sharing with other team members. It remains within the originator's control.",
  },
  {
    id: 8,
    question: 'What electrical data might be embedded in a BIM luminaire object?',
    options: [
      'Only the 3D shape',
      'Wattage, lumen output, IP rating, emergency duration, manufacturer data',
      'Just the price',
      'Only the colour',
    ],
    correctAnswer: 1,
    explanation:
      'BIM objects contain rich data: power rating, efficacy, lumen output, colour temperature, IP rating, emergency specifications, manufacturer product data and more.',
  },
  {
    id: 9,
    question: "What is an Employer's Information Requirements (EIR)?",
    options: [
      'A payroll document',
      "The client's BIM requirements for the project",
      'Staff qualifications',
      'Building regulations',
    ],
    correctAnswer: 1,
    explanation:
      "The EIR (now called Exchange Information Requirements in ISO 19650) defines the client's information requirements for the project including BIM deliverables.",
  },
  {
    id: 10,
    question: 'Why is digital handover important for building operations?',
    options: [
      'It looks impressive',
      'It provides structured data for facilities management systems',
      'It is only required for government projects',
      'It replaces the need for maintenance',
    ],
    correctAnswer: 1,
    explanation:
      'Digital handover provides structured, verified data that can be imported into FM systems, enabling efficient building operation and maintenance.',
  },
];

const faqs = [
  {
    question: 'Do all projects require BIM?',
    answer:
      'BIM is mandated for UK government projects over certain thresholds. Private sector adoption varies but is increasing. Even without formal BIM requirements, digital approaches offer benefits in coordination, error reduction and information management.',
  },
  {
    question: 'What skills do electrical engineers need for BIM?',
    answer:
      'Understanding of BIM software (typically Revit MEP), knowledge of LOD requirements, ability to produce and check COBie data, familiarity with CDE workflows, and understanding of how models integrate with traditional deliverables.',
  },
  {
    question: 'How does BIM affect traditional drawings and specifications?',
    answer:
      'BIM models can generate drawings and schedules automatically, reducing manual production. However, quality checking remains essential. Specifications may reference model-embedded data. The relationship between model and documents must be clearly defined.',
  },
  {
    question: 'What is a BIM Execution Plan (BEP)?',
    answer:
      'A BEP defines how BIM will be implemented on a project: software, standards, responsibilities, deliverables, coordination procedures, and quality management. It responds to the EIR/Exchange Information Requirements.',
  },
  {
    question: 'How is model accuracy verified for as-built?',
    answer:
      'As-built verification may include site surveys (laser scanning), checking model geometry against installed conditions, and verifying data attributes are correct. This ensures the digital twin accurately represents the physical building.',
  },
];

const HNCModule4Section6_6 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section6')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 4 · Section 6 · Subsection 6"
            title="BIM and Digital Delivery"
            description="Implementing Building Information Modelling for electrical building services design and handover."
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              'Understand BIM principles and ISO 19650 framework',
              'Apply Level of Development (LOD) requirements',
              'Produce COBie data for facility management',
              'Work within a Common Data Environment (CDE)',
              'Coordinate electrical design in federated models',
              'Deliver digital handover information',
            ]}
            initialVisibleCount={3}
          />

          <TLDR
            points={[
              'BIM is the federated information model — geometry, properties, relationships, time and cost — managed under ISO 19650 (the UK BIM Framework standard).',
              'LOD (Level of Development): LOD 100 concept → 200 generic → 300 specific → 350 with connections → 400 fabrication. Match LOD to project stage; over-modelling wastes budget.',
              'COBie (Construction Operations Building Information Exchange): the structured asset data spreadsheet that feeds the FM CAFM at handover. Build it progressively, never at the last minute.',
              'CDE (Common Data Environment): the single project information source. Status (WIP, Shared, Published, Archived) governs review and approval.',
              'Reg 514.9.2 (A4:2026) requires diagrams, charts and notices to comply with applicable standards — a BIM-derived single-line PDF is no exception. The ISO 19650 deliverable still has to read against BS EN 61082-1, BS EN 60617 and BS 7671 Appendix 6.',
            ]}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 514.9.2"
            clause="Regulation 514.9.2 has been introduced to advise that all diagrams, charts, and information or instruction notices comply with the applicable standards specified."
            meaning={
              <>
                BIM workflows produce drawings, schedules, single-line diagrams and asset notices
                automatically from the federated model. Reg 514.9.2 reminds the HNC designer that
                automatic generation is no excuse for non-compliance — every output must still
                read against BS EN 61082-1 (document preparation), BS EN 60617 (symbols), the BS
                7671 Appendix 6 schedule pro-formas, and Section 514 notice wording. Configure
                your model templates to enforce this at source — do not bolt it on at handover.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 514.9.2."
          />

          <SectionRule />

          <ConceptBlock title="BIM Fundamentals and ISO 19650">
            <p>
              Building Information Modelling represents a fundamental shift in how building
              information is created, managed and exchanged. For electrical engineers, BIM enables
              better coordination, richer information delivery and improved handover to operations.
            </p>
            <p>
              <strong>Key BIM concepts:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>3D Model:</strong> Geometry representing physical elements
              </li>
              <li>
                <strong>Data:</strong> Information attached to model elements
              </li>
              <li>
                <strong>Process:</strong> Workflows for creating and managing information
              </li>
              <li>
                <strong>Collaboration:</strong> Multi-discipline working on shared data
              </li>
              <li>
                <strong>Lifecycle:</strong> Information maintained through operations
              </li>
            </ul>
            <p>
              <strong>ISO 19650 framework (part / title / coverage):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>19650-1 — concepts and principles — framework and definitions</li>
              <li>19650-2 — delivery phase — design and construction</li>
              <li>19650-3 — operational phase — asset management</li>
              <li>19650-5 — security — information security</li>
            </ul>
            <p>
              <strong>UK BIM mandate:</strong> UK government projects require BIM Level 2 (now
              termed 'BIM according to ISO 19650'). This means federated models, structured data
              exchange, and collaborative working using a Common Data Environment.
            </p>
            <p>
              <strong>Key point:</strong> BIM is not just 3D modelling — it's about structured
              information management throughout the asset lifecycle.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Level of Development (LOD)">
            <p>
              LOD defines the completeness and reliability of information in model elements at
              different project stages. It governs both geometric detail and data content, ensuring
              appropriate information is available when needed.
            </p>
            <p>
              <strong>LOD definitions for electrical elements (LOD / stage / electrical content):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>100 — concept — indicative zones, allowances</li>
              <li>200 — schematic — generic elements, approximate size</li>
              <li>300 — design development — specific elements, accurate geometry</li>
              <li>350 — construction docs — detailed with connections</li>
              <li>400 — fabrication — manufacturer-specific data</li>
              <li>500 — as-built — verified installed condition</li>
            </ul>
            <p>
              <strong>Geometry development:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>LOD 200: Placeholder box</li>
              <li>LOD 300: Correct overall dimensions</li>
              <li>LOD 350: Connection points</li>
              <li>LOD 400: Detailed geometry</li>
            </ul>
            <p>
              <strong>Data development:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>LOD 200: Generic type</li>
              <li>LOD 300: Specified product</li>
              <li>LOD 350: Full parameters</li>
              <li>LOD 400: Manufacturer data</li>
            </ul>
            <p>
              <strong>Practical note:</strong> LOD requirements are defined in the EIR/BEP — don't
              over-model early stages.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="COBie and Data Exchange">
            <p>
              COBie (Construction Operations Building Information Exchange) provides a standardised
              format for delivering facility management data. For electrical systems, this includes
              equipment data, maintenance requirements and spatial information.
            </p>
            <p>
              <strong>COBie data categories:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Facility:</strong> Building/site information
              </li>
              <li>
                <strong>Floor:</strong> Level data
              </li>
              <li>
                <strong>Space:</strong> Room information
              </li>
              <li>
                <strong>Zone:</strong> Grouped spaces (e.g., lighting zones)
              </li>
              <li>
                <strong>Type:</strong> Equipment types and specifications
              </li>
              <li>
                <strong>Component:</strong> Individual equipment instances
              </li>
              <li>
                <strong>System:</strong> Related components (e.g., lighting circuit)
              </li>
            </ul>
            <p>
              <strong>Electrical COBie data examples (element / COBie data):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Distribution board — rating, ways, manufacturer, model, serial number
              </li>
              <li>Luminaire — wattage, lumens, lamp type, emergency duration</li>
              <li>Socket outlet — type, rating, circuit reference</li>
              <li>Cable containment — type, size, material, fire rating</li>
            </ul>
            <p>
              <strong>COBie delivery format:</strong> COBie is typically delivered as a spreadsheet
              (xlsx) with standardised worksheets for each data category. It can be exported
              directly from BIM software or compiled from multiple sources. The format is designed
              for import into CAFM systems.
            </p>
            <p>
              <strong>Quality:</strong> COBie data must be complete, accurate and validated before
              handover.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Common Data Environment and Digital Handover">
            <p>
              The Common Data Environment provides a structured approach to information management,
              ensuring the right information is available to the right people at the right time.
              Digital handover transfers this information to the client for operational use.
            </p>
            <p>
              <strong>CDE information states (state / description / access):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Work in Progress — being developed — originator only</li>
              <li>Shared — for coordination — project team</li>
              <li>Published — approved for use — authorised users</li>
              <li>Archived — historical record — reference only</li>
            </ul>
            <p>
              <strong>CDE platforms:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Autodesk Construction Cloud</li>
              <li>Bentley ProjectWise</li>
              <li>Aconex</li>
              <li>Viewpoint</li>
              <li>BIM 360</li>
            </ul>
            <p>
              <strong>Digital handover content:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>As-built BIM models</li>
              <li>COBie data deliverables</li>
              <li>O&M documentation</li>
              <li>Commissioning records</li>
              <li>H&S file information</li>
            </ul>
            <p>
              <strong>Handover verification:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Model geometry matches as-built condition</li>
              <li>Data attributes are complete and accurate</li>
              <li>COBie validates against requirements</li>
              <li>Documentation is linked and accessible</li>
              <li>Client can import into their FM systems</li>
            </ul>
            <p>
              <strong>Success criterion:</strong> The client can effectively use the digital
              information to operate and maintain the building.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>MEP model coordination:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Regular clash detection with other services</li>
              <li>Coordination meetings to resolve clashes</li>
              <li>Document clash resolution decisions</li>
              <li>Update models promptly after coordination</li>
            </ul>
            <p>
              <strong>Data quality management:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Define required parameters in BEP</li>
              <li>Use standardised naming conventions</li>
              <li>Regular data validation checks</li>
              <li>Verify manufacturer data accuracy</li>
            </ul>
            <p>
              <strong>Key standards:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>ISO 19650</strong> — information management
              </li>
              <li>
                <strong>BS EN ISO 19650-1/2</strong> — UK adoption
              </li>
              <li>
                <strong>COBie UK 2012</strong> — data exchange
              </li>
              <li>
                <strong>Uniclass 2015</strong> — classification
              </li>
            </ul>
            <p>
              <strong>LOD summary:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>LOD 200 — schematic design</li>
              <li>LOD 300 — design development</li>
              <li>LOD 350 — construction documents</li>
              <li>LOD 400 — fabrication</li>
              <li>LOD 500 — as-built</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Over-modelling</strong> — excessive detail at early stages
                </li>
                <li>
                  <strong>Missing data</strong> — geometry without parameters
                </li>
                <li>
                  <strong>Poor naming</strong> — inconsistent or unclear references
                </li>
                <li>
                  <strong>Late COBie</strong> — trying to compile at handover
                </li>
              </ul>
            }
            doInstead="Match modelling effort to the LOD specified for the current stage, populate parameter sets as you place objects (not at the end), enforce a single naming convention from the BEP, and build COBie data progressively from concept onward instead of compiling it at the last minute."
          />

          <SectionRule />

          <Scenario
            title="ISO 19650 BIM project — electrical model deliverables and handover"
            situation={
              <>
                You’re lead electrical engineer on a Stage 3-5 BIM Level 2 project (ISO 19650
                compliant). EIR specifies LOD 300 at Stage 4, LOD 350 at Stage 5, COBie at
                handover, federated coordination via Navisworks, CDE on BIM 360. Architect, M&amp;E
                and structural all in Revit. Client’s FM team will adopt the COBie into Concept
                Evolution.
              </>
            }
            whatToDo={
              <>
                Set up the electrical model from the BEP. Use parametric families that carry the
                full BS 7671 attribute set: Tag, Type, Manufacturer, Model, IP, IK, kW, V, PF,
                CCT, Em, UGR, Ra, etc. Place objects with parameters populated as you go. Enforce
                BS EN 60617 symbol mapping in the annotation families so the auto-generated
                single-line and schedules read compliantly with Reg 514.9.2. Run weekly clash
                detection in Navisworks (containment vs structure, conduit vs ductwork). At each
                CDE status gate (WIP → Shared → Published) run a model-check rule set: parameter
                completeness, naming convention, BS EN 60617 symbol audit. COBie tabs (Component,
                Type, System, Space) populated progressively. At Stage 5 handover: model + COBie +
                BS 7671 Appendix 6 schedules + EIC + O&amp;M, all referenced through the same Tag
                = single source of truth for the FM team. The Reg 514.9.2 cross-check is
                explicitly run before each issue.
              </>
            }
            whyItMatters={
              <>
                A BIM model that auto-generates a non-compliant single-line is worse than a
                hand-drawn one — it’s wrong at scale. Configure the model to comply once, and
                every output is compliant. Skip the configuration and every output fails Reg
                514.9.2.
              </>
            }
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'ISO 19650 is the UK BIM Framework standard — Information Requirements (OIR/AIR/EIR/PIR), BEP, CDE, federated model.',
              'LOD: 100 concept → 200 generic → 300 specific → 350 connections → 400 fabrication. Match to project stage.',
              'Parametric families carry the full attribute set — populate as you place, never at the end.',
              'COBie spreadsheet tabs (Component, Type, System, Space) feed FM CAFM at handover. Build progressively.',
              'CDE status (WIP, Shared, Published, Archived) governs review and approval — single source of truth.',
              'Federated coordination (Navisworks) for clash detection — weekly cadence at design stage, daily at construction.',
              'Reg 514.9.2 (A4:2026) compliance for auto-generated diagrams, charts and notices — configure templates to enforce BS EN 61082-1, BS EN 60617 and BS 7671 Appendix 6.',
              'Digital handover = model + COBie + BS 7671 schedules + EIC + O&amp;M, all linked by Tag — the FM team’s start point for asset life management.',
            ]}
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section6-5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                CDM design risk register
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next module <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                HNC Module 5
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule4Section6_6;
