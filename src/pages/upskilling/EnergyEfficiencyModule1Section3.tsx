import { ArrowLeft, AlertTriangle, Lightbulb, Zap, Settings, Clock, CheckCircle, HelpCircle, ChevronRight, ChevronLeft, Gauge, Power, Cable, Users, TrendingDown, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Identifying Waste in Electrical Systems - Energy Efficiency Course';
const DESCRIPTION = 'Learn to identify common sources of electrical energy waste including standby power, motor inefficiencies, poor power factor, oversized equipment, and distribution losses.';

const quickCheckQuestions = [
  {
    id: 'm1s3-check1',
    question: 'What percentage of a typical commercial building\'s electricity consumption can be attributed to standby power and unnecessary operation?',
    options: ['1-2%', '5-15%', '25-30%', 'Less than 0.5%'],
    correctIndex: 1,
    explanation: 'Standby power and unnecessary operation typically account for 5-15% of commercial electricity consumption. This represents a significant "easy win" for energy savings with minimal capital investment.'
  },
  {
    id: 'm1s3-check2',
    question: 'A motor operating at 40% of its rated load will typically have what efficiency compared to its full-load efficiency?',
    options: ['About the same efficiency', 'Significantly lower efficiency (10-15% reduction)', 'Higher efficiency due to less stress', 'Cannot be determined without more data'],
    correctIndex: 1,
    explanation: 'Motors operating at partial loads (especially below 50%) experience significant efficiency drops of 10-15% or more. This is because the fixed losses (iron losses, friction) remain constant while useful output decreases.'
  },
  {
    id: 'm1s3-check3',
    question: 'What is the approximate I²R power loss increase when cable current doubles?',
    options: ['Losses double (2x)', 'Losses quadruple (4x)', 'Losses increase by 50%', 'Losses remain the same'],
    correctIndex: 1,
    explanation: 'Power loss in cables follows the I²R formula. When current doubles, the losses increase by the square of 2, meaning they quadruple (4x). This is why correct cable sizing is critical for efficiency.'
  }
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is "vampire power" or "phantom load" in electrical systems?',
    options: ['Power consumed during peak demand periods', 'Electricity drawn by devices when switched off but still plugged in', 'Power lost due to cable resistance', 'Energy used by emergency lighting'],
    correctAnswer: 1
  },
  {
    id: 2,
    question: 'Which type of lighting typically wastes the most energy as heat?',
    options: ['LED lighting', 'Fluorescent tubes', 'Incandescent lamps', 'Metal halide lamps'],
    correctAnswer: 2
  },
  {
    id: 3,
    question: 'A power factor of 0.7 means the installation is drawing approximately what percentage more current than necessary?',
    options: ['30% more', '43% more', '70% more', '7% more'],
    correctAnswer: 1
  },
  {
    id: 4,
    question: 'What is the most common cause of motor inefficiency in industrial settings?',
    options: ['Motor age', 'Oversizing (operating below rated capacity)', 'Incorrect supply voltage', 'Bearing wear'],
    correctAnswer: 1
  },
  {
    id: 5,
    question: 'When considering distribution losses, which action has the greatest impact on reducing I²R losses?',
    options: ['Reducing cable temperature', 'Using copper instead of aluminium', 'Reducing the current by increasing voltage', 'Shortening cable runs'],
    correctAnswer: 2
  },
  {
    id: 6,
    question: 'What percentage of energy can be saved by replacing DOL motor starters with VSDs for variable load applications?',
    options: ['5-10%', '10-20%', '20-50%', '50-70%'],
    correctAnswer: 2
  },
  {
    id: 7,
    question: 'Which of the following is an example of behavioural waste in electrical systems?',
    options: ['Poor power factor', 'Lights left on in unoccupied areas', 'Undersized cables', 'Motor bearing friction'],
    correctAnswer: 1
  },
  {
    id: 8,
    question: 'What is the typical standby power consumption of a modern office computer system?',
    options: ['1-5W', '5-15W', '20-50W', 'Over 100W'],
    correctAnswer: 1
  },
  {
    id: 9,
    question: 'Poor power factor primarily results in increased:',
    options: ['Active power consumption', 'Cable losses and capacity requirements', 'Equipment wear', 'Harmonic distortion'],
    correctAnswer: 1
  },
  {
    id: 10,
    question: 'What is the recommended minimum loading for a standard induction motor to maintain good efficiency?',
    options: ['25% of rated load', '50% of rated load', '75% of rated load', '100% of rated load'],
    correctAnswer: 1
  }
];

