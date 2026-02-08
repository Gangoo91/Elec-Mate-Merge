import { ArrowLeft, AlertTriangle, CheckCircle, Zap, Wind, Package, Wrench, ThermometerSun, Hand } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "hazards-tower-collapse-cause",
    question: "Which of the following is the MOST common cause of mobile tower collapse?",
    options: [
      "Using the tower indoors rather than outdoors",
      "Incorrect assembly, missing braces, or overloading the platform",
      "Painting the tower a dark colour",
      "Using the tower on a Monday morning"
    ],
    correctIndex: 1,
    explanation: "Tower collapse is most commonly caused by incorrect assembly (missing braces or diagonal members), overloading the platform beyond its rated capacity, or a combination of both. Every brace and connection plays a structural role — omitting even one can compromise the entire tower."
  },
  {
    id: "hazards-power-line-clearance",
    question: "What is the minimum safe distance that must be maintained from overhead power lines when using an aluminium tower?",
    options: [
      "5 metres",
      "10 metres",
      "15 metres",
      "3 metres"
    ],
    correctIndex: 2,
    explanation: "A minimum exclusion zone of 15 metres must be maintained from overhead power lines. Aluminium towers are excellent conductors of electricity and present extreme electrocution risk if they come close to or contact overhead lines. You do not need to touch a line — electricity can arc across gaps."
  },
  {
    id: "hazards-falling-objects-control",
    question: "Which combination of measures helps prevent injuries from falling objects around a mobile tower?",
    options: [
      "High-visibility clothing and ear defenders",
      "Toeboards on the platform, exclusion zones at the base, and tool tethering",
      "Painting the ground yellow around the tower",
      "Working only at night when fewer people are around"
    ],
    correctIndex: 1,
    explanation: "Preventing falling object injuries requires toeboards on the platform (to stop items rolling off the edge), exclusion zones at ground level (to keep people away from the drop zone), and tool tethering (to physically attach tools to the operative or platform). These three measures work together to provide layered protection."
  }
];

