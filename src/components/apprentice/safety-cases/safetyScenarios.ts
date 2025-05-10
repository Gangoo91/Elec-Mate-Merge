
export interface SafetyScenario {
  id: number;
  title: string;
  description: string;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    feedback: string;
    outcome: string;
    regulation?: string;
  }[];
}

export const safetyScenarios: SafetyScenario[] = [
  {
    id: 1,
    title: "Circuit Energisation",
    description: "You're working on a commercial site with tight deadlines.",
    question: "You arrive on site and the supervisor asks you to energise a circuit before insulation resistance testing. What do you do?",
    options: [
      {
        id: "A",
        text: "Do it anyway to keep the project on schedule",
        isCorrect: false,
        feedback: "This creates a serious safety risk and violates regulations.",
        outcome: "The circuit has an undetected fault and causes a short circuit when energised, damaging equipment and creating a fire hazard.",
        regulation: "BS 7671 requires insulation resistance testing before energising any circuit to verify electrical safety."
      },
      {
        id: "B",
        text: "Tell the supervisor you'll test first as required by regulations",
        isCorrect: true,
        feedback: "This is the correct approach that prioritises safety over schedule.",
        outcome: "Your testing reveals a fault that could have caused serious issues. The supervisor appreciates your professionalism after the potential risk is explained.",
        regulation: "BS 7671 Section 643 requires insulation resistance testing before energising circuits."
      },
      {
        id: "C",
        text: "Ask your mentor for advice first",
        isCorrect: false,
        feedback: "While seeking advice is good, you should be confident in applying basic safety regulations yourself.",
        outcome: "Delay in decision-making causes project uncertainty. Your mentor advises testing first, but your hesitation affects the supervisor's confidence in you.",
        regulation: "As a responsible electrician, you should know that BS 7671 requires testing before energisation."
      },
      {
        id: "D",
        text: "Walk off site in protest",
        isCorrect: false,
        feedback: "This is an unprofessional reaction that fails to address the safety issue constructively.",
        outcome: "You damage your professional reputation. The supervisor gets someone else to do the work who might comply with the unsafe request.",
        regulation: "Instead of walking off, you should explain the requirements of BS 7671 regarding testing before energisation."
      }
    ]
  },
  {
    id: 2,
    title: "Untested Equipment",
    description: "You're on a residential job with a homeowner watching your work.",
    question: "The homeowner hands you an expensive light fitting they purchased online and asks you to install it. It has no visible CE/UKCA marking. What do you do?",
    options: [
      {
        id: "A",
        text: "Install it since the customer insists it's high quality",
        isCorrect: false,
        feedback: "Installing non-compliant equipment is dangerous and could invalidate your work certification.",
        outcome: "The fitting later develops a fault causing damage to the property. You're held professionally responsible for installing non-compliant equipment.",
        regulation: "The Electrical Equipment (Safety) Regulations require equipment to meet safety standards and carry proper certification markings."
      },
      {
        id: "B",
        text: "Explain you can't install uncertified equipment and offer alternatives",
        isCorrect: true,
        feedback: "This maintains professional standards while providing good customer service.",
        outcome: "The customer initially resists but understands when you explain the safety and insurance implications. They appreciate your professionalism.",
        regulation: "Part P of Building Regulations and BS 7671 require all installed equipment to meet relevant safety standards."
      },
      {
        id: "C",
        text: "Install it but have the customer sign a waiver",
        isCorrect: false,
        feedback: "Waivers don't protect you from regulatory obligations or potential harm.",
        outcome: "When the installation causes problems, your waiver doesn't protect you from regulatory action or liability for known unsafe work.",
        regulation: "No waiver can override the Electricity at Work Regulations requirement to ensure safety."
      },
      {
        id: "D",
        text: "Tell them to find another electrician",
        isCorrect: false,
        feedback: "This avoids the immediate problem but misses a customer education opportunity.",
        outcome: "The customer finds another electrician who may not enforce safety standards, potentially creating hazards.",
        regulation: "A better approach is to explain the requirements of the Electrical Equipment (Safety) Regulations."
      }
    ]
  },
  {
    id: 3,
    title: "Working at Height",
    description: "You need to install lighting in a stairwell with a 4-metre drop.",
    question: "The customer hasn't provided proper scaffolding, but offers a ladder and says 'the last electrician managed fine'. What's your response?",
    options: [
      {
        id: "A",
        text: "Use the ladder but work quickly to minimise risk",
        isCorrect: false,
        feedback: "Working quickly at height actually increases risk of accidents.",
        outcome: "While rushing, you lose balance and fall, resulting in serious injury and inability to work for months.",
        regulation: "The Work at Height Regulations 2005 require suitable equipment for working safely at height with proper risk assessment."
      },
      {
        id: "B",
        text: "Explain that proper scaffolding or tower access is required by law",
        isCorrect: true,
        feedback: "This correctly prioritises safety and compliance with regulations.",
        outcome: "The customer arranges proper access equipment, the job is completed safely, and you maintain your professional standards.",
        regulation: "The Work at Height Regulations 2005 require suitable access equipment and prohibit improper ladder use."
      },
      {
        id: "C",
        text: "Attempt to create a makeshift platform using available furniture",
        isCorrect: false,
        feedback: "Improvised platforms create serious safety hazards and violate regulations.",
        outcome: "The unstable platform collapses, damaging the property and risking serious injury.",
        regulation: "The Work at Height Regulations 2005 explicitly prohibit using improvised platforms."
      },
      {
        id: "D",
        text: "Do the work but charge extra for the dangerous conditions",
        isCorrect: false,
        feedback: "Charging extra doesn't make unsafe work acceptable or legal.",
        outcome: "If an accident occurs, you would still be liable regardless of extra payment, as you knowingly violated safety regulations.",
        regulation: "The Health and Safety at Work Act places personal responsibility on workers to refuse unsafe work practices."
      }
    ]
  },
  {
    id: 4,
    title: "Hazardous Materials",
    description: "You're renovating an older property built in the 1970s.",
    question: "While removing old ceiling panels, you discover what might be asbestos-containing materials. What should you do?",
    options: [
      {
        id: "A",
        text: "Continue carefully to avoid creating dust",
        isCorrect: false,
        feedback: "Even careful handling of potential asbestos materials is dangerous without proper equipment.",
        outcome: "You unknowingly release asbestos fibres, creating a serious health hazard for yourself and others on site.",
        regulation: "The Control of Asbestos Regulations 2012 prohibit unlicensed work with asbestos-containing materials."
      },
      {
        id: "B",
        text: "Stop work immediately and inform the property owner",
        isCorrect: true,
        feedback: "This is the correct approach to potential asbestos discovery.",
        outcome: "Work is safely paused, proper testing is arranged, and appropriate licensed contractors are brought in if needed.",
        regulation: "The Control of Asbestos Regulations 2012 require stopping work and proper assessment of suspected asbestos materials."
      },
      {
        id: "C",
        text: "Remove it yourself wearing a dust mask",
        isCorrect: false,
        feedback: "Regular dust masks offer inadequate protection against asbestos fibres.",
        outcome: "You're exposed to hazardous asbestos fibres that could cause serious lung disease later in life.",
        regulation: "The Control of Asbestos Regulations 2012 require special licensing, training and equipment for asbestos removal."
      },
      {
        id: "D",
        text: "Cover it with new materials and continue the job",
        isCorrect: false,
        feedback: "Concealing potential asbestos without proper assessment creates future hazards.",
        outcome: "Future workers or occupants may unknowingly disturb the material, creating serious health risks.",
        regulation: "The Control of Asbestos Regulations 2012 require proper assessment and management of asbestos-containing materials."
      }
    ]
  },
  {
    id: 5,
    title: "Live Working",
    description: "You're troubleshooting a fault in a commercial kitchen during business hours.",
    question: "The chef insists you can't shut off power as they're preparing for dinner service. How do you proceed?",
    options: [
      {
        id: "A",
        text: "Work live carefully to avoid disrupting the kitchen service",
        isCorrect: false,
        feedback: "Working live to avoid inconvenience is never justified and violates safety regulations.",
        outcome: "An accidental contact causes an electrical shock and possible injury, as well as regulatory violations.",
        regulation: "The Electricity at Work Regulations 1989 prohibit live working unless absolutely necessary and with proper precautions."
      },
      {
        id: "B",
        text: "Explain the legal requirement to isolate and arrange a suitable time",
        isCorrect: true,
        feedback: "This properly balances safety requirements with business needs.",
        outcome: "You arrange to return after service or schedule a proper shutdown with adequate notice, maintaining safety and professional standards.",
        regulation: "The Electricity at Work Regulations 1989 require circuits to be dead before work begins unless absolutely unavoidable."
      },
      {
        id: "C",
        text: "Convince the chef it will only take a minute to fix while live",
        isCorrect: false,
        feedback: "Rushing live electrical work greatly increases accident risks.",
        outcome: "Working hastily leads to mistakes that cause a short circuit, damaging equipment and potentially causing injury.",
        regulation: "The Electricity at Work Regulations 1989 never permit live working simply for convenience."
      },
      {
        id: "D",
        text: "Shut off power without further discussion as it's your legal right",
        isCorrect: false,
        feedback: "While safety is paramount, communication and cooperation are still essential.",
        outcome: "Your actions damage client relationships and could lead to complaints or loss of business.",
        regulation: "While the Electricity at Work Regulations 1989 require safe working, proper communication is also a professional requirement."
      }
    ]
  },
  {
    id: 6,
    title: "Temporary Power Supply",
    description: "You're setting up a temporary power supply on a construction site.",
    question: "The site manager asks you to install a distribution board without an RCD for power tools. What do you do?",
    options: [
      {
        id: "A",
        text: "Install it as requested since it's only temporary",
        isCorrect: false,
        feedback: "Temporary installations have the same safety requirements as permanent ones.",
        outcome: "A worker receives an electric shock from a faulty power tool, leading to serious injury and an HSE investigation.",
        regulation: "BS 7671 and the Electricity at Work Regulations require RCD protection for socket outlets, especially in construction environments."
      },
      {
        id: "B",
        text: "Explain that RCD protection is legally required and offer to install it properly",
        isCorrect: true,
        feedback: "This upholds safety standards while providing a solution.",
        outcome: "Your properly installed distribution board with RCD protection prevents an injury when a power tool develops a fault later that week.",
        regulation: "The Electricity at Work Regulations 1989 and BS 7671 require RCD protection for construction site power supplies."
      },
      {
        id: "C",
        text: "Install it without an RCD but add a warning label",
        isCorrect: false,
        feedback: "Warning labels don't substitute for required safety devices.",
        outcome: "The warning is ignored, and when equipment fails, a worker is injured. You're held partially liable for the non-compliant installation.",
        regulation: "Warning labels do not exempt you from the requirements of BS 7671 regarding RCD protection."
      },
      {
        id: "D",
        text: "Suggest using battery-powered tools instead",
        isCorrect: false,
        feedback: "While this avoids the immediate issue, it doesn't solve the fundamental safety requirement.",
        outcome: "Battery tools aren't suitable for all applications, leading to unsafe workarounds and potential injury.",
        regulation: "The Construction (Design and Management) Regulations 2015 require suitable and safe electrical installations regardless of power source."
      }
    ]
  },
  {
    id: 7,
    title: "Confined Space Work",
    description: "You need to replace lighting in a small plant room with limited access.",
    question: "While working in the confined space, you begin to feel light-headed. What's your next action?",
    options: [
      {
        id: "A",
        text: "Continue working quickly to finish the job sooner",
        isCorrect: false,
        feedback: "Continuing to work while experiencing symptoms could lead to serious injury or death.",
        outcome: "You lose consciousness due to poor ventilation and are found by a colleague who risks their own safety to rescue you.",
        regulation: "The Confined Spaces Regulations 1997 requires proper assessment and emergency procedures for confined space work."
      },
      {
        id: "B",
        text: "Exit immediately and report the issue",
        isCorrect: true,
        feedback: "This prioritises your safety and allows proper investigation of the hazard.",
        outcome: "Testing reveals dangerous gas levels in the plant room. A proper ventilation system is installed before work continues safely.",
        regulation: "The Confined Spaces Regulations 1997 requires workers to evacuate if they suspect dangerous conditions."
      },
      {
        id: "C",
        text: "Open a door for ventilation and continue working",
        isCorrect: false,
        feedback: "This improvised solution may not adequately address the underlying hazard.",
        outcome: "The ventilation remains inadequate, your condition worsens, and you require medical attention.",
        regulation: "The Confined Spaces Regulations 1997 requires proper risk assessment and control measures, not improvised solutions."
      },
      {
        id: "D",
        text: "Take a short break and return to finish the job",
        isCorrect: false,
        feedback: "Taking a break doesn't address the underlying hazard in the confined space.",
        outcome: "Upon returning, your symptoms return more severely, putting you at serious risk.",
        regulation: "Under the Management of Health and Safety at Work Regulations, you must report hazards and not expose yourself to known risks."
      }
    ]
  },
  {
    id: 8,
    title: "Working Near Water",
    description: "You're installing outdoor lighting near a water feature at a commercial property.",
    question: "It starts raining heavily while you're working with electrical equipment. What should you do?",
    options: [
      {
        id: "A",
        text: "Continue working but try to shield the equipment with your body",
        isCorrect: false,
        feedback: "This creates serious electrocution risks and doesn't adequately protect the equipment.",
        outcome: "Water ingress causes a short circuit, resulting in electric shock and possible serious injury.",
        regulation: "The Electricity at Work Regulations 1989 prohibit work where weather conditions create additional hazards with electricity."
      },
      {
        id: "B",
        text: "Stop work, cover equipment properly, and resume when conditions improve",
        isCorrect: true,
        feedback: "This properly addresses the increased risk from rain and protects both you and the equipment.",
        outcome: "Work is completed safely when weather improves, with no incidents or equipment damage.",
        regulation: "BS 7671 and the Electricity at Work Regulations require suitable working conditions for electrical work, especially near water."
      },
      {
        id: "C",
        text: "Use additional extension leads to work from under shelter",
        isCorrect: false,
        feedback: "Improvising with extension leads in wet conditions creates additional hazards.",
        outcome: "The extension leads become wet, creating shock hazards and potential equipment damage.",
        regulation: "The Provision and Use of Work Equipment Regulations (PUWER) requires equipment to be used in suitable conditions."
      },
      {
        id: "D",
        text: "Quickly finish the current task despite the rain",
        isCorrect: false,
        feedback: "Rushing in hazardous conditions increases risk and may lead to mistakes.",
        outcome: "In your rush, connections are poorly made, leading to water ingress and system failure after you leave.",
        regulation: "The Management of Health and Safety at Work Regulations require stopping work when conditions become unsafe."
      }
    ]
  },
  {
    id: 9,
    title: "Fire Safety Compliance",
    description: "You're installing downlights in a ceiling with fire barriers.",
    question: "You notice that the specified downlights don't have fire ratings. What's your response?",
    options: [
      {
        id: "A",
        text: "Install them anyway since that's what was specified",
        isCorrect: false,
        feedback: "Installing non-fire-rated fixtures in fire barriers compromises building safety.",
        outcome: "The installation fails inspection and must be redone at significant cost. The building's fire safety certification is delayed.",
        regulation: "Building Regulations Part B (Fire Safety) requires maintaining fire compartmentation when installing fixtures in fire barriers."
      },
      {
        id: "B",
        text: "Stop and consult with the supervisor about using fire-rated alternatives",
        isCorrect: true,
        feedback: "This maintains fire safety integrity while seeking a proper solution.",
        outcome: "Fire-rated alternatives are sourced, maintaining the building's fire safety design and passing inspection.",
        regulation: "Building Regulations Approved Document B requires appropriate fire-rated fittings when penetrating fire barriers."
      },
      {
        id: "C",
        text: "Add extra insulation around the non-fire-rated fittings",
        isCorrect: false,
        feedback: "Improvised fire protection may not meet regulations and could create additional hazards.",
        outcome: "The improvised solution fails inspection and must be redone. The insulation itself becomes a fire hazard due to proximity to the light fittings.",
        regulation: "Building Regulations require certified fire-rated products, not improvised solutions, for fire barrier penetrations."
      },
      {
        id: "D",
        text: "Install them but don't connect the power until getting approval",
        isCorrect: false,
        feedback: "This still compromises the fire barrier integrity regardless of whether power is connected.",
        outcome: "The installation fails inspection due to compromised fire compartmentation, requiring costly remedial work.",
        regulation: "The Regulatory Reform (Fire Safety) Order 2005 makes it an offence to compromise fire safety measures in buildings."
      }
    ]
  },
  {
    id: 10,
    title: "Hot Works Risk",
    description: "You need to use a heat gun near flammable materials to shrink heat-shrink tubing.",
    question: "What precautions should you take before proceeding?",
    options: [
      {
        id: "A",
        text: "Work quickly to minimise heat exposure time",
        isCorrect: false,
        feedback: "Speed doesn't reduce the fire risk; proper controls need to be in place.",
        outcome: "In your haste, you accidentally ignite nearby materials, causing a fire that damages property.",
        regulation: "The Dangerous Substances and Explosive Atmospheres Regulations 2002 (DSEAR) requires proper risk assessment for hot work."
      },
      {
        id: "B",
        text: "Conduct a hot work risk assessment and have fire extinguishers ready",
        isCorrect: true,
        feedback: "This follows proper hot work procedures and prepares for emergency response.",
        outcome: "The work is completed safely with appropriate controls in place to prevent fire.",
        regulation: "The Regulatory Reform (Fire Safety) Order 2005 and DSEAR require risk assessment and control measures for hot work."
      },
      {
        id: "C",
        text: "Ask someone else to hold the materials while you apply heat",
        isCorrect: false,
        feedback: "This puts another person at risk rather than controlling the hazard.",
        outcome: "The other person is exposed to heat and potential burns, creating another safety incident.",
        regulation: "The Health and Safety at Work Act requires not putting others at risk through your work activities."
      },
      {
        id: "D",
        text: "Use the heat gun at maximum temperature to finish faster",
        isCorrect: false,
        feedback: "Using excessive heat increases fire risk and may damage materials.",
        outcome: "The excessive heat ignites nearby materials and damages the electrical components you're working on.",
        regulation: "The Provision and Use of Work Equipment Regulations require equipment to be used appropriately for the task."
      }
    ]
  }
];
