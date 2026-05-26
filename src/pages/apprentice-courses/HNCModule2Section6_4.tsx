/**
 * Module 2 · Section 6 · Subsection 4 — Design Tools and Software
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   SBEM, DSM, dynamic simulation tools, lighting/CFD/acoustic specialists and
 *   BIM integration — choosing the right tool for each design and compliance
 *   workstream on a building services project.
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

const TITLE = 'Design Tools and Software - HNC Module 2 Section 6.4';
const DESCRIPTION =
  'Comprehensive guide to building services design software: IES VE, TAS, EnergyPlus, SBEM, and Part L compliance tools with guidance on when to use each.';

const quickCheckQuestions = [
  {
    id: 'sbem-purpose',
    question: 'What is the primary purpose of SBEM (Simplified Building Energy Model)?',
    options: [
      'Installation drawings and plans',
      'Part L compliance for non-dwellings',
      'An open-top skip in a well-ventilated yard',
      'Spring return, normally open',
    ],
    correctIndex: 1,
    explanation:
      "SBEM is the UK government's compliance tool for Part L of Building Regulations for non-domestic buildings. It provides a standardised method for demonstrating carbon emission compliance.",
  },
  {
    id: 'ies-capability',
    question: 'Which of these is NOT a typical capability of IES VE?',
    options: [
      'BS 7671 IET Wiring Regulations',
      'Structural load calculations',
      'Reason for incomplete testing',
      'Medium Dependent Interface Crossover',
    ],
    correctIndex: 1,
    explanation:
      'IES VE is a building performance simulation tool covering thermal, energy, airflow, and daylight analysis. Structural load calculations require separate structural engineering software.',
  },
  {
    id: 'energyplus-origin',
    question: 'EnergyPlus is developed and maintained by:',
    options: [
      'Tabulated current-carrying capacity',
      'Engineering Recommendation G5/5',
      'The US Department of Energy',
      'Equal to the supply voltage',
    ],
    correctIndex: 2,
    explanation:
      'EnergyPlus is developed by the US Department of Energy and is freely available. Many commercial tools use EnergyPlus as their calculation engine.',
  },
  {
    id: 'when-dsm',
    question: 'Dynamic Simulation Modelling (DSM) is required instead of SBEM when:',
    options: [
      'Building over 1,000m² or complex systems',
      'Customer satisfaction through consistent quality',
      'All three phases L1, L2, L3 and neutral',
      'Valid, Authentic, Current, Sufficient, Reliable',
    ],
    correctIndex: 0,
    explanation:
      'Part L requires DSM for buildings over 1,000m², buildings with complex HVAC systems, atria, or other features that SBEM cannot adequately model.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which software tool is most appropriate for early-stage concept design energy assessment?',
    options: [
      'Section 4: First Aid Measures',
      'SBEM or simplified steady-state tools',
      'Mercury content requiring specialist disposal',
      'Every 5 years or at change of tenancy',
    ],
    correctAnswer: 1,
    explanation:
      'Early-stage design benefits from quick, simple assessments that can evaluate multiple options. Full simulation is too time-consuming when design is still fluid.',
  },
  {
    id: 2,
    question: 'TAS Building Designer is published by:',
    options: [
      'Standard inputs and methods for Part L calculations',
      'Daylight, thermal comfort, and energy credits',
      'EDSL (Environmental Design Solutions Ltd)',
      'An EPC rating and BER/TER comparison',
    ],
    correctAnswer: 2,
    explanation:
      'TAS (Thermal Analysis Software) is developed by EDSL and is widely used in the UK for dynamic thermal simulation and Part L compliance.',
  },
  {
    id: 3,
    question: 'The NCM (National Calculation Methodology) defines:',
    options: [
      'EDSL (Environmental Design Solutions Ltd)',
      'Team familiarity, licensing, and project requirements',
      'A user-friendly interface for EnergyPlus',
      'Standard inputs and methods for Part L calculations',
    ],
    correctAnswer: 3,
    explanation:
      'The NCM specifies standard occupancy schedules, system efficiencies, and calculation methods that all Part L compliance tools must use, ensuring consistent comparisons.',
  },
  {
    id: 4,
    question: "What does an 'iSBEM' assessment produce?",
    options: [
      'An EPC rating and BER/TER comparison',
      'A detailed energy breakdown',
      'HVAC sizing recommendations',
      'Construction cost estimates',
    ],
    correctAnswer: 0,
    explanation:
      'iSBEM is the interface for SBEM calculations and produces an EPC rating plus comparison of Building Emission Rate (BER) against Target Emission Rate (TER) for compliance.',
  },
  {
    id: 5,
    question: 'Which tool would you use for detailed natural ventilation analysis in an atrium?',
    options: [
      'Circuit details and test conditions',
      'CFD software or IES MacroFlo',
      'UV resistance and temperature rating',
      'Verified by testing before repair',
    ],
    correctAnswer: 1,
    explanation:
      'Atria with natural ventilation require detailed airflow modelling. CFD or dedicated natural ventilation tools (like MacroFlo in IES) can model stack effects and air movement patterns.',
  },
  {
    id: 6,
    question: 'DesignBuilder is primarily:',
    options: [
      'A standalone BIM modelling tool',
      'A UK Part L compliance calculator',
      'A user-friendly interface for EnergyPlus',
      'A CFD analysis package',
    ],
    correctAnswer: 2,
    explanation:
      'DesignBuilder provides a graphical interface for the EnergyPlus simulation engine, making detailed energy simulation more accessible to designers.',
  },
  {
    id: 7,
    question: 'For BREEAM assessments, which analyses typically require simulation software?',
    options: [
      'Standard inputs and methods for Part L calculations',
      'EDSL (Environmental Design Solutions Ltd)',
      'An EPC rating and BER/TER comparison',
      'Daylight, thermal comfort, and energy credits',
    ],
    correctAnswer: 3,
    explanation:
      'BREEAM awards credits for daylight factor achievement, thermal comfort compliance (TM52), and energy performance prediction - all requiring simulation analysis.',
  },
  {
    id: 8,
    question: 'What is the relationship between SBEM and approved DSM software?',
    options: [
      'DSM must demonstrate equivalent or better results than SBEM baseline',
      'An open-source platform supporting EnergyPlus and other tools',
      'Team familiarity, licensing, and project requirements',
      'Hourly or sub-hourly temperature outputs for occupied hours',
    ],
    correctAnswer: 0,
    explanation:
      'Approved DSM software must use the same NCM assumptions as SBEM for notional building comparison, ensuring consistent baseline for compliance demonstration.',
  },
  {
    id: 9,
    question: 'Which software capability is essential for TM52 overheating assessment?',
    options: [
      'An open-source platform supporting EnergyPlus and other tools',
      'Hourly or sub-hourly temperature outputs for occupied hours',
      'DSM must demonstrate equivalent or better results than SBEM baseline',
      'Team familiarity, licensing, and project requirements',
    ],
    correctAnswer: 1,
    explanation:
      'TM52 criteria require hourly operative temperatures during occupied hours to calculate hours of exceedance, daily weighted exceedance, and peak temperature compliance.',
  },
  {
    id: 10,
    question: 'OpenStudio is best described as:',
    options: [
      'Hourly or sub-hourly temperature outputs for occupied hours',
      'Standard inputs and methods for Part L calculations',
      'An open-source platform supporting EnergyPlus and other tools',
      'Daylight, thermal comfort, and energy credits',
    ],
    correctAnswer: 2,
    explanation:
      'OpenStudio is an open-source platform developed by NREL that provides graphical interfaces, scripting capabilities, and integrations for EnergyPlus and other simulation engines.',
  },
  {
    id: 11,
    question: 'When choosing between IES VE and TAS, the primary consideration is usually:',
    options: [
      'A user-friendly interface for EnergyPlus',
      'An open-source platform supporting EnergyPlus and other tools',
      'Daylight, thermal comfort, and energy credits',
      'Team familiarity, licensing, and project requirements',
    ],
    correctAnswer: 3,
    explanation:
      'Both IES VE and TAS are approved for Part L DSM. Choice typically depends on team expertise, available licences, specific project features, and client preferences.',
  },
  {
    id: 12,
    question:
      'For a simple office refurbishment under 1,000m², which approach is typically most appropriate?',
    options: [
      'SBEM with iSBEM interface',
      'CFD analysis',
      'Full dynamic simulation',
      'Manual degree-day calculations only',
    ],
    correctAnswer: 0,
    explanation:
      "Simple buildings under 1,000m² without complex features can use SBEM for Part L compliance - it's quicker and provides adequate accuracy for straightforward projects.",
  },
];

const faqs = [
  {
    question: 'Do I need to learn all these software packages?',
    answer:
      'No - focus on becoming proficient in one major package (typically IES VE or TAS in the UK) plus familiarity with SBEM for simple compliance work. Understanding the principles means you can adapt to different tools. Many firms standardise on one package for consistency.',
  },
  {
    question: 'Is free software (EnergyPlus) as good as commercial packages?',
    answer:
      'EnergyPlus is a highly capable engine used by many commercial tools. The difference is in user interface, workflow efficiency, and support. Commercial packages like IES VE and DesignBuilder add graphical interfaces, integrated workflows, and technical support that improve productivity for professional work.',
  },
  {
    question: 'When must I use DSM instead of SBEM for Part L?',
    answer:
      'DSM is required for: buildings over 1,000m²; buildings with atria (over 3 storeys or >5% floor area); buildings with complex HVAC (displacement ventilation, chilled beams, mixed-mode); buildings claiming credit for advanced features SBEM cannot model. When in doubt, check current Part L guidance.',
  },
  {
    question: 'How do I get started with building simulation?',
    answer:
      'Start with software tutorials (most vendors provide free learning resources). Practice on simple buildings with known characteristics. Compare your results to benchmarks and published examples. Many universities offer simulation training. Consider vendor certification programmes for the software you use most.',
  },
  {
    question: 'Can I import geometry from BIM models?',
    answer:
      'Yes - all major simulation tools support gbXML or IFC import from Revit, ArchiCAD, and other BIM platforms. However, BIM geometry often needs simplification for simulation. Complex curves, small details, and architectural features may need adjustment. Allow time for geometry cleanup.',
  },
  {
    question: "What's the difference between an EPC and a DEC?",
    answer:
      'An EPC (Energy Performance Certificate) is based on design-stage calculations (asset rating) using standardised assumptions. A DEC (Display Energy Certificate) uses actual metered consumption (operational rating). EPCs are required for building sales/lets; DECs for public buildings. Different software may be used for each.',
  },
];

const HNCModule2Section6_4 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section6')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 2 · Section 6 · Subsection 4"
            title="Design Tools and Software"
            description="Building energy and environmental simulation software for design and compliance."
            tone="purple"
          />

          <TLDR
            points={[
              'You pick SBEM (or SAP for dwellings) for routine Part L compliance and DSM (IES VE, TAS, DesignBuilder) when SBEM cannot model the system (CHP, complex HVAC, automatic blinds).',
              'You use DIALux/Relux for lighting, ODEON/CATT for acoustics, ANSYS/CFX for CFD — separate specialist tools whose outputs feed into the integrated DSM.',
              'You drive simulation from the BIM (Revit/IFC) export to keep geometry, U-values and zoning consistent across consultants.',
              'You document the tool, version, weather file and assumptions in every report — auditability is non-negotiable.',
            ]}
          />

          <RegsCallout
            source="Building Regulations 2010 — Approved Document L (England); BRE / DLUHC SBEM and DSM Compliance Methodology"
            clause="Part L compliance is demonstrated using either SBEM (Simplified Building Energy Model) for typical buildings, or an approved Dynamic Simulation Model (DSM) for buildings with features SBEM cannot represent — both calculating Building Emission Rate against the Target Emission Rate."
            meaning={
              <>
                The choice between SBEM and DSM is regulatorily defined. As HNC engineer
                you flag at Stage-2 whether the design will need DSM (CHP, ASHP, mixed-mode
                HVAC, complex glazing controls) — DSM is significantly more expensive
                and time-consuming, so the procurement plan needs to know early.
              </>
            }
            cite="Source: Building Regulations 2010, Approved Document L — gov.uk; BRE National Calculation Methodology; DLUHC SBEM and DSM Compliance Documentation."
          />

          <LearningOutcomes
            outcomes={[
              'Understand the capabilities of major simulation software',
              'Select appropriate tools for different project types',
              'Recognise Part L compliance tool requirements',
              'Distinguish between SBEM and DSM approaches',
              'Understand BIM integration with simulation',
              'Identify when specialist analysis is needed',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock
            title="Part L Compliance Tools"
            plainEnglish="Part L compares your building's BER (carbon) against a TER target. SBEM is the simplified calculator for ordinary buildings; DSM is needed once you go big or fancy."
          >
            <p>
              Part L of the Building Regulations requires demonstration that a building's carbon
              emissions (BER - Building Emission Rate) do not exceed the target (TER - Target
              Emission Rate). Different tools are approved for this calculation.
            </p>
            <p>
              <strong>SBEM (Simplified Building Energy Model):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Purpose:</strong> Part L compliance for non-domestic buildings
              </li>
              <li>
                <strong>Interface:</strong> iSBEM (web-based input)
              </li>
              <li>
                <strong>Method:</strong> Monthly quasi-steady-state calculation
              </li>
              <li>
                <strong>Suitable for:</strong> Simple buildings under 1,000m²
              </li>
              <li>
                <strong>Output:</strong> EPC rating, BER/TER comparison
              </li>
            </ul>
            <p>
              <strong>When DSM is required (instead of SBEM):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Floor area &gt;1,000m²: DSM required</li>
              <li>Atrium &gt;3 storeys: DSM required</li>
              <li>Displacement ventilation: DSM required</li>
              <li>Chilled beams/ceilings: DSM required</li>
              <li>Simple AC office &lt;1,000m²: SBEM suitable, DSM optional</li>
            </ul>
            <p>
              <strong>NCM (National Calculation Methodology):</strong> Both SBEM and approved DSM
              tools must follow the NCM, which specifies standard occupancy and equipment schedules,
              notional building specifications for TER calculation, system efficiency assumptions,
              and weather data (standard UK locations).
            </p>
            <p>
              <strong>Key point:</strong> The NCM creates a level playing field - all buildings are
              compared against the same standardised assumptions, not actual operational patterns.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock
            title="Dynamic Simulation Software"
            plainEnglish="For complex buildings, you need an hour-by-hour engine. The big UK names are IES VE and TAS; EnergyPlus is the free engine many tools use under the hood."
          >
            <p>
              For complex buildings and detailed design analysis, dynamic simulation software
              provides hourly or sub-hourly calculation of building thermal performance throughout
              the year.
            </p>
            <p>
              <strong>Major UK simulation packages:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>IES VE (IES Ltd):</strong> Integrated suite - thermal, daylight, CFD
              </li>
              <li>
                <strong>TAS (EDSL):</strong> Dynamic simulation, Part L approved
              </li>
              <li>
                <strong>DesignBuilder:</strong> EnergyPlus interface, user-friendly
              </li>
              <li>
                <strong>EnergyPlus (US DOE):</strong> Free, powerful, text-based input
              </li>
              <li>
                <strong>OpenStudio (NREL):</strong> Open-source, EnergyPlus platform
              </li>
            </ul>
            <p>
              <strong>IES VE suite components:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>ModelIT:</strong> Geometry modelling
              </li>
              <li>
                <strong>ApacheSim:</strong> Dynamic thermal simulation
              </li>
              <li>
                <strong>MacroFlo:</strong> Natural ventilation
              </li>
              <li>
                <strong>SunCast:</strong> Shading analysis
              </li>
              <li>
                <strong>RadianceIES:</strong> Daylight simulation
              </li>
              <li>
                <strong>MicroFlo:</strong> CFD analysis
              </li>
              <li>
                <strong>ASHRAE 140:</strong> Validated engine
              </li>
              <li>
                <strong>UK Part L:</strong> Approved for compliance
              </li>
            </ul>
            <p>
              <strong>EnergyPlus capabilities:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Heat balance based thermal simulation</li>
              <li>Sub-hourly timesteps (down to 1 minute)</li>
              <li>Detailed HVAC system modelling</li>
              <li>Multizone airflow (AirflowNetwork)</li>
              <li>Ground heat transfer</li>
              <li>Extensive validation (ASHRAE 140, BESTEST)</li>
            </ul>
            <p>
              <strong>Tip:</strong> EnergyPlus is free but requires scripting or a graphical
              interface like DesignBuilder or OpenStudio for practical use.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock
            title="Selecting the Right Tool"
            plainEnglish="Match the tool to the question. SBEM for simple compliance, dynamic suites for complex buildings, simplified tools for early-stage option testing."
          >
            <p>
              Tool selection depends on project requirements, team capabilities, available time, and
              budget. Using overly complex tools for simple projects wastes time; using simple tools
              for complex projects risks inaccurate results.
            </p>
            <p>
              <strong>Tool selection guide (project type / recommended tool / justification):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Simple office &lt;1,000m² → SBEM/iSBEM (compliance compliant, quick)</li>
              <li>Large office building → IES VE or TAS (DSM required, detailed analysis)</li>
              <li>Building with atrium → IES VE with MacroFlo/MicroFlo (natural ventilation/CFD needed)</li>
              <li>Early concept stage → Simplified tools or benchmarks (quick iteration, design fluid)</li>
              <li>Research / academic → EnergyPlus / OpenStudio (free, documented, reproducible)</li>
            </ul>
            <p>
              <strong>Decision factors:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Regulatory requirement:</strong> What does Part L/BREEAM require?
              </li>
              <li>
                <strong>Building complexity:</strong> Simple box or complex geometry?
              </li>
              <li>
                <strong>HVAC systems:</strong> Standard or advanced systems?
              </li>
              <li>
                <strong>Analysis needs:</strong> Compliance only or design optimisation?
              </li>
              <li>
                <strong>Team skills:</strong> What tools does the team know?
              </li>
              <li>
                <strong>Time available:</strong> Detailed modelling takes time
              </li>
            </ul>
            <p>
              <strong>Common pitfall:</strong> Don't use complex simulation for every project. A
              well-run SBEM calculation for a simple building is often more useful than a
              poorly-executed dynamic simulation. Match tool complexity to project needs and team
              capability.
            </p>
            <p>
              <strong>Best practice:</strong> Start simple, add complexity only when needed to
              answer specific design questions or meet compliance requirements.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock
            title="BIM Integration and Workflows"
            plainEnglish="You can pull architect geometry into a sim tool via gbXML or IFC, but expect to spend time cleaning it up. BIM saves time only if you plan the export properly."
          >
            <p>
              Modern building design increasingly uses BIM (Building Information Modelling).
              Simulation tools can import geometry from BIM, though translation requires care to
              maintain accuracy and efficiency.
            </p>
            <p>
              <strong>BIM-to-simulation data exchange (format / description / typical use):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>gbXML - Green Building XML - most common for energy simulation</li>
              <li>IFC - Industry Foundation Classes - open BIM standard, improving</li>
              <li>Native plugins - direct Revit/ArchiCAD links - tightest integration</li>
              <li>Geometry only - DXF/DWG import - tracing over CAD</li>
            </ul>
            <p>
              <strong>BIM import considerations:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Geometry simplification:</strong> Remove small details irrelevant to energy
              </li>
              <li>
                <strong>Zone definition:</strong> BIM rooms may need combining/splitting
              </li>
              <li>
                <strong>Construction assignment:</strong> Check materials translate correctly
              </li>
              <li>
                <strong>Window properties:</strong> Often need manual specification
              </li>
              <li>
                <strong>Second floor boundaries:</strong> Check adjacencies are correct
              </li>
            </ul>
            <p>
              <strong>Typical workflow:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Receive BIM model from architect (Revit, ArchiCAD)</li>
              <li>Export to gbXML (with energy analysis settings)</li>
              <li>Import to simulation tool (IES, TAS, DesignBuilder)</li>
              <li>Review and fix geometry issues</li>
              <li>Assign/verify constructions and glazing</li>
              <li>Define zones and HVAC systems</li>
              <li>Add schedules and internal gains</li>
              <li>Run simulation and analyse results</li>
            </ul>
            <p>
              <strong>Reality check:</strong> BIM-to-simulation transfer rarely works perfectly
              first time. Budget 20-30% of modelling time for geometry cleanup and verification.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock
            title="Worked examples"
            plainEnglish="Three scenarios picking the right tool: a small retail unit, a large mixed-mode office, and a BREEAM Excellent school needing several analyses."
          >
            <p>
              <strong>Example 1 - Tool selection:</strong> 800m² retail unit with simple split DX
              cooling, seeking Part L compliance.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Floor area: 800m² (&lt;1,000m² threshold)</li>
              <li>HVAC: Simple split system (no complex features)</li>
              <li>No atrium or special ventilation</li>
              <li>Decision: <strong>SBEM/iSBEM is appropriate</strong></li>
              <li>Building under 1,000m² - SBEM permitted; simple systems - no DSM-only features; compliance focus - detailed analysis not needed</li>
              <li>Time estimate: 1-2 days for model and report</li>
            </ul>
            <p>
              <strong>Example 2 - DSM requirement:</strong> 5,000m² office with chilled beams and
              mixed-mode ventilation.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Floor area: 5,000m² (&gt;1,000m² threshold)</li>
              <li>HVAC: Chilled beams (DSM-only system)</li>
              <li>Mixed-mode: Natural + mechanical ventilation</li>
              <li>Decision: <strong>Dynamic Simulation Model required</strong></li>
              <li>Recommended: IES VE or TAS for Part L compliance, MacroFlo/natural vent module for mixed-mode, TM52 analysis for overheating (BREEAM)</li>
              <li>Time estimate: 2-3 weeks for full analysis</li>
            </ul>
            <p>
              <strong>Example 3 - BREEAM analysis suite:</strong> New school targeting BREEAM
              Excellent, requiring multiple simulation outputs.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Part L compliance (Ene 01) → IES VE or TAS with NCM module</li>
              <li>TM52 overheating (Hea 04) → Dynamic simulation with DSY weather</li>
              <li>Daylight factor (Hea 01) → RadianceIES or TAS daylighting</li>
              <li>Energy prediction for Soft Landings → TM54 analysis using same model</li>
              <li>Single IES VE model serves all analyses, consistent geometry and constructions, different weather files for different purposes</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock
            title="Practical guidance"
            plainEnglish="The starter steps and quality checks that make a simulation report defendable to a client or BCO."
          >
            <p>
              <strong>Getting started with simulation:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Complete vendor training for your chosen software</li>
              <li>Practice on simple, known buildings first</li>
              <li>Compare results to benchmarks and published examples</li>
              <li>Join user groups and forums for support</li>
              <li>Consider vendor certification for professional credibility</li>
            </ul>
            <p>
              <strong>Quality assurance checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Zone areas match drawings/brief</li>
              <li>Construction U-values match specification</li>
              <li>Glazing properties (U, g, VT) are correct</li>
              <li>HVAC systems match design intent</li>
              <li>Schedules reflect intended operation</li>
              <li>Results are sense-checked against benchmarks</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Over-complex models:</strong> Don't model every room separately
                </li>
                <li>
                  <strong>Default schedules:</strong> Verify they match project requirements
                </li>
                <li>
                  <strong>Ignoring warnings:</strong> Simulation warnings often indicate problems
                </li>
                <li>
                  <strong>No sanity check:</strong> Results should align with expectations
                </li>
              </ul>
            }
            doInstead="Group similar rooms into representative zones, swap default schedules for project-specific ones, investigate every simulation warning, and benchmark output against TM46 or similar buildings as a sense check."
          />

          <SectionRule />

          <Scenario
            title="Selecting the modelling toolkit for a Net-Zero new-build school"
            situation={
              <>
                You are mobilising a Stage-3 design for a new 8,500 m² primary school
                targeting Net-Zero in operation: PV + GSHP + MVHR + automatic external
                shading. Soft Landings is a contractual deliverable. The design programme
                is 16 weeks to RIBA-4.
              </>
            }
            whatToDo={
              <>
                SBEM cannot represent the GSHP-PV-MVHR-shading interaction credibly — flag
                DSM as essential. Pick IES VE (or DesignBuilder/EnergyPlus) for the
                DSM. Run TM52 for the classrooms, TM54 for operational forecast, AM11
                methodology for model construction and reporting. Use DIALux for lighting
                lux/UGR/glare on the open studios. Use ODEON for the multi-purpose hall
                acoustics. Drive geometry from the architect&rsquo;s Revit model via gbXML
                or IFC. Lock the weather file, occupancy schedules and HVAC controls in a
                version-controlled documentation pack.
              </>
            }
            whyItMatters={
              <>
                Net-Zero schools attract DfE funding scrutiny and BREEAM Excellent / Outstanding
                contractual targets. A Part L-only SBEM submission will not credibly model
                the GSHP-PV interaction — and every credit hangs on a defendable model.
                The right tool stack at Stage-3 saves a six-figure rework at Stage-4.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'SBEM = Simplified Building Energy Model for routine Part L compliance on non-domestic buildings.',
              'SAP = Standard Assessment Procedure for dwellings — equivalent role to SBEM.',
              'DSM = Dynamic Simulation Model — IES VE, TAS, DesignBuilder, EnergyPlus — used when SBEM cannot represent the design.',
              'DSM mandatory for: CHP, advanced HVAC controls, automatic shading, mixed-mode, demand-response.',
              'Specialist tools: DIALux/Relux (lighting), ODEON/CATT (acoustics), ANSYS/CFX (CFD), TRNSYS (renewables systems).',
              'BIM integration via gbXML or IFC keeps simulation geometry consistent with the federated BIM model.',
              'Always document tool, version, weather file, calibration evidence and assumptions in the report appendix.',
              'Approved Document L mandates the SBEM-or-DSM choice for compliance demonstration.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section6-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Building simulation
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section6-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                System integration
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule2Section6_4;
