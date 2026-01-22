/**
 * PAT Testing Mock Exam Question Bank
 *
 * 120 questions covering all modules with difficulty distribution
 * and category classification for balanced exam generation.
 */

import { StandardMockQuestion, MockExamConfig } from '@/types/standardMockExam';
import { getRandomQuestionsBalanced } from '@/utils/questionSelection';

// Categories for PAT Testing
export const patTestingCategories = [
  'Regulations',
  'Equipment Classification',
  'Visual Inspection',
  'Testing Procedures',
  'Documentation'
];

// Exam configuration
export const patTestingMockExamConfig: MockExamConfig = {
  examId: 'pat-testing',
  examTitle: 'PAT Testing Mock Examination',
  totalQuestions: 25,
  timeLimit: 2700, // 45 minutes
  passThreshold: 60,
  exitPath: '/electrician/upskilling/pat-testing-course',
  categories: patTestingCategories
};

// PAT Testing Mock Exam Question Bank - 120 Questions covering Modules 1-5
export const patTestingQuestionBank: StandardMockQuestion[] = [
  // Module 1: Introduction to PAT Testing (24 questions)
  {
    id: 1,
    question: "What does PAT stand for?",
    options: ["Portable Appliance Testing", "Personal Appliance Testing", "Portable Application Testing", "Personal Application Testing"],
    correctAnswer: 0,
    explanation: "PAT stands for Portable Appliance Testing, which involves checking electrical appliances for safety.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Terminology",
    category: "Regulations"
  },
  {
    id: 2,
    question: "Which regulation requires employers to maintain electrical equipment in a safe condition?",
    options: ["EAWR 1989", "PUWER 1998", "Health and Safety at Work Act 1974", "All of the above"],
    correctAnswer: 3,
    explanation: "All three regulations require employers to maintain electrical equipment safely. EAWR specifically addresses electrical safety, PUWER covers work equipment, and HSW Act provides the overarching framework.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Legislation",
    category: "Regulations"
  },
  {
    id: 3,
    question: "Under EAWR 1989, who is considered the 'duty holder'?",
    options: ["The electrician", "The employer", "The equipment user", "The building owner"],
    correctAnswer: 1,
    explanation: "Under EAWR 1989, the employer is the duty holder responsible for ensuring electrical safety in the workplace.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Legislation",
    category: "Regulations"
  },
  {
    id: 4,
    question: "What is the primary purpose of PAT testing?",
    options: ["To reduce energy costs", "To prevent electric shock and fire", "To improve equipment efficiency", "To meet insurance requirements"],
    correctAnswer: 1,
    explanation: "The primary purpose of PAT testing is to prevent electric shock and fire by ensuring electrical appliances are safe to use.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Purpose",
    category: "Regulations"
  },
  {
    id: 5,
    question: "Which appliances typically require PAT testing?",
    options: ["Only portable appliances", "Portable and moveable appliances", "All electrical equipment", "Only appliances with plugs"],
    correctAnswer: 1,
    explanation: "PAT testing applies to portable and moveable appliances, including handheld equipment, moveable equipment, and stationary equipment with flexible cables.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Scope",
    category: "Regulations"
  },
  {
    id: 6,
    question: "How often should high-risk portable appliances be tested?",
    options: ["Monthly", "Every 3 months", "Every 6 months", "Annually"],
    correctAnswer: 1,
    explanation: "High-risk portable appliances should typically be tested every 3 months, though this can vary based on risk assessment.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Frequency",
    category: "Regulations"
  },
  {
    id: 7,
    question: "What is a competent person in the context of PAT testing?",
    options: ["Anyone with basic training", "A qualified electrician only", "Someone with knowledge, training and experience", "A building manager"],
    correctAnswer: 2,
    explanation: "A competent person has sufficient knowledge, training, and experience to carry out PAT testing safely and effectively.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Competence",
    category: "Regulations"
  },
  {
    id: 8,
    question: "Which document provides guidance on PAT testing frequencies?",
    options: ["BS 7671", "IET Code of Practice", "EAWR 1989", "PUWER 1998"],
    correctAnswer: 1,
    explanation: "The IET Code of Practice for In-service Inspection and Testing of Electrical Equipment provides detailed guidance on PAT testing frequencies.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Standards",
    category: "Regulations"
  },
  {
    id: 9,
    question: "What should be done if an appliance fails PAT testing?",
    options: ["Use it carefully", "Remove from service immediately", "Test it again", "Reduce the testing frequency"],
    correctAnswer: 1,
    explanation: "Any appliance that fails PAT testing must be removed from service immediately to prevent potential harm.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Procedures",
    category: "Regulations"
  },
  {
    id: 10,
    question: "Who can carry out PAT testing?",
    options: ["Only qualified electricians", "Any employee", "Competent persons only", "Building maintenance staff"],
    correctAnswer: 2,
    explanation: "PAT testing can be carried out by competent persons who have appropriate knowledge, training, and experience.",
    section: "Module 1",
    difficulty: "basic",
    topic: "Competence",
    category: "Regulations"
  },
  {
    id: 11,
    question: "What is the legal requirement for PAT testing frequency?",
    options: ["Annual testing required", "Monthly testing required", "Based on risk assessment", "No legal requirement"],
    correctAnswer: 2,
    explanation: "There is no fixed legal requirement for PAT testing frequency - it should be based on risk assessment considering equipment type, environment, and usage.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "Legislation",
    category: "Regulations"
  },
  {
    id: 12,
    question: "What type of environment would require more frequent PAT testing?",
    options: ["Office environment", "Harsh industrial environment", "Retail environment", "Educational environment"],
    correctAnswer: 1,
    explanation: "Harsh industrial environments with exposure to moisture, dust, or mechanical damage require more frequent PAT testing.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Risk Assessment",
    category: "Regulations"
  },
  {
    id: 13,
    question: "What should be included in PAT testing records?",
    options: ["Test results only", "Equipment details and test results", "Equipment details, test results and next test date", "All of the above plus tester details"],
    correctAnswer: 3,
    explanation: "PAT testing records should include equipment details, test results, next test date, and details of the person who carried out the test.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Documentation",
    category: "Regulations"
  },
  {
    id: 14,
    question: "Which act requires employers to assess risks to employees' health and safety?",
    options: ["EAWR 1989", "Management of Health and Safety at Work Regulations 1999", "PUWER 1998", "Workplace Regulations 1992"],
    correctAnswer: 1,
    explanation: "The Management of Health and Safety at Work Regulations 1999 require employers to assess risks to employees' health and safety.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Legislation",
    category: "Regulations"
  },
  {
    id: 15,
    question: "What is the consequence of not complying with EAWR 1989?",
    options: ["Warning letter", "Fine only", "Prosecution and imprisonment", "Equipment confiscation"],
    correctAnswer: 2,
    explanation: "Non-compliance with EAWR 1989 can result in prosecution and imprisonment as it's criminal legislation.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "Legislation",
    category: "Regulations"
  },
  {
    id: 16,
    question: "What should be considered when determining PAT testing frequency?",
    options: ["Equipment age only", "Usage frequency only", "Environment only", "All factors combined"],
    correctAnswer: 3,
    explanation: "PAT testing frequency should consider equipment type, age, usage frequency, environment, and previous test results.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Risk Assessment",
    category: "Regulations"
  },
  {
    id: 17,
    question: "Which regulation specifically covers work equipment safety?",
    options: ["EAWR 1989", "PUWER 1998", "HSW Act 1974", "CDM Regulations"],
    correctAnswer: 1,
    explanation: "PUWER 1998 (Provision and Use of Work Equipment Regulations) specifically covers the safety of work equipment.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Legislation",
    category: "Regulations"
  },
  {
    id: 18,
    question: "What is the maximum penalty for breaching EAWR 1989?",
    options: ["£5,000 fine", "£20,000 fine", "Unlimited fine and imprisonment", "£50,000 fine"],
    correctAnswer: 2,
    explanation: "EAWR 1989 breaches can result in unlimited fines and imprisonment as they are considered serious safety offences.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "Legislation",
    category: "Regulations"
  },
  {
    id: 19,
    question: "Who has the authority to enforce EAWR 1989?",
    options: ["Local councils", "HSE inspectors", "Fire service", "Police"],
    correctAnswer: 1,
    explanation: "Health and Safety Executive (HSE) inspectors have the authority to enforce EAWR 1989.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Enforcement",
    category: "Regulations"
  },
  {
    id: 20,
    question: "What is the definition of 'electrical equipment' under EAWR 1989?",
    options: ["Portable appliances only", "Fixed installations only", "Anything using electrical energy", "Plugged appliances only"],
    correctAnswer: 2,
    explanation: "Under EAWR 1989, electrical equipment includes anything that uses, generates, or distributes electrical energy.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Definitions",
    category: "Regulations"
  },
  {
    id: 21,
    question: "When should a risk assessment for electrical equipment be reviewed?",
    options: ["Annually", "When circumstances change", "Every 5 years", "Only when accidents occur"],
    correctAnswer: 1,
    explanation: "Risk assessments should be reviewed when circumstances change, such as new equipment, different environment, or after incidents.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Risk Assessment",
    category: "Regulations"
  },
  {
    id: 22,
    question: "What is the employer's duty regarding employee training for electrical safety?",
    options: ["No specific duty", "Basic awareness only", "Appropriate training and information", "Annual certification required"],
    correctAnswer: 2,
    explanation: "Employers must provide appropriate training and information to ensure employees can work safely with electrical equipment.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Training",
    category: "Regulations"
  },
  {
    id: 23,
    question: "What should be done with equipment that cannot be PAT tested?",
    options: ["Use it anyway", "Visual inspection only", "Remove from service", "Test annually instead"],
    correctAnswer: 1,
    explanation: "Equipment that cannot be PAT tested should undergo thorough visual inspection and may require alternative testing methods.",
    section: "Module 1",
    difficulty: "advanced",
    topic: "Procedures",
    category: "Regulations"
  },
  {
    id: 24,
    question: "How long should PAT testing records be retained?",
    options: ["1 year", "3 years", "5 years", "Until next test"],
    correctAnswer: 2,
    explanation: "PAT testing records should be retained for at least 5 years to demonstrate compliance and track equipment history.",
    section: "Module 1",
    difficulty: "intermediate",
    topic: "Documentation",
    category: "Regulations"
  },

  // Module 2: Equipment Classification (24 questions)
  {
    id: 25,
    question: "What protection method does a Class I appliance rely on?",
    options: ["Basic insulation only", "Double insulation", "Basic insulation plus earth connection", "Extra-low voltage"],
    correctAnswer: 2,
    explanation: "Class I appliances rely on basic insulation plus protective earth connection for safety.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Class I",
    category: "Equipment Classification"
  },
  {
    id: 26,
    question: "How can you identify a Class I appliance?",
    options: ["Single insulation symbol", "Double insulation symbol", "Earth symbol or 3-core cable", "Battery powered"],
    correctAnswer: 2,
    explanation: "Class I appliances can be identified by the earth symbol or presence of a 3-core cable with earth conductor.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Class I",
    category: "Equipment Classification"
  },
  {
    id: 27,
    question: "What is the symbol for a Class II appliance?",
    options: ["Single square", "Double square", "Triangle", "Circle"],
    correctAnswer: 1,
    explanation: "Class II appliances are marked with the double square symbol indicating double or reinforced insulation.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Class II",
    category: "Equipment Classification"
  },
  {
    id: 28,
    question: "Which class of appliance does not require earth connection?",
    options: ["Class I", "Class II", "Class III", "Both Class II and III"],
    correctAnswer: 3,
    explanation: "Both Class II (double insulated) and Class III (extra-low voltage) appliances do not require earth connection.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Classification",
    category: "Equipment Classification"
  },
  {
    id: 29,
    question: "What voltage defines Class III appliances?",
    options: ["Up to 12V", "Up to 24V", "Up to 50V", "Up to 110V"],
    correctAnswer: 2,
    explanation: "Class III appliances operate at extra-low voltage, typically not exceeding 50V AC.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Class III",
    category: "Equipment Classification"
  },
  {
    id: 30,
    question: "What type of cable would a Class II appliance typically have?",
    options: ["3-core cable", "2-core cable", "Single core cable", "Armoured cable"],
    correctAnswer: 1,
    explanation: "Class II appliances typically have 2-core cables as they don't require earth connection.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Class II",
    category: "Equipment Classification"
  },
  {
    id: 31,
    question: "Which appliances are typically Class I?",
    options: ["Hair dryers", "Desktop computers", "Mobile phone chargers", "Battery tools"],
    correctAnswer: 1,
    explanation: "Desktop computers are typically Class I appliances requiring earth connection for safety.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Class I",
    category: "Equipment Classification"
  },
  {
    id: 32,
    question: "What additional safety feature do Class II appliances have?",
    options: ["Larger plug", "Double or reinforced insulation", "Lower voltage", "Automatic shut-off"],
    correctAnswer: 1,
    explanation: "Class II appliances have double or reinforced insulation providing equivalent safety to earthing.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Class II",
    category: "Equipment Classification"
  },
  {
    id: 33,
    question: "Can a Class I appliance be converted to Class II?",
    options: ["Yes, easily", "Yes, with modifications", "No, never", "Only by manufacturer"],
    correctAnswer: 2,
    explanation: "Class I appliances should never be converted to Class II as this would compromise their safety design.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Classification",
    category: "Equipment Classification"
  },
  {
    id: 34,
    question: "What tests are required for Class I appliances?",
    options: ["Visual inspection only", "Earth continuity and insulation resistance", "Insulation resistance only", "Polarity only"],
    correctAnswer: 1,
    explanation: "Class I appliances require earth continuity testing and insulation resistance testing at minimum.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Testing Requirements",
    category: "Equipment Classification"
  },
  {
    id: 35,
    question: "What tests are required for Class II appliances?",
    options: ["Earth continuity only", "Insulation resistance only", "Visual inspection and insulation resistance", "All tests"],
    correctAnswer: 2,
    explanation: "Class II appliances require visual inspection and insulation resistance testing (no earth continuity as they're not earthed).",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Testing Requirements",
    category: "Equipment Classification"
  },
  {
    id: 36,
    question: "Which symbol indicates an appliance is suitable for outdoor use?",
    options: ["IP44", "Raindrops symbol", "Weatherproof symbol", "All of the above"],
    correctAnswer: 3,
    explanation: "All these symbols can indicate weather resistance, with IP ratings and symbols showing suitability for outdoor use.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "IP Rating",
    category: "Equipment Classification"
  },
  {
    id: 37,
    question: "What does 'double insulation' mean?",
    options: ["Two layers of the same insulation", "Basic plus supplementary insulation", "Thick insulation", "Reinforced cable"],
    correctAnswer: 1,
    explanation: "Double insulation means basic insulation plus supplementary insulation, providing two independent barriers.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Insulation",
    category: "Equipment Classification"
  },
  {
    id: 38,
    question: "Can Class II equipment have metal cases?",
    options: ["No, never", "Yes, if properly insulated", "Only if painted", "Only plastic allowed"],
    correctAnswer: 1,
    explanation: "Class II equipment can have metal cases if they are properly insulated and meet double insulation requirements.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "Class II",
    category: "Equipment Classification"
  },
  {
    id: 39,
    question: "What is 'reinforced insulation'?",
    options: ["Two separate insulation layers", "Single insulation providing equivalent protection to double", "Extra thick insulation", "Insulation plus earth"],
    correctAnswer: 1,
    explanation: "Reinforced insulation is a single insulation system providing equivalent protection to double insulation.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Insulation",
    category: "Equipment Classification"
  },
  {
    id: 40,
    question: "How should damaged Class II equipment be treated?",
    options: ["Repair carefully", "Convert to Class I", "Remove from service", "Use with caution"],
    correctAnswer: 2,
    explanation: "Damaged Class II equipment must be removed from service as the double insulation integrity may be compromised.",
    section: "Module 2",
    difficulty: "basic",
    topic: "Class II",
    category: "Equipment Classification"
  },
  {
    id: 41,
    question: "What voltage range defines extra-low voltage (ELV)?",
    options: ["0-12V AC", "0-24V AC", "0-50V AC", "0-110V AC"],
    correctAnswer: 2,
    explanation: "Extra-low voltage is defined as not exceeding 50V AC or 120V ripple-free DC between conductors or to earth.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "Voltage",
    category: "Equipment Classification"
  },
  {
    id: 42,
    question: "Which class of equipment is considered safest?",
    options: ["Class I", "Class II", "Class III", "All equally safe"],
    correctAnswer: 2,
    explanation: "Class III equipment is considered safest as it operates at extra-low voltage, minimising shock risk.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Classification",
    category: "Equipment Classification"
  },
  {
    id: 43,
    question: "What type of supply do Class III appliances typically use?",
    options: ["Direct mains connection", "Isolation transformer", "Step-down transformer", "Battery supply"],
    correctAnswer: 2,
    explanation: "Class III appliances typically use supplies from isolation transformers or other safe sources providing extra-low voltage.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Class III",
    category: "Equipment Classification"
  },
  {
    id: 44,
    question: "Can you identify appliance class from the plug type?",
    options: ["Always", "Usually", "Sometimes", "Never"],
    correctAnswer: 2,
    explanation: "You can sometimes identify appliance class from the plug - 2-pin plugs often indicate Class II, but symbols and markings are more reliable.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Identification",
    category: "Equipment Classification"
  },
  {
    id: 45,
    question: "What marking indicates a Class 0 appliance?",
    options: ["No specific marking", "Zero symbol", "Basic insulation symbol", "Earth symbol"],
    correctAnswer: 0,
    explanation: "Class 0 appliances have no specific marking and rely only on basic insulation - they are not recommended for use.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "Class 0",
    category: "Equipment Classification"
  },
  {
    id: 46,
    question: "Which equipment typically requires functional earth connection?",
    options: ["IT equipment", "Kitchen appliances", "Hand tools", "Lighting"],
    correctAnswer: 0,
    explanation: "IT equipment often requires functional earth connections for proper operation and electromagnetic compatibility.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "Functional Earth",
    category: "Equipment Classification"
  },
  {
    id: 47,
    question: "What is the difference between protective and functional earth?",
    options: ["No difference", "Protective for safety, functional for operation", "Protective is optional", "Functional is stronger"],
    correctAnswer: 1,
    explanation: "Protective earth is for safety (preventing shock), while functional earth is for proper equipment operation.",
    section: "Module 2",
    difficulty: "advanced",
    topic: "Earthing",
    category: "Equipment Classification"
  },
  {
    id: 48,
    question: "How should you handle equipment with unclear classification?",
    options: ["Assume Class I", "Assume Class II", "Check markings and documentation", "Test without classification"],
    correctAnswer: 2,
    explanation: "Always check equipment markings, labels, and documentation to determine the correct classification before testing.",
    section: "Module 2",
    difficulty: "intermediate",
    topic: "Identification",
    category: "Equipment Classification"
  },

  // Module 3: Visual Inspection (24 questions)
  {
    id: 49,
    question: "What should be checked first during visual inspection?",
    options: ["The plug", "The cable", "The equipment casing", "The documentation"],
    correctAnswer: 0,
    explanation: "The plug should be checked first as it's the connection point to the supply and often shows the first signs of problems.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Inspection Order",
    category: "Visual Inspection"
  },
  {
    id: 50,
    question: "What indicates damage to a 13A plug?",
    options: ["Slight discoloration", "Cracks or burn marks", "Loose screws", "All of the above"],
    correctAnswer: 3,
    explanation: "All these signs indicate damage - discoloration shows overheating, cracks show mechanical damage, loose screws cause poor connections.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Plug Inspection",
    category: "Visual Inspection"
  },
  {
    id: 51,
    question: "What should you look for when inspecting a cable?",
    options: ["External damage only", "Damage, kinks, and repairs", "Length only", "Colour coding"],
    correctAnswer: 1,
    explanation: "Cable inspection should look for external damage, kinks, unauthorised repairs, and signs of stress or wear.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Cable Inspection",
    category: "Visual Inspection"
  },
  {
    id: 52,
    question: "What indicates potential overheating in a plug?",
    options: ["Brown discoloration", "Melted plastic", "Burn marks", "All of the above"],
    correctAnswer: 3,
    explanation: "All these signs indicate overheating which can be caused by poor connections, overloading, or component failure.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Plug Inspection",
    category: "Visual Inspection"
  },
  {
    id: 53,
    question: "Should equipment with taped cable repairs be used?",
    options: ["Yes, if tape is good", "Only temporarily", "No, never", "Only if done professionally"],
    correctAnswer: 2,
    explanation: "Equipment with taped cable repairs should not be used as tape is not an acceptable permanent repair method.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Cable Repairs",
    category: "Visual Inspection"
  },
  {
    id: 54,
    question: "What should you check on the equipment casing?",
    options: ["Cracks and damage", "Missing parts", "Security of fixings", "All of the above"],
    correctAnswer: 3,
    explanation: "Equipment casing inspection should check for cracks, damage, missing parts, and loose fixings that could affect safety.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Casing Inspection",
    category: "Visual Inspection"
  },
  {
    id: 55,
    question: "How should damaged equipment be handled?",
    options: ["Repair immediately", "Mark and continue using", "Remove from service", "Test more frequently"],
    correctAnswer: 2,
    explanation: "Damaged equipment must be removed from service immediately to prevent potential harm to users.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Failed Equipment",
    category: "Visual Inspection"
  },
  {
    id: 56,
    question: "What environmental factors affect equipment condition?",
    options: ["Temperature only", "Humidity only", "Dust and moisture", "All environmental factors"],
    correctAnswer: 3,
    explanation: "All environmental factors including temperature, humidity, dust, corrosive atmosphere, and mechanical stress affect equipment.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Environment",
    category: "Visual Inspection"
  },
  {
    id: 57,
    question: "What should you look for in the plug pins?",
    options: ["Corrosion and damage", "Correct size", "Proper connection", "All of the above"],
    correctAnswer: 3,
    explanation: "Plug pins should be checked for corrosion, damage, correct size, and proper connection to ensure safe operation.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Plug Inspection",
    category: "Visual Inspection"
  },
  {
    id: 58,
    question: "When should equipment labels be checked?",
    options: ["During formal inspection only", "During every visual check", "Annually", "When required"],
    correctAnswer: 1,
    explanation: "Equipment labels should be checked during every visual inspection to ensure safety information remains visible.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Labels",
    category: "Visual Inspection"
  },
  {
    id: 59,
    question: "What indicates a cable has been damaged internally?",
    options: ["Stiffness or soft spots", "Discoloration", "Kinks", "All of the above"],
    correctAnswer: 3,
    explanation: "All these signs can indicate internal cable damage which may not be immediately visible externally.",
    section: "Module 3",
    difficulty: "advanced",
    topic: "Cable Inspection",
    category: "Visual Inspection"
  },
  {
    id: 60,
    question: "Should equipment in harsh environments be inspected more frequently?",
    options: ["No difference needed", "Yes, more frequent inspection", "Only if problems occur", "Less frequently"],
    correctAnswer: 1,
    explanation: "Equipment in harsh environments should be inspected more frequently due to accelerated wear and increased risk.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Frequency",
    category: "Visual Inspection"
  },
  {
    id: 61,
    question: "What is the purpose of equipment rating labels?",
    options: ["Decoration", "User information and safety", "Manufacturing date", "Quality control"],
    correctAnswer: 1,
    explanation: "Rating labels provide essential user information about voltage, current, power, and safety requirements.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Labels",
    category: "Visual Inspection"
  },
  {
    id: 62,
    question: "How should extension leads be visually inspected?",
    options: ["Plug and socket only", "Cable only", "Entire length including connections", "Not necessary"],
    correctAnswer: 2,
    explanation: "Extension leads should be inspected along their entire length including all plugs, sockets, and cable sections.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Extension Leads",
    category: "Visual Inspection"
  },
  {
    id: 63,
    question: "What should you do if equipment safety markings are missing?",
    options: ["Continue using", "Replace markings", "Remove from service", "Test more thoroughly"],
    correctAnswer: 2,
    explanation: "Equipment with missing safety markings should be removed from service as essential safety information is not available.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Labels",
    category: "Visual Inspection"
  },
  {
    id: 64,
    question: "Can visual inspection alone determine equipment safety?",
    options: ["Yes, always", "No, testing also required", "Only for simple equipment", "Only for new equipment"],
    correctAnswer: 1,
    explanation: "Visual inspection alone cannot determine equipment safety - electrical testing is also required to check internal conditions.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Inspection Limits",
    category: "Visual Inspection"
  },
  {
    id: 65,
    question: "What indicates poor cable management?",
    options: ["Cables under strain", "Cables near heat sources", "Unsupported long runs", "All of the above"],
    correctAnswer: 3,
    explanation: "All these indicate poor cable management which can lead to damage and reduced equipment life.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Cable Management",
    category: "Visual Inspection"
  },
  {
    id: 66,
    question: "Should equipment be visually inspected while in use?",
    options: ["Yes, always", "No, too dangerous", "Only if switched off", "By competent persons only"],
    correctAnswer: 1,
    explanation: "Equipment should not be visually inspected while in use due to safety risks - always isolate first.",
    section: "Module 3",
    difficulty: "basic",
    topic: "Safety",
    category: "Visual Inspection"
  },
  {
    id: 67,
    question: "What should be done with equipment showing signs of moisture ingress?",
    options: ["Dry and continue use", "Test immediately", "Remove from service", "Monitor closely"],
    correctAnswer: 2,
    explanation: "Equipment showing moisture ingress must be removed from service as this significantly increases electrical hazards.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Moisture",
    category: "Visual Inspection"
  },
  {
    id: 68,
    question: "How often should visual inspections be carried out?",
    options: ["Monthly", "Before each use", "Based on risk assessment", "Annually"],
    correctAnswer: 2,
    explanation: "Visual inspection frequency should be based on risk assessment considering equipment type, environment, and usage.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Frequency",
    category: "Visual Inspection"
  },
  {
    id: 69,
    question: "What training is required for visual inspection?",
    options: ["None required", "Basic awareness", "Competent person training", "Electrical qualification"],
    correctAnswer: 2,
    explanation: "Visual inspection requires competent person training to recognise potential hazards and safety issues.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Training",
    category: "Visual Inspection"
  },
  {
    id: 70,
    question: "Should personal items brought to work be visually inspected?",
    options: ["No, personal responsibility", "Yes, if used at work", "Only expensive items", "Only if requested"],
    correctAnswer: 1,
    explanation: "Personal electrical items used at work should be visually inspected to ensure workplace safety.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Scope",
    category: "Visual Inspection"
  },
  {
    id: 71,
    question: "What should be checked on socket outlets during inspection?",
    options: ["Physical damage only", "Damage, looseness, and burning", "Colour only", "Nothing required"],
    correctAnswer: 1,
    explanation: "Socket outlets should be checked for physical damage, loose connections, and signs of overheating or burning.",
    section: "Module 3",
    difficulty: "intermediate",
    topic: "Socket Inspection",
    category: "Visual Inspection"
  },
  {
    id: 72,
    question: "Can equipment pass visual inspection but fail electrical testing?",
    options: ["No, impossible", "Yes, internal faults exist", "Only rarely", "Only for old equipment"],
    correctAnswer: 1,
    explanation: "Equipment can pass visual inspection but fail electrical testing due to internal faults not visible externally.",
    section: "Module 3",
    difficulty: "advanced",
    topic: "Inspection Limits",
    category: "Visual Inspection"
  },

  // Module 4: Testing Procedures (24 questions)
  {
    id: 73,
    question: "What is the maximum acceptable earth continuity resistance for a Class I appliance?",
    options: ["0.1 ohms", "0.5 ohms", "1.0 ohms", "2.0 ohms"],
    correctAnswer: 0,
    explanation: "The maximum acceptable earth continuity resistance for portable appliances is 0.1 ohms to ensure effective earth connection.",
    section: "Module 4",
    difficulty: "advanced",
    topic: "Earth Continuity",
    category: "Testing Procedures"
  },
  {
    id: 74,
    question: "At what voltage should insulation resistance testing be performed?",
    options: ["250V DC", "500V DC", "1000V DC", "Depends on appliance rating"],
    correctAnswer: 1,
    explanation: "Insulation resistance testing for portable appliances should be performed at 500V DC.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "Insulation Resistance",
    category: "Testing Procedures"
  },
  {
    id: 75,
    question: "What is the minimum acceptable insulation resistance for Class I appliances?",
    options: ["0.5 MΩ", "1.0 MΩ", "2.0 MΩ", "5.0 MΩ"],
    correctAnswer: 1,
    explanation: "The minimum acceptable insulation resistance for Class I appliances is 1.0 MΩ (megohm).",
    section: "Module 4",
    difficulty: "advanced",
    topic: "Insulation Resistance",
    category: "Testing Procedures"
  },
  {
    id: 76,
    question: "What is the minimum acceptable insulation resistance for Class II appliances?",
    options: ["1.0 MΩ", "2.0 MΩ", "5.0 MΩ", "10.0 MΩ"],
    correctAnswer: 1,
    explanation: "Class II appliances require higher insulation resistance of 2.0 MΩ minimum due to their reliance on insulation for safety.",
    section: "Module 4",
    difficulty: "advanced",
    topic: "Insulation Resistance",
    category: "Testing Procedures"
  },
  {
    id: 77,
    question: "What test current should be used for earth continuity testing?",
    options: ["1.5 times rated current", "10A minimum", "200mA minimum", "25A maximum"],
    correctAnswer: 2,
    explanation: "Earth continuity testing should use a minimum test current of 200mA to ensure the earth path can carry fault currents.",
    section: "Module 4",
    difficulty: "advanced",
    topic: "Earth Continuity",
    category: "Testing Procedures"
  },
  {
    id: 78,
    question: "What should be disconnected before insulation resistance testing?",
    options: ["Nothing", "Switches only", "All electronic components", "Earth connection only"],
    correctAnswer: 2,
    explanation: "All electronic components should be disconnected or isolated before insulation resistance testing to prevent damage.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "Test Preparation",
    category: "Testing Procedures"
  },
  {
    id: 79,
    question: "How should earth continuity be measured?",
    options: ["Line to earth", "Neutral to earth", "Plug earth pin to appliance earth", "All methods"],
    correctAnswer: 2,
    explanation: "Earth continuity should be measured from the plug earth pin to accessible earthed parts of the appliance.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "Earth Continuity",
    category: "Testing Procedures"
  },
  {
    id: 80,
    question: "What indicates a failed insulation resistance test?",
    options: ["Reading below minimum value", "Unstable readings", "No reading possible", "All of the above"],
    correctAnswer: 3,
    explanation: "Failed insulation tests are indicated by readings below minimum values, unstable readings, or inability to obtain readings.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "Test Results",
    category: "Testing Procedures"
  },
  {
    id: 81,
    question: "Should heating elements be tested hot or cold?",
    options: ["Always hot", "Always cold", "Temperature doesn't matter", "Depends on element type"],
    correctAnswer: 1,
    explanation: "Heating elements should be tested cold as their resistance changes significantly with temperature.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "Test Conditions",
    category: "Testing Procedures"
  },
  {
    id: 82,
    question: "What is polarity testing used to check?",
    options: ["Correct wiring", "Earth connection", "Insulation quality", "Current consumption"],
    correctAnswer: 0,
    explanation: "Polarity testing checks that line and neutral connections are wired correctly in the appliance.",
    section: "Module 4",
    difficulty: "basic",
    topic: "Polarity",
    category: "Testing Procedures"
  },
  {
    id: 83,
    question: "When is substitute leakage testing required?",
    options: ["For all appliances", "When insulation resistance is low", "For IT equipment", "Never required"],
    correctAnswer: 1,
    explanation: "Substitute leakage testing may be required when insulation resistance is low but above the minimum acceptable value.",
    section: "Module 4",
    difficulty: "advanced",
    topic: "Leakage Testing",
    category: "Testing Procedures"
  },
  {
    id: 84,
    question: "What safety precaution must be taken during testing?",
    options: ["Wear gloves", "Ensure equipment is isolated", "Use safety barriers", "All of the above"],
    correctAnswer: 3,
    explanation: "All safety precautions including gloves, isolation, and barriers should be used during PAT testing as appropriate.",
    section: "Module 4",
    difficulty: "basic",
    topic: "Safety",
    category: "Testing Procedures"
  },
  {
    id: 85,
    question: "Can you test equipment while it's connected to the supply?",
    options: ["Yes, always safe", "Only with low voltage", "No, must be isolated", "Only for certain tests"],
    correctAnswer: 3,
    explanation: "Some tests can be performed with equipment connected (like operation checks), but most require isolation for safety.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "Test Procedures",
    category: "Testing Procedures"
  },
  {
    id: 86,
    question: "What indicates earth continuity test failure?",
    options: ["Resistance above 0.1Ω", "No continuity", "Fluctuating readings", "All of the above"],
    correctAnswer: 3,
    explanation: "Earth continuity failure is indicated by resistance above 0.1Ω, no continuity, or unstable readings.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "Test Results",
    category: "Testing Procedures"
  },
  {
    id: 87,
    question: "How should test leads be maintained?",
    options: ["Clean regularly", "Check for damage", "Calibrate annually", "All of the above"],
    correctAnswer: 3,
    explanation: "Test leads require regular cleaning, damage inspection, and calibration to ensure accurate test results.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "Equipment Maintenance",
    category: "Testing Procedures"
  },
  {
    id: 88,
    question: "What is the purpose of functional testing?",
    options: ["Check electrical safety", "Verify operation", "Measure power consumption", "Test insulation"],
    correctAnswer: 1,
    explanation: "Functional testing verifies that the appliance operates correctly and safely as intended.",
    section: "Module 4",
    difficulty: "basic",
    topic: "Functional Testing",
    category: "Testing Procedures"
  },
  {
    id: 89,
    question: "Should appliances be tested in their normal operating position?",
    options: ["Position doesn't matter", "Yes, normal position preferred", "Always upside down", "Horizontal only"],
    correctAnswer: 1,
    explanation: "Appliances should preferably be tested in their normal operating position for most accurate results.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "Test Conditions",
    category: "Testing Procedures"
  },
  {
    id: 90,
    question: "What information should be recorded for each test?",
    options: ["Test results only", "Results and date", "Results, date, and equipment details", "All test parameters"],
    correctAnswer: 3,
    explanation: "All relevant test parameters including results, date, equipment details, and test conditions should be recorded.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "Documentation",
    category: "Testing Procedures"
  },
  {
    id: 91,
    question: "How often should PAT testing equipment be calibrated?",
    options: ["Monthly", "Annually", "Every 2 years", "When it fails"],
    correctAnswer: 1,
    explanation: "PAT testing equipment should typically be calibrated annually to ensure accuracy and reliability.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "Calibration",
    category: "Testing Procedures"
  },
  {
    id: 92,
    question: "What should be done if test equipment fails calibration?",
    options: ["Continue using", "Adjust readings", "Remove from service", "Use for basic tests only"],
    correctAnswer: 2,
    explanation: "Test equipment that fails calibration must be removed from service until properly calibrated or repaired.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "Calibration",
    category: "Testing Procedures"
  },
  {
    id: 93,
    question: "Can environmental conditions affect test results?",
    options: ["No effect", "Temperature only", "Humidity only", "Temperature and humidity both"],
    correctAnswer: 3,
    explanation: "Both temperature and humidity can affect test results, particularly insulation resistance measurements.",
    section: "Module 4",
    difficulty: "advanced",
    topic: "Test Conditions",
    category: "Testing Procedures"
  },
  {
    id: 94,
    question: "What is the maximum touch current for Class I appliances?",
    options: ["0.25mA", "0.5mA", "0.75mA", "1.0mA"],
    correctAnswer: 2,
    explanation: "The maximum acceptable touch current for Class I appliances is typically 0.75mA.",
    section: "Module 4",
    difficulty: "advanced",
    topic: "Leakage Testing",
    category: "Testing Procedures"
  },
  {
    id: 95,
    question: "How should failed equipment be marked?",
    options: ["Red sticker", "Fail label", "Remove from service tag", "Any clear marking"],
    correctAnswer: 3,
    explanation: "Failed equipment should be clearly marked with any appropriate method that prevents further use.",
    section: "Module 4",
    difficulty: "basic",
    topic: "Failed Equipment",
    category: "Testing Procedures"
  },
  {
    id: 96,
    question: "Should extension leads be tested as one unit?",
    options: ["Test plug only", "Test socket only", "Test complete assembly", "Not necessary to test"],
    correctAnswer: 2,
    explanation: "Extension leads should be tested as complete assemblies including plug, cable, and socket connections.",
    section: "Module 4",
    difficulty: "intermediate",
    topic: "Extension Leads",
    category: "Testing Procedures"
  },

  // Module 5: Documentation & Compliance (24 questions)
  {
    id: 97,
    question: "What information must be included on a PAT test label?",
    options: ["Test date only", "Next test date only", "Test date and next test date", "Test date, next test date, and tester ID"],
    correctAnswer: 3,
    explanation: "PAT test labels should include test date, next test date, and identification of the person who carried out the test.",
    section: "Module 5",
    difficulty: "basic",
    topic: "Labels",
    category: "Documentation"
  },
  {
    id: 98,
    question: "How long must PAT test records be retained?",
    options: ["1 year", "3 years", "5 years", "10 years"],
    correctAnswer: 2,
    explanation: "PAT test records should be retained for at least 5 years to demonstrate compliance and track equipment history.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "Record Keeping",
    category: "Documentation"
  },
  {
    id: 99,
    question: "What should be included in equipment registers?",
    options: ["Equipment list only", "Equipment details and location", "Equipment details, location, and test history", "All maintenance records"],
    correctAnswer: 2,
    explanation: "Equipment registers should include equipment details, location, and comprehensive test history.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "Equipment Register",
    category: "Documentation"
  },
  {
    id: 100,
    question: "Who should sign off PAT test certificates?",
    options: ["Anyone", "The tester", "Competent person", "Building manager"],
    correctAnswer: 2,
    explanation: "PAT test certificates should be signed by a competent person responsible for the testing programme.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "Certification",
    category: "Documentation"
  },
  {
    id: 101,
    question: "What colour typically indicates a passed PAT test?",
    options: ["Red", "Green", "Yellow", "Blue"],
    correctAnswer: 1,
    explanation: "Green labels or stickers typically indicate equipment has passed PAT testing.",
    section: "Module 5",
    difficulty: "basic",
    topic: "Labels",
    category: "Documentation"
  },
  {
    id: 102,
    question: "What should be done with test records when equipment is disposed of?",
    options: ["Destroy immediately", "Archive for 5 years", "Keep permanently", "Transfer to new owner"],
    correctAnswer: 1,
    explanation: "Test records should be archived for the required retention period even after equipment disposal.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "Record Keeping",
    category: "Documentation"
  },
  {
    id: 103,
    question: "Can PAT test labels be handwritten?",
    options: ["No, must be printed", "Yes, if legible", "Only in emergencies", "Only by competent persons"],
    correctAnswer: 1,
    explanation: "PAT test labels can be handwritten provided they are clear, legible, and contain all required information.",
    section: "Module 5",
    difficulty: "basic",
    topic: "Labels",
    category: "Documentation"
  },
  {
    id: 104,
    question: "What should be recorded if an appliance fails testing?",
    options: ["Failure reason", "Action taken", "Disposal method", "All of the above"],
    correctAnswer: 3,
    explanation: "Failed appliance records should include failure reason, action taken, and disposal or repair details.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "Failed Equipment",
    category: "Documentation"
  },
  {
    id: 105,
    question: "How should equipment be uniquely identified?",
    options: ["Serial number only", "Asset number", "Location only", "Any consistent method"],
    correctAnswer: 3,
    explanation: "Equipment should be uniquely identified using any consistent method such as asset numbers, serial numbers, or barcodes.",
    section: "Module 5",
    difficulty: "basic",
    topic: "Asset Management",
    category: "Documentation"
  },
  {
    id: 106,
    question: "What documentation is required for a formal PAT testing programme?",
    options: ["Test records only", "Policy and procedures", "Risk assessment", "All of the above"],
    correctAnswer: 3,
    explanation: "A formal PAT testing programme requires policy, procedures, risk assessment, and comprehensive test records.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "Programme Management",
    category: "Documentation"
  },
  {
    id: 107,
    question: "Should test results be available to equipment users?",
    options: ["No, confidential", "Yes, on request", "Only summary information", "Management only"],
    correctAnswer: 1,
    explanation: "Test results should be available to equipment users on request as part of health and safety information.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "Access",
    category: "Documentation"
  },
  {
    id: 108,
    question: "What should be done if PAT test labels become illegible?",
    options: ["Ignore if recently tested", "Apply new label", "Test equipment again", "Remove from service"],
    correctAnswer: 1,
    explanation: "If PAT test labels become illegible, new labels should be applied with current test information.",
    section: "Module 5",
    difficulty: "basic",
    topic: "Labels",
    category: "Documentation"
  },
  {
    id: 109,
    question: "Can digital records replace paper records?",
    options: ["No, paper required", "Yes, if properly managed", "Only as backup", "Not recommended"],
    correctAnswer: 1,
    explanation: "Digital records can replace paper records if properly managed, backed up, and accessible as required.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "Digital Records",
    category: "Documentation"
  },
  {
    id: 110,
    question: "What information should be included in incident reports?",
    options: ["Basic details only", "Full investigation", "Equipment details and actions", "All relevant information"],
    correctAnswer: 3,
    explanation: "Incident reports should include all relevant information about equipment, circumstances, actions taken, and follow-up.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "Incident Reporting",
    category: "Documentation"
  },
  {
    id: 111,
    question: "How should equipment databases be maintained?",
    options: ["Update annually", "Update after each test", "Update when convenient", "No updates needed"],
    correctAnswer: 1,
    explanation: "Equipment databases should be updated after each test to maintain current and accurate records.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "Database Management",
    category: "Documentation"
  },
  {
    id: 112,
    question: "What audit trail should be maintained?",
    options: ["Test results only", "Changes to records", "All system activity", "Major changes only"],
    correctAnswer: 2,
    explanation: "An audit trail of changes to records should be maintained to demonstrate integrity and traceability.",
    section: "Module 5",
    difficulty: "advanced",
    topic: "Audit Trail",
    category: "Documentation"
  },
  {
    id: 113,
    question: "Should PAT testing certificates include test instrument details?",
    options: ["Not necessary", "Yes, including calibration date", "Serial number only", "Model only"],
    correctAnswer: 1,
    explanation: "PAT testing certificates should include test instrument details including calibration date for traceability.",
    section: "Module 5",
    difficulty: "advanced",
    topic: "Certification",
    category: "Documentation"
  },
  {
    id: 114,
    question: "What should be done with equipment brought from other sites?",
    options: ["Accept previous tests", "Visual inspection only", "Full PAT testing", "Depends on age"],
    correctAnswer: 2,
    explanation: "Equipment brought from other sites should undergo full PAT testing to ensure it meets local safety standards.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "Site Management",
    category: "Documentation"
  },
  {
    id: 115,
    question: "How should temporary equipment be managed?",
    options: ["No special requirements", "Same as permanent equipment", "Reduced testing", "Higher frequency testing"],
    correctAnswer: 1,
    explanation: "Temporary equipment should be managed with the same PAT testing requirements as permanent equipment.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "Equipment Types",
    category: "Documentation"
  },
  {
    id: 116,
    question: "What training records should be maintained?",
    options: ["Basic attendance", "Competency assessment", "Ongoing training", "All training activities"],
    correctAnswer: 3,
    explanation: "Comprehensive training records should be maintained including all training activities and competency assessments.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "Training Records",
    category: "Documentation"
  },
  {
    id: 117,
    question: "Should equipment manuals be kept with test records?",
    options: ["Not necessary", "Yes, for reference", "Only for complex equipment", "Digital copies only"],
    correctAnswer: 1,
    explanation: "Equipment manuals should be kept with test records for reference regarding testing requirements and safety information.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "Documentation",
    category: "Documentation"
  },
  {
    id: 118,
    question: "How should equipment modifications be recorded?",
    options: ["Not necessary", "Brief note only", "Full documentation", "Photo record"],
    correctAnswer: 2,
    explanation: "Equipment modifications should be fully documented including reasons, approval, and impact on testing requirements.",
    section: "Module 5",
    difficulty: "advanced",
    topic: "Modifications",
    category: "Documentation"
  },
  {
    id: 119,
    question: "What should be included in annual PAT testing reports?",
    options: ["Summary statistics", "Failed equipment details", "Recommendations", "All of the above"],
    correctAnswer: 3,
    explanation: "Annual PAT testing reports should include statistics, failed equipment details, trends, and recommendations.",
    section: "Module 5",
    difficulty: "intermediate",
    topic: "Reporting",
    category: "Documentation"
  },
  {
    id: 120,
    question: "Should contractors' equipment be included in PAT testing records?",
    options: ["No, their responsibility", "Yes, if used on site", "Only long-term contractors", "Spot checks only"],
    correctAnswer: 1,
    explanation: "Contractors' equipment used on site should be included in PAT testing records to maintain comprehensive safety management.",
    section: "Module 5",
    difficulty: "advanced",
    topic: "Contractors",
    category: "Documentation"
  }
];

/**
 * Get random questions for the PAT Testing mock exam with difficulty distribution
 */
export const getRandomPATTestingExamQuestions = (numQuestions: number = 25): StandardMockQuestion[] => {
  return getRandomQuestionsBalanced(
    patTestingQuestionBank,
    numQuestions,
    patTestingCategories,
    { basic: 0.35, intermediate: 0.45, advanced: 0.2 }
  );
};
