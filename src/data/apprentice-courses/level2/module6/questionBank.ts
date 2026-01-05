// Level 2 Module 6: Inspection, Testing & Certification - Question Bank
// 250 questions covering all sections and subsections

export interface Question {
  id: string;
  question: string;
  options: [string, string, string, string];
  correctAnswer: number;
  explanation: string;
  section: string;
  difficulty: 'basic' | 'intermediate' | 'advanced';
  topic: string;
}

export const module6QuestionBank: Question[] = [
  // Section 6.1: Purpose of Inspection and Testing (35 questions)
  {
    id: "M6_1_1_01",
    question: "What is the primary purpose of electrical inspection and testing?",
    options: ["To reduce installation costs", "To ensure electrical safety", "To speed up installation", "To comply with insurance requirements"],
    correctAnswer: 1,
    explanation: "The primary purpose is to ensure electrical safety by verifying installations meet required standards and operate safely.",
    section: "6.1.1",
    difficulty: "basic",
    topic: "Purpose of inspection and testing"
  },
  {
    id: "M6_1_1_02",
    question: "Which regulation requires electrical installations to be inspected and tested?",
    options: ["Building Regulations", "EAWR (Electricity at Work Regulations)", "CDM Regulations", "COSHH Regulations"],
    correctAnswer: 1,
    explanation: "The Electricity at Work Regulations 1989 require that electrical systems are maintained in a safe condition.",
    section: "6.1.2",
    difficulty: "basic",
    topic: "Legal requirements"
  },
  {
    id: "M6_1_1_03",
    question: "What does EAWR stand for?",
    options: ["Electrical Application Work Regulations", "Electricity at Work Regulations", "Electrical Assessment Work Requirements", "Electrical Authority Work Rules"],
    correctAnswer: 1,
    explanation: "EAWR stands for Electricity at Work Regulations 1989, which govern electrical safety in workplaces.",
    section: "6.1.2",
    difficulty: "basic",
    topic: "Legal requirements"
  },
  {
    id: "M6_1_1_04",
    question: "Which standard provides the requirements for electrical installations in the UK?",
    options: ["BS 7671", "BS 5499", "BS 6231", "BS 3871"],
    correctAnswer: 0,
    explanation: "BS 7671 (IET Wiring Regulations) provides the UK standard for electrical installations.",
    section: "6.1.2",
    difficulty: "basic",
    topic: "Standards and regulations"
  },
  {
    id: "M6_1_1_05",
    question: "When must an electrical installation be tested?",
    options: ["Only when faults are reported", "Only during new installations", "After any alterations or additions", "Only every 5 years"],
    correctAnswer: 2,
    explanation: "Testing is required after new work, alterations, additions, and periodically to ensure continued safety.",
    section: "6.1.3",
    difficulty: "intermediate",
    topic: "When testing is required"
  },
  {
    id: "M6_1_1_06",
    question: "What is the main difference between inspection and testing?",
    options: ["Testing requires instruments, inspection doesn't", "Inspection is visual, testing uses instruments", "There is no difference", "Testing is done first"],
    correctAnswer: 1,
    explanation: "Inspection is visual examination without instruments, while testing uses electrical instruments to measure parameters.",
    section: "6.1.4",
    difficulty: "intermediate",
    topic: "Inspection vs testing"
  },
  {
    id: "M6_1_1_07",
    question: "Can a Level 2 electrician sign off electrical installation certificates?",
    options: ["Yes, for all work", "Yes, but only for minor works", "No, they cannot sign certificates", "Only under supervision"],
    correctAnswer: 2,
    explanation: "Level 2 electricians cannot sign certificates - this requires appropriate qualifications and competence.",
    section: "6.1.5",
    difficulty: "basic",
    topic: "Level 2 scope and limitations"
  },
  {
    id: "M6_1_2_01",
    question: "Which document contains the detailed requirements for electrical installations?",
    options: ["EAWR", "BS 7671 IET Wiring Regulations", "Building Regulations", "Health and Safety at Work Act"],
    correctAnswer: 1,
    explanation: "BS 7671 (IET Wiring Regulations) contains the detailed technical requirements for electrical installations.",
    section: "6.1.2",
    difficulty: "basic",
    topic: "Standards and regulations"
  },
  {
    id: "M6_1_2_02",
    question: "What is the consequence of not complying with BS 7671?",
    options: ["Fine only", "Potential safety risks", "Nothing happens", "Work must be redone"],
    correctAnswer: 1,
    explanation: "Non-compliance with BS 7671 can result in unsafe installations posing risks to life and property.",
    section: "6.1.2",
    difficulty: "intermediate",
    topic: "Compliance consequences"
  },
  {
    id: "M6_1_3_01",
    question: "When should testing be carried out on a new installation?",
    options: ["After energisation", "Before energisation", "During installation", "After commissioning"],
    correctAnswer: 1,
    explanation: "Testing must be carried out before energisation to ensure the installation is safe to energise.",
    section: "6.1.3",
    difficulty: "basic",
    topic: "New installation testing"
  },
  {
    id: "M6_1_3_02",
    question: "What triggers the need for testing during alterations?",
    options: ["Any change to the installation", "Only major changes", "Only new circuits", "Only when requested"],
    correctAnswer: 0,
    explanation: "Any alteration to an electrical installation requires appropriate testing to ensure safety.",
    section: "6.1.3",
    difficulty: "intermediate",
    topic: "Alteration testing requirements"
  },
  {
    id: "M6_1_4_01",
    question: "What does visual inspection involve?",
    options: ["Using test instruments", "Looking for obvious defects", "Measuring voltages", "Testing circuits"],
    correctAnswer: 1,
    explanation: "Visual inspection involves examining the installation for obvious defects without using instruments.",
    section: "6.1.4",
    difficulty: "basic",
    topic: "Visual inspection definition"
  },
  {
    id: "M6_1_4_02",
    question: "Which comes first in the inspection and testing process?",
    options: ["Testing", "Inspection", "Both together", "Depends on the installation"],
    correctAnswer: 1,
    explanation: "Inspection (visual examination) always comes before testing in the formal process.",
    section: "6.1.4",
    difficulty: "basic",
    topic: "Inspection and testing sequence"
  },
  {
    id: "M6_1_5_01",
    question: "What level of supervision is required for Level 2 electricians conducting tests?",
    options: ["No supervision needed", "Competent person supervision", "Any qualified person", "Self-supervision"],
    correctAnswer: 1,
    explanation: "Level 2 electricians must work under the supervision of a competent person when conducting tests.",
    section: "6.1.5",
    difficulty: "basic",
    topic: "Supervision requirements"
  },
  {
    id: "M6_1_5_02",
    question: "Can Level 2 electricians interpret test results independently?",
    options: ["Yes, for all tests", "Yes, for basic tests only", "No, requires supervision", "Only for continuity tests"],
    correctAnswer: 2,
    explanation: "Level 2 electricians should have supervision when interpreting test results to ensure accuracy.",
    section: "6.1.5",
    difficulty: "intermediate",
    topic: "Result interpretation limitations"
  },
  {
    id: "M6_1_6_01",
    question: "What documentation must be available during inspection and testing?",
    options: ["Installation drawings only", "Test certificates only", "Previous certificates and drawings", "None required"],
    correctAnswer: 2,
    explanation: "Previous certificates, drawings, and relevant documentation provide essential reference information.",
    section: "6.1.6",
    difficulty: "intermediate",
    topic: "Required documentation"
  },
  {
    id: "M6_1_6_02",
    question: "Why are schematic diagrams important for testing?",
    options: ["Not important", "Show circuit layouts and connections", "Only for cost estimation", "Legal requirement only"],
    correctAnswer: 1,
    explanation: "Schematic diagrams help understand circuit configurations and testing requirements.",
    section: "6.1.6",
    difficulty: "basic",
    topic: "Schematic importance"
  },
  {
    id: "M6_1_ADV_01",
    question: "How does BS 7671 relate to the EAWR in terms of legal compliance?",
    options: ["BS 7671 supersedes EAWR", "EAWR references BS 7671 as good practice", "They are completely separate", "BS 7671 is mandatory law"],
    correctAnswer: 1,
    explanation: "EAWR sets the legal requirement, while BS 7671 provides the recognised standard for compliance.",
    section: "6.1.2",
    difficulty: "advanced",
    topic: "Legal framework relationship"
  },
  {
    id: "M6_1_ADV_02",
    question: "What are the legal implications if an electrical installation causes injury due to inadequate testing?",
    options: ["No legal implications", "Civil liability only", "Criminal liability under EAWR", "Insurance claim only"],
    correctAnswer: 2,
    explanation: "Under EAWR, inadequate electrical work can result in criminal prosecution for breaches of duty.",
    section: "6.1.2",
    difficulty: "advanced",
    topic: "Legal consequences"
  },
  {
    id: "M6_1_INT_01",
    question: "What can a Level 2 electrician do regarding testing?",
    options: ["Design test procedures", "Conduct basic tests under supervision", "Sign test certificates", "Approve test results"],
    correctAnswer: 1,
    explanation: "Level 2 electricians can conduct basic tests but must work under appropriate supervision.",
    section: "6.1.5",
    difficulty: "intermediate",
    topic: "Level 2 scope and limitations"
  },
  {
    id: "M6_1_INT_02",
    question: "Why is periodic inspection and testing important?",
    options: ["To find new faults", "To ensure continued safety over time", "To meet insurance requirements", "To update certificates"],
    correctAnswer: 1,
    explanation: "Periodic testing ensures installations remain safe as they age and deteriorate over time.",
    section: "6.1.3",
    difficulty: "intermediate",
    topic: "Periodic testing importance"
  },
  {
    id: "M6_1_INT_03",
    question: "What happens if an installation fails a test?",
    options: ["It must be disconnected immediately", "Remedial work is required", "It can continue operating", "A new certificate is issued"],
    correctAnswer: 1,
    explanation: "Failed tests require remedial work to correct defects before the installation can be considered safe.",
    section: "6.1.3",
    difficulty: "intermediate",
    topic: "Test failure consequences"
  },
  {
    id: "M6_1_BAS_01",
    question: "What is meant by 'competent person' in electrical work?",
    options: ["Anyone with tools", "Person with knowledge and experience", "Licensed electrician only", "Company director"],
    correctAnswer: 1,
    explanation: "A competent person has the necessary knowledge, experience and training to prevent danger.",
    section: "6.1.5",
    difficulty: "basic",
    topic: "Competent person definition"
  },
  {
    id: "M6_1_BAS_02",
    question: "How often should domestic installations be inspected?",
    options: ["Every year", "Every 10 years typically", "Never", "Every month"],
    correctAnswer: 1,
    explanation: "Domestic installations typically require inspection every 10 years, though this can vary.",
    section: "6.1.3",
    difficulty: "basic",
    topic: "Inspection frequency"
  },
  {
    id: "M6_1_BAS_03",
    question: "What is the purpose of electrical regulations?",
    options: ["Increase costs", "Protect people and property", "Create work", "Generate paperwork"],
    correctAnswer: 1,
    explanation: "Electrical regulations exist to protect people and property from electrical hazards.",
    section: "6.1.2",
    difficulty: "basic",
    topic: "Regulation purpose"
  },
  {
    id: "M6_1_BAS_04",
    question: "Who can carry out electrical inspection and testing?",
    options: ["Anyone", "Competent qualified persons", "Building inspectors", "Property owners"],
    correctAnswer: 1,
    explanation: "Only competent qualified persons should carry out electrical inspection and testing.",
    section: "6.1.5",
    difficulty: "basic",
    topic: "Inspector qualifications"
  },
  {
    id: "M6_1_BAS_05",
    question: "What should be done before starting any electrical testing?",
    options: ["Start immediately", "Check documentation and plan tests", "Call supervisor", "Test equipment only"],
    correctAnswer: 1,
    explanation: "Always check available documentation and plan the testing sequence before starting.",
    section: "6.1.6",
    difficulty: "basic",
    topic: "Testing preparation"
  },
  {
    id: "M6_1_INT_04",
    question: "What factors affect the frequency of periodic inspection?",
    options: ["Cost only", "Environment and usage", "Convenience", "Weather"],
    correctAnswer: 1,
    explanation: "Environmental conditions and usage patterns affect deterioration rates and inspection frequency.",
    section: "6.1.3",
    difficulty: "intermediate",
    topic: "Inspection frequency factors"
  },
  {
    id: "M6_1_INT_05",
    question: "Why must testing be done before energising new installations?",
    options: ["Legal requirement only", "Ensure safety before live operation", "Cost saving", "Time management"],
    correctAnswer: 1,
    explanation: "Testing before energising ensures the installation is safe and won't cause harm when powered up.",
    section: "6.1.3",
    difficulty: "intermediate",
    topic: "Pre-energisation testing"
  },
  {
    id: "M6_1_INT_06",
    question: "What role does risk assessment play in inspection and testing?",
    options: ["No role", "Determines testing approach and safety measures", "Only for insurance", "Legal paperwork only"],
    correctAnswer: 1,
    explanation: "Risk assessment determines the appropriate testing approach and necessary safety measures.",
    section: "6.1.1",
    difficulty: "intermediate",
    topic: "Risk assessment role"
  },
  {
    id: "M6_1_BAS_06",
    question: "What is the relationship between inspection and testing?",
    options: ["They're the same thing", "Inspection comes first, then testing", "Testing comes first", "They're unrelated"],
    correctAnswer: 1,
    explanation: "Inspection (visual examination) is carried out first, followed by instrument testing.",
    section: "6.1.4",
    difficulty: "basic",
    topic: "Inspection testing relationship"
  },
  {
    id: "M6_1_BAS_07",
    question: "What equipment is needed for visual inspection?",
    options: ["Multimeter", "Test instruments", "Eyes and torch", "Computer"],
    correctAnswer: 2,
    explanation: "Visual inspection only requires eyes and adequate lighting (torch) to examine the installation.",
    section: "6.1.4",
    difficulty: "basic",
    topic: "Visual inspection equipment"
  },
  {
    id: "M6_1_BAS_08",
    question: "What information should be recorded during inspection?",
    options: ["Nothing", "Defects and observations", "Time only", "Weather conditions"],
    correctAnswer: 1,
    explanation: "All defects, observations, and relevant findings should be recorded during inspection.",
    section: "6.1.6",
    difficulty: "basic",
    topic: "Inspection recording"
  },
  {
    id: "M6_1_ADV_03",
    question: "How do environmental conditions affect inspection and testing requirements?",
    options: ["No effect", "May require modified procedures", "Only affects equipment", "Only affects timing"],
    correctAnswer: 1,
    explanation: "Harsh environments may require modified inspection procedures and more frequent testing.",
    section: "6.1.3",
    difficulty: "advanced",
    topic: "Environmental considerations"
  },
  {
    id: "M6_1_INT_07",
    question: "What is the significance of 'duty holder' in electrical safety?",
    options: ["No significance", "Person responsible for electrical safety", "Insurance term", "Legal job title"],
    correctAnswer: 1,
    explanation: "The duty holder is responsible for ensuring electrical systems are maintained safely.",
    section: "6.1.2",
    difficulty: "intermediate",
    topic: "Duty holder responsibility"
  },

  // Section 6.2: Visual Inspection (45 questions)
  {
    id: "M6_2_1_01",
    question: "What should be checked during visual inspection of cables?",
    options: ["Voltage rating only", "Physical damage and correct routing", "Current capacity only", "Installation date"],
    correctAnswer: 1,
    explanation: "Visual inspection should check for physical damage, correct routing, and proper installation methods.",
    section: "6.2.1",
    difficulty: "basic",
    topic: "Cable inspection"
  },
  {
    id: "M6_2_1_02",
    question: "What type of damage should be looked for on cable insulation?",
    options: ["Age only", "Cuts, nicks, or burns", "Colour fading", "Dust accumulation"],
    correctAnswer: 1,
    explanation: "Physical damage like cuts, nicks, or burns can compromise insulation and create safety hazards.",
    section: "6.2.1",
    difficulty: "basic",
    topic: "Insulation damage"
  },
  {
    id: "M6_2_1_03",
    question: "During visual inspection, what should be checked at accessories?",
    options: ["Correct mounting and secure connections", "Operating temperature", "Electrical measurements", "Internal components"],
    correctAnswer: 0,
    explanation: "Visual inspection checks mounting security, visible connections, and signs of overheating or damage.",
    section: "6.2.1",
    difficulty: "basic",
    topic: "Accessory inspection"
  },
  {
    id: "M6_2_1_04",
    question: "What should be checked on cable supports and fixings?",
    options: ["Only spacing", "Security and suitability", "Colour only", "Nothing specific"],
    correctAnswer: 1,
    explanation: "Cable supports must be secure and suitable for the cable type and installation method.",
    section: "6.2.1",
    difficulty: "basic",
    topic: "Cable support inspection"
  },
  {
    id: "M6_2_1_05",
    question: "When inspecting cable routing, what should be avoided?",
    options: ["Sharp bends and damage risks", "Straight runs", "Proper supports", "Adequate clearances"],
    correctAnswer: 0,
    explanation: "Sharp bends can damage cables and routing should avoid potential damage risks.",
    section: "6.2.1",
    difficulty: "basic",
    topic: "Cable routing inspection"
  },
  {
    id: "M6_2_1_06",
    question: "What indicates overheating in electrical equipment?",
    options: ["Clean surfaces", "Burn marks or discolouration", "Normal operation", "Good connections"],
    correctAnswer: 1,
    explanation: "Burn marks, discolouration, or melting indicate dangerous overheating conditions.",
    section: "6.2.1",
    difficulty: "intermediate",
    topic: "Overheating signs"
  },
  {
    id: "M6_2_1_07",
    question: "What cable installation methods require specific inspection points?",
    options: ["Surface only", "All methods have specific requirements", "Concealed only", "Underground only"],
    correctAnswer: 1,
    explanation: "Different installation methods (surface, concealed, underground) have specific inspection requirements.",
    section: "6.2.1",
    difficulty: "intermediate",
    topic: "Installation method inspection"
  },
  {
    id: "M6_2_1_08",
    question: "How should cable entry points be inspected?",
    options: ["Ignored", "Check for proper sealing and protection", "Visual only", "Measure dimensions"],
    correctAnswer: 1,
    explanation: "Cable entry points must have proper sealing, protection, and strain relief.",
    section: "6.2.1",
    difficulty: "basic",
    topic: "Cable entry inspection"
  },
  {
    id: "M6_2_1_09",
    question: "What signs indicate rodent damage to cables?",
    options: ["Clean cuts", "Gnaw marks and stripped insulation", "Colour change", "Normal appearance"],
    correctAnswer: 1,
    explanation: "Rodent damage shows as gnaw marks and stripped insulation, creating safety hazards.",
    section: "6.2.1",
    difficulty: "intermediate",
    topic: "Rodent damage identification"
  },
  {
    id: "M6_2_2_01",
    question: "What should be checked at consumer units during visual inspection?",
    options: ["Secure mounting and labelling", "Internal wiring only", "External appearance only", "Nothing specific"],
    correctAnswer: 0,
    explanation: "Consumer units must be securely mounted with proper labelling and identification.",
    section: "6.2.2",
    difficulty: "basic",
    topic: "Consumer unit inspection"
  },
  {
    id: "M6_2_2_02",
    question: "Why is circuit labelling important?",
    options: ["Legal requirement only", "Safe identification and isolation", "Aesthetics", "Cost reduction"],
    correctAnswer: 1,
    explanation: "Proper labelling enables safe identification and isolation of circuits for maintenance.",
    section: "6.2.2",
    difficulty: "basic",
    topic: "Circuit labelling importance"
  },
  {
    id: "M6_2_2_03",
    question: "What protection should be provided at consumer units?",
    options: ["None required", "Appropriate covers and barriers", "Paint only", "Signage only"],
    correctAnswer: 1,
    explanation: "Consumer units need appropriate covers and barriers to prevent accidental contact.",
    section: "6.2.2",
    difficulty: "basic",
    topic: "Consumer unit protection"
  },
  {
    id: "M6_2_2_04",
    question: "What should be checked on the main earthing terminal?",
    options: ["Colour only", "Secure connections and accessibility", "Size only", "Nothing specific"],
    correctAnswer: 1,
    explanation: "The main earthing terminal must have secure connections and be properly accessible.",
    section: "6.2.2",
    difficulty: "basic",
    topic: "Main earthing terminal inspection"
  },
  {
    id: "M6_2_2_05",
    question: "How should RCD operation indicators be checked?",
    options: ["Test button operation", "Visual indicators", "Electrical testing only", "Not checked"],
    correctAnswer: 1,
    explanation: "During visual inspection, check RCD indicators and labels; functional testing comes later.",
    section: "6.2.2",
    difficulty: "basic",
    topic: "RCD indicator inspection"
  },
  {
    id: "M6_2_3_01",
    question: "What should be checked on socket outlets during inspection?",
    options: ["Secure mounting and condition", "Colour only", "Age only", "Brand only"],
    correctAnswer: 0,
    explanation: "Socket outlets must be securely mounted and in good condition without damage.",
    section: "6.2.3",
    difficulty: "basic",
    topic: "Socket outlet inspection"
  },
  {
    id: "M6_2_3_02",
    question: "What indicates a faulty connection at an accessory?",
    options: ["Normal operation", "Burn marks or loose terminals", "Clean appearance", "Proper mounting"],
    correctAnswer: 1,
    explanation: "Burn marks or loose terminals indicate faulty connections that pose fire risks.",
    section: "6.2.3",
    difficulty: "intermediate",
    topic: "Faulty connection signs"
  },
  {
    id: "M6_2_3_03",
    question: "What should be checked on socket outlet earth terminals?",
    options: ["Nothing", "Secure connection and cleanliness", "Colour only", "Brand marking"],
    correctAnswer: 1,
    explanation: "Earth terminals must be securely connected and free from corrosion or damage.",
    section: "6.2.3",
    difficulty: "basic",
    topic: "Socket earth terminal inspection"
  },
  {
    id: "M6_2_3_04",
    question: "How should socket outlet mounting be assessed?",
    options: ["Visual only", "Check security and box condition", "Measure heights", "Count sockets"],
    correctAnswer: 1,
    explanation: "Check that sockets are securely mounted and mounting boxes are in good condition.",
    section: "6.2.3",
    difficulty: "basic",
    topic: "Socket mounting assessment"
  },
  {
    id: "M6_2_4_01",
    question: "What should be checked on lighting switches?",
    options: ["Operation and mounting", "Brightness only", "Colour only", "Age only"],
    correctAnswer: 0,
    explanation: "Switches must operate correctly and be securely mounted without damage.",
    section: "6.2.4",
    difficulty: "basic",
    topic: "Switch inspection"
  },
  {
    id: "M6_2_4_02",
    question: "What is a common fault found in ceiling roses?",
    options: ["Correct connections", "Overloading with heavy fittings", "Proper support", "Good condition"],
    correctAnswer: 1,
    explanation: "Ceiling roses can be overloaded with heavy light fittings beyond their design capacity.",
    section: "6.2.4",
    difficulty: "intermediate",
    topic: "Ceiling rose faults"
  },
  {
    id: "M6_2_4_03",
    question: "What should be inspected at light fittings?",
    options: ["Lamp type only", "Secure mounting and condition", "Brightness", "Brand"],
    correctAnswer: 1,
    explanation: "Light fittings must be securely mounted and in good condition with proper connections.",
    section: "6.2.4",
    difficulty: "basic",
    topic: "Light fitting inspection"
  },
  {
    id: "M6_2_4_04",
    question: "How should flexible cords to portable equipment be inspected?",
    options: ["Not inspected", "Check for damage and strain relief", "Length only", "Colour only"],
    correctAnswer: 1,
    explanation: "Flexible cords must be inspected for damage and proper strain relief arrangements.",
    section: "6.2.4",
    difficulty: "basic",
    topic: "Flexible cord inspection"
  },
  {
    id: "M6_2_5_01",
    question: "What earth arrangements should be checked?",
    options: ["Earth electrode connections", "Nothing specific", "Colour only", "Size only"],
    correctAnswer: 0,
    explanation: "Earth arrangements including electrode connections must be secure and properly maintained.",
    section: "6.2.5",
    difficulty: "basic",
    topic: "Earth arrangement inspection"
  },
  {
    id: "M6_2_5_02",
    question: "Why are earth connections critical for safety?",
    options: ["Cost reduction", "Provide fault current path", "Appearance", "Legal requirement only"],
    correctAnswer: 1,
    explanation: "Earth connections provide a safe path for fault currents to operate protective devices.",
    section: "6.2.5",
    difficulty: "intermediate",
    topic: "Earth connection safety"
  },
  {
    id: "M6_2_5_03",
    question: "What should be checked on equipotential bonding?",
    options: ["Colour only", "Secure connections and conductor size", "Length only", "Nothing"],
    correctAnswer: 1,
    explanation: "Bonding connections must be secure and conductors must be adequate size for the installation.",
    section: "6.2.5",
    difficulty: "intermediate",
    topic: "Bonding inspection"
  },
  {
    id: "M6_2_5_04",
    question: "How should earth electrode connections be inspected?",
    options: ["Not accessible", "Check accessibility and condition", "Visual from distance", "Not important"],
    correctAnswer: 1,
    explanation: "Earth electrode connections should be accessible and in good condition for inspection.",
    section: "6.2.5",
    difficulty: "basic",
    topic: "Earth electrode inspection"
  },
  {
    id: "M6_2_6_01",
    question: "What should be checked on protective devices?",
    options: ["Correct type and rating", "Colour only", "Age only", "Brand only"],
    correctAnswer: 0,
    explanation: "Protective devices must be the correct type and rating for the circuits they protect.",
    section: "6.2.6",
    difficulty: "basic",
    topic: "Protective device inspection"
  },
  {
    id: "M6_2_6_02",
    question: "What indicates a problem with an MCB?",
    options: ["Normal operation", "Frequent tripping or damage", "Correct rating", "Proper mounting"],
    correctAnswer: 1,
    explanation: "Frequent tripping or physical damage indicates MCB problems requiring investigation.",
    section: "6.2.6",
    difficulty: "intermediate",
    topic: "MCB fault indicators"
  },
  {
    id: "M6_2_6_03",
    question: "How should fuse carriers be inspected?",
    options: ["Not inspected", "Check condition and correct fuse wire", "Visual only", "Electrical test only"],
    correctAnswer: 1,
    explanation: "Fuse carriers must be in good condition with correct fuse wire or cartridge fuses.",
    section: "6.2.6",
    difficulty: "basic",
    topic: "Fuse carrier inspection"
  },
  {
    id: "M6_2_6_04",
    question: "What should be checked on isolation switches?",
    options: ["Operation and security", "Colour only", "Brand only", "Age only"],
    correctAnswer: 0,
    explanation: "Isolation switches must operate correctly and be securely mounted with clear labelling.",
    section: "6.2.6",
    difficulty: "basic",
    topic: "Isolation switch inspection"
  },
  {
    id: "M6_2_ADV_01",
    question: "How should fire barriers and sealing be assessed during inspection?",
    options: ["Not relevant", "Check integrity and compliance", "Visual only", "Not inspected"],
    correctAnswer: 1,
    explanation: "Fire barriers and sealing must maintain their integrity to prevent fire spread.",
    section: "6.2.1",
    difficulty: "advanced",
    topic: "Fire barrier inspection"
  },
  {
    id: "M6_2_ADV_02",
    question: "What considerations apply to inspection in hazardous areas?",
    options: ["Same as normal areas", "Special procedures and equipment certification", "Not possible", "Visual only"],
    correctAnswer: 1,
    explanation: "Hazardous areas require special inspection procedures and certified equipment.",
    section: "6.2.6",
    difficulty: "advanced",
    topic: "Hazardous area inspection"
  },
  {
    id: "M6_2_INT_01",
    question: "What documentation should accompany visual inspection findings?",
    options: ["None required", "Detailed records with locations", "Brief notes only", "Photographs only"],
    correctAnswer: 1,
    explanation: "Visual inspection findings should be documented with detailed records and specific locations.",
    section: "6.2.1",
    difficulty: "intermediate",
    topic: "Inspection documentation"
  },
  {
    id: "M6_2_INT_02",
    question: "How should deterioration due to environmental conditions be assessed?",
    options: ["Not considered", "Evaluate against expected service life", "Visual only", "Not important"],
    correctAnswer: 1,
    explanation: "Deterioration should be assessed against expected service life in the specific environment.",
    section: "6.2.1",
    difficulty: "intermediate",
    topic: "Environmental deterioration assessment"
  },
  {
    id: "M6_2_INT_03",
    question: "What accessibility issues should be considered during inspection?",
    options: ["Not relevant", "Safe access for maintenance", "Cost only", "Time only"],
    correctAnswer: 1,
    explanation: "Installations should be accessible for safe maintenance and future inspection.",
    section: "6.2.2",
    difficulty: "intermediate",
    topic: "Accessibility assessment"
  },
  {
    id: "M6_2_BAS_01",
    question: "What tools are typically needed for visual inspection?",
    options: ["Multimeter", "Torch and basic tools", "Computer", "Test instruments"],
    correctAnswer: 1,
    explanation: "Visual inspection typically requires good lighting (torch) and basic tools for access.",
    section: "6.2.1",
    difficulty: "basic",
    topic: "Visual inspection tools"
  },
  {
    id: "M6_2_BAS_02",
    question: "When should visual inspection be carried out?",
    options: ["After testing", "Before any electrical testing", "During installation", "Never"],
    correctAnswer: 1,
    explanation: "Visual inspection should always be carried out before any electrical testing begins.",
    section: "6.2.1",
    difficulty: "basic",
    topic: "Visual inspection timing"
  },
  {
    id: "M6_2_BAS_03",
    question: "What is the purpose of checking cable identification?",
    options: ["Aesthetics", "Safe working and circuit identification", "Legal requirement", "Cost control"],
    correctAnswer: 1,
    explanation: "Proper cable identification ensures safe working and correct circuit identification.",
    section: "6.2.1",
    difficulty: "basic",
    topic: "Cable identification importance"
  },
  {
    id: "M6_2_BAS_04",
    question: "What should be done if dangerous conditions are found during inspection?",
    options: ["Continue inspection", "Make safe immediately", "Note for later", "Ignore"],
    correctAnswer: 1,
    explanation: "Dangerous conditions must be made safe immediately to prevent harm.",
    section: "6.2.1",
    difficulty: "basic",
    topic: "Dangerous condition response"
  },
  {
    id: "M6_2_BAS_05",
    question: "How should inspection findings be prioritised?",
    options: ["By cost", "By safety risk level", "By convenience", "By age"],
    correctAnswer: 1,
    explanation: "Inspection findings should be prioritised by their safety risk level and urgency.",
    section: "6.2.6",
    difficulty: "basic",
    topic: "Finding prioritisation"
  },
  {
    id: "M6_2_INT_04",
    question: "What special considerations apply to outdoor installations?",
    options: ["None", "Weather protection and UV resistance", "Cost only", "Appearance only"],
    correctAnswer: 1,
    explanation: "Outdoor installations require proper weather protection and UV-resistant materials.",
    section: "6.2.1",
    difficulty: "intermediate",
    topic: "Outdoor installation inspection"
  },
  {
    id: "M6_2_INT_05",
    question: "How should modifications to original installations be assessed?",
    options: ["Not relevant", "Check compliance and integration", "Visual only", "Ignore"],
    correctAnswer: 1,
    explanation: "Modifications should be assessed for compliance and proper integration with original installation.",
    section: "6.2.2",
    difficulty: "intermediate",
    topic: "Modification assessment"
  },
  {
    id: "M6_2_INT_06",
    question: "What impact does building use change have on electrical inspection?",
    options: ["None", "May require different standards", "Cost increase only", "Time increase only"],
    correctAnswer: 1,
    explanation: "Change in building use may require the installation to meet different standards or requirements.",
    section: "6.2.2",
    difficulty: "intermediate",
    topic: "Building use change impact"
  },

  // Section 6.3: Basic Testing Procedures and Instruments (50 questions)
  {
    id: "M6_3_1_01",
    question: "What is a multimeter used for?",
    options: ["Voltage measurements only", "Multiple electrical measurements", "Insulation testing only", "Continuity testing only"],
    correctAnswer: 1,
    explanation: "A multimeter can measure voltage, current, resistance, and other electrical parameters.",
    section: "6.3.1",
    difficulty: "basic",
    topic: "Multimeter purpose"
  },
  {
    id: "M6_3_1_02",
    question: "What safety check must be performed before using test equipment?",
    options: ["Check for calibration date", "Visual inspection of leads and probes", "Check battery level", "Test on known live source"],
    correctAnswer: 1,
    explanation: "Visual inspection of test leads and probes is essential to ensure they are safe to use.",
    section: "6.3.1",
    difficulty: "basic",
    topic: "Test equipment safety"
  },
  {
    id: "M6_3_1_03",
    question: "What type of multimeter is most suitable for electrical testing?",
    options: ["Analogue only", "Digital with appropriate safety rating", "Any multimeter", "Pocket multimeter"],
    correctAnswer: 1,
    explanation: "Digital multimeters with appropriate safety ratings (CAT III/IV) are preferred for electrical testing.",
    section: "6.3.1",
    difficulty: "intermediate",
    topic: "Multimeter selection"
  },
  {
    id: "M6_3_1_04",
    question: "What measurements can a basic multimeter perform?",
    options: ["Voltage only", "Voltage, current, resistance", "Insulation resistance", "Earth loop impedance"],
    correctAnswer: 1,
    explanation: "Basic multimeters measure voltage, current, and resistance but not specialised parameters.",
    section: "6.3.1",
    difficulty: "basic",
    topic: "Multimeter capabilities"
  },
  {
    id: "M6_3_2_01",
    question: "What does GS38 cover?",
    options: ["Electrical installation standards", "Test instrument safety requirements", "Cable specifications", "Circuit protection"],
    correctAnswer: 1,
    explanation: "GS38 covers the safety requirements for electrical test equipment and leads.",
    section: "6.3.2",
    difficulty: "basic",
    topic: "GS38 requirements"
  },
  {
    id: "M6_3_2_02",
    question: "What does GS38 require for test probe design?",
    options: ["Any design acceptable", "Finger guards and fused leads", "Colour coding only", "Long probes"],
    correctAnswer: 1,
    explanation: "GS38 requires finger guards and fused test leads to prevent accidental contact and limit fault current.",
    section: "6.3.2",
    difficulty: "intermediate",
    topic: "GS38 probe requirements"
  },
  {
    id: "M6_3_2_03",
    question: "Why are fused test leads important?",
    options: ["Legal requirement only", "Limit fault current in case of errors", "Cost reduction", "Easier handling"],
    correctAnswer: 1,
    explanation: "Fused test leads limit fault current if probes are accidentally connected across supply.",
    section: "6.3.2",
    difficulty: "intermediate",
    topic: "Fused lead importance"
  },
  {
    id: "M6_3_3_01",
    question: "What is the maximum exposed tip length allowed on test probes under GS38?",
    options: ["2mm", "4mm", "6mm", "8mm"],
    correctAnswer: 1,
    explanation: "GS38 limits exposed probe tips to 4mm maximum to reduce the risk of accidental contact.",
    section: "6.3.3",
    difficulty: "intermediate",
    topic: "GS38 probe requirements"
  },
  {
    id: "M6_3_3_02",
    question: "What CAT rating should test equipment have for domestic installations?",
    options: ["CAT I", "CAT II", "CAT III", "CAT IV"],
    correctAnswer: 2,
    explanation: "CAT III rating is appropriate for domestic electrical installations and distribution boards.",
    section: "6.3.3",
    difficulty: "intermediate",
    topic: "Safety category ratings"
  },
  {
    id: "M6_3_3_03",
    question: "What does CAT rating indicate?",
    options: ["Accuracy only", "Safety level for electrical environments", "Price category", "Manufacturer category"],
    correctAnswer: 1,
    explanation: "CAT ratings indicate the safety level and transient withstand capability for different electrical environments.",
    section: "6.3.3",
    difficulty: "intermediate",
    topic: "CAT rating meaning"
  },
  {
    id: "M6_3_4_01",
    question: "What must be done before any electrical testing?",
    options: ["Check test equipment", "Prove the circuit is dead", "Notify the client", "Complete paperwork"],
    correctAnswer: 1,
    explanation: "The circuit must be proven dead using appropriate testing procedures before any work begins.",
    section: "6.3.4",
    difficulty: "basic",
    topic: "Proving dead procedure"
  },
  {
    id: "M6_3_4_02",
    question: "What sequence should be followed when proving dead?",
    options: ["Test only", "Prove-test-prove", "Test-prove-test", "Prove only"],
    correctAnswer: 1,
    explanation: "The safe sequence is prove tester working, test circuit dead, prove tester still working.",
    section: "6.3.4",
    difficulty: "basic",
    topic: "Proving dead sequence"
  },
  {
    id: "M6_3_4_03",
    question: "Why must test equipment be proved before and after use?",
    options: ["Legal requirement only", "Ensure equipment is functioning correctly", "Cost control", "Time management"],
    correctAnswer: 1,
    explanation: "Proving ensures the test equipment is functioning correctly and giving reliable results.",
    section: "6.3.4",
    difficulty: "basic",
    topic: "Equipment proving importance"
  },
  {
    id: "M6_3_5_01",
    question: "What safety precautions apply when testing live circuits?",
    options: ["No precautions needed", "Use appropriate PPE and procedures", "Work alone", "Rush the work"],
    correctAnswer: 1,
    explanation: "Live circuit testing requires appropriate PPE, procedures, and safety precautions.",
    section: "6.3.5",
    difficulty: "basic",
    topic: "Live testing safety"
  },
  {
    id: "M6_3_5_02",
    question: "When should live testing be avoided?",
    options: ["Never", "Whenever possible", "On low voltage only", "On high voltage only"],
    correctAnswer: 1,
    explanation: "Live testing should be avoided whenever possible and only done when absolutely necessary.",
    section: "6.3.5",
    difficulty: "intermediate",
    topic: "Live testing avoidance"
  },
  {
    id: "M6_3_6_01",
    question: "What is an insulation resistance tester used for?",
    options: ["Voltage measurement", "Testing insulation effectiveness", "Current measurement", "Continuity testing"],
    correctAnswer: 1,
    explanation: "Insulation resistance testers check the effectiveness of electrical insulation.",
    section: "6.3.6",
    difficulty: "basic",
    topic: "IR tester purpose"
  },
  {
    id: "M6_3_6_02",
    question: "What voltage does an insulation resistance tester typically use?",
    options: ["12V", "230V", "500V or 1000V", "24V"],
    correctAnswer: 2,
    explanation: "IR testers typically use 500V or 1000V DC to stress test the insulation.",
    section: "6.3.6",
    difficulty: "intermediate",
    topic: "IR tester voltage"
  },
  {
    id: "M6_3_7_01",
    question: "What is a low resistance ohmmeter used for?",
    options: ["High resistance measurement", "Continuity testing of protective conductors", "Voltage measurement", "Current measurement"],
    correctAnswer: 1,
    explanation: "Low resistance ohmmeters accurately measure very low resistances in protective conductors.",
    section: "6.3.7",
    difficulty: "basic",
    topic: "Low resistance ohmmeter use"
  },
  {
    id: "M6_3_7_02",
    question: "Why is high test current important in low resistance testing?",
    options: ["Legal requirement", "Overcomes contact resistance", "Faster testing", "Cost reduction"],
    correctAnswer: 1,
    explanation: "High test current (typically 100mA+) overcomes contact resistance for accurate measurements.",
    section: "6.3.7",
    difficulty: "intermediate",
    topic: "Test current importance"
  },
  {
    id: "M6_3_8_01",
    question: "What safety equipment should be used during electrical testing?",
    options: ["Hard hat only", "Appropriate PPE including gloves and eye protection", "No special equipment", "Normal clothing"],
    correctAnswer: 1,
    explanation: "Appropriate PPE including insulated gloves and eye protection should be used during testing.",
    section: "6.3.8",
    difficulty: "basic",
    topic: "Testing PPE requirements"
  },
  {
    id: "M6_3_8_02",
    question: "What should be done if test equipment fails during use?",
    options: ["Continue with different equipment", "Stop testing and investigate", "Ignore the failure", "Use backup equipment"],
    correctAnswer: 1,
    explanation: "Testing should stop if equipment fails, and the failure should be investigated before continuing.",
    section: "6.3.8",
    difficulty: "basic",
    topic: "Equipment failure response"
  },
  {
    id: "M6_3_BAS_01",
    question: "What information should be recorded during testing?",
    options: ["Results only", "Results, conditions, and equipment used", "Time only", "Nothing"],
    correctAnswer: 1,
    explanation: "Complete records should include test results, test conditions, and equipment used.",
    section: "6.3.1",
    difficulty: "basic",
    topic: "Testing records"
  },
  {
    id: "M6_3_BAS_02",
    question: "How often should test equipment be calibrated?",
    options: ["Never", "According to manufacturer recommendations", "Monthly", "Weekly"],
    correctAnswer: 1,
    explanation: "Test equipment should be calibrated according to manufacturer recommendations to ensure accuracy.",
    section: "6.3.1",
    difficulty: "basic",
    topic: "Equipment calibration"
  },
  {
    id: "M6_3_BAS_03",
    question: "What should be checked on test leads before use?",
    options: ["Colour only", "Condition, insulation, and connections", "Length only", "Brand"],
    correctAnswer: 1,
    explanation: "Test leads should be checked for damage, insulation integrity, and secure connections.",
    section: "6.3.2",
    difficulty: "basic",
    topic: "Test lead inspection"
  },
  {
    id: "M6_3_BAS_04",
    question: "Why is it important to use the correct test instrument?",
    options: ["Cost control", "Accurate and safe measurements", "Speed", "Convenience"],
    correctAnswer: 1,
    explanation: "Using the correct instrument ensures accurate measurements and safe testing procedures.",
    section: "6.3.1",
    difficulty: "basic",
    topic: "Instrument selection importance"
  },
  {
    id: "M6_3_INT_01",
    question: "How do environmental conditions affect test equipment?",
    options: ["No effect", "Can affect accuracy and safety", "Only affects appearance", "Only affects cost"],
    correctAnswer: 1,
    explanation: "Temperature, humidity, and other conditions can affect instrument accuracy and safety.",
    section: "6.3.8",
    difficulty: "intermediate",
    topic: "Environmental effects on testing"
  },
  {
    id: "M6_3_INT_02",
    question: "What precautions are needed when testing in damp conditions?",
    options: ["No special precautions", "Enhanced safety measures and suitable equipment", "Cannot test", "Rush the work"],
    correctAnswer: 1,
    explanation: "Damp conditions require enhanced safety measures and equipment suitable for the environment.",
    section: "6.3.8",
    difficulty: "intermediate",
    topic: "Testing in damp conditions"
  },
  {
    id: "M6_3_INT_03",
    question: "How should test results be verified?",
    options: ["Not necessary", "Cross-check with different methods where possible", "Single test sufficient", "Estimate"],
    correctAnswer: 1,
    explanation: "Test results should be verified by cross-checking with different methods where possible.",
    section: "6.3.1",
    difficulty: "intermediate",
    topic: "Result verification"
  },
  {
    id: "M6_3_INT_04",
    question: "What factors can cause measurement errors?",
    options: ["None", "Equipment condition, environment, technique", "Only equipment", "Only environment"],
    correctAnswer: 1,
    explanation: "Measurement errors can result from equipment condition, environmental factors, and testing technique.",
    section: "6.3.1",
    difficulty: "intermediate",
    topic: "Measurement error sources"
  },
  {
    id: "M6_3_ADV_01",
    question: "How should measurement uncertainty be considered in test results?",
    options: ["Ignore it", "Apply appropriate safety margins", "Estimate roughly", "Not relevant"],
    correctAnswer: 1,
    explanation: "Measurement uncertainty should be considered by applying appropriate safety margins to critical results.",
    section: "6.3.1",
    difficulty: "advanced",
    topic: "Measurement uncertainty"
  },
  {
    id: "M6_3_ADV_02",
    question: "What considerations apply to testing equipment with electronic components?",
    options: ["Same as normal testing", "Special precautions to prevent damage", "Cannot be tested", "No precautions needed"],
    correctAnswer: 1,
    explanation: "Electronic components require special precautions during testing to prevent damage from test voltages.",
    section: "6.3.6",
    difficulty: "advanced",
    topic: "Electronic equipment testing"
  },
  {
    id: "M6_3_BAS_05",
    question: "What should be done if a test result seems incorrect?",
    options: ["Accept it", "Investigate and retest if necessary", "Ignore it", "Estimate correct value"],
    correctAnswer: 1,
    explanation: "Unexpected results should be investigated and retesting carried out if necessary.",
    section: "6.3.1",
    difficulty: "basic",
    topic: "Unexpected result handling"
  },
  {
    id: "M6_3_BAS_06",
    question: "What documentation should accompany test equipment?",
    options: ["None needed", "Calibration certificates and user manuals", "Purchase receipt only", "Warranty card only"],
    correctAnswer: 1,
    explanation: "Test equipment should have current calibration certificates and user manuals available.",
    section: "6.3.1",
    difficulty: "basic",
    topic: "Equipment documentation"
  },
  {
    id: "M6_3_BAS_07",
    question: "How should test equipment be stored?",
    options: ["Anywhere convenient", "In appropriate conditions to prevent damage", "Outside", "In damp areas"],
    correctAnswer: 1,
    explanation: "Test equipment should be stored in appropriate conditions to prevent damage and maintain accuracy.",
    section: "6.3.1",
    difficulty: "basic",
    topic: "Equipment storage"
  },
  {
    id: "M6_3_BAS_08",
    question: "What should be done before starting any testing sequence?",
    options: ["Start immediately", "Plan the testing sequence and safety measures", "Call supervisor", "Complete paperwork"],
    correctAnswer: 1,
    explanation: "Planning the testing sequence and safety measures is essential before starting any testing.",
    section: "6.3.8",
    difficulty: "basic",
    topic: "Testing preparation"
  },
  {
    id: "M6_3_INT_05",
    question: "How do supply variations affect test results?",
    options: ["No effect", "Can significantly affect some measurements", "Only minor effects", "Improves accuracy"],
    correctAnswer: 1,
    explanation: "Supply voltage variations can significantly affect some test measurements and should be considered.",
    section: "6.3.1",
    difficulty: "intermediate",
    topic: "Supply variation effects"
  },
  {
    id: "M6_3_INT_06",
    question: "What precautions apply when testing circuits with surge protection devices?",
    options: ["No special precautions", "May need to isolate SPDs during testing", "Cannot test", "Normal procedures"],
    correctAnswer: 1,
    explanation: "Surge protection devices may need to be isolated during some tests to prevent damage or interference.",
    section: "6.3.6",
    difficulty: "intermediate",
    topic: "SPD testing precautions"
  },
  {
    id: "M6_3_BAS_09",
    question: "What is the purpose of range selection on test instruments?",
    options: ["Cost control", "Optimise accuracy and safety", "Speed testing", "Show expertise"],
    correctAnswer: 1,
    explanation: "Correct range selection optimises measurement accuracy and ensures safe operation.",
    section: "6.3.1",
    difficulty: "basic",
    topic: "Range selection importance"
  },
  {
    id: "M6_3_BAS_10",
    question: "How should test instruments be handled during use?",
    options: ["Roughly", "Carefully to prevent damage", "Quickly", "Any way convenient"],
    correctAnswer: 1,
    explanation: "Test instruments should be handled carefully to prevent damage and maintain accuracy.",
    section: "6.3.1",
    difficulty: "basic",
    topic: "Instrument handling"
  },
  {
    id: "M6_3_BAS_11",
    question: "What should be done after completing testing?",
    options: ["Leave equipment connected", "Safely disconnect and store equipment", "Rush to next job", "Leave for others"],
    correctAnswer: 1,
    explanation: "Equipment should be safely disconnected and properly stored after completing testing.",
    section: "6.3.8",
    difficulty: "basic",
    topic: "Post-testing procedures"
  },
  {
    id: "M6_3_INT_07",
    question: "How should testing be coordinated with other trades?",
    options: ["Work independently", "Coordinate to ensure safety", "No coordination needed", "Avoid other trades"],
    correctAnswer: 1,
    explanation: "Testing should be coordinated with other trades to ensure safety and prevent interference.",
    section: "6.3.8",
    difficulty: "intermediate",
    topic: "Testing coordination"
  },
  {
    id: "M6_3_INT_08",
    question: "What considerations apply to testing in occupied buildings?",
    options: ["Same as empty buildings", "Minimise disruption and ensure safety", "Cannot test", "No special considerations"],
    correctAnswer: 1,
    explanation: "Testing in occupied buildings requires minimising disruption while ensuring safety of occupants.",
    section: "6.3.8",
    difficulty: "intermediate",
    topic: "Occupied building testing"
  },

  // Section 6.4: Continuity and Polarity Checks (40 questions)
  {
    id: "M6_4_1_01",
    question: "What is continuity testing used to verify?",
    options: ["Voltage levels", "Complete electrical path", "Insulation integrity", "Power consumption"],
    correctAnswer: 1,
    explanation: "Continuity testing verifies that there is a complete electrical path with low resistance.",
    section: "6.4.1",
    difficulty: "basic",
    topic: "Continuity testing purpose"
  },
  {
    id: "M6_4_1_02",
    question: "Which conductors require continuity testing?",
    options: ["Live conductors only", "Protective conductors (earth)", "Neutral conductors only", "All conductors"],
    correctAnswer: 1,
    explanation: "Protective conductors (CPC - earth) must be tested to ensure effective earth fault protection.",
    section: "6.4.1",
    difficulty: "basic",
    topic: "CPC continuity testing"
  },
  {
    id: "M6_4_1_03",
    question: "What instrument setting is used for continuity testing?",
    options: ["Voltage", "Low resistance (ohms)", "High resistance", "Current"],
    correctAnswer: 1,
    explanation: "Continuity testing uses low resistance measurement to check for complete electrical paths.",
    section: "6.4.1",
    difficulty: "basic",
    topic: "Continuity test settings"
  },
  {
    id: "M6_4_1_04",
    question: "What is considered a satisfactory continuity reading?",
    options: ["Infinite resistance", "Very low resistance", "High resistance", "Medium resistance"],
    correctAnswer: 1,
    explanation: "Satisfactory continuity shows very low resistance, typically less than 1 ohm.",
    section: "6.4.1",
    difficulty: "basic",
    topic: "Continuity acceptance criteria"
  },
  {
    id: "M6_4_2_01",
    question: "What instrument is used for continuity testing?",
    options: ["Insulation resistance tester", "Low resistance ohmmeter", "Voltmeter", "Ammeter"],
    correctAnswer: 1,
    explanation: "A low resistance ohmmeter is used to accurately measure the low resistance of protective conductors.",
    section: "6.4.2",
    difficulty: "basic",
    topic: "Continuity test instruments"
  },
  {
    id: "M6_4_2_02",
    question: "Why is a low resistance ohmmeter preferred for CPC testing?",
    options: ["Cost effective", "Accurate measurement of low resistances", "Easy to use", "Legal requirement"],
    correctAnswer: 1,
    explanation: "Low resistance ohmmeters provide accurate measurements of the very low resistances in protective conductors.",
    section: "6.4.2",
    difficulty: "intermediate",
    topic: "Low resistance ohmmeter use"
  },
  {
    id: "M6_4_2_03",
    question: "What current is typically used in low resistance ohmmeters?",
    options: ["1mA", "10mA", "100mA or more", "1A"],
    correctAnswer: 2,
    explanation: "Low resistance ohmmeters use currents of 100mA or more to overcome contact resistance.",
    section: "6.4.2",
    difficulty: "intermediate",
    topic: "Test current levels"
  },
  {
    id: "M6_4_3_01",
    question: "What does polarity testing check?",
    options: ["Voltage levels", "Correct connection of live and neutral", "Insulation resistance", "Earth continuity"],
    correctAnswer: 1,
    explanation: "Polarity testing ensures live and neutral conductors are correctly connected.",
    section: "6.4.3",
    difficulty: "basic",
    topic: "Polarity testing purpose"
  },
  {
    id: "M6_4_3_02",
    question: "When should polarity be checked?",
    options: ["Only on single-phase circuits", "On all circuits before energising", "Only on three-phase circuits", "After energising only"],
    correctAnswer: 1,
    explanation: "Polarity must be checked on all circuits before energising to ensure safe operation.",
    section: "6.4.3",
    difficulty: "basic",
    topic: "Polarity testing requirements"
  },
  {
    id: "M6_4_3_03",
    question: "At what points should polarity be checked?",
    options: ["Consumer unit only", "All outlets and switches", "Sockets only", "Lights only"],
    correctAnswer: 1,
    explanation: "Polarity must be checked at all outlets, switches, and control points.",
    section: "6.4.3",
    difficulty: "basic",
    topic: "Polarity test points"
  },
  {
    id: "M6_4_3_04",
    question: "What happens if polarity is incorrect?",
    options: ["Nothing", "Potential safety hazards", "Improved efficiency", "Cost savings"],
    correctAnswer: 1,
    explanation: "Incorrect polarity can create serious safety hazards including shock risks.",
    section: "6.4.3",
    difficulty: "intermediate",
    topic: "Polarity fault consequences"
  },
  {
    id: "M6_4_4_01",
    question: "What is a ring circuit?",
    options: ["A circular cable", "A circuit with two paths", "A protective circuit", "A lighting circuit"],
    correctAnswer: 1,
    explanation: "A ring circuit has two paths from the distribution board to serve outlets.",
    section: "6.4.4",
    difficulty: "basic",
    topic: "Ring circuit definition"
  },
  {
    id: "M6_4_4_02",
    question: "Why do ring circuits require special testing?",
    options: ["Legal requirement only", "Ensure ring integrity and safety", "Cost control", "Time management"],
    correctAnswer: 1,
    explanation: "Ring circuits need special testing to ensure the ring is complete and functioning safely.",
    section: "6.4.4",
    difficulty: "intermediate",
    topic: "Ring circuit testing importance"
  },
  {
    id: "M6_4_5_01",
    question: "What should be recorded for each continuity test?",
    options: ["Nothing", "Test result and location", "Time only", "Inspector name only"],
    correctAnswer: 1,
    explanation: "Each test should record the result value and the specific location tested.",
    section: "6.4.5",
    difficulty: "basic",
    topic: "Continuity test recording"
  },
  {
    id: "M6_4_BAS_01",
    question: "What preparation is needed before continuity testing?",
    options: ["None", "Isolate circuit and disconnect loads", "Energise circuit", "Connect loads"],
    correctAnswer: 1,
    explanation: "Circuits must be isolated and loads disconnected before continuity testing.",
    section: "6.4.1",
    difficulty: "basic",
    topic: "Continuity test preparation"
  },
  {
    id: "M6_4_BAS_02",
    question: "How should test leads be connected for continuity testing?",
    options: ["Randomly", "Between points being tested", "To earth only", "To live only"],
    correctAnswer: 1,
    explanation: "Test leads should be connected between the specific points being tested for continuity.",
    section: "6.4.2",
    difficulty: "basic",
    topic: "Test lead connection"
  },
  {
    id: "M6_4_BAS_03",
    question: "What is the typical acceptable resistance for a protective conductor?",
    options: ["Less than 1 ohm", "More than 10 ohms", "Any value", "Exactly 1 ohm"],
    correctAnswer: 0,
    explanation: "Protective conductor resistance should typically be less than 1 ohm for most installations.",
    section: "6.4.1",
    difficulty: "basic",
    topic: "CPC resistance limits"
  },
  {
    id: "M6_4_BAS_04",
    question: "Why must circuits be isolated before continuity testing?",
    options: ["Legal requirement", "Safety and accurate measurements", "Cost reduction", "Speed"],
    correctAnswer: 1,
    explanation: "Isolation ensures safety and prevents other paths affecting measurement accuracy.",
    section: "6.4.1",
    difficulty: "basic",
    topic: "Isolation importance"
  },
  {
    id: "M6_4_INT_01",
    question: "How can contact resistance affect continuity measurements?",
    options: ["No effect", "Can give false high readings", "Improves accuracy", "Reduces readings"],
    correctAnswer: 1,
    explanation: "Poor contact resistance at probe connections can give falsely high continuity readings.",
    section: "6.4.2",
    difficulty: "intermediate",
    topic: "Contact resistance effects"
  },
  {
    id: "M6_4_INT_02",
    question: "What factors affect the resistance of protective conductors?",
    options: ["Colour only", "Length, cross-sectional area, material", "Age only", "Installation method only"],
    correctAnswer: 1,
    explanation: "Conductor resistance depends on length, cross-sectional area, and material properties.",
    section: "6.4.1",
    difficulty: "intermediate",
    topic: "Conductor resistance factors"
  },
  {
    id: "M6_4_INT_03",
    question: "How should polarity be tested on lighting circuits?",
    options: ["Not tested", "Check switch connections and outlets", "Visual only", "Assume correct"],
    correctAnswer: 1,
    explanation: "Lighting circuit polarity should be checked at switches and light outlets.",
    section: "6.4.3",
    difficulty: "intermediate",
    topic: "Lighting polarity testing"
  },
  {
    id: "M6_4_INT_04",
    question: "What special considerations apply to ring circuit testing?",
    options: ["Same as radial circuits", "Must verify ring integrity", "Not testable", "Visual only"],
    correctAnswer: 1,
    explanation: "Ring circuits require special tests to verify the ring is complete and not broken.",
    section: "6.4.4",
    difficulty: "intermediate",
    topic: "Ring circuit special tests"
  },
  {
    id: "M6_4_BAS_05",
    question: "Where should the main earth terminal continuity be tested?",
    options: ["Not tested", "To all earth points", "One point only", "Visual only"],
    correctAnswer: 1,
    explanation: "Main earth terminal continuity should be tested to all earthed points in the installation.",
    section: "6.4.1",
    difficulty: "basic",
    topic: "Main earth terminal testing"
  },
  {
    id: "M6_4_BAS_06",
    question: "What test voltage is used for polarity testing?",
    options: ["High voltage", "Low voltage from ohmmeter", "Mains voltage", "No voltage"],
    correctAnswer: 1,
    explanation: "Polarity testing uses low voltage from an ohmmeter or continuity tester.",
    section: "6.4.3",
    difficulty: "basic",
    topic: "Polarity test voltage"
  },
  {
    id: "M6_4_BAS_07",
    question: "How should bonding conductor continuity be tested?",
    options: ["Not tested", "Test from main earth to bonded items", "Visual only", "Estimate"],
    correctAnswer: 1,
    explanation: "Bonding conductor continuity should be tested from the main earth terminal to bonded items.",
    section: "6.4.1",
    difficulty: "basic",
    topic: "Bonding continuity testing"
  },
  {
    id: "M6_4_BAS_08",
    question: "What should be done if continuity test fails?",
    options: ["Ignore", "Investigate and rectify fault", "Retest only", "Estimate value"],
    correctAnswer: 1,
    explanation: "Failed continuity tests indicate faults that must be investigated and rectified.",
    section: "6.4.5",
    difficulty: "basic",
    topic: "Failed continuity response"
  },
  {
    id: "M6_4_INT_05",
    question: "How do temperature changes affect conductor resistance?",
    options: ["No effect", "Higher temperature increases resistance", "Temperature decreases resistance", "Random effect"],
    correctAnswer: 1,
    explanation: "Conductor resistance generally increases with temperature for metallic conductors.",
    section: "6.4.1",
    difficulty: "intermediate",
    topic: "Temperature effects on resistance"
  },
  {
    id: "M6_4_INT_06",
    question: "What precautions apply when testing circuits with electronic equipment?",
    options: ["No precautions", "Disconnect electronic equipment", "Use high voltage", "Test with equipment connected"],
    correctAnswer: 1,
    explanation: "Electronic equipment should be disconnected to prevent damage during testing.",
    section: "6.4.1",
    difficulty: "intermediate",
    topic: "Electronic equipment precautions"
  },
  {
    id: "M6_4_ADV_01",
    question: "How should measurement uncertainty be considered in continuity testing?",
    options: ["Ignore uncertainty", "Apply safety factors to limits", "Estimate roughly", "Not relevant"],
    correctAnswer: 1,
    explanation: "Measurement uncertainty should be considered by applying appropriate safety factors to acceptance limits.",
    section: "6.4.5",
    difficulty: "advanced",
    topic: "Measurement uncertainty in continuity"
  },
  {
    id: "M6_4_BAS_09",
    question: "What is the purpose of testing earth fault loop impedance path continuity?",
    options: ["Not important", "Ensure protective device operation", "Cost control", "Legal requirement only"],
    correctAnswer: 1,
    explanation: "Earth fault loop path continuity ensures protective devices can operate effectively during faults.",
    section: "6.4.1",
    difficulty: "basic",
    topic: "Earth fault loop continuity importance"
  },
  {
    id: "M6_4_BAS_10",
    question: "How should test results be compared with requirements?",
    options: ["Not compared", "Against BS 7671 limits", "Personal judgment", "Client requirements"],
    correctAnswer: 1,
    explanation: "Test results should be compared against the limits specified in BS 7671.",
    section: "6.4.5",
    difficulty: "basic",
    topic: "Result comparison standards"
  },
  {
    id: "M6_4_INT_07",
    question: "What documentation should accompany continuity test results?",
    options: ["None needed", "Circuit details and test conditions", "Time only", "Inspector name only"],
    correctAnswer: 1,
    explanation: "Results should be documented with circuit details, test conditions, and measurement locations.",
    section: "6.4.5",
    difficulty: "intermediate",
    topic: "Continuity test documentation"
  },
  {
    id: "M6_4_INT_08",
    question: "How should continuity testing be sequenced with other tests?",
    options: ["Last", "Before insulation resistance testing", "During energised tests", "Random order"],
    correctAnswer: 1,
    explanation: "Continuity testing should be performed before insulation resistance testing.",
    section: "6.4.5",
    difficulty: "intermediate",
    topic: "Test sequencing"
  },
  {
    id: "M6_4_BAS_11",
    question: "What safety measures apply during continuity testing?",
    options: ["None needed", "Ensure circuits isolated", "Work live", "Rush testing"],
    correctAnswer: 1,
    explanation: "Circuits must be properly isolated and proved dead before continuity testing.",
    section: "6.4.1",
    difficulty: "basic",
    topic: "Continuity testing safety"
  },
  {
    id: "M6_4_BAS_12",
    question: "How should inconsistent test results be handled?",
    options: ["Accept first result", "Investigate and retest", "Average results", "Ignore differences"],
    correctAnswer: 1,
    explanation: "Inconsistent results should be investigated and retesting performed to determine the correct value.",
    section: "6.4.5",
    difficulty: "basic",
    topic: "Inconsistent result handling"
  },
  {
    id: "M6_4_INT_09",
    question: "What factors can cause high resistance in protective conductors?",
    options: ["Good connections only", "Corrosion, loose connections, damage", "Low temperature", "Short length"],
    correctAnswer: 1,
    explanation: "High resistance can result from corrosion, loose connections, or physical damage to conductors.",
    section: "6.4.1",
    difficulty: "intermediate",
    topic: "High resistance causes"
  },
  {
    id: "M6_4_INT_10",
    question: "How should polarity testing be documented?",
    options: ["Not documented", "Record all test points and results", "Brief notes only", "Sketch only"],
    correctAnswer: 1,
    explanation: "Polarity testing should be documented with all test points and results clearly recorded.",
    section: "6.4.5",
    difficulty: "intermediate",
    topic: "Polarity test documentation"
  },
  {
    id: "M6_4_ADV_02",
    question: "What considerations apply to continuity testing in installations with multiple earthing systems?",
    options: ["Same as single systems", "Must understand system configurations", "Cannot test", "Visual only"],
    correctAnswer: 1,
    explanation: "Multiple earthing systems require understanding of system configurations for proper testing.",
    section: "6.4.1",
    difficulty: "advanced",
    topic: "Multiple earthing system testing"
  },

  // Section 6.5: Insulation Resistance Testing (35 questions)
  {
    id: "M6_5_1_01",
    question: "What is the purpose of insulation resistance testing?",
    options: ["To measure current flow", "To check insulation effectiveness", "To test continuity", "To measure voltage"],
    correctAnswer: 1,
    explanation: "Insulation resistance testing checks that insulation can effectively prevent unwanted current flow.",
    section: "6.5.1",
    difficulty: "basic",
    topic: "IR testing purpose"
  },
  {
    id: "M6_5_1_02",
    question: "What does poor insulation resistance indicate?",
    options: ["Good condition", "Potential earth faults or deterioration", "Normal operation", "Cost savings"],
    correctAnswer: 1,
    explanation: "Poor insulation resistance indicates potential earth faults or deteriorating insulation.",
    section: "6.5.1",
    difficulty: "basic",
    topic: "Poor IR indication"
  },
  {
    id: "M6_5_1_03",
    question: "When should insulation resistance testing be performed?",
    options: ["After energising", "Before energising", "During operation", "Never"],
    correctAnswer: 1,
    explanation: "Insulation resistance testing must be performed before energising circuits.",
    section: "6.5.1",
    difficulty: "basic",
    topic: "IR testing timing"
  },
  {
    id: "M6_5_2_01",
    question: "What voltage is typically used for insulation resistance testing on 230V circuits?",
    options: ["230V", "500V", "1000V", "50V"],
    correctAnswer: 1,
    explanation: "500V DC is the standard test voltage for insulation resistance testing on 230V circuits.",
    section: "6.5.2",
    difficulty: "intermediate",
    topic: "IR test voltages"
  },
  {
    id: "M6_5_2_02",
    question: "What type of voltage is used for insulation resistance testing?",
    options: ["AC voltage", "DC voltage", "Either AC or DC", "No voltage"],
    correctAnswer: 1,
    explanation: "DC voltage is used for insulation resistance testing to avoid capacitive effects.",
    section: "6.5.2",
    difficulty: "intermediate",
    topic: "IR test voltage type"
  },
  {
    id: "M6_5_2_03",
    question: "Why is the correct test voltage important?",
    options: ["Cost control", "Proper stress testing of insulation", "Speed of testing", "Equipment protection"],
    correctAnswer: 1,
    explanation: "Correct test voltage ensures proper stress testing of insulation to reveal defects.",
    section: "6.5.2",
    difficulty: "intermediate",
    topic: "Test voltage importance"
  },
  {
    id: "M6_5_3_01",
    question: "What precaution must be taken before insulation resistance testing?",
    options: ["Ensure circuit is energised", "Disconnect electronic equipment", "Check earth continuity", "Measure voltage first"],
    correctAnswer: 1,
    explanation: "Electronic equipment must be disconnected to prevent damage from the high test voltage.",
    section: "6.5.3",
    difficulty: "intermediate",
    topic: "IR testing precautions"
  },
  {
    id: "M6_5_3_02",
    question: "What equipment should be isolated before IR testing?",
    options: ["Nothing", "Electronic equipment and equipment with low insulation", "Only computers", "Only lights"],
    correctAnswer: 1,
    explanation: "Electronic equipment and equipment with intentionally low insulation must be isolated.",
    section: "6.5.3",
    difficulty: "intermediate",
    topic: "Equipment isolation"
  },
  {
    id: "M6_5_3_03",
    question: "Why might electronic equipment be damaged by IR testing?",
    options: ["High test voltage", "Low test voltage", "AC voltage", "No risk"],
    correctAnswer: 0,
    explanation: "The high DC test voltage can damage sensitive electronic components.",
    section: "6.5.3",
    difficulty: "intermediate",
    topic: "Electronic equipment damage"
  },
  {
    id: "M6_5_4_01",
    question: "What is the minimum acceptable insulation resistance for a 230V circuit?",
    options: ["0.5 MΩ", "1.0 MΩ", "2.0 MΩ", "5.0 MΩ"],
    correctAnswer: 1,
    explanation: "BS 7671 requires a minimum of 1.0 MΩ for circuits up to 500V.",
    section: "6.5.4",
    difficulty: "intermediate",
    topic: "IR acceptance criteria"
  },
  {
    id: "M6_5_4_02",
    question: "What factors can affect insulation resistance readings?",
    options: ["Temperature and humidity", "Colour of cables", "Age of building", "Day of week"],
    correctAnswer: 0,
    explanation: "Temperature and humidity significantly affect insulation resistance measurements.",
    section: "6.5.4",
    difficulty: "intermediate",
    topic: "IR reading factors"
  },
  {
    id: "M6_5_4_03",
    question: "How does temperature affect insulation resistance?",
    options: ["No effect", "Higher temperature increases resistance", "Higher temperature decreases resistance", "Only affects cables"],
    correctAnswer: 2,
    explanation: "Higher temperatures generally decrease insulation resistance values.",
    section: "6.5.4",
    difficulty: "intermediate",
    topic: "Temperature effects"
  },
  {
    id: "M6_5_BAS_01",
    question: "What safety precautions apply during IR testing?",
    options: ["None needed", "Ensure isolation and discharge capacitance", "Work live", "Rush testing"],
    correctAnswer: 1,
    explanation: "Circuits must be isolated and any stored charge discharged before and after IR testing.",
    section: "6.5.3",
    difficulty: "basic",
    topic: "IR testing safety"
  },
  {
    id: "M6_5_BAS_02",
    question: "How should IR test results be interpreted?",
    options: ["Higher values are worse", "Higher values are better", "All values acceptable", "No interpretation needed"],
    correctAnswer: 1,
    explanation: "Higher insulation resistance values indicate better insulation condition.",
    section: "6.5.4",
    difficulty: "basic",
    topic: "IR result interpretation"
  },
  {
    id: "M6_5_BAS_03",
    question: "What should be done if IR readings are below acceptable limits?",
    options: ["Ignore results", "Investigate and rectify faults", "Retest only", "Accept lower values"],
    correctAnswer: 1,
    explanation: "Low IR readings indicate faults that must be investigated and rectified.",
    section: "6.5.4",
    difficulty: "basic",
    topic: "Low IR response"
  },
  {
    id: "M6_5_BAS_04",
    question: "Between which points should IR testing be carried out?",
    options: ["Live conductors only", "Live to earth and between conductors", "Earth only", "Neutral only"],
    correctAnswer: 1,
    explanation: "IR testing should be carried out between live conductors and earth, and between live conductors.",
    section: "6.5.1",
    difficulty: "basic",
    topic: "IR test points"
  },
  {
    id: "M6_5_BAS_05",
    question: "What instrument is used for insulation resistance testing?",
    options: ["Multimeter", "Insulation resistance tester", "Continuity tester", "Voltmeter"],
    correctAnswer: 1,
    explanation: "A dedicated insulation resistance tester is used to apply the required test voltage.",
    section: "6.5.2",
    difficulty: "basic",
    topic: "IR testing instrument"
  },
  {
    id: "M6_5_INT_01",
    question: "How long should the test voltage be applied during IR testing?",
    options: ["Instantly", "Long enough for stable reading", "Exactly 1 minute", "As long as possible"],
    correctAnswer: 1,
    explanation: "Test voltage should be applied long enough to achieve a stable reading, typically 15-60 seconds.",
    section: "6.5.2",
    difficulty: "intermediate",
    topic: "IR test duration"
  },
  {
    id: "M6_5_INT_02",
    question: "What effect does humidity have on insulation resistance?",
    options: ["No effect", "High humidity decreases resistance", "High humidity increases resistance", "Only affects outdoor cables"],
    correctAnswer: 1,
    explanation: "High humidity can significantly decrease insulation resistance readings.",
    section: "6.5.4",
    difficulty: "intermediate",
    topic: "Humidity effects on IR"
  },
  {
    id: "M6_5_INT_03",
    question: "How should IR testing be performed on circuits with surge protection?",
    options: ["Normal testing", "Isolate SPDs during testing", "Cannot test", "Use lower voltage"],
    correctAnswer: 1,
    explanation: "Surge protection devices should be isolated during IR testing to prevent damage.",
    section: "6.5.3",
    difficulty: "intermediate",
    topic: "SPD considerations in IR testing"
  },
  {
    id: "M6_5_INT_04",
    question: "What preparation is needed before IR testing?",
    options: ["None", "Isolate circuit and disconnect equipment", "Energise circuit", "Connect all loads"],
    correctAnswer: 1,
    explanation: "Circuits must be isolated and sensitive equipment disconnected before IR testing.",
    section: "6.5.3",
    difficulty: "intermediate",
    topic: "IR testing preparation"
  },
  {
    id: "M6_5_BAS_06",
    question: "What happens if insulation resistance is too low?",
    options: ["No problem", "Risk of earth faults and shock", "Improved performance", "Cost savings"],
    correctAnswer: 1,
    explanation: "Low insulation resistance creates risks of earth faults, electric shock, and fire.",
    section: "6.5.1",
    difficulty: "basic",
    topic: "Low IR risks"
  },
  {
    id: "M6_5_BAS_07",
    question: "How should the test equipment be set up for IR testing?",
    options: ["Any connection", "Follow manufacturer instructions", "Random setup", "Quick connection"],
    correctAnswer: 1,
    explanation: "Test equipment should be set up according to manufacturer instructions for safe and accurate testing.",
    section: "6.5.2",
    difficulty: "basic",
    topic: "IR test setup"
  },
  {
    id: "M6_5_BAS_08",
    question: "What should be done after completing IR testing?",
    options: ["Leave connected", "Discharge circuit and reconnect equipment", "Move to next circuit", "Energise immediately"],
    correctAnswer: 1,
    explanation: "Circuits should be discharged and equipment reconnected after IR testing.",
    section: "6.5.3",
    difficulty: "basic",
    topic: "Post-IR testing procedures"
  },
  {
    id: "M6_5_INT_05",
    question: "How do cable length and construction affect IR readings?",
    options: ["No effect", "Longer cables may show lower readings", "Only affects voltage rating", "Improves readings"],
    correctAnswer: 1,
    explanation: "Longer cables and complex constructions may show lower IR readings due to cumulative leakage.",
    section: "6.5.4",
    difficulty: "intermediate",
    topic: "Cable effects on IR"
  },
  {
    id: "M6_5_INT_06",
    question: "What documentation should accompany IR test results?",
    options: ["None needed", "Test conditions and circuit details", "Time only", "Weather conditions"],
    correctAnswer: 1,
    explanation: "IR test results should be documented with test conditions, temperature, humidity, and circuit details.",
    section: "6.5.4",
    difficulty: "intermediate",
    topic: "IR test documentation"
  },
  {
    id: "M6_5_ADV_01",
    question: "How should IR testing be modified for installations in harsh environments?",
    options: ["Same as normal", "Consider environmental effects on acceptance criteria", "Cannot test", "Use different voltage"],
    correctAnswer: 1,
    explanation: "Harsh environments may require consideration of environmental effects on acceptable IR values.",
    section: "6.5.4",
    difficulty: "advanced",
    topic: "Environmental IR considerations"
  },
  {
    id: "M6_5_BAS_09",
    question: "Why is it important to record environmental conditions during IR testing?",
    options: ["Legal requirement", "Conditions affect readings", "Cost control", "Time management"],
    correctAnswer: 1,
    explanation: "Environmental conditions significantly affect IR readings and should be recorded for reference.",
    section: "6.5.4",
    difficulty: "basic",
    topic: "Environmental recording importance"
  },
  {
    id: "M6_5_BAS_10",
    question: "What voltage should be used for IR testing on SELV circuits?",
    options: ["500V", "250V", "1000V", "230V"],
    correctAnswer: 1,
    explanation: "SELV circuits should be tested at 250V DC to avoid over-stressing the insulation.",
    section: "6.5.2",
    difficulty: "basic",
    topic: "SELV IR test voltage"
  },
  {
    id: "M6_5_INT_07",
    question: "How should IR results be compared between different test occasions?",
    options: ["Direct comparison", "Consider test conditions and environment", "Not compared", "Average values"],
    correctAnswer: 1,
    explanation: "IR results should be compared considering differences in test conditions and environmental factors.",
    section: "6.5.4",
    difficulty: "intermediate",
    topic: "IR result comparison"
  },
  {
    id: "M6_5_INT_08",
    question: "What special considerations apply to IR testing of motor circuits?",
    options: ["Same as lighting circuits", "Motors may have lower acceptable limits", "Cannot test motors", "Use higher voltage"],
    correctAnswer: 1,
    explanation: "Motor circuits may have different acceptable IR limits due to winding characteristics.",
    section: "6.5.4",
    difficulty: "intermediate",
    topic: "Motor circuit IR testing"
  },
  {
    id: "M6_5_BAS_11",
    question: "What should be done if IR readings vary significantly during testing?",
    options: ["Use first reading", "Investigate cause of variation", "Average readings", "Ignore variations"],
    correctAnswer: 1,
    explanation: "Significant variations in IR readings should be investigated to determine the cause.",
    section: "6.5.4",
    difficulty: "basic",
    topic: "IR reading variation"
  },
  {
    id: "M6_5_ADV_02",
    question: "How does dielectric absorption affect IR measurements?",
    options: ["No effect", "Can cause time-dependent reading changes", "Improves accuracy", "Only affects new cables"],
    correctAnswer: 1,
    explanation: "Dielectric absorption can cause IR readings to change over time during the test.",
    section: "6.5.4",
    difficulty: "advanced",
    topic: "Dielectric absorption effects"
  },
  {
    id: "M6_5_INT_09",
    question: "What factors should be considered when establishing acceptance criteria for older installations?",
    options: ["Age only", "Age, environment, and original standards", "Visual condition only", "Cost of replacement"],
    correctAnswer: 1,
    explanation: "Acceptance criteria for older installations should consider age, environment, and the standards in effect when installed.",
    section: "6.5.4",
    difficulty: "intermediate",
    topic: "Older installation IR criteria"
  },

  // Section 6.6: Recording Results and Defect Identification (30 questions)
  {
    id: "M6_6_1_01",
    question: "Why is accurate recording of test results important?",
    options: ["Legal compliance only", "Future reference and safety", "Cost calculations", "Insurance purposes"],
    correctAnswer: 1,
    explanation: "Accurate records provide evidence of safety compliance and reference for future work.",
    section: "6.6.1",
    difficulty: "basic",
    topic: "Recording importance"
  },
  {
    id: "M6_6_1_02",
    question: "What information should be included in test records?",
    options: ["Results only", "Results, conditions, and observations", "Names only", "Dates only"],
    correctAnswer: 1,
    explanation: "Complete records include test results, test conditions, and relevant observations.",
    section: "6.6.1",
    difficulty: "basic",
    topic: "Test record content"
  },
  {
    id: "M6_6_1_03",
    question: "How long should test records be retained?",
    options: ["1 year", "Until next inspection", "Permanently", "No requirement"],
    correctAnswer: 1,
    explanation: "Test records should be retained until the next inspection to provide reference information.",
    section: "6.6.1",
    difficulty: "basic",
    topic: "Record retention"
  },
  {
    id: "M6_6_2_01",
    question: "How should test results be interpreted?",
    options: ["Against manufacturer specifications", "Against BS 7671 requirements", "Against previous results", "Against client requirements"],
    correctAnswer: 1,
    explanation: "Test results must be compared against the requirements specified in BS 7671.",
    section: "6.6.2",
    difficulty: "basic",
    topic: "Result interpretation"
  },
  {
    id: "M6_6_2_02",
    question: "What should be done with borderline test results?",
    options: ["Ignore them", "Investigate and possibly retest", "Accept them", "Fail automatically"],
    correctAnswer: 1,
    explanation: "Borderline results should be investigated and retested if necessary to ensure safety.",
    section: "6.6.2",
    difficulty: "intermediate",
    topic: "Borderline results"
  },
  {
    id: "M6_6_2_03",
    question: "Where can acceptance criteria for test results be found?",
    options: ["Manufacturer data", "BS 7671", "Local regulations", "Personal judgment"],
    correctAnswer: 1,
    explanation: "BS 7671 provides the acceptance criteria for electrical installation test results.",
    section: "6.6.2",
    difficulty: "basic",
    topic: "Acceptance criteria source"
  },
  {
    id: "M6_6_3_01",
    question: "What action should be taken if a test result fails to meet requirements?",
    options: ["Ignore the result", "Record and investigate the cause", "Repeat the test only", "Proceed with energising"],
    correctAnswer: 1,
    explanation: "Failed test results must be recorded and the cause investigated before corrective action.",
    section: "6.6.3",
    difficulty: "basic",
    topic: "Failed test procedures"
  },
  {
    id: "M6_6_3_02",
    question: "What immediate action is required for dangerous defects?",
    options: ["Continue testing", "Immediate isolation", "Note for later", "Ignore"],
    correctAnswer: 1,
    explanation: "Dangerous defects require immediate isolation to prevent injury or damage.",
    section: "6.6.3",
    difficulty: "basic",
    topic: "Dangerous defect action"
  },
  {
    id: "M6_6_3_03",
    question: "How should defects be categorised?",
    options: ["By cost", "By danger level and urgency", "By location", "By age"],
    correctAnswer: 1,
    explanation: "Defects should be categorised by their danger level and urgency for remedial action.",
    section: "6.6.3",
    difficulty: "intermediate",
    topic: "Defect categorisation"
  },
  {
    id: "M6_6_BAS_01",
    question: "What should be recorded for each test performed?",
    options: ["Result only", "Result, location, conditions, and equipment used", "Time only", "Inspector name"],
    correctAnswer: 1,
    explanation: "Complete test records should include results, locations, conditions, and equipment details.",
    section: "6.6.1",
    difficulty: "basic",
    topic: "Comprehensive test recording"
  },
  {
    id: "M6_6_BAS_02",
    question: "How should test results be presented?",
    options: ["Randomly", "Clearly and systematically", "Brief notes only", "Verbal only"],
    correctAnswer: 1,
    explanation: "Test results should be presented clearly and systematically for easy interpretation.",
    section: "6.6.1",
    difficulty: "basic",
    topic: "Result presentation"
  },
  {
    id: "M6_6_BAS_03",
    question: "What information helps in future fault diagnosis?",
    options: ["Results only", "Detailed records of conditions and observations", "Names only", "Dates only"],
    correctAnswer: 1,
    explanation: "Detailed records of test conditions and observations help in future fault diagnosis.",
    section: "6.6.1",
    difficulty: "basic",
    topic: "Future reference value"
  },
  {
    id: "M6_6_BAS_04",
    question: "How should measurement units be recorded?",
    options: ["No units needed", "Always include appropriate units", "Estimate units", "Use any units"],
    correctAnswer: 1,
    explanation: "All measurements should be recorded with appropriate units to avoid confusion.",
    section: "6.6.1",
    difficulty: "basic",
    topic: "Measurement units"
  },
  {
    id: "M6_6_INT_01",
    question: "How should test result trends be analysed?",
    options: ["Not analysed", "Compare with previous results", "Ignore trends", "Estimate trends"],
    correctAnswer: 1,
    explanation: "Test result trends should be analysed by comparing with previous results to identify deterioration.",
    section: "6.6.2",
    difficulty: "intermediate",
    topic: "Result trend analysis"
  },
  {
    id: "M6_6_INT_02",
    question: "What factors should be considered when interpreting test results?",
    options: ["Results only", "Test conditions, environment, and standards", "Personal opinion", "Cost implications"],
    correctAnswer: 1,
    explanation: "Test interpretation should consider test conditions, environmental factors, and applicable standards.",
    section: "6.6.2",
    difficulty: "intermediate",
    topic: "Result interpretation factors"
  },
  {
    id: "M6_6_INT_03",
    question: "How should measurement accuracy be considered in result interpretation?",
    options: ["Ignore accuracy", "Consider instrument accuracy in borderline cases", "Assume perfect accuracy", "Estimate accuracy"],
    correctAnswer: 1,
    explanation: "Instrument accuracy should be considered, especially when results are close to acceptance limits.",
    section: "6.6.2",
    difficulty: "intermediate",
    topic: "Measurement accuracy consideration"
  },
  {
    id: "M6_6_BAS_05",
    question: "What should be done if test equipment gives inconsistent results?",
    options: ["Use any result", "Stop and check equipment", "Average results", "Ignore differences"],
    correctAnswer: 1,
    explanation: "Inconsistent results indicate equipment problems that must be investigated before continuing.",
    section: "6.6.2",
    difficulty: "basic",
    topic: "Equipment consistency checking"
  },
  {
    id: "M6_6_BAS_06",
    question: "How should defects found during testing be prioritised?",
    options: ["By cost", "By safety risk", "By convenience", "Randomly"],
    correctAnswer: 1,
    explanation: "Defects should be prioritised by their safety risk and potential consequences.",
    section: "6.6.3",
    difficulty: "basic",
    topic: "Defect prioritisation"
  },
  {
    id: "M6_6_BAS_07",
    question: "What documentation should accompany defect reports?",
    options: ["None needed", "Clear description and location", "Estimate only", "Verbal report"],
    correctAnswer: 1,
    explanation: "Defect reports should include clear descriptions, exact locations, and severity assessments.",
    section: "6.6.3",
    difficulty: "basic",
    topic: "Defect documentation"
  },
  {
    id: "M6_6_INT_04",
    question: "How should repeat test results be handled?",
    options: ["Use first result", "Document all results and reasons for retesting", "Average results", "Use last result"],
    correctAnswer: 1,
    explanation: "All test results should be documented along with reasons for retesting.",
    section: "6.6.1",
    difficulty: "intermediate",
    topic: "Repeat test documentation"
  },
  {
    id: "M6_6_INT_05",
    question: "What role does photographic evidence play in defect recording?",
    options: ["Not useful", "Provides valuable supporting evidence", "Only for insurance", "Legal requirement"],
    correctAnswer: 1,
    explanation: "Photographs provide valuable supporting evidence for defects and can aid in remedial work planning.",
    section: "6.6.3",
    difficulty: "intermediate",
    topic: "Photographic evidence value"
  },
  {
    id: "M6_6_BAS_08",
    question: "How should test results be communicated to clients?",
    options: ["Technical language only", "Clear, understandable language", "Not communicated", "Verbal only"],
    correctAnswer: 1,
    explanation: "Test results should be communicated in clear, understandable language appropriate for the client.",
    section: "6.6.2",
    difficulty: "basic",
    topic: "Client communication"
  },
  {
    id: "M6_6_BAS_09",
    question: "What should be included in defect classification?",
    options: ["Location only", "Type, severity, and urgency", "Cost only", "Time to fix"],
    correctAnswer: 1,
    explanation: "Defect classification should include type, severity level, and urgency for remedial action.",
    section: "6.6.3",
    difficulty: "basic",
    topic: "Defect classification"
  },
  {
    id: "M6_6_INT_06",
    question: "How should environmental conditions during testing be recorded?",
    options: ["Not recorded", "Temperature, humidity, and other relevant factors", "Weather only", "Temperature only"],
    correctAnswer: 1,
    explanation: "Environmental conditions that can affect test results should be recorded for reference.",
    section: "6.6.1",
    difficulty: "intermediate",
    topic: "Environmental condition recording"
  },
  {
    id: "M6_6_BAS_10",
    question: "What should be done with test records after completion?",
    options: ["Discard them", "Store safely for future reference", "Give to client only", "Keep at home"],
    correctAnswer: 1,
    explanation: "Test records should be stored safely and securely for future reference and legal purposes.",
    section: "6.6.1",
    difficulty: "basic",
    topic: "Record storage"
  },
  {
    id: "M6_6_ADV_01",
    question: "How should statistical analysis be applied to large volumes of test data?",
    options: ["Not applicable", "Identify patterns and deterioration trends", "Random sampling", "Visual inspection only"],
    correctAnswer: 1,
    explanation: "Statistical analysis of large datasets can identify patterns and predict deterioration trends.",
    section: "6.6.2",
    difficulty: "advanced",
    topic: "Statistical data analysis"
  },
  {
    id: "M6_6_INT_07",
    question: "What considerations apply to digital vs. paper record keeping?",
    options: ["No difference", "Each has advantages for different applications", "Digital always better", "Paper always better"],
    correctAnswer: 1,
    explanation: "Digital and paper records each have advantages depending on the application and requirements.",
    section: "6.6.1",
    difficulty: "intermediate",
    topic: "Record keeping methods"
  },
  {
    id: "M6_6_INT_08",
    question: "How should test result accuracy be validated?",
    options: ["Not validated", "Cross-check with different methods where possible", "Accept first result", "Estimate accuracy"],
    correctAnswer: 1,
    explanation: "Test result accuracy should be validated by cross-checking with different methods where possible.",
    section: "6.6.2",
    difficulty: "intermediate",
    topic: "Result validation"
  },
  {
    id: "M6_6_BAS_11",
    question: "What should be recorded if testing cannot be completed?",
    options: ["Nothing", "Reason for incomplete testing", "Estimate results", "Skip documentation"],
    correctAnswer: 1,
    explanation: "If testing cannot be completed, the reasons should be clearly recorded.",
    section: "6.6.1",
    difficulty: "basic",
    topic: "Incomplete testing documentation"
  },
  {
    id: "M6_6_ADV_02",
    question: "How should measurement uncertainty be quantified and recorded?",
    options: ["Not quantified", "Calculate and record where significant", "Estimate roughly", "Ignore uncertainty"],
    correctAnswer: 1,
    explanation: "Measurement uncertainty should be calculated and recorded where it significantly affects result interpretation.",
    section: "6.6.2",
    difficulty: "advanced",
    topic: "Measurement uncertainty quantification"
  },

  // Section 6.7: Certification and Documentation (25 questions)
  {
    id: "M6_7_1_01",
    question: "Why is electrical certification required?",
    options: ["To increase costs", "To prove compliance with regulations", "To extend warranties", "To meet planning requirements"],
    correctAnswer: 1,
    explanation: "Certification provides evidence that work complies with relevant standards and regulations.",
    section: "6.7.1",
    difficulty: "basic",
    topic: "Certification purpose"
  },
  {
    id: "M6_7_1_02",
    question: "What legal purpose do electrical certificates serve?",
    options: ["Cost justification", "Evidence of compliance", "Insurance requirement", "Planning permission"],
    correctAnswer: 1,
    explanation: "Certificates provide legal evidence that work complies with relevant standards and regulations.",
    section: "6.7.1",
    difficulty: "basic",
    topic: "Certificate legal purpose"
  },
  {
    id: "M6_7_2_01",
    question: "What does EIC stand for?",
    options: ["Electrical Installation Certificate", "Electrical Inspection Certificate", "Electrical Implementation Certificate", "Electrical Installation Check"],
    correctAnswer: 0,
    explanation: "EIC stands for Electrical Installation Certificate, issued for new installations.",
    section: "6.7.2",
    difficulty: "basic",
    topic: "EIC definition"
  },
  {
    id: "M6_7_2_02",
    question: "When is an Electrical Installation Certificate required?",
    options: ["Minor alterations", "New installations and major alterations", "Repairs only", "Periodic inspections"],
    correctAnswer: 1,
    explanation: "EICs are required for new installations and major alterations to existing installations.",
    section: "6.7.2",
    difficulty: "basic",
    topic: "EIC requirements"
  },
  {
    id: "M6_7_2_03",
    question: "What must be completed before issuing an EIC?",
    options: ["Payment received", "All testing completed satisfactorily", "Client approval", "Insurance notification"],
    correctAnswer: 1,
    explanation: "All required testing must be completed satisfactorily before an EIC can be issued.",
    section: "6.7.2",
    difficulty: "basic",
    topic: "EIC prerequisites"
  },
  {
    id: "M6_7_3_01",
    question: "What is a Minor Works Certificate used for?",
    options: ["New installations", "Small additions or alterations", "Periodic inspections", "Fault investigations"],
    correctAnswer: 1,
    explanation: "Minor Works Certificates are used for small additions, alterations, or replacements.",
    section: "6.7.3",
    difficulty: "basic",
    topic: "Minor Works Certificate"
  },
  {
    id: "M6_7_3_02",
    question: "What type of work requires a Minor Works Certificate?",
    options: ["New consumer units", "Small additions like extra socket", "Complete rewires", "Periodic inspections"],
    correctAnswer: 1,
    explanation: "Minor Works Certificates cover small additions like extra sockets or light points.",
    section: "6.7.3",
    difficulty: "basic",
    topic: "Minor works scope"
  },
  {
    id: "M6_7_4_01",
    question: "Who can legally sign electrical certificates?",
    options: ["Any electrician", "Level 2 qualified persons", "Competent persons with appropriate qualifications", "Installation supervisors"],
    correctAnswer: 2,
    explanation: "Only appropriately qualified and competent persons can legally sign electrical certificates.",
    section: "6.7.4",
    difficulty: "basic",
    topic: "Certificate signing authority"
  },
  {
    id: "M6_7_4_02",
    question: "What qualifications are needed to sign electrical certificates?",
    options: ["Level 2 qualification", "Any electrical qualification", "Appropriate qualifications and competence", "Company registration only"],
    correctAnswer: 2,
    explanation: "Certificate signatories need appropriate qualifications, competence, and often scheme membership.",
    section: "6.7.4",
    difficulty: "intermediate",
    topic: "Signatory qualifications"
  },
  {
    id: "M6_7_4_03",
    question: "What responsibility does signing a certificate create?",
    options: ["None", "Legal liability for the work", "Administrative duty only", "Cost responsibility"],
    correctAnswer: 1,
    explanation: "Signing a certificate creates legal liability and responsibility for the quality and safety of work.",
    section: "6.7.4",
    difficulty: "intermediate",
    topic: "Certificate liability"
  },
  {
    id: "M6_7_BAS_01",
    question: "What information must be included on electrical certificates?",
    options: ["Names only", "Complete installation and test details", "Dates only", "Costs only"],
    correctAnswer: 1,
    explanation: "Electrical certificates must include complete installation details and all relevant test results.",
    section: "6.7.2",
    difficulty: "basic",
    topic: "Certificate content requirements"
  },
  {
    id: "M6_7_BAS_02",
    question: "How should certificates be stored?",
    options: ["Anywhere", "Safely and accessibly", "With tools", "Not stored"],
    correctAnswer: 1,
    explanation: "Certificates should be stored safely and remain accessible for future reference.",
    section: "6.7.1",
    difficulty: "basic",
    topic: "Certificate storage"
  },
  {
    id: "M6_7_BAS_03",
    question: "What should be done if errors are found on issued certificates?",
    options: ["Ignore errors", "Issue corrected certificates", "Cross out errors", "Leave as is"],
    correctAnswer: 1,
    explanation: "Errors on certificates should be corrected by issuing new, accurate certificates.",
    section: "6.7.2",
    difficulty: "basic",
    topic: "Certificate error correction"
  },
  {
    id: "M6_7_INT_01",
    question: "What is the difference between an EIC and an EICR?",
    options: ["No difference", "EIC for new work, EICR for existing installations", "Different colours", "Different costs"],
    correctAnswer: 1,
    explanation: "EICs are for new installations, EICRs (Electrical Installation Condition Reports) are for existing installations.",
    section: "6.7.2",
    difficulty: "intermediate",
    topic: "Certificate type differences"
  },
  {
    id: "M6_7_INT_02",
    question: "What happens if work is carried out without proper certification?",
    options: ["Nothing", "Legal and insurance implications", "Cost savings", "Faster completion"],
    correctAnswer: 1,
    explanation: "Work without proper certification can have serious legal and insurance implications.",
    section: "6.7.1",
    difficulty: "intermediate",
    topic: "Uncertified work consequences"
  },
  {
    id: "M6_7_BAS_04",
    question: "Who should receive copies of electrical certificates?",
    options: ["No one", "Client and relevant authorities", "Electrician only", "Insurance company only"],
    correctAnswer: 1,
    explanation: "Copies should be provided to the client and any relevant authorities as required.",
    section: "6.7.1",
    difficulty: "basic",
    topic: "Certificate distribution"
  },
  {
    id: "M6_7_BAS_05",
    question: "How long should electrical certificates be retained?",
    options: ["1 year", "Life of installation", "5 years", "Not retained"],
    correctAnswer: 1,
    explanation: "Electrical certificates should be retained for the life of the installation.",
    section: "6.7.1",
    difficulty: "basic",
    topic: "Certificate retention period"
  },
  {
    id: "M6_7_INT_03",
    question: "What role do certificates play in building regulations compliance?",
    options: ["No role", "Provide evidence of electrical compliance", "Only for planning", "Insurance only"],
    correctAnswer: 1,
    explanation: "Electrical certificates provide evidence of compliance with electrical aspects of building regulations.",
    section: "6.7.1",
    difficulty: "intermediate",
    topic: "Building regulations role"
  },
  {
    id: "M6_7_BAS_06",
    question: "What should be checked before signing a certificate?",
    options: ["Nothing", "All work and testing completed satisfactorily", "Client payment", "Time constraints"],
    correctAnswer: 1,
    explanation: "All work and testing must be completed satisfactorily and verified before signing certificates.",
    section: "6.7.4",
    difficulty: "basic",
    topic: "Pre-signing verification"
  },
  {
    id: "M6_7_INT_04",
    question: "How do scheme provider requirements affect certification?",
    options: ["No effect", "May have additional requirements", "Reduce requirements", "Optional compliance"],
    correctAnswer: 1,
    explanation: "Competent person scheme providers may have additional requirements beyond basic certification.",
    section: "6.7.4",
    difficulty: "intermediate",
    topic: "Scheme provider requirements"
  },
  {
    id: "M6_7_BAS_07",
    question: "What action should be taken if someone asks you to sign a certificate for work you didn't supervise?",
    options: ["Sign it anyway", "Refuse to sign", "Sign with conditions", "Charge extra"],
    correctAnswer: 1,
    explanation: "You should never sign certificates for work you didn't supervise or verify personally.",
    section: "6.7.4",
    difficulty: "basic",
    topic: "Certificate signing ethics"
  },
  {
    id: "M6_7_ADV_01",
    question: "What are the implications of the Construction Products Regulation on electrical certification?",
    options: ["No implications", "Affects product compliance requirements", "Only affects cost", "Simplifies certification"],
    correctAnswer: 1,
    explanation: "CPR affects compliance requirements for electrical products used in construction.",
    section: "6.7.1",
    difficulty: "advanced",
    topic: "CPR implications"
  },
  {
    id: "M6_7_INT_05",
    question: "How should digital certificates be managed compared to paper certificates?",
    options: ["Same as paper", "Need additional security measures", "Less important", "No management needed"],
    correctAnswer: 1,
    explanation: "Digital certificates require additional security measures to prevent unauthorised access or alteration.",
    section: "6.7.1",
    difficulty: "intermediate",
    topic: "Digital certificate management"
  },
  {
    id: "M6_7_BAS_08",
    question: "What should be done if a client loses their electrical certificate?",
    options: ["Nothing can be done", "Issue a duplicate copy", "Start again", "Refer to solicitor"],
    correctAnswer: 1,
    explanation: "Duplicate copies of certificates can be issued if the original is lost.",
    section: "6.7.1",
    difficulty: "basic",
    topic: "Lost certificate replacement"
  },
  {
    id: "M6_7_BAS_09",
    question: "What is the purpose of the schedule of test results?",
    options: ["Legal requirement only", "Provide detailed test data", "Cost breakdown", "Time recording"],
    correctAnswer: 1,
    explanation: "The schedule of test results provides detailed test data supporting the certificate.",
    section: "6.7.2",
    difficulty: "basic",
    topic: "Test results schedule purpose"
  },

  // Additional questions to reach exactly 250
  {
    id: "M6_ADV_01",
    question: "How does the concept of 'competent person' relate to different levels of electrical work?",
    options: ["Anyone can do any work", "Competence varies with work complexity", "Only affects certification", "No relationship"],
    correctAnswer: 1,
    explanation: "Competence requirements scale with work complexity - more complex work needs higher qualifications.",
    section: "6.1.5",
    difficulty: "advanced",
    topic: "Competence levels"
  },
  {
    id: "M6_ADV_02",
    question: "What factors determine the frequency of periodic inspection and testing?",
    options: ["Fixed 5-year intervals", "Installation type, environment, and usage", "Cost considerations only", "Client preference"],
    correctAnswer: 1,
    explanation: "Inspection frequency depends on installation type, environment, usage patterns, and deterioration risks.",
    section: "6.1.3",
    difficulty: "advanced",
    topic: "Inspection frequency factors"
  },
  {
    id: "M6_ADV_03",
    question: "How do environmental conditions affect testing procedures and acceptance criteria?",
    options: ["No effect", "May require modified procedures and criteria", "Only affects equipment choice", "Only affects timing"],
    correctAnswer: 1,
    explanation: "Harsh environments may require modified testing procedures and potentially different acceptance criteria.",
    section: "6.5.4",
    difficulty: "advanced",
    topic: "Environmental testing considerations"
  },
  {
    id: "M6_ADV_04",
    question: "What are the implications of discovering non-compliance with earlier standards during inspection?",
    options: ["Ignore if working", "Assess against current safety standards", "Automatic failure", "Client choice"],
    correctAnswer: 1,
    explanation: "Older installations should be assessed for continued safety against current standards.",
    section: "6.6.2",
    difficulty: "advanced",
    topic: "Legacy standard compliance"
  },
  {
    id: "M6_ADV_05",
    question: "How should measurement uncertainty be considered in test result evaluation?",
    options: ["Ignore uncertainty", "Apply safety margins to account for uncertainty", "Use exact values only", "Estimate roughly"],
    correctAnswer: 1,
    explanation: "Measurement uncertainty should be considered when evaluating results near acceptance limits.",
    section: "6.6.2",
    difficulty: "advanced",
    topic: "Measurement uncertainty"
  }
];

