import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';
import {
  ClipboardCheck,
  FileText,
  FolderArchive,
  Shield,
  Search,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  AlertTriangle,
  Calendar,
  Building2,
  Users,
  Database,
  Lock,
  BookOpen,
  Award,
  Scale,
  FileCheck,
  Eye
} from 'lucide-react';

const EnergyEfficiencyModule6Section5: React.FC = () => {
  const navigate = useNavigate();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);

  useSEO({
    title: 'Compliance Reporting and Audit Trails | Energy Efficiency Module 6 Section 5 | Elec-Mate',
    description: 'Master UK energy compliance reporting requirements including ESOS evidence, SECR annual reporting, audit trail maintenance, document version control, and ISO 50001 audit preparation for electricians.',
    keywords: [
      'ESOS compliance evidence',
      'SECR annual reporting',
      'energy audit trails',
      'ISO 50001 audit preparation',
      'Environment Agency submissions',
      'Lead Assessor sign-off',
      'compliance document management',
      'energy certification records',
      'UK energy regulations',
      'continuous compliance strategies'
    ],
    canonicalUrl: '/upskilling/energy-efficiency/module-6/section-5'
  });

  const quickCheckQuestions = [
    {
      id: 'qc1',
      question: 'How long must ESOS compliance records be retained for Environment Agency inspection?',
      options: [
        'Until the next compliance phase (4 years)',
        'For the duration of the compliance phase plus any subsequent enforcement period',
        'Only 12 months after submission',
        'Records do not need to be retained after submission'
      ],
      correctIndex: 1,
      explanation: 'ESOS records must be retained for the duration of the compliance phase (4 years) plus any subsequent enforcement or appeal period. The Environment Agency can request evidence at any time during this period, and failure to produce records can result in a penalty of up to £5,000 for record-keeping failures.'
    },
    {
      id: 'qc2',
      question: 'What must a Lead Assessor confirm before signing off an ESOS compliance notification?',
      options: [
        'Only that energy data has been collected',
        'That all recommendations have been implemented',
        'That the audit covers at least 90% of total energy consumption and meets ESOS requirements',
        'That the company has reduced energy consumption by 10%'
      ],
      correctIndex: 2,
      explanation: 'The Lead Assessor must confirm that the ESOS audit covers at least 90% of total energy consumption across buildings, transport, and industrial processes, and that the assessment meets all ESOS requirements. They are not certifying that recommendations have been implemented - ESOS requires identification of opportunities, not mandatory implementation.'
    },
    {
      id: 'qc3',
      question: 'Which document provides the primary evidence for SECR annual reporting?',
      options: [
        'The Energy Performance Certificate (EPC)',
        'Utility bills, meter readings, and fuel records for the reporting year',
        'The building management system printout only',
        'The previous year\'s Annual Report'
      ],
      correctIndex: 1,
      explanation: 'SECR reporting requires actual energy consumption data from utility bills, meter readings, and fuel records (including transport fuel). This data must cover the full reporting year and be reconciled with financial records. EPCs show theoretical performance, not actual consumption, and are not sufficient evidence for SECR.'
    }
  ];

  const quizQuestions = [
    {
      question: 'What is the primary purpose of maintaining audit trails for energy compliance?',
      options: [
        'To increase paperwork and administration',
        'To provide verifiable evidence of compliance and support regulatory inspections',
        'To justify higher consulting fees',
        'To create marketing materials'
      ],
      correctAnswer: 'To provide verifiable evidence of compliance and support regulatory inspections'
    },
    {
      question: 'Who is responsible for notifying the Environment Agency of ESOS compliance?',
      options: [
        'The Lead Assessor only',
        'The company\'s board of directors through their nominated representative',
        'The energy supplier',
        'The local council'
      ],
      correctAnswer: 'The company\'s board of directors through their nominated representative'
    },
    {
      question: 'What information must be included in an ESOS evidence pack?',
      options: [
        'Only the final report summary',
        'Energy consumption data, audit methodology, identified opportunities, and Lead Assessor sign-off',
        'Only utility bills',
        'Marketing materials about energy efficiency'
      ],
      correctAnswer: 'Energy consumption data, audit methodology, identified opportunities, and Lead Assessor sign-off'
    },
    {
      question: 'How often must SECR reports be submitted?',
      options: [
        'Every 4 years like ESOS',
        'Annually, within the company\'s Annual Report and Accounts',
        'Monthly to OFGEM',
        'Only when requested by regulators'
      ],
      correctAnswer: 'Annually, within the company\'s Annual Report and Accounts'
    },
    {
      question: 'What is the purpose of version control in compliance documentation?',
      options: [
        'To make documents look more professional',
        'To track changes, maintain document integrity, and demonstrate continuous improvement',
        'To increase file storage requirements',
        'To confuse auditors'
      ],
      correctAnswer: 'To track changes, maintain document integrity, and demonstrate continuous improvement'
    },
    {
      question: 'Which ISO standard specifically addresses Energy Management Systems and requires documented audit trails?',
      options: [
        'ISO 9001 (Quality Management)',
        'ISO 14001 (Environmental Management)',
        'ISO 50001 (Energy Management)',
        'ISO 27001 (Information Security)'
      ],
      correctAnswer: 'ISO 50001 (Energy Management)'
    },
    {
      question: 'What must organisations demonstrate during a third-party verification audit?',
      options: [
        'Only that they have an energy policy',
        'Evidence of systematic data collection, analysis, and documented decision-making processes',
        'That they have installed solar panels',
        'That all staff have energy qualifications'
      ],
      correctAnswer: 'Evidence of systematic data collection, analysis, and documented decision-making processes'
    },
    {
      question: 'What is the recommended retention period for ISO 50001 audit records?',
      options: [
        '1 year',
        'Minimum 3 years, ideally covering at least one full certification cycle',
        '6 months',
        'No retention required'
      ],
      correctAnswer: 'Minimum 3 years, ideally covering at least one full certification cycle'
    },
    {
      question: 'What role can electricians play in supporting ESOS compliance?',
      options: [
        'No role - only Lead Assessors can be involved',
        'Providing electrical survey data, sub-metering readings, and technical recommendations',
        'Signing off the compliance notification',
        'Submitting reports to the Environment Agency'
      ],
      correctAnswer: 'Providing electrical survey data, sub-metering readings, and technical recommendations'
    },
    {
      question: 'What is continuous compliance in the context of energy regulations?',
      options: [
        'Submitting reports more frequently than required',
        'An ongoing systematic approach to maintaining compliance readiness rather than periodic rush activities',
        'Never making any changes to energy systems',
        'Hiring a full-time compliance officer'
      ],
      correctAnswer: 'An ongoing systematic approach to maintaining compliance readiness rather than periodic rush activities'
    }
  ];

  const faqs = [
    {
      question: 'What happens if we cannot locate historical records for an ESOS audit?',
      answer: 'Missing historical records is a common challenge, particularly for organisations that have changed energy suppliers or undergone mergers. The approach depends on what\'s missing: (1) For utility data, contact previous suppliers who must retain records for 6 years, (2) For transport data, use HMRC fuel duty records, fleet management system data, or mileage claims, (3) For industrial processes, use production records, maintenance logs, or equipment specifications to estimate consumption. Document your methodology and any assumptions made. The Lead Assessor must be satisfied that estimates are reasonable and conservative. Persistent gaps should trigger improved data collection systems for future compliance periods.'
    },
    {
      question: 'Can we use ISO 50001 certification as evidence for ESOS compliance?',
      answer: 'Yes, ISO 50001 certification can satisfy ESOS requirements if it covers at least 90% of your total energy consumption. The certification must be current and issued by a UKAS-accredited certification body. You still need to notify the Environment Agency using their online system and include your ISO 50001 certificate reference. However, if your ISO 50001 scope excludes significant energy uses (e.g., transport fleet), you must conduct separate ESOS audits for those areas. Many organisations find this route simpler as ISO 50001 provides ongoing management systems rather than point-in-time assessments.'
    },
    {
      question: 'What are the key differences between internal audits and third-party verification?',
      answer: 'Internal audits are conducted by your own staff (or consultants under your direction) to verify compliance with your own procedures and identify improvement opportunities. They should be independent of the area being audited. Third-party verification is conducted by external auditors from certification bodies or regulatory inspectors. Third-party audits are: (1) More rigorous and objective, (2) Required for ISO 50001 certification, (3) May be triggered by Environment Agency enforcement, (4) Carry formal consequences if non-conformances are found. Best practice is regular internal audits (quarterly/annually) with third-party verification aligned to certification cycles or regulatory requirements.'
    },
    {
      question: 'How should we handle confidential business information in compliance documentation?',
      answer: 'Energy data can reveal commercially sensitive information about production volumes, operating hours, and business activities. Protective measures include: (1) Marking documents with appropriate confidentiality classifications, (2) Limiting access to compliance data on a need-to-know basis, (3) Redacting sensitive details from documents shared externally while retaining full versions internally, (4) Using aggregated data where detailed breakdowns aren\'t required, (5) Ensuring contractors and consultants sign NDAs before accessing data. Note that regulators like the Environment Agency have obligations to protect confidential business information, though some data may be publishable under FOI requests. SECR reports in Annual Accounts are public documents - plan what level of detail is appropriate.'
    },
    {
      question: 'What training do staff need to maintain effective audit trails?',
      answer: 'Effective audit trail maintenance requires: (1) General awareness training for all staff handling energy data - understanding why accurate records matter, (2) Specific training for data entry staff on your systems, coding conventions, and quality checks, (3) Procedure training for managers approving and reviewing data, (4) Compliance training for those preparing regulatory submissions, (5) Audit training for internal auditors covering evidence gathering, interviewing techniques, and non-conformance reporting. Training should be documented (itself an audit trail requirement) and refreshed periodically. Many organisations include energy compliance in induction training and annual refreshers. Consider appointing departmental "energy champions" with enhanced training to improve data quality at source.'
    },
    {
      question: 'How do we prepare for an Environment Agency ESOS compliance inspection?',
      answer: 'Environment Agency inspections can be announced or unannounced. Preparation should be ongoing, not last-minute: (1) Maintain a complete evidence pack readily accessible - not scattered across departments, (2) Ensure the board-level representative understands their responsibilities, (3) Know where your Lead Assessor sign-off documentation is stored, (4) Have utility invoices, meter readings, and transport data organised chronologically, (5) Document your audit methodology and sampling approach, (6) Keep records of any changes since the compliance notification, (7) Prepare a brief for whoever will meet the inspectors. During inspection, be cooperative and honest. If documents are missing, acknowledge this rather than providing incomplete information. Non-compliance discovered proactively may receive more lenient treatment than attempted concealment.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a] text-white">
      {/* Header */}
      <div className="bg-[#1a1a1a]/95 border-b border-gray-700">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <ClipboardCheck className="w-8 h-8 text-elec-yellow" />
            <span className="text-elec-yellow text-sm font-medium">Module 6 - Section 5</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Compliance Reporting and Audit Trails</h1>
          <p className="text-gray-400">
            Maintaining evidence, documentation, and verification for UK energy regulations
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        {/* Introduction */}
        <section className="bg-[#2d2d2d] rounded-lg p-6 border border-gray-700">
          <div className="flex items-start gap-4">
            <div className="bg-elec-yellow/20 p-3 rounded-lg">
              <BookOpen className="w-6 h-6 text-elec-yellow" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-elec-yellow mb-3">Section Overview</h2>
              <p className="text-gray-300 mb-4">
                Compliance with UK energy regulations isn't just about meeting requirements at a point in time -
                it requires systematic record-keeping, robust audit trails, and documented evidence that can
                withstand regulatory scrutiny. This section covers the practical aspects of maintaining
                compliance documentation for ESOS, SECR, and ISO 50001 certification.
              </p>
              <p className="text-gray-300">
                As an electrician, understanding these requirements helps you provide valuable supporting
                evidence to clients, document your energy efficiency work properly, and potentially develop
                consultancy services around compliance support.
              </p>
            </div>
          </div>
        </section>

        {/* Section 1: ESOS Compliance Evidence Requirements */}
        <section className="bg-[#2d2d2d] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow/20 w-10 h-10 rounded-full flex items-center justify-center">
              <span className="text-elec-yellow font-bold">1</span>
            </div>
            <h2 className="text-xl font-semibold">ESOS Compliance Evidence Requirements</h2>
          </div>

          <div className="space-y-4">
            <p className="text-gray-300">
              The Energy Savings Opportunity Scheme requires organisations to maintain comprehensive evidence
              demonstrating that audits were conducted properly and covered the required scope. The Environment
              Agency can request this evidence at any time during the compliance period.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h4 className="font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Core ESOS Evidence Pack Components
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="bg-[#2d2d2d] p-3 rounded border border-gray-700">
                    <h5 className="font-medium text-white mb-2">Energy Consumption Data</h5>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Utility bills for electricity and gas (12 months minimum)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Sub-meter readings and trend data</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Transport fuel records and mileage data</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Industrial process energy consumption</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-[#2d2d2d] p-3 rounded border border-gray-700">
                    <h5 className="font-medium text-white mb-2">Audit Methodology</h5>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Description of audit approach and sampling</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Site visit records and photographs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Equipment inventories and specifications</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Calculation methodologies and assumptions</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-[#2d2d2d] p-3 rounded border border-gray-700">
                    <h5 className="font-medium text-white mb-2">Identified Opportunities</h5>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Energy saving recommendations with costings</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Estimated savings (kWh, CO2, cost)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Payback period analysis</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Implementation considerations</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-[#2d2d2d] p-3 rounded border border-gray-700">
                    <h5 className="font-medium text-white mb-2">Sign-Off Documentation</h5>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Lead Assessor confirmation statement</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Lead Assessor registration details</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Board director acknowledgement</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Environment Agency notification confirmation</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h4 className="font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                <Award className="w-5 h-5" />
                Lead Assessor Requirements
              </h4>
              <p className="text-gray-300 text-sm mb-3">
                The Lead Assessor must be registered with an approved body (CIBSE, IEMA, Energy Institute, or
                equivalent) and takes professional responsibility for the audit quality:
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="bg-[#2d2d2d] p-3 rounded">
                  <h5 className="font-medium text-green-400 mb-2">Lead Assessor Confirms:</h5>
                  <ul className="space-y-1 text-gray-300">
                    <li>- Audit covers minimum 90% of total energy</li>
                    <li>- Methodology meets ESOS requirements</li>
                    <li>- Data quality is adequate</li>
                    <li>- Recommendations are appropriate</li>
                    <li>- Their registration details and date</li>
                  </ul>
                </div>
                <div className="bg-[#2d2d2d] p-3 rounded">
                  <h5 className="font-medium text-blue-400 mb-2">Organisation Confirms:</h5>
                  <ul className="space-y-1 text-gray-300">
                    <li>- Board-level director has reviewed</li>
                    <li>- Information provided is accurate</li>
                    <li>- All group companies are included</li>
                    <li>- Notification submitted to EA</li>
                    <li>- Records will be retained</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-red-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                ESOS Record Retention Requirements
              </h4>
              <p className="text-gray-300 text-sm mb-2">
                Records must be retained for the entire compliance phase plus any enforcement period:
              </p>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>- <strong>Minimum retention:</strong> Until the next compliance phase deadline</li>
                <li>- <strong>If under investigation:</strong> Until resolution plus appeal period</li>
                <li>- <strong>Penalty for failure:</strong> Up to £5,000 for inadequate record-keeping</li>
                <li>- <strong>Best practice:</strong> Retain for 6+ years aligned with financial records</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Quick Check 1 */}
        <InlineCheck
          id={quickCheckQuestions[0].id}
          question={quickCheckQuestions[0].question}
          options={quickCheckQuestions[0].options}
          correctIndex={quickCheckQuestions[0].correctIndex}
          explanation={quickCheckQuestions[0].explanation}
        />

        {/* Section 2: SECR Annual Reporting Process */}
        <section className="bg-[#2d2d2d] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow/20 w-10 h-10 rounded-full flex items-center justify-center">
              <span className="text-elec-yellow font-bold">2</span>
            </div>
            <h2 className="text-xl font-semibold">SECR Annual Reporting Process</h2>
          </div>

          <div className="space-y-4">
            <p className="text-gray-300">
              Streamlined Energy and Carbon Reporting (SECR) requires qualifying companies to report energy
              consumption and emissions annually in their Directors' Report. Unlike ESOS, this is an ongoing
              annual obligation requiring systematic data collection throughout the year.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h4 className="font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                SECR Annual Reporting Timeline
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-4 p-3 bg-blue-500/10 rounded border border-blue-500/30">
                  <div className="text-blue-400 font-mono text-sm w-28 flex-shrink-0">Ongoing</div>
                  <div className="text-gray-300 text-sm">Collect and record energy data monthly/quarterly throughout financial year</div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-yellow-500/10 rounded border border-yellow-500/30">
                  <div className="text-yellow-400 font-mono text-sm w-28 flex-shrink-0">Year End</div>
                  <div className="text-gray-300 text-sm">Compile annual totals for electricity, gas, and transport fuel consumption</div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-orange-500/10 rounded border border-orange-500/30">
                  <div className="text-orange-400 font-mono text-sm w-28 flex-shrink-0">Year End +2m</div>
                  <div className="text-gray-300 text-sm">Calculate emissions using DEFRA conversion factors, prepare intensity ratios</div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-green-500/10 rounded border border-green-500/30">
                  <div className="text-green-400 font-mono text-sm w-28 flex-shrink-0">With Accounts</div>
                  <div className="text-gray-300 text-sm">Include SECR disclosure in Directors' Report, file with Companies House</div>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h4 className="font-semibold text-elec-yellow mb-3">Required SECR Disclosures</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left py-2 text-elec-yellow">Data Item</th>
                      <th className="text-left py-2 text-elec-yellow">Unit</th>
                      <th className="text-left py-2 text-elec-yellow">Source Evidence</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-gray-700">
                      <td className="py-2">UK Electricity Consumption</td>
                      <td className="py-2">kWh</td>
                      <td className="py-2">Utility bills, meter readings</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2">UK Gas Consumption</td>
                      <td className="py-2">kWh</td>
                      <td className="py-2">Utility bills, meter readings</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2">UK Transport Fuel</td>
                      <td className="py-2">kWh</td>
                      <td className="py-2">Fuel cards, mileage records</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2">Total Energy (UK)</td>
                      <td className="py-2">kWh</td>
                      <td className="py-2">Sum of above</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2">GHG Emissions (Scope 1+2)</td>
                      <td className="py-2">tCO2e</td>
                      <td className="py-2">DEFRA conversion factors applied</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2">Intensity Ratio</td>
                      <td className="py-2">Various</td>
                      <td className="py-2">e.g., tCO2e/£m revenue</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2">Previous Year Comparison</td>
                      <td className="py-2">All above</td>
                      <td className="py-2">Prior year report</td>
                    </tr>
                    <tr>
                      <td className="py-2">Energy Efficiency Actions</td>
                      <td className="py-2">Narrative</td>
                      <td className="py-2">Project records, savings data</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
                <h4 className="font-semibold text-green-400 mb-2">Quoted Companies (Full Scope)</h4>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>- Report global energy and emissions</li>
                  <li>- Include Scope 3 where material</li>
                  <li>- Targets and progress disclosure</li>
                  <li>- Climate-related financial risks</li>
                  <li>- TCFD alignment recommended</li>
                </ul>
              </div>
              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
                <h4 className="font-semibold text-blue-400 mb-2">Large Unquoted/LLPs</h4>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>- UK energy and emissions only</li>
                  <li>- Simpler disclosure requirements</li>
                  <li>- Intensity ratio required</li>
                  <li>- Methodology statement</li>
                  <li>- Actions taken narrative</li>
                </ul>
              </div>
            </div>

            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
              <h4 className="font-semibold text-elec-yellow mb-2 flex items-center gap-2">
                <Database className="w-5 h-5" />
                Evidence Trail for SECR
              </h4>
              <p className="text-gray-300 text-sm mb-2">
                Maintain a complete evidence trail that can be audited:
              </p>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>- Original utility invoices or authenticated meter data</li>
                <li>- Spreadsheet calculations with clear formulas and conversion factors cited</li>
                <li>- DEFRA conversion factor version used (publish date)</li>
                <li>- Reconciliation with financial records (energy spend vs consumption)</li>
                <li>- Sign-off by finance director and responsible director</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3: Maintaining Audit Trails for Certification */}
        <section className="bg-[#2d2d2d] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow/20 w-10 h-10 rounded-full flex items-center justify-center">
              <span className="text-elec-yellow font-bold">3</span>
            </div>
            <h2 className="text-xl font-semibold">Maintaining Audit Trails for Certification</h2>
          </div>

          <div className="space-y-4">
            <p className="text-gray-300">
              For organisations pursuing ISO 50001 certification or other energy management standards,
              maintaining comprehensive audit trails is essential. Certification bodies require documented
              evidence of systematic energy management, not just compliance at audit time.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h4 className="font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                ISO 50001 Documentation Requirements
              </h4>
              <div className="space-y-3">
                <div className="bg-[#2d2d2d] p-3 rounded border-l-4 border-elec-yellow">
                  <h5 className="font-medium text-white mb-2">Mandatory Documented Information</h5>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>- Energy policy approved by top management</li>
                    <li>- Scope and boundaries of the EnMS</li>
                    <li>- Energy review and baseline data</li>
                    <li>- Energy performance indicators (EnPIs)</li>
                    <li>- Objectives, targets, and action plans</li>
                    <li>- Competence evidence for relevant personnel</li>
                    <li>- Operational controls and criteria</li>
                    <li>- Monitoring and measurement results</li>
                    <li>- Internal audit programme and results</li>
                    <li>- Management review outputs</li>
                  </ul>
                </div>
                <div className="bg-[#2d2d2d] p-3 rounded border-l-4 border-blue-500">
                  <h5 className="font-medium text-white mb-2">Records to Demonstrate Conformity</h5>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>- Energy data collection logs and calibration records</li>
                    <li>- Significant energy use (SEU) analysis</li>
                    <li>- Design specifications for energy-relevant equipment</li>
                    <li>- Procurement specifications including energy requirements</li>
                    <li>- Training records and competence assessments</li>
                    <li>- Non-conformance and corrective action records</li>
                    <li>- Continuous improvement evidence</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h4 className="font-semibold text-elec-yellow mb-3">Audit Trail Best Practices</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium text-white">Date and timestamp all records</span>
                      <p className="text-gray-400">Include creation date, author, and version</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium text-white">Maintain chain of custody</span>
                      <p className="text-gray-400">Show who collected, reviewed, and approved data</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium text-white">Cross-reference documents</span>
                      <p className="text-gray-400">Link related records for traceability</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium text-white">Protect original records</span>
                      <p className="text-gray-400">Use read-only storage, backup regularly</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium text-white">Define retention periods</span>
                      <p className="text-gray-400">Minimum 3 years, ideally full certification cycle</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium text-white">Regular internal audits</span>
                      <p className="text-gray-400">Verify records accuracy and completeness</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-purple-400 mb-2">Electrical Work Documentation for EnMS</h4>
              <p className="text-gray-300 text-sm mb-2">
                When working on sites with ISO 50001 or similar certifications, your documentation contributes
                to their audit trail:
              </p>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>- Equipment specifications and energy ratings installed</li>
                <li>- Commissioning records showing actual vs designed performance</li>
                <li>- Sub-meter installation and calibration certificates</li>
                <li>- Before/after energy consumption measurements</li>
                <li>- Handover documentation including energy management guidance</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Quick Check 2 */}
        <InlineCheck
          id={quickCheckQuestions[1].id}
          question={quickCheckQuestions[1].question}
          options={quickCheckQuestions[1].options}
          correctIndex={quickCheckQuestions[1].correctIndex}
          explanation={quickCheckQuestions[1].explanation}
        />

        {/* Section 4: Document Management and Version Control */}
        <section className="bg-[#2d2d2d] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow/20 w-10 h-10 rounded-full flex items-center justify-center">
              <span className="text-elec-yellow font-bold">4</span>
            </div>
            <h2 className="text-xl font-semibold">Document Management and Version Control</h2>
          </div>

          <div className="space-y-4">
            <p className="text-gray-300">
              Effective document management ensures that compliance records are accurate, accessible, and
              can demonstrate continuous improvement over time. Version control prevents confusion about
              which documents are current and maintains an audit trail of changes.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h4 className="font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                <FolderArchive className="w-5 h-5" />
                Document Control Framework
              </h4>
              <div className="space-y-4">
                <div className="bg-[#2d2d2d] p-3 rounded">
                  <h5 className="font-medium text-white mb-2">Document Identification</h5>
                  <p className="text-gray-300 text-sm mb-2">Every compliance document should have:</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                    <div className="bg-[#1a1a1a] p-2 rounded text-center">
                      <div className="text-elec-yellow font-medium">Document ID</div>
                      <div className="text-gray-400">ESOS-2023-001</div>
                    </div>
                    <div className="bg-[#1a1a1a] p-2 rounded text-center">
                      <div className="text-elec-yellow font-medium">Version</div>
                      <div className="text-gray-400">v2.1</div>
                    </div>
                    <div className="bg-[#1a1a1a] p-2 rounded text-center">
                      <div className="text-elec-yellow font-medium">Date</div>
                      <div className="text-gray-400">2023-11-15</div>
                    </div>
                    <div className="bg-[#1a1a1a] p-2 rounded text-center">
                      <div className="text-elec-yellow font-medium">Status</div>
                      <div className="text-gray-400">Approved</div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#2d2d2d] p-3 rounded">
                  <h5 className="font-medium text-white mb-2">Version Control Principles</h5>
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
                    <ul className="space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="text-elec-yellow">-</span>
                        Major versions (1.0, 2.0) for significant changes
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-elec-yellow">-</span>
                        Minor versions (1.1, 1.2) for corrections/updates
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-elec-yellow">-</span>
                        Draft status until approved (v0.1, v0.2)
                      </li>
                    </ul>
                    <ul className="space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="text-elec-yellow">-</span>
                        Maintain change log/revision history
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-elec-yellow">-</span>
                        Archive superseded versions (don't delete)
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-elec-yellow">-</span>
                        Clearly mark current version as "Active"
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h4 className="font-semibold text-elec-yellow mb-3">Recommended Filing Structure</h4>
              <div className="bg-[#2d2d2d] p-4 rounded font-mono text-sm">
                <div className="text-gray-300">
                  <div className="text-elec-yellow">Energy_Compliance/</div>
                  <div className="ml-4">
                    <div className="text-blue-400">ESOS/</div>
                    <div className="ml-4 text-gray-400">
                      Phase_3_2023/<br />
                      <span className="ml-4">01_Energy_Data/</span><br />
                      <span className="ml-4">02_Site_Surveys/</span><br />
                      <span className="ml-4">03_Recommendations/</span><br />
                      <span className="ml-4">04_Sign_Off/</span><br />
                      <span className="ml-4">05_EA_Notification/</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-green-400">SECR/</div>
                    <div className="ml-4 text-gray-400">
                      FY_2023/<br />
                      FY_2024/<br />
                      Templates/
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-purple-400">ISO_50001/</div>
                    <div className="ml-4 text-gray-400">
                      Policies/<br />
                      Procedures/<br />
                      Records/<br />
                      Audits/
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
                <h4 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  Access Control
                </h4>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>- Read-only access for most users</li>
                  <li>- Edit access for designated authors</li>
                  <li>- Approval rights for managers/directors</li>
                  <li>- Audit log of all access and changes</li>
                  <li>- Password protection for sensitive data</li>
                </ul>
              </div>
              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
                <h4 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Backup and Recovery
                </h4>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>- Regular automated backups</li>
                  <li>- Off-site/cloud backup copy</li>
                  <li>- Test recovery procedures annually</li>
                  <li>- Document retention policy</li>
                  <li>- Secure disposal after retention period</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Third-Party Verification and Audits */}
        <section className="bg-[#2d2d2d] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow/20 w-10 h-10 rounded-full flex items-center justify-center">
              <span className="text-elec-yellow font-bold">5</span>
            </div>
            <h2 className="text-xl font-semibold">Third-Party Verification and Audits</h2>
          </div>

          <div className="space-y-4">
            <p className="text-gray-300">
              Third-party verification provides independent assurance that compliance systems are working
              effectively. This may be required for ISO certification, voluntary schemes, or regulatory
              enforcement. Understanding what auditors look for helps you prepare appropriate evidence.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h4 className="font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                <Search className="w-5 h-5" />
                Types of External Verification
              </h4>
              <div className="space-y-3">
                <div className="bg-[#2d2d2d] p-3 rounded border-l-4 border-green-500">
                  <h5 className="font-medium text-green-400 mb-2">Certification Audits (ISO 50001)</h5>
                  <p className="text-gray-300 text-sm">
                    Conducted by UKAS-accredited certification bodies. Initial certification requires Stage 1
                    (documentation review) and Stage 2 (implementation audit). Annual surveillance audits
                    and full recertification every 3 years.
                  </p>
                </div>
                <div className="bg-[#2d2d2d] p-3 rounded border-l-4 border-blue-500">
                  <h5 className="font-medium text-blue-400 mb-2">Regulatory Inspections (ESOS/EA)</h5>
                  <p className="text-gray-300 text-sm">
                    Environment Agency compliance checks can be triggered randomly, by complaints, or as
                    part of enforcement action. May be announced or unannounced. Focus on evidence that
                    notification claims are accurate.
                  </p>
                </div>
                <div className="bg-[#2d2d2d] p-3 rounded border-l-4 border-purple-500">
                  <h5 className="font-medium text-purple-400 mb-2">Financial Audit (SECR)</h5>
                  <p className="text-gray-300 text-sm">
                    External financial auditors may review SECR disclosures as part of annual accounts
                    audit. Focus on consistency with other reported financial information and methodology
                    reasonableness.
                  </p>
                </div>
                <div className="bg-[#2d2d2d] p-3 rounded border-l-4 border-orange-500">
                  <h5 className="font-medium text-orange-400 mb-2">Supply Chain Audits</h5>
                  <p className="text-gray-300 text-sm">
                    Major customers may audit your energy management as part of supplier assessment.
                    Common in sectors with net-zero commitments requiring Scope 3 emissions data from
                    suppliers.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h4 className="font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                <Eye className="w-5 h-5" />
                What Auditors Look For
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2 text-sm">
                  <h5 className="font-medium text-white">Evidence Quality</h5>
                  <ul className="space-y-1 text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">-</span>
                      Original source documents (not just summaries)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">-</span>
                      Consistent data across different documents
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">-</span>
                      Clear audit trail from raw data to final figures
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">-</span>
                      Appropriate authorisation signatures
                    </li>
                  </ul>
                </div>
                <div className="space-y-2 text-sm">
                  <h5 className="font-medium text-white">System Effectiveness</h5>
                  <ul className="space-y-1 text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">-</span>
                      Procedures are followed consistently
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">-</span>
                      Staff understand their responsibilities
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">-</span>
                      Corrective actions are implemented
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">-</span>
                      Continuous improvement is demonstrated
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h4 className="font-semibold text-elec-yellow mb-3">Preparing for Audits - Checklist</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <h5 className="font-medium text-white">Before the Audit</h5>
                  <ul className="space-y-1 text-gray-300">
                    <li>[ ] Review previous audit findings</li>
                    <li>[ ] Check all documentation is current</li>
                    <li>[ ] Verify records are complete and accessible</li>
                    <li>[ ] Brief relevant staff on audit scope</li>
                    <li>[ ] Prepare meeting room with documents</li>
                    <li>[ ] Confirm audit schedule and attendees</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h5 className="font-medium text-white">During the Audit</h5>
                  <ul className="space-y-1 text-gray-300">
                    <li>[ ] Escort auditors, answer questions honestly</li>
                    <li>[ ] Take notes of observations raised</li>
                    <li>[ ] Provide requested evidence promptly</li>
                    <li>[ ] Clarify any misunderstandings immediately</li>
                    <li>[ ] Don't volunteer information not requested</li>
                    <li>[ ] Record any agreed actions</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-red-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Common Audit Findings
              </h4>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>- Missing or incomplete records for specific time periods</li>
                <li>- Inconsistencies between energy data and financial records</li>
                <li>- Outdated procedures that don't reflect current practice</li>
                <li>- Lack of management review evidence</li>
                <li>- Incomplete corrective action close-out from previous audits</li>
                <li>- Staff unable to explain their compliance responsibilities</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Quick Check 3 */}
        <InlineCheck
          id={quickCheckQuestions[2].id}
          question={quickCheckQuestions[2].question}
          options={quickCheckQuestions[2].options}
          correctIndex={quickCheckQuestions[2].correctIndex}
          explanation={quickCheckQuestions[2].explanation}
        />

        {/* Section 6: Continuous Compliance Strategies */}
        <section className="bg-[#2d2d2d] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow/20 w-10 h-10 rounded-full flex items-center justify-center">
              <span className="text-elec-yellow font-bold">6</span>
            </div>
            <h2 className="text-xl font-semibold">Continuous Compliance Strategies</h2>
          </div>

          <div className="space-y-4">
            <p className="text-gray-300">
              Rather than treating compliance as a periodic exercise, successful organisations embed
              compliance activities into their regular operations. This "continuous compliance" approach
              reduces the burden at deadline time and improves data quality through regular attention.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h4 className="font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                <RefreshCw className="w-5 h-5" />
                The Continuous Compliance Cycle
              </h4>
              <div className="grid md:grid-cols-4 gap-3">
                <div className="bg-[#2d2d2d] p-3 rounded text-center">
                  <div className="bg-green-500/20 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-green-400 font-bold">1</span>
                  </div>
                  <h5 className="font-medium text-green-400 mb-1">Collect</h5>
                  <p className="text-gray-400 text-xs">Automated data capture, regular meter readings</p>
                </div>
                <div className="bg-[#2d2d2d] p-3 rounded text-center">
                  <div className="bg-blue-500/20 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-400 font-bold">2</span>
                  </div>
                  <h5 className="font-medium text-blue-400 mb-1">Verify</h5>
                  <p className="text-gray-400 text-xs">Quality checks, reconciliation, anomaly review</p>
                </div>
                <div className="bg-[#2d2d2d] p-3 rounded text-center">
                  <div className="bg-purple-500/20 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-purple-400 font-bold">3</span>
                  </div>
                  <h5 className="font-medium text-purple-400 mb-1">Report</h5>
                  <p className="text-gray-400 text-xs">Regular internal reporting, KPI dashboards</p>
                </div>
                <div className="bg-[#2d2d2d] p-3 rounded text-center">
                  <div className="bg-orange-500/20 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-orange-400 font-bold">4</span>
                  </div>
                  <h5 className="font-medium text-orange-400 mb-1">Improve</h5>
                  <p className="text-gray-400 text-xs">Act on insights, close gaps, enhance systems</p>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h4 className="font-semibold text-elec-yellow mb-3">Recommended Activity Calendar</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left py-2 text-elec-yellow">Frequency</th>
                      <th className="text-left py-2 text-elec-yellow">Activity</th>
                      <th className="text-left py-2 text-elec-yellow">Responsible</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-gray-700">
                      <td className="py-2 font-medium">Daily</td>
                      <td className="py-2">Automated meter data collection</td>
                      <td className="py-2">BMS/System</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2 font-medium">Weekly</td>
                      <td className="py-2">Review energy dashboard for anomalies</td>
                      <td className="py-2">Energy Manager</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2 font-medium">Monthly</td>
                      <td className="py-2">Utility bill reconciliation, transport data collection</td>
                      <td className="py-2">Finance/Facilities</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2 font-medium">Quarterly</td>
                      <td className="py-2">Internal audit sample, KPI report to management</td>
                      <td className="py-2">Energy Manager</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2 font-medium">Annually</td>
                      <td className="py-2">Full compliance review, SECR preparation, targets update</td>
                      <td className="py-2">Board/Energy Team</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium">Every 4 Years</td>
                      <td className="py-2">ESOS audit preparation and submission</td>
                      <td className="py-2">Lead Assessor/Board</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
                <h4 className="font-semibold text-green-400 mb-2">Technology Enablers</h4>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>- Smart meters with automatic data upload</li>
                  <li>- Energy management software platforms</li>
                  <li>- Automated bill validation services</li>
                  <li>- Dashboard and alerting systems</li>
                  <li>- Document management systems with audit trails</li>
                  <li>- Integration with financial systems</li>
                </ul>
              </div>
              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
                <h4 className="font-semibold text-blue-400 mb-2">Organisational Enablers</h4>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>- Clear roles and responsibilities</li>
                  <li>- Executive sponsorship and accountability</li>
                  <li>- Cross-functional energy team</li>
                  <li>- Training and competence development</li>
                  <li>- Integration with other management systems</li>
                  <li>- Regular management review</li>
                </ul>
              </div>
            </div>

            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
              <h4 className="font-semibold text-elec-yellow mb-2 flex items-center gap-2">
                <Users className="w-5 h-5" />
                How Electricians Can Support Continuous Compliance
              </h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Install sub-metering:</strong> Enable granular energy monitoring at circuit/zone level</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Provide commissioning data:</strong> Document actual energy consumption of installed systems</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Support audits:</strong> Participate in site surveys, provide technical expertise</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Document savings:</strong> Provide before/after data for energy efficiency projects</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Training pathway:</strong> Consider becoming an ESOS Lead Assessor for expanded services</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 rounded-lg p-6 border border-elec-yellow/30">
          <div className="flex items-center gap-3 mb-4">
            <FileCheck className="w-6 h-6 text-elec-yellow" />
            <h2 className="text-xl font-semibold text-elec-yellow">Quick Reference Card</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-[#1a1a1a]/50 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">ESOS Evidence Essentials</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>- 12 months energy consumption data</li>
                <li>- Coverage of minimum 90% total energy</li>
                <li>- Lead Assessor sign-off and registration</li>
                <li>- Board director acknowledgement</li>
                <li>- EA notification confirmation</li>
                <li>- Retain for compliance period + enforcement</li>
              </ul>
            </div>

            <div className="bg-[#1a1a1a]/50 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">SECR Reporting Checklist</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>- UK electricity, gas, transport (kWh)</li>
                <li>- GHG emissions (tCO2e Scope 1+2)</li>
                <li>- At least one intensity ratio</li>
                <li>- Prior year comparison</li>
                <li>- Methodology statement</li>
                <li>- Energy efficiency actions narrative</li>
              </ul>
            </div>

            <div className="bg-[#1a1a1a]/50 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">Document Control Basics</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>- Unique document ID and version number</li>
                <li>- Creation date and author</li>
                <li>- Approval status and signature</li>
                <li>- Revision history maintained</li>
                <li>- Superseded versions archived</li>
                <li>- Access control and backup</li>
              </ul>
            </div>

            <div className="bg-[#1a1a1a]/50 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">Key Retention Periods</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>- <strong>ESOS:</strong> Compliance period + enforcement</li>
                <li>- <strong>SECR:</strong> 6 years (with financial records)</li>
                <li>- <strong>ISO 50001:</strong> Minimum 3 years</li>
                <li>- <strong>Utility bills:</strong> 6 years</li>
                <li>- <strong>Best practice:</strong> 7 years minimum</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="bg-[#2d2d2d] rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-elec-yellow">Frequently Asked Questions</span>
          </h2>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-[#1a1a1a] rounded-lg border border-gray-600 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-4 text-left min-h-[44px] touch-manipulation active:scale-[0.98]"
                >
                  <span className="font-medium text-white pr-4">{faq.question}</span>
                  {expandedFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-elec-yellow flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {expandedFAQ === index && (
                  <div className="px-4 pb-4 text-gray-300 text-sm border-t border-gray-700 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Quiz Section */}
        <section className="bg-[#2d2d2d] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-elec-yellow">Section Quiz</h2>
            {!showQuiz && (
              <Button
                onClick={() => setShowQuiz(true)}
                className="bg-elec-yellow text-black hover:bg-elec-yellow/90 min-h-[44px] touch-manipulation active:scale-[0.98]"
              >
                Start Quiz
              </Button>
            )}
          </div>

          {showQuiz ? (
            <Quiz
              questions={quizQuestions}
              moduleId="energy-efficiency-m6s5"
              onComplete={() => {}}
            />
          ) : (
            <p className="text-gray-400">
              Test your understanding of compliance reporting and audit trails with this 10-question quiz.
              You need 70% to pass.
            </p>
          )}
        </section>

        {/* Navigation */}
        <nav className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-gray-700">
          <Button
            onClick={() => navigate('/upskilling/energy-efficiency-module-6-section-4')}
            variant="outline"
            className="flex items-center gap-2 min-h-[44px] touch-manipulation active:scale-[0.98] border-gray-600 text-white hover:bg-gray-700"
          >
            <ChevronLeft className="w-4 h-4" />
            <div className="text-left">
              <div className="text-xs text-gray-400">Previous</div>
              <div className="text-sm">Section 4: Energy KPI Dashboards</div>
            </div>
          </Button>

          <Button
            onClick={() => navigate('/upskilling/energy-efficiency-course')}
            className="flex items-center gap-2 min-h-[44px] touch-manipulation active:scale-[0.98] bg-elec-yellow text-black hover:bg-elec-yellow/90"
          >
            <div className="text-right">
              <div className="text-xs opacity-70">Course Complete</div>
              <div className="text-sm">Back to Course Overview</div>
            </div>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default EnergyEfficiencyModule6Section5;
