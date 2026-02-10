import {
  ArrowLeft,
  Heart,
  CheckCircle,
  AlertTriangle,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "non-entry-rescue-preferred",
    question:
      "Why is non-entry rescue considered the preferred method for retrieving a casualty from a confined space?",
    options: [
      "It is cheaper than entry rescue",
      "It avoids exposing rescue personnel to the same hazards that incapacitated the casualty",
      "It does not require any special equipment",
      "It is only used when the casualty is conscious and cooperative",
    ],
    correctIndex: 1,
    explanation:
      "Non-entry rescue is the preferred method because it retrieves the casualty from outside the confined space using mechanical means (tripod, winch, lifeline). This avoids placing rescue personnel inside the hazardous atmosphere or environment that caused the original incident. Statistics consistently show that a significant proportion of confined space fatalities are would-be rescuers who entered without adequate protection. Eliminating the need for rescuers to enter the space dramatically reduces the risk of multiple casualties.",
  },
  {
    id: "winch-certification",
    question:
      "What specific certification must a rescue winch hold before it can be used to raise or lower a person?",
    options: [
      "CE marking only",
      "Man-riding certification with a rated load capacity typically between 140 and 180 kg",
      "A general lifting equipment certificate",
      "No specific certification is required if it is inspected before each use",
    ],
    correctIndex: 1,
    explanation:
      "A rescue winch used for raising or lowering persons must hold man-riding certification. This confirms the winch has been designed, tested, and approved specifically for the purpose of suspending or transporting a human being. Man-riding equipment is subject to more stringent design standards than general lifting equipment, including built-in fall arrest capability, controlled descent speed, and a rated load capacity (typically 140-180 kg to accommodate a worker plus PPE and tools). It must also undergo thorough examination under LOLER at least every 6 months.",
  },
  {
    id: "equipment-pre-positioning",
    question:
      "When must all rescue equipment be positioned at the entry point of a confined space?",
    options: [
      "Within 15 minutes of work commencing",
      "Before any person enters the confined space",
      "Once the standby person has confirmed the atmosphere is safe",
      "Only when a rescue situation has been identified",
    ],
    correctIndex: 1,
    explanation:
      "All rescue equipment must be positioned at the entry point BEFORE any person enters the confined space. This is a fundamental requirement of the rescue plan under Regulation 5 of the Confined Spaces Regulations 1997. Equipment stored elsewhere on site — in a van, a stores compound, or a different building — is useless when seconds count. The rescue plan must specify exactly what equipment is required, and a pre-entry check must confirm that every item is present, functional, and ready for immediate use at the point of entry.",
  },
];

