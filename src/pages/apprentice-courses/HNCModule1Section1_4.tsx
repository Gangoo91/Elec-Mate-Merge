import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "COSHH and Hazardous Substances - HNC Module 1 Section 1.4";
const DESCRIPTION = "Comprehensive guide to COSHH regulations, hazardous substance assessments, control measures hierarchy and health surveillance requirements for building services engineering.";

const quickCheckQuestions = [
  {
    id: "coshh-definition",
    question: "What does COSHH stand for?",
    options: [
      "Control of Substances Hazardous to Health",
      "Classification of Substances Harmful to Health",
      "Control of Safety Hazards on Highways",
      "Compliance of Substances and Health Hazards"
    ],
    correctIndex: 0,
    explanation: "COSHH stands for Control of Substances Hazardous to Health. These regulations (2002) require employers to control exposure to hazardous substances to prevent ill health in the workplace."
  },
  {
    id: "control-hierarchy",
    question: "In the hierarchy of control measures, what should be considered first?",
    options: [
      "Personal protective equipment",
      "Engineering controls",
      "Elimination or substitution",
      "Administrative controls"
    ],
    correctIndex: 2,
    explanation: "Elimination (removing the hazard entirely) or substitution (replacing with a less hazardous substance) should always be considered first. PPE should only be used as a last resort when other controls are not reasonably practicable."
  },
  {
    id: "ghs-pictogram",
    question: "Which GHS pictogram indicates a substance is harmful to the environment?",
    options: [
      "Skull and crossbones",
      "Flame",
      "Dead fish and tree",
      "Exclamation mark"
    ],
    correctIndex: 2,
    explanation: "The GHS pictogram showing a dead fish and tree indicates environmental hazards. This warns that the substance is dangerous to aquatic life and should not be released into drains or watercourses."
  },
  {
    id: "health-surveillance",
    question: "When is health surveillance required under COSHH?",
    options: [
      "For all workers using any chemicals",
      "Only for workers using carcinogens",
      "When there is a reasonable likelihood of disease related to exposure",
      "Only when requested by employees"
    ],
    correctIndex: 2,
    explanation: "Health surveillance is required when there is a reasonable likelihood that an identifiable disease or adverse health effect may be related to the exposure, and valid techniques exist for detecting the disease or effect."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Under COSHH 2002, which of the following is NOT classified as a hazardous substance?",
    options: [
      "Soldering flux fumes",
      "Refrigerant gases",
      "Untreated wood shavings",
      "Cement dust"
    ],
    correctAnswer: 2,
    explanation: "Untreated natural wood is not classified as hazardous under COSHH (though hardwood dust is). Soldering flux produces harmful fumes, refrigerants can displace oxygen and cause cold burns, and cement dust is alkaline and causes skin and respiratory irritation."
  },
  {
    id: 2,
    question: "What is the Workplace Exposure Limit (WEL) for?",
    options: [
      "The maximum time a worker can spend in a hazardous area",
      "The maximum concentration of a hazardous substance in workplace air",
      "The maximum number of workers exposed to a substance",
      "The minimum ventilation rate required"
    ],
    correctAnswer: 1,
    explanation: "Workplace Exposure Limits (WELs) set the maximum concentration of airborne substances averaged over a reference period (usually 8 hours or 15 minutes for short-term limits). They are published in HSE document EH40."
  },
  {
    id: 3,
    question: "A COSHH assessment must be reviewed:",
    options: [
      "Every 12 months regardless of circumstances",
      "Only when an incident occurs",
      "When there is reason to suspect it is no longer valid",
      "Only when new substances are introduced"
    ],
    correctAnswer: 2,
    explanation: "COSHH assessments must be reviewed when there is reason to suspect they are no longer valid - this includes changes to work processes, new information about hazards, incidents, or ill health reports. Regular review is good practice, but the legal trigger is when validity is in doubt."
  },
  {
    id: 4,
    question: "Which refrigerant type poses the greatest environmental concern for ozone depletion?",
    options: [
      "HFCs (hydrofluorocarbons)",
      "HCFCs (hydrochlorofluorocarbons)",
      "Natural refrigerants (CO2, ammonia)",
      "HFOs (hydrofluoroolefins)"
    ],
    correctAnswer: 1,
    explanation: "HCFCs contain chlorine which depletes the ozone layer. While being phased out under the Montreal Protocol, they may still be found in older systems. HFCs have zero ODP but high GWP. Natural refrigerants and HFOs have minimal environmental impact."
  },
  {
    id: 5,
    question: "What information must be included in Section 8 of a Safety Data Sheet?",
    options: [
      "First aid measures",
      "Exposure controls and personal protection",
      "Ecological information",
      "Physical and chemical properties"
    ],
    correctAnswer: 1,
    explanation: "Section 8 of an SDS covers exposure controls and personal protection, including occupational exposure limits and recommended PPE. First aid is Section 4, physical properties Section 9, and ecological information Section 12."
  },
  {
    id: 6,
    question: "When working with soldering flux, which control measure is most appropriate?",
    options: [
      "Working near an open window",
      "Local exhaust ventilation (fume extraction)",
      "Respiratory protective equipment only",
      "Limiting work to 4 hours per day"
    ],
    correctAnswer: 1,
    explanation: "Local exhaust ventilation (LEV) captures fumes at source before they enter the breathing zone. It is the preferred engineering control for soldering operations. Natural ventilation is inadequate, RPE should be a last resort, and time limits alone don't prevent exposure."
  },
  {
    id: 7,
    question: "Under CLP Regulations, what does the signal word 'Danger' indicate?",
    options: [
      "A minor hazard requiring attention",
      "A more severe hazard category",
      "The substance is flammable",
      "The substance requires special disposal"
    ],
    correctAnswer: 1,
    explanation: "Under CLP (Classification, Labelling and Packaging), 'Danger' is the signal word for more severe hazard categories, while 'Warning' is used for less severe hazards. The signal word provides an immediate indication of hazard severity."
  },
  {
    id: 8,
    question: "What is the primary health risk from prolonged exposure to silica dust in construction?",
    options: [
      "Contact dermatitis",
      "Silicosis and lung cancer",
      "Hearing loss",
      "Musculoskeletal disorders"
    ],
    correctAnswer: 1,
    explanation: "Respirable crystalline silica (RCS) causes silicosis - an irreversible lung disease - and is a known carcinogen causing lung cancer. It is generated when cutting, drilling, or grinding concrete, brick, or stone - common activities in building services installation."
  },
  {
    id: 9,
    question: "Which document provides details of Workplace Exposure Limits in the UK?",
    options: [
      "COSHH Regulations 2002",
      "EH40 Workplace Exposure Limits",
      "The CLP Regulation",
      "BS 7671"
    ],
    correctAnswer: 1,
    explanation: "EH40 'Workplace Exposure Limits' is the HSE publication listing all UK WELs, updated regularly. It provides the legal limits that must not be exceeded and guidance on measurement and control."
  },
  {
    id: 10,
    question: "A building services engineer discovers an unlabelled chemical container on site. What should they do?",
    options: [
      "Dispose of it in general waste",
      "Assume it is safe and use it",
      "Not use it and report it to the supervisor",
      "Label it themselves based on appearance"
    ],
    correctAnswer: 2,
    explanation: "Unlabelled containers must never be used - the contents are unknown and could be hazardous. Report to the supervisor so proper identification can be arranged. Never assume safety or attempt to identify by smell, colour, or appearance."
  },
  {
    id: 11,
    question: "Which of these is an example of substitution as a control measure?",
    options: [
      "Using extraction equipment",
      "Replacing solvent-based adhesive with water-based",
      "Wearing respiratory protection",
      "Limiting exposure time"
    ],
    correctAnswer: 1,
    explanation: "Substitution means replacing a hazardous substance with a less hazardous alternative. Replacing solvent-based products with water-based versions eliminates volatile organic compound (VOC) exposure. This is higher in the hierarchy than engineering controls or PPE."
  },
  {
    id: 12,
    question: "What is the purpose of COSHH health surveillance records?",
    options: [
      "To monitor worker productivity",
      "To detect early signs of work-related ill health",
      "To track PPE usage",
      "To record training completion"
    ],
    correctAnswer: 1,
    explanation: "Health surveillance aims to detect early signs of work-related ill health so action can be taken before serious harm occurs. Records must be kept for at least 40 years as some occupational diseases have long latency periods."
  }
];

