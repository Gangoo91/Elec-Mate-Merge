import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Grounded in BS 7671:2018+A4:2026 (18th Edition), IET Guidance Note 3
// (Inspection & Testing, 9th Edition), the IET On-Site Guide, plus the
// CDM 2015 statutory framework and the Electricity at Work Regulations 1989.

const published = '2026-05-17';
const modified = '2026-05-17';

export const ramsForEVChargerInstallationConfig: GeneratedGuideConfig = {
  pagePath: '/guides/rams-for-ev-charger-installation',
  title:
    'RAMS for EV Charger Installation — UK Method Statement Guide | Elec-Mate',
  description:
    'EV charger installation RAMS for UK electricians. Hazards, control measures, BS 7671:2018+A4:2026 Section 722 references, PME/PNB earthing, AFDD exemption, CDM 2015 and EAWR 1989 duties — with a method statement template and digital RAMS Generator.',
  datePublished: published,
  dateModified: modified,
  readingTime: 12,
  badge: 'Method Statement Guide',
  badgeIcon: 'ClipboardCheck',
  breadcrumbLabel: 'RAMS for EV Charger',
  heroPrefix: 'RAMS for',
  heroHighlight: 'EV Charger Installation',
  heroSuffix: '— Method Statement (UK)',
  heroSubtitle:
    'A complete Risk Assessment and Method Statement framework for installing an EV charging point at a UK domestic or light-commercial property. Aligned to BS 7671:2018+A4:2026 Section 722, the IET Code of Practice for EV Charging Equipment Installation (5th Edition), CDM 2015 Regulation 15 and the Electricity at Work Regulations 1989. Use this guide alongside Elec-Mate\u2019s RAMS Generator and EV Charger Certificate tool to issue site-ready paperwork in minutes.',
  keyTakeaways: [
    'EV charger installs combine several high-risk activities: drilling external walls, working at height, working outdoors in changing weather, isolating the consumer\u2019s mains and commissioning a new circuit \u2014 a single generic RAMS will not cover them all.',
    'BS 7671:2018+A4:2026 Section 722 governs EV charging installations. A4:2026 retains the PME-supply restrictions of Regulation 722.411.4.1 and now expressly distinguishes PME from PNB (TN-C-S where the neutral is bonded to earth only at the origin).',
    'Regulation 722.421.1.7.201 in A4:2026 permits the AFDD requirement for final circuits supplying EV charging points to be relaxed where a risk assessment justifies it \u2014 the justification must be recorded.',
    'CDM 2015 Regulation 15 applies even on a single-day domestic EV install: the contractor must plan, manage and monitor the work, and provide site-specific information to anyone affected.',
    'EAWR 1989 Regulation 4 (systems, work activities and protective equipment) and Regulation 14 (work on or near live conductors) drive the safe-isolation and proving-dead elements of the method statement.',
    'Customer property protection is part of the RAMS \u2014 dust sheets, drilling debris, drive-paving reinstatement and post-install commissioning evidence all belong in the method statement before work starts.',
  ],
  sections: [
    {
      id: 'why-ev-needs-its-own-rams',
      heading: 'Why EV Installs Need Their Own RAMS',
      tocLabel: 'Why a dedicated RAMS',
      blocks: [
        {
          type: 'paragraph',
          text:
            'An EV charger installation is not a "small works" job. In a single visit an electrician will typically work at height to install an external unit, drill through the external fabric of the building, install and route a sub-main, isolate the consumer\u2019s mains supply, modify the consumer unit (or fit a sub-board) and commission a new dedicated final circuit. Each of those activities has its own hazard profile, and each must be addressed in the method statement.',
        },
        {
          type: 'paragraph',
          text:
            'A generic "electrical installation works" RAMS is not adequate. The Health and Safety Executive expects the risk assessment to be specific to the task, the location and the people who may be affected \u2014 see [the wider electrical RAMS template guide](/guides/electrical-rams-template-uk) for the underlying framework, then layer the EV-specific hazards in this guide on top.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Statutory anchor',
          text:
            'The Management of Health and Safety at Work Regulations 1999 Regulation 3 requires every employer (and self-employed person) to carry out a "suitable and sufficient" risk assessment. CDM 2015 Regulation 15 layers a planning, management and monitoring duty on top whenever the work is construction \u2014 which an EV install is.',
        },
      ],
    },
    {
      id: 'ev-specific-hazards',
      heading: 'EV-Specific Hazards and Control Measures',
      tocLabel: 'Hazards and controls',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Below are the hazards that distinguish an EV charger install from a routine domestic addition. Each one must appear in the RAMS with a named control measure and the residual risk recorded.',
        },
        {
          type: 'list',
          tone: 'warning',
          items: [
            'Drilling external walls \u2014 cavity collapse, hidden cables/pipes, masonry strike, dust inhalation. Control: cable/pipe detector pre-scan, dust mask (FFP3 for silica), drill on slow speed, debris collection sheet.',
            'Working at height \u2014 most charge points fit 1.0\u20131.5 m above ground, but external sockets at first-floor level or wall-mounted units on rendered upper walls require a step or low-level platform. See [working at height for electricians](/guides/working-at-height-electricians) for the full control set.',
            'Working outdoors \u2014 wind, rain, cold, low light. Control: defer commissioning if rain ingress risk to opened enclosure; use IP-rated temporary lighting; suspend torque-critical tasks below 5\u00b0C unless manufacturer permits.',
            'PME/PNB open-PEN risk \u2014 a broken supply neutral can put the consumer\u2019s earthed metalwork at supply voltage. Section 722.411.4.1 of BS 7671:2018+A4:2026 prohibits relying on a TN-C-S/PME earth for the EV unless specific conditions are met (e.g. integral open-PEN protection device certified for EV use, or installation of an earth electrode and conversion to TT for the EV final circuit).',
            'PNB distinction \u2014 A4:2026 now expressly separates PNB (Protective Neutral Bonding, TN-C-S where the neutral is bonded to earth only at the origin) from PME (Protective Multiple Earthing). The risk assessment must record which arrangement is present \u2014 see [the A4:2026 TN-C-S / PNB earthing guide](/guides/bs-7671-a4-2026-tn-cs-pnb-earthing) for the wording change.',
            'Isolation of the consumer\u2019s mains \u2014 the only safe way to install a new sub-main is with the main switch open. Control: follow the safe-isolation procedure in [our safe isolation method statement](/guides/method-statement-safe-isolation); lock-off and tag the main switch; prove dead with a GS38-compliant tester proved against a known source before and after.',
            'Customer property protection \u2014 dust sheets in the consumer\u2019s home, board protection where ladders are placed on driveways, reinstatement of any disturbed paving or render. Damage to property is the single most common cause of post-install dispute.',
            'Live commissioning of the new circuit \u2014 once the supply is re-energised, the charge point must be commissioned in accordance with the manufacturer\u2019s instructions and BS EN 61851-1. Control: PPE rated for the prospective fault current, ELV test instruments, and a written commissioning sequence in the RAMS.',
          ],
        },
      ],
    },
    {
      id: 'bs-7671-section-722',
      heading: 'BS 7671 Section 722 \u2014 Regulations You Must Cite',
      tocLabel: 'BS 7671 Section 722',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Section 722 ("Electric vehicle charging installations") is the special-location chapter for EV charging in BS 7671:2018+A4:2026. The method statement should reference the regulations that apply to the specific installation and record the design decisions taken under each one.',
        },
        {
          type: 'list',
          items: [
            'Regulation 722.411.4.1 \u2014 PME supplies: a PME earth must not be used for the EV charging point unless one of the listed conditions is met (integral open-PEN device, separate TT arrangement for the EV final circuit, or other measure permitted by the regulation).',
            'Regulation 722.421.1.7.201 \u2014 AFDD: an AFDD is required for the final circuit supplying the EV charging point unless the designer can justify omission on the basis of a documented risk assessment. See [the A4:2026 AFDD changes guide](/guides/bs-7671-a4-2026-afdd-changes) for the exemption wording.',
            'Regulation 722.531.3 \u2014 RCD protection: each EV charging connection point must be protected by an RCD of Type A or higher; Type B is required where the charge point does not provide its own DC fault current detection. The manufacturer\u2019s data sheet for the charge point must be consulted before specifying the RCD type.',
            'Regulation 722.55.101 \u2014 plug, socket and connector standards: the connection point must comply with the relevant part of BS EN 62196.',
            'Regulation 722.512.2 \u2014 external influences: enclosures must be rated for the location (typically IPX4 minimum for outdoor units; IK rating for impact resistance).',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'IET Code of Practice (5th Edition)',
          text:
            'The IET Code of Practice for Electric Vehicle Charging Equipment Installation (5th Edition) sits alongside BS 7671 and provides the practical detail \u2014 site survey, load assessment, DNO liaison, smart-charging compliance under the Electric Vehicles (Smart Charge Points) Regulations 2021, and earthing arrangement selection. The method statement should record that the design has been carried out in accordance with the Code of Practice.',
        },
      ],
    },
    {
      id: 'dno-and-load',
      heading: 'DNO Notification and Load Assessment',
      tocLabel: 'DNO and load',
      blocks: [
        {
          type: 'paragraph',
          text:
            'EV charge points are connected generation- and load-relevant equipment. Most domestic 7 kW chargers require post-installation notification to the DNO under Engineering Recommendation G98 (per phase). Higher-power or three-phase installations trigger G99 pre-notification, which must be applied for and approved before energisation.',
        },
        {
          type: 'list',
          items: [
            'G98 \u2014 connect-and-notify for single 16 A per phase devices. Notify the DNO within 28 days of energisation using the standard G98 form. Most 7 kW domestic chargers fall within this category.',
            'G99 \u2014 pre-notify for higher-rated or multi-charge-point installations. Approval must be obtained from the DNO before commissioning. Allow 4\u201312 weeks depending on the DNO.',
            'Maximum demand assessment \u2014 add the EV charge point to the dwelling\u2019s existing maximum demand calculation. If the available supply capacity is insufficient, either a load-management/smart-charging solution or a supply upgrade is required \u2014 see [cable size for EV charger](/guides/cable-size-for-ev-charger) for the cable selection side of this.',
            'Smart charging compliance \u2014 the Electric Vehicles (Smart Charge Points) Regulations 2021 require domestic and workplace charge points sold or installed in Great Britain to meet smart functionality, randomised delay and default off-peak charging requirements. The installer must verify the unit being installed is compliant.',
          ],
        },
      ],
    },
    {
      id: 'commissioning-and-testing',
      heading: 'Commissioning and Inspection \u0026 Testing',
      tocLabel: 'Commissioning',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The RAMS must end with a documented commissioning sequence. An EV charge point is a new circuit and therefore requires an Electrical Installation Certificate (EIC) for the addition, plus the EV-specific commissioning checks called for by Section 722 and the IET Code of Practice.',
        },
        {
          type: 'list',
          tone: 'success',
          items: [
            'Conformity check \u2014 confirm the unit is to the relevant part of BS EN 61851 and BS EN 62196, has a current declaration of conformity, and matches the smart-charging requirements where applicable.',
            'Inspection \u2014 visual inspection per BS 7671 Chapter 64, paying particular attention to ingress protection, mechanical protection of cables, and the integrity of the earthing arrangement.',
            'Testing \u2014 continuity of protective conductors, insulation resistance, polarity, earth fault loop impedance, RCD operation (including Type-A/Type-B characteristic, where fitted), AFDD functional test where installed, and PEN-fault simulation for charge points using integral open-PEN devices.',
            'Functional commissioning \u2014 charge cycle test with a vehicle or test load, lock-mechanism test, app/back-office pairing, smart-charging schedule verification.',
            'Documentation \u2014 issue an EIC for the addition, issue the manufacturer\u2019s commissioning sheet, and provide the customer handover pack (user guide, RCD test instructions, supplier contact details, MCS certificate if registered).',
          ],
        },
      ],
    },
    {
      id: 'legal-framework',
      heading: 'Legal Framework Behind the RAMS',
      tocLabel: 'Legal framework',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A RAMS is not just a procedural document \u2014 it is the written evidence that the installer has discharged statutory duties. For an EV charger install, the relevant frameworks are:',
        },
        {
          type: 'list',
          items: [
            'Electricity at Work Regulations 1989 \u2014 Regulation 4 (systems, work activities and protective equipment) and Regulation 14 (work on or near live conductors) underpin the isolation and proving-dead sequence in the method statement.',
            'Construction (Design and Management) Regulations 2015 \u2014 Regulation 15 requires the contractor to plan, manage and monitor the work, and to provide site-specific information. See [the CDM 2015 guide for electricians](/guides/cdm-2015-for-electricians) for how this applies on small works.',
            'Management of Health and Safety at Work Regulations 1999 \u2014 Regulation 3 requires the risk assessment that drives the RAMS.',
            'Work at Height Regulations 2005 \u2014 any task where a person could fall a distance liable to cause injury falls within scope, including step-ladder work on a charge point at 1.5 m.',
            'Building Regulations \u2014 Part P applies where the EV charge point is installed in or attached to a dwelling, requiring notification to building control (or self-certification by a registered competent person under a Part P scheme).',
          ],
        },
      ],
    },
  ],
  howToSteps: [
    {
      name: 'Site survey and design',
      text:
        'Carry out a site survey covering supply arrangement (TN-S, TN-C-S/PME, TN-C-S/PNB, TT), prospective fault current, earth fault loop impedance, maximum demand, available consumer-unit ways, the proposed location of the charge point, and the cable route. Confirm DNO notification path (G98 connect-and-notify, or G99 pre-notification). Record the design decisions \u2014 earthing arrangement selected, RCD type, AFDD inclusion or documented exemption under 722.421.1.7.201 \u2014 in the design file.',
    },
    {
      name: 'Generate the RAMS',
      text:
        'Build the Risk Assessment and Method Statement before mobilising to site. List the hazards in this guide, assign control measures, name competent persons, and append the site-specific information (parking, access, isolation point, customer contact). Elec-Mate\u2019s [RAMS Generator](/tools/rams-generator) builds the document from the survey inputs in under a minute and outputs a customer-ready PDF.',
    },
    {
      name: 'Notify the DNO and the customer',
      text:
        'For G99 installations, submit the application and wait for written approval before mobilising. For G98 installations, prepare the connect-and-notify form for submission within 28 days of energisation. Issue the RAMS to the customer at least 24 hours before work starts, with the proposed isolation window clearly stated.',
    },
    {
      name: 'Safe isolation and first fix',
      text:
        'Follow the safe-isolation method statement: identify the circuit, isolate at the main switch, lock-off and tag, prove dead with a GS38-compliant tester against a known live source before and after. Run the sub-main, drill external penetrations, mount the charge point enclosure, and pull cables back to the consumer unit or sub-board. Restore supply only after all live parts are enclosed.',
    },
    {
      name: 'Commission and test',
      text:
        'Energise the new circuit. Carry out the BS 7671 Chapter 64 inspection, the dead tests (continuity, insulation resistance, polarity), the live tests (Zs, RCD operation, AFDD where fitted, PEN-fault simulation where the unit has an integral open-PEN device), and the manufacturer\u2019s functional commissioning sequence. Capture the readings as you go.',
    },
    {
      name: 'Certify and hand over',
      text:
        'Issue the [EV Charger Certificate](/ev-charger-certificate) (Electrical Installation Certificate for the addition, with the EV-specific commissioning record), provide the customer handover pack, and submit Part P notification (or self-certify via a registered scheme). Submit the DNO G98 notification within 28 days. File the RAMS, the test results and the certificate against the job in your back-office system.',
    },
  ],
  howToHeading: 'How to plan and execute an EV charger install',
  howToDescription:
    'A six-stage sequence from site survey to handover, with the paperwork mapped to each stage.',
  faqs: [
    {
      question: 'Is a RAMS legally required for a single domestic EV charger install?',
      answer:
        'Strictly, the Management of Health and Safety at Work Regulations 1999 require a "suitable and sufficient" risk assessment for any work activity \u2014 the format is not prescribed. CDM 2015 Regulation 15 layers a planning, management and monitoring duty on top. In practice, every reputable EV installer issues a written RAMS because it is the evidence trail that satisfies both regulatory regimes and the documentation that MCS, NICEIC, NAPIT and most insurance policies expect to see if an incident occurs.',
    },
    {
      question: 'What does Section 722 of BS 7671:2018+A4:2026 require for PME supplies?',
      answer:
        'Regulation 722.411.4.1 prohibits the use of the PME earthing facility for the EV charging point unless one of the listed conditions is met. The practical options are: (a) fit an EV charge point with an integral open-PEN protection device certified for use in this application, (b) install a separate earth electrode for the EV final circuit and convert that part of the installation to TT, or (c) apply one of the other measures permitted by the regulation. A4:2026 also formally distinguishes PME from PNB \u2014 the design record must state which arrangement is in place.',
    },
    {
      question: 'Does an EV charger final circuit have to have an AFDD under A4:2026?',
      answer:
        'A4:2026 introduced an exemption mechanism. Regulation 722.421.1.7.201 permits the AFDD requirement for a final circuit supplying an EV charging point to be relaxed where the designer documents a risk assessment justifying omission. If the assessment does not justify omission, an AFDD is required. The decision \u2014 and the justification \u2014 must be recorded in the design file and referenced in the certificate.',
    },
    {
      question: 'When does an EV install need G99 notification rather than G98?',
      answer:
        'G98 covers single-phase connections up to and including 16 A per phase that are connect-and-notify \u2014 most 7 kW domestic chargers fall here. G99 applies above that, to three-phase installations, and to multi-charge-point sites where the combined capacity exceeds the G98 threshold. G99 is a pre-notification \u2014 the DNO must approve the connection in writing before energisation. Lead times vary between DNOs but are commonly four to twelve weeks.',
    },
    {
      question: 'What goes in the customer handover pack for an EV charger?',
      answer:
        'At minimum: the Electrical Installation Certificate for the addition; the EV-specific commissioning record; the manufacturer\u2019s user manual and quick-start guide; written instructions for testing the RCD periodically; the supplier and emergency contact details; the MCS certificate where the installer is MCS-registered; and a copy of the Part P building-control notification (or self-certification). For smart-charge installations, include the back-office account credentials and any default schedule that has been configured.',
    },
    {
      question: 'Do I need to test the AFDD as part of commissioning?',
      answer:
        'Where an AFDD is fitted, BS 7671:2018+A4:2026 expects a functional test using the device\u2019s test facility, and this should be recorded on the schedule of test results alongside the RCD test. Where the design has documented an exemption under Regulation 722.421.1.7.201 and no AFDD is fitted, the schedule should record the exemption and reference the design risk assessment rather than leaving the test field blank.',
    },
  ],
  faqHeading: 'EV charger RAMS \u2014 frequently asked questions',
  relatedPages: [
    {
      href: '/tools/rams-generator',
      title: 'RAMS Generator',
      description: 'Build a site-specific RAMS in under a minute from a structured input form \u2014 EV, EICR, rewire and more.',
      icon: 'ClipboardCheck',
      category: 'Tool',
    },
    {
      href: '/ev-charger-certificate',
      title: 'EV Charger Certificate',
      description: 'Issue the EIC for the EV charging final circuit with the Section 722 commissioning record built in.',
      icon: 'FileCheck2',
      category: 'Tool',
    },
    {
      href: '/guides/cable-size-for-ev-charger',
      title: 'Cable Size for EV Charger',
      description: 'Cable selection for 7 kW and 22 kW EV chargers \u2014 CSA, route length, voltage drop and protective device.',
      icon: 'Cable',
      category: 'Guide',
    },
    {
      href: '/guides/bs-7671-a4-2026-afdd-changes',
      title: 'BS 7671 A4:2026 \u2014 AFDD Changes',
      description: 'What changed for AFDDs in A4:2026, including the new exemption mechanism for EV final circuits.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/guides/bs-7671-a4-2026-tn-cs-pnb-earthing',
      title: 'TN-C-S, PME and PNB under A4:2026',
      description: 'Earthing arrangement terminology in A4:2026 \u2014 critical for the EV design decision under 722.411.4.1.',
      icon: 'Zap',
      category: 'Guide',
    },
    {
      href: '/guides/method-statement-safe-isolation',
      title: 'Method Statement \u2014 Safe Isolation',
      description: 'The EAWR 1989 Regulation 14 isolation, lock-off, prove-dead procedure that underpins the EV install RAMS.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
  ],
  ctaHeading: 'Speed up your EV install paperwork',
  ctaSubheading:
    'Elec-Mate generates site-specific RAMS, the EV Charger Certificate and the customer handover pack in minutes \u2014 with BS 7671:2018+A4:2026 Section 722 references built in. Start a 7-day free trial and replace your blank-template Word docs with structured, audit-ready paperwork.',
};
