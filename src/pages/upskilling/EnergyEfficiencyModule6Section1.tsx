import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Zap, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const TITLE = 'ESOS, SECR, and Building Regs Overview - Energy Efficiency Module 6 Section 1';
const DESCRIPTION = 'Learn about UK energy efficiency regulations including ESOS, SECR, Building Regulations Part L, MEES, and DECs. Understand compliance requirements, thresholds, and how electricians can help clients meet regulatory obligations.';

const quickCheckQuestions = [
  {
    id: 'ee-m6s1-qc1',
    question: 'What is the qualifying threshold for ESOS compliance?',
    options: [
      'Any business with energy bills over £50,000',
      'Large undertakings with 250+ employees OR turnover >£44m and balance sheet >£38m',
      'All limited companies regardless of size',
      'Only businesses in the energy sector'
    ],
    correctIndex: 1,
    explanation: 'ESOS applies to large undertakings - those with 250 or more employees, OR those with fewer employees but annual turnover exceeding £44 million AND a balance sheet total exceeding £38 million.'
  },
  {
    id: 'ee-m6s1-qc2',
    question: 'What is the minimum EPC rating required for rented commercial properties under MEES from April 2023?',
    options: [
      'Rating D or above',
      'Rating C or above',
      'Rating E or above',
      'Rating B or above'
    ],
    correctIndex: 2,
    explanation: 'Since April 2023, MEES requires all rented commercial properties to have an EPC rating of E or above. Properties with F or G ratings cannot be legally let unless they have a valid exemption registered.'
  },
  {
    id: 'ee-m6s1-qc3',
    question: 'Which type of building requires a Display Energy Certificate (DEC)?',
    options: [
      'All commercial buildings regardless of size',
      'Public buildings over 250m² frequently visited by the public',
      'Only government buildings',
      'Any building with an EPC'
    ],
    correctIndex: 1,
    explanation: 'DECs are mandatory for public authority buildings over 250m² that are frequently visited by the public. Buildings over 1,000m² must renew annually, while those between 250-1,000m² can renew every 10 years.'
  }
];

const quizQuestions = [
  {
    id: 1,
    question: 'How often must ESOS compliance assessments be conducted?',
    options: ['Annually', 'Every 2 years', 'Every 4 years', 'Every 5 years'],
    correctAnswer: 2,
    explanation: 'ESOS compliance assessments must be conducted every 4 years, with each phase having a specific deadline.'
  },
  {
    id: 2,
    question: 'What is the maximum penalty for ESOS non-compliance?',
    options: ['£5,000', '£50,000', '£90,000 plus daily fines', '£250,000'],
    correctAnswer: 2,
    explanation: 'ESOS non-compliance can result in penalties up to £90,000 plus daily fines of £500 for continuing breaches.'
  },
  {
    id: 3,
    question: 'Which companies must report under SECR?',
    options: [
      'All UK registered companies',
      'Quoted companies, large unquoted companies, and large LLPs',
      'Only FTSE 100 companies',
      'Only manufacturing companies'
    ],
    correctAnswer: 1,
    explanation: 'SECR applies to quoted companies, large unquoted companies, and large LLPs meeting specific size thresholds.'
  },
  {
    id: 4,
    question: 'What percentage of energy must be covered in an ESOS audit?',
    options: ['50%', '75%', '90%', '100%'],
    correctAnswer: 2,
    explanation: 'An ESOS audit must cover at least 90% of the organisation\'s total energy consumption.'
  },
  {
    id: 5,
    question: 'Building Regulations Part L 2021 requires what improvement in CO2 emissions compared to 2013 standards for new dwellings?',
    options: ['15% reduction', '21% reduction', '31% reduction', '50% reduction'],
    correctAnswer: 2,
    explanation: 'Part L 2021 requires a 31% reduction in CO2 emissions compared to 2013 standards for new dwellings.'
  },
  {
    id: 6,
    question: 'What is the penalty cap for MEES breaches on commercial properties?',
    options: ['£5,000', '£50,000', '£150,000', '£500,000'],
    correctAnswer: 2,
    explanation: 'Commercial MEES breaches can result in penalties up to £150,000 per property based on rateable value.'
  },
  {
    id: 7,
    question: 'Who is the lead assessor required for ESOS compliance?',
    options: [
      'Any qualified electrician',
      'A registered ESOS Lead Assessor from an approved register',
      'The company\'s financial director',
      'Any building surveyor'
    ],
    correctAnswer: 1,
    explanation: 'ESOS requires sign-off by a registered Lead Assessor from an approved register such as CIBSE or IEMA.'
  },
  {
    id: 8,
    question: 'Under SECR, what intensity ratio must be reported?',
    options: [
      'Energy use per employee',
      'CO2 emissions per unit of revenue or other appropriate metric',
      'Energy cost per square metre',
      'Carbon offset percentage'
    ],
    correctAnswer: 1,
    explanation: 'SECR requires at least one intensity ratio, commonly tCO2e per £million revenue or per employee.'
  },
  {
    id: 9,
    question: 'What is the minimum fabric U-value requirement for new external walls under Part L 2021?',
    options: ['0.18 W/m²K', '0.26 W/m²K', '0.35 W/m²K', '0.45 W/m²K'],
    correctAnswer: 1,
    explanation: 'Part L 2021 requires external walls to achieve a U-value of 0.26 W/m²K or better.'
  },
  {
    id: 10,
    question: 'How long is a DEC valid for buildings over 1,000m²?',
    options: ['6 months', '1 year', '5 years', '10 years'],
    correctAnswer: 1,
    explanation: 'DECs for buildings over 1,000m² must be renewed annually to reflect actual operational energy performance.'
  }
];

