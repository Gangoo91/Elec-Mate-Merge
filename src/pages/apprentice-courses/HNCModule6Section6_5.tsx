/**
 * Module 6 · Section 6 · Subsection 5 — Circular Economy Principles
 * HNC Electrical Engineering for Building Services (Sustainability and Environmental Engineering)
 *   Design for disassembly, material passports, reuse strategies, and waste elimination in building services
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

const TITLE = 'Circular Economy Principles - HNC Module 6 Section 6.5';
const DESCRIPTION =
  'Master circular economy principles for building services: design for disassembly, material passports, component reuse strategies, modular design, lease models, and end-of-life planning for sustainable electrical installations.';

const quickCheckQuestions = [
  {
    id: 'circular-definition',
    question: 'What is the fundamental principle of a circular economy?',
    options: [
      'Light switch disconnects neutral instead of line',
      'Indirect emissions from purchased electricity, heat, and steam',
      'Eliminating waste through continuous reuse of materials and products',
      'The safety function is still performed despite the fault',
    ],
    correctIndex: 2,
    explanation:
      'A circular economy aims to eliminate waste and pollution by keeping products and materials in use for as long as possible, regenerating natural systems rather than following a linear take-make-dispose model.',
  },
  {
    id: 'design-disassembly',
    question: 'What is the primary goal of design for disassembly (DfD)?',
    options: [
      'Details of activities, dates, and learning outcomes',
      'Mental health problems are a sign of personal weakness',
      'Enabling components to be separated and reused at end of life',
      'Require contraventions to be remedied within a specified time',
    ],
    correctIndex: 2,
    explanation:
      'Design for disassembly ensures that building components can be easily separated, recovered, and reused or recycled at end of life, rather than being demolished and sent to landfill.',
  },
  {
    id: 'material-passport',
    question: 'What information does a material passport typically contain?',
    options: [
      'Wrong detector type (ionisation) for the location',
      'Composition, origin, environmental data, and end-of-life instructions',
      'Cable route coordination, power supply planning, and interface requirements',
      'May have marginally higher initial costs but reduces whole-life costs',
    ],
    correctIndex: 1,
    explanation:
      'Material passports document the composition, origin, environmental impact, maintenance requirements, and end-of-life instructions for building components, enabling informed decisions about reuse and recycling.',
  },
  {
    id: 'lease-model',
    question:
      'In a lighting-as-a-service lease model, who typically retains ownership of the luminaires?',
    options: [
      'The building owner',
      'The service provider/manufacturer',
      'The facilities management company',
      'The electrical contractor',
    ],
    correctIndex: 1,
    explanation:
      'In product-as-a-service models, the manufacturer or service provider retains ownership of the equipment, incentivising them to design for durability, repairability, and end-of-life recovery.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which of the following best describes the circular economy approach compared to linear economy?',
    options: [
      'High cost versus low cost production',
      'Take-make-dispose versus take-make-reuse-recycle',
      'Manual versus automated manufacturing',
      'Local versus global supply chains',
    ],
    correctAnswer: 1,
    explanation:
      'The linear economy follows a take-make-dispose model where resources become waste. The circular economy eliminates waste through continuous cycles of reuse, repair, remanufacture, and recycling.',
  },
  {
    id: 2,
    question:
      'What percentage of construction and demolition waste in the UK could potentially be reused or recycled with proper circular design?',
    options: [
      '70-80%',
      '30-40%',
      '90% or more',
      '50-60%',
    ],
    correctAnswer: 2,
    explanation:
      'Studies indicate that over 90% of construction and demolition waste could be reused or recycled with proper circular design principles, yet current rates are much lower due to linear design approaches.',
  },
  {
    id: 3,
    question:
      'Which connection type best supports design for disassembly in electrical installations?',
    options: [
      'Any fault that creates risk of shock, fire, or burns',
      'To prevent damage during earthquakes',
      'When inductive reactance equals capacitive reactance',
      'Mechanical fasteners and plug-in connections',
    ],
    correctAnswer: 3,
    explanation:
      'Mechanical fasteners (bolts, clips, clamps) and plug-in connections allow components to be separated without damage, enabling reuse. Welding, adhesives, and encasement prevent non-destructive separation.',
  },
  {
    id: 4,
    question: 'A material passport for a distribution board should include:',
    options: [
      'Component materials, manufacturer data, disassembly instructions, and recycling guidance',
      'Using reclaimed and refurbished components where standards permit',
      'Linear supply chains and contractual arrangements favouring new products',
      'May have marginally higher initial costs but reduces whole-life costs',
    ],
    correctAnswer: 0,
    explanation:
      'Material passports comprehensively document component materials, manufacturer information, expected lifespan, maintenance requirements, disassembly procedures, and recycling or disposal guidance.',
  },
  {
    id: 5,
    question: 'What is modular design in the context of circular economy for building services?',
    options: [
      'Prevention, reuse, recycling, recovery, then disposal as last resort',
      'Using standardised, interchangeable components that can be upgraded or replaced independently',
      'Risk of equipment failure, maintenance responsibility, and end-of-life disposal',
      'Component materials, manufacturer data, disassembly instructions, and recycling guidance',
    ],
    correctAnswer: 1,
    explanation:
      'Modular design uses standardised, interchangeable components allowing individual elements to be upgraded, repaired, or replaced without affecting the entire system, extending overall service life.',
  },
  {
    id: 6,
    question:
      'In a product-as-a-service model for building services, what shifts from the client to the provider?',
    options: [
      'Accessible trunking and containment systems with mechanical fixings',
      'Using standardised, interchangeable components that can be upgraded or replaced independently',
      'Risk of equipment failure, maintenance responsibility, and end-of-life disposal',
      'May have marginally higher initial costs but reduces whole-life costs',
    ],
    correctAnswer: 2,
    explanation:
      'Product-as-a-service shifts equipment ownership, maintenance responsibility, performance risk, and end-of-life disposal to the provider, who is then incentivised to maximise equipment longevity and recovery.',
  },
  {
    id: 7,
    question: 'Which strategy reduces the need for new raw materials in electrical installations?',
    options: [
      'Installing larger cables than required',
      'Avoiding maintenance to reduce interventions',
      'Specifying the newest equipment only',
      'Using reclaimed and refurbished components where standards permit',
    ],
    correctAnswer: 3,
    explanation:
      'Reclaimed and refurbished components reduce demand for virgin materials. Many electrical components like containment, some luminaires, and switchgear can be refurbished to meet required standards.',
  },
  {
    id: 8,
    question:
      'What is the primary barrier to implementing circular economy principles in UK electrical installations?',
    options: [
      'Linear supply chains and contractual arrangements favouring new products',
      'May have marginally higher initial costs but reduces whole-life costs',
      'Risk of equipment failure, maintenance responsibility, and end-of-life disposal',
      'Component materials, manufacturer data, disassembly instructions, and recycling guidance',
    ],
    correctAnswer: 0,
    explanation:
      'Traditional procurement, contractual arrangements, and supply chains are designed around new products. Shifting to circular models requires changes in contracts, warranties, and business relationships.',
  },
  {
    id: 9,
    question: 'How does design for disassembly affect initial installation costs?',
    options: [
      'Accessible trunking and containment systems with mechanical fixings',
      'May have marginally higher initial costs but reduces whole-life costs',
      'Risk of equipment failure, maintenance responsibility, and end-of-life disposal',
      'Component materials, manufacturer data, disassembly instructions, and recycling guidance',
    ],
    correctAnswer: 1,
    explanation:
      'DfD may have slightly higher initial costs due to accessible fixings and connections, but these are offset by reduced maintenance costs, easier upgrades, and significant end-of-life value recovery.',
  },
  {
    id: 10,
    question: 'What role does BIM play in supporting circular economy for building services?',
    options: [
      'Risk of equipment failure, maintenance responsibility, and end-of-life disposal',
      'Using reclaimed and refurbished components where standards permit',
      'Storing material passport data and tracking component lifecycles',
      'Accessible trunking and containment systems with mechanical fixings',
    ],
    correctAnswer: 2,
    explanation:
      'BIM can store material passport information, track component age and condition, schedule maintenance, and provide data for end-of-life decisions, making it a key enabler for circular building services.',
  },
  {
    id: 11,
    question: 'Which approach to cable management best supports circular economy principles?',
    options: [
      'Prevention, reuse, recycling, recovery, then disposal as last resort',
      'Risk of equipment failure, maintenance responsibility, and end-of-life disposal',
      'Using reclaimed and refurbished components where standards permit',
      'Accessible trunking and containment systems with mechanical fixings',
    ],
    correctAnswer: 3,
    explanation:
      'Accessible containment with mechanical fixings allows cables to be recovered, containment reused, and routes modified without destructive removal. This contrasts with embedded or clipped installations.',
  },
  {
    id: 12,
    question: "What does 'waste hierarchy' prioritise in circular economy thinking?",
    options: [
      'Prevention, reuse, recycling, recovery, then disposal as last resort',
      'May have marginally higher initial costs but reduces whole-life costs',
      'Accessible trunking and containment systems with mechanical fixings',
      'Linear supply chains and contractual arrangements favouring new products',
    ],
    correctAnswer: 0,
    explanation:
      'The waste hierarchy prioritises prevention (not creating waste), then reuse, recycling, energy recovery, and finally disposal. Circular economy aims to operate at the top of this hierarchy.',
  },
];

const faqs = [
  {
    question: 'Can reclaimed electrical components be used legally in UK installations?',
    answer:
      'Yes, with conditions. Reclaimed components must meet current standards and regulations. Items like cable tray, trunking, and some luminaires can often be reused after inspection. However, safety-critical items like consumer units, RCDs, and protective devices typically require certification that they meet current standards. Always verify compliance with BS 7671 and relevant product standards before reusing components.',
  },
  {
    question: 'How do material passports differ from O&M manuals?',
    answer:
      "Material passports go beyond traditional O&M documentation. While O&M manuals focus on operation and maintenance during the building's life, material passports include detailed composition data (materials, chemicals, recyclability), environmental impact information, expected lifespan, and crucially, end-of-life instructions for disassembly, component recovery, and material recycling or safe disposal.",
  },
  {
    question: 'What is the business case for circular design in building services?',
    answer:
      'Circular design offers multiple benefits: reduced whole-life costs through easier maintenance and component replacement, potential revenue from recovered materials at end of life, reduced waste disposal costs, improved sustainability credentials for BREEAM/LEED ratings, future-proofing against resource scarcity and disposal regulations, and alignment with growing client demands for sustainable buildings.',
  },
  {
    question: 'How does lighting-as-a-service work in practice?',
    answer:
      'In lighting-as-a-service, clients pay a monthly fee for illumination rather than purchasing luminaires. The provider designs, installs, maintains, and eventually recovers the lighting system. They retain ownership and are responsible for performance, repairs, upgrades, and end-of-life recycling. This incentivises providers to specify durable, efficient, and recoverable equipment.',
  },
  {
    question: 'What skills do electricians need for circular economy installations?',
    answer:
      'Electricians benefit from understanding: design for disassembly principles and techniques, material identification for recycling, refurbishment assessment skills, digital documentation and BIM basics, product-as-a-service contractual models, and component testing and certification for reuse. These complement traditional installation skills.',
  },
  {
    question: 'How do BREEAM and other rating systems address circular economy?',
    answer:
      'BREEAM includes credits for design for disassembly, material efficiency, responsible sourcing, and waste management. Recent versions increasingly reward circular economy approaches including material passports, modular construction, and designing for adaptability. LEED and other systems similarly include circularity-related credits.',
  },
];

const HNCModule6Section6_5 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section6")}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 6 · Section 6 · Subsection 5"
            title="Circular Economy Principles"
            description="Design for disassembly, material passports, reuse strategies, and waste elimination in building services"
            tone="purple"
          />

          <TLDR
            points={[
              "Circular economy designs out waste — products, components and materials are kept at their highest value through reuse, refurbishment, remanufacture, recycling, and (last resort) recovery.",
              "For buildings, this means design for disassembly, material passports tracking what is in the building and where, modular and demountable construction, and product-as-service models for major plant (lighting-as-service, lifts-as-service).",
              "BS 8895 (Designing out Waste in Buildings) and the GLA Circular Economy Statement (London Plan major schemes) are the UK institutional drivers.",
            ]}
          />

          <RegsCallout
            source="GLA Circular Economy Statement Guidance + BS 8895 Designing out Waste in Buildings"
            clause="A Circular Economy Statement shall be required for all referable applications and shall demonstrate how the proposal will: retain existing buildings and infrastructure where feasible; design new buildings for adaptability, longevity, deconstruction and disassembly; specify materials with high recycled content and from responsible sources; minimise construction waste with a target of at least 95% diversion from landfill; and include a strategy for material reuse and recycling at end-of-life."
            meaning={
              <>
                GLA Circular Economy Statements are mandatory for London major referable schemes. The 95% landfill diversion target exceeds typical SWMP performance. End-of-life strategy (deconstruction plan, material passport) is increasingly required at planning stage. BS 8895 provides the methodology — design for disassembly, modularity, and reuse from concept stage.
              </>
            }
            cite="Source: GLA London Plan 2021 Policy SI7 + Circular Economy Statement Guidance (2022) — london.gov.uk; BS 8895 (2015) — bsigroup.com"
          />

          <LearningOutcomes
            outcomes={[
              "Apply circular economy principles to building services design",
              "Implement design for disassembly strategies in electrical installations",
              "Create and use material passports for component tracking",
              "Evaluate modular design approaches for MEP systems",
              "Compare lease versus purchase models for building services",
              "Develop end-of-life planning strategies for electrical installations",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Circular Economy Fundamentals">
            <p>The circular economy represents a fundamental shift from the traditional linear model of take-make-dispose to a regenerative system where materials and products remain in use for as long as possible. For building services, this means designing installations that can be maintained, upgraded, recovered, and reused rather than demolished and landfilled.</p>
            <p><strong>Core circular economy principles:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Design out waste:</strong> Eliminate waste and pollution from the outset</li>
              <li><strong>Keep products in use:</strong> Maximise lifespan through maintenance, repair, and reuse</li>
              <li><strong>Regenerate natural systems:</strong> Return biological materials safely to the earth</li>
              <li><strong>Preserve embedded value:</strong> Retain the energy and resources invested in products</li>
            </ul>
            <p><strong>Linear vs Circular Economy Comparison</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Resource flow:</strong> Take → Make → Dispose — Reduce → Reuse → Recycle → Recover</li>
              <li><strong>Design focus:</strong> Minimum initial cost — Whole-life value and recovery</li>
              <li><strong>End of life:</strong> Demolition and landfill — Disassembly and reuse</li>
              <li><strong>Ownership model:</strong> Purchase and own — Service and lease options</li>
              <li><strong>Material value:</strong> Lost at disposal — Recovered and retained</li>
            </ul>
            <p><strong>UK Construction Waste Statistics</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>• Construction, demolition and excavation waste: approximately 62% of UK total waste</li>
              <li>• Estimated &gt;90% could be reused or recycled with circular design</li>
              <li>• Building services typically 15-20% of construction material by value</li>
              <li>• Electrical and mechanical systems have significant reuse potential</li>
            </ul>
            <p><strong>Design principle:</strong> Consider the entire lifecycle from extraction through manufacture, installation, operation, maintenance, and end-of-life when specifying building services.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Design for Disassembly">
            <p>Design for disassembly (DfD) ensures building components can be separated and recovered at end of life without destruction. For electrical installations, this means specifying connection methods, containment systems, and equipment that facilitate non-destructive removal and reuse.</p>
            <p><strong>Connection Strategies</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Mechanical fixings over adhesives</li>
              <li>Bolted joints over welded</li>
              <li>Plug-in connections where possible</li>
              <li>Accessible fasteners</li>
            </ul>
            <p><strong>Containment Design</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Surface-mounted trunking</li>
              <li>Removable covers and lids</li>
              <li>Channel systems with clips</li>
              <li>Avoid embedded conduit</li>
            </ul>
            <p><strong>Equipment Selection</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Modular switchgear</li>
              <li>Plug-in busbar systems</li>
              <li>Track-mounted luminaires</li>
              <li>Standardised components</li>
            </ul>
            <p><strong>DfD Strategies for Electrical Installations</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Cable containment:</strong> Cast into screed, clipped direct — Surface trunking, accessible trays</li>
              <li><strong>Distribution boards:</strong> Flush-mounted, plastered around — Surface-mounted, bolted fixings</li>
              <li><strong>Lighting:</strong> Recessed with fixed connections — Track or plug-in systems</li>
              <li><strong>Final circuits:</strong> Hard-wired throughout — Prefabricated wiring, connectors</li>
              <li><strong>Busbar systems:</strong> Custom fabricated, bolted — Plug-in modular systems</li>
            </ul>
            <p><strong>DfD Design Checklist</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>✓ Can each component be removed independently without damaging others?</li>
              <li>✓ Are fixings accessible and of standard sizes?</li>
              <li>✓ Is disassembly sequence logical and documented?</li>
              <li>✓ Are materials compatible for recycling (no composite materials where possible)?</li>
              <li>✓ Are hazardous materials clearly identified and separable?</li>
            </ul>
            <p><strong>Best practice:</strong> Document disassembly sequences and special tool requirements as part of O&M handover to enable future recovery.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Material Passports and Documentation">
            <p>Material passports provide comprehensive documentation of building component composition, enabling informed decisions about reuse, recycling, and disposal. They go beyond traditional O&M manuals to include data essential for circular economy implementation.</p>
            <p><strong>Material Passport Contents</strong></p>
            <p><strong>Product Information</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>• Manufacturer and model details</li>
              <li>• Date of manufacture</li>
              <li>• Serial/batch numbers</li>
              <li>• Expected service life</li>
              <li>• Warranty information</li>
            </ul>
            <p><strong>Material Composition</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>• Material types and quantities</li>
              <li>• Hazardous substance content</li>
              <li>• Recyclability ratings</li>
              <li>• Embodied carbon data</li>
              <li>• Source/origin information</li>
            </ul>
            <p><strong>Material Passport Data Structure</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Identity:</strong> Unique ID, location, installation date — Tracking and inventory</li>
              <li><strong>Composition:</strong> Materials, weights, certifications — Recycling decisions</li>
              <li><strong>Environmental:</strong> Embodied carbon, EPD data — Sustainability reporting</li>
              <li><strong>Maintenance:</strong> Service history, condition, remaining life — Reuse assessment</li>
              <li><strong>End of life:</strong> Disassembly instructions, disposal guidance — Recovery planning</li>
            </ul>
            <p><strong>BIM Integration for Material Passports</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Object properties:</strong> Material data attached to BIM objects</li>
              <li><strong>Asset tagging:</strong> QR codes linking physical items to digital records</li>
              <li><strong>Lifecycle tracking:</strong> Maintenance events recorded against components</li>
              <li><strong>Quantity extraction:</strong> Automated material schedules for recovery planning</li>
              <li><strong>Interoperability:</strong> Data exchange with circular economy platforms</li>
            </ul>
            <p><strong>Example: Distribution Board Material Passport Entry</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Asset ID:</strong> DB-L2-01</li>
              <li><strong>Manufacturer:</strong> Schneider Electric</li>
              <li><strong>Model:</strong> Prisma Plus P 400A</li>
              <li><strong>Install date:</strong> 2024-03-15</li>
              <li><strong>Expected life:</strong> 25 years</li>
              <li><strong>Steel content:</strong> 45kg (recyclable)</li>
              <li><strong>Copper content:</strong> 12kg (recyclable)</li>
              <li><strong>Plastic content:</strong> 8kg (PP - recyclable)</li>
              <li><strong>Disassembly:</strong> See procedure DIS-DB-001</li>
            </ul>
            <p><strong>Integration tip:</strong> Link material passport data to building management systems to track component age, condition, and trigger end-of-life planning automatically.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Circular Business Models and End-of-Life Planning">
            <p>Circular economy implementation requires new business models that incentivise longevity, repairability, and material recovery. Product-as-a-service models shift equipment ownership to providers who benefit from designing for durability and end-of-life value.</p>
            <p><strong>Business Model Comparison</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Traditional purchase:</strong> Client owns — Low initial cost — Client disposal responsibility</li>
              <li><strong>Lease/rental:</strong> Provider owns — Provider maintains asset value — Provider recovery</li>
              <li><strong>Product-as-a-service:</strong> Provider owns — Performance and longevity — Provider reuse/recycle</li>
              <li><strong>Take-back schemes:</strong> Client owns — Recovery discount — Manufacturer recovery</li>
            </ul>
            <p><strong>Lighting-as-a-Service Benefits</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>No capital expenditure required</li>
              <li>Guaranteed light levels maintained</li>
              <li>Technology upgrades included</li>
              <li>Provider optimises for efficiency</li>
              <li>End-of-life recovery assured</li>
            </ul>
            <p><strong>End-of-Life Planning Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Component inventory and conditions</li>
              <li>Disassembly sequence documentation</li>
              <li>Reuse market identification</li>
              <li>Recycling routes for materials</li>
              <li>Hazardous material handling</li>
            </ul>
            <p><strong>Waste Hierarchy Application</strong></p>
            <p><strong>1. Prevention:</strong> Design for longevity, avoid over-specification</p>
            <p><strong>2. Reuse:</strong> Recover whole components for use elsewhere</p>
            <p><strong>3. Recycling:</strong> Separate materials for reprocessing</p>
            <p><strong>4. Recovery:</strong> Extract energy from materials that cannot be recycled</p>
            <p><strong>5. Disposal:</strong> Landfill only as absolute last resort</p>
            <p><strong>Component Reuse Potential</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Cable tray/trunking:</strong> High — Inspect for damage, clean</li>
              <li><strong>Luminaire housings:</strong> Medium-High — Replace lamps/drivers, test</li>
              <li><strong>Switchgear enclosures:</strong> Medium — Refurbishment required</li>
              <li><strong>Cables:</strong> Low-Medium — Insulation testing, length limits</li>
              <li><strong>Protective devices:</strong> Low — Standards compliance critical</li>
            </ul>
            <p><strong>Regulatory note:</strong> Reused components must comply with current standards. WEEE regulations apply to electrical equipment disposal, requiring proper handling of hazardous materials.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Office Refurbishment Circular Design</strong>
            </p>
            <p><strong>Scenario:</strong> Design electrical installation for a 10,000m² office refurbishment with circular economy principles.</p>
            <p>Circular design strategies applied:</p>
            <p>Containment system:</p>
            <p>- Surface-mounted perimeter trunking (recoverable)</p>
            <p>- Raised floor distribution boxes (accessible)</p>
            <p>- Mechanical fixings throughout (no adhesives)</p>
            <p>Lighting system:</p>
            <p>- Track-mounted LED luminaires</p>
            <p>- Lighting-as-a-service contract (5-year)</p>
            <p>- Provider responsible for upgrades and recovery</p>
            <p>Power distribution:</p>
            <p>- Plug-in busbar risers</p>
            <p>- Modular floor boxes with RJ45 power</p>
            <p>- Surface DB installation with bolted fixings</p>
            <p>Estimated 85% material recovery potential at end of life</p>
            <p>
              <strong>Example 2: Material Passport Implementation</strong>
            </p>
            <p><strong>Scenario:</strong> Create material passport system for new commercial building services.</p>
            <p>Implementation steps:</p>
            <p>1. BIM model setup:</p>
            <p>- Add material passport properties to object templates</p>
            <p>- Create custom parameters for circular data</p>
            <p>2. Data collection:</p>
            <p>- Request EPDs from manufacturers</p>
            <p>- Obtain material composition declarations</p>
            <p>- Document disassembly procedures</p>
            <p>3. Physical tagging:</p>
            <p>- QR codes on major components</p>
            <p>- Links to digital records</p>
            <p>4. Handover:</p>
            <p>- Export material schedules</p>
            <p>- Integrate with FM system</p>
            <p>- Train facilities team</p>
            <p>
              <strong>Example 3: End-of-Life Value Calculation</strong>
            </p>
            <p><strong>Scenario:</strong> Estimate recovery value for electrical installation in building due for demolition.</p>
            <p>Component inventory and values:</p>
            <p>Cable tray (galvanised steel): 2,500kg</p>
            <p>- Condition: Good, reusable</p>
            <p>- Reuse value: £3,500</p>
            <p>- Scrap value: £1,250</p>
            <p>Copper cables: 1,800kg</p>
            <p>- Recycling value: £9,000 (at £5/kg)</p>
            <p>LED luminaires (500 units):</p>
            <p>- Condition: Functional, 4 years old</p>
            <p>- Reuse value: £25,000</p>
            <p>- Recycling value: £2,500</p>
            <p>Total potential recovery:</p>
            <p>Optimised (DfD): £37,500</p>
            <p>Demolition (linear): £12,750</p>
            <p>Circular approach benefit: £24,750</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Circular Design Specification Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Specify mechanical fixings over adhesives and welding where practical</li>
              <li>Require accessible containment systems with removable covers</li>
              <li>Include material passport data requirements in specifications</li>
              <li>Consider product-as-a-service options for suitable systems</li>
              <li>Request manufacturer take-back commitments</li>
              <li>Document disassembly procedures in O&M manuals</li>
            </ul>
            <p>
              <strong>Key Circular Economy Metrics:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Material recovery rate: <strong>&gt;90% target</strong></li>
              <li>Recycled content: Track percentage by value and weight</li>
              <li>Disassembly time: Measure vs traditional demolition</li>
              <li>Reuse value: Calculate potential end-of-life recovery</li>
            </ul>
            <p>
              <strong>Common Barriers to Address:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Initial cost focus:</strong> Present whole-life cost case including recovery value</li>
              <li><strong>Standards compliance:</strong> Ensure reclaimed items meet current regulations</li>
              <li><strong>Supply chain:</strong> Develop relationships with recovery and reuse providers</li>
              <li><strong>Warranties:</strong> Negotiate appropriate terms for circular products</li>
            </ul>
          </ConceptBlock>

          <Scenario
            title="Refurbishment switchgear destined for landfill diverted to reuse market"
            situation={
              <>
                A 1990s office is being refurbished. The design team had specified disposal of all existing electrical switchgear (3 × 1,250 A LV panels, 12 distribution boards) as waste, replacing with new. The Circular Economy Statement requires material reuse strategy. Initial estimate: 8 tonnes of electrical equipment to landfill.
              </>
            }
            whatToDo={
              <>
                Engage a switchgear refurbishment specialist (e.g. Spark Switchgear, Henley Electrical) for technical assessment. Most LV panels of this age are refurbishable to current BS EN 61439 standards: replace ACBs with current types, refurbish busbars, re-test, re-certify. Cost typically 30–50% of new with 60–80% embodied carbon saving. Where panels cannot be refurbished, donate to circular-economy marketplaces (e.g. Globechain, Construction Reuse Network) for use in lower-tier applications. Document for the CE Statement.
              </>
            }
            whyItMatters={
              <>
                Construction waste is 60% of total UK waste by mass. M&E equipment is high-value, high-embodied-carbon — the highest-priority candidate for reuse. The barrier is rarely technical (refurbishment standards exist) but commercial (warranty, liability, supply chain). Circular Economy Statements force the conversation; the technical and commercial frameworks are catching up.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Circular hierarchy: reuse > refurbish > remanufacture > recycle > recover > dispose.",
              "BS 8895 = designing out waste in buildings (UK standard).",
              "GLA Circular Economy Statements mandatory for London major referable schemes.",
              "Material passports track what is in the building and where.",
              "Design for disassembly = mechanical fixings, modular components, accessible joints.",
              "Product-as-service = lighting, lifts, HVAC supplied as service not product.",
              "M&E equipment is high-priority for reuse — high value, high embodied carbon.",
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section6-4")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Whole life carbon assessment
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section6-6")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Post-occupancy evaluation
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule6Section6_5;
