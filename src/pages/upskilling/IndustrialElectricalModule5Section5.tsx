import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { useSEO } from '@/hooks/useSEO';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Search,
  FileText,
  AlertTriangle,
  BookOpen,
  Target,
  CheckCircle2,
  ClipboardCheck,
  GitBranch,
  Lightbulb,
  Database,
  Shield,
  TrendingUp,
  FileCheck,
  Users,
  FolderOpen,
} from 'lucide-react';

// Quick Check Questions for InlineCheck component
const quickCheckQuestions = [
  {
    id: 'qc-m5s5-1',
    question:
      'When using the 5 Whys technique, a maintenance electrician investigating a motor overload trip finds: Why 1 - Motor overloaded. Why 2 - Bearing seized. Why 3 - Lack of lubrication. Why 4 - Lubrication schedule not followed. What should "Why 5" investigate?',
    options: [
      'Who failed to lubricate the bearing',
      'Why the lubrication schedule was not followed',
      'What brand of lubricant to use',
      'How much the new bearing will cost',
    ],
    correctIndex: 1,
    explanation:
      'The 5 Whys technique aims to find the root cause, not assign blame. "Why 5" should investigate the systemic reason the schedule was not followed - perhaps the maintenance management system failed to generate work orders, staff were not trained on the schedule, or resources were insufficient. This leads to preventive actions that stop recurrence.',
  },
  {
    id: 'qc-m5s5-2',
    question:
      'When constructing a Fishbone (Ishikawa) diagram for an electrical fault, which category would "inadequate training on new VSD commissioning" fall under?',
    options: [
      'Machine/Equipment',
      'Method/Procedure',
      'Manpower/People',
      'Material',
    ],
    correctIndex: 2,
    explanation:
      'Training-related issues fall under the "Manpower" or "People" category in a Fishbone diagram. This category covers competence, training, experience, staffing levels, and human factors. Method/Procedure would cover the commissioning procedure itself, while Machine/Equipment would cover the VSD hardware.',
  },
  {
    id: 'qc-m5s5-3',
    question:
      'A fault report states: "Replaced contactor - now working." What critical information is missing that could prevent effective root cause analysis?',
    options: [
      'The part number of the new contactor',
      'Why the original contactor failed and what caused the failure',
      'The time taken to complete the repair',
      'The name of the supervisor who approved the work',
    ],
    correctIndex: 1,
    explanation:
      'Effective fault reports must capture the root cause, not just the repair action. Without knowing why the contactor failed (coil burnout due to overvoltage, contact welding from high inrush, mechanical failure from vibration), the same failure will likely recur. This information enables corrective actions that address the underlying cause.',
  },
];

// Quiz Questions
const quizQuestions = [
  {
    question:
      'What is the primary purpose of root cause analysis (RCA) in industrial electrical maintenance?',
    options: [
      'To identify who made a mistake',
      'To prevent fault recurrence by identifying and addressing underlying causes',
      'To complete paperwork requirements',
      'To justify equipment replacement costs',
    ],
    correctAnswer:
      'To prevent fault recurrence by identifying and addressing underlying causes',
  },
  {
    question:
      'In the 5 Whys technique, what indicates you have reached the root cause?',
    options: [
      'You have asked exactly five questions',
      'You have identified a person responsible',
      'Further "why" questions lead to factors outside your control or reveal a systemic issue',
      'The equipment is now working again',
    ],
    correctAnswer:
      'Further "why" questions lead to factors outside your control or reveal a systemic issue',
  },
  {
    question:
      'Which Fishbone diagram category would "incorrect cable size specified on drawing" belong to?',
    options: [
      'Manpower',
      'Material',
      'Method',
      'Machine',
    ],
    correctAnswer: 'Method',
  },
  {
    question:
      'In Fault Tree Analysis (FTA), what does an OR gate represent?',
    options: [
      'All input events must occur simultaneously for the output event',
      'Any single input event can independently cause the output event',
      'The probability of the output event occurring',
      'A basic event that cannot be further analysed',
    ],
    correctAnswer:
      'Any single input event can independently cause the output event',
  },
  {
    question:
      'According to UK best practice, what should a fault report include as a minimum?',
    options: [
      'Fault symptoms, root cause, repair action, and recommendations to prevent recurrence',
      'Only the repair action and parts used',
      'The name of the person who caused the fault',
      'A full equipment history going back five years',
    ],
    correctAnswer:
      'Fault symptoms, root cause, repair action, and recommendations to prevent recurrence',
  },
  {
    question:
      'What does CAPA stand for in maintenance management?',
    options: [
      'Computer-Aided Problem Analysis',
      'Corrective Action and Preventive Action',
      'Centralised Asset Performance Assessment',
      'Continuous Automated Process Adjustment',
    ],
    correctAnswer: 'Corrective Action and Preventive Action',
  },
  {
    question:
      'Which is an example of a preventive action rather than a corrective action?',
    options: [
      'Replacing a failed motor bearing',
      'Adding bearing condition monitoring to all similar motors to detect early wear',
      'Resetting the overload relay after a trip',
      'Tightening a loose connection that caused overheating',
    ],
    correctAnswer:
      'Adding bearing condition monitoring to all similar motors to detect early wear',
  },
  {
    question:
      'What is the primary benefit of integrating RCA findings into a CMMS?',
    options: [
      'It reduces the amount of paperwork',
      'It creates searchable knowledge that improves future fault diagnosis and maintenance planning',
      'It automatically repairs faults',
      'It eliminates the need for skilled electricians',
    ],
    correctAnswer:
      'It creates searchable knowledge that improves future fault diagnosis and maintenance planning',
  },
  {
    question:
      'A "lessons learned" session after a significant electrical failure should focus primarily on:',
    options: [
      'Disciplining those responsible for the failure',
      'Identifying systemic improvements to prevent similar failures',
      'Calculating the exact cost of the downtime',
      'Updating equipment warranties',
    ],
    correctAnswer:
      'Identifying systemic improvements to prevent similar failures',
  },
  {
    question:
      'When conducting RCA for an intermittent fault, which approach is most appropriate?',
    options: [
      'Wait until the fault becomes permanent before investigating',
      'Replace all components in the circuit',
      'Gather data over time, look for patterns, and correlate with environmental or operational conditions',
      'Assume it is not a real fault if it does not happen during testing',
    ],
    correctAnswer:
      'Gather data over time, look for patterns, and correlate with environmental or operational conditions',
  },
];