const faqs = [
  {
    question:
      "Can a standard industrial winch be used for confined space rescue instead of a dedicated rescue winch?",
    answer:
      "No. A standard industrial winch is designed for lifting materials, not people. It lacks the critical safety features required for man-riding operations: controlled descent speed to prevent injury during lowering, an integrated fall arrest mechanism to catch a person if the winch fails, and the appropriate rated load capacity tested to man-riding standards. Using a standard winch to raise or lower a person is a breach of LOLER and PUWER and could result in catastrophic failure. Only a winch holding man-riding certification — designed, tested, and approved for suspending and transporting persons — may be used for confined space rescue.",
  },
  {
    question:
      "What is the difference between a rescue harness and a standard fall arrest harness?",
    answer:
      "A rescue harness is a full body harness that includes a dorsal (back) attachment point specifically rated for suspension rescue — meaning it can support the full weight of a person being raised or lowered vertically. Many rescue harnesses also include sternal (front) and lateral (side) attachment points. A standard fall arrest harness may look similar but is designed solely to arrest a fall and distribute impact forces; it may not have attachment points rated for prolonged suspension or for connecting to a rescue winch. For confined space work, the harness worn by every entrant must be a rescue-capable harness with a dorsal D-ring connected to the rescue lifeline before entry, so that non-entry rescue can be initiated immediately if needed.",
  },
  {
    question:
      "Why is a Neil Robertson stretcher commonly specified for confined space rescue rather than a standard ambulance stretcher?",
    answer:
      "The Neil Robertson stretcher is a rigid, narrow-profile stretcher originally designed for extracting casualties from ships' holds and other confined environments. It wraps around the casualty and is secured with integral straps, effectively immobilising the person in a vertical or near-vertical position. This is essential for confined space rescue because the casualty often needs to be raised vertically through a manhole or narrow opening where a standard flat ambulance stretcher simply would not fit. The stretcher's rigid construction also provides spinal support, and its narrow profile allows passage through hatches and openings as small as 450 mm in diameter.",
  },
  {
    question:
      "How often must confined space rescue equipment undergo thorough examination, and under which regulation?",
    answer:
      "Under the Lifting Operations and Lifting Equipment Regulations 1998 (LOLER), all lifting equipment used for raising or lowering persons — including rescue winches, tripods, davit arms, and associated lifting accessories such as karabiners and shackles — must undergo a thorough examination by a competent person at least every 6 months. Other lifting equipment not used for persons must be examined at least every 12 months. In addition to LOLER examinations, rescue equipment must receive pre-use visual checks before every deployment and periodic servicing in accordance with the manufacturer's instructions. All examination reports, defect notifications, and service records must be retained and available for inspection.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "What is the primary advantage of non-entry rescue over entry rescue for confined space incidents?",
    options: [
      "Non-entry rescue is faster in all situations",
      "Non-entry rescue avoids exposing rescue personnel to the hazards inside the confined space",
      "Non-entry rescue does not require any planning or equipment",
      "Non-entry rescue can only be used for vertical entries",
    ],
    correctAnswer: 1,
    explanation:
      "The primary advantage of non-entry rescue is that it avoids exposing rescue personnel to the same hazardous conditions — toxic atmosphere, oxygen deficiency, engulfment risk — that caused the original incident. A significant proportion of confined space fatalities are would-be rescuers. Non-entry rescue uses mechanical means (tripod, winch, lifeline) to retrieve the casualty from outside the space, eliminating the need for anyone else to enter the hazardous environment.",
  },
  {
    id: 2,
    question:
      "A rescue winch used for raising and lowering persons typically has a rated load capacity within which range?",
    options: [
      "50-80 kg",
      "80-120 kg",
      "140-180 kg",
      "200-300 kg",
    ],
    correctAnswer: 2,
    explanation:
      "Man-riding rescue winches are typically rated between 140 and 180 kg. This capacity must accommodate the combined weight of the casualty, their PPE, tools, and any additional rescue equipment attached to the lifeline. The rated load capacity is established through rigorous testing to man-riding standards and must never be exceeded. Using a winch at or near its maximum rated capacity for an extended period can compromise the fall arrest mechanism and controlled descent function.",
  },
  {
    id: 3,
    question:
      "Under LOLER, how frequently must lifting equipment used for raising or lowering persons undergo thorough examination?",
    options: [
      "Every 3 months",
      "Every 6 months",
      "Every 12 months",
      "Every 24 months",
    ],
    correctAnswer: 1,
    explanation:
      "LOLER (Lifting Operations and Lifting Equipment Regulations 1998) requires that lifting equipment used for raising or lowering persons undergoes thorough examination by a competent person at least every 6 months. This applies to rescue winches, tripods, davit arms, and all associated lifting accessories. Equipment not used for persons requires examination at least every 12 months. These are minimum frequencies — more frequent examinations may be required based on the equipment manufacturer's recommendations or the conditions of use.",
  },
  {
    id: 4,
    question:
      "What is the correct purpose of a dorsal attachment point on a rescue harness?",
    options: [
      "To attach a tool lanyard for carrying hand tools",
      "To connect the rescue lifeline for vertical suspension and retrieval",
      "To clip the harness to a fixed anchor during normal work",
      "To attach a personal gas monitor",
    ],
    correctAnswer: 1,
    explanation:
      "The dorsal (back) attachment point — the D-ring located between the shoulder blades — is specifically rated for suspension rescue. It is the point where the rescue lifeline from the winch is connected before the worker enters the confined space. In a rescue situation, the worker is raised vertically by this attachment point, which positions the body upright and distributes the load through the harness. The dorsal attachment must be rated for the full suspended weight of the wearer and connected to the lifeline at all times during confined space entry.",
  },
  {
    id: 5,
    question:
      "Which type of breathing apparatus provides the longest duration of respiratory protection for a rescue team entering a contaminated confined space?",
    options: [
      "A filtering facepiece (FFP3) disposable mask",
      "Self-contained breathing apparatus (SCBA)",
      "Airline breathing apparatus (airline BA)",
      "An escape set",
    ],
    correctAnswer: 2,
    explanation:
      "Airline breathing apparatus (airline BA) provides the longest duration of respiratory protection because it supplies clean breathing air from an external source (compressed air cylinder bank or compressor) via a hose. Unlike SCBA, which is limited to the air in the cylinder on the wearer's back (typically 30-45 minutes), airline BA can supply air continuously for as long as the external source lasts. This makes it the preferred option for extended rescue operations where the rescue team may need to work inside the confined space for a prolonged period.",
  },
  {
    id: 6,
    question:
      "A horizontal confined space entry requires casualty extraction. Which of the following methods is most appropriate?",
    options: [
      "Tripod and rescue winch",
      "Stretcher extraction with drag rescue device or guide rails",
      "Davit arm system",
      "Free-standing ladder and manual lifting",
    ],
    correctAnswer: 1,
    explanation:
      "For horizontal entry points (tunnels, culverts, pipes), a stretcher extraction using a drag rescue device (DRD) or guide rail system is most appropriate. Tripods and davit arms are designed for vertical entries (manholes, hatches) where the casualty is raised vertically. In a horizontal space, the casualty must be placed on a narrow-profile stretcher and drawn horizontally along the length of the space to the entry point. Guide rails or slide systems reduce friction and allow a single rescuer to move the stretcher smoothly. A drag rescue device — a webbing harness integrated into the casualty's clothing — allows rapid dragging extraction if a stretcher cannot be deployed.",
  },
  {
    id: 7,
    question:
      "What is the critical requirement for the rescue lifeline connected to a worker entering a confined space via a tripod and winch system?",
    options: [
      "The lifeline must be colour-coded red",
      "The lifeline must be kept taut at all times so that retrieval can begin immediately",
      "The lifeline must be disconnected once the worker reaches the bottom",
      "The lifeline is only required if the space has a hazardous atmosphere",
    ],
    correctAnswer: 1,
    explanation:
      "The rescue lifeline must be kept taut at all times during the worker's presence inside the confined space. A slack lifeline means that if the worker collapses, the winch operator would first need to take up the slack before any upward movement begins — wasting critical seconds. By keeping the line taut (with the winch paying out smoothly as the worker moves), retrieval can begin immediately the moment the winch operator engages the raise function. The lifeline must be connected to the worker's dorsal attachment point before entry and must remain connected throughout the entire period of work.",
  },
  {
    id: 8,
    question:
      "Which of the following items must be included in the rescue equipment pre-positioned at the entry point before confined space work begins?",
    options: [
      "Only the tripod and winch — other equipment can be fetched if needed",
      "All equipment specified in the rescue plan, including rescue BA, stretcher, first aid kit, and communication equipment",
      "Only equipment required for non-entry rescue — entry rescue equipment can be stored elsewhere",
      "A first aid kit only, as rescue equipment is provided by the emergency services",
    ],
    correctAnswer: 1,
    explanation:
      "ALL rescue equipment specified in the rescue plan must be pre-positioned at the entry point before any person enters the confined space. This includes the tripod/davit, winch, rescue harnesses, breathing apparatus sets for the rescue team, confined space stretcher, first aid equipment (resuscitation kit, oxygen therapy, spinal immobilisation), communication equipment (backup systems), atmospheric monitoring equipment for the rescue team, and any specialist equipment such as cutting tools. Equipment stored elsewhere on site is useless in an emergency where every second counts. Pre-entry checks must confirm every item is present and functional.",
  },
];