const faqs = [
  {
    question: 'How can I quickly identify the biggest sources of waste in an electrical installation?',
    answer: 'Start with an energy audit focusing on: 1) Equipment operating hours vs. actual need, 2) Motor loading levels using clamp meters, 3) Power factor at the main incomer, 4) Lighting in unoccupied areas, 5) Equipment running during non-production hours. Sub-metering key circuits provides valuable data for targeting improvements.'
  },
  {
    question: 'Is it worth replacing a working motor with a more efficient model?',
    answer: 'It depends on running hours and loading. For motors running over 4,000 hours/year at good loading (>50%), upgrading to IE3 or IE4 efficiency class can pay back in 2-4 years. For intermittent or lightly loaded motors, focus on right-sizing first. Always calculate total cost of ownership including energy costs.'
  },
  {
    question: 'What is the quickest way to improve power factor?',
    answer: 'Installing power factor correction capacitors at the main distribution board is the quickest fix. Automatic PFC units monitor and adjust capacitance to maintain target power factor (typically 0.95-0.98). Payback is often under 2 years through reduced maximum demand charges and lower distribution losses.'
  },
  {
    question: 'How much energy do VSDs (Variable Speed Drives) actually save?',
    answer: 'For fan and pump applications following the affinity laws, reducing speed by 20% reduces power consumption by approximately 50%. Typical savings range from 20-50% depending on the application. VSDs also provide soft starting, reducing mechanical stress and peak demand charges.'
  },
  {
    question: 'Should cables always be oversized for efficiency?',
    answer: 'While larger cables reduce I²R losses, there is an economic optimum. BS 7671 provides minimum sizes for safety, but the IET guidance on energy efficiency recommends economic cable sizing that balances capital cost against lifetime energy losses. For long runs or high utilisation, oversizing by one or two sizes is often justified.'
  },
  {
    question: 'How can behavioural waste be addressed effectively?',
    answer: 'Combine awareness training with technology: automatic controls (PIR sensors, timers, BMS), visual feedback (energy dashboards), clear responsibilities (switch-off procedures), and regular monitoring. Culture change requires sustained effort - quick wins help build momentum and demonstrate value.'
  }
];

