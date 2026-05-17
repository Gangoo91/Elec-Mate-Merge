import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Grounded in BS 7671:2018+A4:2026 (18th Edition), IET Guidance Note 3
// (Inspection & Testing, 9th Edition), the IET On-Site Guide, plus the
// Electricity at Work Regulations 1989 and HSE guidance HSR25 / GS38.

const published = '2026-05-17';
const modified = '2026-05-17';

export const methodStatementLiveWorkingConfig: GeneratedGuideConfig = {
  pagePath: '/guides/method-statement-live-working',
  title:
    'Method Statement for Live Working — UK Electrical Procedure | Elec-Mate',
  description:
    'Method statement for live electrical working in the UK. When live work is lawful under EAWR 1989 Regulation 14, the three-part test, GS38 instruments, BS EN 60900 insulated tools, PPE, lone working and the documentation electricians must hold before any live task begins.',
  datePublished: published,
  dateModified: modified,
  readingTime: 12,
  badge: 'RAMS & Safe Working',
  badgeIcon: 'ShieldCheck',
  breadcrumbLabel: 'Live Working Method Statement',
  heroPrefix: 'Method Statement for',
  heroHighlight: 'Live Working',
  heroSuffix: '— UK Procedure (When It Is Permitted)',
  heroSubtitle:
    'Live electrical working is the exception, not the rule. The Electricity at Work Regulations 1989 Regulation 14 sets a three-part test that every electrician must pass before energised work can be justified. This guide walks through the legal test, the precautions, the documentation, and the real scenarios where live work is legitimate — testing, fault diagnosis, commissioning — versus the many where it is not.',
  keyTakeaways: [
    'EAWR 1989 Regulation 14 prohibits live working unless all three conditions are met: (a) it is unreasonable for the conductor to be dead, (b) it is reasonable for work to be done live, and (c) suitable precautions are taken to prevent injury.',
    'A method statement covering live work must explicitly authorise the task — generic RAMS templates that do not name "live working" do not satisfy Regulation 14.',
    'Live testing, fault diagnosis at LV final-circuit level and commissioning steps that require energisation can be legitimate; replacing accessories or rewiring on circuits that could be isolated almost never is.',
    'Required precautions include a competent person, GS38-compliant test probes, BS EN 60900 insulated tools, insulating mats, eye protection and — where energy levels demand — arc-flash PPE and insulating gloves of the correct class.',
    'Lone live working should be avoided. HSE guidance is that a second competent person is present, trained in emergency action and able to isolate the supply or summon help.',
    'Sign-off chain: the electrician proposing the live task, the supervisor or duty holder authorising it, and the responsible person on site — all named on the method statement before energised work begins.',
  ],
  sections: [
    {
      id: 'when-permitted',
      heading: 'When Live Working Is Permitted',
      tocLabel: 'When permitted',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The default legal position in the UK is that electrical work shall be carried out dead. Regulation 14 of the Electricity at Work Regulations 1989 starts from the principle that no person shall be engaged in any work activity on or near any live conductor — and it then describes the narrow circumstances in which live work may be undertaken.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'The three-part test under EAWR 1989 Regulation 14',
          text:
            'Live work is only permitted where (a) it is unreasonable in all the circumstances for the conductor to be dead, AND (b) it is reasonable in all the circumstances for the person to be at work on or near it while it is live, AND (c) suitable precautions (including, where necessary, the provision of suitable protective equipment) are taken to prevent injury. All three limbs must be satisfied — failing any one means the work must be carried out dead.',
        },
        {
          type: 'paragraph',
          text:
            'The HSE memorandum of guidance on the 1989 Regulations (HSR25) makes clear that the burden is on the duty holder and the worker to demonstrate that each of the three conditions is met. A written method statement is the normal way of recording that demonstration. Without it, the assumption is that live work was not justified.',
        },
        {
          type: 'paragraph',
          text:
            'Read in conjunction with [our safe isolation method statement](/guides/method-statement-safe-isolation), this guide covers the opposite end of the workflow: the procedure for the limited tasks where energisation cannot be avoided.',
        },
      ],
    },
    {
      id: 'justified-vs-not',
      heading: 'Tasks Where Live Work Is Justified vs Not Justified',
      tocLabel: 'Justified vs not',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The three-part test is easy to recite and hard to apply. The two lists below reflect the working interpretation used by HSE inspectors, NICEIC / NAPIT auditors and competent-person assessors when reviewing RAMS in the field.',
        },
        {
          type: 'list',
          tone: 'success',
          items: [
            'Voltage measurement during inspection and testing — verifying presence or absence of voltage, polarity, supply characteristics. Cannot be done dead by definition.',
            'Fault diagnosis on LV final circuits where the symptom only manifests under load (intermittent neutral fault, partial earth fault, RCD nuisance trip investigation).',
            'EV charger commissioning checks that require the supply energised (e.g. functional test of charge initiation, PEN-fault detection on TN-C-S installations).',
            'AFDD and RCD operational testing where a deliberate test current is injected with the device energised — covered in detail in the [BS 7671 A4:2026 AFDD changes guide](/guides/bs-7671-amendment-4-2026).',
            'Thermographic surveys on switchgear that must be under normal load to reveal hot joints.',
            'Live conductor identification at the origin where the only safe alternative would be a planned outage that has been refused or is not reasonably practicable.',
          ],
        },
        {
          type: 'list',
          tone: 'warning',
          items: [
            'Replacing a socket-outlet, switch or lighting accessory on a circuit that can be isolated at the consumer unit. Isolation is reasonable — live work is not justified.',
            'Re-terminating cables in a distribution board on circuits that can be locked off. Working live on busbars to "save time" fails limb (b) of the test.',
            'Adding or modifying circuits while neighbouring circuits remain energised, where the whole board could be isolated for the period of work.',
            'Routine consumer-unit upgrades or fuse-board changes — these are dead work, full stop. A temporary supply or planned outage is the answer.',
            'Tightening connections in an energised distribution board because a customer "doesn\'t want the power off". Commercial pressure is not part of the EAWR test.',
            'Working live to avoid the inconvenience of arranging a planned outage with a DNO or building manager — convenience is not "unreasonable to be dead".',
          ],
        },
      ],
    },
    {
      id: 'required-precautions',
      heading: 'Required Precautions Before Energised Work Begins',
      tocLabel: 'Required precautions',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Limb (c) of Regulation 14 — "suitable precautions are taken" — is the practical heart of the method statement. The list below is the minimum baseline accepted by HSE inspectors and competent-person scheme auditors for routine LV live work.',
        },
        {
          type: 'list',
          items: [
            'Competent person performing the work — trained, experienced and assessed against BS 7671 and EAWR. The competence must extend specifically to live work, not just electrical work in general.',
            'Test instruments and probes complying with HSE guidance note GS38 — finger barriers, fused leads, maximum 4 mm exposed tip, CAT III / CAT IV rating appropriate to the location.',
            'Insulated hand tools to BS EN 60900 (1000 V AC), in date and visually inspected before use. Hot-melt damage, cracks or missing insulation = tool out of service.',
            'Insulating mat under the operator, dry, rated for the system voltage, of sufficient size that the operator and accompanying person can stand on it without overhang.',
            'Eye protection to BS EN 166 — minimum impact rating, with arc-flash face shield for higher-energy work at distribution boards and switchgear.',
            'Insulating gloves to BS EN 60903 of the appropriate class for the system voltage, where the task involves work on or near uninsulated live parts (not always required for instrument-only voltage measurement with GS38 probes).',
            'Barriers, screens or insulating sheeting to prevent inadvertent contact with adjacent live parts in the same enclosure.',
            'A second competent person in attendance — see lone-working section below.',
            'Means of raising the alarm and isolating the supply quickly if something goes wrong — known emergency contact, location of the upstream isolator, agreed signal.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'GS38 — the test-instrument standard you must follow',
          text:
            'HSE Guidance Note GS38 (Electrical test equipment for use by electricians) is the document an inspector will reference if they pick up your meter. Probes with exposed tips longer than 4 mm, leads without inline fuses, or meters without a CAT III rating for a distribution board environment are all GS38 failures and would invalidate a "suitable precautions" claim under Regulation 14.',
        },
      ],
    },
    {
      id: 'ppe-arc-flash',
      heading: 'PPE and Arc-Flash Considerations',
      tocLabel: 'PPE & arc-flash',
      blocks: [
        {
          type: 'paragraph',
          text:
            'For domestic and small commercial LV final-circuit work, the PPE baseline is GS38 probes, insulating mat, eye protection and BS EN 60900 tools. Once you move upstream into distribution boards, sub-mains, large commercial switchgear or any installation with significant prospective fault current, an arc-flash assessment is part of the suitable precautions limb of Regulation 14.',
        },
        {
          type: 'list',
          items: [
            'Arc-flash assessment — incident energy in cal/cm at the working distance, calculated from PFC, clearing time of the upstream device and gap.',
            'Arc-rated clothing matched to the incident energy — long-sleeved shirt and trousers as minimum, balaclava or hood for higher categories.',
            'Arc-rated face shield with chin guard for work inside live panels.',
            'Insulating gloves with leather over-protectors of the correct class for the system voltage (Class 0 for ≤1000 V AC routine LV).',
            'No conductive jewellery, watches or ID lanyards on the body.',
            'Hearing protection — arc events are loud enough to cause damage.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Domestic ≠ low risk',
          text:
            'A "small" job at a domestic intake position can sit on a service fuse with thousands of amps of prospective fault current. Don\'t assume domestic means low energy — check the PFC measurement on the most recent EICR or take a fresh reading before deciding the PPE level.',
        },
      ],
    },
    {
      id: 'lone-working',
      heading: 'Lone Working and Accompanied Working',
      tocLabel: 'Lone working',
      blocks: [
        {
          type: 'paragraph',
          text:
            'HSE guidance is consistent: live working should not normally be carried out alone. The accompanying person is not a passenger — they have a defined role in the method statement.',
        },
        {
          type: 'list',
          items: [
            'A second competent person should be present, positioned so they can isolate the supply if the operator is in difficulty.',
            'The accompanying person must know how to render the operator safe — including not touching them directly if they are still in contact with live parts.',
            'Emergency procedure briefed before the task starts: who isolates, where, how to call 999, location of nearest AED if applicable.',
            'Where genuine lone working cannot be avoided (a one-person voltage measurement during a brief site visit, for example), the method statement must record the risk assessment, the limited scope, and the agreed check-in arrangement with a remote supervisor.',
          ],
        },
      ],
    },
    {
      id: 'documentation-signoff',
      heading: 'Documentation and Sign-Off Chain',
      tocLabel: 'Documentation & sign-off',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A method statement that does not specifically authorise live work cannot be relied on to satisfy EAWR Regulation 14. The document must name the energised task and carry the appropriate signatures before the work begins.',
        },
        {
          type: 'list',
          items: [
            'Task description — what specifically will be done live, where, and on which circuit or piece of equipment.',
            'Justification — which limbs of the Regulation 14 three-part test are satisfied, with reasoning. "Inconvenient to isolate" is not justification.',
            'Precautions list — competent person named, GS38 instruments listed by make / model / calibration date, insulated tools, PPE level, accompanying person named.',
            'Emergency arrangements — isolation point identified, route to nearest AED, emergency contact numbers.',
            'Sign-off chain — operator, supervisor / duty holder, responsible person on site, all signed and dated before energised work commences.',
            'Permit-to-work cross-reference where the site uses a [permit system for electrical isolation](/guides/permit-to-work-electrical-isolation).',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Generic templates won\'t cut it',
          text:
            'If your RAMS template does not name "live working" explicitly and demonstrate the Regulation 14 three-part test, it is not fit for energised work. The [Elec-Mate RAMS Generator](/tools/rams-generator) builds the live-work section into method statements automatically, with the justification, precautions and sign-off chain in the right places.',
        },
      ],
    },
    {
      id: 'common-scenarios',
      heading: 'Common Live-Work Scenarios in UK Practice',
      tocLabel: 'Common scenarios',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The following scenarios are routinely encountered in UK electrical work. Each is legitimate live work where the three-part test is satisfied — but each still requires a written method statement and the full precaution set.',
        },
        {
          type: 'list',
          items: [
            'Inspection and testing — voltage and polarity checks at the origin, presence-of-voltage confirmation before isolation, live polarity at socket-outlets during periodic testing. See also [RAMS for EICR inspection](/guides/rams-for-eicr-inspection).',
            'Fault finding — intermittent symptoms that only show under load, RCD nuisance tripping investigation, harmonic-related neutral overheating, suspected loose terminations identified by thermography. See [fault-finding method statement](/guides/method-statement-fault-finding).',
            'EV charger commissioning — functional test of charge initiation, RDC-DD operation, PEN-fault detection on TN-C-S installations where the protective device must be energised to validate.',
            'AFDD / RCD operational testing — periodic six-monthly user button tests are dead-side, but commissioning trip-current and trip-time tests are inherently energised.',
            'Switchgear thermography — must be under normal load for hot joints to reveal themselves.',
            'Confirming dead — every safe isolation includes a brief live step (testing the proving unit, testing the supply, re-testing the proving unit). That step is live work under Regulation 14, even though the goal is isolation. The same precautions apply.',
          ],
        },
      ],
    },
  ],
  howToHeading: 'How to plan and authorise a live-working task',
  howToDescription:
    'A step-by-step procedure aligned with EAWR 1989 Regulation 14 and HSE guidance HSR25 / GS38.',
  howToSteps: [
    {
      name: 'Apply the Regulation 14 three-part test',
      text:
        'Document, in writing, why it is unreasonable for the conductor to be dead, why it is reasonable to do the work live, and what suitable precautions will be taken. If you cannot answer all three honestly, the work is dead work — stop and plan an isolation instead.',
    },
    {
      name: 'Confirm operator competence for live work',
      text:
        'The competent-person designation must specifically cover live working — not just generic electrical competence. Check qualifications, recent experience, and any scheme-body restrictions on live tasks.',
    },
    {
      name: 'Specify GS38 instruments and BS EN 60900 tools',
      text:
        'List the meter, probes, leads, insulated tools and insulating mat by make, model and calibration date. Reject any item with damaged insulation, expired calibration or a CAT rating below the working environment.',
    },
    {
      name: 'Assess arc-flash energy and select PPE',
      text:
        'Calculate or look up the incident energy at the working position. Select arc-rated clothing, face shield and gloves matched to the energy level — and to the system voltage where insulating gloves are required.',
    },
    {
      name: 'Brief the accompanying person and emergency plan',
      text:
        'Walk through the isolation point, the emergency contact procedure, the rescue method (never touch a person in contact with live parts) and the location of the nearest AED. Record the briefing on the method statement.',
    },
    {
      name: 'Obtain sign-off before energised work begins',
      text:
        'Operator, supervisor / duty holder and the responsible person on site all sign and date the method statement. Cross-reference any permit-to-work or LOTO procedure. Only then does the live task start.',
    },
  ],
  faqs: [
    {
      question: 'Is live working ever lawful in the UK?',
      answer:
        'Yes — but only narrowly. EAWR 1989 Regulation 14 permits live work where all three conditions are met: it is unreasonable for the conductor to be dead, it is reasonable for the person to work on it live, and suitable precautions are taken. Testing, fault diagnosis and certain commissioning steps routinely satisfy the test; routine accessory replacement on circuits that could be isolated almost never does.',
    },
    {
      question: 'Does "voltage measurement" count as live work?',
      answer:
        'Yes. Any task that involves contact with, or proximity to, an uninsulated live conductor is live work under Regulation 14. Voltage measurement at a socket-outlet, polarity confirmation at an isolator, presence-of-voltage check at the origin — all are live tasks and need the appropriate precautions: GS38 probes, insulated mat, eye protection and a competent operator. The fact that the goal is to confirm whether the supply is live or dead does not exempt the step from Regulation 14.',
    },
    {
      question: 'Can I work live to avoid disconnecting a tenant\'s freezer or a customer\'s server?',
      answer:
        'No — commercial or domestic inconvenience does not satisfy the "unreasonable for the conductor to be dead" limb of the test. The correct answer is to plan a temporary supply, an out-of-hours isolation, or a phased shutdown. HSE inspectors and competent-person scheme auditors have repeatedly rejected "convenience" justifications.',
    },
    {
      question: 'What is GS38 and why is it mentioned every time live work is discussed?',
      answer:
        'GS38 is the HSE guidance note "Electrical test equipment for use by electricians". It specifies design requirements for test probes (maximum 4 mm exposed tip, finger barriers), leads (inline fuses, robust insulation) and instruments (appropriate CAT rating for the location). GS38 compliance is the standard an HSE inspector will measure your equipment against if anything goes wrong during a live task — so it is the floor, not the ceiling, of suitable precautions.',
    },
    {
      question: 'Do I need an arc-flash assessment for domestic live work?',
      answer:
        'For LV final-circuit tasks on a domestic socket or lighting circuit, a full arc-flash incident-energy calculation is usually not required, but the operator should still wear long sleeves, eye protection and use insulated tools. For work at the consumer unit or origin — especially on properties with high prospective fault current — an arc-flash assessment is part of the suitable-precautions limb of Regulation 14, and the appropriate arc-rated PPE must be worn.',
    },
    {
      question: 'Is lone live working ever acceptable?',
      answer:
        'HSE guidance is that live working should not normally be carried out alone. A second competent person must be in attendance, trained to render assistance without becoming a second casualty, and able to isolate the supply or summon help. Limited exceptions — for example, a single voltage measurement during a brief site visit — must be risk-assessed in writing, with a remote supervisor check-in arrangement, and the scope kept strictly to what cannot be deferred.',
    },
    {
      question: 'How is the method statement for live work different from a normal RAMS?',
      answer:
        'A live-work method statement must explicitly name "live working", record the Regulation 14 three-part test reasoning, list GS38 instruments and BS EN 60900 tools by model and calibration date, name the accompanying person, document the emergency plan, and carry signatures from the operator, supervisor and responsible person before energised work starts. Generic RAMS templates that simply say "electrical work" do not meet the standard. See our [electrical RAMS template](/guides/electrical-rams-template-uk) for the full layout.',
    },
  ],
  relatedPages: [
    {
      href: '/tools/rams-generator',
      title: 'RAMS Generator',
      description: 'Build a compliant live-work method statement in minutes — Regulation 14 reasoning, GS38 instruments and sign-off chain pre-formatted.',
      icon: 'FileText',
      category: 'Tool',
    },
    {
      href: '/guides/method-statement-safe-isolation',
      title: 'Safe Isolation Method Statement',
      description: 'The dead-work counterpart — full safe-isolation procedure with proving unit, lock-off and re-prove.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/guides/method-statement-fault-finding',
      title: 'Fault-Finding Method Statement',
      description: 'Energised diagnosis procedure — intermittent faults, RCD nuisance trips, neutral and earth fault tracing.',
      icon: 'Search',
      category: 'Guide',
    },
    {
      href: '/guides/permit-to-work-electrical-isolation',
      title: 'Permit-to-Work for Electrical Isolation',
      description: 'How permit systems integrate with live-work authorisation and the sign-off chain.',
      icon: 'ClipboardCheck',
      category: 'Guide',
    },
    {
      href: '/guides/lockout-tagout-loto-electricians',
      title: 'Lockout / Tagout (LOTO) for Electricians',
      description: 'Physical isolation hardware, padlocks, hasps and tag protocols that underpin a safe-isolation method statement.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/guides/working-near-live-mains-hazard-control',
      title: 'Working Near Live Mains — Hazard Control',
      description: 'Barriers, screens, proximity rules and supervision arrangements for work adjacent to energised conductors.',
      icon: 'AlertTriangle',
      category: 'Guide',
    },
    {
      href: '/guides/rams-for-eicr-inspection',
      title: 'RAMS for EICR Inspection',
      description: 'Inspection and testing is inherently part-live — the dedicated method statement for periodic inspection work.',
      icon: 'FileCheck2',
      category: 'Guide',
    },
    {
      href: '/guides/electrical-rams-template-uk',
      title: 'UK Electrical RAMS Template',
      description: 'The base method-statement structure all task-specific RAMS extend, including live-work authorisation slots.',
      icon: 'FileText',
      category: 'Guide',
    },
  ],
  ctaHeading: 'Generate a compliant live-working method statement in minutes',
  ctaSubheading:
    'Elec-Mate\'s RAMS Generator builds the EAWR Regulation 14 three-part test, GS38 instrument list, BS EN 60900 tool register, arc-flash PPE, lone-working assessment and sign-off chain into a single PDF — ready for site. 7-day free trial, cancel anytime.',
};
