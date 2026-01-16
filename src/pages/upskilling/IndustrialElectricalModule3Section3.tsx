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
import { useNavigate } from 'react-router-dom';

const IndustrialElectricalModule3Section3: React.FC = () => {
  const navigate = useNavigate();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

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

  const faqData = [
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

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a] text-white">
      {/* Header */}
      <div className="bg-[#1a1a1a]/95 border-b border-elec-yellow/20">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <Cable className="w-8 h-8 text-elec-yellow" />
            <span className="text-elec-yellow text-sm font-medium">Module 3 - Section 3</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Cable Termination and Ferrule ID
          </h1>
          <p className="text-gray-400 mt-2">
            Professional techniques for reliable industrial cable terminations
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        {/* Introduction */}
        <div className="bg-[#242424] rounded-lg p-6 border border-gray-700">
          <div className="flex items-start gap-4">
            <Info className="w-6 h-6 text-elec-yellow flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-semibold text-elec-yellow mb-3">Section Overview</h2>
              <p className="text-gray-300 leading-relaxed">
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
        <section className="bg-[#242424] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-elec-yellow font-bold">1</span>
            </div>
            <h2 className="text-xl font-semibold text-white">Bootlace Ferrules: Types and Selection</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Bootlace ferrules (also called wire end ferrules or cord end terminals) provide a
              solid, unified termination point for stranded conductors. They prevent strand splaying,
              ensure consistent contact pressure, and protect against strand damage from terminal screws.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-elec-yellow/30">
              <h3 className="text-elec-yellow font-medium mb-3 flex items-center gap-2">
                <Cable className="w-5 h-5" />
                DIN 46228 Colour Coding Standard
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-[#242424] p-3 rounded text-center">
                  <div className="w-8 h-8 bg-white rounded-full mx-auto mb-2"></div>
                  <p className="text-sm font-medium">White</p>
                  <p className="text-xs text-gray-400">0.5mm²</p>
                </div>
                <div className="bg-[#242424] p-3 rounded text-center">
                  <div className="w-8 h-8 bg-orange-500 rounded-full mx-auto mb-2"></div>
                  <p className="text-sm font-medium">Orange</p>
                  <p className="text-xs text-gray-400">0.25mm²</p>
                </div>
                <div className="bg-[#242424] p-3 rounded text-center">
                  <div className="w-8 h-8 bg-blue-500 rounded-full mx-auto mb-2"></div>
                  <p className="text-sm font-medium">Blue</p>
                  <p className="text-xs text-gray-400">0.75mm²</p>
                </div>
                <div className="bg-[#242424] p-3 rounded text-center">
                  <div className="w-8 h-8 bg-red-500 rounded-full mx-auto mb-2"></div>
                  <p className="text-sm font-medium">Red</p>
                  <p className="text-xs text-gray-400">1.0mm²</p>
                </div>
                <div className="bg-[#242424] p-3 rounded text-center">
                  <div className="w-8 h-8 bg-black rounded-full mx-auto mb-2 border border-gray-600"></div>
                  <p className="text-sm font-medium">Black</p>
                  <p className="text-xs text-gray-400">1.5mm²</p>
                </div>
                <div className="bg-[#242424] p-3 rounded text-center">
                  <div className="w-8 h-8 bg-gray-400 rounded-full mx-auto mb-2"></div>
                  <p className="text-sm font-medium">Grey</p>
                  <p className="text-xs text-gray-400">2.5mm²</p>
                </div>
                <div className="bg-[#242424] p-3 rounded text-center">
                  <div className="w-8 h-8 bg-blue-800 rounded-full mx-auto mb-2"></div>
                  <p className="text-sm font-medium">Dark Blue</p>
                  <p className="text-xs text-gray-400">4.0mm²</p>
                </div>
                <div className="bg-[#242424] p-3 rounded text-center">
                  <div className="w-8 h-8 bg-yellow-400 rounded-full mx-auto mb-2"></div>
                  <p className="text-sm font-medium">Yellow</p>
                  <p className="text-xs text-gray-400">6.0mm²</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="bg-[#1a1a1a] p-4 rounded-lg">
                <h4 className="text-white font-medium mb-2">Single Ferrules</h4>
                <p className="text-sm text-gray-400">
                  Standard ferrules for single conductor termination. Available insulated (with
                  plastic collar) or non-insulated. Select size matching conductor cross-section.
                </p>
              </div>
              <div className="bg-[#1a1a1a] p-4 rounded-lg">
                <h4 className="text-white font-medium mb-2">Twin Ferrules</h4>
                <p className="text-sm text-gray-400">
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
        <section className="bg-[#242424] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-elec-yellow font-bold">2</span>
            </div>
            <h2 className="text-xl font-semibold text-white">Crimping Tools and Techniques</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Quality crimping requires proper tools, correct technique, and regular maintenance.
              The crimping process creates a gas-tight connection between the ferrule and conductor
              strands through controlled deformation.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <h3 className="text-elec-yellow font-medium mb-3 flex items-center gap-2">
                <Wrench className="w-5 h-5" />
                Crimp Tool Categories
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-white">Self-Adjusting Tools</p>
                    <p className="text-sm text-gray-400">
                      Automatically select correct die based on inserted ferrule size. Ideal for
                      mixed-size work. Ensure ratchet completes full cycle.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-white">Fixed-Die Tools</p>
                    <p className="text-sm text-gray-400">
                      Interchangeable dies for specific size ranges. Require manual die selection.
                      Often more precise for production environments.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-white">Hydraulic/Powered Tools</p>
                    <p className="text-sm text-gray-400">
                      For large ferrules (10mm² and above) or high-volume applications. Provide
                      consistent force regardless of operator fatigue.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mt-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-amber-500">Crimping Best Practices</p>
                  <ul className="text-sm text-gray-300 mt-2 space-y-1">
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
        <section className="bg-[#242424] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-elec-yellow font-bold">3</span>
            </div>
            <h2 className="text-xl font-semibold text-white">Wire Marking and Identification Systems</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Systematic wire identification is essential for installation, maintenance, and
              troubleshooting. Industrial installations require permanent, legible markings
              that comply with relevant standards such as IEC 62491.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#1a1a1a] p-4 rounded-lg">
                <Tag className="w-6 h-6 text-elec-yellow mb-2" />
                <h4 className="text-white font-medium mb-2">Marker Types</h4>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li><span className="text-elec-yellow">Heat-shrink:</span> Permanent, professional finish</li>
                  <li><span className="text-elec-yellow">Slide-on:</span> Pre-printed, easy application</li>
                  <li><span className="text-elec-yellow">Wrap-around:</span> Self-laminating labels</li>
                  <li><span className="text-elec-yellow">Flag-style:</span> Visible from multiple angles</li>
                </ul>
              </div>
              <div className="bg-[#1a1a1a] p-4 rounded-lg">
                <BookOpen className="w-6 h-6 text-elec-yellow mb-2" />
                <h4 className="text-white font-medium mb-2">Identification Content</h4>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li><span className="text-elec-yellow">Wire number:</span> Unique circuit identifier</li>
                  <li><span className="text-elec-yellow">Terminal refs:</span> From/to designations</li>
                  <li><span className="text-elec-yellow">Function:</span> Signal type or purpose</li>
                  <li><span className="text-elec-yellow">Drawing ref:</span> Schematic cross-reference</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 mt-4">
              <h3 className="text-elec-yellow font-medium mb-3">IEC 62491 Labelling Guidelines</h3>
              <p className="text-sm text-gray-400 mb-3">
                This standard specifies requirements for cable and core identification in installations:
              </p>
              <ul className="text-sm text-gray-300 space-y-2">
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
        <section className="bg-[#242424] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-elec-yellow font-bold">4</span>
            </div>
            <h2 className="text-xl font-semibold text-white">Terminal Block Selection and Usage</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Terminal blocks provide organised, maintainable connection points in control panels
              and junction boxes. Selection must consider current rating, voltage class, conductor
              size, and mounting requirements per IEC 60947-7-1.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <h3 className="text-elec-yellow font-medium mb-3 flex items-center gap-2">
                <Grid3X3 className="w-5 h-5" />
                Terminal Block Types (IEC 60947-7-1)
              </h3>
              <div className="space-y-4">
                <div className="border-l-2 border-elec-yellow pl-4">
                  <p className="font-medium text-white">Screw-Clamp Terminals</p>
                  <p className="text-sm text-gray-400">
                    Traditional design using screw pressure. Requires periodic retorquing.
                    Good for solid or ferrule-terminated conductors. Check torque specifications.
                  </p>
                </div>
                <div className="border-l-2 border-elec-yellow pl-4">
                  <p className="font-medium text-white">Spring-Clamp (Push-in) Terminals</p>
                  <p className="text-sm text-gray-400">
                    Maintenance-free connection using spring pressure. Vibration resistant.
                    Ideal for stranded conductors with ferrules. Faster installation.
                  </p>
                </div>
                <div className="border-l-2 border-elec-yellow pl-4">
                  <p className="font-medium text-white">Insulation Displacement (IDC)</p>
                  <p className="text-sm text-gray-400">
                    Pierces insulation to contact conductor. For specific wire types only.
                    Common in communication and low-voltage control applications.
                  </p>
                </div>
                <div className="border-l-2 border-elec-yellow pl-4">
                  <p className="font-medium text-white">Disconnect/Fused Terminals</p>
                  <p className="text-sm text-gray-400">
                    Include switching or fuse functions. Allow circuit isolation without
                    disconnecting wires. Essential for testing and maintenance access.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mt-4">
              <p className="text-blue-400 font-medium mb-2">Selection Criteria</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div className="text-center">
                  <p className="text-white font-medium">Voltage Rating</p>
                  <p className="text-gray-400">Match system voltage</p>
                </div>
                <div className="text-center">
                  <p className="text-white font-medium">Current Capacity</p>
                  <p className="text-gray-400">Include safety margin</p>
                </div>
                <div className="text-center">
                  <p className="text-white font-medium">Wire Range</p>
                  <p className="text-gray-400">Min/max conductor size</p>
                </div>
                <div className="text-center">
                  <p className="text-white font-medium">Mounting</p>
                  <p className="text-gray-400">DIN rail or panel</p>
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
        <section className="bg-[#242424] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-elec-yellow font-bold">5</span>
            </div>
            <h2 className="text-xl font-semibold text-white">Multi-Conductor Cable Termination</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Multi-conductor cables require systematic termination procedures to maintain
              organisation, ensure proper strain relief, and facilitate future maintenance.
              Panel entry must provide appropriate environmental protection.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <h3 className="text-elec-yellow font-medium mb-3 flex items-center gap-2">
                <Layers className="w-5 h-5" />
                Termination Procedure
              </h3>
              <ol className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow text-[#1a1a1a] flex items-center justify-center flex-shrink-0 font-bold text-sm">1</span>
                  <div>
                    <p className="font-medium text-white">Cable Entry</p>
                    <p className="text-sm text-gray-400">
                      Install appropriate cable gland matching cable OD and required IP rating.
                      Ensure gland provides strain relief and sealing.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow text-[#1a1a1a] flex items-center justify-center flex-shrink-0 font-bold text-sm">2</span>
                  <div>
                    <p className="font-medium text-white">Outer Sheath Removal</p>
                    <p className="text-sm text-gray-400">
                      Strip outer jacket to appropriate length. Avoid damaging inner conductor
                      insulation. Leave sufficient length for routing and service loops.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow text-[#1a1a1a] flex items-center justify-center flex-shrink-0 font-bold text-sm">3</span>
                  <div>
                    <p className="font-medium text-white">Conductor Separation</p>
                    <p className="text-sm text-gray-400">
                      Separate individual conductors and route to terminal positions. Group by
                      function. Maintain colour code visibility for identification.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow text-[#1a1a1a] flex items-center justify-center flex-shrink-0 font-bold text-sm">4</span>
                  <div>
                    <p className="font-medium text-white">Individual Termination</p>
                    <p className="text-sm text-gray-400">
                      Strip, ferrule, label, and terminate each conductor. Verify against wiring
                      schedule. Apply identification markers before final termination.
                    </p>
                  </div>
                </li>
              </ol>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="bg-[#1a1a1a] p-4 rounded-lg">
                <h4 className="text-white font-medium mb-2">Screen/Shield Termination</h4>
                <p className="text-sm text-gray-400">
                  Terminate cable screens to dedicated earth terminals. Use EMC-compliant glands
                  for 360-degree screen contact. Follow manufacturer guidance for screen pigtails
                  versus clamp termination based on frequency requirements.
                </p>
              </div>
              <div className="bg-[#1a1a1a] p-4 rounded-lg">
                <h4 className="text-white font-medium mb-2">Drain Wire Handling</h4>
                <p className="text-sm text-gray-400">
                  Connect drain wires to earth terminals using appropriately sized ferrules.
                  Never leave drain wires floating or taped back. Document screen termination
                  points on as-built drawings.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Quality Standards */}
        <section className="bg-[#242424] rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center">
              <span className="text-elec-yellow font-bold">6</span>
            </div>
            <h2 className="text-xl font-semibold text-white">Quality Standards for Terminations</h2>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>
              Quality terminations require adherence to standards, proper documentation, and
              systematic verification. Defective terminations are a leading cause of electrical
              failures and can result in fires, equipment damage, and system downtime.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <h3 className="text-elec-yellow font-medium mb-3 flex items-center gap-2">
                <Award className="w-5 h-5" />
                Quality Verification Checklist
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="font-medium text-white">Visual Inspection</p>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>- Uniform hexagonal crimp profile</li>
                    <li>- No strand protrusion from ferrule</li>
                    <li>- Conductor fully inserted (visible)</li>
                    <li>- No insulation damage at strip point</li>
                    <li>- Correct ferrule size for conductor</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="font-medium text-white">Functional Testing</p>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>- Pull test (sample basis)</li>
                    <li>- Continuity verification</li>
                    <li>- Insulation resistance</li>
                    <li>- Torque verification (screw types)</li>
                    <li>- High-pot testing if specified</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mt-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-red-500">Common Termination Defects</p>
                  <div className="grid md:grid-cols-2 gap-4 mt-3 text-sm text-gray-300">
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

            <div className="bg-[#1a1a1a] rounded-lg p-4 mt-4">
              <h4 className="text-white font-medium mb-2">Documentation Requirements</h4>
              <p className="text-sm text-gray-400">
                Maintain records of crimp tool calibration dates, inspection results, and any
                terminations requiring rework. Quality management systems should include
                traceability from terminal to operator for critical connections. Photographic
                evidence may be required for high-reliability applications.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 rounded-lg p-6 border border-elec-yellow/30">
          <h2 className="text-xl font-bold text-elec-yellow mb-4 flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            Quick Reference Card
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-white font-medium mb-3">Ferrule Colour Code (DIN 46228-4)</h3>
              <div className="bg-[#1a1a1a] rounded-lg p-3 text-sm">
                <table className="w-full">
                  <tbody className="text-gray-300">
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
              <h3 className="text-white font-medium mb-3">Key Standards Reference</h3>
              <div className="bg-[#1a1a1a] rounded-lg p-3 text-sm space-y-2">
                <div className="text-gray-300">
                  <span className="text-elec-yellow">DIN 46228:</span> Ferrule dimensions and colour coding
                </div>
                <div className="text-gray-300">
                  <span className="text-elec-yellow">IEC 60947-7-1:</span> Terminal block specifications
                </div>
                <div className="text-gray-300">
                  <span className="text-elec-yellow">IEC 62491:</span> Cable labelling requirements
                </div>
                <div className="text-gray-300">
                  <span className="text-elec-yellow">IEC 60352-2:</span> Crimped connections
                </div>
              </div>

              <h3 className="text-white font-medium mb-3 mt-4">Crimp Quality Indicators</h3>
              <div className="bg-[#1a1a1a] rounded-lg p-3 text-sm">
                <ul className="text-gray-300 space-y-1">
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
        </section>

        {/* FAQ Section */}
        <section className="bg-[#242424] rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="bg-[#1a1a1a] rounded-lg border border-gray-700 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-4 text-left min-h-[44px] touch-manipulation"
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

        {/* Quiz Section */}
        <section className="bg-[#242424] rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">Section Quiz</h2>
          <p className="text-gray-400 mb-6">
            Test your understanding of cable termination and ferrule identification concepts.
          </p>
          <Quiz questions={quizQuestions} />
        </section>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6">
          <Button
            onClick={() => navigate('/upskilling/industrial-electrical-module-3-section-2')}
            variant="outline"
            className="min-h-[44px] touch-manipulation active:scale-[0.98] border-gray-600 text-white hover:bg-gray-700 flex items-center gap-2"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Previous: Section 2</span>
          </Button>
          <Button
            onClick={() => navigate('/upskilling/industrial-electrical-module-3-section-4')}
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

export default IndustrialElectricalModule3Section3;
