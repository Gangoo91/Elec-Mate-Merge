import { QuizQuestion } from '@/types/quiz';

export const instrumentationMockExamQuestions: QuizQuestion[] = [
  // Module 1: Introduction to Instrumentation
  {
    id: 1,
    question: "What is the primary purpose of instrumentation in industrial processes?",
    options: [
      "To reduce costs",
      "To measure, monitor, and control process variables",
      "To increase production speed",
      "To replace human operators"
    ],
    correctAnswer: 1,
    explanation: "Instrumentation systems are designed to measure, monitor, and control critical process variables like temperature, pressure, flow, and level."
  },
  {
    id: 2,
    question: "Which of the following is NOT a typical process variable in instrumentation?",
    options: ["Temperature", "Pressure", "Colour", "Flow rate"],
    correctAnswer: 2,
    explanation: "While colour can be measured in some specialised applications, it's not a typical process variable. Standard variables are temperature, pressure, flow, and level."
  },
  {
    id: 3,
    question: "What does SCADA stand for?",
    options: [
      "System Control And Data Acquisition",
      "Supervisory Control And Data Acquisition",
      "Standard Control And Data Analysis",
      "Signal Control And Digital Automation"
    ],
    correctAnswer: 1,
    explanation: "SCADA stands for Supervisory Control And Data Acquisition, a system for remote monitoring and control of industrial processes."
  },

  // Module 2: Sensors and Transmitters
  {
    id: 4,
    question: "What type of temperature sensor provides the highest accuracy?",
    options: ["Thermocouple", "RTD (Resistance Temperature Detector)", "Thermistor", "Bimetallic strip"],
    correctAnswer: 1,
    explanation: "RTDs provide the highest accuracy and stability for temperature measurement, typically ±0.1°C or better."
  },
  {
    id: 5,
    question: "A thermocouple works on the principle of:",
    options: [
      "Resistance change with temperature",
      "Seebeck effect (EMF generation)",
      "Thermal expansion",
      "Capacitance change"
    ],
    correctAnswer: 1,
    explanation: "Thermocouples generate an EMF based on the Seebeck effect when there's a temperature difference between the hot and cold junctions."
  },
  {
    id: 6,
    question: "What is the most common RTD resistance value at 0°C?",
    options: ["50Ω", "100Ω", "120Ω", "200Ω"],
    correctAnswer: 1,
    explanation: "The Pt100 RTD has a resistance of 100Ω at 0°C and is the most widely used RTD type."
  },
  {
    id: 7,
    question: "Which pressure measurement principle uses a diaphragm and strain gauges?",
    options: ["Bourdon tube", "Capacitive", "Piezoresistive", "Magnetic"],
    correctAnswer: 2,
    explanation: "Piezoresistive pressure sensors use strain gauges mounted on a diaphragm that deflects under pressure."
  },
  {
    id: 8,
    question: "What is gauge pressure?",
    options: [
      "Pressure relative to perfect vacuum",
      "Pressure relative to atmospheric pressure",
      "Absolute pressure plus atmospheric pressure",
      "The difference between two pressures"
    ],
    correctAnswer: 1,
    explanation: "Gauge pressure is measured relative to atmospheric pressure, so atmospheric pressure reads as zero gauge."
  },

  // Module 3: Signal Conditioning and Transmission
  {
    id: 9,
    question: "What is the standard current loop signal range?",
    options: ["0-20mA", "4-20mA", "1-5mA", "0-10mA"],
    correctAnswer: 1,
    explanation: "The 4-20mA current loop is the industry standard, with 4mA representing 0% scale and 20mA representing 100% scale."
  },
  {
    id: 10,
    question: "Why is 4mA used as the minimum signal instead of 0mA?",
    options: [
      "To reduce noise",
      "To provide power for the transmitter",
      "To distinguish between a zero reading and a fault condition",
      "To increase accuracy"
    ],
    correctAnswer: 2,
    explanation: "Using 4mA as minimum allows differentiation between a true zero reading (4mA) and a broken wire (0mA)."
  },
  {
    id: 11,
    question: "What does HART protocol allow?",
    options: [
      "Higher speed communication",
      "Digital communication over the same wires as the 4-20mA signal",
      "Wireless communication only",
      "Power transmission"
    ],
    correctAnswer: 1,
    explanation: "HART (Highway Addressable Remote Transducer) protocol enables digital communication superimposed on the 4-20mA signal."
  },
  {
    id: 12,
    question: "What is the typical voltage drop across a 250Ω resistor with a 12mA signal?",
    options: ["2V", "3V", "4V", "5V"],
    correctAnswer: 1,
    explanation: "Using Ohm's law: V = I × R = 0.012A × 250Ω = 3V"
  },

  // Module 4: Control Systems
  {
    id: 13,
    question: "In a PID controller, what does the 'P' term represent?",
    options: ["Power", "Proportional", "Pressure", "Process"],
    correctAnswer: 1,
    explanation: "The 'P' in PID stands for Proportional, which provides a control output proportional to the error."
  },
  {
    id: 14,
    question: "What effect does increasing the integral (I) gain have on a control loop?",
    options: [
      "Reduces steady-state error",
      "Increases response speed",
      "Reduces overshoot",
      "Eliminates noise"
    ],
    correctAnswer: 0,
    explanation: "The integral term reduces steady-state error by accumulating the error over time and driving it to zero."
  },
  {
    id: 15,
    question: "What is the purpose of derivative (D) action in a PID controller?",
    options: [
      "Eliminate steady-state error",
      "Provide faster response",
      "Anticipate future error and reduce overshoot",
      "Filter noise"
    ],
    correctAnswer: 2,
    explanation: "Derivative action anticipates future error based on the rate of change, helping to reduce overshoot and improve stability."
  },
  {
    id: 16,
    question: "What is a control valve's CV rating?",
    options: [
      "Control Voltage rating",
      "Flow coefficient - gallons per minute at 1 psi pressure drop",
      "Cavitation Velocity",
      "Critical Velocity"
    ],
    correctAnswer: 1,
    explanation: "CV is the flow coefficient representing gallons per minute of water that will flow through the valve at 1 psi pressure drop."
  },

  // Module 5: Wiring and Installation
  {
    id: 17,
    question: "What is the main advantage of twisted pair cable?",
    options: [
      "Lower cost",
      "Higher temperature rating",
      "Improved noise immunity",
      "Greater flexibility"
    ],
    correctAnswer: 2,
    explanation: "Twisted pair cable reduces electromagnetic interference by cancelling out induced noise in both conductors."
  },
  {
    id: 18,
    question: "What is the recommended shield connection for a 4-20mA signal cable?",
    options: [
      "Connect shield at both ends",
      "Connect shield at transmitter end only",
      "Connect shield at receiver end only",
      "Leave shield unconnected"
    ],
    correctAnswer: 2,
    explanation: "Shield should be connected at the receiver end only to prevent ground loops while providing noise protection."
  },
  {
    id: 19,
    question: "What is IS barrier in instrumentation?",
    options: [
      "Insulation Separator",
      "Intrinsic Safety barrier",
      "Isolation Switch",
      "Impedance Stabiliser"
    ],
    correctAnswer: 1,
    explanation: "An Intrinsic Safety barrier limits energy to safe levels for use in potentially explosive atmospheres."
  },
  {
    id: 20,
    question: "What cable separation is typically required between power and signal cables?",
    options: ["10mm", "50mm", "100mm", "300mm"],
    correctAnswer: 3,
    explanation: "A minimum separation of 300mm is typically required between power and signal cables to reduce interference."
  },

  // Module 6: Calibration and Testing
  {
    id: 21,
    question: "What is meant by 'traceability' in calibration?",
    options: [
      "The ability to track equipment location",
      "An unbroken chain of comparisons to national standards",
      "Recording calibration dates",
      "Tracking who performed calibration"
    ],
    correctAnswer: 1,
    explanation: "Traceability means the calibration can be traced through an unbroken chain of comparisons back to national standards."
  },
  {
    id: 22,
    question: "What is the typical calibration frequency for process instrumentation?",
    options: ["Monthly", "Quarterly", "Annually", "Every 5 years"],
    correctAnswer: 2,
    explanation: "Annual calibration is typical for most process instrumentation, though critical applications may require more frequent calibration."
  },
  {
    id: 23,
    question: "What is 'hysteresis' in instrument calibration?",
    options: [
      "Temperature drift",
      "The difference between upscale and downscale readings",
      "Long-term stability",
      "Response time"
    ],
    correctAnswer: 1,
    explanation: "Hysteresis is the maximum difference between upscale and downscale readings at the same input value."
  },
  {
    id: 24,
    question: "What does a 5-point calibration check typically include?",
    options: [
      "0%, 25%, 50%, 75%, 100%",
      "0%, 20%, 40%, 60%, 80%",
      "10%, 30%, 50%, 70%, 90%",
      "0%, 50%, 100% up and down"
    ],
    correctAnswer: 0,
    explanation: "A 5-point calibration typically tests at 0%, 25%, 50%, 75%, and 100% of the measurement range."
  },

  // Module 7: Advanced Topics
  {
    id: 25,
    question: "What is fieldbus communication?",
    options: [
      "Wireless communication",
      "High-speed Ethernet",
      "Digital communication protocol for field devices",
      "Radio frequency communication"
    ],
    correctAnswer: 2,
    explanation: "Fieldbus is a digital communication protocol specifically designed for connecting field instruments and control systems."
  },
  {
    id: 26,
    question: "What advantage does FOUNDATION Fieldbus offer over traditional 4-20mA?",
    options: [
      "Lower cost",
      "Simpler wiring",
      "Multiple variables and diagnostics over two wires",
      "Faster response"
    ],
    correctAnswer: 2,
    explanation: "FOUNDATION Fieldbus can carry multiple process variables, diagnostics, and configuration data over a single two-wire cable."
  },
  {
    id: 27,
    question: "What is a smart transmitter?",
    options: [
      "A transmitter with high accuracy",
      "A wireless transmitter",
      "A transmitter with digital communication and diagnostics",
      "A transmitter that doesn't need calibration"
    ],
    correctAnswer: 2,
    explanation: "Smart transmitters feature digital communication, self-diagnostics, configuration capabilities, and often multiple sensor inputs."
  },

  // Module 8: Fault Finding and Troubleshooting
  {
    id: 28,
    question: "What is the first step in systematic fault finding?",
    options: [
      "Replace suspected components",
      "Check power supplies",
      "Observe symptoms and gather information",
      "Test all instruments"
    ],
    correctAnswer: 2,
    explanation: "Systematic troubleshooting begins with observing symptoms, gathering information, and understanding the problem before testing."
  },
  {
    id: 29,
    question: "If a 4-20mA signal reads 3.8mA, what is the most likely cause?",
    options: [
      "Transmitter failure",
      "High loop resistance or partial short circuit",
      "Power supply failure",
      "Controller input failure"
    ],
    correctAnswer: 1,
    explanation: "A reading slightly below 4mA typically indicates high loop resistance, loose connections, or partial short circuit."
  },
  {
    id: 30,
    question: "What tool is used to simulate a transmitter output for testing?",
    options: ["Multimeter", "Loop calibrator", "Oscilloscope", "Power supply"],
    correctAnswer: 1,
    explanation: "A loop calibrator can source precise current signals to simulate transmitter outputs for testing purposes."
  },
  {
    id: 31,
    question: "If an RTD reading is higher than expected, possible causes include:",
    options: [
      "Broken RTD element",
      "Short circuit in wiring",
      "High ambient temperature or self-heating",
      "Low loop power"
    ],
    correctAnswer: 2,
    explanation: "High RTD readings can result from high ambient temperature, self-heating from excessive current, or poor heat transfer."
  },

  // Additional Questions for comprehensive coverage
  {
    id: 32,
    question: "What is the purpose of a current-to-pneumatic (I/P) converter?",
    options: [
      "Convert pressure to current",
      "Convert current signal to proportional pneumatic pressure",
      "Provide power isolation",
      "Filter electrical noise"
    ],
    correctAnswer: 1,
    explanation: "I/P converters translate electrical current signals (4-20mA) to proportional pneumatic pressure signals (3-15 psi)."
  },
  {
    id: 33,
    question: "What is 'dead time' in a control system?",
    options: [
      "System shutdown time",
      "Time delay between input change and measurable output response",
      "Controller processing time",
      "Valve stroke time"
    ],
    correctAnswer: 1,
    explanation: "Dead time is the delay between when a control action occurs and when the effect is first measurable in the process."
  },
  {
    id: 34,
    question: "What does 'ranging' mean in transmitter configuration?",
    options: [
      "Setting the measurement span",
      "Positioning the transmitter",
      "Selecting cable length",
      "Adjusting power consumption"
    ],
    correctAnswer: 0,
    explanation: "Ranging involves setting the input span (e.g., 0-100°C) that corresponds to the 4-20mA output range."
  },
  {
    id: 35,
    question: "What is a 'wet leg' in level measurement?",
    options: [
      "A leaking impulse line",
      "An impulse line filled with process fluid",
      "An impulse line filled with fill fluid",
      "A damaged pressure connection"
    ],
    correctAnswer: 2,
    explanation: "A wet leg is an impulse line deliberately filled with a reference fluid to provide hydrostatic pressure reference."
  },
  {
    id: 36,
    question: "What causes 'windup' in integral control action?",
    options: [
      "High proportional gain",
      "Fast response time",
      "Output saturation with continued error accumulation",
      "Noisy input signal"
    ],
    correctAnswer: 2,
    explanation: "Windup occurs when the integral term continues accumulating error even though the output is saturated and cannot respond."
  },
  {
    id: 37,
    question: "What is the typical response time for a gas-filled temperature system?",
    options: ["1 second", "5 seconds", "30 seconds", "2 minutes"],
    correctAnswer: 2,
    explanation: "Gas-filled temperature systems typically have response times of 30 seconds or more due to thermal mass and gas expansion."
  },
  {
    id: 38,
    question: "In a differential pressure flow measurement, what relationship exists between flow and pressure drop?",
    options: ["Linear", "Square root", "Logarithmic", "Exponential"],
    correctAnswer: 1,
    explanation: "Flow is proportional to the square root of differential pressure (Q ∝ √ΔP) for most flow elements."
  },
  {
    id: 39,
    question: "What is 'zero suppression' in a transmitter?",
    options: [
      "Eliminating electrical noise",
      "Setting the zero point above the lower range value",
      "Compensating for temperature effects",
      "Reducing output ripple"
    ],
    correctAnswer: 1,
    explanation: "Zero suppression shifts the measurement range so that the 4mA output represents a value above the actual lower range limit."
  },
  {
    id: 40,
    question: "What safety consideration is most important when working on pressurised systems?",
    options: [
      "Wearing safety glasses",
      "Using correct tools",
      "Proper isolation and depressurisation",
      "Having backup equipment"
    ],
    correctAnswer: 2,
    explanation: "Proper isolation and depressurisation of systems is critical to prevent injury from stored pressure energy."
  },
  {
    id: 41,
    question: "What is the main advantage of using smart valve positioners?",
    options: [
      "Lower cost",
      "Faster response",
      "Diagnostic capabilities and precise positioning",
      "Higher pressure rating"
    ],
    correctAnswer: 2,
    explanation: "Smart positioners provide diagnostic information, precise valve positioning, and can optimise valve performance."
  },
  {
    id: 42,
    question: "What causes 'cavitation' in control valves?",
    options: [
      "High temperature",
      "Low flow velocity",
      "Pressure drop causing liquid to vapourise",
      "Electrical interference"
    ],
    correctAnswer: 2,
    explanation: "Cavitation occurs when pressure drop across a valve causes liquid to vapourise, creating bubbles that collapse violently."
  },
  {
    id: 43,
    question: "What is the purpose of a signal isolator?",
    options: [
      "Amplify weak signals",
      "Provide electrical isolation between input and output",
      "Convert signal types",
      "Filter noise"
    ],
    correctAnswer: 1,
    explanation: "Signal isolators provide electrical isolation to prevent ground loops and protect equipment from electrical faults."
  },
  {
    id: 44,
    question: "In a 3-wire RTD connection, what is the purpose of the third wire?",
    options: [
      "Provide power",
      "Carry return current",
      "Compensate for lead wire resistance",
      "Provide shield ground"
    ],
    correctAnswer: 2,
    explanation: "The third wire in a 3-wire RTD allows compensation for lead wire resistance to improve measurement accuracy."
  },
  {
    id: 45,
    question: "What does 'common mode rejection' mean in instrumentation?",
    options: [
      "Rejecting AC power frequency",
      "Rejecting signals common to both input lines",
      "Rejecting high frequency noise",
      "Rejecting temperature effects"
    ],
    correctAnswer: 1,
    explanation: "Common mode rejection is the ability to reject signals that appear equally on both input lines, typically noise."
  },
  {
    id: 46,
    question: "What is the typical voltage for HART communication?",
    options: ["0.5V", "1.2V peak-to-peak", "5V", "12V"],
    correctAnswer: 1,
    explanation: "HART signals are typically 1.2V peak-to-peak FSK (Frequency Shift Keying) signals superimposed on the 4-20mA."
  },
  {
    id: 47,
    question: "What environmental factor most affects electronic transmitter accuracy?",
    options: ["Humidity", "Temperature", "Vibration", "Electromagnetic fields"],
    correctAnswer: 1,
    explanation: "Temperature is typically the most significant environmental factor affecting electronic transmitter accuracy and stability."
  },
  {
    id: 48,
    question: "What is 'two-wire' transmission in instrumentation?",
    options: [
      "Using two separate cables",
      "Power and signal carried on the same two wires",
      "Dual redundant signals",
      "Differential signal transmission"
    ],
    correctAnswer: 1,
    explanation: "Two-wire transmission carries both power for the transmitter and the signal current on the same pair of wires."
  },
  {
    id: 49,
    question: "What is the advantage of using ceramic sensors in harsh environments?",
    options: [
      "Lower cost",
      "Higher sensitivity",
      "Superior chemical and temperature resistance",
      "Easier installation"
    ],
    correctAnswer: 2,
    explanation: "Ceramic sensors offer excellent resistance to chemical attack and high temperatures compared to metal sensors."
  },
  {
    id: 50,
    question: "What does 'span adjustment' accomplish in transmitter calibration?",
    options: [
      "Sets the zero point",
      "Adjusts the slope of the input/output relationship",
      "Compensates for temperature",
      "Reduces noise"
    ],
    correctAnswer: 1,
    explanation: "Span adjustment changes the slope or gain of the transmitter, affecting how much the output changes for a given input change."
  },
  {
    id: 51,
    question: "What is the primary concern when installing temperature sensors in flowing media?",
    options: [
      "Electrical interference",
      "Adequate immersion depth and good thermal contact",
      "Power consumption",
      "Cable routing"
    ],
    correctAnswer: 1,
    explanation: "Proper immersion depth and thermal contact ensure the sensor accurately measures the media temperature rather than pipe wall temperature."
  },
  {
    id: 52,
    question: "What happens to a 4-20mA signal if the loop resistance is too high?",
    options: [
      "Signal increases",
      "Signal becomes noisy",
      "Transmitter cannot source enough voltage, signal drops",
      "Signal becomes non-linear"
    ],
    correctAnswer: 2,
    explanation: "If loop resistance exceeds transmitter compliance voltage capability, the transmitter cannot maintain proper current flow."
  },
  {
    id: 53,
    question: "What is 'bias' in control system terminology?",
    options: [
      "A systematic error",
      "Manual adjustment to controller output",
      "Temperature compensation",
      "Signal offset"
    ],
    correctAnswer: 1,
    explanation: "Bias is a manual adjustment that adds or subtracts a constant value to the controller output to achieve desired operation."
  },
  {
    id: 54,
    question: "What type of valve characteristic provides equal percentage flow change for equal stroke increments?",
    options: ["Linear", "Equal percentage", "Quick opening", "Modified parabolic"],
    correctAnswer: 1,
    explanation: "Equal percentage valves provide flow changes that are a constant percentage of the existing flow rate for each increment of stroke."
  },
  {
    id: 55,
    question: "What is the main purpose of using compensated pressure transmitters?",
    options: [
      "Increase accuracy",
      "Automatically correct for temperature or other variables",
      "Reduce cost",
      "Simplify installation"
    ],
    correctAnswer: 1,
    explanation: "Compensated transmitters automatically adjust their output to account for effects like temperature that would otherwise cause measurement errors."
  },
  {
    id: 56,
    question: "In level measurement using hydrostatic pressure, what factor must be considered?",
    options: [
      "Ambient temperature only",
      "Fluid density and its variations",
      "Pipe diameter",
      "Flow rate"
    ],
    correctAnswer: 1,
    explanation: "Hydrostatic level measurement depends on fluid density (P = ρgh), so density variations must be considered for accuracy."
  },
  {
    id: 57,
    question: "What is 'cascade control'?",
    options: [
      "Multiple controllers in series",
      "Primary controller sets setpoint for secondary controller",
      "Backup control system",
      "Sequential valve operation"
    ],
    correctAnswer: 1,
    explanation: "Cascade control uses a primary controller that sets the setpoint for a secondary controller to improve overall control performance."
  },
  {
    id: 58,
    question: "What safety device is essential when working with cryogenic temperature sensors?",
    options: [
      "Safety glasses",
      "Insulated gloves and face protection",
      "Hard hat",
      "Steel-toed boots"
    ],
    correctAnswer: 1,
    explanation: "Cryogenic temperatures can cause severe frostbite instantly, requiring insulated gloves and face protection when handling."
  },
  {
    id: 59,
    question: "What is 'turndown ratio' for a flow measurement device?",
    options: [
      "Minimum to maximum flow range",
      "Response time",
      "Accuracy specification",
      "Installation requirement"
    ],
    correctAnswer: 0,
    explanation: "Turndown ratio is the ratio of maximum to minimum flow rates that can be accurately measured (e.g., 10:1 turndown)."
  },
  {
    id: 60,
    question: "What causes 'aliasing' in digital signal processing?",
    options: [
      "Low sampling rate relative to signal frequency",
      "High noise levels",
      "Temperature variations",
      "Poor calibration"
    ],
    correctAnswer: 0,
    explanation: "Aliasing occurs when the sampling rate is less than twice the highest signal frequency, causing distortion in the digitised signal."
  },
  {
    id: 61,
    question: "What is the purpose of a 'snubber' in pressure measurement systems?",
    options: [
      "Provide electrical isolation",
      "Dampen pressure pulsations and protect gauge",
      "Amplify pressure signals",
      "Convert pressure units"
    ],
    correctAnswer: 1,
    explanation: "Snubbers dampen rapid pressure fluctuations that could damage pressure gauges or transmitters in pulsating applications."
  },
  {
    id: 62,
    question: "What is 'feed-forward control'?",
    options: [
      "Advanced PID control",
      "Control action based on disturbance before it affects the process",
      "Rapid response control",
      "Automatic tuning"
    ],
    correctAnswer: 1,
    explanation: "Feed-forward control measures disturbances and takes corrective action before they can affect the controlled variable."
  },
  {
    id: 63,
    question: "What precaution is necessary when installing electromagnetic flow meters?",
    options: [
      "Avoid metallic piping",
      "Ensure process fluid has minimum conductivity",
      "Use only plastic fittings",
      "Install vertically only"
    ],
    correctAnswer: 1,
    explanation: "Electromagnetic flow meters require conductive fluids (typically >5 μS/cm) to function properly."
  },
  {
    id: 64,
    question: "What is 'process gain' in control systems?",
    options: [
      "Controller amplification",
      "Change in process output per unit change in input",
      "Signal strength",
      "Power consumption"
    ],
    correctAnswer: 1,
    explanation: "Process gain is the steady-state change in the process variable per unit change in the manipulated variable."
  },
  {
    id: 65,
    question: "What advantage do ultrasonic level sensors offer?",
    options: [
      "Highest accuracy",
      "Lowest cost",
      "Non-contact measurement",
      "Fastest response"
    ],
    correctAnswer: 2,
    explanation: "Ultrasonic sensors provide non-contact level measurement, making them ideal for corrosive or dirty applications."
  },
  {
    id: 66,
    question: "What is 'valve hunting' in control systems?",
    options: [
      "Searching for the best valve",
      "Continuous oscillation of valve position",
      "Valve selection process",
      "Maintenance procedure"
    ],
    correctAnswer: 1,
    explanation: "Valve hunting is continuous oscillation caused by poor control tuning, deadband, or mechanical issues in the valve."
  },
  {
    id: 67,
    question: "What factor most affects the accuracy of vortex flow meters?",
    options: [
      "Fluid density",
      "Pipe material",
      "Reynolds number and flow profile",
      "Ambient temperature"
    ],
    correctAnswer: 2,
    explanation: "Vortex flow meters require adequate Reynolds number and proper flow profile development for accurate measurement."
  },
  {
    id: 68,
    question: "What is 'burst pressure' rating for pressure instruments?",
    options: [
      "Normal operating pressure",
      "Maximum safe working pressure",
      "Pressure that will not cause permanent damage",
      "Pressure that causes rupture"
    ],
    correctAnswer: 3,
    explanation: "Burst pressure is the pressure level that will cause the pressure boundary to rupture or fail catastrophically."
  },
  {
    id: 69,
    question: "What communication protocol is commonly used in modern DCS systems?",
    options: ["RS-232", "Ethernet", "4-20mA", "Pneumatic"],
    correctAnswer: 1,
    explanation: "Modern DCS systems predominantly use Ethernet-based protocols for high-speed digital communication and networking."
  },
  {
    id: 70,
    question: "What is 'linearisation' in transmitter programming?",
    options: [
      "Setting communication parameters",
      "Mathematical compensation for non-linear sensor response",
      "Calibration procedure",
      "Error correction"
    ],
    correctAnswer: 1,
    explanation: "Linearisation applies mathematical functions to compensate for non-linear relationships between measured variable and sensor output."
  },
  {
    id: 71,
    question: "What safety consideration is critical for oxygen measurement applications?",
    options: [
      "High temperature rating",
      "Explosion-proof enclosure",
      "Materials compatibility and fire safety",
      "Pressure rating"
    ],
    correctAnswer: 2,
    explanation: "Oxygen applications require careful material selection to avoid combustible materials and reduce fire/explosion risk."
  },
  {
    id: 72,
    question: "What is 'response time' for a temperature sensor?",
    options: [
      "Time to reach final value",
      "Time to reach 63.2% of final value",
      "Time to start responding",
      "Processing delay"
    ],
    correctAnswer: 1,
    explanation: "Response time (time constant) is typically defined as time to reach 63.2% of the final value after a step change."
  },
  {
    id: 73,
    question: "What causes 'drift' in instrument readings?",
    options: [
      "Electrical noise",
      "Gradual change in instrument characteristics over time",
      "Temperature changes",
      "Calibration errors"
    ],
    correctAnswer: 1,
    explanation: "Drift is the gradual change in instrument output for the same input over time, due to component ageing or environmental effects."
  },
  {
    id: 74,
    question: "What is the main advantage of wireless instrumentation?",
    options: [
      "Higher accuracy",
      "Faster response",
      "Reduced installation and maintenance costs",
      "Better security"
    ],
    correctAnswer: 2,
    explanation: "Wireless instrumentation eliminates the need for extensive cable runs, reducing installation costs and enabling measurement in inaccessible locations."
  },
  {
    id: 75,
    question: "What documentation is essential for instrument maintenance?",
    options: [
      "Only calibration certificates",
      "Calibration certificates, maintenance records, and configuration data",
      "Only manufacturer manuals",
      "Only installation drawings"
    ],
    correctAnswer: 1,
    explanation: "Comprehensive documentation including calibration certificates, maintenance history, and configuration data is essential for effective instrument management."
  },

  // Additional 50 questions for expanded coverage (76-125)
  {
    id: 76,
    question: "What is the primary advantage of using pneumatic transmitters in hazardous areas?",
    options: [
      "Higher accuracy",
      "Faster response",
      "Intrinsically safe without barriers",
      "Lower maintenance"
    ],
    correctAnswer: 2,
    explanation: "Pneumatic transmitters are inherently intrinsically safe as they don't use electrical energy that could cause ignition in explosive atmospheres."
  },
  {
    id: 77,
    question: "What does 'rangeability' mean for a flow measurement device?",
    options: [
      "The ratio of maximum to minimum measurable flow",
      "The measurement accuracy",
      "The installation requirements",
      "The pressure drop characteristics"
    ],
    correctAnswer: 0,
    explanation: "Rangeability (turndown ratio) is the ratio of the maximum to minimum flow rates that can be accurately measured by the device."
  },
  {
    id: 78,
    question: "In a radar level measurement system, what causes measurement errors?",
    options: [
      "Temperature variations only",
      "Foam, vapours, and multiple reflections",
      "Atmospheric pressure only",
      "Power supply variations only"
    ],
    correctAnswer: 1,
    explanation: "Radar level systems can be affected by foam on the surface, vapours that absorb radar energy, and multiple reflections from internal structures."
  },
  {
    id: 79,
    question: "What is 'split-range control'?",
    options: [
      "Using two controllers for one process",
      "One controller output operating two final control elements sequentially",
      "Measuring two variables simultaneously",
      "Backup control system"
    ],
    correctAnswer: 1,
    explanation: "Split-range control uses one controller output to operate two final control elements in sequence, typically for heating/cooling applications."
  },
  {
    id: 80,
    question: "What is the main disadvantage of capacitive level sensors?",
    options: [
      "Poor accuracy",
      "Sensitivity to dielectric constant changes in the medium",
      "High power consumption",
      "Complex installation"
    ],
    correctAnswer: 1,
    explanation: "Capacitive level sensors measure changes in capacitance, which depends on the dielectric constant of the medium, making them sensitive to changes in fluid composition."
  },
  {
    id: 81,
    question: "What does 'burden' refer to in current loop circuits?",
    options: [
      "Load resistance in the circuit",
      "Signal processing delay",
      "Power consumption",
      "Cable inductance"
    ],
    correctAnswer: 0,
    explanation: "Burden is the total resistance load in a current loop circuit, including receivers, indicators, and cable resistance."
  },
  {
    id: 82,
    question: "What safety device is required when using electric heating elements in potentially explosive atmospheres?",
    options: [
      "Temperature controller only",
      "Surface temperature limiter",
      "Pressure relief valve",
      "Emergency stop button"
    ],
    correctAnswer: 1,
    explanation: "Surface temperature limiters prevent heating elements from exceeding safe surface temperatures that could ignite explosive atmospheres."
  },
  {
    id: 83,
    question: "What is 'batch control' in process automation?",
    options: [
      "Continuous process control",
      "Sequential control of discrete manufacturing steps",
      "Emergency shutdown control",
      "Manual control procedures"
    ],
    correctAnswer: 1,
    explanation: "Batch control manages the sequential steps in manufacturing discrete quantities of product, following predetermined recipes and procedures."
  },
  {
    id: 84,
    question: "What causes 'stiction' in control valves?",
    options: [
      "High pressure",
      "Static friction preventing smooth valve movement",
      "Electrical interference",
      "Temperature variations"
    ],
    correctAnswer: 1,
    explanation: "Stiction (static friction) occurs when a valve remains stationary despite changing input signals until the force overcomes static friction, causing jerky movement."
  },
  {
    id: 85,
    question: "What is the purpose of a 'totaliser' in flow measurement?",
    options: [
      "Measure instantaneous flow rate",
      "Accumulate total volume or mass over time",
      "Control flow rate",
      "Compensate for pressure variations"
    ],
    correctAnswer: 1,
    explanation: "A totaliser integrates flow rate over time to provide cumulative volume or mass totals for custody transfer or batch control."
  },
  {
    id: 86,
    question: "What is 'dead band' in a controller?",
    options: [
      "Emergency stop function",
      "Range where controller output doesn't change despite input changes",
      "Controller failure mode",
      "Measurement range limit"
    ],
    correctAnswer: 1,
    explanation: "Dead band is a range around the setpoint where small deviations don't cause controller output changes, reducing valve wear from hunting."
  },
  {
    id: 87,
    question: "What type of sensor is typically used for measuring vibration?",
    options: [
      "Thermocouple",
      "Accelerometer",
      "RTD",
      "Pressure transmitter"
    ],
    correctAnswer: 1,
    explanation: "Accelerometers measure acceleration/deceleration and are commonly used for vibration monitoring in rotating machinery."
  },
  {
    id: 88,
    question: "What is 'compensation' in temperature measurement?",
    options: [
      "Adjusting for ambient temperature effects",
      "Calibration procedure",
      "Installation requirement",
      "Safety feature"
    ],
    correctAnswer: 0,
    explanation: "Compensation corrects for environmental effects like ambient temperature that can cause measurement errors in temperature sensors."
  },
  {
    id: 89,
    question: "What is the main advantage of using digital communication protocols like HART?",
    options: [
      "Faster response time",
      "Multiple variables and diagnostics with configuration capability",
      "Lower installation cost",
      "Higher accuracy"
    ],
    correctAnswer: 1,
    explanation: "Digital protocols enable transmission of multiple process variables, diagnostic information, and remote configuration over the same wires."
  },
  {
    id: 90,
    question: "What causes 'noise' in electronic signal transmission?",
    options: [
      "High temperature only",
      "Electromagnetic interference from external sources",
      "Low pressure only",
      "Mechanical vibration only"
    ],
    correctAnswer: 1,
    explanation: "Noise in electronic signals is primarily caused by electromagnetic interference from motors, power lines, radio transmissions, and switching devices."
  },
  {
    id: 91,
    question: "What is 'fail-safe' design in instrumentation?",
    options: [
      "Systems that never fail",
      "Systems designed to fail in a safe condition",
      "Backup systems only",
      "Emergency stop systems"
    ],
    correctAnswer: 1,
    explanation: "Fail-safe design ensures that when a component fails, the system moves to a predetermined safe state to prevent hazardous conditions."
  },
  {
    id: 92,
    question: "What is the typical pressure range for pneumatic instrumentation signals?",
    options: [
      "0-15 psi",
      "3-15 psi",
      "0-20 psi",
      "5-25 psi"
    ],
    correctAnswer: 1,
    explanation: "Standard pneumatic instrumentation signals use 3-15 psi (0.2-1.0 bar) range, analogous to 4-20mA current signals."
  },
  {
    id: 93,
    question: "What is 'loop tuning' in process control?",
    options: [
      "Adjusting PID parameters for optimal performance",
      "Calibrating instruments",
      "Checking signal wiring",
      "Testing safety systems"
    ],
    correctAnswer: 0,
    explanation: "Loop tuning involves adjusting PID controller parameters (proportional, integral, derivative) to achieve optimal control performance."
  },
  {
    id: 94,
    question: "What safety consideration is critical when working with steam temperature measurement?",
    options: [
      "Electrical safety only",
      "Proper insulation and burn protection",
      "Vibration protection only",
      "Corrosion resistance only"
    ],
    correctAnswer: 1,
    explanation: "Steam systems require proper thermal insulation and personal protection to prevent serious burns from high-temperature surfaces and steam leaks."
  },
  {
    id: 95,
    question: "What is 'SIL' rating in functional safety?",
    options: [
      "System Integration Level",
      "Safety Integrity Level - quantitative measure of safety performance",
      "Signal Input Level",
      "Standard Installation Level"
    ],
    correctAnswer: 1,
    explanation: "Safety Integrity Level (SIL) is a quantitative measure of safety system performance, ranging from SIL 1 to SIL 4, with higher numbers indicating greater safety integrity."
  },
  {
    id: 96,
    question: "What causes 'ground loops' in instrumentation systems?",
    options: [
      "Multiple ground connections creating current flow",
      "High resistance connections",
      "Power supply fluctuations",
      "Temperature variations"
    ],
    correctAnswer: 0,
    explanation: "Ground loops occur when multiple paths to ground exist, creating circulating currents that can cause measurement errors and noise."
  },
  {
    id: 97,
    question: "What is 'smart positioner' technology in valve control?",
    options: [
      "Faster valve actuation",
      "Digital communication with diagnostics and precise positioning",
      "Pneumatic operation only",
      "Manual positioning backup"
    ],
    correctAnswer: 1,
    explanation: "Smart positioners use digital technology to provide precise valve positioning, diagnostic capabilities, and communication with control systems."
  },
  {
    id: 98,
    question: "What environmental factor most affects ultrasonic level measurement accuracy?",
    options: [
      "Temperature affecting sound velocity",
      "Humidity only",
      "Atmospheric pressure only",
      "Lighting conditions"
    ],
    correctAnswer: 0,
    explanation: "Temperature significantly affects the velocity of sound in air, requiring compensation for accurate ultrasonic level measurement."
  },
  {
    id: 99,
    question: "What is 'fieldbus power' in digital communication systems?",
    options: [
      "High voltage power supply",
      "Power supplied to field devices through communication cables",
      "Emergency power backup",
      "Power measurement function"
    ],
    correctAnswer: 1,
    explanation: "Fieldbus power provides operating power to field devices through the same cables used for digital communication, simplifying installation."
  },
  {
    id: 100,
    question: "What safety protocol is essential when calibrating pressure instruments?",
    options: [
      "Wearing safety glasses only",
      "Proper isolation, venting, and pressure relief procedures",
      "Using only plastic tools",
      "Working alone for concentration"
    ],
    correctAnswer: 1,
    explanation: "Pressure instrument calibration requires proper isolation from process, venting of trapped pressure, and adequate pressure relief to prevent injury."
  },
  {
    id: 101,
    question: "What is 'flow compensation' in mass flow measurement?",
    options: [
      "Adjusting for temperature and pressure effects on fluid density",
      "Calibrating the flow meter",
      "Installing flow straighteners",
      "Using backup flow measurement"
    ],
    correctAnswer: 0,
    explanation: "Flow compensation adjusts volumetric flow measurements for temperature and pressure effects on fluid density to provide accurate mass flow."
  },
  {
    id: 102,
    question: "What causes 'thermal shock' in temperature sensors?",
    options: [
      "Gradual temperature changes",
      "Rapid temperature changes causing material stress",
      "Electrical overload",
      "Mechanical vibration"
    ],
    correctAnswer: 1,
    explanation: "Thermal shock occurs when rapid temperature changes cause differential expansion/contraction in sensor materials, potentially causing damage."
  },
  {
    id: 103,
    question: "What is 'multivariable' transmission in smart instruments?",
    options: [
      "Using multiple transmitters",
      "Single transmitter measuring and transmitting multiple process variables",
      "Variable signal ranges",
      "Multiple output signals"
    ],
    correctAnswer: 1,
    explanation: "Multivariable transmitters can measure and communicate multiple process variables (pressure, temperature, differential pressure) from a single device."
  },
  {
    id: 104,
    question: "What is the purpose of 'cold junction compensation' in thermocouples?",
    options: [
      "Protecting from low temperatures",
      "Compensating for reference junction temperature variations",
      "Reducing electrical noise",
      "Improving response time"
    ],
    correctAnswer: 1,
    explanation: "Cold junction compensation corrects for temperature variations at the reference junction to maintain accurate thermocouple measurements."
  },
  {
    id: 105,
    question: "What safety consideration is paramount when working with radioactive level sources?",
    options: [
      "Electrical safety only",
      "Radiation protection and proper licensing/training",
      "Mechanical safety only",
      "Fire protection only"
    ],
    correctAnswer: 1,
    explanation: "Radioactive sources require specialised radiation protection training, proper licensing, monitoring equipment, and strict safety procedures."
  },
  {
    id: 106,
    question: "What is 'linearisation' in signal processing?",
    options: [
      "Converting curved sensor response to linear output",
      "Signal amplification",
      "Noise filtering",
      "Signal isolation"
    ],
    correctAnswer: 0,
    explanation: "Linearisation applies mathematical functions to convert non-linear sensor responses (like square root for flow) into linear output signals."
  },
  {
    id: 107,
    question: "What causes 'galvanic corrosion' in instrumentation installations?",
    options: [
      "High temperature",
      "Different metals in contact with electrolyte present",
      "Electrical current only",
      "Mechanical stress"
    ],
    correctAnswer: 1,
    explanation: "Galvanic corrosion occurs when dissimilar metals are in electrical contact in the presence of an electrolyte, causing accelerated corrosion."
  },
  {
    id: 108,
    question: "What is 'trim' in control valve terminology?",
    options: [
      "Valve body size",
      "Internal components (plug, seat, cage) that control flow",
      "Actuator adjustment",
      "Position feedback"
    ],
    correctAnswer: 1,
    explanation: "Valve trim refers to the internal flow-controlling components including the plug, seat, and cage that determine flow characteristics."
  },
  {
    id: 109,
    question: "What is the advantage of using 'force balance' transmitters?",
    options: [
      "Lower cost",
      "High accuracy and minimal sensor movement",
      "Faster response",
      "Simpler installation"
    ],
    correctAnswer: 1,
    explanation: "Force balance transmitters provide high accuracy by using feedback to maintain the sensor in a null position, minimising mechanical effects."
  },
  {
    id: 110,
    question: "What safety device is essential in oxygen-enriched atmospheres?",
    options: [
      "Spark-proof tools and clothing",
      "Standard electrical equipment",
      "Higher pressure ratings only",
      "Faster response sensors only"
    ],
    correctAnswer: 0,
    explanation: "Oxygen-enriched atmospheres dramatically increase fire risk, requiring spark-proof tools, antistatic clothing, and elimination of ignition sources."
  },
  {
    id: 111,
    question: "What is 'hysteresis error' in measurement systems?",
    options: [
      "Temperature-related error",
      "Difference between ascending and descending measurement paths",
      "Calibration drift error",
      "Installation error"
    ],
    correctAnswer: 1,
    explanation: "Hysteresis error is the maximum difference between readings when approaching the same point from opposite directions (increasing vs decreasing input)."
  },
  {
    id: 112,
    question: "What is 'purging' in instrumentation installations?",
    options: [
      "Cleaning instruments",
      "Introducing clean fluid to protect instruments from process contamination",
      "Calibration procedure",
      "Emergency shutdown"
    ],
    correctAnswer: 1,
    explanation: "Purging introduces clean gas or liquid to protect instruments from corrosive, plugging, or crystallising process fluids."
  },
  {
    id: 113,
    question: "What communication standard is commonly used for industrial Ethernet?",
    options: [
      "RS-232",
      "Profinet/EtherNet/IP",
      "4-20mA",
      "HART"
    ],
    correctAnswer: 1,
    explanation: "Industrial Ethernet protocols like Profinet and EtherNet/IP provide high-speed communication for modern automation systems."
  },
  {
    id: 114,
    question: "What is 'fugitive emission' monitoring in instrumentation?",
    options: [
      "Measuring process variables",
      "Detecting unintended releases of gases/vapours to atmosphere",
      "Monitoring power consumption",
      "Measuring vibration"
    ],
    correctAnswer: 1,
    explanation: "Fugitive emission monitoring detects and quantifies unintended releases of process fluids to the atmosphere from equipment leaks."
  },
  {
    id: 115,
    question: "What advantage do ceramic pressure sensors offer?",
    options: [
      "Lower cost only",
      "Excellent corrosion resistance and high temperature capability",
      "Faster response only",
      "Easier installation only"
    ],
    correctAnswer: 1,
    explanation: "Ceramic pressure sensors offer superior resistance to corrosive media and can operate at higher temperatures than metal sensors."
  },
  {
    id: 116,
    question: "What is 'process chromatography' used for in instrumentation?",
    options: [
      "Temperature measurement",
      "Analysing chemical composition of process streams",
      "Flow measurement",
      "Pressure measurement"
    ],
    correctAnswer: 1,
    explanation: "Process chromatography separates and analyses chemical components in process streams for composition monitoring and control."
  },
  {
    id: 117,
    question: "What safety requirement applies to instruments in Zone 1 hazardous areas?",
    options: [
      "Standard electrical equipment",
      "Intrinsically safe or flameproof certification required",
      "Weather protection only",
      "Corrosion resistance only"
    ],
    correctAnswer: 1,
    explanation: "Zone 1 areas require instruments with intrinsically safe, flameproof, or other certified explosion protection methods."
  },
  {
    id: 118,
    question: "What is 'cavitation' and how does it affect flow measurement?",
    options: [
      "Has no effect on measurement",
      "Vapour bubble formation causing measurement errors and equipment damage",
      "Only affects installation",
      "Only affects maintenance"
    ],
    correctAnswer: 1,
    explanation: "Cavitation occurs when local pressure drops below vapour pressure, forming bubbles that collapse violently, causing measurement errors and damage."
  },
  {
    id: 119,
    question: "What is 'mesh networking' in wireless instrumentation?",
    options: [
      "Single point-to-point communication",
      "Multiple interconnected communication paths for reliability",
      "Wired communication backup",
      "Power distribution network"
    ],
    correctAnswer: 1,
    explanation: "Mesh networking creates multiple communication paths between devices, providing redundancy and self-healing capabilities for reliable wireless communication."
  },
  {
    id: 120,
    question: "What causes 'coating effects' in level measurement systems?",
    options: [
      "Temperature changes only",
      "Process material adhering to sensor surfaces",
      "Electrical interference only",
      "Mechanical vibration only"
    ],
    correctAnswer: 1,
    explanation: "Coating occurs when process materials adhere to sensor surfaces, affecting capacitive, ultrasonic, and radar level measurements."
  },
  {
    id: 121,
    question: "What is 'loop-powered' operation in transmitters?",
    options: [
      "High power operation",
      "Transmitter powered by the current loop itself",
      "Battery powered operation",
      "Solar powered operation"
    ],
    correctAnswer: 1,
    explanation: "Loop-powered transmitters receive their operating power from the 4-20mA current loop, eliminating the need for separate power supplies."
  },
  {
    id: 122,
    question: "What safety consideration is critical for pH measurement systems?",
    options: [
      "Temperature rating only",
      "Chemical compatibility and proper material selection",
      "Pressure rating only",
      "Electrical rating only"
    ],
    correctAnswer: 1,
    explanation: "pH measurement involves corrosive chemicals requiring careful selection of materials compatible with acids, bases, and cleaning solutions."
  },
  {
    id: 123,
    question: "What is 'simulation mode' in smart instrumentation?",
    options: [
      "Emergency operation",
      "Outputting fixed test signals for system testing",
      "Automatic calibration",
      "Power saving mode"
    ],
    correctAnswer: 1,
    explanation: "Simulation mode allows smart instruments to output fixed, known signals for testing downstream systems without affecting the process."
  },
  {
    id: 124,
    question: "What environmental factor most affects the accuracy of gas density measurement?",
    options: [
      "Humidity only",
      "Temperature and pressure effects on gas density",
      "Lighting conditions",
      "Electromagnetic fields only"
    ],
    correctAnswer: 1,
    explanation: "Gas density is highly dependent on temperature and pressure according to gas laws, requiring compensation for accurate measurement."
  },
  {
    id: 125,
    question: "What is 'differential pressure' flow measurement principle?",
    options: [
      "Measuring absolute pressure only",
      "Measuring pressure drop across a flow restriction",
      "Measuring temperature difference",
      "Measuring velocity directly"
    ],
    correctAnswer: 1,
    explanation: "Differential pressure flow measurement uses the pressure drop across a restriction (orifice plate, venturi) which is proportional to the square of flow rate."
  }
];

export const getRandomInstrumentationExamQuestions = (count: number): QuizQuestion[] => {
  const shuffled = [...instrumentationMockExamQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};