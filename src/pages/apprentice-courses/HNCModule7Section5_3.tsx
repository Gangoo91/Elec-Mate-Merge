import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Harmonic Mitigation - HNC Module 7 Section 5.3";
const DESCRIPTION = "Master harmonic mitigation techniques for building services: harmonic sources, effects on electrical systems, THD measurement, G5/5 limits, passive and active filters, K-rated transformers, and design considerations.";

const quickCheckQuestions = [
  {
    id: "harmonic-definition",
    question: "What is a harmonic in an electrical power system?",
    options: ["A voltage spike caused by lightning", "A sinusoidal component at a multiple of the fundamental frequency", "A transient caused by motor starting", "A resonant frequency of the building structure"],
    correctIndex: 1,
    explanation: "A harmonic is a sinusoidal component of a periodic wave having a frequency that is an integer multiple of the fundamental frequency (50 Hz in the UK). The 3rd harmonic is 150 Hz, the 5th is 250 Hz, etc."
  },
  {
    id: "thd-meaning",
    question: "What does THD stand for in power quality assessment?",
    options: ["Thermal Heat Distribution", "Total Harmonic Distortion", "Transient Harmonic Delay", "Three-phase Harmonic Detection"],
    correctIndex: 1,
    explanation: "Total Harmonic Distortion (THD) is a measurement of the harmonic distortion present in a signal, expressed as a percentage of the fundamental frequency. It quantifies how much the waveform deviates from a pure sine wave."
  },
  {
    id: "triplen-harmonics",
    question: "Why are triplen harmonics (3rd, 9th, 15th) particularly problematic in three-phase systems?",
    options: ["They cause voltage spikes", "They cancel out in the neutral", "They add arithmetically in the neutral conductor", "They only affect single-phase loads"],
    correctIndex: 2,
    explanation: "Triplen harmonics (multiples of 3) are zero-sequence components that add arithmetically in the neutral conductor rather than cancelling. This can cause neutral currents to exceed phase currents, leading to overheating."
  },
  {
    id: "passive-filter-type",
    question: "A passive harmonic filter typically consists of:",
    options: ["Power electronic switches only", "Inductors and capacitors tuned to specific frequencies", "Active semiconductor devices", "Software algorithms"],
    correctIndex: 1,
    explanation: "Passive harmonic filters use inductors and capacitors tuned to resonate at specific harmonic frequencies, providing a low-impedance path to divert harmonic currents away from the supply. They contain no active components."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which of the following is NOT a typical source of harmonics in modern buildings?",
    options: [
      "Variable speed drives (VSDs)",
      "Incandescent light bulbs",
      "LED lighting with electronic drivers",
      "Switch-mode power supplies in computers"
    ],
    correctAnswer: 1,
    explanation: "Incandescent bulbs are purely resistive loads and draw sinusoidal current, producing no harmonics. VSDs, LED drivers, and switch-mode power supplies all use power electronic switching that generates harmonic currents."
  },
  {
    id: 2,
    question: "According to Engineering Recommendation G5/5, what is the typical planning level for THD voltage at 400V?",
    options: ["2%", "5%", "8%", "12%"],
    correctAnswer: 2,
    explanation: "G5/5 sets planning levels for harmonic voltages. At 400V (LV), the typical planning level for THD is 8%. Individual harmonic limits also apply, with lower limits for lower-order harmonics."
  },
  {
    id: 3,
    question: "A VSD operating a 30 kW motor will predominantly produce which harmonic orders?",
    options: ["2nd, 4th, 6th (even harmonics)", "3rd, 9th, 15th (triplen harmonics)", "5th, 7th, 11th, 13th (characteristic harmonics)", "Only fundamental frequency"],
    correctAnswer: 2,
    explanation: "Six-pulse VSDs produce characteristic harmonics at orders 6n±1 (5th, 7th, 11th, 13th, etc.). The 5th and 7th are typically the largest. Twelve-pulse drives produce 12n±1 harmonics with reduced magnitudes."
  },
  {
    id: 4,
    question: "What is the primary effect of harmonic currents on transformer windings?",
    options: [
      "Reduced voltage output",
      "Additional heating due to increased eddy current and skin effect losses",
      "Improved power factor",
      "Reduced magnetic flux"
    ],
    correctAnswer: 1,
    explanation: "Harmonic currents cause additional heating in transformers through increased eddy current losses (proportional to frequency squared) and skin effect. This is why K-rated transformers are designed to handle harmonic-rich loads."
  },
  {
    id: 5,
    question: "A K-13 rated transformer indicates it can handle:",
    options: [
      "13 times the normal load",
      "Harmonic loading equivalent to K-factor of 13",
      "13% THD maximum",
      "Only 13 harmonic orders"
    ],
    correctAnswer: 1,
    explanation: "K-factor rating indicates a transformer's ability to handle harmonic heating. K-13 can supply loads with a K-factor up to 13 without exceeding temperature limits. Higher K-factors indicate greater harmonic content tolerance."
  },
  {
    id: 6,
    question: "Which mitigation technique would be most effective for a building with many single-phase non-linear loads causing neutral overheating?",
    options: [
      "Phase-shifting transformer",
      "Third harmonic blocking filter in the neutral",
      "Oversized neutral conductor with triplen harmonic filter",
      "Active power factor correction on each load"
    ],
    correctAnswer: 2,
    explanation: "For widespread single-phase non-linear loads (computers, LED lighting), oversizing the neutral (typically to 200% of phase) combined with a neutral-connected triplen harmonic filter addresses the specific problem of 3rd harmonic accumulation."
  },
  {
    id: 7,
    question: "An active harmonic filter works by:",
    options: [
      "Blocking harmonics with tuned LC circuits",
      "Injecting currents equal and opposite to the harmonic currents",
      "Absorbing harmonics in large capacitor banks",
      "Converting harmonics back to fundamental frequency"
    ],
    correctAnswer: 1,
    explanation: "Active harmonic filters (AHFs) use power electronics to measure harmonic currents and inject equal but opposite currents, effectively cancelling the harmonics. They can adapt to changing load conditions unlike passive filters."
  },
  {
    id: 8,
    question: "What is the main advantage of using a 12-pulse VSD configuration over a 6-pulse?",
    options: [
      "Lower cost",
      "Simpler control",
      "Reduced 5th and 7th harmonic generation",
      "Higher motor speed capability"
    ],
    correctAnswer: 2,
    explanation: "Twelve-pulse VSDs use two 6-pulse rectifiers with 30° phase shift, which cancels the 5th and 7th harmonics (the largest in 6-pulse drives). The lowest significant harmonics become 11th and 13th with reduced magnitudes."
  },
  {
    id: 9,
    question: "When measuring THD with a power quality analyser, the measurement should typically be taken over:",
    options: [
      "A single cycle (20 ms)",
      "One minute",
      "At least 10 minutes under representative load conditions",
      "24 hours minimum"
    ],
    correctAnswer: 2,
    explanation: "G5/5 and power quality standards typically require measurements over periods that capture representative operating conditions. A minimum of 10 minutes under normal load is recommended, though 24-hour surveys provide more comprehensive data."
  },
  {
    id: 10,
    question: "Detuned harmonic filters include a reactor in series with the capacitor to:",
    options: [
      "Increase the capacitor voltage rating",
      "Prevent resonance with the supply at harmonic frequencies",
      "Improve power factor correction",
      "Reduce installation costs"
    ],
    correctAnswer: 1,
    explanation: "Detuned filters add inductance to shift the resonant frequency below the lowest significant harmonic (typically tuned to 189 Hz or 134 Hz). This prevents dangerous resonance amplification while still providing power factor correction."
  },
  {
    id: 11,
    question: "Which symptom is most likely to indicate a harmonic problem in an electrical installation?",
    options: [
      "Voltage sags during motor starting",
      "Unexplained nuisance tripping of circuit breakers",
      "Flickering lights at 50 Hz",
      "Earth fault alarms"
    ],
    correctAnswer: 1,
    explanation: "Harmonics cause additional RMS current that thermal-magnetic breakers measure but may trip before the load appears overloaded. Other symptoms include overheating neutrals, transformer humming, and capacitor failures."
  },
  {
    id: 12,
    question: "For a new commercial building with substantial IT load and LED lighting, which design approach best addresses harmonics?",
    options: [
      "Standard transformers with normal neutral sizing",
      "K-rated transformer, oversized neutrals, and centralised active filtering",
      "Maximum capacitor power factor correction",
      "Diesel generator backup only"
    ],
    correctAnswer: 1,
    explanation: "A comprehensive approach includes: K-rated transformers to handle additional heating, oversized neutrals (typically 200%) for triplen harmonic current, and centralised active filtering or distributed harmonic mitigation at major non-linear loads."
  }
];

