import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Thermometer,
  Wind,
  Shield,
  Droplets,
  AlertTriangle,
  Calculator,
  Fan,
  Snowflake,
  BookOpen,
  CheckCircle,
  Info,
  Zap,
} from 'lucide-react';

const IndustrialElectricalModule3Section4: React.FC = () => {
  const [showQuiz, setShowQuiz] = useState(false);

  useSEO({
    title: 'Panel Cooling and IP Ratings | Industrial Electrical Module 3 Section 4 | Elec-Mate',
    description:
      'Learn about IP ratings (IEC 60529), panel cooling methods, thermal calculations, and environmental considerations for industrial enclosures. Covers filter fans, air conditioning, heat exchangers, and ATEX requirements.',
    keywords:
      'IP ratings, IEC 60529, panel cooling, thermal management, filter fans, heat exchangers, ATEX zones, Rittal calculations, enclosure protection, industrial electrical',
    canonical: '/upskilling/industrial-electrical/module-3/section-4',
  });

  const quickCheckQuestions = [
    {
      id: 'qc-ip-rating',
      question: 'What does the second digit in an IP rating (e.g., IP65) indicate?',
      options: [
        'Protection against solid objects',
        'Protection against water ingress',
        'Operating temperature range',
        'Enclosure material strength',
      ],
      correctIndex: 1,
      explanation:
        'In IP ratings per IEC 60529, the first digit indicates protection against solid objects (0-6), while the second digit indicates protection against water ingress (0-9). IP65 means dust-tight (6) and protected against water jets (5).',
    },
    {
      id: 'qc-cooling-method',
      question:
        'When should forced air cooling with filter fans be avoided in favour of a closed-loop system?',
      options: [
        'When ambient temperature is below 20°C',
        'When the enclosure is small',
        'When the environment contains corrosive gases or conductive dust',
        'When power dissipation is under 100W',
      ],
      correctIndex: 2,
      explanation:
        'Filter fans draw ambient air into the enclosure. In environments with corrosive gases, conductive dust, or high contamination, a closed-loop cooling system (air-to-air heat exchanger or air conditioning) should be used to maintain internal air quality and prevent equipment damage.',
    },
    {
      id: 'qc-thermal-calc',
      question:
        'In thermal calculations for enclosures, what happens if the internal heat dissipation exceeds the natural cooling capacity?',
      options: [
        'The enclosure IP rating increases',
        'Internal temperature will rise above acceptable limits',
        'Components automatically reduce power consumption',
        'Condensation will form inside the enclosure',
      ],
      correctIndex: 1,
      explanation:
        'When heat dissipation from internal components exceeds the enclosure\'s natural ability to transfer heat to the environment (through convection and radiation), the internal temperature rises. If this exceeds component ratings (typically 35-40°C ambient for most electronics), active cooling must be installed.',
    },
  ];

  const quizQuestions = [
    {
      question: 'According to IEC 60529, what level of solid object protection does IP6X provide?',
      options: [
        'Protected against objects greater than 12.5mm',
        'Protected against objects greater than 1mm',
        'Dust-protected (limited ingress permitted)',
        'Dust-tight (no ingress permitted)',
      ],
      correctAnswer: 'Dust-tight (no ingress permitted)',
    },
    {
      question: 'What IP rating is typically required for outdoor electrical enclosures in the UK?',
      options: ['IP44', 'IP54', 'IP65 or IP66', 'IP69K'],
      correctAnswer: 'IP65 or IP66',
    },
    {
      question:
        'In Rittal thermal calculations, what is the typical heat transfer coefficient (k-value) for a painted steel enclosure?',
      options: [
        '2.5 W/m²K',
        '5.5 W/m²K',
        '10 W/m²K',
        '15 W/m²K',
      ],
      correctAnswer: '5.5 W/m²K',
    },
    {
      question: 'What is the primary advantage of an air-to-air heat exchanger over filter fans?',
      options: [
        'Lower initial cost',
        'Higher cooling capacity',
        'Maintains enclosure IP rating by keeping internal air separate',
        'Requires less maintenance',
      ],
      correctAnswer: 'Maintains enclosure IP rating by keeping internal air separate',
    },
    {
      question:
        'At what internal/ambient temperature differential does condensation risk become significant?',
      options: [
        'When internal temp is 2°C above ambient',
        'When internal temp is 5°C below ambient',
        'When internal temp drops below dew point of ambient air',
        'When ambient humidity exceeds 50%',
      ],
      correctAnswer: 'When internal temp drops below dew point of ambient air',
    },
    {
      question: 'What ATEX zone classification indicates an area where explosive atmosphere is likely during normal operation?',
      options: [
        'Zone 0 (gas) or Zone 20 (dust)',
        'Zone 1 (gas) or Zone 21 (dust)',
        'Zone 2 (gas) or Zone 22 (dust)',
        'All zones equally',
      ],
      correctAnswer: 'Zone 1 (gas) or Zone 21 (dust)',
    },
    {
      question: 'How often should filter mats in panel cooling fans typically be inspected in a standard industrial environment?',
      options: [
        'Weekly',
        'Monthly',
        'Quarterly (every 3 months)',
        'Annually',
      ],
      correctAnswer: 'Monthly',
    },
    {
      question:
        'What is the formula for calculating heat dissipation through an enclosure surface?',
      options: [
        'Q = k × A × ΔT',
        'Q = m × c × ΔT',
        'Q = V × I × t',
        'Q = P × η',
      ],
      correctAnswer: 'Q = k × A × ΔT',
    },
    {
      question:
        'When installing a cooling unit on an enclosure, where should it be positioned for optimal performance?',
      options: [
        'At the bottom of the enclosure',
        'At the top of the enclosure',
        'In the middle of the enclosure',
        'Position does not affect performance',
      ],
      correctAnswer: 'At the top of the enclosure',
    },
    {
      question:
        'What additional protection does IP69K provide beyond IP66?',
      options: [
        'Protection against explosive atmospheres',
        'Protection against high-pressure, high-temperature water jets',
        'Protection against electromagnetic interference',
        'Protection against mechanical impact',
      ],
      correctAnswer: 'Protection against high-pressure, high-temperature water jets',
    },
  ];

  const faqItems = [
    {
      question: 'Can I drill ventilation holes in an IP65 enclosure for better cooling?',
      answer:
        'Drilling holes in an IP65 enclosure will void its IP rating. If additional cooling is required, use properly rated filter fan assemblies (which maintain IP54/IP55) or switch to closed-loop cooling (heat exchangers or AC units) to maintain the original IP65 rating. Any modification must be documented and the new effective IP rating clearly marked on the enclosure.',
    },
    {
      question: 'How do I calculate the required cooling capacity for my panel?',
      answer:
        'Calculate total internal heat dissipation (sum of all component losses in Watts). Then calculate natural heat dissipation: Q = k × A × ΔT, where k is the heat transfer coefficient (typically 5.5 W/m²K for painted steel), A is effective surface area in m², and ΔT is the allowable temperature rise (usually internal max 35°C minus max ambient). If internal dissipation exceeds natural dissipation, the difference is your required cooling capacity. Add a 20-25% safety margin. Rittal and other manufacturers offer free online thermal calculation tools.',
    },
    {
      question: 'What maintenance do enclosure cooling systems require?',
      answer:
        'Filter fans: Monthly visual inspection of filter mats, replacement when visibly clogged or every 6-12 months depending on environment. Check fan operation and clean fan blades annually. Air conditioning units: Quarterly filter cleaning, annual refrigerant and condenser checks, verify condensate drainage. Heat exchangers: Monthly filter inspection, annual cleaning of heat exchange surfaces. All systems: Check seals and gaskets annually, verify thermostat operation, clean external surfaces to maintain heat dissipation.',
    },
    {
      question: 'When must I use ATEX-rated enclosures and cooling equipment?',
      answer:
        'ATEX-rated equipment is mandatory in classified hazardous areas where explosive atmospheres may occur. Zone 0/20: Explosive atmosphere continuously present - avoid electrical equipment if possible, use Ex ia (intrinsically safe). Zone 1/21: Explosive atmosphere likely during normal operation - use Ex d (flameproof), Ex e (increased safety), or Ex p (pressurised). Zone 2/22: Explosive atmosphere unlikely, only in abnormal conditions - Ex n (non-sparking) often acceptable. Always conduct a DSEAR risk assessment and consult with a competent person for zone classification.',
    },
    {
      question: 'How does UK climate affect enclosure thermal management?',
      answer:
        'UK climate presents unique challenges: High humidity (60-90% common) increases condensation risk - consider anti-condensation heaters for outdoor enclosures. Temperature range typically -10°C to +35°C ambient requires cooling systems rated for this range. Coastal locations need corrosion-resistant materials (316 stainless or GRP) and increased IP ratings. Scottish Highland installations may experience -20°C, requiring cold-start heaters. Summer solar gain on south-facing enclosures can add 200-400W/m² - use sun shields or increase cooling capacity by 30%.',
    },
    {
      question:
        'What is the difference between IP65 and IP66, and when does it matter?',
      answer:
        'IP65 protects against water jets from any direction (12.5 litres/min at 30kPa from 3m). IP66 protects against powerful water jets (100 litres/min at 100kPa from 3m). Practical difference: IP65 handles rain and general washdown, while IP66 handles high-pressure cleaning and severe weather exposure. Choose IP66 for: food/beverage plants with regular washdown, outdoor locations exposed to driving rain, marine environments, or anywhere high-pressure cleaning occurs near the enclosure. The cost difference is typically minimal (5-10%), so IP66 is often specified as standard for industrial applications.',
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <span className="text-sm text-muted-foreground">Module 3 &gt; Section 4</span>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-8">
        {/* Title */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-elec-yellow/10">
            <Shield className="w-8 h-8 text-elec-yellow" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Panel Cooling and IP Ratings</h1>
          <p className="text-muted-foreground">Understanding enclosure protection standards, thermal management systems, and environmental considerations for industrial installations</p>
        </div>

        {/* Section Overview */}
        <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="font-semibold text-foreground mb-2">Section Overview</h2>
              <p className="text-sm text-muted-foreground">
                This section covers the critical aspects of enclosure protection and thermal management for industrial electrical installations. You will learn about IP ratings per IEC 60529, cooling methods including natural convection, filter fans, heat exchangers and air conditioning, thermal calculation methods, and environmental considerations including ATEX requirements for hazardous areas.
              </p>
            </div>
          </div>
        </div>

        {/* Section 1: IP Rating System */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            IP Rating System Explained (IEC 60529)
          </h2>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 space-y-4">
            <p className="text-sm text-muted-foreground">
              The Ingress Protection (IP) rating system, defined by IEC 60529, provides a standardised
              method for classifying the degree of protection provided by electrical enclosures against
              solid objects and liquids. Understanding IP ratings is essential for selecting appropriate
              enclosures for different environments.
            </p>

            <div className="bg-background/50 rounded-lg p-4 border border-white/10">
              <h3 className="font-medium text-foreground mb-3">IP Rating Structure: IP [First Digit] [Second Digit]</h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-elec-yellow font-medium mb-2 text-sm">First Digit - Solid Object Protection</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li><span className="text-elec-yellow">0:</span> No protection</li>
                    <li><span className="text-elec-yellow">1:</span> Objects &gt;50mm (back of hand)</li>
                    <li><span className="text-elec-yellow">2:</span> Objects &gt;12.5mm (finger)</li>
                    <li><span className="text-elec-yellow">3:</span> Objects &gt;2.5mm (tools/wires)</li>
                    <li><span className="text-elec-yellow">4:</span> Objects &gt;1mm (fine wires)</li>
                    <li><span className="text-elec-yellow">5:</span> Dust-protected (limited ingress)</li>
                    <li><span className="text-elec-yellow">6:</span> Dust-tight (no ingress)</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-elec-yellow font-medium mb-2 text-sm">Second Digit - Water Protection</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li><span className="text-elec-yellow">0:</span> No protection</li>
                    <li><span className="text-elec-yellow">1:</span> Vertical dripping water</li>
                    <li><span className="text-elec-yellow">2:</span> Dripping water (15° tilt)</li>
                    <li><span className="text-elec-yellow">3:</span> Spraying water (60°)</li>
                    <li><span className="text-elec-yellow">4:</span> Splashing water (all directions)</li>
                    <li><span className="text-elec-yellow">5:</span> Water jets (12.5 L/min)</li>
                    <li><span className="text-elec-yellow">6:</span> Powerful jets (100 L/min)</li>
                    <li><span className="text-elec-yellow">7:</span> Temporary immersion (1m/30min)</li>
                    <li><span className="text-elec-yellow">8:</span> Continuous immersion</li>
                    <li><span className="text-elec-yellow">9K:</span> High-pressure/steam cleaning</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <Info className="text-elec-yellow mt-1 flex-shrink-0 w-4 h-4" />
                <div>
                  <h4 className="text-elec-yellow font-medium text-sm">Common Industrial IP Ratings</h4>
                  <ul className="text-sm mt-2 space-y-1 text-muted-foreground">
                    <li><strong className="text-foreground">IP54:</strong> Indoor industrial - protection against dust and splashing</li>
                    <li><strong className="text-foreground">IP55:</strong> Indoor with washdown - dust and low-pressure water jets</li>
                    <li><strong className="text-foreground">IP65:</strong> Outdoor general - dust-tight, water jets from any direction</li>
                    <li><strong className="text-foreground">IP66:</strong> Outdoor severe - dust-tight, powerful water jets</li>
                    <li><strong className="text-foreground">IP67:</strong> Temporary submersion - water treatment, flood-prone areas</li>
                    <li><strong className="text-foreground">IP69K:</strong> High-pressure washdown - food processing, pharmaceutical</li>
                  </ul>
                </div>
              </div>
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

        {/* Section 2: Natural vs Forced Cooling */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Natural Convection vs Forced Cooling
          </h2>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 space-y-4">
            <p className="text-sm text-muted-foreground">
              Selecting the appropriate cooling method depends on heat load, ambient conditions, enclosure
              size, and environmental factors. Understanding the principles of each method ensures optimal
              thermal management.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-background/50 rounded-lg p-4 border border-white/10">
                <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
                  <Thermometer size={18} className="text-orange-400" />
                  Natural Convection
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle size={14} className="text-green-400 mt-1 flex-shrink-0" />
                    <span>No moving parts - zero maintenance, silent operation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={14} className="text-green-400 mt-1 flex-shrink-0" />
                    <span>Maintains full IP rating of enclosure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={14} className="text-green-400 mt-1 flex-shrink-0" />
                    <span>No power consumption for cooling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle size={14} className="text-amber-400 mt-1 flex-shrink-0" />
                    <span>Limited capacity - typically 5-15W per m² surface</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle size={14} className="text-amber-400 mt-1 flex-shrink-0" />
                    <span>Requires adequate clearance around enclosure</span>
                  </li>
                </ul>
                <p className="mt-3 text-xs text-muted-foreground">
                  Best for: Low heat loads (&lt;200W), clean environments, critical reliability applications
                </p>
              </div>

              <div className="bg-background/50 rounded-lg p-4 border border-white/10">
                <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
                  <Fan size={18} className="text-blue-400" />
                  Forced Air Cooling
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle size={14} className="text-green-400 mt-1 flex-shrink-0" />
                    <span>5-10x greater cooling capacity than natural convection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={14} className="text-green-400 mt-1 flex-shrink-0" />
                    <span>Lower cost than closed-loop systems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={14} className="text-green-400 mt-1 flex-shrink-0" />
                    <span>Even temperature distribution inside enclosure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle size={14} className="text-amber-400 mt-1 flex-shrink-0" />
                    <span>Reduces IP rating (typically to IP54/IP55)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle size={14} className="text-amber-400 mt-1 flex-shrink-0" />
                    <span>Requires regular filter maintenance</span>
                  </li>
                </ul>
                <p className="mt-3 text-xs text-muted-foreground">
                  Best for: Medium heat loads, clean/dry indoor environments, cost-sensitive installations
                </p>
              </div>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="text-amber-400 mt-1 flex-shrink-0 w-4 h-4" />
                <div>
                  <h4 className="text-amber-400 font-medium text-sm">Critical Decision Factors</h4>
                  <p className="text-sm mt-1 text-muted-foreground">
                    Always choose closed-loop cooling (heat exchangers or AC) when: ambient temperature may
                    exceed internal target temperature, environment contains oil mist/conductive dust/corrosive
                    gases, high IP rating must be maintained, or reliability is critical (fans are common
                    failure points).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Filter Fans and AC Units */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Filter Fans and Air Conditioning Units
          </h2>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 space-y-4">
            <div className="bg-background/50 rounded-lg p-4 border border-white/10">
              <h3 className="font-medium text-foreground mb-3">Filter Fan Systems</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Filter fans provide economical forced-air cooling by drawing ambient air through a filter
                mat into the enclosure. Warm air exits through outlet grilles positioned at the top.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-elec-yellow text-sm font-medium mb-2">Installation Guidelines</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>- Mount inlet fan low on enclosure side</li>
                    <li>- Position outlet grille at top (opposite side ideal)</li>
                    <li>- Ensure outlet area ≥ inlet area</li>
                    <li>- Maintain 100mm clearance from walls</li>
                    <li>- Use fingersafe grilles (IP20) on outlet</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-elec-yellow text-sm font-medium mb-2">Filter Maintenance</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>- Monthly visual inspection</li>
                    <li>- Replace when ΔP exceeds 50% of clean value</li>
                    <li>- Keep spare filters on site</li>
                    <li>- Document replacement dates</li>
                    <li>- Consider filter monitoring contacts</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-background/50 rounded-lg p-4 border border-white/10">
              <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
                <Snowflake size={18} className="text-cyan-400" />
                Enclosure Air Conditioning
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                When ambient temperature approaches or exceeds the required internal temperature, or when
                the environment is contaminated, enclosure-mounted air conditioning provides active cooling
                in a closed loop.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-xs font-bold flex-shrink-0">1</span>
                  <div>
                    <h4 className="text-foreground text-sm font-medium">Wall-Mounted Units</h4>
                    <p className="text-sm text-muted-foreground">
                      Mount directly on enclosure side panel. Capacity range 300W - 4kW. Requires cutout
                      and adequate external clearance for condenser airflow.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-xs font-bold flex-shrink-0">2</span>
                  <div>
                    <h4 className="text-foreground text-sm font-medium">Roof-Mounted Units</h4>
                    <p className="text-sm text-muted-foreground">
                      Saves floor space, good air distribution. Ensure enclosure roof can support weight
                      (40-80kg typical). Protect condensate drain from freezing.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-xs font-bold flex-shrink-0">3</span>
                  <div>
                    <h4 className="text-foreground text-sm font-medium">Key Specifications</h4>
                    <p className="text-sm text-muted-foreground">
                      L35/L35 rating (35°C ambient/35°C internal) is standard. Specify cooling capacity at
                      your actual ambient temperature - capacity decreases at higher ambients. Verify
                      refrigerant type complies with current F-Gas regulations.
                    </p>
                  </div>
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

        {/* Section 4: Heat Exchanger Systems */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Heat Exchanger Systems
          </h2>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 space-y-4">
            <p className="text-sm text-muted-foreground">
              Heat exchangers provide closed-loop cooling without reducing the enclosure's IP rating. They
              transfer heat from internal air to external air (or water) without mixing the two air streams.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-background/50 rounded-lg p-4 border border-white/10">
                <h3 className="font-medium text-foreground mb-3">Air-to-Air Heat Exchangers</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle size={14} className="text-green-400 mt-1 flex-shrink-0" />
                    <span>Maintains full IP rating (IP55/IP66)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={14} className="text-green-400 mt-1 flex-shrink-0" />
                    <span>No refrigerant - lower maintenance than AC</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={14} className="text-green-400 mt-1 flex-shrink-0" />
                    <span>Works in contaminated environments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle size={14} className="text-amber-400 mt-1 flex-shrink-0" />
                    <span>Cannot cool below ambient temperature</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle size={14} className="text-amber-400 mt-1 flex-shrink-0" />
                    <span>Requires ΔT of 10-15°C for effective operation</span>
                  </li>
                </ul>
                <p className="mt-3 text-xs text-muted-foreground">
                  Capacity range: 20W/K to 200W/K (at specified ΔT)
                </p>
              </div>

              <div className="bg-background/50 rounded-lg p-4 border border-white/10">
                <h3 className="font-medium text-foreground mb-3">Air-to-Water Heat Exchangers</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle size={14} className="text-green-400 mt-1 flex-shrink-0" />
                    <span>Very high cooling capacity possible</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={14} className="text-green-400 mt-1 flex-shrink-0" />
                    <span>Can cool below ambient with chilled water</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={14} className="text-green-400 mt-1 flex-shrink-0" />
                    <span>Central chiller serves multiple enclosures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle size={14} className="text-amber-400 mt-1 flex-shrink-0" />
                    <span>Requires pipework installation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle size={14} className="text-amber-400 mt-1 flex-shrink-0" />
                    <span>Leak risk near electrical equipment</span>
                  </li>
                </ul>
                <p className="mt-3 text-xs text-muted-foreground">
                  Typical water: 6-12°C supply, 12-18°C return for process cooling
                </p>
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <h4 className="text-green-400 font-medium mb-2 text-sm">Selection Guide: When to Use Heat Exchangers</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>- Environment too contaminated for filter fans but ambient is cool enough</li>
                <li>- IP rating must be maintained but AC is not justified</li>
                <li>- Very high reliability required (no refrigerant system to fail)</li>
                <li>- Building has existing chilled water supply</li>
                <li>- ATEX Zone 2/22 where non-sparking equipment is preferred</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 5: Thermal Calculation Methods */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Thermal Calculation Methods
          </h2>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 space-y-4">
            <p className="text-sm text-muted-foreground">
              Proper thermal calculations ensure enclosure temperature remains within component operating
              limits. The Rittal method is widely used and forms the basis for most manufacturer tools.
            </p>

            <div className="bg-background/50 rounded-lg p-4 border border-white/10">
              <h3 className="font-medium text-foreground mb-3">Basic Thermal Balance Equation</h3>
              <div className="bg-background/70 p-4 rounded font-mono text-sm mb-4 border border-white/5">
                <p className="text-elec-yellow">Q<sub>dissipated</sub> = k × A × ΔT</p>
                <p className="mt-2 text-muted-foreground">Where:</p>
                <ul className="text-muted-foreground ml-4 mt-1">
                  <li>Q = Heat dissipation capacity (Watts)</li>
                  <li>k = Heat transfer coefficient (W/m²K)</li>
                  <li>A = Effective enclosure surface area (m²)</li>
                  <li>ΔT = Temperature difference internal - ambient (K or °C)</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-3 gap-3 text-sm">
                <div className="bg-background/70 p-3 rounded border border-white/5">
                  <h4 className="text-elec-yellow font-medium">Painted Steel</h4>
                  <p className="text-2xl font-bold text-foreground">5.5 W/m²K</p>
                  <p className="text-muted-foreground text-xs">Standard enclosures</p>
                </div>
                <div className="bg-background/70 p-3 rounded border border-white/5">
                  <h4 className="text-elec-yellow font-medium">Stainless Steel</h4>
                  <p className="text-2xl font-bold text-foreground">5.0 W/m²K</p>
                  <p className="text-muted-foreground text-xs">Unpainted/polished</p>
                </div>
                <div className="bg-background/70 p-3 rounded border border-white/5">
                  <h4 className="text-elec-yellow font-medium">GRP/Plastic</h4>
                  <p className="text-2xl font-bold text-foreground">3.5 W/m²K</p>
                  <p className="text-muted-foreground text-xs">Insulating materials</p>
                </div>
              </div>
            </div>

            <div className="bg-background/50 rounded-lg p-4 border border-white/10">
              <h3 className="font-medium text-foreground mb-3">Step-by-Step Calculation Example</h3>

              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow text-background flex items-center justify-center flex-shrink-0 font-bold text-sm">1</span>
                  <div>
                    <p className="font-medium text-foreground">Sum Internal Heat Losses</p>
                    <p className="text-muted-foreground">VFD (150W) + PLC (25W) + PSU (45W) + Contactors (30W) = <span className="text-elec-yellow">250W total</span></p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow text-background flex items-center justify-center flex-shrink-0 font-bold text-sm">2</span>
                  <div>
                    <p className="font-medium text-foreground">Calculate Effective Surface Area</p>
                    <p className="text-muted-foreground">Enclosure 600×600×1200mm. Only 3 sides + top exposed.</p>
                    <p className="text-muted-foreground">A = (0.6×1.2)×2 + (0.6×0.6) + (0.6×0.6) = <span className="text-elec-yellow">2.16m²</span></p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow text-background flex items-center justify-center flex-shrink-0 font-bold text-sm">3</span>
                  <div>
                    <p className="font-medium text-foreground">Determine Allowable ΔT</p>
                    <p className="text-muted-foreground">Max internal: 35°C, Max ambient: 30°C → ΔT = <span className="text-elec-yellow">5K</span></p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow text-background flex items-center justify-center flex-shrink-0 font-bold text-sm">4</span>
                  <div>
                    <p className="font-medium text-foreground">Calculate Natural Dissipation Capacity</p>
                    <p className="text-muted-foreground">Q = 5.5 × 2.16 × 5 = <span className="text-elec-yellow">59.4W</span></p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow text-background flex items-center justify-center flex-shrink-0 font-bold text-sm">5</span>
                  <div>
                    <p className="font-medium text-foreground">Determine Cooling Requirement</p>
                    <p className="text-muted-foreground">Required: 250W - 59.4W = <span className="text-red-400">190.6W additional cooling needed</span></p>
                    <p className="text-muted-foreground">With 25% safety margin: <span className="text-elec-yellow">238W cooling capacity</span></p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <Info className="text-elec-yellow mt-1 flex-shrink-0 w-4 h-4" />
                <div>
                  <h4 className="text-elec-yellow font-medium text-sm">Online Calculation Tools</h4>
                  <p className="text-sm mt-1 text-muted-foreground">
                    Rittal Therm software (free download) provides detailed calculations including solar
                    load, altitude correction, and component thermal derating. Schneider Electric, ABB, and
                    Phoenix Contact offer similar online tools. Always verify calculations with manufacturer
                    data for critical applications.
                  </p>
                </div>
              </div>
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

        {/* Section 6: Environmental Considerations */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Environmental Considerations
          </h2>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 space-y-4">
            <div className="bg-background/50 rounded-lg p-4 border border-white/10">
              <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
                <AlertTriangle className="text-orange-400 w-4 h-4" />
                ATEX and Hazardous Area Requirements
              </h3>

              <p className="text-sm text-muted-foreground mb-3">
                ATEX Directive 2014/34/EU and DSEAR regulations require special equipment in areas where
                explosive atmospheres may occur. Enclosures must be certified for the specific zone.
              </p>

              <div className="grid md:grid-cols-3 gap-3 text-sm">
                <div className="bg-red-500/10 border border-red-500/30 rounded p-3">
                  <h4 className="text-red-400 font-medium">Zone 0/20</h4>
                  <p className="text-xs text-muted-foreground mb-2">Explosive atmosphere continuously/frequently</p>
                  <p className="text-foreground">Ex ia (intrinsic safety)</p>
                  <p className="text-xs text-muted-foreground">Avoid electrical equipment if possible</p>
                </div>
                <div className="bg-orange-500/10 border border-orange-500/30 rounded p-3">
                  <h4 className="text-orange-400 font-medium">Zone 1/21</h4>
                  <p className="text-xs text-muted-foreground mb-2">Likely during normal operation</p>
                  <p className="text-foreground">Ex d, Ex e, Ex p</p>
                  <p className="text-xs text-muted-foreground">Flameproof, increased safety, pressurised</p>
                </div>
                <div className="bg-amber-500/10 border border-amber-500/30 rounded p-3">
                  <h4 className="text-amber-400 font-medium">Zone 2/22</h4>
                  <p className="text-xs text-muted-foreground mb-2">Unlikely, only in abnormal conditions</p>
                  <p className="text-foreground">Ex n, Ex ec</p>
                  <p className="text-xs text-muted-foreground">Non-sparking, some standard equipment</p>
                </div>
              </div>

              <p className="mt-3 text-sm text-amber-400">
                ATEX-rated cooling equipment is available but expensive. Locate enclosures outside
                hazardous zones where possible, or use pressurisation (Ex p) with clean air supply.
              </p>
            </div>

            <div className="bg-background/50 rounded-lg p-4 border border-white/10">
              <h3 className="font-medium text-foreground mb-3">Corrosive and Aggressive Environments</h3>

              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="text-elec-yellow font-medium mb-2">Chemical/Process Industries</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>- GRP (fibreglass) or 316L stainless enclosures</li>
                    <li>- Closed-loop cooling only (no filter fans)</li>
                    <li>- Positive pressure to prevent ingress</li>
                    <li>- Corrosion-resistant cooling units</li>
                    <li>- Specify chemical compatibility</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-elec-yellow font-medium mb-2">Coastal/Marine Environments</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>- 316 stainless steel (not 304)</li>
                    <li>- IP66 minimum, IP67 preferred</li>
                    <li>- Salt-rated cooling equipment</li>
                    <li>- Protective coatings on all surfaces</li>
                    <li>- Anti-condensation heaters essential</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-background/50 rounded-lg p-4 border border-white/10">
              <h3 className="font-medium text-foreground mb-3">UK Climate-Specific Considerations</h3>

              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <Droplets className="text-blue-400 flex-shrink-0 w-4 h-4 mt-0.5" />
                  <div>
                    <h4 className="text-foreground font-medium">Condensation Management</h4>
                    <p className="text-muted-foreground">
                      UK humidity typically 70-90%. Install anti-condensation heaters (50-100W) with
                      hygrostat control set at 70% RH. Essential for outdoor enclosures and those subject
                      to temperature cycling.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Thermometer className="text-orange-400 flex-shrink-0 w-4 h-4 mt-0.5" />
                  <div>
                    <h4 className="text-foreground font-medium">Temperature Extremes</h4>
                    <p className="text-muted-foreground">
                      Design for -10°C to +35°C ambient (extend to -20°C for Scottish Highlands/exposed
                      locations). Consider cold-start heating for VFDs and displays. Summer solar gain on
                      south-facing panels: add 200-400 W/m² to heat load or use sun shields.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Wind className="text-gray-400 flex-shrink-0 w-4 h-4 mt-0.5" />
                  <div>
                    <h4 className="text-foreground font-medium">Exposed Locations</h4>
                    <p className="text-muted-foreground">
                      Wind-driven rain requires IP66 minimum. Consider double-door construction for cable
                      entry protection. Mounting should withstand wind loading to BS EN 1991-1-4 (typically
                      1.2 kN/m² in exposed UK locations).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-elec-yellow" />
            Quick Reference Card
          </h2>

          <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-background/50 rounded-lg p-4 border border-white/10">
                <h3 className="font-medium text-foreground mb-3">IP Rating Quick Guide</h3>
                <table className="w-full text-sm">
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-white/10">
                      <td className="py-1 text-elec-yellow font-medium">IP54</td>
                      <td className="py-1">Indoor industrial, dust/splash</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-1 text-elec-yellow font-medium">IP55</td>
                      <td className="py-1">Indoor washdown areas</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-1 text-elec-yellow font-medium">IP65</td>
                      <td className="py-1">Outdoor general purpose</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-1 text-elec-yellow font-medium">IP66</td>
                      <td className="py-1">Outdoor severe/washdown</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-1 text-elec-yellow font-medium">IP67</td>
                      <td className="py-1">Temporary submersion</td>
                    </tr>
                    <tr>
                      <td className="py-1 text-elec-yellow font-medium">IP69K</td>
                      <td className="py-1">High-pressure steam clean</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-background/50 rounded-lg p-4 border border-white/10">
                <h3 className="font-medium text-foreground mb-3">Cooling Selection Matrix</h3>
                <table className="w-full text-sm">
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-white/10">
                      <td className="py-1 text-elec-yellow font-medium">Natural</td>
                      <td className="py-1">&lt;200W, clean, critical</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-1 text-elec-yellow font-medium">Filter Fan</td>
                      <td className="py-1">200-1000W, clean indoor</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-1 text-elec-yellow font-medium">Heat Exch.</td>
                      <td className="py-1">Dirty env, IP required</td>
                    </tr>
                    <tr>
                      <td className="py-1 text-elec-yellow font-medium">AC Unit</td>
                      <td className="py-1">Amb ≥ internal temp</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-background/50 rounded-lg p-4 border border-white/10">
                <h3 className="font-medium text-foreground mb-3">Thermal Formula</h3>
                <div className="font-mono text-elec-yellow mb-2">Q = k × A × ΔT</div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Steel k = 5.5 W/m²K</li>
                  <li>Stainless k = 5.0 W/m²K</li>
                  <li>GRP k = 3.5 W/m²K</li>
                  <li>Add 25% safety margin</li>
                </ul>
              </div>

              <div className="bg-background/50 rounded-lg p-4 border border-white/10">
                <h3 className="font-medium text-foreground mb-3">Maintenance Schedule</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li><span className="text-elec-yellow">Monthly:</span> Filter inspection</li>
                  <li><span className="text-elec-yellow">Quarterly:</span> AC filter clean</li>
                  <li><span className="text-elec-yellow">6-Monthly:</span> Filter replacement</li>
                  <li><span className="text-elec-yellow">Annually:</span> Full system check</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section - Static bordered list */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqItems.map((faq, index) => (
              <div key={index} className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
                <h3 className="font-medium text-foreground mb-2">{faq.question}</h3>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Section Quiz</h2>
          <p className="text-sm text-muted-foreground">
            Test your knowledge of panel cooling and IP ratings. You need 70% to pass.
          </p>
          <Button
            onClick={() => setShowQuiz(!showQuiz)}
            className="bg-elec-yellow text-background hover:bg-elec-yellow/90"
          >
            {showQuiz ? 'Hide Quiz' : 'Start Quiz'}
          </Button>
          {showQuiz && (
            <div className="mt-4">
              <Quiz questions={quizQuestions} />
            </div>
          )}
        </section>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-white/10">
          <Button
            variant="outline"
            className="border-white/20 hover:bg-white/5"
            asChild
          >
            <Link to="/study-centre/upskilling/industrial-electrical/module-3/section-3">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous: Cable Termination
            </Link>
          </Button>
          <Button
            className="bg-elec-yellow text-background hover:bg-elec-yellow/90"
            asChild
          >
            <Link to="/study-centre/upskilling/industrial-electrical/module-3/section-5">
              Next: Functional Testing
              <ChevronRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IndustrialElectricalModule3Section4;
