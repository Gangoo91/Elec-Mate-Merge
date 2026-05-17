import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Grounded in BS 7671:2018+A4:2026 (18th Edition), IET Guidance Note 3
// (Inspection & Testing, 9th Edition) and the IET On-Site Guide.
// Every regulation cite resolves to a canonical reference.

const published = '2026-05-17';
const modified = '2026-05-17';

export const section710MedicalLocationsConfig: GeneratedGuideConfig = {
  pagePath: '/guides/bs-7671-section-710-medical-locations',
  title:
    'BS 7671 Section 710 Medical Locations — Electrical Requirements (A4:2026) | Elec-Mate',
  description:
    'BS 7671 Section 710 explained: medical location groups 0/1/2, medical IT systems, AFDD prohibitions, RCD requirements, SELV/PELV voltage limits for hospitals, dental surgeries and clinics. A4:2026 aligned.',
  datePublished: published,
  dateModified: modified,
  readingTime: 14,
  badge: 'BS 7671 Section 710',
  badgeIcon: 'ShieldCheck',
  breadcrumbLabel: 'Section 710 Medical Locations',
  heroPrefix: 'BS 7671',
  heroHighlight: 'Section 710',
  heroSuffix: 'Medical Locations',
  heroSubtitle:
    'Electrical installation requirements for hospitals, dental surgeries, clinics and other medical premises. Covers group 0/1/2 classification, medical IT systems, AFDD and RCD rules, and the SELV/PELV voltage modifications required by BS 7671:2018+A4:2026.',
  keyTakeaways: [
    'Section 710 classifies medical locations into groups 0, 1 and 2 — different protection requirements apply to each.',
    'Medical IT systems are mandatory for group 2 locations supplying life-support equipment, and must include insulation monitoring.',
    'AFDDs (arc fault detection devices) are prohibited in circuits of medical locations of group 0 and group 2, and in any circuit supplied by a medical IT system (Regulation 710.421.1.7 and 710.421.1.7.101).',
    'RCDs are required for additional protection on every final circuit of a group 2 medical location, but must not be installed on final circuits supplied by a medical IT system.',
    'SELV/PELV voltage limits in medical locations of group 1 and group 2 are reduced to 25 V AC RMS or 60 V ripple-free DC (Regulation 710.414.1.101) — modifying the values in Regulations 419.2 and 419.3.',
    'Measured total leakage current for a medical IT transformer plus all connected final circuits (without load) must be 10 mA or less to meet Regulation 710.555.201.',
  ],
  sections: [
    {
      id: 'medical-location-groups',
      heading: 'Medical Location Groups 0, 1 and 2',
      tocLabel: 'Medical location groups',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Section 710 of BS 7671:2018+A4:2026 covers electrical installations in medical locations — hospitals, dental surgeries, GP clinics, veterinary practices, ambulance stations and similar premises where patients receive examination or treatment using electrical equipment. The section sits within Part 7 (Special Installations or Locations) and applies in addition to the general requirements of Chapters 41-54.',
        },
        {
          type: 'paragraph',
          text:
            'Medical locations are classified into three groups based on the type of medical procedure performed and the consequences of an electrical supply interruption:',
        },
        {
          type: 'list',
          tone: 'info',
          items: [
            'Group 0 — medical locations in which no applied parts are intended to be used. Examples: massage rooms, consulting rooms with no patient contact equipment.',
            'Group 1 — medical locations in which applied parts are intended to be used externally or internally, except in group 2 procedures. Examples: dialysis rooms, dental surgeries, MRI rooms.',
            'Group 2 — medical locations in which applied parts are intended to be used in procedures such as intracardiac procedures, vital treatments and surgical operations where interruption of supply can cause danger to life. Examples: operating theatres, intensive care units, cardiac catheter labs.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Group classification matters for every protective decision',
          text:
            'Annex A710 of BS 7671 provides informative guidance on allocating group numbers, but it is a guide only — Regulation 710.3 sets the actual classification rules. The risk classification must be made by the medical staff using the location, in consultation with the designer.',
        },
      ],
    },
    {
      id: 'medical-it-systems',
      heading: 'Medical IT Systems',
      tocLabel: 'Medical IT systems',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Medical IT systems are isolating power supplies used in group 2 medical locations to supply life-support and similar critical equipment. The IT (isolé-terre) earthing arrangement keeps both live conductors isolated from earth, so a single insulation fault does not interrupt supply — critical for procedures where unexpected disconnection could endanger life.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Hard prohibition: no RCDs on medical IT final circuits',
          text:
            'Additional protection by RCD shall not be used on final circuits supplied by a medical IT system. If an inspector finds an RCD on such a final circuit during EICR, the circuit is non-compliant and remedial action is required.',
        },
        {
          type: 'list',
          items: [
            'Medical IT systems must include insulation monitoring (MED-IMD) — a dedicated device that continuously monitors the insulation resistance of the IT system and alarms on degradation.',
            'Live conductors of medical IT final circuits must be identified by alphanumeric markings L1 and L2 in addition to the standard brown insulation colour.',
            'For verification, total leakage current of the medical IT transformer plus all connected final circuits (with no load) must measure 10 mA or less (Regulation 710.555.201).',
            'Automatic transfer switching to a safety source must operate within times specified in Regulation 710.536.101 so that 90% of luminaires in group 2 rooms remain supplied by a safety source during normal supply failure.',
          ],
        },
      ],
    },
    {
      id: 'afdd-prohibition',
      heading: 'AFDD Prohibitions (A4:2026)',
      tocLabel: 'AFDD prohibition',
      blocks: [
        {
          type: 'paragraph',
          text:
            'BS 7671 Amendment 4 introduced wider AFDD (arc fault detection device) requirements across many installation types, but medical locations have specific prohibitions that override the general rules:',
        },
        {
          type: 'list',
          tone: 'warning',
          items: [
            'Regulation 710.421.1.7 — AFDDs shall not be used in circuits in medical locations of group 0 and group 2.',
            'Regulation 710.421.1.7.101 — AFDDs shall not be used in circuits supplied by IT systems specified as medical IT systems in Regulation 710.411.6.',
            'The prohibition does not list group 1 medical locations explicitly — AFDDs are not blanket-prohibited there, but designers must consult related regulations before installing them.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'AFDD already installed? Remove and document',
          text:
            'If during inspection an AFDD is found on a medical IT system circuit, the responsible person or installer must remove or disable it to comply with Regulation 710.421.1.7.101. The change must be recorded on the circuit documentation and the client informed.',
        },
      ],
    },
    {
      id: 'rcd-requirements',
      heading: 'RCD Protection for Group 2 Final Circuits',
      tocLabel: 'RCD requirements',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Additional protection by RCDs is mandatory for all final circuits in group 2 medical locations — except for those supplied by a medical IT system (where RCDs are prohibited).',
        },
        {
          type: 'list',
          items: [
            'RCDs used for additional protection must have the characteristics specified in Regulation 415.1.1 (30 mA rated residual operating current, disconnection within the times in Table 41.1).',
            'Type AC RCDs are prohibited in medical locations of group 1 and group 2 — Type A or Type F (or higher) must be selected to handle DC fault current components from medical equipment.',
            'Where RCDs are required on a final circuit, the protective measure of automatic disconnection of supply (ADS) must satisfy Section 411 in addition to the RCD requirement.',
          ],
        },
      ],
    },
    {
      id: 'selv-pelv-voltage-limits',
      heading: 'SELV and PELV Voltage Limits in Medical Locations',
      tocLabel: 'SELV/PELV voltage',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Where SELV or PELV circuits are used in medical locations of group 1 and group 2, BS 7671 modifies the standard extra-low voltage limits. Regulation 710.414.1.101 reduces the nominal voltage that may be applied to current-using equipment to:',
        },
        {
          type: 'callout',
          tone: 'pricing',
          title: 'Reduced ELV limits in medical locations',
          text:
            'Maximum 25 V AC RMS, or maximum 60 V ripple-free DC. These limits modify Regulations 419.2 and 419.3 and apply specifically to current-using equipment supplied from SELV/PELV circuits inside group 1 and group 2 medical locations.',
        },
        {
          type: 'paragraph',
          text:
            'Functional extra-low voltage (FELV) shall not be used as a method of protection against electric shock in medical locations, irrespective of the voltage value (Regulation 710.411.7). This is an absolute prohibition specific to medical locations.',
        },
      ],
    },
    {
      id: 'inspection-and-testing',
      heading: 'Inspection, Testing and Verification',
      tocLabel: 'Inspection and testing',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Medical locations require additional inspection and test items beyond a standard EICR. Verification covers:',
        },
        {
          type: 'list',
          tone: 'success',
          items: [
            'Medical IT transformer total leakage current measurement (≤ 10 mA per Regulation 710.555.201) with no load and all final circuits connected.',
            'Insulation monitoring device (MED-IMD) functionality test and alarm chain verification.',
            'Automatic transfer switching to safety source — operation timing verified against Regulation 710.536.101.',
            'Confirmation that no RCDs are installed on medical IT final circuits.',
            'Confirmation that no AFDDs are installed on group 0/group 2 circuits or on medical IT circuits.',
            'L1/L2 alphanumeric markings present on medical IT final circuit live conductors.',
            'Type AC RCD audit — no Type AC RCDs in group 1 or group 2 locations.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Periodic inspection interval — medical locations',
          text:
            'IET Guidance Note 3 recommends a maximum periodic inspection interval of 1 year for hospitals, and 3 years for surgeries and clinics. Group 2 locations supporting life-support equipment may require shorter intervals based on a risk assessment.',
        },
      ],
    },
  ],
  howToSteps: [
    {
      name: 'Classify the medical location group',
      text:
        'Before any design decision, agree the group number (0, 1, or 2) with the medical staff using the location. Document the classification — every subsequent protection decision depends on it. Refer to Regulation 710.3 and Annex A710.',
    },
    {
      name: 'Identify circuits supplied by a medical IT system',
      text:
        'Trace every final circuit in a group 2 location to determine whether it is supplied from a medical IT system or from a TN/TT system. Medical IT circuits have specific prohibitions (no RCDs, no AFDDs, L1/L2 marking required) that override general rules.',
    },
    {
      name: 'Select RCDs and AFDDs by group and earthing arrangement',
      text:
        'For group 2 final circuits NOT supplied by a medical IT system, install 30 mA RCDs (Type A minimum, not Type AC). For medical IT final circuits, do not install RCDs or AFDDs. Document the rationale on the circuit schedule.',
    },
    {
      name: 'Apply reduced SELV/PELV voltage limits',
      text:
        'In group 1 or group 2 locations, any SELV/PELV current-using equipment must be limited to 25 V AC RMS or 60 V ripple-free DC. Confirm equipment ratings against this limit before specifying.',
    },
    {
      name: 'Verify medical IT leakage at handover',
      text:
        'Measure total leakage of the medical IT transformer plus all final circuits with no load. If above 10 mA, the installation does not meet Regulation 710.555.201 — locate the offending circuit and remediate before sign-off.',
    },
  ],
  howToHeading: 'How to apply Section 710 on a real medical project',
  howToDescription:
    'Practical sequence for an electrician or designer working on a hospital, dental surgery, clinic, or veterinary practice installation.',
  faqs: [
    {
      question: 'What is the difference between a group 1 and a group 2 medical location?',
      answer:
        'Group 1 covers medical locations where applied parts are used but supply interruption does not endanger life — dialysis rooms, dental surgeries, MRI rooms. Group 2 covers locations where applied parts are used in procedures such as intracardiac, vital treatments and surgical operations where interruption of supply can cause danger to life — operating theatres, ICUs, cardiac catheter labs. The group classification is made by the medical staff using the location and must be documented before design begins.',
    },
    {
      question: 'Can I install an AFDD on a circuit in a dental surgery?',
      answer:
        'Dental surgeries are typically classified as group 1 medical locations. Regulation 710.421.1.7 explicitly prohibits AFDDs in group 0 and group 2 locations, but does not list group 1 in the prohibition. AFDDs may therefore be permitted in dental surgery circuits, but you must consult related regulations (and the medical staff classification) before installing. If any circuit in the surgery is supplied by a medical IT system, the absolute prohibition in Regulation 710.421.1.7.101 applies regardless of group.',
    },
    {
      question: 'Why are RCDs prohibited on medical IT system final circuits?',
      answer:
        'Medical IT systems are designed to keep supplying critical equipment through a first insulation fault. An RCD on such a circuit would defeat the purpose — it would disconnect the circuit on a first fault, interrupting supply to life-support or surgical equipment. Insulation monitoring (MED-IMD) provides the safety function instead: it alarms on insulation degradation so the fault can be cleared during a planned shutdown, not while a procedure is in progress.',
    },
    {
      question: 'What SELV voltage can I apply in an operating theatre?',
      answer:
        'Operating theatres are group 2 medical locations. Regulation 710.414.1.101 limits SELV (and PELV) current-using equipment to 25 V AC RMS or 60 V ripple-free DC. These limits modify the standard values in Regulations 419.2 and 419.3 and apply to any equipment supplied from a SELV or PELV circuit inside the theatre.',
    },
    {
      question: 'How often should a hospital electrical installation be inspected?',
      answer:
        'IET Guidance Note 3 recommends a maximum periodic inspection interval of 1 year for hospitals. Group 2 locations supporting life-support equipment may require shorter intervals based on a risk assessment, and the medical staff may demand inspections aligned to clinical shutdown windows. Each medical IT system also requires functional testing of the insulation monitoring device on a documented schedule.',
    },
    {
      question: 'Do veterinary practices count as medical locations?',
      answer:
        'Yes. Section 710 applies to medical locations as defined in BS 7671, and veterinary practices that use applied parts on animals fall within scope. The same group 0/1/2 classification applies depending on the type of procedure — most veterinary surgeries are group 1, but operating theatres performing surgical procedures on animals may be classified as group 2 under the medical staff’s risk assessment.',
    },
    {
      question: 'What is "Annex A710" — can I rely on it for group classification?',
      answer:
        'Annex A710 of BS 7671 is informative and provides examples for allocating group numbers and safety service classifications. It is intended as a guide only and shall be read in conjunction with Regulation 710.3. The requirements of Regulation 710.3 cannot be satisfied by using the Annex alone — the group classification must be agreed with the medical staff and documented in writing.',
    },
  ],
  relatedPages: [
    {
      href: '/tools/eicr-certificate',
      title: 'EICR Certificate Tool',
      description: 'Digital EICR with BS 7671 A4:2026 observation codes — includes medical location periodic inspection workflow.',
      icon: 'FileCheck2',
      category: 'Tool',
    },
    {
      href: '/tools/earth-loop-impedance-calculator',
      title: 'Earth Loop Impedance (Zs) Calculator',
      description: 'Verify ADS compliance per Regulation 411 for medical location final circuits.',
      icon: 'Calculator',
      category: 'Tool',
    },
    {
      href: '/guides/afdd-arc-fault-detection',
      title: 'AFDD Arc Fault Detection Guide',
      description: 'Where AFDDs are required under A4:2026 — and where (medical locations) they are prohibited.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/guides/bs-7671-amendment-4-2026',
      title: 'BS 7671 Amendment 4 (2026) Summary',
      description: 'What changed in A4:2026 — including the new medical location AFDD prohibitions.',
      icon: 'BookOpen',
      category: 'Guide',
    },
    {
      href: '/guides/eicr-observation-codes-explained',
      title: 'EICR Observation Codes (C1, C2, C3, FI)',
      description: 'Common observation codes used during medical location periodic inspection.',
      icon: 'ClipboardCheck',
      category: 'Guide',
    },
    {
      href: '/electrical-testing-calculators',
      title: 'All 70 Electrical Calculators',
      description: 'Voltage drop, cable sizing, Zs, fault current, adiabatic, RCD — every calc free to use.',
      icon: 'Calculator',
      category: 'Tools',
    },
  ],
  ctaHeading: 'Run medical location inspections with confidence',
  ctaSubheading:
    'Elec-Mate ships the digital EICR tool, 70+ calculators and A4:2026 reference materials UK electricians use on hospital and clinic projects. 7-day free trial, cancel anytime.',
};
