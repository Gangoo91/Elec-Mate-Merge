import { QuizQuestion } from '@/types/quiz';

export const remoteTestingQuizData: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the main advantage of remote testing systems over manual testing?",
    options: [
      "They eliminate all need for maintenance",
      "They automate monthly and annual tests, reducing labour whilst improving compliance",
      "They are cheaper to install than traditional emergency lighting",
      "They remove the need for visual inspections"
    ],
    correctAnswer: 1,
    explanation: "Remote testing systems automate functional and duration tests, reducing labour by 60-80% whilst ensuring consistent compliance with BS 5266-1. However, they do not eliminate maintenance or visual inspections, and initial costs are typically higher than standard systems."
  },
  {
    id: 2,
    question: "Which two mandatory emergency lighting tests can remote systems automate?",
    options: [
      "Visual inspections and damage assessments",
      "Monthly function tests and annual full-duration tests",
      "Installation testing and commissioning checks",
      "Light level measurements and battery voltage tests"
    ],
    correctAnswer: 1,
    explanation: "Remote systems automate the two primary BS 5266-1 requirements: monthly function tests (brief operational checks) and annual full-duration tests (3-hour discharge tests). Visual inspections, installation testing, and detailed light level measurements still require manual intervention."
  },
  {
    id: 3,
    question: "How do self-test luminaires indicate a test failure?",
    options: [
      "They send an email alert to the maintenance team",
      "They sound an audible alarm",
      "They display a fault via an LED indicator on the luminaire",
      "They automatically shut down to prevent further damage"
    ],
    correctAnswer: 2,
    explanation: "Self-test luminaires carry out automated tests independently and indicate pass/fail status via an LED on the fitting (typically green for pass, red for fail). This still requires personnel to physically inspect each luminaire to check the LED status, unlike networked systems which provide centralised monitoring."
  },
  {
    id: 4,
    question: "What is the key feature of a networked emergency lighting system compared to self-test fittings?",
    options: [
      "Networked systems are cheaper to install",
      "Networked systems do not require any additional wiring",
      "Networked systems provide real-time centralised monitoring with instant alerts",
      "Networked systems eliminate the need for annual duration tests"
    ],
    correctAnswer: 2,
    explanation: "Networked systems connect all luminaires to a central controller via data cables, providing real-time monitoring, instant fault alerts, and comprehensive reporting from a single interface. This eliminates the need to physically check each luminaire, unlike self-test systems which require visual inspection of LED indicators."
  },
  {
    id: 5,
    question: "Why are wireless remote testing systems particularly useful in refurbishment projects?",
    options: [
      "They are the cheapest type of remote testing system",
      "They avoid the need for data cabling, which can be impractical or expensive in existing buildings",
      "They do not require any electrical connection",
      "They are the only type that works with LED emergency luminaires"
    ],
    correctAnswer: 1,
    explanation: "Wireless systems use radio communication (typically 868 MHz mesh networks) to connect luminaires to a gateway, avoiding the need for extensive data cable runs. This is ideal for refurbishments, listed buildings, or sites where installing new cabling would be disruptive, costly, or impractical."
  },
  {
    id: 6,
    question: "Which British Standard sets out requirements for automated emergency lighting testing?",
    options: [
      "BS 7671:2018 (18th Edition Wiring Regulations)",
      "BS 5839-1 (Fire detection and alarm systems)",
      "BS 5266-8 (EN 50172) (Emergency lighting testing and monitoring)",
      "BS EN 1838 (Lighting applications — Emergency lighting)"
    ],
    correctAnswer: 2,
    explanation: "BS 5266-8 (which adopts EN 50172) provides standards for automated emergency lighting testing systems. While BS 5266-1 covers emergency lighting design and testing requirements, BS 5266-8 specifically addresses automated testing methods, electronic logging, and remote monitoring compliance."
  },
  {
    id: 7,
    question: "What is one key advantage of digital logs over paper logbooks for emergency lighting compliance?",
    options: [
      "Digital logs can be edited to correct mistakes after audits",
      "Digital logs provide instant access to time-stamped records that cannot be lost or damaged",
      "Digital logs do not need to be kept for as many years",
      "Digital logs eliminate the need for BS 5266-1 compliance"
    ],
    correctAnswer: 1,
    explanation: "Digital logs provide instant access for audits, cannot be lost or damaged, are searchable, and include automatic time-stamping that provides a reliable audit trail. They also highlight failures immediately without manual review, reducing inspection time by 70-80% in large sites. Records must still be retained for the same period as paper logs."
  },
  {
    id: 8,
    question: "Which type of site would benefit most from remote emergency lighting testing?",
    options: [
      "A small retail shop with 20 emergency luminaires",
      "A low-occupancy warehouse with minimal staff",
      "A large university campus with 850 luminaires across multiple buildings",
      "A single-storey office with 40 staff members"
    ],
    correctAnswer: 2,
    explanation: "Large, complex sites with 100+ luminaires, high occupancy, or limited maintenance resources benefit most from remote testing. The Manchester University case study (850 luminaires, 12 buildings) achieved 60% labour reduction and improved compliance. Small sites (under 100 luminaires) typically cannot justify the higher upfront costs."
  },
  {
    id: 9,
    question: "Why do remote testing systems NOT remove the need for visual inspections?",
    options: [
      "Visual inspections are required by law regardless of testing method",
      "Remote systems cannot detect physical damage, obstructions, dirt, or mounting issues",
      "BS 5266-1 requires routine visual checks in addition to functional testing",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "All statements are correct. Remote systems automate functional and duration testing but cannot detect physical problems such as damage, obstructions blocking light output, dirt accumulation, loose mounting, or changes to building layout. BS 5266-1 requires regular visual inspections regardless of testing method used."
  },
  {
    id: 10,
    question: "In the Manchester University case study, what cost benefit did remote testing achieve?",
    options: [
      "The system paid for itself immediately through energy savings",
      "Testing time reduced by 62.5%, saving £9,000/year with a 7.6-year payback period",
      "The university eliminated all maintenance costs for emergency lighting",
      "Installation was free as part of a government grant scheme"
    ],
    correctAnswer: 1,
    explanation: "The wireless system reduced manual testing from 48 hours/month to 18 hours/month (62.5% reduction), saving £9,000 annually in labour costs. With a total system cost of £68,000, the payback period was 7.6 years. Additional benefits included improved compliance, instant fault detection, and elimination of a fire inspection warning notice."
  }
];
