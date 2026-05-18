import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Grounded in the Confined Spaces Regulations 1997, HSE Approved Code
// of Practice L101 and INDG258, BS 7671:2018+A4:2026 (18th Edition)
// and the Electricity at Work Regulations 1989.

const published = '2026-05-17';
const modified = '2026-05-18';

export const confinedSpaceElectricalWorkConfig: GeneratedGuideConfig = {
  pagePath: '/guides/confined-space-electrical-work',
  title:
    'Confined Space Electrical Work — UK Procedure for',
  description:
    'Confined space electrical work in the UK: what counts as a confined space, the Confined Spaces Regulations 1997 procedure, electrical-specific hazards…',
  datePublished: published,
  dateModified: modified,
  readingTime: 12,
  badge: 'Confined Space Procedure',
  badgeIcon: 'AlertTriangle',
  breadcrumbLabel: 'Confined Space Electrical',
  heroPrefix: 'Confined Space',
  heroHighlight: 'Electrical Work',
  heroSuffix: '— UK Procedure for Electricians',
  heroSubtitle:
    'Cable cellars, service ducts, riser cupboards, underground utility chambers, plant rooms with limited egress — electricians routinely work in spaces that meet the legal definition of a confined space. This guide explains the Confined Spaces Regulations 1997 procedure, the electrical hazards that change the calculus, and how to plan a compliant safe system of work before anyone enters.',
  keyTakeaways: [
    'A confined space is any enclosed or partially enclosed space where a foreseeable "specified risk" exists — oxygen deficiency, flammable atmosphere, harmful dust or fume, heat, drowning or engulfment. The shape of the space matters less than the hazard inside it.',
    'The hierarchy under the Confined Spaces Regulations 1997 is unambiguous: avoid entry if the work can reasonably be done from outside. Only enter when entry is genuinely necessary and a documented safe system of work is in place.',
    'For electricians the most common confined spaces are cable cellars, underground utility chambers, service ducts, tanks/vaults containing transformers or switchgear, and plant rooms with restricted access or egress.',
    'A safe system of work requires: risk assessment, supervisor, trained operatives, atmospheric testing, ventilation as required, communication, suitable PPE (including escape sets or breathing apparatus where indicated), and a rehearsed rescue plan with the right equipment on standby.',
    'Electrical-specific controls layer on top of the CS Regs: full isolation of every electrical source in or near the space, intrinsically-safe test equipment in any potentially flammable atmosphere, hot work permits where cutting or jointing is planned, and active management of fume from cable cutting or burning.',
    'Lone working in a confined space is not appropriate. Even where the work itself is one-person, the rescue arrangement must include at least one trained top-person and a documented means of summoning help.',
  ],
  sections: [
    {
      id: 'what-counts',
      heading: 'What Counts as a Confined Space',
      tocLabel: 'Definition',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Regulation 1(2) of the Confined Spaces Regulations 1997 defines a confined space as any place that is "substantially enclosed" and where there is a reasonably foreseeable "specified risk". The definition is hazard-led, not shape-led — a small room with a flammable atmosphere is a confined space; a large but oxygen-deficient tank is a confined space.',
        },
        {
          type: 'list',
          tone: 'warning',
          items: [
            'Serious injury arising from fire or explosion — flammable vapours, dusts, gases.',
            'Loss of consciousness arising from increased body temperature.',
            'Loss of consciousness or asphyxiation arising from gas, fume, vapour or lack of oxygen.',
            'Drowning arising from an increase in the level of a liquid.',
            'Asphyxiation arising from a free-flowing solid or the inability to reach a respirable environment due to entrapment by a free-flowing solid.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Hazard, not architecture',
          text:
            'A space is "confined" because of what could happen inside it. A walk-in basement with no ventilation and an open cable joint releasing pyrolysis fume is a confined space the moment that risk is foreseeable, even though it has a normal-size door.',
        },
        {
          type: 'paragraph',
          text:
            'For UK electricians, the spaces that most often meet the definition are: cable cellars under switchrooms, underground utility chambers and pits, service ducts and risers (depending on size and ventilation), transformer and switchgear vaults, water-storage tanks containing immersion or pump electrics, and tight plant rooms where egress is restricted by equipment or by a single small access hatch.',
        },
        {
          type: 'paragraph',
          text:
            'Riser cupboards are a judgement call. A two-metre-tall riser with normal ventilation, a standard door and no specified risk is not a confined space. A sealed riser containing battery banks with potential hydrogen build-up, or one where cable cutting will release significant fume, is.',
        },
      ],
    },
    {
      id: 'hierarchy',
      heading: 'Hierarchy of Action — Avoid Entry First',
      tocLabel: 'Avoid entry first',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Regulation 4 of the Confined Spaces Regulations 1997 is explicit: no person at work shall enter a confined space to carry out work for any purpose unless it is not reasonably practicable to achieve that purpose without such entry. The legal starting position is "do not enter".',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Can the work be done from outside the space? Lowering luminaires out of a ceiling void on a hand-line, withdrawing cable rather than entering to terminate, using remote-operated test equipment, CCTV inspection of a chamber rather than physical entry.',
            'If not, can the space be re-classified before entry? Forced ventilation, draining a tank, isolating and locking-off the upstream supply causing the hazard — all of these may remove the "specified risk" and take the space outside the CS Regs.',
            'If entry is genuinely necessary, follow the Confined Spaces Regulations 1997 procedure in full — risk assessment, safe system of work, emergency arrangements.',
            'Document the avoid-vs-enter decision. The decision not to enter is as important as the decision to enter — your [RAMS](/tools/rams-generator) should record both.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'Where entry can be avoided by use of long-reach tools, fishing rods, modular cable-pulling equipment, or by re-designing the work (terminating at an accessible point, then drawing cable back), the Regulations require you to take that route. Convenience or speed is not a defence for entering when entry could reasonably have been avoided.',
        },
      ],
    },
    {
      id: 'safe-system',
      heading: 'The Confined Spaces Regulations 1997 Procedure',
      tocLabel: 'Safe system of work',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Where entry is necessary, Regulation 4(2) requires a safe system of work, and Regulation 5 requires adequate emergency arrangements before any person enters. HSE Approved Code of Practice L101 and HSE INDG258 set out the practical components.',
        },
        {
          type: 'list',
          items: [
            'A documented risk assessment specific to this confined space, this work, this team, this day — generic assessments do not satisfy the duty.',
            'A nominated supervisor with authority to stop work, to revoke entry permission, and to initiate the rescue plan.',
            'Trained and competent operatives — confined space training appropriate to the risk (low, medium or high risk per City & Guilds 6160 or equivalent).',
            'Atmospheric testing before entry and continuous monitoring during occupancy — oxygen, flammable gases, toxic gases (CO, H2S as the space demands).',
            'Mechanical ventilation where atmospheric testing or risk assessment indicates it is needed; never use pure oxygen to ventilate.',
            'Communication — voice, line-of-sight, two-way radio, or hard-wired comms. The top-person must be in continuous contact with persons inside.',
            'Suitable PPE — typically helmet, harness with retrieval line, intrinsically-safe lighting, escape breathing apparatus (escape set), and full breathing apparatus where the atmosphere cannot be guaranteed.',
            'Permit to work — a formal permit recording the safe system of work, the people, the time window and the conditions for entry. See [permit-to-work / electrical isolation](/guides/permit-to-work-electrical-isolation).',
            'Rescue plan with rehearsed procedures, rescue equipment ready outside the space, and the emergency services notified in advance where the response is part of the plan.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'A rescue plan that relies on "calling 999" is not a rescue',
          text:
            'HSE L101 makes clear that emergency arrangements must enable rescue without depending on the public emergency services as the primary response. By the time a fire-and-rescue team arrives, an unconscious person in an oxygen-deficient chamber is almost certainly dead. The rescue arrangement must be on-site, rehearsed, and capable of immediate action.',
        },
      ],
    },
    {
      id: 'electrical-controls',
      heading: 'Electrical-Specific Controls',
      tocLabel: 'Electrical controls',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The Electricity at Work Regulations 1989 apply in full inside a confined space — Regulations 4, 12, 13, 14 and 16 are the load-bearing ones for the typical job. Layer these on top of the CS Regs procedure:',
        },
        {
          type: 'list',
          items: [
            'Isolate every electrical source in and adjacent to the confined space before entry — incoming supply, control circuits, instrumentation, anything that can re-energise. Lock-off with a personal padlock and prove dead at the point of work. See [safe isolation method statement](/guides/method-statement-safe-isolation).',
            'Treat any potentially flammable atmosphere as a Zone — intrinsically-safe (Ex i) or appropriately certified test instruments, torches, two-way radios and gas detectors only. Standard multimeters are not permitted in a flammable atmosphere.',
            'Hot work permits — any cable cutting, jointing with a blowtorch, brazing, grinding, or use of a hot air gun in a confined space requires a separate hot work permit, atmospheric re-test after the work, and a fire watch in attendance.',
            'Fume from cable cutting — PVC, XLPE and rubber cables release toxic and irritant decomposition products when cut, crimped under load, or burned. In a confined space those fumes accumulate fast. Plan for forced extraction, not just dilution.',
            'Battery rooms and battery banks — hydrogen build-up is a real risk during charging. Treat any sealed battery space as confined until proven otherwise, and use only non-sparking tools and intrinsically-safe instruments.',
            'Step potentials and earth-fault paths — buried or chamber-housed equipment can sit at non-zero potential during faults on adjacent systems. Bond appropriately and test before contact.',
            'Lighting — use 110 V CTE or 12 V SELV intrinsically-safe portable lighting; standard 230 V hand-lamps are not appropriate inside a wet, conductive confined space.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'BS 7671:2018+A4:2026 cross-references',
          text:
            'Section 706 (Restrictive Conductive Locations) of BS 7671 applies to many confined spaces that contain conductive surroundings. Where applicable it imposes additional restrictions on the use of mains-voltage portable equipment and on the protective measures permitted — SELV, electrical separation or reduced low-voltage become the practical options.',
        },
      ],
    },
    {
      id: 'rams-and-permit',
      heading: 'Writing a Compliant RAMS for Confined Space Electrical Work',
      tocLabel: 'RAMS and permit',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A confined space RAMS is not a generic document with the words "confined space" added. It must record the actual space, the actual hazards, the actual controls and the actual rescue plan — and it must be signed off and briefed to every person involved before work starts.',
        },
        {
          type: 'list',
          items: [
            'Identify the space precisely — building, level, room or chamber reference, access dimensions, internal volume, presence of free liquids, expected atmosphere.',
            'List the specified risks foreseeable in this space — not all five from the Regulations, only the ones that apply.',
            'Set out the hierarchy decision — could entry be avoided? If yes, why is it not being avoided? If no, why not?',
            'Detail the safe system of work — atmospheric test regime, ventilation, PPE, communications, supervisor name, top-person name, entrants.',
            'Set out the emergency arrangements — rescue equipment list, who triggers a rescue, mode of communication, hospital route, first-aiders on shift.',
            'Cross-reference electrical isolation — the [permit to work / safe isolation](/guides/permit-to-work-electrical-isolation) document specific to this job.',
            'Brief the team and capture signatures. Without a signed briefing the safe system of work is undocumented.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'Build the document in the Elec-Mate [RAMS Generator](/tools/rams-generator) — it has a confined space module that captures these fields, attaches photos of the space, and produces a PDF you can hand to the principal contractor or upload to the CDM file. The structure mirrors the HSE L101 ACOP layout, so reviewers can find what they expect to find. There is also a generic [electrical RAMS template](/guides/electrical-rams-template-uk) if you prefer to start from a blank.',
        },
      ],
    },
    {
      id: 'rescue',
      heading: 'Rescue Arrangements That Actually Work',
      tocLabel: 'Rescue plan',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Regulation 5 of the Confined Spaces Regulations 1997 requires "suitable and sufficient arrangements" for the rescue of any person who gets into difficulty. HSE L101 expands on what suitable and sufficient looks like. The test is not "did you have a plan?" but "would the plan have worked, on the day, with the people present?"',
        },
        {
          type: 'list',
          tone: 'success',
          items: [
            'A nominated top-person outside the space, in continuous communication with the entrant(s), trained in the rescue procedure for this space.',
            'Retrieval equipment ready — tripod and winch, harness, rescue line attached and tended. Not in the van. Not in the next room. Ready.',
            'Resuscitation equipment — at minimum a face shield and first-aid kit; for higher-risk entries, an AED and supplemental oxygen.',
            'Means of summoning further help — mobile signal confirmed, or two-way radio to a controlled location, or hard-wired phone.',
            'A rehearsed sequence — every person on the team knows what they do, in what order, in the first 60 seconds of an emergency.',
            'For higher-risk spaces, a standby rescue team on-site (not on the road) with full BA and trained in confined space rescue.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'If a colleague collapses inside a confined space, the single biggest killer of would-be rescuers is the urge to enter and help. Unplanned entry into the same hazardous atmosphere is the most common way one fatality becomes two. The rescue plan must specify that no one enters to assist until the atmosphere is re-tested, the entrant is wearing appropriate BA, and the controller has authorised entry.',
        },
      ],
    },
    {
      id: 'reporting',
      heading: 'After the Work — Records, Near-Misses and Review',
      tocLabel: 'Records and review',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Keep the permit, the RAMS, the atmospheric test record and the briefing sheet for at least the duration of the project and as long as the duty holder requires for CDM purposes. If any near-miss or deviation occurred — a gas-detector alarm, a comms failure, an unexpected hazard — record it.',
        },
        {
          type: 'list',
          items: [
            'File the signed permit and atmospheric test log with the project records.',
            'Capture any near-miss or unexpected hazard through your [near-miss reporting](/guides/near-miss-reporting-electricians) process. Confined space near-misses are a leading indicator of fatal accidents — take them seriously.',
            'Update the site-specific [CDM 2015](/guides/cdm-2015-for-electricians) file with anything the next contractor needs to know about this space.',
            'If the work confirmed live-mains hazards in or near the space, review your [working near live mains hazard control](/guides/working-near-live-mains-hazard-control) procedures.',
            'Review the RAMS for the next visit — confined spaces change, especially industrial ones. Last month\'s assessment is not this month\'s assessment.',
          ],
        },
      ],
    },
  ],
  howToHeading: 'How to plan and execute confined space electrical work',
  howToDescription:
    'A step-by-step workflow aligned to the Confined Spaces Regulations 1997, HSE L101, INDG258 and the Electricity at Work Regulations 1989. Use it alongside a properly authored RAMS and permit to work.',
  howToSteps: [
    {
      name: 'Test whether the work can be done without entry',
      text:
        'Before any entry decision, work through whether the task can be done from outside — long-reach tools, withdrawing rather than terminating in-situ, CCTV inspection, remote testing, modular cable-pulling. If the work can reasonably be done without entry, Regulation 4 requires you to take that route. Record the decision in the RAMS.',
    },
    {
      name: 'Carry out a space-specific risk assessment',
      text:
        'Identify which of the five specified risks under the Confined Spaces Regulations 1997 are foreseeable in this space — oxygen deficiency, flammable atmosphere, harmful fume, heat, drowning or engulfment. Add the electrical hazards: live conductors near the space, induced or fault potentials, hot-work fume, battery-room hydrogen, conductive surroundings (BS 7671 Section 706).',
    },
    {
      name: 'Isolate all electrical sources before any preparation',
      text:
        'Identify every electrical source in or adjacent to the space — incoming supply, control supplies, instrumentation, photovoltaic, generator backfeed, UPS. Isolate each, lock off with a personal padlock, and prove dead at the point of work using a tested-good GS38-compliant voltage indicator. Issue a formal permit to work covering the isolation.',
    },
    {
      name: 'Atmospherically test and ventilate',
      text:
        'Before any entry, test the atmosphere for oxygen, flammable gases and the toxic gases relevant to this space (CO, H2S, others as the risk assessment demands). Where the result is borderline or where the work itself will degrade the atmosphere, ventilate mechanically. Keep continuous monitoring throughout occupancy.',
    },
    {
      name: 'Brief the team and sign the permit',
      text:
        'Brief every person on the safe system of work, the rescue plan, the comms arrangement and the abort criteria. Capture signatures on the permit and the briefing sheet. No one enters until the supervisor authorises entry. Top-person remains outside, in comms, with retrieval line tended.',
    },
    {
      name: 'Execute the work and document the outcome',
      text:
        'Carry out the work under continuous atmospheric monitoring and supervisor oversight. On completion, secure isolations as needed for the next stage, re-energise under formal de-permit, file the permit and RAMS in the project record, and capture any near-miss or deviation in your reporting system.',
    },
  ],
  faqs: [
    {
      question: 'Is a domestic loft or under-floor void a confined space?',
      answer:
        'It depends on the foreseeable risks, not the size of the space. A normal pitched-roof loft with adequate ventilation, no asbestos disturbance and no specified risk is not a confined space. A sealed under-floor void where a cable joint will be made under restricted access, with limited ventilation and a foreseeable fume hazard, can fall within the Confined Spaces Regulations 1997. Apply the five "specified risks" test before you decide.',
    },
    {
      question: 'Do I always need formal confined space training to enter?',
      answer:
        'Yes if the space falls within the Confined Spaces Regulations 1997. The level of training depends on the risk — low, medium or high. City & Guilds 6160 and equivalent qualifications map to those tiers. The duty holder must satisfy themselves that every entrant and the top-person are trained to the appropriate level and that the training is current. Generic "toolbox talk" awareness is not training for entry.',
    },
    {
      question: 'Can a single electrician work in a confined space alone?',
      answer:
        'No. Even where the work itself is a one-person task, the safe system of work under the CS Regs requires a top-person outside the space in continuous communication with the entrant, and the rescue arrangement requires sufficient personnel and equipment to mount a rescue without delay. A single operative with no top-person is not a safe system of work. See also [lone working for electricians](/guides/lone-working-electricians).',
    },
    {
      question: 'What test equipment is allowed in a flammable atmosphere?',
      answer:
        'Only equipment certified for the relevant zone — typically intrinsically-safe (Ex i) instruments rated for Zone 0, Zone 1 or Zone 2 as appropriate. Standard multimeters, torches, mobile phones and two-way radios are not permitted in flammable atmospheres. If you cannot guarantee the atmosphere is non-flammable, you must either ventilate to make it so or use certified equipment throughout.',
    },
    {
      question: 'Who is the "responsible person" under the Confined Spaces Regulations 1997?',
      answer:
        'The Regulations place duties on every employer and self-employed person whose employees or own work activities involve confined space entry. On a CDM 2015 site, the principal contractor co-ordinates, but each contractor remains responsible for the safety of its own people. The site supervisor named on the permit is the operational responsible person for that entry.',
    },
    {
      question: 'How does BS 7671:2018+A4:2026 interact with the CS Regs?',
      answer:
        'BS 7671 governs the design and installation of the electrical system; the CS Regs govern entry into confined spaces. Where the two overlap, both apply in full. Section 706 of BS 7671 (Restrictive Conductive Locations) is particularly relevant — it restricts the protective measures and equipment voltages permitted inside conductive enclosures. The Electricity at Work Regulations 1989 sit above both.',
    },
    {
      question: 'Do I have to call 999 before entering a confined space?',
      answer:
        'No, but you must have a rescue plan that does not rely on 999 as the primary response. For higher-risk entries, the local fire-and-rescue service may ask to be pre-notified so they can plan their response, but that does not replace on-site rescue capability. HSE L101 is clear that suitable and sufficient emergency arrangements means on-site rescue equipment, trained personnel and a rehearsed procedure.',
    },
  ],
  relatedPages: [
    {
      href: '/tools/rams-generator',
      title: 'RAMS Generator',
      description: 'Generate a site-specific RAMS with a confined space module, atmospheric test capture and rescue plan template.',
      icon: 'FileCheck2',
      category: 'Tool',
    },
    {
      href: '/guides/electrical-rams-template-uk',
      title: 'Electrical RAMS Template (UK)',
      description: 'Generic UK RAMS structure for electrical works — start here if you are not in a confined space.',
      icon: 'ClipboardCheck',
      category: 'Guide',
    },
    {
      href: '/guides/lone-working-electricians',
      title: 'Lone Working for Electricians',
      description: 'When lone working is and is not acceptable, and the controls required when it is.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/guides/permit-to-work-electrical-isolation',
      title: 'Permit to Work — Electrical Isolation',
      description: 'How to write and operate a permit to work for electrical isolation, including handover and de-permit.',
      icon: 'FileText',
      category: 'Guide',
    },
    {
      href: '/guides/method-statement-safe-isolation',
      title: 'Method Statement — Safe Isolation',
      description: 'GS38-compliant safe isolation method statement for use ahead of any confined space electrical entry.',
      icon: 'Wrench',
      category: 'Guide',
    },
    {
      href: '/guides/working-near-live-mains-hazard-control',
      title: 'Working Near Live Mains — Hazard Control',
      description: 'Controls for work close to live mains where full isolation is not immediately practicable.',
      icon: 'Zap',
      category: 'Guide',
    },
  ],
  ctaHeading: 'Author a compliant confined space RAMS in minutes',
  ctaSubheading:
    'Elec-Mate\'s RAMS Generator includes a confined space module aligned to the Confined Spaces Regulations 1997, HSE L101 and INDG258 — risk assessment, safe system of work, permit, atmospheric test capture, rescue plan and signed briefing. Start a 7-day free trial, cancel anytime.',
};
