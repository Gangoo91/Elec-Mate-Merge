import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Grounded in BS 7671:2018+A4:2026 (18th Edition), IET Guidance Note 3
// (Inspection & Testing, 9th Edition), the IET On-Site Guide, plus the
// Electricity at Work Regulations 1989 and HSE guidance HSR25 / GS38.

const published = '2026-05-17';
const modified = '2026-05-18';

export const methodStatementFaultFindingConfig: GeneratedGuideConfig = {
  pagePath: '/guides/method-statement-fault-finding',
  title:
    'Method Statement for Electrical Fault Finding — UK',
  description:
    'Method statement for electrical fault finding in the UK: hazard identification, systematic diagnostic procedure, dead vs live testing decision…',
  datePublished: published,
  dateModified: modified,
  readingTime: 12,
  badge: 'Method Statement',
  badgeIcon: 'ClipboardCheck',
  breadcrumbLabel: 'Fault Finding Method Statement',
  heroPrefix: 'Method Statement for',
  heroHighlight: 'Electrical Fault Finding',
  heroSuffix: '— UK Procedure',
  heroSubtitle:
    'A working method statement for diagnosing electrical faults in occupied and operational UK installations. Covers the systematic dead-first diagnostic sequence, the narrow EAWR 1989 Regulation 14 justification for any live testing that follows, GS38-compliant instruments, PPE, documentation duties and the EICR observation outcomes (C1 / C2 / FI) that a fault-finding visit can generate.',
  keyTakeaways: [
    'Fault finding is high-risk because the defect mode is unknown at the start, so the method statement must assume the worst-case hazard until ruled out by inspection and test.',
    'The default sequence is dead: gather symptoms, visually inspect, isolate, prove dead, then carry out continuity and insulation resistance tests under safe isolation before any live work is considered.',
    'Live testing (voltage, Zs, RCD operating times, prospective fault current) is only justified under the Electricity at Work Regulations 1989 Regulation 14 "three-test" principle when the result genuinely cannot be obtained dead and the work is reasonable in the circumstances.',
    'All test instruments and probes must be GS38-compliant, in date for calibration and confirmed working using a known live source or proving unit before and after each test sequence.',
    'Working in occupied premises requires customer/tenant briefing, isolation planning that respects the occupier (lighting, heating, medical equipment, refrigeration) and a method for managing intermittent or repeat-visit faults.',
    'Findings that reveal a live defect (broken CPC, lethal voltage on metalwork, exposed conductors) escalate to an EICR C1 or C2 with immediate make-safe action — fault finding does not pause for paperwork when danger is present.',
  ],
  sections: [
    {
      id: 'scope-and-risk',
      heading: 'Scope of Work and Fault-Finding-Specific Risks',
      tocLabel: 'Scope and risks',
      blocks: [
        {
          type: 'paragraph',
          text:
            'This method statement covers diagnostic fault-finding work on UK fixed electrical installations — domestic, commercial and light industrial — up to 1000 V AC. It applies to circuits supplied from a TN-S, TN-C-S (PNB) or TT system. It does not cover utility-side faults, HV work, or work on equipment where the manufacturer mandates a specific procedure.',
        },
        {
          type: 'paragraph',
          text:
            'Fault finding carries a different risk profile to a planned installation or a routine EICR. Five hazards dominate the method statement:',
        },
        {
          type: 'list',
          tone: 'warning',
          items: [
            'Unknown defect mode — the operative arrives without knowing whether the fault is a loose connection, a damaged cable, a failed protective device, a borrowed neutral or an exposed live conductor. The plan must assume the most dangerous credible cause first.',
            'Testing partially-live installations — diagnosing whether a defect is dead or live often requires the supply to remain on for the initial symptom check, increasing exposure to live parts before any isolation can be performed.',
            'Working in occupied premises — customers, tenants, staff, children and pets may be in the area; loss of power affects heating, lighting, fridges, medical equipment, fire alarm panels, cash tills and ICT systems.',
            'Intermittent faults — symptoms may not be reproducible on the visit. Operatives may be tempted to leave the circuit live "to see if it recurs", which conflicts with EAWR 1989 unless properly justified.',
            'Repeat testing under stress — multiple cycles of isolate, test, re-energise, retest increase the risk of an isolation step being missed. Each cycle must be treated as a fresh isolation per the [safe isolation procedure](/guides/method-statement-safe-isolation).',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'When fault finding becomes an EICR',
          text:
            'If a fault-finding visit uncovers a defect that meets BS 7671 / IET GN3 criteria for [C1 (Danger Present)](/guides/eicr-code-c1-danger-present), or one that cannot be diagnosed without further inspection ([FI](/guides/eicr-code-fi-further-investigation)), the operative records the observation, makes safe, and escalates — even if no formal EICR was scoped.',
        },
      ],
    },
    {
      id: 'legal-framework',
      heading: 'Legal and Standards Framework',
      tocLabel: 'Legal framework',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Fault finding sits inside a tight set of UK legal and standards obligations. The method statement must reference all of them so that any live diagnostic step has a documented justification.',
        },
        {
          type: 'list',
          items: [
            'Electricity at Work Regulations 1989 (EAWR) — Regulation 13 requires precautions for work on dead conductors. Regulation 14 sets the three-test for live work: it must be unreasonable to work dead, reasonable in all the circumstances to work live, and suitable precautions taken to prevent injury.',
            'BS 7671:2018+A4:2026 — Part 6 (Inspection and Testing) sets the technical content of any test sequence: continuity of protective conductors, ring final circuit continuity, insulation resistance, polarity, earth fault loop impedance (Zs) and RCD operating times.',
            'IET Guidance Note 3 (Inspection & Testing, 9th Edition) — provides the methodology for sequence, test instrument selection, acceptance criteria and observation coding.',
            'IET On-Site Guide — practical fault-finding hints, test sequence flowcharts and worked examples for the domestic and small commercial scope this method statement covers.',
            'HSE HSR25 — official guidance on memorandum-of-application of EAWR 1989, including the Regulation 14 justification chain.',
            'HSE GS38 — test probes, leads and accessories for use by electrically competent persons. Mandatory specification for all instruments used during fault diagnosis.',
            'Health and Safety at Work etc. Act 1974 — overarching duty to ensure, so far as is reasonably practicable, the health and safety of employees and others affected by the work.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'EAWR 1989 Regulation 14 is not a free pass',
          text:
            'Live working for fault diagnosis is permitted only where the diagnostic value cannot be obtained dead. Loop impedance (Zs) and RCD operating-time tests inherently require live conditions. A continuity or insulation resistance test does not — those are always carried out under safe isolation.',
        },
      ],
    },
    {
      id: 'competence-ppe',
      heading: 'Competence, PPE and Equipment',
      tocLabel: 'Competence, PPE, kit',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Fault finding shall only be carried out by an electrically competent person — typically a qualified electrician with current C&G 2391 (or equivalent) Inspection and Testing experience, registered with a Part P scheme provider (NICEIC, NAPIT, ELECSA, SELECT or equivalent). A second competent person is required where the assessed risk warrants it.',
        },
        {
          type: 'list',
          tone: 'success',
          items: [
            'Voltage indicator — two-pole, fused, GS38-compliant, used with a proving unit (or known live source) immediately before and after each isolation, per the [safe isolation procedure](/guides/method-statement-safe-isolation).',
            'Multifunction tester (MFT) — in calibration (annually), with current test certificate available on request. Covers continuity, insulation resistance (250 V / 500 V / 1000 V), Zs, PFC and RCD operating time.',
            'Insulated tools rated to at least 1000 V (BS EN 60900), in good condition, free of cracked or contaminated handles.',
            'Insulated gloves rated and tested (where live work is justified), arc-rated face shield, flame-retardant clothing where assessed risk warrants.',
            'Personal protective insulating mat where live work is unavoidable on a panel mounted at floor level.',
            'Lock-off devices (one per padlock, padlocks unique to the operative), warning labels, "do not switch on" notices.',
            'Torch (head torch preferred for hands-free work), thermal imaging camera where loose-connection / overheating faults are suspected.',
            'Calibrated digital meter for current and voltage measurement under live conditions where the MFT cannot provide the reading.',
          ],
        },
      ],
    },
    {
      id: 'systematic-procedure',
      heading: 'Systematic Fault-Finding Procedure',
      tocLabel: 'Systematic procedure',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The method follows the IET GN3 / On-Site Guide diagnostic order: information, inspection, isolation, dead testing, then — only where justified — live testing. Working through this sequence in order minimises the time spent in proximity to live parts.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Gather symptoms from the duty holder / occupier — when the fault appeared, what was happening at the time, what has been switched, whether the RCD/MCB tripped or the circuit just stopped working, whether the fault is intermittent.',
            'Review available documentation — previous EICR, last EIC or Minor Works for the affected circuit, schedule of test results, any known modifications. An old [EICR observation](/guides/eicr-code-c1-danger-present) often points straight at the defect.',
            'Conduct a non-intrusive visual inspection of the consumer unit, accessible accessories on the affected circuit and any visible cable runs. Look for: discolouration, scorch marks, melted plastic, water staining, rodent damage, missing covers, exposed conductors, evidence of DIY work.',
            'Plan isolation — identify the correct point of isolation, agree with the occupier what circuits will be affected and for how long, and assess any safety-critical loads (fire alarms, medical equipment, ICT, refrigeration). Issue advance notice where reasonably practicable.',
            'Isolate at the lowest practicable level (single MCB, RCBO, or whole circuit) and prove dead following the full [safe isolation sequence](/guides/method-statement-safe-isolation): test voltage indicator on known live, test point of work, test voltage indicator on known live again. Lock off and label.',
            'Conduct dead tests in the BS 7671 / GN3 order: (a) continuity of protective conductors (R1 + R2 or R2), (b) ring final circuit end-to-end continuity if applicable, (c) insulation resistance line-to-line, line-to-neutral, lines-to-earth at 500 V DC (250 V where electronics are present), (d) polarity. Record every reading.',
            'Compare readings against design data and previous certificate values. Anomalies (an R2 that has doubled, an IR that has dropped from >299 MΩ to 0.2 MΩ) localise the fault.',
            'If the fault is now diagnosed dead, restore as much of the installation as can safely be energised, complete the make-good work under safe isolation, and re-test.',
            'If — and only if — the fault cannot be diagnosed dead, document the EAWR 1989 Regulation 14 justification, brief the second person where required, energise the supply under controlled conditions and carry out live tests: voltage, prospective fault current, earth fault loop impedance, RCD operating times.',
            'Capture all readings, photographs of the defect, and the diagnosis on the digital report. Issue a remedial quote or, where the work has been completed during the visit, issue a Minor Works Certificate or EIC for the new/altered circuit.',
          ],
        },
      ],
    },
    {
      id: 'live-testing-justification',
      heading: 'When Fault Finding Requires Live Work',
      tocLabel: 'Live testing rules',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Some diagnostic results — earth fault loop impedance (Zs), prospective fault current (PFC), RCD operating times under in-service conditions, supply voltage measurement at the point of utilisation — can only be obtained with the circuit energised. EAWR 1989 Regulation 14 accepts this in principle, but every live test must be justified, recorded and time-boxed.',
        },
        {
          type: 'list',
          items: [
            'Justification must be specific to the test — "I need a live Zs reading to compare against the design value to confirm the protective device will operate in disconnection time." Not generic.',
            'Live work is carried out by a competent person, with a second competent person where the assessed risk warrants (working inside an energised distribution board, working above 230 V, working where contact with live parts is reasonably foreseeable).',
            'GS38 probes only — finger barriers, exposed metal limited to specification, fused leads to limit prospective fault current at the probes.',
            'Personal protective equipment (PPE) selected for the assessed arc flash and shock risk — minimum: insulated gloves (tested in date), face shield, FR clothing on enclosed equipment.',
            'No live work where the test result is non-essential or could be obtained from a stored value (e.g. PFC from utility data, Zs from a maximum permitted value table when only confirming compliance not diagnosing fault).',
            'See the dedicated [live working method statement](/guides/method-statement-live-working) and [working-near-live-mains hazard control](/guides/working-near-live-mains-hazard-control) for the controls that apply to the live portion of the visit.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Intermittent faults are not justification for leaving live',
          text:
            'A fault that has not recurred during the visit is an FI ([Further Investigation](/guides/eicr-code-fi-further-investigation)) outcome — not a reason to leave the circuit energised and unmonitored. Where the fault cannot be reproduced, document the symptoms, recommend a return visit with data-logging, and isolate the circuit if the diagnosed risk is high.',
        },
      ],
    },
    {
      id: 'occupied-premises',
      heading: 'Working in Occupied Premises',
      tocLabel: 'Occupied premises',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Almost all UK domestic and small commercial fault finding happens with the occupier present. The method statement must address occupier safety, business continuity and consent to isolate.',
        },
        {
          type: 'list',
          items: [
            'Brief the occupier on arrival — what the diagnostic process will involve, expected duration, which parts of the installation will be without power and for roughly how long.',
            'Identify safety-critical loads before isolating — telecare alarms, oxygen concentrators, refrigerated medication, fire alarm panels in HMOs, emergency lighting, cash tills, ICT servers. Plan around them or warn before interruption.',
            'Where children, vulnerable adults or animals are present, set a physical barrier around the workspace (consumer unit, accessory being worked on) — fault finding often involves leaving covers off temporarily.',
            'Do not leave the supply restored to a known defective circuit while leaving the property unattended. If the diagnosis is incomplete at the end of the visit, isolate and lock off the affected circuit and brief the occupier.',
            'Photograph any [C1 condition](/guides/eicr-code-c1-danger-present) or [C2 condition](/guides/eicr-code-c2-potentially-dangerous) before make-safe work, then again after, and retain the photographs against the report record.',
          ],
        },
      ],
    },
    {
      id: 'documentation',
      heading: 'Documentation and EICR Outcomes',
      tocLabel: 'Documentation',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A fault-finding visit produces one or more of: a Minor Works Certificate (where a defect is repaired during the visit), an Electrical Installation Certificate (where a circuit has been replaced), an EICR observation (where the wider installation has been assessed) or an FI flag (where the diagnosis is incomplete). Whichever the outcome, the operative records the diagnostic findings against the customer record.',
        },
        {
          type: 'list',
          tone: 'success',
          items: [
            'Every test reading captured at the point it was taken — not reconstructed from memory at the van. Digital tools (such as Elec-Mate) tie readings to the circuit, board and timestamp automatically.',
            'Photographs of the defect before and after remedial work, geo-tagged where possible, retained against the job.',
            'Customer brief — written record of what was diagnosed, what was repaired, what remains outstanding, and any recommendation for a return visit.',
            'Where a [C1](/guides/eicr-code-c1-danger-present) condition is found and made safe under isolation rather than repaired in full, the record includes the make-safe action, the time it was performed, who was notified, and the recommended follow-up.',
            'Where an [FI](/guides/eicr-code-fi-further-investigation) outcome is recorded, the record includes what investigation would resolve the uncertainty (data-logging, withdrawal of equipment for bench test, dismantling of fitting).',
            'Minor Works Certificate or EIC issued for any new or altered circuit before the operative leaves site — not at the end of the week.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Make-safe always beats a perfect record',
          text:
            'If a hazard is present and the choice is between completing paperwork to perfection or making safe immediately, make safe first. The paperwork can be finalised in the van. The danger cannot wait.',
        },
      ],
    },
  ],
  howToSteps: [
    {
      name: 'Plan and brief',
      text:
        'Receive the symptom report, review previous certificates, identify safety-critical loads in the property and agree the diagnostic window with the occupier. Confirm the second-person requirement based on the assessed risk.',
    },
    {
      name: 'Inspect non-intrusively',
      text:
        'Walk the affected circuit, the consumer unit and any accessible accessories looking for visible defects — discolouration, scorch marks, exposed conductors, water ingress, DIY interventions — before opening any enclosure.',
    },
    {
      name: 'Isolate and prove dead',
      text:
        'Identify the correct point of isolation, switch off, lock off, label, and prove dead with a GS38-compliant voltage indicator tested on a known live source immediately before and after the test at the point of work.',
    },
    {
      name: 'Carry out dead tests',
      text:
        'Run the BS 7671 dead test sequence in order: continuity of protective conductors, ring final continuity (where applicable), insulation resistance at the appropriate test voltage, polarity. Record each reading against the circuit.',
    },
    {
      name: 'Live test where justified',
      text:
        'Document the EAWR 1989 Regulation 14 justification, brief the second person, energise under controlled conditions and carry out only the live tests that cannot be obtained dead — typically Zs, PFC and RCD operating times.',
    },
    {
      name: 'Make safe, record and certify',
      text:
        'Make the defect safe — repair where possible, isolate and lock off where not — capture all readings and photographs against the job, issue the appropriate certificate (Minor Works / EIC) or EICR observation code, and brief the occupier on outstanding work.',
    },
  ],
  howToHeading: 'How to work through a fault-finding visit',
  howToDescription:
    'A six-step working sequence aligned to IET GN3, the On-Site Guide and EAWR 1989. Use this as the checklist on the day and the audit trail afterwards.',
  faqs: [
    {
      question: 'Do I need a written method statement for every fault-finding visit?',
      answer:
        'For routine domestic fault diagnosis on a single circuit, a generic fault-finding method statement plus a site-specific risk assessment is usually sufficient. For commercial or industrial work, for any fault-finding inside an energised distribution board, or where a second person is required, a site-specific method statement should be produced. Elec-Mate\'s RAMS Generator produces both from the job details.',
    },
    {
      question: 'Can I work live to find a fault?',
      answer:
        'Only where the diagnostic value cannot be obtained dead and the work passes the Electricity at Work Regulations 1989 Regulation 14 three-test: unreasonable to work dead, reasonable to work live in all the circumstances, suitable precautions in place. Loop impedance, RCD operating times and supply voltage at the point of utilisation typically pass; continuity and insulation resistance never do — those are always carried out under safe isolation.',
    },
    {
      question: 'What test instruments do I need?',
      answer:
        'A two-pole GS38-compliant voltage indicator with proving unit, a multifunction tester (MFT) in calibration covering continuity, insulation resistance (250 V / 500 V / 1000 V), earth fault loop impedance, prospective fault current and RCD operating times, plus insulated tools rated to at least 1000 V (BS EN 60900). All probes, leads and accessories must meet HSE GS38.',
    },
    {
      question: 'How do I handle an intermittent fault that does not recur during my visit?',
      answer:
        'Document the symptoms reported by the occupier, carry out the full dead test sequence to rule out anything you can detect, and record the outcome as Further Investigation (FI) if the fault could not be reproduced. Recommend a return visit with data-logging or — where the diagnosed risk is high — isolate and lock off the affected circuit until the investigation can be completed.',
    },
    {
      question: 'What do I do if I find a C1 danger during fault finding?',
      answer:
        'Make safe immediately. The hierarchy is: repair where the defect can be eliminated during the visit; isolate and lock off where it cannot. Record the C1 observation against the installation, photograph the defect before and after make-safe, notify the duty holder (occupier, landlord, employer) in writing, and follow up with a remedial quote within 24 hours. The visit does not finish until the danger is removed.',
    },
    {
      question: 'Does fault finding need to be recorded on an EICR?',
      answer:
        'Not necessarily — fault finding is a diagnostic activity, not a periodic inspection. But where the visit uncovers defects that would attract a C1, C2 or FI under EICR coding, the operative records those observations against the installation and notifies the duty holder. Where the wider installation has not been scoped, recommend a full EICR rather than expand the visit beyond its agreed remit.',
    },
    {
      question: 'Can the apprentice or trainee carry out fault finding?',
      answer:
        'An apprentice or trainee can assist a qualified, competent person, but must not carry out fault diagnosis unsupervised — the unknown defect mode and the potential for live testing put the work outside the scope of supervised installation tasks. Live testing in particular requires a fully competent person with current Inspection and Testing qualification and, where the assessed risk warrants, a second competent person.',
    },
  ],
  faqHeading: 'Frequently asked questions',
  relatedPages: [
    {
      href: '/tools/rams-generator',
      title: 'RAMS Generator',
      description: 'Generate a site-specific risk assessment and method statement for any electrical job — fault finding, EICR, install, rewire — in minutes.',
      icon: 'FileText',
      category: 'Tool',
    },
    {
      href: '/guides/method-statement-safe-isolation',
      title: 'Method Statement — Safe Isolation',
      description: 'The full safe-isolation procedure that every fault-finding visit relies on before any dead testing begins.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/guides/method-statement-live-working',
      title: 'Method Statement — Live Working',
      description: 'EAWR 1989 Regulation 14 justification chain and controls for the live portion of any fault-finding visit.',
      icon: 'Zap',
      category: 'Guide',
    },
    {
      href: '/guides/eicr-code-c1-danger-present',
      title: 'EICR Code C1 — Danger Present',
      description: 'What to do when a fault-finding visit uncovers a defect that meets the C1 immediate-remedial threshold.',
      icon: 'AlertTriangle',
      category: 'Guide',
    },
    {
      href: '/guides/eicr-code-fi-further-investigation',
      title: 'EICR Code FI — Further Investigation',
      description: 'When an intermittent or unreproducible fault should be recorded as FI rather than left undiagnosed.',
      icon: 'Search',
      category: 'Guide',
    },
    {
      href: '/guides/rams-for-eicr-inspection',
      title: 'RAMS for EICR Inspection',
      description: 'How a periodic EICR risk assessment overlaps with — and differs from — a fault-finding RAMS.',
      icon: 'ClipboardCheck',
      category: 'Guide',
    },
    {
      href: '/guides/working-near-live-mains-hazard-control',
      title: 'Working Near Live Mains — Hazard Control',
      description: 'PPE, barriers and second-person controls for the live diagnostic portion of a fault-finding visit.',
      icon: 'AlertTriangle',
      category: 'Guide',
    },
    {
      href: '/guides/electrical-rams-template-uk',
      title: 'Electrical RAMS Template (UK)',
      description: 'Editable starting point for a written RAMS package — risk assessment, method statement, signing record.',
      icon: 'FileText',
      category: 'Guide',
    },
  ],
  ctaHeading: 'Generate a fault-finding RAMS in minutes',
  ctaSubheading:
    'Elec-Mate\'s RAMS Generator produces a job-specific risk assessment and method statement for fault-finding visits, with EAWR 1989, BS 7671:2018+A4:2026 and GS38 referenced automatically. Pair it with the digital EICR tool to capture observations on the spot. 7-day free trial, cancel anytime.',
};
