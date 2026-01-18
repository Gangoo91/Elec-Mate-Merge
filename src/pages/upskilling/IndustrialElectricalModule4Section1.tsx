import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';
import {
  ArrowLeft,
  ArrowRight,
  Cpu,
  CircuitBoard,
  Zap,
  Activity,
  Layers,
  Wrench,
  BookOpen,
  AlertTriangle,
  CheckCircle2,
  Info
} from 'lucide-react';

const IndustrialElectricalModule4Section1: React.FC = () => {
  const [showQuiz, setShowQuiz] = useState(false);

  useSEO({
    title: 'PLC Architecture and Inputs/Outputs | Industrial Electrical Module 4',
    description: 'Learn PLC system architecture, digital and analogue I/O configuration, sinking vs sourcing concepts, and I/O wiring best practices for Siemens, Allen-Bradley, and Schneider PLCs.',
    keywords: [
      'PLC architecture',
      'PLC inputs outputs',
      'sinking sourcing',
      'digital I/O',
      'analogue I/O',
      '4-20mA signals',
      'PNP NPN sensors',
      'PLC scan cycle',
      'I/O addressing',
      'industrial automation'
    ]
  });

  const quickCheckQuestions = [
    {
      id: 'qc1-plc-scan',
      question: 'During the PLC scan cycle, when are the physical inputs read into the input image table?',
      options: [
        'Continuously throughout the entire scan',
        'At the beginning of each scan cycle',
        'Only when the program references them',
        'At the end of each scan cycle'
      ],
      correctIndex: 1,
      explanation: 'The PLC reads all physical inputs into the input image table at the START of each scan cycle. The program then works with this snapshot throughout the scan, and outputs are updated at the end. This ensures consistent data during program execution.'
    },
    {
      id: 'qc2-sinking-sourcing',
      question: 'A PNP (sourcing) sensor should be connected to which type of PLC input?',
      options: [
        'A sourcing input module',
        'A sinking input module',
        'Either type with proper wiring',
        'Only relay-type inputs'
      ],
      correctIndex: 1,
      explanation: 'A PNP (sourcing) sensor provides positive voltage when active, so it must connect to a SINKING input module that provides the current path to common/ground. Remember: sourcing outputs connect to sinking inputs, and vice versa.'
    },
    {
      id: 'qc3-live-zero',
      question: 'Why do industrial analogue signals use 4-20mA instead of 0-20mA?',
      options: [
        'To reduce power consumption',
        'To distinguish between 0% signal and a broken wire/fault',
        'Because sensors cannot output below 4mA',
        'To comply with safety regulations only'
      ],
      correctIndex: 1,
      explanation: 'The "live zero" of 4mA allows the system to distinguish between a true 0% process value (4mA) and a fault condition like a broken wire (0mA). This is critical for safety and diagnostics in industrial environments.'
    }
  ];

  const quizQuestions = [
    {
      question: 'What are the three main components of a PLC\'s central architecture?',
      options: [
        'Monitor, keyboard, and mouse',
        'CPU, memory, and I/O modules',
        'Power supply, enclosure, and terminals',
        'Software, hardware, and firmware'
      ],
      correctAnswer: 'CPU, memory, and I/O modules'
    },
    {
      question: 'In Allen-Bradley addressing, what does the address I:1/5 represent?',
      options: [
        'Output module 1, terminal 5',
        'Input module 1, bit 5',
        'Internal relay 1, contact 5',
        'Input slot 5, module 1'
      ],
      correctAnswer: 'Input module 1, bit 5'
    },
    {
      question: 'Which output type is best suited for switching AC loads and offers solid-state reliability?',
      options: [
        'Relay output',
        'Transistor output (DC)',
        'Triac output',
        'Analogue output'
      ],
      correctAnswer: 'Triac output'
    },
    {
      question: 'An NPN sensor is also known as:',
      options: [
        'Sourcing sensor',
        'Sinking sensor',
        'Relay sensor',
        'Analogue sensor'
      ],
      correctAnswer: 'Sinking sensor'
    },
    {
      question: 'What is the typical scan time for a modern PLC with a moderate-sized program?',
      options: [
        '1-5 seconds',
        '100-500 milliseconds',
        '1-50 milliseconds',
        '1-5 minutes'
      ],
      correctAnswer: '1-50 milliseconds'
    },
    {
      question: 'For a 4-20mA analogue signal representing 0-100 degrees C, what current represents 50 degrees C?',
      options: [
        '10mA',
        '12mA',
        '8mA',
        '16mA'
      ],
      correctAnswer: '12mA'
    },
    {
      question: 'Which PLC type is most suitable for a large-scale application requiring future expansion?',
      options: [
        'Compact/fixed PLC',
        'Micro PLC',
        'Modular/rack-based PLC',
        'Smart relay'
      ],
      correctAnswer: 'Modular/rack-based PLC'
    },
    {
      question: 'What is the primary advantage of relay outputs over solid-state outputs?',
      options: [
        'Faster switching speed',
        'Longer lifespan',
        'Can switch AC or DC, and provides electrical isolation',
        'Lower cost per point'
      ],
      correctAnswer: 'Can switch AC or DC, and provides electrical isolation'
    },
    {
      question: 'In Siemens S7 addressing, what does %IW64 represent?',
      options: [
        'Output word at address 64',
        'Input word at address 64',
        'Memory word at address 64',
        'Timer word 64'
      ],
      correctAnswer: 'Input word at address 64'
    },
    {
      question: 'Which wire colour convention is typically used for 24VDC positive in industrial control?',
      options: [
        'Black',
        'Blue',
        'Red or Brown',
        'Green'
      ],
      correctAnswer: 'Red or Brown'
    }
  ];

  const faqItems = [
    {
      question: 'What happens if I connect a PNP sensor to a sourcing input module?',
      answer: 'The circuit will not work correctly. Both the PNP sensor and sourcing input are trying to provide positive voltage, creating a conflict with no current path. You must match sourcing sensors (PNP) with sinking inputs, and sinking sensors (NPN) with sourcing inputs. Some modern universal input modules can accept either type through configuration, but standard modules require proper matching.'
    },
    {
      question: 'How do I calculate the analogue value from a 4-20mA signal?',
      answer: 'Use the formula: Value = ((mA - 4) / 16) x Range + Offset. For example, with a 0-100 PSI transmitter reading 12mA: Value = ((12 - 4) / 16) x 100 + 0 = 50 PSI. In the PLC, the raw count is typically scaled. For a 12-bit input (0-4095 counts), 4mA = 0 counts and 20mA = 4095 counts. Most PLCs have built-in scaling functions for this conversion.'
    },
    {
      question: 'Why does my PLC output flicker when switching inductive loads?',
      answer: 'Inductive loads (relays, solenoids, motors) create voltage spikes when switched off due to collapsing magnetic fields. For relay outputs, this causes arcing that can damage contacts. For solid-state outputs, it can cause false triggering. Always install suppression devices: flyback diodes for DC loads, RC snubbers or MOVs for AC loads. This extends output life and prevents erratic behaviour.'
    },
    {
      question: 'What is the difference between fixed I/O and modular PLCs?',
      answer: 'Fixed/compact PLCs have built-in I/O that cannot be changed - what you buy is what you get. They are cost-effective for small, defined applications. Modular PLCs use a rack or rail system where you select individual I/O modules to build exactly what you need. They offer flexibility, easier expansion, and simpler maintenance (replace only failed modules). Choose fixed for simple/small jobs, modular for complex or growing systems.'
    },
    {
      question: 'How does the scan cycle affect my program response time?',
      answer: 'Total response time = Input delay + Scan time + Output delay. If your scan time is 20ms, an input change might not be seen until the next scan, and the output will not update until scan end - potentially 40ms total worst-case delay. For time-critical applications, use high-speed counters, interrupt routines, or immediate I/O instructions that bypass the normal image table update cycle. Most applications tolerate normal scan times, but high-speed processes need special handling.'
    },
    {
      question: 'Can I mix different voltage levels on the same I/O module?',
      answer: 'Generally no - most modules are designed for a specific voltage (24VDC, 120VAC, etc.). Mixing voltages can damage the module or connected devices. However, relay output modules with isolated contacts can switch different voltages on each point since the contacts are electrically independent. Always check the module specifications. For mixed voltage requirements, use separate modules for each voltage level or select modules with isolated channels.'
    }
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
          <span className="text-sm text-muted-foreground">Module 4 &gt; Section 1</span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 space-y-8">
        {/* Title Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-elec-yellow/10">
            <Cpu className="w-8 h-8 text-elec-yellow" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            PLC Architecture and Inputs/Outputs
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Understanding CPU, memory, I/O systems, and proper wiring configurations for industrial PLCs
          </p>
        </div>

        {/* Section Overview */}
        <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
          <h2 className="font-semibold text-foreground mb-2">Section Overview</h2>
          <p className="text-sm text-muted-foreground">
            This section covers PLC system architecture, digital I/O concepts including sinking vs sourcing,
            analogue signal types (4-20mA and 0-10V), modular vs compact PLC selection, and wiring best practices
            essential for reliable industrial control systems.
          </p>
        </div>

        {/* Section 1: PLC System Architecture */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            PLC System Architecture
          </h2>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 space-y-4">
            <p className="text-muted-foreground">
              A Programmable Logic Controller (PLC) consists of three core components working together:
              the <span className="text-elec-yellow font-semibold">CPU</span> (Central Processing Unit),
              <span className="text-elec-yellow font-semibold"> memory systems</span>, and
              <span className="text-elec-yellow font-semibold"> Input/Output modules</span>. Understanding
              this architecture is essential for programming, troubleshooting, and system design.
            </p>

            <div className="grid md:grid-cols-3 gap-3">
              <div className="bg-background/50 rounded-lg p-3 border border-white/10">
                <h4 className="text-elec-yellow font-semibold mb-2 flex items-center gap-2 text-sm">
                  <Cpu className="w-4 h-4" />
                  CPU
                </h4>
                <p className="text-muted-foreground text-sm">
                  The "brain" that executes the program logic, performs calculations, and manages communication.
                  Modern CPUs include Siemens S7-1500, Allen-Bradley ControlLogix, and Schneider M340.
                </p>
              </div>
              <div className="bg-background/50 rounded-lg p-3 border border-white/10">
                <h4 className="text-elec-yellow font-semibold mb-2 flex items-center gap-2 text-sm">
                  <Layers className="w-4 h-4" />
                  Memory
                </h4>
                <p className="text-muted-foreground text-sm">
                  <strong>RAM:</strong> Working memory for program execution.<br/>
                  <strong>ROM/Flash:</strong> Stores firmware and retentive data.<br/>
                  <strong>Image Tables:</strong> Mirror of I/O states during scan.
                </p>
              </div>
              <div className="bg-background/50 rounded-lg p-3 border border-white/10">
                <h4 className="text-elec-yellow font-semibold mb-2 flex items-center gap-2 text-sm">
                  <CircuitBoard className="w-4 h-4" />
                  I/O Modules
                </h4>
                <p className="text-muted-foreground text-sm">
                  Interface between PLC and field devices. Available as digital (ON/OFF) or analogue
                  (variable signals), inputs (sensors) or outputs (actuators).
                </p>
              </div>
            </div>

            <div className="bg-background/50 rounded-lg p-4 border-l-2 border-elec-yellow">
              <h4 className="text-elec-yellow font-semibold mb-2">The PLC Scan Cycle</h4>
              <p className="text-muted-foreground text-sm mb-3">
                The PLC operates in a continuous cycle, typically executing in 1-50 milliseconds:
              </p>
              <ol className="text-muted-foreground text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="bg-elec-yellow text-background rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                  <span><strong className="text-foreground">Input Scan:</strong> Read all physical inputs into the Input Image Table</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-elec-yellow text-background rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                  <span><strong className="text-foreground">Program Execution:</strong> Execute logic using image table data (top to bottom, left to right)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-elec-yellow text-background rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                  <span><strong className="text-foreground">Output Scan:</strong> Write Output Image Table values to physical outputs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-elec-yellow text-background rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0">4</span>
                  <span><strong className="text-foreground">Housekeeping:</strong> Communications, diagnostics, memory management</span>
                </li>
              </ol>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-muted-foreground">
                  <strong className="text-blue-400">I/O Addressing Examples:</strong>
                  <ul className="mt-2 space-y-1">
                    <li><strong>Allen-Bradley:</strong> I:1/0 (Input slot 1, bit 0), O:2/5 (Output slot 2, bit 5)</li>
                    <li><strong>Siemens S7:</strong> %I0.0 (Input byte 0, bit 0), %Q1.3 (Output byte 1, bit 3), %IW64 (Input word 64)</li>
                    <li><strong>Schneider:</strong> %I0.1.2 (Input rack 0, module 1, channel 2)</li>
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

        {/* Section 2: Digital Inputs - Sinking vs Sourcing */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Digital Inputs: Sinking vs Sourcing
          </h2>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 space-y-4">
            <p className="text-muted-foreground">
              Understanding sinking and sourcing is crucial for correctly wiring sensors to PLC inputs.
              These terms describe the direction of current flow relative to the I/O point.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-background/50 rounded-lg p-4 border border-green-500/30">
                <h4 className="text-green-400 font-bold text-lg mb-3">Sourcing Input</h4>
                <p className="text-muted-foreground text-sm mb-3">
                  The input module <strong className="text-foreground">provides</strong> (sources) positive voltage to the sensor/switch.
                  Current flows OUT of the input terminal.
                </p>
                <div className="bg-background/70 rounded p-3 text-sm">
                  <p className="text-muted-foreground">Connects to: <span className="text-elec-yellow">NPN (sinking) sensors</span></p>
                  <p className="text-muted-foreground mt-1">Common wire: Connected to supply positive (+24V)</p>
                </div>
                <div className="mt-3 text-xs text-muted-foreground">
                  The sensor completes the circuit by providing path to ground (0V).
                </div>
              </div>
              <div className="bg-background/50 rounded-lg p-4 border border-blue-500/30">
                <h4 className="text-blue-400 font-bold text-lg mb-3">Sinking Input</h4>
                <p className="text-muted-foreground text-sm mb-3">
                  The input module <strong className="text-foreground">receives</strong> (sinks) current from the sensor.
                  Current flows INTO the input terminal.
                </p>
                <div className="bg-background/70 rounded p-3 text-sm">
                  <p className="text-muted-foreground">Connects to: <span className="text-elec-yellow">PNP (sourcing) sensors</span></p>
                  <p className="text-muted-foreground mt-1">Common wire: Connected to supply negative (0V)</p>
                </div>
                <div className="mt-3 text-xs text-muted-foreground">
                  The sensor provides positive voltage when active.
                </div>
              </div>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <strong className="text-yellow-400">Critical Matching Rule:</strong>
                  <p className="text-muted-foreground mt-1">
                    <strong className="text-foreground">PNP sensors (sourcing)</strong> &rarr; Connect to <strong className="text-foreground">Sinking inputs</strong><br/>
                    <strong className="text-foreground">NPN sensors (sinking)</strong> &rarr; Connect to <strong className="text-foreground">Sourcing inputs</strong>
                  </p>
                  <p className="text-muted-foreground mt-2 text-xs">
                    Remember: Current must have a complete path. Sourcing provides positive, sinking provides ground.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-background/50 rounded-lg p-4">
              <h4 className="text-elec-yellow font-semibold mb-3">Regional Preferences</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="text-muted-foreground">
                  <strong className="text-foreground">Europe/Asia:</strong> PNP (sourcing) sensors preferred.
                  Positive switching is considered safer - a ground fault will not activate the sensor.
                </div>
                <div className="text-muted-foreground">
                  <strong className="text-foreground">North America:</strong> NPN (sinking) sensors common,
                  though PNP is increasingly adopted. Check existing system standards before specifying.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Digital Outputs */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Digital Outputs: Relay, Transistor, Triac
          </h2>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 space-y-4">
            <p className="text-muted-foreground">
              PLC output modules come in three main types, each suited for different applications.
              Selection depends on load type, switching speed, and reliability requirements.
            </p>

            <div className="space-y-4">
              <div className="bg-background/50 rounded-lg p-4 border-l-4 border-purple-500">
                <div className="flex items-center gap-3 mb-3">
                  <h4 className="text-purple-400 font-bold text-lg">Relay Outputs</h4>
                  <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded">AC or DC</span>
                </div>
                <p className="text-muted-foreground text-sm mb-3">
                  Mechanical contacts that physically open and close. Provides complete electrical isolation
                  between PLC logic and load circuit.
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-green-400 font-semibold">Advantages:</span>
                    <ul className="text-muted-foreground mt-1 space-y-1 list-disc list-inside">
                      <li>Switches AC or DC loads</li>
                      <li>Complete electrical isolation</li>
                      <li>Low voltage drop when on</li>
                      <li>Tolerant of voltage spikes</li>
                    </ul>
                  </div>
                  <div>
                    <span className="text-red-400 font-semibold">Limitations:</span>
                    <ul className="text-muted-foreground mt-1 space-y-1 list-disc list-inside">
                      <li>Slower switching (5-20ms)</li>
                      <li>Limited lifespan (mechanical wear)</li>
                      <li>Contact bounce</li>
                      <li>Audible clicking noise</li>
                    </ul>
                  </div>
                </div>
                <p className="text-muted-foreground text-xs mt-3">
                  <strong>Typical rating:</strong> 2A @ 240VAC or 30VDC. Best for: pilot lights, small contactors,
                  solenoids, and mixed voltage applications.
                </p>
              </div>

              <div className="bg-background/50 rounded-lg p-4 border-l-4 border-blue-500">
                <div className="flex items-center gap-3 mb-3">
                  <h4 className="text-blue-400 font-bold text-lg">Transistor Outputs (DC)</h4>
                  <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">DC Only</span>
                </div>
                <p className="text-muted-foreground text-sm mb-3">
                  Solid-state switching using NPN or PNP transistors. Fast, reliable, long-lasting for DC loads.
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-green-400 font-semibold">Advantages:</span>
                    <ul className="text-muted-foreground mt-1 space-y-1 list-disc list-inside">
                      <li>Very fast switching (us range)</li>
                      <li>No mechanical wear (millions of cycles)</li>
                      <li>No contact bounce</li>
                      <li>PWM capable for speed control</li>
                    </ul>
                  </div>
                  <div>
                    <span className="text-red-400 font-semibold">Limitations:</span>
                    <ul className="text-muted-foreground mt-1 space-y-1 list-disc list-inside">
                      <li>DC loads only</li>
                      <li>Small voltage drop (heat generation)</li>
                      <li>Sensitive to overcurrent/spikes</li>
                      <li>Polarity sensitive</li>
                    </ul>
                  </div>
                </div>
                <p className="text-muted-foreground text-xs mt-3">
                  <strong>Typical rating:</strong> 0.5-2A @ 24VDC. Best for: high-speed applications, stepper drives,
                  proportional valves, DC solenoids.
                </p>
              </div>

              <div className="bg-background/50 rounded-lg p-4 border-l-4 border-orange-500">
                <div className="flex items-center gap-3 mb-3">
                  <h4 className="text-orange-400 font-bold text-lg">Triac Outputs (AC)</h4>
                  <span className="text-xs bg-orange-500/20 text-orange-300 px-2 py-1 rounded">AC Only</span>
                </div>
                <p className="text-muted-foreground text-sm mb-3">
                  Solid-state switching for AC loads. Combines transistor reliability with AC capability.
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-green-400 font-semibold">Advantages:</span>
                    <ul className="text-muted-foreground mt-1 space-y-1 list-disc list-inside">
                      <li>Fast switching for AC</li>
                      <li>No mechanical wear</li>
                      <li>No contact bounce</li>
                      <li>Zero-crossing switching reduces EMI</li>
                    </ul>
                  </div>
                  <div>
                    <span className="text-red-400 font-semibold">Limitations:</span>
                    <ul className="text-muted-foreground mt-1 space-y-1 list-disc list-inside">
                      <li>AC loads only</li>
                      <li>Higher leakage current when off</li>
                      <li>Voltage drop causes heat</li>
                      <li>May need minimum load current</li>
                    </ul>
                  </div>
                </div>
                <p className="text-muted-foreground text-xs mt-3">
                  <strong>Typical rating:</strong> 0.5-1A @ 240VAC. Best for: AC solenoids, small heaters,
                  AC motor starters (via contactor).
                </p>
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

        {/* Section 4: Analogue I/O */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Analogue I/O: 4-20mA and 0-10V Signals
          </h2>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 space-y-4">
            <p className="text-muted-foreground">
              Analogue signals represent variable process values like temperature, pressure, level, or flow.
              The two most common industrial standards are <span className="text-elec-yellow font-semibold">4-20mA
              current loops</span> and <span className="text-elec-yellow font-semibold">0-10V voltage signals</span>.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-background/50 rounded-lg p-4 border border-cyan-500/30">
                <h4 className="text-cyan-400 font-bold text-lg mb-3">4-20mA Current Loop</h4>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="bg-background/70 rounded p-3">
                    <span className="text-elec-yellow font-semibold">The "Live Zero" Concept:</span>
                    <p className="mt-1">
                      4mA = 0% of range (not 0mA)<br/>
                      20mA = 100% of range
                    </p>
                    <p className="text-muted-foreground text-xs mt-2">
                      This allows distinguishing between "true zero" (4mA) and a fault/broken wire (0mA).
                    </p>
                  </div>
                  <ul className="space-y-1">
                    <li><CheckCircle2 className="w-4 h-4 inline text-green-400 mr-1" /> Immune to voltage drop over long cable runs</li>
                    <li><CheckCircle2 className="w-4 h-4 inline text-green-400 mr-1" /> Self-diagnostic (0mA = fault)</li>
                    <li><CheckCircle2 className="w-4 h-4 inline text-green-400 mr-1" /> Two-wire power + signal possible</li>
                    <li><CheckCircle2 className="w-4 h-4 inline text-green-400 mr-1" /> Industry standard for process control</li>
                  </ul>
                </div>
              </div>
              <div className="bg-background/50 rounded-lg p-4 border border-green-500/30">
                <h4 className="text-green-400 font-bold text-lg mb-3">0-10V Voltage Signal</h4>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="bg-background/70 rounded p-3">
                    <span className="text-elec-yellow font-semibold">Direct Voltage Scaling:</span>
                    <p className="mt-1">
                      0V = 0% of range<br/>
                      10V = 100% of range
                    </p>
                    <p className="text-muted-foreground text-xs mt-2">
                      Simple scaling but no built-in fault detection (0V could be fault or true zero).
                    </p>
                  </div>
                  <ul className="space-y-1">
                    <li><CheckCircle2 className="w-4 h-4 inline text-green-400 mr-1" /> Simple to implement and measure</li>
                    <li><CheckCircle2 className="w-4 h-4 inline text-green-400 mr-1" /> Common for HVAC and drives</li>
                    <li><CheckCircle2 className="w-4 h-4 inline text-green-400 mr-1" /> Low-cost transmitters available</li>
                    <li><AlertTriangle className="w-4 h-4 inline text-yellow-400 mr-1" /> Susceptible to voltage drop on long runs</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-background/50 rounded-lg p-4 border-l-2 border-elec-yellow">
              <h4 className="text-elec-yellow font-semibold mb-3">Analogue Resolution and Scaling</h4>
              <div className="text-sm text-muted-foreground space-y-2">
                <p>
                  <strong className="text-foreground">Resolution:</strong> Determined by the ADC/DAC bit depth. Common values:
                </p>
                <ul className="ml-4 space-y-1">
                  <li><strong>12-bit:</strong> 4096 counts (0-4095), ~0.024% resolution</li>
                  <li><strong>14-bit:</strong> 16384 counts, ~0.006% resolution</li>
                  <li><strong>16-bit:</strong> 65536 counts, ~0.0015% resolution</li>
                </ul>
                <div className="bg-background/70 rounded p-3 mt-3">
                  <strong className="text-elec-yellow">Example Calculation (4-20mA, 12-bit, 0-100 degrees C):</strong>
                  <p className="mt-1 font-mono text-xs">
                    If raw count = 2048 (50% of 4095)<br/>
                    Signal = 4 + (16 x 0.5) = 12mA<br/>
                    Temperature = 0 + (100 x 0.5) = 50 degrees C
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-muted-foreground">
                  <strong className="text-blue-400">Wiring Tip:</strong> For 4-20mA signals, use shielded
                  twisted-pair cable with the shield grounded at one end only (typically the PLC end).
                  This prevents ground loops while providing EMI protection.
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

        {/* Section 5: Modular vs Compact PLC Selection */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Modular vs Compact PLC Selection
          </h2>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 space-y-4">
            <p className="text-muted-foreground">
              Choosing between modular and compact PLCs impacts cost, flexibility, and future expandability.
              Both have valid use cases depending on application requirements.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-background/50 rounded-lg p-4">
                <h4 className="text-blue-400 font-bold text-lg mb-3 flex items-center gap-2">
                  <Layers className="w-5 h-5" />
                  Modular/Rack-Based PLCs
                </h4>
                <div className="text-sm text-muted-foreground space-y-3">
                  <p>Individual modules mounted in a rack or on DIN rail backplane.</p>
                  <div className="space-y-2">
                    <p className="text-elec-yellow font-semibold">Examples:</p>
                    <ul className="ml-4 space-y-1">
                      <li>Siemens S7-1500, S7-300</li>
                      <li>Allen-Bradley ControlLogix, CompactLogix</li>
                      <li>Schneider Modicon M340, M580</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <p className="text-green-400 font-semibold">Best For:</p>
                    <ul className="ml-4 space-y-1">
                      <li>Large I/O count applications</li>
                      <li>Systems requiring expansion</li>
                      <li>Mixed I/O types (digital, analogue, specialty)</li>
                      <li>High availability requirements</li>
                      <li>Complex motion or safety applications</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-background/50 rounded-lg p-4">
                <h4 className="text-green-400 font-bold text-lg mb-3 flex items-center gap-2">
                  <CircuitBoard className="w-5 h-5" />
                  Compact/Fixed PLCs
                </h4>
                <div className="text-sm text-muted-foreground space-y-3">
                  <p>CPU and I/O integrated in single unit, some allow limited expansion.</p>
                  <div className="space-y-2">
                    <p className="text-elec-yellow font-semibold">Examples:</p>
                    <ul className="ml-4 space-y-1">
                      <li>Siemens S7-1200, LOGO!</li>
                      <li>Allen-Bradley Micro800 series</li>
                      <li>Schneider M221, M241</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <p className="text-green-400 font-semibold">Best For:</p>
                    <ul className="ml-4 space-y-1">
                      <li>Small, standalone machines</li>
                      <li>Cost-sensitive applications</li>
                      <li>Limited I/O requirements (&lt;100 points)</li>
                      <li>Simple control tasks</li>
                      <li>OEM machine builders</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-background/50 rounded-lg p-4">
              <h4 className="text-elec-yellow font-semibold mb-3">Selection Criteria Checklist</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <p className="text-muted-foreground"><strong className="text-foreground">I/O Count:</strong> &lt;50 points = compact, &gt;100 = consider modular</p>
                  <p className="text-muted-foreground"><strong className="text-foreground">Expansion Needs:</strong> Future growth? Choose modular</p>
                  <p className="text-muted-foreground"><strong className="text-foreground">Budget:</strong> Compact typically 30-50% lower initial cost</p>
                </div>
                <div className="space-y-2">
                  <p className="text-muted-foreground"><strong className="text-foreground">Spare Parts:</strong> Modular = replace only failed module</p>
                  <p className="text-muted-foreground"><strong className="text-foreground">Special I/O:</strong> High-speed counters, thermocouple inputs &rarr; modular</p>
                  <p className="text-muted-foreground"><strong className="text-foreground">Processing Power:</strong> Complex maths, large programs &rarr; modular CPUs</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: I/O Wiring Best Practices */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            I/O Wiring Best Practices
          </h2>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 space-y-4">
            <p className="text-muted-foreground">
              Proper wiring practices ensure reliable operation, easier troubleshooting, and compliance
              with safety standards. These guidelines apply to all PLC brands and installations.
            </p>

            <div className="space-y-4">
              <div className="bg-background/50 rounded-lg p-4 border-l-4 border-green-500">
                <h4 className="text-green-400 font-semibold mb-2">Wire Colour Standards (24VDC Systems)</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div className="text-muted-foreground">
                    <div className="w-6 h-6 bg-red-600 rounded mb-1"></div>
                    <strong>Red/Brown:</strong> +24VDC
                  </div>
                  <div className="text-muted-foreground">
                    <div className="w-6 h-6 bg-blue-600 rounded mb-1"></div>
                    <strong>Blue:</strong> 0VDC/Common
                  </div>
                  <div className="text-muted-foreground">
                    <div className="w-6 h-6 bg-white border border-white/40 rounded mb-1"></div>
                    <strong>White:</strong> Signal/Input
                  </div>
                  <div className="text-muted-foreground">
                    <div className="w-6 h-6 bg-green-600 rounded mb-1"></div>
                    <strong>Green/Yellow:</strong> Earth/Ground
                  </div>
                </div>
              </div>

              <div className="bg-background/50 rounded-lg p-4 border-l-4 border-blue-500">
                <h4 className="text-blue-400 font-semibold mb-2">Cable Separation Requirements</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Keep 24VDC control wiring separate from AC power cables (min 100mm or separate trunking)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Use shielded cable for analogue signals, shield grounded at PLC end only</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Cross power and signal cables at 90 degree angles when they must cross</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>VFD output cables: Use shielded motor cable, keep away from other signals</span>
                  </li>
                </ul>
              </div>

              <div className="bg-background/50 rounded-lg p-4 border-l-4 border-purple-500">
                <h4 className="text-purple-400 font-semibold mb-2">Terminal and Labelling</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Use ferrules on all stranded wire connections to PLC terminals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Label both ends of every wire with matching designators (e.g., "DI-001")</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Use DIN rail mounted terminal blocks for field wiring connections</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Document I/O allocation with addresses matching program tags</span>
                  </li>
                </ul>
              </div>

              <div className="bg-background/50 rounded-lg p-4 border-l-4 border-orange-500">
                <h4 className="text-orange-400 font-semibold mb-2">Suppression for Inductive Loads</h4>
                <div className="text-sm text-muted-foreground space-y-2">
                  <p className="mb-2">Always install suppression devices to protect outputs and reduce EMI:</p>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="bg-background/70 rounded p-3">
                      <strong className="text-elec-yellow">DC Loads:</strong>
                      <p className="text-xs mt-1">Flyback diode across coil (cathode to positive)</p>
                    </div>
                    <div className="bg-background/70 rounded p-3">
                      <strong className="text-elec-yellow">AC Loads:</strong>
                      <p className="text-xs mt-1">RC snubber (0.1uF + 100 Ohm) or MOV across coil</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <strong className="text-yellow-400">Safety-Critical Wiring:</strong>
                  <p className="text-muted-foreground mt-1">
                    E-stop circuits and safety functions must be hardwired through safety relays or safety
                    PLCs - never through standard PLC logic alone. Follow IEC 62443 and relevant machinery
                    directives for safety circuit design.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="bg-elec-yellow/5 border border-elec-yellow/30 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-6 h-6 text-elec-yellow" />
            <h3 className="text-xl font-bold text-elec-yellow">Quick Reference Card</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="text-foreground font-semibold border-b border-white/20 pb-1">Sinking vs Sourcing Match</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <p><span className="text-elec-yellow">PNP sensor (sourcing)</span> &rarr; Sinking input</p>
                <p><span className="text-elec-yellow">NPN sensor (sinking)</span> &rarr; Sourcing input</p>
                <p className="text-xs mt-1">Opposites attract: source matches sink</p>
              </div>

              <h4 className="text-foreground font-semibold border-b border-white/20 pb-1 pt-2">Analogue Signal Maths</h4>
              <div className="text-sm font-mono bg-background/50 rounded p-2 text-muted-foreground">
                <p>4-20mA: Value = ((mA-4)/16) x Range</p>
                <p>0-10V: Value = (V/10) x Range</p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-foreground font-semibold border-b border-white/20 pb-1">Output Type Selection</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <p><span className="text-purple-400">Relay:</span> AC/DC loads, isolation needed</p>
                <p><span className="text-blue-400">Transistor:</span> DC loads, high speed, PWM</p>
                <p><span className="text-orange-400">Triac:</span> AC loads, solid-state reliability</p>
              </div>

              <h4 className="text-foreground font-semibold border-b border-white/20 pb-1 pt-2">Common I/O Address Formats</h4>
              <div className="text-sm font-mono bg-background/50 rounded p-2 text-muted-foreground">
                <p>Siemens: %I0.0, %Q1.2, %IW64</p>
                <p>AB: I:1/0, O:2/5, I:3.0</p>
                <p>Schneider: %I0.1.0, %Q0.2.1</p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-white/20">
            <h4 className="text-foreground font-semibold mb-2">PLC Scan Cycle Sequence</h4>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="bg-elec-yellow text-background px-3 py-1 rounded font-medium">1. Read Inputs</span>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
              <span className="bg-blue-600 text-white px-3 py-1 rounded font-medium">2. Execute Program</span>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
              <span className="bg-green-600 text-white px-3 py-1 rounded font-medium">3. Write Outputs</span>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
              <span className="bg-purple-600 text-white px-3 py-1 rounded font-medium">4. Housekeeping</span>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
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
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
            <p className="text-muted-foreground mb-4">
              Test your understanding of PLC architecture, I/O types, sinking vs sourcing, and wiring best practices.
            </p>
            {!showQuiz ? (
              <Button
                onClick={() => setShowQuiz(true)}
                className="bg-elec-yellow text-background hover:bg-elec-yellow/90 min-h-[44px] touch-manipulation"
              >
                Start Quiz
              </Button>
            ) : (
              <Quiz questions={quizQuestions} />
            )}
          </div>
        </section>

        {/* Navigation */}
        <nav className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-white/10">
          <Button variant="outline" className="min-h-[44px] touch-manipulation border-white/20" asChild>
            <Link to="/study-centre/upskilling/industrial-electrical/module-3/section-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Module 3 Section 5
            </Link>
          </Button>
          <Button className="min-h-[44px] touch-manipulation bg-elec-yellow text-background hover:bg-elec-yellow/90" asChild>
            <Link to="/study-centre/upskilling/industrial-electrical/module-4/section-2">
              Next: Section 2 - Ladder Logic
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </main>
    </div>
  );
};

export default IndustrialElectricalModule4Section1;
