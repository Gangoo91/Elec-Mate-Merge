import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Shield,
  Droplets,
  Beaker,
  Wrench,
} from "lucide-react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE =
  "Material Selection in Corrosive and Damp Environments - Module 3.5.4 | Level 2 Electrical Course";
const DESCRIPTION =
  "Select compliant materials and protection for damp, coastal and chemically aggressive sites. Practical BS 7671 guidance with real-world tips.";

// End-of-section quiz (8 questions to match subsection 3.5.3 format)
const quizQuestions = [
  {
    id: 1,
    question:
      "Which stainless steel grade is generally preferred for coastal/marine installations?",
    options: ["304", "316", "430", "201"],
    correctAnswer: 1,
    explanation:
      "AISI 316 contains molybdenum for superior pitting resistance in chloride-rich (salt) environments compared with 304.",
  },
  {
    id: 2,
    question:
      "What is a suitable minimum enclosure rating for high‑pressure washdown areas?",
    options: ["IP44", "IP54", "IP65", "IP66"],
    correctAnswer: 3,
    explanation:
      "IP66 provides protection against powerful water jets. Some sites may require IP67/68; always check the specification.",
  },
  {
    id: 3,
    question:
      "Which cable sheath type is typically preferred where chemical vapours are present?",
    options: ["Standard PVC", "LSZH", "Basic PE", "Rubber only"],
    correctAnswer: 1,
    explanation:
      "LSZH compounds can offer improved resistance and reduced toxic emissions in fire. Always verify the specific chemical compatibility.",
  },
  {
    id: 4,
    question:
      "Why fit a 'drip loop' before cable entry into an outdoor enclosure?",
    options: [
      "To reduce voltage drop",
      "To manage spare length",
      "To prevent water tracking along the cable into the enclosure",
      "To improve EMC",
    ],
    correctAnswer: 2,
    explanation:
      "A drip loop diverts water away from the gland/entry so it cannot track into the enclosure.",
  },
  {
    id: 5,
    question:
      "What installation detail helps prevent galvanic corrosion between dissimilar metals?",
    options: [
      "Use larger fixings",
      "Paint only the bolts",
      "Isolate with plastic/nylon washers and appropriate sealants",
      "Tighten fixings harder",
    ],
    correctAnswer: 2,
    explanation:
      "Electrical isolation between dissimilar metals breaks the corrosion cell; also consider compatible fasteners/coatings.",
  },
  {
    id: 6,
    question:
      "Which is the best first step when selecting materials for a damp plant room?",
    options: [
      "Choose the cheapest enclosure",
      "Assess the environmental influences and duty (BS 7671 external influences)",
      "Install everything in stainless steel regardless",
      "Use domestic-grade accessories",
    ],
    correctAnswer: 1,
    explanation:
      "BS 7671 requires assessment of external influences (water, corrosives, mechanical, temperature) during design and selection.",
  },
  {
    id: 7,
    question:
      "What maintenance action is most critical for gasketed enclosures in damp areas?",
    options: [
      "Annual repainting",
      "Monthly check and replacement of perished seals",
      "Weekly torque check of all fixings",
      "Fit larger cable glands",
    ],
    correctAnswer: 1,
    explanation:
      "Regular inspection and timely replacement of seals/gaskets prevents moisture ingress and premature failure.",
  },
  {
    id: 8,
    question:
      "For chemically aggressive zones, which non-metallic enclosure is commonly selected?",
    options: ["ABS", "Polycarbonate", "GRP", "PVC"],
    correctAnswer: 2,
    explanation:
      "GRP (Glass Reinforced Plastic) offers strong chemical resistance and good strength; check manufacturer data for compatibility.",
  },
];

// Inline knowledge checks used between sections (must use correctIndex as per InlineCheck props)
const quickCheckQuestions = [
  {
    id: "materials-chem",
    question: "Which plastic enclosure is often preferred in chemical washdown areas?",
    options: ["ABS", "GRP", "Polystyrene", "MDF"],
    correctIndex: 1,
    explanation:
      "GRP typically provides excellent chemical resistance and structural integrity in harsh environments.",
  },
  {
    id: "ip-washdown",
    question:
      "Minimum practical IP rating usually specified for regular high‑pressure washdown?",
    options: ["IP54", "IP55", "IP65", "IP66"],
    correctIndex: 3,
    explanation:
      "IP66 resists powerful water jets. Some food plants require higher—always confirm the client specification.",
  },
  {
    id: "galvanic",
    question: "How do you minimise galvanic corrosion at fixings?",
    options: [
      "Use any metals available",
      "Mix stainless and carbon steel for strength",
      "Isolate dissimilar metals and use compatible fasteners",
      "Rely on paint only",
    ],
    correctIndex: 2,
    explanation:
      "Isolating dissimilar metals and selecting compatible fasteners/coatings prevents galvanic corrosion cells forming.",
  },
];

