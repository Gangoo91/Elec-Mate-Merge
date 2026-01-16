import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { useSEO } from '@/hooks/useSEO';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Zap,
  AlertTriangle,
  Shield,
  Building2,
  Gauge,
  FileText,
  Lock,
  Settings
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const IndustrialElectricalModule1Section2: React.FC = () => {
  const navigate = useNavigate();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);

  useSEO({
    title: 'HV/LV Separation and Transformer Overview | Industrial Electrical Module 1 Section 2',
    description: 'Learn about high voltage and low voltage separation, transformer principles, substation layouts, and safety requirements in UK industrial electrical systems. Covers 11kV/400V systems, DNO responsibilities, and Electricity at Work Regulations 1989.',
    keywords: [
      'HV LV separation',
      'high voltage low voltage',
      'transformer types',
      'substation layout',
      'UK voltage levels',
      '11kV 400V systems',
      'electrical safety clearances',
      'DNO responsibilities',
      'Electricity at Work Regulations',
      'industrial electrical training'
    ]
  });

  const quickCheckQuestions = [
    {
      id: 'hvlv-q1',
      question: 'In the UK, at what voltage level does a supply become classified as High Voltage (HV)?',
      options: [
        'Above 230V AC',
        'Above 400V AC',
        'Above 1000V AC',
        'Above 3300V AC'
      ],
      correctIndex: 2,
      explanation: 'According to UK regulations and BS 7671, High Voltage (HV) is defined as any voltage exceeding 1000V AC or 1500V DC. This threshold determines the additional safety precautions, authorisation requirements, and equipment specifications needed for working with HV systems.'
    },
    {
      id: 'hvlv-q2',
      question: 'What is the primary purpose of transformer oil in an oil-filled transformer?',
      options: [
        'To increase the transformer efficiency',
        'To provide insulation and cooling',
        'To reduce electromagnetic interference',
        'To prevent rust on the windings'
      ],
      correctIndex: 1,
      explanation: 'Transformer oil serves two critical functions: electrical insulation between windings and the tank, and heat dissipation through natural or forced circulation. The oil absorbs heat from the windings and core, transferring it to the tank walls or external radiators for cooling.'
    },
    {
      id: 'hvlv-q3',
      question: 'Who is typically responsible for maintaining the 11kV network up to and including the transformer in a standard commercial installation?',
      options: [
        'The building owner',
        'The facilities management company',
        'The Distribution Network Operator (DNO)',
        'The Health and Safety Executive'
      ],
      correctIndex: 2,
      explanation: 'The Distribution Network Operator (DNO) owns and maintains the high voltage network up to and including their transformer in most standard arrangements. The customer\'s responsibility typically begins at the LV terminals of the transformer or at the agreed point of supply, as defined in the connection agreement.'
    }
  ];

  const quizQuestions = [
    {
      question: 'What is the standard distribution voltage used by UK DNOs to supply industrial and commercial premises?',
      options: ['3.3kV', '6.6kV', '11kV', '33kV'],
      correctAnswer: '11kV'
    },
    {
      question: 'Which type of transformer is most commonly used in indoor substations due to reduced fire risk?',
      options: ['Oil-filled transformer', 'Dry-type transformer', 'Auto-transformer', 'Instrument transformer'],
      correctAnswer: 'Dry-type transformer'
    },
    {
      question: 'What is the minimum safe approach distance for unqualified persons to exposed 11kV conductors?',
      options: ['1.0 metre', '2.0 metres', '3.0 metres', '5.0 metres'],
      correctAnswer: '3.0 metres'
    },
    {
      question: 'Under the Electricity at Work Regulations 1989, which regulation specifically addresses working on or near live conductors?',
      options: ['Regulation 4', 'Regulation 10', 'Regulation 14', 'Regulation 16'],
      correctAnswer: 'Regulation 14'
    },
    {
      question: 'What does the acronym "CT" stand for in the context of HV/LV metering arrangements?',
      options: ['Current Tap', 'Current Transformer', 'Circuit Terminal', 'Capacitor Trip'],
      correctAnswer: 'Current Transformer'
    },
    {
      question: 'In a ring main unit (RMU), what is the typical configuration?',
      options: [
        'Single circuit breaker with bus section',
        'Two switch disconnectors and one fused switch or circuit breaker',
        'Three circuit breakers in parallel',
        'Two transformers with automatic changeover'
      ],
      correctAnswer: 'Two switch disconnectors and one fused switch or circuit breaker'
    },
    {
      question: 'What colour is typically used to identify 11kV cables in the UK?',
      options: ['Red', 'Black', 'Blue', 'Orange'],
      correctAnswer: 'Black'
    },
    {
      question: 'What is the standard secondary voltage from an 11kV/LV distribution transformer in the UK?',
      options: ['230V single phase', '400V three phase', '415V three phase', '440V three phase'],
      correctAnswer: '400V three phase'
    },
    {
      question: 'Which document must be completed before accessing a substation containing HV equipment?',
      options: [
        'Risk assessment only',
        'Permit to work',
        'Method statement only',
        'Daily inspection checklist'
      ],
      correctAnswer: 'Permit to work'
    },
    {
      question: 'What is the purpose of a Buchholz relay fitted to an oil-filled transformer?',
      options: [
        'To regulate output voltage',
        'To detect internal faults and gas accumulation',
        'To measure oil temperature',
        'To control cooling fans'
      ],
      correctAnswer: 'To detect internal faults and gas accumulation'
    }
  ];

  const faqs = [
    {
      question: 'What qualifications do I need to work on HV systems in the UK?',
      answer: 'To work on HV systems, you typically need to be an Authorised Person (AP) or Senior Authorised Person (SAP) under your company\'s safety rules. This requires completion of HV training courses (such as City & Guilds 2330 or equivalent), practical experience under supervision, and formal authorisation by a competent assessor. You must also hold a current first aid certificate and be medically fit. The level of authorisation determines what tasks you can perform, from basic switching operations to complex maintenance work.'
    },
    {
      question: 'Why is the boundary between HV and LV systems so important?',
      answer: 'The HV/LV boundary is critical because it defines where responsibility changes between the DNO and customer, determines which safety rules apply, and identifies the point where voltage transformation occurs. Equipment on either side of this boundary has vastly different safety requirements, testing regimes, and maintenance protocols. Misunderstanding this boundary can lead to serious safety incidents, regulatory breaches, and electrical supply problems.'
    },
    {
      question: 'Can I enter a substation to read meters without HV authorisation?',
      answer: 'This depends on the substation design and your company\'s safety rules. Many modern substations have segregated areas where LV metering equipment is accessible without entering HV compartments. However, if meters are located within the HV area or if access requires passing near HV equipment, you will need appropriate authorisation and must follow permit-to-work procedures. Always check with your Authorised Person before entering any substation.'
    },
    {
      question: 'What is the difference between a DNO substation and a private substation?',
      answer: 'A DNO substation is owned, operated, and maintained by the Distribution Network Operator, who retains full responsibility for the HV equipment. A private (or customer) substation is owned by the customer, who takes responsibility for maintenance, testing, and operation of both HV and LV equipment. Private substations are common in large industrial facilities where the customer purchases electricity at HV rates and operates their own transformation equipment. This requires employing or contracting Authorised Persons to manage the installation.'
    },
    {
      question: 'How often should transformer oil be tested?',
      answer: 'For oil-filled transformers, oil testing frequency depends on the transformer age, loading, and criticality. As a general guide: new transformers should be tested after the first year, then every 2-3 years for the first 10 years. Older transformers (over 10 years) should be tested annually. Critical transformers may require more frequent testing. Tests include dielectric strength, moisture content, acidity, dissolved gas analysis (DGA), and PCB content. Results should be trended over time to identify developing faults.'
    },
    {
      question: 'What should I do if I discover damage to HV equipment during a site visit?',
      answer: 'If you discover damage to HV equipment: 1) Do not touch or approach the equipment closer than the safe clearance distance, 2) Evacuate the immediate area and prevent others from entering, 3) Report immediately to your Authorised Person or supervisor, 4) Contact the DNO emergency number if it\'s their equipment, 5) Document what you observed (without putting yourself at risk), 6) Remain available to provide information to the investigation team. Never attempt to repair or investigate HV damage unless you are authorised and following proper procedures.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a] text-white">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-elec-yellow mb-2">
            <Zap className="w-5 h-5" />
            <span className="text-sm font-medium">Industrial Electrical Module 1</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Section 2: HV/LV Separation and Transformer Overview
          </h1>
          <p className="text-gray-300 text-lg">
            Understanding the critical boundary between high voltage and low voltage systems,
            transformer principles, and the safety requirements that protect electrical workers
            in industrial environments.
          </p>
        </div>

        {/* Section 1: HV vs LV Definitions */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-elec-yellow font-bold">1</span>
            </div>
            <h2 className="text-2xl font-bold text-elec-yellow">HV vs LV Definitions and UK Voltage Levels</h2>
          </div>

          <div className="bg-[#242424] rounded-lg p-6 mb-6">
            <p className="mb-4">
              In the UK, the classification of electrical systems into voltage bands is fundamental
              to determining safety requirements, equipment specifications, and working practices.
              These definitions are established by British Standards and enforced through the
              Electricity at Work Regulations 1989.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-[#1a1a1a] rounded-lg p-4 border-l-4 border-green-500">
                <h3 className="font-semibold text-green-400 mb-2">Low Voltage (LV)</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>- Not exceeding 1000V AC</li>
                  <li>- Not exceeding 1500V DC</li>
                  <li>- Standard supply: 230V single phase</li>
                  <li>- Standard supply: 400V three phase</li>
                  <li>- Most common in building installations</li>
                </ul>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4 border-l-4 border-red-500">
                <h3 className="font-semibold text-red-400 mb-2">High Voltage (HV)</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>- Exceeding 1000V AC</li>
                  <li>- Exceeding 1500V DC</li>
                  <li>- Common HV levels: 3.3kV, 6.6kV, 11kV</li>
                  <li>- Distribution: 33kV, 66kV, 132kV</li>
                  <li>- Requires special authorisation</li>
                </ul>
              </div>
            </div>

            <p className="mb-4">
              The <strong className="text-elec-yellow">11kV distribution network</strong> is the most common HV
              system you will encounter in industrial settings. DNOs use this voltage level to efficiently
              distribute power across their network before stepping down to 400V for final distribution
              to customers.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <h4 className="font-semibold text-elec-yellow mb-2">UK Voltage Standards</h4>
              <p className="text-gray-300">
                The UK nominal supply voltage is 230V +10%/-6% single phase (216V to 253V) and
                400V three phase. This was harmonised with European standards in 1995, although
                in practice the supply voltage often remains close to the previous 240V standard.
                For HV systems, 11kV has a tolerance of +/-6%.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Transformer Principles */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-elec-yellow font-bold">2</span>
            </div>
            <h2 className="text-2xl font-bold text-elec-yellow">Transformer Principles and Types</h2>
          </div>

          <div className="bg-[#242424] rounded-lg p-6 mb-6">
            <p className="mb-4">
              Transformers are the critical link between HV and LV systems, using electromagnetic
              induction to step voltage up or down while maintaining power transfer efficiency
              typically exceeding 98%. Understanding their construction and operation is essential
              for anyone working in industrial electrical environments.
            </p>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Operating Principle
              </h3>
              <p className="text-gray-300 mb-4">
                A transformer consists of two or more windings wound on a common magnetic core.
                Alternating current in the primary winding creates a changing magnetic flux in
                the core, which induces a voltage in the secondary winding. The voltage ratio
                equals the turns ratio:
              </p>
              <div className="bg-[#1a1a1a] rounded-lg p-4 text-center">
                <p className="text-xl text-elec-yellow font-mono">
                  V₁/V₂ = N₁/N₂
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Primary Voltage / Secondary Voltage = Primary Turns / Secondary Turns
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="font-semibold text-blue-400 mb-3">Oil-Filled Transformers</h4>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li><strong>Cooling:</strong> Mineral oil circulation (ONAN, ONAF, OFAF)</li>
                  <li><strong>Insulation:</strong> Oil-impregnated paper</li>
                  <li><strong>Advantages:</strong> Better cooling, higher ratings possible</li>
                  <li><strong>Disadvantages:</strong> Fire risk, environmental concerns, requires bunding</li>
                  <li><strong>Typical use:</strong> Outdoor substations, large industrial loads</li>
                  <li><strong>Protection:</strong> Buchholz relay, pressure relief valve, oil temperature gauge</li>
                </ul>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="font-semibold text-orange-400 mb-3">Dry-Type Transformers</h4>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li><strong>Cooling:</strong> Air natural (AN) or air forced (AF)</li>
                  <li><strong>Insulation:</strong> Cast resin or VPI (Vacuum Pressure Impregnated)</li>
                  <li><strong>Advantages:</strong> Reduced fire risk, no oil containment needed</li>
                  <li><strong>Disadvantages:</strong> Higher cost, lower overload capacity</li>
                  <li><strong>Typical use:</strong> Indoor substations, hospitals, high-rises</li>
                  <li><strong>Protection:</strong> Temperature sensors, fan failure alarms</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 bg-[#1a1a1a] rounded-lg p-4">
              <h4 className="font-semibold text-elec-yellow mb-2">Common Transformer Ratings</h4>
              <p className="text-gray-300 text-sm mb-3">
                Standard distribution transformer ratings for 11kV/400V transformation:
              </p>
              <div className="flex flex-wrap gap-2">
                {['315 kVA', '500 kVA', '800 kVA', '1000 kVA', '1500 kVA', '2000 kVA'].map((rating) => (
                  <span key={rating} className="bg-[#242424] px-3 py-1 rounded text-elec-yellow text-sm">
                    {rating}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <InlineCheck question={quickCheckQuestions[1]} />
        </section>

        {/* Section 3: Substation Layouts */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-elec-yellow font-bold">3</span>
            </div>
            <h2 className="text-2xl font-bold text-elec-yellow">Substation Layouts and Access Restrictions</h2>
          </div>

          <div className="bg-[#242424] rounded-lg p-6 mb-6">
            <p className="mb-4">
              Substations are the interface between the HV distribution network and LV consumer
              installations. Their design must balance operational requirements with safety
              considerations, ensuring authorised personnel can work safely while preventing
              unauthorised access.
            </p>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Typical Substation Components
              </h3>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-[#1a1a1a] rounded-lg p-4">
                  <h4 className="font-semibold text-red-400 mb-2">HV Section</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>- 11kV cable terminations</li>
                    <li>- Ring Main Unit (RMU)</li>
                    <li>- HV fuses or circuit breaker</li>
                    <li>- Earth switches</li>
                    <li>- CT/VT metering</li>
                  </ul>
                </div>

                <div className="bg-[#1a1a1a] rounded-lg p-4">
                  <h4 className="font-semibold text-elec-yellow mb-2">Transformer</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>- 11kV/400V transformer</li>
                    <li>- Oil containment (if oil-filled)</li>
                    <li>- Tap changer</li>
                    <li>- Temperature indicators</li>
                    <li>- Protection relays</li>
                  </ul>
                </div>

                <div className="bg-[#1a1a1a] rounded-lg p-4">
                  <h4 className="font-semibold text-green-400 mb-2">LV Section</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>- LV distribution board</li>
                    <li>- Main incoming switch</li>
                    <li>- Metering equipment</li>
                    <li>- Outgoing ways</li>
                    <li>- Capacitor banks</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-red-400 mb-2 flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Access Control Requirements
              </h4>
              <ul className="text-gray-300 space-y-2">
                <li><strong>Physical security:</strong> Locked doors, security fencing, intruder alarms</li>
                <li><strong>Warning signage:</strong> "Danger of Death" signs on all access points</li>
                <li><strong>Authorisation:</strong> Only Authorised Persons may enter HV areas</li>
                <li><strong>Key control:</strong> HV keys held only by authorised personnel</li>
                <li><strong>Visitor procedures:</strong> Accompaniment by AP required for visitors</li>
              </ul>
            </div>

            <p className="text-gray-300">
              Many modern substations incorporate <strong className="text-elec-yellow">segregated access</strong>,
              where LV equipment and metering can be accessed through a separate compartment without
              entering the HV area. This allows routine meter reading and LV maintenance without
              requiring HV authorisation.
            </p>
          </div>
        </section>

        {/* Inline Check 1 */}
        <div className="mb-12">
          <InlineCheck question={quickCheckQuestions[0]} />
        </div>

        {/* Section 4: HV/LV Interface */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-elec-yellow font-bold">4</span>
            </div>
            <h2 className="text-2xl font-bold text-elec-yellow">HV/LV Interface and Metering Arrangements</h2>
          </div>

          <div className="bg-[#242424] rounded-lg p-6 mb-6">
            <p className="mb-4">
              The interface between HV and LV systems involves not just the physical transformer
              but also the metering arrangements that determine how electricity consumption is
              measured and billed. Understanding these arrangements is important for managing
              industrial electrical installations.
            </p>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                <Gauge className="w-5 h-5" />
                Metering Points
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-[#1a1a1a] rounded-lg p-4">
                  <h4 className="font-semibold text-blue-400 mb-2">HV Metering</h4>
                  <p className="text-gray-300 text-sm mb-3">
                    Used for large consumers purchasing electricity at HV tariffs:
                  </p>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>- Current Transformers (CTs) on HV side</li>
                    <li>- Voltage Transformers (VTs) for measurement</li>
                    <li>- Typically 11kV:110V VT ratio</li>
                    <li>- Customer responsible for transformer losses</li>
                    <li>- Lower unit rates but higher fixed charges</li>
                  </ul>
                </div>

                <div className="bg-[#1a1a1a] rounded-lg p-4">
                  <h4 className="font-semibold text-green-400 mb-2">LV Metering</h4>
                  <p className="text-gray-300 text-sm mb-3">
                    Standard arrangement for most commercial consumers:
                  </p>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>- Direct connected or CT metering</li>
                    <li>- Located after transformer</li>
                    <li>- DNO responsible for transformer</li>
                    <li>- Simpler installation and maintenance</li>
                    <li>- No separate maximum demand charges</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-elec-yellow mb-2">Current Transformer (CT) Metering</h4>
              <p className="text-gray-300 text-sm mb-3">
                For loads exceeding 100A, CT metering is typically used. Common CT ratios include:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {['100/5A', '200/5A', '400/5A', '800/5A', '1000/5A', '1500/5A', '2000/5A', '3000/5A'].map((ratio) => (
                  <span key={ratio} className="bg-[#242424] px-3 py-2 rounded text-center text-sm">
                    {ratio}
                  </span>
                ))}
              </div>
              <p className="text-gray-400 text-sm mt-3">
                CT accuracy class for billing meters is typically 0.5 or 0.2S for large consumers.
              </p>
            </div>

            <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-400 mb-2">Maximum Demand (MD) Metering</h4>
              <p className="text-gray-300 text-sm">
                HV and large LV consumers are billed based on their maximum demand, typically
                measured in kVA over 30-minute intervals. The highest MD recorded in a month
                determines the demand charge. Understanding and managing peak demand through
                load scheduling can significantly reduce electricity costs.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Safety Clearances */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-elec-yellow font-bold">5</span>
            </div>
            <h2 className="text-2xl font-bold text-elec-yellow">Safety Clearances and Exclusion Zones</h2>
          </div>

          <div className="bg-[#242424] rounded-lg p-6 mb-6">
            <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-6 h-6 text-red-400" />
                <h3 className="text-xl font-semibold text-red-400">Critical Safety Information</h3>
              </div>
              <p className="text-gray-300">
                Electrical flashover from HV systems can occur across air gaps without direct contact.
                The safe approach distances specified below are <strong>minimum requirements</strong> and
                must never be compromised. These distances are based on preventing flashover and
                providing adequate reaction time.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-elec-yellow mb-3">Minimum Safe Approach Distances</h3>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#1a1a1a]">
                      <th className="p-3 text-left text-elec-yellow">Voltage Level</th>
                      <th className="p-3 text-left text-elec-yellow">Authorised Person</th>
                      <th className="p-3 text-left text-elec-yellow">Competent Person (Escorted)</th>
                      <th className="p-3 text-left text-elec-yellow">Unqualified Person</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    <tr>
                      <td className="p-3">Up to 1kV (LV)</td>
                      <td className="p-3 text-green-400">No specific distance</td>
                      <td className="p-3 text-green-400">No specific distance</td>
                      <td className="p-3 text-yellow-400">Avoid contact</td>
                    </tr>
                    <tr>
                      <td className="p-3">3.3kV</td>
                      <td className="p-3 text-green-400">0.3m</td>
                      <td className="p-3 text-yellow-400">1.2m</td>
                      <td className="p-3 text-red-400">2.0m</td>
                    </tr>
                    <tr>
                      <td className="p-3">6.6kV</td>
                      <td className="p-3 text-green-400">0.3m</td>
                      <td className="p-3 text-yellow-400">1.2m</td>
                      <td className="p-3 text-red-400">2.4m</td>
                    </tr>
                    <tr>
                      <td className="p-3">11kV</td>
                      <td className="p-3 text-green-400">0.4m</td>
                      <td className="p-3 text-yellow-400">1.5m</td>
                      <td className="p-3 text-red-400">3.0m</td>
                    </tr>
                    <tr>
                      <td className="p-3">33kV</td>
                      <td className="p-3 text-green-400">0.7m</td>
                      <td className="p-3 text-yellow-400">2.0m</td>
                      <td className="p-3 text-red-400">4.0m</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="font-semibold text-elec-yellow mb-2">Exclusion Zone Definition</h4>
                <p className="text-gray-300 text-sm">
                  The <strong>exclusion zone</strong> is the area around live HV conductors where
                  only Authorised Persons may work, and only under strict safety procedures. This
                  zone must be clearly marked with barriers and warning signs whenever work is
                  being carried out nearby.
                </p>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="font-semibold text-elec-yellow mb-2">Working Near HV</h4>
                <p className="text-gray-300 text-sm">
                  When working near but not on HV equipment, additional controls include:
                  physical barriers, constant supervision by an Authorised Person, clear
                  identification of safe working areas, and stop-work authority for any
                  person who observes unsafe conditions.
                </p>
              </div>
            </div>

            <div className="bg-amber-900/30 border border-amber-500/50 rounded-lg p-4">
              <h4 className="font-semibold text-amber-400 mb-2">Arc Flash Hazard</h4>
              <p className="text-gray-300 text-sm">
                Beyond electrical shock, HV systems present severe arc flash hazards. An arc flash
                can produce temperatures exceeding 20,000°C, causing severe burns, blindness, and
                hearing damage. Personal protective equipment (PPE) rated for the calculated arc
                flash energy must be worn when working within the arc flash boundary.
              </p>
            </div>
          </div>

          <InlineCheck question={quickCheckQuestions[2]} />
        </section>

        {/* Section 6: DNO vs Private Responsibilities */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-elec-yellow font-bold">6</span>
            </div>
            <h2 className="text-2xl font-bold text-elec-yellow">DNO vs Private Network Responsibilities</h2>
          </div>

          <div className="bg-[#242424] rounded-lg p-6 mb-6">
            <p className="mb-4">
              Understanding the division of responsibilities between the Distribution Network
              Operator (DNO) and the customer is essential for maintaining compliance with
              regulations and ensuring safe operation of electrical systems.
            </p>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Electricity at Work Regulations 1989
              </h3>
              <p className="text-gray-300 mb-4">
                These regulations place duties on employers and employees to ensure electrical
                systems are constructed, maintained, and operated to prevent danger. Key
                regulations include:
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-[#1a1a1a] rounded-lg p-4">
                  <h4 className="font-semibold text-elec-yellow mb-2">Regulation 4</h4>
                  <p className="text-gray-300 text-sm">
                    Systems, work activities, and protective equipment must be constructed and
                    maintained to prevent danger so far as is reasonably practicable.
                  </p>
                </div>
                <div className="bg-[#1a1a1a] rounded-lg p-4">
                  <h4 className="font-semibold text-elec-yellow mb-2">Regulation 14</h4>
                  <p className="text-gray-300 text-sm">
                    No person shall work on or near live conductors unless it is unreasonable
                    to make them dead, suitable precautions are taken, and it is reasonable
                    in all circumstances to work live.
                  </p>
                </div>
                <div className="bg-[#1a1a1a] rounded-lg p-4">
                  <h4 className="font-semibold text-elec-yellow mb-2">Regulation 16</h4>
                  <p className="text-gray-300 text-sm">
                    Persons working on electrical systems must be competent to prevent danger
                    and injury, or be under appropriate supervision.
                  </p>
                </div>
                <div className="bg-[#1a1a1a] rounded-lg p-4">
                  <h4 className="font-semibold text-elec-yellow mb-2">Regulation 12</h4>
                  <p className="text-gray-300 text-sm">
                    Adequate working space, means of access, and lighting must be provided
                    for work on electrical equipment.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-[#1a1a1a] rounded-lg p-4 border-l-4 border-blue-500">
                <h4 className="font-semibold text-blue-400 mb-3">DNO Responsibilities</h4>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li><Shield className="w-4 h-4 inline mr-2 text-blue-400" />
                    Maintain HV network up to point of supply
                  </li>
                  <li><Shield className="w-4 h-4 inline mr-2 text-blue-400" />
                    Operate DNO-owned substations
                  </li>
                  <li><Shield className="w-4 h-4 inline mr-2 text-blue-400" />
                    Provide and maintain service cable/line
                  </li>
                  <li><Shield className="w-4 h-4 inline mr-2 text-blue-400" />
                    Emergency response to network faults
                  </li>
                  <li><Shield className="w-4 h-4 inline mr-2 text-blue-400" />
                    Metering installation (in most cases)
                  </li>
                  <li><Shield className="w-4 h-4 inline mr-2 text-blue-400" />
                    Network security and resilience
                  </li>
                </ul>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4 border-l-4 border-green-500">
                <h4 className="font-semibold text-green-400 mb-3">Customer Responsibilities</h4>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li><Shield className="w-4 h-4 inline mr-2 text-green-400" />
                    Maintain all equipment after point of supply
                  </li>
                  <li><Shield className="w-4 h-4 inline mr-2 text-green-400" />
                    Operate private HV equipment (if applicable)
                  </li>
                  <li><Shield className="w-4 h-4 inline mr-2 text-green-400" />
                    Employ/contract Authorised Persons
                  </li>
                  <li><Shield className="w-4 h-4 inline mr-2 text-green-400" />
                    Regular testing and maintenance
                  </li>
                  <li><Shield className="w-4 h-4 inline mr-2 text-green-400" />
                    Maintain safe access for DNO personnel
                  </li>
                  <li><Shield className="w-4 h-4 inline mr-2 text-green-400" />
                    Compliance with connection agreement
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <h4 className="font-semibold text-elec-yellow mb-2">UK Distribution Network Operators</h4>
              <div className="flex flex-wrap gap-2">
                {[
                  'UK Power Networks',
                  'Western Power Distribution',
                  'Scottish Power Energy Networks',
                  'Northern Powergrid',
                  'Electricity North West',
                  'SSE Networks'
                ].map((dno) => (
                  <span key={dno} className="bg-[#242424] px-3 py-1 rounded text-sm">
                    {dno}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-elec-yellow/20 to-elec-yellow/5 rounded-lg p-6 border border-elec-yellow/30">
            <h2 className="text-2xl font-bold text-elec-yellow mb-4 flex items-center gap-2">
              <FileText className="w-6 h-6" />
              Quick Reference Card
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-white mb-2">UK Voltage Classifications</h3>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>- LV: Up to 1000V AC / 1500V DC</li>
                  <li>- HV: Above 1000V AC / 1500V DC</li>
                  <li>- Standard LV: 230V / 400V</li>
                  <li>- Standard HV Distribution: 11kV</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-2">Key Safety Distances (11kV)</h3>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>- Authorised Person: 0.4m minimum</li>
                  <li>- Competent Person: 1.5m minimum</li>
                  <li>- Unqualified Person: 3.0m minimum</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-2">Transformer Types</h3>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>- Oil-filled: Better cooling, outdoor use</li>
                  <li>- Dry-type: Lower fire risk, indoor use</li>
                  <li>- Common ratings: 500kVA - 2000kVA</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-2">Key Regulations</h3>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>- EAW Reg 4: Safe construction</li>
                  <li>- EAW Reg 14: Live working</li>
                  <li>- EAW Reg 16: Competence</li>
                  <li>- BS 7671: Wiring Regulations</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-elec-yellow mb-6">Frequently Asked Questions</h2>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-[#242424] rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-4 text-left flex items-center justify-between min-h-[44px] touch-manipulation"
                >
                  <span className="font-medium pr-4">{faq.question}</span>
                  {expandedFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-elec-yellow flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-elec-yellow flex-shrink-0" />
                  )}
                </button>

                {expandedFAQ === index && (
                  <div className="px-4 pb-4">
                    <div className="border-t border-gray-700 pt-4">
                      <p className="text-gray-300">{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Quiz Section */}
        <section className="mb-12">
          <div className="bg-[#242424] rounded-lg p-6">
            <h2 className="text-2xl font-bold text-elec-yellow mb-4">Section Quiz</h2>
            <p className="text-gray-300 mb-6">
              Test your understanding of HV/LV separation and transformer fundamentals with this
              10-question quiz. A score of 80% or higher is recommended before progressing to
              the next section.
            </p>

            {!showQuiz ? (
              <Button
                onClick={() => setShowQuiz(true)}
                className="bg-elec-yellow text-black hover:bg-elec-yellow/90 min-h-[44px] touch-manipulation active:scale-[0.98]"
              >
                Start Quiz
              </Button>
            ) : (
              <Quiz questions={quizQuestions} />
            )}
          </div>
        </section>

        {/* Navigation */}
        <nav className="flex flex-col sm:flex-row gap-4 justify-between">
          <Button
            onClick={() => navigate('/upskilling/industrial-electrical-module-1-section-1')}
            variant="outline"
            className="flex items-center gap-2 min-h-[44px] touch-manipulation active:scale-[0.98] border-gray-600 hover:bg-gray-800"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Previous: Section 1 - Introduction to Industrial Systems</span>
          </Button>

          <Button
            onClick={() => navigate('/upskilling/industrial-electrical-module-1-section-3')}
            className="flex items-center gap-2 min-h-[44px] touch-manipulation active:scale-[0.98] bg-elec-yellow text-black hover:bg-elec-yellow/90"
          >
            <span>Next: Section 3 - Switchgear and Protection</span>
            <ChevronRight className="w-5 h-5" />
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default IndustrialElectricalModule1Section2;
