import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Wrench,
  Shield,
  FileText,
} from "lucide-react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE =
  "Safe Entry to Enclosures (Grommets, Bushes, Glands) - Module 3.6.4 | Level 2 Electrical Course";
const DESCRIPTION =
  "Ensure safe cable entry into enclosures using grommets, bushes and glands. Maintain IP ratings, provide strain relief, and comply with BS 7671.";

// Quiz (8 questions)
const quizQuestions = [
  {
    id: 1,
    question: "What does a grommet prevent?",
    options: [
      "Electrical arcing",
      "Insulation damage from sharp edges",
      "Overheating",
      "Water ingress only",
    ],
    correctAnswer: 1,
    explanation:
      "Grommets protect the cable sheath from abrasion on sharp knockout edges, preventing insulation damage.",
  },
  {
    id: 2,
    question: "Which type of gland is suitable for marine environments?",
    options: ["PVC gland", "Brass IP68 gland", "Plastic bush", "Rubber grommet"],
    correctAnswer: 1,
    explanation:
      "IP68-rated brass or stainless glands provide the sealing and corrosion resistance required in marine environments.",
  },
  {
    id: 3,
    question: "True or False: Cable glands can provide both mechanical retention and sealing.",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation:
      "Glands secure the cable mechanically and, when rated, provide environmental sealing to maintain the enclosure's IP rating.",
  },
  {
    id: 4,
    question:
      "Name one standard that requires preventing cable damage at entry points.",
    options: ["BS 7671", "BS 5839", "BS 5266", "BS 1363"],
    correctAnswer: 0,
    explanation:
      "BS 7671 requires that cables are installed to prevent damage during installation, use and maintenance (e.g., via grommets, bushes, glands).",
  },
  {
    id: 5,
    question:
      "Which IP rating is typically required for an enclosure exposed to heavy rain?",
    options: ["IP44", "IP54", "IP65", "IP20"],
    correctAnswer: 2,
    explanation:
      "Outdoor enclosures commonly require at least IP65; harsher conditions may require IP66/67/68.",
  },
  {
    id: 6,
    question:
      "Give one example of an application where an explosion-proof gland would be required.",
    options: [
      "Domestic bathroom",
      "Petrol forecourt/ATEX zone",
      "Office ceiling void",
      "Under-stairs cupboard",
    ],
    correctAnswer: 1,
    explanation:
      "Hazardous areas (ATEX zones) such as petrochemical sites require certified explosion-proof glands.",
  },
  {
    id: 7,
    question: "Why should unused cable entries be sealed?",
    options: [
      "To reduce noise",
      "To maintain IP rating and prevent ingress of dust/water/pests",
      "To improve cable colour coding",
      "To make labels stick better",
    ],
    correctAnswer: 1,
    explanation:
      "Open entries compromise IP rating and can allow moisture, dust, or pests to enter, risking failures.",
  },
  {
    id: 8,
    question: "What's one risk of over-tightening a cable gland?",
    options: [
      "Improved sealing",
      "Damaging the cable sheath, leading to premature failure",
      "Better strain relief with no downsides",
      "Reduced enclosure rating",
    ],
    correctAnswer: 1,
    explanation:
      "Over-tightening can cut into or deform the sheath, stressing conductors and shortening cable life.",
  },
];