const faqs = [
  {
    question: "How do I know if a site has a harmonic problem?",
    answer: "Common indicators include: unexplained overheating of transformers, cables, or neutrals; nuisance tripping of circuit breakers; audible transformer humming or buzzing; premature failure of capacitors or power factor correction equipment; flickering or dimming of lights; interference with sensitive electronic equipment. A power quality survey with a harmonic analyser provides definitive diagnosis, measuring THD and individual harmonic magnitudes against G5/5 limits."
  },
  {
    question: "When should I specify a K-rated transformer instead of a standard unit?",
    answer: "K-rated transformers should be specified when the load has a calculated K-factor greater than 1. Use K-4 for moderate non-linear loads (up to 50% electronic), K-13 for heavy non-linear loads (data centres, UPS systems), and K-20 for extreme cases (mainframe computer rooms). Calculate K-factor using K = Σ(Ih²×h²) where Ih is the harmonic current and h is the harmonic order. If uncertain, a power quality survey of similar installations provides guidance."
  },
  {
    question: "What is the difference between passive and active harmonic filters?",
    answer: "Passive filters use tuned LC circuits to provide a low-impedance path for specific harmonic frequencies - they are lower cost but fixed in their filtering characteristics and can cause resonance issues. Active filters use power electronics to inject compensating currents, adapting to changing loads and filtering multiple harmonics simultaneously. Active filters cost more but offer superior performance for variable loads. Hybrid solutions combine both approaches."
  },
  {
    question: "Why do LED lights cause more harmonic problems than incandescent bulbs?",
    answer: "LED drivers contain switch-mode power supplies that draw current in short pulses rather than continuously. This pulsed current is rich in harmonics, particularly the 3rd harmonic. While each individual LED contributes little, the cumulative effect of thousands of LEDs in a building creates significant harmonic distortion. Modern LED drivers may include built-in harmonic filtering, and specifying drivers compliant with IEC 61000-3-2 helps manage the issue."
  },
  {
    question: "How do harmonics affect my power factor correction capacitors?",
    answer: "Capacitors present decreasing impedance to higher frequencies, attracting harmonic currents. This causes additional heating, potential resonance with supply inductance, and premature failure. Standard PFC capacitors should not be used where THD exceeds 5%. Solutions include detuned filters (capacitors with series reactors), active PFC, or relocating capacitors upstream of harmonic sources. Always assess harmonic levels before installing capacitor banks."
  }
];

