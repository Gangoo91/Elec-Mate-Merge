/**
 * Level 3 Module 1 Section 4.3 - Confined Space Hazards and Permits
 *
 * Covers confined space regulations, permits to work, and rescue procedures
 * following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Confined Space Hazards and Permits - Level 3 Module 1 Section 4.3";
const DESCRIPTION = "Understanding confined space hazards, permit to work systems, atmospheric testing and rescue procedures for electrical work in the UK construction industry.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is the legal definition of a confined space?",
    options: [
      "Any space smaller than 2 metres square",
      "Any enclosed space with restricted entry/exit where serious injury could occur from hazardous substances or conditions",
      "Underground spaces only",
      "Spaces without natural lighting"
    ],
    correctIndex: 1,
    explanation: "A confined space is any place that is substantially enclosed (though not necessarily entirely), where serious injury could occur from hazardous substances or conditions (like lack of oxygen). Size alone does not define it."
  },
  {
    id: "check-2",
    question: "What is the primary hazard that causes most confined space fatalities?",
    options: [
      "Falling from height",
      "Electrical shock",
      "Atmospheric hazards (lack of oxygen, toxic/flammable gases)",
      "Physical entrapment"
    ],
    correctIndex: 2,
    explanation: "Atmospheric hazards cause most confined space deaths. Oxygen depletion, toxic gas accumulation, and flammable atmospheres are invisible killers. People have died entering spaces that looked and smelled normal."
  },
  {
    id: "check-3",
    question: "What must always be in place before anyone enters a confined space?",
    options: [
      "A mobile phone signal",
      "A permit to work and emergency rescue procedures",
      "Air conditioning",
      "A written letter from the HSE"
    ],
    correctIndex: 1,
    explanation: "Before any confined space entry, there must be a permit to work system (for higher risk spaces), a safe system of work, atmospheric testing where appropriate, and crucially, emergency rescue procedures must be in place BEFORE entry."
  },
  {
    id: "check-4",
    question: "Why do rescuers often become victims in confined space incidents?",
    options: [
      "They are not physically fit enough",
      "They enter without proper precautions to rescue the first victim",
      "Confined spaces are too small for two people",
      "Rescue is impossible in confined spaces"
    ],
    correctIndex: 1,
    explanation: "Many confined space fatalities are rescuers who entered without proper precautions. Seeing a colleague collapse, the natural instinct is to rush in - but without breathing apparatus and rescue training, they often become victims of the same atmospheric hazard."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which regulation specifically covers work in confined spaces in the UK?",
    options: [
      "Work at Height Regulations 2005",
      "Confined Spaces Regulations 1997",
      "COSHH Regulations 2002",
      "CDM Regulations 2015"
    ],
    correctAnswer: 1,
    explanation: "The Confined Spaces Regulations 1997 specifically address confined space work, requiring risk assessment, avoidance of entry where possible, safe systems of work, and emergency arrangements."
  },
  {
    id: 2,
    question: "What is the normal oxygen level in breathable air?",
    options: [
      "15%",
      "19%",
      "21%",
      "25%"
    ],
    correctAnswer: 2,
    explanation: "Normal breathable air contains approximately 21% oxygen. Levels below 19.5% are considered oxygen deficient. At 16% or below, impaired judgement and rapid fatigue occur. Below 10% causes unconsciousness and death."
  },
  {
    id: 3,
    question: "Which of the following is NOT a typical confined space for electricians?",
    options: [
      "Cable tunnels",
      "Large switch rooms",
      "Manholes and chambers",
      "Lift motor rooms"
    ],
    correctAnswer: 1,
    explanation: "Large switch rooms with normal access and ventilation are not confined spaces. Cable tunnels, manholes, chambers, and lift motor rooms (especially small ones with limited access) can all be confined spaces depending on their characteristics."
  },
  {
    id: 4,
    question: "Before entering a confined space, what atmospheric test should be done?",
    options: [
      "Only oxygen levels",
      "Only flammable gas levels",
      "Oxygen levels, flammable gases, and toxic gases as appropriate",
      "No testing is required if it looks safe"
    ],
    correctAnswer: 2,
    explanation: "Atmospheric testing should check oxygen levels (19.5-23.5% acceptable), flammable gas concentrations (below LEL), and toxic gases appropriate to the hazards (e.g., hydrogen sulphide in drains, carbon monoxide near combustion)."
  },
  {
    id: 5,
    question: "What is the purpose of a top man or hole watch in confined space work?",
    options: [
      "To pass tools to workers inside",
      "To maintain communication, monitor workers, and initiate rescue if needed",
      "To complete paperwork",
      "To keep members of the public away"
    ],
    correctAnswer: 1,
    explanation: "The top man/hole watch maintains constant communication with entrants, monitors for signs of distress, raises the alarm if problems occur, and initiates emergency rescue procedures. They must never enter the space during an emergency without proper precautions."
  },
  {
    id: 6,
    question: "What should a permit to work for confined space entry include?",
    options: [
      "Only the date and names of workers",
      "Hazards identified, controls required, atmospheric monitoring, rescue arrangements, and authorisation",
      "A map of the building only",
      "Insurance details"
    ],
    correctAnswer: 1,
    explanation: "A confined space permit should identify hazards, specify control measures (ventilation, testing, PPE), require atmospheric monitoring results, detail rescue arrangements, and require authorised signatures for both entry and completion."
  },
  {
    id: 7,
    question: "How can oxygen levels become depleted in a confined space?",
    options: [
      "Only through fire consuming oxygen",
      "Displacement by other gases, absorption by surfaces, consumption by rusting/decomposition, or combustion",
      "Oxygen cannot be depleted in confined spaces",
      "Only in spaces below ground level"
    ],
    correctAnswer: 1,
    explanation: "Oxygen can be depleted by: displacement by other gases (nitrogen purging, CO2 from decomposition), absorption by surfaces (rusting steel), consumption by biological processes (sewage decomposition), or combustion processes."
  },
  {
    id: 8,
    question: "What is the Lower Explosive Limit (LEL) and why is it important?",
    options: [
      "The maximum safe temperature for working",
      "The minimum concentration of flammable gas/vapour that can ignite",
      "The lowest height from which falls are dangerous",
      "The minimum lighting level required"
    ],
    correctAnswer: 1,
    explanation: "The Lower Explosive Limit (LEL) is the minimum concentration of gas or vapour in air that can ignite. Work should not proceed above 10% of the LEL. Below the LEL, the mixture is too lean to ignite."
  },
  {
    id: 9,
    question: "What type of rescue equipment must be available for confined space work?",
    options: [
      "A mobile phone is sufficient",
      "Breathing apparatus, retrieval systems, and trained rescue personnel or arrangements",
      "A first aid kit only",
      "Rescue equipment is optional"
    ],
    correctAnswer: 1,
    explanation: "Rescue provisions must include appropriate breathing apparatus, retrieval systems (harnesses, tripods, winches), and either trained on-site rescue personnel or arrangements for emergency services. Equipment must be tested and personnel trained."
  },
  {
    id: 10,
    question: "When working in a drain chamber, what specific gas hazard should you be aware of?",
    options: [
      "Nitrogen",
      "Hydrogen sulphide (H2S)",
      "Argon",
      "Helium"
    ],
    correctAnswer: 1,
    explanation: "Hydrogen sulphide (H2S) is produced by decomposing organic matter in drains and sewers. It is extremely toxic - at low concentrations it smells of rotten eggs, but at higher concentrations it deadens the sense of smell, giving a false sense of safety."
  },
  {
    id: 11,
    question: "What is continuous atmospheric monitoring and when is it required?",
    options: [
      "Testing once at the start of work",
      "Ongoing real-time monitoring throughout the work, required when conditions may change",
      "Monthly testing",
      "Annual calibration checks"
    ],
    correctAnswer: 1,
    explanation: "Continuous monitoring uses personal gas monitors worn by entrants, providing real-time alerts if atmospheric conditions deteriorate. It is required when conditions may change (ongoing processes, work generating fumes) and best practice in most confined space entries."
  },
  {
    id: 12,
    question: "If your personal gas monitor alarms while you are in a confined space, what should you do?",
    options: [
      "Check if it is a false alarm and continue working",
      "Exit immediately using the planned exit route and report",
      "Hold your breath and finish the task quickly",
      "Wait to see if the alarm stops"
    ],
    correctAnswer: 1,
    explanation: "If your gas monitor alarms, treat it as real and exit immediately. Do not investigate or continue working. Report the alarm. The space should not be re-entered until the cause is identified and conditions confirmed safe."
  }
];

const faqs = [
  {
    question: "Is a small electrical riser cupboard a confined space?",
    answer: "It depends on the specific characteristics. If it has normal access, adequate ventilation, no hazardous atmosphere potential, and no risk of engulfment, it is not a confined space. However, if access is restricted, ventilation is poor, or there are potential atmospheric hazards, it may need to be treated as one."
  },
  {
    question: "Can I enter a confined space briefly without a permit?",
    answer: "The regulations require avoiding confined space entry where reasonably practicable. Where entry is essential, a safe system of work must be in place. For higher-risk spaces, this means a permit to work. Even brief entries require risk assessment, atmospheric testing, and rescue arrangements."
  },
  {
    question: "How long is atmospheric testing valid for?",
    answer: "Pre-entry testing provides a snapshot at that moment. Conditions can change due to ongoing processes, work activities, or external factors. Continuous monitoring should be used during work where conditions may change. Re-test before re-entry after breaks."
  },
  {
    question: "What training do I need for confined space work?",
    answer: "Anyone entering confined spaces needs training appropriate to the risks: hazard awareness, use of monitoring equipment, use of PPE including RPE where required, emergency procedures, and role-specific training. Rescue team members need additional specialist training."
  },
  {
    question: "Who can authorise a confined space permit to work?",
    answer: "Permits must be authorised by a competent person who understands the hazards, controls required, and has authority to authorise the work. This is typically a supervisor or manager trained in confined space procedures, not the person doing the work."
  },
  {
    question: "What is the difference between intrinsically safe and flameproof equipment?",
    answer: "Intrinsically safe equipment limits energy to levels that cannot ignite flammable atmospheres. Flameproof equipment contains any explosion within its enclosure. In potentially flammable confined spaces, intrinsically safe equipment (like certain gas monitors and torches) must be used."
  }
];

const Level3Module1Section4_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">

      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module1-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Article Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 1.4.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Confined Space Hazards and Permits
          </h1>
          <p className="text-white/80">
            Understanding the invisible dangers - atmospheric hazards, permit systems, and rescue procedures
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Definition:</strong> Enclosed space + hazardous conditions = confined space</li>
              <li><strong>#1 Killer:</strong> Atmospheric hazards - you cannot see, smell, or taste them</li>
              <li><strong>Permit:</strong> Required for entry to high-risk confined spaces</li>
              <li><strong>Rescue:</strong> Must be planned BEFORE entry - rescuers often die too</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Manholes, chambers, tunnels, tanks, enclosed rooms</li>
              <li><strong>Use:</strong> Gas monitors, permits, rescue equipment</li>
              <li><strong>Check:</strong> Atmospheric readings, permit validity, rescue arrangements</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define what constitutes a confined space",
              "Identify the main hazards in confined spaces",
              "Understand permit to work requirements",
              "Know atmospheric testing requirements",
              "Recognise the importance of rescue planning",
              "Apply safe entry procedures for electrical work"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01 - What is a Confined Space */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What is a Confined Space?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A confined space is not defined by size alone. Under the Confined Spaces Regulations 1997, a confined space is any place that is substantially enclosed (though not necessarily entirely enclosed) where serious injury could occur from hazardous substances or conditions within the space or nearby. This includes oxygen deficiency, toxic atmospheres, flammable atmospheres, and free-flowing solids that could cause engulfment.
            </p>

            <p>
              As an electrician, you may encounter confined spaces more often than you realise. Cable tunnels and ducts, electrical manholes and chambers, switch rooms with restricted ventilation, ceiling voids with limited access, service risers and shafts, and tank interiors all potentially qualify. The key question is not "how big is the space?" but rather "could the conditions in or near this space cause serious harm?"
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common confined spaces for electricians:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Cable tunnels:</strong> Underground passages with limited access and potential for oxygen depletion</li>
                <li><strong>Manholes and chambers:</strong> Access points for underground services, potential toxic gas accumulation</li>
                <li><strong>Service ducts:</strong> Enclosed routes for multiple services, limited ventilation</li>
                <li><strong>Large switchboards:</strong> Can become confined spaces during maintenance if enclosed</li>
                <li><strong>Lift shafts:</strong> Enclosed vertical spaces with limited access and potential falls</li>
                <li><strong>Tanks and vessels:</strong> For industrial installations, severe atmospheric risks</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> The definition is not about size - it is about the combination of restricted access and the potential for serious harm from conditions inside or nearby. A large storage tank and a small valve chamber can both be confined spaces.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 - Atmospheric Hazards */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Atmospheric Hazards
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Atmospheric hazards are the primary cause of confined space fatalities. Unlike falls or machinery, you cannot see, smell, or feel most atmospheric hazards until it is too late. Workers have entered spaces that looked completely normal and collapsed within seconds from oxygen deficiency or toxic gases. Many die without even knowing anything was wrong.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Oxygen deficiency</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Normal air: 21% oxygen</li>
                  <li>Below 19.5%: Oxygen deficient</li>
                  <li>Below 16%: Impaired judgement, fatigue</li>
                  <li>Below 10%: Unconsciousness, death</li>
                  <li>Causes: Rusting, decomposition, purging</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Toxic atmospheres</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Carbon monoxide (CO) - odourless killer</li>
                  <li>Hydrogen sulphide (H2S) - drains, sewers</li>
                  <li>Carbon dioxide (CO2) - displacement</li>
                  <li>Solvent vapours - industrial processes</li>
                  <li>May be undetectable without monitors</li>
                </ul>
              </div>
            </div>

            <p>
              <strong>Flammable atmospheres:</strong> Many confined spaces can contain flammable gases or vapours. In drains and sewers, methane from decomposition accumulates. In industrial settings, process gases or cleaning solvents create explosive atmospheres. The Lower Explosive Limit (LEL) is the minimum concentration that can ignite - work should not proceed above 10% of LEL.
            </p>

            <p>
              <strong>Why atmospheric hazards are so dangerous:</strong> You cannot rely on your senses. Oxygen-depleted air looks, smells, and feels like normal air - until you collapse. H2S deadens your sense of smell at higher concentrations. Carbon monoxide is completely odourless. The only reliable protection is atmospheric monitoring with calibrated equipment before and during entry.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> Two workers entered a cable chamber to carry out routine jointing work. Unknown to them, decomposing organic matter that had washed into the chamber had consumed much of the oxygen. The first worker collapsed immediately. The second rushed to help and also collapsed. Both died from oxygen deficiency. The chamber had been entered safely many times before - conditions had changed.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 - Permit to Work Systems */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Permit to Work Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A permit to work (PTW) is a formal written system for controlling high-risk activities. For confined space work, the permit ensures that all necessary precautions have been identified and implemented before anyone enters. It is not just bureaucracy - it is a life-saving checklist that ensures nothing is overlooked when the consequences of an error are death.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">A confined space permit to work should include:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Clear identification of the confined space and work to be done</li>
                <li>Hazards identified through risk assessment</li>
                <li>Control measures required (ventilation, isolation, testing)</li>
                <li>Atmospheric monitoring requirements and acceptable readings</li>
                <li>PPE and RPE requirements</li>
                <li>Communication methods</li>
                <li>Emergency rescue arrangements</li>
                <li>Time limits and extension procedures</li>
                <li>Authorisation signatures</li>
              </ul>
            </div>

            <p>
              <strong>The permit process:</strong> The permit must be issued by an authorised person who understands the hazards and controls. It must be signed by the person accepting responsibility for the work. The permit is only valid for the specified time and scope - any changes require a new permit or formal extension. On completion, the permit must be cancelled and signed off.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Preparation</p>
                <p className="text-white/90 text-xs">Risk assessment, control measures planned, rescue arranged</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Issue</p>
                <p className="text-white/90 text-xs">Authorised person checks controls, issues permit</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Close-out</p>
                <p className="text-white/90 text-xs">Work completed, permit cancelled, space made safe</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Never enter a confined space without the required permit and controls in place. If conditions change or the permit expires, work must stop until a new permit is issued. The permit is your life insurance - take it seriously.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 - Emergency Rescue */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Emergency Rescue Arrangements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Rescue arrangements are not an afterthought - they must be in place BEFORE anyone enters a confined space. Statistics show that a significant proportion of confined space deaths are attempted rescuers who entered without proper precautions. The natural human instinct to help a colleague in distress overrides rational thinking, leading to multiple fatalities from a single incident.
            </p>

            <p>
              <strong>Why rescuers become victims:</strong> Seeing a colleague collapse triggers an immediate response to help. Without thinking, rescuers enter the same hazardous atmosphere that caused the first victim to collapse. Without breathing apparatus, they too are overcome - often within seconds. In some incidents, four or five people have died trying to rescue one initial victim.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Rescue requirements under the regulations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Trained personnel:</strong> Either on-site rescue team or confirmed emergency services capability</li>
                <li><strong>Rescue equipment:</strong> Breathing apparatus, retrieval lines, harnesses, tripods, winches</li>
                <li><strong>Communication:</strong> Reliable contact between entrants, top man, and rescue services</li>
                <li><strong>Procedures:</strong> Written rescue procedure practised and understood by all</li>
                <li><strong>First aid:</strong> Trained first aiders and appropriate equipment available</li>
              </ul>
            </div>

            <p>
              <strong>The role of the top man/hole watch:</strong> At least one person must remain outside the confined space at all times. Their role is to maintain communication with entrants, monitor for signs of distress, control access to the space, raise the alarm if problems occur, and initiate rescue procedures. Critically, they must NOT enter the space without proper protection.
            </p>

            <p>
              <strong>Non-entry rescue:</strong> Where possible, rescue should be achievable without someone entering the hazardous atmosphere. Retrieval lines attached to harnesses, tripods over vertical entries with winches, and communication systems all enable non-entry rescue. This is always preferable to entry rescue which places the rescuer at risk.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> An incident at a water treatment works: a worker collapsed in a chamber. A colleague immediately climbed down to help, followed by a third. All three were overcome by hydrogen sulphide. Emergency services used breathing apparatus to recover the bodies. The third victim had actually survived the fall - he died waiting for rescue while others tried unsuccessfully to help. Proper rescue arrangements would have saved all three.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Before Any Confined Space Entry</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Question whether entry is actually necessary - can the work be done from outside?</li>
                <li>Check the permit to work is valid and covers your work</li>
                <li>Verify atmospheric testing has been done and readings are acceptable</li>
                <li>Confirm rescue arrangements are in place and understood</li>
                <li>Ensure your gas monitor is calibrated and working</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">During Confined Space Work</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Wear personal gas monitor at all times</li>
                <li>Maintain communication with top man</li>
                <li>Exit immediately if gas monitor alarms</li>
                <li>Do not exceed permit time limits</li>
                <li>Report any changes in conditions</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Rushing entry without testing</strong> - "it was fine last time" kills people</li>
                <li><strong>Not wearing a gas monitor</strong> - your senses cannot detect most hazards</li>
                <li><strong>Entering to rescue without BA</strong> - you will become another victim</li>
                <li><strong>Ignoring alarm activation</strong> - treat every alarm as real</li>
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
                <p className="font-medium text-white mb-1">Acceptable Atmospheric Limits</p>
                <ul className="space-y-0.5">
                  <li>Oxygen: 19.5% - 23.5%</li>
                  <li>Flammable gas: Below 10% LEL</li>
                  <li>CO: Below 30 ppm (8hr TWA)</li>
                  <li>H2S: Below 5 ppm (8hr TWA)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Permit Checklist</p>
                <ul className="space-y-0.5">
                  <li>Valid for the work and time?</li>
                  <li>Atmospheric testing done?</li>
                  <li>Controls in place?</li>
                  <li>Rescue arrangements confirmed?</li>
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
            <Link to="/study-centre/apprentice/level3-module1-section4-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Working at Height
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module1-section4-4">
              Next: Fire Safety
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module1Section4_3;
