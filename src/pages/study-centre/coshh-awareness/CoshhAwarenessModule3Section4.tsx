import {
  ArrowLeft,
  Bug,
  CheckCircle,
  AlertTriangle,
  Shield,
  Droplets,
  ThermometerSun,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "acdp-group-3",
    question:
      "Under the ACDP classification, which Hazard Group describes a biological agent that can cause serious human disease and may spread to the community, but effective treatment is usually available?",
    options: [
      "Hazard Group 1 — unlikely to cause human disease",
      "Hazard Group 2 — can cause disease, treatment normally available",
      "Hazard Group 3 — can cause serious disease, may spread, treatment usually available",
      "Hazard Group 4 — causes serious disease, no effective treatment, high risk of spread",
    ],
    correctIndex: 2,
    explanation:
      "Hazard Group 3 biological agents can cause serious human disease and may present a risk of spreading to the community, but effective prophylaxis or treatment is usually available. Examples include Mycobacterium tuberculosis and hepatitis B and C viruses. Workers who may be exposed to Group 3 agents require specific risk assessments, enhanced control measures, and in many cases, health surveillance.",
  },
  {
    id: "legionella-temperature",
    question:
      "At what temperature range does Legionella bacteria proliferate most readily in water systems?",
    options: [
      "Below 10\u00b0C",
      "Between 20\u00b0C and 45\u00b0C",
      "Between 50\u00b0C and 60\u00b0C",
      "Above 70\u00b0C",
    ],
    correctIndex: 1,
    explanation:
      "Legionella bacteria proliferate most readily in water at temperatures between 20\u00b0C and 45\u00b0C. Below 20\u00b0C the bacteria survive but remain dormant. Above 60\u00b0C Legionella is killed. This is why the L8 Approved Code of Practice requires hot water to be stored at 60\u00b0C or above and distributed at 50\u00b0C or above, and cold water to be kept below 20\u00b0C.",
  },
  {
    id: "needlestick-action",
    question:
      "You accidentally sustain a needle-stick injury from a discarded needle found on a construction site. What is the correct immediate action?",
    options: [
      "Squeeze the wound hard to force out as much blood as possible, then bandage it",
      "Encourage the wound to bleed freely, wash with soap and running water, cover with a waterproof dressing, and report immediately for medical assessment",
      "Apply antiseptic cream and continue working — the risk is negligible",
      "Suck the wound to remove any contamination and apply a plaster",
    ],
    correctIndex: 1,
    explanation:
      "After a needle-stick injury, encourage the wound to bleed freely (do NOT suck the wound) and wash thoroughly with soap and running water. Do NOT scrub the area. Cover with a waterproof dressing and report immediately to your supervisor and occupational health. Attend A&E or an occupational health clinic urgently — post-exposure prophylaxis (PEP) for HIV must be started within 72 hours (ideally within 1 hour) if deemed necessary following a risk assessment.",
  },
];

