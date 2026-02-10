import { ArrowLeft, ArrowRight, Flame, Thermometer, Droplets, Wind, AlertTriangle, CheckCircle, Zap, BookOpen, ShieldCheck, Triangle } from "lucide-react";
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
    id: "fire-triangle-elements",
    question: "Which three elements make up the fire triangle?",
    options: [
      "Heat, water, and fuel",
      "Heat, fuel, and oxygen",
      "Fuel, electricity, and air",
      "Oxygen, carbon dioxide, and heat"
    ],
    correctIndex: 1,
    explanation:
      "The fire triangle consists of three elements: heat (an ignition source), fuel (a combustible material), and oxygen (an oxidising agent). All three must be present simultaneously for combustion to occur. Remove any one element and the fire cannot start or sustain itself. This fundamental model underpins all fire prevention and firefighting strategies."
  },
  {
    id: "fire-oxygen-concentration",
    question: "At what approximate oxygen concentration does fire become unable to sustain combustion?",
    options: [
      "Below approximately 25%",
      "Below approximately 21%",
      "Below approximately 16%",
      "Below approximately 10%"
    ],
    correctIndex: 2,
    explanation:
      "Fire generally requires a minimum oxygen concentration of approximately 16% to sustain combustion. Normal air contains around 20.9% oxygen. When the oxygen level drops below approximately 16%, most fires will be extinguished due to insufficient oxygen to support the combustion reaction. However, some materials can continue to smoulder at lower concentrations, and certain chemical oxidisers can supply their own oxygen."
  },
  {
    id: "fire-tetrahedron-element",
    question: "Which additional element does the fire tetrahedron add to the fire triangle model?",
    options: [
      "Water vapour",
      "Carbon dioxide",
      "The chemical chain reaction (uninhibited free radical chain reaction)",
      "Electrical energy"
    ],
    correctIndex: 2,
    explanation:
      "The fire tetrahedron extends the fire triangle by adding a fourth element: the chemical chain reaction, specifically the uninhibited free radical chain reaction. This fourth element explains why certain extinguishing agents (such as dry powder and formerly halon) work &mdash; they interrupt the chain reaction at a molecular level rather than removing heat, fuel, or oxygen. Understanding the tetrahedron is essential for selecting the correct firefighting method."
  }
];

/* ------------------------------------------------------------------ */
/*  FAQs (4)                                                          */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: "What is the difference between the fire triangle and the fire tetrahedron?",
    answer:
      "The fire triangle is the traditional model that identifies three elements necessary for fire: heat, fuel, and oxygen. It remains the standard teaching model and is perfectly adequate for understanding fire prevention. The fire tetrahedron is an expanded model used in modern fire science that adds a fourth element: the uninhibited chemical chain reaction (free radical chain reaction). The tetrahedron explains phenomena that the triangle alone cannot, such as why dry powder extinguishers and clean agent systems can suppress fire without significantly removing heat, fuel, or oxygen. They work by interrupting the chain reaction at a molecular level. In practical terms, the triangle tells you what fire needs to start; the tetrahedron explains why certain suppression methods work. Both models are correct; the tetrahedron is simply more complete."
  },
  {
    question: "Can a fire burn without visible flames?",
    answer:
      "Yes, absolutely. Smouldering combustion is a form of fire that occurs without visible flames. It involves the slow, low-temperature oxidation of a solid fuel, typically producing smoke, heat, and toxic gases (particularly carbon monoxide) but no visible flame front. Smouldering fires are extremely dangerous because they can persist undetected for hours or even days inside materials such as upholstered furniture, insulation, cable bundles, accumulated dust, or sawdust. They produce large quantities of carbon monoxide, which is odourless and can cause death before the fire is even noticed. A smouldering fire can also transition to flaming combustion if it encounters a fresh oxygen supply &mdash; for example, when a door is opened or a cavity is disturbed. In electrical work, overheated cables, loose connections, and overloaded circuits are common causes of smouldering fires within wall cavities and ceiling voids."
  },
  {
    question: "Why is oxygen enrichment so dangerous?",
    answer:
      "Normal air contains approximately 20.9% oxygen. An oxygen-enriched atmosphere is one where the oxygen concentration exceeds 23.5%. In such conditions, fire behaviour changes dramatically and dangerously. Materials that are difficult to ignite in normal air become easy to ignite. Materials that burn slowly in normal air burn fiercely and rapidly. Clothing, hair, and skin can ignite far more easily. The rate of flame spread increases significantly, and fires become far harder to control or extinguish. Even small increases in oxygen concentration have a disproportionate effect on fire risk. Sources of oxygen enrichment include leaking compressed oxygen cylinders, piped oxygen systems (common in hospitals and laboratories), certain chemical reactions involving oxidising agents, and improperly purged equipment. On construction sites, oxy-acetylene cutting and welding equipment is a common source of oxygen enrichment if cylinders are left open or regulators leak. UK regulations require that oxygen cylinders are stored separately from fuel gas cylinders and that any suspected oxygen enrichment is treated as an emergency."
  },
  {
    question: "How does understanding the fire triangle help with fire prevention in electrical work?",
    answer:
      "The fire triangle directly informs every aspect of fire prevention in electrical work. Electrical installations involve all three sides of the triangle. For heat: electrical faults generate heat through arcing, overloading, loose connections, short circuits, and earth faults. Proper circuit design, correct cable sizing, appropriate protective devices (MCBs, RCDs, AFDDs), regular inspection and testing, and torquing of connections all serve to control the heat element. For fuel: electrical installations run through buildings containing abundant combustible materials &mdash; timber joists, insulation, paper-faced plasterboard, PVC cable sheathing, plastic containment, and stored materials. Fire barriers, correct cable penetration sealing (firestopping), segregation of cables from combustible materials, and good housekeeping control the fuel element. For oxygen: standard workplaces have normal atmospheric oxygen, but enclosed plant rooms, ceiling voids, and risers can have altered atmospheres. Preventing oxygen enrichment around electrical equipment is important, particularly where compressed gases are used nearby. By systematically addressing each side of the triangle, electricians can significantly reduce fire risk in every installation they work on."
  }
];

