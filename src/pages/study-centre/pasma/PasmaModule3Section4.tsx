import { ArrowLeft, Scale, CheckCircle, AlertTriangle, Wind, Calculator, Anchor, TriangleAlert } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "stability-height-ratio",
    question: "What is the maximum height-to-base ratio for a mobile tower used OUTDOORS?",
    options: [
      "2:1",
      "3:1",
      "3.5:1",
      "4:1"
    ],
    correctIndex: 1,
    explanation: "The maximum height-to-base ratio for outdoor use is 3:1. This is more restrictive than the indoor limit of 3.5:1 because outdoor towers are exposed to wind loading. For example, a tower with a 1.35m base width can reach a maximum platform height of 4.05m outdoors without stabilisers."
  },
  {
    id: "stability-stabilisers",
    question: "When are stabilisers or outriggers required on a mobile tower?",
    options: [
      "Only when the tower is over 10 metres high",
      "Only when it is raining",
      "When approaching the maximum freestanding height, in windy conditions, or when specified by the manufacturer",
      "Stabilisers are optional and never required"
    ],
    correctIndex: 2,
    explanation: "Stabilisers or outriggers are required when the tower approaches its maximum freestanding height (based on height-to-base ratio), when windy conditions increase overturning risk, when uneven loading is anticipated, or whenever the manufacturer specifies them for the particular configuration."
  },
  {
    id: "stability-wind-cease-work",
    question: "At what wind speed must work cease on a mobile scaffold tower?",
    options: [
      "Beaufort Force 2 (8 mph)",
      "Beaufort Force 4 (17 mph / 13 knots)",
      "Beaufort Force 6 (28 mph)",
      "Beaufort Force 8 (40 mph)"
    ],
    correctIndex: 1,
    explanation: "Work must cease at Beaufort Force 4, which corresponds to approximately 17 mph or 13 knots. At this wind speed, loose paper blows about and small branches move. The tower structure itself can typically withstand higher forces (up to Beaufort Force 6), but working from the platform becomes unsafe at Force 4."
  }
];