const faqs = [
  {
    question:
      "I'm an electrician working in a plant room with standing water. What biological risks should I be aware of?",
    answer:
      "Plant rooms with standing or stagnant water present several biological risks. The primary concerns are Legionella (particularly if there are cooling towers, hot water systems, or water storage tanks nearby), leptospirosis (if there is evidence of rodent activity — look for droppings, gnaw marks, or nesting materials), and general bacterial contamination. Before starting work, check for signs of rodent activity, ensure any cuts or abrasions are covered with waterproof dressings, wear appropriate PPE (waterproof gloves and boots), avoid touching your face, and wash your hands thoroughly afterwards. If the standing water is from sewage or drainage, additional precautions including hepatitis A vaccination may be recommended.",
  },
  {
    question:
      "Do I need a tetanus vaccination for construction work? My last one was over 10 years ago.",
    answer:
      "In the UK, most people will have received a full course of five tetanus vaccinations through the childhood immunisation programme, which provides long-term protection. However, if you work regularly on construction sites, particularly involving groundwork, drainage, or demolition, and you have not had a booster in the last 10 years, it is worth discussing this with your GP or occupational health provider. Tetanus spores (Clostridium tetani) are found in soil, manure, and dust. Any puncture wound, cut, or graze contaminated with soil or rusty metal creates a risk of tetanus infection. If you sustain a contaminated wound and are unsure of your vaccination status, seek medical advice promptly — a booster or tetanus immunoglobulin may be given.",
  },
  {
    question:
      "What is the difference between Legionnaires' disease and Pontiac fever?",
    answer:
      "Both are caused by the Legionella bacterium, but they differ significantly in severity. Legionnaires' disease is a serious form of pneumonia with symptoms including high fever, cough, shortness of breath, muscle aches, and confusion. It has a fatality rate of approximately 10\u201315% and requires hospital treatment with antibiotics. Pontiac fever is a milder, non-pneumonic illness that causes flu-like symptoms (fever, headache, muscle aches) lasting 2\u20135 days and resolves without treatment. The difference in severity depends on the dose of bacteria inhaled, the individual's immune status, and other factors. Both conditions are caused by inhaling Legionella bacteria in aerosolised water droplets \u2014 they are NOT transmitted person to person.",
  },
  {
    question:
      "I've been asked to work in a ceiling void in an old building. What biological hazards might be present?",
    answer:
      "Ceiling voids in older buildings can harbour several biological hazards. Bird droppings (particularly from pigeons) may be present if birds have gained access, creating a risk of ornithosis/psittacosis and histoplasmosis. Bat droppings (guano) may also be present — bats are a protected species, so if you encounter them, stop work and report it. Rodent droppings and nesting materials may indicate a risk of leptospirosis. Mould and fungal growth (including Aspergillus) may be present in damp or poorly ventilated voids. Before entering, carry out a visual inspection with a torch, wear an FFP3 respirator if there is visible contamination, use disposable coveralls, and ensure adequate ventilation. Report any significant contamination to your supervisor before proceeding — a specialist clean may be required first.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "Which of the following correctly describes a Hazard Group 2 biological agent under the ACDP classification?",
    options: [
      "Unlikely to cause human disease under any circumstances",
      "Can cause human disease and may be a hazard to workers, but effective treatment is normally available and the risk of spread to the community is low",
      "Causes serious human disease with a high mortality rate and no effective treatment exists",
      "Is only found in tropical environments and poses no risk in the UK",
    ],
    correctAnswer: 1,
    explanation:
      "Hazard Group 2 biological agents can cause human disease and may be a hazard to employees, but effective prophylaxis or treatment is normally available, and the risk of spread to the community is low. Examples include Staphylococcus aureus, E. coli, and Legionella pneumophila. Most biological hazards encountered on construction sites fall into Group 2.",
  },
  {
    id: 2,
    question:
      "Leptospirosis (Weil's disease) is primarily transmitted to humans through which route?",
    options: [
      "Breathing in dust from contaminated soil",
      "Contact with water or soil contaminated with the urine of infected rats or other animals",
      "Eating food contaminated with bird droppings",
      "Being bitten by infected insects such as mosquitoes or ticks",
    ],
    correctAnswer: 1,
    explanation:
      "Leptospirosis is caused by Leptospira bacteria found in the urine of infected animals, primarily rats. The bacteria enter the body through cuts, abrasions, or mucous membranes (eyes, nose, mouth) when a person comes into contact with contaminated water or soil. Workers in drains, sewers, waterways, and areas with heavy rodent activity are at highest risk. Covering all cuts and abrasions with waterproof dressings is a critical preventive measure.",
  },
  {
    id: 3,
    question:
      "Under the L8 Approved Code of Practice, at what temperature must hot water be stored to prevent Legionella growth?",
    options: [
      "At least 40\u00b0C",
      "At least 50\u00b0C",
      "At least 60\u00b0C",
      "At least 70\u00b0C",
    ],
    correctAnswer: 2,
    explanation:
      "The L8 ACoP (Legionnaires' disease: The control of Legionella bacteria in water systems) requires hot water to be stored at 60\u00b0C or above. Hot water should be distributed so that it reaches a temperature of 50\u00b0C or above within one minute at the outlets. Cold water should be stored and distributed below 20\u00b0C. These temperature controls are critical because Legionella proliferates between 20\u00b0C and 45\u00b0C and is killed above 60\u00b0C.",
  },
  {
    id: 4,
    question:
      "A construction worker develops flu-like symptoms, jaundice (yellowing of the skin and eyes), and kidney pain two weeks after working in a flooded drainage trench. Which disease should be suspected?",
    options: [
      "Legionnaires' disease",
      "Leptospirosis (Weil's disease)",
      "Histoplasmosis",
      "Tetanus",
    ],
    correctAnswer: 1,
    explanation:
      "The combination of flu-like symptoms, jaundice, and kidney pain following contact with potentially rat-urine-contaminated water in a drainage trench is highly suggestive of leptospirosis (Weil's disease). The incubation period is typically 7\u201312 days. Leptospirosis is a notifiable disease in the UK \u2014 it MUST be reported to the local authority. Early diagnosis and antibiotic treatment are essential, as the severe form (Weil's disease) can cause liver and kidney failure and can be fatal.",
  },
  {
    id: 5,
    question:
      "Which biological hazard is most commonly associated with working in or around pigeon roosting areas on rooftops?",
    options: [
      "Leptospirosis",
      "Legionnaires' disease",
      "Ornithosis (psittacosis) and histoplasmosis",
      "Tetanus",
    ],
    correctAnswer: 2,
    explanation:
      "Working near pigeon roosting areas presents risks of ornithosis (psittacosis) caused by Chlamydophila psittaci bacteria found in dried bird droppings, and histoplasmosis caused by the Histoplasma capsulatum fungus that grows in soil enriched with bird or bat droppings. Both diseases are contracted by inhaling contaminated dust. When working on rooftops with bird droppings, an FFP3 respirator should be worn, the droppings should be dampened before disturbance to suppress dust, and disposable coveralls should be used.",
  },
  {
    id: 6,
    question:
      "Which of the following is the correct procedure if you discover discarded needles or sharps on a construction site?",
    options: [
      "Pick them up carefully with gloves and dispose of them in a general waste bin",
      "Leave them in place, mark and cordon off the area, and report it so that sharps can be collected using a proper sharps container and tongs or a litter-pick tool",
      "Cover them with rubble or soil so that nobody else can be injured",
      "Use pliers to pick them up and place them in a plastic bag for disposal",
    ],
    correctAnswer: 1,
    explanation:
      "Discarded needles and sharps should NEVER be picked up by hand, even with gloves. The correct procedure is to leave them in place, mark and cordon off the area so that others are warned, and report the find to your supervisor. A trained person should then collect the sharps using tongs or a mechanical pick-up tool and place them in a proper rigid-walled sharps container (yellow, conforming to BS 7320). The sharps container should then be disposed of through a licensed clinical waste route.",
  },
  {
    id: 7,
    question:
      "An electrician is working in a drainage pump station. Which vaccinations might their occupational health provider recommend?",
    options: [
      "BCG (tuberculosis) only",
      "Hepatitis A and tetanus, with hepatitis B considered depending on risk assessment",
      "Influenza and COVID-19 only",
      "No vaccinations are recommended for this type of work",
    ],
    correctAnswer: 1,
    explanation:
      "Workers who may come into contact with sewage or wastewater should be offered hepatitis A vaccination (faecal-oral route of transmission), and their tetanus status should be confirmed as up to date. Hepatitis B vaccination may also be considered depending on the risk assessment, particularly if there is a risk of contact with sharps or blood-contaminated materials. Leptospirosis vaccination is not routinely available in the UK, so control relies on hygiene measures and PPE.",
  },
  {
    id: 8,
    question:
      "Which of the following control measures is MOST important when preventing biological hazards on construction sites?",
    options: [
      "Providing workers with antibiotics to take before entering contaminated areas",
      "Good hygiene practices: handwashing before eating/drinking/smoking, covering cuts, and access to adequate welfare facilities",
      "Working faster so that exposure time is minimised",
      "Only employing workers who have natural immunity to common infections",
    ],
    correctAnswer: 1,
    explanation:
      "Good hygiene practices are the single most important control measure for preventing biological hazards on construction sites. This includes thorough handwashing with soap and water before eating, drinking, or smoking; covering all cuts, abrasions, and skin conditions with waterproof dressings; access to adequate welfare facilities (clean running water, soap, toilets, drying facilities); and never eating, drinking, or smoking in contaminated areas. These basic measures prevent the vast majority of biological agent exposures on site.",
  },
];

