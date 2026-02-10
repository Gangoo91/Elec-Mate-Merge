import {
  ArrowLeft,
  Package,
  CheckCircle,
  AlertTriangle,
  Leaf,
  TreePine,
  Recycle,
  ShieldCheck,
  FileText,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

/* ------------------------------------------------------------------ */
/*  Quick Check Questions (inline after sections 02, 04, 06)          */
/* ------------------------------------------------------------------ */
const quickCheckQuestions = [
  {
    id: "fsc-pefc-purpose",
    question:
      "What do FSC and PEFC certification schemes guarantee about timber products?",
    options: [
      "That the timber has been sourced from responsibly managed forests with verified chain of custody",
      "That the timber has the lowest possible embodied carbon of any building material",
      "That the timber is exempt from Building Regulations fire safety requirements",
      "That the timber has been kiln-dried to a moisture content below 12%",
    ],
    correctIndex: 0,
    explanation:
      "FSC (Forest Stewardship Council) and PEFC (Programme for the Endorsement of Forest Certification) are international certification schemes that verify timber has been sourced from responsibly managed forests. They ensure a chain of custody from forest to final product, confirming that harvesting practices are sustainable, biodiversity is protected, and local communities are respected.",
  },
  {
    id: "recycled-steel-content",
    question:
      "Approximately what percentage of UK-produced steel is made from recycled scrap content?",
    options: [
      "Around 10%",
      "Around 30%",
      "Around 60%",
      "Around 90%",
    ],
    correctIndex: 1,
    explanation:
      "UK-produced steel contains approximately 30% recycled scrap content on average. Steel produced via the Electric Arc Furnace (EAF) route can contain significantly higher recycled content (up to 100% scrap), whilst Basic Oxygen Steelmaking (BOS) typically uses around 25% scrap. Steel is one of the most recyclable construction materials, capable of being recycled indefinitely without losing its structural properties.",
  },
  {
    id: "bes-6001-purpose",
    question:
      "What does the BES 6001 standard assess in relation to construction products?",
    options: [
      "The structural performance of materials under load",
      "The responsible sourcing of construction products across their supply chain",
      "The fire resistance rating of insulation materials",
      "The thermal conductivity values of building envelope components",
    ],
    correctIndex: 1,
    explanation:
      "BES 6001 is the Framework Standard for Responsible Sourcing of Construction Products. It assesses how responsibly a product has been sourced by examining organisational governance, supply chain management, environmental and social aspects, and stakeholder engagement. Products certified to BES 6001 carry a rating (Pass, Good, Very Good, or Excellent) and contribute credits under BREEAM assessments.",
  },
];

/* ------------------------------------------------------------------ */
/*  Frequently Asked Questions                                        */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question:
      "How do I know whether a material is genuinely sustainable, or whether the manufacturer is greenwashing?",
    answer:
      "Look for independently verified evidence rather than vague marketing claims. Third-party certifications such as FSC, PEFC, BES 6001, and Environmental Product Declarations (EPDs) to EN 15804 provide audited, transparent data. Check whether the manufacturer publishes verified embodied carbon figures, whether their supply chain is traceable, and whether they hold ISO 14001 environmental management certification. The BRE Green Guide to Specification rates over 1,500 building elements from A+ to E and can help you compare options objectively. If a manufacturer cannot produce any third-party verification, treat sustainability claims with caution.",
  },
  {
    question:
      "Is it always better to choose a material with the lowest embodied carbon?",
    answer:
      "Not necessarily. Embodied carbon is one important factor, but it must be balanced against operational performance, durability, and whole-life carbon. For example, a natural insulation material might have lower embodied carbon than PIR foam, but if it requires a significantly thicker build-up to achieve the same thermal performance, the overall impact on the building envelope and energy efficiency must be considered. Whole-life carbon assessment (as described in EN 15978) looks at the entire lifecycle, including manufacture, transport, installation, in-use performance, maintenance, and end-of-life disposal or recycling. A material with slightly higher embodied carbon but a 60-year lifespan may be a better choice than one with lower embodied carbon that needs replacing every 20 years.",
  },
  {
    question:
      "What practical steps can a site electrician take to reduce material waste?",
    answer:
      "Accurate measurement and specification are the foundation of waste reduction. Always measure cable runs precisely rather than over-ordering, and use cable cutting lists to minimise offcuts. Order standard lengths and sizes where possible, and store materials properly to avoid weather damage and spoilage. Segregate waste on site so that metals (copper, steel, aluminium) go to the correct recycling streams rather than general waste. Return unused materials to the supplier where return policies allow. Reuse offcuts for smaller runs where they meet specification. Keep a record of waste generated so you can identify patterns and improve future ordering. Even small changes, such as using cable drum returns and recycling packaging, add up across a project.",
  },
  {
    question:
      "What is a material passport, and why is it relevant to sustainable procurement?",
    answer:
      "A material passport is a digital document that records the composition, origin, and characteristics of every material and product used in a building. It typically includes manufacturer details, material composition, embodied carbon data, recycled content, certifications held, expected lifespan, and end-of-life options (whether the product can be reused, recycled, or must be disposed of as waste). Material passports support the circular economy by ensuring that when a building is eventually refurbished or deconstructed, the materials within it can be identified, recovered, and reused rather than sent to landfill. They are increasingly required on projects targeting BREEAM Excellent or Outstanding ratings.",
  },
];

