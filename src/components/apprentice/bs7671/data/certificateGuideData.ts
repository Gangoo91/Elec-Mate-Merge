export interface CertificateType {
  id: string;
  title: string;
  abbreviation: string;
  color: string;
  icon: string;
  whenRequired: string;
  keyRequirements: string[];
  sectionsToComplete: string[];
  commonMistakes: string[];
  templateSources: string[];
  regulationReference: string;
}

export const certificateTypes: CertificateType[] = [
  {
    id: 'eic',
    title: 'Electrical Installation Certificate',
    abbreviation: 'EIC',
    color: 'cyan',
    icon: 'FileCheck',
    whenRequired:
      'Required for all new electrical installations and for new circuits added to existing installations. Must be issued before the installation is put into service.',
    keyRequirements: [
      'Three signatures required: designer, installer, and inspector/tester (can be the same person if qualified for all three roles)',
      'Must include a Schedule of Inspections and a Schedule of Test Results',
      'Designer must confirm the installation has been designed in accordance with BS 7671:2018+A3:2024',
      'Installer must confirm construction complies with the design',
      'Inspector must confirm the installation has been inspected and tested per Chapter 64',
      'Part P notification required for notifiable work in domestic premises (Building Regulations)',
    ],
    sectionsToComplete: [
      'Details of the installation — address, client, extent of works',
      'Design — designer name, signature, design standard used',
      'Construction — installer name, signature, construction date',
      'Inspection & Testing — inspector name, signature, instrument serial numbers, test date',
      'Next inspection — recommend a date for the first periodic inspection',
      'Observations — any departures from BS 7671 or limitations',
      'Schedule of Inspections — completed inspection checklist',
      'Schedule of Test Results — circuit-by-circuit test readings',
    ],
    commonMistakes: [
      'Missing one or more of the three required signatures',
      'Not completing the Schedule of Test Results for every circuit',
      'Forgetting to include instrument serial numbers and calibration dates',
      'Not recommending a date for the next periodic inspection',
      'Issuing an EIC when an MEIWC would be more appropriate (minor works)',
    ],
    templateSources: [
      'IET (theiet.org) — Official model forms in Appendix 6 of BS 7671',
      'NICEIC — Available to registered contractors',
      'NAPIT — Available to registered members',
      'ECA — Available to ECA members',
      'Certsure/ELECSA — Digital certificate platforms',
    ],
    regulationReference: 'BS 7671:2018+A3:2024 Part 6, Regulation 631.1 and Appendix 6',
  },
  {
    id: 'eicr',
    title: 'Electrical Installation Condition Report',
    abbreviation: 'EICR',
    color: 'blue',
    icon: 'ClipboardCheck',
    whenRequired:
      'Required for periodic inspection of existing electrical installations. Mandatory for rented properties (every 5 years) under The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020.',
    keyRequirements: [
      'Must be carried out by a competent person (typically registered with a competent person scheme)',
      'Inspector must determine whether the installation is in a satisfactory or unsatisfactory condition',
      'All observations coded using C1, C2, C3, or FI codes',
      'Any C1 (danger present) must be made safe before the inspector leaves site',
      'Overall assessment: Satisfactory only if no C1 or C2 codes are present',
      'Recommended intervals must be stated for the next inspection',
    ],
    sectionsToComplete: [
      'Details of the client and installation',
      'Purpose of the report and extent of the installation covered',
      'Summary of the condition — satisfactory or unsatisfactory',
      'Observations and recommendations with classification codes',
      'Details of the inspector and their qualifications',
      'Schedule of Inspections (Section A)',
      'Schedule of Test Results (Section B)',
      'Recommendation for next inspection interval',
    ],
    commonMistakes: [
      'Not coding observations correctly (using C1 when C2 is more appropriate, or vice versa)',
      'Marking the overall condition as satisfactory when C2 codes are present',
      'Insufficient sampling of circuits during testing',
      'Not clearly defining the extent and limitations of the inspection',
      'Failing to make C1 issues safe before leaving site',
    ],
    templateSources: [
      'IET (theiet.org) — Official model forms in Appendix 6 of BS 7671',
      'NICEIC — Certsure online platform',
      'NAPIT — Member portal',
      'ECA — Member resources',
    ],
    regulationReference: 'BS 7671:2018+A3:2024 Part 6, Regulation 631.2 and Chapter 65',
  },
  {
    id: 'meiwc',
    title: 'Minor Electrical Installation Works Certificate',
    abbreviation: 'MEIWC',
    color: 'green',
    icon: 'FileEdit',
    whenRequired:
      'For minor electrical work that does not include a new circuit. Examples: adding a socket to an existing circuit, replacing a consumer unit (some schemes require a full EIC for this), adding a fused spur.',
    keyRequirements: [
      'Only ONE signature required (the person who designed, installed, inspected, and tested the work)',
      'The work must NOT include a new circuit — if it does, a full EIC is required',
      'Must confirm the existing installation was suitable for the addition',
      'Must include test results for the circuit(s) worked on',
      'Part P notification still required if the work is notifiable (e.g., new circuit in bathroom, kitchen)',
    ],
    sectionsToComplete: [
      'Description of the minor works carried out',
      'Details of the installation and circuit(s) affected',
      'Test results: continuity, insulation resistance, earth fault loop impedance, RCD (if applicable)',
      'Declaration and signature confirming compliance with BS 7671',
      'Date of completion',
    ],
    commonMistakes: [
      'Using a MEIWC when a full EIC is required (e.g., new circuit installed)',
      'Not testing the circuit after the work is completed',
      'Incomplete test results — all relevant tests must be recorded',
      'Not confirming the existing installation is adequate for the addition',
    ],
    templateSources: [
      'IET (theiet.org) — Official model form in Appendix 6',
      'NICEIC — Available to registered contractors',
      'NAPIT — Available to registered members',
    ],
    regulationReference: 'BS 7671:2018+A3:2024 Part 6, Regulation 631.3 and Appendix 6',
  },
  {
    id: 'schedule-inspections',
    title: 'Schedule of Inspections',
    abbreviation: 'SOI',
    color: 'amber',
    icon: 'ListChecks',
    whenRequired:
      'Accompanies every EIC and EICR. It is a systematic checklist confirming that the installation has been visually inspected against the requirements of BS 7671.',
    keyRequirements: [
      'Each item marked as: C (conforms), NC (non-conforming), LIM (limitation), or N/A (not applicable)',
      'Must be completed before any testing is carried out',
      'Covers sections including: connections, identification, cables, protective devices, earthing, bonding, and special installations',
      'Any NC items should correspond to coded observations on the certificate',
    ],
    sectionsToComplete: [
      'Section 1 — External condition of the installation',
      'Section 2 — Presence and condition of protective devices',
      'Section 3 — Routing of cables and containment',
      'Section 4 — Connection of conductors and accessories',
      'Section 5 — Identification and notices',
      'Section 6 — Earthing and bonding arrangements',
      'Section 7 — Special installations (bathrooms, swimming pools, etc.)',
    ],
    commonMistakes: [
      'Leaving items blank instead of marking as N/A or LIM',
      'Not carrying out the visual inspection before testing',
      'Inconsistency between inspection findings and observation codes on the certificate',
    ],
    templateSources: [
      'IET (theiet.org) — Part of the model forms in Appendix 6',
      'Included with most digital certification platforms',
    ],
    regulationReference: 'BS 7671:2018+A3:2024 Appendix 6 (Model Form 1 — Schedule of Inspections)',
  },
  {
    id: 'schedule-test-results',
    title: 'Schedule of Test Results',
    abbreviation: 'STR',
    color: 'purple',
    icon: 'TestTube2',
    whenRequired:
      'Accompanies every EIC and EICR. Records the circuit-by-circuit test readings for the entire installation (or the circuits covered by the inspection).',
    keyRequirements: [
      'Every circuit must have a row with the relevant test results recorded',
      'Test instrument serial numbers and calibration dates must be noted',
      'Readings must be compared with the permitted maximum/minimum values',
      'Entries include: circuit details, protective device info, R1+R2, insulation resistance, Zs, PFC, RCD trip time',
      'All readings in correct units — ohms (\u03A9), megohms (M\u03A9), milliamps (mA), milliseconds (ms), kiloamps (kA)',
    ],
    sectionsToComplete: [
      'Circuit designation (reference and description)',
      'Protective device details (type, rating, breaking capacity)',
      'Cable details (reference method, size, length)',
      'R1+R2 continuity readings',
      'Insulation resistance (L-N, L-E, N-E)',
      'Earth fault loop impedance (Zs)',
      'Prospective fault current (PSCC and PEFC)',
      'RCD operating time and current',
    ],
    commonMistakes: [
      'Not recording instrument serial numbers and calibration dates',
      'Missing readings for some circuits or test types',
      'Recording values without the correct units',
      'Not comparing measured Zs against maximum permitted values',
      'Forgetting to record both PSCC and PEFC at the origin',
    ],
    templateSources: [
      'IET (theiet.org) — Part of the model forms in Appendix 6',
      'Included with most digital certification platforms',
    ],
    regulationReference: 'BS 7671:2018+A3:2024 Appendix 6 (Model Form 2 — Schedule of Test Results)',
  },
];