export default function CoshhAwarenessModule3Section4() {
  useSEO({
    title:
      "Biological & Environmental Hazards | COSHH Awareness Module 3.4",
    description:
      "Biological agents on construction sites: leptospirosis, Legionella, mould, sewage hazards, bird and bat droppings, sharps injuries, soil-borne hazards, and control measures for electricians.",
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
            <Link to="../coshh-awareness-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500/20 to-violet-400/20 border border-violet-500/30 mb-4">
            <Bug className="h-7 w-7 text-violet-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 mb-3 mx-auto">
            <span className="text-violet-400 text-xs font-semibold">
              MODULE 3 &middot; SECTION 4
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Biological &amp; Environmental Hazards
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Bacteria, viruses, fungi, and other biological agents you may
            encounter on construction sites &mdash; and the control measures
            that protect you and your colleagues
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-violet-500/5 border-l-2 border-violet-500/50">
            <p className="text-violet-400 text-base font-medium mb-2">
              In 30 Seconds
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Biological agents:</strong> Bacteria, viruses, fungi,
                parasites, prions
              </li>
              <li>
                <strong>Key risks:</strong> Leptospirosis, Legionella, mould,
                sewage, sharps
              </li>
              <li>
                <strong>Classification:</strong> 4 Hazard Groups (ACDP) &mdash;
                Group 1 to Group 4
              </li>
              <li>
                <strong>Primary control:</strong> Hygiene, PPE, vaccination,
                welfare facilities
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-violet-500/5 border-l-2 border-violet-500/50">
            <p className="text-violet-400/90 text-base font-medium mb-2">
              On Site
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Cover cuts:</strong> Waterproof dressings on all wounds
                before starting work
              </li>
              <li>
                <strong>Wash hands:</strong> Before eating, drinking, or smoking
                &mdash; always
              </li>
              <li>
                <strong>Sharps:</strong> Never pick up discarded needles by hand
              </li>
              <li>
                <strong>Report:</strong> Flu-like symptoms after site work
                &mdash; mention your occupation
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
              "Define biological agents and explain the 4 ACDP Hazard Groups",
              "Describe the causes, symptoms, and prevention of leptospirosis (Weil\u2019s disease)",
              "Explain Legionella risks and the temperature controls required under the L8 ACoP",
              "Identify the health risks of mould, fungi, and Aspergillus in damp or demolished buildings",
              "Describe the biological hazards of sewage, wastewater, bird droppings, and contaminated soil",
              "Outline the correct response to a needle-stick or sharps injury on site",
              "Explain the hierarchy of control measures for biological hazards, including vaccination and hygiene",
              "Identify the specific biological risks electricians face in plant rooms, ceiling voids, and drainage pump stations",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-violet-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: What Are Biological Agents? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">01</span>
            What Are Biological Agents?
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Biological agents</strong> are micro-organisms, cell
                cultures, or human endoparasites that may cause infection,
                allergy, toxicity, or other harm to human health. Under the{" "}
                <strong>
                  Control of Substances Hazardous to Health Regulations 2002
                  (COSHH)
                </strong>
                , biological agents are classified as hazardous substances and
                must be risk-assessed and controlled in the same way as chemical
                hazards.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-violet-400 mb-3">
                  Types of Biological Agent
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    {
                      type: "Bacteria",
                      examples: "Leptospira, Legionella, Clostridium tetani, E. coli",
                      detail:
                        "Single-celled organisms. Some produce toxins. Many can survive outside the body in water, soil, or on surfaces.",
                    },
                    {
                      type: "Viruses",
                      examples: "Hepatitis A, B, C; HIV; norovirus",
                      detail:
                        "Require a living host to replicate. Transmitted through blood, bodily fluids, faecal-oral routes, or aerosol.",
                    },
                    {
                      type: "Fungi",
                      examples: "Aspergillus, Histoplasma, dermatophytes",
                      detail:
                        "Includes moulds and yeasts. Spores can be inhaled or enter through skin. Some cause respiratory sensitisation.",
                    },
                    {
                      type: "Parasites",
                      examples: "Cryptosporidium, Giardia, roundworms",
                      detail:
                        "Organisms that live on or in a host. Typically transmitted through contaminated water or soil.",
                    },
                    {
                      type: "Prions",
                      examples: "BSE (mad cow disease), CJD",
                      detail:
                        "Misfolded proteins that cause progressive neurodegenerative disease. Extremely rare in occupational settings.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-3">
                      <p className="text-xs font-medium text-violet-400 mb-1">
                        {item.type}
                      </p>
                      <p className="text-xs text-white/60 mb-2">
                        {item.examples}
                      </p>
                      <p className="text-xs text-white/70">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <p>
                On construction sites, biological agents are not manufactured
                or deliberately used &mdash; instead, workers are{" "}
                <strong>incidentally exposed</strong> through contact with
                contaminated water, soil, animal droppings, sewage, or
                discarded sharps. This makes biological hazards easy to
                overlook, but the consequences of exposure can be severe and
                sometimes fatal.
              </p>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-violet-400">Key Point:</strong>{" "}
                  Unlike chemical hazards, biological agents can{" "}
                  <strong>multiply and spread</strong>. A small initial
                  exposure can lead to infection, which the body then hosts
                  and amplifies. This means that even brief contact with a
                  contaminated substance can cause serious illness days or
                  weeks later.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: The 4 ACDP Hazard Groups */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">02</span>
            The 4 ACDP Hazard Groups
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The{" "}
                <strong>
                  Advisory Committee on Dangerous Pathogens (ACDP)
                </strong>{" "}
                classifies biological agents into four Hazard Groups based on
                their ability to cause human disease, the likelihood of spread
                to the community, and whether effective treatment or
                prophylaxis is available. This classification determines the
                level of containment and control measures required.
              </p>

              {/* Hazard Groups Diagram */}
              <div className="bg-white/5 border border-violet-500/30 rounded-xl p-4 sm:p-6">
                <p className="text-sm font-semibold text-violet-400 mb-4 text-center">
                  Biological Hazard Groups &mdash; ACDP Classification
                </p>
                <div className="space-y-3">
                  {/* Group 1 */}
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="flex items-center justify-center min-w-[36px] h-9 rounded-lg bg-green-500/20 text-green-400 text-sm font-bold">
                        1
                      </span>
                      <div>
                        <p className="text-sm font-medium text-green-400">
                          Hazard Group 1
                        </p>
                        <p className="text-xs text-white/60">
                          Unlikely to cause human disease
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-white/80">
                      Agents in this group are{" "}
                      <strong className="text-white">
                        unlikely to cause disease in healthy workers
                      </strong>
                      . They pose minimal risk and require only basic hygiene
                      controls. Most environmental micro-organisms fall into
                      this category.
                    </p>
                  </div>

                  {/* Group 2 */}
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="flex items-center justify-center min-w-[36px] h-9 rounded-lg bg-amber-500/20 text-amber-400 text-sm font-bold">
                        2
                      </span>
                      <div>
                        <p className="text-sm font-medium text-amber-400">
                          Hazard Group 2
                        </p>
                        <p className="text-xs text-white/60">
                          Can cause disease &mdash; treatment available
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-white/80 mb-2">
                      Agents that{" "}
                      <strong className="text-white">
                        can cause human disease and may be a hazard to workers
                      </strong>
                      , but effective prophylaxis or treatment is normally
                      available and the risk of spread to the community is low.
                    </p>
                    <p className="text-xs text-white/60">
                      <strong>Examples:</strong> Legionella pneumophila, E.
                      coli, Staphylococcus aureus, hepatitis A
                    </p>
                  </div>

                  {/* Group 3 */}
                  <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="flex items-center justify-center min-w-[36px] h-9 rounded-lg bg-orange-500/20 text-orange-400 text-sm font-bold">
                        3
                      </span>
                      <div>
                        <p className="text-sm font-medium text-orange-400">
                          Hazard Group 3
                        </p>
                        <p className="text-xs text-white/60">
                          Serious disease &mdash; may spread to community
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-white/80 mb-2">
                      Agents that{" "}
                      <strong className="text-white">
                        can cause serious human disease and may present a risk
                        of spreading to the community
                      </strong>
                      , but effective prophylaxis or treatment is usually
                      available.
                    </p>
                    <p className="text-xs text-white/60">
                      <strong>Examples:</strong> Hepatitis B &amp; C viruses,
                      HIV, Mycobacterium tuberculosis
                    </p>
                  </div>

                  {/* Group 4 */}
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="flex items-center justify-center min-w-[36px] h-9 rounded-lg bg-red-500/20 text-red-400 text-sm font-bold">
                        4
                      </span>
                      <div>
                        <p className="text-sm font-medium text-red-400">
                          Hazard Group 4
                        </p>
                        <p className="text-xs text-white/60">
                          Serious disease &mdash; no effective treatment
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-white/80 mb-2">
                      Agents that{" "}
                      <strong className="text-white">
                        cause serious human disease and present a serious hazard
                        to workers
                      </strong>
                      . There is a high risk of spread to the community and{" "}
                      <strong className="text-white">
                        no effective prophylaxis or treatment is usually
                        available
                      </strong>
                      .
                    </p>
                    <p className="text-xs text-white/60">
                      <strong>Examples:</strong> Ebola virus, Marburg virus
                      (not encountered on construction sites)
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-violet-400">
                    Construction Site Context:
                  </strong>{" "}
                  The biological agents most commonly encountered on
                  construction sites are{" "}
                  <strong>Hazard Group 2</strong> organisms &mdash; agents
                  such as Leptospira, Legionella, and E. coli. However,
                  exposure to <strong>Hazard Group 3</strong> agents (such
                  as hepatitis B and C through sharps injuries) is possible,
                  which is why control measures, PPE, and vaccination are so
                  important.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Leptospirosis (Weil's Disease) */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">03</span>
            Leptospirosis (Weil&rsquo;s Disease)
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Leptospirosis</strong> is a bacterial infection caused
                by <em>Leptospira</em> bacteria, which are carried in the
                urine of infected animals &mdash; primarily{" "}
                <strong>rats</strong>, but also cattle, pigs, and dogs. The
                bacteria can survive in water and damp soil for weeks. The
                severe form of leptospirosis is known as{" "}
                <strong>Weil&rsquo;s disease</strong>, which can cause liver
                failure, kidney failure, and death.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Notifiable Disease
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Leptospirosis is a <strong>notifiable disease</strong> in
                  the UK. Any confirmed or suspected case must be reported to
                  the local authority. If you develop flu-like symptoms after
                  working in drains, sewers, waterways, or any area with
                  evidence of rat activity,{" "}
                  <strong>
                    seek medical attention immediately and tell the doctor
                    about your work
                  </strong>
                  . Early antibiotic treatment is critical.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-violet-400 mb-3">
                  Who Is at Risk?
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  {[
                    "Workers in drains, sewers, and culverts",
                    "Workers in waterways, canals, rivers, and flood-damaged buildings",
                    "Groundworkers and those involved in excavation, particularly near watercourses",
                    "Electricians working in drainage pump stations, below-ground chambers, or flooded basements",
                    "Workers in agricultural buildings, farms, and rural environments",
                    "Anyone working where there is evidence of rat activity (droppings, gnaw marks, burrows)",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-amber-400 mb-2">
                    Symptoms (7&ndash;12 day incubation)
                  </p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>Sudden onset of flu-like illness (fever, headache, muscle aches)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>Nausea, vomiting, diarrhoea</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>Red, bloodshot eyes (conjunctival suffusion)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span><strong className="text-white">Weil&rsquo;s disease:</strong> Jaundice, kidney pain, internal bleeding</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-green-400 mb-2">
                    Prevention
                  </p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>Cover ALL cuts, abrasions, and skin conditions with waterproof dressings</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>Wear waterproof gloves and boots when working in water or near drains</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>Wash hands thoroughly with soap and water before eating, drinking, or smoking</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>Carry a leptospirosis information card (available from the HSE)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Legionella & Legionnaires' Disease */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">04</span>
            Legionella &amp; Legionnaires&rsquo; Disease
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Legionella pneumophila</strong> is a bacterium that
                lives in water systems and can cause{" "}
                <strong>Legionnaires&rsquo; disease</strong> &mdash; a
                serious and potentially fatal form of pneumonia. The
                bacterium is transmitted by{" "}
                <strong>inhaling contaminated water droplets</strong>{" "}
                (aerosol), NOT by drinking contaminated water or
                person-to-person contact.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Droplets className="h-5 w-5 text-violet-400" />
                  <p className="text-sm font-medium text-violet-400">
                    Where Legionella Thrives
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    {
                      source: "Cooling towers",
                      detail:
                        "Industrial cooling systems can produce large volumes of aerosol. The most common source of large outbreaks.",
                    },
                    {
                      source: "Hot and cold water systems",
                      detail:
                        "Stored water between 20\u00b0C and 45\u00b0C, dead legs, infrequently used outlets, and storage tanks.",
                    },
                    {
                      source: "Spa pools and hot tubs",
                      detail:
                        "Warm, aerated water provides ideal conditions. Regular water treatment and monitoring are essential.",
                    },
                    {
                      source: "Showers and taps",
                      detail:
                        "Shower heads and spray taps create aerosol. Infrequently used outlets are a particular risk.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-3">
                      <p className="text-xs font-medium text-violet-400 mb-1">
                        {item.source}
                      </p>
                      <p className="text-xs text-white/70">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Temperature Control Diagram */}
              <div className="bg-white/5 border border-violet-500/30 rounded-xl p-4 sm:p-6">
                <p className="text-sm font-semibold text-violet-400 mb-4 text-center">
                  Legionella Temperature Controls &mdash; L8 ACoP
                </p>
                <div className="space-y-2">
                  {/* 70°C+ */}
                  <div className="flex items-center gap-3">
                    <div className="w-20 sm:w-24 text-right">
                      <span className="text-xs font-bold text-red-400">
                        70&deg;C+
                      </span>
                    </div>
                    <div className="flex-1 h-8 bg-red-500/20 border border-red-500/30 rounded flex items-center px-3">
                      <span className="text-xs text-red-300 font-medium">
                        Legionella killed rapidly
                      </span>
                    </div>
                  </div>
                  {/* 60°C */}
                  <div className="flex items-center gap-3">
                    <div className="w-20 sm:w-24 text-right">
                      <span className="text-xs font-bold text-orange-400">
                        60&deg;C
                      </span>
                    </div>
                    <div className="flex-1 h-8 bg-orange-500/20 border border-orange-500/30 rounded flex items-center px-3">
                      <span className="text-xs text-orange-300 font-medium">
                        Hot water storage minimum (L8 ACoP)
                      </span>
                    </div>
                  </div>
                  {/* 50°C */}
                  <div className="flex items-center gap-3">
                    <div className="w-20 sm:w-24 text-right">
                      <span className="text-xs font-bold text-amber-400">
                        50&deg;C
                      </span>
                    </div>
                    <div className="flex-1 h-8 bg-amber-500/20 border border-amber-500/30 rounded flex items-center px-3">
                      <span className="text-xs text-amber-300 font-medium">
                        Hot water distribution minimum at outlets
                      </span>
                    </div>
                  </div>
                  {/* 20-45°C DANGER */}
                  <div className="flex items-center gap-3">
                    <div className="w-20 sm:w-24 text-right">
                      <span className="text-xs font-bold text-red-400">
                        20&ndash;45&deg;C
                      </span>
                    </div>
                    <div className="flex-1 h-10 bg-red-500/30 border-2 border-red-500/50 rounded flex items-center px-3">
                      <span className="text-xs text-red-200 font-bold">
                        DANGER ZONE &mdash; Legionella proliferates
                      </span>
                    </div>
                  </div>
                  {/* Below 20°C */}
                  <div className="flex items-center gap-3">
                    <div className="w-20 sm:w-24 text-right">
                      <span className="text-xs font-bold text-blue-400">
                        &lt;20&deg;C
                      </span>
                    </div>
                    <div className="flex-1 h-8 bg-blue-500/20 border border-blue-500/30 rounded flex items-center px-3">
                      <span className="text-xs text-blue-300 font-medium">
                        Cold water maximum (dormant, not killed)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-violet-400">
                    Why This Matters to Electricians:
                  </strong>{" "}
                  Electricians frequently work in plant rooms, boiler rooms,
                  and mechanical services areas where hot and cold water
                  systems, cooling towers, and water storage tanks are
                  located. If you are working near water systems and notice
                  a shower head, tap, or outlet that has not been used for a
                  long time (dead leg), or if you notice water temperatures
                  that seem to be in the danger zone (lukewarm water from a
                  &ldquo;hot&rdquo; tap), report it to the building manager.
                  You should{" "}
                  <strong>
                    never turn on a shower or tap that has been unused for a
                    prolonged period
                  </strong>{" "}
                  without checking with the responsible person first &mdash;
                  the initial aerosol from a stagnant outlet can contain high
                  concentrations of Legionella.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: Mould, Fungi & Sewage Hazards */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">05</span>
            Mould, Fungi &amp; Sewage Hazards
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Construction and renovation work frequently disturbs mould,
                fungi, and other biological contaminants that have accumulated
                in damp, neglected, or flood-damaged buildings. Additionally,
                work in or near drainage systems exposes workers to raw or
                partially treated sewage containing a wide range of pathogenic
                organisms.
              </p>

              {/* Mould & Aspergillus */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-violet-400 mb-3">
                  Mould &amp; Aspergillus
                </p>
                <p className="text-sm text-white/80 mb-3">
                  <strong className="text-white">Aspergillus</strong> is a
                  common mould found in damp buildings, decaying vegetation,
                  and soil. When buildings are demolished, renovated, or
                  disturbed, Aspergillus spores become airborne and can be
                  inhaled. In healthy individuals, the body&rsquo;s immune
                  system usually deals with the spores without problem.
                  However, in{" "}
                  <strong className="text-white">
                    immunocompromised workers
                  </strong>{" "}
                  (those on immunosuppressant medication, chemotherapy, or
                  with conditions such as HIV), Aspergillus infection
                  (aspergillosis) can be serious and life-threatening.
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-black/30 rounded-lg p-3">
                    <p className="text-xs font-medium text-amber-400 mb-1">
                      Health Effects
                    </p>
                    <ul className="text-xs text-white/70 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>Allergic bronchopulmonary aspergillosis (ABPA)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>Respiratory sensitisation and occupational asthma</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>Invasive aspergillosis in immunocompromised individuals</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3">
                    <p className="text-xs font-medium text-green-400 mb-1">
                      Controls
                    </p>
                    <ul className="text-xs text-white/70 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Dampen mouldy surfaces before disturbance</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>FFP3 respirator for heavy mould contamination</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Disposable coveralls to prevent spores on clothing</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Sewage & Wastewater */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-violet-400 mb-3">
                  Sewage &amp; Wastewater
                </p>
                <p className="text-sm text-white/80 mb-3">
                  Raw sewage contains a wide range of pathogenic organisms
                  including bacteria, viruses, and parasites. Electricians
                  working on drainage pump stations, sewage treatment works,
                  or in flooded basements are at particular risk.
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    {
                      pathogen: "Hepatitis A",
                      route: "Faecal-oral",
                      note: "Vaccination recommended for sewage workers",
                    },
                    {
                      pathogen: "E. coli",
                      route: "Faecal-oral / contaminated water",
                      note: "Can cause severe gastroenteritis",
                    },
                    {
                      pathogen: "Cryptosporidium",
                      route: "Contaminated water ingestion",
                      note: "Parasitic — causes prolonged diarrhoea",
                    },
                    {
                      pathogen: "Tetanus",
                      route: "Contaminated wound (puncture/cut)",
                      note: "Spores in soil and sewage — check vaccination status",
                    },
                  ].map((item, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-3">
                      <p className="text-xs font-medium text-red-400 mb-1">
                        {item.pathogen}
                      </p>
                      <p className="text-xs text-white/60 mb-1">
                        Route: {item.route}
                      </p>
                      <p className="text-xs text-white/70">{item.note}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Vaccination Recommendations for Sewage Workers
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Workers who regularly come into contact with sewage or
                  wastewater should be offered{" "}
                  <strong className="text-white">
                    hepatitis A vaccination
                  </strong>{" "}
                  and their{" "}
                  <strong className="text-white">tetanus status</strong>{" "}
                  should be confirmed as up to date.{" "}
                  <strong className="text-white">Hepatitis B</strong>{" "}
                  vaccination may also be considered depending on the risk
                  assessment, particularly if there is a risk of contact
                  with sharps or blood-contaminated materials. Discuss your
                  work activities with your occupational health provider to
                  determine which vaccinations are appropriate for your role.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 06: Bird Droppings, Soil & Sharps */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">06</span>
            Bird Droppings, Soil-Borne Hazards &amp; Sharps
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              {/* Bird & Bat Droppings */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-violet-400 mb-3">
                  Bird &amp; Bat Droppings
                </p>
                <p className="text-sm text-white/80 mb-3">
                  Electricians frequently work on rooftops, in loft spaces,
                  and in ceiling voids where bird and bat droppings
                  accumulate. When disturbed, dried droppings release dust
                  that can be inhaled, transmitting disease.
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-black/30 rounded-lg p-3">
                    <p className="text-xs font-medium text-orange-400 mb-1">
                      Histoplasmosis
                    </p>
                    <p className="text-xs text-white/70 mb-1">
                      Caused by <em>Histoplasma capsulatum</em> fungus,
                      which thrives in soil enriched with bird or bat
                      droppings. Inhaling spores can cause respiratory
                      illness ranging from mild flu-like symptoms to serious
                      lung disease.
                    </p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3">
                    <p className="text-xs font-medium text-orange-400 mb-1">
                      Ornithosis (Psittacosis)
                    </p>
                    <p className="text-xs text-white/70 mb-1">
                      Caused by <em>Chlamydophila psittaci</em> bacteria
                      found in dried bird droppings, feathers, and
                      respiratory secretions. Causes atypical pneumonia with
                      fever, headache, and dry cough.
                    </p>
                  </div>
                </div>
                <div className="mt-3 bg-violet-500/10 border border-violet-500/30 p-3 rounded-lg">
                  <p className="text-xs text-white">
                    <strong className="text-violet-400">
                      Cleaning Procedure:
                    </strong>{" "}
                    Dampen droppings with water before disturbing them to
                    suppress dust. Wear an FFP3 respirator and disposable
                    coveralls. Do NOT dry-sweep bird droppings. Place
                    contaminated material in sealed bags for disposal. Wash
                    hands and exposed skin thoroughly afterwards. If large
                    accumulations of droppings are found, a specialist
                    cleaning contractor may be required.
                  </p>
                </div>
              </div>

              {/* Soil-Borne Hazards */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-violet-400 mb-3">
                  Soil-Borne Hazards
                </p>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-white/80">
                      <strong className="text-white">
                        Tetanus (Clostridium tetani):
                      </strong>{" "}
                      Tetanus spores are present in soil, manure, and dust
                      throughout the UK. They enter the body through
                      puncture wounds, cuts, or abrasions contaminated with
                      soil. Tetanus causes severe muscle spasms and can be
                      fatal. Vaccination provides effective protection, and
                      most UK adults will have been vaccinated through the
                      childhood immunisation programme. If you sustain a
                      contaminated wound and are unsure of your vaccination
                      status, seek medical advice promptly.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-white/80">
                      <strong className="text-white">
                        Anthrax (historic industrial sites):
                      </strong>{" "}
                      Anthrax spores (<em>Bacillus anthracis</em>) can
                      persist in soil for decades. Whilst extremely rare in
                      the UK today, there is a residual risk at historic
                      industrial sites that previously processed animal
                      hides, wool, or bone meal (such as former tanneries or
                      mills). Contaminated land assessments should identify
                      this risk before work begins.
                    </p>
                  </div>
                </div>
              </div>

              {/* Sharps & Needle-Stick Injuries */}
              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Sharps &amp; Needle-Stick Injuries
                  </p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  Discarded needles, syringes, and other sharps are
                  increasingly found on construction sites, particularly in
                  urban areas, derelict buildings, and around public spaces.
                  A needle-stick injury can transmit serious blood-borne
                  viruses:
                </p>
                <div className="grid sm:grid-cols-3 gap-3 mb-3">
                  <div className="bg-black/30 rounded-lg p-3 text-center">
                    <p className="text-red-400 font-semibold text-sm mb-1">
                      HIV
                    </p>
                    <p className="text-xs text-white/70">
                      Transmission risk approximately 0.3% per needle-stick.
                      Post-exposure prophylaxis (PEP) must be started
                      within 72 hours (ideally within 1 hour).
                    </p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3 text-center">
                    <p className="text-red-400 font-semibold text-sm mb-1">
                      Hepatitis B
                    </p>
                    <p className="text-xs text-white/70">
                      Transmission risk up to 30% per needle-stick.
                      Vaccination provides effective protection. Check your
                      vaccination status.
                    </p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3 text-center">
                    <p className="text-red-400 font-semibold text-sm mb-1">
                      Hepatitis C
                    </p>
                    <p className="text-xs text-white/70">
                      Transmission risk approximately 1.8% per needle-stick.
                      No vaccine available. Early treatment with antiviral
                      drugs is effective.
                    </p>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                  <p className="text-xs font-medium text-white mb-2">
                    Immediate Response to a Needle-Stick Injury:
                  </p>
                  <div className="space-y-2 text-xs text-white/80">
                    {[
                      "Encourage the wound to bleed freely — do NOT suck the wound or squeeze it hard",
                      "Wash thoroughly with soap and running water — do NOT scrub the wound",
                      "Cover with a waterproof dressing",
                      "Report immediately to your supervisor and occupational health",
                      "Attend A&E or occupational health clinic urgently — time-critical treatment may be needed",
                      "Keep the discarded sharp (safely contained) for testing if possible",
                    ].map((step, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="flex items-center justify-center min-w-[20px] h-5 rounded-full bg-red-500/20 text-red-400 text-[10px] font-bold flex-shrink-0">
                          {i + 1}
                        </span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-violet-400">
                    Sharps on Site &mdash; Prevention:
                  </strong>{" "}
                  Never pick up discarded needles by hand, even with gloves.
                  Use tongs or a mechanical pick-up tool and place sharps in
                  a proper rigid-walled{" "}
                  <strong>
                    sharps container (yellow, conforming to BS 7320)
                  </strong>
                  . Mark and cordon off any area where sharps are found.
                  Report the find to your supervisor. If working in areas
                  where sharps may be present (derelict buildings, urban
                  sites), wear{" "}
                  <strong>puncture-resistant gloves</strong> and exercise
                  extreme caution when reaching into concealed spaces.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 07: Environmental Hazards */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">07</span>
            Environmental Hazards
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Beyond the specific biological agents already discussed,
                construction workers may encounter a range of environmental
                biological hazards depending on the site location and
                conditions.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-violet-400 mb-3">
                  Environmental Biological Hazards
                </p>
                <div className="space-y-3">
                  <div className="bg-black/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <ThermometerSun className="h-4 w-4 text-blue-400" />
                      <p className="text-xs font-medium text-blue-400">
                        Blue-Green Algae (Cyanobacteria)
                      </p>
                    </div>
                    <p className="text-xs text-white/70">
                      Found in rivers, canals, lakes, and reservoirs,
                      particularly during warm weather. Some species produce
                      toxins that can cause skin rashes, eye irritation,
                      vomiting, diarrhoea, fever, and in severe cases, liver
                      and nerve damage. Avoid contact with water where
                      blue-green algal blooms are present (often visible as
                      a green or blue-green scum on the surface). If you
                      must work near affected water, wear waterproof PPE
                      and avoid creating spray or splash.
                    </p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Droplets className="h-4 w-4 text-amber-400" />
                      <p className="text-xs font-medium text-amber-400">
                        Stagnant Water
                      </p>
                    </div>
                    <p className="text-xs text-white/70">
                      Standing water on construction sites provides a
                      breeding ground for bacteria, mosquitoes, and other
                      organisms. Excavations, basement sumps, and poorly
                      drained areas can accumulate stagnant water
                      contaminated with soil bacteria, rat urine, and
                      organic matter. Ensure adequate drainage, pump out
                      standing water promptly, and avoid direct skin
                      contact.
                    </p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Shield className="h-4 w-4 text-green-400" />
                      <p className="text-xs font-medium text-green-400">
                        Agricultural Environments
                      </p>
                    </div>
                    <p className="text-xs text-white/70">
                      Electricians working on farms, agricultural buildings,
                      or rural installations may be exposed to animal
                      pathogens including Leptospira (cattle, pigs),{" "}
                      <em>Chlamydophila abortus</em> (sheep &mdash;
                      particularly during lambing), <em>Coxiella burnetii</em>{" "}
                      (Q fever from cattle and sheep), and ringworm
                      (dermatophyte fungi from cattle). Avoid contact with
                      animal waste, wash hands thoroughly, and inform your
                      GP of your occupation if you develop unexplained
                      flu-like symptoms after farm work.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 08: Control Measures & Electrician-Specific Risks */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">08</span>
            Control Measures &amp; Electrician-Specific Risks
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Controlling exposure to biological agents follows the same
                hierarchy of control used for all workplace hazards under
                COSHH. However, the specific control measures for biological
                hazards place a strong emphasis on{" "}
                <strong>hygiene, vaccination, and welfare facilities</strong>{" "}
                &mdash; measures that are sometimes overlooked on construction
                sites.
              </p>

              {/* Control Measures Diagram */}
              <div className="bg-white/5 border border-violet-500/30 rounded-xl p-4 sm:p-6">
                <p className="text-sm font-semibold text-violet-400 mb-4 text-center">
                  Control Measures for Biological Agents
                </p>
                <div className="space-y-3">
                  <div className="bg-violet-500/10 border border-violet-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">
                        1
                      </span>
                      <p className="text-sm font-medium text-violet-400">
                        Elimination &amp; Avoidance
                      </p>
                    </div>
                    <p className="text-sm text-white/80">
                      Avoid work in contaminated areas where possible.
                      Re-route cables to avoid drainage runs. Schedule work
                      to avoid known contaminated zones. Commission
                      specialist cleaning before electrical work begins in
                      heavily contaminated areas.
                    </p>
                  </div>

                  <div className="bg-violet-500/10 border border-violet-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">
                        2
                      </span>
                      <p className="text-sm font-medium text-violet-400">
                        Engineering Controls
                      </p>
                    </div>
                    <p className="text-sm text-white/80">
                      Ventilation in enclosed spaces. Suppression of dust
                      and aerosol (dampen surfaces before disturbance).
                      Drainage and removal of standing water. Temperature
                      control of water systems (L8 compliance). Enclosure
                      of contaminated areas during disturbance.
                    </p>
                  </div>

                  <div className="bg-violet-500/10 border border-violet-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">
                        3
                      </span>
                      <p className="text-sm font-medium text-violet-400">
                        Hygiene &amp; Welfare
                      </p>
                    </div>
                    <p className="text-sm text-white/80 mb-2">
                      <strong className="text-white">
                        This is the single most important control for
                        biological hazards on construction sites.
                      </strong>
                    </p>
                    <ul className="text-sm text-white/80 space-y-1.5">
                      {[
                        "Thorough handwashing with soap and running water before eating, drinking, or smoking",
                        "All cuts, abrasions, and skin conditions covered with waterproof dressings",
                        "Adequate welfare facilities: clean running water, soap, paper towels, toilets",
                        "No eating, drinking, or smoking in contaminated work areas",
                        "Separate storage for clean and contaminated clothing",
                        "Showering facilities where significant contamination may occur",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-violet-500/10 border border-violet-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">
                        4
                      </span>
                      <p className="text-sm font-medium text-violet-400">
                        Vaccination
                      </p>
                    </div>
                    <p className="text-sm text-white/80">
                      Vaccination provides a critical additional layer of
                      protection where available. Employers should offer
                      appropriate vaccinations based on risk assessment:{" "}
                      <strong className="text-white">hepatitis A</strong>{" "}
                      for sewage/wastewater contact,{" "}
                      <strong className="text-white">hepatitis B</strong>{" "}
                      where sharps or blood contact is possible,{" "}
                      <strong className="text-white">tetanus</strong>{" "}
                      booster if not up to date. Vaccination does NOT
                      replace other controls &mdash; it is an additional
                      safeguard.
                    </p>
                  </div>

                  <div className="bg-violet-500/10 border border-violet-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">
                        5
                      </span>
                      <p className="text-sm font-medium text-violet-400">
                        Personal Protective Equipment (PPE)
                      </p>
                    </div>
                    <p className="text-sm text-white/80">
                      <strong className="text-white">FFP3 respirator</strong>{" "}
                      when disturbing contaminated dust or mould.{" "}
                      <strong className="text-white">
                        Waterproof gloves and boots
                      </strong>{" "}
                      for work in water, drains, or sewage.{" "}
                      <strong className="text-white">
                        Disposable coveralls
                      </strong>{" "}
                      when working in heavily contaminated areas.{" "}
                      <strong className="text-white">
                        Puncture-resistant gloves
                      </strong>{" "}
                      where discarded sharps may be present.{" "}
                      <strong className="text-white">
                        Eye protection
                      </strong>{" "}
                      where splashing is possible.
                    </p>
                  </div>
                </div>
              </div>

              {/* Electrician-Specific Risks */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-violet-400 mb-3">
                  Special Considerations for Electricians
                </p>
                <p className="text-sm text-white/80 mb-3">
                  Electricians encounter biological hazards in locations that
                  other trades may not routinely access. Understanding the
                  specific risks in these environments is critical.
                </p>
                <div className="space-y-3">
                  <div className="bg-black/30 rounded-lg p-3">
                    <p className="text-xs font-medium text-amber-400 mb-1">
                      Plant Rooms &amp; Boiler Rooms
                    </p>
                    <p className="text-xs text-white/70">
                      Proximity to water storage tanks, cooling systems, and
                      hot water systems creates Legionella risk. Standing
                      water from leaks may harbour bacteria. Poor
                      ventilation can concentrate airborne biological
                      agents. Check for unused or infrequently used water
                      outlets. Report lukewarm water from &ldquo;hot&rdquo;
                      systems.
                    </p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3">
                    <p className="text-xs font-medium text-amber-400 mb-1">
                      Ceiling Voids &amp; Loft Spaces
                    </p>
                    <p className="text-xs text-white/70">
                      Bird droppings, bat guano, rodent droppings, and mould
                      accumulate in undisturbed spaces. Running cables
                      through ceiling voids disturbs this contamination.
                      Carry out a visual inspection before entering. Wear
                      FFP3 respiratory protection if contamination is
                      visible. Bats are a protected species &mdash; stop
                      work and report if bats are found.
                    </p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3">
                    <p className="text-xs font-medium text-amber-400 mb-1">
                      Drainage Pump Stations
                    </p>
                    <p className="text-xs text-white/70">
                      Direct contact with sewage and wastewater. Confined
                      space hazards compound biological risks. Leptospirosis
                      risk from rat-contaminated water. Hepatitis A risk
                      from sewage. Ensure vaccination status is up to date.
                      Wear waterproof PPE. Wash and disinfect tools after
                      use. Never eat, drink, or smoke in or near the pump
                      station.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-violet-400">
                    Critical Reminder:
                  </strong>{" "}
                  If you develop unexplained flu-like symptoms within two
                  weeks of working in any environment where biological
                  hazards may have been present &mdash; drains, sewers,
                  standing water, animal waste, bird droppings, or
                  contaminated soil &mdash;{" "}
                  <strong>
                    seek medical attention and tell the doctor about your
                    work
                  </strong>
                  . Diseases like leptospirosis are often misdiagnosed as
                  common flu because doctors are not told about the
                  patient&rsquo;s occupational exposure. Early diagnosis
                  and treatment can be the difference between a full
                  recovery and a life-threatening complication.
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
          title="Section 4 Knowledge Check"
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
            <Link to="../coshh-awareness-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-violet-500 text-white hover:bg-violet-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../coshh-awareness-module-4">
              Next: Module 4
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
