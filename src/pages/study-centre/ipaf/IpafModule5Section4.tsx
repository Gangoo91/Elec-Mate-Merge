import { ArrowLeft, Move, CheckCircle, AlertTriangle, BookOpen, Zap, Wind, Lock, ShieldCheck, Eye, HardHat, Ban } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const quizQuestions = [
  {
    question: "What is the absolute rule about moving a mobile access tower with people on board?",
    options: [
      "It is allowed for short distances under 2 metres",
      "It is allowed if the person holds on tightly",
      "It is NEVER permitted — zero tolerance, regardless of distance",
      "It is only prohibited above 4 metres height"
    ],
    correctAnswer: 2,
    explanation: "Moving a tower with anyone on board is a zero-tolerance rule. There are NO exceptions — regardless of distance, tower height, urgency, or how securely the person thinks they are holding on. The person must descend completely before the tower is moved."
  },
  {
    question: "Where should you push a mobile access tower when moving it?",
    options: [
      "At mid-height for better leverage",
      "At the top for maximum control",
      "At the base to minimise tipping risk",
      "Anywhere — it makes no difference"
    ],
    correctAnswer: 2,
    explanation: "Always push at the base of the tower. Pushing at mid-height or above creates a lateral force above the centre of gravity, which generates a tipping moment. Pushing at the base keeps the force below the centre of gravity, significantly reducing the risk of overturning."
  },
  {
    question: "What is the maximum wind speed for safely moving a mobile access tower?",
    options: [
      "Any wind speed is acceptable if you are careful",
      "Below Beaufort Force 4 (20-28 km/h)",
      "Below Beaufort Force 6 (39-49 km/h)",
      "Below Beaufort Force 2 (6-11 km/h)"
    ],
    correctAnswer: 1,
    explanation: "Towers should not be moved when wind speed reaches Beaufort Force 4 (20-28 km/h, moderate breeze — loose paper blows around, small branches move). Wind creates lateral force that increases tipping risk during movement. Always check conditions before and during the move."
  },
  {
    question: "What is the typical maximum height for moving a tower on castors?",
    options: [
      "2 metres",
      "4 metres or the manufacturer's specified limit",
      "8 metres",
      "There is no height limit for moving towers"
    ],
    correctAnswer: 1,
    explanation: "As a general guideline, towers should not be moved when the platform height exceeds 4 metres, unless the manufacturer's instructions specify a different limit. Taller towers have a higher centre of gravity and are more susceptible to tipping during movement. Always check the manufacturer's data."
  },
  {
    question: "Before moving a tower, all loose materials must be removed from the platform. Why?",
    options: [
      "To make the tower lighter for moving",
      "Loose materials can fall during movement, striking people below, and unsecured items shift the tower's balance",
      "To prevent theft",
      "It is not necessary if the materials are tied down"
    ],
    correctAnswer: 1,
    explanation: "Loose materials on the platform during movement can fall and strike people below. They also shift during movement, changing the tower's centre of gravity and potentially contributing to overturning. All loose tools, materials, and equipment must be removed or properly secured before the tower is moved."
  },
  {
    question: "What is the minimum number of people required to move a mobile access tower?",
    options: [
      "One person is sufficient",
      "Minimum two people",
      "Minimum four people",
      "It depends on the tower colour"
    ],
    correctAnswer: 1,
    explanation: "A minimum of two people is required to move a tower safely — one at each end to control direction, watch for hazards, and apply braking force if needed. For larger towers or difficult ground conditions, more people may be required. One person alone cannot safely control a tower during movement."
  },
  {
    question: "After moving a tower to a new location, what must be done before anyone climbs it?",
    options: [
      "Nothing — it was inspected before the move",
      "Re-check stability, re-level, lock all castors, verify stabilisers, and re-inspect before use",
      "Just lock the castors",
      "Take a photograph for the records"
    ],
    correctAnswer: 1,
    explanation: "After every move, the tower must be fully re-checked: verify the ground is firm and level, re-level using a spirit level, lock ALL castors, check that stabilisers and outriggers are properly deployed, and conduct a full pre-use inspection. Movement can loosen connections and change the tower's relationship with the ground."
  },
  {
    question: "A colleague suggests moving the tower 'just half a metre' with the operative still on the platform to save time. What should you do?",
    options: [
      "Agree — half a metre is too short to cause problems",
      "Agree — but only if the wind is calm",
      "Refuse — the zero-tolerance rule applies regardless of distance; the person must descend first",
      "Agree — but ask them to crouch down"
    ],
    correctAnswer: 2,
    explanation: "The zero-tolerance rule for moving towers with people on board applies regardless of distance. Even 'just half a metre' can cause the tower to tip if a castor catches a crack, cable, or debris. The potential consequences — a person falling from height — are the same whether the move is 0.5 metres or 50 metres."
  }
];

