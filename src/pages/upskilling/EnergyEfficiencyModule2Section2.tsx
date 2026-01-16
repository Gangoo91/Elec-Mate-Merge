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
  Activity,
  TrendingUp,
  Clock,
  Calendar,
  PoundSterling,
  Search,
  Zap,
  BarChart3,
  Gauge,
  AlertTriangle,
  CheckCircle,
  Info,
  BookOpen,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EnergyEfficiencyModule2Section2: React.FC = () => {
  const navigate = useNavigate();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);

  useSEO({
    title: 'Analysing Loads and Demand Patterns | Energy Efficiency Module 2 Section 2',
    description:
      'Learn to analyse electrical load profiles, understand demand patterns, calculate load factors, and identify energy savings opportunities through effective load management.',
    keywords: [
      'load profiles',
      'demand patterns',
      'load factor',
      'diversity factor',
      'maximum demand',
      'DUoS charges',
      'half-hourly metering',
      'energy efficiency',
      'UK electricity tariffs',
    ],
  });

  const quickCheckQuestions = [
    {
      id: 'qc1-load-factor',
      question:
        'A factory has a maximum demand of 500kW and consumes 180,000 kWh per month. Assuming a 30-day month with 24 hours per day, what is the load factor?',
      options: ['25%', '50%', '75%', '100%'],
      correctIndex: 1,
      explanation:
        'Load Factor = (Actual Energy Used) / (Max Demand × Hours). 180,000 kWh / (500kW × 720 hours) = 180,000 / 360,000 = 0.50 or 50%. A 50% load factor indicates reasonable but improvable utilisation.',
    },
    {
      id: 'qc2-duos-bands',
      question:
        'During which DUoS time band would running a large industrial process typically incur the highest distribution charges?',
      options: [
        'Green band (overnight)',
        'Amber band (shoulder periods)',
        'Red band (peak periods 4pm-7pm)',
        'All bands cost the same',
      ],
      correctIndex: 2,
      explanation:
        'Red band periods (typically 4pm-7pm on weekdays) incur the highest DUoS charges as this is when the distribution network experiences maximum stress. Shifting loads to green band periods can significantly reduce costs.',
    },
    {
      id: 'qc3-diversity-factor',
      question:
        'A building has three separate loads with individual maximum demands of 20kW, 30kW, and 50kW. If the building\'s actual maximum demand is 80kW, what is the diversity factor?',
      options: ['0.80', '1.00', '1.25', '1.50'],
      correctIndex: 2,
      explanation:
        'Diversity Factor = Sum of Individual Max Demands / Actual Combined Max Demand = (20 + 30 + 50) / 80 = 100 / 80 = 1.25. A diversity factor greater than 1 indicates that not all loads peak simultaneously, which is typical in real installations.',
    },
  ];

  const quizQuestions = [
    {
      question: 'What is the primary purpose of half-hourly (HH) metering in the UK?',
      options: [
        'To provide more accurate billing for domestic customers',
        'To enable time-of-use pricing and demand management for larger consumers',
        'To reduce the cost of electricity for all users',
        'To simplify the billing process for suppliers',
      ],
      correctAnswer:
        'To enable time-of-use pricing and demand management for larger consumers',
    },
    {
      question: 'Which formula correctly calculates the load factor?',
      options: [
        'Maximum Demand ÷ Average Demand × 100',
        'Average Demand ÷ Maximum Demand × 100',
        'Total Energy ÷ Connected Load × 100',
        'Peak Load ÷ Base Load × 100',
      ],
      correctAnswer: 'Average Demand ÷ Maximum Demand × 100',
    },
    {
      question:
        'In a typical UK commercial building, when does the "Triad" period usually occur?',
      options: [
        'Summer afternoons between 2pm-4pm',
        'Winter weekday evenings between 4pm-7pm',
        'Spring mornings between 8am-10am',
        'Weekend peak periods',
      ],
      correctAnswer: 'Winter weekday evenings between 4pm-7pm',
    },
    {
      question: 'What does a low load factor typically indicate?',
      options: [
        'Efficient and consistent energy usage',
        'High base load with minimal variation',
        'Peaky demand with poor capacity utilisation',
        'Optimal equipment sizing',
      ],
      correctAnswer: 'Peaky demand with poor capacity utilisation',
    },
    {
      question:
        'What is the typical duration of a DUoS red band period on weekdays?',
      options: [
        '24 hours',
        '4-5 hours during afternoon/evening peak',
        '8 hours during business hours',
        '12 hours from 6am to 6pm',
      ],
      correctAnswer: '4-5 hours during afternoon/evening peak',
    },
    {
      question:
        'Which type of load would typically contribute most to a building\'s base load?',
      options: [
        'Air conditioning during a heatwave',
        'IT server rooms and refrigeration',
        'Lighting in occupied offices',
        'Electric vehicle charging',
      ],
      correctAnswer: 'IT server rooms and refrigeration',
    },
    {
      question:
        'How is maximum demand (kVA) typically measured for commercial tariffs?',
      options: [
        'Instantaneous peak reading',
        'Average of the highest three readings in a month',
        'Highest average demand in any 30-minute period',
        'Total monthly consumption divided by hours',
      ],
      correctAnswer: 'Highest average demand in any 30-minute period',
    },
    {
      question:
        'What is the benefit of improving power factor in relation to maximum demand charges?',
      options: [
        'It reduces the kWh consumption',
        'It reduces the kVA demand for the same kW load',
        'It eliminates the need for half-hourly metering',
        'It increases the diversity factor',
      ],
      correctAnswer: 'It reduces the kVA demand for the same kW load',
    },
    {
      question: 'Which strategy would most effectively reduce Triad charges?',
      options: [
        'Running all equipment at night',
        'Reducing load specifically during predicted Triad warning periods',
        'Increasing base load throughout the day',
        'Installing larger circuit breakers',
      ],
      correctAnswer:
        'Reducing load specifically during predicted Triad warning periods',
    },
    {
      question:
        'What information does a load duration curve provide that a standard load profile does not?',
      options: [
        'The time of day when peaks occur',
        'The percentage of time demand exceeds various levels',
        'The power factor at each interval',
        'The cost of electricity at each period',
      ],
      correctAnswer: 'The percentage of time demand exceeds various levels',
    },
  ];

  const faqs = [
    {
      question: 'What is the difference between kW and kVA in demand charges?',
      answer:
        'kW (kilowatts) measures real power - the actual power doing useful work. kVA (kilovolt-amperes) measures apparent power, which includes both real power and reactive power. Many UK commercial tariffs charge based on kVA demand because this reflects the total capacity required from the network. If your power factor is poor (below 1.0), your kVA will be higher than your kW, resulting in higher demand charges. For example, a 100kW load with a 0.8 power factor requires 125kVA of apparent power. Improving power factor through correction equipment reduces kVA and therefore demand charges.',
    },
    {
      question: 'How do Triad charges work and how can they be avoided?',
      answer:
        'Triad charges are transmission network costs based on your demand during the three highest half-hour periods of national demand between November and February. These periods are not known in advance but typically occur on cold, dark weekday evenings (4pm-7pm). Triad charges can be substantial - sometimes £40-50/kW/year. To reduce them, businesses can: subscribe to Triad warning services, have procedures to reduce non-essential loads when warnings are issued, install on-site generation or battery storage for Triad periods, and monitor weather forecasts and grid demand predictions. Even reducing demand during actual Triads by 100kW could save £4,000-5,000 annually.',
    },
    {
      question:
        'What is a good load factor and how can it be improved?',
      answer:
        'A load factor above 70% is generally considered good, indicating efficient capacity utilisation. Typical values vary by sector: process industries often achieve 70-85%, commercial buildings 30-50%, and retail 25-40%. To improve load factor: spread production across more hours, use thermal storage to shift heating/cooling loads, schedule high-demand processes during off-peak periods, stagger equipment start-up times, and ensure equipment is appropriately sized. A higher load factor means better utilisation of your supply capacity and potentially lower unit costs, as fixed charges are spread over more kWh.',
    },
    {
      question:
        'How does half-hourly metering data help identify savings opportunities?',
      answer:
        'Half-hourly (HH) data reveals patterns invisible in monthly bills: unexpected overnight loads suggesting equipment left running, demand spikes indicating poor motor starting arrangements, consumption during unoccupied periods, correlation (or lack thereof) between demand and production output, and gradual increases suggesting maintenance issues. Analysis tools can compare similar days, identify anomalies, and benchmark against degree days for weather normalisation. Many businesses find 10-20% savings opportunities through HH data analysis, particularly from identifying wasteful overnight and weekend consumption.',
    },
    {
      question: 'What are DUoS bands and why do they matter?',
      answer:
        'Distribution Use of System (DUoS) charges are levied by Distribution Network Operators for using the local electricity network. Charges vary by time band: Red (peak, typically 4pm-7pm weekdays) has the highest charges, Amber (shoulder periods) has moderate charges, and Green (overnight and weekends) has the lowest charges. The ratio between red and green rates can be 10:1 or more. For a business with flexible loads, shifting consumption from red to green periods can reduce DUoS costs by 50% or more. Understanding your DUoS tariff structure is essential for optimising time-of-use scheduling and evaluating battery storage investments.',
    },
    {
      question:
        'How do I calculate potential savings from load shifting?',
      answer:
        'To calculate load shifting savings: 1) Identify the load to be shifted (kW) and duration (hours); 2) Calculate current cost = kW × hours × rate during current period; 3) Calculate new cost = kW × hours × rate during target period; 4) Savings = current cost - new cost. For example, shifting a 50kW load for 3 hours from red band (15p/kWh) to green band (3p/kWh) saves: (50 × 3 × 0.15) - (50 × 3 × 0.03) = £22.50 - £4.50 = £18 per day, or approximately £4,500 per year (250 working days). Also consider demand charge impacts and any operational costs of shifting.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a] text-white">
      {/* Header */}
      <div className="bg-[#1a1a1a]/95 border-b border-elec-yellow/20">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <Activity className="w-8 h-8 text-elec-yellow" />
            <span className="text-elec-yellow text-sm font-medium">
              Module 2 • Section 2
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Analysing Loads and Demand Patterns
          </h1>
          <p className="text-gray-400">
            Master load profiling techniques to identify energy savings and optimise
            electricity costs through effective demand management.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Learning Objectives */}
        <div className="bg-[#2a2a2a] rounded-lg p-6 mb-8 border border-elec-yellow/20">
          <h2 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Learning Objectives
          </h2>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Interpret load profiles and demand curves for different building types</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Calculate and apply load factor and diversity factor in assessments</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Understand UK DUoS bands, Triad charges, and maximum demand tariffs</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Identify savings opportunities through load analysis and demand management</span>
            </li>
          </ul>
        </div>

        {/* Section 1: Understanding Load Profiles */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-[#1a1a1a] w-8 h-8 rounded-full flex items-center justify-center font-bold">
              1
            </div>
            <h2 className="text-xl font-semibold text-white">
              Understanding Load Profiles and Demand Curves
            </h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              A <strong className="text-elec-yellow">load profile</strong> is a graphical representation
              of electrical demand over time, typically showing kW or kVA on the vertical axis and time
              on the horizontal axis. These profiles reveal consumption patterns essential for energy
              management and cost optimisation.
            </p>

            <div className="bg-[#2a2a2a] rounded-lg p-5 border border-gray-700">
              <h3 className="text-lg font-medium text-elec-yellow mb-3 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Types of Load Profiles
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-[#1a1a1a] p-4 rounded-lg">
                  <h4 className="font-medium text-white mb-2">Daily Load Profile</h4>
                  <p className="text-sm text-gray-400">
                    Shows 24-hour demand pattern, revealing peak times, base load, and consumption
                    during occupied vs unoccupied periods. Essential for time-of-use tariff analysis.
                  </p>
                </div>
                <div className="bg-[#1a1a1a] p-4 rounded-lg">
                  <h4 className="font-medium text-white mb-2">Weekly Load Profile</h4>
                  <p className="text-sm text-gray-400">
                    Reveals weekday vs weekend patterns, helping identify unnecessary weekend
                    consumption and opportunities for load scheduling.
                  </p>
                </div>
                <div className="bg-[#1a1a1a] p-4 rounded-lg">
                  <h4 className="font-medium text-white mb-2">Annual Load Profile</h4>
                  <p className="text-sm text-gray-400">
                    Shows seasonal variations driven by heating, cooling, and lighting demands.
                    Critical for capacity planning and renewable integration.
                  </p>
                </div>
                <div className="bg-[#1a1a1a] p-4 rounded-lg">
                  <h4 className="font-medium text-white mb-2">Load Duration Curve</h4>
                  <p className="text-sm text-gray-400">
                    Ranks demand from highest to lowest, showing percentage of time at each level.
                    Useful for sizing generation and storage systems.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-blue-400 mb-1">Half-Hourly Metering in the UK</h4>
                  <p className="text-sm text-gray-300">
                    Sites with maximum demand above 100kW are required to have half-hourly (HH) metering.
                    This provides 48 data points per day, enabling detailed load analysis. From 2024-2025,
                    smart meter rollout is extending half-hourly settlement to smaller consumers, making
                    time-of-use awareness increasingly important for all customers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Base Load vs Peak Demand */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-[#1a1a1a] w-8 h-8 rounded-full flex items-center justify-center font-bold">
              2
            </div>
            <h2 className="text-xl font-semibold text-white">
              Base Load vs Peak Demand Identification
            </h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Understanding the difference between base load and peak demand is fundamental to
              effective energy management and identifies different types of saving opportunities.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#2a2a2a] rounded-lg p-5 border border-green-500/30">
                <h3 className="text-lg font-medium text-green-400 mb-3 flex items-center gap-2">
                  <Gauge className="w-5 h-5" />
                  Base Load
                </h3>
                <p className="text-gray-300 mb-3">
                  The minimum continuous demand that exists 24/7, regardless of occupancy or activity.
                </p>
                <h4 className="font-medium text-white mb-2">Typical Base Load Components:</h4>
                <ul className="space-y-1 text-sm text-gray-400">
                  <li>• Server rooms and IT infrastructure</li>
                  <li>• Refrigeration and cold storage</li>
                  <li>• Security systems and emergency lighting</li>
                  <li>• Continuous ventilation (e.g., car parks)</li>
                  <li>• Standby power for equipment</li>
                  <li>• Building management systems</li>
                </ul>
              </div>

              <div className="bg-[#2a2a2a] rounded-lg p-5 border border-red-500/30">
                <h3 className="text-lg font-medium text-red-400 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Peak Demand
                </h3>
                <p className="text-gray-300 mb-3">
                  The maximum demand occurring during specific periods, often coinciding with full
                  occupancy and activity.
                </p>
                <h4 className="font-medium text-white mb-2">Typical Peak Contributors:</h4>
                <ul className="space-y-1 text-sm text-gray-400">
                  <li>• HVAC systems at full capacity</li>
                  <li>• Lighting in fully occupied spaces</li>
                  <li>• Production equipment during shifts</li>
                  <li>• Catering equipment at meal times</li>
                  <li>• EV charging during work hours</li>
                  <li>• Motor starting currents</li>
                </ul>
              </div>
            </div>

            <div className="bg-amber-900/20 border border-amber-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-amber-400 mb-1">Key Insight: Out-of-Hours Base Load</h4>
                  <p className="text-sm text-gray-300">
                    Excessive base load often indicates significant waste. Compare overnight/weekend
                    consumption to expected essential loads. A typical commercial building should see
                    overnight demand drop to 20-30% of peak. If it remains above 50%, investigate for
                    equipment left running unnecessarily, failed controls, or inefficient always-on systems.
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

        {/* Section 3: Load Factor and Diversity Factor */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-[#1a1a1a] w-8 h-8 rounded-full flex items-center justify-center font-bold">
              3
            </div>
            <h2 className="text-xl font-semibold text-white">
              Load Factor and Diversity Factor Calculations
            </h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              These key metrics help assess the efficiency of electrical installations and inform
              decisions about capacity, tariffs, and demand management strategies.
            </p>

            <div className="bg-[#2a2a2a] rounded-lg p-5 border border-elec-yellow/30">
              <h3 className="text-lg font-medium text-elec-yellow mb-4">Load Factor</h3>
              <div className="bg-[#1a1a1a] p-4 rounded-lg mb-4">
                <p className="text-center text-lg font-mono text-elec-yellow">
                  Load Factor = (Average Demand ÷ Maximum Demand) × 100%
                </p>
                <p className="text-center text-sm text-gray-400 mt-2">
                  Or equivalently: (Actual kWh Used ÷ (Max Demand × Hours)) × 100%
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-3 text-sm">
                <div className="bg-red-900/20 p-3 rounded border border-red-500/30">
                  <p className="font-medium text-red-400">Poor: Below 40%</p>
                  <p className="text-gray-400">Highly variable demand, poor utilisation</p>
                </div>
                <div className="bg-amber-900/20 p-3 rounded border border-amber-500/30">
                  <p className="font-medium text-amber-400">Moderate: 40-70%</p>
                  <p className="text-gray-400">Typical for commercial buildings</p>
                </div>
                <div className="bg-green-900/20 p-3 rounded border border-green-500/30">
                  <p className="font-medium text-green-400">Good: Above 70%</p>
                  <p className="text-gray-400">Consistent demand, efficient operation</p>
                </div>
              </div>
            </div>

            <div className="bg-[#2a2a2a] rounded-lg p-5 border border-elec-yellow/30">
              <h3 className="text-lg font-medium text-elec-yellow mb-4">Diversity Factor</h3>
              <div className="bg-[#1a1a1a] p-4 rounded-lg mb-4">
                <p className="text-center text-lg font-mono text-elec-yellow">
                  Diversity Factor = Sum of Individual Max Demands ÷ Actual Combined Max Demand
                </p>
              </div>
              <p className="text-gray-300 mb-3">
                A diversity factor greater than 1.0 indicates that individual loads do not peak
                simultaneously - a crucial consideration for sizing electrical infrastructure.
              </p>
              <div className="bg-[#1a1a1a] p-4 rounded-lg">
                <h4 className="font-medium text-white mb-2">Example Calculation:</h4>
                <p className="text-sm text-gray-400">
                  Three departments with individual maximum demands: 50kW + 75kW + 100kW = 225kW total<br />
                  Measured maximum demand of combined supply: 180kW<br />
                  <span className="text-elec-yellow">Diversity Factor = 225 ÷ 180 = 1.25</span><br />
                  This means the main supply can be sized at 180kW rather than 225kW.
                </p>
              </div>
            </div>

            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-blue-400 mb-1">Practical Application</h4>
                  <p className="text-sm text-gray-300">
                    A higher load factor generally means lower unit costs (as fixed charges are spread
                    over more kWh) and may enable negotiation of better supply contracts. Improving load
                    factor from 40% to 60% can reduce effective unit costs by 10-15%.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Seasonal and Time-of-Use Patterns */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-[#1a1a1a] w-8 h-8 rounded-full flex items-center justify-center font-bold">
              4
            </div>
            <h2 className="text-xl font-semibold text-white">
              Seasonal and Time-of-Use Patterns
            </h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Understanding how demand varies with time and season is essential for optimising tariff
              selection and scheduling flexible loads.
            </p>

            <div className="bg-[#2a2a2a] rounded-lg p-5 border border-gray-700">
              <h3 className="text-lg font-medium text-elec-yellow mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                UK DUoS Time Bands
              </h3>
              <p className="text-gray-300 mb-4">
                Distribution Use of System (DUoS) charges vary significantly by time band. Exact times
                vary by distribution network operator (DNO) region.
              </p>
              <div className="space-y-3">
                <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-red-400">Red Band (Peak)</h4>
                    <span className="text-sm text-red-300">Highest Cost</span>
                  </div>
                  <p className="text-sm text-gray-300">
                    Typically 16:00-19:00 weekdays (varies by DNO and season). This period coincides
                    with peak national demand when network stress is highest.
                  </p>
                </div>
                <div className="bg-amber-900/20 p-4 rounded-lg border border-amber-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-amber-400">Amber Band (Shoulder)</h4>
                    <span className="text-sm text-amber-300">Moderate Cost</span>
                  </div>
                  <p className="text-sm text-gray-300">
                    Typically daytime hours outside peak (e.g., 07:00-16:00 and 19:00-23:00 weekdays).
                    Represents periods of moderate network loading.
                  </p>
                </div>
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-green-400">Green Band (Off-Peak)</h4>
                    <span className="text-sm text-green-300">Lowest Cost</span>
                  </div>
                  <p className="text-sm text-gray-300">
                    Typically overnight (23:00-07:00) and weekends. Network has spare capacity,
                    resulting in the lowest distribution charges.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#2a2a2a] rounded-lg p-5 border border-gray-700">
              <h3 className="text-lg font-medium text-elec-yellow mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Seasonal Demand Patterns
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-[#1a1a1a] p-4 rounded-lg">
                  <h4 className="font-medium text-blue-400 mb-2">Winter (Nov-Feb)</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• Higher heating loads (electric heating, heat pumps)</li>
                    <li>• Extended lighting hours</li>
                    <li>• Triad charge exposure period</li>
                    <li>• Earlier evening peak (4pm darkness)</li>
                  </ul>
                </div>
                <div className="bg-[#1a1a1a] p-4 rounded-lg">
                  <h4 className="font-medium text-orange-400 mb-2">Summer (May-Aug)</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• Higher cooling loads (air conditioning)</li>
                    <li>• Reduced lighting demand</li>
                    <li>• Later evening peak</li>
                    <li>• Often lower overall demand (UK climate)</li>
                  </ul>
                </div>
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

        {/* Section 5: Maximum Demand Charges */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-[#1a1a1a] w-8 h-8 rounded-full flex items-center justify-center font-bold">
              5
            </div>
            <h2 className="text-xl font-semibold text-white">
              Maximum Demand Charges and Tariff Implications
            </h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              For larger electricity consumers, maximum demand (MD) charges can represent 20-40% of
              the total electricity bill. Understanding these charges is crucial for cost management.
            </p>

            <div className="bg-[#2a2a2a] rounded-lg p-5 border border-gray-700">
              <h3 className="text-lg font-medium text-elec-yellow mb-4 flex items-center gap-2">
                <PoundSterling className="w-5 h-5" />
                Types of Demand Charges
              </h3>
              <div className="space-y-4">
                <div className="bg-[#1a1a1a] p-4 rounded-lg">
                  <h4 className="font-medium text-white mb-2">Supply Capacity Charges (£/kVA/month)</h4>
                  <p className="text-sm text-gray-400">
                    Based on your Agreed Supply Capacity (ASC) with the DNO. This is the maximum
                    capacity you can draw. Exceeding it may result in excess capacity charges or
                    require an expensive capacity increase.
                  </p>
                </div>
                <div className="bg-[#1a1a1a] p-4 rounded-lg">
                  <h4 className="font-medium text-white mb-2">Maximum Demand Charges (£/kVA or £/kW)</h4>
                  <p className="text-sm text-gray-400">
                    Based on your highest half-hourly average demand in the billing period. A single
                    spike can set your MD for the entire month. Typical charge: £3-8 per kVA/month.
                  </p>
                </div>
                <div className="bg-[#1a1a1a] p-4 rounded-lg">
                  <h4 className="font-medium text-white mb-2">Triad Charges (£/kW/year)</h4>
                  <p className="text-sm text-gray-400">
                    Transmission network costs based on demand during the three peak half-hours of
                    national demand (November-February). Can be £40-50/kW. Advance warning services
                    help businesses reduce load during predicted Triads.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#2a2a2a] rounded-lg p-5 border border-elec-yellow/30">
              <h3 className="text-lg font-medium text-elec-yellow mb-3">
                Example: Impact of a Demand Spike
              </h3>
              <div className="bg-[#1a1a1a] p-4 rounded-lg font-mono text-sm">
                <p className="text-gray-300">Normal maximum demand: 400 kVA</p>
                <p className="text-gray-300">Demand charge rate: £5.00/kVA/month</p>
                <p className="text-gray-300">Normal monthly charge: £2,000</p>
                <p className="text-gray-300 mt-2">
                  One day: Three large motors started simultaneously
                </p>
                <p className="text-gray-300">Spike maximum demand: 600 kVA (for 30 minutes)</p>
                <p className="text-elec-yellow mt-2">New monthly charge: £3,000</p>
                <p className="text-red-400">Cost of that 30-minute spike: £1,000</p>
              </div>
            </div>

            <div className="bg-amber-900/20 border border-amber-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-amber-400 mb-1">Reactive Power Charges</h4>
                  <p className="text-sm text-gray-300">
                    Many tariffs include charges for excessive reactive power (poor power factor).
                    If your power factor falls below 0.95 (or the threshold set in your contract),
                    you may face additional charges or your kVA demand will be inflated. Power factor
                    correction equipment typically pays back within 1-3 years.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Using Load Analysis for Savings */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-[#1a1a1a] w-8 h-8 rounded-full flex items-center justify-center font-bold">
              6
            </div>
            <h2 className="text-xl font-semibold text-white">
              Using Load Analysis to Identify Savings Opportunities
            </h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Systematic load analysis reveals multiple categories of savings opportunities, from
              quick wins to strategic investments.
            </p>

            <div className="bg-[#2a2a2a] rounded-lg p-5 border border-gray-700">
              <h3 className="text-lg font-medium text-elec-yellow mb-4 flex items-center gap-2">
                <Search className="w-5 h-5" />
                Analysis Techniques and Findings
              </h3>
              <div className="space-y-4">
                <div className="border-l-4 border-elec-yellow pl-4">
                  <h4 className="font-medium text-white mb-2">1. Out-of-Hours Analysis</h4>
                  <p className="text-sm text-gray-400 mb-2">
                    Compare night/weekend demand to expected essential loads. Calculate potential
                    savings from eliminating unnecessary consumption.
                  </p>
                  <p className="text-sm text-green-400">
                    Typical finding: 10-25% of consumption during unoccupied periods is avoidable
                  </p>
                </div>
                <div className="border-l-4 border-elec-yellow pl-4">
                  <h4 className="font-medium text-white mb-2">2. Peak Demand Analysis</h4>
                  <p className="text-sm text-gray-400 mb-2">
                    Identify what causes demand spikes. Look for coincident equipment operation
                    that could be staggered.
                  </p>
                  <p className="text-sm text-green-400">
                    Typical finding: 15-30% peak reduction possible through load staggering
                  </p>
                </div>
                <div className="border-l-4 border-elec-yellow pl-4">
                  <h4 className="font-medium text-white mb-2">3. Load Shifting Opportunities</h4>
                  <p className="text-sm text-gray-400 mb-2">
                    Identify flexible loads that could move from red band to green band periods.
                    Consider thermal storage, battery storage, or process scheduling.
                  </p>
                  <p className="text-sm text-green-400">
                    Typical finding: 20-50% DUoS cost reduction for flexible loads
                  </p>
                </div>
                <div className="border-l-4 border-elec-yellow pl-4">
                  <h4 className="font-medium text-white mb-2">4. Anomaly Detection</h4>
                  <p className="text-sm text-gray-400 mb-2">
                    Look for unusual patterns: sudden step changes in base load, consumption not
                    correlating with occupancy, or gradual drift upward over time.
                  </p>
                  <p className="text-sm text-green-400">
                    Typical finding: Equipment faults and control failures identified
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#2a2a2a] rounded-lg p-5 border border-gray-700">
              <h3 className="text-lg font-medium text-elec-yellow mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Demand Management Strategies
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-[#1a1a1a] p-4 rounded-lg">
                  <h4 className="font-medium text-white mb-2">Immediate Actions</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• Stagger motor start times</li>
                    <li>• Schedule high-load processes off-peak</li>
                    <li>• Implement time controls on non-essential loads</li>
                    <li>• Sign up for Triad warning services</li>
                  </ul>
                </div>
                <div className="bg-[#1a1a1a] p-4 rounded-lg">
                  <h4 className="font-medium text-white mb-2">Investment Options</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• Power factor correction equipment</li>
                    <li>• Building energy management system (BEMS)</li>
                    <li>• Thermal energy storage</li>
                    <li>• Battery storage for peak shaving</li>
                  </ul>
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
        <div className="bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] rounded-lg p-6 mb-10 border border-elec-yellow/30">
          <h2 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Quick Reference Card
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-white mb-3">Key Formulas</h3>
              <div className="space-y-2 text-sm">
                <div className="bg-[#1a1a1a] p-3 rounded font-mono">
                  <p className="text-elec-yellow">Load Factor (%):</p>
                  <p className="text-gray-300">(Avg Demand ÷ Max Demand) × 100</p>
                </div>
                <div className="bg-[#1a1a1a] p-3 rounded font-mono">
                  <p className="text-elec-yellow">Diversity Factor:</p>
                  <p className="text-gray-300">Σ Individual Max ÷ Combined Max</p>
                </div>
                <div className="bg-[#1a1a1a] p-3 rounded font-mono">
                  <p className="text-elec-yellow">kVA from kW:</p>
                  <p className="text-gray-300">kVA = kW ÷ Power Factor</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-white mb-3">Typical Target Values</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between bg-[#1a1a1a] p-3 rounded">
                  <span className="text-gray-400">Good Load Factor:</span>
                  <span className="text-elec-yellow font-medium">&gt; 70%</span>
                </div>
                <div className="flex justify-between bg-[#1a1a1a] p-3 rounded">
                  <span className="text-gray-400">Target Power Factor:</span>
                  <span className="text-elec-yellow font-medium">&gt; 0.95</span>
                </div>
                <div className="flex justify-between bg-[#1a1a1a] p-3 rounded">
                  <span className="text-gray-400">Night vs Day Demand:</span>
                  <span className="text-elec-yellow font-medium">&lt; 30%</span>
                </div>
                <div className="flex justify-between bg-[#1a1a1a] p-3 rounded">
                  <span className="text-gray-400">Red:Green DUoS Ratio:</span>
                  <span className="text-elec-yellow font-medium">Up to 10:1</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-700">
            <h3 className="font-medium text-white mb-2">DUoS Time Bands (Typical - Check Your DNO)</h3>
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="bg-red-900/30 text-red-300 px-3 py-1 rounded border border-red-500/30">
                Red: 16:00-19:00 Weekdays
              </span>
              <span className="bg-amber-900/30 text-amber-300 px-3 py-1 rounded border border-amber-500/30">
                Amber: 07:00-16:00, 19:00-23:00
              </span>
              <span className="bg-green-900/30 text-green-300 px-3 py-1 rounded border border-green-500/30">
                Green: 23:00-07:00 & Weekends
              </span>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-elec-yellow mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-[#2a2a2a] rounded-lg border border-gray-700 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-4 text-left min-h-[44px] touch-manipulation active:scale-[0.98]"
                >
                  <span className="font-medium text-white pr-4">{faq.question}</span>
                  {expandedFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-elec-yellow flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-elec-yellow flex-shrink-0" />
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
        </div>

        {/* Quiz Section */}
        <div className="mb-10">
          <div className="bg-[#2a2a2a] rounded-lg p-6 border border-elec-yellow/20">
            <h2 className="text-xl font-semibold text-elec-yellow mb-2">
              Test Your Knowledge
            </h2>
            <p className="text-gray-400 mb-4">
              Ready to check your understanding of load analysis and demand patterns?
              Complete this 10-question quiz.
            </p>
            {!showQuiz ? (
              <Button
                onClick={() => setShowQuiz(true)}
                className="bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 min-h-[44px] touch-manipulation active:scale-[0.98]"
              >
                Start Quiz
              </Button>
            ) : (
              <Quiz
                questions={quizQuestions}
                onComplete={(score) => {
                  console.log(`Quiz completed with score: ${score}`);
                }}
              />
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-gray-700">
          <Button
            onClick={() => navigate('/upskilling/energy-efficiency-module-2-section-1')}
            variant="outline"
            className="flex items-center gap-2 min-h-[44px] touch-manipulation active:scale-[0.98] border-gray-600 text-white hover:bg-[#2a2a2a]"
          >
            <ChevronLeft className="w-5 h-5" />
            <div className="text-left">
              <div className="text-xs text-gray-400">Previous</div>
              <div className="text-sm">Section 1: Energy Auditing Fundamentals</div>
            </div>
          </Button>
          <Button
            onClick={() => navigate('/upskilling/energy-efficiency-module-2-section-3')}
            className="flex items-center gap-2 min-h-[44px] touch-manipulation active:scale-[0.98] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90"
          >
            <div className="text-right">
              <div className="text-xs text-[#1a1a1a]/70">Next</div>
              <div className="text-sm">Section 3: Power Quality Analysis</div>
            </div>
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EnergyEfficiencyModule2Section2;
