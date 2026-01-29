import { ArrowLeft, Volume2, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Quiz from "@/components/electrician-tools/study-materials/Quiz";
import InlineCheck from "@/components/electrician-tools/study-materials/InlineCheck";
import { useSEO } from "@/hooks/useSEO";

const TITLE = "Building Acoustics and Compliance";
const DESCRIPTION = "Reverberation time, Approved Document E requirements, noise rating curves, CIBSE acoustic criteria, and plant room acoustics for HNC Building Services Engineering.";

const quickCheckQuestions = [
  {
    id: "qc1",
    question: "What does the Sabine formula calculate?",
    options: ["Sound pressure level", "Reverberation time", "Noise rating", "Transmission loss"],
    correctIndex: 1,
    explanation: "The Sabine formula T₆₀ = 0.161V/A calculates reverberation time - how long sound takes to decay by 60 dB."
  },
  {
    id: "qc2",
    question: "What is the typical NR limit for general offices under CIBSE guidance?",
    options: ["NR 25", "NR 35-40", "NR 50", "NR 60"],
    correctIndex: 1,
    explanation: "CIBSE Guide A recommends NR 35-40 for general offices. Lower values apply to meeting rooms (NR 30-35)."
  },
  {
    id: "qc3",
    question: "Approved Document E primarily covers which type of sound transmission?",
    options: ["Plant room noise", "External traffic noise", "Airborne and impact sound between dwellings", "HVAC duct noise"],
    correctIndex: 2,
    explanation: "Part E focuses on sound insulation between dwellings - both airborne (DnT,w + Ctr) and impact (L'nT,w) transmission."
  },
  {
    id: "qc4",
    question: "What absorption coefficient value indicates a perfect absorber?",
    options: ["α = 0", "α = 0.5", "α = 1.0", "α = 2.0"],
    correctIndex: 2,
    explanation: "α = 1.0 means 100% of incident sound energy is absorbed. α = 0 would be a perfect reflector."
  }
];

const quizQuestions = [
  {
    id: "q1",
    question: "The Sabine formula for reverberation time is T₆₀ = 0.161V/A. If a room has volume 500 m³ and total absorption 125 m² sabins, what is T₆₀?",
    options: ["0.32 seconds", "0.64 seconds", "1.29 seconds", "2.58 seconds"],
    correctAnswer: "0.64 seconds",
    explanation: "T₆₀ = 0.161 × 500 / 125 = 80.5 / 125 = 0.644 seconds ≈ 0.64 s."
  },
  {
    id: "q2",
    question: "For speech intelligibility in a lecture theatre, what reverberation time range is typically recommended?",
    options: ["0.2 - 0.4 seconds", "0.6 - 1.0 seconds", "1.5 - 2.0 seconds", "2.5 - 3.0 seconds"],
    correctAnswer: "0.6 - 1.0 seconds",
    explanation: "Lecture theatres need 0.6-1.0 s for clear speech. Shorter times sound 'dead', longer times reduce clarity."
  },
  {
    id: "q3",
    question: "What does the spectrum adaptation term Ctr in Part E account for?",
    options: ["High frequency sounds", "Low frequency sounds (traffic, music)", "Impact sounds only", "Flanking transmission"],
    correctAnswer: "Low frequency sounds (traffic, music)",
    explanation: "Ctr adjusts for low-frequency spectrum typical of road traffic and music. DnT,w + Ctr gives more realistic rating."
  },
  {
    id: "q4",
    question: "The minimum airborne sound insulation requirement between new-build dwellings under Part E is:",
    options: ["DnT,w + Ctr ≥ 40 dB", "DnT,w + Ctr ≥ 45 dB", "DnT,w + Ctr ≥ 50 dB", "DnT,w + Ctr ≥ 55 dB"],
    correctAnswer: "DnT,w + Ctr ≥ 45 dB",
    explanation: "Part E requires DnT,w + Ctr ≥ 45 dB for walls and floors between new-build dwellings. Robust Details can demonstrate compliance."
  },
  {
    id: "q5",
    question: "For impact sound insulation between dwellings, Part E requires maximum L'nT,w of:",
    options: ["L'nT,w ≤ 45 dB", "L'nT,w ≤ 52 dB", "L'nT,w ≤ 62 dB", "L'nT,w ≤ 70 dB"],
    correctAnswer: "L'nT,w ≤ 62 dB",
    explanation: "Maximum impact sound level L'nT,w ≤ 62 dB for floors between dwellings. Lower values mean better insulation."
  },
  {
    id: "q6",
    question: "What NR curve rating is typically specified for plant rooms?",
    options: ["NR 25-30", "NR 35-40", "NR 50-55", "NR 65-70"],
    correctAnswer: "NR 65-70",
    explanation: "Plant rooms typically allow NR 65-70 with hearing protection for limited occupancy. Adjacent occupied spaces need proper isolation."
  },
  {
    id: "q7",
    question: "A material has α = 0.7 at 1 kHz. If 10 m² of this material is installed, the absorption added is:",
    options: ["0.7 m² sabins", "7 m² sabins", "10 m² sabins", "70 m² sabins"],
    correctAnswer: "7 m² sabins",
    explanation: "Absorption A = S × α = 10 × 0.7 = 7 m² sabins. The sabin is the unit of sound absorption."
  },
  {
    id: "q8",
    question: "Flanking transmission refers to sound that:",
    options: ["Travels directly through the separating element", "Bypasses the separating element via connected structure", "Only affects high frequencies", "Is created by HVAC systems"],
    correctAnswer: "Bypasses the separating element via connected structure",
    explanation: "Flanking paths include floor/ceiling connections, external walls, and service penetrations that bypass the main partition."
  },
  {
    id: "q9",
    question: "CIBSE Guide A recommends what NR level for bedrooms in dwellings at night?",
    options: ["NR 15-20", "NR 25-30", "NR 35-40", "NR 45-50"],
    correctAnswer: "NR 25-30",
    explanation: "Bedrooms at night: NR 25-30 to ensure sleep is not disturbed. Living rooms can accept NR 30-35."
  },
  {
    id: "q10",
    question: "What is the primary advantage of using noise rating (NR) curves over dB(A) for HVAC noise assessment?",
    options: ["Simpler measurement", "Accounts for tonal characteristics", "Cheaper equipment needed", "Shows frequency spectrum balance"],
    correctAnswer: "Shows frequency spectrum balance",
    explanation: "NR curves assess the full frequency spectrum. A high-frequency hiss or low-frequency rumble can be identified even if dB(A) seems acceptable."
  },
  {
    id: "q11",
    question: "For a concert hall, the recommended reverberation time at mid-frequencies is typically:",
    options: ["0.4 - 0.6 seconds", "0.8 - 1.0 seconds", "1.8 - 2.2 seconds", "3.0 - 3.5 seconds"],
    correctAnswer: "1.8 - 2.2 seconds",
    explanation: "Concert halls need longer reverberation (1.8-2.2 s) for musical richness. Opera houses prefer slightly less (1.4-1.8 s) for vocal clarity."
  },
  {
    id: "q12",
    question: "Pre-completion testing under Part E must be carried out by:",
    options: ["Any site worker", "The building contractor", "A UKAS-accredited testing body or registered tester", "The building control officer"],
    correctAnswer: "A UKAS-accredited testing body or registered tester",
    explanation: "Pre-completion testing requires UKAS accreditation or registration with an approved scheme to ensure competent, independent assessment."
  }
];

const faqs = [
  {
    question: "What is the difference between DnT,w and Rw for sound insulation?",
    answer: "Rw is the laboratory-measured sound reduction index of a building element in isolation. DnT,w is the field-measured standardised level difference that accounts for real installation, flanking paths, and room acoustics. Field performance is typically 5-10 dB lower than laboratory values due to flanking and workmanship."
  },
  {
    question: "How do Robust Details work as an alternative to pre-completion testing?",
    answer: "Robust Details (robustdetails.com) are pre-tested separating wall and floor constructions that consistently achieve Part E standards. Using registered Robust Details with proper workmanship inspection avoids the need for pre-completion sound testing, saving time and cost while ensuring compliance."
  },
  {
    question: "Why might a room have acceptable dB(A) levels but still receive noise complaints?",
    answer: "The dB(A) weighting combines all frequencies into one number, potentially masking tonal issues. A low-frequency rumble from a chiller or high-frequency whine from a fan might seem acceptable in dB(A) but exceeds NR curves at specific frequencies. NR assessment reveals these spectral imbalances."
  },
  {
    question: "What acoustic considerations apply to building services penetrations?",
    answer: "Service penetrations through separating elements create flanking paths. Pipes, ducts, and cables must be fire-stopped with acoustic sealant. Rigid connections should be avoided - use flexible couplings and acoustic lagging. Back-to-back socket outlets should be offset by 150mm minimum and sealed."
  },
  {
    question: "How does floating floor construction improve impact sound insulation?",
    answer: "Floating floors decouple the walking surface from the structural floor using a resilient layer (mineral wool, rubber). This breaks the direct transmission path for impact energy. Combined with adequate mass in the floating screed, improvements of 15-25 dB in L'nT,w are achievable."
  },
  {
    question: "What is the acoustic difference between absorption and insulation?",
    answer: "Absorption reduces sound energy within a space (controlling reverberation and internal noise levels). Insulation prevents sound transmission between spaces. Soft materials absorb but don't insulate; dense materials insulate but don't absorb. Good acoustic design uses both appropriately."
  }
];

const HNCModule2Section4_6 = () => {
  useSEO({
    title: TITLE,
    description: DESCRIPTION
  });

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900/40 to-purple-800/20 border-b border-purple-500/20">
        <div className="container mx-auto px-4 py-4">
          <Link to="../h-n-c-module2-section4">
            <Button variant="ghost" size="sm" className="text-purple-300 hover:text-purple-100 -ml-2 mb-2">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Section 4
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <Volume2 className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <p className="text-purple-400 text-sm font-medium">Section 4.6</p>
              <h1 className="text-xl font-bold">{TITLE}</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="space-y-8">

          {/* Section 1: Reverberation Time and Room Acoustics */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 font-bold text-sm">1</span>
              <h2 className="text-lg font-semibold text-purple-400">Reverberation Time and Room Acoustics</h2>
            </div>

            <div className="bg-[#242424] rounded-lg p-4 space-y-4">
              <p className="text-gray-300">
                Reverberation time (RT or T₆₀) is the time for sound to decay by 60 dB after the source stops.
                It fundamentally affects speech intelligibility, music quality, and acoustic comfort in occupied spaces.
              </p>

              <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-purple-300 mb-2">The Sabine Formula</h4>
                <div className="text-center py-3 text-xl font-mono text-purple-200">
                  T₆₀ = 0.161V / A
                </div>
                <p className="text-gray-300 text-sm mt-2">
                  Where: T₆₀ = reverberation time (seconds), V = room volume (m³), A = total absorption (m² sabins)
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Total absorption A = Σ(Sᵢ × αᵢ) where S = surface area and α = absorption coefficient (0-1)
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-2 text-purple-300">Room Type</th>
                      <th className="text-center py-2 text-purple-300">Recommended T₆₀</th>
                      <th className="text-left py-2 text-purple-300">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-gray-800">
                      <td className="py-2">Recording studio</td>
                      <td className="text-center">0.2 - 0.4 s</td>
                      <td>Very dry for clean recording</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-2">Open plan office</td>
                      <td className="text-center">0.4 - 0.6 s</td>
                      <td>Reduces distraction from distant speech</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-2">Classroom / Lecture theatre</td>
                      <td className="text-center">0.6 - 1.0 s</td>
                      <td>Speech clarity essential</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-2">Church / Place of worship</td>
                      <td className="text-center">1.5 - 3.0 s</td>
                      <td>Varies with liturgical tradition</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-2">Concert hall (orchestral)</td>
                      <td className="text-center">1.8 - 2.2 s</td>
                      <td>Musical richness required</td>
                    </tr>
                    <tr>
                      <td className="py-2">Swimming pool</td>
                      <td className="text-center">1.5 - 2.5 s</td>
                      <td>Hard surfaces; treat where possible</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="font-semibold text-gray-200 mb-2">Absorption Coefficients (α at 1 kHz)</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <p className="text-gray-300">Acoustic ceiling tile: <span className="text-purple-300">0.7 - 0.9</span></p>
                    <p className="text-gray-300">Heavy curtains: <span className="text-purple-300">0.5 - 0.7</span></p>
                    <p className="text-gray-300">Carpet on underlay: <span className="text-purple-300">0.3 - 0.5</span></p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-300">Painted plaster: <span className="text-purple-300">0.02 - 0.04</span></p>
                    <p className="text-gray-300">Glass: <span className="text-purple-300">0.03 - 0.05</span></p>
                    <p className="text-gray-300">Concrete floor: <span className="text-purple-300">0.01 - 0.02</span></p>
                  </div>
                </div>
              </div>
            </div>

            <InlineCheck questions={[quickCheckQuestions[0]]} />
          </section>

          {/* Section 2: Approved Document E Requirements */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 font-bold text-sm">2</span>
              <h2 className="text-lg font-semibold text-purple-400">Approved Document E Requirements</h2>
            </div>

            <div className="bg-[#242424] rounded-lg p-4 space-y-4">
              <p className="text-gray-300">
                Approved Document E of the Building Regulations sets minimum standards for sound insulation
                between dwellings. Pre-completion testing or use of Robust Details demonstrates compliance.
              </p>

              <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-300 mb-3">Part E Minimum Performance Standards</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-yellow-500/20">
                    <span className="text-gray-300">Airborne sound - walls between dwellings</span>
                    <span className="font-mono text-yellow-200">DnT,w + Ctr ≥ 45 dB</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-yellow-500/20">
                    <span className="text-gray-300">Airborne sound - floors between dwellings</span>
                    <span className="font-mono text-yellow-200">DnT,w + Ctr ≥ 45 dB</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-yellow-500/20">
                    <span className="text-gray-300">Impact sound - floors between dwellings</span>
                    <span className="font-mono text-yellow-200">L'nT,w ≤ 62 dB</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-300">Internal walls within dwellings (to bedrooms)</span>
                    <span className="font-mono text-yellow-200">Rw ≥ 40 dB</span>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-[#1a1a1a] rounded-lg p-4">
                  <h4 className="font-semibold text-gray-200 mb-2">Key Terminology</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li><strong className="text-purple-300">DnT,w:</strong> Standardised weighted level difference (field airborne)</li>
                    <li><strong className="text-purple-300">Ctr:</strong> Spectrum adaptation term for low frequencies</li>
                    <li><strong className="text-purple-300">L'nT,w:</strong> Standardised weighted impact sound level</li>
                    <li><strong className="text-purple-300">Rw:</strong> Laboratory weighted sound reduction index</li>
                  </ul>
                </div>

                <div className="bg-[#1a1a1a] rounded-lg p-4">
                  <h4 className="font-semibold text-gray-200 mb-2">Testing Requirements</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Pre-completion testing by UKAS-accredited body</li>
                    <li>• Or use registered Robust Details with inspection</li>
                    <li>• Minimum 1 set of tests per 10 dwelling groups</li>
                    <li>• Failed tests require remediation and re-test</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-blue-300 mb-2">Flanking Transmission</h4>
                <p className="text-gray-300 text-sm">
                  Sound bypassing the separating element via connected structure significantly affects field performance.
                  Common flanking paths include: continuous floor screeds, rigid wall ties, back-to-back services,
                  and unbroken external wall leaves. Robust Details specify junction requirements to control flanking.
                </p>
              </div>
            </div>

            <InlineCheck questions={[quickCheckQuestions[2]]} />
          </section>

          {/* Section 3: Noise Rating Curves and CIBSE Criteria */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 font-bold text-sm">3</span>
              <h2 className="text-lg font-semibold text-purple-400">Noise Rating Curves and CIBSE Criteria</h2>
            </div>

            <div className="bg-[#242424] rounded-lg p-4 space-y-4">
              <p className="text-gray-300">
                Noise Rating (NR) curves assess the frequency spectrum of background noise from building services.
                Unlike dB(A), NR values reveal tonal imbalances that cause annoyance even at moderate overall levels.
              </p>

              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="font-semibold text-gray-200 mb-3">NR Curve Methodology</h4>
                <ol className="space-y-2 text-sm text-gray-300 list-decimal list-inside">
                  <li>Measure octave band sound pressure levels (63 Hz to 8 kHz)</li>
                  <li>Plot measured values on NR curve graph</li>
                  <li>The NR rating equals the highest curve touched by any measurement</li>
                  <li>Identify which frequency bands exceed target for corrective action</li>
                </ol>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-2 text-purple-300">Space Type</th>
                      <th className="text-center py-2 text-purple-300">NR Target</th>
                      <th className="text-left py-2 text-purple-300">Reference</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-gray-800">
                      <td className="py-2">Concert hall</td>
                      <td className="text-center">NR 15-20</td>
                      <td>CIBSE Guide A</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-2">Recording studio</td>
                      <td className="text-center">NR 15-20</td>
                      <td>BB93 / CIBSE</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-2">Hospital ward / Bedroom</td>
                      <td className="text-center">NR 25-30</td>
                      <td>HTM 08-01</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-2">Classroom</td>
                      <td className="text-center">NR 25-30</td>
                      <td>BB93</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-2">Private office</td>
                      <td className="text-center">NR 30-35</td>
                      <td>CIBSE Guide A</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-2">Open plan office</td>
                      <td className="text-center">NR 35-40</td>
                      <td>CIBSE Guide A</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-2">Restaurant / Cafeteria</td>
                      <td className="text-center">NR 40-45</td>
                      <td>CIBSE Guide A</td>
                    </tr>
                    <tr>
                      <td className="py-2">Plant room (limited occupancy)</td>
                      <td className="text-center">NR 65-70</td>
                      <td>With hearing protection</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-orange-300 mb-2">Why NR, Not Just dB(A)?</h4>
                <p className="text-gray-300 text-sm">
                  A ventilation system producing 42 dB(A) might seem acceptable for an office. However, if measured
                  octave bands show NR 50 at 125 Hz due to fan rumble, occupants will complain of intrusive low-frequency
                  noise. NR analysis identifies the problem frequency for targeted treatment.
                </p>
              </div>
            </div>

            <InlineCheck questions={[quickCheckQuestions[1]]} />
          </section>

          {/* Section 4: Plant Room Acoustics */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 font-bold text-sm">4</span>
              <h2 className="text-lg font-semibold text-purple-400">Plant Room Acoustics</h2>
            </div>

            <div className="bg-[#242424] rounded-lg p-4 space-y-4">
              <p className="text-gray-300">
                Plant rooms containing chillers, boilers, pumps, and air handling units generate significant noise
                requiring careful acoustic design to protect adjacent occupied spaces and meet environmental limits.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-[#1a1a1a] rounded-lg p-4">
                  <h4 className="font-semibold text-gray-200 mb-2">Structure-Borne Isolation</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Inertia bases for rotating equipment</li>
                    <li>• Spring or rubber isolators (select by frequency)</li>
                    <li>• Flexible connections to pipework and ductwork</li>
                    <li>• Floating floors for critical applications</li>
                    <li>• Concrete plinths to add mass</li>
                  </ul>
                </div>

                <div className="bg-[#1a1a1a] rounded-lg p-4">
                  <h4 className="font-semibold text-gray-200 mb-2">Airborne Isolation</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Dense masonry walls (215mm min)</li>
                    <li>• Acoustic doors (Rw 35-45 dB)</li>
                    <li>• Attenuated ventilation openings</li>
                    <li>• Sealed service penetrations</li>
                    <li>• Acoustic louvres for air intake/discharge</li>
                  </ul>
                </div>
              </div>

              <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-green-300 mb-3">Worked Example: Plant Room Wall Specification</h4>
                <div className="space-y-2 text-sm text-gray-300">
                  <p><strong>Requirement:</strong> Plant room adjacent to office requiring NR 35</p>
                  <p><strong>Plant room noise:</strong> 85 dB(A) (NR 80)</p>
                  <p><strong>Required reduction:</strong> NR 80 - NR 35 = 45 dB minimum</p>
                  <p><strong>Solution:</strong></p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>215mm dense concrete block wall (Rw ≈ 52 dB)</li>
                    <li>Sealed at all edges and penetrations</li>
                    <li>Acoustic door Rw 45 dB with drop seals</li>
                    <li>Attenuated ventilation with 25 dB insertion loss</li>
                  </ul>
                  <p className="mt-2 text-green-300">Provides adequate margin accounting for flanking and real-world performance.</p>
                </div>
              </div>

              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-red-300 mb-2">Common Plant Room Acoustic Failures</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• <strong>Rigid pipe connections</strong> transmitting pump vibration throughout building</li>
                  <li>• <strong>Unsealed penetrations</strong> for services negating wall performance</li>
                  <li>• <strong>Undersized attenuators</strong> on ductwork breakout paths</li>
                  <li>• <strong>Lightweight doors</strong> creating weak link in acoustic envelope</li>
                  <li>• <strong>Poor isolator selection</strong> - wrong frequency match to equipment</li>
                </ul>
              </div>
            </div>

            <InlineCheck questions={[quickCheckQuestions[3]]} />
          </section>

          {/* Practical Summary */}
          <section className="bg-gradient-to-r from-purple-900/30 to-purple-800/20 rounded-lg p-5 border border-purple-500/30">
            <h3 className="text-lg font-semibold text-purple-300 mb-4">Practical Application Summary</h3>

            <div className="space-y-4">
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="font-semibold text-gray-200 mb-2 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Building Services Acoustic Design Checklist
                </h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
                  <ul className="space-y-1">
                    <li>□ Establish NR targets for all occupied spaces</li>
                    <li>□ Calculate required wall/floor insulation values</li>
                    <li>□ Specify vibration isolation for all plant</li>
                    <li>□ Design attenuated ductwork systems</li>
                  </ul>
                  <ul className="space-y-1">
                    <li>□ Detail all service penetration treatments</li>
                    <li>□ Select appropriate acoustic doors</li>
                    <li>□ Calculate room reverberation times</li>
                    <li>□ Verify Part E compliance route</li>
                  </ul>
                </div>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="font-semibold text-gray-200 mb-2">Key Formulae Reference</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm font-mono">
                  <div className="text-gray-300">
                    <p className="text-purple-300">Sabine RT:</p>
                    <p>T₆₀ = 0.161V / A</p>
                  </div>
                  <div className="text-gray-300">
                    <p className="text-purple-300">Total Absorption:</p>
                    <p>A = Σ(Sᵢ × αᵢ)</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="font-semibold text-gray-200 mb-2">Standards and References</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• <strong>Approved Document E:</strong> Resistance to sound passage</li>
                  <li>• <strong>CIBSE Guide A:</strong> Environmental design criteria including NR values</li>
                  <li>• <strong>CIBSE Guide B5:</strong> Noise and vibration control for building services</li>
                  <li>• <strong>BB93:</strong> Acoustic design of schools</li>
                  <li>• <strong>HTM 08-01:</strong> Acoustics for healthcare premises</li>
                  <li>• <strong>BS 8233:</strong> Guidance on sound insulation and noise reduction</li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-purple-400">Frequently Asked Questions</h3>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-[#242424] rounded-lg p-4">
                  <h4 className="font-medium text-gray-200 mb-2">{faq.question}</h4>
                  <p className="text-gray-400 text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Quiz Section */}
          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-purple-400">Section Quiz</h3>
            <Quiz
              questions={quizQuestions}
              onComplete={() => {}}
            />
          </section>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-800">
            <Link to="../h-n-c-module2-section4-5">
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous: Noise Control
              </Button>
            </Link>
            <Link to="../h-n-c-module2-section5">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                Next: Section 5
                <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HNCModule2Section4_6;
