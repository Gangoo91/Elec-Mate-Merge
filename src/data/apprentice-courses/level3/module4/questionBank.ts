// Level 3 Module 4: Fault Diagnosis - Question Bank
// 200 Questions covering fault finding, diagnosis methods, and repair procedures

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  section?: string;
  difficulty?: 'basic' | 'intermediate' | 'advanced';
}

export const module4Questions: Question[] = [
  // Section 4.1: Fault Types (Questions 1-30)
  {
    id: 1,
    question:
      'What type of fault occurs when current flows through an unintended path of low resistance?',
    options: ['Open circuit fault', 'Short circuit fault', 'Earth fault', 'High resistance joint'],
    correctAnswer: 1,
    explanation:
      'A short circuit fault occurs when current bypasses the normal load path through an unintended low resistance connection, causing excessive current flow.',
    section: '4.1',
    difficulty: 'basic',
  },
  {
    id: 2,
    question: 'An open circuit fault would typically be identified by:',
    options: [
      'Tripping of the MCB',
      'No voltage at the load',
      'Overheating of cables',
      'Flickering lights',
    ],
    correctAnswer: 1,
    explanation:
      'An open circuit fault breaks the current path completely, resulting in no voltage reaching the load equipment.',
    section: '4.1',
    difficulty: 'basic',
  },
  {
    id: 3,
    question: 'What is the primary danger of a high resistance joint?',
    options: [
      'Voltage drop only',
      'Fire risk from overheating',
      'Immediate circuit breaker trip',
      'No danger if protected by fuse',
    ],
    correctAnswer: 1,
    explanation:
      'High resistance joints generate heat when current flows through them (P=I²R), creating a significant fire risk as they may not be detected by protective devices.',
    section: '4.1',
    difficulty: 'intermediate',
  },
  {
    id: 4,
    question: 'An earth fault in a TN-S system would typically cause:',
    options: [
      'No effect if RCD fitted',
      'Operation of the overcurrent device or RCD',
      'Increased voltage to earth',
      'Higher current consumption',
    ],
    correctAnswer: 1,
    explanation:
      'In a TN-S system, an earth fault creates a low impedance path causing high fault current, which operates the overcurrent protective device or RCD.',
    section: '4.1',
    difficulty: 'intermediate',
  },
  {
    id: 5,
    question: 'Transient faults are characterised by:',
    options: [
      'Permanent damage requiring repair',
      'Self-clearing after a short time',
      'Always causing fires',
      'Only occurring in three-phase systems',
    ],
    correctAnswer: 1,
    explanation:
      'Transient faults are temporary conditions that clear themselves without causing permanent damage, often caused by lightning strikes or switching operations.',
    section: '4.1',
    difficulty: 'basic',
  },
  {
    id: 6,
    question: 'Which fault type is most likely to cause nuisance tripping of an RCD?',
    options: [
      'Phase to neutral short circuit',
      'Open circuit in lighting',
      'Intermittent earth leakage',
      'High resistance in heating element',
    ],
    correctAnswer: 2,
    explanation:
      'Intermittent earth leakage, often from moisture or degraded insulation, causes the RCD to detect imbalanced currents and trip even without a solid fault.',
    section: '4.1',
    difficulty: 'intermediate',
  },
  {
    id: 7,
    question: 'A neutral fault in a single-phase circuit would result in:',
    options: [
      'Higher current in the phase conductor',
      'Loss of supply to the load',
      'Reduced earth loop impedance',
      'No effect on circuit operation',
    ],
    correctAnswer: 1,
    explanation:
      'A broken neutral prevents current returning to the source, effectively creating an open circuit and loss of supply to connected loads.',
    section: '4.1',
    difficulty: 'basic',
  },
  {
    id: 8,
    question: 'What type of fault causes uneven loading in a three-phase system?',
    options: [
      'Short circuit fault',
      'Phase imbalance',
      'Earth loop fault',
      'Transient overvoltage',
    ],
    correctAnswer: 1,
    explanation:
      'Phase imbalance occurs when loads are unevenly distributed across phases, causing different currents in each phase conductor and neutral current.',
    section: '4.1',
    difficulty: 'intermediate',
  },
  {
    id: 9,
    question: 'An insulation breakdown between phase and earth would be classified as:',
    options: ['Open circuit fault', 'Short circuit fault', 'Earth fault', 'Neutral fault'],
    correctAnswer: 2,
    explanation:
      'When insulation fails between a phase conductor and earth, it creates an earth fault allowing current to flow through the earth path.',
    section: '4.1',
    difficulty: 'basic',
  },
  {
    id: 10,
    question: 'Series faults in a circuit typically cause:',
    options: [
      'Increased current flow',
      'Reduced current flow or open circuit',
      'Earth leakage current',
      'Voltage rise at the load',
    ],
    correctAnswer: 1,
    explanation:
      'Series faults (such as broken conductors or poor connections) increase resistance in the circuit path, reducing current flow or causing complete interruption.',
    section: '4.1',
    difficulty: 'intermediate',
  },
  {
    id: 11,
    question: 'A cross-polarity fault occurs when:',
    options: [
      'Voltage exceeds design limits',
      'Phase and neutral connections are reversed',
      'Two phases are connected together',
      'Earth and neutral are swapped',
    ],
    correctAnswer: 1,
    explanation:
      'Cross-polarity (reversed polarity) happens when phase and neutral are incorrectly connected, potentially leaving equipment live when switched off.',
    section: '4.1',
    difficulty: 'basic',
  },
  {
    id: 12,
    question: 'What effect does a borrowed neutral have in a multi-circuit installation?',
    options: [
      'Improved circuit protection',
      'No effect on safety',
      'Loss of RCD protection for affected circuits',
      'Reduced energy consumption',
    ],
    correctAnswer: 2,
    explanation:
      "A borrowed neutral (shared between circuits) defeats RCD protection as the currents in phase and neutral don't match, causing nuisance tripping or failure to trip on genuine faults.",
    section: '4.1',
    difficulty: 'advanced',
  },
  {
    id: 13,
    question: 'Arcing faults are particularly dangerous because they:',
    options: [
      'Always trip MCBs immediately',
      'Can sustain at low currents below protective device thresholds',
      'Only occur in outdoor installations',
      'Are easily visible',
    ],
    correctAnswer: 1,
    explanation:
      "Arcing faults can sustain at relatively low currents that don't trip conventional overcurrent devices, while generating enough heat to ignite surrounding materials.",
    section: '4.1',
    difficulty: 'advanced',
  },
  {
    id: 14,
    question: 'A phase-to-phase fault in a three-phase system would cause:',
    options: [
      'RCD operation only',
      'Very high fault current',
      'No protective device operation',
      'Gradual voltage reduction',
    ],
    correctAnswer: 1,
    explanation:
      'Phase-to-phase faults create a low impedance path between two phase conductors, resulting in very high fault currents that should operate overcurrent protection rapidly.',
    section: '4.1',
    difficulty: 'intermediate',
  },
  {
    id: 15,
    question: 'Thermal damage to cable insulation typically results from:',
    options: [
      'Undervoltage conditions',
      'Sustained overcurrent or poor terminations',
      'Low ambient temperature',
      'Correctly rated protection',
    ],
    correctAnswer: 1,
    explanation:
      'Thermal damage occurs when cables carry more current than their rating or when high resistance terminations generate heat, degrading the insulation over time.',
    section: '4.1',
    difficulty: 'intermediate',
  },
  {
    id: 16,
    question: 'What distinguishes a bolted fault from an arcing fault?',
    options: [
      'Bolted faults are less dangerous',
      'Bolted faults have solid metal-to-metal contact',
      'Arcing faults have higher current',
      'There is no practical difference',
    ],
    correctAnswer: 1,
    explanation:
      'A bolted fault has solid metallic contact creating very low resistance and maximum fault current, while arcing faults have higher resistance due to the arc gap.',
    section: '4.1',
    difficulty: 'advanced',
  },
  {
    id: 17,
    question: 'Voltage drop faults in long cable runs are categorised as:',
    options: ['Earth faults', 'Series faults', 'Parallel faults', 'Not classified as faults'],
    correctAnswer: 1,
    explanation:
      'Excessive voltage drop due to cable resistance is a series fault condition, as the resistance is in series with the load reducing available voltage.',
    section: '4.1',
    difficulty: 'intermediate',
  },
  {
    id: 18,
    question: 'A CPC (Circuit Protective Conductor) fault would most likely:',
    options: [
      'Increase earth fault loop impedance',
      'Cause immediate MCB operation',
      'Have no safety implications',
      'Reduce shock risk',
    ],
    correctAnswer: 0,
    explanation:
      "A fault in the CPC increases earth fault loop impedance, potentially to levels where protective devices won't operate quickly enough during an earth fault.",
    section: '4.1',
    difficulty: 'intermediate',
  },
  {
    id: 19,
    question: 'Sympathetic tripping in a distribution system is caused by:',
    options: [
      'Correctly coordinated protection',
      'Fault current flowing through multiple protective devices',
      'Undervoltage release operation',
      'Manual switching errors',
    ],
    correctAnswer: 1,
    explanation:
      'Sympathetic tripping occurs when a fault current flows through upstream protective devices, causing them to operate along with the device meant to clear the fault.',
    section: '4.1',
    difficulty: 'advanced',
  },
  {
    id: 20,
    question: 'Which fault type would cause a motor to run slowly and overheat?',
    options: [
      'Complete open circuit',
      'Short circuit in windings',
      'Single phasing (loss of one phase)',
      'Earth fault to frame',
    ],
    correctAnswer: 2,
    explanation:
      'Single phasing causes a three-phase motor to run on only two phases, producing reduced torque, running slowly under load, and overheating due to unbalanced currents.',
    section: '4.1',
    difficulty: 'intermediate',
  },
  {
    id: 21,
    question: 'Tracking faults on insulation surfaces are caused by:',
    options: [
      'Excessive current flow',
      'Carbonised paths from surface contamination',
      'Mechanical damage only',
      'Correct cable selection',
    ],
    correctAnswer: 1,
    explanation:
      'Tracking occurs when contamination on insulation surfaces becomes conductive and carbonises due to small leakage currents, progressively creating a fault path.',
    section: '4.1',
    difficulty: 'advanced',
  },
  {
    id: 22,
    question: 'A failing contactor in a motor circuit might present as:',
    options: [
      'Smooth motor operation',
      'Intermittent starting or chattering',
      'Reduced motor speed only',
      'No observable symptoms',
    ],
    correctAnswer: 1,
    explanation:
      'Failing contactor contacts can cause intermittent power to the motor, chattering from poor holding, or arcing that damages contacts further.',
    section: '4.1',
    difficulty: 'intermediate',
  },
  {
    id: 23,
    question: 'What type of fault does an AFDD (Arc Fault Detection Device) protect against?',
    options: [
      'Earth faults only',
      'Overloads only',
      'Series and parallel arc faults',
      'Voltage surges',
    ],
    correctAnswer: 2,
    explanation:
      'AFDDs are specifically designed to detect the characteristic high-frequency signatures of dangerous series and parallel arc faults that may not trip conventional protection.',
    section: '4.1',
    difficulty: 'intermediate',
  },
  {
    id: 24,
    question: 'Corrosion at a cable termination is classified as:',
    options: [
      'An earth fault',
      'A high resistance fault',
      'An open circuit',
      'Not a fault condition',
    ],
    correctAnswer: 1,
    explanation:
      'Corrosion increases the resistance at terminations, creating a high resistance joint that can cause overheating and voltage drop under load.',
    section: '4.1',
    difficulty: 'basic',
  },
  {
    id: 25,
    question: 'A broken neutral in a three-phase four-wire system could cause:',
    options: [
      'Equal phase voltages',
      'Dangerous overvoltage on lightly loaded phases',
      'Automatic load balancing',
      'Reduced fault current',
    ],
    correctAnswer: 1,
    explanation:
      'A broken neutral causes the star point to float, resulting in voltage redistribution where lightly loaded phases may experience dangerous overvoltage.',
    section: '4.1',
    difficulty: 'advanced',
  },
  {
    id: 26,
    question: 'Partial discharge in cable insulation indicates:',
    options: [
      'Normal operation',
      'Insulation degradation beginning',
      'Perfect insulation condition',
      'Overcurrent protection needed',
    ],
    correctAnswer: 1,
    explanation:
      'Partial discharge is localised breakdown of insulation that indicates degradation has started, potentially leading to complete insulation failure if not addressed.',
    section: '4.1',
    difficulty: 'advanced',
  },
  {
    id: 27,
    question:
      'What fault condition would cause an electric shower to have reduced water temperature?',
    options: ['Earth fault', 'Open circuit heating element', 'Short circuit', 'Correct operation'],
    correctAnswer: 1,
    explanation:
      'A partial open circuit in the heating element (such as one element failing in a dual element shower) reduces heating power, resulting in lower water temperature.',
    section: '4.1',
    difficulty: 'intermediate',
  },
  {
    id: 28,
    question: 'Harmonics in electrical systems can be considered as:',
    options: [
      'Not a problem in modern systems',
      'A type of power quality fault',
      'Only affecting three-phase systems',
      'Beneficial for motor operation',
    ],
    correctAnswer: 1,
    explanation:
      'Harmonics are a power quality issue causing additional heating in conductors and equipment, neutral overload in three-phase systems, and interference with sensitive electronics.',
    section: '4.1',
    difficulty: 'advanced',
  },
  {
    id: 29,
    question: 'A fault causing flickering lights at random intervals is likely:',
    options: [
      'Normal mains voltage variation',
      'Loose connection (high resistance joint)',
      'Correctly operating dimmer',
      'RCD nuisance tripping',
    ],
    correctAnswer: 1,
    explanation:
      'Random flickering typically indicates a loose or high resistance connection that intermittently affects the circuit, creating variable voltage drop.',
    section: '4.1',
    difficulty: 'basic',
  },
  {
    id: 30,
    question: 'Which fault would cause an MCB to trip only under high load conditions?',
    options: [
      'Earth fault',
      'Borderline overcurrent due to undersized cable',
      'Short circuit fault',
      'RCD fault',
    ],
    correctAnswer: 1,
    explanation:
      'If cables are undersized or protection borderline, the circuit may operate normally at low loads but trip on thermal overload when current increases.',
    section: '4.1',
    difficulty: 'intermediate',
  },

  // Section 4.2: Diagnosis Methods (Questions 31-65)
  {
    id: 31,
    question: 'The half-split method of fault finding involves:',
    options: [
      'Replacing half the components',
      'Testing at the midpoint to eliminate half the circuit',
      'Using half voltage for testing',
      'Checking every other component',
    ],
    correctAnswer: 1,
    explanation:
      'The half-split method tests at the circuit midpoint to determine which half contains the fault, then repeating the process to efficiently locate the fault.',
    section: '4.2',
    difficulty: 'basic',
  },
  {
    id: 32,
    question: 'Before beginning fault diagnosis, the first step should be:',
    options: [
      'Replace the most likely faulty component',
      'Gather information from the user about symptoms',
      'Start testing at random points',
      'Switch off all circuits',
    ],
    correctAnswer: 1,
    explanation:
      'Gathering information about symptoms, when the fault occurs, and what changed before it started helps focus diagnosis and avoid wasting time.',
    section: '4.2',
    difficulty: 'basic',
  },
  {
    id: 33,
    question: "The 'six point' approach to fault finding includes all EXCEPT:",
    options: ['Collect evidence', 'Analyse evidence', 'Locate the fault', 'Replace all components'],
    correctAnswer: 3,
    explanation:
      'The six-point approach is: collect evidence, analyse evidence, locate fault, determine cause, rectify fault, and test. Wholesale component replacement is not part of systematic diagnosis.',
    section: '4.2',
    difficulty: 'intermediate',
  },
  {
    id: 34,
    question: "When using the 'input to output' method, you start testing at:",
    options: [
      'The load equipment',
      'The supply point',
      'The middle of the circuit',
      'The protective device',
    ],
    correctAnswer: 1,
    explanation:
      'Input to output method starts testing at the supply end and progresses systematically toward the load, checking each stage until the fault is found.',
    section: '4.2',
    difficulty: 'basic',
  },
  {
    id: 35,
    question: 'What is the main advantage of the output to input fault finding method?',
    options: [
      'Always faster',
      'Useful when fault symptoms appear at the load',
      'Requires less testing equipment',
      'Only method allowed by regulations',
    ],
    correctAnswer: 1,
    explanation:
      'Output to input is effective when symptoms manifest at the load end, as you work backwards from the known problem toward the supply.',
    section: '4.2',
    difficulty: 'intermediate',
  },
  {
    id: 36,
    question: 'Visual inspection during fault finding should identify:',
    options: [
      'Only major damage',
      'Signs of overheating, damage, or poor workmanship',
      'Nothing useful in electrical work',
      'Only tripped protective devices',
    ],
    correctAnswer: 1,
    explanation:
      'Visual inspection can reveal overheating discolouration, physical damage, burnt components, poor connections, and other visible fault indicators.',
    section: '4.2',
    difficulty: 'basic',
  },
  {
    id: 37,
    question: 'The substitution method of fault diagnosis involves:',
    options: [
      'Testing voltage at each point',
      'Replacing suspect components with known good ones',
      'Measuring insulation resistance',
      'Checking documentation only',
    ],
    correctAnswer: 1,
    explanation:
      'Substitution involves replacing a suspect component with one known to be good to determine if that component was faulty.',
    section: '4.2',
    difficulty: 'basic',
  },
  {
    id: 38,
    question: 'Why is it important to determine the cause of a fault, not just locate it?',
    options: [
      'To write longer reports',
      'To prevent recurrence of the same fault',
      'Regulations require root cause analysis always',
      'To justify higher charges',
    ],
    correctAnswer: 1,
    explanation:
      'Understanding why a fault occurred prevents recurrence. Simply replacing a failed component without addressing the cause may lead to repeated failures.',
    section: '4.2',
    difficulty: 'intermediate',
  },
  {
    id: 39,
    question:
      'When fault finding on a motor control circuit, which components should be checked first?',
    options: [
      'The motor windings',
      'The easiest to access components (fuses, contactors)',
      'Always the most expensive component',
      'Components requiring special tools',
    ],
    correctAnswer: 1,
    explanation:
      'Start with easily accessible and commonly failing components like fuses, overloads, and contactors before moving to more complex motor testing.',
    section: '4.2',
    difficulty: 'intermediate',
  },
  {
    id: 40,
    question: 'Symptom analysis in fault finding requires:',
    options: [
      'Ignoring user reports',
      'Understanding what each symptom indicates about potential causes',
      'Only using test instruments',
      'Replacing components until fixed',
    ],
    correctAnswer: 1,
    explanation:
      'Symptom analysis involves understanding what each observed symptom tells you about possible fault locations and causes.',
    section: '4.2',
    difficulty: 'intermediate',
  },
  {
    id: 41,
    question: 'A fault that only appears intermittently is best diagnosed by:',
    options: [
      'Ignoring it as unimportant',
      'Continuous monitoring and recreating fault conditions',
      'Immediately replacing all components',
      'Waiting until it becomes permanent',
    ],
    correctAnswer: 1,
    explanation:
      'Intermittent faults require monitoring under various conditions and attempting to recreate the circumstances that trigger the fault.',
    section: '4.2',
    difficulty: 'intermediate',
  },
  {
    id: 42,
    question: 'What documentation should be consulted during fault finding?',
    options: [
      'Only the electricity bill',
      'Circuit diagrams, equipment manuals, and previous test records',
      'No documentation is needed',
      'Only building plans',
    ],
    correctAnswer: 1,
    explanation:
      'Circuit diagrams show connections and components, manuals provide specifications and troubleshooting guides, and previous records may show patterns or known issues.',
    section: '4.2',
    difficulty: 'basic',
  },
  {
    id: 43,
    question: "The 'most probable cause first' approach suggests:",
    options: [
      'Testing the most expensive component first',
      'Checking common failure points before rare ones',
      'Random testing is equally effective',
      'Ignoring historical fault data',
    ],
    correctAnswer: 1,
    explanation:
      'Efficient diagnosis checks common failure points and statistically probable causes first, based on experience and component reliability data.',
    section: '4.2',
    difficulty: 'intermediate',
  },
  {
    id: 44,
    question: 'When multiple faults are suspected, you should:',
    options: [
      'Fix all at once to save time',
      'Identify and fix one fault at a time, testing after each',
      'Assume they are unrelated',
      'Only fix the most obvious fault',
    ],
    correctAnswer: 1,
    explanation:
      "Fixing and testing one fault at a time ensures you identify all issues and don't mask one fault while fixing another.",
    section: '4.2',
    difficulty: 'intermediate',
  },
  {
    id: 45,
    question: "What is the purpose of 'stress testing' during fault diagnosis?",
    options: [
      'To break the equipment',
      "To recreate fault conditions that don't appear at normal load",
      'Only required for new installations',
      "To test the electrician's patience",
    ],
    correctAnswer: 1,
    explanation:
      "Stress testing applies higher loads or specific conditions to recreate intermittent faults that don't appear under normal operating conditions.",
    section: '4.2',
    difficulty: 'advanced',
  },
  {
    id: 46,
    question: 'If a circuit trips immediately upon reset, this suggests:',
    options: [
      'The protective device is faulty',
      'A persistent fault still exists on the circuit',
      'Normal operation',
      'The load is too small',
    ],
    correctAnswer: 1,
    explanation:
      "Immediate tripping indicates a fault is still present - either a short circuit or earth fault that hasn't been cleared.",
    section: '4.2',
    difficulty: 'basic',
  },
  {
    id: 47,
    question: 'Thermal imaging during fault finding is useful for detecting:',
    options: [
      'Open circuits only',
      'Hot spots indicating high resistance joints or overloading',
      'Voltage levels',
      'Frequency variations',
    ],
    correctAnswer: 1,
    explanation:
      'Thermal imaging reveals hot spots caused by high resistance connections, overloaded conductors, or components operating above normal temperature.',
    section: '4.2',
    difficulty: 'intermediate',
  },
  {
    id: 48,
    question: "What does 'bracketing' the fault mean in diagnosis?",
    options: [
      'Putting a bracket around the fault',
      'Narrowing down the fault location to between two test points',
      'Testing outside normal parameters',
      'Ignoring the fault temporarily',
    ],
    correctAnswer: 1,
    explanation:
      'Bracketing involves testing to establish the fault is between two known points, then progressively narrowing the range until the exact location is found.',
    section: '4.2',
    difficulty: 'intermediate',
  },
  {
    id: 49,
    question: 'A function test after fault repair should verify:',
    options: [
      'The invoice is correct',
      'The equipment operates correctly under normal conditions',
      'Only that power is restored',
      'The fault finding method used',
    ],
    correctAnswer: 1,
    explanation:
      'Function testing confirms the repaired equipment operates correctly under normal conditions, ensuring the fault is properly rectified.',
    section: '4.2',
    difficulty: 'basic',
  },
  {
    id: 50,
    question: "When diagnosing a fault reported as 'no power', the first measurement should be:",
    options: [
      'Current at the load',
      'Voltage at the supply point',
      'Insulation resistance',
      'Earth loop impedance',
    ],
    correctAnswer: 1,
    explanation:
      'Verifying supply voltage at the origin establishes whether power is present before investigating further along the circuit.',
    section: '4.2',
    difficulty: 'basic',
  },
  {
    id: 51,
    question: 'Logic diagrams in fault finding are used to:',
    options: [
      'Replace practical testing',
      'Systematically work through possible causes',
      'Only for computer systems',
      'Record financial information',
    ],
    correctAnswer: 1,
    explanation:
      'Logic diagrams (flowcharts) guide systematic diagnosis through yes/no decisions, helping ensure all possibilities are considered.',
    section: '4.2',
    difficulty: 'intermediate',
  },
  {
    id: 52,
    question: 'Comparing measurements with known good values helps to:',
    options: [
      'Waste time',
      'Identify deviations that indicate faults',
      'Avoid using test equipment',
      'Confuse the diagnosis',
    ],
    correctAnswer: 1,
    explanation:
      'Comparing readings with manufacturer specifications or known good equipment highlights abnormal values that may indicate faults.',
    section: '4.2',
    difficulty: 'basic',
  },
  {
    id: 53,
    question: 'Why should you test with load connected when possible during diagnosis?',
    options: [
      'To make measurements easier',
      'Some faults only appear under load conditions',
      'Regulations require it always',
      'To increase energy consumption',
    ],
    correctAnswer: 1,
    explanation:
      'Some faults, particularly high resistance joints and borderline overcurrents, only manifest when current flows through the circuit under load.',
    section: '4.2',
    difficulty: 'intermediate',
  },
  {
    id: 54,
    question: 'Historical fault data for a circuit is valuable because it:',
    options: [
      'Has no relevance to current faults',
      'May reveal patterns or recurring issues',
      'Only matters for insurance claims',
      'Should be destroyed after each fault',
    ],
    correctAnswer: 1,
    explanation:
      'Historical data can reveal patterns, recurring issues, or deteriorating conditions that help diagnose current faults and prevent future ones.',
    section: '4.2',
    difficulty: 'intermediate',
  },
  {
    id: 55,
    question: "The 'divide and conquer' fault finding method is another term for:",
    options: ['Random testing', 'Half-split method', 'Visual inspection', 'Component replacement'],
    correctAnswer: 1,
    explanation:
      'Divide and conquer is another term for the half-split method, where the circuit is divided and tested to eliminate half at each step.',
    section: '4.2',
    difficulty: 'basic',
  },
  {
    id: 56,
    question: 'What should be verified before declaring a fault repair complete?',
    options: [
      'Only that power is restored',
      'Equipment operation, safety tests pass, and cause addressed',
      'Customer signature only',
      'The meter reading',
    ],
    correctAnswer: 1,
    explanation:
      'Complete repair verification includes confirming correct operation, passing relevant safety tests, and ensuring the root cause has been addressed.',
    section: '4.2',
    difficulty: 'intermediate',
  },
  {
    id: 57,
    question: 'When a fault causes one of several identical devices to malfunction, this suggests:',
    options: [
      'A supply problem',
      'A fault specific to that individual device or its circuit',
      'All devices will fail soon',
      'No fault exists',
    ],
    correctAnswer: 1,
    explanation:
      'If one device fails while others on the same supply work correctly, the fault is likely specific to that device or its individual circuit.',
    section: '4.2',
    difficulty: 'intermediate',
  },
  {
    id: 58,
    question: 'Unit substitution is most effective for diagnosing faults in:',
    options: [
      'Long cable runs',
      'Discrete components or modular equipment',
      'Building earthing systems',
      'Three-phase supplies',
    ],
    correctAnswer: 1,
    explanation:
      'Unit substitution works well for discrete components or modules that can be easily swapped to determine if they are the fault source.',
    section: '4.2',
    difficulty: 'intermediate',
  },
  {
    id: 59,
    question: 'Environmental conditions should be considered during fault diagnosis because:',
    options: [
      'They have no effect on electrical equipment',
      'Temperature, moisture, and contamination affect component operation',
      'Only outdoor installations are affected',
      'Building regulations require it',
    ],
    correctAnswer: 1,
    explanation:
      'Environmental factors like temperature extremes, moisture, contamination, and vibration can cause or contribute to electrical faults.',
    section: '4.2',
    difficulty: 'intermediate',
  },
  {
    id: 60,
    question: "A 'sneak circuit' fault is:",
    options: [
      "A hidden circuit path that isn't on the drawings",
      'An intentional design feature',
      'A standard safety circuit',
      'A cable buried in concrete',
    ],
    correctAnswer: 0,
    explanation:
      "Sneak circuits are unintended current paths through combinations of components that aren't shown on diagrams and can cause unexpected operation.",
    section: '4.2',
    difficulty: 'advanced',
  },
  {
    id: 61,
    question: 'Wriggle testing of connections is used to detect:',
    options: [
      'Insulation breakdown',
      'Loose or intermittent connections',
      'Earth faults',
      'Overcurrent conditions',
    ],
    correctAnswer: 1,
    explanation:
      'Physically moving connections while monitoring can reveal loose or intermittent connections that cause problems under vibration or movement.',
    section: '4.2',
    difficulty: 'basic',
  },
  {
    id: 62,
    question: 'When fault finding in complex control systems, schematics should be used to:',
    options: [
      'Make the job appear difficult',
      'Trace signal paths and understand circuit operation',
      'Avoid practical testing',
      'Increase billable hours',
    ],
    correctAnswer: 1,
    explanation:
      'Schematics enable understanding of how the control system should work, helping identify where the actual behaviour deviates from expected.',
    section: '4.2',
    difficulty: 'intermediate',
  },
  {
    id: 63,
    question: 'A fault tree analysis is a method of:',
    options: [
      'Planting trees near electrical installations',
      'Systematically mapping possible causes for a fault',
      'Only used in nuclear power stations',
      'Recording faults in trees',
    ],
    correctAnswer: 1,
    explanation:
      'Fault tree analysis is a systematic method of mapping all possible causes that could lead to a particular fault, helping ensure thorough diagnosis.',
    section: '4.2',
    difficulty: 'advanced',
  },
  {
    id: 64,
    question: 'The purpose of verifying test equipment before fault finding is to:',
    options: [
      'Delay starting work',
      'Ensure accurate measurements',
      'Satisfy regulations only',
      'Avoid using the equipment',
    ],
    correctAnswer: 1,
    explanation:
      "Verifying test equipment accuracy ensures measurements are reliable and don't lead to misdiagnosis due to faulty instruments.",
    section: '4.2',
    difficulty: 'basic',
  },
  {
    id: 65,
    question: 'After identifying a potential fault cause, it should be:',
    options: [
      'Immediately assumed correct',
      'Verified by testing before repair',
      'Ignored if inconvenient',
      'Reported but not confirmed',
    ],
    correctAnswer: 1,
    explanation:
      'Potential causes should be verified by testing to confirm they are actually the source of the fault before committing to repairs.',
    section: '4.2',
    difficulty: 'intermediate',
  },

  // Section 4.3: Test Equipment (Questions 66-95)
  {
    id: 66,
    question: 'A multimeter used for fault finding should have a minimum CAT rating of:',
    options: [
      'CAT I for all work',
      'CAT III for distribution circuits, CAT IV for origin',
      'CAT rating is optional',
      'Only CAT II is available',
    ],
    correctAnswer: 1,
    explanation:
      'Multimeters should be rated CAT III minimum for distribution work, CAT IV for measurements at or near the origin of installation.',
    section: '4.3',
    difficulty: 'intermediate',
  },
  {
    id: 67,
    question: 'What is the primary function of an insulation resistance tester (megger)?',
    options: [
      'Measure circuit current',
      'Test insulation quality between conductors or to earth',
      'Measure voltage only',
      'Test RCD operation',
    ],
    correctAnswer: 1,
    explanation:
      'An insulation resistance tester applies a DC test voltage to measure the resistance of insulation between conductors or between conductor and earth.',
    section: '4.3',
    difficulty: 'basic',
  },
  {
    id: 68,
    question: 'When using a voltage tester, you should first:',
    options: [
      'Test the unknown circuit',
      'Prove the tester works on a known live source',
      'Replace the batteries',
      'Calibrate it to zero',
    ],
    correctAnswer: 1,
    explanation:
      "The prove-test-prove sequence requires checking the tester on a known live source before and after testing to ensure it's working correctly.",
    section: '4.3',
    difficulty: 'basic',
  },
  {
    id: 69,
    question: 'An earth fault loop impedance tester measures:',
    options: [
      'Only the earth electrode resistance',
      'Total impedance of the earth fault path back to source',
      'Voltage between phase and earth',
      'Current flowing to earth',
    ],
    correctAnswer: 1,
    explanation:
      'The earth fault loop impedance tester measures the complete path impedance from the test point through the earth return to the source and back.',
    section: '4.3',
    difficulty: 'intermediate',
  },
  {
    id: 70,
    question: 'What safety precaution is essential when using a megger for insulation testing?',
    options: [
      'Keep the circuit live',
      'Ensure circuit is isolated and discharged',
      'Only test on rainy days',
      'No precautions needed',
    ],
    correctAnswer: 1,
    explanation:
      'The circuit must be isolated and safe before insulation testing, and care taken as test voltages can be hazardous and may damage electronic components.',
    section: '4.3',
    difficulty: 'basic',
  },
  {
    id: 71,
    question: 'A clamp meter is useful for fault finding because it:',
    options: [
      'Requires breaking into the circuit',
      'Can measure current without disconnecting conductors',
      'Only works on single-phase',
      'Is more accurate than all other meters',
    ],
    correctAnswer: 1,
    explanation:
      'Clamp meters measure current by clamping around the conductor, allowing measurement in live circuits without disconnection.',
    section: '4.3',
    difficulty: 'basic',
  },
  {
    id: 72,
    question:
      'When testing for voltage presence, a two-pole voltage tester is preferred over a neon screwdriver because:',
    options: [
      'Neon testers are more accurate',
      'Two-pole testers confirm voltage between points, not just presence',
      'Neon testers are more expensive',
      'There is no difference',
    ],
    correctAnswer: 1,
    explanation:
      'Two-pole testers confirm actual voltage between two points and are more reliable, while neon testers may give false indications.',
    section: '4.3',
    difficulty: 'intermediate',
  },
  {
    id: 73,
    question: 'An RCD tester is used to verify:',
    options: [
      'Only that the RCD is present',
      'Trip time and operating current of the RCD',
      'Cable insulation resistance',
      'Earth electrode resistance',
    ],
    correctAnswer: 1,
    explanation:
      'RCD testers inject measured earth leakage current to verify the RCD trips within required time limits at its rated operating current.',
    section: '4.3',
    difficulty: 'basic',
  },
  {
    id: 74,
    question: 'Low ohm continuity testers typically use a test current of:',
    options: [
      'Less than 1 mA',
      'At least 200 mA to ensure reliable measurement',
      '10 A for accurate readings',
      'Current is not used in continuity testing',
    ],
    correctAnswer: 1,
    explanation:
      'A minimum of 200 mA test current ensures reliable low resistance measurements, overcoming contact resistance and other measurement issues.',
    section: '4.3',
    difficulty: 'intermediate',
  },
  {
    id: 75,
    question: 'What is the purpose of a proving unit for voltage testers?',
    options: [
      'To charge the tester batteries',
      'To provide a known voltage source to verify tester operation',
      'To calibrate the tester',
      'To measure insulation resistance',
    ],
    correctAnswer: 1,
    explanation:
      'A proving unit provides a safe known voltage source to verify the voltage tester is working correctly before and after testing.',
    section: '4.3',
    difficulty: 'basic',
  },
  {
    id: 76,
    question: 'When should test instrument calibration be verified?',
    options: [
      'Only when purchased new',
      'Periodically and after any damage or repair',
      'Never, instruments are always accurate',
      'Only for legal requirements',
    ],
    correctAnswer: 1,
    explanation:
      'Test instruments should be calibrated periodically (typically annually) and rechecked after any damage, repair, or if readings seem suspect.',
    section: '4.3',
    difficulty: 'intermediate',
  },
  {
    id: 77,
    question: 'A socket tester with indicators can identify:',
    options: [
      'All possible faults',
      'Common wiring faults like reversed polarity, missing earth',
      'Insulation resistance values',
      'Earth fault loop impedance',
    ],
    correctAnswer: 1,
    explanation:
      'Socket testers identify common wiring faults through indicator combinations, but cannot identify all faults (e.g., neutral-earth reversal) or measure values.',
    section: '4.3',
    difficulty: 'basic',
  },
  {
    id: 78,
    question: 'Phase rotation testers are used when:',
    options: [
      'Testing single-phase circuits',
      'Verifying correct phase sequence in three-phase supplies',
      'Measuring voltage drop',
      'Testing insulation resistance',
    ],
    correctAnswer: 1,
    explanation:
      'Phase rotation testers confirm the phase sequence (L1-L2-L3) is correct, which is critical for three-phase motors and equipment.',
    section: '4.3',
    difficulty: 'intermediate',
  },
  {
    id: 79,
    question: 'The impedance of a multimeter on voltage range should be:',
    options: [
      'As low as possible',
      'At least 1 MΩ per volt of range selected',
      'Exactly 50Ω',
      'Irrelevant to measurements',
    ],
    correctAnswer: 1,
    explanation:
      'High input impedance (typically 10 MΩ or more) prevents the meter from loading the circuit and affecting the voltage being measured.',
    section: '4.3',
    difficulty: 'advanced',
  },
  {
    id: 80,
    question:
      'When using test leads with a multimeter, what condition indicates replacement is needed?',
    options: [
      'Slight colour fading',
      'Cracked insulation, damaged probes, or intermittent readings',
      'Being over 1 year old',
      'Any visible wear',
    ],
    correctAnswer: 1,
    explanation:
      'Test leads should be replaced when insulation is cracked or damaged, probes are bent or worn, or readings are intermittent indicating internal damage.',
    section: '4.3',
    difficulty: 'basic',
  },
  {
    id: 81,
    question: 'An oscilloscope is useful in fault finding for:',
    options: [
      'Measuring DC voltage only',
      'Viewing waveforms to diagnose complex signal problems',
      'Testing RCD operation',
      'Measuring cable length',
    ],
    correctAnswer: 1,
    explanation:
      'Oscilloscopes display voltage waveforms, enabling diagnosis of complex issues like harmonics, interference, switching problems, and timing issues.',
    section: '4.3',
    difficulty: 'advanced',
  },
  {
    id: 82,
    question: 'A multifunction tester combines the functions of:',
    options: [
      'Voltage and current meters only',
      'Insulation, continuity, RCD, and loop impedance testing',
      'Only basic multimeter functions',
      'Thermal imaging and metering',
    ],
    correctAnswer: 1,
    explanation:
      'Multifunction installation testers combine insulation resistance, continuity, earth fault loop, RCD testing, and often more in one instrument.',
    section: '4.3',
    difficulty: 'intermediate',
  },
  {
    id: 83,
    question: 'When using a cable locator and tracer, the transmitter should be:',
    options: [
      'Connected to an energised circuit',
      'Connected to an isolated cable with other end disconnected',
      'Only used outdoors',
      'Connected to the building earth',
    ],
    correctAnswer: 1,
    explanation:
      'Cable locators work best when the transmitter is connected to an isolated cable with the far end open, creating a clear signal for tracing.',
    section: '4.3',
    difficulty: 'intermediate',
  },
  {
    id: 84,
    question: "What is the purpose of the 'null' function on some insulation testers?",
    options: [
      'To zero out test lead resistance',
      'To turn off the instrument',
      'To increase test voltage',
      'To test continuity',
    ],
    correctAnswer: 0,
    explanation:
      'The null function subtracts the resistance of the test leads from readings, ensuring only the circuit under test is measured.',
    section: '4.3',
    difficulty: 'intermediate',
  },
  {
    id: 85,
    question: 'Non-contact voltage detectors (volt sticks) are suitable for:',
    options: [
      'Accurate voltage measurement',
      'Initial indication of voltage presence only',
      'Testing insulation resistance',
      'Measuring current',
    ],
    correctAnswer: 1,
    explanation:
      'Non-contact detectors provide initial indication of voltage presence but should be followed up with a proper voltage tester for confirmation.',
    section: '4.3',
    difficulty: 'basic',
  },
  {
    id: 86,
    question: 'A power quality analyser can measure:',
    options: [
      'Only voltage',
      'Harmonics, power factor, voltage dips, and other quality parameters',
      'Earth fault loop impedance',
      'Cable insulation resistance',
    ],
    correctAnswer: 1,
    explanation:
      'Power quality analysers measure various parameters including harmonics, power factor, voltage disturbances, and energy consumption patterns.',
    section: '4.3',
    difficulty: 'advanced',
  },
  {
    id: 87,
    question: 'When testing PEN conductor continuity in a PME system, the test should be:',
    options: [
      'Not required',
      'Performed with a low reading ohmmeter to verify integrity',
      'Done at 500V DC',
      'Only visual inspection needed',
    ],
    correctAnswer: 1,
    explanation:
      'PEN conductor continuity should be verified with a low resistance ohmmeter to ensure the combined protective and neutral conductor is intact.',
    section: '4.3',
    difficulty: 'intermediate',
  },
  {
    id: 88,
    question: 'Digital multimeters are preferred over analogue for fault finding because:',
    options: [
      'They are always more accurate',
      'Easy to read, auto-ranging, and can capture transients',
      'Analogue meters are no longer available',
      'Digital meters are cheaper',
    ],
    correctAnswer: 1,
    explanation:
      'Digital meters offer easy reading, often auto-range, and many can capture minimum/maximum values or transients useful in fault diagnosis.',
    section: '4.3',
    difficulty: 'intermediate',
  },
  {
    id: 89,
    question: 'What precaution is necessary when measuring high voltages with a multimeter?',
    options: [
      'No special precautions',
      'Ensure CAT rating is adequate and use correct probes',
      'Always use the highest range',
      'Hold the meter in both hands',
    ],
    correctAnswer: 1,
    explanation:
      'The multimeter CAT rating must match or exceed the circuit category, and properly rated test leads with shrouded probes should be used.',
    section: '4.3',
    difficulty: 'intermediate',
  },
  {
    id: 90,
    question: 'A current transformer clamp extends multimeter capability by:',
    options: [
      'Increasing voltage measurement range',
      'Allowing measurement of high currents scaled to meter range',
      'Testing insulation resistance',
      'Measuring earth loop impedance',
    ],
    correctAnswer: 1,
    explanation:
      "Current transformer clamps scale high circuit currents to a lower output suitable for the multimeter's mA or voltage input.",
    section: '4.3',
    difficulty: 'intermediate',
  },
  {
    id: 91,
    question: 'Before starting insulation resistance testing, you should ensure:',
    options: [
      'All circuits are live',
      'Electronic equipment is disconnected and circuit is isolated',
      'Testing voltage matches supply voltage',
      'Only visual inspection is needed',
    ],
    correctAnswer: 1,
    explanation:
      'Sensitive electronic equipment must be disconnected as high DC test voltages can damage it, and the circuit must be safely isolated.',
    section: '4.3',
    difficulty: 'basic',
  },
  {
    id: 92,
    question: 'A milliohm meter is specifically designed for:',
    options: [
      'High voltage testing',
      'Very low resistance measurements like busbar joints',
      'Insulation testing',
      'RCD testing',
    ],
    correctAnswer: 1,
    explanation:
      'Milliohm meters measure very low resistances accurately, important for verifying busbar joints, cable connections, and contact resistance.',
    section: '4.3',
    difficulty: 'intermediate',
  },
  {
    id: 93,
    question:
      'When using an earth electrode resistance tester, the auxiliary electrodes should be:',
    options: [
      'Close to the electrode under test',
      'Positioned well away from the electrode under test',
      'Not required for testing',
      'Connected to the main earth terminal',
    ],
    correctAnswer: 1,
    explanation:
      'Auxiliary electrodes must be positioned away from the electrode under test to avoid overlap of resistance areas and ensure accurate measurement.',
    section: '4.3',
    difficulty: 'advanced',
  },
  {
    id: 94,
    question: 'Test instrument accuracy is typically expressed as:',
    options: [
      'A colour code',
      'Percentage of reading plus/minus digits',
      'Only in manufacturer advertising',
      'By the size of the display',
    ],
    correctAnswer: 1,
    explanation:
      'Accuracy is usually specified as ±% of reading ± number of digits (or counts), indicating potential measurement error.',
    section: '4.3',
    difficulty: 'intermediate',
  },
  {
    id: 95,
    question: 'When selecting test equipment for fault finding, the key considerations are:',
    options: [
      'Price only',
      'Measurement range, accuracy, safety rating, and suitability for task',
      'Brand preference',
      'Colour of the instrument',
    ],
    correctAnswer: 1,
    explanation:
      'Test equipment selection should consider measurement requirements, accuracy needed, appropriate safety category, and fitness for the specific task.',
    section: '4.3',
    difficulty: 'intermediate',
  },

  // Section 4.4: Safe Isolation (Questions 96-125)
  {
    id: 96,
    question: 'According to GS38, what is the maximum exposed probe tip length for test probes?',
    options: ['10mm', '4mm', 'No limit specified', '2mm with finger guard'],
    correctAnswer: 3,
    explanation:
      'GS38 specifies maximum 4mm exposed probe tip, or 2mm with finger barriers/guards for protection against accidental contact.',
    section: '4.4',
    difficulty: 'basic',
  },
  {
    id: 97,
    question: 'The correct sequence for safe isolation is:',
    options: [
      'Isolate, lock off, prove dead, test equipment',
      'Identify, isolate, secure, prove dead, prove tester',
      'Turn off, start work immediately',
      'Prove dead, then isolate',
    ],
    correctAnswer: 1,
    explanation:
      'Safe isolation follows: identify circuit, isolate from supply, secure isolation (lock off), prove tester, test for dead, prove tester again.',
    section: '4.4',
    difficulty: 'basic',
  },
  {
    id: 98,
    question: 'Why is it necessary to prove the voltage tester before AND after testing for dead?',
    options: [
      'Regulations require it for paperwork',
      "To ensure the tester is working correctly and hasn't failed during testing",
      'It makes no practical difference',
      'Only the first test matters',
    ],
    correctAnswer: 1,
    explanation:
      "Proving before confirms the tester works, proving after confirms it still works - if the tester failed during testing, a false 'dead' reading could result.",
    section: '4.4',
    difficulty: 'basic',
  },
  {
    id: 99,
    question: 'When isolating a circuit, all means of supply must be isolated including:',
    options: [
      'Only the main switch',
      'Phase conductors only',
      'All live conductors - phase, neutral (and other phases in 3-phase)',
      'Only the phase that appears to be faulty',
    ],
    correctAnswer: 2,
    explanation:
      'All live conductors must be isolated - in three-phase circuits this means all phases and neutral, not just some conductors.',
    section: '4.4',
    difficulty: 'intermediate',
  },
  {
    id: 100,
    question: 'A lock-off device should be:',
    options: [
      "Optional if others know you're working",
      'Unique to the person working, with their key held securely',
      'Shared between team members',
      'Only used on high voltage equipment',
    ],
    correctAnswer: 1,
    explanation:
      'Each person working should fit their own lock with a unique key that they retain, ensuring only they can remove it when safe.',
    section: '4.4',
    difficulty: 'basic',
  },
  {
    id: 101,
    question: 'When testing for dead, you should test between:',
    options: [
      'Phase and neutral only',
      'All live conductors to each other and to earth',
      'Only phase to earth',
      'Any convenient terminals',
    ],
    correctAnswer: 1,
    explanation:
      'All combinations must be tested: phase(s) to neutral, phase(s) to earth, and neutral to earth (and between phases in three-phase circuits).',
    section: '4.4',
    difficulty: 'intermediate',
  },
  {
    id: 102,
    question: 'The minimum information on an isolation warning notice should include:',
    options: [
      "Just 'Do Not Switch On'",
      'Name of person, nature of work, date and time',
      'Only the circuit number',
      'Company logo only',
    ],
    correctAnswer: 1,
    explanation:
      'Warning notices should clearly identify who is working, what work is being done, and when it started, so others understand the isolation.',
    section: '4.4',
    difficulty: 'basic',
  },
  {
    id: 103,
    question: 'If the point of isolation cannot be locked off, you should:',
    options: [
      'Proceed anyway if quick job',
      'Remove fuses/links and retain them, post notices, take additional precautions',
      'Ask someone to guard the switch',
      'Work live instead',
    ],
    correctAnswer: 1,
    explanation:
      "Where locking off isn't possible, remove fuses/links and keep them on your person, post prominent notices, and consider additional controls.",
    section: '4.4',
    difficulty: 'intermediate',
  },
  {
    id: 104,
    question: 'Why must capacitors be discharged before working on isolated equipment?',
    options: [
      'Capacitors cannot store charge',
      'They may retain dangerous voltage even after isolation',
      "It's only necessary for very large capacitors",
      'Capacitors automatically discharge',
    ],
    correctAnswer: 1,
    explanation:
      'Capacitors can store significant charge after isolation, retaining potentially lethal voltages that must be safely discharged before work begins.',
    section: '4.4',
    difficulty: 'intermediate',
  },
  {
    id: 105,
    question: 'The requirement to test for dead applies:',
    options: [
      'Only on main supply cables',
      'To all conductors that could become live',
      'Only when specifically requested',
      'Not if the circuit was recently installed',
    ],
    correctAnswer: 1,
    explanation:
      'All conductors that could potentially become live must be tested for dead, regardless of circuit type or installation age.',
    section: '4.4',
    difficulty: 'basic',
  },
  {
    id: 106,
    question: "What is a 'proving unit' used for in safe isolation?",
    options: [
      'Locking off switches',
      'Verifying voltage tester operation with a known source',
      'Measuring current flow',
      'Testing insulation resistance',
    ],
    correctAnswer: 1,
    explanation:
      'A proving unit provides a known voltage source to verify the voltage indicator/tester is working correctly during the prove-test-prove sequence.',
    section: '4.4',
    difficulty: 'basic',
  },
  {
    id: 107,
    question: 'If working on a circuit supplied by a generator, isolation must consider:',
    options: [
      'Only the normal supply',
      'Both normal supply AND any standby/generator supply',
      'Generator supply automatically isolates',
      'Only the changeover switch',
    ],
    correctAnswer: 1,
    explanation:
      'Circuits with alternative supplies must be isolated from all possible sources, including standby generators and auto-changeover systems.',
    section: '4.4',
    difficulty: 'intermediate',
  },
  {
    id: 108,
    question: "The term 'adjacent live conductors' in safe isolation refers to:",
    options: [
      'Conductors in the same circuit',
      'Nearby conductors from other circuits that could cause danger',
      'Only HV conductors',
      'Conductors in the same enclosure only',
    ],
    correctAnswer: 1,
    explanation:
      'Adjacent live conductors are any nearby conductors from other circuits that remain live and could pose a risk during the work.',
    section: '4.4',
    difficulty: 'intermediate',
  },
  {
    id: 109,
    question: 'When more than one person needs to work on isolated equipment, each person should:',
    options: [
      'Share one lock',
      'Fit their own personal lock to a multi-lock device',
      "Trust the first person's lock",
      'Not need individual locks',
    ],
    correctAnswer: 1,
    explanation:
      'Multi-lock hasps allow each person to fit their own lock, ensuring the isolation can only be removed when all workers have completed and removed their locks.',
    section: '4.4',
    difficulty: 'basic',
  },
  {
    id: 110,
    question: 'Before removing safe isolation, you should verify:',
    options: [
      'Nothing, just remove locks',
      'All persons are clear, tools removed, and circuit safe to re-energise',
      'Only that your work is complete',
      'The customer wants power back',
    ],
    correctAnswer: 1,
    explanation:
      'Before removing isolation: confirm all persons are clear of danger, tools and equipment removed, and the circuit is safe to re-energise.',
    section: '4.4',
    difficulty: 'basic',
  },
  {
    id: 111,
    question: 'Isolation must be at a point where:',
    options: [
      "It's convenient for the electrician",
      'All live conductors are reliably disconnected',
      'Only the phase is disconnected',
      'There is a switch of any type',
    ],
    correctAnswer: 1,
    explanation:
      'Isolation point must reliably disconnect all live conductors with adequate gap or contact separation to prevent inadvertent reconnection.',
    section: '4.4',
    difficulty: 'intermediate',
  },
  {
    id: 112,
    question: 'Which of the following is NOT a suitable point of isolation?',
    options: [
      'Isolator switch with lockable handle',
      'Plug and socket if controlled by worker',
      'Switched fuse with lock off facility',
      'Push button stop with no lockoff',
    ],
    correctAnswer: 3,
    explanation:
      "Push button stops typically don't provide true isolation as they can be reset by others and may not disconnect all conductors.",
    section: '4.4',
    difficulty: 'intermediate',
  },
  {
    id: 113,
    question: 'GS38 guidance for safe use of test equipment covers:',
    options: [
      'Only multimeter use',
      'Probes, leads, fuses, and barriers for test equipment',
      'Writing test reports',
      'Manufacturer warranty claims',
    ],
    correctAnswer: 1,
    explanation:
      'GS38 provides comprehensive guidance on test probes, leads, integral fusing, barrier requirements, and general safe use of electrical test equipment.',
    section: '4.4',
    difficulty: 'basic',
  },
  {
    id: 114,
    question: 'When isolating a three-phase motor circuit, you must verify:',
    options: [
      'Only two phases are disconnected',
      'All three phases are isolated at the motor terminals',
      'Only the control circuit is isolated',
      'The motor has stopped rotating',
    ],
    correctAnswer: 1,
    explanation:
      'All three phases must be verified as isolated at the point of work - motors can continue running on two phases if one is disconnected.',
    section: '4.4',
    difficulty: 'intermediate',
  },
  {
    id: 115,
    question: 'Secure isolation means the isolating device:',
    options: [
      'Is turned off',
      'Cannot be inadvertently re-energised by others',
      'Has a warning notice nearby',
      'Is accessible to all',
    ],
    correctAnswer: 1,
    explanation:
      'Secure isolation requires preventing inadvertent re-energisation through locks, removed fuses, or other means that others cannot defeat.',
    section: '4.4',
    difficulty: 'basic',
  },
  {
    id: 116,
    question: 'When isolating circuits in domestic premises with no lock-off facility:',
    options: [
      "Work live as there's no risk",
      'Remove fuses, inform occupants, and post notices',
      'Only test for dead once',
      'Isolation is not required in domestic premises',
    ],
    correctAnswer: 1,
    explanation:
      "Where lock-off isn't possible, remove fuses/MCBs and retain them, inform occupants, and post warning notices on the consumer unit.",
    section: '4.4',
    difficulty: 'intermediate',
  },
  {
    id: 117,
    question: 'The primary purpose of testing for dead is to:',
    options: [
      'Record readings for certification',
      'Confirm isolation is effective and circuit is safe to work on',
      'Check the installation is complete',
      'Measure circuit impedance',
    ],
    correctAnswer: 1,
    explanation:
      'Testing for dead confirms the isolation has been effective and the circuit is genuinely de-energised and safe to work on.',
    section: '4.4',
    difficulty: 'basic',
  },
  {
    id: 118,
    question: 'If a voltage indicator gives unexpected results during safe isolation:',
    options: [
      "Assume it's faulty and proceed",
      'Stop, investigate, and do not assume circuit is dead',
      'Shake the instrument and retest',
      'Use a different circuit for proving',
    ],
    correctAnswer: 1,
    explanation:
      "Unexpected results require investigation - never assume the circuit is dead without understanding why readings aren't as expected.",
    section: '4.4',
    difficulty: 'intermediate',
  },
  {
    id: 119,
    question: 'Why should test leads have fused probes according to GS38?',
    options: [
      'To protect the circuit under test',
      'To limit fault current if the lead contacts a fault',
      "They don't need fuses",
      'To measure current accurately',
    ],
    correctAnswer: 1,
    explanation:
      'Fused probes limit fault current through the test leads if they accidentally create a short circuit, protecting the user from arc flash.',
    section: '4.4',
    difficulty: 'intermediate',
  },
  {
    id: 120,
    question: 'The safe isolation procedure must be followed:',
    options: [
      'Only for work over 230V',
      'Whenever working on or near electrical equipment',
      'Only when specified by the client',
      'Only for mains supply circuits',
    ],
    correctAnswer: 1,
    explanation:
      'Safe isolation applies whenever working on or near electrical equipment - even low voltages can be dangerous in certain conditions.',
    section: '4.4',
    difficulty: 'basic',
  },
  {
    id: 121,
    question: 'What additional hazard must be considered when isolating circuits with UPS systems?',
    options: [
      'No additional hazards',
      'Battery backup will maintain supply after mains isolation',
      'UPS systems automatically isolate',
      'Only the inverter section is hazardous',
    ],
    correctAnswer: 1,
    explanation:
      'UPS systems maintain supply from batteries after mains isolation - both mains and UPS must be isolated to achieve a truly dead circuit.',
    section: '4.4',
    difficulty: 'intermediate',
  },
  {
    id: 122,
    question: 'When isolating for fault finding, you should:',
    options: [
      'Skip steps to save time',
      'Follow full safe isolation even for quick tests',
      'Only isolate if the fault seems serious',
      'Let apprentices handle isolation',
    ],
    correctAnswer: 1,
    explanation:
      'Full safe isolation procedures must be followed even for quick tests - shortcuts cause accidents regardless of job duration.',
    section: '4.4',
    difficulty: 'basic',
  },
  {
    id: 123,
    question: 'Induced voltages on isolated circuits can occur when:',
    options: [
      'This never happens',
      'Cables run close to or parallel with live conductors',
      'Only in HV systems',
      'Only in underground cables',
    ],
    correctAnswer: 1,
    explanation:
      'Electromagnetic induction can induce voltages on isolated cables running near or parallel to live circuits, particularly with high currents.',
    section: '4.4',
    difficulty: 'advanced',
  },
  {
    id: 124,
    question:
      'Before starting fault diagnosis requiring safe isolation, the permit to work or risk assessment should:',
    options: [
      'Not be necessary for fault work',
      'Identify all hazards and required isolation points',
      'Only cover electrical hazards',
      'Be completed after the work',
    ],
    correctAnswer: 1,
    explanation:
      'Risk assessments and permits should identify all hazards and specify required isolation points and procedures before work begins.',
    section: '4.4',
    difficulty: 'intermediate',
  },
  {
    id: 125,
    question: 'If isolation is performed at a remote location from the work area, you should:',
    options: [
      'Rely on phone communication',
      'Maintain positive communication and verify isolation at point of work',
      'Assume isolation is correct',
      'Only one person needs to verify',
    ],
    correctAnswer: 1,
    explanation:
      'Remote isolation requires positive communication between locations and verification testing at the point of work before starting.',
    section: '4.4',
    difficulty: 'intermediate',
  },

  // Section 4.5: Documentation (Questions 126-150)
  {
    id: 126,
    question: 'Documentation of fault finding should include:',
    options: [
      "Nothing, faults don't need recording",
      'Symptoms, tests performed, fault found, and repair made',
      'Only the final invoice',
      "Just the customer's signature",
    ],
    correctAnswer: 1,
    explanation:
      'Complete documentation includes the reported symptoms, tests conducted, fault diagnosis, repairs made, and verification tests performed.',
    section: '4.5',
    difficulty: 'basic',
  },
  {
    id: 127,
    question: 'Why is documenting test results during fault finding important?',
    options: [
      'Only for invoicing purposes',
      'Creates a record for future reference and provides evidence of proper testing',
      "It's not required for fault work",
      'Only for insurance claims',
    ],
    correctAnswer: 1,
    explanation:
      'Documentation provides evidence of proper procedures, assists future fault diagnosis, and may be needed for warranty or legal purposes.',
    section: '4.5',
    difficulty: 'basic',
  },
  {
    id: 128,
    question: 'A Minor Electrical Installation Works Certificate is appropriate after:',
    options: [
      'Any fault repair work',
      'Additions or alterations not requiring new circuits',
      'Only new installations',
      'Testing only without repairs',
    ],
    correctAnswer: 1,
    explanation:
      "Minor works certificates are for additions or alterations that don't need a new circuit - many fault repairs may fall outside this and require different documentation.",
    section: '4.5',
    difficulty: 'intermediate',
  },
  {
    id: 129,
    question: 'The fault finding report should be written:',
    options: [
      'Only if the customer requests it',
      'At the time of work or as soon as practical afterwards',
      'Several weeks after completion',
      'Only for commercial premises',
    ],
    correctAnswer: 1,
    explanation:
      'Documentation should be completed at the time of work or as soon as practical while details are fresh and accurate.',
    section: '4.5',
    difficulty: 'basic',
  },
  {
    id: 130,
    question: 'Test records should show:',
    options: [
      'Only pass or fail',
      'Actual measured values and the acceptable limits',
      'The cost of testing',
      'Only values outside limits',
    ],
    correctAnswer: 1,
    explanation:
      'Test records should show actual measured values alongside acceptable limits, allowing assessment of margins and trends over time.',
    section: '4.5',
    difficulty: 'intermediate',
  },
  {
    id: 131,
    question: 'When a fault has been found and corrected, testing should:',
    options: [
      'Not be required if the repair is obvious',
      'Verify the circuit now meets regulatory requirements',
      'Only test if customer pays extra',
      'Be limited to visual inspection',
    ],
    correctAnswer: 1,
    explanation:
      'After repair, appropriate tests must confirm the circuit is safe and compliant - the specific tests depend on the nature of the work done.',
    section: '4.5',
    difficulty: 'intermediate',
  },
  {
    id: 132,
    question: 'Photographs during fault finding can be useful to:',
    options: [
      'Increase job time for billing',
      'Document conditions found and repairs made',
      'Show off work quality only',
      'Are never appropriate',
    ],
    correctAnswer: 1,
    explanation:
      'Photographs provide clear documentation of conditions found, damage observed, and repairs completed - useful for records and communication.',
    section: '4.5',
    difficulty: 'basic',
  },
  {
    id: 133,
    question: 'If fault finding reveals other defects not related to the original fault:',
    options: [
      'Ignore them',
      'Document and report them to the customer',
      'Fix them without authorization',
      "They're the next electrician's problem",
    ],
    correctAnswer: 1,
    explanation:
      'Other defects discovered should be documented and reported to the customer/client for their decision on addressing them.',
    section: '4.5',
    difficulty: 'basic',
  },
  {
    id: 134,
    question: 'What documentation is required when fault finding involves safe isolation?',
    options: [
      'None specific to isolation',
      'Record of isolation point, lock used, and tests performed',
      'Only a verbal report',
      'Record only if permit required',
    ],
    correctAnswer: 1,
    explanation:
      'Documentation should record isolation point, locking arrangements, tests confirming dead, and time/date of isolation and restoration.',
    section: '4.5',
    difficulty: 'intermediate',
  },
  {
    id: 135,
    question: 'Customer signature on completion documentation confirms:',
    options: [
      'Agreement to pay',
      'They have been advised of work completed and any recommendations',
      'The fault will never recur',
      'They performed the work themselves',
    ],
    correctAnswer: 1,
    explanation:
      'Customer signature acknowledges they have been informed of work completed, any recommendations, and limitations on the work scope.',
    section: '4.5',
    difficulty: 'basic',
  },
  {
    id: 136,
    question: 'How long should fault finding documentation be retained?',
    options: [
      'Can be destroyed immediately after payment',
      'For a reasonable period - often matching certification retention requirements',
      'Forever',
      '1 year only',
    ],
    correctAnswer: 1,
    explanation:
      'Records should be kept for a reasonable period, often aligned with certification retention (typically 5-10 years) for potential future reference.',
    section: '4.5',
    difficulty: 'intermediate',
  },
  {
    id: 137,
    question: 'A schedule of test results after fault repair should include:',
    options: [
      'Only the date',
      'Circuit details, test values, and acceptable limits',
      'Only failures',
      'Customer contact information only',
    ],
    correctAnswer: 1,
    explanation:
      'Test schedules should identify the circuit, record measured values, show acceptable limits, and indicate pass/fail status.',
    section: '4.5',
    difficulty: 'intermediate',
  },
  {
    id: 138,
    question: 'If fault finding is inconclusive, documentation should:',
    options: [
      'Not mention the failure to find the fault',
      'Record tests performed and recommend further investigation',
      'Claim a fault was found anyway',
      'Refuse to provide any documentation',
    ],
    correctAnswer: 1,
    explanation:
      'Inconclusive fault finding should be honestly documented, recording what was tested and recommending appropriate follow-up actions.',
    section: '4.5',
    difficulty: 'intermediate',
  },
  {
    id: 139,
    question: 'Risk assessments for fault finding work should be:',
    options: [
      'Generic for all work',
      'Specific to the work being undertaken',
      'Not required for fault work',
      'Completed after the work',
    ],
    correctAnswer: 1,
    explanation:
      'Risk assessments should be specific to the actual work, considering the installation type, fault symptoms, and working environment.',
    section: '4.5',
    difficulty: 'intermediate',
  },
  {
    id: 140,
    question: 'When fault finding identifies a dangerous condition, the report should:',
    options: [
      'Downplay the risk',
      'Clearly state the danger and urgency of repair',
      'Not mention danger to avoid alarming the customer',
      'Leave assessment to the customer',
    ],
    correctAnswer: 1,
    explanation:
      'Dangerous conditions must be clearly communicated with appropriate urgency so the customer understands the risks and need for action.',
    section: '4.5',
    difficulty: 'basic',
  },
  {
    id: 141,
    question: 'Documentation of replaced components should include:',
    options: [
      'Nothing specific',
      'Details of faulty component and replacement specifications',
      'Only if expensive parts',
      'Customer preference only',
    ],
    correctAnswer: 1,
    explanation:
      'Recording details of failed components and their replacements provides useful information for future maintenance and warranty purposes.',
    section: '4.5',
    difficulty: 'basic',
  },
  {
    id: 142,
    question: 'BS 7671 requires which document after alterations to an installation?',
    options: [
      'No documentation required',
      'Electrical Installation Certificate or Minor Works Certificate as appropriate',
      'Only a verbal report',
      "Customer's own paperwork",
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671 requires appropriate certification (EIC for new circuits, Minor Works for additions/alterations) after work on installations.',
    section: '4.5',
    difficulty: 'intermediate',
  },
  {
    id: 143,
    question: 'Job sheets should be completed:',
    options: [
      'Only for commercial work',
      'For all work to maintain proper records',
      'Only if requested',
      'After invoicing is complete',
    ],
    correctAnswer: 1,
    explanation:
      'Job sheets should be maintained for all work, providing a record of attendance, work completed, materials used, and any issues encountered.',
    section: '4.5',
    difficulty: 'basic',
  },
  {
    id: 144,
    question: 'If fault finding work is spread over multiple visits, documentation should:',
    options: [
      'Only record the final visit',
      'Track progress across all visits',
      'Not mention previous visits',
      'Restart documentation each visit',
    ],
    correctAnswer: 1,
    explanation:
      'Documentation should track progress through all visits, showing cumulative work, tests, and findings to maintain continuity.',
    section: '4.5',
    difficulty: 'intermediate',
  },
  {
    id: 145,
    question: 'Equipment serial numbers should be recorded when:',
    options: [
      'Never necessary',
      'Replacing equipment under warranty or for traceability',
      'Only for expensive items',
      'The customer requests it',
    ],
    correctAnswer: 1,
    explanation:
      'Recording serial numbers assists with warranty claims, equipment tracking, and identifying products subject to recalls or known issues.',
    section: '4.5',
    difficulty: 'basic',
  },
  {
    id: 146,
    question: 'Verbal reports to customers about fault findings should be:',
    options: [
      'Sufficient on their own',
      'Followed up with written documentation',
      'Avoided to prevent disputes',
      'More detailed than written reports',
    ],
    correctAnswer: 1,
    explanation:
      'Verbal explanations should be supported by written documentation providing a clear record of what was found and done.',
    section: '4.5',
    difficulty: 'basic',
  },
  {
    id: 147,
    question: 'The cause of a fault should be documented because:',
    options: [
      "It's not important once fixed",
      'It helps prevent recurrence and may identify systemic issues',
      "Only if it's unusual",
      'Documentation is only about symptoms',
    ],
    correctAnswer: 1,
    explanation:
      'Documenting fault causes helps prevent recurrence, may reveal patterns, and demonstrates thorough professional diagnosis.',
    section: '4.5',
    difficulty: 'intermediate',
  },
  {
    id: 148,
    question:
      'When fault finding on a commercial installation, documentation may also need to include:',
    options: [
      'Nothing additional',
      'Permit to work details and compliance with site procedures',
      'Personal opinions only',
      'Competitor analysis',
    ],
    correctAnswer: 1,
    explanation:
      'Commercial sites often require permit documentation, contractor sign-in, method statements, and compliance with site-specific procedures.',
    section: '4.5',
    difficulty: 'intermediate',
  },
  {
    id: 149,
    question: 'Test instrument details on documentation typically include:',
    options: [
      'Colour of the instrument',
      'Make, model, serial number, and calibration date',
      'Purchase price',
      'Where it was bought',
    ],
    correctAnswer: 1,
    explanation:
      'Recording instrument details including calibration date demonstrates tests were performed with proper, traceable equipment.',
    section: '4.5',
    difficulty: 'basic',
  },
  {
    id: 150,
    question:
      "If fault work reveals the installation doesn't meet current standards, the report should:",
    options: [
      'Not mention it',
      'Note the deficiency and recommend upgrade',
      'Refuse to complete the work',
      'Upgrade without authorization',
    ],
    correctAnswer: 1,
    explanation:
      'Non-compliance should be documented and appropriate recommendations made, while noting the work was done on an existing installation.',
    section: '4.5',
    difficulty: 'intermediate',
  },

  // Section 4.6: Common Faults (Questions 151-185)
  {
    id: 151,
    question: 'A common cause of RCD nuisance tripping in damp environments is:',
    options: [
      'Correctly operating RCD',
      'Moisture causing earth leakage on circuits',
      'RCD rated too low',
      'Too many circuits on RCD',
    ],
    correctAnswer: 1,
    explanation:
      'Moisture on insulation or in equipment reduces insulation resistance, causing earth leakage current that triggers the RCD.',
    section: '4.6',
    difficulty: 'basic',
  },
  {
    id: 152,
    question: 'Flickering LED lights can commonly be caused by:',
    options: [
      'Correct operation',
      'Incompatible dimmer switch or loose connection',
      'LED lights are always stable',
      'Too many LEDs on circuit',
    ],
    correctAnswer: 1,
    explanation:
      'LED flickering is often caused by incompatible dimmer switches (designed for incandescent) or loose connections causing voltage variation.',
    section: '4.6',
    difficulty: 'basic',
  },
  {
    id: 153,
    question: 'A circuit breaker that trips randomly, especially in warm weather, may have:',
    options: [
      'Too small a load',
      'A fault in the thermal trip mechanism',
      'No problem at all',
      'Incorrect voltage supply',
    ],
    correctAnswer: 1,
    explanation:
      'Thermal trip mechanisms can become sensitive or fail, tripping at lower than rated current, especially when ambient temperature is high.',
    section: '4.6',
    difficulty: 'intermediate',
  },
  {
    id: 154,
    question: 'Loss of neutral in a lighting circuit typically results in:',
    options: [
      'Lights becoming brighter',
      'Lights not working despite live being present',
      'No change in operation',
      'Immediate MCB operation',
    ],
    correctAnswer: 1,
    explanation:
      "Loss of neutral prevents current flowing through the light, so it won't work even though live voltage is present - careful diagnosis is needed.",
    section: '4.6',
    difficulty: 'basic',
  },
  {
    id: 155,
    question: 'A common fault in ring final circuits is:',
    options: [
      'Too few sockets',
      'Ring broken or interconnection fault',
      'Incorrect fuse rating',
      'Wrong cable size',
    ],
    correctAnswer: 1,
    explanation:
      "Ring continuity faults where the ring is broken or joints fail are common, reducing the circuit's current carrying capacity.",
    section: '4.6',
    difficulty: 'intermediate',
  },
  {
    id: 156,
    question: 'Electric cooker elements commonly fail due to:',
    options: [
      'Underuse',
      'Thermal cycling causing element wire fatigue',
      'Voltage too low',
      'Being too large',
    ],
    correctAnswer: 1,
    explanation:
      'Repeated heating and cooling cycles cause metal fatigue in element wire, eventually leading to open circuit failure.',
    section: '4.6',
    difficulty: 'intermediate',
  },
  {
    id: 157,
    question: 'A common cause of socket outlet overheating is:',
    options: [
      'Normal use',
      'Loose connections or overloading',
      'Correctly rated fuse',
      'Wall insulation',
    ],
    correctAnswer: 1,
    explanation:
      'Loose terminal connections create high resistance joints that heat up under load, potentially causing fire or damage.',
    section: '4.6',
    difficulty: 'basic',
  },
  {
    id: 158,
    question: 'Intermittent operation of outdoor lighting is often caused by:',
    options: [
      'Correct design',
      'Moisture ingress or corroded connections',
      'Being too bright',
      'Wrong lamp type',
    ],
    correctAnswer: 1,
    explanation:
      'Outdoor fittings are susceptible to moisture ingress and connection corrosion, causing intermittent operation as water levels vary.',
    section: '4.6',
    difficulty: 'basic',
  },
  {
    id: 159,
    question: 'Humming from a transformer typically indicates:',
    options: [
      'Normal operation',
      'Loose laminations or overloading',
      'Underloading',
      'High efficiency',
    ],
    correctAnswer: 1,
    explanation:
      'While some hum is normal, excessive noise often indicates loose laminations, overloading, or DC components in the supply.',
    section: '4.6',
    difficulty: 'intermediate',
  },
  {
    id: 160,
    question: 'A motor that trips on overload shortly after starting may have:',
    options: [
      'Too much ventilation',
      'Mechanical binding or single phasing',
      'An oversized motor',
      'No load connected',
    ],
    correctAnswer: 1,
    explanation:
      'Mechanical binding increases starting current duration, and single phasing causes the motor to draw excess current from remaining phases.',
    section: '4.6',
    difficulty: 'intermediate',
  },
  {
    id: 161,
    question: 'A common fault in lighting circuits controlled by PIR sensors is:',
    options: [
      'PIR too sensitive correctly',
      'False triggering from heat sources or incorrect positioning',
      'Sensor being weather-proof',
      'LED compatibility issues only',
    ],
    correctAnswer: 1,
    explanation:
      'PIR sensors detect heat and movement, so heat sources, pets, or traffic within range cause false triggering.',
    section: '4.6',
    difficulty: 'basic',
  },
  {
    id: 162,
    question:
      'An immersion heater that provides no hot water despite being switched on likely has:',
    options: [
      'Too much water',
      'Failed element or thermostat',
      'Correct operation',
      'Water too cold to heat',
    ],
    correctAnswer: 1,
    explanation:
      'Failed heating elements or thermostats are the most common causes of immersion heaters not heating water.',
    section: '4.6',
    difficulty: 'basic',
  },
  {
    id: 163,
    question: 'Voltage drop on long lighting circuits commonly causes:',
    options: [
      'Lights too bright',
      'Dim lights, especially at the end of the circuit',
      'No effect on LED lights',
      'MCB tripping',
    ],
    correctAnswer: 1,
    explanation:
      'Voltage drop along cable length reduces voltage available at distant points, causing noticeable dimming with some lamp types.',
    section: '4.6',
    difficulty: 'intermediate',
  },
  {
    id: 164,
    question: 'A fault causing only part of a radial socket circuit to fail is likely:',
    options: [
      'At the consumer unit',
      'An open circuit at a joint or socket along the circuit',
      'In the meter',
      'Due to incorrect MCB',
    ],
    correctAnswer: 1,
    explanation:
      'A break in a radial circuit disconnects all sockets downstream of the fault point while earlier sockets continue working.',
    section: '4.6',
    difficulty: 'intermediate',
  },
  {
    id: 165,
    question: 'Arcing noise from a consumer unit indicates:',
    options: [
      'Normal operation',
      'Loose connections or failing components requiring immediate attention',
      'The unit working hard',
      'Nothing to be concerned about',
    ],
    correctAnswer: 1,
    explanation:
      'Arcing indicates dangerous conditions - loose connections or failing components that need immediate investigation and repair.',
    section: '4.6',
    difficulty: 'basic',
  },
  {
    id: 166,
    question: 'A common cause of earth fault loop impedance being too high is:',
    options: [
      'Cable too short',
      'Poor connections in protective conductor path',
      'Main switch too large',
      'Correct installation',
    ],
    correctAnswer: 1,
    explanation:
      'High resistance joints or broken/undersized protective conductors increase the earth fault loop impedance beyond acceptable limits.',
    section: '4.6',
    difficulty: 'intermediate',
  },
  {
    id: 167,
    question: 'USB charging sockets that fail commonly suffer from:',
    options: [
      'Overcharging phones',
      'Failed internal electronics or connection issues',
      'Being used correctly',
      'Phones being too new',
    ],
    correctAnswer: 1,
    explanation:
      'The electronic components in USB sockets can fail from heat or component degradation, or connection issues develop internally.',
    section: '4.6',
    difficulty: 'basic',
  },
  {
    id: 168,
    question: 'A bathroom extractor fan that runs continuously may have:',
    options: [
      'Excellent design',
      'Failed timer or humidity sensor',
      'Too much steam',
      'Incorrect wiring which is correct',
    ],
    correctAnswer: 1,
    explanation:
      'Timer or humidity sensor failures can cause fans to run continuously or not respond to control signals correctly.',
    section: '4.6',
    difficulty: 'basic',
  },
  {
    id: 169,
    question: 'Smoke alarm false alarms in kitchens are commonly due to:',
    options: [
      'Correct operation',
      'Wrong detector type (ionisation) for the location',
      'Battery type',
      'Alarm being too loud',
    ],
    correctAnswer: 1,
    explanation:
      'Ionisation detectors are sensitive to cooking particles - optical/heat detectors are more suitable for kitchens.',
    section: '4.6',
    difficulty: 'basic',
  },
  {
    id: 170,
    question: "A doorbell that doesn't work often has a fault in:",
    options: [
      'The door frame',
      'The transformer, push, or bell unit',
      'The mains supply',
      'The door itself',
    ],
    correctAnswer: 1,
    explanation:
      'Doorbell systems have limited components - transformers can fail, push buttons wear out, and bell/chime units can fail mechanically.',
    section: '4.6',
    difficulty: 'basic',
  },
  {
    id: 171,
    question: 'Three-phase motor running in reverse indicates:',
    options: [
      'Normal operation',
      'Two phases have been transposed',
      'All three phases reversed',
      'Earth fault present',
    ],
    correctAnswer: 1,
    explanation:
      'Swapping any two phases reverses three-phase motor direction - commonly occurs after maintenance or reconnection.',
    section: '4.6',
    difficulty: 'intermediate',
  },
  {
    id: 172,
    question: 'A fault causing MCB to trip only when a specific appliance is connected suggests:',
    options: [
      'MCB fault',
      'Fault in the appliance or its flex',
      'Circuit design error',
      'Supply voltage issue',
    ],
    correctAnswer: 1,
    explanation:
      'If tripping only occurs with one appliance, the fault is likely in that appliance or its connection to the circuit.',
    section: '4.6',
    difficulty: 'basic',
  },
  {
    id: 173,
    question: 'Corroded terminals in junction boxes are commonly caused by:',
    options: [
      'Normal ageing',
      'Moisture ingress or condensation',
      'High current only',
      'Correct installation',
    ],
    correctAnswer: 1,
    explanation:
      'Corrosion typically results from moisture entering the junction box through damaged seals, cable entries, or condensation.',
    section: '4.6',
    difficulty: 'basic',
  },
  {
    id: 174,
    question: 'A common fault with underfloor heating is:',
    options: [
      'Being too warm',
      'Broken heating element or failed thermostat',
      'Floor being wrong type',
      'Heating too quickly',
    ],
    correctAnswer: 1,
    explanation:
      'Element breaks (often from installation damage) or thermostat/controller failures are common underfloor heating faults.',
    section: '4.6',
    difficulty: 'intermediate',
  },
  {
    id: 175,
    question: 'Electric shower reduced output is commonly caused by:',
    options: [
      'Water being too wet',
      'Scaled heating elements or failed elements',
      'Too high water pressure',
      'Shower being too new',
    ],
    correctAnswer: 1,
    explanation:
      'Scale buildup on elements reduces heat transfer efficiency, and partial element failure reduces overall heating capacity.',
    section: '4.6',
    difficulty: 'basic',
  },
  {
    id: 176,
    question: 'Lighting circuits where one light not working affects others often have:',
    options: [
      'Correct wiring',
      'Loop-in wiring with fault at failed light position',
      'Radial circuits',
      'Too many lights',
    ],
    correctAnswer: 1,
    explanation:
      'In loop-in wiring, a neutral fault at one ceiling rose can affect downstream lights that share that neutral path.',
    section: '4.6',
    difficulty: 'intermediate',
  },
  {
    id: 177,
    question: 'Garage or outbuilding circuits that work intermittently may have:',
    options: [
      'Correct underground installation',
      'Damaged underground cable or poor connections',
      'Too short a cable run',
      'Excess circuit capacity',
    ],
    correctAnswer: 1,
    explanation:
      'Underground cables can be damaged by digging or ground movement, and connections at entry points are susceptible to moisture.',
    section: '4.6',
    difficulty: 'intermediate',
  },
  {
    id: 178,
    question: 'A time switch that fails to operate at programmed times often has:',
    options: [
      'Too many programs',
      'Battery backup failure losing settings, or mechanism wear',
      'Correct time setting',
      'Programs too complex',
    ],
    correctAnswer: 1,
    explanation:
      'Backup battery failure causes loss of settings after power cuts, and mechanical time switches suffer from wear in their movements.',
    section: '4.6',
    difficulty: 'basic',
  },
  {
    id: 179,
    question: 'Consumer unit main switch that feels hot indicates:',
    options: [
      'Normal operation',
      'Loose connections or overloading',
      'Good quality switch',
      'Efficient operation',
    ],
    correctAnswer: 1,
    explanation:
      'Heat at the main switch indicates high resistance from loose connections or the switch being overloaded - requires immediate attention.',
    section: '4.6',
    difficulty: 'basic',
  },
  {
    id: 180,
    question: 'Earth bonding that reads open circuit may be due to:',
    options: [
      'Correct installation',
      'Disconnected clamp or broken conductor',
      'Bond being too large',
      'Main earth being too good',
    ],
    correctAnswer: 1,
    explanation:
      'Open circuit bonding readings indicate disconnected earth clamps, broken conductors, or removed bonding connections.',
    section: '4.6',
    difficulty: 'basic',
  },
  {
    id: 181,
    question: 'A common fault with CAT5/6 network cabling affecting data transmission is:',
    options: [
      'Cable being too blue',
      'Split pairs or incorrect termination',
      'Cable being too new',
      'Standard electrical fault',
    ],
    correctAnswer: 1,
    explanation:
      'Split pairs (pairs not correctly maintained through termination) and incorrect pinouts are common data cabling faults.',
    section: '4.6',
    difficulty: 'intermediate',
  },
  {
    id: 182,
    question: 'Emergency lighting that fails to illuminate on mains failure likely has:',
    options: [
      'Correct operation',
      'Failed battery or charging circuit fault',
      'Lamp too bright for emergency',
      'Too few emergency lights',
    ],
    correctAnswer: 1,
    explanation:
      'Battery failure or charging circuit faults are the most common reasons emergency lights fail to operate when mains power is lost.',
    section: '4.6',
    difficulty: 'basic',
  },
  {
    id: 183,
    question: 'Electromagnetic interference affecting electronic equipment often comes from:',
    options: [
      'Correctly filtered equipment',
      'VFDs, fluorescent lighting, or high-frequency switching',
      'Low voltage DC supplies',
      'Properly installed cables',
    ],
    correctAnswer: 1,
    explanation:
      'Variable frequency drives, fluorescent lamp ballasts, and switching power supplies generate electromagnetic interference that can affect sensitive electronics.',
    section: '4.6',
    difficulty: 'advanced',
  },
  {
    id: 184,
    question: 'Solar PV systems that underperform commonly suffer from:',
    options: [
      'Too much sun',
      'Shading, dirty panels, or inverter faults',
      'Panels facing south',
      'Correct installation',
    ],
    correctAnswer: 1,
    explanation:
      'Partial shading severely impacts output, dirty panels reduce efficiency, and inverter faults prevent power conversion.',
    section: '4.6',
    difficulty: 'intermediate',
  },
  {
    id: 185,
    question: 'EV charger faults commonly involve:',
    options: [
      'Car being too heavy',
      'Communication errors, RCD trips, or contactor failures',
      'Charging too fast',
      'Cable being too long',
    ],
    correctAnswer: 1,
    explanation:
      'EV charger faults often relate to vehicle-charger communication issues, protective device trips, or contactor mechanism failures.',
    section: '4.6',
    difficulty: 'intermediate',
  },

  // Section 4.7: Repair Procedures (Questions 186-200)
  {
    id: 186,
    question: 'When replacing a faulty component, the replacement should:',
    options: [
      'Be any available part',
      'Match or exceed the original specification',
      'Always be a different brand',
      'Be the cheapest option',
    ],
    correctAnswer: 1,
    explanation:
      'Replacement components should match or exceed original specifications to maintain safety and performance levels.',
    section: '4.7',
    difficulty: 'basic',
  },
  {
    id: 187,
    question: 'Before starting repair work, you should:',
    options: [
      'Begin immediately',
      'Verify isolation, have correct parts and tools ready',
      'Order parts after starting',
      'Ignore planning requirements',
    ],
    correctAnswer: 1,
    explanation:
      'Preparation including confirming isolation, having correct components and tools ensures efficient and safe repair work.',
    section: '4.7',
    difficulty: 'basic',
  },
  {
    id: 188,
    question: 'When repairing a high resistance joint, the proper procedure is to:',
    options: [
      'Just tighten the connection',
      'Clean all contact surfaces, remake the joint properly',
      'Apply conductive grease only',
      'Replace the entire cable',
    ],
    correctAnswer: 1,
    explanation:
      'Proper repair requires cleaning oxidation and contamination from contact surfaces and remaking the joint correctly with appropriate torque.',
    section: '4.7',
    difficulty: 'intermediate',
  },
  {
    id: 189,
    question: 'After completing a repair, the circuit should be tested to verify:',
    options: [
      'Only that power is restored',
      'Correct operation and safety parameters within limits',
      'The invoice is accurate',
      'Tools have been collected',
    ],
    correctAnswer: 1,
    explanation:
      'Post-repair testing must confirm both correct operation and that safety parameters (insulation resistance, continuity, etc.) are within acceptable limits.',
    section: '4.7',
    difficulty: 'basic',
  },
  {
    id: 190,
    question: 'If repair requires modification to wiring, this should be:',
    options: [
      'Done with any available cable',
      'Completed with appropriate materials and properly documented',
      'Hidden from the customer',
      'Done without testing',
    ],
    correctAnswer: 1,
    explanation:
      'Modifications must use appropriate materials compliant with regulations and be properly documented for safety and future reference.',
    section: '4.7',
    difficulty: 'intermediate',
  },
  {
    id: 191,
    question: 'When replacing a circuit breaker, you should verify:',
    options: [
      'Only that it fits',
      'Rating, type, breaking capacity match requirements',
      'Brand preference',
      'Colour matches others',
    ],
    correctAnswer: 1,
    explanation:
      'Replacement breakers must have correct rating, trip characteristics, breaking capacity, and compatibility with the consumer unit.',
    section: '4.7',
    difficulty: 'intermediate',
  },
  {
    id: 192,
    question: 'Soldered repairs to modern wiring installations are:',
    options: [
      'Always preferred',
      'Generally not acceptable for permanent connections',
      'Required by BS 7671',
      'Faster than mechanical joints',
    ],
    correctAnswer: 1,
    explanation:
      'Soldered joints in fixed wiring are generally not acceptable as they can fail under stress and vibration - mechanical connections are preferred.',
    section: '4.7',
    difficulty: 'intermediate',
  },
  {
    id: 193,
    question: 'When repairing damaged cable insulation temporarily, you should:',
    options: [
      'Leave it exposed until permanent repair',
      'Use appropriate insulation tape with intention to replace properly',
      'PVC tape is always permanent',
      'Any tape will do',
    ],
    correctAnswer: 1,
    explanation:
      'Temporary insulation repairs using appropriate tape may be acceptable short-term but should be replaced with proper repair or cable replacement.',
    section: '4.7',
    difficulty: 'intermediate',
  },
  {
    id: 194,
    question: 'Function testing after repair should:',
    options: [
      'Be skipped if repair is simple',
      'Verify operation under normal conditions',
      'Only test at maximum load',
      'Test with isolation maintained',
    ],
    correctAnswer: 1,
    explanation:
      'Function testing confirms the repaired circuit operates correctly under normal conditions the equipment will experience.',
    section: '4.7',
    difficulty: 'basic',
  },
  {
    id: 195,
    question: 'When a repair involves the protective conductor, you must:',
    options: [
      'Test only if convenient',
      'Verify continuity and earth fault loop impedance',
      "Assume it's correct",
      'Only visual inspection',
    ],
    correctAnswer: 1,
    explanation:
      'Repairs affecting protective conductors require testing to confirm continuity and that earth fault loop impedance remains within acceptable limits.',
    section: '4.7',
    difficulty: 'intermediate',
  },
  {
    id: 196,
    question: 'Torque settings for electrical terminations should be:',
    options: [
      'As tight as possible',
      "According to manufacturer's specifications",
      'Hand tight only',
      'Variable based on preference',
    ],
    correctAnswer: 1,
    explanation:
      'Manufacturer-specified torque ensures proper contact without damaging conductors or terminals - both over and under-tightening cause problems.',
    section: '4.7',
    difficulty: 'intermediate',
  },
  {
    id: 197,
    question: 'If spare parts are not immediately available, you should:',
    options: [
      'Use unsuitable alternatives',
      'Inform customer and arrange proper repair when parts available',
      'Leave circuit energised',
      'Abandon the job',
    ],
    correctAnswer: 1,
    explanation:
      "If correct parts aren't available, inform the customer, make the circuit safe, and arrange proper repair when suitable parts can be obtained.",
    section: '4.7',
    difficulty: 'basic',
  },
  {
    id: 198,
    question: 'Repair work on IP-rated enclosures must ensure:',
    options: [
      'IP rating is ignored',
      'Enclosure integrity and IP rating are maintained',
      'Drilling holes is acceptable',
      'Seals can be omitted',
    ],
    correctAnswer: 1,
    explanation:
      "Repairs must maintain the enclosure's IP rating - this means replacing seals correctly and not compromising ingress protection.",
    section: '4.7',
    difficulty: 'intermediate',
  },
  {
    id: 199,
    question: 'When completing repair work, commissioning should include:',
    options: [
      'Only switching on',
      'Verification of correct operation and safety checks',
      'Customer training only',
      'Invoice preparation',
    ],
    correctAnswer: 1,
    explanation:
      'Commissioning verifies correct operation, performs necessary safety checks, and confirms the system is ready for normal use.',
    section: '4.7',
    difficulty: 'basic',
  },
  {
    id: 200,
    question: 'Handover after fault repair should include:',
    options: [
      'Just leaving',
      'Explaining repair made, any limitations, and operating instructions',
      'Detailed invoice only',
      'No communication needed',
    ],
    correctAnswer: 1,
    explanation:
      'Proper handover includes explaining what was found, repairs made, any recommendations, limitations, and relevant operating information.',
    section: '4.7',
    difficulty: 'basic',
  },

  // ============================================
  // Section 4.8: ELTK07 Layered Depth — Realistic scenarios, branded
  // instruments, A4:2026 alignment, GS38, lone working, special precautions
  // and fault signatures (Questions 201-250)
  // ============================================
  {
    id: 201,
    question:
      "A customer says the lights flicker every time the fridge starts. The most likely cause is:",
    options: [
      'A faulty bulb',
      'Voltage drop on a shared circuit due to high inrush current of the fridge motor',
      'A failed RCD',
      'Harmonic distortion in the supply',
    ],
    correctAnswer: 1,
    explanation:
      "Inductive motors have an inrush current of 5-7× full-load current for a few cycles at start. If lights and fridge share a final circuit, the resulting transient voltage drop dims the lights. Solution: separate the lighting circuit or check for high-resistance joints reducing the available fault loop impedance margin.",
    section: '4.8',
    difficulty: 'advanced',
  },
  {
    id: 202,
    question:
      "A 30 mA RCD trips intermittently every Tuesday morning. What is the most likely cause?",
    options: [
      'Component failure in the RCD',
      'A scheduled time-controlled load (such as a frost stat or boiler) with cumulative leakage current pushing the circuit over the trip threshold',
      'Lightning strike',
      'Cosmic rays',
    ],
    correctAnswer: 1,
    explanation:
      "RCDs respond to total earth leakage on protected circuits. Time-controlled loads (heating, immersion, EV charge schedule) energising together can sum standing leakage above 50% of IΔn (the trip-recommended ceiling per BS 7671). A clamp meter (e.g. Fluke 369 FC) at the incoming MET measures live leakage; consider RCBO splitting.",
    section: '4.8',
    difficulty: 'advanced',
  },
  {
    id: 203,
    question:
      "When using a Megger MFT1741+ for an insulation resistance test on a 230 V final circuit, the test voltage and minimum acceptable value (BS 7671 Table 64) are:",
    options: [
      '250 V test, 0.25 MΩ minimum',
      '500 V test, 1 MΩ minimum',
      '1,000 V test, 1 MΩ minimum',
      '500 V test, 100 MΩ minimum',
    ],
    correctAnswer: 1,
    explanation:
      "BS 7671 Table 64 (A4:2026) requires LV circuits up to 500 V to be tested at 500 V DC with a minimum insulation resistance of 1 MΩ. SELV/PELV is tested at 250 V with 0.5 MΩ minimum. Always disconnect electronic equipment before applying test voltage.",
    section: '4.8',
    difficulty: 'intermediate',
  },
  {
    id: 204,
    question:
      "A Fluke 1664FC measures earth fault loop impedance Zs of 1.45 Ω on a circuit protected by a 32 A type B MCB. Reference Zs (Table 41.3) is 1.37 Ω. The result is:",
    options: [
      'Acceptable, well within tolerance',
      'Marginal — must be rule-of-thumb corrected to 80% (1.10 Ω) for design purposes',
      'A clear fail because the measured value exceeds the published value',
      'Not relevant when an RCD is present',
    ],
    correctAnswer: 2,
    explanation:
      "Measured Zs of 1.45 Ω exceeds the BS 7671 Table 41.3 maximum of 1.37 Ω for a 32 A type B MCB at 230 V — this is a fail. The 80% rule applies when comparing measured Zs to published values to allow for conductor temperature rise: measured ≤ 0.8 × tabulated value. Here the measured value is above tabulated, so disconnection time is not assured.",
    section: '4.8',
    difficulty: 'advanced',
  },
  {
    id: 205,
    question:
      "Under HSE GS38, voltage indicators and test probes used by electricians must:",
    options: [
      'Be colour coded only',
      'Have a maximum of 4 mm exposed metal tip, finger guards, fused leads where appropriate, and be CAT III/IV rated for the system voltage',
      'Be rated for 1,000 V regardless of application',
      'Be the cheapest available',
    ],
    correctAnswer: 1,
    explanation:
      "GS38 requires test probes to have finger barriers, no more than 4 mm of exposed conductor at the tip, leads with insulation rated for the supply, fused/current-limited leads where required, and instruments with appropriate CAT rating. CAT III is for fixed installations beyond the meter, CAT IV is at the supply origin.",
    section: '4.8',
    difficulty: 'intermediate',
  },
  {
    id: 206,
    question:
      "A Kewtech KT64+ MFT shows a continuity reading of 0.45 Ω on an R1+R2 test for a 30 m radial circuit. The cable is 2.5/1.5 mm² T+E. Approximate expected R1+R2 (using 19.51 mΩ/m at 20°C) is:",
    options: ['0.21 Ω', '0.45 Ω', '0.59 Ω', '1.17 Ω'],
    correctAnswer: 2,
    explanation:
      "From OSG Table I1: 2.5/1.5 mm² T+E gives R1+R2 = 19.51 mΩ/m at 20°C. For 30 m: 19.51 × 30 / 1000 = 0.585 Ω. Measured 0.45 Ω is below expected, suggesting either the run is shorter than thought, or the test was zeroed correctly and the circuit is sound. Always null the leads before testing.",
    section: '4.8',
    difficulty: 'advanced',
  },
  {
    id: 207,
    question:
      "An AFDD trips intermittently on a domestic ring final circuit. The most likely cause to investigate first is:",
    options: [
      'Lightning damage',
      'A loose connection or arcing fault at a socket outlet, junction box or accessory creating high-frequency arcing signatures the AFDD is designed to detect',
      'A fault in the consumer unit busbar',
      'Solar PV interference',
    ],
    correctAnswer: 1,
    explanation:
      "AFDDs (BS EN 62606) detect series and parallel arcing signatures that overcurrent devices and RCDs miss. Loose terminations, damaged cable insulation, broken conductor strands and degraded accessories produce the signatures the AFDD looks for. BS 7671 A4:2026 requires AFDDs in higher-risk locations such as HMOs and care homes (Reg 421.1.7).",
    section: '4.8',
    difficulty: 'advanced',
  },
  {
    id: 208,
    question:
      "A new TN-C-S (PME / PNB) installation has Ze = 0.21 Ω at the origin. The DNO declared maximum is 0.35 Ω. This Ze:",
    options: [
      'Fails because it must be below 0.10 Ω',
      'Is acceptable as it is below the DNO declared maximum',
      'Must be ignored — only Zs matters',
      'Indicates a faulty meter tail',
    ],
    correctAnswer: 1,
    explanation:
      "Ze (external earth fault loop impedance) must be measured at the origin with main switch open and main bonding disconnected. A4:2026 references PNB (protective neutral bonding) for TN-C-S supplies. The measured Ze must not exceed the DNO declared value, and the resulting Zs (Ze + R1+R2) must satisfy Table 41.3.",
    section: '4.8',
    difficulty: 'intermediate',
  },
  {
    id: 209,
    question:
      "The preferred sequence of dead testing per BS 7671 Reg 643 is:",
    options: [
      'Polarity, IR, continuity, Ze',
      'Continuity of protective conductors, continuity of ring, IR, polarity, earth electrode resistance (where applicable)',
      'IR, then continuity',
      'There is no recommended sequence',
    ],
    correctAnswer: 1,
    explanation:
      "Regulation 643 sequences dead tests starting with continuity of protective conductors (R2 or R1+R2), then continuity of ring final, insulation resistance, polarity, earth electrode resistance (TT only), then live tests (Ze, PFC, Zs, RCD, functional). This sequence prevents charging electronic equipment via test voltage.",
    section: '4.8',
    difficulty: 'intermediate',
  },
  {
    id: 210,
    question:
      "When carrying out fault diagnosis on a single-phase 230 V circuit, the operator finds 230 V live-to-earth but only 110 V live-to-neutral at the load. The most likely cause is:",
    options: [
      'A missing or broken neutral conductor before the load (broken or floating neutral)',
      'A short circuit between live and neutral',
      'A failed lamp',
      'An open earth',
    ],
    correctAnswer: 0,
    explanation:
      "A broken neutral causes the load to find a return path through whatever residual leakage or capacitive coupling is available, producing erratic voltages between live, neutral and earth. Class I appliances may show floating neutral voltage. Reseat all neutral terminations and inspect for hidden joints.",
    section: '4.8',
    difficulty: 'advanced',
  },
  {
    id: 211,
    question:
      "A client reports the immersion heater does not heat. The MFT shows continuity of the element of 18 Ω, IR to earth of 200 MΩ, and supply voltage at the cylinder switch. The most likely cause is:",
    options: [
      'A failed thermostat or stuck linkage preventing the element circuit from closing',
      'The element has open-circuited',
      'The cable has shorted out',
      'The cylinder is incorrectly bonded',
    ],
    correctAnswer: 0,
    explanation:
      "Element resistance of 18 Ω implies a working 3 kW element (V²/R = 230²/18 ≈ 2,940 W). IR is fine. Supply is present. The thermostat or thermal cut-out (high limit) is the next link in the chain — these are the most common immersion failure points and should be checked next.",
    section: '4.8',
    difficulty: 'advanced',
  },
  {
    id: 212,
    question:
      "A Hager type AFDD/RCBO consumer unit trips on a kitchen circuit when the toaster is used. The trip indicator shows neither overload nor earth leakage. What test should you do first?",
    options: [
      'Replace the device',
      'Check the toaster for a series arc fault (loose terminal, broken element strand) using IR test on the appliance lead and visual inspection',
      'Increase the rating',
      'Bypass the AFDD',
    ],
    correctAnswer: 1,
    explanation:
      "AFDD trips with no over-current or earth-leakage indication suggest detected arcing. PAT-test the toaster (Class I appliance: earth bond ≤0.1 Ω, IR ≥1 MΩ at 500 V), inspect plug, lead and internal element terminations. Replace toaster if degraded.",
    section: '4.8',
    difficulty: 'advanced',
  },
  {
    id: 213,
    question:
      "Phase sequence on a three-phase 400 V supply must be confirmed to be:",
    options: [
      'Random — order does not matter',
      'L1-L2-L3 (anti-clockwise rotation when viewed from drive end) for correct motor direction',
      'Always RYB',
      'L3-L2-L1',
    ],
    correctAnswer: 1,
    explanation:
      "Standard UK rotation is L1, L2, L3 (brown, black, grey under BS 7671 colour scheme). Phase rotation testers (e.g. Martindale PSI300, Megger PSI) confirm sequence before energising motors. Reversing two phases reverses motor rotation.",
    section: '4.8',
    difficulty: 'intermediate',
  },
  {
    id: 214,
    question:
      "When working on fibre-optic cabling, the special precautions you must observe include:",
    options: [
      'None — fibre is electrically inert',
      'Never look into a fibre or coupler — laser radiation can damage the retina; use a fibre detector card or scope; dispose of glass shards safely',
      'Wear chemical PPE only',
      'Test with a multimeter',
    ],
    correctAnswer: 1,
    explanation:
      "Fibre carries Class 1M or higher laser radiation invisible to the eye but capable of permanent retinal damage. Always cap unused connectors, use viewing scopes (not direct line of sight), wear safety glasses when cleaving fibre, and dispose of broken fibre as sharps.",
    section: '4.8',
    difficulty: 'intermediate',
  },
  {
    id: 215,
    question:
      "Electro-static discharge (ESD) precautions when servicing electronic control panels include:",
    options: [
      'Holding boards by the components',
      'Using a wrist strap connected to the panel earth, keeping boards in anti-static bags, working on an ESD-rated mat',
      'Wearing rubber gloves',
      'Spraying boards with water',
    ],
    correctAnswer: 1,
    explanation:
      "Modern CMOS and FET devices can be destroyed by static potentials below the human perception threshold. ESD control includes wrist straps bonded to earth, anti-static bags, conductive workmats and avoiding synthetic clothing. Damage may not be immediate, leading to latent failures.",
    section: '4.8',
    difficulty: 'intermediate',
  },
  {
    id: 216,
    question:
      "A clamp meter reading of 4.8 A is taken around live, neutral and CPC of a single circuit simultaneously. This indicates:",
    options: [
      'The load is 4.8 A',
      'There is 4.8 A of unbalance current — likely earth leakage; investigate insulation faults',
      'The supply is at 4.8 V',
      'Nothing useful',
    ],
    correctAnswer: 1,
    explanation:
      "Clamping all three conductors together cancels the load current vectors. Any residual reading represents the imbalance — typically leakage to earth via insulation breakdown or filter capacitors. Anything above 30% of upstream RCD trip threshold should be investigated.",
    section: '4.8',
    difficulty: 'advanced',
  },
  {
    id: 217,
    question:
      "You arrive at a small commercial site for fault diagnosis. The first thing you should do per the IET Code of Practice 5th ed. is:",
    options: [
      'Disconnect the supply immediately',
      'Conduct a risk assessment, agree the scope of work with the duty holder, gather any prior records and confirm safe access and isolation points',
      'Start replacing parts',
      'Photograph the consumer unit',
    ],
    correctAnswer: 1,
    explanation:
      "CoP for In-service Inspection (and IET GN3) requires a documented risk assessment, scope agreement with the duty holder, review of relevant documentation (EICR, prior reports, drawings), and identification of isolation points before work begins. This protects both the operator and the client.",
    section: '4.8',
    difficulty: 'intermediate',
  },
  {
    id: 218,
    question:
      "Using the 5-Why technique, you trace a tripping RCBO to: (1) earth fault, (2) damaged cable, (3) cable in stud wall, (4) chased by joiner, (5) safe zones not marked. The corrective action under root cause is:",
    options: [
      'Replace the cable only',
      'Repair the cable AND mark safe zones (BS 7671 Reg 522.6) AND brief site team to prevent recurrence',
      'Increase RCBO rating',
      'Bypass the RCBO',
    ],
    correctAnswer: 1,
    explanation:
      "Root cause analysis distinguishes the immediate fix (repair cable) from preventing recurrence (mark safe zones, brief other trades). BS 7671 Reg 522.6.201 specifies cables in safe zones (within 150 mm of corners or obscured behind earthed metal containment). Without addressing the root, the fault returns.",
    section: '4.8',
    difficulty: 'advanced',
  },
  {
    id: 219,
    question:
      "An IR camera shows a 75°C hot-spot on one phase of an MK three-phase distribution board, while the other two phases sit at 35°C. The most likely fault is:",
    options: [
      'Normal load imbalance',
      'A loose or high-resistance termination on that phase causing localised heating (P = I²R), often combined with thermal degradation of the busbar or termination plating',
      'Faulty thermal imager',
      'A blown fuse',
    ],
    correctAnswer: 1,
    explanation:
      "A localised hotspot of 40°C above the surrounding terminations is a classic signature of a high-resistance joint (loose lug, oxidised connection). Re-torque per the manufacturer's data sheet (typically 2.5-3 Nm for terminal blocks), inspect for arcing damage, replace if pitted. ITHIM/IIEC thermography categorises >40°C delta as urgent.",
    section: '4.8',
    difficulty: 'advanced',
  },
  {
    id: 220,
    question:
      "Lone working on a fault diagnosis call should include:",
    options: [
      'No special precautions',
      'A lone worker policy, periodic check-ins, GPS-tracked safety device or app, dynamic risk assessment, agreed escalation contact and avoidance of live working unless unavoidable and risk-assessed',
      'Just keep your phone on',
      'Always wear hi-vis only',
    ],
    correctAnswer: 1,
    explanation:
      "HSE INDG73 covers lone working. Controls include periodic check-in calls or app-based monitoring (StaySafe, Reliance Protect), dynamic risk assessments at each location, prohibition on live working without authorisation and risk assessment, and an escalation contact. EAW Reg 14 does not permit work on live equipment unless reasonable in all the circumstances.",
    section: '4.8',
    difficulty: 'intermediate',
  },
  {
    id: 221,
    question:
      "When testing high-frequency or capacitive circuits for fault diagnosis, you should:",
    options: [
      'Use the same procedure as 50 Hz',
      'Allow capacitors to discharge through a bleed resistor before contact, treat large capacitor banks as energised even after isolation, and use instruments rated for the frequency present',
      'Discharge with a screwdriver',
      'Wear cotton gloves',
    ],
    correctAnswer: 1,
    explanation:
      "Capacitor banks (PFC, DC link capacitors in VFDs) can hold dangerous charge for minutes to hours after isolation. Always wait the manufacturer's recommended discharge time (often 5-15 minutes), then discharge through a rated bleed resistor or shorting bar before touching terminals. Treat as live until proven dead.",
    section: '4.8',
    difficulty: 'advanced',
  },
  {
    id: 222,
    question:
      "A Wylex NHXSP+ split-load consumer unit has a 30 mA RCD covering all sockets. A new EV charger is added to the right-hand RCD-protected bank. The likely problem is:",
    options: [
      'The charger will not work at all',
      'Cumulative DC residual current from the EV charger and other loads could exceed the AC-only RCD threshold, plus DC residual currents may blind a Type AC RCD; a Type A or Type B RCD is required (BS 7671 722.531.3.101 / Section 722)',
      'The CU is faulty',
      'No problem',
    ],
    correctAnswer: 1,
    explanation:
      "EV chargers can produce DC residual currents that blind a standard Type AC RCD. BS 7671 Section 722 requires either a Type A RCD with manufacturer-declared 6 mA DC detection in the EVSE, or a Type B RCD upstream. Adding without checking is dangerous and non-compliant.",
    section: '4.8',
    difficulty: 'advanced',
  },
  {
    id: 223,
    question:
      "After completing a fault correction, the relevant certificate to issue under BS 7671 / IET model forms is:",
    options: [
      'A Visual Condition Report',
      'A Minor Electrical Installation Works Certificate (MEIWC) for additions/alterations to a single circuit, or an Electrical Installation Certificate (EIC) for new circuits/installations',
      'A purchase order',
      'No certificate needed for fault repair',
    ],
    correctAnswer: 1,
    explanation:
      "BS 7671 A4:2026 retained MEIWC for single-circuit minor work that does not involve a new circuit. New circuits and major works require an EIC. Periodic verification uses an EICR. A4:2026 added new schedule columns and updated form layouts.",
    section: '4.8',
    difficulty: 'intermediate',
  },
  {
    id: 224,
    question:
      "A Schneider Acti9 RCBO trips on test with the test button but a Fluke 1664FC measures actual trip current at 38 mA. The acceptable IΔn range for a 30 mA RCD per BS 7671 643.7 is:",
    options: [
      'Trip between 15 mA (½IΔn) within 1 s and trip below 30 mA (1×IΔn) within 300 ms; full performance is 5×IΔn within 40 ms (Type AC)',
      'Anywhere between 0 and 100 mA',
      '50% lower than rated',
      'Exactly 30 mA',
    ],
    correctAnswer: 0,
    explanation:
      "BS 7671 Reg 643.7 (A4:2026 retains the test regime): RCDs must not trip at 50% IΔn within 1 s, must trip at 100% IΔn within 300 ms (or 200 ms for additional protection in BS EN 61008/61009), and at 5× IΔn within 40 ms (Type AC at additional protection). 38 mA exceeds 100% so a fail.",
    section: '4.8',
    difficulty: 'advanced',
  },
  {
    id: 225,
    question:
      "When attending a domestic call for 'half the lights are off', your initial logical hypothesis tree should include:",
    options: [
      'Just one cause — broken bulb',
      'Loss of one phase (in TPN supply), tripped MCB/RCBO, loose connection at a feeder, line conductor break in a junction box or pendant, and accidental switching off',
      'Always assume it is the DNO',
      'Always replace the consumer unit',
    ],
    correctAnswer: 1,
    explanation:
      "A logical decision tree starts with the broadest categories (supply, distribution, circuit) and narrows down. Half-circuit symptoms in single-phase commonly indicate a loose neutral, broken switch wire, or specific MCB. In three-phase environments, single phase loss could affect a whole bank.",
    section: '4.8',
    difficulty: 'intermediate',
  },
  {
    id: 226,
    question:
      "A Martindale VI-13800 voltage indicator must be proved before and after use against:",
    options: [
      'A car battery',
      'A known live source (proving unit such as a PD440 or a confirmed live circuit) — the proving sequence is prove-test-prove',
      'A continuity tester',
      'Earth only',
    ],
    correctAnswer: 1,
    explanation:
      "GS38 'prove-dead' sequence: prove the indicator on a known live source (proving unit), test the circuit to be worked on, then re-prove the indicator on a known live source to confirm it did not fail open during the test. The Martindale VI-13800 is paired with a PD440 proving unit.",
    section: '4.8',
    difficulty: 'intermediate',
  },
  {
    id: 227,
    question:
      "On a TT supply with a Megger MFT measured Ra of 180 Ω and a 30 mA RCD, the calculated touch voltage Ut would be:",
    options: ['1.5 V', '5.4 V', '50 V', '180 V'],
    correctAnswer: 1,
    explanation:
      "Ut = Ra × IΔn = 180 × 0.030 = 5.4 V. BS 7671 limits touch voltage to 50 V AC (UL) for normal locations. The product Ra × IΔn must remain ≤50 V. Ra ≤ 200 Ω with a 30 mA RCD is the rule of thumb (gives 6 V touch voltage).",
    section: '4.8',
    difficulty: 'advanced',
  },
  {
    id: 228,
    question:
      "BS 7671 A4:2026 introduced changes to the EIC Schedule of Inspections. Which is now a required new column?",
    options: [
      'AFDD presence/justification for each circuit',
      'Customer signature column',
      'Material cost column',
      'Manufacturer warranty period',
    ],
    correctAnswer: 0,
    explanation:
      "A4:2026 expanded the schedule columns to include AFDD provision (to align with Reg 421.1.7) and clarified surge protection device (SPD) recording. Inspectors must now record whether AFDDs are fitted and a justification where they are not provided in higher-risk locations.",
    section: '4.8',
    difficulty: 'intermediate',
  },
  {
    id: 229,
    question:
      "Customer complains: 'the freezer compressor short-cycles'. Diagnostic tests should include:",
    options: [
      'Replace the freezer',
      'Verify supply voltage, check start/run capacitor capacitance with multimeter capacitance range, measure motor winding resistances, inspect overload relay and check refrigerant pressure',
      'Increase the MCB rating',
      'Add an RCD',
    ],
    correctAnswer: 1,
    explanation:
      "Compressor short-cycling indicates either electrical (failing start capacitor, faulty overload, low supply voltage causing stall) or refrigeration (low refrigerant tripping LP cut-out, dirty condenser). Capacitance test on the start/run capacitor (e.g. with Fluke 117 capacitance range) catches the most common electrical cause.",
    section: '4.8',
    difficulty: 'advanced',
  },
  {
    id: 230,
    question:
      "When recording fault diagnosis findings for the customer, IET CoP and good practice require:",
    options: [
      'Verbal summary only',
      "Written report including symptoms found, tests performed, results (with numerical values), root cause, repair carried out, retest results and recommendations — all dated and signed",
      'A photograph only',
      'A handshake',
    ],
    correctAnswer: 1,
    explanation:
      "Documented evidence is essential for liability, insurance and future reference. The report should be auditable, dated, signed, with named operative, customer details, instrument calibration date, test values and clear recommendations. Many insurers require this for indemnity cover.",
    section: '4.8',
    difficulty: 'intermediate',
  },
  {
    id: 231,
    question:
      "A variation order is appropriate when:",
    options: [
      'You add stickers to the consumer unit',
      'During fault diagnosis you discover the agreed scope must change (additional cabling required, asbestos found, hidden defects) — written variation captures cost, time and consent before extra work proceeds',
      'You take a tea break',
      'The customer changes wallpaper colour',
    ],
    correctAnswer: 1,
    explanation:
      "JCT Minor Works and most contracts require written variation orders signed by the customer/main contractor before extra work proceeds. Without one, you risk non-payment for additional time and materials. Variation captures scope change, cost impact, time impact and any consequential design changes.",
    section: '4.8',
    difficulty: 'intermediate',
  },
  {
    id: 232,
    question:
      "On a borescope inspection of a damp basement Wylex DB, you find green oxide on the busbar. The correct response is:",
    options: [
      'Spray with WD-40',
      'Code C2 (potentially dangerous) on EICR, isolate, plan replacement of affected components, investigate water ingress and moisture source as the root cause',
      'Ignore — cosmetic only',
      'Paint over',
    ],
    correctAnswer: 1,
    explanation:
      "Green corrosion on copper busbars indicates moisture exposure and sustained electrolytic activity, leading to high-resistance joints and eventual arcing. Code C2 reflects potentially dangerous condition requiring urgent remedial action. Address the moisture source (leaking pipe, condensation) as part of the rectification.",
    section: '4.8',
    difficulty: 'advanced',
  },
  {
    id: 233,
    question:
      "A residential socket measures with a Fluke 1664FC at PFC of 1.65 kA. The installed RCBO is a 32 A type B with breaking capacity of 6 kA. This:",
    options: [
      'Fails — RCBO too low',
      "Passes — installed device's 6 kA breaking capacity exceeds the prospective fault current",
      'Requires re-testing',
      'Has nothing to do with the device',
    ],
    correctAnswer: 1,
    explanation:
      "BS 7671 Reg 434.5.1 requires Icn (rated short-circuit capacity) ≥ prospective fault current at the device. 6 kA > 1.65 kA — pass. Domestic boards typically have 6 kA devices; commercial boards often need 10 kA or higher.",
    section: '4.8',
    difficulty: 'advanced',
  },
  {
    id: 234,
    question:
      "When IT equipment fails and dies during a fault investigation, the most likely cause to investigate is:",
    options: [
      'Cosmic rays',
      'A common-mode transient (lightning, switching surge) reaching the equipment via mains, data cable or earth — investigate SPDs, data isolation, surge events',
      'Wrong colour cable',
      'No cause',
    ],
    correctAnswer: 1,
    explanation:
      "BS 7671 Section 443 requires surge protection devices in many installations. Common-mode transients enter via the supply, data cabling and earth. SPD coordination (Type 1 at origin, Type 2 at distribution boards, Type 3 at sensitive loads) is essential for IT equipment protection.",
    section: '4.8',
    difficulty: 'advanced',
  },
  {
    id: 235,
    question:
      "When working in a hazardous area (DSEAR / ATEX zone 1), the special precautions include:",
    options: [
      'Standard isolation only',
      "Use intrinsically safe (Ex i) test equipment, obtain a permit-to-work, gas-test the area, wear anti-static PPE, and only use methods compliant with the area's zone classification",
      'Use only the smallest tools',
      'No special procedure required',
    ],
    correctAnswer: 1,
    explanation:
      "DSEAR 2002 and the EX framework require all equipment used in hazardous areas to be certified for the zone (Zone 0, 1, 2 for gas; 20, 21, 22 for dust). Test instruments must be Ex i intrinsically safe. Permit-to-work and gas-test before any electrical work; never break a circuit live in a flammable atmosphere.",
    section: '4.8',
    difficulty: 'advanced',
  },
  {
    id: 236,
    question:
      "After repairing a fault that involved chasing brick to bury new cable, the building fabric must be:",
    options: [
      'Left as-is',
      'Reinstated to at least the original condition using suitable mortar/plaster, with cable in safe zones or in earthed metal containment, and any made-good areas redecorated as agreed',
      'Painted any colour',
      'Filled with foam',
    ],
    correctAnswer: 1,
    explanation:
      "Reinstating building fabric is a contractual responsibility (often by the electrician unless excluded). Cables must remain in safe zones (BS 7671 522.6) or be mechanically protected. Made-good areas should be flush, level and ready for redecoration as agreed in the variation.",
    section: '4.8',
    difficulty: 'basic',
  },
  {
    id: 237,
    question:
      "A schedule of test results for fault diagnosis should record:",
    options: [
      'Only failed values',
      'Circuit reference, conductor sizes, R1+R2, R2 (where applicable), IR live-live and live-earth, polarity, Zs, RCD trip times at 1× and 5×, AFDD test, all with limits and pass/fail',
      'Just a tick or cross',
      'Nothing — verbal handover is enough',
    ],
    correctAnswer: 1,
    explanation:
      "BS 7671 A4:2026 schedule of test results requires comprehensive recording for each circuit. Inspectors and future contractors rely on these values to assess condition and establish baselines. Many MFTs (MFT1741+, Fluke 1664FC) export results directly to PDF/CSV for inclusion in reports.",
    section: '4.8',
    difficulty: 'intermediate',
  },
  {
    id: 238,
    question:
      "An IET GN3 (Inspection & Testing) recommended approach to selecting a sample size for periodic inspection is:",
    options: [
      'Always 100%',
      'Risk-based — sample to a level that gives confidence in the conclusions, with sampling agreed with the duty holder, and 100% of accessible parts visually inspected',
      'Always 10%',
      'Whatever is quickest',
    ],
    correctAnswer: 1,
    explanation:
      "GN3 (and BS 7671 Part 6) require sampling to be agreed before testing, justified by risk assessment, and clearly documented. Higher-risk locations and safety-critical circuits demand higher sampling. Visual inspection should aim for 100% of accessible parts.",
    section: '4.8',
    difficulty: 'intermediate',
  },
  {
    id: 239,
    question:
      "On the Megger MFT1741+ Z low-current test (no-trip loop test), the instrument injects a low current to measure Zs without tripping a 30 mA RCD. The expected accuracy versus the high-current test is:",
    options: [
      'Identical',
      'Slightly lower accuracy than the high-current test (factor of 2-3 in resolution) but adequate for verifying compliance with Table 41.3',
      'Always wrong',
      'Higher accuracy',
    ],
    correctAnswer: 1,
    explanation:
      "Low-current Z tests (sometimes called 'no-trip Zs') let you measure live loop impedance without nuisance-tripping protection. They are slightly less accurate than high-current tests but accurate enough for compliance. A re-test on a circuit with the RCD bypassed (where allowed) gives the most accurate result.",
    section: '4.8',
    difficulty: 'advanced',
  },
  {
    id: 240,
    question:
      "An oscilloscope captured on a VFD output shows a high dV/dt waveform with bearing currents on the motor shaft. The mitigation is:",
    options: [
      'Replace the motor only',
      "Fit a sine-wave or dV/dt filter at the VFD output, install shaft grounding rings, use VFD-rated motor cables (low-capacitance, screened) and bond the cable screen 360° at both ends",
      'Reduce supply voltage',
      'Change phase rotation',
    ],
    correctAnswer: 1,
    explanation:
      "VFD switching causes high dV/dt that capacitively couples to motor shafts via stray capacitance, eroding bearings (electrical discharge machining). Mitigation: dV/dt filter, sine-wave filter, shaft grounding (Aegis SGR), VFD-rated motor cable (e.g. ÖLFLEX VFD), 360° EMC glands at both ends.",
    section: '4.8',
    difficulty: 'advanced',
  },
  {
    id: 241,
    question:
      "A fault in a lead-acid battery bank reveals that two of eight cells are at 1.8 V (others 2.1 V). Action:",
    options: [
      'Recharge fully and ignore',
      'Identify the discharged cells as defective (sulphation or open internal connection), test specific gravity, and replace as a matched set; never mix new and old cells in a series string',
      'Add water',
      'Disconnect them',
    ],
    correctAnswer: 1,
    explanation:
      "Cells in a series string must be matched in age, capacity and state of health. Two cells at 1.8 V with others at 2.1 V indicate either sulphation, plate damage or internal short. Replacing the whole string is generally required; mixed strings cause overcharging of healthy cells and undercharging of weak ones.",
    section: '4.8',
    difficulty: 'advanced',
  },
  {
    id: 242,
    question:
      "When informing a domestic customer of fault findings, BS 7671 / consumer protection good practice requires:",
    options: [
      'Use only technical jargon',
      "Plain English explanation of what was found, the risk it presents, the proposed remedy, the cost and time impact, and the customer's decision recorded in writing before proceeding",
      "Only tell what's good news",
      'Speak only to the spouse',
    ],
    correctAnswer: 1,
    explanation:
      "Consumer Rights Act 2015 and IET CoP require clear communication. The customer must understand the issue and consent to remedial work. Written records protect both parties. Avoid jargon, explain in terms of safety and risk, and confirm consent in writing before commencing.",
    section: '4.8',
    difficulty: 'intermediate',
  },
  {
    id: 243,
    question:
      "Functional testing after fault correction must verify:",
    options: [
      'Only that the circuit is energised',
      'All protective devices operate (RCD test, RCBO test, AFDD self-test), correct switching/control sequences, interlocks, emergency stops, automatic devices and that the system performs as intended without re-introducing the original fault',
      'Just check no smoke',
      'No testing needed after repair',
    ],
    correctAnswer: 1,
    explanation:
      "BS 7671 Reg 643.10 (functional testing) requires verification that protective devices, switchgear, controls and interlocks operate as intended. Many faults stem from controls and interlocks rather than fixed wiring; functional testing confirms the whole system works after repair.",
    section: '4.8',
    difficulty: 'intermediate',
  },
  {
    id: 244,
    question:
      "For safe disposal of waste from a fault repair (broken accessories, off-cuts, packaging), you should:",
    options: [
      'Take it home and burn it',
      'Segregate at source — recyclable cable scrap, WEEE for accessories with electronics, mixed waste, and asbestos suspect material handled separately under CAR 2012 / HSG264',
      'Leave on site',
      'Throw in domestic bin',
    ],
    correctAnswer: 1,
    explanation:
      "Waste must be segregated under the Environmental Protection (Duty of Care) Regulations. Cable scrap is recyclable (high copper value). WEEE Regulations cover electrical waste. Asbestos suspect material requires a licensed contractor under CAR 2012; never disturb without testing.",
    section: '4.8',
    difficulty: 'intermediate',
  },
  {
    id: 245,
    question:
      "A complaint: 'the EV charger sometimes stops mid-charge then restarts'. Diagnostic considerations include:",
    options: [
      'Replace the EV',
      'Check supply voltage stability under load (DNO voltage drop), CT clamp position and orientation if load-shedding is enabled, communications/firmware logs, RCD trip/auto-reset behaviour, and weather/temperature effects on the charger',
      'Always blame the car',
      'Increase the breaker rating',
    ],
    correctAnswer: 1,
    explanation:
      "EV chargers are complex systems with supply, comms, CTs and protective monitoring. A clamp meter at the origin captures voltage stability under EV load; CT misorientation causes incorrect load-shedding; firmware logs reveal communication faults. Many manufacturers provide cloud telemetry (Ohme, Wallbox, EO) to diagnose remotely.",
    section: '4.8',
    difficulty: 'advanced',
  },
  {
    id: 246,
    question:
      "Following A4:2026, TN-C-S supplies are now formally referenced as which alternative term in BS 7671?",
    options: [
      'PEN',
      'PNB (Protective Neutral Bonding) — recognising the LV practice of bonding to the combined neutral/earth at the consumer cut-out',
      'TT',
      'IT',
    ],
    correctAnswer: 1,
    explanation:
      "A4:2026 introduced PNB (Protective Neutral Bonding) terminology alongside TN-C-S/PME to better describe UK distribution practice where the PEN is bonded to earth at the supply origin. Practical implications include open-PEN risk, requiring approved PEN-fault devices for EV charging supplies in many cases.",
    section: '4.8',
    difficulty: 'advanced',
  },
  {
    id: 247,
    question:
      "A flickering LED downlight controlled by a remote dimmer is reported. Diagnostic logic should consider:",
    options: [
      'Replace lamp only',
      'Compatibility of the LED driver with the dimmer (leading-edge vs trailing-edge, minimum load), neutral connection at the switch (for smart dimmers), driver minimum-load issue, and harmonic/DC supply asymmetry causing 100 Hz flicker',
      'Always replace dimmer',
      'Add more lamps',
    ],
    correctAnswer: 1,
    explanation:
      "LED flicker stems from dimmer/driver mismatch (most common), insufficient minimum load on a leading-edge dimmer, lack of neutral at smart dimmers, or supply DC offset. Match dimmer type to driver datasheet (trailing edge usually preferred for LED), and check minimum load. Some installs need a 'min-load' resistor pack.",
    section: '4.8',
    difficulty: 'advanced',
  },
  {
    id: 248,
    question:
      "When a Hager Design 30 RCBO trips on a kitchen radial, the operator opens the device and finds black soot inside. The action is:",
    options: [
      'Reset and continue',
      'Replace the device — internal arcing has occurred and the contact set integrity cannot be guaranteed; investigate cause of severe fault that produced the arcing',
      'Spray with cleaner',
      'Increase rating',
    ],
    correctAnswer: 1,
    explanation:
      "Black carbon deposits inside a protective device indicate internal arcing — likely a high prospective fault current event approaching the device's breaking capacity. Replace the device, log the fault event, and investigate the originating fault to ensure it has been corrected. Many manufacturers void warranty on devices showing arcing.",
    section: '4.8',
    difficulty: 'advanced',
  },
  {
    id: 249,
    question:
      "A test result schedule shows IR L-N = 0.2 MΩ on a final circuit. Per BS 7671 Table 64, this is:",
    options: [
      'Pass',
      'Fail (minimum 1 MΩ for LV) — investigate insulation degradation, moisture ingress, damaged cables or connected equipment that should have been disconnected',
      'Borderline pass',
      'Acceptable for outdoor circuits',
    ],
    correctAnswer: 1,
    explanation:
      "0.2 MΩ is well below the 1 MΩ minimum for LV circuits up to 500 V. Investigate damp ingress, cable damage, or connected equipment leakage. Often 0.2 MΩ values clear when surge-suppression devices, electronic loads or filter capacitors are disconnected; otherwise, fault-find by progressive disconnection of circuit sections.",
    section: '4.8',
    difficulty: 'intermediate',
  },
  {
    id: 250,
    question:
      "After fault correction is complete, the leave-clean checklist includes:",
    options: [
      'Just leave',
      "Power restored, all covers refitted, labels updated, customer briefed, work area swept and waste removed, certificate left with customer or emailed, and instruments returned to vehicle",
      "Take customer's keys",
      'Leave tools for next visit',
    ],
    correctAnswer: 1,
    explanation:
      "Professional close-out includes power restoration, all enclosures refitted with correct fixings, updated labels (circuit charts, safety signage), customer brief and certificate handover, clean and clear work area, and ensuring no instruments left behind. This protects the customer and the contractor's reputation.",
    section: '4.8',
    difficulty: 'basic',
  },
];

// Helper function to get random questions for mock exams
export const getRandomQuestions = (count: number): Question[] => {
  const shuffled = [...module4Questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// Helper function to get questions by section
export const getQuestionsBySection = (section: string): Question[] => {
  return module4Questions.filter((q) => q.section === section);
};

// Helper function to get questions by difficulty
export const getQuestionsByDifficulty = (
  difficulty: 'basic' | 'intermediate' | 'advanced'
): Question[] => {
  return module4Questions.filter((q) => q.difficulty === difficulty);
};

/**
 * Validate the question bank structure and distribution.
 * Returns isValid: true when total questions, section coverage and difficulty
 * spread all sit within the configured ranges.
 */
export function validateQuestionBank(): {
  isValid: boolean;
  totalQuestions: number;
  sectionDistribution: Record<string, number>;
  difficultyDistribution: Record<string, number>;
  issues: string[];
} {
  const issues: string[] = [];
  const sectionDistribution: Record<string, number> = {};
  const difficultyDistribution: Record<string, number> = {};

  module4Questions.forEach((q) => {
    const section = q.section ?? 'unknown';
    const difficulty = q.difficulty ?? 'unknown';
    sectionDistribution[section] = (sectionDistribution[section] || 0) + 1;
    difficultyDistribution[difficulty] = (difficultyDistribution[difficulty] || 0) + 1;
  });

  if (module4Questions.length < 240) {
    issues.push(
      `Insufficient questions: ${module4Questions.length} (target: 250)`
    );
  }

  const expectedSections = ['4.1', '4.2', '4.3', '4.4', '4.5', '4.6', '4.7', '4.8'];
  expectedSections.forEach((section) => {
    if (!sectionDistribution[section] || sectionDistribution[section] < 15) {
      issues.push(
        `Section ${section} has ${sectionDistribution[section] || 0} questions (target: 15+)`
      );
    }
  });

  const total = module4Questions.length;
  const basicPct = ((difficultyDistribution.basic || 0) / total) * 100;
  const intermediatePct = ((difficultyDistribution.intermediate || 0) / total) * 100;
  const advancedPct = ((difficultyDistribution.advanced || 0) / total) * 100;

  if (basicPct < 20 || basicPct > 50) {
    issues.push(`Basic out of range: ${basicPct.toFixed(1)}% (target: 20-50%)`);
  }
  if (intermediatePct < 30 || intermediatePct > 55) {
    issues.push(`Intermediate out of range: ${intermediatePct.toFixed(1)}% (target: 30-55%)`);
  }
  if (advancedPct < 10 || advancedPct > 35) {
    issues.push(`Advanced out of range: ${advancedPct.toFixed(1)}% (target: 10-35%)`);
  }

  return {
    isValid: issues.length === 0,
    totalQuestions: total,
    sectionDistribution,
    difficultyDistribution,
    issues,
  };
}

export default module4Questions;
