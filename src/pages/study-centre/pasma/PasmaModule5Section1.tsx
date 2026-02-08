import { ArrowLeft, Eye, CheckCircle, AlertTriangle, Shield, Search, Wrench, Wind } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "pasma-preuse-who",
    question: "Who is permitted to carry out a pre-use visual check on a mobile scaffold tower?",
    options: [
      "Only a PASMA-trained operative",
      "Only the site manager",
      "Any competent person with adequate knowledge",
      "Only an HSE inspector"
    ],
    correctIndex: 2,
    explanation: "A pre-use visual check can be carried out by any competent person who has adequate knowledge and experience to identify defects. They do not need to hold a PASMA certificate, but they must understand what they are looking for and why."
  },
  {
    id: "pasma-platform-latch",
    question: "What must happen to the trapdoor on a tower platform before work begins?",
    options: [
      "It must be removed entirely for ventilation",
      "It must close fully and the latch must engage correctly",
      "It should be propped open so the operative can escape quickly",
      "It only needs to be checked on the first day of use"
    ],
    correctIndex: 1,
    explanation: "The trapdoor must close fully and the latch must engage correctly. An open or unlatched trapdoor creates a fall hazard through the platform opening and compromises the integrity of the working platform."
  },
  {
    id: "pasma-wind-limit",
    question: "At what Beaufort Force must work on a mobile scaffold tower cease?",
    options: [
      "Force 3 (gentle breeze)",
      "Force 4 (moderate breeze)",
      "Force 6 (strong breeze)",
      "Force 8 (gale)"
    ],
    correctIndex: 1,
    explanation: "Work must cease at Beaufort Force 4 or above. Mobile scaffold towers are lightweight structures with a high centre of gravity, making them particularly susceptible to wind loading. At Force 4 (moderate breeze, 13-18 mph) the risk becomes unacceptable."
  }
];

