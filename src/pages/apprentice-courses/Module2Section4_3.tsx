import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "AC Waveforms & RMS - Level 2 Module 2 Section 4.3";
const DESCRIPTION = "Comprehensive guide to AC waveforms and RMS values for UK electricians: sine, square, triangle waves, peak to RMS conversion, with BS 7671 guidance.";

const quickCheckQuestions = [
  {
    id: "rms-peak",
    question: "If UK mains is 230V RMS, what is the approximate peak voltage?",
    options: ["230V", "253V", "325V", "460V"],
    correctIndex: 2,
    explanation: "Peak ≈ RMS × √2 ≈ 230 × 1.414 ≈ 325V. This matters for insulation and clearances."
  },
  {
    id: "true-rms",
    question: "When do you need a true-RMS meter instead of average-responding?",
    options: ["Only for DC", "For perfect sine waves", "For distorted/non-sinusoidal waveforms", "Never needed"],
    correctIndex: 2,
    explanation: "True-RMS meters accurately measure distorted waveforms from drives, SMPS, and LED drivers."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What does RMS represent for an AC waveform?",
    options: [
      "The average of the peaks",
      "The DC voltage that gives the same heating effect",
      "The highest possible voltage",
      "The frequency of the waveform",
    ],
    correctAnswer: 1,
    explanation: "RMS is the effective value: the DC equivalent producing the same power in a resistor.",
  },
  {
    id: 2,
    question: "For a sine wave, what is Vrms in terms of peak Vp?",
    options: ["Vp × 2", "Vp / √2", "Vp / 2", "Vp × √2"],
    correctAnswer: 1,
    explanation: "For a pure sinusoid, Vrms = Vp / √2.",
  },
  {
    id: 3,
    question: "If Vrms = 230 V (UK mains), approximately what is Vp?",
    options: ["230 V", "253 V", "325 V", "460 V"],
    correctAnswer: 2,
    explanation: "Vp ≈ Vrms × √2 ≈ 230 × 1.414 ≈ 325 V.",
  },
  {
    id: 4,
    question: "Which meter feature helps measure distorted waveforms correctly?",
    options: ["Auto range", "True-RMS", "Backlight", "Beep"],
    correctAnswer: 1,
    explanation: "True-RMS measurement is needed for non-sinusoidal waveforms.",
  },
  {
    id: 5,
    question: "A square wave spends equal time at +10 V and -10 V. What is Vrms?",
    options: ["0 V", "7.07 V", "+/-10 V", "10 V"],
    correctAnswer: 3,
    explanation: "An ideal square wave has Vrms equal to its magnitude (10 V).",
  },
  {
    id: 6,
    question: "What is the period T of a 50 Hz waveform?",
    options: ["10 ms", "20 ms", "50 ms", "100 ms"],
    correctAnswer: 1,
    explanation: "T = 1/f = 1/50 ≈ 0.02 s = 20 ms.",
  },
  {
    id: 7,
    question: "After full-wave rectification of a sine wave, what remains without smoothing?",
    options: ["Pure DC", "AC at lower frequency", "Pulsating DC (ripple)", "Zero voltage"],
    correctAnswer: 2,
    explanation: "Rectification produces pulsating DC which can be smoothed with capacitors/inductors.",
  },
  {
    id: 8,
    question: "Which waveform has the same Vrms as its magnitude (ideal case)?",
    options: ["Sine wave", "Square wave", "Triangle wave", "Random noise"],
    correctAnswer: 1,
    explanation: "An ideal square wave's Vrms equals its amplitude.",
  },
  {
    id: 9,
    question: "Why do we label Vrms on equipment instead of peak?",
    options: [
      "RMS looks nicer",
      "RMS matches power/heat effects in real loads",
      "Peak is hard to measure",
      "It's a historic rule only",
    ],
    correctAnswer: 1,
    explanation: "RMS relates directly to power and heating in resistive loads.",
  },
  {
    id: 10,
    question: "A non-sinusoidal waveform is best described by which statement?",
    options: [
      "Vrms = Vp / √2 still applies",
      "Use true-RMS to measure accurately",
      "It has no RMS value",
      "It is always dangerous",
    ],
    correctAnswer: 1,
    explanation: "Vrms = Vp/√2 is only for pure sine. Use true-RMS to read correctly on other shapes.",
  },
];