const faqs = [
  {
    question: 'Can small businesses be caught by ESOS through group structures?',
    answer: 'Yes, this is a common pitfall. If a small business is part of a corporate group where the combined group meets the ESOS thresholds, ALL businesses in that group must be included in the ESOS assessment. This includes franchises under common ownership, subsidiary companies, and joint ventures where one party has dominant influence.'
  },
  {
    question: 'What exemptions exist for MEES compliance?',
    answer: 'Several exemptions exist including: buildings with valid exemptions registered on the PRS Exemptions Register, listed buildings where compliance would unacceptably alter character, temporary buildings with planned use under 2 years, stand-alone buildings under 50m², and properties where all cost-effective improvements have been made but still don\'t reach E rating.'
  },
  {
    question: 'How do Part L requirements differ for existing buildings vs new builds?',
    answer: 'New builds must meet full Part L 2021 standards including the new "primary energy" metric and enhanced U-values. Existing buildings trigger Part L when undertaking "building work" including extensions, material alterations, and replacement of thermal elements or controlled services, with requirements focusing on "consequential improvements".'
  },
  {
    question: 'What records must be kept for SECR compliance?',
    answer: 'Companies must maintain records of total UK energy consumption in kWh, associated greenhouse gas emissions in tonnes CO2e, at least one intensity ratio, previous year\'s figures for comparison, methodology descriptions, and energy efficiency actions taken during the reporting year.'
  },
  {
    question: 'Can electricians become ESOS Lead Assessors?',
    answer: 'Yes, electricians can become ESOS Lead Assessors by joining an approved professional body register such as CIBSE, IEMA, or the Energy Institute. Requirements typically include relevant qualifications (minimum Level 4), demonstrated competence, professional indemnity insurance, and completing approved ESOS training.'
  },
  {
    question: 'How do DECs and EPCs differ?',
    answer: 'EPCs rate theoretical energy efficiency (A-G) based on building design and are required when buildings are constructed, sold, or let. DECs show actual operational energy use compared to a benchmark, are only required for public authority buildings over 250m² frequently visited by the public, and reflect real energy consumption patterns including occupant behaviour.'
  }
];

