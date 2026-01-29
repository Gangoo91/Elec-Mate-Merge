import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Design Tools and Software - HNC Module 2 Section 6.4";
const DESCRIPTION = "Comprehensive guide to building services design software: IES VE, TAS, EnergyPlus, SBEM, and Part L compliance tools with guidance on when to use each.";

const quickCheckQuestions = [
  {
    id: "sbem-purpose",
    question: "What is the primary purpose of SBEM (Simplified Building Energy Model)?",
    options: ["Detailed HVAC system design", "Part L compliance for non-dwellings", "Structural analysis", "Cost estimation"],
    correctIndex: 1,
    explanation: "SBEM is the UK government's compliance tool for Part L of Building Regulations for non-domestic buildings. It provides a standardised method for demonstrating carbon emission compliance."
  },
  {
    id: "ies-capability",
    question: "Which of these is NOT a typical capability of IES VE?",
    options: ["Dynamic thermal simulation", "CFD analysis", "Structural load calculations", "Daylight modelling"],
    correctIndex: 2,
    explanation: "IES VE is a building performance simulation tool covering thermal, energy, airflow, and daylight analysis. Structural load calculations require separate structural engineering software."
  },
  {
    id: "energyplus-origin",
    question: "EnergyPlus is developed and maintained by:",
    options: ["A commercial software company", "The US Department of Energy", "CIBSE", "ASHRAE"],
    correctIndex: 1,
    explanation: "EnergyPlus is developed by the US Department of Energy and is freely available. Many commercial tools use EnergyPlus as their calculation engine."
  },
  {
    id: "when-dsm",
    question: "Dynamic Simulation Modelling (DSM) is required instead of SBEM when:",
    options: ["Building is residential", "Building has simple rectangular geometry", "Building over 1,000m² or complex systems", "Budget allows for it"],
    correctIndex: 2,
    explanation: "Part L requires DSM for buildings over 1,000m², buildings with complex HVAC systems, atria, or other features that SBEM cannot adequately model."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which software tool is most appropriate for early-stage concept design energy assessment?",
    options: [
      "Full dynamic simulation with detailed HVAC",
      "SBEM or simplified steady-state tools",
      "CFD analysis",
      "BIM coordination software"
    ],
    correctAnswer: 1,
    explanation: "Early-stage design benefits from quick, simple assessments that can evaluate multiple options. Full simulation is too time-consuming when design is still fluid."
  },
  {
    id: 2,
    question: "TAS Building Designer is published by:",
    options: [
      "EDSL (Environmental Design Solutions Ltd)",
      "Integrated Environmental Solutions",
      "US Department of Energy",
      "BRE"
    ],
    correctAnswer: 0,
    explanation: "TAS (Thermal Analysis Software) is developed by EDSL and is widely used in the UK for dynamic thermal simulation and Part L compliance."
  },
  {
    id: 3,
    question: "The NCM (National Calculation Methodology) defines:",
    options: [
      "Building structural requirements",
      "Standard inputs and methods for Part L calculations",
      "BREEAM credit requirements",
      "Construction cost benchmarks"
    ],
    correctAnswer: 1,
    explanation: "The NCM specifies standard occupancy schedules, system efficiencies, and calculation methods that all Part L compliance tools must use, ensuring consistent comparisons."
  },
  {
    id: 4,
    question: "What does an 'iSBEM' assessment produce?",
    options: [
      "A detailed energy breakdown",
      "An EPC rating and BER/TER comparison",
      "HVAC sizing recommendations",
      "Construction cost estimates"
    ],
    correctAnswer: 1,
    explanation: "iSBEM is the interface for SBEM calculations and produces an EPC rating plus comparison of Building Emission Rate (BER) against Target Emission Rate (TER) for compliance."
  },
  {
    id: 5,
    question: "Which tool would you use for detailed natural ventilation analysis in an atrium?",
    options: [
      "SBEM",
      "CFD software or IES MacroFlo",
      "Degree-day spreadsheets",
      "Standard Part L compliance tool"
    ],
    correctAnswer: 1,
    explanation: "Atria with natural ventilation require detailed airflow modelling. CFD or dedicated natural ventilation tools (like MacroFlo in IES) can model stack effects and air movement patterns."
  },
  {
    id: 6,
    question: "DesignBuilder is primarily:",
    options: [
      "A standalone BIM modelling tool",
      "A user-friendly interface for EnergyPlus",
      "A UK Part L compliance calculator",
      "A CFD analysis package"
    ],
    correctAnswer: 1,
    explanation: "DesignBuilder provides a graphical interface for the EnergyPlus simulation engine, making detailed energy simulation more accessible to designers."
  },
  {
    id: 7,
    question: "For BREEAM assessments, which analyses typically require simulation software?",
    options: [
      "Water consumption only",
      "Daylight, thermal comfort, and energy credits",
      "Materials specification only",
      "Acoustic assessment only"
    ],
    correctAnswer: 1,
    explanation: "BREEAM awards credits for daylight factor achievement, thermal comfort compliance (TM52), and energy performance prediction - all requiring simulation analysis."
  },
  {
    id: 8,
    question: "What is the relationship between SBEM and approved DSM software?",
    options: [
      "They are completely different calculation methods",
      "DSM must demonstrate equivalent or better results than SBEM baseline",
      "SBEM is always more accurate",
      "DSM can only be used for residential buildings"
    ],
    correctAnswer: 1,
    explanation: "Approved DSM software must use the same NCM assumptions as SBEM for notional building comparison, ensuring consistent baseline for compliance demonstration."
  },
  {
    id: 9,
    question: "Which software capability is essential for TM52 overheating assessment?",
    options: [
      "Monthly energy totals",
      "Hourly or sub-hourly temperature outputs for occupied hours",
      "Annual carbon emissions",
      "Peak heating load"
    ],
    correctAnswer: 1,
    explanation: "TM52 criteria require hourly operative temperatures during occupied hours to calculate hours of exceedance, daily weighted exceedance, and peak temperature compliance."
  },
  {
    id: 10,
    question: "OpenStudio is best described as:",
    options: [
      "A commercial thermal simulation package",
      "An open-source platform supporting EnergyPlus and other tools",
      "The UK Part L compliance engine",
      "A lighting design calculator"
    ],
    correctAnswer: 1,
    explanation: "OpenStudio is an open-source platform developed by NREL that provides graphical interfaces, scripting capabilities, and integrations for EnergyPlus and other simulation engines."
  },
  {
    id: 11,
    question: "When choosing between IES VE and TAS, the primary consideration is usually:",
    options: [
      "They produce different results",
      "Team familiarity, licensing, and project requirements",
      "One is free and one is paid",
      "Part L only accepts one of them"
    ],
    correctAnswer: 1,
    explanation: "Both IES VE and TAS are approved for Part L DSM. Choice typically depends on team expertise, available licences, specific project features, and client preferences."
  },
  {
    id: 12,
    question: "For a simple office refurbishment under 1,000m², which approach is typically most appropriate?",
    options: [
      "Full dynamic simulation",
      "SBEM with iSBEM interface",
      "Manual degree-day calculations only",
      "CFD analysis"
    ],
    correctAnswer: 1,
    explanation: "Simple buildings under 1,000m² without complex features can use SBEM for Part L compliance - it's quicker and provides adequate accuracy for straightforward projects."
  }
];