const faqs = [
  {
    question: "Why use RMS instead of peak voltage on nameplates?",
    answer: "RMS relates directly to power and heating effects in resistive loads. A 230V RMS supply delivers the same power as 230V DC, making it practical for rating equipment."
  },
  {
    question: "When do I need a true-RMS meter?",
    answer: "For non-sinusoidal waveforms from drives, SMPS, LED drivers, or any distorted supply. Average-responding meters give incorrect readings on these waveforms."
  },
  {
    question: "Is peak voltage important for safety?",
    answer: "Yes! Even though UK mains is 230V RMS, peak reaches ~325V. This affects insulation requirements, clearances, and component ratings."
  },
  {
    question: "Do square waves have the same RMS as sine waves?",
    answer: "No. An ideal square wave has RMS equal to its amplitude, while a sine wave has RMS = peak/√2. Always use true-RMS measurement for non-sine waveforms."
  },
  {
    question: "How does rectification affect waveforms?",
    answer: "Rectification flips negative parts positive, creating pulsating DC with ripple. Smoothing capacitors/inductors reduce ripple to approach pure DC."
  },
  {
    question: "Why might LED drivers cause measurement issues?",
    answer: "LED drivers often use PWM or switching techniques creating non-sinusoidal current waveforms. Use true-RMS meters and consider harmonic content."
  }
];

