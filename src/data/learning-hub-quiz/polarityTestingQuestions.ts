import { QuizQuestion } from '@/types/quiz';

export const polarityTestingQuestions: QuizQuestion[] = [
  {
    id: 'pol-1',
    question: 'Where must single-pole switches and fuses be connected?',
    options: ['Neutral conductor only', 'Line conductor only', 'Either line or neutral', 'Protective conductor'],
    correctAnswer: 1,
    explanation: 'Single-pole devices must be connected in the LINE conductor only to ensure safe isolation when the switch is open.',
    category: 'Polarity Testing',
    difficulty: 'Beginner',
    regulation: 'BS 7671:132.14.1'
  },
  {
    id: 'pol-2',
    question: 'On an Edison screw lampholder, which contact should be connected to line?',
    options: ['The outer screw shell', 'The centre contact', 'Either contact', 'The earth terminal'],
    correctAnswer: 1,
    explanation: 'The centre contact must be connected to line. The outer screw shell connects to neutral for safety (except E14/E27 to BS EN 60238).',
    category: 'Polarity Testing',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.12'
  },
  {
    id: 'pol-3',
    question: 'When should polarity be verified?',
    options: ['Only on three-phase circuits', 'Before connection to supply on ALL circuits', 'Only on lighting circuits', 'After the installation is energised'],
    correctAnswer: 1,
    explanation: 'Polarity must be verified on ALL circuits before connection to supply to ensure correct and safe operation.',
    category: 'Polarity Testing',
    difficulty: 'Beginner',
    regulation: 'BS 7671:643.6'
  },
  {
    id: 'pol-4',
    question: 'What instrument is used for polarity testing on dead circuits?',
    options: ['Voltage tester', 'Ohmmeter or continuity tester', 'Clamp meter', 'RCD tester'],
    correctAnswer: 1,
    explanation: 'An ohmmeter or the continuity range of an insulation/continuity tester is used for polarity testing on isolated circuits.',
    category: 'Polarity Testing',
    difficulty: 'Beginner',
    regulation: 'GN3 Section 2.6.12'
  },
  {
    id: 'pol-5',
    question: 'Why must polarity be checked at ALL points in an installation?',
    options: ['To save time', 'To detect crossed conductors at junction boxes', 'To check cable colours', 'To measure voltage'],
    correctAnswer: 1,
    explanation: 'Checking at all points detects crossed polarity that may occur at junction boxes, accessories, or intermediate connections.',
    category: 'Polarity Testing',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.12'
  },
  {
    id: 'pol-6',
    question: 'What should be done with other lamps on a circuit when testing polarity at a lampholder?',
    options: ['Leave them connected', 'Remove or disconnect them', 'Add more lamps', 'Turn them on'],
    correctAnswer: 1,
    explanation: 'Remove all other lamps as they may provide a conductive path between line and neutral, giving misleading continuity readings.',
    category: 'Polarity Testing',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.12'
  },
  {
    id: 'pol-7',
    question: 'What colour is the line conductor in modern UK wiring?',
    options: ['Blue', 'Brown', 'Green/Yellow', 'Black'],
    correctAnswer: 1,
    explanation: 'In modern harmonised colours, brown is line (live), blue is neutral, and green/yellow is earth.',
    category: 'Polarity Testing',
    difficulty: 'Beginner',
    regulation: 'BS 7671:514.3'
  },
  {
    id: 'pol-8',
    question: 'What was the line conductor colour in old UK wiring?',
    options: ['Brown', 'Red', 'Blue', 'Green'],
    correctAnswer: 1,
    explanation: 'In old UK colours, red was line (live), black was neutral, and green (or bare) was earth.',
    category: 'Polarity Testing',
    difficulty: 'Beginner',
    regulation: 'BS 7671:514.3'
  },
  {
    id: 'pol-9',
    question: 'How can polarity also be verified during testing?',
    options: ['By measuring voltage only', 'By visually checking core colours at terminations', 'By counting conductors', 'By measuring current'],
    correctAnswer: 1,
    explanation: 'Visual inspection of conductor colours at terminations can confirm correct polarity alongside electrical testing.',
    category: 'Polarity Testing',
    difficulty: 'Beginner',
    regulation: 'GN3 Section 2.6.12'
  },
  {
    id: 'pol-10',
    question: 'What helps confirm polarity during continuity testing?',
    options: ['Voltage measurement', 'Continuity tests as per sections 2.6.5 and 2.6.6', 'RCD operation', 'Insulation resistance'],
    correctAnswer: 1,
    explanation: 'Continuity tests (R1+R2 testing) help confirm polarity by verifying the line and CPC are correctly identified.',
    category: 'Polarity Testing',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.12'
  },
  {
    id: 'pol-11',
    question: 'What is the consequence of reversed polarity at a socket outlet?',
    options: ['No problem - appliances work normally', 'Appliances may not be safely isolated by their switches', 'Increased power consumption', 'RCDs will not work'],
    correctAnswer: 1,
    explanation: 'Reversed polarity means switches and fuses may be in the neutral, leaving equipment energised even when switched off.',
    category: 'Polarity Testing',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:132.14.1'
  },
  {
    id: 'pol-12',
    question: 'Which terminal on a 13A socket outlet should be connected to line?',
    options: ['Left terminal (looking at face)', 'Right terminal (looking at face)', 'Top terminal', 'Bottom terminal'],
    correctAnswer: 1,
    explanation: 'The right terminal (when looking at the socket face) is the line terminal for UK 13A sockets.',
    category: 'Polarity Testing',
    difficulty: 'Beginner',
    regulation: 'BS 1363'
  },
  {
    id: 'pol-13',
    question: 'What must be verified regarding socket outlets during polarity testing?',
    options: ['Colour only', 'Correct connection of non-reversible plugs and socket-outlets', 'Number of sockets', 'Socket brand'],
    correctAnswer: 1,
    explanation: 'Verify that non-reversible plugs and socket-outlets are correctly connected with line, neutral, and earth in correct positions.',
    category: 'Polarity Testing',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:643.6'
  },
  {
    id: 'pol-14',
    question: 'In a lighting circuit, what happens if line and neutral are swapped?',
    options: ['Light works normally with no safety issue', 'Light switch disconnects neutral instead of line', 'Light will not work', 'Bulbs burn out faster'],
    correctAnswer: 1,
    explanation: 'The switch would disconnect neutral instead of line, leaving the lampholder live even when the switch is off - a serious safety hazard.',
    category: 'Polarity Testing',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:132.14.1'
  },
  {
    id: 'pol-15',
    question: 'What is the purpose of the polarity test?',
    options: ['To measure cable length', 'To ensure safe isolation when switches are open', 'To check fuse ratings', 'To measure earth resistance'],
    correctAnswer: 1,
    explanation: 'The polarity test ensures that switches and protective devices are in the line conductor, providing safe isolation.',
    category: 'Polarity Testing',
    difficulty: 'Beginner',
    regulation: 'BS 7671:643.6'
  },
  {
    id: 'pol-16',
    question: 'When testing polarity using continuity, what reading indicates correct connection?',
    options: ['Infinite resistance', 'Low resistance between expected conductors', 'High voltage', 'Zero voltage'],
    correctAnswer: 1,
    explanation: 'A low resistance reading between the expected conductors (e.g., DB line terminal to socket line terminal) confirms correct polarity.',
    category: 'Polarity Testing',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.12'
  },
  {
    id: 'pol-17',
    question: 'What phase colours are used in UK three-phase systems?',
    options: ['Red, Yellow, Blue', 'Brown, Black, Grey', 'Red, White, Blue', 'Brown, Blue, Green'],
    correctAnswer: 1,
    explanation: 'Modern UK three-phase colours are Brown (L1), Black (L2), and Grey (L3), with blue neutral.',
    category: 'Polarity Testing',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:514.3'
  },
  {
    id: 'pol-18',
    question: 'What could cause a polarity fault?',
    options: ['Using the wrong fuse rating', 'Incorrect wiring at a junction box or accessory', 'High ambient temperature', 'Cable length too long'],
    correctAnswer: 1,
    explanation: 'Polarity faults typically occur from incorrect wiring at junction boxes, accessories, or terminals where conductors are swapped.',
    category: 'Polarity Testing',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.12'
  },
  {
    id: 'pol-19',
    question: 'For polarity testing, the circuit must be:',
    options: ['Energised', 'Isolated and proved dead', 'Under load', 'Connected to a generator'],
    correctAnswer: 1,
    explanation: 'Polarity testing using continuity methods requires the circuit to be isolated and proved dead for safety.',
    category: 'Polarity Testing',
    difficulty: 'Beginner',
    regulation: 'GN3 Section 2.6.12'
  },
  {
    id: 'pol-20',
    question: 'What additional check confirms polarity on a live installation?',
    options: ['Continuity test', 'Voltage measurement between line and earth', 'Insulation resistance', 'Ring circuit test'],
    correctAnswer: 1,
    explanation: 'On live installations, measuring voltage between line and earth (should show supply voltage) confirms polarity.',
    category: 'Polarity Testing',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.12'
  },
  {
    id: 'pol-21',
    question: 'What is the neutral conductor colour in modern UK single-phase wiring?',
    options: ['Black', 'Blue', 'Brown', 'Grey'],
    correctAnswer: 1,
    explanation: 'Blue is the neutral conductor in modern harmonised colours.',
    category: 'Polarity Testing',
    difficulty: 'Beginner',
    regulation: 'BS 7671:514.3'
  },
  {
    id: 'pol-22',
    question: 'What was the old UK colour for the neutral conductor?',
    options: ['Blue', 'Red', 'Black', 'Yellow'],
    correctAnswer: 2,
    explanation: 'In old UK wiring colours, black was neutral and red was line.',
    category: 'Polarity Testing',
    difficulty: 'Beginner',
    regulation: 'BS 7671:514.3'
  },
  {
    id: 'pol-23',
    question: 'Which regulation requires single-pole devices in the line conductor?',
    options: ['Regulation 411.3.3', 'Regulation 132.14.1', 'Regulation 643.3', 'Regulation 701.1'],
    correctAnswer: 1,
    explanation: 'Regulation 132.14.1 requires that single-pole switching devices shall be connected in the line conductor only.',
    category: 'Polarity Testing',
    difficulty: 'Advanced',
    regulation: 'BS 7671:132.14.1'
  },
  {
    id: 'pol-24',
    question: 'What safety risk exists with reversed polarity at a bayonet lampholder?',
    options: ['No risk', 'The outer shell becomes live', 'The lamp burns brighter', 'The switch fails'],
    correctAnswer: 1,
    explanation: 'With reversed polarity, the outer metal shell of the lampholder becomes live, creating a shock hazard.',
    category: 'Polarity Testing',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.12'
  },
  {
    id: 'pol-25',
    question: 'Which test should be completed before polarity testing?',
    options: ['RCD testing', 'Earth fault loop impedance', 'Continuity of protective conductors', 'Functional testing'],
    correctAnswer: 2,
    explanation: 'Continuity testing of protective conductors is performed before polarity testing in the test sequence.',
    category: 'Polarity Testing',
    difficulty: 'Intermediate',
    regulation: 'GN3 Testing Sequence'
  },
  {
    id: 'pol-26',
    question: 'What does E14/E27 to BS EN 60238 refer to regarding lampholders?',
    options: ['Earth terminal sizes', 'Edison screw lampholders that may have different polarity requirements', 'Emergency lighting standards', 'Cable entry sizes'],
    correctAnswer: 1,
    explanation: 'E14 and E27 Edison screw lampholders manufactured to BS EN 60238 have specific requirements that may differ from the standard centre-contact-to-line rule.',
    category: 'Polarity Testing',
    difficulty: 'Advanced',
    regulation: 'GN3 Section 2.6.12'
  },
  {
    id: 'pol-27',
    question: 'What indication would suggest incorrect polarity at a socket outlet when using a socket tester?',
    options: ['All lights off', 'Specific LED pattern indicating fault', 'Loud buzzing', 'No power'],
    correctAnswer: 1,
    explanation: 'Socket testers display specific LED patterns to indicate various faults including reversed polarity.',
    category: 'Polarity Testing',
    difficulty: 'Beginner',
    regulation: 'GN3 Section 2.6.12'
  },
  {
    id: 'pol-28',
    question: 'In a two-way switching circuit, polarity must be correct at:',
    options: ['Only the first switch', 'Only the light fitting', 'All switches and the light fitting', 'Only the distribution board'],
    correctAnswer: 2,
    explanation: 'Polarity must be correct throughout including at all switches and the light fitting to ensure safe operation.',
    category: 'Polarity Testing',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:132.14.1'
  },
  {
    id: 'pol-29',
    question: 'What is a common cause of polarity issues in extension rings or additions?',
    options: ['Using the wrong cable size', 'Incorrectly identifying existing conductors', 'Installing too many sockets', 'Using the wrong fuse'],
    correctAnswer: 1,
    explanation: 'When extending circuits, incorrectly identifying existing conductor colours (especially mixing old and new colours) commonly causes polarity faults.',
    category: 'Polarity Testing',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.12'
  },
  {
    id: 'pol-30',
    question: 'For a fused connection unit (FCU), the fuse must be in the:',
    options: ['Neutral side', 'Line side', 'Earth conductor', 'Either side'],
    correctAnswer: 1,
    explanation: 'The fuse in an FCU must be in the line conductor to ensure the load is properly isolated when the fuse operates.',
    category: 'Polarity Testing',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:132.14.1'
  },
  {
    id: 'pol-31',
    question: 'What should the reading be between line and neutral on a correctly wired dead circuit?',
    options: ['Zero ohms', 'Infinite or very high resistance', 'Supply voltage', '1 MΩ'],
    correctAnswer: 1,
    explanation: 'With no load connected and circuit dead, line-neutral should show very high/infinite resistance (open circuit).',
    category: 'Polarity Testing',
    difficulty: 'Intermediate',
    regulation: 'GN3 Section 2.6.12'
  },
  {
    id: 'pol-32',
    question: 'When was the change to harmonised cable colours implemented in the UK?',
    options: ['1995', '2001', '2004 (mandatory from 2006)', '2010'],
    correctAnswer: 2,
    explanation: 'Harmonised colours were introduced in 2004 with parallel use allowed until 31 March 2006, after which they became mandatory.',
    category: 'Polarity Testing',
    difficulty: 'Advanced',
    regulation: 'BS 7671:514.3'
  },
  {
    id: 'pol-33',
    question: 'What identifies the line terminal on a 13A plug?',
    options: ['Letter N', 'Letter L', 'Fuse position', 'Green dot'],
    correctAnswer: 2,
    explanation: 'The line terminal is identified by the fuse position - the terminal that the fuse connects to is the line terminal.',
    category: 'Polarity Testing',
    difficulty: 'Beginner',
    regulation: 'BS 1363'
  },
  {
    id: 'pol-34',
    question: 'Why is polarity testing done as part of initial verification?',
    options: ['It is optional', 'To ensure safe operation before energising', 'To calculate Zs values', 'To determine cable sizes'],
    correctAnswer: 1,
    explanation: 'Polarity testing ensures correct and safe wiring before the installation is energised for the first time.',
    category: 'Polarity Testing',
    difficulty: 'Beginner',
    regulation: 'BS 7671:643.6'
  },
  {
    id: 'pol-35',
    question: 'What colour must be used to identify a protective conductor?',
    options: ['Brown', 'Blue', 'Green and yellow', 'Black'],
    correctAnswer: 2,
    explanation: 'Protective conductors must be identified by the combination of green and yellow colours.',
    category: 'Polarity Testing',
    difficulty: 'Beginner',
    regulation: 'BS 7671:514.3'
  },
  {
    id: 'pol-36',
    question: 'In installations with mixed old and new cable colours, what precaution is required?',
    options: ['Replace all old cables', 'Warning labels at each distribution board', 'Use only one colour system', 'No special precautions needed'],
    correctAnswer: 1,
    explanation: 'Where both colour systems exist, a warning label must be fitted at the distribution board indicating the presence of two cable colour systems.',
    category: 'Polarity Testing',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:514.14'
  },
  {
    id: 'pol-37',
    question: 'What polarity check is required for equipment with a double-pole switch?',
    options: ['None - both poles switch together', 'Check both line AND neutral are switched', 'Check earth continuity only', 'Check line only'],
    correctAnswer: 1,
    explanation: 'For double-pole switches, verify that both line AND neutral are being switched simultaneously.',
    category: 'Polarity Testing',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:537.2'
  },
  {
    id: 'pol-38',
    question: 'A correctly wired 13A socket has which conductor at the top terminal?',
    options: ['Line', 'Neutral', 'Earth', 'No terminal at top'],
    correctAnswer: 2,
    explanation: 'The top (centre) terminal of a 13A socket is the earth terminal, connecting to the longer earth pin of the plug.',
    category: 'Polarity Testing',
    difficulty: 'Beginner',
    regulation: 'BS 1363'
  },
  {
    id: 'pol-39',
    question: 'What is the minimum test current for polarity testing using continuity?',
    options: ['50mA', '100mA', '200mA', '500mA'],
    correctAnswer: 2,
    explanation: 'Continuity testing (including for polarity) requires a minimum test current of 200mA.',
    category: 'Polarity Testing',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:643.2.1'
  },
  {
    id: 'pol-40',
    question: 'When checking polarity at a ceiling rose, what indicates correct wiring?',
    options: ['Both terminals are the same colour', 'Loop terminal connected to line, switch wire returns to centre contact', 'All terminals connected together', 'Only earth connected'],
    correctAnswer: 1,
    explanation: 'Correct wiring has the permanent line at the loop terminal, with the switch wire (returning line) connected to the lamp centre contact.',
    category: 'Polarity Testing',
    difficulty: 'Advanced',
    regulation: 'GN3 Section 2.6.12'
  },
  {
    id: 'pol-41',
    question: 'What must never be used as a switched conductor?',
    options: ['Brown cable', 'The protective conductor (earth)', 'Blue cable marked brown', 'Line conductor'],
    correctAnswer: 1,
    explanation: 'The protective conductor must never be used as a switched conductor - it must provide a continuous path to earth at all times.',
    category: 'Polarity Testing',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:543'
  },
  {
    id: 'pol-42',
    question: 'In a switch-wire (loop-in) lighting system, how is the switched line identified?',
    options: ['It is always brown', 'Blue with brown sleeving at terminations', 'It is always black', 'Green and yellow'],
    correctAnswer: 1,
    explanation: 'The switched line in a loop-in system uses a blue conductor but must be sleeved brown at both ends to identify it as a line conductor.',
    category: 'Polarity Testing',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:514.3'
  },
  {
    id: 'pol-43',
    question: 'Polarity testing at a shaver socket should confirm:',
    options: ['Only earth connection', 'Correct line and neutral to isolating transformer', 'Fuse rating only', 'SELV output voltage only'],
    correctAnswer: 1,
    explanation: 'Shaver sockets contain an isolating transformer; polarity testing confirms correct line and neutral connections to the primary side.',
    category: 'Polarity Testing',
    difficulty: 'Advanced',
    regulation: 'BS 7671:701.512.3'
  },
  {
    id: 'pol-44',
    question: 'What is the correct sequence for connecting a 13A plug?',
    options: ['Earth, Neutral, Line', 'Line, Neutral, Earth', 'Neutral, Line, Earth', 'Any order'],
    correctAnswer: 0,
    explanation: 'Connect earth first (longest pin), then neutral, then line - this ensures earth is always connected first and disconnected last.',
    category: 'Polarity Testing',
    difficulty: 'Beginner',
    regulation: 'BS 1363'
  },
  {
    id: 'pol-45',
    question: 'A polarity fault found on a periodic inspection would be coded:',
    options: ['C1 - Danger present', 'C2 - Potentially dangerous', 'C3 - Improvement recommended', 'FI - Further investigation'],
    correctAnswer: 1,
    explanation: 'Polarity faults are typically coded C2 (potentially dangerous) as they create risk when equipment is assumed to be isolated.',
    category: 'Polarity Testing',
    difficulty: 'Advanced',
    regulation: 'BS 7671'
  },
  {
    id: 'pol-46',
    question: 'When testing polarity on a lighting circuit with electronic dimmer, what precaution is needed?',
    options: ['No special precaution', 'Ensure dimmer electronics do not provide a path affecting the test', 'Only test at full brightness', 'Disconnect all lamps'],
    correctAnswer: 1,
    explanation: 'Electronic dimmers may provide conductive paths that can affect polarity test readings; ensure they are isolated or accounted for.',
    category: 'Polarity Testing',
    difficulty: 'Advanced',
    regulation: 'GN3 Section 2.6.12'
  },
  {
    id: 'pol-47',
    question: 'What is the purpose of sleeving identification on switch wires?',
    options: ['To make cables look neater', 'To indicate the conductor is being used as a line despite its core colour', 'To increase insulation', 'To identify circuit numbers'],
    correctAnswer: 1,
    explanation: 'Sleeving identifies that a conductor of one colour (e.g., blue) is being used as a different function (e.g., switched line marked brown).',
    category: 'Polarity Testing',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:514.3'
  },
  {
    id: 'pol-48',
    question: 'Where should polarity be confirmed on a cooker circuit?',
    options: ['At the consumer unit only', 'At the cooker control unit and cooker outlet', 'At the cooker only', 'Nowhere - cookers are double-pole'],
    correctAnswer: 1,
    explanation: 'Polarity should be confirmed at the cooker control unit switch and at the cooker connection point to ensure correct isolation.',
    category: 'Polarity Testing',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:643.6'
  },
  {
    id: 'pol-49',
    question: 'What creates increased risk from a polarity fault on circuits feeding outdoor equipment?',
    options: ['Longer cable runs', 'Contact with water and earth increases shock hazard', 'Lower ambient temperature', 'UV exposure'],
    correctAnswer: 1,
    explanation: 'Outdoor conditions increase contact with earth and moisture, making polarity faults more dangerous due to enhanced shock risk.',
    category: 'Polarity Testing',
    difficulty: 'Intermediate',
    regulation: 'BS 7671:132.14.1'
  },
  {
    id: 'pol-50',
    question: 'When documenting polarity test results, what should be recorded?',
    options: ['Resistance values', 'Correct or incorrect polarity for each circuit', 'Temperature', 'Cable colours'],
    correctAnswer: 1,
    explanation: 'Test documentation should record whether polarity was correct or incorrect (with details of any faults) for each circuit tested.',
    category: 'Polarity Testing',
    difficulty: 'Beginner',
    regulation: 'BS 7671:643.6'
  }
];
