export const instrumentationModule6Section1Questions = [
  {
    id: 1,
    question: 'What is the formal definition of calibration?',
    options: [
      'The act of adjusting an instrument so that its output reads exactly zero error at every point',
      'Comparison of measurement values delivered by a device under test with those of a calibration standard of known accuracy',
      'The routine replacement of measuring instruments at fixed intervals to maintain accuracy',
      'The process of cleaning and servicing an instrument to restore it to factory condition',
    ],
    correctAnswer: 1,
    explanation:
      'Calibration is specifically the comparison process between a device under test and a calibration standard, establishing the relationship and determining measurement uncertainty.',
  },
  {
    id: 2,
    question: 'Which of these is NOT a key component of calibration?',
    options: [
      'Device Under Test (DUT)',
      'Reference Standard',
      'Equipment Replacement',
      'Comparison Process',
    ],
    correctAnswer: 2,
    explanation:
      'Equipment replacement is not part of calibration. The key components are DUT, reference standard, comparison process, documentation, and uncertainty assessment.',
  },
  {
    id: 3,
    question: 'What is the difference between calibration and adjustment?',
    options: [
      "Calibration corrects the instrument's output, whereas adjustment only records the measured error without changing anything",
      "There is no difference; the two terms describe exactly the same process",
      "Calibration applies only to electrical instruments, whereas adjustment applies only to mechanical ones",
      "Calibration determines the relationship between measured and actual values; adjustment brings the instrument's response within acceptable limits",
    ],
    correctAnswer: 3,
    explanation:
      "Calibration determines measurement relationships and doesn't always require adjustment. Adjustment specifically corrects the instrument's response to meet specifications.",
  },
  {
    id: 4,
    question: 'Which consequence is NOT typically associated with inadequate calibration?',
    options: [
      'Increased equipment purchase costs',
      'Regulatory fines and penalties',
      'Safety incidents from incorrect readings',
      'Product quality issues and waste',
    ],
    correctAnswer: 0,
    explanation:
      'Increased equipment purchase costs are not a direct consequence of inadequate calibration. The main consequences are safety risks, financial losses, regulatory issues, and operational problems.',
  },
  {
    id: 5,
    question: 'In which type of maintenance strategy does calibration primarily fit?',
    options: [
      'Reactive maintenance only',
      'Preventive maintenance',
      'Emergency maintenance',
      'Cost-reduction maintenance',
    ],
    correctAnswer: 1,
    explanation:
      'Calibration is a critical component of preventive maintenance strategies, ensuring instruments maintain accuracy and reliability throughout their operational life.',
  },
];

export const instrumentationModule6Section2Questions = [
  {
    id: 1,
    question: 'What is the most important factor when selecting calibration equipment?',
    options: [
      "That it is the cheapest instrument available that can read the required range",
      "Accuracy that's at least 4 times better than the device being calibrated",
      "That it comes from the same manufacturer as the device under test",
      "That it has the largest measurement range, even if its accuracy is similar to the device under test",
    ],
    correctAnswer: 1,
    explanation:
      "The accuracy ratio of 4:1 (or better) ensures the calibration standard doesn't contribute significant uncertainty to the measurement. This is fundamental to proper calibration practice.",
  },
  {
    id: 2,
    question: 'What does UKAS stand for and what is its role?',
    options: [
      'UK Association of Standards - writes calibration procedures',
      'Universal Calibration Standards - sets global calibration requirements',
      'UK Accreditation Service - provides accreditation for calibration laboratories',
      'United Kingdom Accuracy Society - trains calibration technicians',
    ],
    correctAnswer: 2,
    explanation:
      'UKAS is the United Kingdom Accreditation Service, the national accreditation body that ensures calibration laboratories meet international standards and maintain traceability.',
  },
  {
    id: 3,
    question: 'Which environmental factor has the greatest impact on electrical calibrations?',
    options: [
      'Ambient lighting levels in the laboratory',
      'The colour of the instrument enclosure',
      'Atmospheric pressure alone',
      'Both temperature and humidity',
    ],
    correctAnswer: 3,
    explanation:
      'Both temperature and humidity significantly affect electrical measurements. Temperature affects component values and EMF generation, while humidity affects insulation and can cause condensation.',
  },
  {
    id: 4,
    question: 'What is the minimum recommended accuracy ratio for calibration standards?',
    options: [
      '4:1 (standard 4x more accurate)',
      '3:1 (standard 3x more accurate)',
      '2:1 (standard 2x more accurate)',
      '10:1 (standard 10x more accurate)',
    ],
    correctAnswer: 0,
    explanation:
      "The 4:1 accuracy ratio is the minimum recommended standard to ensure the calibration equipment doesn't contribute significant uncertainty to the measurement process.",
  },
  {
    id: 5,
    question: 'Why is traceability to national standards important?',
    options: [
      'It removes the need to state measurement uncertainty on certificates',
      'It ensures measurements are consistent globally and provides legal defensibility',
      'It allows calibration intervals to be extended indefinitely',
      'It guarantees the instrument will never drift out of tolerance',
    ],
    correctAnswer: 1,
    explanation:
      'Traceability to national standards ensures global measurement consistency, provides legal defensibility, and maintains confidence in measurement accuracy across different organizations and countries.',
  },
];

