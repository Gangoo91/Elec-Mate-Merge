interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export const riskBasedDesignQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Why are risk-based adjustments necessary in emergency lighting design?",
    options: [
      "To increase installation costs",
      "Every building has unique challenges that generic minimum standards may not address",
      "To comply with insurance requirements only",
      "They are not necessary if BS 5266 is followed"
    ],
    correct: 1,
    explanation: "Every building presents unique challenges including different occupant types, building functions, and hazards that generic minimum standards may not adequately address for true safety."
  },
  {
    id: 2,
    question: "Name two building factors that influence emergency lighting requirements.",
    options: [
      "Colour scheme and architectural style",
      "Occupant profile and building function",
      "Building age and construction materials only",
      "Local weather and seasonal variations"
    ],
    correct: 1,
    explanation: "Occupant profile (familiar vs unfamiliar, vulnerable groups) and building function (hazardous activities, security sensitivity) are key factors that influence lighting requirements beyond basic standards."
  },
  {
    id: 3,
    question: "Give one example of a vulnerable group that may need brighter lighting.",
    options: [
      "Office workers during normal hours",
      "Elderly residents in care homes with reduced vision",
      "Retail customers during shopping",
      "Security guards on patrol"
    ],
    correct: 1,
    explanation: "Elderly residents in care homes often have reduced vision and mobility, requiring higher lux levels (3-5 lux vs 1 lux minimum) to navigate safely during evacuation."
  },
  {
    id: 4,
    question: "What is the standard lux level for escape routes, and why might it need to be increased?",
    options: [
      "5 lux standard, increase for aesthetics",
      "1 lux standard, increase for vulnerable occupants or complex layouts",
      "10 lux standard, never needs increasing",
      "0.5 lux standard, increase for legal compliance"
    ],
    correct: 1,
    explanation: "The standard minimum is 1 lux for escape routes, but this may need increasing to 3-10 lux for vulnerable occupants, complex layouts, or hazardous environments."
  },
  {
    id: 5,
    question: "Why do theatres often need adapted lighting strategies?",
    options: [
      "For better stage lighting effects",
      "To maintain low background levels while providing wayfinding without disrupting dark adaptation",
      "To reduce electricity costs",
      "For architectural aesthetics only"
    ],
    correct: 1,
    explanation: "Theatres need wayfinding lighting that maintains low background levels to avoid disrupting audience dark adaptation while still providing adequate guidance during evacuation."
  },
  {
    id: 6,
    question: "How long must emergency lighting last in high-rise buildings?",
    options: [
      "30 minutes is sufficient",
      "1 hour like all buildings",
      "3 hours due to extended evacuation times",
      "Duration depends on building height only"
    ],
    correct: 2,
    explanation: "High-rise buildings generally require 3-hour duration due to extended evacuation times caused by stairwell capacity limits and phased evacuation procedures."
  },
  {
    id: 7,
    question: "What is one reason staff may need lighting to last beyond initial evacuation?",
    options: [
      "To continue normal work activities",
      "Re-entry requirements to shut down equipment or systems safely",
      "For security patrols only",
      "To clean up after evacuation"
    ],
    correct: 1,
    explanation: "Staff may need to re-enter evacuated areas to safely shut down hazardous equipment, secure valuable items, or assist emergency services, requiring extended lighting duration."
  },
  {
    id: 8,
    question: "Where might extra luminaires be required to support disabled occupants?",
    options: [
      "Only in designated disabled toilets",
      "At refuge points and accessible escape routes including ramps and lifts",
      "In all areas equally",
      "Extra luminaires are not needed for disabled access"
    ],
    correct: 1,
    explanation: "Disabled occupants need enhanced lighting at refuge points where they may wait for assistance, accessible escape routes including ramps, and evacuation lift controls."
  },
  {
    id: 9,
    question: "Who is responsible for carrying out the fire risk assessment?",
    options: [
      "The emergency lighting installer",
      "The Responsible Person under the Fire Safety Order",
      "The local fire service",
      "The building insurance company"
    ],
    correct: 1,
    explanation: "The Responsible Person under the Fire Safety Order (typically the building owner or manager) is responsible for the fire risk assessment, though electricians should use its findings to inform design."
  },
  {
    id: 10,
    question: "Why is 'designing to the bare minimum' a poor practice in emergency lighting design?",
    options: [
      "It's too expensive for clients",
      "Minimum standards may not provide adequate safety for specific building risks and vulnerable occupants",
      "It's not required by regulations",
      "It makes installation more difficult"
    ],
    correct: 1,
    explanation: "Minimum standards provide a baseline but may not address specific building risks, vulnerable occupants, or unique hazards. Designing to actual safety needs ensures genuine protection during emergencies."
  }
];