const EnergyEfficiencyModule6Section1: React.FC = () => {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  useSEO({
    title: TITLE,
    description: DESCRIPTION,
    keywords: ['ESOS', 'SECR', 'Building Regulations Part L', 'MEES', 'DEC', 'energy efficiency regulations', 'UK compliance'],
    canonicalUrl: '/study-centre/upskilling/energy-efficiency/module-6/section-1'
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 6 Section 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            ESOS, SECR, and Building Regs Overview
          </h1>
          <p className="text-white/80">
            Understanding UK energy efficiency regulations and compliance requirements
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>ESOS:</strong> Every 4 years for large enterprises</li>
              <li><strong>SECR:</strong> Annual reporting in Directors' Report</li>
              <li><strong>MEES:</strong> EPC E minimum for rental properties</li>
              <li><strong>Part L:</strong> Building energy efficiency standards</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Opportunities</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>LED upgrades:</strong> Improve EPC ratings</li>
              <li><strong>Sub-metering:</strong> Support compliance data</li>
              <li><strong>Heat pumps:</strong> Part L and MEES compliance</li>
              <li><strong>Consultancy:</strong> Become Lead Assessor</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'ESOS thresholds and compliance requirements',
              'SECR annual reporting obligations',
              'Building Regulations Part L standards',
              'MEES requirements for rental properties',
              'DEC requirements for public buildings',
              'How electricians can support compliance'
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: ESOS */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            ESOS (Energy Savings Opportunity Scheme)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              ESOS is a mandatory energy assessment scheme for large UK undertakings, introduced in 2014 under the EU Energy Efficiency Directive and retained post-Brexit. It requires qualifying organisations to conduct comprehensive energy audits every four years, identifying energy-saving opportunities across their operations.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Who must comply:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Organisations with 250+ employees in the UK</li>
                <li>OR those with annual turnover exceeding £44 million AND balance sheet exceeding £38 million</li>
                <li>Corporate groups assessed together - all subsidiaries included</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">ESOS requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Audit covering minimum 90% of total energy use</li>
                <li>Buildings, industrial processes, and transport included</li>
                <li>Signed off by registered Lead Assessor</li>
                <li>Notify Environment Agency of compliance</li>
                <li>Maintain records for the compliance period</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">Penalties for non-compliance:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>£5,000 - Failure to maintain records</li>
                <li>£50,000 - Failure to undertake an energy audit</li>
                <li>£50,000 - Failure to notify the Environment Agency</li>
                <li>Up to £90,000 total initial penalties plus £500/day continuing fines</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: SECR */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            SECR (Streamlined Energy and Carbon Reporting)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              SECR replaced the Carbon Reduction Commitment (CRC) scheme from April 2019. It requires qualifying companies to report their energy use and carbon emissions annually within their Directors' Report. Unlike ESOS, SECR is an ongoing annual reporting obligation focused on transparency and year-on-year comparison.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Who must report:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Quoted companies:</strong> All UK quoted companies regardless of size</li>
                <li><strong>Large unquoted companies:</strong> Meeting 2 of 3 criteria - 250+ employees, £36m turnover, £18m balance sheet</li>
                <li><strong>Large LLPs:</strong> Same thresholds as unquoted companies</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">What must be reported:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>UK electricity consumption (kWh)</li>
                <li>UK gas consumption (kWh)</li>
                <li>UK transport energy (business vehicles)</li>
                <li>Associated GHG emissions (tCO2e)</li>
                <li>At least one intensity ratio (e.g., tCO2e per £m revenue)</li>
                <li>Energy efficiency actions taken</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 03: Building Regulations Part L */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Building Regulations Part L
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Part L of the Building Regulations sets standards for energy efficiency in new and existing buildings. The 2021 update (effective June 2022 in England) introduced significant uplift in standards as a stepping stone toward the Future Homes Standard (2025) and Future Buildings Standard.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Part L1A - New dwellings:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>31% reduction in CO2 vs Part L 2013</li>
                <li>New "Primary Energy" metric introduced</li>
                <li>Higher fabric standards (U-values)</li>
                <li>Improved air tightness requirements</li>
                <li>Low-carbon heating encouraged</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key electrical requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Lighting efficacy:</strong> All fixed lighting must achieve at least 75 lumens per watt</li>
                <li><strong>EV charging:</strong> New residential buildings with parking must have charge points</li>
                <li><strong>Controls:</strong> Time switches, thermostatic controls, and zone controls required</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: MEES */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            MEES (Minimum Energy Efficiency Standards)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              MEES regulations set minimum EPC ratings for rented properties in England and Wales. Introduced to improve the energy efficiency of the private rented sector, MEES makes it unlawful to grant new tenancies or continue existing ones for properties below the minimum standard.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Current requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Domestic:</strong> EPC E minimum for all tenancies (from April 2020)</li>
                <li><strong>Commercial:</strong> EPC E minimum for all tenancies (from April 2023)</li>
                <li><strong>Future domestic:</strong> EPC C proposed for 2028-2030</li>
                <li><strong>Future commercial:</strong> EPC B proposed for 2030</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">Penalties:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Domestic:</strong> Up to £5,000 per property</li>
                <li><strong>Commercial:</strong> Up to £150,000 per property (based on rateable value)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">How electricians help landlords:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>LED lighting upgrades - typically improves EPC by 1-5 points</li>
                <li>Heating controls - programmable thermostats, TRVs, zone controls</li>
                <li>Electric heating upgrades - modern storage heaters, panel heaters</li>
                <li>Solar PV installation - significant EPC improvement</li>
                <li>Heat pump electrical installations</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 05: DECs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Display Energy Certificates (DECs)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Display Energy Certificates show the actual energy performance of public buildings, based on metered energy consumption over the previous 12 months. Unlike EPCs which show theoretical performance, DECs reflect real-world energy use including occupant behaviour and operational patterns.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Who needs a DEC:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Buildings occupied by a public authority</li>
                <li>Total useful floor area over 250m²</li>
                <li>Frequently visited by the public</li>
                <li>Examples: schools, hospitals, council offices, leisure centres, libraries</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Validity and requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Over 1,000m²:</strong> Renew annually</li>
                <li><strong>250-1,000m²:</strong> Renew every 10 years</li>
                <li>Must be prominently displayed in the building</li>
                <li>Advisory Report required (valid 7 years)</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 06: Compliance Timeline */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Compliance Timeline Summary
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key dates:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>2023:</strong> ESOS Phase 3 deadline, MEES E rating all commercial</li>
                <li><strong>2025:</strong> Future Homes Standard (expected)</li>
                <li><strong>2027:</strong> ESOS Phase 4 deadline</li>
                <li><strong>2028-30:</strong> MEES C domestic (proposed), MEES B commercial (proposed)</li>
                <li><strong>2050:</strong> Net Zero target - all buildings must be decarbonised</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Business opportunities for electricians:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>LED lighting retrofits for MEES compliance</li>
                <li>Sub-metering installation for ESOS/SECR</li>
                <li>EV charging for Part L compliance</li>
                <li>Solar PV for EPC improvements</li>
                <li>BEMS installation and commissioning</li>
                <li>Power factor correction</li>
                <li>Smart heating control systems</li>
                <li>Energy audit services (with Lead Assessor training)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When advising clients on compliance</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Check if they fall under ESOS thresholds (including group structures)</li>
                <li>Understand their MEES obligations for any rental properties</li>
                <li>Identify quick wins that improve EPC ratings</li>
                <li>Recommend sub-metering for better energy data</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When quoting energy efficiency work</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Include estimated energy savings in kWh and cost</li>
                <li>Reference relevant compliance requirements</li>
                <li>Highlight payback periods and ROI</li>
                <li>Note any available grants or funding</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common mistakes to avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Ignoring group structures</strong> - SMEs may be captured through parent companies</li>
                <li><strong>Missing exemption deadlines</strong> - MEES exemptions must be registered</li>
                <li><strong>Incomplete documentation</strong> - Keep records for the full compliance period</li>
                <li><strong>Not staying current</strong> - Regulations change frequently</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  className="w-full flex items-center justify-between text-left min-h-[44px] touch-manipulation"
                >
                  <h3 className="text-sm font-medium text-white pr-4">{faq.question}</h3>
                  {expandedFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-elec-yellow flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-elec-yellow flex-shrink-0" />
                  )}
                </button>
                {expandedFAQ === index && (
                  <p className="text-sm text-white/90 leading-relaxed mt-2">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Reference Card */}
        <section className="mb-10">
          <div className="mt-6 p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Regulation Thresholds</p>
                <ul className="space-y-0.5">
                  <li>ESOS: 250+ employees OR £44m + £38m</li>
                  <li>SECR: 2 of 250+ / £36m / £18m</li>
                  <li>MEES: All private rentals</li>
                  <li>DECs: Public buildings &gt;250m²</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Maximum Penalties</p>
                <ul className="space-y-0.5">
                  <li>ESOS: £90,000 + £500/day</li>
                  <li>MEES Commercial: £150,000</li>
                  <li>MEES Domestic: £5,000</li>
                  <li>DECs: £1,500</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-2">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EnergyEfficiencyModule6Section1;
