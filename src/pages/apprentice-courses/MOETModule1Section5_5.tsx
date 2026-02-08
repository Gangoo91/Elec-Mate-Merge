import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Sustainable Work Practices - MOET Module 1 Section 5.5";
const DESCRIPTION = "Comprehensive guide to sustainable work practices for electrical maintenance technicians: circular economy, repair vs replace decision making, life cycle assessment, low-carbon materials, reducing travel emissions, sustainable procurement, carbon footprint, net zero targets and green skills aligned to ST1426.";

const quickCheckQuestions = [
  {
    id: "circular-economy",
    question: "What is the fundamental principle of the circular economy?",
    options: [
      "Maximise production and consumption to drive economic growth",
      "Design out waste and pollution, keep products and materials in use, and regenerate natural systems",
      "Replace all manufactured products with natural alternatives",
      "Export waste to countries with lower environmental standards"
    ],
    correctIndex: 1,
    explanation: "The circular economy, as defined by the Ellen MacArthur Foundation, is based on three principles: (1) Design out waste and pollution — prevent waste from being created in the first place; (2) Keep products and materials in use — through repair, reuse, remanufacturing and recycling; (3) Regenerate natural systems — return biological nutrients to the earth. This contrasts with the linear 'take-make-dispose' model that has dominated industry."
  },
  {
    id: "repair-replace",
    question: "When deciding whether to repair or replace a piece of electrical equipment, what factors should you consider?",
    options: [
      "Only the purchase price of a replacement",
      "The remaining useful life, repair cost, energy efficiency of old vs new, availability of spare parts, embodied carbon of replacement, and whole-life cost",
      "Whether the manufacturer still exists",
      "Only the colour and appearance of the equipment"
    ],
    correctIndex: 1,
    explanation: "A sustainable repair vs replace decision considers multiple factors: the remaining useful life of the existing equipment, the cost of repair vs replacement, the energy efficiency difference between old and new (operating cost savings), availability of spare parts, the embodied carbon in manufacturing a replacement, disposal costs of the old equipment, and the whole-life cost including maintenance, energy and end-of-life. Sometimes repair is more sustainable; sometimes replacement is the better choice."
  },
  {
    id: "travel-emissions",
    question: "What percentage of a typical maintenance company's carbon footprint comes from vehicle travel?",
    options: [
      "Less than 5%",
      "About 10%",
      "Typically 30-50% or more, making it one of the largest emission sources",
      "Exactly 75%"
    ],
    correctIndex: 2,
    explanation: "For maintenance and service companies, vehicle travel is often the single largest source of carbon emissions, typically accounting for 30-50% or more of the total footprint. This is because maintenance technicians travel extensively between sites, often in diesel vans. Reducing travel emissions through route optimisation, remote diagnostics, electric vehicles, and consolidating site visits is one of the highest-impact sustainability actions a maintenance company can take."
  },
  {
    id: "net-zero",
    question: "What does 'net zero' mean in the context of a maintenance company's operations?",
    options: [
      "The company makes zero profit",
      "The company produces no waste at all",
      "The company's greenhouse gas emissions are balanced by an equivalent amount of carbon removal, resulting in no net addition to the atmosphere",
      "The company uses no electricity"
    ],
    correctIndex: 2,
    explanation: "Net zero means that the total greenhouse gas emissions produced by the organisation are balanced by an equivalent amount of carbon removal — either through natural processes (e.g., tree planting) or technological solutions (e.g., carbon capture). The priority is to reduce emissions as far as possible first, with offsetting used only for residual emissions that cannot be eliminated. Many maintenance companies are now setting net zero targets aligned with the Science Based Targets initiative (SBTi)."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The circular economy differs from the linear economy in that:",
    options: [
      "It focuses only on recycling end-of-life products",
      "It aims to keep materials and products at their highest value for as long as possible, designing out waste from the start",
      "It requires all products to be made from recycled materials",
      "It applies only to consumer electronics"
    ],
    correctAnswer: 1,
    explanation: "The circular economy is a systemic approach that goes far beyond recycling. It aims to keep products, components and materials at their highest value throughout their life cycle — through better design, longer use, repair, remanufacturing and recycling. Waste is designed out from the beginning rather than managed at the end. For maintenance, this means prioritising repair, component-level replacement and refurbishment over whole-unit replacement where practical."
  },
  {
    id: 2,
    question: "A life cycle assessment (LCA) of electrical equipment considers:",
    options: [
      "Only the purchase price and installation cost",
      "The environmental impact at every stage: raw material extraction, manufacturing, transport, use (energy consumption), maintenance and end-of-life disposal or recycling",
      "Only the energy consumed during operation",
      "Only the cost of disposal at end of life"
    ],
    correctAnswer: 1,
    explanation: "A life cycle assessment examines the total environmental impact of a product from 'cradle to grave' (or 'cradle to cradle' in circular economy thinking). This includes raw material extraction, manufacturing energy and emissions, transport, energy consumed during the use phase, maintenance requirements, and end-of-life disposal or recycling. LCA helps make informed decisions about product selection and repair vs replace choices."
  },
  {
    id: 3,
    question: "When selecting low-carbon materials for electrical maintenance, you should consider:",
    options: [
      "Only the colour of the material",
      "The embodied carbon of the material (emissions from extraction, processing and transport), recyclability, durability and suitability for the application",
      "Only whether the material is manufactured in the UK",
      "Only the weight of the material"
    ],
    correctAnswer: 1,
    explanation: "Low-carbon material selection considers the embodied carbon (the total greenhouse gas emissions from raw material extraction through to delivery on site), the material's recyclability at end of life, its durability (longer-lasting materials reduce replacement frequency), and its fitness for purpose. For example, choosing aluminium cable tray with high recycled content over virgin steel, or selecting LED luminaires designed for component-level repair."
  },
  {
    id: 4,
    question: "Remote diagnostics technology can improve maintenance sustainability by:",
    options: [
      "Eliminating the need for maintenance technicians entirely",
      "Reducing unnecessary site visits through remote monitoring, enabling predictive maintenance, and allowing fault diagnosis before travelling to site",
      "Increasing the number of maintenance visits required",
      "Only being useful for IT equipment"
    ],
    correctAnswer: 1,
    explanation: "Remote diagnostics — using IoT sensors, BEMS data, and remote access to equipment controllers — allows maintenance teams to monitor equipment condition remotely, diagnose faults before travelling, determine parts requirements in advance, and avoid unnecessary routine visits when condition monitoring shows equipment is performing well. This reduces travel emissions, improves first-fix rates, and enables a shift from time-based to condition-based maintenance."
  },
  {
    id: 5,
    question: "Sustainable procurement for maintenance means:",
    options: [
      "Always buying the cheapest option available",
      "Selecting suppliers and products based on environmental criteria (embodied carbon, recyclability, ethical sourcing, packaging) alongside price, quality and availability",
      "Only buying products with green labels",
      "Refusing to use any products from overseas"
    ],
    correctAnswer: 1,
    explanation: "Sustainable procurement considers environmental and social criteria alongside traditional factors of price, quality and availability. This includes: the embodied carbon of products, use of recycled or sustainable materials, product durability and repairability, end-of-life recyclability, packaging minimisation, supplier environmental certifications (ISO 14001), ethical labour practices, and transport distances. It is about making informed choices that balance performance with environmental responsibility."
  },
  {
    id: 6,
    question: "The carbon footprint of a maintenance activity includes:",
    options: [
      "Only the electricity used by the equipment being maintained",
      "Travel emissions, energy used during the work, materials consumed, waste generated, and the embodied carbon of replacement parts",
      "Only the fuel used by the maintenance van",
      "Only emissions from the company's office building"
    ],
    correctAnswer: 1,
    explanation: "The carbon footprint of a maintenance activity encompasses all greenhouse gas emissions associated with the work: travel to and from site (fuel combustion), energy used during the maintenance process (power tools, testing equipment), materials consumed (including the embodied carbon of replacement parts and consumables), waste generated (transport and processing emissions), and any direct emissions (e.g., SF6 releases). Understanding the full footprint helps identify reduction opportunities."
  },
  {
    id: 7,
    question: "Route planning and journey consolidation for maintenance technicians can reduce:",
    options: [
      "Only the time spent driving",
      "Fuel consumption, CO2 emissions, vehicle wear, driver fatigue and operational costs",
      "Only the cost of fuel",
      "Only the number of customer complaints"
    ],
    correctAnswer: 1,
    explanation: "Efficient route planning and journey consolidation deliver multiple benefits: reduced fuel consumption (lower cost and emissions), fewer miles driven (less vehicle wear and tyre use), reduced driver fatigue (safer driving), lower carbon emissions (contributing to net zero targets), and better customer service (more time on site, less time driving). Modern route optimisation software and dynamic scheduling can reduce maintenance travel by 15-25%."
  },
  {
    id: 8,
    question: "What are 'green skills' in the context of maintenance engineering?",
    options: [
      "Skills related to painting equipment green for environmental branding",
      "Technical competencies needed to support the transition to a low-carbon economy, including energy efficiency, renewable technologies, electric vehicle infrastructure, heat pump systems and environmental compliance",
      "Only skills related to installing solar panels",
      "Skills that will become obsolete as AI replaces maintenance technicians"
    ],
    correctAnswer: 1,
    explanation: "Green skills encompass the technical knowledge and practical competencies needed to deliver the low-carbon transition. For maintenance technicians, this includes energy efficiency assessment and improvement, renewable energy system maintenance (solar PV, wind, battery storage), electric vehicle charging infrastructure, heat pump installation and maintenance, smart building controls, environmental compliance, and carbon literacy. These skills are in rapidly growing demand."
  },
  {
    id: 9,
    question: "Continuous improvement in sustainability for a maintenance team involves:",
    options: [
      "Making one major change and then stopping",
      "Setting measurable targets, tracking performance, identifying improvements, implementing changes and reviewing progress in a repeating cycle",
      "Only attending annual environmental awareness training",
      "Waiting for new regulations before making any changes"
    ],
    correctAnswer: 1,
    explanation: "Continuous improvement follows the Plan-Do-Check-Act cycle: set specific, measurable sustainability targets (e.g., reduce waste to landfill by 20%, reduce travel emissions by 15%); implement actions to achieve them; monitor and measure performance; review results and identify further improvements. This is the same approach used in quality management (ISO 9001) and energy management (ISO 50001), adapted for environmental sustainability."
  },
  {
    id: 10,
    question: "Reporting sustainability metrics helps a maintenance company by:",
    options: [
      "Creating more paperwork with no practical benefit",
      "Demonstrating environmental performance to clients, supporting tender bids, identifying cost savings, meeting regulatory requirements and driving internal improvement",
      "Only satisfying the requirements of ISO 14001",
      "Replacing the need for actual environmental improvements"
    ],
    correctAnswer: 1,
    explanation: "Sustainability reporting serves multiple purposes: demonstrating environmental credentials to clients (increasingly required in tender evaluation), identifying cost-saving opportunities (waste reduction, energy efficiency, fuel savings), meeting regulatory requirements (SECR, ESOS), benchmarking performance against industry peers, engaging staff in sustainability goals, and providing data for continuous improvement. What gets measured gets managed."
  },
  {
    id: 11,
    question: "When considering the embodied carbon of a replacement distribution board, the largest contribution typically comes from:",
    options: [
      "The cardboard packaging",
      "The manufacturing process and raw material extraction for metals (copper busbars, steel enclosure) and plastics",
      "The installation labour",
      "The delivery vehicle's fuel consumption"
    ],
    correctAnswer: 1,
    explanation: "The largest embodied carbon contribution for a distribution board comes from the raw material extraction and manufacturing of its metal components — particularly copper (high energy intensity to mine and refine) and steel (energy-intensive smelting process). Plastics (derived from petrochemicals) also contribute significantly. Understanding this helps justify repair over replacement where possible, and selecting products with recycled content when replacement is necessary."
  },
  {
    id: 12,
    question: "Under the ST1426 standard, sustainable work practices are:",
    options: [
      "An optional extra that only applies to large companies",
      "A core requirement — maintenance technicians must demonstrate environmental awareness, sustainable working practices and continuous improvement in their professional behaviour",
      "Only assessed if the apprentice chooses an environmental pathway",
      "Not mentioned in the standard"
    ],
    correctAnswer: 1,
    explanation: "ST1426 explicitly requires maintenance technicians to work in an environmentally responsible manner and contribute to sustainability. This includes understanding environmental legislation, applying the waste hierarchy, supporting energy efficiency, and adopting sustainable working practices. These requirements are assessed through the end-point assessment and reflect the growing importance of environmental competence in the maintenance engineering profession."
  }
];

