import { QuizQuestion } from '@/types/quiz';

export const emergencyEscapeRouteQuizData: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the main purpose of escape route lighting?",
    options: [
      "To provide general illumination in buildings",
      "To ensure safe evacuation during emergency lighting failure",
      "To reduce energy costs during peak hours",
      "To comply with environmental regulations"
    ],
    correctAnswer: 1,
    explanation: "The main purpose of escape route lighting is to ensure safe evacuation during mains lighting failure. It provides illumination along designated paths so occupants can safely navigate to exits during emergencies."
  },
  {
    id: 2,
    question: "State the minimum lux level required along the centre line of an escape route according to BS 5266.",
    options: [
      "0.5 lux",
      "1 lux",
      "2 lux",
      "5 lux"
    ],
    correctAnswer: 1,
    explanation: "BS 5266 specifies a minimum of 1 lux along the centre line of the escape route. This ensures adequate visibility for safe navigation during evacuation."
  },
  {
    id: 3,
    question: "Which British Standard sets out requirements for emergency lighting?",
    options: [
      "BS 7671",
      "BS 5839",
      "BS 5266",
      "BS 6008"
    ],
    correctAnswer: 2,
    explanation: "BS 5266 sets out the requirements for emergency lighting systems in the UK. BS 5266-1 specifically covers the code of practice for emergency lighting design and installation."
  },
  {
    id: 4,
    question: "List two locations where escape route lighting must be installed.",
    options: [
      "Storage rooms and office areas",
      "Near exits and at changes of direction",
      "Car parks and external areas only",
      "Equipment rooms and plant areas"
    ],
    correctAnswer: 1,
    explanation: "Escape route lighting must be installed near each exit door and at changes of direction. Other mandatory locations include intersections, staircases, and near fire-fighting equipment."
  },
  {
    id: 5,
    question: "Why is it important to illuminate fire-fighting equipment?",
    options: [
      "To prevent theft of equipment",
      "To comply with insurance requirements",
      "To ensure quick location during emergencies",
      "To meet aesthetic building standards"
    ],
    correctAnswer: 2,
    explanation: "Fire-fighting equipment must be illuminated to ensure it can be quickly located and accessed during emergencies. Poor visibility of extinguishers, alarm call points, and other safety equipment can delay emergency response."
  },
  {
    id: 6,
    question: "How often should functional tests be carried out?",
    options: [
      "Daily",
      "Weekly",
      "Monthly",
      "Annually"
    ],
    correctAnswer: 2,
    explanation: "Functional tests should be carried out monthly. These tests check that all escape route lights switch to emergency supply and operate correctly, ensuring the system is ready for use during an emergency."
  },
  {
    id: 7,
    question: "How long must escape route lighting typically remain on during a mains failure?",
    options: [
      "30 minutes",
      "1 hour",
      "3 hours",
      "6 hours"
    ],
    correctAnswer: 2,
    explanation: "Escape route lighting must typically remain on for 3 hours during mains failure. This duration allows sufficient time for evacuation and for emergency services to complete their work."
  },
  {
    id: 8,
    question: "Why are maintained exit signs important in public buildings?",
    options: [
      "They use less energy than non-maintained signs",
      "They are visible even when mains lighting is working",
      "They cost less to install and maintain",
      "They meet fire service colour requirements"
    ],
    correctAnswer: 1,
    explanation: "Maintained exit signs are important in public buildings because they remain visible at all times, even when mains lighting is working. This ensures occupants are always aware of exit locations."
  },
  {
    id: 9,
    question: "What should be done after alterations to a building's layout?",
    options: [
      "Nothing if the changes are minor",
      "Update insurance documentation only",
      "Reassess escape route lighting coverage",
      "Notify the local fire service"
    ],
    correctAnswer: 2,
    explanation: "After alterations to a building's layout, escape route lighting coverage must be reassessed. New routes may need additional lighting, and existing routes may require modification to maintain compliance."
  },
  {
    id: 10,
    question: "Name one common mistake electricians make when installing escape route lighting.",
    options: [
      "Using LED luminaires instead of fluorescent",
      "Installing too many luminaires",
      "Creating gaps in illumination with excessive spacing",
      "Connecting to the wrong electrical circuit"
    ],
    correctAnswer: 2,
    explanation: "A common mistake is creating gaps in illumination through excessive spacing between luminaires. This can create dark zones where occupants may become disoriented, compromising evacuation safety."
  }
];