export interface ObservationCode {
  code: string;
  label: string;
  color: string;
  description: string;
  action: string;
}

export const eicrObservationCodes: ObservationCode[] = [
  {
    code: 'C1',
    label: 'Danger Present',
    color: 'red',
    description:
      'Risk of injury exists. The person carrying out the inspection should make the installation safe before leaving.',
    action: 'Immediate remedial action required. Inspector must make safe on site.',
  },
  {
    code: 'C2',
    label: 'Potentially Dangerous',
    color: 'orange',
    description:
      'The issue does not yet pose an immediate risk, but could become dangerous if left unattended.',
    action: 'Urgent remedial action required. Results in an unsatisfactory overall assessment.',
  },
  {
    code: 'C3',
    label: 'Improvement Recommended',
    color: 'yellow',
    description:
      'The installation does not fully comply with current regulations, but is not dangerous. Often relates to older installations built to previous editions.',
    action:
      'Improvement recommended but not mandatory. Does NOT make the overall assessment unsatisfactory.',
  },
  {
    code: 'FI',
    label: 'Further Investigation',
    color: 'blue',
    description:
      'The inspector could not fully assess the item. Further investigation is needed to determine the true condition.',
    action:
      'Further investigation required. Does not determine satisfactory/unsatisfactory until resolved.',
  },
];

