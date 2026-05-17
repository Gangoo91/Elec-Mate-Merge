import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Grounded in BS 7671:2018+A4:2026 (18th Edition), IET Guidance Note 3
// (Inspection & Testing, 9th Edition), the IET On-Site Guide, plus the
// CDM 2015 statutory framework and the Electricity at Work Regulations 1989.

const published = '2026-05-17';
const modified = '2026-05-17';

export const ramsForConsumerUnitReplacementConfig: GeneratedGuideConfig = {
  pagePath: '/guides/rams-for-consumer-unit-replacement',
  title:
    'RAMS for a Consumer Unit Replacement — UK Method Statement Guide | Elec-Mate',
  description:
    'Complete RAMS (Risk Assessment & Method Statement) for a UK consumer unit replacement. Hazards, control measures, safe isolation, DNO seal authority, BS 7671:2018+A4:2026 compliance (AFDD, luminaire RCD, non-combustible enclosure) and post-installation testing — written for working electricians.',
  datePublished: published,
  dateModified: modified,
  readingTime: 12,
  badge: 'Method Statement & Risk Assessment',
  badgeIcon: 'ClipboardCheck',
  breadcrumbLabel: 'RAMS for Consumer Unit Change',
  heroPrefix: 'RAMS for a',
  heroHighlight: 'Consumer Unit Replacement',
  heroSuffix: '— Method Statement & Risk Assessment',
  heroSubtitle:
    'A consumer unit replacement is one of the highest-risk routine jobs an electrician carries out — work close to the distributor\'s cut-out, total loss of supply to the customer, and a hard compliance deadline once the new board is energised. This guide walks through a fully BS 7671:2018+A4:2026 aligned RAMS: hazards specific to a board change, control measures, safe isolation procedure, the DNO seal question, PPE, A4:2026 compliance opportunities and the test sequence that produces an EIC at the end of the day.',
  keyTakeaways: [
    'A consumer unit replacement RAMS must address hazards that are specific to working at the origin of the installation — proximity to the DNO service head, total customer power-off, dust and debris, and bonding continuity disturbed mid-job.',
    'Under the Electricity at Work Regulations 1989, Regulation 14, live working is prohibited unless three tests are met. A consumer unit change is planned work — there is no justification for working live on the meter tails or the new board.',
    'You shall not cut the distributor\'s cut-out seal without prior authorisation. Notify the DNO (or supplier where the meter is sealed) and use their isolation service or temporary seal procedure — record the authority in the RAMS.',
    'Every consumer unit replacement under BS 7671:2018+A4:2026 is also a compliance opportunity: Reg 421.1.201 (non-combustible enclosure for domestic CUs), Reg 411.3.4 (RCD protection for lighting circuits where AFDD is not provided), and the A4:2026 AFDD recommendations for socket-outlets up to 32 A.',
    'The job ends with an Electrical Installation Certificate (EIC) — not a Minor Works Certificate. A CU replacement is an alteration to the distribution circuit and requires full initial verification under BS 7671 Part 6.',
    'CDM 2015 applies to most domestic CU changes the moment a second worker is on site, or any time the work is non-domestic. The principal contractor / contractor duties are not optional.',
  ],
  sections: [
    {
      id: 'why-rams',
      heading: 'Why a Consumer Unit Change Needs Its Own RAMS',
      tocLabel: 'Why this RAMS',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A generic electrical RAMS doesn\'t cover a consumer unit replacement properly. The hazards stack up at the origin of the installation: you are working a few millimetres from the un-isolated supply tails, the customer is losing all power for the day, the cabling is often old and brittle, and you have a hard deadline — the board must be back on and tested before you leave.',
        },
        {
          type: 'paragraph',
          text:
            'Under the [CDM 2015 framework](/guides/cdm-2015-for-electricians) and the Electricity at Work Regulations 1989 (EAWR), the duty holder is required to plan the work, assess the foreseeable risks and document the control measures before work begins. The Elec-Mate RAMS Generator builds a CU-specific RAMS pack in two minutes — but whether you generate it or write it yourself, the document must reflect what you will actually do on the day, not a copy-pasted template.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Domestic doesn\'t mean exempt',
          text:
            'A domestic consumer unit change is still notifiable work in England and Wales (Part P), still subject to EAWR for the electrician, and once a second person is involved (apprentice, mate, scaffolder, builder) it becomes CDM 2015 work. The RAMS is not paperwork for the file — it is the legal record of how the danger was controlled.',
        },
      ],
    },
    {
      id: 'hazards',
      heading: 'Hazards Specific to a Consumer Unit Replacement',
      tocLabel: 'Hazards',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A risk assessment is only useful when it identifies the real hazards in front of you. For a consumer unit change in a UK property the principal hazards are:',
        },
        {
          type: 'list',
          tone: 'warning',
          items: [
            'Working in close proximity to live conductors at the DNO cut-out. The service head, the meter tails between cut-out and meter, and (until the supplier isolates) the tails into the consumer unit are all live and cannot be isolated by the electrician.',
            'Inadvertent contact with un-isolated meter tails when removing the old CU enclosure — particularly if the tails are short, brittle PVC, or routed tightly against the wall.',
            'Loss of supply to the customer for several hours — vulnerable occupants (medical equipment, refrigerated medication, elderly, very young children) must be identified in advance.',
            'Disturbance of main protective bonding and the main earthing conductor during board removal — earth continuity may be broken mid-job, leaving exposed-conductive-parts unbonded.',
            'Dust, debris and asbestos risk from removing the old enclosure, especially where the back box is fixed into pre-2000 masonry or plasterboard.',
            'Working at height where the CU is mounted high on a wall, in a loft, in a cupboard with poor access, or in a stairwell.',
            'Manual handling of the new consumer unit (often 8–15 kg with components fitted) into a confined cupboard or loft hatch.',
            'Live testing during initial verification — the new board must be energised and tested before you leave, which means controlled live work under EAWR Reg 14 conditions.',
            'Fire risk if a poor termination at the meter tail connections leads to thermal runaway after re-energisation.',
            'Lone working — most domestic CU changes are single-electrician jobs, which has implications for emergency response.',
          ],
        },
      ],
    },
    {
      id: 'control-measures',
      heading: 'Control Measures',
      tocLabel: 'Control measures',
      blocks: [
        {
          type: 'paragraph',
          text:
            'For each identified hazard the RAMS must record the control measure, who is responsible, and how it will be verified on the day. The non-negotiable controls for a consumer unit replacement are:',
        },
        {
          type: 'list',
          tone: 'success',
          items: [
            'Safe isolation following the [GS38 + IET sequence](/guides/method-statement-safe-isolation): identify, isolate, lock-off, prove dead at the point of work using an approved voltage indicator, verify the voltage indicator before and after on a known live source.',
            'DNO / supplier notification if the cut-out seal must be cut — request a temporary isolation visit or an authorised seal-break, and record the reference number in the RAMS.',
            'Customer pre-notification in writing at least 48 hours in advance with the off-supply window, vulnerable-occupant questions answered, and a UPS / generator arrangement agreed for any medical equipment.',
            'Bonding continuity maintained during the change — main protective bonding and main earthing conductor either left in place at the MET or temporarily linked via a labelled, terminated conductor of equivalent CSA.',
            'PPE appropriate to the task (see section below) and an insulated mat where there is any risk of contact with the floor while working near the cut-out.',
            'Dust control — sheeting laid, hoover with HEPA filter on hand, customer\'s belongings covered or removed from under the board.',
            'Pre-work asbestos check on the substrate behind the board for pre-2000 properties.',
            'Working-at-height controls — proper step or platform, not a stack of boxes, and never on the customer\'s furniture.',
            'Mobile phone or radio for lone-worker check-ins at agreed intervals, with a nominated person who knows the address and expected finish time.',
            'A defined emergency response: nearest A&E address, what to do if the customer feels unwell during the off-supply period, location of the on-site first-aid kit.',
          ],
        },
      ],
    },
    {
      id: 'isolation',
      heading: 'Safe Isolation Procedure and the DNO Seal Question',
      tocLabel: 'Isolation & DNO seal',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The biggest single control measure for a consumer unit change is the isolation step. This is where almost every serious incident on a board change comes from — and it is the area where DIYers and inexperienced installers make the most dangerous decision: cutting the distributor\'s seal without authority.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Never cut the distributor\'s seal without authority',
          text:
            'The seal on the service cut-out and on the meter belongs to the DNO and to the supplier respectively. Cutting them without prior authority is theft of electricity and a criminal offence under the Theft Act 1968 and the Electricity Act 1989. It also voids your professional indemnity cover if anything goes wrong. The correct route is to call the DNO\'s priority services or the customer\'s supplier and request either: (a) a free isolation visit, (b) authority to cut the seal under their temporary seal procedure with a re-seal callback booked, or (c) a smart-meter remote isolation if the meter supports it.',
        },
        {
          type: 'paragraph',
          text:
            'Once the distributor has isolated upstream (or you have isolated at the main switch of the existing CU where the new board is being swapped without disturbing the tails), follow the standard safe-isolation sequence:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Identify the point of isolation — main switch on the existing CU, or upstream isolator fitted by the DNO.',
            'Switch off, withdraw any plug-in fuses, and apply a personal lock-off device and a "Danger — Do Not Switch" caution notice. The key stays in your pocket. If a customer has access to the area, brief them and barrier off.',
            'Prove your approved voltage indicator (GS38) on a known live source — a proving unit or a separate live point.',
            'Test for absence of voltage at the actual point of work — between phase and neutral, phase and earth, and neutral and earth, on every conductor you are about to disconnect.',
            'Re-prove the voltage indicator on the same known live source to confirm it is still functioning.',
            'Record the isolation in the RAMS / permit-to-work, sign and time-stamp.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'A formal [permit-to-work for electrical isolation](/guides/permit-to-work-electrical-isolation) is overkill for a single-electrician domestic CU change, but in any commercial or HMO setting it is the right paperwork — and the RAMS should reference it. For more detail on the working-near-live-mains element, see our guide on [hazard control near live mains](/guides/working-near-live-mains-hazard-control).',
        },
      ],
    },
    {
      id: 'ppe',
      heading: 'PPE for a Consumer Unit Replacement',
      tocLabel: 'PPE',
      blocks: [
        {
          type: 'paragraph',
          text:
            'PPE is the last line of defence after every other control — but a CU change has specific PPE requirements that a generic site PPE list doesn\'t cover:',
        },
        {
          type: 'list',
          items: [
            'Insulated safety footwear with an electrical hazard rating, and clean dry soles for any work close to the cut-out.',
            'Class 0 or Class 00 electrically-insulating gloves rated for 500 V working voltage, worn over thin liner gloves, for any movement near un-isolated tails.',
            'Safety glasses with side shields — the risk of an arc flash during a fault on re-energisation is small but the consequence is severe.',
            'Arc-rated long-sleeve top for any work close to the service head where un-isolated conductors are within arm\'s reach.',
            'FFP3 dust mask where the existing back box is fixed into pre-2000 masonry or where the customer\'s board sits in a dusty cupboard.',
            'Head protection where the CU is mounted in a loft, low-headroom cupboard or under stairs.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'PPE doesn\'t replace isolation',
          text:
            'Class 0 gloves are a backstop. They are not an authorisation to work live. Under EAWR Reg 14 the work must be dead unless live working is unavoidable, the person is competent for live work, and suitable precautions are in place. A consumer unit replacement does not meet the Reg 14 test for live working.',
        },
      ],
    },
    {
      id: 'a4-compliance',
      heading: 'A4:2026 Compliance — Every CU Change is a Compliance Opportunity',
      tocLabel: 'A4:2026 compliance',
      blocks: [
        {
          type: 'paragraph',
          text:
            'BS 7671:2018+A4:2026 came into force during 2026 and a consumer unit replacement is the one job where you have full design control over the new installation. The RAMS should reference these compliance points so the customer is aware the new board will exceed the bare minimum:',
        },
        {
          type: 'list',
          items: [
            'Reg 421.1.201 — consumer units and similar switchgear assemblies in domestic premises shall have their enclosure manufactured from non-combustible material (typically steel). This means the old plastic CU comes out and a steel-enclosed board goes in. See our [EICR plastic consumer unit in HMO guide](/guides/eicr-plastic-consumer-unit-hmo) for the wider context.',
            'Reg 411.3.4 — additional protection by an RCD not exceeding 30 mA shall be provided for lighting circuits in domestic (household) premises. The A4:2026 wording aligns with the new AFDD recommendations. See [A4:2026 luminaire RCD protection](/guides/bs-7671-a4-2026-luminaire-rcd-protection) for the full text and acceptance criteria.',
            'AFDD recommendations under A4:2026 — arc fault detection devices are now recommended for final circuits supplying socket-outlets rated up to 32 A in higher-risk premises (HMOs, care homes, student accommodation, premises with combustible construction). See [A4:2026 AFDD changes](/guides/bs-7671-a4-2026-afdd-changes) for the precise scope.',
            'Reg 526.1 — every connection between conductors and equipment shall provide durable electrical continuity and adequate mechanical strength and protection. At the new board this means torqued-to-spec terminations on every line, neutral and earth, and a recorded torque value on the EIC.',
            'Surge Protection Device (SPD) — Section 443 requirements continue under A4:2026; an SPD shall normally be installed in domestic premises unless the risk assessment justifies omission and the customer accepts the omission in writing.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Quote the compliance up front',
          text:
            'A surprising number of customer disputes after a CU change are about the price difference between a like-for-like swap and a full A4:2026-compliant board (with AFDDs, SPD, and metal enclosure). Quote the compliant board first, note the per-line cost of each compliance item, and let the customer decline in writing if they want a cheaper option — this protects you on both EAWR and the consumer contract.',
        },
      ],
    },
    {
      id: 'test-sequence',
      heading: 'Post-Installation Test Sequence and the EIC',
      tocLabel: 'Test sequence & EIC',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A consumer unit replacement is an alteration to the distribution circuit at the origin of the installation. Under BS 7671 Part 6 it requires full initial verification — not a Minor Works Certificate. The output document is an Electrical Installation Certificate (EIC) signed by the designer, constructor and inspector (often all the same competent person on a domestic job).',
        },
        {
          type: 'paragraph',
          text:
            'The test sequence on a CU change follows BS 7671 Reg 643 and IET GN3 Section 2. Dead tests first, then live tests after energisation:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Continuity of protective conductors (R1+R2 on every final circuit, plus continuity of main protective bonding).',
            'Continuity of ring final circuit conductors (line, neutral and CPC end-to-end and cross-connected).',
            'Insulation resistance — between line conductors and earth, and between line and neutral, at 500 V DC, with electronic equipment disconnected or tested at 250 V where damage is a concern.',
            'Polarity dead — confirm correct connection of every line conductor at every accessory.',
            'Earth electrode resistance where the earthing arrangement is TT (not common on a CU replacement unless the supply earth has been refused).',
            'Energise the installation (this is the live-working step — controlled, brief, with no terminations being touched while live).',
            'Earth fault loop impedance (Zs) at every final circuit, recorded on the schedule of test results, with the measured value plus the calculated maximum from Table 41.x.',
            'Prospective fault current at the origin (Ipf).',
            'RCD operating-time tests at the rated 1× and 5× residual operating currents, including the supplementary 6 mA DC test for Type A/B RCDs as required.',
            'Functional testing of every protective device (RCD test button, AFDD self-test, main switch operation).',
            'Phase sequence on three-phase installations.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'Every result lands on the schedule of test results, which is appended to the EIC. The customer receives the EIC and a copy is retained for six years for liability cover. Generate the EIC digitally with the [Elec-Mate EIC Certificate tool](/tools/eic-certificate) — it auto-populates the schedule columns updated under A4:2026 and exports a Building Regulations Part P compliant PDF.',
        },
      ],
    },
  ],
  howToHeading: 'How to work through the consumer unit replacement RAMS on the day',
  howToDescription:
    'A condensed five-step sequence that maps the RAMS to the on-site reality. Use this as your final pre-start check before tools come out of the van.',
  howToSteps: [
    {
      name: 'Pre-arrival checks and DNO authority',
      text:
        'Confirm the customer is expecting you, the off-supply window is agreed in writing, no vulnerable occupants are at risk, and the DNO / supplier has either authorised seal-break or scheduled an isolation visit. Confirm the new CU specification matches the quote (metal enclosure, AFDDs / RCBOs to A4:2026, SPD if specified).',
    },
    {
      name: 'Walk the job and verify the RAMS still applies',
      text:
        'On arrival, confirm the working environment matches the assumptions in the RAMS — access, cupboard size, distance to the cut-out, condition of the meter tails, asbestos signs, vulnerable occupants. If anything is different, update the RAMS on the spot before any work starts.',
    },
    {
      name: 'Isolate, lock off and prove dead',
      text:
        'Carry out the full safe-isolation sequence at the agreed point of isolation. Lock off, apply the caution notice, prove the voltage indicator on a known live source, test for absence of voltage at the point of work, re-prove the voltage indicator, sign and time-stamp the RAMS.',
    },
    {
      name: 'Remove, install, maintain bonding',
      text:
        'Remove the existing board, maintaining bonding continuity throughout (link the main protective bonding and main earthing conductor at the MET via a temporary terminated conductor if the MET is being moved). Install the new enclosure, dress the meter tails, terminate every conductor to the recorded torque value, label every circuit.',
    },
    {
      name: 'Energise, full initial verification, EIC',
      text:
        'Carry out every dead test, energise carefully, complete every live test, run every protective device through its functional test. Issue the EIC and schedule of test results, hand over the customer pack, register the work under Part P. File the RAMS, EIC and DNO authority reference together for the six-year retention period.',
    },
  ],
  faqs: [
    {
      question: 'Can I cut the DNO seal on the cut-out if it\'s the only way to isolate?',
      answer:
        'No. The seal belongs to the distributor and cutting it without authority is a criminal offence and a breach of your professional terms. Phone the DNO before the job and request either a free isolation visit, authority to cut the seal under their temporary seal procedure (you re-seal afterwards or they callback to re-seal), or — on a smart meter — a remote isolation. Record the authority reference number in the RAMS. If the DNO refuses or can\'t attend in time, the job is rescheduled. There is no shortcut here.',
    },
    {
      question: 'Do I need a separate RAMS for every CU change, or can I reuse one?',
      answer:
        'You need a job-specific RAMS for every job. The structure can be reused (hazards, control measures, isolation procedure, PPE, test sequence are similar across CU changes) but the site-specific details — vulnerable occupants, DNO authority reference, access, asbestos check result, lone-worker contact — must be unique to the day. The Elec-Mate RAMS Generator handles this in two minutes by taking the address and customer details and pre-filling the standard sections, leaving you to confirm the site-specific facts. Generic copy-pasted RAMS without site detail will not stand up to an HSE inspection or a court challenge.',
    },
    {
      question: 'Is a consumer unit change a Minor Works job?',
      answer:
        'No. A consumer unit replacement is an alteration to the distribution circuit at the origin of the installation. It requires full initial verification under BS 7671 Part 6 and an Electrical Installation Certificate (EIC), not a Minor Works Certificate. The Minor Works form is for additions or alterations to an existing circuit that do not involve a new circuit — it doesn\'t cover changing the board itself.',
    },
    {
      question: 'Does the new board have to be metal under A4:2026?',
      answer:
        'In domestic premises, yes — Reg 421.1.201 of BS 7671:2018+A4:2026 requires consumer units and similar switchgear assemblies to have an enclosure manufactured from non-combustible material. In practice every UK manufacturer now supplies steel enclosures as standard for domestic CUs. The old plastic boards that triggered Reg 421.1.201 in the first place are coded under EICR as C3 (improvement recommended) or C2 (potentially dangerous) depending on context — see the [EICR plastic consumer unit in HMO guide](/guides/eicr-plastic-consumer-unit-hmo) for the coding rules.',
    },
    {
      question: 'How do I keep the main earthing conductor connected while changing the board?',
      answer:
        'Two options. The cleanest is to mount the new Main Earthing Terminal (MET) before disconnecting the old one, terminate the existing main earthing conductor and main protective bonding into the new MET, then move circuits one at a time. The alternative — where the MET is being relocated — is to fit a temporary terminated link of equivalent CSA between the existing earthing conductor and the new MET position, label it, and remove it only once every circuit CPC is reterminated. Never leave the installation with the main earthing conductor disconnected from the MET while exposed-conductive-parts are still energised or accessible.',
    },
    {
      question: 'Does CDM 2015 actually apply to a one-day domestic CU change?',
      answer:
        'Yes, as soon as there is more than one worker on site (apprentice, mate, scaffolder) or the work lasts more than one day, CDM 2015 applies in full — the client must be informed of their duties, a principal contractor appointed where there is more than one contractor, and the construction phase plan written. For a single-electrician one-day domestic job, the contractor duties under Reg 8–12 still apply: plan the work, assess the risks, brief the workforce (i.e. you), and provide the welfare arrangements. The RAMS is the document that evidences you did this. See the [CDM 2015 for electricians guide](/guides/cdm-2015-for-electricians) for the full duty-holder map.',
    },
    {
      question: 'What goes wrong most often on a CU change RAMS?',
      answer:
        'In order of frequency: (1) the RAMS doesn\'t mention the DNO authority for the seal because the electrician planned to "just cut it" — high legal risk; (2) vulnerable occupants are not identified before the off-supply window, leading to medical-equipment emergencies; (3) bonding continuity is not addressed and the main earthing conductor is left disconnected for an hour; (4) the test sequence is documented as "tested and working" rather than line-by-line on the schedule of test results; (5) the RAMS is the same template as every other job and bears no relation to the site. Pulling a CU-specific RAMS in two minutes from the [Elec-Mate RAMS Generator](/tools/rams-generator) avoids all five.',
    },
  ],
  relatedPages: [
    {
      href: '/tools/rams-generator',
      title: 'RAMS Generator',
      description:
        'Build a CU-specific Risk Assessment & Method Statement in two minutes — pre-filled hazards, control measures and PPE, exported as a signed PDF.',
      icon: 'ClipboardCheck',
      category: 'Tool',
    },
    {
      href: '/tools/eic-certificate',
      title: 'EIC Certificate Tool',
      description:
        'Digital Electrical Installation Certificate aligned to BS 7671:2018+A4:2026 — full initial verification workflow, schedule of test results, PDF export.',
      icon: 'FileCheck2',
      category: 'Tool',
    },
    {
      href: '/guides/method-statement-safe-isolation',
      title: 'Safe Isolation Method Statement',
      description:
        'The full GS38 + IET safe-isolation sequence — what to include in the method statement and how to evidence each step.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/guides/bs-7671-a4-2026-luminaire-rcd-protection',
      title: 'A4:2026 Luminaire RCD Protection (Reg 411.3.4)',
      description:
        '30 mA RCD additional protection for lighting circuits in domestic premises under A4:2026 — when it applies and the AFDD interaction.',
      icon: 'Zap',
      category: 'Guide',
    },
    {
      href: '/guides/bs-7671-a4-2026-afdd-changes',
      title: 'A4:2026 AFDD Changes',
      description:
        'What A4:2026 changed for arc fault detection devices — scope of recommendation, premises types, and CU specification impact.',
      icon: 'AlertTriangle',
      category: 'Guide',
    },
    {
      href: '/guides/cdm-2015-for-electricians',
      title: 'CDM 2015 for Electricians',
      description:
        'When CDM applies to electrical work, the contractor / principal-contractor duties, and how the RAMS evidences compliance.',
      icon: 'BookOpen',
      category: 'Guide',
    },
  ],
  ctaHeading: 'Generate a CU-specific RAMS in two minutes',
  ctaSubheading:
    'The Elec-Mate RAMS Generator builds a consumer-unit-replacement Risk Assessment & Method Statement with the right hazards, control measures, isolation procedure, PPE, A4:2026 compliance notes and test sequence — pre-filled, site-specific, signed and exported as PDF. Start your 7-day free trial; cancel anytime.',
};