export const instrumentationModule6Section3Questions = [
  {
    id: 1,
    question: 'What is the first critical safety step before any calibration work?',
    options: [
      'Record the ambient temperature and humidity of the work area',
      'Switch off and lock out electrical supplies, close isolation valves, and vent trapped pressure',
      'Confirm the reference standard is within its calibration due date',
      'Photograph the instrument nameplate for the calibration record',
    ],
    correctAnswer: 1,
    explanation:
      'Device isolation is the first critical safety step. This includes electrical isolation, process isolation, pressure relief, tag out procedures, and verification of isolation.',
  },
  {
    id: 2,
    question: 'For pressure device calibration, what points should be tested at minimum?',
    options: [
      'Only the zero and full-scale points of the range',
      'Three random points anywhere within the range',
      '0%, 25%, 50%, 75%, and 100% of range',
      'Only the normal operating point of the process',
    ],
    correctAnswer: 2,
    explanation:
      'Multi-point verification should test at 0%, 25%, 50%, 75%, and 100% of range, performing both ascending and descending readings to calculate hysteresis and linearity errors.',
  },
  {
    id: 3,
    question: 'What is the stability criterion for temperature calibration?',
    options: [
      '±1°C change over 5 minutes',
      '±0.1°C change over 5 minutes',
      'Any stable reading',
      '±0.01°C change over 2 minutes',
    ],
    correctAnswer: 3,
    explanation:
      'The stability criterion for temperature calibration is less than 0.01°C change over 2 minutes, ensuring thermal equilibrium has been reached before taking readings.',
  },
  {
    id: 4,
    question:
      'For electrical calibration, why is 4-wire connection recommended for resistance measurements?',
    options: [
      'It accounts for lead resistance and provides best accuracy',
      "It's required by regulation",
      'It looks more professional',
      "It's faster to connect",
    ],
    correctAnswer: 0,
    explanation:
      '4-wire (Kelvin) connection eliminates the effect of lead resistance in precision resistance measurements, providing the highest accuracy by separating current and voltage paths.',
  },
  {
    id: 5,
    question: 'What should be recorded during calibration besides the actual readings?',
    options: [
      'Only the final pass or fail result of the calibration',
      'Environmental conditions, reference standards used, technician ID, timestamps, and any adjustments made',
      'Only the date the next calibration is due',
      'Only the make and model of the device under test',
    ],
    correctAnswer: 1,
    explanation:
      'Comprehensive documentation must include environmental data, reference standards, technician identification, timestamps, and all adjustments made for traceability and audit compliance.',
  },
];