const faqs = [
  {
    question: "Do I need to learn all these software packages?",
    answer: "No - focus on becoming proficient in one major package (typically IES VE or TAS in the UK) plus familiarity with SBEM for simple compliance work. Understanding the principles means you can adapt to different tools. Many firms standardise on one package for consistency."
  },
  {
    question: "Is free software (EnergyPlus) as good as commercial packages?",
    answer: "EnergyPlus is a highly capable engine used by many commercial tools. The difference is in user interface, workflow efficiency, and support. Commercial packages like IES VE and DesignBuilder add graphical interfaces, integrated workflows, and technical support that improve productivity for professional work."
  },
  {
    question: "When must I use DSM instead of SBEM for Part L?",
    answer: "DSM is required for: buildings over 1,000m²; buildings with atria (over 3 storeys or >5% floor area); buildings with complex HVAC (displacement ventilation, chilled beams, mixed-mode); buildings claiming credit for advanced features SBEM cannot model. When in doubt, check current Part L guidance."
  },
  {
    question: "How do I get started with building simulation?",
    answer: "Start with software tutorials (most vendors provide free learning resources). Practice on simple buildings with known characteristics. Compare your results to benchmarks and published examples. Many universities offer simulation training. Consider vendor certification programmes for the software you use most."
  },
  {
    question: "Can I import geometry from BIM models?",
    answer: "Yes - all major simulation tools support gbXML or IFC import from Revit, ArchiCAD, and other BIM platforms. However, BIM geometry often needs simplification for simulation. Complex curves, small details, and architectural features may need adjustment. Allow time for geometry cleanup."
  },
  {
    question: "What's the difference between an EPC and a DEC?",
    answer: "An EPC (Energy Performance Certificate) is based on design-stage calculations (asset rating) using standardised assumptions. A DEC (Display Energy Certificate) uses actual metered consumption (operational rating). EPCs are required for building sales/lets; DECs for public buildings. Different software may be used for each."
  }
];

