import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Compliance and Verification - HNC Module 2 Section 6.6";
const DESCRIPTION = "Master building services compliance and verification: Part L Building Regulations, BREEAM assessment, NABERS UK, post-occupancy evaluation, Soft Landings, and Display Energy Certificates.";

const quickCheckQuestions = [
  {
    id: "part-l-purpose",
    question: "What is the primary purpose of Part L of the Building Regulations?",
    options: ["Fire safety", "Conservation of fuel and power", "Structural stability", "Sound insulation"],
    correctIndex: 1,
    explanation: "Part L 'Conservation of fuel and power' sets requirements for energy efficiency in new and renovated buildings, including fabric performance, system efficiency, and carbon emission limits."
  },
  {
    id: "breeam-rating",
    question: "What is the highest BREEAM rating achievable?",
    options: ["Excellent", "Outstanding", "Platinum", "A+++"],
    correctIndex: 1,
    explanation: "BREEAM ratings are: Pass, Good, Very Good, Excellent, and Outstanding. Outstanding (≥85%) represents exemplary performance and requires exceptional levels of sustainability."
  },
  {
    id: "dec-basis",
    question: "Display Energy Certificates (DECs) are based on:",
    options: ["Design calculations", "Actual metered energy consumption", "Building Regulations compliance", "Equipment specifications"],
    correctIndex: 1,
    explanation: "DECs use actual metered energy consumption (operational rating) compared against TM46 benchmarks. This differs from EPCs which use design-stage calculations (asset rating)."
  },
  {
    id: "poe-timing",
    question: "Post-Occupancy Evaluation should ideally be conducted:",
    options: ["Before practical completion", "Immediately after handover only", "At 12 months and ongoing", "Only if problems occur"],
    correctIndex: 2,
    explanation: "POE should be conducted at 12 months (after seasonal variation) and repeated periodically. This allows assessment of actual performance against design intent and identification of optimisation opportunities."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Part L 2021 introduced which significant change for new buildings?",
    options: [
      "Removal of carbon emission targets",
      "30-31% reduction in carbon emissions compared to Part L 2013",
      "Mandatory renewable energy only",
      "Removal of fabric standards"
    ],
    correctAnswer: 1,
    explanation: "Part L 2021 introduced approximately 30-31% reduction in carbon emissions for new buildings compared to Part L 2013, as a stepping stone towards the Future Homes/Buildings Standard."
  },
  {
    id: 2,
    question: "BREEAM stands for:",
    options: [
      "Building Research Establishment Environmental Assessment Method",
      "British Regulations for Energy and Environmental Assessment Methods",
      "Building Rating for Energy Efficiency and Management",
      "BRE Energy Assessment Methodology"
    ],
    correctAnswer: 0,
    explanation: "BREEAM is the Building Research Establishment Environmental Assessment Method, the world's leading sustainability assessment method for buildings, covering multiple environmental categories."
  },
  {
    id: 3,
    question: "Which BREEAM category covers energy performance?",
    options: [
      "Man (Management)",
      "Hea (Health and Wellbeing)",
      "Ene (Energy)",
      "Pol (Pollution)"
    ],
    correctAnswer: 2,
    explanation: "The Ene (Energy) category covers energy efficiency measures including Part L compliance, sub-metering, energy-efficient systems, and renewable energy provision."
  },
  {
    id: 4,
    question: "NABERS UK is primarily used for:",
    options: [
      "New building design assessment",
      "Rating operational energy performance of existing offices",
      "Residential building assessment",
      "Construction site environmental management"
    ],
    correctAnswer: 1,
    explanation: "NABERS UK (National Australian Built Environment Rating System) rates the operational energy performance of existing office buildings based on actual measured consumption, with ratings from 1 to 6 stars."
  },
  {
    id: 5,
    question: "A building has a DEC rating of 120. This indicates:",
    options: [
      "Excellent performance",
      "Typical performance",
      "Performance 20% worse than the TM46 benchmark",
      "Not enough data"
    ],
    correctAnswer: 2,
    explanation: "A DEC rating of 120 means the building uses 120% of the TM46 typical benchmark energy - i.e., 20% more than the typical building of that type. Lower numbers indicate better performance."
  },
  {
    id: 6,
    question: "Which organisation administers BREEAM?",
    options: [
      "CIBSE",
      "BRE (Building Research Establishment)",
      "RIBA",
      "BSI"
    ],
    correctAnswer: 1,
    explanation: "BREEAM is administered by BRE Global, part of the Building Research Establishment. Assessments must be conducted by licensed BREEAM assessors."
  },
  {
    id: 7,
    question: "Post-Occupancy Evaluation (POE) typically includes:",
    options: [
      "Design calculations only",
      "Building user surveys, energy analysis, and environmental monitoring",
      "Structural surveys",
      "Legal compliance checks only"
    ],
    correctAnswer: 1,
    explanation: "POE includes: energy consumption analysis; environmental monitoring (temperature, CO2, lighting); building user surveys (satisfaction, comfort); and comparison against design predictions."
  },
  {
    id: 8,
    question: "The Soft Landings framework was developed by:",
    options: [
      "UK Government",
      "BSRIA and Usable Buildings Trust",
      "ASHRAE",
      "European Commission"
    ],
    correctAnswer: 1,
    explanation: "Soft Landings was developed by BSRIA and the Usable Buildings Trust to address the performance gap and ensure buildings perform as intended through structured handover and aftercare."
  },
  {
    id: 9,
    question: "EPCs are required for buildings when:",
    options: [
      "Building any extension",
      "Building is sold, rented, or constructed",
      "Every 5 years",
      "Only for commercial buildings"
    ],
    correctAnswer: 1,
    explanation: "Energy Performance Certificates are required when a building is constructed, sold, or let. They are valid for 10 years and rate the building's energy efficiency on an A-G scale."
  },
  {
    id: 10,
    question: "BREEAM 'In-Use' is designed for:",
    options: [
      "New construction only",
      "Assessing operational performance of existing buildings",
      "Refurbishment projects only",
      "Residential buildings"
    ],
    correctAnswer: 1,
    explanation: "BREEAM In-Use assesses the environmental performance of existing operational buildings across three parts: Asset (building), Management (processes), and Occupier (user behaviour)."
  },
  {
    id: 11,
    question: "Which Part L requirement applies to existing buildings undergoing renovation?",
    options: [
      "Part L1A",
      "Part L1B",
      "Part L2A",
      "Part L2B"
    ],
    correctAnswer: 3,
    explanation: "Part L2B covers existing non-domestic buildings undergoing renovation. It sets requirements for elements being replaced or renovated, thermal bridging, and consequential improvements."
  },
  {
    id: 12,
    question: "The 'Future Buildings Standard' is expected to require:",
    options: [
      "All buildings heated by gas boilers",
      "Buildings to be net zero carbon ready with no fossil fuel heating",
      "Reduced insulation standards",
      "Removal of renewable energy requirements"
    ],
    correctAnswer: 1,
    explanation: "The Future Buildings Standard (expected 2025) will require non-domestic buildings to be 'net zero ready' - highly efficient with low-carbon heating systems and no connection to fossil fuel networks."
  }
];

