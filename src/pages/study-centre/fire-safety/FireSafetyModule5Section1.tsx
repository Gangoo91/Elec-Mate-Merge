import { ArrowLeft, ArrowRight, FlameKindling, Droplets, Wind, Snowflake, Beaker, CookingPot, ShieldAlert, CheckCircle, AlertTriangle, BookOpen, Ban, Wrench, Target, Gauge } from "lucide-react";
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
    id: "cooking-oil-extinguisher",
    question: "Which type of fire extinguisher is specifically designed for cooking oil and deep fat fryer fires (Class F)?",
    options: [
      "CO\u2082 extinguisher (black label)",
      "Foam extinguisher (cream label)",
      "Wet chemical extinguisher (yellow label)",
      "Dry powder extinguisher (blue label)"
    ],
    correctIndex: 2,
    explanation:
      "The wet chemical extinguisher (yellow label) is the only type specifically designed for Class F fires involving cooking oils and fats. It works through a process called saponification, where the wet chemical agent reacts with the burning oil to form a non-combustible soap-like substance on the surface. This simultaneously cools the oil below its auto-ignition temperature and creates a seal that prevents re-ignition. No other extinguisher type should be used on deep fat fryer fires \u2014 water and foam will cause a violent eruption of burning oil, CO\u2082 can splash the oil, and dry powder does not cool sufficiently to prevent re-ignition."
  },
  {
    id: "powder-not-indoors",
    question: "Why are dry powder extinguishers NOT recommended for use in enclosed indoor spaces?",
    options: [
      "They are too expensive for indoor use",
      "They cause severe visibility reduction and an inhalation hazard",
      "They leave a coloured residue on walls",
      "They are only effective on outdoor fires"
    ],
    correctIndex: 1,
    explanation:
      "Dry powder extinguishers discharge a dense cloud of fine powder that causes severe visibility reduction \u2014 occupants may be unable to see exits or escape routes, significantly increasing the risk of disorientation and panic. Additionally, the fine powder particles create a serious inhalation hazard, particularly in confined or poorly ventilated spaces. Inhaling the powder can cause respiratory distress, especially for individuals with asthma or other respiratory conditions. For these reasons, current UK fire safety guidance strongly recommends against the use of dry powder extinguishers in buildings, offices, and enclosed spaces. They remain suitable for outdoor environments such as forecourts, construction sites, and vehicle fires."
  },
  {
    id: "max-travel-distance-extinguisher",
    question: "What is the maximum travel distance to the nearest fire extinguisher in a workplace?",
    options: [
      "10 metres",
      "20 metres",
      "30 metres",
      "50 metres"
    ],
    correctIndex: 2,
    explanation:
      "The maximum travel distance to the nearest fire extinguisher is 30 metres. This requirement comes from BS 5306-8 (Selection, installation and maintenance of portable fire extinguishers) and is referenced in fire safety guidance documents. The 30-metre distance ensures that any person in the building can quickly access an extinguisher without significant delay. Extinguishers should be positioned on escape routes, near exits, near specific hazards, and at consistent locations on each floor. They must be visible, accessible, and mounted at an appropriate height \u2014 the handle should be approximately 1 metre from the floor for larger extinguishers and up to 1.5 metres for smaller units."
  }
];

/* ------------------------------------------------------------------ */
/*  FAQs (4)                                                          */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: "Can a CO\u2082 extinguisher be used on Class A fires (wood, paper, textiles)?",
    answer:
      "CO\u2082 extinguishers are not recommended for Class A fires and are not rated for this class. While the initial blast of CO\u2082 may temporarily suppress flames on a Class A fire, it provides no cooling effect whatsoever. Class A materials burn as deep-seated fires where embers continue to smoulder beneath the surface. Once the CO\u2082 gas dissipates \u2014 which happens very quickly, especially in ventilated areas \u2014 oxygen returns and the fire re-ignites from these smouldering embers. For Class A fires, water extinguishers (which provide excellent cooling) or foam extinguishers (which provide both cooling and smothering) are the correct choice. CO\u2082 extinguishers should be reserved for Class B (flammable liquid) fires and fires involving live electrical equipment, where their key advantages \u2014 no residue and non-conductivity \u2014 are most valuable."
  },
  {
    question: "When should you attempt to fight a fire with an extinguisher, and when should you simply evacuate?",
    answer:
      "The decision to fight a fire or evacuate is critical, and the default position should always be to evacuate. You should only attempt to use an extinguisher if ALL of the following conditions are met: the fire is small and in its very early stages (no larger than a wastepaper bin); you have been trained in the use of fire extinguishers; you have the correct type of extinguisher for the fire; you have a clear escape route behind you at all times; the fire alarm has already been raised; and you are confident you can extinguish the fire safely. You should NEVER attempt to fight a fire if: the fire is spreading rapidly or has reached the ceiling; there is heavy smoke reducing visibility; you are unsure what is burning; you do not have the correct extinguisher; your escape route could be compromised; or you have any doubt about your ability to control the fire. Remember, fire extinguishers are designed for first-aid firefighting only \u2014 they contain a limited quantity of agent (typically 20\u201360 seconds of discharge time) and are intended to deal with fires in their incipient stage. If the fire cannot be controlled quickly, evacuate immediately and leave firefighting to the fire and rescue service."
  },
  {
    question: "Do foam extinguishers work on electrical fires?",
    answer:
      "Standard foam extinguishers should NOT be used on live electrical equipment. Foam is a water-based agent and conducts electricity, posing a serious risk of electrocution to the user. However, some modern foam extinguishers have been di-electrically tested to 35kV and carry a specific marking indicating they have passed this test. These di-electrically tested foam extinguishers can be used on electrical equipment up to 1000V at a minimum distance of 1 metre. It is essential to check the label and markings on the specific extinguisher \u2014 if there is no di-electric test marking, assume it is NOT safe for electrical fires. Even with di-electrically tested foam extinguishers, the recommended first choice for electrical fires remains the CO\u2082 extinguisher, which leaves no residue and poses no conductivity risk. If electrical equipment is de-energised (isolated from the supply), the fire can be treated as whatever class the burning material falls into, and any appropriate extinguisher can be used."
  },
  {
    question: "How often do fire extinguishers need to be serviced, and by whom?",
    answer:
      "Fire extinguisher maintenance follows a three-tier system under BS 5306-3. First, monthly visual inspections should be carried out by a responsible person within the premises (this does not need to be a specialist). These checks confirm the extinguisher is in its designated location, the pressure gauge (if fitted) is in the green zone, the safety pin and tamper seal are intact, there is no visible damage or corrosion, and the operating instructions are legible. Second, an annual service must be carried out by a competent service engineer \u2014 this is a thorough technical inspection that includes checking the weight, condition, and pressure of the extinguisher, as well as testing the discharge mechanism. Third, an extended service is required at specific intervals depending on the type: water, foam, and wet chemical extinguishers require an extended service every 5 years (which includes a discharge test and refill); CO\u2082 extinguishers require a hydraulic pressure test every 10 years; and dry powder extinguishers require an extended service every 5 years with a full discharge and refill every 10 years. All maintenance must be recorded, and records should be retained. Under the RRFSO, the Responsible Person has a legal duty to ensure that firefighting equipment is maintained in an efficient state, in efficient working order, and in good repair (Article 17)."
  }
];