const faqs = [
  {
    question: "How can I make my daily maintenance work more sustainable?",
    answer: "Start with the basics: plan your routes to minimise travel, take only the materials you need (reducing waste from unused stock), segregate waste properly on site, switch off equipment and lights when you have finished in an area, use rechargeable batteries for your tools, maintain your van for fuel efficiency, and report energy waste you observe on client sites. Small actions repeated daily across your entire career add up to a significant positive impact."
  },
  {
    question: "Is it always better to repair than replace?",
    answer: "Not always. The repair vs replace decision depends on multiple factors. Sometimes a new item is significantly more energy-efficient than the old one (e.g., replacing a T8 fluorescent luminaire with an LED), and the energy savings over its life outweigh the embodied carbon of manufacturing the replacement. Other times, repair extends the life of a perfectly serviceable item and avoids the environmental cost of manufacturing a replacement. Use a whole-life cost and carbon analysis to make informed decisions."
  },
  {
    question: "What is the Science Based Targets initiative (SBTi)?",
    answer: "The SBTi is a partnership between CDP, the UN Global Compact, WRI and WWF that helps companies set greenhouse gas reduction targets consistent with limiting global warming to 1.5 degrees Celsius. Companies that commit to SBTi must set near-term targets (5-10 years) for significant emission reductions and a long-term target of net zero by 2050 at the latest. Many large construction and facilities management companies have SBTi-validated targets, which flow down to their supply chains including maintenance contractors."
  },
  {
    question: "How do electric vehicles (EVs) affect maintenance sustainability?",
    answer: "Transitioning maintenance vans from diesel to electric can reduce fleet carbon emissions by 60-70% (based on current UK grid carbon intensity, which is falling as renewables increase). Beyond emissions, EVs have lower running costs, require less maintenance (no oil changes, fewer brake replacements due to regenerative braking), and produce zero tailpipe emissions in urban areas (improving air quality). The main considerations are range anxiety (improving rapidly with new models), charging infrastructure, and the higher purchase cost (offset by lower running costs over the vehicle's life)."
  },
  {
    question: "What sustainability qualifications or certifications are useful for maintenance technicians?",
    answer: "Useful qualifications include: IEMA Foundation Certificate in Environmental Management (broad environmental awareness), BREEAM AP (for building sustainability), SMSTS/SSSTS with environmental modules, Carbon Literacy certification (understanding carbon and climate change), F-Gas handling certification (if working with refrigerants or SF6), and your ST1426 qualification itself which includes environmental competencies. Many employers also offer in-house environmental awareness training tailored to their operations."
  }
];

