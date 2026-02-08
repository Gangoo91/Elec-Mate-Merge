import { ArrowLeft, Move, CheckCircle, AlertTriangle, Route, ShieldAlert, ClipboardList } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "pasma-move-persons-onboard",
    question: "Can a mobile scaffold tower ever be moved with a person on the platform?",
    options: [
      "Yes, if they hold on tightly to the guardrails",
      "Yes, if the tower is below 4 metres in height",
      "No — this is a zero-tolerance offence and must never happen",
      "Yes, if the move is less than 2 metres"
    ],
    correctIndex: 2,
    explanation: "Moving a tower with anyone on the platform is absolutely prohibited. It is a zero-tolerance offence on virtually all construction sites and can result in immediate dismissal, prosecution, and serious injury or death from overturning."
  },
  {
    id: "pasma-move-height-limit",
    question: "What is the typical maximum height a tower can be when being moved?",
    options: [
      "2 metres",
      "4 metres (or the manufacturer's specified limit)",
      "6 metres",
      "There is no height limit for moving"
    ],
    correctIndex: 1,
    explanation: "The general maximum height for moving a mobile tower is 4 metres, though the manufacturer's instruction manual may specify a different limit. Towers become increasingly unstable at height when subjected to the forces involved in moving."
  },
  {
    id: "pasma-post-move-check",
    question: "What is the FIRST thing to do after repositioning a tower in its new location?",
    options: [
      "Start work immediately to avoid delays",
      "Lock all four castors and verify the tower is level",
      "Add extra height to reach the new work area",
      "Remove the stabilisers to make room"
    ],
    correctIndex: 1,
    explanation: "After repositioning, the immediate priority is to lock all four castors and verify that the tower is level. An unlocked or unlevel tower can overturn when loaded. No one should access the tower until all castors are locked and stability is confirmed."
  }
];

