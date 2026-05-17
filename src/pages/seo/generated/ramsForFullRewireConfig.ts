import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Grounded in BS 7671:2018+A4:2026 (18th Edition), IET Guidance Note 3
// (Inspection & Testing, 9th Edition), the IET On-Site Guide, plus the
// CDM 2015 statutory framework and the Electricity at Work Regulations 1989.

const published = '2026-05-17';
const modified = '2026-05-17';

export const ramsForFullRewireConfig: GeneratedGuideConfig = {
  pagePath: '/guides/rams-for-full-rewire',
  title:
    'RAMS for a Full House Rewire — UK Method Statement Template | Elec-Mate',
  description:
    'Risk assessment and method statement for a full house rewire in the UK. Hazards, CDM 2015 duties, asbestos awareness, phased isolation, and a downloadable RAMS structure aligned to BS 7671:2018+A4:2026 and the Electricity at Work Regulations 1989.',
  datePublished: published,
  dateModified: modified,
  readingTime: 14,
  badge: 'Method Statement Template',
  badgeIcon: 'ClipboardCheck',
  breadcrumbLabel: 'RAMS for Full Rewire',
  heroPrefix: 'RAMS for a',
  heroHighlight: 'Full House Rewire',
  heroSuffix: '— Method Statement Template',
  heroSubtitle:
    'A full house rewire is one of the highest-risk projects an electrician runs: working at height across every room, dust and possible asbestos in pre-2000 stock, phased isolation while a family lives in the property, and a Construction Phase Plan that the principal contractor has to keep alive. This guide gives you the structure of a defensible RAMS — hazards, controls, A4:2026 design points, and the regulatory framework — so the document you hand to the client and the HSE actually holds up.',
  keyTakeaways: [
    'A full house rewire almost always triggers CDM 2015 — more than one contractor on site (even your apprentice plus a plasterer) makes the client appoint a principal contractor and a Construction Phase Plan is required before work starts.',
    'Asbestos awareness is non-negotiable in any pre-2000 property under the Control of Asbestos Regulations 2012 — artex ceilings, AIB ceiling tiles, textured coatings and old back-boxes can all release fibres when chased or drilled.',
    'Working at height is the dominant hazard — every ceiling rose, loft pull, first-floor pendant and stair landing involves ladders or platforms; the Work at Height Regulations 2005 hierarchy (avoid / prevent / mitigate) must be in the method statement.',
    'Phased isolation in an occupied dwelling needs a written sequence — which circuits go off when, what stays live, how the family is informed, and how emergency lighting / fridge / freezer / medical equipment are protected.',
    'The completed install must be certified on an A4:2026 EIC — luminaire RCD on every final circuit (Reg 411.3.4 as amended), AFDD risk assessment, SPD assessment, and TN-C-S (PME or PNB) earthing recorded on the model form.',
    'Schedule of Test Results must be completed for every circuit at handover — continuity, insulation resistance, polarity, Zs, RCD operating times — not done from memory after the customer has moved back in.',
  ],
  sections: [
    {
      id: 'why-rams-matters',
      heading: 'Why a Full Rewire Needs a Proper RAMS',
      tocLabel: 'Why it matters',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A full house rewire is not a single-day fault find or a one-room consumer-unit swap. It is a multi-day, multi-room project that disturbs the fabric of the building, exposes the household to electrical and physical hazards, and produces a brand-new installation that has to be certified to current BS 7671. The Risk Assessment and Method Statement (RAMS) is the document that ties all of this together — it is what the client signs, what the principal contractor logs against the Construction Phase Plan, and what the HSE will ask for if anything goes wrong.',
        },
        {
          type: 'paragraph',
          text:
            'A serious RAMS for this job covers four things at once: the [hazards specific to rewiring](/guides/electrical-rams-template-uk), the controls you will put in place, the safe-isolation method for each phase, and the design / certification standard the finished install will meet. If your method statement only covers safe isolation, you are missing two-thirds of the document.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'CDM 2015 triggers earlier than electricians think',
          text:
            'The Construction (Design and Management) Regulations 2015 apply to any construction project, however small. The moment you have more than one contractor on site — your apprentice plus a plasterer reinstating chases, for example — the client must appoint a principal designer and a principal contractor, and a written Construction Phase Plan must be in place before any construction work starts. For a full rewire, this is almost always the case.',
        },
      ],
    },
    {
      id: 'hazards',
      heading: 'Hazards Specific to a Full House Rewire',
      tocLabel: 'Hazards',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The risk-assessment side of the document should list each hazard, who is at risk, the existing controls, and any additional controls you are introducing. The hazards below are the ones that recur on almost every full rewire and that an HSE inspector would expect to see addressed in writing:',
        },
        {
          type: 'list',
          tone: 'warning',
          items: [
            'Working at height — ceiling roses, loft access, stair-landing pendants, soffit lights and first-floor sockets all involve ladders, hop-ups or low platforms. Falls are still the single biggest cause of construction fatalities in the UK.',
            'Dust inhalation — chasing walls, lifting floorboards, drilling joists and pulling old cables release plaster dust, fibreglass insulation, mouse droppings, and possible asbestos fibres into the breathing zone.',
            'Asbestos in pre-2000 properties — artex ceilings, AIB ceiling tiles, textured coatings around back-boxes, old vermiculite loft insulation and bitumen-bonded soil pipes can all contain asbestos. Disturbing them without an asbestos refurbishment survey is an offence under the Control of Asbestos Regulations 2012.',
            'Lead paint in pre-1992 properties — sanding, scraping or chasing through old gloss or eggshell paint can release lead dust. Risk assessment must address respiratory protection and clean-up.',
            'Old wiring systems — rubber-insulated cable from the 1950s, lead-sheathed feeders, tough rubber sheath (TRS) and early PVC can crumble when handled, exposing live conductors during the strip-out phase.',
            'Live working risk during phased isolation — the property is being lived in, so you cannot simply switch off at the cut-out for a fortnight. Each phase needs a written isolation plan and locked-off circuits.',
            'Structural risk — drilling and notching joists outside the zones permitted by the IET Wiring Regulations / On-Site Guide weakens the floor. The method statement must reference the permitted notch / hole positions.',
            'Fire risk during strip-out — old enclosures, dust accumulation in voids, and partially terminated cables left overnight are all credible ignition sources. The site must be left safe each evening.',
            'Customer property damage — carpets, furniture, decoration, pets and children all share the work area. The RAMS must specify protection (dust sheets, hard-board, floor protection) and exclusion zones.',
            'Reinstatement of fire-stopping — penetrations through compartment walls and floors must be re-sealed to maintain fire resistance. Leaving holes in a party wall after pulling new cables is a Building Regulations breach.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Asbestos refurbishment survey — when it is mandatory',
          text:
            'Under the Control of Asbestos Regulations 2012, an asbestos refurbishment and demolition survey is required before any refurbishment work that disturbs the fabric of a non-domestic premises built or refurbished before the year 2000. For domestic properties the duty is less prescriptive, but HSE guidance is unambiguous: if your work will disturb materials that may contain asbestos, you must establish whether asbestos is present before you start. A full rewire of a 1970s semi without a survey is not a defensible position.',
        },
      ],
    },
    {
      id: 'method-statement',
      heading: 'The Method Statement — What to Write',
      tocLabel: 'Method statement structure',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The method-statement half of the RAMS is the step-by-step sequence of work. For a full rewire it should be broken into clearly named phases so the client, the principal contractor and your team all know what is happening and when. A typical phase structure:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Phase 0 — Pre-start: design verified, asbestos refurbishment survey reviewed, [safe-isolation procedure agreed in writing](/guides/method-statement-safe-isolation), Construction Phase Plan signed by client, RAMS briefed to operatives and signed.',
            'Phase 1 — Set-up and protection: dust sheets, floor protection, exclusion zones, temporary lighting confirmed, welfare provision agreed, edge protection for any roof access.',
            'Phase 2 — First fix strip-out: old circuits identified and locked off circuit-by-circuit, cables stripped back to consumer unit, no dead-leg conductors left energised. Permits to work issued per phase.',
            'Phase 3 — First fix install: new cables, back-boxes, drops to switches and sockets, drilling and notching of joists strictly within IET-permitted zones, fire-stopping at compartment penetrations, temporary capping over live ends.',
            'Phase 4 — Second fix: accessories fitted, consumer unit installed, AFDD / RCD configuration per A4:2026 design, SPD installed where risk assessment indicates, [luminaire RCD coverage on every final circuit](/guides/bs-7671-a4-2026-luminaire-rcd-protection).',
            'Phase 5 — Inspection, testing and commissioning: full Schedule of Test Results per circuit, all results recorded on the A4:2026 EIC model form, RCD and AFDD function tests, final visual inspection.',
            'Phase 6 — Handover: EIC issued to the client, Building Control / NICEIC / NAPIT compliance certificate lodged, user instructions provided, defects period agreed in writing.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'Each phase should also reference the [working-at-height controls](/guides/working-at-height-electricians) (which platform, which PPE) and any [lone-working arrangements](/guides/lone-working-electricians) (who is on site alone, when, and how check-in is handled).',
        },
      ],
    },
    {
      id: 'a4-design-points',
      heading: 'A4:2026 Design Points the RAMS Must Reference',
      tocLabel: 'A4:2026 design points',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A new full installation completed in 2026 is a new installation under [BS 7671:2018+A4:2026](/guides/bs-7671-a4-2026-summary), not an addition. That means the design must meet the current edition in full — and the RAMS should call this out explicitly so the client cannot later claim they expected the old standard. The key points the method statement should record:',
        },
        {
          type: 'list',
          items: [
            'Reg 411.3.4 (as amended by A4:2026) — additional protection by 30 mA RCD on every final circuit, including lighting circuits. The new install cannot reuse a non-RCD layout from the old wiring.',
            'AFDD provision — a risk assessment for arc fault detection must be recorded; AFDDs are required for specific final circuits as listed in A4:2026 (e.g. in HMOs, care homes and similar higher-risk locations) and recommended for others.',
            'SPD risk assessment — surge protection device requirements per Section 443, recorded on the model form.',
            'Earthing arrangement — TN-S, TN-C-S (PME), TN-C-S (PNB), TT — clearly identified, with the conductor sizes verified per Section 543. PNB and PME are now explicitly recorded on the A4:2026 EIC.',
            'Reg 132.16 — connection of additions / alterations. If any part of the rewire involves connecting to existing tails or a meter cabinet, the duty in 132.16 to assess the adequacy of those existing parts must be discharged and recorded.',
            'Schedule of Test Results — every new circuit recorded with continuity, insulation resistance, polarity, Zs and RCD operating time. Not optional; not "done from memory."',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'New install vs alteration',
          text:
            'A full rewire produces a new installation in BS 7671 terms — the EIC, not a Minor Works Certificate, is the correct certification. The Schedule of Inspections and Schedule of Test Results on the A4:2026 EIC are both mandatory.',
        },
      ],
    },
    {
      id: 'phased-isolation',
      heading: 'Phased Isolation in an Occupied Property',
      tocLabel: 'Phased isolation',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Most full rewires happen with the family still in the house — they cannot move out for two weeks for cost reasons. The RAMS must therefore set out a phased-isolation method that keeps power on to essential loads while you work circuit-by-circuit. This protects the customer, protects you from liability if a fridge defrosts, and keeps the EAWR 1989 dead-working principle intact.',
        },
        {
          type: 'list',
          items: [
            'Pre-job survey: list every circuit, identify what each one supplies, and agree with the customer which loads are "must stay live" (typically fridge / freezer, medical equipment, central-heating boiler, broadband router).',
            'Circuit register: written and signed, kept in the consumer unit and with the operative. Locked-off circuits flagged with hasp + padlock, not just a tape over the switch.',
            'Temporary supplies: if a kitchen circuit comes off for two days, agree where the freezer is plugged in (a known-tested socket on a different live circuit) and label it.',
            'Daily walk-around: at the end of each day, every disconnected cable is either reconnected and proved, or capped, taped, segregated and recorded as out-of-service in writing.',
            'Customer briefing: written notice posted at the consumer unit each day listing which circuits are off, expected restoration time, and the emergency contact number.',
            'Final restoration: only after the full Schedule of Test Results is signed, RCDs are function-tested, and the EIC is issued. No "we will test next week" — the family does not move back to a circuit until that circuit has been verified.',
          ],
        },
      ],
    },
    {
      id: 'legal-framework',
      heading: 'The Legal Framework Behind the RAMS',
      tocLabel: 'Legal framework',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The RAMS is not a checklist for its own sake — it is the document that demonstrates compliance with the statutory framework. For a full rewire that framework is:',
        },
        {
          type: 'list',
          items: [
            'Health and Safety at Work etc. Act 1974 — the umbrella duty to ensure the health and safety of employees and others affected by the work.',
            'Management of Health and Safety at Work Regulations 1999 — duty to carry out a suitable and sufficient risk assessment.',
            'Electricity at Work Regulations 1989 — Regs 4, 13 and 14: systems maintained safe, work on dead conductors, work on live conductors only when justified and with precautions.',
            '[Construction (Design and Management) Regulations 2015](/guides/cdm-2015-for-electricians) — client appoints principal designer and principal contractor where more than one contractor is involved; Construction Phase Plan required before work starts; F10 notification required if the project exceeds 30 working days with 20+ workers simultaneously, or 500 person-days.',
            'Control of Asbestos Regulations 2012 — duty to identify asbestos before disturbing the fabric; refurbishment survey required where asbestos may be present.',
            'Work at Height Regulations 2005 — hierarchy of avoid / prevent / mitigate; competent operative; appropriate platform; daily inspection of equipment.',
            'Control of Substances Hazardous to Health Regulations 2002 (COSHH) — risk assessment for plaster dust, MDF dust, solvents and any chemical agents used in fire-stopping or mastic.',
            'Building Regulations Part P — domestic electrical work is notifiable; full rewire must be certified through a competent person scheme or notified to Building Control.',
            'BS 7671:2018+A4:2026 — the technical standard the installation must meet; the EIC, Schedule of Inspections and Schedule of Test Results are the evidence of compliance.',
          ],
        },
      ],
    },
    {
      id: 'whats-in-the-document',
      heading: 'What a Defensible RAMS Document Actually Contains',
      tocLabel: 'Document contents',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The finished RAMS the client signs and the principal contractor files should contain, at minimum:',
        },
        {
          type: 'list',
          tone: 'success',
          items: [
            'Cover page — project address, client name, contractor name, RAMS reference, version, date, author signature.',
            'Scope of works — what is being rewired (full house / partial / specific circuits), what is in and out of scope.',
            'Risk assessment table — hazard, who at risk, existing controls, additional controls, residual risk rating (likelihood x severity).',
            'Method statement — phased sequence of work as set out above, with named operatives and supervision arrangement.',
            'Safe-isolation procedure — referenced step-by-step, with the GS38 / approved voltage indicator the operative will use.',
            'Emergency arrangements — first-aider on site, location of fire extinguishers, nearest A&E, emergency contact numbers.',
            'PPE schedule — what is worn for which phase (FFP3 mask for chasing, gloves for asbestos awareness, helmet for loft work, etc.).',
            'Sign-off page — every operative signs to confirm they have read and understood the RAMS before work starts.',
          ],
        },
        {
          type: 'callout',
          tone: 'success',
          title: 'Generate, brief, sign — in under 10 minutes',
          text:
            'The [Elec-Mate RAMS Generator](/tools/rams-generator) builds a full rewire RAMS in under ten minutes from a few project inputs, with the hazard library, A4:2026 design points and CDM 2015 framework already baked in. You review, edit anything project-specific, and send it to the client and operatives to sign. The same project can roll straight into the [EIC certificate](/tools/eic-certificate) at handover.',
        },
      ],
    },
  ],
  howToSteps: [
    {
      name: 'Confirm CDM 2015 status before pricing the job',
      text:
        'Before you quote, establish who the client is, whether more than one contractor will be on site, and whether the project hits the F10 notification threshold. If CDM applies (and on a full rewire it almost always does), price in the principal-contractor duties and the Construction Phase Plan.',
    },
    {
      name: 'Commission the asbestos refurbishment survey',
      text:
        'For any property built or refurbished before the year 2000, get an asbestos refurbishment and demolition survey before the strip-out phase. Review the report and incorporate findings into the RAMS — locations of ACMs, materials to avoid disturbing, and any licensed-removal work that must precede the rewire.',
    },
    {
      name: 'Build the RAMS document',
      text:
        'Use the Elec-Mate RAMS Generator (or your own template) to produce the document. Populate the project-specific scope, list hazards from the rewire hazard library, define the phased method, attach the safe-isolation procedure, and reference the A4:2026 design points the finished install will meet.',
    },
    {
      name: 'Brief and sign the document with every operative',
      text:
        'Before work starts on site, hold a documented briefing with every operative including apprentices. Walk through the hazards, the method, the isolation plan, and the PPE schedule. Everyone signs the briefing sheet, and that sheet stays in the project file.',
    },
    {
      name: 'Issue the Construction Phase Plan and start work',
      text:
        'Give the client and principal contractor a copy of the RAMS and the Construction Phase Plan before any construction work starts. Keep a controlled copy on site, available for inspection.',
    },
    {
      name: 'Certify the finished installation on an A4:2026 EIC',
      text:
        'At handover, complete the Electrical Installation Certificate using the A4:2026 model form. Schedule of Inspections, Schedule of Test Results for every circuit, RCD and AFDD function tests, earthing arrangement (TN-C-S PME or PNB, TN-S, TT) clearly recorded. Notify the work under Part P through your competent person scheme.',
    },
  ],
  howToHeading: 'How to deliver a rewire RAMS the HSE would accept',
  howToDescription:
    'Six steps from quoting the job to lodging the EIC. Skip any of them and the document loses its evidential value.',
  faqs: [
    {
      question: 'Do I really need a RAMS for a domestic rewire — it is not a commercial job?',
      answer:
        'Yes. The Management of Health and Safety at Work Regulations 1999 require a suitable and sufficient risk assessment for any work activity, regardless of whether the workplace is commercial or domestic. Once you and your apprentice (or you and any other trade) are on site together, CDM 2015 also applies. A written RAMS is the standard evidence that both duties have been discharged.',
    },
    {
      question: 'Does CDM 2015 really apply to a single-house rewire?',
      answer:
        'In almost every case, yes. CDM 2015 applies to any construction project, however small. As soon as there is more than one contractor on site — your apprentice qualifies, a plasterer reinstating chases qualifies, a decorator qualifies — the client must appoint a principal designer and principal contractor and a Construction Phase Plan is required before any construction work starts. F10 notification to HSE is only required if the project exceeds 30 working days with 20 or more workers on site simultaneously, or 500 person-days, but the duty to plan and document is separate from the duty to notify.',
    },
    {
      question: 'Do I need an asbestos survey before a full rewire?',
      answer:
        'For any property built or refurbished before the year 2000, you must establish whether asbestos-containing materials are present before disturbing the fabric. For non-domestic premises the duty-holder must commission an asbestos refurbishment and demolition survey. For domestic premises the duty is less prescriptive, but HSE guidance is unambiguous: if you cannot rule out asbestos, get a refurbishment survey before strip-out. Disturbing artex, AIB tiles or textured coatings without one is an offence under the Control of Asbestos Regulations 2012.',
    },
    {
      question: 'What is the difference between safe isolation and phased isolation?',
      answer:
        'Safe isolation is the operative-level procedure for proving a single circuit dead before working on it — switch off, lock off, prove with a known-tested GS38 voltage indicator, re-prove the tester. Phased isolation is the project-level method statement for an occupied rewire — which circuits go dead in which order, what stays live for the household, how the family is notified, and how the dead and live circuits are kept physically segregated overnight. Both must be in the RAMS.',
    },
    {
      question: 'Does the new install have to use the A4:2026 model forms?',
      answer:
        'Yes. A full rewire completed in 2026 is a new installation and must be certified using the current model form (the A4:2026 EIC). That means luminaire RCD coverage on every final circuit per Reg 411.3.4 as amended, an AFDD risk assessment, an SPD assessment per Section 443, the earthing arrangement recorded with PNB and PME explicitly identified, and a full Schedule of Test Results for every circuit.',
    },
    {
      question: 'Can I reuse a generic electrical RAMS template for every rewire?',
      answer:
        'No. A generic template is fine as a starting structure, but the document must be project-specific — the hazards in a 1930s end-terrace with artex ceilings are not the hazards in a 2010 new-build extension. The RAMS must reflect the actual property, the actual scope, the actual people on site, and the actual phased-isolation plan agreed with the household. HSE inspectors and insurers spot generic templates immediately.',
    },
    {
      question: 'Who signs the RAMS?',
      answer:
        'The author (typically the qualifying supervisor or lead electrician) signs as the competent person who produced the document. The client signs to confirm they understand the scope, the phased isolation plan and the disruption involved. Every operative — including apprentices and any subcontracted trades — signs the briefing sheet to confirm they have read and understood the document before work starts. The principal contractor signs to confirm the RAMS aligns with the Construction Phase Plan.',
    },
  ],
  faqHeading: 'Frequently asked questions',
  relatedPages: [
    {
      href: '/tools/rams-generator',
      title: 'RAMS Generator',
      description:
        'Build a project-specific RAMS for a full rewire in under ten minutes, with hazard library, CDM 2015 framework and A4:2026 design points baked in.',
      icon: 'ClipboardCheck',
      category: 'Tool',
    },
    {
      href: '/tools/eic-certificate',
      title: 'EIC Certificate Tool',
      description:
        'Issue the A4:2026 Electrical Installation Certificate at handover, with full Schedule of Test Results, AFDD and SPD records.',
      icon: 'FileCheck2',
      category: 'Tool',
    },
    {
      href: '/guides/electrical-rams-template-uk',
      title: 'Electrical RAMS Template UK',
      description:
        'The generic structure of an electrical RAMS — what every document must contain, regardless of the job.',
      icon: 'FileText',
      category: 'Guide',
    },
    {
      href: '/guides/method-statement-safe-isolation',
      title: 'Method Statement — Safe Isolation',
      description:
        'The operative-level step-by-step for proving a circuit dead before work, with GS38 / voltage indicator procedure.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/guides/cdm-2015-for-electricians',
      title: 'CDM 2015 for Electricians',
      description:
        'When CDM applies to your job, who the duty-holders are, and what the Construction Phase Plan must contain.',
      icon: 'BookOpen',
      category: 'Guide',
    },
    {
      href: '/guides/bs-7671-a4-2026-summary',
      title: 'BS 7671 A4:2026 Summary',
      description:
        'What changed in Amendment 4 (2026) — luminaire RCD, AFDD, SPD, TN-C-S (PNB) and the new model forms.',
      icon: 'BookOpen',
      category: 'Guide',
    },
  ],
  ctaHeading: 'Generate a full rewire RAMS in under 10 minutes',
  ctaSubheading:
    'The Elec-Mate RAMS Generator builds project-specific risk assessments and method statements for a full house rewire — CDM 2015 framework, asbestos awareness, phased isolation, A4:2026 design points and a printable Construction Phase Plan annexe. Roll the same project straight into the EIC certificate at handover. 7-day free trial, cancel anytime.',
};
