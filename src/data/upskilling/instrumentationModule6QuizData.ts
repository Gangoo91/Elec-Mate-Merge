export const instrumentationModule6Section1Questions = [
  {
    id: 1,
    question: "What is the formal definition of calibration?",
    options: [
      "Adjusting an instrument to read correctly",
      "Comparison of measurement values delivered by a device under test with those of a calibration standard of known accuracy",
      "Replacing old instruments with new ones",
      "Testing if equipment works properly"
    ],
    correctAnswer: 1,
    explanation: "Calibration is specifically the comparison process between a device under test and a calibration standard, establishing the relationship and determining measurement uncertainty."
  },
  {
    id: 2,
    question: "Which of these is NOT a key component of calibration?",
    options: [
      "Device Under Test (DUT)",
      "Reference Standard", 
      "Comparison Process",
      "Equipment Replacement"
    ],
    correctAnswer: 3,
    explanation: "Equipment replacement is not part of calibration. The key components are DUT, reference standard, comparison process, documentation, and uncertainty assessment."
  },
  {
    id: 3,
    question: "What is the difference between calibration and adjustment?",
    options: [
      "They are the same thing",
      "Calibration determines the relationship between measured and actual values; adjustment brings the instrument's response within acceptable limits",
      "Adjustment is more important than calibration",
      "Calibration is only for new equipment"
    ],
    correctAnswer: 1,
    explanation: "Calibration determines measurement relationships and doesn't always require adjustment. Adjustment specifically corrects the instrument's response to meet specifications."
  },
  {
    id: 4,
    question: "Which consequence is NOT typically associated with inadequate calibration?",
    options: [
      "Safety incidents from incorrect readings",
      "Regulatory fines and penalties",
      "Increased equipment purchase costs",
      "Product quality issues and waste"
    ],
    correctAnswer: 2,
    explanation: "Increased equipment purchase costs are not a direct consequence of inadequate calibration. The main consequences are safety risks, financial losses, regulatory issues, and operational problems."
  },
  {
    id: 5,
    question: "In which type of maintenance strategy does calibration primarily fit?",
    options: [
      "Reactive maintenance only",
      "Preventive maintenance",
      "Emergency maintenance",
      "Cost-reduction maintenance"
    ],
    correctAnswer: 1,
    explanation: "Calibration is a critical component of preventive maintenance strategies, ensuring instruments maintain accuracy and reliability throughout their operational life."
  }
];

export const instrumentationModule6Section2Questions = [
  {
    id: 1,
    question: "What is the most important factor when selecting calibration equipment?",
    options: [
      "Lowest cost option",
      "Most features available",
      "Accuracy that's at least 4 times better than the device being calibrated",
      "Brand popularity"
    ],
    correctAnswer: 2,
    explanation: "The accuracy ratio of 4:1 (or better) ensures the calibration standard doesn't contribute significant uncertainty to the measurement. This is fundamental to proper calibration practice."
  },
  {
    id: 2,
    question: "What does UKAS stand for and what is its role?",
    options: [
      "UK Accreditation Service - provides accreditation for calibration laboratories",
      "Universal Calibration Standards - sets global calibration requirements",
      "UK Association of Standards - writes calibration procedures",
      "United Kingdom Accuracy Society - trains calibration technicians"
    ],
    correctAnswer: 0,
    explanation: "UKAS is the United Kingdom Accreditation Service, the national accreditation body that ensures calibration laboratories meet international standards and maintain traceability."
  },
  {
    id: 3,
    question: "Which environmental factor has the greatest impact on electrical calibrations?",
    options: [
      "Humidity only",
      "Temperature only", 
      "Both temperature and humidity",
      "Air pressure"
    ],
    correctAnswer: 2,
    explanation: "Both temperature and humidity significantly affect electrical measurements. Temperature affects component values and EMF generation, while humidity affects insulation and can cause condensation."
  },
  {
    id: 4,
    question: "What is the minimum recommended accuracy ratio for calibration standards?",
    options: [
      "2:1 (standard 2x more accurate)",
      "3:1 (standard 3x more accurate)",
      "4:1 (standard 4x more accurate)",
      "10:1 (standard 10x more accurate)"
    ],
    correctAnswer: 2,
    explanation: "The 4:1 accuracy ratio is the minimum recommended standard to ensure the calibration equipment doesn't contribute significant uncertainty to the measurement process."
  },
  {
    id: 5,
    question: "Why is traceability to national standards important?",
    options: [
      "It's required by law in all cases",
      "It ensures measurements are consistent globally and provides legal defensibility",
      "It makes calibration faster",
      "It reduces calibration costs"
    ],
    correctAnswer: 1,
    explanation: "Traceability to national standards ensures global measurement consistency, provides legal defensibility, and maintains confidence in measurement accuracy across different organizations and countries."
  }
];

