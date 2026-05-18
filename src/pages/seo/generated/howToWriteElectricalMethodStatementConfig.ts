import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Grounded in BS 7671:2018+A4:2026 (18th Edition), IET Guidance Note 3
// (Inspection & Testing, 9th Edition), the IET On-Site Guide, plus the
// CDM 2015 statutory framework and the Electricity at Work Regulations 1989.

const published = '2026-05-17';
const modified = '2026-05-18';

export const howToWriteElectricalMethodStatementConfig: GeneratedGuideConfig = {
  pagePath: '/guides/how-to-write-electrical-method-statement',
  title:
    'How to Write an Electrical Method Statement (UK Guide)',
  description:
    'Step-by-step UK guide to writing a compliant electrical method statement: scope, hazards, control measures, sequence of operations, safe isolation, PPE…',
  datePublished: published,
  dateModified: modified,
  readingTime: 12,
  badge: 'RAMS Guide',
  badgeIcon: 'ClipboardCheck',
  breadcrumbLabel: 'How to Write a Method Statement',
  heroPrefix: 'How to Write an',
  heroHighlight: 'Electrical Method Statement',
  heroSuffix: '(UK Guide)',
  heroSubtitle:
    'A method statement is the document that turns a risk assessment into a procedure your operatives can actually follow on site. This guide walks through every required section — scope, hazards, control measures, sequence of work, safe isolation, PPE, emergencies and sign-off — using the structure UK principal contractors, clients and HSE inspectors expect to see.',
  keyTakeaways: [
    'A method statement (MS) describes the procedure your team will follow to complete electrical work safely. The risk assessment (RA) identifies the hazards; the MS describes the controls. Together they form RAMS.',
    'A compliant electrical method statement covers ten core sections: cover page, scope, references, team and roles, equipment, hazards and controls, sequence of work, emergency procedures, distribution / sign-off chain, and review history.',
    'Site-specific detail is mandatory. Generic boilerplate downloaded from the internet and reused without editing is the single biggest failure mode and the most common HSE criticism on construction sites.',
    'Safe isolation must be written as a numbered sequence — prove dead, lock off, post warning, retest on completion — referencing the GS38 voltage indicator and the lock-off device used.',
    'Sign-off chain is required: author, reviewer (usually QS or supervisor), approver (principal contractor or client representative), and a briefing record signed by every operative who will carry out the work.',
    'Under CDM 2015 Regulation 15, the principal contractor must ensure suitable site induction is provided and that safe systems of work are in place — your method statement is the primary evidence.',
  ],
  sections: [
    {
      id: 'ms-vs-ra',
      heading: 'Method Statement vs Risk Assessment — the Difference',
      tocLabel: 'MS vs RA',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The two documents are commonly bundled together as "RAMS" but they answer different questions. The risk assessment answers "what could go wrong, how badly, and how likely?" The method statement answers "given those risks, exactly how are we going to do this job safely, step by step?" HSE guidance INDG163 ("Risk assessment: A brief guide to controlling risks in the workplace") sets out the five-step process for the RA. The method statement then translates the controls identified in the RA into a written procedure.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Rule of thumb',
          text:
            'If a sentence describes a hazard or its likelihood / severity, it belongs in the risk assessment. If a sentence describes an action someone is going to take, it belongs in the method statement. Reviewers spot RAMS that mix the two and lose confidence in both.',
        },
        {
          type: 'paragraph',
          text:
            'The full pairing is covered separately in our [electrical RAMS template guide](/guides/electrical-rams-template-uk) — start there if you need a complete pack rather than just the method statement.',
        },
      ],
    },
    {
      id: 'required-sections',
      heading: 'The Ten Required Sections',
      tocLabel: 'Required sections',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A method statement that passes principal-contractor review and an HSE site visit contains the following sections, in this order. Missing any one of them is a common reason for a document to be rejected at induction.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Cover page — document title, job/site reference, site address, client name, principal contractor, your company, document version, author, date issued, review date.',
            'Scope of works — exactly what is being done, the boundary of the work (what is and is not included), location within the site, and the expected duration.',
            'References — BS 7671:2018+A4:2026, Electricity at Work Regulations 1989, CDM 2015, HSE INDG163, HSG85 (Electricity at Work — safe working practices), site-specific permit-to-work scheme, and any project-specific construction phase plan.',
            'Team and roles — every named operative, their qualification (e.g. JIB Approved Electrician, NVQ Level 3, 18th Edition, 2391), their CSCS card grade, and which task each is responsible for.',
            'Equipment and tools — every tool, instrument, test equipment, PPE, lock-off kit and access equipment that will be on site, including calibration status for test equipment.',
            'Hazards and control measures — a table mapping each hazard from the risk assessment to the specific control measure (engineering, administrative, PPE) that mitigates it.',
            'Sequence of work — the numbered, step-by-step procedure the operatives will follow. This is the heart of the method statement.',
            'Emergency procedures — what to do if someone is electrocuted, if a fire starts, if a circuit cannot be isolated, who to call, where the assembly point is.',
            'Sign-off and distribution — author signature, reviewer signature, approver signature, and a briefing record showing every operative has read and understood the document.',
            'Review history — version number, change log, next scheduled review (typically before each substantial site phase or every 12 months, whichever is sooner).',
          ],
        },
      ],
    },
    {
      id: 'scope-and-hazards',
      heading: 'Writing the Scope and Hazard Sections',
      tocLabel: 'Scope and hazards',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The scope section is where most authors are too vague. "Rewire of first floor" is not a scope — it is a project title. The scope must let an outside reviewer understand exactly what work will and will not be carried out, where, and how it interfaces with other trades.',
        },
        {
          type: 'list',
          items: [
            'Identify the work physically — circuit numbers, distribution board references, room numbers, drawing references.',
            'Define what is excluded — for example, "lighting circuit testing is excluded from this method statement and is covered under MS-2026-014".',
            'State the interface with other trades — for example, "first-fix follows joinery completion; second-fix precedes plastering".',
            'Reference the design — the circuit design pack, the load schedule, the consumer unit layout.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'The hazards section should list every electrical and non-electrical hazard the operatives will encounter and the control measure that mitigates it. The most common electrical hazards on a typical UK install include:',
        },
        {
          type: 'list',
          tone: 'warning',
          items: [
            'Contact with live conductors during isolation, testing or fault-finding — controlled by safe isolation procedure (see below).',
            'Working near concealed live cables in walls or ceilings — controlled by cable avoidance tools (CAT scanner) and isolation of the local supply.',
            'Arc flash from switching fault current — controlled by suitable PPE and the use of insulated tools rated for the system voltage.',
            'Working at height during containment install or lighting work — controlled by PASMA-trained tower use or competent ladder use under the WAH Regulations 2005.',
            'Manual handling of cable drums, switchgear, distribution boards — controlled by mechanical aids, team lifts, route planning.',
            'Dust and fumes from drilling, chasing, soldering — controlled by RPE, LEV where appropriate, and break scheduling.',
            'Slips, trips and cable management on shared site walkways — controlled by housekeeping discipline and physical cable protection.',
          ],
        },
      ],
    },
    {
      id: 'sequence-of-work',
      heading: 'Writing the Sequence of Work',
      tocLabel: 'Sequence of work',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The sequence of work is the section the operatives actually use on site. It must be numbered, sequential, unambiguous, and specific to the job. A vague sequence ("install cables, terminate, test") is unusable and will not satisfy a principal contractor.',
        },
        {
          type: 'paragraph',
          text:
            'Each step should be a single discrete action. Where a step involves isolation, the safe isolation procedure must be referenced or fully reproduced in line — see our dedicated guide on [method statements for safe isolation](/guides/method-statement-safe-isolation) for the full sequence and the GS38 / lock-off references.',
        },
        {
          type: 'callout',
          tone: 'success',
          title: 'Example sequence — partial rewire, first-floor circuits',
          text:
            'Step 1: Site induction confirmation. Step 2: Receive permit to work from principal contractor. Step 3: Safe isolation of circuits L1–L4 at the consumer unit per safe-isolation procedure. Step 4: Apply personal lock-off and post warning notice. Step 5: Verify isolation at the furthest point of each circuit using GS38-compliant voltage indicator (proven on a known supply before and after). Step 6: Remove existing accessories and cabling. Step 7: Install new cabling on designed routes. Step 8: Terminate at accessories. Step 9: Re-terminate at consumer unit. Step 10: Carry out dead testing per BS 7671 Chapter 64 (continuity, insulation resistance, polarity). Step 11: Remove lock-off, energise, carry out live testing and RCD verification. Step 12: Issue Electrical Installation Certificate.',
        },
        {
          type: 'paragraph',
          text:
            'Notice how each step is verifiable. A supervisor walking the job can tick each one off. This is what HSE inspectors and principal-contractor safety advisors look for — and it is the simplest test of whether your method statement is fit for purpose.',
        },
      ],
    },
    {
      id: 'isolation-and-ppe',
      heading: 'Safe Isolation, Lock-Off and PPE',
      tocLabel: 'Isolation and PPE',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Safe isolation is the single most important procedure in any electrical method statement and the most common reason an HSE inspector will pull a document apart. Under the Electricity at Work Regulations 1989 Regulation 14, no person shall work on or near a live conductor unless it is unreasonable in all the circumstances for the conductor to be dead. The method statement must demonstrate that the default position is to work dead.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Identify the correct point of isolation from the design / as-fitted drawings.',
            'Switch off the relevant circuit / distribution board / main switch.',
            'Lock off the isolator using a personal padlock and the appropriate lock-off device. Each operative working on the dead circuit applies their own lock.',
            'Post a warning notice stating "DANGER — DO NOT SWITCH ON — ELECTRICIANS WORKING".',
            'Prove the voltage indicator on a known live source (e.g. proving unit or live socket on an adjacent circuit).',
            'Test the conductors that should be dead — line-to-neutral, line-to-earth, neutral-to-earth, and between each phase on three-phase systems.',
            'Re-prove the voltage indicator on the known live source to confirm the instrument is still working.',
            'Begin work only once isolation is fully proven.',
            'On completion, remove personal locks (each operative removes their own) and re-energise per the agreed procedure.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'PPE matrix',
          text:
            'For every task in the sequence, the method statement should specify the minimum PPE: safety footwear (S3), Class II eye protection during cutting/drilling, FR-rated gloves for any live work explicitly authorised by permit, ear protection above 80 dB(A), RPE for dust-generating tasks, hard hat and high-visibility on shared construction sites. PPE is a last resort — the controls above it in the hierarchy must be exhausted first.',
        },
      ],
    },
    {
      id: 'emergency-signoff',
      heading: 'Emergency Procedures, Sign-Off and Distribution',
      tocLabel: 'Emergency and sign-off',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Two areas where method statements routinely fall short: emergency procedures and the sign-off chain. Both are mandatory for a CDM 2015 compliant document.',
        },
        {
          type: 'paragraph',
          text:
            'The emergency procedures section must cover at minimum:',
        },
        {
          type: 'list',
          items: [
            'Electric shock — do not touch the casualty; isolate the supply at the nearest accessible point; call 999; commence CPR if trained; notify the principal contractor and site first-aider.',
            'Fire — sound the alarm; isolate the affected circuit if safe to do so; evacuate to the muster point identified on the site plan; do not re-enter until instructed.',
            'Inability to isolate — stop work, place the area in a safe state, notify the supervisor, do not proceed until a revised method statement is issued.',
            'Site evacuation — the location of the assembly point, the route, the responsible person, the all-clear signal.',
            'Notifiable incidents — RIDDOR reporting trigger criteria, the responsible person who completes the report, the timescale.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'The sign-off chain must show three distinct roles: the author (the person who wrote the document, usually the project supervisor or competent person), the reviewer (a second competent person who has checked it — often the QS, project manager or qualified supervisor), and the approver (the principal contractor or client representative who accepts it as part of the construction phase plan). The briefing record must show every operative\'s name, signature and date — proving they have read and understood the document before starting work.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Common mistakes that get method statements rejected',
          text:
            'Generic boilerplate without site-specific detail. Missing the lock-off / prove-dead-prove-live step in safe isolation. No sign-off chain or only the author\'s signature. No briefing record. Out-of-date references (still citing BS 7671:2018+A2:2022 instead of A4:2026). Emergency procedures that reference an off-site office instead of the site assembly point. PPE listed but no hierarchy of controls. Sequence of work written as a paragraph instead of numbered steps.',
        },
      ],
    },
    {
      id: 'legal-context',
      heading: 'The Legal Framework Behind the Document',
      tocLabel: 'Legal framework',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A method statement is not a polite suggestion — it sits inside a statutory framework that imposes duties on the electrician, the employer, the principal contractor and the client.',
        },
        {
          type: 'list',
          items: [
            'Electricity at Work Regulations 1989 — places duties on employers, employees and the self-employed to ensure electrical systems are safe and used in a manner that prevents danger. Regulations 4, 13 and 14 are most directly evidenced by the method statement.',
            'Construction (Design and Management) Regulations 2015 — Regulation 15 places duties on the principal contractor to plan, manage, monitor and coordinate health and safety during the construction phase. Method statements are the primary evidence of compliance for individual work packages. See our [CDM 2015 guide for electricians](/guides/cdm-2015-for-electricians) for the full duty-holder breakdown.',
            'Health and Safety at Work etc. Act 1974 — the overarching duty under section 2 to ensure, so far as is reasonably practicable, the health, safety and welfare of employees. The method statement is how that "reasonably practicable" standard is demonstrated.',
            'Management of Health and Safety at Work Regulations 1999 — Regulation 3 requires a suitable and sufficient risk assessment; Regulation 5 requires effective arrangements for planning, organisation, control, monitoring and review. The MS evidences both.',
            'HSE INDG163 — "Risk assessment: A brief guide to controlling risks in the workplace" — sets the methodology for the supporting RA.',
            'BS 7671:2018+A4:2026 — the technical standard against which the work itself is designed, installed, inspected and tested. The method statement\'s references section must cite the current published version.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'For higher-risk activities — a live EICR inspection, lone working, or work under a permit-to-work scheme — the method statement should be paired with the appropriate task-specific document. See our guides on [RAMS for EICR inspection](/guides/rams-for-eicr-inspection), [lone working for electricians](/guides/lone-working-electricians) and the [permit to work for electrical isolation](/guides/permit-to-work-electrical-isolation).',
        },
      ],
    },
  ],
  howToHeading: 'How to write your method statement (step by step)',
  howToDescription:
    'Work through these steps the first time you author a method statement. Once you have one site-specific document on file, future versions become a matter of editing and re-issuing — not starting from scratch.',
  howToSteps: [
    {
      name: 'Define the scope',
      text:
        'Write a precise scope of works. Identify the circuits, rooms, drawings and trade interfaces. State what is excluded so reviewers know the boundary. If the scope cannot fit in two short paragraphs, split the work into multiple method statements.',
    },
    {
      name: 'Build the risk assessment first',
      text:
        'List every hazard the team will encounter, score likelihood and severity, and identify the control measure for each. The hazards and controls then feed directly into your method statement. Without the RA the MS has no foundation.',
    },
    {
      name: 'Write the sequence of work as numbered steps',
      text:
        'Translate each control measure into a discrete, verifiable action. A supervisor on site should be able to tick each step off as it is completed. Include isolation, testing, certification and re-energisation as explicit steps — not implied ones.',
    },
    {
      name: 'Insert the safe isolation procedure',
      text:
        'Either reference your standard safe-isolation procedure (with version number) or reproduce it in full. The prove-dead-prove-live step using a GS38-compliant voltage indicator must appear explicitly and personal lock-off must be stated.',
    },
    {
      name: 'Add emergency procedures and PPE',
      text:
        'List the response to electric shock, fire, inability to isolate, and site evacuation. Specify the assembly point and the responsible person. Then list the PPE required for each phase of the sequence — boots, eyes, gloves, RPE, hard hat, hi-vis.',
    },
    {
      name: 'Sign off, brief the team, distribute',
      text:
        'Author signs, competent reviewer signs, principal contractor or client representative approves. Brief every operative who will carry out the work; capture their signature on the briefing record. Distribute electronically to the site office, the operatives and the principal contractor.',
    },
  ],
  faqs: [
    {
      question: 'What is the difference between a method statement and a risk assessment?',
      answer:
        'The risk assessment identifies hazards, scores likelihood and severity, and sets out the control measures required to reduce risk to as low as reasonably practicable. The method statement describes the procedure — the step-by-step actions the operatives will follow — that puts those controls into practice. The two documents are paired together as RAMS. One without the other is incomplete.',
    },
    {
      question: 'Is an electrical method statement a legal requirement?',
      answer:
        'There is no single regulation titled "you must produce a method statement", but the requirement is created by the combination of the Health and Safety at Work etc. Act 1974, the Management of Health and Safety at Work Regulations 1999, the Electricity at Work Regulations 1989 and the Construction (Design and Management) Regulations 2015. In practice, principal contractors will not allow electrical work to start on a CDM site without an approved method statement, and HSE inspectors expect to see one for any non-trivial electrical work.',
    },
    {
      question: 'How long should an electrical method statement be?',
      answer:
        'Long enough to cover all ten required sections in site-specific detail and no longer. A typical small-works method statement (board change, EICR remedials) runs to 4–6 pages. A larger installation (commercial fit-out, distribution upgrade) can run to 12–20 pages. If your document is one page long it is too generic; if it is 40 pages long the operatives will not read it before starting work.',
    },
    {
      question: 'Can I reuse the same method statement for every job?',
      answer:
        'No. The single biggest cause of HSE criticism is generic boilerplate reused without site-specific editing. You can — and should — maintain a master template for your business that contains the standard sections, references and isolation procedure. But the scope, hazards, sequence of work, team, emergency procedures and sign-off must be tailored to each individual job, briefed, and signed off afresh. See our [electrical method statement template](/guides/electrical-method-statement-template) for the master structure.',
    },
    {
      question: 'Who has to sign off the method statement?',
      answer:
        'Three distinct roles: the author (the competent person who wrote it), a reviewer (a second competent person who has checked it for technical adequacy), and an approver (the principal contractor or client representative who accepts it as part of the construction phase plan under CDM 2015). On top of that, every operative carrying out the work must sign the briefing record to confirm they have read and understood it before starting.',
    },
    {
      question: 'How often does a method statement need to be reviewed?',
      answer:
        'Before each substantial phase of the works, when the scope or team changes, after any near-miss or incident, when a referenced standard is updated (for example the move to BS 7671:2018+A4:2026), and at least every 12 months for live documents on long-running sites. Each review should bump the version number and capture what changed in the review history section.',
    },
    {
      question: 'Can a software tool write a compliant method statement?',
      answer:
        'A good RAMS tool will produce a fully structured method statement with the ten required sections, the current BS 7671 / EAWR / CDM references and a draft sequence of work — typically in under two minutes. The competent person still has to add site-specific scope detail, brief the team and sign it off. The tool removes the typing and the formatting; it does not remove the professional responsibility for accuracy.',
    },
  ],
  relatedPages: [
    {
      href: '/tools/rams-generator',
      title: 'RAMS Generator',
      description: 'Produce a compliant method statement and risk assessment in under two minutes — fully structured, BS 7671:2018+A4:2026 referenced…',
      icon: 'FileText',
      category: 'Tool',
    },
    {
      href: '/guides/electrical-rams-template-uk',
      title: 'Electrical RAMS Template (UK)',
      description: 'The complete RAMS pack — risk assessment paired with method statement — for UK electrical work, ready to download and customise.',
      icon: 'ClipboardCheck',
      category: 'Guide',
    },
    {
      href: '/guides/electrical-method-statement-template',
      title: 'Electrical Method Statement Template',
      description: 'The master template with all ten required sections pre-built — use it as the starting point for every site-specific MS.',
      icon: 'FileCheck2',
      category: 'Guide',
    },
    {
      href: '/guides/method-statement-safe-isolation',
      title: 'Method Statement for Safe Isolation',
      description: 'The full GS38-compliant safe-isolation sequence to embed in your method statement — prove dead, lock off, retest.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/guides/cdm-2015-for-electricians',
      title: 'CDM 2015 for Electricians',
      description: 'How the Construction (Design and Management) Regulations 2015 apply to electrical contractors — duties, documents, principal contractor expectations.',
      icon: 'BookOpen',
      category: 'Guide',
    },
    {
      href: '/guides/permit-to-work-electrical-isolation',
      title: 'Permit to Work — Electrical Isolation',
      description: 'When and how to use a permit-to-work scheme alongside your method statement, particularly for higher-voltage or commercial premises.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
  ],
  ctaHeading: 'Write a compliant method statement in two minutes',
  ctaSubheading:
    'Elec-Mate\'s RAMS Generator builds a fully structured, BS 7671:2018+A4:2026 referenced method statement with sequence of work, safe isolation, PPE matrix and sign-off chain — ready to brief, sign and distribute. 7-day free trial, cancel anytime.',
};
