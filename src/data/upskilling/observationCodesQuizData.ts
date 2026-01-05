export const observationCodesQuizQuestions = [
  {
    id: 1,
    question: "A socket outlet has a cracked faceplate exposing live terminals that can be touched without tools. What observation code should be applied?",
    options: [
      "C3 - Improvement recommended",
      "C2 - Potentially dangerous", 
      "C1 - Danger present",
      "FI - Further investigation required"
    ],
    correct: 2,
    explanation: "C1 is correct because live parts are accessible to touch without tools, creating immediate risk of electric shock. This represents immediate danger requiring urgent action to make the installation safe."
  },
  {
    id: 2,
    question: "An RCD protecting bathroom circuits is found to have a test time of 45ms at 5×IΔn (requirement ≤40ms). What code is most appropriate?",
    options: [
      "C1 - Danger present",
      "C2 - Potentially dangerous",
      "C3 - Improvement recommended", 
      "No observation required as it's close to the limit"
    ],
    correct: 1,
    explanation: "C2 is appropriate because the RCD is not operating within required parameters, creating potential danger if a fault occurs. While marginally outside limits, it represents urgent remedial requirement for proper protection."
  },
  {
    id: 3,
    question: "A domestic installation from 1985 has socket outlets without RCD protection. The installation is in good condition otherwise. What observation code applies?",
    options: [
      "C1 - Danger present",
      "C2 - Potentially dangerous",
      "C3 - Improvement recommended",
      "No observation required due to age"
    ],
    correct: 2,
    explanation: "C3 is correct. The installation predates RCD requirements but adding RCD protection would enhance safety. This is an improvement recommendation rather than a compliance failure requiring urgent action."
  },
  {
    id: 4,
    question: "A circuit cannot be tested because it supplies critical computer equipment that cannot be shut down. How should this be classified?",
    options: [
      "C3 - Improvement recommended",
      "C2 - Potentially dangerous",
      "FI - Further investigation required",
      "No observation needed"
    ],
    correct: 2,
    explanation: "FI is appropriate when the safety status cannot be determined due to testing limitations. The circuit requires investigation during planned maintenance or using alternative testing methods to determine its condition."
  },
  {
    id: 5,
    question: "The main earthing conductor is found to be 6mm² instead of the required 16mm² for the installation size. What code should be applied?",
    options: [
      "C1 - Danger present",
      "C2 - Potentially dangerous",
      "C3 - Improvement recommended",
      "FI - Further investigation required"
    ],
    correct: 1,
    explanation: "C2 is correct because inadequate main earthing creates potential danger in fault conditions. While not immediately dangerous in normal operation, it represents urgent requirement for proper fault protection."
  },
  {
    id: 6,
    question: "Socket outlets in a kitchen installed in 2010 do not have RCD protection. What observation code is most appropriate?",
    options: [
      "C1 - Danger present",
      "C2 - Potentially dangerous", 
      "C3 - Improvement recommended",
      "No observation required"
    ],
    correct: 1,
    explanation: "C2 is correct. Installations after 2008 require RCD protection for socket outlets, and kitchen locations have enhanced risk. This represents non-compliance with regulations requiring urgent remedial action."
  },
  {
    id: 7,
    question: "An inspection reveals unusual test results that don't clearly indicate compliance or non-compliance. Further specialist analysis is needed. What code applies?",
    options: [
      "C2 - Potentially dangerous until proven otherwise",
      "C3 - Improvement recommended based on uncertainty",
      "FI - Further investigation required",
      "No observation until results are clear"
    ],
    correct: 2,
    explanation: "FI is correct when test results are unusual and require specialist analysis to determine safety status. This ensures proper investigation rather than making assumptions about safety."
  },
  {
    id: 8,
    question: "A client asks you to downgrade a C2 observation to C3 to avoid urgent costs. What should you do?",
    options: [
      "Agree to maintain good client relationships",
      "Refuse and maintain your professional assessment",
      "Compromise with a detailed explanation in the report",
      "Seek a second opinion before deciding"
    ],
    correct: 1,
    explanation: "Professional integrity requires maintaining your technical assessment regardless of commercial pressure. Changing codes for non-technical reasons compromises safety and professional liability."
  },
  {
    id: 9,
    question: "A defect could be classified as either C1 or C2 depending on interpretation. What approach should you take?",
    options: [
      "Always choose the higher classification to be safe",
      "Choose C2 to avoid unnecessary alarm", 
      "Apply systematic decision criteria consistently",
      "Use FI to avoid the decision"
    ],
    correct: 2,
    explanation: "Apply consistent decision criteria focusing on whether immediate danger exists through normal contact/use (C1) or potential danger in fault conditions (C2). Systematic approach ensures reliable classification."
  },
  {
    id: 10,
    question: "What is the most important factor when documenting observation codes?",
    options: [
      "Using standard terminology and abbreviations",
      "Providing specific, actionable descriptions with supporting evidence",
      "Including photographs for all observations",
      "Referencing specific BS 7671 regulation numbers"
    ],
    correct: 1,
    explanation: "Clear, specific descriptions with supporting evidence enable proper understanding and appropriate remedial action. While other factors are helpful, actionable documentation is essential for effective safety management."
  }
];