/**
 * Module 6 · Section 3 · Subsection 4 — BREEAM Materials and Waste
 * HNC Electrical Engineering for Building Services (Sustainability and Environmental Engineering)
 *   Responsible sourcing, life cycle impacts, construction waste management, operational waste, and circular economy principles
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

const TITLE = 'BREEAM Materials and Waste - HNC Module 6 Section 3.4';
const DESCRIPTION =
  'Master BREEAM Materials and Waste categories: responsible sourcing (Mat 03), life cycle assessment (Mat 01), construction waste management (Wst 01), operational waste (Wst 02), Environmental Product Declarations, and circular economy principles for MEP systems.';

const quickCheckQuestions = [
  {
    id: 'mat01-purpose',
    question:
      'What is the primary purpose of BREEAM Mat 01 (Environmental Impacts from Construction Products)?',
    options: [
      'To measure construction programme duration',
      'To assess life cycle environmental impacts of building materials using LCA methodology',
      'To calculate material costs for the project',
      'To verify supplier delivery schedules',
    ],
    correctIndex: 1,
    explanation:
      'Mat 01 assesses the life cycle environmental impacts of building materials using Life Cycle Assessment (LCA) methodology, encouraging specification of materials with lower embodied carbon and reduced environmental burden across their entire life cycle.',
  },
  {
    id: 'responsible-sourcing',
    question:
      'Which BREEAM issue specifically addresses responsible sourcing of construction products?',
    options: ['Mat 01', 'Mat 02', 'Mat 03', 'Wst 01'],
    correctIndex: 2,
    explanation:
      'Mat 03 (Responsible Sourcing of Construction Products) specifically addresses responsible sourcing, requiring materials to be sourced from suppliers with certified environmental management systems and responsible sourcing certification schemes such as BES 6001.',
  },
  {
    id: 'construction-waste',
    question: 'What does BREEAM Wst 01 require for construction waste management?',
    options: [
      'All waste must be sent to landfill',
      'A Resource Management Plan setting diversion targets from landfill',
      'Only hazardous waste tracking',
      'No waste monitoring is required',
    ],
    correctIndex: 1,
    explanation:
      'Wst 01 requires a Resource Management Plan (RMP) that sets targets for diverting construction waste from landfill, monitors actual waste arisings, and demonstrates commitment to reducing, reusing, and recycling construction materials.',
  },
  {
    id: 'circular-economy',
    question: 'How does circular economy thinking apply to MEP material selection?',
    options: [
      'Use the cheapest materials regardless of recyclability',
      'Design for disassembly, specify recyclable materials, and consider end-of-life recovery',
      'Install materials that cannot be removed',
      'Ignore material life cycle considerations',
    ],
    correctIndex: 1,
    explanation:
      'Circular economy principles in MEP specification involve designing for disassembly (mechanical fixings over adhesives), specifying materials with high recycled content and recyclability, and considering how components can be recovered, refurbished, or recycled at end of life.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'What documentation is required to demonstrate compliance with BREEAM Mat 01 credits?',
    options: [
      'Supplier invoices only',
      'Environmental Product Declarations (EPDs) or equivalent LCA data',
      'Material safety data sheets',
      'Building control approval',
    ],
    correctAnswer: 1,
    explanation:
      'Mat 01 credits require Environmental Product Declarations (EPDs) compliant with EN 15804, or equivalent LCA data calculated using recognised methodologies, to demonstrate the environmental impacts of specified materials.',
  },
  {
    id: 2,
    question:
      'In BREEAM Mat 03, what level of responsible sourcing certification is required for the highest credits?',
    options: [
      'No certification required',
      'Any supplier statement',
      'Third-party certified schemes such as BES 6001 or FSC',
      'Self-declared environmental policies',
    ],
    correctAnswer: 2,
    explanation:
      'Maximum Mat 03 credits require third-party certified responsible sourcing schemes such as BES 6001 (construction products) or FSC/PEFC (timber), providing verified evidence of sustainable supply chain management.',
  },
  {
    id: 3,
    question:
      'What minimum percentage of construction waste diversion from landfill typically earns BREEAM Wst 01 credits?',
    options: ['50%', '70%', '85%', '95%'],
    correctAnswer: 1,
    explanation:
      'BREEAM Wst 01 typically requires a minimum 70% diversion of non-hazardous construction waste from landfill for baseline credits, with higher percentages (up to 95%) earning additional credits depending on the scheme version.',
  },
  {
    id: 4,
    question: 'Which MEP materials are most relevant for Mat 03 responsible sourcing credits?',
    options: [
      'Only structural steel',
      'Copper cables, steel containment, pipework, and ductwork',
      'Paint and finishes only',
      'Concrete and masonry',
    ],
    correctAnswer: 1,
    explanation:
      'Key MEP materials for Mat 03 include copper cables and conductors, steel cable containment and supports, copper and steel pipework, galvanised steel ductwork, and aluminium components - all of which can be sourced from certified suppliers.',
  },
  {
    id: 5,
    question: 'What does an Environmental Product Declaration (EPD) provide?',
    options: [
      'Product installation instructions',
      'Verified environmental impact data across defined life cycle stages',
      'Warranty information',
      'Pricing and lead time data',
    ],
    correctAnswer: 1,
    explanation:
      'An EPD provides independently verified environmental impact data covering defined life cycle stages (typically A1-A3 cradle-to-gate minimum), including global warming potential, ozone depletion, acidification, and resource depletion metrics.',
  },
  {
    id: 6,
    question: 'Which BREEAM issue addresses operational waste storage and recycling facilities?',
    options: ['Wst 01', 'Wst 02', 'Wst 03', 'Mat 01'],
    correctAnswer: 1,
    explanation:
      "Wst 02 (Operational Waste) addresses the provision of adequate space and facilities for segregation and storage of operational recyclable waste, encouraging building users to recycle during the building's operational phase.",
  },
  {
    id: 7,
    question: 'How does designing for disassembly support circular economy principles?',
    options: [
      'It makes buildings harder to demolish',
      'It enables material recovery and reuse at end of building life',
      'It reduces initial construction costs',
      'It eliminates the need for maintenance',
    ],
    correctAnswer: 1,
    explanation:
      'Designing for disassembly uses mechanical fixings rather than adhesives, documents material locations, and enables components to be recovered intact for refurbishment or recycling at end of building life, supporting circular material flows.',
  },
  {
    id: 8,
    question: 'What recycled content consideration applies to copper cables in BREEAM assessments?',
    options: [
      'Copper cables cannot have recycled content',
      'Recycled copper conductors can contribute to recycled content targets',
      'Only new copper is permitted',
      'Recycled content is not tracked for cables',
    ],
    correctAnswer: 1,
    explanation:
      'Copper cables can specify recycled copper conductors, which contributes to building-level recycled content targets. Copper has excellent recyclability and recycled copper maintains equivalent performance to virgin material.',
  },
  {
    id: 9,
    question: 'What is the purpose of a Site Waste Management Plan (SWMP) in construction?',
    options: [
      'To plan site security arrangements',
      'To forecast, record, and manage construction waste arisings and disposal routes',
      'To schedule material deliveries',
      'To track labour productivity',
    ],
    correctAnswer: 1,
    explanation:
      'A SWMP forecasts expected waste types and quantities, identifies reduction and reuse opportunities, sets recycling targets, records actual waste arisings, and demonstrates compliance with waste management regulations and BREEAM requirements.',
  },
  {
    id: 10,
    question:
      'Which standard defines the methodology for Environmental Product Declarations in construction?',
    options: ['BS 7671', 'EN 15804', 'ISO 9001', 'CIBSE Guide A'],
    correctAnswer: 1,
    explanation:
      'EN 15804 (Sustainability of Construction Works - Environmental Product Declarations) defines the core product category rules for construction products, ensuring EPDs are calculated consistently and can be compared across suppliers.',
  },
  {
    id: 11,
    question: 'How can MEP contractors contribute to Wst 01 construction waste credits?',
    options: [
      'By disposing of all waste in general skips',
      'By segregating waste, returning packaging, and using prefabrication to reduce site waste',
      'By ignoring waste requirements',
      'By disposing of waste off-site without records',
    ],
    correctAnswer: 1,
    explanation:
      'MEP contractors contribute by segregating metals, plastics, and cardboard; returning cable drums and packaging to suppliers; using off-site prefabrication to reduce site waste; and maintaining accurate waste transfer documentation.',
  },
  {
    id: 12,
    question: 'What is embodied carbon in the context of building materials?',
    options: [
      'The carbon released during building operation',
      'The total greenhouse gas emissions from extraction, manufacture, and transport of materials',
      'The carbon stored in timber products',
      'The carbon footprint of building users',
    ],
    correctAnswer: 1,
    explanation:
      'Embodied carbon represents the total greenhouse gas emissions associated with material extraction, manufacturing, transportation, and installation (life cycle stages A1-A5). It is a key metric in Mat 01 LCA assessments.',
  },
];

const faqs = [
  {
    question: 'How do EPDs differ from manufacturer environmental claims?',
    answer:
      'Environmental Product Declarations (EPDs) are independently verified by accredited third parties against EN 15804 methodology, providing standardised and comparable environmental impact data. Unlike self-declared manufacturer claims, EPDs undergo rigorous verification processes, must follow specific calculation rules, and cover defined life cycle stages. This verification gives assessors confidence in the data and ensures consistency when comparing products from different manufacturers.',
  },
  {
    question: 'What responsible sourcing schemes are recognised by BREEAM for MEP materials?',
    answer:
      'For general construction products, BES 6001 (Responsible Sourcing of Construction Products) is the primary scheme. For steel and aluminium, schemes include ISO 14001 with additional supply chain verification. Copper can be sourced through Copper Mark certified suppliers. FSC and PEFC certification applies to any timber components. BREEAM recognises tiered certification levels, with higher credits available for more comprehensive third-party certification.',
  },
  {
    question: 'How should electrical contractors manage cable waste on BREEAM projects?',
    answer:
      'Cable offcuts (copper and aluminium) should be segregated and collected for recycling - copper has high recycling value and excellent recyclability. Cable drums should be returned to suppliers under take-back arrangements. Packaging including cardboard reels and plastic wrap should be separated for recycling. Accurate records of waste quantities and disposal routes must be maintained for BREEAM evidence, with waste transfer notes retained for all movements.',
  },
  {
    question:
      'What is the relationship between BREEAM materials credits and Whole Life Carbon assessment?',
    answer:
      'Mat 01 LCA credits feed into the broader Whole Life Carbon assessment, covering embodied impacts (modules A1-A5). BREEAM increasingly aligns with RICS Whole Life Carbon methodology, requiring assessment of operational carbon (modules B1-B7) and end-of-life impacts (modules C1-C4). Together, these provide a complete picture of building carbon across its entire life cycle, informing both specification decisions and operational strategies.',
  },
  {
    question: 'How can prefabrication support BREEAM waste credits?',
    answer:
      'Off-site prefabrication (such as modular wiring, pre-assembled risers, and factory-built plantrooms) reduces site waste by enabling controlled cutting and material optimisation in factory conditions. Offcuts can be reused immediately in subsequent production. Packaging is consolidated and more easily recycled. Studies show prefabrication can reduce construction waste by 50-90% compared to traditional site assembly, directly supporting Wst 01 targets.',
  },
  {
    question: 'What documentation must MEP subcontractors provide for BREEAM materials evidence?',
    answer:
      'Subcontractors should provide: product specifications confirming material types; EPDs or manufacturer LCA data for key products; responsible sourcing certificates (BES 6001, ISO 14001); evidence of recycled content where claimed; waste transfer notes showing disposal routes; delivery notes confirming quantities installed; and any take-back scheme confirmations. Early engagement with main contractors ensures documentation requirements are understood from project start.',
  },
];

const HNCModule6Section3_4 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section3")}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 6 · Section 3 · Subsection 4"
            title="BREEAM Materials and Waste"
            description="Responsible sourcing, life cycle impacts, construction waste management, operational waste, and circular economy principles"
            tone="purple"
          />

          <TLDR
            points={[
              "Mat 01 (life-cycle impacts) uses the Green Guide / IMPACT methodology; Mat 03 (responsible sourcing) requires BES 6001 certification on key materials; Mat 05 (durability) checks design for protection of the building fabric.",
              "Wst 01–05 covers construction-waste management (segregation + recycling), recycled aggregates, operational waste (storage facilities), speculative finishes, and adaptability to future uses.",
              "These two categories together drive procurement specifications more than any other BREEAM area — material substitution at construction stage is the single most common cause of credit loss.",
            ]}
          />

          <RegsCallout
            source="Site Waste Management Plans + BES 6001 + BREEAM Mat/Wst credits"
            clause="For BREEAM Mat 03, the value of the project responsibly sourced materials shall be calculated as the proportion of total Mat 03 eligible material spend that is certified to BES 6001 or equivalent recognised responsible sourcing scheme. For BREEAM Wst 01, a Site Waste Management Plan shall be implemented identifying waste arisings, segregation strategy, recovery rate targets, and reporting at least monthly to demonstrate ≥70% diversion from landfill by tonnage."
            meaning={
              <>
                BES 6001 is the UK responsible sourcing standard — applies to concrete, steel, timber, masonry. The contractor must collect certificates from suppliers at order stage and assemble the evidence pack for the assessor. SWMPs are no longer legally mandatory (repealed 2013) but are required for BREEAM and for many client/local-authority planning conditions.
              </>
            }
            cite="Source: BES 6001 Issue 4.0 (BRE); BREEAM UK NC 2018 Mat & Wst credits — breeam.com"
          />

          <LearningOutcomes
            outcomes={[
              "Apply Mat 01 LCA methodology to MEP material specification",
              "Understand Environmental Product Declarations and EN 15804",
              "Implement Mat 03 responsible sourcing for cables and containment",
              "Develop Wst 01 compliant construction waste management plans",
              "Design Wst 02 operational waste facilities in building services",
              "Apply circular economy principles to MEP design and installation",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Life Cycle Assessment and Mat 01">
            <p>BREEAM Mat 01 (Environmental Impacts from Construction Products) drives the selection of materials with lower environmental burdens across their entire life cycle. This requires understanding Life Cycle Assessment (LCA) methodology and the role of Environmental Product Declarations (EPDs) in demonstrating compliance.</p>
            <p><strong>Life cycle stages assessed under EN 15804:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>A1-A3 (Product stage):</strong> Raw material extraction, transport to factory, manufacturing</li>
              <li><strong>A4-A5 (Construction stage):</strong> Transport to site, installation processes</li>
              <li><strong>B1-B7 (Use stage):</strong> Maintenance, repair, replacement, refurbishment, operational impacts</li>
              <li><strong>C1-C4 (End of life):</strong> Deconstruction, transport, waste processing, disposal</li>
              <li><strong>D (Beyond system boundary):</strong> Reuse, recovery, recycling potential</li>
            </ul>
            <p><strong>Environmental Impact Categories</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Global Warming Potential (GWP):</strong> kg CO2 eq — Embodied carbon of cables, equipment</li>
              <li><strong>Ozone Depletion Potential (ODP):</strong> kg CFC-11 eq — Refrigerants, insulation blowing agents</li>
              <li><strong>Acidification Potential (AP):</strong> kg SO2 eq — Metal processing emissions</li>
              <li><strong>Eutrophication Potential (EP):</strong> kg PO4 eq — Manufacturing process discharges</li>
              <li><strong>Abiotic Depletion (elements):</strong> kg Sb eq — Copper, rare earth elements usage</li>
            </ul>
            <p><strong>Mat 01 Credit Guidance</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>1-3 credits:</strong> Complete LCA using recognised methodology and EPD data</li>
              <li><strong>Additional credits:</strong> Demonstrate material selection improvements based on LCA</li>
              <li><strong>Exemplary:</strong> Third-party verified whole building LCA with ambitious targets</li>
            </ul>
            <p><strong>Specification impact:</strong> MEP materials typically contribute 15-25% of total building embodied carbon, making informed specification crucial for Mat 01 performance.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Responsible Sourcing - Mat 03">
            <p>Mat 03 (Responsible Sourcing of Construction Products) ensures materials are sourced from organisations with robust environmental management systems and verified sustainable supply chains. This applies directly to key MEP materials including copper, steel, aluminium, and plastics.</p>
            <p><strong>Tier 1: Basic</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Legal timber evidence</li>
              <li>Supplier environmental policy</li>
              <li>Basic material traceability</li>
              <li>Minimal credits available</li>
            </ul>
            <p><strong>Tier 2: Certified EMS</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>ISO 14001 certification</li>
              <li>Supply chain assessment</li>
              <li>Documented procedures</li>
              <li>Moderate credits</li>
            </ul>
            <p><strong>Tier 3: Full Certification</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>BES 6001 certification</li>
              <li>Full supply chain verification</li>
              <li>Social responsibility included</li>
              <li>Maximum credits</li>
            </ul>
            <p><strong>Key MEP Materials for Responsible Sourcing</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Copper:</strong> Cables, busbars, pipework — Copper Mark, BES 6001</li>
              <li><strong>Steel:</strong> Containment, supports, ductwork — BES 6001, ResponsibleSteel</li>
              <li><strong>Aluminium:</strong> Cables, heat exchangers, luminaires — ASI Certification, BES 6001</li>
              <li><strong>Plastics (PVC, XLPE):</strong> Cable insulation, conduit, trunking — VinylPlus, BES 6001</li>
              <li><strong>Timber:</strong> Packing, temporary supports — FSC, PEFC</li>
            </ul>
            <p><strong>Procurement Specification Clause</strong></p>
            <p>"All copper cables shall be sourced from manufacturers holding current BES 6001 certification at minimum 'Very Good' rating, with Copper Mark certification preferred. Evidence of certification shall be submitted with material submittals."</p>
            <p><strong>Credit strategy:</strong> Focus responsible sourcing requirements on the largest material volumes - cables, containment, and ductwork typically offer the greatest credit opportunity for MEP packages.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Construction Waste Management - Wst 01">
            <p>Wst 01 (Construction Waste Management) requires a comprehensive approach to minimising, managing, and reporting construction waste. MEP contractors generate significant waste streams including cable offcuts, packaging, and equipment crates that must be properly managed.</p>
            <p><strong>Resource Management Plan Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Pre-construction waste forecast by material type</li>
              <li>Waste minimisation strategies and targets</li>
              <li>Reuse and recycling opportunities identified</li>
              <li>Designated waste storage and segregation areas</li>
              <li>Monitoring procedures and reporting frequency</li>
              <li>Roles and responsibilities for waste management</li>
            </ul>
            <p><strong>Wst 01 Credit Benchmarks</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Minimum standard:</strong> 70% from landfill — No specific target</li>
              <li><strong>Good practice:</strong> 85% from landfill — &lt;7.5 tonnes per 100m2</li>
              <li><strong>Best practice:</strong> 95% from landfill — &lt;5.5 tonnes per 100m2</li>
              <li><strong>Exemplary:</strong> &gt;95% from landfill — &lt;3.5 tonnes per 100m2</li>
            </ul>
            <p><strong>MEP Waste Streams and Management</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Copper offcuts:</strong> Cable installation — Segregate for recycling (high value)</li>
              <li><strong>Cable drums:</strong> Cable deliveries — Return to supplier (take-back scheme)</li>
              <li><strong>Cardboard/packaging:</strong> Equipment deliveries — Compact and recycle</li>
              <li><strong>Plastic packaging:</strong> Accessories, fittings — Segregate by type for recycling</li>
              <li><strong>Steel offcuts:</strong> Containment, supports — Scrap metal recycling</li>
              <li><strong>WEEE:</strong> Replaced equipment — Licensed WEEE contractor</li>
            </ul>
            <p><strong>Documentation tip:</strong> Maintain waste transfer notes for all movements off site. Photograph segregated waste storage areas for BREEAM evidence submissions.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Operational Waste and Circular Economy">
            <p>Wst 02 (Operational Waste) addresses the provision of facilities for waste segregation and recycling during building occupation. Circular economy principles extend this thinking to consider how MEP materials can be designed for disassembly, reuse, and recovery at end of building life.</p>
            <p><strong>Wst 02 Operational Waste Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Dedicated space for recyclable waste storage (sized to building occupancy)</li>
              <li>Segregated bins/containers for minimum waste streams (paper, glass, plastic, metals)</li>
              <li>Accessible collection points on each occupied floor</li>
              <li>Adequate lighting and ventilation to waste storage areas</li>
              <li>Clear signage and user guidance</li>
              <li>Consideration of composting facilities for organic waste</li>
            </ul>
            <p><strong>Circular Economy Principles for MEP</strong></p>
            <p><strong>Design for Disassembly</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>- Mechanical fixings over adhesives</li>
              <li>- Modular, replaceable components</li>
              <li>- Accessible connections</li>
              <li>- Documented material locations</li>
              <li>- Standard sizes and fittings</li>
            </ul>
            <p><strong>Material Recovery Potential</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>- Copper: Infinitely recyclable</li>
              <li>- Steel: High recycling rates</li>
              <li>- Aluminium: Full recyclability</li>
              <li>- Equipment: Refurbishment potential</li>
              <li>- Plastics: Type segregation needed</li>
            </ul>
            <p><strong>MEP Circular Economy Strategies</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Specify recycled content:</strong> Recycled copper cables, steel — Reduces virgin material demand</li>
              <li><strong>Modular distribution:</strong> Plug-and-play wiring systems — Enables reconfiguration and reuse</li>
              <li><strong>Equipment leasing:</strong> Lighting as a service — Manufacturer retains ownership/recovery</li>
              <li><strong>Material passports:</strong> BIM-based material tracking — Enables future recovery planning</li>
              <li><strong>Standardisation:</strong> Common component sizes — Facilitates spare parts and reuse</li>
            </ul>
            <p><strong>Material Passport Example - Distribution Board</strong></p>
            <p><strong>Asset:</strong> DB-L2-01 (Level 2 Main Distribution Board)</p>
            <p><strong>Manufacturer:</strong> [Supplier name], Model: [Model reference]</p>
            <p><strong>Materials:</strong> Steel enclosure (22kg, galvanised), Copper busbars (8kg), MCCB/MCB units (15 units)</p>
            <p><strong>Recycled content:</strong> Steel 45% post-consumer, Copper 30% recycled</p>
            <p><strong>Disassembly:</strong> Bolted connections, accessible from front, no adhesives</p>
            <p><strong>End of life:</strong> Steel/copper fully recyclable, MCBs to WEEE recovery</p>
            <p><strong>Certifications:</strong> Steel - BES 6001 Very Good, Copper - Copper Mark</p>
            <p><strong>Future-proofing:</strong> Design flexibility into MEP systems to accommodate future technology changes without complete replacement, extending useful life and deferring material consumption.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: EPD Comparison for Cable Selection</strong>
            </p>
            <p><strong>Scenario:</strong> Compare two cable suppliers for 100m of 4-core 16mm2 armoured cable based on EPD data.</p>
            <p>Supplier A EPD (per 100m cable):</p>
            <p>GWP (A1-A3): 245 kg CO2eq</p>
            <p>Recycled copper content: 25%</p>
            <p>BES 6001 certification: Good</p>
            <p>Supplier B EPD (per 100m cable):</p>
            <p>GWP (A1-A3): 198 kg CO2eq</p>
            <p>Recycled copper content: 45%</p>
            <p>BES 6001 certification: Very Good</p>
            <p>Recommendation: Supplier B offers 19% lower embodied carbon,</p>
            <p>higher recycled content, and better responsible sourcing tier</p>
            <p>
              <strong>Example 2: Construction Waste Forecast</strong>
            </p>
            <p><strong>Scenario:</strong> Forecast MEP waste for 5,000m2 office fit-out and set diversion targets.</p>
            <p>Forecast waste by type:</p>
            <p>Copper cable offcuts: 150 kg → 100% recycling</p>
            <p>Steel containment offcuts: 400 kg → 100% recycling</p>
            <p>Cardboard packaging: 600 kg → 100% recycling</p>
            <p>Plastic packaging: 200 kg → 80% recycling</p>
            <p>Cable drums: 50 units → 100% return to supplier</p>
            <p>Mixed non-recyclable: 100 kg → Energy from waste</p>
            <p>Total forecast: 1,450 kg + drums</p>
            <p>Target diversion from landfill: 95%</p>
            <p>Achieved by: Metal recycling, cardboard baling, drum returns</p>
            <p>
              <strong>Example 3: Circular Economy Design Decision</strong>
            </p>
            <p><strong>Scenario:</strong> Design lighting installation for future adaptability and end-of-life recovery.</p>
            <p>Traditional approach:</p>
            <p>- Recessed fittings with plaster-in frames</p>
            <p>- Hardwired connections</p>
            <p>- Fixed ceiling grid</p>
            <p>End of life: Difficult recovery, damaged removal</p>
            <p>Circular economy approach:</p>
            <p>- Clip-in suspended fittings</p>
            <p>- Plug-and-play wiring (e.g., Wieland connectors)</p>
            <p>- Accessible ceiling system</p>
            <p>End of life: Intact removal, reuse potential</p>
            <p>Additional benefit: Easy reconfiguration during tenancy changes</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Mat 01 Implementation Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Identify major material quantities from design specifications</li>
              <li>Request EPDs from manufacturers during procurement</li>
              <li>Verify EPDs are EN 15804 compliant and cover A1-A3 minimum</li>
              <li>Calculate building-level environmental impacts using approved tool</li>
              <li>Document specification improvements based on LCA comparison</li>
              <li>Retain all EPDs and calculations for BREEAM submission</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Wst 01 minimum diversion: <strong>70% from landfill</strong></li>
              <li>Best practice diversion: <strong>95% from landfill</strong></li>
              <li>Mat 03 top tier: <strong>BES 6001 or equivalent third-party certification</strong></li>
              <li>EPD standard: <strong>EN 15804</strong></li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Late EPD requests</strong> - Request EPDs at tender stage, not after installation</li>
                <li><strong>Incomplete waste records</strong> - Ensure all waste movements have transfer notes</li>
                <li><strong>Mixed waste skips</strong> - Segregation is essential for recycling credits</li>
                <li><strong>Ignoring packaging</strong> - Packaging waste can exceed installation waste</li>
              </ul>
            }
            doInstead="Cross-check assumptions against published guidance, validate measured values against design intent, and engage the wider team early when interface issues emerge."
          />

          <SectionRule />

          <Scenario
            title="Steel frame substituted from BES 6001 to non-certified supplier"
            situation={
              <>
                During value engineering, the steel frame supplier was changed from a BES 6001-certified mill to a non-certified one for a £35k saving. The Mat 03 credit budgeted on the original supplier is now lost — and dropping it cascades the rating from Excellent to Very Good, breaching the planning condition.
              </>
            }
            whatToDo={
              <>
                Reverse the substitution if at all possible — the £35k saving has now caused planning re-application risk worth multiples of that. If reversal is not commercially viable, look for replacement Mat 03 wins on other packages (responsibly sourced concrete, masonry, timber). If insufficient, downgrade and seek a planning variation. Lesson: every value engineering change on a BREEAM project must go through the Assessor for credit-impact assessment before it is approved.
              </>
            }
            whyItMatters={
              <>
                BREEAM and value engineering are not friends. Cost-out exercises late in design routinely strip credits the team thought were locked. Build a no-substitution clause into BREEAM-critical packages, or require Assessor approval for any change. The procurement specification is the BREEAM specification.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Mat 01: life-cycle impacts via Green Guide / IMPACT.",
              "Mat 03: BES 6001 responsible sourcing — applies to concrete, steel, timber, masonry.",
              "Mat 05: durability and protection of building fabric (impact-resistant linings, dado rails etc.).",
              "Wst 01: SWMP + ≥70% diversion from landfill — monthly reporting required.",
              "Wst 02: recycled aggregates ≥25% by mass for high-grade applications.",
              "Wst 03: operational waste storage facilities sized per occupancy.",
              "Value engineering substitutions destroy credits — every change needs Assessor approval.",
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section3-3")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Energy category
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section3-5")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Health and wellbeing
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule6Section3_4;