/* ------------------------------------------------------------------ */
/*  End-of-Section Quiz (8 questions)                                 */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      "Under the BS EN 3 colour coding system, what colour band identifies a foam extinguisher?",
    options: [
      "Red",
      "Black",
      "Cream",
      "Blue"
    ],
    correctAnswer: 2,
    explanation:
      "Foam extinguishers are identified by a cream colour band on a red body. Under BS EN 3, all portable fire extinguishers in the UK have a red body with a colour band indicating the type: red for water, cream for foam, black for CO\u2082, blue for dry powder, and yellow for wet chemical. This standardised colour coding system ensures that users can quickly identify the correct extinguisher type in an emergency."
  },
  {
    id: 2,
    question:
      "What do the letters in the PASS technique stand for?",
    options: [
      "Point, Activate, Spray, Sweep",
      "Pull, Aim, Squeeze, Sweep",
      "Press, Aim, Squeeze, Spray",
      "Pull, Activate, Spray, Sweep"
    ],
    correctAnswer: 1,
    explanation:
      "PASS stands for Pull (the safety pin), Aim (at the base of the fire, not the flames), Squeeze (the operating handle), and Sweep (from side to side across the base of the fire). This is the universal operation method for portable fire extinguishers. Aiming at the base of the fire is critical because that is where the fuel source is \u2014 aiming at the flames themselves is ineffective as the agent passes through the flames without addressing the burning material."
  },
  {
    id: 3,
    question:
      "Which extinguisher type is the ONLY one specifically designed for Class F fires (cooking oils and fats)?",
    options: [
      "Foam (cream label)",
      "CO\u2082 (black label)",
      "Dry powder (blue label)",
      "Wet chemical (yellow label)"
    ],
    correctAnswer: 3,
    explanation:
      "The wet chemical extinguisher (yellow label) is the only type specifically designed for Class F fires involving cooking oils and fats. It works through saponification \u2014 the chemical agent reacts with the burning oil to create a non-combustible soap-like film on the surface, while simultaneously cooling the oil below its auto-ignition temperature. Other extinguisher types are dangerous on cooking oil fires: water causes violent eruption, CO\u2082 can splash the oil, and powder does not cool sufficiently."
  },
  {
    id: 4,
    question:
      "What is a significant limitation of CO\u2082 extinguishers that creates a risk of re-ignition?",
    options: [
      "They leave a residue that can re-ignite",
      "They have no cooling effect, so the fire can restart when oxygen returns",
      "They react with certain metals to produce heat",
      "They are too small to fully extinguish most fires"
    ],
    correctAnswer: 1,
    explanation:
      "CO\u2082 extinguishers work by displacing oxygen around the fire, but they provide virtually no cooling effect. This means the hot material or liquid remains at or above its ignition temperature. Once the CO\u2082 gas dissipates and oxygen returns to the area \u2014 which can happen very quickly, especially outdoors or in ventilated spaces \u2014 the fire can re-ignite. This is why CO\u2082 extinguishers are rated for Class B (flammable liquids) and electrical fires, but not for Class A (solid combustibles) where deep-seated smouldering can persist."
  },
  {
    id: 5,
    question:
      "Why are dry powder extinguishers considered hazardous in enclosed spaces?",
    options: [
      "The powder is flammable and can cause a secondary fire",
      "The discharge creates a dense cloud causing severe visibility reduction and inhalation risk",
      "The powder reacts with water to produce toxic fumes",
      "The powder is corrosive to skin and eyes on contact"
    ],
    correctAnswer: 1,
    explanation:
      "Dry powder extinguishers discharge a dense cloud of fine particles that causes severe visibility reduction \u2014 occupants may be unable to see exits, escape routes, or even the fire itself. Additionally, the fine powder creates a serious inhalation hazard, particularly for people with respiratory conditions. In enclosed spaces, this combination of zero visibility and breathing difficulty can be more dangerous than the fire itself. For this reason, UK fire safety guidance recommends against using powder extinguishers indoors. They remain appropriate for outdoor use, vehicle fires, and industrial settings with good ventilation."
  },
  {
    id: 6,
    question:
      "How does a foam extinguisher work on a flammable liquid (Class B) fire?",
    options: [
      "It chemically neutralises the liquid fuel",
      "It cools the liquid below its flash point through rapid evaporation",
      "It forms a film over the liquid surface, smothering the fire and sealing in vapours",
      "It absorbs the flammable vapours from the air above the liquid"
    ],
    correctAnswer: 2,
    explanation:
      "Foam extinguishers, particularly AFFF (aqueous film-forming foam) types, work on Class B fires by forming a thin film over the surface of the burning liquid. This film smothers the fire by cutting off the oxygen supply and seals in the flammable vapours, preventing them from escaping to feed the flames. The foam also has a cooling effect on the fuel surface. When applying foam to a liquid fire, it should be directed at a nearby surface so it flows gently across the liquid \u2014 never aimed directly into the liquid, as this can splash burning fuel."
  },
  {
    id: 7,
    question:
      "Which types of fire must a water extinguisher (red label) NEVER be used on?",
    options: [
      "Class A (wood, paper, textiles) fires only",
      "Class B (flammable liquids), electrical, Class F (cooking oils), and Class D (metals) fires",
      "Class C (flammable gases) fires only",
      "Only fires involving live electrical equipment"
    ],
    correctAnswer: 1,
    explanation:
      "Water extinguishers must NEVER be used on Class B (flammable liquid) fires \u2014 water is denser than most flammable liquids, sinks beneath the surface, and boils violently, causing the burning liquid to erupt and spread. They must NEVER be used on live electrical equipment \u2014 water conducts electricity, creating an electrocution risk. They must NEVER be used on Class F (cooking oil) fires \u2014 the extreme temperatures (over 300\u00b0C) cause water to flash to steam instantaneously, creating a fireball of burning oil. They must NEVER be used on Class D (metal) fires \u2014 metals such as magnesium react violently with water. Water extinguishers are suitable only for Class A fires (ordinary combustibles: wood, paper, textiles, plastics)."
  },
  {
    id: 8,
    question:
      "How often must portable fire extinguishers receive a full annual service by a competent engineer?",
    options: [
      "Every 6 months",
      "Every 12 months (annually)",
      "Every 2 years",
      "Every 5 years"
    ],
    correctAnswer: 1,
    explanation:
      "Under BS 5306-3, all portable fire extinguishers must receive a full annual service (every 12 months) by a competent service engineer. This is in addition to the monthly visual inspections carried out by the premises\u2019 responsible person. The annual service is a thorough technical inspection that checks the weight, pressure, condition, and functionality of the extinguisher. Beyond the annual service, extended services are required at specific intervals: every 5 years for water, foam, and wet chemical types (discharge test and refill), and every 10 years for CO\u2082 (hydraulic pressure test) and powder (full discharge and refill)."
  }
];

