import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Quiz from '@/components/apprentice-courses/Quiz';
import InlineCheck from '@/components/apprentice-courses/InlineCheck';
import { useSEO } from '@/hooks/useSEO';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  FileText,
  Building2,
  AlertTriangle,
  Calendar,
  PoundSterling,
  ClipboardCheck,
  Scale,
  Zap,
  ThermometerSun,
  Award,
  BookOpen,
  Lightbulb
} from 'lucide-react';

const EnergyEfficiencyModule6Section1: React.FC = () => {
  const navigate = useNavigate();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  useSEO({
    title: 'ESOS, SECR, and Building Regs Overview | Energy Efficiency Module 6',
    description: 'Learn about UK energy efficiency regulations including ESOS, SECR, Building Regulations Part L, MEES, and DECs. Understand compliance requirements, thresholds, and how electricians can help clients meet regulatory obligations.',
    keywords: ['ESOS', 'SECR', 'Building Regulations Part L', 'MEES', 'DEC', 'energy efficiency regulations', 'UK compliance', 'electrician training']
  });

  const quickCheckQuestions = [
    {
      id: 'qc1',
      question: 'What is the qualifying threshold for ESOS compliance?',
      options: [
        'Any business with energy bills over £50,000',
        'Large undertakings with 250+ employees OR turnover >£44m and balance sheet >£38m',
        'All limited companies regardless of size',
        'Only businesses in the energy sector'
      ],
      correctIndex: 1,
      explanation: 'ESOS applies to large undertakings - those with 250 or more employees, OR those with fewer employees but annual turnover exceeding £44 million AND a balance sheet total exceeding £38 million. This EU-derived scheme was retained post-Brexit.'
    },
    {
      id: 'qc2',
      question: 'What is the minimum EPC rating required for rented commercial properties under MEES from April 2023?',
      options: [
        'Rating D or above',
        'Rating C or above',
        'Rating E or above',
        'Rating B or above'
      ],
      correctIndex: 2,
      explanation: 'Since April 2023, MEES requires all rented commercial properties to have an EPC rating of E or above. Properties with F or G ratings cannot be legally let unless they have a valid exemption registered. Future targets aim to raise this to C by 2027-2030.'
    },
    {
      id: 'qc3',
      question: 'Which type of building requires a Display Energy Certificate (DEC)?',
      options: [
        'All commercial buildings regardless of size',
        'Public buildings over 250m² frequently visited by the public',
        'Only government buildings',
        'Any building with an EPC'
      ],
      correctIndex: 1,
      explanation: 'DECs are mandatory for public authority buildings over 250m² that are frequently visited by the public. Buildings over 1,000m² must renew annually, while those between 250-1,000m² can renew every 10 years. DECs show actual operational energy use, unlike EPCs which show theoretical performance.'
    }
  ];

  const quizQuestions = [
    {
      question: 'How often must ESOS compliance assessments be conducted?',
      options: ['Annually', 'Every 2 years', 'Every 4 years', 'Every 5 years'],
      correctAnswer: 'Every 4 years'
    },
    {
      question: 'What is the maximum penalty for ESOS non-compliance?',
      options: ['£5,000', '£50,000', '£90,000 plus daily fines', '£250,000'],
      correctAnswer: '£90,000 plus daily fines'
    },
    {
      question: 'Which companies must report under SECR (Streamlined Energy and Carbon Reporting)?',
      options: [
        'All UK registered companies',
        'Quoted companies, large unquoted companies, and large LLPs',
        'Only FTSE 100 companies',
        'Only manufacturing companies'
      ],
      correctAnswer: 'Quoted companies, large unquoted companies, and large LLPs'
    },
    {
      question: 'What percentage of energy must be covered in an ESOS audit?',
      options: ['50%', '75%', '90%', '100%'],
      correctAnswer: '90%'
    },
    {
      question: 'Building Regulations Part L 2021 requires what improvement in CO2 emissions compared to 2013 standards for new dwellings?',
      options: ['15% reduction', '21% reduction', '31% reduction', '50% reduction'],
      correctAnswer: '31% reduction'
    },
    {
      question: 'What is the penalty cap for MEES breaches on commercial properties?',
      options: ['£5,000', '£50,000', '£150,000', '£500,000'],
      correctAnswer: '£150,000'
    },
    {
      question: 'Who is the lead assessor required for ESOS compliance?',
      options: [
        'Any qualified electrician',
        'A registered ESOS Lead Assessor from an approved register',
        'The company\'s financial director',
        'Any building surveyor'
      ],
      correctAnswer: 'A registered ESOS Lead Assessor from an approved register'
    },
    {
      question: 'Under SECR, what intensity ratio must be reported?',
      options: [
        'Energy use per employee',
        'CO2 emissions per unit of revenue or other appropriate metric',
        'Energy cost per square metre',
        'Carbon offset percentage'
      ],
      correctAnswer: 'CO2 emissions per unit of revenue or other appropriate metric'
    },
    {
      question: 'What is the minimum fabric U-value requirement for new external walls under Part L 2021?',
      options: ['0.18 W/m²K', '0.26 W/m²K', '0.35 W/m²K', '0.45 W/m²K'],
      correctAnswer: '0.26 W/m²K'
    },
    {
      question: 'How long is a DEC valid for buildings over 1,000m²?',
      options: ['6 months', '1 year', '5 years', '10 years'],
      correctAnswer: '1 year'
    }
  ];

  const faqs = [
    {
      question: 'Can small businesses be caught by ESOS through group structures?',
      answer: 'Yes, this is a common pitfall. If a small business is part of a corporate group where the combined group meets the ESOS thresholds (250+ employees or £44m turnover with £38m balance sheet), ALL businesses in that group must be included in the ESOS assessment. This includes franchises under common ownership, subsidiary companies, and joint ventures where one party has dominant influence. Many SMEs are surprised to find they\'re captured through parent company relationships.'
    },
    {
      question: 'What exemptions exist for MEES compliance?',
      answer: 'Several exemptions exist: (1) Buildings with valid exemptions registered on the PRS Exemptions Register, (2) Listed buildings where compliance would unacceptably alter character, (3) Temporary buildings with planned use under 2 years, (4) Stand-alone buildings under 50m², (5) Properties where all cost-effective improvements have been made but still don\'t reach E rating ("All Improvements Made" exemption), (6) Consent exemptions where third-party consent was refused, (7) Devaluation exemptions where improvements would reduce property value by more than 5%. All exemptions must be registered and are valid for 5 years.'
    },
    {
      question: 'How do Part L requirements differ for existing buildings vs new builds?',
      answer: 'New builds must meet full Part L 2021 standards including the new "primary energy" metric, enhanced U-values, and pass both Target Emission Rate (TER) and Target Primary Energy Rate (TPER) tests. Existing buildings trigger Part L when undertaking "building work" - this includes extensions, material alterations, and replacement of thermal elements or controlled services. The requirements for existing buildings focus on "consequential improvements" where major works trigger the need to upgrade other elements. Renovation of thermal elements must achieve reasonable standards without requiring full new-build compliance.'
    },
    {
      question: 'What records must be kept for SECR compliance?',
      answer: 'Companies must maintain records of: (1) Total UK energy consumption in kWh for electricity, gas, and transport, (2) Associated greenhouse gas emissions in tonnes CO2e using appropriate conversion factors, (3) At least one intensity ratio (e.g., tCO2e per £m revenue), (4) Previous year\'s figures for comparison, (5) Methodology descriptions including conversion factors used, (6) Energy efficiency actions taken during the reporting year. Records should be retained for at least 6 years. The report must be included in the Directors\' Report within the Annual Report and Accounts, signed off by a director.'
    },
    {
      question: 'Can electricians become ESOS Lead Assessors?',
      answer: 'Yes, electricians can become ESOS Lead Assessors by joining an approved professional body register. The main routes are through: CIBSE (Chartered Institution of Building Services Engineers) via their ESOS Assessor Register, IEMA (Institute of Environmental Management and Assessment), or the Energy Institute. Requirements typically include relevant qualifications (minimum Level 4), demonstrated competence in energy assessment, professional indemnity insurance, and completing approved ESOS training. This represents an excellent diversification opportunity for electricians looking to expand into energy consultancy services.'
    },
    {
      question: 'How do DECs and EPCs differ, and when is each required?',
      answer: 'EPCs (Energy Performance Certificates) rate theoretical energy efficiency (A-G) based on building design and are required when buildings are constructed, sold, or let. They\'re valid for 10 years. DECs (Display Energy Certificates) show actual operational energy use compared to a benchmark for similar buildings, using a 0-150+ scale where lower is better. DECs are only required for public authority buildings over 250m² frequently visited by the public, must be prominently displayed, and require an accompanying Advisory Report recommending improvements. DECs reflect real energy consumption patterns including occupant behaviour, while EPCs reflect the building\'s inherent efficiency potential.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#2a2a2a] to-[#1a1a1a] border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <Scale className="h-8 w-8 text-elec-yellow" />
            <span className="text-elec-yellow font-semibold">Module 6 - Section 1</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            ESOS, SECR, and Building Regs Overview
          </h1>
          <p className="text-gray-400">
            Understanding UK energy efficiency regulations and compliance requirements
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-12">

        {/* Introduction */}
        <section className="bg-[#242424] rounded-xl p-6 border border-gray-800">
          <div className="flex items-start gap-4">
            <div className="bg-elec-yellow/20 p-3 rounded-lg">
              <BookOpen className="h-6 w-6 text-elec-yellow" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-3">Section Overview</h2>
              <p className="text-gray-300 leading-relaxed">
                The UK has implemented a comprehensive framework of energy efficiency regulations
                affecting businesses, landlords, and building owners. As an electrician, understanding
                these regulations positions you as a valuable advisor to clients facing compliance
                requirements. This section covers the major schemes: ESOS for large enterprises,
                SECR for corporate reporting, Building Regulations Part L for construction standards,
                MEES for rental properties, and DECs for public buildings.
              </p>
            </div>
          </div>
        </section>

        {/* Section 1: ESOS */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="bg-elec-yellow text-black font-bold rounded-full w-10 h-10 flex items-center justify-center text-lg">
              1
            </div>
            <h2 className="text-2xl font-bold">ESOS (Energy Savings Opportunity Scheme)</h2>
          </div>

          <div className="bg-[#242424] rounded-xl p-6 border border-gray-800 space-y-6">
            <div className="flex items-start gap-4">
              <Building2 className="h-6 w-6 text-elec-yellow flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2">What is ESOS?</h3>
                <p className="text-gray-300 leading-relaxed">
                  ESOS is a mandatory energy assessment scheme for large UK undertakings, introduced
                  in 2014 under the EU Energy Efficiency Directive and retained post-Brexit. It requires
                  qualifying organisations to conduct comprehensive energy audits every four years,
                  identifying energy-saving opportunities across their operations.
                </p>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-5">
              <h4 className="font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                <ClipboardCheck className="h-5 w-5" />
                Who Must Comply?
              </h4>
              <p className="text-gray-300 mb-4">
                A "large undertaking" meets <strong>either</strong> of these criteria:
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span><strong>250+ employees</strong> in the UK</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span><strong>Fewer than 250 employees</strong> but annual turnover exceeding <strong>£44 million</strong> AND balance sheet total exceeding <strong>£38 million</strong></span>
                </li>
              </ul>
              <div className="mt-4 p-3 bg-yellow-900/30 border border-yellow-700/50 rounded-lg">
                <p className="text-yellow-200 text-sm">
                  <strong>Important:</strong> Corporate groups are assessed together. If the parent
                  company qualifies, all subsidiaries must be included in the ESOS assessment.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="font-semibold mb-3">ESOS Requirements</h4>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Audit covering minimum 90% of total energy use</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Buildings, industrial processes, and transport included</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Signed off by registered Lead Assessor</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Notify Environment Agency of compliance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Maintain records for the compliance period</span>
                  </li>
                </ul>
              </div>
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="font-semibold mb-3">Compliance Phases</h4>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span><strong>Phase 1:</strong> December 2015</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span><strong>Phase 2:</strong> December 2019</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span><strong>Phase 3:</strong> December 2023</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span><strong>Phase 4:</strong> December 2027</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Qualification date: 31st December of deadline year</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4">
              <h4 className="font-semibold text-red-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Penalties for Non-Compliance
              </h4>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• <strong>£5,000</strong> - Failure to maintain records</li>
                <li>• <strong>£50,000</strong> - Failure to undertake an energy audit</li>
                <li>• <strong>£50,000</strong> - Failure to notify the Environment Agency</li>
                <li>• <strong>Up to £90,000</strong> total initial penalties plus <strong>£500/day</strong> continuing fines</li>
                <li>• <strong>Publication</strong> - Non-compliant organisations may be named publicly</li>
              </ul>
            </div>

            <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                How Electricians Can Help
              </h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Conduct electrical system surveys as part of ESOS audits</li>
                <li>• Install sub-metering to identify energy consumption patterns</li>
                <li>• Recommend and implement lighting upgrades (LED retrofits)</li>
                <li>• Install power factor correction equipment</li>
                <li>• Implement building management system improvements</li>
                <li>• Train toward becoming an ESOS Lead Assessor</li>
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

        {/* Section 2: SECR */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="bg-elec-yellow text-black font-bold rounded-full w-10 h-10 flex items-center justify-center text-lg">
              2
            </div>
            <h2 className="text-2xl font-bold">SECR (Streamlined Energy and Carbon Reporting)</h2>
          </div>

          <div className="bg-[#242424] rounded-xl p-6 border border-gray-800 space-y-6">
            <div className="flex items-start gap-4">
              <FileText className="h-6 w-6 text-elec-yellow flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2">What is SECR?</h3>
                <p className="text-gray-300 leading-relaxed">
                  SECR replaced the Carbon Reduction Commitment (CRC) scheme from April 2019. It
                  requires qualifying companies to report their energy use and carbon emissions
                  annually within their Directors' Report. Unlike ESOS, SECR is an ongoing annual
                  reporting obligation focused on transparency and year-on-year comparison.
                </p>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-5">
              <h4 className="font-semibold text-elec-yellow mb-3">Who Must Report?</h4>
              <div className="space-y-4">
                <div>
                  <p className="font-medium text-white mb-2">Quoted Companies (Full Scope)</p>
                  <p className="text-gray-300 text-sm">
                    All UK quoted companies regardless of size, including those on the Main Market,
                    AIM, or equivalent overseas markets. Must report global energy use and emissions.
                  </p>
                </div>
                <div>
                  <p className="font-medium text-white mb-2">Large Unquoted Companies & LLPs</p>
                  <p className="text-gray-300 text-sm">
                    Must meet at least <strong>two</strong> of these criteria:
                  </p>
                  <ul className="mt-2 space-y-1 text-gray-300 text-sm">
                    <li>• 250+ employees</li>
                    <li>• Annual turnover exceeding £36 million</li>
                    <li>• Balance sheet total exceeding £18 million</li>
                  </ul>
                  <p className="text-gray-400 text-sm mt-2">
                    Only UK energy use and emissions need to be reported.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="font-semibold mb-3">What Must Be Reported?</h4>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li className="flex items-start gap-2">
                    <Zap className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                    <span>UK electricity consumption (kWh)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ThermometerSun className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                    <span>UK gas consumption (kWh)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">🚗</span>
                    <span>UK transport energy (business vehicles)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">📊</span>
                    <span>Associated GHG emissions (tCO2e)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">📈</span>
                    <span>At least one intensity ratio</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">📝</span>
                    <span>Methodology statement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">✅</span>
                    <span>Energy efficiency actions taken</span>
                  </li>
                </ul>
              </div>
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="font-semibold mb-3">Intensity Ratios</h4>
                <p className="text-gray-300 text-sm mb-3">
                  At least one ratio showing emissions relative to business activity:
                </p>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• tCO2e per £million revenue</li>
                  <li>• tCO2e per employee (FTE)</li>
                  <li>• tCO2e per unit of production</li>
                  <li>• tCO2e per square metre</li>
                  <li>• kWh per unit of output</li>
                </ul>
                <p className="text-gray-400 text-xs mt-3">
                  Choose a metric that allows meaningful year-on-year comparison.
                </p>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <h4 className="font-semibold mb-3">SECR vs ESOS Comparison</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-2 text-elec-yellow">Aspect</th>
                      <th className="text-left py-2 text-elec-yellow">SECR</th>
                      <th className="text-left py-2 text-elec-yellow">ESOS</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-gray-800">
                      <td className="py-2">Frequency</td>
                      <td className="py-2">Annual</td>
                      <td className="py-2">Every 4 years</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-2">Focus</td>
                      <td className="py-2">Reporting emissions</td>
                      <td className="py-2">Identifying savings</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-2">Output</td>
                      <td className="py-2">In Annual Report</td>
                      <td className="py-2">Internal + EA notification</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-2">Lead Assessor</td>
                      <td className="py-2">Not required</td>
                      <td className="py-2">Required</td>
                    </tr>
                    <tr>
                      <td className="py-2">Implementation</td>
                      <td className="py-2">Not mandated</td>
                      <td className="py-2">Not mandated</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                How Electricians Can Help
              </h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Install smart metering and sub-metering systems for accurate data collection</li>
                <li>• Provide energy consumption data from installed monitoring systems</li>
                <li>• Implement energy efficiency improvements that companies can report</li>
                <li>• Help clients set up energy monitoring dashboards</li>
                <li>• Document energy savings from completed projects</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3: Building Regulations Part L */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="bg-elec-yellow text-black font-bold rounded-full w-10 h-10 flex items-center justify-center text-lg">
              3
            </div>
            <h2 className="text-2xl font-bold">Building Regulations Part L</h2>
          </div>

          <div className="bg-[#242424] rounded-xl p-6 border border-gray-800 space-y-6">
            <div className="flex items-start gap-4">
              <Building2 className="h-6 w-6 text-elec-yellow flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Conservation of Fuel and Power</h3>
                <p className="text-gray-300 leading-relaxed">
                  Part L of the Building Regulations sets standards for energy efficiency in new
                  and existing buildings. The 2021 update (effective June 2022 in England) introduced
                  significant uplift in standards as a stepping stone toward the Future Homes Standard
                  (2025) and Future Buildings Standard.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="font-semibold text-green-400 mb-3">Part L1A - New Dwellings</h4>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• 31% reduction in CO2 vs Part L 2013</li>
                  <li>• New "Primary Energy" metric introduced</li>
                  <li>• Higher fabric standards (U-values)</li>
                  <li>• Improved air tightness requirements</li>
                  <li>• Enhanced thermal bridging standards</li>
                  <li>• Low-carbon heating encouraged</li>
                </ul>
              </div>
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="font-semibold text-blue-400 mb-3">Part L2A - New Non-Domestic</h4>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• 27% reduction in CO2 vs Part L 2013</li>
                  <li>• Improved lighting efficacy standards</li>
                  <li>• Better HVAC efficiency requirements</li>
                  <li>• Enhanced commissioning requirements</li>
                  <li>• Building log book required</li>
                  <li>• Metering strategy mandatory</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-5">
              <h4 className="font-semibold text-elec-yellow mb-3">Key Electrical Requirements</h4>
              <div className="space-y-4">
                <div>
                  <p className="font-medium text-white mb-2">Lighting Efficacy</p>
                  <p className="text-gray-300 text-sm">
                    All fixed lighting in new dwellings must have efficacy of at least <strong>75 lumens
                    per watt</strong>. This effectively mandates LED lighting throughout. External
                    lighting must have automatic daylight cut-off and presence detection where practical.
                  </p>
                </div>
                <div>
                  <p className="font-medium text-white mb-2">EV Charging Infrastructure</p>
                  <p className="text-gray-300 text-sm">
                    New residential buildings with associated parking must have EV charge points.
                    New non-residential buildings with 10+ parking spaces must have charge points
                    and cable routes for future expansion.
                  </p>
                </div>
                <div>
                  <p className="font-medium text-white mb-2">Self-Regulating Devices</p>
                  <p className="text-gray-300 text-sm">
                    Requirements for controls including time switches, thermostatic controls, and
                    zone controls. Smart heating controls increasingly expected.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <h4 className="font-semibold mb-3">When Part L Applies to Existing Buildings</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span><strong>Extensions:</strong> New extension must meet Part L standards</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span><strong>Material alterations:</strong> Work affecting structural integrity or fire safety</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span><strong>Change of use:</strong> Converting to dwelling or "relevant building"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span><strong>Controlled services:</strong> Replacing windows, boilers, lighting systems</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span><strong>Thermal elements:</strong> Renovating roofs, walls, floors</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span><strong>Consequential improvements:</strong> Major works trigger upgrade requirements</span>
                </li>
              </ul>
            </div>

            <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Electrician Compliance Responsibilities
              </h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Ensure all fixed lighting meets 75 lm/W minimum efficacy</li>
                <li>• Install appropriate lighting controls (occupancy sensors, daylight dimming)</li>
                <li>• Fit EV charging points to Part P and manufacturer requirements</li>
                <li>• Commission systems correctly and provide commissioning certificates</li>
                <li>• Provide information for building log books</li>
                <li>• Notify Building Control of notifiable electrical work</li>
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

        {/* Section 4: MEES */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="bg-elec-yellow text-black font-bold rounded-full w-10 h-10 flex items-center justify-center text-lg">
              4
            </div>
            <h2 className="text-2xl font-bold">MEES (Minimum Energy Efficiency Standards)</h2>
          </div>

          <div className="bg-[#242424] rounded-xl p-6 border border-gray-800 space-y-6">
            <div className="flex items-start gap-4">
              <ThermometerSun className="h-6 w-6 text-elec-yellow flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2">What is MEES?</h3>
                <p className="text-gray-300 leading-relaxed">
                  MEES regulations set minimum EPC ratings for rented properties in England and Wales.
                  Introduced to improve the energy efficiency of the private rented sector, MEES makes
                  it unlawful to grant new tenancies or continue existing ones for properties below the
                  minimum standard (currently E, with plans to raise to C).
                </p>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-5">
              <h4 className="font-semibold text-elec-yellow mb-4">Current MEES Timeline</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-4 pb-4 border-b border-gray-700">
                  <div className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">ACTIVE</div>
                  <div>
                    <p className="font-medium">Domestic - All tenancies: April 2020</p>
                    <p className="text-gray-400 text-sm">EPC E minimum for all domestic private rentals</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 pb-4 border-b border-gray-700">
                  <div className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">ACTIVE</div>
                  <div>
                    <p className="font-medium">Commercial - All tenancies: April 2023</p>
                    <p className="text-gray-400 text-sm">EPC E minimum for all commercial lettings</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 pb-4 border-b border-gray-700">
                  <div className="bg-yellow-600 text-white text-xs font-bold px-2 py-1 rounded">PROPOSED</div>
                  <div>
                    <p className="font-medium">Domestic - EPC C: 2028-2030 (new tenancies)</p>
                    <p className="text-gray-400 text-sm">Government consulting on implementation date</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-yellow-600 text-white text-xs font-bold px-2 py-1 rounded">PROPOSED</div>
                  <div>
                    <p className="font-medium">Commercial - EPC B: 2030</p>
                    <p className="text-gray-400 text-sm">Ambitious target for commercial sector</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="font-semibold text-red-400 mb-3 flex items-center gap-2">
                  <PoundSterling className="h-5 w-5" />
                  Domestic Penalties
                </h4>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• <strong>£2,000</strong> - Letting for less than 3 months</li>
                  <li>• <strong>£4,000</strong> - Letting for 3 months or more</li>
                  <li>• <strong>£1,000</strong> - False/misleading exemption info</li>
                  <li>• <strong>£2,000</strong> - Failure to comply with compliance notice</li>
                  <li>• Maximum total: <strong>£5,000</strong> per property</li>
                  <li>• Publication on PRS Exemptions Register</li>
                </ul>
              </div>
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="font-semibold text-red-400 mb-3 flex items-center gap-2">
                  <PoundSterling className="h-5 w-5" />
                  Commercial Penalties
                </h4>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Penalties based on rateable value</li>
                  <li>• <strong>10%</strong> of rateable value (min £5,000) for up to 3 months breach</li>
                  <li>• <strong>20%</strong> of rateable value (min £10,000) for 3+ months</li>
                  <li>• Additional penalties for false exemptions</li>
                  <li>• Maximum: <strong>£150,000</strong> per property</li>
                  <li>• Publication on PRS Exemptions Register</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <h4 className="font-semibold mb-3">Valid Exemptions (must be registered)</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
                <ul className="space-y-1">
                  <li>• All improvements made (7-year payback test)</li>
                  <li>• Wall insulation exemption</li>
                  <li>• Consent exemption (tenant/superior landlord refused)</li>
                </ul>
                <ul className="space-y-1">
                  <li>• Devaluation exemption (5%+ value reduction)</li>
                  <li>• New landlord exemption (6 months)</li>
                  <li>• Listed building constraints</li>
                </ul>
              </div>
              <p className="text-yellow-400 text-sm mt-3">
                All exemptions are valid for 5 years and must be registered on the PRS Exemptions Register.
              </p>
            </div>

            <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                How Electricians Can Help Landlords
              </h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• LED lighting upgrades - typically improves EPC by 1-5 points</li>
                <li>• Heating controls - programmable thermostats, TRVs, zone controls</li>
                <li>• Electric heating upgrades - modern storage heaters, panel heaters</li>
                <li>• Solar PV installation - significant EPC improvement</li>
                <li>• Heat pump electrical installations</li>
                <li>• Energy monitoring systems to identify waste</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 5: DECs */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="bg-elec-yellow text-black font-bold rounded-full w-10 h-10 flex items-center justify-center text-lg">
              5
            </div>
            <h2 className="text-2xl font-bold">Display Energy Certificates (DECs)</h2>
          </div>

          <div className="bg-[#242424] rounded-xl p-6 border border-gray-800 space-y-6">
            <div className="flex items-start gap-4">
              <Award className="h-6 w-6 text-elec-yellow flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2">What are DECs?</h3>
                <p className="text-gray-300 leading-relaxed">
                  Display Energy Certificates show the actual energy performance of public buildings,
                  based on metered energy consumption over the previous 12 months. Unlike EPCs which
                  show theoretical performance, DECs reflect real-world energy use including occupant
                  behaviour and operational patterns.
                </p>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-5">
              <h4 className="font-semibold text-elec-yellow mb-3">Who Needs a DEC?</h4>
              <p className="text-gray-300 mb-4">
                DECs are required for buildings that meet <strong>all</strong> of these criteria:
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Occupied by a public authority</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Total useful floor area over 250m²</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Frequently visited by the public</span>
                </li>
              </ul>
              <p className="text-gray-400 text-sm mt-4">
                Examples: Schools, hospitals, council offices, leisure centres, libraries, museums,
                courts, police stations, government buildings.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="font-semibold mb-3">DEC Ratings Explained</h4>
                <p className="text-gray-300 text-sm mb-3">
                  DECs use a numerical Operational Rating (OR) comparing actual CO2 emissions
                  to a benchmark for similar buildings:
                </p>
                <ul className="space-y-1 text-sm">
                  <li className="flex justify-between">
                    <span className="text-green-400">A (0-25)</span>
                    <span className="text-gray-400">Excellent</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-green-300">B (26-50)</span>
                    <span className="text-gray-400">Very good</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-yellow-300">C (51-75)</span>
                    <span className="text-gray-400">Good</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-yellow-400">D (76-100)</span>
                    <span className="text-gray-400">Typical</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-orange-400">E (101-125)</span>
                    <span className="text-gray-400">Below average</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-red-400">F (126-150)</span>
                    <span className="text-gray-400">Poor</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-red-500">G (150+)</span>
                    <span className="text-gray-400">Very poor</span>
                  </li>
                </ul>
              </div>
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="font-semibold mb-3">Validity & Requirements</h4>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li className="flex items-start gap-2">
                    <Calendar className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                    <span><strong>Over 1,000m²:</strong> Renew annually</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Calendar className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                    <span><strong>250-1,000m²:</strong> Renew every 10 years</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Must be prominently displayed in building</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Advisory Report required (valid 7 years)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Produced by accredited DEC assessor</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">•</span>
                    <span>Lodged on national register</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4">
              <h4 className="font-semibold text-red-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Non-Compliance Penalties
              </h4>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• <strong>£500</strong> - Failure to display a valid DEC</li>
                <li>• <strong>£1,000</strong> - Failure to have a valid Advisory Report</li>
                <li>• Fixed penalty notices issued by Trading Standards</li>
                <li>• Reputational damage for public bodies</li>
              </ul>
            </div>

            <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                How Electricians Can Help
              </h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Install and maintain accurate sub-metering for DEC calculations</li>
                <li>• Implement Advisory Report recommendations (lighting, controls, etc.)</li>
                <li>• Help public bodies reduce their Operational Rating</li>
                <li>• Provide energy data for DEC assessments</li>
                <li>• Install building energy management systems (BEMS)</li>
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

        {/* Section 6: Compliance Timeline and Penalties */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="bg-elec-yellow text-black font-bold rounded-full w-10 h-10 flex items-center justify-center text-lg">
              6
            </div>
            <h2 className="text-2xl font-bold">Compliance Timeline and Penalties Summary</h2>
          </div>

          <div className="bg-[#242424] rounded-xl p-6 border border-gray-800 space-y-6">
            <div className="flex items-start gap-4">
              <Calendar className="h-6 w-6 text-elec-yellow flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Key Dates Overview</h3>
                <p className="text-gray-300 leading-relaxed">
                  Understanding the regulatory timeline helps you advise clients on upcoming
                  requirements and plan work accordingly. The direction of travel is clear:
                  standards will continue to tighten toward net zero targets.
                </p>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-5">
              <h4 className="font-semibold text-elec-yellow mb-4">Master Compliance Calendar</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-4 p-3 bg-green-900/20 rounded-lg">
                  <div className="text-green-400 font-mono text-sm w-20">2023</div>
                  <div className="text-gray-300 text-sm">ESOS Phase 3 deadline • MEES E rating all commercial</div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-yellow-900/20 rounded-lg">
                  <div className="text-yellow-400 font-mono text-sm w-20">2025</div>
                  <div className="text-gray-300 text-sm">Future Homes Standard (expected) • Potential MEES changes</div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-yellow-900/20 rounded-lg">
                  <div className="text-yellow-400 font-mono text-sm w-20">2027</div>
                  <div className="text-gray-300 text-sm">ESOS Phase 4 deadline • Potential MEES C rating (domestic)</div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-orange-900/20 rounded-lg">
                  <div className="text-orange-400 font-mono text-sm w-20">2028-30</div>
                  <div className="text-gray-300 text-sm">MEES C domestic (proposed) • MEES B commercial (proposed)</div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-red-900/20 rounded-lg">
                  <div className="text-red-400 font-mono text-sm w-20">2050</div>
                  <div className="text-gray-300 text-sm">Net Zero target - all buildings must be decarbonised</div>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-5">
              <h4 className="font-semibold text-elec-yellow mb-4">Penalties Comparison</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 text-elec-yellow">Regulation</th>
                      <th className="text-left py-3 text-elec-yellow">Maximum Penalty</th>
                      <th className="text-left py-3 text-elec-yellow">Enforcing Body</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-gray-800">
                      <td className="py-3">ESOS</td>
                      <td className="py-3">£90,000 + daily fines</td>
                      <td className="py-3">Environment Agency</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-3">SECR</td>
                      <td className="py-3">Director liability + company fines</td>
                      <td className="py-3">Companies House / FRC</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-3">Part L</td>
                      <td className="py-3">Unlimited (prosecution)</td>
                      <td className="py-3">Building Control</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-3">MEES (Domestic)</td>
                      <td className="py-3">£5,000 per property</td>
                      <td className="py-3">Local Authority</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-3">MEES (Commercial)</td>
                      <td className="py-3">£150,000 per property</td>
                      <td className="py-3">Local Authority</td>
                    </tr>
                    <tr>
                      <td className="py-3">DECs</td>
                      <td className="py-3">£1,500 per building</td>
                      <td className="py-3">Trading Standards</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4">
              <h4 className="font-semibold text-green-400 mb-2">Business Opportunities for Electricians</h4>
              <div className="grid md:grid-cols-2 gap-4 text-gray-300 text-sm">
                <ul className="space-y-1">
                  <li>• LED lighting retrofits for MEES compliance</li>
                  <li>• Sub-metering installation for ESOS/SECR</li>
                  <li>• EV charging for Part L compliance</li>
                  <li>• Solar PV for EPC improvements</li>
                </ul>
                <ul className="space-y-1">
                  <li>• BEMS installation and commissioning</li>
                  <li>• Power factor correction</li>
                  <li>• Smart heating control systems</li>
                  <li>• Energy audit services (with training)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 rounded-xl p-6 border border-elec-yellow/30">
          <div className="flex items-center gap-3 mb-4">
            <ClipboardCheck className="h-6 w-6 text-elec-yellow" />
            <h2 className="text-xl font-bold text-elec-yellow">Quick Reference Card</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3 text-white">Regulation Thresholds</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><strong className="text-elec-yellow">ESOS:</strong> 250+ employees OR £44m turnover + £38m balance sheet</li>
                <li><strong className="text-elec-yellow">SECR:</strong> 2 of: 250+ employees, £36m turnover, £18m balance sheet</li>
                <li><strong className="text-elec-yellow">MEES:</strong> All private rented properties (domestic & commercial)</li>
                <li><strong className="text-elec-yellow">DECs:</strong> Public buildings 250m²+ visited by public</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-white">Key Standards</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><strong className="text-elec-yellow">MEES Current:</strong> EPC E minimum</li>
                <li><strong className="text-elec-yellow">MEES Future:</strong> EPC C (domestic), B (commercial)</li>
                <li><strong className="text-elec-yellow">Part L Lighting:</strong> 75 lumens/watt minimum</li>
                <li><strong className="text-elec-yellow">ESOS Coverage:</strong> 90% of total energy use</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-white">Compliance Cycles</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><strong className="text-elec-yellow">ESOS:</strong> Every 4 years</li>
                <li><strong className="text-elec-yellow">SECR:</strong> Annual (in Directors' Report)</li>
                <li><strong className="text-elec-yellow">DECs (1,000m²+):</strong> Annual</li>
                <li><strong className="text-elec-yellow">DECs (250-1,000m²):</strong> Every 10 years</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-white">Maximum Penalties</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><strong className="text-elec-yellow">ESOS:</strong> £90,000 + £500/day</li>
                <li><strong className="text-elec-yellow">MEES Commercial:</strong> £150,000</li>
                <li><strong className="text-elec-yellow">MEES Domestic:</strong> £5,000</li>
                <li><strong className="text-elec-yellow">DECs:</strong> £1,500</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <FileText className="h-6 w-6 text-elec-yellow" />
            Frequently Asked Questions
          </h2>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-[#242424] rounded-xl border border-gray-800 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left min-h-[44px] touch-manipulation hover:bg-[#2a2a2a] transition-colors"
                >
                  <span className="font-medium pr-4">{faq.question}</span>
                  {expandedFAQ === index ? (
                    <ChevronUp className="h-5 w-5 text-elec-yellow flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {expandedFAQ === index && (
                  <div className="px-4 pb-4">
                    <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Quiz Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Test Your Knowledge</h2>
          <Quiz
            questions={quizQuestions}
            moduleId="energy-efficiency-m6s1"
            onComplete={(score) => {
              console.log(`Quiz completed with score: ${score}/${quizQuestions.length}`);
            }}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col sm:flex-row justify-between gap-4 pt-8 border-t border-gray-800">
          <Button
            variant="outline"
            onClick={() => navigate('/upskilling/energy-efficiency-module-5')}
            className="min-h-[44px] touch-manipulation bg-transparent border-gray-700 hover:bg-[#242424] hover:border-elec-yellow text-white"
          >
            <ChevronLeft className="h-5 w-5 mr-2" />
            <span>Previous: Module 5</span>
          </Button>
          <Button
            onClick={() => navigate('/upskilling/energy-efficiency-module-6-section-2')}
            className="min-h-[44px] touch-manipulation bg-elec-yellow text-black hover:bg-elec-yellow/90"
          >
            <span>Next: Section 2</span>
            <ChevronRight className="h-5 w-5 ml-2" />
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default EnergyEfficiencyModule6Section1;