const faqs = [
  {
    question: "What substances are covered by COSHH?",
    answer: "COSHH covers chemicals, products containing chemicals, fumes, dusts, vapours, mists, nanotechnology, gases, biological agents, and germs causing diseases. In building services, common examples include refrigerants, soldering flux, adhesives, sealants, cleaning chemicals, and dusts from cutting concrete or cable materials."
  },
  {
    question: "Who is responsible for carrying out COSHH assessments?",
    answer: "The employer has legal responsibility for COSHH assessments, but they can delegate the task to a competent person. On construction sites, assessments may be carried out by the principal contractor, but each employer remains responsible for their own workers. Self-employed persons must assess their own exposure."
  },
  {
    question: "How long must COSHH assessments and health records be kept?",
    answer: "COSHH assessments should be reviewed and updated regularly - there is no statutory retention period but keeping them for at least 5 years is recommended. Health surveillance records must be kept for 40 years from the date of the last entry, as some occupational diseases can take decades to develop."
  },
  {
    question: "What is the difference between a Safety Data Sheet and a COSHH assessment?",
    answer: "A Safety Data Sheet (SDS) is provided by the manufacturer/supplier and gives information about the substance itself - hazards, properties, handling. A COSHH assessment is carried out by the employer and considers the specific way the substance is used in their workplace, the actual exposure, and the control measures needed."
  },
  {
    question: "Are there any substances not covered by COSHH?",
    answer: "COSHH does not cover lead (covered by Control of Lead at Work Regulations 2002), asbestos (covered by Control of Asbestos Regulations 2012), radioactive substances, or hazards from the physical properties of substances such as high pressure, temperature, or explosive properties."
  },
  {
    question: "What training is required for workers exposed to hazardous substances?",
    answer: "Workers must receive suitable and sufficient information, instruction and training on: the nature of substances and their risks; the findings of the COSHH assessment; precautions to take; results of exposure monitoring; health surveillance requirements; and emergency procedures. Training must be repeated when circumstances change."
  }
];