const HNCModule7Section5_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module7-section5">
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
            <span>Module 7.5.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Harmonic Mitigation
          </h1>
          <p className="text-white/80">
            Harmonic sources, effects, measurement, passive and active filters, and design considerations for building services
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Harmonics:</strong> Multiples of 50 Hz from non-linear loads</li>
              <li className="pl-1"><strong>THD limit:</strong> 8% voltage at LV per G5/5</li>
              <li className="pl-1"><strong>Main sources:</strong> VSDs, LED drivers, computers</li>
              <li className="pl-1"><strong>Mitigation:</strong> Filters, K-rated transformers, oversized neutrals</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Values</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>THD voltage:</strong> ≤8% at 400V (G5/5)</li>
              <li className="pl-1"><strong>5th harmonic:</strong> ≤6% voltage limit</li>
              <li className="pl-1"><strong>Neutral sizing:</strong> 200% for triplen loads</li>
              <li className="pl-1"><strong>K-factor:</strong> K-13 typical for IT loads</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify harmonic sources in modern electrical installations",
              "Understand harmonic effects on cables, transformers, and equipment",
              "Apply THD measurement techniques and interpret G5/5 limits",
              "Design passive harmonic filter solutions for specific frequencies",
              "Specify active filters and K-rated transformers appropriately",
              "Develop harmonic mitigation strategies for building services projects"
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

        {/* Section 1: Harmonic Sources */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Harmonic Sources in Buildings
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Harmonics are sinusoidal components at frequencies that are integer multiples of the fundamental
              50 Hz supply. They are generated by non-linear loads that draw current in pulses rather than
              as a continuous sine wave, distorting both current and voltage waveforms throughout the installation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common harmonic sources in modern buildings:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Variable speed drives (VSDs):</strong> Six-pulse rectifiers produce 5th, 7th, 11th, 13th harmonics</li>
                <li className="pl-1"><strong>LED lighting:</strong> Switch-mode drivers generate predominantly 3rd harmonic current</li>
                <li className="pl-1"><strong>IT equipment:</strong> Computers, servers with switch-mode PSUs produce 3rd and 5th harmonics</li>
                <li className="pl-1"><strong>UPS systems:</strong> Both input rectifier and output inverter contribute harmonics</li>
                <li className="pl-1"><strong>Lift drives:</strong> Modern regenerative drives are significant harmonic sources</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Harmonic Orders and Characteristics</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Harmonic Order</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Frequency (Hz)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Sequence</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Primary Source</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">3rd (triplen)</td>
                      <td className="border border-white/10 px-3 py-2">150</td>
                      <td className="border border-white/10 px-3 py-2">Zero sequence</td>
                      <td className="border border-white/10 px-3 py-2">Single-phase loads (LEDs, PCs)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">5th</td>
                      <td className="border border-white/10 px-3 py-2">250</td>
                      <td className="border border-white/10 px-3 py-2">Negative sequence</td>
                      <td className="border border-white/10 px-3 py-2">VSDs, rectifiers</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">7th</td>
                      <td className="border border-white/10 px-3 py-2">350</td>
                      <td className="border border-white/10 px-3 py-2">Positive sequence</td>
                      <td className="border border-white/10 px-3 py-2">VSDs, rectifiers</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">9th (triplen)</td>
                      <td className="border border-white/10 px-3 py-2">450</td>
                      <td className="border border-white/10 px-3 py-2">Zero sequence</td>
                      <td className="border border-white/10 px-3 py-2">Single-phase loads</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">11th, 13th</td>
                      <td className="border border-white/10 px-3 py-2">550, 650</td>
                      <td className="border border-white/10 px-3 py-2">Neg/Pos sequence</td>
                      <td className="border border-white/10 px-3 py-2">VSDs, 6-pulse rectifiers</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key principle:</strong> Six-pulse converters produce harmonics at orders 6n±1 (5th, 7th, 11th, 13th...). Single-phase non-linear loads predominantly produce triplen harmonics (3rd, 9th, 15th...).
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Harmonic Effects */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Effects of Harmonics on Electrical Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Harmonic distortion causes a range of problems from increased energy losses to equipment
              damage and nuisance tripping. Understanding these effects is essential for diagnosing
              problems and specifying appropriate mitigation measures.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Thermal Effects</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Increased cable heating (skin effect)</li>
                  <li className="pl-1">Transformer overheating (eddy currents)</li>
                  <li className="pl-1">Neutral conductor overheating</li>
                  <li className="pl-1">Motor additional losses</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Operational Effects</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Nuisance tripping of MCBs/MCCBs</li>
                  <li className="pl-1">Capacitor failures and resonance</li>
                  <li className="pl-1">Metering inaccuracies</li>
                  <li className="pl-1">Electronic equipment malfunction</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Critical: Neutral Conductor Overheating</p>
              <p className="text-sm text-white">
                In three-phase systems, triplen harmonics (3rd, 9th, 15th) are zero-sequence currents that
                add arithmetically in the neutral rather than cancelling. With significant single-phase
                non-linear loads, neutral current can exceed 170% of phase current. Standard neutral sizing
                (equal to phase) becomes dangerously inadequate.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Equipment-Specific Effects</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Equipment</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Harmonic Effect</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Consequence</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Transformers</td>
                      <td className="border border-white/10 px-3 py-2">Increased eddy current and hysteresis losses</td>
                      <td className="border border-white/10 px-3 py-2">Derating required or premature failure</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cables</td>
                      <td className="border border-white/10 px-3 py-2">Skin effect increases AC resistance</td>
                      <td className="border border-white/10 px-3 py-2">Additional voltage drop and heating</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Circuit breakers</td>
                      <td className="border border-white/10 px-3 py-2">RMS current higher than expected</td>
                      <td className="border border-white/10 px-3 py-2">Nuisance tripping, inadequate protection</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Motors</td>
                      <td className="border border-white/10 px-3 py-2">Negative sequence creates counter-torque</td>
                      <td className="border border-white/10 px-3 py-2">Reduced efficiency, overheating, vibration</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Capacitors</td>
                      <td className="border border-white/10 px-3 py-2">Harmonic current amplification</td>
                      <td className="border border-white/10 px-3 py-2">Overheating, resonance, catastrophic failure</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Diagnostic indicator:</strong> If transformers or panels are running hot with loads below rated capacity, or breakers trip without apparent overload, suspect harmonic distortion.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Measurement and Standards */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            THD Measurement and G5/5 Limits
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Total Harmonic Distortion (THD) quantifies waveform distortion as a percentage of the
              fundamental. UK installations must comply with Engineering Recommendation G5/5, which
              sets planning levels to limit harmonic voltage distortion on public supply networks.
            </p>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">THD Calculation</p>
              <div className="font-mono text-sm space-y-1">
                <p>THD = √(V₂² + V₃² + V₄² + ... + Vₙ²) / V₁ × 100%</p>
                <p className="text-white/60 mt-2">Where:</p>
                <p className="text-white/80">V₁ = Fundamental voltage (50 Hz)</p>
                <p className="text-white/80">Vₙ = Voltage at harmonic order n</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">G5/5 Planning Levels at 400V (LV)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Harmonic Order</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Odd Non-Triplen</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Odd Triplen</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Even</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">5th</td>
                      <td className="border border-white/10 px-3 py-2">6%</td>
                      <td className="border border-white/10 px-3 py-2">-</td>
                      <td className="border border-white/10 px-3 py-2">-</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">7th</td>
                      <td className="border border-white/10 px-3 py-2">5%</td>
                      <td className="border border-white/10 px-3 py-2">-</td>
                      <td className="border border-white/10 px-3 py-2">-</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">3rd</td>
                      <td className="border border-white/10 px-3 py-2">-</td>
                      <td className="border border-white/10 px-3 py-2">5%</td>
                      <td className="border border-white/10 px-3 py-2">-</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">9th</td>
                      <td className="border border-white/10 px-3 py-2">-</td>
                      <td className="border border-white/10 px-3 py-2">1.5%</td>
                      <td className="border border-white/10 px-3 py-2">-</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">11th, 13th</td>
                      <td className="border border-white/10 px-3 py-2">3.5%</td>
                      <td className="border border-white/10 px-3 py-2">-</td>
                      <td className="border border-white/10 px-3 py-2">-</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">THD (total)</td>
                      <td className="border border-white/10 px-3 py-2" colSpan={3}>8%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Power quality measurement requirements:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Equipment:</strong> Class A power quality analyser per IEC 61000-4-30</li>
                <li className="pl-1"><strong>Duration:</strong> Minimum 10 minutes, preferably 24 hours or longer</li>
                <li className="pl-1"><strong>Conditions:</strong> Representative operating loads (typical working day)</li>
                <li className="pl-1"><strong>Location:</strong> Point of common coupling (PCC) and within installation</li>
                <li className="pl-1"><strong>Parameters:</strong> THD voltage, individual harmonic magnitudes, THD current</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Compliance note:</strong> G5/5 limits apply at the point of common coupling. Internal installation limits may be tighter to ensure PCC compliance when supply impedance is considered.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Mitigation Solutions */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Passive and Active Filter Solutions
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Harmonic mitigation strategies range from source treatment (reducing harmonic generation)
              to system-level filtering. The optimal solution depends on harmonic spectrum, load
              characteristics, and economic factors.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Passive Filters</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Tuned LC circuits for specific harmonics</li>
                  <li className="pl-1">Lower cost than active solutions</li>
                  <li className="pl-1">Fixed filtering characteristics</li>
                  <li className="pl-1">Risk of resonance with supply</li>
                  <li className="pl-1">Also provides reactive power compensation</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Active Filters</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Injects compensating currents</li>
                  <li className="pl-1">Adapts to changing loads</li>
                  <li className="pl-1">Filters multiple harmonics simultaneously</li>
                  <li className="pl-1">Higher cost but superior performance</li>
                  <li className="pl-1">No resonance risk</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Mitigation Techniques Comparison</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Technique</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Effectiveness</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">12-pulse VSD</td>
                      <td className="border border-white/10 px-3 py-2">Large motor drives (&gt;100 kW)</td>
                      <td className="border border-white/10 px-3 py-2">Eliminates 5th, 7th harmonics</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">18-pulse VSD</td>
                      <td className="border border-white/10 px-3 py-2">Critical applications</td>
                      <td className="border border-white/10 px-3 py-2">THD &lt;5% achievable</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">DC choke</td>
                      <td className="border border-white/10 px-3 py-2">VSD input stage</td>
                      <td className="border border-white/10 px-3 py-2">20-30% harmonic reduction</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">AC line reactor</td>
                      <td className="border border-white/10 px-3 py-2">VSD input, general loads</td>
                      <td className="border border-white/10 px-3 py-2">35-45% harmonic reduction</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Passive tuned filter</td>
                      <td className="border border-white/10 px-3 py-2">Specific harmonic orders</td>
                      <td className="border border-white/10 px-3 py-2">80-90% of targeted harmonic</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Active filter (AHF)</td>
                      <td className="border border-white/10 px-3 py-2">Centralised or distributed</td>
                      <td className="border border-white/10 px-3 py-2">THD &lt;5% across spectrum</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">K-rated transformer</td>
                      <td className="border border-white/10 px-3 py-2">Non-linear load substations</td>
                      <td className="border border-white/10 px-3 py-2">Handles harmonic heating</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">K-Factor Transformer Ratings</p>
              <div className="text-sm space-y-2">
                <p><strong>K-1:</strong> Linear loads only (motors, resistive heating)</p>
                <p><strong>K-4:</strong> Moderate non-linear loads (mixed office, some IT)</p>
                <p><strong>K-13:</strong> Heavy non-linear loads (data centres, UPS systems)</p>
                <p><strong>K-20:</strong> Extreme non-linear loads (mainframe computer rooms)</p>
                <p className="text-white/70 mt-2">K-factor = Σ(Iₕ² × h²) where Iₕ = per-unit harmonic current, h = harmonic order</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Detuned filter design considerations:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Tuning frequency:</strong> 189 Hz (7%) or 134 Hz (14%) to avoid 3rd harmonic resonance</li>
                <li className="pl-1"><strong>Reactor rating:</strong> Must handle harmonic current without saturation</li>
                <li className="pl-1"><strong>Capacitor rating:</strong> Voltage rise from reactor must be considered</li>
                <li className="pl-1"><strong>Location:</strong> Install close to non-linear loads for maximum effectiveness</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Design strategy:</strong> For new installations, specify low-harmonic equipment at source. For existing installations, centralised active filtering often provides the best cost-performance ratio.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: K-Factor Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Calculate K-factor for an IT load distribution board with measured harmonic currents.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Measured harmonic currents (per unit of fundamental):</p>
                <p className="mt-2">I₁ = 1.00 (fundamental)</p>
                <p>I₃ = 0.82 (3rd harmonic)</p>
                <p>I₅ = 0.58 (5th harmonic)</p>
                <p>I₇ = 0.38 (7th harmonic)</p>
                <p>I₉ = 0.18 (9th harmonic)</p>
                <p className="mt-2">K = Σ(Iₕ² × h²)</p>
                <p>K = (1.00² × 1²) + (0.82² × 3²) + (0.58² × 5²) + (0.38² × 7²) + (0.18² × 9²)</p>
                <p>K = 1.00 + 6.05 + 8.41 + 7.08 + 2.62</p>
                <p className="text-green-400">K = 25.16 → Specify K-30 transformer (or K-20 minimum with derating)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Neutral Conductor Sizing</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Size neutral conductor for LED lighting circuit with high 3rd harmonic content.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Given:</p>
                <p className="ml-4">Phase current = 32 A per phase</p>
                <p className="ml-4">3rd harmonic content = 80% of fundamental</p>
                <p className="mt-2">Neutral current calculation:</p>
                <p className="ml-4">Triplen harmonics add in neutral:</p>
                <p className="ml-4">I₃ per phase = 0.80 × 32 A = 25.6 A</p>
                <p className="ml-4">I₃ neutral = 3 × 25.6 A = 76.8 A</p>
                <p className="mt-2">Total neutral current (RMS):</p>
                <p className="ml-4">Includes fundamental imbalance + triplen sum</p>
                <p className="ml-4">Worst case ≈ 1.73 × phase current = 55.4 A fundamental</p>
                <p className="ml-4">Combined: √(55.4² + 76.8²) = 94.7 A</p>
                <p className="mt-2 text-green-400">Size neutral for minimum 100 A (200% of balanced phase current)</p>
                <p className="text-green-400">Use 16 mm² minimum vs 10 mm² for phases</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Active Filter Sizing</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Size centralised active harmonic filter for commercial building.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Building loads:</p>
                <p className="ml-4">- VSDs total: 150 kVA (THDi = 35%)</p>
                <p className="ml-4">- IT loads: 80 kVA (THDi = 100%)</p>
                <p className="ml-4">- LED lighting: 40 kVA (THDi = 60%)</p>
                <p className="mt-2">Harmonic current estimation:</p>
                <p className="ml-4">VSDs: 150 × 0.35 = 52.5 kVA harmonic</p>
                <p className="ml-4">IT: 80 × 1.00 = 80 kVA harmonic</p>
                <p className="ml-4">LEDs: 40 × 0.60 = 24 kVA harmonic</p>
                <p className="mt-2">Diversity factor (0.7 for different harmonic spectra):</p>
                <p className="ml-4">Total = (52.5 + 80 + 24) × 0.7 = 109.6 kVA</p>
                <p className="mt-2 text-green-400">Specify 125 kVA active harmonic filter</p>
                <p className="text-green-400">Allow 15% margin for load growth</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Harmonic Assessment Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Identify all non-linear loads and their harmonic characteristics</li>
                <li className="pl-1">Measure existing THD at point of common coupling</li>
                <li className="pl-1">Check neutral conductors for thermal stress</li>
                <li className="pl-1">Verify transformer K-factor rating against actual load</li>
                <li className="pl-1">Assess power factor correction equipment compatibility</li>
                <li className="pl-1">Review circuit breaker trip history for unexplained events</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">THD voltage limit at LV: <strong>8%</strong> per G5/5</li>
                <li className="pl-1">5th harmonic voltage limit: <strong>6%</strong></li>
                <li className="pl-1">Neutral sizing for triplen loads: <strong>200%</strong> of phase</li>
                <li className="pl-1">6-pulse VSD harmonics: <strong>6n±1</strong> (5th, 7th, 11th, 13th)</li>
                <li className="pl-1">Detuning frequency: <strong>189 Hz</strong> (7%) typical</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Installing PFC capacitors without harmonic assessment</strong> - can cause resonance and capacitor failure</li>
                <li className="pl-1"><strong>Using standard transformers for IT loads</strong> - causes overheating even at partial load</li>
                <li className="pl-1"><strong>Undersizing neutrals</strong> - triplen harmonics sum, not cancel</li>
                <li className="pl-1"><strong>Specifying passive filters without supply impedance analysis</strong> - resonance risk</li>
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
                <p className="font-medium text-white mb-1">G5/5 Limits (400V)</p>
                <ul className="space-y-0.5">
                  <li>THD voltage: 8% maximum</li>
                  <li>5th harmonic: 6% maximum</li>
                  <li>7th harmonic: 5% maximum</li>
                  <li>3rd harmonic: 5% maximum</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Mitigation Selection</p>
                <ul className="space-y-0.5">
                  <li>VSD &gt;100 kW: 12/18-pulse or AFE</li>
                  <li>IT loads: K-13+ transformer, oversized neutral</li>
                  <li>Mixed loads: Centralised active filter</li>
                  <li>PFC required: Detuned capacitors</li>
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
            <Link to="../h-n-c-module7-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module7-section5-4">
              Next: Power Factor Correction
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule7Section5_3;