const faqs = [
  {
    question: "How often must a pre-use visual check be carried out?",
    answer: "A pre-use visual check must be carried out before every work shift or every working day, whichever comes first. If a tower is left erected overnight and used again the following morning, a fresh pre-use check is required before anyone climbs it. This is in addition to, not instead of, the formal 7-day inspection required under Schedule 5 of the Work at Height Regulations 2005."
  },
  {
    question: "Does a pre-use check need to be recorded in writing?",
    answer: "The Work at Height Regulations do not legally require the pre-use check to be documented in the same way as a formal Schedule 5 inspection. However, best practice strongly recommends keeping a written or digital record. Many principal contractors and clients require documented pre-use checks as a condition of working on their sites. A simple checklist signed and dated by the checker is sufficient."
  },
  {
    question: "What should I do if I find a defect during a pre-use check?",
    answer: "If any defect is found that could affect the safety of the tower, you must not use the tower. Remove it from service immediately, attach a 'Do Not Use' tag or sign, and report the defect to your supervisor or the responsible person on site. The tower must not be used again until the defect has been rectified and a competent person has confirmed it is safe."
  },
  {
    question: "Is a pre-use check the same as a formal inspection?",
    answer: "No. A pre-use check is a quick visual assessment carried out before each use to identify obvious defects and hazards. A formal inspection under Schedule 5 is a more thorough, documented examination carried out by a competent person at intervals not exceeding 7 days, before first use, after alteration, or after any event affecting stability. Both are required — they serve different purposes."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "How often must a pre-use visual check be carried out on an erected mobile scaffold tower?",
    options: [
      "Once a week",
      "Before every shift or working day",
      "Only after adverse weather",
      "Monthly"
    ],
    correctAnswer: 1,
    explanation: "A pre-use visual check must be carried out before every work shift or every working day before anyone works from the tower. This is a daily requirement, not weekly."
  },
  {
    id: 2,
    question: "Which of the following would be classified as a structural check during a pre-use inspection?",
    options: [
      "Checking wind speed with an anemometer",
      "Verifying frames are straight, undamaged, and free from significant corrosion",
      "Confirming the operative has their PASMA card",
      "Checking the tower is insured"
    ],
    correctAnswer: 1,
    explanation: "Structural checks focus on the physical integrity of the tower components: frames must be straight and undamaged, braces fitted and locked, spigot connections secure, welds intact, and no corrosion that reduces structural strength."
  },
  {
    id: 3,
    question: "What is the minimum guardrail height required on all open sides of a mobile scaffold tower platform?",
    options: [
      "750mm",
      "850mm",
      "950mm",
      "1100mm"
    ],
    correctAnswer: 2,
    explanation: "Guardrails must be at a minimum height of 950mm on all open sides of the working platform. This is specified in EN 1004 and the Work at Height Regulations Schedule 3."
  },
  {
    id: 4,
    question: "What is the maximum permissible gap in edge protection (e.g. between guardrail and toeboard)?",
    options: [
      "250mm",
      "370mm",
      "470mm",
      "600mm"
    ],
    correctAnswer: 2,
    explanation: "The maximum permissible gap must not exceed 470mm. This means with a 950mm guardrail and a 150mm toeboard, a mid-rail is required to ensure no gap exceeds 470mm."
  },
  {
    id: 5,
    question: "During a platform check, which of the following is a fail condition?",
    options: [
      "The platform has a slight amount of dust on it",
      "The platform locking hooks are engaged on all sides",
      "The trapdoor does not close or latch correctly",
      "The platform is level and fully decked"
    ],
    correctAnswer: 2,
    explanation: "A trapdoor that does not close or latch correctly is a fail condition. This creates a fall hazard through the platform opening. Dust can be swept away, but a faulty trapdoor mechanism is a safety-critical defect."
  },
  {
    id: 6,
    question: "What must be checked regarding the castors during a base and stability check?",
    options: [
      "That they spin freely when released",
      "That all castors are locked and the tower cannot roll",
      "That they are greased and maintained",
      "That they are the same colour as each other"
    ],
    correctAnswer: 1,
    explanation: "All castors must be locked before anyone works from the tower. An unlocked castor can allow the tower to roll, leading to instability and potential overturning. This is one of the most critical checks."
  },
  {
    id: 7,
    question: "Which environmental factor requires immediate cessation of tower work?",
    options: [
      "Ambient temperature below 10°C",
      "Light rain with no wind",
      "Wind speed at or above Beaufort Force 4",
      "Overcast sky with good visibility"
    ],
    correctAnswer: 2,
    explanation: "Wind speed at or above Beaufort Force 4 (moderate breeze, 13-18 mph) requires work to stop and operatives to descend. Mobile towers are particularly vulnerable to wind loading due to their lightweight construction and height-to-base ratio."
  },
  {
    id: 8,
    question: "What action must be taken if a pre-use check identifies a defect that could affect safety?",
    options: [
      "Continue working but report the defect at the end of the shift",
      "Reduce the number of people on the platform to one",
      "Do not use the tower, tag it as defective, and report immediately",
      "Take a photograph and carry on working"
    ],
    correctAnswer: 2,
    explanation: "If any defect is identified that could affect safety, the tower must not be used. It must be immediately taken out of service, tagged as defective with a 'Do Not Use' sign, and the defect reported to the supervisor or responsible person."
  }
];

