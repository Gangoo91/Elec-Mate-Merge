import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Grounded in BS 7671:2018+A4:2026 (18th Edition), IET Guidance Note 3
// (Inspection & Testing, 9th Edition), the IET On-Site Guide, plus the
// Electricity at Work Regulations 1989 and HSE guidance HSR25.

const published = '2026-05-17';
const modified = '2026-05-17';

export const lockoutTagoutForElectriciansConfig: GeneratedGuideConfig = {
  pagePath: '/guides/lockout-tagout-loto-electricians',
  title: 'Lockout Tagout (LOTO) for Electricians — UK Procedure | Elec-Mate',
  description:
    'Lockout tagout (LOTO) for electricians explained: the seven-step procedure, padlocks and hasps, MCB lock-off devices, group lockout, lock removal rules, and how LOTO ties into Permit to Work and RAMS. Aligned to EAWR 1989, HSE HSR25 and BS 7671:2018+A4:2026.',
  datePublished: published,
  dateModified: modified,
  readingTime: 12,
  badge: 'Health & Safety Guide',
  badgeIcon: 'ShieldCheck',
  breadcrumbLabel: 'LOTO for Electricians',
  heroPrefix: 'Lockout Tagout (LOTO) for',
  heroHighlight: 'Electricians',
  heroSuffix: '— UK Procedure',
  heroSubtitle:
    'Lockout tagout (LOTO) is how UK electricians stop isolated circuits being re-energised while work is in progress. The technique originated in US OSHA practice but is now standard on every industrial, commercial and multi-contractor site in Britain. This guide covers the seven-step LOTO procedure, the kit you need, group lockout for multiple electricians, lock removal rules, and how LOTO sits alongside Permit to Work and RAMS under the Electricity at Work Regulations 1989.',
  keyTakeaways: [
    'LOTO is the control of hazardous energy — physically locking an isolation point so the supply cannot be restored while work is in progress, and tagging it so everyone on site knows why.',
    'In the UK, LOTO is the practical way of meeting Regulations 12, 13 and 14 of the Electricity at Work Regulations 1989 and is supported by HSE guidance HSR25 (Memorandum of guidance on the EAWR 1989) and HSG85.',
    'LOTO is not the same as simply turning the breaker off. A switch-off can be reversed by anyone walking past the board. A padlock applied by the named electrician cannot.',
    'Where more than one electrician works on the same isolated circuit, each person fits their own padlock to a multi-lock hasp — group lockout. The supply cannot be restored until the last lock is removed.',
    'Only the person who applied a lock may remove it. An absent worker\'s lock may only be removed under a written, documented lost-key / lock-removal procedure authorised by the duty holder.',
    'LOTO integrates with Permit to Work and the project RAMS — the PTW records the isolation, the RAMS records the method, and the lock physically enforces both.',
    'BS 7671:2018+A4:2026 Part 6 (Inspection and Testing) requires that an installation is isolated before dead testing. LOTO is the means by which that isolation is made safe to work behind.',
  ],
  sections: [
    {
      id: 'what-is-loto',
      heading: 'What LOTO Is — and Where It Came From',
      tocLabel: 'What LOTO is',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Lockout tagout — usually abbreviated to LOTO — is a structured method for controlling hazardous energy. In an electrical context that means stopping a circuit, panel, motor, or piece of plant from being re-energised while an electrician is working on it. The "lockout" is a physical padlock or device that holds the isolator in the off position. The "tagout" is a written tag identifying who applied the lock, when, and why.',
        },
        {
          type: 'paragraph',
          text:
            'LOTO originated as a formal discipline in the United States under OSHA Standard 29 CFR 1910.147 ("Control of Hazardous Energy"). It is not a US-only practice. UK industry — particularly manufacturing, food and beverage, pharma, data centres, hospitals, and any multi-contractor commercial site — adopted LOTO decades ago as the practical way of complying with the Electricity at Work Regulations 1989 and the wider duty of care under the Health and Safety at Work etc. Act 1974.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'LOTO is the UK\'s working answer to EAWR Reg 13',
          text:
            'Regulation 13 of the EAWR 1989 requires that "adequate precautions shall be taken to prevent electrical equipment, which has been made dead in order to prevent danger while work is carried out on or near that equipment, from becoming electrically charged during that work." A padlock through a locked-off isolator, with a tag on it, is the adequate precaution that satisfies that duty in almost every electrical job.',
        },
        {
          type: 'paragraph',
          text:
            'LOTO is referenced throughout HSE guidance HSR25 (Memorandum of guidance on the EAWR 1989) and HSG85 (Electricity at Work — Safe Working Practices), and it sits alongside the safe isolation sequence taught in the IET On-Site Guide. The lock is what makes the isolation enforceable.',
        },
      ],
    },
    {
      id: 'loto-vs-turning-off',
      heading: 'LOTO vs Simply Turning Off',
      tocLabel: 'LOTO vs turning off',
      blocks: [
        {
          type: 'paragraph',
          text:
            'It is a common shortcut to flick a breaker off, prove dead, and start work. On a domestic call-out where the electrician is the only person in the property and has the consumer unit in line of sight, the risk of someone restoring the supply is low. On any site bigger than that, an unlocked switch is a hazard waiting to happen — a cleaner, a tenant, a labourer, or another contractor may switch it back on without realising.',
        },
        {
          type: 'list',
          tone: 'warning',
          items: [
            'A breaker switched off but not locked can be returned to service by anyone with access to the board — including people who have no idea anyone is working on the circuit.',
            'On commercial and industrial sites, restoration of supply during work has caused fatal accidents. HSE prosecution case law repeatedly cites failure to lock off as the proximate cause.',
            'Tags alone — without a physical lock — are not LOTO. A tag is a warning; a lock is a control. UK best practice is "lock first, tag second".',
            'A withdrawn fuse "in your pocket" is acceptable only where the device cannot accept a lock and the fuse cannot be replaced from another stock — and it should be documented in the method statement, not assumed.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'See the dedicated guide on the full UK ' +
            '[safe isolation method statement](/guides/method-statement-safe-isolation) for the documented sequence that accompanies a LOTO application.',
        },
      ],
    },
    {
      id: 'loto-kit',
      heading: 'LOTO Equipment — What You Need',
      tocLabel: 'LOTO kit',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A working LOTO kit is small, cheap, and lives in every electrician\'s van. The standard build is:',
        },
        {
          type: 'list',
          items: [
            'Personal padlocks — preferably individually-keyed (each electrician has their own unique key). Coloured, non-conductive shackles are common. Master Lock, ABUS and Brady are the usual brands. One worker, one lock, one key.',
            'Lockout hasps (multi-lock hasps) — a metal hasp with multiple holes that accepts several padlocks at once. Used for group lockout where more than one electrician is behind the same isolation.',
            'MCB lock-off devices — snap-on clips that clamp a miniature circuit breaker in the off position and accept a padlock shackle. Different profiles exist for different MCB families; carry a small assortment.',
            'Isolator lock-off devices — for rotary isolators, fused spurs, isolator switches and disconnectors. The handle is held in the off position by the lockout device and secured with a padlock.',
            'Plug lockouts — enclose a 13A or industrial (BS EN 60309) plug so it cannot be re-inserted. Useful for portable equipment isolation.',
            'Fuse lockout boxes — retain a withdrawn fuse inside a lockable box so it cannot be re-fitted. Used where isolation is by fuse withdrawal.',
            'Valve and pipe lockouts — relevant where the electrical job touches mechanical services (chiller, fuel oil pump, cooling water for a substation), and the safe system of work locks off mechanical energy too.',
            'Tags — write the electrician\'s name, the date, the reason for isolation, and a return-to-service signature line. Pre-printed danger tags speed this up.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Individually-keyed beats master-keyed for personal locks',
          text:
            'Personal lockout padlocks should be individually-keyed — only the electrician who applied the lock can open it. Master-keyed sets (where a supervisor key opens every lock) defeat the safety purpose, because they let someone other than the named worker remove the lock. Reserve master-keyed sets for facilities-managed lockout stations, not for personal locks.',
        },
      ],
    },
    {
      id: 'seven-step-procedure',
      heading: 'The Seven-Step LOTO Procedure',
      tocLabel: 'Seven-step procedure',
      blocks: [
        {
          type: 'paragraph',
          text:
            'UK industry has converged on a seven-step LOTO procedure that maps neatly onto the safe isolation sequence in the IET On-Site Guide and HSG85. The steps are sequential — skipping or re-ordering them defeats the safety case.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Preparation — review the job pack, the RAMS, and any existing Permit to Work. Identify every source of supply (mains, sub-board, UPS, generator, solar PV, battery, parallel feeds). Confirm the correct isolation point on drawings and on the board schedule.',
            'Notify — tell the responsible person, the site manager, the duty holder, and anyone affected by the loss of supply that you are about to isolate. On commercial sites this is usually a written notice or a permit-to-work step.',
            'Shutdown — bring the equipment to a controlled stop in the normal way. Do not just trip the breaker on running equipment if a controlled shutdown is available. Soft-stop the motor, allow VSDs to ramp down, close down processes.',
            'Isolate — operate the means of isolation: switch off the MCB, withdraw the fuse, open the isolator. The isolation point must be capable of being locked in the off position. Confirm visually that the device is in the off position.',
            'Lock and tag — apply your personal padlock (and, for multi-worker jobs, a multi-lock hasp first, then everyone\'s padlocks). Attach a tag identifying the electrician, the date, the work being carried out, and the expected return-to-service date.',
            'Verify (prove dead) — using a GS38-compliant approved voltage indicator (AVI), prove the indicator on a known live source, test at the point of work between every conductor pair (L-E, L-N, N-E for single phase; all combinations for three-phase), then prove the indicator on the known live source again. This is the "prove-test-prove" sequence.',
            'Work — only now is it safe to start. Keep the key on your person for the entire duration of the work. Do not hand it to anyone. If you leave site, your lock stays on.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'The full prove-test-prove sequence with conductor combinations and AVI selection is covered separately in the ' +
            '[safe isolation method statement](/guides/method-statement-safe-isolation) — that guide and this one are designed to be used together.',
        },
      ],
    },
    {
      id: 'group-lockout',
      heading: 'One-Person Lock vs Group Lockout',
      tocLabel: 'Group lockout',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A single electrician working on a single isolation needs one padlock. The moment a second person works behind the same isolation, the rules change.',
        },
        {
          type: 'list',
          items: [
            'One-person lock — the electrician applies their personal padlock directly to the isolation point. They prove dead, work, and remove the lock when finished. Tag includes name, date, reason. This is the most common case.',
            'Group lockout — for two or more electricians (or trades) behind the same isolation, fit a multi-lock hasp to the isolation point first. Each worker then applies their own personal padlock to the hasp. The hasp cannot close, and therefore the isolation cannot be released, until every worker has removed their own lock.',
            'Lockout box — for complex isolations with many isolation points (a large industrial panel, a substation, a process plant feed), the keys to all the isolation padlocks go into a single group lockout box. Each worker then locks the box with their personal padlock. The box only opens — releasing the isolation keys — when all personal locks are off.',
          ],
        },
        {
          type: 'callout',
          tone: 'success',
          title: 'No personal lock = no entry behind the isolation',
          text:
            'The core rule of group lockout is simple: if you are working on or near the isolated equipment, your padlock must be on the hasp or group box. No exceptions for "I\'ll only be five minutes." If your lock is not on, you are not behind the isolation, and you should not be touching the equipment.',
        },
        {
          type: 'paragraph',
          text:
            'Group lockout is also where LOTO meets the ' +
            '[Permit to Work for electrical isolation](/guides/permit-to-work-electrical-isolation) — the PTW names each worker, the RAMS describes the method, and the locks physically enforce both.',
        },
      ],
    },
    {
      id: 'lock-removal',
      heading: 'Removing the Lock — Who, When, and Lost-Key Procedure',
      tocLabel: 'Lock removal',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The rule on lock removal is non-negotiable: only the person who applied a lock may remove it. That rule protects every worker behind the isolation. If anyone else could remove your lock, your safety is at the mercy of someone else\'s judgement.',
        },
        {
          type: 'list',
          items: [
            'When work is complete, the electrician confirms tools and personnel are clear of the equipment, removes their tag, removes their padlock, and confirms to the responsible person that the isolation point is released.',
            'For group lockout, each worker independently removes their own lock when their part of the work is complete. The isolation is only physically released when the last person removes the last lock.',
            'A return-to-service signature on the tag — or on the accompanying PTW — confirms that the worker has finished, the equipment is reassembled, and the supply can safely be restored.',
            'Re-energisation should follow a controlled sequence: visual check of the equipment, confirmation that all guards/covers are refitted, all workers clear, then the responsible person restores supply and tests for correct operation.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lost-key / absent worker lock removal — strictly procedural',
          text:
            'If an electrician has left site with their key, or lost the key, the lock cannot just be cut off. A documented lost-key procedure applies: (1) confirm in writing that the named worker is not behind the isolation, (2) attempt to contact them, (3) inspect the equipment to confirm it is safe to release, (4) cut the lock under supervision of the duty holder, (5) record the incident on the PTW and the project H&S log. Never cut off a colleague\'s lock as a casual workaround.',
        },
      ],
    },
    {
      id: 'integration-ptw-rams',
      heading: 'Integration With PTW and RAMS',
      tocLabel: 'PTW and RAMS',
      blocks: [
        {
          type: 'paragraph',
          text:
            'LOTO does not sit on its own. On any significant site it is one of three layers — the Permit to Work, the Risk Assessment and Method Statement, and the lock itself. Each layer reinforces the others.',
        },
        {
          type: 'list',
          items: [
            'Permit to Work (PTW) — a written authorisation that the isolation has been carried out, tested dead, and is safe to work behind. The PTW names the authorising person, the workers covered, and the duration. LOTO is the physical enforcement of the PTW. See the ' +
              '[Permit to Work for electrical isolation guide](/guides/permit-to-work-electrical-isolation) for the full document workflow.',
            'Risk Assessment and Method Statement (RAMS) — the project-specific record of how the work will be done safely, what hazards exist, and what controls are in place. The RAMS references the LOTO procedure as one of the controls for the electrical-energy hazard. Generate a site-specific RAMS in minutes with the ' +
              '[Elec-Mate RAMS Generator](/tools/rams-generator) or start from an ' +
              '[Electrical RAMS template](/guides/electrical-rams-template-uk).',
            'CDM 2015 — on notifiable construction projects, the LOTO procedure is part of the safe system of work that the principal contractor coordinates. See the ' +
              '[CDM 2015 for electricians guide](/guides/cdm-2015-for-electricians) for the wider obligations.',
            'Specific RAMS examples — common jobs like a ' +
              '[consumer unit replacement RAMS](/guides/rams-for-consumer-unit-replacement) all rely on LOTO as the primary control for electrical energy.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'Where the work has to be carried out live — which should always be a last resort — a different framework applies entirely. The ' +
            '[live working method statement](/guides/method-statement-live-working) and the ' +
            '[working near live mains hazard control](/guides/working-near-live-mains-hazard-control) guides set out what is required under Regulation 14 of the EAWR 1989. LOTO is the alternative you choose against; live work is the alternative you choose only when LOTO is genuinely impossible.',
        },
        {
          type: 'paragraph',
          text:
            'BS 7671:2018+A4:2026 Part 6 (Inspection and Testing) requires that an installation is isolated before dead testing is carried out. The lock is what keeps it isolated while you test — without it, someone restoring the supply mid-test exposes you to live conductors at the test points.',
        },
      ],
    },
  ],
  howToHeading: 'How to apply LOTO on a typical electrical job',
  howToDescription:
    'A condensed walkthrough of the LOTO procedure for an electrician approaching a circuit that needs to be made dead before work begins. Read this alongside the seven-step procedure above.',
  howToSteps: [
    {
      name: 'Prepare and identify every source of supply',
      text:
        'Review the RAMS, the PTW (if one applies), and the board schedule. Identify the correct isolation point. Check for parallel feeds, UPS, solar PV, battery storage, and any sub-distribution that could re-energise the circuit independently. Note every isolation point that needs locking.',
    },
    {
      name: 'Notify and shut down in a controlled way',
      text:
        'Tell the duty holder and anyone who will lose supply. Carry out a controlled shutdown — soft-stop motors, allow VSDs to ramp down, close processes cleanly. Do not just trip the breaker on running equipment.',
    },
    {
      name: 'Isolate and apply the lock',
      text:
        'Operate the isolator, MCB, or fuse. Confirm visually that it is in the off position. Fit the appropriate lockout device (MCB clip, isolator lock-off, hasp). Apply your personal padlock. Attach a tag with your name, the date, the reason, and the expected return-to-service signature line.',
    },
    {
      name: 'Group lockout if more than one worker',
      text:
        'If anyone else will work behind the same isolation, fit a multi-lock hasp first and have every worker apply their own personal padlock. For complex isolations with many points, use a group lockout box and have all keys inside it.',
    },
    {
      name: 'Prove dead — prove-test-prove with a GS38 AVI',
      text:
        'Prove your approved voltage indicator on a known live source. Test at the point of work between every conductor combination. Prove the AVI on the known live source again. All conductor tests must read zero. If any do not, stop and investigate before going further.',
    },
    {
      name: 'Work, and keep the key on you',
      text:
        'Only now is it safe to begin. Keep your padlock key on your person throughout. If you leave site, your lock stays on. When you return, your lock is still in place. When the work is complete, remove your tag, remove your lock, and sign off the PTW.',
    },
  ],
  faqs: [
    {
      question: 'Is LOTO a legal requirement in the UK?',
      answer:
        'There is no UK regulation that literally says "you must apply a lockout padlock." But the Electricity at Work Regulations 1989 — specifically Regulations 12 ("Means for cutting off the supply and for isolation"), 13 ("Precautions for work on equipment made dead") and 14 ("Work on or near live conductors") — together require that dead equipment is prevented from being re-energised while work is in progress. LOTO is the practical, industry-standard way of meeting Reg 13. HSE guidance HSR25 and HSG85 both describe LOTO-style controls as the expected approach. In a prosecution, "we turned the breaker off and hoped" would not satisfy a court that adequate precautions were taken.',
    },
    {
      question: 'Can I use one padlock between two electricians on the same job?',
      answer:
        'No. The core principle of LOTO is one worker, one lock, one key. If you and a colleague share a lock, neither of you independently controls your own safety — your colleague could remove the lock without you knowing. For two or more electricians behind the same isolation, fit a multi-lock hasp and each person applies their own personal padlock. The supply cannot be restored until the last lock is removed.',
    },
    {
      question: 'My job is in a domestic property — do I really need LOTO?',
      answer:
        'For most domestic call-outs, a properly applied MCB lock-off clip plus your personal padlock is the right level of control — and it takes about thirty seconds to fit. If the consumer unit is in line of sight, you are the only person in the property, and you have already informed the occupier, the risk of someone restoring the supply is genuinely low. But "I\'ll be quick" is not a method statement. The cost of a personal padlock plus a set of MCB clips is small, and the rule is the same regardless of the size of the site: lock what you isolate.',
    },
    {
      question: 'Who removes the lock if the electrician who applied it has gone home?',
      answer:
        'Nobody removes it casually. A documented lost-key / absent worker lock removal procedure applies: (1) the duty holder confirms in writing that the named worker is not behind the isolation, (2) reasonable attempts are made to contact them, (3) the equipment is inspected to confirm it is safe to release, (4) the lock is cut off under supervision, and (5) the incident is logged on the PTW and the project health and safety records. The replacement worker — usually the duty holder or an authorised person — then signs off the release of isolation. Cutting off a colleague\'s lock without that procedure is a serious breach.',
    },
    {
      question: 'What is the difference between a lockout tag and a lock?',
      answer:
        'A tag is a written warning that identifies who has isolated the equipment, when, and why. A lock is a physical control that prevents the isolation device being operated. Tags on their own are not LOTO — they can be removed by anyone and the isolation point can be operated. UK best practice is "lock first, tag second": the lock provides the safety, the tag provides the information. Tag-only isolation is acceptable only where the isolation point physically cannot accept a lock, and even then additional precautions (such as a continuous attendant) are usually required.',
    },
    {
      question: 'How does LOTO relate to BS 7671 inspection and testing?',
      answer:
        'BS 7671:2018+A4:2026 Part 6 (Inspection and Testing) requires installations to be isolated before dead tests (insulation resistance, continuity, earth fault loop impedance with the supply disconnected). LOTO is the means by which that isolation is held in place while testing is carried out. Without a lock, anyone restoring the supply mid-test exposes the tester to live conductors at the test points. The IET Guidance Note 3 (Inspection and Testing) and the IET On-Site Guide both describe safe isolation with locking as the precondition for dead testing.',
    },
    {
      question: 'How does LOTO fit with my RAMS and Permit to Work?',
      answer:
        'The three documents enforce each other. The PTW formally authorises the isolation and lists who is covered. The RAMS describes how the work will be done safely and names LOTO as a control for the electrical-energy hazard. The lock physically holds the isolation in place. On any commercial or industrial site you will be expected to produce all three. Generate a site-specific RAMS in minutes with the Elec-Mate RAMS Generator — it cites the EAWR 1989, references the LOTO procedure, and produces a ready-to-share PDF for the client and the principal contractor.',
    },
  ],
  faqHeading: 'Lockout Tagout for Electricians — FAQs',
  relatedPages: [
    {
      href: '/tools/rams-generator',
      title: 'RAMS Generator',
      description:
        'Generate site-specific risk assessments and method statements that name LOTO as the electrical-energy control. Ready to share in minutes.',
      icon: 'FileCheck2',
      category: 'Tool',
    },
    {
      href: '/guides/method-statement-safe-isolation',
      title: 'Safe Isolation Method Statement',
      description:
        'The documented safe isolation sequence — prove-test-prove with a GS38 AVI — that accompanies every LOTO application.',
      icon: 'ClipboardCheck',
      category: 'Guide',
    },
    {
      href: '/guides/permit-to-work-electrical-isolation',
      title: 'Permit to Work — Electrical Isolation',
      description:
        'The written authorisation that LOTO physically enforces. PTW structure, authorising person, cancellation and reinstatement.',
      icon: 'FileText',
      category: 'Guide',
    },
    {
      href: '/guides/method-statement-live-working',
      title: 'Live Working Method Statement',
      description:
        'When LOTO is genuinely impossible — EAWR Reg 14 live working, last-resort controls, insulated tools and PPE.',
      icon: 'AlertTriangle',
      category: 'Guide',
    },
    {
      href: '/guides/electrical-rams-template-uk',
      title: 'Electrical RAMS Template (UK)',
      description:
        'A reusable UK electrical RAMS template that cites EAWR 1989, BS 7671 and HSG85 — drop your LOTO procedure in and go.',
      icon: 'FileCheck2',
      category: 'Guide',
    },
    {
      href: '/guides/rams-for-consumer-unit-replacement',
      title: 'RAMS for Consumer Unit Replacement',
      description:
        'Site-specific RAMS example for a CU change, with LOTO at the meter tails or at the cut-out fuse withdrawal point.',
      icon: 'ClipboardCheck',
      category: 'Guide',
    },
    {
      href: '/guides/cdm-2015-for-electricians',
      title: 'CDM 2015 for Electricians',
      description:
        'How the Construction (Design and Management) Regulations 2015 wrap around LOTO, PTW and RAMS on notifiable projects.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/guides/working-near-live-mains-hazard-control',
      title: 'Working Near Live Mains — Hazard Control',
      description:
        'Where full isolation is not possible — controls, barriers, distance, PPE and competent-person requirements.',
      icon: 'AlertTriangle',
      category: 'Guide',
    },
  ],
  ctaHeading: 'Lock off, prove dead, and document it properly',
  ctaSubheading:
    'The Elec-Mate RAMS Generator produces site-specific risk assessments and method statements that cite the EAWR 1989, name LOTO as the electrical-energy control, and pair with your Permit to Work. Built for UK electricians, ready to share with clients in minutes. Start a 7-day free trial — cancel anytime.',
};
