import { ArrowLeft, ArrowRight, Shield, Flame, Hand, MapPin, Droplets, Settings, ClipboardCheck, Layers, CheckCircle, AlertTriangle, Timer, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

/* ------------------------------------------------------------------ */
/*  Inline Knowledge Checks (3)                                       */
/* ------------------------------------------------------------------ */
const quickCheckQuestions = [
  {
    id: "bs-en-standard-fire-blankets",
    question: "What is the British/European Standard that covers fire blankets?",
    options: [
      "BS EN 3",
      "BS EN 1869",
      "BS EN 671-1",
      "BS 5306-1"
    ],
    correctIndex: 1,
    explanation:
      "BS EN 1869 is the standard that specifies the requirements for fire blankets. It defines the materials, construction, sizes, and performance criteria that fire blankets must meet. BS EN 3 covers portable fire extinguishers, BS EN 671-1 covers fixed firefighting systems (hose reels), and BS 5306-1 covers the maintenance of portable fire extinguishers and hose reels. Understanding which standard applies to which piece of equipment is fundamental for anyone responsible for fire safety equipment selection, procurement, and maintenance."
  },
  {
    id: "minimum-blanket-time-over-fire",
    question: "What is the minimum time a fire blanket should be left in place over a fire after deployment?",
    options: [
      "5 minutes",
      "10 minutes",
      "30 minutes",
      "60 minutes"
    ],
    correctIndex: 2,
    explanation:
      "A fire blanket should be left in place for a minimum of 30 minutes after deployment. This extended duration is essential because the material beneath the blanket may still be extremely hot and could reignite if oxygen is reintroduced too early. Even if the flames appear to be extinguished, the fuel source may still be at or above its ignition temperature. Removing the blanket prematurely allows fresh air (oxygen) to reach the hot fuel, which can cause the fire to reflash. The 30-minute cooling period ensures the temperature drops below the ignition point of the fuel involved."
  },
  {
    id: "hose-reel-fire-classes",
    question: "Which class of fire are hose reels suitable for?",
    options: [
      "Class A only (solid combustibles)",
      "Class B only (flammable liquids)",
      "Class A and Class B",
      "All fire classes"
    ],
    correctIndex: 0,
    explanation:
      "Hose reels are suitable for Class A fires only — those involving solid combustible materials such as wood, paper, textiles, and similar organic materials. Water is an excellent cooling agent for these fires, reducing the temperature of the fuel below its ignition point. Hose reels must never be used on Class B fires (flammable liquids), as the water jet can spread the burning liquid and dramatically worsen the fire. They must never be used on electrical fires due to the risk of electrocution, and never on Class D (metal) fires or Class F (cooking oil/fat) fires. Using water on burning cooking oil can cause a violent steam explosion known as a boilover."
  }
];

/* ------------------------------------------------------------------ */
/*  FAQs (4)                                                          */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: "Can fire blankets be reused after they have been used on a fire?",
    answer:
      "No. Fire blankets must never be reused after they have been deployed on an actual fire. Even if the blanket appears undamaged, the extreme heat from the fire can degrade the woven glass fibre structure and any silicone coating, compromising its integrity and fire resistance for future use. The blanket may have developed microscopic weaknesses that are invisible to the naked eye but would cause it to fail catastrophically if used again. After use on a fire, the blanket should be disposed of safely (allow it to cool completely first) and replaced with a new blanket immediately. Fire blankets used in fire drills or training exercises with live fire must also be replaced. Only blankets that have been removed from their container for inspection purposes — without exposure to heat or flame — can be returned to service, provided they pass a visual inspection."
  },
  {
    question: "Can hose reels be used on electrical fires?",
    answer:
      "No — hose reels must never be used on electrical fires. Water is an excellent conductor of electricity, and directing a water jet at live electrical equipment creates an extremely dangerous electrocution hazard for the person operating the hose reel. The water stream creates a conductive path between the live equipment and the operator, and the voltage can travel up the water jet. Even if the equipment has been isolated, there may be residual stored energy in capacitors or batteries, and there is always a risk that the isolation has not been fully effective. For electrical fires, the correct first response is to isolate the electrical supply if it is safe to do so, then use a CO2 extinguisher (which is non-conductive and leaves no residue) or a dry powder extinguisher. If the electrical supply has been confirmed as isolated and the fire is in Class A materials that were ignited by the electrical fault, water-based extinguishing methods may then be appropriate — but this decision should only be made by someone with appropriate training and certainty about the isolation."
  },
  {
    question: "When should I use a fire blanket instead of a fire extinguisher?",
    answer:
      "Fire blankets and fire extinguishers serve complementary roles, and understanding when to use each is important. Fire blankets are the preferred choice in several specific scenarios: for clothing fires (wrap the blanket around the person — an extinguisher directed at a person can cause injury, panic, and may not be effective on clothing fires); for small contained cooking fires such as a chip pan fire (place the blanket over the pan to smother the flames — never use water on a cooking oil fire); and for very small fires where the fire is smaller than the blanket and contained in a manageable area. Fire extinguishers are preferred for larger fires that exceed the coverage area of a blanket, for fires involving specific classes of material (Class B, C, D, or electrical), and when the fire cannot be safely approached close enough to place a blanket over it. In many situations, having both available provides the best protection — a fire blanket for immediate small-fire response and extinguishers for escalating situations. Remember that both fire blankets and extinguishers are first-aid firefighting measures only; if the fire cannot be controlled quickly, evacuate and call the fire service."
  },
  {
    question: "What happens if a sprinkler system activates near electrical equipment?",
    answer:
      "This is an important concern for electricians. Automatic sprinkler systems are designed to activate individually — only the sprinkler head(s) directly above or adjacent to the fire will activate, not the entire system. The water from activated sprinklers can damage electrical equipment and potentially create electrical hazards. However, the fire safety principle is that the damage caused by water from sprinklers is almost always significantly less than the damage that would be caused by an uncontrolled fire. Modern building design addresses this risk in several ways: electrical switchgear rooms and server rooms may be protected by gas suppression systems (such as FM-200/Novec 1230 or inert gas systems) instead of water sprinklers; critical electrical equipment may be housed in waterproof enclosures; emergency isolation of electrical supplies may be linked to fire detection systems; and BS 7671 (the IEE Wiring Regulations) requires appropriate IP ratings for electrical equipment in areas where water exposure is foreseeable. As an electrician, you should be aware of sprinkler head locations when installing or maintaining electrical equipment, ensure adequate clearance is maintained around sprinkler heads (typically a minimum of 500 mm below the deflector), and never hang cables, conduit, or equipment from sprinkler pipework."
  }
];

