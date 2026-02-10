import {
  ArrowLeft,
  ArrowRight,
  Leaf,
  Globe2,
  Target,
  Recycle,
  Building2,
  BarChart3,
  Users,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  FileText,
  Factory,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

/* ───────────────────────────────────────────────
   Quick-check questions (InlineCheck after 02 / 04 / 06)
   ─────────────────────────────────────────────── */
const quickCheckQuestions = [
  {
    id: "env-sus-m1s4-brundtland-definition",
    question:
      "The Brundtland definition describes sustainable development as meeting the needs of the present without compromising what?",
    options: [
      "The ability of future generations to meet their own needs",
      "The profitability of current construction projects",
      "The speed of technological innovation in the building sector",
      "The availability of raw materials for the next five years",
    ],
    correctIndex: 0,
    explanation:
      "The Brundtland Commission (1987) defined sustainable development as 'development that meets the needs of the present without compromising the ability of future generations to meet their own needs.' This remains the most widely accepted definition and underpins all modern sustainability frameworks, including those applied to the UK construction industry.",
  },
  {
    id: "env-sus-m1s4-circular-economy-principle",
    question:
      "Which of the following is NOT one of the three core principles of the circular economy as defined by the Ellen MacArthur Foundation?",
    options: [
      "Maximise extraction of virgin raw materials",
      "Design out waste and pollution",
      "Keep products and materials in use",
      "Regenerate natural systems",
    ],
    correctIndex: 0,
    explanation:
      "The Ellen MacArthur Foundation's circular economy model is built on three principles: design out waste and pollution, keep products and materials in use, and regenerate natural systems. Maximising extraction of virgin raw materials is the opposite of circular thinking — it describes the traditional linear 'take-make-dispose' model that the circular economy seeks to replace.",
  },
  {
    id: "env-sus-m1s4-whole-life-carbon",
    question:
      "Whole life carbon in construction comprises which two main components?",
    options: [
      "Embodied carbon and operational carbon",
      "Transport carbon and demolition carbon",
      "Design carbon and commissioning carbon",
      "Manufacturing carbon and recycling carbon",
    ],
    correctIndex: 0,
    explanation:
      "Whole life carbon is the total carbon emissions associated with a building across its entire lifecycle. It comprises embodied carbon (emissions from extracting, manufacturing, transporting, installing, maintaining, and disposing of building materials) and operational carbon (emissions from energy used to heat, cool, light, and power the building during its occupied life). Both must be addressed to achieve genuine carbon reduction in the built environment.",
  },
];

/* ───────────────────────────────────────────────
   FAQs
   ─────────────────────────────────────────────── */
const faqs = [
  {
    question:
      "What is the difference between net zero and carbon neutral in the context of UK construction?",
    answer:
      "Net zero means reducing greenhouse gas emissions as close to zero as possible, with any remaining emissions balanced by removals (such as carbon capture or natural sequestration). Carbon neutral typically means offsetting emissions by purchasing carbon credits or investing in projects that reduce emissions elsewhere. The UK's legal commitment under the Climate Change Act 2008 (amended 2019) is to achieve net zero by 2050, which requires actual reduction of emissions rather than relying solely on offsets. In construction, this means fundamentally changing how buildings are designed, built, and operated — not simply buying offsets to compensate for business-as-usual practices.",
  },
  {
    question:
      "How does life cycle assessment (LCA) help electricians and construction professionals make better decisions?",
    answer:
      "LCA provides a systematic method for evaluating the environmental impact of building materials and systems across their entire lifecycle — from raw material extraction through manufacturing, transport, installation, use, maintenance, and end-of-life disposal or recycling. For electricians and construction professionals, LCA enables evidence-based comparisons between alternative materials (for example, copper versus aluminium cabling, or different insulation types). Environmental Product Declarations (EPDs) present LCA data in a standardised format under ISO 14025, making it practical to compare products from different manufacturers and select options with lower environmental impact.",
  },
  {
    question:
      "Why is embodied carbon becoming as important as operational carbon in modern construction?",
    answer:
      "As buildings become more energy-efficient through improved insulation, heat pumps, and renewable energy, operational carbon emissions are falling significantly. This means embodied carbon — the emissions locked into the materials and construction process itself — now represents a proportionally larger share of a building's whole life carbon. For some highly efficient new buildings, embodied carbon can account for 50% or more of total lifecycle emissions. Additionally, embodied carbon is released upfront during construction, contributing to near-term climate change at a critical point when rapid emissions reduction is needed to meet the UK's carbon budgets.",
  },
  {
    question:
      "What are Environmental Product Declarations (EPDs) and are they mandatory in the UK?",
    answer:
      "Environmental Product Declarations (EPDs) are standardised documents that report the environmental impact of a product based on life cycle assessment (LCA) data, following the international standard ISO 14025. They cover impacts such as global warming potential, ozone depletion, acidification, and resource depletion. EPDs are not currently mandatory in the UK, but they are increasingly requested by clients, specifiers, and rating systems such as BREEAM. Many major manufacturers now voluntarily produce EPDs for their products. The growing emphasis on whole life carbon assessment in planning policy and building regulations means EPDs are likely to become essential documentation for construction products in the near future.",
  },
];

/* ───────────────────────────────────────────────
   Quiz Questions (8)
   ─────────────────────────────────────────────── */
const quizQuestions = [
  {
    id: 1,
    question:
      "The Brundtland Commission published its landmark report 'Our Common Future' in 1987. Which of the following BEST describes its definition of sustainable development?",
    options: [
      "Development that meets the needs of the present without compromising the ability of future generations to meet their own needs",
      "Development that prioritises economic growth above all other considerations to fund future environmental protection",
      "Development that preserves the natural environment in its current state by preventing all new construction",
      "Development that focuses exclusively on reducing carbon emissions from industrial processes",
    ],
    correctAnswer: 0,
    explanation:
      "The Brundtland definition — 'development that meets the needs of the present without compromising the ability of future generations to meet their own needs' — remains the foundational definition of sustainable development used by governments, international organisations, and the construction industry worldwide. It recognises the need to balance present requirements with long-term environmental, social, and economic considerations.",
  },
  {
    id: 2,
    question:
      "The three pillars of sustainability are environmental, social, and economic. In the context of the 'triple bottom line,' what does this framework require organisations to consider?",
    options: [
      "People, planet, and profit — measuring success across social, environmental, and financial performance equally",
      "Only financial profit, since economic viability funds all other sustainability measures",
      "Environmental impact alone, as social and economic factors are secondary to climate change",
      "Government compliance, public relations, and shareholder returns",
    ],
    correctAnswer: 0,
    explanation:
      "The triple bottom line framework, coined by John Elkington in 1994, requires organisations to measure their performance across three dimensions: people (social impact), planet (environmental impact), and profit (economic viability). In construction, this means considering the wellbeing of workers and communities, minimising environmental harm, and maintaining financial sustainability — rather than prioritising any single dimension at the expense of the others.",
  },
  {
    id: 3,
    question:
      "Which of the following UN Sustainable Development Goals is MOST directly relevant to the construction industry's energy practices?",
    options: [
      "SDG 7: Affordable and Clean Energy",
      "SDG 1: No Poverty",
      "SDG 4: Quality Education",
      "SDG 14: Life Below Water",
    ],
    correctAnswer: 0,
    explanation:
      "SDG 7 (Affordable and Clean Energy) is directly relevant to the construction industry because buildings account for approximately 40% of UK energy consumption. Construction professionals have a direct role in delivering energy-efficient buildings, integrating renewable energy systems, and reducing energy demand through improved design and specification. Other construction-relevant SDGs include SDG 9 (Industry, Innovation and Infrastructure), SDG 11 (Sustainable Cities and Communities), SDG 12 (Responsible Consumption and Production), and SDG 13 (Climate Action).",
  },
  {
    id: 4,
    question:
      "The UK Climate Change Act 2008 (as amended in 2019) sets a legally binding target to reach net zero greenhouse gas emissions by what year?",
    options: [
      "2050",
      "2030",
      "2035",
      "2040",
    ],
    correctAnswer: 0,
    explanation:
      "The Climate Change Act 2008, amended in June 2019, commits the UK to achieving net zero greenhouse gas emissions by 2050. This is a legally binding target, making the UK the first major economy to legislate for net zero. The construction sector, responsible for approximately 25% of UK carbon emissions (including embodied and operational carbon from buildings), has a critical role in meeting this target. The sixth carbon budget (2033–2037) sets interim milestones that require significant near-term action.",
  },
  {
    id: 5,
    question:
      "In circular economy thinking, what is the fundamental difference between a 'linear' and a 'circular' approach to materials?",
    options: [
      "Linear follows 'take-make-dispose'; circular keeps materials in use through reuse, repair, remanufacture, and recycling",
      "Linear uses only recycled materials; circular uses only virgin materials",
      "Linear is more expensive; circular is always cheaper",
      "Linear applies only to metals; circular applies only to timber",
    ],
    correctAnswer: 0,
    explanation:
      "The linear economy follows a 'take-make-dispose' model: raw materials are extracted, manufactured into products, used, and then sent to landfill. The circular economy fundamentally redesigns this system to keep materials in use for as long as possible through strategies including designing for disassembly, reuse, repair, remanufacture, and recycling. In construction, this means designing buildings that can be adapted, components that can be reused, and materials that can be recovered at end of life rather than demolished and landfilled.",
  },
  {
    id: 6,
    question:
      "Life cycle assessment (LCA) follows the ISO 14040 and ISO 14044 standards. What does a 'cradle-to-grave' LCA boundary encompass?",
    options: [
      "All stages from raw material extraction through manufacturing, transport, use, and end-of-life disposal",
      "Only the manufacturing stage of a product",
      "Only the operational energy use of a building over its design life",
      "Only the transport of materials from factory to construction site",
    ],
    correctAnswer: 0,
    explanation:
      "A cradle-to-grave LCA covers the complete lifecycle of a product or building: raw material extraction (cradle), manufacturing and processing, transport to site, installation, operational use and maintenance, and finally end-of-life disposal or demolition (grave). ISO 14040 provides the principles and framework, while ISO 14044 specifies requirements and guidelines for conducting an LCA. A 'cradle-to-cradle' assessment goes further by also considering the recycling or reuse of materials after end of life.",
  },
  {
    id: 7,
    question:
      "What does Corporate Social Responsibility (CSR) mean in the context of a UK construction company?",
    options: [
      "A voluntary commitment to managing the company's social, environmental, and economic impacts beyond minimum legal compliance",
      "A legal requirement under the Building Regulations to publish annual sustainability reports",
      "A government-imposed tax on construction companies that do not meet carbon targets",
      "A mandatory certification scheme administered by the HSE for construction firms",
    ],
    correctAnswer: 0,
    explanation:
      "CSR in construction refers to a company's voluntary commitment to managing its broader social, environmental, and economic impacts beyond what is legally required. This includes community engagement (such as local employment, apprenticeships, and neighbourhood liaison), supply chain ethics (fair payment, modern slavery prevention), environmental stewardship (waste reduction, biodiversity), and social value creation. While CSR is largely voluntary, it is increasingly expected by clients, particularly in public sector procurement where the Social Value Act 2012 requires social value to be considered in contract awards.",
  },
  {
    id: 8,
    question:
      "Which of the following is a recognised business benefit of adopting sustainable practices in construction?",
    options: [
      "Reduced operating costs through lower energy, water, and waste expenditure, plus improved competitiveness for contracts requiring ESG credentials",
      "Guaranteed exemption from all planning regulations and building control inspections",
      "Automatic qualification for all government construction framework agreements",
      "Complete elimination of construction project risk and liability",
    ],
    correctAnswer: 0,
    explanation:
      "Sustainable construction practices deliver measurable business benefits including reduced operating costs (lower energy bills, reduced waste disposal charges, lower water consumption), competitive advantage in tendering (particularly for public sector contracts requiring ESG — Environmental, Social, and Governance — credentials), enhanced reputation with clients and communities, reduced regulatory risk, and improved ability to attract and retain skilled workers. While sustainability does not eliminate risk or guarantee contract awards, it increasingly differentiates successful construction businesses from their competitors.",
  },
];

/* ═══════════════════════════════════════════════
   Component
   ═══════════════════════════════════════════════ */
export default function EnvironmentalSustainabilityModule1Section4() {
  useSEO({
    title: "Sustainability Principles | Environmental & Sustainability Module 1.4",
    description:
      "Sustainability principles for construction: Brundtland definition, UN SDGs, UK net zero strategy, circular economy, whole life carbon, LCA, CSR, and the business case for sustainable building practices.",
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* ═════════════════════════════════════════
          Sticky Header
          ═════════════════════════════════════════ */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../environmental-sustainability-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* ═════════════════════════════════════════
            Page Title
            ═════════════════════════════════════════ */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-400/20 border border-emerald-500/30 mb-4">
            <Leaf className="h-7 w-7 text-emerald-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-3 mx-auto">
            <span className="text-emerald-400 text-xs font-semibold">MODULE 1 &middot; SECTION 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Sustainability Principles
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            From the Brundtland definition to the circular economy, net zero targets to life cycle assessment &mdash; the foundational principles that drive sustainable construction in the UK
          </p>
        </header>

        {/* ═════════════════════════════════════════
            Quick Summary Boxes
            ═════════════════════════════════════════ */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-emerald-500/5 border-l-2 border-emerald-500/50">
            <p className="text-emerald-400 text-base font-medium mb-2">Core Frameworks</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Brundtland:</strong> Meeting present needs without compromising the future</li>
              <li><strong>Triple Bottom Line:</strong> People, planet, profit</li>
              <li><strong>Circular Economy:</strong> Design out waste, keep materials in use</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-emerald-500/5 border-l-2 border-emerald-500/50">
            <p className="text-emerald-400/90 text-base font-medium mb-2">UK Commitments</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Net Zero:</strong> 2050 legally binding target</li>
              <li><strong>Climate Change Act:</strong> 2008, amended 2019</li>
              <li><strong>Construction:</strong> ~25% of UK carbon emissions</li>
            </ul>
          </div>
        </div>

        {/* ═════════════════════════════════════════
            Learning Outcomes
            ═════════════════════════════════════════ */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define sustainability using the Brundtland definition and explain the three pillars (environmental, social, economic)",
              "Identify the UN Sustainable Development Goals most relevant to the construction industry",
              "Outline the UK's net zero strategy and explain the construction sector's role in meeting carbon targets",
              "Describe the principles of the circular economy and contrast them with the linear 'take-make-dispose' model",
              "Explain whole life carbon, distinguishing between embodied carbon and operational carbon",
              "Describe the purpose and process of life cycle assessment (LCA) under ISO 14040/14044",
              "Explain what Corporate Social Responsibility means in the context of UK construction",
              "Identify the business benefits of adopting sustainable practices, including ESG reporting and competitive advantage",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-emerald-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* ═══════════════════════════════════════════════
            SECTION 01: What Is Sustainability?
            ═══════════════════════════════════════════════ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">01</span>
            What Is Sustainability?
          </h2>
          <div className="border-l-2 border-emerald-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The term <strong>sustainability</strong> in its modern sense traces back to the <strong>Brundtland Commission</strong>, formally known as the World Commission on Environment and Development. Established by the United Nations in 1983 and chaired by former Norwegian Prime Minister Gro Harlem Brundtland, the commission published its landmark report <em>&lsquo;Our Common Future&rsquo;</em> in <strong>1987</strong>. The report introduced what remains the most widely accepted definition of sustainable development:
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Globe2 className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">The Brundtland Definition (1987)</p>
                </div>
                <p className="text-base text-white italic">
                  &ldquo;Sustainable development is development that meets the needs of the present without compromising the ability of future generations to meet their own needs.&rdquo;
                </p>
              </div>

              <p>
                This definition is deliberately broad, acknowledging that sustainability is not solely an environmental concept. It encompasses <strong>three interconnected pillars</strong>, sometimes called the three dimensions of sustainability:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">The Three Pillars of Sustainability</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span><strong className="text-white">Environmental</strong> &mdash; protecting natural resources, reducing pollution, conserving biodiversity, minimising carbon emissions, and ensuring that human activity does not exceed the planet&rsquo;s capacity to regenerate. In construction, this means reducing material waste, specifying sustainably sourced materials, minimising energy consumption, and protecting ecosystems affected by building work.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-blue-400" />
                    <span><strong className="text-white">Social</strong> &mdash; ensuring equity, health, safety, community wellbeing, and quality of life. In construction, this includes providing safe working conditions, fair wages, local employment opportunities, apprenticeships, accessible buildings, and developments that enhance rather than harm communities.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-amber-400" />
                    <span><strong className="text-white">Economic</strong> &mdash; maintaining financial viability, creating long-term value, and ensuring that sustainable practices are economically practical. In construction, this means designing buildings that reduce lifecycle costs, supporting local economies, and ensuring that sustainability measures deliver genuine return on investment rather than being prohibitively expensive.</span>
                  </li>
                </ul>
              </div>

              <p>
                The concept of the <strong>triple bottom line</strong>, coined by John Elkington in 1994, builds directly on these three pillars. It challenges organisations to measure their success not just by financial profit, but across three dimensions: <strong>people, planet, and profit</strong>. A truly sustainable construction project must perform well across all three &mdash; an environmentally excellent building that is financially unviable, or a profitable development that devastates the local community, fails the sustainability test.
              </p>

              {/* Three Pillars Diagram */}
              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <p className="text-sm font-medium text-emerald-400 mb-4 text-center">Three Pillars of Sustainability</p>
                <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4">
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 text-center">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto mb-2">
                      <Leaf className="h-5 w-5 text-emerald-400" />
                    </div>
                    <p className="text-xs font-bold text-emerald-400 mb-1">Environmental</p>
                    <p className="text-[10px] text-white/60">Planet</p>
                    <ul className="text-[10px] text-white/50 mt-2 space-y-0.5 text-left">
                      <li>&bull; Carbon reduction</li>
                      <li>&bull; Resource conservation</li>
                      <li>&bull; Biodiversity protection</li>
                      <li>&bull; Waste minimisation</li>
                    </ul>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 text-center">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mx-auto mb-2">
                      <Users className="h-5 w-5 text-blue-400" />
                    </div>
                    <p className="text-xs font-bold text-blue-400 mb-1">Social</p>
                    <p className="text-[10px] text-white/60">People</p>
                    <ul className="text-[10px] text-white/50 mt-2 space-y-0.5 text-left">
                      <li>&bull; Health &amp; safety</li>
                      <li>&bull; Community wellbeing</li>
                      <li>&bull; Fair employment</li>
                      <li>&bull; Accessibility</li>
                    </ul>
                  </div>
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 text-center">
                    <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center mx-auto mb-2">
                      <TrendingUp className="h-5 w-5 text-amber-400" />
                    </div>
                    <p className="text-xs font-bold text-amber-400 mb-1">Economic</p>
                    <p className="text-[10px] text-white/60">Profit</p>
                    <ul className="text-[10px] text-white/50 mt-2 space-y-0.5 text-left">
                      <li>&bull; Lifecycle cost savings</li>
                      <li>&bull; Long-term value</li>
                      <li>&bull; Local economic benefit</li>
                      <li>&bull; Return on investment</li>
                    </ul>
                  </div>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                    <span className="text-[10px] text-white/60 font-medium">TRIPLE BOTTOM LINE: People + Planet + Profit = Sustainable Development</span>
                  </div>
                </div>
              </div>

              <p>
                For the UK construction industry, sustainability is not an abstract concept. Buildings and infrastructure account for approximately <strong>40% of energy consumption</strong>, <strong>25% of carbon emissions</strong>, and <strong>32% of landfill waste</strong> in the United Kingdom. Every decision made on a construction site &mdash; from material selection to waste management, from energy systems to transport logistics &mdash; has a direct impact on all three pillars of sustainability. Understanding these principles is the essential foundation for everything that follows in this course.
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            SECTION 02: The UN Sustainable Development Goals
            ═══════════════════════════════════════════════ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">02</span>
            The UN Sustainable Development Goals
          </h2>
          <div className="border-l-2 border-emerald-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                In September 2015, all 193 United Nations member states &mdash; including the United Kingdom &mdash; adopted the <strong>2030 Agenda for Sustainable Development</strong>, which set out <strong>17 Sustainable Development Goals (SDGs)</strong>. These goals provide a shared global framework for addressing the most pressing challenges facing humanity: poverty, inequality, climate change, environmental degradation, peace, and justice. Each goal contains specific targets (169 in total) with measurable indicators to track progress.
              </p>

              <p>
                While all 17 SDGs are interconnected and relevant to society as a whole, several are <strong>directly applicable to the construction industry</strong> and the work of electricians and building services professionals:
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">Construction-Relevant SDGs</p>
                </div>
                <ul className="text-sm text-white/80 space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span><strong className="text-white">SDG 6: Clean Water and Sanitation</strong> &mdash; construction projects affect water resources through groundwater disruption, contaminated run-off, and the water consumption of completed buildings. Sustainable construction practices include water-efficient fixtures, rainwater harvesting, greywater recycling, and careful management of construction-phase water discharge.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span><strong className="text-white">SDG 7: Affordable and Clean Energy</strong> &mdash; buildings consume approximately 40% of UK energy. Electricians directly contribute to this goal through the installation of energy-efficient lighting, solar photovoltaic systems, heat pump controls, battery storage, and smart building management systems that reduce energy demand and integrate renewable generation.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span><strong className="text-white">SDG 9: Industry, Innovation and Infrastructure</strong> &mdash; the construction industry must innovate to deliver resilient, sustainable infrastructure. This includes modern methods of construction (MMC), digital technologies such as Building Information Modelling (BIM), offsite manufacturing, and the development of low-carbon building materials and systems.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span><strong className="text-white">SDG 11: Sustainable Cities and Communities</strong> &mdash; the built environment shapes how people live, work, and travel. Sustainable construction contributes to inclusive, safe, resilient, and sustainable cities through energy-efficient buildings, accessible design, green spaces, sustainable transport infrastructure, and climate-resilient development.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span><strong className="text-white">SDG 12: Responsible Consumption and Production</strong> &mdash; construction is one of the most resource-intensive industries globally. This goal drives the adoption of circular economy principles, waste reduction, responsible sourcing of materials, and the use of Environmental Product Declarations (EPDs) to make informed procurement decisions.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span><strong className="text-white">SDG 13: Climate Action</strong> &mdash; the construction sector must drastically reduce its carbon emissions to support the UK&rsquo;s net zero target. This encompasses both embodied carbon (in materials and construction processes) and operational carbon (from building energy use), requiring action across the entire value chain from material extraction to building demolition.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span><strong className="text-white">SDG 15: Life on Land</strong> &mdash; construction activity directly affects terrestrial ecosystems through land use change, habitat loss, and biodiversity reduction. Sustainable construction includes biodiversity net gain requirements (mandatory in England under the Environment Act 2021), ecological surveys, habitat creation, and sensitive site management during construction.</span>
                  </li>
                </ul>
              </div>

              <p>
                The UK Government has committed to delivering the SDGs both domestically and through international development programmes. The <strong>UK Voluntary National Review</strong> (published in 2019 and updated subsequently) reports on progress against each goal. For the construction industry, these global goals translate into practical requirements through national legislation (such as the Environment Act 2021), planning policy, building regulations, and procurement frameworks that increasingly require contractors to demonstrate alignment with SDG targets.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">Why This Matters to You</p>
                </div>
                <p className="text-sm text-white/80">
                  As an electrician or construction professional, you may not interact directly with the UN SDG framework in your daily work. However, the policies, regulations, and client requirements that shape your projects are increasingly driven by these goals. Understanding the SDGs helps you see the bigger picture behind requirements like biodiversity net gain, energy performance targets, and social value commitments in public procurement.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* InlineCheck after Section 02 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ═══════════════════════════════════════════════
            SECTION 03: UK Net Zero Strategy
            ═══════════════════════════════════════════════ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">03</span>
            UK Net Zero Strategy
          </h2>
          <div className="border-l-2 border-emerald-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The United Kingdom&rsquo;s journey towards net zero greenhouse gas emissions is anchored in the <strong>Climate Change Act 2008</strong>, one of the most significant pieces of environmental legislation in UK history. Originally setting a target of an 80% reduction in greenhouse gas emissions by 2050 (against a 1990 baseline), the Act was <strong>amended in June 2019</strong> to set a legally binding target of <strong>net zero emissions by 2050</strong>. This made the UK the first major economy in the world to legislate for net zero.
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">Key Legislative Milestones</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span><strong className="text-white">Climate Change Act 2008</strong> &mdash; established the legal framework for UK carbon reduction, created the Committee on Climate Change (CCC) as an independent advisory body, and introduced the system of five-year carbon budgets that set binding limits on total UK emissions for each period</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span><strong className="text-white">2019 Amendment</strong> &mdash; changed the 2050 target from an 80% reduction to net zero, reflecting updated scientific understanding of the emissions reductions needed to limit global warming to 1.5&deg;C above pre-industrial levels</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span><strong className="text-white">Sixth Carbon Budget (2020)</strong> &mdash; covering the period 2033&ndash;2037, the sixth carbon budget requires a 78% reduction in emissions by 2035 compared to 1990 levels, effectively bringing forward the UK&rsquo;s ambition by 15 years</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span><strong className="text-white">Net Zero Strategy (2021)</strong> &mdash; published by the UK Government, this sets out policies and proposals across every sector of the economy to meet the carbon budgets and achieve net zero by 2050</span>
                  </li>
                </ul>
              </div>

              <p>
                The <strong>construction sector</strong> is central to the UK&rsquo;s net zero strategy because it accounts for approximately <strong>25% of total UK carbon emissions</strong> when both embodied carbon (from materials and construction processes) and operational carbon (from the energy used in completed buildings) are considered. The built environment also accounts for roughly <strong>40% of total UK energy consumption</strong>. Without fundamental changes to how buildings are designed, constructed, and operated, the UK cannot meet its legally binding carbon targets.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Construction&rsquo;s Role in Meeting Carbon Budgets</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span><strong className="text-white">New buildings</strong> must be designed and built to significantly higher energy performance standards. The Future Homes Standard (expected to take effect from 2025) will require new homes to produce 75&ndash;80% less carbon emissions than those built under the 2013 Building Regulations, primarily through improved fabric efficiency and low-carbon heating systems such as heat pumps.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span><strong className="text-white">Existing buildings</strong> present the greatest challenge, as approximately 80% of the buildings that will exist in 2050 have already been built. Retrofitting the existing stock with improved insulation, efficient heating systems, smart controls, and renewable energy is essential but costly and logistically challenging at scale.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span><strong className="text-white">Embodied carbon</strong> in construction materials and processes must be reduced through lower-carbon material alternatives, efficient construction methods, reduced waste, and the adoption of circular economy principles.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span><strong className="text-white">Infrastructure</strong> projects (roads, rail, utilities, energy networks) must also decarbonise, embedding carbon reduction into procurement, design, and construction of major public infrastructure programmes.</span>
                  </li>
                </ul>
              </div>

              <p>
                The <strong>Committee on Climate Change (CCC)</strong> provides independent advice to the UK Government on carbon targets and monitors progress against the carbon budgets. Its annual progress reports consistently highlight the built environment as an area where progress has been too slow and where urgent acceleration is needed. For construction professionals, this means that regulatory requirements will continue to tighten, and the industry must be prepared for increasingly demanding standards.
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            SECTION 04: Circular Economy Principles
            ═══════════════════════════════════════════════ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">04</span>
            Circular Economy Principles
          </h2>
          <div className="border-l-2 border-emerald-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>circular economy</strong> represents a fundamental shift from the traditional <strong>linear economic model</strong> that has dominated industry since the Industrial Revolution. In a linear economy, the process is straightforward and wasteful: raw materials are extracted from the earth, manufactured into products, used for a period, and then disposed of &mdash; typically to landfill or incineration. This <strong>&lsquo;take-make-dispose&rsquo;</strong> model treats natural resources as infinite and waste as an inevitable by-product of economic activity.
              </p>

              <p>
                The circular economy challenges this assumption entirely. Developed and popularised by the <strong>Ellen MacArthur Foundation</strong> (established in 2010), the circular economy model is built on <strong>three core principles</strong>:
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Recycle className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">Ellen MacArthur Foundation &mdash; Three Principles</p>
                </div>
                <ul className="text-sm text-white/80 space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span><strong className="text-white">1. Design out waste and pollution</strong> &mdash; rather than managing waste after it is created, the circular economy seeks to eliminate waste at the design stage. In construction, this means designing buildings for disassembly, specifying materials that can be reused or recycled, standardising components to reduce offcuts, and using digital design tools (such as BIM) to optimise material quantities and eliminate over-ordering.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span><strong className="text-white">2. Keep products and materials in use</strong> &mdash; maximise the useful life of materials through maintenance, repair, reuse, remanufacture, and recycling. In construction, this includes reusing structural steel, reclaiming bricks, refurbishing rather than demolishing buildings, salvaging fixtures and fittings, and recycling concrete as aggregate. The hierarchy of preference is: reuse (highest value) &rarr; repair &rarr; remanufacture &rarr; recycle (lowest value, but still preferable to disposal).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span><strong className="text-white">3. Regenerate natural systems</strong> &mdash; rather than simply minimising environmental damage, the circular economy aims to actively improve natural systems. In construction, this includes biodiversity net gain, green roofs and walls, sustainable urban drainage systems (SuDS), tree planting, habitat creation, and soil remediation on brownfield sites.</span>
                  </li>
                </ul>
              </div>

              {/* Circular vs Linear Economy Diagram */}
              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <p className="text-sm font-medium text-emerald-400 mb-4 text-center">Circular vs Linear Economy Comparison</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Linear Model */}
                  <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-4">
                    <p className="text-xs font-bold text-red-400 mb-3 text-center">LINEAR MODEL</p>
                    <div className="space-y-2">
                      {[
                        { label: "Extract", desc: "Take raw materials from the earth" },
                        { label: "Manufacture", desc: "Process into products" },
                        { label: "Use", desc: "Short useful life" },
                        { label: "Dispose", desc: "Landfill or incineration" },
                      ].map((step, i) => (
                        <div key={i}>
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center flex-shrink-0">
                              <span className="text-[10px] font-bold text-red-400">{i + 1}</span>
                            </div>
                            <div>
                              <p className="text-xs font-medium text-white">{step.label}</p>
                              <p className="text-[10px] text-white/50">{step.desc}</p>
                            </div>
                          </div>
                          {i < 3 && <div className="flex justify-center my-1"><span className="text-red-400/50 text-xs">&darr;</span></div>}
                        </div>
                      ))}
                    </div>
                    <p className="text-[10px] text-red-400/70 text-center mt-3 font-medium">Take &rarr; Make &rarr; Dispose</p>
                  </div>
                  {/* Circular Model */}
                  <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-4">
                    <p className="text-xs font-bold text-emerald-400 mb-3 text-center">CIRCULAR MODEL</p>
                    <div className="space-y-2">
                      {[
                        { label: "Design", desc: "Design out waste from the start" },
                        { label: "Produce", desc: "Use recycled/renewable inputs" },
                        { label: "Use &amp; Maintain", desc: "Extended life through repair" },
                        { label: "Recover", desc: "Reuse, remanufacture, recycle" },
                      ].map((step, i) => (
                        <div key={i}>
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                              <span className="text-[10px] font-bold text-emerald-400">{i + 1}</span>
                            </div>
                            <div>
                              <p className="text-xs font-medium text-white">{step.label}</p>
                              <p className="text-[10px] text-white/50" dangerouslySetInnerHTML={{ __html: step.desc }} />
                            </div>
                          </div>
                          {i < 3 && <div className="flex justify-center my-1"><span className="text-emerald-400/50 text-xs">&darr;</span></div>}
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-center mt-2">
                      <span className="text-emerald-400/50 text-xs">&uarr; Materials loop back &uarr;</span>
                    </div>
                    <p className="text-[10px] text-emerald-400/70 text-center mt-2 font-medium">Make &rarr; Use &rarr; Return &rarr; Remake</p>
                  </div>
                </div>
              </div>

              <p>
                In practical terms, the circular economy in construction means rethinking every stage of a building&rsquo;s lifecycle. At the <strong>design stage</strong>, architects and engineers specify materials that can be recovered, use standardised fixings that allow components to be separated, and create buildings that can be adapted for different uses over time rather than demolished. During <strong>construction</strong>, site teams segregate waste for recycling, return unused materials to suppliers, and use offcuts creatively rather than skipping them. At <strong>end of life</strong>, buildings are carefully deconstructed rather than demolished, with valuable materials recovered for reuse in new projects.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Circular Economy in Practice &mdash; Construction Examples</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span><strong className="text-white">Structural steel reuse</strong> &mdash; steel beams and columns from demolished buildings can be tested, re-certified, and reused in new structures, saving up to 96% of the embodied carbon compared to producing new steel</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span><strong className="text-white">Reclaimed bricks</strong> &mdash; hand-cleaned reclaimed bricks retain their structural properties and aesthetic character while avoiding the carbon emissions of firing new bricks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span><strong className="text-white">Recycled aggregate</strong> &mdash; crushed concrete from demolition can replace virgin aggregate in new concrete mixes, road bases, and fill applications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span><strong className="text-white">Cable and copper recovery</strong> &mdash; electrical cabling contains valuable copper and aluminium that can be recycled with minimal quality loss, and responsible electricians ensure cable offcuts are collected for recycling rather than disposed of as general waste</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span><strong className="text-white">Design for disassembly (DfD)</strong> &mdash; using mechanical fixings (bolts, clips) instead of chemical bonds (adhesives, welding) so that components can be separated and reused at end of life</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* InlineCheck after Section 04 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ═══════════════════════════════════════════════
            SECTION 05: Sustainable Construction
            ═══════════════════════════════════════════════ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">05</span>
            Sustainable Construction
          </h2>
          <div className="border-l-2 border-emerald-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Sustainable construction is the practical application of sustainability principles to the design, construction, operation, and eventual demolition or deconstruction of buildings and infrastructure. At its core is the concept of <strong>whole life carbon</strong> &mdash; the total greenhouse gas emissions associated with a building across its entire lifecycle, from the extraction of raw materials to eventual end-of-life treatment.
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Building2 className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">Whole Life Carbon: Two Components</p>
                </div>
                <ul className="text-sm text-white/80 space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span><strong className="text-white">Embodied carbon</strong> &mdash; the carbon emissions associated with extracting, processing, manufacturing, transporting, and installing building materials, plus emissions from maintenance, repair, replacement, and eventual demolition or deconstruction. For a typical new UK building, embodied carbon can represent <strong>30&ndash;50% of total whole life carbon</strong> over a 60-year design life. For highly energy-efficient buildings (such as Passivhaus), the proportion is even higher because operational emissions are so dramatically reduced.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span><strong className="text-white">Operational carbon</strong> &mdash; the carbon emissions from energy consumed during the building&rsquo;s occupied life, including heating, cooling, hot water, lighting, ventilation, cooking, and plug loads (appliances and equipment). Operational carbon has traditionally been the primary focus of building regulations, but as the UK grid decarbonises and buildings become more energy-efficient, the relative importance of embodied carbon is increasing.</span>
                  </li>
                </ul>
              </div>

              <p>
                <strong>Modern methods of construction (MMC)</strong> encompass a range of innovative building techniques that can significantly improve the sustainability of construction. The term covers several approaches, all sharing the goal of delivering better-quality buildings more efficiently and with less waste:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Modern Methods of Construction (MMC)</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span><strong className="text-white">Prefabrication</strong> &mdash; manufacturing building components in a controlled factory environment before transporting them to site for assembly. This reduces waste (factory processes can be optimised for material efficiency), improves quality (consistent controlled conditions), and reduces on-site construction time. Prefabricated elements can range from simple items (pre-made wall panels, floor cassettes) to complete volumetric modules (fully fitted bathroom pods, complete room modules).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span><strong className="text-white">Offsite manufacturing</strong> &mdash; a broader category that includes prefabrication but also encompasses the manufacture of entire building sections in a factory, including mechanical and electrical services pre-installed within wall, floor, or ceiling panels. Offsite manufacturing can reduce construction waste by up to 70% compared to traditional on-site methods and significantly shorten build programmes.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span><strong className="text-white">Modular construction</strong> &mdash; complete volumetric units (rooms or groups of rooms) are manufactured in a factory, fitted out with all services (electrical, plumbing, heating, ventilation), finished (painted, floored, furnished), and then transported to site for assembly onto prepared foundations. This approach can reduce total build time by 50% or more and delivers exceptionally consistent quality.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span><strong className="text-white">Hybrid approaches</strong> &mdash; combining offsite-manufactured elements (such as structural frames, floor cassettes, and pre-fitted service risers) with traditional on-site work for elements that are difficult to prefabricate (such as complex junctions, bespoke architectural features, or site-specific connections). Most modern construction projects use some degree of hybrid approach.</span>
                  </li>
                </ul>
              </div>

              <p>
                For electricians, MMC has direct practical implications. Electrical installations in prefabricated and modular buildings may involve <strong>pre-wired panels</strong>, <strong>factory-installed distribution boards</strong>, <strong>plug-and-play connector systems</strong>, and <strong>pre-tested circuits</strong> that are commissioned in the factory before delivery to site. This requires electricians to understand both factory installation processes and the on-site connection and commissioning of pre-fabricated electrical systems.
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Factory className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">Sustainability Benefits of MMC</p>
                </div>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span><strong className="text-white">Waste reduction</strong> &mdash; up to 70% less construction waste compared to traditional methods</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span><strong className="text-white">Quality improvement</strong> &mdash; factory-controlled conditions produce more consistent, airtight, and thermally efficient buildings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span><strong className="text-white">Reduced site disruption</strong> &mdash; shorter on-site build periods mean less noise, dust, traffic, and disturbance to surrounding communities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span><strong className="text-white">Improved safety</strong> &mdash; factory environments are inherently safer than construction sites, with fewer working-at-height operations and better-controlled manual handling</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            SECTION 06: Life Cycle Assessment (LCA)
            ═══════════════════════════════════════════════ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">06</span>
            Life Cycle Assessment (LCA)
          </h2>
          <div className="border-l-2 border-emerald-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Life Cycle Assessment (LCA)</strong> is a systematic, standardised methodology for evaluating the environmental impacts of a product, process, or system across its entire lifecycle. In construction, LCA provides the evidence base for comparing building materials, construction methods, and design options on their environmental performance &mdash; moving beyond assumptions and marketing claims to quantified, verifiable data.
              </p>

              <p>
                LCA in the built environment follows the international standards <strong>ISO 14040</strong> (Principles and Framework) and <strong>ISO 14044</strong> (Requirements and Guidelines). These standards ensure that LCA studies are conducted using consistent methodology, transparent assumptions, and comparable boundaries, making it possible to meaningfully compare the environmental impact of different products and designs.
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <BarChart3 className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">LCA Lifecycle Stages (Cradle-to-Grave)</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span><strong className="text-white">A1&ndash;A3: Product stage</strong> &mdash; raw material extraction and supply, transport to manufacturer, manufacturing and processing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span><strong className="text-white">A4&ndash;A5: Construction process stage</strong> &mdash; transport from factory/warehouse to construction site, installation and assembly on site (including waste generated during installation)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span><strong className="text-white">B1&ndash;B7: Use stage</strong> &mdash; use, maintenance, repair, replacement, refurbishment, operational energy use, and operational water use over the building&rsquo;s design life</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span><strong className="text-white">C1&ndash;C4: End-of-life stage</strong> &mdash; deconstruction or demolition, transport to waste processing, waste processing for reuse/recovery/recycling, and final disposal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span><strong className="text-white">Module D: Beyond the system boundary</strong> &mdash; benefits and loads from reuse, recovery, and recycling of materials (this module captures the positive environmental impact of circular economy practices)</span>
                  </li>
                </ul>
              </div>

              <p>
                <strong>Environmental Product Declarations (EPDs)</strong> are the primary mechanism through which LCA data is communicated to construction professionals. An EPD is a standardised document, produced in accordance with <strong>ISO 14025</strong>, that presents the environmental impact of a specific product based on independently verified LCA data. EPDs enable like-for-like comparison between products from different manufacturers &mdash; for example, comparing the global warming potential of two different cable tray systems, or the embodied carbon of copper cabling versus aluminium alternatives.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Environmental Impact Categories in EPDs</p>
                <p className="text-sm text-white/80 mb-3">
                  EPDs typically report impact across several environmental categories, including:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span><strong className="text-white">Global Warming Potential (GWP)</strong> &mdash; measured in kg CO&#8322; equivalent, this is the most commonly referenced indicator and represents the product&rsquo;s contribution to climate change</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span><strong className="text-white">Ozone Depletion Potential (ODP)</strong> &mdash; the product&rsquo;s contribution to the breakdown of the stratospheric ozone layer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span><strong className="text-white">Acidification Potential (AP)</strong> &mdash; the product&rsquo;s contribution to acid rain and soil/water acidification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span><strong className="text-white">Eutrophication Potential (EP)</strong> &mdash; the product&rsquo;s contribution to nutrient enrichment of water bodies, causing algal blooms and oxygen depletion</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span><strong className="text-white">Abiotic Depletion Potential (ADP)</strong> &mdash; the product&rsquo;s consumption of non-renewable resources (minerals, fossil fuels)</span>
                  </li>
                </ul>
              </div>

              <p>
                For construction professionals, LCA and EPDs provide the tools to make <strong>evidence-based material selection decisions</strong>. Rather than relying on generalised assumptions (&ldquo;timber is always more sustainable than steel&rdquo;), LCA data allows project-specific comparisons that account for the actual products being specified, their transport distances, the building&rsquo;s design life, and end-of-life scenarios. This is increasingly important as clients, planning authorities, and building rating systems (such as BREEAM) require quantified evidence of environmental performance.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">LCA in Practice &mdash; Comparing Building Materials</p>
                <p className="text-sm text-white/80 mb-3">
                  LCA enables meaningful comparison of construction materials. For example:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span><strong className="text-white">Concrete vs timber frame</strong> &mdash; timber sequesters carbon during growth (negative embodied carbon at the product stage) but may have a shorter design life and different end-of-life profile compared to reinforced concrete. LCA reveals the full picture across all lifecycle stages.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span><strong className="text-white">Copper vs aluminium cabling</strong> &mdash; copper has higher embodied energy per kilogram but is more conductive (requiring less material for the same current-carrying capacity) and is almost infinitely recyclable. LCA helps determine which is more sustainable for a specific application.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span><strong className="text-white">Mineral wool vs PIR insulation</strong> &mdash; PIR boards have higher thermal performance per unit thickness (reducing embodied carbon in structural elements) but are petroleum-derived and difficult to recycle. Mineral wool is more recyclable but requires greater thickness. LCA enables a balanced assessment.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* InlineCheck after Section 06 */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ═══════════════════════════════════════════════
            SECTION 07: Corporate Social Responsibility
            ═══════════════════════════════════════════════ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">07</span>
            Corporate Social Responsibility
          </h2>
          <div className="border-l-2 border-emerald-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Corporate Social Responsibility (CSR)</strong> refers to an organisation&rsquo;s voluntary commitment to managing its social, environmental, and economic impacts in a way that goes beyond minimum legal compliance. In the UK construction industry, CSR has evolved from a peripheral &lsquo;nice to have&rsquo; into a core business function that directly influences contract awards, client relationships, and public perception.
              </p>

              <p>
                For construction companies, CSR encompasses a wide range of activities and commitments that collectively demonstrate responsible business conduct. While the specific focus varies between organisations, the key areas of CSR in construction include:
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">CSR in Construction &mdash; Key Areas</p>
                </div>
                <ul className="text-sm text-white/80 space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span><strong className="text-white">Community engagement</strong> &mdash; consulting with local communities before and during construction, minimising disruption (noise, dust, traffic), employing local workers and subcontractors, supporting local businesses, sponsoring community facilities, and leaving a positive legacy in the areas where projects are delivered. Effective community engagement goes beyond statutory consultation requirements and builds genuine relationships with affected communities.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span><strong className="text-white">Social value</strong> &mdash; creating measurable benefits for society beyond the direct purpose of the construction project. This includes providing apprenticeship and training opportunities, offering work placements for disadvantaged groups, supporting schools and colleges through STEM engagement programmes, creating employment pathways for ex-offenders or long-term unemployed people, and investing in local skills development. The <strong>Social Value Act 2012</strong> requires public sector commissioners to consider social value when awarding contracts, making this directly relevant to tendering.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span><strong className="text-white">Supply chain ethics</strong> &mdash; ensuring that the entire supply chain operates ethically, which includes fair payment practices (paying subcontractors and suppliers promptly and fairly), preventing modern slavery (complying with the Modern Slavery Act 2015 and conducting due diligence on suppliers), promoting diversity and inclusion, and ensuring that materials are responsibly sourced (for example, using FSC-certified timber or conflict-free minerals).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span><strong className="text-white">Environmental stewardship</strong> &mdash; going beyond regulatory compliance to actively protect and enhance the environment. This includes voluntary carbon reduction targets, biodiversity enhancement, habitat creation, pollution prevention measures that exceed legal requirements, and transparent environmental reporting.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span><strong className="text-white">Workforce wellbeing</strong> &mdash; investing in the health, safety, and wellbeing of employees and subcontractors beyond minimum legal requirements. This includes mental health support programmes, occupational health services, flexible working arrangements, training and development opportunities, and creating an inclusive workplace culture where all workers feel valued and respected.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">The Social Value Act 2012</p>
                </div>
                <p className="text-sm text-white/80">
                  The Public Services (Social Value) Act 2012 requires all public sector bodies in England and Wales to consider how the services they commission and procure might improve the economic, social, and environmental wellbeing of the area. For construction companies bidding for public sector contracts, this means demonstrating measurable social value &mdash; such as local employment creation, apprenticeship provision, community investment, and environmental enhancement &mdash; as part of the tender evaluation. Social value can account for <strong>up to 20% of the total tender score</strong> on many government construction frameworks, making it a significant competitive differentiator.
                </p>
              </div>

              <p>
                CSR is not just a large-company concern. Small and medium-sized construction businesses, including electrical contractors, can demonstrate social responsibility through practical actions: paying workers fairly, supporting apprentices, sourcing materials locally where possible, recycling waste diligently, engaging positively with neighbours during projects, and maintaining high standards of health and safety. These actions build reputation, attract better workers, and increasingly influence contract awards.
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            SECTION 08: The Business Case for Sustainability
            ═══════════════════════════════════════════════ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">08</span>
            The Business Case for Sustainability
          </h2>
          <div className="border-l-2 border-emerald-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Sustainability is sometimes perceived as an additional cost &mdash; an overhead that reduces profitability and slows down projects. In reality, the evidence overwhelmingly demonstrates that <strong>sustainable construction practices deliver measurable financial benefits</strong>, competitive advantages, and risk reduction. Understanding the business case is essential because it demonstrates that sustainability and profitability are not opposing forces but complementary objectives.
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">Cost Savings</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span><strong className="text-white">Energy cost reduction</strong> &mdash; energy-efficient buildings cost significantly less to heat, cool, light, and operate. A building designed to high energy performance standards (such as Passivhaus or near-zero energy) can reduce energy costs by 60&ndash;90% compared to a baseline building, delivering substantial savings over its operational life that far exceed any additional capital cost.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span><strong className="text-white">Waste reduction savings</strong> &mdash; the construction industry generates approximately 62 million tonnes of waste annually in the UK. Effective waste management &mdash; including design for minimal waste, site segregation for recycling, and reuse of materials &mdash; directly reduces disposal costs (landfill tax is currently &pound;103.70 per tonne for active waste) and material purchasing costs.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span><strong className="text-white">Water efficiency savings</strong> &mdash; water-efficient fixtures, rainwater harvesting, and greywater recycling reduce both water supply charges and sewerage disposal costs for building occupants, while responsible water management during construction reduces site costs and environmental permit requirements.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span><strong className="text-white">Reduced maintenance costs</strong> &mdash; buildings designed and constructed to high sustainability standards typically use more durable materials, better construction detailing, and higher-quality systems that require less maintenance and have longer replacement cycles, reducing whole-life costs.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Competitive and Planning Advantages</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span><strong className="text-white">Planning advantages</strong> &mdash; developments that demonstrate high sustainability credentials may receive more favourable treatment in the planning process. Many local planning authorities include sustainability requirements in their development plan policies, and schemes that exceed minimum requirements can gain competitive advantage in planning negotiations, particularly for sites with sustainability-related planning conditions.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span><strong className="text-white">Client expectations</strong> &mdash; an increasing number of clients, particularly in the public sector and corporate occupier market, require their construction partners to demonstrate sustainability credentials. This includes carbon reduction plans, environmental management systems (ISO 14001), social value commitments, and evidence of sustainable supply chain management. Companies that cannot demonstrate these credentials are excluded from tender lists.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span><strong className="text-white">ESG reporting</strong> &mdash; Environmental, Social, and Governance (ESG) reporting has become a mainstream requirement for listed companies and large private businesses. Construction companies that are part of global supply chains are increasingly required to provide ESG data to their clients, covering carbon emissions (Scope 1, 2, and 3), waste generation and diversion rates, water consumption, health and safety performance, diversity statistics, and governance practices. Strong ESG performance attracts investment, improves credit ratings, and enhances shareholder confidence.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span><strong className="text-white">Green credentials and reputation</strong> &mdash; construction companies with strong sustainability track records attract better talent (particularly younger workers who value corporate responsibility), win more contracts, command higher fees, and build stronger long-term relationships with clients. Certifications such as ISO 14001 (environmental management), PAS 2080 (carbon management in infrastructure), and membership of industry sustainability initiatives (such as the Supply Chain Sustainability School) provide third-party validation of sustainability credentials.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">Risk of Inaction</p>
                </div>
                <p className="text-sm text-white/80">
                  Companies that fail to engage with sustainability face increasing risks: exclusion from public sector frameworks (which often require minimum sustainability standards), loss of private sector clients who demand ESG credentials, rising regulatory compliance costs as environmental legislation tightens, reputational damage from poor environmental or social performance, difficulty attracting skilled workers (particularly younger professionals), and vulnerability to carbon pricing mechanisms as the UK moves towards more stringent carbon taxation. The business case for sustainability is no longer optional &mdash; it is a fundamental requirement for long-term commercial viability in the UK construction market.
                </p>
              </div>

              <p>
                For individual electricians and electrical contractors, sustainability credentials are becoming equally important. Demonstrating competence in renewable energy systems (solar PV, battery storage, EV charging, heat pump controls), energy-efficient lighting design, and smart building management systems opens up growing market sectors. Clients increasingly seek contractors who can advise on sustainable options, and the ability to discuss embodied carbon, lifecycle costs, and energy performance distinguishes forward-thinking electrical businesses from their competitors.
              </p>
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════
            Bottom Navigation — Section 3 / Module 2
            ═════════════════════════════════════════ */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pb-8 border-b border-white/10 mb-10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../environmental-sustainability-module-1-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-emerald-500 text-white hover:bg-emerald-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../environmental-sustainability-module-2">
              Next: Module 2
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </nav>

        {/* ═════════════════════════════════════════
            FAQ Section
            ═════════════════════════════════════════ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/80 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ═════════════════════════════════════════
            Quiz
            ═════════════════════════════════════════ */}
        <Quiz
          title="Section 4 Knowledge Check"
          questions={quizQuestions}
        />

        {/* ═════════════════════════════════════════
            Repeated Bottom Navigation
            ═════════════════════════════════════════ */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../environmental-sustainability-module-1-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-emerald-500 text-white hover:bg-emerald-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../environmental-sustainability-module-2">
              Next: Module 2
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
