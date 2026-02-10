import {
  ArrowLeft,
  ShieldCheck,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "scaffold-pre-use-checks",
    question:
      "What THREE checks should you carry out before starting work on a scaffold?",
    options: [
      "Check the scaffold tag, carry out a visual inspection, and confirm safe access is available",
      "Check the weather forecast, take a photograph, and sign the site diary",
      "Ask a colleague if they have used it, check your PPE, and start work",
      "Read the method statement, check the scaffold tag, and telephone the scaffold company",
    ],
    correctIndex: 0,
    explanation:
      "Before starting work on any scaffold you must check the scaffold tag (green means safe to use), carry out your own visual inspection of the platform, guardrails, and access points, and confirm that safe access and egress is available. These three steps take only a few minutes but can prevent serious injury or death.",
  },
  {
    id: "scaffold-3-points-contact",
    question:
      "What does maintaining 3 points of contact on a ladder mean?",
    options: [
      "Both feet and one hand, or both hands and one foot, must be in contact with the ladder at all times",
      "Three different people must be in contact with the ladder at the same time",
      "You must touch three rungs before stepping onto the platform",
      "You must pause for three seconds at the top of the ladder before stepping off",
    ],
    correctIndex: 0,
    explanation:
      "Three points of contact means that at any time while climbing or descending a ladder, you must have either both feet and one hand or both hands and one foot in firm contact with the ladder. This ensures you always have a secure grip and reduces the risk of slipping or falling. It also means you must never carry tools or materials in your hands while climbing.",
  },
  {
    id: "scaffold-tool-lanyard",
    question:
      "Why must you use a tool lanyard when working on a scaffold platform?",
    options: [
      "To prevent tools from falling and striking people below",
      "To keep your tools organised and easy to find",
      "Tool lanyards are only required above 10 metres",
      "To comply with the manufacturer\u2019s warranty conditions",
    ],
    correctIndex: 0,
    explanation:
      "A dropped tool can accelerate to lethal speed within a very short fall distance. A 1 kg spanner dropped from just 6 metres hits the ground at approximately 39 km/h with enough force to cause fatal head injuries. Tool lanyards prevent tools from falling off the platform and striking workers, members of the public, or anyone else below. They are a simple, inexpensive control measure that saves lives.",
  },
];

