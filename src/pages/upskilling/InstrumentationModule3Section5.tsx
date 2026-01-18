import { ArrowLeft, Zap, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from '@/hooks/useSEO';

const InstrumentationModule3Section5 = () => {
  useSEO({
    title: "Signal Integrity: Noise, Grounding, and Shielding | Instrumentation Course",
    description: "Master signal integrity techniques including noise reduction, proper grounding, and cable shielding for reliable instrumentation systems."
  });

  const quizQuestions = [
    {
      id: 1,
      question: "What is a ground loop?",
      options: [
        "A type of cable connector",
        "Multiple ground points at different potentials causing current flow",
        "A grounding safety device",
        "A measurement technique"
      ],
      correct: 1,
      explanation: "A ground loop occurs when there are multiple ground connections at different potentials, causing unwanted current to flow through signal cables and creating noise."
    },
    {
      id: 2,
      question: "What type of cable is best for reducing electromagnetic interference?",
      options: [
        "Unshielded twisted pair",
        "Single conductor cable",
        "Shielded cable with drain wire",
        "Coaxial power cable"
      ],
      correct: 2,
      explanation: "Shielded cable with a drain wire provides protection against electromagnetic interference by containing electric fields and providing a path for induced currents."
    },
    {
      id: 3,
      question: "How should cable shields typically be grounded?",
      options: [
        "At both ends always",
        "At neither end",
        "At one end only for low frequency signals",
        "Only when convenient"
      ],
      correct: 2,
      explanation: "For low frequency signals, shields should be grounded at one end only to prevent ground loops. High frequency applications may require grounding at both ends with proper bonding."
    },
    {
      id: 4,
      question: "What is common mode noise?",
      options: [
        "Noise that appears on both signal wires equally",
        "Noise unique to each wire",
        "Mechanical vibration noise",
        "Audio frequency interference"
      ],
      correct: 0,
      explanation: "Common mode noise appears equally on both signal conductors relative to ground. It can be rejected by differential amplifiers with good common mode rejection ratio (CMRR)."
    },
    {
      id: 5,
      question: "Why separate signal cables from power cables?",
      options: [
        "To save space in cable trays",
        "To prevent electromagnetic coupling and interference",
        "To make identification easier",
        "To reduce installation costs"
      ],
      correct: 1,
      explanation: "Power cables generate electromagnetic fields that can couple into nearby signal cables, causing interference. Physical separation reduces this coupling significantly."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="px-4 py-3">
          <Link to=".." className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Module 3
          </Link>
        </div>
      </div>

      <div className="px-4 py-6 max-w-4xl mx-auto">
        {/* Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-elec-yellow/10 mb-4">
            <Zap className="h-6 w-6 text-elec-yellow" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Signal Integrity: Noise, Grounding, and Shielding
          </h1>
          <p className="text-white/80">
            Protect signals from interference and maintain measurement quality
          </p>
        </div>

        {/* Quick Summary */}
        <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 mb-8">
          <h2 className="font-semibold text-white mb-2">Quick Summary</h2>
          <p className="text-white text-sm">
            Signal integrity is crucial for reliable instrumentation. Understanding noise sources, proper grounding techniques, and effective shielding methods ensures accurate measurements in industrial environments.
          </p>
        </div>

        {/* Section 01: Understanding Electrical Noise */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">01</span>
            <h2 className="text-xl font-semibold text-white">Understanding Electrical Noise</h2>
          </div>

          <div className="space-y-4 text-white">
            <p>
              Electrical noise is any unwanted signal that corrupts the desired measurement signal. In instrumentation systems, noise can come from many sources and significantly affect measurement accuracy.
            </p>

            <div className="bg-card/50 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-3">Common Noise Sources</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-elec-yellow font-medium text-sm mb-2">External Sources:</h4>
                  <ul className="space-y-1 text-sm text-white">
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Power lines (50Hz mains hum)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Motors and variable speed drives
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Radio frequency transmitters
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Welding equipment
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Lightning and static discharge
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-elec-yellow font-medium text-sm mb-2">Internal Sources:</h4>
                  <ul className="space-y-1 text-sm text-white">
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Thermal noise (Johnson noise)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Shot noise in semiconductors
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Digital switching transients
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Power supply ripple
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      Amplifier input noise
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-card/50 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-3">Noise Coupling Mechanisms</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-background/50 rounded p-3">
                  <h4 className="text-elec-yellow font-medium text-sm mb-1">Capacitive Coupling</h4>
                  <p className="text-white text-xs">Electric fields couple between conductors. Increases with frequency and decreases with distance.</p>
                </div>
                <div className="bg-background/50 rounded p-3">
                  <h4 className="text-elec-yellow font-medium text-sm mb-1">Inductive Coupling</h4>
                  <p className="text-white text-xs">Magnetic fields induce voltages in loops. Worse with large loop areas near current-carrying conductors.</p>
                </div>
                <div className="bg-background/50 rounded p-3">
                  <h4 className="text-elec-yellow font-medium text-sm mb-1">Conducted Noise</h4>
                  <p className="text-white text-xs">Noise travels through power supplies and ground connections. Common in shared power systems.</p>
                </div>
                <div className="bg-background/50 rounded p-3">
                  <h4 className="text-elec-yellow font-medium text-sm mb-1">Radiated Noise</h4>
                  <p className="text-white text-xs">Electromagnetic waves picked up by cables acting as antennas. Significant at high frequencies.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck
          question="What is the primary frequency of mains hum in the UK?"
          answer="50Hz. This is the frequency of the UK mains supply, and it often appears as interference in poorly shielded or grounded instrumentation systems."
        />

        {/* Section 02: Ground Loops */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">02</span>
            <h2 className="text-xl font-semibold text-white">Ground Loops and Prevention</h2>
          </div>

          <div className="space-y-4 text-white">
            <p>
              Ground loops are one of the most common causes of noise in instrumentation systems. They occur when multiple ground connections create closed loops through which currents can flow.
            </p>

            <div className="bg-card/50 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-3">How Ground Loops Form</h3>
              <div className="bg-background/50 rounded p-4 mb-4">
                <ol className="space-y-2 text-sm text-white">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow font-bold">1.</span>
                    Two pieces of equipment are grounded at different points
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow font-bold">2.</span>
                    Small voltage differences exist between ground points
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow font-bold">3.</span>
                    Signal cable shield connects the two grounds
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow font-bold">4.</span>
                    Current flows through the shield and signal ground
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow font-bold">5.</span>
                    This current creates noise voltage in the signal
                  </li>
                </ol>
              </div>
            </div>

            <div className="bg-card/50 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-3">Ground Loop Prevention Techniques</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-medium text-sm">Single Point Grounding</h4>
                    <p className="text-white text-xs">Connect all grounds to a single reference point, creating a star topology.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-medium text-sm">Galvanic Isolation</h4>
                    <p className="text-white text-xs">Use isolators to break the conductive path between ground references.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-medium text-sm">Differential Signalling</h4>
                    <p className="text-white text-xs">Use differential inputs that reject common mode voltages including ground loop noise.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-medium text-sm">Current Loop Signals</h4>
                    <p className="text-white text-xs">4-20mA signals are inherently immune to ground loop problems.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck
          question="Why are 4-20mA current signals resistant to ground loop problems?"
          answer="Current signals maintain the same value throughout the loop regardless of voltage drops. Ground potential differences do not affect current flow in a properly designed current loop, making them immune to ground loop noise."
        />

        {/* Section 03: Cable Shielding */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">03</span>
            <h2 className="text-xl font-semibold text-white">Cable Shielding Techniques</h2>
          </div>

          <div className="space-y-4 text-white">
            <p>
              Proper cable shielding is essential for protecting sensitive signals from electromagnetic interference (EMI) in industrial environments.
            </p>

            <div className="bg-card/50 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-3">Shield Types</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-background/50 rounded p-3">
                  <h4 className="text-elec-yellow font-medium text-sm mb-2">Braided Shield</h4>
                  <ul className="text-xs text-white space-y-1">
                    <li>• Good flexibility</li>
                    <li>• 70-95% coverage typical</li>
                    <li>• Excellent for low frequency</li>
                    <li>• Moderate RF shielding</li>
                  </ul>
                </div>
                <div className="bg-background/50 rounded p-3">
                  <h4 className="text-elec-yellow font-medium text-sm mb-2">Foil Shield</h4>
                  <ul className="text-xs text-white space-y-1">
                    <li>• 100% coverage</li>
                    <li>• Best for high frequency</li>
                    <li>• Less flexible</li>
                    <li>• Requires drain wire</li>
                  </ul>
                </div>
                <div className="bg-background/50 rounded p-3">
                  <h4 className="text-elec-yellow font-medium text-sm mb-2">Combination Shield</h4>
                  <ul className="text-xs text-white space-y-1">
                    <li>• Foil plus braid</li>
                    <li>• Best overall protection</li>
                    <li>• Higher cost</li>
                    <li>• Used for critical signals</li>
                  </ul>
                </div>
                <div className="bg-background/50 rounded p-3">
                  <h4 className="text-elec-yellow font-medium text-sm mb-2">Twisted Pair</h4>
                  <ul className="text-xs text-white space-y-1">
                    <li>• Cancels magnetic fields</li>
                    <li>• Reduces crosstalk</li>
                    <li>• Often combined with shield</li>
                    <li>• Essential for differential signals</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-card/50 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-3">Shield Grounding Rules</h3>
              <div className="space-y-3">
                <div className="bg-background/50 rounded p-3">
                  <h4 className="text-white font-medium text-sm mb-2">Low Frequency Signals (below 1MHz)</h4>
                  <p className="text-white text-xs">
                    Ground shield at one end only, typically at the receiving end (instrument or PLC). This prevents ground loops while still providing electrostatic shielding.
                  </p>
                </div>
                <div className="bg-background/50 rounded p-3">
                  <h4 className="text-white font-medium text-sm mb-2">High Frequency Signals (above 1MHz)</h4>
                  <p className="text-white text-xs">
                    Ground shield at both ends with low impedance connections. May require additional bonding at intermediate points for long runs.
                  </p>
                </div>
                <div className="bg-background/50 rounded p-3">
                  <h4 className="text-white font-medium text-sm mb-2">Mixed Environment</h4>
                  <p className="text-white text-xs">
                    Use foil shield grounded at one end for low frequency, with overall braid grounded at both ends for high frequency protection.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Cable Installation Practices */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">04</span>
            <h2 className="text-xl font-semibold text-white">Cable Installation Best Practices</h2>
          </div>

          <div className="space-y-4 text-white">
            <div className="bg-card/50 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-3">Separation Requirements</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-elec-yellow font-semibold">Cable Type</th>
                      <th className="text-left py-3 px-4 text-white font-semibold">Minimum Separation</th>
                    </tr>
                  </thead>
                  <tbody className="text-white">
                    <tr className="border-b border-border/50">
                      <td className="py-3 px-4">Signal to Power (unshielded)</td>
                      <td className="py-3 px-4">300mm minimum</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 px-4">Signal to Power (shielded)</td>
                      <td className="py-3 px-4">150mm minimum</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 px-4">Signal to VSD cables</td>
                      <td className="py-3 px-4">500mm or more</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">Crossing angle (if unavoidable)</td>
                      <td className="py-3 px-4">90 degrees</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-card/50 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-3">Installation Guidelines</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-elec-yellow font-medium text-sm mb-2">Do:</h4>
                  <ul className="space-y-1 text-sm text-white">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Use separate cable trays for signal and power
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Route signal cables away from noise sources
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Use metal conduit for additional shielding
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Keep cable runs as short as practical
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-elec-yellow font-medium text-sm mb-2">Avoid:</h4>
                  <ul className="space-y-1 text-sm text-white">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">x</span>
                      Parallel runs with power cables
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">x</span>
                      Routing near VSD output cables
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">x</span>
                      Loose shield connections
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">x</span>
                      Pigtail shield terminations
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck
          question="Why should signal cables cross power cables at 90 degrees rather than running parallel?"
          answer="Crossing at 90 degrees minimises the magnetic coupling between cables. When cables run parallel, the magnetic field from the power cable induces voltage along the entire length of the signal cable. A 90-degree crossing reduces this to a single point of minimal interaction."
        />

        {/* Section 05: Noise Filtering */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">05</span>
            <h2 className="text-xl font-semibold text-white">Noise Filtering Techniques</h2>
          </div>

          <div className="space-y-4 text-white">
            <div className="bg-card/50 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-3">Hardware Filtering</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-background/50 rounded p-3">
                  <h4 className="text-elec-yellow font-medium text-sm mb-1">RC Filters</h4>
                  <p className="text-white text-xs">Simple first-order low-pass filters at signal inputs. Effective for high-frequency noise rejection.</p>
                </div>
                <div className="bg-background/50 rounded p-3">
                  <h4 className="text-elec-yellow font-medium text-sm mb-1">Ferrite Beads</h4>
                  <p className="text-white text-xs">High-frequency suppression on cable entries. Acts as a frequency-dependent resistor.</p>
                </div>
                <div className="bg-background/50 rounded p-3">
                  <h4 className="text-elec-yellow font-medium text-sm mb-1">EMI Filters</h4>
                  <p className="text-white text-xs">Mains input filters to prevent conducted noise. Essential for sensitive equipment.</p>
                </div>
                <div className="bg-background/50 rounded p-3">
                  <h4 className="text-elec-yellow font-medium text-sm mb-1">Transient Suppressors</h4>
                  <p className="text-white text-xs">TVS diodes and MOVs protect against voltage spikes and surges.</p>
                </div>
              </div>
            </div>

            <div className="bg-card/50 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-3">Software and Digital Filtering</h3>
              <ul className="space-y-2 text-sm text-white">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <div>
                    <strong>Averaging:</strong> Multiple readings averaged to reduce random noise
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <div>
                    <strong>Moving average:</strong> Rolling average of recent samples for smooth output
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <div>
                    <strong>Median filtering:</strong> Rejects outliers and impulse noise effectively
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <div>
                    <strong>Digital low-pass:</strong> Software implementation of frequency filtering
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 06: Troubleshooting */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow font-bold text-sm">06</span>
            <h2 className="text-xl font-semibold text-white">Troubleshooting Signal Integrity Issues</h2>
          </div>

          <div className="bg-card/50 rounded-lg p-4">
            <h3 className="font-semibold text-white mb-3">Systematic Approach</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-elec-yellow text-black text-xs font-bold flex-shrink-0">1</div>
                <div>
                  <h4 className="text-white font-medium text-sm">Characterise the Noise</h4>
                  <p className="text-white text-xs">Use an oscilloscope to identify noise frequency and pattern. 50Hz suggests mains coupling; high-frequency spikes suggest switching noise.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-elec-yellow text-black text-xs font-bold flex-shrink-0">2</div>
                <div>
                  <h4 className="text-white font-medium text-sm">Identify the Source</h4>
                  <p className="text-white text-xs">Turn off suspected noise sources one at a time. Check if noise correlates with specific equipment operation.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-elec-yellow text-black text-xs font-bold flex-shrink-0">3</div>
                <div>
                  <h4 className="text-white font-medium text-sm">Check Grounding</h4>
                  <p className="text-white text-xs">Verify single-point grounding. Look for multiple ground paths and unintended connections.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-elec-yellow text-black text-xs font-bold flex-shrink-0">4</div>
                <div>
                  <h4 className="text-white font-medium text-sm">Inspect Cable Routing</h4>
                  <p className="text-white text-xs">Check for inadequate separation from power cables, proper shield termination, and cable damage.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-elec-yellow text-black text-xs font-bold flex-shrink-0">5</div>
                <div>
                  <h4 className="text-white font-medium text-sm">Apply Remediation</h4>
                  <p className="text-white text-xs">Implement appropriate fixes: add filtering, improve shielding, re-route cables, or add isolation.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>

          <div className="space-y-4">
            <div className="bg-card/50 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">How do I know if I have a ground loop problem?</h3>
              <p className="text-white text-sm">
                Common symptoms include 50Hz hum on signals, readings that change when nearby equipment is switched on or off, and noise that disappears when you disconnect one end of the cable shield. An oscilloscope will show 50Hz or harmonics superimposed on the signal.
              </p>
            </div>

            <div className="bg-card/50 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">Should I always use shielded cable for instrumentation?</h3>
              <p className="text-white text-sm">
                In industrial environments, yes. The small additional cost of shielded cable is worthwhile insurance against interference problems. Only in very clean electrical environments with short cable runs might unshielded cable be acceptable.
              </p>
            </div>

            <div className="bg-card/50 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">What if I cannot maintain recommended cable separation?</h3>
              <p className="text-white text-sm">
                Use better shielded cable, metal conduit, or signal isolators. For crossings, ensure they are at 90 degrees. Consider using 4-20mA current loops instead of voltage signals for better noise immunity.
              </p>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-8">
          <SingleQuestionQuiz questions={quizQuestions} />
        </section>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between gap-3 pt-6 border-t border-border">
          <Link to="/study-centre/upskilling/instrumentation-module-3-section-4" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
          <Link to="/study-centre/upskilling/instrumentation-module-4" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-elec-yellow text-black hover:bg-elec-yellow/90">
              Next Module
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InstrumentationModule3Section5;
