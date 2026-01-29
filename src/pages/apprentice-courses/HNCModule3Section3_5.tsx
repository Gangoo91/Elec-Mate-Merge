import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Harmonics - Sources, Effects and Mitigation - HNC Module 3 Section 3.5";
const DESCRIPTION = "Master harmonic distortion in building services: understand harmonic frequencies, triplen harmonics, sources in VSDs and LED lighting, effects on electrical systems, and mitigation techniques including filters and K-rated transformers.";

const quickCheckQuestions = [
  {
    id: "third-harmonic-freq",
    question: "What is the frequency of the 3rd harmonic in a 50Hz UK supply system?",
    options: ["100Hz", "150Hz", "200Hz", "250Hz"],
    correctIndex: 1,
    explanation: "The 3rd harmonic frequency = 3 × fundamental frequency = 3 × 50Hz = 150Hz. Harmonic frequencies are integer multiples of the fundamental frequency."
  },
  {
    id: "triplen-neutral",
    question: "In a balanced three-phase system with non-linear loads, which harmonics add together in the neutral conductor?",
    options: ["All odd harmonics", "All even harmonics", "Triplen harmonics (3rd, 9th, 15th)", "5th and 7th harmonics only"],
    correctIndex: 2,
    explanation: "Triplen harmonics (3rd, 9th, 15th, 21st, etc.) are zero-sequence harmonics that add arithmetically in the neutral conductor rather than cancelling. This can cause neutral currents up to 1.73 times the phase current."
  },
  {
    id: "vsd-harmonics",
    question: "A 6-pulse Variable Speed Drive (VSD) primarily produces which dominant harmonics?",
    options: ["3rd and 9th", "5th and 7th", "2nd and 4th", "11th and 13th"],
    correctIndex: 1,
    explanation: "A standard 6-pulse VSD produces harmonics of order h = (6n ± 1), where n = 1, 2, 3... This gives 5th, 7th, 11th, 13th, etc. The 5th and 7th are typically the most significant."
  },
  {
    id: "k-rated-transformer",
    question: "What is the primary purpose of a K-rated transformer?",
    options: ["Reduce voltage drop", "Withstand additional heating from harmonic currents", "Provide galvanic isolation", "Improve power factor"],
    correctIndex: 1,
    explanation: "K-rated transformers are designed with additional thermal capacity to handle the increased I²R heating caused by harmonic currents. The K-factor indicates the transformer's ability to serve non-linear loads."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What defines the order of a harmonic?",
    options: [
      "Its phase angle relative to the fundamental",
      "The number of times greater its frequency is than the fundamental",
      "Its amplitude as a percentage of the fundamental",
      "Its power contribution to the total waveform"
    ],
    correctAnswer: 1,
    explanation: "Harmonic order is the ratio of the harmonic frequency to the fundamental frequency. A 3rd harmonic has 3 times the fundamental frequency (150Hz in a 50Hz system)."
  },
  {
    id: 2,
    question: "Why do single-phase electronic loads predominantly produce odd harmonics?",
    options: [
      "Because AC current flows in one direction",
      "Because they have symmetrical positive and negative half-cycles",
      "Because the rectifier uses two diodes",
      "Because the supply voltage is sinusoidal"
    ],
    correctAnswer: 1,
    explanation: "Most electronic loads draw current symmetrically on positive and negative half-cycles. This half-wave symmetry in the time domain results in only odd harmonics being present in the frequency spectrum."
  },
  {
    id: 3,
    question: "In a 400V three-phase system with 100A per phase of triplen harmonic current, what could the neutral current theoretically reach?",
    options: ["0A", "100A", "173A", "300A"],
    correctAnswer: 3,
    explanation: "Triplen harmonics are zero-sequence and add arithmetically in the neutral. With 100A of triplen harmonic current per phase, the neutral current could reach 3 × 100A = 300A."
  },
  {
    id: 4,
    question: "What is Total Harmonic Distortion (THD)?",
    options: [
      "The sum of all harmonic frequencies",
      "The ratio of the fundamental to total current",
      "The RMS value of all harmonics expressed as a percentage of the fundamental",
      "The peak voltage of the distorted waveform"
    ],
    correctAnswer: 2,
    explanation: "THD is calculated as √(I₂² + I₃² + I₄² + ...)/I₁ × 100%, representing the total harmonic content as a percentage of the fundamental component."
  },
  {
    id: 5,
    question: "Which type of filter is most commonly used to reduce 5th harmonic distortion?",
    options: ["High-pass filter", "Low-pass filter", "Tuned passive filter", "Band-stop filter"],
    correctAnswer: 2,
    explanation: "Tuned passive filters are designed to provide a low-impedance path at a specific harmonic frequency, diverting that harmonic current away from the supply. They are commonly tuned to the 5th harmonic (250Hz)."
  },
  {
    id: 6,
    question: "What effect do harmonics have on energy meter accuracy?",
    options: [
      "No effect - meters measure true RMS",
      "Older meters may under-read actual energy consumption",
      "All meters over-read by exactly 10%",
      "Meters become more accurate with harmonics"
    ],
    correctAnswer: 1,
    explanation: "Traditional electromechanical meters were designed for sinusoidal waveforms and may not accurately measure energy in harmonic-rich environments. Modern electronic meters typically handle harmonics better, but verification may be required."
  },
  {
    id: 7,
    question: "According to BS 7671, what consideration is required for neutral conductors in circuits supplying harmonic-generating equipment?",
    options: [
      "Neutral must always be twice the phase conductor size",
      "Neutral can be reduced to 50% of phase conductor size",
      "Neutral may need to be oversized due to triplen harmonic currents",
      "Neutral conductor is not required for harmonic loads"
    ],
    correctAnswer: 2,
    explanation: "BS 7671 Regulation 523.6.3 addresses neutral current in harmonic-rich circuits. Where third harmonic current exceeds 15% of the fundamental, the neutral conductor may need to be larger than the phase conductors."
  },
  {
    id: 8,
    question: "What is the primary advantage of using a 12-pulse VSD over a 6-pulse VSD?",
    options: [
      "Lower cost",
      "Elimination of 5th and 7th harmonics",
      "Higher efficiency",
      "Simpler installation"
    ],
    correctAnswer: 1,
    explanation: "A 12-pulse VSD produces harmonics of order h = (12n ± 1), eliminating the 5th, 7th, 17th, 19th harmonics. The lowest significant harmonics are the 11th and 13th, which are smaller in magnitude."
  },
  {
    id: 9,
    question: "What is the typical K-factor rating recommended for a transformer supplying a data centre with high harmonic loads?",
    options: ["K-1", "K-4", "K-13", "K-30"],
    correctAnswer: 2,
    explanation: "Data centres with servers, UPS systems, and IT equipment typically require K-13 rated transformers. K-4 is suitable for light harmonic loads, while K-20 or higher may be needed for extremely non-linear loads."
  },
  {
    id: 10,
    question: "Which harmonic can cause overheating of three-phase motors due to negative sequence effects?",
    options: ["3rd harmonic", "5th harmonic", "7th harmonic", "9th harmonic"],
    correctAnswer: 1,
    explanation: "The 5th harmonic creates a negative sequence component that produces a reverse rotating magnetic field in motors. This opposes the fundamental field, causing additional heating, vibration, and reduced torque."
  }
];