// Inline knowledge checks
const quickCheckQuestions = [
  {
    id: "grommet-purpose",
    question: "What is the primary purpose of a grommet?",
    options: [
      "To clamp the cable for strain relief only",
      "To prevent insulation damage on sharp edges",
      "To identify cable cores",
      "To improve enclosure aesthetics",
    ],
    correctIndex: 1,
    explanation:
      "Grommets cover sharp knockout edges to prevent abrasion of the cable sheath/insulation.",
  },
  {
    id: "outdoor-gland",
    question: "Which entry method is most suitable for IP65 outdoor use?",
    options: [
      "Standard rubber grommet",
      "Plastic bush only",
      "IP-rated cable gland sized to the cable OD",
      "Open entry with silicone",
    ],
    correctIndex: 2,
    explanation:
      "An IP-rated gland provides sealing and mechanical retention while maintaining the enclosure's IP rating.",
  },
  {
    id: "sizing-gland",
    question: "Why is correct sizing important when fitting a gland?",
    options: [
      "It makes labels fit better",
      "To ensure compression seal works without damaging the sheath",
      "To reduce cable capacitance",
      "It's only cosmetic",
    ],
    correctIndex: 1,
    explanation:
      "Correct sizing ensures the compression seal grips properly for IP performance without crushing or cutting the sheath.",
  },
];

