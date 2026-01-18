import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Quiz from '@/components/apprentice-courses/Quiz';
import InlineCheck from '@/components/apprentice-courses/InlineCheck';
import { useSEO } from '@/hooks/useSEO';
import {
  ArrowLeft,
  ArrowRight,
  Gauge,
  Target,
  Settings,
  Wifi,
  Building2,
  Receipt,
  AlertTriangle,
  CheckCircle2,
  Info,
  Zap,
  Cable,
  Network,
  BookOpen
} from 'lucide-react';

const EnergyEfficiencyModule5Section1: React.FC = () => {
  useSEO({
    title: 'Sub-Metering Installation Strategy | Energy Efficiency Module 5 Section 1 | Elec-Mate',
    description: 'Learn sub-metering installation strategies including CIBSE TM39 guidance, CT selection, communication protocols, BMS integration, and tenant billing for UK buildings.',
    keywords: 'sub-metering, CIBSE TM39, energy metering, CT installation, Modbus, M-Bus, BMS integration, tenant billing, ESOS compliance, MID meters'
  });

  const quickCheckQuestions = [
    {
      id: 'qc1-submetering-coverage',
      question: 'According to CIBSE TM39, what percentage of total building energy consumption should sub-metering typically cover?',
      options: ['50% minimum', '70% minimum', '90% minimum', '100% coverage'],
      correctIndex: 2,
      explanation: 'CIBSE TM39 recommends that sub-metering should cover at least 90% of the anticipated energy consumption to enable effective energy management and identify significant energy uses.'
    },
    {
      id: 'qc2-ct-accuracy',
      question: 'What CT accuracy class is typically required for tenant billing applications under MID regulations?',
      options: ['Class 3', 'Class 1', 'Class 0.5S', 'Class 5'],
      correctIndex: 1,
      explanation: 'For tenant billing and fiscal metering applications, Class 1 accuracy (or better) CTs are required under MID (Measuring Instruments Directive) regulations to ensure fair and accurate billing.'
    },
    {
      id: 'qc3-communication-protocol',
      question: 'Which communication protocol is specifically designed for utility metering and supports up to 250 devices on a single bus?',
      options: ['Modbus RTU', 'BACnet', 'M-Bus', 'KNX'],
      correctIndex: 2,
      explanation: 'M-Bus (Meter-Bus) is specifically designed for utility metering applications and can support up to 250 devices on a single two-wire bus, making it ideal for large-scale sub-metering installations.'
    }
  ];

  const quizQuestions = [
    {
      question: 'What is the primary purpose of applying the 80/20 rule when selecting sub-metering points?',
      options: [
        'To ensure 80% of meters are MID-approved',
        'To identify the 20% of loads that typically consume 80% of energy',
        'To achieve 80% accuracy in all measurements',
        'To install meters on 80% of circuits'
      ],
      correctAnswer: 'To identify the 20% of loads that typically consume 80% of energy'
    },
    {
      question: 'Which meter type MUST be used for tenant billing in multi-occupied buildings under UK regulations?',
      options: [
        'Any digital meter with display',
        'MID-approved meter with certification',
        'Standard pulse-output meter',
        'BMS-integrated meter only'
      ],
      correctAnswer: 'MID-approved meter with certification'
    },
    {
      question: 'What is the minimum CT burden rating that should be considered when calculating cable runs to the meter?',
      options: [
        'The exact burden of the connected meter',
        'The meter burden plus cable resistance losses',
        'Half the CT rated burden',
        'Double the meter burden'
      ],
      correctAnswer: 'The meter burden plus cable resistance losses'
    },
    {
      question: 'According to CIBSE TM39, which of the following should be separately sub-metered in a commercial building?',
      options: [
        'Only the main incoming supply',
        'HVAC, lighting, small power, and major process loads',
        'Just tenant areas',
        'Only loads above 100kW'
      ],
      correctAnswer: 'HVAC, lighting, small power, and major process loads'
    },
    {
      question: 'What is the maximum recommended cable length for Modbus RS485 communication in a sub-metering installation?',
      options: [
        '100 metres',
        '500 metres',
        '1200 metres',
        '2000 metres'
      ],
      correctAnswer: '1200 metres'
    },
    {
      question: 'When installing split-core CTs on existing circuits, what is the critical safety consideration?',
      options: [
        'The circuit must always be isolated first',
        'Split-core CTs cannot be used on live circuits',
        'Ensure CT secondary is never open-circuited while primary is energised',
        'Only use CTs with built-in fuses'
      ],
      correctAnswer: 'Ensure CT secondary is never open-circuited while primary is energised'
    },
    {
      question: 'For ESOS (Energy Savings Opportunity Scheme) compliance, what percentage of total energy must be covered by measurement or estimation?',
      options: [
        '70%',
        '80%',
        '90%',
        '100%'
      ],
      correctAnswer: '90%'
    },
    {
      question: 'What pulse output value is typically used for electricity sub-meters to interface with BMS systems?',
      options: [
        '1 pulse per Wh',
        '1 pulse per kWh',
        '100 pulses per kWh',
        '1000 pulses per kWh'
      ],
      correctAnswer: '1000 pulses per kWh'
    },
    {
      question: 'In a sub-metering hierarchy, what does Level 2 metering typically represent?',
      options: [
        'Main incoming utility meters',
        'Distribution board or floor-level metering',
        'Individual circuit metering',
        'Tenant billing meters only'
      ],
      correctAnswer: 'Distribution board or floor-level metering'
    },
    {
      question: 'What is the primary advantage of using M-Bus protocol over pulse outputs for sub-metering?',
      options: [
        'Lower installation cost',
        'Simpler wiring requirements',
        'Bi-directional communication enabling remote reading and diagnostics',
        'Higher accuracy measurements'
      ],
      correctAnswer: 'Bi-directional communication enabling remote reading and diagnostics'
    }
  ];

  const faqs = [
    {
      question: 'What is the difference between MID and non-MID meters, and when must MID meters be used?',
      answer: 'MID (Measuring Instruments Directive) approved meters have been tested and certified for accuracy and must be used for any fiscal or billing purposes, including tenant billing, resale of energy, and landlord-tenant cost allocation. Non-MID meters can be used for internal monitoring and energy management purposes where the readings are not used for financial transactions. MID meters carry a distinctive "M" marking and have tamper-evident seals. Using non-MID meters for billing is illegal under UK trading standards legislation.'
    },
    {
      question: 'How do I determine the correct CT ratio for a sub-metering installation?',
      answer: 'Select a CT ratio where the maximum expected current falls between 60-120% of the CT primary rating for optimal accuracy. For example, if a circuit has a maximum demand of 80A, a 100/5A CT would be appropriate. Consider future load growth when selecting, but avoid oversizing as this reduces accuracy at lower loads. Always check the meter\'s CT input compatibility and ensure the CT accuracy class matches the application requirements (Class 1 for billing, Class 3 for monitoring).'
    },
    {
      question: 'Can sub-metering data be used for Display Energy Certificates (DECs)?',
      answer: 'Yes, sub-metering data can support DEC compliance by providing accurate breakdown of energy consumption. However, the main incoming fiscal meters from the utility supplier are the primary data source for DEC calculations. Sub-metering helps identify energy waste and improvement opportunities, and can validate DEC submissions. For buildings over 1000m², sub-metering is particularly valuable for demonstrating operational improvements year-on-year.'
    },
    {
      question: 'What considerations apply when retrofitting sub-metering to existing installations?',
      answer: 'Key retrofit considerations include: available space in distribution boards for CT installation, adequacy of existing cable routes for communication wiring, switchboard isolation requirements during installation, split-core vs solid-core CT selection (split-core allows installation without cable disconnection), existing BMS infrastructure compatibility, and potential for wireless solutions where cabling is impractical. Always conduct a site survey to assess these factors before specifying equipment.'
    },
    {
      question: 'How should sub-meters be configured for accurate cost allocation in multi-tenant buildings?',
      answer: 'Accurate cost allocation requires: MID-approved meters at each tenant boundary, clear metering of landlord common areas separately, time-of-use capability if variable tariffs apply, regular meter verification and calibration records, transparent allocation methodology documented in leases, and backup calculation procedures if meter faults occur. Consider maximum demand metering for large tenants, and ensure the sum of sub-meters reconciles with main meters (allowing for distribution losses of typically 2-5%).'
    },
    {
      question: 'What are the data storage and reporting requirements for sub-metering systems?',
      answer: 'CIBSE TM39 recommends minimum 15-minute interval data logging with at least 3 years of data retention for trend analysis and ESOS reporting cycles. Data should include kWh consumption, kVA demand, power factor, and timestamps. Automatic daily backup is recommended, with secure access controls for billing data. Consider cloud-based storage for resilience and remote access, ensuring GDPR compliance for any data that could identify individual occupancy patterns.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild className="text-white hover:text-elec-yellow hover:bg-transparent p-2">
            <Link to="..">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div className="flex-1 min-w-0">
            <h1 className="text-white font-medium truncate">Sub-Metering Installation Strategy</h1>
            <p className="text-white/60 text-sm">Module 5 - Section 1</p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-8">
        {/* Quick Summary */}
        <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
          <p className="text-white/90 leading-relaxed">
            Sub-metering is essential for effective energy management in commercial and multi-tenant buildings.
            This section covers the strategic approach to sub-metering installation following CIBSE TM39 guidance,
            UK regulatory requirements including MID compliance for billing meters, and practical considerations
            for electricians working on these systems. Proper sub-metering supports ESOS compliance, enables
            accurate tenant billing, and provides the data foundation for energy efficiency improvements.
          </p>
        </div>

        {/* Section 1: Sub-metering Hierarchy */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            <Target className="w-5 h-5 text-elec-yellow" />
            Sub-Metering Hierarchy and Coverage Targets
          </h2>

          <div className="space-y-4 text-white/80">
            <p>
              CIBSE TM39 establishes a hierarchical approach to sub-metering that ensures comprehensive
              coverage while maintaining cost-effectiveness. Understanding this hierarchy is crucial for
              designing effective metering strategies.
            </p>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h3 className="text-elec-yellow font-semibold mb-3 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Metering Hierarchy Levels
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-elec-yellow text-sm font-bold">L1</span>
                  </div>
                  <div>
                    <p className="font-medium text-white">Level 1 - Main Incoming Supply</p>
                    <p className="text-sm text-white/60">Fiscal utility meters at supply point - mandatory for all buildings</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-elec-yellow text-sm font-bold">L2</span>
                  </div>
                  <div>
                    <p className="font-medium text-white">Level 2 - Distribution/Floor Level</p>
                    <p className="text-sm text-white/60">Main distribution boards, floor-level DBs, major plant rooms</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-elec-yellow text-sm font-bold">L3</span>
                  </div>
                  <div>
                    <p className="font-medium text-white">Level 3 - End Use Category</p>
                    <p className="text-sm text-white/60">HVAC, lighting, small power, lifts, major equipment</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-elec-yellow text-sm font-bold">L4</span>
                  </div>
                  <div>
                    <p className="font-medium text-white">Level 4 - Individual Circuits</p>
                    <p className="text-sm text-white/60">Individual tenant meters, specific high-consumption equipment</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-amber-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Coverage Target
              </h4>
              <p className="text-white/80">
                CIBSE TM39 recommends that sub-metering should account for at least <strong className="text-elec-yellow">90%
                of anticipated energy consumption</strong>. The remaining 10% may be calculated or estimated.
                This 90% threshold is also aligned with ESOS compliance requirements.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-4 border border-green-500/30">
                <h4 className="font-semibold text-green-400 mb-2">Minimum Metering (Typical Office)</h4>
                <ul className="text-sm space-y-1 text-white/70">
                  <li>- Main incoming supply (L1)</li>
                  <li>- HVAC systems total (L2/L3)</li>
                  <li>- Lighting circuits (L3)</li>
                  <li>- Small power/receptacles (L3)</li>
                  <li>- Lifts and escalators (L3)</li>
                  <li>- Server rooms/IT (L3)</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-blue-500/30">
                <h4 className="font-semibold text-blue-400 mb-2">Enhanced Metering (Best Practice)</h4>
                <ul className="text-sm space-y-1 text-white/70">
                  <li>- Floor-by-floor breakdown (L2)</li>
                  <li>- Individual AHU/chiller metering</li>
                  <li>- Tenant-specific metering (L4)</li>
                  <li>- Common areas separately</li>
                  <li>- Car park and external lighting</li>
                  <li>- Renewable generation</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Inline Check 1 */}
        <InlineCheck
          id={quickCheckQuestions[0].id}
          question={quickCheckQuestions[0].question}
          options={quickCheckQuestions[0].options}
          correctIndex={quickCheckQuestions[0].correctIndex}
          explanation={quickCheckQuestions[0].explanation}
        />

        {/* Section 2: Selecting Metering Points */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            <Zap className="w-5 h-5 text-elec-yellow" />
            Selecting Metering Points (80/20 Rule)
          </h2>

          <div className="space-y-4 text-white/80">
            <p>
              Strategic selection of metering points is crucial for cost-effective sub-metering. The Pareto
              principle (80/20 rule) helps prioritise metering investments where they will provide the
              greatest insight into energy consumption patterns.
            </p>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h3 className="text-elec-yellow font-semibold mb-3 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Applying the 80/20 Rule
              </h3>
              <p className="mb-3">
                In most commercial buildings, approximately <strong className="text-elec-yellow">20% of circuits
                account for 80% of energy consumption</strong>. Prioritise metering these high-consumption
                loads first:
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <p className="text-white font-medium">High Priority (Typically 70-80% of consumption):</p>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      <span className="text-white/70">Chillers and cooling plant</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      <span className="text-white/70">Air handling units</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      <span className="text-white/70">Heating systems (electric)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      <span className="text-white/70">Lighting (especially older buildings)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      <span className="text-white/70">Server rooms and data centres</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="text-white font-medium">Medium Priority (Typically 15-25%):</p>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-center gap-2">
                      <Info className="w-4 h-4 text-blue-400" />
                      <span className="text-white/70">Lifts and escalators</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Info className="w-4 h-4 text-blue-400" />
                      <span className="text-white/70">Small power circuits</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Info className="w-4 h-4 text-blue-400" />
                      <span className="text-white/70">Kitchen equipment</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Info className="w-4 h-4 text-blue-400" />
                      <span className="text-white/70">External lighting</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Info className="w-4 h-4 text-blue-400" />
                      <span className="text-white/70">Domestic hot water</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h3 className="text-elec-yellow font-semibold mb-3">Site Survey Checklist</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-white mb-2">Physical Assessment:</p>
                  <ul className="space-y-1 text-white/70">
                    <li>- Distribution board space availability</li>
                    <li>- CT mounting space around cables/busbars</li>
                    <li>- Cable route options for comms wiring</li>
                    <li>- Access for future maintenance</li>
                    <li>- Environmental conditions (temperature, dust)</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white mb-2">Electrical Assessment:</p>
                  <ul className="space-y-1 text-white/70">
                    <li>- Maximum demand on each circuit</li>
                    <li>- Cable sizes and current ratings</li>
                    <li>- Existing meter infrastructure</li>
                    <li>- Isolation switching arrangements</li>
                    <li>- Earthing and bonding provisions</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-blue-400 mb-2">Pro Tip: Metering Point Validation</h4>
              <p className="text-white/80 text-sm">
                Before finalising meter locations, verify that the sum of proposed sub-meters will account
                for at least 90% of the main incoming meter reading. Create a simple spreadsheet listing each
                proposed metering point with estimated annual kWh consumption to validate coverage.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: CT Selection and Installation */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            <Settings className="w-5 h-5 text-elec-yellow" />
            CT Selection and Installation Requirements
          </h2>

          <div className="space-y-4 text-white/80">
            <p>
              Current transformers (CTs) are fundamental to most sub-metering installations. Correct
              selection and installation is critical for measurement accuracy and system safety.
            </p>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h3 className="text-elec-yellow font-semibold mb-3 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                CT Selection Criteria
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-2 text-white">Parameter</th>
                      <th className="text-left py-2 text-white">Billing/MID</th>
                      <th className="text-left py-2 text-white">Monitoring</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/70">
                    <tr className="border-b border-white/10">
                      <td className="py-2">Accuracy Class</td>
                      <td className="py-2 text-green-400">Class 0.5S or Class 1</td>
                      <td className="py-2">Class 1 or Class 3</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2">Ratio Selection</td>
                      <td className="py-2">Max load at 100-120% of CT primary</td>
                      <td className="py-2">Max load at 60-120% of CT primary</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2">Output</td>
                      <td className="py-2">5A or 1A secondary (matched to meter)</td>
                      <td className="py-2">5A, 1A, or 333mV</td>
                    </tr>
                    <tr>
                      <td className="py-2">Burden Rating</td>
                      <td className="py-2">5VA minimum (check cable losses)</td>
                      <td className="py-2">2.5-5VA typical</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-4 border border-green-500/30">
                <h4 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
                  <Cable className="w-5 h-5" />
                  Solid-Core CTs
                </h4>
                <ul className="text-sm space-y-1 text-white/70">
                  <li>- Higher accuracy available</li>
                  <li>- More cost-effective</li>
                  <li>- Requires cable disconnection for installation</li>
                  <li>- Best for new installations</li>
                  <li>- Available in larger window sizes</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-blue-500/30">
                <h4 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                  <Cable className="w-5 h-5" />
                  Split-Core CTs
                </h4>
                <ul className="text-sm space-y-1 text-white/70">
                  <li>- Can install without disconnection</li>
                  <li>- Ideal for retrofit applications</li>
                  <li>- Higher cost per unit</li>
                  <li>- Ensure proper closure and locking</li>
                  <li>- Check accuracy after closing</li>
                </ul>
              </div>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-red-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Critical Safety Warning: CT Secondary Circuits
              </h4>
              <p className="text-white/80 text-sm mb-2">
                <strong>NEVER open-circuit a CT secondary while the primary is energised.</strong> This causes
                dangerous high voltages on the secondary terminals that can cause electric shock, burns, and
                equipment damage.
              </p>
              <ul className="text-sm text-white/70 space-y-1">
                <li>- Always short-circuit CT secondary before disconnecting meter</li>
                <li>- Use CTs with built-in shorting switches where possible</li>
                <li>- Install shorting terminal blocks for maintenance access</li>
                <li>- Label all CT circuits clearly with warnings</li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h3 className="text-elec-yellow font-semibold mb-3">CT Installation Best Practices</h3>
              <div className="space-y-2 text-sm text-white/70">
                <p>- Install CTs on all three phases - do not rely on multipliers for balanced loads</p>
                <p>- Ensure CT orientation matches current flow (P1/K to supply, P2/L to load)</p>
                <p>- Maintain minimum clearances from busbars and adjacent phases</p>
                <p>- Use screened twisted-pair cable for CT secondary connections</p>
                <p>- Calculate total burden: meter burden + cable resistance (use 0.017 ohm/m for 2.5mm² cable)</p>
                <p>- Provide cable support and strain relief - avoid tension on CT terminals</p>
                <p>- Label all CTs with circuit reference and phase identification</p>
              </div>
            </div>
          </div>
        </section>

        {/* Inline Check 2 */}
        <InlineCheck
          id={quickCheckQuestions[1].id}
          question={quickCheckQuestions[1].question}
          options={quickCheckQuestions[1].options}
          correctIndex={quickCheckQuestions[1].correctIndex}
          explanation={quickCheckQuestions[1].explanation}
        />

        {/* Section 4: Communication Protocols */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            <Wifi className="w-5 h-5 text-elec-yellow" />
            Pulse Outputs vs Modbus vs M-Bus Communication
          </h2>

          <div className="space-y-4 text-white/80">
            <p>
              Sub-meters require a means of communicating data to energy management systems or BMS.
              Understanding the strengths and limitations of each protocol is essential for system design.
            </p>

            <div className="space-y-4">
              {/* Pulse Output */}
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h3 className="text-elec-yellow font-semibold mb-3 flex items-center gap-2">
                  <Wifi className="w-5 h-5" />
                  Pulse Output
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-white font-medium mb-2">Characteristics:</p>
                    <ul className="text-sm space-y-1 text-white/70">
                      <li>- Simple, proven technology</li>
                      <li>- One-way communication only</li>
                      <li>- Typical: 1000 pulses/kWh or 100 pulses/kWh</li>
                      <li>- Requires one cable per meter</li>
                      <li>- Maximum distance: ~100m typical</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">Best Used For:</p>
                    <ul className="text-sm space-y-1 text-white/70">
                      <li>- Simple BMS integration</li>
                      <li>- Existing pulse-counting infrastructure</li>
                      <li>- Budget-constrained projects</li>
                      <li>- Small number of meters</li>
                    </ul>
                    <p className="text-red-400 text-sm mt-2">
                      Limitation: Pulses can be lost, no verification, kWh only
                    </p>
                  </div>
                </div>
              </div>

              {/* Modbus */}
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h3 className="text-elec-yellow font-semibold mb-3 flex items-center gap-2">
                  <Network className="w-5 h-5" />
                  Modbus RTU/TCP
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-white font-medium mb-2">Characteristics:</p>
                    <ul className="text-sm space-y-1 text-white/70">
                      <li>- Bi-directional communication</li>
                      <li>- RS485 (RTU): up to 32 devices, 1200m</li>
                      <li>- TCP/IP: unlimited devices via Ethernet</li>
                      <li>- Multiple parameters: kWh, kW, V, A, PF</li>
                      <li>- Industry standard protocol</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">Best Used For:</p>
                    <ul className="text-sm space-y-1 text-white/70">
                      <li>- BMS and SCADA integration</li>
                      <li>- Multi-parameter monitoring</li>
                      <li>- Existing Modbus infrastructure</li>
                      <li>- Power quality monitoring</li>
                    </ul>
                    <p className="text-green-400 text-sm mt-2">
                      Widely supported, good documentation
                    </p>
                  </div>
                </div>
                <div className="mt-3 p-3 bg-white/5 rounded border border-white/10">
                  <p className="text-sm"><strong className="text-elec-yellow">RS485 Wiring:</strong> Use shielded twisted pair,
                  terminate both ends with 120 ohm resistors, daisy-chain topology only (no star/spur connections).</p>
                </div>
              </div>

              {/* M-Bus */}
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h3 className="text-elec-yellow font-semibold mb-3 flex items-center gap-2">
                  <Network className="w-5 h-5" />
                  M-Bus (EN 13757)
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-white font-medium mb-2">Characteristics:</p>
                    <ul className="text-sm space-y-1 text-white/70">
                      <li>- Designed specifically for utility metering</li>
                      <li>- Up to 250 devices per master</li>
                      <li>- Simple 2-wire connection</li>
                      <li>- Bus-powered meters available</li>
                      <li>- Free topology (star, daisy-chain, tree)</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">Best Used For:</p>
                    <ul className="text-sm space-y-1 text-white/70">
                      <li>- Large-scale sub-metering</li>
                      <li>- Multi-utility metering (elec, gas, water)</li>
                      <li>- Remote/automatic meter reading</li>
                      <li>- New-build projects</li>
                    </ul>
                    <p className="text-blue-400 text-sm mt-2">
                      Ideal for multi-tenant buildings
                    </p>
                  </div>
                </div>
                <div className="mt-3 p-3 bg-white/5 rounded border border-white/10">
                  <p className="text-sm"><strong className="text-elec-yellow">M-Bus Masters:</strong> Required to convert
                  M-Bus to Modbus/TCP for BMS integration. Size master for total unit loads (each meter typically 1-4 units).</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h3 className="text-elec-yellow font-semibold mb-3">Protocol Comparison Summary</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-2 text-white">Feature</th>
                      <th className="text-left py-2 text-white">Pulse</th>
                      <th className="text-left py-2 text-white">Modbus</th>
                      <th className="text-left py-2 text-white">M-Bus</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/70">
                    <tr className="border-b border-white/10">
                      <td className="py-2">Devices per bus</td>
                      <td className="py-2">1</td>
                      <td className="py-2">32 (RS485)</td>
                      <td className="py-2">250</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2">Max distance</td>
                      <td className="py-2">100m</td>
                      <td className="py-2">1200m</td>
                      <td className="py-2">1000m+</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2">Data richness</td>
                      <td className="py-2">kWh only</td>
                      <td className="py-2">Multi-parameter</td>
                      <td className="py-2">Multi-parameter</td>
                    </tr>
                    <tr>
                      <td className="py-2">Complexity</td>
                      <td className="py-2 text-green-400">Low</td>
                      <td className="py-2 text-yellow-400">Medium</td>
                      <td className="py-2 text-yellow-400">Medium</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Inline Check 3 */}
        <InlineCheck
          id={quickCheckQuestions[2].id}
          question={quickCheckQuestions[2].question}
          options={quickCheckQuestions[2].options}
          correctIndex={quickCheckQuestions[2].correctIndex}
          explanation={quickCheckQuestions[2].explanation}
        />

        {/* Section 5: BMS Integration */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            <Building2 className="w-5 h-5 text-elec-yellow" />
            Integration with BMS and Energy Management Systems
          </h2>

          <div className="space-y-4 text-white/80">
            <p>
              Effective sub-metering requires seamless integration with Building Management Systems (BMS)
              and dedicated Energy Management Systems (EMS) to enable monitoring, analysis, and automated
              reporting.
            </p>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h3 className="text-elec-yellow font-semibold mb-3 flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Integration Architecture Options
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-white/5 rounded border border-white/10">
                  <p className="font-medium text-white">Option 1: Direct BMS Integration</p>
                  <p className="text-sm mt-1 text-white/70">Meters - Modbus/M-Bus - BMS Controller - Central BMS</p>
                  <p className="text-sm text-white/60 mt-1">
                    Best when BMS already exists and has capacity. Energy data stored in BMS historian.
                  </p>
                </div>
                <div className="p-3 bg-white/5 rounded border border-white/10">
                  <p className="font-medium text-white">Option 2: Dedicated Energy Gateway</p>
                  <p className="text-sm mt-1 text-white/70">Meters - Energy Gateway - BMS + Cloud EMS</p>
                  <p className="text-sm text-white/60 mt-1">
                    Gateway provides data logging, local storage, and forwards to multiple destinations.
                  </p>
                </div>
                <div className="p-3 bg-white/5 rounded border border-white/10">
                  <p className="font-medium text-white">Option 3: Cloud-Based EMS</p>
                  <p className="text-sm mt-1 text-white/70">Meters - IoT Gateway - Cloud Platform - Dashboards/Alerts</p>
                  <p className="text-sm text-white/60 mt-1">
                    Modern approach with remote access, automatic updates, and advanced analytics.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-white mb-2">Data Points to Integrate</h4>
                <ul className="text-sm space-y-1 text-white/70">
                  <li>- Total kWh (import and export)</li>
                  <li>- Instantaneous kW demand</li>
                  <li>- Maximum demand (kW and kVA)</li>
                  <li>- Voltage (per phase)</li>
                  <li>- Current (per phase)</li>
                  <li>- Power factor</li>
                  <li>- kVArh (reactive energy)</li>
                  <li>- Harmonics (THD) where relevant</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-white mb-2">Logging Requirements (CIBSE TM39)</h4>
                <ul className="text-sm space-y-1 text-white/70">
                  <li>- Interval: 15-minute minimum (half-hourly acceptable)</li>
                  <li>- Retention: 3 years minimum recommended</li>
                  <li>- Timestamp: Synchronise all meters to NTP</li>
                  <li>- Backup: Daily automatic backup</li>
                  <li>- Access: Secure with audit trail</li>
                  <li>- Export: CSV/Excel capability</li>
                </ul>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h3 className="text-elec-yellow font-semibold mb-3">Commissioning Checklist for BMS Integration</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-white mb-2">Communication Verification:</p>
                  <ul className="space-y-1 text-white/70">
                    <li>- All meters responding on bus</li>
                    <li>- Correct Modbus addresses assigned</li>
                    <li>- No communication errors/timeouts</li>
                    <li>- Data refresh rate acceptable</li>
                    <li>- Backup communication tested</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white mb-2">Data Validation:</p>
                  <ul className="space-y-1 text-white/70">
                    <li>- Reading values are sensible</li>
                    <li>- kWh accumulating correctly</li>
                    <li>- CT polarity correct (positive values)</li>
                    <li>- Timestamps aligned</li>
                    <li>- Scaling factors correct</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                ESOS Compliance Benefits
              </h4>
              <p className="text-white/80 text-sm">
                Organisations qualifying for ESOS (energy consumption above 40 GWh or employing 250+ staff)
                benefit significantly from comprehensive sub-metering. Quality metering data can reduce the
                scope and cost of ESOS audits by providing direct measurement rather than requiring estimates.
                The 90% metering coverage target aligns with ESOS significant energy consumption thresholds.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: Tenant Billing */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            <Receipt className="w-5 h-5 text-elec-yellow" />
            Metering for Tenant Billing and Cost Allocation
          </h2>

          <div className="space-y-4 text-white/80">
            <p>
              Sub-metering for tenant billing in multi-occupied buildings has specific legal and technical
              requirements. Understanding MID regulations and fair allocation principles is essential.
            </p>

            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-red-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Legal Requirement: MID Compliance
              </h4>
              <p className="text-white/80 text-sm">
                Any meter used for billing or resale of electricity <strong className="text-white">MUST</strong> be
                MID-approved (Measuring Instruments Directive 2014/32/EU, retained in UK law). Using non-MID
                meters for billing is illegal under trading standards legislation and renders invoices
                unenforceable. MID meters display the "M" certification mark and a four-digit notified body number.
              </p>
            </div>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h3 className="text-elec-yellow font-semibold mb-3 flex items-center gap-2">
                <Receipt className="w-5 h-5" />
                Tenant Billing Metering Requirements
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-white">MID-Approved Meters</p>
                    <p className="text-white/60">Class B or better accuracy, with tamper-evident seals intact</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-white">Accessible Display</p>
                    <p className="text-white/60">Tenants must be able to read their meter or receive regular statements</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-white">Clear Demarcation</p>
                    <p className="text-white/60">Each tenant area must have dedicated metering point(s)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-white">Calibration Records</p>
                    <p className="text-white/60">Maintain records of meter installation and any verification tests</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h3 className="text-elec-yellow font-semibold mb-3">Common Area and Landlord Supply Allocation</h3>
              <p className="mb-3 text-white/80">
                Energy consumed in common areas (lobbies, corridors, car parks, plant rooms) must be fairly
                allocated. Common methods include:
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="p-3 bg-white/5 rounded border border-white/10">
                  <p className="font-medium text-white text-sm">Pro-Rata by Floor Area</p>
                  <p className="text-xs text-white/60 mt-1">
                    Common costs split proportionally by NIA (Net Internal Area) of each tenancy
                  </p>
                </div>
                <div className="p-3 bg-white/5 rounded border border-white/10">
                  <p className="font-medium text-white text-sm">Pro-Rata by Metered Consumption</p>
                  <p className="text-xs text-white/60 mt-1">
                    Common costs allocated based on % of total tenant consumption
                  </p>
                </div>
                <div className="p-3 bg-white/5 rounded border border-white/10">
                  <p className="font-medium text-white text-sm">Fixed Service Charge</p>
                  <p className="text-xs text-white/60 mt-1">
                    Agreed fixed amount per tenancy for common area energy
                  </p>
                </div>
                <div className="p-3 bg-white/5 rounded border border-white/10">
                  <p className="font-medium text-white text-sm">Direct Metering</p>
                  <p className="text-xs text-white/60 mt-1">
                    Separate landlord supply meter with costs passed through service charge
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h3 className="text-elec-yellow font-semibold mb-3">Reconciliation Process</h3>
              <p className="text-sm mb-3 text-white/80">
                Regular reconciliation ensures metering accuracy and identifies issues:
              </p>
              <div className="bg-white/5 p-3 rounded border border-white/10">
                <p className="font-mono text-sm text-center text-white">
                  Main Incoming (kWh) = Sum of Tenant Meters + Common Areas + Distribution Losses
                </p>
              </div>
              <p className="text-sm mt-3 text-white/60">
                <strong className="text-white">Acceptable variance:</strong> 2-5% typically accounts for
                distribution losses and meter tolerances. Investigate variances exceeding 5% for meter
                faults, bypassing, or unmeasured loads.
              </p>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-blue-400 mb-2">Heat Network Regulations Note</h4>
              <p className="text-white/80 text-sm">
                If the building includes communal heating/cooling supplied to tenants, additional regulations
                apply under the Heat Network (Metering and Billing) Regulations 2014. Heat meters must also
                be MID-approved, and consumption information must be provided to customers at least annually
                (quarterly if remotely readable).
              </p>
            </div>
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 rounded-lg p-6 border border-elec-yellow/30">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-6 h-6 text-elec-yellow" />
            <h2 className="text-xl font-semibold text-elec-yellow">Quick Reference Card</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-white mb-2">Key Standards and Regulations</h3>
              <ul className="text-sm space-y-1 text-white/80">
                <li>- <strong className="text-elec-yellow">CIBSE TM39:</strong> Building energy metering guidance</li>
                <li>- <strong className="text-elec-yellow">MID 2014/32/EU:</strong> Billing meter requirements</li>
                <li>- <strong className="text-elec-yellow">EN 13757:</strong> M-Bus communication standard</li>
                <li>- <strong className="text-elec-yellow">BS EN 61557-12:</strong> Power metering equipment</li>
                <li>- <strong className="text-elec-yellow">ESOS:</strong> Energy Savings Opportunity Scheme</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Critical Numbers</h3>
              <ul className="text-sm space-y-1 text-white/80">
                <li>- <strong className="text-elec-yellow">90%</strong> - Minimum metering coverage target</li>
                <li>- <strong className="text-elec-yellow">Class 1</strong> - CT accuracy for billing</li>
                <li>- <strong className="text-elec-yellow">250</strong> - Max devices on M-Bus</li>
                <li>- <strong className="text-elec-yellow">1200m</strong> - Max RS485 cable length</li>
                <li>- <strong className="text-elec-yellow">15 min</strong> - Minimum logging interval</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">CT Safety Reminders</h3>
              <ul className="text-sm space-y-1 text-white/80">
                <li>- Never open-circuit energised CT secondary</li>
                <li>- Use shorting blocks for maintenance</li>
                <li>- Verify CT orientation (P1 to supply)</li>
                <li>- Calculate total burden including cables</li>
                <li>- Label all CT circuits clearly</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Billing Meter Checklist</h3>
              <ul className="text-sm space-y-1 text-white/80">
                <li>- MID "M" marking present</li>
                <li>- Seals intact and recorded</li>
                <li>- Serial number documented</li>
                <li>- Tenant access arranged</li>
                <li>- Reconciliation procedure defined</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="bg-white/5 rounded-lg p-6 border border-white/10">
          <h2 className="text-xl font-semibold text-elec-yellow mb-4">Section Quiz</h2>
          <p className="text-white/60 mb-6">
            Test your understanding of sub-metering installation strategy with this comprehensive quiz.
          </p>
          <Quiz questions={quizQuestions} moduleId="energy-efficiency-m5s1" />
        </section>

        {/* FAQs */}
        <section className="bg-white/5 rounded-lg p-6 border border-white/10">
          <h2 className="text-xl font-semibold text-elec-yellow mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-white/10 pb-4 last:border-0 last:pb-0">
                <h3 className="font-medium text-white mb-2">{faq.question}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Navigation */}
        <nav className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-white/10">
          <Button variant="outline" asChild className="min-h-[44px] touch-manipulation bg-transparent border-white/20 text-white hover:bg-white/5 hover:border-elec-yellow">
            <Link to="../../module-4">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Previous: Module 4
            </Link>
          </Button>
          <Button asChild className="min-h-[44px] touch-manipulation bg-elec-yellow text-black hover:bg-elec-yellow/90">
            <Link to="../section-2">
              Next: Section 2
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default EnergyEfficiencyModule5Section1;