/* ------------------------------------------------------------------ */
/*  End-of-Section Quiz                                               */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      "Which of the following is NOT a recognised criterion for classifying a material as sustainable?",
    options: [
      "Low embodied carbon and energy in manufacture",
      "Capable of being recycled or reused at end of life",
      "Available at the lowest possible purchase price",
      "Sourced from responsibly managed supply chains",
    ],
    correctAnswer: 2,
    explanation:
      "Sustainability criteria include low embodied carbon, renewability, recyclability, non-toxicity, local sourcing, and responsible harvesting. Purchase price alone is not a sustainability criterion. A cheap material may have very high environmental and social costs across its lifecycle. Sustainable procurement considers whole-life cost and environmental impact, not just the initial purchase price.",
  },
  {
    id: 2,
    question:
      "Cross-Laminated Timber (CLT) is increasingly used as a structural alternative to steel and concrete. What is its primary environmental benefit?",
    options: [
      "It is completely fireproof without any additional treatment",
      "It sequesters carbon, storing CO\u2082 absorbed during tree growth within the building structure",
      "It has zero embodied energy because trees grow without human intervention",
      "It does not require any certification or chain of custody documentation",
    ],
    correctAnswer: 1,
    explanation:
      "CLT sequesters carbon because the timber stores the CO\u2082 that the trees absorbed during growth. A cubic metre of timber stores approximately 1 tonne of CO\u2082 equivalent. When used in long-life structural applications, this carbon remains locked away for the lifespan of the building. CLT does require fire engineering consideration and should be sourced from FSC or PEFC certified forests.",
  },
  {
    id: 3,
    question:
      "What is the primary purpose of replacing a proportion of Portland cement clinker with Ground Granulated Blast-furnace Slag (GGBS) in concrete?",
    options: [
      "To increase the early-age strength gain of the concrete",
      "To reduce the embodied carbon of the concrete by using a waste by-product",
      "To make the concrete completely waterproof without additional admixtures",
      "To eliminate the need for reinforcement in structural elements",
    ],
    correctAnswer: 1,
    explanation:
      "Portland cement clinker production is responsible for approximately 7% of global CO\u2082 emissions. Replacing a proportion of clinker with GGBS (a waste by-product of steel manufacturing) significantly reduces the embodied carbon of concrete. GGBS concretes (CEM III) can replace up to 70% of the clinker, dramatically cutting the carbon footprint. They also offer improved durability and resistance to chemical attack, though early-age strength gain is typically slower.",
  },
  {
    id: 4,
    question:
      "Steel is described as being recyclable indefinitely. What does this mean in practical terms?",
    options: [
      "Steel can only be recycled once before it loses its structural properties",
      "Steel can be melted down and reformed into new products repeatedly without loss of quality",
      "Steel must be mixed with virgin material each time it is recycled",
      "Steel recycling is only possible using Basic Oxygen Steelmaking (BOS)",
    ],
    correctAnswer: 1,
    explanation:
      "Steel is 100% recyclable and can be melted down and reformed into new products repeatedly without any degradation of its structural properties. This makes it one of the most circular construction materials. The Electric Arc Furnace (EAF) route can produce steel from 100% scrap, and the resulting product is indistinguishable in quality from steel made from virgin ore. Designing for disassembly (using bolted connections rather than welded) makes steel recovery and reuse even more efficient.",
  },
  {
    id: 5,
    question:
      "When comparing insulation materials, which natural option typically has the lowest embodied carbon?",
    options: [
      "Polyisocyanurate (PIR) rigid foam boards",
      "Expanded Polystyrene (EPS)",
      "Sheep wool insulation",
      "Mineral wool (glass or rock)",
    ],
    correctAnswer: 2,
    explanation:
      "Sheep wool insulation typically has the lowest embodied carbon of common insulation options because it requires minimal processing energy, is a renewable agricultural by-product, and sequesters carbon within the wool fibres. Other natural options such as hemp, wood fibre, and cellulose also have low embodied carbon. PIR and EPS are petroleum-derived and have significantly higher embodied carbon, though they offer superior thermal performance per unit thickness.",
  },
  {
    id: 6,
    question:
      "Under the BES 6001 framework, what are the four possible certification ratings for a construction product?",
    options: [
      "Bronze, Silver, Gold, and Platinum",
      "Pass, Good, Very Good, and Excellent",
      "Level 1, Level 2, Level 3, and Level 4",
      "Basic, Standard, Premium, and Elite",
    ],
    correctAnswer: 1,
    explanation:
      "BES 6001 awards four certification ratings: Pass, Good, Very Good, and Excellent. The rating reflects how comprehensively the manufacturer has addressed responsible sourcing across their organisation and supply chain. Higher ratings contribute more credits under BREEAM assessments. The framework examines organisational governance, supply chain management, environmental stewardship, social responsibility, and stakeholder engagement.",
  },
  {
    id: 7,
    question:
      "What information does an Environmental Product Declaration (EPD) provide that a standard product datasheet does not?",
    options: [
      "The product price and availability from local merchants",
      "Verified environmental impact data across the product lifecycle, based on EN 15804",
      "The installation method and required tools",
      "The manufacturer warranty period and conditions",
    ],
    correctAnswer: 1,
    explanation:
      "An EPD provides independently verified environmental impact data for a product across its lifecycle, calculated in accordance with EN 15804. This includes Global Warming Potential (embodied carbon in kgCO\u2082e), ozone depletion potential, acidification potential, eutrophication potential, resource depletion, water usage, and waste generation across defined lifecycle stages. EPDs enable like-for-like comparison between competing products based on objective environmental data rather than marketing claims.",
  },
  {
    id: 8,
    question:
      "What is the primary benefit of designing buildings for deconstruction rather than demolition?",
    options: [
      "It eliminates the need for planning permission at end of life",
      "It allows materials and components to be recovered, reused, or recycled rather than sent to landfill",
      "It means the building does not need to comply with structural regulations",
      "It reduces the initial construction cost by at least 20%",
    ],
    correctAnswer: 1,
    explanation:
      "Design for deconstruction (DfD) means designing buildings so that at end of life, materials and components can be carefully taken apart, recovered, and either reused directly or recycled into new products. This reduces waste to landfill, conserves virgin resources, and supports the circular economy. Techniques include using bolted rather than welded steel connections, mechanical fixings rather than adhesives, modular panel systems, and maintaining material passports so the composition of every element is known.",
  },
];

