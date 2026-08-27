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

import {
  drawWeighted,
  LEVEL3_WEIGHTS,
  type DifficultyWeights,
} from '@/utils/apprenticeQuestionDraw';

export const module4Questions: Question[] = [
  // Section 4.1: Fault Types (Questions 1-30)
  {
    id: 1,
    question:
      'What type of fault occurs when current flows directly between the line and neutral conductors through a path of negligible impedance?',
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
    question: 'Which measurement result identifies an open circuit fault?',
    options: [
      'A tripped MCB at the board',
      'Warm cables along the run',
      'No voltage at the load',
      'Reduced brightness at the lamp',
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
    question: 'Which characteristic distinguishes a transient fault from a permanent one?',
    options: [
      'Causing permanent damage that needs repair',
      'Self-clearing after a short time',
      'Tripping the main switch every time they occur',
      'Occurring only in three-phase installations',
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
      'Increased current flow through the load',
      'Earth leakage current to the CPC',
      'Reduced current flow or open circuit',
      'Voltage rise at the load terminals',
    ],
    correctAnswer: 2,
    explanation:
      'Series faults (such as broken conductors or poor connections) increase resistance in the circuit path, reducing current flow or causing complete interruption.',
    section: '4.1',
    difficulty: 'intermediate',
  },
  {
    id: 11,
    question: 'Reversed polarity has occurred in a circuit when:',
    options: [
      'The supply voltage exceeds the design limits',
      'Earth and neutral conductors are transposed',
      'Two phase conductors are joined together',
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
      'Always trip the protective device instantly on the first half-cycle',
      'Can sustain at low currents below protective device thresholds',
      'Only occur on circuits that have already been isolated and proved dead',
      'Reduce the temperature of the conductors while the fault develops',
    ],
    correctAnswer: 1,
    explanation:
      "Arcing faults can sustain at relatively low currents that don't trip conventional overcurrent devices, while generating enough heat to ignite surrounding materials.",
    section: '4.1',
    difficulty: 'basic',
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
      'There is no practical difference between them',
      'Bolted faults are less dangerous than arcing',
      'Arcing faults always carry a higher fault current',
    ],
    correctAnswer: 0,
    explanation:
      'A bolted fault has solid metallic contact creating very low resistance and maximum fault current, while arcing faults have higher resistance due to the arc gap.',
    section: '4.1',
    difficulty: 'basic',
  },
  {
    id: 17,
    question: 'Excessive voltage drop on a long cable run is best described as:',
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
      'Load currents being evenly balanced across all three phases',
      'Correct discrimination between upstream and downstream devices',
      'Fault current flowing through multiple protective devices',
    ],
    correctAnswer: 3,
    explanation:
      'Sympathetic tripping occurs when a fault current flows through upstream protective devices, causing them to operate along with the device meant to clear the fault.',
    section: '4.1',
    difficulty: 'basic',
  },
  {
    id: 20,
    question: 'Which fault type would cause a motor to run slowly and overheat?',
    options: [
      'Single phasing (loss of one phase)',
      'Short circuit between stator windings (turn-to-turn)',
      'Complete open circuit (loss of all three phases)',
      'Earth fault (winding to frame) on one phase',
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
    difficulty: 'basic',
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
      'An earth leakage fault',
      'An open circuit fault',
      'Not a reportable fault condition',
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
      'Normal operation of the cable',
      'Perfect insulation condition throughout',
      'Insulation degradation beginning',
      'Overcurrent protection is now needed',
    ],
    correctAnswer: 2,
    explanation:
      'Partial discharge is localised breakdown of insulation that indicates degradation has started, potentially leading to complete insulation failure if not addressed.',
    section: '4.1',
    difficulty: 'basic',
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
    question: 'What effect do harmonic currents drawn by electronic loads have on a three-phase four-wire circuit?',
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
    difficulty: 'basic',
  },
  {
    id: 29,
    question: 'A fault causing flickering lights at random intervals is likely:',
    options: [
      'A correctly torqued (sound) cable termination',
      'Loose connection (high resistance joint)',
      'An oversized neutral (low impedance) at the board',
      'A solid bolted short circuit (zero impedance) line to earth',
    ],
    correctAnswer: 1,
    explanation:
      'Random flickering typically indicates a loose or high resistance connection that intermittently affects the circuit, creating variable voltage drop.',
    section: '4.1',
    difficulty: 'basic',
  },
  {
    id: 30,
    question: 'Which fault would cause a circuit-breaker to trip only when the circuit is heavily loaded, having held in at light load?',
    options: [
      'A dead short circuit between line and neutral',
      'An open circuit in the protective conductor',
      'Borderline overcurrent due to undersized cable',
      'Reversed polarity between line and neutral at a socket',
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
      'Testing repeatedly at the supply origin and nowhere else',
      'Working back from the load to the supply one point at a time',
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
    question: 'Which stage does not form part of a structured fault-finding procedure?',
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
      'It is the only method permitted by BS 7671 for diagnosis',
      'It avoids any need to isolate the circuit at all',
      'It always locates the fault with a single test reading',
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
      'The exact insulation resistance value, in megohms, of each cable',
      'The earth fault loop impedance, in ohms, of the final circuit',
      'The prospective fault current, in kA, at the origin of the installation',
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
      'Testing the voltage at each point in turn',
      'Replacing suspect components with known good ones',
      'Measuring insulation resistance of each circuit',
      'Checking the circuit documentation and nothing else',
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
      'The motor bearings, couplings and shaft (alignment)',
      'The stator windings (inside the motor), before anything else is checked',
      'The supply transformer, out at the DNO (distributor) substation',
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
      'Replacing components in the order they are listed on the schedule',
      'Ignoring the customer description of events and starting from scratch',
      'Assuming that the most expensive component in the circuit has failed',
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
      'Replacing the consumer unit straight away instead',
      'Continuous monitoring and recreating fault conditions',
      'A single voltage test taken at the supply origin',
      'Assuming it has self-cleared and taking no further action',
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
      'Only the original purchase invoice for the equipment, filed by the customer',
      'The manufacturer warranty card supplied with the equipment, on its own',
      'Circuit diagrams, equipment manuals, and previous test records',
      'The customer payment receipt and the material invoice, and nothing more',
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
      'Replace all the suspect components in one operation, then retest once',
      'Repair the most visible fault, then stop looking any further',
      'Energise the circuit again, leaving the remaining faults for later',
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
      'To deliberately damage components so they need replacing',
      "To recreate fault conditions that don't appear at normal load",
      'To reduce the test current below its normal working level',
      'To shorten the time spent on diagnosis at the customer premises',
    ],
    correctAnswer: 1,
    explanation:
      "Stress testing applies higher loads or specific conditions to recreate intermittent faults that don't appear under normal operating conditions.",
    section: '4.2',
    difficulty: 'basic',
  },
  {
    id: 46,
    question: 'A circuit-breaker trips again the instant it is reset, with no load connected. What does this indicate?',
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
      'The exact resistance of each connection in milliohms',
      'Insulation resistance values between live conductors and earth',
      'The polarity of socket outlets on each final circuit tested',
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
      'Recording the fault on the certification paperwork straight away',
      'Fitting protective brackets around all the exposed cable runs',
      'Replacing the bracket that supports the cable run at that point',
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
      'That the customer has paid the final invoice in full',
      'That the original fault symptom is still present at the load',
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
      'To increase the energy consumption measured',
      'Some faults only appear under load conditions',
      'The regulations require it to be carried out this way',
      'To make the meter readings easier to take and record',
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
      'Has no relevance to any current fault symptoms',
      'Only matters when an insurance claim is made',
      'May reveal patterns or recurring issues',
      'Should be destroyed once each fault is repaired',
    ],
    correctAnswer: 2,
    explanation:
      'Historical data can reveal patterns, recurring issues, or deteriorating conditions that help diagnose current faults and prevent future ones.',
    section: '4.2',
    difficulty: 'intermediate',
  },
  {
    id: 55,
    question: 'Which fault-finding method works by testing at the midpoint of a circuit and then discarding the healthy half?',
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
      'That the visible damaged part has been replaced, and nothing further',
      'That the circuit re-energises, with no immediate tripping',
      'That the customer is happy, and the repair looks tidy',
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
      'A fault in the main incoming supply to the property',
      'A fault specific to that individual device or its circuit',
      'A fault affecting the whole distribution board and all circuits',
      'A fault in the DNO distribution network outside the property',
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
      'Buried cable runs concealed within solid walls',
      'Fixed wiring runs that cannot be disconnected',
      'Discrete components or modular equipment',
      'The DNO supply network outside the property',
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
      'They affect the appearance of the finished installation, and nothing else',
      'They are never relevant to electrical faults, indoors or out',
      'They matter only outdoors, where the installation is exposed to weather',
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
    question: 'An unintended current path exists between two circuits that should be electrically separate. This condition is known as:',
    options: [
      "A hidden circuit path that isn't on the drawings",
      'A short circuit between the line and neutral',
      'A break in the protective conductor at the accessory',
      'An overloaded final circuit marked on the drawings',
    ],
    correctAnswer: 0,
    explanation:
      "Sneak circuits are unintended current paths through combinations of components that aren't shown on diagrams and can cause unexpected operation.",
    section: '4.2',
    difficulty: 'basic',
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
    question: 'What is the purpose of setting out the possible causes of a fault as a branching diagram?',
    options: [
      'Formally recording the physical wiring route of a circuit',
      'Repeatedly measuring the insulation resistance of conductors',
      'Simply listing the test instruments used on the job',
      'Systematically mapping possible causes for a fault',
    ],
    correctAnswer: 3,
    explanation:
      'Fault tree analysis is a systematic method of mapping all possible causes that could lead to a particular fault, helping ensure thorough diagnosis.',
    section: '4.2',
    difficulty: 'basic',
  },
  {
    id: 64,
    question: 'The purpose of verifying test equipment before fault finding is to:',
    options: [
      'Ensure accurate measurements',
      'Delay the start of work on site',
      'Satisfy the regulations and no more',
      'Avoid using the equipment on site',
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
      'Recorded and left for the next visit',
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
    question: 'Which measurement category rating should a multimeter carry for work at the origin of a single-phase domestic installation?',
    options: [
      'CAT I for final circuits, CAT II for the origin',
      'CAT II for the origin, CAT I for distribution circuits',
      'CAT III for distribution circuits, CAT IV for origin',
      'No CAT rating is needed below 1000 V, at the origin or elsewhere',
    ],
    correctAnswer: 2,
    explanation:
      'Multimeters should be rated CAT III minimum for distribution work, CAT IV for measurements at or near the origin of installation.',
    section: '4.3',
    difficulty: 'intermediate',
  },
  {
    id: 67,
    question: 'What is the primary function of an insulation resistance tester?',
    options: [
      'Measure the load current drawn by a final circuit',
      'Verify the trip time of an RCD at rated residual current',
      'Measure the earth fault loop impedance of the final circuit',
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
      'The insulation resistance between the live conductors and earth',
      'Total impedance of the earth fault path back to source',
      'The load current drawn by the circuit under normal operation',
      'The capacitance between the cable conductors and the earth',
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
      'Confirms the polarity of every socket outlet',
      'Verifies the trip time of an RCD at its rated current',
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
      'Neon screwdrivers cost less to replace, so they are the safer choice',
      'Neon testers measure current as well as voltage, giving a fuller picture',
      'Two-pole testers need no battery, so they cannot fail undetected',
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
    question: 'A low-resistance ohmmeter used for continuity testing should be able to deliver a short-circuit current of at least:',
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
      'To discharge stored charge in capacitors before working on equipment',
      'To measure the insulation resistance of an isolated circuit under test',
      'To lock off the point of isolation securely before work starts',
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
      'Whenever the battery is replaced in the instrument',
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
      'The exact earth fault loop impedance, in ohms, at that socket',
      'Common wiring faults like reversed polarity, missing earth',
      'The trip time of the RCD, in milliseconds, protecting that circuit',
      'The insulation resistance, in megohms, between the circuit conductors',
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
    question: 'Why should a multimeter have a high input impedance when it is used on its voltage ranges?',
    options: [
      'As low as possible to draw current',
      'Exactly equal to the resistance of the circuit',
      'Around 100 Ω for the most accurate readings',
      'At least 1 MΩ per volt of range selected',
    ],
    correctAnswer: 3,
    explanation:
      'High input impedance (typically 10 MΩ or more) prevents the meter from loading the circuit and affecting the voltage being measured.',
    section: '4.3',
    difficulty: 'basic',
  },
  {
    id: 80,
    question:
      'When using test leads with a multimeter, what condition indicates replacement is needed?',
    options: [
      'Cracked insulation, damaged probes, or intermittent readings',
      'Whenever the meter battery is changed, or the internal fuse blows',
      'Only after ten years in service, whatever their condition',
      'When the display reads lower than last time, whatever the leads look like',
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
      'Confirming the polarity of the socket outlets',
      'Verifying the RCD trip times at rated residual current',
    ],
    correctAnswer: 1,
    explanation:
      'Oscilloscopes display voltage waveforms, enabling diagnosis of complex issues like harmonics, interference, switching problems, and timing issues.',
    section: '4.3',
    difficulty: 'basic',
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
      'Connected to a live cable while it is under full load',
      'Clamped around all the circuit conductors at the same moment',
      'Set to the highest insulation test voltage the instrument offers',
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
      'Confirmation that a circuit is safely dead to work on',
      'Initial indication of voltage presence only',
      'Exact measurement of the voltage at a terminal',
      'Verification of insulation resistance between conductors',
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
      'Insulation resistance only, circuit by circuit, across the installation',
      'Loop impedance, prospective fault current, and nothing else',
      'Harmonics, power factor, voltage dips, and other quality parameters',
      'Polarity and continuity, socket by socket, on the final circuits',
    ],
    correctAnswer: 2,
    explanation:
      'Power quality analysers measure various parameters including harmonics, power factor, voltage disturbances, and energy consumption patterns.',
    section: '4.3',
    difficulty: 'basic',
  },
  {
    id: 87,
    question: 'When testing PEN conductor continuity in a PME system, the test should be:',
    options: [
      'Performed at 500 V DC using an insulation resistance tester',
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
    question: 'Which characteristic makes a digital multimeter more suitable than an analogue instrument for reading a steady voltage?',
    options: [
      'Easy to read, auto-ranging, and can capture transients',
      'They need no battery, so they cannot fail mid-test',
      'They follow slow changes faster than a needle, so trends are clearer',
      'They need no CAT safety rating, being digital rather than analogue',
    ],
    correctAnswer: 0,
    explanation:
      'Digital meters offer easy reading, often auto-range, and many can capture minimum/maximum values or transients useful in fault diagnosis.',
    section: '4.3',
    difficulty: 'intermediate',
  },
  {
    id: 89,
    question: 'What precaution is necessary when measuring mains voltage with a multimeter?',
    options: [
      'Select the lowest voltage range before connecting the probes',
      'Ensure CAT rating is adequate and use correct probes',
      'Remove the fuses from the test leads before starting work',
      'Hold both probes in one hand to steady the connection',
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
      'Allowing the meter to test RCD trip times at its rated current',
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
    difficulty: 'basic',
  },
  {
    id: 94,
    question: 'How is the accuracy of an electrical test instrument normally stated by its manufacturer?',
    options: [
      'A single fixed value in ohms/volts for all ranges',
      'A percentage of the supply/load voltage',
      'Percentage of reading plus/minus digits',
      'The CAT III/IV rating of the instrument',
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
      'The brand name, and the colour of the instrument case',
      'The lowest purchase price, whatever the specification',
      'Whether it matches the customer preferred manufacturer, on brand alone',
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
    question: 'What is the maximum length of exposed metal permitted at the tip of a test probe under HSE guidance on test equipment?',
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
    question: 'Why must a voltage indicator be proved both before and after the test for dead?',
    options: [
      'To recharge the tester battery between each set of test readings',
      'To comply with the manufacturer\'s warranty terms for the tester',
      "To ensure the tester is working correctly and hasn't failed during testing",
      'To increase the sensitivity of the tester for low voltage readings',
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
      'The phase conductor only, since the neutral (at earth potential) is safe',
      'Only the visible conductors (at the point of work), and no others',
      'The protective conductor (cpc), as well as the phase conductor',
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
      'A shared key, kept at the consumer unit for convenience',
      'Removable by any competent person, so work is never held up',
      'Fitted at the end of the working day, once the tools are packed',
    ],
    correctAnswer: 0,
    explanation:
      'Each person working should fit their own lock with a unique key that they retain, ensuring only they can remove it when safe.',
    section: '4.4',
    difficulty: 'basic',
  },
  {
    id: 101,
    question: 'Which combinations of conductors must be tested during the test for dead on a single-phase circuit?',
    options: [
      'Only phase and neutral, never to earth',
      'All live conductors to each other and to earth',
      'The two probes of the proving unit alone',
      'The conductor expected to be live and no others',
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
      'The earth fault loop impedance, in ohms, of the circuit',
      'The cost, and the duration estimate, for the customer',
      'Name of person, nature of work, date and time',
      'The serial numbers, and calibration dates, of the instruments',
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
      'Proceed with the work, relying on others not to switch on',
      'Leave the supply on, and work as quickly as possible',
      'Tape over the switch, then continue without any notices',
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
    question: 'In which circumstances must the test for dead be carried out?',
    options: [
      'Only when specifically requested by the client',
      'To all conductors that could become live',
      'To circuits above 230 V, but not below',
      'To the line conductor at the origin alone',
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
      'Only the DNO/mains supply, as the generator is off',
      'The generator/UPS alone, since the mains is off',
      'The protective conductor as well as line/neutral',
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
    question: 'During safe isolation, which conductors near the working position must also be considered?',
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
      'That the customer invoice, for labour and materials, is settled in full',
      'That the next job, further down the list, has been booked',
      'All persons are clear, tools removed, and circuit safe to re-energise',
      'That the test instruments used are due for annual calibration, and logged',
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
      'A single pole of the supply is opened by the switch',
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
    question: 'Which device must not be used as the point of isolation for a circuit?',
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
    question: 'Which aspects of test equipment does HSE guidance on electrical test equipment address?',
    options: [
      'The sequence of dead tests, then live tests, on a circuit',
      'Probes, leads, fuses, and barriers for test equipment',
      'The retention period, in years, for certification records',
      'The maximum earth fault loop impedance, in ohms, for each device',
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
      'The neutral conductor at the motor terminals',
      'All three phases are isolated at the motor terminals',
      'The control circuit, but not the power circuit',
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
      'Switch off, and trust the occupants not to interfere',
      'Leave the circuit live, and work with care throughout',
      'Tape the MCB off, then leave it unattended',
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
      'Measure the load current drawn by the final circuit',
      'Confirm isolation is effective and circuit is safe to work on',
      'Verify the insulation resistance of the circuit cables',
      'Check the polarity of the incoming supply conductors',
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
      'Assume the tester is faulty, and carry on working',
      'Shake the instrument, then retest the same circuit',
      'Stop, investigate, and do not assume circuit is dead',
      'Prove the tester on a different circuit, and accept the result',
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
    question: 'When must the full safe isolation procedure be carried out?',
    options: [
      'Whenever working on or near electrical equipment',
      'Only on three-phase installations',
      'When the customer asks for the work to be done',
      'On circuits above 400 V but not on 230 V circuits',
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
    question: 'What must be done before conductors are touched during fault finding on an isolated circuit?',
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
    difficulty: 'basic',
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
      'Rely on the isolator position indicator alone, without proving dead',
      'Maintain positive communication and verify isolation at point of work',
      'Post a caution notice at the origin and treat that as adequate control',
      'Switch off, then start work and prove dead only if something seems wrong',
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
      'The final invoice amount charged, and nothing else',
      'The date of the visit, and the hours worked on site',
      'Symptoms, tests performed, fault found, and repair made',
      'The make, and the model, of the faulty equipment',
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
      'At the end of the month with the invoice run',
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
      'The make and calibration date of the instrument',
      'Actual measured values and the acceptable limits',
      'The time taken and the labour rate charged',
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
      'The customer name, and address, alone',
      'The make, and serial number, of the voltage tester',
      'Record of isolation point, lock used, and tests performed',
      'The total time spent on site, and the rate charged',
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
    question: 'What determines how long records of fault diagnosis work should be retained?',
    options: [
      'For a reasonable period, matching certification retention',
      'Until the customer invoice is paid, then destroyed',
      'Until the end of the working day, then discarded',
      'For 24 hours after the visit, and no longer',
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
      'The name of the electrician who attended, and no more',
      'Circuit details, test values, and acceptable limits',
      'The total cost of the materials, and of the labour, used',
      'The customer signature, and the date of the visit',
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
      'Name the most likely cause and quote for that repair',
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
      'The date the component was fitted and by whom',
      'The name of the supplier and the order number',
    ],
    correctAnswer: 1,
    explanation:
      'Recording details of failed components and their replacements provides useful information for future maintenance and warranty purposes.',
    section: '4.5',
    difficulty: 'basic',
  },
  {
    id: 142,
    question: 'Which certificate is appropriate after altering an existing circuit where no new circuit has been provided and no consumer unit replaced?',
    options: [
      'A site risk assessment form and nothing else',
      'A verbal confirmation given to the customer',
      'An EIC or Minor Works Certificate as appropriate',
      'A copy of the manufacturer fitting instructions alone',
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
      'When a fault cannot be traced on the first visit',
      'For commercial installations but not domestic ones',
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
      'Make no mention of the earlier visits',
      'Restart the documentation each visit',
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
      'Fitting equipment that costs more than a set threshold',
      'Replacing equipment under warranty or for traceability',
      'Attending a job where the customer asks for the details',
      'Discovering that the equipment later proves to be faulty',
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
      'Sufficient on their own without any record',
      'Avoided altogether to prevent later disputes',
      'Followed up with written documentation',
      'Treated as more reliable than written reports',
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
      'It allows the electrician to charge the customer at a higher rate',
      'It is required only where a warranty claim is being made',
      'It removes the need to retest the circuit after the repair',
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
      'The home addresses of every operative attending the site',
      'A full breakdown of the profit margin the contractor is making',
      'The personal phone numbers of everyone occupying the building',
    ],
    correctAnswer: 0,
    explanation:
      'Commercial sites often require permit documentation, contractor sign-in, method statements, and compliance with site-specific procedures.',
    section: '4.5',
    difficulty: 'intermediate',
  },
  {
    id: 149,
    question: 'Which details of the test instruments used must be recorded on the schedule of test results?',
    options: [
      'The purchase date, and warranty period, of the unit',
      'Make, model, serial number, and calibration date',
      'The purchase price of the instrument, and nothing else',
      'The manufacturer name, and the battery type fitted',
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
      'Omit it, as the work predates current standards',
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
      'A shared neutral between two lighting circuits',
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
    question: 'LED lamps on a dimmed lighting circuit flicker at low brightness only. What is the most likely cause?',
    options: [
      'Incompatible dimmer switch or loose connection',
      'A neutral borrowed from the adjacent circuit',
      'A missing earth connection at the fitting',
      'A high resistance joint in the protective conductor',
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
      'A loose neutral bar screw at the consumer unit',
      'A protective device of too low a breaking capacity',
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
      'Lights becoming much brighter than they normally are',
      'Immediate operation of the circuit protective device',
      'Lights not working despite live being present',
      'A measurable reduction in the earth fault loop impedance',
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
      'Missing continuity in the CPC at one socket outlet',
      'A lamp holder with the switched neutral reversed',
      'Insulation resistance measured above 300 megohms',
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
      'Voltage drop on the cooker circuit under full load',
      'A loose connection at the cooker control switch',
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
      'An undersized circuit protective conductor',
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
      'A time switch that has lost its programmed settings',
      'Cable clipped direct instead of run in conduit',
      'Moisture ingress or corroded connections',
      'Reversed polarity at the outdoor fitting',
    ],
    correctAnswer: 2,
    explanation:
      'Outdoor fittings are susceptible to moisture ingress and connection corrosion, causing intermittent operation as water levels vary.',
    section: '4.6',
    difficulty: 'basic',
  },
  {
    id: 159,
    question: 'A transformer that has been quiet in service develops an audible hum. What should be checked first?',
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
      'A lamp of the wrong type fitted at the luminaire position',
      'False triggering from heat sources or incorrect positioning',
      'A missing earth connection at the metal housing of the PIR sensor',
      'A conductor of the wrong size feeding the sensor supply',
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
      'A loose terminal at the flex outlet plate',
      'Failed element or thermostat',
      'A loose earth connection at the cylinder',
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
      'Brighter lights, especially at the far end of the run',
      'Immediate tripping, as soon as the circuit is switched on',
      'Reversed polarity, at every fitting on the run',
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
    question: 'Only the outlets beyond the third socket on a radial circuit are dead. Where is the fault most likely to be?',
    options: [
      'An open circuit at a joint or socket along the circuit',
      'An oversized protective device fitted at the circuit origin',
      'A high resistance joint at the consumer unit terminal block',
      'The wrong size of conductor used throughout the whole circuit run',
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
      'An oversized circuit protective conductor',
      'Excessive insulation resistance measured to earth',
      'Poor connections in protective conductor path',
      'Reversed polarity at the socket outlet end',
    ],
    correctAnswer: 2,
    explanation:
      'High resistance joints or broken/undersized protective conductors increase the earth fault loop impedance beyond acceptable limits.',
    section: '4.6',
    difficulty: 'intermediate',
  },
  {
    id: 167,
    question: 'A socket-outlet with integral USB charging outputs has lost its USB function while the 13 A outlets still work. What does this indicate?',
    options: [
      'A shared neutral with the adjacent socket circuit',
      'An undersized ring final circuit conductor',
      'A loose gland at the back box cable entry',
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
      'A missing earth connection at the fan terminals',
      'The wrong size of flex used to the fan unit',
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
      'An interlink wire shared with the lighting (final) circuit',
      'Wrong detector type (ionisation) for the location',
      'A loose interconnection (interlink) between the heads',
      'Reversed polarity (line and neutral) at the base',
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
      'The main earthing conductor, at the property',
      'The main switch, in the consumer unit',
      'The transformer, push, or bell unit',
      'The ring final circuit, and its continuity',
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
    question: 'A circuit-breaker trips only when one particular appliance is plugged in. What does this suggest?',
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
      'Overtightening of the terminal screws on fitting',
      'Moisture ingress or condensation',
      'Vibration slackening the terminal screws',
      'Insulation resistance measured above 200 megohms',
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
      'A loose connection at the floor junction box',
      'The thermostat mounted on an outside wall',
      'Broken heating element or failed thermostat',
      'A high resistance joint at the manifold connection',
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
      'An undersized supply cable to the shower unit',
      'A loose connection at the shower pull-cord switch',
      'A protective device of too low a rating fitted',
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
      'A two-way switch wired with a single strapper',
      'Reversed polarity at the ceiling rose loop terminals',
      'A borrowed neutral taken from the socket outlet circuit',
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
      'A garage consumer unit fed without a main switch',
      'Damaged underground cable or poor connections',
      'An undersized submain to the outbuilding',
      'A missing earth electrode at the outbuilding',
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
      'A supply voltage slightly above 230 V nominal, drifting the clock',
      'A supply fuse of the wrong rating, fitted at the supply origin',
      'Battery backup failure losing settings, or mechanism wear',
      'The wrong size of conductor, feeding the time switch supply',
    ],
    correctAnswer: 2,
    explanation:
      'Backup battery failure causes loss of settings after power cuts, and mechanical time switches suffer from wear in their movements.',
    section: '4.6',
    difficulty: 'basic',
  },
  {
    id: 179,
    question: 'The main switch of a consumer unit is noticeably hot to the touch. What does this indicate?',
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
      'An oversized main bonding conductor',
      'Excessive load current on the circuit',
      'Reversed polarity at the consumer unit tails',
    ],
    correctAnswer: 0,
    explanation:
      'Open circuit bonding readings indicate disconnected earth clamps, broken conductors, or removed bonding connections.',
    section: '4.6',
    difficulty: 'basic',
  },
  {
    id: 181,
    question: 'Which installation fault in structured data cabling most commonly degrades data transmission?',
    options: [
      'Screened cable used in place of unscreened',
      'Split pairs or incorrect termination',
      'A patch panel mounted in the wrong cabinet',
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
      'A luminaire mounted above its rated height',
      'A loose connection at the luminaire terminal block',
      'Failed battery or charging circuit fault',
      'Reversed polarity at the luminaire terminals',
    ],
    correctAnswer: 2,
    explanation:
      'Battery failure or charging circuit faults are the most common reasons emergency lights fail to operate when mains power is lost.',
    section: '4.6',
    difficulty: 'basic',
  },
  {
    id: 183,
    question: 'Which item of equipment on a shared supply is the most likely source of electromagnetic interference?',
    options: [
      'Protective conductors, correctly bonded and terminated',
      'Resistive heating loads, such as immersion heaters and ovens',
      'Incandescent lamps, fed from a dedicated final circuit',
      'VFDs, fluorescent lighting, or high-frequency switching',
    ],
    correctAnswer: 3,
    explanation:
      'Variable frequency drives, fluorescent lamp ballasts, and switching power supplies generate electromagnetic interference that can affect sensitive electronics.',
    section: '4.6',
    difficulty: 'basic',
  },
  {
    id: 184,
    question: 'Solar PV systems that underperform commonly suffer from:',
    options: [
      'Shading, dirty panels, or inverter faults',
      'Rising insulation resistance, which throttles the DC string current',
      'An oversized AC protective device, which caps the inverter export',
      'Reversed phase rotation, which halves the inverter output',
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
      'An IP rating higher than the location needs, which blocks the handshake',
      'Communication errors, RCD trips, or contactor failures',
      'An undersized protective conductor, which raises the charging current',
      'Reversed phase rotation, on a single-phase supply to the unit',
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
      'Begin dismantling immediately, in order to save time',
      'Energise the circuit first, to confirm the fault is still present',
      'Order the parts afterwards, once the equipment is dismantled',
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
      'Wrap the joint in tape, then put it back in service',
      'Pass more current through the joint, to burn off the oxide',
      'Tighten the existing joint hard, without cleaning the surfaces',
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
      'Only that the connected equipment switches on when tested',
      'Correct operation and safety parameters within limits',
      'That the customer is satisfied with how the repair was done',
      'The appearance and neatness of the completed installation work',
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
      'Carried out using whatever materials happen to be to hand',
      'Left undocumented afterwards so that time is saved on site',
      'Completed with appropriate materials and properly documented',
      'Carried out without isolating the circuit first or proving it dead',
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
      'Colour, and case size, match the existing devices',
      'The device is from the same wholesaler, and the same batch',
      'The busbar cut-out accepts the new device, physically at least',
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
    question: 'In what circumstances may a soldered joint be used when repairing fixed wiring?',
    options: [
      'Generally not acceptable for permanent connections',
      'The preferred method for all fixed wiring joints',
      'Required by BS 7671 at every termination in the circuit',
      'Always stronger than a properly made mechanical joint',
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
      'Leave the damaged insulation exposed where the circuit is low voltage',
      'Use appropriate insulation tape with intention to replace properly',
      'Wrap the damage in any available material and leave it there permanently',
      'Paint over the damaged area of the cable sheath to seal the insulation',
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
      'Confirm the circuit is still isolated afterwards',
      'Verify operation under normal conditions',
      'Check the appearance and neatness of the work',
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
      'Confirm the conductor colour and sleeving are correct',
      'Check the conductor is the right size for the circuit',
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
    question: 'What governs the torque applied when tightening a terminal during a repair?',
    options: [
      'According to manufacturer\'s specifications',
      'Rising with the size of the conductor being terminated',
      'Hand tight only, checked without a torque tool',
      'The same value for every terminal in the board',
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
      'Fit a similar part of a different rating to finish the job',
      'Inform customer and arrange proper repair when parts available',
      'Leave the circuit energised and unrepaired until parts arrive',
      'Bridge out the faulty component so that the equipment keeps working',
    ],
    correctAnswer: 1,
    explanation:
      "If correct parts aren't available, inform the customer, make the circuit safe, and arrange proper repair when suitable parts can be obtained.",
    section: '4.7',
    difficulty: 'basic',
  },
  {
    id: 198,
    question: 'What must be restored when an enclosure with a stated IP rating has been opened for a repair?',
    options: [
      'The enclosure is left open for more ventilation',
      'Any spare gland is used regardless of its size or type',
      'Enclosure integrity and IP rating are maintained',
      'The original seals are discarded once the lid is opened',
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
      'Only a visual check of the finished work before leaving',
      'Confirmation that the customer is satisfied with the work',
      'A record of the materials and spare parts used on the job',
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
      'Leaving the site quietly, without speaking to the customer',
      'Handing over the invoice, and nothing else, for the work done',
      'Removing all records of the work carried out, from the customer premises',
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
      'A high-resistance earth at the fridge spur, raising the measured Zs value',
      'Voltage drop on a shared circuit due to high inrush current of the fridge motor',
      'An undersized CPC on the lighting circuit, which increases its measured R2 reading',
      'The fridge thermostat contacts welded closed, so the compressor never switches off',
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
      'A mechanically sticking RCD test button (the internal test resistor) closing intermittently and operating the device with no residual current present',
      'Reversed line and neutral at the consumer unit (a polarity error) forcing the residual current through the RCD sensing coil in the wrong direction',
      'A scheduled time-controlled load (such as a frost stat or boiler) with cumulative leakage current pushing the circuit over the trip threshold',
      'A main switch rated above the RCD (100 A ahead of an 80 A device) letting the circuit draw more load current than the sensing core can carry',
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
      'For an insulation resistance test on a 230 V final circuit, which test voltage and minimum acceptable value apply?',
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
      'Have at least 20 mm of exposed metal tip so that readings register reliably, with no CAT rating required on systems at or below 230/400 V nominal',
      'Have a maximum of 4 mm exposed metal tip, finger guards, fused leads where appropriate, and be CAT III/IV rated for the system voltage',
      'Be CAT I/CAT II rated with unfused leads to give the fastest response, and carry a 10 mm exposed metal tip for reliable contact on busbars and terminals',
      'Have uninsulated probe shafts and no finger guards, so that line/earth conductors can be deliberately bridged when comparing readings on site',
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
      'An RCBO of a higher rating fitted upstream, letting enough current through the ring for the AFDD overload element to operate under normal peak demand',
      'Insulation resistance between line and neutral measuring above 300 megohms, which the AFDD then misreads as a series arc signature on that ring final circuit',
      'Reversed line and neutral at one socket outlet, so the AFDD current sensor sees the waveform inverted and wrongly reads it as arcing at the outlet',
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
      'Is a fail because it exceeds the DNO declared maximum value',
      'Is irrelevant because the supply is a TN-C-S supply',
      'Must be exactly equal to the DNO declared maximum to pass',
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
      'Earth fault loop impedance, prospective fault current, then RCD operation (all live tests) before any continuity or insulation resistance tests',
      'Continuity of protective conductors, continuity of ring, IR, polarity, earth electrode resistance (where applicable)',
      'Polarity first, then insulation resistance, then continuity of protective conductors and continuity of the ring (r1, rn, r2) last',
      'RCD trip times, then functional testing, then insulation resistance (at 500 V) with the supply still connected to the board',
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
      'During fault diagnosis on a single-phase 230 V circuit, 230 V is measured line to earth but only 110 V line to neutral at the load. The most likely cause is:',
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
      'Reversed polarity at the switched fused connection unit feeding the element',
      'An undersized circuit conductor causing excessive voltage drop at the element',
      'A heating element that has failed open circuit and needs replacing at the cylinder',
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
      'An AFDD protecting a kitchen circuit trips when the toaster is used, and the indicator shows neither overload nor earth leakage. What should be checked first?',
    options: [
      'Check the toaster for a series arc fault (loose terminal, broken element strand) using IR test on the appliance lead and visual inspection',
      'Measure the earth fault loop impedance (Zs) at the kitchen socket, comparing it with the maximum permitted value in Table 41.3 for the device',
      'Carry out an RCD trip-time test (at 1× and 5× IΔn) on the affected circuit, comparing the operating time with the manufacturer stated limit',
      'Fit an RCBO of the next size up (32 A in place of 20 A) so the kitchen circuit stops tripping, then retest loop impedance to confirm compliance',
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
      'What must a phase rotation test on a 400 V three-phase supply confirm?',
    options: [
      'L3-L2-L1 (reverse sequence), so that any connected motor always starts in the safest direction',
      'L1-L2-L3 sequence (clockwise on a rotation indicator) so connected motors run the intended way',
      'Identical voltage on all three phases (no defined rotation order is required) at the supply terminals',
      'L1-L3-L2 (a reversed pair) to balance the neutral current more evenly across the three line conductors',
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
      'Isolate and prove dead before splicing — the metallic strength member in the fibre carries induced mains voltage from adjacent cables; treat the fibre as a live conductor',
      'Apply a 500 V insulation resistance test across the fibre core before terminating — a low reading shows the glass is contaminated or cracked; clean the ferrule and retest',
      'Never look into a fibre or coupler — laser radiation can damage the retina; use a fibre detector card or scope; dispose of glass shards safely',
      'Bond the fibre sheath to the main earthing terminal — static charge stored in the glass core then discharges safely to earth; confirm continuity back at the board',
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
      'Wearing rubber-soled boots and a synthetic fleece, so that any charge collects on clothing rather than on the boards',
      'Applying a 500 V DC insulation resistance test across each board, before handling it, to prove it is fully discharged',
      'Holding boards firmly by their edge connectors with bare hands, so that any charge drains away through the operator',
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
      'A clamp meter placed around the line, neutral and protective conductors of one circuit together reads 4.8 A. This indicates:',
    options: [
      '4.8 A of unbalance current, indicating earth leakage to investigate',
      '4.8 A of balanced load current, drawn by the connected appliance',
      '4.8 A of load current, returning through the protective conductor',
      '4.8 A of line current, read because the clamp meter itself is faulty',
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
      'Begin isolating and dismantling the suspect equipment straight away, so that the duty holder downtime is kept as short as possible on the day itself',
      'Conduct a risk assessment, agree the scope of work with the duty holder, gather any prior records and confirm safe access and isolation points',
      'Carry out a full insulation resistance test on every circuit at the distribution board, before speaking to anyone else, on first arrival at the premises',
      'Issue the completion certificate and schedule of test results in advance, before any diagnostic testing or inspection has been carried out at the premises',
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
      'A tripping RCBO is traced back through an earth fault, a damaged cable, and a cable run in a stud wall that a joiner cut through because safe zones were not marked. Which action addresses the underlying cause?',
    options: [
      'Replace the tripping RCBO with a higher-rated device (100 mA) so that it no longer operates on the fault',
      'Repair the damaged cable and re-energise, treating the chase cut by the joiner (one-off damage) as closed',
      'Repair the cable AND mark safe zones (BS 7671 Reg 522.6) AND brief site team to prevent recurrence',
      'Advise the customer to reset the RCBO each time it trips and keep a log (date and time) of how often it happens',
    ],
    correctAnswer: 2,
    explanation:
      "Root cause analysis distinguishes the immediate fix (repair cable) from preventing recurrence (mark safe zones, brief other trades). BS 7671 Reg 522.6.201 specifies cables in safe zones (within 150 mm of corners or obscured behind earthed metal containment). Without addressing the root, the fault returns.",
    section: '4.8',
    difficulty: 'basic',
  },
  {
    id: 219,
    question:
      "An IR camera shows a 75°C hot-spot on one phase of an MK three-phase distribution board, while the other two phases sit at 35°C. The most likely fault is:",
    options: [
      'Normal operation, because the most heavily loaded phase of a three-phase board always runs hotter, and a 40°C difference (delta-T) between phases is expected',
      'Excessive insulation resistance (above the 1 MΩ minimum) on that phase dissipating the leakage current as heat, which will settle down once the board is re-tested under normal load',
      'A reversed polarity fault on that phase (line and neutral transposed), reversing the direction of current in the busbar and raising its operating temperature above the other two',
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
      'Working live wherever possible so the job is finished before anyone else arrives, with the customer in the house counted as the second person for emergency purposes and no formal check-in arranged at all',
      'No precautions beyond telling the office the address, since domestic fault calls are treated as low risk and the customer being at home is regarded as adequate supervision of the work being carried out',
      'Relying on a mobile phone alone, with no agreed check-in times, no escalation contact and no dynamic risk assessment, on the basis that the vehicle tracker already records the arrival time at the property',
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
      'Touch capacitor terminals immediately after isolation, since a bleed resistor is fitted internally to every capacitor and drains the stored charge the instant the supply is removed',
      'Allow capacitors to discharge through a bleed resistor before contact, treat large capacitor banks as energised even after isolation, and use instruments rated for the frequency present',
      'Use a standard 50 Hz multimeter whatever the frequency present, because true-RMS instruments compensate automatically, and read the capacitor voltage on the DC voltage range only',
      'Short the capacitor terminals together with a screwdriver blade to dump the stored charge as quickly as possible, then confirm zero volts on the lowest AC range of the meter before starting',
    ],
    correctAnswer: 1,
    explanation:
      "Capacitor banks (PFC, DC link capacitors in VFDs) can hold dangerous charge for minutes to hours after isolation. Always wait the manufacturer's recommended discharge time (often 5-15 minutes), then discharge through a rated bleed resistor or shorting bar before touching terminals. Treat as live until proven dead.",
    section: '4.8',
    difficulty: 'basic',
  },
  {
    id: 222,
    question:
      'A split-load consumer unit has one 30 mA RCD covering all socket circuits. An EV charger is added to the same RCD-protected bank. What problem is most likely?',
    options: [
      'The additional EV load will overload the busbar of the split-load board (rated 100 A), causing the main switch/isolator to overheat; a higher-rated main switch is needed and the remaining ways on that side of the board derated to suit the new load',
      'The added load will pull the earth fault loop impedance (Zs) at the charger below the maximum permitted in Table 41.3; the disconnection time can no longer be met, so a longer line/cpc route is needed to raise the Zs back up into range',
      'Cumulative DC residual current from the EV charger and other loads could exceed the AC-only RCD threshold, plus DC residual currents may blind a Type AC RCD; a Type A or Type B RCD is required (BS 7671 722.531.3.101 / Section 722)',
      'The EV charger will reverse the polarity of the socket outlets sharing the same RCD bank (line/neutral transposed), because its internal rectifier returns current through the neutral bar; those sockets must be moved to the other bank straight away',
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
      'An Electrical Installation Condition Report (EICR) in every case, since any work carried out after a fault is treated as a periodic inspection/testing of the installation as a whole, whatever its extent',
      'A PAT test certificate (in-service inspection/testing record) covering the affected portable appliance, with the fixed wiring recorded only in the site log book and no BS 7671 model form issued',
      'A verbal confirmation to the customer plus an entry on your own job/time sheet (dated and timed), since certification is only required when a completely new circuit is added to an existing installation at a later date',
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
      'How is the effectiveness of a 30 mA RCBO verified after a repair, and what result confirms it?',
    options: [
      'By confirming no trip at half IΔn, a trip at 1x IΔn, then a trip within 40 ms at 5x IΔn',
      'A single alternating current test at IΔn, disconnecting within 300 ms for a non-delay device',
      'By comparing the measured trip current with the values in Table 3A, Appendix 3, for that device Type',
      'By operating the integral test button twice, and recording the faster of the two results',
    ],
    correctAnswer: 1,
    explanation:
      'Table 3A (Time/current performance criteria for RCDs) in Appendix 3 has been deleted. Verification now uses a single alternating current test at the rated residual operating current, regardless of RCD Type: effectiveness is deemed verified where a general non-delay device disconnects within 300 ms maximum, or a delay S type between 130 ms minimum and 500 ms maximum. A measured trip current below IΔn is expected; it is the disconnection time that is assessed.',
    section: '4.8',
    difficulty: 'advanced',
  },
  {
    id: 225,
    question:
      "When attending a domestic call for 'half the lights are off', your initial logical hypothesis tree should include:",
    options: [
      'A single insulation resistance fault affecting every light fitting on the circuit equally, which would be confirmed by an IR test (500 V d.c.) between line/earth and line/neutral',
      'Loss of one phase (in TPN supply), tripped MCB/RCBO, loose connection at a feeder, line conductor break in a junction box or pendant, and accidental switching off',
      'Reversed polarity at the consumer unit (line/neutral transposed), causing the affected half of the fittings to dim rather than go out, confirmed by a check at the main switch',
      'An oversized protective device (a 16 A MCB/RCBO in place of a 6 A) passing too much current to the lighting circuit, so the affected fittings drop out once the load rises above a set level',
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
      'A voltage indicator used for the test for dead must be proved before and after use against which source?',
    options: [
      'The circuit being worked on — a reading before isolating it and another once the supply has been switched off (at the board)',
      'An insulation resistance tester set to 500 V d.c. (the LV test voltage) — its output proves the indicator before and after use',
      'A known live source (proving unit such as a PD440 or a confirmed live circuit) — the proving sequence is prove-test-prove',
      'The calibration certificate from the manufacturer (with its expiry date) — a valid certificate removes the need to prove the indicator on site',
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
      'What did Amendment 4:2026 add to the Schedule of Inspections?',
    options: [
      'AFDD presence/justification for each circuit',
      'The name/address of the cable manufacturer for each circuit',
      'The retail/trade price of every protective device installed',
      'The ambient/ground temperature recorded at the time of each test',
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
      'Replace the consumer unit and re-test every circuit in the property before looking at the appliance itself, on the basis that short-cycling points to a supply/wiring problem every time',
      'Verify supply voltage, check start/run capacitor capacitance with multimeter capacitance range, measure motor winding resistances, inspect overload relay and check refrigerant pressure',
      'Measure the earth fault loop impedance at the freezer socket, compare it with the maximum permitted for the MCB/RCBO fitted, then re-test the RCD trip time at that socket outlet',
      'Carry out an AFDD self-test, confirm the line/neutral polarity of the plug top and check the flex, with no measurements taken on the compressor or its start capacitor at any point on the visit',
    ],
    correctAnswer: 1,
    explanation:
      "Compressor short-cycling indicates either electrical (failing start capacitor, faulty overload, low supply voltage causing stall) or refrigeration (low refrigerant tripping LP cut-out, dirty condenser). Capacitance test on the start/run capacitor (e.g. with Fluke 117 capacitance range) catches the most common electrical cause.",
    section: '4.8',
    difficulty: 'basic',
  },
  {
    id: 230,
    question:
      "When recording fault diagnosis findings for the customer, IET CoP and good practice require:",
    options: [
      'A verbal summary given to the customer at the end of the visit (with no written record retained at all) — the invoice already evidences that the work was carried out',
      'Only the final invoice amount and the total hours worked (labour and materials) — the technical detail is deliberately omitted so that the customer is not confused by the test values',
      'Written report including symptoms found, tests performed, results (with numerical values), root cause, repair carried out, retest results and recommendations — all dated and signed',
      'A note of the time spent on site and the parts used — the tests, the values measured and the root cause need no record (all held in the test instrument memory anyway)',
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
      'The original work has been completed exactly as quoted with no change of scope (no extras, no omissions) — a variation order is then raised to close the job off and confirm the final account',
      'The customer has already paid the final invoice and signed the job off (the warranty record) — a variation order issued afterwards records any extra items fitted along the way',
      'Finding that a test instrument has gone out of calibration during the work (past its annual recheck) — a variation order records the retest and passes the recalibration cost on as an extra',
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
      'A borescope inspection of a distribution board in a damp basement shows green oxide on the busbar. What is the correct response?',
    options: [
      'Code C2 (potentially dangerous) on EICR, isolate, plan replacement of affected components, investigate water ingress and moisture source as the root cause',
      'Record it as Code C3 (improvement recommended), leave the board in service and note the damp as an observation for the next periodic inspection',
      'Wipe the oxide from the busbar, apply petroleum jelly (a moisture barrier) to the contacts and re-energise, with no further investigation',
      'Treat it as normal, since green oxide on copper (verdigris) is a protective patina that seals the surface and presents no risk to the busbar connections',
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
      'Prospective fault current measured at a socket-outlet is 1.65 kA. The circuit is protected by a 32 A Type B RCBO with a breaking capacity of 6 kA. This result:',
    options: [
      "Fails — the prospective fault current must never exceed half the device rating",
      "Passes — installed device's 6 kA breaking capacity exceeds the prospective fault current",
      "Fails — a 32 A type B device always requires a 10 kA breaking capacity minimum",
      'Cannot be assessed — the earth fault loop impedance must be measured first',
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
      'Several items of IT equipment fail during a fault investigation on the circuit supplying them. What should be investigated first?',
    options: [
      'An oversized protective device (a 32 A on a 20 A radial) letting fault energy through before it disconnects — reduce the rating to match the circuit',
      'Excessive insulation resistance (above 1 MΩ) between line and neutral at the socket outlet — the leakage current then reaches the equipment power supply',
      'A common-mode transient (lightning, switching surge) reaching the equipment via mains, data cable or earth — investigate SPDs, data isolation, surge events',
      'A reversed polarity fault (transposed conductors) at the IT equipment socket — the switched line then sits on the neutral side of the internal fuse',
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
      'Use any standard (non-certified) test instrument once the circuit is isolated and locked off, since an isolated circuit cannot produce an incendive spark in a zone 1 area at any time',
      'Wear additional insulating gloves and flame-retardant (FR) overalls, but use ordinary non-certified test equipment, as the readings obtained are the same either way in practice',
      'No special precautions are needed once the supply has been switched off, provided the area has been ventilated (forced extraction) and the permit desk has been informed first',
      'Use intrinsically safe (Ex i) test equipment, obtain a permit-to-work, gas-test the area, wear anti-static PPE, and only use methods compliant with the area\'s zone classification',
    ],
    correctAnswer: 3,
    explanation:
      "DSEAR 2002 and the EX framework require all equipment used in hazardous areas to be certified for the zone (Zone 0, 1, 2 for gas; 20, 21, 22 for dust). Test instruments must be Ex i intrinsically safe. Permit-to-work and gas-test before any electrical work; never break a circuit live in a flammable atmosphere.",
    section: '4.8',
    difficulty: 'intermediate',
  },
  {
    id: 236,
    question:
      "After repairing a fault that involved chasing brick to bury new cable, the building fabric must be:",
    options: [
      'Reinstated to at least the original condition using suitable mortar/plaster, with cable in safe zones or in earthed metal containment, and any made-good areas redecorated as agreed',
      'Left open and unfilled so that the buried cable can be inspected at any time in future, with the customer told to keep the area clear and a note added to the certificate/report',
      'Filled with any available material such as expanding foam/silicone sealant, since the finish is cosmetic and the cable capping already gives the protection needed',
      'Left for the customer to make good, as reinstatement of plaster/decoration falls outside electrical work and is normally handled by the main contractor instead',
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
      'Only a simple pass/fail (one line for the whole installation), with the measured values held on the instrument and quoted to the customer only if a dispute later arises',
      'Circuit reference, conductor sizes, R1+R2, R2 (where applicable), IR live-live and live-earth, polarity, Zs, RCD trip times at 1× and 5×, AFDD test, all with limits and pass/fail',
      'The make, model/type and serial number of each test instrument used (together with its calibration date), since the individual circuit readings belong on the certificate itself',
      'The date/time of the visit, the name of the attending electrician and the circuit that was repaired (its reference only), since the remaining circuits were not part of the work carried out',
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
      'What should determine the extent of sampling when a periodic inspection cannot cover every point?',
    options: [
      'A fixed 10% of the circuits on every installation — the same proportion regardless of the type, age or condition of the installation or the results of any previous inspection',
      'No sampling at all — every circuit must be fully tested at every periodic inspection, with the whole installation taken out of service to allow this',
      'Risk-based — sample to a level that gives confidence in the conclusions, with sampling agreed with the duty holder, and 100% of accessible parts visually inspected',
      'Whatever proportion the electrician judges reasonable on the day — the basis of that choice is left off the report so the conclusions are not limited',
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
      'A no-trip loop impedance test measures Zs at low current so that a 30 mA RCD is not operated. How does its accuracy compare with the high-current test?',
    options: [
      'Significantly more accurate than the high-current test in every case, because no load current (and so no heating) is drawn during the measurement',
      'Identical accuracy to the high-current test, since both methods measure the same loop (Ze plus R1+R2) using the same internal calculation',
      'So inaccurate that the result may be used only as an indication (never entered on a certificate) for compliance purposes',
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
      'Fit a sine-wave or dV/dt filter at the VFD output, install shaft grounding rings, use VFD-rated motor cables (low-capacitance, screened) and bond the cable screen 360° at both ends',
      'Increase the VFD switching (carrier) frequency to its maximum, as a faster carrier reduces the dV/dt at the motor terminals and removes the shaft current path entirely',
      'Remove the motor earth connection (the cpc/bonding at the terminal box), so that the bearing currents have no return path back to the drive and can therefore no longer circulate',
      'Replace the VFD with a larger frame/current rating (next size up) so that it runs cooler on the same load, which in turn lowers the rate of rise of voltage at the motor terminals',
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
      'In an eight-cell lead-acid battery bank, two cells measure 1.8 V while the remaining six measure 2.1 V. What action should be taken?',
    options: [
      'Leave the weak cells in place (no action needed); cells in a series string self-balance, over several charge cycles, once the bank is returned to continuous float charge',
      'Identify the discharged cells as defective (sulphation or open internal connection), test specific gravity, and replace as a matched set; never mix new and old cells in a series string',
      'Replace only the two weak cells (same type and rating), then return the bank to service; record the cell voltages again at the next scheduled service visit to the site',
      'Increase the charger output voltage (an equalising charge), driving the weak cells back up to 2.1 V; then return the charger to its normal float setting once the string has balanced',
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
      'A highly technical written report quoting regulation numbers and measured values only, on the basis that the record has to be legally defensible rather than understandable',
      'Proceeding with all remedial work first so the installation is left safe, then informing the customer of what was found and invoicing for the additional time and materials',
      'Plain English explanation of what was found, the risk it presents, the proposed remedy, the cost and time impact, and the customer\'s decision recorded in writing before proceeding',
      'Mentioning the fault verbally and avoiding any written record, so that the customer is not given grounds for a dispute over work that fell outside the original quotation',
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
      'Only that the insulation resistance (line/earth) reading has improved on the previous test, since a satisfactory IR value (above 1 MΩ) shows the original fault is cleared and that the protective devices downstream of the repair must therefore still be sound',
      'That the circuit re-energises without immediately tripping its protective device, because an MCB/RCBO that holds in under normal load proves both the repair and the correct operation of every RCD, RCBO and interlock (no separate test)',
      'The appearance of the finished work and that the customer is satisfied with it, as functional testing of protective devices and controls/interlocks is carried out at the next periodic inspection (the EICR) rather than after a repair',
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
      'Place all waste into the general waste skip — electronic accessories, cable off-cuts/packaging alike, as household quantities are exempt from the waste regulations',
      'Leave the waste on site for the customer to dispose of as they see fit — the duty of care passes to the occupier/client, once the work has been signed off and paid for',
      'Burn the cable off-cuts on site to recover the copper/aluminium for resale — the remaining accessories go back to the wholesaler, in exchange for a scrap credit',
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
      'Simply replacing the charger with a new unit (same make/model and rating) without any diagnostic investigation, since intermittent stopping is a known firmware behaviour that cannot be measured on site and is always cured by a hardware swap',
      'Check supply voltage stability under load (DNO voltage drop), CT clamp position and orientation if load-shedding is enabled, communications/firmware logs, RCD trip/auto-reset behaviour, and weather/temperature effects on the charger',
      'Assuming the vehicle battery management system (BMS) is faulty and advising the customer to have the car checked by the dealer, as the charger only follows the start/stop demand from the vehicle and cannot itself interrupt a session',
      'Increasing the rating of the protective device supplying the charger (a 40 A MCB/RCBO in place of a 32 A) so the charge is no longer interrupted, then re-testing the loop impedance to confirm the disconnection time is still met',
    ],
    correctAnswer: 1,
    explanation:
      "EV chargers are complex systems with supply, comms, CTs and protective monitoring. A clamp meter at the origin captures voltage stability under EV load; CT misorientation causes incorrect load-shedding; firmware logs reveal communication faults. Many manufacturers provide cloud telemetry (Ohme, Wallbox, EO) to diagnose remotely.",
    section: '4.8',
    difficulty: 'basic',
  },
  {
    id: 246,
    question:
      'Which earthing arrangement has the neutral-to-earth link made within the consumer\'s installation rather than out in the distributor\'s network?',
    options: [
      'TT (Terre-Terre) — recognising the use of an independent electrode/mat at the installation in place of a distributor earth',
      'IT (Isole-Terre) — recognising an unearthed/impedance-earthed supply with an independent electrode at the installation',
      'PNB (Protective Neutral Bonding) — recognising the LV practice of bonding to the combined neutral/earth at the consumer cut-out',
      'TN-S (Terre-Neutre-Separe) — recognising separate neutral/protective conductors run from the transformer to the origin',
    ],
    correctAnswer: 2,
    explanation:
      "PNB is a TN-C-S variant in which the neutral-earth link sits within the consumer's installation, typically where the consumer has a dedicated transformer or multiple sources. NOTE 3(a) is explicit: where the source earth and the neutral-earth link are installed within the consumer's installation, PME conditions do not apply. A4:2026 adds the PNB figure and its requirements at Reg 312.2.1.1. Open-PEN risk still drives the EV and heat-pump rules on outdoor metalwork.",
    section: '4.8',
    difficulty: 'intermediate',
  },
  {
    id: 247,
    question:
      "A flickering LED downlight controlled by a remote dimmer is reported. Diagnostic logic should consider:",
    options: [
      'A reversed polarity fault at the downlight (line/neutral transposed), so the lamp is fed through the switched neutral and flickers whenever the dimmer reduces the conduction angle, confirmed by a check at the rose',
      'An oversized protective device (a 16 A MCB/RCBO on a lighting circuit) allowing excess current to reach the downlight, so the driver runs above its rated input and pulses; the remedy is to reduce the MCB rating to match the load',
      'Excessive insulation resistance in the lighting cable supplying the downlight (measured at 500 V d.c. line/earth), restricting the current available to the driver so it drops out and restarts, showing as a low reading',
      'Compatibility of the LED driver with the dimmer (leading-edge vs trailing-edge, minimum load), neutral connection at the switch (for smart dimmers), driver minimum-load issue, and harmonic/DC supply asymmetry causing 100 Hz flicker',
    ],
    correctAnswer: 3,
    explanation:
      "LED flicker stems from dimmer/driver mismatch (most common), insufficient minimum load on a leading-edge dimmer, lack of neutral at smart dimmers, or supply DC offset. Match dimmer type to driver datasheet (trailing edge usually preferred for LED), and check minimum load. Some installs need a 'min-load' resistor pack.",
    section: '4.8',
    difficulty: 'basic',
  },
  {
    id: 248,
    question:
      'An RCBO protecting a kitchen radial trips repeatedly, and black soot is visible inside the device. What action should be taken?',
    options: [
      'Replace the device — internal arcing has occurred and the contact set integrity cannot be guaranteed; investigate cause of severe fault that produced the arcing',
      'Clean the soot out with contact cleaner and refit the device — the contact set is serviceable once cleaned; note the condition on the schedule of test results',
      'Leave the device in place — soot inside an RCBO is a normal by-product of repeated switching under load; the contact set is unaffected by it',
      'Reset the device — the contacts burnish themselves clean after a few operating cycles; advise the customer that it will settle',
    ],
    correctAnswer: 0,
    explanation:
      "Black carbon deposits inside a protective device indicate internal arcing — likely a high prospective fault current event approaching the device's breaking capacity. Replace the device, log the fault event, and investigate the originating fault to ensure it has been corrected. Many manufacturers void warranty on devices showing arcing.",
    section: '4.8',
    difficulty: 'basic',
  },
  {
    id: 249,
    question:
      "A test result schedule shows IR L-N = 0.2 MΩ on a final circuit. Per BS 7671 Table 64, this is:",
    options: [
      'A clear pass — the reading exceeds the Table 64 value for a low voltage final circuit (measured at 500 V d.c.) that remains in service and in use',
      'Fail (minimum 1 MΩ for LV) — investigate insulation degradation, moisture ingress, damaged cables or connected equipment that should have been disconnected',
      'A pass only where the circuit has 30 mA RCD additional protection (Reg 411.3.3) — the RCD compensates for the reduced insulation resistance of the wiring in that circuit',
      'Not relevant — minimum insulation resistance values apply only to SELV and PELV circuits (tested at 250 V), never to 230 V final circuits',
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
      'Leaving the covers off for ventilation and the work area exactly as found, so that the customer can see the repair and any return visit is quicker to carry out later on site',
      'Only restoring the supply and closing up, with the labelling, customer briefing, clean-up and certification all left to be completed on a later return visit to the same property',
      'Power restored, all covers refitted, labels updated, customer briefed, work area swept and waste removed, certificate left with customer or emailed, and instruments returned to vehicle',
      'Removing all site records and leaving site without speaking to the customer, so that the paperwork can be prepared and posted out from the office at a later date instead',
    ],
    correctAnswer: 2,
    explanation:
      "Professional close-out includes power restoration, all enclosures refitted with correct fixings, updated labels (circuit charts, safety signage), customer brief and certificate handover, clean and clear work area, and ensuring no instruments left behind. This protects the customer and the contractor's reputation.",
    section: '4.8',
    difficulty: 'basic',
  },
  {
    id: 251,
    question:
      'Before working on a circuit that is suspected of having an intermittent earth fault, which sequence correctly describes safe isolation?',
    options: [
      'Identify, isolate, prove dead, then secure against re-connection',
      'Identify, isolate, secure against re-connection, then prove dead',
      'Isolate, prove dead, identify the circuit, then secure it off',
      'Prove dead, identify the circuit, isolate it, then secure it off',
    ],
    correctAnswer: 1,
    explanation:
      'The device must be secured (locked off, key retained, warning notice applied) before the dead test is carried out, so that nobody can re-energise the circuit between the test and the work starting. Proving dead before securing is the attractive wrong answer because the readings feel like the "real" safety step, but an unsecured isolator can be closed the moment your back is turned, making a dead test meaningless.',
    section: '4.4',
    difficulty: 'intermediate',
  },
  {
    id: 252,
    question:
      'A 30 mA general (non-delay) RCD protecting a socket circuit is being verified after a repair. What is the acceptance criterion in BS 7671?',
    options: [
      'It must open within 40 ms when tested at five times IΔn',
      'It must open between 130 ms and 500 ms when tested at IΔn',
      'It must open within 300 ms when tested at IΔn using an AC test',
      'It must open within 200 ms when tested at half of its IΔn',
    ],
    correctAnswer: 2,
    explanation:
      'Verification is an alternating current test at the rated residual operating current IΔn, and a general non-delay device must disconnect within 300 ms. The 40 ms at five times IΔn figure is a very common trap: it is the BS EN 61008/61009 product-standard performance of the device, not the BS 7671 verification criterion, and Table 3A of Appendix 3 that people quote it from has been deleted.',
    section: '4.3',
    difficulty: 'advanced',
  },
  {
    id: 253,
    question:
      'A Type S (selective) RCD is fitted upstream of several final-circuit RCBOs. What operating time range confirms it is functioning correctly?',
    options: [
      'Within 300 ms at 100% of its rated residual current, with no minimum',
      'Within 40 ms at five times its rated residual current, no minimum',
      'Between 500 ms and 1000 ms at 100% of its rated residual current',
      'Between 130 ms and 500 ms at 100% of its rated residual current',
    ],
    correctAnswer: 3,
    explanation:
      'A Type S device is deliberately time-delayed so that a downstream device clears the fault first, so it has both a minimum and a maximum: 130 ms to 500 ms at IΔn. Answering "within 300 ms" is tempting because that is the criterion for a general device, but a Type S that tripped in under 130 ms would defeat discrimination and let the whole installation go off for a single final-circuit fault.',
    section: '4.3',
    difficulty: 'intermediate',
  },
  {
    id: 254,
    question:
      'Which instrument characteristics should a low-resistance ohmmeter have when proving continuity of protective conductors during fault diagnosis?',
    options: [
      'No-load 4 V to 24 V with a short-circuit current of at least 200 mA',
      'No-load 250 V DC with a short-circuit current of at least 200 mA',
      'No-load 4 V to 24 V with a short-circuit current below 20 mA',
      'No-load 500 V DC with a short-circuit current of at least 1 mA',
    ],
    correctAnswer: 0,
    explanation:
      'Guidance Note 3 recommends a no-load voltage of 4 V to 24 V and a short-circuit current of not less than 200 mA, which instruments to BS EN IEC 61557-4 meet. The low test voltage is safe on a dead circuit while the substantial current burns through light oxide films so a loose joint reads high rather than reading falsely good. A milliamp-level source can pass through a dirty joint and mask the very fault you are hunting.',
    section: '4.3',
    difficulty: 'intermediate',
  },
  {
    id: 255,
    question:
      'Lights on several circuits dim noticeably whenever a 3 kW load is switched on. Ze measured at the origin is unusually high, yet every final circuit R1+R2 is normal. What is the most likely fault?',
    options: [
      'A short circuit between line and neutral inside one lighting switch drop',
      'An open-circuit protective conductor on the affected lighting circuits',
      'A high-resistance joint in the supply neutral or main earthing conductor',
      'Reversed polarity at the socket-outlet supplying the 3 kW load appliance',
    ],
    correctAnswer: 2,
    explanation:
      'Volt drop that appears only under load, affects several circuits at once, and comes with a high Ze points upstream of the distribution board, at the intake or supply connection. Normal R1+R2 readings actively rule out the final circuits. An open cpc is the attractive wrong answer because it also raises earth-loop readings, but it would affect only its own circuit and would not cause lamps elsewhere to dim under load.',
    section: '4.6',
    difficulty: 'advanced',
  },
  {
    id: 256,
    question:
      'Which symptom is most typical of a high-resistance connection at an accessory terminal?',
    options: [
      'Immediate operation of the circuit-breaker, the joint resistance driving the current up',
      'Localised heating and discolouration at the terminal, worse under load',
      'An insulation resistance reading of zero to earth, the loose terminal shorting the cpc',
      'A residual current device tripping on energising, the joint diverting current to earth',
    ],
    correctAnswer: 1,
    explanation:
      'A loose or corroded terminal behaves as an unwanted resistor in series with the load, so power is dissipated at the joint and it heats, browns the plastic and smells. Instant breaker operation is the signature of a short circuit or overload, not a high-resistance joint, because a high-resistance joint actually reduces current and so tends to leave the protective device untroubled.',
    section: '4.1',
    difficulty: 'basic',
  },
  {
    id: 257,
    question:
      'An open circuit is being traced on a long radial with many junction boxes. Which approach locates the break in the fewest tests?',
    options: [
      'Test at the mid point, then halve the remaining suspect length each time',
      'Test every accessory in order, from the board to the far end of the run',
      'Replace each junction box connector in turn, until the circuit works again',
      'Measure insulation resistance at the board, then estimate the break from the value',
    ],
    correctAnswer: 0,
    explanation:
      'The half-split method removes half of the remaining possibilities with every test, so a run of sixteen boxes is narrowed down in about four tests instead of sixteen. Working sequentially from the board is the intuitive wrong answer: it will find the fault eventually but takes far longer on average, and each accessory opened adds another opportunity to disturb sound connections.',
    section: '4.2',
    difficulty: 'intermediate',
  },
  {
    id: 258,
    question:
      'Why must an approved voltage indicator be checked on a proving unit both before and after the test for dead?',
    options: [
      'To discharge any capacitance left in the conductors being tested',
      'To confirm the isolating device has been locked off correctly',
      'To calibrate the indicator against the supply voltage present',
      'To confirm the indicator itself was working throughout the test',
    ],
    correctAnswer: 3,
    explanation:
      'A voltage indicator can fail between the first proof and the dead test, and a failed indicator gives exactly the same blank display as a genuinely dead conductor. Proving it afterwards is what turns a blank reading into evidence. Calibration is the plausible wrong answer, but a proving unit only confirms function against a known source; instrument calibration is a separate periodic exercise and cannot be done at the point of work.',
    section: '4.4',
    difficulty: 'intermediate',
  },
  {
    id: 259,
    question:
      'A consumer unit is found with an accessible live busbar exposed behind a missing blanking plate. Which classification code should the report carry?',
    options: [
      'C2, because the danger would only arise if a further fault occurred',
      'C3, because the arrangement merely falls short of the current edition',
      'C1, because danger is present and immediate remedial action is needed',
      'FI, because further investigation is needed before a code is assigned',
    ],
    correctAnswer: 2,
    explanation:
      'Live parts that can be touched are a present danger, which is the definition of C1, and the duty holder must be told at once. C2 is the classic misapplication here: C2 covers potential danger that needs a further fault or event to become hazardous, such as a missing cpc, whereas an exposed busbar can shock somebody right now with nothing else having to go wrong.',
    section: '4.5',
    difficulty: 'intermediate',
  },
  {
    id: 260,
    question:
      'A 230 V lighting circuit is being tested for insulation resistance after a suspected cable nail strike. Which test voltage and minimum acceptable value apply?',
    options: [
      '250 V DC, with a minimum acceptable value of 0.5 MΩ',
      '500 V DC, with a minimum acceptable value of 1.0 MΩ',
      '1000 V DC, with a minimum acceptable value of 1.0 MΩ',
      '500 V AC, with a minimum acceptable value of 2.0 MΩ',
    ],
    correctAnswer: 1,
    explanation:
      'Table 64 sets 500 V DC and a 1.0 MΩ minimum for circuits up to and including 500 V. The 250 V DC / 0.5 MΩ line is the attractive wrong answer, but it applies only to SELV and PELV circuits, where the reduced voltage protects the low-voltage electronics; applying it to a 230 V lighting circuit would accept insulation that is only half as good as BS 7671 requires.',
    section: '4.3',
    difficulty: 'intermediate',
  },
  {
    id: 261,
    question:
      'A ring final circuit protected by a 32 A Type B circuit-breaker measures Zs of 1.52 Ω at the furthest socket-outlet. What should the electrician conclude?',
    options: [
      'It passes, as the maximum Zs for a 32 A Type B device is 2.19 Ω',
      'It passes, because the 5 s disconnection time permits up to 1.75 Ω',
      'It fails, as the maximum Zs for a 32 A Type B device is 1.37 Ω',
      'It fails, but only because a ring circuit must stay below 1.09 Ω',
    ],
    correctAnswer: 2,
    explanation:
      'The tabulated maximum Zs for a 32 A Type B device at 230 V is 1.37 Ω, derived using Cmin of 0.95, so 1.52 Ω will not guarantee disconnection in time and the fault must be traced. The 5 s answer is the common trap: for a Type B device the magnetic trip current is the same either way, so the 0.4 s and 5 s limits are identical and there is no relaxation to fall back on.',
    section: '4.3',
    difficulty: 'advanced',
  },
  {
    id: 262,
    question:
      'An upstairs lighting circuit is switched off at its own circuit-breaker, yet a voltage indicator still shows a live neutral at one ceiling rose and the downstairs lights dim. What is the fault?',
    options: [
      'A reversed line and neutral connection at the upstairs ceiling rose',
      'A borrowed neutral shared between the upstairs and downstairs circuits',
      'An open-circuit protective conductor between the two lighting circuits',
      'A short circuit between line and earth inside the upstairs switch drop',
    ],
    correctAnswer: 1,
    explanation:
      'When one circuit returns its load current through another circuit neutral, isolating that circuit leaves the neutral still carrying and at a potential, and the borrowing circuit behaves oddly, which is exactly the symptom described. Reversed polarity is the tempting answer because it also produces an unexpected live conductor, but it would not couple two separate circuits together or affect lamps downstairs.',
    section: '4.2',
    difficulty: 'advanced',
  },
  {
    id: 263,
    question:
      'A 30 mA RCD protecting several circuits trips only when a washing machine and a desktop computer are both running. Insulation resistance on every circuit exceeds 1 MΩ. What is the most likely cause?',
    options: [
      'A line-to-earth short circuit inside the washing machine heating element',
      'A neutral-to-earth fault in the wiring between the board and the sockets',
      'An undersized circuit protective conductor serving the socket-outlets',
      'Cumulative protective conductor leakage from the connected appliances',
    ],
    correctAnswer: 3,
    explanation:
      'Filters in appliances and IT equipment deliberately pass a small standing current to earth, and several items together can total more than the roughly 15 mA at which a 30 mA device may begin to operate. That is why the fault appears only in combination and why the fixed wiring tests clean. A heater element short is the attractive answer, but it would trip the device instantly and every time, not only when a second appliance joins in.',
    section: '4.6',
    difficulty: 'advanced',
  },
  {
    id: 264,
    question:
      'What distinguishes an overload from a short circuit?',
    options: [
      'An overload is excess current in a circuit that is otherwise sound',
      'An overload is a fault current flowing between two live conductors',
      'An overload arises only on circuits protected by fuses, not breakers',
      'An overload is current flowing from a line conductor directly to earth',
    ],
    correctAnswer: 0,
    explanation:
      'An overload occurs in a healthy circuit that is simply asked to carry more current than it was designed for, typically because too much load has been added. A short circuit is a fault between live conductors of negligible impedance. Confusing the two matters in diagnosis: an overload is cured by redistributing load, while a short circuit means damaged insulation that must be found and repaired.',
    section: '4.1',
    difficulty: 'intermediate',
  },
  {
    id: 265,
    question:
      'Why would an electrician select the low-current (no-trip) range on a loop impedance tester when checking an RCD-protected circuit?',
    options: [
      'It measures the loop impedance far more accurately than high current',
      'It removes the need to disconnect the load before testing the circuit',
      'It keeps the injected test current below the RCD residual trip threshold',
      'It compensates automatically for the temperature of the conductors',
    ],
    correctAnswer: 2,
    explanation:
      'A conventional loop test injects a current through the earth path that a 30 mA device reads as residual current and trips on, so the no-trip range uses a much smaller current pulsed over a longer period. Greater accuracy is the plausible wrong answer, but the opposite is true: the tiny test current makes the reading more susceptible to noise, which is why a high-current test is preferred wherever the RCD can be bypassed.',
    section: '4.3',
    difficulty: 'intermediate',
  },
  {
    id: 266,
    question:
      'A single final circuit must be worked on in a distribution board serving a busy office. No lock-off device will fit that circuit-breaker. What is the correct action?',
    options: [
      'Switch the breaker off, tape it over and post a warning label on it',
      'Isolate and secure at the main switch, or fit a breaker that will lock',
      'Remove the breaker, leaving the busbar live with a warning notice on',
      'Switch the breaker off, and ask a colleague to watch the board instead',
    ],
    correctAnswer: 1,
    explanation:
      'Isolation must be secured by a means that cannot be defeated by someone else, so the answer is to lock off at a point that will accept a lock, even if that means isolating more of the installation, or to change the device for one that can be secured. Tape and a label are the tempting practical answer, but they only advise; anyone can peel them off and switch the circuit back on while you are working.',
    section: '4.4',
    difficulty: 'advanced',
  },
  {
    id: 267,
    question:
      'A damaged section of cable on a socket-outlet circuit has been replaced. Which tests must be carried out before the circuit is returned to service?',
    options: [
      'Insulation resistance, and a functional switching check, will be enough',
      'Earth fault loop impedance alone, as the cable route has not changed',
      'A visual inspection alone, since the repair is a like-for-like change',
      'Continuity, insulation resistance, polarity, Zs and RCD operation',
    ],
    correctAnswer: 3,
    explanation:
      'A repair breaks into conductors, so the full sequence relevant to that circuit must be repeated to prove the joint is sound, correctly connected and still protected. Insulation resistance alone is the attractive shortcut because it catches the original damage, but it would not reveal a transposed line and neutral or a cpc left out of a terminal, both of which are easy to create during a repair.',
    section: '4.7',
    difficulty: 'intermediate',
  },
  {
    id: 268,
    question:
      'Which information is most useful to consult before beginning to diagnose a fault on an unfamiliar installation?',
    options: [
      'The distribution board schedule and previous certificates or reports',
      'The manufacturer instructions for the consumer unit that is installed',
      'The wholesaler invoices showing which cables and accessories were used',
      'The building control completion notice issued when the work was done',
    ],
    correctAnswer: 0,
    explanation:
      'The schedule tells you what each way supplies and previous test results give you a baseline to compare today readings against, which is the fastest way to see what has changed. Manufacturer instructions are useful for the board itself but say nothing about how the circuits were run, so they cannot tell you which circuit to suspect or what a healthy reading looked like.',
    section: '4.5',
    difficulty: 'intermediate',
  },
  {
    id: 269,
    question:
      'A lighting circuit reads 0.35 MΩ from live conductors to earth at 500 V DC, with LED drivers and a dimmer still connected. What is the correct next step?',
    options: [
      'Record the value as a fail and rewire the whole lighting circuit',
      'Reduce the test voltage to 250 V DC and accept 0.5 MΩ as the limit',
      'Disconnect the electronic equipment and repeat the test on the wiring',
      'Accept the reading, since any value above 0.25 MΩ is satisfactory',
    ],
    correctAnswer: 2,
    explanation:
      'Electronic components contain filters and surge protection that conduct at 500 V DC, so they drag the reading down and can be damaged by the test; removing them isolates the fixed wiring, which must reach 1.0 MΩ. Dropping to 250 V is the plausible wrong move, but that voltage and its 0.5 MΩ limit belong to SELV and PELV circuits only and would not make a 230 V circuit compliant.',
    section: '4.6',
    difficulty: 'advanced',
  },
  {
    id: 270,
    question:
      'What should the first stage of a structured fault-finding procedure be?',
    options: [
      'Isolating the supply and testing insulation resistance to earth',
      'Gathering information from the user and the installation records',
      'Replacing the protective device that operated on the faulty circuit',
      'Measuring earth fault loop impedance at every accessory in turn',
    ],
    correctAnswer: 1,
    explanation:
      'Symptoms, recent changes and previous records narrow the search before a single instrument comes out, and often identify the fault type outright. Going straight to insulation resistance is the instinctive answer, but testing blind on an installation you have not scoped wastes time on healthy circuits and risks damaging connected equipment that nobody warned you about.',
    section: '4.2',
    difficulty: 'intermediate',
  },
  {
    id: 271,
    question:
      'During step 3 of a ring final circuit continuity test the line-to-cpc reading at one socket-outlet is roughly double the value seen at every other outlet. What does this indicate?',
    options: [
      'The line and neutral conductors have been crossed at the consumer unit',
      'The circuit protective conductor has a smaller cross-sectional area',
      'That socket is wired as a spur rather than being part of the ring',
      'The ring has an open circuit in the neutral conductor at that point',
    ],
    correctAnswer: 2,
    explanation:
      'On a correctly cross-connected ring every outlet on the ring reads substantially the same, because each is fed by two parallel paths; a spur is fed by one cable whose resistance adds in series, so it reads noticeably higher. A crossed connection is the tempting alternative, but it produces readings that rise progressively towards the mid point of the ring rather than one isolated high value.',
    section: '4.6',
    difficulty: 'advanced',
  },
  {
    id: 272,
    question:
      'Which statement best describes an open-circuit fault?',
    options: [
      'A conductor path of very low resistance between line and neutral',
      'A break in the conductor path so that no current can flow at all',
      'A connection that has loosened and now runs hot when under load',
      'A leakage path to earth through insulation that has broken down',
    ],
    correctAnswer: 1,
    explanation:
      'An open circuit is a complete break in the path, so the equipment is simply dead and the protective device does not operate. The loose connection option is close but describes a high-resistance fault, where current still flows and generates heat. The distinction matters because a dead circuit with a healthy breaker points to continuity testing, not to overload investigation.',
    section: '4.1',
    difficulty: 'basic',
  },
  {
    id: 273,
    question:
      'Line-to-neutral and line-to-earth fault current are both measured at the origin of a single-phase installation. Which value should be recorded as the prospective fault current?',
    options: [
      'The line to neutral value, because it is always the greater one',
      'The sum of the line to neutral and line to earth measurements',
      'The line to earth value, because earth faults are more common',
      'The greater of the line to neutral and line to earth readings',
    ],
    correctAnswer: 3,
    explanation:
      'Both prospective short-circuit current and prospective earth fault current must be determined, and the higher figure is the one the switchgear breaking capacity has to cope with. Assuming line to neutral is always greater is the usual mistake: on a PME supply the earth path can be very low impedance, so the line to earth value sometimes wins and must be checked rather than assumed.',
    section: '4.3',
    difficulty: 'advanced',
  },
  {
    id: 274,
    question:
      'Who should retain the key to a lock-off device fitted to an isolator during fault rectification?',
    options: [
      'The person carrying out the work on the isolated circuit',
      'The site supervisor, who holds all keys in a central box',
      'The client representative responsible for the building',
      'The electrician who originally installed the switchgear',
    ],
    correctAnswer: 0,
    explanation:
      'The individual exposed to the risk keeps the only key, so nobody can re-energise the circuit while they are working on it. Handing keys to a supervisor sounds tidy and is common on managed sites, but a central key box means someone remote from the work can restore the supply without knowing you still have your hands inside the enclosure.',
    section: '4.4',
    difficulty: 'intermediate',
  },
  {
    id: 275,
    question:
      'A reported fault has been repaired, but a second unrelated defect has come to light that cannot be corrected on this visit. What should the electrician do?',
    options: [
      'Restore the supply, and mention the defect at the next site visit',
      'Make the defect safe, report it in writing and agree the action',
      'Leave the whole installation isolated, until the client makes contact',
      'Correct the defect anyway, as any resulting risk falls to the client',
    ],
    correctAnswer: 1,
    explanation:
      'Any danger found must be made safe at once and communicated to the person ordering the work in a form that can be evidenced, then the remedial work agreed. Verbally noting it for next time is the attractive answer because it seems proportionate, but it leaves a known danger live with no record that the duty holder was ever told about it.',
    section: '4.7',
    difficulty: 'basic',
  },
  {
    id: 276,
    question:
      'An RCD trips at unpredictable intervals, sometimes days apart, and every test carried out at the board is satisfactory. What is the most effective diagnostic approach?',
    options: [
      'Replace the RCD, since intermittent tripping means a faulty device',
      'Raise the device rating to 100 mA so that the nuisance tripping stops',
      'Connect a data logger to record leakage and correlate it with events',
      'Split the load across two devices and wait to see which one operates',
    ],
    correctAnswer: 2,
    explanation:
      'An intermittent fault by definition is absent when you test, so the answer is to capture the condition when it happens rather than to keep testing a healthy installation. Splitting the load is a genuine technique and is the strongest distractor, but it only halves the search area per occurrence and could take weeks, whereas logging records the magnitude and timing of the leakage on the first event.',
    section: '4.2',
    difficulty: 'advanced',
  },
  {
    id: 277,
    question:
      'A circuit-breaker supplying a workshop trips when a machine is started but never while it is running. What is the most likely explanation?',
    options: [
      'The breaker type is too sensitive for the motor starting current',
      'The motor windings have an insulation fault to the metal frame',
      'The supply earth fault loop impedance at the board is too high',
      'The circuit conductors are undersized for the connected load',
    ],
    correctAnswer: 0,
    explanation:
      'A motor draws a large inrush for a fraction of a second, and a Type B device operating magnetically between three and five times its rating can see that as a short circuit; a Type C is normally the correct selection. An insulation fault is the plausible alternative, but a winding fault to the frame would trip the protection under running conditions as well, and would show as a poor insulation resistance reading.',
    section: '4.6',
    difficulty: 'advanced',
  },
  {
    id: 278,
    question:
      'Which instrument allows standing earth leakage current to be measured on a circuit that must remain energised?',
    options: [
      'A low-resistance ohmmeter used across the protective conductor',
      'An insulation resistance tester set to its 500 V DC test range',
      'A loop impedance tester used in its no-trip low-current range',
      'A clamp meter placed around the line and neutral conductors',
    ],
    correctAnswer: 3,
    explanation:
      'Clamping line and neutral together measures the out-of-balance current, which is exactly the leakage returning by another route, and it is done without breaking into the circuit. The insulation resistance tester is the instinctive answer for leakage, but it requires the circuit to be dead and disconnected, so it cannot show what is leaking while the equipment is actually running.',
    section: '4.3',
    difficulty: 'intermediate',
  },
  {
    id: 279,
    question:
      'A faulty section of an existing socket-outlet circuit has been replaced, with no new circuit added. Which document should be issued?',
    options: [
      'An Electrical Installation Certificate covering the whole board',
      'A Minor Electrical Installation Works Certificate for the repair',
      'An Electrical Installation Condition Report with observations',
      'A written quotation listing the parts and the labour supplied',
    ],
    correctAnswer: 1,
    explanation:
      'Alteration or repair of an existing circuit that does not involve a new circuit is certified by a Minor Works Certificate, which records the tests carried out on the circuit affected. An Electrical Installation Certificate is the tempting choice because the work was substantial, but that document is reserved for new installations, additions and new circuits.',
    section: '4.5',
    difficulty: 'intermediate',
  },
  {
    id: 280,
    question:
      'What is the essential difference between an earth fault and a short circuit?',
    options: [
      'An earth fault always draws a much larger current than a short',
      'An earth fault occurs only in TT systems, a short circuit in TN',
      'An earth fault is between a live conductor and earth or a cpc',
      'An earth fault is cleared by an RCD and never by a fuse or breaker',
    ],
    correctAnswer: 2,
    explanation:
      'A short circuit is between live conductors, whereas an earth fault is between a live conductor and earth, exposed-conductive-parts or the cpc. The RCD option is the attractive wrong answer: an earth fault of low enough impedance is cleared by the overcurrent device through automatic disconnection of supply, and the RCD is an additional measure, not the only means.',
    section: '4.1',
    difficulty: 'intermediate',
  },
  {
    id: 281,
    question:
      'What does operating the integral test button on an RCD actually prove?',
    options: [
      'That the residual current setting is within its stated tolerance',
      'That the mechanical tripping mechanism of the device still works',
      'That the earth fault loop impedance is low enough for the circuit',
      'That the protective conductor of the circuit is properly connected',
    ],
    correctAnswer: 1,
    explanation:
      'The button applies an internal out-of-balance current through a resistor, which exercises the trip mechanism only. Assuming it verifies the sensitivity is the common error: the button does not measure operating time or current, so a device that trips on the button can still fail an instrument test at IΔn, and it tells you nothing at all about the earthing arrangement of the circuit.',
    section: '4.3',
    difficulty: 'intermediate',
  },
  {
    id: 282,
    question:
      'On a PME supply with a 25 mm² PEN conductor, the main protective bonding to the gas service is found to be 6 mm². How should this be judged?',
    options: [
      'It is adequate; 6 mm² is the accepted minimum for a gas service',
      'It is adequate; its continuity to the earthing terminal has been proven',
      'It is undersized; 16 mm² is required wherever PME conditions apply here',
      'It is undersized; 10 mm² is the minimum required by Table 54.8 here',
    ],
    correctAnswer: 3,
    explanation:
      'Table 54.8 requires a minimum of 10 mm² copper equivalent where the supply PEN conductor is 35 mm² or less, so 6 mm² is undersized and would normally attract a C2 on a report. Proving continuity is the seductive answer, because the bonding does test as connected, but a conductor that is continuous can still be too small to carry the diverted neutral current that a broken PEN can impose.',
    section: '4.6',
    difficulty: 'advanced',
  },
  {
    id: 283,
    question:
      'Why are continuity and insulation resistance tests carried out before a repaired circuit is energised for loop impedance testing?',
    options: [
      'They find faults that would be dangerous once the supply is restored',
      'They give more repeatable results than tests done on a live circuit',
      'They are the only tests that BS 7671 requires to be done when dead',
      'They allow the protective device rating to be selected for the load',
    ],
    correctAnswer: 0,
    explanation:
      'The dead tests are done first precisely so that a missing cpc, a transposed conductor or damaged insulation is found while the circuit still cannot hurt anybody. Repeatability is a genuine benefit and makes a believable distractor, but it is a side effect; the reason the sequence is ordered this way is safety, not measurement quality.',
    section: '4.2',
    difficulty: 'basic',
  },
  {
    id: 284,
    question:
      'Which device should be used to confirm that a conductor is dead before work begins?',
    options: [
      'A digital multimeter set to its alternating voltage range',
      'A non-contact voltage detector held against the insulation',
      'An approved voltage indicator checked on a proving unit',
      'A neon screwdriver touched onto the exposed conductor end',
    ],
    correctAnswer: 2,
    explanation:
      'Only a two-pole approved voltage indicator to GS38, proved on a known source before and after use, is acceptable for a test for dead. A multimeter is the strongest distractor because it reads volts accurately, but it can be left on the wrong range, its display can fail silently and its leads are rarely fused to GS38, any of which turns a live conductor into a blank reading.',
    section: '4.4',
    difficulty: 'basic',
  },
  {
    id: 285,
    question:
      'A 30 mA RCD holds in when the circuit is energised but trips the instant any load is switched on. Insulation resistance from line to earth is well above 1 MΩ. What is the most likely fault?',
    options: [
      'A neutral to earth fault downstream of the residual current device',
      'A line to earth fault in the flexible cord of the connected appliance',
      'An open-circuit protective conductor serving the socket-outlet used',
      'A reversed line and neutral connection at the socket-outlet in use',
    ],
    correctAnswer: 0,
    explanation:
      'A neutral to earth fault carries no current until load current is flowing, at which point part of the return diverts through earth and unbalances the device, which is exactly the on-load pattern described. A line to earth fault is the obvious guess, but it would trip the RCD the moment the circuit was energised and would have shown as a low line to earth insulation reading.',
    section: '4.6',
    difficulty: 'advanced',
  },
  {
    id: 286,
    question:
      'After repairing a broken conductor in a ring final circuit, which test most directly confirms that the ring has been correctly restored?',
    options: [
      'An insulation resistance test between all live conductors and earth',
      'An earth fault loop impedance measurement at the nearest socket-outlet',
      'The three-step ring continuity test carried out at the consumer unit',
      'A functional check of the residual current device protecting the ring',
    ],
    correctAnswer: 2,
    explanation:
      'Only the three-step method proves both legs are continuous and correctly cross-connected, which is what a repair can most easily get wrong. A loop impedance reading at one socket is the plausible alternative, but a ring broken in one leg still gives an acceptable Zs at many outlets because the remaining leg feeds them, so the defect passes unnoticed.',
    section: '4.7',
    difficulty: 'intermediate',
  },
  {
    id: 287,
    question:
      'Zs measured at a socket-outlet is 0.85 Ω, while Ze is 0.35 Ω and R1+R2 for that circuit measures 0.22 Ω. What does the discrepancy suggest?',
    options: [
      'The readings agree, once the conductor operating temperature is added',
      'There is additional resistance in the earth path, such as a poor joint',
      'The loop tester has been used on the wrong range, giving a high reading',
      'The Ze figure was taken with the main bonding still connected, raising it',
    ],
    correctAnswer: 1,
    explanation:
      'Zs should be close to Ze plus R1+R2, here about 0.57 Ω, so an extra 0.28 Ω means resistance somewhere in the loop that the dead tests did not see, typically a poor terminal in the earth path. The bonding option is the sophisticated trap: leaving bonding connected creates parallel paths that make Ze read lower, so it would push the measured Zs down rather than up.',
    section: '4.3',
    difficulty: 'advanced',
  },
  {
    id: 288,
    question:
      'Which description best fits a transient or intermittent fault?',
    options: [
      'A fault present at all times but too small to operate the device',
      'A fault that appears only when the circuit is completely isolated',
      'A fault that grows steadily worse until the conductor burns out',
      'A fault that appears under particular conditions and then clears',
    ],
    correctAnswer: 3,
    explanation:
      'An intermittent fault is present only when some condition is met, such as heat, vibration, damp or a particular load, and disappears again afterwards. The first option describes a standing leakage, which is constant and measurable at any time; the difference matters because a standing fault can be found with routine tests while an intermittent one has to be reproduced or logged.',
    section: '4.1',
    difficulty: 'intermediate',
  },
  {
    id: 289,
    question:
      'What is the main purpose of the Schedule of Test Results attached to a report?',
    options: [
      'It records the measured values so future results can be compared',
      'It lists the materials used so that the client can be invoiced later',
      'It records the names of everyone who worked on the installation',
      'It sets out the maintenance intervals for each item of equipment',
    ],
    correctAnswer: 0,
    explanation:
      'Recorded continuity, insulation resistance, Zs and RCD figures give the next person a baseline, and deterioration is only visible when today reading can be set against the last one. Listing materials is a believable answer because schedules do describe circuit details such as conductor sizes, but the reason the document exists is evidence of test results, not procurement.',
    section: '4.5',
    difficulty: 'intermediate',
  },
  {
    id: 290,
    question:
      'An entire installation is dead. The main switch is on, and no voltage is present on either side of it. Where should the electrician look next?',
    options: [
      'At each final circuit breaker in turn, working along the busbar',
      'At the residual current device, which protects the socket circuits',
      'At the supply side, meter tails and the distributor cut-out fuse',
      'At the earthing conductor, between the board and the earth block',
    ],
    correctAnswer: 2,
    explanation:
      'No voltage on the incoming side of the main switch places the fault upstream of the consumer unit, so the tails, meter and service head are the next things to check, and a failed cut-out fuse is reported to the distributor rather than removed. Working through the breakers is the instinctive answer, but nothing downstream can explain an absence of supply on the incoming terminals.',
    section: '4.2',
    difficulty: 'advanced',
  },
  {
    id: 291,
    question:
      'Under what circumstances may diagnostic testing be carried out on a live circuit?',
    options: [
      'Whenever isolation would inconvenience the occupier of the building',
      'Whenever the operative holds a recognised electrical qualification',
      'Where it is unreasonable to work dead and precautions are in place',
      'Where the circuit is protected by a 30 mA residual current device',
    ],
    correctAnswer: 2,
    explanation:
      'Live working is permitted only where it is unreasonable in all the circumstances for the conductor to be dead, it is reasonable to work live, and suitable precautions such as barriers, GS38 equipment and supervision are provided. Holding a qualification is the tempting answer because competence is one of the conditions, but competence alone never makes live working lawful; the justification test has to be satisfied first.',
    section: '4.4',
    difficulty: 'basic',
  },
  {
    id: 292,
    question:
      'An AFDD repeatedly operates on a lighting circuit while the RCD and the circuit-breaker never trip. What condition is it most likely responding to?',
    options: [
      'A series arc at a damaged or loose connection within the circuit',
      'A sustained overload caused by too many luminaires on the circuit',
      'A standing earth leakage current from the LED drivers installed',
      'A short circuit between the line and neutral conductors in a joint',
    ],
    correctAnswer: 0,
    explanation:
      'A series arc at a loose terminal or a nicked conductor draws no more than load current and produces no residual current, so it is invisible to both the breaker and the RCD; detecting exactly that signature is what an AFDD is for. Earth leakage is the plausible alternative, but leakage is what the RCD monitors, and it would have operated first.',
    section: '4.6',
    difficulty: 'advanced',
  },
  {
    id: 293,
    question:
      'Why must the resistance of the test leads be nulled before continuity measurements are taken?',
    options: [
      'Because the instrument cannot resolve values below one tenth of an ohm',
      'Because lead resistance would otherwise be added to every reading taken',
      'Because the instrument battery voltage falls as the leads are used',
      'Because BS 7671 requires all instruments to be zeroed once each year',
    ],
    correctAnswer: 1,
    explanation:
      'A long wander lead can easily add several tenths of an ohm, which is large compared with the R1+R2 of a short circuit and would make a healthy circuit look defective. Resolution is a believable answer, since instruments to BS EN IEC 61557-4 resolve to 0.01 Ω, but that capability is precisely why an un-nulled lead shows up as a real and misleading error.',
    section: '4.3',
    difficulty: 'intermediate',
  },
  {
    id: 294,
    question:
      'What should be done immediately after a fault has been rectified and the circuit retested?',
    options: [
      'Leave the circuit isolated until the next periodic inspection is due',
      'Restore the supply and move on without informing anyone on the site',
      'Complete the paperwork first and restore the supply at a later visit',
      'Restore the supply and confirm the equipment functions as it should',
    ],
    correctAnswer: 3,
    explanation:
      'The job is not finished until the circuit is back in service and seen to work, because a functional check catches anything the instrument tests cannot, such as a switch controlling the wrong luminaire. Restoring the supply and leaving quietly is the attractive shortcut, but the user has no way of knowing the circuit is safe to use unless it is handed back deliberately.',
    section: '4.7',
    difficulty: 'basic',
  },
  {
    id: 295,
    question:
      'After a supply alteration, equipment on one phase of a three-phase board runs abnormally hot while equipment on another runs dim. What single fault best explains this?',
    options: [
      'One line conductor has become open circuit at the supply intake',
      'The neutral connection has become open circuit at the supply intake',
      'The main earthing conductor has been left off the earthing terminal',
      'The phase rotation has been reversed during the supply alteration work',
    ],
    correctAnswer: 1,
    explanation:
      'With the neutral lost, the star point floats according to how the phases are loaded, so lightly loaded phases rise above 230 V and heavily loaded phases fall below it, producing overheating and dimming at the same time. A lost line conductor is the obvious guess, but it would leave one phase completely dead rather than raising the voltage on another.',
    section: '4.2',
    difficulty: 'advanced',
  },
  {
    id: 296,
    question:
      'Why can a residual current device not provide protection against an open PEN conductor on a PME supply?',
    options: [
      'Because the fault current is too small; the device cannot detect it',
      'Because the device sees only downstream faults; the PEN break is downstream',
      'Because no imbalance arises; the danger is a rise in earth potential',
      'Because the bonding conductors bypass it; the current avoids the device',
    ],
    correctAnswer: 2,
    explanation:
      'A broken PEN forces load current to return through the earthing system, but line and neutral inside the installation stay balanced, so an RCD sees nothing while every earthed part rises towards line potential. The downstream argument is the strongest distractor and is partly true, yet even an RCD placed at the origin would still not trip, because the mechanism is a potential rise rather than a residual current.',
    section: '4.6',
    difficulty: 'advanced',
  },
  {
    id: 297,
    question:
      'Who should be informed when a dangerous condition is found during fault diagnosis?',
    options: [
      'The person ordering the work, in writing, without delay',
      'The manufacturer of the equipment, in writing, without delay',
      'The next electrician to attend the site, in writing, at that visit',
      'The local authority building control department, in writing',
    ],
    correctAnswer: 0,
    explanation:
      'The duty holder or person ordering the work is the one who can authorise remedial action and control access, so they must be told at once and the danger recorded in writing. Notifying building control is the plausible alternative, but that route concerns notifiable installation work under the Building Regulations and does nothing to remove an immediate danger today.',
    section: '4.5',
    difficulty: 'basic',
  },
  {
    id: 298,
    question:
      'Which method of proving continuity of a circuit protective conductor also yields the R1+R2 value needed to verify Zs?',
    options: [
      'A wander lead run from the earthing terminal to each accessory',
      'Linking line and cpc at the board and testing at each accessory',
      'Measuring between the cpc and an adjacent metallic water service',
      'Testing between the neutral bar and the cpc at every accessory',
    ],
    correctAnswer: 1,
    explanation:
      'Linking line and cpc at the origin puts both conductors in series, so the reading at the far accessory is R1+R2 directly and can be added to Ze to predict Zs. The wander lead method is a valid continuity check and is therefore a strong distractor, but it measures the cpc alone, so it proves connection without giving the combined figure the loop calculation needs.',
    section: '4.3',
    difficulty: 'intermediate',
  },
  {
    id: 299,
    question:
      'A circuit-breaker in a consumer unit has failed and must be replaced. What governs which replacement device may be fitted?',
    options: [
      'Any device of the same rating and type will fit and may be used',
      'Any device carrying a CE or UKCA mark may be fitted to the board',
      'The board manufacturer stated compatibility for that assembly',
      'The preference of the client who is paying for the replacement',
    ],
    correctAnswer: 2,
    explanation:
      'A consumer unit is type-tested as a complete assembly, so only devices the manufacturer declares compatible preserve the verified short-circuit performance and the enclosure fire rating. Matching the rating and type is the attractive answer because the device will physically clip on and appear to work, but a mismatched busbar contact or untested combination invalidates the assembly.',
    section: '4.7',
    difficulty: 'intermediate',
  },
  {
    id: 300,
    question:
      'One luminaire on a circuit flickers and dims while the others on the same circuit remain steady. Where should the electrician look first?',
    options: [
      'At the circuit-breaker supplying the whole of the lighting circuit',
      'At the earth fault loop impedance measured at the distribution board',
      'At the insulation resistance of the complete lighting circuit wiring',
      'At the connections in that luminaire and its associated switch drop',
    ],
    correctAnswer: 3,
    explanation:
      'A symptom confined to one point on a circuit must be caused by something unique to that point, so the local terminations and the lamp itself are where to start. Testing the whole circuit for insulation resistance is the thorough-sounding answer, but a fault serious enough to show in that test would affect every outlet fed from the same conductors, not one luminaire on its own.',
    section: '4.6',
    difficulty: 'basic',
  },
  {
    id: 301,
    question: 'Why does fault diagnosis carry a greater risk of electric shock than installing new wiring?',
    options: [
      'Enclosures are opened while the supply is still energised',
      'Diagnosis instruments generate higher voltages than the mains',
      'Existing cables carry larger currents than new ones',
      'Fault currents flow continuously until the circuit has been repaired',
    ],
    correctAnswer: 0,
    explanation: 'New wiring is normally worked on dead from the outset. Diagnosis often begins with the installation live, because symptoms only appear when it is energised, so covers come off close to live parts. The tempting answer about instruments is wrong: test instruments are designed to be the safe part of the job, and an insulation tester\'s 500 V DC output is current-limited, not the hazard.',
    section: '4.4',
    difficulty: 'basic',
  },
  {
    id: 302,
    question: 'A control panel containing a capacitor bank has been isolated and locked off. What is the principal remaining electrical danger?',
    options: [
      'The isolator contacts may weld closed and re-energise it',
      'Stored charge in the capacitors can still deliver a shock',
      'The panel earth may rise above the mass of Earth',
      'Induced voltage from nearby panels raises the busbar',
    ],
    correctAnswer: 1,
    explanation: 'A charged capacitor holds energy after the supply is removed and will discharge through anyone who bridges its terminals, which is why the test for dead must be made at the capacitor terminals and a discharge path applied. Welded contacts are a reason to prove dead downstream, but locking off a welded isolator does not by itself store energy, so it is not the danger that remains after correct isolation.',
    section: '4.4',
    difficulty: 'intermediate',
  },
  {
    id: 303,
    question: 'A long steel wire armoured cable, isolated and proved dead at both ends, still shows an indication on a voltage indicator when retested. What is the most likely explanation?',
    options: [
      'A flat indicator battery giving a false voltage display',
      'Armour resistance too high to drain the cores',
      'Capacitive coupling from live cables running alongside it',
      'Residual charge retained in the core insulation after isolation',
    ],
    correctAnswer: 2,
    explanation: 'A long cable run parallel to energised cables behaves as one plate of a capacitor, and a high impedance indicator will register the coupled voltage even though the conductor is genuinely isolated. The reading collapses under load, which is why a low impedance indicator is specified for the test for dead. A flat battery cannot be the cause because a failed indicator shows nothing at all, which is exactly what proving before and after is designed to catch.',
    section: '4.4',
    difficulty: 'advanced',
  },
  {
    id: 304,
    question: 'During diagnosis on a three-phase board, one circuit is isolated at its own device while the board stays live. What danger does this create that isolating the whole board would not?',
    options: [
      'Arc flash energy rising as the load current is reduced further',
      'Loss of the main earthing connection to that circuit',
      'Backfeed from the isolated circuit into the board\'s live busbar',
      'Live busbars and terminals adjacent to the working position',
    ],
    correctAnswer: 3,
    explanation: 'The circuit conductors are dead, but the board\'s busbar, incoming terminals and every other outgoing device stay live within arm\'s reach, so a slipped tool or probe causes a phase to phase fault at full prospective current. Backfeed is the wrong way round here: the isolated circuit has no source, so it cannot feed the busbar.',
    section: '4.4',
    difficulty: 'basic',
  },
  {
    id: 305,
    question: 'Diagnosis on a commercial kitchen circuit will need the supply off for several hours. What should the electrician do about this?',
    options: [
      'Agree the outage window with the client before starting',
      'Ask the client to sign a disclaimer for lost trade',
      'Complete the work and explain the outage after',
      'Reduce the outage by testing the circuit while live',
    ],
    correctAnswer: 0,
    explanation: 'The client is the only person who knows when losing the kitchen costs least, so the outage is agreed in advance and the work planned around it. Working live to shorten the outage inverts the priority: commercial convenience is never a justification for live working, which requires the work to be unreasonable to do dead.',
    section: '4.5',
    difficulty: 'basic',
  },
  {
    id: 306,
    question: 'Diagnosis shows the reported fault is caused by a defect outside the scope of the agreed order. What is the correct action?',
    options: [
      'Carry out the extra work and invoice the client on completion',
      'Report the finding and agree the extra work with the client',
      'Repair only the reported symptom and close the job',
      'Record it on the certificate and take no further action',
    ],
    correctAnswer: 1,
    explanation: 'The client authorises the work and pays for it, so a defect outside the order is reported and agreed before any further labour is spent. Repairing the symptom alone is the tempting choice because it honours the order, but it leaves the cause in place and the fault will return, which is the failure this criterion is aimed at.',
    section: '4.5',
    difficulty: 'basic',
  },
  {
    id: 307,
    question: 'A landlord is told the socket circuits have no RCD protection and that remedial work is recommended. What is the electrician\'s obligation on cost?',
    options: [
      'Complete the remedial work first, then price it fairly',
      'Quote for parts only, since labour cannot be fixed',
      'Give a clear estimate before any additional work begins',
      'Defer all of the pricing to the client\'s insurance company',
    ],
    correctAnswer: 2,
    explanation: 'A recommendation the client has not asked for becomes a decision only once its cost is known, so the estimate comes before the work. Pricing afterwards, however fairly, removes the client\'s ability to decline, defer, or seek another quotation.',
    section: '4.5',
    difficulty: 'intermediate',
  },
  {
    id: 308,
    question: 'Diagnosis in a data centre finds a defect that can only be corrected by shutting down a live server rack. What should the electrician establish first?',
    options: [
      'The replacement cost of the equipment that would be shut down',
      'Whether the client will accept a written disclaimer',
      'Whether the rack can be worked on without isolating the supply',
      'The client\'s tolerance for downtime and any standby supply',
    ],
    correctAnswer: 3,
    explanation: 'The consequence of the outage falls on the client\'s operation, so the shutdown window and any alternative supply are established with them before work is planned. Asking whether the rack can be worked on live is the wrong first question: the availability of a standby supply usually removes the need to consider live working at all.',
    section: '4.5',
    difficulty: 'intermediate',
  },
  {
    id: 309,
    question: 'A tenant reports repeated RCD tripping. Diagnosis finds a deteriorating buried cable that will fail within months. The tenant wants only the device reset today. What should the electrician do?',
    options: [
      'Explain the risk in writing and recommend prompt repair',
      'Replace the RCD with a less sensitive device in the meantime',
      'Refuse to reset it and leave the whole circuit disconnected',
      'Reset the device and record the finding on the day\'s job sheet',
    ],
    correctAnswer: 0,
    explanation: 'The RCD is doing its job, so the installation is not in immediate danger and there is no basis for leaving the tenant without supply. What the tenant cannot do is make an informed decision without knowing the finding, so it goes in writing, to them and to whoever is responsible for the property. Fitting a less sensitive device is the classic wrong repair: it hides the symptom by removing the protection.',
    section: '4.5',
    difficulty: 'basic',
  },
  {
    id: 310,
    question: 'What must be done to a circuit before an insulation resistance test is carried out on it?',
    options: [
      'Measure its earth fault loop impedance at the origin',
      'Isolate it and disconnect current-using equipment',
      'Energise it briefly to confirm supply is present',
      'Link line and neutral together at the far end',
    ],
    correctAnswer: 1,
    explanation: 'The test applies a DC voltage to the wiring, so the circuit must be dead and the connected equipment removed, otherwise the instrument reads the equipment\'s internal paths rather than the cable insulation and the equipment may be damaged. Linking line and neutral is part of a specific variation of the test, not a precaution taken before it.',
    section: '4.3',
    difficulty: 'basic',
  },
  {
    id: 311,
    question: 'An insulation resistance test at 500 V DC is about to be applied to a circuit containing a surge protective device and electronic dimmers. What precaution is required?',
    options: [
      'Link all conductors to earth and test at 1000 V DC',
      'Reduce the test voltage to 250 V DC throughout',
      'Disconnect the devices the test could damage or distort',
      'Leave them connected so the result reflects the real circuit',
    ],
    correctAnswer: 2,
    explanation: 'Equipment likely to influence the measurement or be damaged by it is disconnected first. An SPD conducts to earth well below 500 V, so leaving it in gives a low reading that looks like failed insulation, and electronic dimmers can be destroyed outright. Leaving them connected is tempting because it appears more realistic, but it is exactly the mistake that produces a false fault diagnosis.',
    section: '4.3',
    difficulty: 'intermediate',
  },
  {
    id: 312,
    question: 'Why is a proving unit preferred over a nearby socket-outlet for proving a voltage indicator on site?',
    options: [
      'It applies a higher voltage than any socket-outlet can supply',
      'It removes the need to prove the indicator afterwards',
      'It confirms the indicator\'s calibration is still valid',
      'It gives a known output regardless of the supply condition',
    ],
    correctAnswer: 3,
    explanation: 'A socket only proves the indicator if the socket is live, and on a fault call that is precisely what cannot be assumed, so a dead socket and a dead indicator give the same reassuring nothing. The proving unit carries its own source. Nothing removes the need to prove the indicator again after the test for dead, because the indicator can fail during the test itself.',
    section: '4.4',
    difficulty: 'intermediate',
  },
  {
    id: 313,
    question: 'An intermittent fault is being traced on a circuit that must be re-energised repeatedly between tests. Which precaution most reduces the risk to others in the building?',
    options: [
      'Control access to the area and warn occupants each time',
      'Work alone so that no other person can be exposed to the risk',
      'Remove the protective device cover for quicker access between tests',
      'Leave the circuit permanently energised to avoid the switching',
    ],
    correctAnswer: 0,
    explanation: 'The hazard of repeated re-energising is that someone else touches the circuit or its equipment during a live period, so the control is over access and information, not over the switching itself. Working alone is the opposite of a precaution here: it removes the person who would raise the alarm, and lone working on live equipment is what risk assessments are written to prevent.',
    section: '4.4',
    difficulty: 'basic',
  },
  {
    id: 314,
    question: 'A loop impedance test is needed on an RCD-protected circuit, and the RCD must not operate. What is the correct precaution?',
    options: [
      'Test between line and neutral and record the value as Zs',
      'Select the instrument\'s low-current no-trip loop test range',
      'Disconnect the circuit protective conductor at the distribution board',
      'Link out the RCD\'s residual coil for the duration of the test',
    ],
    correctAnswer: 1,
    explanation: 'The no-trip range injects a residual current below the RCD\'s threshold and derives the impedance from it, which is the whole reason the range exists. Testing line to neutral is the classic substitute and it is wrong: it measures a completely different loop that does not include the protective conductor or the return path through earth, so the figure cannot be compared with a maximum Zs at all.',
    section: '4.3',
    difficulty: 'intermediate',
  },
  {
    id: 315,
    question: 'A 32 A Type B circuit-breaker has failed in a consumer unit. What primarily governs which replacement device may be fitted?',
    options: [
      'The rating of the tails feeding the consumer unit',
      'Any device of the same rating that fits the busbar',
      'The consumer unit manufacturer\'s stated compatible range',
      'The device stocked by the nearest wholesale supplier',
    ],
    correctAnswer: 2,
    explanation: 'A consumer unit is assessed and certified as an assembly, so only the devices the manufacturer declares compatible may be fitted; mixing brands voids that assessment even where the parts physically fit. Fitting on busbar pitch alone is the common shortcut and is exactly what this rule prohibits.',
    section: '4.7',
    difficulty: 'basic',
  },
  {
    id: 316,
    question: 'A damaged accessory in a walk-in freezer must be replaced. Which factor most affects the choice of replacement?',
    options: [
      'The number of terminals inside the back box',
      'The colour and finish matching the existing accessories',
      'The purchase cost compared with the original fitting price',
      'The IP rating and temperature range of the accessory',
    ],
    correctAnswer: 3,
    explanation: 'The external influences at the point of installation decide what may be fitted, and a freezer combines low temperature with condensation on every defrost cycle, so ingress protection and the rated temperature range govern the selection. Terminal count matters for making the connections but does not determine whether the accessory survives the environment.',
    section: '4.7',
    difficulty: 'intermediate',
  },
  {
    id: 317,
    question: 'A cable is found chafed where it passes through a metal partition. Besides restoring the conductors, what must the repair address?',
    options: [
      'The absence of protection at the point of penetration',
      'The current-carrying capacity of the replacement cable run',
      'The colour identification of each of the repaired conductors',
      'The distance between the metal partition and the nearest joint',
    ],
    correctAnswer: 0,
    explanation: 'The chafing is the symptom; the missing grommet or bush at the metal edge is the cause, and replacing the cable without fitting protection guarantees the same fault returns. Current-carrying capacity is not implicated because nothing in the scenario suggests the cable was overloaded, only that it was cut by an edge.',
    section: '4.7',
    difficulty: 'intermediate',
  },
  {
    id: 318,
    question: 'A faulty luminaire is no longer manufactured. The nearest equivalent draws slightly more current and has different fixing centres. What most influences the decision to fit it?',
    options: [
      'Whether the replacement carries the same warranty period',
      'Whether the circuit design and the fixings remain suitable',
      'Whether the wholesaler can supply it on the same working day',
      'Whether the client would accept a noticeably different finish',
    ],
    correctAnswer: 1,
    explanation: 'A like-for-like swap needs no re-assessment, but this one is not like for like: the higher current has to be checked against the circuit\'s design current and protective device, and the new fixing centres against the ceiling structure. Finish and delivery are commercial questions the client can decide; only the electrical and mechanical suitability is the electrician\'s to determine.',
    section: '4.7',
    difficulty: 'basic',
  },
  {
    id: 319,
    question: 'A high-resistance joint is found in a junction box buried above a plastered ceiling. Which factor most favours replacing the cable run over remaking the joint?',
    options: [
      'The existing cable colours no longer match present-day practice',
      'A new cable would give a lower Ze at the installation origin',
      'The joint would remain inaccessible for future inspection',
      'Remaking the joint takes longer than pulling in a new cable',
    ],
    correctAnswer: 2,
    explanation: 'Joints must remain accessible for inspection unless they are of a type specifically permitted to be buried, and a conventional junction box above a plastered ceiling is not. The Ze answer is a genuine misconception worth naming: Ze is the impedance external to the installation, so replacing a final circuit cable cannot change it at all.',
    section: '4.7',
    difficulty: 'advanced',
  },
  {
    id: 320,
    question: 'Fluorescent tubes removed during a lighting repair must be dealt with in which way?',
    options: [
      'Returned to the wholesaler in its packaging',
      'Left with the client to dispose of at their convenience',
      'Broken down and placed in the site waste skip',
      'Segregated and taken to a licensed disposal facility',
    ],
    correctAnswer: 3,
    explanation: 'Fluorescent tubes contain mercury and phosphor, which makes them hazardous waste that must be kept separate and routed to a licensed facility. Breaking them releases the mercury and is the worst of the options offered, not a way of reducing volume.',
    section: '4.7',
    difficulty: 'basic',
  },
  {
    id: 321,
    question: 'Floorboards were lifted to trace a cable fault. What should be done with them once the repair is complete?',
    options: [
      'Refix them securely and check no cable is trapped',
      'Leave one board loose to allow future access to the joint',
      'Rest them back in place for the client to screw down',
      'Replace them with new boards after the repair',
    ],
    correctAnswer: 0,
    explanation: 'The area is left safe as well as tidy, which means the boards are fixed back down and the cables checked clear of the fixings before the nails or screws go in. Leaving a board loose for future access sounds helpful but creates a trip hazard and does not make a buried joint compliant.',
    section: '4.7',
    difficulty: 'basic',
  },
  {
    id: 322,
    question: 'A repair has produced cable offcuts, a damaged plastic accessory and packaging. What is the correct approach to this waste?',
    options: [
      'Place all of it in one bag and leave it with the client',
      'Separate the recyclable materials and record the transfer',
      'Burn the packaging and recycle only the copper',
      'Return every item to the employer\'s yard for storage',
    ],
    correctAnswer: 1,
    explanation: 'Waste is segregated by stream so recyclable copper and plastics are recovered, and the transfer is documented so the duty of care is discharged. Leaving it with the client is the common shortcut and simply passes on a duty that belongs to whoever produced the waste.',
    section: '4.7',
    difficulty: 'intermediate',
  },
  {
    id: 323,
    question: 'A wall has been chased to replace a damaged cable, creating dust and debris. Before leaving, the electrician should:',
    options: [
      'cover the debris and ask the client to remove it',
      'sweep the debris into the void beneath the floorboards',
      'clear the debris and make good the chased surface',
      'leave the chase open until a plasterer attends',
    ],
    correctAnswer: 2,
    explanation: 'The work area is handed back clean and safe, so the debris is removed and the chase filled. Sweeping it into the floor void is worse than leaving it in the room: it is invisible, it can obstruct cables and it will be found by someone else years later.',
    section: '4.7',
    difficulty: 'intermediate',
  },
  {
    id: 324,
    question: 'During a repair a length of cable insulation is suspected of containing a hazardous material. What is the correct course of action?',
    options: [
      'Continue working, noting the concern on the completion form',
      'Damp the cable down, then cut it out using hand tools',
      'Bag the cable, and place it in the general waste',
      'Stop work, contain the area and seek specialist advice',
    ],
    correctAnswer: 3,
    explanation: 'Suspicion is enough to stop: the material is identified by someone competent to do so before any further disturbance, because cutting or damping releases fibres or dust that cannot be recalled. Using hand tools and water is a genuine control for some materials, but it is a control applied by a licensed contractor after identification, not a reason to carry on.',
    section: '4.7',
    difficulty: 'basic',
  },
  {
    id: 325,
    question: 'At which point in the safe isolation procedure is the caution notice applied?',
    options: [
      'After locking off, before testing the circuit for dead',
      'When the work is finished, as the lock is being taken off',
      'After proving dead, at every test point on the circuit',
      'Before switching off, while the circuit-breaker is still on',
    ],
    correctAnswer: 0,
    explanation: 'The notice goes on with the lock, as part of securing the isolation, so that anyone reaching the device while the test for dead is being carried out already knows not to operate it. Applying it after proving dead leaves a window in which the device is unlabelled and someone could switch it back on.',
    section: '4.4',
    difficulty: 'basic',
  },
  {
    id: 326,
    question: 'Two electricians must work on the same isolated distribution board during a fault investigation. What is the correct arrangement?',
    options: [
      'One lock is fitted and a second caution notice is added',
      'Each fits a personal lock to a multi-lock hasp on the isolator',
      'The first electrician to arrive locks off and keeps the only key',
      'The supervisor holds a single key covering both of the operatives',
    ],
    correctAnswer: 1,
    explanation: 'Each person\'s safety must depend on a lock only they can remove, so a hasp takes both locks and the supply cannot be restored until both have finished. A single key held by anyone else, including a supervisor, means one person can re-energise the board while the other still has hands inside it.',
    section: '4.4',
    difficulty: 'intermediate',
  },
  {
    id: 327,
    question: 'An electrician is called away partway through diagnosis and returns after a break. What must be done before touching the conductors again?',
    options: [
      'Check the circuit protective device is still in the off position',
      'Ask the client whether the isolator has been switched back on',
      'Repeat the test for dead using a proved voltage indicator',
      'Rely on the lock and notice remaining undisturbed at the board',
    ],
    correctAnswer: 2,
    explanation: 'Once the conductors have been left unattended the isolation is no longer proved, whatever the lock and notice suggest, so the test for dead is repeated from the beginning. Checking that the device is still off is a reasonable step but it is not sufficient: a device can be off while the conductors are live from a second source or a cross-connection.',
    section: '4.4',
    difficulty: 'intermediate',
  },
  {
    id: 328,
    question: 'An installation is fed from both the distributor\'s supply and a standby generator through automatic changeover. Which action makes a circuit safe to work on?',
    options: [
      'Isolate the distributor\'s supply and lock the generator',
      'Switch the changeover to its manual mains position',
      'Isolate the generator and prove the mains is dead',
      'Isolate and lock off both sources feeding the changeover',
    ],
    correctAnswer: 3,
    explanation: 'Every source capable of energising the conductors is isolated and secured, and with automatic changeover either source can appear without warning. Isolating the mains alone is the trap: losing the mains is precisely the condition that starts the generator, so that action can energise the circuit rather than kill it.',
    section: '4.4',
    difficulty: 'advanced',
  },
  {
    id: 329,
    question: 'A fault must be traced on a circuit that cannot be de-energised because it feeds a life-safety system. What is required before live testing proceeds?',
    options: [
      'A written justification that live working is unavoidable',
      'Written permission from the equipment manufacturer',
      'Confirmation that the whole circuit is RCD protected throughout',
      'A second operative present holding an insulated hook',
    ],
    correctAnswer: 0,
    explanation: 'Live working is permitted only where it is unreasonable for the work to be done dead, and that judgement is recorded before the work starts, together with the precautions that follow from it. An accompanying person and RCD protection may both form part of those precautions, but neither of them establishes that live working was justified in the first place.',
    section: '4.4',
    difficulty: 'advanced',
  },
  {
    id: 330,
    question: 'A lighting circuit reads open circuit between line and neutral with the switch closed and a sound lamp fitted. What does this indicate?',
    options: [
      'An earth fault between the line conductor and the cpc',
      'A break in one of the conductors or at a connection',
      'An overload condition on the circuit\'s protective device',
      'A short circuit developing between line and neutral conductors',
    ],
    correctAnswer: 1,
    explanation: 'With the switch closed and a sound lamp in place the line and neutral should be joined through the lamp filament or driver, so an open circuit means the path is broken somewhere: a conductor, a terminal or the switch itself. A short circuit would give the opposite reading, near zero, which is the confusion this question is built to expose.',
    section: '4.1',
    difficulty: 'basic',
  },
  {
    id: 331,
    question: 'A socket-outlet circuit measures 0.4 megohm between line and earth at 500 V DC. Against the BS 7671 minimum this result is:',
    options: [
      'unacceptable, being under the 2.0 megohm figure',
      'acceptable, since it is above the 0.25 megohm limit',
      'unacceptable, being below the 1.0 megohm minimum',
      'acceptable, because 500 V DC was correctly applied',
    ],
    correctAnswer: 2,
    explanation: 'For circuits up to and including 500 V the test is made at 500 V DC and the minimum acceptable insulation resistance is 1.0 megohm, so 0.4 megohm fails. The 2.0 megohm answer is the widely repeated misconception: two megohms is a value below which further investigation is often recommended, not the pass threshold in the table.',
    section: '4.6',
    difficulty: 'basic',
  },
  {
    id: 332,
    question: 'One socket-outlet is dead while the rest of the circuit works normally. Which reading should be taken first?',
    options: [
      'Prospective fault current at the consumer unit',
      'Insulation resistance of the whole circuit to earth',
      'Earth fault loop impedance at the origin of the supply',
      'Voltage at the dead socket-outlet with the circuit live',
    ],
    correctAnswer: 3,
    explanation: 'The symptom is confined to one point, so the first measurement establishes whether supply reaches that point at all, which immediately splits the problem into a wiring fault or an accessory fault. Testing insulation resistance of the whole circuit is the wrong scale of test: the circuit is demonstrably working everywhere else, so a whole-circuit test cannot localise anything.',
    section: '4.2',
    difficulty: 'basic',
  },
  {
    id: 333,
    question: 'An RCD trips whenever one particular table lamp is plugged in. What does this most directly point to?',
    options: [
      'An earth leakage fault inside that particular lamp',
      'An overload on the wiring of that socket-outlet circuit',
      'A loose neutral connection at that socket-outlet terminal',
      'A faulty RCD that has become oversensitive to any load',
    ],
    correctAnswer: 0,
    explanation: 'An RCD responds to an imbalance between line and neutral, and the imbalance appears only when one item is connected, so the leakage path is inside that item. Calling the RCD oversensitive is the standard wrong conclusion: it is behaving exactly as designed, and replacing it would leave a faulty appliance in service.',
    section: '4.6',
    difficulty: 'basic',
  },
  {
    id: 334,
    question: 'A radial socket circuit protected by a 20 A Type B circuit-breaker measures Zs of 1.62 ohm, against a tabulated maximum of 2.19 ohm. What should the electrician conclude?',
    options: [
      'The value must be halved before it can be compared',
      'The measured value satisfies the disconnection requirement',
      'The value cannot be judged without the cable size',
      'The value fails, as 1.37 ohm applies to socket circuits',
    ],
    correctAnswer: 1,
    explanation: 'The measured Zs is compared directly with the tabulated maximum for the device, and 1.62 ohm sits comfortably below 2.19 ohm, so disconnection within the required time is confirmed. The 1.37 ohm answer is the figure for a 32 A Type B device: applying a maximum from the wrong rating is one of the most common marking errors in this subject.',
    section: '4.6',
    difficulty: 'intermediate',
  },
  {
    id: 335,
    question: 'Continuity readings taken with an instrument whose leads have not been nulled will be:',
    options: [
      'unaffected, because the lead resistance is negligible',
      'erratic, varying widely with each reading that is taken',
      'higher than the true value by the lead resistance',
      'lower than the true value by the lead resistance',
    ],
    correctAnswer: 2,
    explanation: 'The leads sit in series with the conductor under test, so their resistance adds to every reading, and on a short circuit run that can be a large proportion of the total. The error is a consistent offset in one direction, not erratic behaviour, which is what makes nulling a reliable correction.',
    section: '4.3',
    difficulty: 'intermediate',
  },
  {
    id: 336,
    question: 'During step 3 of a ring final circuit continuity test, readings at every socket-outlet are substantially the same. What does this confirm?',
    options: [
      'The circuit\'s earth fault loop impedance is acceptable',
      'The cpc is the same size as the line conductor',
      'The insulation resistance of the ring is adequate',
      'The ring is continuous and correctly interconnected',
    ],
    correctAnswer: 3,
    explanation: 'With the legs cross-connected, every outlet sits at the electrical midpoint of the ring, so equal readings all round prove each outlet is fed from both directions and there is no break, spur or interconnection. Insulation resistance is a separate test entirely and this reading says nothing about it.',
    section: '4.6',
    difficulty: 'intermediate',
  },
  {
    id: 337,
    question: 'Half the socket-outlets on a radial circuit are dead. Where should the next reading be taken to halve the search?',
    options: [
      'At the first dead outlet following the last working one',
      'At every outlet in turn, starting from the circuit origin',
      'At the consumer unit terminals that supply the whole circuit',
      'At the furthest dead outlet from the consumer unit position',
    ],
    correctAnswer: 0,
    explanation: 'The break lies between the last outlet that works and the first that does not, so testing at that boundary immediately narrows the fault to a single section of cable. Testing at the furthest dead outlet confirms only what is already known, and working through every outlet from the board abandons the halving principle for the slowest possible method.',
    section: '4.2',
    difficulty: 'intermediate',
  },
  {
    id: 338,
    question: 'During insulation resistance testing a circuit reads zero between neutral and earth, while the line-to-earth reading is above 1 megohm. What is the most likely fault?',
    options: [
      'The line conductor has been short circuited to neutral',
      'The neutral conductor is in contact with earth somewhere',
      'The cpc has become disconnected at the main distribution board',
      'The circuit insulation has failed between the line and earth',
    ],
    correctAnswer: 1,
    explanation: 'The zero reading appears only on the neutral-to-earth pair, so the fault path involves the neutral and the earth, not the line. The line-to-earth answer contradicts the evidence directly, because that pair reads healthy, and a disconnected cpc would give a high or open reading rather than zero.',
    section: '4.6',
    difficulty: 'intermediate',
  },
  {
    id: 339,
    question: 'Which measurement would confirm that standing earth leakage on an energised circuit is causing an RCD to trip?',
    options: [
      'Insulation resistance of the circuit measured at 500 V DC',
      'Loop impedance measured at the furthest point of the circuit',
      'Clamp meter current around the line and neutral together',
      'Voltage between the circuit neutral bar and the main earth bar',
    ],
    correctAnswer: 2,
    explanation: 'Clamping the line and neutral together measures the difference between them, which is the same quantity the RCD responds to, and it can be done with the load running. The insulation resistance answer is the trap: it needs the circuit dead and the equipment disconnected, so it removes the very loads that produce the operational leakage being investigated.',
    section: '4.3',
    difficulty: 'intermediate',
  },
  {
    id: 340,
    question: 'The accumulated leakage current downstream of a 30 mA RCD should not exceed what proportion of its rated residual operating current?',
    options: [
      '10 per cent, that is approximately 3 mA',
      '70 per cent, that is about 21 mA',
      '50 per cent, that is roughly 15 mA',
      '30 per cent, that is about 9 mA',
    ],
    correctAnswer: 3,
    explanation: 'To avoid unwanted tripping, protective conductor and leakage currents accumulating below the device should stay within 30 per cent of its rated residual operating current, which is 9 mA for a 30 mA RCD. The 50 per cent answer confuses this design limit with the separate test requirement that the device must not operate at half its rated residual current.',
    section: '4.6',
    difficulty: 'intermediate',
  },
  {
    id: 341,
    question: 'Why should readings be recorded as fault diagnosis proceeds rather than written up at the end?',
    options: [
      'They form the evidence trail supporting the diagnosis',
      'Instruments do not retain their readings once switched off',
      'The client is entitled to see each result immediately on site',
      'The certificate cannot be issued without them being present',
    ],
    correctAnswer: 0,
    explanation: 'The diagnosis is an argument built from readings, and recording each one as it is taken preserves the order in which the conclusion was reached, which is what allows another person to follow or challenge it. Instrument memory is not the reason: many instruments do store readings, and the discipline would still be required if they all did.',
    section: '4.5',
    difficulty: 'intermediate',
  },
  {
    id: 342,
    question: 'Ze at the origin of a TN-C-S installation measures 0.19 ohm, against a distributor\'s declared maximum of 0.35 ohm. How should this be interpreted?',
    options: [
      'The declared figure applies only to TN-S installations',
      'The external loop impedance is within the declared figure',
      'The measurement must be repeated with bonding connected',
      'The value is too low and indicates a parallel path',
    ],
    correctAnswer: 1,
    explanation: 'The measured external loop impedance is below the declared maximum, so the supply is as expected and the figure can be used with the circuit\'s R1+R2 to predict Zs. Repeating the test with the earthing still connected is the named error: parallel paths through bonded metalwork would lower the reading and the result would no longer be Ze at all.',
    section: '4.6',
    difficulty: 'intermediate',
  },
  {
    id: 343,
    question: 'What is the purpose of comparing a suspect circuit\'s readings with those of an identical healthy circuit?',
    options: [
      'It confirms the test instrument is in calibration',
      'It removes the need to consult the tabulated values',
      'It establishes what a normal value looks like on site',
      'It proves the fault lies in the suspect circuit',
    ],
    correctAnswer: 2,
    explanation: 'Tabulated limits tell you what is permissible, not what is usual for this cable on this run, and a reading can sit inside the limit while being obviously wrong for the installation. The comparison supplies that missing baseline. It does not replace the tabulated maximum, which still has to be satisfied.',
    section: '4.2',
    difficulty: 'intermediate',
  },
  {
    id: 344,
    question: 'A broken circuit protective conductor on a lighting circuit has been repaired. Which test most directly confirms the repair?',
    options: [
      'Insulation resistance between line and neutral conductors',
      'Polarity at each lampholder on the repaired circuit',
      'Prospective fault current at the origin of the installation',
      'Continuity of the protective conductor from end to end',
    ],
    correctAnswer: 3,
    explanation: 'The fault was a break in the protective conductor, so the test that addresses it directly is a continuity measurement along that conductor, which also yields the R2 or R1+R2 value needed to confirm Zs. Insulation resistance between line and neutral tests a different pair of conductors entirely and would have been satisfactory throughout.',
    section: '4.7',
    difficulty: 'intermediate',
  },
  {
    id: 345,
    question: 'A three-phase motor circuit shows nearly equal current in two line conductors and almost none in the third. What does this indicate?',
    options: [
      'A break in one line conductor or in its winding',
      'An overload on the two loaded line conductors',
      'Incorrect phase rotation at the motor terminal box',
      'An earth fault on the third line conductor',
    ],
    correctAnswer: 0,
    explanation: 'Current cannot flow in a broken path, so the near-zero reading identifies which line has lost continuity, and the motor is single phasing on the remaining two. An earth fault gives the opposite signature, raising current in the faulted line rather than removing it, and reversed rotation changes direction without changing the current balance at all.',
    section: '4.6',
    difficulty: 'intermediate',
  },
  {
    id: 346,
    question: 'A voltage indicator shows nothing between line and neutral, line and earth, and neutral and earth on a circuit believed to be live. What should be suspected before it is declared dead?',
    options: [
      'An earth fault is holding down the voltage',
      'The indicator has failed and needs proving again',
      'A load is connected across the terminals',
      'The neutral conductor has been disconnected',
    ],
    correctAnswer: 1,
    explanation: 'A failed indicator and a genuinely dead circuit give exactly the same display, which is why the indicator is proved again on a known source immediately after the test. A disconnected neutral would still leave a line-to-earth voltage present, so it does not explain three null readings.',
    section: '4.4',
    difficulty: 'intermediate',
  },
  {
    id: 347,
    question: 'A repair has involved cutting and re-jointing a cable inside a wall. What determines whether the joint may be left buried?',
    options: [
      'Whether the joint lies within a prescribed safe zone area',
      'Whether the cable is protected by a 30 mA RCD upstream',
      'Whether the connection is of a maintenance-free type',
      'Whether the joint has been recorded on the certificate issued',
    ],
    correctAnswer: 2,
    explanation: 'Joints must be accessible for inspection unless they are of a type specifically permitted to be inaccessible, such as a marked maintenance-free accessory installed as the manufacturer requires. RCD protection and safe zones both govern where a cable may run and how it is protected against damage, neither of which makes an ordinary joint acceptable to bury.',
    section: '4.7',
    difficulty: 'intermediate',
  },
  {
    id: 348,
    question: 'A ring final circuit protected by a 32 A Type B circuit-breaker measures Zs of 1.28 ohm at the furthest outlet, against a tabulated maximum of 1.37 ohm. What is the correct conclusion?',
    options: [
      'It cannot be assessed without the measured Ze value for the supply',
      'It fails outright, because the 1.37 ohm limit has been exceeded',
      'It passes both checks, so no further action is needed',
      'It passes the table but fails the 0.8 rule-of-thumb check',
    ],
    correctAnswer: 3,
    explanation: 'The tabulated maxima assume the conductors are at operating temperature, but a test is made on cold cable, so a measured value is compared against 0.8 of the tabulated figure, here 1.10 ohm. At 1.28 ohm the circuit clears the table yet fails the corrected check, which means the conductors would be over the limit once warm. Reading only the table and passing it is the mistake this question exists to catch.',
    section: '4.6',
    difficulty: 'advanced',
  },
  {
    id: 349,
    question: 'Zs measures 0.92 ohm on a circuit where Ze is 0.31 ohm and R1+R2 measures 0.24 ohm. What does the discrepancy most likely mean?',
    options: [
      'A high-resistance connection lies somewhere in the loop',
      'The protective device is rated too low for the connected load',
      'The instrument leads were not nulled before the R1+R2 test',
      'A parallel earth path has reduced the measured loop value',
    ],
    correctAnswer: 0,
    explanation: 'Zs should be close to Ze plus R1+R2, here 0.55 ohm, so 0.37 ohm is unaccounted for and something in the loop is adding resistance that the dead test did not see, typically a joint that only carries current under the loop test. Un-nulled leads point the wrong way: they would inflate R1+R2, making the sum too high rather than too low, and a parallel earth path would pull Zs down, not up.',
    section: '4.6',
    difficulty: 'advanced',
  },
  {
    id: 350,
    question: 'Zs measured at the furthest point of a socket circuit is lower than the Ze measured at the origin. What is the most likely explanation?',
    options: [
      'The circuit cable is larger than the supply cable',
      'Parallel earth paths through bonded metalwork and pipework',
      'The loop tester was left on its low-current test range',
      'The distributor has improved the external earth path',
    ],
    correctAnswer: 1,
    explanation: 'Zs is Ze plus the circuit\'s own conductors, so it can never genuinely be less than Ze. A lower reading means the test current found another route back, usually through bonded pipework and structural metalwork in parallel with the supply earth. The no-trip range gives a slightly different figure from the high-current test, but it does not create a route that bypasses the supply.',
    section: '4.6',
    difficulty: 'advanced',
  },
  {
    id: 351,
    question: 'An electrician suspects a borrowed neutral between an upstairs and a downstairs lighting circuit. Which result would confirm it?',
    options: [
      'Equal earth fault loop impedance on both of the circuits',
      'Identical R1+R2 readings taken at each lighting point',
      'Continuity between the two circuit neutrals with both off',
      'Zero insulation resistance from line to earth on both circuits',
    ],
    correctAnswer: 2,
    explanation: 'A borrowed neutral is a direct connection between two circuits that should be separate, so with both isolated a continuity test between their neutrals reveals it immediately. Equal loop impedances prove nothing: two circuits of similar length in the same building would be expected to read alike whether or not their neutrals are joined.',
    section: '4.6',
    difficulty: 'advanced',
  },
  {
    id: 352,
    question: 'A borrowed neutral has been confirmed between two RCBO-protected lighting circuits, and both devices trip on reset. In what order should the work proceed?',
    options: [
      'Separate the neutrals live, so as to keep the lighting available',
      'Replace both RCBOs, then separate the neutrals afterwards',
      'Reset one RCBO first, to find which of the two circuits holds in',
      'Isolate both circuits, separate the neutrals, then retest each',
    ],
    correctAnswer: 3,
    explanation: 'Each RCBO sees a neutral return that belongs to the other circuit, so both read an imbalance and both trip; the tripping stops only once the neutrals are separated, and both circuits must be dead for that work. Resetting one to see which holds wastes a step and tells you nothing new, since the cross-connection already explains both trips.',
    section: '4.6',
    difficulty: 'basic',
  },
  {
    id: 353,
    question: 'A 30 mA RCD trips only when an immersion heater is switched on. With the heater disconnected, insulation resistance of the fixed wiring exceeds 200 megohm. What is the most useful next test?',
    options: [
      'Insulation resistance of the element and its flexible tail',
      'A ramp test on the RCD to establish its actual tripping current',
      'Earth fault loop impedance at the immersion heater switch position',
      'Continuity of the cpc from the board through to the cylinder',
    ],
    correctAnswer: 0,
    explanation: 'The fixed wiring has been cleared, so the leakage path has to be in the part that was disconnected, and a failed element leaking to the earthed cylinder is the classic cause. Ramp testing the RCD characterises the device rather than the fault, and would simply confirm that a working device operates near its rating.',
    section: '4.6',
    difficulty: 'advanced',
  },
  {
    id: 354,
    question: 'A socket circuit works normally at low load. A 3 kW heater at the last outlet drops the voltage there to 190 V while the board reads 230 V; the same heater at the first outlet gives 228 V. What does this indicate?',
    options: [
      'An earth fault developing on the final cable section',
      'A high-resistance connection in series with the last outlet',
      'The circuit cable is undersized for its design current',
      'The heater is drawing far more than its rated current',
    ],
    correctAnswer: 1,
    explanation: 'The drop appears only when current passes through the final section, and 40 volts at roughly 13 amperes implies about three ohms in series, which no length of circuit cable would produce. An undersized cable is excluded by the second reading: the same load at the first outlet loses barely two volts, so the problem is local to one connection, not to the cable as a whole.',
    section: '4.6',
    difficulty: 'advanced',
  },
  {
    id: 355,
    question: 'Two causes remain for a dead socket-outlet: a broken line conductor or a failed socket. Which single test discriminates between them?',
    options: [
      'Insulation resistance from the socket terminals to earth',
      'Continuity of the cpc from that socket back to the distribution board',
      'Voltage between the incoming line and neutral at that socket',
      'Loop impedance measured at the adjacent working socket',
    ],
    correctAnswer: 2,
    explanation: 'One measurement at the socket\'s incoming terminals separates the two possibilities completely: voltage present means the wiring is sound and the accessory has failed, while voltage absent means the supply never arrives. Testing at the adjacent working socket is the wasted test, because that outlet is already known to work and its readings cannot say anything about the next section.',
    section: '4.6',
    difficulty: 'advanced',
  },
  {
    id: 356,
    question: 'An intermittent fault has cleared itself by the time the electrician arrives, and every test at the board is satisfactory. What is the most effective next step?',
    options: [
      'Record the circuit as satisfactory, then close the job down',
      'Renew the last accessory worked on, as the likely cause',
      'Replace the circuit\'s protective device, as a general precaution',
      'Fit monitoring, or apply the stress that provokes the fault',
    ],
    correctAnswer: 3,
    explanation: 'A fault that is not present cannot be measured, so the work is to make it present, by loading, heating, flexing or vibrating the suspect section, or to capture it by leaving recording equipment in place. Renewing the last thing that was worked on is the classic substitute for diagnosis: it sometimes succeeds by luck, and when it fails it has destroyed the evidence.',
    section: '4.6',
    difficulty: 'advanced',
  },
  {
    id: 357,
    question: 'A lighting circuit reads 0.6 megohm to earth with LED drivers connected and above 200 megohm with them removed. What is the correct interpretation?',
    options: [
      'The wiring is sound and the drivers are loading the test',
      'The result is satisfactory, as 0.6 megohm exceeds 0.5 megohm',
      'The 500 V test damaged the drivers during that first test',
      'The wiring insulation has failed and the cable must be renewed',
    ],
    correctAnswer: 0,
    explanation: 'The two readings isolate the cause between them: removing the drivers restores a healthy figure, so the low value came from their internal filter components conducting to earth, not from the cable. The 0.5 megohm answer misapplies the SELV and PELV value, which belongs to circuits tested at 250 V DC, not to a 230 V lighting circuit.',
    section: '4.6',
    difficulty: 'advanced',
  },
  {
    id: 358,
    question: 'Luminaires on a circuit cannot be reached to disconnect them for an insulation resistance test. What alternative is permitted?',
    options: [
      'Omit the test and note the reason on the certificate',
      'Test lines and neutral joined together to earth at 250 V DC',
      'Test lines and neutral joined to earth at 500 V DC',
      'Test line to neutral at 500 V DC and accept 0.5 megohm',
    ],
    correctAnswer: 1,
    explanation: 'Where removing lamps or disconnecting equipment is impracticable, the live conductors are joined together and tested to earth at the reduced voltage of 250 V DC, which protects the connected equipment while still proving the insulation to earth. Applying 500 V to the joined conductors keeps the hazard the reduced voltage exists to remove.',
    section: '4.6',
    difficulty: 'advanced',
  },
  {
    id: 359,
    question: 'A 30 mA RCD operates in 28 ms when tested at 30 mA, but also operates when tested at 15 mA. How should this be judged?',
    options: [
      'It passes, since operating early is on the safe side',
      'It passes, since 28 ms is well inside the 300 ms limit',
      'It fails, because it must not operate at half its rating',
      'It fails, because the disconnection time exceeds the 40 ms limit',
    ],
    correctAnswer: 2,
    explanation: 'Two criteria apply and both must be met: the device must disconnect within 300 ms at its rated residual current, which it does, and it must not operate at half that current, which it does not. Treating early operation as harmless is the wrong instinct, because a device that trips at half rating will trip on normal standing leakage and the occupier will eventually defeat it.',
    section: '4.6',
    difficulty: 'advanced',
  },
  {
    id: 360,
    question: 'A Type S RCD upstream of several RCBOs operates in 90 ms when tested at its rated residual current. What does this indicate?',
    options: [
      'It passes, as 90 ms is well within the 300 ms maximum',
      'It fails, because a delay type device must always exceed 500 ms',
      'It passes, because selectivity is unaffected by the timing of the trip',
      'It fails, being faster than the 130 ms minimum for delay type',
    ],
    correctAnswer: 3,
    explanation: 'A delay type device is verified against a window, between 130 ms and 500 ms at its rated residual current, and 90 ms falls below it, so the intentional delay has been lost. Applying the 300 ms maximum is the error here: that figure belongs to general non-delay devices, and using it would pass a device that can no longer discriminate with the RCBOs downstream.',
    section: '4.6',
    difficulty: 'advanced',
  },
  {
    id: 361,
    question: 'Standing leakage on a board protected by one 30 mA RCD measures 22 mA with all circuits energised. What does this explain?',
    options: [
      'Unwanted tripping, as it far exceeds the 9 mA guidance',
      'An earth fault on one circuit, requiring immediate repair',
      'A faulty RCD, since 22 mA should not be detectable at all',
      'Nothing at all, since the leakage is below the 30 mA rating',
    ],
    correctAnswer: 0,
    explanation: 'Accumulated leakage below the device should stay within 30 per cent of its rating, which is 9 mA here, and at 22 mA the device sits so close to its threshold that any small transient tips it over. Concluding that nothing is wrong because 22 mA is under 30 mA is the trap: the rating is where the device must operate, not where it is guaranteed to hold.',
    section: '4.6',
    difficulty: 'advanced',
  },
  {
    id: 362,
    question: 'Which action best resolves an installation whose accumulated standing leakage repeatedly trips one 30 mA RCD?',
    options: [
      'Remove the RCD and rely on the breakers',
      'Subdivide the circuits onto individual RCBOs',
      'Fit a time-delayed RCD in its place',
      'Replace it with a 100 mA RCD of that type',
    ],
    correctAnswer: 1,
    explanation: 'Splitting the load so each circuit has its own device shares the leakage between several thresholds instead of summing it at one, and it also confines any future trip to a single circuit. Fitting a 100 mA device removes the additional protection that the 30 mA rating was there to provide, which trades a nuisance for a safety reduction.',
    section: '4.6',
    difficulty: 'advanced',
  },
  {
    id: 363,
    question: 'An AFDD operates repeatedly on a lighting circuit while the RCD and circuit-breaker never trip. Where should the search begin?',
    options: [
      'At the circuit cable, testing its insulation resistance to earth',
      'At the AFDD itself, which should be exchanged first',
      'At terminations and joints where a series arc could form',
      'At the cpc connections, checking for earth leakage',
    ],
    correctAnswer: 2,
    explanation: 'The other two devices staying in is the evidence: there is no residual current for the RCD and no excess current for the circuit-breaker, which rules out earth leakage and overload and leaves an arc drawing normal load current. A series arc at a loose terminal fits exactly, so the search starts at the connections.',
    section: '4.6',
    difficulty: 'advanced',
  },
  {
    id: 364,
    question: 'On a PME supply with a 25 mm2 PEN conductor, main bonding to the water service measures 6 mm2. What is the significance?',
    options: [
      'It matters only where no RCD is fitted at the installation origin',
      'It is acceptable, because 6 mm2 suits a water service',
      'It is below the 16 mm2 minimum required for all PME supplies',
      'It is below the 10 mm2 minimum required for that PEN size',
    ],
    correctAnswer: 3,
    explanation: 'Where PME conditions apply the main bonding is sized from the supply PEN conductor, and for a PEN up to and including 35 mm2 the minimum copper equivalent is 10 mm2, so 6 mm2 is undersized. The 16 mm2 answer takes the figure from the next band up, which applies only where the PEN exceeds 35 mm2.',
    section: '4.6',
    difficulty: 'advanced',
  },
  {
    id: 365,
    question: 'A dangerous condition is found during fault diagnosis and cannot be corrected on the visit. What is the priority action?',
    options: [
      'Make it safe, warn the person responsible and record it',
      'Note it in the report, and arrange a return visit',
      'Photograph it, and email the client the next day',
      'Isolate the whole installation, until it is corrected',
    ],
    correctAnswer: 0,
    explanation: 'Danger is removed or made inaccessible first, then the responsible person is told without delay, then it is written down; the sequence matters because a record does not protect anyone who touches it tonight. Isolating the entire installation is disproportionate where the danger can be confined to one circuit, and leaving a household without supply creates hazards of its own.',
    section: '4.5',
    difficulty: 'basic',
  },
  {
    id: 366,
    question: 'A thermal image of a three-phase board shows one phase at 78 degC and the other two near 35 degC, with the three line currents equal. What does this indicate?',
    options: [
      'An overload on the phase conductor that shows the hot spot',
      'A high-resistance connection on the hot phase conductor',
      'An earth fault developing on that phase conductor\'s insulation',
      'Harmonic current circulating in the board\'s neutral conductor',
    ],
    correctAnswer: 1,
    explanation: 'Equal currents mean equal heating in equal conductors, so the extra heat must come from extra resistance at one point rather than extra current, which is the signature of a slack or corroded termination. The overload answer is the tempting one and the current readings exclude it directly, which is why they were given.',
    section: '4.6',
    difficulty: 'advanced',
  },
  {
    id: 367,
    question: 'A three-phase four-wire board supplies balanced electronic lighting loads, the three line currents are equal, yet the neutral carries 18 A. What is the most likely cause?',
    options: [
      'One line conductor broken, unbalancing the load',
      'A loose connection at the neutral bar in the board',
      'Triplen harmonic currents from the electronic control gear',
      'A neutral-to-earth fault on one of the final circuits',
    ],
    correctAnswer: 2,
    explanation: 'In a balanced system the fundamental line currents cancel in the neutral, but third harmonic currents from switched mode supplies are in phase with each other and add instead, so the neutral carries current no line reading predicts. A broken line conductor is excluded by the statement that the three line currents are equal.',
    section: '4.6',
    difficulty: 'advanced',
  },
  {
    id: 368,
    question: 'After a supply alteration, line-to-neutral voltages at a three-phase board read 285 V, 230 V and 175 V. Where does the fault lie?',
    options: [
      'A failed transformer winding within the distributor\'s network',
      'A short circuit between two of the line conductors',
      'An earth fault on the phase measuring 175 V at the board',
      'An open or high-resistance neutral at or before the board',
    ],
    correctAnswer: 3,
    explanation: 'With the neutral lost, the star point floats towards the more heavily loaded phase, so lightly loaded phases rise well above 230 V and heavily loaded ones fall, while the sum stays roughly constant. That is exactly the pattern shown. A line-to-line short would operate a protective device rather than leave three steady but wrong voltages.',
    section: '4.6',
    difficulty: 'advanced',
  },
  {
    id: 369,
    question: 'A PME supply has an open PEN conductor upstream. Which measurement would reveal it during fault diagnosis?',
    options: [
      'Voltage between the main earthing terminal and a true earth',
      'Continuity of the main protective bonding to the gas service pipe',
      'Residual current measured on the load side of the main RCD',
      'Insulation resistance from the neutral bar to the main earth bar',
    ],
    correctAnswer: 0,
    explanation: 'With the PEN broken, the installation\'s earthed metalwork rises towards line potential relative to the true mass of earth, and that difference is only visible against an independent electrode. An RCD sees nothing, because the returning current still travels in the conductors it monitors, so no imbalance exists for it to detect; that is precisely why an RCD cannot protect against this fault.',
    section: '4.6',
    difficulty: 'advanced',
  },
  {
    id: 370,
    question: 'On a TT installation Ra measures 180 ohm and the RCD is rated 30 mA. Does this satisfy the touch voltage requirement?',
    options: [
      'No, because the earth electrode must not exceed 100 ohm on a TT system',
      'Yes, since 180 multiplied by 0.03 gives 5.4 V, well under 50 V',
      'No, because 180 multiplied by 0.03 gives 54 V, which exceeds 50 V',
      'Yes, because a 30 mA RCD makes the electrode resistance irrelevant',
    ],
    correctAnswer: 1,
    explanation: 'The condition is that Ra multiplied by the current causing disconnection must not exceed 50 V, and 180 multiplied by 0.03 gives 5.4 V. The 54 V answer comes from a decimal slip that turns 30 mA into 300 mA, and it is worth recognising because it converts a comfortable pass into an apparent fail.',
    section: '4.6',
    difficulty: 'advanced',
  },
  {
    id: 371,
    question: 'An installation is dead. There is 230 V at the incoming supply terminals but nothing on the load side of the main switch, which is on. What is the fault?',
    options: [
      'The distributor\'s cut-out fuse has ruptured',
      'The main earthing conductor has become detached',
      'The main switch itself has failed to make contact',
      'The meter tails have been reversed at the unit',
    ],
    correctAnswer: 2,
    explanation: 'Voltage arrives at the switch and does not leave it, so the break is inside the switch, which places the fault squarely in the consumer\'s equipment. A ruptured cut-out fuse is excluded by the incoming reading, since nothing would arrive at all, and that distinction also decides whether the distributor or the electrician is the one to call.',
    section: '4.2',
    difficulty: 'advanced',
  },
  {
    id: 372,
    question: 'Three faults are found on one circuit: a broken cpc, a damaged line conductor and a loose neutral. In what order should they be corrected?',
    options: [
      'The neutral first, since it affects the most accessories',
      'The cpc last, because it carries no current in service',
      'The line conductor first, then energise to check on progress',
      'All three before the circuit is re-energised and retested',
    ],
    correctAnswer: 3,
    explanation: 'Every fault is corrected before the supply is restored, because energising with a known defect still in place can convert a repairable condition into a dangerous one. Repairing the line conductor first and energising to check is the worst order available: it restores full voltage to a circuit that still has no protective conductor.',
    section: '4.7',
    difficulty: 'basic',
  },
  {
    id: 373,
    question: 'A circuit is re-energised when only part of a multiple fault has been corrected. What is the principal risk?',
    options: [
      'The remaining fault operates the device or causes danger',
      'The instrument readings taken earlier become invalid',
      'The certificate cannot then be issued for the repaired circuit',
      'The repaired section will be damaged by the inrush current',
    ],
    correctAnswer: 0,
    explanation: 'Energising with a fault still present exposes people and equipment to whatever that fault does, and where the outstanding defect is in the protective conductor the exposure is to a live casing with no path to operate the device. Inrush current is a normal service condition, not a consequence of an incomplete repair.',
    section: '4.7',
    difficulty: 'basic',
  },
  {
    id: 374,
    question: 'A ring final circuit measures r1 of 0.42 ohm and rn of 0.68 ohm end to end. What does this difference indicate?',
    options: [
      'The two legs have been cross-connected at the board',
      'A break or high resistance in the neutral leg of the ring',
      'A break in the line leg near a socket-outlet',
      'Both legs are correct, as line and neutral sizes differ',
    ],
    correctAnswer: 1,
    explanation: 'Line and neutral in a ring are the same size and follow the same route, so r1 and rn should agree closely; 0.26 ohm of difference means the neutral path contains resistance the line path does not. The answer about differing conductor sizes describes r2, where a smaller cpc genuinely reads higher, and importing that reasoning here is the mistake.',
    section: '4.6',
    difficulty: 'advanced',
  },
  {
    id: 375,
    question: 'With the line and neutral legs of a ring cross-connected, line-to-neutral readings at the outlets vary widely instead of matching. What does this indicate?',
    options: [
      'The cpc is smaller than the line or neutral conductors',
      'A short circuit between line and neutral at an outlet',
      'An interconnection or spur breaking the ring\'s symmetry',
      'The instrument leads were not nulled before testing began',
    ],
    correctAnswer: 2,
    explanation: 'Cross-connecting makes every point on a healthy ring electrically equivalent, so equal readings are the expected result and a spread means some outlets are not fed from both directions. Un-nulled leads would shift every reading by the same amount and would not create a spread, which is what distinguishes an instrument error from a wiring fault.',
    section: '4.6',
    difficulty: 'advanced',
  },
  {
    id: 376,
    question: 'A fault has been narrowed to a 20 m cable run containing four junction boxes. Which approach locates the break fastest?',
    options: [
      'Test at each box in turn, starting from the consumer unit',
      'Test at the far end, then work back one box at a time',
      'Replace each junction box, until the circuit works again',
      'Test at the middle box, then halve the remaining length',
    ],
    correctAnswer: 3,
    explanation: 'Each test at the midpoint discards half of what is left, so four boxes are resolved in about two tests rather than four. Replacing boxes until the fault disappears is substitution rather than diagnosis: it can consume every box on the run, and it leaves the cause unidentified even when it happens to work.',
    section: '4.2',
    difficulty: 'advanced',
  },
  {
    id: 377,
    question: 'An electrician records Zs on an RCD-protected circuit by measuring between line and neutral to avoid tripping the device. Why is the recorded value invalid?',
    options: [
      'It measures the line-neutral loop, not the earth fault loop',
      'It includes the RCD\'s own contact resistance, not just that of the cable',
      'It cannot be taken under normal load, only with the circuit switched off',
      'It measures at a lower test current, giving an optimistic figure',
    ],
    correctAnswer: 0,
    explanation: 'The earth fault loop runs through the protective conductor and back through the supply earth, and a line-to-neutral measurement includes neither, so the figure describes a different circuit and cannot be compared with a maximum Zs. The proper way to avoid tripping the device is the instrument\'s no-trip range, which still measures the correct loop.',
    section: '4.3',
    difficulty: 'intermediate',
  },
  {
    id: 378,
    question: 'The cpc continuity of a lighting circuit must be proved, but the instrument leads will not reach both ends. Which method gives a valid result?',
    options: [
      'Run a long temporary lead outside the building to that point',
      'Link line to cpc at the board and measure R1+R2 at each point',
      'Measure insulation resistance and infer continuity from it',
      'Measure from the board to the nearest bonded metalwork',
    ],
    correctAnswer: 1,
    explanation: 'Linking line to cpc at the origin turns the circuit itself into the return path, so a single measurement at each point gives both the continuity proof and the R1+R2 figure needed for Zs, with no long lead at all. Measuring to bonded metalwork proves only that a parallel path exists, not that this circuit\'s protective conductor is continuous.',
    section: '4.3',
    difficulty: 'intermediate',
  },
  {
    id: 379,
    question: 'Why must a circuit be proved dead at the working position rather than only at the point of isolation?',
    options: [
      'The isolator may have been fitted in the neutral conductor only',
      'The isolator contacts may be rated below the fault current level',
      'Another supply may reach the conductors beyond the isolator',
      'A voltage indicator reads more accurately under load',
    ],
    correctAnswer: 2,
    explanation: 'Isolation proves that one source has been removed; it does not prove that the conductors you are about to touch are dead, because a borrowed neutral, a cross-connection or a second supply can energise them downstream. Testing where the hands go is the only measurement that answers the question actually being asked.',
    section: '4.4',
    difficulty: 'advanced',
  },
  {
    id: 380,
    question: 'Diagnosis on a rented property has produced readings that fail current requirements, although the installation complied when it was built. How should this be reported?',
    options: [
      'Omit it, as the report deals only with the reported fault',
      'Record it as satisfactory, since it complied when it was installed',
      'Record it as a failure requiring immediate rectification',
      'State the departure from current requirements and its effect',
    ],
    correctAnswer: 3,
    explanation: 'An installation is assessed against the standard in force now, but a departure that was acceptable when built is not automatically dangerous, so the report states the departure and what it means in practice rather than issuing a verdict of pass or fail. Recording it as satisfactory because it once complied withholds from the client the one fact they need to make a decision.',
    section: '4.5',
    difficulty: 'advanced',
  },
];

// Helper function to get random questions for mock exams
/**
 * Draws a paper honouring the difficulty tags.
 *
 * Previously this was a flat `sort(() => Math.random() - 0.5)` slice, which
 * ignored `difficulty` entirely — the tags were decorative and a paper's
 * difficulty was pure luck — and used the broken sort-shuffle idiom, which is
 * not a uniform permutation. See src/utils/apprenticeQuestionDraw.ts.
 */
export const getRandomQuestions = (
  count: number,
  weights: DifficultyWeights = LEVEL3_WEIGHTS
): Question[] => drawWeighted(module4Questions, count, weights);

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

/**
 * Section number → readable topic, taken from the section headers above.
 * Questions here carry only `section: '4.4'` and no `topic`, so without this
 * the results screen's "what to study next" lists bare outline numbers.
 */
export const M4_SECTION_TOPIC: Record<string, string> = {
  '4.1': 'Fault Types',
  '4.2': 'Diagnosis Methods',
  '4.3': 'Test Equipment',
  '4.4': 'Safe Isolation',
  '4.5': 'Documentation',
  '4.6': 'Common Faults',
  '4.7': 'Repair Procedures',
  '4.8': 'Fault Finding in Depth',
};

export default module4Questions;
