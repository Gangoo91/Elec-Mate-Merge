import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "BREEAM Overview - HNC Module 6 Section 3.1";
const DESCRIPTION = "Master BREEAM assessment methodology: schemes, rating levels, category weightings, assessment process, and the role of the licensed assessor in achieving sustainable building certification.";

const quickCheckQuestions = [
  {
    id: "breeam-definition",
    question: "What does BREEAM stand for?",
    options: ["Building Research Establishment Environmental Assessment Method", "British Regulation for Energy and Environmental Assessment Measures", "Building Requirements for Ecological and Environmental Assessment Methods", "British Research Establishment Energy Assessment Methodology"],
    correctIndex: 0,
    explanation: "BREEAM stands for Building Research Establishment Environmental Assessment Method. Developed by BRE in 1990, it was the world's first environmental assessment method for buildings."
  },
  {
    id: "breeam-ratings",
    question: "What is the highest BREEAM rating that can be achieved?",
    options: ["Excellent", "Superior", "Outstanding", "Exceptional"],
    correctIndex: 2,
    explanation: "Outstanding is the highest BREEAM rating, requiring a score of 85% or above. The five rating levels in ascending order are: Pass (30%), Good (45%), Very Good (55%), Excellent (70%), and Outstanding (85%)."
  },
  {
    id: "breeam-assessor",
    question: "Who is responsible for conducting a BREEAM assessment?",
    options: ["The building owner", "Any qualified architect", "A licensed BREEAM assessor", "The local authority building control"],
    correctIndex: 2,
    explanation: "BREEAM assessments must be conducted by a licensed BREEAM assessor who has completed specific BRE training and maintains their accreditation. The assessor is independent and acts as the interface between the project team and BRE."
  },
  {
    id: "breeam-mandatory",
    question: "What happens if a BREEAM project fails to achieve mandatory credits?",
    options: ["The rating is reduced by one level", "The project cannot achieve certification", "Additional points are required elsewhere", "The project receives a conditional pass"],
    correctIndex: 1,
    explanation: "Mandatory credits (also called minimum standards) must be achieved for any rating level. If a project fails to meet the mandatory requirements for its target rating, it cannot achieve certification at that level regardless of overall score."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which BREEAM scheme would be used for assessing an existing office building that has been in operation for 5 years?",
    options: [
      "BREEAM New Construction",
      "BREEAM In-Use",
      "BREEAM Refurbishment and Fit-Out",
      "BREEAM Communities"
    ],
    correctAnswer: 1,
    explanation: "BREEAM In-Use is designed for assessing operational buildings. It evaluates asset performance, building management, and occupier management for existing buildings that are occupied and operating."
  },
  {
    id: 2,
    question: "In BREEAM New Construction 2018, which assessment category typically carries the highest weighting?",
    options: ["Management", "Energy", "Materials", "Health and Wellbeing"],
    correctAnswer: 1,
    explanation: "Energy typically carries the highest weighting in BREEAM assessments (around 15-19% depending on building type). This reflects the significant environmental impact of building energy consumption over its operational lifetime."
  },
  {
    id: 3,
    question: "A project scores 72% in a BREEAM assessment. What rating does this achieve?",
    options: ["Good", "Very Good", "Excellent", "Outstanding"],
    correctAnswer: 2,
    explanation: "A score of 72% achieves an Excellent rating. The thresholds are: Pass (≥30%), Good (≥45%), Very Good (≥55%), Excellent (≥70%), Outstanding (≥85%)."
  },
  {
    id: 4,
    question: "What is the purpose of the BREEAM pre-assessment?",
    options: [
      "To submit the final certification application",
      "To identify achievable credits and inform design decisions early",
      "To verify post-construction compliance",
      "To train the project team on BREEAM requirements"
    ],
    correctAnswer: 1,
    explanation: "Pre-assessment is conducted early in design to identify which credits are achievable, highlight potential issues, and inform design decisions while changes are still cost-effective. It helps set a realistic target rating."
  },
  {
    id: 5,
    question: "Which of these is NOT a BREEAM assessment category?",
    options: ["Land Use and Ecology", "Pollution", "Cost Efficiency", "Transport"],
    correctAnswer: 2,
    explanation: "Cost Efficiency is not a BREEAM assessment category. The nine categories are: Management, Health and Wellbeing, Energy, Transport, Water, Materials, Waste, Land Use and Ecology, and Pollution."
  },
  {
    id: 6,
    question: "How are innovation credits used in BREEAM?",
    options: [
      "They replace mandatory credits",
      "They provide additional percentage points above the standard 100%",
      "They are only available for Outstanding ratings",
      "They reduce the overall assessment cost"
    ],
    correctAnswer: 1,
    explanation: "Innovation credits allow projects to earn additional percentage points (typically up to 10%) above the standard 100% for exemplary performance or innovative solutions. This can help push a project into a higher rating band."
  },
  {
    id: 7,
    question: "At which project stage is the Design Stage assessment typically completed?",
    options: [
      "Planning application",
      "End of RIBA Stage 3/4 (Technical Design)",
      "During construction",
      "After practical completion"
    ],
    correctAnswer: 1,
    explanation: "The Design Stage assessment is typically completed at the end of RIBA Stage 3 or 4 when technical design is substantially complete. This provides an interim certificate based on design intent and commitments."
  },
  {
    id: 8,
    question: "What evidence would an assessor require for the Ene 01 (Reduction of energy use and carbon emissions) credit?",
    options: [
      "Building user guide only",
      "Energy modelling results from approved software (e.g., IES, TAS)",
      "Contractor method statements",
      "Material delivery receipts"
    ],
    correctAnswer: 1,
    explanation: "Ene 01 requires dynamic thermal modelling results from approved software such as IES-VE, TAS, or EnergyPlus. This demonstrates the predicted energy performance and carbon emissions compared to the Part L notional building."
  },
  {
    id: 9,
    question: "Which BREEAM category addresses internal air quality, lighting levels, and acoustic performance?",
    options: ["Management", "Energy", "Health and Wellbeing", "Pollution"],
    correctAnswer: 2,
    explanation: "Health and Wellbeing (Hea) addresses factors affecting building occupants including visual comfort, indoor air quality, safe access, thermal comfort, acoustic performance, and water quality."
  },
  {
    id: 10,
    question: "What is the role of the BREEAM Quality Assurance (QA) process?",
    options: [
      "To train new assessors",
      "To verify assessor submissions and maintain assessment consistency",
      "To set credit weightings",
      "To issue building completion certificates"
    ],
    correctAnswer: 1,
    explanation: "BRE's Quality Assurance process reviews assessor submissions to verify compliance, maintain consistency across assessments, and ensure the integrity of BREEAM certification. This independent review is mandatory before certification."
  },
  {
    id: 11,
    question: "A healthcare building requires BREEAM Excellent. Which scheme-specific version would be used?",
    options: [
      "BREEAM New Construction (generic)",
      "BREEAM Healthcare",
      "BREEAM In-Use Healthcare",
      "BREEAM Clinical"
    ],
    correctAnswer: 1,
    explanation: "BREEAM Healthcare is a building type-specific scheme with tailored criteria for hospitals and clinical facilities. It includes credits relevant to healthcare environments such as infection control and clinical functionality."
  },
  {
    id: 12,
    question: "What is the minimum percentage score required to achieve a BREEAM 'Very Good' rating?",
    options: ["30%", "45%", "55%", "70%"],
    correctAnswer: 2,
    explanation: "Very Good requires a minimum score of 55%. The full scale is: Pass (≥30%), Good (≥45%), Very Good (≥55%), Excellent (≥70%), Outstanding (≥85%). Each level also requires achievement of specific mandatory credits."
  }
];