const faqs = [
  {
    question: "How many people are needed to move a mobile scaffold tower?",
    answer: "A minimum of two people are required to move a tower safely. One person should push or pull the tower at base level while at least one other person acts as a spotter, watching for overhead hazards, obstructions, and other workers in the path. For larger towers or longer moves, more people may be needed to maintain control."
  },
  {
    question: "Can I push a tower from a higher level rather than from the base?",
    answer: "No. You must always push or pull a tower from the base level only. Pushing from a higher point raises the centre of gravity of the applied force, dramatically increasing the risk of overturning. The force should be applied as low as possible, ideally at or near castor height."
  },
  {
    question: "What wind speed prevents me from moving a tower?",
    answer: "Towers must not be moved in wind speeds above Beaufort Force 4, which corresponds to approximately 13-18 mph. At this level you will see small branches moving and loose paper being lifted. If in doubt, use a handheld anemometer to check the wind speed. The manufacturer's instructions may specify a lower limit."
  },
  {
    question: "Do I need to update the risk assessment when I move a tower to a new position?",
    answer: "Yes. The risk assessment must be reviewed and updated whenever the tower is moved to a new position. The new location may present different hazards: different overhead services, different ground conditions, different proximity to traffic or other work activities. A fresh assessment ensures the new position is safe for the tower and its users."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which of the following conditions must ALL be met before a tower can be moved?",
    options: [
      "Tower below 4m, one person available, castors locked",
      "No persons on tower, wind below F4, height within limit, route clear, materials removed",
      "Supervisor present, tower empty, weather dry",
      "Daylight hours, ground wet, one castor unlocked"
    ],
    correctAnswer: 1,
    explanation: "Before moving, ALL of the following must be confirmed: no persons on the tower, wind below Beaufort Force 4, tower height within the moving limit, route clear and firm, and all tools and materials removed from the platform."
  },
  {
    id: 2,
    question: "Why must all tools and materials be removed from the platform before moving a tower?",
    options: [
      "To prevent theft during the move",
      "To reduce weight and prevent items falling from height during movement",
      "Because tools must be cleaned before they are moved",
      "To allow the platform to be folded"
    ],
    correctAnswer: 1,
    explanation: "Loose tools and materials on the platform can fall from height during movement, striking people below. They also raise the tower's centre of gravity and can shift during transit, affecting stability."
  },
  {
    id: 3,
    question: "At what level should force be applied when pushing a tower to a new position?",
    options: [
      "At the midpoint of the tower for leverage",
      "At the top, using a rope",
      "At the base level, as low as possible",
      "At any convenient height"
    ],
    correctAnswer: 2,
    explanation: "Force must always be applied at the base level. Pushing from a higher point creates a turning moment that can overturn the tower. The lower the push point, the more stable the tower remains during movement."
  },
  {
    id: 4,
    question: "What is the role of the spotter during a tower move?",
    options: [
      "To stand on the platform and direct the push",
      "To watch for overhead hazards, obstructions, and other workers in the route",
      "To carry the tools separately",
      "To record the move in the site diary"
    ],
    correctAnswer: 1,
    explanation: "The spotter walks alongside or ahead of the moving tower, watching for overhead hazards such as cables and beams, ground-level obstructions, other workers, and any changes in ground surface that could affect the move."
  },
  {
    id: 5,
    question: "After repositioning a tower, which of the following must be checked BEFORE anyone climbs it?",
    options: [
      "Only that the castors are locked",
      "Castors locked, tower level, no overhead hazards, all components secure",
      "Only that the platform is in place",
      "Only that the ground is dry"
    ],
    correctAnswer: 1,
    explanation: "A full post-move check is required: all castors must be locked, the tower must be level, new overhead hazards must be checked, and all components must be verified as secure. Moving can loosen connections, so a thorough check is essential."
  },
  {
    id: 6,
    question: "Moving a tower with a person on the platform is classified as what on most UK construction sites?",
    options: [
      "Acceptable if they are holding on",
      "A minor procedural breach",
      "A zero-tolerance offence leading to immediate removal from site",
      "Permitted for moves under 1 metre"
    ],
    correctAnswer: 2,
    explanation: "Moving a tower with anyone on the platform is a zero-tolerance offence on most UK construction sites. It can lead to immediate removal from site, disciplinary action, and prosecution. The risk of the tower overturning with a person at height is extremely serious."
  },
  {
    id: 7,
    question: "Why should the route be surveyed BEFORE moving a tower?",
    options: [
      "To check if there is a shorter route",
      "To identify floor transitions, door widths, overhead hazards, and obstructions",
      "To count the number of workers in the area",
      "To determine if a permit is needed"
    ],
    correctAnswer: 1,
    explanation: "Route surveys identify potential hazards such as floor transitions (thresholds, ramps), narrow door widths that the tower cannot pass through, overhead cables or low beams, and obstructions that need to be removed before the move."
  },
  {
    id: 8,
    question: "What documentation should be completed after relocating a tower?",
    options: [
      "No documentation is needed for a simple move",
      "Only a text message to the site manager",
      "Update the inspection log, inform site management, update the risk assessment, and re-inspect",
      "A new PASMA card application"
    ],
    correctAnswer: 2,
    explanation: "After relocation, the inspection log must be updated to record the move, site management must be informed of the new position, the risk assessment must be reviewed for the new location, and a full re-inspection must be completed."
  }
];

