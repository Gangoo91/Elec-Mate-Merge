import { ArrowLeft, Volume2, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Noise Control Methods - HNC Module 2 Section 4.5";
const DESCRIPTION = "Understanding noise control at source, path, and receiver including attenuation, barriers, acoustic enclosures, and silencers for building services.";

const quickCheckQuestions = [
  {
    id: "control-hierarchy",
    question: "Which is the most effective approach in the noise control hierarchy?",
    options: [
      "Hearing protection for occupants",
      "Sound barriers in the transmission path",
      "Reduction at source",
      "Absorption in the receiving room"
    ],
    correctIndex: 2,
    explanation: "Source control is most effective because it eliminates the problem at origin. Path control and receiver protection are secondary measures when source control is insufficient or impractical."
  },
  {
    id: "mass-law",
    question: "According to the mass law, doubling the surface mass of a partition increases its sound reduction by approximately:",
    options: ["3 dB", "6 dB", "10 dB", "20 dB"],
    correctIndex: 1,
    explanation: "The mass law predicts approximately 6 dB increase in transmission loss for each doubling of surface mass. Heavy constructions provide better sound insulation than light ones."
  },
  {
    id: "silencer-type",
    question: "Which type of silencer is most commonly used in HVAC ductwork?",
    options: ["Reactive silencer", "Absorptive silencer", "Active noise control", "Barrier silencer"],
    correctIndex: 1,
    explanation: "Absorptive (dissipative) silencers using mineral wool or similar materials are standard in HVAC ductwork. They provide broadband attenuation and acceptable pressure drop."
  },
  {
    id: "vibration-isolation",
    question: "What is the purpose of anti-vibration mounts beneath rotating machinery?",
    options: [
      "To reduce airborne noise directly",
      "To prevent structure-borne noise transmission",
      "To improve machine efficiency",
      "To meet electrical safety requirements"
    ],
    correctIndex: 1,
    explanation: "Anti-vibration mounts isolate machinery vibration from the building structure, preventing structure-borne sound transmission which can radiate as noise in distant rooms."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What are the three locations where noise can be controlled?",
    options: [
      "Input, process, output",
      "Source, path, receiver",
      "Generation, transmission, absorption",
      "Plant, duct, room"
    ],
    correctAnswer: 1,
    explanation: "The noise control hierarchy addresses: Source (where noise is generated), Path (how it travels), and Receiver (where it is heard). Source control is preferred but all three may be needed."
  },
  {
    id: 2,
    question: "Which source control measure would reduce fan noise most effectively?",
    options: [
      "Installing a silencer downstream",
      "Selecting a fan operating at its best efficiency point",
      "Adding absorption to the plant room",
      "Increasing duct velocity"
    ],
    correctAnswer: 1,
    explanation: "Fans are quietest when operating at their best efficiency point (BEP). Oversized or undersized fans running away from BEP generate significantly more noise. Good selection is the primary noise control."
  },
  {
    id: 3,
    question: "What is 'breakout noise' in ductwork?",
    options: [
      "Noise escaping through duct joints",
      "Noise radiating through duct walls into surrounding spaces",
      "Noise generated at duct fittings",
      "Noise at air terminals"
    ],
    correctAnswer: 1,
    explanation: "Breakout noise occurs when sound inside the duct radiates through the duct walls into adjacent spaces. It is significant with thin-walled ducts near noise-sensitive areas."
  },
  {
    id: 4,
    question: "A sound barrier must break the line of sight between source and receiver. What additional reduction comes from increasing barrier height?",
    options: [
      "Unlimited - taller is always better",
      "Diminishing returns - each doubling gives less benefit",
      "None - only line of sight matters",
      "Linear - each metre gives equal benefit"
    ],
    correctAnswer: 1,
    explanation: "Barrier attenuation follows diminishing returns. The first break of line of sight gives the most benefit (typically 5-10 dB). Additional height gives smaller improvements due to diffraction effects."
  },
  {
    id: 5,
    question: "What is the main advantage of a double-leaf partition over a single-leaf of the same total mass?",
    options: [
      "Lower cost",
      "Higher sound reduction at most frequencies",
      "Better fire resistance",
      "Easier installation"
    ],
    correctAnswer: 1,
    explanation: "Double-leaf (cavity) constructions outperform single-leaf of equal mass because the air cavity provides additional decoupling. Adding absorption in the cavity improves performance further."
  },
  {
    id: 6,
    question: "An absorptive silencer achieves attenuation primarily by:",
    options: [
      "Reflecting sound back to source",
      "Converting sound energy to heat in porous material",
      "Creating destructive interference",
      "Increasing duct velocity"
    ],
    correctAnswer: 1,
    explanation: "Absorptive silencers contain porous materials (mineral wool, acoustic foam) that convert sound energy to heat through friction as sound waves pass through. This provides broadband attenuation."
  },
  {
    id: 7,
    question: "What is the 'coincidence dip' in partition sound insulation?",
    options: [
      "A frequency where insulation improves",
      "A frequency where insulation drops due to panel resonance",
      "The lowest audible frequency blocked",
      "The point where mass law fails"
    ],
    correctAnswer: 1,
    explanation: "The coincidence dip occurs when sound wavelength in air matches bending waves in the panel, causing increased transmission. It typically occurs in the 1-4 kHz range depending on panel properties."
  },
  {
    id: 8,
    question: "Which of these is an example of path control in building services?",
    options: [
      "Selecting quieter equipment",
      "Providing hearing protection",
      "Installing flexible connections to ductwork",
      "Sound masking in open plan offices"
    ],
    correctAnswer: 2,
    explanation: "Flexible connections (canvas, rubber) prevent vibration transmission along ductwork - a path control measure. Quieter equipment is source control; PPE and masking are receiver-based."
  },
  {
    id: 9,
    question: "Why are acoustic enclosures typically lined internally with absorptive material?",
    options: [
      "For thermal insulation",
      "To prevent build-up of reverberant sound inside",
      "For fire protection",
      "To reduce weight"
    ],
    correctAnswer: 1,
    explanation: "Internal absorption prevents sound reflecting repeatedly inside the enclosure, which would increase levels and cause more breakout. Without absorption, enclosure performance is significantly reduced."
  },
  {
    id: 10,
    question: "What type of silencer would you specify for a domestic boiler flue with pulsating combustion noise?",
    options: [
      "Absorptive silencer",
      "Reactive silencer",
      "Active noise control",
      "No silencer needed"
    ],
    correctAnswer: 1,
    explanation: "Reactive silencers (expansion chambers, resonators) are effective for low frequency pulsating noise from combustion equipment. They work by creating acoustic impedance mismatches rather than absorption."
  },
  {
    id: 11,
    question: "What is crosstalk in building acoustics?",
    options: [
      "Speech interference from adjacent rooms",
      "Sound transmission through shared ductwork between rooms",
      "Noise from telecommunications equipment",
      "Reverberation between parallel walls"
    ],
    correctAnswer: 1,
    explanation: "Crosstalk occurs when sound travels between rooms through shared ductwork, acting as an acoustic 'short circuit' bypassing partition insulation. It requires attenuators or duct routing solutions."
  },
  {
    id: 12,
    question: "What is regenerated noise in ductwork systems?",
    options: [
      "Noise from the fan",
      "Noise generated at fittings, dampers, and terminals",
      "Breakout noise",
      "Structure-borne noise"
    ],
    correctAnswer: 1,
    explanation: "Regenerated noise is created at ductwork components (bends, dampers, grilles) by turbulence as air flows through. High velocities cause excessive regenerated noise - limiting velocity is essential."
  }
];

const faqs = [
  {
    question: "How do I decide between source, path, and receiver control?",
    answer: "Follow the hierarchy: source control first (quieter equipment, better installation), then path control (barriers, enclosures, isolation), then receiver protection (hearing protection, exposure limits). Source control is most effective and sustainable. Path control can be expensive but necessary for existing installations. Receiver-only solutions are last resort and often require ongoing management."
  },
  {
    question: "When should I use an acoustic enclosure versus a silencer?",
    answer: "Acoustic enclosures suit stationary equipment radiating noise in all directions (compressors, pumps, generators). Silencers suit noise travelling through ducts or pipes (fan noise in ductwork, engine exhausts). Often both are needed - an enclosure around a fan plus a silencer in the connected ductwork. Consider access requirements, ventilation, and heat dissipation for enclosures."
  },
  {
    question: "How much attenuation can I expect from a typical HVAC silencer?",
    answer: "Standard rectangular absorptive silencers typically provide 10-25 dB attenuation depending on length, splitter configuration, and frequency. Longer silencers and more splitters give more attenuation but increase pressure drop. Manufacturers provide insertion loss data at octave band frequencies. Low frequency attenuation requires longer silencers or reactive designs."
  },
  {
    question: "What causes flanking transmission and how do I prevent it?",
    answer: "Flanking occurs when sound bypasses a partition through connected structures - walls, floors, ceilings, services. Prevention includes: structural breaks at partition edges, proper sealing of service penetrations, avoiding rigid connections between spaces, and ensuring the partition SRI exceeds flanking paths. Flanking limits achievable isolation regardless of partition performance."
  },
  {
    question: "How effective are noise barriers outdoors?",
    answer: "Barriers breaking line of sight typically provide 5-10 dB reduction for point sources. Additional height gives diminishing returns. Barriers are most effective for high frequencies; low frequencies diffract over the top. Practical limitations include: distance from source to barrier, receiver distance, ground reflections, and barrier length (sound goes around ends too)."
  },
  {
    question: "What velocity limits should I observe to control regenerated noise?",
    answer: "CIBSE guidelines for background noise-sensitive areas: main ducts 5-7.5 m/s, branches 3-5 m/s, near grilles 2-3 m/s. Higher velocities are acceptable in less sensitive areas or plant rooms. Regenerated noise increases roughly with v⁵ to v⁶, so small velocity reductions give significant noise reductions. Always check grille Nc ratings against room criteria."
  }
];

const HNCModule2Section4_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module2-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Volume2 className="h-4 w-4" />
            <span>Module 2.4.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Noise Control Methods
          </h1>
          <p className="text-white/80">
            Source, path, and receiver control strategies for building services acoustic design
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Source control:</strong> Quieter equipment, good selection</li>
              <li className="pl-1"><strong>Path control:</strong> Barriers, enclosures, silencers</li>
              <li className="pl-1"><strong>Receiver control:</strong> PPE, exposure limits</li>
              <li className="pl-1"><strong>Mass law:</strong> +6 dB per doubling of mass</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Duct silencers:</strong> 10-25 dB attenuation</li>
              <li className="pl-1"><strong>AV mounts:</strong> Vibration isolation</li>
              <li className="pl-1"><strong>Flexible connections:</strong> Break transmission</li>
              <li className="pl-1"><strong>Velocity limits:</strong> Control regenerated noise</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the source-path-receiver noise control hierarchy",
              "Describe source control measures for building services plant",
              "Apply the mass law to partition design",
              "Specify silencer types for ductwork applications",
              "Understand acoustic enclosure design principles",
              "Prevent structure-borne noise transmission"
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

        {/* Section 1: Source Control */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Source Control - Reducing Noise at Origin
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Source control is the most effective and cost-efficient approach to noise management. By selecting
              quieter equipment and ensuring optimal operating conditions, noise problems can often be eliminated
              before they arise.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Source Control Strategies</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Equipment</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Source Control Measures</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fans</td>
                      <td className="border border-white/10 px-3 py-2">Select for BEP operation, specify low noise options, avoid oversizing</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Pumps</td>
                      <td className="border border-white/10 px-3 py-2">Match duty point, avoid cavitation, seal type selection</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Compressors</td>
                      <td className="border border-white/10 px-3 py-2">Scroll vs reciprocating type, variable speed operation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Chillers</td>
                      <td className="border border-white/10 px-3 py-2">Specification of Lw limits, acoustic packages, location</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ductwork</td>
                      <td className="border border-white/10 px-3 py-2">Low velocities, gradual transitions, avoid sharp bends</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Equipment Selection</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Request Lw data at duty point</li>
                  <li className="pl-1">Compare octave band spectra</li>
                  <li className="pl-1">Specify maximum noise limits</li>
                  <li className="pl-1">Consider acoustic options/packages</li>
                  <li className="pl-1">Avoid operation away from BEP</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">System Design</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Locate plant away from sensitive spaces</li>
                  <li className="pl-1">Size ducts for low velocity</li>
                  <li className="pl-1">Use radius bends not mitred</li>
                  <li className="pl-1">Allow straight duct before silencers</li>
                  <li className="pl-1">Separate supplies to adjacent rooms</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key principle:</strong> Every dB reduced at source is worth 10 dB of path treatment. Always address source control before specifying acoustic treatments.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Path Control - Barriers and Enclosures */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Path Control - Barriers and Enclosures
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              When source control alone is insufficient, path control measures reduce noise during transmission from
              source to receiver. This includes physical barriers, acoustic enclosures, and treatments to the
              transmission path itself.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Mass Law</p>
              <p className="font-mono text-center text-lg mb-2">R ≈ 20 log₁₀(f × m) - 48 dB</p>
              <div className="text-xs text-white/70 text-center mt-2">
                R = sound reduction index, f = frequency (Hz), m = surface mass (kg/m²)
              </div>
              <p className="text-xs text-white/70 text-center mt-2">
                Doubling mass or frequency increases R by approximately 6 dB
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Barrier and Enclosure Performance</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Construction</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Mass (kg/m²)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Rw (dB)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">12.5mm plasterboard (single)</td>
                      <td className="border border-white/10 px-3 py-2">10</td>
                      <td className="border border-white/10 px-3 py-2">28</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Double plasterboard on studs</td>
                      <td className="border border-white/10 px-3 py-2">20</td>
                      <td className="border border-white/10 px-3 py-2">35-45</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">100mm blockwork (plastered)</td>
                      <td className="border border-white/10 px-3 py-2">150</td>
                      <td className="border border-white/10 px-3 py-2">45</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">215mm brick (plastered)</td>
                      <td className="border border-white/10 px-3 py-2">400</td>
                      <td className="border border-white/10 px-3 py-2">50</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Steel acoustic enclosure (lined)</td>
                      <td className="border border-white/10 px-3 py-2">20-50</td>
                      <td className="border border-white/10 px-3 py-2">25-40</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Enclosure Design Principles</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Heavy, airtight construction</li>
                  <li className="pl-1">Internal absorption (prevent build-up)</li>
                  <li className="pl-1">Vibration isolation from equipment</li>
                  <li className="pl-1">Ventilation with attenuated openings</li>
                  <li className="pl-1">Access for maintenance</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Barrier Limitations</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Must break line of sight</li>
                  <li className="pl-1">Low frequency diffraction limits effect</li>
                  <li className="pl-1">Sound goes around ends too</li>
                  <li className="pl-1">Diminishing returns with height</li>
                  <li className="pl-1">Typically 5-15 dB maximum</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Double-leaf construction:</strong> A cavity partition with absorption outperforms a single-leaf of equal total mass by 10-15 dB at mid-high frequencies.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Silencers and Attenuators */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Silencers and Attenuators
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Silencers (attenuators) reduce noise travelling through ductwork and pipework. They are essential
              for preventing plant noise from reaching occupied spaces through the ventilation system.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Silencer Types</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Mechanism</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Effectiveness</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Absorptive (dissipative)</td>
                      <td className="border border-white/10 px-3 py-2">Sound energy converted to heat</td>
                      <td className="border border-white/10 px-3 py-2">HVAC ductwork</td>
                      <td className="border border-white/10 px-3 py-2">Broadband, mid-high freq</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Reactive</td>
                      <td className="border border-white/10 px-3 py-2">Impedance mismatch reflects sound</td>
                      <td className="border border-white/10 px-3 py-2">Exhausts, combustion</td>
                      <td className="border border-white/10 px-3 py-2">Low frequency, tuned</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Combination</td>
                      <td className="border border-white/10 px-3 py-2">Both absorption and reaction</td>
                      <td className="border border-white/10 px-3 py-2">Industrial, high performance</td>
                      <td className="border border-white/10 px-3 py-2">Wide frequency range</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Active</td>
                      <td className="border border-white/10 px-3 py-2">Anti-phase sound cancellation</td>
                      <td className="border border-white/10 px-3 py-2">Specific low freq problems</td>
                      <td className="border border-white/10 px-3 py-2">Low frequency tonal</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Absorptive Silencer Performance Factors</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Length:</strong> Longer = more attenuation (but more pressure drop)</li>
                <li className="pl-1"><strong>Splitters:</strong> More splitters = more attenuation (narrower airways)</li>
                <li className="pl-1"><strong>Material:</strong> Thicker absorption = better low frequency performance</li>
                <li className="pl-1"><strong>Facing:</strong> Perforated metal protects material, slight HF loss</li>
                <li className="pl-1"><strong>Velocity:</strong> Self-noise increases with velocity (limit ~10 m/s)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Silencer Attenuation (Rectangular, 900mm)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Frequency (Hz)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">125</th>
                      <th className="border border-white/10 px-3 py-2 text-left">250</th>
                      <th className="border border-white/10 px-3 py-2 text-left">500</th>
                      <th className="border border-white/10 px-3 py-2 text-left">1k</th>
                      <th className="border border-white/10 px-3 py-2 text-left">2k</th>
                      <th className="border border-white/10 px-3 py-2 text-left">4k</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Insertion Loss (dB)</td>
                      <td className="border border-white/10 px-3 py-2">8</td>
                      <td className="border border-white/10 px-3 py-2">15</td>
                      <td className="border border-white/10 px-3 py-2">22</td>
                      <td className="border border-white/10 px-3 py-2">28</td>
                      <td className="border border-white/10 px-3 py-2">25</td>
                      <td className="border border-white/10 px-3 py-2">18</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-white/60 mt-2">Values are indicative - always use manufacturer's data for specific products</p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Selection tip:</strong> Match silencer to noise spectrum. Standard absorptive silencers are weak at low frequencies - specify longer silencers or reactive sections for low frequency problems.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Vibration Isolation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Vibration Isolation and Structure-Borne Sound
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Structure-borne sound occurs when vibration from machinery is transmitted through building structure
              and re-radiated as airborne noise in distant rooms. Vibration isolation at the source prevents this
              transmission path.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Vibration Isolation Elements</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Isolator Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Use</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Natural Frequency</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Rubber pads</td>
                      <td className="border border-white/10 px-3 py-2">Light equipment, low isolation</td>
                      <td className="border border-white/10 px-3 py-2">15-30 Hz</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Neoprene mounts</td>
                      <td className="border border-white/10 px-3 py-2">FCUs, small pumps</td>
                      <td className="border border-white/10 px-3 py-2">10-20 Hz</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Steel springs</td>
                      <td className="border border-white/10 px-3 py-2">AHUs, chillers, large pumps</td>
                      <td className="border border-white/10 px-3 py-2">3-8 Hz</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Air springs</td>
                      <td className="border border-white/10 px-3 py-2">Precision equipment, very low freq</td>
                      <td className="border border-white/10 px-3 py-2">1-3 Hz</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Inertia bases</td>
                      <td className="border border-white/10 px-3 py-2">Adds mass, lowers resonance</td>
                      <td className="border border-white/10 px-3 py-2">Variable</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Isolation Efficiency</p>
              <p className="text-sm text-white mb-2">
                Isolation begins when forcing frequency exceeds √2 × natural frequency of the mount system.
                Effectiveness increases with frequency ratio.
              </p>
              <div className="grid grid-cols-3 gap-2 text-xs text-center mt-3">
                <div className="p-2 rounded bg-black/30">
                  <p className="text-white/70">f/fn = 2</p>
                  <p className="text-elec-yellow font-bold">65% isolation</p>
                </div>
                <div className="p-2 rounded bg-black/30">
                  <p className="text-white/70">f/fn = 3</p>
                  <p className="text-elec-yellow font-bold">88% isolation</p>
                </div>
                <div className="p-2 rounded bg-black/30">
                  <p className="text-white/70">f/fn = 5</p>
                  <p className="text-elec-yellow font-bold">96% isolation</p>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Connection Breaks</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Flexible duct connections (canvas/rubber)</li>
                  <li className="pl-1">Flexible pipe connectors</li>
                  <li className="pl-1">Flexible electrical conduit/cable</li>
                  <li className="pl-1">Resilient pipe hangers</li>
                  <li className="pl-1">Isolated supports for connected duct</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Requirements</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Level and even loading on mounts</li>
                  <li className="pl-1">No rigid bridges (pipes, conduit)</li>
                  <li className="pl-1">Sufficient static deflection</li>
                  <li className="pl-1">Restraints for seismic/movement</li>
                  <li className="pl-1">Maintenance access without removal</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Critical point:</strong> A single rigid connection (unbypassed pipe, taut cable) can completely short-circuit vibration isolation. All connections must be flexible.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Silencer Selection</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A fan produces 85 dB(A) at the discharge. The target at the nearest grille is
                40 dB(A). Natural duct attenuation is 12 dB. What silencer insertion loss is required?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Required total attenuation = 85 - 40 = <strong>45 dB</strong></p>
                <p>Natural duct attenuation = 12 dB</p>
                <p>Silencer requirement = 45 - 12 = <strong>33 dB</strong></p>
                <p className="mt-2 text-white/60">This suggests a 1.2-1.5m silencer with splitters, or two silencers in series</p>
                <p className="mt-2 text-white/60">Note: Check at each octave band, not just overall dB(A)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Mass Law Application</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A 100mm blockwork wall (150 kg/m²) provides Rw 45 dB. Estimate the performance
                if replaced with 215mm brick (400 kg/m²).
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Mass ratio = 400 / 150 = 2.67</p>
                <p>Increase = 20 log(2.67) = 20 × 0.43 = <strong>8.5 dB</strong></p>
                <p>Estimated Rw = 45 + 8.5 = <strong>53.5 dB</strong></p>
                <p className="mt-2 text-white/60">Actual performance may differ due to coincidence effects and workmanship</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Vibration Isolation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A pump runs at 1450 rpm. What isolator natural frequency is needed for 90% isolation?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Forcing frequency = 1450 / 60 = <strong>24.2 Hz</strong></p>
                <p>For 90% isolation, need f/fn ≈ 3.3</p>
                <p>Required fn = 24.2 / 3.3 = <strong>7.3 Hz</strong></p>
                <p className="mt-2 text-white/60">This requires steel spring mounts (rubber/neoprene too stiff)</p>
                <p className="mt-2">Spring deflection needed: δ = 25/fn² = 25/53 = <strong>~0.5mm static deflection</strong></p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Noise Control Hierarchy</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>1. Source:</strong> Quieter equipment, optimal operation</li>
                <li className="pl-1"><strong>2. Path:</strong> Distance, barriers, enclosures, silencers</li>
                <li className="pl-1"><strong>3. Receiver:</strong> Room treatment, PPE, time limits</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">CIBSE Duct Velocity Limits</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Main ducts:</strong> 5-7.5 m/s</li>
                <li className="pl-1"><strong>Branch ducts:</strong> 3-5 m/s</li>
                <li className="pl-1"><strong>Near terminals:</strong> 2-3 m/s</li>
                <li className="pl-1"><strong>Through silencers:</strong> ≤10 m/s (check self-noise)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Rigid bridges:</strong> One unbypassed pipe ruins vibration isolation</li>
                <li className="pl-1"><strong>Gaps in enclosures:</strong> Even small gaps destroy performance</li>
                <li className="pl-1"><strong>Crosstalk:</strong> Forgetting shared ductwork between rooms</li>
                <li className="pl-1"><strong>Velocity:</strong> Regenerated noise from high duct velocity</li>
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
                <p className="font-medium text-white mb-1">Mass Law</p>
                <ul className="space-y-0.5">
                  <li>+6 dB per doubling of mass</li>
                  <li>+6 dB per doubling of frequency</li>
                  <li>Double-leaf &gt; single-leaf</li>
                  <li>Coincidence dip 1-4 kHz</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Isolation</p>
                <ul className="space-y-0.5">
                  <li>Need f/fn &gt; √2 for isolation</li>
                  <li>f/fn = 3 gives 88% isolation</li>
                  <li>Springs: 3-8 Hz natural freq</li>
                  <li>All connections must be flexible</li>
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
            <Link to="../h-n-c-module2-section4-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Sound Fundamentals
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module2-section4-6">
              Next: Building Acoustics and Compliance
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule2Section4_5;
