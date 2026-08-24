export const instrumentationModule6Section1Questions = [
  {
    id: 1,
    question: 'What is the formal definition of calibration?',
    options: [
      'The act of adjusting an instrument until its output reads with exactly zero error at every point of its range',
      'Comparison of measurement values delivered by a device under test with those of a calibration standard of known accuracy',
      'The routine replacement of measuring instruments at fixed intervals in order to maintain their accuracy',
      'The process of cleaning and servicing an instrument so as to restore it to its original factory condition',
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
      'Calibration corrects the instrument\'s output, whereas adjustment merely records the measured error without changing anything at all',
      'There is no practical difference between them, since both terms describe exactly the same process carried out on the instrument',
      'Calibration applies only to electrical instruments, whereas adjustment applies only to mechanical ones such as pressure gauges',
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
      'Record the ambient temperature and humidity of the work area in the calibration sheet',
      'Switch off and lock out electrical supplies, close isolation valves, and vent trapped pressure',
      'Confirm that the reference standard is still within its stated calibration due date',
      'Photograph the instrument nameplate and its tag number for the calibration record',
    ],
    correctAnswer: 1,
    explanation:
      'Device isolation is the first critical safety step. This includes electrical isolation, process isolation, pressure relief, tag out procedures, and verification of isolation.',
  },
  {
    id: 2,
    question: 'For pressure device calibration, what points should be tested at minimum?',
    options: [
      '0% and 100% of range only',
      'Three random points in range',
      '0%, 25%, 50%, 75%, and 100% of range',
      'The normal operating point only',
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
      'It doubles the test current and so improves the reading',
      'It isolates the instrument from mains supply interference',
      'It allows the resistance to be measured while energised',
    ],
    correctAnswer: 0,
    explanation:
      '4-wire (Kelvin) connection eliminates the effect of lead resistance in precision resistance measurements, providing the highest accuracy by separating current and voltage paths.',
  },
  {
    id: 5,
    question: 'What should be recorded during calibration besides the actual readings?',
    options: [
      'The final pass or fail result of the calibration and nothing further about how it was done',
      'Environmental conditions, reference standards used, technician ID, timestamps, and any adjustments made',
      'Nothing more than the date on which the next calibration of the instrument falls due',
      'The make and model of the device under test, with no other information recorded at all',
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
      'The manufacturer and model number of the device, with nothing else recorded',
      'Unique Device ID, manufacturer & model, location, range & units, and accuracy class',
      'The purchase price of the device and the date on which it was first acquired',
      'The name of the technician who last used the device out on the process plant',
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
      'The original purchase price of the instrument alone, with no other factor taken into account when scheduling',
      'Environmental conditions, usage frequency, instrument stability, regulatory requirements, and criticality of measurements',
      'The physical size and weight of the instrument, with no regard to how or where it is actually being used',
      'The brand reputation of the manufacturer, on the basis that well-known makes need checking far less often',
    ],
    correctAnswer: 1,
    explanation:
      'Calibration intervals must consider multiple factors including environmental conditions, usage patterns, historical performance, regulatory requirements, and the criticality of measurements to process safety and quality.',
  },
  {
    id: 2,
    question: 'What does UKAS traceability ensure?',
    options: [
      'That every instrument on the site is calibrated by the same accredited laboratory each year',
      'That calibration certificates are issued free of charge to the customer whenever requested',
      'An unbroken chain of measurements linking field instruments to national standards maintained by NPL',
      'That an instrument never needs recalibrating again once it has been UKAS certified',
    ],
    correctAnswer: 2,
    explanation:
      'UKAS traceability ensures an unbroken measurement chain from field instruments through working standards, secondary standards, to primary standards maintained by the National Physical Laboratory (NPL).',
  },
  {
    id: 3,
    question: 'When should immediate recalibration be triggered?',
    options: [
      'At the scheduled interval alone, whatever condition the instrument is found in',
      'Whenever the instrument is moved from one bench to another within the workshop',
      'When the customer specifically asks for it in writing, and at no other time at all',
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
      'Complete removal of calibration for all low-criticality instruments, with no records kept for them at any point',
      'A single fixed calibration interval applied to every instrument on the site, regardless of its duty or its importance',
      'A guarantee that no instrument will ever be found out of tolerance between its scheduled calibration dates',
    ],
    correctAnswer: 0,
    explanation:
      'Risk-based scheduling optimizes resources by applying more frequent calibration to critical instruments while allowing extended intervals for less critical equipment, based on historical performance and process impact.',
  },
  {
    id: 5,
    question: 'Why is a site-wide calibration program important?',
    options: [
      'To allow individual departments to set their own measurement standards and calibration intervals entirely independently',
      'To ensure consistent measurement quality, regulatory compliance, optimised costs, and systematic management of all measuring equipment',
      'To remove the requirement for any measurement on the site to be traceable back to national measurement standards',
      'To reduce the total number of instruments that require any form of calibration at all across the whole site',
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
      'Type A applies only to electrical measurements, while Type B applies only to mechanical measurements such as pressure and flow',
      'Type A is evaluated by statistical analysis of repeated measurements; Type B is evaluated by other means such as specifications or prior knowledge',
      'Type A is always larger than Type B and therefore dominates the combined standard uncertainty in every calibration carried out',
      'Type A is the uncertainty of the reference standard being used, while Type B is the uncertainty of the device that is under test on site',
    ],
    correctAnswer: 1,
    explanation:
      'Type A uncertainty is statistically evaluated from repeated measurements, while Type B is evaluated from other sources like manufacturer specifications, certificates, or scientific judgement.',
  },
  {
    id: 2,
    question: 'What are the benefits of in-situ calibration?',
    options: [
      'Consistently lower measurement uncertainty than any laboratory calibration could achieve on the same instrument type',
      'No requirement for the calibration to remain traceable to national standards, because the work is done on site',
      'No removal from service, calibration under actual operating conditions, includes installation effects, and reduced downtime costs',
      'No need for any reference standard at all, since the instrument is checked directly against the process itself',
    ],
    correctAnswer: 2,
    explanation:
      'In-situ calibration eliminates removal from service, accounts for actual operating conditions and installation effects, and significantly reduces production downtime costs.',
  },
  {
    id: 3,
    question: 'How do you troubleshoot repeatability problems in calibration?',
    options: [
      'Lengthen the calibration interval so that the scatter in the readings is observed far less often, then carry on using the instrument',
      'Accept the scatter in the results, report only the average of the readings taken, and record the instrument as being within its stated tolerance',
      'Replace the reference standard with a less accurate one so that the observed variation appears smaller against the wider tolerance',
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
      'A return to purely manual paper-based record keeping, with no software support of any kind on site or in the laboratory',
      'The removal of measurement uncertainty statements from every calibration certificate that is issued to customers by laboratories',
      'The abandonment of traceability to national measurement standards in favour of in-house references held by each department',
    ],
    correctAnswer: 0,
    explanation:
      'Modern calibration is being transformed by AI-driven predictive maintenance, IoT connectivity, blockchain-secured certificates, automation, and cloud-based management systems.',
  },
  {
    id: 5,
    question: 'What are key calibration best practices for professional implementation?',
    options: [
      'Calibrating from memory without any written procedure, recording only the results that look reasonable, and skipping any review of the recorded data',
      'Proper preparation and stabilisation, systematic approach following procedures, comprehensive documentation, trend monitoring, and continuous process improvement',
      'Recording only the readings that fall within tolerance, discarding all the rest, and reporting the instrument as fully compliant on the certificate',
      'Skipping the documentation entirely to save time on routine calibrations, then reconstructing the figures from memory at the end of the quarter',
    ],
    correctAnswer: 1,
    explanation:
      'Professional calibration requires thorough preparation, systematic procedures, comprehensive documentation, historical trend monitoring, and continuous improvement of processes and methods.',
  },
];
