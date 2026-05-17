import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Grounded in BS 7671:2018+A4:2026 (18th Edition, published 15 April 2026,
// Section 537 Isolation and Switching), IET Guidance Note 3 (Inspection &
// Testing, 9th Edition), the IET On-Site Guide and the Electricity at Work
// Regulations 1989.

const published = '2026-05-17';
const modified = '2026-05-17';

export const section537IsolationSwitchingA4Config: GeneratedGuideConfig = {
  pagePath: '/guides/section-537-isolation-switching-a4-2026',
  title:
    'Section 537 Isolation & Switching under BS 7671:2018+A4:2026 — What\'s Changed | Elec-Mate',
  description:
    'A working electrician\'s guide to Section 537 of BS 7671:2018+A4:2026 — the four switching functions, padlockable isolator requirements, EV charge point isolation, battery storage DC switching, solar PV rooftop isolators, and what A4:2026 actually changed.',
  datePublished: published,
  dateModified: modified,
  readingTime: 18,
  badge: 'BS 7671:2018+A4:2026',
  badgeIcon: 'ShieldCheck',
  breadcrumbLabel: 'Section 537 Isolation & Switching (A4:2026)',
  heroPrefix: 'Section 537',
  heroHighlight: 'Isolation & Switching',
  heroSuffix: '— BS 7671:2018+A4:2026 changes',
  heroSubtitle:
    'Section 537 of BS 7671 governs how a circuit is taken out of service safely and how operators control equipment in normal use. Amendment 4 (2026) tightens requirements for remote and smart switching, brings EV charge points and battery energy storage into the isolation framework, and pulls solar PV DC isolation under a single rule set. This guide walks through every clause that matters on site under A4:2026.',
  keyTakeaways: [
    'Section 537 defines four switching functions: isolation (537.2), mechanical maintenance switching (537.3.2), emergency switching (537.3.3) and functional switching (537.4). A switch suitable only for functional switching cannot lawfully be used as an isolator.',
    'A4:2026 rewrites Section 537 to cover remote and smart switching. Where a smart device performs an isolation, emergency or maintenance function, a local manual means must still be present and identifiable — software alone is not isolation.',
    'Section 537.2.1 requires every installation to have an effective means of isolation disconnecting all live conductors (and the neutral in TT and IT systems, and in TN systems where required), securable against inadvertent re-energisation by padlock or captive handle.',
    'For TN-C-S (PNB) installations the means of isolation must not disconnect the PEN conductor — reinforced in A4:2026 alongside the new PNB earthing arrangement clauses.',
    'EV charge points (Section 722) and battery storage systems now cross-reference Section 537 explicitly: each needs a means of isolation accessible to the operator, with DC sources isolated separately from the AC supply.',
    'Solar PV requires a DC isolator at the inverter and, for rooftop arrays, a DC isolator accessible to firefighters — A4:2026 aligns these existing requirements with Section 537 language.',
    'Inspection & testing under Sections 642 / 651 requires verification that isolating devices are correctly identified, correctly rated, securable open, and that emergency switching is positioned to be operated quickly without exposing the operator to danger.',
  ],
  sections: [
    {
      id: 'what-section-537-is',
      heading: 'What Section 537 Actually Covers',
      tocLabel: 'Scope of Section 537',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Section 537 sits in Part 5 of BS 7671 ("Selection and Erection of Equipment") and provides the rules for the devices that interrupt the supply to a circuit. Chapter 46, Section 462 (Isolation) and Section 463 (Switching off for mechanical maintenance, emergency switching and functional switching) all hand off to 537 for selection of the actual physical device. The structure follows the four switching functions defined in Section 463 — a switch fit for one function is not automatically fit for another, and using a functional switch as an isolator is a direct Section 537 breach.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'The four switching functions in plain English',
          text:
            'Isolation = make it safe to work on. Mechanical maintenance switching = stop the motor so the engineer can clean it. Emergency switching = kill the supply now. Functional switching = the operator turning the load on and off in normal use. Section 537 says which device fits which function.',
        },
      ],
    },
    {
      id: 'four-switching-functions',
      heading: 'The Four Switching Functions',
      tocLabel: 'Four switching functions',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A device complying with Section 537 must be suitable for the function it is being relied on to perform. The four functions are defined in Section 463 and realised by the device requirements in Section 537.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Isolation (Section 537.2) — disconnecting an installation or circuit from every source of live supply for safety, with a means of securing the disconnection. Required before any work on dead conductors under Regulation 13 of the Electricity at Work Regulations 1989.',
            'Switching for mechanical maintenance (Section 537.3.2) — switching off so non-electrical work (cleaning, adjusting, lubricating) can be carried out safely. The device must cut the full load current and be secured in the off position.',
            'Emergency switching (Section 537.3.3) — switching off to remove unexpected danger. The device must operate in a single action, be readily accessible at the point of danger, and disconnect the supply quickly.',
            'Functional switching (Section 537.4) — the ordinary on/off used by the operator in normal use. Functional switches need not be securable but must be suitable for the most onerous duty cycle they will see.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'One physical device can satisfy more than one function if it meets the most demanding requirement. A switch-disconnector with a lockable handle that breaks full load current can serve as isolation, mechanical maintenance switching and (if positioned correctly) emergency switching all at once. A semiconductor functional switch alone cannot — semiconductors are not isolators.',
        },
      ],
    },
    {
      id: 'isolation-537-2',
      heading: 'Section 537.2 — Isolation Requirements',
      tocLabel: 'Section 537.2 isolation',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Section 537.2.1 sets out the headline requirement: every installation must have a means of isolating it from each source of energy. Breaking load current is not required (an isolator need not be operable on load), but the device must reliably interrupt every line conductor and, in the systems specified, the neutral as well. When open, the contacts must satisfy the isolation distance of the relevant product standard — typically BS EN 60947-3 for switch-disconnectors or BS EN 60898 / 60947-2 for circuit-breakers suitable for isolation.',
        },
        {
          type: 'list',
          items: [
            'The isolator must disconnect every line conductor; in TT, IT and TN-S where required, also the neutral.',
            'In TN-C and TN-C-S the PEN conductor must not be disconnected — Section 537.2.2 is explicit and A4:2026 reinforces it alongside the new PNB earthing clauses.',
            'Contact position (open or closed) must be either directly visible or reliably indicated by clear, durable marking.',
            'The device must be securable against inadvertent re-closure — padlock facility, captive removable handle, lockable enclosure, or procedural lock-off where physical means are not reasonably practicable.',
            'Where remote isolation is provided (smart switches, network contactors), A4:2026 requires a local manual means of isolation also identified at the point of work — software lock-off alone is not isolation.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Padlock or captive handle — not "I\'ll remember"',
          text:
            'Section 537.2.4 requires the means of securing the isolator open to be reliable. A circuit-breaker with a paper "do not switch on" label is not securing isolation. A circuit-breaker with a lock-off device fitted and a personal padlock is. See our [lockout / tagout (LOTO) for electricians guide](/guides/lockout-tagout-loto-electricians) for the canonical procedure.',
        },
        {
          type: 'paragraph',
          text:
            'Section 537.2.4 also requires the means of isolation to be identifiable. On a distribution board this is the circuit list and permanent labelling; on a remote isolator a durable label naming the circuit it isolates. Inspectors under Section 642 will check the labelling matches what the device actually controls — a mismatched label is a Code C2 finding on an EICR.',
        },
      ],
    },
    {
      id: 'emergency-switching-537-3',
      heading: 'Section 537.3.3 — Emergency Switching',
      tocLabel: 'Section 537.3.3 emergency',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Emergency switching lets somebody confronted with unexpected danger — fire, electric shock, entanglement, runaway motor — cut the supply immediately. Section 537.3.3 defines both the device characteristics and where the operator must be able to reach it.',
        },
        {
          type: 'list',
          items: [
            'The device must interrupt the supply in a single action — no sequence of operations, no multi-step menu, no key-protected access during normal use.',
            'It must break the full load current of the equipment at risk, including locked-rotor or stall current of motors on the circuit.',
            'It must be readily accessible at the place where danger may arise — at the operator station for machinery, at the bench for laboratories, within easy reach without leaving the room for laundries.',
            'Red operator on yellow background where reasonably practicable (BS EN ISO 13850), so the device is recognisable in low light or under stress.',
            'A latching device (e.g. a mushroom-head emergency stop) must be releasable only by a deliberate action.',
            'Where the operator cannot reach the supply directly (roof-mounted condenser, external pump house, basement boiler), an emergency switching device at the point of operation must signal the upstream supply to disconnect.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Distance — within reach without leaving the workplace',
          text:
            'Section 537.3.3 gives no single metric distance, but the principle is clear: an emergency switch that forces the operator to walk past the danger has failed. The BS EN 60204-1 working norm — "within easy reach without changing posture" — is what inspectors apply.',
        },
      ],
    },
    {
      id: 'functional-switching-537-4',
      heading: 'Section 537.4 — Functional Switching',
      tocLabel: 'Section 537.4 functional',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Functional switching is the ordinary control of the load in normal operation — the light switch, the contactor energising the heater, the smart relay closing the curtain motor. Section 537.4 says functional switches must be suitable for the most onerous duty they will see, matched to the load characteristics (resistive, inductive, capacitive, motor, discharge lighting, LED driver) and to the expected switching frequency.',
        },
        {
          type: 'list',
          items: [
            'Functional switches need not disconnect every conductor — a single-pole functional switch in the line conductor is permitted for most non-motor circuits.',
            'They need not be securable in the off position — functional control is not isolation.',
            'They must switch the load they control, including inrush. A switch rated for tungsten lighting may fail on LED driver inrush; one rated for resistive load may fail on capacitor-corrected fluorescent.',
            'Semiconductor functional switches (SSRs, dimmers, smart relays) are recognised in Section 537.4. They switch loads but pass off-state leakage, so cannot satisfy 537.2 isolation.',
            'A4:2026 broadens recognition of smart functional switching — wireless dimmers, cloud-controlled contactors, BMS outputs — provided the device meets its product standard and local manual control is still met where another function (emergency, isolation, maintenance) is claimed.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'The most common Section 537.4 EICR failure is a 6 A plate switch being relied on to isolate a circuit. Plate switches are not isolators — they don\'t satisfy 537.2 contact-gap requirements and can\'t be reliably secured open. This is a Code C2 finding.',
        },
      ],
    },
    {
      id: 'a4-2026-changes',
      heading: 'What Amendment 4 (2026) Actually Changed in Section 537',
      tocLabel: 'A4:2026 changes',
      blocks: [
        {
          type: 'paragraph',
          text:
            'BS 7671:2018+A4:2026 was published on 15 April 2026 and brings Section 537 up to date with technologies that were rare or non-existent in 2018. The headline changes concentrate around remote and smart switching, the formal incorporation of EV charge points and battery energy storage systems into the isolation framework, and alignment of solar PV DC isolation with mainstream Section 537 language.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Remote and smart switching — A4:2026 recognises that isolators, emergency switches and maintenance switches may be operated remotely (app, BMS, cloud), but a local manually operable means at the point of work must still satisfy the relevant Section 537 sub-clause. Software locks alone are not isolation.',
            'EV charge points — Section 722 has been updated and Section 537 cross-references to it. Every EV charge point must have a means of isolation accessible to the user, and where the EVSE includes DC fault current protection, the isolation requirement applies in addition, not instead.',
            'Battery energy storage systems (BESS) — A4:2026 introduces explicit clauses requiring a DC isolator between the battery and the inverter, and a separate AC isolator between the inverter and the consumer unit. Section 537 governs both; both must be securable open.',
            'Solar PV — A4:2026 aligns Section 712 language with Section 537. A DC isolator is required adjacent to the inverter, and for rooftop arrays a means of DC isolation accessible to firefighters at low level is required where the array does not incorporate equivalent rapid shutdown.',
            'TN-C-S (PNB) — the new Protective Neutral Bonding earthing arrangement clauses reinforce Section 537.2.2: the means of isolation must not break the PEN conductor.',
            'AFDDs — where an AFDD provides both protective and isolation functions, Section 537.2 requirements still apply to the isolation function (contact-gap, securable open, identifiable).',
          ],
        },
        {
          type: 'callout',
          tone: 'success',
          title: 'A4:2026 is an evolution, not a re-write',
          text:
            'Most of Section 537 is unchanged — the four functions, the device requirements, the inspector\'s checks. A4:2026 adds the technologies that lacked a clear home and patches the language so the same competence framework applies to smart isolators as to a 1990s rotary handle. See our [BS 7671 Amendment 4 (2026) summary guide](/guides/bs-7671-a4-2026-summary) for the full change list.',
        },
      ],
    },
    {
      id: 'disconnector-vs-switch',
      heading: 'Disconnector vs Switch-Disconnector vs Circuit-Breaker',
      tocLabel: 'Device selection',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Section 537 names three closely related device families and electricians commonly confuse them. The product standards (BS EN 60947-3 and BS EN 60947-2) define them precisely.',
        },
        {
          type: 'list',
          items: [
            'Disconnector (isolator) — for isolation only, not required to break load current. Visible contact gap, securable open, suitable for 537.2. Often the main switch on industrial assemblies where load break is provided by a downstream contactor.',
            'Switch-disconnector — combines load-break capability with the isolation contact gap. Suitable for 537.2 AND 537.3.2 mechanical maintenance switching. The default for domestic consumer unit main switches and sub-main isolators.',
            'Circuit-breaker suitable for isolation — a CB meeting the contact-gap requirements of its product standard for use as an isolator. BS EN 60898 MCBs and most BS EN 60947-2 MCCBs sold in the UK meet this. They provide isolation, overcurrent protection and load break — the universal final-circuit choice.',
            'A disconnector that is not a switch-disconnector must never be opened on load — doing so will likely destroy the contacts and may produce an internal arc fault.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'A semiconductor device — even a high-quality solid-state relay or a smart contactor — is never a 537.2 isolator on its own. Off-state leakage cannot satisfy the isolation contact-gap requirement. Where a smart relay sits in series with a mechanical isolator, the mechanical isolator does the isolation; the smart relay does functional switching under 537.4.',
        },
      ],
    },
    {
      id: 'ev-charging-isolation',
      heading: 'EV Charge Point Isolation under Section 722 + 537',
      tocLabel: 'EV charger isolation',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A4:2026 brought EV charge points decisively into the isolation framework. Section 722 cross-references Section 537 explicitly. Every EV charge point installation must include a means of isolation operable by the user, the installer for maintenance, and an emergency responder.',
        },
        {
          type: 'list',
          items: [
            'A means of isolation must be provided on the supply to the EV charge point. Domestic installs typically use a dedicated, clearly labelled MCB or RCBO in the consumer unit.',
            'For commercial / multi-point installations, an external lockable rotary switch-disconnector adjacent to the EVSE is standard practice — Section 537.2.4 requires securable isolation within reach of the unit.',
            'Where the EV charge point includes integral DC fault current protection (Type B RCD function or 6 mA DC detection equivalent), Section 537 isolation requirements still apply in addition. DC protection inside the EVSE is not a means of isolation.',
            'For TN-C-S (PNB) supplies the means of isolation must not break the PEN conductor — consistent with the updated TN-C-S earthing arrangement clauses in A4:2026.',
            'Labelling must name the EV charge point unambiguously and, where the EVSE is in a different room or outside, both ends (consumer unit MCB and external isolator) must reference each other.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'For the full A4:2026 changes specific to EV charging, including the integral DC protection options and PME (PNB) earthing arrangements, see our [Section 722 EV charging A4:2026 changes guide](/guides/section-722-ev-charging-a4-2026-changes).',
        },
      ],
    },
    {
      id: 'battery-storage-dc',
      heading: 'Battery Storage DC Isolation',
      tocLabel: 'BESS DC isolation',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Battery energy storage systems (BESS) — home batteries, commercial storage, hybrid PV/battery systems — were not properly addressed in the 2018 edition. A4:2026 brings them in and Section 537 governs the isolation devices. The risk profile is different from a normal load: the battery is the source. You cannot turn it off by opening the AC supply because the battery is still energised internally.',
        },
        {
          type: 'list',
          items: [
            'A DC isolator must be installed between the battery and the inverter (or any DC bus) — a switch-disconnector rated for DC at the system voltage, capable of breaking the DC current under fault conditions.',
            'An AC isolator must be installed between the inverter and the consumer unit — conventional Section 537.2 isolation, typically a rotary switch-disconnector adjacent to the inverter.',
            'Both isolators must be securable open. For competent-person battery rooms a captive removable handle is acceptable; for domestic installs padlockable rotaries are the norm.',
            'An integral contactor opened by the BMS on fault does not satisfy Section 537.2 — a manual external DC isolator is still required.',
            'Labelling must make clear both AC and DC isolators must be opened to fully isolate the system. A "BATTERY — TWO POINTS OF ISOLATION" label adjacent to the equipment is the typical solution.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'A battery is always energised',
          text:
            'Opening the AC isolator does not make the DC side safe. Any work on the battery, DC cabling or inverter DC terminals requires the DC isolator to be opened and proved dead on the DC side. Section 537.2 securable-open applies equally to both.',
        },
      ],
    },
    {
      id: 'solar-pv-dc-isolation',
      heading: 'Solar PV DC Isolation — Rooftop and at the Inverter',
      tocLabel: 'Solar PV DC isolation',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Solar PV has had a DC isolation rule under Section 712 since the technology became common; A4:2026 aligns the language with Section 537 so installers and inspectors work from a single device-selection framework. The principle is unchanged: a PV array generates DC whenever there is light on it, and the only way to make the DC side safe is to physically open a DC switch-disconnector.',
        },
        {
          type: 'list',
          items: [
            'A DC isolator must be installed adjacent to the inverter, between the array and the inverter input — a switch-disconnector rated for PV DC at the system maximum voltage (typically up to 1000 V DC for residential strings).',
            'For rooftop arrays, a means of DC isolation accessible to firefighters at low level is required where the array does not incorporate equivalent rapid shutdown. This is the firefighter isolator HSE and fire services have been asking for since HSG 261.',
            'The DC isolator must be securable open — Section 537.2.4 applies to PV DC isolation as to all other isolation.',
            'On the AC side, a conventional Section 537.2 isolator (MCB, RCBO or rotary switch-disconnector) sits between the inverter output and the consumer unit. The AC isolator isolates the inverter from the grid; the DC isolator isolates the inverter from the array.',
            'Labelling must identify both isolators and indicate that both must be opened to fully isolate the system. Where a hybrid inverter feeds a battery, the battery DC isolator is an additional point of isolation.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'Module-level rapid shutdown systems (MLPE, optimisers with rapid shutdown signal, microinverters) can satisfy the rooftop DC isolation requirement where they meet the relevant product standard and opening the AC supply triggers shutdown of every module to a safe touch voltage. A4:2026 acknowledges this option explicitly.',
        },
      ],
    },
    {
      id: 'inspection-testing',
      heading: 'Inspection & Testing for Section 537 Devices',
      tocLabel: 'Inspection & testing',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Under Part 6, every isolating and switching device must be verified during initial verification (Section 642) and reviewed during periodic inspection (Section 651). Most Section 537 verification is visual — but the checks are formal, part of the inspector\'s methodology, and recorded on the EIC and EICR schedules.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Correct selection — the device is suitable for the function(s) being claimed. A 6 A plate switch claimed as an isolator fails.',
            'Correct rating — current rating at least equal to the controlled load; interrupting capacity suitable for the prospective fault current at the terminals.',
            'Securable open — the device can be locked or otherwise secured off. For circuit-breakers, a lock-off device fitted to the toggle.',
            'Identifiable — clear durable labelling of the circuit or equipment controlled. Drift between label and load is a common EICR Code C3 (or C2 where safety is at stake) finding.',
            'Visible contact position — directly visible or reliably indicated. For switch-disconnectors the handle position; for circuit-breakers the toggle.',
            'Accessibility — accessible without removing non-user covers and without tools beyond a key for restricted enclosures.',
            'Emergency switches additionally — positioned at the point of danger, red-on-yellow where reasonably practicable, single-action operation.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'For the underlying lock-off procedure an inspector expects to see before any work on dead conductors, see our [safe isolation method statement guide](/guides/method-statement-safe-isolation) and the [permit to work for electrical isolation guide](/guides/permit-to-work-electrical-isolation). The Section 537 device makes safe isolation possible; the procedure makes it happen.',
        },
      ],
    },
    {
      id: 'smart-isolators',
      heading: 'Smart and Remote Isolation under A4:2026',
      tocLabel: 'Smart isolators',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A4:2026 has formalised the requirements for smart switching — network-connected contactors, app-controlled relays, BMS-driven contactor blocks, smart consumer units with remote breaker control. The standard does not prohibit them; it places performance conditions. The core principle: a software command is not, on its own, a means of isolation under Section 537.2.',
        },
        {
          type: 'list',
          items: [
            'A smart device used purely for functional switching under 537.4 sits within its product standard; Section 537 imposes no additional constraint beyond normal functional-switch criteria.',
            'A smart device relied on for isolation, emergency or mechanical-maintenance switching needs a local manual means at the point of work that satisfies the relevant Section 537 sub-clause independently of any network connection.',
            'For remote isolation (installer in a control room opening a distant circuit), the procedure must include physical securing of the device at the field location before work begins — a remote command is reversible by another remote command.',
            'For smart consumer units with app-tripped breakers, the breakers themselves remain Section 537-compliant isolators if they meet BS EN 60898 with the isolation function — the app is a functional convenience, not the isolation.',
            'A4:2026 is clear that loss of network connectivity must not leave a circuit unable to be isolated — there must always be a local manual means.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Smart consumer units and the local handle',
          text:
            'Several manufacturers now ship consumer units where each breaker can be tripped or set by an app. The toggle on the breaker is still the means of isolation under Section 537 — the app is a secondary function. See our [smart distribution board / IoT consumer unit guide](/guides/smart-distribution-board-iot-consumer-unit) for the full A4:2026 compliance framework.',
        },
      ],
    },
    {
      id: 'in-app-tools',
      heading: 'Using Elec-Mate for Section 537 Verification',
      tocLabel: 'Elec-Mate tools',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Section 537 checks are part of every EIC, Minor Works Certificate and EICR issued under BS 7671:2018+A4:2026. The Elec-Mate certificate suite includes schedules that map directly to the Section 537 device requirements, so the inspector doesn\'t have to remember every clause — the form prompts for the verification that matters.',
        },
        {
          type: 'list',
          tone: 'success',
          items: [
            'EICR includes the Section 642 / 651 inspection schedule with prompts for isolators, emergency switches, maintenance switches and functional switching, mapped to A4:2026 clauses.',
            'EIC schedule of inspections includes Section 537 device-selection checks at initial verification, with A4:2026 prompts for EV charge points, battery storage and smart isolators.',
            'Minor Works Certificate captures the local isolation point used for the work — tied to EAWR 1989 Regulation 13 and BS 7671 Section 537.2.',
            'The site safety RAMS generator references Section 537 isolation requirements in the safe system of work, integrated with the safe isolation method statement and permit to work modules.',
          ],
        },
        {
          type: 'callout',
          tone: 'pricing',
          title: 'Included on the Electrician tier',
          text:
            'All the certificate tools (EIC, EICR, Minor Works, Solar PV, EV Charging) and the RAMS generator are included on the Elec-Mate Electrician subscription. The Section 537 / A4:2026 inspection prompts come with every certificate from day one. 7-day free trial, cancel anytime.',
        },
      ],
    },
  ],
  howToHeading: 'How to Apply Section 537 on Site under A4:2026',
  howToDescription:
    'A practical six-step sequence the electrician follows on every job from quote to certification — selecting the right isolator, mounting it correctly, securing it, verifying it during initial verification, and recording it on the certificate.',
  howToSteps: [
    {
      name: 'Identify which switching functions the device must perform',
      text:
        'Decide which of the four Section 537 functions the device must satisfy: isolation (537.2), mechanical maintenance switching (537.3.2), emergency switching (537.3.3), or functional switching (537.4). One device can cover more than one function only if it meets the most demanding requirement.',
    },
    {
      name: 'Select a device that meets the relevant product standard',
      text:
        'For isolation choose a switch-disconnector to BS EN 60947-3 or a CB to BS EN 60898 / 60947-2 marked suitable for isolation. For emergency switching pick a device with single-action operation, red-on-yellow where reasonably practicable. Semiconductors are functional-only.',
    },
    {
      name: 'Mount the device for accessibility and identifiability',
      text:
        'Emergency switches within easy reach at the point of danger. Isolators accessible to operators and inspectors. Label every device clearly and permanently with the circuit or equipment controlled — and ensure the label matches reality.',
    },
    {
      name: 'Provide securing means for isolation and maintenance switching',
      text:
        'Fit a lock-off device to CBs used for isolation. Specify padlockable rotaries for sub-main and equipment isolators. Use a captive removable handle where padlocking is impractical. A paper label is not securing.',
    },
    {
      name: 'Verify the device during initial verification under Section 642',
      text:
        'Check: correct selection, correct rating, securable open, identifiable, visible contact position, accessibility. For emergency switches additionally verify positioning at the point of danger and single-action operation. Record on the EIC schedule of inspections.',
    },
    {
      name: 'Record Section 537 compliance on the certificate',
      text:
        'On the EIC, complete the schedule noting "Isolation and Switching" per Section 537 / A4:2026. On the EICR, capture departures as C1, C2 or C3 with reference to the specific clause. On a Minor Works certificate, record the local point of isolation used.',
    },
  ],
  faqs: [
    {
      question: 'What\'s the difference between an isolator and a switch?',
      answer:
        'An isolator (a disconnector under Section 537.2) provides a defined contact gap, a visible or reliably-indicated contact position, and a means of being secured open. A switch may simply break load current with no guaranteed contact gap or securing facility. A switch-disconnector combines both functions and is the default on most installations.',
    },
    {
      question: 'Can a circuit-breaker be used as an isolator?',
      answer:
        'Yes, where the circuit-breaker is marked suitable for isolation under its product standard (BS EN 60898 for MCBs, BS EN 60947-2 for MCCBs). Virtually all UK-market circuit-breakers for fixed installations meet this. A lock-off device must be fitted before the breaker is relied on for Section 537.2.4 securing — the toggle alone is not sufficient.',
    },
    {
      question: 'Does the means of isolation have to disconnect the neutral?',
      answer:
        'It depends on the earthing system. In TT and IT systems, yes. In TN-S where Section 537.2.2 requires it. In TN-C and TN-C-S (PNB) the PEN conductor must not be disconnected. A4:2026 reinforces this for the new PNB earthing arrangement clauses.',
    },
    {
      question: 'Is a smart isolator or app-controlled breaker compliant under A4:2026?',
      answer:
        'Yes, where it meets the relevant product standard and a local manual means of isolation is available at the point of work. A4:2026 recognises remote and smart switching but is explicit that software alone is not a means of isolation under Section 537.2. The toggle on the breaker remains the isolation device; the app is a functional convenience.',
    },
    {
      question: 'What\'s changed for EV chargers under Section 537 in A4:2026?',
      answer:
        'A4:2026 brings EV charge points into Section 537 explicitly via the updated Section 722. Every EV charge point needs a means of isolation operable by user, installer and emergency responder. Integral DC fault current protection inside the EVSE does not satisfy Section 537 isolation — a separate means is required. For TN-C-S (PNB) supplies the means of isolation must not break the PEN.',
    },
    {
      question: 'Do battery storage systems need separate AC and DC isolators?',
      answer:
        'Yes. A4:2026 requires both a DC isolator between battery and inverter and a separate AC isolator between inverter and consumer unit. Both must be Section 537-compliant switch-disconnectors, both securable open, and labelling must make clear both must be opened to fully isolate the system. Opening only the AC isolator leaves the DC side live.',
    },
    {
      question: 'Where does the firefighter\'s rooftop solar isolator come from?',
      answer:
        'It originates from HSE HSG 261 guidance and the fire services\' practical needs, and has been part of Section 712 since solar PV became common. A4:2026 aligns the language with Section 537 so the rooftop DC isolator (or equivalent module-level rapid shutdown) sits in the same device-selection framework as any other isolator. Accessible at low level, securable open, clearly labelled.',
    },
    {
      question: 'What is a Code C2 EICR finding for Section 537?',
      answer:
        'Common Code C2 findings: a functional switch (e.g. plate switch) relied on as the means of isolation; a circuit-breaker without a lock-off fitted being relied on for isolation; an emergency stop positioned where the operator cannot reach it without passing through the danger zone; or labelling that does not match the circuit actually controlled. C2 is "potentially dangerous" and requires remedial action.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/bs-7671-a4-2026-summary',
      title: 'BS 7671 Amendment 4 (2026) — Full Summary',
      description: 'The complete A4:2026 change list — AFDDs, TN-C-S (PNB), Section 537, Section 722 EV charging, Section 712 PV, new schedule columns.',
      icon: 'BookOpen',
      category: 'Guide',
    },
    {
      href: '/guides/method-statement-safe-isolation',
      title: 'Method Statement — Safe Isolation',
      description: 'The six-step lock-off and prove-dead procedure that turns a Section 537 isolator into actual safe isolation under EAWR 1989 Regulation 13.',
      icon: 'ClipboardCheck',
      category: 'Guide',
    },
    {
      href: '/guides/permit-to-work-electrical-isolation',
      title: 'Permit to Work — Electrical Isolation',
      description: 'When a permit is required in addition to a RAMS and a Section 537 isolator, and the named-person / named-circuit format.',
      icon: 'FileText',
      category: 'Guide',
    },
    {
      href: '/guides/lockout-tagout-loto-electricians',
      title: 'Lockout / Tagout (LOTO) for Electricians',
      description: 'How to satisfy Section 537.2.4 "securable open" in practice — padlocks, hasps, captive handles, group lock boxes.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/guides/section-722-ev-charging-a4-2026-changes',
      title: 'Section 722 EV Charging — A4:2026 Changes',
      description: 'The full A4:2026 update for EV charge points — integral DC protection, PNB earthing arrangements, and Section 537 isolation requirements.',
      icon: 'Zap',
      category: 'Guide',
    },
    {
      href: '/guides/smart-distribution-board-iot-consumer-unit',
      title: 'Smart Distribution Board / IoT Consumer Unit',
      description: 'How A4:2026 treats smart consumer units and app-controlled breakers under Section 537 — what counts as isolation and what doesn\'t.',
      icon: 'Gauge',
      category: 'Guide',
    },
  ],
  ctaHeading: 'Apply Section 537 correctly on every certificate',
  ctaSubheading:
    'The Elec-Mate EIC, EICR and Minor Works tools include Section 537 / A4:2026 inspection prompts built into every schedule — isolators, emergency switches, EV charger isolation, battery DC isolation and solar PV DC isolation verified, labelled and recorded the way the inspector expects. 7-day free trial on the Electrician tier, cancel anytime.',
};