const HNCModule1Section1_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module1-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 1.1.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            COSHH and Hazardous Substances
          </h1>
          <p className="text-white/80">
            Understanding the Control of Substances Hazardous to Health and protecting workers in building services
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>COSHH 2002:</strong> Regulations controlling workplace exposure to hazardous substances</li>
              <li className="pl-1"><strong>Assessment:</strong> Identify hazards, evaluate risks, implement controls</li>
              <li className="pl-1"><strong>Hierarchy:</strong> Eliminate, substitute, engineer, administrate, PPE</li>
              <li className="pl-1"><strong>Surveillance:</strong> Monitor health of exposed workers</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Refrigerants:</strong> Asphyxiation, frostbite, environmental impact</li>
              <li className="pl-1"><strong>Flux and solder:</strong> Fume inhalation, lead exposure (older solder)</li>
              <li className="pl-1"><strong>Dusts:</strong> Silica from concrete, insulation fibres</li>
              <li className="pl-1"><strong>Chemicals:</strong> Solvents, adhesives, lubricants, cleaning agents</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define what constitutes a hazardous substance under COSHH",
              "Explain the five steps of COSHH assessment",
              "Apply the hierarchy of control measures correctly",
              "Identify when health surveillance is required",
              "Recognise hazardous substances in building services work",
              "Interpret Safety Data Sheets and GHS/CLP labelling"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 1: What Are Hazardous Substances */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What Are Hazardous Substances?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Control of Substances Hazardous to Health Regulations 2002 (COSHH) requires employers
              to control exposure to hazardous substances to prevent ill health. A hazardous substance
              is any substance that can cause harm to health.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Substances covered by COSHH:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Chemicals:</strong> Acids, alkalis, solvents, adhesives</li>
                <li className="pl-1"><strong>Fumes:</strong> Welding fumes, soldering flux fumes</li>
                <li className="pl-1"><strong>Dusts:</strong> Wood dust, silica dust, insulation fibres</li>
                <li className="pl-1"><strong>Vapours and mists:</strong> Paint spray, cleaning agent vapours</li>
                <li className="pl-1"><strong>Gases:</strong> Refrigerants, carbon monoxide, nitrogen</li>
                <li className="pl-1"><strong>Biological agents:</strong> Bacteria, viruses (e.g., legionella in water systems)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Routes of Entry into the Body</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Route</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Building Services Examples</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Inhalation</td>
                      <td className="border border-white/10 px-3 py-2">Breathing in fumes, dusts, gases</td>
                      <td className="border border-white/10 px-3 py-2">Soldering flux fumes, refrigerant gases, silica dust</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Skin absorption</td>
                      <td className="border border-white/10 px-3 py-2">Contact with skin allowing penetration</td>
                      <td className="border border-white/10 px-3 py-2">Solvents, oils, some adhesives</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ingestion</td>
                      <td className="border border-white/10 px-3 py-2">Swallowing (often from contaminated hands)</td>
                      <td className="border border-white/10 px-3 py-2">Lead from older solder, contamination from poor hygiene</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Injection</td>
                      <td className="border border-white/10 px-3 py-2">Entry through cuts or puncture wounds</td>
                      <td className="border border-white/10 px-3 py-2">Contaminated sharps, high-pressure injection</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm text-red-300">
                <strong>Not covered by COSHH:</strong> Lead (Control of Lead at Work Regulations 2002),
                asbestos (Control of Asbestos Regulations 2012), radioactive substances, and physical
                hazards such as high pressure, temperature extremes, or explosive properties.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: COSHH Assessment Process */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            COSHH Assessment Process
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Employers must carry out a suitable and sufficient assessment of health risks from
              hazardous substances. The assessment must be reviewed when circumstances change or
              there is reason to believe it is no longer valid.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Five Steps of COSHH Assessment</p>
              <div className="space-y-3">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-elec-yellow mb-1">Step 1: Identify the Hazards</p>
                  <ul className="text-sm text-white/90 list-disc list-outside ml-5">
                    <li>List all substances used, produced, or encountered</li>
                    <li>Obtain Safety Data Sheets from suppliers</li>
                    <li>Consider by-products (fumes from heating materials)</li>
                    <li>Include substances brought on site by others</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-elec-yellow mb-1">Step 2: Evaluate the Risks</p>
                  <ul className="text-sm text-white/90 list-disc list-outside ml-5">
                    <li>Who might be exposed and how?</li>
                    <li>What is the level and duration of exposure?</li>
                    <li>Compare to Workplace Exposure Limits (WELs)</li>
                    <li>Consider combined effects of multiple substances</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-elec-yellow mb-1">Step 3: Control the Risks</p>
                  <ul className="text-sm text-white/90 list-disc list-outside ml-5">
                    <li>Apply hierarchy of control measures</li>
                    <li>Select appropriate controls for each substance</li>
                    <li>Document control measures in writing</li>
                    <li>Ensure controls are properly implemented</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-elec-yellow mb-1">Step 4: Record and Implement</p>
                  <ul className="text-sm text-white/90 list-disc list-outside ml-5">
                    <li>Document assessment findings</li>
                    <li>Communicate to all affected workers</li>
                    <li>Provide information, instruction and training</li>
                    <li>Ensure adequate supervision</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-elec-yellow mb-1">Step 5: Review and Update</p>
                  <ul className="text-sm text-white/90 list-disc list-outside ml-5">
                    <li>Review when no longer valid</li>
                    <li>Update when processes or substances change</li>
                    <li>Review after incidents or ill health reports</li>
                    <li>Consider new information about hazards</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Workplace Exposure Limits (WELs)</p>
              <p className="text-sm text-white/90 mb-3">
                WELs are published in HSE document EH40 and set the maximum concentration of
                hazardous substances in workplace air. Two types exist:
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-1">Long-term (8-hour TWA)</p>
                  <p className="text-sm text-white/70">Time-weighted average over 8-hour reference period</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-1">Short-term (15-minute)</p>
                  <p className="text-sm text-white/70">Maximum for any 15-minute period during the day</p>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> A COSHH assessment is site-specific. A generic assessment may
              be a starting point, but must be adapted to actual working conditions.
            </p>
          </div>
        </section>

        {/* Section 3: Control Measures Hierarchy */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Control Measures Hierarchy
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Control measures must be applied in order of preference. Higher-level controls are
              more effective as they address the hazard at source rather than relying on human
              behaviour or protective equipment.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Hierarchy of Control (Most to Least Effective)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Priority</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Control Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Building Services Examples</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-green-500/10">
                      <td className="border border-white/10 px-3 py-2 font-medium">1st</td>
                      <td className="border border-white/10 px-3 py-2"><strong>Elimination</strong></td>
                      <td className="border border-white/10 px-3 py-2">Use mechanical joints instead of soldering; prefabricate off-site</td>
                    </tr>
                    <tr className="bg-green-500/5">
                      <td className="border border-white/10 px-3 py-2 font-medium">2nd</td>
                      <td className="border border-white/10 px-3 py-2"><strong>Substitution</strong></td>
                      <td className="border border-white/10 px-3 py-2">Water-based adhesives instead of solvent-based; lead-free solder</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">3rd</td>
                      <td className="border border-white/10 px-3 py-2"><strong>Engineering controls</strong></td>
                      <td className="border border-white/10 px-3 py-2">Local exhaust ventilation; enclosure; wet cutting to suppress dust</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">4th</td>
                      <td className="border border-white/10 px-3 py-2"><strong>Administrative controls</strong></td>
                      <td className="border border-white/10 px-3 py-2">Safe systems of work; job rotation; warning signs; training</td>
                    </tr>
                    <tr className="bg-orange-500/10">
                      <td className="border border-white/10 px-3 py-2 font-medium">5th</td>
                      <td className="border border-white/10 px-3 py-2"><strong>PPE (last resort)</strong></td>
                      <td className="border border-white/10 px-3 py-2">Respirators; gloves; goggles; protective clothing</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Engineering Control Examples</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>LEV:</strong> Fume extraction for soldering</li>
                  <li className="pl-1"><strong>Enclosure:</strong> Dust extraction at cutting point</li>
                  <li className="pl-1"><strong>Isolation:</strong> Separate storage for chemicals</li>
                  <li className="pl-1"><strong>Dilution ventilation:</strong> General air exchange</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">PPE Selection Factors</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Suitable for the hazard (check protection factor)</li>
                  <li className="pl-1">Correctly fitted (face-fit testing for RPE)</li>
                  <li className="pl-1">Compatible with other PPE</li>
                  <li className="pl-1">Properly maintained and stored</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm text-orange-300">
                <strong>PPE Limitation:</strong> PPE only protects the individual wearing it and only
                when worn correctly. It can fail, be uncomfortable, and requires training, maintenance
                and supervision. Always exhaust higher-level controls first.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Building Services Hazards and Safety Data Sheets */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Building Services Hazards and Safety Data Sheets
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Building services engineers encounter numerous hazardous substances. Understanding
              Safety Data Sheets (SDS) and GHS/CLP labelling is essential for safe working.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Building Services Hazardous Substances</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Substance</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Hazards</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Control Measures</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2"><strong>Refrigerants</strong></td>
                      <td className="border border-white/10 px-3 py-2">Asphyxiation, frostbite, cardiac sensitisation</td>
                      <td className="border border-white/10 px-3 py-2">Ventilation, leak detection, F-gas certification</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2"><strong>Soldering flux</strong></td>
                      <td className="border border-white/10 px-3 py-2">Respiratory sensitisation, occupational asthma</td>
                      <td className="border border-white/10 px-3 py-2">LEV fume extraction, use less hazardous flux</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2"><strong>Solvents</strong></td>
                      <td className="border border-white/10 px-3 py-2">Narcosis, dermatitis, organ damage</td>
                      <td className="border border-white/10 px-3 py-2">Ventilation, gloves, substitute with water-based</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2"><strong>Silica dust</strong></td>
                      <td className="border border-white/10 px-3 py-2">Silicosis, lung cancer (RCS)</td>
                      <td className="border border-white/10 px-3 py-2">Wet cutting, on-tool extraction, RPE</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2"><strong>Cable lubricants</strong></td>
                      <td className="border border-white/10 px-3 py-2">Skin irritation, sensitisation</td>
                      <td className="border border-white/10 px-3 py-2">Gloves, barrier cream, wash facilities</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2"><strong>Fibrous insulation</strong></td>
                      <td className="border border-white/10 px-3 py-2">Skin, eye and respiratory irritation</td>
                      <td className="border border-white/10 px-3 py-2">Coveralls, gloves, goggles, dust mask</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Safety Data Sheet (SDS) - 16 Sections</p>
              <div className="grid sm:grid-cols-2 gap-2 text-sm">
                <div className="p-2 rounded bg-white/5">1. Identification</div>
                <div className="p-2 rounded bg-white/5">2. Hazard identification</div>
                <div className="p-2 rounded bg-white/5">3. Composition/ingredients</div>
                <div className="p-2 rounded bg-white/5">4. First-aid measures</div>
                <div className="p-2 rounded bg-white/5">5. Fire-fighting measures</div>
                <div className="p-2 rounded bg-white/5">6. Accidental release</div>
                <div className="p-2 rounded bg-white/5">7. Handling and storage</div>
                <div className="p-2 rounded bg-elec-yellow/20 border border-elec-yellow/30">8. Exposure controls/PPE</div>
                <div className="p-2 rounded bg-white/5">9. Physical/chemical properties</div>
                <div className="p-2 rounded bg-white/5">10. Stability and reactivity</div>
                <div className="p-2 rounded bg-white/5">11. Toxicological information</div>
                <div className="p-2 rounded bg-white/5">12. Ecological information</div>
                <div className="p-2 rounded bg-white/5">13. Disposal considerations</div>
                <div className="p-2 rounded bg-white/5">14. Transport information</div>
                <div className="p-2 rounded bg-white/5">15. Regulatory information</div>
                <div className="p-2 rounded bg-white/5">16. Other information</div>
              </div>
              <p className="text-xs text-white/60 mt-2">Section 8 (highlighted) is particularly important for COSHH assessments.</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">GHS/CLP Hazard Pictograms</p>
              <div className="grid grid-cols-3 sm:grid-cols-3 gap-3 text-center text-xs">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-bold text-white mb-1">Flame</p>
                  <p className="text-white/70">Flammable substances</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-bold text-white mb-1">Skull &amp; Crossbones</p>
                  <p className="text-white/70">Acute toxicity (severe)</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-bold text-white mb-1">Exclamation Mark</p>
                  <p className="text-white/70">Irritant, harmful</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-bold text-white mb-1">Corrosion</p>
                  <p className="text-white/70">Corrosive to skin/metals</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-bold text-white mb-1">Health Hazard</p>
                  <p className="text-white/70">CMR, sensitiser, STOT</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-bold text-white mb-1">Environment</p>
                  <p className="text-white/70">Aquatic toxicity</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-bold text-white mb-1">Gas Cylinder</p>
                  <p className="text-white/70">Gases under pressure</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-bold text-white mb-1">Oxidiser</p>
                  <p className="text-white/70">May cause fire</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-bold text-white mb-1">Explosive</p>
                  <p className="text-white/70">Explosion hazard</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">CLP Signal Words</p>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="p-3 rounded bg-red-500/10 border border-red-500/30">
                  <p className="font-medium text-red-300 mb-1">DANGER</p>
                  <p className="text-sm text-white/70">More severe hazard categories</p>
                </div>
                <div className="p-3 rounded bg-orange-500/10 border border-orange-500/30">
                  <p className="font-medium text-orange-300 mb-1">WARNING</p>
                  <p className="text-sm text-white/70">Less severe hazard categories</p>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Never use unlabelled containers. If you find one, do not
              attempt to identify contents - report to supervisor for proper identification and disposal.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Health Surveillance Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Health Surveillance Requirements</h2>

          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Health surveillance is required when there is a reasonable likelihood that an identifiable
              disease or adverse health effect may result from workplace exposure to hazardous substances,
              and valid techniques exist to detect the condition.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">When Health Surveillance is Required</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Exposure to substances causing occupational asthma (e.g., rosin-based flux)</li>
                <li className="pl-1">Work with substances assigned 'Sk' or 'Sen' notations in EH40</li>
                <li className="pl-1">Exposure to substances causing dermatitis</li>
                <li className="pl-1">Exposure to certain carcinogens and mutagens</li>
                <li className="pl-1">When specified in other regulations (e.g., lead, asbestos)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Types of Health Surveillance</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Examples</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Biological monitoring</td>
                      <td className="border border-white/10 px-3 py-2">Measurement of substances/metabolites in body</td>
                      <td className="border border-white/10 px-3 py-2">Blood lead levels, urinary mercury</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Biological effect monitoring</td>
                      <td className="border border-white/10 px-3 py-2">Measurement of early biological changes</td>
                      <td className="border border-white/10 px-3 py-2">Lung function tests (spirometry)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Medical examination</td>
                      <td className="border border-white/10 px-3 py-2">Clinical examination by doctor</td>
                      <td className="border border-white/10 px-3 py-2">Skin examination for dermatitis</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Health questionnaire</td>
                      <td className="border border-white/10 px-3 py-2">Regular symptom enquiries</td>
                      <td className="border border-white/10 px-3 py-2">Respiratory symptom questionnaire</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm text-blue-300">
                <strong>Record retention:</strong> Health surveillance records must be kept for at
                least 40 years from the date of the last entry. This is because some occupational
                diseases, such as mesothelioma from asbestos exposure, can take decades to develop.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key COSHH Duties</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Assessment:</strong> Carry out suitable and sufficient risk assessment</li>
                <li className="pl-1"><strong>Prevention/Control:</strong> Prevent exposure or adequately control it</li>
                <li className="pl-1"><strong>Use of controls:</strong> Ensure control measures are used and maintained</li>
                <li className="pl-1"><strong>Monitoring:</strong> Monitor exposure where required</li>
                <li className="pl-1"><strong>Surveillance:</strong> Provide health surveillance where appropriate</li>
                <li className="pl-1"><strong>Information:</strong> Provide information, instruction and training</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Emergency Procedures</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Know location of emergency equipment (eyewash, spill kits)</li>
                <li className="pl-1">Understand evacuation procedures for gas leaks</li>
                <li className="pl-1">Know first aid procedures for chemical exposure</li>
                <li className="pl-1">Report all spills, leaks and exposure incidents</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Generic assessments:</strong> Must be specific to actual work conditions</li>
                <li className="pl-1"><strong>PPE first:</strong> Using PPE before considering elimination/substitution</li>
                <li className="pl-1"><strong>Ignoring by-products:</strong> Fumes from heating are still hazardous</li>
                <li className="pl-1"><strong>No review:</strong> Assessments must be kept up to date</li>
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

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Key Legislation</p>
                <ul className="space-y-0.5">
                  <li>COSHH Regulations 2002</li>
                  <li>CLP Regulation (EC) 1272/2008</li>
                  <li>EH40 - Workplace Exposure Limits</li>
                  <li>Approved Code of Practice L5</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Control Hierarchy</p>
                <ul className="space-y-0.5">
                  <li>1. Elimination</li>
                  <li>2. Substitution</li>
                  <li>3. Engineering controls</li>
                  <li>4. Administrative controls</li>
                  <li>5. PPE (last resort)</li>
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
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module1-section1-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Manual Handling
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module1-section1-5">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule1Section1_4;