// FAQ Data
const faqData = [
  {
    question: 'How do I know when I have found the true root cause?',
    answer:
      'You have likely found the root cause when: 1) Asking "why" again leads to factors genuinely outside your control (such as acts of nature) or to systemic/organizational issues. 2) Addressing the identified cause would logically prevent recurrence of the original problem. 3) Multiple causal chains converge on the same underlying issue. 4) Subject matter experts agree the cause is fundamental rather than symptomatic. Be cautious of stopping too early - "component failed" is rarely the root cause. Ask why it failed, why the failure was not detected earlier, and why protective measures did not prevent the impact.',
  },
  {
    question:
      'What is the difference between a corrective action and a preventive action?',
    answer:
      'A corrective action addresses an existing problem - it fixes or replaces the failed component and returns the system to operation. For example, replacing a burnt-out motor. A preventive action addresses the underlying cause to prevent the problem from recurring - either on this equipment or similar equipment. For example, implementing a condition monitoring programme to detect bearing wear before failure, or modifying the motor selection criteria to prevent undersizing. Both are valuable, but preventive actions deliver greater long-term benefits by eliminating repeat failures.',
  },
  {
    question:
      'How detailed should fault reports be in a busy industrial environment?',
    answer:
      'Fault reports should capture essential information efficiently without creating excessive administrative burden. At minimum, include: equipment ID, date/time, symptoms observed, tests performed, root cause identified, repair action taken, parts used, and recommendations. Use structured forms with dropdown selections where possible. The goal is to create searchable, useful data - a brief but complete report is more valuable than no report due to time pressure. Many sites use tablet-based CMMS entry that takes 2-3 minutes. The time investment pays back through faster future diagnosis and better maintenance planning.',
  },
  {
    question:
      'When should I escalate a fault for formal RCA rather than standard repair?',
    answer:
      'Consider formal RCA when: 1) Safety incident occurred or was narrowly avoided. 2) Significant production loss (define threshold for your site). 3) Same fault has recurred three or more times. 4) Root cause is not immediately obvious. 5) Multiple systems or departments affected. 6) Regulatory compliance implications. 7) High repair cost or long lead-time parts involved. 8) The fault reveals a potential systemic issue. Your site should have defined criteria - typically any safety event or loss exceeding a specified value triggers formal investigation. Do not wait for management instruction if safety is involved.',
  },
  {
    question:
      'How can I contribute to continuous improvement as a maintenance electrician?',
    answer:
      'Every fault you investigate is an improvement opportunity. Document your findings thoroughly, even for routine repairs. Suggest preventive actions when you identify systemic issues. Share knowledge with colleagues - informal discussions often prevent others making the same mistakes. Participate in RCA sessions and lessons learned reviews. Report near-misses and potential hazards before they cause failures. Suggest improvements to maintenance procedures based on field experience. Feed back on equipment reliability to inform procurement decisions. Track which equipment gives repeated problems - this data drives replacement priorities.',
  },
  {
    question:
      'What tools can help with root cause analysis beyond paper-based methods?',
    answer:
      'Modern RCA is supported by: 1) CMMS software (Maximo, SAP PM, Maintenance Connection) for tracking fault history, parts usage, and work orders. 2) Data analytics platforms that identify patterns in failure data. 3) Condition monitoring systems (vibration analysis, thermal imaging, power quality meters) that provide diagnostic data. 4) Specialised RCA software (TapRooT, Sologic, Apollo) for structured investigation. 5) Digital collaboration tools for cross-functional RCA teams. 6) Mobile apps for rapid field data capture. The best tool is one your team will actually use consistently - often a well-designed spreadsheet outperforms expensive software that sits unused.',
  },
];