export default function Module3Section6_4() {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[#1a1a1a] overflow-x-hidden">
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
              Back to Section 3.6
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <header className="mb-6 sm:mb-8 text-center">
          <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/30 mb-4">
            <span className="text-elec-yellow text-sm font-medium">Module 3.6.4</span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Safe Entry to Enclosures (Grommets, Bushes, Glands)
          </h1>
          <p className="text-white/80">
            Prevent insulation damage, maintain environmental sealing and provide mechanical stability when cables enter consumer units, junction boxes, panels and switchgear - in line with BS 7671.
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
                <li>Unprotected entries chafe cable sheaths and compromise safety.</li>
                <li>Correct grommets, bushes and glands protect, seal and support cables.</li>
                <li>Selection depends on cable type, location and required IP rating.</li>
                <li>BS 7671 requires preventing damage during installation, use and maintenance.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-2 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Sharp knockout edges, missing grommets, loose glands, open entries.</li>
                <li><strong>Use:</strong> Sized grommets/bushes, IP-rated glands, sealing plugs for unused entries.</li>
                <li><strong>Check:</strong> Gland torque, bend radius, strain relief, enclosure rating maintained.</li>
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
            <li>Identify safe cable entry methods for different enclosure types.</li>
            <li>Select appropriate grommets, bushes or glands by environment and cable.</li>
            <li>Maintain IP ratings and strain relief without damaging the sheath.</li>
            <li>Apply best-practice installation to comply with BS 7671.</li>
          </ul>
        </section>

        {/* Content */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Content / Learning
          </h2>

          {/* 1. Why Safe Cable Entry Matters */}
          <div className="mb-6">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5" /> 1. Why Safe Cable Entry Matters
            </h3>

            <div className="mb-6">
              <h4 className="font-medium text-white mb-3">Understanding Cable Entry Vulnerabilities</h4>
              <div className="p-4 bg-transparent border border-border/30 rounded-lg mb-4">
                <h5 className="font-medium text-elec-yellow mb-3">Critical Safety Functions</h5>
                <p className="text-xs sm:text-sm text-white mb-3">
                  <strong>Primary Purpose:</strong> Cable entry protection serves multiple critical safety functions beyond basic edge protection. Proper entry systems prevent progressive failure modes that can compromise entire electrical installations and create serious safety hazards.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h6 className="font-medium text-white mb-2">Immediate Protection Functions</h6>
                    <ul className="space-y-1 text-sm">
                      <li>* <strong>Mechanical protection:</strong> Shield cable sheath from sharp knockout edges</li>
                      <li>* <strong>Strain relief:</strong> Transfer mechanical loads to outer sheath, not cores</li>
                      <li>* <strong>Environmental sealing:</strong> Maintain IP rating against dust/moisture</li>
                      <li>* <strong>Arc prevention:</strong> Prevent conductor exposure leading to flashover</li>
                      <li>* <strong>Chemical protection:</strong> Shield from cleaning agents and contaminants</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium text-white mb-2">Long-term Reliability Benefits</h6>
                    <ul className="space-y-1 text-sm">
                      <li>* <strong>Extended cable life:</strong> Prevent premature insulation degradation</li>
                      <li>* <strong>Reduced maintenance:</strong> Lower fault rates and inspection requirements</li>
                      <li>* <strong>System integrity:</strong> Maintain design safety margins over installation life</li>
                      <li>* <strong>Compliance continuity:</strong> Ensure ongoing regulatory conformance</li>
                      <li>* <strong>Cost effectiveness:</strong> Avoid expensive emergency repairs and downtime</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-transparent border border-amber-400/30 rounded-lg mb-4">
                <h5 className="font-medium text-amber-400 mb-3">Progressive Failure Analysis</h5>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-white/10 text-sm">
                    <thead>
                      <tr className="">
                        <th className="border border-white/10 p-3 text-left">Failure Stage</th>
                        <th className="border border-white/10 p-3 text-left">Damage Mechanism</th>
                        <th className="border border-white/10 p-3 text-left">Observable Signs</th>
                        <th className="border border-white/10 p-3 text-left">Risk Level</th>
                        <th className="border border-white/10 p-3 text-left">Prevention Method</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-white/10 p-3"><strong>Initial</strong></td>
                        <td className="border border-white/10 p-3">Surface abrasion on sheath</td>
                        <td className="border border-white/10 p-3">Visible scoring, sheath thinning</td>
                        <td className="border border-white/10 p-3 text-green-400">Low</td>
                        <td className="border border-white/10 p-3">Proper grommet sizing and fitting</td>
                      </tr>
                      <tr className="bg-muted/5">
                        <td className="border border-white/10 p-3"><strong>Progressive</strong></td>
                        <td className="border border-white/10 p-3">Sheath penetration, moisture ingress</td>
                        <td className="border border-white/10 p-3">Discolouration, swelling, corrosion</td>
                        <td className="border border-white/10 p-3 text-amber-400">Medium</td>
                        <td className="border border-white/10 p-3">IP-rated sealing systems</td>
                      </tr>
                      <tr>
                        <td className="border border-white/10 p-3"><strong>Critical</strong></td>
                        <td className="border border-white/10 p-3">Insulation compromise, tracking</td>
                        <td className="border border-white/10 p-3">IR readings drop, RCD trips</td>
                        <td className="border border-white/10 p-3 text-elec-yellow">High</td>
                        <td className="border border-white/10 p-3">Regular inspection and testing</td>
                      </tr>
                      <tr className="bg-muted/5">
                        <td className="border border-white/10 p-3"><strong>Failure</strong></td>
                        <td className="border border-white/10 p-3">Short circuit, earth fault, fire</td>
                        <td className="border border-white/10 p-3">Tripping, arcing, thermal damage</td>
                        <td className="border border-white/10 p-3 text-red-600">Critical</td>
                        <td className="border border-white/10 p-3">Emergency isolation and replacement</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-4 bg-transparent border border-cyan-400/30 rounded-lg">
                <h5 className="font-medium text-cyan-400 mb-3">Cost Analysis of Entry Protection</h5>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h6 className="font-medium text-white mb-2">Prevention Costs (per entry point)</h6>
                    <ul className="space-y-1 text-sm">
                      <li>* <strong>Basic grommet:</strong> 0.10-0.50 GBP</li>
                      <li>* <strong>Plastic bush:</strong> 0.50-2.00 GBP</li>
                      <li>* <strong>Standard gland:</strong> 2.00-15.00 GBP</li>
                      <li>* <strong>IP67/68 gland:</strong> 5.00-30.00 GBP</li>
                      <li>* <strong>ATEX rated gland:</strong> 20.00-100.00 GBP</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium text-white mb-2">Failure Remediation Costs</h6>
                    <ul className="space-y-1 text-sm">
                      <li>* <strong>Emergency callout:</strong> 150-300 GBP</li>
                      <li>* <strong>Cable replacement:</strong> 50-500+ GBP per circuit</li>
                      <li>* <strong>Downtime costs:</strong> 500-5000+ GBP per hour</li>
                      <li>* <strong>Fire damage:</strong> 10,000-1M+ GBP</li>
                      <li>* <strong>Insurance excess:</strong> 1000-25,000 GBP</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[0]} />
          <div className="my-6 border-t border-white/10" />

          {/* 2. Methods and selection */}
          <div className="mb-6">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <Wrench className="w-5 h-5" /> 2. Cable Entry Methods and Selection
            </h3>

            <div className="p-4 bg-transparent border border-border/30 rounded-lg mb-4">
              <h5 className="font-medium text-elec-yellow mb-2">Overview</h5>
              <ul className="space-y-1 text-sm">
                <li>* <strong>Grommets:</strong> Flexible inserts for knockouts; low/medium protection.</li>
                <li>* <strong>Bushes:</strong> Rigid (often threaded) smooth entry; common with conduit.</li>
                <li>* <strong>Glands:</strong> Provide sealing and strain relief; choose by material and IP.</li>
              </ul>
            </div>

            <div className="overflow-x-auto mb-4">
              <table className="w-full border-collapse border border-white/10 text-sm">
                <thead>
                  <tr className="bg-card text-left">
                    <th className="border border-white/10 p-2">Type</th>
                    <th className="border border-white/10 p-2">Cable</th>
                    <th className="border border-white/10 p-2">Typical IP</th>
                    <th className="border border-white/10 p-2">Use case</th>
                    <th className="border border-white/10 p-2">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 p-2">Rubber grommet</td>
                    <td className="border border-white/10 p-2">Twin & earth, flex</td>
                    <td className="border border-white/10 p-2">N/A (no seal)</td>
                    <td className="border border-white/10 p-2">Indoor, low risk</td>
                    <td className="border border-white/10 p-2">Edge protection only</td>
                  </tr>
                  <tr className="bg-muted/5">
                    <td className="border border-white/10 p-2">Plastic/metal bush</td>
                    <td className="border border-white/10 p-2">Via conduit</td>
                    <td className="border border-white/10 p-2">Depends on system</td>
                    <td className="border border-white/10 p-2">Conduit terminations</td>
                    <td className="border border-white/10 p-2">Smooth entry, no seal</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 p-2">Nylon gland</td>
                    <td className="border border-white/10 p-2">Flexes/round cables</td>
                    <td className="border border-white/10 p-2">IP65-IP68</td>
                    <td className="border border-white/10 p-2">Outdoor/general</td>
                    <td className="border border-white/10 p-2">Lightweight, non-metallic</td>
                  </tr>
                  <tr className="bg-muted/5">
                    <td className="border border-white/10 p-2">Brass/stainless gland</td>
                    <td className="border border-white/10 p-2">Round armoured/unarmoured</td>
                    <td className="border border-white/10 p-2">IP66-IP68</td>
                    <td className="border border-white/10 p-2">Harsh/marine/industrial</td>
                    <td className="border border-white/10 p-2">Robust, corrosion-resistant</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 p-2">Explosion-proof gland</td>
                    <td className="border border-white/10 p-2">As specified</td>
                    <td className="border border-white/10 p-2">Per ATEX/IECEx</td>
                    <td className="border border-white/10 p-2">Hazardous areas</td>
                    <td className="border border-white/10 p-2">Certified to zone/category</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[1]} />
          <div className="my-6 border-t border-white/10" />

          {/* 3. IP Ratings and Environmental Sealing */}
          <div className="mb-6">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5" /> 3. IP Ratings and Environmental Sealing
            </h3>

            <div className="mb-6">
              <h4 className="font-medium text-white mb-3">Understanding IP Rating Requirements</h4>
              <div className="p-4 bg-transparent border border-green-400/30 rounded-lg mb-4">
                <h5 className="font-medium text-green-400 mb-3">IP Classification System (BS EN 60529)</h5>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h6 className="font-medium text-white mb-2">First Digit: Solid Particle Protection</h6>
                    <ul className="space-y-1 text-sm">
                      <li>* <strong>0:</strong> No protection</li>
                      <li>* <strong>4:</strong> Protected against solid objects 1.0mm or larger</li>
                      <li>* <strong>5:</strong> Dust protected (limited ingress permitted)</li>
                      <li>* <strong>6:</strong> Dust tight (no ingress of dust)</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium text-white mb-2">Second Digit: Liquid Ingress Protection</h6>
                    <ul className="space-y-1 text-sm">
                      <li>* <strong>0:</strong> No protection</li>
                      <li>* <strong>4:</strong> Splashing water from any direction</li>
                      <li>* <strong>5:</strong> Water jets from any direction</li>
                      <li>* <strong>6:</strong> Powerful water jets</li>
                      <li>* <strong>7:</strong> Immersion up to 1m depth</li>
                      <li>* <strong>8:</strong> Immersion beyond 1m depth</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto mb-4">
                <table className="w-full border-collapse border border-white/10 text-sm">
                  <thead>
                    <tr className="bg-card text-left">
                      <th className="border border-white/10 p-3">Environment</th>
                      <th className="border border-white/10 p-3">Minimum IP</th>
                      <th className="border border-white/10 p-3">Recommended Entry Method</th>
                      <th className="border border-white/10 p-3">Special Considerations</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 p-3">Indoor dry (offices, homes)</td>
                      <td className="border border-white/10 p-3">IP20-IP30</td>
                      <td className="border border-white/10 p-3">Grommets, bushes, basic glands</td>
                      <td className="border border-white/10 p-3">Focus on mechanical protection</td>
                    </tr>
                    <tr className="bg-muted/5">
                      <td className="border border-white/10 p-3">Outdoor installations</td>
                      <td className="border border-white/10 p-3">IP65</td>
                      <td className="border border-white/10 p-3">IP65+ rated cable glands</td>
                      <td className="border border-white/10 p-3">UV stability, temperature cycling</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 p-3">Washdown areas</td>
                      <td className="border border-white/10 p-3">IP67</td>
                      <td className="border border-white/10 p-3">Stainless steel IP67 glands</td>
                      <td className="border border-white/10 p-3">Chemical resistance required</td>
                    </tr>
                    <tr className="bg-muted/5">
                      <td className="border border-white/10 p-3">Marine/offshore</td>
                      <td className="border border-white/10 p-3">IP67-IP68</td>
                      <td className="border border-white/10 p-3">Marine-grade stainless glands</td>
                      <td className="border border-white/10 p-3">Salt spray resistance</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 bg-transparent border border-amber-400/30 rounded-lg">
                <h5 className="font-medium text-amber-400 mb-2">Installation Best Practices</h5>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <ul className="space-y-1">
                    <li>* Size to the cable OD; follow manufacturer's torque figures</li>
                    <li>* Maintain bend radius; avoid forcing tight angles at entry</li>
                    <li>* Provide strain relief; check clamping on outer sheath (not cores)</li>
                  </ul>
                  <ul className="space-y-1">
                    <li>* Seal unused entries with blanks or rated plugs</li>
                    <li>* Inspect sealing elements before installation</li>
                    <li>* Use calibrated torque wrench for critical applications</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[2]} />
          <div className="my-6 border-t border-white/10" />

          {/* 4. Regulatory Requirements and Compliance Framework */}
          <div className="mb-2">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5" /> 4. Regulatory Requirements and Compliance Framework
            </h3>

            <div className="mb-6">
              <h4 className="font-medium text-white mb-3">UK Regulatory Landscape for Cable Entry Protection</h4>
              <div className="p-4 bg-transparent border border-border/30 rounded-lg mb-4">
                <h5 className="font-medium text-elec-yellow mb-3">Statutory Requirements and Standards</h5>
                <p className="text-xs sm:text-sm text-white mb-3">
                  <strong>Legal Framework:</strong> Cable entry protection in the UK is governed by multiple statutory instruments and technical standards. Compliance ensures both safety and legal conformity for electrical installations across all sectors.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-white/10 text-sm">
                    <thead>
                      <tr className="">
                        <th className="border border-white/10 p-3 text-left">Standard/Regulation</th>
                        <th className="border border-white/10 p-3 text-left">Scope & Application</th>
                        <th className="border border-white/10 p-3 text-left">Key Requirements</th>
                        <th className="border border-white/10 p-3 text-left">Enforcement</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-white/10 p-3"><strong>BS 7671:2018+A2:2022</strong></td>
                        <td className="border border-white/10 p-3">All electrical installations</td>
                        <td className="border border-white/10 p-3">Section 527: Cable support systems and enclosure entry</td>
                        <td className="border border-white/10 p-3">Part P Building Regulations, industry codes</td>
                      </tr>
                      <tr className="bg-muted/5">
                        <td className="border border-white/10 p-3"><strong>BS EN 60529:1992</strong></td>
                        <td className="border border-white/10 p-3">IP rating classification</td>
                        <td className="border border-white/10 p-3">Ingress protection testing and marking</td>
                        <td className="border border-white/10 p-3">CE marking, product standards</td>
                      </tr>
                      <tr>
                        <td className="border border-white/10 p-3"><strong>Building Regulations 2010</strong></td>
                        <td className="border border-white/10 p-3">Part P: Electrical safety</td>
                        <td className="border border-white/10 p-3">Reasonable provisions for safety</td>
                        <td className="border border-white/10 p-3">Local authority building control</td>
                      </tr>
                      <tr className="bg-muted/5">
                        <td className="border border-white/10 p-3"><strong>Electricity at Work Regulations 1989</strong></td>
                        <td className="border border-white/10 p-3">All electrical work activities</td>
                        <td className="border border-white/10 p-3">Regulation 4: Systems to prevent danger</td>
                        <td className="border border-white/10 p-3">HSE, criminal sanctions</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Real-World Example */}
          <div className="mt-6 p-4 bg-transparent border border-border/30 rounded-lg">
            <h5 className="font-medium text-elec-yellow mb-2">Real-World Example</h5>
            <p className="text-xs sm:text-sm text-white">
              A metal consumer unit was installed without grommets on knockout entries. After a year of vibration, the sheath abraded leading to a live-to-earth fault that tripped the RCD. Retrofitting proper grommets and sealing unused entries restored integrity and prevented recurrence.
            </p>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-transparent border border-white/10 rounded-lg">
              <h3 className="font-medium text-white mb-2">Q: Can I use plastic grommets in outdoor enclosures?</h3>
              <p className="text-xs sm:text-sm text-white">
                A: Only if the enclosure's IP rating is maintained - outdoor installations usually require IP-rated glands instead.
              </p>
            </div>
            <div className="p-4 bg-transparent border border-white/10 rounded-lg">
              <h3 className="font-medium text-white mb-2">Q: Are metal glands better than plastic ones?</h3>
              <p className="text-xs sm:text-sm text-white">
                A: Metal glands provide greater strength and durability; selection should match the environment, corrosion risk and IP requirement.
              </p>
            </div>
            <div className="p-4 bg-transparent border border-white/10 rounded-lg">
              <h3 className="font-medium text-white mb-2">Q: What's the difference between a bush and a grommet?</h3>
              <p className="text-xs sm:text-sm text-white">
                A: A bush is a rigid fitting (often threaded) providing a smooth entry; a grommet is a flexible insert that protects the cable on a knockout edge.
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
          <div className="p-4 bg-transparent border-l-2 border-elec-yellow rounded-lg border border-white/10">
            <p className="text-white/90">
              Safe cable entry prevents insulation damage, ensures mechanical security and maintains enclosure integrity. Choose grommets, bushes or glands to suit cable type and environment, and maintain required IP ratings per BS 7671 and BS EN 60529.
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
            <Link to="../6-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button className="min-h-[44px] touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../6-5">
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