const faqs = [
  {
    question: "What's the difference between an EPC and a DEC?",
    answer: "An EPC (Energy Performance Certificate) is based on design-stage calculations using standardised assumptions - it's an 'asset rating' of the building itself. A DEC (Display Energy Certificate) uses actual metered consumption - it's an 'operational rating' of how the building performs in practice. EPCs are required for sales/lettings; DECs are required for public buildings over 250m²."
  },
  {
    question: "Is BREEAM mandatory?",
    answer: "BREEAM is voluntary except where required by planning conditions, funding bodies, or client policies. However, many local authorities require BREEAM for planning approval, and government projects typically require BREEAM Excellent. The commercial property market increasingly expects BREEAM certification for prime office space."
  },
  {
    question: "How does Part L 2021 differ from previous versions?",
    answer: "Part L 2021 introduced: 30-31% reduction in carbon targets; new fabric performance metrics (including thermal bridging limits); updated notional building specifications; enhanced commissioning requirements; photographic evidence of key build stages; and mandatory as-built energy modelling. It represents a significant step towards the Future Buildings Standard."
  },
  {
    question: "What is a 'consequential improvement' under Part L?",
    answer: "When significant building work is undertaken (extensions, major renovations), Part L may require 'consequential improvements' to the existing building's energy efficiency - such as upgrading heating systems or adding controls. This applies to buildings over 1,000m² when work affects more than 25% of the building envelope or involves major plant changes."
  },
  {
    question: "How often should Post-Occupancy Evaluation be conducted?",
    answer: "Best practice (e.g., Soft Landings) recommends: initial review at 1 month; detailed POE at 12 months (after seasonal variation); annual reviews for 3 years; and periodic reviews thereafter. Energy monitoring should be continuous. This ongoing approach identifies problems early and supports continuous improvement."
  },
  {
    question: "What's the relationship between BREEAM and Part L?",
    answer: "Part L is a mandatory Building Regulation - minimum legal compliance for energy efficiency. BREEAM is a voluntary (unless required by planning) sustainability assessment that goes beyond Part L in multiple categories. BREEAM Ene 01 credits are linked to performance beyond Part L requirements - achieving credits requires exceeding minimum compliance."
  }
];