const faqs = [
  {
    question:
      "What should I do if I arrive at a scaffold and find the tag is missing or the tag is red?",
    answer:
      "Do not use the scaffold. A missing tag should be treated the same as a red (prohibited) tag \u2014 you must assume the scaffold is not safe. Report the missing or red tag to your supervisor or the site manager immediately. They will arrange for a competent person to inspect the scaffold and, if appropriate, replace the tag. Never assume a scaffold is safe simply because it looks intact. The tag system exists because many critical defects are not visible to untrained eyes.",
  },
  {
    question:
      "Can I climb over a guardrail to reach a difficult area rather than repositioning the scaffold?",
    answer:
      "Absolutely not. Guardrails are there to prevent you from falling. Climbing over, standing on, or leaning against guardrails defeats their purpose and places you at immediate risk of a fall from height. If you cannot safely reach the work area from the existing scaffold platform, you must stop work and arrange for the scaffold to be altered or extended by a competent scaffolder. Never improvise access \u2014 falls from height remain the leading cause of workplace fatalities in construction.",
  },
  {
    question:
      "Am I allowed to move or remove scaffold boards to create a materials hoist opening?",
    answer:
      "No. You must never alter any part of a scaffold unless you are a competent scaffolder authorised to do so. Removing boards, loosening couplers, moving guardrails, or creating openings compromises the structural integrity of the scaffold and removes your fall protection. If a hoist opening or alteration is needed, request it through your supervisor and ensure a competent scaffolder carries out the work. The scaffold must be re-inspected and re-tagged before use after any alteration.",
  },
  {
    question:
      "What is the safest way to get tools and materials up to a scaffold platform?",
    answer:
      "Use a gin wheel (scaffold pulley), materials hoist, or a bucket and rope system \u2014 never carry materials up a ladder by hand. Carrying items up a ladder means you cannot maintain three points of contact, which dramatically increases your risk of falling. For heavier items, a mechanical hoist or crane may be required. Always check the platform\u2019s maximum load rating before placing materials on it, and distribute the load evenly \u2014 never concentrate heavy loads in one area.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "What colour scaffold tag indicates that the scaffold is safe to use without restrictions?",
    options: [
      "Red",
      "Green",
      "Yellow",
      "Blue",
    ],
    correctAnswer: 1,
    explanation:
      "A green scaffold tag indicates the scaffold has been inspected by a competent person and is safe to use without restrictions. A yellow tag means the scaffold has restrictions (such as limited loading or incomplete sections). A red tag means the scaffold must not be used. Always check the tag and read any written restrictions before stepping onto the scaffold.",
  },
  {
    id: 2,
    question:
      "Which of the following is NOT part of the three pre-use checks before working on a scaffold?",
    options: [
      "Checking the scaffold tag",
      "Carrying out a visual inspection of the platform and guardrails",
      "Photographing the scaffold and emailing it to the client",
      "Confirming safe access and egress is available",
    ],
    correctAnswer: 2,
    explanation:
      "The three pre-use checks are: (1) check the scaffold tag to confirm it is green and in date, (2) carry out your own visual inspection of the platform, guardrails, toe boards, and overall condition, and (3) confirm that safe access and egress (such as internal ladders or stairways) is available and unobstructed. Photographing the scaffold is not one of the required pre-use checks.",
  },
  {
    id: 3,
    question:
      "What is the primary purpose of maintaining three points of contact when climbing a scaffold ladder?",
    options: [
      "To climb faster and more efficiently",
      "To ensure you always have a secure grip and reduce the risk of falling",
      "To meet the scaffold manufacturer\u2019s loading requirements",
      "To signal to other workers that you are ascending",
    ],
    correctAnswer: 1,
    explanation:
      "Three points of contact (two hands and one foot, or two feet and one hand) ensures you always have a secure grip on the ladder. If one point of contact slips, the other two still support you and give you time to recover. This simple technique is one of the most effective ways to prevent falls during access and egress on scaffolds.",
  },
  {
    id: 4,
    question:
      "A scaffold platform has materials, offcuts, and empty packaging scattered across it. What should you do?",
    options: [
      "Work around the debris \u2014 tidying up is not your responsibility",
      "Push the debris to the edge of the platform so it is out of your way",
      "Clear the platform before starting work, disposing of waste properly and keeping the working area tidy",
      "Report it to the scaffold company and wait for them to clean it",
    ],
    correctAnswer: 2,
    explanation:
      "You have a duty to keep your working platform clean and tidy. Debris creates trip hazards, can obstruct access points, may overload the platform, and can fall from height and injure people below. Clear the platform before starting work, dispose of waste in proper waste receptacles, and maintain good housekeeping throughout the working day. Never push waste to the edge \u2014 it can fall off the scaffold.",
  },
  {
    id: 5,
    question:
      "Why is overreaching from a scaffold platform dangerous?",
    options: [
      "It causes back strain, which is a common musculoskeletal injury",
      "It shifts your centre of gravity beyond the platform edge, increasing the risk of a fall from height",
      "Overreaching is only dangerous if you are not wearing a harness",
      "It damages the guardrail system",
    ],
    correctAnswer: 1,
    explanation:
      "Overreaching shifts your centre of gravity towards or beyond the edge of the platform. If your centre of gravity moves past the guardrail, you are at serious risk of toppling over it and falling. The correct action is to reposition yourself so that your work is directly in front of you and within easy, comfortable reach. If you cannot reach the work safely, the scaffold must be moved or extended.",
  },
  {
    id: 6,
    question:
      "What is the minimum height above the working platform at which a main guardrail must be fitted?",
    options: [
      "700 mm",
      "800 mm",
      "950 mm",
      "1200 mm",
    ],
    correctAnswer: 2,
    explanation:
      "The Work at Height Regulations 2005 and TG20 guidance require the main guardrail (top rail) to be at a minimum height of 950 mm above the working platform. This height is designed to prevent a person from toppling over the rail. An intermediate guardrail (or brick guard) must also be fitted so that the unprotected gap does not exceed 470 mm. Toe boards must be at least 150 mm high.",
  },
  {
    id: 7,
    question:
      "Two teams are working on the same scaffold \u2014 one on level 3 and one on level 5. What is the primary coordination requirement?",
    options: [
      "Both teams must wear different coloured hard hats",
      "The team on the higher level must ensure tools and materials cannot fall onto the lower team",
      "Only one team may work at a time \u2014 the other must leave the scaffold",
      "A banksman must be stationed on every level between the two teams",
    ],
    correctAnswer: 1,
    explanation:
      "When multiple teams work on the same scaffold at different levels, the primary risk is falling objects striking workers below. The upper team must use tool lanyards, toe boards, brick guards, and netting or fans where required. Materials must be secured, and debris must not be allowed to accumulate on any platform edge. Communication between the teams is essential \u2014 if heavy materials are being moved on the upper level, the lower team should be warned or temporarily excluded from the area directly below.",
  },
  {
    id: 8,
    question:
      "Which of the following is the CORRECT action when you discover that the internal ladder on a scaffold has been removed?",
    options: [
      "Use an external ladder leaning against the scaffold instead",
      "Climb the scaffold standards using the ledgers as foot holds",
      "Do not use the scaffold \u2014 report the missing ladder to your supervisor immediately",
      "Jump from the ground to the first lift and pull yourself up",
    ],
    correctAnswer: 2,
    explanation:
      "If the designated access (internal ladder, stair tower, or similar) has been removed or is missing, the scaffold must not be used. Improvised access such as climbing the standards, using an unsecured external ladder, or jumping up to a lift is extremely dangerous and is a leading cause of scaffold-related falls. Report the issue to your supervisor immediately so that the correct access can be reinstated by a competent scaffolder before anyone uses the scaffold.",
  },
];

