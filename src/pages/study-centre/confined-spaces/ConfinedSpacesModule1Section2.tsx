import {
  ArrowLeft,
  DoorOpen,
  CheckCircle,
  AlertTriangle,
  Factory,
  Wrench,
  HardHat,
  Building2,
  Wheat,
  Ship,
  Search,
  Eye,
  ClipboardList,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

/* ──────────────────────────────────────────────
   Quick Check Questions (3)
   ────────────────────────────────────────────── */
const quickCheckQuestions = [
  {
    id: "cs-example-industrial",
    question:
      "A large open-topped storage tank is 2.5 metres deep with a single access ladder. There is no mechanical ventilation. Would this be classified as a confined space?",
    options: [
      "No — it is open-topped so air can circulate freely",
      "Yes — it has limited access/egress, is substantially enclosed, and has a foreseeable risk of oxygen depletion or toxic atmosphere accumulation",
      "Only if someone has already been injured inside it",
      "Only if it contains hazardous chemicals",
    ],
    correctIndex: 1,
    explanation:
      "An open-topped tank can still be a confined space. The depth restricts natural ventilation at the bottom, heavier-than-air gases can accumulate, and the single access point limits escape. The legal test is whether the space is substantially enclosed AND has a reasonably foreseeable specified risk — not whether it has a lid.",
  },
  {
    id: "cs-example-missed",
    question:
      "Which of the following is an example of a confined space that people commonly fail to identify?",
    options: [
      "A well-ventilated open-plan office",
      "A large cold store with mechanical cooling and limited natural ventilation",
      "An outdoor car park",
      "A standard domestic bathroom with an extractor fan",
    ],
    correctIndex: 1,
    explanation:
      "Cold stores are frequently missed because they appear to be 'normal rooms'. However, the mechanical cooling system can displace oxygen (particularly with CO₂ or nitrogen-based refrigerants), natural ventilation is deliberately eliminated to maintain temperature, and the sealed construction traps any gas leaks. Several fatalities in the UK have occurred in cold stores.",
  },
  {
    id: "cs-register",
    question:
      "What is the primary purpose of a site-specific confined space register?",
    options: [
      "To record the names of everyone who has entered confined spaces",
      "To list all identified confined spaces on a site so that risks are assessed, controls are planned, and no space is overlooked",
      "To satisfy insurance requirements only",
      "To replace the need for individual risk assessments",
    ],
    correctIndex: 1,
    explanation:
      "A confined space register is a live document that identifies every confined space on a site, records the hazards present, states the control measures required, and ensures that no space is overlooked during planning. It does NOT replace individual risk assessments — each entry on the register must have its own risk assessment and safe system of work.",
  },
];

/* ──────────────────────────────────────────────
   FAQ Section (4)
   ────────────────────────────────────────────── */
const faqs = [
  {
    question:
      "Can a room inside a building be classed as a confined space?",
    answer:
      "Yes. Any room or enclosed area can be a confined space if it is substantially enclosed, has limited means of entry or exit, and presents a reasonably foreseeable risk of a specified hazard such as oxygen depletion, toxic gas accumulation, flooding, or entrapment in a free-flowing solid. Common building examples include unventilated plant rooms, basement switch rooms with SF₆ equipment, ceiling voids above industrial processes, and cold stores. The HSE Approved Code of Practice L101 makes clear that the definition is based on the combination of enclosure and risk — not on the size, shape, or traditional appearance of the space.",
  },
  {
    question:
      "Does the depth of an excavation determine whether it is a confined space?",
    answer:
      "There is no single depth that automatically makes an excavation a confined space. However, the HSE guidance uses 1.2 metres as a practical threshold: below this depth, natural air movement is significantly reduced and heavier-than-air contaminants (such as CO₂ from decomposing organic matter, or petrol vapour from leaking underground storage tanks) can accumulate at the bottom. Any trench or excavation deeper than 1.2 metres should be assessed for confined space hazards. Shallower excavations may also qualify if there is a foreseeable risk — for example, a 900 mm trench next to a leaking gas main.",
  },
  {
    question:
      "How often should a confined space register be reviewed?",
    answer:
      "The register should be reviewed whenever there is a material change to the site — new construction, demolition, changes to processes, installation or removal of plant, or after any incident involving a confined space. As a minimum, many organisations review the register annually. For dynamic sites such as construction projects, the register should be updated at each phase of work. It is a live working document, not a one-off exercise. The duty holder under the Confined Spaces Regulations 1997 has a continuing obligation to identify all confined spaces and ensure they are managed.",
  },
  {
    question:
      "Are permit-to-work systems required for every confined space entry?",
    answer:
      "Not legally in every case, but the HSE Approved Code of Practice (L101) strongly recommends a permit-to-work system for all confined space entries where there is a risk to health and safety. In practice, the vast majority of UK employers and principal contractors require a written permit for every entry. The permit ensures that hazards have been identified, controls are in place, atmospheric monitoring has been completed, rescue arrangements are confirmed, and there is a formal record of the entry. For high-risk entries (such as those involving toxic atmospheres, hot work, or entry into sewers), a permit is considered essential and is effectively a legal requirement through the duty to have a safe system of work.",
  },
];

/* ──────────────────────────────────────────────
   Quiz Questions (8)
   ────────────────────────────────────────────── */
const quizQuestions = [
  {
    id: 1,
    question:
      "Which of the following is NOT typically classified as an industrial confined space?",
    options: [
      "A reaction vessel in a chemical plant",
      "A large open-plan warehouse with roller shutter doors at each end",
      "A grain silo",
      "A steam boiler during maintenance",
    ],
    correctAnswer: 1,
    explanation:
      "A large open-plan warehouse with roller shutter doors at both ends is well ventilated with multiple unrestricted access points. It is not substantially enclosed in a way that creates a reasonably foreseeable specified risk. Reaction vessels, silos, and boilers are classic confined spaces due to limited access, restricted ventilation, and the potential for toxic or oxygen-depleted atmospheres.",
  },
  {
    id: 2,
    question:
      "An electrician is asked to work inside a lift shaft to replace wiring. Which confined space characteristics does a lift shaft present?",
    options: [
      "Substantially enclosed with limited access, risk of falling, and potential for oxygen depletion if ventilation is poor",
      "Only a fall hazard — it is not a confined space",
      "A confined space only when the lift car is at the bottom",
      "A confined space only in buildings taller than 10 storeys",
    ],
    correctAnswer: 0,
    explanation:
      "A lift shaft is substantially enclosed with limited access points (typically a single door at each floor level). It can present risks of oxygen depletion (especially if fire suppression gases are present), falling objects, and entrapment if the lift car moves. It meets the legal definition of a confined space regardless of building height.",
  },
  {
    id: 3,
    question:
      "At what depth does the HSE guidance suggest that an excavation should be assessed for confined space hazards?",
    options: [
      "Any depth",
      "Deeper than 0.6 metres",
      "Deeper than 1.2 metres",
      "Deeper than 2.0 metres",
    ],
    correctAnswer: 2,
    explanation:
      "The HSE uses 1.2 metres as a practical threshold. Below this depth, natural air circulation is significantly reduced and heavier-than-air gases can accumulate at the bottom. However, shallower excavations may also qualify as confined spaces if there is a foreseeable specified risk, such as proximity to a leaking gas main.",
  },
  {
    id: 4,
    question:
      "Which of the following utility spaces is a common example of a confined space?",
    options: [
      "An above-ground electricity meter cupboard",
      "A sewer accessed via a manhole",
      "A roadside cable joint box with a removable cover at ground level",
      "A standard domestic consumer unit enclosure",
    ],
    correctAnswer: 1,
    explanation:
      "Sewers are one of the most hazardous confined spaces. They are substantially enclosed with limited access (typically manholes), and they present multiple risks including toxic gases (hydrogen sulphide, methane, carbon monoxide), oxygen depletion, sudden flooding, and biological hazards. Fatalities in sewers account for a significant proportion of all confined space deaths in the UK.",
  },
  {
    id: 5,
    question:
      "During a site walkround to identify confined spaces, which of the following steps should be completed FIRST?",
    options: [
      "Issue permits to work for all identified spaces",
      "Carry out atmospheric monitoring inside each space",
      "Review existing drawings, process information, and previous survey records to understand what spaces exist on site",
      "Arrange rescue equipment at each identified space",
    ],
    correctAnswer: 2,
    explanation:
      "The first step in any confined space identification exercise is a desk-based review of existing information: drawings, P&IDs, asset registers, previous surveys, and process information. This builds a preliminary list of potential confined spaces before anyone goes near them. Physical walkrounds, atmospheric monitoring, and control measures come later in the process.",
  },
  {
    id: 6,
    question:
      "A spray booth in a factory has mechanical extract ventilation that runs during normal operations. Could it become a confined space?",
    options: [
      "No — it has mechanical ventilation so it cannot be a confined space",
      "Yes — if the ventilation fails or is switched off, flammable or toxic vapours can accumulate rapidly in the enclosed booth",
      "Only if the booth is smaller than 2 cubic metres",
      "Only if someone enters the booth while spraying is in progress",
    ],
    correctAnswer: 1,
    explanation:
      "Spray booths are a commonly missed confined space. During normal operation with functioning ventilation, the atmosphere may be adequately controlled. However, if the ventilation fails, is switched off for maintenance, or is inadequate for the solvents being used, flammable and toxic vapour concentrations can build rapidly. The booth is substantially enclosed by design (to contain overspray) and typically has limited access points.",
  },
  {
    id: 7,
    question:
      "What information should a confined space register contain for each identified space?",
    options: [
      "Only the location and a photograph",
      "The location, description, identified hazards, required control measures, and reference to the specific risk assessment",
      "Only the name of the person responsible for the space",
      "A list of people who have previously entered the space",
    ],
    correctAnswer: 1,
    explanation:
      "A confined space register should contain, as a minimum: the location and unique identifier of each space, a description of the space, the hazards identified, the control measures required for entry, a reference to the specific risk assessment and safe system of work, and the date of last review. It is a planning and management tool that links each identified space to its specific controls.",
  },
  {
    id: 8,
    question:
      "Which of the following agricultural confined spaces has caused multiple fatalities in the UK due to toxic gas exposure?",
    options: [
      "An open field grain store with natural ventilation",
      "A slurry pit or slurry tank",
      "A tractor cab",
      "A standard farm workshop",
    ],
    correctAnswer: 1,
    explanation:
      "Slurry pits and slurry tanks are among the most dangerous confined spaces in agriculture. Decomposing slurry produces hydrogen sulphide (H₂S), methane (CH₄), carbon dioxide (CO₂), and ammonia (NH₃). H₂S is particularly lethal — it can cause unconsciousness in a single breath at high concentrations. Multiple fatalities have occurred in the UK when farmers or workers have entered slurry pits without atmospheric monitoring or rescue arrangements, often in attempts to rescue animals or other people who have already collapsed.",
  },
];

/* ══════════════════════════════════════════════
   Component
   ══════════════════════════════════════════════ */
export default function ConfinedSpacesModule1Section2() {
  useSEO({
    title:
      "Common Confined Space Examples | Confined Spaces Module 1.2",
    description:
      "Industrial, utility, construction, building, agricultural, and marine confined space examples. How to identify confined spaces on a walkround, commonly missed examples, and the site-specific confined space register.",
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* ── Sticky Header ── */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../confined-spaces-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* ── Page Title ── */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-cyan-400/20 border border-cyan-500/30 mb-4">
            <DoorOpen className="h-7 w-7 text-cyan-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-3 mx-auto">
            <span className="text-cyan-400 text-xs font-semibold">
              MODULE 1 &middot; SECTION 2
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Common Confined Space Examples
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Industrial, utility, construction, building, agricultural, and
            marine examples &mdash; plus how to identify confined spaces on a
            walkround and build a site-specific register
          </p>
        </header>

        {/* ── Quick Summary Boxes ── */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-cyan-500/5 border-l-2 border-cyan-500/50">
            <p className="text-cyan-400 text-base font-medium mb-2">
              In 30 Seconds
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>6 categories:</strong> Industrial, utility,
                construction, building, agricultural, marine
              </li>
              <li>
                <strong>Key test:</strong> Substantially enclosed + foreseeable
                specified risk
              </li>
              <li>
                <strong>Commonly missed:</strong> Cold stores, spray booths,
                large rooms with poor ventilation
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-cyan-500/5 border-l-2 border-cyan-500/50">
            <p className="text-cyan-400/90 text-base font-medium mb-2">
              Key Facts
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Excavations:</strong> Assess for confined space hazards
                below 1.2&thinsp;m depth
              </li>
              <li>
                <strong>Sewers:</strong> Among the most hazardous &mdash;
                H₂S, CH₄, flooding risk
              </li>
              <li>
                <strong>Register:</strong> A live document &mdash; reviewed
                after every site change
              </li>
            </ul>
          </div>
        </div>

        {/* ── Learning Outcomes ── */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">
            Learning Outcomes
          </h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify common confined spaces across six workplace categories",
              "Explain why each example meets the legal definition of a confined space",
              "Describe the specific hazards associated with different types of confined space",
              "Carry out a systematic confined space identification walkround",
              "Recognise examples that are commonly overlooked, such as cold stores and spray booths",
              "Explain the purpose, content, and maintenance of a site-specific confined space register",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-cyan-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* ═══════════════════════════════════════
            SECTION 01 — Industrial Confined Spaces
           ═══════════════════════════════════════ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">01</span>
            Industrial Confined Spaces
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Industrial confined spaces are found across manufacturing,
                processing, energy, and heavy industry. They are among the most
                commonly recognised confined spaces, yet they still account for
                a significant proportion of fatalities because complacency and
                familiarity breed shortcuts.
              </p>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Factory className="h-5 w-5 text-cyan-400" />
                  <p className="text-sm font-medium text-cyan-400">
                    Common Industrial Examples
                  </p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  The following are standard examples found across UK industrial
                  sites. Each one is substantially enclosed, has limited
                  access/egress, and presents at least one foreseeable specified
                  risk.
                </p>
              </div>

              {/* Storage Tanks */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Storage Tanks
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Used for storing liquids, chemicals, fuels, water, or
                      waste products
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Access:</strong> Typically a
                      single manway (manhole) or top hatch
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Hazards:</strong> Residual
                      chemicals, toxic fumes from coatings, oxygen depletion
                      from rusting or purging, flammable vapours, drowning risk
                      from retained liquid or sudden inflow
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Even &ldquo;empty&rdquo; tanks can contain lethal
                      atmospheres from residues, sludge, or corrosion
                    </span>
                  </li>
                </ul>
              </div>

              {/* Silos */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Silos</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Tall, enclosed vessels for storing bulk materials (grain,
                      cement, powders, pellets)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Hazards:</strong> Engulfment
                      in free-flowing solids, oxygen depletion from
                      decomposition, dust explosions, bridging (a crust forms
                      over a void that can collapse under a person&rsquo;s
                      weight)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Access is usually from the top via a ladder or from a
                      restricted base outlet
                    </span>
                  </li>
                </ul>
              </div>

              {/* Reaction & Process Vessels */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Reaction Vessels &amp; Process Vessels
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Enclosed vessels where chemical reactions or mixing take
                      place (e.g., autoclaves, mixers, reactors)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Hazards:</strong> Toxic
                      residues, exothermic reactions if cleaning is incomplete,
                      oxygen-depleted or enriched atmospheres, mechanical hazards
                      from agitators or stirrers
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Must be isolated, drained, purged, and atmospherically
                      tested before entry
                    </span>
                  </li>
                </ul>
              </div>

              {/* Boilers & Condensers */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Boilers &amp; Condensers
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Large boilers (particularly fire-tube and water-tube types)
                      require internal inspection and maintenance
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Hazards:</strong> Extreme
                      heat (residual), oxygen depletion from rusting or
                      nitrogen purging, tight internal spaces with tubes and
                      baffles limiting movement and escape
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Condensers share similar characteristics &mdash; enclosed,
                      restricted access, potential for retained chemical residues
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    The &ldquo;Empty Tank&rdquo; Myth
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  An &ldquo;empty&rdquo; tank is never truly empty. Residual
                  liquids, sludge, scale, and coatings can release toxic or
                  flammable vapours. Rusting steel consumes oxygen. Purging with
                  nitrogen or CO₂ creates an oxygen-depleted atmosphere that
                  can kill within seconds.{" "}
                  <strong className="text-white">
                    Always treat every tank as hazardous until atmospheric
                    monitoring proves otherwise.
                  </strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            SECTION 02 — Utility Confined Spaces
           ═══════════════════════════════════════ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">02</span>
            Utility Confined Spaces
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Utility infrastructure runs beneath and between every town and
                city. Workers in water, gas, electricity, and
                telecommunications regularly encounter confined spaces that are
                some of the most dangerous working environments in the UK.
              </p>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Wrench className="h-5 w-5 text-cyan-400" />
                  <p className="text-sm font-medium text-cyan-400">
                    Common Utility Examples
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Utility confined spaces often have unpredictable atmospheres
                  because the conditions change with weather, flow rates,
                  seasonal temperature, and upstream activity.
                </p>
              </div>

              {/* Sewers */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Sewers &amp; Manholes
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Hazards:</strong> Hydrogen
                      sulphide (H₂S &mdash; the &ldquo;silent killer&rdquo;),
                      methane (CH₄), carbon monoxide (CO), oxygen depletion,
                      sudden flooding, biological hazards, rat infestation
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      H₂S deadens the sense of smell at higher concentrations
                      &mdash; you <strong className="text-white">cannot rely on
                      smell</strong> to detect it
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Access is restricted to manholes, often with vertical
                      ladders and limited escape routes
                    </span>
                  </li>
                </ul>
              </div>

              {/* Inspection Chambers */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Inspection Chambers &amp; Valve Chambers
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Small underground chambers providing access to pipework,
                      valves, or junctions
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Hazards:</strong> Very
                      restricted internal dimensions, poor ventilation, gas
                      migration from surrounding ground, flooding
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Often overlooked because of their small size and
                      &ldquo;routine&rdquo; nature
                    </span>
                  </li>
                </ul>
              </div>

              {/* Water & Gas Mains */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Water Mains, Gas Mains &amp; Pumping Stations
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Large-diameter water mains can be entered for cleaning,
                      inspection, or repair
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Hazards:</strong> Drowning
                      from sudden inflow, oxygen depletion from biological
                      growth, disorientation in long pipe runs, limited
                      communication with the surface
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Pumping stations are enclosed below-ground chambers
                      containing mechanical plant, electrical equipment, and
                      often foul water or sewage
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Sewer Fatalities
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Sewers have caused more confined space fatalities in the UK
                  than any other single category of space. The combination of
                  H₂S (which paralyses the olfactory nerve at high
                  concentrations, removing your ability to smell it), sudden
                  flooding from upstream rainfall, and oxygen depletion makes
                  them exceptionally dangerous.{" "}
                  <strong className="text-white">
                    Never enter a sewer or manhole without continuous atmospheric
                    monitoring and a trained standby person at the surface.
                  </strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── InlineCheck after Section 02 ── */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ═══════════════════════════════════════
            SECTION 03 — Construction Confined Spaces
           ═══════════════════════════════════════ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">03</span>
            Construction Confined Spaces
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Construction sites generate confined spaces throughout every
                phase of a project &mdash; from groundworks and piling through
                to fit-out and commissioning. Many construction confined spaces
                are temporary, which makes them easy to miss in risk assessments
                that were written before the space existed.
              </p>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <HardHat className="h-5 w-5 text-cyan-400" />
                  <p className="text-sm font-medium text-cyan-400">
                    Common Construction Examples
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Construction confined spaces are often temporary or
                  changing &mdash; the confined space register must be updated as
                  the project progresses through each phase.
                </p>
              </div>

              {/* Excavations & Trenches */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Excavations &amp; Trenches (Deeper Than 1.2&thinsp;m)
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Below 1.2&thinsp;m depth, natural air circulation is
                      significantly reduced
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Hazards:</strong>{" "}
                      Heavier-than-air gases (CO₂, petrol vapour) settle at the
                      bottom, leaking gas mains, contaminated ground producing
                      methane, oxygen depletion, collapse and entrapment
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Narrow trenches restrict movement and make self-rescue
                      extremely difficult
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Shallower excavations may also qualify if near a
                      contamination source (e.g., leaking underground fuel tank)
                    </span>
                  </li>
                </ul>
              </div>

              {/* Tunnels & Shafts */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Tunnels &amp; Shafts
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Used for services routing, transport infrastructure, and
                      mining
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Hazards:</strong> Extended
                      travel distances to the surface, limited emergency escape
                      routes, ground gas migration, flooding, ventilation
                      failure, collapse
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Vertical shafts present fall hazards in addition to
                      atmospheric risks
                    </span>
                  </li>
                </ul>
              </div>

              {/* Caissons & Piling Rigs */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Caissons &amp; Piling Rigs
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Caissons are watertight retaining structures used for
                      below-water-level construction &mdash; workers enter to
                      excavate or build inside them
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Hazards:</strong> Flooding
                      (sudden water ingress), pressure changes in pneumatic
                      caissons, oxygen depletion, limited egress
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Piling rigs create confined void spaces that may need to
                      be entered for inspection; bored pile casings can
                      accumulate ground gases
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-cyan-400">
                    Construction Design &amp; Management (CDM) 2015:
                  </strong>{" "}
                  Under CDM Regulations, the principal designer should identify
                  confined spaces at the design stage so that they can be
                  designed out where possible. Where they cannot be eliminated,
                  the principal contractor must ensure they are identified in
                  the construction phase plan and that safe systems of work are
                  in place before any entry.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            SECTION 04 — Building Confined Spaces
           ═══════════════════════════════════════ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">04</span>
            Building Confined Spaces
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Existing buildings contain numerous confined spaces that are
                encountered during maintenance, refurbishment, and inspection
                work. Electricians, HVAC engineers, plumbers, and building
                maintenance staff regularly work in these spaces &mdash; often
                without recognising them as confined.
              </p>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Building2 className="h-5 w-5 text-cyan-400" />
                  <p className="text-sm font-medium text-cyan-400">
                    Common Building Examples
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  These spaces are often accessed routinely and may not be
                  formally recognised as confined spaces in workplace risk
                  assessments. This is a common gap.
                </p>
              </div>

              {/* Ceiling Voids & Roof Spaces */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Ceiling Voids &amp; Roof Spaces
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Accessed for electrical work, data cabling, fire alarm
                      installation, and HVAC ducting
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Hazards:</strong> Heat
                      accumulation (especially in summer), poor ventilation,
                      asbestos-containing materials, falling through fragile
                      ceilings, restricted movement
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Can become confined spaces if processes below introduce
                      fumes, or if inert fire suppression systems are present
                    </span>
                  </li>
                </ul>
              </div>

              {/* Ducts & Risers */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Ducts &amp; Risers
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Vertical and horizontal service ducts carrying electrical
                      cables, pipework, and communications
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Hazards:</strong> Very tight
                      dimensions, no natural ventilation, dust accumulation,
                      heat from cables, risk of entrapment
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Vertical risers present fall hazards; horizontal ducts
                      may limit escape if a fire occurs
                    </span>
                  </li>
                </ul>
              </div>

              {/* Lift Shafts */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Lift Shafts
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Entered for lift installation, maintenance, and inspection
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Hazards:</strong> Falls
                      (often multi-storey), moving machinery (lift car,
                      counterweights, cables), entrapment between car and shaft
                      wall, potential for oxygen depletion if fire suppression
                      gases are present in the motor room
                    </span>
                  </li>
                </ul>
              </div>

              {/* Basements & Unventilated Rooms */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Basements &amp; Unventilated Rooms
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Below-ground basements may have limited natural
                      ventilation and can accumulate ground gases (radon,
                      methane) or heavier-than-air fumes
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Hazards:</strong> Flooding,
                      gas accumulation from underground sources, build-up of
                      fumes from solvent use or hot work, limited escape routes
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Unventilated switch rooms, plant rooms, and store rooms
                      can also become confined spaces depending on what is
                      stored or operating within them
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Electricians Take Note
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Electrical work frequently takes place in ceiling voids, ducts,
                  risers, lift shafts, and basement switch rooms. If you are
                  working in any of these spaces, consider whether it meets the
                  confined space definition.{" "}
                  <strong className="text-white">
                    If there is any doubt, treat it as a confined space and
                    follow the appropriate safe system of work.
                  </strong>{" "}
                  The consequences of getting this wrong are fatal.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            SECTION 05 — Agricultural Confined Spaces
           ═══════════════════════════════════════ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">05</span>
            Agricultural Confined Spaces
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Agriculture has one of the highest fatality rates of any UK
                industry, and confined space incidents are a significant
                contributor. Many farm workers are self-employed or work in
                small family businesses without formal health and safety
                management systems, making these incidents more likely.
              </p>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Wheat className="h-5 w-5 text-cyan-400" />
                  <p className="text-sm font-medium text-cyan-400">
                    Agricultural Examples
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Farm confined spaces are often accessed without any formal
                  risk assessment, permit, or atmospheric monitoring &mdash;
                  which is why fatality rates in agriculture remain
                  disproportionately high.
                </p>
              </div>

              {/* Grain Stores */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Grain Stores &amp; Silos
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Large enclosed structures for storing harvested grain,
                      animal feed, or seed
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Hazards:</strong>{" "}
                      Engulfment in free-flowing grain (a person can be buried
                      in under 5 seconds once grain flow starts), oxygen
                      depletion from decomposition, dust explosions, bridging
                      and crusting above voids
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Fumigation with phosphine adds an extremely toxic
                      atmospheric hazard
                    </span>
                  </li>
                </ul>
              </div>

              {/* Slurry Pits */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Slurry Pits &amp; Slurry Tanks
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Underground or partially covered pits storing animal waste
                      (slurry)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Hazards:</strong> Hydrogen
                      sulphide (H₂S), methane (CH₄), carbon dioxide (CO₂),
                      ammonia (NH₃), oxygen depletion, drowning
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Gas concentrations spike when slurry is agitated (mixed,
                      pumped, or disturbed) &mdash; this is when most fatalities
                      occur
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Multiple Fatality Events
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Slurry pits have caused multiple-fatality events in the UK
                  where a second or third person has been killed attempting to
                  rescue someone who has already collapsed.{" "}
                  <strong className="text-white">
                    H₂S at concentrations above 100&thinsp;ppm can cause
                    unconsciousness in a single breath and death within minutes.
                  </strong>{" "}
                  Attempting an unplanned rescue without breathing apparatus is
                  one of the most common causes of multiple confined space
                  deaths.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── InlineCheck after Section 05 ── */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ═══════════════════════════════════════
            SECTION 06 — Marine Confined Spaces
           ═══════════════════════════════════════ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">06</span>
            Marine Confined Spaces
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Ships, boats, offshore platforms, and dockside infrastructure
                contain some of the most hazardous confined spaces encountered
                in any industry. Marine confined spaces are governed by both
                the Confined Spaces Regulations 1997 (when in UK waters or
                dockside) and the Merchant Shipping and Fishing Vessels
                (Entry into Enclosed Spaces) Regulations 2022.
              </p>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Ship className="h-5 w-5 text-cyan-400" />
                  <p className="text-sm font-medium text-cyan-400">
                    Marine Examples
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Maritime confined space fatalities occur globally every year.
                  The International Maritime Organisation (IMO) has identified
                  enclosed space entry as one of the highest-risk activities on
                  board ships.
                </p>
              </div>

              {/* Ballast Tanks */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Ballast Tanks
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Double-bottom and wing tanks used to carry sea water for
                      ship stability
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Hazards:</strong> Severe
                      oxygen depletion from rusting (bare steel consumes oxygen
                      rapidly), toxic coating fumes, complex internal structure
                      (frames, brackets, lightening holes) making escape
                      extremely difficult, flooding
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Access is via small manholes, often requiring a person to
                      squeeze through tight openings
                    </span>
                  </li>
                </ul>
              </div>

              {/* Cargo Holds */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Cargo Holds
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Large enclosed spaces used for transporting bulk cargo,
                      containers, or packaged goods
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Hazards:</strong> Oxygen
                      depletion from cargo (e.g., fruit, grain, timber, coal
                      all consume oxygen), fumigation chemicals (phosphine,
                      methyl bromide), carbon monoxide from decomposition,
                      flammable atmospheres from certain cargoes
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Even &ldquo;empty&rdquo; cargo holds can retain residual
                      fumigant gases or oxygen-depleted atmospheres
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Rusting Steel &amp; Oxygen Depletion
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  The oxidation (rusting) of bare steel surfaces in ballast
                  tanks is one of the most common causes of oxygen depletion in
                  marine confined spaces. A freshly coated tank that has been
                  sealed can have its oxygen level reduced from the normal
                  20.9% to below 16% (the level at which impaired judgement
                  begins) within hours.{" "}
                  <strong className="text-white">
                    At 6% oxygen, death occurs within minutes.
                  </strong>{" "}
                  Always test the atmosphere before entry and maintain
                  continuous monitoring throughout.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            DIAGRAM 1 — Six Categories Overview
           ═══════════════════════════════════════ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">&nbsp;</span>
            Six Categories at a Glance
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              {
                icon: Factory,
                label: "Industrial",
                examples: "Tanks, silos, vessels, boilers, condensers",
                colour: "from-cyan-500/20 to-cyan-400/10",
                border: "border-cyan-500/30",
              },
              {
                icon: Wrench,
                label: "Utility",
                examples: "Sewers, manholes, chambers, mains, pumping stations",
                colour: "from-blue-500/20 to-blue-400/10",
                border: "border-blue-500/30",
              },
              {
                icon: HardHat,
                label: "Construction",
                examples: "Excavations, tunnels, shafts, caissons, piling",
                colour: "from-amber-500/20 to-amber-400/10",
                border: "border-amber-500/30",
              },
              {
                icon: Building2,
                label: "Building",
                examples: "Voids, ducts, risers, lift shafts, basements",
                colour: "from-purple-500/20 to-purple-400/10",
                border: "border-purple-500/30",
              },
              {
                icon: Wheat,
                label: "Agricultural",
                examples: "Grain stores, slurry pits, silage clamps",
                colour: "from-green-500/20 to-green-400/10",
                border: "border-green-500/30",
              },
              {
                icon: Ship,
                label: "Marine",
                examples: "Ballast tanks, cargo holds, chain lockers",
                colour: "from-sky-500/20 to-sky-400/10",
                border: "border-sky-500/30",
              },
            ].map((cat) => (
              <div
                key={cat.label}
                className={`bg-gradient-to-br ${cat.colour} border ${cat.border} rounded-xl p-4 text-center`}
              >
                <cat.icon className="h-6 w-6 mx-auto mb-2 text-white/80" />
                <p className="text-sm font-bold text-white mb-1">
                  {cat.label}
                </p>
                <p className="text-[11px] text-white/60 leading-snug">
                  {cat.examples}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════
            SECTION 07 — Identifying Confined Spaces
            on a Walkround
           ═══════════════════════════════════════ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">07</span>
            Identifying Confined Spaces on a Walkround
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A systematic approach to identifying confined spaces is
                essential. Relying on memory, previous experience, or
                assumptions leads to spaces being missed &mdash; and missed
                spaces kill. The HSE Approved Code of Practice L101 recommends a
                structured assessment process.
              </p>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Search className="h-5 w-5 text-cyan-400" />
                  <p className="text-sm font-medium text-cyan-400">
                    The Assessment Process
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Follow these steps to identify all confined spaces on your
                  site. This process should be completed by a competent person
                  and reviewed whenever the site changes.
                </p>
              </div>

              {/* Step-by-step process */}
              <div className="space-y-3">
                {[
                  {
                    step: 1,
                    title: "Desk Study",
                    detail:
                      "Review site drawings, process flow diagrams, asset registers, previous confined space surveys, and incident records. Build a preliminary list of potential confined spaces before visiting the site.",
                  },
                  {
                    step: 2,
                    title: "Physical Walkround",
                    detail:
                      "Walk every area of the site with the preliminary list. Look for enclosed or partially enclosed spaces with restricted access. Check above (ceiling voids, roof spaces), below (basements, pits, chambers), and around (ducts, risers, tanks). Do not enter any suspected confined space during the identification walkround.",
                  },
                  {
                    step: 3,
                    title: "Apply the Legal Test",
                    detail:
                      "For each identified space, ask: (a) Is it substantially enclosed? (b) Is there a reasonably foreseeable risk of a specified hazard (e.g., toxic gas, oxygen depletion, flooding, engulfment, fire, excessive heat)? If both answers are yes, it is a confined space.",
                  },
                  {
                    step: 4,
                    title: "Consult Workers",
                    detail:
                      "Talk to the people who actually work on the site. Maintenance staff, cleaners, and contractors often know about spaces that are not shown on drawings. They may already be entering confined spaces without realising it.",
                  },
                  {
                    step: 5,
                    title: "Record and Register",
                    detail:
                      "Add every confirmed confined space to the site confined space register. Assign a unique identifier, record the location, describe the space, list the identified hazards, and reference the risk assessment.",
                  },
                  {
                    step: 6,
                    title: "Review and Update",
                    detail:
                      "The register is a live document. Review it after any site change (construction, demolition, process change, new plant installation, incident) and at least annually. New confined spaces can be created by seemingly minor changes.",
                  },
                ].map((s) => (
                  <div key={s.step} className="flex items-start gap-3">
                    <span className="mt-0.5 w-7 h-7 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-cyan-400">
                      {s.step}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">
                        {s.title}
                      </p>
                      <p className="text-sm text-white/80 mt-0.5">
                        {s.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Diagram 2 — Assessment Flowchart */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 mt-4">
                <p className="text-sm font-medium text-white mb-4 text-center">
                  Confined Space Identification Flowchart
                </p>
                <div className="flex flex-col items-center gap-2 text-xs text-white">
                  <div className="w-full max-w-xs rounded-lg bg-cyan-500/15 border border-cyan-500/30 px-4 py-2.5 text-center">
                    <strong>Is the space substantially enclosed?</strong>
                  </div>
                  <div className="flex gap-8 w-full max-w-xs justify-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-cyan-400 font-bold">YES</span>
                      <div className="w-px h-4 bg-cyan-500/40" />
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-white/40 font-bold">NO</span>
                      <div className="w-px h-4 bg-white/20" />
                      <div className="rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-center text-white/60">
                        Not a confined space
                      </div>
                    </div>
                  </div>
                  <div className="w-full max-w-xs rounded-lg bg-cyan-500/15 border border-cyan-500/30 px-4 py-2.5 text-center">
                    <strong>
                      Is there a foreseeable specified risk?
                    </strong>
                    <p className="text-[10px] text-white/60 mt-1">
                      (Toxic gas, O₂ depletion, flooding, engulfment, fire,
                      excessive heat)
                    </p>
                  </div>
                  <div className="flex gap-8 w-full max-w-xs justify-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-cyan-400 font-bold">YES</span>
                      <div className="w-px h-4 bg-cyan-500/40" />
                      <div className="rounded-lg bg-red-500/15 border border-red-500/30 px-3 py-2 text-center">
                        <strong className="text-red-400">
                          CONFINED SPACE
                        </strong>
                        <p className="text-[10px] text-white/60 mt-1">
                          Add to register, risk assess, control entry
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-white/40 font-bold">NO</span>
                      <div className="w-px h-4 bg-white/20" />
                      <div className="rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-center text-white/60">
                        Not a confined space (but review if conditions change)
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-cyan-400">Important:</strong> The
                  assessment must be carried out by a{" "}
                  <strong>competent person</strong> &mdash; someone with
                  sufficient training, experience, and knowledge to recognise
                  confined spaces and the hazards they present. On a construction
                  site, this is typically the responsibility of the principal
                  contractor, who may delegate it to a site safety adviser or
                  specialist consultant.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── InlineCheck after Section 07 ── */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ═══════════════════════════════════════
            SECTION 08 — Examples That People Miss
            & The Confined Space Register
           ═══════════════════════════════════════ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">08</span>
            Commonly Missed Examples &amp; the Site Register
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Not every confined space looks like a tank or a sewer. Some of
                the most dangerous confined spaces are &ldquo;hidden in plain
                sight&rdquo; because they appear to be normal rooms or work
                areas. The HSE has identified several categories that are
                routinely overlooked in workplace assessments.
              </p>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="h-5 w-5 text-cyan-400" />
                  <p className="text-sm font-medium text-cyan-400">
                    Commonly Missed Confined Spaces
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  These examples share a common feature: they do not
                  &ldquo;look&rdquo; like traditional confined spaces, but they
                  meet the legal definition.
                </p>
              </div>

              {/* Large Rooms with Poor Ventilation */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Large Rooms with Poor Ventilation
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      A room does not need to be small to be a confined space
                      &mdash; the key test is whether it is substantially
                      enclosed with a foreseeable specified risk
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Large unventilated warehouses, workshops using solvents,
                      or rooms where inert gases are used (e.g., nitrogen for
                      purging, argon for welding) can become oxygen-depleted
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Server rooms and data centres with inert gas fire
                      suppression (e.g., FM-200, Novec 1230, IG-541) can become
                      immediately life-threatening if the system activates
                    </span>
                  </li>
                </ul>
              </div>

              {/* Cold Stores */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Cold Stores
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Sealed, insulated rooms with mechanical refrigeration
                      &mdash; natural ventilation is deliberately eliminated
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Hazards:</strong>{" "}
                      Refrigerant gas leaks (ammonia, CO₂, or fluorinated
                      gases) can displace oxygen rapidly; hypothermia risk; doors
                      may not be openable from inside older units
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Several fatalities have occurred in UK cold stores due to
                      refrigerant leaks creating oxygen-depleted atmospheres
                    </span>
                  </li>
                </ul>
              </div>

              {/* Spray Booths */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Spray Booths &amp; Paint Shops
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Enclosed booths designed to contain paint overspray,
                      solvent vapours, and isocyanates
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Hazards:</strong> Flammable
                      vapour concentrations can build to explosive levels if
                      ventilation fails; toxic vapour exposure; limited access
                      points
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      The confined space risk is highest during maintenance,
                      cleaning, or when ventilation is switched off
                    </span>
                  </li>
                </ul>
              </div>

              <hr className="border-white/10 my-6" />

              {/* Site-Specific Confined Space Register */}
              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <ClipboardList className="h-5 w-5 text-cyan-400" />
                  <p className="text-sm font-medium text-cyan-400">
                    The Site-Specific Confined Space Register
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Every workplace that contains confined spaces should maintain a
                  register. This is a live document that records all identified
                  confined spaces and links each one to its specific risk
                  assessment and safe system of work.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  What the Register Should Contain
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Unique identifier:
                      </strong>{" "}
                      A reference number or code for each space (e.g., CS-001,
                      CS-002)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Location:</strong> Building,
                      floor, area, grid reference, or GPS coordinates
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Description:</strong> Type
                      of space, dimensions, access points, normal contents
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Identified hazards:
                      </strong>{" "}
                      The specific risks present (e.g., H₂S, oxygen depletion,
                      flooding, engulfment)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Required controls:
                      </strong>{" "}
                      Summary of the safe system of work (e.g., permit required,
                      continuous gas monitoring, standby person, rescue plan)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Risk assessment reference:
                      </strong>{" "}
                      Link to the detailed risk assessment document
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Date of last review:
                      </strong>{" "}
                      When the entry was last verified and updated
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  When to Review the Register
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      After any construction, demolition, or structural change
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      After changes to processes, chemicals, or plant
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      After any confined space incident, near-miss, or dangerous
                      occurrence
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      At each phase of a construction project (under CDM 2015)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      As a minimum, annually &mdash; even if no changes have
                      occurred
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    A Register Is Not a Substitute
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  The confined space register is a management and planning tool.
                  It does <strong className="text-white">not replace</strong>{" "}
                  the requirement for an individual risk assessment for each
                  space, a written safe system of work, atmospheric monitoring
                  before and during entry, a permit to work (where required), or
                  emergency rescue arrangements. Each entry on the register
                  triggers all of these requirements.
                </p>
              </div>

              {/* Sample Register Table */}
              <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden mt-4">
                <div className="bg-cyan-500/10 border-b border-cyan-500/30 px-4 py-3">
                  <p className="text-sm font-medium text-cyan-400 text-center">
                    Sample Confined Space Register Entry
                  </p>
                </div>
                <div className="p-4 space-y-3 text-xs">
                  <div className="flex justify-between items-start">
                    <span className="text-white/50 w-28 flex-shrink-0">
                      ID
                    </span>
                    <span className="text-white font-medium text-right">
                      CS-007
                    </span>
                  </div>
                  <hr className="border-white/5" />
                  <div className="flex justify-between items-start">
                    <span className="text-white/50 w-28 flex-shrink-0">
                      Location
                    </span>
                    <span className="text-white font-medium text-right">
                      Building 3, Basement Level -1, Plant Room B
                    </span>
                  </div>
                  <hr className="border-white/5" />
                  <div className="flex justify-between items-start">
                    <span className="text-white/50 w-28 flex-shrink-0">
                      Description
                    </span>
                    <span className="text-white font-medium text-right">
                      Underground plant room (6m x 4m x 2.4m) containing chiller
                      units with R-410A refrigerant. Single stairway access.
                    </span>
                  </div>
                  <hr className="border-white/5" />
                  <div className="flex justify-between items-start">
                    <span className="text-white/50 w-28 flex-shrink-0">
                      Hazards
                    </span>
                    <span className="text-white font-medium text-right">
                      Refrigerant leak &rarr; oxygen displacement. No natural
                      ventilation. Single egress point.
                    </span>
                  </div>
                  <hr className="border-white/5" />
                  <div className="flex justify-between items-start">
                    <span className="text-white/50 w-28 flex-shrink-0">
                      Controls
                    </span>
                    <span className="text-white font-medium text-right">
                      Permit to work, portable gas monitor (O₂), mechanical
                      ventilation, standby person, emergency rescue plan
                    </span>
                  </div>
                  <hr className="border-white/5" />
                  <div className="flex justify-between items-start">
                    <span className="text-white/50 w-28 flex-shrink-0">
                      RA Reference
                    </span>
                    <span className="text-white font-medium text-right">
                      CS-RA-007 Rev 3
                    </span>
                  </div>
                  <hr className="border-white/5" />
                  <div className="flex justify-between items-start">
                    <span className="text-white/50 w-28 flex-shrink-0">
                      Last Review
                    </span>
                    <span className="text-white font-medium text-right">
                      14 November 2025
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ Section ── */}
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

        {/* ── Section Summary ── */}
        <section className="mb-10">
          <div className="p-5 rounded-xl bg-gradient-to-br from-cyan-500/10 via-cyan-400/5 to-transparent border border-cyan-500/15">
            <h2 className="text-lg font-semibold text-white mb-3">
              Section Summary
            </h2>
            <ul className="text-sm text-white/80 space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-cyan-400/70 mt-0.5 flex-shrink-0" />
                <span>
                  Confined spaces exist across <strong className="text-white">six main categories</strong>:
                  industrial, utility, construction, building, agricultural, and
                  marine
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-cyan-400/70 mt-0.5 flex-shrink-0" />
                <span>
                  The legal test is always the same:{" "}
                  <strong className="text-white">substantially enclosed</strong>{" "}
                  + <strong className="text-white">foreseeable specified risk</strong>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-cyan-400/70 mt-0.5 flex-shrink-0" />
                <span>
                  Commonly missed examples include cold stores, spray booths,
                  large rooms with poor ventilation, and server rooms with inert
                  gas fire suppression
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-cyan-400/70 mt-0.5 flex-shrink-0" />
                <span>
                  A systematic <strong className="text-white">six-step assessment process</strong> (desk
                  study, walkround, legal test, worker consultation, register,
                  review) ensures no space is overlooked
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-cyan-400/70 mt-0.5 flex-shrink-0" />
                <span>
                  The <strong className="text-white">confined space register</strong> is a live document
                  that must be reviewed after every site change and at least
                  annually
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-cyan-400/70 mt-0.5 flex-shrink-0" />
                <span>
                  A register does <strong className="text-white">not replace</strong> individual risk
                  assessments, permits to work, atmospheric monitoring, or
                  emergency rescue arrangements
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* ── Quiz ── */}
        <Quiz title="Section 2 Knowledge Check" questions={quizQuestions} />

        {/* ── Bottom Navigation ── */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../confined-spaces-module-1-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: What Is a Confined Space?
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-cyan-500 text-white hover:bg-cyan-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../confined-spaces-module-1-section-3">
              Next: Why Confined Spaces Kill
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
