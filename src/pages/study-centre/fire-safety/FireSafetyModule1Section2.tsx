import {
  ArrowLeft,
  ArrowRight,
  Flame,
  AlertTriangle,
  Droplets,
  Wind,
  Zap,
  Shield,
  CheckCircle,
  Beaker,
  TriangleAlert,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

/* ------------------------------------------------------------------ */
/*  Quick Check Questions (3)                                         */
/* ------------------------------------------------------------------ */
const quickCheckQuestions = [
  {
    id: 'class-b-liquids',
    question: 'Which class of fire involves flammable liquids?',
    options: [
      'Class A — ordinary combustibles',
      'Class B — flammable liquids',
      'Class C — flammable gases',
      'Class F — cooking oils and fats',
    ],
    correctIndex: 1,
    explanation:
      'Class B fires involve flammable liquids and liquefiable solids such as petrol, diesel, solvents, paints, and oils. They are extinguished by smothering the fire to cut off the oxygen supply, typically using foam or CO2 extinguishers. Class F is a separate category specifically for cooking oils and fats, which burn at much higher temperatures and require wet chemical extinguishers.',
  },
  {
    id: 'class-c-no-extinguish',
    question:
      'Why should you NOT extinguish a Class C gas fire unless the gas supply can be isolated?',
    options: [
      'Gas fires are too hot to approach safely',
      'Unburned gas accumulates, creating an explosion risk',
      'Water is the only effective extinguishing agent for gas fires',
      'Gas fires always re-ignite within seconds',
    ],
    correctIndex: 1,
    explanation:
      'If a gas fire is extinguished while the gas supply is still flowing, unburned gas will continue to escape and accumulate in the area. When this gas reaches the correct concentration (between its Lower Explosive Limit and Upper Explosive Limit) and encounters an ignition source, a devastating explosion can occur. The correct procedure is always to isolate the gas supply first — once the fuel is removed, the fire will extinguish itself safely.',
  },
  {
    id: 'class-f-water-danger',
    question:
      'What reaction makes water extremely dangerous on Class F cooking oil fires?',
    options: [
      'Water causes a chemical reaction that produces toxic fumes',
      'Water cools the oil too rapidly, causing the container to crack',
      'Water instantly vaporises into steam, causing a violent boilover explosion',
      'Water spreads the oil across a wider area',
    ],
    correctIndex: 2,
    explanation:
      'When water comes into contact with burning cooking oil (which can reach temperatures above 340 degrees C), the water instantly converts to steam, expanding approximately 1,700 times in volume. This violent expansion throws the burning oil upward and outward in a fireball effect known as a boilover. This is why wet chemical extinguishers — which use a fine mist that undergoes saponification to form a soap-like seal over the oil — are the only appropriate extinguisher for Class F fires.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQs (4)                                                          */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question:
      "Why doesn't the current BS EN 2 standard include a Class E for electrical fires?",
    answer:
      'The original British Standard did include a Class E for electrical fires, but when the European standard BS EN 2:1992 was adopted, it was removed as a formal classification. The reasoning is that electricity is not a fuel — it is the ignition source. Once the electrical supply is isolated, the fire is reclassified according to the fuel that is actually burning (most commonly Class A for cable insulation or Class B for transformer oil). In practice, electrical fires are still treated as a distinct scenario because of the electrocution hazard. You must never use water or foam on energised electrical equipment. CO2 and dry powder extinguishers are safe on live electrical equipment because they are non-conductive. The key first step is always to de-energise the equipment if it is safe to do so, then fight the fire according to the underlying fuel class.',
  },
  {
    question: 'Can a single fire involve multiple classes simultaneously?',
    answer:
      'Yes, and this is actually quite common in real-world fire scenarios. A workshop fire might involve burning timber and cardboard (Class A), spilled solvents and lubricating oils (Class B), and a ruptured gas line (Class C) all at the same time. A kitchen fire could combine Class A materials (wooden cupboards, paper towels) with Class F (deep fat fryer oil). In these situations, you must assess the primary fuel that is burning most fiercely and address that first, while being careful not to use an extinguishing agent that could make another element of the fire worse. For example, using water on the Class A element of a fire that also involves burning oil could trigger a catastrophic boilover on the oil component. Multi-class fires are one of the strongest arguments for thorough fire risk assessments that identify all potential fuel sources in a given area.',
  },
  {
    question:
      'What is the difference between flash point and auto-ignition temperature?',
    answer:
      'These are two distinct but related properties of flammable liquids. The flash point is the lowest temperature at which a liquid produces enough vapour to form a flammable mixture with air near its surface. At the flash point, the vapour will ignite briefly if an external ignition source (such as a spark or flame) is applied, but may not sustain burning. The auto-ignition temperature is the minimum temperature at which a substance will spontaneously ignite without any external ignition source — no spark or flame is needed. The auto-ignition temperature is always significantly higher than the flash point. For example, petrol has a flash point of approximately minus 43 degrees C (which is why it is so dangerous — it produces flammable vapour even in cold conditions) but an auto-ignition temperature of around 280 degrees C. Understanding these concepts is critical for fire risk assessment, particularly when working near stored flammable liquids or in confined spaces where vapour can accumulate.',
  },
  {
    question: 'Why are lithium battery fires so difficult to deal with?',
    answer:
      'Lithium battery fires present several unique challenges. First, lithium is a Class D combustible metal, and when it burns it reacts violently with water, producing hydrogen gas which is itself highly flammable and explosive. Second, lithium-ion batteries undergo a process called thermal runaway, where the internal temperature rises uncontrollably as the battery cells break down, releasing their own oxygen. This means the fire is partially self-sustaining — smothering it to remove external oxygen may not be fully effective because the battery generates its own oxidiser. Third, the electrolyte inside lithium-ion batteries is a flammable organic solvent (typically a Class B fuel), so a lithium battery fire is simultaneously a Class D metal fire and a Class B liquid fire. Fourth, thermal runaway can propagate from cell to cell in a battery pack, causing fires to reignite hours or even days after they appear to be extinguished. Specialist lithium battery fire extinguishers (such as those containing Aqueous Vermiculite Dispersion or copper-based agents) are increasingly being specified for premises with significant lithium battery storage.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz Questions (8)                                                */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question: 'Which of the following materials would be classified as a Class A fire?',
    options: [
      'Burning petrol spill on a workshop floor',
      'Timber framing and cardboard packaging on a construction site',
      'A ruptured propane cylinder venting and burning',
      'A deep fat fryer with ignited cooking oil',
    ],
    correctAnswer: 1,
    explanation:
      'Class A fires involve ordinary combustible solid materials that leave an ash residue when burnt — wood, paper, textiles, cardboard, rubber, and many plastics. Timber framing and cardboard packaging are typical Class A fuels found on construction sites. Petrol is Class B (flammable liquid), propane is Class C (flammable gas), and cooking oil is Class F.',
  },
  {
    id: 2,
    question:
      'A fire breaks out involving spilled diesel fuel in a plant room. Which extinguisher type is MOST appropriate?',
    options: [
      'Water (red label)',
      'Foam (cream label) or CO2 (black label)',
      'Wet chemical (yellow label)',
      'Water mist with no additives',
    ],
    correctAnswer: 1,
    explanation:
      'Diesel is a Class B flammable liquid. Foam extinguishers work by forming a blanket over the surface of the burning liquid, cutting off the oxygen supply and preventing flammable vapour release. CO2 displaces oxygen around the fire. Water jets must NEVER be used on burning liquid pools as they can spread the fire or cause dangerous splashing. Wet chemical extinguishers are designed specifically for Class F cooking oil fires.',
  },
  {
    id: 3,
    question:
      'What is the PRIMARY danger of using water to extinguish a fire involving live electrical equipment?',
    options: [
      'Water damages expensive electrical components',
      'Water conducts electricity, creating a serious electrocution risk for the user',
      'Water causes electrical equipment to explode',
      'Water makes the electrical fire burn more intensely',
    ],
    correctAnswer: 1,
    explanation:
      'Water is an electrical conductor. Directing a water jet at energised electrical equipment creates a conductive path between the live equipment and the person holding the extinguisher, resulting in a potentially fatal electric shock. This is why CO2 and dry powder extinguishers — both non-conductive — are specified for use on electrical fires. The first action should always be to isolate the electrical supply if it is safe to do so.',
  },
  {
    id: 4,
    question:
      'What does the term "flash point" mean in the context of flammable liquids?',
    options: [
      'The temperature at which a liquid spontaneously ignites without a spark',
      'The lowest temperature at which a liquid produces enough vapour to ignite briefly when an ignition source is applied',
      'The maximum temperature a liquid can reach before it evaporates completely',
      'The temperature at which a liquid changes from a solid to a liquid state',
    ],
    correctAnswer: 1,
    explanation:
      'The flash point is the lowest temperature at which a flammable liquid produces sufficient vapour above its surface to form an ignitable mixture with air. When an external ignition source is applied at or above the flash point, the vapour will ignite briefly. This is different from the auto-ignition temperature, which is the temperature at which the substance ignites spontaneously without any external ignition source.',
  },
  {
    id: 5,
    question:
      'You discover a fire involving a leaking acetylene cylinder on site. What should you do FIRST?',
    options: [
      'Extinguish the flame with a dry powder extinguisher',
      'Apply water to cool the cylinder',
      'Evacuate the area, call the fire service, and attempt to isolate the gas supply only if safe to do so',
      'Smother the fire with a fire blanket',
    ],
    correctAnswer: 2,
    explanation:
      'Acetylene is a Class C flammable gas. The critical principle for gas fires is that you should NOT extinguish the flame unless the gas supply can be isolated first. If the flame is extinguished while gas continues to leak, the unburned gas will accumulate and could cause a catastrophic explosion when it encounters an ignition source. Evacuate the area, call 999, and only attempt to shut off the gas supply if it is safe to do so. Let the fire service handle the situation if the supply cannot be safely isolated.',
  },
  {
    id: 6,
    question:
      'Which fire class was added to the BS EN 2 standard in 2005 to cover cooking oils and fats?',
    options: ['Class D', 'Class E', 'Class F', 'Class G'],
    correctAnswer: 2,
    explanation:
      'Class F was added to BS EN 2 in 2005 specifically to address fires involving cooking oils and fats. These fires were previously grouped with Class B flammable liquids, but cooking oils behave very differently — they burn at much higher temperatures (above 340 degrees C) and react violently with water. The introduction of Class F recognised the need for specialist wet chemical extinguishers that use saponification to safely suppress these fires.',
  },
  {
    id: 7,
    question:
      'What is the correct procedure when you discover a fire involving energised electrical equipment?',
    options: [
      'Immediately apply foam to smother the fire',
      'De-energise the equipment if safe, then treat the fire according to its underlying fuel class; if unable to isolate, use CO2 or dry powder',
      'Apply water from a safe distance of at least 3 metres',
      'Leave the fire to burn and wait for the fire service — electrical fires cannot be fought',
    ],
    correctAnswer: 1,
    explanation:
      'The correct procedure for electrical fires is: first, de-energise the equipment if it is safe to do so (isolate at the distribution board or consumer unit). Once de-energised, the fire is reclassified according to the fuel that is burning — usually Class A (cable insulation, plastic housings) or Class B (transformer oil). If the equipment cannot be isolated and remains live, use only non-conductive extinguishing agents: CO2 (black label) or dry powder (blue label). NEVER use water or foam on live electrical equipment.',
  },
  {
    id: 8,
    question:
      'A wet chemical extinguisher suppresses Class F cooking oil fires through which chemical process?',
    options: [
      'Oxidation — it adds oxygen to cool the fire',
      'Emulsification — it mixes water into the oil to dilute it',
      'Saponification — it reacts with the oil to form a soap-like seal over the surface',
      'Sublimation — it converts the oil directly from liquid to gas',
    ],
    correctAnswer: 2,
    explanation:
      'Wet chemical extinguishers contain a solution of potassium acetate (or potassium citrate/potassium carbonate). When this solution is applied as a fine mist onto burning cooking oil, it reacts with the fatty acids in the oil through a process called saponification — literally "soap making". This reaction produces a thick, soap-like layer that seals the surface of the oil, cutting off the oxygen supply and preventing the release of flammable vapour. The fine mist application also gently cools the oil without causing the violent steam explosion that a water jet would produce.',
  },
];

/* ================================================================== */
/*  Component                                                         */
/* ================================================================== */
export default function FireSafetyModule1Section2() {
  useSEO({
    title: 'Classes of Fire | Fire Safety Module 1.2',
    description:
      'UK fire classification system — Class A ordinary combustibles, Class B flammable liquids, Class C flammable gases, Class D combustible metals, electrical fires, and Class F cooking oils. BS EN 2:1992 standard, extinguisher selection, and fire behaviour.',
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
            <Link to="../fire-safety-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 1
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-400/20 border border-rose-500/30 mb-4">
            <Flame className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 1 &middot; SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Classes of Fire
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Understanding fire classification under BS EN 2, the fuels associated with each class,
            why using the wrong extinguishing agent can be lethal, and how to select the correct
            extinguisher for every scenario
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>6 classes:</strong> A (solids), B (liquids), C (gases), D (metals), Electrical, F (cooking oils)
              </li>
              <li>
                <strong>Wrong agent = danger:</strong> Water on oil or electrics can kill
              </li>
              <li>
                <strong>Standard:</strong> BS EN 2:1992 (Class F added 2005)
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400/90 text-base font-medium mb-2">Key Principles</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Identify the fuel:</strong> What is actually burning?
              </li>
              <li>
                <strong>Match the agent:</strong> Each class needs a specific extinguisher type
              </li>
              <li>
                <strong>Electrical first:</strong> De-energise before fighting the underlying fire
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Identify and describe all six classes of fire under the BS EN 2 classification system',
              'Explain why different fire classes require different extinguishing agents',
              'Select the correct extinguisher type for each class of fire',
              'Describe the dangers of using the wrong extinguishing agent on a given fire class',
              'Explain the concepts of flash point, auto-ignition temperature, and explosive limits',
              'Apply fire classification knowledge to common workplace scenarios, particularly electrical installations',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* ============================================================ */}
        {/* Section 01 — Introduction to Fire Classification             */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">01</span>
            Introduction to Fire Classification
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Not all fires are the same. A fire burning through timber reacts very differently
                to one fuelled by petrol, and both are fundamentally different from a fire
                involving a leaking gas cylinder or a deep fat fryer. Because these fires behave
                differently, they require different approaches to extinguish them safely and
                effectively. Using the wrong method can be not just ineffective, but actively
                dangerous &mdash; even fatal.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Real-World Dangers</p>
                </div>
                <div className="text-sm text-white/80 space-y-2">
                  <p>
                    Directing a <strong className="text-white">water jet at burning cooking oil</strong>{' '}
                    causes a violent steam explosion (boilover) that throws burning oil into the
                    air, rapidly spreading the fire and causing severe burns.
                  </p>
                  <p>
                    Applying <strong className="text-white">water to live electrical equipment</strong>{' '}
                    creates a conductive path that can electrocute the person holding the
                    extinguisher.
                  </p>
                  <p>
                    Pouring <strong className="text-white">water onto certain burning metals</strong>{' '}
                    (such as magnesium or lithium) causes an explosive reaction that releases
                    hydrogen gas and can intensify the fire dramatically.
                  </p>
                </div>
              </div>

              <p>
                Fire classification provides a standardised system that allows anyone &mdash; from
                trained fire marshals to members of the public &mdash; to quickly identify the type
                of fire they are dealing with and select the appropriate extinguishing agent. In
                the United Kingdom, fire classification follows the European standard{' '}
                <strong>BS EN 2:1992</strong>, which categorises fires based on the type of fuel
                that is burning.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">BS EN 2:1992:</strong> This European standard
                  defines fire classes based on the nature of the combustible material. It was
                  originally adopted in the UK in 1992 and amended in 2005 to add Class F for
                  cooking oils and fats. The standard replaced the older BS 4547 classification
                  which included a Class E for electrical fires. Under the current standard,
                  electrical fires are not given their own class because electricity is an ignition
                  source, not a fuel.
                </p>
              </div>

              <p>
                The classification system recognises six categories of fire. Each is identified by
                a letter (A through F, with no current Class E), and each has specific
                characteristics, associated fuels, hazards, and recommended extinguishing agents.
                Understanding these classes is fundamental to fire safety and is a core requirement
                for anyone acting as a fire marshal in the workplace.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">UK Fire Classes at a Glance</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Class A</strong> &mdash; Ordinary combustibles
                      (wood, paper, textiles)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Class B</strong> &mdash; Flammable liquids
                      (petrol, solvents, oils)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Class C</strong> &mdash; Flammable gases
                      (methane, propane, butane)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Class D</strong> &mdash; Combustible metals
                      (magnesium, lithium, sodium)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Electrical</strong> &mdash; Energised electrical
                      equipment (not a formal class)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Class F</strong> &mdash; Cooking oils and fats
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* Section 02 — Class A: Ordinary Combustibles                  */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">02</span>
            Class A: Ordinary Combustibles
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Class A fires are the most common type of fire and involve{' '}
                <strong>solid materials that leave an ash residue</strong> when they burn. The word
                &ldquo;ash&rdquo; is a useful memory aid &mdash; Class <strong>A</strong> for{' '}
                <strong>A</strong>sh. These are materials that undergo pyrolysis (thermal
                decomposition) and then combustion, producing heat, light, smoke, and char.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Typical Class A Fuels</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Wood and timber</strong> &mdash; structural
                      timbers, floorboards, joists, door frames, skirting boards, pallets, fencing
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Paper and cardboard</strong> &mdash; packaging
                      materials, documents, wallpaper, newspapers, cardboard boxes
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Textiles and fabrics</strong> &mdash; cotton,
                      wool, linen, curtains, carpets, upholstery, workwear, rags
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Rubber</strong> &mdash; tyres, seals, gaskets,
                      rubber matting, cable insulation compounds
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Certain plastics</strong> &mdash; thermosetting
                      plastics, PVC cable sheathing, conduit, trunking, consumer unit housings
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                Class A fires are extinguished primarily by <strong>cooling</strong>. Water is the
                most effective agent because it absorbs a large amount of heat energy as it
                evaporates, lowering the temperature of the burning material below its ignition
                point. Water extinguishers (red label), water mist extinguishers, and water-based
                foam extinguishers are all effective on Class A fires.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">For Electricians:</strong> Class A fuels are
                  everywhere on construction sites and in occupied buildings. Cable insulation
                  (PVC, XLPE, LSF), conduit, trunking, dado trunking, wooden battens, plasterboard
                  paper facing, packaging from electrical components, and even the dust that
                  accumulates in ceiling voids are all Class A materials. When carrying out
                  hot works (soldering, brazing) or working near materials that can be ignited by
                  electrical faults (such as overloaded cables overheating), awareness of
                  surrounding Class A fuels is essential.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Suitable Extinguishers for Class A</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Water (red label)</strong> &mdash; primary
                      choice, excellent cooling effect
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Foam (cream label)</strong> &mdash; effective,
                      also smothers surface fires
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Dry powder (blue label)</strong> &mdash;
                      effective but creates visibility issues and residue
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Water mist</strong> &mdash; fine droplets,
                      effective cooling with less water damage
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ============================================================ */}
        {/* Section 03 — Class B: Flammable Liquids                      */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">03</span>
            Class B: Flammable Liquids
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Class B fires involve <strong>flammable liquids and liquefiable solids</strong>.
                It is important to understand that it is not the liquid itself that burns &mdash;
                it is the <strong>vapour</strong> given off by the liquid that ignites. The rate at
                which a liquid produces flammable vapour depends on its temperature, surface area,
                and chemical properties.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Typical Class B Fuels</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Petroleum products</strong> &mdash; petrol,
                      diesel, kerosene, paraffin, lubricating oils, hydraulic fluids
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Solvents</strong> &mdash; white spirit,
                      acetone, toluene, xylene, methyl ethyl ketone (MEK), thinners
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Paints and adhesives</strong> &mdash;
                      solvent-based paints, varnishes, lacquers, contact adhesives, resins
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Alcohols</strong> &mdash; methanol, ethanol,
                      isopropanol (IPA), surgical spirit
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Liquefiable solids</strong> &mdash; wax,
                      grease, certain bituminous materials, some thermoplastics when molten
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Flash Point &amp; Auto-Ignition</p>
                <p className="text-sm text-white/80 mb-3">
                  Two critical temperatures determine how dangerous a flammable liquid is:
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-lg">
                    <p className="text-sm font-medium text-rose-400 mb-1">Flash Point</p>
                    <p className="text-xs text-white/80">
                      The lowest temperature at which a liquid produces enough vapour to form a
                      flammable mixture with air near its surface. At this temperature, the vapour
                      will ignite briefly if an external ignition source is applied. Petrol has a
                      flash point of approximately &minus;43&deg;C, meaning it produces flammable
                      vapour even in freezing conditions.
                    </p>
                  </div>
                  <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-lg">
                    <p className="text-sm font-medium text-amber-400 mb-1">Auto-Ignition Temperature</p>
                    <p className="text-xs text-white/80">
                      The minimum temperature at which a substance will spontaneously ignite
                      without any external spark or flame. This is always significantly higher
                      than the flash point. Petrol auto-ignites at approximately 280&deg;C. Diesel
                      auto-ignites at around 210&deg;C. These temperatures can be reached on hot
                      exhaust manifolds, overheated machinery, or during hot works.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                Class B liquids are sub-divided into two categories:{' '}
                <strong>miscible</strong> (those that mix with water, such as alcohols and
                acetone) and <strong>immiscible</strong> (those that do not mix with water, such
                as petrol, diesel, and oils). This distinction matters because it affects which
                foam types are effective &mdash; alcohol-resistant foams (AR-AFFF) must be used on
                miscible liquids to prevent the foam blanket from breaking down.
              </p>

              <p>
                Class B fires are extinguished primarily by <strong>smothering</strong> &mdash;
                cutting off the oxygen supply to the fire. Foam extinguishers form a blanket over
                the surface of the burning liquid, sealing in the vapour. CO2 displaces the oxygen
                in the immediate vicinity of the fire.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Critical Warning</p>
                </div>
                <p className="text-sm text-white/80">
                  <strong className="text-white">NEVER use a water jet on a burning liquid pool.</strong>{' '}
                  The force of the water jet can scatter burning liquid across a wide area,
                  rapidly spreading the fire. On immiscible liquids like petrol, the water sinks
                  beneath the burning fuel and can cause dangerous splashing. The only exception
                  is water mist or water spray extinguishers used on small Class B fires, where
                  the fine droplets cool and smother without disturbing the liquid surface.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Suitable Extinguishers for Class B</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Foam (cream label)</strong> &mdash; primary
                      choice, forms a sealing blanket over the liquid surface
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">CO2 (black label)</strong> &mdash; displaces
                      oxygen, leaves no residue, ideal for small contained fires
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Dry powder (blue label)</strong> &mdash;
                      effective but does not cool, risk of re-ignition
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* Section 04 — Class C: Flammable Gases                        */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">04</span>
            Class C: Flammable Gases
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Class C fires involve <strong>flammable gases</strong>. These fires present unique
                hazards because gases can spread rapidly, are often invisible, and can accumulate
                in enclosed or poorly ventilated spaces to create explosive atmospheres. The
                fundamental principle with gas fires is radically different from other classes:{' '}
                <strong>
                  do NOT extinguish a gas fire unless the gas supply can be isolated first.
                </strong>
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Typical Class C Fuels</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Natural gas (methane)</strong> &mdash; piped
                      gas supply to buildings, the most common Class C fuel in domestic and
                      commercial properties
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">LPG (propane and butane)</strong> &mdash;
                      portable cylinders used on construction sites for space heating, roofing
                      torches, and catering equipment
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Acetylene</strong> &mdash; used in
                      oxy-acetylene cutting and welding, extremely flammable and unstable under
                      pressure
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Hydrogen</strong> &mdash; used in some
                      industrial processes, also produced as a by-product when water contacts
                      burning alkali metals
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Critical: Why Not to Extinguish</p>
                </div>
                <div className="text-sm text-white/80 space-y-2">
                  <p>
                    If a gas fire is extinguished while the gas supply is still flowing, the gas
                    continues to escape into the surrounding area. Gas accumulates in enclosed
                    spaces, in ceiling voids, under floors, and in any low point (for heavier-
                    than-air gases like propane and butane) or high point (for lighter-than-air
                    gases like methane and hydrogen).
                  </p>
                  <p>
                    When the concentration of gas in air reaches the correct ratio &mdash; between
                    the <strong className="text-white">Lower Explosive Limit (LEL)</strong> and
                    the <strong className="text-white">Upper Explosive Limit (UEL)</strong> &mdash;
                    any ignition source can trigger a devastating explosion. The correct procedure
                    is always:{' '}
                    <strong className="text-red-300">
                      isolate the gas supply first, then let the fire burn out safely.
                    </strong>
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">LEL &amp; UEL Explained</p>
                <p className="text-sm text-white/80 mb-3">
                  Every flammable gas has a specific range of concentrations in air within which
                  it can ignite or explode:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Lower Explosive Limit (LEL)</strong> &mdash;
                      the minimum concentration of gas in air that will ignite. Below this, the
                      mixture is too lean (not enough fuel).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Upper Explosive Limit (UEL)</strong> &mdash;
                      the maximum concentration that will ignite. Above this, the mixture is too
                      rich (not enough oxygen).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Flammable range</strong> &mdash; the range
                      between LEL and UEL. Methane: 5&ndash;15%. Propane: 2.1&ndash;9.5%.
                      Acetylene: 2.5&ndash;81% (extremely wide and dangerous). Hydrogen:
                      4&ndash;75%.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">For Electricians:</strong> You regularly work
                  in properties with gas installations. Before drilling into walls or lifting
                  floorboards, always consider the location of gas pipes. A ruptured gas pipe
                  combined with an electrical spark from a drill, power tool, or even a light
                  switch creates the perfect conditions for a gas explosion. If you smell gas on
                  site, stop all work immediately, do not operate any electrical switches (on or
                  off), ventilate the area by opening doors and windows, evacuate, and call the
                  National Gas Emergency Service on 0800 111 999.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ============================================================ */}
        {/* Section 05 — Class D: Combustible Metals                     */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">05</span>
            Class D: Combustible Metals
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Class D fires involve <strong>combustible metals</strong> &mdash; metals that can
                ignite and sustain combustion. These fires are relatively rare in everyday
                situations but are encountered in specific industrial, manufacturing, and
                increasingly in electrical installation contexts (lithium batteries). When they do
                occur, they are among the most dangerous and difficult fires to control.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Typical Class D Fuels</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Magnesium</strong> &mdash; burns with an
                      intensely bright white flame at approximately 2,200&deg;C. Found in
                      automotive components, aerospace parts, and some power tools
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Aluminium</strong> &mdash; in powder or
                      swarf form, aluminium is highly combustible. Solid aluminium is harder to
                      ignite but will burn at high temperatures
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Titanium</strong> &mdash; used in specialist
                      engineering, burns fiercely once ignited, particularly in powder or swarf
                      form
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Alkali metals (sodium, potassium)</strong> &mdash;
                      highly reactive, react violently with water producing hydrogen gas and
                      intense heat
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Lithium</strong> &mdash; increasingly
                      common due to lithium-ion batteries in power tools, electric vehicles,
                      battery storage systems, UPS units, and solar PV installations
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                Combustible metal fires burn at <strong>extremely high temperatures</strong> &mdash;
                often exceeding 2,000&deg;C. At these temperatures, water decomposes into hydrogen
                and oxygen, both of which intensify the fire. Many burning metals also react
                exothermically with water, producing explosive hydrogen gas. This is why
                conventional extinguishers (water, foam, CO2, standard dry powder) are{' '}
                <strong>completely unsuitable and potentially catastrophic</strong> for Class D
                fires.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Specialist Class D Extinguishing Agents</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">M28 dry powder</strong> &mdash; a specialist
                      graphite-based powder designed for magnesium fires. Applied gently to
                      smother the fire without disturbing the burning metal
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">L2 dry powder</strong> &mdash; a
                      copper-based specialist powder effective on a range of combustible metals
                      including lithium
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Dry sand</strong> &mdash; can be used as an
                      emergency measure to smother small metal fires by gently covering the
                      burning material. Must be completely dry &mdash; any moisture will cause a
                      violent reaction
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Lithium Battery Fires</p>
                </div>
                <div className="text-sm text-white/80 space-y-2">
                  <p>
                    As an electrician, you are increasingly likely to encounter lithium-ion
                    batteries &mdash; in cordless power tools, battery storage systems (BESS),
                    uninterruptible power supplies (UPS), electric vehicle charging installations,
                    and solar PV battery systems. Lithium battery fires are particularly
                    hazardous for several reasons:
                  </p>
                  <ul className="space-y-1 ml-0">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                      <span>
                        <strong className="text-white">Thermal runaway</strong> &mdash; once a
                        cell overheats, it triggers a self-sustaining chain reaction that spreads
                        to adjacent cells, releasing its own oxygen
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                      <span>
                        <strong className="text-white">Toxic fumes</strong> &mdash; burning
                        lithium batteries release hydrogen fluoride, carbon monoxide, and other
                        highly toxic gases
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                      <span>
                        <strong className="text-white">Re-ignition</strong> &mdash; lithium
                        battery fires can appear extinguished then reignite hours or days later as
                        thermal runaway continues to propagate through the battery pack
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                      <span>
                        <strong className="text-white">Multi-class fire</strong> &mdash;
                        simultaneously a Class D metal fire (lithium) and a Class B fire
                        (flammable organic electrolyte solvent)
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* Section 06 — Electrical Fires (formerly Class E)             */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">06</span>
            Electrical Fires (Formerly Class E)
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Although electrical fires do not have a formal class under the current BS EN 2
                standard, they are treated as a distinct and critical category in practice.
                Electricity is not a fuel &mdash; it is an <strong>ignition source</strong>. When
                an electrical fault causes a fire, the actual fuel burning is usually the cable
                insulation (Class A), transformer oil (Class B), or whatever combustible material
                is nearby. However, the presence of live electricity adds the{' '}
                <strong>lethal hazard of electrocution</strong> to the fire scenario.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">For Electricians &mdash; This Is Your Area:</strong>{' '}
                  Electrical fires are the most directly relevant fire class for your profession.
                  You install, maintain, and repair the very systems that, when they malfunction,
                  cause electrical fires. Overloaded circuits, loose connections, deteriorated
                  insulation, water ingress into electrical enclosures, incorrect fuse ratings,
                  and poor workmanship are all causes of electrical fires that you have the power
                  to prevent through competent installation and thorough inspection and testing.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Common Causes of Electrical Fires</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Overloaded circuits</strong> &mdash; cables
                      carrying more current than their rating, causing overheating of insulation
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Loose connections</strong> &mdash; high
                      resistance at a loose terminal generates heat (I&sup2;R losses), which can
                      ignite surrounding insulation
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Damaged or deteriorated insulation</strong> &mdash;
                      age, UV exposure, rodent damage, or mechanical damage exposes conductors,
                      leading to short circuits and arcing
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Incorrect protective device ratings</strong> &mdash;
                      oversized fuses or MCBs that fail to disconnect a fault before dangerous
                      temperatures are reached
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Arcing faults</strong> &mdash; electrical
                      arcs across damaged conductors or at connection points, generating extreme
                      localised heat (arc flash temperatures can exceed 19,000&deg;C)
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Procedure for Electrical Fires</p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-rose-400">
                      1
                    </span>
                    <span className="text-sm text-white/80">
                      <strong className="text-white">Raise the alarm</strong> &mdash; activate the
                      nearest fire alarm call point and alert others in the area
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-rose-400">
                      2
                    </span>
                    <span className="text-sm text-white/80">
                      <strong className="text-white">De-energise if safe</strong> &mdash; isolate
                      the electrical supply at the distribution board, consumer unit, or
                      emergency stop. Do NOT touch the equipment directly
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-rose-400">
                      3
                    </span>
                    <span className="text-sm text-white/80">
                      <strong className="text-white">If de-energised</strong> &mdash; treat the
                      fire according to its underlying fuel class (usually Class A for cable
                      insulation or Class B for transformer oil)
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-rose-400">
                      4
                    </span>
                    <span className="text-sm text-white/80">
                      <strong className="text-white">If still energised</strong> &mdash; use only{' '}
                      <strong>CO2 (black label)</strong> or{' '}
                      <strong>dry powder (blue label)</strong> extinguishers. These agents are
                      non-conductive and safe to use on live equipment
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-rose-400">
                      5
                    </span>
                    <span className="text-sm text-white/80">
                      <strong className="text-white">NEVER use water or foam</strong> on live
                      electrical equipment &mdash; water conducts electricity and creates a direct
                      electrocution risk to the person holding the extinguisher
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">High Voltage Fires</p>
                </div>
                <p className="text-sm text-white/80">
                  For fires involving high voltage equipment (above 1,000 V AC or 1,500 V DC),
                  do not attempt to fight the fire yourself. Evacuate the area, maintain a safe
                  distance of at least 25 metres, call 999, and contact the electricity network
                  operator. High voltage arcing can jump across gaps and the electrocution risk
                  extends well beyond the immediate equipment. Only the fire service with
                  specialist training and equipment should tackle high voltage fires.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ============================================================ */}
        {/* Section 07 — Class F: Cooking Oils & Fats                    */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">07</span>
            Class F: Cooking Oils &amp; Fats
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Class F was added to BS EN 2 in 2005 to cover fires involving{' '}
                <strong>cooking oils and fats</strong>. Previously grouped with Class B flammable
                liquids, cooking oil fires were given their own classification because they behave
                very differently from other liquid fires and require a specialist extinguishing
                agent. Cooking oil fires are the most common cause of fatal fires in domestic
                kitchens in the United Kingdom.
              </p>

              <p>
                Cooking oils and fats have very high <strong>auto-ignition temperatures</strong>,
                typically around 340&deg;C for vegetable oils and up to 370&deg;C for some animal
                fats. When oil reaches this temperature, it will spontaneously ignite without any
                external spark or flame. Deep fat fryers, chip pans, commercial fryers, and woks
                can all reach these temperatures if left unattended, if the thermostat fails, or
                if the oil level is too low.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    NEVER Use Water on a Class F Fire
                  </p>
                </div>
                <div className="text-sm text-white/80 space-y-2">
                  <p>
                    This is one of the most critical safety messages in fire training. When water
                    comes into contact with burning cooking oil at temperatures exceeding 300&deg;C,
                    the water <strong className="text-white">instantly vaporises into steam</strong>.
                    Water expands approximately{' '}
                    <strong className="text-white">1,700 times in volume</strong> when it converts
                    from liquid to steam. This violent expansion throws the burning oil upward and
                    outward in a catastrophic fireball &mdash; this is called a{' '}
                    <strong className="text-red-300">boilover</strong>.
                  </p>
                  <p>
                    A single cup of water thrown onto a burning chip pan can produce a fireball
                    that reaches the ceiling and spreads across the entire kitchen in under one
                    second. This is the cause of numerous deaths and severe burn injuries every
                    year in the UK.
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Wet Chemical Extinguisher &amp; Saponification
                </p>
                <p className="text-sm text-white/80 mb-3">
                  The wet chemical extinguisher (yellow label) was developed specifically for
                  Class F fires. It works through a chemical process called{' '}
                  <strong className="text-white">saponification</strong>:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      The extinguisher contains a solution of <strong className="text-white">
                      potassium acetate</strong> (or potassium citrate or potassium carbonate)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      It is discharged as a <strong className="text-white">fine mist</strong>,
                      not a jet &mdash; this is critical to avoid disturbing the burning oil
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      The potassium salt reacts with the fatty acids in the oil to form a{' '}
                      <strong className="text-white">thick, soap-like layer</strong> on the
                      surface (saponification literally means &ldquo;soap making&rdquo;)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      This seal <strong className="text-white">cuts off the oxygen supply</strong>{' '}
                      and prevents the release of flammable vapour from the oil surface
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      The fine mist also <strong className="text-white">gently cools</strong> the
                      oil below its auto-ignition temperature without causing a boilover
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Emergency Actions for a Chip Pan Fire:</strong>{' '}
                  If a wet chemical extinguisher is not available: turn off the heat source if safe
                  to do so, NEVER move the pan, NEVER throw water on it, and if you have a damp
                  (not wet) tea towel or fire blanket, you can carefully place it over the pan to
                  smother the fire. Call 999 immediately. Leave the towel or blanket in place and
                  do not remove it — the oil beneath may still be above its auto-ignition
                  temperature and could reignite.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* Section 08 — Summary Comparison & Selection Guide            */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">08</span>
            Summary Comparison &amp; Selection Guide
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The following chart summarises all fire classes, their associated fuels, and the
                appropriate extinguishing agents. Understanding this at a glance is essential for
                any fire marshal &mdash; in an emergency, you will not have time to look it up.
              </p>

              {/* Fire Classification Chart — Styled Div Diagram */}
              <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                <div className="px-4 py-3 bg-rose-500/10 border-b border-white/10">
                  <p className="text-sm font-semibold text-rose-400 text-center">
                    Fire Classification Chart &mdash; BS EN 2
                  </p>
                </div>

                <div className="divide-y divide-white/5">
                  {/* Class A */}
                  <div className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-10 h-10 rounded-lg bg-green-500/20 border border-green-500/40 flex items-center justify-center text-lg font-bold text-green-400">
                        A
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-white">Ordinary Combustibles</p>
                        <p className="text-xs text-white/60">Wood, paper, textiles, rubber, plastics</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-300">
                        Water
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300">
                        Foam
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300">
                        Dry Powder
                      </span>
                    </div>
                  </div>

                  {/* Class B */}
                  <div className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-10 h-10 rounded-lg bg-red-500/20 border border-red-500/40 flex items-center justify-center text-lg font-bold text-red-400">
                        B
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-white">Flammable Liquids</p>
                        <p className="text-xs text-white/60">Petrol, diesel, solvents, paints, oils</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300">
                        Foam
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-500/20 border border-gray-500/30 text-gray-300">
                        CO2
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300">
                        Dry Powder
                      </span>
                    </div>
                  </div>

                  {/* Class C */}
                  <div className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-10 h-10 rounded-lg bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-lg font-bold text-blue-400">
                        C
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-white">Flammable Gases</p>
                        <p className="text-xs text-white/60">Methane, propane, butane, acetylene</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300">
                        Dry Powder
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300">
                        Isolate supply first!
                      </span>
                    </div>
                  </div>

                  {/* Class D */}
                  <div className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-10 h-10 rounded-lg bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center text-lg font-bold text-yellow-400">
                        D
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-white">Combustible Metals</p>
                        <p className="text-xs text-white/60">Magnesium, lithium, sodium, aluminium</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300">
                        Specialist Dry Powder (M28/L2)
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300">
                        NO water!
                      </span>
                    </div>
                  </div>

                  {/* Electrical */}
                  <div className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-10 h-10 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center flex-shrink-0">
                        <Zap className="h-5 w-5 text-cyan-400" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-white">Electrical Fires</p>
                        <p className="text-xs text-white/60">Energised equipment &mdash; de-energise first</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-500/20 border border-gray-500/30 text-gray-300">
                        CO2
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300">
                        Dry Powder
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300">
                        NEVER water or foam on live!
                      </span>
                    </div>
                  </div>

                  {/* Class F */}
                  <div className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-10 h-10 rounded-lg bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-lg font-bold text-orange-400">
                        F
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-white">Cooking Oils &amp; Fats</p>
                        <p className="text-xs text-white/60">Deep fat fryers, chip pans, cooking oils</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/30 text-yellow-300">
                        Wet Chemical
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300">
                        NEVER water &mdash; boilover risk!
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Remember:</strong> Extinguisher label colours
                  in the UK follow a standard system &mdash;{' '}
                  <strong>Red</strong> (water),{' '}
                  <strong>Cream</strong> (foam),{' '}
                  <strong>Black</strong> (CO2),{' '}
                  <strong>Blue</strong> (dry powder),{' '}
                  <strong>Yellow</strong> (wet chemical). All extinguishers have a red body with
                  a coloured band or label panel indicating the type. Being able to identify the
                  correct extinguisher instantly by its colour band is a fundamental fire marshal
                  skill.
                </p>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Key &ldquo;Never Do&rdquo; Rules</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                    <span>
                      <strong className="text-white">NEVER</strong> use water on burning cooking
                      oil (Class F) &mdash; violent steam explosion / boilover
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                    <span>
                      <strong className="text-white">NEVER</strong> use water on live electrical
                      equipment &mdash; electrocution risk
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                    <span>
                      <strong className="text-white">NEVER</strong> use water on burning metals
                      (Class D) &mdash; explosive hydrogen release
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                    <span>
                      <strong className="text-white">NEVER</strong> use a water jet on a burning
                      liquid pool (Class B) &mdash; spreads the fire
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                    <span>
                      <strong className="text-white">NEVER</strong> extinguish a gas fire
                      (Class C) unless the gas supply has been isolated &mdash; explosion risk
                    </span>
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
        <Quiz title="Section 2 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../fire-safety-module-1-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              The Fire Triangle
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../fire-safety-module-1-section-3">
              Next: Fire Behaviour &amp; Development
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
