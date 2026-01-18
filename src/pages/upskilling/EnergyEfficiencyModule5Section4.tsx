import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Wifi,
  Power,
  AlertTriangle,
  Clock,
  PoundSterling,
  Shield,
  Zap,
  Server,
  ToggleRight,
  Activity,
  Building2,
  Lightbulb,
  Bookmark
} from 'lucide-react';

const EnergyEfficiencyModule5Section4: React.FC = () => {
  const navigate = useNavigate();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);

  useSEO({
    title: 'Remote Control and Load Shedding | Energy Efficiency Module 5 Section 4 | Elec-Mate',
    description: 'Learn about remote monitoring systems, load shedding strategies, UK Demand Flexibility Service, Triad avoidance, and grid revenue opportunities for electrical installations.',
    keywords: [
      'remote control',
      'load shedding',
      'demand response',
      'Demand Flexibility Service',
      'DFS',
      'Triad avoidance',
      'maximum demand',
      'STOR',
      'FFR',
      'grid services',
      'energy management',
      'UK electrician'
    ],
    canonicalUrl: '/upskilling/energy-efficiency/module-5/section-4'
  });

  const quickCheckQuestions = [
    {
      id: 'qc1-remote-load-shedding',
      question: 'During a Demand Flexibility Service (DFS) event, what is the primary goal for participating sites?',
      options: [
        'Increase electricity consumption to support the grid',
        'Reduce electricity consumption below baseline levels',
        'Switch to maximum power output',
        'Disconnect entirely from the grid'
      ],
      correctIndex: 1,
      explanation: 'The DFS rewards consumers for reducing their electricity consumption below their normal baseline during peak demand periods, helping National Grid ESO balance supply and demand without resorting to emergency measures.'
    },
    {
      id: 'qc2-remote-load-shedding',
      question: 'When implementing automated load shedding, which loads should typically be shed FIRST?',
      options: [
        'Life safety systems and emergency lighting',
        'Server rooms and data centres',
        'Non-essential lighting and HVAC in unoccupied areas',
        'Refrigeration for food storage'
      ],
      correctIndex: 2,
      explanation: 'Load shedding hierarchies prioritise maintaining life safety and critical systems. Non-essential loads like lighting and HVAC in unoccupied areas should be shed first, while emergency systems, data centres, and refrigeration typically have higher priority.'
    },
    {
      id: 'qc3-remote-load-shedding',
      question: 'What are Triad periods in the UK electricity market?',
      options: [
        'Three random days selected for grid maintenance',
        'The three highest half-hour demand periods between November and February',
        'Three-phase power balancing events',
        'Quarterly billing periods for commercial customers'
      ],
      correctIndex: 1,
      explanation: 'Triads are the three half-hour periods of highest national demand between November and February. Transmission charges for large users are based on their consumption during these periods, making Triad avoidance a significant cost-saving strategy.'
    }
  ];

  const quizQuestions = [
    {
      question: 'What communication protocol is most commonly used for industrial remote monitoring and control in UK installations?',
      options: ['Bluetooth Low Energy', 'Modbus TCP/IP or BACnet', 'NFC', 'Infrared'],
      correctAnswer: 'Modbus TCP/IP or BACnet'
    },
    {
      question: 'Under the UK Demand Flexibility Service (DFS), participants are typically rewarded based on:',
      options: [
        'Total electricity consumed during events',
        'Reduction below their calculated baseline consumption',
        'The number of events they opt into',
        'Their maximum demand capacity'
      ],
      correctAnswer: 'Reduction below their calculated baseline consumption'
    },
    {
      question: 'Which UK grid service provides payments for maintaining frequency at 50Hz through rapid power adjustments?',
      options: [
        'Demand Flexibility Service (DFS)',
        'Firm Frequency Response (FFR)',
        'Capacity Market',
        'Triad Management Service'
      ],
      correctAnswer: 'Firm Frequency Response (FFR)'
    },
    {
      question: 'When implementing remote switching for load shedding, what is the minimum safety requirement?',
      options: [
        'Verbal confirmation from site personnel',
        'Local manual override capability and clear status indication',
        'Smartphone app notification',
        'Email confirmation of switching'
      ],
      correctAnswer: 'Local manual override capability and clear status indication'
    },
    {
      question: 'What is the typical response time requirement for Short Term Operating Reserve (STOR)?',
      options: [
        '30 seconds or less',
        '4 hours advance notice',
        '20 minutes or less from instruction',
        '24 hours advance notice'
      ],
      correctAnswer: '20 minutes or less from instruction'
    },
    {
      question: 'In a load priority hierarchy, which category typically has the HIGHEST priority (shed last)?',
      options: [
        'Comfort cooling in offices',
        'Decorative lighting',
        'Life safety systems and emergency equipment',
        'Electric vehicle charging'
      ],
      correctAnswer: 'Life safety systems and emergency equipment'
    },
    {
      question: 'Maximum Demand (MD) charges on commercial electricity bills are typically based on:',
      options: [
        'Total kWh consumed in the billing period',
        'The highest kW or kVA recorded in any half-hour period',
        'Average daily consumption',
        'Standing charge plus unit rate'
      ],
      correctAnswer: 'The highest kW or kVA recorded in any half-hour period'
    },
    {
      question: 'Before remotely switching off equipment, BS 7671 and good practice require:',
      options: [
        'Sending a text message to all staff',
        'Verification that isolation is safe and appropriate warning to affected personnel',
        'Waiting 24 hours after notification',
        'Government approval'
      ],
      correctAnswer: 'Verification that isolation is safe and appropriate warning to affected personnel'
    },
    {
      question: 'Which factor makes Triad prediction challenging for demand management?',
      options: [
        'Triads occur at exactly the same time every year',
        'National Grid announces Triads one week in advance',
        'Triads are only confirmed retrospectively after February',
        'Triads always occur at midnight'
      ],
      correctAnswer: 'Triads are only confirmed retrospectively after February'
    },
    {
      question: 'What is the primary benefit of participating in the Capacity Market for commercial sites with flexible loads?',
      options: [
        'Free electricity during winter months',
        'Annual payments for committing to reduce demand during system stress events',
        'Reduced connection charges',
        'Priority grid connection'
      ],
      correctAnswer: 'Annual payments for committing to reduce demand during demand system stress events'
    }
  ];

  const faqs = [
    {
      question: 'What equipment do I need to implement basic remote monitoring for a commercial installation?',
      answer: 'For basic remote monitoring, you need: smart meters or sub-meters with communication capability (CT clamps with data loggers are cost-effective), a gateway device to aggregate data and connect to the internet, cloud-based or local monitoring software, and appropriate cybersecurity measures. For remote control, add smart contactors or circuit breakers with communication modules, and ensure proper isolation verification systems are in place. Budget options start from £500-1000 for small commercial sites, while comprehensive BEMS integration may cost £10,000+.'
    },
    {
      question: 'How do I sign up for the Demand Flexibility Service (DFS)?',
      answer: 'To participate in DFS, you typically need to register through an aggregator or your energy supplier if they offer DFS participation. You\'ll need smart metering (half-hourly data), minimum 1kW reduction capability, and the ability to respond to event notifications (usually given day-ahead). Popular aggregators include Octopus Energy, EDF, and specialist demand response companies. Residential customers can often join through apps like Octopus\'s "Saving Sessions". Commercial sites usually work with aggregators who handle the technical requirements and settlement.'
    },
    {
      question: 'What are the legal requirements for remote switching of electrical equipment?',
      answer: 'Remote switching must comply with BS 7671 requirements for isolation (Regulation 537), ensuring: clear indication of switch position, prevention of unintended reclosure, warning notices at points of supply, and means of local isolation for maintenance. The Electricity at Work Regulations 1989 require that no person should be exposed to danger - this means appropriate warnings before remote switching, verification that equipment is safe to de-energise, and documented procedures. Functional switching must not compromise safety isolation requirements.'
    },
    {
      question: 'How accurate are Triad prediction services, and is avoidance worth the disruption?',
      answer: 'Commercial Triad prediction services typically achieve 80-90% accuracy for warning periods, though predicting exact Triad days remains challenging. For large sites (1MW+), Triad charges can exceed £50,000 annually, making even partial avoidance worthwhile. The disruption depends on your load flexibility - sites with thermal storage, backup generation, or shiftable processes can reduce demand with minimal impact. For smaller sites, the cost-benefit calculation is less clear, and joining an aggregator\'s portfolio may be more practical than individual Triad management.'
    },
    {
      question: 'Can battery storage systems participate in grid services while also providing backup power?',
      answer: 'Yes, battery systems can provide multiple "stacked" services. A well-designed system can offer: peak shaving and demand management as primary function, Firm Frequency Response (FFR) or Dynamic Containment for grid frequency support, Triad avoidance by discharging during predicted peaks, and emergency backup power capacity. However, you must carefully manage state of charge to ensure backup capacity when needed. Revenue from grid services (£50-150/kW/year for FFR) can significantly improve battery payback, but requires sophisticated control systems and aggregator partnerships.'
    },
    {
      question: 'What happens if my site fails to deliver promised demand reduction during a grid service event?',
      answer: 'Consequences vary by service: For DFS, you simply won\'t receive payment for undelivered reduction - there are generally no penalties for residential/small commercial participants. For STOR and FFR contracts, non-delivery can result in financial penalties and potential contract termination. Capacity Market obligations carry significant penalties for non-delivery during stress events (up to the clearing price). Aggregators often manage this risk by over-recruiting capacity, but it\'s crucial to only commit to reductions you can reliably deliver. Start conservatively and increase commitments as you build confidence in your systems.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a] text-white">
      {/* Header */}
      <div className="bg-[#1a1a1a]/95 border-b border-gray-800">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
            <span>Module 5</span>
            <ChevronRight className="w-4 h-4" />
            <span>Section 4</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-elec-yellow flex items-center gap-3">
            <Wifi className="w-8 h-8" />
            Remote Control and Load Shedding
          </h1>
          <p className="text-gray-400 mt-2">
            Master demand response, grid services, and intelligent load management for modern electrical installations
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        {/* Section 1: Remote Monitoring and Control Fundamentals */}
        <section className="bg-[#242424] rounded-xl p-6 border border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-black rounded-full w-8 h-8 flex items-center justify-center font-bold">
              1
            </div>
            <h2 className="text-xl font-semibold text-elec-yellow flex items-center gap-2">
              <Server className="w-5 h-5" />
              Remote Monitoring and Control Fundamentals
            </h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Remote monitoring and control systems enable real-time visibility and management of electrical
              installations from centralised locations. These systems form the foundation for demand response
              participation, energy optimisation, and grid service delivery.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <h3 className="text-white font-medium mb-3">Key System Components</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="text-elec-yellow font-medium">Monitoring Layer</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Smart meters with half-hourly data</li>
                    <li>CT clamps and sub-metering</li>
                    <li>Power quality analysers</li>
                    <li>Environmental sensors (temperature, occupancy)</li>
                    <li>Equipment status monitoring</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="text-elec-yellow font-medium">Control Layer</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Smart contactors and motorised breakers</li>
                    <li>Variable speed drives with comms</li>
                    <li>Building Energy Management Systems (BEMS)</li>
                    <li>Programmable Logic Controllers (PLCs)</li>
                    <li>Cloud-based control platforms</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <h3 className="text-white font-medium mb-3">Communication Protocols</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-2 text-elec-yellow">Protocol</th>
                      <th className="text-left py-2 text-elec-yellow">Application</th>
                      <th className="text-left py-2 text-elec-yellow">Typical Use</th>
                    </tr>
                  </thead>
                  <tbody className="space-y-1">
                    <tr className="border-b border-gray-800">
                      <td className="py-2">Modbus TCP/IP</td>
                      <td className="py-2">Industrial control</td>
                      <td className="py-2">Meters, drives, PLCs</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-2">BACnet</td>
                      <td className="py-2">Building automation</td>
                      <td className="py-2">HVAC, lighting, BEMS</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-2">MQTT</td>
                      <td className="py-2">IoT messaging</td>
                      <td className="py-2">Cloud platforms, sensors</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-2">DNP3</td>
                      <td className="py-2">Utility SCADA</td>
                      <td className="py-2">Grid-connected assets</td>
                    </tr>
                    <tr>
                      <td className="py-2">KNX</td>
                      <td className="py-2">Building control</td>
                      <td className="py-2">Lighting, blinds, HVAC</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4">
              <h4 className="text-blue-400 font-medium flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4" />
                Cybersecurity Considerations
              </h4>
              <p className="text-sm">
                Remote control systems must implement robust cybersecurity: encrypted communications (TLS/SSL),
                strong authentication, network segmentation, regular firmware updates, and audit logging.
                The National Cyber Security Centre (NCSC) provides guidance for operational technology security.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Load Shedding Strategies and Priorities */}
        <section className="bg-[#242424] rounded-xl p-6 border border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-black rounded-full w-8 h-8 flex items-center justify-center font-bold">
              2
            </div>
            <h2 className="text-xl font-semibold text-elec-yellow flex items-center gap-2">
              <Power className="w-5 h-5" />
              Load Shedding Strategies and Priorities
            </h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Effective load shedding requires careful categorisation of loads by criticality, establishing
              clear hierarchies, and implementing automated systems that can respond rapidly to demand
              reduction requirements while maintaining safety and essential operations.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <h3 className="text-white font-medium mb-3">Load Priority Hierarchy (Typical Commercial Building)</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-red-900/20 border border-red-800 rounded-lg">
                  <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">P1</span>
                  <div>
                    <h4 className="text-red-400 font-medium">Critical - Never Shed</h4>
                    <p className="text-sm">Life safety systems, emergency lighting, fire alarms, security systems,
                    medical equipment, data centre UPS, emergency lifts</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-orange-900/20 border border-orange-800 rounded-lg">
                  <span className="bg-orange-600 text-white px-2 py-1 rounded text-xs font-bold">P2</span>
                  <div>
                    <h4 className="text-orange-400 font-medium">Essential - Shed Only in Emergency</h4>
                    <p className="text-sm">Server rooms, refrigeration (food safety), essential process equipment,
                    minimum lighting for safety, communications systems</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-yellow-900/20 border border-yellow-800 rounded-lg">
                  <span className="bg-yellow-600 text-black px-2 py-1 rounded text-xs font-bold">P3</span>
                  <div>
                    <h4 className="text-yellow-400 font-medium">Important - Shed with Notice</h4>
                    <p className="text-sm">General HVAC (occupied areas), passenger lifts, general office equipment,
                    kitchen equipment, EV charging (interruptible)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-green-900/20 border border-green-800 rounded-lg">
                  <span className="bg-green-600 text-white px-2 py-1 rounded text-xs font-bold">P4</span>
                  <div>
                    <h4 className="text-green-400 font-medium">Discretionary - Shed First</h4>
                    <p className="text-sm">Non-essential lighting, HVAC in unoccupied areas, decorative features,
                    water heating (with storage), EV charging (deferrable)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <h3 className="text-white font-medium mb-3">Load Shedding Implementation Methods</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-elec-yellow font-medium mb-2">Sequential Shedding</h4>
                  <p className="text-sm mb-2">
                    Loads shed in predetermined order based on priority. Simple to implement but may
                    over-shed or under-shed depending on individual load sizes.
                  </p>
                  <div className="text-xs text-gray-400">
                    Example: P4 loads → P3 loads → P2 loads (stop before P1)
                  </div>
                </div>
                <div>
                  <h4 className="text-elec-yellow font-medium mb-2">Rotational Shedding</h4>
                  <p className="text-sm mb-2">
                    Similar loads cycled on/off to share the burden. Common for HVAC zones to
                    maintain acceptable comfort while reducing demand.
                  </p>
                  <div className="text-xs text-gray-400">
                    Example: AHU1 off 15min → AHU2 off 15min → AHU3 off 15min → repeat
                  </div>
                </div>
                <div>
                  <h4 className="text-elec-yellow font-medium mb-2">Proportional Reduction</h4>
                  <p className="text-sm mb-2">
                    Variable loads reduced proportionally rather than switched off completely.
                    Provides finer control and less disruption.
                  </p>
                  <div className="text-xs text-gray-400">
                    Example: All VSDs reduced to 75% speed, lighting dimmed to 50%
                  </div>
                </div>
                <div>
                  <h4 className="text-elec-yellow font-medium mb-2">Target-Based Shedding</h4>
                  <p className="text-sm mb-2">
                    Intelligent system calculates which loads to shed to achieve target demand
                    reduction with minimum disruption.
                  </p>
                  <div className="text-xs text-gray-400">
                    Example: "Reduce 100kW" → system selects optimal combination
                  </div>
                </div>
              </div>
            </div>

            <InlineCheck
              id={quickCheckQuestions[1].id}
              question={quickCheckQuestions[1].question}
              options={quickCheckQuestions[1].options}
              correctIndex={quickCheckQuestions[1].correctIndex}
              explanation={quickCheckQuestions[1].explanation}
            />
          </div>
        </section>

        {/* Section 3: Demand Response Programmes */}
        <section className="bg-[#242424] rounded-xl p-6 border border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-black rounded-full w-8 h-8 flex items-center justify-center font-bold">
              3
            </div>
            <h2 className="text-xl font-semibold text-elec-yellow flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Demand Response Programmes (UK)
            </h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              The UK offers several demand response programmes that reward consumers for reducing electricity
              consumption during peak periods or providing flexibility services. These create revenue
              opportunities while supporting grid stability.
            </p>

            <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border border-yellow-700 rounded-lg p-4">
              <h3 className="text-elec-yellow font-medium mb-3 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Demand Flexibility Service (DFS)
              </h3>
              <p className="text-sm mb-3">
                Introduced by National Grid ESO for winter 2022/23, DFS pays consumers to reduce electricity
                use during peak demand periods, typically winter evenings (4-7pm).
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="text-white font-medium mb-2">How It Works</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Events announced day-ahead via app/email</li>
                    <li>Typical duration: 1-2 hours</li>
                    <li>Payment based on kWh reduced vs baseline</li>
                    <li>2023/24 rates: up to £3-4/kWh</li>
                    <li>Participation voluntary per event</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-2">Participation Requirements</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Smart meter with half-hourly readings</li>
                    <li>Register via supplier or aggregator</li>
                    <li>Minimum 1kW reduction capability</li>
                    <li>Baseline calculated from recent usage</li>
                    <li>No penalty for non-participation</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <h3 className="text-white font-medium mb-3">UK Grid Services Overview</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="text-blue-400 font-medium">Short Term Operating Reserve (STOR)</h4>
                  <p className="text-sm mt-1">
                    Provides additional power or demand reduction at short notice. Requires 3MW minimum
                    (can aggregate), response within 20 minutes of instruction, sustain for at least 2 hours.
                    Revenue: £3-8/kW/year availability + £100-200/MWh utilisation.
                  </p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="text-purple-400 font-medium">Firm Frequency Response (FFR)</h4>
                  <p className="text-sm mt-1">
                    Automatic response to grid frequency deviations. Primary (10 sec), Secondary (30 sec),
                    High (10 min). Requires 1MW minimum, automatic frequency-triggered response.
                    Revenue: £50-150/kW/year depending on service type.
                  </p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="text-green-400 font-medium">Dynamic Containment (DC)</h4>
                  <p className="text-sm mt-1">
                    Fast-acting frequency response (sub-second). Requires battery storage or fast-responding
                    loads. 1MW minimum. Premium rates for rapid response capability.
                    Revenue: £100-300/kW/year (highly variable).
                  </p>
                </div>
                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="text-orange-400 font-medium">Capacity Market (CM)</h4>
                  <p className="text-sm mt-1">
                    Annual payments for committing capacity during system stress events. Auctions held
                    4 years and 1 year ahead. Minimum 1MW (DSR), penalties for non-delivery.
                    Revenue: £15-45/kW/year (auction dependent).
                  </p>
                </div>
              </div>
            </div>

            <InlineCheck
              id={quickCheckQuestions[0].id}
              question={quickCheckQuestions[0].question}
              options={quickCheckQuestions[0].options}
              correctIndex={quickCheckQuestions[0].correctIndex}
              explanation={quickCheckQuestions[0].explanation}
            />
          </div>
        </section>

        {/* Section 4: Maximum Demand Management and Triad Avoidance */}
        <section className="bg-[#242424] rounded-xl p-6 border border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-black rounded-full w-8 h-8 flex items-center justify-center font-bold">
              4
            </div>
            <h2 className="text-xl font-semibold text-elec-yellow flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Maximum Demand Management and Triad Avoidance
            </h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Maximum demand (MD) charges and Triad-based transmission charges can represent 20-40% of
              large commercial electricity bills. Understanding and managing these peak demands offers
              significant cost-saving opportunities.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <h3 className="text-white font-medium mb-3">Understanding Maximum Demand Charges</h3>
              <p className="text-sm mb-3">
                MD charges are based on your highest recorded demand (kW or kVA) in any half-hour settlement
                period during the billing month. A single peak can set your charge for the entire month.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-[#242424] p-3 rounded">
                  <h4 className="text-elec-yellow font-medium text-sm">MD Calculation Example</h4>
                  <ul className="text-xs space-y-1 mt-2">
                    <li>Recorded peak: 450kW</li>
                    <li>MD rate: £8/kW/month</li>
                    <li>Monthly MD charge: £3,600</li>
                    <li>If peak reduced to 350kW: £2,800</li>
                    <li className="text-green-400 font-medium">Annual saving: £9,600</li>
                  </ul>
                </div>
                <div className="bg-[#242424] p-3 rounded">
                  <h4 className="text-elec-yellow font-medium text-sm">MD Reduction Strategies</h4>
                  <ul className="text-xs space-y-1 mt-2">
                    <li>Stagger start-up of equipment</li>
                    <li>Interlock high-power loads</li>
                    <li>Shift flexible loads off-peak</li>
                    <li>Battery storage for peak shaving</li>
                    <li>Real-time monitoring and alerts</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-700 rounded-lg p-4">
              <h3 className="text-blue-400 font-medium mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Triad Periods Explained
              </h3>
              <p className="text-sm mb-3">
                Triads are the three half-hour periods of highest national electricity demand between
                <strong className="text-white"> November and February</strong>. Large consumers (100kW+)
                pay Transmission Network Use of System (TNUoS) charges based on their average consumption
                during these three periods.
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="bg-[#1a1a1a] p-3 rounded">
                  <h4 className="text-white font-medium">When Triads Occur</h4>
                  <ul className="text-xs space-y-1 mt-2">
                    <li>November - February only</li>
                    <li>Typically weekday evenings</li>
                    <li>Usually 4:30-6:00pm</li>
                    <li>Cold, dark winter days</li>
                    <li>At least 10 days apart</li>
                  </ul>
                </div>
                <div className="bg-[#1a1a1a] p-3 rounded">
                  <h4 className="text-white font-medium">Cost Impact (2023/24)</h4>
                  <ul className="text-xs space-y-1 mt-2">
                    <li>TNUoS: ~£50-75/kW/year</li>
                    <li>Based on Triad average</li>
                    <li>500kW site: £25,000-37,500</li>
                    <li>Confirmed in March/April</li>
                    <li>Charges vary by region</li>
                  </ul>
                </div>
                <div className="bg-[#1a1a1a] p-3 rounded">
                  <h4 className="text-white font-medium">Avoidance Value</h4>
                  <ul className="text-xs space-y-1 mt-2">
                    <li>Reduce demand during warnings</li>
                    <li>Use prediction services</li>
                    <li>Battery discharge</li>
                    <li>Backup generation</li>
                    <li>Process scheduling</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <h3 className="text-white font-medium mb-3">Triad Warning and Response System</h3>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 border border-gray-700 rounded p-3">
                  <div className="text-yellow-400 font-medium text-sm mb-2">Amber Warning</div>
                  <p className="text-xs">High probability of Triad. Issued morning/afternoon of potential
                  Triad day. Prepare systems, alert staff, review load status.</p>
                </div>
                <div className="flex items-center justify-center">
                  <ChevronRight className="w-6 h-6 text-gray-600" />
                </div>
                <div className="flex-1 border border-red-700 rounded p-3">
                  <div className="text-red-400 font-medium text-sm mb-2">Red Warning</div>
                  <p className="text-xs">Very high probability. Usually issued 1-2 hours before.
                  Initiate load shedding, start backup generation, activate battery discharge.</p>
                </div>
                <div className="flex items-center justify-center">
                  <ChevronRight className="w-6 h-6 text-gray-600" />
                </div>
                <div className="flex-1 border border-green-700 rounded p-3">
                  <div className="text-green-400 font-medium text-sm mb-2">All Clear</div>
                  <p className="text-xs">Triad window passed. Restore normal operations.
                  Log actual demand achieved for analysis and improvement.</p>
                </div>
              </div>
            </div>

            <InlineCheck
              id={quickCheckQuestions[2].id}
              question={quickCheckQuestions[2].question}
              options={quickCheckQuestions[2].options}
              correctIndex={quickCheckQuestions[2].correctIndex}
              explanation={quickCheckQuestions[2].explanation}
            />
          </div>
        </section>

        {/* Section 5: Safety Considerations for Remote Switching */}
        <section className="bg-[#242424] rounded-xl p-6 border border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-black rounded-full w-8 h-8 flex items-center justify-center font-bold">
              5
            </div>
            <h2 className="text-xl font-semibold text-elec-yellow flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Safety Considerations for Remote Switching
            </h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Remote control of electrical equipment introduces specific safety challenges that must be
              addressed through proper design, procedures, and compliance with regulations including
              BS 7671 and the Electricity at Work Regulations 1989.
            </p>

            <div className="bg-red-900/30 border border-red-700 rounded-lg p-4">
              <h3 className="text-red-400 font-medium mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Critical Safety Requirements
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-white font-medium text-sm mb-2">BS 7671 Compliance</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Reg 537: Isolation requirements must be maintained</li>
                    <li>• Clear indication of switch position at all times</li>
                    <li>• Prevention of inadvertent reclosure</li>
                    <li>• Local means of isolation for maintenance</li>
                    <li>• Appropriate warning notices</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-medium text-sm mb-2">Electricity at Work Regs</h4>
                  <ul className="text-sm space-y-1">
                    <li>• No person exposed to danger from switching</li>
                    <li>• Suitable precautions during work</li>
                    <li>• Competent persons to operate systems</li>
                    <li>• Equipment suitable for environment</li>
                    <li>• Safe systems of work documented</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <h3 className="text-white font-medium mb-3">Remote Switching Safety Checklist</h3>
              <div className="space-y-2">
                <div className="flex items-start gap-3 p-2 bg-[#242424] rounded">
                  <ToggleRight className="w-5 h-5 text-elec-yellow mt-0.5" />
                  <div>
                    <h4 className="text-white font-medium text-sm">Local Override Capability</h4>
                    <p className="text-xs text-gray-400">
                      Every remotely-controlled circuit must have local manual override for maintenance
                      and emergency situations. This takes precedence over remote commands.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-2 bg-[#242424] rounded">
                  <Activity className="w-5 h-5 text-elec-yellow mt-0.5" />
                  <div>
                    <h4 className="text-white font-medium text-sm">Status Verification</h4>
                    <p className="text-xs text-gray-400">
                      Real-time feedback confirming actual switch position, not just command sent.
                      Use auxiliary contacts for status verification, not assumed state.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-2 bg-[#242424] rounded">
                  <AlertTriangle className="w-5 h-5 text-elec-yellow mt-0.5" />
                  <div>
                    <h4 className="text-white font-medium text-sm">Pre-Switch Warning</h4>
                    <p className="text-xs text-gray-400">
                      Appropriate warning to affected areas before remote switching. May include visual
                      indicators, audible alarms, or direct communication with site personnel.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-2 bg-[#242424] rounded">
                  <Building2 className="w-5 h-5 text-elec-yellow mt-0.5" />
                  <div>
                    <h4 className="text-white font-medium text-sm">Impact Assessment</h4>
                    <p className="text-xs text-gray-400">
                      Verify what equipment/areas will be affected before switching. Ensure no persons
                      at risk, no processes that could be damaged by sudden de-energisation.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-2 bg-[#242424] rounded">
                  <Server className="w-5 h-5 text-elec-yellow mt-0.5" />
                  <div>
                    <h4 className="text-white font-medium text-sm">Audit Trail</h4>
                    <p className="text-xs text-gray-400">
                      Complete logging of all remote switching operations: who, when, what, why.
                      Essential for incident investigation and demonstrating due diligence.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-4">
              <h4 className="text-yellow-400 font-medium flex items-center gap-2 mb-2">
                <Lightbulb className="w-4 h-4" />
                Best Practice: Permit-to-Work Integration
              </h4>
              <p className="text-sm">
                For sites with permit-to-work systems, remote control systems should integrate with the
                permit system to prevent switching of circuits under active permits. Electronic permit
                systems can provide automatic interlocking - if a permit is live on a circuit, remote
                switching is blocked until the permit is cancelled.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: Grid Services and Revenue Opportunities */}
        <section className="bg-[#242424] rounded-xl p-6 border border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-black rounded-full w-8 h-8 flex items-center justify-center font-bold">
              6
            </div>
            <h2 className="text-xl font-semibold text-elec-yellow flex items-center gap-2">
              <PoundSterling className="w-5 h-5" />
              Grid Services and Revenue Opportunities
            </h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Commercial and industrial sites can generate significant revenue by participating in grid
              services. The UK's transition to renewable energy creates increasing demand for flexible
              capacity, offering opportunities for sites with controllable loads or storage.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <h3 className="text-white font-medium mb-3">Revenue Potential by Site Type</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-2 text-elec-yellow">Site Type</th>
                      <th className="text-left py-2 text-elec-yellow">Flexible Capacity</th>
                      <th className="text-left py-2 text-elec-yellow">Suitable Services</th>
                      <th className="text-left py-2 text-elec-yellow">Potential Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-800">
                      <td className="py-2">Office Building</td>
                      <td className="py-2">100-500kW</td>
                      <td className="py-2">DFS, Triad, CM</td>
                      <td className="py-2">£5,000-25,000/year</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-2">Retail/Warehouse</td>
                      <td className="py-2">200kW-1MW</td>
                      <td className="py-2">DFS, Triad, STOR (aggregated)</td>
                      <td className="py-2">£10,000-50,000/year</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-2">Industrial</td>
                      <td className="py-2">1-10MW</td>
                      <td className="py-2">STOR, FFR, CM, Triad</td>
                      <td className="py-2">£50,000-500,000/year</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-2">Battery Storage</td>
                      <td className="py-2">1-50MW</td>
                      <td className="py-2">DC, FFR, CM, Wholesale trading</td>
                      <td className="py-2">£100-300/kW/year</td>
                    </tr>
                    <tr>
                      <td className="py-2">Cold Storage</td>
                      <td className="py-2">500kW-5MW</td>
                      <td className="py-2">STOR, FFR, CM</td>
                      <td className="py-2">£25,000-150,000/year</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <h3 className="text-white font-medium mb-3">Revenue Stacking Strategy</h3>
              <p className="text-sm mb-3">
                Maximise returns by combining multiple revenue streams. A well-designed system can
                participate in several services simultaneously or sequentially.
              </p>
              <div className="bg-[#242424] p-4 rounded-lg">
                <h4 className="text-elec-yellow font-medium text-sm mb-3">Example: 1MW Battery System</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                    <span>Dynamic Containment (primary service)</span>
                    <span className="text-green-400">£150,000/year</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                    <span>Triad avoidance (winter peaks)</span>
                    <span className="text-green-400">£40,000/year</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                    <span>Wholesale arbitrage (off-peak charge, peak discharge)</span>
                    <span className="text-green-400">£25,000/year</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                    <span>Capacity Market payment</span>
                    <span className="text-green-400">£30,000/year</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 font-medium">
                    <span className="text-white">Total Potential Revenue</span>
                    <span className="text-elec-yellow">£245,000/year</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <h3 className="text-white font-medium mb-3">Working with Aggregators</h3>
              <p className="text-sm mb-3">
                Most sites participate in grid services through aggregators who bundle multiple sites to
                meet minimum capacity requirements and handle complex market interactions.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-elec-yellow font-medium text-sm mb-2">Aggregator Benefits</h4>
                  <ul className="text-xs space-y-1">
                    <li>✓ Access markets with lower capacity</li>
                    <li>✓ Handle technical compliance</li>
                    <li>✓ Manage settlement and payments</li>
                    <li>✓ Provide monitoring/control systems</li>
                    <li>✓ Portfolio risk management</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-elec-yellow font-medium text-sm mb-2">Typical Terms</h4>
                  <ul className="text-xs space-y-1">
                    <li>• Revenue share: 10-30% to aggregator</li>
                    <li>• Contract length: 1-3 years</li>
                    <li>• Minimum commitment required</li>
                    <li>• Performance guarantees expected</li>
                    <li>• Metering/comms equipment provided</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-green-900/30 border border-green-700 rounded-lg p-4">
              <h4 className="text-green-400 font-medium flex items-center gap-2 mb-2">
                <Lightbulb className="w-4 h-4" />
                Getting Started Checklist
              </h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <ul className="space-y-1">
                  <li>□ Audit flexible/shiftable loads</li>
                  <li>□ Review half-hourly consumption data</li>
                  <li>□ Identify load shedding potential</li>
                  <li>□ Assess backup generation capacity</li>
                </ul>
                <ul className="space-y-1">
                  <li>□ Contact 2-3 aggregators for quotes</li>
                  <li>□ Understand contractual obligations</li>
                  <li>□ Plan control system requirements</li>
                  <li>□ Train operations staff</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] rounded-xl p-6 border-2 border-elec-yellow">
          <div className="flex items-center gap-3 mb-4">
            <Bookmark className="w-6 h-6 text-elec-yellow" />
            <h2 className="text-xl font-semibold text-elec-yellow">Quick Reference Card</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-white font-medium mb-2 border-b border-gray-700 pb-1">UK Grid Services Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">DFS</span>
                  <span className="text-white">Demand reduction during peaks (£3-4/kWh)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">STOR</span>
                  <span className="text-white">Reserve power, 20min response (3MW min)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">FFR</span>
                  <span className="text-white">Frequency response 10s-10min (1MW min)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">DC</span>
                  <span className="text-white">Sub-second frequency (batteries, 1MW min)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">CM</span>
                  <span className="text-white">Capacity commitment (£15-45/kW/year)</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-white font-medium mb-2 border-b border-gray-700 pb-1">Key Dates &amp; Thresholds</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Triad Season</span>
                  <span className="text-white">November - February</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Typical Triad Time</span>
                  <span className="text-white">4:30pm - 6:00pm weekdays</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Triad Spacing</span>
                  <span className="text-white">Minimum 10 days apart</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">MD Measurement</span>
                  <span className="text-white">Highest half-hour kW/kVA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">DFS Events</span>
                  <span className="text-white">Typically 4pm-7pm winter</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-white font-medium mb-2 border-b border-gray-700 pb-1">Load Priority Levels</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="bg-red-600 text-white px-2 py-0.5 rounded text-xs">P1</span>
                  <span className="text-white">Life safety - Never shed</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-orange-600 text-white px-2 py-0.5 rounded text-xs">P2</span>
                  <span className="text-white">Essential - Emergency only</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-yellow-600 text-black px-2 py-0.5 rounded text-xs">P3</span>
                  <span className="text-white">Important - With notice</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-green-600 text-white px-2 py-0.5 rounded text-xs">P4</span>
                  <span className="text-white">Discretionary - Shed first</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-white font-medium mb-2 border-b border-gray-700 pb-1">Safety Requirements</h3>
              <div className="space-y-1 text-sm text-gray-300">
                <p>✓ Local manual override on all remote circuits</p>
                <p>✓ Clear position indication (verified status)</p>
                <p>✓ Pre-switching warning to affected areas</p>
                <p>✓ Audit trail of all operations</p>
                <p>✓ Integration with permit systems</p>
                <p>✓ BS 7671 Reg 537 compliance</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="bg-[#242424] rounded-xl p-6 border border-gray-800">
          <h2 className="text-xl font-semibold text-elec-yellow mb-4">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-700 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-4 text-left bg-[#1a1a1a] hover:bg-[#2a2a2a] transition-colors min-h-[44px] touch-manipulation active:scale-[0.98]"
                >
                  <span className="font-medium text-white pr-4">{faq.question}</span>
                  {expandedFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-elec-yellow flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-elec-yellow flex-shrink-0" />
                  )}
                </button>
                {expandedFAQ === index && (
                  <div className="p-4 text-gray-300 text-sm bg-[#242424] border-t border-gray-700">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Quiz Section */}
        <section className="bg-[#242424] rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-elec-yellow">Section Quiz</h2>
            <Button
              onClick={() => setShowQuiz(!showQuiz)}
              className="bg-elec-yellow text-black hover:bg-yellow-400 min-h-[44px] touch-manipulation active:scale-[0.98]"
            >
              {showQuiz ? 'Hide Quiz' : 'Start Quiz'}
            </Button>
          </div>
          {showQuiz && (
            <Quiz
              questions={quizQuestions}
              moduleId="energy-efficiency-m5s4"
              sectionTitle="Remote Control and Load Shedding"
            />
          )}
        </section>

        {/* Navigation */}
        <nav className="flex flex-col sm:flex-row justify-between gap-4 pt-4">
          <Button
            onClick={() => navigate('/upskilling/energy-efficiency/module-5/section-3')}
            variant="outline"
            className="flex items-center gap-2 border-gray-600 text-white hover:bg-gray-800 min-h-[44px] touch-manipulation active:scale-[0.98]"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous: Section 3</span>
          </Button>
          <Button
            onClick={() => navigate('/upskilling/energy-efficiency/module-5/section-5')}
            className="flex items-center gap-2 bg-elec-yellow text-black hover:bg-yellow-400 min-h-[44px] touch-manipulation active:scale-[0.98]"
          >
            <span>Next: Section 5</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default EnergyEfficiencyModule5Section4;