// Function to get a random sample of questions from the bank
export const getRandomQuestions = (count: number = 30, difficultyDistribution: { basic: number; intermediate: number; advanced: number } = { basic: 0.6, intermediate: 0.3, advanced: 0.1 }): Question[] => {
  const basicCount = Math.floor(count * difficultyDistribution.basic);
  const intermediateCount = Math.floor(count * difficultyDistribution.intermediate);
  const advancedCount = count - basicCount - intermediateCount;
  
  const basicQuestions = module6QuestionBank.filter(q => q.difficulty === 'basic');
  const intermediateQuestions = module6QuestionBank.filter(q => q.difficulty === 'intermediate');
  const advancedQuestions = module6QuestionBank.filter(q => q.difficulty === 'advanced');
  
  const selectedQuestions: Question[] = [];
  
  // Helper function to get random unique questions without mutating original arrays
  const getRandomUniqueQuestions = (questions: Question[], count: number): Question[] => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, questions.length));
  };
  
  // Select questions from each difficulty level
  selectedQuestions.push(...getRandomUniqueQuestions(basicQuestions, basicCount));
  selectedQuestions.push(...getRandomUniqueQuestions(intermediateQuestions, intermediateCount));
  selectedQuestions.push(...getRandomUniqueQuestions(advancedQuestions, advancedCount));
  
  // Final shuffle and ensure we have exactly the requested count
  const shuffled = selectedQuestions.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// Function to validate the question bank
export const validateQuestionBank = (): void => {
  const totalQuestions = module6QuestionBank.length;
  const sections = module6QuestionBank.reduce((acc, question) => {
    acc[question.section] = (acc[question.section] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const difficulties = module6QuestionBank.reduce((acc, question) => {
    acc[question.difficulty] = (acc[question.difficulty] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  console.log(`Total questions: ${totalQuestions}`);
  console.log('Questions by section:', sections);
  console.log('Questions by difficulty:', difficulties);
};