export const legalRequirements: { title: string; points: string[] }[] = [
  {
    title: 'Part P of the Building Regulations (England & Wales)',
    points: [
      'Notifiable work in domestic premises must be notified to building control or carried out by a registered competent person',
      'Notifiable work includes: new circuits, consumer unit changes, work in bathrooms/kitchens (new circuits), outdoor installations, and special locations',
      'Non-notifiable work includes: like-for-like replacements, adding accessories to existing circuits (not in special locations)',
      'Failure to notify is a criminal offence and can affect property sales',
    ],
  },
  {
    title: 'Record Keeping',
    points: [
      'The installer must provide the client with the appropriate electrical certificate on completion',
      'Certificates must be retained and made available for future inspections',
      'Landlords in England must provide a copy of the EICR to tenants within 28 days of the inspection',
      'Local authorities can request copies of EICRs for rented properties',
    ],
  },
  {
    title: 'Amendment 3 (BS 7671:2018+A3:2024)',
    points: [
      'Issued 31 July 2024 as a free PDF supplement to the 18th Edition',
      'Introduces Regulation 530.3.201 for bidirectional and unidirectional protective devices',
      'Relevant where battery storage or solar PV is installed with an additional source of power',
      'Two new definitions added: bidirectional protective device and unidirectional protective device',
      'A3:2024 is a free PDF bolt-on — you need the brown book (A2:2022) plus the A3 PDF to be fully up to date',
    ],
  },
];