/* ================================================================== */
/*  Component                                                         */
/* ================================================================== */
export default function EnvironmentalSustainabilityModule3Section4() {
  useSEO({
    title:
      "Sustainable Materials & Procurement | Environmental & Sustainability Module 3.4",
    description:
      "Sustainable construction materials, responsible procurement, timber certification, cement alternatives, recycled steel, natural insulation, EPDs, BES 6001, reducing material waste, and design for deconstruction.",
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* ── Sticky Header ─────────────────────────────────────────── */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../environmental-sustainability-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* ── Page Title ──────────────────────────────────────────── */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-400/20 border border-emerald-500/30 mb-4">
            <Package className="h-7 w-7 text-emerald-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-3 mx-auto">
            <span className="text-emerald-400 text-xs font-semibold">
              MODULE 3 &middot; SECTION 4
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Sustainable Materials &amp; Procurement
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Choosing construction materials with lower environmental impact,
            understanding responsible sourcing frameworks, and reducing material
            waste across the project lifecycle
          </p>
        </header>

        {/* ── Quick Summary Boxes ─────────────────────────────────── */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-emerald-500/5 border-l-2 border-emerald-500/50">
            <p className="text-emerald-500 text-base font-medium mb-2">
              In 30 Seconds
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Sustainable materials:</strong> Low embodied carbon,
                renewable, recyclable, non-toxic
              </li>
              <li>
                <strong>Timber:</strong> FSC/PEFC certified, CLT, glulam,
                UK-grown
              </li>
              <li>
                <strong>Cement alternatives:</strong> GGBS, PFA, CEM II/CEM III
              </li>
              <li>
                <strong>Procurement:</strong> BES 6001, EPDs, EN 15804
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-emerald-500/5 border-l-2 border-emerald-500/50">
            <p className="text-emerald-400 text-base font-medium mb-2">
              On Site
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Specify certified:</strong> FSC/PEFC timber, BES 6001
                products
              </li>
              <li>
                <strong>Check EPDs:</strong> Compare embodied carbon between
                options
              </li>
              <li>
                <strong>Reduce waste:</strong> Accurate specification, standard
                sizes
              </li>
              <li>
                <strong>Think circular:</strong> Design for disassembly and reuse
              </li>
            </ul>
          </div>
        </div>

        {/* ── Learning Outcomes ───────────────────────────────────── */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">
            Learning Outcomes
          </h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define what makes a construction material sustainable and list the key assessment criteria",
              "Explain the role of FSC and PEFC certification in responsible timber sourcing",
              "Describe how cement alternatives such as GGBS and PFA reduce embodied carbon in concrete",
              "Outline the recyclability of steel and the importance of designing for disassembly",
              "Compare natural and synthetic insulation materials in terms of embodied carbon and performance",
              "Explain the BES 6001 responsible sourcing framework and its role in procurement",
              "Read and interpret an Environmental Product Declaration (EPD) to EN 15804",
              "Identify practical strategies for reducing material waste on construction sites",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-emerald-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* ============================================================ */}
        {/*  SECTION 01 — What Are Sustainable Materials?                 */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">01</span>
            What Are Sustainable Materials?
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A <strong>sustainable construction material</strong> is one whose
                extraction, manufacture, transport, use, and end-of-life disposal
                or recycling cause the <strong>least possible harm</strong> to
                the environment and to human health. No single material is
                perfectly sustainable in every respect, so the goal is to select
                materials that perform well across a range of environmental and
                social criteria.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-emerald-400 mb-3">
                  Key Criteria for Sustainable Materials
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    {
                      title: "Low Embodied Carbon",
                      desc: "Minimal CO\u2082 emissions during raw material extraction, manufacturing, and transport to site. Measured in kgCO\u2082e per functional unit.",
                    },
                    {
                      title: "Renewable",
                      desc: "Derived from resources that can be replenished within a human timescale, such as timber from managed forests, hemp, or sheep wool.",
                    },
                    {
                      title: "Recyclable",
                      desc: "Capable of being recovered and reprocessed into new products at end of life, reducing demand for virgin resources. Steel, aluminium, and copper are highly recyclable.",
                    },
                    {
                      title: "Non-Toxic",
                      desc: "Free from harmful chemicals that could affect occupant health or contaminate the environment during manufacture, use, or disposal.",
                    },
                    {
                      title: "Locally Sourced",
                      desc: "Produced as close to the point of use as practical, reducing transport emissions and supporting the local economy. UK-grown timber is a good example.",
                    },
                    {
                      title: "Responsibly Harvested",
                      desc: "Extracted or harvested in ways that protect ecosystems, biodiversity, and the rights of local communities. Verified by certification schemes such as FSC and PEFC.",
                    },
                  ].map((criterion, i) => (
                    <div
                      key={i}
                      className="bg-white/5 border border-white/10 rounded-lg p-3"
                    >
                      <p className="text-sm font-medium text-emerald-400 mb-1">
                        {criterion.title}
                      </p>
                      <p className="text-xs sm:text-sm text-white/80">
                        {criterion.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-500">Key Point:</strong> No
                  material is &ldquo;perfectly sustainable.&rdquo; Timber
                  sequesters carbon but requires land and water; steel is
                  infinitely recyclable but energy-intensive to produce from ore.
                  The skill is in <strong>comparing trade-offs</strong> and
                  selecting the best option for each specific application using
                  objective data such as EPDs and lifecycle assessments.
                </p>
              </div>

              <p>
                The UK construction industry is responsible for approximately{" "}
                <strong>40% of the nation&rsquo;s total carbon emissions</strong>{" "}
                when both embodied and operational carbon are included. Material
                selection is therefore one of the most impactful decisions a
                designer, specifier, or contractor can make. Even small
                improvements &mdash; such as specifying CEM II concrete instead
                of CEM I, or choosing FSC-certified timber over uncertified
                imports &mdash; can deliver significant carbon savings when
                scaled across a project.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 02 — Timber & Wood Products                         */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">02</span>
            Timber &amp; Wood Products
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Timber is one of the most sustainable structural materials
                available to the construction industry. Unlike concrete or steel,
                timber is <strong>renewable</strong> &mdash; trees can be
                replanted and regrown &mdash; and it actively{" "}
                <strong>sequesters carbon</strong> during growth. A cubic metre
                of timber stores approximately{" "}
                <strong>1 tonne of CO&#8322; equivalent</strong>, locking that
                carbon away for the lifespan of the building.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <TreePine className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">
                    FSC &amp; PEFC Certification
                  </p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  Certification schemes provide independent assurance that timber
                  has been sourced from responsibly managed forests:
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">
                      FSC (Forest Stewardship Council)
                    </p>
                    <ul className="text-xs sm:text-sm text-white/80 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                        <span>
                          International not-for-profit organisation
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                        <span>
                          Chain of custody from forest to final product
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                        <span>
                          Three label types: FSC 100%, FSC Mix, FSC Recycled
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                        <span>Widely recognised and required by many UK public sector projects</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">
                      PEFC (Programme for the Endorsement of Forest
                      Certification)
                    </p>
                    <ul className="text-xs sm:text-sm text-white/80 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                        <span>
                          World&rsquo;s largest forest certification system by
                          area
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                        <span>
                          Endorses national certification schemes against
                          international benchmarks
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                        <span>
                          Covers sustainable forestry, biodiversity, and
                          workers&rsquo; rights
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                        <span>Accepted alongside FSC on UK government projects</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-emerald-400 mb-3">
                  Engineered Timber Products
                </p>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">
                      Cross-Laminated Timber (CLT)
                    </p>
                    <p className="text-xs sm:text-sm text-white/80">
                      Prefabricated structural panels made from layers of timber
                      boards glued at right angles. CLT can replace concrete and
                      steel in walls, floors, and roofs up to 10+ storeys. It
                      offers excellent structural performance, rapid on-site
                      erection, and significantly lower embodied carbon than
                      concrete or steel frames. The cross-laminated structure
                      provides dimensional stability and high strength-to-weight
                      ratio.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">
                      Glued Laminated Timber (Glulam)
                    </p>
                    <p className="text-xs sm:text-sm text-white/80">
                      Structural beams and columns made from multiple layers of
                      timber bonded together. Glulam can achieve long spans that
                      solid timber cannot, making it suitable for sports halls,
                      swimming pools, and commercial buildings. It is
                      aesthetically attractive and can be left exposed as a
                      finished surface.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Leaf className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">
                    UK-Grown Timber
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  The UK has a growing domestic timber industry, with species
                  such as <strong className="text-white">Sitka spruce</strong>,{" "}
                  <strong className="text-white">Douglas fir</strong>,{" "}
                  <strong className="text-white">larch</strong>, and{" "}
                  <strong className="text-white">sweet chestnut</strong>{" "}
                  available from managed forests. Using UK-grown timber
                  dramatically reduces transport emissions compared to imports
                  from Scandinavia, the Baltics, or North America. It also
                  supports the domestic forestry economy and contributes to
                  national carbon sequestration targets. The UK currently imports
                  approximately 80% of its timber needs &mdash; increasing the
                  use of homegrown timber is a key government policy objective.
                </p>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-500">
                    Carbon Sequestration:
                  </strong>{" "}
                  Unlike concrete and steel, which release CO&#8322; during
                  manufacture, timber actively <strong>removes</strong> CO&#8322;{" "}
                  from the atmosphere during tree growth through
                  photosynthesis. When timber is used in construction, that
                  stored carbon remains locked in the building for its entire
                  lifespan. This means timber buildings can be{" "}
                  <strong>carbon negative</strong> in terms of their structural
                  materials &mdash; they store more carbon than was emitted
                  during their manufacture and construction.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* InlineCheck after section 02 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ============================================================ */}
        {/*  SECTION 03 — Concrete & Cement Alternatives                 */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">03</span>
            Concrete &amp; Cement Alternatives
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Concrete is the world&rsquo;s most widely used construction
                material, but its key ingredient &mdash;{" "}
                <strong>Portland cement clinker</strong> &mdash; is responsible
                for approximately{" "}
                <strong>7% of global CO&#8322; emissions</strong>. The
                calcination process (heating limestone to around 1,450&deg;C)
                releases CO&#8322; both from the chemical reaction and from the
                fuel burned. Reducing the clinker content of cement is therefore
                one of the most impactful decarbonisation strategies in
                construction.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-emerald-400 mb-3">
                  Supplementary Cementitious Materials (SCMs)
                </p>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">
                      GGBS (Ground Granulated Blast-furnace Slag)
                    </p>
                    <p className="text-xs sm:text-sm text-white/80">
                      A waste by-product of iron and steel manufacturing. Can
                      replace up to <strong className="text-white">70%</strong>{" "}
                      of Portland cement clinker in concrete (CEM III). Produces
                      a lighter-coloured concrete with improved durability,
                      reduced permeability, and better resistance to sulphate
                      and chloride attack. Slower early-age strength gain but
                      higher ultimate strength. Widely available in the UK.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">
                      PFA / Fly Ash (Pulverised Fuel Ash)
                    </p>
                    <p className="text-xs sm:text-sm text-white/80">
                      A waste by-product from coal-fired power stations. Can
                      replace up to{" "}
                      <strong className="text-white">35&ndash;40%</strong> of
                      Portland cement. Improves workability, reduces heat of
                      hydration (beneficial in mass concrete pours), and
                      enhances long-term durability. Availability is declining
                      in the UK as coal-fired power stations close, so
                      stockpiled fly ash and imported supplies are increasingly
                      used.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">
                      Silica Fume (Microsilica)
                    </p>
                    <p className="text-xs sm:text-sm text-white/80">
                      An ultra-fine by-product of silicon and ferrosilicon alloy
                      production. Used in small quantities (typically{" "}
                      <strong className="text-white">5&ndash;10%</strong> cement
                      replacement) to produce very high-strength, low-
                      permeability concrete. Often used in bridges, marine
                      structures, and high-performance applications where
                      durability is critical.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-emerald-400 mb-3">
                  Cement Classifications
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-white/80">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-2 pr-4 text-emerald-400 font-medium">
                          Type
                        </th>
                        <th className="text-left py-2 pr-4 text-emerald-400 font-medium">
                          Clinker Content
                        </th>
                        <th className="text-left py-2 text-emerald-400 font-medium">
                          Carbon Impact
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      <tr>
                        <td className="py-2 pr-4 text-white font-medium">CEM I</td>
                        <td className="py-2 pr-4">95&ndash;100% clinker</td>
                        <td className="py-2">
                          Highest embodied carbon &mdash; standard Portland cement
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 text-white font-medium">CEM II</td>
                        <td className="py-2 pr-4">65&ndash;94% clinker</td>
                        <td className="py-2">
                          Moderate reduction &mdash; blended with limestone, fly
                          ash, or GGBS
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 text-white font-medium">CEM III</td>
                        <td className="py-2 pr-4">5&ndash;64% clinker</td>
                        <td className="py-2">
                          Significant reduction &mdash; high GGBS replacement
                          (up to 70%)
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-emerald-400 mb-3">
                  Emerging Technologies
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Geopolymer cements:
                      </strong>{" "}
                      Alkali-activated binders that do not require Portland
                      cement clinker at all. Made from industrial waste products
                      (fly ash, GGBS) activated by alkaline solutions. Can
                      reduce embodied carbon by up to 80% compared to CEM I.
                      Still relatively new in UK construction but gaining
                      traction.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Recycled aggregates:
                      </strong>{" "}
                      Crushed concrete from demolition can replace virgin
                      aggregates (gravel, sand) in new concrete mixes. Reduces
                      quarrying, transport emissions, and landfill. BS 8500
                      allows up to 20% recycled coarse aggregate in structural
                      concrete.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Carbon capture and storage (CCS):
                      </strong>{" "}
                      Some cement manufacturers are investing in capturing
                      CO&#8322; at the point of emission and storing it
                      permanently underground. This could significantly reduce
                      the carbon footprint of clinker production in the future.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Important Consideration
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  When specifying lower-carbon concrete mixes, it is essential
                  to ensure the mix design meets the{" "}
                  <strong className="text-white">
                    structural and durability requirements
                  </strong>{" "}
                  of the specific application. CEM III mixes with high GGBS
                  content have slower early-age strength gain, which may affect
                  formwork striking times and construction programmes. Always
                  work with the structural engineer and concrete supplier to
                  confirm the mix is fit for purpose.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 04 — Steel & Metals                                 */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">04</span>
            Steel &amp; Metals
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Steel is one of the most recyclable materials in existence. It
                can be melted down and reformed into new products{" "}
                <strong>indefinitely</strong> without any loss of structural
                quality. This makes steel a fundamentally{" "}
                <strong>circular material</strong> &mdash; every piece of steel
                in use today can become a new product tomorrow.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Recycle className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">
                    Recycled Content &amp; Production Routes
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">
                      Basic Oxygen Steelmaking (BOS)
                    </p>
                    <ul className="text-xs sm:text-sm text-white/80 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                        <span>
                          Uses iron ore as the primary feedstock
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                        <span>Typically ~25% recycled scrap content</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                        <span>Higher embodied carbon per tonne</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                        <span>
                          Produces structural sections, plate, and strip
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">
                      Electric Arc Furnace (EAF)
                    </p>
                    <ul className="text-xs sm:text-sm text-white/80 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                        <span>
                          Uses scrap steel as the primary feedstock
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                        <span>
                          Can achieve up to 100% recycled content
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                        <span>
                          Significantly lower embodied carbon per tonne
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                        <span>
                          Primarily produces reinforcement bar (rebar) and long
                          products
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-white/60 mt-3">
                  UK-produced steel contains approximately{" "}
                  <strong className="text-white">30% recycled scrap</strong> on
                  average across both production routes. The global average
                  recycling rate for structural steel is over 85%.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-emerald-400 mb-3">
                  Other Metals in Construction
                </p>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-white mb-1">
                      Aluminium
                    </p>
                    <p className="text-xs sm:text-sm text-white/80">
                      Highly recyclable &mdash; recycling aluminium uses only{" "}
                      <strong className="text-white">5%</strong> of the energy
                      required to produce it from bauxite ore. Commonly used
                      in curtain walling, window frames, roofing, and cable
                      management systems. Recycled aluminium is
                      indistinguishable from virgin material in terms of
                      quality and performance.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">
                      Copper
                    </p>
                    <p className="text-xs sm:text-sm text-white/80">
                      One of the most valuable recyclable metals. Copper
                      cabling, pipework, and roofing can all be recycled. Over{" "}
                      <strong className="text-white">40%</strong> of European
                      copper demand is met from recycled sources. As an
                      electrician, properly segregating copper offcuts and waste
                      cable ensures this valuable material enters the recycling
                      stream rather than going to general waste.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-500">
                    Designing for Disassembly:
                  </strong>{" "}
                  The recyclability of steel is only fully realised if the steel
                  can be <strong>recovered</strong> at end of life. Using{" "}
                  <strong>bolted connections</strong> rather than welded joints
                  allows steel members to be unbolted and reused directly, or
                  sent for recycling without the energy cost of cutting. This
                  principle &mdash; <strong>design for disassembly</strong>{" "}
                  (DfD) &mdash; is increasingly required on projects targeting
                  high BREEAM ratings and is a key part of circular economy
                  thinking in construction.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* InlineCheck after section 04 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ============================================================ */}
        {/*  SECTION 05 — Insulation Materials                           */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">05</span>
            Insulation Materials
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Insulation is critical to building energy performance, but the
                insulation material itself has an{" "}
                <strong>embodied carbon footprint</strong>. Choosing the right
                insulation involves balancing thermal performance (how well it
                insulates per unit thickness) against environmental impact (how
                much carbon was emitted to manufacture it). Natural insulation
                materials are gaining popularity as the industry moves towards
                net-zero carbon buildings.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-emerald-400 mb-3">
                  Synthetic Insulation Options
                </p>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-sm font-medium text-white">
                        Mineral Wool (Glass / Rock)
                      </p>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                        Medium carbon
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-white/80">
                      Made from recycled glass or volcanic rock. Good thermal
                      and acoustic performance. Non-combustible (Euroclass A1).
                      Widely available and cost-effective. Typical lambda value:
                      0.032&ndash;0.044 W/mK. Embodied carbon: approximately
                      1.2&ndash;1.4 kgCO&#8322;e/kg.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-sm font-medium text-white">
                        PIR (Polyisocyanurate)
                      </p>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
                        High carbon
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-white/80">
                      Petroleum-derived rigid foam boards. Excellent thermal
                      performance per unit thickness (lambda: 0.022&ndash;0.024
                      W/mK), making it ideal where space is limited. Higher
                      embodied carbon: approximately 4.2&ndash;7.4
                      kgCO&#8322;e/kg. Combustible and requires fire protection
                      in many applications.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-sm font-medium text-white">
                        EPS (Expanded Polystyrene)
                      </p>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
                        Medium-high carbon
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-white/80">
                      Lightweight, moisture-resistant, commonly used in
                      external wall insulation systems and below ground. Lambda:
                      0.030&ndash;0.038 W/mK. Embodied carbon: approximately
                      2.5&ndash;3.4 kgCO&#8322;e/kg. Recyclable in theory but
                      rarely recycled in practice due to contamination.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-emerald-400 mb-3">
                  Natural Insulation Options
                </p>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-sm font-medium text-white">
                        Sheep Wool
                      </p>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        Very low carbon
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-white/80">
                      Renewable agricultural by-product. Excellent moisture
                      management &mdash; can absorb and release moisture without
                      losing thermal performance. Naturally flame-retardant.
                      Lambda: 0.035&ndash;0.040 W/mK. Embodied carbon:
                      approximately 0.9&ndash;1.0 kgCO&#8322;e/kg. Can
                      sequester carbon within the wool fibres.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-sm font-medium text-white">
                        Hemp Insulation
                      </p>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        Very low carbon
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-white/80">
                      Made from hemp fibres, often with a polyester binder. Fast-growing
                      crop that sequesters significant carbon during growth.
                      Good moisture buffering properties. Lambda:
                      0.038&ndash;0.042 W/mK. Embodied carbon: approximately
                      0.6&ndash;1.1 kgCO&#8322;e/kg. Can be carbon negative
                      when sequestration is accounted for.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-sm font-medium text-white">
                        Wood Fibre
                      </p>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        Low carbon
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-white/80">
                      Available as flexible batts or rigid boards. Excellent
                      thermal mass properties &mdash; helps regulate summer
                      overheating. Often used in timber frame and external wall
                      insulation systems. Lambda: 0.038&ndash;0.042 W/mK.
                      Embodied carbon: approximately 0.8&ndash;1.5
                      kgCO&#8322;e/kg.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-sm font-medium text-white">
                        Cellulose (Recycled Newspaper)
                      </p>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        Very low carbon
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-white/80">
                      Made from recycled newspaper treated with borax for fire
                      and pest resistance. Blown or sprayed into cavities and
                      loft spaces. Very low embodied carbon: approximately
                      0.5&ndash;0.7 kgCO&#8322;e/kg. Lambda: 0.035&ndash;0.040
                      W/mK. Excellent use of waste material that would otherwise
                      go to landfill.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-500">
                    Performance vs Sustainability:
                  </strong>{" "}
                  Natural insulation materials generally have slightly higher
                  lambda values (lower thermal performance per unit thickness)
                  than synthetic alternatives like PIR. This means you need a
                  thicker build-up to achieve the same U-value. Where space is
                  limited &mdash; for example, in refurbishment projects with
                  constrained cavity widths &mdash; a synthetic insulation may
                  be the only practical option. The key is to{" "}
                  <strong>make an informed choice</strong>, weighing thermal
                  performance, embodied carbon, moisture behaviour, fire
                  safety, and cost for each specific application.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 06 — Responsible Procurement                        */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">06</span>
            Responsible Procurement
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Responsible procurement goes beyond choosing materials with low
                embodied carbon. It considers the{" "}
                <strong>
                  entire supply chain
                </strong>{" "}
                &mdash; from raw material extraction through manufacturing,
                transport, and delivery to site &mdash; and examines both
                environmental and <strong>social</strong> impacts. In the UK
                construction industry, responsible procurement is increasingly
                mandated on public sector projects and is a key assessment
                criterion under BREEAM.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">
                    BES 6001 &mdash; Responsible Sourcing
                  </p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  BES 6001 is the{" "}
                  <strong className="text-white">
                    Framework Standard for Responsible Sourcing of Construction
                    Products
                  </strong>
                  , published by BRE. It provides a holistic assessment of how
                  responsibly a product has been sourced.
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Organisational governance:
                      </strong>{" "}
                      Policies, legal compliance, quality management systems
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Supply chain management:
                      </strong>{" "}
                      Traceability, supplier assessment, stewardship of raw
                      materials
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Environmental aspects:
                      </strong>{" "}
                      Energy, water, waste, emissions, biodiversity,
                      transport
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Social aspects:
                      </strong>{" "}
                      Health and safety, employment practices, community
                      engagement, stakeholder relations
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Ratings:</strong> Pass,
                      Good, Very Good, or Excellent &mdash; higher ratings
                      contribute more BREEAM credits
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-emerald-400 mb-3">
                  Supply Chain Due Diligence
                </p>
                <p className="text-sm text-white/80 mb-3">
                  Responsible procurement requires understanding where materials
                  come from and how they are produced at every stage of the
                  supply chain:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Raw material origin:
                      </strong>{" "}
                      Where were the raw materials extracted? Were extraction
                      practices legal and environmentally responsible?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Manufacturing conditions:
                      </strong>{" "}
                      What are the working conditions in the factory? Is the
                      manufacturer ISO 14001 (environmental management)
                      certified?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Transport and logistics:
                      </strong>{" "}
                      How far has the product travelled? What transport modes
                      were used? Can a more local alternative be specified?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Conflict minerals:
                      </strong>{" "}
                      For products containing tin, tantalum, tungsten, or gold
                      (common in electrical components), are there assurances
                      that these are not sourced from conflict zones?
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Modern Slavery Considerations
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  The{" "}
                  <strong className="text-white">Modern Slavery Act 2015</strong>{" "}
                  requires organisations with a turnover above &pound;36 million
                  to publish an annual slavery and human trafficking statement.
                  Construction supply chains are particularly vulnerable to
                  modern slavery due to their length, complexity, and reliance
                  on low-cost labour in developing countries. Responsible
                  procurement policies must include due diligence on labour
                  practices throughout the supply chain, and any concerns must
                  be reported and investigated.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-emerald-400 mb-3">
                  Ethical Sourcing Policies
                </p>
                <p className="text-sm text-white/80">
                  Most major UK contractors now maintain formal ethical sourcing
                  policies that set out minimum standards for suppliers. These
                  typically require suppliers to demonstrate compliance with
                  health and safety legislation, pay at least the national
                  living wage, prohibit child labour and forced labour, minimise
                  environmental impact, and participate in regular audits. As
                  an electrician or subcontractor, you may be asked to provide
                  evidence of your own supply chain practices as part of
                  pre-qualification questionnaires (PQQs) for larger projects.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* InlineCheck after section 06 */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ============================================================ */}
        {/*  DIAGRAM — Material Sustainability Comparison Grid            */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">
              &mdash;
            </span>
            Material Sustainability Comparison Grid
          </h2>
          <div className="bg-white/5 border border-emerald-500/30 rounded-xl p-4 sm:p-6 overflow-x-auto">
            <div className="min-w-[600px]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 pr-3 text-emerald-400 font-medium">
                      Material
                    </th>
                    <th className="text-centre py-2 px-2 text-emerald-400 font-medium">
                      Embodied Carbon
                    </th>
                    <th className="text-centre py-2 px-2 text-emerald-400 font-medium">
                      Recyclability
                    </th>
                    <th className="text-centre py-2 px-2 text-emerald-400 font-medium">
                      Renewable
                    </th>
                    <th className="text-centre py-2 px-2 text-emerald-400 font-medium">
                      Certification
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    {
                      material: "Timber (FSC/PEFC)",
                      carbon: "Very Low",
                      carbonColour: "text-emerald-400",
                      recycle: "High",
                      recycleColour: "text-emerald-400",
                      renewable: "Yes",
                      renewableColour: "text-emerald-400",
                      cert: "FSC, PEFC",
                    },
                    {
                      material: "Steel (EAF)",
                      carbon: "Medium",
                      carbonColour: "text-yellow-400",
                      recycle: "Infinite",
                      recycleColour: "text-emerald-400",
                      renewable: "No",
                      renewableColour: "text-red-400",
                      cert: "BES 6001, EPD",
                    },
                    {
                      material: "Steel (BOS)",
                      carbon: "High",
                      carbonColour: "text-red-400",
                      recycle: "Infinite",
                      recycleColour: "text-emerald-400",
                      renewable: "No",
                      renewableColour: "text-red-400",
                      cert: "BES 6001, EPD",
                    },
                    {
                      material: "Concrete (CEM I)",
                      carbon: "High",
                      carbonColour: "text-red-400",
                      recycle: "Medium",
                      recycleColour: "text-yellow-400",
                      renewable: "No",
                      renewableColour: "text-red-400",
                      cert: "BES 6001, EPD",
                    },
                    {
                      material: "Concrete (CEM III)",
                      carbon: "Medium",
                      carbonColour: "text-yellow-400",
                      recycle: "Medium",
                      recycleColour: "text-yellow-400",
                      renewable: "No",
                      renewableColour: "text-red-400",
                      cert: "BES 6001, EPD",
                    },
                    {
                      material: "Sheep Wool Insulation",
                      carbon: "Very Low",
                      carbonColour: "text-emerald-400",
                      recycle: "Compostable",
                      recycleColour: "text-emerald-400",
                      renewable: "Yes",
                      renewableColour: "text-emerald-400",
                      cert: "EPD",
                    },
                    {
                      material: "PIR Insulation",
                      carbon: "High",
                      carbonColour: "text-red-400",
                      recycle: "Low",
                      recycleColour: "text-red-400",
                      renewable: "No",
                      renewableColour: "text-red-400",
                      cert: "EPD",
                    },
                    {
                      material: "Aluminium (Recycled)",
                      carbon: "Low",
                      carbonColour: "text-emerald-400",
                      recycle: "Infinite",
                      recycleColour: "text-emerald-400",
                      renewable: "No",
                      renewableColour: "text-red-400",
                      cert: "BES 6001, EPD",
                    },
                    {
                      material: "Copper",
                      carbon: "Medium-High",
                      carbonColour: "text-orange-400",
                      recycle: "Infinite",
                      recycleColour: "text-emerald-400",
                      renewable: "No",
                      renewableColour: "text-red-400",
                      cert: "EPD",
                    },
                  ].map((row, i) => (
                    <tr key={i}>
                      <td className="py-2 pr-3 text-white font-medium">
                        {row.material}
                      </td>
                      <td className={`py-2 px-2 text-centre ${row.carbonColour}`}>
                        {row.carbon}
                      </td>
                      <td
                        className={`py-2 px-2 text-centre ${row.recycleColour}`}
                      >
                        {row.recycle}
                      </td>
                      <td
                        className={`py-2 px-2 text-centre ${row.renewableColour}`}
                      >
                        {row.renewable}
                      </td>
                      <td className="py-2 px-2 text-white/60">{row.cert}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-white/40 mt-3">
              Note: Embodied carbon ratings are indicative and vary by
              manufacturer, production method, and transport distance. Always
              refer to product-specific EPDs for accurate comparison data.
            </p>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 07 — Environmental Product Declarations              */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">07</span>
            Environmental Product Declarations
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                An <strong>Environmental Product Declaration (EPD)</strong> is a
                standardised document that provides transparent, independently
                verified data about the environmental impact of a product
                throughout its lifecycle. Think of it as a{" "}
                <strong>
                  nutritional label for building products
                </strong>{" "}
                &mdash; it tells you exactly what the environmental &ldquo;ingredients&rdquo;
                are, allowing you to compare products on an objective, like-for-like basis.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">
                    EN 15804 Standard
                  </p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  All construction EPDs in Europe are produced in accordance
                  with{" "}
                  <strong className="text-white">
                    BS EN 15804: Sustainability of construction works &mdash;
                    Environmental product declarations
                  </strong>
                  . This standard ensures consistency, allowing meaningful
                  comparison between products from different manufacturers.
                </p>
                <p className="text-sm text-white/80">
                  EN 15804 defines lifecycle stages using a modular system:
                </p>
                <div className="grid sm:grid-cols-2 gap-3 mt-3">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-xs text-emerald-400 font-medium uppercase tracking-wide mb-1">
                      A1&ndash;A3: Product Stage
                    </p>
                    <p className="text-xs sm:text-sm text-white/80">
                      Raw material supply, transport to factory, and
                      manufacturing. This is the &ldquo;cradle to gate&rdquo;
                      embodied carbon.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-xs text-emerald-400 font-medium uppercase tracking-wide mb-1">
                      A4&ndash;A5: Construction Stage
                    </p>
                    <p className="text-xs sm:text-sm text-white/80">
                      Transport to site and installation, including waste
                      generated during construction.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-xs text-emerald-400 font-medium uppercase tracking-wide mb-1">
                      B1&ndash;B7: Use Stage
                    </p>
                    <p className="text-xs sm:text-sm text-white/80">
                      In-use impacts including maintenance, repair,
                      replacement, and operational energy and water use.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-xs text-emerald-400 font-medium uppercase tracking-wide mb-1">
                      C1&ndash;C4: End of Life
                    </p>
                    <p className="text-xs sm:text-sm text-white/80">
                      Deconstruction/demolition, transport, waste processing,
                      and disposal.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3 sm:col-span-2">
                    <p className="text-xs text-emerald-400 font-medium uppercase tracking-wide mb-1">
                      D: Beyond System Boundary
                    </p>
                    <p className="text-xs sm:text-sm text-white/80">
                      Benefits from reuse, recycling, or energy recovery
                      &mdash; credits for the circular economy contribution of
                      the product.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-emerald-400 mb-3">
                  How to Read an EPD
                </p>
                <p className="text-sm text-white/80 mb-3">
                  Key environmental indicators to look for when comparing
                  products:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        GWP (Global Warming Potential):
                      </strong>{" "}
                      Measured in kgCO&#8322;e &mdash; this is the embodied
                      carbon figure. The most commonly compared metric. Lower is
                      better.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        ODP (Ozone Depletion Potential):
                      </strong>{" "}
                      Impact on the ozone layer, measured in kg CFC-11
                      equivalent.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        AP (Acidification Potential):
                      </strong>{" "}
                      Contribution to acid rain, measured in kg SO&#8322;
                      equivalent.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        EP (Eutrophication Potential):
                      </strong>{" "}
                      Nutrient enrichment of water bodies causing algal blooms,
                      measured in kg PO&#8324;&sup3;&minus; equivalent.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Functional unit:
                      </strong>{" "}
                      Always check the declared unit (e.g. per m&sup2;, per
                      tonne, per linear metre) to ensure you are comparing
                      like-for-like.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-emerald-400 mb-3">
                  BRE Green Guide to Specification
                </p>
                <p className="text-sm text-white/80">
                  The{" "}
                  <strong className="text-white">
                    Green Guide to Specification
                  </strong>{" "}
                  is published by the Building Research Establishment (BRE) and
                  rates over 1,500 building element specifications from{" "}
                  <strong className="text-white">A+ (best)</strong> to{" "}
                  <strong className="text-white">E (worst)</strong> based on
                  their environmental impact across 13 categories. It is the
                  reference tool used for BREEAM assessments under the{" "}
                  <strong className="text-white">Mat 01</strong> credit and
                  provides a quick way to compare the relative sustainability of
                  different building element specifications (for example,
                  comparing a steel-framed wall with a timber-framed
                  alternative). The guide is available free of charge via the
                  BRE website.
                </p>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-500">
                    Practical Tip:
                  </strong>{" "}
                  When comparing products for a project, always request EPDs
                  from competing manufacturers. If one manufacturer provides an
                  EPD and another does not, the EPD holder is providing{" "}
                  <strong>verifiable evidence</strong> of their environmental
                  performance &mdash; the other is asking you to take their
                  claims on trust. Increasingly, project specifications are
                  requiring EPDs as a mandatory submission.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 08 — Reducing Material Waste                        */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">08</span>
            Reducing Material Waste
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The UK construction industry generates approximately{" "}
                <strong>62 million tonnes of waste</strong> per year, making it
                the largest waste-producing sector in the country. Much of this
                waste results from over-ordering, poor specification, damage
                during storage, and demolition rather than deconstruction. Even
                small improvements in material efficiency can deliver
                significant cost savings and environmental benefits at scale.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Trash2 className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">
                    Strategies for Reducing Material Waste
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">
                      Accurate Specification
                    </p>
                    <p className="text-xs sm:text-sm text-white/80">
                      Precisely calculate material quantities before ordering.
                      Use digital take-off tools and BIM models where available
                      to minimise over-ordering. A typical 5&ndash;10% wastage
                      allowance on cable, for example, can represent thousands
                      of metres of copper on a large project. Tighter
                      specification reduces both cost and waste.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">
                      Modular Design
                    </p>
                    <p className="text-xs sm:text-sm text-white/80">
                      Designing to standard module sizes reduces cutting waste.
                      For example, designing stud walls to 600 mm centres
                      matches standard plasterboard sheet widths, eliminating
                      the need for cutting and reducing offcut waste. Modular
                      construction in factory-controlled environments can reduce
                      waste by up to 70% compared to traditional site-built
                      methods.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">
                      Standard Sizes
                    </p>
                    <p className="text-xs sm:text-sm text-white/80">
                      Ordering materials in standard manufactured sizes avoids
                      cutting waste. Standard-length cable drums, pre-cut
                      conduit, and factory-finished components all reduce on-site
                      waste. Working with manufacturers to supply purpose-made
                      lengths can further minimise offcuts.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">
                      Just-in-Time Delivery
                    </p>
                    <p className="text-xs sm:text-sm text-white/80">
                      Scheduling material deliveries to coincide with the
                      programme of work reduces the time materials spend on site
                      exposed to weather, damage, and theft. JIT delivery
                      reduces storage requirements, handling damage, and the
                      risk of materials becoming obsolete due to design changes.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-emerald-400 mb-3">
                  Material Passports
                </p>
                <p className="text-sm text-white/80 mb-3">
                  A <strong className="text-white">material passport</strong> is
                  a digital record that documents the composition, origin, and
                  characteristics of every material and component used in a
                  building. It typically includes:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Manufacturer details and product specifications
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Material composition and any hazardous content
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Embodied carbon data and environmental certifications
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Expected lifespan and maintenance requirements
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      End-of-life options: reuse, recycling, or disposal
                      instructions
                    </span>
                  </li>
                </ul>
                <p className="text-xs sm:text-sm text-white/60 mt-3">
                  Material passports are a key enabler of the circular economy
                  in construction, ensuring that the value of materials is not
                  lost when a building reaches the end of its useful life.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-emerald-400 mb-3">
                  Design for Deconstruction (DfD)
                </p>
                <p className="text-sm text-white/80 mb-3">
                  Rather than designing buildings that must be demolished at end
                  of life (destroying all materials), design for deconstruction
                  means planning from the outset for materials to be{" "}
                  <strong className="text-white">
                    carefully taken apart, recovered, and reused
                  </strong>
                  :
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Use <strong className="text-white">bolted</strong> rather
                      than welded steel connections
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Use <strong className="text-white">mechanical fixings</strong>{" "}
                      rather than adhesives
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Specify{" "}
                      <strong className="text-white">
                        modular panel systems
                      </strong>{" "}
                      that can be unclipped and relocated
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Maintain{" "}
                      <strong className="text-white">material passports</strong>{" "}
                      so composition is known at end of life
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Avoid{" "}
                      <strong className="text-white">composite materials</strong>{" "}
                      that cannot be separated for recycling
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      For electrical installations: use{" "}
                      <strong className="text-white">
                        accessible cable routes
                      </strong>{" "}
                      and{" "}
                      <strong className="text-white">
                        removable trunking systems
                      </strong>{" "}
                      to allow future cable recovery
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-500">
                    The Circular Economy Principle:
                  </strong>{" "}
                  The construction industry is moving from a{" "}
                  <strong>linear economy</strong> (extract &rarr; make &rarr; use
                  &rarr; dispose) to a <strong>circular economy</strong> (design
                  &rarr; build &rarr; use &rarr; recover &rarr; reuse). Every
                  material selection decision you make on site contributes to
                  this transition. Specifying recyclable materials, reducing
                  waste, maintaining material records, and designing for
                  disassembly are all practical steps that any electrician or
                  contractor can take today.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  DIAGRAM — Responsible Procurement Checklist                  */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">
              &mdash;
            </span>
            Responsible Procurement Checklist
          </h2>
          <div className="bg-white/5 border border-emerald-500/30 rounded-xl p-4 sm:p-6">
            <p className="text-sm text-white/60 mb-4">
              Use this checklist when evaluating materials and suppliers for
              sustainability and responsible sourcing:
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                {
                  category: "Environmental",
                  colour: "emerald",
                  items: [
                    "Does the product have a verified EPD to EN 15804?",
                    "What is the GWP (embodied carbon) compared to alternatives?",
                    "Is the manufacturer ISO 14001 certified?",
                    "Can the product be recycled or reused at end of life?",
                    "Is the product BES 6001 certified? If so, what rating?",
                  ],
                },
                {
                  category: "Social & Ethical",
                  colour: "blue",
                  items: [
                    "Does the supplier have a modern slavery statement?",
                    "Are labour practices in the supply chain audited?",
                    "Is the raw material sourced from conflict-free zones?",
                    "Does the manufacturer pay at least the national living wage?",
                    "Are health and safety standards maintained throughout the supply chain?",
                  ],
                },
                {
                  category: "Sourcing & Logistics",
                  colour: "yellow",
                  items: [
                    "Where are the raw materials extracted?",
                    "How far will the product travel to reach site?",
                    "Is a more locally produced alternative available?",
                    "Does the product hold FSC, PEFC, or equivalent chain of custody?",
                    "Can the supplier provide full traceability documentation?",
                  ],
                },
                {
                  category: "Waste & Circularity",
                  colour: "purple",
                  items: [
                    "What waste will be generated during installation?",
                    "Can offcuts be reused or recycled on site?",
                    "Does the product come in standard sizes to reduce cutting?",
                    "Is a material passport available for this product?",
                    "Is the product designed for disassembly and recovery?",
                  ],
                },
              ].map((group, gi) => (
                <div
                  key={gi}
                  className="bg-white/5 border border-white/10 rounded-lg p-4"
                >
                  <p
                    className={`text-sm font-medium mb-3 ${
                      group.colour === "emerald"
                        ? "text-emerald-400"
                        : group.colour === "blue"
                          ? "text-blue-400"
                          : group.colour === "yellow"
                            ? "text-yellow-400"
                            : "text-purple-400"
                    }`}
                  >
                    {group.category}
                  </p>
                  <ul className="space-y-2">
                    {group.items.map((item, ii) => (
                      <li
                        key={ii}
                        className="flex items-start gap-2 text-xs sm:text-sm text-white/80"
                      >
                        <div
                          className={`mt-0.5 w-4 h-4 rounded border flex-shrink-0 ${
                            group.colour === "emerald"
                              ? "border-emerald-500/40"
                              : group.colour === "blue"
                                ? "border-blue-500/40"
                                : group.colour === "yellow"
                                  ? "border-yellow-500/40"
                                  : "border-purple-500/40"
                          }`}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  FAQs                                                        */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="pb-4 border-b border-white/5 last:border-0"
              >
                <h3 className="text-sm font-medium text-white mb-1">
                  {faq.question}
                </h3>
                <p className="text-sm text-white/80 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/*  Quiz                                                        */}
        {/* ============================================================ */}
        <Quiz title="Section 4 Knowledge Check" questions={quizQuestions} />

        {/* ============================================================ */}
        {/*  Bottom Navigation                                           */}
        {/* ============================================================ */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../environmental-sustainability-module-3-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Water Conservation
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-emerald-500 text-white hover:bg-emerald-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../environmental-sustainability-module-4">
              Next: Module 4
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
