interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export const smartHomeModule7Section2QuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What does commissioning mean in smart home systems?",
    options: [
      "Installing physical devices only",
      "The process of making a system fully operational",
      "Selling products to customers",
      "Designing the system layout"
    ],
    correct: 1,
    explanation: "Commissioning is the comprehensive process of making a smart home system fully operational, including pairing devices, testing functionality, programming routines, and documenting results."
  },
  {
    id: 2,
    question: "Name two tasks included in commissioning.",
    options: [
      "Marketing and sales",
      "Device pairing and testing functionality", 
      "Accounting and invoicing",
      "Designing and quoting"
    ],
    correct: 1,
    explanation: "Commissioning includes device pairing, testing functionality, programming routines, and documenting results to ensure the system works as designed."
  },
  {
    id: 3, 
    question: "What is device pairing?",
    options: [
      "Connecting two identical devices together",
      "The process of connecting devices to hubs and networks",
      "Installing devices in pairs for redundancy",
      "Matching device colours to room decor"
    ],
    correct: 1,
    explanation: "Device pairing is the process of connecting smart devices to hubs, apps, or networks so they can communicate and be controlled remotely."
  },
  {
    id: 4,
    question: "Give one method used to pair a device.",
    options: [
      "Using a hammer",
      "Holding a reset button or scanning a QR code",
      "Painting it a different colour", 
      "Moving it to a different room"
    ],
    correct: 1,
    explanation: "Common pairing methods include holding a reset button for 5-10 seconds, scanning QR codes, putting devices in pairing mode, or following app setup wizards."
  },
  {
    id: 5,
    question: "Why should devices be named clearly in apps?",
    options: [
      "To make them more expensive",
      "To avoid confusion and enable easy identification",
      "To improve their appearance",
      "To reduce power consumption"
    ],
    correct: 1,
    explanation: "Clear, descriptive device names (like 'Kitchen Ceiling Light' instead of 'Device 3') prevent confusion and make the system much easier to use and troubleshoot."
  },
  {
    id: 6,
    question: "What should be tested after pairing a device?",
    options: [
      "Only that it appears in the app",
      "Basic functionality, naming, remote access, and automation",
      "Just the battery level",
      "Only the installation cost"
    ],
    correct: 1,
    explanation: "After pairing, test basic on/off functionality, verify descriptive naming, confirm remote access works, and check that automation routines operate correctly."
  },
  {
    id: 7,
    question: "Give one example of a common pairing problem.",
    options: [
      "Device is too attractive",
      "Poor power supply or weak signal strength",
      "Device costs too much",
      "Installation was done on a Monday"
    ],
    correct: 1,
    explanation: "Common pairing problems include poor power supply, weak signal strength, device not in pairing mode, interference, or firmware compatibility issues."
  },
  {
    id: 8,
    question: "How can poor Wi-Fi affect commissioning?",
    options: [
      "Makes devices more expensive",
      "Causes connection drops and pairing failures",
      "Changes device colours",
      "Improves security"
    ],
    correct: 1,
    explanation: "Poor Wi-Fi causes devices to fail pairing, drop connections, respond slowly to commands, or appear offline, making commissioning difficult or impossible."
  },
  {
    id: 9,
    question: "Why is documenting device IDs important?",
    options: [
      "For legal compliance only",
      "For handover documents and future troubleshooting",
      "To increase the invoice amount",
      "To impress other electricians"
    ],
    correct: 1,
    explanation: "Documenting device IDs, locations, and settings provides essential information for client handover, warranty claims, future maintenance, and troubleshooting."
  },
  {
    id: 10,
    question: "In the real-world example, what mistake caused random light activations?",
    options: [
      "Using the wrong cable type",
      "Unnamed devices and an unpaired PIR sensor",
      "Installing too many lights",
      "Using the wrong app"
    ],
    correct: 1,
    explanation: "The electrician left devices unnamed in the app and failed to pair a PIR sensor properly, causing random light activations. Proper commissioning resolved these issues."
  }
];