export const instrumentationModule6Section4Questions = [
  {
    id: 1,
    question: 'What information MUST be recorded for device identification in calibration records?',
    options: [
      'Only the manufacturer and model number of the device',
      'Unique Device ID, manufacturer & model, location, range & units, and accuracy class',
      'Only the purchase price and date the device was acquired',
      'Only the name of the technician who last used the device',
    ],
    correctAnswer: 1,
    explanation:
      'Complete device identification requires unique ID, manufacturer/model details, physical location, measurement range/units, and specified accuracy class for proper traceability.',
  },
  {
    id: 2,
    question: 'Which is NOT a required component of a professional calibration certificate?',
    options: [
      'Technician signature and date',
      'Measurement uncertainty statement',
      "Customer's bank details",
      'Traceability statement',
    ],
    correctAnswer: 2,
    explanation:
      'Customer bank details are not part of calibration certificates. Required components include signatures, uncertainty statements, traceability statements, and technical measurement data.',
  },
  {
    id: 3,
    question: 'What is the main advantage of electronic calibration management systems?',
    options: [
      'They remove the need for any reference standards to be traceable',
      'They allow calibrations to be performed without a competent technician',
      'They eliminate the requirement to state measurement uncertainty',
      'Automated scheduling, searchable databases, error checking, and audit trails',
    ],
    correctAnswer: 3,
    explanation:
      'Electronic systems provide automated scheduling, searchable records, automatic calculations, digital signatures, audit trails, and integration capabilities that paper systems cannot offer.',
  },
  {
    id: 4,
    question:
      'What is the minimum record retention period for general industry calibration records?',
    options: [
      '3-5 years minimum, 7 years recommended',
      '30 days minimum, 90 days recommended',
      '6 months minimum, 1 year recommended',
      'Indefinitely; records may never be destroyed',
    ],
    correctAnswer: 0,
    explanation:
      'General industry requires minimum 3-5 years retention, with 7 years recommended. Some regulated industries like pharmaceutical and nuclear require much longer periods.',
  },
  {
    id: 5,
    question: 'Why is 21 CFR Part 11 compliance important for some electronic calibration systems?',
    options: [
      "It defines the minimum accuracy ratio required between standard and device",
      "It's required for FDA-regulated industries to ensure electronic record integrity",
      "It is the standard governing UKAS accreditation of calibration laboratories",
      "It sets the maximum allowable calibration interval for measuring equipment",
    ],
    correctAnswer: 1,
    explanation:
      '21 CFR Part 11 is the FDA regulation governing electronic records and signatures in pharmaceutical, medical device, and other FDA-regulated industries, ensuring data integrity and security.',
  },
];

export const instrumentationModule6Section5Questions = [
  {
    id: 1,
    question: 'What factors should be considered when determining calibration intervals?',
    options: [
      'Only the original purchase price of the instrument',
      'Environmental conditions, usage frequency, instrument stability, regulatory requirements, and criticality of measurements',
      'Only the physical size and weight of the instrument',
      'Only the brand reputation of the instrument manufacturer',
    ],
    correctAnswer: 1,
    explanation:
      'Calibration intervals must consider multiple factors including environmental conditions, usage patterns, historical performance, regulatory requirements, and the criticality of measurements to process safety and quality.',
  },
  {
    id: 2,
    question: 'What does UKAS traceability ensure?',
    options: [
      'That every instrument is calibrated by the same laboratory each year',
      'That calibration certificates are issued free of charge to the customer',
      'An unbroken chain of measurements linking field instruments to national standards maintained by NPL',
      'That instruments never need recalibration once UKAS certified',
    ],
    correctAnswer: 2,
    explanation:
      'UKAS traceability ensures an unbroken measurement chain from field instruments through working standards, secondary standards, to primary standards maintained by the National Physical Laboratory (NPL).',
  },
  {
    id: 3,
    question: 'When should immediate recalibration be triggered?',
    options: [
      'Only at the scheduled interval, regardless of the instrument condition',
      'Whenever the instrument is moved to a different bench',
      'Only when the customer specifically requests it in writing',
      'After physical damage, unusual readings, failed checks, repairs, or exposure to extremes',
    ],
    correctAnswer: 3,
    explanation:
      'Immediate recalibration is required after physical damage, unusual readings, failed performance checks, overrange events, repairs/modifications, or suspected contamination.',
  },
  {
    id: 4,
    question: 'What are the benefits of risk-based calibration scheduling?',
    options: [
      'Optimised resource allocation, more frequent calibration for critical instruments, and cost-effective use of calibration resources',
      'It removes the need to calibrate any low-criticality instruments at all',
      'It allows every instrument to share a single fixed calibration interval',
      'It guarantees no instrument will ever be found out of tolerance',
    ],
    correctAnswer: 0,
    explanation:
      'Risk-based scheduling optimizes resources by applying more frequent calibration to critical instruments while allowing extended intervals for less critical equipment, based on historical performance and process impact.',
  },
  {
    id: 5,
    question: 'Why is a site-wide calibration program important?',
    options: [
      'It allows individual departments to set their own measurement standards',
      'To ensure consistent measurement quality, regulatory compliance, optimised costs, and systematic management of all measuring equipment',
      'It removes the need for traceability to national standards',
      'It reduces the number of instruments that require any calibration',
    ],
    correctAnswer: 1,
    explanation:
      'A site-wide program ensures measurement consistency, maintains regulatory compliance, optimises calibration costs, reduces risks, and provides systematic management of all measuring equipment across the facility.',
  },
];

