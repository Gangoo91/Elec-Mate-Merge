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
  BarChart3,
  Building2,
  PoundSterling,
  Calculator,
  Target,
  Users,
  Lightbulb,
  ThermometerSun,
  FileBarChart,
  Zap,
  BookOpen,
  AlertTriangle
} from 'lucide-react';

const EnergyEfficiencyModule3Section3: React.FC = () => {
  const navigate = useNavigate();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  useSEO({
    title: 'Comparing to Benchmarks and Tariffs | Energy Efficiency Module 3 Section 3',
    description: 'Learn UK energy benchmarks including CIBSE TM46, Display Energy Certificates, degree day correction, and electricity tariff structures for effective energy analysis.',
    keywords: [
      'CIBSE TM46',
      'Display Energy Certificate',
      'DEC ratings',
      'energy benchmarks',
      'degree day correction',
      'electricity tariffs',
      'DUoS charges',
      'TNUoS',
      'kWh per square metre',
      'building energy performance'
    ]
  });

  const quickCheckQuestions = [
    {
      id: 'qc1-m3s3',
      question: 'What does a Display Energy Certificate (DEC) rating of "A" indicate?',
      options: [
        'The building uses more energy than the benchmark',
        'The building uses significantly less energy than the typical benchmark',
        'The building has no heating system',
        'The building is newly constructed'
      ],
      correctIndex: 1,
      explanation: 'A DEC rating of "A" indicates the building uses significantly less energy than the typical benchmark for that building type. The scale runs from A (most efficient, less than 25% of typical) to G (least efficient, over 150% of typical).'
    },
    {
      id: 'qc2-m3s3',
      question: 'Why is degree day correction important when comparing energy consumption across different years?',
      options: [
        'It accounts for different building sizes',
        'It normalises for weather variations affecting heating/cooling demand',
        'It converts between different fuel types',
        'It adjusts for electricity price changes'
      ],
      correctIndex: 1,
      explanation: 'Degree day correction normalises energy consumption data to account for weather variations between different time periods. This ensures like-for-like comparisons by removing the effect of warmer or colder weather on heating and cooling demand.'
    },
    {
      id: 'qc3-m3s3',
      question: 'Which component of electricity costs typically varies by time of day and is charged by the Distribution Network Operator?',
      options: [
        'Commodity cost',
        'TNUoS (Transmission Network Use of System)',
        'DUoS (Distribution Use of System)',
        'Climate Change Levy'
      ],
      correctIndex: 2,
      explanation: 'DUoS (Distribution Use of System) charges are levied by Distribution Network Operators and typically vary by time of day with red, amber, and green time bands. This creates opportunities for load shifting to reduce costs.'
    }
  ];

  const quizQuestions = [
    {
      question: 'According to CIBSE TM46, what is the typical electricity benchmark for a general office building?',
      options: ['50 kWh/m²/year', '95 kWh/m²/year', '150 kWh/m²/year', '200 kWh/m²/year'],
      correctAnswer: '95 kWh/m²/year'
    },
    {
      question: 'What is the formula for calculating the Energy Performance Indicator used in DECs?',
      options: [
        'Total energy cost ÷ floor area',
        'Actual energy use ÷ benchmark energy use × 100',
        'kWh consumed × carbon factor',
        'Floor area × occupancy hours'
      ],
      correctAnswer: 'Actual energy use ÷ benchmark energy use × 100'
    },
    {
      question: 'Which public buildings in England and Wales require a Display Energy Certificate?',
      options: [
        'All public buildings',
        'Public buildings over 250m² frequently visited by the public',
        'Only government offices',
        'Buildings built after 2008'
      ],
      correctAnswer: 'Public buildings over 250m² frequently visited by the public'
    },
    {
      question: 'What is a heating degree day based on in the UK?',
      options: [
        'The average outdoor temperature being below 15.5°C',
        'The indoor temperature falling below 21°C',
        'The difference between outdoor and indoor temperatures',
        'The number of hours heating is required'
      ],
      correctAnswer: 'The average outdoor temperature being below 15.5°C'
    },
    {
      question: 'Which electricity tariff component is charged based on usage during peak demand periods (Triads)?',
      options: [
        'DUoS charges',
        'TNUoS charges',
        'BSUoS charges',
        'Commodity charges'
      ],
      correctAnswer: 'TNUoS charges'
    },
    {
      question: 'What is the typical CIBSE TM46 electricity benchmark for schools?',
      options: ['32 kWh/m²/year', '55 kWh/m²/year', '95 kWh/m²/year', '120 kWh/m²/year'],
      correctAnswer: '32 kWh/m²/year'
    },
    {
      question: 'When normalising consumption data to kWh/m², which area measurement should typically be used?',
      options: [
        'External footprint area',
        'Gross Internal Area (GIA)',
        'Net lettable area only',
        'Car park area'
      ],
      correctAnswer: 'Gross Internal Area (GIA)'
    },
    {
      question: 'What does BSUoS stand for in electricity billing?',
      options: [
        'British Standard Use of System',
        'Balancing Services Use of System',
        'Building Services Use of System',
        'Base Supply Use of System'
      ],
      correctAnswer: 'Balancing Services Use of System'
    },
    {
      question: 'A building has an Energy Performance Indicator of 75. What DEC rating would it receive?',
      options: ['A', 'B', 'C', 'D'],
      correctAnswer: 'C'
    },
    {
      question: 'Which organisation publishes degree day data that is freely available for UK locations?',
      options: [
        'Only commercial providers',
        'Degree Days.net and Carbon Trust',
        'Building Research Establishment only',
        'National Grid exclusively'
      ],
      correctAnswer: 'Degree Days.net and Carbon Trust'
    }
  ];

  const faqs = [
    {
      question: 'Why do CIBSE TM46 benchmarks differ from actual building performance?',
      answer: 'CIBSE TM46 benchmarks represent typical energy consumption for building types under standard conditions. Actual performance varies due to factors including building age, construction quality, occupancy patterns, operational hours, equipment efficiency, and local climate. Benchmarks should be used as indicative guides rather than absolute targets. For more accurate comparison, use the 25th percentile (good practice) rather than median values, and always consider building-specific factors that may legitimately cause deviation from benchmarks.'
    },
    {
      question: 'How do I obtain degree day data for weather correction?',
      answer: 'Degree day data for UK locations is available from several sources. Degree Days.net provides free data for any location using nearby weather stations. The Carbon Trust also publishes regional degree day data. For heating, use a base temperature of 15.5°C (UK standard). When weather correcting, apply the formula: Corrected consumption = (Actual consumption × Long-term average degree days) ÷ Current period degree days. This normalises data to allow fair year-on-year comparisons regardless of weather variations.'
    },
    {
      question: 'What are Triad periods and why do they matter for large electricity consumers?',
      answer: 'Triads are the three half-hour periods of highest national electricity demand between November and February each year. TNUoS charges for half-hourly metered customers are based on their demand during these periods. Since Triads are identified retrospectively, businesses use forecasting services to predict likely Triad periods and reduce demand at these times. Avoiding just 1 kW of demand during Triads can save £50-60 per year, making this highly cost-effective for larger consumers with flexible loads.'
    },
    {
      question: 'How should I handle mixed-use buildings when applying benchmarks?',
      answer: 'For mixed-use buildings, calculate a weighted benchmark based on the floor area dedicated to each use. For example, a building with 60% office and 40% retail would have a weighted electricity benchmark of: (0.6 × 95 kWh/m²) + (0.4 × 165 kWh/m²) = 123 kWh/m². Ensure you use consistent area measurements throughout. Where sub-metering exists, analyse each area separately against its relevant benchmark for more accurate insights.'
    },
    {
      question: 'What is the difference between DUoS red, amber, and green time bands?',
      answer: 'DUoS time bands reflect the cost of distributing electricity at different times. Red bands (typically 4-7pm weekdays, November-February) attract the highest charges during peak demand. Amber bands cover shoulder periods with moderate charges. Green bands (overnight and weekends) have the lowest charges when network demand is lowest. Exact times vary by Distribution Network Operator region. Shifting flexible loads to green periods can significantly reduce costs - the differential between red and green rates can be 10-15p/kWh or more.'
    },
    {
      question: 'How often should Display Energy Certificates be renewed?',
      answer: 'DECs for public buildings over 1,000m² must be renewed annually and are valid for 12 months. Advisory Reports accompanying DECs are valid for 7 years. Buildings between 250m² and 1,000m² require DECs valid for 10 years. The DEC must be displayed in a prominent place clearly visible to the public. Failure to display a valid DEC can result in a penalty charge notice. The advisory report provides recommendations for improving energy efficiency that should inform energy management strategies.'
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a] text-white">
      {/* Header */}
      <div className="bg-[#1a1a1a]/95 border-b border-gray-700">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="w-8 h-8 text-elec-yellow" />
            <span className="text-elec-yellow text-sm font-medium">Module 3 • Section 3</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Comparing to Benchmarks and Tariffs
          </h1>
          <p className="text-gray-400">
            Master UK energy benchmarks, weather correction techniques, and tariff analysis for professional energy assessments
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-12">

        {/* Section 1: CIBSE TM46 and DEC Benchmarks */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-elec-yellow font-bold">1</span>
            </div>
            <h2 className="text-xl font-semibold">CIBSE TM46 and Display Energy Certificate Benchmarks</h2>
          </div>

          <div className="bg-[#242424] rounded-lg p-6 space-y-4">
            <div className="flex items-start gap-3">
              <FileBarChart className="w-6 h-6 text-elec-yellow mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-elec-yellow mb-2">Understanding CIBSE TM46</h3>
                <p className="text-gray-300 leading-relaxed">
                  CIBSE Technical Memorandum 46 (TM46) provides standardised energy benchmarks for different building
                  types across the UK. Published by the Chartered Institution of Building Services Engineers, these
                  benchmarks form the basis for Display Energy Certificates and enable meaningful comparisons between
                  similar buildings.
                </p>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 mt-4">
              <h4 className="font-medium text-elec-yellow mb-3">Key Benchmark Categories</h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <Building2 className="w-4 h-4 text-elec-yellow mt-1 flex-shrink-0" />
                  <span><strong>29 building categories</strong> covering offices, retail, schools, hospitals, hotels, and industrial premises</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-elec-yellow mt-1 flex-shrink-0" />
                  <span><strong>Separate benchmarks</strong> for electricity and fossil fuel consumption in kWh/m²/year</span>
                </li>
                <li className="flex items-start gap-2">
                  <Target className="w-4 h-4 text-elec-yellow mt-1 flex-shrink-0" />
                  <span><strong>Typical and good practice</strong> values allow assessment against median and 25th percentile performance</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <h4 className="font-medium text-elec-yellow mb-3">Display Energy Certificate (DEC) Ratings</h4>
              <p className="text-gray-300 mb-3">
                DECs use an A-G scale based on the Energy Performance Indicator (EPI), calculated as actual energy
                use divided by the benchmark, multiplied by 100:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                <div className="bg-green-900/30 rounded p-2 text-center">
                  <span className="font-bold text-green-400">A</span>
                  <p className="text-gray-400">0-25</p>
                </div>
                <div className="bg-green-800/30 rounded p-2 text-center">
                  <span className="font-bold text-green-500">B</span>
                  <p className="text-gray-400">26-50</p>
                </div>
                <div className="bg-yellow-900/30 rounded p-2 text-center">
                  <span className="font-bold text-yellow-400">C</span>
                  <p className="text-gray-400">51-75</p>
                </div>
                <div className="bg-yellow-800/30 rounded p-2 text-center">
                  <span className="font-bold text-yellow-500">D</span>
                  <p className="text-gray-400">76-100</p>
                </div>
                <div className="bg-orange-900/30 rounded p-2 text-center">
                  <span className="font-bold text-orange-400">E</span>
                  <p className="text-gray-400">101-125</p>
                </div>
                <div className="bg-orange-800/30 rounded p-2 text-center">
                  <span className="font-bold text-orange-500">F</span>
                  <p className="text-gray-400">126-150</p>
                </div>
                <div className="bg-red-900/30 rounded p-2 text-center col-span-2">
                  <span className="font-bold text-red-400">G</span>
                  <p className="text-gray-400">Over 150</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: kWh/m² Normalisation and Degree Day Correction */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-elec-yellow font-bold">2</span>
            </div>
            <h2 className="text-xl font-semibold">kWh/m² Normalisation and Degree Day Correction</h2>
          </div>

          <div className="bg-[#242424] rounded-lg p-6 space-y-4">
            <div className="flex items-start gap-3">
              <Calculator className="w-6 h-6 text-elec-yellow mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-elec-yellow mb-2">Normalising to Floor Area</h3>
                <p className="text-gray-300 leading-relaxed">
                  Converting energy consumption to kWh per square metre enables comparison between buildings of
                  different sizes. This normalisation uses Gross Internal Area (GIA) - the total floor area measured
                  to the internal face of external walls, including circulation space, plant rooms, and toilets.
                </p>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <h4 className="font-medium text-elec-yellow mb-3">Normalisation Formula</h4>
              <div className="bg-[#2a2a2a] rounded p-3 font-mono text-center">
                <span className="text-elec-yellow">Energy Intensity</span> = Total Annual Consumption (kWh) ÷ Gross Internal Area (m²)
              </div>
              <p className="text-gray-400 text-sm mt-2">
                Example: 150,000 kWh ÷ 2,000 m² = 75 kWh/m²/year
              </p>
            </div>

            <div className="flex items-start gap-3 mt-4">
              <ThermometerSun className="w-6 h-6 text-elec-yellow mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-elec-yellow mb-2">Degree Day Weather Correction</h3>
                <p className="text-gray-300 leading-relaxed">
                  Degree days quantify heating or cooling demand based on outdoor temperature. In the UK, heating
                  degree days use a base temperature of 15.5°C - each degree below this base, for each day,
                  contributes one degree day. This allows consumption to be normalised for weather variations.
                </p>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <h4 className="font-medium text-elec-yellow mb-3">Weather Correction Formula</h4>
              <div className="bg-[#2a2a2a] rounded p-3 font-mono text-sm text-center">
                <span className="text-elec-yellow">Corrected Consumption</span> = Actual Consumption × (Long-term Average DD ÷ Actual Period DD)
              </div>
              <p className="text-gray-400 text-sm mt-3">
                <strong>Example:</strong> A building used 80,000 kWh in a mild year with 1,800 degree days.
                The 20-year average is 2,000 degree days.<br />
                Corrected = 80,000 × (2,000 ÷ 1,800) = 88,889 kWh<br />
                This reveals true consumption would be higher in a typical year.
              </p>
            </div>
          </div>

          {/* First Inline Check */}
          <InlineCheck
            id={quickCheckQuestions[0].id}
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
        </section>

        {/* Section 3: Typical Consumption Benchmarks by Building Type */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-elec-yellow font-bold">3</span>
            </div>
            <h2 className="text-xl font-semibold">Typical Consumption Benchmarks by Building Type</h2>
          </div>

          <div className="bg-[#242424] rounded-lg p-6 space-y-4">
            <div className="flex items-start gap-3">
              <Building2 className="w-6 h-6 text-elec-yellow mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-elec-yellow mb-2">CIBSE TM46 Reference Benchmarks</h3>
                <p className="text-gray-300 leading-relaxed">
                  The following benchmarks represent typical consumption for common building types. Good practice
                  buildings (25th percentile) typically achieve 25-30% less than these typical values.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-2 text-elec-yellow">Building Type</th>
                    <th className="text-center py-3 px-2 text-elec-yellow">Electricity (kWh/m²)</th>
                    <th className="text-center py-3 px-2 text-elec-yellow">Fossil Fuel (kWh/m²)</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  <tr className="border-b border-gray-800">
                    <td className="py-2 px-2">General Office (naturally ventilated)</td>
                    <td className="text-center py-2 px-2">54</td>
                    <td className="text-center py-2 px-2">120</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-2 px-2">General Office (air-conditioned)</td>
                    <td className="text-center py-2 px-2">95</td>
                    <td className="text-center py-2 px-2">105</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-2 px-2">Primary School</td>
                    <td className="text-center py-2 px-2">32</td>
                    <td className="text-center py-2 px-2">113</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-2 px-2">Secondary School</td>
                    <td className="text-center py-2 px-2">45</td>
                    <td className="text-center py-2 px-2">102</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-2 px-2">General Retail</td>
                    <td className="text-center py-2 px-2">165</td>
                    <td className="text-center py-2 px-2">75</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-2 px-2">Restaurant</td>
                    <td className="text-center py-2 px-2">220</td>
                    <td className="text-center py-2 px-2">370</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-2 px-2">Hotel</td>
                    <td className="text-center py-2 px-2">105</td>
                    <td className="text-center py-2 px-2">260</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-2">Hospital (clinical and research)</td>
                    <td className="text-center py-2 px-2">90</td>
                    <td className="text-center py-2 px-2">222</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 mt-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-yellow-500 mb-1">Important Considerations</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Benchmarks assume standard operating hours - adjust for 24/7 operations</li>
                    <li>• Data centres, server rooms, and process loads are excluded from typical benchmarks</li>
                    <li>• Regional climate variations affect fossil fuel benchmarks significantly</li>
                    <li>• Buildings with electric heating should combine both benchmarks</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Understanding UK Electricity Tariff Structures */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-elec-yellow font-bold">4</span>
            </div>
            <h2 className="text-xl font-semibold">Understanding UK Electricity Tariff Structures</h2>
          </div>

          <div className="bg-[#242424] rounded-lg p-6 space-y-4">
            <div className="flex items-start gap-3">
              <PoundSterling className="w-6 h-6 text-elec-yellow mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-elec-yellow mb-2">Components of Electricity Costs</h3>
                <p className="text-gray-300 leading-relaxed">
                  UK electricity bills comprise multiple components beyond the unit rate. Understanding these
                  elements enables identification of cost reduction opportunities beyond simple consumption reduction.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="font-medium text-elec-yellow mb-2">Commodity Cost (40-50% of bill)</h4>
                <p className="text-gray-300 text-sm">
                  The wholesale cost of electricity itself, influenced by market prices, fuel costs, and carbon
                  pricing. This is what you typically negotiate with suppliers.
                </p>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="font-medium text-elec-yellow mb-2">DUoS - Distribution Use of System (15-20%)</h4>
                <p className="text-gray-300 text-sm">
                  Charges for using the local distribution network (11kV and below). These vary by time of day
                  with red, amber, and green bands, and by geographic region. Set by the Distribution Network
                  Operator (DNO) for your area.
                </p>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="font-medium text-elec-yellow mb-2">TNUoS - Transmission Network Use of System (5-10%)</h4>
                <p className="text-gray-300 text-sm">
                  Charges for using the high-voltage transmission network (275kV/400kV). For half-hourly metered
                  customers, these are based on demand during Triad periods - the three highest national demand
                  half-hours between November and February.
                </p>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="font-medium text-elec-yellow mb-2">BSUoS - Balancing Services Use of System (2-5%)</h4>
                <p className="text-gray-300 text-sm">
                  Charges for National Grid's balancing services to match supply and demand in real-time.
                  These vary half-hourly and can spike during system stress.
                </p>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="font-medium text-elec-yellow mb-2">CCL - Climate Change Levy (5-8%)</h4>
                <p className="text-gray-300 text-sm">
                  Environmental tax on business energy use at 0.775p/kWh (2024/25). Exemptions apply for
                  renewable electricity and some energy-intensive industries with Climate Change Agreements.
                </p>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="font-medium text-elec-yellow mb-2">Other Charges</h4>
                <p className="text-gray-300 text-sm">
                  Including meter operator charges, data collection charges, Feed-in Tariff costs, Contracts
                  for Difference levies, and capacity market charges. These typically add 10-15% to the bill.
                </p>
              </div>
            </div>
          </div>

          {/* Second Inline Check */}
          <InlineCheck
            id={quickCheckQuestions[1].id}
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
        </section>

        {/* Section 5: Identifying Tariff Optimisation Opportunities */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-elec-yellow font-bold">5</span>
            </div>
            <h2 className="text-xl font-semibold">Identifying Tariff Optimisation Opportunities</h2>
          </div>

          <div className="bg-[#242424] rounded-lg p-6 space-y-4">
            <div className="flex items-start gap-3">
              <Target className="w-6 h-6 text-elec-yellow mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-elec-yellow mb-2">Strategic Cost Reduction</h3>
                <p className="text-gray-300 leading-relaxed">
                  Understanding tariff structures reveals opportunities beyond simple energy efficiency.
                  Load shifting, demand management, and contract optimisation can deliver significant savings
                  without reducing actual energy consumption.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="font-medium text-elec-yellow mb-2">DUoS Time Band Optimisation</h4>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Identify flexible loads (EV charging, water heating, cold storage)</li>
                  <li>• Shift to green band periods (typically 00:00-07:00 and weekends)</li>
                  <li>• Avoid red band periods (typically 16:00-19:00 weekday winters)</li>
                  <li>• Potential savings: 10-15% of DUoS charges</li>
                </ul>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="font-medium text-elec-yellow mb-2">Triad Avoidance Strategies</h4>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Subscribe to Triad warning services</li>
                  <li>• Reduce demand during forecast Triad periods</li>
                  <li>• Use backup generation or storage during warnings</li>
                  <li>• Potential savings: £50-60 per kW avoided annually</li>
                </ul>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="font-medium text-elec-yellow mb-2">Contract Optimisation</h4>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Match contract type to load profile (fixed vs. flexible)</li>
                  <li>• Consider pass-through vs. fully fixed non-commodity</li>
                  <li>• Evaluate contract length vs. market outlook</li>
                  <li>• Review Availability and Maximum Import Capacity settings</li>
                </ul>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="font-medium text-elec-yellow mb-2">Reactive Power Management</h4>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Maintain power factor above 0.95 to avoid charges</li>
                  <li>• Install power factor correction equipment</li>
                  <li>• Regular monitoring of kVAr consumption</li>
                  <li>• Potential savings: 5-10% of distribution charges</li>
                </ul>
              </div>
            </div>

            <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <Lightbulb className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-green-400 mb-1">Pro Tip: Half-Hourly Data Analysis</h4>
                  <p className="text-gray-300 text-sm">
                    Request half-hourly consumption data from your supplier. Analysing this reveals load patterns,
                    identifies peak demand periods, and highlights opportunities for demand reduction or shifting.
                    Many suppliers provide this through online portals for half-hourly metered supplies.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Third Inline Check */}
          <InlineCheck
            id={quickCheckQuestions[2].id}
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
        </section>

        {/* Section 6: Creating Meaningful Comparisons for Clients */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-elec-yellow font-bold">6</span>
            </div>
            <h2 className="text-xl font-semibold">Creating Meaningful Comparisons for Clients</h2>
          </div>

          <div className="bg-[#242424] rounded-lg p-6 space-y-4">
            <div className="flex items-start gap-3">
              <Users className="w-6 h-6 text-elec-yellow mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-elec-yellow mb-2">Professional Presentation Techniques</h3>
                <p className="text-gray-300 leading-relaxed">
                  Effective energy analysis goes beyond raw numbers. Presenting findings in context with appropriate
                  benchmarks and clear visualisation helps clients understand their position and motivates action
                  on recommendations.
                </p>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <h4 className="font-medium text-elec-yellow mb-3">Comparison Framework</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center text-elec-yellow text-sm flex-shrink-0">1</span>
                  <div>
                    <p className="font-medium text-white">Against benchmark</p>
                    <p className="text-gray-400 text-sm">Show where client sits vs. typical and good practice values</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center text-elec-yellow text-sm flex-shrink-0">2</span>
                  <div>
                    <p className="font-medium text-white">Against historical performance</p>
                    <p className="text-gray-400 text-sm">Weather-corrected year-on-year trends with clear baselines</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center text-elec-yellow text-sm flex-shrink-0">3</span>
                  <div>
                    <p className="font-medium text-white">Against targets</p>
                    <p className="text-gray-400 text-sm">Progress towards client's own efficiency or carbon goals</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center text-elec-yellow text-sm flex-shrink-0">4</span>
                  <div>
                    <p className="font-medium text-white">Against portfolio</p>
                    <p className="text-gray-400 text-sm">For multi-site clients, compare similar sites to identify outliers</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <h4 className="font-medium text-elec-yellow mb-3">Reporting Best Practices</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-white mb-2">Do:</p>
                  <ul className="text-gray-300 space-y-1">
                    <li>✓ Use consistent units throughout (kWh/m² or cost/m²)</li>
                    <li>✓ Weather-correct heating data for fair comparison</li>
                    <li>✓ Acknowledge building-specific factors</li>
                    <li>✓ Quantify potential savings in both kWh and £</li>
                    <li>✓ Provide context for benchmark sources</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white mb-2">Avoid:</p>
                  <ul className="text-gray-300 space-y-1">
                    <li>✗ Comparing buildings with different operating hours</li>
                    <li>✗ Ignoring process loads when benchmarking</li>
                    <li>✗ Using outdated or inappropriate benchmarks</li>
                    <li>✗ Presenting data without normalisation</li>
                    <li>✗ Over-relying on single metrics</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <h4 className="font-medium text-elec-yellow mb-3">Sample Client Report Structure</h4>
              <ol className="text-gray-300 text-sm space-y-2">
                <li><strong>1. Executive Summary:</strong> Key findings, current performance vs. benchmark, top 3 opportunities</li>
                <li><strong>2. Building Profile:</strong> Area, use, hours, special factors</li>
                <li><strong>3. Energy Performance:</strong> Current EUI, DEC equivalent rating, trend analysis</li>
                <li><strong>4. Cost Analysis:</strong> Tariff breakdown, time-of-use patterns, optimisation potential</li>
                <li><strong>5. Recommendations:</strong> Prioritised actions with costs, savings, and payback periods</li>
                <li><strong>6. Appendices:</strong> Methodology, data sources, benchmark references</li>
              </ol>
            </div>
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-elec-yellow" />
            <h2 className="text-xl font-semibold">Quick Reference Card</h2>
          </div>

          <div className="bg-gradient-to-br from-[#2a2a2a] to-[#1f1f1f] rounded-lg border border-elec-yellow/30 p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-elec-yellow mb-3">Key Benchmarks (kWh/m²/year)</h3>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li><strong>Office (AC):</strong> 95 elec / 105 fossil</li>
                  <li><strong>Office (natural vent):</strong> 54 elec / 120 fossil</li>
                  <li><strong>Primary School:</strong> 32 elec / 113 fossil</li>
                  <li><strong>Retail:</strong> 165 elec / 75 fossil</li>
                  <li><strong>Hotel:</strong> 105 elec / 260 fossil</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-elec-yellow mb-3">DEC Rating Scale</h3>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li><strong>A:</strong> 0-25 (Exceptional)</li>
                  <li><strong>B:</strong> 26-50 (Excellent)</li>
                  <li><strong>C:</strong> 51-75 (Good)</li>
                  <li><strong>D:</strong> 76-100 (Typical)</li>
                  <li><strong>E-G:</strong> Over 100 (Below typical)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-elec-yellow mb-3">Key Formulas</h3>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li><strong>EUI:</strong> kWh ÷ m² GIA</li>
                  <li><strong>EPI:</strong> (Actual ÷ Benchmark) × 100</li>
                  <li><strong>Weather correction:</strong> Actual × (LTA DD ÷ Actual DD)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-elec-yellow mb-3">Tariff Components</h3>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li><strong>Commodity:</strong> 40-50% (wholesale energy)</li>
                  <li><strong>DUoS:</strong> 15-20% (distribution, time-varying)</li>
                  <li><strong>TNUoS:</strong> 5-10% (transmission, Triads)</li>
                  <li><strong>CCL:</strong> 5-8% (0.775p/kWh)</li>
                </ul>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-700">
              <h3 className="font-semibold text-elec-yellow mb-2">Key Resources</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• <strong>CIBSE TM46:</strong> Energy Benchmarks</li>
                <li>• <strong>Degree Days.net:</strong> Free weather data</li>
                <li>• <strong>Carbon Trust:</strong> Benchmark guides and tools</li>
                <li>• <strong>National Grid:</strong> Triad dates and forecasts</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Target className="w-6 h-6 text-elec-yellow" />
            Section Quiz
          </h2>
          <Quiz questions={quizQuestions} />
        </section>

        {/* FAQs */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-[#242424] rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left min-h-[44px] touch-manipulation active:scale-[0.98]"
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
                    <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Navigation */}
        <nav className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-700">
          <Button
            onClick={() => navigate('/upskilling/energy-efficiency/module-3/section-2')}
            variant="outline"
            className="flex-1 min-h-[44px] touch-manipulation active:scale-[0.98] bg-transparent border-gray-600 hover:border-elec-yellow hover:text-elec-yellow"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous: Section 2 - Energy Analysis
          </Button>
          <Button
            onClick={() => navigate('/upskilling/energy-efficiency/module-3/section-4')}
            className="flex-1 min-h-[44px] touch-manipulation active:scale-[0.98] bg-elec-yellow text-black hover:bg-elec-yellow/90"
          >
            Next: Section 4 - Carbon Calculations
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default EnergyEfficiencyModule3Section3;