const faqs = [
  {
    question: "When should BREEAM be considered in a project?",
    answer: "BREEAM should be considered at the earliest possible stage - ideally during feasibility. Early engagement allows sustainability targets to influence site selection, building orientation, and fundamental design decisions. The pre-assessment at RIBA Stage 2 helps set achievable targets. Retrofitting BREEAM requirements late in design is costly and limits the achievable rating."
  },
  {
    question: "What is the difference between Design Stage and Post-Construction Stage certificates?",
    answer: "The Design Stage certificate is an interim assessment based on design documentation and commitments - it shows what should be achieved if the design is built as specified. The Post-Construction Stage certificate is the final verification based on as-built evidence, confirming that commitments were actually delivered. Most clients require the final Post-Construction certificate."
  },
  {
    question: "How much does BREEAM certification cost?",
    answer: "Costs vary by project size and complexity. Registration fees are set by BRE (typically £1,500-£5,000 for New Construction). Assessor fees depend on the scope and range from £5,000-£30,000+. The main cost impact is design and construction measures to achieve credits - these should be considered design costs rather than assessment costs. Early engagement minimises the cost premium."
  },
  {
    question: "Can a project change its target BREEAM rating during design?",
    answer: "Yes, target ratings can be adjusted based on pre-assessment findings and value engineering decisions. However, changing targets late in design limits options and may result in abortive design work. If contractually committed to a rating, the client must be consulted on any proposed changes. The assessor can advise on the implications of different rating targets."
  },
  {
    question: "What happens if credits claimed at Design Stage are not achieved at Post-Construction?",
    answer: "If Post-Construction evidence does not support Design Stage claims, those credits are removed from the final score. This may result in a lower rating than the interim certificate indicated. The assessor should flag risks during design and the project team must ensure design commitments are carried through to construction. Some shortfall can be offset if other credits over-perform."
  },
  {
    question: "Is BREEAM mandatory in the UK?",
    answer: "BREEAM is not mandated by Building Regulations but is often required by clients, planning conditions, or funding bodies. Government projects (central government, devolved administrations) typically require BREEAM Excellent. Many local planning authorities include BREEAM requirements in supplementary planning guidance. Institutional investors and lenders increasingly require minimum ratings for new builds."
  }
];