export default function ConfinedSpacesModule5Section2() {
  useSEO({
    title:
      "Rescue Equipment & Techniques | Confined Spaces Module 5.2",
    description:
      "Non-entry rescue, tripods and winches, davit arm systems, rescue harnesses, breathing apparatus, confined space stretchers, first aid provisions, and equipment pre-positioning requirements.",
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
            <Link to="../confined-spaces-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-cyan-400/20 border border-cyan-500/30 mb-4">
            <Heart className="h-7 w-7 text-cyan-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-3 mx-auto">
            <span className="text-cyan-500 text-xs font-semibold">
              MODULE 5 &middot; SECTION 2
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Rescue Equipment &amp; Techniques
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Tripods, winches, davit arms, rescue harnesses, breathing apparatus,
            confined space stretchers, first aid provisions, and the critical
            requirement to pre-position all equipment before entry
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-cyan-500/5 border-l-2 border-cyan-500/50">
            <p className="text-cyan-500 text-base font-medium mb-2">
              In 30 Seconds
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Non-entry rescue:</strong> Preferred method &mdash;
                retrieve from outside using mechanical means
              </li>
              <li>
                <strong>Man-riding winch:</strong> Rated 140-180 kg, fall arrest
                built in, LOLER examined every 6 months
              </li>
              <li>
                <strong>Lifeline taut:</strong> Connected to dorsal D-ring,
                kept taut at all times during entry
              </li>
              <li>
                <strong>Pre-positioned:</strong> ALL rescue equipment at the
                entry point BEFORE work begins
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-cyan-500/5 border-l-2 border-cyan-500/50">
            <p className="text-cyan-400 text-base font-medium mb-2">
              On Site
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Tripod + winch:</strong> Vertical entries &mdash;
                manholes, hatches, shafts
              </li>
              <li>
                <strong>Stretcher:</strong> Neil Robertson or basket stretcher
                for vertical retrieval
              </li>
              <li>
                <strong>Rescue BA:</strong> SCBA for immediate entry, airline
                BA for extended operations
              </li>
              <li>
                <strong>First aid:</strong> Resuscitation, oxygen therapy,
                spinal immobilisation at entry point
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
              "Explain why non-entry rescue is the preferred method and describe how it is performed using a tripod and winch system",
              "Identify the key components and certification requirements for rescue winches, including man-riding rating and LOLER examinations",
              "Describe the function and application of davit arm systems for confined space rescue",
              "Explain the purpose of a rescue harness with dorsal attachment point and why the lifeline must be kept taut",
              "Select appropriate breathing apparatus for rescue operations, distinguishing between SCBA, airline BA, and escape sets",
              "Identify the types of stretcher used in confined space rescue and explain when each is appropriate",
              "List the first aid, communication, and additional rescue equipment that must be available at the entry point",
              "Explain the pre-positioning requirement and the inspection and maintenance regime for rescue equipment",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-cyan-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Non-Entry Rescue */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-500/80 text-sm font-normal">01</span>
            Non-Entry Rescue (Preferred Method)
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Non-entry rescue is the <strong>preferred method</strong> for
                retrieving a casualty from a confined space. The principle is
                straightforward: rather than sending additional people into the
                hazardous environment, the casualty is retrieved from{" "}
                <strong>outside</strong> the space using mechanical means. This
                approach eliminates the single greatest cause of multiple
                fatalities in confined space incidents &mdash; rescuers entering
                the space and being overcome by the same hazard that
                incapacitated the original casualty.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Critical Safety Fact
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  <strong className="text-white">
                    Over 60% of confined space fatalities in the UK are
                    would-be rescuers
                  </strong>{" "}
                  who entered the space without adequate protection. Non-entry
                  rescue breaks this cycle by keeping rescue personnel outside
                  the hazardous environment at all times.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">
                  How Non-Entry Rescue Works
                </p>
                <div className="space-y-3 text-sm text-white/80">
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Before Entry
                      </p>
                      <p>
                        A rescue lifeline is attached to the worker&rsquo;s
                        dorsal attachment point (the D-ring between the shoulder
                        blades on the rescue harness). The other end of the
                        lifeline is connected to a man-riding rescue winch
                        mounted on a tripod or davit arm positioned directly
                        above or adjacent to the entry point.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        During Work
                      </p>
                      <p>
                        The lifeline remains connected and is kept{" "}
                        <strong className="text-white">taut</strong> at all
                        times. The standby person monitors the worker from
                        outside. If the worker collapses, becomes unresponsive,
                        or signals distress, retrieval can begin immediately
                        without anyone entering the space.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Retrieval
                      </p>
                      <p>
                        The standby person (or winch operator) engages the
                        raise function on the winch. The casualty is raised
                        vertically through the opening to the surface, where
                        first aid and further medical treatment can be provided
                        in a safe environment.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-cyan-500">Key Principle:</strong>{" "}
                  Non-entry rescue only works if the correct equipment is in
                  place <strong>before</strong> entry begins. A harness without
                  a connected lifeline, a winch without a tripod, or a
                  lifeline with excessive slack are all situations where
                  non-entry rescue will fail when it is needed most.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Tripod and Rescue Winch */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-500/80 text-sm font-normal">02</span>
            Tripod &amp; Rescue Winch
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>tripod and rescue winch</strong> is the most
                commonly used non-entry rescue system for vertical confined
                space entries &mdash; manholes, hatches, shafts, and similar
                openings. The tripod is positioned directly over the opening,
                and the winch is mounted at the apex, providing a direct
                vertical lifting line into the space below.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">
                  Tripod Requirements
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Adjustable legs</strong>{" "}
                      &mdash; to accommodate uneven ground and different
                      opening sizes
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Safety chain</strong>{" "}
                      &mdash; connects the legs to prevent accidental
                      spreading under load
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Rated load</strong>{" "}
                      &mdash; must be rated for the combined weight of the
                      person, PPE, tools, and rescue equipment
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Feet positioned on firm ground
                      </strong>{" "}
                      &mdash; never on loose fill, soft earth, or unstable
                      surfaces
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">
                  Rescue Winch Requirements
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Man-riding certification
                      </strong>{" "}
                      &mdash; the winch must be specifically designed, tested,
                      and certified for raising and lowering persons
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Rated load capacity
                      </strong>{" "}
                      &mdash; typically{" "}
                      <strong className="text-cyan-400">140-180 kg</strong>,
                      accounting for worker weight plus PPE and tools
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Fall arrest capability
                      </strong>{" "}
                      &mdash; integrated mechanism to arrest a fall
                      automatically if the person slips or the winch
                      malfunctions during descent
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Controlled descent and ascent
                      </strong>{" "}
                      &mdash; smooth, controlled lowering and raising at a
                      safe speed to prevent injury
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Thorough examination under LOLER
                      </strong>{" "}
                      &mdash; at least every{" "}
                      <strong className="text-cyan-400">6 months</strong> for
                      man-riding equipment, with annual servicing as specified
                      by the manufacturer
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-cyan-500">Davit Arm Systems:</strong>{" "}
                  Where a tripod cannot be positioned over the opening (e.g.
                  obstructions, limited headroom), a{" "}
                  <strong>davit arm</strong> provides an alternative. The davit
                  arm is mounted on a fixed or portable base adjacent to the
                  opening, with a swing arm that extends over the entry point.
                  An integrated winch is mounted on the arm. Davit systems
                  offer the same rescue capability as tripods but allow the
                  base to be offset from the opening, making them suitable for
                  entries where overhead clearance is restricted or where the
                  opening is flush with a wall.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Styled-Div Diagram: Tripod Rescue Setup */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <span className="text-cyan-500/80 text-sm font-normal">
              &mdash;
            </span>
            Tripod Rescue Setup
          </h2>
          <div className="bg-white/5 border border-cyan-500/30 rounded-xl p-4 sm:p-6 overflow-x-auto">
            <div className="min-w-[300px] max-w-lg mx-auto space-y-3">
              {/* Tripod Apex */}
              <div className="flex flex-col items-center">
                <div className="border-2 border-cyan-500/60 rounded-lg bg-cyan-500/10 px-4 py-2 text-centre">
                  <p className="text-sm font-medium text-cyan-400">
                    Rescue Winch
                  </p>
                  <p className="text-[10px] text-white/50">
                    Man-riding certified &middot; 140-180 kg rated
                  </p>
                </div>
                <div className="w-px h-4 bg-cyan-500/40" />
                <div className="border-2 border-white/30 rounded-lg bg-[#2a2a2a] px-6 py-3 text-centre">
                  <p className="text-sm font-medium text-white/80">
                    Tripod Apex
                  </p>
                  <p className="text-[10px] text-white/50">
                    Pulley / sheave at top
                  </p>
                </div>
              </div>

              {/* Legs spread */}
              <div className="flex items-end justify-between px-4 sm:px-8">
                <div className="flex flex-col items-center">
                  <div className="w-px h-10 bg-white/20 rotate-[25deg]" />
                  <span className="text-[9px] text-white/40 mt-1">Leg A</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-0.5 h-12 bg-cyan-400/50" />
                  <span className="text-[9px] text-cyan-400 mt-1 font-medium">
                    Lifeline (taut)
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-px h-10 bg-white/20 rotate-[-25deg]" />
                  <span className="text-[9px] text-white/40 mt-1">Leg B</span>
                </div>
              </div>

              {/* Safety chain */}
              <div className="flex items-center justify-center gap-2">
                <div className="h-px flex-1 bg-white/10 border-dashed border-t border-white/20" />
                <span className="text-[9px] text-white/40 px-2">
                  Safety chain between legs
                </span>
                <div className="h-px flex-1 bg-white/10 border-dashed border-t border-white/20" />
              </div>

              {/* Ground / opening */}
              <div className="relative border-2 border-white/20 rounded-lg bg-[#222] p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] text-white/50">Ground level</span>
                  <span className="text-[10px] text-white/50">
                    Manhole / hatch opening
                  </span>
                </div>
                <div className="border-2 border-dashed border-cyan-500/30 rounded bg-cyan-500/5 p-3 text-centre">
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-8 h-8 rounded-full border-2 border-cyan-400/50 bg-cyan-500/10 flex items-center justify-center">
                      <span className="text-[10px] text-cyan-400 font-bold">
                        W
                      </span>
                    </div>
                    <p className="text-xs text-white/60">Worker</p>
                    <p className="text-[9px] text-cyan-400/80">
                      Rescue harness with dorsal D-ring
                    </p>
                    <p className="text-[9px] text-white/40">
                      Lifeline connected to D-ring &rarr; up to winch
                    </p>
                  </div>
                </div>
              </div>

              {/* Key notes */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-2 text-centre">
                  <p className="text-[10px] text-cyan-400 font-medium">
                    Fall Arrest
                  </p>
                  <p className="text-[9px] text-white/50">
                    Integrated in winch
                  </p>
                </div>
                <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-2 text-centre">
                  <p className="text-[10px] text-cyan-400 font-medium">
                    LOLER Exam
                  </p>
                  <p className="text-[9px] text-white/50">
                    Every 6 months (persons)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 03: Rescue Harness and Lifeline */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-500/80 text-sm font-normal">03</span>
            Rescue Harness &amp; Lifeline
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Every person entering a confined space where non-entry rescue
                is part of the rescue plan must wear a{" "}
                <strong>full body rescue harness</strong> with a{" "}
                <strong>dorsal attachment point</strong> (the D-ring located
                between the shoulder blades). The rescue lifeline is connected
                to this dorsal D-ring before the worker enters the space, and
                the other end is connected to the rescue winch.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">
                  Rescue Harness Requirements
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Full body harness
                      </strong>{" "}
                      &mdash; not a belt or chest harness; must distribute
                      the load across the torso and thighs during suspension
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Dorsal attachment point
                      </strong>{" "}
                      &mdash; the D-ring between the shoulder blades, rated
                      for suspension rescue and for connecting to the rescue
                      lifeline
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Correct sizing and adjustment
                      </strong>{" "}
                      &mdash; a loose or ill-fitting harness can shift during
                      suspension, causing the casualty to slip out or suffer
                      suspension trauma
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Pre-use inspection
                      </strong>{" "}
                      &mdash; check all webbing, stitching, buckles, and
                      D-rings for damage, wear, or contamination before every
                      use
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">
                  Lifeline Requirements
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Connected before entry
                      </strong>{" "}
                      &mdash; the lifeline must be attached to the
                      worker&rsquo;s dorsal D-ring and the winch before the
                      worker enters the confined space
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Kept taut</strong>{" "}
                      &mdash; the winch operator pays out the line smoothly as
                      the worker descends or moves, maintaining tension so
                      that retrieval can begin immediately without taking up
                      slack
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Remains connected throughout
                      </strong>{" "}
                      &mdash; the lifeline is never disconnected whilst the
                      worker is inside the confined space; disconnecting
                      defeats the entire non-entry rescue system
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Suspension Trauma Risk
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  <strong className="text-white">
                    Suspension trauma (harness hang syndrome)
                  </strong>{" "}
                  can develop within 15-20 minutes when a person is suspended
                  motionless in a harness. Blood pools in the legs, reducing
                  venous return to the heart, and can lead to loss of
                  consciousness and death. Rapid retrieval is essential
                  &mdash; every minute counts once a casualty is hanging
                  motionless in a harness.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Horizontal Entry Rescue */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-500/80 text-sm font-normal">04</span>
            Horizontal Entry Rescue
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Not all confined space entries are vertical. Tunnels, culverts,
                large-diameter pipes, and ductwork are accessed through{" "}
                <strong>horizontal or near-horizontal openings</strong>. The
                retrieval methods for horizontal entries differ significantly
                from vertical entries because the casualty must be moved along
                the length of the space rather than raised upward.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">
                  Horizontal Retrieval Methods
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Stretcher extraction
                      </strong>{" "}
                      &mdash; the casualty is placed on a narrow-profile,
                      rigid stretcher and drawn horizontally along the space
                      to the entry point. Guide rails or slide systems reduce
                      friction and allow smoother movement
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Drag rescue device (DRD)
                      </strong>{" "}
                      &mdash; a webbing harness integrated into the
                      worker&rsquo;s clothing or worn underneath the outer
                      coverall. It has a handle or loop at the shoulder that
                      allows a rescuer to grasp and drag the casualty rapidly
                      out of the space without needing to apply a stretcher
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Guide rails</strong>{" "}
                      &mdash; fixed or temporary rails installed along the
                      floor of the space, allowing a stretcher or casualty
                      sled to be slid along with minimal friction
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-cyan-500">Planning Note:</strong>{" "}
                  Horizontal rescue is inherently more difficult than vertical
                  non-entry rescue because it may require a rescuer to enter
                  the space to apply the stretcher or initiate the drag. The
                  rescue plan must account for this and ensure that any
                  rescuer entering the space has appropriate BA, a
                  communication system, and a secondary rescue plan for the
                  rescuer themselves.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Rescue Breathing Apparatus */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-500/80 text-sm font-normal">05</span>
            Rescue Breathing Apparatus
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                When entry rescue is required &mdash; because non-entry rescue
                is not feasible or has failed &mdash; the rescue team must have
                appropriate{" "}
                <strong>respiratory protective equipment (RPE)</strong> for
                entering a potentially contaminated atmosphere. The type of
                breathing apparatus selected depends on the hazard, the
                expected duration of the rescue, and the physical constraints
                of the space.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">
                  Self-Contained Breathing Apparatus (SCBA)
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Compressed air cylinder on the wearer&rsquo;s back
                      </strong>{" "}
                      &mdash; provides a self-contained air supply independent
                      of the surrounding atmosphere
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Typical duration: 30-45 minutes
                      </strong>{" "}
                      (depending on cylinder size and user exertion level)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Suitable for immediate rescue entry
                      </strong>{" "}
                      into unknown or confirmed toxic/oxygen-deficient
                      atmospheres
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Limitation:</strong>{" "}
                      bulky cylinder adds width and weight, which may restrict
                      movement in very tight spaces
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">
                  Airline Breathing Apparatus (Airline BA)
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Clean air supplied via a hose
                      </strong>{" "}
                      from an external source (compressed air cylinder bank or
                      compressor) located outside the confined space
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Extended duration
                      </strong>{" "}
                      &mdash; air supply is continuous for as long as the
                      external source lasts, making it ideal for{" "}
                      <strong className="text-cyan-400">
                        extended rescue operations
                      </strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Limitation:</strong> the
                      airline hose restricts the wearer&rsquo;s range of
                      movement and may become snagged or damaged in complex
                      spaces; a small emergency escape cylinder must be
                      carried as a backup
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">
                  Escape Sets (Self-Rescue)
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Small, lightweight breathing apparatus
                      </strong>{" "}
                      carried by the worker for self-rescue in an emergency
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Typical duration: 10-15 minutes
                      </strong>{" "}
                      &mdash; enough to evacuate the space, not to perform work
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Not a substitute for primary BA
                      </strong>{" "}
                      &mdash; escape sets are a last resort for the worker to
                      reach clean air, not for use by rescue teams
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Filtering RPE Is Not Acceptable
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  <strong className="text-white">
                    Filtering facepieces (FFP masks) and powered air purifying
                    respirators (PAPRs) must NEVER be used for confined space
                    rescue entry.
                  </strong>{" "}
                  These devices filter the surrounding air &mdash; they do not
                  provide an independent air supply. In an oxygen-deficient or
                  immediately dangerous to life or health (IDLH) atmosphere,
                  filtering RPE offers no protection whatsoever. Only
                  atmosphere-supplying BA (SCBA or airline) is acceptable for
                  entry into a contaminated confined space.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Confined Space Stretchers */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-500/80 text-sm font-normal">06</span>
            Confined Space Stretchers
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Standard ambulance stretchers are too wide and too flat for
                confined space rescue. Purpose-designed{" "}
                <strong>confined space stretchers</strong> are narrow,
                rigid, and capable of being used vertically &mdash; essential
                qualities when extracting a casualty through a manhole or
                narrow hatch.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">
                  Stretcher Types
                </p>
                <div className="space-y-3">
                  <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3">
                    <div className="flex items-start gap-3">
                      <span className="text-cyan-400 font-bold text-sm mt-0.5 flex-shrink-0">
                        NR
                      </span>
                      <div>
                        <p className="text-sm font-medium text-white">
                          Neil Robertson Stretcher
                        </p>
                        <p className="text-xs text-white/60 mt-0.5">
                          Rigid, narrow-profile, wraps around the casualty
                          with integral straps. Originally designed for
                          ship&rsquo;s holds. Can be used vertically &mdash;
                          ideal for extraction through manholes. Provides
                          some spinal immobilisation. Passes through openings
                          as small as 450 mm diameter.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3">
                    <div className="flex items-start gap-3">
                      <span className="text-cyan-400 font-bold text-sm mt-0.5 flex-shrink-0">
                        BS
                      </span>
                      <div>
                        <p className="text-sm font-medium text-white">
                          Basket Stretcher (Stokes Litter)
                        </p>
                        <p className="text-xs text-white/60 mt-0.5">
                          Wire or plastic mesh basket with rigid frame. The
                          casualty lies inside and is secured with straps.
                          Provides good protection during lifting. Can be
                          used vertically with appropriate rigging. Wider
                          profile than Neil Robertson &mdash; may not fit
                          through very narrow openings.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3">
                    <div className="flex items-start gap-3">
                      <span className="text-cyan-400 font-bold text-sm mt-0.5 flex-shrink-0">
                        SC
                      </span>
                      <div>
                        <p className="text-sm font-medium text-white">
                          Scoop Stretcher
                        </p>
                        <p className="text-xs text-white/60 mt-0.5">
                          Splits into two halves that are &ldquo;scooped&rdquo;
                          under the casualty from each side without rolling
                          them. Used where spinal injury is suspected and
                          minimal movement is critical. Not suitable for
                          vertical lifting &mdash; used for initial
                          packaging before transfer to a rescue stretcher.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-cyan-500">Selection Criteria:</strong>{" "}
                  The choice of stretcher depends on the size of the opening,
                  the orientation of the extraction (vertical or horizontal),
                  and the nature of the casualty&rsquo;s injuries. The rescue
                  plan must specify which type of stretcher is required for
                  each confined space, and the stretcher must be present at
                  the entry point before work begins.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 07: First Aid and Communication Equipment */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-500/80 text-sm font-normal">07</span>
            First Aid &amp; Communication Equipment
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The rescue plan must specify the{" "}
                <strong>first aid equipment</strong> appropriate to the
                foreseeable injuries for each confined space. First aid
                equipment must be positioned at the entry point and
                immediately available to the rescue team. It is not
                sufficient to rely on a first aid box kept in the site
                office or a vehicle &mdash; every second counts in a
                confined space emergency.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">
                  First Aid Provisions
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Resuscitation equipment
                      </strong>{" "}
                      &mdash; pocket mask, bag-valve mask (BVM), or
                      mechanical resuscitator for providing artificial
                      ventilation to a non-breathing casualty
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Oxygen therapy</strong>{" "}
                      &mdash; supplemental oxygen delivery system with
                      appropriate masks and flow regulators; essential for
                      casualties exposed to toxic gases or oxygen-deficient
                      atmospheres
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Spinal immobilisation
                      </strong>{" "}
                      &mdash; cervical collar, head blocks, and spinal board
                      or scoop stretcher for casualties who may have fallen
                      or suffered impact injuries
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Burns kit</strong>{" "}
                      &mdash; sterile burns dressings and cooling gel for
                      thermal or chemical burns that may be foreseeable in
                      certain confined spaces (e.g. near hot process
                      equipment or chemical storage)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Standard first aid kit
                      </strong>{" "}
                      &mdash; wound dressings, bandages, eye wash, and other
                      supplies appropriate to the foreseeable risks of the
                      specific confined space
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">
                  Communication Equipment
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Backup communication system
                      </strong>{" "}
                      &mdash; the rescue plan must include a backup
                      communication system that is{" "}
                      <strong className="text-cyan-400">
                        independent of the primary system
                      </strong>
                      . If the primary system is a two-way radio, the backup
                      might be a hard-wired intercom, visual signals, or a
                      tug-line code
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Intrinsically safe
                      </strong>{" "}
                      &mdash; all electronic communication equipment used in
                      a confined space must be rated for use in potentially
                      flammable or explosive atmospheres where such risks
                      exist
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Communication failure protocol
                      </strong>{" "}
                      &mdash; the rescue plan must state what action is taken
                      if communication is lost (typically: immediate
                      evacuation of the space and initiation of rescue
                      procedures)
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">
                  Additional Rescue Equipment
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Cutting equipment
                      </strong>{" "}
                      &mdash; for casualties who are trapped or entangled in
                      machinery, pipework, or structural elements; may
                      include hydraulic cutters, reciprocating saw, or bolt
                      croppers
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Lighting</strong>{" "}
                      &mdash; intrinsically safe torches and area lighting;
                      many confined spaces are completely dark, and rescue
                      cannot be conducted in darkness
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Atmospheric monitoring for the rescue team
                      </strong>{" "}
                      &mdash; the rescue team must carry their own gas
                      detectors, independent of the entrant&rsquo;s
                      monitoring equipment, to confirm that conditions inside
                      the space have not deteriorated further
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Styled-Div Diagram: Rescue Equipment Checklist */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <span className="text-cyan-500/80 text-sm font-normal">
              &mdash;
            </span>
            Rescue Equipment Checklist
          </h2>
          <div className="bg-white/5 border border-cyan-500/30 rounded-xl p-4 sm:p-6 overflow-x-auto">
            <div className="min-w-[300px] max-w-2xl mx-auto">
              <div className="text-centre mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/15 border border-red-500/30">
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    ALL items must be at the entry point BEFORE work begins
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                {/* Retrieval Equipment */}
                <div className="border border-cyan-500/30 rounded-lg bg-cyan-500/5 p-3">
                  <p className="text-xs font-medium text-cyan-400 mb-2 uppercase tracking-wider">
                    Retrieval Equipment
                  </p>
                  <div className="space-y-1.5">
                    {[
                      "Tripod or davit arm",
                      "Man-riding rescue winch",
                      "Rescue harnesses (spare)",
                      "Lifeline / rescue rope",
                      "Karabiners and shackles",
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <ShieldCheck className="h-3.5 w-3.5 text-cyan-400/70 flex-shrink-0" />
                        <span className="text-xs text-white/80">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Breathing Apparatus */}
                <div className="border border-cyan-500/30 rounded-lg bg-cyan-500/5 p-3">
                  <p className="text-xs font-medium text-cyan-400 mb-2 uppercase tracking-wider">
                    Breathing Apparatus
                  </p>
                  <div className="space-y-1.5">
                    {[
                      "SCBA sets for rescue team",
                      "Spare cylinders",
                      "Escape sets for entrants",
                      "Airline BA (extended ops)",
                      "BA board / tally system",
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <ShieldCheck className="h-3.5 w-3.5 text-cyan-400/70 flex-shrink-0" />
                        <span className="text-xs text-white/80">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Casualty Care */}
                <div className="border border-cyan-500/30 rounded-lg bg-cyan-500/5 p-3">
                  <p className="text-xs font-medium text-cyan-400 mb-2 uppercase tracking-wider">
                    Casualty Care
                  </p>
                  <div className="space-y-1.5">
                    {[
                      "Confined space stretcher",
                      "Resuscitation equipment",
                      "Oxygen therapy kit",
                      "Spinal immobilisation",
                      "Burns kit (if foreseeable)",
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <ShieldCheck className="h-3.5 w-3.5 text-cyan-400/70 flex-shrink-0" />
                        <span className="text-xs text-white/80">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Support Equipment */}
                <div className="border border-cyan-500/30 rounded-lg bg-cyan-500/5 p-3">
                  <p className="text-xs font-medium text-cyan-400 mb-2 uppercase tracking-wider">
                    Support Equipment
                  </p>
                  <div className="space-y-1.5">
                    {[
                      "Backup communication system",
                      "Gas detectors (rescue team)",
                      "Intrinsically safe lighting",
                      "Cutting / extrication tools",
                      "Standard first aid kit",
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <ShieldCheck className="h-3.5 w-3.5 text-cyan-400/70 flex-shrink-0" />
                        <span className="text-xs text-white/80">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3 text-centre">
                <p className="text-xs sm:text-sm text-white/80">
                  <strong className="text-cyan-400">Pre-Entry Check:</strong>{" "}
                  The standby person must confirm every item is present,
                  functional, and ready for immediate use before authorising
                  entry
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08: Equipment Inspection and Maintenance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-500/80 text-sm font-normal">08</span>
            Equipment Inspection &amp; Maintenance
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Rescue equipment that fails during an actual emergency is
                worse than having no equipment at all &mdash; it gives a
                false sense of security and wastes precious time. A rigorous{" "}
                <strong>inspection and maintenance regime</strong> is
                essential to ensure that every piece of rescue equipment will
                perform as expected when lives depend on it.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">
                  Pre-Use Checks
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Visual inspection before every deployment
                      </strong>{" "}
                      &mdash; check all rescue equipment for visible damage,
                      wear, corrosion, fraying, or contamination before it
                      is set up at the entry point
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Functional check
                      </strong>{" "}
                      &mdash; test the winch raise, lower, and fall arrest
                      functions; test communication equipment; confirm BA
                      cylinder pressures are adequate
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Defective equipment must not be used
                      </strong>{" "}
                      &mdash; any item that fails the pre-use check must be
                      immediately withdrawn from service, tagged as defective,
                      and reported. Work must not commence until a suitable
                      replacement is available
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">
                  Periodic Servicing
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Manufacturer&rsquo;s service intervals
                      </strong>{" "}
                      &mdash; all rescue equipment must be serviced in
                      accordance with the manufacturer&rsquo;s
                      recommendations, typically annually or after a
                      specified number of deployments
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        After-use servicing
                      </strong>{" "}
                      &mdash; any equipment that has been used in an actual
                      rescue must be thoroughly inspected and serviced before
                      being returned to service; this includes checking for
                      damage sustained during the rescue operation
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">
                  LOLER Thorough Examinations
                </p>
                <div className="space-y-3 text-sm text-white/80">
                  <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3">
                    <div className="flex items-start gap-3">
                      <span className="text-cyan-400 font-bold text-sm mt-0.5 flex-shrink-0">
                        6m
                      </span>
                      <div>
                        <p className="text-sm font-medium text-white">
                          Equipment Used for Persons
                        </p>
                        <p className="text-xs text-white/60 mt-0.5">
                          Rescue winches, tripods, davit arms, and all
                          lifting accessories (karabiners, shackles,
                          connectors) used for raising or lowering persons
                          must be thoroughly examined by a competent person
                          at least every <strong className="text-cyan-400">6 months</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3">
                    <div className="flex items-start gap-3">
                      <span className="text-cyan-400 font-bold text-sm mt-0.5 flex-shrink-0">
                        12m
                      </span>
                      <div>
                        <p className="text-sm font-medium text-white">
                          Other Lifting Equipment
                        </p>
                        <p className="text-xs text-white/60 mt-0.5">
                          Lifting equipment not used for raising or lowering
                          persons must be thoroughly examined at least every{" "}
                          <strong className="text-cyan-400">12 months</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">
                  Record Keeping
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        LOLER examination reports
                      </strong>{" "}
                      &mdash; must be retained and available for inspection;
                      any defects identified must be reported to the
                      equipment owner and, for serious defects, to the HSE
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Service records
                      </strong>{" "}
                      &mdash; a log of all servicing, maintenance, and
                      repairs carried out on each item of rescue equipment
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Pre-use check records
                      </strong>{" "}
                      &mdash; documented evidence that pre-use checks were
                      carried out before each deployment; typically recorded
                      on the confined space entry permit
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Unique identification
                      </strong>{" "}
                      &mdash; every item of lifting equipment must be
                      individually identified (serial number, asset tag) so
                      that examination and service records can be traced to
                      the specific item
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Out-of-Date Examinations
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  <strong className="text-white">
                    Equipment with an overdue LOLER thorough examination must
                    not be used.
                  </strong>{" "}
                  Using lifting equipment for persons without a current
                  thorough examination report is a breach of LOLER and
                  could result in prosecution. The entry permit should
                  require confirmation that all lifting equipment has a
                  current, valid examination report before work is
                  authorised.
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
            <Link to="../confined-spaces-module-5-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Emergency Planning
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-cyan-500 text-white hover:bg-cyan-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../confined-spaces-module-5-section-3">
              Next: Casualty Retrieval
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