export const instrumentationModule6Section6Questions = [
  {
    id: 1,
    question: 'What is the difference between Type A and Type B uncertainty?',
    options: [
      'Type A applies to electrical measurements; Type B applies to mechanical measurements',
      'Type A is evaluated by statistical analysis of repeated measurements; Type B is evaluated by other means such as specifications or prior knowledge',
      'Type A is always larger than Type B and dominates the combined uncertainty',
      'Type A is the uncertainty of the standard; Type B is the uncertainty of the device under test',
    ],
    correctAnswer: 1,
    explanation:
      'Type A uncertainty is statistically evaluated from repeated measurements, while Type B is evaluated from other sources like manufacturer specifications, certificates, or scientific judgement.',
  },
  {
    id: 2,
    question: 'What are the benefits of in-situ calibration?',
    options: [
      'It always achieves lower measurement uncertainty than laboratory calibration',
      'It removes the need for the calibration to be traceable to national standards',
      'No removal from service, calibration under actual operating conditions, includes installation effects, and reduced downtime costs',
      'It allows the instrument to be calibrated without any reference standard',
    ],
    correctAnswer: 2,
    explanation:
      'In-situ calibration eliminates removal from service, accounts for actual operating conditions and installation effects, and significantly reduces production downtime costs.',
  },
  {
    id: 3,
    question: 'How do you troubleshoot repeatability problems in calibration?',
    options: [
      'Increase the calibration interval so the problem is observed less often',
      'Accept the scatter and report only the average of the readings',
      'Replace the reference standard with a less accurate one to reduce variation',
      'Allow proper stabilisation time, control environmental conditions, check for mechanical wear or electrical noise, and implement shielding if necessary',
    ],
    correctAnswer: 3,
    explanation:
      'Repeatability problems require systematic troubleshooting including adequate stabilisation time, environmental control, checking for wear/noise sources, and implementing appropriate shielding or isolation.',
  },
  {
    id: 4,
    question: 'What emerging technologies are affecting modern calibration practices?',
    options: [
      'AI for predictive calibration, IoT connectivity, blockchain certificates, automated calibration systems, and cloud-based management platforms',
      'A return to purely manual paper-based record keeping with no software',
      'The removal of measurement uncertainty from calibration certificates',
      'The abandonment of traceability to national measurement standards',
    ],
    correctAnswer: 0,
    explanation:
      'Modern calibration is being transformed by AI-driven predictive maintenance, IoT connectivity, blockchain-secured certificates, automation, and cloud-based management systems.',
  },
  {
    id: 5,
    question: 'What are key calibration best practices for professional implementation?',
    options: [
      'Calibrating from memory without referring to a written procedure',
      'Proper preparation and stabilisation, systematic approach following procedures, comprehensive documentation, trend monitoring, and continuous process improvement',
      'Recording only the readings that fall within tolerance',
      'Skipping documentation to save time on routine calibrations',
    ],
    correctAnswer: 1,
    explanation:
      'Professional calibration requires thorough preparation, systematic procedures, comprehensive documentation, historical trend monitoring, and continuous improvement of processes and methods.',
  },
];
