import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { useSEO } from '@/hooks/useSEO';
import {
  Cable,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Layers,
  Zap,
  Building2,
  Calculator,
  ShieldAlert,
  BookOpen,
  Flame,
  AlertTriangle,
  CheckCircle2,
  Info
} from 'lucide-react';

const IndustrialElectricalModule1Section4: React.FC = () => {
  const navigate = useNavigate();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);

  useSEO({
    title: 'Cabling, Busbar Systems & Riser Design | Industrial Electrical Module 1 Section 4',
    description: 'Master industrial cable types including SWA, MICC, and FP cables. Learn busbar trunking systems, vertical riser design, fire stopping requirements, and BS 7671 cable sizing with derating factors.',
    keywords: [
      'industrial cables',
      'SWA cable',
      'MICC cable',
      'FP cables',
      'busbar trunking',
      'riser design',
      'fire stopping',
      'BS 7671 cable sizing',
      'cable derating factors',
      'EMC segregation'
    ],
    canonicalUrl: '/upskilling/industrial-electrical/module-1/section-4'
  });

  const quickCheckQuestions = [
    {
      id: 'qc1-s4-industrial-cables',
      question: 'What is the minimum fire resistance duration required for FP200 cables in escape routes?',
      options: ['30 minutes', '60 minutes', '120 minutes', '240 minutes'],
      correctIndex: 2,
      explanation: 'FP200 (Fire Performance) cables are designed to maintain circuit integrity for a minimum of 120 minutes during a fire, which is essential for emergency lighting and fire alarm circuits in escape routes as per BS 8519.'
    },
    {
      id: 'qc2-s4-busbar-ratings',
      question: 'What IP rating is typically required for busbar trunking in an industrial environment with water spray risks?',
      options: ['IP20', 'IP44', 'IP55', 'IP65'],
      correctIndex: 2,
      explanation: 'IP55 provides protection against dust ingress and water jets from any direction, making it suitable for industrial environments where water spray or washdown may occur. IP65 would be required for more severe conditions.'
    },
    {
      id: 'qc3-s4-derating',
      question: 'When grouping 6 single-core cables in a cable tray (touching), what is the approximate derating factor from BS 7671 Table 4C1?',
      options: ['0.90', '0.72', '0.57', '0.45'],
      correctIndex: 1,
      explanation: 'According to BS 7671 Table 4C1, grouping 6 cables together (touching) in a cable tray requires a derating factor of approximately 0.72. This accounts for mutual heating between conductors.'
    }
  ];

  const quizQuestions = [
    {
      question: 'What does SWA stand for in industrial cable terminology?',
      options: [
        'Steel Wire Armoured',
        'Single Wire Assembly',
        'Shielded Wire Armoured',
        'Steel Wrapped Aluminium'
      ],
      correctAnswer: 'Steel Wire Armoured'
    },
    {
      question: 'According to BS 7671, what is the maximum ambient temperature assumption for standard cable ratings?',
      options: ['20°C', '25°C', '30°C', '35°C'],
      correctAnswer: '30°C'
    },
    {
      question: 'What fire barrier rating is typically required for cables passing through compartment floors in risers?',
      options: [
        '30 minutes',
        '60 minutes',
        'Same as the floor rating',
        '240 minutes'
      ],
      correctAnswer: 'Same as the floor rating'
    },
    {
      question: 'MICC cable uses which material for its sheath?',
      options: ['PVC', 'XLPE', 'Copper', 'Steel'],
      correctAnswer: 'Copper'
    },
    {
      question: 'What is the minimum bending radius for SWA cable as a general rule?',
      options: [
        '4 times cable diameter',
        '6 times cable diameter',
        '8 times cable diameter',
        '12 times cable diameter'
      ],
      correctAnswer: '6 times cable diameter'
    },
    {
      question: 'Which cable containment system provides the best ventilation for heat dissipation?',
      options: [
        'Cable trunking',
        'Cable ladder',
        'Conduit',
        'Cable basket'
      ],
      correctAnswer: 'Cable ladder'
    },
    {
      question: 'What spacing is required between power cables and data/signal cables for EMC compliance?',
      options: ['50mm minimum', '150mm minimum', '300mm minimum', 'No spacing required'],
      correctAnswer: '300mm minimum'
    },
    {
      question: 'Busbar trunking rated at 3200A would typically be classified as:',
      options: [
        'Lighting busbar',
        'Distribution busbar',
        'Feeder busbar',
        'Earth busbar'
      ],
      correctAnswer: 'Feeder busbar'
    },
    {
      question: 'What correction factor applies when ambient temperature is 40°C for thermoplastic (PVC) insulated cables?',
      options: ['0.87', '0.91', '0.94', '1.00'],
      correctAnswer: '0.87'
    },
    {
      question: 'When installing cables in vertical risers, at what intervals should cables be supported to prevent mechanical stress?',
      options: [
        'Every 0.5m',
        'Every 1m',
        'Every 3m',
        'Every 5m'
      ],
      correctAnswer: 'Every 3m'
    }
  ];

  const faqs = [
    {
      question: 'When should I use SWA cable versus MICC cable in industrial installations?',
      answer: 'SWA (Steel Wire Armoured) cable is the workhorse for general industrial power distribution - it\'s cost-effective, mechanically protected, and suitable for direct burial or surface mounting. Use SWA for motor feeds, distribution circuits, and external runs. MICC (Mineral Insulated Copper Clad) is reserved for critical circuits requiring fire survival, extreme temperatures (-40°C to +250°C), or where space is limited. MICC is mandatory for fire alarm circuits in some applications and is preferred in hazardous areas. MICC costs significantly more but offers unmatched durability and fire performance.'
    },
    {
      question: 'How do I calculate cable size for industrial motor circuits?',
      answer: 'For motor circuits, follow BS 7671 Section 552. Start with the motor full load current (FLC) from the nameplate or BS 7671 Table 4D1. The cable must carry at least the FLC, but also consider: 1) Starting current (typically 6-8x FLC for DOL starters) for voltage drop during start-up, 2) Apply all derating factors (grouping, ambient temperature, thermal insulation), 3) Check voltage drop doesn\'t exceed 5% total (3% for lighting), 4) Verify the protective device can handle motor starting characteristics, 5) For DOL starting, you may need to upsize cables if starting current causes excessive volt drop on long runs.'
    },
    {
      question: 'What are the fire stopping requirements for cables in risers?',
      answer: 'Fire stopping in risers must maintain the fire compartmentation of the building. Requirements under Building Regulations Approved Document B and BS 9999 include: 1) Fire barriers must match the fire rating of the floor (typically 60-120 minutes), 2) Use tested and certified fire stopping systems (e.g., fire pillows, intumescent collars, ablative coatings), 3) Maintain clearances specified by the fire stop manufacturer, 4) Document all penetrations and fire stop installations, 5) Fire stops must be inspected and certified by a competent person. Re-certification is required if cables are added or removed.'
    },
    {
      question: 'How do I select the correct busbar trunking system?',
      answer: 'Selection criteria for busbar trunking include: 1) Current rating - allow 20-30% spare capacity for future loads, 2) Short-circuit withstand rating - must exceed prospective fault current, 3) IP rating - IP55 minimum for industrial environments, 4) Tap-off positions and spacing for flexibility, 5) Fire rating if crossing compartments, 6) Voltage drop - typically <1% for feeder busbars, 7) Consider sandwich or edge-ventilated types based on installation space. Feeder busbars (800A-6300A) suit main distribution; lighting busbars (25A-63A) suit final circuits.'
    },
    {
      question: 'What EMC considerations apply to industrial cable installations?',
      answer: 'EMC (Electromagnetic Compatibility) requirements include: 1) Segregate power and data cables by minimum 300mm, or use metallic barriers, 2) Cross power and signal cables at 90° angles where crossing is unavoidable, 3) Use screened cables for sensitive circuits and ensure screens are properly earthed, 4) Install VFD/inverter output cables in separate metallic containment, 5) Earth cable containment systems at regular intervals (typically every 10m), 6) Consider SY cable (screened flexible) for instrumentation near VFDs. BS 7671 Chapter 44 and BS EN 50174 provide guidance.'
    },
    {
      question: 'What derating factors must I apply for cables in industrial cable trays?',
      answer: 'Multiple derating factors apply cumulatively: 1) Grouping factor (Table 4C1) - for touching cables on trays, factor reduces as cable count increases (e.g., 0.72 for 6 cables), 2) Ambient temperature factor (Table 4B1) - if ambient exceeds 30°C (e.g., 0.87 at 40°C for PVC), 3) Thermal insulation factor (Table 52.2) - if cables are enclosed or covered, 4) Depth of burial factor for underground cables. Calculate: Effective rating = Base rating × Ca × Cg × Ci × Cd. Always select the cable based on the derated current, then verify voltage drop with actual load current.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a] text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] border-b border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <Cable className="h-8 w-8 text-elec-yellow" />
            <span className="text-elec-yellow font-semibold">Module 1 - Section 4</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Cabling, Busbar Systems, and Riser Design
          </h1>
          <p className="text-gray-400 text-lg">
            Industrial cable selection, containment systems, and vertical distribution design
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Introduction */}
        <div className="bg-[#242424] rounded-lg p-6 mb-8 border border-gray-700">
          <div className="flex items-start gap-4">
            <Info className="h-6 w-6 text-elec-yellow flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-semibold mb-2">Section Overview</h2>
              <p className="text-gray-300">
                This section covers the critical aspects of industrial cabling infrastructure.
                You'll learn to select appropriate cable types for various applications, design
                effective containment systems, specify busbar trunking for high-current distribution,
                and ensure compliance with fire safety and EMC requirements. Understanding these
                fundamentals is essential for any industrial electrical installation.
              </p>
            </div>
          </div>
        </div>

        {/* Section 1: Industrial Cable Types */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-black rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">
              1
            </div>
            <h2 className="text-2xl font-bold">Industrial Cable Types</h2>
          </div>

          <div className="bg-[#242424] rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Cable className="h-5 w-5" />
              SWA, MICC, and FP Cables
            </h3>

            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-lg mb-2">Steel Wire Armoured (SWA) Cable</h4>
                <p className="text-gray-300 mb-3">
                  SWA cable is the most common choice for industrial power distribution. The steel wire
                  armouring provides excellent mechanical protection against impact, crushing, and rodent
                  attack, making it suitable for direct burial, surface mounting, or installation on
                  cable trays and ladders.
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                  <li>Available in 2, 3, 4, and 5 core configurations</li>
                  <li>Conductor sizes from 1.5mm² to 400mm² (and beyond for single core)</li>
                  <li>Standard voltage ratings: 600/1000V (0.6/1kV)</li>
                  <li>Minimum bending radius: 6 × overall cable diameter</li>
                  <li>Operating temperature: -40°C to +90°C (XLPE insulation)</li>
                </ul>
              </div>

              <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-600">
                <h4 className="font-semibold text-lg mb-2">Mineral Insulated Copper Clad (MICC) Cable</h4>
                <p className="text-gray-300 mb-3">
                  MICC cable consists of copper conductors surrounded by compressed magnesium oxide
                  insulation, all enclosed in a seamless copper sheath. This construction provides
                  exceptional fire resistance and durability.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-elec-yellow font-medium mb-2">Advantages:</h5>
                    <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                      <li>Indefinite fire survival (copper melts at 1083°C)</li>
                      <li>Temperature range: -40°C to +250°C continuous</li>
                      <li>Small diameter for given current rating</li>
                      <li>Waterproof and oil-resistant</li>
                      <li>Does not emit toxic fumes</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-elec-yellow font-medium mb-2">Limitations:</h5>
                    <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                      <li>Higher cost than SWA</li>
                      <li>Requires special termination skills</li>
                      <li>Hygroscopic - seals must be perfect</li>
                      <li>Limited flexibility</li>
                      <li>Specialist tools required for installation</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-2">Fire Performance (FP) Cables</h4>
                <p className="text-gray-300 mb-3">
                  FP cables (such as FP200 Gold) provide circuit integrity during fire conditions while
                  being easier to install than MICC. They are designed to BS 8519 and tested to BS EN 50200.
                </p>
                <div className="bg-red-900/20 border border-red-800 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Flame className="h-5 w-5 text-red-500 flex-shrink-0 mt-1" />
                    <div>
                      <h5 className="font-semibold text-red-400 mb-1">Fire Resistance Ratings</h5>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li><strong>FP200:</strong> 120 minutes at 830°C with mechanical shock</li>
                        <li><strong>Standard FP:</strong> 30-60 minutes fire resistance</li>
                        <li><strong>Enhanced FP:</strong> 120+ minutes with water spray test</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Inline Check 1 */}
        <div className="mb-10">
          <InlineCheck
            id={quickCheckQuestions[0].id}
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
        </div>

        {/* Section 2: Cable Containment Systems */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-black rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">
              2
            </div>
            <h2 className="text-2xl font-bold">Cable Containment Systems</h2>
          </div>

          <div className="bg-[#242424] rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Layers className="h-5 w-5" />
              Tray, Ladder, and Trunking
            </h3>

            <div className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-600">
                  <h4 className="font-semibold text-elec-yellow mb-2">Cable Tray</h4>
                  <p className="text-gray-300 text-sm mb-2">
                    Perforated or solid metal trays for supporting cables. Available in various widths
                    (100mm to 900mm) and depths.
                  </p>
                  <ul className="text-gray-400 text-xs space-y-1">
                    <li>• Good for horizontal runs</li>
                    <li>• Moderate ventilation</li>
                    <li>• Medium load capacity</li>
                    <li>• Cost-effective solution</li>
                  </ul>
                </div>

                <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-600">
                  <h4 className="font-semibold text-elec-yellow mb-2">Cable Ladder</h4>
                  <p className="text-gray-300 text-sm mb-2">
                    Open rung construction providing maximum ventilation and support for heavy cables.
                  </p>
                  <ul className="text-gray-400 text-xs space-y-1">
                    <li>• Best heat dissipation</li>
                    <li>• Highest load capacity</li>
                    <li>• Ideal for large SWA runs</li>
                    <li>• Vertical riser use</li>
                  </ul>
                </div>

                <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-600">
                  <h4 className="font-semibold text-elec-yellow mb-2">Cable Trunking</h4>
                  <p className="text-gray-300 text-sm mb-2">
                    Enclosed containment with removable lids, providing protection and segregation.
                  </p>
                  <ul className="text-gray-400 text-xs space-y-1">
                    <li>• Full mechanical protection</li>
                    <li>• Internal segregation possible</li>
                    <li>• Neat appearance</li>
                    <li>• Limited ventilation</li>
                  </ul>
                </div>
              </div>

              <div className="bg-amber-900/20 border border-amber-700 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-1" />
                  <div>
                    <h5 className="font-semibold text-amber-400 mb-2">Installation Requirements (BS 7671)</h5>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Cable tray fill factor: Maximum 45% of cross-sectional area</li>
                      <li>• Support spacing: 3m maximum for horizontal runs</li>
                      <li>• Earth bonding: Continuous earth path required throughout</li>
                      <li>• Fixings: Fire-rated fixings where crossing fire barriers</li>
                      <li>• Expansion joints: Required for runs exceeding 25m</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-3">Containment Material Selection</h4>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left py-2 text-elec-yellow">Material</th>
                      <th className="text-left py-2 text-elec-yellow">Application</th>
                      <th className="text-left py-2 text-elec-yellow">Finish</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-gray-700">
                      <td className="py-2">Hot-dip galvanised steel</td>
                      <td className="py-2">Standard industrial</td>
                      <td className="py-2">HDG (Z275)</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2">Stainless steel (316)</td>
                      <td className="py-2">Corrosive/food processing</td>
                      <td className="py-2">Brushed/polished</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2">Aluminium</td>
                      <td className="py-2">Lightweight/chemical plants</td>
                      <td className="py-2">Anodised</td>
                    </tr>
                    <tr>
                      <td className="py-2">GRP/FRP</td>
                      <td className="py-2">Highly corrosive environments</td>
                      <td className="py-2">Gel coat</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Busbar Trunking Systems */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-black rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">
              3
            </div>
            <h2 className="text-2xl font-bold">Busbar Trunking Systems and Ratings</h2>
          </div>

          <div className="bg-[#242424] rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Zap className="h-5 w-5" />
              High-Current Distribution Systems
            </h3>

            <div className="space-y-6">
              <p className="text-gray-300">
                Busbar trunking systems provide efficient, flexible power distribution for industrial
                facilities. They offer advantages over traditional cable systems including lower
                installation time, easier modification, and better heat dissipation per amp.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-600">
                  <h4 className="font-semibold text-elec-yellow mb-3">Busbar Categories</h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-white font-medium">Feeder Busbar:</span>
                      <span className="text-gray-300"> 800A - 6300A</span>
                      <p className="text-gray-400 text-xs">Main distribution from transformer to switchboards</p>
                    </div>
                    <div>
                      <span className="text-white font-medium">Distribution Busbar:</span>
                      <span className="text-gray-300"> 100A - 1600A</span>
                      <p className="text-gray-400 text-xs">Secondary distribution with tap-off points</p>
                    </div>
                    <div>
                      <span className="text-white font-medium">Lighting Busbar:</span>
                      <span className="text-gray-300"> 25A - 63A</span>
                      <p className="text-gray-400 text-xs">Final circuit distribution for lighting</p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-600">
                  <h4 className="font-semibold text-elec-yellow mb-3">IP Ratings for Busbar</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">IP20</span>
                      <span className="text-gray-400">Indoor, clean environments</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">IP40</span>
                      <span className="text-gray-400">Indoor, minor dust</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">IP55</span>
                      <span className="text-gray-400">Industrial, water jets</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">IP65</span>
                      <span className="text-gray-400">Outdoor, dust-tight</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">IP68</span>
                      <span className="text-gray-400">Submersible</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-3">Technical Specifications</h4>
                <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-600">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="text-left py-2 text-elec-yellow">Parameter</th>
                        <th className="text-left py-2 text-elec-yellow">Typical Values</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      <tr className="border-b border-gray-700">
                        <td className="py-2">Voltage rating</td>
                        <td className="py-2">Up to 1000V AC / 1500V DC</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="py-2">Short-circuit withstand (Icw)</td>
                        <td className="py-2">25kA - 150kA for 1 second</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="py-2">Peak withstand (Ipk)</td>
                        <td className="py-2">2.2 × Icw</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="py-2">Voltage drop</td>
                        <td className="py-2">{'<'}1% at rated current</td>
                      </tr>
                      <tr>
                        <td className="py-2">Fire resistance</td>
                        <td className="py-2">Up to 120 minutes (fire-rated types)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-green-900/20 border border-green-700 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <h5 className="font-semibold text-green-400 mb-2">Busbar Advantages</h5>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Faster installation (up to 50% time saving)</li>
                      <li>• Easy reconfiguration and tap-off additions</li>
                      <li>• Better thermal management than bundled cables</li>
                      <li>• Reduced fire load compared to PVC cables</li>
                      <li>• Lower impedance = better voltage regulation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Inline Check 2 */}
        <div className="mb-10">
          <InlineCheck
            id={quickCheckQuestions[1].id}
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
        </div>

        {/* Section 4: Vertical Riser Design */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-black rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">
              4
            </div>
            <h2 className="text-2xl font-bold">Vertical Riser Design and Fire Stopping</h2>
          </div>

          <div className="bg-[#242424] rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Multi-Storey Distribution
            </h3>

            <div className="space-y-6">
              <p className="text-gray-300">
                Electrical risers provide the vertical backbone for power distribution in multi-storey
                buildings. Proper design must address cable support, fire compartmentation, accessibility,
                and future expansion requirements.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-lg mb-3">Riser Design Principles</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />
                      <span>Size for 30-50% spare capacity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />
                      <span>Minimum 600mm working space in front of equipment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />
                      <span>Support cables every 3m vertically</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />
                      <span>Dedicated riser for each service type where possible</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />
                      <span>Adequate ventilation to prevent heat build-up</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-red-900/20 border border-red-800 rounded-lg p-4">
                  <h4 className="font-semibold text-red-400 mb-3 flex items-center gap-2">
                    <Flame className="h-5 w-5" />
                    Fire Stopping Requirements
                  </h4>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li><strong>Fire barrier rating:</strong> Must match floor fire rating (typically 60-120 mins)</li>
                    <li><strong>Penetration sealing:</strong> All cable penetrations must be fire stopped</li>
                    <li><strong>Approved systems:</strong> Use tested/certified fire stop products</li>
                    <li><strong>Inspection:</strong> Third-party certification required</li>
                    <li><strong>Documentation:</strong> Maintain as-built records of all fire stops</li>
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-3">Fire Stopping Methods</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-600">
                    <h5 className="text-elec-yellow font-medium mb-2">Passive Fire Protection</h5>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Fire pillows (removable, reusable)</li>
                      <li>• Intumescent sealants and mastics</li>
                      <li>• Fire batts (mineral wool boards)</li>
                      <li>• Ablative coatings</li>
                      <li>• Fire collars for plastic pipes</li>
                    </ul>
                  </div>
                  <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-600">
                    <h5 className="text-elec-yellow font-medium mb-2">Installation Standards</h5>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• BS 476 fire test standards</li>
                      <li>• BS EN 1366-3 penetration seals</li>
                      <li>• Building Regulations Approved Doc B</li>
                      <li>• Third-party certification schemes</li>
                      <li>• Manufacturer installation guides</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-amber-900/20 border border-amber-700 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-1" />
                  <div>
                    <h5 className="font-semibold text-amber-400 mb-2">Critical Fire Safety Points</h5>
                    <p className="text-gray-300 text-sm">
                      Fire stopping must be reinstated whenever cables are added or removed. Any breach
                      in fire compartmentation can allow fire and smoke spread between floors, potentially
                      with fatal consequences. Always use competent installers and ensure proper certification.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Cable Sizing */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-black rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">
              5
            </div>
            <h2 className="text-2xl font-bold">Cable Sizing for Industrial Loads</h2>
          </div>

          <div className="bg-[#242424] rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              BS 7671 Cable Selection Process
            </h3>

            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-lg mb-3">Cable Sizing Formula</h4>
                <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-600 mb-4">
                  <p className="text-elec-yellow font-mono text-center text-lg mb-2">
                    I<sub>z</sub> ≥ I<sub>n</sub> ≥ I<sub>b</sub>
                  </p>
                  <p className="text-elec-yellow font-mono text-center text-lg mb-4">
                    I<sub>t</sub> = I<sub>b</sub> / (C<sub>a</sub> × C<sub>g</sub> × C<sub>i</sub> × C<sub>c</sub>)
                  </p>
                  <div className="text-gray-300 text-sm space-y-1">
                    <p><strong>I<sub>b</sub></strong> = Design current of circuit</p>
                    <p><strong>I<sub>n</sub></strong> = Nominal current of protective device</p>
                    <p><strong>I<sub>z</sub></strong> = Current-carrying capacity of cable</p>
                    <p><strong>I<sub>t</sub></strong> = Tabulated current rating required</p>
                    <p><strong>C<sub>a</sub></strong> = Ambient temperature correction factor</p>
                    <p><strong>C<sub>g</sub></strong> = Grouping correction factor</p>
                    <p><strong>C<sub>i</sub></strong> = Thermal insulation factor</p>
                    <p><strong>C<sub>c</sub></strong> = BS 3036 fuse factor (0.725) if applicable</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-3">Derating Factors (Key Tables)</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-600">
                    <h5 className="text-elec-yellow font-medium mb-2">Table 4B1: Ambient Temperature (PVC)</h5>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-600">
                          <th className="text-left py-1">Temp °C</th>
                          <th className="text-left py-1">Factor (C<sub>a</sub>)</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-300">
                        <tr><td>25</td><td>1.03</td></tr>
                        <tr><td>30</td><td>1.00</td></tr>
                        <tr><td>35</td><td>0.94</td></tr>
                        <tr><td>40</td><td>0.87</td></tr>
                        <tr><td>45</td><td>0.79</td></tr>
                        <tr><td>50</td><td>0.71</td></tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-600">
                    <h5 className="text-elec-yellow font-medium mb-2">Table 4C1: Grouping (Touching on Tray)</h5>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-600">
                          <th className="text-left py-1">No. of Cables</th>
                          <th className="text-left py-1">Factor (C<sub>g</sub>)</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-300">
                        <tr><td>1</td><td>1.00</td></tr>
                        <tr><td>2</td><td>0.80</td></tr>
                        <tr><td>3</td><td>0.73</td></tr>
                        <tr><td>4</td><td>0.72</td></tr>
                        <tr><td>6</td><td>0.72</td></tr>
                        <tr><td>9</td><td>0.70</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-3">Worked Example</h4>
                <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
                  <p className="text-gray-300 mb-3">
                    <strong>Scenario:</strong> 45kW motor, 400V 3-phase, 30m run, 40°C ambient,
                    6 cables grouped on tray, 50A MCB protection.
                  </p>
                  <div className="space-y-2 text-sm text-gray-300">
                    <p><strong>Step 1:</strong> Calculate I<sub>b</sub> = 45000 / (√3 × 400 × 0.85) = 76.4A</p>
                    <p><strong>Step 2:</strong> Check I<sub>n</sub> ≥ I<sub>b</sub>: Need larger MCB, use 80A</p>
                    <p><strong>Step 3:</strong> Apply corrections: C<sub>a</sub> = 0.87, C<sub>g</sub> = 0.72</p>
                    <p><strong>Step 4:</strong> I<sub>t</sub> = 76.4 / (0.87 × 0.72) = 122A minimum</p>
                    <p><strong>Step 5:</strong> Select cable from Table 4D4A with I<sub>z</sub> ≥ 122A</p>
                    <p><strong>Result:</strong> 35mm² 4-core SWA (I<sub>z</sub> = 126A) ✓</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-3">Voltage Drop Verification</h4>
                <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-600">
                  <p className="text-gray-300 text-sm mb-2">
                    Maximum voltage drop (BS 7671): <strong>5%</strong> total (3% for lighting)
                  </p>
                  <p className="text-elec-yellow font-mono text-center mb-2">
                    Voltage Drop = (mV/A/m × I<sub>b</sub> × L) / 1000
                  </p>
                  <p className="text-gray-300 text-sm">
                    For 35mm² 4-core SWA at 76.4A over 30m: VD = 1.1 × 76.4 × 30 / 1000 = 2.52V (0.63%)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Inline Check 3 */}
        <div className="mb-10">
          <InlineCheck
            id={quickCheckQuestions[2].id}
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
        </div>

        {/* Section 6: EMC and Segregation */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-elec-yellow text-black rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">
              6
            </div>
            <h2 className="text-2xl font-bold">EMC and Segregation Requirements</h2>
          </div>

          <div className="bg-[#242424] rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <ShieldAlert className="h-5 w-5" />
              Electromagnetic Compatibility
            </h3>

            <div className="space-y-6">
              <p className="text-gray-300">
                Industrial environments contain many sources of electromagnetic interference (EMI) that
                can disrupt sensitive equipment. Proper cable segregation and installation practices
                are essential for EMC compliance and reliable system operation.
              </p>

              <div>
                <h4 className="font-semibold text-lg mb-3">Cable Segregation Categories (BS 7671)</h4>
                <div className="space-y-3">
                  <div className="bg-[#1a1a1a] p-4 rounded-lg border border-red-800">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-4 h-4 bg-red-500 rounded"></div>
                      <span className="font-semibold text-red-400">Category 1 - High Voltage</span>
                    </div>
                    <p className="text-gray-300 text-sm">
                      Fire alarm, emergency lighting, and safety circuits. Must be segregated from
                      all other categories or use fire-rated cables.
                    </p>
                  </div>

                  <div className="bg-[#1a1a1a] p-4 rounded-lg border border-orange-700">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-4 h-4 bg-orange-500 rounded"></div>
                      <span className="font-semibold text-orange-400">Category 2 - Mains Power</span>
                    </div>
                    <p className="text-gray-300 text-sm">
                      Power circuits, lighting, socket outlets. Standard LV distribution cables.
                    </p>
                  </div>

                  <div className="bg-[#1a1a1a] p-4 rounded-lg border border-yellow-700">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                      <span className="font-semibold text-yellow-400">Category 3 - Telecommunications</span>
                    </div>
                    <p className="text-gray-300 text-sm">
                      Data cables, telephone, IT networks. Require separation from power cables.
                    </p>
                  </div>

                  <div className="bg-[#1a1a1a] p-4 rounded-lg border border-green-700">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-4 h-4 bg-green-500 rounded"></div>
                      <span className="font-semibold text-green-400">Category 4 - Control & Instrumentation</span>
                    </div>
                    <p className="text-gray-300 text-sm">
                      Analogue signals, sensors, PLCs. Most sensitive to interference.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-3">Segregation Distances</h4>
                <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-600">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="text-left py-2 text-elec-yellow">Circuit Types</th>
                        <th className="text-left py-2 text-elec-yellow">Minimum Separation</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      <tr className="border-b border-gray-700">
                        <td className="py-2">Power to Data (unscreened)</td>
                        <td className="py-2">300mm minimum</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="py-2">Power to Data (screened)</td>
                        <td className="py-2">50mm minimum</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="py-2">VFD output to sensitive circuits</td>
                        <td className="py-2">500mm or screened conduit</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="py-2">Fire alarm to other circuits</td>
                        <td className="py-2">Separate containment or FP cable</td>
                      </tr>
                      <tr>
                        <td className="py-2">Crossing angle (unavoidable)</td>
                        <td className="py-2">90° crossings only</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-600">
                  <h4 className="font-semibold text-elec-yellow mb-3">EMC Best Practices</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Use screened cables for VFD motor connections</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Earth cable screens at both ends (360° termination)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Bond metallic containment to earth every 10m</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Use EMC glands for screened cable terminations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Install output filters on VFDs for long cable runs</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-amber-900/20 border border-amber-700 rounded-lg p-4">
                  <h4 className="font-semibold text-amber-400 mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Common EMC Issues
                  </h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• VFD switching noise on motor cables</li>
                    <li>• Data errors from parallel power runs</li>
                    <li>• Sensor drift from induced voltages</li>
                    <li>• PLC communication failures</li>
                    <li>• Nuisance tripping of RCDs</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="mb-10">
          <div className="bg-gradient-to-br from-[#2a2a2a] to-[#1f1f1f] rounded-lg p-6 border-2 border-elec-yellow">
            <h3 className="text-xl font-bold text-elec-yellow mb-4 flex items-center gap-2">
              <BookOpen className="h-6 w-6" />
              Quick Reference Card
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-white mb-2">Cable Selection Checklist</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>□ Calculate design current (I<sub>b</sub>)</li>
                  <li>□ Select protective device (I<sub>n</sub> ≥ I<sub>b</sub>)</li>
                  <li>□ Apply derating factors (C<sub>a</sub>, C<sub>g</sub>, C<sub>i</sub>)</li>
                  <li>□ Select cable from appropriate table</li>
                  <li>□ Verify voltage drop {'<'}5% (3% lighting)</li>
                  <li>□ Check fault current withstand</li>
                  <li>□ Verify CPC size adequate</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-2">Key BS 7671 Tables</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• 4B1/4B2 - Ambient temperature factors</li>
                  <li>• 4C1/4C2 - Grouping factors</li>
                  <li>• 4D1A-4D5 - Current ratings</li>
                  <li>• 4E1A-4E4A - Voltage drop values</li>
                  <li>• 52.2 - Thermal insulation factors</li>
                  <li>• 54.7 - Minimum CPC sizes</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-2">Fire Rating Standards</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• BS EN 50200 - Fire resistance test</li>
                  <li>• BS 8519 - Fire resistant cables</li>
                  <li>• BS 476 - Fire test methods</li>
                  <li>• FP200: 120 mins @ 830°C</li>
                  <li>• MICC: Indefinite fire survival</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-2">Busbar Quick Specs</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Lighting: 25A - 63A</li>
                  <li>• Distribution: 100A - 1600A</li>
                  <li>• Feeder: 800A - 6300A</li>
                  <li>• IP55 minimum for industrial</li>
                  <li>• Voltage drop {'<'}1% rated current</li>
                </ul>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-600">
              <h4 className="font-semibold text-white mb-2">Segregation Memory Aid</h4>
              <p className="text-gray-300 text-sm">
                <strong className="text-elec-yellow">300mm rule:</strong> Minimum separation between
                unscreened power and data cables. Use metallic barriers or screened cables to reduce
                to 50mm. Always cross at 90°.
              </p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Info className="h-6 w-6 text-elec-yellow" />
            Frequently Asked Questions
          </h3>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-[#242424] rounded-lg border border-gray-700 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-4 text-left min-h-[44px] touch-manipulation hover:bg-[#2a2a2a] transition-colors"
                >
                  <span className="font-medium text-white pr-4">{faq.question}</span>
                  {expandedFAQ === index ? (
                    <ChevronUp className="h-5 w-5 text-elec-yellow flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-elec-yellow flex-shrink-0" />
                  )}
                </button>
                {expandedFAQ === index && (
                  <div className="px-4 pb-4 pt-0">
                    <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Quiz Section */}
        <section className="mb-10">
          <div className="bg-[#242424] rounded-lg p-6 border border-gray-700">
            <h3 className="text-2xl font-bold mb-4 text-center">Test Your Knowledge</h3>
            <p className="text-gray-400 text-center mb-6">
              Complete this 10-question quiz to reinforce your understanding of industrial cabling,
              busbar systems, and riser design.
            </p>

            {!showQuiz ? (
              <div className="text-center">
                <Button
                  onClick={() => setShowQuiz(true)}
                  className="bg-elec-yellow text-black hover:bg-yellow-500 min-h-[44px] px-8 touch-manipulation font-semibold"
                >
                  Start Quiz
                </Button>
              </div>
            ) : (
              <Quiz
                questions={quizQuestions}
                moduleId="industrial-electrical-m1s4"
                onComplete={(score) => {
                  console.log(`Quiz completed with score: ${score}/${quizQuestions.length}`);
                }}
              />
            )}
          </div>
        </section>

        {/* Navigation */}
        <nav className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-gray-700">
          <Button
            onClick={() => navigate('/upskilling/industrial-electrical/module-1/section-3')}
            variant="outline"
            className="min-h-[44px] touch-manipulation border-gray-600 hover:border-elec-yellow hover:text-elec-yellow flex items-center gap-2"
          >
            <ChevronLeft className="h-5 w-5" />
            <div className="text-left">
              <div className="text-xs text-gray-400">Previous</div>
              <div>Section 3: Distribution Systems</div>
            </div>
          </Button>

          <Button
            onClick={() => navigate('/upskilling/industrial-electrical/module-1/section-5')}
            className="min-h-[44px] touch-manipulation bg-elec-yellow text-black hover:bg-yellow-500 flex items-center gap-2"
          >
            <div className="text-right">
              <div className="text-xs opacity-80">Next</div>
              <div>Section 5: Motor Control</div>
            </div>
            <ChevronRight className="h-5 w-5" />
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default IndustrialElectricalModule1Section4;
