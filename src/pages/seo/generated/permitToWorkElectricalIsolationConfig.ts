import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Grounded in BS 7671:2018+A4:2026 (18th Edition), IET Guidance Note 3
// (Inspection & Testing, 9th Edition), the IET On-Site Guide, plus the
// Electricity at Work Regulations 1989 and HSE guidance HSR25 / HSG253.

const published = '2026-05-17';
const modified = '2026-05-18';

export const permitToWorkElectricalIsolationConfig: GeneratedGuideConfig = {
  pagePath: '/guides/permit-to-work-electrical-isolation',
  title:
    'Permit to Work for Electrical Isolation — UK Procedure',
  description:
    'Permit to Work (PTW) for electrical isolation — the UK procedure for HV work, multi-source LV isolation, and high-risk commercial / industrial supplies.',
  datePublished: published,
  dateModified: modified,
  readingTime: 12,
  badge: 'Electrical Safety Procedure',
  badgeIcon: 'ShieldCheck',
  breadcrumbLabel: 'Permit to Work — Electrical',
  heroPrefix: 'Permit to Work for',
  heroHighlight: 'Electrical Isolation',
  heroSuffix: '— UK Procedure',
  heroSubtitle:
    'A Permit to Work (PTW) is a formal written safety system used to control high-risk electrical isolation work. This guide explains when a PTW is required in the UK, the elements every permit must contain, how it sits alongside the method statement and risk assessment, and how HV and complex LV permits should be managed under EAWR 1989, HSR25 and HSG253.',
  keyTakeaways: [
    'A Permit to Work is a formal written safety system — not a form for the sake of paperwork. It controls work where the consequences of a mistake would be severe and where standard safe isolation alone is not enough.',
    'PTW is mandatory in practice for all HV work, and routinely required for LV work on industrial, commercial, healthcare and life-safety supplies — particularly where multiple isolation points, shared systems, or other trades are involved.',
    'Every PTW must define the work, the isolation points, the lock-off / tagging regime, the test instruments used, the issuer and recipient, the expiry, and the formal hand-back / return-to-service procedure.',
    'A PTW does not replace a method statement (MS), a risk assessment (RA) or safe isolation under GS38 — it sits on top of them. The RAMS describes how the work is done; the PTW authorises that this specific job can start now, on this isolation, under this issuer.',
    'For HV permits, the issuer is typically the site Authorised Person (AP) under EAWR 1989 — not the visiting electrical contractor. Visiting contractors usually become the Recipient on the permit, never the Issuer.',
    'The permit must be returned and formally cancelled before the system is re-energised. Re-energising under a live permit, or without a return-to-service test, is the most common cause of serious incidents.',
  ],
  sections: [
    {
      id: 'what-is-ptw',
      heading: 'What a Permit to Work Actually Is',
      tocLabel: 'What a PTW is',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A Permit to Work (PTW) is a formal, written authorisation that controls specific high-risk work on an electrical system. It is issued by a competent and named Issuer to a competent and named Recipient, defines exactly what work is permitted and under what conditions, identifies the points of isolation and lock-off, and is valid only for a defined period of time.',
        },
        {
          type: 'paragraph',
          text:
            'The HSE describes a PTW in HSR25 (the Memorandum of Guidance on the Electricity at Work Regulations 1989) and in HSG253 as a key control measure for any work where the consequences of an error — re-energisation, contact with a parallel live source, contact with stored energy — would be severe. It is the documented mechanism by which a Duty Holder demonstrates compliance with EAWR 1989 Regulation 14 (work on or near live conductors) and Regulation 4(3) (work to be carried out without danger).',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'PTW vs safe isolation — they are not the same',
          text:
            'A safe isolation procedure (lock-off, test for dead with a proving unit, prove the tester, GS38-compliant approved voltage indicator) is the physical act. A Permit to Work is the paper system that authorises that act for this defined job, by this defined person, on this defined system, for this defined time window. You can have safe isolation without a PTW (typical domestic / small commercial work), but you cannot have a PTW without underlying safe isolation.',
        },
      ],
    },
    {
      id: 'when-required',
      heading: 'When a Permit to Work Is Required',
      tocLabel: 'When is a PTW required',
      blocks: [
        {
          type: 'paragraph',
          text:
            'There is no single UK regulation that says "you must use a PTW for X". Instead, EAWR 1989, HSR25 and the Duty Holder\'s own safety management system together drive when a PTW is appropriate. As a practical rule of thumb for UK electricians, a PTW is required (or strongly expected) for the following categories:',
        },
        {
          type: 'list',
          tone: 'warning',
          items: [
            'High Voltage (HV) work — any work on a system operating above 1000V AC. HV systems require a written permit under the Duty Holder\'s electrical safety rules. No competent UK organisation permits informal HV work.',
            'LV work in industrial and commercial settings where multiple isolation points exist — for example, ring-fed distribution boards, dual supplies, automatic transfer to a generator, UPS systems, or PV inverters that can back-feed.',
            'Work on shared electrical systems — landlord-owned risers, shared sub-mains in offices, multi-tenant retail or warehouse units. Other parties may rely on the system being live.',
            'Work on emergency or life-safety supplies — fire alarms, smoke ventilation, hospital theatre power, data-centre critical load. Isolation must be controlled and the outage authorised in writing.',
            'Public premises and healthcare estates — universities, hospitals, schools, transport hubs, prisons. Most have a formal PTW system run by an Authorised Person under their electrical safety rules.',
            'Work where multiple trades or contractors are on the system at the same time — for example, mechanical contractors on plant that is electrically fed, or another electrical team working an adjacent panel.',
            'Confined-space electrical work, work at height on energised equipment access, and any work where the isolation could be reasonably defeated by another person without warning.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Domestic and small commercial work',
          text:
            'A standard domestic or small-commercial job — replacing a consumer unit, adding a circuit, EICR remedial work on a single-tenant supply — does not normally require a formal PTW. Safe isolation under GS38 with a written safe-isolation record on the certificate is the expected control. The PTW system kicks in when complexity, multiple isolations, or third-party reliance raises the stakes.',
        },
      ],
    },
    {
      id: 'ptw-elements',
      heading: 'The Elements Every PTW Must Contain',
      tocLabel: 'Elements of a PTW',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A compliant Permit to Work is not a free-form note. It is a structured document with specific, named fields. A permit missing any one of these elements is not a valid permit — and in an HSE investigation following an incident, missing fields are routinely cited as evidence of an inadequate safety system.',
        },
        {
          type: 'list',
          items: [
            'Identification — unique permit number, site, asset reference, date and time of issue.',
            'Scope of work — precise description of what is permitted (e.g. "replace 400A ACB in panel MSB-02"). Anything outside this scope is not permitted under this permit.',
            'Isolation procedure — which devices are operated, in what order, to remove all sources of energy. Includes upstream main switch, any parallel feeds, generator interlocks, PV / battery isolation, and stored-energy discharge.',
            'Lock-off and tagging — every isolation point physically locked with a personal padlock keyed only to the Recipient, and tagged with the permit number, name, and date. Multi-lock hasps used where more than one person works on the same isolation.',
            'Test instruments — the GS38-compliant approved voltage indicator (AVI) and proving unit used, with calibration / function-check status recorded.',
            'Test for dead — confirmation that the dead test was carried out at the point of work, including between all phases and to earth, with the AVI proved before and after.',
            'Issuer and Recipient — named, signed, competent. The Issuer authorises the permit; the Recipient accepts responsibility for the work team working under it.',
            'Expiry / duration — the permit is valid only for the defined window. If the work overruns, the permit must be re-issued, not silently extended.',
            'Withdrawal / hand-back — formal sign-off when work is complete: the system is left in a defined state, all tools / personnel are clear, and authorisation to remove locks and re-energise is given by the Issuer.',
            'Return-to-service test — appropriate dead and live tests (continuity, insulation resistance, polarity, earth fault loop impedance, RCD as applicable per BS 7671 Part 6) before the system is handed back into service.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'The hand-back is the most-skipped step',
          text:
            'Permits are routinely opened correctly and closed badly. The Recipient finishes the work, locks come off, the system gets energised, and the permit is filed without a documented hand-back conversation with the Issuer. Under EAWR 1989 this is the moment of greatest risk — and the moment investigators look at first. Treat hand-back as a formal verbal-plus-written exchange, not a paperwork tidy-up.',
        },
      ],
    },
    {
      id: 'rams-relationship',
      heading: 'How PTW, RAMS and Safe Isolation Fit Together',
      tocLabel: 'PTW vs RAMS',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A common misunderstanding among UK electrical contractors is that a Permit to Work replaces — or duplicates — the risk assessment and method statement. It does not. The three documents sit in a strict hierarchy:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Risk Assessment (RA) — identifies the hazards (electrical shock, arc flash, stored energy, working at height, parallel supply) and the control measures needed.',
            'Method Statement (MS) — describes step-by-step how the work will be carried out safely, including isolation, testing, PPE, and emergency procedures.',
            'Permit to Work (PTW) — authorises that this specific job, described in this MS, controlled by this RA, can begin now on this isolated system, under this Issuer, until this expiry.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'In practice: the [RAMS pack is generated in advance](/tools/rams-generator) and reviewed at site induction. The PTW is then opened on the day of the work, referencing the RAMS document numbers. If the RAMS changes (different isolation point, different scope, different team), a new PTW is issued — you cannot re-use yesterday\'s permit for today\'s work.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Where the documents cross-reference',
          text:
            'A well-written PTW references the specific [method statement for safe isolation](/guides/method-statement-safe-isolation) and the underlying [electrical RAMS template](/guides/electrical-rams-template-uk) by document number. The MS references the [lock-out / tag-out (LOTO) procedure](/guides/lockout-tagout-loto-electricians) and the GS38 safe-isolation steps. The RA references the BS 7671:2018+A4:2026 regulations that justify the chosen control measures. Each document points to the next — none of them stand alone.',
        },
      ],
    },
    {
      id: 'hv-permits',
      heading: 'HV Permits and the Authorised Person',
      tocLabel: 'HV permits & APs',
      blocks: [
        {
          type: 'paragraph',
          text:
            'For HV work — supplies above 1000V AC, typically found on universities, hospitals, large industrial sites, transport infrastructure, and data centres — a Permit to Work is not optional. It is the universal mechanism by which the Duty Holder demonstrates control of the system under EAWR 1989 and the site\'s electrical safety rules.',
        },
        {
          type: 'paragraph',
          text:
            'The Issuer of an HV permit is the site Authorised Person (AP), formally appointed in writing by the Duty Holder, with documented training, technical competence and current authorisation for the specific voltage range and asset type. Visiting electrical contractors — even highly experienced HV-qualified engineers — do not typically become the Issuer. They are the Recipient.',
        },
        {
          type: 'list',
          items: [
            'The AP carries out (or supervises) the switching, earthing and isolation under the site\'s switching schedule.',
            'The AP issues the permit to the named Recipient, who signs to accept it and the work conditions.',
            'The Recipient (often the contractor\'s lead electrician) is responsible for the safety of everyone working under that permit.',
            'On completion, the Recipient hands the permit back to the AP. Locks are not removed by the contractor — they are removed by the AP after the hand-back is signed.',
            'The AP authorises re-energisation only after the return-to-service test and any required confirmation from the work team that all personnel and tools are clear.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Never issue your own HV permit on a third-party site',
          text:
            'If you arrive at a university, hospital or industrial site for HV work and there is no AP available, no permit system in place, or you are being asked to issue and accept the permit yourself — stop. This is not a procedural quirk. It indicates an unsafe management of the system and exposes you personally under EAWR 1989. Decline the work in writing and report the gap to the Duty Holder.',
        },
      ],
    },
    {
      id: 'ptw-failures',
      heading: 'How Permit-to-Work Systems Fail in Practice',
      tocLabel: 'How PTW fails',
      blocks: [
        {
          type: 'paragraph',
          text:
            'HSE investigations following electrical incidents on permit-controlled work consistently identify a small number of recurring failures. Knowing them in advance is the simplest way for an electrical contractor to avoid sitting on the wrong side of an investigation:',
        },
        {
          type: 'list',
          tone: 'warning',
          items: [
            'Scope creep — the permit authorises one task, the team does a second "while we\'re here", the second task involves a different isolation, and the permit no longer covers it.',
            'Expired permits — work overruns, the permit time-window ends, the team keeps working under a permit that is no longer valid.',
            'Missing back-feed isolation — the main switch is locked off, but a generator, UPS, PV inverter or BMS-controlled tie breaker can still re-energise the system.',
            'Tagging without locking — tags placed on isolators without physical locks. Anyone with a screwdriver can defeat a tag.',
            'No proving of the AVI — the approved voltage indicator is used to test for dead, but never proved against a known live source or proving unit. A faulty indicator reads dead on a live system.',
            'Verbal hand-back only — the Recipient tells the Issuer the job is finished, locks come off, no written sign-off. If something goes wrong, there is no record of who authorised re-energisation.',
            'Shared keys — multiple people share a single padlock and key. The lock-off becomes administrative theatre rather than a physical safety control.',
            'No return-to-service test — the system is re-energised without confirming continuity, insulation resistance, polarity, ELI and (where applicable) RCD operation per BS 7671 Part 6.',
          ],
        },
      ],
    },
    {
      id: 'regulatory-framework',
      heading: 'UK Regulatory Framework for Electrical PTW',
      tocLabel: 'Regulatory framework',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A Permit to Work is a control mechanism — but the legal force behind it comes from a stack of UK regulations, codes and standards. For UK electricians the relevant framework is:',
        },
        {
          type: 'list',
          items: [
            'Electricity at Work Regulations 1989 — particularly Regulation 4 (general duties), Regulation 13 (precautions for work on equipment made dead) and Regulation 14 (work on or near live conductors).',
            'HSE HSR25 — the Memorandum of Guidance on EAWR 1989, the authoritative HSE interpretation of how the regulations apply in practice.',
            'HSE HSG253 — "The safe isolation of plant and machinery", the HSE\'s practical guidance on isolation systems including PTW.',
            'BS 7671:2018+A4:2026 — the IET Wiring Regulations, particularly Part 6 (inspection and testing) which defines the return-to-service tests required before a system is re-energised after intrusive work.',
            'BS 7671 Chapter 46 / Section 537 — isolation and switching requirements, which underpin which devices may be used as the means of isolation under a PTW.',
            'IET Guidance Note 3 (Inspection & Testing) — practical guidance on the test sequence following work on an installation.',
            'CDM 2015 — where the work is part of a construction project, the principal contractor must manage the PTW system as part of the [overall CDM duties](/guides/cdm-2015-for-electricians).',
            'The site\'s own electrical safety rules — most large estates (NHS, MoD, universities, data centres, rail) operate written safety rules that define their PTW system in detail. These bind any contractor working on the site.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Live working — when no PTW will do',
          text:
            'EAWR Regulation 14 sets a near-absolute bar on working on energised conductors. Where live work is being proposed because "isolation is not practicable", a Permit to Work is not a workaround — you also need a documented justification under Reg 14, written authorisation, suitable PPE and live-work-trained personnel. See the dedicated guide on [working near live mains and hazard control](/guides/working-near-live-mains-hazard-control) and the [method statement for live working](/guides/method-statement-live-working). Most "live work" jobs can in fact be isolated with the right planning.',
        },
      ],
    },
  ],
  howToHeading: 'How to operate a Permit to Work on site',
  howToDescription:
    'A practical six-step sequence for a typical LV permit on a commercial or industrial system. HV permits follow the same pattern but with switching carried out by the site Authorised Person.',
  howToSteps: [
    {
      name: 'Plan and produce the RAMS',
      text:
        'Before the day of the work, produce the risk assessment and method statement. Identify every source of energy: main supply, parallel feeds, generator, UPS, PV, battery, capacitor banks, stored mechanical energy. Define the isolation sequence, the lock-off plan, the test instruments and the return-to-service test scope.',
    },
    {
      name: 'Open the permit with the Issuer',
      text:
        'On the day, the Issuer (site Authorised Person or duly authorised competent person) confirms the system state, opens the PTW, fills in the scope, isolation points, expiry and test instruments, and signs as Issuer. The Recipient reads the permit, agrees the scope, and signs as Recipient. No work starts before both signatures are on the permit.',
    },
    {
      name: 'Carry out isolation and lock-off',
      text:
        'Operate each isolation device in the planned sequence. Apply a personal padlock to each isolator using a multi-lock hasp where multiple people are working. Apply a tag to each padlock with the permit number, Recipient name and date. Verify visible breakage where the isolator type supports it.',
    },
    {
      name: 'Prove dead at the point of work',
      text:
        'Prove the GS38-compliant approved voltage indicator (AVI) against a known live source or proving unit. Test for dead at the point of work — phase to phase, phase to neutral, phase to earth, neutral to earth. Re-prove the AVI against the proving unit immediately after testing for dead. Record AVI serial number and calibration status on the permit.',
    },
    {
      name: 'Carry out the work strictly within scope',
      text:
        'Work only on the equipment and to the scope defined on the permit. If the work expands, stop, close the existing permit, and issue a new one with the revised scope. Monitor expiry time — if approaching, hand back and re-issue rather than overrun.',
    },
    {
      name: 'Hand back, test and re-energise',
      text:
        'On completion, confirm with the work team that all personnel and tools are clear of the system. Carry out the required BS 7671 Part 6 dead tests (continuity of protective conductors, insulation resistance, polarity) then formally hand back the permit to the Issuer. The Issuer removes the locks (or authorises their removal), re-energises the system, and carries out the live return-to-service tests (earth fault loop impedance, RCD operation, prospective fault current confirmation). Both Issuer and Recipient sign the permit closed.',
    },
  ],
  faqs: [
    {
      question: 'Is a Permit to Work a legal requirement in the UK?',
      answer:
        'Not directly — there is no UK regulation that names "Permit to Work" as a mandatory document for every electrical job. What is mandatory under the Electricity at Work Regulations 1989 is that work on electrical systems is carried out without danger. For high-risk work — HV, multi-source LV, life-safety supplies, shared systems — the HSE guidance HSR25 and HSG253 make clear that a formal permit system is the expected control. Failing to operate one on such work is treated by HSE investigators as evidence that the Duty Holder has not complied with EAWR 1989.',
    },
    {
      question: 'Who can issue a Permit to Work?',
      answer:
        'The Issuer must be a competent person formally appointed in writing by the Duty Holder, with documented training and current authorisation for the system in question. For HV work this is the site Authorised Person (AP) under the site\'s electrical safety rules. For LV work in industrial or commercial estates, it is typically the site\'s designated electrical Duty Holder, AP(LV) or Senior Authorised Person. A visiting contractor without site-specific authorisation cannot issue a permit on someone else\'s system — they receive it.',
    },
    {
      question: 'Can I use a single permit for a multi-day job?',
      answer:
        'No — at least not in the way most people mean. A permit is valid only for the time window stated on it. For multi-day jobs you typically issue a fresh permit at the start of each shift, with the system re-confirmed dead and re-locked. Some sites operate a "suspended permit" system where the work area is left in a defined safe state overnight (locks remain, tags remain, system stays dead) and the permit is re-validated each morning — but this is a defined site procedure, not informal carry-over. Silently working under an expired permit is one of the highest-risk failures HSE investigators look for.',
    },
    {
      question: 'Does the Permit to Work replace the safe isolation record on the certificate?',
      answer:
        'No. The PTW is the authorising document for the job; the safe isolation record (typically on the EIC, Minor Works Certificate or installer\'s daily test record) is the technical record of the isolation and dead-testing procedure. Both must exist. The PTW references the isolation procedure but does not duplicate the test-for-dead values, the AVI serial number, the calibration date and the BS 7671 Part 6 return-to-service test results — those go on the certificate.',
    },
    {
      question: 'What is the difference between a Permit to Work and a Sanction for Test?',
      answer:
        'Both are formal authorisations issued under a site\'s electrical safety rules. A Permit to Work authorises work on a system that has been made dead and isolated. A Sanction for Test authorises specific testing on a system that may be made live for the purpose of the test (for example, primary injection testing of a protection relay, or proving the operation of an interlock). They are different documents because the safety regime is different — under a PTW the system is dead and locked; under a Sanction for Test parts of the system may be deliberately energised under controlled conditions. Most contracting electricians work under PTWs, not Sanctions for Test.',
    },
    {
      question: 'I am replacing a consumer unit in a small commercial unit. Do I need a PTW?',
      answer:
        'In most cases no — a domestic-style consumer unit replacement in a single-tenant small commercial unit is normally controlled by your own RAMS, GS38 safe isolation at the cut-out / main switch, lock-off, and the standard certificate records. Where you would step up to a PTW is if the unit shares a supply with other tenants, if there is a generator / PV back-feed, if isolating the supply means isolating a life-safety system in the building, or if the building has its own permit system (typical for shopping centres, business parks and managed offices). See the dedicated guide on [RAMS for consumer unit replacement](/guides/rams-for-consumer-unit-replacement) for the boundary cases.',
    },
    {
      question: 'Can Elec-Mate generate the PTW automatically?',
      answer:
        'Elec-Mate\'s RAMS Generator produces the underlying risk assessment, method statement and safe isolation procedure that the PTW references. The PTW itself is normally issued on the site\'s own permit form by the site\'s Authorised Person — that signature chain has to stay with the people legally appointed to issue and accept it. What Elec-Mate gives you is a complete, BS 7671 and EAWR-aligned RAMS pack you can take to the AP, which makes opening the permit a five-minute conversation rather than a half-day re-write.',
    },
  ],
  relatedPages: [
    {
      href: '/tools/rams-generator',
      title: 'RAMS Generator',
      description: 'Generate a full RAMS pack — risk assessment, method statement, safe isolation procedure — that your site Authorised Person can use to open the PTW.',
      icon: 'FileText',
      category: 'Tool',
    },
    {
      href: '/guides/method-statement-safe-isolation',
      title: 'Method Statement — Safe Isolation',
      description: 'The GS38-compliant safe isolation procedure that sits underneath every electrical PTW.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/guides/lockout-tagout-loto-electricians',
      title: 'Lockout / Tagout (LOTO) for Electricians',
      description: 'The physical lock-off and tagging regime that turns a PTW from paper into a real safety control.',
      icon: 'AlertTriangle',
      category: 'Guide',
    },
    {
      href: '/guides/cdm-2015-for-electricians',
      title: 'CDM 2015 for Electricians',
      description: 'How CDM 2015 duties interact with the principal contractor\'s permit-to-work system on construction projects.',
      icon: 'ClipboardCheck',
      category: 'Guide',
    },
    {
      href: '/guides/electrical-rams-template-uk',
      title: 'UK Electrical RAMS Template',
      description: 'The standard structure for electrical risk assessments and method statements that a PTW references.',
      icon: 'FileText',
      category: 'Guide',
    },
    {
      href: '/guides/rams-for-consumer-unit-replacement',
      title: 'RAMS for Consumer Unit Replacement',
      description: 'A worked example of the RAMS / PTW boundary on common LV remedial work.',
      icon: 'Home',
      category: 'Guide',
    },
    {
      href: '/guides/method-statement-live-working',
      title: 'Method Statement — Live Working',
      description: 'When isolation is genuinely impracticable: the EAWR Reg 14 justification, PPE, controls and authorisation chain.',
      icon: 'Zap',
      category: 'Guide',
    },
    {
      href: '/guides/working-near-live-mains-hazard-control',
      title: 'Working Near Live Mains — Hazard Control',
      description: 'Hazard identification and control measures for unavoidable proximity to live conductors.',
      icon: 'AlertTriangle',
      category: 'Guide',
    },
  ],
  ctaHeading: 'Generate the RAMS that opens the permit',
  ctaSubheading:
    'Elec-Mate\'s RAMS Generator produces a complete, UK-aligned risk assessment, method statement and safe isolation procedure that your site Authorised Person can issue a Permit to Work against — without the half-day re-write. BS 7671:2018+A4:2026, EAWR 1989 and HSE HSG253 referenced throughout. 7-day free trial, cancel anytime.',
};