const Module2Section4_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2.4
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Page Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 2.4.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            AC Waveforms & RMS
          </h1>
          <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto">
            Sine, square, triangle waves and RMS values - understanding peaks, effective values and measurement techniques
          </p>
        </header>

        {/* Summary Box */}
        <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
          <h2 className="text-white font-semibold mb-3">In 30 Seconds</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-white/80">
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>AC waveforms:</strong> Sine (most common), square, triangle from drives/controls.</li>
              <li><strong>RMS:</strong> Effective value for power/heating - the nameplate number, not peak.</li>
              <li><strong>Peak relationship:</strong> For sine: Vp ≈ 1.414 × Vrms (UK: 230V → 325V peak).</li>
            </ul>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>True-RMS meters:</strong> Essential for distorted waveforms from SMPS, drives, LEDs.</li>
              <li><strong>Safety:</strong> Peak voltage affects insulation and clearance requirements.</li>
              <li><strong>Where:</strong> Drive outputs, LED drivers, UPS outputs, generator waveforms.</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Learning Outcomes
          </h2>
          <p className="text-white/70 mb-4">By the end of this section, you'll be able to:</p>
          <ul className="space-y-3 text-white/80">
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Recognise common AC waveforms: sine, square, and triangle waves</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Convert between peak and RMS values for sinusoidal waveforms</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Understand why RMS is used for equipment ratings and nameplates</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Select appropriate measurement techniques for different waveform types</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Apply safety considerations related to peak voltages and insulation</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Reference relevant BS 7671 sections for measurement and protection</span>
            </li>
          </ul>
        </section>

        {/* Section 1: Waveform Types and Characteristics */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Waveform Types and Basic Properties
          </h2>
          <div className="space-y-6 text-white/80">
            <p>
              AC waveforms come in various shapes, each with distinct characteristics affecting power, measurement, and equipment performance.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-elec-yellow mb-3">Sine Waves - The Standard</h3>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <p className="text-white text-sm mb-2"><strong>UK Mains Characteristics:</strong></p>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li><strong>RMS:</strong> 230V (effective value for power calculation)</li>
                      <li><strong>Peak:</strong> ~325V (Vp = Vrms × √2 ≈ 230 × 1.414)</li>
                      <li><strong>Frequency:</strong> 50Hz with period T = 20ms</li>
                      <li><strong>Form factor:</strong> Consistent relationship between peak and RMS</li>
                      <li><strong>Harmonics:</strong> Pure sine has no harmonic content</li>
                    </ul>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <p className="text-white text-sm mb-2"><strong>Measurement and Safety:</strong></p>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li><strong>Standard meters:</strong> Average-responding meters work correctly</li>
                      <li><strong>Peak considerations:</strong> Insulation must withstand 325V, not just 230V</li>
                      <li><strong>Power calculations:</strong> P = V²/R uses RMS values</li>
                      <li><strong>Equipment ratings:</strong> Always specified in RMS</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-elec-yellow mb-3">Square and Triangle Waves</h3>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <p className="text-white text-sm mb-2"><strong>Common Sources:</strong></p>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li><strong>Variable frequency drives:</strong> PWM outputs create quasi-square waves</li>
                      <li><strong>Switching power supplies:</strong> High-frequency switching patterns</li>
                      <li><strong>LED drivers:</strong> PWM dimming creates rectangular pulses</li>
                      <li><strong>Control systems:</strong> Digital signals and timing circuits</li>
                      <li><strong>UPS systems:</strong> Modified sine wave or square wave outputs</li>
                    </ul>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <p className="text-white text-sm mb-2"><strong>RMS Relationships:</strong></p>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li><strong>Square wave:</strong> RMS equals amplitude (not peak/√2)</li>
                      <li><strong>Triangle wave:</strong> RMS = peak/√3 ≈ 0.577 × peak</li>
                      <li><strong>Distorted sine:</strong> No simple formula - use true-RMS measurement</li>
                      <li><strong>Harmonic content:</strong> Non-sine waves contain multiple frequencies</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-elec-yellow">
                  <strong>Critical Point:</strong> The relationship Vrms = Vp/√2 only applies to pure sine waves.
                  For any other waveform shape, you must use true-RMS measurement to get accurate values.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Check 1 */}
        <div className="mb-8">
          <InlineCheck {...quickCheckQuestions[0]} />
        </div>

        {/* Section 2: RMS and Effective Values */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            RMS Values and Power Relationships
          </h2>
          <div className="space-y-6 text-white/80">
            <p>
              RMS (Root Mean Square) represents the effective value - the DC equivalent that produces the same heating effect in a resistor.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-elec-yellow mb-3">Why RMS Matters</h3>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-elec-yellow/30 p-4 rounded-lg">
                    <p className="text-elec-yellow text-sm mb-2"><strong>Power and Energy:</strong></p>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li><strong>Heating effect:</strong> RMS voltage in AC produces same heat as DC voltage of same value</li>
                      <li><strong>Power calculation:</strong> P = V²rms/R gives true average power</li>
                      <li><strong>Energy bills:</strong> kWh meters measure based on RMS values</li>
                      <li><strong>Equipment ratings:</strong> All thermal ratings use RMS</li>
                      <li><strong>Fuse/breaker ratings:</strong> Based on RMS current for thermal protection</li>
                    </ul>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <p className="text-white text-sm mb-2"><strong>Practical Applications:</strong></p>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li><strong>Motor nameplates:</strong> Voltage and current ratings are RMS</li>
                      <li><strong>Cable sizing:</strong> Based on RMS current carrying capacity</li>
                      <li><strong>Transformer ratings:</strong> kVA ratings use RMS voltage and current</li>
                      <li><strong>Lighting calculations:</strong> Lumen output relates to RMS power</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-elec-yellow mb-3">Converting Between Peak and RMS</h3>
                <div className="bg-white/5 border border-elec-yellow/30 p-4 rounded-lg">
                  <p className="text-elec-yellow text-sm mb-2"><strong>Sine Wave Relationships:</strong></p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li><strong>RMS to Peak:</strong> Vpeak = Vrms × √2 ≈ Vrms × 1.414</li>
                    <li><strong>Peak to RMS:</strong> Vrms = Vpeak ÷ √2 ≈ Vpeak × 0.707</li>
                    <li><strong>UK Example:</strong> 230V RMS → 325V peak (matters for insulation)</li>
                    <li><strong>Safety margin:</strong> Peak-to-peak = 2 × peak ≈ 650V for 230V supply</li>
                  </ul>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-elec-yellow">
                  <strong>Safety Alert:</strong> Peak voltages are significantly higher than RMS. A 230V RMS supply
                  reaches 325V peak - ensure adequate insulation and clearances for the peak value.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Check 2 */}
        <div className="mb-8">
          <InlineCheck {...quickCheckQuestions[1]} />
        </div>

        {/* Section 3: Measurement Techniques */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Measurement Techniques and Instrument Selection
          </h2>
          <div className="space-y-6 text-white/80">
            <p>
              Accurate measurement requires the right instrument for the waveform type. Wrong meter choice can give dangerously misleading readings.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-teal-400 mb-3">Average-Responding vs True-RMS</h3>
                <div className="space-y-3">
                  <div className="bg-teal-500/10 border border-teal-400/30 p-4 rounded-lg">
                    <p className="text-white text-sm mb-2"><strong>Average-Responding Meters:</strong></p>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li><strong>How they work:</strong> Measure average then apply sine wave correction factor</li>
                      <li><strong>Accurate for:</strong> Pure sine waves only</li>
                      <li><strong>Inaccurate for:</strong> Square, triangle, or distorted waves</li>
                      <li><strong>Typical error:</strong> Can read 10-40% low on non-sine waveforms</li>
                      <li><strong>Cost:</strong> Generally less expensive</li>
                    </ul>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <p className="text-white text-sm mb-2"><strong>True-RMS Meters:</strong></p>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li><strong>How they work:</strong> Calculate actual RMS value mathematically</li>
                      <li><strong>Accurate for:</strong> Any waveform shape within bandwidth limits</li>
                      <li><strong>Essential for:</strong> Drive outputs, SMPS, LED drivers, UPS systems</li>
                      <li><strong>Features:</strong> Often include crest factor and harmonic analysis</li>
                      <li><strong>Cost:</strong> More expensive but essential for modern installations</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-teal-400 mb-3">When to Use True-RMS</h3>
                <div className="bg-teal-500/10 border border-teal-400/30 p-4 rounded-lg">
                  <p className="text-white text-sm mb-2"><strong>Always Required For:</strong></p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li><strong>VFD outputs:</strong> PWM waveforms from variable frequency drives</li>
                    <li><strong>LED lighting:</strong> PWM dimming and switching driver outputs</li>
                    <li><strong>SMPS supplies:</strong> Switch-mode power supply outputs</li>
                    <li><strong>UPS systems:</strong> Modified sine wave or stepped outputs</li>
                    <li><strong>Harmonic analysis:</strong> Assessing power quality issues</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Practical Applications and Safety */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Practical Applications and Safety Considerations
          </h2>
          <div className="space-y-6 text-white/80">
            <p>
              Understanding waveforms and RMS values is essential for safe installation, accurate troubleshooting, and proper equipment selection.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-amber-400 mb-3">Installation Considerations</h3>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-amber-400/30 p-4 rounded-lg">
                    <p className="text-white text-sm mb-2"><strong>Insulation and Clearances:</strong></p>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li><strong>Design for peak:</strong> Insulation must withstand peak voltage, not just RMS</li>
                      <li><strong>Air gaps:</strong> Minimum clearances based on peak working voltage</li>
                      <li><strong>Component ratings:</strong> Ensure voltage ratings exceed peak values</li>
                      <li><strong>Cable insulation:</strong> Consider voltage grade for peak, not RMS</li>
                      <li><strong>Test voltages:</strong> Hi-pot testing often uses multiples of RMS</li>
                    </ul>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <p className="text-white text-sm mb-2"><strong>Protection Device Selection:</strong></p>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li><strong>RCD selection:</strong> Type AC suitable for sine waves only</li>
                      <li><strong>Type A RCDs:</strong> Handle pulsating DC from rectifiers</li>
                      <li><strong>Type B RCDs:</strong> Required for smooth DC and high-frequency</li>
                      <li><strong>MCB characteristics:</strong> May need adjustment for non-sine loads</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-amber-400 mb-3">Troubleshooting and Testing</h3>
                <div className="bg-white/5 border border-amber-400/30 p-4 rounded-lg">
                  <p className="text-white text-sm mb-2"><strong>Common Issues:</strong></p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li><strong>Drive problems:</strong> Distorted output waveforms affecting motor performance</li>
                    <li><strong>LED flicker:</strong> Poor driver design causing visible modulation</li>
                    <li><strong>Harmonic distortion:</strong> Non-linear loads affecting supply quality</li>
                    <li><strong>Neutral current:</strong> Harmonics causing unexpected neutral loading</li>
                    <li><strong>RCD tripping:</strong> DC components causing unwanted operation</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-elec-yellow">
                  <strong>Safety Warning:</strong> Never assume waveform type without measurement. Modern installations
                  often contain non-sinusoidal sources that require true-RMS measurement and appropriate protection devices.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Waveform Diagram */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Waveform Examples
          </h2>
          <div className="space-y-4 text-white/80">
            <img
              src="/lovable-uploads/cacf4155-ab2f-4eb1-a676-3048dc3a24aa.png"
              alt="Simple diagram showing Direct Current (flat line) and Alternating Current (sine wave) against time"
              loading="lazy"
              className="w-full rounded-lg"
            />
            <p>
              Look for three key concepts: the <strong>peak</strong> (maximum instantaneous value), the <strong>RMS</strong> level (effective value for power calculations),
              and <strong>one complete cycle (T)</strong> along the time axis.
            </p>
          </div>
        </section>

        {/* Real-world Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Real-world Examples
          </h2>
          <div className="space-y-6 text-white/80">
            <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
              <h3 className="text-elec-yellow font-semibold mb-2">LED Driver Troubleshooting</h3>
              <p className="text-sm">
                <strong>Situation:</strong> Commercial LED installation showing flicker complaints. Initial meter readings seemed normal at 230V.
                <br /><br />
                <strong>Investigation:</strong> Switched to true-RMS meter revealed highly distorted current waveform with significant ripple content.
                <br /><br />
                <strong>Solution:</strong> Replaced cheap drivers with high-quality units featuring better filtering and higher switching frequencies.
                <br /><br />
                <strong>Outcome:</strong> Eliminated flicker and reduced harmonic distortion from 25% to under 5%.
              </p>
            </div>

            <div className="bg-white/5 border border-elec-yellow/30 p-4 rounded-lg">
              <h3 className="text-elec-yellow font-semibold mb-2">VFD Installation and RCD Issues</h3>
              <p className="text-sm">
                <strong>Situation:</strong> New variable frequency drive causing RCD trips during motor starting.
                <br /><br />
                <strong>Investigation:</strong> Standard Type AC RCD couldn't handle pulsating DC component from drive's rectifier stage.
                <br /><br />
                <strong>Solution:</strong> Upgraded to Type A RCD suitable for pulsating DC and added EMC filtering per manufacturer recommendations.
                <br /><br />
                <strong>Outcome:</strong> Reliable operation with no spurious trips and improved power quality.
              </p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">08</span>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-white/10 last:border-b-0 pb-4 last:pb-0">
                <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-white/70 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pocket Guide */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">09</span>
            RMS & Waveforms - Pocket Guide
          </h2>
          <div className="grid md:grid-cols-2 gap-4 text-xs sm:text-sm text-white/80">
            <div className="space-y-2">
              <h3 className="font-semibold text-white">Quick Conversions (Sine Wave Only)</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Peak = RMS × 1.414</li>
                <li>RMS = Peak × 0.707</li>
                <li>UK: 230V RMS → 325V peak</li>
                <li>Peak-to-peak = 2 × peak</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-white">Measurement Rules</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Sine waves: Any meter OK</li>
                <li>Non-sine: True-RMS essential</li>
                <li>Square wave: RMS = amplitude</li>
                <li>Triangle: RMS ≈ 0.577 × peak</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section aria-label="Quiz" className="mb-8">
          <Quiz questions={quizQuestions} title="Test Your Knowledge - AC Waveforms & RMS" />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[44px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../4-2"><ArrowLeft className="w-4 h-4 mr-2" />Previous</Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[44px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../4-4">Next<ArrowLeft className="w-4 h-4 ml-2 rotate-180" /></Link>
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default Module2Section4_3;
