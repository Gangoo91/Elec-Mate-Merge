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
    question: 'What does commissioning mean in smart home systems?',
    options: [
      'The process of making a system fully operational',
      'Mounting and wiring the physical devices only',
      'Preparing the system design and device schedule',
      'Producing the handover pack and user manuals',
    ],
    correct: 0,
    explanation:
      'Commissioning is the comprehensive process of making a smart home system fully operational, including pairing devices, testing functionality, programming routines, and documenting results.',
  },
  {
    id: 2,
    question: 'Name two tasks included in commissioning.',
    options: [
      'Specifying the cable routes and quoting the works',
      'First-fixing the back boxes and pulling the cables',
      'Device pairing and testing functionality',
      'Raising the invoice and closing the job file',
    ],
    correct: 2,
    explanation:
      'Commissioning includes device pairing, testing functionality, programming routines, and documenting results to ensure the system works as designed.',
  },
  {
    id: 3,
    question: 'What is device pairing?',
    options: [
      'Wiring two identical devices in parallel for redundancy',
      'Linking a device directly to the mains supply at the board',
      'The process of connecting devices to hubs and networks',
      'Assigning a device to a specific lighting circuit on the DB',
    ],
    correct: 2,
    explanation:
      'Device pairing is the process of connecting smart devices to hubs, apps, or networks so they can communicate and be controlled remotely.',
  },
  {
    id: 4,
    question: 'Give one method used to pair a device.',
    options: [
      'Holding a reset button or scanning a QR code',
      'Power-cycling the consumer unit several times',
      'Entering the device serial number into the hub manually',
      'Connecting it to the router with an Ethernet cable',
    ],
    correct: 0,
    explanation:
      'Common pairing methods include holding a reset button for 5-10 seconds, scanning QR codes, putting devices in pairing mode, or following app setup wizards.',
  },
  {
    id: 5,
    question: 'Why should devices be named clearly in apps?',
    options: [
      'To avoid confusion and enable easy identification',
      'To reduce the load each device places on the network',
      'To stop the devices being controlled by other users',
      'To speed up the device firmware update process',
    ],
    correct: 0,
    explanation:
      "Clear, descriptive device names (like 'Kitchen Ceiling Light' instead of 'Device 3') prevent confusion and make the system much easier to use and troubleshoot.",
  },
  {
    id: 6,
    question: 'What should be tested after pairing a device?',
    options: [
      'Only that the device appears as online in the app',
      'Just the battery level and firmware version',
      'Basic functionality, naming, remote access, and automation',
      'Only the signal strength back to the hub',
    ],
    correct: 2,
    explanation:
      'After pairing, test basic on/off functionality, verify descriptive naming, confirm remote access works, and check that automation routines operate correctly.',
  },
  {
    id: 7,
    question: 'Give one example of a common pairing problem.',
    options: [
      'The hub is running newer firmware than the device',
      'Poor power supply or weak signal strength',
      'The device is mounted too close to a light fitting',
      'Too many devices share the same descriptive name',
    ],
    correct: 1,
    explanation:
      'Common pairing problems include poor power supply, weak signal strength, device not in pairing mode, interference, or firmware compatibility issues.',
  },
  {
    id: 8,
    question: 'How can poor Wi-Fi affect commissioning?',
    options: [
      'Causes connection drops and pairing failures',
      'Forces devices to fall back to a wired connection',
      'Reduces the number of devices the hub can store',
      'Shortens the battery life of mains-powered devices',
    ],
    correct: 0,
    explanation:
      'Poor Wi-Fi causes devices to fail pairing, drop connections, respond slowly to commands, or appear offline, making commissioning difficult or impossible.',
  },
  {
    id: 9,
    question: 'Why is documenting device IDs important?',
    options: [
      'Only to satisfy the manufacturer warranty terms',
      'Mainly to demonstrate Part P compliance to building control',
      'For handover documents and future troubleshooting',
      'Purely to record how long the commissioning took',
    ],
    correct: 2,
    explanation:
      'Documenting device IDs, locations, and settings provides essential information for client handover, warranty claims, future maintenance, and troubleshooting.',
  },
  {
    id: 10,
    question: 'In the real-world example, what mistake caused random light activations?',
    options: [
      'A faulty PIR sensor that had to be replaced',
      'Unnamed devices and an unpaired PIR sensor',
      'An automation routine with conflicting time triggers',
      'Weak Wi-Fi dropping the hub connection overnight',
    ],
    correct: 1,
    explanation:
      'The electrician left devices unnamed in the app and failed to pair a PIR sensor properly, causing random light activations. Proper commissioning resolved these issues.',
  },
];