export default function ScaffoldingAwarenessModule5Section1() {
  useSEO({
    title:
      "Safe Working on Scaffolds | Scaffolding Awareness Module 5.1",
    description:
      "Pre-use checks, safe access and egress, three points of contact, platform housekeeping, avoiding overreaching, tool lanyards, and working with others on scaffolds.",
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
            <Link to="../scaffolding-awareness-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-500/20 to-slate-400/20 border border-slate-500/30 mb-4">
            <ShieldCheck className="h-7 w-7 text-slate-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-500/10 border border-slate-500/20 mb-3 mx-auto">
            <span className="text-slate-400 text-xs font-semibold">
              MODULE 5 &middot; SECTION 1
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Safe Working on Scaffolds
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Pre-use checks before starting work, safe access and egress,
            maintaining three points of contact, keeping platforms clear,
            avoiding overreaching, tool lanyards, and coordinating with
            others on the scaffold
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-slate-500/5 border-l-2 border-slate-500/50">
            <p className="text-slate-400 text-base font-medium mb-2">
              In 30 Seconds
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Before you start:</strong> Check tag, visual
                inspection, confirm access
              </li>
              <li>
                <strong>3 points of contact:</strong> Always when
                climbing or descending ladders
              </li>
              <li>
                <strong>Tool lanyards:</strong> Attach every tool to
                prevent dropped-object injuries
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-slate-500/5 border-l-2 border-slate-500/50">
            <p className="text-slate-400/90 text-base font-medium mb-2">
              Key Facts
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Housekeeping:</strong> Keep platforms clear of
                debris, waste, and loose materials
              </li>
              <li>
                <strong>No overreaching:</strong> Reposition the scaffold
                instead of leaning out
              </li>
              <li>
                <strong>Coordination:</strong> Communicate with all teams
                sharing the scaffold
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">
            Learning Outcomes
          </h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Describe the three checks to carry out before starting work on a scaffold",
              "Explain safe access and egress using internal ladders, secured ladders, and stair towers",
              "Demonstrate the three-points-of-contact technique on scaffold ladders",
              "Identify the importance of platform housekeeping and tidiness",
              "Explain why overreaching is dangerous and what to do instead",
              "Describe how tool lanyards prevent dropped-object injuries",
              "Outline the key considerations when multiple teams work on the same scaffold",
              "Know how to keep access points clear and unobstructed at all times",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-slate-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Before Starting Work */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">01</span>
            Before Starting Work
          </h2>
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Every person who is about to work on a scaffold must carry
                out{" "}
                <strong>three essential checks</strong> before stepping
                onto the platform. These checks take only a few minutes
                but can prevent catastrophic falls, structural failures,
                and serious injuries.
              </p>

              {/* Diagram: Safe Scaffold Access Checklist */}
              <div className="bg-slate-500/10 border-2 border-slate-500/30 rounded-xl p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <ShieldCheck className="h-5 w-5 text-slate-400" />
                  <p className="text-base font-semibold text-white">
                    Safe Scaffold Access Checklist
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Check 1 — Tag */}
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-green-500/20 border border-green-500/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-green-400">1</span>
                      </div>
                      <p className="text-sm font-semibold text-green-400">
                        Check the Scaffold Tag
                      </p>
                    </div>
                    <ul className="text-sm text-white/80 space-y-1 ml-11">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                        <span>
                          Confirm the tag is <strong className="text-white">green</strong> (safe to use)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                        <span>
                          Read the <strong className="text-white">date of last inspection</strong> &mdash; it must be within 7 days
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                        <span>
                          Check for any <strong className="text-white">written restrictions</strong> on the tag
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                        <span>
                          If the tag is <strong className="text-white">yellow</strong>, read the restrictions carefully and comply with them
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                        <span>
                          If the tag is <strong className="text-white">red or missing</strong> &mdash; do NOT use the scaffold
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Check 2 — Visual */}
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-blue-400">2</span>
                      </div>
                      <p className="text-sm font-semibold text-blue-400">
                        Visual Inspection
                      </p>
                    </div>
                    <ul className="text-sm text-white/80 space-y-1 ml-11">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                        <span>
                          Platform boards are <strong className="text-white">fully boarded</strong> with no gaps exceeding 25 mm
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                        <span>
                          <strong className="text-white">Guardrails</strong> are in place at the correct height (minimum 950 mm)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                        <span>
                          <strong className="text-white">Toe boards</strong> are fitted (minimum 150 mm high)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                        <span>
                          <strong className="text-white">Intermediate guardrails</strong> or brick guards are in position
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                        <span>
                          No visible <strong className="text-white">damage, corrosion, or missing components</strong>
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Check 3 — Access */}
                  <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-purple-400">3</span>
                      </div>
                      <p className="text-sm font-semibold text-purple-400">
                        Confirm Safe Access
                      </p>
                    </div>
                    <ul className="text-sm text-white/80 space-y-1 ml-11">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                        <span>
                          <strong className="text-white">Internal ladders</strong> are in position and properly secured
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                        <span>
                          Ladder <strong className="text-white">trap doors</strong> open and close freely
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                        <span>
                          Access route is <strong className="text-white">clear of obstructions</strong> (no stored materials blocking the way)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                        <span>
                          You can <strong className="text-white">reach and leave</strong> the platform safely in an emergency
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Never Assume
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Never assume a scaffold is safe just because someone
                  else has been using it. Conditions can change between
                  shifts, overnight, or after weather events.{" "}
                  <strong className="text-white">
                    Your pre-use checks are your personal responsibility
                  </strong>{" "}
                  &mdash; they protect your life. If anything looks wrong
                  or feels wrong, do not use the scaffold. Report it
                  immediately.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Safe Access and Egress */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">02</span>
            Safe Access and Egress
          </h2>
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Getting on and off a scaffold safely is just as important
                as working on it. A significant proportion of
                scaffold-related falls occur during{" "}
                <strong>access and egress</strong> &mdash; climbing up,
                climbing down, and stepping onto or off platforms.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Internal Ladders
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      Internal ladders are the <strong className="text-white">preferred method</strong> of access on most scaffolds
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      They are fitted <strong className="text-white">within the scaffold structure</strong> and pass through trap doors in each platform
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      The ladder must be <strong className="text-white">securely fixed</strong> and must not move, rock, or slide during use
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      Trap doors must <strong className="text-white">close after you pass through</strong> to maintain the integrity of the platform above or below
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Secured External Ladders
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      External ladders must be <strong className="text-white">tied or clamped</strong> to the scaffold at the top and bottom
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      They must extend at least <strong className="text-white">1 metre (5 rungs) above</strong> the stepping-off point
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      The ladder must be set at the correct angle &mdash; approximately{" "}
                      <strong className="text-white">75 degrees</strong> (a 4:1 ratio of height to base)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      The base must rest on a <strong className="text-white">firm, level surface</strong> &mdash; never on loose material, mud, or uneven ground
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Stair Towers
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      Stair towers provide the <strong className="text-white">safest form of access</strong> and are preferred on larger scaffolds
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      They allow you to <strong className="text-white">face forwards</strong> while ascending and descending, rather than backwards as on a ladder
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      Stairways have <strong className="text-white">handrails</strong> on both sides for additional support
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      They are easier to use when carrying <strong className="text-white">small items</strong>, though a gin wheel or hoist is still preferred for heavy loads
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Improvised Access Kills
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  <strong className="text-white">Never</strong> climb the
                  scaffold standards, use ledgers as footholds, jump
                  between levels, or use an unsecured ladder leaning
                  against the scaffold. Improvised access is one of the{" "}
                  <strong className="text-white">
                    leading causes of fatal falls
                  </strong>{" "}
                  from scaffolds. If the designated access has been
                  removed or is unsafe, do not use the scaffold. Report
                  it and wait for a competent scaffolder to reinstate the
                  correct access.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Maintaining Three Points of Contact */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">03</span>
            Maintaining Three Points of Contact
          </h2>
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The three-points-of-contact rule is one of the most
                important safety techniques you will use when working on
                scaffolds. It applies every time you climb or descend a
                ladder, and it is{" "}
                <strong>simple, effective, and non-negotiable</strong>.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  How It Works
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      At all times, maintain <strong className="text-white">two hands and one foot</strong> or{" "}
                      <strong className="text-white">two feet and one hand</strong> in contact with the ladder
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      Move <strong className="text-white">one limb at a time</strong> &mdash; the other three remain securely in place
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Face the ladder</strong> at all times when climbing or descending
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Grip the rungs</strong>, not the side rails (stiles), for a more secure hold
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  What This Means in Practice
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      You <strong className="text-white">cannot carry tools, materials, or equipment</strong> in your hands while climbing
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      Tools must be raised and lowered using a <strong className="text-white">gin wheel, tool belt, or bucket and rope</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Never rush</strong> up or down a ladder &mdash; take your time and place each foot deliberately
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      If your boots are <strong className="text-white">wet, muddy, or icy</strong>, clean them before climbing to prevent slipping
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-slate-400">Why It Matters:</strong>{" "}
                  If one point of contact slips, the other two still
                  support you and give you a chance to recover. With only
                  two points of contact, a single slip means you have
                  nothing left to hold onto. The three-points-of-contact
                  rule is your primary defence against falling during
                  access and egress.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Keeping Platforms Clear and Tidy */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">04</span>
            Keeping Platforms Clear and Tidy
          </h2>
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A cluttered scaffold platform is a dangerous scaffold
                platform. Poor housekeeping is a contributing factor in a
                large proportion of scaffold-related incidents, including
                trips, falls, and objects falling from height.
              </p>

              {/* Diagram: Platform Housekeeping Guide */}
              <div className="bg-slate-500/10 border-2 border-slate-500/30 rounded-xl p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <ShieldCheck className="h-5 w-5 text-slate-400" />
                  <p className="text-base font-semibold text-white">
                    Platform Housekeeping Guide
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                    <p className="text-sm font-semibold text-green-400 mb-2">
                      DO
                    </p>
                    <ul className="text-sm text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>
                          Clear all debris, offcuts, and waste <strong className="text-white">at least twice per shift</strong>
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>
                          Stack materials <strong className="text-white">neatly and securely</strong> away from the platform edge
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>
                          Use <strong className="text-white">waste bags or skips</strong> to collect and remove rubbish
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>
                          Keep <strong className="text-white">walkways and access points</strong> completely unobstructed
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>
                          Lower unused materials to the ground using a <strong className="text-white">gin wheel or hoist</strong>
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                    <p className="text-sm font-semibold text-red-400 mb-2">
                      DO NOT
                    </p>
                    <ul className="text-sm text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                        <span>
                          Leave <strong className="text-white">loose materials near the edge</strong> &mdash; they can blow or fall off
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                        <span>
                          Allow <strong className="text-white">water, ice, or mud</strong> to accumulate on the platform
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                        <span>
                          Stack materials so high they <strong className="text-white">obstruct guardrails</strong> or block sightlines
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                        <span>
                          Throw <strong className="text-white">waste or debris off the scaffold</strong> &mdash; use proper lowering methods
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                        <span>
                          Leave <strong className="text-white">trailing cables or hoses</strong> across the platform as trip hazards
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <p>
                Good housekeeping is not just about comfort or
                appearance. Debris on a platform creates{" "}
                <strong>trip hazards</strong> that can cause falls within
                the platform or against guardrails. Materials left near
                the edge can be knocked off by wind or vibration and
                become <strong>falling objects</strong>. Excessive
                materials on the platform can also{" "}
                <strong>overload the scaffold</strong> beyond its designed
                capacity.
              </p>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-slate-400">Best Practice:</strong>{" "}
                  Adopt a &ldquo;clean as you go&rdquo; approach. At the
                  end of every task, take two minutes to clear your
                  immediate work area. At the end of every shift, carry
                  out a thorough tidy-up and remove all waste from the
                  platform. Leave the scaffold in a condition you would be
                  happy to find it in at the start of your next shift.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Not Overreaching */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">05</span>
            Not Overreaching
          </h2>
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Overreaching from a scaffold platform is one of the most
                common causes of falls from height in the UK construction
                industry. It happens when a worker leans, stretches, or
                extends their body{" "}
                <strong>beyond the safe working area</strong> of the
                platform to access work that is just out of comfortable
                reach.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Why Overreaching Is Dangerous
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      It shifts your <strong className="text-white">centre of gravity</strong> towards or beyond the edge of the platform
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      If your centre of gravity moves past the guardrail, you are at{" "}
                      <strong className="text-white">serious risk of toppling over it</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      A guardrail at 950 mm is roughly <strong className="text-white">waist height</strong> &mdash; it is easy to tip over it if leaning
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      Overreaching while using <strong className="text-white">power tools</strong> is especially dangerous because the tool&rsquo;s weight and vibration add to the imbalance
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  The Safe Alternative
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Reposition yourself</strong> so the work is directly in front of you at a comfortable arm&rsquo;s length
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      If you cannot reach from the existing platform, request that the{" "}
                      <strong className="text-white">scaffold be moved or extended</strong> by a competent scaffolder
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Keep your belt buckle</strong> (navel) within the footprint of the platform at all times &mdash; this is a useful body-awareness check
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      Never stand on <strong className="text-white">guardrails, toe boards, or intermediate rails</strong> to gain extra height or reach
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    The &ldquo;Just a Bit Further&rdquo; Trap
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Most overreaching incidents begin with the thought
                  &ldquo;I can <em>just</em> reach that if I lean a
                  little further.&rdquo; This is a{" "}
                  <strong className="text-white">
                    well-documented psychological trap
                  </strong>
                  . Moving the scaffold or walking to a different bay
                  takes a few minutes. Falling from the scaffold takes a
                  fraction of a second and can change your life forever.
                  The few minutes it takes to reposition are always worth
                  it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Using the Platform Properly */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">06</span>
            Using the Platform Properly
          </h2>
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A scaffold platform is a{" "}
                <strong>purpose-designed working surface</strong>. It is
                engineered to support specific loads, provide a safe
                working area at height, and integrate with the guardrail
                and access systems. Using it correctly is fundamental to
                scaffold safety.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Platform Rules
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Walk, do not run</strong> &mdash; running on a scaffold platform can cause you to trip over obstacles, lose your footing, or create excessive dynamic loads
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Stay within the guardrailed area</strong> at all times &mdash; never lean over, sit on, or stand on the guardrails
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Do not jump</strong> between platforms, between bays, or from the platform to adjacent structures
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Do not use ladders, stepladders, or hop-ups</strong> on the platform to gain extra height
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Respect the maximum load</strong> displayed on the scaffold tag &mdash; never exceed it
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Platform Boards
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      The platform must be <strong className="text-white">fully boarded</strong> &mdash; gaps between boards must not exceed 25 mm
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      Boards must <strong className="text-white">not overhang</strong> the supporting ledger by more than 150 mm (four times the board thickness is the general rule)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      Boards that are <strong className="text-white">cracked, split, warped, or rotten</strong> must be replaced immediately by a competent scaffolder
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Never remove boards</strong> yourself &mdash; this is the scaffolder&rsquo;s job
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-slate-400">Key Point:</strong>{" "}
                  The scaffold platform is a controlled working
                  environment. It has been designed, erected, and
                  inspected to provide a safe place to work. Altering it,
                  overloading it, or misusing it undermines every safety
                  measure that has been put in place. Treat the platform
                  with the same respect you would give to any other piece
                  of safety-critical equipment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 07: Tool Lanyards to Prevent Dropping */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">07</span>
            Tool Lanyards to Prevent Dropping
          </h2>
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Dropped tools are a{" "}
                <strong>significant hazard on every scaffold</strong>.
                Even a small tool falling from a relatively low height
                can cause serious or fatal injuries to people below. Tool
                lanyards are a simple, low-cost control measure that
                every scaffold user should employ.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  The Physics of Dropped Objects
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      A <strong className="text-white">500 g hammer</strong> dropped from 10 metres strikes the ground at approximately{" "}
                      <strong className="text-white">50 km/h</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      A <strong className="text-white">1 kg spanner</strong> dropped from 6 metres hits at approximately{" "}
                      <strong className="text-white">39 km/h</strong> &mdash; enough force to be fatal
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      Even a <strong className="text-white">small bolt or fitting</strong> can cause serious head injuries when dropped from scaffold height
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      A hard hat provides some protection, but it is{" "}
                      <strong className="text-white">not designed to absorb the full impact</strong> of a heavy falling tool
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Using Tool Lanyards
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      Attach the lanyard to the <strong className="text-white">tool&rsquo;s lanyard point</strong> (most modern hand tools have a dedicated hole or ring)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      Connect the other end to your <strong className="text-white">wrist strap, tool belt, or a secure anchor point</strong> on the scaffold
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      Check the <strong className="text-white">lanyard&rsquo;s weight rating</strong> &mdash; it must be suitable for the weight of the tool
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      Inspect lanyards for <strong className="text-white">fraying, cuts, or damage</strong> before each use and replace if defective
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      When not in active use, place tools in a <strong className="text-white">secure tool bag or bucket</strong> on the platform &mdash; never leave them loose near the edge
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Additional Dropped-Object Controls
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Toe boards</strong> (minimum 150 mm) prevent tools from rolling off the platform
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Brick guards</strong> or debris netting catch falling materials and small items
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Fans (scaffold protection canopies)</strong> deflect falling objects away from pedestrians and lower-level workers
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Exclusion zones</strong> at ground level beneath the scaffold prevent pedestrians from entering the drop zone
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 08: Working With Others on the Scaffold and Keeping Access Points Clear */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">08</span>
            Working With Others &amp; Keeping Access Points Clear
          </h2>
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Scaffolds are shared working environments. It is common
                for multiple trades &mdash; electricians, plumbers,
                bricklayers, painters &mdash; to be working on the same
                scaffold at different levels or in adjacent bays at the
                same time. This creates{" "}
                <strong>coordination requirements</strong> that every
                scaffold user must understand and follow.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Coordinating With Other Teams
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Communicate</strong> before starting work &mdash; find out who else is on the scaffold, where they are working, and what they are doing
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Never work directly above another team</strong> unless specific falling-object protection (fans, netting, exclusion) is in place
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Warn others</strong> before moving heavy materials, using power tools that generate vibration, or carrying out any activity that could affect people on other levels
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Avoid overcrowding</strong> &mdash; too many people on one platform can exceed the maximum load and creates congestion
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Report conflicts</strong> to your supervisor &mdash; if two activities cannot be carried out safely at the same time, one must be rescheduled
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Keeping Access Points Clear
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      Access points (ladders, stair towers, trap doors) must be{" "}
                      <strong className="text-white">clear and unobstructed at all times</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      Never store <strong className="text-white">materials, tools, or waste</strong> on or next to ladders, stair landings, or trap door openings
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      Do not route <strong className="text-white">cables, hoses, or leads</strong> across access routes where they could trip someone
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      In an <strong className="text-white">emergency evacuation</strong>, a blocked access point could prevent people from leaving the scaffold quickly and safely
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      If you find an access point <strong className="text-white">blocked by another trade&rsquo;s materials</strong>, do not move them yourself unless it is safe to do so &mdash; ask the other team to clear them
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Emergency Egress
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  In the event of a fire, structural failure, or severe
                  weather, every person on the scaffold must be able to
                  descend to ground level{" "}
                  <strong className="text-white">quickly and safely</strong>.
                  Blocked access points, missing ladders, or materials
                  stored on stair landings can turn a controlled
                  evacuation into a fatal delay. Keeping access points
                  clear is not optional &mdash; it is a{" "}
                  <strong className="text-white">life-safety requirement</strong>.
                </p>
              </div>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-slate-400">
                    Shared Responsibility:
                  </strong>{" "}
                  Every person who uses a scaffold has a responsibility to
                  maintain it in a safe condition. This is not just the
                  scaffolder&rsquo;s job or the site manager&rsquo;s job
                  &mdash; it is everyone&rsquo;s job. If you see
                  something wrong, report it. If you can fix it safely
                  (such as clearing your own debris or picking up a tool
                  someone has left behind), do so. The scaffold is only as
                  safe as the behaviour of the people using it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="pb-4 border-b border-white/5 last:border-0"
              >
                <h3 className="text-sm font-medium text-white mb-1">
                  {faq.question}
                </h3>
                <p className="text-sm text-white/80 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz title="Section 1 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../scaffolding-awareness-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 5
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-slate-500 text-white hover:bg-slate-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../scaffolding-awareness-module-5-section-2">
              Next: Common Scaffold Hazards
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
