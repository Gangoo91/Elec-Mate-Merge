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
    options: [
      'High resistance joint',
      'Short circuit fault',
      'Open circuit fault',
      'Earth fault',
    ],
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
      'Overheating of cables',
      'No voltage at the load',
      'Flickering lights',
    ],
    correctAnswer: 2,
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
      'No danger if protected by fuse',
      'Immediate circuit breaker trip',
      'Fire risk from overheating',
    ],
    correctAnswer: 3,
    explanation:
      'High resistance joints generate heat when current flows through them (P=I²R), creating a significant fire risk as they may not be detected by protective devices.',
    section: '4.1',
    difficulty: 'intermediate',
  },
  {
    id: 4,
    question: 'An earth fault in a TN-S system would typically cause:',
    options: [
      'Operation of the overcurrent device or RCD',
      'A gradual rise in supply voltage',
      'Increased load current with no protective device action',
      'Reduced earth fault loop impedance with no effect',
    ],
    correctAnswer: 0,
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
      'High resistance in heating element',
      'Open circuit in lighting',
      'Intermittent earth leakage',
      'Phase to neutral short circuit',
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
      'Reduced earth loop impedance',
      'Higher current in the phase conductor',
      'No effect on circuit operation',
      'Loss of supply to the load',
    ],
    correctAnswer: 3,
    explanation:
      'A broken neutral prevents current returning to the source, effectively creating an open circuit and loss of supply to connected loads.',
    section: '4.1',
    difficulty: 'basic',
  },
  {
    id: 8,
    question: 'What type of fault causes uneven loading in a three-phase system?',
    options: [
      'Phase imbalance',
      'Short circuit fault',
      'Earth loop fault',
      'Transient overvoltage',
    ],
    correctAnswer: 0,
    explanation:
      'Phase imbalance occurs when loads are unevenly distributed across phases, causing different currents in each phase conductor and neutral current.',
    section: '4.1',
    difficulty: 'intermediate',
  },
  {
    id: 9,
    question: 'An insulation breakdown between phase and earth would be classified as:',
    options: [
      'Short circuit fault',
      'Earth fault',
      'Neutral fault',
      'Open circuit fault',
    ],
    correctAnswer: 1,
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
      'Earth leakage current',
      'Reduced current flow or open circuit',
      'Voltage rise at the load',
    ],
    correctAnswer: 2,
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
      'Earth and neutral are swapped',
      'Two phases are connected together',
      'Phase and neutral connections are reversed',
    ],
    correctAnswer: 3,
    explanation:
      'Cross-polarity (reversed polarity) happens when phase and neutral are incorrectly connected, potentially leaving equipment live when switched off.',
    section: '4.1',
    difficulty: 'basic',
  },
  {
    id: 12,
    question: 'What effect does a borrowed neutral have in a multi-circuit installation?',
    options: [
      'Loss of RCD protection for affected circuits',
      'Improved discrimination between protective devices',
      'A reduction in earth fault loop impedance',
      'Lower neutral current in both circuits',
    ],
    correctAnswer: 0,
    explanation:
      "A borrowed neutral (shared between circuits) defeats RCD protection as the currents in phase and neutral don't match, causing nuisance tripping or failure to trip on genuine faults.",
    section: '4.1',
    difficulty: 'advanced',
  },
  {
    id: 13,
    question: 'Arcing faults are particularly dangerous because they:',
    options: [
      'Always trip the MCB instantly on the first half-cycle',
      'Can sustain at low currents below protective device thresholds',
      'Only occur on de-energised circuits',
      'Reduce the conductor temperature as they develop',
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
      'No protective device operation',
      'Very high fault current',
      'Gradual voltage reduction',
    ],
    correctAnswer: 2,
    explanation:
      'Phase-to-phase faults create a low impedance path between two phase conductors, resulting in very high fault currents that should operate overcurrent protection rapidly.',
    section: '4.1',
    difficulty: 'intermediate',
  },
  {
    id: 15,
    question: 'Thermal damage to cable insulation typically results from:',
    options: [
      'Operating well below the rated current',
      'Excessively low ambient temperature',
      'Correctly sized conductors with sound terminations',
      'Sustained overcurrent or poor terminations',
    ],
    correctAnswer: 3,
    explanation:
      'Thermal damage occurs when cables carry more current than their rating or when high resistance terminations generate heat, degrading the insulation over time.',
    section: '4.1',
    difficulty: 'intermediate',
  },
  {
    id: 16,
    question: 'What distinguishes a bolted fault from an arcing fault?',
    options: [
      'Bolted faults have solid metal-to-metal contact',
      'There is no practical difference',
      'Bolted faults are less dangerous',
      'Arcing faults have higher current',
    ],
    correctAnswer: 0,
    explanation:
      'A bolted fault has solid metallic contact creating very low resistance and maximum fault current, while arcing faults have higher resistance due to the arc gap.',
    section: '4.1',
    difficulty: 'advanced',
  },
  {
    id: 17,
    question: 'Voltage drop faults in long cable runs are categorised as:',
    options: [
      'Not classified as faults',
      'Series faults',
      'Earth faults',
      'Parallel faults',
    ],
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
      'Reduce the earth fault loop impedance',
      'Increase the prospective short circuit current',
      'Increase earth fault loop impedance',
      'Have no effect on disconnection times',
    ],
    correctAnswer: 2,
    explanation:
      "A fault in the CPC increases earth fault loop impedance, potentially to levels where protective devices won't operate quickly enough during an earth fault.",
    section: '4.1',
    difficulty: 'intermediate',
  },
  {
    id: 19,
    question: 'Sympathetic tripping in a distribution system is caused by:',
    options: [
      'A fault confined entirely to a single final circuit',
      'Loads being evenly balanced across all phases',
      'Correct discrimination between protective devices',
      'Fault current flowing through multiple protective devices',
    ],
    correctAnswer: 3,
    explanation:
      'Sympathetic tripping occurs when a fault current flows through upstream protective devices, causing them to operate along with the device meant to clear the fault.',
    section: '4.1',
    difficulty: 'advanced',
  },
  {
    id: 20,
    question: 'Which fault type would cause a motor to run slowly and overheat?',
    options: [
      'Single phasing (loss of one phase)',
      'Short circuit in windings',
      'Complete open circuit',
      'Earth fault to frame',
    ],
    correctAnswer: 0,
    explanation:
      'Single phasing causes a three-phase motor to run on only two phases, producing reduced torque, running slowly under load, and overheating due to unbalanced currents.',
    section: '4.1',
    difficulty: 'intermediate',
  },
  {
    id: 21,
    question: 'Tracking faults on insulation surfaces are caused by:',
    options: [
      'A sudden bolted short circuit with no warning',
      'Carbonised paths from surface contamination',
      'Conductors operating below their rated temperature',
      'Excessive torque applied at the terminations',
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
      'A permanent short circuit across the supply',
      'Smooth, silent and reliable operation',
      'Intermittent starting or chattering',
      'A complete loss of the protective conductor',
    ],
    correctAnswer: 2,
    explanation:
      'Failing contactor contacts can cause intermittent power to the motor, chattering from poor holding, or arcing that damages contacts further.',
    section: '4.1',
    difficulty: 'intermediate',
  },
  {
    id: 23,
    question: 'What type of fault does an AFDD (Arc Fault Detection Device) protect against?',
    options: [
      'Sustained overload current only',
      'Earth leakage current to the CPC',
      'Overvoltage transients from the supply',
      'Series and parallel arc faults',
    ],
    correctAnswer: 3,
    explanation:
      'AFDDs are specifically designed to detect the characteristic high-frequency signatures of dangerous series and parallel arc faults that may not trip conventional protection.',
    section: '4.1',
    difficulty: 'intermediate',
  },
  {
    id: 24,
    question: 'Corrosion at a cable termination is classified as:',
    options: [
      'A high resistance fault',
      'An earth fault',
      'An open circuit',
      'Not a fault condition',
    ],
    correctAnswer: 0,
    explanation:
      'Corrosion increases the resistance at terminations, creating a high resistance joint that can cause overheating and voltage drop under load.',
    section: '4.1',
    difficulty: 'basic',
  },
  {
    id: 25,
    question: 'A broken neutral in a three-phase four-wire system could cause:',
    options: [
      'Perfectly balanced phase voltages',
      'Dangerous overvoltage on lightly loaded phases',
      'A reduction in voltage across every phase equally',
      'Immediate operation of all overcurrent devices',
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
      'Perfect insulation condition',
      'Insulation degradation beginning',
      'Overcurrent protection needed',
    ],
    correctAnswer: 2,
    explanation:
      'Partial discharge is localised breakdown of insulation that indicates degradation has started, potentially leading to complete insulation failure if not addressed.',
    section: '4.1',
    difficulty: 'advanced',
  },
  {
    id: 27,
    question:
      'What fault condition would cause an electric shower to have reduced water temperature?',
    options: [
      'A reversed polarity at the supply terminals',
      'A missing earth connection to the unit',
      'An oversized protective device fitted',
      'Open circuit heating element',
    ],
    correctAnswer: 3,
    explanation:
      'A partial open circuit in the heating element (such as one element failing in a dual element shower) reduces heating power, resulting in lower water temperature.',
    section: '4.1',
    difficulty: 'intermediate',
  },
  {
    id: 28,
    question: 'Harmonics in electrical systems can be considered as:',
    options: [
      'A type of power quality fault',
      'Not a problem in modern systems',
      'Only affecting three-phase systems',
      'Beneficial for motor operation',
    ],
    correctAnswer: 0,
    explanation:
      'Harmonics are a power quality issue causing additional heating in conductors and equipment, neutral overload in three-phase systems, and interference with sensitive electronics.',
    section: '4.1',
    difficulty: 'advanced',
  },
  {
    id: 29,
    question: 'A fault causing flickering lights at random intervals is likely:',
    options: [
      'A correctly torqued, sound termination',
      'Loose connection (high resistance joint)',
      'An oversized neutral conductor',
      'A solid bolted short circuit to earth',
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
      'A dead short circuit between line and neutral',
      'An open circuit in the protective conductor',
      'Borderline overcurrent due to undersized cable',
      'Reversed polarity at the consumer unit',
    ],
    correctAnswer: 2,
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
      'Replacing every component until the fault clears',
      'Testing only at the supply origin repeatedly',
      'Working from the load back to the supply in order',
      'Testing at the midpoint to eliminate half the circuit',
    ],
    correctAnswer: 3,
    explanation:
      'The half-split method tests at the circuit midpoint to determine which half contains the fault, then repeating the process to efficiently locate the fault.',
    section: '4.2',
    difficulty: 'basic',
  },
  {
    id: 32,
    question: 'Before beginning fault diagnosis, the first step should be:',
    options: [
      'Gather information from the user about symptoms',
      'Immediately replace the consumer unit',
      'Begin dismantling the load equipment',
      'Carry out a full insulation resistance test of every circuit',
    ],
    correctAnswer: 0,
    explanation:
      'Gathering information about symptoms, when the fault occurs, and what changed before it started helps focus diagnosis and avoid wasting time.',
    section: '4.2',
    difficulty: 'basic',
  },
  {
    id: 33,
    question: "The 'six point' approach to fault finding includes all EXCEPT:",
    options: [
      'Collect evidence',
      'Replace all components',
      'Locate the fault',
      'Analyse evidence',
    ],
    correctAnswer: 1,
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
      'The middle of the circuit',
      'The supply point',
      'The protective device',
    ],
    correctAnswer: 2,
    explanation:
      'Input to output method starts testing at the supply end and progresses systematically toward the load, checking each stage until the fault is found.',
    section: '4.2',
    difficulty: 'basic',
  },
  {
    id: 35,
    question: 'What is the main advantage of the output to input fault finding method?',
    options: [
      'It is the only method permitted by BS 7671',
      'It avoids any need to isolate the circuit',
      'It always locates the fault in a single test',
      'Useful when fault symptoms appear at the load',
    ],
    correctAnswer: 3,
    explanation:
      'Output to input is effective when symptoms manifest at the load end, as you work backwards from the known problem toward the supply.',
    section: '4.2',
    difficulty: 'intermediate',
  },
  {
    id: 36,
    question: 'Visual inspection during fault finding should identify:',
    options: [
      'Signs of overheating, damage, or poor workmanship',
      'The exact insulation resistance value of each cable',
      'The earth fault loop impedance of the circuit',
      'The prospective fault current at the origin',
    ],
    correctAnswer: 0,
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
      'Regulations require root cause analysis always',
      'To prevent recurrence of the same fault',
      'To justify higher charges',
    ],
    correctAnswer: 2,
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
      'The motor bearings and shaft alignment',
      'The internal stator windings first',
      'The supply transformer at the substation',
      'The easiest to access components (fuses, contactors)',
    ],
    correctAnswer: 3,
    explanation:
      'Start with easily accessible and commonly failing components like fuses, overloads, and contactors before moving to more complex motor testing.',
    section: '4.2',
    difficulty: 'intermediate',
  },
  {
    id: 40,
    question: 'Symptom analysis in fault finding requires:',
    options: [
      'Understanding what each symptom indicates about potential causes',
      'Replacing components in the order they are listed',
      'Ignoring the customer account and starting from scratch',
      'Assuming the most expensive part has failed',
    ],
    correctAnswer: 0,
    explanation:
      'Symptom analysis involves understanding what each observed symptom tells you about possible fault locations and causes.',
    section: '4.2',
    difficulty: 'intermediate',
  },
  {
    id: 41,
    question: 'A fault that only appears intermittently is best diagnosed by:',
    options: [
      'Replacing the consumer unit straight away',
      'Continuous monitoring and recreating fault conditions',
      'A single voltage test at the supply origin',
      'Assuming it has self-cleared and taking no action',
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
      'Only the original purchase invoice for the equipment',
      'The manufacturer warranty card alone',
      'Circuit diagrams, equipment manuals, and previous test records',
      'A copy of the customer payment receipt',
    ],
    correctAnswer: 2,
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
      'Always starting at the furthest point from supply',
      'Replacing the protective device before testing',
      'Checking common failure points before rare ones',
    ],
    correctAnswer: 3,
    explanation:
      'Efficient diagnosis checks common failure points and statistically probable causes first, based on experience and component reliability data.',
    section: '4.2',
    difficulty: 'intermediate',
  },
  {
    id: 44,
    question: 'When multiple faults are suspected, you should:',
    options: [
      'Identify and fix one fault at a time, testing after each',
      'Replace all suspect components simultaneously',
      'Repair the most visible fault and stop there',
      'Energise the circuit before any fault is corrected',
    ],
    correctAnswer: 0,
    explanation:
      "Fixing and testing one fault at a time ensures you identify all issues and don't mask one fault while fixing another.",
    section: '4.2',
    difficulty: 'intermediate',
  },
  {
    id: 45,
    question: "What is the purpose of 'stress testing' during fault diagnosis?",
    options: [
      "To deliberately damage components for replacement",
      "To recreate fault conditions that don't appear at normal load",
      "To reduce the test current below normal levels",
      "To shorten the time spent on diagnosis",
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
      'A purely intermittent fault that has now cleared',
      'A simple overload that will settle on its own',
      'A persistent fault still exists on the circuit',
      'The protective device is oversized for the circuit',
    ],
    correctAnswer: 2,
    explanation:
      "Immediate tripping indicates a fault is still present - either a short circuit or earth fault that hasn't been cleared.",
    section: '4.2',
    difficulty: 'basic',
  },
  {
    id: 47,
    question: 'Thermal imaging during fault finding is useful for detecting:',
    options: [
      'The exact resistance of each connection in ohms',
      'Insulation resistance values between conductors',
      'The polarity of socket outlets',
      'Hot spots indicating high resistance joints or overloading',
    ],
    correctAnswer: 3,
    explanation:
      'Thermal imaging reveals hot spots caused by high resistance connections, overloaded conductors, or components operating above normal temperature.',
    section: '4.2',
    difficulty: 'intermediate',
  },
  {
    id: 48,
    question: "What does 'bracketing' the fault mean in diagnosis?",
    options: [
      'Narrowing down the fault location to between two test points',
      'Recording the fault on the certification paperwork',
      'Fitting protective brackets around exposed cables',
      'Replacing the bracket that supports the cable run',
    ],
    correctAnswer: 0,
    explanation:
      'Bracketing involves testing to establish the fault is between two known points, then progressively narrowing the range until the exact location is found.',
    section: '4.2',
    difficulty: 'intermediate',
  },
  {
    id: 49,
    question: 'A function test after fault repair should verify:',
    options: [
      'Only that the insulation resistance has improved',
      'The equipment operates correctly under normal conditions',
      'That the customer has paid the invoice in full',
      'That the original symptom is still present',
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
      'Insulation resistance',
      'Voltage at the supply point',
      'Earth loop impedance',
    ],
    correctAnswer: 2,
    explanation:
      'Verifying supply voltage at the origin establishes whether power is present before investigating further along the circuit.',
    section: '4.2',
    difficulty: 'basic',
  },
  {
    id: 51,
    question: 'Logic diagrams in fault finding are used to:',
    options: [
      'Record the final test results for certification',
      'Show the physical layout of cables in a building',
      'Replace the need for any measured testing',
      'Systematically work through possible causes',
    ],
    correctAnswer: 3,
    explanation:
      'Logic diagrams (flowcharts) guide systematic diagnosis through yes/no decisions, helping ensure all possibilities are considered.',
    section: '4.2',
    difficulty: 'intermediate',
  },
  {
    id: 52,
    question: 'Comparing measurements with known good values helps to:',
    options: [
      'Identify deviations that indicate faults',
      'Remove the need to isolate the circuit',
      'Guarantee the fault is in the supply cable',
      'Confirm the protective device rating only',
    ],
    correctAnswer: 0,
    explanation:
      'Comparing readings with manufacturer specifications or known good equipment highlights abnormal values that may indicate faults.',
    section: '4.2',
    difficulty: 'basic',
  },
  {
    id: 53,
    question: 'Why should you test with load connected when possible during diagnosis?',
    options: [
      'To increase energy consumption',
      'Some faults only appear under load conditions',
      'Regulations require it always',
      'To make measurements easier',
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
      'Only matters for insurance claims',
      'May reveal patterns or recurring issues',
      'Should be destroyed after each fault',
    ],
    correctAnswer: 2,
    explanation:
      'Historical data can reveal patterns, recurring issues, or deteriorating conditions that help diagnose current faults and prevent future ones.',
    section: '4.2',
    difficulty: 'intermediate',
  },
  {
    id: 55,
    question: "The 'divide and conquer' fault finding method is another term for:",
    options: [
      'Random testing',
      'Component replacement',
      'Visual inspection',
      'Half-split method',
    ],
    correctAnswer: 3,
    explanation:
      'Divide and conquer is another term for the half-split method, where the circuit is divided and tested to eliminate half at each step.',
    section: '4.2',
    difficulty: 'basic',
  },
  {
    id: 56,
    question: 'What should be verified before declaring a fault repair complete?',
    options: [
      'Equipment operation, safety tests pass, and cause addressed',
      'Only that the visible damage has been replaced',
      'That the circuit re-energises without immediate tripping',
      'That the customer is happy with the appearance',
    ],
    correctAnswer: 0,
    explanation:
      'Complete repair verification includes confirming correct operation, passing relevant safety tests, and ensuring the root cause has been addressed.',
    section: '4.2',
    difficulty: 'intermediate',
  },
  {
    id: 57,
    question: 'When a fault causes one of several identical devices to malfunction, this suggests:',
    options: [
      'A fault in the main incoming supply',
      'A fault specific to that individual device or its circuit',
      'A fault affecting the whole distribution board',
      'A fault in the DNO network outside the property',
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
      'Buried cable runs within solid walls',
      'Fixed wiring that cannot be disconnected',
      'Discrete components or modular equipment',
      'Faults in the DNO supply network',
    ],
    correctAnswer: 2,
    explanation:
      'Unit substitution works well for discrete components or modules that can be easily swapped to determine if they are the fault source.',
    section: '4.2',
    difficulty: 'intermediate',
  },
  {
    id: 59,
    question: 'Environmental conditions should be considered during fault diagnosis because:',
    options: [
      'They only affect the appearance of the installation',
      'They are never relevant to electrical faults',
      'They only matter for outdoor installations',
      'Temperature, moisture, and contamination affect component operation',
    ],
    correctAnswer: 3,
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
      "A short circuit between line and neutral",
      "A break in the protective conductor",
      "An overloaded final circuit",
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
      'Excessive insulation resistance values',
      'Loose or intermittent connections',
      'Correct phase rotation in three-phase supplies',
      'The prospective fault current at the origin',
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
      'Record the calibration date of test instruments',
      'Establish the physical route of cables in the building',
      'Trace signal paths and understand circuit operation',
      'Determine the earth fault loop impedance directly',
    ],
    correctAnswer: 2,
    explanation:
      'Schematics enable understanding of how the control system should work, helping identify where the actual behaviour deviates from expected.',
    section: '4.2',
    difficulty: 'intermediate',
  },
  {
    id: 63,
    question: 'A fault tree analysis is a method of:',
    options: [
      'Recording the physical wiring route of a circuit',
      'Measuring the insulation resistance of conductors',
      'Listing the test instruments used on a job',
      'Systematically mapping possible causes for a fault',
    ],
    correctAnswer: 3,
    explanation:
      'Fault tree analysis is a systematic method of mapping all possible causes that could lead to a particular fault, helping ensure thorough diagnosis.',
    section: '4.2',
    difficulty: 'advanced',
  },
  {
    id: 64,
    question: 'The purpose of verifying test equipment before fault finding is to:',
    options: [
      'Ensure accurate measurements',
      'Delay starting work',
      'Satisfy regulations only',
      'Avoid using the equipment',
    ],
    correctAnswer: 0,
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
      'CAT I for all installation work',
      'CAT II for the supply origin',
      'CAT III for distribution circuits, CAT IV for origin',
      'No CAT rating is required for low voltage',
    ],
    correctAnswer: 2,
    explanation:
      'Multimeters should be rated CAT III minimum for distribution work, CAT IV for measurements at or near the origin of installation.',
    section: '4.3',
    difficulty: 'intermediate',
  },
  {
    id: 67,
    question: 'What is the primary function of an insulation resistance tester (megger)?',
    options: [
      'Measure the load current drawn by a circuit',
      'Verify the trip time of an RCD',
      'Measure the earth fault loop impedance',
      'Test insulation quality between conductors or to earth',
    ],
    correctAnswer: 3,
    explanation:
      'An insulation resistance tester applies a DC test voltage to measure the resistance of insulation between conductors or between conductor and earth.',
    section: '4.3',
    difficulty: 'basic',
  },
  {
    id: 68,
    question: 'When using a voltage tester, you should first:',
    options: [
      'Prove the tester works on a known live source',
      'Set it to the highest current range available',
      'Connect it across the supply for several minutes',
      'Remove the fused probes to improve sensitivity',
    ],
    correctAnswer: 0,
    explanation:
      "The prove-test-prove sequence requires checking the tester on a known live source before and after testing to ensure it's working correctly.",
    section: '4.3',
    difficulty: 'basic',
  },
  {
    id: 69,
    question: 'An earth fault loop impedance tester measures:',
    options: [
      'The insulation resistance between live conductors',
      'Total impedance of the earth fault path back to source',
      'The load current drawn under normal operation',
      'The capacitance of the cable to earth',
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
      'Leave the circuit energised during the test',
      'Connect the load equipment before testing',
      'Ensure circuit is isolated and discharged',
      'Use the lowest possible test voltage available',
    ],
    correctAnswer: 2,
    explanation:
      'The circuit must be isolated and safe before insulation testing, and care taken as test voltages can be hazardous and may damage electronic components.',
    section: '4.3',
    difficulty: 'basic',
  },
  {
    id: 71,
    question: 'A clamp meter is useful for fault finding because it:',
    options: [
      'Measures insulation resistance at high DC voltage',
      'Confirms the polarity of socket outlets',
      'Verifies the trip time of an RCD',
      'Can measure current without disconnecting conductors',
    ],
    correctAnswer: 3,
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
      'Two-pole testers confirm voltage between points, not just presence',
      'Neon screwdrivers are cheaper to replace',
      'Neon testers measure current as well as voltage',
      'Two-pole testers need no battery to operate',
    ],
    correctAnswer: 0,
    explanation:
      'Two-pole testers confirm actual voltage between two points and are more reliable, while neon testers may give false indications.',
    section: '4.3',
    difficulty: 'intermediate',
  },
  {
    id: 73,
    question: 'An RCD tester is used to verify:',
    options: [
      'The insulation resistance of the protected circuit',
      'Trip time and operating current of the RCD',
      'The prospective short circuit current at the board',
      'The continuity of the ring final circuit',
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
      'At least 30 mA to match RCD sensitivity',
      'A test voltage of 500 V DC like an insulation tester',
      'At least 200 mA to ensure reliable measurement',
      'No more than 1 mA to protect the conductors',
    ],
    correctAnswer: 2,
    explanation:
      'A minimum of 200 mA test current ensures reliable low resistance measurements, overcoming contact resistance and other measurement issues.',
    section: '4.3',
    difficulty: 'intermediate',
  },
  {
    id: 75,
    question: 'What is the purpose of a proving unit for voltage testers?',
    options: [
      'To discharge capacitors before working on equipment',
      'To measure the insulation resistance of a circuit',
      'To lock off the isolation point securely',
      'To provide a known voltage source to verify tester operation',
    ],
    correctAnswer: 3,
    explanation:
      'A proving unit provides a safe known voltage source to verify the voltage tester is working correctly before and after testing.',
    section: '4.3',
    difficulty: 'basic',
  },
  {
    id: 76,
    question: 'When should test instrument calibration be verified?',
    options: [
      'Periodically and after any damage or repair',
      'Only once when the instrument is first purchased',
      'Never, as modern instruments self-calibrate',
      'Only if the manufacturer recalls the instrument',
    ],
    correctAnswer: 0,
    explanation:
      'Test instruments should be calibrated periodically (typically annually) and rechecked after any damage, repair, or if readings seem suspect.',
    section: '4.3',
    difficulty: 'intermediate',
  },
  {
    id: 77,
    question: 'A socket tester with indicators can identify:',
    options: [
      'The exact earth fault loop impedance in ohms',
      'Common wiring faults like reversed polarity, missing earth',
      'The trip time of the protecting RCD',
      'The insulation resistance of the final circuit',
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
      'Measuring earth fault loop impedance on a TT supply',
      'Confirming RCD trip times at rated current',
      'Verifying correct phase sequence in three-phase supplies',
      'Checking the insulation resistance of single-phase circuits',
    ],
    correctAnswer: 2,
    explanation:
      'Phase rotation testers confirm the phase sequence (L1-L2-L3) is correct, which is critical for three-phase motors and equipment.',
    section: '4.3',
    difficulty: 'intermediate',
  },
  {
    id: 79,
    question: 'The impedance of a multimeter on voltage range should be:',
    options: [
      'As low as possible to draw more current',
      'Exactly equal to the circuit resistance',
      'Around 100 Ω for accurate readings',
      'At least 1 MΩ per volt of range selected',
    ],
    correctAnswer: 3,
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
      'Cracked insulation, damaged probes, or intermittent readings',
      'Whenever the battery in the meter is changed',
      'Only after the leads have been used for ten years',
      'When the meter display shows a low reading',
    ],
    correctAnswer: 0,
    explanation:
      'Test leads should be replaced when insulation is cracked or damaged, probes are bent or worn, or readings are intermittent indicating internal damage.',
    section: '4.3',
    difficulty: 'basic',
  },
  {
    id: 81,
    question: 'An oscilloscope is useful in fault finding for:',
    options: [
      'Measuring earth fault loop impedance accurately',
      'Viewing waveforms to diagnose complex signal problems',
      'Confirming the polarity of socket outlets',
      'Verifying RCD trip times at rated current',
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
      'Thermal imaging, gas detection, and sound metering',
      'Voltage proving, capacitor discharge, and cable locating',
      'Insulation, continuity, RCD, and loop impedance testing',
      'Phase rotation, power quality, and harmonic analysis only',
    ],
    correctAnswer: 2,
    explanation:
      'Multifunction installation testers combine insulation resistance, continuity, earth fault loop, RCD testing, and often more in one instrument.',
    section: '4.3',
    difficulty: 'intermediate',
  },
  {
    id: 83,
    question: 'When using a cable locator and tracer, the transmitter should be:',
    options: [
      'Connected to a live cable under full load',
      'Clamped around all conductors simultaneously',
      'Set to the highest insulation test voltage',
      'Connected to an isolated cable with other end disconnected',
    ],
    correctAnswer: 3,
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
      'To increase test voltage',
      'To test continuity',
      'To turn off the instrument',
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
      'Confirming a circuit is safely dead for working',
      'Initial indication of voltage presence only',
      'Measuring the exact voltage at a terminal',
      'Verifying insulation resistance between conductors',
    ],
    correctAnswer: 1,
    explanation:
      'Non-contact detectors provide initial indication of voltage presence but must never be relied on to prove dead; a proper two-pole voltage tester is required for confirmation.',
    section: '4.3',
    difficulty: 'basic',
  },
  {
    id: 86,
    question: 'A power quality analyser can measure:',
    options: [
      'Only the insulation resistance of each circuit',
      'Only the earth electrode resistance on TT systems',
      'Harmonics, power factor, voltage dips, and other quality parameters',
      'Only the polarity of socket outlets',
    ],
    correctAnswer: 2,
    explanation:
      'Power quality analysers measure various parameters including harmonics, power factor, voltage disturbances, and energy consumption patterns.',
    section: '4.3',
    difficulty: 'advanced',
  },
  {
    id: 87,
    question: 'When testing PEN conductor continuity in a PME system, the test should be:',
    options: [
      'Performed at 500 V DC with an insulation tester',
      'Carried out only with a non-contact voltage detector',
      'Measured with a clamp meter around the live conductor',
      'Performed with a low reading ohmmeter to verify integrity',
    ],
    correctAnswer: 3,
    explanation:
      'PEN conductor continuity should be verified with a low resistance ohmmeter to ensure the combined protective and neutral conductor is intact.',
    section: '4.3',
    difficulty: 'intermediate',
  },
  {
    id: 88,
    question: 'Digital multimeters are preferred over analogue for fault finding because:',
    options: [
      'Easy to read, auto-ranging, and can capture transients',
      'They never require a battery to operate',
      'They respond faster to slowly changing readings',
      'They do not need a CAT safety rating',
    ],
    correctAnswer: 0,
    explanation:
      'Digital meters offer easy reading, often auto-range, and many can capture minimum/maximum values or transients useful in fault diagnosis.',
    section: '4.3',
    difficulty: 'intermediate',
  },
  {
    id: 89,
    question: 'What precaution is necessary when measuring high voltages with a multimeter?',
    options: [
      'Select the lowest voltage range before connecting',
      'Ensure CAT rating is adequate and use correct probes',
      'Remove the fuses from the test leads first',
      'Hold both probes in one hand for stability',
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
      'Allowing measurement of insulation resistance to earth',
      'Allowing the meter to measure voltage without leads',
      'Allowing measurement of high currents scaled to meter range',
      'Allowing the meter to test RCD trip times',
    ],
    correctAnswer: 2,
    explanation:
      "Current transformer clamps scale high circuit currents to a lower output suitable for the multimeter's mA or voltage input.",
    section: '4.3',
    difficulty: 'intermediate',
  },
  {
    id: 91,
    question: 'Before starting insulation resistance testing, you should ensure:',
    options: [
      'The circuit is left energised under normal load',
      'A non-contact voltage detector is the only tester used',
      'All RCDs are removed from the consumer unit',
      'Electronic equipment is disconnected and circuit is isolated',
    ],
    correctAnswer: 3,
    explanation:
      'Sensitive electronic equipment must be disconnected as high DC test voltages can damage it, and the circuit must be safely isolated.',
    section: '4.3',
    difficulty: 'basic',
  },
  {
    id: 92,
    question: 'A milliohm meter is specifically designed for:',
    options: [
      'Very low resistance measurements like busbar joints',
      'Very high insulation resistance values',
      'Earth fault loop impedance on long circuits',
      'Leakage current in milliamps to earth',
    ],
    correctAnswer: 0,
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
      'Bonded directly to the electrode under test',
      'Positioned well away from the electrode under test',
      'Driven into the same hole as the main electrode',
      'Connected to the live conductor of the supply',
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
      'A single fixed value in ohms for all ranges',
      'A percentage of the supply voltage only',
      'Percentage of reading plus/minus digits',
      'The CAT rating of the instrument',
    ],
    correctAnswer: 2,
    explanation:
      'Accuracy is usually specified as ±% of reading ± number of digits (or counts), indicating potential measurement error.',
    section: '4.3',
    difficulty: 'intermediate',
  },
  {
    id: 95,
    question: 'When selecting test equipment for fault finding, the key considerations are:',
    options: [
      'The brand name and colour of the instrument',
      'The lowest purchase price available',
      'Whether it matches the customer preferred manufacturer',
      'Measurement range, accuracy, safety rating, and suitability for task',
    ],
    correctAnswer: 3,
    explanation:
      'Test equipment selection should consider measurement requirements, accuracy needed, appropriate safety category, and fitness for the specific task.',
    section: '4.3',
    difficulty: 'intermediate',
  },

  // Section 4.4: Safe Isolation (Questions 96-125)
  {
    id: 96,
    question: 'According to GS38, what is the maximum length of exposed metal at a test probe tip?',
    options: [
      '4 mm of exposed metal at the tip',
      '20 mm of exposed metal at the tip',
      'No limit, provided finger barriers are fitted',
      '10 mm of exposed metal at the tip',
    ],
    correctAnswer: 0,
    explanation:
      'GS38 recommends no more than 4 mm of exposed metal at the probe tip (many manufacturers limit this to 2 mm), together with finger barriers, to protect against accidental contact and arc flash.',
    section: '4.4',
    difficulty: 'basic',
  },
  {
    id: 97,
    question: 'The correct sequence for safe isolation is:',
    options: [
      'Isolate, work, then test for dead afterwards',
      'Identify, isolate, secure, prove dead, prove tester',
      'Prove dead, isolate, then secure the supply',
      'Secure, identify, work, then isolate the supply',
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
      "To recharge the tester battery between readings",
      "To comply with the manufacturer warranty terms",
      "To ensure the tester is working correctly and hasn't failed during testing",
      "To increase the sensitivity of the tester for low voltages",
    ],
    correctAnswer: 2,
    explanation:
      "Proving before confirms the tester works, proving after confirms it still works - if the tester failed during testing, a false 'dead' reading could result.",
    section: '4.4',
    difficulty: 'basic',
  },
  {
    id: 99,
    question: 'When isolating a circuit, all means of supply must be isolated including:',
    options: [
      'The phase conductor only, as neutral is at earth potential',
      'Only the conductors visible at the point of work',
      'The protective conductor as well as the phase',
      'All live conductors - phase, neutral (and other phases in 3-phase)',
    ],
    correctAnswer: 3,
    explanation:
      'All live conductors must be isolated - in three-phase circuits this means all phases and neutral, not just some conductors.',
    section: '4.4',
    difficulty: 'intermediate',
  },
  {
    id: 100,
    question: 'A lock-off device should be:',
    options: [
      'Unique to the person working, with their key held securely',
      'A shared key kept at the consumer unit for convenience',
      'Removable by any competent person on site',
      'Fitted only at the end of the working day',
    ],
    correctAnswer: 0,
    explanation:
      'Each person working should fit their own lock with a unique key that they retain, ensuring only they can remove it when safe.',
    section: '4.4',
    difficulty: 'basic',
  },
  {
    id: 101,
    question: 'When testing for dead, you should test between:',
    options: [
      'Only phase and neutral, never to earth',
      'All live conductors to each other and to earth',
      'Only between the two probes of the proving unit',
      'Only the conductor expected to be live',
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
      'The earth fault loop impedance of the circuit',
      'The cost and duration estimate for the customer',
      'Name of person, nature of work, date and time',
      'The serial numbers of all test instruments used',
    ],
    correctAnswer: 2,
    explanation:
      'Warning notices should clearly identify who is working, what work is being done, and when it started, so others understand the isolation.',
    section: '4.4',
    difficulty: 'basic',
  },
  {
    id: 103,
    question: 'If the point of isolation cannot be locked off, you should:',
    options: [
      'Proceed to work and rely on others not to switch on',
      'Leave the supply on but work as quickly as possible',
      'Tape over the switch and continue without any notices',
      'Remove the fuses or links, retain them and post notices',
    ],
    correctAnswer: 3,
    explanation:
      "Where locking off isn't possible, remove fuses/links and keep them on your person, post prominent notices, and consider additional controls.",
    section: '4.4',
    difficulty: 'intermediate',
  },
  {
    id: 104,
    question: 'Why must capacitors be discharged before working on isolated equipment?',
    options: [
      'They may retain dangerous voltage even after isolation',
      'Capacitors cannot store charge',
      "It's only necessary for very large capacitors",
      'Capacitors automatically discharge',
    ],
    correctAnswer: 0,
    explanation:
      'Capacitors can store significant charge after isolation, retaining potentially lethal voltages that must be safely discharged before work begins.',
    section: '4.4',
    difficulty: 'intermediate',
  },
  {
    id: 105,
    question: 'The requirement to test for dead applies:',
    options: [
      'Only when specifically requested by the client',
      'To all conductors that could become live',
      'Only to circuits above 230 V',
      'Only on the phase conductor at the origin',
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
      'Discharging stored charge in capacitors',
      'Locking off the point of isolation securely',
      'Verifying voltage tester operation with a known source',
      'Measuring the insulation resistance of the circuit',
    ],
    correctAnswer: 2,
    explanation:
      'A proving unit provides a known voltage source to verify the voltage indicator/tester is working correctly during the prove-test-prove sequence.',
    section: '4.4',
    difficulty: 'basic',
  },
  {
    id: 107,
    question: 'If working on a circuit supplied by a generator, isolation must consider:',
    options: [
      'Only the mains supply, as the generator is separate',
      'Only the generator, as the mains is already off',
      'The protective conductor in addition to the phases',
      'Both normal supply AND any standby/generator supply',
    ],
    correctAnswer: 3,
    explanation:
      'Circuits with alternative supplies must be isolated from all possible sources, including standby generators and auto-changeover systems.',
    section: '4.4',
    difficulty: 'intermediate',
  },
  {
    id: 108,
    question: "The term 'adjacent live conductors' in safe isolation refers to:",
    options: [
      'Nearby conductors from other circuits that could cause danger',
      'The conductors of the circuit being worked on only',
      'Conductors that have already been proved dead',
      'The protective conductors bonded to earth',
    ],
    correctAnswer: 0,
    explanation:
      'Adjacent live conductors are any nearby conductors from other circuits that remain live and could pose a risk during the work.',
    section: '4.4',
    difficulty: 'intermediate',
  },
  {
    id: 109,
    question: 'When more than one person needs to work on isolated equipment, each person should:',
    options: [
      'Share a single lock between the whole team',
      'Fit their own personal lock to a multi-lock device',
      'Rely on the first person to lock off for everyone',
      'Leave the supply unlocked but post a notice',
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
      'That the customer invoice has been settled',
      'That the next job has been scheduled',
      'All persons are clear, tools removed, and circuit safe to re-energise',
      'That the test instruments are due for calibration',
    ],
    correctAnswer: 2,
    explanation:
      'Before removing isolation: confirm all persons are clear of danger, tools and equipment removed, and the circuit is safe to re-energise.',
    section: '4.4',
    difficulty: 'basic',
  },
  {
    id: 111,
    question: 'Isolation must be at a point where:',
    options: [
      'Only the phase conductor is interrupted',
      'The supply can still be reset remotely',
      'Only a single pole of the supply is opened',
      'All live conductors are reliably disconnected',
    ],
    correctAnswer: 3,
    explanation:
      'Isolation point must reliably disconnect all live conductors with adequate gap or contact separation to prevent inadvertent reconnection.',
    section: '4.4',
    difficulty: 'intermediate',
  },
  {
    id: 112,
    question: 'Which of the following is NOT a suitable point of isolation?',
    options: [
      'Push button stop with no lockoff',
      'Plug and socket if controlled by worker',
      'Switched fuse with lock off facility',
      'Isolator switch with lockable handle',
    ],
    correctAnswer: 0,
    explanation:
      "Push button stops typically don't provide true isolation as they can be reset by others and may not disconnect all conductors.",
    section: '4.4',
    difficulty: 'intermediate',
  },
  {
    id: 113,
    question: 'GS38 guidance for safe use of test equipment covers:',
    options: [
      'The sequence of dead and live tests on a circuit',
      'Probes, leads, fuses, and barriers for test equipment',
      'The retention period for certification records',
      'The maximum earth fault loop impedance values',
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
      'Only one phase, as the others follow automatically',
      'Only the neutral conductor at the motor',
      'All three phases are isolated at the motor terminals',
      'Only the control circuit, not the power circuit',
    ],
    correctAnswer: 2,
    explanation:
      'All three phases must be verified as isolated at the point of work - motors can continue running on two phases if one is disconnected.',
    section: '4.4',
    difficulty: 'intermediate',
  },
  {
    id: 115,
    question: 'Secure isolation means the isolating device:',
    options: [
      'Can be switched back on quickly if needed',
      'Is left accessible to other trades on site',
      'Only interrupts the phase conductor',
      'Cannot be inadvertently re-energised by others',
    ],
    correctAnswer: 3,
    explanation:
      'Secure isolation requires preventing inadvertent re-energisation through locks, removed fuses, or other means that others cannot defeat.',
    section: '4.4',
    difficulty: 'basic',
  },
  {
    id: 116,
    question: 'When isolating circuits in domestic premises with no lock-off facility:',
    options: [
      'Remove fuses, inform occupants, and post notices',
      'Switch off and trust the occupants not to interfere',
      'Leave the circuit live and work with care',
      'Tape the MCB in the off position and leave',
    ],
    correctAnswer: 0,
    explanation:
      "Where lock-off isn't possible, remove fuses/MCBs and retain them, inform occupants, and post warning notices on the consumer unit.",
    section: '4.4',
    difficulty: 'intermediate',
  },
  {
    id: 117,
    question: 'The primary purpose of testing for dead is to:',
    options: [
      'Measure the load current of the circuit',
      'Confirm isolation is effective and circuit is safe to work on',
      'Verify the insulation resistance of the cables',
      'Check the polarity of the supply',
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
      'Shake the instrument and retest',
      'Stop, investigate, and do not assume circuit is dead',
      'Use a different circuit for proving',
    ],
    correctAnswer: 2,
    explanation:
      "Unexpected results require investigation - never assume the circuit is dead without understanding why readings aren't as expected.",
    section: '4.4',
    difficulty: 'intermediate',
  },
  {
    id: 119,
    question: 'Why should test leads have fused probes according to GS38?',
    options: [
      'To increase the sensitivity of the tester',
      'To allow current measurement without a clamp',
      'To extend the working life of the battery',
      'To limit fault current if the lead contacts a fault',
    ],
    correctAnswer: 3,
    explanation:
      'Fused probes limit fault current through the test leads if they accidentally create a short circuit, protecting the user from arc flash.',
    section: '4.4',
    difficulty: 'intermediate',
  },
  {
    id: 120,
    question: 'The safe isolation procedure must be followed:',
    options: [
      'Whenever working on or near electrical equipment',
      'Only on three-phase installations',
      'Only when the customer requests it',
      'Only on circuits above 400 V',
    ],
    correctAnswer: 0,
    explanation:
      'Safe isolation applies whenever working on or near electrical equipment - even low voltages can be dangerous in certain conditions.',
    section: '4.4',
    difficulty: 'basic',
  },
  {
    id: 121,
    question: 'What additional hazard must be considered when isolating circuits with UPS systems?',
    options: [
      'The mains supply discharges the batteries instantly',
      'Battery backup will maintain supply after mains isolation',
      'The UPS automatically isolates when the mains is off',
      'No additional hazard exists once the mains is off',
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
      'Skip proving the tester to save time on quick jobs',
      'Rely on a non-contact detector for short tasks',
      'Follow full safe isolation even for quick tests',
      'Only isolate if live testing is not required',
    ],
    correctAnswer: 2,
    explanation:
      'Full safe isolation procedures must be followed even for quick tests - shortcuts cause accidents regardless of job duration.',
    section: '4.4',
    difficulty: 'basic',
  },
  {
    id: 123,
    question: 'Induced voltages on isolated circuits can occur when:',
    options: [
      'The isolated cable is short and well insulated',
      'The supply has been proved dead at the origin',
      'All bonding conductors have been disconnected',
      'Cables run close to or parallel with live conductors',
    ],
    correctAnswer: 3,
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
      'Identify all hazards and required isolation points',
      'Record the final test results of the work',
      'List the materials purchased for the job',
      'Confirm the customer has paid a deposit',
    ],
    correctAnswer: 0,
    explanation:
      'Risk assessments and permits should identify all hazards and specify required isolation points and procedures before work begins.',
    section: '4.4',
    difficulty: 'intermediate',
  },
  {
    id: 125,
    question: 'If isolation is performed at a remote location from the work area, you should:',
    options: [
      'Assume isolation is effective without re-testing',
      'Maintain positive communication and verify isolation at point of work',
      'Rely solely on the warning notice at the origin',
      'Begin work as soon as the supply is switched off',
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
      'Only the final invoice amount charged',
      'Only the date the work was completed',
      'Symptoms, tests performed, fault found, and repair made',
      'Only the make and model of the faulty equipment',
    ],
    correctAnswer: 2,
    explanation:
      'Complete documentation includes the reported symptoms, tests conducted, fault diagnosis, repairs made, and verification tests performed.',
    section: '4.5',
    difficulty: 'basic',
  },
  {
    id: 127,
    question: 'Why is documenting test results during fault finding important?',
    options: [
      'It removes the need to retest the circuit after repair',
      'It guarantees the same fault will never recur',
      'It is only needed for three-phase installations',
      'It records the work and evidences proper testing',
    ],
    correctAnswer: 3,
    explanation:
      'Documentation provides evidence of proper procedures, assists future fault diagnosis, and may be needed for warranty or legal purposes.',
    section: '4.5',
    difficulty: 'basic',
  },
  {
    id: 128,
    question: 'A Minor Electrical Installation Works Certificate is appropriate after:',
    options: [
      'Additions or alterations not requiring new circuits',
      'The installation of a complete new consumer unit',
      'A full new installation in a domestic property',
      'A periodic inspection of an existing installation',
    ],
    correctAnswer: 0,
    explanation:
      "Minor works certificates are for additions or alterations that don't need a new circuit - many fault repairs may fall outside this and require different documentation.",
    section: '4.5',
    difficulty: 'intermediate',
  },
  {
    id: 129,
    question: 'The fault finding report should be written:',
    options: [
      'Only after the customer has paid in full',
      'At the time of work or as soon as practical afterwards',
      'Several weeks later once all jobs are batched',
      'Only if the customer specifically requests it',
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
      'Only a simple pass or fail with no figures',
      'Only the make of the test instrument used',
      'Actual measured values and the acceptable limits',
      'Only the time taken to complete the work',
    ],
    correctAnswer: 2,
    explanation:
      'Test records should show actual measured values alongside acceptable limits, allowing assessment of margins and trends over time.',
    section: '4.5',
    difficulty: 'intermediate',
  },
  {
    id: 131,
    question: 'When a fault has been found and corrected, testing should:',
    options: [
      'Be skipped if the repair was straightforward',
      'Only be carried out if the customer asks',
      'Be limited to a visual inspection alone',
      'Verify the circuit now meets regulatory requirements',
    ],
    correctAnswer: 3,
    explanation:
      'After repair, appropriate tests must confirm the circuit is safe and compliant - the specific tests depend on the nature of the work done.',
    section: '4.5',
    difficulty: 'intermediate',
  },
  {
    id: 132,
    question: 'Photographs during fault finding can be useful to:',
    options: [
      'Document conditions found and repairs made',
      'Replace the need for any written report',
      'Measure the insulation resistance of cables',
      'Prove a circuit is dead before working',
    ],
    correctAnswer: 0,
    explanation:
      'Photographs provide clear documentation of conditions found, damage observed, and repairs completed - useful for records and communication.',
    section: '4.5',
    difficulty: 'basic',
  },
  {
    id: 133,
    question: 'If fault finding reveals other defects not related to the original fault:',
    options: [
      'Be ignored as they are outside the original job',
      'Document and report them to the customer',
      'Be repaired without informing anyone',
      'Be recorded but never disclosed to the client',
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
      'Only the customer name and address',
      'Only the make of the voltage tester used',
      'Record of isolation point, lock used, and tests performed',
      'Only the total time spent on site',
    ],
    correctAnswer: 2,
    explanation:
      'Documentation should record isolation point, locking arrangements, tests confirming dead, and time/date of isolation and restoration.',
    section: '4.5',
    difficulty: 'intermediate',
  },
  {
    id: 135,
    question: 'Customer signature on completion documentation confirms:',
    options: [
      'That the installation is fully compliant with BS 7671',
      'That no further work will ever be needed',
      'That the electrician accepts all future liability',
      'They have been advised of work completed and any recommendations',
    ],
    correctAnswer: 3,
    explanation:
      'Customer signature acknowledges they have been informed of work completed, any recommendations, and limitations on the work scope.',
    section: '4.5',
    difficulty: 'basic',
  },
  {
    id: 136,
    question: 'How long should fault finding documentation be retained?',
    options: [
      'For a reasonable period, matching certification retention',
      'Destroyed as soon as the customer invoice is paid',
      'Kept only until the end of the working day',
      'Held for no longer than 24 hours after the visit',
    ],
    correctAnswer: 0,
    explanation:
      'Records should be kept for a reasonable period, often aligned with certification retention (typically 5-10 years) for potential future reference.',
    section: '4.5',
    difficulty: 'intermediate',
  },
  {
    id: 137,
    question: 'A schedule of test results after fault repair should include:',
    options: [
      'Only the name of the electrician who attended',
      'Circuit details, test values, and acceptable limits',
      'Only the total cost of the materials used',
      'Only the customer signature and date',
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
      'State that no fault exists to close the job',
      'Be omitted to avoid worrying the customer',
      'Record tests performed and recommend further investigation',
      'Guess the most likely cause and bill for a repair',
    ],
    correctAnswer: 2,
    explanation:
      'Inconclusive fault finding should be honestly documented, recording what was tested and recommending appropriate follow-up actions.',
    section: '4.5',
    difficulty: 'intermediate',
  },
  {
    id: 139,
    question: 'Risk assessments for fault finding work should be:',
    options: [
      'A single generic form reused for every job',
      'Completed only after the work is finished',
      'Limited to the cost of the work involved',
      'Specific to the work being undertaken',
    ],
    correctAnswer: 3,
    explanation:
      'Risk assessments should be specific to the actual work, considering the installation type, fault symptoms, and working environment.',
    section: '4.5',
    difficulty: 'intermediate',
  },
  {
    id: 140,
    question: 'When fault finding identifies a dangerous condition, the report should:',
    options: [
      'Clearly state the danger and urgency of repair',
      'Mention it only verbally to avoid alarm',
      'Note it in technical terms the customer cannot follow',
      'Leave it out unless the customer asks directly',
    ],
    correctAnswer: 0,
    explanation:
      'Dangerous conditions must be clearly communicated with appropriate urgency so the customer understands the risks and need for action.',
    section: '4.5',
    difficulty: 'basic',
  },
  {
    id: 141,
    question: 'Documentation of replaced components should include:',
    options: [
      'Only the price paid for the new component',
      'Details of faulty component and replacement specifications',
      'Only the date the component was fitted',
      'Only the name of the supplier used',
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
      'A site risk assessment form on its own',
      'A verbal confirmation given to the customer',
      'An EIC or Minor Works Certificate as appropriate',
      'A copy of the manufacturer fitting instructions',
    ],
    correctAnswer: 2,
    explanation:
      'BS 7671 requires appropriate certification (EIC for new circuits, Minor Works for additions/alterations) after work on installations.',
    section: '4.5',
    difficulty: 'intermediate',
  },
  {
    id: 143,
    question: 'Job sheets should be completed:',
    options: [
      'Only for jobs over a certain value',
      'Only when a fault cannot be found',
      'Only for commercial installations',
      'For all work to maintain proper records',
    ],
    correctAnswer: 3,
    explanation:
      'Job sheets should be maintained for all work, providing a record of attendance, work completed, materials used, and any issues encountered.',
    section: '4.5',
    difficulty: 'basic',
  },
  {
    id: 144,
    question: 'If fault finding work is spread over multiple visits, documentation should:',
    options: [
      'Track progress across all visits',
      'Only record the final visit',
      'Not mention previous visits',
      'Restart documentation each visit',
    ],
    correctAnswer: 0,
    explanation:
      'Documentation should track progress through all visits, showing cumulative work, tests, and findings to maintain continuity.',
    section: '4.5',
    difficulty: 'intermediate',
  },
  {
    id: 145,
    question: 'Equipment serial numbers should be recorded when:',
    options: [
      'Only for equipment costing more than a set threshold',
      'Replacing equipment under warranty or for traceability',
      'Only when the customer specifically requests it',
      'Only if the equipment later proves to be faulty',
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
      'Avoided to prevent disputes',
      'Followed up with written documentation',
      'More detailed than written reports',
    ],
    correctAnswer: 2,
    explanation:
      'Verbal explanations should be supported by written documentation providing a clear record of what was found and done.',
    section: '4.5',
    difficulty: 'basic',
  },
  {
    id: 147,
    question: 'The cause of a fault should be documented because:',
    options: [
      'It allows the electrician to charge more',
      'It is required only for warranty claims',
      'It removes the need for any retesting',
      'It helps prevent recurrence and may identify systemic issues',
    ],
    correctAnswer: 3,
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
      'Permit to work details and compliance with site procedures',
      'The home address of every site operative',
      'A breakdown of the contractor profit margin',
      'The personal phone numbers of the building users',
    ],
    correctAnswer: 0,
    explanation:
      'Commercial sites often require permit documentation, contractor sign-in, method statements, and compliance with site-specific procedures.',
    section: '4.5',
    difficulty: 'intermediate',
  },
  {
    id: 149,
    question: 'Test instrument details on documentation typically include:',
    options: [
      'Only the colour of the instrument case',
      'Make, model, serial number, and calibration date',
      'Only the purchase price of the instrument',
      'Only the name of the instrument manufacturer',
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
      'Ignore it as the work predates current standards',
      'Bring the whole installation up to standard without consent',
      'Note the deficiency and recommend upgrade',
      'Refuse to issue any documentation at all',
    ],
    correctAnswer: 2,
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
      'An oversized protective device on the circuit',
      'A break in the line conductor before the load',
      'Reversed polarity at the consumer unit',
      'Moisture causing earth leakage on circuits',
    ],
    correctAnswer: 3,
    explanation:
      'Moisture on insulation or in equipment reduces insulation resistance, causing earth leakage current that triggers the RCD.',
    section: '4.6',
    difficulty: 'basic',
  },
  {
    id: 152,
    question: 'Flickering LED lights can commonly be caused by:',
    options: [
      'Incompatible dimmer switch or loose connection',
      'An oversized protective device on the circuit',
      'A missing earth connection at the fitting',
      'Excessive insulation resistance in the cable',
    ],
    correctAnswer: 0,
    explanation:
      'LED flickering is often caused by incompatible dimmer switches (designed for incandescent) or loose connections causing voltage variation.',
    section: '4.6',
    difficulty: 'basic',
  },
  {
    id: 153,
    question: 'A circuit breaker that trips randomly, especially in warm weather, may have:',
    options: [
      'A complete open circuit in the protective conductor',
      'A fault in the thermal trip mechanism',
      'Reversed polarity at the supply terminals',
      'Excessive insulation resistance in the cable',
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
      'Lights becoming much brighter than normal',
      'Immediate operation of the protective device',
      'Lights not working despite live being present',
      'A reduction in the earth fault loop impedance',
    ],
    correctAnswer: 2,
    explanation:
      "Loss of neutral prevents current flowing through the light, so it won't work even though live voltage is present - careful diagnosis is needed.",
    section: '4.6',
    difficulty: 'basic',
  },
  {
    id: 155,
    question: 'A common fault in ring final circuits is:',
    options: [
      'Excessive insulation resistance between conductors',
      'An oversized protective device at the origin',
      'Reversed phase rotation on the supply',
      'Ring broken or interconnection fault',
    ],
    correctAnswer: 3,
    explanation:
      "Ring continuity faults where the ring is broken or joints fail are common, reducing the circuit's current carrying capacity.",
    section: '4.6',
    difficulty: 'intermediate',
  },
  {
    id: 156,
    question: 'Electric cooker elements commonly fail due to:',
    options: [
      'Thermal cycling causing element wire fatigue',
      'Reversed polarity at the cooker connection unit',
      'Excessive insulation resistance in the supply cable',
      'An oversized protective device on the circuit',
    ],
    correctAnswer: 0,
    explanation:
      'Repeated heating and cooling cycles cause metal fatigue in element wire, eventually leading to open circuit failure.',
    section: '4.6',
    difficulty: 'intermediate',
  },
  {
    id: 157,
    question: 'A common cause of socket outlet overheating is:',
    options: [
      'Excessive insulation resistance in the cable',
      'Loose connections or overloading',
      'An open circuit in the protective conductor',
      'An oversized neutral conductor',
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
      'An oversized protective device on the circuit',
      'Excessive insulation resistance in the cable',
      'Moisture ingress or corroded connections',
      'Reversed phase rotation on the supply',
    ],
    correctAnswer: 2,
    explanation:
      'Outdoor fittings are susceptible to moisture ingress and connection corrosion, causing intermittent operation as water levels vary.',
    section: '4.6',
    difficulty: 'basic',
  },
  {
    id: 159,
    question: 'Humming from a transformer typically indicates:',
    options: [
      'A complete open circuit in the primary winding',
      'Reversed polarity at the secondary terminals',
      'Excessive insulation resistance in the windings',
      'Loose laminations or overloading',
    ],
    correctAnswer: 3,
    explanation:
      'While some hum is normal, excessive noise often indicates loose laminations, overloading, or DC components in the supply.',
    section: '4.6',
    difficulty: 'intermediate',
  },
  {
    id: 160,
    question: 'A motor that trips on overload shortly after starting may have:',
    options: [
      'Mechanical binding or single phasing',
      'Excessive insulation resistance in the windings',
      'An oversized overload relay setting',
      'Reversed polarity on the control circuit',
    ],
    correctAnswer: 0,
    explanation:
      'Mechanical binding increases starting current duration, and single phasing causes the motor to draw excess current from remaining phases.',
    section: '4.6',
    difficulty: 'intermediate',
  },
  {
    id: 161,
    question: 'A common fault in lighting circuits controlled by PIR sensors is:',
    options: [
      'Excessive insulation resistance in the supply cable',
      'False triggering from heat sources or incorrect positioning',
      'An oversized protective device on the circuit',
      'Reversed phase rotation on the supply',
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
      'Excessive insulation resistance in the element',
      'Reversed polarity at the supply terminals',
      'Failed element or thermostat',
      'An oversized protective device on the circuit',
    ],
    correctAnswer: 2,
    explanation:
      'Failed heating elements or thermostats are the most common causes of immersion heaters not heating water.',
    section: '4.6',
    difficulty: 'basic',
  },
  {
    id: 163,
    question: 'Voltage drop on long lighting circuits commonly causes:',
    options: [
      'Lights becoming brighter at the far end',
      'Immediate tripping of the protective device',
      'Reversed polarity at every light fitting',
      'Dim lights, especially at the end of the circuit',
    ],
    correctAnswer: 3,
    explanation:
      'Voltage drop along cable length reduces voltage available at distant points, causing noticeable dimming with some lamp types.',
    section: '4.6',
    difficulty: 'intermediate',
  },
  {
    id: 164,
    question: 'A fault causing only part of a radial socket circuit to fail is likely:',
    options: [
      'An open circuit at a joint or socket along the circuit',
      'An oversized protective device at the origin',
      'Excessive insulation resistance in the cable',
      'Reversed phase rotation on the supply',
    ],
    correctAnswer: 0,
    explanation:
      'A break in a radial circuit disconnects all sockets downstream of the fault point while earlier sockets continue working.',
    section: '4.6',
    difficulty: 'intermediate',
  },
  {
    id: 165,
    question: 'Arcing noise from a consumer unit indicates:',
    options: [
      'Normal switching operation requiring no further action',
      'Loose connections or failing components to act on',
      'Excessive insulation resistance across the busbar',
      'An oversized main switch fitted to the installation',
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
      'An oversized protective conductor',
      'Excessive insulation resistance to earth',
      'Poor connections in protective conductor path',
      'Reversed polarity at the socket outlet',
    ],
    correctAnswer: 2,
    explanation:
      'High resistance joints or broken/undersized protective conductors increase the earth fault loop impedance beyond acceptable limits.',
    section: '4.6',
    difficulty: 'intermediate',
  },
  {
    id: 167,
    question: 'USB charging sockets that fail commonly suffer from:',
    options: [
      'Excessive insulation resistance in the supply cable',
      'An oversized protective device on the circuit',
      'Reversed phase rotation on the supply',
      'Failed internal electronics or connection issues',
    ],
    correctAnswer: 3,
    explanation:
      'The electronic components in USB sockets can fail from heat or component degradation, or connection issues develop internally.',
    section: '4.6',
    difficulty: 'basic',
  },
  {
    id: 168,
    question: 'A bathroom extractor fan that runs continuously may have:',
    options: [
      'Failed timer or humidity sensor',
      'A complete loss of supply to the unit',
      'Excessive insulation resistance in the cable',
      'An oversized protective device on the circuit',
    ],
    correctAnswer: 0,
    explanation:
      'Timer or humidity sensor failures can cause fans to run continuously or not respond to control signals correctly.',
    section: '4.6',
    difficulty: 'basic',
  },
  {
    id: 169,
    question: 'Smoke alarm false alarms in kitchens are commonly due to:',
    options: [
      'An oversized protective device on the circuit',
      'Wrong detector type (ionisation) for the location',
      'Excessive insulation resistance in the supply',
      'Reversed polarity at the detector base',
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
      'The main earthing conductor of the property',
      'The consumer unit main switch',
      'The transformer, push, or bell unit',
      'The ring final circuit continuity',
    ],
    correctAnswer: 2,
    explanation:
      'Doorbell systems have limited components - transformers can fail, push buttons wear out, and bell/chime units can fail mechanically.',
    section: '4.6',
    difficulty: 'basic',
  },
  {
    id: 171,
    question: 'Three-phase motor running in reverse indicates:',
    options: [
      'A failed start capacitor in the motor',
      'A broken neutral conductor at the supply',
      'Excessive insulation resistance in the windings',
      'Two phases have been transposed',
    ],
    correctAnswer: 3,
    explanation:
      'Swapping any two phases reverses three-phase motor direction - commonly occurs after maintenance or reconnection.',
    section: '4.6',
    difficulty: 'intermediate',
  },
  {
    id: 172,
    question: 'A fault causing MCB to trip only when a specific appliance is connected suggests:',
    options: [
      'Fault in the appliance or its flex',
      'An undersized cable feeding the whole circuit',
      'A fault in the consumer unit busbar',
      'Reversed polarity at the supply origin',
    ],
    correctAnswer: 0,
    explanation:
      'If tripping only occurs with one appliance, the fault is likely in that appliance or its connection to the circuit.',
    section: '4.6',
    difficulty: 'basic',
  },
  {
    id: 173,
    question: 'Corroded terminals in junction boxes are commonly caused by:',
    options: [
      'Excessive insulation resistance in the cable',
      'Moisture ingress or condensation',
      'An oversized protective device on the circuit',
      'Reversed phase rotation on the supply',
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
      'An oversized protective device on the circuit',
      'Reversed polarity at the supply terminals',
      'Broken heating element or failed thermostat',
      'Excessive insulation resistance in the cable',
    ],
    correctAnswer: 2,
    explanation:
      'Element breaks (often from installation damage) or thermostat/controller failures are common underfloor heating faults.',
    section: '4.6',
    difficulty: 'intermediate',
  },
  {
    id: 175,
    question: 'Electric shower reduced output is commonly caused by:',
    options: [
      'An oversized protective device on the circuit',
      'Reversed polarity at the supply terminals',
      'Excessive insulation resistance in the element',
      'Scaled heating elements or failed elements',
    ],
    correctAnswer: 3,
    explanation:
      'Scale buildup on elements reduces heat transfer efficiency, and partial element failure reduces overall heating capacity.',
    section: '4.6',
    difficulty: 'basic',
  },
  {
    id: 176,
    question: 'Lighting circuits where one light not working affects others often have:',
    options: [
      'Loop-in wiring with fault at failed light position',
      'An oversized protective device on the circuit',
      'Reversed phase rotation on the supply',
      'Excessive insulation resistance in the cable',
    ],
    correctAnswer: 0,
    explanation:
      'In loop-in wiring, a neutral fault at one ceiling rose can affect downstream lights that share that neutral path.',
    section: '4.6',
    difficulty: 'intermediate',
  },
  {
    id: 177,
    question: 'Garage or outbuilding circuits that work intermittently may have:',
    options: [
      'An oversized protective device on the circuit',
      'Damaged underground cable or poor connections',
      'Excessive insulation resistance in the cable',
      'Reversed phase rotation on the supply',
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
      'Excessive insulation resistance in the supply',
      'Reversed polarity at the supply terminals',
      'Battery backup failure losing settings, or mechanism wear',
      'An oversized protective device on the circuit',
    ],
    correctAnswer: 2,
    explanation:
      'Backup battery failure causes loss of settings after power cuts, and mechanical time switches suffer from wear in their movements.',
    section: '4.6',
    difficulty: 'basic',
  },
  {
    id: 179,
    question: 'Consumer unit main switch that feels hot indicates:',
    options: [
      'Excessive insulation resistance in the tails',
      'An oversized main switch for the installation',
      'Reversed polarity at the supply origin',
      'Loose connections or overloading',
    ],
    correctAnswer: 3,
    explanation:
      'Heat at the main switch indicates high resistance from loose connections or the switch being overloaded - requires immediate attention.',
    section: '4.6',
    difficulty: 'basic',
  },
  {
    id: 180,
    question: 'Earth bonding that reads open circuit may be due to:',
    options: [
      'Disconnected clamp or broken conductor',
      'An oversized bonding conductor',
      'Excessive load current on the circuit',
      'Reversed polarity at the consumer unit',
    ],
    correctAnswer: 0,
    explanation:
      'Open circuit bonding readings indicate disconnected earth clamps, broken conductors, or removed bonding connections.',
    section: '4.6',
    difficulty: 'basic',
  },
  {
    id: 181,
    question: 'A common fault with CAT5/6 network cabling affecting data transmission is:',
    options: [
      'Excessive insulation resistance in the cable',
      'Split pairs or incorrect termination',
      'An oversized protective device on the circuit',
      'Reversed polarity at the patch panel',
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
      'An oversized protective device on the circuit',
      'Excessive insulation resistance in the supply',
      'Failed battery or charging circuit fault',
      'Reversed phase rotation on the supply',
    ],
    correctAnswer: 2,
    explanation:
      'Battery failure or charging circuit faults are the most common reasons emergency lights fail to operate when mains power is lost.',
    section: '4.6',
    difficulty: 'basic',
  },
  {
    id: 183,
    question: 'Electromagnetic interference affecting electronic equipment often comes from:',
    options: [
      'Correctly bonded protective conductors',
      'Resistive heating loads such as immersion heaters',
      'Incandescent lamps on a dedicated circuit',
      'VFDs, fluorescent lighting, or high-frequency switching',
    ],
    correctAnswer: 3,
    explanation:
      'Variable frequency drives, fluorescent lamp ballasts, and switching power supplies generate electromagnetic interference that can affect sensitive electronics.',
    section: '4.6',
    difficulty: 'advanced',
  },
  {
    id: 184,
    question: 'Solar PV systems that underperform commonly suffer from:',
    options: [
      'Shading, dirty panels, or inverter faults',
      'An oversized protective device on the circuit',
      'Reversed polarity at the consumer unit',
      'Excessive insulation resistance in the AC cabling',
    ],
    correctAnswer: 0,
    explanation:
      'Partial shading severely impacts output, dirty panels reduce efficiency, and inverter faults prevent power conversion.',
    section: '4.6',
    difficulty: 'intermediate',
  },
  {
    id: 185,
    question: 'EV charger faults commonly involve:',
    options: [
      'An oversized protective device on the circuit',
      'Communication errors, RCD trips, or contactor failures',
      'Excessive insulation resistance in the supply cable',
      'Reversed phase rotation on a single-phase supply',
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
      'Be the cheapest available regardless of rating',
      'Always be of a lower rating to be safe',
      'Match or exceed the original specification',
      'Be any component that physically fits the space',
    ],
    correctAnswer: 2,
    explanation:
      'Replacement components should match or exceed original specifications to maintain safety and performance levels.',
    section: '4.7',
    difficulty: 'basic',
  },
  {
    id: 187,
    question: 'Before starting repair work, you should:',
    options: [
      'Begin work immediately to save time',
      'Energise the circuit to confirm the fault',
      'Order parts only after dismantling the equipment',
      'Verify isolation, have correct parts and tools ready',
    ],
    correctAnswer: 3,
    explanation:
      'Preparation including confirming isolation, having correct components and tools ensures efficient and safe repair work.',
    section: '4.7',
    difficulty: 'basic',
  },
  {
    id: 188,
    question: 'When repairing a high resistance joint, the proper procedure is to:',
    options: [
      'Clean all contact surfaces, remake the joint properly',
      'Wrap the joint in tape and leave it in place',
      'Apply more current to burn off the oxidation',
      'Tighten the existing joint as hard as possible',
    ],
    correctAnswer: 0,
    explanation:
      'Proper repair requires cleaning oxidation and contamination from contact surfaces and remaking the joint correctly with appropriate torque.',
    section: '4.7',
    difficulty: 'intermediate',
  },
  {
    id: 189,
    question: 'After completing a repair, the circuit should be tested to verify:',
    options: [
      'Only that the equipment switches on',
      'Correct operation and safety parameters within limits',
      'Only that the customer is satisfied',
      'Only the appearance of the finished work',
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
      'Carried out with whatever materials are to hand',
      'Left undocumented to save time',
      'Completed with appropriate materials and properly documented',
      'Done without isolating the circuit first',
    ],
    correctAnswer: 2,
    explanation:
      'Modifications must use appropriate materials compliant with regulations and be properly documented for safety and future reference.',
    section: '4.7',
    difficulty: 'intermediate',
  },
  {
    id: 191,
    question: 'When replacing a circuit breaker, you should verify:',
    options: [
      'Only that it physically fits the busbar',
      'Only that it is from any manufacturer',
      'Only the colour matches the consumer unit',
      'Rating, type, breaking capacity match requirements',
    ],
    correctAnswer: 3,
    explanation:
      'Replacement breakers must have correct rating, trip characteristics, breaking capacity, and compatibility with the consumer unit.',
    section: '4.7',
    difficulty: 'intermediate',
  },
  {
    id: 192,
    question: 'Soldered repairs to modern wiring installations are:',
    options: [
      'Generally not acceptable for permanent connections',
      'The preferred method for all fixed wiring',
      'Required by BS 7671 for every termination',
      'Always stronger than mechanical connections',
    ],
    correctAnswer: 0,
    explanation:
      'Soldered joints in fixed wiring are generally not acceptable as they can fail under stress and vibration - mechanical connections are preferred.',
    section: '4.7',
    difficulty: 'intermediate',
  },
  {
    id: 193,
    question: 'When repairing damaged cable insulation temporarily, you should:',
    options: [
      'Leave the damaged insulation exposed if low voltage',
      'Use appropriate insulation tape with intention to replace properly',
      'Wrap the damage in any available material permanently',
      'Paint over the damaged area to seal it',
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
      'Only measure the insulation resistance',
      'Only confirm the circuit is isolated',
      'Verify operation under normal conditions',
      'Only check the appearance of the work',
    ],
    correctAnswer: 2,
    explanation:
      'Function testing confirms the repaired circuit operates correctly under normal conditions the equipment will experience.',
    section: '4.7',
    difficulty: 'basic',
  },
  {
    id: 195,
    question: 'When a repair involves the protective conductor, you must:',
    options: [
      'Only measure the insulation resistance to earth',
      'Only confirm the conductor colour is correct',
      'Only check the conductor is the right size',
      'Verify continuity and earth fault loop impedance',
    ],
    correctAnswer: 3,
    explanation:
      'Repairs affecting protective conductors require testing to confirm continuity and that earth fault loop impedance remains within acceptable limits.',
    section: '4.7',
    difficulty: 'intermediate',
  },
  {
    id: 196,
    question: 'Torque settings for electrical terminations should be:',
    options: [
      "According to manufacturer's specifications",
      "As tight as the tool will allow",
      "Hand tight only, without any tool",
      "The same value for every terminal type",
    ],
    correctAnswer: 0,
    explanation:
      'Manufacturer-specified torque ensures proper contact without damaging conductors or terminals - both over and under-tightening cause problems.',
    section: '4.7',
    difficulty: 'intermediate',
  },
  {
    id: 197,
    question: 'If spare parts are not immediately available, you should:',
    options: [
      'Fit a similar part of a different rating to finish',
      'Inform customer and arrange proper repair when parts available',
      'Leave the circuit energised and unrepaired',
      'Bridge the faulty component to keep it working',
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
      'The enclosure is left open for ventilation',
      'Any spare gland is used regardless of size',
      'Enclosure integrity and IP rating are maintained',
      'The original seals are discarded after opening',
    ],
    correctAnswer: 2,
    explanation:
      "Repairs must maintain the enclosure's IP rating - this means replacing seals correctly and not compromising ingress protection.",
    section: '4.7',
    difficulty: 'intermediate',
  },
  {
    id: 199,
    question: 'When completing repair work, commissioning should include:',
    options: [
      'Only a visual check of the finished work',
      'Only confirming the customer is satisfied',
      'Only recording the materials used',
      'Verification of correct operation and safety checks',
    ],
    correctAnswer: 3,
    explanation:
      'Commissioning verifies correct operation, performs necessary safety checks, and confirms the system is ready for normal use.',
    section: '4.7',
    difficulty: 'basic',
  },
  {
    id: 200,
    question: 'Handover after fault repair should include:',
    options: [
      'Explaining repair made, any limitations, and operating instructions',
      'Leaving the site without speaking to the customer',
      'Only handing over the invoice for the work',
      'Removing all records of the work carried out',
    ],
    correctAnswer: 0,
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
      'A reversed polarity fault at the fridge spur outlet',
      'Voltage drop on a shared circuit due to high inrush current of the fridge motor',
      'A missing earth connection at the fridge appliance',
      'The fridge thermostat drawing excessive standing current',
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
      'A faulty RCD test button mechanism operating itself at random intervals',
      'Reversed polarity at the consumer unit developing slowly over the week',
      'A scheduled time-controlled load (such as a frost stat or boiler) with cumulative leakage current pushing the circuit over the trip threshold',
      'An oversized main switch allowing excess current onto the protected circuit',
    ],
    correctAnswer: 2,
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
      '500 V test, 100 MΩ minimum',
      '1,000 V test, 1 MΩ minimum',
      '250 V test, 0.25 MΩ minimum',
      '500 V test, 1 MΩ minimum',
    ],
    correctAnswer: 3,
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
      'A clear fail because the measured value exceeds the published value',
      'Marginal — must be rule-of-thumb corrected to 80% (1.10 Ω) for design purposes',
      'Acceptable, well within tolerance',
      'Not relevant when an RCD is present',
    ],
    correctAnswer: 0,
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
      'Have at least 20 mm of exposed tip so readings register reliably, with no CAT rating needed below 230 V',
      'Have a maximum of 4 mm exposed metal tip, finger guards, fused leads where appropriate, and be CAT III/IV rated for the system voltage',
      'Be CAT I rated only, with unfused leads to give the fastest possible response time',
      'Have uninsulated probe shafts so that adjacent conductors can be bridged during testing',
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
    options: [
      '0.21 Ω',
      '0.45 Ω',
      '0.59 Ω',
      '1.17 Ω',
    ],
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
      'An oversized RCBO fitted upstream of the ring final circuit',
      'Excessive insulation resistance between line and neutral on the ring',
      'A reversed polarity fault at one of the socket outlets on the ring',
      'A loose connection or arcing fault at a socket outlet, junction box or accessory creating high-frequency arcing signatures the AFDD is designed to detect',
    ],
    correctAnswer: 3,
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
      'Is acceptable as it is below the DNO declared maximum',
      'Is a fail because it exceeds the DNO declared maximum',
      'Is irrelevant because the supply is TN-C-S',
      'Must be exactly equal to the declared maximum to pass',
    ],
    correctAnswer: 0,
    explanation:
      "Ze (external earth fault loop impedance) must be measured at the origin with main switch open and main bonding disconnected. A4:2026 references PNB (protective neutral bonding) for TN-C-S supplies. The measured Ze of 0.21 Ω is below the 0.35 Ω declared maximum, so it is acceptable; the resulting Zs (Ze + R1+R2) must still satisfy Table 41.3.",
    section: '4.8',
    difficulty: 'intermediate',
  },
  {
    id: 209,
    question:
      "The preferred sequence of dead testing per BS 7671 Reg 643 is:",
    options: [
      'Earth fault loop impedance, prospective fault current, then RCD operation before any continuity tests',
      'Continuity of protective conductors, continuity of ring, IR, polarity, earth electrode resistance (where applicable)',
      'Polarity first, then insulation resistance, then continuity of protective conductors last',
      'RCD trip times, functional testing, then insulation resistance with the supply still connected',
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
      'A short circuit between line and earth at the load',
      'An oversized protective device fitted to the circuit',
      'A broken or floating neutral before the load',
      'Reversed phase rotation on the incoming supply',
    ],
    correctAnswer: 2,
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
      'Fault current flowing through multiple protective devices',
      'Cracked insulation, damaged probes, or intermittent readings',
      'Unique to the person working, with their key held securely',
      'A failed thermostat or stuck linkage preventing the element circuit from closing',
    ],
    correctAnswer: 3,
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
      'Check the toaster for a series arc fault (loose terminal, broken element strand) using IR test on the appliance lead and visual inspection',
      'Measure the earth fault loop impedance Zs at the kitchen socket and compare to Table 41.3',
      'Carry out an RCD trip-time test at 1× and 5× IΔn on the affected circuit',
      'Increase the rating of the RCBO so it no longer trips on the toaster load',
    ],
    correctAnswer: 0,
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
      'L3-L2-L1 reverse sequence so that motors always start in the safest direction',
      'L1-L2-L3 (anti-clockwise rotation when viewed from drive end) for correct motor direction',
      'Identical on all three phases, with no defined rotation order required',
      'L1-L3-L2 to balance the neutral current across the three phases',
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
      'Isolate and prove dead before splicing, as the fibre carries lethal mains voltage',
      'Apply an insulation resistance test across the fibre core before terminating',
      'Never look into a fibre or coupler — laser radiation can damage the retina; use a fibre detector card or scope; dispose of glass shards safely',
      'Bond the fibre sheath to the main earthing terminal to discharge stored charge',
    ],
    correctAnswer: 2,
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
      'Wearing rubber-soled boots and synthetic fleece clothing to build up a protective charge',
      'Applying a 500 V DC insulation test across each board before handling it',
      'Holding boards by their edge connectors with bare hands to dissipate any charge',
      'Using a wrist strap connected to the panel earth, keeping boards in anti-static bags, working on an ESD-rated mat',
    ],
    correctAnswer: 3,
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
      '4.8 A of unbalance current, indicating earth leakage to investigate',
      'The circuit is drawing a normal balanced load of 4.8 A',
      'The protective conductor is carrying the full load current',
      'The clamp meter is faulty and reading the line current',
    ],
    correctAnswer: 0,
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
      'Begin isolating and dismantling the suspect equipment to save the duty holder time',
      'Conduct a risk assessment, agree the scope of work with the duty holder, gather any prior records and confirm safe access and isolation points',
      'Carry out a full insulation resistance test of every circuit on the distribution board',
      'Issue the completion certificate before any diagnostic testing is carried out',
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
      'Replace the tripping RCBO with a higher-rated device so it no longer operates',
      'Simply repair the damaged cable and re-energise without further action',
      'Repair the cable AND mark safe zones (BS 7671 Reg 522.6) AND brief site team to prevent recurrence',
      'Advise the customer to reset the RCBO each time it trips in future',
    ],
    correctAnswer: 2,
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
      'Normal operation, as the hottest phase always carries the most balanced load',
      'Excessive insulation resistance on that phase generating heat under test',
      'A reversed polarity fault on that phase raising its operating temperature',
      'A loose or high-resistance termination on that phase causing localised heating (P = I²R), often combined with thermal degradation of the busbar or termination plating',
    ],
    correctAnswer: 3,
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
      'A lone worker policy, periodic check-ins, GPS-tracked safety device or app, dynamic risk assessment, agreed escalation contact and avoidance of live working unless unavoidable and risk-assessed',
      'Working live wherever possible so the job is finished before anyone else arrives',
      'No special precautions, as lone working on domestic calls is always low risk',
      'Relying solely on a mobile phone with no agreed check-in or escalation procedure',
    ],
    correctAnswer: 0,
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
      'Touch capacitor terminals immediately after isolation, as they discharge instantly',
      'Allow capacitors to discharge through a bleed resistor before contact, treat large capacitor banks as energised even after isolation, and use instruments rated for the frequency present',
      'Use a standard 50 Hz multimeter regardless of the frequency present in the circuit',
      'Short the capacitor terminals together with bare fingers to confirm they are dead',
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
      'The EV charger will overload the busbar and cause the main switch to overheat',
      'The added load will reduce the earth fault loop impedance below acceptable limits',
      'Cumulative DC residual current from the EV charger and other loads could exceed the AC-only RCD threshold, plus DC residual currents may blind a Type AC RCD; a Type A or Type B RCD is required (BS 7671 722.531.3.101 / Section 722)',
      'The EV charger will reverse the polarity of the sockets on the same RCD bank',
    ],
    correctAnswer: 2,
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
      'An Electrical Installation Condition Report (EICR) only, regardless of the work done',
      'A PAT test certificate for the affected portable appliance and nothing further',
      'A verbal confirmation to the customer, with no written certification required',
      'A Minor Electrical Installation Works Certificate (MEIWC) for additions/alterations to a single circuit, or an Electrical Installation Certificate (EIC) for new circuits/installations',
    ],
    correctAnswer: 3,
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
      'Must trip at exactly 30 mA within 1 s, with no upper or lower tolerance permitted',
      'Must not trip below 60 mA so that nuisance tripping on standing leakage is avoided',
      'Any trip current up to 50 mA is acceptable provided the trip time is under 300 ms',
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
      'A single insulation resistance fault affecting every light fitting equally',
      'Loss of one phase (in TPN supply), tripped MCB/RCBO, loose connection at a feeder, line conductor break in a junction box or pendant, and accidental switching off',
      'Reversed polarity at the consumer unit causing half the fittings to dim',
      'An oversized protective device allowing too much current to the lighting circuit',
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
      'The circuit being worked on, before and after isolating the supply',
      'An insulation resistance tester set to 500 V DC on a known dead circuit',
      'A known live source (proving unit such as a PD440 or a confirmed live circuit) — the proving sequence is prove-test-prove',
      'The manufacturer calibration certificate supplied with the instrument',
    ],
    correctAnswer: 2,
    explanation:
      "GS38 'prove-dead' sequence: prove the indicator on a known live source (proving unit), test the circuit to be worked on, then re-prove the indicator on a known live source to confirm it did not fail open during the test. The Martindale VI-13800 is paired with a PD440 proving unit.",
    section: '4.8',
    difficulty: 'intermediate',
  },
  {
    id: 227,
    question:
      "On a TT supply with a Megger MFT measured Ra of 180 Ω and a 30 mA RCD, the calculated touch voltage Ut would be:",
    options: [
      '1.5 V',
      '180 V',
      '50 V',
      '5.4 V',
    ],
    correctAnswer: 3,
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
      'The name and address of the cable manufacturer for each circuit',
      'The retail purchase price of every protective device installed',
      'The ambient air temperature recorded at the time of each test',
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
      'Replace the consumer unit and re-test every circuit in the property first',
      'Verify supply voltage, check start/run capacitor capacitance with multimeter capacitance range, measure motor winding resistances, inspect overload relay and check refrigerant pressure',
      'Measure the earth fault loop impedance at the freezer socket and compare to Table 41.3',
      'Carry out an AFDD self-test and confirm the polarity of the freezer plug only',
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
      "A verbal summary given to the customer with no written record retained",
      "Only the final invoice amount, with technical details deliberately omitted",
      "Written report including symptoms found, tests performed, results (with numerical values), root cause, repair carried out, retest results and recommendations — all dated and signed",
      "A note of the time spent on site, without any record of the tests or findings",
    ],
    correctAnswer: 2,
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
      'The original work has been completed exactly as quoted with no changes needed',
      'The customer has paid the final invoice and the job has been signed off',
      'A test instrument is found to be out of calibration during the work',
      'During fault diagnosis you discover the agreed scope must change (additional cabling required, asbestos found, hidden defects) — written variation captures cost, time and consent before extra work proceeds',
    ],
    correctAnswer: 3,
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
      'Code C2 (potentially dangerous) on EICR, isolate, plan replacement of affected components, investigate water ingress and moisture source as the root cause',
      'Record it as Code C3 (improvement recommended) and leave the board in service',
      'Wipe the oxide off the busbar and re-energise with no further investigation',
      'Ignore it, as green oxide on copper is a normal protective patina with no risk',
    ],
    correctAnswer: 0,
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
      "Fails — the prospective fault current must never exceed half the device rating",
      "Passes — installed device's 6 kA breaking capacity exceeds the prospective fault current",
      "Fails — a 32 A type B device always requires a 10 kA breaking capacity minimum",
      "Cannot be assessed without first measuring the earth fault loop impedance",
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
      'An oversized protective device feeding the IT equipment circuit',
      'Excessive insulation resistance between line and neutral at the socket',
      'A common-mode transient (lightning, switching surge) reaching the equipment via mains, data cable or earth — investigate SPDs, data isolation, surge events',
      'A reversed polarity fault at the IT equipment socket outlet',
    ],
    correctAnswer: 2,
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
      "Use any standard test instrument provided the circuit is isolated before testing",
      "Wear additional insulating gloves but use ordinary non-certified test equipment",
      "No special precautions are needed once the supply has been switched off",
      "Use intrinsically safe (Ex i) test equipment, obtain a permit-to-work, gas-test the area, wear anti-static PPE, and only use methods compliant with the area's zone classification",
    ],
    correctAnswer: 3,
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
      'Reinstated to at least the original condition using suitable mortar/plaster, with cable in safe zones or in earthed metal containment, and any made-good areas redecorated as agreed',
      'Left open and unfilled so the cable can be inspected at any time in future',
      'Filled with any available material such as expanding foam, regardless of fire rating',
      'Left for the customer to make good themselves, as this is never the electrician’s responsibility',
    ],
    correctAnswer: 0,
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
      'Only a simple pass or fail for the whole installation with no measured values',
      'Circuit reference, conductor sizes, R1+R2, R2 (where applicable), IR live-live and live-earth, polarity, Zs, RCD trip times at 1× and 5×, AFDD test, all with limits and pass/fail',
      'Only the make and serial number of the test instrument that was used',
      'Only the date of the visit and the name of the attending electrician',
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
      'A fixed 10% of circuits on every installation regardless of risk or type',
      'No sampling — every circuit must always be fully tested without exception',
      'Risk-based — sample to a level that gives confidence in the conclusions, with sampling agreed with the duty holder, and 100% of accessible parts visually inspected',
      'Whatever the electrician chooses on the day, with no need to record the basis',
    ],
    correctAnswer: 2,
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
      'Significantly more accurate than the high-current test in every case',
      'Identical accuracy to the high-current test, with no practical difference',
      'So inaccurate that the result cannot be used for compliance purposes at all',
      'Slightly lower accuracy than the high-current test (factor of 2-3 in resolution) but adequate for verifying compliance with Table 41.3',
    ],
    correctAnswer: 3,
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
      "Fit a sine-wave or dV/dt filter at the VFD output, install shaft grounding rings, use VFD-rated motor cables (low-capacitance, screened) and bond the cable screen 360° at both ends",
      "Increase the VFD switching frequency to its maximum to reduce shaft currents",
      "Remove the motor earth connection so that bearing currents have no return path",
      "Replace the VFD with a larger rating so it runs cooler under the same load",
    ],
    correctAnswer: 0,
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
      'Leave the weak cells in place, as a series string self-balances over time',
      'Identify the discharged cells as defective (sulphation or open internal connection), test specific gravity, and replace as a matched set; never mix new and old cells in a series string',
      'Replace only the two weak cells with new ones and return the bank to service',
      'Increase the charger output voltage to force the weak cells back up to 2.1 V',
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
      "A highly technical written report using regulation numbers the customer cannot follow",
      "Proceeding with all remedial work first, then informing the customer afterwards",
      "Plain English explanation of what was found, the risk it presents, the proposed remedy, the cost and time impact, and the customer's decision recorded in writing before proceeding",
      "Mentioning the fault only verbally and avoiding any written record to prevent disputes",
    ],
    correctAnswer: 2,
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
      'Only that the insulation resistance reading has improved since the previous test',
      'Only that the circuit re-energises without immediately tripping the protective device',
      'Only the appearance of the finished work and that the customer is satisfied',
      'All protective devices operate (RCD test, RCBO test, AFDD self-test), correct switching/control sequences, interlocks, emergency stops, automatic devices and that the system performs as intended without re-introducing the original fault',
    ],
    correctAnswer: 3,
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
      'Segregate at source — recyclable cable scrap, WEEE for accessories with electronics, mixed waste, and asbestos suspect material handled separately under CAR 2012 / HSG264',
      'Place all waste, including electronic accessories and packaging, in general landfill',
      'Leave the waste on site for the customer to dispose of as they see fit',
      'Burn cable off-cuts on site to recover the copper for resale',
    ],
    correctAnswer: 0,
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
      'Simply replacing the charger immediately without any diagnostic investigation',
      'Check supply voltage stability under load (DNO voltage drop), CT clamp position and orientation if load-shedding is enabled, communications/firmware logs, RCD trip/auto-reset behaviour, and weather/temperature effects on the charger',
      'Assuming the vehicle battery is faulty and advising the customer to replace it',
      'Increasing the rating of the protective device so the charge no longer interrupts',
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
      'TT (Terre-Terre) — recognising the use of an independent earth electrode at the installation',
      'IT (Isolé-Terre) — recognising an unearthed or impedance-earthed supply system',
      'PNB (Protective Neutral Bonding) — recognising the LV practice of bonding to the combined neutral/earth at the consumer cut-out',
      'TN-S — recognising separate neutral and protective conductors throughout the supply',
    ],
    correctAnswer: 2,
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
      'A reversed polarity fault at the downlight, causing it to flicker when dimmed',
      'An oversized protective device allowing excess current to reach the downlight',
      'Excessive insulation resistance in the lighting cable supplying the downlight',
      'Compatibility of the LED driver with the dimmer (leading-edge vs trailing-edge, minimum load), neutral connection at the switch (for smart dimmers), driver minimum-load issue, and harmonic/DC supply asymmetry causing 100 Hz flicker',
    ],
    correctAnswer: 3,
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
      'Replace the device — internal arcing has occurred and the contact set integrity cannot be guaranteed; investigate cause of severe fault that produced the arcing',
      'Clean out the soot, refit the device and return the circuit to service',
      'Leave the device in place, as soot inside an RCBO is normal after repeated switching',
      'Simply reset the device and advise the customer it will settle after a few cycles',
    ],
    correctAnswer: 0,
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
      'A clear pass, as any reading above 0.1 MΩ is acceptable for an LV circuit',
      'Fail (minimum 1 MΩ for LV) — investigate insulation degradation, moisture ingress, damaged cables or connected equipment that should have been disconnected',
      'A pass only if the circuit is protected by a 30 mA RCD providing additional protection',
      'Not relevant, as insulation resistance is only assessed on SELV and PELV circuits',
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
      "Leaving covers off for ventilation and the work area as found to save time",
      "Only restoring power, with labels, briefing and clean-up left for a later visit",
      "Power restored, all covers refitted, labels updated, customer briefed, work area swept and waste removed, certificate left with customer or emailed, and instruments returned to vehicle",
      "Removing all records of the work and leaving site without speaking to the customer",
    ],
    correctAnswer: 2,
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
