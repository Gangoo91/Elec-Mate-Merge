import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Grounded in BS 7671:2018+A4:2026 (18th Edition), IET Guidance Note 3
// (Inspection & Testing, 9th Edition), the IET On-Site Guide, plus the
// CDM 2015 statutory framework and the Electricity at Work Regulations 1989.

const published = '2026-05-17';
const modified = '2026-05-18';

export const ramsForEICRInspectionConfig: GeneratedGuideConfig = {
  pagePath: '/guides/rams-for-eicr-inspection',
  title:
    'RAMS for an EICR Inspection — UK Electrical Method',
  description:
    'A complete RAMS (Risk Assessment & Method Statement) guide for UK EICR inspections. Covers EICR-specific hazards…',
  datePublished: published,
  dateModified: modified,
  readingTime: 13,
  badge: 'RAMS Template Guide',
  badgeIcon: 'ClipboardCheck',
  breadcrumbLabel: 'RAMS for EICR',
  heroPrefix: 'RAMS for an',
  heroHighlight: 'EICR Inspection',
  heroSuffix: '— Method Statement Template',
  heroSubtitle:
    'An EICR is not a new installation. The hazards, controls and isolation arrangements are different — and your RAMS has to reflect that. This guide explains exactly what an EICR-specific Risk Assessment & Method Statement must cover under BS 7671:2018+A4:2026, IET Guidance Note 3, CDM 2015 and EAWR 1989, with a step-by-step structure you can drop straight into your in-app RAMS Generator.',
  keyTakeaways: [
    'An EICR RAMS is not a generic "electrical installation" RAMS. Inspection and testing on an energised, in-service installation introduces hazards a new-build RAMS does not address — live testing, occupied premises, third-party access, hidden defects, and the discovery of C1 conditions mid-job.',
    'Electricity at Work Regulations 1989 Regulation 14 only permits live working where it is unreasonable for the work to be carried out dead, suitable precautions are taken, and the person is competent. The RAMS must justify each live-testing step against Regulation 14 — it is not enough to say "live testing is needed for an EICR".',
    'CDM 2015 Regulation 15 applies to contractors carrying out EICRs in commercial, industrial and many domestic settings. The RAMS is one of the documents that demonstrates the contractor has planned, managed and monitored the work safely.',
    'BS 7671:2018+A4:2026 and IET Guidance Note 3 (9th Edition) set the technical framework for the inspection itself — sequence of tests, sample size, observation coding (C1/C2/C3/FI) — and the RAMS should reference both as the basis for the method.',
    'Typical EICR-specific hazards include: live testing under Regulation 14, working near unisolated supplies during bonding continuity tests, working in occupied/rented premises, lone working, working near gas and water services (R1+R2 bonding loops), and the discovery of C1 conditions requiring immediate isolation.',
    'A robust EICR RAMS pre-defines the C1 emergency plan — who isolates, who locks off, who notifies the responsible person, and how the inspector leaves site safely if remedial action cannot be carried out the same day.',
  ],
  sections: [
    {
      id: 'why-eicr-needs-its-own-rams',
      heading: 'Why an EICR Needs Its Own RAMS',
      tocLabel: 'Why a dedicated EICR RAMS',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A Risk Assessment & Method Statement (RAMS) for an Electrical Installation Condition Report is a fundamentally different document from a new-installation RAMS. The work is happening on an energised, occupied, in-service installation that the inspector has not built — and that may already contain Code C1 defects waiting to be discovered.',
        },
        {
          type: 'paragraph',
          text:
            'A generic "electrical works" RAMS will not satisfy a CDM 2015 principal contractor, a commercial duty holder, or — increasingly — a private-rented-sector landlord asking for documentation under the [Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020](/guides/eicr-code-c1-danger-present). The RAMS has to address the specific risks of inspection and testing, not installation.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'What a generic RAMS misses',
          text:
            'A generic electrical RAMS typically assumes the installation can be isolated, locked off and worked on dead. An EICR is the opposite: live testing is unavoidable for parts of the inspection (insulation resistance under live conditions, polarity verification, RCD operation, earth fault loop impedance under load). The RAMS must justify each live step against EAWR 1989 Regulation 14 and define the controls that make it safe.',
        },
        {
          type: 'paragraph',
          text:
            'Elec-Mate\'s [in-app RAMS Generator](/tools/rams-generator) includes a dedicated EICR template that pre-populates the inspection-specific hazards, BS 7671:2018+A4:2026 references, GN3 sequence-of-tests structure and the C1 emergency plan — so you are not starting from a blank document on every job.',
        },
      ],
    },
    {
      id: 'eicr-specific-hazards',
      heading: 'EICR-Specific Hazards Your RAMS Must Cover',
      tocLabel: 'EICR-specific hazards',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The hazards on an EICR inspection are not the same as those on a new installation. The RAMS must identify and control the following, at minimum:',
        },
        {
          type: 'list',
          tone: 'warning',
          items: [
            'Live testing — insulation resistance, earth fault loop impedance, RCD operating time and prospective fault current tests all involve energised conductors. The risk of electric shock, arc flash and short-circuit incidents is present throughout.',
            'Working in occupied premises — tenants, customers, staff, children and pets may be on site. Trip hazards from leads, accidental contact with exposed terminals during cover-off inspection, and the duty to leave the property in a safe state at the end of every working day.',
            'Hidden defects discovered during inspection — undocumented modifications, borrowed neutrals, missing earth conductors, damaged cables behind covers. Any of these may become a C1 the moment the cover comes off.',
            'Bonding continuity tests near gas and water services — R1+R2 and main bonding continuity tests bring the inspector into close working proximity with gas meters, gas pipework, water stop cocks and incoming services. Mechanical damage to these services is a separate, serious hazard.',
            'Lone working — the majority of domestic EICRs are single-engineer jobs. Loss of communication, accident with no second person on site, and customer-conflict scenarios all need control measures defined in the RAMS.',
            'Third-party access during testing — circuits being tested are by definition not under the inspector\'s sole control. A second occupant could re-energise a circuit, plug equipment in, or open a cupboard while testing is in progress.',
            'Consumer unit / distribution board access — older boards may have asbestos backing, friable insulation, or live exposed busbars when the cover comes off.',
            'Working at height — meter cupboards, distribution boards and consumer units are frequently above shoulder height; loft inspections of cabling and fire-detector circuits introduce step-ladder, attic-floor and dust hazards.',
          ],
        },
      ],
    },
    {
      id: 'eawr-cdm-legal-framework',
      heading: 'The Legal Framework — EAWR 1989, CDM 2015 and BS 7671',
      tocLabel: 'Legal framework',
      blocks: [
        {
          type: 'paragraph',
          text:
            'An EICR RAMS sits inside three overlapping legal frameworks. The document should explicitly reference each one, because failing to do so weakens both the legal defence of the inspector and the contractual position of the duty holder.',
        },
        {
          type: 'list',
          items: [
            'Electricity at Work Regulations 1989 — Regulation 4 requires electrical systems to be constructed and maintained so as to prevent danger so far as is reasonably practicable. Regulation 14 controls live working: it is only permitted where it is unreasonable to work dead, suitable precautions are taken, and the person is competent. Each live step in the EICR method must be justified against Regulation 14.',
            'CDM 2015 — Regulation 15 places duties on contractors to plan, manage and monitor the work, and to provide each worker with appropriate supervision, instructions and information. The RAMS is the primary written evidence that the contractor has discharged these duties. For domestic clients, the contractor adopts the client duties unless a principal contractor is appointed.',
            'BS 7671:2018+A4:2026 — Chapter 64 (Initial Verification) and Chapter 65 (Periodic Inspection and Testing) set the technical requirements. The RAMS should reference Chapter 65 and IET Guidance Note 3 (Inspection & Testing, 9th Edition) as the basis for the sequence of tests and observation coding.',
            'Health and Safety at Work etc. Act 1974 — Sections 2 and 3 require employers to protect employees and others affected by the work. For self-employed inspectors, Section 3 applies directly.',
            'PRS Electrical Safety Regs (England) 2020 — for rented-property EICRs, the RAMS should acknowledge the 28-day timescale for written confirmation of remedial works following a C1 or C2.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'EAWR 1989 Regulation 14 — the three-part test',
          text:
            'Live working is only permitted where (a) it is unreasonable in all the circumstances for the system to be made dead, (b) it is reasonable in all the circumstances for the person to be at work on or near that conductor while it is live, and (c) suitable precautions (including, where necessary, the provision of suitable protective equipment) are taken to prevent injury. Your EICR RAMS should record this test against each live step — not just assert that "live testing is required".',
        },
      ],
    },
    {
      id: 'isolation-during-inspection-vs-testing',
      heading: 'Isolation Arrangements — Inspection vs Testing',
      tocLabel: 'Isolation: inspection vs testing',
      blocks: [
        {
          type: 'paragraph',
          text:
            'One of the most important distinctions in an EICR RAMS — and the one most often missed in generic templates — is that inspection and testing have different isolation requirements. The method statement must call this out explicitly.',
        },
        {
          type: 'list',
          items: [
            'Inspection (visual examination) of accessible parts — wherever a cover, accessory plate or enclosure is removed to inspect terminations, the affected circuit should be isolated, locked off and proved dead in accordance with the [safe isolation procedure](/guides/method-statement-safe-isolation). This is dead working and falls under EAWR 1989 Regulation 13.',
            'Testing — continuity (R1+R2, R2, ring final), insulation resistance, polarity and earth electrode resistance tests are carried out with the installation isolated. Earth fault loop impedance (Zs), prospective fault current (Ipf) and RCD operating-time tests require the installation to be energised, and fall under EAWR 1989 Regulation 14 (live working).',
            'Switching strategy — the RAMS should pre-define how the installation will be isolated for inspection (typically circuit-by-circuit at the consumer unit) and how it will be re-energised in a controlled sequence for live testing.',
            'Lock-off and proving — every isolation step uses a personal lock-off device, a key under the inspector\'s sole control, and proving with an [approved voltage indicator and proving unit (GS38-compliant)](/guides/permit-to-work-electrical-isolation) before any cover is removed.',
            'Communication to occupants — the RAMS should specify that the occupant is informed of each isolation in advance, with realistic timeframes, and that critical loads (life-support equipment, deep-freezers with high-value contents, alarm systems) are identified before any isolation.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'The "test dead first" principle',
          text:
            'Even where a test ultimately requires the circuit to be energised — for example, an Ipf test or an RCD operating-time test — the safe-isolation principle applies during the connection of test leads. Probes go onto dead terminals, the inspector withdraws to a safe position, and only then is the circuit re-energised through the lock-off being released. This sequence belongs in the RAMS, not just in the inspector\'s head.',
        },
      ],
    },
    {
      id: 'occupied-premises-and-lone-working',
      heading: 'Occupied Premises, Vulnerable Occupants and Lone Working',
      tocLabel: 'Occupied premises & lone working',
      blocks: [
        {
          type: 'paragraph',
          text:
            'EICRs are frequently carried out in occupied homes, occupied tenancies, schools, care homes and operational commercial premises. The RAMS must address the human factors that a new-installation RAMS rarely needs to consider.',
        },
        {
          type: 'list',
          tone: 'success',
          items: [
            'Pre-inspection contact with the occupant or duty holder — confirm vulnerable occupants (children, elderly, disabled, those reliant on powered medical equipment), critical loads, and the working window.',
            'Site induction and walk-around on arrival — identify trip hazards, restricted access areas, pets, and the location of the consumer unit / DB / meter position.',
            'A communicated isolation plan — every occupant on site should know which areas will lose power, when, and for how long.',
            'Lone-working controls — defined check-in times with a nominated contact (office, partner, family member), a charged mobile phone with the nominated contact on speed-dial, and a [documented lone-working procedure](/guides/lone-working-electricians). Some duty holders require a man-down alarm or buddy-check call schedule.',
            'Customer-conflict de-escalation — the RAMS should record the inspector\'s authority to suspend the inspection and leave site if the occupant becomes aggressive or refuses isolation.',
            'PPE for occupied premises — overshoes, dust sheets, low-noise tools where appropriate, and consideration for asbestos disturbance during cover removal on installations pre-2000.',
          ],
        },
      ],
    },
    {
      id: 'c1-emergency-plan',
      heading: 'The C1 Emergency Plan',
      tocLabel: 'C1 emergency plan',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A C1 ([Danger Present](/guides/eicr-code-c1-danger-present)) finding mid-inspection is one of the most common — and most poorly planned — scenarios on an EICR. The inspector\'s professional obligation under EAWR 1989 is that the danger must be removed before they leave site. The RAMS should pre-define exactly how that happens.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Identify the C1 condition and immediately make the affected part dead — isolate at the consumer unit, lock off, prove dead.',
            'Communicate to the responsible person in person and in writing — the RAMS template should reference the wording of the C1 notification that the inspector will leave on site.',
            'If the affected part is a complete circuit that supplies essential load (heating, lighting in an occupied dwelling), record the impact, the temporary alternative arrangements, and the agreed timeline for remedial works.',
            'If the responsible person refuses isolation — for rented properties — escalate to the local authority and record the refusal on the EICR and on the RAMS as-built record.',
            'If the entire installation is left isolated because no other safe option exists, leave a clearly written notice on the consumer unit and notify the responsible person, the distribution network operator (where the danger affects the supply intake), and — for [PRS](/guides/eicr-code-c2-potentially-dangerous) — the local authority.',
            'Document the C1, the immediate action taken, and the chain of notification in Section K of the EICR and in the RAMS as-built record.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Do not leave a known C1 unmanaged',
          text:
            'An inspector who walks away from a documented C1 without isolating it or arranging immediate remedial work is exposed under EAWR 1989 Regulation 4, the Health and Safety at Work Act 1974 Section 3, and — in the worst case — manslaughter charges if injury results. The C1 emergency plan in the RAMS is what proves the inspector did the right thing.',
        },
      ],
    },
    {
      id: 'ppe-and-equipment',
      heading: 'PPE, Test Equipment and Calibration',
      tocLabel: 'PPE & equipment',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The RAMS should list the minimum PPE and test equipment that the inspector will use, with calibration evidence available on request. EAWR 1989 Regulation 14(c) explicitly requires "suitable protective equipment" where it is necessary to prevent injury during live work.',
        },
        {
          type: 'list',
          items: [
            'Insulated gloves rated for the voltage being worked on (Class 0 minimum for LV installations up to 1000 V AC), inspected before each use.',
            'Safety eyewear rated for arc-flash exposure during cover removal on older distribution boards.',
            'Insulated tools to BS EN 60900 — screwdrivers, pliers and cutters rated to 1000 V where used near live conductors.',
            'GS38-compliant test probes and an approved voltage indicator with a separate proving unit. Two-pole voltage indicators only — no neon screwdrivers.',
            'Multifunction tester (MFT) calibrated within the last 12 months, with calibration certificate available. Record the MFT serial number and calibration expiry date on the EICR.',
            'Arc-flash rated clothing where the prospective fault current of the installation under test exceeds the threshold defined in the contractor\'s arc-flash assessment.',
            'A locked-off kit — at least one personal padlock per inspector, lock-off MCB devices in common sizes, multi-lock hasp where multiple persons are involved.',
            'First-aid kit appropriate to electrical work, including a defibrillator within 4 minutes\' reach for commercial sites where this is part of the duty holder\'s arrangements.',
          ],
        },
      ],
    },
    {
      id: 'sign-off-chain',
      heading: 'The Sign-Off Chain',
      tocLabel: 'Sign-off chain',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A RAMS is only as good as its sign-off record. The document should be prepared, reviewed and accepted before work starts, and updated as-built once the inspection is complete.',
        },
        {
          type: 'list',
          items: [
            'Prepared by — the competent person preparing the RAMS, with their qualifications recorded (2391 / 2394+2395 / equivalent).',
            'Reviewed by — a second competent person within the contractor\'s organisation, or the duty holder\'s appointed safety adviser.',
            'Accepted by — the duty holder, principal contractor (under CDM 2015), or — for domestic clients — the homeowner / landlord with a written acknowledgement.',
            'Briefed to — every worker on site has signed to confirm they have read, understood and will follow the RAMS. For lone-working EICRs, the inspector signs both the prepared-by and briefed-to lines.',
            'As-built — at the end of the inspection, the RAMS is closed out with notes on any deviations from the planned method, any C1 / C2 conditions encountered, and any controls that were upgraded mid-job.',
          ],
        },
        {
          type: 'callout',
          tone: 'success',
          title: 'Elec-Mate handles the sign-off chain digitally',
          text:
            'The in-app [RAMS Generator](/tools/rams-generator) creates the EICR-specific RAMS in under five minutes, captures digital signatures from each role in the sign-off chain, time-stamps the briefing, and exports a PDF that links directly to the [EICR Certificate](/tools/eicr-certificate) generated from the same job. No paper trail to lose, no inconsistency between the RAMS and the EICR.',
        },
      ],
    },
  ],
  howToHeading: 'How to build a compliant EICR RAMS in six steps',
  howToDescription:
    'Use this sequence whether you are writing your first EICR RAMS by hand or using the Elec-Mate RAMS Generator. The structure is the same; the tool just removes the typing.',
  howToSteps: [
    {
      name: 'Capture the job and the duty-holder context',
      text:
        'Record the property address, the type of installation (domestic, commercial, industrial, HMO, PRS rental), the responsible person, the expected occupancy during the inspection, any vulnerable occupants, critical loads, and the agreed working window. This drives most of the downstream controls.',
    },
    {
      name: 'List the EICR-specific hazards',
      text:
        'Start from the standard EICR hazard list — live testing, occupied premises, lone working, hidden defects, bonding tests near gas and water, working at height, possible asbestos in older boards — and add any site-specific hazards from the initial walk-around or pre-inspection call.',
    },
    {
      name: 'Justify live testing under EAWR 1989 Regulation 14',
      text:
        'For every step that requires the installation to be energised (Zs, Ipf, RCD operating time, live polarity), record why it is unreasonable to perform the test dead, what suitable precautions are in place, and confirm the inspector\'s competence. This is the Regulation 14 three-part test, in writing.',
    },
    {
      name: 'Define the isolation strategy',
      text:
        'Pre-define the isolation sequence: which circuits come off first, which lock-off devices are used, where the inspector\'s padlock keys are held, how the installation is proved dead, how dead working transitions to live testing and back, and how the occupant is communicated with at each transition.',
    },
    {
      name: 'Insert the C1 emergency plan',
      text:
        'Pre-write the response to a C1 finding mid-job: immediate isolation, written notice to the responsible person, escalation path for refused isolation, and the documented chain of notification (responsible person, local authority for PRS, DNO where the supply intake is affected).',
    },
    {
      name: 'Get the sign-off chain in place before work starts',
      text:
        'Prepared by, reviewed by, accepted by, briefed to — captured with names, dates and digital signatures before the inspector picks up a multifunction tester. Close out the as-built record at the end of the inspection, attach to the EICR PDF, and store with the certificate.',
    },
  ],
  faqs: [
    {
      question: 'Do I really need a separate RAMS for every EICR job, or can I use a template?',
      answer:
        'A template is fine — in fact, it is best practice — provided you tailor it to the specific job. The hazards, occupants, critical loads, vulnerable persons and isolation strategy will be different at every property. The [Elec-Mate RAMS Generator](/tools/rams-generator) uses an EICR-specific template and asks the job-specific questions, so the output is bespoke without you starting from a blank document. A truly generic RAMS that names no occupants, lists no critical loads and references no site-specific hazards is not compliant with CDM 2015 Regulation 15 or with the duty of care under the Health and Safety at Work Act 1974 Section 3.',
    },
    {
      question: 'Is live testing during an EICR allowed under EAWR 1989 Regulation 14?',
      answer:
        'Yes — but only where the three-part test in Regulation 14 is satisfied. It must be unreasonable in all the circumstances for the system to be made dead (true for Zs, Ipf and RCD operating-time tests, which cannot be performed dead), it must be reasonable for the person to be working on or near the live conductor, and suitable precautions including PPE must be in place. The RAMS is the document that records this justification — not a free pass to bypass dead working.',
    },
    {
      question: 'Does CDM 2015 apply to a domestic EICR?',
      answer:
        'Yes. CDM 2015 applies to all construction work, and inspection-and-testing falls within that definition. For domestic clients (those not carrying out work in connection with a business), the contractor takes on the client duties under Regulation 7(1) unless a principal contractor is appointed. The contractor still has Regulation 15 duties to plan, manage and monitor the work, and the RAMS is the evidence that those duties have been discharged.',
    },
    {
      question: 'What happens if I find a Code C1 condition mid-inspection?',
      answer:
        'Your RAMS should pre-define this. The inspector\'s professional obligation under EAWR 1989 is to remove the danger before leaving site — typically by isolating the affected part, locking off and notifying the responsible person in writing. The condition is recorded in Section K of the [EICR with a C1 classification](/guides/eicr-code-c1-danger-present), which automatically makes the overall report assessment "unsatisfactory". If the responsible person refuses isolation, escalate to the local authority for rented properties, and record the refusal on the RAMS as-built record and on the EICR itself.',
    },
    {
      question: 'How does the RAMS interact with the safe-isolation procedure?',
      answer:
        'The [safe-isolation procedure](/guides/method-statement-safe-isolation) is a sub-procedure inside the EICR RAMS. The RAMS describes the overall plan for the inspection — hazards, controls, sign-off, emergency plan. The safe-isolation procedure describes the specific step-by-step sequence used every time a circuit is isolated for dead working. Most contractors maintain a single safe-isolation procedure and reference it from every RAMS rather than rewriting it every time.',
    },
    {
      question: 'Do I need to brief lone-working EICRs differently?',
      answer:
        'Yes. Lone working is itself a controllable hazard, and the [lone-working procedure](/guides/lone-working-electricians) should be referenced in the RAMS. At minimum: a nominated contact, check-in times, a charged phone with the contact on speed-dial, and an escalation path if the inspector misses a check-in. For higher-risk sites (commercial, industrial, hostile-occupant scenarios), some contractors require a man-down alarm or a buddy on standby.',
    },
    {
      question: 'Where does BS 7671 Amendment 4:2026 affect the RAMS?',
      answer:
        '[BS 7671:2018+A4:2026](/guides/bs-7671-amendment-4-2026) introduces AFDD requirements, updates to TN-C-S (PNB) terminology and revisions to model-form columns including the EICR. The RAMS should reference the current edition by name, and the inspector should confirm that their MFT firmware, EICR template and test sequence reflect A4:2026 rather than the earlier A2:2022 revision.',
    },
  ],
  relatedPages: [
    {
      href: '/tools/rams-generator',
      title: 'In-App RAMS Generator',
      description:
        'Generate a bespoke EICR RAMS in under five minutes — EICR-specific hazards, Regulation 14 live-testing justification, C1 emergency plan…',
      icon: 'ClipboardCheck',
      category: 'Tool',
    },
    {
      href: '/tools/eicr-certificate',
      title: 'EICR Certificate Tool',
      description:
        'Digital EICR aligned to BS 7671:2018+A4:2026, with C1/C2/C3/FI classification, per-observation photos, and PDF export linked to your RAMS.',
      icon: 'FileCheck2',
      category: 'Tool',
    },
    {
      href: '/guides/method-statement-safe-isolation',
      title: 'Safe Isolation Method Statement',
      description:
        'Step-by-step safe-isolation procedure under EAWR 1989 Regulation 13 — proving dead, lock-off, GS38-compliant probes and approved voltage indicators.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/guides/cdm-2015-for-electricians',
      title: 'CDM 2015 for Electricians',
      description:
        'How the Construction (Design and Management) Regulations 2015 apply to electrical inspection…',
      icon: 'BookOpen',
      category: 'Guide',
    },
    {
      href: '/guides/eicr-code-c1-danger-present',
      title: 'EICR Code C1 — Danger Present',
      description:
        'The C1 classification explained: when to use it, what happens to the overall assessment, and the inspector\'s immediate-action obligations.',
      icon: 'AlertTriangle',
      category: 'Guide',
    },
    {
      href: '/guides/lone-working-electricians',
      title: 'Lone Working for Electricians',
      description:
        'Controls for single-engineer EICRs and installation jobs — check-in protocols, escalation, man-down alarms and customer-conflict de-escalation.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
  ],
  ctaHeading: 'Stop rewriting RAMS for every EICR',
  ctaSubheading:
    'Elec-Mate\'s in-app RAMS Generator builds a bespoke, EICR-specific Risk Assessment & Method Statement in under five minutes — pre-loaded with BS 7671:2018+A4:2026, IET GN3, EAWR 1989 Regulation 14 justification and a built-in C1 emergency plan. Linked directly to the EICR Certificate tool so the paperwork flows from one to the other. 7-day free trial, cancel anytime.',
};