const quickCheckQuestions = [
  {
    question: "You need to move a tower across a warehouse floor to a new work position. The floor has several cable runs taped across it. What precautions are needed?",
    options: [
      "Roll over the cables slowly",
      "Remove or protect the cables from the route, check the entire path is clear and level, ensure minimum two people, push at the base, and have someone watch for hazards ahead",
      "Just avoid the biggest cables",
      "Move the tower diagonally to cross fewer cables"
    ],
    correctIndex: 1,
    explanation: "Cable runs are a significant hazard — castors can catch on them, causing the tower to stop suddenly and tip. The route must be completely clear before moving. Remove cables, use cable ramps, or choose a different route. A dedicated lookout should walk ahead to identify obstacles, while minimum two people push at the base."
  },
  {
    question: "It is 14:30 on a windy afternoon. The morning was calm but the wind has picked up noticeably — small branches are moving and loose paper is blowing around the site. The tower needs to be repositioned. What should you do?",
    options: [
      "Move the tower quickly before the wind gets worse",
      "Recognise these are Beaufort Force 4 indicators — do not move the tower until wind conditions improve",
      "Add extra weight to the platform to stabilise it",
      "Move the tower but keep it below 2 metres"
    ],
    correctIndex: 1,
    explanation: "Small branches moving and loose paper blowing are indicators of Beaufort Force 4 (moderate breeze, 20-28 km/h). At this wind speed, moving a tower is not safe — the wind creates lateral forces that increase tipping risk during movement. Wait until conditions improve. Never try to 'beat the weather.'"
  },
  {
    question: "After moving a tower to a new position on a tarmac car park, you lock all four castors and the tower seems stable. A colleague says 'That's fine, let's get on with it.' What steps are still missing?",
    options: [
      "Nothing — locked castors on tarmac is sufficient",
      "Re-level using a spirit level, deploy and adjust stabilisers/outriggers, conduct a full pre-use inspection of all components, and check the new position for overhead hazards",
      "Just check the overhead clearance",
      "Take a photograph"
    ],
    correctIndex: 1,
    explanation: "Locking castors is only one step. After every move: (1) Check the new ground is firm and free from voids, (2) Re-level using a spirit level — tarmac car parks often have drainage cambers, (3) Deploy and adjust stabilisers/outriggers for the new position, (4) Conduct a full pre-use inspection — movement can loosen connections, (5) Check overhead clearance at the new location."
  }
];