const faqs = [
  {
    question: "Why are harmonics becoming more of a concern in modern buildings?",
    answer: "Modern buildings have dramatically increased non-linear loads: LED lighting, computers, servers, VSDs for HVAC motors, and UPS systems. A typical modern office building may have 50-70% of its load from non-linear sources, compared to less than 20% thirty years ago. This concentration of harmonic-generating equipment creates cumulative effects that can cause significant power quality problems."
  },
  {
    question: "How do I measure harmonics on site?",
    answer: "Use a power quality analyser capable of measuring individual harmonic currents and voltages up to at least the 25th harmonic. Key measurements include THD (Total Harmonic Distortion), individual harmonic magnitudes, and neutral current. EN 50160 and Engineering Recommendation G5/5 define acceptable limits. Measurements should be taken over a representative period, typically a week minimum."
  },
  {
    question: "When is an active harmonic filter better than a passive filter?",
    answer: "Active filters are preferred when: loads vary significantly, multiple harmonic orders need treatment, space is limited, or precise harmonic reduction is required. Passive filters are more cost-effective for fixed loads with dominant single harmonics. Active filters can adapt to changing conditions and won't cause resonance issues, but are more expensive and complex."
  },
  {
    question: "Can harmonics damage equipment?",
    answer: "Yes, harmonics can cause: transformer and motor overheating, capacitor failure (due to resonance), nuisance tripping of RCDs and MCBs, premature failure of contactors and relays, interference with sensitive electronic equipment, and accelerated insulation degradation. The economic impact includes increased energy losses, equipment replacement costs, and reduced system reliability."
  },
  {
    question: "What is the difference between voltage and current harmonics?",
    answer: "Current harmonics are generated by non-linear loads drawing non-sinusoidal current. Voltage harmonics result from these harmonic currents flowing through system impedances, creating harmonic voltage drops. A stiff supply (low impedance) will have lower voltage THD for the same current THD. Voltage THD is typically limited to 5% at the point of common coupling."
  },
  {
    question: "How do harmonics affect power factor correction capacitors?",
    answer: "Capacitive reactance decreases with frequency (Xc = 1/2πfC), so capacitors attract harmonic currents. If a harmonic frequency coincides with the system's resonant frequency (determined by supply inductance and capacitor value), dangerous resonance can occur, potentially destroying capacitors and causing voltage magnification. Detuned reactors or active PFC are often required in harmonic-rich environments."
  }
];