const MOETModule1Section5_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section5">
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
            <Shield className="h-4 w-4" />
            <span>Module 1.5.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Sustainable Work Practices
          </h1>
          <p className="text-white/80">
            Circular economy thinking, low-carbon choices and continuous improvement for maintenance technicians
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Circular economy:</strong> Design out waste, keep materials in use</li>
              <li className="pl-1"><strong>Repair vs replace:</strong> Whole-life cost and carbon analysis</li>
              <li className="pl-1"><strong>Travel emissions:</strong> Often 30-50% of a maintenance company's footprint</li>
              <li className="pl-1"><strong>Net zero:</strong> UK target by 2050 — drives demand for green skills</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Electrical Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Component repair:</strong> Replace capacitors, not entire boards</li>
              <li className="pl-1"><strong>EV transition:</strong> Maintenance van electrification</li>
              <li className="pl-1"><strong>Green skills:</strong> Heat pumps, EV charging, solar PV, battery storage</li>
              <li className="pl-1"><strong>ST1426:</strong> Environmental awareness and continuous improvement KSBs</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply circular economy principles to maintenance decision making",
              "Evaluate repair vs replace decisions using whole-life cost and carbon analysis",
              "Understand life cycle assessment and its relevance to material and equipment selection",
              "Identify practical strategies for reducing travel emissions in maintenance operations",
              "Describe the green skills needed for the low-carbon transition in maintenance engineering",
              "Implement continuous improvement in sustainability performance and reporting"
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

        {/* Section 01: Circular Economy Principles in Maintenance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Circular Economy Principles in Maintenance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The traditional approach to maintenance has been largely linear: when something breaks,
              remove it, dispose of it, and install a new one. The circular economy challenges this
              thinking by asking: can we extend the life of this equipment? Can we repair at the
              component level rather than replacing the whole unit? Can we recover valuable materials
              at end of life? As a maintenance technician, you are at the front line of this transition.
            </p>
            <p>
              The circular economy is not anti-business — it is a more intelligent approach to resource
              use that reduces costs, creates new service opportunities, and delivers environmental
              benefits. For maintenance companies, the shift towards repair, refurbishment and
              condition-based maintenance is both an environmental imperative and a commercial opportunity.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Circular Economy Strategies for Maintenance</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Design for maintenance:</strong> When specifying new installations, choose equipment designed for easy repair, component-level replacement and eventual disassembly — modular designs with standardised fixings</li>
                <li className="pl-1"><strong>Extend product life:</strong> Through preventive and predictive maintenance, you keep equipment running at optimal performance for longer, delaying the need for replacement</li>
                <li className="pl-1"><strong>Component-level repair:</strong> Replace failed capacitors in a VSD rather than the entire drive. Replace a ballast in a luminaire rather than the whole fitting. Repair rather than replace where it is safe, effective and economical to do so</li>
                <li className="pl-1"><strong>Refurbishment:</strong> Older distribution boards, switchgear and control panels can often be refurbished — replacing worn components, cleaning, testing and returning to service</li>
                <li className="pl-1"><strong>Remanufacturing:</strong> Some manufacturers offer remanufactured products (e.g., electric motors, transformers) at lower cost and environmental impact than new</li>
                <li className="pl-1"><strong>Material recovery:</strong> At end of life, separate materials for recycling — copper, aluminium, steel, plastics — to maximise resource recovery</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Repair vs Replace Decision Framework</h3>
              <p className="text-sm text-white mb-2">
                Making informed repair vs replace decisions is a core skill for sustainable maintenance.
                Consider the following factors:
              </p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Factor</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Favours Repair</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Favours Replace</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Remaining useful life</td>
                      <td className="border border-white/10 px-3 py-2">Substantial life remaining</td>
                      <td className="border border-white/10 px-3 py-2">Near end of life; further failures likely</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Energy efficiency</td>
                      <td className="border border-white/10 px-3 py-2">Small efficiency gap between old and new</td>
                      <td className="border border-white/10 px-3 py-2">New model significantly more efficient</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Repair cost</td>
                      <td className="border border-white/10 px-3 py-2">Cost well below replacement</td>
                      <td className="border border-white/10 px-3 py-2">Repair cost approaching replacement cost</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Spare parts</td>
                      <td className="border border-white/10 px-3 py-2">Parts readily available</td>
                      <td className="border border-white/10 px-3 py-2">Parts obsolete or hard to source</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Embodied carbon</td>
                      <td className="border border-white/10 px-3 py-2">High embodied carbon in replacement</td>
                      <td className="border border-white/10 px-3 py-2">Low embodied carbon; high operating carbon saved</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Safety/compliance</td>
                      <td className="border border-white/10 px-3 py-2">Meets current standards after repair</td>
                      <td className="border border-white/10 px-3 py-2">Cannot meet current standards</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">The 50% Rule of Thumb</p>
              <p className="text-sm text-white">
                A common industry guideline is that if the repair cost exceeds 50% of the replacement
                cost and the equipment has used more than 50% of its expected service life, replacement
                is usually more economical. However, this should be adjusted for sustainability
                considerations — if the embodied carbon of the replacement is very high and the
                efficiency gain is marginal, repair may be the more sustainable choice even when it
                exceeds the 50% threshold.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> The circular economy is not about keeping everything forever.
              It is about making informed decisions that balance operational needs, safety, cost and
              environmental impact. Sometimes the most sustainable action is to replace an old, inefficient
              piece of equipment with a modern, efficient one — but this decision should be made
              consciously, not by default.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Life Cycle Assessment and Low-Carbon Materials */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Life Cycle Assessment and Low-Carbon Materials
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Life cycle assessment (LCA) is a systematic method for evaluating the environmental impact
              of a product, process or service throughout its entire life — from raw material extraction
              to end-of-life disposal or recycling. Understanding LCA principles helps maintenance
              technicians make more informed decisions about material selection, equipment specification
              and end-of-life management.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Life Cycle Stages</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>A1-A3 — Product stage:</strong> Raw material extraction, transport to factory, manufacturing.
                  This is the 'embodied carbon' of the product. Copper has high embodied carbon due to energy-intensive
                  mining and refining. Recycled aluminium has 95% less embodied carbon than virgin aluminium.
                </li>
                <li className="pl-1">
                  <strong>A4-A5 — Construction/installation:</strong> Transport to site and installation process.
                  Includes energy used by tools, equipment and vehicles during installation or replacement.
                </li>
                <li className="pl-1">
                  <strong>B1-B7 — Use stage:</strong> Operational energy consumption, maintenance, repair and
                  replacement during the product's service life. For electrical equipment, this is often the largest
                  life cycle impact — a motor may consume 100 times its embodied energy over its operating life.
                </li>
                <li className="pl-1">
                  <strong>C1-C4 — End of life:</strong> Demolition/dismantling, transport to waste processing,
                  recycling or disposal. Proper segregation at end of life maximises material recovery.
                </li>
                <li className="pl-1">
                  <strong>D — Beyond life cycle:</strong> Benefits from recycling and reuse — recycled copper
                  and aluminium offset the need for virgin material, avoiding the associated mining emissions.
                </li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Low-Carbon Material Selection</h3>
              <p className="text-sm text-white mb-2">
                When specifying replacement materials during maintenance, consider the environmental impact
                alongside technical suitability:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Recycled content:</strong> Specify cable, trunking, cable tray and accessories with high recycled metal content where available</li>
                <li className="pl-1"><strong>Low-smoke zero-halogen (LSZH):</strong> LSZH cables have a lower environmental impact when incinerated at end of life compared to PVC, and do not release hydrogen chloride gas</li>
                <li className="pl-1"><strong>Durability:</strong> Specify materials with longer service life — stainless steel cable tray in corrosive environments rather than galvanised steel that will need replacing sooner</li>
                <li className="pl-1"><strong>Packaging:</strong> Choose suppliers who minimise packaging and use recyclable materials — reduce waste at source</li>
                <li className="pl-1"><strong>Local sourcing:</strong> Where quality is equivalent, prefer locally manufactured products to reduce transport emissions</li>
                <li className="pl-1"><strong>Environmental Product Declarations (EPDs):</strong> Some manufacturers publish EPDs — standardised LCA data for their products — which enable comparison</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Embodied Carbon in Common Electrical Materials</h3>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Material</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Approx. Embodied Carbon (kgCO2e/kg)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Recycled Alternative</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Virgin copper</td>
                      <td className="border border-white/10 px-3 py-2">3.5 - 4.0</td>
                      <td className="border border-white/10 px-3 py-2">Recycled copper: ~0.5</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Virgin aluminium</td>
                      <td className="border border-white/10 px-3 py-2">8.0 - 12.0</td>
                      <td className="border border-white/10 px-3 py-2">Recycled aluminium: ~0.5</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Virgin steel</td>
                      <td className="border border-white/10 px-3 py-2">1.5 - 2.5</td>
                      <td className="border border-white/10 px-3 py-2">Recycled steel: ~0.4</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">PVC</td>
                      <td className="border border-white/10 px-3 py-2">2.5 - 3.5</td>
                      <td className="border border-white/10 px-3 py-2">Recycled PVC: ~1.0</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical tip:</strong> When stripping out old cables, always segregate the copper from
              the insulation. Copper is one of the most valuable and recyclable materials — recycling copper
              saves 85% of the energy needed to produce virgin copper from ore. Your conscientious
              segregation directly reduces environmental impact and recovers economic value.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Reducing Travel Emissions and Remote Diagnostics */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Reducing Travel Emissions and Remote Diagnostics
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              For most maintenance companies, vehicle travel is the single largest source of carbon
              emissions — often accounting for 30-50% or more of the total footprint. Every unnecessary
              journey to site, every unplanned return for parts, and every inefficient route represents
              avoidable carbon emissions and financial cost. Reducing travel emissions is therefore one
              of the most impactful sustainability actions a maintenance team can take.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Route Planning and Journey Consolidation</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Route optimisation:</strong> Use route planning software to minimise total distance and time. Cluster jobs by geographical area rather than by priority alone where possible</li>
                <li className="pl-1"><strong>Consolidate visits:</strong> Combine multiple tasks at one site into a single visit. Coordinate with other trades to reduce total journeys to a building</li>
                <li className="pl-1"><strong>First-fix rate:</strong> Carry the right parts and tools. A high first-fix rate means fewer return visits. Use job information and fault diagnostics to prepare before travelling</li>
                <li className="pl-1"><strong>Avoid peak traffic:</strong> Where scheduling flexibility exists, travel outside peak hours to reduce time spent idling in traffic</li>
                <li className="pl-1"><strong>Van stock management:</strong> Maintain a well-stocked van with the most commonly needed parts. Reduce emergency parts runs to wholesalers</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Remote Diagnostics and Condition Monitoring</h3>
              <p className="text-sm text-white mb-2">
                Technology is transforming maintenance from a reactive, travel-intensive activity to a
                proactive, data-driven discipline. Remote diagnostics can significantly reduce the need
                for physical site visits:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>IoT sensors:</strong> Vibration, temperature, current and power quality sensors on critical equipment provide continuous performance data accessible remotely</li>
                <li className="pl-1"><strong>BEMS remote access:</strong> Remote access to building management systems allows fault diagnosis, parameter adjustment and trend analysis without travelling to site</li>
                <li className="pl-1"><strong>Smart circuit breakers:</strong> Modern circuit breakers with built-in monitoring can report trip events, load profiles and contact wear data remotely</li>
                <li className="pl-1"><strong>Predictive maintenance:</strong> Analysis of sensor data can predict failures before they occur, enabling planned interventions rather than emergency call-outs</li>
                <li className="pl-1"><strong>Video-assisted diagnostics:</strong> Site personnel can share live video of a fault with a remote specialist, enabling diagnosis and parts identification before the technician travels</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Fleet Electrification</h3>
              <p className="text-sm text-white mb-2">
                The transition from diesel to electric maintenance vans is accelerating, driven by
                government policy (ban on new diesel van sales from 2035), falling EV costs, and
                corporate net zero commitments:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Carbon reduction:</strong> An electric van produces approximately 60-70% less carbon than a diesel van over its lifetime (including electricity generation emissions)</li>
                <li className="pl-1"><strong>Running costs:</strong> Electricity costs approximately 4-6p per mile vs 15-20p per mile for diesel</li>
                <li className="pl-1"><strong>Clean Air Zones:</strong> Electric vans are exempt from Clean Air Zone charges — an increasing cost for diesel vans in many UK cities</li>
                <li className="pl-1"><strong>Range considerations:</strong> Most modern electric vans offer 150-200+ miles range — sufficient for most maintenance routes with overnight charging</li>
                <li className="pl-1"><strong>As a maintenance technician:</strong> You may be asked to install and maintain the workplace charging infrastructure that supports your company's EV fleet</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Impact example:</strong> A maintenance technician driving 25,000 miles per year in a
              diesel van produces approximately 7.5 tonnes of CO2. Switching to an electric van reduces
              this to approximately 2.0 tonnes (based on current UK grid intensity). Over a 5-year vehicle
              life, that is 27.5 tonnes of CO2 avoided — equivalent to the annual emissions of about 5
              average UK households.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Green Skills, Net Zero and Continuous Improvement */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Green Skills, Net Zero and Continuous Improvement
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The transition to a net zero economy is creating unprecedented demand for skilled
              maintenance technicians who understand low-carbon technologies. The Government's Green
              Jobs Taskforce has identified that hundreds of thousands of workers will need 'green
              skills' to deliver the UK's climate targets. As an apprentice maintenance technician,
              you are entering the profession at exactly the right time to build these capabilities.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Green Skills for Maintenance Technicians</h3>
              <ul className="text-sm text-white space-y-2 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Heat pump systems:</strong> As gas boilers are phased out, heat pumps (air source and ground
                  source) will become the primary heating technology. Maintenance technicians need to understand heat
                  pump electrical systems, controls, refrigerant circuits and performance optimisation.
                </li>
                <li className="pl-1">
                  <strong>Solar PV and battery storage:</strong> Rooftop solar PV and battery energy storage systems (BESS)
                  are proliferating. Maintenance includes inverter checks, panel inspection, battery management system
                  monitoring, and electrical protection verification.
                </li>
                <li className="pl-1">
                  <strong>EV charging infrastructure:</strong> Workplace and public EV chargers require installation,
                  commissioning, and ongoing maintenance. Understanding OCPP (Open Charge Point Protocol), load
                  management, and smart charging is increasingly important.
                </li>
                <li className="pl-1">
                  <strong>Smart building controls:</strong> Advanced BEMS, IoT integration, demand-side response and
                  grid flexibility services require technicians who can work at the intersection of electrical, digital
                  and control systems.
                </li>
                <li className="pl-1">
                  <strong>Energy storage:</strong> Grid-scale and building-scale battery systems (lithium-ion, flow
                  batteries) are becoming common. Maintenance includes BMS health checks, cell balancing verification,
                  thermal management and safety system testing.
                </li>
                <li className="pl-1">
                  <strong>Carbon literacy:</strong> Understanding carbon accounting, scope 1/2/3 emissions, carbon
                  budgets and net zero pathways helps you contribute to your organisation's sustainability objectives.
                </li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Net Zero Targets and Carbon Footprinting</h3>
              <p className="text-sm text-white mb-2">
                Many organisations are now setting net zero targets for their operations, driven by the
                Climate Change Act 2008, investor pressure, customer expectations and employee values.
                Understanding how these targets work helps you see where your role fits in:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Scope 1:</strong> Direct emissions from company-owned sources — vehicle fleet fuel, gas heating, SF6 releases</li>
                <li className="pl-1"><strong>Scope 2:</strong> Indirect emissions from purchased energy — electricity used in workshops, offices and depots</li>
                <li className="pl-1"><strong>Scope 3:</strong> Value chain emissions — materials purchased, waste disposal, business travel, employee commuting</li>
                <li className="pl-1"><strong>Reduction hierarchy:</strong> Avoid emissions (remote diagnostics), reduce emissions (efficient vehicles, optimised routes), substitute (EV fleet, green electricity), offset (last resort for residual emissions)</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Continuous Improvement in Sustainability</h3>
              <p className="text-sm text-white mb-2">
                Sustainable work practices are not a one-off project — they require continuous improvement.
                Apply the Plan-Do-Check-Act cycle to your sustainability performance:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Plan:</strong> Set specific, measurable targets — "Reduce waste to landfill by 20% this year" or "Improve first-fix rate to 85% to reduce return visits"</li>
                <li className="pl-1"><strong>Do:</strong> Implement the actions — improve van stock, introduce waste segregation training, adopt route planning software</li>
                <li className="pl-1"><strong>Check:</strong> Monitor and measure results — track waste tonnages, fuel consumption, first-fix rates, recycling percentages</li>
                <li className="pl-1"><strong>Act:</strong> Review performance against targets, identify what worked and what did not, set new targets for the next period</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Reporting Sustainability Metrics</p>
              <p className="text-sm text-white">
                Organisations are increasingly required or expected to report sustainability metrics.
                As a maintenance technician, the data you record contributes to these reports: waste
                transfer notes (waste data), fuel receipts (fleet emissions), materials purchased
                (embodied carbon), and energy audit observations (efficiency opportunities). Accurate
                recording is essential — sustainability reporting is only as good as the data behind it.
                Treat sustainability data with the same rigour as safety data.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> The maintenance technician standard requires you to demonstrate
              environmental awareness and contribute to continuous improvement. Developing green skills,
              understanding net zero targets, and actively seeking to reduce the environmental impact of
              your work are all evidence of the professional behaviours expected by the standard. Your
              environmental competence is not just an add-on — it is integral to being a skilled, modern
              maintenance technician.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05: Sustainable Procurement and Your Professional Responsibility */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Sustainable Procurement and Your Professional Responsibility
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Every purchasing decision in maintenance has an environmental dimension. The cable you
              specify, the luminaire you select, the consumables you order, the PPE you wear — each
              of these has an embodied carbon footprint, a supply chain story, and an end-of-life
              destination. Sustainable procurement brings environmental thinking into these everyday
              decisions without compromising on quality or safety.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Sustainable Procurement Principles</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Whole-life cost:</strong> Consider not just purchase price but energy costs, maintenance costs, replacement frequency and disposal costs over the product's life</li>
                <li className="pl-1"><strong>Environmental criteria:</strong> Include embodied carbon, recycled content, recyclability, hazardous substance content and packaging in purchasing decisions</li>
                <li className="pl-1"><strong>Supplier credentials:</strong> Prefer suppliers with ISO 14001 certification, published environmental policies and carbon reduction targets</li>
                <li className="pl-1"><strong>Product longevity:</strong> Specify durable, repairable products with long warranties and available spare parts</li>
                <li className="pl-1"><strong>Reduce packaging waste:</strong> Request minimal or returnable packaging; avoid individually wrapped items where bulk alternatives exist</li>
                <li className="pl-1"><strong>Ethical sourcing:</strong> Consider the social and environmental conditions in the supply chain — conflict minerals in electronics, labour practices in manufacturing</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Your Professional Responsibility</h3>
                <p className="text-sm text-white">
                  As a maintenance technician, you have a professional responsibility to work sustainably.
                  This is not just about following company policy — it is about taking personal ownership
                  of your environmental impact. Every cable offcut you segregate for recycling, every
                  observation of energy waste you report, every journey you plan efficiently, and every
                  repair vs replace decision you make thoughtfully contributes to a more sustainable
                  maintenance profession.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Leading by Example</h3>
                <p className="text-sm text-white">
                  Sustainability culture in a maintenance team starts with individual behaviour. When you
                  consistently demonstrate good environmental practices — tidying your work area, segregating
                  waste, reporting energy waste, maintaining your vehicle, reducing material use — you set
                  a standard that influences your colleagues. As you progress in your career, your sustainable
                  habits become leadership behaviours that shape the culture of your team and organisation.
                </p>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">The Future of Sustainable Maintenance</h3>
              <p className="text-sm text-white">
                The maintenance engineering profession is undergoing a profound transformation. The
                convergence of digital technology (IoT, AI, predictive analytics), decarbonisation
                (electrification, renewables, heat pumps), circular economy thinking (repair,
                refurbishment, material recovery) and regulatory pressure (net zero targets, extended
                producer responsibility) is creating a new model of maintenance that is smarter, cleaner
                and more resource-efficient. The technicians who embrace these changes — who develop green
                skills, adopt sustainable practices, and contribute to continuous improvement — will be the
                most valued and employable professionals in the industry.
              </p>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Final thought:</strong> Sustainability is not a separate discipline bolted onto
              maintenance — it is integral to good maintenance practice. A well-maintained system is an
              efficient system. An efficient system uses less energy and generates less waste. Less waste
              means lower costs and lower environmental impact. Good maintenance is sustainable maintenance.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

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
                <p className="font-medium text-white mb-1">Circular Economy Actions</p>
                <ul className="space-y-0.5">
                  <li>1. Prevent waste — order correct quantities</li>
                  <li>2. Extend life — maintain for longevity</li>
                  <li>3. Repair — component-level where possible</li>
                  <li>4. Refurbish — restore to service</li>
                  <li>5. Recycle — segregate materials for recovery</li>
                  <li>6. Replace responsibly — whole-life analysis</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key References</p>
                <ul className="space-y-0.5">
                  <li>Climate Change Act 2008 — Net zero by 2050</li>
                  <li>ISO 14001 — Environmental management systems</li>
                  <li>PAS 2080 — Carbon management in infrastructure</li>
                  <li>SBTi — Science Based Targets initiative</li>
                  <li>GHG Protocol — Scope 1, 2, 3 emissions</li>
                  <li>ST1426 — Environmental awareness and CI KSBs</li>
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
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section5-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Environmental Legislation
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section5">
              Back to Section Overview
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule1Section5_5;
