import { ArrowLeft, ClipboardList, CheckCircle, AlertTriangle, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Planning & Preparation – Assembly & Dismantling (IPAF Module 3 Section 1)";
const DESCRIPTION = "Site survey requirements, ground assessment, overhead hazards, exclusion zones, component selection, and PPE requirements for mobile access tower assembly.";

const quizQuestions = [
  {
    id: 1,
    question: "What is the minimum exclusion zone distance from overhead power lines when assembling a mobile tower?",
    options: [
      "5 metres",
      "9 metres",
      "15 metres",
      "20 metres"
    ],
    correctAnswer: 2,
    explanation: "A minimum exclusion zone of 15 metres must be maintained from overhead power lines during tower assembly and use. This accounts for the height of the tower plus potential conductor swing."
  },
  {
    id: 2,
    question: "Before assembling a tower, the first step in planning is to:",
    options: [
      "Gather all components from the van",
      "Conduct a site survey and risk assessment",
      "Read the instruction manual",
      "Put on your PPE"
    ],
    correctAnswer: 1,
    explanation: "A thorough site survey and risk assessment must always be conducted first. This identifies hazards, ground conditions, overhead obstructions, and access requirements before any work begins."
  },
  {
    id: 3,
    question: "What ground condition check is essential before positioning a mobile tower?",
    options: [
      "The ground is dry",
      "The ground is load-bearing, level, and firm",
      "The ground is made of concrete",
      "The ground has been recently laid"
    ],
    correctAnswer: 1,
    explanation: "The ground must be assessed for load-bearing capacity, levelness, and firmness. Soft, uneven, or sloping ground can cause instability and tower collapse."
  },
  {
    id: 4,
    question: "What is the maximum allowable gradient for a mobile tower base position?",
    options: [
      "Zero — must be perfectly level",
      "1 in 100 (0.6 degrees)",
      "1 in 50 (1.1 degrees)",
      "1 in 10 (5.7 degrees)"
    ],
    correctAnswer: 1,
    explanation: "The maximum allowable gradient is typically 1 in 100 (approximately 0.6 degrees). Greater slopes require levelling using adjustable legs or choosing an alternative location."
  },
  {
    id: 5,
    question: "Why must you only use components from the same manufacturer on a single tower?",
    options: [
      "For colour matching purposes",
      "Because mixing brands voids the manufacturer's safety certification",
      "To keep invoices simple",
      "It makes assembly faster"
    ],
    correctAnswer: 1,
    explanation: "Components from different manufacturers may not be compatible in dimension, locking mechanism, or load rating. Mixing brands voids the safety certification and creates unpredictable structural behaviour."
  },
  {
    id: 6,
    question: "Which PPE items are required during tower assembly?",
    options: [
      "Hard hat and safety boots only",
      "Hard hat, safety boots, gloves, and hi-vis vest",
      "Safety boots and gloves only",
      "Hi-vis vest only"
    ],
    correctAnswer: 1,
    explanation: "Full PPE for tower assembly includes a hard hat (EN 397), safety boots with toe protection, work gloves for handling frames, and a hi-vis vest for site visibility."
  },
  {
    id: 7,
    question: "What must you check regarding the instruction manual before beginning assembly?",
    options: [
      "That it is written in English",
      "That it is the correct manual for the specific tower model and configuration",
      "That it has colour illustrations",
      "That it has fewer than 20 pages"
    ],
    correctAnswer: 1,
    explanation: "The instruction manual must be specific to the tower model and configuration being assembled. Generic manuals may omit critical steps or give incorrect component sequences for your tower."
  },
  {
    id: 8,
    question: "An exclusion zone around the base during assembly should be established because:",
    options: [
      "It keeps the area tidy",
      "It prevents unauthorised persons from being struck by falling components",
      "It gives the assembler more room to work",
      "It is only required indoors"
    ],
    correctAnswer: 1,
    explanation: "An exclusion zone prevents unauthorised persons from entering the area where components could fall during assembly. Barriers, signage, or a banksman should be used to enforce this zone."
  }
];

const quickCheckQuestions = [
  {
    id: "site-survey-first",
    question: "You arrive on site and the tower components are already unloaded. What must you do before starting assembly?",
    options: [
      "Start assembling the base immediately",
      "Conduct a site survey and risk assessment",
      "Check your watch for break time",
      "Ask a colleague to hold the first frame"
    ],
    correctIndex: 1,
    explanation: "A site survey and risk assessment must always come first, regardless of whether components are ready. You need to verify ground conditions, overhead hazards, and access before positioning any components."
  },
  {
    id: "ground-assessment",
    question: "You notice the ground slopes slightly where the tower is to be positioned. What is the maximum allowable gradient?",
    options: [
      "Any slope is acceptable if castors are locked",
      "1 in 100 (approximately 0.6 degrees)",
      "1 in 10 (approximately 5.7 degrees)",
      "Slope does not matter if outriggers are used"
    ],
    correctIndex: 1,
    explanation: "The maximum allowable gradient is 1 in 100. If the ground exceeds this, you must either level it, use adjustable legs to compensate, or choose an alternative position."
  },
  {
    id: "overhead-hazards",
    question: "There are overhead power lines approximately 12 metres from your proposed tower position. Can you proceed?",
    options: [
      "Yes, 12 metres is far enough",
      "No — the 15 metre exclusion zone has not been met",
      "Yes, if you assemble quickly",
      "Yes, if you wear rubber gloves"
    ],
    correctIndex: 1,
    explanation: "A 15 metre exclusion zone is required from overhead power lines. At 12 metres you are within the danger zone and must choose an alternative position or contact the electricity supplier for a line outage."
  }
];

const faqs = [
  {
    question: "Can I assemble a tower on grass or soft ground?",
    answer: "Soft ground such as grass, loose gravel, or recently filled trenches may not provide adequate load-bearing capacity. You can use sole boards (scaffold boards or proprietary base plates) to spread the load, but the underlying ground must still be firm enough to support the total weight. Always conduct a ground assessment and refer to the manufacturer's guidance for maximum ground-bearing pressures."
  },
  {
    question: "Do I need to read the instruction manual every time I assemble the same tower?",
    answer: "Yes. PASMA and the Work at Height Regulations require that the instruction manual is available and consulted on every assembly. Even experienced operatives must have the manual on site — conditions change, components may differ between batches, and refreshing the correct sequence prevents complacency errors."
  },
  {
    question: "What should I do if I discover a damaged component during the pre-assembly check?",
    answer: "Remove the damaged component from service immediately and tag it as defective. Do not attempt to repair it on site. Replace it with a serviceable component from the same manufacturer and model range. Report the defect to your supervisor and record it in the tower inspection log."
  },
  {
    question: "Is a banksman always required during assembly?",
    answer: "A banksman or exclusion zone marshal is required whenever there is a risk of unauthorised persons entering the assembly area. On busy sites, near public areas, or adjacent to traffic routes, a dedicated person should control access. On isolated sites with controlled access, physical barriers and signage may suffice."
  }
];

const IpafModule3Section1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="bg-[#1a1a1a] overflow-x-hidden">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="min-h-[44px] text-white hover:text-white active:text-white p-0 -ml-1 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../ipaf-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 3
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Centered Header */}
        <div className="mb-12 text-center">
          <ClipboardList className="h-10 w-10 text-elec-yellow mx-auto mb-4" />
          <span className="inline-block bg-elec-yellow text-black px-3 py-1 rounded-full text-sm font-semibold mb-4">
            Module 3.1
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Planning & Preparation
          </h1>
          <p className="text-white/80 max-w-xl mx-auto">
            Site surveys, ground assessment, overhead hazards, and pre-assembly preparation for safe tower erection
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
              <p className="font-semibold text-elec-yellow mb-2 text-base">In 30 Seconds</p>
              <ul className="text-base text-white space-y-1.5">
                <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Site Survey:</strong> Assess ground, overhead hazards, and access before anything else.</span></li>
                <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Ground:</strong> Must be load-bearing, level (max 1:100), and firm.</span></li>
                <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Power Lines:</strong> 15 metre exclusion zone minimum.</span></li>
                <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Components:</strong> Same manufacturer only; check against the parts list.</span></li>
                <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Manual:</strong> Must be on site and specific to your tower model.</span></li>
                <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>PPE:</strong> Hard hat, safety boots, gloves, hi-vis at all times.</span></li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-2 border-l-elec-yellow/50 border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2 text-base">On Site</p>
              <ul className="text-base text-white space-y-1.5">
                <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Spot:</strong> Tower assembly areas near buildings, scaffolding projects, maintenance work.</span></li>
                <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Use:</strong> Pre-assembly checklists, risk assessments, method statements.</span></li>
                <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Apply:</strong> Correct component selection, ground preparation, exclusion zone setup, PPE compliance.</span></li>
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
          <p className="text-white mb-4">By the end of this section, you'll be able to:</p>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Conduct a thorough site survey before tower assembly begins</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Assess ground conditions for load-bearing capacity, levelness, and firmness</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Identify overhead hazards including power lines and apply correct exclusion zones</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Select correct components from the manufacturer's parts list for the planned configuration</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Establish exclusion zones and implement access control during assembly</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Identify and wear the correct PPE for tower assembly operations</span>
            </li>
          </ul>
        </section>

        {/* Section 03: Site Survey Requirements */}
        <section className="mb-10">
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Site Survey Requirements
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Every tower assembly must begin with a structured site survey. This is not a quick
                glance around the area — it is a formal process that identifies hazards, confirms the
                proposed position is suitable, and feeds into the risk assessment and method statement.
              </p>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">What the Site Survey Covers</h3>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <ul className="text-white space-y-2 text-sm">
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Access Routes:</strong> Can components be transported to the assembly location safely?</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Ground Conditions:</strong> Is the surface suitable for the tower's base load?</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Overhead Obstructions:</strong> Power lines, beams, pipes, ceiling heights?</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Proximity Hazards:</strong> Moving vehicles, pedestrians, other trades working nearby?</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Environmental Factors:</strong> Wind exposure, weather forecast, lighting conditions?</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Work Scope:</strong> Does the planned tower height and reach suit the task?</span></li>
                  </ul>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Documentation Required</h3>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <ul className="text-white space-y-1 text-sm">
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Risk assessment specific to the assembly</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Method statement covering the full sequence</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Manufacturer's instruction manual</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Component inventory or parts list</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Permit to work (if required by the site)</span></li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Who Carries Out the Survey?</h3>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <ul className="text-white space-y-1 text-sm">
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>A competent person trained in tower work</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Ideally the person who will lead the assembly</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Must be familiar with the tower system being used</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Should consult the site manager or principal contractor</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>May need specialist advice (e.g. structural engineer for unusual loads)</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Ground Assessment */}
        <section className="mb-10">
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Ground Assessment
            </h2>
            <div className="space-y-4 text-white">
              <p>
                The ground beneath the tower must support the entire weight of the structure, the
                operatives, tools, and materials. Ground failure is one of the most common causes of
                tower collapse and often the most preventable.
              </p>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Three Key Ground Criteria</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white/5 border border-green-400/30 p-4 rounded-lg">
                    <h4 className="text-green-300 font-medium mb-2">Load-Bearing Capacity</h4>
                    <ul className="text-white space-y-1 text-sm">
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Can it support the total applied weight?</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Check for voids, cellars, or services below</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Freshly backfilled trenches are unsuitable</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Use sole boards to spread point loads</span></li>
                    </ul>
                  </div>
                  <div className="bg-white/5 border border-cyan-400/30 p-4 rounded-lg">
                    <h4 className="text-cyan-300 font-medium mb-2">Level Surface</h4>
                    <ul className="text-white space-y-1 text-sm">
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Maximum gradient: 1 in 100</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Use a spirit level to verify</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Adjustable legs can compensate for minor slopes</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Never use bricks or blocks as packing</span></li>
                    </ul>
                  </div>
                  <div className="bg-white/5 border border-purple-400/30 p-4 rounded-lg">
                    <h4 className="text-purple-300 font-medium mb-2">Firmness</h4>
                    <ul className="text-white space-y-1 text-sm">
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Ground must not yield under load</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Wet clay, mud, and loose sand are hazardous</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Check after rain — conditions change</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Tarmac can soften in extreme heat</span></li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/20 border border-red-400/50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Common Ground Failures
                </h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Castor sinking:</strong> Soft ground allows castors to penetrate, tilting the tower</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Uneven settlement:</strong> One leg sinks more than others over time</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Hidden voids:</strong> Underground services, manholes, or drainage channels collapse under load</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Slope creep:</strong> Tower gradually moves downhill on a gradient exceeding 1:100</span></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 05: Overhead Hazards */}
        <section className="mb-10">
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-purple-400/80 text-sm font-normal">05</span>
              Overhead Hazards
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Overhead hazards are a critical consideration for tower positioning. The tower itself,
                plus the operative standing on the platform, can bring conductive metal frames dangerously
                close to live power lines or other overhead obstructions.
              </p>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Power Lines</h3>
                  <div className="bg-red-500/10 border border-red-400/30 p-4 rounded-lg">
                    <ul className="text-white space-y-2 text-sm">
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>15m Exclusion Zone:</strong> Minimum distance from overhead power lines</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Flashover Risk:</strong> Electricity can arc across air gaps without contact</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Conductor Swing:</strong> Wind causes lines to move unpredictably</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Line Outage:</strong> Contact the distribution network operator (DNO) if work is unavoidable</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>GS6 Guidance:</strong> Follow HSE guidance note GS6 on avoiding danger from overhead power lines</span></li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Other Overhead Hazards</h3>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <ul className="text-white space-y-2 text-sm">
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Low Ceilings:</strong> Indoor towers may be restricted in maximum height</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Beams & Pipes:</strong> Structural steelwork, sprinkler pipes, ductwork</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Lighting Fixtures:</strong> Fragile fittings that could be damaged or cause injury</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Crane Operations:</strong> Overlapping crane slewing arcs</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Tree Branches:</strong> Can interfere with assembly and obscure hazards</span></li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-elec-yellow">Height Calculation</h3>
                <p className="text-white text-sm mb-2">
                  When assessing overhead clearance, calculate the total reach:
                </p>
                <div className="bg-[#1a1a1a] border border-white/10 p-3 rounded font-mono text-sm text-elec-yellow">
                  Total reach = Platform height + Operative height (1.8m) + Arm reach (0.6m)
                </div>
                <p className="text-white/70 text-sm mt-2">
                  For indoor work, ensure at least 1 metre clearance between the top of the operative's
                  head and any overhead obstruction. This allows safe working posture and tool handling.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Exclusion Zones During Assembly */}
        <section className="mb-10">
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-teal-400/80 text-sm font-normal">06</span>
              Exclusion Zones During Assembly
            </h2>
            <div className="space-y-4 text-white">
              <p>
                During tower assembly, components are being lifted, positioned, and locked at height.
                There is a real risk of items falling onto people below. An exclusion zone must be
                established and maintained throughout the entire assembly and dismantling process.
              </p>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Establishing the Zone</h3>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <ul className="text-white space-y-2 text-sm">
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Minimum Extent:</strong> At least 2 metres beyond the tower base footprint on all sides</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Physical Barriers:</strong> Heras fencing, barriers, or safety tape at minimum</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Signage:</strong> "Danger — Overhead Work" and "No Unauthorised Access" signs</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Banksman:</strong> A dedicated person to control access on busy sites</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Foot Traffic:</strong> Redirect pedestrian routes away from the assembly zone</span></li>
                  </ul>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Indoor Assembly</h3>
                  <div className="bg-white/5 border border-teal-400/30 p-4 rounded-lg">
                    <ul className="text-white space-y-1 text-sm">
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Cordon off the room or area completely</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Close doors and place warning signs</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Inform other trades of the operation</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Consider noise impact (radio communication)</span></li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Outdoor Assembly</h3>
                  <div className="bg-white/5 border border-teal-400/30 p-4 rounded-lg">
                    <ul className="text-white space-y-1 text-sm">
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Extend the zone for wind conditions</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Account for passing traffic (vehicle and pedestrian)</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Use high-visibility barriers and cones</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Monitor adjacent work activities throughout</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 07: Selecting Correct Components */}
        <section className="mb-10">
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-red-400/80 text-sm font-normal">07</span>
              Selecting Correct Components
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Before assembly begins, every component must be checked against the manufacturer's parts
                list for the planned tower configuration. Missing, damaged, or incorrect components must
                be identified and resolved before any work at height takes place.
              </p>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Component Selection Rules</h3>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <ul className="text-white space-y-2 text-sm">
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Single Manufacturer:</strong> All components must be from the same manufacturer and system</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Parts List:</strong> Cross-reference every item against the instruction manual's parts list</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Visual Inspection:</strong> Check for bends, cracks, corrosion, missing welds, and damaged locking mechanisms</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Correct Quantities:</strong> Count frames, braces, platforms, guardrails, and toeboards before starting</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Stabilisers:</strong> Include outriggers or ballast weights if the configuration requires them</span></li>
                  </ul>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-elec-yellow">Reading the Instruction Manual</h3>
                <div className="text-white space-y-2 text-sm">
                  <p>The instruction manual is a legal requirement under the Work at Height Regulations 2005. It must be:</p>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Specific to the exact tower model and configuration</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Available on site throughout assembly, use, and dismantling</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Legible and in a language understood by the operatives</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Followed step by step — no shortcuts or improvisation</span></li>
                  </ul>
                  <p className="mt-2"><strong>The instruction manual is not optional guidance — it is a mandatory document.</strong></p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Common Components Checklist</h3>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <ul className="text-white space-y-1 text-sm">
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Adjustable legs / base plates</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Castors with brakes</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Frames (standard or AGR type)</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Horizontal braces</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Diagonal braces</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Platforms (with or without trapdoors)</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Guardrails and intermediate rails</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Toeboards</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Outriggers / stabilisers</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Locking clips and pins</span></li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Rejection Criteria</h3>
                  <div className="bg-white/5 border border-red-400/30 p-4 rounded-lg">
                    <ul className="text-white space-y-1 text-sm">
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Visible bends or distortion in tubes</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Cracks in welds or joints</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Significant corrosion or pitting</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Missing or defective locking mechanisms</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Damaged castor wheels or brakes</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Split or delaminated platform decks</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Mismatched components from different systems</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08: PPE Requirements */}
        <section className="mb-10">
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-cyan-400/80 text-sm font-normal">08</span>
              PPE Requirements
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Personal Protective Equipment for tower assembly protects against the specific hazards
                encountered during the assembly process — falling objects, hand injuries from handling
                metal components, foot injuries, and visibility on site.
              </p>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Mandatory PPE</h3>
                  <div className="bg-white/5 border border-green-400/30 p-4 rounded-lg">
                    <ul className="text-white space-y-2 text-sm">
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Hard Hat (EN 397):</strong> Protection from falling components during assembly. Must have chinstrap if working at height.</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Safety Boots (EN 20345 S3):</strong> Steel or composite toe cap, ankle support, slip-resistant sole.</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Work Gloves:</strong> Protect hands when handling metal frames and braces. Must allow sufficient grip and dexterity.</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Hi-Vis Vest (EN 20471):</strong> Minimum Class 2 for site visibility, especially near traffic routes.</span></li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Additional PPE (Situational)</h3>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <ul className="text-white space-y-2 text-sm">
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Safety Glasses:</strong> When working below others or in dusty conditions</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Hearing Protection:</strong> If nearby operations create excessive noise</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Knee Pads:</strong> When working at lower levels during base assembly</span></li>
                      <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong>Fall Arrest Harness:</strong> Only if specified in the method statement for specific configurations</span></li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-elec-yellow">PPE Inspection</h3>
                <p className="text-white text-sm">
                  All PPE must be inspected before each use. Check hard hats for cracks, dents, and UV
                  degradation. Verify safety boot soles are not worn smooth. Ensure gloves are free from
                  tears and retain adequate grip. Replace any damaged PPE immediately — it is not a repair item.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 09: Practical Planning Guidance */}
        <section className="mb-10">
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-elec-yellow/80 text-sm font-normal">09</span>
              Practical Planning Guidance
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Good planning prevents the majority of tower-related incidents. Taking an extra
                fifteen minutes to plan properly saves hours of corrective work and avoids serious injuries.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 text-elec-yellow">Pre-Assembly Workflow</h3>
                <ol className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-elec-yellow/20 border border-elec-yellow/40 flex items-center justify-center flex-shrink-0 text-elec-yellow text-xs font-bold">1</div>
                    <div><strong>Site Survey:</strong> Walk the area, assess ground, check overhead, note access routes</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-elec-yellow/20 border border-elec-yellow/40 flex items-center justify-center flex-shrink-0 text-elec-yellow text-xs font-bold">2</div>
                    <div><strong>Risk Assessment:</strong> Document hazards identified and control measures</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-elec-yellow/20 border border-elec-yellow/40 flex items-center justify-center flex-shrink-0 text-elec-yellow text-xs font-bold">3</div>
                    <div><strong>Method Statement:</strong> Prepare the step-by-step assembly plan</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-elec-yellow/20 border border-elec-yellow/40 flex items-center justify-center flex-shrink-0 text-elec-yellow text-xs font-bold">4</div>
                    <div><strong>Component Check:</strong> Lay out all components, verify against parts list</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-elec-yellow/20 border border-elec-yellow/40 flex items-center justify-center flex-shrink-0 text-elec-yellow text-xs font-bold">5</div>
                    <div><strong>Exclusion Zone:</strong> Set up barriers, signage, and banksman if needed</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-elec-yellow/20 border border-elec-yellow/40 flex items-center justify-center flex-shrink-0 text-elec-yellow text-xs font-bold">6</div>
                    <div><strong>PPE Check:</strong> All operatives equipped and inspected</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-elec-yellow/20 border border-elec-yellow/40 flex items-center justify-center flex-shrink-0 text-elec-yellow text-xs font-bold">7</div>
                    <div><strong>Briefing:</strong> Team briefing on the plan, roles, and emergency procedures</div>
                  </li>
                </ol>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white/5 border border-green-400/30 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 text-green-300">On-Site Tips</h3>
                  <ul className="text-white space-y-1 text-sm">
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Photograph the site conditions before starting</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Mark the tower footprint on the ground</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Position components close to the assembly point</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Lay components out in assembly order</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Keep walkways clear around the work area</span></li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-red-400/30 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 text-red-300">Common Planning Mistakes</h3>
                  <ul className="text-white space-y-1 text-sm">
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Skipping the site survey on "familiar" sites</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Not checking for underground services</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Forgetting to account for wind at height</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Underestimating the number of components needed</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Failing to notify other trades of the operation</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 10: Pocket Guide */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-elec-yellow" />
            <span className="text-elec-yellow/80 text-sm font-normal">10</span>
            Planning & Preparation Pocket Guide
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-sm bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-white mb-2">Ground Assessment Checklist</h3>
                <ul className="space-y-1 text-white/80">
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Load-bearing:</strong> Firm, no voids, no soft spots</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Level:</strong> Max 1:100 gradient</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Firm:</strong> No yielding under load</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Sole boards:</strong> Required on soft surfaces</span></li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-2">Critical Distances</h3>
                <ul className="space-y-1 text-white/80">
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Power lines:</strong> 15m exclusion zone</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Assembly zone:</strong> 2m beyond base footprint</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Overhead clearance:</strong> 1m above operative's head</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Max gradient:</strong> 1 in 100 (0.6 degrees)</span></li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-white mb-2">Mandatory PPE</h3>
                <ul className="space-y-1 text-white/80">
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Hard hat:</strong> EN 397, chinstrap if at height</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Safety boots:</strong> EN 20345 S3, toe cap</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Work gloves:</strong> Grip and dexterity</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Hi-vis vest:</strong> EN 20471 Class 2 minimum</span></li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-2">Documentation Required</h3>
                <ul className="space-y-1 text-white/80">
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Risk assessment</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Method statement</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Manufacturer's instruction manual</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Component parts list</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Permit to work (if site requires)</span></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">11</span>
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
            title="Planning & Preparation Quiz"
            questions={quizQuestions}
          />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[44px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../ipaf-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 3
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[44px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../ipaf-module-3-section-2">
              Next: 3T Method
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default IpafModule3Section1;