const faqs = [
  {
    question: "What are the most common causes of falls from mobile towers?",
    answer: "The most common causes include: climbing the outside of the tower instead of using the internal ladder, working on a platform without proper guardrails in place, overreaching beyond the platform edge, the tower moving unexpectedly because castors were not locked, and climbing with tools or materials in hand instead of using a hoisting line. All of these are preventable through competent assembly, proper training, and following the method statement."
  },
  {
    question: "Can I use an aluminium tower near overhead power lines if I am careful?",
    answer: "No. A 15-metre exclusion zone must be maintained from all overhead power lines at all times. Aluminium is an excellent conductor of electricity, and electricity can arc across a gap without direct contact — especially in damp conditions. If work within 15 metres is absolutely essential, the electricity distribution network operator must be contacted to arrange isolation before any tower is positioned. GRP (glass-reinforced plastic) towers are available as a non-conductive alternative for work near electrical hazards."
  },
  {
    question: "What should I do if I notice someone has left tools loose on a tower platform?",
    answer: "Stop work immediately and address the hazard. Loose tools on a platform are a serious falling object risk — even a small spanner falling from height can cause a fatal injury. Secure or remove the tools, re-establish the exclusion zone below the platform, and brief the team on tool management. All tools should be tethered to the operative or secured in a tool bag or belt. Report the near-miss so it can be recorded and learned from."
  },
  {
    question: "How does fatigue increase the risk of accidents on mobile towers?",
    answer: "Fatigue reduces concentration, reaction time, grip strength, and decision-making ability — all critical when working at height. Tired operatives are more likely to miss assembly steps, fail to lock components, lose their footing, or drop tools. Working at height is physically demanding, and environmental factors like heat, cold, and wind compound fatigue. Regular rest breaks, adequate hydration, and honest self-assessment of fitness are essential. If you feel too tired to work safely, stop."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "According to HSE statistics, what is the single largest cause of workplace fatalities in the UK?",
    options: [
      "Electrocution from live electrical equipment",
      "Falls from height",
      "Being struck by a moving vehicle",
      "Exposure to harmful substances"
    ],
    correctAnswer: 1,
    explanation: "Falls from height consistently remain the single largest cause of workplace fatalities in the UK. This includes falls from ladders, scaffolding, roofs, and mobile access towers. Preventing falls is therefore the highest priority in any work at height activity."
  },
  {
    id: 2,
    question: "Which of the following would be MOST likely to cause a mobile tower to overturn?",
    options: [
      "Assembling the tower in bright sunlight",
      "The tower being impacted by a vehicle, exposed to high winds, or set up on unstable ground",
      "Having too few people on the platform",
      "Using the tower for less than one hour"
    ],
    correctAnswer: 1,
    explanation: "Tower overturning is caused by lateral forces exceeding the tower's stability. Vehicle impact, high winds, and unstable ground are all common causes. Other contributing factors include overloading one side of the platform, using the tower at excessive height without stabilisers, and attempting to move the tower with people or materials on the platform."
  },
  {
    id: 3,
    question: "Why are aluminium mobile towers particularly dangerous near overhead power lines?",
    options: [
      "Aluminium is heavier than steel and harder to control",
      "Aluminium is a very good conductor of electricity, creating a direct path for current to flow through the tower and the operative to earth",
      "Aluminium is magnetic and attracts power lines",
      "Aluminium towers are always taller than steel towers"
    ],
    correctAnswer: 1,
    explanation: "Aluminium is an excellent electrical conductor. If any part of an aluminium tower comes close to or contacts an overhead power line, current will flow through the entire tower structure to earth — through anyone touching the tower. This can cause fatal electrocution without any direct contact with the line itself."
  },
  {
    id: 4,
    question: "What is the primary purpose of toeboards fitted to a tower platform?",
    options: [
      "To give operatives something to lean against",
      "To prevent tools, materials, and debris from falling off the platform edge",
      "To increase the height of the guardrail",
      "To make the platform easier to climb onto"
    ],
    correctAnswer: 1,
    explanation: "Toeboards are fitted around the platform edge to prevent objects from being kicked or rolling off the platform. They form a barrier at foot level that stops tools, materials, and debris from falling to the ground below, where they could strike and injure people."
  },
  {
    id: 5,
    question: "When manually handling tower components, which of the following is the correct technique?",
    options: [
      "Bend from the waist and lift quickly to get it over with",
      "Keep back straight, bend knees, hold the load close to your body, and use team lifts for heavy or awkward components",
      "Always carry components above shoulder height for better balance",
      "Twist your body while lifting to position the component faster"
    ],
    correctAnswer: 1,
    explanation: "Correct manual handling technique requires keeping the back straight, bending the knees, holding the load close to the body, and avoiding twisting while lifting. Tower frames are heavy and awkward — team lifts should be used whenever the weight or shape makes single-person lifting unsafe."
  },
  {
    id: 6,
    question: "What is the main risk of fingers becoming trapped during tower assembly?",
    options: [
      "Fingers may get paint on them",
      "Fingers can be crushed or severed in frame locks, spigot connections, and brace clips during assembly",
      "Fingers may become cold in winter",
      "Fingers may become slippery from rain"
    ],
    correctAnswer: 1,
    explanation: "Frame locks, spigot joints, and brace connections create pinch points and crush hazards during assembly. Fingers can be trapped between components as they are connected, potentially causing crush injuries, fractures, or in the worst cases, amputation. Correct hand positioning, suitable gloves, and clear communication between team members are essential controls."
  },
  {
    id: 7,
    question: "At what wind speed should work on a mobile tower typically cease?",
    options: [
      "Beaufort Force 2 (7 mph)",
      "Beaufort Force 4 (17 mph / moderate breeze)",
      "Beaufort Force 8 (40 mph)",
      "Wind speed is not relevant to tower safety"
    ],
    correctAnswer: 1,
    explanation: "Work on a mobile tower should cease at Beaufort Force 4 (approximately 17 mph), which is a moderate breeze sufficient to raise dust and move small branches. At Beaufort Force 6 (approximately 28 mph), the tower should be dismantled or secured. Wind loads increase with the square of wind speed, meaning a doubling of wind speed quadruples the force on the tower."
  },
  {
    id: 8,
    question: "Which environmental factor can significantly reduce an operative's concentration and grip strength when working at height?",
    options: [
      "Cloud cover",
      "Dehydration and heat stress",
      "The time of year",
      "Background noise from other trades"
    ],
    correctAnswer: 1,
    explanation: "Dehydration and heat stress significantly reduce concentration, reaction time, and physical grip strength. Even mild dehydration (2% body mass loss) can impair cognitive function and physical performance. When working at height — where a momentary lapse can be fatal — adequate hydration and regular rest breaks are critical safety measures, not optional comforts."
  }
];