const faqs = [
  {
    question: "What is the difference between the indoor and outdoor height-to-base ratio?",
    answer: "The indoor maximum is 3.5:1 and the outdoor maximum is 3:1. The outdoor limit is lower because the tower is exposed to wind loading, which increases the overturning force. A tower that is safely within limits indoors may exceed the safe ratio outdoors. Always check which ratio applies to your situation before assembly."
  },
  {
    question: "Can I use sandbags as ballast for a mobile tower?",
    answer: "No. Only purpose-made, approved ballast should be used. Loose materials such as sandbags, bricks, blocks, or water containers are not acceptable because they can shift, be removed by others, or provide inconsistent weight. Approved ballast systems are designed to attach securely to the tower and provide a known, reliable weight."
  },
  {
    question: "How do I measure wind speed on site?",
    answer: "The most reliable method is to use a hand-held anemometer, which gives a direct reading in mph, km/h, or knots. If an anemometer is not available, use the Beaufort Scale as a guide: at Force 4 (cease work), you will see dust and loose paper raised, small branches moved, and flags extended. However, an anemometer is strongly recommended for any regular tower work."
  },
  {
    question: "Do sheet materials on the platform affect the tower's stability?",
    answer: "Yes, significantly. Sheet materials such as plywood, plastic sheeting, or signage act as sails and dramatically increase the wind loading on the tower. If sheet materials must be carried on the platform, the maximum tower height should be reduced, stabilisers should be fitted, and work should cease at lower wind speeds. Many manufacturers provide specific guidance for towers with sheeted loads."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A tower overturns when which of the following occurs?",
    options: [
      "The tower is too heavy",
      "The centre of gravity moves outside the base area",
      "The castors are unlocked",
      "The tower is painted incorrectly"
    ],
    correctAnswer: 1,
    explanation: "A tower overturns when the centre of gravity moves outside the base area. This can be caused by wind loading, operatives reaching sideways, pushing or pulling from the platform, uneven loading, or impact from vehicles or equipment."
  },
  {
    id: 2,
    question: "What is the maximum height-to-base ratio for a mobile tower used INDOORS?",
    options: [
      "2.5:1",
      "3:1",
      "3.5:1",
      "4:1"
    ],
    correctAnswer: 2,
    explanation: "The indoor maximum height-to-base ratio is 3.5:1. For example, a double-width tower with a 1.35m minimum base dimension can reach a maximum platform height of 4.725m indoors without stabilisers."
  },
  {
    id: 3,
    question: "A double-width tower has a minimum base dimension of 1.35m. What is the maximum freestanding platform height OUTDOORS?",
    options: [
      "2.70m",
      "4.05m",
      "4.725m",
      "6.75m"
    ],
    correctAnswer: 1,
    explanation: "Outdoor ratio is 3:1. Maximum height = base dimension x 3 = 1.35m x 3 = 4.05m. This is the maximum platform height without stabilisers or outriggers."
  },
  {
    id: 4,
    question: "What must outriggers rest on to be effective?",
    options: [
      "Any surface, including grass",
      "Firm ground or sole boards, positioned equally on all sides",
      "Only concrete surfaces",
      "They can be suspended in the air"
    ],
    correctAnswer: 1,
    explanation: "Outriggers must rest on firm ground or sole boards and be positioned equally on all sides of the tower. If the ground is soft, sole boards spread the load. Unequal positioning reduces their effectiveness and can create an imbalanced tower."
  },
  {
    id: 5,
    question: "At what Beaufort Force should work CEASE on a mobile tower?",
    options: [
      "Force 2",
      "Force 3",
      "Force 4",
      "Force 6"
    ],
    correctAnswer: 2,
    explanation: "Work should cease at Beaufort Force 4 (approximately 17 mph / 13 knots). At this wind speed, conditions on the platform become unsafe for working. The tower structure itself may withstand up to Force 6, but the people on it cannot work safely."
  },
  {
    id: 6,
    question: "Why does using sheet materials on the platform reduce the safe tower height?",
    options: [
      "Sheet materials are too heavy for the platform",
      "Sheet materials act as sails and dramatically increase wind loading",
      "Sheet materials block the trapdoor",
      "Sheet materials scratch the platform surface"
    ],
    correctAnswer: 1,
    explanation: "Sheet materials such as plywood, plastic sheeting, or signage present a large flat surface to the wind, acting as a sail. This massively increases the overturning force from wind, requiring either a lower tower height, additional stabilisers, or both."
  },
  {
    id: 7,
    question: "What type of ballast is acceptable for stabilising a mobile tower?",
    options: [
      "Sandbags",
      "Loose bricks or blocks",
      "Purpose-made, approved ballast systems",
      "Water containers"
    ],
    correctAnswer: 2,
    explanation: "Only purpose-made, approved ballast systems should be used. These are designed to attach securely to the tower and provide a known, reliable weight. Loose materials such as sandbags, bricks, or water containers can shift, be removed, or provide inconsistent ballast."
  },
  {
    id: 8,
    question: "A single-width tower (0.85m base) is being used indoors. What is the maximum freestanding platform height?",
    options: [
      "2.55m",
      "2.975m",
      "3.40m",
      "4.25m"
    ],
    correctAnswer: 1,
    explanation: "Indoor ratio is 3.5:1. Maximum height = base dimension x 3.5 = 0.85m x 3.5 = 2.975m. Single-width towers reach their maximum freestanding height quickly due to the narrow base, which is why stabilisers are often required."
  }
];

