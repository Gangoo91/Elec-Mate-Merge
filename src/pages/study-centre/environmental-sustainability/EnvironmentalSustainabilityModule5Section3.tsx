import { ArrowLeft, Leaf, CheckCircle, AlertTriangle, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

/* ───────────────────────── Quick-check questions ───────────────────────── */

const quickCheckQuestions = [
  {
    id: "breeam-origin",
    question:
      "When and where was BREEAM first developed?",
    options: [
      "In 1990 by the Building Research Establishment (BRE) in the UK — the world's first green building certification scheme",
      "In 2000 by the US Green Building Council as part of the LEED programme",
      "In 1985 by the European Commission as a mandatory building standard",
      "In 2010 by the World Green Building Council as a global framework",
    ],
    correctIndex: 0,
    explanation:
      "BREEAM (Building Research Establishment Environmental Assessment Method) was developed in 1990 by the BRE in the UK. It was the world's first green building certification scheme and has since become the most widely used sustainability assessment method globally, with over 2.3 million buildings registered for assessment in more than 90 countries.",
  },
  {
    id: "breeam-construction-workers",
    question:
      "Which of the following is a key BREEAM requirement that directly affects construction workers on site?",
    options: [
      "Considerate construction practices, including responsible site management, resource efficiency, and ecological protection during the build",
      "Workers must individually apply for BREEAM certification before starting on site",
      "BREEAM only applies to the design stage and does not affect construction workers",
      "Workers must pass a BREEAM examination before being allowed to work on certified projects",
    ],
    correctIndex: 0,
    explanation:
      "BREEAM has specific credits related to construction site management that directly affect workers. These include responsible construction practices (often linked to Considerate Constructors Scheme registration), resource efficiency on site, waste minimisation, pollution prevention, and ecological protection. Workers need to understand these requirements to ensure the project achieves its target BREEAM credits.",
  },
  {
    id: "future-homes-standard",
    question:
      "What is the primary aim of the Future Homes Standard 2025?",
    options: [
      "To ensure new homes produce 75–80% less carbon emissions than those built under current regulations, primarily through improved fabric efficiency and low-carbon heating",
      "To ban all gas boilers in existing homes by 2025",
      "To require all homes to achieve BREEAM Outstanding rating",
      "To mandate solar panels on every new commercial building",
    ],
    correctIndex: 0,
    explanation:
      "The Future Homes Standard 2025 aims to ensure that new homes built from 2025 onwards produce 75–80% less carbon emissions compared to those built under the 2013 Building Regulations. This is achieved through significantly improved fabric efficiency (better insulation, reduced thermal bridging, improved airtightness) and the use of low-carbon heating systems such as heat pumps. It represents the biggest change to Building Regulations in a generation.",
  },
];

/* ──────────────────────────────── FAQs ─────────────────────────────────── */

const faqs = [
  {
    question:
      "Does BREEAM only apply to new buildings, or can it be used for existing ones too?",
    answer:
      "BREEAM applies to both new and existing buildings. BREEAM New Construction covers new-build projects, while BREEAM In-Use assesses the operational performance of existing buildings. There is also BREEAM Refurbishment and Fit-Out for renovation projects. Each scheme has its own set of criteria tailored to the building's lifecycle stage. This means that whether you are working on a new-build, a refurbishment, or maintaining an existing building, BREEAM can be applied to assess and improve its environmental performance.",
  },
  {
    question:
      "What is the difference between BREEAM and LEED, and which is used in the UK?",
    answer:
      "BREEAM is the standard predominantly used in the UK and across Europe. It was developed by the BRE in the UK in 1990 and is tailored to UK building standards and climate. LEED (Leadership in Energy and Environmental Design) was developed by the US Green Building Council and is primarily used in North America and international markets. While both assess similar environmental categories, their scoring methods, weightings, and benchmarks differ significantly. In the UK, BREEAM is almost always the preferred choice, and many local planning authorities require BREEAM certification for major developments.",
  },
  {
    question:
      "As an electrician, how does BREEAM affect the work I do on site?",
    answer:
      "BREEAM affects electricians in several important ways. Energy-efficient lighting systems (LEDs, daylight-linked controls, presence detection) are typically specified to earn BREEAM Energy credits. Sub-metering of energy consumption is often required, meaning you may need to install energy monitoring equipment. Electrical systems must be designed to minimise energy waste, and you may be involved in installing renewable energy systems such as solar PV or EV charging points. On site, you are expected to follow responsible construction practices — minimising waste, segregating materials for recycling, and avoiding pollution. Understanding these BREEAM requirements helps you contribute to the project achieving its sustainability targets.",
  },
  {
    question:
      "What is Passivhaus and how does it differ from BREEAM?",
    answer:
      "Passivhaus (Passive House) is a rigorous energy efficiency standard that originated in Germany. Unlike BREEAM, which is a broad sustainability assessment covering multiple categories (energy, water, materials, ecology, etc.), Passivhaus focuses specifically on ultra-low energy performance. A Passivhaus building uses up to 90% less energy for heating and cooling than a conventional building, achieved through exceptional insulation, airtightness, triple glazing, thermal bridge-free construction, and mechanical ventilation with heat recovery (MVHR). While BREEAM is an assessment and rating tool, Passivhaus is a performance standard — buildings must meet strict measured targets for heating demand, primary energy, and airtightness to achieve certification.",
  },
];

/* ──────────────────────────── Quiz questions ───────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      "What does BREEAM stand for, and when was it first established?",
    options: [
      "Building Research Establishment Environmental Assessment Method — first established in 1990",
      "British Renewable Energy and Environmental Assessment Method — first established in 2000",
      "Building Regulations for Energy Efficiency and Management — first established in 1995",
      "British Research into Ecological and Environmental Architecture Management — first established in 1985",
    ],
    correctAnswer: 0,
    explanation:
      "BREEAM stands for Building Research Establishment Environmental Assessment Method. It was first established in 1990 by the BRE in the UK, making it the world's first green building certification scheme. It has since been used to assess over 2.3 million buildings in more than 90 countries worldwide.",
  },
  {
    id: 2,
    question:
      "Which BREEAM rating level represents the highest achievable standard?",
    options: [
      "Excellent",
      "Outstanding",
      "Very Good",
      "Exceptional",
    ],
    correctAnswer: 1,
    explanation:
      "Outstanding is the highest BREEAM rating level, requiring a score of 85% or above. The full rating scale from lowest to highest is: Pass (30%+), Good (45%+), Very Good (55%+), Excellent (70%+), and Outstanding (85%+). Achieving Outstanding demonstrates exemplary sustainability performance and innovation.",
  },
  {
    id: 3,
    question:
      "How many assessment categories does BREEAM use, and which category typically carries the highest weighting?",
    options: [
      "10 categories — Energy typically carries the highest weighting at around 19%",
      "5 categories — Water carries the highest weighting at 30%",
      "8 categories — Management carries the highest weighting at 25%",
      "12 categories — Innovation carries the highest weighting at 20%",
    ],
    correctAnswer: 0,
    explanation:
      "BREEAM uses 10 assessment categories: Management, Health & Wellbeing, Energy, Transport, Water, Materials, Waste, Land Use & Ecology, Pollution, and Innovation. Energy typically carries the highest weighting at around 19% of the overall score, reflecting the critical importance of energy efficiency in sustainable building performance.",
  },
  {
    id: 4,
    question:
      "What is CEEQUAL primarily used to assess?",
    options: [
      "Residential housing developments",
      "Civil engineering, infrastructure, and landscaping projects",
      "Retail and commercial fit-outs only",
      "Demolition and site clearance projects",
    ],
    correctAnswer: 1,
    explanation:
      "CEEQUAL is the sustainability assessment, rating, and awards scheme specifically designed for civil engineering, infrastructure, landscaping, and public realm projects. It fills the gap that BREEAM does not cover — projects such as roads, bridges, tunnels, railways, water treatment works, flood defences, and other infrastructure. Like BREEAM, it was developed by BRE and uses a similar credit-based scoring system.",
  },
  {
    id: 5,
    question:
      "Which building standard focuses specifically on ultra-low energy performance, requiring buildings to use up to 90% less energy for heating and cooling?",
    options: [
      "BREEAM Outstanding",
      "LEED Platinum",
      "Passivhaus (Passive House)",
      "WELL Building Standard",
    ],
    correctAnswer: 2,
    explanation:
      "Passivhaus (Passive House) is the standard that focuses specifically on ultra-low energy performance. Originating in Germany, it requires buildings to meet strict measured targets for space heating demand (15 kWh/m2/year or less), primary energy demand, and airtightness (0.6 ACH at 50 Pa). This is achieved through exceptional insulation, airtightness, triple glazing, thermal bridge-free construction, and mechanical ventilation with heat recovery (MVHR).",
  },
  {
    id: 6,
    question:
      "What does Part L of the Building Regulations cover?",
    options: [
      "Structural safety and foundation design",
      "Conservation of fuel and power — energy efficiency requirements for buildings",
      "Fire safety and means of escape",
      "Drainage and waste disposal",
    ],
    correctAnswer: 1,
    explanation:
      "Part L of the Building Regulations covers the conservation of fuel and power. It sets minimum standards for the energy efficiency of new and existing buildings, covering insulation, heating systems, lighting, ventilation, and renewable energy. Part L has been progressively tightened over the years and is a key mechanism for reducing carbon emissions from the built environment. It applies to both new construction and refurbishment work.",
  },
  {
    id: 7,
    question:
      "What percentage reduction in carbon emissions does the Future Homes Standard 2025 aim to achieve for new homes compared to 2013 regulations?",
    options: [
      "25–30% reduction",
      "50–55% reduction",
      "75–80% reduction",
      "100% reduction (net zero)",
    ],
    correctAnswer: 2,
    explanation:
      "The Future Homes Standard 2025 aims for a 75–80% reduction in carbon emissions for new homes compared to those built under the 2013 Building Regulations. This is achieved through significantly improved fabric efficiency and the use of low-carbon heating systems such as heat pumps. The standard represents the biggest change to Building Regulations for residential construction in a generation and is a key step towards the UK's net-zero target.",
  },
  {
    id: 8,
    question:
      "Which of the following is a documented benefit of achieving green building certification?",
    options: [
      "Green-certified buildings consistently show higher energy costs due to complex systems",
      "Reduced energy costs, improved occupant health and productivity, and higher rental and sale values",
      "Green-certified buildings are exempt from all future Building Regulations changes",
      "Green certification guarantees zero carbon emissions throughout the building's lifecycle",
    ],
    correctAnswer: 1,
    explanation:
      "Green-certified buildings consistently demonstrate multiple benefits: reduced energy and water costs (typically 20–30% lower energy bills), improved occupant health and productivity (better air quality, daylight, and thermal comfort), and higher rental and sale values (studies show a 6–20% premium for certified buildings). They also benefit from reduced carbon emissions, future-proofing against tightening regulations, and enhanced reputation for owners and developers.",
  },
];

/* ═══════════════════════════ COMPONENT ═══════════════════════════════════ */

const EnvironmentalSustainabilityModule5Section3 = () => {
  useSEO({
    title:
      "BREEAM & Green Building Standards | Environmental & Sustainability Module 5 Section 3",
    description:
      "Learn about BREEAM certification, rating levels, assessment categories, CEEQUAL, Passivhaus, LEED, WELL Building Standard, Building Regulations Part L, Future Homes Standard 2025, and the benefits of green building certification.",
  });

  return (
    <div className="bg-[#1a1a1a] overflow-x-hidden">
      {/* ─── Sticky Header ─── */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button
            variant="ghost"
            className="min-h-[44px] text-white hover:text-white active:text-white p-0 -ml-1 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../environmental-sustainability-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 5
            </Link>
          </Button>
        </div>
      </div>

      {/* ─── Article ─── */}
      <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* ─── Hero ─── */}
        <div className="mb-12 text-center">
          <Award className="h-10 w-10 text-emerald-500 mx-auto mb-4" />
          <span className="inline-block bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
            MODULE 5 &middot; SECTION 3
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            BREEAM &amp; Green Building Standards
          </h1>
          <p className="text-white/80 max-w-xl mx-auto">
            Understanding green building certification — from BREEAM and
            CEEQUAL to Passivhaus, Building Regulations Part L, and the Future
            Homes Standard — and why it matters for construction workers
          </p>
        </div>

        {/* ─── 01 What Is BREEAM? ─── */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-emerald-400/80 text-sm font-normal">01</span>
            What Is BREEAM?
          </h2>
          <div className="space-y-4 text-white">
            <p>
              <strong>BREEAM</strong> stands for <strong>Building Research
              Establishment Environmental Assessment Method</strong>. Developed
              in 1990 by the BRE in the UK, it was the{" "}
              <strong>world&apos;s first green building certification
              scheme</strong> and remains the most widely used sustainability
              assessment method globally.
            </p>

            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-2 border-l-emerald-500/50 border border-emerald-500/30">
                <p className="font-semibold text-base text-emerald-400 mb-2">
                  Origins &amp; Reach
                </p>
                <ul className="text-base text-white space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Established in <strong>1990</strong> by the Building
                      Research Establishment (BRE), Watford, UK
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Over <strong>2.3 million buildings</strong> registered
                      for assessment in more than 90 countries
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      The <strong>benchmark</strong> for best practice in
                      sustainable design, construction, and operation
                    </span>
                  </li>
                </ul>
              </div>
              <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-2 border-l-emerald-500/50 border border-emerald-500/30">
                <p className="font-semibold text-base text-emerald-400 mb-2">
                  How It Works
                </p>
                <ul className="text-base text-white space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Buildings are assessed against a set of{" "}
                      <strong>environmental criteria</strong> across 10
                      categories
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Credits are earned for meeting performance targets
                      &mdash; these are <strong>weighted and scored</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      A <strong>licensed assessor</strong> carries out the
                      assessment at design and post-construction stages
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
              <div className="flex items-start gap-2 mb-2">
                <Leaf className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <h3 className="font-semibold text-emerald-300">
                  BREEAM Scheme Types
                </h3>
              </div>
              <p className="text-white/80 text-sm">
                BREEAM is not a single scheme but a{" "}
                <strong className="text-white">family of standards</strong>
                : <strong className="text-white">BREEAM New
                Construction</strong> (new-build projects),{" "}
                <strong className="text-white">BREEAM In-Use</strong>{" "}
                (existing buildings in operation),{" "}
                <strong className="text-white">BREEAM Refurbishment and
                Fit-Out</strong> (renovation projects), and{" "}
                <strong className="text-white">BREEAM
                Communities</strong> (masterplanning for large-scale
                developments). Each scheme is tailored to its lifecycle
                stage.
              </p>
            </div>
          </div>
        </section>

        {/* ─── 02 BREEAM Rating Levels ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-emerald-400/80 text-sm font-normal">02</span>
              BREEAM Rating Levels
            </h2>
            <div className="space-y-4 text-white">
              <p>
                BREEAM uses a <strong>five-level rating scale</strong> based
                on the percentage score achieved across all assessment
                categories. The higher the score, the greater the
                building&apos;s demonstrated sustainability performance.
              </p>

              {/* ─── BREEAM Rating Scale Visual ─── */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-emerald-400 font-medium mb-4 text-center">
                  BREEAM Rating Scale
                </h3>
                <div className="space-y-3">
                  {/* Outstanding */}
                  <div className="flex items-center gap-3">
                    <div className="w-28 sm:w-32 text-right">
                      <span className="text-emerald-400 font-bold text-sm">Outstanding</span>
                    </div>
                    <div className="flex-1 bg-white/10 rounded-full h-7 relative overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-emerald-600 to-emerald-400 h-full rounded-full flex items-center justify-end pr-3"
                        style={{ width: "100%" }}
                      >
                        <span className="text-white text-xs font-bold">&ge;85%</span>
                      </div>
                    </div>
                    <div className="w-6 flex justify-center">
                      <Award className="h-4 w-4 text-emerald-400" />
                    </div>
                  </div>
                  {/* Excellent */}
                  <div className="flex items-center gap-3">
                    <div className="w-28 sm:w-32 text-right">
                      <span className="text-green-400 font-bold text-sm">Excellent</span>
                    </div>
                    <div className="flex-1 bg-white/10 rounded-full h-7 relative overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-green-600 to-green-400 h-full rounded-full flex items-center justify-end pr-3"
                        style={{ width: "82%" }}
                      >
                        <span className="text-white text-xs font-bold">&ge;70%</span>
                      </div>
                    </div>
                    <div className="w-6" />
                  </div>
                  {/* Very Good */}
                  <div className="flex items-center gap-3">
                    <div className="w-28 sm:w-32 text-right">
                      <span className="text-teal-400 font-bold text-sm">Very Good</span>
                    </div>
                    <div className="flex-1 bg-white/10 rounded-full h-7 relative overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-teal-600 to-teal-400 h-full rounded-full flex items-center justify-end pr-3"
                        style={{ width: "65%" }}
                      >
                        <span className="text-white text-xs font-bold">&ge;55%</span>
                      </div>
                    </div>
                    <div className="w-6" />
                  </div>
                  {/* Good */}
                  <div className="flex items-center gap-3">
                    <div className="w-28 sm:w-32 text-right">
                      <span className="text-yellow-400 font-bold text-sm">Good</span>
                    </div>
                    <div className="flex-1 bg-white/10 rounded-full h-7 relative overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-yellow-600 to-yellow-400 h-full rounded-full flex items-center justify-end pr-3"
                        style={{ width: "53%" }}
                      >
                        <span className="text-white text-xs font-bold">&ge;45%</span>
                      </div>
                    </div>
                    <div className="w-6" />
                  </div>
                  {/* Pass */}
                  <div className="flex items-center gap-3">
                    <div className="w-28 sm:w-32 text-right">
                      <span className="text-orange-400 font-bold text-sm">Pass</span>
                    </div>
                    <div className="flex-1 bg-white/10 rounded-full h-7 relative overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-orange-600 to-orange-400 h-full rounded-full flex items-center justify-end pr-3"
                        style={{ width: "35%" }}
                      >
                        <span className="text-white text-xs font-bold">&ge;30%</span>
                      </div>
                    </div>
                    <div className="w-6" />
                  </div>
                </div>
                <p className="text-white/50 text-xs text-center mt-4 italic">
                  BREEAM rating levels and minimum score thresholds
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-emerald-400 font-medium mb-3">
                  How Scores Are Calculated
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Credits earned</strong> in each category are
                      expressed as a percentage of the maximum available
                      credits in that category
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></div>
                    <div>
                      Each category percentage is <strong>multiplied by its
                      weighting factor</strong> to give a weighted section
                      score
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></div>
                    <div>
                      All weighted section scores are <strong>added
                      together</strong> to give the overall BREEAM percentage
                      score
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></div>
                    <div>
                      Certain <strong>minimum standards</strong> must also be
                      met &mdash; a building cannot achieve a higher rating
                      simply by scoring very highly in one category while
                      ignoring others
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ─── 03 BREEAM Categories ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-emerald-400/80 text-sm font-normal">03</span>
              BREEAM Categories
            </h2>
            <div className="space-y-4 text-white">
              <p>
                BREEAM assesses buildings across <strong>10
                categories</strong>, each with its own weighting that
                reflects its relative importance to overall sustainability
                performance. Understanding these categories helps you see
                the full picture of what makes a building truly
                sustainable.
              </p>

              {/* ─── BREEAM Categories Breakdown Diagram ─── */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-emerald-400 font-medium mb-4 text-center">
                  BREEAM Assessment Categories &amp; Typical Weightings
                </h3>
                <div className="space-y-2.5">
                  {[
                    { name: "Energy", weight: "19%", width: "100%", colour: "from-emerald-600 to-emerald-400" },
                    { name: "Health & Wellbeing", weight: "15%", width: "79%", colour: "from-teal-600 to-teal-400" },
                    { name: "Materials", weight: "12.5%", width: "66%", colour: "from-cyan-600 to-cyan-400" },
                    { name: "Management", weight: "12%", width: "63%", colour: "from-blue-600 to-blue-400" },
                    { name: "Transport", weight: "8%", width: "42%", colour: "from-violet-600 to-violet-400" },
                    { name: "Waste", weight: "7.5%", width: "39%", colour: "from-purple-600 to-purple-400" },
                    { name: "Water", weight: "6%", width: "32%", colour: "from-sky-600 to-sky-400" },
                    { name: "Land Use & Ecology", weight: "10%", width: "53%", colour: "from-green-600 to-green-400" },
                    { name: "Pollution", weight: "10%", width: "53%", colour: "from-amber-600 to-amber-400" },
                    { name: "Innovation", weight: "+10%", width: "53%", colour: "from-rose-600 to-rose-400" },
                  ].map((cat) => (
                    <div key={cat.name} className="flex items-center gap-2 sm:gap-3">
                      <div className="w-32 sm:w-40 text-right flex-shrink-0">
                        <span className="text-white/80 text-xs sm:text-sm">{cat.name}</span>
                      </div>
                      <div className="flex-1 bg-white/10 rounded-full h-5 relative overflow-hidden">
                        <div
                          className={`bg-gradient-to-r ${cat.colour} h-full rounded-full flex items-center justify-end pr-2`}
                          style={{ width: cat.width }}
                        >
                          <span className="text-white text-[10px] sm:text-xs font-bold">{cat.weight}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-white/50 text-xs text-center mt-4 italic">
                  Typical BREEAM New Construction weightings (may vary by
                  building type and scheme version)
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h3 className="text-emerald-400 font-semibold text-sm mb-2">
                    Management (12%)
                  </h3>
                  <p className="text-white/80 text-xs leading-relaxed">
                    Covers project management practices, stakeholder
                    consultation, lifecycle cost planning, responsible
                    construction practices (often linked to Considerate
                    Constructors Scheme), and commissioning.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h3 className="text-emerald-400 font-semibold text-sm mb-2">
                    Health &amp; Wellbeing (15%)
                  </h3>
                  <p className="text-white/80 text-xs leading-relaxed">
                    Assesses visual comfort (daylighting and lighting),
                    indoor air quality, thermal comfort, acoustic
                    performance, water quality, and the overall impact on
                    occupant health and productivity.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h3 className="text-emerald-400 font-semibold text-sm mb-2">
                    Energy (19%)
                  </h3>
                  <p className="text-white/80 text-xs leading-relaxed">
                    The highest-weighted category. Covers energy efficiency
                    of the building fabric and services, sub-metering,
                    energy-efficient lighting, low-carbon and renewable
                    energy, and reduction of CO2 emissions.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h3 className="text-emerald-400 font-semibold text-sm mb-2">
                    Transport (8%)
                  </h3>
                  <p className="text-white/80 text-xs leading-relaxed">
                    Assesses access to public transport, pedestrian and
                    cyclist facilities, travel planning, proximity to local
                    amenities, and provision for electric vehicle charging
                    infrastructure.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h3 className="text-emerald-400 font-semibold text-sm mb-2">
                    Water (6%)
                  </h3>
                  <p className="text-white/80 text-xs leading-relaxed">
                    Covers water consumption reduction, water-efficient
                    fittings and appliances, water metering and monitoring,
                    leak detection systems, and rainwater/greywater
                    harvesting potential.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h3 className="text-emerald-400 font-semibold text-sm mb-2">
                    Materials (12.5%)
                  </h3>
                  <p className="text-white/80 text-xs leading-relaxed">
                    Assesses the environmental impact of construction
                    materials, responsible sourcing (e.g., FSC timber, BES
                    6001 certification), lifecycle assessment (LCA), and
                    robustness and durability of specification.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h3 className="text-emerald-400 font-semibold text-sm mb-2">
                    Waste (7.5%)
                  </h3>
                  <p className="text-white/80 text-xs leading-relaxed">
                    Covers construction waste management, Site Waste
                    Management Plans (SWMPs), recycled aggregates, designing
                    for disassembly and adaptability, and operational waste
                    storage and recycling facilities.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h3 className="text-emerald-400 font-semibold text-sm mb-2">
                    Land Use &amp; Ecology (10%)
                  </h3>
                  <p className="text-white/80 text-xs leading-relaxed">
                    Assesses site selection, ecological value of the site,
                    protection of existing ecological features during
                    construction, enhancement of ecological value, and
                    long-term biodiversity management planning.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h3 className="text-emerald-400 font-semibold text-sm mb-2">
                    Pollution (10%)
                  </h3>
                  <p className="text-white/80 text-xs leading-relaxed">
                    Covers refrigerant selection (GWP and ODP), NOx emissions
                    from heating systems, flood risk assessment, surface water
                    run-off management (SuDS), light pollution, and noise
                    pollution.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h3 className="text-emerald-400 font-semibold text-sm mb-2">
                    Innovation (+10%)
                  </h3>
                  <p className="text-white/80 text-xs leading-relaxed">
                    Bonus credits (up to 10% additional) awarded for
                    exemplary performance that goes significantly beyond the
                    standard BREEAM criteria, or for innovative solutions
                    not covered by the standard assessment categories.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 04 BREEAM for Construction Workers ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-emerald-400/80 text-sm font-normal">04</span>
              BREEAM for Construction Workers
            </h2>
            <div className="space-y-4 text-white">
              <p>
                BREEAM is not just about design &mdash; significant credits
                are linked to <strong>what happens on site during
                construction</strong>. As a construction worker, your
                day-to-day practices directly affect whether the project
                achieves its target BREEAM rating.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-emerald-400 font-medium mb-3">
                  Site Management Practices
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Considerate Constructors Scheme (CCS):</strong>{" "}
                      many BREEAM projects require registration with the CCS
                      and achievement of a minimum score. This covers
                      community relations, site appearance, safety, and
                      environmental management.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Resource efficiency:</strong> minimising
                      material waste, segregating waste streams for recycling
                      (timber, metal, plasterboard, packaging), and tracking
                      waste volumes against targets set in the Site Waste
                      Management Plan (SWMP).
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Pollution prevention:</strong> controlling dust,
                      noise, and vibration, preventing contaminated run-off
                      from entering watercourses, and managing site lighting
                      to reduce light pollution.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-emerald-400 font-medium mb-3">
                  Your Role on a BREEAM Project
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Ecological protection:</strong> respecting
                      exclusion zones around protected trees, habitats, and
                      watercourses; following the ecological management plan;
                      reporting any ecological concerns promptly
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Energy monitoring on site:</strong> using
                      energy-efficient temporary lighting, switching off plant
                      and machinery when not in use, and monitoring site
                      energy consumption against reduction targets
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Responsible sourcing:</strong> ensuring materials
                      delivered to site are from approved suppliers with
                      appropriate certification (FSC, PEFC, BES 6001) as
                      specified by the BREEAM assessor
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Monitoring &amp; auditing:</strong> contributing
                      to site environmental audits, maintaining records of
                      waste volumes, energy use, and water consumption, and
                      participating in BREEAM-related toolbox talks
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-emerald-300">
                    BREEAM Credits Can Be Lost on Site
                  </h3>
                </div>
                <p className="text-white/80 text-sm">
                  Poor site practices can{" "}
                  <strong className="text-white">directly cost the project
                  BREEAM credits</strong>. For example, failing to segregate
                  waste, allowing pollution incidents, damaging protected
                  ecological features, or not meeting Considerate
                  Constructors targets can all result in lost credits and a
                  lower final rating. Every worker on site has a role in
                  protecting the project&apos;s sustainability
                  performance.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ─── 05 CEEQUAL ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-emerald-400/80 text-sm font-normal">05</span>
              CEEQUAL
            </h2>
            <div className="space-y-4 text-white">
              <p>
                <strong>CEEQUAL</strong> is the sustainability assessment,
                rating, and awards scheme specifically designed for{" "}
                <strong>civil engineering, infrastructure, landscaping, and
                public realm projects</strong>. It fills the gap that BREEAM
                does not cover &mdash; projects such as roads, bridges,
                tunnels, railways, water treatment works, flood defences, and
                other infrastructure.
              </p>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-2 border-l-emerald-500/50 border border-emerald-500/30">
                  <p className="font-semibold text-base text-emerald-400 mb-2">
                    CEEQUAL Categories
                  </p>
                  <ul className="text-base text-white space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Management</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Resilience</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Communities &amp; Stakeholders</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Land Use &amp; Ecology</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Landscape &amp; Historic Environment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Pollution</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Resources</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Transport</span>
                    </li>
                  </ul>
                </div>
                <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-2 border-l-emerald-500/50 border border-emerald-500/30">
                  <p className="font-semibold text-base text-emerald-400 mb-2">
                    CEEQUAL Rating Levels
                  </p>
                  <ul className="text-base text-white space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong>Pass</strong> &mdash; 25%+</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong>Good</strong> &mdash; 40%+</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong>Very Good</strong> &mdash; 55%+</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong>Excellent</strong> &mdash; 70%+</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong>Outstanding</strong> &mdash; 85%+</span>
                    </li>
                  </ul>
                  <p className="text-white/60 text-xs mt-3">
                    Now managed by BRE alongside BREEAM, using a similar
                    credit-based scoring methodology
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-emerald-400 font-medium mb-3">
                  CEEQUAL vs BREEAM &mdash; Key Differences
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Scope:</strong> BREEAM covers buildings;
                      CEEQUAL covers civil engineering and infrastructure
                      that BREEAM does not assess
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Categories:</strong> CEEQUAL includes
                      resilience and landscape/historic environment
                      categories specific to infrastructure projects
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Application:</strong> used for roads, bridges,
                      railways, water/wastewater works, flood defences,
                      power stations, and similar major infrastructure
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 06 Other Green Standards ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-emerald-400/80 text-sm font-normal">06</span>
              Other Green Standards
            </h2>
            <div className="space-y-4 text-white">
              <p>
                BREEAM is the most widely used standard in the UK, but
                several other green building standards exist that you may
                encounter on projects. Each serves a different purpose or
                focuses on specific aspects of sustainability.
              </p>

              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="text-emerald-400 font-semibold mb-1">
                        LEED (Leadership in Energy and Environmental Design)
                      </h3>
                      <p className="text-white/80 text-sm">
                        Developed by the US Green Building Council, LEED is
                        the most widely used green building standard in
                        North America. Rating levels are Certified, Silver,
                        Gold, and Platinum. While primarily used
                        internationally, some UK projects &mdash;
                        particularly those with American clients or
                        investors &mdash; may specify LEED certification.
                        LEED and BREEAM assess similar categories but use
                        different scoring methods and benchmarks.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="text-emerald-400 font-semibold mb-1">
                        Passivhaus (Passive House)
                      </h3>
                      <p className="text-white/80 text-sm">
                        A rigorous energy efficiency standard originating
                        from Germany. Unlike BREEAM (which assesses broad
                        sustainability), Passivhaus focuses specifically on{" "}
                        <strong>ultra-low energy performance</strong>.
                        Buildings must meet strict targets: space heating
                        demand &le;15 kWh/m&sup2;/year, primary energy
                        demand &le;120 kWh/m&sup2;/year, and airtightness
                        &le;0.6 ACH at 50 Pa. Achieved through exceptional
                        insulation, triple glazing, thermal bridge-free
                        construction, and mechanical ventilation with heat
                        recovery (MVHR).
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="text-emerald-400 font-semibold mb-1">
                        WELL Building Standard
                      </h3>
                      <p className="text-white/80 text-sm">
                        Focuses specifically on <strong>occupant health and
                        wellbeing</strong> rather than broad environmental
                        sustainability. Assesses air quality, water quality,
                        nourishment (food provision), light, fitness,
                        comfort, and mental wellbeing. Often used alongside
                        BREEAM to provide a comprehensive sustainability
                        and health assessment. Rating levels are Silver,
                        Gold, and Platinum.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="text-emerald-400 font-semibold mb-1">
                        Ska Rating
                      </h3>
                      <p className="text-white/80 text-sm">
                        Developed by RICS (Royal Institution of Chartered
                        Surveyors) specifically for{" "}
                        <strong>commercial fit-out projects</strong>.
                        Particularly useful for office refurbishments and
                        tenant fit-outs where BREEAM may not be practical.
                        Assesses energy and CO2, waste, water, materials,
                        pollution, and wellbeing. Rating levels are Bronze,
                        Silver, and Gold.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="text-emerald-400 font-semibold mb-1">
                        Home Quality Mark (HQM)
                      </h3>
                      <p className="text-white/80 text-sm">
                        Developed by BRE as a <strong>consumer-facing
                        quality indicator</strong> for new homes.
                        Communicates the quality and sustainability of a
                        home to buyers in a clear, understandable way using
                        a simple star rating (1 to 5 stars). Covers
                        running costs, health and wellbeing, and
                        environmental footprint. Essentially a residential
                        counterpart to BREEAM but designed to be
                        consumer-friendly.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ─── 07 Building Regulations & Sustainability ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-emerald-400/80 text-sm font-normal">07</span>
              Building Regulations &amp; Sustainability
            </h2>
            <div className="space-y-4 text-white">
              <p>
                While BREEAM and other green standards are voluntary,{" "}
                <strong>Building Regulations are mandatory</strong>. Several
                parts of the Building Regulations directly address energy
                efficiency and sustainability, and these requirements are
                being progressively tightened to meet the UK&apos;s climate
                targets.
              </p>

              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <h3 className="text-emerald-400 font-semibold text-sm mb-2">
                    Part L &mdash; Conservation of Fuel and Power
                  </h3>
                  <p className="text-white/80 text-sm mb-2">
                    The most important Building Regulation for energy
                    efficiency. Part L sets <strong>minimum
                    standards</strong> for:
                  </p>
                  <ul className="text-white/80 text-sm space-y-1.5 ml-4">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Thermal insulation of the building fabric (walls, roof, floor, windows)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Efficiency of heating, cooling, and hot water systems</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Lighting efficiency (particularly in non-domestic buildings)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Airtightness and control of ventilation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>On-site renewable energy generation</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <h3 className="text-emerald-400 font-semibold text-sm mb-2">
                    Part O &mdash; Overheating
                  </h3>
                  <p className="text-white/80 text-sm">
                    Introduced in 2022, Part O is the first Building
                    Regulation to specifically address <strong>overheating
                    in new residential buildings</strong>. As buildings
                    become better insulated and more airtight, the risk of
                    overheating increases, particularly in south-facing
                    rooms and top-floor flats. Part O sets limits on solar
                    gain and internal temperatures, requiring designers to
                    use passive cooling strategies (shading, ventilation,
                    orientation) before resorting to mechanical cooling.
                  </p>
                </div>

                <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                  <h3 className="text-emerald-400 font-semibold text-sm mb-2">
                    Future Homes Standard 2025
                  </h3>
                  <p className="text-white/80 text-sm mb-3">
                    The <strong>biggest change to Building Regulations for
                    residential construction in a generation</strong>. From
                    2025, new homes must produce{" "}
                    <strong className="text-white">75&ndash;80% less
                    carbon emissions</strong> compared to those built under
                    the 2013 regulations. Key requirements include:
                  </p>
                  <ul className="text-white/80 text-sm space-y-1.5 ml-4">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span>Significantly improved fabric efficiency (better insulation, reduced thermal bridging, improved airtightness)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span>Low-carbon heating systems (primarily heat pumps &mdash; no new gas boilers in new homes)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span>Triple glazing likely to become standard to meet the new U-value targets</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span>Solar PV expected on most new homes to offset remaining energy demand</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <h3 className="text-emerald-400 font-semibold text-sm mb-2">
                    SAP &amp; SBEM Calculations
                  </h3>
                  <p className="text-white/80 text-sm mb-2">
                    To demonstrate compliance with Part L, buildings must
                    undergo energy performance calculations:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3 mt-3">
                    <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-3">
                      <p className="text-emerald-300 text-xs font-medium mb-1">
                        SAP (Standard Assessment Procedure)
                      </p>
                      <p className="text-white/60 text-xs">
                        Used for <strong className="text-white/80">dwellings</strong>.
                        Calculates the energy performance of a home based
                        on its fabric, heating system, ventilation, and
                        renewable energy. Produces the Energy Performance
                        Certificate (EPC) rating (A to G).
                      </p>
                    </div>
                    <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-3">
                      <p className="text-emerald-300 text-xs font-medium mb-1">
                        SBEM (Simplified Building Energy Model)
                      </p>
                      <p className="text-white/60 text-xs">
                        Used for <strong className="text-white/80">non-domestic
                        buildings</strong>. Calculates the energy
                        performance of commercial, industrial, and public
                        buildings. Covers heating, cooling, lighting,
                        ventilation, and hot water systems.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 08 Green Building Benefits ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-emerald-400/80 text-sm font-normal">08</span>
              Green Building Benefits
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Green building certification delivers measurable benefits
                for building owners, occupants, and the wider environment.
                Understanding these benefits helps explain why green
                standards are increasingly required on construction
                projects.
              </p>

              <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h3 className="text-emerald-400 font-semibold text-sm mb-2">
                    Energy Cost Savings
                  </h3>
                  <p className="text-white/80 text-xs leading-relaxed">
                    Green-certified buildings typically achieve{" "}
                    <strong className="text-white/90">20&ndash;30% lower
                    energy bills</strong> compared to conventional buildings.
                    High-performance buildings such as Passivhaus can achieve
                    up to 90% reductions in heating costs. With rising energy
                    prices, these savings are increasingly significant over a
                    building&apos;s lifetime.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h3 className="text-emerald-400 font-semibold text-sm mb-2">
                    Improved Occupant Health
                  </h3>
                  <p className="text-white/80 text-xs leading-relaxed">
                    Better indoor air quality, increased natural daylight,
                    improved thermal comfort, and reduced noise exposure all
                    contribute to healthier, more productive occupants.
                    Studies show <strong className="text-white/90">8&ndash;11%
                    improvements in productivity</strong> in green-certified
                    offices, along with reduced sickness absence rates.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h3 className="text-emerald-400 font-semibold text-sm mb-2">
                    Higher Rental &amp; Sale Values
                  </h3>
                  <p className="text-white/80 text-xs leading-relaxed">
                    Research consistently shows a{" "}
                    <strong className="text-white/90">6&ndash;20% rental
                    premium</strong> for green-certified commercial buildings
                    and increased sale values for certified homes. Tenants and
                    buyers increasingly demand high sustainability
                    performance, particularly in the commercial sector where
                    corporate ESG targets drive demand.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h3 className="text-emerald-400 font-semibold text-sm mb-2">
                    Reduced Carbon Emissions
                  </h3>
                  <p className="text-white/80 text-xs leading-relaxed">
                    The built environment accounts for approximately{" "}
                    <strong className="text-white/90">40% of the UK&apos;s
                    total carbon emissions</strong>. Green building standards
                    directly target these emissions through improved energy
                    efficiency, low-carbon heating, renewable energy, and
                    responsible material selection. Each green building
                    contributes to the UK&apos;s net-zero pathway.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h3 className="text-emerald-400 font-semibold text-sm mb-2">
                    Future-Proofing
                  </h3>
                  <p className="text-white/80 text-xs leading-relaxed">
                    Buildings certified to high green standards are better
                    positioned to meet <strong className="text-white/90">
                    future regulatory requirements</strong> as Building
                    Regulations continue to tighten. This avoids costly
                    retrofitting and reduces the risk of buildings becoming
                    obsolete or unmarketable. The Future Homes Standard 2025
                    and net-zero targets make this increasingly important.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h3 className="text-emerald-400 font-semibold text-sm mb-2">
                    Water Savings &amp; Resilience
                  </h3>
                  <p className="text-white/80 text-xs leading-relaxed">
                    Water-efficient fittings, rainwater harvesting, and
                    greywater recycling systems can reduce water consumption
                    by <strong className="text-white/90">30&ndash;50%</strong>.
                    Combined with sustainable urban drainage systems (SuDS),
                    green buildings also contribute to flood risk management
                    and climate resilience at a neighbourhood scale.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h3 className="text-emerald-400 font-semibold text-sm mb-2">
                    Enhanced Reputation
                  </h3>
                  <p className="text-white/80 text-xs leading-relaxed">
                    For developers, contractors, and building owners, green
                    certification demonstrates a{" "}
                    <strong className="text-white/90">commitment to
                    sustainability</strong> that enhances reputation with
                    investors, tenants, planners, and the public.
                    Increasingly, planning authorities require BREEAM
                    certification as a condition of planning approval for
                    major developments.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h3 className="text-emerald-400 font-semibold text-sm mb-2">
                    Reduced Waste &amp; Materials Impact
                  </h3>
                  <p className="text-white/80 text-xs leading-relaxed">
                    Green building projects typically achieve{" "}
                    <strong className="text-white/90">significantly higher
                    waste diversion rates</strong> (80%+ diverted from
                    landfill) through Site Waste Management Plans, waste
                    segregation, and responsible material specification.
                    Lifecycle assessment of materials ensures lower embodied
                    carbon throughout the building&apos;s life.
                  </p>
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-emerald-300">
                    The Business Case for Green Building
                  </h3>
                </div>
                <p className="text-white/80 text-sm">
                  The evidence is clear: green building certification is
                  not just an environmental gesture &mdash; it delivers{" "}
                  <strong className="text-white">measurable financial
                  returns</strong> through lower operating costs, higher
                  asset values, improved occupant satisfaction, and reduced
                  regulatory risk. For construction workers, understanding
                  this context explains why clients, developers, and
                  contractors increasingly demand high sustainability
                  performance on every project.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FAQs ─── */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="text-emerald-400/80 text-sm font-normal">09</span>
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0"
              >
                <h3 className="font-semibold text-white mb-2">
                  {faq.question}
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Quiz ─── */}
        <div className="mt-12">
          <Quiz
            title="BREEAM & Green Building Standards Quiz"
            questions={quizQuestions}
          />
        </div>

        {/* ─── Bottom Navigation ─── */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[44px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../environmental-sustainability-module-5-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[44px] bg-emerald-500 text-white hover:bg-emerald-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../environmental-sustainability-module-5-section-4">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EnvironmentalSustainabilityModule5Section3;