export default function PasmaModule5Section1() {
  useSEO({
    title: "Pre-Use Visual Checks | PASMA Module 5.1",
    description: "Pre-use visual inspection of mobile scaffold towers: structural checks, safety components, platform integrity, base stability, environmental conditions, and pass/fail criteria.",
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
            <Link to="../pasma-module-5">
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
            <Eye className="h-7 w-7 text-elec-yellow" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/20 mb-3 mx-auto">
            <span className="text-elec-yellow text-xs font-semibold">MODULE 5 &middot; SECTION 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Pre-Use Visual Checks
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            The essential daily inspection every tower must receive before anyone steps onto the platform &mdash; covering structure, safety components, platform, base, and environment
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>When:</strong> Pre-use check before every shift by any competent person</li>
              <li><strong>What:</strong> Structure, safety components, platform, base, environment</li>
              <li><strong>Fail:</strong> Do not use, report defect, and tag tower as defective</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Before:</strong> Walk around the tower, check every component visually</li>
              <li><strong>During:</strong> Monitor conditions (wind speed, ground stability)</li>
              <li><strong>After:</strong> Report any defects found to supervisor immediately</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain who can carry out a pre-use check and when",
              "Identify structural defects in tower frames and bracing",
              "Check guardrails, mid-rails, toeboards, and platforms",
              "Assess base stability including castors and ground conditions",
              "Evaluate environmental hazards before and during work",
              "Apply pass/fail criteria and follow the correct reporting procedure"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Who Can Carry Out Pre-Use Checks? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Who Can Carry Out Pre-Use Checks?
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A pre-use visual check can be carried out by any <strong>competent person</strong>. Unlike
                a formal Schedule 5 inspection, the person conducting the pre-use check does not need to hold
                a PASMA certificate or any specific qualification. However, they must possess adequate knowledge,
                training, and experience to recognise defects that could compromise the safety of the tower.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Key Point:</strong> A pre-use check is not the same
                  as a formal inspection. The pre-use check is a quick visual assessment carried out before
                  every shift or working day. The formal inspection under Schedule 5 is more thorough,
                  must be documented, and is required at intervals not exceeding 7 days.
                </p>
              </div>

              <p>
                In practice, the person most likely to carry out the pre-use check is the operative who will
                be working from the tower that day. They should have received toolbox talk training or site
                induction covering the key points to look for. Many sites provide a simple printed checklist
                to guide the check.
              </p>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-green-400 mb-2">Pre-Use Check</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Before every shift or working day</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Any competent person can do it</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Visual assessment &mdash; quick and practical</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Written record recommended, not legally required</span></li>
                  </ul>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-blue-400 mb-2">Formal Inspection (Schedule 5)</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Every 7 days, before first use, after alteration</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Competent person with sufficient training</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Thorough systematic examination</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Written record legally required</span></li>
                  </ul>
                </div>
              </div>

              <p>
                The employer has a duty to ensure that those carrying out pre-use checks have been given
                sufficient information, instruction, and training to do so competently. Simply telling
                someone to &ldquo;have a look at the tower&rdquo; is not adequate. They must know what
                to look for and what constitutes a fail.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: Structural Checks */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Structural Checks
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Structural checks focus on the physical integrity of the tower&rsquo;s main components.
                You are looking for anything that suggests the tower has been damaged, incorrectly
                assembled, or modified in a way that could reduce its load-bearing capacity or stability.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Search className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-purple-400">Structural Check Checklist</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Frames:</strong> Straight, not bent or twisted, no visible dents or cracks that weaken the tube</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Braces:</strong> All horizontal and diagonal braces fitted in the correct positions and fully locked into their clips or hooks</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Spigot connections:</strong> Spigots fully inserted and secured &mdash; no partial engagement, no visible play or wobble</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Welds:</strong> All factory welds intact with no cracking, separation, or grinding marks</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Corrosion:</strong> No corrosion that has reduced the wall thickness of tubes or weakened connection points</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Modifications:</strong> No unauthorised modifications such as drilled holes, welded attachments, or cut members</span></li>
                </ul>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Common Structural Defects</p>
                </div>
                <p className="text-sm text-white/80">
                  The most commonly missed structural defects are bent braces that appear &ldquo;close enough&rdquo;
                  and surface corrosion that has been painted over. A brace that is even slightly bent will not
                  transfer loads correctly and can compromise the entire tower. Always look beneath any paint
                  or surface coating where corrosion is suspected. If in doubt, take the component out of service.
                </p>
              </div>

              <p>
                Remember that aluminium towers can also suffer from fatigue cracking at weld points,
                particularly around the base plates and castor attachment points. These cracks may be
                hairline and difficult to spot &mdash; run your hand along weld lines to feel for any
                irregularity that your eye might miss.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Structural Check Sequence</p>
                <p className="text-sm text-white/80">
                  Work systematically from bottom to top. Start with the base frames and castors, then check
                  each lift of bracing in turn, moving upwards through the tower. Check both the narrow and
                  wide faces at each level. This methodical approach ensures you do not miss any component.
                  If the tower has multiple platforms (intermediate and working), check the structure supporting
                  each platform separately. Never assume that because the bottom is sound, the top will be too &mdash;
                  different sections may have been assembled by different people or at different times.
                </p>
              </div>

              <p>
                Pay particular attention to components that have been in storage or transit. Transportation
                damage is a common source of defects &mdash; frames can be bent during loading and unloading,
                and braces can be damaged if stacked incorrectly. Any component that looks different from the
                rest of the tower (different colour, different manufacturer markings, different wear pattern)
                should be investigated further, as it may have been substituted from a different system.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Safety Component Checks */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Safety Component Checks
          </h2>
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Safety components are the elements that prevent people and materials from falling from the
                tower platform. These components must all be present, correctly fitted, and in good condition
                before anyone works from the tower.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-3">Edge Protection Requirements</p>
                <div className="space-y-2 text-sm text-white/80">
                  <p><strong className="text-white">Guardrails:</strong> Fitted at a minimum height of 950mm on all open sides of the working platform. Must be secure with no lateral movement when hand pressure is applied.</p>
                  <p><strong className="text-white">Mid-rails:</strong> Fitted between the guardrail and the toeboard so that no gap exceeds 470mm. This prevents a person from falling or sliding through the edge protection.</p>
                  <p><strong className="text-white">Toeboards:</strong> Fitted at platform level on all open sides. Minimum height 150mm. Prevents tools, materials, and debris from being kicked or rolling off the platform edge.</p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5 text-teal-400" />
                  <p className="text-sm font-medium text-teal-400">Access &amp; Trapdoor Checks</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Trapdoor platform:</strong> The trapdoor mechanism must open smoothly, allow safe access through the platform, and close securely behind the operative</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Internal ladder:</strong> All rungs present, undamaged, and firmly attached &mdash; no missing or bent rungs</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Climb sequence:</strong> The 3T method (Through the Trap) must be achievable &mdash; the operative must be able to climb through the trapdoor and close it behind them without standing on an unprotected platform</span></li>
                </ul>
              </div>

              <p>
                A common site shortcut is removing a guardrail section to &ldquo;make access easier.&rdquo;
                This is never acceptable. The tower must have full edge protection on all open sides at all
                times when the platform is in use. If edge protection cannot be maintained, the tower must
                not be used.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-red-400 mb-2">Immediate Fail Conditions</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Any guardrail missing or not at the correct 950mm height</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Mid-rail absent where a gap exceeds 470mm</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Toeboards missing on any open side</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Trapdoor mechanism jammed, broken, or unable to latch</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Access ladder rungs missing, cracked, or loose</span></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Platform Checks */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Platform Checks
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The working platform is where operatives stand, kneel, and carry out their tasks. It must
                be fully decked, level, secure, and free from hazards. Platform defects are among the most
                dangerous because they are directly underfoot and can cause falls through the platform itself.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Wrench className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Platform Inspection Points</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Fully decked:</strong> Every platform position must be occupied by a platform board or deck panel &mdash; no gaps where a person could step through</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Trapdoor operation:</strong> The trapdoor must close flush with the surrounding deck and the latch must engage positively. Test this by closing the trapdoor and attempting to lift it without releasing the latch</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Surface condition:</strong> No holes, cracks, delamination, or warping that could create a trip hazard or reduce load capacity</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Locking hooks:</strong> All platform locking hooks or wind locks must be engaged to prevent the platform from lifting in wind or during use</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Level:</strong> The platform must be level (within manufacturer&rsquo;s tolerance) &mdash; an unlevel platform causes materials to slide and affects operative balance</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Clear of debris:</strong> No tools, materials, water, ice, or other trip hazards on the platform surface</span></li>
                </ul>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Key Point:</strong> Platform boards from different
                  manufacturers must never be mixed on the same tower. Each manufacturer designs their platforms
                  to specific dimensions and locking mechanisms. A board from manufacturer A may appear to fit
                  manufacturer B&rsquo;s tower but will not lock correctly, creating a serious fall hazard.
                </p>
              </div>

              <p>
                Pay particular attention to timber-decked platforms on older towers. Timber can rot from
                the inside, appearing sound on the surface whilst having lost significant structural strength.
                Press firmly on all areas of timber decks and listen for any creaking or flexing that
                suggests internal decay. Modern aluminium and composite platforms do not suffer from rot
                but must still be checked for cracks and distortion.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Platform Overloading</p>
                <p className="text-sm text-white/80">
                  Check that the platform is not being used to store excessive materials. Every tower has a
                  maximum platform load specified by the manufacturer. Overloading the platform not only
                  risks structural failure of the deck itself but also affects the overall stability of
                  the tower by raising its centre of gravity. Materials should be kept to the minimum needed
                  for the immediate task, and heavy items should be positioned centrally, never at the edges.
                </p>
              </div>

              <p>
                If intermediate platforms are present below the main working platform, check that they are
                correctly fitted and latched as well. Intermediate platforms contribute to the overall
                bracing of the tower structure and must not be removed or left unlatched, even if they
                are not being used as working platforms.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Base & Stability Checks */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Base &amp; Stability Checks
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The base is the foundation of the entire tower. If the base is not stable, nothing above it
                is safe. Base and stability checks must cover the castors, adjustable legs, ground conditions,
                and any additional stabilising equipment fitted to the tower.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-3">Castor &amp; Leg Checks</p>
                <div className="space-y-2 text-sm text-white/80">
                  <p><strong className="text-white">Castors locked:</strong> Every castor brake must be fully engaged. Test each castor by attempting to push the tower &mdash; it must not roll. A single unlocked castor can cause the tower to move under load.</p>
                  <p><strong className="text-white">Adjustable legs:</strong> Where fitted, adjustable legs must be at the correct extension and locked. Check that locking pins are fully engaged and that the leg has not crept during use. The tower must be level.</p>
                  <p><strong className="text-white">Castor condition:</strong> Wheels should spin freely when unlocked (no flat spots or seized bearings) and the brake mechanism must engage positively with an audible click.</p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Ground &amp; Stabiliser Checks</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Firm level ground:</strong> The tower must be on ground that is firm, level, and capable of supporting the total load (tower weight + operatives + materials). No soft spots, slopes, or voids beneath the castors</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Sole boards:</strong> Where ground conditions require it, sole boards must be in place beneath each castor to spread the load and prevent sinking. Sole boards must be level and stable</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Stabilisers/outriggers:</strong> Where required by the manufacturer&rsquo;s instructions or risk assessment, stabilisers or outriggers must be correctly fitted, fully extended, and making proper ground contact</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">No subsidence:</strong> Check that the ground has not subsided, settled, or become waterlogged since the tower was last used. Rain, vehicle movements, and excavation work nearby can all affect ground conditions</span></li>
                </ul>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Warning: Uneven Ground</p>
                </div>
                <p className="text-sm text-white/80">
                  Never use bricks, blocks, timber off-cuts, or other makeshift items to level a tower.
                  Only use the manufacturer&rsquo;s adjustable legs or approved levelling devices. Makeshift
                  packing is one of the leading causes of tower collapse and is a serious breach of the
                  regulations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Environmental Checks */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Environmental Checks
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Environmental conditions can change rapidly on site and may render a structurally sound tower
                unsafe to use. Environmental checks must be carried out before each work period and conditions
                must be monitored continuously throughout the working day.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Wind className="h-5 w-5 text-cyan-400" />
                  <p className="text-sm font-medium text-cyan-400">Environmental Check Points</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Wind speed:</strong> Must be below Beaufort Force 4 for working from the tower. Use an anemometer where possible. At Force 4 (moderate breeze, 13&ndash;18 mph), stop work and descend. At Force 5 or above, consider dismantling the tower</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Ice and frost:</strong> Check all components, particularly rungs, platform, and braces, for ice or frost. Ice makes climbing and working surfaces dangerously slippery and can affect locking mechanisms</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Lighting:</strong> Adequate lighting must be available for the work and for safe access and egress. If artificial lighting is needed, it must be in place before work begins</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Overhead hazards:</strong> Check that overhead obstructions (power lines, structural beams, moving machinery) have not changed since the tower was positioned. Maintain safe clearance distances at all times</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Exclusion zones:</strong> Verify that exclusion zones around the tower base are still in place and being respected. Barriers, signage, and physical protection must be intact</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span><strong className="text-white">Access routes:</strong> Ensure the route to and around the tower is clear of obstructions, trip hazards, and other site traffic</span></li>
                </ul>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Key Point:</strong> Wind speed is the single most
                  important environmental factor for mobile scaffold towers. Towers are lightweight structures
                  with a high sail area and a high centre of gravity. Even moderate winds can generate forces
                  sufficient to overturn a tower, particularly if sheeting, signage, or debris has become
                  attached to the structure.
                </p>
              </div>

              <p>
                Environmental monitoring is not a one-off check. Conditions can change throughout the day &mdash;
                wind can increase, rain can make surfaces slippery, and other site activities (such as crane
                operations or vehicle movements) can introduce new hazards. If conditions deteriorate, work
                must stop and the tower must be reassessed before use continues.
              </p>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-green-400 mb-2">Acceptable Conditions</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Wind below Force 4 (light to gentle breeze)</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Dry or light rain with no ice</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Adequate natural or artificial lighting</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Ground firm and stable, no recent flooding</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>No nearby crane lifts or vehicle movements in exclusion zone</span></li>
                  </ul>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-red-400 mb-2">Stop Work Conditions</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Wind at Force 4 or above &mdash; descend immediately</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Ice or frost on any climbing or working surface</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Lightning within 10 miles of the site</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Ground conditions changed (flooding, excavation nearby)</span></li>
                    <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Overhead power line clearance reduced below safe distance</span></li>
                  </ul>
                </div>
              </div>

              <p>
                If the tower must be left erected during a period of adverse weather (overnight storm, weekend
                frost), it must receive a formal inspection before anyone uses it again. Do not assume that
                because the tower looked fine before the weather event, it will still be safe afterwards.
                Wind, rain, and temperature changes can all cause subtle damage that is not immediately
                obvious from ground level.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Pass/Fail Criteria & Reporting */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Pass/Fail Criteria &amp; Reporting
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The pre-use check results in a simple pass or fail decision. There is no &ldquo;conditional
                pass&rdquo; or &ldquo;acceptable with minor defects.&rdquo; If any defect is identified that
                could affect the safety of anyone working from or near the tower, the tower fails and must
                not be used until the defect is rectified.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-red-400 mb-3">What Constitutes a Fail?</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Any structural defect: bent frame, broken weld, missing brace, corroded tube</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Any safety component missing or defective: guardrail, mid-rail, toeboard, trapdoor</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Platform not fully decked, damaged, or unable to latch correctly</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Any castor unlocked, seized, or with a defective brake mechanism</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Ground conditions unsuitable: soft, uneven, waterlogged, or subsided</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Environmental conditions unsafe: high wind, ice on components, inadequate lighting</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Any unauthorised modification to the tower structure or components</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" /><span>Components from different manufacturers mixed on the same tower</span></li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Fail Procedure: What to Do</p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-red-500/20 text-red-400 text-xs font-bold flex-shrink-0">1</span>
                    <div>
                      <p className="text-sm font-medium text-white">Stop &mdash; Do Not Use</p>
                      <p className="text-sm text-white/80">No one is to climb or work from the tower. If someone is already on the platform, they must descend safely and immediately.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-red-500/20 text-red-400 text-xs font-bold flex-shrink-0">2</span>
                    <div>
                      <p className="text-sm font-medium text-white">Tag &mdash; Mark as Defective</p>
                      <p className="text-sm text-white/80">Attach a clearly visible &ldquo;DO NOT USE &mdash; DEFECTIVE&rdquo; tag or sign to the tower. This prevents other operatives from using it unknowingly.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-red-500/20 text-red-400 text-xs font-bold flex-shrink-0">3</span>
                    <div>
                      <p className="text-sm font-medium text-white">Report &mdash; Notify the Responsible Person</p>
                      <p className="text-sm text-white/80">Report the defect to your supervisor, site manager, or the person responsible for the tower. Provide details of what was found and where.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-red-500/20 text-red-400 text-xs font-bold flex-shrink-0">4</span>
                    <div>
                      <p className="text-sm font-medium text-white">Record &mdash; Document the Defect</p>
                      <p className="text-sm text-white/80">Even though the pre-use check does not legally require written records, best practice is to record the defect, the date, and the action taken. Photographic evidence is valuable.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Key Point:</strong> The person who carries out the
                  pre-use check is personally responsible for the accuracy of their assessment. If they pass
                  a tower that is defective and someone is injured as a result, they could face enforcement
                  action under Section 7 of HSWA 1974 for failing to take reasonable care. Always err on
                  the side of caution &mdash; if in doubt, fail it.
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
            <Link to="../pasma-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../pasma-module-5-section-2">
              Next: Formal 7-Day Inspections
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}