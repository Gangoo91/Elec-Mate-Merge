export const smartHomeModule6Section5QuizQuestions = [
  {
    id: 1,
    question: "What does 'ecosystem conflict' mean in smart homes?",
    options: [
      "When devices from different brands or platforms don't work together properly",
      'When devices are too expensive for the client',
      'When there are too many devices in one room',
      'When the internet connection is unreliable',
    ],
    correct: 0,
    explanation:
      'Ecosystem conflicts occur when devices, hubs and platforms from different manufacturers struggle to communicate and integrate seamlessly.',
  },
  {
    id: 2,
    question: 'Give one common cause of ecosystem conflicts.',
    options: [
      'Devices being mounted too close together on the same wall',
      'Devices using different communication protocols such as Zigbee, Z-Wave and Wi-Fi',
      'The total load drawing too much current from the circuit',
      'Having a large number of mobile apps installed on one phone',
    ],
    correct: 1,
    explanation:
      'Different communication protocols such as Zigbee, Z-Wave and Wi-Fi often cannot talk directly to one another, so a bridge or hub is needed for integration.',
  },
  {
    id: 3,
    question: 'Why might reliance on cloud services cause integration issues?',
    options: [
      'Cloud services consume too much local network bandwidth',
      'Cloud storage charges make integrations uneconomical',
      'If the cloud servers go offline, the integrations that depend on them may break',
      'Cloud data centres physically block Wi-Fi signals in the home',
    ],
    correct: 2,
    explanation:
      'When devices depend on cloud servers for integration, any server downtime, maintenance or service change can disrupt device communication and automation.',
  },
  {
    id: 4,
    question: 'What is one symptom of an ecosystem conflict?',
    options: [
      'Devices consume noticeably more power than their rated figures',
      'Devices become physically hot to the touch in normal use',
      'Devices emit an audible buzzing noise when idle',
      "Routines only partially work, with some devices responding while others don't",
    ],
    correct: 3,
    explanation:
      "Partial routine failures, where only some devices in an automation respond while others don't, are a classic sign of conflicts between different platforms.",
  },
  {
    id: 5,
    question: 'Why is it important to check device compatibility first when troubleshooting?',
    options: [
      "To avoid wasting time on fixes that can't work while devices remain incompatible",
      'To establish the remaining warranty period on each device',
      'To calculate the total standby power consumption of the system',
      'To determine the manufacturing age of each device',
    ],
    correct: 0,
    explanation:
      'Confirming compatibility first prevents wasted effort on network or configuration fixes when the real problem is that the devices simply cannot work together.',
  },
  {
    id: 6,
    question: 'How can simplifying a setup help with troubleshooting?',
    options: [
      'It lowers the standby electricity cost of the installation',
      'It increases the response speed of each individual device',
      'It removes competing hubs and duplicate integrations that cause conflicts',
      'It extends the service life of the connected devices',
    ],
    correct: 2,
    explanation:
      'Removing duplicate hubs and conflicting integrations eliminates competing control systems that confuse devices and cause unreliable operation.',
  },
  {
    id: 7,
    question: 'What role does updating firmware play in resolving ecosystem conflicts?',
    options: [
      'It fixes known compatibility issues and improves integration reliability',
      'It reduces the standby power draw of the device',
      'It changes the physical appearance of the device housing',
      'It lowers the retail price of the device',
    ],
    correct: 0,
    explanation:
      'Firmware updates often include fixes for known compatibility issues, improved protocol support and better integration with other platforms.',
  },
  {
    id: 8,
    question: 'Why should clients avoid having too many separate hubs?',
    options: [
      'Each hub adds a significant ongoing maintenance subscription cost',
      'Each hub consumes a large share of the Wi-Fi bandwidth',
      'Multiple hubs generate noticeable audible interference',
      'Multiple hubs can compete for device control, causing confusion and conflicts',
    ],
    correct: 3,
    explanation:
      'Multiple hubs can create competing control systems, duplicate device entries and conflicting automation rules, leading to unreliable operation.',
  },
  {
    id: 9,
    question: 'Give one preventative measure for ecosystem conflicts.',
    options: [
      'Always specify the most expensive devices available',
      'Stick to one main ecosystem, such as SmartThings with Alexa, where possible',
      'Install devices as far apart from each other as the layout allows',
      'Choose only battery-powered devices throughout',
    ],
    correct: 1,
    explanation:
      'Choosing one primary ecosystem and staying within it reduces compatibility issues and ensures devices are designed to work together reliably.',
  },
  {
    id: 10,
    question:
      'In the real-world Glasgow example, which hub was used to consolidate the conflicting devices?',
    options: ['Philips Hue Bridge', 'Amazon Echo Hub', 'Samsung SmartThings', 'Apple HomeKit Hub'],
    correct: 2,
    explanation:
      'The electrician installed a Samsung SmartThings hub as the primary controller to consolidate the Philips Hue lights, Ring doorbell and Hive heating system.',
  },
];