const EnergyEfficiencyModule1Section3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      <div className="sticky top-0 z-40 bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/study-centre/upskilling/energy-efficiency-module-1">
            <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10 gap-2 touch-manipulation active:scale-[0.98] min-h-[44px]">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Module 1</span>
              <span className="sm:hidden">Back</span>
            </Button>
          </Link>
          <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30">Module 1.3</Badge>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6 sm:py-8 space-y-8 pb-24">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-elec-yellow/20 border border-elec-yellow/30 mb-4">
            <AlertTriangle className="h-8 w-8 text-elec-yellow" />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">Identifying Waste in Electrical Systems</h1>
          <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto">Recognising common sources of energy waste and inefficiency</p>
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-white/50">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> 20 min read</span>
            <span className="hidden sm:inline">-</span>
            <span>Interactive quiz included</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 rounded-2xl border border-elec-yellow/30 p-5">
            <h3 className="text-elec-yellow font-semibold mb-2 flex items-center gap-2"><Zap className="h-5 w-5" /> In 30 Seconds</h3>
            <p className="text-white/80 text-sm leading-relaxed">Electrical waste occurs through standby power (5-15% of consumption), inefficient motors (10-30% losses), poor power factor (increased current), oversized equipment, cable losses, and behavioural issues. Identifying these sources is the first step to significant savings.</p>
          </div>
          <div className="bg-gradient-to-br from-red-500/20 to-red-500/5 rounded-2xl border border-red-500/30 p-5">
            <h3 className="text-red-400 font-semibold mb-2 flex items-center gap-2"><TrendingDown className="h-5 w-5" /> Key Waste Sources</h3>
            <ul className="text-white/80 text-sm space-y-1">
              <li>- Standby power: 5-15% of consumption</li>
              <li>- Inefficient lighting: up to 90% as heat</li>
              <li>- Motor inefficiency: 10-30% losses possible</li>
              <li>- Poor power factor: 20-40% excess current</li>
            </ul>
          </div>
        </div>

        <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-400" /> Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {['Identify common sources of standby power and unnecessary operation', 'Recognise motor and drive inefficiencies and their causes', 'Understand power factor and its impact on system efficiency', 'Evaluate equipment sizing and loading issues', 'Calculate distribution losses and assess cable sizing', 'Address behavioural waste and management issues'].map((outcome, i) => (
              <div key={i} className="flex items-start gap-3 text-white/80 text-sm">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-elec-yellow/20 text-elec-yellow text-xs flex items-center justify-center font-medium">{i + 1}</span>
                {outcome}
              </div>
            ))}
          </div>
        </div>

        {/* Section 1: Common Sources of Electrical Waste */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-elec-yellow font-mono text-sm">01</span>
            <h2 className="text-xl font-bold text-white">Common Sources of Electrical Waste</h2>
          </div>
          <div className="bg-white/5 rounded-xl p-5 space-y-4 text-white/80 leading-relaxed">
            <p>Electrical waste falls into two main categories: technical losses inherent in equipment and systems, and operational waste from poor management or behaviour. Understanding these categories helps prioritise improvement efforts.</p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <h4 className="text-red-400 font-semibold mb-2 flex items-center gap-2"><Power className="h-5 w-5" /> Standby Power (Vampire Loads)</h4>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>- Equipment in standby mode: 5-15W typical</li>
                  <li>- Phone chargers left plugged in: 0.5-1W</li>
                  <li>- Vending machines: 50-100W constant</li>
                  <li>- IT equipment on but idle: 30-80W</li>
                  <li>- Total impact: 5-15% of building load</li>
                </ul>
              </div>
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                <h4 className="text-orange-400 font-semibold mb-2 flex items-center gap-2"><Lightbulb className="h-5 w-5" /> Inefficient Lighting</h4>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>- Incandescent: 90% energy as heat</li>
                  <li>- Halogen: 85% energy as heat</li>
                  <li>- Fluorescent T8: 75% as light</li>
                  <li>- LED: 80-90% as light</li>
                  <li>- Over-illumination: 20-50% waste</li>
                </ul>
              </div>
            </div>

            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4 mt-4">
              <h4 className="text-elec-yellow font-semibold mb-2">Easy Wins: Standby and Lighting</h4>
              <p className="text-white/70 text-sm mb-2">These represent the lowest-hanging fruit for energy savings:</p>
              <ul className="text-white/70 text-sm space-y-1">
                <li>- Install switched socket strips for office equipment clusters</li>
                <li>- Use 7-day timers on vending machines (save 35-50%)</li>
                <li>- Replace incandescent with LED (80-90% saving)</li>
                <li>- Install occupancy sensors in intermittently used areas</li>
                <li>- Reduce illumination levels to task-appropriate standards</li>
              </ul>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="text-blue-400 font-medium mb-2">Typical Savings Potential</h4>
              <p className="text-white/70 text-sm">A typical office building can achieve 15-25% electricity savings through addressing standby power and lighting alone, often with payback periods under 2 years.</p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Motor and Drive Inefficiencies */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-elec-yellow font-mono text-sm">02</span>
            <h2 className="text-xl font-bold text-white">Motor and Drive Inefficiencies</h2>
          </div>
          <div className="bg-white/5 rounded-xl p-5 space-y-4 text-white/80 leading-relaxed">
            <p>Electric motors account for approximately 65-70% of industrial electricity consumption. Even small efficiency improvements translate to significant savings. Key sources of motor inefficiency include:</p>

            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow flex items-center justify-center font-bold">1</div>
                <div>
                  <h4 className="text-white font-semibold">Motor Efficiency Class</h4>
                  <p className="text-white/70 text-sm mt-1">Old standard efficiency motors (IE1) waste 3-5% more energy than IE3/IE4 premium efficiency motors. For a 30kW motor running 4,000 hours/year, this represents 3,600-6,000 kWh annually.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow flex items-center justify-center font-bold">2</div>
                <div>
                  <h4 className="text-white font-semibold">Part-Load Operation</h4>
                  <p className="text-white/70 text-sm mt-1">Motors are most efficient at 75-100% of rated load. At 50% load, efficiency drops by 5-10%. Below 40% load, efficiency can drop by 10-20% or more.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow flex items-center justify-center font-bold">3</div>
                <div>
                  <h4 className="text-white font-semibold">Fixed Speed vs Variable Speed</h4>
                  <p className="text-white/70 text-sm mt-1">Fan and pump applications following the affinity laws can save 20-50% with VSDs. Throttling valves and dampers waste energy as pressure drops.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow flex items-center justify-center font-bold">4</div>
                <div>
                  <h4 className="text-white font-semibold">Mechanical Losses</h4>
                  <p className="text-white/70 text-sm mt-1">Belt drives waste 3-5% compared to direct drives. Worn bearings, misalignment, and poor lubrication add further losses and reduce motor lifespan.</p>
                </div>
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mt-4">
              <h4 className="text-green-400 font-semibold mb-2">The Affinity Laws</h4>
              <p className="text-white/70 text-sm mb-2">For centrifugal fans and pumps:</p>
              <ul className="text-white/70 text-sm space-y-1">
                <li>- Flow is proportional to speed (reduce speed 20% = 20% less flow)</li>
                <li>- Pressure is proportional to speed squared</li>
                <li>- Power is proportional to speed cubed (reduce speed 20% = ~50% less power)</li>
              </ul>
            </div>

            <div className="overflow-x-auto mt-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-3 px-2 text-white font-semibold">Motor Loading</th>
                    <th className="text-center py-3 px-2 text-white font-semibold">Typical Efficiency</th>
                    <th className="text-center py-3 px-2 text-white font-semibold">Power Factor</th>
                  </tr>
                </thead>
                <tbody className="text-white/70">
                  <tr className="border-b border-white/10"><td className="py-3 px-2">100% load</td><td className="text-center py-3 px-2">92-95%</td><td className="text-center py-3 px-2">0.85-0.90</td></tr>
                  <tr className="border-b border-white/10"><td className="py-3 px-2">75% load</td><td className="text-center py-3 px-2">91-94%</td><td className="text-center py-3 px-2">0.80-0.85</td></tr>
                  <tr className="border-b border-white/10"><td className="py-3 px-2">50% load</td><td className="text-center py-3 px-2">85-90%</td><td className="text-center py-3 px-2">0.70-0.78</td></tr>
                  <tr><td className="py-3 px-2">25% load</td><td className="text-center py-3 px-2">70-80%</td><td className="text-center py-3 px-2">0.50-0.60</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Poor Power Factor and Reactive Power */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-elec-yellow font-mono text-sm">03</span>
            <h2 className="text-xl font-bold text-white">Poor Power Factor and Reactive Power</h2>
          </div>
          <div className="bg-white/5 rounded-xl p-5 space-y-4 text-white/80 leading-relaxed">
            <p>Power factor represents the ratio of real power (kW) doing useful work to apparent power (kVA) supplied. A poor power factor means the installation draws more current than necessary to perform the same work.</p>

            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h4 className="text-red-400 font-semibold mb-2 flex items-center gap-2"><AlertTriangle className="h-5 w-5" /> Impact of Poor Power Factor</h4>
              <div className="grid sm:grid-cols-2 gap-4 text-white/70 text-sm">
                <ul className="space-y-1">
                  <li>- Increased current flow for same kW</li>
                  <li>- Higher I²R losses in cables</li>
                  <li>- Reduced transformer/cable capacity</li>
                  <li>- Reactive power charges from DNO</li>
                </ul>
                <ul className="space-y-1">
                  <li>- Increased voltage drop</li>
                  <li>- Larger switchgear requirements</li>
                  <li>- Higher maximum demand charges</li>
                  <li>- Potential supply capacity issues</li>
                </ul>
              </div>
            </div>

            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
              <h4 className="text-elec-yellow font-semibold mb-2">Calculating Current Increase</h4>
              <p className="text-white/70 text-sm mb-2">Current is inversely proportional to power factor. For a load requiring 100kW:</p>
              <ul className="text-white/70 text-sm space-y-1">
                <li>- At PF 1.0: Current = 100kW / (400V x 1.73 x 1.0) = 144A</li>
                <li>- At PF 0.7: Current = 100kW / (400V x 1.73 x 0.7) = 206A (43% more)</li>
                <li>- At PF 0.8: Current = 100kW / (400V x 1.73 x 0.8) = 180A (25% more)</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                <h4 className="text-orange-400 font-semibold mb-2">Common Causes</h4>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>- Lightly loaded induction motors</li>
                  <li>- Fluorescent/discharge lighting</li>
                  <li>- Welding equipment</li>
                  <li>- Induction furnaces</li>
                  <li>- Arc furnaces</li>
                  <li>- Old magnetic ballasts</li>
                </ul>
              </div>
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <h4 className="text-green-400 font-semibold mb-2">Correction Methods</h4>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>- Power factor correction capacitors</li>
                  <li>- Automatic PFC equipment</li>
                  <li>- Synchronous condensers</li>
                  <li>- Active power filters</li>
                  <li>- Right-sizing motors</li>
                  <li>- LED lighting conversion</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mt-4">
              <h4 className="text-blue-400 font-medium mb-2">UK Tariff Implications</h4>
              <p className="text-white/70 text-sm">Many UK electricity tariffs charge for reactive power (kVArh) when power factor falls below 0.95. Maximum demand charges are based on kVA, not kW, penalising poor power factor. Typical target: 0.95-0.98 power factor.</p>
            </div>
          </div>
        </section>

        {/* Section 4: Oversized or Underloaded Equipment */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-elec-yellow font-mono text-sm">04</span>
            <h2 className="text-xl font-bold text-white">Oversized or Underloaded Equipment</h2>
          </div>
          <div className="bg-white/5 rounded-xl p-5 space-y-4 text-white/80 leading-relaxed">
            <p>Equipment oversizing is common due to safety margins added at each design stage. While ensuring reliability, excessive oversizing creates ongoing efficiency penalties through poor part-load performance.</p>

            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h4 className="text-red-400 font-semibold mb-2">Why Oversizing Occurs</h4>
              <ul className="text-white/70 text-sm space-y-1">
                <li>- Client adds 20% safety margin to requirements</li>
                <li>- Consultant adds 15% for future expansion</li>
                <li>- Contractor rounds up to next standard size</li>
                <li>- Result: Equipment running at 40-50% capacity</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                <h4 className="text-orange-400 font-semibold mb-2 flex items-center gap-2"><Settings className="h-5 w-5" /> Motors</h4>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>- Fixed losses remain constant</li>
                  <li>- Efficiency drops significantly at low loads</li>
                  <li>- Power factor deteriorates</li>
                  <li>- Higher capital and running costs</li>
                </ul>
                <p className="text-white/70 text-sm mt-2">Studies show 30-40% of industrial motors are oversized by more than 20%.</p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h4 className="text-blue-400 font-semibold mb-2 flex items-center gap-2"><Gauge className="h-5 w-5" /> Transformers</h4>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>- Iron losses constant regardless of load</li>
                  <li>- Maximum efficiency at 50-70% loading</li>
                  <li>- Very light loads waste iron losses</li>
                  <li>- Consider de-energising paralleled units</li>
                </ul>
                <p className="text-white/70 text-sm mt-2">A 1000kVA transformer at 20% load wastes more energy on iron losses than a correctly sized 315kVA unit.</p>
              </div>
            </div>

            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4 mt-4">
              <h4 className="text-elec-yellow font-semibold mb-2">Identification Methods</h4>
              <ul className="text-white/70 text-sm space-y-1">
                <li>- Compare nameplate rating to measured current draw</li>
                <li>- Use data logging to capture load profiles over operating cycles</li>
                <li>- Check motor current with clamp meter (I/In ratio)</li>
                <li>- Review original design calculations vs actual requirements</li>
                <li>- Identify equipment that cycles on/off frequently (oversized)</li>
              </ul>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mt-4">
              <h4 className="text-green-400 font-medium mb-2">Right-Sizing Opportunities</h4>
              <p className="text-white/70 text-sm">When motors fail, replace with correctly sized units rather than like-for-like. Document actual load requirements to inform future decisions. Consider VSDs as an alternative to right-sizing where loads vary.</p>
            </div>
          </div>
        </section>

        {/* Section 5: Distribution Losses and Cable Sizing */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-elec-yellow font-mono text-sm">05</span>
            <h2 className="text-xl font-bold text-white">Distribution Losses and Cable Sizing</h2>
          </div>
          <div className="bg-white/5 rounded-xl p-5 space-y-4 text-white/80 leading-relaxed">
            <p>Cables dissipate energy as heat due to their resistance. These I²R losses are often overlooked but can be significant, particularly for long cable runs, high currents, or cables operating near their rated capacity.</p>

            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
              <h4 className="text-elec-yellow font-semibold mb-2 flex items-center gap-2"><Cable className="h-5 w-5" /> The I²R Loss Formula</h4>
              <p className="text-white text-lg font-mono mb-2">P(loss) = I² x R (watts)</p>
              <ul className="text-white/70 text-sm space-y-1">
                <li>- Power loss increases with the SQUARE of current</li>
                <li>- Double the current = 4x the losses</li>
                <li>- Reducing current by 10% reduces losses by 19%</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">Factors Affecting Cable Losses</h4>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>- Cable cross-sectional area (larger = lower R)</li>
                  <li>- Cable length (longer = higher R)</li>
                  <li>- Conductor material (Cu vs Al)</li>
                  <li>- Operating temperature (hotter = higher R)</li>
                  <li>- Current magnitude (I²)</li>
                </ul>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">Example Calculation</h4>
                <p className="text-white/70 text-sm mb-2">100m of 16mm² copper cable carrying 60A:</p>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>- Resistance: 0.115 ohms/100m</li>
                  <li>- Loss per phase: 60² x 0.115 = 414W</li>
                  <li>- Three-phase loss: 1,242W</li>
                  <li>- Annual: 10,890 kWh at 8,760 hours</li>
                </ul>
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mt-4">
              <h4 className="text-green-400 font-semibold mb-2">Economic Cable Sizing</h4>
              <p className="text-white/70 text-sm mb-2">BS 7671 provides minimum sizes for safety. IET guidance recommends considering lifetime energy costs:</p>
              <ul className="text-white/70 text-sm space-y-1">
                <li>- Calculate annual losses at expected loading</li>
                <li>- Compare incremental cable cost vs energy savings</li>
                <li>- Typically justified to upsize by 1-2 sizes for heavily loaded cables</li>
                <li>- Most beneficial for long runs and high utilisation</li>
              </ul>
            </div>

            <div className="overflow-x-auto mt-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-3 px-2 text-white font-semibold">Cable Size</th>
                    <th className="text-center py-3 px-2 text-white font-semibold">Resistance (ohm/km)</th>
                    <th className="text-center py-3 px-2 text-white font-semibold">Loss Reduction vs Smaller</th>
                  </tr>
                </thead>
                <tbody className="text-white/70">
                  <tr className="border-b border-white/10"><td className="py-3 px-2">10mm² Cu</td><td className="text-center py-3 px-2">1.83</td><td className="text-center py-3 px-2">-</td></tr>
                  <tr className="border-b border-white/10"><td className="py-3 px-2">16mm² Cu</td><td className="text-center py-3 px-2">1.15</td><td className="text-center py-3 px-2">37% less</td></tr>
                  <tr className="border-b border-white/10"><td className="py-3 px-2">25mm² Cu</td><td className="text-center py-3 px-2">0.727</td><td className="text-center py-3 px-2">37% less</td></tr>
                  <tr><td className="py-3 px-2">35mm² Cu</td><td className="text-center py-3 px-2">0.524</td><td className="text-center py-3 px-2">28% less</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 6: Behavioural Waste and Management Issues */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-elec-yellow font-mono text-sm">06</span>
            <h2 className="text-xl font-bold text-white">Behavioural Waste and Management Issues</h2>
          </div>
          <div className="bg-white/5 rounded-xl p-5 space-y-4 text-white/80 leading-relaxed">
            <p>Technical solutions alone cannot address all energy waste. Human behaviour and management practices significantly impact energy consumption. Studies suggest behavioural factors account for 10-30% of potential savings.</p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <h4 className="text-red-400 font-semibold mb-2 flex items-center gap-2"><Users className="h-5 w-5" /> Common Behavioural Waste</h4>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>- Lights left on in unoccupied areas</li>
                  <li>- Equipment running outside working hours</li>
                  <li>- Doors/windows open while HVAC operates</li>
                  <li>- Personal heaters under desks</li>
                  <li>- Computers left on overnight</li>
                  <li>- Compressed air leaks unreported</li>
                </ul>
              </div>
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                <h4 className="text-orange-400 font-semibold mb-2 flex items-center gap-2"><Settings className="h-5 w-5" /> Management Issues</h4>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>- No energy policy or targets</li>
                  <li>- Lack of sub-metering data</li>
                  <li>- No accountability for consumption</li>
                  <li>- Deferred maintenance</li>
                  <li>- Poor commissioning of controls</li>
                  <li>- Override culture (BMS bypassed)</li>
                </ul>
              </div>
            </div>

            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4 mt-4">
              <h4 className="text-elec-yellow font-semibold mb-2">Addressing Behavioural Waste</h4>
              <div className="grid sm:grid-cols-2 gap-4 text-white/70 text-sm">
                <div>
                  <h5 className="text-white font-medium mb-1">Technical Controls</h5>
                  <ul className="space-y-1">
                    <li>- PIR/occupancy sensors for lighting</li>
                    <li>- Timer controls on equipment</li>
                    <li>- BMS scheduling and optimisation</li>
                    <li>- Automatic power-down settings</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-white font-medium mb-1">Cultural Approaches</h5>
                  <ul className="space-y-1">
                    <li>- Energy awareness training</li>
                    <li>- Visual feedback (dashboards)</li>
                    <li>- Clear switch-off procedures</li>
                    <li>- Energy champions programme</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mt-4">
              <h4 className="text-green-400 font-semibold mb-2">The 10% Behaviour Bonus</h4>
              <p className="text-white/70 text-sm">Research consistently shows that awareness campaigns combined with feedback can achieve 5-15% savings with minimal capital investment. Key success factors: visible data, clear targets, recognition, and sustained management commitment.</p>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mt-4">
              <h4 className="text-blue-400 font-semibold mb-2">Maintenance Impact</h4>
              <ul className="text-white/70 text-sm space-y-1">
                <li>- Dirty filters reduce HVAC efficiency by 10-25%</li>
                <li>- Compressed air leaks waste 20-30% of compressor output</li>
                <li>- Steam trap failures waste significant energy</li>
                <li>- Poor insulation on hot/cold services increases loads</li>
                <li>- Regular maintenance is an energy efficiency measure</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 rounded-2xl border border-elec-yellow/30 p-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Wrench className="h-5 w-5 text-elec-yellow" /> Quick Reference: Identifying Electrical Waste</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="bg-black/20 rounded-lg p-4">
              <h4 className="text-elec-yellow font-semibold mb-2">Standby & Lighting</h4>
              <ul className="text-white/80 space-y-1">
                <li>- Standby: 5-15% of total load</li>
                <li>- LED vs incandescent: 80-90% saving</li>
                <li>- Occupancy sensors: 30-50% saving</li>
                <li>- Quick payback, low risk</li>
              </ul>
            </div>
            <div className="bg-black/20 rounded-lg p-4">
              <h4 className="text-elec-yellow font-semibold mb-2">Motors & Drives</h4>
              <ul className="text-white/80 space-y-1">
                <li>- VSD savings: 20-50% on fans/pumps</li>
                <li>- Optimal loading: 75-100%</li>
                <li>- Part-load penalty: 10-20% loss</li>
                <li>- Right-size on replacement</li>
              </ul>
            </div>
            <div className="bg-black/20 rounded-lg p-4">
              <h4 className="text-elec-yellow font-semibold mb-2">Power Factor</h4>
              <ul className="text-white/80 space-y-1">
                <li>- Target: 0.95-0.98</li>
                <li>- PF 0.7 = 43% excess current</li>
                <li>- Auto PFC: 1-2 year payback</li>
                <li>- Reduces MD charges</li>
              </ul>
            </div>
            <div className="bg-black/20 rounded-lg p-4">
              <h4 className="text-elec-yellow font-semibold mb-2">Distribution Losses</h4>
              <ul className="text-white/80 space-y-1">
                <li>- Loss = I²R (current squared)</li>
                <li>- Double current = 4x losses</li>
                <li>- Economic cable sizing justified</li>
                <li>- Long runs: upsize 1-2 sizes</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2"><HelpCircle className="h-5 w-5 text-elec-yellow" /> Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details key={i} className="group bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/5 transition-colors list-none min-h-[44px] touch-manipulation active:scale-[0.98]">
                  <span className="text-white font-medium pr-4">{faq.question}</span>
                  <ChevronRight className="h-5 w-5 text-white/50 group-open:rotate-90 transition-transform flex-shrink-0" />
                </summary>
                <div className="px-4 pb-4 text-white/70 text-sm leading-relaxed border-t border-white/10 pt-4">{faq.answer}</div>
              </details>
            ))}
          </div>
        </section>

        {/* Quiz Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white">Module 1.3 Quiz</h2>
          <p className="text-white/60">Test your understanding of identifying waste in electrical systems.</p>
          <Quiz questions={quizQuestions} title="Identifying Electrical Waste Quiz" />
        </section>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-white/10">
          <Link to="/study-centre/upskilling/energy-efficiency-module-1-section-2" className="flex-1">
            <Button variant="outline" className="w-full min-h-[48px] border-white/20 text-white hover:bg-white/10 gap-2 touch-manipulation active:scale-[0.98]">
              <ChevronLeft className="h-4 w-4" /> Previous: UK Carbon Targets
            </Button>
          </Link>
          <Link to="/study-centre/upskilling/energy-efficiency-module-1-section-4" className="flex-1">
            <Button className="w-full min-h-[48px] bg-elec-yellow text-black hover:bg-elec-yellow/90 gap-2 touch-manipulation active:scale-[0.98]">
              Next: BS EN and ISO Standards <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EnergyEfficiencyModule1Section3;
