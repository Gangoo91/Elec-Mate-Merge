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
  Cable,
  Wrench,
  Tag,
  Grid3X3,
  Layers,
  Award,
  BookOpen,
  AlertTriangle,
  CheckCircle2,
  Info
} from 'lucide-react';

const IndustrialElectricalModule3Section3: React.FC = () => {
  const [showQuiz, setShowQuiz] = useState(false);

  useSEO({
    title: 'Cable Termination and Ferrule ID | Industrial Electrical Module 3 Section 3',
    description: 'Learn professional cable termination techniques, bootlace ferrule selection per DIN 46228, crimp tool calibration, terminal block standards IEC 60947-7-1, and wire marking systems for industrial electrical installations.',
    keywords: [
      'bootlace ferrules',
      'DIN 46228',
      'cable termination',
      'crimp tools',
      'terminal blocks',
      'IEC 60947-7-1',
      'wire marking',
      'ferrule colour coding',
      'industrial wiring'
    ]
  });

  const quickCheckQuestions = [
    {
      id: 'qc-ferrule-colour',
      question: 'According to DIN 46228, what colour ferrule is used for 1.5mm² conductors?',
      options: ['Red', 'Black', 'Grey', 'Blue'],
      correctIndex: 1,
      explanation: 'Per DIN 46228 Part 4, black ferrules indicate 1.5mm² conductors. The colour coding system ensures quick visual identification: red for 1.0mm², black for 1.5mm², grey for 2.5mm², and blue for 0.75mm².'
    },
    {
      id: 'qc-crimp-quality',
      question: 'What is the primary indicator of a properly crimped ferrule?',
      options: [
        'The ferrule changes colour',
        'Hexagonal profile with no conductor damage',
        'The wire can still rotate freely',
        'The ferrule splits slightly'
      ],
      correctIndex: 1,
      explanation: 'A quality crimp produces a uniform hexagonal profile that compresses the ferrule evenly around the conductor without damaging wire strands. The conductor should not rotate, and there should be no splits or cracks in the ferrule.'
    },
    {
      id: 'qc-terminal-standard',
      question: 'Which international standard governs terminal block specifications for industrial control equipment?',
      options: ['IEC 60364', 'IEC 60947-7-1', 'AS/NZS 3000', 'DIN 43880'],
      correctIndex: 1,
      explanation: 'IEC 60947-7-1 specifically covers terminal blocks for copper conductors used in low-voltage switchgear and controlgear. It defines requirements for construction, performance, and testing of screw-type and screwless terminal blocks.'
    }
  ];

  const quizQuestions = [
    {
      question: 'What is the standard ferrule colour for 2.5mm² conductors according to DIN 46228?',
      options: ['Black', 'Blue', 'Grey', 'Yellow'],
      correctAnswer: 'Grey'
    },
    {
      question: 'Twin ferrules (for two conductors) are typically identified by which characteristic?',
      options: [
        'White stripe on the ferrule',
        'Extended collar length',
        'Different colour coding scheme',
        'Square crimping profile'
      ],
      correctAnswer: 'Different colour coding scheme'
    },
    {
      question: 'When crimping ferrules, why is die selection critical?',
      options: [
        'To match the ferrule colour',
        'To ensure proper compression ratio',
        'To speed up installation',
        'To comply with labelling requirements'
      ],
      correctAnswer: 'To ensure proper compression ratio'
    },
    {
      question: 'What is the recommended strip length for standard bootlace ferrules?',
      options: [
        'Equal to ferrule tube length',
        '2mm longer than ferrule tube',
        '2mm shorter than ferrule tube',
        'Double the ferrule tube length'
      ],
      correctAnswer: 'Equal to ferrule tube length'
    },
    {
      question: 'According to IEC 60947-7-1, what must terminal blocks be rated for?',
      options: [
        'Only voltage rating',
        'Only current rating',
        'Voltage, current, and cross-section',
        'Temperature only'
      ],
      correctAnswer: 'Voltage, current, and cross-section'
    },
    {
      question: 'What labelling standard is commonly used for wire identification in industrial installations?',
      options: ['ISO 9001', 'IEC 62491', 'AS/NZS 3000', 'DIN 40719'],
      correctAnswer: 'IEC 62491'
    },
    {
      question: 'What is the purpose of the plastic collar on insulated ferrules?',
      options: [
        'Colour identification only',
        'Strain relief and insulation funnel',
        'To increase conductivity',
        'For tool alignment only'
      ],
      correctAnswer: 'Strain relief and insulation funnel'
    },
    {
      question: 'How should crimp tools be maintained for quality assurance?',
      options: [
        'Annual visual inspection only',
        'Replace after every 1000 crimps',
        'Regular calibration and die inspection',
        'Lubrication after each use'
      ],
      correctAnswer: 'Regular calibration and die inspection'
    },
    {
      question: 'When terminating multi-conductor cables, what should be applied at the entry point?',
      options: [
        'Additional tape wrapping',
        'Cable gland with appropriate IP rating',
        'Heat shrink only',
        'Silicone sealant'
      ],
      correctAnswer: 'Cable gland with appropriate IP rating'
    },
    {
      question: 'What does a pull test verify in a crimped termination?',
      options: [
        'Electrical conductivity',
        'Mechanical retention strength',
        'Insulation integrity',
        'Colour accuracy'
      ],
      correctAnswer: 'Mechanical retention strength'
    }
  ];

  const faqItems = [
    {
      question: 'Can I use ferrules with any terminal block?',
      answer: 'Most modern terminal blocks are designed to accept ferrule-terminated conductors, but you must verify compatibility. Check the terminal block specifications for accepted conductor types and sizes. Spring-clamp terminals typically work well with ferrules, while some older screw terminals may require direct wire insertion. Always consult manufacturer data sheets for approved termination methods.'
    },
    {
      question: 'Why do ferrule colours vary between manufacturers?',
      answer: 'While DIN 46228 Part 4 provides a colour coding standard, not all manufacturers strictly adhere to it, especially for non-European markets. Some manufacturers use proprietary colour schemes or offer ferrules in multiple colour ranges. Always verify the conductor size marked on the ferrule packaging rather than relying solely on colour, particularly when using unfamiliar brands.'
    },
    {
      question: 'How do I select the correct crimp die for my ferrule?',
      answer: 'Select crimp dies based on the ferrule size (mm²), not wire size. Dies should create a hexagonal crimp that compresses the ferrule 15-20% without damaging strands. Most quality crimp tools have dies marked with size ranges. Use manufacturer-recommended die sets and never use pliers or incorrect dies, as this creates unreliable connections that may fail under load or vibration.'
    },
    {
      question: 'What is the difference between insulated and non-insulated ferrules?',
      answer: 'Insulated ferrules have a plastic collar that provides strain relief, funnels strands into the tube, and offers additional insulation at the transition point. Non-insulated ferrules are bare metal tubes used where space is extremely limited or for specific applications. Insulated ferrules are preferred for industrial applications as they provide better protection against strand escape and mechanical stress.'
    },
    {
      question: 'How often should crimp tools be calibrated?',
      answer: 'Professional crimp tools should be calibrated at least annually, or more frequently in high-volume production environments. Calibration should also occur after any tool damage, when crimps fail quality inspection, or when switching between different ferrule brands. Many manufacturers offer calibration services and certificates. Keep calibration records as part of your quality management system.'
    },
    {
      question: 'Can twin ferrules be used for connecting two different circuits?',
      answer: 'No, twin ferrules should only be used for paralleling conductors of the same circuit (same potential). Using twin ferrules to connect different circuits creates a direct electrical connection between them, which is dangerous and violates wiring standards. Each circuit must have independent terminations. Twin ferrules are designed for applications like connecting multiple wires to a single terminal point within the same circuit.'
    }
  ];

  return (
    <div className="bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" asChild>
            <Link to="/electrician/upskilling/industrial-electrical-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <span className="text-sm text-muted-foreground">Module 3 &gt; Section 3</span>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-8">
        {/* Title */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-elec-yellow/10">
            <Cable className="w-8 h-8 text-elec-yellow" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Cable Termination and Ferrule ID</h1>
          <p className="text-muted-foreground">Professional techniques for reliable industrial cable terminations</p>
        </div>

        {/* Section Overview */}
        <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="font-semibold text-foreground mb-2">Section Overview</h2>
              <p className="text-sm text-muted-foreground">
                Proper cable termination is fundamental to electrical system reliability and safety.
                This section covers bootlace ferrule selection per DIN 46228, crimping techniques,
                wire identification systems, and terminal block standards according to IEC 60947-7-1.
                Mastering these skills ensures your installations meet industrial quality standards
                and provide long-term dependable connections.
              </p>
            </div>
          </div>
        </div>

        {/* Section 1: Bootlace Ferrules */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Bootlace Ferrules: Types and Selection
          </h2>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 space-y-4">
            <p className="text-sm text-muted-foreground">
              Bootlace ferrules (also called wire end ferrules or cord end terminals) provide a
              solid, unified termination point for stranded conductors. They prevent strand splaying,
              ensure consistent contact pressure, and protect against strand damage from terminal screws.
            </p>

            <div className="bg-background/50 rounded-lg p-4 border border-white/10">
              <h3 className="text-elec-yellow font-medium mb-3 flex items-center gap-2">
                <Cable className="w-5 h-5" />
                DIN 46228 Colour Coding Standard
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-background/70 p-3 rounded text-center border border-white/5">
                  <div className="w-8 h-8 bg-white rounded-full mx-auto mb-2"></div>
                  <p className="text-sm font-medium text-foreground">White</p>
                  <p className="text-xs text-muted-foreground">0.5mm²</p>
                </div>
                <div className="bg-background/70 p-3 rounded text-center border border-white/5">
                  <div className="w-8 h-8 bg-orange-500 rounded-full mx-auto mb-2"></div>
                  <p className="text-sm font-medium text-foreground">Orange</p>
                  <p className="text-xs text-muted-foreground">0.25mm²</p>
                </div>
                <div className="bg-background/70 p-3 rounded text-center border border-white/5">
                  <div className="w-8 h-8 bg-blue-500 rounded-full mx-auto mb-2"></div>
                  <p className="text-sm font-medium text-foreground">Blue</p>
                  <p className="text-xs text-muted-foreground">0.75mm²</p>
                </div>
                <div className="bg-background/70 p-3 rounded text-center border border-white/5">
                  <div className="w-8 h-8 bg-red-500 rounded-full mx-auto mb-2"></div>
                  <p className="text-sm font-medium text-foreground">Red</p>
                  <p className="text-xs text-muted-foreground">1.0mm²</p>
                </div>
                <div className="bg-background/70 p-3 rounded text-center border border-white/5">
                  <div className="w-8 h-8 bg-black rounded-full mx-auto mb-2 border border-gray-600"></div>
                  <p className="text-sm font-medium text-foreground">Black</p>
                  <p className="text-xs text-muted-foreground">1.5mm²</p>
                </div>
                <div className="bg-background/70 p-3 rounded text-center border border-white/5">
                  <div className="w-8 h-8 bg-gray-400 rounded-full mx-auto mb-2"></div>
                  <p className="text-sm font-medium text-foreground">Grey</p>
                  <p className="text-xs text-muted-foreground">2.5mm²</p>
                </div>
                <div className="bg-background/70 p-3 rounded text-center border border-white/5">
                  <div className="w-8 h-8 bg-blue-800 rounded-full mx-auto mb-2"></div>
                  <p className="text-sm font-medium text-foreground">Dark Blue</p>
                  <p className="text-xs text-muted-foreground">4.0mm²</p>
                </div>
                <div className="bg-background/70 p-3 rounded text-center border border-white/5">
                  <div className="w-8 h-8 bg-yellow-400 rounded-full mx-auto mb-2"></div>
                  <p className="text-sm font-medium text-foreground">Yellow</p>
                  <p className="text-xs text-muted-foreground">6.0mm²</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-background/50 p-4 rounded-lg border border-white/10">
                <h4 className="font-medium text-foreground mb-2">Single Ferrules</h4>
                <p className="text-sm text-muted-foreground">
                  Standard ferrules for single conductor termination. Available insulated (with
                  plastic collar) or non-insulated. Select size matching conductor cross-section.
                </p>
              </div>
              <div className="bg-background/50 p-4 rounded-lg border border-white/10">
                <h4 className="font-medium text-foreground mb-2">Twin Ferrules</h4>
                <p className="text-sm text-muted-foreground">
                  Designed for two conductors of the same size entering one terminal. Use only
                  for same-circuit paralleling. Follow modified colour coding per DIN 46228-4.
                </p>
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

        {/* Section 2: Crimping Tools */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Crimping Tools and Techniques
          </h2>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 space-y-4">
            <p className="text-sm text-muted-foreground">
              Quality crimping requires proper tools, correct technique, and regular maintenance.
              The crimping process creates a gas-tight connection between the ferrule and conductor
              strands through controlled deformation.
            </p>

            <div className="bg-background/50 rounded-lg p-4 border border-white/10">
              <h3 className="text-elec-yellow font-medium mb-3 flex items-center gap-2">
                <Wrench className="w-5 h-5" />
                Crimp Tool Categories
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Self-Adjusting Tools</p>
                    <p className="text-sm text-muted-foreground">
                      Automatically select correct die based on inserted ferrule size. Ideal for
                      mixed-size work. Ensure ratchet completes full cycle.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Fixed-Die Tools</p>
                    <p className="text-sm text-muted-foreground">
                      Interchangeable dies for specific size ranges. Require manual die selection.
                      Often more precise for production environments.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Hydraulic/Powered Tools</p>
                    <p className="text-sm text-muted-foreground">
                      For large ferrules (10mm² and above) or high-volume applications. Provide
                      consistent force regardless of operator fatigue.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-amber-500">Crimping Best Practices</p>
                  <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                    <li>- Strip conductor to exact ferrule tube length</li>
                    <li>- Insert wire fully until visible through ferrule inspection window</li>
                    <li>- Position ferrule in correct die size before crimping</li>
                    <li>- Complete full ratchet cycle - never release mid-crimp</li>
                    <li>- Verify hexagonal profile and strand containment after crimp</li>
                  </ul>
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

        {/* Section 3: Wire Marking */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Wire Marking and Identification Systems
          </h2>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 space-y-4">
            <p className="text-sm text-muted-foreground">
              Systematic wire identification is essential for installation, maintenance, and
              troubleshooting. Industrial installations require permanent, legible markings
              that comply with relevant standards such as IEC 62491.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-background/50 p-4 rounded-lg border border-white/10">
                <Tag className="w-6 h-6 text-elec-yellow mb-2" />
                <h4 className="font-medium text-foreground mb-2">Marker Types</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li><span className="text-elec-yellow">Heat-shrink:</span> Permanent, professional finish</li>
                  <li><span className="text-elec-yellow">Slide-on:</span> Pre-printed, easy application</li>
                  <li><span className="text-elec-yellow">Wrap-around:</span> Self-laminating labels</li>
                  <li><span className="text-elec-yellow">Flag-style:</span> Visible from multiple angles</li>
                </ul>
              </div>
              <div className="bg-background/50 p-4 rounded-lg border border-white/10">
                <BookOpen className="w-6 h-6 text-elec-yellow mb-2" />
                <h4 className="font-medium text-foreground mb-2">Identification Content</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li><span className="text-elec-yellow">Wire number:</span> Unique circuit identifier</li>
                  <li><span className="text-elec-yellow">Terminal refs:</span> From/to designations</li>
                  <li><span className="text-elec-yellow">Function:</span> Signal type or purpose</li>
                  <li><span className="text-elec-yellow">Drawing ref:</span> Schematic cross-reference</li>
                </ul>
              </div>
            </div>

            <div className="bg-background/50 rounded-lg p-4 border border-white/10">
              <h3 className="text-elec-yellow font-medium mb-3">IEC 62491 Labelling Guidelines</h3>
              <p className="text-sm text-muted-foreground mb-3">
                This standard specifies requirements for cable and core identification in installations:
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  Labels must be durable and legible for the installation's expected lifetime
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  Identification should be placed at both ends and at intermediate access points
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  Marking methods must withstand environmental conditions (temperature, UV, chemicals)
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  Font size and contrast must ensure readability at normal working distance
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4: Terminal Blocks */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Terminal Block Selection and Usage
          </h2>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 space-y-4">
            <p className="text-sm text-muted-foreground">
              Terminal blocks provide organised, maintainable connection points in control panels
              and junction boxes. Selection must consider current rating, voltage class, conductor
              size, and mounting requirements per IEC 60947-7-1.
            </p>

            <div className="bg-background/50 rounded-lg p-4 border border-white/10">
              <h3 className="text-elec-yellow font-medium mb-3 flex items-center gap-2">
                <Grid3X3 className="w-5 h-5" />
                Terminal Block Types (IEC 60947-7-1)
              </h3>
              <div className="space-y-4">
                <div className="border-l-2 border-elec-yellow/50 pl-4">
                  <p className="font-medium text-foreground">Screw-Clamp Terminals</p>
                  <p className="text-sm text-muted-foreground">
                    Traditional design using screw pressure. Requires periodic retorquing.
                    Good for solid or ferrule-terminated conductors. Check torque specifications.
                  </p>
                </div>
                <div className="border-l-2 border-elec-yellow/50 pl-4">
                  <p className="font-medium text-foreground">Spring-Clamp (Push-in) Terminals</p>
                  <p className="text-sm text-muted-foreground">
                    Maintenance-free connection using spring pressure. Vibration resistant.
                    Ideal for stranded conductors with ferrules. Faster installation.
                  </p>
                </div>
                <div className="border-l-2 border-elec-yellow/50 pl-4">
                  <p className="font-medium text-foreground">Insulation Displacement (IDC)</p>
                  <p className="text-sm text-muted-foreground">
                    Pierces insulation to contact conductor. For specific wire types only.
                    Common in communication and low-voltage control applications.
                  </p>
                </div>
                <div className="border-l-2 border-elec-yellow/50 pl-4">
                  <p className="font-medium text-foreground">Disconnect/Fused Terminals</p>
                  <p className="text-sm text-muted-foreground">
                    Include switching or fuse functions. Allow circuit isolation without
                    disconnecting wires. Essential for testing and maintenance access.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
              <p className="text-elec-yellow font-medium mb-2">Selection Criteria</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div className="text-center">
                  <p className="font-medium text-foreground">Voltage Rating</p>
                  <p className="text-muted-foreground">Match system voltage</p>
                </div>
                <div className="text-center">
                  <p className="font-medium text-foreground">Current Capacity</p>
                  <p className="text-muted-foreground">Include safety margin</p>
                </div>
                <div className="text-center">
                  <p className="font-medium text-foreground">Wire Range</p>
                  <p className="text-muted-foreground">Min/max conductor size</p>
                </div>
                <div className="text-center">
                  <p className="font-medium text-foreground">Mounting</p>
                  <p className="text-muted-foreground">DIN rail or panel</p>
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

        {/* Section 5: Multi-conductor Termination */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Multi-Conductor Cable Termination
          </h2>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 space-y-4">
            <p className="text-sm text-muted-foreground">
              Multi-conductor cables require systematic termination procedures to maintain
              organisation, ensure proper strain relief, and facilitate future maintenance.
              Panel entry must provide appropriate environmental protection.
            </p>

            <div className="bg-background/50 rounded-lg p-4 border border-white/10">
              <h3 className="text-elec-yellow font-medium mb-3 flex items-center gap-2">
                <Layers className="w-5 h-5" />
                Termination Procedure
              </h3>
              <ol className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow text-background flex items-center justify-center flex-shrink-0 font-bold text-sm">1</span>
                  <div>
                    <p className="font-medium text-foreground">Cable Entry</p>
                    <p className="text-sm text-muted-foreground">
                      Install appropriate cable gland matching cable OD and required IP rating.
                      Ensure gland provides strain relief and sealing.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow text-background flex items-center justify-center flex-shrink-0 font-bold text-sm">2</span>
                  <div>
                    <p className="font-medium text-foreground">Outer Sheath Removal</p>
                    <p className="text-sm text-muted-foreground">
                      Strip outer jacket to appropriate length. Avoid damaging inner conductor
                      insulation. Leave sufficient length for routing and service loops.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow text-background flex items-center justify-center flex-shrink-0 font-bold text-sm">3</span>
                  <div>
                    <p className="font-medium text-foreground">Conductor Separation</p>
                    <p className="text-sm text-muted-foreground">
                      Separate individual conductors and route to terminal positions. Group by
                      function. Maintain colour code visibility for identification.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow text-background flex items-center justify-center flex-shrink-0 font-bold text-sm">4</span>
                  <div>
                    <p className="font-medium text-foreground">Individual Termination</p>
                    <p className="text-sm text-muted-foreground">
                      Strip, ferrule, label, and terminate each conductor. Verify against wiring
                      schedule. Apply identification markers before final termination.
                    </p>
                  </div>
                </li>
              </ol>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-background/50 p-4 rounded-lg border border-white/10">
                <h4 className="font-medium text-foreground mb-2">Screen/Shield Termination</h4>
                <p className="text-sm text-muted-foreground">
                  Terminate cable screens to dedicated earth terminals. Use EMC-compliant glands
                  for 360-degree screen contact. Follow manufacturer guidance for screen pigtails
                  versus clamp termination based on frequency requirements.
                </p>
              </div>
              <div className="bg-background/50 p-4 rounded-lg border border-white/10">
                <h4 className="font-medium text-foreground mb-2">Drain Wire Handling</h4>
                <p className="text-sm text-muted-foreground">
                  Connect drain wires to earth terminals using appropriately sized ferrules.
                  Never leave drain wires floating or taped back. Document screen termination
                  points on as-built drawings.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Quality Standards */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Quality Standards for Terminations
          </h2>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 space-y-4">
            <p className="text-sm text-muted-foreground">
              Quality terminations require adherence to standards, proper documentation, and
              systematic verification. Defective terminations are a leading cause of electrical
              failures and can result in fires, equipment damage, and system downtime.
            </p>

            <div className="bg-background/50 rounded-lg p-4 border border-white/10">
              <h3 className="text-elec-yellow font-medium mb-3 flex items-center gap-2">
                <Award className="w-5 h-5" />
                Quality Verification Checklist
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="font-medium text-foreground">Visual Inspection</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>- Uniform hexagonal crimp profile</li>
                    <li>- No strand protrusion from ferrule</li>
                    <li>- Conductor fully inserted (visible)</li>
                    <li>- No insulation damage at strip point</li>
                    <li>- Correct ferrule size for conductor</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="font-medium text-foreground">Functional Testing</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>- Pull test (sample basis)</li>
                    <li>- Continuity verification</li>
                    <li>- Insulation resistance</li>
                    <li>- Torque verification (screw types)</li>
                    <li>- High-pot testing if specified</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-red-500">Common Termination Defects</p>
                  <div className="grid md:grid-cols-2 gap-4 mt-3 text-sm text-muted-foreground">
                    <ul className="space-y-1">
                      <li>- Incorrect ferrule size (loose or overcompressed)</li>
                      <li>- Incomplete crimp cycle</li>
                      <li>- Strand damage from stripping</li>
                    </ul>
                    <ul className="space-y-1">
                      <li>- Wrong die selection</li>
                      <li>- Insufficient insertion depth</li>
                      <li>- Contamination (oil, dirt)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-background/50 rounded-lg p-4 border border-white/10">
              <h4 className="font-medium text-foreground mb-2">Documentation Requirements</h4>
              <p className="text-sm text-muted-foreground">
                Maintain records of crimp tool calibration dates, inspection results, and any
                terminations requiring rework. Quality management systems should include
                traceability from terminal to operator for critical connections. Photographic
                evidence may be required for high-reliability applications.
              </p>
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
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-foreground mb-3">Ferrule Colour Code (DIN 46228-4)</h3>
                <div className="bg-background/50 rounded-lg p-3 text-sm border border-white/10">
                  <table className="w-full">
                    <tbody className="text-muted-foreground">
                      <tr><td className="py-1">0.25mm²</td><td className="text-orange-500">Orange</td></tr>
                      <tr><td className="py-1">0.5mm²</td><td className="text-white">White</td></tr>
                      <tr><td className="py-1">0.75mm²</td><td className="text-blue-400">Blue</td></tr>
                      <tr><td className="py-1">1.0mm²</td><td className="text-red-500">Red</td></tr>
                      <tr><td className="py-1">1.5mm²</td><td className="text-gray-400">Black</td></tr>
                      <tr><td className="py-1">2.5mm²</td><td className="text-gray-400">Grey</td></tr>
                      <tr><td className="py-1">4.0mm²</td><td className="text-blue-700">Dark Blue</td></tr>
                      <tr><td className="py-1">6.0mm²</td><td className="text-yellow-400">Yellow</td></tr>
                      <tr><td className="py-1">10mm²</td><td className="text-red-700">Maroon/Red</td></tr>
                      <tr><td className="py-1">16mm²</td><td className="text-blue-300">Light Blue</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-foreground mb-3">Key Standards Reference</h3>
                <div className="bg-background/50 rounded-lg p-3 text-sm space-y-2 border border-white/10">
                  <div className="text-muted-foreground">
                    <span className="text-elec-yellow">DIN 46228:</span> Ferrule dimensions and colour coding
                  </div>
                  <div className="text-muted-foreground">
                    <span className="text-elec-yellow">IEC 60947-7-1:</span> Terminal block specifications
                  </div>
                  <div className="text-muted-foreground">
                    <span className="text-elec-yellow">IEC 62491:</span> Cable labelling requirements
                  </div>
                  <div className="text-muted-foreground">
                    <span className="text-elec-yellow">IEC 60352-2:</span> Crimped connections
                  </div>
                </div>

                <h3 className="font-medium text-foreground mb-3 mt-4">Crimp Quality Indicators</h3>
                <div className="bg-background/50 rounded-lg p-3 text-sm border border-white/10">
                  <ul className="text-muted-foreground space-y-1">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      Uniform hexagonal profile
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      No strand damage or protrusion
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      Conductor cannot rotate
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      Full insertion visible
                    </li>
                  </ul>
                </div>
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
            Test your understanding of cable termination and ferrule identification concepts.
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
            <Link to="/study-centre/upskilling/industrial-electrical/module-3/section-2">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous: Component Mounting
            </Link>
          </Button>
          <Button
            className="bg-elec-yellow text-background hover:bg-elec-yellow/90"
            asChild
          >
            <Link to="/study-centre/upskilling/industrial-electrical/module-3/section-4">
              Next: Panel Wiring Methods
              <ChevronRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IndustrialElectricalModule3Section3;