const HNCModule6Section3_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module6-section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 6.3.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            BREEAM Overview
          </h1>
          <p className="text-white/80">
            Schemes, rating levels, category weightings, assessment process, and the role of the licensed assessor
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>BREEAM:</strong> World's leading sustainability assessment method</li>
              <li className="pl-1"><strong>Five ratings:</strong> Pass, Good, Very Good, Excellent, Outstanding</li>
              <li className="pl-1"><strong>Nine categories:</strong> Energy, Water, Materials, Health, etc.</li>
              <li className="pl-1"><strong>Licensed assessor:</strong> Required for all certifications</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Energy credits:</strong> Highest weighting category (15-19%)</li>
              <li className="pl-1"><strong>M&E impact:</strong> Affects multiple credit categories</li>
              <li className="pl-1"><strong>Design integration:</strong> Early engagement critical</li>
              <li className="pl-1"><strong>Evidence:</strong> Specifications, calculations, commissioning data</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the purpose and scope of BREEAM assessment methodology",
              "Identify the main BREEAM schemes and their applications",
              "Describe the five rating levels and their percentage thresholds",
              "Analyse the nine assessment categories and their weightings",
              "Outline the assessment process from pre-assessment to certification",
              "Define the role and responsibilities of the licensed BREEAM assessor"
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

        {/* Section 1: Introduction to BREEAM */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Introduction to BREEAM
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BREEAM (Building Research Establishment Environmental Assessment Method) is the world's
              longest-established method of assessing, rating, and certifying the sustainability of buildings.
              Developed by BRE in 1990, it has been used to certify over 2.3 million buildings globally and
              remains the predominant assessment method in the UK construction industry.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key BREEAM Schemes:</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Scheme</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Features</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">New Construction</td>
                      <td className="border border-white/10 px-3 py-2">New buildings, major extensions</td>
                      <td className="border border-white/10 px-3 py-2">Design Stage + Post-Construction certification</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Refurbishment & Fit-Out</td>
                      <td className="border border-white/10 px-3 py-2">Existing building upgrades</td>
                      <td className="border border-white/10 px-3 py-2">Scalable scope: Part 1 (fabric), Part 2 (core services), Part 3 (local services), Part 4 (interior design)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">In-Use</td>
                      <td className="border border-white/10 px-3 py-2">Operational buildings</td>
                      <td className="border border-white/10 px-3 py-2">Asset, Building Management, Occupier Management assessments</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Communities</td>
                      <td className="border border-white/10 px-3 py-2">Masterplanning, neighbourhood scale</td>
                      <td className="border border-white/10 px-3 py-2">Assesses wider sustainability of developments</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Infrastructure</td>
                      <td className="border border-white/10 px-3 py-2">Civil engineering projects</td>
                      <td className="border border-white/10 px-3 py-2">Roads, railways, utilities, bridges</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building Type-Specific Versions</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>BREEAM Healthcare:</strong> Hospitals and clinical facilities with infection control credits</li>
                <li className="pl-1"><strong>BREEAM Education:</strong> Schools and universities with educational environment focus</li>
                <li className="pl-1"><strong>BREEAM Retail:</strong> Shops, shopping centres with customer experience criteria</li>
                <li className="pl-1"><strong>BREEAM Industrial:</strong> Warehouses, factories with operational flexibility</li>
                <li className="pl-1"><strong>BREEAM Residential:</strong> Multi-residential (for individual homes, Home Quality Mark applies)</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Industry context:</strong> BREEAM certification is often a planning requirement, client specification, or funding condition - making it a standard consideration for building services engineers.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Rating Levels and Scoring */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Rating Levels and Scoring
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BREEAM uses a points-based system where credits are awarded for meeting specific criteria.
              Credits are weighted by category importance, summed to give a percentage score, and converted
              to a rating level. Each rating level also requires achievement of specific mandatory credits.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BREEAM Rating Levels</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Rating</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Minimum Score</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Market Position</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Pass</td>
                      <td className="border border-white/10 px-3 py-2">≥30%</td>
                      <td className="border border-white/10 px-3 py-2">Minimum compliance</td>
                      <td className="border border-white/10 px-3 py-2">Below market expectation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Good</td>
                      <td className="border border-white/10 px-3 py-2">≥45%</td>
                      <td className="border border-white/10 px-3 py-2">Standard commercial</td>
                      <td className="border border-white/10 px-3 py-2">Market baseline</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Very Good</td>
                      <td className="border border-white/10 px-3 py-2">≥55%</td>
                      <td className="border border-white/10 px-3 py-2">Common client requirement</td>
                      <td className="border border-white/10 px-3 py-2">Above average practice</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Excellent</td>
                      <td className="border border-white/10 px-3 py-2">≥70%</td>
                      <td className="border border-white/10 px-3 py-2">Government, institutional</td>
                      <td className="border border-white/10 px-3 py-2">Best practice</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Outstanding</td>
                      <td className="border border-white/10 px-3 py-2">≥85%</td>
                      <td className="border border-white/10 px-3 py-2">Landmark, exemplary</td>
                      <td className="border border-white/10 px-3 py-2">Innovation leader</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Mandatory Credits</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Required for each rating level</li>
                  <li className="pl-1">Cannot be traded for other credits</li>
                  <li className="pl-1">Failure means certification at lower level</li>
                  <li className="pl-1">Examples: commissioning, water consumption, construction waste</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Innovation Credits</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Awarded for exemplary performance</li>
                  <li className="pl-1">Up to 10% additional score available</li>
                  <li className="pl-1">Can push projects into higher bands</li>
                  <li className="pl-1">Requires exceeding standard criteria thresholds</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Score Calculation Example</p>
              <div className="font-mono text-sm space-y-1">
                <p><span className="text-white/60">Energy category:</span> <span className="text-white">12 credits achieved × 19% weighting = 2.28% contribution</span></p>
                <p><span className="text-white/60">Health & Wellbeing:</span> <span className="text-white">9 credits achieved × 14% weighting = 1.26% contribution</span></p>
                <p><span className="text-white/60">All categories summed:</span> <span className="text-white">= Overall percentage score</span></p>
                <p><span className="text-white/60">Plus innovation:</span> <span className="text-white">+ Up to 10% additional</span></p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Target setting:</strong> Aim 5-10% above your target threshold to provide margin for credits that prove unachievable during construction.
            </p>
          </div>
        </section>

        {/* Section 3: Assessment Categories and Weightings */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Assessment Categories and Weightings
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BREEAM assesses buildings across nine environmental categories, each with different
              weightings that reflect their relative importance. Weightings vary slightly between
              building types and schemes, but the categories remain consistent.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Nine Assessment Categories (NC 2018 Offices)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Category</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Weighting</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key M&E Credits</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Energy (Ene)</td>
                      <td className="border border-white/10 px-3 py-2">15-19%</td>
                      <td className="border border-white/10 px-3 py-2">Energy performance, sub-metering, external lighting, low carbon technologies</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Health & Wellbeing (Hea)</td>
                      <td className="border border-white/10 px-3 py-2">14%</td>
                      <td className="border border-white/10 px-3 py-2">Visual comfort, indoor air quality, thermal comfort, acoustic performance</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Materials (Mat)</td>
                      <td className="border border-white/10 px-3 py-2">12.5%</td>
                      <td className="border border-white/10 px-3 py-2">Responsible sourcing, environmental impact of M&E products</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Management (Man)</td>
                      <td className="border border-white/10 px-3 py-2">12%</td>
                      <td className="border border-white/10 px-3 py-2">Commissioning, seasonal commissioning, building user guide, aftercare</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Land Use & Ecology (LE)</td>
                      <td className="border border-white/10 px-3 py-2">10%</td>
                      <td className="border border-white/10 px-3 py-2">Limited M&E impact (ecological enhancement of site)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Water (Wat)</td>
                      <td className="border border-white/10 px-3 py-2">6%</td>
                      <td className="border border-white/10 px-3 py-2">Water consumption, monitoring, leak detection</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Waste (Wst)</td>
                      <td className="border border-white/10 px-3 py-2">7.5%</td>
                      <td className="border border-white/10 px-3 py-2">Construction waste, operational waste, adaptability</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Pollution (Pol)</td>
                      <td className="border border-white/10 px-3 py-2">6.5%</td>
                      <td className="border border-white/10 px-3 py-2">Refrigerant GWP, NOx emissions, flood risk, surface water run-off</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Transport (Tra)</td>
                      <td className="border border-white/10 px-3 py-2">8%</td>
                      <td className="border border-white/10 px-3 py-2">EV charging provision, cyclist facilities</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Example Credits - Building Services Impact</p>
              <div className="space-y-3">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-1">Ene 01 - Reduction of energy use and carbon emissions (up to 15 credits)</p>
                  <p className="text-sm text-white/80">Based on Energy Performance Ratio (EPR) comparing actual design to Part L notional building. Requires approved dynamic thermal modelling. Higher credits for better performance beyond regulation.</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-1">Ene 02 - Energy monitoring (up to 2 credits)</p>
                  <p className="text-sm text-white/80">Sub-metering of major energy uses: heating, cooling, lighting, small power, renewables. Enables post-occupancy performance tracking and fault identification.</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-1">Hea 01 - Visual comfort (up to 4 credits)</p>
                  <p className="text-sm text-white/80">Daylighting levels, view out, glare control, high-frequency lighting (≥3,000 Hz), colour rendering (Ra ≥80). Directly affects lighting design specifications.</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-1">Pol 01 - Impact of refrigerants (up to 3 credits)</p>
                  <p className="text-sm text-white/80">Credits for low GWP refrigerants, leak detection systems, and eliminating refrigerants entirely. Affects HVAC system selection.</p>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design influence:</strong> Building services decisions directly impact approximately 50% of available BREEAM credits across Energy, Health, Water, and Pollution categories.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Assessment Process and Assessor Role */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Assessment Process and Assessor Role
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BREEAM assessment follows a structured process from early design through to post-construction
              verification. A licensed BREEAM assessor is required throughout, acting as the independent
              interface between the project team and BRE.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Assessment Process Stages</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Stage</th>
                      <th className="border border-white/10 px-3 py-2 text-left">RIBA Stage</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Activities</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Outputs</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Pre-Assessment</td>
                      <td className="border border-white/10 px-3 py-2">Stage 2</td>
                      <td className="border border-white/10 px-3 py-2">Credit targeting, feasibility review, cost implications</td>
                      <td className="border border-white/10 px-3 py-2">Pre-assessment report, target rating</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Registration</td>
                      <td className="border border-white/10 px-3 py-2">Stage 2-3</td>
                      <td className="border border-white/10 px-3 py-2">Project registration with BRE, fees paid</td>
                      <td className="border border-white/10 px-3 py-2">Registration confirmation, project ID</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Design Stage</td>
                      <td className="border border-white/10 px-3 py-2">Stage 3-4</td>
                      <td className="border border-white/10 px-3 py-2">Evidence collection, credit assessment, QA submission</td>
                      <td className="border border-white/10 px-3 py-2">Interim Design Stage certificate</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Post-Construction</td>
                      <td className="border border-white/10 px-3 py-2">Stage 6</td>
                      <td className="border border-white/10 px-3 py-2">As-built verification, commissioning evidence, final submission</td>
                      <td className="border border-white/10 px-3 py-2">Final BREEAM certificate</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Assessor Responsibilities</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Interpret BREEAM criteria for the project</li>
                  <li className="pl-1">Advise on credit achievement strategies</li>
                  <li className="pl-1">Collect and review evidence documentation</li>
                  <li className="pl-1">Complete assessment tool scoring</li>
                  <li className="pl-1">Submit to BRE for Quality Assurance</li>
                  <li className="pl-1">Address QA queries and corrections</li>
                  <li className="pl-1">Maintain independence from design team</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Design Team Responsibilities</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Integrate BREEAM requirements into design</li>
                  <li className="pl-1">Provide evidence documentation</li>
                  <li className="pl-1">Specifications referencing BREEAM criteria</li>
                  <li className="pl-1">Calculations and modelling outputs</li>
                  <li className="pl-1">Commissioning records and certificates</li>
                  <li className="pl-1">Product certifications (EPDs, FSC, etc.)</li>
                  <li className="pl-1">Respond to assessor queries promptly</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Evidence Types for M&E Credits</p>
              <div className="text-sm space-y-2">
                <p><strong>Design Stage:</strong> Specifications, design drawings, energy models (IES/TAS), daylight calculations, commissioning specifications, product data sheets with environmental certifications.</p>
                <p><strong>Post-Construction:</strong> As-built drawings, commissioning certificates, test results, sub-meter schedules, O&M manuals, building user guides, seasonal commissioning reports.</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Quality Assurance Process</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Submission:</strong> Assessor submits completed assessment via BREEAM Projects portal</li>
                <li className="pl-1"><strong>QA review:</strong> BRE auditor reviews evidence and scoring decisions</li>
                <li className="pl-1"><strong>Queries:</strong> Auditor raises Technical Questions (TQs) requiring clarification</li>
                <li className="pl-1"><strong>Response:</strong> Assessor provides additional evidence or justification</li>
                <li className="pl-1"><strong>Certification:</strong> Once satisfied, BRE issues the certificate</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Timing consideration:</strong> QA review typically takes 4-6 weeks. Allow sufficient time in the programme, especially if certification is needed for practical completion or funding drawdown.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Pre-Assessment Credit Targeting</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> A new office building targeting BREEAM Excellent (70%). Identify key M&E credits.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Target: 70% minimum (aim for 75% to provide margin)</p>
                <p className="mt-2">High-value M&E credits to target:</p>
                <p className="ml-4">Ene 01: 9 credits @ 19% = ~3.4% contribution</p>
                <p className="ml-4">Ene 02: 2 credits (sub-metering) = ~0.4%</p>
                <p className="ml-4">Hea 01: 3 credits (lighting quality) = ~0.6%</p>
                <p className="ml-4">Hea 04: 2 credits (thermal comfort) = ~0.4%</p>
                <p className="ml-4">Wat 01: 3 credits (water efficiency) = ~0.3%</p>
                <p className="ml-4">Pol 01: 2 credits (low GWP refrigerants) = ~0.2%</p>
                <p className="mt-2 text-green-400">M&E contribution: ~5.3% directly influenced</p>
                <p className="text-white/60 mt-2">Plus mandatory commissioning credits in Man category</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Energy Credit Evidence Requirements</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Demonstrating compliance with Ene 01 for an Excellent rating.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Ene 01 Evidence Checklist:</p>
                <p className="mt-2 ml-4">Design Stage:</p>
                <p className="ml-8">- Energy model (IES-VE or TAS) with BRUKL output</p>
                <p className="ml-8">- EPR calculation showing improvement over Part L</p>
                <p className="ml-8">- M&E specification with efficiency requirements</p>
                <p className="ml-8">- Drawings showing renewable energy systems</p>
                <p className="mt-2 ml-4">Post-Construction:</p>
                <p className="ml-8">- As-built energy model reflecting any changes</p>
                <p className="ml-8">- EPC certificate</p>
                <p className="ml-8">- Commissioning certificates for HVAC</p>
                <p className="ml-8">- Evidence renewables installed as designed</p>
                <p className="mt-2 text-green-400">Credits awarded: Based on actual EPR achieved</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Selecting the Correct BREEAM Scheme</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Client has three projects - advise on appropriate BREEAM scheme.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Project A: New-build warehouse</p>
                <p className="ml-4 text-green-400">→ BREEAM New Construction (Industrial)</p>
                <p className="ml-4 text-white/60">Design Stage + Post-Construction assessment</p>
                <p className="mt-2">Project B: Office fit-out in existing shell</p>
                <p className="ml-4 text-green-400">→ BREEAM Refurbishment & Fit-Out</p>
                <p className="ml-4 text-white/60">Part 3 (local services) + Part 4 (interior)</p>
                <p className="mt-2">Project C: Improving performance of existing HQ</p>
                <p className="ml-4 text-green-400">→ BREEAM In-Use</p>
                <p className="ml-4 text-white/60">Asset + Building Management assessments</p>
                <p className="ml-4 text-white/60">Annual recertification available</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Building Services Engineer's BREEAM Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Obtain target BREEAM rating and pre-assessment report early in design</li>
                <li className="pl-1">Review Energy, Health & Wellbeing, Water, and Pollution categories for M&E requirements</li>
                <li className="pl-1">Specify sub-metering strategy aligned with Ene 02 requirements</li>
                <li className="pl-1">Include BREEAM compliance clauses in M&E specifications</li>
                <li className="pl-1">Coordinate with assessor on evidence requirements at each stage</li>
                <li className="pl-1">Plan commissioning to satisfy Man 01 (commissioning) and Man 04 (seasonal commissioning)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Thresholds to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Pass: <strong>≥30%</strong> | Good: <strong>≥45%</strong> | Very Good: <strong>≥55%</strong></li>
                <li className="pl-1">Excellent: <strong>≥70%</strong> | Outstanding: <strong>≥85%</strong></li>
                <li className="pl-1">Innovation credits: Up to <strong>10% additional</strong></li>
                <li className="pl-1">Energy category weighting: <strong>15-19%</strong> (highest)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Late engagement:</strong> BREEAM considered after design freeze limits achievable rating</li>
                <li className="pl-1"><strong>Missing mandatory credits:</strong> Prevents certification regardless of overall score</li>
                <li className="pl-1"><strong>Specification gaps:</strong> Not including BREEAM requirements in M&E specs</li>
                <li className="pl-1"><strong>Evidence management:</strong> Poor documentation makes post-construction verification difficult</li>
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
                <p className="font-medium text-white mb-1">BREEAM Schemes</p>
                <ul className="space-y-0.5">
                  <li>New Construction - new builds and extensions</li>
                  <li>Refurbishment & Fit-Out - existing building upgrades</li>
                  <li>In-Use - operational buildings</li>
                  <li>Communities - masterplanning scale</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Rating Thresholds</p>
                <ul className="space-y-0.5">
                  <li>Pass ≥30% | Good ≥45%</li>
                  <li>Very Good ≥55% | Excellent ≥70%</li>
                  <li>Outstanding ≥85%</li>
                  <li>+ Innovation up to 10%</li>
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
            <Link to="../h-n-c-module6-section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module6-section3-2">
              Next: BREEAM Categories
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule6Section3_1;