export default function PasmaModule6Section1() {
  useSEO({
    title: "Common Hazards | PASMA Module 6.1",
    description: "Identify and understand the most common hazards associated with mobile access towers: falls from height, tower collapse, electrocution, falling objects, manual handling injuries, entrapment, and environmental factors.",
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
            <Link to="../pasma-module-6">
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
            <AlertTriangle className="h-7 w-7 text-elec-yellow" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/20 mb-3 mx-auto">
            <span className="text-elec-yellow text-xs font-semibold">MODULE 6 &middot; SECTION 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Common Hazards
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            The seven most significant hazards associated with mobile access towers &mdash; from falls and collapse to electrocution, falling objects, and environmental factors
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Falls from height</strong> = #1 UK workplace killer</li>
              <li><strong>Tower collapse</strong> from incorrect assembly or overloading</li>
              <li><strong>Electrocution risk</strong> from overhead power lines</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Identify:</strong> all hazards before work begins</li>
              <li><strong>Control:</strong> exclusion zones, PPE, competent assembly</li>
              <li><strong>Monitor:</strong> conditions throughout the work, stop if unsafe</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify the primary hazards associated with mobile tower use",
              "Understand why falls from height are the leading cause of workplace fatalities",
              "Recognise the causes of tower collapse and overturning",
              "Explain the electrocution risk from overhead power lines",
              "Describe control measures for falling objects and manual handling",
              "Assess environmental and physical hazards affecting tower operatives"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Falls from Height */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Falls from Height &mdash; The Number One Risk
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Falls from height remain the single largest cause of workplace fatalities in the United Kingdom. Year after year, HSE statistics confirm that more workers die from falls than from any other type of workplace accident. Mobile access towers, while far safer than ladders when used correctly, are involved in a significant proportion of these incidents.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">HSE Fatal Injury Statistics</p>
                </div>
                <p className="text-sm text-white/80 mb-2">
                  Falls from height typically account for approximately 25&ndash;30% of all workplace fatalities each year in the UK. Construction remains the highest-risk sector, and work from mobile towers contributes to these figures when towers are incorrectly assembled, misused, or operated by untrained personnel.
                </p>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-3">Common Fall Scenarios from Mobile Towers</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Climbing the outside:</strong> Operatives climbing the external face of the tower instead of using the internal ladder — often to save time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Missing guardrails:</strong> Working on a platform where guardrails have not been fully installed or have been removed to pass materials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Overreaching:</strong> Leaning beyond the platform edge rather than repositioning the tower, shifting the centre of gravity dangerously</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Tower movement:</strong> The tower rolling unexpectedly because castor brakes were not locked or the ground is sloping</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Trapdoor left open:</strong> An open trapdoor in the platform creating a fall-through hazard, particularly during descent</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Climbing with loads:</strong> Carrying tools or materials while climbing instead of using a hoisting line, compromising the 3-point contact rule</span>
                  </li>
                </ul>
              </div>

              <p>
                Every one of these scenarios is preventable. Competent assembly, proper training, locked castors, fully installed guardrails, and disciplined use of the internal ladder and hoisting line eliminate the vast majority of fall risks associated with mobile towers.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">The &ldquo;Just This Once&rdquo; Mentality</p>
                <p className="text-sm text-white/80">
                  Most falls from towers do not happen to untrained people. They happen to experienced operatives who take a shortcut they have taken before without consequence. Climbing the outside &ldquo;just to check something quickly,&rdquo; removing a guardrail &ldquo;just for a minute&rdquo; to pass a sheet of plasterboard, or leaning out &ldquo;just a bit further&rdquo; rather than moving the tower. The word &ldquo;just&rdquo; in a safety context is a warning sign. If you hear yourself thinking it, stop and do the job properly.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Fall Prevention Measures</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Full guardrail system installed before platform use</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Trapdoor closed after every ascent and descent</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Castor brakes locked on all four wheels</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Internal ladder used for all climbing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Hoisting line for all tools and materials</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Fall Consequences</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Falls from 2m can cause fatal head injuries</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Falls from 4m+ frequently result in spinal injuries</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Pelvic and leg fractures from landing on feet</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Internal organ damage from impact deceleration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Long-term disability even from &ldquo;survivable&rdquo; falls</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Tower Collapse & Overturning */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Tower Collapse &amp; Overturning
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A mobile tower that collapses or overturns while occupied is almost certain to cause serious injury or death. Unlike a controlled fall where an operative might grab hold of something, a tower collapse is sudden, violent, and gives no time to react. Understanding the causes is the first step in preventing them.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-3">Primary Causes of Tower Collapse</p>
                <div className="space-y-3 text-sm text-white/80">
                  <p><strong className="text-white">Incorrect assembly:</strong> Missing braces, diagonal members not installed, platforms not locked, or components assembled in the wrong order. Every structural member plays a critical role &mdash; a tower with missing braces is like a building without walls.</p>
                  <p><strong className="text-white">Overloading:</strong> Exceeding the platform's rated load capacity with people, tools, and materials. A standard platform is typically rated for 275 kg, but this varies by manufacturer and configuration.</p>
                  <p><strong className="text-white">Wind forces:</strong> High winds create lateral loads that can overturn a tower, particularly when the platform is sheeted or has large flat materials stored on it that act as sails.</p>
                  <p><strong className="text-white">Vehicle impact:</strong> A vehicle striking the tower base can cause instant collapse. This is a particular risk on construction sites and in car parks where towers are positioned near traffic routes.</p>
                  <p><strong className="text-white">Unstable ground:</strong> Ground that sinks, shifts, or is uneven causes the tower to lean progressively until it overturns. Freshly backfilled trenches and waterlogged ground are common culprits.</p>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Case Study — Anonymised Incident</p>
                </div>
                <p className="text-sm text-white/80">
                  An operative was working from a 6-metre aluminium tower. Two diagonal braces had been left out during assembly to &ldquo;make it quicker.&rdquo; When the operative stepped to the edge of the platform to reach a light fitting, the tower buckled and collapsed sideways. The operative suffered multiple fractures including a broken pelvis and spent four months in hospital. Investigation found that the braces would have taken less than two minutes to install.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Prevention Through Proper Assembly</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Follow the manufacturer's instruction manual exactly &mdash; no shortcuts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Install every brace, every platform lock, every guardrail component</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Use stabilisers or outriggers as specified for the tower height</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Check the maximum platform load and never exceed it</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Protect the tower base from vehicle impact with barriers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Monitor wind conditions and cease work at Beaufort Force 4</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Height-to-Base Ratio</p>
                <p className="text-sm text-white/80">
                  A tower&rsquo;s stability is directly related to its height-to-base ratio. PASMA guidance states that for outdoor use, the maximum height-to-base ratio is 3:1 (with outriggers, this extends to 3.5:1). For indoor use on a firm, level floor, the ratio can be 3.5:1. Exceeding these ratios dramatically increases the risk of overturning, even in calm conditions. Stabilisers and outriggers extend the effective base, improving the ratio and increasing stability. Always check the manufacturer&rsquo;s specific guidance for the tower system in use.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Electrocution — Overhead Power Lines */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Electrocution &mdash; Overhead Power Lines
          </h2>
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Contact with overhead power lines is one of the most lethal hazards in construction. Unlike many accidents where there is a chance of survival, electrocution from high-voltage overhead lines is almost always fatal. Mobile towers, particularly aluminium ones, present a significant risk because they are tall, conductive, and often moved around site.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">15-Metre Minimum Exclusion Zone</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Maintain a minimum 15-metre exclusion zone from all overhead power lines</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>This distance applies to every part of the tower at its maximum height</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Include the reach of any tools, poles, or materials being handled from the platform</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Electricity can arc across a gap &mdash; direct contact is not required for electrocution</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Most overhead power lines are bare conductors, not insulated</span>
                  </li>
                </ul>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-3">Why Aluminium Towers Are Particularly Dangerous</p>
                <p className="text-sm text-white/80 mb-3">
                  Aluminium is one of the best conductors of electricity commonly used in construction equipment. An aluminium tower that contacts or approaches an overhead power line creates a direct, low-resistance path for electrical current to flow from the line, through the tower structure, through anyone touching the tower, and into the ground.
                </p>
                <p className="text-sm text-white/80">
                  <strong className="text-white">GRP alternative:</strong> For work that must take place near electrical hazards, glass-reinforced plastic (GRP) towers are available. GRP is a non-conductive material that does not provide a path for electrical current. However, even GRP towers must respect safe distances from power lines, as tools and materials on the platform may still be conductive.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Real Incident: Tower Contact with Power Line</p>
                <p className="text-sm text-white/80">
                  HSE records include numerous cases of fatalities involving mobile towers and overhead power lines. In one anonymised case, an aluminium tower was being repositioned on a flat roof when a frame section came within arcing distance of an 11 kV overhead line. The operative holding the tower received a fatal electric shock. A colleague who attempted rescue also received serious burns. The investigation found that no site survey for overhead hazards had been conducted, no exclusion zone was in place, and the operatives were unaware the power line existed. The entire incident was preventable through a basic pre-work survey.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Danger Zone Considerations</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Power line voltage affects the arc distance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Damp conditions increase arc risk significantly</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Power lines can sag in hot weather</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Wind can cause lines to swing laterally</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Underground cables may also be present</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">If Work Near Power Lines Is Essential</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Contact the distribution network operator (DNO)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Request isolation or protective measures</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Use goal posts or height restrictors</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Consider GRP towers as an alternative</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Appoint a dedicated safety observer</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Falling Objects */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Falling Objects
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Objects falling from a tower platform pose a serious risk to anyone at ground level. The energy of a falling object increases with height &mdash; even a small hand tool dropped from a 6-metre platform can cause a fatal head injury. This hazard affects not just the tower operatives but anyone in the vicinity, including other trades, members of the public, and site visitors.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Package className="h-5 w-5 text-elec-yellow" />
                  <p className="text-sm font-medium text-elec-yellow">Sources of Falling Objects</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Hand tools:</strong> Spanners, screwdrivers, pliers, and drills placed on the platform edge or in pockets that fall during movement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Building materials:</strong> Fixings, cable clips, light fittings, and other materials being installed from the platform</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Debris:</strong> Dust, plaster, and removed components from the work being carried out</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Tower components:</strong> Components that are dislodged or dropped during assembly, reconfiguration, or dismantling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Personal items:</strong> Phones, drinks, and other personal items not secured to the operative</span>
                  </li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Toeboard Requirements</p>
                  <p className="text-sm text-white/80">
                    Toeboards must be fitted to all open edges of the working platform. They must be at least 150 mm high and fitted at the platform surface with no gap greater than the toeboard height between the toeboard and the platform. Toeboards prevent items from being kicked or rolling off the platform edge. On towers used for work generating debris (drilling, chasing, removal work), a mesh guard between the toeboard and the guardrail provides additional protection.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Tool Tethering</p>
                  <p className="text-sm text-white/80">
                    Tools should be tethered to the operative&rsquo;s tool belt or to a secure point on the platform using proprietary tool lanyards rated for the weight of the tool. This ensures that even if a tool is dropped, it cannot fall to ground level. Tethering is especially important in busy environments where exclusion zones cannot fully prevent access below. Ensure the tether is short enough that the tool cannot swing into hazards or reach beyond the platform edge.
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Exclusion Zones &amp; Netting</p>
                <p className="text-sm text-white/80">
                  An exclusion zone must be established at the base of the tower and extending beyond the platform footprint to account for objects that bounce or deflect. In busy environments &mdash; such as occupied buildings, shopping centres, or areas with public access &mdash; additional measures may be needed, including debris netting around the platform, solid barriers at ground level, and a dedicated ground-level banksman to manage pedestrian access.
                </p>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Impact Energy Increases with Height</p>
                </div>
                <p className="text-sm text-white/80">
                  A 500g spanner dropped from a 6-metre platform hits the ground at approximately 39 km/h with an impact force that can fracture a skull, even through a hard hat. A 2 kg drill from the same height is equivalent to being struck by a brick thrown at full force. The physics are simple: the higher the platform, the greater the speed at impact, and the more damage is done. This is why toeboards, tool tethering, and exclusion zones are all required &mdash; no single measure is sufficient on its own.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Manual Handling Injuries */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Manual Handling Injuries
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Tower components are heavy, awkward to grip, and often need to be carried across uneven ground or up flights of stairs to reach the assembly area. Manual handling injuries are among the most common non-fatal injuries associated with tower work, and they can be severe enough to end careers.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Wrench className="h-5 w-5 text-elec-yellow" />
                  <p className="text-sm font-medium text-elec-yellow">Common Manual Handling Injuries</p>
                </div>
                <div className="space-y-3 text-sm text-white/80">
                  <p><strong className="text-white">Back strain and disc injuries:</strong> The most common injury, caused by lifting heavy frames and platforms with poor technique, twisting while carrying, or repetitive bending during assembly. Can result in chronic pain and long-term disability.</p>
                  <p><strong className="text-white">Trapped and crushed fingers:</strong> Components sliding during carrying, frames being lowered onto hands, and spigot connections closing on fingers. Gloves provide some protection but correct hand positioning is more important.</p>
                  <p><strong className="text-white">Foot and ankle injuries:</strong> Dropping heavy components onto feet, or tripping while carrying loads across uneven ground. Safety footwear with toe protection is mandatory.</p>
                  <p><strong className="text-white">Shoulder and arm injuries:</strong> Overhead lifting, carrying components at arm's length, and passing frames up to operatives on the tower. Repetitive strain from prolonged assembly work.</p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Correct Lifting Techniques for Tower Components</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Plan the lift:</strong> Where are you picking it up? Where is it going? Is the route clear? Do you need help?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Position your feet:</strong> Shoulder-width apart, one foot slightly ahead for balance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Bend the knees:</strong> Keep your back straight, bend at the knees and hips, get a firm grip before lifting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Lift smoothly:</strong> Use your leg muscles, not your back. Avoid jerking or snatching the load</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Keep close:</strong> Hold the load as close to your body as possible throughout the carry</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Team lift:</strong> If the component is too heavy, too long, or too awkward for one person, always use a team lift</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Mechanical aids:</strong> For elevated assembly areas, consider using a powered stair climber, trolley, or hoist to move components</span>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Cumulative Damage</p>
                </div>
                <p className="text-sm text-white/80">
                  Manual handling injuries are often cumulative rather than sudden. An operative who lifts tower components with poor technique may not feel immediate pain, but over weeks, months, and years, the repeated stress on the spine causes disc degeneration, nerve compression, and chronic pain. By the time symptoms appear, the damage is done. Correct technique from day one is an investment in your long-term health and career longevity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Entrapment & Crush Hazards */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Entrapment &amp; Crush Hazards
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                During assembly and dismantling, there are numerous points where fingers, hands, and limbs can become trapped or crushed between tower components. These injuries often happen quickly and without warning, making prevention through correct technique and awareness far more effective than reactive measures.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Hand className="h-5 w-5 text-elec-yellow" />
                  <p className="text-sm font-medium text-elec-yellow">Key Crush &amp; Entrapment Points</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Frame locks:</strong> The locking mechanism on frame connectors can close with significant force on fingers positioned in the pinch zone</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Spigot connections:</strong> Inserting vertical frames into the spigots of the level below creates a shear point where fingers can be trapped between the tube and the cup</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Brace clips and hooks:</strong> Snap-on brace connections can trap fingers as they spring into place</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Platform installation:</strong> Lowering platform decks into position creates crush points at the edges where the platform meets the frame</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Castor adjustment:</strong> Adjusting castor height with the leg threads can trap fingers if the tower shifts during adjustment</span>
                  </li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Correct Hand Positions</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Keep fingers clear of lock mechanisms until ready to engage</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Grip frames by the tube, not near connection points</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Guide components from the sides, never from below</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Use the palm of your hand to push locks, not fingertips</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Never hold a component while someone else locks it</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Glove &amp; Communication Requirements</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Wear suitable work gloves for handling metal components</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Gloves must allow sufficient dexterity for locks and pins</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Call out clearly before locking or releasing any component</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Agree hand signals where verbal communication is difficult</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Always confirm &ldquo;hands clear&rdquo; before engaging locks</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Team Assembly Communication</p>
                </div>
                <p className="text-sm text-white/80">
                  The majority of entrapment injuries during team assembly occur because one person moves a component while another&rsquo;s hands are still in the pinch zone. Clear, agreed verbal commands such as &ldquo;ready to lock,&rdquo; &ldquo;hands clear,&rdquo; and &ldquo;locked&rdquo; should be used at every connection point. Never rush &mdash; the few seconds saved are not worth a crushed finger.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Dismantling &mdash; Higher Risk of Entrapment</p>
                <p className="text-sm text-white/80">
                  Entrapment injuries are statistically more common during dismantling than assembly. Components that have been under load may be tight in their connections. Releasing locks under tension can cause sudden movement. Operatives are often tired by the time dismantling begins. Extra vigilance, fresh gloves (if worn ones have reduced grip), and strict adherence to the &ldquo;hands clear&rdquo; protocol are essential during the dismantling phase. If a connection is stuck, do not force it with bare hands &mdash; use a rubber mallet and keep fingers well clear of the release point.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Cold Weather Entrapment Risk</p>
                <p className="text-sm text-white/80">
                  Cold weather significantly increases entrapment risk. Cold metal components are harder to grip, meaning hands slip more easily into pinch zones. Cold hands are stiffer and less dextrous, making precise hand positioning more difficult. Gloves add bulk that may obscure the view of the pinch point. Operatives are tempted to rush to get back into the warm, leading to less careful component handling. In cold conditions, take extra time at each connection, and warm hands regularly to maintain dexterity.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Fatigue & Environmental Hazards */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Fatigue &amp; Environmental Hazards
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Working at height is physically demanding. Climbing, carrying components, maintaining balance on a platform, and concentrating for extended periods all take a toll on the body. Environmental conditions compound this &mdash; heat, cold, wind, and rain each introduce additional hazards that must be managed proactively.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <ThermometerSun className="h-5 w-5 text-elec-yellow" />
                  <p className="text-sm font-medium text-elec-yellow">Environmental Factors</p>
                </div>
                <div className="space-y-3 text-sm text-white/80">
                  <p><strong className="text-white">Heat stress in summer:</strong> Working on an exposed platform in direct sunlight can raise body temperature rapidly. Symptoms include excessive sweating, dizziness, nausea, confusion, and collapse. Dehydration compounds the effect &mdash; even 2% body mass loss from dehydration impairs concentration and reaction time.</p>
                  <p><strong className="text-white">Cold in winter:</strong> Cold hands lose dexterity and grip strength, increasing the risk of dropped tools and missed connections during assembly. Hypothermia reduces mental sharpness and decision-making. Cold metal components can cause contact cold burns on exposed skin.</p>
                  <p><strong className="text-white">Wind exposure:</strong> Wind chill reduces effective temperature further. Wind also affects balance, makes it harder to control components during assembly, and increases the force required to hold position on the platform.</p>
                  <p><strong className="text-white">Rain and wet conditions:</strong> Wet platforms, ladder rungs, and components become slippery. Reduced visibility, distracted concentration, and the urge to rush to &ldquo;get it done before it gets worse&rdquo; all increase accident risk.</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Dehydration &amp; Concentration</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Drink water regularly, not just when thirsty</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Avoid relying on caffeine or energy drinks alone</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Urine colour is a simple hydration indicator</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Even mild dehydration impairs cognitive function</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Keep water accessible on or near the platform</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Rest Breaks &amp; Fitness for Work</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Take regular rest breaks &mdash; do not wait until exhausted</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Rotate tasks where possible to vary physical demands</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Assess your own fitness honestly each day</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Report medication that may cause drowsiness or dizziness</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>If you feel unwell, do not work at height</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Fatigue Risk Management</p>
                <p className="text-sm text-white/80">
                  Fatigue is insidious &mdash; it builds gradually and people often do not recognise how impaired they have become until an accident occurs. Signs to watch for in yourself and colleagues include: slower reactions, difficulty concentrating, repeatedly forgetting steps in the assembly sequence, irritability, and reduced grip strength. A brief rest now prevents a serious incident later. Every operative has the authority to request a break without criticism.
                </p>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-2">UV Exposure at Height</p>
                <p className="text-sm text-white/80">
                  Operatives working on open platforms are more exposed to ultraviolet radiation than those at ground level because there is less shade and more reflected light. Prolonged UV exposure causes sunburn, premature skin ageing, and increases the risk of skin cancer &mdash; the most common cancer in the UK construction industry. Wear sunscreen (SPF 30+, reapplied every two hours), a hard hat with a neck flap, and long sleeves where practicable. Do not dismiss sun protection as something only for holidays &mdash; construction workers receive some of the highest occupational UV doses of any profession.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Long Shifts and Travel Fatigue</p>
                <p className="text-sm text-white/80">
                  Many tower operatives travel long distances to reach site, then work a full shift before driving home. This combination of travel fatigue, physical work, and the concentration demanded by height work creates a compounding fatigue risk. If you have driven two hours to reach site, you are already more fatigued than someone who lives nearby. Factor this into your fitness-for-work self-assessment, and do not underestimate the additional risk of the return journey when already tired from a day at height.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Noise and Vibration at Height</p>
                <p className="text-sm text-white/80">
                  Noise from power tools, building services, traffic, and other trades can impair communication between team members and mask warning signals. If you cannot hear a colleague calling &ldquo;hands clear&rdquo; because of background noise, the risk of entrapment increases. In high-noise environments, agree visual signals before assembly begins, and consider ear defenders that attenuate noise while still allowing verbal communication. Vibration from power tools used on the platform can also accelerate fatigue in the hands and arms, reducing grip strength over time.
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
          title="Section 1 Knowledge Check"
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
            <Link to="../pasma-module-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../pasma-module-6-section-2">
              Next: Risk Assessment
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}