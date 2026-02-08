import { ArrowLeft, ShieldCheck, CheckCircle, AlertTriangle, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quizQuestions = [
  {
    id: 1,
    question: "What is the maximum safe working load (SWL) per platform on a standard mobile access tower?",
    options: [
      "150kg",
      "200kg",
      "275kg",
      "500kg"
    ],
    correctAnswer: 2,
    explanation: "The maximum safe working load per platform is 275kg. This includes the combined weight of all personnel, tools, and materials on that platform. Exceeding this limit risks structural failure."
  },
  {
    id: 2,
    question: "What is the maximum total load typically permitted on a mobile access tower (all platforms combined)?",
    options: [
      "500kg",
      "750kg",
      "950kg",
      "1200kg"
    ],
    correctAnswer: 2,
    explanation: "The maximum total load on the tower — combining all platforms — is typically 950kg. This is the total structural capacity. Individual platform limits and the overall tower limit must both be respected."
  },
  {
    id: 3,
    question: "At what Beaufort scale force should all work on mobile access towers cease?",
    options: [
      "Beaufort 3 (12 mph)",
      "Beaufort 4 (17 mph)",
      "Beaufort 5 (24 mph)",
      "Beaufort 6 (31 mph)"
    ],
    correctAnswer: 1,
    explanation: "Work should cease at Beaufort Force 4 (approximately 17 mph / 28 km/h). At this wind speed, loose papers blow around and small branches move. The tower itself may be rated to withstand higher forces, but working from it becomes unsafe."
  },
  {
    id: 4,
    question: "What maximum lateral (horizontal) force is a mobile access tower typically designed to withstand at platform level?",
    options: [
      "10kg",
      "20kg",
      "50kg",
      "100kg"
    ],
    correctAnswer: 1,
    explanation: "Mobile access towers are typically designed to withstand a lateral force of 20kg (approximately 200N) at platform level. This represents the force from leaning, pushing against walls, or wind. Exceeding this can cause the tower to overturn."
  },
  {
    id: 5,
    question: "Why is the old 3:1 height-to-base ratio rule now considered obsolete?",
    options: [
      "It was too conservative and limited tower heights unnecessarily",
      "It does not account for different tower systems, configurations, or conditions",
      "It only applied to wooden scaffold towers",
      "It was never an official guideline"
    ],
    correctAnswer: 1,
    explanation: "The 3:1 rule was a simplified guideline that did not account for differences between tower systems, single vs double-width, indoor vs outdoor use, or stabiliser configurations. Manufacturer-specific instructions now take precedence, as they are based on actual structural calculations for each system."
  },
  {
    id: 6,
    question: "What is the legal status of manufacturer instructions for mobile access towers?",
    options: [
      "They are advisory guidance only",
      "They are recommendations that can be varied on site",
      "They are legally binding and must be followed",
      "They only apply during the first year of ownership"
    ],
    correctAnswer: 2,
    explanation: "Manufacturer instructions are legally binding under the Work at Height Regulations 2005 and the Provision and Use of Work Equipment Regulations 1998 (PUWER). Failure to follow them is a criminal offence and can result in prosecution."
  },
  {
    id: 7,
    question: "Wind speed is measured as Beaufort 6 at the site. What should you do with the tower?",
    options: [
      "Continue working but reduce the number of people on the platform",
      "Tie the tower to a permanent structure and continue",
      "Work should have already ceased at Beaufort 4 — descend immediately and secure the tower",
      "Move the tower indoors"
    ],
    correctAnswer: 2,
    explanation: "Work should have ceased at Beaufort 4 (17 mph). At Beaufort 6 (27 mph), the tower should already be unoccupied and secured. Towers are typically rated to withstand Beaufort 6 in their unoccupied state, but must not be used for work above Beaufort 4."
  },
  {
    id: 8,
    question: "An operative weighing 90kg is on the platform with a toolbox weighing 15kg and materials weighing 180kg. Is the platform overloaded?",
    options: [
      "No — total is 285kg which is within the 950kg tower limit",
      "Yes — total is 285kg which exceeds the 275kg per-platform limit",
      "No — the operative's weight does not count towards the platform load",
      "It depends on the tower height"
    ],
    correctAnswer: 1,
    explanation: "The total platform load is 90 + 15 + 180 = 285kg, which exceeds the 275kg per-platform limit by 10kg. The platform is overloaded. All personnel weight, tools, and materials must be included in the calculation. The tower total limit of 950kg is a separate check."
  }
];

const quickCheckQuestions = [
  {
    id: "platform-load-calc",
    question: "Two electricians (80kg and 95kg) are on the platform with 60kg of cable drums. Is the platform load within limits?",
    options: [
      "Yes — 235kg is within the 275kg limit",
      "No — 235kg exceeds the limit",
      "Yes — only materials count, not people",
      "Cannot determine without knowing the tower height"
    ],
    correctIndex: 0,
    explanation: "Total platform load = 80 + 95 + 60 = 235kg. This is within the 275kg per-platform limit. However, always check the manufacturer's instructions for the specific tower system, as some may have different limits."
  },
  {
    id: "wind-assessment",
    question: "You are working on an outdoor tower and notice leaves and small twigs are constantly moving, and loose paper blows off the platform. What should you do?",
    options: [
      "Nothing — this is normal outdoor conditions",
      "Secure loose items and continue working",
      "Cease work and descend — these are signs of Beaufort 4 or above",
      "Move to the leeward side of the tower"
    ],
    correctIndex: 2,
    explanation: "Leaves and small twigs in constant motion, and loose paper blowing around, are indicators of Beaufort Force 4 (moderate breeze, 17-24 mph). This is the threshold at which all tower work must cease. Descend, secure the tower, and do not resume until wind conditions improve."
  },
  {
    id: "manufacturer-instructions",
    question: "A colleague tells you the 3:1 rule means you can build a 9m tower on a 3m base outdoors without stabilisers. Is this correct?",
    options: [
      "Yes — the 3:1 rule is a recognised industry standard",
      "No — the 3:1 rule is obsolete; you must follow the manufacturer's instructions for the specific tower system",
      "Yes — but only for double-width towers",
      "No — the correct ratio is 4:1"
    ],
    correctIndex: 1,
    explanation: "The 3:1 rule is obsolete and must not be used. Every tower system has different maximum heights for different configurations (single/double, indoor/outdoor, with/without stabilisers). Only the manufacturer's instruction manual provides the correct limits for the specific system you are using."
  }
];

const faqs = [
  {
    question: "How do I measure wind speed on site?",
    answer: "You can use a handheld anemometer (wind speed meter), which are available from most tool suppliers for under 20 pounds. Alternatively, learn to estimate wind speed using the Beaufort scale indicators: at Force 4, leaves and small twigs are in constant motion, loose paper blows around, and dust and dry leaves are raised. If in doubt, it is always safer to cease work."
  },
  {
    question: "Does the 275kg platform limit include my body weight?",
    answer: "Yes. The 275kg per-platform safe working load includes everything on the platform: all personnel, tools, equipment, and materials. A common mistake is to forget to include body weight. For example, an 85kg person has already used 31 percent of the platform capacity before any tools or materials are added."
  },
  {
    question: "Can I exceed the manufacturer's maximum height if I add extra stabilisers?",
    answer: "No. The maximum heights stated in the manufacturer's instructions are absolute limits that must not be exceeded, regardless of any additional measures you might take. Adding extra stabilisers beyond those specified does not increase the permissible height. The height limits are based on the structural capacity of the tower components, not just stability."
  },
  {
    question: "What happens if I am caught not following manufacturer instructions?",
    answer: "Failure to follow manufacturer instructions is a breach of the Work at Height Regulations 2005, PUWER 1998, and potentially HSWA 1974. Consequences can include enforcement notices, prohibition notices (stopping work immediately), unlimited fines, and even imprisonment for individuals. Insurance cover may also be voided."
  }
];

const IpafModule2Section3 = () => {
  useSEO({
    title: "Stability & Safe Working Loads | IPAF Module 2 Section 3",
    description: "Learn about mobile access tower stability, 275kg platform limits, 950kg total load, wind speed limits, lateral forces, and why manufacturer instructions are legally binding.",
  });

  return (
    <div className="bg-[#1a1a1a] overflow-x-hidden">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="min-h-[44px] text-white hover:text-white active:text-white p-0 -ml-1 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../ipaf-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Centered Header */}
        <div className="mb-12 text-center">
          <ShieldCheck className="h-10 w-10 text-elec-yellow mx-auto mb-4" />
          <span className="inline-block bg-elec-yellow text-black px-3 py-1 rounded-full text-sm font-semibold mb-4">
            Module 2 — Section 3
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Stability & Safe Working Loads
          </h1>
          <p className="text-white/80 max-w-xl mx-auto">
            Understanding the forces acting on a tower and the load limits that keep you safe
          </p>
        </div>

        {/* Section 01: Introduction */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Introduction
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-2 border-l-elec-yellow/50 border border-elec-yellow/30">
              <p className="font-semibold text-base text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="text-base text-white space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>275kg:</strong> Maximum per-platform safe working load.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>950kg:</strong> Maximum total tower load (all platforms).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>20kg:</strong> Maximum lateral force at platform level.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>Beaufort 4:</strong> Cease work (17 mph / 28 km/h winds).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>Beaufort 6:</strong> Tower design wind rating (27 mph / 44 km/h).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>3:1 ratio:</strong> Obsolete — use manufacturer's data instead.</span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-2 border-l-elec-yellow/50 border border-elec-yellow/30">
              <p className="font-semibold text-base text-elec-yellow mb-2">On Site</p>
              <ul className="text-base text-white space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>Calculate:</strong> Add up all platform loads before climbing.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>Monitor:</strong> Check wind conditions regularly throughout the day.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>Follow:</strong> Manufacturer instructions are the law — no exceptions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>Record:</strong> Document load assessments in your risk assessment.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 02: Learning Outcomes */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Learning Outcomes
          </h2>
          <p className="text-white mb-4">By the end of this section, you will be able to:</p>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>State the maximum per-platform safe working load and total tower load</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Explain the significance of the 20kg lateral force limit</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Identify the Beaufort scale thresholds for ceasing work and tower design ratings</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Explain why the old 3:1 height-to-base ratio is obsolete</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Describe the legal status of manufacturer instructions</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Calculate platform loads including personnel, tools, and materials</span>
            </li>
          </ul>
        </section>

        {/* Section 03: Safe Working Loads */}
        <section className="mb-10">
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Safe Working Loads (SWL)
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Every mobile access tower has defined load limits that must never be exceeded. These limits are
                calculated by the manufacturer based on the structural capacity of the tower components and are
                stated in the instruction manual. There are two key limits you must know:
              </p>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white/5 border border-elec-yellow/30 p-4 rounded-lg text-center">
                  <div className="text-4xl font-bold text-elec-yellow mb-2">275kg</div>
                  <div className="text-sm text-white font-semibold mb-2">Per Platform</div>
                  <p className="text-white/70 text-xs">
                    Maximum load on any single platform — includes personnel, tools, equipment, and materials
                  </p>
                </div>
                <div className="bg-white/5 border border-elec-yellow/30 p-4 rounded-lg text-center">
                  <div className="text-4xl font-bold text-elec-yellow mb-2">950kg</div>
                  <div className="text-sm text-white font-semibold mb-2">Total Tower</div>
                  <p className="text-white/70 text-xs">
                    Maximum combined load across all platforms — the total the tower structure can safely support
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-2">What Counts Towards the Load?</h3>
                <p className="text-white/80 text-sm mb-3">
                  Everything on the platform counts towards the safe working load. This includes:
                </p>
                <ul className="text-white space-y-1 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong>Personnel:</strong> Full body weight of every person on the platform</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong>Tools:</strong> Hand tools, power tools, drills, testers, etc.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong>Materials:</strong> Cable drums, containment, fittings, fixings, luminaires</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong>Equipment:</strong> Tool bags, tool boxes, buckets, trays</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong>PPE:</strong> Harness, tool belt, hard hat (smaller but still counts)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-2">Practical Load Calculation Example</h3>
                <div className="space-y-2 text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-white/80">Electrician 1:</span>
                    <span className="text-white font-mono">85kg</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-white/80">Electrician 2:</span>
                    <span className="text-white font-mono">92kg</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-white/80">Cable drum:</span>
                    <span className="text-white font-mono">35kg</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-white/80">Tool bag:</span>
                    <span className="text-white font-mono">12kg</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-white/80">Box of luminaires:</span>
                    <span className="text-white font-mono">28kg</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 border-t border-white/10 pt-2 mt-2">
                    <span className="text-white font-semibold">Total platform load:</span>
                    <span className="text-elec-yellow font-mono font-bold">252kg</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-white/80">Platform limit:</span>
                    <span className="text-green-400 font-mono">275kg</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-white/80">Remaining capacity:</span>
                    <span className="text-green-400 font-mono">23kg</span>
                  </div>
                </div>
                <p className="text-white/60 text-xs mt-3">
                  This platform load is within limits but leaves only 23kg of spare capacity. Adding another cable
                  drum would exceed the limit. Plan your materials carefully.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Lateral Forces */}
        <section className="mb-10">
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400/80 text-sm font-normal">04</span>
              Lateral Forces — The 20kg Limit
            </h2>
            <div className="space-y-4 text-white">
              <p>
                A mobile access tower is designed primarily to carry vertical loads (the weight of people and
                materials pressing downward). It has far less capacity to resist horizontal (lateral) forces.
                The typical lateral force limit at platform level is just <strong>20kg (approximately 200N)</strong>.
              </p>

              <div className="bg-white/5 border border-blue-400/30 p-4 rounded-lg">
                <h3 className="text-blue-300 font-medium mb-2">What Creates Lateral Forces?</h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div><strong>Leaning out:</strong> Reaching beyond the edge of the platform creates a horizontal force on the guardrail and structure</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div><strong>Pushing against walls:</strong> Using the tower as a brace whilst drilling or fixing creates a reaction force</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div><strong>Wind loading:</strong> Wind pressure on the tower structure, sheeting, or personnel creates lateral forces</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <div><strong>Pulling cables:</strong> Drawing cables through containment creates a reaction force on the tower</div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-orange-300">20kg Is Less Than You Think</h3>
                </div>
                <p className="text-white/80 text-sm">
                  20kg of lateral force is roughly equivalent to leaning firmly against a wall with one hand. This is
                  not a lot of force. It means you must always work within the footprint of the platform and avoid
                  overreaching, pushing, or pulling. If the task requires significant horizontal force, you need to
                  reposition the tower rather than reach from where you are.
                </p>
              </div>

              <p>
                The 20kg lateral force limit is a critical design parameter. Exceeding it can cause the tower to
                overturn, especially at greater heights where the overturning moment is amplified. A small horizontal
                force at the top of a 10m tower creates a very large overturning moment at the base.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 05: Wind Limits */}
        <section className="mb-10">
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-green-400/80 text-sm font-normal">05</span>
              Wind Limits & the Beaufort Scale
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Wind is the most significant environmental factor affecting tower stability. It creates lateral
                forces on the tower structure and on the people working on it. There are two critical wind speed
                thresholds you must know:
              </p>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white/5 border border-orange-400/30 p-4 rounded-lg">
                  <div className="text-center mb-3">
                    <div className="text-3xl font-bold text-orange-400">Beaufort 4</div>
                    <div className="text-sm text-white font-semibold">17 mph / 28 km/h</div>
                  </div>
                  <p className="text-white/80 text-sm mb-2 font-semibold text-orange-300">CEASE ALL WORK</p>
                  <p className="text-white/80 text-sm">
                    At this wind speed, work from the tower must stop. Personnel must descend and the tower should
                    be secured. Indicators: small branches move, dust and paper blow around.
                  </p>
                </div>
                <div className="bg-white/5 border border-red-400/30 p-4 rounded-lg">
                  <div className="text-center mb-3">
                    <div className="text-3xl font-bold text-red-400">Beaufort 6</div>
                    <div className="text-sm text-white font-semibold">27 mph / 44 km/h</div>
                  </div>
                  <p className="text-white/80 text-sm mb-2 font-semibold text-red-300">TOWER DESIGN LIMIT</p>
                  <p className="text-white/80 text-sm">
                    Towers are typically designed to withstand Beaufort 6 when unoccupied. Above this, the tower
                    may need to be lowered or dismantled. Indicators: large branches move, telegraph wires whistle.
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-2">Beaufort Scale Quick Reference</h3>
                <div className="space-y-2 text-sm">
                  <div className="grid grid-cols-12 gap-2 items-center">
                    <span className="col-span-2 text-white font-semibold">Force 0-2</span>
                    <span className="col-span-3 text-white/80">0-7 mph</span>
                    <span className="col-span-7 text-green-400">Calm to light breeze — safe to work</span>
                  </div>
                  <div className="grid grid-cols-12 gap-2 items-center">
                    <span className="col-span-2 text-white font-semibold">Force 3</span>
                    <span className="col-span-3 text-white/80">8-12 mph</span>
                    <span className="col-span-7 text-green-400">Gentle breeze — generally safe, monitor conditions</span>
                  </div>
                  <div className="grid grid-cols-12 gap-2 items-center">
                    <span className="col-span-2 text-white font-semibold">Force 4</span>
                    <span className="col-span-3 text-white/80">13-17 mph</span>
                    <span className="col-span-7 text-orange-400 font-semibold">Moderate breeze — CEASE WORK</span>
                  </div>
                  <div className="grid grid-cols-12 gap-2 items-center">
                    <span className="col-span-2 text-white font-semibold">Force 5</span>
                    <span className="col-span-3 text-white/80">18-24 mph</span>
                    <span className="col-span-7 text-orange-400">Fresh breeze — tower unoccupied, monitor closely</span>
                  </div>
                  <div className="grid grid-cols-12 gap-2 items-center">
                    <span className="col-span-2 text-white font-semibold">Force 6</span>
                    <span className="col-span-3 text-white/80">25-31 mph</span>
                    <span className="col-span-7 text-red-400 font-semibold">Strong breeze — TOWER DESIGN LIMIT</span>
                  </div>
                  <div className="grid grid-cols-12 gap-2 items-center">
                    <span className="col-span-2 text-white font-semibold">Force 7+</span>
                    <span className="col-span-3 text-white/80">32+ mph</span>
                    <span className="col-span-7 text-red-400">Near gale — consider lowering/dismantling tower</span>
                  </div>
                </div>
              </div>

              <p>
                Wind speed is not constant — it gusts. A sustained wind of Beaufort 3 can produce gusts at
                Beaufort 5 or higher. Always consider gust conditions, not just the sustained wind speed. If
                gusts are reaching Beaufort 4 or above, cease work even if the sustained wind is lower.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-elec-yellow">On-Site Wind Indicators</h3>
                <p className="text-white/80 text-sm mb-2">
                  If you do not have an anemometer, use these visual clues:
                </p>
                <ul className="text-white space-y-1 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong>Force 3:</strong> Leaves and small twigs in constant movement, light flags extended</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong>Force 4:</strong> Dust, loose paper, and small branches moving — <strong className="text-orange-300">STOP WORK</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong>Force 5:</strong> Small trees sway, wavelets form on inland waters</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong>Force 6:</strong> Large branches in motion, difficult to use umbrellas</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 06: The 3:1 Ratio Myth */}
        <section className="mb-10">
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-purple-400/80 text-sm font-normal">06</span>
              The 3:1 Ratio — Why It Is Obsolete
            </h2>
            <div className="space-y-4 text-white">
              <p>
                You may hear experienced workers refer to the "3:1 rule" — the idea that a tower can be built to
                a height three times the smallest base dimension. For example, a tower with a 2m x 1.35m base
                could supposedly be built to 4.05m (3 x 1.35m). <strong>This rule is obsolete and must not be used.</strong>
              </p>

              <div className="bg-white/5 border border-purple-400/30 p-4 rounded-lg">
                <h3 className="text-purple-300 font-medium mb-2">Why the 3:1 Rule Failed</h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div><strong>One size does not fit all:</strong> Different tower systems have different structural capacities. A 3:1 ratio might be safe for one system but dangerous for another.</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div><strong>Indoor vs outdoor:</strong> The rule made no distinction between indoor use (no wind) and outdoor use (wind loading is a major factor).</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div><strong>Stabiliser configurations:</strong> The rule did not account for the effect of stabilisers or outriggers on the effective base area.</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div><strong>Single vs double-width:</strong> Single-width towers have fundamentally different stability characteristics than double-width towers.</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div><strong>Not evidence-based:</strong> The ratio was a rule of thumb, not derived from engineering calculations for specific tower systems.</div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-orange-300">The Only Rule That Matters</h3>
                </div>
                <p className="text-white/80 text-sm">
                  The maximum permissible height for any tower configuration is stated in the <strong className="text-white">manufacturer's
                  instruction manual</strong>. This is the only authoritative source. It will specify different maximum
                  heights for single-width, double-width, indoor, outdoor, with stabilisers, and without stabilisers.
                  There is no universal ratio.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 07: Manufacturer Instructions */}
        <section className="mb-10">
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-red-400/80 text-sm font-normal">07</span>
              Manufacturer Instructions Are Legally Binding
            </h2>
            <div className="space-y-4 text-white">
              <p>
                This is one of the most important points in the entire IPAF course. Manufacturer instructions
                for mobile access towers are not optional guidance — they are <strong>legally binding requirements</strong>.
                Failure to follow them is a criminal offence under multiple pieces of legislation.
              </p>

              <div className="bg-white/5 border border-red-400/30 p-4 rounded-lg">
                <h3 className="text-red-300 font-medium mb-2">Legal Framework</h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong>Work at Height Regulations 2005, Regulation 8:</strong> Requires work equipment to be used in accordance with the manufacturer's instructions.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong>PUWER 1998, Regulation 5:</strong> Work equipment must be used only for operations and under conditions for which it is suitable, as specified by the manufacturer.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong>HSWA 1974, Section 2:</strong> Duty of care to employees — using equipment contrary to manufacturer instructions is a breach.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong>CDM 2015:</strong> Duty holders must ensure work equipment is used in accordance with instructions.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-2">What the Manufacturer Manual Specifies</h3>
                <ul className="text-white space-y-1 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Maximum heights for each configuration (single/double, indoor/outdoor)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>When stabilisers or outriggers are required</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Safe working loads per platform and total</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Assembly and dismantling sequence</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Component inspection criteria</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Permitted and prohibited uses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Storage and maintenance requirements</span>
                  </li>
                </ul>
              </div>

              <p>
                The manufacturer's instruction manual must be available on site whenever the tower is in use. If
                the manual is lost, contact the manufacturer for a replacement. Do not assemble or use the tower
                without it.
              </p>

              <div className="bg-white/5 border border-elec-yellow/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-elec-yellow">Key Point</h3>
                <p className="text-white/80 text-sm">
                  If a site supervisor, client, or colleague instructs you to build a tower higher than the
                  manufacturer's specified maximum, or to use it in a way that contradicts the instructions,
                  you have a <strong className="text-white">legal right and duty to refuse</strong>. Report the situation
                  to your employer and the HSE if necessary. No job is worth a criminal prosecution or a serious injury.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 08: Overturning Moments & Practical Stability */}
        <section className="mb-10">
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-cyan-400/80 text-sm font-normal">08</span>
              Overturning Moments & Practical Stability
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Understanding why towers overturn helps you appreciate the importance of the load and force
                limits. The physics are straightforward: any lateral force applied at height creates an
                <strong> overturning moment</strong> — a rotational force that tries to tip the tower over.
              </p>

              <div className="bg-white/5 border border-cyan-400/30 p-4 rounded-lg">
                <h3 className="text-cyan-300 font-medium mb-2">How Overturning Works</h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                    <div><strong>Overturning moment:</strong> Force x distance from the base. A 20kg force at 8m height creates an overturning moment of 160 kg-m — far greater than the same force at 2m (40 kg-m).</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                    <div><strong>Restoring moment:</strong> The tower's own weight and base width resist overturning. A wider base and heavier tower resist overturning better.</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                    <div><strong>Tipping point:</strong> When the overturning moment exceeds the restoring moment, the tower tips. This happens suddenly and without warning.</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                    <div><strong>Stabilisers help:</strong> Stabilisers increase the effective base area, dramatically increasing the restoring moment and resistance to overturning.</div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-elec-yellow font-medium mb-2">Practical Stability Checks on Site</h3>
                <p className="text-white/80 text-sm mb-3">
                  Before work begins each day — and after any modification to the tower — carry out these checks:
                </p>
                <ul className="text-white space-y-1 text-sm">
                  <li>1. <strong>Level:</strong> Check the tower is plumb (vertical) using a spirit level on the uprights</li>
                  <li>2. <strong>Castors locked:</strong> Confirm all four castor brakes are fully engaged</li>
                  <li>3. <strong>Stabilisers deployed:</strong> If fitted, verify all stabilisers are making firm ground contact</li>
                  <li>4. <strong>Ground condition:</strong> Check the ground has not become soft, wet, or undermined</li>
                  <li>5. <strong>No packing:</strong> Verify nobody has placed blocks, bricks, or timber under the base</li>
                  <li>6. <strong>Braces complete:</strong> All diagonal and horizontal braces are in position and secure</li>
                  <li>7. <strong>No sheeting:</strong> No tarpaulins, banners, or sheeting attached that would catch wind</li>
                  <li>8. <strong>Ties intact:</strong> If the tower is tied to a structure, verify the ties are secure</li>
                </ul>
              </div>

              <div className="bg-white/5 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-orange-300">Factors That Reduce Stability</h3>
                </div>
                <ul className="text-white/80 space-y-1 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Missing braces:</strong> Allows racking under lateral load</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Unlocked castors:</strong> Tower can roll and tip</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Overloading one side:</strong> Shifts the centre of gravity off-centre</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Sheeting or tarpaulins:</strong> Massively increases wind loading</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Climbing the outside:</strong> Shifts body weight beyond the base footprint</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Soft or uneven ground:</strong> Base sinks on one side, tilting the tower</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Adjacent vehicle traffic:</strong> Vibration and impact risk</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-elec-yellow/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-elec-yellow">Definition: Overturning Moment</h3>
                <p className="text-white/80 text-sm">
                  An <strong className="text-white">overturning moment</strong> is the tendency of a force to cause
                  rotation about a pivot point (the base edge of the tower). It equals the force multiplied by the
                  perpendicular distance from the pivot. Measured in Newton-metres (Nm) or kilogram-metres (kg-m).
                  The higher the point of application, the greater the overturning moment for the same force.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 09: Pocket Guide */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-elec-yellow" />
            <span className="text-elec-yellow/80 text-sm font-normal">09</span>
            Stability & Loads Pocket Guide
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-sm bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-white mb-2">Load Limits</h3>
                <ul className="space-y-1 text-white/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Per platform:</strong> 275kg max (people + tools + materials)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Total tower:</strong> 950kg max (all platforms combined)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Lateral force:</strong> 20kg max at platform level</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Wind Thresholds</h3>
                <ul className="space-y-1 text-white/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Beaufort 4 (17 mph):</strong> CEASE WORK</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Beaufort 6 (27 mph):</strong> Tower design limit (unoccupied)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Beaufort 7+:</strong> Consider lowering/dismantling</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-white mb-2">Critical Rules</h3>
                <ul className="space-y-1 text-white/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">3:1 rule:</strong> OBSOLETE — do not use</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Manufacturer manual:</strong> Legally binding</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Manual on site:</strong> Required whenever tower is in use</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Right to refuse:</strong> If instructions say no, say no</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Quick Load Check</h3>
                <ul className="space-y-1 text-white/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Average person: 80-95kg</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Tool bag: 10-20kg</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Cable drum (50m): 20-40kg</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Box of luminaires: 15-30kg</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Always add up BEFORE climbing</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">10</span>
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
                <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-white/80 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz Section */}
        <div className="mt-12">
          <Quiz
            title="Stability & Safe Working Loads Quiz"
            questions={quizQuestions}
          />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[44px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../ipaf-module-2-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Components & Terminology
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[44px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../ipaf-module-2-section-4">
              Next: Selecting the Right Tower
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default IpafModule2Section3;
