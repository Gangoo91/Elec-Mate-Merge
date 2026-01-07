import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { useSEO } from '@/hooks/useSEO';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Award,
  BookOpen,
  FileCheck,
  Building2,
  Lightbulb,
  Settings,
  ClipboardCheck,
  Zap,
  Target,
  Shield,
  Factory,
  Gauge,
  CheckCircle2,
  AlertTriangle,
  Info,
} from 'lucide-react';

const EnergyEfficiencyModule1Section4: React.FC = () => {
  const navigate = useNavigate();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);

  useSEO({
    title: 'BS EN and ISO Standards Overview | Energy Efficiency Module 1 Section 4 | Elec-Mate',
    description:
      'Learn about key energy efficiency standards including ISO 50001, BS EN 16247, BS EN 15232, motor efficiency classes IE1-IE5, and UK Building Regulations Part L compliance.',
    keywords:
      'ISO 50001, BS EN 16247, BS EN 15232, energy management systems, energy audits, motor efficiency standards, IE1 IE2 IE3 IE4 IE5, Part L Building Regulations, energy efficiency standards UK',
    canonicalUrl: '/upskilling/energy-efficiency/module-1/section-4',
  });

  const quickCheckQuestions = [
    {
      id: 'qc1-iso50001',
      question: 'What is the primary focus of ISO 50001?',
      options: [
        'Electrical installation testing',
        'Energy management systems',
        'Building construction standards',
        'Workplace safety regulations',
      ],
      correctIndex: 1,
      explanation:
        'ISO 50001 is specifically designed for Energy Management Systems (EnMS). It provides a framework for organisations to develop policies, set targets, and implement action plans to improve energy performance systematically.',
    },
    {
      id: 'qc2-motorefficiency',
      question: 'Which motor efficiency class represents the highest efficiency level under current standards?',
      options: ['IE1 Standard Efficiency', 'IE2 High Efficiency', 'IE3 Premium Efficiency', 'IE5 Ultra Premium Efficiency'],
      correctIndex: 3,
      explanation:
        'IE5 Ultra Premium Efficiency represents the highest motor efficiency class. The scale runs from IE1 (Standard) through to IE5 (Ultra Premium), with each level representing approximately 15-20% reduction in losses compared to the previous class.',
    },
    {
      id: 'qc3-bsen16247',
      question: 'What does BS EN 16247 specifically address?',
      options: [
        'Building automation systems',
        'Energy auditing procedures and requirements',
        'Lighting design calculations',
        'Electrical installation certification',
      ],
      correctIndex: 1,
      explanation:
        'BS EN 16247 is a multi-part standard that establishes requirements, methodology, and deliverables for energy audits. It covers general requirements (Part 1) and specific sectors including buildings, industrial processes, and transport.',
    },
  ];

  const quizQuestions = [
    {
      question: 'What management principle does ISO 50001 follow for continuous improvement?',
      options: ['Six Sigma methodology', 'Plan-Do-Check-Act (PDCA) cycle', 'Lean manufacturing principles', 'Total Quality Management'],
      correctAnswer: 'Plan-Do-Check-Act (PDCA) cycle',
    },
    {
      question: 'From July 2023, what is the minimum efficiency class required for new motors between 75kW and 200kW in the EU/UK?',
      options: ['IE2 High Efficiency', 'IE3 Premium Efficiency', 'IE4 Super Premium Efficiency', 'IE5 Ultra Premium Efficiency'],
      correctAnswer: 'IE4 Super Premium Efficiency',
    },
    {
      question: 'Which part of BS EN 16247 specifically covers energy audits for buildings?',
      options: ['BS EN 16247-1', 'BS EN 16247-2', 'BS EN 16247-3', 'BS EN 16247-4'],
      correctAnswer: 'BS EN 16247-2',
    },
    {
      question: 'What does BS EN 15232 primarily assess?',
      options: [
        'Thermal insulation performance',
        'Impact of building automation and controls on energy efficiency',
        'Renewable energy integration',
        'Electrical safety compliance',
      ],
      correctAnswer: 'Impact of building automation and controls on energy efficiency',
    },
    {
      question: 'Which BS EN 15232 class represents buildings with high energy performance through advanced automation?',
      options: ['Class D - Non-energy efficient', 'Class C - Standard', 'Class B - Advanced', 'Class A - High energy performance'],
      correctAnswer: 'Class A - High energy performance',
    },
    {
      question: 'Under ESOS (Energy Savings Opportunity Scheme), which organisations must comply?',
      options: [
        'All businesses regardless of size',
        'Large undertakings with 250+ employees OR turnover over £44m',
        'Only public sector organisations',
        'Manufacturing companies only',
      ],
      correctAnswer: 'Large undertakings with 250+ employees OR turnover over £44m',
    },
    {
      question: 'What is the minimum efficacy requirement for general lighting in new non-domestic buildings under Part L 2021?',
      options: ['60 lumens per watt', '80 lumens per watt', '95 lumens per watt', '120 lumens per watt'],
      correctAnswer: '95 lumens per watt',
    },
    {
      question: 'How often must ISO 50001 certified organisations undergo surveillance audits?',
      options: ['Every 6 months', 'Annually', 'Every 2 years', 'Every 3 years'],
      correctAnswer: 'Annually',
    },
    {
      question: 'Which standard provides the framework for calculating building energy performance certificates (EPCs)?',
      options: ['ISO 50001', 'BS EN 16247', 'BS EN 15232', 'BS EN ISO 52000 series'],
      correctAnswer: 'BS EN ISO 52000 series',
    },
    {
      question: 'What percentage energy savings can typically be achieved by upgrading from IE2 to IE4 motors?',
      options: ['1-2%', '3-5%', '10-15%', '25-30%'],
      correctAnswer: '3-5%',
    },
  ];

  const faqs = [
    {
      question: 'What is the difference between ISO 50001 and BS EN 16247?',
      answer:
        'ISO 50001 is a management system standard that provides an ongoing framework for energy management within an organisation, requiring continuous improvement and regular internal audits. BS EN 16247 focuses specifically on how to conduct energy audits - it defines the methodology, requirements, and deliverables for one-off or periodic energy assessments. Many organisations use BS EN 16247 audits as part of their ISO 50001 implementation to identify improvement opportunities.',
    },
    {
      question: 'Are these standards mandatory in the UK?',
      answer:
        'Most standards are voluntary, but they often support mandatory requirements. For example, ESOS requires qualifying organisations to conduct energy audits to ISO 50001 or BS EN 16247 standards. Part L Building Regulations mandate minimum energy efficiency requirements that reference these standards. Motor efficiency regulations make IE3/IE4 mandatory for new installations. ISO 50001 certification can provide ESOS compliance exemption.',
    },
    {
      question: 'How do motor efficiency classes affect running costs?',
      answer:
        'Motor efficiency directly impacts electricity consumption. An IE4 motor typically has 1-3% better efficiency than IE3, which may seem small but compounds significantly over time. For a continuously running 30kW motor, upgrading from IE2 to IE4 could save approximately £500-800 annually in electricity costs. Over a typical 15-20 year motor lifespan, this represents substantial savings and reduced carbon emissions.',
    },
    {
      question: 'What are the benefits of ISO 50001 certification?',
      answer:
        'Benefits include: exemption from ESOS audit requirements, average energy savings of 10-20% in the first three years, improved corporate sustainability credentials, competitive advantage in tenders requiring environmental management, reduced carbon tax exposure, better regulatory compliance preparation, and systematic approach to identifying and implementing efficiency improvements.',
    },
    {
      question: 'How does BS EN 15232 relate to BACS (Building Automation and Control Systems)?',
      answer:
        'BS EN 15232 provides a classification system (A-D) for BACS based on their energy impact. Class A systems include demand-based control, optimised scheduling, and integration with renewable energy sources. The standard helps specifiers and building managers understand how different levels of automation affect energy consumption, with potential savings of 20-30% achievable by upgrading from Class C to Class A systems.',
    },
    {
      question: 'What documentation is needed for standards compliance?',
      answer:
        'Requirements vary by standard. ISO 50001 requires an energy policy, objectives, action plans, energy baseline data, EnPIs (Energy Performance Indicators), and records of management reviews. BS EN 16247 audits must produce reports including methodology, findings, recommendations with payback calculations, and executive summary. Part L compliance requires design stage calculations, as-built documentation, and commissioning certificates.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#2a2a2a] to-[#1a1a1a] border-b border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
            <BookOpen className="w-4 h-4" />
            <span>Module 1: Energy Efficiency Fundamentals</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-elec-yellow">Section 4</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            BS EN and ISO Standards Overview
          </h1>
          <p className="text-gray-300">
            Understanding the key standards framework for energy efficiency compliance and best practice in the UK
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Introduction */}
        <div className="bg-[#2a2a2a] rounded-lg p-6 border border-gray-700">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-elec-yellow/20 rounded-lg">
              <Award className="w-6 h-6 text-elec-yellow" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">Why Standards Matter</h2>
              <p className="text-gray-300">
                Energy efficiency standards provide the framework for consistent measurement, compliance, and improvement.
                Understanding BS EN and ISO standards is essential for electrical professionals working on commercial and
                industrial installations, energy audits, and sustainability projects. These standards form the backbone
                of UK energy regulations and international best practice.
              </p>
            </div>
          </div>
        </div>

        {/* Section 1: ISO 50001 */}
        <section className="bg-[#2a2a2a] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-lg">
              1
            </div>
            <h2 className="text-xl font-semibold text-white">ISO 50001: Energy Management Systems</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              ISO 50001 is the international standard for Energy Management Systems (EnMS). First published in 2011
              and updated in 2018, it provides organisations with a systematic approach to achieving continual
              improvement in energy performance.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-lg font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Key Principles of ISO 50001
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Plan-Do-Check-Act (PDCA)</strong> - Continuous improvement cycle embedded in all processes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Energy Policy</strong> - Top management commitment with defined objectives and targets</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Energy Review</strong> - Analysis of energy use and consumption patterns</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Energy Performance Indicators (EnPIs)</strong> - Measurable metrics to track progress</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Energy Baseline</strong> - Reference point for measuring improvements</span>
                </li>
              </ul>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-900/20 border border-green-700 rounded-lg p-4">
                <h4 className="font-semibold text-green-400 mb-2">Certification Benefits</h4>
                <ul className="text-sm space-y-1">
                  <li>• ESOS compliance exemption</li>
                  <li>• Average 10-20% energy savings</li>
                  <li>• Enhanced corporate reputation</li>
                  <li>• Tender competitive advantage</li>
                  <li>• Reduced carbon tax exposure</li>
                </ul>
              </div>
              <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
                <h4 className="font-semibold text-blue-400 mb-2">Certification Process</h4>
                <ul className="text-sm space-y-1">
                  <li>• Gap analysis and implementation</li>
                  <li>• Internal audits and management review</li>
                  <li>• Stage 1 audit (documentation review)</li>
                  <li>• Stage 2 audit (implementation verification)</li>
                  <li>• Annual surveillance audits</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: BS EN 16247 */}
        <section className="bg-[#2a2a2a] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-lg">
              2
            </div>
            <h2 className="text-xl font-semibold text-white">BS EN 16247: Energy Audits Series</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              BS EN 16247 is a multi-part European standard that defines requirements for energy audits.
              It ensures audits are conducted systematically and produce comparable, actionable results.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-lg font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                <FileCheck className="w-5 h-5" />
                Standard Parts Overview
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-[#2a2a2a] rounded border border-gray-600">
                  <span className="text-elec-yellow font-bold">Part 1</span>
                  <div>
                    <strong className="text-white">General Requirements</strong>
                    <p className="text-sm">Common methodology, auditor competence, reporting requirements applicable to all sectors</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-[#2a2a2a] rounded border border-gray-600">
                  <span className="text-elec-yellow font-bold">Part 2</span>
                  <div>
                    <strong className="text-white">Buildings</strong>
                    <p className="text-sm">Specific requirements for building energy audits including HVAC, lighting, and building fabric</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-[#2a2a2a] rounded border border-gray-600">
                  <span className="text-elec-yellow font-bold">Part 3</span>
                  <div>
                    <strong className="text-white">Processes</strong>
                    <p className="text-sm">Industrial and manufacturing processes, production equipment, and process heating/cooling</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-[#2a2a2a] rounded border border-gray-600">
                  <span className="text-elec-yellow font-bold">Part 4</span>
                  <div>
                    <strong className="text-white">Transport</strong>
                    <p className="text-sm">Fleet operations, logistics, and transport-related energy consumption</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-[#2a2a2a] rounded border border-gray-600">
                  <span className="text-elec-yellow font-bold">Part 5</span>
                  <div>
                    <strong className="text-white">Competence of Energy Auditors</strong>
                    <p className="text-sm">Qualification requirements, knowledge, skills, and professional conduct</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-amber-900/20 border border-amber-600 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-amber-400">ESOS Compliance Note</h4>
                  <p className="text-sm">
                    Under ESOS Phase 3, qualifying organisations must conduct energy audits compliant with BS EN 16247
                    or maintain ISO 50001 certification. Audits must cover at least 90% of total energy consumption
                    and be conducted by approved lead assessors.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Inline Check 1 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 3: BS EN 15232 */}
        <section className="bg-[#2a2a2a] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-lg">
              3
            </div>
            <h2 className="text-xl font-semibold text-white">BS EN 15232: Building Automation Impact</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              BS EN 15232 (now part of BS EN ISO 52120) provides a method for assessing the energy impact of
              Building Automation and Control Systems (BACS) and Technical Building Management (TBM).
              It classifies systems from A (most efficient) to D (least efficient).
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-lg font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                BACS Efficiency Classes
              </h3>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="p-3 bg-green-900/30 border border-green-700 rounded">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-600 text-white rounded font-bold text-sm">Class A</span>
                    <span className="font-semibold text-green-400">High Energy Performance</span>
                  </div>
                  <ul className="text-sm space-y-1">
                    <li>• Demand-based control</li>
                    <li>• Individual room control</li>
                    <li>• Optimum start/stop</li>
                    <li>• Integrated functions</li>
                    <li>• Energy monitoring & targeting</li>
                  </ul>
                </div>
                <div className="p-3 bg-blue-900/30 border border-blue-700 rounded">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-blue-600 text-white rounded font-bold text-sm">Class B</span>
                    <span className="font-semibold text-blue-400">Advanced</span>
                  </div>
                  <ul className="text-sm space-y-1">
                    <li>• Scheduled time control</li>
                    <li>• Zone-based control</li>
                    <li>• Compensated control</li>
                    <li>• Some integration</li>
                    <li>• Basic energy monitoring</li>
                  </ul>
                </div>
                <div className="p-3 bg-amber-900/30 border border-amber-700 rounded">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-amber-600 text-white rounded font-bold text-sm">Class C</span>
                    <span className="font-semibold text-amber-400">Standard</span>
                  </div>
                  <ul className="text-sm space-y-1">
                    <li>• Basic automatic control</li>
                    <li>• Central time scheduling</li>
                    <li>• Limited zone control</li>
                    <li>• No integration</li>
                    <li>• Reference baseline</li>
                  </ul>
                </div>
                <div className="p-3 bg-red-900/30 border border-red-700 rounded">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-red-600 text-white rounded font-bold text-sm">Class D</span>
                    <span className="font-semibold text-red-400">Non-Energy Efficient</span>
                  </div>
                  <ul className="text-sm space-y-1">
                    <li>• Manual control only</li>
                    <li>• No central scheduling</li>
                    <li>• No automatic control</li>
                    <li>• No monitoring</li>
                    <li>• Below reference performance</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h4 className="font-semibold text-white mb-3">Typical Energy Savings by Class Upgrade</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-sm w-24">D → C:</span>
                  <div className="flex-1 bg-gray-700 rounded-full h-4">
                    <div className="bg-amber-500 h-4 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                  <span className="text-sm w-16 text-right">10-15%</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm w-24">C → B:</span>
                  <div className="flex-1 bg-gray-700 rounded-full h-4">
                    <div className="bg-blue-500 h-4 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                  <span className="text-sm w-16 text-right">15-25%</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm w-24">B → A:</span>
                  <div className="flex-1 bg-gray-700 rounded-full h-4">
                    <div className="bg-green-500 h-4 rounded-full" style={{ width: '20%' }}></div>
                  </div>
                  <span className="text-sm w-16 text-right">10-20%</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm w-24">D → A:</span>
                  <div className="flex-1 bg-gray-700 rounded-full h-4">
                    <div className="bg-elec-yellow h-4 rounded-full" style={{ width: '50%' }}></div>
                  </div>
                  <span className="text-sm w-16 text-right">40-50%</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Motor Efficiency Standards */}
        <section className="bg-[#2a2a2a] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-lg">
              4
            </div>
            <h2 className="text-xl font-semibold text-white">Motor Efficiency Standards (IE1-IE5)</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Motor efficiency classes are defined by IEC 60034-30-1 and enforced through the UK Ecodesign
              regulations. Electric motors account for approximately 70% of industrial electricity consumption,
              making efficiency standards crucial for energy reduction.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-lg font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                International Efficiency (IE) Classes
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left py-2 px-3 text-elec-yellow">Class</th>
                      <th className="text-left py-2 px-3 text-elec-yellow">Name</th>
                      <th className="text-left py-2 px-3 text-elec-yellow">Typical Efficiency (11kW)</th>
                      <th className="text-left py-2 px-3 text-elec-yellow">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-700">
                      <td className="py-2 px-3 font-bold text-red-400">IE1</td>
                      <td className="py-2 px-3">Standard Efficiency</td>
                      <td className="py-2 px-3">~87.6%</td>
                      <td className="py-2 px-3"><span className="text-red-400">Banned for new installations</span></td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2 px-3 font-bold text-amber-400">IE2</td>
                      <td className="py-2 px-3">High Efficiency</td>
                      <td className="py-2 px-3">~89.4%</td>
                      <td className="py-2 px-3"><span className="text-amber-400">Limited applications only</span></td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2 px-3 font-bold text-blue-400">IE3</td>
                      <td className="py-2 px-3">Premium Efficiency</td>
                      <td className="py-2 px-3">~91.4%</td>
                      <td className="py-2 px-3"><span className="text-blue-400">Minimum for 0.75-75kW</span></td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2 px-3 font-bold text-green-400">IE4</td>
                      <td className="py-2 px-3">Super Premium Efficiency</td>
                      <td className="py-2 px-3">~93.0%</td>
                      <td className="py-2 px-3"><span className="text-green-400">Minimum for 75-200kW</span></td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-bold text-elec-yellow">IE5</td>
                      <td className="py-2 px-3">Ultra Premium Efficiency</td>
                      <td className="py-2 px-3">~94.0%+</td>
                      <td className="py-2 px-3"><span className="text-elec-yellow">Best available technology</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
                <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                  <Factory className="w-4 h-4 text-elec-yellow" />
                  Current UK Requirements (2024)
                </h4>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                    <span>0.75kW - 75kW: Minimum IE3</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                    <span>75kW - 200kW: Minimum IE4</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                    <span>VSD-driven motors: May use IE2 in some cases</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                    <span>Hazardous area motors: Specific requirements apply</span>
                  </li>
                </ul>
              </div>
              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
                <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                  <Gauge className="w-4 h-4 text-elec-yellow" />
                  Cost-Benefit Example
                </h4>
                <p className="text-sm mb-2">30kW motor running 8,000 hours/year:</p>
                <ul className="text-sm space-y-1">
                  <li>• IE2 (90.1%): £21,240/year</li>
                  <li>• IE3 (92.1%): £20,826/year</li>
                  <li>• IE4 (93.6%): £20,513/year</li>
                  <li className="text-green-400 font-semibold">• IE2→IE4 savings: £727/year</li>
                  <li className="text-elec-yellow">• Typical payback: 2-3 years</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Inline Check 2 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 5: Lighting Standards */}
        <section className="bg-[#2a2a2a] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-lg">
              5
            </div>
            <h2 className="text-xl font-semibold text-white">Lighting Standards & Part L Building Regulations</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Lighting typically accounts for 15-25% of a building's electricity consumption. UK Building Regulations
              Part L sets minimum efficiency requirements, supported by various BS EN standards for design and performance.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-lg font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                Part L 2021 Lighting Requirements
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-white mb-2">Non-Domestic Buildings</h4>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Minimum 95 lumens/watt efficacy</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Automatic presence/absence detection required</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Daylight dimming in perimeter zones</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Constant illuminance control recommended</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Domestic Dwellings</h4>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>75% of fixed outlets must be energy efficient</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Minimum 75 lumens/watt for efficient fittings</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>External lighting requires PIR or daylight control</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>LED technology strongly recommended</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="font-semibold text-white mb-3">Related Standards</h3>
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <div className="p-3 bg-[#2a2a2a] rounded border border-gray-600">
                  <strong className="text-elec-yellow">BS EN 12464-1</strong>
                  <p>Lighting of indoor work places - light levels, uniformity, glare limits</p>
                </div>
                <div className="p-3 bg-[#2a2a2a] rounded border border-gray-600">
                  <strong className="text-elec-yellow">BS EN 12464-2</strong>
                  <p>Lighting of outdoor work places</p>
                </div>
                <div className="p-3 bg-[#2a2a2a] rounded border border-gray-600">
                  <strong className="text-elec-yellow">BS EN 15193</strong>
                  <p>Energy requirements for lighting - LENI calculation</p>
                </div>
                <div className="p-3 bg-[#2a2a2a] rounded border border-gray-600">
                  <strong className="text-elec-yellow">BS 5266</strong>
                  <p>Emergency lighting - design, installation, and maintenance</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-900/20 border border-blue-600 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-400">LENI Calculation</h4>
                  <p className="text-sm">
                    Lighting Energy Numeric Indicator (LENI) expressed in kWh/m²/year is the standard metric for
                    comparing lighting energy performance. Part L uses LENI values in building energy calculations,
                    with typical targets of 10-15 kWh/m²/year for well-designed office lighting.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Inline Check 3 */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 6: Integration and Compliance */}
        <section className="bg-[#2a2a2a] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-lg">
              6
            </div>
            <h2 className="text-xl font-semibold text-white">Standards Integration & Compliance Requirements</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Energy efficiency standards don't exist in isolation - they form an interconnected framework supporting
              UK regulatory requirements. Understanding how these standards integrate helps professionals deliver
              compliant, efficient solutions.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-lg font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                <ClipboardCheck className="w-5 h-5" />
                UK Compliance Framework
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-[#2a2a2a] rounded border border-gray-600">
                  <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-elec-yellow" />
                    ESOS (Energy Savings Opportunity Scheme)
                  </h4>
                  <ul className="text-sm space-y-1 ml-6">
                    <li>• Applies to large undertakings (250+ staff OR £44m+ turnover)</li>
                    <li>• Phase 3 deadline: 5 December 2023 (Phase 4: December 2027)</li>
                    <li>• Requires BS EN 16247 compliant audits OR ISO 50001 certification</li>
                    <li>• Must cover 90% minimum of total energy consumption</li>
                    <li>• Lead assessor must be registered with approved body</li>
                  </ul>
                </div>

                <div className="p-4 bg-[#2a2a2a] rounded border border-gray-600">
                  <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-elec-yellow" />
                    SECR (Streamlined Energy & Carbon Reporting)
                  </h4>
                  <ul className="text-sm space-y-1 ml-6">
                    <li>• Applies to quoted companies and large unquoted companies</li>
                    <li>• Annual disclosure of energy use and carbon emissions</li>
                    <li>• Requires at least one intensity ratio (e.g., kWh/m² or kgCO2/£revenue)</li>
                    <li>• Standards provide methodology for consistent measurement</li>
                  </ul>
                </div>

                <div className="p-4 bg-[#2a2a2a] rounded border border-gray-600">
                  <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-elec-yellow" />
                    Building Regulations Part L
                  </h4>
                  <ul className="text-sm space-y-1 ml-6">
                    <li>• Mandatory for all new buildings and significant refurbishments</li>
                    <li>• References multiple BS EN standards for calculations</li>
                    <li>• 2021 edition significantly tightened requirements</li>
                    <li>• Future Homes/Buildings Standard (2025) will increase stringency</li>
                  </ul>
                </div>

                <div className="p-4 bg-[#2a2a2a] rounded border border-gray-600">
                  <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-elec-yellow" />
                    MEES (Minimum Energy Efficiency Standards)
                  </h4>
                  <ul className="text-sm space-y-1 ml-6">
                    <li>• Commercial properties must achieve EPC Band E minimum</li>
                    <li>• EPC Band B target for 2030 (subject to consultation)</li>
                    <li>• EPCs calculated using BS EN ISO 52000 series methodology</li>
                    <li>• Non-compliance penalties up to £150,000</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="font-semibold text-white mb-3">Standards Integration Map</h3>
              <div className="relative overflow-x-auto">
                <div className="flex flex-col items-center space-y-2 text-sm">
                  <div className="p-3 bg-elec-yellow/20 border border-elec-yellow rounded-lg text-center w-full max-w-md">
                    <strong className="text-elec-yellow">UK REGULATORY REQUIREMENTS</strong>
                    <p className="text-xs mt-1">ESOS, SECR, Part L, MEES, Ecodesign</p>
                  </div>
                  <div className="text-elec-yellow">↓</div>
                  <div className="grid grid-cols-3 gap-2 w-full max-w-2xl">
                    <div className="p-2 bg-blue-900/30 border border-blue-600 rounded text-center">
                      <strong className="text-blue-400 text-xs">ISO 50001</strong>
                      <p className="text-xs">Energy Management</p>
                    </div>
                    <div className="p-2 bg-green-900/30 border border-green-600 rounded text-center">
                      <strong className="text-green-400 text-xs">BS EN 16247</strong>
                      <p className="text-xs">Energy Audits</p>
                    </div>
                    <div className="p-2 bg-purple-900/30 border border-purple-600 rounded text-center">
                      <strong className="text-purple-400 text-xs">BS EN 15232</strong>
                      <p className="text-xs">BACS Impact</p>
                    </div>
                  </div>
                  <div className="text-elec-yellow">↓</div>
                  <div className="grid grid-cols-2 gap-2 w-full max-w-lg">
                    <div className="p-2 bg-amber-900/30 border border-amber-600 rounded text-center">
                      <strong className="text-amber-400 text-xs">IEC 60034-30</strong>
                      <p className="text-xs">Motor Efficiency</p>
                    </div>
                    <div className="p-2 bg-cyan-900/30 border border-cyan-600 rounded text-center">
                      <strong className="text-cyan-400 text-xs">BS EN 12464/15193</strong>
                      <p className="text-xs">Lighting</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Reference Card */}
        <div className="bg-gradient-to-r from-elec-yellow/20 to-amber-600/20 rounded-lg p-6 border border-elec-yellow/50">
          <h3 className="text-xl font-bold text-elec-yellow mb-4 flex items-center gap-2">
            <Zap className="w-6 h-6" />
            Quick Reference: Key Standards Summary
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-[#1a1a1a]/80 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">Management & Auditing</h4>
              <ul className="text-sm space-y-2 text-gray-300">
                <li><strong className="text-elec-yellow">ISO 50001:</strong> Energy Management System framework (PDCA cycle)</li>
                <li><strong className="text-elec-yellow">BS EN 16247-1 to 5:</strong> Energy audit requirements and methodology</li>
                <li><strong className="text-elec-yellow">BS EN ISO 52000:</strong> Energy performance of buildings (EPCs)</li>
              </ul>
            </div>
            <div className="bg-[#1a1a1a]/80 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">Building Systems</h4>
              <ul className="text-sm space-y-2 text-gray-300">
                <li><strong className="text-elec-yellow">BS EN 15232:</strong> BACS efficiency classes (A-D)</li>
                <li><strong className="text-elec-yellow">BS EN 12464:</strong> Workplace lighting requirements</li>
                <li><strong className="text-elec-yellow">BS EN 15193:</strong> LENI lighting energy calculation</li>
              </ul>
            </div>
            <div className="bg-[#1a1a1a]/80 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">Equipment Efficiency</h4>
              <ul className="text-sm space-y-2 text-gray-300">
                <li><strong className="text-elec-yellow">IEC 60034-30:</strong> Motor efficiency classes IE1-IE5</li>
                <li><strong className="text-elec-yellow">Current minimum:</strong> IE3 (0.75-75kW), IE4 (75-200kW)</li>
                <li><strong className="text-elec-yellow">Part L 2021:</strong> 95 lm/W minimum lighting efficacy</li>
              </ul>
            </div>
            <div className="bg-[#1a1a1a]/80 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">Key Compliance Points</h4>
              <ul className="text-sm space-y-2 text-gray-300">
                <li><strong className="text-elec-yellow">ESOS:</strong> Large organisations - ISO 50001 or BS EN 16247 audit</li>
                <li><strong className="text-elec-yellow">MEES:</strong> Minimum EPC Band E for commercial lettings</li>
                <li><strong className="text-elec-yellow">Part L:</strong> All new builds and major refurbishments</li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <section className="bg-[#2a2a2a] rounded-lg p-6 border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-4">Frequently Asked Questions</h3>
          <div className="space-y-2">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-600 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-4 text-left bg-[#1a1a1a] hover:bg-[#252525] transition-colors min-h-[44px] touch-manipulation"
                >
                  <span className="font-medium text-white pr-4">{faq.question}</span>
                  {expandedFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-elec-yellow flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-elec-yellow flex-shrink-0" />
                  )}
                </button>
                {expandedFAQ === index && (
                  <div className="p-4 bg-[#1a1a1a]/50 border-t border-gray-600">
                    <p className="text-gray-300">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Quiz Section */}
        <section className="bg-[#2a2a2a] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">Section Quiz</h3>
            {!showQuiz && (
              <Button
                onClick={() => setShowQuiz(true)}
                className="bg-elec-yellow text-[#1a1a1a] hover:bg-yellow-500 min-h-[44px] touch-manipulation"
              >
                Start Quiz
              </Button>
            )}
          </div>
          {showQuiz ? (
            <Quiz
              questions={quizQuestions}
              onComplete={(score) => {
                console.log(`Quiz completed with score: ${score}/${quizQuestions.length}`);
              }}
            />
          ) : (
            <p className="text-gray-300">
              Test your understanding of BS EN and ISO standards with this 10-question quiz.
              You'll need to achieve at least 70% to pass.
            </p>
          )}
        </section>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-gray-700">
          <Button
            onClick={() => navigate('/upskilling/energy-efficiency/module-1/section-3')}
            variant="outline"
            className="flex items-center gap-2 border-gray-600 text-white hover:bg-[#2a2a2a] min-h-[44px] touch-manipulation"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Previous: Section 3</span>
          </Button>
          <Button
            onClick={() => navigate('/upskilling/energy-efficiency/module-2')}
            className="flex items-center gap-2 bg-elec-yellow text-[#1a1a1a] hover:bg-yellow-500 min-h-[44px] touch-manipulation"
          >
            <span>Next: Module 2</span>
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EnergyEfficiencyModule1Section4;