export const instrumentationModule6Section3Questions = [
  {
    id: 1,
    question: "What is the first critical safety step before any calibration work?",
    options: [
      "Check the weather conditions",
      "Switch off and lock out electrical supplies, close isolation valves, and vent trapped pressure",
      "Call the supervisor",
      "Read the manual"
    ],
    correctAnswer: 1,
    explanation: "Device isolation is the first critical safety step. This includes electrical isolation, process isolation, pressure relief, tag out procedures, and verification of isolation."
  },
  {
    id: 2,
    question: "For pressure device calibration, what points should be tested at minimum?",
    options: [
      "Just 0% and 100%",
      "0%, 25%, 50%, 75%, and 100% of range",
      "Only the mid-point",
      "Whatever is convenient"
    ],
    correctAnswer: 1,
    explanation: "Multi-point verification should test at 0%, 25%, 50%, 75%, and 100% of range, performing both ascending and descending readings to calculate hysteresis and linearity errors."
  },
  {
    id: 3,
    question: "What is the stability criterion for temperature calibration?",
    options: [
      "±1°C change over 5 minutes",
      "±0.1°C change over 5 minutes", 
      "±0.01°C change over 2 minutes",
      "Any stable reading"
    ],
    correctAnswer: 2,
    explanation: "The stability criterion for temperature calibration is less than 0.01°C change over 2 minutes, ensuring thermal equilibrium has been reached before taking readings."
  },
  {
    id: 4,
    question: "For electrical calibration, why is 4-wire connection recommended for resistance measurements?",
    options: [
      "It looks more professional",
      "It accounts for lead resistance and provides best accuracy",
      "It's required by regulation",
      "It's faster to connect"
    ],
    correctAnswer: 1,
    explanation: "4-wire (Kelvin) connection eliminates the effect of lead resistance in precision resistance measurements, providing the highest accuracy by separating current and voltage paths."
  },
  {
    id: 5,
    question: "What should be recorded during calibration besides the actual readings?",
    options: [
      "Only the final results",
      "Environmental conditions, reference standards used, technician ID, timestamps, and any adjustments made",
      "Just the pass/fail status",
      "Only if something goes wrong"
    ],
    correctAnswer: 1,
    explanation: "Comprehensive documentation must include environmental data, reference standards, technician identification, timestamps, and all adjustments made for traceability and audit compliance."
  }
];

export const instrumentationModule6Section4Questions = [
  {
    id: 1,
    question: "What information MUST be recorded for device identification in calibration records?",
    options: [
      "Only the serial number",
      "Unique Device ID, manufacturer & model, location, range & units, and accuracy class",
      "Just the location",
      "Only if it fails calibration"
    ],
    correctAnswer: 1,
    explanation: "Complete device identification requires unique ID, manufacturer/model details, physical location, measurement range/units, and specified accuracy class for proper traceability."
  },
  {
    id: 2,
    question: "Which is NOT a required component of a professional calibration certificate?",
    options: [
      "Technician signature and date",
      "Measurement uncertainty statement",
      "Customer's bank details",
      "Traceability statement"
    ],
    correctAnswer: 2,
    explanation: "Customer bank details are not part of calibration certificates. Required components include signatures, uncertainty statements, traceability statements, and technical measurement data."
  },
  {
    id: 3,
    question: "What is the main advantage of electronic calibration management systems?",
    options: [
      "They cost less than paper systems",
      "Automated scheduling, searchable databases, error checking, and audit trails",
      "They eliminate the need for calibration",
      "They work without electricity"
    ],
    correctAnswer: 1,
    explanation: "Electronic systems provide automated scheduling, searchable records, automatic calculations, digital signatures, audit trails, and integration capabilities that paper systems cannot offer."
  },
  {
    id: 4,
    question: "What is the minimum record retention period for general industry calibration records?",
    options: [
      "1 year",
      "2 years",
      "3-5 years minimum, 7 years recommended",
      "Forever"
    ],
    correctAnswer: 2,
    explanation: "General industry requires minimum 3-5 years retention, with 7 years recommended. Some regulated industries like pharmaceutical and nuclear require much longer periods."
  },
  {
    id: 5,
    question: "Why is 21 CFR Part 11 compliance important for some electronic calibration systems?",
    options: [
      "It applies to all industries equally",
      "It's required for FDA-regulated industries to ensure electronic record integrity",
      "It's only for software companies",
      "It reduces calibration costs"
    ],
    correctAnswer: 1,
    explanation: "21 CFR Part 11 is the FDA regulation governing electronic records and signatures in pharmaceutical, medical device, and other FDA-regulated industries, ensuring data integrity and security."
  }
];