export default function Module3Section5_4() {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="bg-[#1a1a1a] overflow-x-hidden">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button
            variant="ghost"
            className="text-white hover:text-white active:text-white p-0 -ml-1 min-h-[44px] touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 3.5
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <header className="mb-6 sm:mb-8 text-center">
          <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-elec-yellow/20 text-elec-yellow text-sm font-medium mb-4">
            Module 3 - Section 3.5.4
          </div>
          <div className="flex justify-center mb-4">
            <div className="p-2 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Material Selection for Corrosive and Damp Environments
          </h1>
          <p className="text-white">
            Practical selection and installation guidance for damp, coastal and chemically aggressive locations with references to BS 7671 external influences and good practice.
          </p>
        </header>

        {/* Introduction */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Introduction
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-2 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Moisture and chemicals rapidly degrade unsuitable materials.</li>
                <li>Material choice, IP rating and installation details are critical.</li>
                <li>Prevent galvanic corrosion and seal against ingress.</li>
                <li>Assess external influences as required by BS 7671.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-2 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Salt air, condensation, chemical washdowns, existing corrosion.</li>
                <li><strong>Use:</strong> 316 stainless, GRP/polycarbonate, LSZH cables, IP66+ enclosures.</li>
                <li><strong>Check:</strong> Gaskets, glands, drainage, and separation of dissimilar metals.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Learning Outcomes */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Learning Outcomes
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-white">
            <li>Identify common corrosive and damp environments and their risks.</li>
            <li>Select compliant materials for the environment and duty.</li>
            <li>Apply installation details to prevent water/chemical ingress.</li>
            <li>Plan maintenance to sustain protective measures.</li>
          </ul>
        </section>

        {/* Content */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Content / Learning
          </h2>

          {/* 1. Environmental Influences and Assessment */}
          <div className="mb-6">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <Droplets className="w-5 h-5" /> 1. Environmental Influences and Assessment (BS 7671)
            </h3>

            <div className="mb-6">
              <h4 className="font-medium text-white mb-3">BS 7671 External Influences Classification</h4>
              <div className="p-4 bg-transparent border border-border/30 rounded-lg mb-4">
                <p className="text-xs sm:text-sm text-white mb-3">
                  <strong>BS 7671 Section 512:</strong> External influences must be assessed during design. Each location receives codes for Environmental (A), Utilisation (B), and Construction (C) conditions that determine equipment selection.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-white/10 text-sm">
                    <thead>
                      <tr className="">
                        <th className="border border-white/10 p-3 text-left">Influence Type</th>
                        <th className="border border-white/10 p-3 text-left">Code</th>
                        <th className="border border-white/10 p-3 text-left">Description</th>
                        <th className="border border-white/10 p-3 text-left">Equipment Requirements</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-white/10 p-3">Ambient Temperature</td>
                        <td className="border border-white/10 p-3">AA1-AA8</td>
                        <td className="border border-white/10 p-3">-60°C to +180°C ranges</td>
                        <td className="border border-white/10 p-3">Temperature-rated components</td>
                      </tr>
                      <tr className="bg-muted/5">
                        <td className="border border-white/10 p-3">Water/Moisture</td>
                        <td className="border border-white/10 p-3">AD1-AD8</td>
                        <td className="border border-white/10 p-3">Negligible to continuous immersion</td>
                        <td className="border border-white/10 p-3">IP rating selection</td>
                      </tr>
                      <tr>
                        <td className="border border-white/10 p-3">Corrosive/Pollutants</td>
                        <td className="border border-white/10 p-3">AF1-AF4</td>
                        <td className="border border-white/10 p-3">Negligible to high significance</td>
                        <td className="border border-white/10 p-3">Material compatibility</td>
                      </tr>
                      <tr className="bg-muted/5">
                        <td className="border border-white/10 p-3">Mechanical Impact</td>
                        <td className="border border-white/10 p-3">AG1-AG3</td>
                        <td className="border border-white/10 p-3">Low to high severity</td>
                        <td className="border border-white/10 p-3">IK rating required</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-transparent border border-border/30 rounded-lg">
                  <h5 className="font-medium text-elec-yellow mb-3">Swimming Pool Plant Rooms - Detailed Assessment</h5>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="font-medium text-white mb-2">Environmental Conditions</h6>
                      <ul className="space-y-1 text-sm">
                        <li>• <strong>Temperature:</strong> 25-35°C typical operating range</li>
                        <li>• <strong>Humidity:</strong> Often exceeds 90% relative humidity</li>
                        <li>• <strong>Chlorine gas:</strong> 1-5 ppm typical, up to 10 ppm peaks</li>
                        <li>• <strong>pH chemicals:</strong> Sodium bisulphate, sodium hypochlorite</li>
                        <li>• <strong>Water exposure:</strong> Pipe leaks, condensation, washdown</li>
                      </ul>
                    </div>
                    <div>
                      <h6 className="font-medium text-white mb-2">Material Degradation Effects</h6>
                      <ul className="space-y-1 text-sm">
                        <li>• <strong>Steel corrosion:</strong> Rapid rust and pitting in 6-12 months</li>
                        <li>• <strong>Copper oxidation:</strong> Green patina formation, connection loosening</li>
                        <li>• <strong>Plastic degradation:</strong> UV + chlorine causes embrittlement</li>
                        <li>• <strong>Seal failure:</strong> Chlorine attacks rubber compounds</li>
                        <li>• <strong>Electrical issues:</strong> Tracking, insulation breakdown</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-white/5 rounded-lg">
                    <p className="text-xs sm:text-sm text-white">
                      <strong>BS 7671 Classification:</strong> Typical swimming pool plant room would be coded as AA5 (high temperature), AD4 (water splashing), AF3 (chemically active substances present).
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-transparent border border-amber-400/30 rounded-lg">
                  <h5 className="font-medium text-amber-400 mb-3">Food Processing - Hygiene and Chemical Challenges</h5>
                  <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
                    <div>
                      <h6 className="font-medium text-white mb-2">Cleaning Regime</h6>
                      <ul className="space-y-1 text-sm">
                        <li>• <strong>Frequency:</strong> Multiple times per shift</li>
                        <li>• <strong>Pressure:</strong> 40-80 bar water jets typical</li>
                        <li>• <strong>Temperature:</strong> 60-85°C hot water/steam</li>
                        <li>• <strong>Chemicals:</strong> Caustic soda, acids, sanitisers</li>
                      </ul>
                    </div>
                    <div>
                      <h6 className="font-medium text-white mb-2">Design Requirements</h6>
                      <ul className="space-y-1 text-sm">
                        <li>• <strong>Surfaces:</strong> Smooth, non-porous, sloped to drain</li>
                        <li>• <strong>Accessibility:</strong> All areas must be cleanable</li>
                        <li>• <strong>Materials:</strong> Food-grade approved only</li>
                        <li>• <strong>Maintenance:</strong> Rapid component replacement</li>
                      </ul>
                    </div>
                    <div>
                      <h6 className="font-medium text-white mb-2">Common Failures</h6>
                      <ul className="space-y-1 text-sm">
                        <li>• <strong>Seal degradation:</strong> Chemical attack on gaskets</li>
                        <li>• <strong>Crevice corrosion:</strong> In joints and fixings</li>
                        <li>• <strong>Coating failure:</strong> Paint/powder coat breakdown</li>
                        <li>• <strong>Water ingress:</strong> Through damaged glands</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-transparent border border-cyan-400/30 rounded-lg">
                  <h5 className="font-medium text-cyan-400 mb-3">Coastal and Marine Environments</h5>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="font-medium text-white mb-2">Corrosion Mechanisms</h6>
                      <ul className="space-y-1 text-sm">
                        <li>• <strong>Pitting corrosion:</strong> Chloride attack on passive layers</li>
                        <li>• <strong>Galvanic action:</strong> Electrolyte (salt water) accelerates</li>
                        <li>• <strong>Crevice corrosion:</strong> Oxygen depletion in tight spaces</li>
                        <li>• <strong>Stress corrosion:</strong> Combined load and environmental attack</li>
                        <li>• <strong>Atmospheric corrosion:</strong> Salt deposits + moisture cycles</li>
                      </ul>
                    </div>
                    <div>
                      <h6 className="font-medium text-white mb-2">Distance-Based Risk Assessment</h6>
                      <div className="space-y-2">
                        <div className="p-2 bg-white/5 rounded text-sm">
                          <strong>0-200m from sea:</strong> Severe - Direct salt spray exposure
                        </div>
                        <div className="p-2 bg-white/5 rounded text-sm">
                          <strong>200m-1km:</strong> High - Airborne salt particles
                        </div>
                        <div className="p-2 bg-white/5 rounded text-sm">
                          <strong>1-5km:</strong> Moderate - Seasonal salt deposits
                        </div>
                        <div className="p-2 bg-white/5 rounded text-sm">
                          <strong>&gt;5km:</strong> Low - Occasional exposure during storms
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-transparent border border-green-400/30 rounded-lg">
              <h4 className="font-medium text-green-400 mb-3">Practical Assessment Checklist</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h6 className="font-medium text-white mb-2">Site Survey Questions</h6>
                  <ul className="space-y-1 text-sm">
                    <li>• What chemicals are used, stored, or produced on site?</li>
                    <li>• What cleaning procedures will occur around electrical equipment?</li>
                    <li>• Is the location subject to washdown or steam cleaning?</li>
                    <li>• What are the expected temperature and humidity ranges?</li>
                    <li>• How close is the installation to the sea or chemical plant?</li>
                    <li>• What maintenance access and frequency is planned?</li>
                  </ul>
                </div>
                <div>
                  <h6 className="font-medium text-white mb-2">Documentation Requirements</h6>
                  <ul className="space-y-1 text-sm">
                    <li>• Record external influence codes for each location</li>
                    <li>• Specify minimum IP ratings and material grades</li>
                    <li>• Define maintenance intervals for seals and coatings</li>
                    <li>• Identify inspection points for corrosion monitoring</li>
                    <li>• Plan for component replacement and upgrade paths</li>
                    <li>• Include environmental monitoring requirements</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[0]} />
          <div className="my-6 border-t border-white/10" />

          {/* 2. Material Selection */}
          <div className="mb-6">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <Wrench className="w-5 h-5" /> 2. Material Selection and Compatibility
            </h3>

            <div className="mb-6">
              <h4 className="font-medium text-white mb-3">Metallic Materials - Properties and Applications</h4>
              <div className="p-4 bg-transparent border border-green-400/30 rounded-lg mb-4">
                <h5 className="font-medium text-green-400 mb-3">Stainless Steel Grades and Selection</h5>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-white/10 text-sm">
                    <thead>
                      <tr className="">
                        <th className="border border-white/10 p-3 text-left">Grade</th>
                        <th className="border border-white/10 p-3 text-left">Composition</th>
                        <th className="border border-white/10 p-3 text-left">Corrosion Resistance</th>
                        <th className="border border-white/10 p-3 text-left">Typical Use</th>
                        <th className="border border-white/10 p-3 text-left">Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-white/10 p-3"><strong>304</strong></td>
                        <td className="border border-white/10 p-3">18% Cr, 8% Ni</td>
                        <td className="border border-white/10 p-3">Good general purpose</td>
                        <td className="border border-white/10 p-3">Indoor, mild environments</td>
                        <td className="border border-white/10 p-3">Standard</td>
                      </tr>
                      <tr className="bg-muted/5">
                        <td className="border border-white/10 p-3"><strong>316</strong></td>
                        <td className="border border-white/10 p-3">18% Cr, 10% Ni, 2% Mo</td>
                        <td className="border border-white/10 p-3">Excellent marine/chemical</td>
                        <td className="border border-white/10 p-3">Coastal, pool plant rooms</td>
                        <td className="border border-white/10 p-3">+15-25%</td>
                      </tr>
                      <tr>
                        <td className="border border-white/10 p-3"><strong>316L</strong></td>
                        <td className="border border-white/10 p-3">Low carbon 316</td>
                        <td className="border border-white/10 p-3">Superior weld zones</td>
                        <td className="border border-white/10 p-3">Fabricated enclosures</td>
                        <td className="border border-white/10 p-3">+20-30%</td>
                      </tr>
                      <tr className="bg-muted/5">
                        <td className="border border-white/10 p-3"><strong>2205</strong></td>
                        <td className="border border-white/10 p-3">Duplex grade</td>
                        <td className="border border-white/10 p-3">Maximum chloride resistance</td>
                        <td className="border border-white/10 p-3">Severe marine, desalination</td>
                        <td className="border border-white/10 p-3">+40-60%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 grid md:grid-cols-2 gap-4">
                  <div className="p-3 bg-white/5 rounded-lg">
                    <h6 className="font-medium text-white mb-2">Stainless Steel Installation Tips</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• Use only stainless steel fixings - never mix with carbon steel</li>
                      <li>• Avoid tool contamination - dedicated stainless steel cutting tools</li>
                      <li>• Remove heat tint after welding to restore corrosion resistance</li>
                      <li>• Design out crevices - use continuous welds, avoid threaded joints</li>
                      <li>• Consider thermal expansion - 16-18 × 10⁻⁶/°C coefficient</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg">
                    <h6 className="font-medium text-white mb-2">Common Stainless Steel Failures</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Pitting:</strong> Chloride attack, especially in stagnant areas</li>
                      <li>• <strong>Crevice corrosion:</strong> Under gaskets, washers, deposits</li>
                      <li>• <strong>Stress corrosion:</strong> Chloride + tensile stress + heat</li>
                      <li>• <strong>Galvanic attack:</strong> When coupled to carbon steel</li>
                      <li>• <strong>Sensitisation:</strong> Poor welding technique causes carbide precipitation</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-transparent border border-border/30 rounded-lg mb-4">
                <h5 className="font-medium text-elec-yellow mb-3">Other Metallic Options</h5>
                <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
                  <div>
                    <h6 className="font-medium text-white mb-2">Aluminium Alloys</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>6063-T6:</strong> Good strength, moderate corrosion resistance</li>
                      <li>• <strong>5083:</strong> Marine grade, excellent salt water resistance</li>
                      <li>• <strong>Anodising:</strong> 25-50 micron coating for protection</li>
                      <li>• <strong>Powder coating:</strong> Additional barrier protection</li>
                      <li>• <strong>Isolation required:</strong> From steel and copper components</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium text-white mb-2">Galvanised Steel</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Hot dip:</strong> 85 micron minimum, 15-20 year life</li>
                      <li>• <strong>Sherardised:</strong> For threaded components</li>
                      <li>• <strong>Coating damage:</strong> Repair with zinc-rich primers</li>
                      <li>• <strong>Maintenance:</strong> Annual inspection, 5-7 year recoating</li>
                      <li>• <strong>Chemical limits:</strong> pH 6-12 range for zinc stability</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium text-white mb-2">Copper Alloys</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Brass:</strong> Vulnerable to dezincification</li>
                      <li>• <strong>Bronze:</strong> Good marine performance</li>
                      <li>• <strong>Copper:</strong> Self-limiting patina formation</li>
                      <li>• <strong>Galvanic issues:</strong> Cathodic to most other metals</li>
                      <li>• <strong>Ammonia:</strong> Particularly corrosive to copper alloys</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-transparent border border-border/30 rounded-lg mb-4">
                <h5 className="font-medium text-elec-yellow mb-3">Non-Metallic Materials Selection</h5>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-white/10 text-sm">
                    <thead>
                      <tr className="">
                        <th className="border border-white/10 p-3 text-left">Material</th>
                        <th className="border border-white/10 p-3 text-left">Chemical Resistance</th>
                        <th className="border border-white/10 p-3 text-left">Temperature Range</th>
                        <th className="border border-white/10 p-3 text-left">UV Resistance</th>
                        <th className="border border-white/10 p-3 text-left">Applications</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-white/10 p-3"><strong>GRP</strong></td>
                        <td className="border border-white/10 p-3">Excellent acids/alkalis</td>
                        <td className="border border-white/10 p-3">-40°C to +120°C</td>
                        <td className="border border-white/10 p-3">Good with gel coat</td>
                        <td className="border border-white/10 p-3">Chemical plant, washdown areas</td>
                      </tr>
                      <tr className="bg-muted/5">
                        <td className="border border-white/10 p-3"><strong>Polycarbonate</strong></td>
                        <td className="border border-white/10 p-3">Good general purpose</td>
                        <td className="border border-white/10 p-3">-40°C to +130°C</td>
                        <td className="border border-white/10 p-3">Requires UV stabilisation</td>
                        <td className="border border-white/10 p-3">Impact-resistant enclosures</td>
                      </tr>
                      <tr>
                        <td className="border border-white/10 p-3"><strong>ABS</strong></td>
                        <td className="border border-white/10 p-3">Moderate</td>
                        <td className="border border-white/10 p-3">-20°C to +80°C</td>
                        <td className="border border-white/10 p-3">Poor - degrades rapidly</td>
                        <td className="border border-white/10 p-3">Indoor, controlled environments</td>
                      </tr>
                      <tr className="bg-muted/5">
                        <td className="border border-white/10 p-3"><strong>PTFE/FEP</strong></td>
                        <td className="border border-white/10 p-3">Outstanding all chemicals</td>
                        <td className="border border-white/10 p-3">-200°C to +260°C</td>
                        <td className="border border-white/10 p-3">Excellent</td>
                        <td className="border border-white/10 p-3">Extreme chemical conditions</td>
                      </tr>
                      <tr>
                        <td className="border border-white/10 p-3"><strong>PVC</strong></td>
                        <td className="border border-white/10 p-3">Good acids, poor solvents</td>
                        <td className="border border-white/10 p-3">-10°C to +60°C</td>
                        <td className="border border-white/10 p-3">Requires stabilisation</td>
                        <td className="border border-white/10 p-3">General purpose, cost-effective</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-4 bg-transparent border border-border/30 rounded-lg">
                <h5 className="font-medium text-elec-yellow mb-3">Cable and Wiring System Materials</h5>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h6 className="font-medium text-white mb-2">Cable Sheath Materials</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>PVC:</strong> Cost-effective, requires UV stabilisation outdoors</li>
                      <li>• <strong>LSZH:</strong> Reduced toxic gas emission, good chemical resistance</li>
                      <li>• <strong>XLPE:</strong> Higher temperature rating, good chemical resistance</li>
                      <li>• <strong>EPR:</strong> Excellent flexibility, moisture resistance</li>
                      <li>• <strong>FEP/ETFE:</strong> Maximum chemical resistance, high cost</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium text-white mb-2">Conduit and Trunking</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>PVC conduit:</strong> Good for most environments, UV rating essential</li>
                      <li>• <strong>Galvanised steel:</strong> Mechanical protection, needs coating maintenance</li>
                      <li>• <strong>Stainless steel:</strong> Premium option for severe environments</li>
                      <li>• <strong>GRP trunking:</strong> Chemical resistance, electrical insulation</li>
                      <li>• <strong>Aluminium:</strong> Lightweight, marine grades available</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-white/5 rounded-lg">
                  <h6 className="font-medium text-white mb-2">Cable Gland Selection Criteria</h6>
                  <div className="grid md:grid-cols-2 gap-4">
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>IP rating:</strong> Match or exceed enclosure rating</li>
                      <li>• <strong>Cable compatibility:</strong> Outer diameter and sheath material</li>
                      <li>• <strong>Thread type:</strong> Metric, BSPT, NPT - ensure sealing</li>
                    </ul>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Material compatibility:</strong> Avoid galvanic couples</li>
                      <li>• <strong>Temperature rating:</strong> Account for cable and ambient</li>
                      <li>• <strong>Chemical resistance:</strong> Seal and body materials</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[1]} />
          <div className="my-6 border-t border-white/10" />

          {/* 3. Installation Details and Good Practice */}
          <div className="mb-6">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <Beaker className="w-5 h-5" /> 3. Installation Details and Good Practice
            </h3>

            <div className="mb-6">
              <h4 className="font-medium text-white mb-3">Water Ingress Prevention Techniques</h4>
              <div className="p-4 bg-transparent border border-amber-400/30 rounded-lg mb-4">
                <h5 className="font-medium text-amber-400 mb-3">Cable Entry Design and Installation</h5>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h6 className="font-medium text-white mb-2">Drip Loop Design</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Purpose:</strong> Directs water away from cable entry points</li>
                      <li>• <strong>Minimum drop:</strong> 150mm below entry point</li>
                      <li>• <strong>Radius:</strong> Minimum 6x cable diameter to avoid stress</li>
                      <li>• <strong>Support:</strong> Cleat or bracket at low point</li>
                      <li>• <strong>Inspection:</strong> Clear view of loop integrity</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium text-white mb-2">Entry Point Selection</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Side entries:</strong> Preferred over top entries</li>
                      <li>• <strong>Bottom entries:</strong> Best for washdown environments</li>
                      <li>• <strong>Sloped knockouts:</strong> Encourage water runoff</li>
                      <li>• <strong>Weather protection:</strong> Hood or canopy above entries</li>
                      <li>• <strong>Multiple entries:</strong> Stagger heights to prevent pooling</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-4 overflow-x-auto">
                  <table className="w-full border-collapse border border-white/10 text-sm">
                    <thead>
                      <tr className="">
                        <th className="border border-white/10 p-3 text-left">Cable Gland Type</th>
                        <th className="border border-white/10 p-3 text-left">IP Rating Available</th>
                        <th className="border border-white/10 p-3 text-left">Cable Types</th>
                        <th className="border border-white/10 p-3 text-left">Environment Suitability</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-white/10 p-3">Standard PVC Gland</td>
                        <td className="border border-white/10 p-3">IP66/67</td>
                        <td className="border border-white/10 p-3">PVC/LSZH/Rubber</td>
                        <td className="border border-white/10 p-3">General purpose, not chemical</td>
                      </tr>
                      <tr className="bg-muted/5">
                        <td className="border border-white/10 p-3">Stainless Steel Gland</td>
                        <td className="border border-white/10 p-3">IP66/67/68</td>
                        <td className="border border-white/10 p-3">All cable types</td>
                        <td className="border border-white/10 p-3">Marine, chemical, high temperature</td>
                      </tr>
                      <tr>
                        <td className="border border-white/10 p-3">Hygienic Gland</td>
                        <td className="border border-white/10 p-3">IP69K</td>
                        <td className="border border-white/10 p-3">Food-grade cables</td>
                        <td className="border border-white/10 p-3">Food processing, pharmaceuticals</td>
                      </tr>
                      <tr className="bg-muted/5">
                        <td className="border border-white/10 p-3">EMC/Earth Gland</td>
                        <td className="border border-white/10 p-3">IP66 typical</td>
                        <td className="border border-white/10 p-3">Armoured/screened</td>
                        <td className="border border-white/10 p-3">SWA termination, EMC control</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-4 bg-transparent border border-border/30 rounded-lg mb-4">
                <h5 className="font-medium text-elec-yellow mb-3">Enclosure Mounting and Installation</h5>
                <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
                  <div>
                    <h6 className="font-medium text-white mb-2">Wall Mounting</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Standoff distance:</strong> 25-50mm from damp walls</li>
                      <li>• <strong>Gasket continuity:</strong> Full perimeter sealing</li>
                      <li>• <strong>Drain holes:</strong> 6mm diameter, low points</li>
                      <li>• <strong>Mounting surface:</strong> Level, dry, compatible material</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium text-white mb-2">Ventilation and Drainage</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Breather membranes:</strong> Allow pressure equalisation</li>
                      <li>• <strong>Internal heaters:</strong> Prevent condensation</li>
                      <li>• <strong>Drain valves:</strong> Manual or automatic operation</li>
                      <li>• <strong>Air circulation:</strong> Minimum 300mm clearance</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium text-white mb-2">Sealing Systems</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Gasket material:</strong> EPDM, silicone, FKM for chemicals</li>
                      <li>• <strong>Compression ratio:</strong> 25-30% for optimal sealing</li>
                      <li>• <strong>Surface finish:</strong> Ra 1.6μm maximum for sealing</li>
                      <li>• <strong>Multiple seals:</strong> Primary and secondary barriers</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-transparent border border-border/30 rounded-lg mb-4">
                <h5 className="font-medium text-elec-yellow mb-3">Corrosion Prevention Strategies</h5>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h6 className="font-medium text-white mb-2">Galvanic Corrosion Control</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Material separation:</strong> Nylon washers, PTFE tape</li>
                      <li>• <strong>Compatible fasteners:</strong> Match base material or upgrade</li>
                      <li>• <strong>Sealant application:</strong> Marine-grade polyurethane/silicone</li>
                      <li>• <strong>Electrical isolation:</strong> Break current paths</li>
                      <li>• <strong>Sacrificial anodes:</strong> For severe marine applications</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium text-white mb-2">Coating Systems Maintenance</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Pre-installation:</strong> Touch up any shipping damage</li>
                      <li>• <strong>Site protection:</strong> Mask during construction activities</li>
                      <li>• <strong>Inspection interval:</strong> Annual for coastal, bi-annual inland</li>
                      <li>• <strong>Repair procedure:</strong> Clean, prime, topcoat matching system</li>
                      <li>• <strong>Documentation:</strong> Record coating type and application dates</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-white/5 rounded-lg">
                  <h6 className="font-medium text-white mb-2">Galvanic Series (Anodic to Cathodic)</h6>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                    <div className="text-center p-2 bg-red-500/20 rounded">Magnesium</div>
                    <div className="text-center p-2 bg-orange-500/20 rounded">Zinc</div>
                    <div className="text-center p-2 bg-elec-yellow/20 rounded">Aluminium</div>
                    <div className="text-center p-2 bg-elec-yellow/20 rounded">Carbon Steel</div>
                    <div className="text-center p-2 bg-green-500/20 rounded">Stainless 316</div>
                    <div className="text-center p-2 bg-purple-500/20 rounded">Brass</div>
                    <div className="text-center p-2 bg-indigo-500/20 rounded">Copper</div>
                    <div className="text-center p-2 bg-gray-500/20 rounded">Graphite</div>
                  </div>
                  <p className="text-xs mt-2 text-white">Metals further apart are more likely to cause galvanic corrosion when coupled</p>
                </div>
              </div>

              <div className="p-4 bg-transparent border border-green-400/30 rounded-lg mb-4">
                <h5 className="font-medium text-green-400 mb-3">Specific Environment Installation Guidelines</h5>
                <div className="space-y-4">
                  <div className="p-3 bg-white/5 rounded-lg">
                    <h6 className="font-medium text-white mb-2">Swimming Pool Plant Rooms</h6>
                    <div className="grid md:grid-cols-2 gap-4">
                      <ul className="space-y-1 text-sm">
                        <li>• Install dehumidification to maintain &lt;60% RH</li>
                        <li>• Use only 316 stainless or GRP materials</li>
                        <li>• Mount equipment minimum 2m from chemical storage</li>
                        <li>• Provide emergency ventilation system</li>
                      </ul>
                      <ul className="space-y-1 text-sm">
                        <li>• Cable routing via overhead galvanised steel tray</li>
                        <li>• Use LSZH cables throughout plant room</li>
                        <li>• Install emergency stop systems for chemical feeds</li>
                        <li>• Monthly inspection and seal replacement schedule</li>
                      </ul>
                    </div>
                  </div>

                  <div className="p-3 bg-white/5 rounded-lg">
                    <h6 className="font-medium text-white mb-2">Food Processing Areas</h6>
                    <div className="grid md:grid-cols-2 gap-4">
                      <ul className="space-y-1 text-sm">
                        <li>• All surfaces sloped minimum 3° to prevent pooling</li>
                        <li>• Hygienic design - no horizontal surfaces or crevices</li>
                        <li>• Mount equipment to allow complete cleaning access</li>
                        <li>• Use only food-grade approved materials and lubricants</li>
                      </ul>
                      <ul className="space-y-1 text-sm">
                        <li>• IP69K rating required for washdown zones</li>
                        <li>• Quick-release fixings for rapid maintenance</li>
                        <li>• Colour coding system for different zones</li>
                        <li>• Temperature monitoring for HACCP compliance</li>
                      </ul>
                    </div>
                  </div>

                  <div className="p-3 bg-white/5 rounded-lg">
                    <h6 className="font-medium text-white mb-2">Coastal Installations</h6>
                    <div className="grid md:grid-cols-2 gap-4">
                      <ul className="space-y-1 text-sm">
                        <li>• Weekly fresh water washing to remove salt deposits</li>
                        <li>• Marine-grade coatings with 10+ year service life</li>
                        <li>• Cathodic protection for large metallic structures</li>
                        <li>• Use of sacrificial zinc anodes on steel supports</li>
                      </ul>
                      <ul className="space-y-1 text-sm">
                        <li>• Enhanced earth monitoring due to soil salinity</li>
                        <li>• UV-resistant cable selection for exposed runs</li>
                        <li>• Storm damage assessment procedures</li>
                        <li>• Quarterly coating condition surveys</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-transparent border border-border/30 rounded-lg">
                <h5 className="font-medium text-elec-yellow mb-3">Testing and Commissioning Considerations</h5>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h6 className="font-medium text-white mb-2">Pre-Commissioning Checks</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Seal integrity:</strong> Pressure test to 1.5x operating pressure</li>
                      <li>• <strong>Coating continuity:</strong> Holiday detection at 100V/μm</li>
                      <li>• <strong>Gasket compression:</strong> Verify correct squeeze ratio</li>
                      <li>• <strong>Drain function:</strong> Test all drainage and venting systems</li>
                      <li>• <strong>Material compatibility:</strong> Verify all components match specification</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium text-white mb-2">Ongoing Monitoring</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Insulation resistance:</strong> Monthly testing in damp conditions</li>
                      <li>• <strong>Earth fault monitoring:</strong> Continuous RCD supervision</li>
                      <li>• <strong>Corrosion monitoring:</strong> Ultrasonic thickness measurement</li>
                      <li>• <strong>Environmental logging:</strong> Temperature, humidity, chemical exposure</li>
                      <li>• <strong>Seal condition:</strong> Visual inspection and replacement schedule</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-transparent border border-white/10 rounded-lg">
              <h4 className="font-medium text-white mb-3">BS 7671 Compliance Framework</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h6 className="font-medium text-white mb-2">Design Stage Requirements</h6>
                  <ul className="space-y-1 text-sm">
                    <li>• Assessment of external influences (Section 512)</li>
                    <li>• Selection of equipment suitable for conditions (Section 512)</li>
                    <li>• IP rating specification matching environment</li>
                    <li>• Material compatibility with BS EN standards</li>
                  </ul>
                </div>
                <div>
                  <h6 className="font-medium text-white mb-2">Installation Requirements</h6>
                  <ul className="space-y-1 text-sm">
                    <li>• Workmanship to BS 7671 Section 134</li>
                    <li>• Protection against corrosion (Section 522)</li>
                    <li>• Suitable for environmental conditions (Section 512)</li>
                    <li>• Accessible for maintenance and inspection</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[2]} />
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-transparent border border-white/10 rounded-lg">
              <h3 className="font-medium text-white mb-2">Q: Do I always need stainless steel outdoors?</h3>
              <p className="text-xs sm:text-sm text-white">
                A: Not always. Consider the environment and duty—UV‑stable plastics or coated metals may be suitable inland. Coastal and chemical sites often justify 316 stainless or GRP.
              </p>
            </div>
            <div className="p-4 bg-transparent border border-white/10 rounded-lg">
              <h3 className="font-medium text-white mb-2">Q: How often should gaskets be changed?</h3>
              <p className="text-xs sm:text-sm text-white">
                A: Follow manufacturer guidance—monthly inspection in harsh areas is common, with proactive replacement at first signs of hardening, cracking or flattening.
              </p>
            </div>
            <div className="p-4 bg-transparent border border-white/10 rounded-lg">
              <h3 className="font-medium text-white mb-2">Q: Are LSZH cables always the best choice?</h3>
              <p className="text-xs sm:text-sm text-white">
                A: LSZH is often preferred in public or process areas, but confirm chemical and UV compatibility. Select sheath type for the actual environment and mechanical duty.
              </p>
            </div>
          </div>
        </section>

        {/* Summary */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Summary
          </h2>
          <div className="rounded-lg p-4 bg-elec-yellow/10 border-l-2 border-l-elec-yellow border border-elec-yellow/30">
            <p className="text-white/90">
              Correct material selection and installation detail are essential in damp and corrosive areas. Assess external influences, choose compatible metals/non‑metals, protect against ingress and galvanic action, and maintain seals and coatings. Following BS 7671 principles ensures safe, durable installations.
            </p>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Quiz (8 Questions)
          </h2>
          <Quiz questions={quizQuestions} />
        </section>

        {/* Navigation */}
        <div className="flex flex-col-reverse sm:flex-row justify-between items-stretch sm:items-center gap-3 pt-8 border-t border-white/10">
          <Button variant="outline" className="min-h-[44px] touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../5-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Environmental Risks
            </Link>
          </Button>
          <Button className="min-h-[44px] touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../5-5">
              Next: Special Locations
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