export default function PasmaModule4Section2() {
  useSEO({
    title: "Moving & Repositioning | PASMA Module 4.2",
    description: "Safe procedures for moving and repositioning mobile scaffold towers including pre-move conditions, route planning, post-move verification, and zero-tolerance rules.",
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
            <Link to="../pasma-module-4">
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
            <Move className="h-7 w-7 text-elec-yellow" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/20 mb-3 mx-auto">
            <span className="text-elec-yellow text-xs font-semibold">MODULE 4 &middot; SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Moving &amp; Repositioning
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Safe procedures for moving mobile scaffold towers including pre-move conditions, route planning, post-move verification, and absolute rules that must never be broken
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Never move</strong> with anyone on the platform</li>
              <li><strong>Max height:</strong> 4m or manufacturer&rsquo;s limit</li>
              <li><strong>Push at base</strong> &mdash; never from height</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Before:</strong> Survey route, check conditions, remove materials</li>
              <li><strong>During:</strong> Push at base, spotter watching overhead, move slowly</li>
              <li><strong>After:</strong> Lock castors, check level, re-inspect, update records</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "State all conditions that must be met before moving a tower",
              "Describe the correct method for pushing a tower safely",
              "Explain post-move verification requirements",
              "Identify zero-tolerance rules for tower movement",
              "Plan a safe route for tower relocation",
              "Understand documentation requirements after repositioning"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: When Can a Tower Be Moved? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            When Can a Tower Be Moved?
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A mobile scaffold tower can only be moved when a specific set of conditions
                are <strong>all</strong> met simultaneously. If even one condition is not
                satisfied, the tower must not be moved. There are no partial exceptions and
                no workarounds.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Key Point:</strong> Moving a tower is not
                  simply a case of unlocking the castors and pushing. Every move is a planned
                  operation that requires a pre-move check, a clear route, the right number of
                  people, and post-move verification. Treat every tower move as a distinct work
                  activity with its own hazards.
                </p>
              </div>

              <p>
                The Work at Height Regulations 2005 require that work equipment used at height
                is stable at all times. Moving a tower inherently introduces instability &mdash;
                forces acting on the structure, uneven ground transitions, and the risk of
                striking obstacles. This is why the pre-move conditions are so strict.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Who Decides If a Tower Can Be Moved?</p>
                <p className="text-sm text-white/80">
                  The decision to move a tower rests with the competent person in charge of the
                  tower. This is typically the PASMA-trained operative who assembled the tower or
                  the site tower coordinator. The decision must be based on a check of all the
                  pre-move conditions, not on convenience or time pressure.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Pre-Move Conditions Checklist */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Pre-Move Conditions Checklist
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Every single condition on this checklist must be confirmed as true before the
                tower is moved. This is not a &ldquo;best practice&rdquo; recommendation &mdash;
                it is a mandatory set of requirements. If any condition is not met, the tower
                stays where it is.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-3">ALL Must Be True</p>
                <div className="space-y-2 text-sm text-white/80">
                  <p><strong className="text-white">1. No persons on the tower:</strong> Nobody may be on the platform, on the access system, or anywhere on the tower structure during a move. Zero tolerance.</p>
                  <p><strong className="text-white">2. Wind below Beaufort Force 4:</strong> Approximately 13&ndash;18 mph. If small branches are moving or loose paper is being lifted, do not move the tower.</p>
                  <p><strong className="text-white">3. Tower height within the moving limit:</strong> Maximum 4 metres overall height, or the lower limit specified by the manufacturer. If the tower exceeds this, it must be partially dismantled first.</p>
                  <p><strong className="text-white">4. All tools and materials removed:</strong> Nothing should remain on the platform. Loose items can fall during movement, and they raise the centre of gravity.</p>
                  <p><strong className="text-white">5. Route clear and surveyed:</strong> The entire route from current to new position must be free of obstructions, and the ground must be firm and level throughout.</p>
                  <p><strong className="text-white">6. Ground firm and level:</strong> The route must support the tower&rsquo;s weight. Soft ground, mud, gravel, and slopes are all hazards.</p>
                  <p><strong className="text-white">7. No overhead hazards on route:</strong> Check for overhead cables, beams, pipework, lighting, and any other obstructions above the tower&rsquo;s height on the intended path.</p>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Warning</p>
                </div>
                <p className="text-sm text-white/80">
                  Stabilisers and outriggers must be retracted or removed before moving. A tower
                  cannot be moved with stabilisers extended &mdash; they will catch on ground
                  obstructions and can overturn the tower. However, if the manufacturer requires
                  stabilisers for the tower to be stable, the tower height must be reduced until
                  stabilisers are no longer required before moving.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: How to Move a Tower Safely */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            How to Move a Tower Safely
          </h2>
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Once all pre-move conditions have been confirmed, the tower can be moved using
                the following procedure. The move should be slow, controlled, and stopped
                immediately if any problem arises.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-3">Moving Procedure</p>
                <div className="space-y-2 text-sm text-white/80">
                  <p><strong className="text-white">Step 1:</strong> Unlock all four castors. Verify each one is fully disengaged from its brake.</p>
                  <p><strong className="text-white">Step 2:</strong> Position a minimum of two people at the base of the tower. One pushes, one acts as spotter.</p>
                  <p><strong className="text-white">Step 3:</strong> Push the tower at base level only. Apply force as low as possible, ideally at or near the bottom frame members.</p>
                  <p><strong className="text-white">Step 4:</strong> Move slowly and steadily. Sudden movements or rapid changes in direction can destabilise the tower.</p>
                  <p><strong className="text-white">Step 5:</strong> The spotter walks ahead or alongside, watching for overhead hazards, ground-level obstructions, and other personnel in the path.</p>
                  <p><strong className="text-white">Step 6:</strong> Maintain clear verbal communication throughout the move. Use commands like &ldquo;moving&rdquo;, &ldquo;stop&rdquo;, &ldquo;overhead&rdquo;, and &ldquo;clear&rdquo;.</p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Why Push at Base Level?</p>
                <p className="text-sm text-white/80">
                  Pushing a tower from a higher point creates a turning moment around the base.
                  The higher the push point, the greater the turning moment, and the greater the
                  risk of overturning. Pushing at the base keeps the force line close to the
                  ground, minimising the overturning moment. Even a moderate push at mid-height
                  can overturn a tower on an uneven surface.
                </p>
              </div>

              <p>
                If the tower needs to pass through a doorway, measure the doorway width and the
                tower width (including any projecting components) before attempting to pass
                through. Forcing a tower through a tight opening can damage the tower structure
                and jam the castors.
              </p>
            </div>
          </div>
        </section>

        {/* Section 04: Post-Move Verification */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Post-Move Verification
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Repositioning a tower subjects its structure to forces it does not experience
                when stationary. Vibrations from uneven ground, impacts from obstacles, and
                the forces of pushing and stopping can all loosen connections. A thorough
                post-move check is therefore essential before anyone climbs the tower.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-3">Post-Move Checklist</p>
                <div className="space-y-2 text-sm text-white/80">
                  <p><strong className="text-white">Lock all castors:</strong> Every castor must be locked and checked. Test each one by trying to push the tower &mdash; it should not roll.</p>
                  <p><strong className="text-white">Check level:</strong> Use a spirit level on the platform or check the base frame. The tower must be plumb. Adjust leg screws if fitted.</p>
                  <p><strong className="text-white">Verify stability:</strong> Gently push the tower at waist height. It should feel rigid with no excessive sway. If it feels unstable, do not use it.</p>
                  <p><strong className="text-white">Check for new overhead hazards:</strong> The new position may have different overhead services, lighting, cables, or structural elements. Confirm safe clearance.</p>
                  <p><strong className="text-white">Re-inspect all components:</strong> Check that frames, braces, platforms, and guardrails have not loosened during the move. Tighten or re-seat as needed.</p>
                  <p><strong className="text-white">Confirm braces are secure:</strong> Diagonal and horizontal braces can work loose during movement. Verify every connection.</p>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-red-400 mb-2">Never Skip the Post-Move Check</p>
                <p className="text-sm text-white/80">
                  A tower that was perfectly safe in its original position may be dangerous in its
                  new one. Different ground conditions, overhead services, proximity to traffic,
                  and loosened connections from the move all create new hazards. The post-move
                  check is not optional &mdash; it is a mandatory safety step.
                </p>
              </div>

              <p>
                If the tower has been moved to a position where stabilisers or outriggers are
                required (e.g. on a softer surface or at a greater height), these must be fitted
                and adjusted before the tower is used. Re-attach any stabilisers that were
                removed for the move.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Zero-Tolerance Rules */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Zero-Tolerance Rules
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Certain actions during tower movement are so dangerous that they are treated as
                zero-tolerance offences across the construction industry. These rules are
                absolute &mdash; there are no circumstances, no matter how urgent the job, where
                they can be broken.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldAlert className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Absolute Prohibitions</p>
                </div>
                <div className="space-y-3 text-sm text-white/80">
                  <div>
                    <p className="font-medium text-white">NEVER move with anyone on the tower</p>
                    <p>This is the most dangerous act associated with mobile towers. The forces of
                    movement, combined with the height of the person, create an extreme overturning
                    risk. On most UK construction sites this is treated as an immediate dismissal
                    offence. Prosecution under HSWA 1974 Section 7 is common.</p>
                  </div>
                  <div>
                    <p className="font-medium text-white">NEVER move in wind above Beaufort Force 4</p>
                    <p>Wind acting on the tower during movement significantly increases the
                    overturning moment. The tower is already less stable during movement because
                    the castors are unlocked. Adding wind forces on top of movement forces can
                    easily cause collapse.</p>
                  </div>
                  <div>
                    <p className="font-medium text-white">NEVER move above the manufacturer&rsquo;s moving height limit</p>
                    <p>The maximum moving height (typically 4 metres) is calculated by the
                    manufacturer based on the tower&rsquo;s stability characteristics. Exceeding
                    this height during movement dramatically increases the risk of overturning
                    because the centre of gravity is too high relative to the base.</p>
                  </div>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Warning</p>
                </div>
                <p className="text-sm text-white/80">
                  &ldquo;We only need to move it a couple of metres&rdquo; is the most common
                  justification given for breaking these rules. Distance is irrelevant. A tower
                  can overturn in a fraction of a second, even during a move of less than one
                  metre. The rules apply to every move, regardless of distance.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Consequences of Breaking Zero-Tolerance Rules</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Immediate removal from site (most main contractors)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Disciplinary action up to and including dismissal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Prosecution under HSWA 1974 and the Work at Height Regulations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Possible imprisonment for individuals (up to 2 years)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Civil claims for damages if injury results</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Loss of CSCS/PASMA card following conviction</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Route Planning for Tower Moves */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Route Planning for Tower Moves
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Before moving a tower, the entire route from the current position to the new
                position must be surveyed on foot. The person carrying out the survey should
                walk the route looking for every potential hazard, measuring critical clearances,
                and identifying any obstacles that need to be removed.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-3">Route Survey Checklist</p>
                <div className="space-y-2 text-sm text-white/80">
                  <p><strong className="text-white">Floor transitions:</strong> Thresholds, expansion joints, ramps, steps, changes from concrete to tarmac, carpet edges, raised cable covers. Any change in level or surface can jam castors.</p>
                  <p><strong className="text-white">Ramps and slopes:</strong> Even gentle slopes can cause a tower to roll uncontrolled. If a slope cannot be avoided, additional people are needed to control the speed.</p>
                  <p><strong className="text-white">Door widths:</strong> Measure the tower width including any projecting components and compare with every doorway on the route. Remember that stabiliser brackets may project beyond the base frame.</p>
                  <p><strong className="text-white">Other workers:</strong> Identify work areas along the route. Inform other trades of the planned move and timing. Establish temporary exclusion zones if needed.</p>
                  <p><strong className="text-white">Vehicle movements:</strong> On sites with vehicle traffic, coordinate the move with the traffic management plan. Use a banksman if the route crosses a vehicle route.</p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Route className="h-5 w-5 text-cyan-400" />
                  <p className="text-sm font-medium text-cyan-400">Spotter Positions</p>
                </div>
                <p className="text-sm text-white/80 mb-2">
                  For longer moves or moves through areas with limited visibility, station
                  spotters at key points along the route:
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>At blind corners where the tower cannot be seen by other workers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>At doorways or narrow openings to guide the tower through</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>At junctions with vehicle routes to stop traffic</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>At the destination to guide final positioning</span>
                  </li>
                </ul>
              </div>

              <p>
                Remove obstacles before the move, not during it. If a bin, cable, pallet, or
                other obstruction is on the route, clear it first. Attempting to steer a tower
                around obstacles while it is in motion increases the risk of collision and
                overturning. A clear, straight route is always safer than a winding one.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Documentation & Communication */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Documentation &amp; Communication
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Every tower relocation must be documented and communicated to the relevant
                parties. This is not just good practice &mdash; it is a requirement of the
                inspection regime under Schedule 5 of the Work at Height Regulations 2005.
                A tower that has been moved is effectively a tower in a new location and
                must be treated accordingly.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <ClipboardList className="h-5 w-5 text-cyan-400" />
                  <p className="text-sm font-medium text-cyan-400">Documentation Requirements</p>
                </div>
                <div className="space-y-2 text-sm text-white/80">
                  <p><strong className="text-white">Inspection log update:</strong> Record the date and time of the move, the old position, the new position, who authorised the move, and who carried out the post-move inspection.</p>
                  <p><strong className="text-white">Post-move inspection record:</strong> A fresh Schedule 5 inspection record must be completed for the tower in its new position. This is treated as a new location and triggers the &ldquo;before first use&rdquo; inspection requirement.</p>
                  <p><strong className="text-white">Risk assessment review:</strong> The risk assessment must be reviewed for the new location. New hazards (overhead services, different ground, proximity to traffic) may require additional control measures.</p>
                  <p><strong className="text-white">Method statement update:</strong> If the method statement references the tower location, it must be updated to reflect the new position.</p>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Key Point:</strong> Inform site management
                  of the tower&rsquo;s new position. Other trades, the principal contractor, and
                  emergency services need to know where towers are located. An unannounced tower
                  in a new position can block emergency access routes or interfere with other
                  planned work.
                </p>
              </div>

              <p>
                If the tower is moved to a location where it affects fire escape routes, access
                for deliveries, or the work of other trades, these parties must be informed
                before the move takes place. On larger sites, the tower coordinator or site
                manager may need to approve the new position in advance.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Communication Checklist</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Site manager or principal contractor informed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Adjacent trades aware of new tower position</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Fire warden notified if fire routes are affected</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Tower tag or sign updated with new location details</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Site plan updated if one is maintained</span>
                  </li>
                </ul>
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
          title="Section 2 Knowledge Check"
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
            <Link to="../pasma-module-4-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Dismantling
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../pasma-module-4-section-3">
              Next: Storage &amp; Maintenance
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
