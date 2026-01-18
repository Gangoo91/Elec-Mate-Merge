import React from 'react';
import { ArrowLeft, Zap, CheckCircle, AlertTriangle, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import useSEO from '@/hooks/useSEO';

const IndustrialElectricalModule1Section5: React.FC = () => {
  useSEO({
    title: 'Earthing and Bonding Strategies | Industrial Electrical Module 1 Section 5 | Elec-Mate',
    description: 'Master industrial earthing and bonding strategies including TN-S/TN-C-S systems, earth fault loop impedance, lightning protection, and clean earth systems per BS 7671 Chapter 54.',
    keywords: [
      'industrial earthing',
      'bonding strategies',
      'TN-S system',
      'TN-C-S system',
      'earth fault loop impedance',
      'Zs calculations',
      'lightning protection',
      'BS 7671 Chapter 54',
      'BS EN 62305',
      'clean earth',
      'technical earth',
      'functional earthing',
      'main earthing terminal',
      'supplementary bonding'
    ],
    canonical: '/study-centre/upskilling/industrial-electrical/module-1/section-5'
  });

  const quickCheckQuestions = [
    {
      id: 'qc1-earthing-tns',
      question: 'In a TN-S system, how is the earth provided to the installation?',
      options: [
        'Combined with the neutral conductor (PEN)',
        'Via a separate protective conductor from the supply',
        'Through an earth electrode at the premises',
        'Using the metallic water pipe only'
      ],
      correctIndex: 1,
      explanation: 'In a TN-S (Terre-Neutre-Separe) system, the earth is provided via a separate protective conductor from the supply transformer. This gives a dedicated earth path with typically low impedance, making it ideal for industrial installations requiring reliable fault clearance.'
    },
    {
      id: 'qc2-bonding-requirement',
      question: 'What is the minimum cross-sectional area for main protective bonding conductors to extraneous-conductive-parts in a TN system with 25mm squared line conductors?',
      options: [
        '4mm squared',
        '6mm squared',
        '10mm squared',
        '16mm squared'
      ],
      correctIndex: 2,
      explanation: 'According to BS 7671 Table 54.8, main protective bonding conductors must be at least 10mm squared for installations with line conductors of 25mm squared. The bonding conductor CSA is related to the supply conductor size, with minimum values of 6mm squared, 10mm squared, or 25mm squared depending on the supply neutral size.'
    },
    {
      id: 'qc3-zs-calculation',
      question: 'For a 400V three-phase motor circuit protected by a 63A Type D MCB, what is the maximum Zs at the design stage (using 0.8 multiplier)?',
      options: [
        '0.54 ohms',
        '0.68 ohms',
        '0.43 ohms',
        '0.85 ohms'
      ],
      correctIndex: 2,
      explanation: 'For a 63A Type D MCB, the maximum tabulated Zs is 0.54 ohms (from BS 7671 Table 41.3). At design stage, we apply the 0.8 multiplier: 0.54 x 0.8 = 0.432 ohms (rounded to 0.43 ohms). This accounts for conductor temperature rise under fault conditions.'
    }
  ];

  const quizQuestions = [
    {
      question: 'What does PEN stand for in a TN-C-S earthing system?',
      options: [
        'Primary Earth Neutral',
        'Protective Earth Neutral',
        'Protective Earthed Neutral',
        'Primary Earthing Network'
      ],
      correctAnswer: 'Protective Earthed Neutral'
    },
    {
      question: 'According to BS 7671 Regulation 542.4.1, what is the maximum resistance for a TT system earth electrode in normal conditions?',
      options: [
        '100 ohms',
        '200 ohms',
        'No maximum specified - depends on RCD rating',
        '20 ohms'
      ],
      correctAnswer: 'No maximum specified - depends on RCD rating'
    },
    {
      question: 'What is the main purpose of supplementary bonding in an industrial motor installation?',
      options: [
        'To improve motor efficiency',
        'To reduce earth fault loop impedance locally',
        'To provide a parallel neutral path',
        'To increase motor starting current'
      ],
      correctAnswer: 'To reduce earth fault loop impedance locally'
    },
    {
      question: 'In BS EN 62305, what is a Lightning Protection Zone (LPZ)?',
      options: [
        'The area where lightning is most likely to strike',
        'A zone where electromagnetic environment is defined',
        'The distance from the lightning rod',
        'A restricted area during storms'
      ],
      correctAnswer: 'A zone where electromagnetic environment is defined'
    },
    {
      question: 'What is the typical earth electrode resistance target for a clean earth system serving sensitive IT equipment?',
      options: [
        'Less than 200 ohms',
        'Less than 100 ohms',
        'Less than 10 ohms',
        'Less than 1 ohm'
      ],
      correctAnswer: 'Less than 10 ohms'
    },
    {
      question: 'According to BS 7671, what is the disconnection time requirement for a 400V final circuit in a TN system?',
      options: [
        '0.2 seconds',
        '0.4 seconds',
        '5 seconds',
        '1 second'
      ],
      correctAnswer: '0.4 seconds'
    },
    {
      question: 'What type of SPD (Surge Protective Device) should be installed at the main distribution board?',
      options: [
        'Type 3',
        'Type 2',
        'Type 1',
        'Type 4'
      ],
      correctAnswer: 'Type 1'
    },
    {
      question: 'For a motor with exposed-conductive-parts simultaneously accessible with structural steelwork, what is the maximum touch voltage permitted without supplementary bonding?',
      options: [
        '230V',
        '120V',
        '50V',
        '25V'
      ],
      correctAnswer: '50V'
    },
    {
      question: 'What is the purpose of a technical earth (TE) bar in a data centre?',
      options: [
        'To provide lightning protection only',
        'To create an isolated reference point for sensitive equipment',
        'To replace the main earthing terminal',
        'To bond all metalwork together'
      ],
      correctAnswer: 'To create an isolated reference point for sensitive equipment'
    },
    {
      question: 'According to BS 7671 Chapter 54, how should the main earthing terminal be connected in a TN-C-S system?',
      options: [
        'To a local earth electrode only',
        'To the PEN conductor of the supply',
        'To the water main only',
        'To the gas main'
      ],
      correctAnswer: 'To the PEN conductor of the supply'
    }
  ];

  const faqs = [
    {
      question: 'Why is TN-S preferred over TN-C-S for industrial installations with sensitive equipment?',
      answer: 'TN-S provides a dedicated earth conductor separate from neutral, eliminating neutral current flow through the earth path. In TN-C-S, the combined PEN conductor carries both neutral current and provides earth reference, which can cause electromagnetic interference affecting PLCs, drives, and instrumentation. TN-S also eliminates the risk of a broken PEN conductor putting the installation earth at mains potential - a critical safety consideration for large installations with long cable runs.'
    },
    {
      question: 'How do I calculate earth fault loop impedance (Zs) for a three-phase industrial circuit?',
      answer: 'Zs = Ze + (R1 + R2), where Ze is external earth fault loop impedance (typically 0.35 ohms for TN-S, 0.8 ohms for TN-C-S), R1 is the phase conductor resistance, and R2 is the CPC resistance. For design purposes, multiply tabulated maximum Zs by 0.8 to account for temperature rise. For three-phase circuits, use the single-phase to earth voltage (230V) in calculations. Verify with Zs less than (Uo/Ia) where Ia is the current causing automatic disconnection within required time.'
    },
    {
      question: 'What is the difference between protective bonding and functional bonding?',
      answer: 'Protective bonding (per BS 7671) connects extraneous-conductive-parts to the main earthing terminal for safety during faults - it ensures touch voltages remain within safe limits. Functional bonding connects equipment for operational purposes, such as EMC screening or signal reference. Clean earth and technical earth systems are functional bonding applications. Both may be required simultaneously but serve different purposes and may have different conductor sizing requirements.'
    },
    {
      question: 'When is supplementary bonding required for industrial motors?',
      answer: 'Supplementary bonding is required when: (1) automatic disconnection cannot be achieved within required times due to high Zs; (2) simultaneously accessible exposed-conductive-parts and extraneous-conductive-parts could have dangerous potential differences during faults; (3) required by specific installation conditions such as agricultural premises or construction sites. BS 7671 Regulation 415.2.2 specifies supplementary bonding conductor sizing based on the smaller CPC of the connected circuits, with minimum 2.5mm squared if mechanically protected or 4mm squared if not.'
    },
    {
      question: 'How should surge protection devices (SPDs) be coordinated in an industrial installation?',
      answer: 'SPD coordination uses a cascaded approach: Type 1 (Class I) at service entrance handles direct lightning currents (10/350 microsecond waveform, up to 100kA); Type 2 (Class II) at sub-distribution boards handles induced surges (8/20 microsecond waveform, up to 40kA); Type 3 (Class III) at equipment provides fine protection. Minimum 10m cable separation between SPD types ensures proper energy coordination. All SPDs must have short earth connections (less than 0.5m) to minimize inductive voltage drop during surge events.'
    },
    {
      question: 'What are the requirements for lightning protection on industrial buildings per BS EN 62305?',
      answer: 'BS EN 62305 requires risk assessment to determine Lightning Protection Level (LPL I-IV). System components include: air termination network (rods, mesh, catenary), down conductors (minimum 2, typically every 10-20m depending on LPL), earth termination system (Type A rods or Type B ring/foundation earth with resistance less than 10 ohms). Bonding of services at building entry is mandatory. Separation distance calculations prevent dangerous sparking. Internal systems (LEMP) protect electronics through SPDs and cable routing/shielding strategies.'
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <span className="text-xs text-muted-foreground">Module 1 - Section 5 of 5</span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-10">
        {/* Hero Title */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-elec-yellow/10 mb-2">
            <Zap className="w-6 h-6 text-elec-yellow" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Earthing and Bonding Strategies</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            BS 7671 Chapter 54 compliance for industrial installations
          </p>
        </div>

        {/* Quick Summary */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
            <h3 className="font-semibold text-sm mb-1">Key Topics</h3>
            <p className="text-sm text-muted-foreground">TN-S vs TN-C-S systems, main earthing terminal, supplementary bonding, Zs calculations</p>
          </div>
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
            <h3 className="font-semibold text-sm mb-1">Standards</h3>
            <p className="text-sm text-muted-foreground">BS 7671 Chapter 54, BS EN 62305, Section 534 SPDs</p>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-elec-yellow" />
            Learning Outcomes
          </h2>
          <div className="space-y-2">
            {[
              'Understand TN-S and TN-C-S earthing systems for industrial installations',
              'Apply BS 7671 requirements for main earthing terminal and bonding conductors',
              'Calculate and verify earth fault loop impedance (Zs) for industrial circuits',
              'Design supplementary bonding for motors and industrial equipment',
              'Implement lightning protection and SPD coordination per BS EN 62305',
              'Apply clean earth and technical earth concepts for sensitive equipment'
            ].map((outcome, idx) => (
              <div key={idx} className="flex items-start gap-3 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">{outcome}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 1: TN-S and TN-C-S Systems */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            TN-S and TN-C-S Systems in Industrial Settings
          </h2>

          <p className="text-muted-foreground leading-relaxed">
            Industrial installations in the UK typically receive supply via <strong className="text-foreground">TN-S</strong> (separate earth) or <strong className="text-foreground">TN-C-S</strong> (PME - Protective Multiple Earthing) systems. The choice significantly impacts installation design, safety provisions, and equipment compatibility.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-elec-yellow/5 border-l-2 border-green-500/50 rounded-r-lg p-4">
              <h4 className="font-semibold text-sm text-green-400 mb-2">TN-S System</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>Separate protective conductor (PE) from supply</li>
                <li>Typically Ze = 0.35 ohms or less</li>
                <li>No neutral current in earth path</li>
                <li>Preferred for EMC-sensitive installations</li>
                <li>Cable sheath or separate conductor provides earth</li>
              </ul>
            </div>
            <div className="bg-elec-yellow/5 border-l-2 border-orange-500/50 rounded-r-lg p-4">
              <h4 className="font-semibold text-sm text-orange-400 mb-2">TN-C-S System (PME)</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>Combined PEN conductor in supply</li>
                <li>Typically Ze = 0.35 ohms (max 0.8 ohms per DNO)</li>
                <li>Neutral current flows through earth reference</li>
                <li>Requires additional earth electrode (Reg 544.1.1)</li>
                <li>Special considerations for outbuildings</li>
              </ul>
            </div>
          </div>

          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm text-red-400 mb-1">PME Restrictions</h4>
                <p className="text-sm text-muted-foreground">
                  TN-C-S (PME) earthing has restrictions for certain installations including petrol stations, caravan parks, swimming pools, and locations where earth electrode resistance is critical. A broken PEN conductor can result in exposed-conductive-parts rising to dangerous voltages. BS 7671 Regulation 411.4.2 details specific requirements.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Check 1 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Main Earthing Terminal and Bonding */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Main Earthing Terminal and Bonding Requirements
          </h2>

          <p className="text-muted-foreground leading-relaxed">
            The <strong className="text-foreground">Main Earthing Terminal (MET)</strong> is the central connection point for all protective conductors in an installation. BS 7671 Chapter 54 mandates specific arrangements and sizing requirements for industrial installations.
          </p>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
            <h4 className="font-semibold text-sm mb-3">MET Connection Requirements</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span>Earthing conductor (to means of earthing)</span>
                <span className="text-elec-yellow">Table 54.7</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span>Main protective bonding conductors</span>
                <span className="text-elec-yellow">Table 54.8</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span>Circuit protective conductors (CPCs)</span>
                <span className="text-elec-yellow">From distribution boards</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span>Functional earth conductors</span>
                <span className="text-elec-yellow">If required</span>
              </div>
            </div>
          </div>

          <h3 className="font-semibold text-base mt-6">Main Protective Bonding Conductors</h3>
          <p className="text-muted-foreground leading-relaxed">
            Main bonding connects <strong className="text-foreground">extraneous-conductive-parts</strong> to the MET. In industrial premises, this typically includes:
          </p>

          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Structural steelwork',
              'Water service pipes',
              'Gas service pipes (after meter)',
              'Compressed air pipework',
              'Cable containment systems',
              'HVAC ductwork'
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span className="text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mt-4">
            <h4 className="font-semibold text-sm text-blue-400 mb-3">Conductor Sizing (Table 54.8)</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 text-muted-foreground">Supply Neutral CSA</th>
                    <th className="text-left py-2 text-muted-foreground">Minimum Bonding CSA</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-white/5">
                    <td className="py-2">&lt;= 35mm squared Cu</td>
                    <td className="py-2 text-elec-yellow">10mm squared Cu</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2">&gt; 35mm squared to &lt;= 50mm squared Cu</td>
                    <td className="py-2 text-elec-yellow">16mm squared Cu</td>
                  </tr>
                  <tr>
                    <td className="py-2">&gt; 50mm squared Cu</td>
                    <td className="py-2 text-elec-yellow">25mm squared Cu</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Quick Check 2 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Supplementary Bonding */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Supplementary Bonding for Motors and Equipment
          </h2>

          <p className="text-muted-foreground leading-relaxed">
            Supplementary bonding creates local equipotential zones where automatic disconnection alone cannot guarantee safety. BS 7671 Regulation 415.2.2 requires supplementary bonding when disconnection times cannot be met or where simultaneous contact with conductive parts is possible.
          </p>

          <h3 className="font-semibold text-base mt-4">Industrial Motor Bonding Scenarios</h3>

          <div className="space-y-3">
            <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
              <h4 className="font-semibold text-sm text-elec-yellow mb-1">Motor to Structural Steel</h4>
              <p className="text-sm text-muted-foreground">
                When a motor frame is within arm's reach (2.5m) of structural steelwork, supplementary bonding ensures touch voltage is 50V or less during faults.
              </p>
            </div>
            <div className="bg-elec-yellow/5 border-l-2 border-green-500/50 rounded-r-lg p-4">
              <h4 className="font-semibold text-sm text-green-400 mb-1">Motor to Metal Pipework</h4>
              <p className="text-sm text-muted-foreground">
                Pump motors connected to metal pipework systems require bonding between motor frame and accessible pipework sections.
              </p>
            </div>
            <div className="bg-elec-yellow/5 border-l-2 border-blue-500/50 rounded-r-lg p-4">
              <h4 className="font-semibold text-sm text-blue-400 mb-1">Conveyor Systems</h4>
              <p className="text-sm text-muted-foreground">
                Multiple drive motors on conveyor systems should be bonded to the conveyor framework creating a unified equipotential zone.
              </p>
            </div>
          </div>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 mt-4">
            <h4 className="font-semibold text-sm mb-3">Supplementary Bonding Conductor Sizing</h4>
            <p className="text-sm text-muted-foreground mb-2">Per Regulation 544.2.1:</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>Between two exposed-conductive-parts: Not less than smaller CPC</li>
              <li>Between exposed and extraneous-conductive-part: Not less than half CPC</li>
              <li>Minimum: 2.5mm squared Cu if mechanically protected, 4mm squared if not</li>
            </ul>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mt-4">
            <h4 className="font-semibold text-sm text-yellow-400 mb-2">Touch Voltage Verification</h4>
            <p className="text-sm text-muted-foreground">
              Where supplementary bonding is installed, verify: R &lt;= 50V / Ia, where R is resistance between simultaneously accessible parts and Ia is the operating current of the protective device (5-second characteristic for distribution circuits).
            </p>
          </div>
        </section>

        {/* Section 4: Earth Fault Loop Impedance */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Earth Fault Loop Impedance in Large Installations
          </h2>

          <p className="text-muted-foreground leading-relaxed">
            Earth fault loop impedance (Zs) verification is critical for industrial installations with long cable runs. The impedance must be low enough to ensure protective devices operate within the required disconnection times specified in BS 7671 Regulation 411.3.2.
          </p>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
            <h4 className="font-semibold text-sm mb-3">Zs Calculation Formula</h4>
            <div className="bg-background rounded p-4 font-mono text-center text-elec-yellow text-lg mb-4">
              Zs = Ze + (R1 + R2)
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p><strong className="text-foreground">Ze</strong> = External earth fault loop impedance (supply side)</p>
              <p><strong className="text-foreground">R1</strong> = Resistance of phase conductor</p>
              <p><strong className="text-foreground">R2</strong> = Resistance of protective conductor</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mt-4">
            <div className="bg-elec-yellow/5 border-l-2 border-green-500/50 rounded-r-lg p-4">
              <h4 className="font-semibold text-sm text-green-400 mb-2">Design Stage</h4>
              <p className="text-sm text-muted-foreground">
                Multiply tabulated Zs by <strong className="text-elec-yellow">0.8</strong> to account for conductor temperature rise during fault conditions. This provides a design margin ensuring compliance under worst-case conditions.
              </p>
            </div>
            <div className="bg-elec-yellow/5 border-l-2 border-blue-500/50 rounded-r-lg p-4">
              <h4 className="font-semibold text-sm text-blue-400 mb-2">Verification Stage</h4>
              <p className="text-sm text-muted-foreground">
                Measured Zs at ambient temperature must not exceed tabulated maximum values from Tables 41.2 to 41.4. Compare measured values directly without correction if testing at normal operating temperature.
              </p>
            </div>
          </div>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 mt-4">
            <h4 className="font-semibold text-sm mb-3">Maximum Zs Values - Common MCBs (TN Systems)</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-muted-foreground">
                    <th className="text-left py-2">Rating</th>
                    <th className="text-center py-2">Type B</th>
                    <th className="text-center py-2">Type C</th>
                    <th className="text-center py-2">Type D</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-white/5">
                    <td className="py-2">32A</td>
                    <td className="text-center text-elec-yellow">1.44 ohms</td>
                    <td className="text-center text-elec-yellow">0.72 ohms</td>
                    <td className="text-center text-elec-yellow">0.36 ohms</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2">63A</td>
                    <td className="text-center text-elec-yellow">0.73 ohms</td>
                    <td className="text-center text-elec-yellow">0.36 ohms</td>
                    <td className="text-center text-elec-yellow">0.18 ohms</td>
                  </tr>
                  <tr>
                    <td className="py-2">100A</td>
                    <td className="text-center text-elec-yellow">0.46 ohms</td>
                    <td className="text-center text-elec-yellow">0.23 ohms</td>
                    <td className="text-center text-elec-yellow">0.115 ohms</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mt-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm text-red-400 mb-1">Long Cable Run Considerations</h4>
                <p className="text-sm text-muted-foreground">
                  Large industrial installations may have cable runs exceeding 100m. Calculate (R1+R2)/m from conductor tables and verify Zs at the furthest point. Consider increasing conductor CSA, using copper instead of aluminium, or selecting protective devices with lower disconnection currents (RCBO, Type B MCB).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Check 3 */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 5: Lightning and Surge Protection */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Lightning Protection and Surge Protection
          </h2>

          <p className="text-muted-foreground leading-relaxed">
            Industrial buildings require lightning protection risk assessment per BS EN 62305-2. The standard defines four Lightning Protection Levels (LPL I-IV) with corresponding protection measures. Industrial sites with tall structures, hazardous materials, or critical processes typically require LPL I or II.
          </p>

          <div className="grid sm:grid-cols-3 gap-4 mt-4">
            <div className="bg-elec-yellow/5 border-l-2 border-red-500/50 rounded-r-lg p-4">
              <h4 className="font-semibold text-sm text-red-400 mb-2">Air Termination</h4>
              <p className="text-sm text-muted-foreground">
                Rods, mesh network, or catenary systems intercept lightning strikes. Mesh size and rod spacing depend on LPL (5m-20m typical).
              </p>
            </div>
            <div className="bg-elec-yellow/5 border-l-2 border-yellow-500/50 rounded-r-lg p-4">
              <h4 className="font-semibold text-sm text-yellow-400 mb-2">Down Conductors</h4>
              <p className="text-sm text-muted-foreground">
                Minimum 2 down conductors per structure, spaced 10-25m depending on LPL. Copper tape 25x3mm or 50mm squared stranded typical.
              </p>
            </div>
            <div className="bg-elec-yellow/5 border-l-2 border-green-500/50 rounded-r-lg p-4">
              <h4 className="font-semibold text-sm text-green-400 mb-2">Earth Termination</h4>
              <p className="text-sm text-muted-foreground">
                Type A (vertical/horizontal electrodes) or Type B (ring conductor). Target resistance 10 ohms or less, interconnected with installation earthing.
              </p>
            </div>
          </div>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 mt-4">
            <h4 className="font-semibold text-sm mb-3">Surge Protective Devices (SPDs)</h4>
            <p className="text-sm text-muted-foreground mb-4">
              BS 7671 Section 534 requires SPD installation assessment based on risk. SPDs protect against transient overvoltages from lightning (conducted and induced) and switching surges.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-3 bg-background rounded p-3">
                <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">Type 1</span>
                <div className="text-sm">
                  <span className="text-foreground">Main intake / Service entrance</span>
                  <span className="text-muted-foreground ml-2">- Handles direct strikes - Up to 100kA</span>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-background rounded p-3">
                <span className="bg-yellow-600 text-white text-xs font-bold px-2 py-1 rounded">Type 2</span>
                <div className="text-sm">
                  <span className="text-foreground">Sub-distribution boards</span>
                  <span className="text-muted-foreground ml-2">- Induced surges - Up to 40kA</span>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-background rounded p-3">
                <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">Type 3</span>
                <div className="text-sm">
                  <span className="text-foreground">Equipment level / Socket outlets</span>
                  <span className="text-muted-foreground ml-2">- Fine protection - Up to 10kA</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mt-4">
            <h4 className="font-semibold text-sm text-blue-400 mb-2">SPD Coordination Distance</h4>
            <p className="text-sm text-muted-foreground">
              Maintain minimum <strong className="text-elec-yellow">10 metres</strong> cable length between Type 1 and Type 2 SPDs for proper energy coordination. If distance is less, use coordinated SPD sets from the same manufacturer or install decoupling inductors.
            </p>
          </div>
        </section>

        {/* Section 6: Clean Earth and Technical Earth */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Clean Earth and Technical Earth Systems
          </h2>

          <p className="text-muted-foreground leading-relaxed">
            Modern industrial facilities contain sensitive electronic equipment - PLCs, SCADA systems, variable speed drives, and data networks - requiring <strong className="text-foreground">functional earthing</strong> separate from protective earthing. This provides a stable voltage reference and reduces electromagnetic interference.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mt-4">
            <div className="bg-elec-yellow/5 border-l-2 border-purple-500/50 rounded-r-lg p-4">
              <h4 className="font-semibold text-sm text-purple-400 mb-2">Clean Earth (CE)</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>Dedicated earth conductor to MET</li>
                <li>No other equipment connected</li>
                <li>Green/yellow with blue sleeve at terminations</li>
                <li>Used for single items of sensitive equipment</li>
                <li>Must still be connected to MET for safety</li>
              </ul>
            </div>
            <div className="bg-elec-yellow/5 border-l-2 border-cyan-500/50 rounded-r-lg p-4">
              <h4 className="font-semibold text-sm text-cyan-400 mb-2">Technical Earth (TE)</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>Isolated Technical Earth Bar (TEB)</li>
                <li>Star topology from TEB to equipment</li>
                <li>Single point connection to MET</li>
                <li>Used for data centres, server rooms</li>
                <li>Often combined with raised floor system</li>
              </ul>
            </div>
          </div>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 mt-4">
            <h4 className="font-semibold text-sm mb-3">Technical Earth System Design</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-cyan-600 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">1</div>
                <div>
                  <h5 className="font-semibold text-sm text-cyan-400">Technical Earth Bar (TEB)</h5>
                  <p className="text-sm text-muted-foreground">
                    Insulated copper bar, typically 50x6mm, mounted on insulators in technical space. Single cable connection to MET using 25mm squared minimum green/yellow conductor.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-cyan-600 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">2</div>
                <div>
                  <h5 className="font-semibold text-sm text-cyan-400">Star Topology</h5>
                  <p className="text-sm text-muted-foreground">
                    Individual conductors radiate from TEB to each equipment rack/item. No daisy-chaining or interconnection between equipment earths.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-cyan-600 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">3</div>
                <div>
                  <h5 className="font-semibold text-sm text-cyan-400">Reference Electrode</h5>
                  <p className="text-sm text-muted-foreground">
                    Optional dedicated earth electrode (target 10 ohms or less) connected to TEB improves high-frequency performance. Must still have connection to MET for safety.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mt-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm text-yellow-400 mb-1">Critical Safety Note</h4>
                <p className="text-sm text-muted-foreground">
                  Clean earth and technical earth systems must <strong className="text-foreground">always</strong> be connected to the MET for protective purposes per BS 7671 Regulation 411.3.1.1. "Isolated" or "floating" earths that are completely separate from the installation earth are non-compliant and dangerous.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="bg-elec-yellow/5 border border-elec-yellow/20 rounded-lg p-6 space-y-4">
          <h2 className="text-lg font-semibold text-elec-yellow">Quick Reference Card</h2>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-sm mb-2">Key Regulations</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li><span className="text-elec-yellow">Chapter 54:</span> Earthing arrangements and protective conductors</li>
                <li><span className="text-elec-yellow">Reg 411.3.2:</span> Maximum disconnection times</li>
                <li><span className="text-elec-yellow">Reg 415.2:</span> Supplementary bonding requirements</li>
                <li><span className="text-elec-yellow">Section 534:</span> Surge protective devices</li>
                <li><span className="text-elec-yellow">Table 54.7:</span> Earthing conductor sizing</li>
                <li><span className="text-elec-yellow">Table 54.8:</span> Main bonding conductor sizing</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-2">Key Values</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li><span className="text-elec-yellow">TN-S Ze:</span> Typically 0.35 ohms</li>
                <li><span className="text-elec-yellow">TN-C-S Ze:</span> Max 0.8 ohms (typically 0.35 ohms)</li>
                <li><span className="text-elec-yellow">Design factor:</span> 0.8 x tabulated Zs</li>
                <li><span className="text-elec-yellow">Final circuit time:</span> 0.4s (230V), 0.2s (400V)</li>
                <li><span className="text-elec-yellow">Distribution time:</span> 5s (TN systems)</li>
                <li><span className="text-elec-yellow">Touch voltage limit:</span> 50V AC</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-2">SPD Selection</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li><span className="text-elec-yellow">Type 1:</span> Main intake (lightning current)</li>
                <li><span className="text-elec-yellow">Type 2:</span> Sub-boards (induced surges)</li>
                <li><span className="text-elec-yellow">Type 3:</span> Equipment (fine protection)</li>
                <li><span className="text-elec-yellow">Coordination:</span> 10m minimum between types</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-2">Formulas</h3>
              <ul className="text-sm text-muted-foreground space-y-1 font-mono">
                <li><span className="text-elec-yellow">Zs</span> = Ze + (R1 + R2)</li>
                <li><span className="text-elec-yellow">If</span> = Uo / Zs</li>
                <li><span className="text-elec-yellow">R</span> &lt;= 50V / Ia (supp. bonding)</li>
                <li><span className="text-elec-yellow">Design Zs</span> = 0.8 x Zs max</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-elec-yellow" />
            Practical Guidance
          </h2>
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">Always verify Ze with the DNO before design - declared values may differ from actual measurements.</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">Document all bonding connections with photographs for verification and future maintenance.</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">Consider electromagnetic compatibility early in design - retrofit clean earth systems are costly.</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">Test earth electrode resistance seasonally - soil conditions affect resistance significantly.</p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-elec-yellow" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-white/10 rounded-lg p-4">
                <h3 className="font-semibold text-sm mb-2">{faq.question}</h3>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Section Quiz</h2>
          <Quiz questions={quizQuestions} />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="text-muted-foreground hover:text-foreground" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="bg-elec-yellow text-black hover:bg-elec-yellow/90" asChild>
            <Link to="/study-centre/upskilling/industrial-electrical/module-2/section-1">
              Next: Module 2
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </main>
    </div>
  );
};

export default IndustrialElectricalModule1Section5;