/* ------------------------------------------------------------------ */
/*  End-of-Section Quiz (8 questions)                                 */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      "Which of the following is NOT one of the three elements of the fire triangle?",
    options: [
      "Heat (ignition source)",
      "Fuel (combustible material)",
      "The chemical chain reaction",
      "Oxygen (oxidising agent)"
    ],
    correctAnswer: 2,
    explanation:
      "The chemical chain reaction is the fourth element added by the fire tetrahedron model, not part of the original fire triangle. The three elements of the fire triangle are heat (ignition source), fuel (combustible material), and oxygen (oxidising agent)."
  },
  {
    id: 2,
    question:
      "Which of the following is a common heat source (ignition source) specific to electrical work?",
    options: [
      "Radiant heat from the sun",
      "Arcing from loose connections or damaged cables",
      "Friction between moving machinery parts",
      "Static electricity from conveyor belts"
    ],
    correctAnswer: 1,
    explanation:
      "While all four options are valid ignition sources, arcing from loose connections or damaged cables is the heat source most specific to electrical work. Arcing occurs when electrical current jumps across a gap, generating extremely high temperatures (often exceeding 3,000 degrees Celsius) that can readily ignite surrounding combustible materials. This is why proper torquing of terminations and regular inspection of cables are critical fire prevention measures for electricians."
  },
  {
    id: 3,
    question:
      "What is the flash point of a liquid fuel?",
    options: [
      "The temperature at which a liquid spontaneously ignites without any external ignition source",
      "The lowest temperature at which a liquid gives off enough vapour to form an ignitable mixture with air near its surface",
      "The temperature at which a liquid begins to boil",
      "The maximum temperature a liquid can reach before it evaporates completely"
    ],
    correctAnswer: 1,
    explanation:
      "The flash point is the lowest temperature at which a liquid gives off sufficient vapour to form an ignitable mixture with air near its surface. At the flash point, the vapour will ignite briefly if an external ignition source is applied, but combustion may not be sustained. This is distinct from the fire point (the temperature at which sustained combustion occurs) and the auto-ignition temperature (the temperature at which spontaneous ignition occurs without an external source)."
  },
  {
    id: 4,
    question:
      "What is the approximate oxygen concentration in normal atmospheric air?",
    options: [
      "Approximately 16%",
      "Approximately 20.9%",
      "Approximately 23.5%",
      "Approximately 30%"
    ],
    correctAnswer: 1,
    explanation:
      "Normal atmospheric air contains approximately 20.9% oxygen, 78% nitrogen, and small amounts of other gases (argon, carbon dioxide, etc.). Fire generally requires at least approximately 16% oxygen to sustain combustion. An atmosphere is considered oxygen-enriched above 23.5%, at which point fire risk increases dramatically."
  },
  {
    id: 5,
    question:
      "The fire tetrahedron model includes heat, fuel, oxygen, and which fourth element?",
    options: [
      "Water vapour from combustion byproducts",
      "The uninhibited chemical chain reaction (free radical chain reaction)",
      "Gravity, which allows convective heat transfer",
      "Carbon dioxide produced by burning"
    ],
    correctAnswer: 1,
    explanation:
      "The fire tetrahedron adds the uninhibited chemical chain reaction (free radical chain reaction) as the fourth element. During combustion, free radicals are produced that sustain the reaction. If this chain reaction is interrupted &mdash; for example by dry powder or clean agent extinguishing systems &mdash; the fire is suppressed even though heat, fuel, and oxygen may still be present."
  },
  {
    id: 6,
    question:
      "What is the auto-ignition temperature of a substance?",
    options: [
      "The temperature at which a substance first begins to decompose",
      "The lowest temperature at which a substance gives off flammable vapour",
      "The temperature at which a substance will ignite spontaneously in air without any external ignition source",
      "The temperature at which a substance changes from solid to liquid state"
    ],
    correctAnswer: 2,
    explanation:
      "The auto-ignition temperature (also called the spontaneous ignition temperature) is the lowest temperature at which a substance will ignite spontaneously in normal atmospheric air without any external ignition source such as a spark or flame. For example, paper has an auto-ignition temperature of approximately 233 degrees Celsius. This is a critical concept for electricians because electrical equipment can generate sustained temperatures above the auto-ignition temperature of surrounding materials, particularly during fault conditions."
  },
  {
    id: 7,
    question:
      "Which firefighting strategy works by removing the OXYGEN side of the fire triangle?",
    options: [
      "Applying water to cool the burning material",
      "Removing unburned fuel from the path of the fire",
      "Smothering the fire with a fire blanket or applying CO2",
      "Using dry powder to interrupt the chain reaction"
    ],
    correctAnswer: 2,
    explanation:
      "Smothering the fire with a fire blanket or applying CO2 (carbon dioxide) works by removing or displacing the oxygen that the fire needs to sustain combustion. A fire blanket physically excludes air from reaching the fire. CO2 displaces the oxygen around the fire, creating an inert atmosphere. Water works by cooling (removing heat), removing fuel works by isolation/starvation, and dry powder primarily works by interrupting the chemical chain reaction."
  },
  {
    id: 8,
    question:
      "An electrician discovers a small fire caused by an overheated cable termination in a distribution board. Which side of the fire triangle was the PRIMARY initial cause?",
    options: [
      "Fuel &mdash; the plastic casing of the distribution board",
      "Oxygen &mdash; the normal atmospheric air around the board",
      "Heat &mdash; the electrical energy from the overheated termination",
      "Chain reaction &mdash; the free radicals produced during combustion"
    ],
    correctAnswer: 2,
    explanation:
      "The primary initial cause was heat generated by the overheated cable termination. While fuel (the plastic and insulation materials) and oxygen (normal air) were also present and necessary for the fire, the ignition was initiated by excessive heat from the electrical fault. Loose or poorly torqued terminations create high-resistance connections that generate heat, which can exceed the ignition temperature of surrounding combustible materials. This is why correct torquing of terminations to manufacturer specifications and regular thermal imaging during inspection are important fire prevention measures."
  }
];

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */
export default function FireSafetyModule1Section1() {
  useSEO({
    title: "The Fire Triangle | Fire Safety Module 1.1",
    description:
      "Understand the fire triangle model: heat, fuel, and oxygen. Learn about ignition sources, fuel classifications, oxygen enrichment, the fire tetrahedron, and how to apply these concepts to fire prevention and firefighting in electrical work.",
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

        {/* ============================================================ */}
        {/*  PAGE TITLE                                                   */}
        {/* ============================================================ */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-400/20 border border-rose-500/30 mb-4">
            <Flame className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 1 &middot; SECTION 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            The Fire Triangle
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Understanding the fundamental model of combustion &mdash; the three elements that every fire needs, how they interact, the expanded tetrahedron model, and how to apply this knowledge to fire prevention and firefighting
          </p>
        </header>

        {/* ============================================================ */}
        {/*  QUICK SUMMARY BOXES                                          */}
        {/* ============================================================ */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Fire Triangle:</strong> Heat + Fuel + Oxygen = Fire</li>
              <li><strong>Remove one:</strong> The fire cannot start or sustain</li>
              <li><strong>Tetrahedron:</strong> Adds the chemical chain reaction as a 4th element</li>
              <li><strong>Key insight:</strong> All fire prevention targets at least one side</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">For Electricians</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Heat:</strong> Arcing, overloaded circuits, loose connections</li>
              <li><strong>Fuel:</strong> PVC sheathing, timber, insulation, stored materials</li>
              <li><strong>Oxygen:</strong> Normal air; enrichment near compressed gases</li>
              <li><strong>Prevention:</strong> Correct cable sizing, torquing, AFDDs, firestopping</li>
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
              "Explain the fire triangle model and identify its three essential elements",
              "List common heat sources (ignition sources) relevant to electrical work and construction sites",
              "Classify fuels into solid, liquid, and gaseous categories with workplace examples",
              "Describe the role of oxygen in combustion and explain the dangers of oxygen-enriched atmospheres",
              "Explain the fire tetrahedron and the chemical chain reaction",
              "Apply the fire triangle to practical fire prevention and firefighting strategies"
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
        {/*  SECTION 01: Introduction to the Fire Triangle               */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 text-sm font-bold border border-rose-500/20">01</span>
              Introduction to the Fire Triangle
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>fire triangle</strong> (also known as the <strong>combustion triangle</strong>)
                is the most fundamental model in fire science. It has been the cornerstone of fire safety
                training for over a century, and despite advances in our understanding of combustion
                chemistry, it remains the essential framework for understanding how fires start, how they
                sustain themselves, and &mdash; critically &mdash; how they can be prevented and
                extinguished.
              </p>

              <p>
                The model is elegantly simple. Fire requires three elements to exist simultaneously:
              </p>

              <div className="grid sm:grid-cols-3 gap-3">
                <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4 text-center">
                  <Thermometer className="h-6 w-6 text-rose-400 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-rose-400 mb-1">HEAT</p>
                  <p className="text-xs text-white/70">An ignition source that raises the fuel to its ignition temperature</p>
                </div>
                <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4 text-center">
                  <Flame className="h-6 w-6 text-rose-400 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-rose-400 mb-1">FUEL</p>
                  <p className="text-xs text-white/70">A combustible material that can undergo oxidation</p>
                </div>
                <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4 text-center">
                  <Wind className="h-6 w-6 text-rose-400 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-rose-400 mb-1">OXYGEN</p>
                  <p className="text-xs text-white/70">An oxidising agent, usually the oxygen in atmospheric air</p>
                </div>
              </div>

              <p>
                <strong>Remove any one of these three elements and the fire cannot exist.</strong> This
                is not merely an academic principle &mdash; it is the practical basis of every fire
                prevention measure, every firefighting technique, and every fire safety regulation in
                force in the United Kingdom today. When you install a fire barrier to prevent flame
                spread through a cable penetration, you are removing fuel from the fire&rsquo;s path.
                When a fire extinguisher cools a burning surface, it is removing heat. When a CO&#8322;
                extinguisher displaces the air around a fire, it is removing oxygen.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Key Principle:</strong> Every fire prevention
                  measure and every firefighting action targets at least one side of the fire triangle.
                  Understanding which side you are addressing &mdash; and which sides remain
                  uncontrolled &mdash; is essential for effective fire safety. A measure that removes
                  the ignition source (heat) is ineffective if another ignition source is introduced
                  later and the fuel and oxygen remain present.
                </p>
              </div>

              <p>
                The fire triangle is not just a theoretical model. It is a practical tool used daily by
                fire risk assessors, fire marshals, firefighters, and building designers across the UK.
                Under the <strong>Regulatory Reform (Fire Safety) Order 2005</strong> (the &ldquo;Fire
                Safety Order&rdquo; or &ldquo;FSO&rdquo;), the responsible person for any non-domestic
                premises must carry out a fire risk assessment. That assessment is fundamentally an
                exercise in examining each side of the fire triangle: what are the ignition sources?
                What are the fuel sources? Where is the oxygen? And are the existing control measures
                sufficient to keep these three elements apart?
              </p>

              <p>
                For electricians and electrical workers, the fire triangle has particular significance.
                Electrical installations are one of the most common sources of fire ignition in the
                United Kingdom. According to Home Office fire statistics, electrical faults and
                misuse of electrical equipment together account for a significant proportion of
                accidental dwelling fires each year. Understanding the fire triangle equips you to
                recognise fire risks in every installation you work on and to take practical steps to
                reduce those risks as part of your everyday work.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Historical Context</p>
                <p className="text-sm text-white/80">
                  The fire triangle concept was first formally described in the early 20th century,
                  though the underlying chemistry of combustion had been understood since Antoine
                  Lavoisier identified the role of oxygen in the 1770s. The triangle became the
                  standard teaching model for fire brigades, industry, and schools worldwide. In the
                  1960s and 1970s, advances in combustion chemistry led to the development of the
                  expanded <strong>fire tetrahedron</strong> model, which we shall cover in Section 05
                  of this unit.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 02: Heat Sources                                    */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 text-sm font-bold border border-rose-500/20">02</span>
              Heat Sources (Ignition Sources)
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The first side of the fire triangle is <strong>heat</strong>. In fire science terminology,
                the heat source is more precisely called the <strong>ignition source</strong> &mdash; it
                is the energy input that raises a combustible material to its ignition temperature,
                initiating the combustion reaction. Without a source of ignition, fuel and oxygen can
                coexist indefinitely without producing fire.
              </p>

              <p>
                Fire risk assessments under the Regulatory Reform (Fire Safety) Order 2005 require the
                responsible person to identify all potential ignition sources in the workplace. For
                construction sites and electrical installations, the range of potential ignition sources
                is wide and varied:
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Common Ignition Sources</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Electrical Faults</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Electrical faults are among the most significant ignition sources in the UK.
                      <strong> Arcing</strong> occurs when electrical current jumps across a gap &mdash;
                      for example, across a loose terminal, a damaged conductor, or a deteriorated
                      insulation barrier &mdash; generating temperatures that can exceed 3,000&deg;C.
                      <strong> Overloaded circuits</strong> cause conductors to overheat beyond their
                      rated current-carrying capacity, degrading insulation and potentially igniting
                      surrounding combustible materials. <strong>Loose connections</strong> create
                      high-resistance joints that generate localised heat, often undetected until
                      insulation failure occurs. <strong>Short circuits</strong> and <strong>earth
                      faults</strong> can release enormous amounts of energy in fractions of a second.
                      <strong>Tracking</strong> occurs when carbonised pathways form across contaminated
                      insulation surfaces, allowing current to flow where it should not.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Hot Works</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Hot works encompass any work that produces heat, sparks, or open flame.
                      <strong> Welding</strong> (arc welding, MIG, TIG) generates extreme temperatures
                      and showers of molten metal particles. <strong>Cutting</strong> (oxy-acetylene,
                      plasma, disc cutting) produces sparks that can travel several metres.
                      <strong> Grinding</strong> produces a continuous stream of hot sparks.
                      <strong> Soldering</strong> and <strong>brazing</strong> use open flames or
                      heated elements. Hot works are a leading cause of construction site fires in
                      the UK and require a dedicated hot works permit system under most site safety
                      management plans.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Friction</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Friction between moving parts generates heat. Overheated bearings, misaligned
                      rotating equipment, conveyor belts, and power tools (particularly when cutting
                      or drilling into materials) can all generate sufficient heat to ignite nearby
                      combustible materials or dusts. Sparks generated by ferrous metal striking
                      ferrous metal (for example, a steel tool dropped onto a steel floor) can ignite
                      flammable gases or vapours.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Chemical Reactions</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Certain chemical reactions are exothermic &mdash; they release heat as a
                      byproduct. Some reactions can generate enough heat to cause spontaneous ignition.
                      Examples include the reaction between oxidising agents and organic materials,
                      self-heating of oily rags (due to the oxidation of unsaturated oils such as
                      linseed oil), and the decomposition of certain unstable chemicals. On construction
                      sites, the mixing of incompatible chemicals (such as oxidisers with organic
                      solvents) can produce violent exothermic reactions.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Radiant Heat</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Heat energy transmitted by electromagnetic radiation (infrared) can ignite
                      combustible materials at a distance from the original heat source. Industrial
                      heaters, process ovens, furnaces, hot pipework, and even concentrated sunlight
                      through glass or reflective surfaces can be sources of radiant heat ignition.
                      In electrical work, transformers and high-current busbars can produce significant
                      radiant heat during normal operation.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Static Electricity</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Static electrical charges can accumulate on persons, equipment, and materials,
                      particularly in low-humidity environments. When the accumulated charge discharges
                      (a spark), it can ignite flammable vapours, gases, or dust clouds. This is a
                      particular hazard when handling flammable liquids (fuel filling, solvent use),
                      in environments with combustible dust (grain, flour, wood dust), and when
                      handling plastic films or synthetic materials. Bonding and earthing of equipment
                      and containers is the primary control measure.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Smoking Materials &amp; Arson</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Discarded cigarettes, matches, and lighters remain a significant ignition source,
                      particularly on construction sites and in areas where smoking restrictions are
                      not enforced. Arson (deliberate fire-setting) is the single largest cause of
                      fires in non-domestic premises in the UK. Site security, perimeter fencing,
                      removal of combustible waste, and controlled access all contribute to reducing
                      arson risk on construction sites.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Electrical Trade Focus: Arc Fault Detection Devices (AFDDs)</p>
                <p className="text-sm text-white/80">
                  The 18th Edition of BS 7671 (the IET Wiring Regulations) introduced
                  recommendations for the use of <strong>Arc Fault Detection Devices (AFDDs)</strong> in
                  certain types of installation. AFDDs are designed to detect dangerous arcing faults
                  &mdash; both series arcs (caused by loose or damaged conductors) and parallel arcs
                  (caused by insulation breakdown) &mdash; and disconnect the circuit before the arc
                  can ignite surrounding materials. They directly address the &ldquo;heat&rdquo; side
                  of the fire triangle by eliminating one of the most dangerous electrical ignition
                  sources. Regulation 421.1.7 recommends AFDDs for locations with sleeping
                  accommodation, premises constructed with combustible materials, locations containing
                  irreplaceable goods, and locations with combustible materials being processed or
                  stored.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ============================================================ */}
        {/*  SECTION 03: Fuel Sources                                    */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 text-sm font-bold border border-rose-500/20">03</span>
              Fuel Sources
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The second side of the fire triangle is <strong>fuel</strong>. In fire science, a fuel
                is any material that can undergo combustion &mdash; that is, any substance that can
                react with an oxidising agent (typically oxygen) in an exothermic reaction that
                produces heat and light. Fuels exist in three physical states &mdash; solid, liquid,
                and gaseous &mdash; and each behaves differently in a fire.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Flame className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Classification of Fuels</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Solid Fuels</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Solid fuels are the most commonly encountered combustible materials in buildings
                      and on construction sites. They include <strong>wood</strong> (structural timber,
                      joists, battens, plywood, chipboard, MDF), <strong>paper and cardboard</strong>
                      (packaging, documents, paper-faced plasterboard), <strong>textiles</strong>
                      (curtains, upholstery, carpet, clothing), <strong>plastics</strong> (PVC cable
                      sheathing, trunking, conduit, containment systems, insulation boards, packaging),
                      <strong> rubber</strong> (seals, gaskets, floor coverings), and <strong>insulation
                      materials</strong> (some foam insulation boards, fibrous insulation if
                      contaminated with combustible substances). Solid fuels generally need to be heated
                      to produce flammable vapours (pyrolysis) before they can ignite. The surface area
                      to mass ratio matters: thin materials and finely divided materials (sawdust, wood
                      shavings, fabric fibres) ignite far more easily than solid blocks of the same
                      material.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Liquid Fuels</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Liquid fuels do not themselves burn &mdash; it is the <strong>vapour</strong>
                      given off by the liquid that mixes with air and ignites. This is a critical
                      distinction. Common liquid fuels encountered in construction and electrical
                      work include <strong>petrol</strong> (extremely flammable, low flash point of
                      approximately &minus;43&deg;C), <strong>diesel</strong> (combustible, flash
                      point typically 52&ndash;96&deg;C), <strong>solvents</strong> (white spirit,
                      acetone, toluene, thinners &mdash; many with very low flash points),
                      <strong> paints and varnishes</strong> (many contain flammable solvents),
                      <strong> adhesives</strong> (contact adhesives, resin-based adhesives),
                      <strong> hydraulic oils</strong> and <strong>lubricating oils</strong>,
                      <strong> cleaning agents</strong> (degreasers, flux cleaners), and
                      <strong> cable-pulling lubricants</strong> (some formulations are combustible).
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Gaseous Fuels</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Gaseous fuels present the highest immediate fire and explosion risk because they
                      are already in a state that can mix intimately with air to form ignitable
                      mixtures. Common gaseous fuels include <strong>natural gas</strong> (methane
                      &mdash; supplied to most UK buildings, lighter than air), <strong>LPG</strong>
                      (liquefied petroleum gas &mdash; propane and butane, heavier than air, commonly
                      used on construction sites for temporary heating and cooking), <strong>acetylene
                      </strong> (used in oxy-acetylene welding and cutting, extremely flammable with
                      a very wide flammable range), and <strong>hydrogen</strong> (increasingly
                      encountered as energy systems evolve, extremely flammable with a very wide
                      flammable range and very low ignition energy).
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Key Definitions</p>
                </div>
                <div className="space-y-3 text-sm text-white/80">
                  <div>
                    <p className="font-medium text-white">Flash Point</p>
                    <p>
                      The lowest temperature at which a liquid gives off sufficient vapour to form an
                      ignitable mixture with air near its surface. At the flash point, the vapour will
                      ignite momentarily if an external ignition source is applied, but sustained
                      combustion may not occur. The lower the flash point, the more dangerous the
                      liquid at ambient temperatures. Petrol has a flash point of approximately
                      &minus;43&deg;C, meaning it gives off ignitable vapour at all normal ambient
                      temperatures.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-white">Fire Point</p>
                    <p>
                      The lowest temperature at which a liquid gives off enough vapour to sustain
                      continuous combustion after ignition by an external source. The fire point is
                      typically a few degrees above the flash point. At the fire point, sufficient
                      vapour is produced continuously to maintain a flame once ignited.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-white">Auto-Ignition Temperature</p>
                    <p>
                      The lowest temperature at which a substance will ignite spontaneously in normal
                      atmospheric air without any external ignition source (no spark, flame, or hot
                      surface required). The auto-ignition temperature is a property of the substance
                      itself. For example, paper auto-ignites at approximately 233&deg;C, wood at
                      approximately 300&deg;C (varies by species), and petrol vapour at approximately
                      280&deg;C. This is particularly relevant to electrical work: sustained
                      overheating of a cable can raise the temperature of surrounding materials above
                      their auto-ignition temperature without any spark or arc being necessary.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                Understanding how fuels are stored and managed on construction sites is a critical
                component of fire prevention. Under the Dangerous Substances and Explosive Atmospheres
                Regulations 2002 (DSEAR) and the associated Approved Code of Practice, employers must
                identify dangerous substances present in the workplace, carry out a risk assessment,
                and implement appropriate control measures. This includes:
              </p>

              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span>Storing flammable liquids in purpose-built, ventilated stores away from ignition sources</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span>Separating flammable gas cylinders (LPG, acetylene) from oxygen cylinders by at least 3 metres or a fire-resistant barrier</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span>Keeping only minimum working quantities of flammable substances at the point of use</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span>Removing combustible waste materials regularly (good housekeeping) to reduce fuel loading</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span>Using non-combustible or fire-retardant materials wherever reasonably practicable</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span>Installing firestopping where cables, pipes, or ducts penetrate fire-resistant barriers to prevent fire spread through concealed spaces</span>
                </li>
              </ul>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Electrical Trade Focus: Cable Sheathing as Fuel</p>
                <p className="text-sm text-white/80">
                  PVC (polyvinyl chloride) is the most common sheathing material for electrical cables
                  in the UK. PVC is a thermoplastic that will burn when exposed to sufficient heat,
                  producing thick black smoke and hydrogen chloride gas (a toxic, corrosive gas). LSZH
                  (Low Smoke Zero Halogen) cables are specified in certain applications &mdash;
                  particularly escape routes, public buildings, and underground railways &mdash;
                  because they produce significantly less smoke and no halogenated gases when they
                  burn. Understanding that cable sheathing itself is a fuel source is important for
                  electricians: a cable fault that generates sustained heat does not need any other
                  fuel source to start a fire &mdash; the cable&rsquo;s own sheathing and insulation
                  can be the fuel.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 04: Oxygen & the Role of the Oxidising Agent        */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 text-sm font-bold border border-rose-500/20">04</span>
              Oxygen &amp; the Role of the Oxidising Agent
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The third side of the fire triangle is <strong>oxygen</strong>, or more broadly, the
                <strong> oxidising agent</strong>. Combustion is an oxidation reaction &mdash; the fuel
                reacts with an oxidiser, releasing energy in the form of heat and light. In the vast
                majority of fire situations, the oxidiser is the oxygen present in normal atmospheric
                air.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 sm:p-6 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-4 text-center">Oxygen Concentration &amp; Fire Behaviour</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-2xl font-bold text-rose-400">20.9%</p>
                    <p className="text-white/70 text-xs">Normal oxygen concentration in atmospheric air. This is the baseline &mdash; fires behave &ldquo;normally&rdquo; at this level</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-2xl font-bold text-rose-400">~16%</p>
                    <p className="text-white/70 text-xs">Approximate minimum oxygen concentration for sustained flaming combustion. Below this level, most fires will self-extinguish</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-2xl font-bold text-rose-400">23.5%</p>
                    <p className="text-white/70 text-xs">The threshold above which an atmosphere is classified as oxygen-enriched. Fire risk increases dramatically above this level</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-2xl font-bold text-rose-400">100%</p>
                    <p className="text-white/70 text-xs">Pure oxygen. Materials that are barely combustible in normal air can burn with explosive ferocity in pure oxygen. Steel and iron can burn</p>
                  </div>
                </div>
              </div>

              <p>
                Normal atmospheric air consists of approximately 78% nitrogen, 20.9% oxygen, 0.9%
                argon, 0.04% carbon dioxide, and trace amounts of other gases. The 20.9% oxygen
                concentration is the environment in which most materials&rsquo; fire behaviour has
                been tested and rated. Fire generally requires a minimum oxygen concentration of
                approximately <strong>16%</strong> to sustain flaming combustion. Below this level,
                most fires will be extinguished &mdash; although smouldering combustion can persist
                at lower oxygen concentrations, and some materials with high oxygen content in their
                molecular structure can continue to burn.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Danger: Oxygen-Enriched Atmospheres</p>
                </div>
                <p className="text-sm text-white/80">
                  An oxygen-enriched atmosphere (above 23.5%) is extremely dangerous. The effects are
                  dramatic and disproportionate to the increase in concentration:
                </p>
                <ul className="space-y-2 text-sm text-white/70 mt-3">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                    <span>Materials that are normally difficult or impossible to ignite can catch fire easily</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                    <span>The rate of burning increases dramatically &mdash; fires burn hotter, faster, and more fiercely</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                    <span>Clothing, hair, and skin can ignite with far less energy input</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                    <span>Extinguishing a fire becomes significantly more difficult</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                    <span>In pure oxygen, even metals such as steel and iron can burn</span>
                  </li>
                </ul>
              </div>

              <p>
                Sources of additional oxygen that can create oxygen-enriched atmospheres in the
                workplace include:
              </p>

              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Compressed oxygen cylinders</strong> &mdash; used in oxy-acetylene welding and cutting, medical applications, and some industrial processes. A leaking regulator or open valve can quickly enrich the surrounding atmosphere</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Piped oxygen systems</strong> &mdash; found in hospitals, laboratories, dental surgeries, and some manufacturing processes. Leaking joints, damaged pipework, or improper maintenance can lead to localised oxygen enrichment</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Oxidising chemicals</strong> &mdash; substances that release oxygen when they decompose or react. Examples include hydrogen peroxide, potassium permanganate, and sodium hypochlorite (bleach). These can sustain combustion even in otherwise oxygen-depleted environments</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                  <span><strong>Leaking equipment</strong> &mdash; oxygen can leak from damaged hoses, poorly maintained regulators, or cracked fittings on oxy-fuel equipment. Because oxygen is odourless and colourless, leaks can go undetected without atmospheric monitoring</span>
                </li>
              </ul>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Oxygen and Electrical Environments</p>
                <p className="text-sm text-white/80">
                  Electricians should be particularly aware of oxygen enrichment risks when working in
                  or near medical facilities, laboratories, and any location where compressed gases
                  are stored or used. An apparently routine electrical task &mdash; such as replacing
                  a light fitting or installing a socket outlet &mdash; can become extremely hazardous
                  if the atmosphere is oxygen-enriched due to a nearby leak. Even the small arc
                  produced by operating a light switch can be sufficient to ignite clothing in an
                  oxygen-enriched atmosphere. If you suspect oxygen enrichment, evacuate the area
                  immediately, ventilate the space, and do not operate any electrical equipment
                  until the atmosphere has been tested and confirmed safe.
                </p>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Critical Safety Rule:</strong> Never use oxygen to
                  &ldquo;freshen&rdquo; the air in a confined or poorly ventilated space. This is a
                  known cause of fatal fires. Oxygen cylinders must only be used for their intended
                  purpose. If a space needs ventilation, use mechanical ventilation with normal
                  atmospheric air. Compressed oxygen must never be used as a substitute for
                  compressed air in any application &mdash; including pneumatic tools, tyre inflation,
                  or dust blowing.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ============================================================ */}
        {/*  SECTION 05: The Fire Tetrahedron                            */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 text-sm font-bold border border-rose-500/20">05</span>
              The Fire Tetrahedron
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                While the fire triangle is an excellent model for understanding the basic requirements
                of fire, modern fire science has identified a fourth element that is necessary for
                sustained flaming combustion: the <strong>chemical chain reaction</strong>. This
                expanded model is known as the <strong>fire tetrahedron</strong> (a tetrahedron is a
                four-sided solid, like a pyramid with a triangular base).
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 sm:p-6 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-4 text-center">The Fire Tetrahedron: Four Elements</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                    <Thermometer className="h-5 w-5 text-rose-400 mx-auto mb-1" />
                    <p className="text-xs font-semibold text-white">HEAT</p>
                    <p className="text-[10px] text-white/60 mt-1">Ignition source</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                    <Flame className="h-5 w-5 text-rose-400 mx-auto mb-1" />
                    <p className="text-xs font-semibold text-white">FUEL</p>
                    <p className="text-[10px] text-white/60 mt-1">Combustible material</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                    <Wind className="h-5 w-5 text-rose-400 mx-auto mb-1" />
                    <p className="text-xs font-semibold text-white">OXYGEN</p>
                    <p className="text-[10px] text-white/60 mt-1">Oxidising agent</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                    <Triangle className="h-5 w-5 text-rose-400 mx-auto mb-1" />
                    <p className="text-xs font-semibold text-white">CHAIN REACTION</p>
                    <p className="text-[10px] text-white/60 mt-1">Free radical chain reaction</p>
                  </div>
                </div>
              </div>

              <p>
                The <strong>chemical chain reaction</strong> (more precisely, the <strong>uninhibited
                free radical chain reaction</strong>) is the self-sustaining process that occurs at
                the molecular level during combustion. When fuel is heated in the presence of oxygen,
                it breaks down into highly reactive molecular fragments called <strong>free
                radicals</strong>. These free radicals react with oxygen and with other fuel molecules,
                producing more free radicals in a branching chain reaction. Each reaction releases
                energy (heat), which sustains the breakdown of more fuel molecules, producing more
                free radicals, and so the cycle continues.
              </p>

              <p>
                For flaming combustion to be sustained, this chain reaction must be uninhibited &mdash;
                that is, the free radicals must be free to react and propagate. If the chain reaction
                is interrupted (by removing or neutralising the free radicals), the combustion process
                collapses even though heat, fuel, and oxygen may still be present.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Why This Matters:</strong> The fire tetrahedron
                  explains why certain fire extinguishing agents work. Specifically, it explains the
                  mechanism of action of agents that do not primarily work by cooling (removing heat),
                  smothering (removing oxygen), or starvation (removing fuel). These agents work by
                  chemically interrupting the chain reaction &mdash; a mechanism that the fire triangle
                  alone cannot explain.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <ShieldCheck className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Agents That Interrupt the Chain Reaction</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Halon (Now Banned)</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Halon (halogenated hydrocarbons such as Halon 1211 and Halon 1301) was one of
                      the most effective fire suppression agents ever developed. It worked primarily
                      by chemically interrupting the chain reaction: halon molecules decompose in the
                      flame to release halogen atoms (bromine, fluorine) that react with and neutralise
                      the free radicals sustaining combustion. Halon was banned from general use under
                      the Montreal Protocol due to its severe ozone-depleting properties. It is now
                      only permitted in critical applications where no effective alternative exists
                      (certain military, aviation, and nuclear applications).
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Dry Powder (Dry Chemical)</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Dry powder extinguishers (typically containing sodium bicarbonate, potassium
                      bicarbonate, or monoammonium phosphate) work through multiple mechanisms, but
                      their primary mode of action is interruption of the chemical chain reaction.
                      The fine powder particles decompose in the flame, releasing chemical species that
                      react with and neutralise the free radicals. Dry powder also provides some
                      smothering effect and some cooling effect, but chain reaction interruption is the
                      dominant mechanism. This is why dry powder can suppress fires that are difficult
                      to extinguish by cooling or smothering alone &mdash; including gas fires and
                      certain chemical fires.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Clean Agents (Halon Replacements)</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Following the ban on halon, several replacement agents have been developed. These
                      include halocarbon agents (such as FM-200/HFC-227ea and Novec 1230/FK-5-1-12)
                      and inert gas systems (such as IG-541/Inergen, IG-55/Argonite). Halocarbon
                      agents work partly by chain reaction interruption and partly by heat absorption.
                      Inert gas systems work primarily by oxygen dilution (reducing the oxygen
                      concentration below the level needed to sustain combustion). Clean agent systems
                      are commonly installed to protect electrical and electronic equipment, server
                      rooms, data centres, and telecommunications facilities where water-based
                      suppression would cause unacceptable damage.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Triangle vs. Tetrahedron: When to Use Which</p>
                <p className="text-sm text-white/80">
                  The fire triangle remains the standard model for teaching fire prevention, fire risk
                  assessment, and basic firefighting. It is used in CITB Site Safety Plus courses, IOSH
                  courses, fire marshal training, and most workplace fire awareness programmes. The fire
                  tetrahedron is used when a more complete understanding of combustion chemistry is
                  required &mdash; for example, when selecting suppression systems, understanding why
                  certain extinguishing agents work on particular fire types, or when studying fire
                  science at a more advanced level. Both models are correct; the tetrahedron is simply
                  more comprehensive.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 06: Applying the Fire Triangle                      */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 text-sm font-bold border border-rose-500/20">06</span>
              Applying the Fire Triangle to Prevention &amp; Firefighting
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The true value of the fire triangle is not as an abstract model but as a practical
                decision-making tool. Every fire prevention measure and every firefighting action can
                be understood in terms of which side (or sides) of the triangle it addresses. By
                systematically considering all three sides, you can develop a comprehensive approach to
                fire safety in any environment.
              </p>

              {/* Fire Triangle Diagram */}
              <div className="my-6 p-4 sm:p-6 rounded-xl bg-white/[0.02] border border-rose-500/20">
                <h3 className="text-sm font-semibold text-rose-400 mb-4 flex items-center gap-2">
                  <Flame className="h-4 w-4" />
                  The Fire Triangle
                </h3>
                <div className="relative mx-auto" style={{ maxWidth: "320px" }}>
                  {/* Top vertex: HEAT */}
                  <div className="flex justify-center mb-2">
                    <div className="bg-rose-500/20 border border-rose-500/40 rounded-lg px-4 py-2 text-center">
                      <Thermometer className="h-5 w-5 text-rose-400 mx-auto mb-1" />
                      <p className="text-xs font-bold text-rose-400">HEAT</p>
                      <p className="text-[10px] text-white/50">Ignition source</p>
                    </div>
                  </div>
                  {/* Connecting lines (visual representation using borders) */}
                  <div className="flex justify-center">
                    <div className="w-0 h-0 border-l-[140px] border-r-[140px] border-b-[100px] border-l-transparent border-r-transparent border-b-rose-500/20 sm:border-l-[160px] sm:border-r-[160px] sm:border-b-[120px]" />
                  </div>
                  {/* Bottom vertices: FUEL and OXYGEN */}
                  <div className="flex justify-between -mt-2 px-0 sm:px-2">
                    <div className="bg-rose-500/20 border border-rose-500/40 rounded-lg px-3 py-2 text-center">
                      <Flame className="h-5 w-5 text-rose-400 mx-auto mb-1" />
                      <p className="text-xs font-bold text-rose-400">FUEL</p>
                      <p className="text-[10px] text-white/50">Combustible<br />material</p>
                    </div>
                    <div className="bg-rose-500/20 border border-rose-500/40 rounded-lg px-3 py-2 text-center">
                      <Wind className="h-5 w-5 text-rose-400 mx-auto mb-1" />
                      <p className="text-xs font-bold text-rose-400">OXYGEN</p>
                      <p className="text-[10px] text-white/50">Oxidising<br />agent</p>
                    </div>
                  </div>
                  {/* Centre label */}
                  <div className="absolute inset-0 flex items-center justify-center" style={{ top: "45%" }}>
                    <div className="bg-rose-500/30 border border-rose-500/50 rounded-full px-3 py-1">
                      <p className="text-[10px] font-bold text-white">FIRE</p>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-white/50 text-center mt-4">
                  Remove any one element and the fire cannot exist. This is the basis of all fire prevention and firefighting.
                </p>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 sm:p-6 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-4">Firefighting Strategies by Triangle Side</p>
                <div className="space-y-4">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Thermometer className="h-5 w-5 text-blue-400" />
                      <p className="text-sm font-semibold text-blue-400">Remove HEAT &mdash; Cooling</p>
                    </div>
                    <p className="text-sm text-white/80 mb-3">
                      Reducing the temperature of the burning material below its ignition point stops
                      the combustion reaction. This is the most common firefighting strategy.
                    </p>
                    <ul className="space-y-2 text-sm text-white/70">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-blue-400" />
                        <span><strong>Water</strong> &mdash; the most effective cooling agent. Water absorbs enormous amounts of heat as it evaporates (latent heat of vaporisation: 2,260 kJ/kg). Applied as a jet, spray, or mist</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-blue-400" />
                        <span><strong>Foam</strong> &mdash; cools the fuel surface while also providing an oxygen-excluding blanket</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-blue-400" />
                        <span><strong>Water mist systems</strong> &mdash; fine water droplets maximise the cooling effect with minimal water volume, reducing water damage</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Flame className="h-5 w-5 text-amber-400" />
                      <p className="text-sm font-semibold text-amber-400">Remove FUEL &mdash; Starvation / Isolation</p>
                    </div>
                    <p className="text-sm text-white/80 mb-3">
                      Removing the fuel from the fire, or removing the fire from the fuel, starves the
                      combustion reaction.
                    </p>
                    <ul className="space-y-2 text-sm text-white/70">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-amber-400" />
                        <span><strong>Removing combustible materials</strong> from the path of an advancing fire (creating a firebreak)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-amber-400" />
                        <span><strong>Shutting off gas supply</strong> to a gas fire (turning off the valve removes the fuel)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-amber-400" />
                        <span><strong>Draining flammable liquids</strong> away from the fire area</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-amber-400" />
                        <span><strong>Fire compartmentation</strong> in buildings (fire-resistant walls, floors, doors, and firestopping) prevents fire spread by isolating fuel into compartments</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Wind className="h-5 w-5 text-green-400" />
                      <p className="text-sm font-semibold text-green-400">Remove OXYGEN &mdash; Smothering</p>
                    </div>
                    <p className="text-sm text-white/80 mb-3">
                      Excluding oxygen from the fire or reducing the oxygen concentration below the
                      level needed for combustion.
                    </p>
                    <ul className="space-y-2 text-sm text-white/70">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span><strong>Fire blankets</strong> &mdash; physically cover the fire, excluding air. Suitable for small fires, particularly cooking oil fires and clothing fires</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span><strong>CO&#8322; (carbon dioxide) extinguishers</strong> &mdash; displace oxygen by flooding the area with inert CO&#8322; gas. Particularly suitable for electrical fires as CO&#8322; is non-conductive and leaves no residue</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span><strong>Foam extinguishers</strong> &mdash; the foam blanket floats on burning liquid surfaces, excluding air (also provides cooling)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span><strong>Inert gas flooding systems</strong> &mdash; fixed systems that flood an enclosed space with inert gas (nitrogen, argon, or mixtures) to reduce oxygen below 16%</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Triangle className="h-5 w-5 text-purple-400" />
                      <p className="text-sm font-semibold text-purple-400">Break the CHAIN REACTION (Tetrahedron)</p>
                    </div>
                    <p className="text-sm text-white/80 mb-3">
                      Interrupting the chemical chain reaction at the molecular level.
                    </p>
                    <ul className="space-y-2 text-sm text-white/70">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-purple-400" />
                        <span><strong>Dry powder extinguishers</strong> &mdash; the primary mechanism is chain reaction interruption by neutralising free radicals</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-purple-400" />
                        <span><strong>Clean agent systems</strong> &mdash; halocarbon agents (FM-200, Novec 1230) partially work by chain reaction interruption</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Practical Application for Electrical Workers</p>
                <p className="text-sm text-white/80 mb-3">
                  Electricians can apply the fire triangle to every aspect of their work. Consider these
                  everyday examples:
                </p>
                <ul className="space-y-2 text-sm text-white/70">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong>Controlling heat:</strong> Correctly sizing cables for their load current (prevents overheating), torquing terminations to manufacturer specifications (prevents high-resistance joints), installing AFDDs (detects and interrupts arcing faults), regular thermographic inspection (identifies hotspots before they cause fires)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong>Controlling fuel:</strong> Installing firestopping at all cable penetrations through fire-resistant barriers, using LSZH cables in high-risk locations, maintaining separation between electrical equipment and stored combustible materials, good housekeeping in distribution boards and risers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong>Controlling oxygen:</strong> Being aware of oxygen enrichment risks (compressed gas storage areas, medical facilities), not storing combustible materials near oxygen cylinder stores, ensuring adequate ventilation in enclosed electrical plant rooms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong>Emergency response:</strong> Knowing which extinguisher to use for an electrical fire (CO&#8322; for live equipment, dry powder as alternative), knowing to isolate the electrical supply before attempting to fight an electrical fire where possible, understanding that water must never be used on live electrical equipment</span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Key Takeaway:</strong> The fire triangle is not
                  just an exam topic. It is a mental framework that should inform every decision you
                  make as an electrician. Before starting any task, consider: what are the ignition
                  sources? What are the fuel sources? Is the oxygen environment normal? Are the
                  existing controls sufficient? If a fire started, how would I respond? This
                  systematic approach to fire risk is exactly what the Regulatory Reform (Fire Safety)
                  Order 2005 requires of every person who has responsibilities for fire safety in
                  non-domestic premises.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

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
            <Link to="../fire-safety-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 1
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../fire-safety-module-1-section-2">
              The Classes of Fire
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>

      </article>
    </div>
  );
}