const faqs = [
  {
    question: "Can I move a tower a very short distance with someone on the platform?",
    answer: "No. This is a zero-tolerance rule with no exceptions. The risk is the same regardless of distance — a castor catching on a crack, cable, or debris can cause the tower to tip instantaneously. The consequences of a person falling from height are equally severe whether the tower is moved 30 centimetres or 30 metres. The person must always descend completely, with both feet on the ground, before the tower is moved."
  },
  {
    question: "What if the manufacturer says the tower can be moved at heights above 4 metres?",
    answer: "Some manufacturers design towers with enhanced castors and wider bases specifically for movement at greater heights. If the manufacturer's instructions explicitly state a higher movement height limit, that limit applies — but only for that specific tower model in the configuration described. Always follow the manufacturer's instructions, which override generic guidance. However, the requirement for no persons on board, minimum two people, pushing at the base, and calm wind conditions still applies regardless of the manufacturer's height limit."
  },
  {
    question: "Can a tower be moved on outdoor ground such as grass or gravel?",
    answer: "Moving a tower on grass, gravel, or other soft/uneven surfaces is significantly more hazardous than on smooth, hard floors. Castors can sink, catch on stones, or become stuck in soft ground. If movement on such surfaces is necessary, assess the route carefully, use boards or plywood to create a firm running surface, increase the number of people assisting, and move slowly with frequent stops to check stability. If the surface is too uneven or soft, dismantle and re-erect at the new position."
  },
  {
    question: "Who is responsible for deciding whether it is safe to move a tower?",
    answer: "The competent person supervising the tower work is responsible for assessing whether conditions are safe for moving. This assessment must consider: wind speed, ground conditions along the entire route, tower height, presence of overhead hazards on the route, availability of sufficient personnel, and confirmation that all persons have descended and all loose materials have been removed. If there is any doubt, the tower should not be moved until conditions improve or the issue is resolved."
  }
];

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export default function IpafModule5Section4() {
  useSEO({
    title: "Moving & Repositioning Towers Safely | Module 5 | IPAF Mobile Scaffold",
    description: "Safe tower moving procedures — pre-move checks, wind limits, zero-tolerance rules, ground conditions, pushing technique, and post-move verification for mobile access towers.",
  });

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="min-h-[44px] min-w-[44px] text-white/70 hover:text-white hover:bg-white/10 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../ipaf-module-5">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-white/40">Module 5 {"\u2022"} Section 4</p>
            <h1 className="text-sm font-semibold text-white truncate">Moving & Repositioning Towers Safely</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Centered Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 mb-4">
            <Move className="h-8 w-8 text-amber-400" />
          </div>
          <div className="flex justify-center mb-3">
            <span className="bg-elec-yellow text-black px-3 py-1 rounded-full text-sm font-semibold">
              Module 5 {"\u2022"} Section 4
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Moving & Repositioning Towers Safely</h2>
          <p className="text-white/60 max-w-xl mx-auto">
            When, how, and under what conditions a mobile access tower can be safely repositioned — and the zero-tolerance rules that must never be broken
          </p>
        </div>

        {/* In 30 Seconds Box */}
        <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-xl p-5 mb-6">
          <h3 className="text-base font-bold text-elec-yellow mb-2 flex items-center gap-2">
            <Zap className="h-4 w-4" />
            In 30 Seconds
          </h3>
          <p className="text-white/80 text-base leading-relaxed">
            NEVER move a tower with anyone on board — zero tolerance, no exceptions, regardless of distance. Before moving: wind must be below Beaufort Force 4, all persons descended, all loose materials removed, height under 4 metres (or manufacturer's limit), and the route must be clear and level. Push at the base with minimum two people. After moving: re-level, lock all castors, check stabilisers, and conduct a full pre-use inspection.
          </p>
        </div>

        {/* On Site Box */}
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-5 mb-8">
          <h3 className="text-base font-bold text-red-400 mb-2 flex items-center gap-2">
            <Ban className="h-4 w-4" />
            On Site — Zero Tolerance Rule
          </h3>
          <p className="text-white/80 text-base leading-relaxed">
            <strong className="text-red-400">NEVER move a tower with people on board.</strong> This is the single most important rule in this section. It applies to every tower, every height, every distance, every situation. There are no exceptions. If someone says "I'll just stay up here while you move it," the answer is always "No — come down first." This rule saves lives.
          </p>
        </div>

        {/* Learning Outcomes */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-10">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-elec-yellow" />
            Learning Outcomes
          </h3>
          <ul className="space-y-3">
            {[
              "State the zero-tolerance rule: NEVER move a tower with anyone on board",
              "List the pre-move conditions that must be satisfied before repositioning",
              "Describe the correct technique for moving a tower — push at the base, minimum two people",
              "Identify wind speed limits and height restrictions for tower movement",
              "Explain the complete post-move verification process before anyone climbs the tower",
              "Recognise hazards along the movement route and how to control them"
            ].map((outcome, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm">{outcome}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 01 — When Is It Safe to Move                         */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-500/20 text-green-400 font-bold text-sm">01</span>
            <h3 className="text-xl font-semibold text-white">When Is It Safe to Move a Tower?</h3>
          </div>
          <div className="border-l-2 border-green-500/40 pl-5 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              A mobile access tower can only be moved when ALL of the following conditions are met. If any single condition is not satisfied, the tower must not be moved.
            </p>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-3 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-green-400" />
                Pre-Move Conditions (ALL Must Be Met)
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                  <div className="bg-red-500/30 rounded-full p-1.5 flex-shrink-0">
                    <Ban className="h-4 w-4 text-red-400" />
                  </div>
                  <div>
                    <p className="text-red-400 font-semibold text-sm">NO ONE on board</p>
                    <p className="text-white/70 text-xs">Zero tolerance — every person must be off the tower with both feet on the ground. No exceptions for distance, height, or urgency.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                  <div className="bg-blue-500/30 rounded-full p-1.5 flex-shrink-0">
                    <Wind className="h-4 w-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-blue-400 font-semibold text-sm">Wind below Beaufort Force 4</p>
                    <p className="text-white/70 text-xs">Moderate breeze (20-28 km/h) — loose paper blows around, small branches move. If you see these signs, do not move the tower.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                  <div className="bg-amber-500/30 rounded-full p-1.5 flex-shrink-0">
                    <AlertTriangle className="h-4 w-4 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-amber-400 font-semibold text-sm">All loose materials removed</p>
                    <p className="text-white/70 text-xs">Every tool, piece of material, and item of equipment must be removed from the platform and any intermediate levels. Unsecured items can fall during movement or shift the centre of gravity.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                  <div className="bg-purple-500/30 rounded-full p-1.5 flex-shrink-0">
                    <Move className="h-4 w-4 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-purple-400 font-semibold text-sm">Height under 4 metres (or manufacturer's limit)</p>
                    <p className="text-white/70 text-xs">The platform height must not exceed 4 metres for movement, unless the manufacturer's instructions specify a higher limit for that specific tower model and configuration.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                  <div className="bg-green-500/30 rounded-full p-1.5 flex-shrink-0">
                    <Eye className="h-4 w-4 text-green-400" />
                  </div>
                  <div>
                    <p className="text-green-400 font-semibold text-sm">Ground route clear and level</p>
                    <p className="text-white/70 text-xs">The entire route from current position to new position must be checked: firm surface, no cables/debris, no slopes, no gaps or holes, no overhead hazards along the route.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 02 — The Zero-Tolerance Rule                         */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-500/20 text-red-400 font-bold text-sm">02</span>
            <h3 className="text-xl font-semibold text-white">The Zero-Tolerance Rule</h3>
          </div>
          <div className="border-l-2 border-red-500/40 pl-5 space-y-4">
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-red-400 text-sm mb-3 flex items-center gap-2">
                <Ban className="h-4 w-4" />
                NEVER Move a Tower with People on Board
              </h4>
              <p className="text-white/80 text-sm leading-relaxed mb-3">
                This is a zero-tolerance rule. It is not a guideline, not a recommendation, and not open to interpretation. It applies in every situation:
              </p>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>"It's only half a metre"</strong> — a castor catching on a crack or cable can tip the tower in any distance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>"The tower is only 2 metres high"</strong> — a fall from 2 metres can cause fatal head injuries</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>"They'll hold on tight"</strong> — sudden stops generate forces far beyond grip strength</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>"It'll save 10 minutes"</strong> — saving time is never a justification for risking a life</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>"We've always done it this way"</strong> — past luck is not a safety system</span>
                </li>
              </ul>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              If anyone asks you to move a tower while someone is on it, or if you see this happening, you have a legal duty to stop the activity immediately. Under the Health and Safety at Work Act 1974, both the person directing the move and the person remaining on the tower are committing offences.
            </p>
          </div>
        </section>

        {/* InlineCheck 1 */}
        <InlineCheck
          question="An experienced operative says: 'I've been moving towers with people on board for 20 years and nothing has ever happened. It's fine as long as you're careful.' How should you respond?"
          options={[
            "Accept their experience — 20 years proves it is safe",
            "Ask them to sign a disclaimer",
            "Explain that past luck does not equal safety, the rule is zero tolerance, and continuing this practice puts everyone at legal and physical risk",
            "Report them after the job is finished"
          ]}
          correctIndex={2}
          explanation="Survivorship bias ('nothing has happened to me yet') is not a safety argument. The zero-tolerance rule exists because the consequences of a single failure are catastrophic. Address the behaviour immediately, calmly, and firmly. If they refuse to comply, escalate to the site manager. You have a legal duty not to walk past unsafe behaviour."
        />

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 03 — How to Move a Tower Safely                      */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 font-bold text-sm">03</span>
            <h3 className="text-xl font-semibold text-white">How to Move a Tower Safely</h3>
          </div>
          <div className="border-l-2 border-blue-500/40 pl-5 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              Once all pre-move conditions are confirmed, the tower can be moved using the following procedure.
            </p>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-3">Step-by-Step Moving Procedure</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                  <span className="bg-blue-500/20 text-blue-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                  <div>
                    <p className="text-white font-medium">Confirm all persons have descended</p>
                    <p className="text-white/70">Visually verify no one is on the tower at any level — check platforms, ladders, and intermediate levels.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                  <span className="bg-blue-500/20 text-blue-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                  <div>
                    <p className="text-white font-medium">Remove all loose materials from platform</p>
                    <p className="text-white/70">Clear tools, materials, equipment, and rubbish from all levels. Store safely at ground level.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                  <span className="bg-blue-500/20 text-blue-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                  <div>
                    <p className="text-white font-medium">Check wind conditions</p>
                    <p className="text-white/70">Confirm wind is below Beaufort Force 4. If in doubt, do not move.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                  <span className="bg-blue-500/20 text-blue-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">4</span>
                  <div>
                    <p className="text-white font-medium">Check and clear the route</p>
                    <p className="text-white/70">Walk the entire route first. Check for cables, debris, slopes, holes, uneven surfaces, and overhead hazards along the path.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                  <span className="bg-blue-500/20 text-blue-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">5</span>
                  <div>
                    <p className="text-white font-medium">Retract stabilisers and outriggers</p>
                    <p className="text-white/70">If fitted, retract or fold stabilisers and outriggers so they clear ground obstructions during the move.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                  <span className="bg-blue-500/20 text-blue-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">6</span>
                  <div>
                    <p className="text-white font-medium">Unlock castors</p>
                    <p className="text-white/70">Release all castor brakes. Check that all castors rotate and swivel freely.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                  <span className="bg-blue-500/20 text-blue-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">7</span>
                  <div>
                    <p className="text-white font-medium">Push at the BASE — minimum 2 people</p>
                    <p className="text-white/70">Apply force at the base of the tower, NOT mid-height or above. One person at each end for control and hazard spotting. Move slowly and steadily.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                  <span className="bg-blue-500/20 text-blue-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">8</span>
                  <div>
                    <p className="text-white font-medium">Watch for overhead hazards during transit</p>
                    <p className="text-white/70">A dedicated lookout should watch for power lines, beams, pipe bridges, and other overhead obstructions along the route. Stop if any hazard is identified.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-2">Why Push at the Base?</h4>
              <p className="text-white/70 text-sm leading-relaxed">
                Pushing at the base keeps the applied force below the tower's centre of gravity. This creates a rolling motion rather than a tipping motion. Pushing at mid-height or above creates a moment arm — the higher the push point, the greater the tipping force relative to the rolling force. On an uneven surface, a tower pushed at mid-height can tip before anyone has time to react.
              </p>
            </div>
          </div>
        </section>

        {/* InlineCheck 2 */}
        <InlineCheck
          question="Two operatives are moving a 3.5-metre tower across a warehouse floor. One is pushing at the base while the other pushes at shoulder height (approximately 1.5 metres). Is this correct?"
          options={[
            "Yes — one high and one low provides good balance",
            "No — BOTH people must push at the base to minimise tipping risk",
            "Yes — shoulder height is close enough to the base",
            "No — three people are required"
          ]}
          correctIndex={1}
          explanation="Both people must push at the base. The person pushing at 1.5 metres is applying force above the centre of gravity of a 3.5-metre tower, creating a tipping moment. Both operatives should be at the base — one at each end — pushing in the same direction, low down, while maintaining a clear view of the route."
        />

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 04 — Ground Conditions for Movement                  */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 font-bold text-sm">04</span>
            <h3 className="text-xl font-semibold text-white">Ground Surface Requirements</h3>
          </div>
          <div className="border-l-2 border-amber-500/40 pl-5 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              The ground surface along the entire movement route must be capable of supporting the tower's castors without sinking, catching, or causing instability.
            </p>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-2">Surface Suitability</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-green-400 font-semibold">Suitable Surfaces</p>
                  <ul className="text-white/70 space-y-1 mt-1 text-xs">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Smooth concrete (warehouse, factory floor)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Level tarmac in good condition</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Smooth paving slabs (no lips between slabs)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Level steel decking</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-red-400 font-semibold">Unsuitable / Hazardous Surfaces</p>
                  <ul className="text-white/70 space-y-1 mt-1 text-xs">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Soft ground, grass, or mud</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Loose gravel or aggregate</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Slopes or cambers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Surfaces with cables, hoses, or debris</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Cracked or broken paving</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Wet or icy surfaces</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              If the surface along the route is unsuitable for castor movement, the options are: (1) Create a firm path using plywood boards, (2) Choose a different route on a suitable surface, or (3) Dismantle the tower and re-erect at the new position. Never force a tower across an unsuitable surface.
            </p>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 05 — After Moving: Post-Move Verification            */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold text-sm">05</span>
            <h3 className="text-xl font-semibold text-white">After Moving: Post-Move Verification</h3>
          </div>
          <div className="border-l-2 border-emerald-500/40 pl-5 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              After repositioning, the tower must be thoroughly checked before anyone climbs it. Movement can loosen connections, and the new location may have different ground conditions or overhead clearances.
            </p>
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-3 flex items-center gap-2">
                <Lock className="h-4 w-4 text-emerald-400" />
                Post-Move Checklist
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                  <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">Re-check ground stability</p>
                    <p className="text-white/70 text-xs">Verify the new position is on firm, level ground. Check for voids, drains, soft spots, or uneven surfaces beneath the castors.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                  <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">Re-level using a spirit level</p>
                    <p className="text-white/70 text-xs">The tower must be level in both directions. Use the adjustable base legs to achieve level — do NOT use packing materials under the castors.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                  <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">Lock ALL castors</p>
                    <p className="text-white/70 text-xs">Every castor must be locked — check each one individually. Apply the brake and try to push the tower to verify the locks are holding.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                  <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">Deploy and adjust stabilisers/outriggers</p>
                    <p className="text-white/70 text-xs">Re-deploy stabilisers or outriggers and adjust for the new ground level. Verify they are making firm contact with the ground.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                  <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">Conduct a full pre-use inspection</p>
                    <p className="text-white/70 text-xs">Check all frames, braces, platforms, guardrails, toeboards, and connections. Movement can loosen spigot pins, brace hooks, and platform catches.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                  <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">Check overhead clearance at new position</p>
                    <p className="text-white/70 text-xs">Verify there are no power lines, beams, ducts, or other overhead obstructions at the new location. The overhead environment may be different from the previous position.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 06 — Wind Conditions for Movement                    */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 font-bold text-sm">06</span>
            <h3 className="text-xl font-semibold text-white">Wind Conditions & Beaufort Scale</h3>
          </div>
          <div className="border-l-2 border-sky-500/40 pl-5 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              Wind creates lateral force on the tower structure during movement, significantly increasing the risk of overturning. The Beaufort Scale provides a practical way to assess wind conditions on site without instruments.
            </p>
            <div className="bg-sky-500/10 border border-sky-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-3">Beaufort Scale — Key Levels for Tower Work</h4>
              <div className="space-y-2 text-sm">
                <div className="bg-black/20 rounded-lg p-3 flex items-start gap-3">
                  <span className="bg-green-500/20 text-green-400 rounded px-2 py-0.5 text-xs font-bold flex-shrink-0">F2</span>
                  <div>
                    <p className="text-green-400 font-medium">Light Breeze (6-11 km/h)</p>
                    <p className="text-white/70 text-xs">Wind felt on face, leaves rustle. Safe to work and move towers.</p>
                  </div>
                </div>
                <div className="bg-black/20 rounded-lg p-3 flex items-start gap-3">
                  <span className="bg-amber-500/20 text-amber-400 rounded px-2 py-0.5 text-xs font-bold flex-shrink-0">F3</span>
                  <div>
                    <p className="text-amber-400 font-medium">Gentle Breeze (12-19 km/h)</p>
                    <p className="text-white/70 text-xs">Leaves and small twigs in constant motion, light flags extended. Caution — monitor conditions closely.</p>
                  </div>
                </div>
                <div className="bg-black/20 rounded-lg p-3 flex items-start gap-3">
                  <span className="bg-red-500/20 text-red-400 rounded px-2 py-0.5 text-xs font-bold flex-shrink-0">F4</span>
                  <div>
                    <p className="text-red-400 font-medium">Moderate Breeze (20-28 km/h) — STOP</p>
                    <p className="text-white/70 text-xs">Loose paper blows around, small branches move. <strong className="text-white">Do not move towers. Consider stopping all tower work.</strong></p>
                  </div>
                </div>
                <div className="bg-black/20 rounded-lg p-3 flex items-start gap-3">
                  <span className="bg-red-500/20 text-red-400 rounded px-2 py-0.5 text-xs font-bold flex-shrink-0">F5+</span>
                  <div>
                    <p className="text-red-400 font-medium">Fresh Breeze and Above (29+ km/h)</p>
                    <p className="text-white/70 text-xs">Small trees sway. <strong className="text-white">All tower work must stop. Secure or dismantle the tower if conditions are expected to worsen.</strong></p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-2">Wind Gusts vs Average Speed</h4>
              <p className="text-white/70 text-sm leading-relaxed">
                Remember that gusts can be 50-100% stronger than the average wind speed. A site reporting an average of Beaufort Force 3 may experience gusts at Force 5 or 6. Buildings and structures can also channel wind, creating local gusts significantly stronger than the general conditions. Always use on-site judgement alongside weather reports.
              </p>
            </div>
          </div>
        </section>

        {/* InlineCheck 3 */}
        <InlineCheck
          question="After moving a tower to a new position, an operative locks the castors and says 'right, up you go.' No other checks have been done. Is the tower ready for use?"
          options={[
            "Yes — locked castors mean the tower is secure",
            "No — the tower must also be re-levelled, stabilisers re-deployed, a full pre-use inspection conducted, and overhead clearance verified",
            "Yes — if the tower was inspected before the move it does not need re-checking",
            "No — but only if the tower was moved more than 10 metres"
          ]}
          correctIndex={1}
          explanation="Locking castors is necessary but far from sufficient. After every move: (1) Check the new ground, (2) Re-level with a spirit level, (3) Re-deploy stabilisers/outriggers, (4) Conduct a full pre-use inspection of all connections (movement can loosen them), and (5) Verify overhead clearance at the new position. Only then is the tower ready for use."
        />

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 07 — Special Situations                              */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 font-bold text-sm">07</span>
            <h3 className="text-xl font-semibold text-white">Special Situations & Edge Cases</h3>
          </div>
          <div className="border-l-2 border-purple-500/40 pl-5 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              Some situations require additional thought beyond the standard moving procedure. Knowing how to handle these edge cases prevents improvisation that could lead to accidents.
            </p>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-3">Common Edge Cases</h4>
              <div className="space-y-3">
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-purple-400 font-semibold text-sm">Moving Through Doorways</p>
                  <p className="text-white/70 text-xs mt-1">Measure the doorway height and width before attempting to move the tower through. If the tower is too tall, it must be partially dismantled — never tilt or angle a tower to fit through an opening. Check for door frame thresholds that could catch castors.</p>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-purple-400 font-semibold text-sm">Moving Between Indoor and Outdoor</p>
                  <p className="text-white/70 text-xs mt-1">Transitioning from a smooth indoor floor to an outdoor surface requires extra caution. The outdoor surface may be uneven, wet, or sloped. Check the transition point for lips, ramps, or level changes that could catch castors or cause the tower to tip.</p>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-purple-400 font-semibold text-sm">Moving Near Vehicle Traffic</p>
                  <p className="text-white/70 text-xs mt-1">If the tower route crosses or runs alongside a vehicle traffic route, additional controls are needed: banksman, temporary traffic management, high-visibility clothing, and coordination with the site traffic management plan. A vehicle striking a tower being moved would be catastrophic.</p>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-purple-400 font-semibold text-sm">When Dismantling Is Safer</p>
                  <p className="text-white/70 text-xs mt-1">If the move distance is long, the route has multiple obstacles, the surface changes significantly, or the tower must pass under overhead hazards, it may be safer and quicker to dismantle, transport the components, and re-erect at the new location rather than rolling the assembled tower.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  Key Rules Summary                                            */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-elec-yellow" />
            Key Rules — Quick Reference
          </h3>
          <div className="bg-gradient-to-br from-elec-yellow/10 to-amber-500/10 border border-elec-yellow/20 rounded-xl p-5">
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                <span className="text-red-400 font-bold text-lg flex-shrink-0">1</span>
                <p className="text-white/80"><strong className="text-red-400">NEVER</strong> move a tower with anyone on board — zero tolerance, no exceptions</p>
              </div>
              <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                <span className="text-amber-400 font-bold text-lg flex-shrink-0">2</span>
                <p className="text-white/80">Push at the <strong className="text-amber-400">BASE</strong>, not mid-height or above</p>
              </div>
              <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                <span className="text-blue-400 font-bold text-lg flex-shrink-0">3</span>
                <p className="text-white/80">Minimum <strong className="text-blue-400">2 people</strong> to move any tower</p>
              </div>
              <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                <span className="text-green-400 font-bold text-lg flex-shrink-0">4</span>
                <p className="text-white/80">Wind must be <strong className="text-green-400">below Beaufort Force 4</strong></p>
              </div>
              <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                <span className="text-purple-400 font-bold text-lg flex-shrink-0">5</span>
                <p className="text-white/80">Platform height must be <strong className="text-purple-400">under 4 metres</strong> (or manufacturer's specified limit)</p>
              </div>
              <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                <span className="text-cyan-400 font-bold text-lg flex-shrink-0">6</span>
                <p className="text-white/80">After every move: <strong className="text-cyan-400">re-level, lock castors, deploy stabilisers, full inspection</strong></p>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  Practical Guidance                                           */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <HardHat className="h-5 w-5 text-green-400" />
            Practical Guidance
          </h3>
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-medium text-white text-sm">Pre-Move Quick Check</h4>
                <ul className="space-y-1 text-xs text-white/70">
                  <li>&#10003; All persons off the tower — visually confirmed</li>
                  <li>&#10003; All loose materials removed from all levels</li>
                  <li>&#10003; Wind below Beaufort Force 4</li>
                  <li>&#10003; Platform height under 4m (or manufacturer's limit)</li>
                  <li>&#10003; Route walked and cleared of obstacles</li>
                  <li>&#10003; Overhead hazards checked along route</li>
                  <li>&#10003; Minimum 2 people available</li>
                  <li>&#10003; Stabilisers retracted if required</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium text-white text-sm">Post-Move Quick Check</h4>
                <ul className="space-y-1 text-xs text-white/70">
                  <li>&#10003; Ground firm and level at new position</li>
                  <li>&#10003; Tower re-levelled using spirit level</li>
                  <li>&#10003; ALL castors locked — each one tested</li>
                  <li>&#10003; Stabilisers/outriggers re-deployed and adjusted</li>
                  <li>&#10003; Full pre-use inspection of all components</li>
                  <li>&#10003; Overhead clearance verified at new location</li>
                  <li>&#10003; No power lines within 15 metres</li>
                  <li>&#10003; Exclusion zone re-established at new position</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  FAQs                                                         */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <h3 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h3>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h4 className="font-medium text-white mb-2 text-sm">{faq.question}</h4>
                <p className="text-sm text-white/60 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  Quiz                                                         */}
        {/* ------------------------------------------------------------ */}
        <Quiz
          title="Section 4 — Moving & Repositioning Towers Safely"
          questions={quizQuestions}
        />

        {/* ------------------------------------------------------------ */}
        {/*  Navigation Footer                                            */}
        {/* ------------------------------------------------------------ */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 pt-8 border-t border-white/10 mt-10">
          <Button
            variant="outline"
            className="min-h-[44px] border-white/20 text-black bg-white/90 hover:bg-white touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../ipaf-module-5-section-3">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous: Rescue Procedures
            </Link>
          </Button>
          <Button
            className="min-h-[44px] bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../ipaf-module-6">
              Next: Module 6 — Mock Exam
              <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