/* ================================================================== */
/*  COMPONENT                                                         */
/* ================================================================== */
export default function FireSafetyModule5Section1() {
  useSEO({
    title: "Fire Extinguisher Types | Fire Safety Module 5.1",
    description:
      "Comprehensive guide to fire extinguisher types in the UK: water, foam, CO\u2082, dry powder, and wet chemical. Covers BS EN 3 colour coding, suitable fire classes, the PASS technique, maintenance requirements, and placement guidance for fire safety and fire marshal certification.",
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
            <FlameKindling className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 5 &middot; SECTION 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Fire Extinguisher Types
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Understanding the five main types of portable fire extinguisher, their colour codes, suitable fire classes, limitations, and the universal PASS operating technique &mdash; essential knowledge for every fire marshal
          </p>
        </header>

        {/* ============================================================ */}
        {/*  QUICK SUMMARY BOXES                                          */}
        {/* ============================================================ */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Five types:</strong> Water, Foam, CO&#8322;, Powder, Wet Chemical</li>
              <li><strong>BS EN 3</strong> colour coding &mdash; red body with colour band</li>
              <li><strong>PASS technique:</strong> Pull, Aim, Squeeze, Sweep</li>
              <li><strong>30m maximum</strong> travel distance to nearest extinguisher</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Key Standards</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>BS EN 3:</strong> Portable fire extinguishers (colour coding)</li>
              <li><strong>BS 5306-8:</strong> Selection, installation &amp; maintenance</li>
              <li><strong>BS 5306-3:</strong> Commissioning &amp; maintenance</li>
              <li><strong>RRFSO Art. 13:</strong> Duty to provide firefighting equipment</li>
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
              "Identify the five main types of portable fire extinguisher by their colour band",
              "State which fire classes each extinguisher type is suitable and unsuitable for",
              "Explain the operating principle and limitations of each extinguisher type",
              "Demonstrate understanding of the PASS technique for extinguisher operation",
              "Describe the maintenance and inspection regime under BS 5306-3",
              "Explain the placement requirements including the 30-metre travel distance rule"
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
        {/*  SECTION 01: Introduction to Fire Extinguishers               */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 text-sm font-bold border border-rose-500/20">01</span>
              Introduction to Fire Extinguishers
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Portable fire extinguishers are the first line of defence for <strong>first-aid firefighting</strong> &mdash; tackling a fire in its earliest stages before the fire and rescue service arrives. Under <strong>Article 13 of the Regulatory Reform (Fire Safety) Order 2005</strong> (RRFSO), the Responsible Person has a legal duty to ensure that the premises are equipped with appropriate firefighting equipment, including portable fire extinguishers, and that this equipment is placed to be readily accessible.
              </p>

              <p>
                In the UK, portable fire extinguishers conform to <strong>BS EN 3</strong>, which specifies the colour coding system. Since 1997, all portable fire extinguishers must have a <strong>red body</strong> with a <strong>colour band</strong> (covering at least 5% of the body area) that identifies the extinguisher type. Prior to this, extinguishers were colour-coded across the entire body &mdash; you may still encounter these older models in some premises, but they should be replaced at their next service date.
              </p>

              <p>
                Fire extinguishers come in two main forms:
              </p>

              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Portable extinguishers</strong> &mdash; hand-held units designed to be carried to the fire and operated by one person. These are the most common type and range from 1kg to 9kg (or 1L to 9L for liquid agents)</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Wheeled extinguishers</strong> &mdash; larger units (typically 25kg, 45kg, or 50L) mounted on a trolley for transport to the fire. These are used in high-risk environments such as industrial sites, fuel storage areas, and aircraft hangars where larger quantities of extinguishing agent may be needed</span>
                </li>
              </ul>

              <p>
                The placement and siting of fire extinguishers is governed by <strong>BS 5306-8</strong> and reinforced by fire safety guidance documents. Key placement requirements include:
              </p>

              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Visible and accessible</strong> &mdash; extinguishers must be clearly visible or indicated by signage, and must not be obstructed by furniture, stock, or equipment</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>On escape routes</strong> &mdash; preferably near exits and at the same location on each floor for consistency</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Near specific hazards</strong> &mdash; additional extinguishers of the appropriate type should be placed near identified fire hazards (e.g., a wet chemical extinguisher near a commercial kitchen)</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Maximum 30-metre travel distance</strong> &mdash; no person should have to travel more than 30 metres to reach the nearest fire extinguisher. This is the single most important placement rule and is derived from BS 5306-8</span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">RRFSO Article 13:</strong> The Responsible Person must ensure that the premises are equipped with appropriate fire-fighting equipment and with fire detectors and alarms. Any non-automatic fire-fighting equipment must be easily accessible, simple to use, and indicated by signs. The equipment must be appropriate to the risks identified in the fire risk assessment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 02: Water Extinguishers (Red Label)                  */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 text-sm font-bold border border-rose-500/20">02</span>
              Water Extinguishers (Red Label)
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Water extinguishers are identified by an <strong>all-red body</strong> (or a red colour band on newer models, though in practice most water extinguishers remain fully red as the band colour is the same as the body). They are one of the oldest and most straightforward types of fire extinguisher, working on the simple principle of <strong>cooling</strong>.
              </p>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <Droplets className="h-6 w-6 text-green-400 mb-2" />
                  <p className="text-sm font-semibold text-green-400 mb-1">Suitable For</p>
                  <p className="text-xs text-white/70"><strong>Class A only</strong> &mdash; fires involving ordinary solid combustibles such as wood, paper, textiles, cardboard, and plastics</p>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                  <Ban className="h-6 w-6 text-red-400 mb-2" />
                  <p className="text-sm font-semibold text-red-400 mb-1">NEVER Use On</p>
                  <p className="text-xs text-white/70"><strong>Electrical, Class B</strong> (flammable liquids), <strong>Class F</strong> (cooking oils), <strong>Class D</strong> (metals) &mdash; extremely dangerous</p>
                </div>
              </div>

              <p>
                Water extinguishers work by <strong>absorbing heat</strong> from the burning material, reducing its temperature below the ignition point. Water has an exceptionally high specific heat capacity (4,200 J/kg&middot;K) and latent heat of vaporisation (2,260 kJ/kg), making it an extremely effective cooling agent for solid materials.
              </p>

              <p>
                There are two main discharge types:
              </p>

              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Jet water extinguishers</strong> &mdash; discharge a solid stream of water that can be directed precisely at the seat of the fire. They have a longer throw distance but cover a smaller area</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Spray water extinguishers</strong> &mdash; discharge water as a fine spray, covering a larger area and improving cooling efficiency. The spray pattern also reduces the risk of spreading burning liquids if accidentally used near a liquid fire</span>
                </li>
              </ul>

              <p>
                <strong>Additive water extinguishers</strong> contain a surfactant additive that reduces the surface tension of the water, allowing it to penetrate burning materials more effectively. This enhances performance and can allow a smaller extinguisher (e.g., 3L with additive) to achieve the same fire rating as a larger standard water extinguisher (e.g., 6L without additive). Some additive water extinguishers may also have limited effectiveness on Class B fires, though this is not their primary purpose.
              </p>

              <p>
                Standard water extinguishers are available in <strong>6L and 9L</strong> sizes. Freeze protection may be needed for unheated environments &mdash; antifreeze additive versions are available for locations where temperatures may drop below 0&deg;C.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-red-400">Critical Warning:</strong> NEVER use water on electrical fires (risk of electrocution), flammable liquid fires (water sinks below the liquid and boils violently, causing the burning liquid to erupt), cooking oil fires (water causes an explosive steam eruption throwing burning oil into the air), or metal fires (many metals react violently with water, producing hydrogen gas which can explode).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Inline Check after Section 02 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ============================================================ */}
        {/*  SECTION 03: Foam Extinguishers (Cream Label)                 */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 text-sm font-bold border border-rose-500/20">03</span>
              Foam Extinguishers (Cream Label)
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Foam extinguishers are identified by a <strong>cream colour band</strong> on a red body. They are one of the most versatile extinguisher types, suitable for both <strong>Class A</strong> (solid combustibles) and <strong>Class B</strong> (flammable liquids) fires. Their dual capability makes them an excellent general-purpose choice for offices, workshops, and commercial premises.
              </p>

              <p>
                The most common type is the <strong>AFFF (Aqueous Film-Forming Foam)</strong> extinguisher. AFFF works through a combination of <strong>smothering and cooling</strong>:
              </p>

              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>On Class A fires</strong> &mdash; the water content cools the burning material below its ignition temperature, while the foam blanket prevents re-ignition by excluding oxygen</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>On Class B fires</strong> &mdash; the foam forms a thin aqueous film across the surface of the burning liquid, smothering the fire by cutting off the oxygen supply and sealing in flammable vapours. This film-forming action is what makes AFFF so effective on liquid fires</span>
                </li>
              </ul>

              <p>
                <strong>Spray foam extinguishers</strong> deliver the foam in a spray pattern rather than a jet, providing better coverage and reducing the risk of splashing burning liquids. When using foam on a liquid fire, the foam should be directed at a nearby vertical surface or the inside edge of the container so that it flows gently across the liquid surface &mdash; <strong>never aim directly into the liquid</strong>, as this can splash burning fuel.
              </p>

              <p>
                Foam extinguishers are available in <strong>6L and 9L</strong> sizes. Key limitations to remember:
              </p>

              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Not for electrical fires</strong> (unless di-electrically tested to 35kV &mdash; check the label). Standard foam contains water and conducts electricity, posing an electrocution risk</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Not for cooking oil fires (Class F)</strong> &mdash; the water content in foam can cause a violent eruption when it contacts oil at extremely high temperatures</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Not for metal fires (Class D)</strong> &mdash; foam is water-based and many metals react dangerously with water</span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Key Point:</strong> Foam extinguishers are often considered the best &ldquo;general purpose&rdquo; extinguisher for premises with mixed fire risks. Their ability to handle both Class A and Class B fires means they can address the majority of fire scenarios encountered in typical workplaces. Many fire risk assessors recommend foam as the primary extinguisher type, supplemented by specialist types (CO&#8322; for electrical areas, wet chemical for kitchens) where needed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 04: CO2 Extinguishers (Black Label)                  */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 text-sm font-bold border border-rose-500/20">04</span>
              CO&#8322; Extinguishers (Black Label)
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Carbon dioxide (CO&#8322;) extinguishers are identified by a <strong>black colour band</strong> on a red body. They have a distinctive appearance with a <strong>flared horn</strong> instead of a hose nozzle. CO&#8322; extinguishers are suitable for <strong>Class B</strong> (flammable liquid) fires and fires involving <strong>live electrical equipment</strong>.
              </p>

              <p>
                CO&#8322; works by <strong>displacing oxygen</strong> around the fire. The extinguisher contains liquid carbon dioxide under high pressure (approximately 55 bar at 20&deg;C). When discharged, the liquid CO&#8322; expands rapidly into a gas, displacing the oxygen in the immediate vicinity of the fire and suffocating the flames. Because CO&#8322; is a gas, it leaves <strong>absolutely no residue</strong>, making it the preferred choice for fires involving sensitive electrical and electronic equipment such as server rooms, control panels, and laboratory instruments.
              </p>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <CheckCircle className="h-6 w-6 text-green-400 mb-2" />
                  <p className="text-sm font-semibold text-green-400 mb-1">Advantages</p>
                  <ul className="text-xs text-white/70 space-y-1">
                    <li>&bull; Safe on live electrical equipment</li>
                    <li>&bull; No residue &mdash; no damage to equipment</li>
                    <li>&bull; Non-conductive discharge</li>
                    <li>&bull; Effective on flammable liquid fires</li>
                  </ul>
                </div>
                <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                  <AlertTriangle className="h-6 w-6 text-orange-400 mb-2" />
                  <p className="text-sm font-semibold text-orange-400 mb-1">Limitations</p>
                  <ul className="text-xs text-white/70 space-y-1">
                    <li>&bull; No cooling effect &mdash; re-ignition risk</li>
                    <li>&bull; Rapidly dissipates outdoors or in draughts</li>
                    <li>&bull; Cold discharge: &minus;78&deg;C frostbite risk</li>
                    <li>&bull; Not effective on Class A fires</li>
                  </ul>
                </div>
              </div>

              <p>
                The <strong>discharge temperature of &minus;78&deg;C</strong> presents a significant safety hazard. As the liquid CO&#8322; expands into gas, it cools dramatically, and the horn can reach temperatures cold enough to cause severe frostbite on contact. For this reason, CO&#8322; extinguisher horns must be made from <strong>non-conductive, frost-resistant material</strong>. Users must <strong>never hold the horn</strong> during discharge &mdash; only grip the handle and the designated holding point on the horn assembly.
              </p>

              <p>
                CO&#8322; extinguishers are available in <strong>2kg and 5kg</strong> sizes. The 2kg size is commonly placed next to individual workstations, server racks, or electrical panels. The 5kg size provides a longer discharge time and is suitable for larger risk areas.
              </p>

              <p>
                A critical limitation is the <strong>lack of any cooling effect</strong>. CO&#8322; suppresses the fire by removing oxygen, but once the gas dissipates (which can happen very quickly, especially in ventilated or outdoor environments), oxygen returns and the hot material or liquid may re-ignite. This means CO&#8322; extinguishers are <strong>not suitable for Class A fires</strong>, where deep-seated smouldering in solid materials will persist and re-ignite once the CO&#8322; disperses.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Practical Tip:</strong> In offices and commercial premises, CO&#8322; extinguishers are typically paired with foam or water extinguishers. The CO&#8322; handles electrical risks (computers, printers, switchboards), while the foam or water handles the Class A risks (paper, furniture, textiles). This combination provides comprehensive coverage for the most common workplace fire scenarios.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Inline Check after Section 04 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ============================================================ */}
        {/*  SECTION 05: Dry Powder Extinguishers (Blue Label)            */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 text-sm font-bold border border-rose-500/20">05</span>
              Dry Powder Extinguishers (Blue Label)
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Dry powder extinguishers are identified by a <strong>blue colour band</strong> on a red body. The standard <strong>ABC powder</strong> extinguisher is the most versatile type in terms of fire class coverage, being rated for <strong>Class A</strong> (solids), <strong>Class B</strong> (flammable liquids), and <strong>Class C</strong> (flammable gases). They are also safe for use on fires involving <strong>live electrical equipment</strong>.
              </p>

              <p>
                Dry powder works by <strong>interrupting the chemical chain reaction</strong> of combustion. The fine powder particles interfere with the free radicals that sustain the flame, effectively breaking the fire triangle at the chemical reaction level rather than by removing heat, oxygen, or fuel. This gives powder extinguishers their wide-ranging effectiveness across multiple fire classes.
              </p>

              <p>
                Despite their versatility, dry powder extinguishers have <strong>serious limitations</strong> that make them <strong>unsuitable for most indoor environments</strong>:
              </p>

              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Severe visibility reduction</strong> &mdash; the discharged powder creates a dense cloud that can completely obscure vision, making it impossible to see exits, escape routes, or the fire itself. This is extremely dangerous in enclosed spaces</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Inhalation hazard</strong> &mdash; the fine powder particles can cause serious respiratory distress, particularly for individuals with asthma, COPD, or other respiratory conditions. In confined spaces, this can be life-threatening</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>No cooling effect</strong> &mdash; like CO&#8322;, powder does not cool the burning material, so there is a significant risk of re-ignition once the powder settles and oxygen returns</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Messy cleanup</strong> &mdash; the powder contaminates everything it contacts and is extremely difficult to clean up. It can penetrate and corrode sensitive electronic equipment, often causing more damage than the fire itself</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Corrosive to electronics</strong> &mdash; the powder is hygroscopic (absorbs moisture) and can cause corrosion damage to circuit boards, relays, and other electronic components</span>
                </li>
              </ul>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-orange-400">Indoor Use Warning:</strong> Current UK fire safety guidance <strong>strongly recommends against</strong> the use of dry powder extinguishers in buildings, offices, and enclosed spaces. The visibility reduction and inhalation hazards are considered too great a risk to occupants. Powder extinguishers should be reserved for <strong>outdoor environments</strong> such as forecourts, construction sites, vehicle fires, and industrial yards.
                </p>
              </div>

              <p>
                In addition to standard ABC powder, there are <strong>specialist powder extinguishers</strong> designed for <strong>Class D (metal) fires</strong>. These use specific powder agents tailored to particular metals:
              </p>

              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>M28 powder</strong> &mdash; designed for lithium fires, commonly encountered with lithium battery incidents in industrial and automotive settings</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>L2 powder</strong> &mdash; designed for fires involving other combustible metals such as magnesium, titanium, and sodium. These metals burn at extremely high temperatures and react violently with water and many conventional extinguishing agents</span>
                </li>
              </ul>

              <p>
                Dry powder extinguishers are available in sizes from <strong>1kg to 9kg</strong>. The smaller 1kg and 2kg sizes are commonly found in vehicles. Specialist Class D powder extinguishers are typically 9kg to provide sufficient agent for metal fires, which are particularly difficult to extinguish.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 06: Wet Chemical Extinguishers (Yellow Label)        */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 text-sm font-bold border border-rose-500/20">06</span>
              Wet Chemical Extinguishers (Yellow Label)
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Wet chemical extinguishers are identified by a <strong>yellow colour band</strong> on a red body. They are <strong>specifically designed for Class F fires</strong> &mdash; fires involving cooking oils and fats, such as those in deep fat fryers, woks, and large cooking vessels. They are the <strong>only extinguisher type specifically designed</strong> for these extremely dangerous fires.
              </p>

              <p>
                Wet chemical extinguishers work through a unique process called <strong>saponification</strong>. The wet chemical agent (typically a solution of potassium acetate, potassium carbonate, or potassium citrate) reacts chemically with the burning cooking oil to create a <strong>non-combustible soap-like substance</strong> (a &ldquo;saponified&rdquo; layer) on the surface of the oil. This process achieves two critical effects simultaneously:
              </p>

              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Smothering</strong> &mdash; the soap-like film seals the surface of the oil, preventing flammable vapours from escaping and cutting off the oxygen supply to the fire</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Cooling</strong> &mdash; the wet chemical agent cools the oil below its auto-ignition temperature (typically around 340&deg;C for vegetable oil), preventing re-ignition. This is critical because cooking oils have very high auto-ignition temperatures and can re-ignite spontaneously if not cooled sufficiently</span>
                </li>
              </ul>

              <p>
                The agent is delivered as a <strong>fine spray or mist</strong>, which is gentle enough not to disturb the surface of the burning oil. This is essential &mdash; a forceful jet could splash burning oil out of the fryer or cooking vessel, spreading the fire and causing severe burns to the operator.
              </p>

              <p>
                In addition to Class F, wet chemical extinguishers are also <strong>rated for Class A fires</strong> (solid combustibles), making them useful in kitchen environments where both risks are present. Some models carry an additional <strong>Class B rating</strong>, but this is not universal &mdash; always check the specific extinguisher&rsquo;s label and fire rating.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Why Only Wet Chemical for Deep Fat Fryers?</strong> Cooking oil fires are exceptionally dangerous because the oil temperature typically exceeds 300&deg;C. Water causes an explosive steam eruption that throws burning oil into the air (a &ldquo;fireball&rdquo;). Foam behaves similarly due to its water content. CO&#8322; can splash the oil without cooling it. Standard powder does not cool the oil sufficiently. Only wet chemical extinguishers provide the combined smothering and cooling action needed to safely suppress a cooking oil fire. The saponification reaction is unique to wet chemical agents and cannot be replicated by any other extinguisher type.
                </p>
              </div>

              <p>
                Wet chemical extinguishers are typically available in <strong>2L, 3L, and 6L</strong> sizes. They should be sited within easy reach of commercial kitchen areas and are a mandatory requirement for any premises with deep fat frying equipment. Under the RRFSO fire risk assessment, any commercial kitchen must have appropriate Class F firefighting provision.
              </p>
            </div>
          </div>
        </section>

        {/* Inline Check after Section 06 */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ============================================================ */}
        {/*  SECTION 07: The PASS Technique                               */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 text-sm font-bold border border-rose-500/20">07</span>
              The PASS Technique
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>PASS technique</strong> is the universal method for operating a portable fire extinguisher. Regardless of the extinguisher type, the basic operation follows the same four-step process:
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4 text-center">
                  <Target className="h-6 w-6 text-rose-400 mx-auto mb-2" />
                  <p className="text-lg font-bold text-rose-400 mb-1">P</p>
                  <p className="text-xs font-semibold text-white mb-1">PULL</p>
                  <p className="text-[10px] text-white/60">Pull the safety pin to break the tamper seal and unlock the operating mechanism</p>
                </div>
                <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4 text-center">
                  <Target className="h-6 w-6 text-rose-400 mx-auto mb-2" />
                  <p className="text-lg font-bold text-rose-400 mb-1">A</p>
                  <p className="text-xs font-semibold text-white mb-1">AIM</p>
                  <p className="text-[10px] text-white/60">Aim the nozzle, horn, or hose at the BASE of the fire, not at the flames</p>
                </div>
                <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4 text-center">
                  <Target className="h-6 w-6 text-rose-400 mx-auto mb-2" />
                  <p className="text-lg font-bold text-rose-400 mb-1">S</p>
                  <p className="text-xs font-semibold text-white mb-1">SQUEEZE</p>
                  <p className="text-[10px] text-white/60">Squeeze the operating handle firmly to begin discharge of the extinguishing agent</p>
                </div>
                <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4 text-center">
                  <Target className="h-6 w-6 text-rose-400 mx-auto mb-2" />
                  <p className="text-lg font-bold text-rose-400 mb-1">S</p>
                  <p className="text-xs font-semibold text-white mb-1">SWEEP</p>
                  <p className="text-[10px] text-white/60">Sweep the discharge from side to side across the base of the fire until extinguished</p>
                </div>
              </div>

              <p>
                <strong>Practical considerations</strong> when using a fire extinguisher:
              </p>

              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Wind direction</strong> &mdash; always approach the fire with the wind at your back (outdoors) so that the extinguishing agent is carried towards the fire rather than blown back at you. Indoors, be aware of draughts from open windows or ventilation systems</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Safe distance</strong> &mdash; maintain a safe distance from the fire (typically 1&ndash;2 metres for water and foam, 1 metre minimum for CO&#8322;). Move closer only as the fire diminishes. Too close and you risk heat exposure; too far and the agent may not reach the fire effectively</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Escape route</strong> &mdash; always keep a clear escape route BEHIND you. Never allow the fire to come between you and your exit. If the fire grows or you cannot control it, you must be able to evacuate immediately</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Aim at the base</strong> &mdash; this is the most common mistake. The base of the fire is where the fuel is burning; the visible flames are the result, not the cause. Directing the agent at the base addresses the fuel source directly</span>
                </li>
              </ul>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <p className="text-sm font-semibold text-orange-400 mb-2">When NOT to Fight a Fire</p>
                <p className="text-sm text-white">
                  Do NOT attempt to use an extinguisher if: the fire is <strong>too large</strong> (bigger than a wastepaper bin); the fire is <strong>spreading rapidly</strong> or has reached the ceiling; there is <strong>heavy smoke</strong> reducing visibility; you have <strong>no training</strong> in extinguisher use; you do <strong>not have the correct type</strong> of extinguisher; there is <strong>no clear escape route</strong> behind you; or you have <strong>any doubt</strong> about your ability to control the fire. In any of these situations, evacuate immediately, close doors behind you, and wait for the fire and rescue service.
                </p>
              </div>

              <p>
                Remember that portable fire extinguishers contain a <strong>limited quantity of agent</strong> &mdash; most provide only <strong>20 to 60 seconds of discharge time</strong>. They are designed for first-aid firefighting in the incipient stage of a fire only. If the fire cannot be controlled quickly, stop, evacuate, and leave firefighting to the professionals.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 08: Maintenance, Inspection & Placement              */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 text-sm font-bold border border-rose-500/20">08</span>
              Maintenance, Inspection &amp; Placement
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Fire extinguisher maintenance is governed by <strong>BS 5306-3</strong> and is a legal requirement under the RRFSO. Article 17 requires the Responsible Person to ensure that firefighting equipment is maintained in an efficient state, in efficient working order, and in good repair. Failure to maintain extinguishers properly can result in prosecution and, more importantly, could mean an extinguisher fails to operate when needed.
              </p>

              <p>
                The maintenance regime follows a <strong>three-tier system</strong>:
              </p>

              <div className="space-y-4">
                <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
                  <p className="text-sm font-semibold text-rose-400 mb-2">Tier 1: Monthly Visual Inspection (by User)</p>
                  <p className="text-xs text-white/70 mb-2">
                    A responsible person on the premises (not necessarily a specialist) should carry out a brief visual check each month. This includes:
                  </p>
                  <ul className="space-y-1.5 text-xs text-white/70">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Confirm the extinguisher is in its designated location and has not been moved</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Check the pressure gauge (if fitted) is in the green zone</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Verify the safety pin and tamper seal are intact</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Look for visible damage, dents, corrosion, or leakage</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Ensure the operating instructions are legible and the ID label is in place</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Confirm access is not obstructed by furniture, stock, or equipment</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
                  <p className="text-sm font-semibold text-rose-400 mb-2">Tier 2: Annual Service (by Competent Engineer)</p>
                  <p className="text-xs text-white/70 mb-2">
                    A thorough technical inspection must be carried out every 12 months by a competent service engineer (typically a BAFE-registered technician). This includes:
                  </p>
                  <ul className="space-y-1.5 text-xs text-white/70">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Weighing the extinguisher to confirm correct agent quantity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Checking and testing the discharge mechanism and operating handle</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Inspecting the hose, nozzle, or horn for damage or blockage</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Verifying the pressure (gauge or cartridge) is within specification</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Replacing the safety pin and fitting a new tamper indicator</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Attaching a service label showing the date of service, next service due, and engineer details</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
                  <p className="text-sm font-semibold text-rose-400 mb-2">Tier 3: Extended Service (at Specified Intervals)</p>
                  <p className="text-xs text-white/70 mb-2">
                    More intensive servicing is required at specific intervals depending on the extinguisher type:
                  </p>
                  <ul className="space-y-1.5 text-xs text-white/70">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span><strong>Water, foam, and wet chemical:</strong> Extended service every 5 years &mdash; includes discharge test, internal inspection, and refill with fresh agent</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span><strong>CO&#8322;:</strong> Hydraulic pressure test every 10 years &mdash; the cylinder is pressure-tested to verify structural integrity (CO&#8322; cylinders operate at very high pressures)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span><strong>Dry powder:</strong> Extended service every 5 years with full discharge and refill every 10 years &mdash; powder can compact over time and fail to discharge properly</span>
                    </li>
                  </ul>
                </div>
              </div>

              <p>
                <strong>Record keeping</strong> is essential. All maintenance activities, inspections, and services must be documented and records retained. These records may be requested during a fire safety audit or inspection by the fire and rescue service. Many organisations use a fire safety log book or digital maintenance management system to track extinguisher servicing.
              </p>

              <p>
                <strong>Signage</strong> must comply with the Health and Safety (Safety Signs and Signals) Regulations 1996 and BS 5499. Each extinguisher location should be indicated by a fire extinguisher identification sign showing the type of extinguisher and, ideally, the fire classes it is suitable for. In areas where extinguishers may not be immediately visible, additional directional signs should guide occupants to the nearest extinguisher.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Fire Marshal Responsibility:</strong> As a fire marshal, you should be familiar with the locations of all extinguishers in your area, the types available, and how to carry out the monthly visual inspection. You should also know how to verify that the annual service has been completed (check the service label) and report any issues such as missing extinguishers, obstructed access, damaged units, or overdue servicing to the Responsible Person immediately.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  COLOUR CODES & SUITABILITY DIAGRAM                           */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6">
            <h2 className="text-lg font-bold text-white text-center mb-2">Fire Extinguisher Colour Codes &amp; Suitability</h2>
            <p className="text-xs text-white/50 text-center mb-6">All extinguishers have a red body with a colour band identifying the type</p>

            <div className="space-y-3">
              {/* Water */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-3 sm:p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-md bg-red-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-[10px] font-bold">RED</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Water</p>
                    <p className="text-[10px] text-white/50">6L / 9L &mdash; Cooling action</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div>
                    <p className="text-green-400 font-semibold mb-0.5">SUITABLE</p>
                    <p className="text-white/60">Class A (solids)</p>
                  </div>
                  <div>
                    <p className="text-red-400 font-semibold mb-0.5">NOT SUITABLE</p>
                    <p className="text-white/60">Electrical, Class B, Class F, Class D</p>
                  </div>
                </div>
              </div>

              {/* Foam */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-3 sm:p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-md bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-amber-900 text-[10px] font-bold">CREAM</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Foam (AFFF)</p>
                    <p className="text-[10px] text-white/50">6L / 9L &mdash; Smothering &amp; cooling</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div>
                    <p className="text-green-400 font-semibold mb-0.5">SUITABLE</p>
                    <p className="text-white/60">Class A (solids), Class B (liquids)</p>
                  </div>
                  <div>
                    <p className="text-red-400 font-semibold mb-0.5">NOT SUITABLE</p>
                    <p className="text-white/60">Electrical (unless tested), Class F, Class D</p>
                  </div>
                </div>
              </div>

              {/* CO2 */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-3 sm:p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-md bg-gray-900 border border-white/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-[10px] font-bold">BLACK</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">CO&#8322;</p>
                    <p className="text-[10px] text-white/50">2kg / 5kg &mdash; Oxygen displacement</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div>
                    <p className="text-green-400 font-semibold mb-0.5">SUITABLE</p>
                    <p className="text-white/60">Class B (liquids), Electrical equipment</p>
                  </div>
                  <div>
                    <p className="text-red-400 font-semibold mb-0.5">NOT SUITABLE</p>
                    <p className="text-white/60">Class A (no cooling), Class F, Class D</p>
                  </div>
                </div>
              </div>

              {/* Powder */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-3 sm:p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-md bg-blue-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-[10px] font-bold">BLUE</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Dry Powder (ABC)</p>
                    <p className="text-[10px] text-white/50">1&ndash;9kg &mdash; Chemical interruption</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div>
                    <p className="text-green-400 font-semibold mb-0.5">SUITABLE</p>
                    <p className="text-white/60">Class A, B, C, Electrical. Specialist: Class D</p>
                  </div>
                  <div>
                    <p className="text-red-400 font-semibold mb-0.5">NOT RECOMMENDED</p>
                    <p className="text-white/60">Indoors (visibility/inhalation), Class F</p>
                  </div>
                </div>
              </div>

              {/* Wet Chemical */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-3 sm:p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-md bg-yellow-400 flex items-center justify-center flex-shrink-0">
                    <span className="text-yellow-900 text-[10px] font-bold">YELLOW</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Wet Chemical</p>
                    <p className="text-[10px] text-white/50">2&ndash;6L &mdash; Saponification</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div>
                    <p className="text-green-400 font-semibold mb-0.5">SUITABLE</p>
                    <p className="text-white/60">Class F (cooking oils), Class A. Some: Class B</p>
                  </div>
                  <div>
                    <p className="text-red-400 font-semibold mb-0.5">NOT SUITABLE</p>
                    <p className="text-white/60">Electrical, Class D</p>
                  </div>
                </div>
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
          title="Section 1 Knowledge Check"
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
            <Link to="../fire-safety-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 5
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../fire-safety-module-5-section-2">
              Fire Blankets &amp; Hose Reels
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>

      </article>
    </div>
  );
}
