
export interface SafetyScenarioOption {
  id: string;
  text: string;
  isCorrect: boolean;
  feedback: string;
  outcome: string;
  regulation?: string;
}

export interface SafetyScenario {
  id: number;
  title: string;
  description: string;
  question: string;
  options: SafetyScenarioOption[];
  category: string;
  difficulty: string;
  duration: string;
}

export const safetyScenarios: SafetyScenario[] = [
  {
    id: 1,
    title: "Electrical Shock Incident",
    description: "An apprentice receives an electric shock while working on a domestic installation. You need to respond immediately and appropriately.",
    question: "You witness an apprentice receive an electric shock from a live circuit. They are conscious but shaken. What is your immediate priority?",
    category: "Emergency Response",
    difficulty: "Beginner",
    duration: "10-15 mins",
    options: [
      {
        id: "A",
        text: "Check if they are injured and call for medical assistance",
        isCorrect: false,
        feedback: "While checking for injuries is important, you must first ensure the power source is safe.",
        outcome: "This could put you at risk of electric shock as well.",
        regulation: "HSE guidance states isolation comes before assistance."
      },
      {
        id: "B",
        text: "Immediately isolate the power source before approaching",
        isCorrect: true,
        feedback: "Correct! Always isolate the power source first to prevent further injury.",
        outcome: "The area is made safe, preventing additional casualties.",
        regulation: "Electricity at Work Regulations 1989 - safe isolation procedures."
      },
      {
        id: "C",
        text: "Touch the person to check if they're responsive",
        isCorrect: false,
        feedback: "Never touch someone who may still be in contact with live electrical parts.",
        outcome: "You could receive an electric shock yourself.",
        regulation: "This violates basic electrical safety principles."
      },
      {
        id: "D",
        text: "Shout for help and wait for someone else to handle it",
        isCorrect: false,
        feedback: "While calling for help is good, you should take immediate action to isolate the power.",
        outcome: "Delays could result in further injury to the victim.",
        regulation: "You have a duty of care to act promptly and safely."
      }
    ]
  },
  {
    id: 2,
    title: "Arc Flash Near Miss",
    description: "A near-miss arc flash incident occurs at an industrial facility during maintenance work on a 400V distribution board.",
    question: "During work on a 400V distribution board, you notice signs that could lead to an arc flash incident. What should be your immediate action?",
    category: "PPE & Safety",
    difficulty: "Intermediate",
    duration: "15-20 mins",
    options: [
      {
        id: "A",
        text: "Continue working but be more careful",
        isCorrect: false,
        feedback: "Arc flash incidents can cause severe burns and fatalities. Never continue when risks are identified.",
        outcome: "Potential for severe injury or death from arc flash.",
        regulation: "This violates the fundamental principle of 'stop work authority'."
      },
      {
        id: "B",
        text: "Stop work immediately and reassess the situation",
        isCorrect: true,
        feedback: "Correct! Always stop work when arc flash risks are identified.",
        outcome: "Work stops safely, risks are properly assessed and mitigated.",
        regulation: "CDM Regulations 2015 require stopping work when new hazards are identified."
      },
      {
        id: "C",
        text: "Put on additional PPE and continue",
        isCorrect: false,
        feedback: "PPE alone may not be sufficient protection against arc flash. The hazard must be eliminated first.",
        outcome: "PPE may fail, resulting in severe burns.",
        regulation: "Hierarchy of controls places elimination before PPE."
      },
      {
        id: "D",
        text: "Work faster to finish the job quickly",
        isCorrect: false,
        feedback: "Rushing increases the likelihood of making mistakes that could trigger an arc flash.",
        outcome: "Increased risk of error leading to arc flash incident.",
        regulation: "This goes against all safety principles and procedures."
      }
    ]
  },
  {
    id: 3,
    title: "Lockout/Tagout Failure",
    description: "You discover that a colleague has not properly followed lockout/tagout procedures on a high-voltage isolation.",
    question: "You find electrical equipment that should be isolated but the lockout/tagout procedure appears incomplete. What do you do?",
    category: "Isolation Procedures",
    difficulty: "Advanced",
    duration: "20-25 mins",
    options: [
      {
        id: "A",
        text: "Complete the lockout procedure yourself",
        isCorrect: false,
        feedback: "Only the person who started the isolation should complete it unless proper handover procedures are followed.",
        outcome: "Confusion about isolation status could lead to accidents.",
        regulation: "BS EN 50110 specifies who can operate isolation procedures."
      },
      {
        id: "B",
        text: "Treat the equipment as live and find the responsible person",
        isCorrect: true,
        feedback: "Correct! Always treat inadequately isolated equipment as live and find the responsible person.",
        outcome: "Equipment remains safe, proper procedures are followed.",
        regulation: "Electricity at Work Regulations 1989 - prove dead before work."
      },
      {
        id: "C",
        text: "Test the equipment to see if it's really dead",
        isCorrect: false,
        feedback: "Testing should only be done after proper isolation procedures are complete.",
        outcome: "Risk of electric shock if isolation is incomplete.",
        regulation: "Testing comes after isolation, not before verification of isolation status."
      },
      {
        id: "D",
        text: "Remove the incomplete locks and start fresh",
        isCorrect: false,
        feedback: "Never remove another person's locks without proper authorization and procedures.",
        outcome: "Could energize equipment unexpectedly, causing injury or death.",
        regulation: "This violates fundamental lockout/tagout principles."
      }
    ]
  },
  {
    id: 4,
    title: "Confined Space Emergency",
    description: "An emergency situation develops while electrical work is being performed in a confined space with limited access.",
    question: "During electrical work in a confined space, your colleague suddenly becomes unresponsive. What is your first priority?",
    category: "Hazardous Environments",
    difficulty: "Advanced",
    duration: "25-30 mins",
    options: [
      {
        id: "A",
        text: "Enter the space immediately to help your colleague",
        isCorrect: false,
        feedback: "Never enter a confined space during an emergency without proper rescue procedures.",
        outcome: "You could become the second casualty due to atmospheric hazards.",
        regulation: "Confined Spaces Regulations 1997 require trained rescue teams."
      },
      {
        id: "B",
        text: "Call the emergency services and the trained rescue team",
        isCorrect: true,
        feedback: "Correct! Follow the confined space emergency procedure and call trained rescuers.",
        outcome: "Professional rescue is initiated while you remain safe.",
        regulation: "Confined Spaces Regulations 1997 require emergency procedures and trained rescue."
      },
      {
        id: "C",
        text: "Try to pull them out using a rope",
        isCorrect: false,
        feedback: "Untrained rescue attempts in confined spaces often create additional casualties.",
        outcome: "Risk of injuring the casualty or becoming trapped yourself.",
        regulation: "Only trained rescue teams should perform confined space rescue."
      },
      {
        id: "D",
        text: "Ventilate the space first, then enter",
        isCorrect: false,
        feedback: "Emergency ventilation should be done by trained personnel with proper equipment.",
        outcome: "Delay in professional rescue while you attempt inadequate ventilation.",
        regulation: "Emergency response requires trained personnel and proper procedures."
      }
    ]
  }
];
