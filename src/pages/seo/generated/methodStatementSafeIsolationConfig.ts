import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Grounded in BS 7671:2018+A4:2026 (18th Edition), IET Guidance Note 3
// (Inspection & Testing, 9th Edition), the IET On-Site Guide, plus the
// Electricity at Work Regulations 1989 and HSE guidance GS38 / HSR25.

const published = '2026-05-17';
const modified = '2026-05-18';

export const methodStatementSafeIsolationConfig: GeneratedGuideConfig = {
  pagePath: '/guides/method-statement-safe-isolation',
  title:
    'Method Statement for Safe Isolation — UK Electrical',
  description:
    'The full UK method statement for safe isolation of electrical circuits — 10-step procedure, GS38-compliant voltage indicators, lock-off and tagging…',
  datePublished: published,
  dateModified: modified,
  readingTime: 13,
  badge: 'Method Statement',
  badgeIcon: 'ShieldCheck',
  breadcrumbLabel: 'Safe Isolation Method Statement',
  heroPrefix: 'Method Statement for',
  heroHighlight: 'Safe Isolation',
  heroSuffix: '— UK Electrical Procedure',
  heroSubtitle:
    'Safe isolation is the single most important procedure a UK electrician carries out. It is the foundation that every other task — testing, fault-finding, alteration, EICR remedial — depends on. This method statement sets out the full 10-step procedure, the test equipment required, the legal duties under the Electricity at Work Regulations 1989, and the common mistakes that cost electricians their lives every year.',
  keyTakeaways: [
    'Safe isolation is required by Regulation 14 of the Electricity at Work Regulations 1989 — live working is permitted only where it is unreasonable for the work to be carried out dead AND suitable precautions are taken.',
    'The standard UK procedure has 10 sequential steps. Each step is mandatory and the order matters — proving the tester on a known live source before AND after the dead test is what distinguishes a genuine safe isolation from a fatal assumption.',
    'Voltage indicators must comply with HSE Guidance Note GS38 — fused, finger-guarded, insulated probes with no more than 4 mm of exposed tip. Non-contact "voltage sticks" are NOT acceptable as a stand-alone proving device.',
    'Lock-off is required wherever the isolation point can be re-energised by someone other than the person doing the work. A padlock with a personal hasp and a written warning notice is the legal minimum on shared premises and construction sites.',
    'Test at every conductor — line-to-line (where applicable), line-to-neutral, line-to-earth, and neutral-to-earth. Single-pole testing alone is insufficient and a known cause of fatal incidents.',
    'A written method statement is part of the RAMS package required under CDM 2015, and is good practice on any commercial or rented installation. It demonstrates the competent person discharged their duty under EAWR Reg 4.',
  ],
  sections: [
    {
      id: 'why-it-matters',
      heading: 'Why Safe Isolation Is the Foundation Procedure',
      tocLabel: 'Why it matters',
      blocks: [
        {
          type: 'paragraph',
          text: 'Every other electrical procedure — inspection, testing, alteration, fault diagnosis, accessory replacement, consumer unit change — assumes that the part of the installation being worked on is dead. If the isolation has not been carried out and proved correctly, every assumption that follows is unsound and the electrician is at risk of electric shock, burns, arc-flash or death.',
        },
        {
          type: 'paragraph',
          text: 'The legal duty is set out in [Regulation 14 of the Electricity at Work Regulations 1989](/guides/electrical-rams-template-uk). No person shall be engaged in any work activity on or near any live conductor (other than one suitably covered with insulating material) unless it is unreasonable in all the circumstances for it to be dead, AND it is reasonable in all the circumstances for the person to be at work on or near it while it is live, AND suitable precautions are taken. In practice, this means working dead is the default — and safe isolation is the procedure that gets you there.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'HSE position: testing dead is testing live',
          text: 'HSE guidance HSR25 (the Memorandum of Guidance on the Electricity at Work Regulations 1989) makes it clear that "testing to confirm that a conductor is dead" counts as work on or near live conductors until the test is complete. The act of proving dead is itself live work — which is why a GS38-compliant test instrument and the proving sequence below are non-negotiable.',
        },
      ],
    },
    {
      id: 'equipment',
      heading: 'Required Equipment Before You Start',
      tocLabel: 'Equipment',
      blocks: [
        {
          type: 'paragraph',
          text: 'The method statement assumes the electrician arrives on site with the right kit. Before the procedure begins, the following items must be present and tested:',
        },
        {
          type: 'list',
          items: [
            'A two-pole voltage indicator (often referred to as a "VI" or "voltage detector") that complies with HSE Guidance Note GS38. The tester itself, leads and probes must be CAT III or CAT IV rated for the system voltage, fused, with finger guards and a maximum of 4 mm of exposed metal at the probe tips.',
            'A proving unit (or a known live source) that can confirm the voltage indicator is functioning before and after the dead test. A purpose-made proving unit is preferable because it removes the need to handle live terminals at the consumer unit twice.',
            'Suitable lock-off kit — padlocks (one per person working), MCB lock-off devices, an isolator hasp where multiple people work on the same isolation, and a personal lock that only the electrician holds the key to.',
            'Warning notices / tags — "Caution: Electrician at Work — Do Not Switch On" or equivalent — that travel with the lock-off device.',
            'Suitable PPE — Class 0 insulated gloves where the working voltage and the risk assessment require them, eye protection for arc-flash exposure, and appropriate footwear.',
            'A Permit to Work or a documented isolation record on installations where the duty holder requires one (HV, industrial, construction sites under CDM, healthcare). See the [Permit to Work guide](/guides/permit-to-work-electrical-isolation) for when this is required.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Why non-contact testers are not enough',
          text: 'Non-contact "voltage sticks" detect the AC electric field around an energised conductor. They are useful as a first-pass check, but they cannot prove dead. They will give a false reading on a broken neutral, a parallel feed, a borrowed neutral, or a circuit at a residual voltage from capacitance. HSE GS38 and every reputable training body require a two-pole voltage indicator for the dead test — the voltage stick is supplementary, not a substitute.',
        },
      ],
    },
    {
      id: 'the-10-steps',
      heading: 'The 10-Step Safe Isolation Procedure',
      tocLabel: 'The 10 steps',
      blocks: [
        {
          type: 'paragraph',
          text: 'The standard UK procedure — taught by City & Guilds, EAL, JIB and every awarding body — has ten sequential steps. The order matters. Skipping or re-ordering any step removes the assurance that the circuit is genuinely dead.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Identify the circuit or item of equipment to be isolated. Confirm against the distribution-board schedule, the existing installation drawings and the client / responsible person. Where the labelling is suspect, trace the circuit physically before assuming.',
            'Locate the means of isolation. For a final circuit, this is normally the MCB / RCBO on the consumer unit. For a complete installation, it is the main switch. For a sub-main, it is the upstream protective device. The means of isolation must be capable of being locked off.',
            'Verify the voltage indicator on a known live source or proving unit. The tester must give the expected reading on every range used. If the tester fails the pre-test, stop — do not proceed with a faulty instrument.',
            'Disconnect — switch the protective device to the OFF position, or rack the breaker out where applicable. For a main switch, ensure all phases and the switched neutral (where present) are opened.',
            'Lock off the means of isolation. Fit a lock-off device to the breaker / switch and secure with a personal padlock. Where multiple operatives are working under the same isolation, fit a multi-hasp and each operative fits their own lock. Attach the warning notice / tag.',
            'Test the isolated circuit at every conductor at the point of work. For a single-phase final circuit, test line-to-neutral, line-to-earth, and neutral-to-earth. For three-phase, test L1-L2, L2-L3, L1-L3, each line-to-neutral, each line-to-earth, and neutral-to-earth. The indicator must read zero (or below the residual threshold) for every combination.',
            'Re-verify the voltage indicator on the known live source or proving unit. This confirms the tester was still functioning correctly when the dead test was performed — without this step, a "dead" reading could be the result of a broken tester rather than a dead circuit.',
            'Place warning notices at the means of isolation AND at the point of work. The notices must identify what is isolated, who isolated it, the date and time, and a contact number for the operative.',
            'Test for absence of voltage at the actual work point one last time, immediately before starting work. The work point may be metres or even floors away from the means of isolation; the final test confirms nothing has changed in between.',
            'Carry out the planned work. On completion, reverse the procedure in a controlled way — remove tools and test equipment, re-make connections, re-fit covers, remove warning notices, remove the lock, and energise. Carry out the appropriate post-work testing (insulation resistance, polarity, earth fault loop impedance, RCD operation) before returning the circuit to service.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'The "prove-test-prove" sequence is the safety',
          text: 'Steps 3, 6 and 7 together form what trainers call the "prove-test-prove" sequence. If any of these are skipped, the procedure collapses. A tester that develops a fault between step 3 and step 6 will read zero on a live circuit; the re-prove at step 7 is the only way to catch this. Do not shortcut.',
        },
      ],
    },
    {
      id: 'lock-off-and-tagging',
      heading: 'Lock-Off, Tagging and Multi-Person Work',
      tocLabel: 'Lock-off & tagging',
      blocks: [
        {
          type: 'paragraph',
          text: 'Where the means of isolation could be operated by someone other than the electrician carrying out the work, lock-off is mandatory. This includes virtually every commercial premises, shared domestic accommodation (HMOs, flats with a communal intake), construction sites, schools, healthcare premises and industrial installations.',
        },
        {
          type: 'list',
          items: [
            'Use a lock-off device that is mechanically suited to the protective device — MCB clips, RCBO clips, isolator hasps for switch-disconnectors, fuse carrier locks for BS 88 / HBC fuses.',
            'Each person working under the isolation fits their own personal padlock. The isolation is only removed when the last lock is removed.',
            'The key for each personal padlock stays with the operative. Master keys defeat the entire purpose of personal lock-off.',
            'The warning tag must be legible, weather-proof, and include: what is isolated, the date and time of isolation, the operative\'s name, and a contact number.',
            'On larger projects, the isolation is recorded in an Isolation Register or against a Permit to Work — see the [Permit to Work guide](/guides/permit-to-work-electrical-isolation) and the [Lockout / Tagout (LOTO) guide](/guides/lockout-tagout-loto-electricians) for the wider system.',
          ],
        },
      ],
    },
    {
      id: 'common-mistakes',
      heading: 'Common Mistakes That Cause Fatal Incidents',
      tocLabel: 'Common mistakes',
      blocks: [
        {
          type: 'paragraph',
          text: 'HSE incident data, Electrical Safety First reports and JIB safety bulletins repeatedly identify the same failure modes. Almost every fatal electrician shock in the UK over the last decade involves one or more of the following:',
        },
        {
          type: 'list',
          tone: 'warning',
          items: [
            'Skipping the "prove" step on the voltage indicator — testing the circuit, finding it reads zero, and assuming the tester is good. A failed tester reads zero on a live conductor.',
            'Relying on a non-contact voltage detector alone. They cannot detect a borrowed neutral, a parallel feed, or a low residual voltage — all of which can kill.',
            'Isolating the wrong way at the consumer unit. Mis-labelled boards are extremely common; the only safety is to trace and prove, not to read the label.',
            'Failing to lock off on shared premises. A cleaner, tenant or colleague switching the breaker back on while the electrician\'s hands are on bare conductors is a documented cause of fatalities.',
            'Testing line-to-neutral only and not line-to-earth or neutral-to-earth. A broken or borrowed neutral leaves the neutral conductor at supply potential — the L-N test reads zero, the L-E test reveals the danger.',
            'Working on a "dead" circuit immediately after isolation without re-testing at the actual point of work. Time and physical distance between the means of isolation and the work point mean conditions can change.',
            'Removing the warning notice or lock before all operatives have confirmed they are clear. Re-energisation while someone is still in contact with conductors has caused multiple recorded deaths.',
          ],
        },
      ],
    },
    {
      id: 'legal-and-rams-context',
      heading: 'Legal Context, RAMS and Documentation',
      tocLabel: 'Legal & RAMS',
      blocks: [
        {
          type: 'paragraph',
          text: 'Safe isolation is not just good practice — it is a legal obligation. The relevant framework in Great Britain is:',
        },
        {
          type: 'list',
          items: [
            'Electricity at Work Regulations 1989, Regulation 4 — all systems shall be constructed, maintained and worked on so as to prevent danger so far as is reasonably practicable. Documented safe isolation is a primary means of discharging this duty.',
            'Electricity at Work Regulations 1989, Regulation 14 — live working is permitted only where it is unreasonable to work dead, suitable precautions are taken, and the operative is competent. The presumption is always "work dead".',
            'Health and Safety at Work etc. Act 1974, Section 2 / Section 3 — employers must ensure the health and safety of employees and persons not in their employment so far as is reasonably practicable.',
            'CDM Regulations 2015 — on construction projects, the principal contractor must ensure safe systems of work are documented in a method statement and risk assessment (RAMS) before work begins. Safe isolation is normally a named procedure in the RAMS pack.',
            'BS 7671:2018+A4:2026, Chapter 13 (Fundamental Principles) and Part 6 (Inspection, Testing and Reporting) — installation and testing work shall be carried out so as not to cause danger to persons, livestock or property.',
            'HSE Guidance Note GS38 — sets out the specification for test instruments, leads and probes used to verify isolation. Non-compliant test gear is a notifiable breach.',
            'HSE HSR25 — the official Memorandum of Guidance on EAWR 1989, including detailed commentary on Reg 14 and the duty to work dead.',
          ],
        },
        {
          type: 'paragraph',
          text: 'For documented method statements, the safe-isolation procedure normally sits inside a wider Risk Assessment and Method Statement (RAMS) document. Generic templates are a starting point — but for genuine compliance the RAMS must be specific to the site, the installation and the task. The [Elec-Mate RAMS Generator](/tools/rams-generator) produces site-specific RAMS that include the full 10-step safe isolation procedure, the test equipment list and the relevant regulation references. For a sample, see the [Electrical RAMS template guide](/guides/electrical-rams-template-uk).',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'When you do have to work live',
          text: 'Live working remains exceptional under EAWR Reg 14, but it is legally permitted in narrow circumstances — fault-finding on energised systems is the classic example. Where live work is unavoidable, a separate live-working method statement is required, with documented justification, additional PPE and an additional competent person. See the [live working method statement guide](/guides/method-statement-live-working) and the [working near live mains hazard control guide](/guides/working-near-live-mains-hazard-control).',
        },
      ],
    },
    {
      id: 'task-specific-applications',
      heading: 'Applying Safe Isolation to Common Tasks',
      tocLabel: 'Common applications',
      blocks: [
        {
          type: 'paragraph',
          text: 'The 10-step procedure is universal, but the practical application changes depending on the task. The following are common UK examples:',
        },
        {
          type: 'list',
          items: [
            'EICR inspection — periodic inspection involves isolating each final circuit in turn for insulation resistance testing. The RAMS for an EICR must include the safe isolation procedure for every circuit being tested; see the [RAMS for EICR inspection guide](/guides/rams-for-eicr-inspection).',
            'Consumer unit replacement — the whole installation is isolated at the supply head (cut-out fuse) or at the meter tail isolator if fitted. Where there is no isolator, the DNO must be involved to pull the cut-out fuse. See the [RAMS for consumer unit replacement guide](/guides/rams-for-consumer-unit-replacement).',
            'Accessory replacement (sockets, switches, light fittings) — the single final circuit is isolated at the consumer unit, with lock-off if anyone else has access to the board.',
            'Sub-main alteration — the upstream protective device on the main board is isolated and locked off; the operative must verify the sub-main is dead at the downstream board AS WELL AS at the isolation point.',
            'Industrial control gear / DOL starters — isolate at the local isolator, lock off, test all phases and the neutral, AND discharge any capacitors before working on the control circuit.',
            'Three-phase intake / HV work — these tasks require an additional permit-to-work system and are outside the scope of a domestic-installer method statement; a competent HV authorised person is required.',
          ],
        },
      ],
    },
  ],
  howToHeading: 'Step-by-step: the 10-step safe isolation procedure',
  howToDescription:
    'The condensed step-by-step that mirrors the standard UK procedure. Use this as the on-site checklist — the full method statement above gives the rationale for each step.',
  howToSteps: [
    {
      name: 'Identify the circuit or equipment to isolate',
      text: 'Confirm against the consumer-unit / DB schedule, the installation drawings and the responsible person. Trace physically where labelling is suspect — never rely on a label alone.',
    },
    {
      name: 'Locate the means of isolation',
      text: 'For a final circuit, this is the MCB or RCBO. For a complete installation, the main switch. For a sub-main, the upstream device. The means of isolation must be capable of being locked off.',
    },
    {
      name: 'Verify the voltage indicator on a known live source',
      text: 'Prove the two-pole, GS38-compliant tester on a proving unit or known live source. The tester must read the expected voltage on every range you will use. Stop if it fails.',
    },
    {
      name: 'Disconnect — switch the protective device OFF',
      text: 'Open the MCB / RCBO / main switch. For three-phase, ensure all phases and any switched neutral are opened.',
    },
    {
      name: 'Lock off and tag the means of isolation',
      text: 'Fit the lock-off device, fit a personal padlock, attach the warning notice with name, date, time and contact number. Where multiple operatives are working, each fits their own lock under a multi-hasp.',
    },
    {
      name: 'Test the isolated circuit at every conductor',
      text: 'At the point of work or the downstream side of the isolator, test line-to-neutral, line-to-earth, and neutral-to-earth (and all line-to-line combinations for three-phase). The reading must be effectively zero for every combination.',
    },
    {
      name: 'Re-verify the voltage indicator on the known live source',
      text: 'After the dead test, prove the tester is still functioning by re-testing on the proving unit or known live source. This catches a tester that failed between steps 3 and 6.',
    },
    {
      name: 'Place warning notices at the isolation and at the work point',
      text: 'Notices identify what is isolated, who isolated it, the date and time, and a contact number. Notices at the work point alert anyone arriving on site that work is in progress.',
    },
    {
      name: 'Test for absence of voltage at the actual work point',
      text: 'Immediately before starting work, perform one final two-pole test at the work point itself. Time and physical distance from the means of isolation mean conditions could have changed.',
    },
    {
      name: 'Carry out the work, then reverse the procedure',
      text: 'Complete the planned work. On completion, refit covers, remove tools, carry out post-work testing (IR, polarity, Zs, RCD), remove notices, remove the personal padlock, and energise in a controlled way.',
    },
  ],
  faqs: [
    {
      question: 'Is safe isolation legally required in the UK?',
      answer:
        'Yes. Regulation 14 of the Electricity at Work Regulations 1989 requires that work on or near live conductors is avoided unless it is unreasonable to work dead, suitable precautions are in place, and the operative is competent. In practice this means safe isolation is the default — working live without documented justification is a breach of EAWR and can be prosecuted by the HSE. Regulation 4 of EAWR adds the wider duty to maintain systems so as to prevent danger.',
    },
    {
      question: 'Can I use a non-contact voltage tester instead of a two-pole voltage indicator?',
      answer:
        'No — not as a stand-alone test for proving dead. Non-contact voltage detectors are useful as a first-pass check, but they cannot detect a broken neutral, a borrowed neutral, a parallel feed, or low residual voltages — all of which can kill. HSE Guidance Note GS38 and every awarding body require a two-pole voltage indicator that is fused, finger-guarded, with no more than 4 mm of exposed metal at the probe tips. The non-contact stick is supplementary, not a substitute for the proving sequence.',
    },
    {
      question: 'Why do I need to prove the tester twice?',
      answer:
        'Because a tester that develops a fault between the dead test and the work would read zero on a live circuit and you would never know. By proving the tester is working immediately before the dead test (step 3) AND immediately after (step 7), you confirm the tester was functioning correctly throughout the period when its reading mattered. Skipping the second prove removes the only safeguard against a tester failure — this is the single most common mistake in fatal-incident reports.',
    },
    {
      question: 'Do I have to lock off if I am the only person on site?',
      answer:
        'Best practice is yes, even when working alone. The risk is not just other operatives — it is anyone with access to the means of isolation: a tenant arriving home, a cleaner, a building manager, a curious child. The HSE position and every reputable training scheme require lock-off wherever the isolation point could be operated by anyone other than the electrician doing the work. For a domestic property where the homeowner is briefed and present, a warning notice and verbal agreement may be acceptable for very short tasks — but lock-off is always the safer default.',
    },
    {
      question: 'What is the difference between a method statement and a RAMS?',
      answer:
        'A method statement describes how the work will be carried out, step by step. A risk assessment identifies the hazards and the controls. RAMS (Risk Assessment and Method Statement) is the combined document. For safe isolation, the method statement is the 10-step procedure described above; the risk assessment identifies hazards such as electric shock, arc-flash, and unauthorised re-energisation, and sets the controls (GS38 test gear, lock-off, warning notices, competent person). Under CDM 2015, both documents are normally required before site work begins. The [Elec-Mate RAMS Generator](/tools/rams-generator) produces both in one document, specific to the site and the task.',
    },
    {
      question: 'Can I be prosecuted for skipping safe isolation?',
      answer:
        'Yes. HSE has prosecuted electricians and employers under the Electricity at Work Regulations 1989 and the Health and Safety at Work etc. Act 1974 for failing to isolate, failing to prove dead, using non-compliant test gear, and failing to lock off. Where the failure causes serious injury or death, individuals can face custodial sentences and unlimited fines. Beyond the legal risk, the practical risk is fatal electric shock — UK electrician fatalities almost always involve a failure of the safe isolation procedure.',
    },
    {
      question: 'How does safe isolation fit into an EICR or a consumer unit replacement?',
      answer:
        'On an EICR, every final circuit must be safely isolated before insulation resistance testing — the procedure is run for each circuit in turn. On a consumer unit replacement, the whole installation is isolated at the supply head or at a meter tail isolator (if fitted), locked off, and tested dead at the meter tails before the existing consumer unit is disconnected. Both tasks require a documented method statement; see the [RAMS for EICR inspection guide](/guides/rams-for-eicr-inspection) and the [RAMS for consumer unit replacement guide](/guides/rams-for-consumer-unit-replacement) for task-specific templates.',
    },
  ],
  relatedPages: [
    {
      href: '/tools/rams-generator',
      title: 'RAMS Generator',
      description: 'Generate site-specific RAMS that include the 10-step safe isolation procedure, GS38 equipment list and BS 7671 references in minutes.',
      icon: 'FileText',
      category: 'Tool',
    },
    {
      href: '/guides/electrical-rams-template-uk',
      title: 'Electrical RAMS Template (UK)',
      description: 'Sample RAMS document covering hazards, controls and the embedded safe-isolation method statement for typical electrical works.',
      icon: 'ClipboardCheck',
      category: 'Guide',
    },
    {
      href: '/guides/permit-to-work-electrical-isolation',
      title: 'Permit to Work for Electrical Isolation',
      description: 'When a Permit to Work is required on top of safe isolation — HV, industrial, healthcare, construction.',
      icon: 'FileCheck2',
      category: 'Guide',
    },
    {
      href: '/guides/lockout-tagout-loto-electricians',
      title: 'Lockout / Tagout (LOTO) for Electricians',
      description: 'The wider LOTO system for multi-operative isolation, personal padlocks, multi-hasps and isolation registers.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/guides/method-statement-live-working',
      title: 'Method Statement for Live Working',
      description: 'The narrow circumstances in which live working is permitted under EAWR Reg 14, and the additional method statement required.',
      icon: 'AlertTriangle',
      category: 'Guide',
    },
    {
      href: '/guides/rams-for-eicr-inspection',
      title: 'RAMS for EICR Inspection',
      description: 'Task-specific RAMS for periodic inspection — circuit-by-circuit isolation, IR testing and continuity.',
      icon: 'ClipboardCheck',
      category: 'Guide',
    },
    {
      href: '/guides/rams-for-consumer-unit-replacement',
      title: 'RAMS for Consumer Unit Replacement',
      description: 'Task-specific RAMS for a CU change — whole-installation isolation at the supply head, DNO involvement and post-work testing.',
      icon: 'Cable',
      category: 'Guide',
    },
    {
      href: '/guides/working-near-live-mains-hazard-control',
      title: 'Working Near Live Mains — Hazard Control',
      description: 'Hazard controls for unavoidable work near live conductors — barriers, screens, additional PPE and the competent person requirement.',
      icon: 'AlertTriangle',
      category: 'Guide',
    },
  ],
  ctaHeading: 'Generate site-specific RAMS with safe isolation built in',
  ctaSubheading:
    'Safe isolation is the foundation procedure every other electrical task depends on. The Elec-Mate RAMS Generator produces site-specific Risk Assessments and Method Statements with the full 10-step procedure, GS38 test equipment list, lock-off and tagging, and BS 7671:2018+A4:2026 / EAWR references — ready to issue to your client. 7-day free trial, cancel anytime.',
};
