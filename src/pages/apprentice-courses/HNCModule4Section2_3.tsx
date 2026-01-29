import { ArrowLeft, Thermometer, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Thermal Constraints - HNC Module 4 Section 2.3";
const DESCRIPTION = "Understand cable derating factors for ambient temperature, grouping, and thermal insulation according to BS 7671 for building services installations.";

const quickCheckQuestions = [
  {
    id: "ca-factor",
    question: "What does the correction factor Ca account for?",
    options: ["Cable age", "Ambient temperature different from 30°C", "Cable armour", "Current asymmetry"],
    correctIndex: 1,
    explanation: "Ca is the ambient temperature correction factor. When ambient temperature exceeds the reference 30°C, cable current capacity must be reduced (Ca < 1) because less heat can dissipate from the cable."
  },
  {
    id: "cg-factor",
    question: "What does the correction factor Cg account for?",
    options: ["Ground conditions", "Grouping of cables together", "Generator loads", "Galvanic protection"],
    correctIndex: 1,
    explanation: "Cg is the grouping factor applied when multiple cables are installed together. Grouped cables cannot dissipate heat as effectively, so their current capacity must be reduced."
  },
  {
    id: "ci-factor",
    question: "When must the Ci (thermal insulation) factor be applied?",
    options: ["When using insulated cables", "When cables pass through or are surrounded by thermal insulation", "When insulation resistance is low", "For all PVC cables"],
    correctIndex: 1,
    explanation: "Ci applies when cables are in contact with or surrounded by thermal insulation material (loft insulation, wall insulation). This severely restricts heat dissipation."
  },
  {
    id: "combined-factors",
    question: "How are multiple correction factors combined?",
    options: ["Added together", "Multiplied together", "The lowest is used", "The highest is used"],
    correctIndex: 1,
    explanation: "Correction factors are multiplied together: Iz = It × Ca × Cg × Ci. Each factor further reduces the effective current-carrying capacity."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A cable is installed where ambient temperature is 40°C. The Ca factor is 0.87. What does this mean?",
    options: [
      "The cable can carry 87% more current",
      "The cable can carry 87% of its tabulated current",
      "The ambient is 87% of maximum",
      "Voltage drop is reduced by 13%"
    ],
    correctAnswer: 1,
    explanation: "Ca = 0.87 means the cable's effective current capacity is 87% of the tabulated value. Higher ambient reduces the temperature difference available for heat dissipation."
  },
  {
    id: 2,
    question: "Six circuits are grouped together in trunking. The grouping factor is 0.57. If each circuit needs 20A, what minimum It is required?",
    options: [
      "11.4A",
      "20A",
      "35.1A",
      "120A"
    ],
    correctAnswer: 2,
    explanation: "Minimum It = In / Cg = 20 / 0.57 = 35.1A. The tabulated current must be higher to compensate for reduced heat dissipation when grouped."
  },
  {
    id: 3,
    question: "Why does the Ci factor for cables totally surrounded by thermal insulation equal 0.5?",
    options: [
      "The insulation is 50% effective",
      "Only half the cable is covered",
      "Heat dissipation is severely restricted",
      "It's an arbitrary safety factor"
    ],
    correctAnswer: 2,
    explanation: "Thermal insulation prevents heat from escaping. When totally surrounded, the cable can only carry 50% of its normal current to prevent dangerous overheating."
  },
  {
    id: 4,
    question: "A cable runs through 400mm of thermal insulation in a ceiling void. What Ci factor applies?",
    options: [
      "0.5 (totally surrounded)",
      "0.63 (100mm)",
      "0.55 (200mm)",
      "0.5 (exceeds 400mm threshold)"
    ],
    correctAnswer: 3,
    explanation: "For cables passing through insulation exceeding 400mm, Ci = 0.5 applies (same as totally surrounded). The 400mm is the threshold for worst-case derating."
  },
  {
    id: 5,
    question: "In a plant room with 45°C ambient, what Ca factor applies to PVC cables (Table 4B1)?",
    options: [
      "0.79",
      "0.87",
      "0.94",
      "1.0"
    ],
    correctAnswer: 0,
    explanation: "From Table 4B1, for PVC cables at 45°C ambient: Ca = 0.79. Higher temperatures require greater derating than moderate increases."
  },
  {
    id: 6,
    question: "What reference ambient temperature do BS 7671 tables assume?",
    options: [
      "20°C",
      "25°C",
      "30°C",
      "35°C"
    ],
    correctAnswer: 2,
    explanation: "BS 7671 Appendix 4 tables assume a reference ambient temperature of 30°C for cables installed in air. Higher ambients require Ca derating."
  },
  {
    id: 7,
    question: "Three single-phase circuits in a conduit are grouped with three three-phase circuits. How many circuits for the grouping factor?",
    options: [
      "3 circuits",
      "6 circuits",
      "9 circuits (3 × 3-phase)",
      "12 circuits"
    ],
    correctAnswer: 1,
    explanation: "Count each multi-core cable or set of single-core cables forming one circuit as one circuit. Three single-phase + three three-phase = 6 circuits."
  },
  {
    id: 8,
    question: "Why do XLPE cables have different Ca factors than PVC cables?",
    options: [
      "XLPE is more expensive",
      "XLPE has higher maximum operating temperature (90°C vs 70°C)",
      "XLPE cables are always larger",
      "PVC is fire resistant"
    ],
    correctAnswer: 1,
    explanation: "XLPE cables operate at 90°C compared to PVC at 70°C. The larger temperature margin means XLPE cables are less affected by elevated ambient temperatures."
  },
  {
    id: 9,
    question: "A cable has It = 40A. Ca = 0.87, Cg = 0.7, Ci = 1.0. What is the effective capacity Iz?",
    options: [
      "24.4A",
      "40A",
      "65.7A",
      "27.8A"
    ],
    correctAnswer: 0,
    explanation: "Iz = It × Ca × Cg × Ci = 40 × 0.87 × 0.7 × 1.0 = 24.4A. Multiple factors compound to significantly reduce capacity."
  },
  {
    id: 10,
    question: "When cables are spaced by one cable diameter in a group, how does this affect Cg?",
    options: [
      "No improvement - same Cg applies",
      "Cg improves to a higher value",
      "Grouping factor no longer applies",
      "Only applicable to single-core cables"
    ],
    correctAnswer: 1,
    explanation: "Table 4C1 Note 4: When cables are spaced by at least one cable diameter, improved grouping factors apply because air circulation improves heat dissipation."
  }
];

const faqs = [
  {
    question: "What if a cable route passes through different ambient temperatures?",
    answer: "Apply the Ca factor for the highest ambient temperature along the entire route. The cable must be sized for the worst-case condition, even if most of the run is at normal temperature. Document the high-temperature section in design records."
  },
  {
    question: "Do I apply grouping factors to cables in separate compartments of trunking?",
    answer: "If there is no thermal barrier between compartments, apply grouping factors for all cables in the trunking. If there is a thermal barrier (metal partition), cables may be considered as separate groups. BS 7671 assumes thermal interaction unless properly segregated."
  },
  {
    question: "How do I handle cables partially in thermal insulation?",
    answer: "BS 7671 Table 52.2 provides Ci factors based on insulation length: 50mm = 0.89, 100mm = 0.81, 200mm = 0.68, 400mm = 0.55. For lengths exceeding 400mm or cables totally surrounded, use Ci = 0.5. Apply to the entire cable length."
  },
  {
    question: "Can I use different cable sizes to avoid heavy grouping derating?",
    answer: "The grouping factor applies regardless of individual cable sizes. However, cables installed on separate routes, different tray levels with spacing, or in separate conduits can be treated as separate groups with better Cg factors."
  },
  {
    question: "What about cables in hot plant rooms with grouped circuits?",
    answer: "Compound the factors: if ambient is 45°C (Ca = 0.79 for PVC) and six cables grouped (Cg = 0.57), combined factor = 0.79 × 0.57 = 0.45. A cable with It = 40A would have Iz = 18A - a significant reduction requiring larger cables."
  },
  {
    question: "Are correction factors applied before or after selecting the protective device?",
    answer: "Correction factors determine the minimum required tabulated current (It). The process is: select In ≥ Ib, then calculate minimum It = In / (Ca × Cg × Ci), then select cable with It ≥ minimum. The protective device is selected first based on load current."
  }
];

const HNCModule4Section2_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module4-section2">
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
            <Thermometer className="h-4 w-4" />
            <span>Module 4.2.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Thermal Constraints
          </h1>
          <p className="text-white/80">
            Understanding derating factors for ambient temperature, grouping and thermal insulation
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Ca:</strong> Ambient temperature correction</li>
              <li className="pl-1"><strong>Cg:</strong> Grouping (multiple cables) correction</li>
              <li className="pl-1"><strong>Ci:</strong> Thermal insulation correction</li>
              <li className="pl-1"><strong>Combined:</strong> Iz = It × Ca × Cg × Ci</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Plant rooms:</strong> High ambient (Ca critical)</li>
              <li className="pl-1"><strong>Cable tray:</strong> Grouping factors (Cg)</li>
              <li className="pl-1"><strong>Ceiling voids:</strong> Insulation contact (Ci)</li>
              <li className="pl-1"><strong>Risers:</strong> Multiple derating factors</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply ambient temperature correction factors (Ca) from BS 7671",
              "Determine and apply grouping factors (Cg) for multiple cables",
              "Apply thermal insulation factors (Ci) for insulated routes",
              "Calculate combined derating for complex installations",
              "Recognise situations requiring multiple correction factors",
              "Select cables accounting for all thermal constraints"
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

        {/* Section 1: Ambient Temperature (Ca) */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Ambient Temperature Correction (Ca)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Cable current ratings in BS 7671 are based on an ambient temperature of 30°C. When the
              surrounding air temperature differs, the correction factor Ca adjusts the cable's effective
              current-carrying capacity.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Ambient Temperature Factors (Table 4B1)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Ambient °C</th>
                      <th className="border border-white/10 px-3 py-2 text-left">PVC (70°C)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">XLPE (90°C)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Mineral (70°C)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">25</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">1.03</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">1.02</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">1.03</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">30</td>
                      <td className="border border-white/10 px-3 py-2">1.00</td>
                      <td className="border border-white/10 px-3 py-2">1.00</td>
                      <td className="border border-white/10 px-3 py-2">1.00</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">35</td>
                      <td className="border border-white/10 px-3 py-2">0.94</td>
                      <td className="border border-white/10 px-3 py-2">0.96</td>
                      <td className="border border-white/10 px-3 py-2">0.94</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">40</td>
                      <td className="border border-white/10 px-3 py-2">0.87</td>
                      <td className="border border-white/10 px-3 py-2">0.91</td>
                      <td className="border border-white/10 px-3 py-2">0.87</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">45</td>
                      <td className="border border-white/10 px-3 py-2 text-orange-400">0.79</td>
                      <td className="border border-white/10 px-3 py-2">0.87</td>
                      <td className="border border-white/10 px-3 py-2 text-orange-400">0.79</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">50</td>
                      <td className="border border-white/10 px-3 py-2 text-orange-400">0.71</td>
                      <td className="border border-white/10 px-3 py-2">0.82</td>
                      <td className="border border-white/10 px-3 py-2 text-orange-400">0.71</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">55</td>
                      <td className="border border-white/10 px-3 py-2 text-red-400">0.61</td>
                      <td className="border border-white/10 px-3 py-2">0.76</td>
                      <td className="border border-white/10 px-3 py-2 text-red-400">0.61</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical High-Temperature Locations</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <ul className="text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1">Boiler rooms: 40-50°C</li>
                    <li className="pl-1">Plant rooms: 35-45°C</li>
                    <li className="pl-1">Kitchen extracts: 40-55°C</li>
                  </ul>
                </div>
                <div>
                  <ul className="text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1">Roof spaces (summer): 40-50°C</li>
                    <li className="pl-1">Server rooms: 25-30°C (cooled)</li>
                    <li className="pl-1">Cold stores: 0-5°C (Ca &gt; 1)</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>XLPE advantage:</strong> At 50°C ambient, XLPE (Ca = 0.82) retains significantly more capacity than PVC (Ca = 0.71), making it preferred for hot locations.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Grouping Factors (Cg) */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Grouping Factors (Cg)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              When multiple cables are installed together, each cable's heat adds to its neighbours,
              reducing the ability to dissipate heat. The grouping factor Cg accounts for this
              mutual heating effect.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Grouping Factors (Table 4C1) - Cables Touching</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">No. Circuits</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Bunched</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Single Layer</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Perforated Tray</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">1.00</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">1.00</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">1.00</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2</td>
                      <td className="border border-white/10 px-3 py-2">0.80</td>
                      <td className="border border-white/10 px-3 py-2">0.85</td>
                      <td className="border border-white/10 px-3 py-2">0.88</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">3</td>
                      <td className="border border-white/10 px-3 py-2">0.70</td>
                      <td className="border border-white/10 px-3 py-2">0.79</td>
                      <td className="border border-white/10 px-3 py-2">0.82</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4</td>
                      <td className="border border-white/10 px-3 py-2">0.65</td>
                      <td className="border border-white/10 px-3 py-2">0.75</td>
                      <td className="border border-white/10 px-3 py-2">0.77</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">6</td>
                      <td className="border border-white/10 px-3 py-2 text-orange-400">0.57</td>
                      <td className="border border-white/10 px-3 py-2">0.73</td>
                      <td className="border border-white/10 px-3 py-2">0.73</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">9</td>
                      <td className="border border-white/10 px-3 py-2 text-orange-400">0.50</td>
                      <td className="border border-white/10 px-3 py-2">0.72</td>
                      <td className="border border-white/10 px-3 py-2">0.72</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">12</td>
                      <td className="border border-white/10 px-3 py-2 text-red-400">0.45</td>
                      <td className="border border-white/10 px-3 py-2">0.70</td>
                      <td className="border border-white/10 px-3 py-2">0.70</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">What Counts as a 'Circuit'?</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Single-phase:</strong> One 2-core cable or L+N singles = 1 circuit</li>
                <li className="pl-1"><strong>Three-phase:</strong> One 3/4-core cable or L1+L2+L3(+N) singles = 1 circuit</li>
                <li className="pl-1"><strong>Ring final:</strong> Count as 2 circuits (outgoing and return)</li>
                <li className="pl-1"><strong>Spare cables:</strong> Do not count if not loaded</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Improving Cg Factors</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Space cables by one diameter (Table 4C1 Note 4)</li>
                  <li className="pl-1">Use perforated tray instead of solid</li>
                  <li className="pl-1">Install in single layer not bunched</li>
                  <li className="pl-1">Separate routes for high-current circuits</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Where Cg Doesn't Apply</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Cables spaced &gt; 2× diameter apart</li>
                  <li className="pl-1">Single cable run (obviously)</li>
                  <li className="pl-1">Cables in separate conduits/trunking</li>
                  <li className="pl-1">With adequate thermal barriers</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design tip:</strong> For heavily grouped risers, consider XLPE cables on perforated tray to maximise capacity.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Thermal Insulation (Ci) */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Thermal Insulation Correction (Ci)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Thermal insulation material severely restricts heat dissipation from cables. When cables
              pass through or are surrounded by thermal insulation, significant derating is required
              to prevent dangerous overheating.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Thermal Insulation Factors (Table 52.2)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Cable Position</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Length in Insulation</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Ci Factor</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">In contact with surface</td>
                      <td className="border border-white/10 px-3 py-2">50mm</td>
                      <td className="border border-white/10 px-3 py-2">0.89</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">In contact with surface</td>
                      <td className="border border-white/10 px-3 py-2">100mm</td>
                      <td className="border border-white/10 px-3 py-2">0.81</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">In contact with surface</td>
                      <td className="border border-white/10 px-3 py-2">200mm</td>
                      <td className="border border-white/10 px-3 py-2">0.68</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">In contact with surface</td>
                      <td className="border border-white/10 px-3 py-2">400mm</td>
                      <td className="border border-white/10 px-3 py-2 text-orange-400">0.55</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Totally surrounded</td>
                      <td className="border border-white/10 px-3 py-2">Any length</td>
                      <td className="border border-white/10 px-3 py-2 text-red-400">0.5</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
              <p className="text-sm font-medium text-orange-400 mb-2">Critical: Totally Surrounded</p>
              <p className="text-sm text-white">
                A cable totally surrounded by thermal insulation can only carry <strong>50% of its normal current</strong>.
                This applies to:
              </p>
              <ul className="text-sm text-white mt-2 space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Cables run through loft insulation laid over joists</li>
                <li className="pl-1">Cables in insulated cavity walls</li>
                <li className="pl-1">Cables enclosed by sprayed insulation</li>
                <li className="pl-1">Any route where cable is fully enclosed by thermal material</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Strategies to Avoid Severe Ci Derating</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Route above insulation:</strong> Clip cables to joists above loft insulation</li>
                <li className="pl-1"><strong>Use conduit/trunking:</strong> Create air gap around cables</li>
                <li className="pl-1"><strong>Thermal barriers:</strong> Install non-combustible board between cable and insulation</li>
                <li className="pl-1"><strong>Upsize cables:</strong> Where unavoidable, select larger cable for required capacity</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Regulation:</strong> BS 7671 522.5 requires cables passing through thermal insulation to be suitably rated or protected.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Combined Derating */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Combined Derating Calculations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              In practice, multiple thermal constraints often apply simultaneously. The correction
              factors are multiplied together, potentially resulting in severe cumulative derating.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Combined Factor Formula</p>
              <div className="bg-black/30 p-3 rounded text-center font-mono text-lg">
                <p>I<sub>z</sub> = I<sub>t</sub> × C<sub>a</sub> × C<sub>g</sub> × C<sub>i</sub></p>
              </div>
              <p className="text-xs text-white/60 mt-2 text-center">Or rearranged for selection: Min I<sub>t</sub> = I<sub>n</sub> / (C<sub>a</sub> × C<sub>g</sub> × C<sub>i</sub>)</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Combined Factor Examples</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Scenario</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Ca</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Cg</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Ci</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Combined</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Standard conditions</td>
                      <td className="border border-white/10 px-3 py-2">1.0</td>
                      <td className="border border-white/10 px-3 py-2">1.0</td>
                      <td className="border border-white/10 px-3 py-2">1.0</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">1.0</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">3 cables in trunking</td>
                      <td className="border border-white/10 px-3 py-2">1.0</td>
                      <td className="border border-white/10 px-3 py-2">0.70</td>
                      <td className="border border-white/10 px-3 py-2">1.0</td>
                      <td className="border border-white/10 px-3 py-2">0.70</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Plant room (40°C) + 4 cables</td>
                      <td className="border border-white/10 px-3 py-2">0.87</td>
                      <td className="border border-white/10 px-3 py-2">0.65</td>
                      <td className="border border-white/10 px-3 py-2">1.0</td>
                      <td className="border border-white/10 px-3 py-2 text-orange-400">0.57</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Loft (35°C) in insulation</td>
                      <td className="border border-white/10 px-3 py-2">0.94</td>
                      <td className="border border-white/10 px-3 py-2">1.0</td>
                      <td className="border border-white/10 px-3 py-2">0.5</td>
                      <td className="border border-white/10 px-3 py-2 text-orange-400">0.47</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Hot riser (45°C) + 6 cables</td>
                      <td className="border border-white/10 px-3 py-2">0.79</td>
                      <td className="border border-white/10 px-3 py-2">0.57</td>
                      <td className="border border-white/10 px-3 py-2">1.0</td>
                      <td className="border border-white/10 px-3 py-2 text-red-400">0.45</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Worked Example: Hot Plant Room with Grouping</p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Circuit: 32A MCB, 45°C ambient, 6 circuits grouped (PVC cable)</p>
                <p className="mt-2">Ca (45°C PVC) = 0.79</p>
                <p>Cg (6 circuits bunched) = 0.57</p>
                <p>Ci = 1.0 (no thermal insulation)</p>
                <p className="mt-2">Combined factor = 0.79 × 0.57 × 1.0 = <strong>0.45</strong></p>
                <p className="mt-2">Min It = 32 / 0.45 = <strong>71.1A</strong></p>
                <p className="mt-2">Table 4D2A: Need 16mm² cable (It = 76A)</p>
                <p className="text-white/60">→ Severe derating requires much larger cable than 32A would suggest</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Cost consideration:</strong> The combined factor example above requires 16mm² for a 32A circuit. Consider XLPE (Ca = 0.87), better routing (lower Cg), or separate cable runs to reduce cable costs.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Domestic Loft Lighting Circuit</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A 6A lighting circuit runs through 300mm of loft insulation. Ambient 35°C in summer. What cable size?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Ca (35°C) = 0.94</p>
                <p>Cg = 1.0 (single circuit)</p>
                <p>Ci (300mm through insulation) = interpolate ~0.60</p>
                <p className="mt-2">Combined = 0.94 × 1.0 × 0.60 = <strong>0.56</strong></p>
                <p className="mt-2">Min It = 6 / 0.56 = <strong>10.7A</strong></p>
                <p className="mt-2">Table 4D2A: 1.0mm² = 11A (marginal)</p>
                <p className="text-green-400">→ 1.5mm² provides adequate margin (14.5A)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Commercial Riser</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> 8 × 63A three-phase circuits in a riser, ambient 35°C. XLPE/SWA on tray. What size?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Ca (35°C XLPE) = 0.96</p>
                <p>Cg (8 circuits, single layer tray) = 0.72</p>
                <p>Ci = 1.0</p>
                <p className="mt-2">Combined = 0.96 × 0.72 × 1.0 = <strong>0.69</strong></p>
                <p className="mt-2">Min It = 63 / 0.69 = <strong>91.3A</strong></p>
                <p className="mt-2">Table 4E2A Method E: 25mm² = 110A</p>
                <p className="text-green-400">→ 25mm² 4-core XLPE/SWA adequate</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Comparing PVC vs XLPE</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> 50°C plant room, 4 circuits grouped. Compare cable sizes for 32A circuit.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/70">PVC Cable:</p>
                <p>Ca = 0.71, Cg = 0.65 → Combined = 0.46</p>
                <p>Min It = 32 / 0.46 = 69.6A → Need 16mm²</p>
                <p className="mt-3 text-white/70">XLPE Cable:</p>
                <p>Ca = 0.82, Cg = 0.65 → Combined = 0.53</p>
                <p>Min It = 32 / 0.53 = 60.4A → Need 10mm²</p>
                <p className="mt-2 text-green-400">→ XLPE allows smaller cable in hot environments</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Correction Factor Tables</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Table 4B1:</strong> Ambient temperature (Ca)</li>
                <li className="pl-1"><strong>Table 4C1:</strong> Grouping factors (Cg)</li>
                <li className="pl-1"><strong>Table 52.2:</strong> Thermal insulation (Ci)</li>
                <li className="pl-1"><strong>Table 4B2:</strong> Ground temperature (buried cables)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Building Services Best Practice</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Survey ambient temperatures during hottest operation</li>
                <li className="pl-1">Design cable routes to minimise grouping where possible</li>
                <li className="pl-1">Use XLPE cables in plant rooms and risers</li>
                <li className="pl-1">Avoid routing through thermal insulation where practical</li>
                <li className="pl-1">Document all correction factors in design calculations</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Adding factors:</strong> They must be multiplied, not added</li>
                <li className="pl-1"><strong>Forgetting partial insulation:</strong> Even 50mm contact needs Ci</li>
                <li className="pl-1"><strong>Wrong Cg arrangement:</strong> Bunched vs single layer differ significantly</li>
                <li className="pl-1"><strong>Using summer ambient in winter:</strong> Design for worst case (usually hot)</li>
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
                <p className="font-medium text-white mb-1">Correction Factors</p>
                <ul className="space-y-0.5">
                  <li>Ca - Ambient temperature (ref: 30°C)</li>
                  <li>Cg - Grouping (no. of circuits)</li>
                  <li>Ci - Thermal insulation contact</li>
                  <li>Combined = Ca × Cg × Ci</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Critical Values</p>
                <ul className="space-y-0.5">
                  <li>45°C PVC: Ca = 0.79</li>
                  <li>6 circuits bunched: Cg = 0.57</li>
                  <li>Totally in insulation: Ci = 0.5</li>
                  <li>XLPE better than PVC when hot</li>
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
            <Link to="../h-n-c-module4-section2-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Prev: Voltage Drop Calculations
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module4-section2-4">
              Next: Short-Circuit Withstand
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule4Section2_3;
