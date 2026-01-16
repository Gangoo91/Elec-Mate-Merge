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
  PoundSterling,
  FileCheck,
  Building2,
  Landmark,
  ClipboardList,
  Leaf,
  AlertCircle,
  CheckCircle2,
  Info,
  BookOpen,
  Target,
  Users,
  Calculator,
  FileText,
  Lightbulb,
} from 'lucide-react';

const EnergyEfficiencyModule6Section3: React.FC = () => {
  const navigate = useNavigate();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  useSEO({
    title: 'Incentives and Funding Opportunities | Energy Efficiency Module 6 Section 3 | Elec-Mate',
    description: 'Learn about UK government grants, ECO4 scheme, Enhanced Capital Allowances, green finance, and local authority funding for energy efficiency improvements. Guide for electricians helping clients access funding.',
    keywords: [
      'energy efficiency funding UK',
      'ECO4 scheme',
      'Enhanced Capital Allowances',
      'green finance',
      'Salix Finance',
      'energy grants UK 2024',
      'PACE financing',
      'local authority energy funding',
      'electrician training',
      'energy efficiency incentives',
    ],
    canonicalUrl: '/upskilling/energy-efficiency/module-6/section-3',
  });

  const quickCheckQuestions = [
    {
      id: 'qc1-m6s3',
      question: 'What is the primary target group for the ECO4 scheme?',
      options: [
        'Commercial property owners',
        'Low-income and vulnerable households',
        'Public sector buildings',
        'New build developments',
      ],
      correctIndex: 1,
      explanation: 'ECO4 (Energy Company Obligation 4) primarily targets low-income and vulnerable households, helping them access energy efficiency improvements through funding from larger energy suppliers.',
    },
    {
      id: 'qc2-m6s3',
      question: 'Enhanced Capital Allowances allow businesses to claim what percentage of qualifying equipment costs against taxable profits in the first year?',
      options: [
        '50%',
        '75%',
        '100%',
        '130%',
      ],
      correctIndex: 2,
      explanation: 'Enhanced Capital Allowances (ECAs) allow businesses to write off 100% of the cost of qualifying energy-saving equipment against taxable profits in the year of purchase, providing immediate tax relief.',
    },
    {
      id: 'qc3-m6s3',
      question: 'Which organisation provides interest-free loans for energy efficiency in public sector buildings?',
      options: [
        'British Business Bank',
        'Salix Finance',
        'Green Finance Institute',
        'Energy Saving Trust',
      ],
      correctIndex: 1,
      explanation: 'Salix Finance is a government-funded company that provides interest-free loans to public sector organisations (schools, hospitals, councils) for energy efficiency improvements and renewable energy projects.',
    },
  ];

  const quizQuestions = [
    {
      question: 'What does ECO4 stand for?',
      options: [
        'Energy Conservation Order 4',
        'Energy Company Obligation 4',
        'Environmental Carbon Offset 4',
        'Efficient Carbon Output 4',
      ],
      correctAnswer: 'Energy Company Obligation 4',
    },
    {
      question: 'Which EPC band must a property typically be in to qualify for ECO4 funding?',
      options: [
        'Band A or B',
        'Band C or D',
        'Band D, E, F, or G',
        'Any band qualifies',
      ],
      correctAnswer: 'Band D, E, F, or G',
    },
    {
      question: 'What is the Boiler Upgrade Scheme grant amount for air source heat pumps (2024-2025)?',
      options: [
        'Up to £3,500',
        'Up to £5,000',
        'Up to £7,500',
        'Up to £10,000',
      ],
      correctAnswer: 'Up to £7,500',
    },
    {
      question: 'Which list must equipment appear on to qualify for Enhanced Capital Allowances?',
      options: [
        'Carbon Trust Approved List',
        'Energy Technology List (ETL)',
        'Building Regulations Part L List',
        'BEIS Equipment Register',
      ],
      correctAnswer: 'Energy Technology List (ETL)',
    },
    {
      question: 'What type of financing is PACE (Property Assessed Clean Energy)?',
      options: [
        'Traditional bank loan',
        'Government grant',
        'Property-linked finance repaid through property taxes/bills',
        'Crowdfunding',
      ],
      correctAnswer: 'Property-linked finance repaid through property taxes/bills',
    },
    {
      question: 'What is the typical maximum loan period for Salix Finance public sector loans?',
      options: [
        '5 years',
        '8 years',
        '12 years',
        '20 years',
      ],
      correctAnswer: '8 years',
    },
    {
      question: 'Under the Great British Insulation Scheme, which households receive funding for insulation?',
      options: [
        'Only owner-occupied homes',
        'Only council housing',
        'Households in EPC band D-G or on means-tested benefits',
        'Only new build properties',
      ],
      correctAnswer: 'Households in EPC band D-G or on means-tested benefits',
    },
    {
      question: 'What document is essential when applying for most energy efficiency funding?',
      options: [
        'Building insurance certificate',
        'Valid Energy Performance Certificate (EPC)',
        'Mortgage statement',
        'Council tax bill',
      ],
      correctAnswer: 'Valid Energy Performance Certificate (EPC)',
    },
    {
      question: 'Which scheme provides 0% VAT on energy-saving materials installed in residential properties?',
      options: [
        'Zero VAT Energy Scheme',
        'Energy Saving Materials VAT Relief',
        'Green Homes Grant',
        'Domestic Energy VAT Exemption',
      ],
      correctAnswer: 'Energy Saving Materials VAT Relief',
    },
    {
      question: 'What is typically required for a successful funding application for commercial energy efficiency?',
      options: [
        'Only a quote from a contractor',
        'Business case with projected energy savings and payback period',
        'Just the EPC certificate',
        'Building age documentation only',
      ],
      correctAnswer: 'Business case with projected energy savings and payback period',
    },
  ];

  const faqs = [
    {
      question: 'Can my residential customers combine multiple funding sources?',
      answer: 'Yes, in many cases customers can combine different funding sources, but there are rules to prevent double-funding the same measure. For example, a household might use ECO4 for insulation and the Boiler Upgrade Scheme for a heat pump. However, they cannot claim two grants for the same installation. Always check the specific terms of each scheme, as some explicitly prohibit combination with other public funding. As an electrician, you can help customers understand which combinations are permitted and maximise their available support.',
    },
    {
      question: 'How do I become an approved installer for government-funded schemes?',
      answer: 'To install measures under government schemes, you typically need appropriate accreditation. For heat pumps under the Boiler Upgrade Scheme, you must be MCS (Microgeneration Certification Scheme) certified. For ECO4 work, you need PAS 2030/2035 certification and must work with an accredited installer organisation. TrustMark registration is increasingly required across schemes. The process involves training, assessment, and ongoing compliance monitoring. While certification requires investment, it opens access to a significant market of funded work.',
    },
    {
      question: 'What happens if a customer\'s funding application is rejected?',
      answer: 'If an application is rejected, first understand the reason - common issues include incomplete documentation, property not meeting eligibility criteria, or the scheme being oversubscribed. Many schemes allow appeals or reapplication once issues are resolved. Alternative funding sources should be explored: local authority schemes often have different criteria, green finance products may be available, or the customer might qualify under different household circumstances. Always keep copies of submissions and correspondence for reference.',
    },
    {
      question: 'Are there funding options for rental properties and landlords?',
      answer: 'Yes, several options exist for landlords. The Minimum Energy Efficiency Standards (MEES) require rental properties to meet EPC band E minimum (rising to C by 2028). Landlords can access ECO4 funding for eligible tenants, claim Enhanced Capital Allowances for qualifying commercial properties, and use various green finance products. Some local authorities offer specific landlord grants. The key is ensuring tenants benefit from improvements - many schemes require tenant consent and aim to reduce fuel poverty, not just improve property values.',
    },
    {
      question: 'How quickly do funding schemes typically process applications?',
      answer: 'Processing times vary significantly between schemes. ECO4 applications through established installers can be approved within 2-4 weeks. The Boiler Upgrade Scheme requires MCS installer application and typically takes 3-6 weeks. Salix Finance public sector loans can take 8-12 weeks for complex projects. Local authority schemes vary widely - some have simple online applications processed in days, while competitive grant rounds may take months. Advise customers to apply early, especially for time-limited schemes, and have all documentation ready to avoid delays.',
    },
    {
      question: 'What records should I keep when completing funded energy efficiency work?',
      answer: 'Comprehensive record-keeping is essential for funded work. Keep copies of: the original funding approval letter, all quotations and invoices, equipment specifications and serial numbers, manufacturer warranties, completion certificates, before/after photographs, energy calculations used in applications, EPC certificates (before and after if updated), signed customer satisfaction forms, and any compliance documentation required by the scheme. These records protect you professionally, satisfy audit requirements, and help customers with future warranty claims or property sales.',
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a] text-white">
      {/* Header */}
      <div className="bg-[#1a1a1a]/95 border-b border-gray-700">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <PoundSterling className="w-8 h-8 text-elec-yellow" />
            <span className="text-elec-yellow text-sm font-medium">Module 6: Business and Compliance</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Section 3: Incentives and Funding Opportunities
          </h1>
          <p className="text-gray-400">
            Navigate UK funding schemes and help clients access financial support for energy efficiency improvements
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        {/* Learning Objectives */}
        <div className="bg-[#2d2d2d] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-6 h-6 text-elec-yellow" />
            <h2 className="text-xl font-semibold text-white">Learning Objectives</h2>
          </div>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Understand the current landscape of UK energy efficiency funding schemes</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Explain ECO4 eligibility criteria and application processes to customers</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Advise commercial clients on tax relief and capital allowances</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Prepare successful funding applications with appropriate documentation</span>
            </li>
          </ul>
        </div>

        {/* Section 1: UK Government Grants Overview */}
        <section className="bg-[#2d2d2d] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-elec-yellow text-[#1a1a1a] flex items-center justify-center font-bold text-lg">
              1
            </div>
            <h2 className="text-xl font-semibold text-white">UK Government Grants and Schemes Overview</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              The UK government offers multiple funding mechanisms to encourage energy efficiency improvements
              across residential, commercial, and public sectors. Understanding these schemes allows electricians
              to add significant value by helping clients access available financial support.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-lg font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                <Landmark className="w-5 h-5" />
                Key National Schemes (2024-2025)
              </h3>
              <div className="space-y-3">
                <div className="border-l-4 border-elec-yellow pl-3">
                  <h4 className="font-medium text-white">Boiler Upgrade Scheme (BUS)</h4>
                  <p className="text-sm text-gray-400">
                    Grants up to £7,500 for air source heat pumps and £7,500 for ground source heat pumps.
                    Extended to 2028 with increased funding. Must use MCS-certified installer.
                  </p>
                </div>
                <div className="border-l-4 border-green-500 pl-3">
                  <h4 className="font-medium text-white">Great British Insulation Scheme</h4>
                  <p className="text-sm text-gray-400">
                    Replaces ECO+ for insulation measures. Targets homes in EPC bands D-G and
                    households on means-tested benefits. Delivered through energy suppliers.
                  </p>
                </div>
                <div className="border-l-4 border-blue-500 pl-3">
                  <h4 className="font-medium text-white">Home Upgrade Grant (HUG2)</h4>
                  <p className="text-sm text-gray-400">
                    For off-gas-grid homes with EPC D-G. Grants up to £10,000 for energy efficiency
                    measures including insulation, heating, and solar PV.
                  </p>
                </div>
                <div className="border-l-4 border-purple-500 pl-3">
                  <h4 className="font-medium text-white">Social Housing Decarbonisation Fund (SHDF)</h4>
                  <p className="text-sm text-gray-400">
                    Wave 2.1 active through 2025. Funding for social landlords to improve energy
                    efficiency of social housing stock to EPC C.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-900/30 rounded-lg p-4 border border-blue-700">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-blue-400 mb-1">VAT Relief on Energy-Saving Materials</h4>
                  <p className="text-sm text-gray-300">
                    Since April 2022, energy-saving materials installed in residential properties attract
                    0% VAT (reduced from 5%). This applies to insulation, solar panels, heat pumps, and
                    heating controls. The relief is automatic when you invoice for qualifying work -
                    ensure your invoices clearly identify eligible materials.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
                <h4 className="font-medium text-white mb-2 flex items-center gap-2">
                  <Users className="w-5 h-5 text-elec-yellow" />
                  Who Qualifies?
                </h4>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>- Homeowners and private tenants (with landlord permission)</li>
                  <li>- Low-income households (means-tested benefits)</li>
                  <li>- Properties with poor energy ratings (EPC D-G)</li>
                  <li>- Off-gas-grid properties (for HUG2)</li>
                  <li>- Social housing providers</li>
                </ul>
              </div>
              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
                <h4 className="font-medium text-white mb-2 flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-elec-yellow" />
                  Your Role as Installer
                </h4>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>- Assess client eligibility during surveys</li>
                  <li>- Guide customers to appropriate schemes</li>
                  <li>- Obtain required certifications (MCS, PAS 2030)</li>
                  <li>- Provide accurate quotes for applications</li>
                  <li>- Complete installation to scheme standards</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: ECO4 */}
        <section className="bg-[#2d2d2d] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-elec-yellow text-[#1a1a1a] flex items-center justify-center font-bold text-lg">
              2
            </div>
            <h2 className="text-xl font-semibold text-white">Energy Company Obligation (ECO4)</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              ECO4 is the fourth iteration of the Energy Company Obligation scheme, running from 2022 to 2026.
              It obligates larger energy suppliers to fund energy efficiency improvements in eligible homes,
              with a strong focus on achieving whole-house retrofits and reaching fuel-poor households.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-lg font-semibold text-elec-yellow mb-3">ECO4 Eligibility Criteria</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-white mb-2">Property Requirements:</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>- EPC band D, E, F, or G (majority of funding for E-G)</li>
                    <li>- Private tenure (owner-occupied or private rented)</li>
                    <li>- Social housing also eligible with specific criteria</li>
                    <li>- Property must be capable of improvement to band D or better</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-2">Household Requirements:</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>- Receiving qualifying benefits (Universal Credit, Pension Credit, etc.)</li>
                    <li>- Or referred through Local Authority Flex pathway</li>
                    <li>- Scottish and Welsh schemes have additional pathways</li>
                    <li>- Proxy targeting available for areas of high deprivation</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-amber-900/30 rounded-lg p-4 border border-amber-700">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-amber-400 mb-1">ECO4 Whole-House Approach</h4>
                  <p className="text-sm text-gray-300">
                    ECO4 introduced a "fabric first" approach requiring minimum improvement targets. Properties
                    must typically improve by at least two EPC bands (or to band C for D-rated homes). This means
                    multiple measures are often installed together - insulation before heating upgrades. Understand
                    this when advising customers, as single measures may not qualify.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-lg font-semibold text-elec-yellow mb-3">Eligible Measures for Electricians</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-white mb-2">Primary Measures:</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>- Air source heat pumps</li>
                    <li>- Ground source heat pumps</li>
                    <li>- Solar PV systems</li>
                    <li>- Storage heaters (high heat retention)</li>
                    <li>- Electric heating upgrades</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-2">Secondary Measures:</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>- Heating controls and smart thermostats</li>
                    <li>- Hot water cylinder thermostats</li>
                    <li>- LED lighting upgrades</li>
                    <li>- Electrical system upgrades for heat pumps</li>
                    <li>- Battery storage (with solar PV)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-green-900/30 rounded-lg p-4 border border-green-700">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-green-400 mb-1">Working with ECO4 Providers</h4>
                  <p className="text-sm text-gray-300">
                    To deliver ECO4-funded work, partner with approved Managing Agents or Obligated Suppliers.
                    You'll need PAS 2030 (installation) and work under a PAS 2035 (whole-house retrofit)
                    coordinator. Many installers join frameworks that handle customer acquisition and scheme
                    administration, allowing you to focus on quality installation work.
                  </p>
                </div>
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

        {/* Section 3: Enhanced Capital Allowances */}
        <section className="bg-[#2d2d2d] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-elec-yellow text-[#1a1a1a] flex items-center justify-center font-bold text-lg">
              3
            </div>
            <h2 className="text-xl font-semibold text-white">Enhanced Capital Allowances and Tax Relief</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Commercial clients can access significant tax benefits when investing in energy-efficient equipment.
              Understanding these mechanisms allows you to present compelling financial cases for upgrades and
              position yourself as a knowledgeable partner for business customers.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-lg font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Enhanced Capital Allowances (ECAs)
              </h3>
              <div className="space-y-3">
                <p className="text-sm">
                  ECAs allow businesses to write off 100% of the cost of qualifying energy-saving equipment
                  against taxable profits in the year of purchase, rather than claiming depreciation over
                  several years. This provides immediate cash flow benefits.
                </p>
                <div className="bg-[#2d2d2d] rounded p-3">
                  <h4 className="font-medium text-white mb-2">How It Works:</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>1. Equipment must appear on the Energy Technology List (ETL)</li>
                    <li>2. Business purchases and installs qualifying equipment</li>
                    <li>3. Full cost claimed against corporation tax in Year 1</li>
                    <li>4. At 25% corporation tax, a £10,000 investment saves £2,500 immediately</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-lg font-semibold text-white mb-3">Energy Technology List (ETL) Categories</h3>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="bg-[#2d2d2d] rounded p-3">
                  <h4 className="font-medium text-elec-yellow text-sm mb-2">Electrical Equipment</h4>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>- High-efficiency motors (IE3, IE4, IE5)</li>
                    <li>- Variable speed drives</li>
                    <li>- LED lighting systems</li>
                    <li>- Automatic monitoring and targeting</li>
                    <li>- Power factor correction equipment</li>
                  </ul>
                </div>
                <div className="bg-[#2d2d2d] rounded p-3">
                  <h4 className="font-medium text-elec-yellow text-sm mb-2">HVAC and Controls</h4>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>- Heat pumps (air and ground source)</li>
                    <li>- HVAC zone controls</li>
                    <li>- Building energy management systems</li>
                    <li>- High-efficiency chillers</li>
                    <li>- Heat recovery systems</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-blue-900/30 rounded-lg p-4 border border-blue-700">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-blue-400 mb-1">Full Expensing (2023 Onwards)</h4>
                  <p className="text-sm text-gray-300">
                    From April 2023, "full expensing" allows companies to claim 100% first-year relief on
                    qualifying plant and machinery, not just ETL equipment. This has reduced the unique
                    advantage of ECAs, but the ETL remains valuable as it identifies genuinely efficient
                    products and demonstrates environmental credentials to stakeholders.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-lg font-semibold text-white mb-3">Other Tax Benefits</h3>
              <div className="space-y-3">
                <div className="border-l-4 border-elec-yellow pl-3">
                  <h4 className="font-medium text-white">Annual Investment Allowance (AIA)</h4>
                  <p className="text-sm text-gray-400">
                    Permanently set at £1 million. Covers most plant and machinery, providing immediate
                    tax relief. Good for SMEs on general equipment purchases.
                  </p>
                </div>
                <div className="border-l-4 border-green-500 pl-3">
                  <h4 className="font-medium text-white">R&D Tax Credits</h4>
                  <p className="text-sm text-gray-400">
                    Companies developing innovative energy-saving solutions may qualify for R&D relief.
                    Relevant for businesses creating new products or processes.
                  </p>
                </div>
                <div className="border-l-4 border-blue-500 pl-3">
                  <h4 className="font-medium text-white">Land Remediation Relief</h4>
                  <p className="text-sm text-gray-400">
                    150% tax deduction for cleaning up contaminated land, including energy-related
                    contamination from old fuel storage or industrial processes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Green Finance */}
        <section className="bg-[#2d2d2d] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-elec-yellow text-[#1a1a1a] flex items-center justify-center font-bold text-lg">
              4
            </div>
            <h2 className="text-xl font-semibold text-white">Green Finance and PACE-Style Schemes</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Beyond grants and tax relief, innovative financing mechanisms are making energy efficiency
              improvements more accessible. Green finance products allow customers to fund upgrades through
              savings or property-linked payments, removing upfront cost barriers.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-lg font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                <Leaf className="w-5 h-5" />
                Green Finance Options
              </h3>
              <div className="space-y-4">
                <div className="bg-[#2d2d2d] rounded p-3">
                  <h4 className="font-medium text-white mb-2">Green Mortgages</h4>
                  <p className="text-sm text-gray-400">
                    Preferential mortgage rates for energy-efficient homes (typically EPC A or B).
                    Additional borrowing available for energy improvements. Major lenders including
                    Barclays, NatWest, and Nationwide offer products. Customers can borrow extra
                    to fund efficiency upgrades at mortgage rates rather than higher loan rates.
                  </p>
                </div>
                <div className="bg-[#2d2d2d] rounded p-3">
                  <h4 className="font-medium text-white mb-2">Green Loans and Credit</h4>
                  <p className="text-sm text-gray-400">
                    Dedicated loan products for home improvements. British Business Bank backs
                    green lending to SMEs. Some credit unions offer favourable rates for energy
                    efficiency. Interest rates typically 3-8% depending on credit score and lender.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-lg font-semibold text-white mb-3">Property Assessed Clean Energy (PACE)</h3>
              <p className="text-sm text-gray-400 mb-3">
                PACE financing, popular in the US, is being piloted in the UK. The key innovation is that
                repayment is linked to the property, not the individual:
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="bg-[#2d2d2d] rounded p-3">
                  <h4 className="font-medium text-elec-yellow text-sm mb-2">How PACE Works</h4>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>- Finance attached to property, not person</li>
                    <li>- Repayment through council tax or similar</li>
                    <li>- Transfers with property on sale</li>
                    <li>- Long terms match equipment lifespan</li>
                    <li>- No personal credit check required</li>
                  </ul>
                </div>
                <div className="bg-[#2d2d2d] rounded p-3">
                  <h4 className="font-medium text-elec-yellow text-sm mb-2">UK Status</h4>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>- Green Finance Institute developing models</li>
                    <li>- Local authority pilots underway</li>
                    <li>- Commercial PACE more advanced</li>
                    <li>- Legislation needed for full rollout</li>
                    <li>- Watch for announcements 2024-2025</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-green-900/30 rounded-lg p-4 border border-green-700">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-green-400 mb-1">Energy Service Companies (ESCOs)</h4>
                  <p className="text-sm text-gray-300">
                    ESCOs offer "pay-as-you-save" models where energy improvements are funded by the
                    ESCO and repaid through a share of energy savings. No upfront cost to the customer.
                    Common in commercial and public sectors. As an electrician, you might work as a
                    subcontractor to ESCOs delivering large-scale efficiency projects.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-lg font-semibold text-white mb-3">Financing Conversations with Customers</h3>
              <p className="text-sm text-gray-400">
                When discussing funding options, focus on total cost of ownership rather than upfront price.
                A heat pump costing £10,000 with £7,500 BUS grant and annual savings of £500 has a very
                different financial profile than the sticker price suggests. Help customers understand:
              </p>
              <ul className="text-sm text-gray-400 mt-2 space-y-1">
                <li>- Available grants reduce effective cost</li>
                <li>- Energy savings offset any remaining finance costs</li>
                <li>- Property value increase from better EPC rating</li>
                <li>- Protection from future energy price rises</li>
                <li>- Environmental benefits and carbon savings</li>
              </ul>
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

        {/* Section 5: Local Authority and Regional Funding */}
        <section className="bg-[#2d2d2d] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-elec-yellow text-[#1a1a1a] flex items-center justify-center font-bold text-lg">
              5
            </div>
            <h2 className="text-xl font-semibold text-white">Local Authority and Regional Funding</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Local authorities play a crucial role in delivering energy efficiency funding, often with
              schemes tailored to local needs and conditions. Understanding your local landscape can
              open doors to funded work that national schemes don't reach.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-lg font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Local Authority Delivery (LAD) Schemes
              </h3>
              <p className="text-sm text-gray-400 mb-3">
                Local authorities receive central government funding to deliver energy efficiency
                improvements. Programmes vary by area but commonly include:
              </p>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>- Home Upgrade Grant delivery (HUG2) for off-gas properties</li>
                <li>- Local ECO Flex schemes with area-specific eligibility</li>
                <li>- Fuel poverty initiatives targeting vulnerable residents</li>
                <li>- Area-based retrofit programmes</li>
                <li>- Partnership schemes with housing associations</li>
              </ul>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Landmark className="w-5 h-5 text-elec-yellow" />
                Salix Finance - Public Sector Funding
              </h3>
              <div className="space-y-3">
                <p className="text-sm text-gray-400">
                  Salix Finance is the government's dedicated provider of interest-free loans for
                  energy efficiency in public sector buildings. A major source of funded work for
                  electricians serving schools, hospitals, councils, and other public bodies.
                </p>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="bg-[#2d2d2d] rounded p-3">
                    <h4 className="font-medium text-elec-yellow text-sm mb-2">Eligible Organisations</h4>
                    <ul className="text-xs text-gray-400 space-y-1">
                      <li>- Local authorities</li>
                      <li>- NHS trusts and health bodies</li>
                      <li>- Schools and academies</li>
                      <li>- Universities and colleges</li>
                      <li>- Emergency services</li>
                      <li>- Central government departments</li>
                    </ul>
                  </div>
                  <div className="bg-[#2d2d2d] rounded p-3">
                    <h4 className="font-medium text-elec-yellow text-sm mb-2">Loan Terms</h4>
                    <ul className="text-xs text-gray-400 space-y-1">
                      <li>- 0% interest rate</li>
                      <li>- Repayment from energy savings</li>
                      <li>- Terms up to 8 years (longer for some)</li>
                      <li>- No minimum project size</li>
                      <li>- Quick application process</li>
                      <li>- Technical support available</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-900/30 rounded-lg p-4 border border-blue-700">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-blue-400 mb-1">Public Sector Decarbonisation Scheme</h4>
                  <p className="text-sm text-gray-300">
                    Salix also administers the Public Sector Decarbonisation Scheme - capital grants
                    (not loans) for heat decarbonisation and energy efficiency. Funding rounds open
                    periodically with competitive applications. Projects must demonstrate significant
                    carbon savings. Keep clients informed about application windows.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-lg font-semibold text-white mb-3">Devolved Nations</h3>
              <div className="grid md:grid-cols-3 gap-3">
                <div className="bg-[#2d2d2d] rounded p-3">
                  <h4 className="font-medium text-blue-400 text-sm mb-2">Scotland</h4>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>- Home Energy Scotland grants</li>
                    <li>- Warmer Homes Scotland</li>
                    <li>- Area-based schemes</li>
                    <li>- Interest-free loans up to £15k</li>
                  </ul>
                </div>
                <div className="bg-[#2d2d2d] rounded p-3">
                  <h4 className="font-medium text-red-400 text-sm mb-2">Wales</h4>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>- Nest scheme</li>
                    <li>- Warm Homes Programme</li>
                    <li>- Arbed area schemes</li>
                    <li>- Social housing focus</li>
                  </ul>
                </div>
                <div className="bg-[#2d2d2d] rounded p-3">
                  <h4 className="font-medium text-green-400 text-sm mb-2">Northern Ireland</h4>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>- Affordable Warmth</li>
                    <li>- Boiler Replacement</li>
                    <li>- NISEP measures</li>
                    <li>- Oil-focused transition</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-green-900/30 rounded-lg p-4 border border-green-700">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-green-400 mb-1">Finding Local Schemes</h4>
                  <p className="text-sm text-gray-300">
                    Local schemes change frequently. Build relationships with your local authority's
                    energy or housing team. Sign up for newsletters from Energy Saving Trust and local
                    energy agencies. Network with other installers to share intelligence. Being first
                    to know about new funding creates competitive advantage.
                  </p>
                </div>
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

        {/* Section 6: Successful Funding Applications */}
        <section className="bg-[#2d2d2d] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-elec-yellow text-[#1a1a1a] flex items-center justify-center font-bold text-lg">
              6
            </div>
            <h2 className="text-xl font-semibold text-white">Preparing Successful Funding Applications</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Whether supporting customers with their applications or submitting directly as an installer,
              well-prepared applications have significantly higher success rates. Understanding what funders
              look for helps you and your clients secure available support.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-lg font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                <ClipboardList className="w-5 h-5" />
                Essential Documentation Checklist
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-white mb-2">Property Documentation</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span>Valid EPC certificate (less than 10 years old)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span>Proof of ownership or tenancy</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span>Property photographs (exterior and relevant areas)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span>Floor plans if available</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span>Landlord permission letter (if rented)</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-2">Financial Documentation</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span>Benefits letters (for means-tested schemes)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span>Recent energy bills (12 months ideal)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span>Detailed installer quotes</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span>Business accounts (commercial applications)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span>Energy saving calculations</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5 text-elec-yellow" />
                Building a Strong Business Case
              </h3>
              <p className="text-sm text-gray-400 mb-3">
                For commercial and public sector applications, a compelling business case is essential:
              </p>
              <div className="space-y-3">
                <div className="border-l-4 border-elec-yellow pl-3">
                  <h4 className="font-medium text-white">Current Situation</h4>
                  <p className="text-sm text-gray-400">
                    Document existing energy consumption, costs, and carbon emissions. Include equipment
                    age and efficiency ratings. Identify specific problems (high bills, comfort issues,
                    maintenance costs).
                  </p>
                </div>
                <div className="border-l-4 border-green-500 pl-3">
                  <h4 className="font-medium text-white">Proposed Solution</h4>
                  <p className="text-sm text-gray-400">
                    Detail the proposed measures with specifications. Explain why this solution was chosen.
                    Reference equipment from ETL or MCS certification where applicable.
                  </p>
                </div>
                <div className="border-l-4 border-blue-500 pl-3">
                  <h4 className="font-medium text-white">Projected Benefits</h4>
                  <p className="text-sm text-gray-400">
                    Calculate expected energy savings (kWh and costs). Show carbon reduction (kgCO2e).
                    Include maintenance savings and other benefits. Calculate simple payback period.
                  </p>
                </div>
                <div className="border-l-4 border-purple-500 pl-3">
                  <h4 className="font-medium text-white">Financial Summary</h4>
                  <p className="text-sm text-gray-400">
                    Total project cost, funding requested, any match funding, annual savings projection,
                    payback period, lifetime savings. For Salix loans, show how savings cover repayments.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-amber-900/30 rounded-lg p-4 border border-amber-700">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-amber-400 mb-1">Common Application Mistakes</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>- Submitting expired EPC certificates</li>
                    <li>- Incomplete eligibility evidence</li>
                    <li>- Unrealistic savings projections</li>
                    <li>- Missing installer certifications (MCS, PAS 2030)</li>
                    <li>- Incorrect measure specifications</li>
                    <li>- Failing to check current scheme status before applying</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-600">
              <h3 className="text-lg font-semibold text-white mb-3">Quality Quotes for Applications</h3>
              <p className="text-sm text-gray-400 mb-3">
                Your quotes become part of funding applications. Include:
              </p>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>- Full company details and certification numbers (MCS, NICEIC, etc.)</li>
                <li>- Detailed breakdown of equipment with make, model, and specifications</li>
                <li>- Installation costs itemised separately from equipment</li>
                <li>- Reference to ETL product numbers where applicable</li>
                <li>- Expected energy savings with calculation methodology</li>
                <li>- Warranty terms and aftercare provisions</li>
                <li>- Timeline for installation</li>
                <li>- Valid period for quote (minimum 60 days for most schemes)</li>
              </ul>
            </div>

            <div className="bg-green-900/30 rounded-lg p-4 border border-green-700">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-green-400 mb-1">Supporting Your Customers</h4>
                  <p className="text-sm text-gray-300">
                    Many customers find funding applications daunting. Differentiate your service by:
                    providing template letters, helping gather documentation, explaining eligibility
                    clearly, following up on application progress, and being responsive to funder queries.
                    This support often converts quotes into confirmed work.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 rounded-lg p-6 border border-elec-yellow/50">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-6 h-6 text-elec-yellow" />
            <h2 className="text-xl font-semibold text-white">Quick Reference Card</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-elec-yellow mb-3">Key Funding Sources</h3>
              <div className="space-y-2 text-sm">
                <div className="bg-[#1a1a1a] rounded p-2">
                  <span className="text-white font-medium">Boiler Upgrade Scheme:</span>
                  <span className="text-gray-400"> Up to £7,500 for heat pumps</span>
                </div>
                <div className="bg-[#1a1a1a] rounded p-2">
                  <span className="text-white font-medium">ECO4:</span>
                  <span className="text-gray-400"> Low-income households, EPC D-G</span>
                </div>
                <div className="bg-[#1a1a1a] rounded p-2">
                  <span className="text-white font-medium">HUG2:</span>
                  <span className="text-gray-400"> Off-gas homes, up to £10,000</span>
                </div>
                <div className="bg-[#1a1a1a] rounded p-2">
                  <span className="text-white font-medium">Salix Finance:</span>
                  <span className="text-gray-400"> 0% loans for public sector</span>
                </div>
                <div className="bg-[#1a1a1a] rounded p-2">
                  <span className="text-white font-medium">ECAs:</span>
                  <span className="text-gray-400"> 100% first-year tax relief (ETL equipment)</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-elec-yellow mb-3">Application Essentials</h3>
              <div className="space-y-2 text-sm">
                <div className="bg-[#1a1a1a] rounded p-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-gray-300">Valid EPC certificate</span>
                </div>
                <div className="bg-[#1a1a1a] rounded p-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-gray-300">Proof of eligibility (benefits/income)</span>
                </div>
                <div className="bg-[#1a1a1a] rounded p-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-gray-300">Certified installer quotes</span>
                </div>
                <div className="bg-[#1a1a1a] rounded p-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-gray-300">Energy savings calculations</span>
                </div>
                <div className="bg-[#1a1a1a] rounded p-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-gray-300">Property ownership/permission</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-elec-yellow mb-3">Required Certifications</h3>
              <div className="space-y-2 text-sm">
                <div className="bg-[#1a1a1a] rounded p-2">
                  <span className="text-white font-medium">MCS:</span>
                  <span className="text-gray-400"> Required for BUS heat pump installations</span>
                </div>
                <div className="bg-[#1a1a1a] rounded p-2">
                  <span className="text-white font-medium">PAS 2030:</span>
                  <span className="text-gray-400"> ECO4 measure installation</span>
                </div>
                <div className="bg-[#1a1a1a] rounded p-2">
                  <span className="text-white font-medium">PAS 2035:</span>
                  <span className="text-gray-400"> Whole-house retrofit coordination</span>
                </div>
                <div className="bg-[#1a1a1a] rounded p-2">
                  <span className="text-white font-medium">TrustMark:</span>
                  <span className="text-gray-400"> Required for most government schemes</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-elec-yellow mb-3">Useful Resources</h3>
              <div className="space-y-2 text-sm">
                <div className="bg-[#1a1a1a] rounded p-2 text-gray-300">
                  gov.uk/energy-efficiency-home - Official scheme info
                </div>
                <div className="bg-[#1a1a1a] rounded p-2 text-gray-300">
                  salixfinance.co.uk - Public sector loans
                </div>
                <div className="bg-[#1a1a1a] rounded p-2 text-gray-300">
                  gov.uk/energy-technology-list - ETL product search
                </div>
                <div className="bg-[#1a1a1a] rounded p-2 text-gray-300">
                  energysavingtrust.org.uk - Consumer guidance
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="bg-[#2d2d2d] rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">Knowledge Check</h2>
          <p className="text-gray-400 mb-6">
            Test your understanding of incentives and funding opportunities with this quiz.
          </p>
          <Quiz
            questions={quizQuestions}
            moduleId="energy-efficiency-m6s3"
            onComplete={(score) => {
              console.log(`Quiz completed with score: ${score}/${quizQuestions.length}`);
            }}
          />
        </section>

        {/* FAQs */}
        <section className="bg-[#2d2d2d] rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-[#1a1a1a] rounded-lg border border-gray-600 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  className="w-full px-4 py-3 flex items-center justify-between text-left min-h-[44px] touch-manipulation active:scale-[0.98]"
                >
                  <span className="font-medium text-white pr-4">{faq.question}</span>
                  {expandedFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-elec-yellow flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-elec-yellow flex-shrink-0" />
                  )}
                </button>
                {expandedFAQ === index && (
                  <div className="px-4 pb-4">
                    <p className="text-gray-400 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6">
          <Button
            onClick={() => navigate('/upskilling/energy-efficiency/module-6/section-2')}
            variant="outline"
            className="min-h-[44px] touch-manipulation active:scale-[0.98] border-gray-600 text-white hover:bg-gray-700 flex items-center gap-2"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Previous: Section 2</span>
          </Button>
          <Button
            onClick={() => navigate('/upskilling/energy-efficiency/module-6/section-4')}
            className="min-h-[44px] touch-manipulation active:scale-[0.98] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 flex items-center gap-2"
          >
            <span>Next: Section 4</span>
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EnergyEfficiencyModule6Section3;