const HNCModule2Section6_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module2-section6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 2.6.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Design Tools and Software
          </h1>
          <p className="text-white/80">
            Building energy and environmental simulation software for design and compliance
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>SBEM:</strong> Simple Part L compliance (&lt;1,000m²)</li>
              <li className="pl-1"><strong>IES VE / TAS:</strong> Dynamic simulation for complex buildings</li>
              <li className="pl-1"><strong>EnergyPlus:</strong> Free research-grade simulation engine</li>
              <li className="pl-1"><strong>Choice depends:</strong> Project complexity and team skills</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Applications</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Part L compliance:</strong> BER vs TER comparison</li>
              <li className="pl-1"><strong>Energy prediction:</strong> TM54 operational energy</li>
              <li className="pl-1"><strong>Comfort analysis:</strong> TM52 overheating</li>
              <li className="pl-1"><strong>Design optimisation:</strong> Compare options</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand the capabilities of major simulation software",
              "Select appropriate tools for different project types",
              "Recognise Part L compliance tool requirements",
              "Distinguish between SBEM and DSM approaches",
              "Understand BIM integration with simulation",
              "Identify when specialist analysis is needed"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 1: Compliance Tools */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Part L Compliance Tools
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Part L of the Building Regulations requires demonstration that a building's carbon emissions
              (BER - Building Emission Rate) do not exceed the target (TER - Target Emission Rate).
              Different tools are approved for this calculation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">SBEM (Simplified Building Energy Model)</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Purpose:</strong> Part L compliance for non-domestic buildings</li>
                <li className="pl-1"><strong>Interface:</strong> iSBEM (web-based input)</li>
                <li className="pl-1"><strong>Method:</strong> Monthly quasi-steady-state calculation</li>
                <li className="pl-1"><strong>Suitable for:</strong> Simple buildings under 1,000m²</li>
                <li className="pl-1"><strong>Output:</strong> EPC rating, BER/TER comparison</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">When DSM is Required (instead of SBEM)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Building Feature</th>
                      <th className="border border-white/10 px-3 py-2 text-left">SBEM</th>
                      <th className="border border-white/10 px-3 py-2 text-left">DSM Required</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Floor area &gt;1,000m²</td>
                      <td className="border border-white/10 px-3 py-2">No</td>
                      <td className="border border-white/10 px-3 py-2">Yes</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Atrium &gt;3 storeys</td>
                      <td className="border border-white/10 px-3 py-2">No</td>
                      <td className="border border-white/10 px-3 py-2">Yes</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Displacement ventilation</td>
                      <td className="border border-white/10 px-3 py-2">No</td>
                      <td className="border border-white/10 px-3 py-2">Yes</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Chilled beams/ceilings</td>
                      <td className="border border-white/10 px-3 py-2">No</td>
                      <td className="border border-white/10 px-3 py-2">Yes</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Simple AC office &lt;1,000m²</td>
                      <td className="border border-white/10 px-3 py-2">Yes</td>
                      <td className="border border-white/10 px-3 py-2">Optional</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">NCM (National Calculation Methodology)</p>
              <p className="text-sm text-white">
                Both SBEM and approved DSM tools must follow the NCM, which specifies:
              </p>
              <ul className="text-sm text-white mt-2 space-y-1 list-disc list-outside ml-5">
                <li>Standard occupancy and equipment schedules</li>
                <li>Notional building specifications for TER calculation</li>
                <li>System efficiency assumptions</li>
                <li>Weather data (standard UK locations)</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> The NCM creates a level playing field - all buildings are compared
              against the same standardised assumptions, not actual operational patterns.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Dynamic Simulation Software */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Dynamic Simulation Software
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              For complex buildings and detailed design analysis, dynamic simulation software provides
              hourly or sub-hourly calculation of building thermal performance throughout the year.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Major UK Simulation Packages</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Software</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Developer</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Features</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">IES VE</td>
                      <td className="border border-white/10 px-3 py-2">IES Ltd</td>
                      <td className="border border-white/10 px-3 py-2">Integrated suite: thermal, daylight, CFD</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">TAS</td>
                      <td className="border border-white/10 px-3 py-2">EDSL</td>
                      <td className="border border-white/10 px-3 py-2">Dynamic simulation, Part L approved</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">DesignBuilder</td>
                      <td className="border border-white/10 px-3 py-2">DesignBuilder</td>
                      <td className="border border-white/10 px-3 py-2">EnergyPlus interface, user-friendly</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">EnergyPlus</td>
                      <td className="border border-white/10 px-3 py-2">US DOE</td>
                      <td className="border border-white/10 px-3 py-2">Free, powerful, text-based input</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">OpenStudio</td>
                      <td className="border border-white/10 px-3 py-2">NREL</td>
                      <td className="border border-white/10 px-3 py-2">Open-source, EnergyPlus platform</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">IES VE Suite Components:</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                    <li><strong>ModelIT:</strong> Geometry modelling</li>
                    <li><strong>ApacheSim:</strong> Dynamic thermal simulation</li>
                    <li><strong>MacroFlo:</strong> Natural ventilation</li>
                    <li><strong>SunCast:</strong> Shading analysis</li>
                  </ul>
                </div>
                <div>
                  <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                    <li><strong>RadianceIES:</strong> Daylight simulation</li>
                    <li><strong>MicroFlo:</strong> CFD analysis</li>
                    <li><strong>ASHRAE 140:</strong> Validated engine</li>
                    <li><strong>UK Part L:</strong> Approved for compliance</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">EnergyPlus Capabilities</p>
              <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                <li>Heat balance based thermal simulation</li>
                <li>Sub-hourly timesteps (down to 1 minute)</li>
                <li>Detailed HVAC system modelling</li>
                <li>Multizone airflow (AirflowNetwork)</li>
                <li>Ground heat transfer</li>
                <li>Extensive validation (ASHRAE 140, BESTEST)</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Tip:</strong> EnergyPlus is free but requires scripting or a graphical interface
              like DesignBuilder or OpenStudio for practical use.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 3: Selecting the Right Tool */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Selecting the Right Tool
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Tool selection depends on project requirements, team capabilities, available time,
              and budget. Using overly complex tools for simple projects wastes time; using simple
              tools for complex projects risks inaccurate results.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Tool Selection Guide</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Project Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Recommended Tool</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Justification</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Simple office &lt;1,000m²</td>
                      <td className="border border-white/10 px-3 py-2">SBEM/iSBEM</td>
                      <td className="border border-white/10 px-3 py-2">Compliance compliant, quick</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Large office building</td>
                      <td className="border border-white/10 px-3 py-2">IES VE or TAS</td>
                      <td className="border border-white/10 px-3 py-2">DSM required, detailed analysis</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Building with atrium</td>
                      <td className="border border-white/10 px-3 py-2">IES VE with MacroFlo/MicroFlo</td>
                      <td className="border border-white/10 px-3 py-2">Natural ventilation/CFD needed</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Early concept stage</td>
                      <td className="border border-white/10 px-3 py-2">Simplified tools or benchmarks</td>
                      <td className="border border-white/10 px-3 py-2">Quick iteration, design fluid</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Research / academic</td>
                      <td className="border border-white/10 px-3 py-2">EnergyPlus / OpenStudio</td>
                      <td className="border border-white/10 px-3 py-2">Free, documented, reproducible</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Decision Factors:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Regulatory requirement:</strong> What does Part L/BREEAM require?</li>
                <li className="pl-1"><strong>Building complexity:</strong> Simple box or complex geometry?</li>
                <li className="pl-1"><strong>HVAC systems:</strong> Standard or advanced systems?</li>
                <li className="pl-1"><strong>Analysis needs:</strong> Compliance only or design optimisation?</li>
                <li className="pl-1"><strong>Team skills:</strong> What tools does the team know?</li>
                <li className="pl-1"><strong>Time available:</strong> Detailed modelling takes time</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
              <p className="text-sm font-medium text-orange-400 mb-2">Common Pitfall</p>
              <p className="text-sm text-white">
                Don't use complex simulation for every project. A well-run SBEM calculation for a simple
                building is often more useful than a poorly-executed dynamic simulation. Match tool
                complexity to project needs and team capability.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> Start simple, add complexity only when needed to answer
              specific design questions or meet compliance requirements.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 4: Integration and Workflows */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            BIM Integration and Workflows
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Modern building design increasingly uses BIM (Building Information Modelling). Simulation
              tools can import geometry from BIM, though translation requires care to maintain
              accuracy and efficiency.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BIM-to-Simulation Data Exchange</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Format</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Use</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">gbXML</td>
                      <td className="border border-white/10 px-3 py-2">Green Building XML</td>
                      <td className="border border-white/10 px-3 py-2">Most common for energy simulation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">IFC</td>
                      <td className="border border-white/10 px-3 py-2">Industry Foundation Classes</td>
                      <td className="border border-white/10 px-3 py-2">Open BIM standard, improving</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Native plugins</td>
                      <td className="border border-white/10 px-3 py-2">Direct Revit/ArchiCAD links</td>
                      <td className="border border-white/10 px-3 py-2">Tightest integration</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Geometry only</td>
                      <td className="border border-white/10 px-3 py-2">DXF/DWG import</td>
                      <td className="border border-white/10 px-3 py-2">Tracing over CAD</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">BIM Import Considerations:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Geometry simplification:</strong> Remove small details irrelevant to energy</li>
                <li className="pl-1"><strong>Zone definition:</strong> BIM rooms may need combining/splitting</li>
                <li className="pl-1"><strong>Construction assignment:</strong> Check materials translate correctly</li>
                <li className="pl-1"><strong>Window properties:</strong> Often need manual specification</li>
                <li className="pl-1"><strong>Second floor boundaries:</strong> Check adjacencies are correct</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Workflow</p>
              <ol className="text-sm text-white space-y-1 list-decimal list-outside ml-5">
                <li>Receive BIM model from architect (Revit, ArchiCAD)</li>
                <li>Export to gbXML (with energy analysis settings)</li>
                <li>Import to simulation tool (IES, TAS, DesignBuilder)</li>
                <li>Review and fix geometry issues</li>
                <li>Assign/verify constructions and glazing</li>
                <li>Define zones and HVAC systems</li>
                <li>Add schedules and internal gains</li>
                <li>Run simulation and analyse results</li>
              </ol>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Reality check:</strong> BIM-to-simulation transfer rarely works perfectly first time.
              Budget 20-30% of modelling time for geometry cleanup and verification.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Tool Selection</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> 800m² retail unit with simple split DX cooling, seeking Part L compliance.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Analysis:</p>
                <p>- Floor area: 800m² (&lt;1,000m² threshold)</p>
                <p>- HVAC: Simple split system (no complex features)</p>
                <p>- No atrium or special ventilation</p>
                <p className="mt-2">Decision:</p>
                <p className="text-green-400">→ SBEM/iSBEM is appropriate</p>
                <p className="mt-2">Rationale:</p>
                <p>- Building under 1,000m² - SBEM permitted</p>
                <p>- Simple systems - no DSM-only features</p>
                <p>- Compliance focus - detailed analysis not needed</p>
                <p className="mt-2">Time estimate: 1-2 days for model and report</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: DSM Requirement</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> 5,000m² office with chilled beams and mixed-mode ventilation.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Analysis:</p>
                <p>- Floor area: 5,000m² (&gt;1,000m² threshold)</p>
                <p>- HVAC: Chilled beams (DSM-only system)</p>
                <p>- Mixed-mode: Natural + mechanical ventilation</p>
                <p className="mt-2">Decision:</p>
                <p className="text-green-400">→ Dynamic Simulation Model required</p>
                <p className="mt-2">Recommended approach:</p>
                <p>- IES VE or TAS for Part L compliance</p>
                <p>- MacroFlo/natural vent module for mixed-mode</p>
                <p>- TM52 analysis for overheating (BREEAM)</p>
                <p className="mt-2">Time estimate: 2-3 weeks for full analysis</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: BREEAM Analysis Suite</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> New school targeting BREEAM Excellent, requiring multiple simulation outputs.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Required analyses and tools:</p>
                <p className="mt-2">1. Part L compliance (Ene 01)</p>
                <p>   → IES VE or TAS with NCM module</p>
                <p className="mt-2">2. TM52 overheating (Hea 04)</p>
                <p>   → Dynamic simulation with DSY weather</p>
                <p className="mt-2">3. Daylight factor (Hea 01)</p>
                <p>   → RadianceIES or TAS daylighting</p>
                <p className="mt-2">4. Energy prediction for Soft Landings</p>
                <p>   → TM54 analysis using same model</p>
                <p className="mt-2">Approach:</p>
                <p>- Single IES VE model serves all analyses</p>
                <p>- Consistent geometry and constructions</p>
                <p>- Different weather files for different purposes</p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Getting Started with Simulation</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Complete vendor training for your chosen software</li>
                <li className="pl-1">Practice on simple, known buildings first</li>
                <li className="pl-1">Compare results to benchmarks and published examples</li>
                <li className="pl-1">Join user groups and forums for support</li>
                <li className="pl-1">Consider vendor certification for professional credibility</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Quality Assurance Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Zone areas match drawings/brief</li>
                <li className="pl-1">Construction U-values match specification</li>
                <li className="pl-1">Glazing properties (U, g, VT) are correct</li>
                <li className="pl-1">HVAC systems match design intent</li>
                <li className="pl-1">Schedules reflect intended operation</li>
                <li className="pl-1">Results are sense-checked against benchmarks</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Over-complex models:</strong> Don't model every room separately</li>
                <li className="pl-1"><strong>Default schedules:</strong> Verify they match project requirements</li>
                <li className="pl-1"><strong>Ignoring warnings:</strong> Simulation warnings often indicate problems</li>
                <li className="pl-1"><strong>No sanity check:</strong> Results should align with expectations</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/90 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Part L Compliance</p>
                <ul className="space-y-0.5">
                  <li>SBEM: Simple buildings &lt;1,000m²</li>
                  <li>DSM: Complex buildings &gt;1,000m²</li>
                  <li>NCM: Standard calculation method</li>
                  <li>Output: BER vs TER comparison</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Major DSM Tools</p>
                <ul className="space-y-0.5">
                  <li>IES VE - UK market leader</li>
                  <li>TAS - EDSL package</li>
                  <li>EnergyPlus - Free US DOE engine</li>
                  <li>DesignBuilder - EnergyPlus interface</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module2-section6-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module2-section6-5">
              Next: System Integration
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule2Section6_4;