const HNCModule2Section6_6 = () => {
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
            <span>Module 2.6.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Compliance and Verification
          </h1>
          <p className="text-white/80">
            Building Regulations, BREEAM, NABERS, post-occupancy evaluation, and performance verification
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Part L:</strong> Mandatory energy regulations</li>
              <li className="pl-1"><strong>BREEAM:</strong> Voluntary sustainability rating</li>
              <li className="pl-1"><strong>DEC:</strong> Operational energy certificate</li>
              <li className="pl-1"><strong>POE:</strong> Verifies actual performance</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Compliance Hierarchy</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Legal minimum:</strong> Part L compliance</li>
              <li className="pl-1"><strong>Planning:</strong> Often requires BREEAM</li>
              <li className="pl-1"><strong>Best practice:</strong> POE and Soft Landings</li>
              <li className="pl-1"><strong>Market demand:</strong> NABERS, WELL, sustainability</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand Part L Building Regulations requirements",
              "Describe BREEAM assessment categories and ratings",
              "Explain NABERS UK operational rating system",
              "Conduct post-occupancy evaluation",
              "Apply Soft Landings framework principles",
              "Interpret Display Energy Certificates"
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

        {/* Section 1: Part L Building Regulations */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Part L Building Regulations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Part L of the Building Regulations sets mandatory requirements for the conservation of
              fuel and power in buildings. It applies to new buildings and certain works to existing
              buildings, covering fabric performance, building services efficiency, and carbon emissions.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Part L Structure (England)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Document</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Applies To</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Requirements</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Part L1A</td>
                      <td className="border border-white/10 px-3 py-2">New dwellings</td>
                      <td className="border border-white/10 px-3 py-2">TER/DER comparison</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Part L1B</td>
                      <td className="border border-white/10 px-3 py-2">Existing dwellings</td>
                      <td className="border border-white/10 px-3 py-2">Works standards</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Part L2A</td>
                      <td className="border border-white/10 px-3 py-2">New non-domestic</td>
                      <td className="border border-white/10 px-3 py-2">BER/TER + BBER/BTBER</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Part L2B</td>
                      <td className="border border-white/10 px-3 py-2">Existing non-domestic</td>
                      <td className="border border-white/10 px-3 py-2">Consequential improvements</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key Part L 2021 Requirements:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Carbon targets:</strong> BER must not exceed TER (30-31% below Part L 2013)</li>
                <li className="pl-1"><strong>Fabric standards:</strong> Limiting U-values for elements</li>
                <li className="pl-1"><strong>Primary energy:</strong> BBER must not exceed BTBER</li>
                <li className="pl-1"><strong>Thermal bridging:</strong> Accredited details or calculations</li>
                <li className="pl-1"><strong>Air tightness:</strong> Testing required (&lt;5 m³/h/m² at 50Pa)</li>
                <li className="pl-1"><strong>Commissioning:</strong> Building log book required</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Compliance Demonstration</p>
              <ol className="text-sm text-white space-y-1 list-decimal list-outside ml-5">
                <li>Design stage calculations (SBEM or DSM)</li>
                <li>As-built calculations reflecting actual construction</li>
                <li>Air tightness testing</li>
                <li>Commissioning of building services</li>
                <li>Production of building log book</li>
                <li>Production of EPC</li>
              </ol>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Future direction:</strong> The Future Buildings Standard (expected 2025) will
              further tighten requirements, requiring net zero ready buildings with no fossil fuel heating.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: BREEAM */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            BREEAM Assessment
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BREEAM is the world's leading sustainability assessment method for buildings. While
              voluntary, it is often required by planning authorities, funding bodies, and clients
              seeking to demonstrate environmental commitment.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BREEAM Categories and Weightings (UK NC 2018)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Category</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Weighting</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Credits</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Energy (Ene)</td>
                      <td className="border border-white/10 px-3 py-2">15%</td>
                      <td className="border border-white/10 px-3 py-2">Beyond Part L, metering, efficiency</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Health & Wellbeing (Hea)</td>
                      <td className="border border-white/10 px-3 py-2">14%</td>
                      <td className="border border-white/10 px-3 py-2">Daylight, thermal comfort, air quality</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Materials (Mat)</td>
                      <td className="border border-white/10 px-3 py-2">13.5%</td>
                      <td className="border border-white/10 px-3 py-2">Environmental impact, responsible sourcing</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Management (Man)</td>
                      <td className="border border-white/10 px-3 py-2">11.5%</td>
                      <td className="border border-white/10 px-3 py-2">Soft Landings, commissioning</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Water (Wat)</td>
                      <td className="border border-white/10 px-3 py-2">6%</td>
                      <td className="border border-white/10 px-3 py-2">Consumption reduction, metering</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Transport (Tra)</td>
                      <td className="border border-white/10 px-3 py-2">9%</td>
                      <td className="border border-white/10 px-3 py-2">Public transport, cycling facilities</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Land Use & Ecology (LE)</td>
                      <td className="border border-white/10 px-3 py-2">10%</td>
                      <td className="border border-white/10 px-3 py-2">Site ecology enhancement</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Waste (Wst)</td>
                      <td className="border border-white/10 px-3 py-2">7%</td>
                      <td className="border border-white/10 px-3 py-2">Construction waste, operational waste</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Pollution (Pol)</td>
                      <td className="border border-white/10 px-3 py-2">7%</td>
                      <td className="border border-white/10 px-3 py-2">Refrigerant impact, NOx emissions</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Innovation</td>
                      <td className="border border-white/10 px-3 py-2">+10%</td>
                      <td className="border border-white/10 px-3 py-2">Exemplary performance, innovation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BREEAM Ratings</p>
              <div className="grid grid-cols-5 gap-2 text-center text-sm">
                <div className="p-2 rounded bg-white/5">
                  <p className="font-bold text-white">Pass</p>
                  <p className="text-white/70 text-xs">≥30%</p>
                </div>
                <div className="p-2 rounded bg-white/5">
                  <p className="font-bold text-white">Good</p>
                  <p className="text-white/70 text-xs">≥45%</p>
                </div>
                <div className="p-2 rounded bg-white/5">
                  <p className="font-bold text-white">Very Good</p>
                  <p className="text-white/70 text-xs">≥55%</p>
                </div>
                <div className="p-2 rounded bg-white/5">
                  <p className="font-bold text-green-400">Excellent</p>
                  <p className="text-white/70 text-xs">≥70%</p>
                </div>
                <div className="p-2 rounded bg-white/5">
                  <p className="font-bold text-elec-yellow">Outstanding</p>
                  <p className="text-white/70 text-xs">≥85%</p>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Market expectation:</strong> BREEAM Excellent is increasingly the minimum for
              prime commercial office space in major UK cities.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: NABERS and DECs */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            NABERS UK and Display Energy Certificates
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Operational energy ratings measure actual building performance, providing accountability
              that design-stage ratings cannot. NABERS UK and DECs both serve this purpose using
              different methodologies.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">NABERS UK Energy Rating</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Origin:</strong> Adapted from successful Australian scheme</li>
                <li className="pl-1"><strong>Application:</strong> Office buildings (base building and tenancy)</li>
                <li className="pl-1"><strong>Basis:</strong> Actual energy consumption normalised for climate, hours, occupancy</li>
                <li className="pl-1"><strong>Rating:</strong> 1-6 stars (6 stars = market-leading performance)</li>
                <li className="pl-1"><strong>Use:</strong> Design for Performance, investor requirements</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Display Energy Certificates (DECs)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Aspect</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Requirement</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Required for</td>
                      <td className="border border-white/10 px-3 py-2">Public buildings &gt;250m² with public access</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Data basis</td>
                      <td className="border border-white/10 px-3 py-2">12 months actual metered consumption</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Benchmark</td>
                      <td className="border border-white/10 px-3 py-2">CIBSE TM46 typical values</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Rating scale</td>
                      <td className="border border-white/10 px-3 py-2">A-G (A = best, 100 = typical)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Validity</td>
                      <td className="border border-white/10 px-3 py-2">1 year (must be renewed annually)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Advisory report</td>
                      <td className="border border-white/10 px-3 py-2">Required every 7 years</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">DEC vs EPC Comparison</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-white mb-1">EPC (Asset Rating)</p>
                  <ul className="text-white/80 space-y-0.5 list-disc list-outside ml-5">
                    <li>Based on design calculations</li>
                    <li>Standard occupancy assumptions</li>
                    <li>Valid 10 years</li>
                    <li>Required for sale/let</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white mb-1">DEC (Operational Rating)</p>
                  <ul className="text-white/80 space-y-0.5 list-disc list-outside ml-5">
                    <li>Based on actual consumption</li>
                    <li>Reflects real operation</li>
                    <li>Valid 1 year</li>
                    <li>Required for public buildings</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Trend:</strong> Operational ratings are increasingly valued by investors and
              tenants who want evidence of actual performance, not just design intent.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Post-Occupancy Evaluation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Post-Occupancy Evaluation and Soft Landings
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Post-Occupancy Evaluation (POE) systematically assesses building performance after
              occupation. Combined with the Soft Landings framework, it closes the feedback loop
              between design intent and operational reality.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">POE Components</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Component</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Method</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Energy analysis</td>
                      <td className="border border-white/10 px-3 py-2">Meter data vs TM54 prediction</td>
                      <td className="border border-white/10 px-3 py-2">Identify performance gap</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">User surveys</td>
                      <td className="border border-white/10 px-3 py-2">BUS methodology or similar</td>
                      <td className="border border-white/10 px-3 py-2">Occupant satisfaction</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Environmental monitoring</td>
                      <td className="border border-white/10 px-3 py-2">Temperature, CO2, humidity</td>
                      <td className="border border-white/10 px-3 py-2">Comfort conditions</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Walkthrough</td>
                      <td className="border border-white/10 px-3 py-2">Physical inspection</td>
                      <td className="border border-white/10 px-3 py-2">Defects, usability issues</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">BMS review</td>
                      <td className="border border-white/10 px-3 py-2">Control strategy analysis</td>
                      <td className="border border-white/10 px-3 py-2">Optimisation opportunities</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Soft Landings Framework</p>
              <ol className="text-sm text-white space-y-1.5 list-decimal list-outside ml-5">
                <li className="pl-1"><strong>Stage 1 - Inception:</strong> Set performance targets and POE plan</li>
                <li className="pl-1"><strong>Stage 2 - Design:</strong> Reality checks, buildability reviews</li>
                <li className="pl-1"><strong>Stage 3 - Pre-handover:</strong> Prepare for operation, training</li>
                <li className="pl-1"><strong>Stage 4 - Initial aftercare:</strong> Intensive support (weeks 1-4)</li>
                <li className="pl-1"><strong>Stage 5 - Extended aftercare:</strong> Monitoring and tuning (3 years)</li>
              </ol>
            </div>

            <div className="my-6 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
              <p className="text-sm font-medium text-green-400 mb-2">POE Benefits</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Identifies issues before they become embedded problems</li>
                <li className="pl-1">Validates design decisions for future projects</li>
                <li className="pl-1">Supports energy optimisation and cost savings</li>
                <li className="pl-1">Improves occupant satisfaction and productivity</li>
                <li className="pl-1">Provides feedback to design teams</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>BREEAM credit:</strong> Man 04 provides credits for Soft Landings commitment,
              recognising the value of structured aftercare in achieving design performance.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Part L Compliance Check</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> New office building SBEM results.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Calculation results:</p>
                <p>TER (Target Emission Rate): 28.5 kgCO₂/m²/year</p>
                <p>BER (Building Emission Rate): 25.2 kgCO₂/m²/year</p>
                <p className="mt-2">BTBER (Target Primary Energy): 145 kWh/m²/year</p>
                <p>BBER (Building Primary Energy): 132 kWh/m²/year</p>
                <p className="mt-2">Compliance check:</p>
                <p>BER (25.2) ≤ TER (28.5) ✓</p>
                <p>BBER (132) ≤ BTBER (145) ✓</p>
                <p className="mt-2 text-green-400">Building COMPLIES with Part L 2021</p>
                <p className="mt-2">Margin: 11.6% below TER (headroom for as-built)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: DEC Rating Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> School building annual energy consumption.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Building data:</p>
                <p>Floor area: 3,500 m² (GIA)</p>
                <p>Electricity: 185,000 kWh/year</p>
                <p>Gas: 420,000 kWh/year</p>
                <p className="mt-2">Energy Use Intensity:</p>
                <p>Electricity: 185,000 / 3,500 = 52.9 kWh/m²</p>
                <p>Gas: 420,000 / 3,500 = 120 kWh/m²</p>
                <p className="mt-2">TM46 typical (schools):</p>
                <p>Electricity: 41 kWh/m², Fossil: 150 kWh/m²</p>
                <p className="mt-2">CO₂ calculation:</p>
                <p>Actual: (52.9 × 0.233) + (120 × 0.184) = 34.4 kgCO₂/m²</p>
                <p>Typical: (41 × 0.233) + (150 × 0.184) = 37.1 kgCO₂/m²</p>
                <p className="mt-2">DEC Rating: (34.4 / 37.1) × 100 = <strong>93 (Band D)</strong></p>
                <p className="text-green-400">School performs better than typical</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: BREEAM Energy Credits</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Office targeting BREEAM Excellent - Ene 01 credits.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Ene 01 credit requirements:</p>
                <p className="mt-2">EPRNC (Energy Performance Ratio - New Construction)</p>
                <p>= (BER × 1.0 + BBER × 0.5) / (TER × 1.0 + BTBER × 0.5)</p>
                <p className="mt-2">Building data:</p>
                <p>BER: 22 kgCO₂/m², TER: 28 kgCO₂/m²</p>
                <p>BBER: 115 kWh/m², BTBER: 145 kWh/m²</p>
                <p className="mt-2">EPRNC = (22 + 57.5) / (28 + 72.5) = 79.5 / 100.5 = 0.79</p>
                <p className="mt-2">EPRNC of 0.79 = 21% improvement over Part L</p>
                <p className="text-green-400">→ 5 Ene 01 credits (BREEAM 2018 scoring)</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Compliance Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Part L calculations (design stage and as-built)</li>
                <li className="pl-1">Air tightness testing</li>
                <li className="pl-1">Commissioning certificates</li>
                <li className="pl-1">Building log book</li>
                <li className="pl-1">EPC certificate</li>
                <li className="pl-1">BREEAM assessment (if required)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">POE Planning</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Define POE scope and budget at project inception</li>
                <li className="pl-1">Install sub-metering for meaningful energy analysis</li>
                <li className="pl-1">Plan user surveys at 12 months</li>
                <li className="pl-1">Allow for seasonal commissioning verification</li>
                <li className="pl-1">Document design intent for comparison</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Compliance Issues</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>As-built differs from design:</strong> Re-run calculations</li>
                <li className="pl-1"><strong>Air tightness failure:</strong> Remediate and retest</li>
                <li className="pl-1"><strong>Missing commissioning:</strong> Cannot sign off without</li>
                <li className="pl-1"><strong>Log book incomplete:</strong> Part L requirement</li>
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
                  <li>BER ≤ TER (carbon)</li>
                  <li>BBER ≤ BTBER (primary energy)</li>
                  <li>Air tightness testing</li>
                  <li>Building log book required</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">BREEAM Ratings</p>
                <ul className="space-y-0.5">
                  <li>Pass ≥30%, Good ≥45%</li>
                  <li>Very Good ≥55%</li>
                  <li>Excellent ≥70%</li>
                  <li>Outstanding ≥85%</li>
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
            <Link to="../h-n-c-module2-section6-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../hnc">
              Back to HNC
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule2Section6_6;