export default function PasmaModule3Section4() {
  useSEO({
    title: "Stability Principles | PASMA Module 3.4",
    description: "Centre of gravity, height-to-base ratios, stabilisers and outriggers, ballast requirements, wind loading limits, and worked stability calculations for mobile towers.",
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../pasma-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-elec-yellow/20 to-amber-500/20 border border-elec-yellow/30 mb-4">
            <Scale className="h-7 w-7 text-elec-yellow" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/20 mb-3 mx-auto">
            <span className="text-elec-yellow text-xs font-semibold">MODULE 3 &middot; SECTION 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Stability Principles
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Understanding what keeps a tower upright &mdash; centre of gravity, height-to-base ratios, stabilisers, wind loading, and how to calculate safe working heights
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Indoor ratio:</strong> Max 3.5:1 (height to narrowest base)</li>
              <li><strong>Outdoor ratio:</strong> Max 3:1 (lower due to wind)</li>
              <li><strong>Cease work:</strong> Beaufort Force 4 (17 mph / 13 knots)</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Calculate:</strong> Platform height &divide; narrowest base = ratio</li>
              <li><strong>Stabilisers:</strong> Required when near maximum height or windy</li>
              <li><strong>Monitor:</strong> Wind speed with anemometer throughout the day</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain how a tower overturns and what moves the centre of gravity",
              "Calculate height-to-base ratios for indoor and outdoor towers",
              "Determine when stabilisers or outriggers are required",
              "Describe outrigger positioning and ballast requirements",
              "State the wind speed limits for working and structural safety",
              "Apply stability principles to real-world tower configurations"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Centre of Gravity & Overturning */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Centre of Gravity &amp; Overturning
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Every object has a centre of gravity &mdash; the single point where all its weight effectively acts. For a tower standing on level ground, the centre of gravity must remain above the base area (the footprint defined by the four castor or base plate positions). If the centre of gravity moves outside this base area, the tower will overturn.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-3">What Moves the Centre of Gravity?</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Wind loading:</strong> Wind pushes against the tower structure and anything on the platform, creating a horizontal force that shifts the effective centre of gravity sideways</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Reaching or leaning:</strong> An operative reaching out from the platform shifts their body weight to one side, moving the combined centre of gravity toward the edge</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Pushing or pulling:</strong> Using force from the platform (e.g. pulling cables, pushing fittings into place) creates a reaction force that can tip the tower</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Uneven loading:</strong> Stacking materials on one side of the platform shifts the centre of gravity off-centre</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Impact:</strong> A vehicle or moving load striking the base of the tower can suddenly displace the centre of gravity</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Overturning in Simple Terms</p>
                <p className="text-sm text-white/80">
                  Imagine a vertical line dropping straight down from the centre of gravity. As long as this line falls within the tower's base area, the tower is stable. The moment it falls outside the base area &mdash; whether from wind, reaching, or impact &mdash; the tower begins to tip. Once tipping starts, gravity accelerates it. The higher the tower, the smaller the force needed to push the centre of gravity past the tipping point.
                </p>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">The Height Factor</p>
                </div>
                <p className="text-sm text-white/80">
                  The taller a tower is relative to its base, the less force is needed to overturn it. A small push at the top of a 6-metre tower creates a much larger overturning moment than the same push at the top of a 3-metre tower. This is why height-to-base ratios are the primary tool for ensuring stability.
                </p>
              </div>

              <p>
                Multiple factors often combine to create an overturning risk. For example, an operative leaning to one side while a gust of wind hits the tower from the opposite direction creates two simultaneous overturning forces. Adding heavy materials stored on one side of the platform creates a third factor. Individually, each force might be manageable &mdash; together, they can exceed the tower's stability margin. This is why conservative height-to-base ratios and stabilisers provide essential safety margins.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">The Overturning Moment</p>
                <p className="text-sm text-white/80">
                  In engineering terms, the overturning moment equals the applied force multiplied by the height at which it acts (the lever arm). A 50kg force at 6 metres creates an overturning moment of 300 kg&middot;m, while the same force at 3 metres creates only 150 kg&middot;m. This is why height is the dominant factor in tower stability &mdash; every additional metre of height significantly increases the overturning moment from any given force.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Height-to-Base Ratios */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Height-to-Base Ratios
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The height-to-base ratio is the simplest and most important stability check for any mobile tower. It compares the platform height to the narrowest base dimension. Two different maximum ratios apply depending on whether the tower is used indoors or outdoors.
              </p>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-blue-400 mb-2">Indoor Maximum: 3.5:1</p>
                  <p className="text-sm text-white/80 mb-2">
                    For towers used indoors where there is no wind exposure. The platform height must not exceed 3.5 times the narrowest base dimension.
                  </p>
                  <div className="bg-blue-500/5 border border-blue-500/20 p-3 rounded-lg mt-2">
                    <p className="text-xs text-blue-300 font-mono">
                      Max height = base width &times; 3.5<br />
                      Example: 1.35m &times; 3.5 = 4.725m
                    </p>
                  </div>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-green-400 mb-2">Outdoor Maximum: 3:1</p>
                  <p className="text-sm text-white/80 mb-2">
                    For towers used outdoors where wind loading applies. The more restrictive ratio accounts for the additional overturning force from wind.
                  </p>
                  <div className="bg-green-500/5 border border-green-500/20 p-3 rounded-lg mt-2">
                    <p className="text-xs text-green-300 font-mono">
                      Max height = base width &times; 3<br />
                      Example: 1.35m &times; 3 = 4.05m
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Calculator className="h-5 w-5 text-elec-yellow" />
                  <p className="text-sm font-medium text-elec-yellow">How to Calculate</p>
                </div>
                <div className="space-y-2 text-sm text-white/80">
                  <p><strong className="text-white">Step 1:</strong> Measure the narrowest base dimension (the shortest distance between the outer edges of opposite castors or base plates).</p>
                  <p><strong className="text-white">Step 2:</strong> Determine whether the tower is indoor or outdoor.</p>
                  <p><strong className="text-white">Step 3:</strong> Multiply the base dimension by the applicable ratio (3.5 for indoor, 3 for outdoor).</p>
                  <p><strong className="text-white">Step 4:</strong> The result is the maximum freestanding platform height without stabilisers.</p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Common Tower Base Dimensions</p>
                <div className="space-y-1 text-sm text-white/80">
                  <p className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Single-width:</strong> Approximately 0.85m &rarr; Indoor max 2.975m, Outdoor max 2.55m</span></p>
                  <p className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Double-width:</strong> Approximately 1.35m &rarr; Indoor max 4.725m, Outdoor max 4.05m</span></p>
                  <p className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Triple-width:</strong> Approximately 1.85m &rarr; Indoor max 6.475m, Outdoor max 5.55m</span></p>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Critical: Use the Narrowest Dimension</p>
                </div>
                <p className="text-sm text-white/80">
                  Always use the narrowest base dimension for the calculation, not the longest. A tower that is 2.5m long but only 1.35m wide must use 1.35m as the base dimension. The tower is most vulnerable to overturning across its narrow axis. This is a common source of error &mdash; using the long dimension gives a falsely reassuring result.
                </p>
              </div>

              <p>
                These figures are for freestanding towers without stabilisers. With outriggers or stabilisers fitted, the effective base is measured from the outermost points of the stabiliser feet, allowing the tower to be built significantly higher. The manufacturer's instruction manual provides the maximum heights achievable with different stabiliser configurations.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: When Stabilisers Are Required */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            When Stabilisers Are Required
          </h2>
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Stabilisers and outriggers effectively increase the base area of the tower, allowing it to be built higher while maintaining a safe height-to-base ratio. They are required whenever the tower needs to exceed its freestanding height limit or when additional stability is needed for other reasons.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-3">Stabilisers Are Required When:</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Approaching maximum freestanding height:</strong> When the calculated ratio is near the 3:1 or 3.5:1 limit, stabilisers provide an additional margin of safety</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Windy conditions:</strong> Even within the freestanding limit, gusty or sustained wind conditions may require stabilisers to resist the additional overturning force</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Uneven loading anticipated:</strong> If materials or equipment on the platform will create an off-centre load, stabilisers help resist the resulting tipping force</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Manufacturer specifies:</strong> Some tower configurations require stabilisers regardless of the calculated ratio &mdash; always follow the manufacturer's instruction manual</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Sheet materials on platform:</strong> The increased wind loading from sheeted loads usually requires stabilisers even at lower heights</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Types of Stability Devices</p>
                <div className="space-y-2 text-sm text-white/80">
                  <p><strong className="text-white">Outriggers:</strong> Extend horizontally from the tower base to increase the effective base area. They widen the footprint without altering the tower structure itself.</p>
                  <p><strong className="text-white">Stabilisers:</strong> Diagonal braces that connect the tower to the ground at an angle, transferring overturning forces into ground reaction. May be adjustable in length.</p>
                  <p><strong className="text-white">Combination:</strong> Some systems use both outriggers and stabilisers together for maximum stability at the greatest heights.</p>
                </div>
              </div>

              <p>
                Never decide to "do without" stabilisers because they take extra time to set up or because they obstruct the surrounding area. If the stability calculation or manufacturer's instructions require them, they must be fitted. An unstabilised tower that exceeds its freestanding height limit can overturn with little warning, with potentially fatal consequences for anyone on or near the tower.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Indoor Considerations:</strong> Even indoors, where there is no wind loading, stabilisers may be required if the tower height exceeds the 3.5:1 freestanding ratio. Indoor environments can also present stability challenges such as raised access floors with limited load capacity, slippery polished floors, and building vibrations from nearby plant or machinery.
                </p>
              </div>

              <p>
                Do not confuse stabilisers with tie-in points. Stabilisers are freestanding devices that extend the base area at ground level. Tying a tower to a building structure is a separate consideration that requires structural assessment of the tie point and is typically used for fixed scaffold towers rather than mobile ones. Mobile towers should remain freestanding with appropriate stabilisers rather than being tied to structures, unless specifically designed and assessed for this purpose.
              </p>
            </div>
          </div>
        </section>

        {/* Section 04: Outrigger Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Outrigger Requirements
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Outriggers increase the effective base area of the tower by extending the footprint beyond the castor positions. When correctly positioned, they can dramatically increase the maximum permissible height. However, they must be set up correctly to be effective.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Anchor className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Outrigger Positioning Rules</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Equal on all sides:</strong> Outriggers must be fitted symmetrically. All four outriggers must extend the same distance from the tower base. Unequal positioning creates an imbalanced tower.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Firm ground or sole boards:</strong> The foot of each outrigger must rest on firm, load-bearing ground. On soft ground, sole boards must be used under each outrigger foot.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">In contact with the ground:</strong> Each outrigger must make positive contact with the ground or sole board. There must be no gap &mdash; adjust the outrigger length until firm contact is achieved.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Must not obstruct walkways:</strong> If outriggers extend into pedestrian or vehicle routes, physical barriers and signage must be provided to prevent people tripping over or vehicles striking the outriggers.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Locked in position:</strong> Outrigger clamps and locking mechanisms must be fully engaged. An outrigger that slides or rotates under load is ineffective.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Calculating the New Base:</strong> When outriggers are fitted, the effective base area is measured from the outermost points of the outrigger feet, not from the castors. This new, larger base dimension is used to calculate the height-to-base ratio. For example, if outriggers extend the effective base from 1.35m to 2.70m, the outdoor maximum height increases from 4.05m to 8.10m.
                </p>
              </div>

              <p>
                The outrigger length is not arbitrary &mdash; it must match the manufacturer's specification for the tower height and configuration. Extending outriggers further than specified provides no additional benefit if the tower structure itself is not designed for the increased height. Conversely, not extending them far enough reduces the effective base and may leave the tower under-stabilised.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Outrigger Impact on Site Layout</p>
                <p className="text-sm text-white/80">
                  Outriggers extend the tower's footprint significantly. A double-width tower with full outriggers can occupy an area several metres wider than the tower itself. This must be planned during the site survey. Ensure there is sufficient space for the outriggers and that they will not block emergency exits, fire routes, or essential access paths. Barriers should be placed around extended outriggers to prevent tripping hazards.
                </p>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Common Outrigger Errors</p>
                </div>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Fitting outriggers on only two sides instead of all four</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Failing to use sole boards on soft ground</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Leaving a gap between the outrigger foot and the ground</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Not locking the outrigger clamps fully</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Allowing the outriggers to be struck by passing vehicles</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Ballast & Kentledge */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Ballast &amp; Kentledge
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Ballast (also known as kentledge) adds weight to the base of the tower to resist overturning. It lowers the centre of gravity and increases the force needed to tip the tower. Ballast is sometimes used instead of, or in addition to, stabilisers and outriggers.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Ballast Requirements</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Purpose-made only:</strong> Use approved ballast systems designed for the specific tower. Never use loose bricks, blocks, sandbags, or water containers. These can shift, be removed, or provide inconsistent weight.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Known weight:</strong> Each ballast unit must have a marked, verified weight. The total ballast must meet or exceed the manufacturer's specification for the tower height and configuration.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Securely attached:</strong> Ballast must be fixed to the tower base so it cannot be dislodged by wind, impact, or vibration. It must not rely on gravity alone to stay in place.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Equal distribution:</strong> Distribute ballast equally around the base. Unequal ballast distribution can create its own stability problem.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Calculator className="h-5 w-5 text-elec-yellow" />
                  <p className="text-sm font-medium text-elec-yellow">Calculating Required Ballast</p>
                </div>
                <p className="text-sm text-white/80">
                  The amount of ballast required depends on the tower height, base dimensions, expected wind loading, and the number of operatives. Manufacturers provide ballast tables in their instruction manuals specifying the exact weight needed for each configuration. Never estimate &mdash; always refer to the manufacturer's data. As a general principle, the required ballast increases significantly with tower height.
                </p>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <TriangleAlert className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Never Use Improvised Ballast</p>
                </div>
                <p className="text-sm text-white/80">
                  Using sandbags, concrete blocks, or other loose materials as ballast is dangerous and non-compliant. These materials can be moved by others who do not understand their purpose, can shift during transport if the tower is mobile, and their weight may not be accurately known. Purpose-made ballast systems are the only acceptable option.
                </p>
              </div>

              <p>
                When ballast is used with a mobile tower (one that will be repositioned on its castors), the ballast must remain securely attached during movement. Check after repositioning that the ballast is still in place and the fixings have not loosened. The additional weight of the ballast also affects manual handling &mdash; more people may be required to push the tower safely.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Ballast vs Stabilisers</p>
                <p className="text-sm text-white/80">
                  Ballast and stabilisers serve different purposes and are sometimes used together. Stabilisers and outriggers increase the effective base area, while ballast adds weight to resist overturning. For very tall towers or towers in exposed locations, the manufacturer may specify both. Always refer to the manufacturer's configuration charts to determine the exact requirements for your specific tower height and conditions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Wind Loading & Weather Limits */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Wind Loading &amp; Weather Limits
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Wind is the greatest external threat to tower stability. Even a tower that is correctly assembled, within its height-to-base ratio, and fitted with stabilisers can be made unsafe by excessive wind. Understanding wind limits is essential for every tower user.
              </p>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Wind className="h-5 w-5 text-orange-400" />
                    <p className="text-sm font-medium text-orange-400">Cease Work: Beaufort Force 4</p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    Approximately 17 mph / 13 knots / 28 km/h
                  </p>
                  <p className="text-sm text-white/80">
                    <strong className="text-white">Visual signs:</strong> Dust and loose paper raised from the ground, small branches begin to move, flags extend from the pole. At this point, conditions on the platform are unsafe for work.
                  </p>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                    <p className="text-sm font-medium text-red-400">Structural Limit: Beaufort Force 6</p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    Approximately 28 mph / 24 knots / 45 km/h
                  </p>
                  <p className="text-sm text-white/80">
                    <strong className="text-white">Visual signs:</strong> Large branches in motion, whistling in wires, difficulty holding an umbrella. Above Force 6, the tower structure itself may be at risk of overturning or structural damage.
                  </p>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-3">Sheet Materials — The Sail Effect</p>
                <p className="text-sm text-white/80 mb-2">
                  Sheet materials on the platform &mdash; plywood boards, plastic sheeting, tarpaulins, signage &mdash; dramatically increase the wind loading on the tower. A 2.4m &times; 1.2m sheet of plywood on the platform effectively turns the tower into a sail.
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Reduce the maximum tower height when carrying sheet materials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Fit stabilisers even at lower heights</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Cease work at lower wind speeds (many manufacturers specify Force 3 for sheeted towers)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Remove sheet materials from the platform when the tower is not in use</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Monitoring Wind Speed</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Anemometer:</strong> A hand-held anemometer gives accurate, real-time wind speed readings. Strongly recommended for any regular tower work</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Weather forecasts:</strong> Check the forecast before the working day and at regular intervals. Be aware of approaching weather systems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Gusts vs sustained wind:</strong> Pay attention to gust speeds, not just average wind speed. A single powerful gust can overturn a tower even if the average speed is within limits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Local effects:</strong> Wind accelerates between buildings (funnelling), around corners, and at height. Platform-level wind speed may be significantly higher than ground-level</span>
                  </li>
                </ul>
              </div>

              <p>
                Wind conditions can change rapidly, particularly during spring and autumn months in the UK. A calm morning can become a blustery afternoon within hours. Assign a specific person to monitor wind conditions throughout the working day and empower them to halt work without delay when the limit is approached. Do not wait until conditions become obviously dangerous &mdash; by that point, descending from the tower safely may itself be hazardous.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Leaving Towers Erected Overnight:</strong> If a tower will remain erected outside overnight or over a weekend, consider the forecast wind speeds for the entire period. The tower's structural limit (typically Beaufort Force 6) must not be exceeded even when no one is working. If storm-force winds are forecast, the tower should be dismantled or tied to a permanent structure as a precaution. Consult the manufacturer's guidance for securing unattended towers.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">The Beaufort Scale &mdash; Key Levels for Tower Work</p>
                <div className="space-y-1 text-sm text-white/80">
                  <p className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Force 3 (8&ndash;12 mph):</strong> Leaves and small twigs in constant motion. Light flags extended. Safe to work but monitor conditions.</span></p>
                  <p className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Force 4 (13&ndash;17 mph):</strong> Raises dust and loose paper. Small branches move. <strong className="text-red-300">Cease work on tower.</strong></span></p>
                  <p className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Force 5 (18&ndash;24 mph):</strong> Small trees sway. Crested wavelets on inland waters. Do not work on or near tower.</span></p>
                  <p className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Force 6 (25&ndash;30 mph):</strong> Large branches in motion. Whistling in wires. <strong className="text-red-300">Tower structural limit &mdash; consider dismantling.</strong></span></p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Worked Stability Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Worked Stability Examples
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The best way to understand stability calculations is to work through real examples. These three scenarios cover the most common situations you will encounter on site.
              </p>

              {/* Example 1 */}
              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-blue-400 mb-3">Example 1: Indoor Double-Width Tower at 6m</p>
                <div className="space-y-2 text-sm text-white/80">
                  <p><strong className="text-white">Situation:</strong> You need a 6m platform height inside a warehouse. The tower is double-width with a base dimension of 1.35m. No wind exposure.</p>
                  <p><strong className="text-white">Calculation:</strong> Indoor ratio = 3.5:1. Maximum freestanding height = 1.35m &times; 3.5 = <strong className="text-blue-300">4.725m</strong>.</p>
                  <p><strong className="text-white">Result:</strong> 6m exceeds 4.725m. <strong className="text-red-300">Stabilisers required.</strong> With outriggers extending the effective base to (say) 2.70m, the new maximum = 2.70m &times; 3.5 = <strong className="text-green-300">9.45m</strong>. The 6m tower is now well within limits.</p>
                </div>
              </div>

              {/* Example 2 */}
              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-green-400 mb-3">Example 2: Outdoor Double-Width Tower at 4m with Tools</p>
                <div className="space-y-2 text-sm text-white/80">
                  <p><strong className="text-white">Situation:</strong> A 4m platform height outdoors. Double-width tower (1.35m base). Operative will use hand tools, no sheet materials. Moderate breeze forecast.</p>
                  <p><strong className="text-white">Calculation:</strong> Outdoor ratio = 3:1. Maximum freestanding height = 1.35m &times; 3 = <strong className="text-green-300">4.05m</strong>.</p>
                  <p><strong className="text-white">Result:</strong> 4m is within the 4.05m limit, but only just. <strong className="text-amber-300">Stabilisers strongly recommended</strong> given the minimal margin and the moderate breeze. Monitor wind speed continuously. If wind reaches Beaufort Force 4, cease work immediately.</p>
                </div>
              </div>

              {/* Example 3 */}
              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-purple-400 mb-3">Example 3: Single-Width Tower Near Maximum Height</p>
                <div className="space-y-2 text-sm text-white/80">
                  <p><strong className="text-white">Situation:</strong> A single-width tower (0.85m base) is needed to reach a 3.5m platform height indoors for cable tray installation.</p>
                  <p><strong className="text-white">Calculation:</strong> Indoor ratio = 3.5:1. Maximum freestanding height = 0.85m &times; 3.5 = <strong className="text-purple-300">2.975m</strong>.</p>
                  <p><strong className="text-white">Result:</strong> 3.5m exceeds 2.975m. <strong className="text-red-300">Stabilisers required.</strong> With outriggers extending the effective base to 1.70m, the new maximum = 1.70m &times; 3.5 = <strong className="text-green-300">5.95m</strong>. The 3.5m tower is now safely within limits. Note: single-width towers reach their limit quickly &mdash; outriggers are often needed even for modest heights.</p>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Calculator className="h-5 w-5 text-elec-yellow" />
                  <p className="text-sm font-medium text-elec-yellow">Quick Reference Calculation</p>
                </div>
                <div className="text-sm text-white/80 space-y-1">
                  <p><strong className="text-white">Check your ratio:</strong> Platform height &divide; narrowest base = your ratio</p>
                  <p>If the ratio is &le; 3.5 (indoor) or &le; 3 (outdoor): <strong className="text-green-300">Freestanding is acceptable</strong></p>
                  <p>If the ratio exceeds the limit: <strong className="text-red-300">Stabilisers or outriggers are required</strong></p>
                  <p>If close to the limit with wind expected: <strong className="text-amber-300">Fit stabilisers as a precaution</strong></p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Practical Tips for Stability Calculations</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Always round down the maximum height, never up &mdash; err on the side of caution</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Consider what happens if the wind increases during the work &mdash; build in a margin</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>If the tower is even slightly above the freestanding limit, fit stabilisers &mdash; do not attempt to "manage" the shortfall</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Document your calculation in the method statement so it can be verified by others</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>When in doubt, fit stabilisers &mdash; there is no penalty for being too safe</span>
                  </li>
                </ul>
              </div>

              <p>
                These worked examples demonstrate the importance of always checking the stability calculation before deciding on the tower configuration. A tower that appears manageable at first glance may exceed the safe ratio when the numbers are checked. Make this calculation a standard part of every pre-assembly planning process.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">On-Site Stability Checklist</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>What is the required platform height?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>What is the narrowest base dimension of the chosen tower?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Is the tower indoors (3.5:1) or outdoors (3:1)?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Does the calculated ratio exceed the maximum?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>If yes &mdash; what stabiliser configuration is specified by the manufacturer?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Are there any additional factors (wind, sheet materials, off-centre loading)?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Is the calculation recorded in the method statement?</span>
                  </li>
                </ul>
              </div>

              <p>
                If you are unsure about any stability calculation, seek advice from a more experienced colleague, the tower manufacturer's technical helpline, or a PASMA-accredited training provider. Never guess or assume a tower is stable without checking the numbers. The consequences of getting it wrong can be catastrophic.
              </p>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Real-World Reminder</p>
                </div>
                <p className="text-sm text-white/80">
                  The HSE investigates all serious tower incidents. One of the most common findings is that the tower was erected beyond its safe freestanding height without stabilisers. This is entirely preventable with a simple calculation and the correct equipment. Making this check second nature is one of the most important habits any tower user can develop.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/80 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz
          title="Section 4 Knowledge Check"
          questions={quizQuestions}
        />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../pasma-module-3-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: AGR Method
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../pasma-module-4">
              Next: Module 4 &rarr;
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}