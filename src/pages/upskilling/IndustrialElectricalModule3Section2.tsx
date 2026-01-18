import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';
import { Button } from '@/components/ui/button';
import Quiz from '@/components/apprentice-courses/Quiz';
import InlineCheck from '@/components/apprentice-courses/InlineCheck';
import {
  ArrowLeft,
  Ruler,
  Thermometer,
  Shield,
  Wrench,
  BookOpen,
  AlertTriangle,
  CheckCircle,
  Info,
  Layers,
  ArrowUpDown,
  Square,
  Settings,
} from 'lucide-react';

const IndustrialElectricalModule3Section2: React.FC = () => {
  const [showQuiz, setShowQuiz] = useState(false);

  useSEO({
    title: 'Component Mounting and DIN Rail Organisation | Industrial Electrical Module 3',
    description:
      'Learn professional DIN rail mounting techniques, EN 60715 standards, component spacing requirements, and industrial installation best practices for electrical enclosures.',
    keywords: [
      'DIN rail mounting',
      'EN 60715',
      'TS35 rail',
      'component spacing',
      'industrial electrical',
      'enclosure organisation',
      'thermal management',
      'professional installation',
    ],
  });

  const quickCheckQuestions = [
    {
      id: 'qc1-din-rail-type',
      question:
        'Which DIN rail type is specified by EN 60715 as the standard 35mm top-hat profile commonly used for MCBs and contactors?',
      options: ['G-type (G32)', 'TS32 symmetrical', 'TS35 (TH35-7.5)', 'C-type (C30)'],
      correctIndex: 2,
      explanation:
        'TS35 (TH35-7.5) is the EN 60715 standard 35mm top-hat profile rail. The 7.5mm refers to the depth, and this profile is universally used for modern circuit breakers, contactors, and most DIN rail mounted devices.',
    },
    {
      id: 'qc2-spacing-requirement',
      question:
        'When mounting variable speed drives (VSDs) in an enclosure, what is the typical minimum spacing requirement above and below for adequate cooling?',
      options: [
        '25mm above, 25mm below',
        '50mm above, 25mm below',
        '100mm above, 50mm below',
        'No spacing required with forced ventilation',
      ],
      correctIndex: 2,
      explanation:
        'VSDs generate significant heat and require substantial clearance. The typical requirement is 100mm above (for hot air to rise) and 50mm below (for cool air intake). Always verify with manufacturer specifications as some high-power units require even greater clearances.',
    },
    {
      id: 'qc3-mounting-orientation',
      question:
        'According to IEC standards, what derating factor typically applies when mounting thermal magnetic circuit breakers horizontally instead of vertically?',
      options: [
        'No derating required',
        '10% derating (multiply by 0.9)',
        '20% derating (multiply by 0.8)',
        '35% derating (multiply by 0.65)',
      ],
      correctIndex: 2,
      explanation:
        'Horizontal mounting typically requires a 20% derating (0.8 factor) for thermal magnetic devices. This is because the thermal element relies on convective cooling which is optimised for vertical mounting. The bimetallic strip operates differently when oriented horizontally.',
    },
  ];

  const quizQuestions = [
    {
      question:
        'What is the standard depth dimension for a TS35-7.5 DIN rail as per EN 60715?',
      options: ['5.5mm', '7.5mm', '15mm', '35mm'],
      correctAnswer: '7.5mm',
    },
    {
      question:
        'When installing DIN rail in an enclosure, what is the recommended distance from the rail to the enclosure side wall?',
      options: [
        'Minimum 10mm',
        'Minimum 25mm',
        'Minimum 50mm',
        'No minimum requirement',
      ],
      correctAnswer: 'Minimum 25mm',
    },
    {
      question:
        'Which accessory must be fitted at both ends of a DIN rail to prevent components from sliding off during vibration?',
      options: ['Rail couplers', 'End stops/end brackets', 'Mounting clips', 'Terminal markers'],
      correctAnswer: 'End stops/end brackets',
    },
    {
      question:
        'For components weighing more than 500g, what additional mounting requirement applies per EN 60439-1?',
      options: [
        'Use of thicker DIN rail only',
        'Additional mechanical fixing independent of DIN rail clip',
        'Double DIN rail arrangement',
        'Horizontal mounting only',
      ],
      correctAnswer: 'Additional mechanical fixing independent of DIN rail clip',
    },
    {
      question:
        'What is the purpose of using slotted DIN rail mounting holes in enclosures?',
      options: [
        'To reduce material cost',
        'To allow for thermal expansion and alignment adjustment',
        'To increase ventilation',
        'To reduce enclosure weight',
      ],
      correctAnswer: 'To allow for thermal expansion and alignment adjustment',
    },
    {
      question:
        'When mounting PLCs adjacent to contactors, what minimum separation is typically required to prevent electromagnetic interference?',
      options: ['No separation needed', '25mm', '50mm', '100mm'],
      correctAnswer: '50mm',
    },
    {
      question:
        'What material thickness is specified for standard TS35 DIN rail to support industrial component loading?',
      options: ['0.5mm', '1.0mm', '1.5mm', '2.0mm'],
      correctAnswer: '1.0mm',
    },
    {
      question:
        'According to AS/NZS 3439.1, what is the maximum ambient temperature assumption for standard equipment ratings in enclosures?',
      options: ['25 degrees C', '35 degrees C', '40 degrees C', '55 degrees C'],
      correctAnswer: '40 degrees C',
    },
    {
      question:
        'When cutting DIN rail, what tool provides the cleanest cut while maintaining rail profile integrity?',
      options: [
        'Angle grinder with cutting disc',
        'Hacksaw',
        'Purpose-designed DIN rail cutter',
        'Tin snips',
      ],
      correctAnswer: 'Purpose-designed DIN rail cutter',
    },
    {
      question:
        'What is the standard centre-to-centre spacing for multiple DIN rails mounted vertically in an enclosure?',
      options: ['100mm', '125mm', '150mm', '200mm'],
      correctAnswer: '150mm',
    },
  ];

  const faqItems = [
    {
      question: 'Can I mix different DIN rail types in the same enclosure?',
      answer:
        'Yes, mixing rail types is acceptable when different component requirements exist. For example, you might use TS35 for circuit breakers and control devices while using G-type rail for specific terminal blocks or older equipment. Ensure each component is mounted on its compatible rail type and maintain proper spacing between different rail sections. Document the rail types used in the panel documentation for future maintenance reference.',
    },
    {
      question: 'How do I calculate the thermal derating for densely packed enclosures?',
      answer:
        'Start with the manufacturer\'s derating curves for ambient temperature. For every 10 degrees C above 30 degrees C internal enclosure temperature, apply approximately 5-10% additional derating. Factor in mounting position (horizontal mounting adds 20% derating), adjacent heat sources, and air circulation. Use thermal imaging during commissioning to verify actual temperatures. Many manufacturers provide software tools for precise calculations, and AS/NZS 3000 Appendix C provides guidance for Australian installations.',
    },
    {
      question:
        'What is the correct procedure for mounting heavy components like large contactors?',
      answer:
        'For components exceeding 500g: First, mount the DIN rail with reduced fixing centres (200mm instead of 300mm). Install the component on the rail, then add a supplementary mounting bracket that fixes directly to the enclosure backplate, independent of the DIN rail clip. Use the mounting holes provided on larger contactors for this purpose. In high-vibration environments, consider dedicated mounting plates for components over 1kg. Always verify the combined weight doesn\'t exceed the rail\'s load capacity.',
    },
    {
      question: 'How should I organise components for optimal cable routing?',
      answer:
        'Follow the "power flows down, signals flow across" principle. Mount incoming supply components at the top, main switching devices in the upper-middle section, distribution components (MCBs, RCDs) in the middle, and terminal blocks at the bottom. Keep power and control/signal wiring separated by at least 50mm or use segregated cable ducting. Position PLCs and sensitive electronics away from contactors and VSDs. Allow for 1.5x the installed cable volume in ducting for future modifications.',
    },
    {
      question:
        'What are the requirements for DIN rail earthing in industrial installations?',
      answer:
        'DIN rails must be earthed as part of the enclosure protective earthing system per AS/NZS 3000. Use dedicated DIN rail earth terminal blocks with direct metal-to-rail contact (not through paint). For painted rails, use serrated washers or dedicated earthing clips that penetrate the coating. The earth connection should be made at one end of each rail run, with a minimum 4mm squared conductor to the main earth bar. Verify continuity (less than 0.1 ohm) between the rail and main earth during testing.',
    },
    {
      question: 'How do I plan for future expansion when mounting components?',
      answer:
        'Reserve 20-25% spare capacity on each DIN rail for future additions. Leave blank spaces adjacent to PLCs for I/O expansion modules. Install spare cable ducts or allow space for additional runs. Use terminal blocks with spare positions (typically 10-20% extra). Document the maximum capacity of each rail and current loading in panel documentation. Consider modular enclosure systems that allow for physical expansion. Install spare circuit breaker positions with blanking plates.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <span className="text-sm text-muted-foreground">Module 3 &gt; Section 2</span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 space-y-8">
        {/* Title Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-elec-yellow/10">
            <Layers className="w-8 h-8 text-elec-yellow" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Component Mounting and DIN Rail Organisation</h1>
          <p className="text-muted-foreground">
            Professional component mounting techniques, EN 60715 standards, and industrial installation best practices
          </p>
        </div>

        {/* Section Overview */}
        <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="font-semibold text-foreground mb-2">Section Overview</h2>
              <p className="text-sm text-muted-foreground">
                Professional component mounting is fundamental to reliable industrial
                electrical installations. This section covers EN 60715 DIN rail
                standards, manufacturer spacing requirements, thermal management through
                proper component orientation, and the workmanship standards expected in
                commercial and industrial environments. Mastering these techniques
                ensures installations that are safe, maintainable, and compliant with
                UK standards.
              </p>
            </div>
          </div>
        </div>

        {/* Section 1: DIN Rail Types and Selection */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            DIN Rail Types and Selection
          </h2>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 space-y-4">
            <p className="text-sm text-muted-foreground">
              DIN rails provide the standardised mounting system for industrial
              electrical components. EN 60715 (IEC 60715) defines the specifications
              that ensure component interchangeability across manufacturers.
            </p>

            <div className="bg-background/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Ruler className="w-5 h-5 text-elec-yellow" />
                <h3 className="font-medium text-foreground">Standard DIN Rail Profiles</h3>
              </div>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="border-l-2 border-elec-yellow pl-4">
                  <h4 className="font-medium text-foreground">TS35 (TH35-7.5) - Top Hat 35mm</h4>
                  <p className="mt-1">
                    The industry standard for modern installations. 35mm wide with 7.5mm
                    depth. Used for MCBs, RCDs, contactors, timers, relays, PLCs, and
                    most industrial components. Available in steel (1.0mm thickness) or
                    aluminium for weight-sensitive applications.
                  </p>
                </div>
                <div className="border-l-2 border-blue-400 pl-4">
                  <h4 className="font-medium text-foreground">TS32 (TH35-15) - Deep Top Hat</h4>
                  <p className="mt-1">
                    35mm wide with 15mm depth. Used for heavier components requiring
                    additional mounting stability or specific terminal blocks. Less
                    common but essential for certain legacy equipment and high-current
                    terminals.
                  </p>
                </div>
                <div className="border-l-2 border-green-400 pl-4">
                  <h4 className="font-medium text-foreground">G-Type (G32) - G-Profile</h4>
                  <p className="mt-1">
                    32mm wide with a distinctive G-shaped cross-section. Primarily used
                    for specific terminal block ranges, particularly larger power
                    terminals and some European equipment. Provides excellent mechanical
                    grip for high-vibration environments.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-orange-300">Selection Criteria</h4>
                  <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                    <li>- Check component datasheet for compatible rail type before ordering</li>
                    <li>- Steel rails (1.0mm) for loads up to 10kg/metre standard installations</li>
                    <li>- Consider perforated rail for improved earthing contact and heat dissipation</li>
                    <li>- Marine/corrosive environments require stainless steel or hot-dip galvanised</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Component Spacing Requirements */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Component Spacing Requirements
          </h2>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 space-y-4">
            <p className="text-sm text-muted-foreground">
              Proper spacing ensures adequate cooling, prevents electromagnetic
              interference, allows for maintenance access, and meets manufacturer
              warranty requirements. These spacings are not suggestions - they are
              engineering requirements.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-background/50 rounded-lg p-4">
                <h3 className="font-medium text-elec-yellow mb-3">Variable Speed Drives (VSDs)</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <ArrowUpDown className="w-4 h-4 text-elec-yellow" />
                    100mm minimum clearance above
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowUpDown className="w-4 h-4 text-elec-yellow" />
                    50mm minimum clearance below
                  </li>
                  <li className="flex items-center gap-2">
                    <Square className="w-4 h-4 text-elec-yellow" />
                    30-50mm side clearance (check model)
                  </li>
                  <li className="flex items-center gap-2">
                    <Settings className="w-4 h-4 text-elec-yellow" />
                    100mm front clearance for programming
                  </li>
                </ul>
              </div>

              <div className="bg-background/50 rounded-lg p-4">
                <h3 className="font-medium text-elec-yellow mb-3">Contactors and Relays</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <ArrowUpDown className="w-4 h-4 text-elec-yellow" />
                    25-50mm above (size dependent)
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowUpDown className="w-4 h-4 text-elec-yellow" />
                    25mm minimum below
                  </li>
                  <li className="flex items-center gap-2">
                    <Square className="w-4 h-4 text-elec-yellow" />
                    Side-by-side mounting permitted
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-elec-yellow" />
                    50mm from sensitive electronics
                  </li>
                </ul>
              </div>

              <div className="bg-background/50 rounded-lg p-4">
                <h3 className="font-medium text-elec-yellow mb-3">PLCs and I/O Modules</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <ArrowUpDown className="w-4 h-4 text-elec-yellow" />
                    50mm clearance above and below
                  </li>
                  <li className="flex items-center gap-2">
                    <Square className="w-4 h-4 text-elec-yellow" />
                    25mm minimum side spacing
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-elec-yellow" />
                    100mm from VSDs and soft starters
                  </li>
                  <li className="flex items-center gap-2">
                    <Settings className="w-4 h-4 text-elec-yellow" />
                    Front access for card removal
                  </li>
                </ul>
              </div>

              <div className="bg-background/50 rounded-lg p-4">
                <h3 className="font-medium text-elec-yellow mb-3">Circuit Breakers (MCBs/MCCBs)</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <ArrowUpDown className="w-4 h-4 text-elec-yellow" />
                    25mm above for arc venting
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowUpDown className="w-4 h-4 text-elec-yellow" />
                    25mm below for cable access
                  </li>
                  <li className="flex items-center gap-2">
                    <Square className="w-4 h-4 text-elec-yellow" />
                    Adjacent mounting standard
                  </li>
                  <li className="flex items-center gap-2">
                    <Settings className="w-4 h-4 text-elec-yellow" />
                    Check arc chamber orientation
                  </li>
                </ul>
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

        {/* Section 3: Mounting Orientation and Cooling */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Mounting Orientation and Cooling
          </h2>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 space-y-4">
            <p className="text-sm text-muted-foreground">
              Component mounting orientation directly affects thermal performance and
              operating characteristics. Thermal magnetic devices, in particular, rely
              on convective airflow for proper operation of their bimetallic elements.
            </p>

            <div className="bg-background/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Thermometer className="w-5 h-5 text-elec-yellow" />
                <h3 className="font-medium text-foreground">Orientation Derating Factors</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 text-elec-yellow">Device Type</th>
                      <th className="text-center py-2 text-elec-yellow">Vertical</th>
                      <th className="text-center py-2 text-elec-yellow">Horizontal</th>
                      <th className="text-center py-2 text-elec-yellow">Inverted</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-white/5">
                      <td className="py-2">MCB (Thermal-magnetic)</td>
                      <td className="text-center text-green-400">100%</td>
                      <td className="text-center text-amber-400">80%</td>
                      <td className="text-center text-red-400">65%</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2">MCCB (up to 250A)</td>
                      <td className="text-center text-green-400">100%</td>
                      <td className="text-center text-amber-400">80%</td>
                      <td className="text-center text-red-400">Not Permitted</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2">Contactor</td>
                      <td className="text-center text-green-400">100%</td>
                      <td className="text-center text-green-400">100%</td>
                      <td className="text-center text-amber-400">80%</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2">Variable Speed Drive</td>
                      <td className="text-center text-green-400">100%</td>
                      <td className="text-center text-red-400">Not Permitted</td>
                      <td className="text-center text-red-400">Not Permitted</td>
                    </tr>
                    <tr>
                      <td className="py-2">PLC/Controller</td>
                      <td className="text-center text-green-400">100%</td>
                      <td className="text-center text-amber-400">Check datasheet</td>
                      <td className="text-center text-red-400">Not Permitted</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <Thermometer className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-300">Thermal Management Principles</h4>
                  <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                    <li>- <strong>Heat rises:</strong> Mount heat-generating components (VSDs, transformers) at the top of enclosures</li>
                    <li>- <strong>Convection flow:</strong> Ensure unobstructed vertical airflow path from bottom vents to top vents</li>
                    <li>- <strong>Ambient derating:</strong> Add 2-3% derating per degree C above 40 degrees C enclosure temperature</li>
                    <li>- <strong>Forced cooling:</strong> Fan cooling can restore ratings but add maintenance requirements</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: End Stops and Rail Accessories */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            End Stops and Rail Accessories
          </h2>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 space-y-4">
            <p className="text-sm text-muted-foreground">
              Rail accessories ensure component retention, proper earthing, and
              professional appearance. These items are essential, not optional, for
              installations meeting BS EN 61439 assembly requirements.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-background/50 rounded-lg p-4">
                <h3 className="font-medium text-elec-yellow mb-2">End Stops/Brackets</h3>
                <p className="text-sm text-muted-foreground">
                  Required at both ends of every DIN rail section. Prevents component
                  migration during vibration and shipping. Use metal end stops for rails
                  carrying heavy components; plastic acceptable for light loads. Some
                  designs include integrated earthing points.
                </p>
              </div>

              <div className="bg-background/50 rounded-lg p-4">
                <h3 className="font-medium text-elec-yellow mb-2">Rail Couplers</h3>
                <p className="text-sm text-muted-foreground">
                  Join multiple rail sections for long runs. Must maintain electrical
                  continuity for earthing. Use sleeved couplers where thermal expansion
                  is significant. Maximum coupler spacing varies with component weight -
                  check manufacturer data.
                </p>
              </div>

              <div className="bg-background/50 rounded-lg p-4">
                <h3 className="font-medium text-elec-yellow mb-2">Earthing Terminals</h3>
                <p className="text-sm text-muted-foreground">
                  DIN rail mount earth terminals provide the connection point between
                  the rail (and hence mounted equipment frames) and the main earth bar.
                  Use serrated base types for painted rails to ensure metallic contact.
                  One per rail section minimum.
                </p>
              </div>

              <div className="bg-background/50 rounded-lg p-4">
                <h3 className="font-medium text-elec-yellow mb-2">Blanking Plates</h3>
                <p className="text-sm text-muted-foreground">
                  Cover unused rail sections for professional appearance and to prevent
                  accumulation of debris. Available in various widths to fill gaps.
                  Important for panels with IP-rated doors - maintains finger-safe access
                  to live parts.
                </p>
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-300">Professional Practice</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Always install end stops before mounting any components. This
                    establishes the working area and prevents the frustration of
                    components sliding during installation. Use marker strips to label
                    terminal positions - pre-printed or site-printed markers are essential
                    for maintainability.
                  </p>
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

        {/* Section 5: Heavy Component Mounting Methods */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Heavy Component Mounting Methods
          </h2>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 space-y-4">
            <p className="text-sm text-muted-foreground">
              Components exceeding 500g require additional mechanical support beyond
              the standard DIN rail clip. This is an EN 60439-1 and BS EN 61439
              requirement, not merely a recommendation. Failure to properly secure heavy
              components can result in rail distortion, component damage during
              transport, and safety hazards from falling equipment.
            </p>

            <div className="bg-background/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Wrench className="w-5 h-5 text-elec-yellow" />
                <h3 className="font-medium text-foreground">Heavy Mounting Techniques</h3>
              </div>

              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="border-l-2 border-elec-yellow pl-4">
                  <h4 className="font-medium text-foreground">Supplementary Bracket Method</h4>
                  <p className="mt-1">
                    Mount component on DIN rail, then install an L-bracket from the
                    component's mounting holes to the enclosure backplate. The DIN rail
                    clip provides location; the bracket provides retention. Use
                    manufacturer-supplied brackets where available.
                  </p>
                </div>

                <div className="border-l-2 border-blue-400 pl-4">
                  <h4 className="font-medium text-foreground">Reduced Rail Fixing Centres</h4>
                  <p className="mt-1">
                    For heavy component zones, reduce DIN rail fixing centres from
                    standard 300mm to 150-200mm. This distributes the load across more
                    fixings and reduces rail deflection. Essential for rails carrying
                    multiple large contactors or VSDs.
                  </p>
                </div>

                <div className="border-l-2 border-green-400 pl-4">
                  <h4 className="font-medium text-foreground">Direct Panel Mounting</h4>
                  <p className="mt-1">
                    For very heavy items (transformers, large soft starters), bypass DIN
                    rail entirely. Mount directly to the backplate using the component's
                    integral mounting feet. Use isolation mounts for vibrating equipment.
                    Ensure adequate load spreading - backing plates may be required.
                  </p>
                </div>

                <div className="border-l-2 border-purple-400 pl-4">
                  <h4 className="font-medium text-foreground">Double Rail Configuration</h4>
                  <p className="mt-1">
                    Some large components span two parallel DIN rails. Install rails at
                    the exact spacing specified in component documentation. Both clips
                    must engage fully. This method provides excellent stability for
                    components like large VSDs with integral top-hat rail adapters.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-red-300">Critical Warning</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Never rely solely on DIN rail clips for components over 500g in
                    installations subject to vibration (industrial machinery, mobile
                    applications, seismic zones). The retaining clips are designed for
                    static loads only. Vibration will cause progressive clip fatigue and
                    eventual component release.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Professional Installation Techniques */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Professional Installation Techniques
          </h2>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 space-y-4">
            <p className="text-sm text-muted-foreground">
              Professional workmanship distinguishes quality industrial installations.
              These techniques ensure your work meets industry expectations, passes
              inspection, and provides reliable long-term performance.
            </p>

            <div className="bg-background/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-5 h-5 text-elec-yellow" />
                <h3 className="font-medium text-foreground">Installation Sequence</h3>
              </div>
              <ol className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-3">
                  <span className="bg-elec-yellow text-black w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs">1</span>
                  <span><strong className="text-foreground">Layout planning:</strong> Mark rail positions on backplate using manufacturer templates. Verify spacing allows for all components plus 20% spare capacity.</span>
                </li>
                <li className="flex gap-3">
                  <span className="bg-elec-yellow text-black w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs">2</span>
                  <span><strong className="text-foreground">Rail cutting:</strong> Use dedicated rail cutters for clean cuts. Deburr cut ends to prevent injury and ensure end stop seating. File sharp edges smooth.</span>
                </li>
                <li className="flex gap-3">
                  <span className="bg-elec-yellow text-black w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs">3</span>
                  <span><strong className="text-foreground">Rail mounting:</strong> Use slotted holes for adjustment. Check level with spirit level. Torque fixings to manufacturer specification - typically 2-3Nm for M4/M5 screws.</span>
                </li>
                <li className="flex gap-3">
                  <span className="bg-elec-yellow text-black w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs">4</span>
                  <span><strong className="text-foreground">End stops first:</strong> Install end stops/brackets before any components. Position to allow for planned components plus spare.</span>
                </li>
                <li className="flex gap-3">
                  <span className="bg-elec-yellow text-black w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs">5</span>
                  <span><strong className="text-foreground">Component mounting:</strong> Work from one end to the other systematically. Verify each clip is fully engaged. Add supplementary fixings for heavy items.</span>
                </li>
                <li className="flex gap-3">
                  <span className="bg-elec-yellow text-black w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs">6</span>
                  <span><strong className="text-foreground">Earthing verification:</strong> Confirm rail earthing continuity with low-resistance ohmmeter. Record readings in test documentation.</span>
                </li>
              </ol>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <h4 className="font-medium text-green-300 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Professional Standards
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>- Rails level within 1mm per metre</li>
                  <li>- All clips fully engaged and tested</li>
                  <li>- End stops at both rail ends</li>
                  <li>- Uniform spacing between components</li>
                  <li>- Labels/markers clearly visible</li>
                  <li>- Earthing continuity verified</li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <h4 className="font-medium text-red-300 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Common Defects
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>- Missing end stops</li>
                  <li>- Components not fully clipped</li>
                  <li>- Insufficient spacing around VSDs</li>
                  <li>- Heavy items without support brackets</li>
                  <li>- Rail fixings over-torqued/stripped</li>
                  <li>- Sharp edges on cut rails</li>
                </ul>
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

        {/* Quick Reference Card */}
        <section className="space-y-4">
          <div className="bg-gradient-to-r from-elec-yellow/20 to-amber-600/20 border border-elec-yellow/30 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-elec-yellow" />
              Quick Reference Card
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-foreground text-sm mb-2">DIN Rail Types (EN 60715)</h3>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>- TS35 (TH35-7.5): 35mm x 7.5mm - Standard</li>
                  <li>- TS32 (TH35-15): 35mm x 15mm - Deep</li>
                  <li>- G32: 32mm G-profile - Terminals</li>
                  <li>- Standard steel thickness: 1.0mm</li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-foreground text-sm mb-2">Key Spacing Requirements</h3>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>- VSDs: 100mm above, 50mm below</li>
                  <li>- PLCs: 50mm all sides, 100mm from VSDs</li>
                  <li>- MCBs: 25mm above/below</li>
                  <li>- Rail to wall: 25mm minimum</li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-foreground text-sm mb-2">Mounting Derating</h3>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>- Vertical: 100% (standard)</li>
                  <li>- Horizontal: 80% for thermal devices</li>
                  <li>- Inverted: 65% or not permitted</li>
                  <li>- Per 10 degrees C above 40 degrees C: -5 to -10%</li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-foreground text-sm mb-2">Heavy Component Rules</h3>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>- Over 500g: Supplementary fixing required</li>
                  <li>- Reduce rail fixing centres to 150-200mm</li>
                  <li>- Over 1kg: Consider direct mounting</li>
                  <li>- Vibration: Never rely on clips alone</li>
                </ul>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-xs text-muted-foreground">
                <strong className="text-elec-yellow">Standards Reference:</strong> EN 60715
                (DIN rail profiles), BS EN 61439 (Switchboard assemblies), EN 60439-1
                (Low-voltage switchgear), BS 7671 (Wiring Regulations)
              </p>
            </div>
          </div>
        </section>

        {/* FAQs - Static bordered list */}
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
          <Button
            onClick={() => setShowQuiz(!showQuiz)}
            className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90"
          >
            {showQuiz ? 'Hide Quiz' : 'Take the Quiz'}
          </Button>

          {showQuiz && (
            <Quiz
              questions={quizQuestions}
              title="Component Mounting and DIN Rail Organisation Quiz"
              passingScore={70}
            />
          )}
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="text-muted-foreground hover:text-foreground" asChild>
            <Link to="/study-centre/upskilling/industrial-electrical/module-3/section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Layout Planning
            </Link>
          </Button>
          <Button size="lg" className="bg-elec-yellow text-black hover:bg-elec-yellow/90" asChild>
            <Link to="/study-centre/upskilling/industrial-electrical/module-3/section-3">
              Next: Cable Management
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </main>
    </div>
  );
};

export default IndustrialElectricalModule3Section2;
