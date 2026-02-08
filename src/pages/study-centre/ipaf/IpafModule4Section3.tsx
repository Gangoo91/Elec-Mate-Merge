import { ArrowLeft, Wrench, CheckCircle, AlertTriangle, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quizQuestions = [
  {
    id: 1,
    question: "At what deviation should a bent frame member be rejected?",
    options: [
      "Any visible bend, regardless of measurement",
      "Greater than 5 mm deviation from straight over any 1-metre length",
      "Greater than 10 mm deviation",
      "Only if it prevents the frame from connecting to other components",
    ],
    correctAnswer: 1,
    explanation:
      "A frame member with greater than 5 mm deviation from straight over any 1-metre length should be rejected. This level of deformation indicates significant weakening of the structural member.",
  },
  {
    id: 2,
    question: "What should you do if you discover a cracked weld on a tower frame?",
    options: [
      "Monitor the crack and reinspect in 24 hours",
      "Tape over the crack and continue using the tower",
      "Always reject the component — cracked welds are never acceptable",
      "Only reject it if the crack is longer than 10 mm",
    ],
    correctAnswer: 2,
    explanation:
      "Cracked welds must always be rejected without exception. A cracked weld indicates structural failure and the crack will propagate under load. The component must be removed from service and returned to the manufacturer for assessment.",
  },
  {
    id: 3,
    question: "Why should you never improvise a replacement for a missing locking clip?",
    options: [
      "It looks unprofessional",
      "Improvised clips may not provide the designed holding force and can fail under load",
      "It voids the tower's insurance",
      "Only PASMA instructors are allowed to replace clips",
    ],
    correctAnswer: 1,
    explanation:
      "Locking clips are engineered components designed to withstand specific loads and forces. Cable ties, wire, tape, or other improvised substitutes cannot provide the same holding force and are likely to fail under dynamic loading or wind.",
  },
  {
    id: 4,
    question: "What cleaning agent should NOT be used on aluminium tower components?",
    options: [
      "Warm soapy water",
      "Caustic or alkaline cleaning products",
      "A soft brush and clean water",
      "A damp cloth",
    ],
    correctAnswer: 1,
    explanation:
      "Caustic or alkaline cleaning products attack aluminium and can cause corrosion, pitting, and weakening of the metal. Only mild, pH-neutral cleaning agents should be used on aluminium components.",
  },
  {
    id: 5,
    question: "What is the correct way to store tower components when not in use?",
    options: [
      "Stack them outside against a fence",
      "Store in a dry, covered area off the ground on racking or dunnage",
      "Leave them inside the van overnight",
      "Any sheltered area is acceptable",
    ],
    correctAnswer: 1,
    explanation:
      "Tower components should be stored in a dry, covered area, off the ground on racking or dunnage. This protects them from moisture, ground contact corrosion, vehicle damage, and accidental bending.",
  },
  {
    id: 6,
    question: "When transporting tower components, what is the most important consideration?",
    options: [
      "Minimising the number of trips",
      "Keeping the components together by manufacturer",
      "Securing components against movement and protecting from impact damage",
      "Loading the heaviest items first",
    ],
    correctAnswer: 2,
    explanation:
      "During transport, components must be secured against movement to prevent them shifting, bouncing, or impacting against each other. Use padding, straps, and appropriate vehicle racking. Components damaged in transit may have hidden defects.",
  },
  {
    id: 7,
    question: "Who should make the decision to condemn and replace a tower component?",
    options: [
      "Any tower user can condemn a component",
      "Only the site manager",
      "A competent person following the manufacturer's guidance",
      "Only the manufacturer's representative",
    ],
    correctAnswer: 2,
    explanation:
      "The decision to condemn and replace components should be made by a competent person with reference to the manufacturer's guidance on acceptable tolerances and rejection criteria. Manufacturers provide specific guidance on when components must be removed from service.",
  },
  {
    id: 8,
    question: "What is the consequence of carrying out unauthorised repairs to tower components?",
    options: [
      "No consequence if the repair is well done",
      "A small fine from the HSE",
      "It may void the manufacturer's warranty and compromise structural integrity",
      "The component must be re-tested by a third party",
    ],
    correctAnswer: 2,
    explanation:
      "Unauthorised repairs — such as welding, drilling, or bending components back into shape — can compromise the structural integrity of the component and void the manufacturer's warranty. Only the manufacturer or their authorised agent should carry out repairs.",
  },
];

const quickCheckQuestions = [
  {
    id: "bent-frame-action",
    question:
      "You are carrying out a pre-use check and discover a horizontal brace with a noticeable bow in the middle. It still clips into the frame at both ends. What should you do?",
    options: [
      "Use the tower — the brace is still connected at both ends",
      "Straighten the brace by hand and then use the tower",
      "Remove the brace, tag it as defective, replace with a good brace, and report the defect",
      "Add an extra brace alongside the bent one for additional support",
    ],
    correctIndex: 2,
    explanation:
      "A bent brace must be removed from service, tagged as defective, and replaced with a serviceable component. Attempting to straighten it can introduce further weakness. Adding an extra brace does not compensate for a defective one — the defective component must be removed.",
  },
  {
    id: "castor-wear",
    question:
      "During inspection you notice that a castor wheel has a flat spot and the brake mechanism feels spongy when applied. What is the correct action?",
    options: [
      "Apply the brake more firmly and continue using the tower",
      "Replace the castor with one from a different manufacturer's tower system",
      "Replace the castor with the correct manufacturer-approved replacement and retest",
      "Wedge a piece of wood under the wheel to prevent rolling",
    ],
    correctIndex: 2,
    explanation:
      "A castor with a flat spot or faulty brake must be replaced with the correct manufacturer-approved replacement. Components are not interchangeable between different tower systems. Improvised solutions like wedging are unsafe.",
  },
  {
    id: "tagging-defective",
    question:
      "What is the purpose of tagging a defective tower component?",
    options: [
      "To identify the manufacturer for warranty claims",
      "To prevent the component from being accidentally returned to service before it is repaired or replaced",
      "To calculate the cost of replacement parts",
      "To comply with COSHH Regulations",
    ],
    correctIndex: 1,
    explanation:
      "Tagging defective components prevents them from being accidentally put back into use. A clear 'DEFECTIVE — DO NOT USE' tag ensures that anyone handling the component knows it is not serviceable. Tagged items should be segregated from usable stock.",
  },
];

const faqs = [
  {
    question: "Can I straighten a bent aluminium frame on site?",
    answer:
      "No. Attempting to straighten a bent aluminium frame introduces additional stresses and can create microscopic cracks that are invisible to the naked eye but will propagate under load. Bent frames must be returned to the manufacturer for assessment. The manufacturer will determine whether the component can be repaired or must be scrapped.",
  },
  {
    question: "How do I tell the difference between surface corrosion and structural corrosion on aluminium?",
    answer:
      "Surface corrosion appears as a white powdery deposit (aluminium oxide) and can usually be wiped or brushed off. It does not significantly weaken the metal. Structural corrosion — pitting, deep pockmarks, or thinning of the metal — weakens the component and is cause for rejection. If in doubt, measure the remaining wall thickness or consult the manufacturer.",
  },
  {
    question: "What should I do if I find components from different tower systems mixed together?",
    answer:
      "Components from different tower systems or manufacturers must never be mixed. They are not interchangeable even if they appear similar. Different systems have different load ratings, connection mechanisms, and tolerances. Separate the components, return each to its correct system, and report the situation to your supervisor.",
  },
  {
    question: "Can I use WD-40 or oil on tower components?",
    answer:
      "Oil-based lubricants should generally be avoided on structural components because they attract dirt, make surfaces slippery, and can mask defects during inspection. Some manufacturers recommend specific lubricants for castor mechanisms or adjustable leg threads — always follow the manufacturer's guidance. For general cleaning, warm soapy water and a soft brush are sufficient.",
  },
];

export default function IpafModule4Section3() {
  useSEO({
    title: "Common Defects & Component Care | Module 4 Section 3 | IPAF Mobile Scaffold",
    description:
      "Identifying and managing common tower defects — bent frames, cracked welds, worn castors, cleaning procedures, storage, transport, and when to condemn equipment.",
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../ipaf-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Centred Header */}
        <header className="text-center mb-12">
          <Wrench className="h-10 w-10 text-elec-yellow mx-auto mb-4" />
          <span className="inline-block bg-elec-yellow text-black px-3 py-1 rounded-full text-sm font-semibold mb-4">
            Module 4.3
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Common Defects & Component Care
          </h1>
          <p className="text-white/70 text-sm sm:text-base max-w-xl mx-auto">
            How to identify, manage, and prevent common defects in mobile access tower components — and when to condemn equipment
          </p>
        </header>

        {/* Section 01: Quick Summary Boxes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            At a Glance
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-elec-yellow/10 border-l-2 border-l-elec-yellow/50 border border-elec-yellow/30 rounded-lg p-3 sm:p-4">
              <p className="text-elec-yellow text-base font-medium mb-2">In 30 Seconds</p>
              <ul className="text-base text-white space-y-1.5">
                <li><strong>Reject at:</strong> &gt;5 mm frame deviation per metre</li>
                <li><strong>Always reject:</strong> Cracked welds, no exceptions</li>
                <li><strong>Never improvise:</strong> Locking clips or structural parts</li>
                <li><strong>Clean with:</strong> Warm soapy water only</li>
              </ul>
            </div>
            <div className="bg-elec-yellow/10 border-l-2 border-l-elec-yellow/50 border border-elec-yellow/30 rounded-lg p-3 sm:p-4">
              <p className="text-elec-yellow/90 text-base font-medium mb-2">On Site</p>
              <ul className="text-base text-white space-y-1.5">
                <li><strong>Tag:</strong> All defective components immediately</li>
                <li><strong>Segregate:</strong> Store defective items separately</li>
                <li><strong>Report:</strong> To supervisor and tower owner</li>
                <li><strong>Replace:</strong> Like-for-like from same system only</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 02: Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Learning Outcomes
          </h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify the most common structural defects in tower components",
              "Apply rejection criteria for bent frames and cracked welds",
              "Explain correct procedures for worn or damaged castors",
              "Describe safe cleaning, storage, and transport methods",
              "Know when and how to condemn and replace components",
              "Understand the consequences of unauthorised repairs",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 03: Bent Frames */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Bent Frames
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Bent frames are one of the most common defects found on mobile access towers. They are typically caused by <strong>impact damage during transport, rough handling during assembly or dismantling, or vehicle collisions</strong> on site.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-3">Rejection Criteria</p>
                <ul className="text-sm text-white space-y-2 ml-4">
                  <li><strong>Visual check</strong> — Sight along the length of every vertical standard and horizontal brace. Any visible bowing, kinking, or deformation should be investigated further.</li>
                  <li><strong>Measurement</strong> — If a deviation is suspected, measure using a straight edge and feeler gauge or ruler. A frame member with <strong className="text-elec-yellow">greater than 5 mm deviation from straight over any 1-metre length</strong> must be rejected.</li>
                  <li><strong>Connection test</strong> — Attempt to connect the suspected frame to adjacent components. Difficulty in making connections, or connections that feel forced or misaligned, indicate deformation.</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-red-400 font-semibold text-sm mb-1">Critical Rule</p>
                    <p className="text-sm text-white">
                      <strong>Never attempt to straighten a bent frame.</strong> Aluminium is a work-hardening material — bending it back introduces additional stresses and can create invisible fatigue cracks that will fail under load without warning. Bent frames must be removed from service and returned to the manufacturer.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                Even a small bend can significantly reduce the load-carrying capacity of a frame member. A 5 mm deviation in a vertical standard can reduce its buckling resistance by <strong>up to 30%</strong>, depending on the cross-section and loading conditions.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-3">Common Causes of Bent Frames</p>
                <ul className="text-sm text-white space-y-2 ml-4">
                  <li><strong>Transport damage</strong> — Frames stacked loosely in a vehicle can slide and bend during transit, particularly on rough roads.</li>
                  <li><strong>Dropping during handling</strong> — Dropping a frame from height onto a hard surface can cause localised bending that may not be immediately obvious.</li>
                  <li><strong>Forklift impact</strong> — Towers stored in warehouse or yard areas are frequently struck by forklift trucks or other plant.</li>
                  <li><strong>Overloading</strong> — Exceeding the safe working load of the tower can cause permanent deformation of frames under compression.</li>
                  <li><strong>Vehicle collision on site</strong> — Vehicles reversing into or brushing against an erected tower.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Cracked Welds */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Cracked Welds
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Weld cracks are the second most critical defect category. They indicate that the joint between two structural members is failing and the crack <strong>will propagate</strong> under cyclic loading.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-purple-400 mb-3">How to Identify Weld Cracks</p>
                <ul className="text-sm text-white space-y-2 ml-4">
                  <li><strong>Visual inspection</strong> — Look closely at every weld on the component, paying particular attention to the junction between the weld bead and the parent metal (the "toe" of the weld). Cracks often start here.</li>
                  <li><strong>Discolouration</strong> — Dark lines, oxide trails, or discolouration radiating from a weld may indicate a subsurface crack that has not yet fully opened.</li>
                  <li><strong>Paint masking</strong> — On painted or powder-coated components, cracks may be hidden beneath the coating. Look for hairline cracks in the paint that follow the weld line.</li>
                  <li><strong>Rung-to-frame joints</strong> — These are high-stress locations. Check every rung weld on both sides of the frame.</li>
                  <li><strong>Spigot joints</strong> — Where spigots are welded to frame tubes, check for cracking around the circumference of the joint.</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-red-400 font-semibold text-sm mb-1">Absolute Rule</p>
                    <p className="text-sm text-white">
                      <strong>Any cracked weld means the component must be immediately rejected.</strong> There is no acceptable tolerance for weld cracks — even a hairline crack will grow under load. The component must be removed from service, tagged as defective, and returned to the manufacturer for assessment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 05: Missing Locking Clips and Pins */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Missing Locking Clips and Pins
          </h2>
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Locking clips, R-clips, spring pins, and gravity locks are small components with a <strong>critical safety function</strong>. They prevent braces from disconnecting, frames from separating, and castors from detaching. A single missing clip can cause a catastrophic failure.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-teal-400 mb-3">Types of Locking Devices</p>
                <ul className="text-sm text-white space-y-2 ml-4">
                  <li><strong>Brace clips</strong> — Spring-loaded clips that secure horizontal and diagonal braces to frame rungs. Must be fully closed with the clip arm engaged over the rung.</li>
                  <li><strong>Spigot pins / R-clips</strong> — Pins that lock frame-to-frame connections at spigot joints. Prevent frames from lifting off during use or wind loading.</li>
                  <li><strong>Gravity locks</strong> — Automatic locks on some tower systems that engage by gravity when frames are connected. Confirm they have dropped into the locked position.</li>
                  <li><strong>Castor locking pins</strong> — Pins that secure the castor stem in the base of the frame leg. Without this pin, the castor can pull out under load.</li>
                  <li><strong>Platform hooks</strong> — Clips or hooks that secure the working platform to its support. Must be fully engaged on all sides.</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-red-400 font-semibold text-sm mb-1">Never Improvise</p>
                    <p className="text-sm text-white">
                      <strong>Never use cable ties, wire, tape, bolts, or any improvised substitute</strong> in place of a missing locking clip or pin. These improvised solutions cannot provide the designed holding force and will fail under dynamic loading, wind, or vibration. Always replace missing clips with the correct manufacturer-approved component.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-teal-400 mb-3">Spare Parts</p>
                <p className="text-sm text-white mb-2">
                  Always keep a supply of spare clips and pins on site. Small components are easily lost during assembly and dismantling. Running out of clips should never be the reason a tower is assembled without all connections being properly secured.
                </p>
                <p className="text-sm text-white">
                  Order spare parts directly from the tower manufacturer or their authorised distributor. Using third-party "compatible" clips from unknown sources is risky — they may look similar but have different material properties, spring tension, or dimensions that prevent reliable engagement.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-teal-400 mb-3">Checking Clips During Pre-Use</p>
                <ul className="text-sm text-white space-y-2 ml-4">
                  <li><strong>Spring tension</strong> — Each clip should snap firmly into position. A clip that slides loosely or does not spring back has a worn or broken spring mechanism.</li>
                  <li><strong>Deformation</strong> — Check that the clip arm is straight and the hook end is not bent open. A deformed clip can disengage under vibration or wind loading.</li>
                  <li><strong>Corrosion</strong> — Steel clips on aluminium towers can corrode if the galvanising is worn. Corroded clips lose strength and should be replaced.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Worn Castors */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Worn Castors
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Castors are subject to more wear than any other tower component because they are in constant contact with the ground and bear the full weight of the tower. Both the <strong>wheel</strong> and the <strong>brake mechanism</strong> must be regularly assessed.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-red-400 mb-3">Wheel Defects</p>
                <ul className="text-sm text-white space-y-2 ml-4">
                  <li><strong>Flat spots</strong> — Caused by prolonged stationary loading with brakes applied. Flat spots cause the tower to rock and make movement difficult.</li>
                  <li><strong>Cracks in rubber/nylon</strong> — Material fatigue, UV exposure, or chemical contact can cause the wheel material to crack and deteriorate.</li>
                  <li><strong>Chunks missing</strong> — Impact damage or running over debris can tear chunks from the wheel surface, causing instability.</li>
                  <li><strong>Bearing failure</strong> — A wheel that wobbles, grinds, or does not spin freely has a failing bearing. Replace the complete castor.</li>
                  <li><strong>Swivel seizure</strong> — If the castor does not swivel freely, the internal bearing or race is damaged. A seized swivel can prevent proper brake application.</li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-red-400 mb-3">Brake Mechanism Defects</p>
                <ul className="text-sm text-white space-y-2 ml-4">
                  <li><strong>Spongy feel</strong> — The brake lever should have a positive, firm engagement. A spongy or gradual feel indicates internal wear or spring failure.</li>
                  <li><strong>Creep under load</strong> — If the tower moves slightly even with all brakes applied, one or more brake mechanisms are worn and not providing sufficient friction.</li>
                  <li><strong>Lever damage</strong> — Bent, broken, or missing brake levers prevent proper brake operation. Do not use pliers or tools to operate a damaged lever.</li>
                  <li><strong>Pad wear</strong> — The brake pad that contacts the wheel wears over time. If the pad is worn to the point where the lever reaches its travel limit without full engagement, the castor must be replaced.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 07: Damaged Platforms */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Damaged Platforms
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The working platform is where personnel stand and work. Defects here have a direct and immediate impact on safety.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">Platform Surface Defects</p>
                <ul className="text-sm text-white space-y-2 ml-4">
                  <li><strong>Splits and cracks</strong> — Plywood platforms can split along the grain, creating trip hazards and weak spots. Aluminium decks can develop fatigue cracks around fixing points.</li>
                  <li><strong>Delamination</strong> — Multi-layer plywood platforms can delaminate when exposed to moisture, drastically reducing strength. Check edges for signs of layer separation.</li>
                  <li><strong>Surface wear</strong> — Anti-slip coatings can wear away over time, making the platform slippery when wet. Check that the slip-resistant surface is still effective.</li>
                  <li><strong>Contamination</strong> — Oil, paint, plaster, or other substances on the platform surface create slip hazards. Clean or replace contaminated platforms.</li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">Trapdoor Defects</p>
                <ul className="text-sm text-white space-y-2 ml-4">
                  <li><strong>Missing or broken springs</strong> — The trapdoor return spring automatically closes the hatch after climbing through. A missing or broken spring leaves an open hole in the platform — a serious fall hazard.</li>
                  <li><strong>Stiff or jamming hinges</strong> — The trapdoor must open and close freely. Stiff hinges can prevent proper operation, leading users to prop the trapdoor open.</li>
                  <li><strong>Damaged latches</strong> — Some platforms have latches to hold the trapdoor in the closed or open position. Damaged latches can cause the trapdoor to move unexpectedly.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08: Guardrail and Toeboard Defects */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">08</span>
            Guardrail and Toeboard Defects
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Guardrails and toeboards prevent falls from the working platform. Defects in these components directly increase the risk of a person falling from height.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-3">Common Guardrail Defects</p>
                <ul className="text-sm text-white space-y-2 ml-4">
                  <li><strong>Bent guardrail tubes</strong> — Guardrails that have been bent by impact or overloading no longer provide the correct protection height. A bent top rail may be below the required 950 mm minimum, creating a fall hazard.</li>
                  <li><strong>Worn or damaged clip sockets</strong> — The sockets on frames that receive guardrail clips wear over time. Worn sockets allow guardrails to become loose or disengage under load.</li>
                  <li><strong>Missing mid-rails</strong> — The mid-rail fills the gap between the top rail and the toeboard. Without it, gaps may exceed the maximum 470 mm, allowing a person to fall through.</li>
                  <li><strong>Cracked plastic end-caps</strong> — Some guardrails have plastic end-caps that form part of the clip mechanism. If these crack, the clip may not hold securely.</li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-3">Toeboard Defects</p>
                <ul className="text-sm text-white space-y-2 ml-4">
                  <li><strong>Split or cracked toeboards</strong> — Timber or composite toeboards can split if struck by heavy objects. Split toeboards do not prevent objects rolling off the platform.</li>
                  <li><strong>Bent metal toeboards</strong> — Aluminium toeboards can bend if stood on or struck. A bent toeboard may not sit correctly in its retaining clips.</li>
                  <li><strong>Missing toeboards</strong> — Toeboards are frequently removed to pass materials onto the platform and not replaced. Check all four sides.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 09: Cleaning Procedures */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">09</span>
            Cleaning Procedures
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Regular cleaning extends the life of tower components and makes defect identification easier. However, incorrect cleaning methods can damage aluminium and other materials.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-3">Approved Cleaning Methods</p>
                <ul className="text-sm text-white space-y-2 ml-4">
                  <li><strong>Warm soapy water</strong> — Use a mild, pH-neutral detergent with warm water and a soft brush or cloth. This is safe for all tower components.</li>
                  <li><strong>Rinse thoroughly</strong> — After washing, rinse with clean water to remove all detergent residue. Residue can attract dirt and may cause surface discolouration.</li>
                  <li><strong>Dry before storage</strong> — Allow components to dry completely before storing. Storing wet components promotes corrosion, especially in enclosed containers.</li>
                  <li><strong>Remove concrete and plaster</strong> — Use a wooden or plastic scraper to remove concrete splashes and plaster. Metal scrapers can scratch and damage the aluminium surface.</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-red-400 font-semibold text-sm mb-1">Avoid</p>
                    <p className="text-sm text-white">
                      <strong>Never use caustic, alkaline, or acidic cleaning products</strong> on aluminium tower components. These attack the metal, causing pitting, corrosion, and weakening. Brick acid, cement remover, oven cleaner, and similar products are all unsuitable. Steel wool and wire brushes will scratch the surface and accelerate corrosion.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 10: Storage and Transport */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">10</span>
            Storage and Transport
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Many tower defects originate not from use but from <strong>poor storage and rough transport</strong>. Proper handling off site is just as important as careful use on site.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-purple-400 mb-3">Storage Requirements</p>
                <ul className="text-sm text-white space-y-2 ml-4">
                  <li><strong>Dry, covered area</strong> — Store components under cover to protect from rain, frost, and UV degradation. Direct sunlight can degrade rubber and nylon components.</li>
                  <li><strong>Off the ground</strong> — Use racking or dunnage to keep components off the floor. Ground contact promotes corrosion from moisture and can cause bending if components are stacked unevenly.</li>
                  <li><strong>Protected from vehicles</strong> — Store towers away from vehicle routes and material handling areas. Forklift impact is a common cause of bent frames in storage.</li>
                  <li><strong>Organised by system</strong> — Keep components from different tower systems clearly separated. Label storage areas to prevent mixing.</li>
                  <li><strong>Defective items segregated</strong> — Defective components awaiting return or disposal must be stored separately from serviceable stock, clearly tagged "DO NOT USE".</li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-purple-400 mb-3">Transport Requirements</p>
                <ul className="text-sm text-white space-y-2 ml-4">
                  <li><strong>Secure against movement</strong> — Use ratchet straps, bungee cords, or purpose-built vehicle racking to prevent components from sliding, bouncing, or falling during transit.</li>
                  <li><strong>Protect from impact</strong> — Use padding, rubber matting, or cardboard between components to prevent metal-on-metal contact. Components striking each other can cause dents, bends, and scratches.</li>
                  <li><strong>Load carefully</strong> — Do not throw or drop components into vehicles. Lift and place each item. A dropped frame may look undamaged but can have hidden deformation.</li>
                  <li><strong>Secure small items</strong> — Clips, pins, and castors should be bagged or boxed to prevent loss during transport. Arriving on site with missing clips means the tower cannot be assembled safely.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 11: Condemning and Replacing Components */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">11</span>
            Condemning and Replacing Components
          </h2>
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                When a component is found to be defective, a decision must be made about whether it can be repaired or must be condemned (permanently removed from service).
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-teal-400 mb-3">When to Condemn</p>
                <ul className="text-sm text-white space-y-2 ml-4">
                  <li><strong>Cracked welds</strong> — Always condemn. No field repair is acceptable.</li>
                  <li><strong>Bent frames beyond tolerance</strong> — Frames with &gt;5 mm deviation must be returned to the manufacturer. If the manufacturer confirms they cannot be repaired, they are condemned.</li>
                  <li><strong>Corrosion pitting</strong> — If pitting corrosion has reduced the wall thickness to below the manufacturer's minimum, the component must be condemned.</li>
                  <li><strong>Repeated failure</strong> — Components that have been repaired and fail again at the same location should be condemned.</li>
                  <li><strong>Unknown history</strong> — Components of unknown origin, age, or maintenance history should be treated with caution. If their serviceability cannot be confirmed, they should be condemned.</li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-teal-400 mb-3">Unauthorised Repairs — The Consequences</p>
                <p className="text-sm text-white mb-2">
                  Unauthorised repairs include welding, drilling, bolting, bending back into shape, or any modification not approved by the manufacturer. The consequences of unauthorised repairs include:
                </p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li><strong>Voided warranty</strong> — The manufacturer's product warranty is immediately voided.</li>
                  <li><strong>Compromised integrity</strong> — Welding aluminium requires specialist equipment and certification. Poor welds create weak points. Drilling holes introduces stress concentrations.</li>
                  <li><strong>Legal liability</strong> — If the tower fails and someone is injured, the person who carried out the unauthorised repair may face personal criminal liability.</li>
                  <li><strong>Insurance implications</strong> — Employer's liability and public liability insurance may not cover incidents involving unauthorised modifications.</li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-teal-400 mb-3">Replacement Procedure</p>
                <ul className="text-sm text-white space-y-2 ml-4">
                  <li><strong>Like-for-like only</strong> — Replace with the identical part from the same manufacturer and tower system. Cross-system substitution is never acceptable.</li>
                  <li><strong>Verify the replacement</strong> — Check that the new component is undamaged, is the correct part number, and fits correctly before putting the tower back into service.</li>
                  <li><strong>Update records</strong> — Record the replacement in the tower's maintenance log, noting the date, component replaced, reason for replacement, and new part details.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 12: Tagging Defective Equipment */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">12</span>
            Tagging Defective Equipment
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A clear and consistent tagging system prevents defective components from being <strong>accidentally returned to service</strong>. Without tagging, a defective frame stored alongside serviceable stock could be picked up and used by someone unaware of the defect.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">Tagging Procedure</p>
                <ul className="text-sm text-white space-y-2 ml-4">
                  <li><strong>Immediate identification</strong> — As soon as a defect is discovered, attach a clearly visible tag stating "DEFECTIVE — DO NOT USE" with the date, the defect description, and the name of the person who identified it.</li>
                  <li><strong>Physical separation</strong> — Move the defective component to a designated "quarantine" area away from serviceable stock. If this is not possible, secure the tag so it cannot be accidentally removed.</li>
                  <li><strong>Colour coding</strong> — Many sites use a red tag system for defective equipment. Red tags are universally understood to mean "stop" and "do not use".</li>
                  <li><strong>Tower-level tagging</strong> — If the entire tower is taken out of service due to a defect, place a prominent "DO NOT USE" sign at ground level on all four sides and remove the access route (bottom rung or ladder) if possible.</li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">Post-Repair Clearance</p>
                <p className="text-sm text-white">
                  After a defective component has been repaired or replaced, it should be formally reinspected by a competent person before the tag is removed and the component is returned to service. The reinspection should be recorded, and the repair details should be noted in the tower's logbook or maintenance file.
                </p>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <BookOpen className="h-5 w-5 text-elec-yellow" />
            Practical Guidance
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Component Life Expectancy</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Aluminium frames and braces have no fixed lifespan if properly maintained and stored</li>
                <li>Castors typically last 2-5 years depending on use and terrain</li>
                <li>Plywood platforms may need replacing every 2-3 years in heavy use</li>
                <li>Rubber and nylon components degrade with UV exposure — inspect more frequently if stored outdoors</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Keeping a Spare Parts Kit</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Carry spare brace clips, R-clips, and castor locking pins on every job</li>
                <li>Keep at least one spare castor matching each tower system you use</li>
                <li>Carry spare toeboards — they are frequently damaged in transport</li>
                <li>Check your spare parts kit regularly and restock after each job</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Defect Reporting Culture</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Encourage all tower users to report defects without fear of blame</li>
                <li>Create a simple defect reporting system — verbal plus written</li>
                <li>Act on reported defects promptly to build confidence in the system</li>
                <li>Review defect reports regularly to identify recurring issues</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/90 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 my-12" />

        {/* Quiz */}
        <section className="mb-10">
          <Quiz title="Test Your Knowledge" questions={quizQuestions} />
        </section>

        {/* Navigation Footer */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../ipaf-module-4-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Formal Inspections
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../ipaf-module-4-section-4">
              Next: Documentation & Records
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </div>
    </div>
  );
}