export const instrumentationModule6Section5Questions = [
  {
    id: 1,
    question: "What factors should be considered when determining calibration intervals?",
    options: [
      "Only time-based schedules",
      "Environmental conditions, usage frequency, instrument stability, regulatory requirements, and criticality of measurements",
      "Just manufacturer recommendations",
      "Cost considerations only"
    ],
    correctAnswer: 1,
    explanation: "Calibration intervals must consider multiple factors including environmental conditions, usage patterns, historical performance, regulatory requirements, and the criticality of measurements to process safety and quality."
  },
  {
    id: 2,
    question: "What does UKAS traceability ensure?",
    options: [
      "Lowest calibration costs",
      "An unbroken chain of measurements linking field instruments to national standards maintained by NPL",
      "Fastest calibration service",
      "Local calibration only"
    ],
    correctAnswer: 1,
    explanation: "UKAS traceability ensures an unbroken measurement chain from field instruments through working standards, secondary standards, to primary standards maintained by the National Physical Laboratory (NPL)."
  },
  {
    id: 3,
    question: "When should immediate recalibration be triggered?",
    options: [
      "Only at scheduled intervals",
      "After physical damage, unusual readings, failed checks, repairs, or exposure to extremes",
      "Never between scheduled intervals",
      "Only if requested by management"
    ],
    correctAnswer: 1,
    explanation: "Immediate recalibration is required after physical damage, unusual readings, failed performance checks, overrange events, repairs/modifications, or suspected contamination."
  },
  {
    id: 4,
    question: "What are the benefits of risk-based calibration scheduling?",
    options: [
      "It eliminates all calibration",
      "Optimised resource allocation, more frequent calibration for critical instruments, and cost-effective use of calibration resources",
      "It only applies to new equipment",
      "It reduces safety requirements"
    ],
    correctAnswer: 1,
    explanation: "Risk-based scheduling optimizes resources by applying more frequent calibration to critical instruments while allowing extended intervals for less critical equipment, based on historical performance and process impact."
  },
  {
    id: 5,
    question: "Why is a site-wide calibration program important?",
    options: [
      "It's required by law in all cases",
      "To ensure consistent measurement quality, regulatory compliance, optimised costs, and systematic management of all measuring equipment",
      "It eliminates individual instrument tracking",
      "It reduces the need for trained technicians"
    ],
    correctAnswer: 1,
    explanation: "A site-wide program ensures measurement consistency, maintains regulatory compliance, optimises calibration costs, reduces risks, and provides systematic management of all measuring equipment across the facility."
  }
];

export const instrumentationModule6Section6Questions = [
  {
    id: 1,
    question: "What is the difference between Type A and Type B uncertainty?",
    options: [
      "Type A is more important than Type B",
      "Type A is evaluated by statistical analysis of repeated measurements; Type B is evaluated by other means such as specifications or prior knowledge",
      "They are the same thing",
      "Type B is only used for electrical measurements"
    ],
    correctAnswer: 1,
    explanation: "Type A uncertainty is statistically evaluated from repeated measurements, while Type B is evaluated from other sources like manufacturer specifications, certificates, or scientific judgement."
  },
  {
    id: 2,
    question: "What are the benefits of in-situ calibration?",
    options: [
      "It's always cheaper",
      "No removal from service, calibration under actual operating conditions, includes installation effects, and reduced downtime costs",
      "It's faster than laboratory calibration",
      "It doesn't require calibration standards"
    ],
    correctAnswer: 1,
    explanation: "In-situ calibration eliminates removal from service, accounts for actual operating conditions and installation effects, and significantly reduces production downtime costs."
  },
  {
    id: 3,
    question: "How do you troubleshoot repeatability problems in calibration?",
    options: [
      "Replace the instrument immediately",
      "Allow proper stabilisation time, control environmental conditions, check for mechanical wear or electrical noise, and implement shielding if necessary",
      "Ignore the problem",
      "Use a different calibration standard"
    ],
    correctAnswer: 1,
    explanation: "Repeatability problems require systematic troubleshooting including adequate stabilisation time, environmental control, checking for wear/noise sources, and implementing appropriate shielding or isolation."
  },
  {
    id: 4,
    question: "What emerging technologies are affecting modern calibration practices?",
    options: [
      "Only traditional methods work",
      "AI for predictive calibration, IoT connectivity, blockchain certificates, automated calibration systems, and cloud-based management platforms",
      "Technology doesn't affect calibration",
      "Only mechanical improvements matter"
    ],
    correctAnswer: 1,
    explanation: "Modern calibration is being transformed by AI-driven predictive maintenance, IoT connectivity, blockchain-secured certificates, automation, and cloud-based management systems."
  },
  {
    id: 5,
    question: "What are key calibration best practices for professional implementation?",
    options: [
      "Speed is the only consideration",
      "Proper preparation and stabilisation, systematic approach following procedures, comprehensive documentation, trend monitoring, and continuous process improvement",
      "Minimal documentation is sufficient",
      "Only calibrate when equipment fails"
    ],
    correctAnswer: 1,
    explanation: "Professional calibration requires thorough preparation, systematic procedures, comprehensive documentation, historical trend monitoring, and continuous improvement of processes and methods."
  }
];