const IndustrialElectricalModule5Section5: React.FC = () => {
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // SEO Configuration
  useSEO({
    title:
      'Root Cause Analysis and Reporting | Industrial Electrical Module 5 Section 5',
    description:
      'Master root cause analysis techniques for electrical faults including 5 Whys, Fishbone diagrams, fault tree analysis, professional report writing, CAPA implementation, and knowledge management for continuous improvement.',
    keywords: [
      'root cause analysis',
      '5 whys technique',
      'fishbone diagram',
      'Ishikawa diagram',
      'fault tree analysis',
      'CAPA',
      'corrective action',
      'preventive action',
      'fault reporting',
      'CMMS integration',
      'lessons learned',
      'continuous improvement',
      'industrial electrical maintenance',
    ],
    canonicalUrl: '/upskilling/industrial-electrical/module-5/section-5',
    ogType: 'article',
  });

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-2 text-elec-yellow mb-2">
            <Search className="w-5 h-5" />
            <span className="text-sm font-medium uppercase tracking-wider">
              Module 5 - Section 5
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Root Cause Analysis and Reporting
          </h1>
          <p className="text-gray-400 text-lg">
            Transform fault data into lasting improvements through systematic
            analysis and professional documentation
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Learning Objectives */}
        <div className="bg-[#242424] rounded-xl p-6 mb-8 border border-gray-800">
          <div className="flex items-start gap-4">
            <div className="bg-elec-yellow/20 p-3 rounded-lg">
              <Target className="w-6 h-6 text-elec-yellow" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Learning Objectives</h2>
              <ul className="text-gray-300 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>
                    Apply the 5 Whys technique to identify true root causes of
                    electrical faults
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>
                    Construct Fishbone (Ishikawa) diagrams for systematic cause
                    analysis
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>
                    Understand fault tree analysis basics for complex failure
                    scenarios
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>
                    Write effective fault reports that support continuous
                    improvement
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>
                    Implement corrective and preventive actions (CAPA)
                    effectively
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>
                    Contribute to knowledge management and lessons learned
                    processes
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 1: 5 Whys Analysis Technique */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-black w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
              1
            </div>
            <h2 className="text-2xl font-bold">5 Whys Analysis Technique</h2>
          </div>

          <div className="bg-[#242424] rounded-xl p-6 border border-gray-800 space-y-4">
            <p className="text-gray-300 leading-relaxed">
              The 5 Whys is a simple yet powerful technique developed by Toyota
              for root cause analysis. By repeatedly asking "why" a problem
              occurred, you drill down through symptoms to uncover the underlying
              cause. Despite its simplicity, this method is highly effective for
              most electrical fault investigations.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-5 border border-gray-700">
              <h3 className="text-lg font-semibold text-elec-yellow mb-4 flex items-center gap-2">
                <GitBranch className="w-5 h-5" />
                5 Whys Example: VSD Failure
              </h3>

              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-[#2a2a2a] p-3 rounded-lg">
                  <div className="bg-elec-yellow text-black w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <p className="text-white font-medium">Why did the VSD fail?</p>
                    <p className="text-gray-400 text-sm">
                      The DC bus capacitors failed due to overheating
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-[#2a2a2a] p-3 rounded-lg">
                  <div className="bg-elec-yellow text-black w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <p className="text-white font-medium">
                      Why did the capacitors overheat?
                    </p>
                    <p className="text-gray-400 text-sm">
                      Cooling fan in the VSD enclosure had stopped working
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-[#2a2a2a] p-3 rounded-lg">
                  <div className="bg-elec-yellow text-black w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <p className="text-white font-medium">
                      Why had the cooling fan stopped?
                    </p>
                    <p className="text-gray-400 text-sm">
                      Fan bearings had seized due to dust accumulation
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-[#2a2a2a] p-3 rounded-lg">
                  <div className="bg-elec-yellow text-black w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <p className="text-white font-medium">
                      Why was there excessive dust in the enclosure?
                    </p>
                    <p className="text-gray-400 text-sm">
                      Air filters had not been replaced for over two years
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-[#2a2a2a] p-3 rounded-lg border-2 border-elec-yellow">
                  <div className="bg-elec-yellow text-black w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    5
                  </div>
                  <div>
                    <p className="text-white font-medium">
                      Why were the filters not replaced?
                    </p>
                    <p className="text-gray-400 text-sm">
                      No preventive maintenance schedule existed for VSD filter
                      replacement
                    </p>
                    <p className="text-elec-yellow text-sm mt-1">
                      Root Cause: Missing PM task in maintenance schedule
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-900/30 border border-green-600/50 rounded-lg p-4">
                <h4 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  5 Whys Best Practices
                </h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>- Focus on process and system failures, not people</li>
                  <li>- Use facts and data, not assumptions</li>
                  <li>- Five is a guideline, not a rule - stop at the root</li>
                  <li>- Involve those with direct knowledge of the fault</li>
                  <li>- Document each step for future reference</li>
                </ul>
              </div>

              <div className="bg-red-900/30 border border-red-600/50 rounded-lg p-4">
                <h4 className="font-semibold text-red-400 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Common 5 Whys Mistakes
                </h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>- Stopping at "component failed" without asking why</li>
                  <li>- Assigning blame to individuals</li>
                  <li>- Making assumptions without evidence</li>
                  <li>- Following only one causal chain</li>
                  <li>- Accepting "human error" as root cause</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-900/30 border border-blue-600/50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-blue-400">
                    Pro Tip: Multiple Causal Chains
                  </h4>
                  <p className="text-gray-300 text-sm">
                    Complex failures often have multiple contributing causes. When
                    your "why" question has more than one valid answer, branch the
                    analysis to follow each path. The true root cause may be where
                    multiple chains converge, or there may be several root causes
                    that each need addressing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Fishbone (Ishikawa) Diagrams */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-black w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
              2
            </div>
            <h2 className="text-2xl font-bold">Fishbone (Ishikawa) Diagrams</h2>
          </div>

          <div className="bg-[#242424] rounded-xl p-6 border border-gray-800 space-y-4">
            <p className="text-gray-300 leading-relaxed">
              The Fishbone diagram, also called an Ishikawa or cause-and-effect
              diagram, provides a structured framework for brainstorming potential
              causes of a problem. It organises causes into categories, ensuring
              comprehensive analysis without overlooking important factors.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-5 border border-gray-700">
              <h3 className="text-lg font-semibold text-elec-yellow mb-4">
                The 6M Categories for Industrial Electrical Analysis
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-[#2a2a2a] p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-400 mb-2">
                    Machine / Equipment
                  </h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>- Equipment age and condition</li>
                    <li>- Design limitations</li>
                    <li>- Component quality</li>
                    <li>- Wear and degradation</li>
                    <li>- Installation issues</li>
                  </ul>
                </div>

                <div className="bg-[#2a2a2a] p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-400 mb-2">
                    Method / Procedure
                  </h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>- Operating procedures</li>
                    <li>- Maintenance procedures</li>
                    <li>- Work instructions</li>
                    <li>- Documentation accuracy</li>
                    <li>- Drawings and specifications</li>
                  </ul>
                </div>

                <div className="bg-[#2a2a2a] p-4 rounded-lg">
                  <h4 className="font-semibold text-green-400 mb-2">
                    Manpower / People
                  </h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>- Training and competence</li>
                    <li>- Experience level</li>
                    <li>- Workload and fatigue</li>
                    <li>- Communication</li>
                    <li>- Supervision</li>
                  </ul>
                </div>

                <div className="bg-[#2a2a2a] p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-400 mb-2">Material</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>- Component specifications</li>
                    <li>- Spare parts quality</li>
                    <li>- Consumables (cables, fuses)</li>
                    <li>- Supplier issues</li>
                    <li>- Storage conditions</li>
                  </ul>
                </div>

                <div className="bg-[#2a2a2a] p-4 rounded-lg">
                  <h4 className="font-semibold text-red-400 mb-2">
                    Measurement / Data
                  </h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>- Test equipment accuracy</li>
                    <li>- Calibration status</li>
                    <li>- Parameter settings</li>
                    <li>- Protection relay settings</li>
                    <li>- Data interpretation</li>
                  </ul>
                </div>

                <div className="bg-[#2a2a2a] p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-400 mb-2">
                    Mother Nature / Environment
                  </h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>- Temperature extremes</li>
                    <li>- Humidity and moisture</li>
                    <li>- Dust and contamination</li>
                    <li>- Vibration</li>
                    <li>- Electrical interference</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-5 border border-gray-700">
              <h3 className="text-lg font-semibold text-elec-yellow mb-4">
                Constructing a Fishbone Diagram
              </h3>

              <ol className="text-gray-300 space-y-3">
                <li className="flex items-start gap-3">
                  <span className="bg-elec-yellow text-black w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    1
                  </span>
                  <span>
                    <strong>Define the problem</strong> - Write the effect (fault)
                    clearly at the "head" of the fish. Be specific: "Motor M-101
                    tripped on overload" not just "Motor problem".
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-elec-yellow text-black w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    2
                  </span>
                  <span>
                    <strong>Draw the backbone</strong> - Create the main horizontal
                    line with angled lines (bones) for each category relevant to
                    your analysis.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-elec-yellow text-black w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    3
                  </span>
                  <span>
                    <strong>Brainstorm causes</strong> - For each category, identify
                    potential causes. Add smaller bones for sub-causes. Involve the
                    team who know the equipment.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-elec-yellow text-black w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    4
                  </span>
                  <span>
                    <strong>Analyse and prioritise</strong> - Review all potential
                    causes, gather evidence, and identify the most likely root
                    causes for further investigation.
                  </span>
                </li>
              </ol>
            </div>

            <div className="bg-amber-900/30 border border-amber-600/50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-amber-400">
                    When to Use Fishbone Diagrams
                  </h4>
                  <p className="text-gray-300 text-sm">
                    Fishbone diagrams are most valuable for complex problems where
                    the cause is not immediately obvious, when team brainstorming
                    would add value, or when you want to ensure comprehensive
                    analysis. For straightforward faults where the cause is clear,
                    the 5 Whys alone may be sufficient. Use the right tool for the
                    complexity of the problem.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Check 1 */}
        <div className="mb-10">
          <InlineCheck
            id={quickCheckQuestions[0].id}
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
        </div>

        {/* Section 3: Fault Tree Analysis Basics */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-black w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
              3
            </div>
            <h2 className="text-2xl font-bold">Fault Tree Analysis Basics</h2>
          </div>

          <div className="bg-[#242424] rounded-xl p-6 border border-gray-800 space-y-4">
            <p className="text-gray-300 leading-relaxed">
              Fault Tree Analysis (FTA) is a top-down, deductive analysis method
              that uses Boolean logic to identify how combinations of events can
              lead to a system failure. While more complex than 5 Whys or Fishbone
              diagrams, FTA is powerful for analysing safety-critical systems and
              complex failure scenarios.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-5 border border-gray-700">
              <h3 className="text-lg font-semibold text-elec-yellow mb-4">
                Fault Tree Symbols
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-[#2a2a2a] p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-8 border-2 border-blue-400 rounded-sm flex items-center justify-center text-blue-400 text-xs font-bold">
                      AND
                    </div>
                    <h4 className="font-semibold text-white">AND Gate</h4>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Output occurs only when ALL input events occur simultaneously.
                    Example: Motor starts only when start button pressed AND
                    interlocks satisfied AND overload reset.
                  </p>
                </div>

                <div className="bg-[#2a2a2a] p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-8 border-2 border-green-400 rounded-sm flex items-center justify-center text-green-400 text-xs font-bold">
                      OR
                    </div>
                    <h4 className="font-semibold text-white">OR Gate</h4>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Output occurs when ANY input event occurs. Example: Motor stops
                    if stop button pressed OR overload trips OR emergency stop
                    activated.
                  </p>
                </div>

                <div className="bg-[#2a2a2a] p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 border-2 border-orange-400 rounded-full flex items-center justify-center text-orange-400 text-xs font-bold">
                      B
                    </div>
                    <h4 className="font-semibold text-white">Basic Event</h4>
                  </div>
                  <p className="text-gray-400 text-sm">
                    A fundamental event that cannot be further developed (bottom of
                    analysis). Example: Fuse fails, cable breaks, contact welds.
                  </p>
                </div>

                <div className="bg-[#2a2a2a] p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 border-2 border-red-400 flex items-center justify-center text-red-400 text-xs font-bold">
                      T
                    </div>
                    <h4 className="font-semibold text-white">Top Event</h4>
                  </div>
                  <p className="text-gray-400 text-sm">
                    The undesired event being analysed (top of the tree). Example:
                    Complete loss of power to critical process, fire in MCC.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-5 border border-gray-700">
              <h3 className="text-lg font-semibold text-elec-yellow mb-4">
                Simplified FTA Example: Loss of Motor Operation
              </h3>

              <div className="bg-[#2a2a2a] p-4 rounded-lg">
                <div className="text-center space-y-4">
                  <div className="bg-red-600/20 border border-red-500 rounded p-3 max-w-xs mx-auto">
                    <p className="text-red-400 font-semibold">TOP EVENT</p>
                    <p className="text-white text-sm">Motor Fails to Run</p>
                  </div>

                  <div className="text-gray-500">|</div>

                  <div className="bg-green-600/20 border border-green-500 rounded p-2 w-16 mx-auto">
                    <p className="text-green-400 text-sm font-bold">OR</p>
                  </div>

                  <div className="flex justify-center gap-8">
                    <div className="text-gray-500">|</div>
                    <div className="text-gray-500">|</div>
                    <div className="text-gray-500">|</div>
                  </div>

                  <div className="flex justify-center gap-4 flex-wrap">
                    <div className="bg-orange-600/20 border border-orange-500 rounded p-2 text-xs">
                      <p className="text-orange-400">No Power Supply</p>
                    </div>
                    <div className="bg-orange-600/20 border border-orange-500 rounded p-2 text-xs">
                      <p className="text-orange-400">Control Fault</p>
                    </div>
                    <div className="bg-orange-600/20 border border-orange-500 rounded p-2 text-xs">
                      <p className="text-orange-400">Motor Fault</p>
                    </div>
                  </div>
                </div>

                <p className="text-gray-400 text-sm mt-4 text-center">
                  Each branch can be further developed with AND/OR gates down to
                  basic events
                </p>
              </div>
            </div>

            <div className="bg-blue-900/30 border border-blue-600/50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-blue-400">
                    When to Use Fault Tree Analysis
                  </h4>
                  <p className="text-gray-300 text-sm">
                    FTA is most valuable for: safety-critical system analysis,
                    complex failures with multiple potential cause combinations,
                    reliability engineering and failure probability calculations,
                    and regulatory compliance documentation. For routine electrical
                    faults, simpler methods like 5 Whys are usually sufficient. FTA
                    requires training to apply correctly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Writing Effective Fault Reports */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-black w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
              4
            </div>
            <h2 className="text-2xl font-bold">Writing Effective Fault Reports</h2>
          </div>

          <div className="bg-[#242424] rounded-xl p-6 border border-gray-800 space-y-4">
            <p className="text-gray-300 leading-relaxed">
              A well-written fault report transforms a repair into organisational
              learning. It captures the knowledge gained during fault
              investigation, enabling faster diagnosis of future similar faults
              and providing data for reliability improvement. Poor reports waste
              the diagnostic effort.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-5 border border-gray-700">
              <h3 className="text-lg font-semibold text-elec-yellow mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Essential Fault Report Elements
              </h3>

              <div className="space-y-4">
                <div className="bg-[#2a2a2a] p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">
                    1. Identification Information
                  </h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>
                      - Equipment tag/ID and description (e.g., "M-101 Pump Motor")
                    </li>
                    <li>- Location within the facility</li>
                    <li>- Date and time fault reported/occurred</li>
                    <li>- Work order or job reference number</li>
                    <li>- Reported by (operator name/shift)</li>
                  </ul>
                </div>

                <div className="bg-[#2a2a2a] p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">
                    2. Fault Description
                  </h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>
                      - Symptoms observed (what the equipment was/was not doing)
                    </li>
                    <li>- Operating conditions when fault occurred</li>
                    <li>- Any alarms, trips, or error codes displayed</li>
                    <li>- Impact on production or safety</li>
                    <li>- Any changes or events preceding the fault</li>
                  </ul>
                </div>

                <div className="bg-[#2a2a2a] p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">
                    3. Investigation and Diagnosis
                  </h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>- Tests performed and results</li>
                    <li>- Measurements taken (include values)</li>
                    <li>- What was found (physical observations)</li>
                    <li>- Root cause identified</li>
                    <li>- Diagnostic method used (5 Whys, etc.)</li>
                  </ul>
                </div>

                <div className="bg-[#2a2a2a] p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">
                    4. Repair Actions
                  </h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>- What was repaired or replaced</li>
                    <li>- Parts used (part numbers, quantities)</li>
                    <li>- Special procedures or precautions taken</li>
                    <li>- Post-repair testing and results</li>
                    <li>- Time to repair (labour hours)</li>
                  </ul>
                </div>

                <div className="bg-[#2a2a2a] p-4 rounded-lg border-2 border-elec-yellow">
                  <h4 className="font-semibold text-elec-yellow mb-2">
                    5. Recommendations (Critical!)
                  </h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>- Actions to prevent recurrence</li>
                    <li>- Similar equipment that may be at risk</li>
                    <li>- Maintenance schedule changes needed</li>
                    <li>- Spare parts stocking recommendations</li>
                    <li>- Training or procedure updates required</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-900/30 border border-green-600/50 rounded-lg p-4">
                <h4 className="font-semibold text-green-400 mb-2">
                  Good Report Example
                </h4>
                <p className="text-gray-300 text-sm">
                  "Contactor K3 failed to energise. Coil measured open circuit
                  (infinite resistance vs. normal 45 ohms). Coil showed signs of
                  overheating - insulation discoloured. Root cause: Control
                  transformer tap set incorrectly, supplying 130V to 110V coil.
                  Replaced contactor, corrected transformer tap setting.
                  Recommendation: Verify transformer tap settings on all MCCs
                  during next PM."
                </p>
              </div>

              <div className="bg-red-900/30 border border-red-600/50 rounded-lg p-4">
                <h4 className="font-semibold text-red-400 mb-2">
                  Poor Report Example
                </h4>
                <p className="text-gray-300 text-sm">
                  "Motor would not start. Replaced contactor. Working now."
                </p>
                <p className="text-gray-400 text-xs mt-2">
                  This tells us nothing about why it failed, does not help
                  diagnose future similar faults, and provides no prevention
                  recommendations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Check 2 */}
        <div className="mb-10">
          <InlineCheck
            id={quickCheckQuestions[1].id}
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
        </div>

        {/* Section 5: Corrective and Preventive Actions (CAPA) */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-black w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
              5
            </div>
            <h2 className="text-2xl font-bold">
              Corrective and Preventive Actions (CAPA)
            </h2>
          </div>

          <div className="bg-[#242424] rounded-xl p-6 border border-gray-800 space-y-4">
            <p className="text-gray-300 leading-relaxed">
              CAPA is a structured approach to addressing problems that goes
              beyond simply fixing faults. It ensures that both the immediate
              issue is corrected and steps are taken to prevent recurrence. CAPA
              is a cornerstone of quality management systems and continuous
              improvement.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-5 border border-gray-700">
              <h3 className="text-lg font-semibold text-elec-yellow mb-4 flex items-center gap-2">
                <ClipboardCheck className="w-5 h-5" />
                Understanding Corrective vs. Preventive Actions
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-[#2a2a2a] p-4 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-semibold text-blue-400 mb-2">
                    Corrective Action
                  </h4>
                  <p className="text-gray-300 text-sm mb-3">
                    Action taken to eliminate the cause of a detected
                    nonconformity or undesirable situation to prevent recurrence.
                  </p>
                  <ul className="text-gray-400 text-sm space-y-1">
                    <li>- Addresses existing problems</li>
                    <li>- Reacts to failures that have occurred</li>
                    <li>- Aims to prevent THIS fault recurring</li>
                  </ul>
                  <div className="mt-3 p-2 bg-[#1a1a1a] rounded text-xs text-gray-300">
                    <strong>Example:</strong> After a cable overheated due to
                    undersizing, replace with correct size cable and update the
                    design standard to prevent the same error.
                  </div>
                </div>

                <div className="bg-[#2a2a2a] p-4 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-semibold text-green-400 mb-2">
                    Preventive Action
                  </h4>
                  <p className="text-gray-300 text-sm mb-3">
                    Action taken to eliminate the cause of a potential
                    nonconformity or undesirable situation to prevent occurrence.
                  </p>
                  <ul className="text-gray-400 text-sm space-y-1">
                    <li>- Addresses potential problems</li>
                    <li>- Proactive approach before failure</li>
                    <li>- Aims to prevent SIMILAR faults occurring</li>
                  </ul>
                  <div className="mt-3 p-2 bg-[#1a1a1a] rounded text-xs text-gray-300">
                    <strong>Example:</strong> After the cable failure above, audit
                    all similar installations for undersized cables before they
                    fail.
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-5 border border-gray-700">
              <h3 className="text-lg font-semibold text-elec-yellow mb-4">
                CAPA Process Flow
              </h3>

              <div className="space-y-3">
                <div className="flex items-start gap-4 bg-[#2a2a2a] p-4 rounded-lg">
                  <div className="text-2xl font-bold text-elec-yellow">1</div>
                  <div>
                    <p className="text-white font-medium">Identify and Document</p>
                    <p className="text-gray-400 text-sm">
                      Record the nonconformity or potential issue clearly. Gather
                      all relevant data and evidence.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-[#2a2a2a] p-4 rounded-lg">
                  <div className="text-2xl font-bold text-elec-yellow">2</div>
                  <div>
                    <p className="text-white font-medium">Immediate Containment</p>
                    <p className="text-gray-400 text-sm">
                      Take immediate action to contain the problem and prevent
                      further impact while investigation proceeds.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-[#2a2a2a] p-4 rounded-lg">
                  <div className="text-2xl font-bold text-elec-yellow">3</div>
                  <div>
                    <p className="text-white font-medium">Root Cause Analysis</p>
                    <p className="text-gray-400 text-sm">
                      Apply appropriate RCA techniques (5 Whys, Fishbone, FTA) to
                      identify the true root cause.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-[#2a2a2a] p-4 rounded-lg">
                  <div className="text-2xl font-bold text-elec-yellow">4</div>
                  <div>
                    <p className="text-white font-medium">
                      Define and Implement Actions
                    </p>
                    <p className="text-gray-400 text-sm">
                      Develop specific, measurable actions with assigned owners and
                      deadlines. Implement the actions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-[#2a2a2a] p-4 rounded-lg">
                  <div className="text-2xl font-bold text-elec-yellow">5</div>
                  <div>
                    <p className="text-white font-medium">Verify Effectiveness</p>
                    <p className="text-gray-400 text-sm">
                      Monitor to confirm actions have resolved the issue. Check that
                      the problem does not recur.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-[#2a2a2a] p-4 rounded-lg">
                  <div className="text-2xl font-bold text-elec-yellow">6</div>
                  <div>
                    <p className="text-white font-medium">Close and Communicate</p>
                    <p className="text-gray-400 text-sm">
                      Document closure, share lessons learned, and update procedures
                      or training as needed.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-amber-900/30 border border-amber-600/50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-amber-400">
                    CAPA for Safety-Critical Issues
                  </h4>
                  <p className="text-gray-300 text-sm">
                    For any incident involving electrical safety - shocks,
                    arc flash, fires, or near-misses - formal CAPA is mandatory
                    under UK health and safety law (RIDDOR reporting may apply).
                    These require thorough investigation, documented actions, and
                    management sign-off. Never dismiss a safety incident with a
                    quick fix.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Knowledge Management and Lessons Learned */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-black w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
              6
            </div>
            <h2 className="text-2xl font-bold">
              Knowledge Management and Lessons Learned
            </h2>
          </div>

          <div className="bg-[#242424] rounded-xl p-6 border border-gray-800 space-y-4">
            <p className="text-gray-300 leading-relaxed">
              Effective knowledge management transforms individual fault-finding
              experiences into organisational capability. By capturing,
              organising, and sharing lessons learned, you help colleagues avoid
              repeating mistakes and accelerate their diagnostic skills.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-5 border border-gray-700">
              <h3 className="text-lg font-semibold text-elec-yellow mb-4 flex items-center gap-2">
                <Database className="w-5 h-5" />
                CMMS Integration for Knowledge Capture
              </h3>

              <p className="text-gray-300 mb-4">
                Modern Computerised Maintenance Management Systems (CMMS) like
                Maximo, SAP PM, or Maintenance Connection provide powerful tools
                for capturing and retrieving fault knowledge:
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-[#2a2a2a] p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Data to Capture</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>- Equipment failure codes (standardised)</li>
                    <li>- Root cause codes</li>
                    <li>- Repair action codes</li>
                    <li>- Free-text diagnostic notes</li>
                    <li>- Attached photos and documents</li>
                    <li>- Parts used and costs</li>
                    <li>- Labour hours by skill type</li>
                  </ul>
                </div>

                <div className="bg-[#2a2a2a] p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">
                    Knowledge Retrieval
                  </h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>- Search fault history by equipment</li>
                    <li>- Filter by failure mode or cause</li>
                    <li>- Identify repeat failures</li>
                    <li>- Analyse failure trends over time</li>
                    <li>- Generate reliability reports</li>
                    <li>- Support spare parts planning</li>
                    <li>- Inform equipment replacement decisions</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-5 border border-gray-700">
              <h3 className="text-lg font-semibold text-elec-yellow mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Conducting Lessons Learned Sessions
              </h3>

              <p className="text-gray-300 mb-4">
                After significant incidents or complex fault investigations, a
                structured lessons learned session captures insights for the whole
                team:
              </p>

              <div className="space-y-3">
                <div className="bg-[#2a2a2a] p-3 rounded-lg">
                  <h4 className="font-semibold text-white mb-1">
                    What went well?
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Identify effective diagnostic approaches, good teamwork, or
                    resources that helped.
                  </p>
                </div>

                <div className="bg-[#2a2a2a] p-3 rounded-lg">
                  <h4 className="font-semibold text-white mb-1">
                    What could be improved?
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Identify gaps in tools, documentation, training, or processes
                    that hindered diagnosis.
                  </p>
                </div>

                <div className="bg-[#2a2a2a] p-3 rounded-lg">
                  <h4 className="font-semibold text-white mb-1">
                    What will we do differently?
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Agree specific actions to implement improvements - assign
                    owners and deadlines.
                  </p>
                </div>

                <div className="bg-[#2a2a2a] p-3 rounded-lg">
                  <h4 className="font-semibold text-white mb-1">
                    What should others know?
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Identify key insights to share with other shifts, sites, or
                    teams.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-700">
                <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-elec-yellow" />
                  Continuous Improvement Metrics
                </h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>- Mean Time Between Failures (MTBF)</li>
                  <li>- Mean Time To Repair (MTTR)</li>
                  <li>- Repeat failure rate</li>
                  <li>- First-time fix rate</li>
                  <li>- Preventive vs. reactive work ratio</li>
                  <li>- Root cause identification rate</li>
                </ul>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-700">
                <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                  <FolderOpen className="w-4 h-4 text-elec-yellow" />
                  Knowledge Resources
                </h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>- Equipment-specific fault guides</li>
                  <li>- Troubleshooting flowcharts</li>
                  <li>- Vendor technical bulletins</li>
                  <li>- Internal technical standards</li>
                  <li>- Training records and competency matrices</li>
                  <li>- Historical fault databases</li>
                </ul>
              </div>
            </div>

            <div className="bg-green-900/30 border border-green-600/50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-green-400">
                    Building a Learning Culture
                  </h4>
                  <p className="text-gray-300 text-sm">
                    The most effective maintenance teams treat every fault as a
                    learning opportunity. This requires psychological safety -
                    people must feel able to report problems and near-misses
                    without fear of blame. Focus on improving systems, not
                    punishing individuals. Celebrate good catches and shared
                    learning. Over time, this creates a culture where knowledge
                    flows freely and reliability continuously improves.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Check 3 */}
        <div className="mb-10">
          <InlineCheck
            id={quickCheckQuestions[2].id}
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
        </div>

        {/* Quick Reference Card */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-6 h-6 text-elec-yellow" />
            <h2 className="text-2xl font-bold">Quick Reference Card</h2>
          </div>

          <div className="bg-gradient-to-br from-[#242424] to-[#1a1a1a] rounded-xl p-6 border-2 border-elec-yellow/30">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-elec-yellow mb-2 border-b border-gray-700 pb-1">
                  5 Whys Checklist
                </h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>1. Define the problem clearly</li>
                  <li>2. Ask "why" this happened</li>
                  <li>3. Use facts, not assumptions</li>
                  <li>4. Continue until systemic cause found</li>
                  <li>5. Verify the logic chain</li>
                  <li>6. Document all steps</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-elec-yellow mb-2 border-b border-gray-700 pb-1">
                  Fishbone 6M Categories
                </h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>- Machine / Equipment</li>
                  <li>- Method / Procedure</li>
                  <li>- Manpower / People</li>
                  <li>- Material</li>
                  <li>- Measurement / Data</li>
                  <li>- Mother Nature / Environment</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-elec-yellow mb-2 border-b border-gray-700 pb-1">
                  Fault Report Essentials
                </h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>- Equipment ID and location</li>
                  <li>- Symptoms observed</li>
                  <li>- Tests and measurements</li>
                  <li>- Root cause identified</li>
                  <li>- Repair actions taken</li>
                  <li>- Recommendations for prevention</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-elec-yellow mb-2 border-b border-gray-700 pb-1">
                  CAPA Steps
                </h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>1. Identify and document</li>
                  <li>2. Contain immediately</li>
                  <li>3. Analyse root cause</li>
                  <li>4. Define and implement actions</li>
                  <li>5. Verify effectiveness</li>
                  <li>6. Close and communicate</li>
                </ul>
              </div>

              <div className="md:col-span-2">
                <h4 className="font-semibold text-elec-yellow mb-2 border-b border-gray-700 pb-1">
                  Key Principles
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-gray-300">
                  <div>- Focus on systems, not blame</div>
                  <div>- Use data, not assumptions</div>
                  <div>- Document everything</div>
                  <div>- Share lessons learned</div>
                  <div>- Verify effectiveness</div>
                  <div>- Continuously improve</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-elec-yellow" />
            Frequently Asked Questions
          </h2>

          <div className="space-y-3">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="bg-[#242424] rounded-xl border border-gray-800 overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-4 text-left flex items-center justify-between min-h-[44px] touch-manipulation hover:bg-[#2a2a2a] transition-colors"
                >
                  <span className="font-medium text-white pr-4">
                    {faq.question}
                  </span>
                  {expandedFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-elec-yellow flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-elec-yellow flex-shrink-0" />
                  )}
                </button>

                {expandedFaq === index && (
                  <div className="px-4 pb-4 border-t border-gray-800">
                    <p className="text-gray-300 pt-4 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quiz Section */}
        <div className="mb-10">
          <Quiz
            questions={quizQuestions}
            title="Test Your Knowledge: Root Cause Analysis and Reporting"
            passingScore={70}
          />
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-6 border-t border-gray-800">
          <Button
            onClick={() =>
              navigate('/upskilling/industrial-electrical/module-5/section-4')
            }
            variant="outline"
            className="w-full sm:w-auto min-h-[44px] touch-manipulation bg-transparent border-gray-600 text-white hover:bg-gray-800 hover:text-elec-yellow"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Previous: Section 4
          </Button>

          <Button
            onClick={() => navigate('/upskilling/industrial-electrical/module-5')}
            className="w-full sm:w-auto min-h-[44px] touch-manipulation bg-elec-yellow text-black hover:bg-yellow-500"
          >
            Complete Module - Return to Overview
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Industrial Electrical Module 5 - Section 5 of 5</p>
          <p className="mt-1">
            Congratulations on completing Module 5: Fault-Finding and
            Troubleshooting!
          </p>
        </div>
      </div>
    </div>
  );
};

export default IndustrialElectricalModule5Section5;
