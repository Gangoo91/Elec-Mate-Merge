/**
 * Level 3 Module 2 Section 6.2
 * Safe Disposal of Hazardous Components (Batteries, Lamps)
 *
 * Design follows: Level3ContentTemplate.tsx
 * Mobile optimised with touch targets and dark theme
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

// ============================================
// SEO CONFIGURATION
// ============================================
const TITLE = "Safe Disposal of Hazardous Components - Level 3 Module 2 Section 6.2";
const DESCRIPTION = "Understanding safe handling, storage, and disposal procedures for hazardous electrical components including batteries, fluorescent lamps, and other regulated waste.";

// ============================================
// INLINE CHECK QUESTIONS (4 per page)
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "Why are fluorescent tubes classified as hazardous waste?",
    options: [
      "They contain sharp glass",
      "They contain mercury, which is toxic to humans and the environment",
      "They produce harmful UV radiation when broken",
      "They are too large for normal bins"
    ],
    correctIndex: 1,
    explanation: "Fluorescent tubes and compact fluorescent lamps contain mercury vapour, which is highly toxic. When tubes break, mercury is released into the environment where it can accumulate in ecosystems and cause neurological damage in humans."
  },
  {
    id: "check-2",
    question: "How should lithium-ion batteries be stored before disposal?",
    options: [
      "In any convenient container",
      "With terminals exposed for easy identification",
      "With terminals taped or in individual bags to prevent short circuits, away from heat",
      "Submerged in water for safety"
    ],
    correctIndex: 2,
    explanation: "Lithium-ion batteries can catch fire or explode if short-circuited. Store them with terminals taped or individually bagged, away from metal objects, heat sources, and direct sunlight. Never store damaged batteries with undamaged ones."
  },
  {
    id: "check-3",
    question: "What should you do if you encounter PCBs (polychlorinated biphenyls) in old electrical equipment?",
    options: [
      "Dispose of them with general WEEE waste",
      "They are not dangerous and can be handled normally",
      "Stop work, contain the area, and arrange specialist disposal - they are highly toxic",
      "Drain the fluid and dispose of the container separately"
    ],
    correctIndex: 2,
    explanation: "PCBs are extremely hazardous substances found in some older transformers, capacitors, and fluorescent ballasts. They are carcinogenic and persistent in the environment. Specialist licensed contractors must handle PCB disposal - never attempt it yourself."
  },
  {
    id: "check-4",
    question: "What is required when transporting hazardous waste to a disposal facility?",
    options: [
      "Nothing special - just take it in your van",
      "A consignment note and use of a registered hazardous waste carrier",
      "Only verbal agreement with the disposal site",
      "A standard Waste Transfer Note is sufficient"
    ],
    correctIndex: 1,
    explanation: "Hazardous waste requires consignment notes (not standard Waste Transfer Notes) and must be transported by a registered hazardous waste carrier. Records must be kept for 3 years. Failure to comply can result in prosecution."
  }
];

// ============================================
// QUIZ QUESTIONS (10 minimum)
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "Which of the following is classified as hazardous waste in electrical work?",
    options: [
      "Clean copper cable offcuts",
      "Cardboard packaging",
      "Fluorescent tubes containing mercury",
      "Steel trunking offcuts"
    ],
    correctAnswer: 2,
    explanation: "Fluorescent tubes contain mercury, making them hazardous waste requiring special disposal. Copper, cardboard, and steel are non-hazardous and should be recycled through normal waste streams."
  },
  {
    id: 2,
    question: "What is the main fire risk associated with lithium-ion batteries?",
    options: [
      "They contain flammable liquid",
      "They can undergo thermal runaway if damaged, short-circuited, or overheated",
      "They generate sparks during normal use",
      "They are always unstable"
    ],
    correctAnswer: 1,
    explanation: "Thermal runaway occurs when a lithium-ion battery's internal temperature rises uncontrollably, potentially causing fire or explosion. This can be triggered by physical damage, short circuits, overcharging, or exposure to heat."
  },
  {
    id: 3,
    question: "How should a broken fluorescent tube be handled?",
    options: [
      "Sweep up immediately with a dustpan",
      "Ventilate the area, avoid touching with bare hands, use damp paper to collect debris, seal in a container",
      "Leave it for specialist cleaners",
      "Vacuum up the debris for thorough cleaning"
    ],
    correctAnswer: 1,
    explanation: "Broken tubes release mercury vapour. Ventilate immediately, avoid direct contact and vacuuming (which spreads contamination). Use damp paper towels to collect debris, seal in a container, and dispose as hazardous waste."
  },
  {
    id: 4,
    question: "Where can domestic quantities of waste batteries typically be disposed of?",
    options: [
      "General household waste",
      "Battery recycling points at supermarkets, recycling centres, or participating retailers",
      "The garden - they are biodegradable",
      "Burning is the safest method"
    ],
    correctAnswer: 1,
    explanation: "The UK battery regulations require retailers selling batteries to provide collection points. Recycling centres also accept batteries. Placing batteries in general waste risks fire (lithium) and soil/water contamination (heavy metals)."
  },
  {
    id: 5,
    question: "What hazardous substance might be found in older thermostats removed during upgrades?",
    options: [
      "Lead paint",
      "Mercury switches",
      "Asbestos insulation",
      "CFCs"
    ],
    correctAnswer: 1,
    explanation: "Older mechanical thermostats often contain mercury switches - small glass tubes with liquid mercury. These must be handled carefully and disposed of as hazardous waste. Modern thermostats use solid-state switching."
  },
  {
    id: 6,
    question: "What documentation must be completed when disposing of hazardous waste?",
    options: [
      "A standard Waste Transfer Note",
      "A consignment note with unique code, retained for 3 years",
      "Just a receipt from the disposal facility",
      "No documentation is required for small quantities"
    ],
    correctAnswer: 1,
    explanation: "Hazardous waste requires consignment notes with unique codes from the Environment Agency. These must be completed for each transfer and records kept for 3 years. This provides a complete audit trail for the waste."
  },
  {
    id: 7,
    question: "Why might old PVC cable be considered potentially hazardous?",
    options: [
      "PVC is always hazardous",
      "Older PVC may contain lead stabilisers, and burning releases toxic dioxins",
      "PVC conducts electricity",
      "PVC releases chlorine at room temperature"
    ],
    correctAnswer: 1,
    explanation: "Older PVC cables may contain lead-based stabilisers. Burning PVC releases hydrogen chloride and dioxins, which are extremely toxic. PVC cable should be recycled properly - never burnt, even to recover copper."
  },
  {
    id: 8,
    question: "What should happen to lead-acid batteries removed from old emergency lighting systems?",
    options: [
      "Dispose in general waste",
      "Return to a battery recycler - they contain lead and acid, both hazardous",
      "Leave them on site for the customer",
      "Pour out the acid and recycle the plastic casing"
    ],
    correctAnswer: 1,
    explanation: "Lead-acid batteries contain both lead (heavy metal) and sulphuric acid. Both are hazardous. Specialist battery recyclers recover the lead and neutralise the acid safely. Many will collect for free due to lead's value."
  },
  {
    id: 9,
    question: "What is the proper disposal route for capacitors from old fluorescent light fittings?",
    options: [
      "General WEEE recycling",
      "Check age and type - older ones may contain PCBs requiring specialist disposal",
      "They are not hazardous and can go in general waste",
      "Recycle with other metal components"
    ],
    correctAnswer: 1,
    explanation: "Capacitors manufactured before the mid-1980s may contain PCBs. If the capacitor's age or contents are unknown, treat it as potentially containing PCBs and arrange specialist assessment and disposal."
  },
  {
    id: 10,
    question: "What fire safety measure should be considered when storing lithium batteries for disposal?",
    options: [
      "Store near fire extinguishers",
      "Store in a metal container away from combustibles, with batteries individually protected",
      "Store in large quantities to improve efficiency",
      "Store in plastic bags in any location"
    ],
    correctAnswer: 1,
    explanation: "Store lithium batteries in fireproof containers away from combustible materials. Each battery should be individually protected (terminals taped). Large quantities of lithium batteries represent a significant fire risk and should be disposed of promptly."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "Can I take trade waste batteries to a supermarket collection point?",
    answer: "Supermarket collection points are primarily for household batteries. For trade waste batteries, use commercial recycling services or take them to your local authority's trade waste facility. Many electrical wholesalers also accept used batteries for recycling."
  },
  {
    question: "What should I do if a battery is damaged or swelling?",
    answer: "A swelling lithium battery is dangerous - gases are building up internally. Do not attempt to use, charge, or puncture it. Isolate it in a fireproof container (metal bucket with sand is ideal), keep it outdoors if possible, and arrange immediate collection by a specialist hazardous waste carrier."
  },
  {
    question: "Are LED lamps hazardous waste?",
    answer: "LED lamps are not classified as hazardous waste in the same way as fluorescent tubes (no mercury). However, they are WEEE and should be recycled rather than disposed in general waste. The electronic drivers contain components that should be properly processed."
  },
  {
    question: "How do I know if an old capacitor contains PCBs?",
    answer: "PCBs were commonly used in capacitors manufactured before the mid-1980s. If the component is unlabelled or you cannot confirm it's PCB-free, treat it as potentially containing PCBs. Look for labels stating 'non-PCB' or 'no PCBs'. When in doubt, arrange specialist assessment."
  },
  {
    question: "What if I accidentally break a fluorescent tube on site?",
    answer: "Evacuate the immediate area and ventilate well for at least 15 minutes. Avoid vacuuming - this spreads mercury vapour. Use damp paper towels to collect visible debris and glass. Seal everything in a plastic bag, then in a second container. Dispose as hazardous waste. Inform the site manager."
  },
  {
    question: "Can I transport small quantities of hazardous waste myself?",
    answer: "Small quantities can be transported in your own vehicle to an appropriate disposal facility, but you must follow packaging requirements and complete consignment notes. For larger quantities or regular movements, use a registered hazardous waste carrier. Check current exemptions with the Environment Agency."
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module2Section6_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">

      {/* ========================================
          STICKY HEADER
          ======================================== */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module2-section6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* ========================================
          MAIN ARTICLE CONTENT
          ======================================== */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 2.6.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Safe Disposal of Hazardous Components
          </h1>
          <p className="text-white/80">
            Batteries, lamps, and other hazardous materials in electrical work
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Mercury:</strong> Fluorescent tubes are hazardous - never general waste</li>
              <li><strong>Batteries:</strong> Tape terminals, store safely, recycle properly</li>
              <li><strong>PCBs:</strong> Old capacitors may contain - requires specialist disposal</li>
              <li><strong>Documentation:</strong> Consignment notes required, keep 3 years</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Mercury switches in old thermostats</li>
              <li><strong>Use:</strong> Dedicated containers for hazardous items</li>
              <li><strong>Apply:</strong> Check component age before disposal decisions</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identifying hazardous components in electrical work",
              "Safe handling of mercury-containing lamps",
              "Battery storage and disposal requirements",
              "PCB identification and specialist disposal",
              "Documentation for hazardous waste",
              "Emergency procedures for spills and breakages"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Mercury-Containing Lamps
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Fluorescent tubes, compact fluorescent lamps (CFLs), and high-intensity discharge (HID) lamps contain mercury vapour, which is highly toxic to both humans and the environment. Mercury is a neurotoxin that accumulates in ecosystems and can cause serious health problems including neurological damage, kidney damage, and developmental issues.
            </p>

            <p>
              When these lamps are intact, the mercury is contained safely. However, breakage releases mercury vapour into the air and contaminates any surface it contacts. The amount in a single tube is small, but cumulative exposure from multiple breakages over time is a real health risk for electricians who regularly handle these items.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Safe Handling Procedures:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Handle tubes carefully to avoid breakage</li>
                <li>Store upright in protective sleeves or original packaging</li>
                <li>Transport in padded containers - never loose in a van</li>
                <li>Use dedicated lamp recycling collection points or services</li>
                <li>Never dispose in general waste or skips</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> LED replacements avoid mercury entirely. When upgrading lighting, switching to LED eliminates the ongoing hazardous waste issue of fluorescent lamp disposal.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Battery Hazards and Disposal
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Batteries present different hazards depending on their chemistry. Lead-acid batteries contain both toxic lead and corrosive acid. Lithium-ion batteries can undergo thermal runaway, causing fire or explosion. Nickel-cadmium batteries contain toxic cadmium. All battery types require proper disposal to prevent environmental contamination and safety hazards.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Lead-Acid Batteries</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Found in emergency lighting, UPS systems</li>
                  <li>Contain lead (toxic heavy metal)</li>
                  <li>Contain sulphuric acid (corrosive)</li>
                  <li>Return to battery recyclers</li>
                  <li>High recycling value - often collected free</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Lithium-Ion Batteries</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Found in cordless tools, EVs, storage systems</li>
                  <li>Fire and explosion risk if damaged</li>
                  <li>Tape terminals before storage</li>
                  <li>Store away from heat and combustibles</li>
                  <li>Never dispose in general waste</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> Removing an old emergency lighting system, you find swollen NiCd battery packs. The swelling indicates gas build-up from internal failure. Handle carefully, place in a sealed container, and dispose as hazardous waste promptly.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            PCBs and Other Legacy Hazards
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Polychlorinated biphenyls (PCBs) are industrial chemicals that were widely used in electrical equipment before being banned in 1986 due to their toxicity. They were used in transformer oils, capacitor dielectrics, and some fluorescent ballasts. PCBs are carcinogenic, persist in the environment for decades, and accumulate in the food chain.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Where PCBs Might Be Found:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Pre-1987 transformers - especially oil-filled types</li>
                <li>Old capacitors, particularly large power factor correction units</li>
                <li>Some fluorescent ballasts manufactured before mid-1980s</li>
                <li>Old switchgear and circuit breakers</li>
                <li>Cable insulation in very old installations</li>
              </ul>
            </div>

            <p>
              If you suspect PCB-containing equipment, do not disturb it further. Secure the area, inform the site manager, and arrange for specialist assessment. PCB disposal requires licensed contractors and specialised facilities - it is not something that can be handled through normal waste routes.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> When working in older buildings, always consider the age of equipment. If components predate the mid-1980s and their contents are unknown, treat them as potentially hazardous until proven otherwise.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Documentation and Compliance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Hazardous waste has stricter documentation requirements than general waste. The consignment note system creates a complete audit trail from waste producer to final disposal facility. This protects you by proving correct disposal and helps authorities track hazardous materials through the waste system.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Producer</p>
                <p className="text-white/90 text-xs">Complete consignment note with accurate waste description</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Carrier</p>
                <p className="text-white/90 text-xs">Must be registered for hazardous waste transport</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Disposal</p>
                <p className="text-white/90 text-xs">Licensed facility confirms receipt and treatment</p>
              </div>
            </div>

            <p>
              Consignment notes require a unique code from the Environment Agency (or equivalent in Scotland/Wales). Records must be kept for at least 3 years. If authorities query any hazardous waste movement, you must be able to produce documentation proving correct disposal.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Handling</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Wear appropriate PPE - gloves as minimum</li>
                <li>Keep hazardous items separate from other waste</li>
                <li>Use original packaging or dedicated containers</li>
                <li>Label containers clearly with contents</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Storing</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Store in secure, dry, well-ventilated area</li>
                <li>Keep incompatible materials separate</li>
                <li>Minimise storage time - arrange regular collection</li>
                <li>Prevent access by unauthorised persons</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Mixing hazardous with general waste</strong> - Contaminates entire load</li>
                <li><strong>Storing lithium batteries loosely</strong> - Short circuit and fire risk</li>
                <li><strong>Breaking fluorescent tubes for disposal</strong> - Releases mercury</li>
                <li><strong>Incomplete documentation</strong> - Can't prove compliance</li>
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

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Common Hazardous Items</p>
                <ul className="space-y-0.5">
                  <li>Fluorescent tubes (mercury)</li>
                  <li>Batteries (various chemistries)</li>
                  <li>Old capacitors (possible PCBs)</li>
                  <li>Mercury switches in thermostats</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Record Requirements</p>
                <ul className="space-y-0.5">
                  <li>Consignment notes for hazardous waste</li>
                  <li>Keep records 3 years minimum</li>
                  <li>Unique code from Environment Agency</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module2-section6-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Waste Management
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module2-section6-3">
              Next: Life-Cycle Thinking
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module2Section6_2;
