// Level 2 Module 2: Electrical Principles - Question Bank
// 250 questions covering all Module 2 content for Level 2 Electrical Course

export interface QuestionBank {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  section: string;
  difficulty: 'basic' | 'intermediate' | 'advanced';
  topic: string;
}

export const module2QuestionBank: QuestionBank[] = [
  // Section 2.1: Electrical Quantities and Units (42 questions)
  {
    id: 1,
    question: "What is electricity?",
    options: [
      "The flow of water through pipes",
      "The flow of electric charge through a conductor",
      "A type of magnetism",
      "Heat energy in cables"
    ],
    correctAnswer: 1,
    explanation: "Electricity is the flow of electric charge (electrons) through a conductor.",
    section: "2.1.1",
    difficulty: "basic",
    topic: "What is Electricity"
  },
  {
    id: 2,
    question: "What does voltage represent in an electrical circuit?",
    options: [
      "The amount of current flowing",
      "The electrical pressure or force that pushes current",
      "The resistance to current flow",
      "The power consumed"
    ],
    correctAnswer: 1,
    explanation: "Voltage is the electrical pressure or force that pushes current through a conductor.",
    section: "2.1.2",
    difficulty: "basic",
    topic: "Voltage, Current, Resistance"
  },
  {
    id: 3,
    question: "What is the unit for measuring current?",
    options: ["Volts (V)", "Ohms (Ω)", "Amperes (A)", "Watts (W)"],
    correctAnswer: 2,
    explanation: "Current is measured in Amperes or Amps, with the symbol A.",
    section: "2.1.2",
    difficulty: "basic",
    topic: "Units of Measurement"
  },
  {
    id: 4,
    question: "What is the unit for measuring voltage?",
    options: ["Amperes (A)", "Volts (V)", "Ohms (Ω)", "Watts (W)"],
    correctAnswer: 1,
    explanation: "Voltage is measured in Volts, with the symbol V.",
    section: "2.1.2",
    difficulty: "basic",
    topic: "Units of Measurement"
  },
  {
    id: 5,
    question: "What is the unit for measuring resistance?",
    options: ["Volts (V)", "Amperes (A)", "Ohms (Ω)", "Watts (W)"],
    correctAnswer: 2,
    explanation: "Resistance is measured in Ohms, with the symbol Ω (Greek letter omega).",
    section: "2.1.2",
    difficulty: "basic",
    topic: "Units of Measurement"
  },
  {
    id: 6,
    question: "What is electrical current?",
    options: [
      "The opposition to electron flow",
      "The rate of flow of electric charge",
      "The energy stored in a circuit",
      "The voltage across a component"
    ],
    correctAnswer: 1,
    explanation: "Electric current is the rate of flow of electric charge, measured in amperes.",
    section: "2.1.2",
    difficulty: "basic",
    topic: "Electric Current"
  },
  {
    id: 7,
    question: "What is electrical resistance?",
    options: [
      "The force that pushes current",
      "The rate of electron flow",
      "The opposition to current flow",
      "The energy consumed by a circuit"
    ],
    correctAnswer: 2,
    explanation: "Resistance is the opposition that a material offers to the flow of electric current.",
    section: "2.1.2",
    difficulty: "basic",
    topic: "Electrical Resistance"
  },
  {
    id: 8,
    question: "What is the symbol for voltage in electrical formulas?",
    options: ["I", "V", "R", "P"],
    correctAnswer: 1,
    explanation: "Voltage is represented by the symbol V in electrical formulas.",
    section: "2.1.2",
    difficulty: "basic",
    topic: "Electrical Symbols"
  },
  {
    id: 9,
    question: "What is the symbol for current in electrical formulas?",
    options: ["I", "V", "R", "P"],
    correctAnswer: 0,
    explanation: "Current is represented by the symbol I in electrical formulas.",
    section: "2.1.2",
    difficulty: "basic",
    topic: "Electrical Symbols"
  },
  {
    id: 10,
    question: "What is the symbol for resistance in electrical formulas?",
    options: ["I", "V", "R", "P"],
    correctAnswer: 2,
    explanation: "Resistance is represented by the symbol R in electrical formulas.",
    section: "2.1.2",
    difficulty: "basic",
    topic: "Electrical Symbols"
  },
  {
    id: 11,
    question: "What instrument is used to measure voltage?",
    options: ["Ammeter", "Voltmeter", "Ohmmeter", "Wattmeter"],
    correctAnswer: 1,
    explanation: "A voltmeter is used to measure voltage in electrical circuits.",
    section: "2.1.3",
    difficulty: "basic",
    topic: "Measuring Instruments"
  },
  {
    id: 12,
    question: "What instrument is used to measure current?",
    options: ["Ammeter", "Voltmeter", "Ohmmeter", "Wattmeter"],
    correctAnswer: 0,
    explanation: "An ammeter is used to measure current in electrical circuits.",
    section: "2.1.3",
    difficulty: "basic",
    topic: "Measuring Instruments"
  },
  {
    id: 13,
    question: "What instrument is used to measure resistance?",
    options: ["Ammeter", "Voltmeter", "Ohmmeter", "Wattmeter"],
    correctAnswer: 2,
    explanation: "An ohmmeter is used to measure resistance in electrical circuits.",
    section: "2.1.3",
    difficulty: "basic",
    topic: "Measuring Instruments"
  },
  {
    id: 14,
    question: "How should an ammeter be connected in a circuit?",
    options: ["In parallel", "In series", "Across the supply", "To earth"],
    correctAnswer: 1,
    explanation: "An ammeter must be connected in series with the circuit to measure the current flowing through it.",
    section: "2.1.3",
    difficulty: "intermediate",
    topic: "Meter Connections"
  },
  {
    id: 15,
    question: "How should a voltmeter be connected in a circuit?",
    options: ["In series", "In parallel", "Through a resistor", "To earth only"],
    correctAnswer: 1,
    explanation: "A voltmeter must be connected in parallel across the component to measure the voltage across it.",
    section: "2.1.3",
    difficulty: "intermediate",
    topic: "Meter Connections"
  },
  {
    id: 16,
    question: "What safety precaution must be taken before measuring resistance?",
    options: [
      "Use highest range",
      "Isolate the circuit from supply",
      "Connect to earth",
      "Use AC setting"
    ],
    correctAnswer: 1,
    explanation: "The circuit must be isolated from supply before measuring resistance to ensure safety and accuracy.",
    section: "2.1.3",
    difficulty: "intermediate",
    topic: "Resistance Measurement Safety"
  },
  {
    id: 17,
    question: "What does the prefix 'kilo' mean?",
    options: ["One hundred", "One thousand", "One million", "One tenth"],
    correctAnswer: 1,
    explanation: "The prefix 'kilo' means one thousand (×1000).",
    section: "2.1.4",
    difficulty: "basic",
    topic: "SI Prefixes"
  },
  {
    id: 18,
    question: "What does the prefix 'milli' mean?",
    options: ["One thousand", "One hundredth", "One thousandth", "One tenth"],
    correctAnswer: 2,
    explanation: "The prefix 'milli' means one thousandth (÷1000 or ×0.001).",
    section: "2.1.4",
    difficulty: "basic",
    topic: "SI Prefixes"
  },
  {
    id: 19,
    question: "What does the prefix 'mega' mean?",
    options: ["One thousand", "One million", "One billion", "One hundred"],
    correctAnswer: 1,
    explanation: "The prefix 'mega' means one million (×1,000,000).",
    section: "2.1.4",
    difficulty: "basic",
    topic: "SI Prefixes"
  },
  {
    id: 20,
    question: "What does the prefix 'micro' mean?",
    options: ["One thousandth", "One millionth", "One billionth", "One hundredth"],
    correctAnswer: 1,
    explanation: "The prefix 'micro' means one millionth (÷1,000,000 or ×0.000001).",
    section: "2.1.4",
    difficulty: "basic",
    topic: "SI Prefixes"
  },
  {
    id: 21,
    question: "Convert 0.25 A to milliamps:",
    options: ["25 mA", "250 mA", "2500 mA", "0.25 mA"],
    correctAnswer: 1,
    explanation: "0.25 A = 0.25 × 1000 = 250 mA",
    section: "2.1.4",
    difficulty: "intermediate",
    topic: "Unit Conversions"
  },
  {
    id: 22,
    question: "Convert 1500 mV to volts:",
    options: ["15 V", "1.5 V", "150 V", "0.15 V"],
    correctAnswer: 1,
    explanation: "1500 mV = 1500 ÷ 1000 = 1.5 V",
    section: "2.1.4",
    difficulty: "intermediate",
    topic: "Unit Conversions"
  },
  {
    id: 23,
    question: "What is scientific notation?",
    options: [
      "Writing numbers in words",
      "Expressing numbers as powers of 10",
      "Using only whole numbers",
      "Avoiding decimal points"
    ],
    correctAnswer: 1,
    explanation: "Scientific notation expresses numbers as a coefficient multiplied by a power of 10.",
    section: "2.1.4",
    difficulty: "intermediate",
    topic: "Scientific Notation"
  },
  {
    id: 24,
    question: "Express 2300 in scientific notation:",
    options: ["23 × 10²", "2.3 × 10³", "0.23 × 10⁴", "230 × 10¹"],
    correctAnswer: 1,
    explanation: "2300 = 2.3 × 10³ (2.3 multiplied by 10 to the power of 3)",
    section: "2.1.4",
    difficulty: "intermediate",
    topic: "Scientific Notation"
  },
  {
    id: 25,
    question: "What is an atom?",
    options: [
      "The smallest unit of electric current",
      "The basic unit of matter consisting of protons, neutrons, and electrons",
      "A type of electrical conductor",
      "A measuring instrument"
    ],
    correctAnswer: 1,
    explanation: "An atom is the basic unit of matter, consisting of a nucleus (protons and neutrons) surrounded by electrons.",
    section: "2.1.1",
    difficulty: "basic",
    topic: "Atomic Structure"
  },
  {
    id: 26,
    question: "What charge do electrons have?",
    options: ["Positive", "Negative", "Neutral", "Variable"],
    correctAnswer: 1,
    explanation: "Electrons have a negative electrical charge.",
    section: "2.1.1",
    difficulty: "basic",
    topic: "Atomic Structure"
  },
  {
    id: 27,
    question: "What charge do protons have?",
    options: ["Negative", "Positive", "Neutral", "Variable"],
    correctAnswer: 1,
    explanation: "Protons have a positive electrical charge.",
    section: "2.1.1",
    difficulty: "basic",
    topic: "Atomic Structure"
  },
  {
    id: 28,
    question: "What makes a material a good electrical conductor?",
    options: [
      "It has no electrons",
      "It has many free electrons that can move easily",
      "It has only protons",
      "It has very few electrons"
    ],
    correctAnswer: 1,
    explanation: "Good conductors have many free electrons that can move easily when a voltage is applied.",
    section: "2.1.1",
    difficulty: "intermediate",
    topic: "Electrical Conductivity"
  },
  {
    id: 29,
    question: "What happens to electrons in a conductor when voltage is applied?",
    options: [
      "They stop moving",
      "They move from negative to positive terminal",
      "They disappear",
      "They become protons"
    ],
    correctAnswer: 1,
    explanation: "When voltage is applied, electrons move from the negative terminal towards the positive terminal.",
    section: "2.1.1",
    difficulty: "intermediate",
    topic: "Electron Flow"
  },
  {
    id: 30,
    question: "What is conventional current flow?",
    options: [
      "Electrons flowing from negative to positive",
      "Current assumed to flow from positive to negative",
      "No current flow",
      "Random electron movement"
    ],
    correctAnswer: 1,
    explanation: "Conventional current flow assumes current flows from positive to negative, opposite to actual electron flow.",
    section: "2.1.1",
    difficulty: "intermediate",
    topic: "Current Flow Direction"
  },
  {
    id: 31,
    question: "What is the relationship between electron flow and conventional current?",
    options: [
      "They are the same direction",
      "They are opposite directions",
      "There is no relationship",
      "Electron flow doesn't exist"
    ],
    correctAnswer: 1,
    explanation: "Electron flow (negative to positive) is opposite to conventional current flow (positive to negative).",
    section: "2.1.1",
    difficulty: "intermediate",
    topic: "Current Flow Comparison"
  },
  {
    id: 32,
    question: "What is electrical potential difference?",
    options: [
      "The same as current",
      "The difference in electrical potential between two points",
      "The resistance of a conductor",
      "The power consumed"
    ],
    correctAnswer: 1,
    explanation: "Potential difference is the difference in electrical potential between two points, measured in volts.",
    section: "2.1.2",
    difficulty: "intermediate",
    topic: "Potential Difference"
  },
  {
    id: 33,
    question: "What causes current to flow in a circuit?",
    options: [
      "Resistance",
      "Potential difference (voltage)",
      "Conductors",
      "Insulators"
    ],
    correctAnswer: 1,
    explanation: "Current flows when there is a potential difference (voltage) across a circuit.",
    section: "2.1.2",
    difficulty: "basic",
    topic: "Current Flow Cause"
  },
  {
    id: 34,
    question: "What happens to current when resistance increases in a circuit with constant voltage?",
    options: [
      "Current increases",
      "Current decreases",
      "Current stays the same",
      "Voltage changes"
    ],
    correctAnswer: 1,
    explanation: "According to Ohm's Law, when resistance increases with constant voltage, current decreases.",
    section: "2.1.2",
    difficulty: "intermediate",
    topic: "Resistance Effect on Current"
  },
  {
    id: 35,
    question: "What is the standard unit of charge?",
    options: ["Volt", "Ampere", "Coulomb", "Ohm"],
    correctAnswer: 2,
    explanation: "The coulomb (C) is the standard unit of electrical charge.",
    section: "2.1.2",
    difficulty: "intermediate",
    topic: "Electrical Charge"
  },
  {
    id: 36,
    question: "How much charge passes through a circuit carrying 1 ampere for 1 second?",
    options: ["1 volt", "1 ohm", "1 coulomb", "1 watt"],
    correctAnswer: 2,
    explanation: "1 ampere = 1 coulomb per second, so 1 ampere for 1 second = 1 coulomb.",
    section: "2.1.2",
    difficulty: "intermediate",
    topic: "Current and Charge Relationship"
  },
  {
    id: 37,
    question: "What determines the amount of current that flows in a circuit?",
    options: [
      "Only voltage",
      "Only resistance",
      "Both voltage and resistance",
      "Neither voltage nor resistance"
    ],
    correctAnswer: 2,
    explanation: "Current depends on both voltage (driving force) and resistance (opposition to flow).",
    section: "2.1.2",
    difficulty: "intermediate",
    topic: "Factors Affecting Current"
  },
  {
    id: 38,
    question: "What is earthing in electrical systems?",
    options: [
      "Connecting to soil",
      "Connecting metalwork to earth potential for safety",
      "Burying cables",
      "Installing ground lights"
    ],
    correctAnswer: 1,
    explanation: "Earthing connects exposed metalwork to earth potential to provide protection against electric shock.",
    section: "2.1.5",
    difficulty: "basic",
    topic: "Earthing"
  },
  {
    id: 39,
    question: "Why is earthing important in electrical installations?",
    options: [
      "To save energy",
      "To provide protection against electric shock",
      "To increase voltage",
      "To reduce current"
    ],
    correctAnswer: 1,
    explanation: "Earthing provides protection against electric shock by providing a path for fault currents.",
    section: "2.1.5",
    difficulty: "basic",
    topic: "Earthing Importance"
  },
  {
    id: 40,
    question: "What is the earth potential considered to be?",
    options: ["1 volt", "230 volts", "Zero volts", "Variable"],
    correctAnswer: 2,
    explanation: "Earth potential is considered to be zero volts and is used as a reference point.",
    section: "2.1.5",
    difficulty: "basic",
    topic: "Earth Potential"
  },
  {
    id: 41,
    question: "What is the difference between earthing and bonding?",
    options: [
      "No difference",
      "Earthing connects to earth, bonding connects metalwork together",
      "Bonding is more important",
      "Earthing is only for safety"
    ],
    correctAnswer: 1,
    explanation: "Earthing connects to earth potential, while bonding connects metalwork together to ensure they're at the same potential.",
    section: "2.1.5",
    difficulty: "intermediate",
    topic: "Earthing vs Bonding"
  },
  {
    id: 42,
    question: "What colour is the earth conductor in UK electrical installations?",
    options: ["Red", "Blue", "Green and yellow", "Brown"],
    correctAnswer: 2,
    explanation: "The earth conductor is green and yellow striped in UK electrical installations.",
    section: "2.1.5",
    difficulty: "basic",
    topic: "Earth Conductor Colour"
  },

  // Section 2.2: Ohm's Law and Basic Calculations (42 questions)
  {
    id: 43,
    question: "What is Ohm's Law?",
    options: ["V = I + R", "V = I - R", "V = I × R", "V = I ÷ R"],
    correctAnswer: 2,
    explanation: "Ohm's Law states that V = I × R (Voltage = Current × Resistance).",
    section: "2.2.1",
    difficulty: "basic",
    topic: "Ohm's Law"
  },
  {
    id: 44,
    question: "If a circuit has 12V and 3A, what is the resistance?",
    options: ["4Ω", "9Ω", "15Ω", "36Ω"],
    correctAnswer: 0,
    explanation: "Using R = V/I: R = 12V ÷ 3A = 4Ω",
    section: "2.2.1",
    difficulty: "basic",
    topic: "Resistance Calculation"
  },
  {
    id: 45,
    question: "If a 6Ω resistor has 2A flowing through it, what is the voltage across it?",
    options: ["3V", "8V", "12V", "4V"],
    correctAnswer: 2,
    explanation: "Using V = I × R: V = 2A × 6Ω = 12V",
    section: "2.2.1",
    difficulty: "basic",
    topic: "Voltage Calculation"
  },
  {
    id: 46,
    question: "What current flows through a 10Ω resistor connected to a 20V supply?",
    options: ["0.5A", "2A", "10A", "200A"],
    correctAnswer: 1,
    explanation: "Using I = V/R: I = 20V ÷ 10Ω = 2A",
    section: "2.2.1",
    difficulty: "basic",
    topic: "Current Calculation"
  },
  {
    id: 47,
    question: "What are the three forms of Ohm's Law?",
    options: [
      "V = IR, I = V/R, R = V/I",
      "V = I + R, I = V - R, R = V × I",
      "V = I/R, I = VR, R = I/V",
      "V = R/I, I = R/V, R = VI"
    ],
    correctAnswer: 0,
    explanation: "The three forms are: V = IR, I = V/R, and R = V/I",
    section: "2.2.1",
    difficulty: "intermediate",
    topic: "Ohm's Law Forms"
  },
  {
    id: 48,
    question: "Which triangle helps remember Ohm's Law relationships?",
    options: ["Power triangle", "VIR triangle", "Force triangle", "Speed triangle"],
    correctAnswer: 1,
    explanation: "The VIR triangle helps remember the relationships: V at top, I and R at bottom.",
    section: "2.2.1",
    difficulty: "basic",
    topic: "VIR Triangle"
  },
  {
    id: 49,
    question: "A lamp takes 0.5A from a 230V supply. What is its resistance?",
    options: ["115Ω", "230Ω", "460Ω", "690Ω"],
    correctAnswer: 2,
    explanation: "Using R = V/I: R = 230V ÷ 0.5A = 460Ω",
    section: "2.2.1",
    difficulty: "intermediate",
    topic: "Practical Calculation"
  },
  {
    id: 50,
    question: "What current flows in a circuit with 240V supply and total resistance of 60Ω?",
    options: ["4A", "6A", "8A", "12A"],
    correctAnswer: 0,
    explanation: "Using I = V/R: I = 240V ÷ 60Ω = 4A",
    section: "2.2.1",
    difficulty: "basic",
    topic: "Circuit Current"
  },
  {
    id: 51,
    question: "Before using Ohm's Law, what should you always do with units?",
    options: [
      "Ignore units",
      "Convert to base units (V, A, Ω)",
      "Use any units",
      "Multiply everything by 1000"
    ],
    correctAnswer: 1,
    explanation: "Always convert to base units (V, A, Ω) before calculating to avoid errors.",
    section: "2.2.1",
    difficulty: "intermediate",
    topic: "Unit Conversion"
  },
  {
    id: 52,
    question: "A heating element has resistance of 50Ω. What current does it take from 230V?",
    options: ["2.3A", "4.6A", "11.5A", "23A"],
    correctAnswer: 1,
    explanation: "Using I = V/R: I = 230V ÷ 50Ω = 4.6A",
    section: "2.2.1",
    difficulty: "intermediate",
    topic: "Heating Element Calculation"
  },
  {
    id: 53,
    question: "What does transposition mean in electrical formulas?",
    options: [
      "Changing the order of letters",
      "Rearranging the formula to make a different quantity the subject",
      "Adding numbers together",
      "Converting units"
    ],
    correctAnswer: 1,
    explanation: "Transposition means rearranging a formula to make a different quantity the subject.",
    section: "2.2.2",
    difficulty: "intermediate",
    topic: "Formula Transposition"
  },
  {
    id: 54,
    question: "To find I from V = IR, how do you transpose the formula?",
    options: ["I = V × R", "I = V - R", "I = V ÷ R", "I = R ÷ V"],
    correctAnswer: 2,
    explanation: "To isolate I, divide both sides by R: I = V ÷ R",
    section: "2.2.2",
    difficulty: "intermediate",
    topic: "Formula Transposition"
  },
  {
    id: 55,
    question: "To find R from V = IR, how do you transpose the formula?",
    options: ["R = V × I", "R = V ÷ I", "R = V - I", "R = I ÷ V"],
    correctAnswer: 1,
    explanation: "To isolate R, divide both sides by I: R = V ÷ I",
    section: "2.2.2",
    difficulty: "intermediate",
    topic: "Formula Transposition"
  },
  {
    id: 56,
    question: "What is conductance?",
    options: [
      "The same as resistance",
      "The reciprocal of resistance",
      "The square of resistance",
      "Double the resistance"
    ],
    correctAnswer: 1,
    explanation: "Conductance is the reciprocal of resistance: G = 1/R",
    section: "2.2.3",
    difficulty: "intermediate",
    topic: "Conductance"
  },
  {
    id: 57,
    question: "What is the unit of conductance?",
    options: ["Ohms", "Siemens", "Volts", "Amperes"],
    correctAnswer: 1,
    explanation: "Conductance is measured in Siemens (S), which is the reciprocal of ohms.",
    section: "2.2.3",
    difficulty: "intermediate",
    topic: "Conductance Units"
  },
  {
    id: 58,
    question: "If resistance is 5Ω, what is the conductance?",
    options: ["0.2S", "5S", "25S", "0.5S"],
    correctAnswer: 0,
    explanation: "Conductance G = 1/R = 1/5Ω = 0.2S",
    section: "2.2.3",
    difficulty: "intermediate",
    topic: "Conductance Calculation"
  },
  {
    id: 59,
    question: "What relationship exists between conductance and resistance?",
    options: [
      "They are directly proportional",
      "They are inversely proportional", 
      "They are equal",
      "No relationship exists"
    ],
    correctAnswer: 1,
    explanation: "Conductance and resistance are inversely proportional - as one increases, the other decreases.",
    section: "2.2.3",
    difficulty: "intermediate",
    topic: "Conductance-Resistance Relationship"
  },
  {
    id: 60,
    question: "A circuit contains components with 2V, 3V, and 4V across them. What is the supply voltage?",
    options: ["2V", "4V", "9V", "Cannot determine"],
    correctAnswer: 3,
    explanation: "Cannot determine without knowing if components are in series or parallel.",
    section: "2.2.4",
    difficulty: "intermediate",
    topic: "Voltage Distribution"
  },
  {
    id: 61,
    question: "What mathematical operations are commonly needed for electrical calculations?",
    options: [
      "Only addition",
      "Addition, subtraction, multiplication, division",
      "Only multiplication",
      "Only division"
    ],
    correctAnswer: 1,
    explanation: "Electrical calculations commonly require addition, subtraction, multiplication, and division.",
    section: "2.2.4",
    difficulty: "basic",
    topic: "Mathematical Operations"
  },
  {
    id: 62,
    question: "When calculating circuit values, what should be checked first?",
    options: [
      "The answer",
      "That all values are in the same units",
      "The calculator",
      "Previous calculations"
    ],
    correctAnswer: 1,
    explanation: "Always ensure all values are in compatible units before performing calculations.",
    section: "2.2.4",
    difficulty: "intermediate",
    topic: "Calculation Procedures"
  },
  {
    id: 63,
    question: "What is the purpose of checking calculations?",
    options: [
      "To waste time",
      "To ensure accuracy and avoid dangerous errors",
      "To impress others",
      "No purpose"
    ],
    correctAnswer: 1,
    explanation: "Checking calculations ensures accuracy and prevents potentially dangerous errors in electrical work.",
    section: "2.2.4",
    difficulty: "basic",
    topic: "Calculation Checking"
  },
  {
    id: 64,
    question: "What is a reasonable check for electrical calculations?",
    options: [
      "Order of magnitude estimation",
      "Asking someone else",
      "Using different formulas",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "Order of magnitude estimation, verification by others, and using alternative methods all help verify calculations.",
    section: "2.2.4",
    difficulty: "intermediate",
    topic: "Calculation Verification"
  },
  {
    id: 65,
    question: "Convert 2.5 kΩ to ohms:",
    options: ["25Ω", "250Ω", "2500Ω", "25000Ω"],
    correctAnswer: 2,
    explanation: "2.5 kΩ = 2.5 × 1000 = 2500Ω",
    section: "2.2.4",
    difficulty: "intermediate",
    topic: "Unit Conversion Practice"
  },
  {
    id: 66,
    question: "Convert 750 mA to amperes:",
    options: ["7.5A", "0.75A", "75A", "0.075A"],
    correctAnswer: 1,
    explanation: "750 mA = 750 ÷ 1000 = 0.75A",
    section: "2.2.4",
    difficulty: "intermediate",
    topic: "Unit Conversion Practice"
  },
  {
    id: 67,
    question: "A 3.3kΩ resistor carries 5mA. What is the voltage across it?",
    options: ["16.5V", "1.65V", "165V", "0.165V"],
    correctAnswer: 0,
    explanation: "Convert units: 3.3kΩ = 3300Ω, 5mA = 0.005A. V = I×R = 0.005×3300 = 16.5V",
    section: "2.2.4",
    difficulty: "intermediate",
    topic: "Mixed Unit Calculations"
  },
  {
    id: 68,
    question: "What happens to Ohm's Law at very high frequencies?",
    options: [
      "It becomes more accurate",
      "Reactive effects may need to be considered",
      "It stops working",
      "Current becomes voltage"
    ],
    correctAnswer: 1,
    explanation: "At high frequencies, reactive effects (capacitance and inductance) may become significant.",
    section: "2.2.5",
    difficulty: "advanced",
    topic: "Frequency Effects"
  },
  {
    id: 69,
    question: "Does Ohm's Law apply to all materials?",
    options: [
      "Yes, to all materials",
      "Only to ohmic materials (linear resistance)",
      "Only to metals",
      "Only to insulators"
    ],
    correctAnswer: 1,
    explanation: "Ohm's Law only applies to ohmic materials that have linear voltage-current relationships.",
    section: "2.2.5",
    difficulty: "advanced",
    topic: "Material Limitations"
  },
  {
    id: 70,
    question: "What is an ohmic material?",
    options: [
      "Any conductor",
      "A material where resistance remains constant with changing voltage",
      "Only copper",
      "Any metal"
    ],
    correctAnswer: 1,
    explanation: "An ohmic material has constant resistance regardless of the applied voltage (linear V-I relationship).",
    section: "2.2.5",
    difficulty: "advanced",
    topic: "Ohmic Materials"
  },
  {
    id: 71,
    question: "Give an example of a non-ohmic device:",
    options: ["Copper wire", "Carbon resistor", "LED", "Metal film resistor"],
    correctAnswer: 2,
    explanation: "LEDs are non-ohmic - their resistance changes significantly with applied voltage.",
    section: "2.2.5",
    difficulty: "advanced",
    topic: "Non-ohmic Devices"
  },
  {
    id: 72,
    question: "What causes resistance in conductors?",
    options: [
      "Nothing",
      "Collisions between electrons and atoms",
      "Magnetic fields",
      "Electric fields"
    ],
    correctAnswer: 1,
    explanation: "Resistance is caused by collisions between moving electrons and atoms in the conductor material.",
    section: "2.2.6",
    difficulty: "intermediate",
    topic: "Resistance Mechanism"
  },
  {
    id: 73,
    question: "How does temperature affect the resistance of most metals?",
    options: [
      "No effect",
      "Higher temperature increases resistance",
      "Higher temperature decreases resistance",
      "Temperature doubles resistance"
    ],
    correctAnswer: 1,
    explanation: "For most metals, resistance increases with temperature due to increased atomic vibration.",
    section: "2.2.6",
    difficulty: "intermediate",
    topic: "Temperature Effects"
  },
  {
    id: 74,
    question: "What is superconductivity?",
    options: [
      "Very high resistance",
      "Zero electrical resistance at very low temperatures",
      "High voltage",
      "Fast current flow"
    ],
    correctAnswer: 1,
    explanation: "Superconductivity is the phenomenon where certain materials have zero electrical resistance at very low temperatures.",
    section: "2.2.6",
    difficulty: "advanced",
    topic: "Superconductivity"
  },
  {
    id: 75,
    question: "What practical benefit would room-temperature superconductors provide?",
    options: [
      "No benefits",
      "Elimination of power transmission losses",
      "Higher voltages only",
      "Prettier cables"
    ],
    correctAnswer: 1,
    explanation: "Room-temperature superconductors would eliminate resistance losses in power transmission and electrical equipment.",
    section: "2.2.6",
    difficulty: "advanced",
    topic: "Superconductor Applications"
  },
  {
    id: 76,
    question: "In practical electrical work, what should always be considered along with Ohm's Law?",
    options: [
      "Only the calculations",
      "Safety, temperature effects, and component ratings",
      "Only the cost",
      "Only the appearance"
    ],
    correctAnswer: 1,
    explanation: "Practical electrical work must consider safety, temperature effects, and component ratings alongside calculations.",
    section: "2.2.6",
    difficulty: "intermediate",
    topic: "Practical Considerations"
  },
  {
    id: 77,
    question: "Why might calculated and measured values differ in real circuits?",
    options: [
      "Calculations are always wrong",
      "Component tolerances, temperature, and parasitic effects",
      "Measurements are always wrong",
      "No difference should exist"
    ],
    correctAnswer: 1,
    explanation: "Real circuits have component tolerances, temperature variations, and parasitic effects not in ideal calculations.",
    section: "2.2.6",
    difficulty: "intermediate",
    topic: "Theory vs Reality"
  },
  {
    id: 78,
    question: "What is meant by component tolerance?",
    options: [
      "How much voltage it can handle",
      "The acceptable variation from the nominal value",
      "Its physical size",
      "Its colour"
    ],
    correctAnswer: 1,
    explanation: "Component tolerance is the acceptable percentage variation from the stated nominal value.",
    section: "2.2.6",
    difficulty: "intermediate",
    topic: "Component Tolerance"
  },
  {
    id: 79,
    question: "A resistor marked as 100Ω ±5% could actually have a resistance between:",
    options: ["95Ω and 105Ω", "90Ω and 110Ω", "50Ω and 150Ω", "99Ω and 101Ω"],
    correctAnswer: 0,
    explanation: "±5% of 100Ω = ±5Ω, so the range is 95Ω to 105Ω",
    section: "2.2.6",
    difficulty: "intermediate",
    topic: "Tolerance Calculation"
  },
  {
    id: 80,
    question: "When using Ohm's Law for circuit design, what must be considered?",
    options: [
      "Only the resistance",
      "Power ratings, current capacity, and safety margins",
      "Only the voltage",
      "Only the current"
    ],
    correctAnswer: 1,
    explanation: "Circuit design must consider power ratings, current carrying capacity, and appropriate safety margins.",
    section: "2.2.6",
    difficulty: "intermediate",
    topic: "Design Considerations"
  },
  {
    id: 81,
    question: "What is a safety margin in electrical design?",
    options: [
      "Extra cost",
      "Operating below maximum ratings to ensure reliability",
      "Extra time",
      "Extra space"
    ],
    correctAnswer: 1,
    explanation: "Safety margins ensure components operate below their maximum ratings for reliability and safety.",
    section: "2.2.6",
    difficulty: "intermediate",
    topic: "Safety Margins"
  },
  {
    id: 82,
    question: "Why should you never operate components at their absolute maximum ratings?",
    options: [
      "It's unnecessary",
      "It reduces lifespan and increases failure risk",
      "It costs more",
      "It's illegal"
    ],
    correctAnswer: 1,
    explanation: "Operating at maximum ratings reduces component lifespan and increases the risk of failure.",
    section: "2.2.6",
    difficulty: "intermediate",
    topic: "Component Derating"
  },
  {
    id: 83,
    question: "What percentage derating is commonly used for electronic components?",
    options: ["0%", "10-20%", "50%", "90%"],
    correctAnswer: 1,
    explanation: "Common practice is to derate components by 10-20% below their maximum ratings.",
    section: "2.2.6",
    difficulty: "intermediate",
    topic: "Derating Guidelines"
  },
  {
    id: 84,
    question: "In electrical calculations, how many significant figures should typically be used?",
    options: ["1", "2-3", "10", "As many as possible"],
    correctAnswer: 1,
    explanation: "Typically 2-3 significant figures are appropriate for electrical calculations, matching component accuracy.",
    section: "2.2.6",
    difficulty: "intermediate",
    topic: "Significant Figures"
  },

  // Section 2.3: Series and Parallel Circuits (42 questions)
  {
    id: 85,
    question: "In a series circuit, current is:",
    options: [
      "Different through each component",
      "The same through all components",
      "Zero at some points",
      "Highest at the beginning"
    ],
    correctAnswer: 1,
    explanation: "In series circuits, current is the same throughout because there is only one path for current flow.",
    section: "2.3.1",
    difficulty: "basic",
    topic: "Series Current"
  },
  {
    id: 86,
    question: "In a series circuit, how do the voltages across components relate to the supply voltage?",
    options: [
      "Each equals the supply voltage",
      "They add up to equal the supply voltage",
      "They are all zero",
      "They are all half the supply voltage"
    ],
    correctAnswer: 1,
    explanation: "In series circuits, the sum of individual voltages equals the total supply voltage.",
    section: "2.3.1",
    difficulty: "basic",
    topic: "Series Voltage"
  },
  {
    id: 87,
    question: "How is total resistance calculated in a series circuit?",
    options: [
      "R_total = 1/(R1 + R2 + R3)",
      "R_total = R1 + R2 + R3",
      "R_total = R1 × R2 × R3",
      "R_total = (R1 + R2)/R3"
    ],
    correctAnswer: 1,
    explanation: "In series circuits, total resistance is the sum of all individual resistances.",
    section: "2.3.1",
    difficulty: "basic",
    topic: "Series Resistance"
  },
  {
    id: 88,
    question: "Three resistors of 2Ω, 3Ω, and 5Ω are connected in series. What is the total resistance?",
    options: ["1Ω", "5Ω", "10Ω", "30Ω"],
    correctAnswer: 2,
    explanation: "R_total = 2Ω + 3Ω + 5Ω = 10Ω",
    section: "2.3.1",
    difficulty: "basic",
    topic: "Series Resistance Calculation"
  },
  {
    id: 89,
    question: "What happens if one component fails (open circuit) in a series circuit?",
    options: [
      "Other components work normally",
      "All components stop working",
      "Only that component stops",
      "Nothing changes"
    ],
    correctAnswer: 1,
    explanation: "In series circuits, if one component fails open circuit, the circuit is broken and all components stop working.",
    section: "2.3.1",
    difficulty: "basic",
    topic: "Series Circuit Failure"
  },
  {
    id: 90,
    question: "In a parallel circuit, voltage across each branch is:",
    options: [
      "Different for each branch",
      "The same as the supply voltage",
      "Zero",
      "Half the supply voltage"
    ],
    correctAnswer: 1,
    explanation: "In parallel circuits, voltage across each branch equals the supply voltage.",
    section: "2.3.2",
    difficulty: "basic",
    topic: "Parallel Voltage"
  },
  {
    id: 91,
    question: "In a parallel circuit, how does current divide?",
    options: [
      "Equally through all branches",
      "According to branch resistance (inversely proportional)",
      "All current goes through one branch",
      "No current flows"
    ],
    correctAnswer: 1,
    explanation: "Current divides inversely proportional to resistance - lower resistance branches carry more current.",
    section: "2.3.2",
    difficulty: "intermediate",
    topic: "Parallel Current Division"
  },
  {
    id: 92,
    question: "How is total resistance calculated for two resistors in parallel?",
    options: [
      "R_total = R1 + R2",
      "R_total = (R1 × R2)/(R1 + R2)",
      "R_total = R1 - R2",
      "R_total = R1/R2"
    ],
    correctAnswer: 1,
    explanation: "For two resistors in parallel: R_total = (R1 × R2)/(R1 + R2)",
    section: "2.3.2",
    difficulty: "intermediate",
    topic: "Parallel Resistance Formula"
  },
  {
    id: 93,
    question: "Two 6Ω resistors are connected in parallel. What is the total resistance?",
    options: ["12Ω", "6Ω", "3Ω", "1Ω"],
    correctAnswer: 2,
    explanation: "R_total = (6 × 6)/(6 + 6) = 36/12 = 3Ω",
    section: "2.3.2",
    difficulty: "intermediate",
    topic: "Parallel Resistance Calculation"
  },
  {
    id: 94,
    question: "What happens to total resistance when resistors are connected in parallel?",
    options: [
      "It increases",
      "It decreases (becomes less than the smallest resistor)",
      "It stays the same",
      "It becomes infinite"
    ],
    correctAnswer: 1,
    explanation: "Parallel resistance is always less than the smallest individual resistor.",
    section: "2.3.2",
    difficulty: "intermediate",
    topic: "Parallel Resistance Effect"
  },
  {
    id: 95,
    question: "What happens if one branch fails (open circuit) in a parallel circuit?",
    options: [
      "All branches stop working",
      "Other branches continue to work normally",
      "Total current increases",
      "Voltage drops to zero"
    ],
    correctAnswer: 1,
    explanation: "In parallel circuits, other branches continue to work if one branch fails open circuit.",
    section: "2.3.2",
    difficulty: "basic",
    topic: "Parallel Circuit Failure"
  },
  {
    id: 96,
    question: "What is the general formula for resistors in parallel?",
    options: [
      "1/R_total = R1 + R2 + R3",
      "1/R_total = 1/R1 + 1/R2 + 1/R3",
      "R_total = 1/R1 + 1/R2 + 1/R3",
      "R_total = R1 × R2 × R3"
    ],
    correctAnswer: 1,
    explanation: "For parallel resistors: 1/R_total = 1/R1 + 1/R2 + 1/R3 + ...",
    section: "2.3.2",
    difficulty: "intermediate",
    topic: "General Parallel Formula"
  },
  {
    id: 97,
    question: "Three equal resistors are connected in parallel. If each is 12Ω, what is the total resistance?",
    options: ["36Ω", "12Ω", "4Ω", "3Ω"],
    correctAnswer: 2,
    explanation: "For n equal resistors in parallel: R_total = R/n = 12Ω/3 = 4Ω",
    section: "2.3.2",
    difficulty: "intermediate",
    topic: "Equal Parallel Resistors"
  },
  {
    id: 98,
    question: "In which circuit configuration do components share voltage?",
    options: ["Series", "Parallel", "Both", "Neither"],
    correctAnswer: 0,
    explanation: "In series circuits, components share (divide) the total voltage between them.",
    section: "2.3.3",
    difficulty: "basic",
    topic: "Voltage Sharing"
  },
  {
    id: 99,
    question: "In which circuit configuration do components share current?",
    options: ["Series", "Parallel", "Both", "Neither"],
    correctAnswer: 1,
    explanation: "In parallel circuits, components share (divide) the total current between them.",
    section: "2.3.3",
    difficulty: "basic",
    topic: "Current Sharing"
  },
  {
    id: 100,
    question: "Which circuit type is commonly used for domestic lighting?",
    options: ["Series only", "Parallel only", "Both equally", "Neither"],
    correctAnswer: 1,
    explanation: "Domestic lighting uses parallel circuits so each light can be controlled independently.",
    section: "2.3.3",
    difficulty: "basic",
    topic: "Domestic Applications"
  },
  {
    id: 101,
    question: "Why are Christmas tree lights often wired in series?",
    options: [
      "Better lighting",
      "Cost reduction and voltage sharing",
      "Safety reasons",
      "Easier installation"
    ],
    correctAnswer: 1,
    explanation: "Series wiring reduces costs and allows many low-voltage bulbs to share the mains voltage.",
    section: "2.3.3",
    difficulty: "intermediate",
    topic: "Christmas Light Applications"
  },
  {
    id: 102,
    question: "What is a disadvantage of series-wired Christmas lights?",
    options: [
      "Too bright",
      "If one bulb fails, all go out",
      "Use too much power",
      "Too expensive"
    ],
    correctAnswer: 1,
    explanation: "The main disadvantage is that failure of one bulb breaks the circuit and all lights go out.",
    section: "2.3.3",
    difficulty: "basic",
    topic: "Series Circuit Disadvantages"
  },
  {
    id: 103,
    question: "In a series circuit with a 12V supply and three equal resistors, what is the voltage across each resistor?",
    options: ["12V", "6V", "4V", "3V"],
    correctAnswer: 2,
    explanation: "With equal resistors in series, voltage divides equally: 12V ÷ 3 = 4V each",
    section: "2.3.4",
    difficulty: "basic",
    topic: "Voltage Division"
  },
  {
    id: 104,
    question: "What is a voltage divider?",
    options: [
      "A type of resistor",
      "A circuit that produces a fraction of the input voltage",
      "A measuring instrument",
      "A type of switch"
    ],
    correctAnswer: 1,
    explanation: "A voltage divider is a series circuit that produces an output voltage that is a fraction of the input voltage.",
    section: "2.3.4",
    difficulty: "intermediate",
    topic: "Voltage Divider Concept"
  },
  {
    id: 105,
    question: "In a voltage divider with R1 = 3Ω and R2 = 6Ω connected to 9V, what is the voltage across R2?",
    options: ["3V", "6V", "9V", "4.5V"],
    correctAnswer: 1,
    explanation: "V_R2 = (R2/(R1+R2)) × V_supply = (6/(3+6)) × 9V = 6V",
    section: "2.3.4",
    difficulty: "intermediate",
    topic: "Voltage Divider Calculation"
  },
  {
    id: 106,
    question: "What is current division?",
    options: [
      "Sharing current between parallel branches",
      "Reducing current in series",
      "Measuring current",
      "Stopping current flow"
    ],
    correctAnswer: 0,
    explanation: "Current division is the sharing of total current between parallel branches according to their resistances.",
    section: "2.3.4",
    difficulty: "intermediate",
    topic: "Current Division Concept"
  },
  {
    id: 107,
    question: "In parallel branches, which branch carries more current?",
    options: [
      "The branch with higher resistance",
      "The branch with lower resistance",
      "They all carry equal current",
      "The longest branch"
    ],
    correctAnswer: 1,
    explanation: "The branch with lower resistance carries more current (current and resistance are inversely related).",
    section: "2.3.4",
    difficulty: "intermediate",
    topic: "Current Division Rule"
  },
  {
    id: 108,
    question: "Two parallel branches have resistances of 4Ω and 12Ω. If total current is 8A, what current flows through the 4Ω branch?",
    options: ["2A", "4A", "6A", "8A"],
    correctAnswer: 2,
    explanation: "I_4Ω = I_total × (R_other/(R_4Ω + R_other)) = 8A × (12/(4+12)) = 6A",
    section: "2.3.4",
    difficulty: "intermediate",
    topic: "Current Division Calculation"
  },
  {
    id: 109,
    question: "What is a mixed circuit?",
    options: [
      "A circuit with different voltages",
      "A circuit containing both series and parallel combinations",
      "A circuit with AC and DC",
      "A damaged circuit"
    ],
    correctAnswer: 1,
    explanation: "A mixed circuit contains both series and parallel combinations of components.",
    section: "2.3.5",
    difficulty: "intermediate",
    topic: "Mixed Circuits"
  },
  {
    id: 110,
    question: "How should mixed circuits be analyzed?",
    options: [
      "All at once",
      "Break down into series and parallel sections, solve step by step",
      "Ignore parallel sections",
      "Ignore series sections"
    ],
    correctAnswer: 1,
    explanation: "Mixed circuits should be broken down into individual series and parallel sections and solved systematically.",
    section: "2.3.5",
    difficulty: "intermediate",
    topic: "Mixed Circuit Analysis"
  },
  {
    id: 111,
    question: "In mixed circuit analysis, what should be calculated first?",
    options: [
      "Total voltage",
      "Equivalent resistance of parallel combinations",
      "Total current",
      "Individual currents"
    ],
    correctAnswer: 1,
    explanation: "Start by calculating equivalent resistance of parallel combinations, then treat as series.",
    section: "2.3.5",
    difficulty: "intermediate",
    topic: "Mixed Circuit Solution Order"
  },
  {
    id: 112,
    question: "What is Kirchhoff's Current Law (KCL)?",
    options: [
      "Current is the same everywhere",
      "The sum of currents entering a junction equals the sum leaving",
      "Current flows in circles",
      "Current increases with voltage"
    ],
    correctAnswer: 1,
    explanation: "KCL states that the sum of currents entering a junction equals the sum of currents leaving (current is conserved).",
    section: "2.3.6",
    difficulty: "intermediate",
    topic: "Kirchhoff's Current Law"
  },
  {
    id: 113,
    question: "What is Kirchhoff's Voltage Law (KVL)?",
    options: [
      "Voltage is the same everywhere",
      "The sum of voltages around any closed loop equals zero",
      "Voltage always increases",
      "Voltage creates current"
    ],
    correctAnswer: 1,
    explanation: "KVL states that the algebraic sum of voltages around any closed loop equals zero.",
    section: "2.3.6",
    difficulty: "intermediate",
    topic: "Kirchhoff's Voltage Law"
  },
  {
    id: 114,
    question: "At a junction where 5A enters and two currents of 2A and 1A leave, what is the third current?",
    options: ["1A leaving", "2A leaving", "2A entering", "5A leaving"],
    correctAnswer: 1,
    explanation: "By KCL: currents in = currents out, so 5A = 2A + 1A + I3, therefore I3 = 2A leaving",
    section: "2.3.6",
    difficulty: "intermediate",
    topic: "KCL Application"
  },
  {
    id: 115,
    question: "Why are Kirchhoff's Laws important?",
    options: [
      "They are not important",
      "They allow analysis of complex circuits",
      "They only apply to simple circuits",
      "They replace Ohm's Law"
    ],
    correctAnswer: 1,
    explanation: "Kirchhoff's Laws provide the foundation for analyzing complex circuits that can't be simplified to simple series/parallel combinations.",
    section: "2.3.6",
    difficulty: "intermediate",
    topic: "Kirchhoff's Laws Importance"
  },
  {
    id: 116,
    question: "In circuit analysis, what is a node?",
    options: [
      "A resistor",
      "A point where two or more components connect",
      "A battery",
      "A switch"
    ],
    correctAnswer: 1,
    explanation: "A node is a connection point where two or more circuit components meet.",
    section: "2.3.6",
    difficulty: "intermediate",
    topic: "Circuit Terminology"
  },
  {
    id: 117,
    question: "What is a branch in circuit analysis?",
    options: [
      "A connection point",
      "A path between two nodes",
      "A measuring instrument",
      "A type of resistor"
    ],
    correctAnswer: 1,
    explanation: "A branch is a path between two nodes, typically containing one or more components.",
    section: "2.3.6",
    difficulty: "intermediate",
    topic: "Circuit Terminology"
  },
  {
    id: 118,
    question: "What is a loop in circuit analysis?",
    options: [
      "A circular component",
      "A closed path through the circuit",
      "A type of wire",
      "A measurement error"
    ],
    correctAnswer: 1,
    explanation: "A loop is any closed path through the circuit, starting and ending at the same point.",
    section: "2.3.6",
    difficulty: "intermediate",
    topic: "Circuit Terminology"
  },
  {
    id: 119,
    question: "When resistors are connected in series, what increases?",
    options: [
      "Current",
      "Total resistance",
      "Voltage across individual resistors",
      "Power efficiency"
    ],
    correctAnswer: 1,
    explanation: "Connecting resistors in series always increases the total resistance.",
    section: "2.3.7",
    difficulty: "basic",
    topic: "Series Effects"
  },
  {
    id: 120,
    question: "When resistors are connected in parallel, what decreases?",
    options: [
      "Voltage",
      "Total resistance",
      "Current capability",
      "Power handling"
    ],
    correctAnswer: 1,
    explanation: "Connecting resistors in parallel always decreases the total resistance.",
    section: "2.3.7",
    difficulty: "basic",
    topic: "Parallel Effects"
  },
  {
    id: 121,
    question: "Which connection method provides the lowest total resistance?",
    options: ["Series", "Parallel", "Mixed", "All the same"],
    correctAnswer: 1,
    explanation: "Parallel connection always provides the lowest total resistance.",
    section: "2.3.7",
    difficulty: "basic",
    topic: "Resistance Comparison"
  },
  {
    id: 122,
    question: "Which connection method allows independent control of components?",
    options: ["Series", "Parallel", "Both", "Neither"],
    correctAnswer: 1,
    explanation: "Parallel connection allows independent control because each component has its own complete circuit.",
    section: "2.3.7",
    difficulty: "basic",
    topic: "Control Independence"
  },
  {
    id: 123,
    question: "In house wiring, why are outlets connected in parallel?",
    options: [
      "Cheaper wiring",
      "Each outlet gets full voltage and works independently",
      "Uses less current",
      "Easier installation"
    ],
    correctAnswer: 1,
    explanation: "Parallel connection ensures each outlet receives full voltage and operates independently of others.",
    section: "2.3.7",
    difficulty: "basic",
    topic: "Domestic Wiring"
  },
  {
    id: 124,
    question: "What happens to power consumption when loads are connected in parallel?",
    options: [
      "Power decreases",
      "Power increases (more total current drawn)",
      "Power stays the same",
      "Power becomes zero"
    ],
    correctAnswer: 1,
    explanation: "Parallel loads increase total current drawn, therefore increasing total power consumption.",
    section: "2.3.7",
    difficulty: "intermediate",
    topic: "Parallel Power Effects"
  },
  {
    id: 125,
    question: "If you add more parallel branches to a circuit, what happens to total current?",
    options: [
      "Decreases",
      "Increases",
      "Stays the same",
      "Becomes zero"
    ],
    correctAnswer: 1,
    explanation: "Adding parallel branches decreases total resistance, which increases total current (V/R increases).",
    section: "2.3.7",
    difficulty: "intermediate",
    topic: "Adding Parallel Branches"
  },
  {
    id: 126,
    question: "What is the main safety advantage of parallel wiring in buildings?",
    options: [
      "Lower voltage",
      "If one circuit fails, others continue to work",
      "Uses less current",
      "Prevents electric shock"
    ],
    correctAnswer: 1,
    explanation: "Parallel wiring provides redundancy - if one circuit fails, other circuits continue to operate.",
    section: "2.3.7",
    difficulty: "basic",
    topic: "Parallel Safety Advantages"
  },

  // Section 2.4: AC and DC Supply (42 questions)
  {
    id: 127,
    question: "What is the fundamental difference between AC and DC?",
    options: [
      "AC has higher voltage",
      "AC alternates direction; DC flows in one direction",
      "AC is safer",
      "AC has no frequency"
    ],
    correctAnswer: 1,
    explanation: "AC (Alternating Current) periodically reverses direction; DC (Direct Current) flows in one constant direction.",
    section: "2.4.1",
    difficulty: "basic",
    topic: "AC vs DC Basics"
  },
  {
    id: 128,
    question: "What does AC stand for?",
    options: ["Automatic Current", "Alternating Current", "Advanced Current", "Amplified Current"],
    correctAnswer: 1,
    explanation: "AC stands for Alternating Current.",
    section: "2.4.1",
    difficulty: "basic",
    topic: "AC Definition"
  },
  {
    id: 129,
    question: "What does DC stand for?",
    options: ["Direct Current", "Dynamic Current", "Distributed Current", "Dual Current"],
    correctAnswer: 0,
    explanation: "DC stands for Direct Current.",
    section: "2.4.1",
    difficulty: "basic",
    topic: "DC Definition"
  },
  {
    id: 130,
    question: "What is the mains supply frequency in the UK?",
    options: ["25 Hz", "50 Hz", "60 Hz", "100 Hz"],
    correctAnswer: 1,
    explanation: "The UK mains supply frequency is 50 Hz (50 cycles per second).",
    section: "2.4.1",
    difficulty: "basic",
    topic: "UK Mains Frequency"
  },
  {
    id: 131,
    question: "What is the standard domestic voltage in the UK?",
    options: ["110V", "230V", "240V", "415V"],
    correctAnswer: 1,
    explanation: "The standard domestic voltage in the UK is 230V AC.",
    section: "2.4.1",
    difficulty: "basic",
    topic: "UK Domestic Voltage"
  },
  {
    id: 132,
    question: "What is frequency in AC supply?",
    options: [
      "The voltage level",
      "The number of complete cycles per second",
      "The current magnitude",
      "The power rating"
    ],
    correctAnswer: 1,
    explanation: "Frequency is the number of complete AC cycles that occur in one second, measured in Hertz (Hz).",
    section: "2.4.2",
    difficulty: "basic",
    topic: "AC Frequency"
  },
  {
    id: 133,
    question: "What is one complete cycle of AC?",
    options: [
      "Positive peak only",
      "One complete positive and negative alternation",
      "Negative peak only",
      "Zero crossing only"
    ],
    correctAnswer: 1,
    explanation: "One complete AC cycle includes one positive alternation and one negative alternation.",
    section: "2.4.2",
    difficulty: "basic",
    topic: "AC Cycle"
  },
  {
    id: 134,
    question: "What is the unit of frequency?",
    options: ["Volts", "Amperes", "Hertz", "Watts"],
    correctAnswer: 2,
    explanation: "Frequency is measured in Hertz (Hz), named after Heinrich Hertz.",
    section: "2.4.2",
    difficulty: "basic",
    topic: "Frequency Units"
  },
  {
    id: 135,
    question: "If the frequency is 50 Hz, how long does one cycle take?",
    options: ["0.02 seconds", "0.05 seconds", "2 seconds", "50 seconds"],
    correctAnswer: 0,
    explanation: "Period = 1/frequency = 1/50 Hz = 0.02 seconds (20 milliseconds)",
    section: "2.4.2",
    difficulty: "intermediate",
    topic: "Period Calculation"
  },
  {
    id: 136,
    question: "What is the period of an AC waveform?",
    options: [
      "The peak voltage",
      "The time for one complete cycle",
      "The frequency",
      "The average voltage"
    ],
    correctAnswer: 1,
    explanation: "The period is the time taken for one complete cycle of the AC waveform.",
    section: "2.4.2",
    difficulty: "basic",
    topic: "AC Period"
  },
  {
    id: 137,
    question: "What is peak voltage?",
    options: [
      "The average voltage",
      "The maximum voltage reached in either direction",
      "The RMS voltage",
      "The zero voltage"
    ],
    correctAnswer: 1,
    explanation: "Peak voltage is the maximum instantaneous voltage reached in either positive or negative direction.",
    section: "2.4.3",
    difficulty: "basic",
    topic: "Peak Voltage"
  },
  {
    id: 138,
    question: "What is peak-to-peak voltage?",
    options: [
      "Same as peak voltage",
      "The voltage difference between positive and negative peaks",
      "The average voltage",
      "The RMS voltage"
    ],
    correctAnswer: 1,
    explanation: "Peak-to-peak voltage is the total voltage swing from positive peak to negative peak.",
    section: "2.4.3",
    difficulty: "basic",
    topic: "Peak-to-Peak Voltage"
  },
  {
    id: 139,
    question: "What does RMS stand for?",
    options: [
      "Really Mean Square",
      "Root Mean Square",
      "Relative Mean Signal",
      "Rapid Measurement System"
    ],
    correctAnswer: 1,
    explanation: "RMS stands for Root Mean Square.",
    section: "2.4.3",
    difficulty: "basic",
    topic: "RMS Definition"
  },
  {
    id: 140,
    question: "What is RMS voltage?",
    options: [
      "The peak voltage",
      "The equivalent DC voltage that would produce the same heating effect",
      "The average voltage",
      "The minimum voltage"
    ],
    correctAnswer: 1,
    explanation: "RMS voltage is the equivalent DC voltage that would produce the same heating effect in a resistive load.",
    section: "2.4.3",
    difficulty: "intermediate",
    topic: "RMS Voltage Meaning"
  },
  {
    id: 141,
    question: "For a sinusoidal AC voltage, what is the relationship between peak and RMS values?",
    options: [
      "Peak = RMS",
      "Peak = RMS × 1.414",
      "Peak = RMS × 2",
      "Peak = RMS ÷ 2"
    ],
    correctAnswer: 1,
    explanation: "For sinusoidal AC: Peak voltage = RMS voltage × 1.414 (√2)",
    section: "2.4.3",
    difficulty: "intermediate",
    topic: "Peak-RMS Relationship"
  },
  {
    id: 142,
    question: "If the RMS voltage is 230V, what is the peak voltage?",
    options: ["163V", "230V", "325V", "460V"],
    correctAnswer: 2,
    explanation: "Peak voltage = RMS × 1.414 = 230V × 1.414 = 325V",
    section: "2.4.3",
    difficulty: "intermediate",
    topic: "Peak-RMS Calculation"
  },
  {
    id: 143,
    question: "Why is RMS value important?",
    options: [
      "It's easier to calculate",
      "It represents the effective value for power calculations",
      "It's always smaller",
      "It's the legal requirement"
    ],
    correctAnswer: 1,
    explanation: "RMS value represents the effective value of AC for power and heating calculations.",
    section: "2.4.3",
    difficulty: "intermediate",
    topic: "RMS Importance"
  },
  {
    id: 144,
    question: "When AC voltage is stated (e.g., 230V mains), which value is usually meant?",
    options: ["Peak", "Peak-to-peak", "RMS", "Average"],
    correctAnswer: 2,
    explanation: "AC voltages are normally stated as RMS values unless otherwise specified.",
    section: "2.4.3",
    difficulty: "basic",
    topic: "AC Voltage Conventions"
  },
  {
    id: 145,
    question: "What is average voltage for a sinusoidal AC waveform over a complete cycle?",
    options: ["Peak value", "RMS value", "Zero", "Half the peak value"],
    correctAnswer: 2,
    explanation: "The average value of a sinusoidal AC waveform over a complete cycle is zero.",
    section: "2.4.3",
    difficulty: "intermediate",
    topic: "AC Average Value"
  },
  {
    id: 146,
    question: "What type of waveform does UK mains electricity have?",
    options: ["Square wave", "Triangle wave", "Sinusoidal wave", "Sawtooth wave"],
    correctAnswer: 2,
    explanation: "UK mains electricity has a sinusoidal (sine wave) waveform.",
    section: "2.4.4",
    difficulty: "basic",
    topic: "Mains Waveform"
  },
  {
    id: 147,
    question: "What generates the sinusoidal AC waveform?",
    options: [
      "Electronic circuits",
      "Rotating generators (alternators)",
      "Batteries",
      "Solar panels"
    ],
    correctAnswer: 1,
    explanation: "Sinusoidal AC is generated by rotating machines (alternators) in power stations.",
    section: "2.4.4",
    difficulty: "basic",
    topic: "AC Generation"
  },
  {
    id: 148,
    question: "What is the advantage of sinusoidal waveforms?",
    options: [
      "Cheaper to generate",
      "Smooth, efficient, and easy to transform",
      "Higher voltage",
      "Lower frequency"
    ],
    correctAnswer: 1,
    explanation: "Sinusoidal waveforms are smooth, efficient for power transmission, and can be easily transformed.",
    section: "2.4.4",
    difficulty: "intermediate",
    topic: "Sinusoidal Advantages"
  },
  {
    id: 149,
    question: "What is a transformer used for?",
    options: [
      "Converting AC to DC",
      "Changing AC voltage levels",
      "Generating electricity",
      "Storing energy"
    ],
    correctAnswer: 1,
    explanation: "Transformers are used to change (step up or step down) AC voltage levels.",
    section: "2.4.5",
    difficulty: "basic",
    topic: "Transformer Purpose"
  },
  {
    id: 150,
    question: "Can transformers work with DC?",
    options: [
      "Yes, better than AC",
      "No, they only work with changing (AC) currents",
      "Yes, but only small ones",
      "Only special DC transformers"
    ],
    correctAnswer: 1,
    explanation: "Transformers only work with changing currents (AC) because they rely on electromagnetic induction.",
    section: "2.4.5",
    difficulty: "intermediate",
    topic: "Transformer AC Requirement"
  },
  {
    id: 151,
    question: "Why is AC preferred for power transmission?",
    options: [
      "AC is safer",
      "Voltage can be easily changed with transformers for efficient transmission",
      "AC travels faster",
      "AC uses less copper"
    ],
    correctAnswer: 1,
    explanation: "AC can be easily stepped up to high voltages for efficient long-distance transmission, then stepped down for use.",
    section: "2.4.5",
    difficulty: "intermediate",
    topic: "AC Transmission Advantages"
  },
  {
    id: 152,
    question: "What voltage is typically used for long-distance power transmission?",
    options: ["230V", "11kV", "132kV or higher", "12V"],
    correctAnswer: 2,
    explanation: "Long-distance transmission uses very high voltages (132kV, 275kV, 400kV) for efficiency.",
    section: "2.4.5",
    difficulty: "intermediate",
    topic: "Transmission Voltages"
  },
  {
    id: 153,
    question: "Why are high voltages used for power transmission?",
    options: [
      "Higher voltages are safer",
      "Reduces current and therefore power losses (I²R losses)",
      "Cables are cheaper",
      "Transformers work better"
    ],
    correctAnswer: 1,
    explanation: "High voltage reduces current for the same power, which reduces I²R losses in transmission lines.",
    section: "2.4.5",
    difficulty: "intermediate",
    topic: "High Voltage Benefits"
  },
  {
    id: 154,
    question: "What are common sources of DC supply?",
    options: [
      "Mains electricity",
      "Batteries, solar panels, DC power supplies",
      "Transformers",
      "AC generators"
    ],
    correctAnswer: 1,
    explanation: "DC is supplied by batteries, solar panels, DC power supplies, and rectified AC.",
    section: "2.4.6",
    difficulty: "basic",
    topic: "DC Sources"
  },
  {
    id: 155,
    question: "What is a battery?",
    options: [
      "An AC generator",
      "A device that converts chemical energy to electrical energy",
      "A transformer",
      "A motor"
    ],
    correctAnswer: 1,
    explanation: "A battery converts stored chemical energy into electrical energy, providing DC output.",
    section: "2.4.6",
    difficulty: "basic",
    topic: "Battery Definition"
  },
  {
    id: 156,
    question: "What type of current do solar panels produce?",
    options: ["AC only", "DC only", "Both AC and DC", "Neither"],
    correctAnswer: 1,
    explanation: "Solar panels produce DC current directly from light energy.",
    section: "2.4.6",
    difficulty: "basic",
    topic: "Solar Panel Output"
  },
  {
    id: 157,
    question: "What is a DC power supply?",
    options: [
      "A battery",
      "A device that converts AC mains to DC",
      "A transformer",
      "A generator"
    ],
    correctAnswer: 1,
    explanation: "A DC power supply converts AC mains electricity to regulated DC output.",
    section: "2.4.6",
    difficulty: "basic",
    topic: "DC Power Supply"
  },
  {
    id: 158,
    question: "Why is polarity important with DC supplies?",
    options: [
      "It's not important",
      "Incorrect polarity can damage components or prevent proper operation",
      "It only affects voltage",
      "It only affects current"
    ],
    correctAnswer: 1,
    explanation: "DC polarity is critical - reversing it can damage components like LEDs or prevent proper operation.",
    section: "2.4.6",
    difficulty: "intermediate",
    topic: "DC Polarity Importance"
  },
  {
    id: 159,
    question: "What does the + symbol indicate on a DC supply?",
    options: [
      "High voltage",
      "Positive terminal",
      "AC connection",
      "Earth connection"
    ],
    correctAnswer: 1,
    explanation: "The + symbol indicates the positive terminal of a DC supply.",
    section: "2.4.6",
    difficulty: "basic",
    topic: "DC Polarity Symbols"
  },
  {
    id: 160,
    question: "What does the - symbol indicate on a DC supply?",
    options: [
      "Low voltage",
      "Negative terminal",
      "AC connection",
      "Dangerous connection"
    ],
    correctAnswer: 1,
    explanation: "The - symbol indicates the negative terminal of a DC supply.",
    section: "2.4.6",
    difficulty: "basic",
    topic: "DC Polarity Symbols"
  },
  {
    id: 161,
    question: "What applications commonly use DC power?",
    options: [
      "Only lighting",
      "Electronics, motors, battery-powered devices",
      "Only heating",
      "Only cooling"
    ],
    correctAnswer: 1,
    explanation: "DC is used in electronics, DC motors, battery-powered devices, and many control systems.",
    section: "2.4.7",
    difficulty: "basic",
    topic: "DC Applications"
  },
  {
    id: 162,
    question: "What applications commonly use AC power?",
    options: [
      "Mobile phones only",
      "Mains-powered appliances, lighting, heating, motors",
      "Batteries only",
      "Car electronics"
    ],
    correctAnswer: 1,
    explanation: "AC is used for mains-powered appliances, lighting, heating systems, and AC motors.",
    section: "2.4.7",
    difficulty: "basic",
    topic: "AC Applications"
  },
  {
    id: 163,
    question: "Why do some motors use AC and others use DC?",
    options: [
      "No reason",
      "Different characteristics: AC motors are simpler, DC motors offer better speed control",
      "AC is always better",
      "DC is always better"
    ],
    correctAnswer: 1,
    explanation: "AC motors are simpler and more robust; DC motors offer better speed control and starting torque.",
    section: "2.4.7",
    difficulty: "intermediate",
    topic: "Motor Type Selection"
  },
  {
    id: 164,
    question: "What is rectification?",
    options: [
      "Increasing voltage",
      "Converting AC to DC",
      "Converting DC to AC",
      "Reducing current"
    ],
    correctAnswer: 1,
    explanation: "Rectification is the process of converting AC to DC using diodes or other devices.",
    section: "2.4.8",
    difficulty: "intermediate",
    topic: "Rectification"
  },
  {
    id: 165,
    question: "What is an inverter?",
    options: [
      "A type of motor",
      "A device that converts DC to AC",
      "A transformer",
      "A battery"
    ],
    correctAnswer: 1,
    explanation: "An inverter converts DC power to AC power, often used with solar panels and UPS systems.",
    section: "2.4.8",
    difficulty: "intermediate",
    topic: "Inverters"
  },
  {
    id: 166,
    question: "Where would you find an inverter?",
    options: [
      "Only in cars",
      "Solar power systems, UPS systems, motor drives",
      "Only in phones",
      "Only in batteries"
    ],
    correctAnswer: 1,
    explanation: "Inverters are used in solar systems, uninterruptible power supplies (UPS), and variable frequency drives.",
    section: "2.4.8",
    difficulty: "intermediate",
    topic: "Inverter Applications"
  },
  {
    id: 167,
    question: "What is the advantage of variable frequency drives (VFDs)?",
    options: [
      "Cheaper motors",
      "Precise speed control of AC motors",
      "Higher voltage",
      "Less maintenance"
    ],
    correctAnswer: 1,
    explanation: "VFDs allow precise speed control of AC motors by varying the frequency of the AC supply.",
    section: "2.4.8",
    difficulty: "intermediate",
    topic: "Variable Frequency Drives"
  },
  {
    id: 168,
    question: "What safety considerations apply to AC systems?",
    options: [
      "No special considerations",
      "Risk of electric shock, proper earthing essential",
      "Only fire risk",
      "Only mechanical risk"
    ],
    correctAnswer: 1,
    explanation: "AC systems pose electric shock risks and require proper earthing, insulation, and protection devices.",
    section: "2.4.9",
    difficulty: "basic",
    topic: "AC Safety"
  },

  // Section 2.5: Electrical Materials and Their Properties (42 questions)
  {
    id: 169,
    question: "Which material is the best electrical conductor?",
    options: ["PVC", "Copper", "Rubber", "Glass"],
    correctAnswer: 1,
    explanation: "Copper has very low resistivity, making it an excellent electrical conductor.",
    section: "2.5.1",
    difficulty: "basic",
    topic: "Conductors"
  },
  {
    id: 170,
    question: "Why is copper commonly used for electrical wiring?",
    options: [
      "It's the cheapest",
      "Good conductivity, ductility, and corrosion resistance",
      "It's the lightest",
      "It's magnetic"
    ],
    correctAnswer: 1,
    explanation: "Copper has excellent conductivity, can be easily drawn into wires (ductile), and resists corrosion.",
    section: "2.5.1",
    difficulty: "basic",
    topic: "Copper Properties"
  },
  {
    id: 171,
    question: "What is an alternative to copper for electrical conductors?",
    options: ["Steel", "Aluminium", "Brass", "Iron"],
    correctAnswer: 1,
    explanation: "Aluminium is commonly used as an alternative to copper, especially in overhead power lines.",
    section: "2.5.1",
    difficulty: "basic",
    topic: "Alternative Conductors"
  },
  {
    id: 172,
    question: "What are the advantages of aluminium conductors?",
    options: [
      "Better conductivity than copper",
      "Lighter weight and lower cost",
      "More durable than copper",
      "Better corrosion resistance"
    ],
    correctAnswer: 1,
    explanation: "Aluminium is lighter and cheaper than copper, making it suitable for overhead lines.",
    section: "2.5.1",
    difficulty: "intermediate",
    topic: "Aluminium Advantages"
  },
  {
    id: 173,
    question: "What are the disadvantages of aluminium conductors?",
    options: [
      "Too heavy",
      "Higher resistance than copper and thermal expansion issues",
      "Too expensive",
      "Magnetic properties"
    ],
    correctAnswer: 1,
    explanation: "Aluminium has higher resistance than copper and greater thermal expansion, requiring special connections.",
    section: "2.5.1",
    difficulty: "intermediate",
    topic: "Aluminium Disadvantages"
  },
  {
    id: 174,
    question: "What is resistivity?",
    options: [
      "The same as resistance",
      "A material property indicating resistance per unit length and area",
      "The voltage across a material",
      "The current through a material"
    ],
    correctAnswer: 1,
    explanation: "Resistivity is an intrinsic material property measuring resistance per unit length and cross-sectional area.",
    section: "2.5.2",
    difficulty: "intermediate",
    topic: "Resistivity Definition"
  },
  {
    id: 175,
    question: "What are the units of resistivity?",
    options: ["Ohms", "Ohm-metres", "Volts", "Amperes"],
    correctAnswer: 1,
    explanation: "Resistivity is measured in ohm-metres (Ω⋅m).",
    section: "2.5.2",
    difficulty: "intermediate",
    topic: "Resistivity Units"
  },
  {
    id: 176,
    question: "How does the length of a conductor affect its resistance?",
    options: [
      "No effect",
      "Longer length increases resistance",
      "Longer length decreases resistance",
      "Length halves resistance"
    ],
    correctAnswer: 1,
    explanation: "Resistance is directly proportional to length - doubling length doubles resistance.",
    section: "2.5.2",
    difficulty: "basic",
    topic: "Length Effect on Resistance"
  },
  {
    id: 177,
    question: "How does the cross-sectional area of a conductor affect its resistance?",
    options: [
      "No effect",
      "Larger area decreases resistance",
      "Larger area increases resistance",
      "Area doubles resistance"
    ],
    correctAnswer: 1,
    explanation: "Resistance is inversely proportional to cross-sectional area - larger area provides lower resistance.",
    section: "2.5.2",
    difficulty: "basic",
    topic: "Area Effect on Resistance"
  },
  {
    id: 178,
    question: "What is the formula relating resistance to material properties?",
    options: [
      "R = V/I",
      "R = ρL/A",
      "R = P/I²",
      "R = L×A/ρ"
    ],
    correctAnswer: 1,
    explanation: "R = ρL/A where ρ is resistivity, L is length, and A is cross-sectional area.",
    section: "2.5.2",
    difficulty: "intermediate",
    topic: "Resistance Formula"
  },
  {
    id: 179,
    question: "If a wire's diameter is doubled, what happens to its resistance?",
    options: [
      "Doubles",
      "Becomes one quarter",
      "Halves",
      "Stays the same"
    ],
    correctAnswer: 1,
    explanation: "Doubling diameter increases area by 4 times (A = πd²/4), so resistance becomes 1/4.",
    section: "2.5.2",
    difficulty: "intermediate",
    topic: "Diameter Effect Calculation"
  },
  {
    id: 180,
    question: "What makes a material a good insulator?",
    options: [
      "Many free electrons",
      "Very few free electrons (high resistivity)",
      "Low melting point",
      "Magnetic properties"
    ],
    correctAnswer: 1,
    explanation: "Good insulators have very few free electrons, resulting in very high resistivity.",
    section: "2.5.3",
    difficulty: "basic",
    topic: "Insulator Properties"
  },
  {
    id: 181,
    question: "What are common insulating materials?",
    options: [
      "Copper and aluminium",
      "PVC, rubber, glass, ceramics",
      "Steel and iron",
      "Gold and silver"
    ],
    correctAnswer: 1,
    explanation: "Common insulators include PVC plastic, rubber, glass, ceramics, and dry air.",
    section: "2.5.3",
    difficulty: "basic",
    topic: "Common Insulators"
  },
  {
    id: 182,
    question: "Why is PVC used for cable insulation?",
    options: [
      "It conducts electricity",
      "Excellent insulation, flexible, and durable",
      "It's magnetic",
      "It's transparent"
    ],
    correctAnswer: 1,
    explanation: "PVC provides excellent electrical insulation, flexibility for installation, and durability.",
    section: "2.5.3",
    difficulty: "basic",
    topic: "PVC Insulation"
  },
  {
    id: 183,
    question: "What is XLPE insulation?",
    options: [
      "A type of conductor",
      "Cross-linked polyethylene - high-temperature insulation",
      "A type of metal",
      "A measuring instrument"
    ],
    correctAnswer: 1,
    explanation: "XLPE (Cross-linked Polyethylene) is a high-performance insulation material for higher temperature applications.",
    section: "2.5.3",
    difficulty: "intermediate",
    topic: "XLPE Insulation"
  },
  {
    id: 184,
    question: "What happens to insulation when it gets wet?",
    options: [
      "No change",
      "Insulation properties may be significantly reduced",
      "Becomes a better insulator",
      "Changes colour only"
    ],
    correctAnswer: 1,
    explanation: "Moisture can significantly reduce insulation properties, potentially creating dangerous conditions.",
    section: "2.5.3",
    difficulty: "intermediate",
    topic: "Moisture Effects on Insulation"
  },
  {
    id: 185,
    question: "What is breakdown voltage?",
    options: [
      "Normal operating voltage",
      "The voltage at which an insulator fails and becomes conductive",
      "The lowest useful voltage",
      "The voltage across a resistor"
    ],
    correctAnswer: 1,
    explanation: "Breakdown voltage is the point where insulation fails and becomes conductive, potentially causing dangerous situations.",
    section: "2.5.3",
    difficulty: "intermediate",
    topic: "Breakdown Voltage"
  },
  {
    id: 186,
    question: "What factors affect the breakdown voltage of air?",
    options: [
      "Only temperature",
      "Distance, humidity, pressure, pollution",
      "Only humidity",
      "Only distance"
    ],
    correctAnswer: 1,
    explanation: "Air breakdown voltage depends on gap distance, humidity, atmospheric pressure, and pollution levels.",
    section: "2.5.3",
    difficulty: "intermediate",
    topic: "Air Breakdown Factors"
  },
  {
    id: 187,
    question: "What are semiconductors?",
    options: [
      "Perfect conductors",
      "Materials with conductivity between conductors and insulators",
      "Perfect insulators",
      "Magnetic materials"
    ],
    correctAnswer: 1,
    explanation: "Semiconductors have electrical conductivity between that of conductors and insulators.",
    section: "2.5.4",
    difficulty: "intermediate",
    topic: "Semiconductor Definition"
  },
  {
    id: 188,
    question: "What are common semiconductor materials?",
    options: [
      "Copper and gold",
      "Silicon and germanium",
      "PVC and rubber",
      "Steel and iron"
    ],
    correctAnswer: 1,
    explanation: "Silicon and germanium are the most common semiconductor materials used in electronics.",
    section: "2.5.4",
    difficulty: "intermediate",
    topic: "Common Semiconductors"
  },
  {
    id: 189,
    question: "How does temperature affect semiconductor conductivity?",
    options: [
      "No effect",
      "Higher temperature increases conductivity",
      "Higher temperature decreases conductivity",
      "Temperature doubles conductivity"
    ],
    correctAnswer: 1,
    explanation: "Unlike metals, semiconductors become more conductive as temperature increases.",
    section: "2.5.4",
    difficulty: "intermediate",
    topic: "Semiconductor Temperature Effects"
  },
  {
    id: 190,
    question: "What is doping in semiconductors?",
    options: [
      "Cleaning the material",
      "Adding small amounts of impurities to control conductivity",
      "Heating the material",
      "Cutting the material"
    ],
    correctAnswer: 1,
    explanation: "Doping involves adding controlled impurities to pure semiconductors to modify their electrical properties.",
    section: "2.5.4",
    difficulty: "advanced",
    topic: "Semiconductor Doping"
  },
  {
    id: 191,
    question: "What are superconductors?",
    options: [
      "Very good normal conductors",
      "Materials with zero electrical resistance at low temperatures",
      "High-voltage conductors",
      "Magnetic conductors"
    ],
    correctAnswer: 1,
    explanation: "Superconductors exhibit zero electrical resistance when cooled below their critical temperature.",
    section: "2.5.5",
    difficulty: "advanced",
    topic: "Superconductors"
  },
  {
    id: 192,
    question: "What temperature range do conventional superconductors require?",
    options: [
      "Room temperature",
      "Very low temperatures (near absolute zero)",
      "High temperatures",
      "Any temperature"
    ],
    correctAnswer: 1,
    explanation: "Conventional superconductors require very low temperatures, typically requiring liquid helium cooling.",
    section: "2.5.5",
    difficulty: "advanced",
    topic: "Superconductor Temperatures"
  },
  {
    id: 193,
    question: "What applications use superconductors?",
    options: [
      "Household wiring",
      "MRI machines, particle accelerators, power cables",
      "Car batteries",
      "Mobile phones"
    ],
    correctAnswer: 1,
    explanation: "Superconductors are used in MRI machines, particle accelerators, and some specialised power applications.",
    section: "2.5.5",
    difficulty: "advanced",
    topic: "Superconductor Applications"
  },
  {
    id: 194,
    question: "How does temperature affect the resistance of metals?",
    options: [
      "No effect",
      "Higher temperature increases resistance",
      "Higher temperature decreases resistance",
      "Temperature has random effects"
    ],
    correctAnswer: 1,
    explanation: "For most metals, resistance increases with temperature due to increased atomic vibrations impeding electron flow.",
    section: "2.5.6",
    difficulty: "intermediate",
    topic: "Metal Temperature Coefficient"
  },
  {
    id: 195,
    question: "What is the temperature coefficient of resistance?",
    options: [
      "A fixed value",
      "The rate at which resistance changes with temperature",
      "The melting point",
      "The breakdown voltage"
    ],
    correctAnswer: 1,
    explanation: "Temperature coefficient indicates how much resistance changes per degree of temperature change.",
    section: "2.5.6",
    difficulty: "intermediate",
    topic: "Temperature Coefficient"
  },
  {
    id: 196,
    question: "Why is the temperature effect important in electrical installations?",
    options: [
      "It's not important",
      "Can affect current ratings and cause overheating",
      "Only affects appearance",
      "Only affects cost"
    ],
    correctAnswer: 1,
    explanation: "Temperature effects must be considered for current ratings, as conductors heat up and resistance increases.",
    section: "2.5.6",
    difficulty: "intermediate",
    topic: "Temperature Effects in Practice"
  },
  {
    id: 197,
    question: "What happens to cable current rating as temperature increases?",
    options: [
      "Increases",
      "Decreases (derating required)",
      "Stays the same",
      "Becomes zero"
    ],
    correctAnswer: 1,
    explanation: "Cable current ratings must be derated (reduced) at higher ambient temperatures to prevent overheating.",
    section: "2.5.6",
    difficulty: "intermediate",
    topic: "Cable Derating"
  },
  {
    id: 198,
    question: "What is meant by current carrying capacity?",
    options: [
      "The length of cable",
      "The maximum current a conductor can carry safely",
      "The voltage rating",
      "The resistance value"
    ],
    correctAnswer: 1,
    explanation: "Current carrying capacity is the maximum current a conductor can carry continuously without exceeding its temperature rating.",
    section: "2.5.7",
    difficulty: "basic",
    topic: "Current Carrying Capacity"
  },
  {
    id: 199,
    question: "What factors determine a cable's current rating?",
    options: [
      "Only the length",
      "Cross-sectional area, insulation type, installation method, ambient temperature",
      "Only the voltage",
      "Only the colour"
    ],
    correctAnswer: 1,
    explanation: "Current rating depends on conductor area, insulation temperature rating, installation method, and ambient temperature.",
    section: "2.5.7",
    difficulty: "intermediate",
    topic: "Current Rating Factors"
  },
  {
    id: 200,
    question: "Why do larger cables have higher current ratings?",
    options: [
      "They are more expensive",
      "Larger cross-sectional area has lower resistance and better heat dissipation",
      "They look better",
      "They are longer"
    ],
    correctAnswer: 1,
    explanation: "Larger cables have lower resistance (less heating) and more surface area for heat dissipation.",
    section: "2.5.7",
    difficulty: "intermediate",
    topic: "Cable Size vs Current Rating"
  },
  {
    id: 201,
    question: "What is cable derating?",
    options: [
      "Increasing the current rating",
      "Reducing current rating due to adverse conditions",
      "Changing the voltage rating",
      "Replacing the cable"
    ],
    correctAnswer: 1,
    explanation: "Derating involves reducing the current rating when installation conditions prevent normal heat dissipation.",
    section: "2.5.7",
    difficulty: "intermediate",
    topic: "Cable Derating"
  },
  {
    id: 202,
    question: "When might cable derating be necessary?",
    options: [
      "Never",
      "High ambient temperatures, grouped cables, enclosed installations",
      "Only in winter",
      "Only for short cables"
    ],
    correctAnswer: 1,
    explanation: "Derating is needed for high temperatures, grouped cables that can't dissipate heat, and enclosed installations.",
    section: "2.5.7",
    difficulty: "intermediate",
    topic: "Derating Conditions"
  },
  {
    id: 203,
    question: "What is the skin effect?",
    options: [
      "Cable colour fading",
      "Current concentrating near the conductor surface at high frequencies",
      "Insulation aging",
      "Cable stretching"
    ],
    correctAnswer: 1,
    explanation: "Skin effect causes AC current to concentrate near the conductor surface at high frequencies, increasing effective resistance.",
    section: "2.5.8",
    difficulty: "advanced",
    topic: "Skin Effect"
  },
  {
    id: 204,
    question: "At what frequencies does skin effect become significant?",
    options: [
      "DC only",
      "High frequencies (kHz and above)",
      "50 Hz mains frequency",
      "All frequencies equally"
    ],
    correctAnswer: 1,
    explanation: "Skin effect becomes significant at high frequencies, typically above several kHz.",
    section: "2.5.8",
    difficulty: "advanced",
    topic: "Skin Effect Frequency"
  },
  {
    id: 205,
    question: "What is eddy current loss?",
    options: [
      "Current in the wrong direction",
      "Circulating currents in conductors causing power loss",
      "Current leaking to earth",
      "Current through insulation"
    ],
    correctAnswer: 1,
    explanation: "Eddy currents are circulating currents induced in conductors by changing magnetic fields, causing power losses.",
    section: "2.5.8",
    difficulty: "advanced",
    topic: "Eddy Current Loss"
  },
  {
    id: 206,
    question: "How can eddy current losses be reduced?",
    options: [
      "Use thicker conductors",
      "Use laminated cores in transformers",
      "Increase frequency",
      "Use longer cables"
    ],
    correctAnswer: 1,
    explanation: "Laminated cores with insulated layers reduce eddy current paths, minimizing losses in transformers and motors.",
    section: "2.5.8",
    difficulty: "advanced",
    topic: "Eddy Current Reduction"
  },
  {
    id: 207,
    question: "What is hysteresis loss?",
    options: [
      "Loss due to heating",
      "Energy loss in magnetic materials due to magnetization changes",
      "Loss due to poor connections",
      "Loss in conductors"
    ],
    correctAnswer: 1,
    explanation: "Hysteresis loss occurs in magnetic materials when magnetization repeatedly changes direction, as in AC applications.",
    section: "2.5.8",
    difficulty: "advanced",
    topic: "Hysteresis Loss"
  },
  {
    id: 208,
    question: "What causes corona discharge?",
    options: [
      "Low voltage",
      "High electric field strength around conductors causing air ionization",
      "Poor insulation",
      "DC current"
    ],
    correctAnswer: 1,
    explanation: "Corona occurs when electric field strength around conductors is high enough to ionize surrounding air.",
    section: "2.5.9",
    difficulty: "advanced",
    topic: "Corona Discharge"
  },
  {
    id: 209,
    question: "Where is corona discharge commonly observed?",
    options: [
      "Household wiring",
      "High-voltage transmission lines",
      "Low-voltage equipment",
      "DC circuits"
    ],
    correctAnswer: 1,
    explanation: "Corona is commonly seen around high-voltage transmission lines and equipment, especially in humid conditions.",
    section: "2.5.9",
    difficulty: "advanced",
    topic: "Corona Locations"
  },
  {
    id: 210,
    question: "What problems can corona discharge cause?",
    options: [
      "No problems",
      "Power losses, radio interference, ozone production",
      "Only aesthetic issues",
      "Only noise"
    ],
    correctAnswer: 1,
    explanation: "Corona causes power losses, radio frequency interference, produces ozone, and can degrade insulation over time.",
    section: "2.5.9",
    difficulty: "advanced",
    topic: "Corona Problems"
  },

  // Section 2.6: Power, Energy, and Efficiency (40 questions)
  {
    id: 211,
    question: "Which formula defines electrical power?",
    options: ["P = V / I", "P = V × I", "P = V + I", "P = V - I"],
    correctAnswer: 1,
    explanation: "Power is defined as P = V × I (voltage × current).",
    section: "2.6.1",
    difficulty: "basic",
    topic: "Electrical Power"
  },
  {
    id: 212,
    question: "What is the unit of electrical power?",
    options: ["Volts", "Amperes", "Watts", "Joules"],
    correctAnswer: 2,
    explanation: "Power is measured in Watts (W), named after James Watt.",
    section: "2.6.1",
    difficulty: "basic",
    topic: "Power Units"
  },
  {
    id: 213,
    question: "A heater operating at 230V draws 10A. What is its power?",
    options: ["23W", "230W", "2300W", "2.3kW"],
    correctAnswer: 3,
    explanation: "P = V × I = 230V × 10A = 2300W = 2.3kW",
    section: "2.6.1",
    difficulty: "basic",
    topic: "Power Calculation"
  },
  {
    id: 214,
    question: "What are the alternative power formulas using Ohm's Law?",
    options: [
      "Only P = VI",
      "P = VI, P = I²R, P = V²/R",
      "Only P = I²R",
      "Only P = V²/R"
    ],
    correctAnswer: 1,
    explanation: "Power can be calculated as P = VI, P = I²R, or P = V²/R depending on known values.",
    section: "2.6.1",
    difficulty: "intermediate",
    topic: "Power Formula Variations"
  },
  {
    id: 215,
    question: "A 100Ω resistor has 5V across it. What power does it dissipate?",
    options: ["0.25W", "500W", "20W", "2W"],
    correctAnswer: 0,
    explanation: "P = V²/R = (5V)²/100Ω = 25/100 = 0.25W",
    section: "2.6.1",
    difficulty: "intermediate",
    topic: "Resistive Power Calculation"
  },
  {
    id: 216,
    question: "What is electrical energy?",
    options: [
      "The same as power",
      "Power used over time",
      "Voltage times current",
      "Resistance times current"
    ],
    correctAnswer: 1,
    explanation: "Energy is power consumed over a period of time: Energy = Power × Time",
    section: "2.6.2",
    difficulty: "basic",
    topic: "Electrical Energy"
  },
  {
    id: 217,
    question: "What is the unit of electrical energy?",
    options: ["Watts", "Joules or kilowatt-hours", "Volts", "Amperes"],
    correctAnswer: 1,
    explanation: "Energy is measured in Joules (J) or kilowatt-hours (kWh) for practical electrical applications.",
    section: "2.6.2",
    difficulty: "basic",
    topic: "Energy Units"
  },
  {
    id: 218,
    question: "What is a kilowatt-hour (kWh)?",
    options: [
      "1000 watts of power",
      "Energy consumed by 1kW load in 1 hour",
      "1000 hours of energy",
      "Energy per hour"
    ],
    correctAnswer: 1,
    explanation: "A kWh is the energy consumed when 1kW of power is used for 1 hour.",
    section: "2.6.2",
    difficulty: "basic",
    topic: "Kilowatt-hour Definition"
  },
  {
    id: 219,
    question: "A 2kW heater runs for 3 hours. How much energy does it consume?",
    options: ["5 kWh", "6 kWh", "2 kWh", "3 kWh"],
    correctAnswer: 1,
    explanation: "Energy = Power × Time = 2kW × 3h = 6kWh",
    section: "2.6.2",
    difficulty: "basic",
    topic: "Energy Calculation"
  },
  {
    id: 220,
    question: "How many joules are in 1 kWh?",
    options: ["1000 J", "3600 J", "3,600,000 J", "1,000,000 J"],
    correctAnswer: 2,
    explanation: "1 kWh = 1000W × 3600s = 3,600,000 J = 3.6 MJ",
    section: "2.6.2",
    difficulty: "intermediate",
    topic: "Energy Unit Conversion"
  },
  {
    id: 221,
    question: "What does an electricity meter measure?",
    options: ["Power", "Energy consumption", "Voltage", "Current"],
    correctAnswer: 1,
    explanation: "Electricity meters measure energy consumption in kWh for billing purposes.",
    section: "2.6.2",
    difficulty: "basic",
    topic: "Electricity Meters"
  },
  {
    id: 222,
    question: "What is efficiency?",
    options: [
      "Power input only",
      "The ratio of useful output to total input",
      "Energy stored",
      "Power lost"
    ],
    correctAnswer: 1,
    explanation: "Efficiency is the ratio of useful energy/power output to total energy/power input.",
    section: "2.6.3",
    difficulty: "basic",
    topic: "Efficiency Definition"
  },
  {
    id: 223,
    question: "How is efficiency usually expressed?",
    options: [
      "In watts",
      "As a percentage or decimal fraction",
      "In volts",
      "In amperes"
    ],
    correctAnswer: 1,
    explanation: "Efficiency is expressed as a percentage (%) or decimal fraction between 0 and 1.",
    section: "2.6.3",
    difficulty: "basic",
    topic: "Efficiency Expression"
  },
  {
    id: 224,
    question: "What is the efficiency formula?",
    options: [
      "Efficiency = Input/Output",
      "Efficiency = Output/Input",
      "Efficiency = Input + Output",
      "Efficiency = Input - Output"
    ],
    correctAnswer: 1,
    explanation: "Efficiency = (Useful Output/Total Input) × 100%",
    section: "2.6.3",
    difficulty: "basic",
    topic: "Efficiency Formula"
  },
  {
    id: 225,
    question: "A motor has 800W input and 720W output. What is its efficiency?",
    options: ["80%", "90%", "110%", "72%"],
    correctAnswer: 1,
    explanation: "Efficiency = (720/800) × 100% = 90%",
    section: "2.6.3",
    difficulty: "intermediate",
    topic: "Efficiency Calculation"
  },
  {
    id: 226,
    question: "Can efficiency ever exceed 100%?",
    options: [
      "Yes, always",
      "No, it violates conservation of energy",
      "Yes, in special cases",
      "Only for motors"
    ],
    correctAnswer: 1,
    explanation: "Efficiency cannot exceed 100% as this would violate the law of conservation of energy.",
    section: "2.6.3",
    difficulty: "intermediate",
    topic: "Efficiency Limits"
  },
  {
    id: 227,
    question: "What happens to the 'lost' energy in inefficient devices?",
    options: [
      "It disappears",
      "It's converted to heat, sound, or other forms",
      "It's stored",
      "It's recycled"
    ],
    correctAnswer: 1,
    explanation: "Lost energy is typically converted to heat, sound, vibration, or other unwanted forms.",
    section: "2.6.3",
    difficulty: "intermediate",
    topic: "Energy Losses"
  },
  {
    id: 228,
    question: "Why is high efficiency important?",
    options: [
      "It's not important",
      "Reduces energy costs and environmental impact",
      "Only for appearance",
      "Legal requirement only"
    ],
    correctAnswer: 1,
    explanation: "High efficiency reduces energy consumption, operating costs, and environmental impact.",
    section: "2.6.3",
    difficulty: "basic",
    topic: "Efficiency Importance"
  },
  {
    id: 229,
    question: "What are typical efficiency ranges for electric motors?",
    options: [
      "10-20%",
      "80-95%",
      "50-60%",
      "Over 100%"
    ],
    correctAnswer: 1,
    explanation: "Modern electric motors typically achieve 80-95% efficiency, depending on size and type.",
    section: "2.6.3",
    difficulty: "intermediate",
    topic: "Motor Efficiency"
  },
  {
    id: 230,
    question: "What are typical efficiency ranges for incandescent light bulbs?",
    options: [
      "90-95%",
      "About 5% (very inefficient)",
      "50-60%",
      "75-80%"
    ],
    correctAnswer: 1,
    explanation: "Incandescent bulbs are very inefficient (~5%), with most energy converted to heat rather than light.",
    section: "2.6.3",
    difficulty: "intermediate",
    topic: "Lighting Efficiency"
  },
  {
    id: 231,
    question: "What are typical efficiency ranges for LED lights?",
    options: [
      "5-10%",
      "80-90%",
      "30-40%",
      "60-70%"
    ],
    correctAnswer: 1,
    explanation: "LED lights are highly efficient, typically achieving 80-90% efficiency in converting electricity to light.",
    section: "2.6.3",
    difficulty: "intermediate",
    topic: "LED Efficiency"
  },
  {
    id: 232,
    question: "What is I²R loss?",
    options: [
      "Voltage loss",
      "Power loss due to current flowing through resistance",
      "Energy storage",
      "Power gain"
    ],
    correctAnswer: 1,
    explanation: "I²R loss is power dissipated as heat when current flows through resistance (P = I²R).",
    section: "2.6.4",
    difficulty: "intermediate",
    topic: "I²R Losses"
  },
  {
    id: 233,
    question: "How can I²R losses be reduced?",
    options: [
      "Increase current",
      "Reduce current or resistance",
      "Increase voltage",
      "Ignore them"
    ],
    correctAnswer: 1,
    explanation: "I²R losses can be reduced by decreasing current (using higher voltage) or reducing resistance (larger conductors).",
    section: "2.6.4",
    difficulty: "intermediate",
    topic: "Reducing I²R Losses"
  },
  {
    id: 234,
    question: "Why do power transmission lines use high voltage?",
    options: [
      "High voltage is safer",
      "Reduces current and therefore I²R losses",
      "Cheaper cables",
      "Better insulation"
    ],
    correctAnswer: 1,
    explanation: "High voltage reduces current for the same power (P=VI), which reduces I²R losses in transmission lines.",
    section: "2.6.4",
    difficulty: "intermediate",
    topic: "High Voltage Transmission"
  },
  {
    id: 235,
    question: "What is power factor?",
    options: [
      "The total power",
      "The ratio of real power to apparent power",
      "The voltage rating",
      "The current rating"
    ],
    correctAnswer: 1,
    explanation: "Power factor is the ratio of real (useful) power to apparent power in AC circuits.",
    section: "2.6.5",
    difficulty: "intermediate",
    topic: "Power Factor"
  },
  {
    id: 236,
    question: "What is the power factor of a purely resistive load?",
    options: ["0", "1 (unity)", "0.5", "2"],
    correctAnswer: 1,
    explanation: "Purely resistive loads have a power factor of 1 (unity) because voltage and current are in phase.",
    section: "2.6.5",
    difficulty: "intermediate",
    topic: "Resistive Power Factor"
  },
  {
    id: 237,
    question: "What causes poor power factor?",
    options: [
      "High resistance",
      "Reactive components (inductors, capacitors)",
      "High voltage",
      "Low current"
    ],
    correctAnswer: 1,
    explanation: "Poor power factor is caused by reactive components that cause phase differences between voltage and current.",
    section: "2.6.5",
    difficulty: "intermediate",
    topic: "Power Factor Causes"
  },
  {
    id: 238,
    question: "Why is poor power factor undesirable?",
    options: [
      "It's not a problem",
      "Increases current for same real power, causing losses",
      "Reduces voltage",
      "Improves efficiency"
    ],
    correctAnswer: 1,
    explanation: "Poor power factor increases current for the same real power, causing higher I²R losses and larger equipment requirements.",
    section: "2.6.5",
    difficulty: "intermediate",
    topic: "Power Factor Problems"
  },
  {
    id: 239,
    question: "What is reactive power?",
    options: [
      "Useful power",
      "Power that oscillates between source and load without doing useful work",
      "Lost power",
      "Stored power"
    ],
    correctAnswer: 1,
    explanation: "Reactive power oscillates between source and load without doing useful work, but is necessary for magnetic fields in motors and transformers.",
    section: "2.6.5",
    difficulty: "intermediate",
    topic: "Reactive Power"
  },
  {
    id: 240,
    question: "What is the unit of reactive power?",
    options: ["Watts", "VARs (Volt-Amperes Reactive)", "Joules", "Ohms"],
    correctAnswer: 1,
    explanation: "Reactive power is measured in VARs (Volt-Amperes Reactive).",
    section: "2.6.5",
    difficulty: "intermediate",
    topic: "Reactive Power Units"
  },
  {
    id: 241,
    question: "What is apparent power?",
    options: [
      "Real power only",
      "The total power (combination of real and reactive power)",
      "Reactive power only",
      "Lost power"
    ],
    correctAnswer: 1,
    explanation: "Apparent power is the total power, combining both real and reactive power components.",
    section: "2.6.5",
    difficulty: "intermediate",
    topic: "Apparent Power"
  },
  {
    id: 242,
    question: "What is the unit of apparent power?",
    options: ["Watts", "VA (Volt-Amperes)", "VARs", "Joules"],
    correctAnswer: 1,
    explanation: "Apparent power is measured in VA (Volt-Amperes).",
    section: "2.6.5",
    difficulty: "intermediate",
    topic: "Apparent Power Units"
  },
  {
    id: 243,
    question: "What is the relationship between real, reactive, and apparent power?",
    options: [
      "S = P + Q",
      "S² = P² + Q² (power triangle)",
      "S = P × Q",
      "S = P - Q"
    ],
    correctAnswer: 1,
    explanation: "The power triangle shows: S² = P² + Q² where S=apparent, P=real, Q=reactive power.",
    section: "2.6.5",
    difficulty: "advanced",
    topic: "Power Triangle"
  },
  {
    id: 244,
    question: "How can power factor be improved?",
    options: [
      "Increase voltage",
      "Add capacitors to offset inductive effects",
      "Increase current",
      "Add resistors"
    ],
    correctAnswer: 1,
    explanation: "Power factor can be improved by adding capacitors to offset the reactive effects of inductive loads.",
    section: "2.6.5",
    difficulty: "intermediate",
    topic: "Power Factor Correction"
  },
  {
    id: 245,
    question: "What is demand in electrical systems?",
    options: [
      "Total energy used",
      "Maximum power required at any given time",
      "Average power",
      "Minimum power"
    ],
    correctAnswer: 1,
    explanation: "Demand is the maximum power requirement at any given time, important for supply system sizing.",
    section: "2.6.6",
    difficulty: "intermediate",
    topic: "Electrical Demand"
  },
  {
    id: 246,
    question: "What is load factor?",
    options: [
      "Peak power only",
      "Ratio of average load to peak load",
      "Total energy",
      "Power factor"
    ],
    correctAnswer: 1,
    explanation: "Load factor is the ratio of average load to peak load over a given period.",
    section: "2.6.6",
    difficulty: "intermediate",
    topic: "Load Factor"
  },
  {
    id: 247,
    question: "Why is load factor important?",
    options: [
      "It's not important",
      "Affects economics of electricity supply",
      "Only for billing",
      "Only for safety"
    ],
    correctAnswer: 1,
    explanation: "Load factor affects the economics of electricity supply - higher load factors mean better utilization of equipment.",
    section: "2.6.6",
    difficulty: "intermediate",
    topic: "Load Factor Importance"
  },
  {
    id: 248,
    question: "What is diversity in electrical loads?",
    options: [
      "Different types of equipment",
      "Not all loads operate at maximum simultaneously",
      "Different voltages",
      "Different frequencies"
    ],
    correctAnswer: 1,
    explanation: "Diversity is the principle that not all loads operate at their maximum demand simultaneously.",
    section: "2.6.6",
    difficulty: "intermediate",
    topic: "Load Diversity"
  },
  {
    id: 249,
    question: "How does diversity affect electrical system design?",
    options: [
      "No effect",
      "Allows smaller supply systems than sum of individual loads",
      "Requires larger systems",
      "Only affects cost"
    ],
    correctAnswer: 1,
    explanation: "Diversity allows electrical systems to be sized smaller than the sum of all connected loads.",
    section: "2.6.6",
    difficulty: "intermediate",
    topic: "Diversity in Design"
  },
  {
    id: 250,
    question: "What is the overall purpose of understanding power and energy concepts?",
    options: [
      "Academic knowledge only",
      "Efficient design, operation, and cost control of electrical systems",
      "Passing exams only",
      "Impressing others"
    ],
    correctAnswer: 1,
    explanation: "Understanding power and energy concepts enables efficient electrical system design, operation, and cost-effective energy management.",
    section: "2.6.6",
    difficulty: "basic",
    topic: "Power Concepts Application"
  }
];

// Helper function to get questions by section
export const getQuestionsBySection = (section: string): QuestionBank[] => {
  return module2QuestionBank.filter(q => q.section.startsWith(section));
};

// Helper function to get questions by difficulty
export const getQuestionsByDifficulty = (difficulty: 'basic' | 'intermediate' | 'advanced'): QuestionBank[] => {
  return module2QuestionBank.filter(q => q.difficulty === difficulty);
};

// Helper function to get random questions with weighted distribution
export const getRandomQuestions = (count: number, weights?: { basic: number, intermediate: number, advanced: number }): QuestionBank[] => {
  const defaultWeights = { basic: 40, intermediate: 45, advanced: 15 }; // Percentages
  const actualWeights = weights || defaultWeights;
  
  const basicCount = Math.round(count * actualWeights.basic / 100);
  const intermediateCount = Math.round(count * actualWeights.intermediate / 100);
  const advancedCount = count - basicCount - intermediateCount;
  
  const basicQuestions = getQuestionsByDifficulty('basic');
  const intermediateQuestions = getQuestionsByDifficulty('intermediate');
  const advancedQuestions = getQuestionsByDifficulty('advanced');
  
  const selectedQuestions: QuestionBank[] = [];
  
  // Randomly select from each difficulty level
  selectedQuestions.push(...getRandomFromArray(basicQuestions, basicCount));
  selectedQuestions.push(...getRandomFromArray(intermediateQuestions, intermediateCount));
  selectedQuestions.push(...getRandomFromArray(advancedQuestions, advancedCount));
  
  // Shuffle the final array
  return shuffleArray(selectedQuestions);
};

// Helper function to get random items from array
const getRandomFromArray = <T>(array: T[], count: number): T[] => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, array.length));
};

// Helper function to shuffle array
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};