import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';
import {
  Lightbulb,
  ArrowLeft,
  ArrowRight,
  Zap,
  Settings,
  FileCheck,
  Calculator,
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  TrendingUp,
  Clock,
  PoundSterling,
  Gauge,
  Sun,
  Radio,
  Target,
  HelpCircle
} from 'lucide-react';

const EnergyEfficiencyModule4Section1: React.FC = () => {
  useSEO({
    title: 'LED and Lighting Control Upgrades | Energy Efficiency Module 4 Section 1 | Elec-Mate',
    description: 'Master LED lighting technology, control systems including DALI and PIR, UK Part L compliance requirements, and ROI calculations for energy-efficient lighting upgrades.',
    keywords: [
      'LED lighting',
      'DALI controls',
      'PIR sensors',
      'Part L compliance',
      'lighting upgrades',
      'energy efficiency',
      'lumen efficacy',
      'daylight harvesting',
      'UK electrical training'
    ],
    canonicalUrl: '/upskilling/energy-efficiency/module-4/section-1'
  });

  const quickCheckQuestions = [
    {
      id: 'qc-led-efficacy',
      question: 'What is the typical lumen efficacy range of modern LED lamps compared to traditional incandescent bulbs?',
      options: [
        '10-15 lm/W vs 8-12 lm/W',
        '80-150 lm/W vs 10-17 lm/W',
        '40-60 lm/W vs 30-40 lm/W',
        '200-300 lm/W vs 50-70 lm/W'
      ],
      correctIndex: 1,
      explanation: 'Modern LEDs achieve 80-150 lumens per watt (lm/W), while incandescent bulbs only manage 10-17 lm/W. This represents an 8-10x improvement in efficacy, making LEDs significantly more energy efficient.'
    },
    {
      id: 'qc-dali-advantage',
      question: 'What is the key advantage of DALI (Digital Addressable Lighting Interface) over 1-10V dimming systems?',
      options: [
        'Lower installation cost',
        'Individual luminaire addressing and two-way communication',
        'Simpler wiring requirements',
        'Higher dimming range'
      ],
      correctIndex: 1,
      explanation: 'DALI allows individual addressing of up to 64 luminaires per line with two-way communication for status feedback, fault reporting, and precise control. 1-10V systems can only dim groups together and provide no feedback.'
    },
    {
      id: 'qc-part-l-requirement',
      question: 'Under UK Building Regulations Part L, what is the minimum luminous efficacy requirement for new non-domestic lighting installations?',
      options: [
        '45 luminaire lumens per circuit watt',
        '60 luminaire lumens per circuit watt',
        '75 luminaire lumens per circuit watt',
        '90 luminaire lumens per circuit watt'
      ],
      correctIndex: 1,
      explanation: 'Part L 2021 requires a minimum luminous efficacy of 60 luminaire lumens per circuit watt for general lighting in new non-domestic buildings. This includes all control gear losses and ensures energy-efficient installations.'
    }
  ];

  const quizQuestions = [
    {
      question: 'A 100W incandescent lamp producing 1200 lumens is being replaced. What wattage LED lamp would typically provide equivalent light output?',
      options: ['40W', '25W', '12-15W', '8-10W'],
      correctAnswer: '12-15W'
    },
    {
      question: 'What does the term "L70" refer to in LED specifications?',
      options: [
        'The lamp operates at 70% brightness',
        'The point at which light output degrades to 70% of initial lumens',
        'The maximum dimming level of 70%',
        'The colour temperature in 70K increments'
      ],
      correctAnswer: 'The point at which light output degrades to 70% of initial lumens'
    },
    {
      question: 'When should complete luminaire replacement be chosen over lamp-only retrofitting?',
      options: [
        'Always, as it is more cost-effective',
        'Only when existing luminaires are less than 5 years old',
        'When control gear is incompatible, reflectors are degraded, or thermal management is inadequate',
        'Never, as retrofit lamps are always sufficient'
      ],
      correctAnswer: 'When control gear is incompatible, reflectors are degraded, or thermal management is inadequate'
    },
    {
      question: 'What is the recommended maintained illuminance level for a typical office workspace according to BS EN 12464-1?',
      options: ['200 lux', '300 lux', '500 lux', '750 lux'],
      correctAnswer: '500 lux'
    },
    {
      question: 'A PIR (Passive Infrared) sensor detects occupancy by sensing:',
      options: [
        'Sound levels in the space',
        'Changes in infrared radiation from body heat',
        'Air pressure changes from movement',
        'Electromagnetic fields from people'
      ],
      correctAnswer: 'Changes in infrared radiation from body heat'
    },
    {
      question: 'What is the maximum number of devices that can be connected to a single DALI line?',
      options: ['32 devices', '64 devices', '128 devices', '256 devices'],
      correctAnswer: '64 devices'
    },
    {
      question: 'For a lighting upgrade with £5,000 installation cost saving £2,500 annually in energy costs, what is the simple payback period?',
      options: ['6 months', '1 year', '2 years', '5 years'],
      correctAnswer: '2 years'
    },
    {
      question: 'Daylight harvesting controls work by:',
      options: [
        'Switching lights on when daylight fades',
        'Automatically dimming artificial light in response to available daylight levels',
        'Blocking daylight to reduce glare',
        'Storing daylight energy for later use'
      ],
      correctAnswer: 'Automatically dimming artificial light in response to available daylight levels'
    },
    {
      question: 'What colour temperature range is typically classified as "warm white"?',
      options: ['2700-3000K', '4000-4500K', '5000-5500K', '6000-6500K'],
      correctAnswer: '2700-3000K'
    },
    {
      question: 'When installing LED retrofit tubes in existing fluorescent fittings, what critical safety step must be taken?',
      options: [
        'Increase the circuit breaker rating',
        'Remove or bypass the existing ballast/control gear',
        'Add a step-up transformer',
        'Install additional earthing'
      ],
      correctAnswer: 'Remove or bypass the existing ballast/control gear'
    }
  ];

  const faqs = [
    {
      question: 'Can I simply replace fluorescent tubes with LED tubes in existing fittings?',
      answer: 'It depends on the type of LED tube. Type A (plug-and-play) tubes work with existing ballasts but may have compatibility issues and lower efficiency. Type B tubes require ballast bypass and direct mains connection - these are more efficient but require rewiring. Type C tubes need an external LED driver. For best results and safety, always check compatibility, consider complete luminaire replacement for older fittings, and ensure any modifications comply with BS 7671. The existing fitting becomes a new product when modified, affecting warranty and liability.'
    },
    {
      question: 'How do I calculate if an LED upgrade is financially worthwhile?',
      answer: 'Calculate simple payback: divide total upgrade cost by annual energy savings. For example: upgrading 50 x 58W fluorescents (2900W) to 50 x 25W LEDs (1250W) running 2,500 hours/year saves 4,125 kWh annually. At £0.30/kWh, that\'s £1,237.50 saved per year. If the upgrade costs £2,500, payback is approximately 2 years. Also factor in reduced maintenance costs (LED lifespan 50,000+ hours vs 15,000 for fluorescent), any available incentives, and improved light quality benefits.'
    },
    {
      question: 'What are the Part L requirements for lighting controls in new non-domestic buildings?',
      answer: 'Part L 2021 requires: automatic switching/dimming linked to daylight in spaces with adequate daylight, occupancy sensing in spaces with intermittent use, time scheduling where appropriate, and manual override facilities. The lighting must achieve minimum 60 luminaire lumens per circuit watt. Controls should be commissioned and a Building Log Book provided. For spaces over 100m², consideration should be given to local switching to avoid lighting unoccupied areas.'
    },
    {
      question: 'What\'s the difference between PIR, microwave, and ultrasonic occupancy sensors?',
      answer: 'PIR (Passive Infrared) detects body heat movement - best for smaller enclosed spaces, cannot detect through obstacles, may miss small movements. Microwave sensors emit and detect radio waves, detecting any movement including through partitions - better for larger or open areas, can be more sensitive. Ultrasonic sensors use sound waves, good for spaces with obstacles blocking line of sight. Often, dual-technology sensors combining PIR with microwave or ultrasonic provide the most reliable detection while reducing false triggering.'
    },
    {
      question: 'How do I ensure good dimming performance with LED luminaires?',
      answer: 'Key factors: use a compatible dimmer designed for LED loads (leading-edge dimmers often cause flickering), check minimum load requirements (some dimmers need minimum 25W), ensure driver compatibility (DALI, 1-10V, or phase-cut), select quality LEDs with smooth dimming curves, and consider dimming range (some LEDs only dim to 10-20%). For DALI systems, ensure correct addressing and verify the dimming curve in the driver settings. Always test the full dimming range during commissioning.'
    },
    {
      question: 'What documentation is required when completing a lighting upgrade project?',
      answer: 'Required documentation includes: Electrical Installation Certificate (EIC) or Minor Works Certificate as appropriate, BS 7671 compliance declaration, emergency lighting certification to BS 5266 if applicable, Part L compliance calculations and evidence, DALI or control system commissioning records, luminaire data sheets and warranty information, maintenance schedules, and a Building Log Book for non-domestic installations. Also provide client handover documentation including operating instructions and recommended lamp replacement specifications.'
    }
  ];

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a] text-white">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild className="text-white hover:text-elec-yellow hover:bg-transparent p-2">
            <Link to="/electrician/upskilling/energy-efficiency-module-4">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-elec-yellow" />
              <span className="text-elec-yellow text-sm font-medium">Module 4 - Section 1</span>
            </div>
            <h1 className="text-lg font-semibold text-white">LED and Lighting Control Upgrades</h1>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-8">
        {/* Quick Summary */}
        <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
          <p className="text-white/90 leading-relaxed">
            Lighting typically accounts for <span className="text-elec-yellow font-semibold">15-25% of a commercial building's electricity consumption</span>.
            Modern LED technology combined with intelligent controls can reduce this by 50-80%. This section covers the technical knowledge
            and practical skills needed to specify, install, and commission energy-efficient lighting systems that comply with UK Building
            Regulations Part L and deliver genuine energy savings.
          </p>
        </div>

        {/* Section 1: LED Technology Advantages */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            LED Technology Advantages and Lumen Efficacy
          </h2>

          <div className="bg-white/5 rounded-xl p-5 space-y-4">
            <p className="text-white/80">
              LED (Light Emitting Diode) technology has revolutionised the lighting industry. Understanding efficacy
              comparisons is essential for specifying appropriate replacements and calculating energy savings.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="text-elec-yellow font-semibold mb-3 flex items-center gap-2">
                  <Gauge className="w-5 h-5" />
                  Lumen Efficacy Comparison
                </h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-2 text-white/70">Technology</th>
                      <th className="text-right py-2 text-white/70">lm/W</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/80">
                    <tr className="border-b border-white/10">
                      <td className="py-2">Incandescent</td>
                      <td className="text-right">10-17</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2">Halogen</td>
                      <td className="text-right">15-25</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2">CFL</td>
                      <td className="text-right">45-75</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2">T8 Fluorescent</td>
                      <td className="text-right">70-100</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2">T5 Fluorescent</td>
                      <td className="text-right">80-105</td>
                    </tr>
                    <tr className="text-elec-yellow font-semibold">
                      <td className="py-2">Modern LED</td>
                      <td className="text-right">80-150+</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="text-elec-yellow font-semibold mb-3 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Key LED Advantages
                </h3>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Long lifespan:</strong> 50,000+ hours (L70) vs 15,000 for fluorescent</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Instant start:</strong> Full brightness immediately, unlimited switching cycles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Dimmable:</strong> Smooth dimming to 1% with appropriate drivers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Directional:</strong> Light output can be precisely directed, reducing waste</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Mercury-free:</strong> No hazardous materials, easier disposal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Low heat:</strong> Reduced HVAC load, safer installation options</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4 mt-4">
              <h4 className="text-elec-yellow font-semibold mb-2">Understanding L70 and Lumen Maintenance</h4>
              <p className="text-white/80 text-sm">
                L70 indicates the point at which LED light output has degraded to 70% of its initial lumens.
                A 50,000-hour L70 rating means the LED will still produce 70% of original output after 50,000 hours.
                For critical applications, specify L80 or L90 ratings. Always factor in lumen depreciation when
                calculating maintained illuminance levels - specify initial lumens 1.25-1.4x the maintained requirement.
              </p>
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

        {/* Section 2: Lamp vs Luminaire Replacement */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Lamp Replacement vs Luminaire Replacement Decisions
          </h2>

          <div className="bg-white/5 rounded-xl p-5 space-y-4">
            <p className="text-white/80">
              Choosing between retrofit lamps and complete luminaire replacement requires careful assessment of
              the existing installation, desired outcomes, and total cost of ownership.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="text-green-400 font-semibold mb-3">Lamp Retrofit - When Suitable</h3>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Luminaires less than 10 years old in good condition
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    High-quality reflectors still performing well
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Compatible electronic ballasts (for Type A tubes)
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Budget constraints requiring phased upgrade
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Listed or heritage buildings with appearance restrictions
                  </li>
                </ul>
                <div className="mt-3 pt-3 border-t border-white/10">
                  <p className="text-yellow-400 text-xs">
                    <strong>Note:</strong> Typical retrofit savings: 40-50% energy reduction
                  </p>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="text-elec-yellow font-semibold mb-3">Full Luminaire Replacement - When Required</h3>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    Magnetic ballasts (incompatible with LED retrofit)
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    Degraded or yellowed reflectors/diffusers
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    Poor thermal management risking LED life
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    Control system upgrade required (DALI, etc.)
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    Lighting design inadequate (spacing, levels)
                  </li>
                </ul>
                <div className="mt-3 pt-3 border-t border-white/10">
                  <p className="text-green-400 text-xs">
                    <strong>Benefit:</strong> Typical new installation savings: 60-75% energy reduction
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h4 className="text-red-400 font-semibold mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Critical: LED Tube Retrofit Types
              </h4>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="text-white/80">
                  <strong className="text-white">Type A (Plug and Play)</strong>
                  <p>Works with existing ballast. Quick install but limited compatibility and reduced efficiency.</p>
                </div>
                <div className="text-white/80">
                  <strong className="text-white">Type B (Ballast Bypass)</strong>
                  <p>Direct mains connection. Requires rewiring but more efficient. Fitting becomes new product.</p>
                </div>
                <div className="text-white/80">
                  <strong className="text-white">Type C (External Driver)</strong>
                  <p>Uses separate LED driver. Most flexible and efficient but highest installation complexity.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Lighting Control Strategies */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Lighting Control Strategies (PIR, Daylight, DALI)
          </h2>

          <div className="bg-white/5 rounded-xl p-5 space-y-4">
            <p className="text-white/80">
              Effective lighting controls can save an additional 30-50% beyond the LED lamp savings.
              Understanding each technology's strengths enables optimal system design.
            </p>

            <div className="space-y-4">
              {/* Occupancy Sensing */}
              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="text-elec-yellow font-semibold mb-3 flex items-center gap-2">
                  <Radio className="w-5 h-5" />
                  Occupancy/Presence Detection
                </h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-white/5 rounded p-3">
                    <h4 className="text-white font-medium mb-2">PIR (Passive Infrared)</h4>
                    <ul className="text-white/70 space-y-1">
                      <li>- Detects body heat movement</li>
                      <li>- Line-of-sight required</li>
                      <li>- Best for: offices, corridors</li>
                      <li>- Range: up to 12m typical</li>
                      <li>- Cost: Low</li>
                    </ul>
                  </div>
                  <div className="bg-white/5 rounded p-3">
                    <h4 className="text-white font-medium mb-2">Microwave</h4>
                    <ul className="text-white/70 space-y-1">
                      <li>- Detects any movement</li>
                      <li>- Works through partitions</li>
                      <li>- Best for: open areas, WCs</li>
                      <li>- Range: up to 15m+</li>
                      <li>- Cost: Medium</li>
                    </ul>
                  </div>
                  <div className="bg-white/5 rounded p-3">
                    <h4 className="text-white font-medium mb-2">Dual Technology</h4>
                    <ul className="text-white/70 space-y-1">
                      <li>- Combines PIR + microwave</li>
                      <li>- Reduces false triggers</li>
                      <li>- Best for: high-reliability needs</li>
                      <li>- Range: varies by model</li>
                      <li>- Cost: Higher</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Daylight Harvesting */}
              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="text-elec-yellow font-semibold mb-3 flex items-center gap-2">
                  <Sun className="w-5 h-5" />
                  Daylight Harvesting/Linking
                </h3>
                <p className="text-white/80 text-sm mb-3">
                  Photocells measure ambient light levels and automatically dim artificial lighting to maintain
                  target lux levels while maximising daylight use. Savings of 20-40% are typical in daylit spaces.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="text-sm text-white/80">
                    <strong className="text-white">Open Loop</strong>
                    <p>Sensor faces window, measures daylight only. Simple but less accurate.</p>
                  </div>
                  <div className="text-sm text-white/80">
                    <strong className="text-white">Closed Loop</strong>
                    <p>Sensor faces task area, measures combined light. More accurate, requires calibration.</p>
                  </div>
                </div>
              </div>

              {/* DALI vs 1-10V */}
              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="text-elec-yellow font-semibold mb-3 flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  DALI vs 1-10V Dimming Systems
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/20">
                        <th className="text-left py-2 text-white/70">Feature</th>
                        <th className="text-center py-2 text-white/70">1-10V</th>
                        <th className="text-center py-2 text-elec-yellow">DALI</th>
                      </tr>
                    </thead>
                    <tbody className="text-white/80">
                      <tr className="border-b border-white/10">
                        <td className="py-2">Communication</td>
                        <td className="text-center">One-way (analogue)</td>
                        <td className="text-center text-green-400">Two-way (digital)</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-2">Individual addressing</td>
                        <td className="text-center text-red-400">No (groups only)</td>
                        <td className="text-center text-green-400">Yes (64 per line)</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-2">Status feedback</td>
                        <td className="text-center text-red-400">No</td>
                        <td className="text-center text-green-400">Yes (fault reporting)</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-2">Wiring</td>
                        <td className="text-center">Dedicated control wire</td>
                        <td className="text-center">2-core, polarity free</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-2">Scene control</td>
                        <td className="text-center text-red-400">Limited</td>
                        <td className="text-center text-green-400">16 scenes per group</td>
                      </tr>
                      <tr>
                        <td className="py-2">Installation cost</td>
                        <td className="text-center text-green-400">Lower</td>
                        <td className="text-center">Higher (but more capable)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
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

        {/* Section 4: Part L Compliance */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Part L Compliance and Lux Level Requirements
          </h2>

          <div className="bg-white/5 rounded-xl p-5 space-y-4">
            <p className="text-white/80">
              UK Building Regulations Part L sets minimum energy efficiency standards for lighting in new
              and refurbished buildings. Understanding these requirements is essential for compliant installations.
            </p>

            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-elec-yellow font-semibold mb-3 flex items-center gap-2">
                <FileCheck className="w-5 h-5" />
                Part L 2021 Key Requirements (Non-Domestic)
              </h3>
              <ul className="space-y-2 text-white/80">
                <li className="flex items-start gap-2">
                  <Target className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Minimum efficacy:</strong> 60 luminaire lumens per circuit watt for general lighting</span>
                </li>
                <li className="flex items-start gap-2">
                  <Target className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Controls required:</strong> Automatic switching/dimming in response to daylight and occupancy</span>
                </li>
                <li className="flex items-start gap-2">
                  <Target className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Zoning:</strong> Local switching for areas over 100m² to avoid lighting unoccupied zones</span>
                </li>
                <li className="flex items-start gap-2">
                  <Target className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Metering:</strong> Sub-metering for lighting loads exceeding 100kW total</span>
                </li>
                <li className="flex items-start gap-2">
                  <Target className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Commissioning:</strong> System must be commissioned and results recorded</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-elec-yellow font-semibold mb-3 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                BS EN 12464-1 Maintained Illuminance Levels
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <table className="text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-2 text-white/70">Space Type</th>
                      <th className="text-right py-2 text-white/70">Lux</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/80">
                    <tr className="border-b border-white/10">
                      <td className="py-1">Corridors</td>
                      <td className="text-right">100</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-1">Stairs</td>
                      <td className="text-right">150</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-1">Reception areas</td>
                      <td className="text-right">300</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-1">General offices</td>
                      <td className="text-right">500</td>
                    </tr>
                    <tr>
                      <td className="py-1">Technical drawing</td>
                      <td className="text-right">750</td>
                    </tr>
                  </tbody>
                </table>
                <table className="text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-2 text-white/70">Space Type</th>
                      <th className="text-right py-2 text-white/70">Lux</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/80">
                    <tr className="border-b border-white/10">
                      <td className="py-1">Storage/archives</td>
                      <td className="text-right">100</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-1">Meeting rooms</td>
                      <td className="text-right">500</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-1">Retail general</td>
                      <td className="text-right">300</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-1">Industrial fine work</td>
                      <td className="text-right">1000</td>
                    </tr>
                    <tr>
                      <td className="py-1">Inspection tasks</td>
                      <td className="text-right">1500+</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="text-blue-400 font-semibold mb-2">Calculating Circuit Watts</h4>
              <p className="text-white/80 text-sm">
                Circuit watts = lamp watts + control gear losses. For LED luminaires, this is typically the
                stated luminaire wattage. For older technology with separate ballasts, add ballast losses
                (typically 10-15% for electronic, 20-25% for magnetic). The 60 lm/W requirement uses
                <em> luminaire lumens</em> (output from the fitting, not bare lamp lumens) divided by total circuit watts.
              </p>
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

        {/* Section 5: ROI Calculations */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            ROI Calculations for Lighting Upgrades
          </h2>

          <div className="bg-white/5 rounded-xl p-5 space-y-4">
            <p className="text-white/80">
              Demonstrating financial returns is often key to securing approval for lighting upgrades.
              Understanding payback calculations helps you make compelling business cases.
            </p>

            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-elec-yellow font-semibold mb-3 flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Simple Payback Calculation
              </h3>
              <div className="bg-white/5 rounded p-4 mb-4">
                <p className="text-center text-lg text-elec-yellow font-mono mb-2">
                  Payback (years) = Total Project Cost / Annual Savings
                </p>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <h4 className="text-green-400 font-semibold mb-2">Worked Example: Office Lighting Upgrade</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-white/80">
                  <div>
                    <strong className="text-white">Existing System:</strong>
                    <ul className="mt-1 space-y-1">
                      <li>- 100 x 4ft twin T8 fluorescent (2 x 36W + ballast)</li>
                      <li>- Total load: 100 x 80W = 8,000W</li>
                      <li>- Operating hours: 2,500/year</li>
                      <li>- Annual consumption: 20,000 kWh</li>
                      <li>- Annual cost @ £0.30/kWh: £6,000</li>
                    </ul>
                  </div>
                  <div>
                    <strong className="text-white">Proposed LED System:</strong>
                    <ul className="mt-1 space-y-1">
                      <li>- 100 x LED panels (40W each)</li>
                      <li>- Total load: 100 x 40W = 4,000W</li>
                      <li>- Operating hours: 2,500/year</li>
                      <li>- Annual consumption: 10,000 kWh</li>
                      <li>- Annual cost @ £0.30/kWh: £3,000</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-green-500/30">
                  <div className="flex flex-wrap gap-4 justify-center text-center">
                    <div>
                      <p className="text-white/60 text-xs">Annual Savings</p>
                      <p className="text-green-400 font-bold text-xl">£3,000</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-xs">Project Cost</p>
                      <p className="text-white font-bold text-xl">£8,000</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-xs">Simple Payback</p>
                      <p className="text-elec-yellow font-bold text-xl">2.7 years</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-elec-yellow font-semibold mb-3 flex items-center gap-2">
                <PoundSterling className="w-5 h-5" />
                Additional Savings to Consider
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="text-sm text-white/80">
                  <strong className="text-white">Maintenance Savings</strong>
                  <ul className="mt-1 space-y-1">
                    <li>- Reduced lamp replacement frequency</li>
                    <li>- Lower labour costs for relamping</li>
                    <li>- Fewer call-outs for failures</li>
                    <li>- Typical saving: £500-2,000/year for 100 fittings</li>
                  </ul>
                </div>
                <div className="text-sm text-white/80">
                  <strong className="text-white">Control System Savings</strong>
                  <ul className="mt-1 space-y-1">
                    <li>- Occupancy sensing: 20-30% additional</li>
                    <li>- Daylight harvesting: 20-40% additional</li>
                    <li>- Time scheduling: 10-20% additional</li>
                    <li>- Combined controls: up to 50% additional</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
              <h4 className="text-elec-yellow font-semibold mb-2 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Lifecycle Cost Analysis
              </h4>
              <p className="text-white/80 text-sm">
                For a more complete picture, calculate Total Cost of Ownership (TCO) over 10-15 years, including:
                initial purchase and installation, energy costs, lamp/driver replacements, maintenance labour,
                and disposal costs. LED systems typically show 40-60% lower TCO despite higher initial cost.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: Installation Pitfalls */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Common Installation Pitfalls and Solutions
          </h2>

          <div className="bg-white/5 rounded-xl p-5 space-y-4">
            <p className="text-white/80">
              Learning from common mistakes helps ensure successful installations. Here are the most frequent
              issues encountered in LED and lighting control projects.
            </p>

            <div className="space-y-4">
              <div className="bg-white/5 rounded-lg p-4 border-l-4 border-red-500">
                <h4 className="text-red-400 font-semibold mb-2">Pitfall 1: Dimmer Compatibility Issues</h4>
                <p className="text-white/80 text-sm mb-2">
                  <strong>Problem:</strong> Flickering, buzzing, or limited dimming range when using existing dimmers with LED lamps.
                </p>
                <p className="text-green-400 text-sm">
                  <strong>Solution:</strong> Always verify dimmer compatibility. Replace leading-edge (TRIAC) dimmers with
                  trailing-edge or LED-specific dimmers. Check minimum load requirements and use compatible LED lamps.
                </p>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border-l-4 border-red-500">
                <h4 className="text-red-400 font-semibold mb-2">Pitfall 2: Thermal Management Failures</h4>
                <p className="text-white/80 text-sm mb-2">
                  <strong>Problem:</strong> Premature LED failure due to overheating in enclosed fittings or insulated ceilings.
                </p>
                <p className="text-green-400 text-sm">
                  <strong>Solution:</strong> Check LED temperature ratings. Use products rated for enclosed fixtures.
                  Ensure adequate ventilation. In IC-rated ceilings, use appropriate fire-rated housings with thermal cut-outs.
                </p>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border-l-4 border-red-500">
                <h4 className="text-red-400 font-semibold mb-2">Pitfall 3: Incorrect Colour Temperature Selection</h4>
                <p className="text-white/80 text-sm mb-2">
                  <strong>Problem:</strong> Mixed colour temperatures creating uneven appearance, or wrong colour for application.
                </p>
                <p className="text-green-400 text-sm">
                  <strong>Solution:</strong> Specify consistent colour temperature across the installation. Match existing
                  lighting where partial upgrades. Use 3000K for hospitality/residential feel, 4000K for offices, 5000K+ for industrial.
                </p>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border-l-4 border-red-500">
                <h4 className="text-red-400 font-semibold mb-2">Pitfall 4: Emergency Lighting Compatibility</h4>
                <p className="text-white/80 text-sm mb-2">
                  <strong>Problem:</strong> Existing emergency inverters/batteries incompatible with LED loads.
                </p>
                <p className="text-green-400 text-sm">
                  <strong>Solution:</strong> Verify emergency pack compatibility with LED drivers. Many older emergency
                  units sized for fluorescent loads are oversized for LEDs. Consider integral emergency LED luminaires or dedicated emergency fittings.
                </p>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border-l-4 border-red-500">
                <h4 className="text-red-400 font-semibold mb-2">Pitfall 5: Control System Commissioning Failures</h4>
                <p className="text-white/80 text-sm mb-2">
                  <strong>Problem:</strong> DALI systems not functioning correctly due to addressing errors or sensor placement.
                </p>
                <p className="text-green-400 text-sm">
                  <strong>Solution:</strong> Plan DALI addressing before installation. Commission systematically with proper software.
                  Position sensors to avoid false triggers (away from HVAC vents, direct sunlight). Document all settings.
                </p>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border-l-4 border-red-500">
                <h4 className="text-red-400 font-semibold mb-2">Pitfall 6: Over-Lighting Spaces</h4>
                <p className="text-white/80 text-sm mb-2">
                  <strong>Problem:</strong> Replacing like-for-like without considering LED's superior efficacy, resulting in excessive light levels.
                </p>
                <p className="text-green-400 text-sm">
                  <strong>Solution:</strong> Conduct proper lighting calculations for the space. A 36W LED panel often replaces
                  a 4x18W fluorescent fitting. Verify lux levels meet but do not vastly exceed requirements. Consider dimming to optimise levels.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="bg-gradient-to-r from-elec-yellow/20 to-yellow-600/20 rounded-xl p-6 border border-elec-yellow/30">
          <h3 className="text-xl font-bold text-elec-yellow mb-4 flex items-center gap-2">
            <Zap className="w-6 h-6" />
            Quick Reference Card
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-semibold mb-2">LED Lamp Equivalents</h4>
              <table className="w-full text-sm">
                <tbody className="text-white/80">
                  <tr className="border-b border-white/20">
                    <td className="py-1">40W incandescent</td>
                    <td className="text-right">= 5-6W LED</td>
                  </tr>
                  <tr className="border-b border-white/20">
                    <td className="py-1">60W incandescent</td>
                    <td className="text-right">= 8-10W LED</td>
                  </tr>
                  <tr className="border-b border-white/20">
                    <td className="py-1">100W incandescent</td>
                    <td className="text-right">= 12-15W LED</td>
                  </tr>
                  <tr className="border-b border-white/20">
                    <td className="py-1">50W halogen GU10</td>
                    <td className="text-right">= 5-7W LED</td>
                  </tr>
                  <tr className="border-b border-white/20">
                    <td className="py-1">58W T8 fluorescent</td>
                    <td className="text-right">= 22-25W LED tube</td>
                  </tr>
                  <tr>
                    <td className="py-1">4x18W T8 fitting</td>
                    <td className="text-right">= 36-40W LED panel</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-2">Key Colour Temperatures</h4>
              <table className="w-full text-sm">
                <tbody className="text-white/80">
                  <tr className="border-b border-white/20">
                    <td className="py-1">2700K</td>
                    <td className="text-right">Warm White (residential)</td>
                  </tr>
                  <tr className="border-b border-white/20">
                    <td className="py-1">3000K</td>
                    <td className="text-right">Warm White (hospitality)</td>
                  </tr>
                  <tr className="border-b border-white/20">
                    <td className="py-1">4000K</td>
                    <td className="text-right">Cool White (office)</td>
                  </tr>
                  <tr className="border-b border-white/20">
                    <td className="py-1">5000K</td>
                    <td className="text-right">Daylight (retail/industrial)</td>
                  </tr>
                  <tr>
                    <td className="py-1">6500K</td>
                    <td className="text-right">Cool Daylight (inspection)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-2">Part L Checklist</h4>
              <ul className="text-sm text-white/80 space-y-1">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-elec-yellow" />
                  60+ luminaire lm/circuit watt
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-elec-yellow" />
                  Occupancy sensing where appropriate
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-elec-yellow" />
                  Daylight linking in daylit spaces
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-elec-yellow" />
                  Local switching for areas over 100m2
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-elec-yellow" />
                  Commissioning records complete
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-2">DALI Quick Facts</h4>
              <ul className="text-sm text-white/80 space-y-1">
                <li className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-elec-yellow" />
                  Max 64 devices per DALI line
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-elec-yellow" />
                  16 groups, 16 scenes available
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-elec-yellow" />
                  Max cable length: 300m
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-elec-yellow" />
                  Two-wire, polarity independent
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-elec-yellow" />
                  Dimming range: 0.1% to 100%
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-elec-yellow" />
            Frequently Asked Questions
          </h2>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white/5 rounded-lg overflow-hidden"
              >
                <div className="p-4">
                  <h3 className="font-medium text-white mb-2">{faq.question}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz Section */}
        <section className="bg-white/5 rounded-xl p-6">
          <h2 className="text-xl font-bold text-elec-yellow mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6" />
            Section Knowledge Check
          </h2>
          <p className="text-white/80 mb-6">
            Test your understanding of LED technology and lighting controls with this 10-question quiz.
          </p>
          <Quiz
            questions={quizQuestions}
            onComplete={(score) => {
              console.log(`Quiz completed with score: ${score}/${quizQuestions.length}`);
            }}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-white/10">
          <Button
            variant="outline"
            asChild
            className="flex items-center justify-center gap-2 min-h-[44px] touch-manipulation active:scale-[0.98] border-white/20 text-white hover:bg-white/5 hover:text-elec-yellow"
          >
            <Link to="/study-centre/upskilling/energy-efficiency/module-3/section-5">
              <ArrowLeft className="w-5 h-5" />
              <span>Previous: Module 3</span>
            </Link>
          </Button>

          <Button
            asChild
            className="flex items-center justify-center gap-2 min-h-[44px] touch-manipulation active:scale-[0.98] bg-elec-yellow text-black hover:bg-yellow-500"
          >
            <Link to="../section-2">
              <span>Next: Section 2</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default EnergyEfficiencyModule4Section1;