/* ------------------------------------------------------------------ */
/*  End-of-Section Quiz (8 questions)                                 */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      "Which British/European Standard specifies the requirements for fire blankets?",
    options: [
      "BS EN 3",
      "BS EN 1869",
      "BS EN 671-1",
      "BS 5306-8"
    ],
    correctAnswer: 1,
    explanation:
      "BS EN 1869 is the standard that governs fire blankets, covering their construction, materials (woven glass fibre, sometimes with silicone coating), testing requirements, and performance criteria. BS EN 3 covers portable fire extinguishers, BS EN 671-1 covers fixed firefighting systems including hose reels and hose systems, and BS 5306-8 covers the selection and positioning of portable fire extinguishers. Knowing the correct standard is essential for specifying, purchasing, and maintaining fire safety equipment."
  },
  {
    id: 2,
    question:
      "When deploying a fire blanket, what is the correct technique for approaching the fire?",
    options: [
      "Throw the blanket from a safe distance onto the fire",
      "Hold the blanket in front of you to shield your hands, and place it gently from the nearest edge",
      "Roll the blanket into a ball and drop it onto the fire from above",
      "Fan the blanket over the fire in a sweeping motion to maximise coverage"
    ],
    correctAnswer: 1,
    explanation:
      "The correct technique is to pull the tabs downward to release the blanket, wrap your hands behind the blanket to protect them from heat and flames, then place the blanket gently over the fire starting from the nearest edge, working away from you. You must never throw the blanket, as this can displace the burning material, splash burning liquids, and introduce air currents that fan the flames. The gentle placement ensures the blanket seals against the surface, cutting off the oxygen supply. Rolling or balling the blanket, or fanning it, would be ineffective and dangerous."
  },
  {
    id: 3,
    question:
      "What is the primary limitation of hose reels when compared to portable fire extinguishers?",
    options: [
      "Hose reels have a shorter reach than extinguishers",
      "Hose reels can only be used on Class A fires involving solid combustibles",
      "Hose reels require annual maintenance whereas extinguishers do not",
      "Hose reels are more expensive to install than extinguishers"
    ],
    correctAnswer: 1,
    explanation:
      "The primary limitation of hose reels is that they can only be used on Class A fires — those involving solid combustible materials such as wood, paper, and textiles. Unlike portable fire extinguishers, which come in various types suitable for different fire classes (CO2 for electrical, foam for Class B, wet chemical for Class F, etc.), hose reels deliver water only and are therefore restricted to Class A fires. Using a hose reel on flammable liquid fires could spread the burning liquid; on electrical fires, the water creates an electrocution hazard; and on cooking oil fires, water can cause a violent boilover. Hose reels actually have a much greater reach (typically 30 metres of hose) than extinguishers and an unlimited water supply."
  },
  {
    id: 4,
    question:
      "What are the three standard sizes of fire blankets?",
    options: [
      "Small (0.5 x 0.5 m), Medium (1.0 x 1.0 m), Large (1.5 x 1.5 m)",
      "Light duty (0.9 x 0.9 m), Medium (1.2 x 1.2 m), Heavy duty (1.8 x 1.2 m)",
      "Type A (0.6 x 0.6 m), Type B (0.9 x 0.9 m), Type C (1.2 x 1.0 m)",
      "Personal (0.9 x 0.9 m), Standard (1.2 x 1.0 m), Industrial (2.0 x 2.0 m)"
    ],
    correctAnswer: 1,
    explanation:
      "The three standard sizes of fire blankets under BS EN 1869 are: light duty (0.9 x 0.9 m), suitable for small kitchen fires and general household or office use; medium (1.2 x 1.2 m), suitable for larger cooking appliances and small workshops; and heavy duty (1.8 x 1.2 m), used in industrial settings, laboratories, and commercial kitchens where larger fires are more likely. The size selection must be appropriate for the anticipated risk — the blanket must be large enough to cover the potential fire completely, as any gaps will allow oxygen to reach the fuel and the smothering action will fail."
  },
  {
    id: 5,
    question:
      "At what height should fire blankets be wall-mounted?",
    options: [
      "1.0 m from the floor",
      "1.2 m from the floor",
      "1.5 m from the floor",
      "1.8 m from the floor"
    ],
    correctAnswer: 2,
    explanation:
      "Fire blankets should be wall-mounted at a height of approximately 1.5 metres from the floor to the top of the container. This height is specified to ensure the blanket is accessible to the majority of adults without requiring them to reach excessively high or bend down, enabling rapid deployment in an emergency. The mounting height also positions the pull-release tabs at a comfortable hand height. The container should be securely fixed to the wall, clearly visible and signed, and positioned near the identified risk (such as cooking areas) but not so close that a fire would prevent access to it — a minimum distance of 1 to 1.5 metres from the cooking appliance is typically recommended."
  },
  {
    id: 6,
    question:
      "How often should hose reels receive a visual inspection?",
    options: [
      "Weekly",
      "Monthly",
      "Quarterly",
      "Six-monthly"
    ],
    correctAnswer: 1,
    explanation:
      "Hose reels should receive a monthly visual inspection as part of the routine fire safety maintenance programme. The monthly check should verify that the hose is in good condition (no kinking, cracking, or perishing), the nozzle is present and functional, the reel mechanism turns freely, the water supply valve is in the open position, there are no obstructions preventing access to the hose reel, and the location signage is visible. In addition to monthly visual checks, hose reels require an annual service by a competent person, which includes a full flow test and pressure check to verify the system is delivering adequate water pressure and flow rate, in accordance with BS 5306-1."
  },
  {
    id: 7,
    question:
      "Why is it important for electricians to maintain clearance around automatic sprinkler heads?",
    options: [
      "To allow access for annual repainting of the sprinkler heads",
      "To ensure the sprinkler spray pattern is not obstructed, allowing effective fire suppression",
      "To prevent electrical interference between sprinkler wiring and power cables",
      "To comply with sprinkler manufacturer warranty requirements"
    ],
    correctAnswer: 1,
    explanation:
      "Maintaining adequate clearance around automatic sprinkler heads is critical because obstructions can interfere with the spray pattern, significantly reducing the effectiveness of the sprinkler system. Each sprinkler head is designed to produce a specific spray pattern that covers a defined area of the room. If cables, cable trays, conduit, light fittings, or other electrical installations are positioned too close to a sprinkler head, they can deflect or block the water spray, creating dry spots where the fire can continue to burn unchecked. BS EN 12845 specifies minimum clearances — typically 500 mm below the sprinkler deflector. Electricians must be aware of sprinkler head locations when routing cables, installing light fittings, or mounting equipment, and must never hang anything from sprinkler pipework."
  },
  {
    id: 8,
    question:
      "What is the correct procedure for using a fire blanket on a person whose clothing is on fire?",
    options: [
      "Throw the blanket over them from a distance and tell them to run outside",
      "Tell the person to stop, drop, and roll, then wrap the blanket tightly around them to smother the flames",
      "Spray them with a water extinguisher first, then cover with the blanket",
      "Wrap the blanket around their legs only, as flames always start at the bottom"
    ],
    correctAnswer: 1,
    explanation:
      "The correct procedure for a clothing fire is: first, instruct the person to stop moving (running fans the flames and spreads the fire), drop to the ground (this helps prevent flames rising to the face and airways), and roll (to attempt to smother flames against the ground). Then wrap the fire blanket around them, covering as much of the burning clothing as possible, and press firmly to exclude air. Keep the blanket in place until the fire is fully extinguished. Do not remove the blanket quickly as the fire may re-ignite. Never tell the person to run, as this dramatically worsens a clothing fire. Never use a CO2 extinguisher on a person — the extreme cold (-78°C) can cause severe frostbite injuries. Water can be used as an alternative if a fire blanket is not immediately available."
  }
];

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */
export default function FireSafetyModule5Section2() {
  useSEO({
    title: "Fire Blankets & Hose Reels | Fire Safety Module 5.2",
    description:
      "Learn about fire blankets (BS EN 1869), hose reels (BS EN 671-1), sprinkler systems, and other fixed firefighting equipment. Covers deployment techniques, placement, maintenance, and electrician awareness for fire safety compliance.",
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
            <Link to="../fire-safety-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 5
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">

        {/* ============================================================ */}
        {/*  PAGE TITLE                                                   */}
        {/* ============================================================ */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-400/20 border border-rose-500/30 mb-4">
            <Shield className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 5 &middot; SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Fire Blankets &amp; Hose Reels
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Understanding the selection, deployment, and maintenance of fire blankets, hose reels, and fixed firefighting systems &mdash; essential knowledge for fire marshals and anyone responsible for workplace fire safety
          </p>
        </header>

        {/* ============================================================ */}
        {/*  QUICK SUMMARY BOXES                                          */}
        {/* ============================================================ */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Fire blankets:</strong> BS EN 1869, woven glass fibre, three sizes</li>
              <li><strong>Smothering action</strong> removes oxygen to extinguish fire</li>
              <li><strong>Hose reels:</strong> BS EN 671-1, Class A fires only</li>
              <li><strong>Fixed systems:</strong> Sprinklers, gas suppression, water mist</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Key Standards</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>BS EN 1869:</strong> Fire blankets — requirements and tests</li>
              <li><strong>BS EN 671-1:</strong> Fixed hose reels with semi-rigid hose</li>
              <li><strong>BS 5306-1:</strong> Maintenance of portable fire extinguishers &amp; hose reels</li>
              <li><strong>BS EN 12845:</strong> Automatic sprinkler systems</li>
            </ul>
          </div>
        </div>

        {/* ============================================================ */}
        {/*  LEARNING OUTCOMES                                            */}
        {/* ============================================================ */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Describe the construction, sizes, and applicable standard for fire blankets",
              "Explain the correct deployment technique for fire blankets and clothing fires",
              "State when hose reels are and are not suitable for firefighting",
              "Describe the operation, advantages, and limitations of hose reels",
              "Outline the inspection and maintenance requirements for blankets and hose reels",
              "Explain how sprinkler systems and other fixed installations complement portable equipment"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* ============================================================ */}
        {/*  SECTION 01: Fire Blankets — Introduction                    */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 text-sm font-bold border border-rose-500/20">01</span>
              Fire Blankets: Introduction
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Fire blankets are simple but highly effective pieces of first-aid firefighting equipment designed to <strong>smother small fires</strong> by cutting off the oxygen supply. They are governed by <strong>BS EN 1869</strong>, which specifies the materials, construction, performance requirements, and testing procedures for fire blankets intended for use in extinguishing small fires in their early stages.
              </p>

              <p>
                Fire blankets are constructed from <strong>woven glass fibre</strong>, which is inherently non-combustible and can withstand extremely high temperatures without melting, burning, or producing toxic fumes. Many modern fire blankets also incorporate a <strong>silicone coating</strong> on one or both sides, which enhances the blanket&rsquo;s resistance to heat transfer, provides a degree of waterproofing, and improves the seal when the blanket is placed over a fire, preventing oxygen from reaching the fuel.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Fire Blanket Sizes (BS EN 1869)</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-sm font-medium text-white">Light Duty</p>
                      <p className="text-sm font-bold text-rose-400">0.9 &times; 0.9 m</p>
                    </div>
                    <p className="text-xs text-white/70 leading-relaxed">
                      The smallest standard size. Suitable for small kitchen fires, small waste bin fires, and general household or small office use. Adequate for covering a standard domestic saucepan or small frying pan. This is the most commonly found size in domestic kitchens.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-sm font-medium text-white">Medium</p>
                      <p className="text-sm font-bold text-rose-400">1.2 &times; 1.2 m</p>
                    </div>
                    <p className="text-xs text-white/70 leading-relaxed">
                      A versatile mid-range size suitable for larger cooking appliances, small workshops, and commercial kitchens with smaller equipment. This size can also be used for wrapping around a person whose clothing is on fire, although the heavy-duty size is preferred for this purpose.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-sm font-medium text-white">Heavy Duty</p>
                      <p className="text-sm font-bold text-rose-400">1.8 &times; 1.2 m</p>
                    </div>
                    <p className="text-xs text-white/70 leading-relaxed">
                      The largest standard size. Used in industrial settings, laboratories, commercial kitchens with large equipment, and workshops where larger fires are more likely. This size is particularly suitable for clothing fires, as it can wrap fully around an adult. Required in most commercial kitchen environments.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                Fire blankets are supplied in a <strong>wall-mounted quick-release container</strong>, typically a rigid or semi-rigid casing with pull-down tabs at the bottom. The container protects the blanket from dust, moisture, and damage during storage, and the pull-tab design enables rapid one-motion deployment. The container is designed so that pulling the tabs downward simultaneously releases the blanket and unfolds it, ready for immediate use.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Size Selection Principle</p>
                <p className="text-sm text-white/80">
                  The fire blanket must be large enough to completely cover the anticipated fire with overlap on all sides. If any part of the fire is not covered, oxygen will continue to reach the fuel through the gap, and the smothering action will fail. The fire risk assessment should determine the appropriate blanket size based on the maximum foreseeable fire size in the specific location. When in doubt, select the next size up.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 02: When to Use Fire Blankets                       */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 text-sm font-bold border border-rose-500/20">02</span>
              When to Use Fire Blankets
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Fire blankets work by <strong>smothering</strong> &mdash; they physically remove the oxygen element from the fire triangle. When a fire blanket is placed over a fire and sealed against the surface, it prevents fresh air from reaching the fuel. Without oxygen, combustion cannot continue, and the fire is extinguished. This is the same principle as placing a lid on a burning pan.
              </p>

              <p>
                Fire blankets are specifically designed for use on <strong>small fires in their early stages</strong>. They are most effective in the following scenarios:
              </p>

              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Clothing fires</strong> &mdash; wrapping the blanket around a person whose clothing is on fire is one of the most important uses. The blanket smothers the flames against the body without the risks associated with using an extinguisher on a person (frostbite from CO2, chemical irritation from powder)</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Small cooking fires</strong> &mdash; chip pan fires, frying pan fires, and other small cooking fires where the fire is contained in a vessel. Place the blanket over the vessel to seal off the oxygen supply. This is safer than attempting to move a burning pan or using water on hot oil</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Small liquid spill fires</strong> &mdash; where a small quantity of flammable liquid has spilled and ignited, and the fire is smaller than the blanket. The blanket can smother the fire by covering the entire spill area</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Waste bin fires</strong> &mdash; small fires in waste containers where the blanket can be placed over the top to cut off the air supply</span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Critical Size Limitation</p>
                </div>
                <p className="text-sm text-white/80">
                  A fire blanket can only extinguish a fire that is <strong>smaller than the blanket itself</strong>. If the fire has spread beyond the area the blanket can cover, the smothering action will be incomplete and the fire will continue to burn around the edges. In this situation, do not attempt to use the blanket &mdash; use a suitable fire extinguisher if trained to do so, or evacuate immediately and call the fire and rescue service.
                </p>
              </div>

              <p>
                Fire blankets can also be used as a <strong>heat shield during escape</strong>. If you need to pass through an area of radiant heat (for example, passing close to a fire to reach an exit), holding a fire blanket in front of your body can provide a degree of protection from radiant heat. This is a secondary use and should only be considered when no alternative escape route exists.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">When NOT to Use a Fire Blanket</p>
                <ul className="space-y-2 text-sm text-white/70">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>Fires that are larger than the blanket can cover</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>Fires that are well-developed or spreading rapidly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>Deep-fat fryer fires in commercial kitchens (use wet chemical extinguisher)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>Situations where you cannot safely approach within arm&rsquo;s reach of the fire</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ============================================================ */}
        {/*  SECTION 03: Fire Blanket Technique                          */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 text-sm font-bold border border-rose-500/20">03</span>
              Fire Blanket Technique
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Correct technique is essential when deploying a fire blanket. An incorrectly deployed blanket can be ineffective or, worse, can worsen the situation by fanning the flames or splashing burning liquid. The following procedure should be followed precisely.
              </p>

              {/* Styled-div diagram: Fire Blanket Technique Steps */}
              <div className="my-6 p-4 sm:p-6 rounded-xl bg-white/[0.02] border border-rose-500/20">
                <h3 className="text-sm font-semibold text-rose-400 mb-4 flex items-center gap-2">
                  <Hand className="h-4 w-4" />
                  Fire Blanket Technique Steps
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 text-sm font-bold flex-shrink-0">1</div>
                    <div>
                      <p className="text-sm font-medium text-white">Pull Tabs Downward</p>
                      <p className="text-xs text-white/70 leading-relaxed">Grip both pull tabs firmly and pull straight down. This releases the blanket from its container and allows it to unfold under its own weight. Hold the blanket at arm&rsquo;s length in front of your body.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 text-sm font-bold flex-shrink-0">2</div>
                    <div>
                      <p className="text-sm font-medium text-white">Wrap Hands Behind Blanket</p>
                      <p className="text-xs text-white/70 leading-relaxed">Fold the top edge of the blanket over your hands so they are protected behind the blanket material. This shields your hands and forearms from heat and flames as you approach the fire. Your hands should never be exposed in front of the blanket.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 text-sm font-bold flex-shrink-0">3</div>
                    <div>
                      <p className="text-sm font-medium text-white">Place Gently Over Fire</p>
                      <p className="text-xs text-white/70 leading-relaxed">Approach from the nearest edge. Place the blanket gently over the fire, working from near to far. Do NOT throw the blanket &mdash; throwing can displace burning material, splash burning liquids, and fan the flames. Ensure the blanket covers the entire fire with overlap on all sides.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 text-sm font-bold flex-shrink-0">4</div>
                    <div>
                      <p className="text-sm font-medium text-white">Leave in Place &mdash; Minimum 30 Minutes</p>
                      <p className="text-xs text-white/70 leading-relaxed">Once placed, do not lift or peek under the blanket. Leave it in place for a minimum of 30 minutes to allow the fire and its fuel to cool below ignition temperature. Removing the blanket too early allows oxygen to reach the still-hot fuel, which can cause the fire to reflash violently.</p>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-white/50 text-center mt-4">
                  After 30 minutes, carefully check whether the fire has been fully extinguished before removing the blanket. If in doubt, leave it in place and await the fire and rescue service.
                </p>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Flame className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Clothing Fire Procedure</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  Clothing fires are extremely dangerous and require an immediate, specific response:
                </p>
                <ul className="space-y-2 text-sm text-white/70">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong>STOP</strong> &mdash; prevent the person from running (running fans the flames, accelerating the fire and drawing it towards the face)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong>DROP</strong> &mdash; get the person to the ground (prevents flames rising to the face and airways; lying down also reduces the surface area exposed to upward flame travel)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong>ROLL</strong> &mdash; roll the person on the ground to smother as much flame as possible</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong>BLANKET</strong> &mdash; wrap the fire blanket around the person, covering the burning area completely. Press firmly to exclude air. Do not remove until the fire is fully extinguished</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Single Use Only</p>
                <p className="text-sm text-white/80">
                  Fire blankets must <strong>never be reused</strong> after contact with fire. The extreme heat degrades the glass fibre structure and any coating, even if the damage is not visible. A used blanket may fail catastrophically if deployed on another fire. After any use on an actual fire, dispose of the blanket safely (allow it to cool completely) and replace it with a new one immediately.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 04: Fire Blanket Placement & Maintenance            */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 text-sm font-bold border border-rose-500/20">04</span>
              Fire Blanket Placement &amp; Maintenance
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The correct placement of fire blankets is just as important as knowing how to use them. A fire blanket that cannot be reached quickly in an emergency is effectively useless. Placement should be determined by the <strong>fire risk assessment</strong> and should prioritise locations where small fires are most likely to occur.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Typical Placement Locations</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Cooking Areas &amp; Kitchens</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Every kitchen — domestic, commercial, and workplace — should have a fire blanket. Position it 1 to 1.5 metres from the cooking appliance so that it can be reached without having to lean over the stove or pass through the fire area. Do not mount it directly above or immediately beside a cooker hob.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Laboratories</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Laboratories handling flammable chemicals, solvents, or open flames (Bunsen burners) should have fire blankets positioned near exits. Heavy-duty blankets (1.8 &times; 1.2 m) are typically specified for laboratory environments.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Workshops &amp; Industrial Areas</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Workshops where hot work (welding, grinding, soldering) is conducted, or where flammable materials are stored or used. Position blankets on escape routes near identified fire risks.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Wrench className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Mounting &amp; Maintenance Requirements</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { label: "Mounting height", desc: "Approximately 1.5 m from the floor to the top of the container" },
                    { label: "Monthly visual check", desc: "Container intact and undamaged, pull tabs accessible and visible" },
                    { label: "Annual inspection", desc: "Remove blanket from container, inspect for damage, check condition" },
                    { label: "Replace after use", desc: "Single-use item — replace immediately after any fire deployment" },
                    { label: "Clear signage", desc: "BS 5499 / ISO 7010 fire safety sign positioned above the container" },
                    { label: "Shelf life", desc: "Typically 7 years from manufacture (check manufacturer guidance)" }
                  ].map((item, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-3">
                      <p className="text-sm font-medium text-white">{item.label}</p>
                      <p className="text-xs text-white/70 mt-0.5">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Monthly Visual Check Procedure</p>
                <p className="text-sm text-white/80">
                  During each monthly check, verify: the container is securely mounted and undamaged; the pull tabs are hanging freely and are not tucked inside or caught; the location sign is visible and legible; access to the blanket is not obstructed by stored items, furniture, or equipment; and the blanket has not been used (pull tabs intact). Record the check in the fire safety log book. If the blanket has been removed from its container (for example, by vandalism or accidental deployment), replace it immediately.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ============================================================ */}
        {/*  SECTION 05: Fixed Hose Reels                                */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 text-sm font-bold border border-rose-500/20">05</span>
              Fixed Hose Reels
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Fixed hose reels are <strong>permanently installed firefighting systems</strong> governed by <strong>BS EN 671-1</strong> (Fixed firefighting systems &mdash; Hose systems &mdash; Part 1: Hose reels with semi-rigid hose). Unlike portable fire extinguishers, which contain a finite amount of extinguishing agent, hose reels are connected directly to the building&rsquo;s water supply, providing a <strong>continuous and virtually unlimited supply of water</strong> for firefighting.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Droplets className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Hose Reel Specifications</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-sm font-medium text-white">Hose Length</p>
                      <p className="text-sm font-bold text-rose-400">Typically 30 m</p>
                    </div>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Standard hose reels are fitted with approximately 30 metres of semi-rigid hose, providing substantial reach from the wall-mounted reel to the fire. The hose length should be sufficient to reach all parts of the area it is intended to protect.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-sm font-medium text-white">Hose Diameter</p>
                      <p className="text-sm font-bold text-rose-400">19 mm or 25 mm</p>
                    </div>
                    <p className="text-xs text-white/70 leading-relaxed">
                      The internal diameter of the hose determines the flow rate. A 19 mm hose is suitable for most general-purpose applications; a 25 mm hose delivers a higher flow rate and is used where a greater volume of water is required, such as in larger industrial or commercial premises.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-sm font-medium text-white">Water Supply</p>
                      <p className="text-sm font-bold text-rose-400">Permanently connected</p>
                    </div>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Hose reels are permanently connected to the building&rsquo;s water supply, either directly from the mains or from a dedicated fire service tank with a pump. The supply valve may be automatic (opens when the hose is unreeled) or manual (requires the operator to open it before use).
                    </p>
                  </div>
                </div>
              </div>

              <p>
                Hose reels are typically located in <strong>common areas on escape routes</strong>, such as corridors, staircase lobbies, and near exits. They are positioned to provide maximum coverage of the building with a minimum number of installations. Each hose reel is housed in a wall-mounted or recessed cabinet with a clear glass or break-glass door, and is clearly signed in accordance with fire safety signage standards.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Trained Users Only</p>
                </div>
                <p className="text-sm text-white/80">
                  Hose reels should only be operated by persons who have received <strong>appropriate training</strong>. Unlike a fire blanket or a fire extinguisher (which most people can use with basic instruction), a hose reel requires knowledge of the correct operation procedure, an understanding of the water supply system, and awareness of which fire classes the water jet is suitable for. Incorrect use of a hose reel — particularly on electrical, liquid, or cooking oil fires — can be extremely dangerous. Fire marshal training should include practical hose reel operation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 06: Hose Reel Operation                             */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 text-sm font-bold border border-rose-500/20">06</span>
              Hose Reel Operation
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Operating a hose reel correctly requires a systematic approach. The following procedure should be followed in sequence to ensure safe and effective use.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Settings className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Hose Reel Operating Procedure</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 text-sm font-bold flex-shrink-0">1</div>
                    <div>
                      <p className="text-sm font-medium text-white">Check Water Supply Valve Is Open</p>
                      <p className="text-xs text-white/70">For manual valve systems, turn the gate valve to the fully open position. Some systems have automatic valves that open when the hose is pulled from the reel. Ensure the valve is confirmed as open before proceeding.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 text-sm font-bold flex-shrink-0">2</div>
                    <div>
                      <p className="text-sm font-medium text-white">Unreel Sufficient Hose</p>
                      <p className="text-xs text-white/70">Pull the hose from the reel, unwinding enough length to reach the fire comfortably. You do not need to unreel the entire hose — only enough to reach the fire with some slack. Avoid sharp kinks in the hose that could restrict water flow.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 text-sm font-bold flex-shrink-0">3</div>
                    <div>
                      <p className="text-sm font-medium text-white">Open Nozzle Valve</p>
                      <p className="text-xs text-white/70">The nozzle at the end of the hose has its own on/off control and may have a spray pattern adjustment (jet or spray). Open the nozzle to begin the water flow. Use a jet pattern for longer range and penetration into deep-seated fires; use a spray pattern for wider coverage and some protection from radiant heat.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 text-sm font-bold flex-shrink-0">4</div>
                    <div>
                      <p className="text-sm font-medium text-white">Direct Water at Base of Fire</p>
                      <p className="text-xs text-white/70">Aim the water jet at the base of the flames, not at the tips. The base is where the fuel is burning, and cooling the fuel below its ignition temperature is what extinguishes the fire. Sweep the jet systematically across the base of the fire.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
                  <CheckCircle className="h-6 w-6 text-green-400 mb-2" />
                  <p className="text-sm font-semibold text-green-400 mb-2">Advantages</p>
                  <ul className="space-y-2 text-sm text-white/70">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span><strong>Unlimited water supply</strong> &mdash; unlike extinguishers which last 10&ndash;60 seconds, hose reels provide continuous water</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span><strong>Greater reach</strong> &mdash; 30 m of hose provides far greater range than any portable extinguisher</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span><strong>Sustained firefighting</strong> &mdash; can continue to apply water for extended periods</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span><strong>Variable spray patterns</strong> &mdash; jet for penetration, spray for wider coverage</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
                  <AlertTriangle className="h-6 w-6 text-rose-400 mb-2" />
                  <p className="text-sm font-semibold text-rose-400 mb-2">Limitations</p>
                  <ul className="space-y-2 text-sm text-white/70">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span><strong>Class A fires only</strong> &mdash; not suitable for electrical, liquid, oil, or metal fires</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span><strong>Water supply dependent</strong> &mdash; requires adequate water pressure and flow</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span><strong>Training required</strong> &mdash; incorrect use can create additional hazards</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span><strong>Water damage</strong> &mdash; significant water damage to property and equipment</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Electrical Trade Relevance</p>
                <p className="text-sm text-white/80">
                  As an electrician, you must be acutely aware that hose reels deliver water &mdash; a conductor of electricity. If a fire involves or is near electrical equipment, <strong>never use a hose reel until the electrical supply has been confirmed as isolated</strong> by a competent person. Even after isolation, residual stored energy in capacitors, batteries, or uninterruptible power supplies (UPS) may still present a risk. When installing or maintaining electrical equipment near hose reel locations, ensure that switchgear and distribution boards are not positioned where they could be accidentally sprayed during hose reel use.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ============================================================ */}
        {/*  SECTION 07: Hose Reel Testing & Maintenance                 */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 text-sm font-bold border border-rose-500/20">07</span>
              Hose Reel Testing &amp; Maintenance
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Like all fire safety equipment, hose reels must be <strong>regularly inspected, tested, and maintained</strong> to ensure they will function correctly when needed. A hose reel that has not been tested may have a seized valve, a perished hose, or no water supply &mdash; rendering it completely useless in an emergency. Maintenance requirements are set out in <strong>BS 5306-1</strong>.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <ClipboardCheck className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Monthly Visual Inspection</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { label: "Hose condition", desc: "Check for cracking, perishing, kinking, abrasion, or other visible damage" },
                    { label: "Nozzle", desc: "Present, securely attached, and operating mechanism functional" },
                    { label: "Reel mechanism", desc: "Reel rotates freely, hose unreels and rewinds smoothly without jamming" },
                    { label: "Water supply valve", desc: "Confirm valve is in the open position (handle parallel to pipe)" },
                    { label: "Access", desc: "Hose reel cabinet is unobstructed and accessible; break-glass intact if fitted" },
                    { label: "Signage", desc: "Location sign is visible, legible, and correctly positioned" }
                  ].map((item, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-3">
                      <p className="text-sm font-medium text-white">{item.label}</p>
                      <p className="text-xs text-white/70 mt-0.5">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Timer className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Annual Service by Competent Person</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  In addition to monthly visual checks, hose reels require a comprehensive annual service carried out by a <strong>competent person</strong> (typically a fire extinguisher/hose reel service engineer). The annual service includes:
                </p>
                <ul className="space-y-2 text-sm text-white/70">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong>Full flow test</strong> &mdash; the hose is fully unreeled and the water supply is activated to verify that water flows freely at an adequate rate and pressure through the full length of hose</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong>Pressure test</strong> &mdash; the system is checked to ensure it delivers the required minimum pressure at the nozzle (typically 2 bar minimum)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong>Hose inspection</strong> &mdash; the full length of hose is inspected for damage, and the connections are checked for leaks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong>Valve operation</strong> &mdash; both the supply valve and the nozzle valve are operated and checked for smooth, leak-free operation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong>Reel mechanism</strong> &mdash; the reel bearing and swivel joint are inspected and lubricated if necessary</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Record Keeping</p>
                <p className="text-sm text-white/80">
                  All inspections, tests, and maintenance activities must be <strong>recorded in writing</strong>. The fire safety log book should contain: the date of each inspection or service; the name of the person who carried it out; the findings (satisfactory or defects noted); any remedial action required; and confirmation that remedial actions have been completed. These records must be available for inspection by the fire and rescue service or enforcing authority. Under the RRFSO, the responsible person must ensure that fire safety equipment is maintained in an efficient state, in efficient working order, and in good repair.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 08: Sprinkler Systems & Other Fixed Systems         */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 text-sm font-bold border border-rose-500/20">08</span>
              Sprinkler Systems &amp; Other Fixed Systems
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Beyond portable extinguishers, fire blankets, and hose reels, many buildings are protected by <strong>fixed firefighting systems</strong> that activate automatically or can be triggered manually. Understanding these systems is important for fire marshals and particularly relevant for electricians, who may need to work around or maintain the electrical components of these systems.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Layers className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Types of Fixed Firefighting Systems</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Automatic Sprinkler Systems (BS EN 12845)</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      The most common fixed system. Sprinkler heads are installed throughout the building, typically at ceiling level. Each head contains a heat-sensitive element (glass bulb or fusible link) that breaks at a specific temperature (typically 57&deg;C to 68&deg;C for standard response heads). When the element breaks, water is discharged from that individual head only &mdash; not from all heads simultaneously. This targeted response minimises water damage while controlling the fire at its point of origin. Sprinkler systems are extremely effective: statistics show they control or extinguish fires in over 99% of activations.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Gas Suppression Systems</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Used in areas where water would cause unacceptable damage, such as server rooms, data centres, telecommunications rooms, and archive stores. Gas suppression agents include FM-200 (HFC-227ea), Novec 1230, and inert gas blends (IG-55, IG-541). These agents extinguish fire by either chemically inhibiting combustion or reducing the oxygen concentration below the level required to sustain a flame (typically to around 12&ndash;14% O2). They leave no residue, making them ideal for protecting sensitive electronic equipment.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Foam Systems</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Used in areas with significant flammable liquid risks, such as fuel storage facilities, aircraft hangars, and petrochemical plants. Foam is generated by mixing a foam concentrate with water and aerating the mixture. The foam blankets the surface of the burning liquid, separating the fuel from the oxygen and cooling the surface. Foam can be applied through fixed nozzles, foam pourers, or foam monitors.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Water Mist Systems</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      A newer technology that uses very fine water droplets (typically less than 1 mm diameter) delivered at high pressure. The fine mist absorbs heat extremely efficiently due to its large surface area, while also displacing oxygen around the fire. Water mist systems use significantly less water than conventional sprinklers, reducing water damage. They are increasingly used in heritage buildings, hotels, and residential properties where minimising water damage is important.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Electrician Awareness: Working Near Fixed Systems</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  As an electrician, you must be aware of the following when working in buildings with fixed firefighting systems:
                </p>
                <ul className="space-y-2 text-sm text-white/70">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong>Do not obstruct sprinkler heads</strong> &mdash; maintain a minimum clearance of 500 mm below sprinkler deflectors. Never hang cables, cable trays, conduit, or light fittings from sprinkler pipework or within the clearance zone</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong>Gas suppression zones</strong> &mdash; before working in a gas-protected room, ensure the system is in a safe state. Accidental activation of a gas suppression system while you are in the room can be dangerous (inert gas systems reduce oxygen levels). Follow the permit-to-work procedure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong>Isolation procedures</strong> &mdash; if your work could generate heat, dust, or fumes that might trigger fire detection or suppression systems, coordinate with the building&rsquo;s fire safety manager to arrange temporary isolation of the affected zone (with appropriate risk mitigation measures in place)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong>Electrical connections</strong> &mdash; many fixed systems have electrical components: control panels, detection circuits, valve actuators, pump controllers, and alarm interfaces. Do not disconnect or interfere with any fire system wiring without proper authorisation and competence</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">How Fixed Systems Complement Portable Equipment</p>
                <p className="text-sm text-white/80">
                  Fixed firefighting systems and portable equipment serve complementary roles in a building&rsquo;s fire protection strategy. Fixed systems provide <strong>automatic, immediate response</strong> without requiring human intervention &mdash; critical during unoccupied periods or when a fire starts in a concealed location. Portable equipment (extinguishers, fire blankets, hose reels) provides <strong>first-aid firefighting capability</strong> for trained occupants to tackle small fires in their very early stages, before the fixed system activates or in areas not covered by fixed systems. A comprehensive fire protection strategy includes both: fixed systems as the primary defence, with portable equipment as a supplementary first-response capability.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  FAQ SECTION                                                  */}
        {/* ============================================================ */}
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

        {/* ============================================================ */}
        {/*  END-OF-SECTION QUIZ                                          */}
        {/* ============================================================ */}
        <Quiz
          title="Section 2 Knowledge Check"
          questions={quizQuestions}
        />

        {/* ============================================================ */}
        {/*  BOTTOM NAVIGATION                                            */}
        {/* ============================================================ */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../fire-safety-module-5-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Fire Extinguisher Types
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../fire-safety-module-5-section-3">
              Incident Reporting &amp; Investigation
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>

      </article>
    </div>
  );
}