const HNCModule3Section3_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 3.3.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Harmonics - Sources, Effects and Mitigation
          </h1>
          <p className="text-white/80">
            Understanding and managing harmonic distortion in modern building electrical systems
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Harmonics:</strong> Currents/voltages at multiples of 50Hz fundamental</li>
              <li className="pl-1"><strong>Sources:</strong> VSDs, LED drivers, IT equipment, UPS systems</li>
              <li className="pl-1"><strong>Triplen (3rd, 9th, 15th):</strong> Add in neutral - can exceed phase current</li>
              <li className="pl-1"><strong>Mitigation:</strong> Filters, K-rated transformers, phase shifting</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Data centres:</strong> High THD from IT loads - K-13 transformers typical</li>
              <li className="pl-1"><strong>LED lighting:</strong> Poor power factor drivers generate harmonics</li>
              <li className="pl-1"><strong>HVAC VSDs:</strong> Major harmonic source in commercial buildings</li>
              <li className="pl-1"><strong>BS 7671:</strong> Neutral sizing for harmonic loads (Reg 523.6.3)</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain harmonic frequencies and their relationship to the fundamental",
              "Distinguish between odd, even, and triplen harmonics and their effects",
              "Identify common harmonic sources in building services installations",
              "Describe the effects of harmonics on transformers, motors, and cables",
              "Apply mitigation techniques including filters and K-rated transformers",
              "Understand BS 7671 requirements for harmonic-rich environments"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 1: Harmonic Fundamentals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Harmonic Fundamentals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Harmonics are currents or voltages at frequencies that are integer multiples of the fundamental
              supply frequency. In the UK's 50Hz system, the 3rd harmonic is at 150Hz, the 5th at 250Hz,
              and so on. These harmonics combine with the fundamental to create distorted waveforms.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key harmonic concepts:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Harmonic order (h):</strong> The multiple of the fundamental frequency (3rd, 5th, 7th...)</li>
                <li className="pl-1"><strong>Fundamental (h=1):</strong> The 50Hz component - the intended power frequency</li>
                <li className="pl-1"><strong>THD:</strong> Total Harmonic Distortion - measures overall harmonic content</li>
                <li className="pl-1"><strong>Fourier analysis:</strong> Any periodic waveform can be decomposed into harmonics</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Harmonic Frequencies in a 50Hz System</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Harmonic Order</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Frequency</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Sequence</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1st (Fundamental)</td>
                      <td className="border border-white/10 px-3 py-2">50Hz</td>
                      <td className="border border-white/10 px-3 py-2">Positive</td>
                      <td className="border border-white/10 px-3 py-2">The intended supply</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">3rd</td>
                      <td className="border border-white/10 px-3 py-2">150Hz</td>
                      <td className="border border-white/10 px-3 py-2">Zero</td>
                      <td className="border border-white/10 px-3 py-2">Triplen - adds in neutral</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">5th</td>
                      <td className="border border-white/10 px-3 py-2">250Hz</td>
                      <td className="border border-white/10 px-3 py-2">Negative</td>
                      <td className="border border-white/10 px-3 py-2">Reverse rotating field in motors</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">7th</td>
                      <td className="border border-white/10 px-3 py-2">350Hz</td>
                      <td className="border border-white/10 px-3 py-2">Positive</td>
                      <td className="border border-white/10 px-3 py-2">Forward rotating field in motors</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">9th</td>
                      <td className="border border-white/10 px-3 py-2">450Hz</td>
                      <td className="border border-white/10 px-3 py-2">Zero</td>
                      <td className="border border-white/10 px-3 py-2">Triplen - adds in neutral</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">11th</td>
                      <td className="border border-white/10 px-3 py-2">550Hz</td>
                      <td className="border border-white/10 px-3 py-2">Negative</td>
                      <td className="border border-white/10 px-3 py-2">Common from 12-pulse drives</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">13th</td>
                      <td className="border border-white/10 px-3 py-2">650Hz</td>
                      <td className="border border-white/10 px-3 py-2">Positive</td>
                      <td className="border border-white/10 px-3 py-2">Common from 12-pulse drives</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Sequence matters:</strong> Positive sequence harmonics (1, 4, 7, 10...) rotate in the same direction
              as the fundamental. Negative sequence (2, 5, 8, 11...) rotate opposite. Zero sequence (3, 6, 9, 12...)
              do not create a rotating field but add in the neutral.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Odd, Even and Triplen Harmonics */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Odd, Even and Triplen Harmonics
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding the different categories of harmonics is essential for predicting their effects
              and selecting appropriate mitigation strategies. Each type behaves differently in three-phase systems.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="font-medium text-elec-yellow mb-2">Odd Harmonics</p>
                <p className="text-sm text-white/90 mb-2">3rd, 5th, 7th, 9th, 11th...</p>
                <ul className="text-xs text-white/80 space-y-1 list-disc list-outside ml-4">
                  <li>Predominant in most non-linear loads</li>
                  <li>Result from half-wave symmetry</li>
                  <li>Most significant for power quality</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="font-medium text-elec-yellow mb-2">Even Harmonics</p>
                <p className="text-sm text-white/90 mb-2">2nd, 4th, 6th, 8th...</p>
                <ul className="text-xs text-white/80 space-y-1 list-disc list-outside ml-4">
                  <li>Rare - indicate asymmetrical operation</li>
                  <li>Present in half-wave rectifiers</li>
                  <li>May indicate equipment faults</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="font-medium text-elec-yellow mb-2">Triplen Harmonics</p>
                <p className="text-sm text-white/90 mb-2">3rd, 9th, 15th, 21st...</p>
                <ul className="text-xs text-white/80 space-y-1 list-disc list-outside ml-4">
                  <li>Zero-sequence (in-phase)</li>
                  <li>Add arithmetically in neutral</li>
                  <li>Critical for neutral sizing</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Critical: Triplen Harmonics and Neutral Current</p>
              <p className="text-sm text-white/90 mb-3">
                In a balanced three-phase system, fundamental currents cancel in the neutral. However, triplen
                harmonics are all in-phase (zero-sequence) and ADD together:
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Neutral current (triplen) = 3 × Phase triplen current</p>
                <p className="mt-2">Example: If each phase has 40A of 3rd harmonic current:</p>
                <p>I<sub>N</sub> = 3 × 40A = <strong>120A in neutral</strong></p>
                <p className="mt-2 text-red-400">This can exceed the phase current, causing neutral overheating!</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Why Odd Harmonics Dominate</p>
              <p className="text-sm text-white/90">
                Most electronic loads draw current symmetrically on both half-cycles of the AC waveform.
                This half-wave symmetry means the positive and negative half-cycles are mirror images,
                which mathematically results in only odd harmonic components. Even harmonics would require
                asymmetry between half-cycles - typically indicating a fault condition or unusual load characteristic.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design rule:</strong> When third harmonic current exceeds 15% of the fundamental,
              consider increasing neutral conductor size per BS 7671 Regulation 523.6.3.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Harmonic Sources */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Sources of Harmonics in Building Services
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Non-linear loads draw current in a non-sinusoidal pattern, generating harmonics. Modern buildings
              are increasingly dominated by these loads, making harmonic management a critical design consideration.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Major Harmonic Sources</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Source</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Dominant Harmonics</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical THD<sub>i</sub></th>
                      <th className="border border-white/10 px-3 py-2 text-left">Building Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">6-pulse VSD</td>
                      <td className="border border-white/10 px-3 py-2">5th, 7th, 11th, 13th</td>
                      <td className="border border-white/10 px-3 py-2">30-80%</td>
                      <td className="border border-white/10 px-3 py-2">HVAC fans, pumps</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">LED drivers (SMPS)</td>
                      <td className="border border-white/10 px-3 py-2">3rd, 5th, 7th</td>
                      <td className="border border-white/10 px-3 py-2">20-150%</td>
                      <td className="border border-white/10 px-3 py-2">Lighting throughout</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Computers/servers</td>
                      <td className="border border-white/10 px-3 py-2">3rd dominant</td>
                      <td className="border border-white/10 px-3 py-2">60-100%</td>
                      <td className="border border-white/10 px-3 py-2">Offices, data centres</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">UPS systems</td>
                      <td className="border border-white/10 px-3 py-2">5th, 7th, 11th</td>
                      <td className="border border-white/10 px-3 py-2">25-35%</td>
                      <td className="border border-white/10 px-3 py-2">Data centres, critical loads</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lift drives</td>
                      <td className="border border-white/10 px-3 py-2">5th, 7th</td>
                      <td className="border border-white/10 px-3 py-2">40-60%</td>
                      <td className="border border-white/10 px-3 py-2">Vertical transportation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fluorescent lighting</td>
                      <td className="border border-white/10 px-3 py-2">3rd, 5th</td>
                      <td className="border border-white/10 px-3 py-2">15-25%</td>
                      <td className="border border-white/10 px-3 py-2">Legacy installations</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Variable Speed Drives (VSDs)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Input rectifier draws pulsed current</li>
                  <li className="pl-1">6-pulse produces h = (6n ± 1): 5, 7, 11, 13...</li>
                  <li className="pl-1">12-pulse produces h = (12n ± 1): 11, 13, 23, 25...</li>
                  <li className="pl-1">Active front end VSDs have lowest THD</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">LED Lighting Systems</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Switch-mode drivers generate harmonics</li>
                  <li className="pl-1">3rd harmonic particularly high</li>
                  <li className="pl-1">Poor quality drivers can exceed 100% THD</li>
                  <li className="pl-1">Cumulative effect significant in large installations</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">IT Equipment and Data Centres</p>
              <p className="text-sm text-white/90 mb-3">
                Server power supplies use switch-mode rectification, drawing current only at the peak
                of each half-cycle. This creates a characteristic current waveform with very high
                3rd harmonic content - often 80% of the fundamental or more.
              </p>
              <p className="text-sm text-white/70">
                A data centre with 1MW of IT load may generate 800kW equivalent of 3rd harmonic current,
                requiring careful neutral conductor sizing and transformer specification.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design consideration:</strong> In modern buildings, assume 60-80% of loads are non-linear
              when calculating harmonic effects unless specific load data is available.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Effects of Harmonics */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Effects of Harmonics on Electrical Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Harmonics cause a range of problems from nuisance issues to serious equipment damage.
              Understanding these effects is essential for designing robust building electrical systems.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Thermal Effects (Overheating)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Equipment</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Heating Mechanism</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Consequences</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Transformers</td>
                      <td className="border border-white/10 px-3 py-2">Increased eddy current and hysteresis losses</td>
                      <td className="border border-white/10 px-3 py-2">Reduced capacity, shortened life</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cables</td>
                      <td className="border border-white/10 px-3 py-2">Skin effect increases AC resistance</td>
                      <td className="border border-white/10 px-3 py-2">Overheating, insulation degradation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Neutral conductors</td>
                      <td className="border border-white/10 px-3 py-2">Triplen harmonic currents add</td>
                      <td className="border border-white/10 px-3 py-2">Can exceed phase current capacity</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Motors</td>
                      <td className="border border-white/10 px-3 py-2">Opposing torques, rotor heating</td>
                      <td className="border border-white/10 px-3 py-2">Reduced efficiency, vibration</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Capacitors</td>
                      <td className="border border-white/10 px-3 py-2">Dielectric heating at high frequencies</td>
                      <td className="border border-white/10 px-3 py-2">Premature failure, potential fire</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Resonance Issues</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Capacitors and inductors can create resonant circuits</li>
                  <li className="pl-1">If resonant frequency matches a harmonic, current magnifies</li>
                  <li className="pl-1">Can cause capacitor explosion or fuse failure</li>
                  <li className="pl-1">Voltage distortion amplified at resonance</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Interference Effects</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">EMC issues with sensitive equipment</li>
                  <li className="pl-1">Telephone and data cable interference</li>
                  <li className="pl-1">Audio system hum (150Hz particularly audible)</li>
                  <li className="pl-1">Control system malfunctions</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Energy Metering Errors</p>
              <p className="text-sm text-white/90">
                Traditional electromechanical meters were calibrated for sinusoidal waveforms. In harmonic-rich
                environments, they may under-register actual energy consumption by 10-15%, resulting in revenue
                loss for utilities and inaccurate energy management data. Modern electronic meters conforming
                to BS EN 50470 are more accurate for distorted waveforms.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Protective Device Operation</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>RCDs:</strong> May nuisance trip due to high-frequency leakage currents</li>
                <li className="pl-1"><strong>MCBs:</strong> Magnetic trip may occur at lower RMS currents</li>
                <li className="pl-1"><strong>Fuses:</strong> Peak currents cause faster deterioration</li>
                <li className="pl-1"><strong>Electronic relays:</strong> May misoperate if not rated for harmonics</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Motor effect:</strong> The 5th harmonic creates a reverse-rotating magnetic field that
              opposes motor torque, causing additional heating and reducing net output by 2-5% in severe cases.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Section 5: Harmonic Mitigation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Harmonic Mitigation Techniques
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Several strategies can reduce harmonic levels to acceptable limits. The choice depends on the
              severity of the problem, available space, budget, and whether mitigation is applied at source
              or system-wide.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Passive Harmonic Filters</p>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm text-white/90 mb-3">
                  Tuned LC circuits providing a low-impedance path for specific harmonic frequencies,
                  diverting them from the supply.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-white mb-1">Advantages</p>
                    <ul className="text-white/80 space-y-0.5 list-disc list-outside ml-4 text-xs">
                      <li>Simple, robust technology</li>
                      <li>No power electronics</li>
                      <li>Also provide reactive power compensation</li>
                      <li>Cost-effective for single harmonics</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Limitations</p>
                    <ul className="text-white/80 space-y-0.5 list-disc list-outside ml-4 text-xs">
                      <li>Must be tuned to specific frequency</li>
                      <li>Risk of resonance at other frequencies</li>
                      <li>Large physical size</li>
                      <li>Fixed compensation only</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Active Harmonic Filters</p>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm text-white/90 mb-3">
                  Power electronic devices that inject currents equal and opposite to measured harmonics,
                  actively cancelling distortion.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-white mb-1">Advantages</p>
                    <ul className="text-white/80 space-y-0.5 list-disc list-outside ml-4 text-xs">
                      <li>Adapts to changing loads</li>
                      <li>Corrects multiple harmonics simultaneously</li>
                      <li>Compact size</li>
                      <li>No resonance risk</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Limitations</p>
                    <ul className="text-white/80 space-y-0.5 list-disc list-outside ml-4 text-xs">
                      <li>Higher initial cost</li>
                      <li>Requires maintenance</li>
                      <li>Power electronics can fail</li>
                      <li>Limited capacity per unit</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">K-Rated Transformers</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">K-Rating</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Loads</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">K-1</td>
                      <td className="border border-white/10 px-3 py-2">Standard - resistive loads</td>
                      <td className="border border-white/10 px-3 py-2">Heating, incandescent lighting</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">K-4</td>
                      <td className="border border-white/10 px-3 py-2">Light harmonics</td>
                      <td className="border border-white/10 px-3 py-2">General commercial, some LED</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">K-13</td>
                      <td className="border border-white/10 px-3 py-2">Moderate harmonics</td>
                      <td className="border border-white/10 px-3 py-2">Data centres, high IT load offices</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">K-20</td>
                      <td className="border border-white/10 px-3 py-2">High harmonics</td>
                      <td className="border border-white/10 px-3 py-2">VSD-heavy industrial, large UPS</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">K-30+</td>
                      <td className="border border-white/10 px-3 py-2">Very high harmonics</td>
                      <td className="border border-white/10 px-3 py-2">Specialist applications</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-white/70 mt-2">
                K-factor indicates increased heating capacity. A K-13 transformer can handle harmonic loads that
                would cause a K-1 transformer to overheat by 13 times.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Phase-Shifting Transformers</p>
              <p className="text-sm text-white/90 mb-2">
                Using multiple transformers with different phase shifts can cancel specific harmonics.
                A delta-star and delta-delta pair with 30° phase shift eliminates 5th and 7th harmonics
                when loads are balanced.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Two transformers with 30° shift: Cancels 5th, 7th harmonics</li>
                <li className="pl-1">Three transformers with 20° shift: Cancels 5th, 7th, 11th, 13th</li>
                <li className="pl-1">Requires balanced load distribution between transformers</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Line Reactors and DC Link Chokes</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Line reactors (3-5%):</strong> Reduce THD from VSDs by 30-50%</li>
                <li className="pl-1"><strong>DC link chokes:</strong> Smooth current drawn by VSD input rectifier</li>
                <li className="pl-1"><strong>Combined approach:</strong> Can reduce VSD THD from 80% to 30%</li>
                <li className="pl-1">Cost-effective first step before considering filters</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design strategy:</strong> Address harmonics at source (12-pulse drives, line reactors)
              before system-wide solutions (filters). This is usually more cost-effective and reduces distribution losses.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 6: BS 7671 Requirements */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            BS 7671 Requirements for Harmonic Environments
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The 18th Edition of BS 7671 includes specific requirements for installations with
              significant harmonic content, particularly regarding neutral conductor sizing and
              equipment selection.
            </p>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Regulation 523.6.3 - Neutral Conductor Sizing</p>
              <p className="text-sm text-white/90 mb-3">
                Where the third harmonic content of line conductors is greater than 15%, the neutral
                conductor shall have a cross-sectional area at least equal to that of the line conductors.
              </p>
              <p className="text-sm text-white/70">
                Where third harmonic content exceeds 33%, the neutral current may exceed the phase current.
                In such cases, the neutral conductor may need to be sized based on the neutral current rather
                than the phase current, potentially requiring a larger neutral than phase conductors.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key BS 7671 Considerations</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Regulation</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Requirement</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">523.6.3</td>
                      <td className="border border-white/10 px-3 py-2">Neutral sizing for harmonic loads</td>
                      <td className="border border-white/10 px-3 py-2">All harmonic-rich circuits</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Appendix 4</td>
                      <td className="border border-white/10 px-3 py-2">Current-carrying capacity tables</td>
                      <td className="border border-white/10 px-3 py-2">Cable sizing considerations</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">332.1</td>
                      <td className="border border-white/10 px-3 py-2">Assessment of characteristics</td>
                      <td className="border border-white/10 px-3 py-2">Identify harmonic sources</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">512.1.5</td>
                      <td className="border border-white/10 px-3 py-2">Electromagnetic compatibility</td>
                      <td className="border border-white/10 px-3 py-2">Prevention of interference</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Engineering Recommendation G5/5</p>
              <p className="text-sm text-white/90 mb-2">
                Published by the Energy Networks Association, G5/5 sets limits for harmonic distortion
                at the point of common coupling (PCC) with the distribution network:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Voltage THD limit:</strong> Typically 5% at LV point of common coupling</li>
                <li className="pl-1"><strong>Individual harmonic limits:</strong> Vary by harmonic order</li>
                <li className="pl-1"><strong>Applies to:</strong> Connections above certain power thresholds</li>
                <li className="pl-1"><strong>Assessment:</strong> May be required for large non-linear loads</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Neutral Sizing Decision Process</p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>1. Determine third harmonic content (I₃) as % of fundamental (I₁)</p>
                <p className="mt-2">2. If I₃ ≤ 15%:</p>
                <p className="ml-4">Neutral = Standard sizing per Appendix 4</p>
                <p className="mt-2">3. If 15% &lt; I₃ ≤ 33%:</p>
                <p className="ml-4">Neutral ≥ Phase conductor size</p>
                <p className="mt-2">4. If I₃ &gt; 33%:</p>
                <p className="ml-4">Calculate: I<sub>N</sub> = 3 × I₃</p>
                <p className="ml-4">Size neutral based on I<sub>N</sub> if &gt; I<sub>phase</sub></p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Documentation:</strong> The Electrical Installation Certificate should note where
              neutral conductors have been sized for harmonic loads to inform future modifications.
            </p>
          </div>
        </section>

        {/* Section 7: Building Services Applications */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Building Services Applications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Different building types present varying harmonic challenges. Understanding the typical
              load profiles helps in specifying appropriate mitigation from the design stage.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Data Centres</p>
              <p className="text-sm text-white/90 mb-3">
                The most demanding environment for harmonic management, with IT loads often representing
                70-90% of total building consumption.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Typical THD:</strong> 30-50% current distortion at transformer</li>
                <li className="pl-1"><strong>Transformer:</strong> K-13 minimum, K-20 for high density</li>
                <li className="pl-1"><strong>UPS selection:</strong> Specify input THD and PF requirements</li>
                <li className="pl-1"><strong>Neutral sizing:</strong> Often 150-200% of phase conductor</li>
                <li className="pl-1"><strong>PDU design:</strong> Consider active filtering at rack level</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Modern Office Buildings</p>
              <p className="text-sm text-white/90 mb-3">
                High concentration of computers, LED lighting, and variable air volume (VAV) systems
                create cumulative harmonic loading.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>IT load:</strong> Computers, monitors, printers - high 3rd harmonic</li>
                <li className="pl-1"><strong>Lighting:</strong> LED drivers throughout - 3rd, 5th harmonics</li>
                <li className="pl-1"><strong>HVAC:</strong> VSD-controlled AHUs and FCUs - 5th, 7th harmonics</li>
                <li className="pl-1"><strong>Recommendation:</strong> K-4 to K-13 transformers, check neutral sizing</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Industrial Facilities</p>
              <p className="text-sm text-white/90 mb-3">
                Variable speed drives for motors often dominate the harmonic profile, but loads are
                typically more predictable than commercial buildings.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>VSD specification:</strong> Consider 12-pulse or AFE drives for large motors</li>
                <li className="pl-1"><strong>Line reactors:</strong> Standard 3% reactors on all VSDs</li>
                <li className="pl-1"><strong>Capacitor PFC:</strong> Use detuned reactors to avoid resonance</li>
                <li className="pl-1"><strong>Centralised filtering:</strong> May be cost-effective for large installations</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Design Checklist for Harmonic-Rich Environments</p>
              <div className="grid sm:grid-cols-2 gap-2">
                {[
                  "Identify and quantify harmonic-generating loads",
                  "Calculate neutral currents including triplen harmonics",
                  "Specify appropriate K-rated transformers",
                  "Size cables for harmonic heating effects",
                  "Verify PFC capacitor compatibility",
                  "Consider detuned reactors for capacitor banks",
                  "Specify line reactors for VSDs",
                  "Evaluate need for harmonic filtering",
                  "Check protective device ratings for harmonics",
                  "Document harmonic considerations in design"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-white">
                    <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Future-proofing:</strong> With increasing electrification (EV charging, heat pumps)
              and renewable integration (inverters), harmonic levels in buildings are expected to increase.
              Design with margin for future harmonic growth.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Neutral Current Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A three-phase 100A per phase lighting circuit has LED drivers
                generating 40% third harmonic current. Calculate the neutral current.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Third harmonic current per phase:</p>
                <p>I₃ = 100A × 0.40 = 40A per phase</p>
                <p className="mt-2">Fundamental neutral current (balanced): 0A (cancels)</p>
                <p className="mt-2">Third harmonic neutral current (adds):</p>
                <p>I<sub>N(3rd)</sub> = 3 × 40A = <strong>120A</strong></p>
                <p className="mt-2">Total neutral RMS (if only 3rd harmonic):</p>
                <p>I<sub>N</sub> ≈ <strong>120A</strong></p>
                <p className="mt-2 text-red-400">Neutral current exceeds phase current!</p>
                <p className="text-white/60">→ Neutral must be sized for 120A minimum</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: K-Factor Selection</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A transformer supplies a data centre with the following harmonic profile.
                Calculate the K-factor and recommend transformer rating.
              </p>
              <div className="text-xs text-white/80 mb-2">
                I₁ = 100%, I₃ = 80%, I₅ = 60%, I₇ = 40%, I₉ = 20%
              </div>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>K-factor = Σ(Iₕ² × h²) / Σ(Iₕ²)</p>
                <p className="mt-2">Numerator:</p>
                <p>= (1² × 1²) + (0.8² × 3²) + (0.6² × 5²) + (0.4² × 7²) + (0.2² × 9²)</p>
                <p>= 1 + 5.76 + 9 + 7.84 + 3.24 = 26.84</p>
                <p className="mt-2">Denominator:</p>
                <p>= 1² + 0.8² + 0.6² + 0.4² + 0.2² = 1.84</p>
                <p className="mt-2">K-factor = 26.84 / 1.84 = <strong>14.6</strong></p>
                <p className="mt-2 text-green-400">→ Specify K-20 transformer (next standard rating above)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: THD Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A VSD draws the following harmonic currents:
                I₁ = 100A, I₅ = 25A, I₇ = 14A, I₁₁ = 9A, I₁₃ = 7A. Calculate the THD.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>THD = √(I₅² + I₇² + I₁₁² + I₁₃² + ...) / I₁ × 100%</p>
                <p className="mt-2">Harmonic sum of squares:</p>
                <p>= 25² + 14² + 9² + 7² = 625 + 196 + 81 + 49 = 951</p>
                <p className="mt-2">THD = √951 / 100 × 100%</p>
                <p>THD = 30.8 / 100 × 100% = <strong>30.8%</strong></p>
                <p className="mt-2 text-white/60">This is typical for a 6-pulse VSD without filtering</p>
                <p className="text-white/60">→ Consider 3% line reactor to reduce to ~20%</p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Essential Formulas</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Harmonic frequency:</strong> f<sub>h</sub> = h × f<sub>1</sub> (e.g., 3rd = 3 × 50 = 150Hz)</li>
                <li className="pl-1"><strong>THD:</strong> √(ΣI<sub>h</sub>²) / I<sub>1</sub> × 100%</li>
                <li className="pl-1"><strong>Neutral triplen current:</strong> I<sub>N</sub> = 3 × I<sub>triplen per phase</sub></li>
                <li className="pl-1"><strong>6-pulse harmonics:</strong> h = 6n ± 1 (5, 7, 11, 13...)</li>
                <li className="pl-1"><strong>12-pulse harmonics:</strong> h = 12n ± 1 (11, 13, 23, 25...)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">3rd harmonic: <strong>150Hz</strong> - triplen, adds in neutral</li>
                <li className="pl-1">5th harmonic: <strong>250Hz</strong> - negative sequence, reverse motor rotation</li>
                <li className="pl-1">Neutral sizing threshold: <strong>15%</strong> third harmonic</li>
                <li className="pl-1">Voltage THD limit (G5/5): Typically <strong>5%</strong> at PCC</li>
                <li className="pl-1">Line reactor THD reduction: <strong>30-50%</strong> improvement</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Assuming balanced neutral:</strong> Triplen harmonics do not cancel</li>
                <li className="pl-1"><strong>Ignoring skin effect:</strong> AC resistance increases at higher frequencies</li>
                <li className="pl-1"><strong>Standard capacitors in harmonic environment:</strong> Causes resonance</li>
                <li className="pl-1"><strong>K-1 transformer for IT loads:</strong> Will overheat and fail prematurely</li>
                <li className="pl-1"><strong>Not documenting harmonic considerations:</strong> Affects future modifications</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/90 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Harmonic Categories</p>
                <ul className="space-y-0.5">
                  <li>Odd (3, 5, 7...): Predominant in non-linear loads</li>
                  <li>Even (2, 4, 6...): Indicate asymmetry/faults</li>
                  <li>Triplen (3, 9, 15...): Zero-sequence, add in neutral</li>
                  <li>Positive seq (1, 4, 7...): Forward rotating</li>
                  <li>Negative seq (2, 5, 8...): Reverse rotating</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Mitigation Options</p>
                <ul className="space-y-0.5">
                  <li>Line reactors: 30-50% THD reduction</li>
                  <li>Passive filters: Single harmonic, cost-effective</li>
                  <li>Active filters: Multi-harmonic, adaptive</li>
                  <li>K-rated transformers: Handle harmonic heating</li>
                  <li>12-pulse drives: Eliminate 5th/7th harmonics</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section3-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Waveforms
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section3-6">
              Next: Power Factor Correction
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule3Section3_5;
