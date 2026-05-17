import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Grounded in the Work at Height Regulations 2005, HSE guidance
// INDG401, the Construction (Design and Management) Regulations 2015,
// BS 7671:2018+A4:2026 (18th Edition) and the Electricity at Work
// Regulations 1989.

const published = '2026-05-17';
const modified = '2026-05-17';

export const workingAtHeightElectriciansConfig: GeneratedGuideConfig = {
  pagePath: '/guides/working-at-height-electricians',
  title:
    'Working at Height for UK Electricians — Procedure & Compliance | Elec-Mate',
  description:
    'Working at height guide for UK electricians: hierarchy of control, ladders, towers, MEWPs, harnesses, PASMA / IPAF training, and the Work at Height Regulations 2005. Practical procedure for high-bay luminaires, loft and roof work, solar PV and HV switchroom access.',
  datePublished: published,
  dateModified: modified,
  readingTime: 12,
  badge: 'Site Safety Guide',
  badgeIcon: 'ShieldCheck',
  breadcrumbLabel: 'Working at Height — Electricians',
  heroPrefix: 'Working at Height for',
  heroHighlight: 'UK Electricians',
  heroSuffix: '— Procedure & Compliance',
  heroSubtitle:
    'Most electrical work happens at some sort of height — luminaires, ceiling roses, cable tray, lofts, roofs, HV switchroom panels and solar PV arrays. This guide explains the Work at Height Regulations 2005 as they apply to electricians, the hierarchy of control, the equipment and training you need (PASMA, IPAF, ladder association), and how to document it inside a RAMS that will pass a site induction.',
  keyTakeaways: [
    'The Work at Height Regulations 2005 apply to work at any height where a fall is liable to cause injury — there is no statutory minimum height and the old "2 metre rule" was withdrawn.',
    'The hierarchy of control is fixed: AVOID work at height where reasonably practicable, PREVENT falls using collective measures (scaffold, tower, MEWP, guard rails), and only then MITIGATE with personal fall protection (harness and lanyard).',
    'Stepladders are permitted for short-duration light work but are not the default — a podium step, tower or MEWP is usually the correct choice for electrical second fix at ceiling height.',
    'Mobile access towers (BS EN 1004) must be erected by a competent person — typically PASMA-trained. MEWPs (scissor, cherry-picker, boom) require an IPAF PAL card for the category being operated.',
    'A written risk assessment and method statement (RAMS) is required on most commercial and construction sites; it must address access, fall distance, rescue plan, dropped-tool control and any electrical risk under EAWR 1989.',
    'Solo working at height on a ladder above a certain height or duration is rarely defensible — pair the work-at-height risk assessment with your lone working procedure.',
  ],
  sections: [
    {
      id: 'wah-scope',
      heading: 'What "Working at Height" Means for Electricians',
      tocLabel: 'Scope',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The Work at Height Regulations 2005 define "work at height" as work in any place where, if precautions were not taken, a person could fall a distance liable to cause personal injury. There is no statutory minimum height — the old "2 metre rule" was withdrawn when the regulations were introduced. A fall from a low platform onto a concrete floor with exposed re-bar can be as serious as a fall from a roof.',
        },
        {
          type: 'paragraph',
          text:
            'For electricians, that means almost everything above floor level is covered: changing a ceiling rose from a stepladder, installing a high-bay LED on a podium step, running containment along a cable tray from a tower, accessing a loft for cable routing, working on a flat roof for an aerial or lightning protection conductor, terminating string cables on a rooftop solar PV array, or opening a top-mounted HV switchgear panel in a substation.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Two regulatory frameworks overlap',
          text:
            'Most electrical work at height engages BOTH the Work at Height Regulations 2005 (the fall hazard) AND the Electricity at Work Regulations 1989 (the electrical hazard). Your safe system of work must address both — for example, ladder access to a live switchroom is rarely acceptable because escape from a shock or arc-flash event is severely restricted.',
        },
      ],
    },
    {
      id: 'hierarchy-of-control',
      heading: 'The Hierarchy of Control — Avoid, Prevent, Mitigate',
      tocLabel: 'Hierarchy of control',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The Work at Height Regulations 2005 and HSE INDG401 set a strict three-step hierarchy that every dutyholder must work through, in order, before selecting equipment:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'AVOID — can the work be done from the ground? Drop the luminaire on a winch, use a lighting trolley with telescopic pole, pre-fabricate a containment run at bench height before lifting it into place.',
            'PREVENT — if work at height is unavoidable, choose a workplace that already has collective fall protection: an existing platform with guard rails, a permanent walkway, a scissor lift with cage, a mobile tower with toe-boards and double guard rail, or a properly designed scaffold.',
            'MITIGATE — only where prevention is not reasonably practicable, use personal fall protection: a harness and lanyard connected to a rated anchor, with a rescue plan in place.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Stepladder is not the default',
          text:
            'Industry custom has electricians reaching for a stepladder by reflex. The regulations do not prohibit ladders, but a ladder is only acceptable for short-duration light work where the risk assessment shows a tower, podium or MEWP is not reasonably practicable. "I have always used a ladder" is not a defence after an accident.',
        },
        {
          type: 'paragraph',
          text:
            'A documented RAMS — see the [Elec-Mate RAMS Generator](/tools/rams-generator) and the [Electrical RAMS template](/guides/electrical-rams-template-uk) — should record exactly which step of the hierarchy you reached and why the steps above it were not reasonably practicable.',
        },
      ],
    },
    {
      id: 'equipment',
      heading: 'Equipment — Ladders, Podiums, Towers, MEWPs, Harnesses',
      tocLabel: 'Equipment',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The right access equipment depends on duration, height, the load you need to lift, the floor surface, and whether you are working live or near live equipment. A practical electrician-focused summary:',
        },
        {
          type: 'list',
          items: [
            'Stepladders and leaning ladders — must conform to BS EN 131 Professional. Pre-use checks every shift (feet, stiles, treads, locking bars). Three points of contact, no overreaching, no working off the top three rungs. Acceptable for short-duration light work (a rule of thumb is 30 minutes or less, with the user being able to hold on with one hand).',
            'Podium steps and platforms — guard-railed working platforms with a small footprint. The preferred replacement for stepladders on most commercial second fix because they free both hands and remove overreach.',
            'Mobile access towers (BS EN 1004) — erected by a PASMA-trained operative using the manufacturer\'s instruction. Inspected before first use, after alteration, after any event likely to affect stability, and at intervals not exceeding seven days where in use. Recorded on the tower inspection tag.',
            'Mobile elevating work platforms (MEWPs) — scissor lifts, vertical masts, boom lifts and cherry-pickers. The operator must hold an IPAF PAL card for the relevant category. A documented rescue plan is required for boom lifts in case the operator becomes incapacitated at height.',
            'Personal fall protection — harness, lanyard, energy absorber and anchor. A full-body harness conforming to BS EN 361 with a lanyard to BS EN 354 and an energy absorber to BS EN 355. The anchor must be rated and verified. Fall arrest requires a documented rescue plan — suspension trauma can kill within minutes.',
            'Roof ladders, crawl boards, edge protection — required for any work on a fragile or pitched roof, including solar PV install and aerial work.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Conductive ladders near live equipment',
          text:
            'Aluminium ladders adjacent to live overhead lines, exposed busbars or open switchgear are a serious electrical risk under EAWR 1989. A non-conductive (fibreglass / GRP) ladder rated for electrical work is the correct choice anywhere conductive contact with live parts is foreseeable, including substations and on-roof PV DC isolators.',
        },
      ],
    },
    {
      id: 'electrician-scenarios',
      heading: 'Common Electrician Scenarios',
      tocLabel: 'Common scenarios',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The same hierarchy applies across every job, but each scenario has its own typical answer. A few worked examples:',
        },
        {
          type: 'list',
          items: [
            'High-bay luminaire replacement in a warehouse — scissor lift with cage. A tower is acceptable for a single fitting in low-traffic areas. A ladder is almost never defensible for a high-bay because of duration and the load of the fitting.',
            'Ceiling-mounted fittings in a commercial fit-out — podium step or low tower. Stepladder only for the briefest of swaps where the location prevents a podium from being positioned.',
            'Loft work for cable routing or smoke alarm install — boarded loft with light, head clearance assessed, no walking on the joists or plasterboard ceiling, crawl boards if necessary. Treat as confined-space-adjacent if the loft is hot, dusty or poorly ventilated.',
            'Solar PV install on a pitched roof — perimeter scaffold with guard rail and toe-board is the standard arrangement. A roof ladder, dedicated edge protection and harness-and-anchor system is the minimum where scaffold is not reasonably practicable. Separate [RAMS for solar PV install](/guides/rams-for-solar-pv-installation) addresses the DC electrical risk in addition to the fall risk.',
            'Aerial, satellite or lightning protection on a chimney or roof apex — scaffold or MEWP. Harness work from a roof ladder is a last resort and requires a rescue plan.',
            'Switchroom and HV substation work — never on a ladder. A platform or podium with the panel isolated, locked off and proved dead under a permit-to-work. See [permit to work for electrical isolation](/guides/permit-to-work-electrical-isolation).',
            'High-level containment along cable tray — mobile tower for short sections, scaffold or MEWP for long runs. Pre-fabricate at bench height where reasonably practicable to reduce time at height.',
          ],
        },
      ],
    },
    {
      id: 'training-competence',
      heading: 'Training & Competence',
      tocLabel: 'Training',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The Work at Height Regulations 2005 require that any person carrying out work at height is competent, or if being trained, is supervised by a competent person. "Competent" means having the necessary skills, knowledge and experience for the equipment in use. The accepted industry routes are:',
        },
        {
          type: 'list',
          items: [
            'PASMA (Prefabricated Access Suppliers\' and Manufacturers\' Association) — mobile access tower erection, alteration, dismantle and inspection. Card normally valid for five years.',
            'IPAF (International Powered Access Federation) — MEWP operator training, by category (1a/1b/3a/3b). PAL card valid for five years.',
            'Ladder Association training — ladder user and ladder inspector courses. The Ladder Association maintains a register of trained inspectors.',
            'Working at Height awareness — most CSCS / ECS card schemes assume the holder has received working-at-height instruction as part of their core safety induction.',
            'Harness and rescue training — site-specific. A harness is only useful with a rescue plan; rescue from suspension is a separate competency.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Record training in your H&S records',
          text:
            'Site inductions routinely ask for evidence of PASMA / IPAF / ladder association tickets, RAMS for the planned activity, and insurance. Keep digital copies on the phone — Elec-Mate stores them against your profile and pulls them automatically into the RAMS pack.',
        },
      ],
    },
    {
      id: 'documentation',
      heading: 'Documentation — RAMS, Inspection, CDM',
      tocLabel: 'Documentation',
      blocks: [
        {
          type: 'paragraph',
          text:
            'On any commercial site, principal contractor or domestic-with-CDM job, the working-at-height activity must be documented. The minimum paper trail is:',
        },
        {
          type: 'list',
          items: [
            'Risk assessment — identifies the fall hazard, the persons at risk, existing control measures, residual risk and any further controls required.',
            'Method statement — sets out the safe sequence of work: who, what, where, when, how, with which equipment, and what to do if something goes wrong (the rescue plan).',
            'Inspection records — tower inspection tag (PASMA "Scafftag" or equivalent), MEWP pre-use check, ladder pre-use check, harness annual inspection certificate.',
            'CDM 2015 documentation — for notifiable projects, the construction phase plan should reference the working-at-height arrangements; the principal designer and principal contractor have specific duties. See [CDM 2015 for electricians](/guides/cdm-2015-for-electricians).',
            'Site induction — most sites will not allow first-day access to height without sight of RAMS, training cards and insurance. See [site induction for electrical contractors](/guides/site-induction-electrical-contractors).',
            'Permit to work — required where the work is on live or recently-live electrical equipment at height. See [method statement for safe isolation](/guides/method-statement-safe-isolation).',
          ],
        },
        {
          type: 'paragraph',
          text:
            'Electricians often work alone at height for short jobs. Pair this guide with the [lone working procedure for electricians](/guides/lone-working-electricians) — solo ladder work above a meaningful height should trigger a check-in / check-out call with a second person and a rescue plan.',
        },
      ],
    },
    {
      id: 'enforcement',
      heading: 'Enforcement & Consequences',
      tocLabel: 'Enforcement',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Falls from height remain the single largest cause of workplace fatality in the UK construction sector. HSE inspectors prioritise working-at-height enforcement on site visits, and the penalties for non-compliance are severe:',
        },
        {
          type: 'list',
          tone: 'warning',
          items: [
            'Prohibition Notice — HSE can stop the work immediately if a serious risk of injury is identified. The notice stays in force until the breach is remedied.',
            'Improvement Notice — requires the employer or contractor to remedy a breach within a specified period (usually 21 days minimum).',
            'Prosecution — both the company and the individual responsible can be prosecuted under the Health and Safety at Work etc Act 1974 and the Work at Height Regulations 2005. Unlimited fines in the Crown Court; custodial sentences are possible for the most serious offences.',
            'Civil liability — a worker injured in a fall can claim damages against the employer; failure to follow the regulations or the company\'s own RAMS is normally fatal to the defence.',
            'Insurance impact — most public liability and employer\'s liability policies require compliance with relevant statutory duties; a serious breach can void cover.',
          ],
        },
      ],
    },
  ],
  howToHeading: 'How to plan a work-at-height task — step by step',
  howToDescription:
    'A repeatable mini-procedure to run through before every job that puts an electrician above floor level. It is the practical implementation of the Work at Height Regulations 2005 hierarchy of control.',
  howToSteps: [
    {
      name: 'Survey the task and the workplace',
      text:
        'Identify what work is being done, the height, the duration, the floor surface, the working environment (temperature, weather, lighting), nearby live electrical equipment, the public, and any restrictions on access. Photograph the area for the RAMS pack.',
    },
    {
      name: 'Apply the hierarchy — Avoid, Prevent, Mitigate',
      text:
        'Ask: can the work be done from the ground? If not, can we use a workplace with collective fall protection (existing platform, tower, MEWP, scaffold)? Only if neither is reasonably practicable, plan to use personal fall protection (harness and anchor with rescue plan).',
    },
    {
      name: 'Select the right equipment for the duration and load',
      text:
        'Stepladder only for short-duration light work. Podium for hands-free second fix at ceiling height. Tower for cable tray runs and high-bay work. MEWP for warehouse and large commercial. Scaffold for roof work. Match the BS EN class to the task.',
    },
    {
      name: 'Verify competence and inspection records',
      text:
        'Confirm the operative is trained for the equipment in use — PASMA for towers, IPAF PAL for MEWPs, ladder association for ladder inspectors. Check the tower Scafftag, the MEWP pre-use checklist, the harness annual inspection and the ladder pre-use check.',
    },
    {
      name: 'Write the RAMS and the rescue plan',
      text:
        'Document the safe system of work in a method statement, with the residual risks and controls in the risk assessment. Where harness or boom MEWP is used, include a specific rescue plan — who rescues the worker, by what means, in what timescale. Generate the RAMS via the Elec-Mate RAMS Generator.',
    },
    {
      name: 'Brief the team and review on the day',
      text:
        'Walk through the RAMS with everyone working at height before starting. Re-check weather (wind speed for towers and MEWPs), site conditions and any changes. Inspect the equipment again at the point of use. Sign the RAMS toolbox-talk sheet.',
    },
  ],
  faqs: [
    {
      question: 'Is there a minimum height at which the Work at Height Regulations 2005 apply?',
      answer:
        'No. The regulations apply to any work where, if precautions were not taken, a person could fall a distance liable to cause personal injury. The old "2 metre rule" was withdrawn when the 2005 regulations came in. A fall from a low platform onto an unforgiving surface can be just as serious as a fall from a roof.',
    },
    {
      question: 'Can I still use a stepladder as an electrician?',
      answer:
        'Yes — the regulations do not ban ladders. Stepladders can be used for short-duration light work where the risk assessment shows that a tower, podium or MEWP is not reasonably practicable. The ladder must conform to BS EN 131 Professional, be inspected before use, used with three points of contact, and not used as a workbench. For most modern commercial second fix the better choice is a podium step.',
    },
    {
      question: 'Do I need PASMA to erect a mobile access tower?',
      answer:
        'You need to be a competent person, and PASMA is the standard industry route for proving that competence. The Work at Height Regulations 2005 say towers must be erected by, or under the supervision of, a competent person to the manufacturer\'s instructions. Towers must also be inspected at intervals not exceeding seven days while in use, after any alteration, and after any event likely to affect stability.',
    },
    {
      question: 'When do I need a harness rather than collective fall protection?',
      answer:
        'Only when collective protection (guard rails, scaffold, tower, MEWP cage) is not reasonably practicable. Personal fall protection is the last step in the hierarchy. If you do use a harness, you must use an energy-absorbing lanyard to a rated anchor, and you must have a rescue plan — suspension trauma can cause loss of consciousness within minutes. A harness without a rescue plan is not a safe system of work.',
    },
    {
      question: 'What\'s the difference between PASMA and IPAF?',
      answer:
        'PASMA covers mobile access towers — assembly, alteration, dismantle and inspection of prefabricated tower scaffold. IPAF covers mobile elevating work platforms (MEWPs) — scissor lifts, booms, vertical masts and cherry-pickers — and issues the PAL card by category (1a, 1b, 3a, 3b). They are not interchangeable; you need the right ticket for the right equipment.',
    },
    {
      question: 'Does working at height get covered in a standard RAMS?',
      answer:
        'Yes — a complete electrical RAMS must address work at height whenever the task involves it. The risk assessment identifies the fall hazard and the controls, and the method statement sets out the safe sequence of work and the rescue plan. The Elec-Mate RAMS Generator includes a working-at-height module that pulls in the right hierarchy, the right equipment selection and the right rescue text for the job you have selected.',
    },
  ],
  relatedPages: [
    {
      href: '/tools/rams-generator',
      title: 'RAMS Generator',
      description: 'Generate a site-ready risk assessment and method statement with a built-in working-at-height module, signed and timestamped.',
      icon: 'Wrench',
      category: 'Tool',
    },
    {
      href: '/guides/electrical-rams-template-uk',
      title: 'Electrical RAMS Template (UK)',
      description: 'Free template covering the standard sections of an electrical RAMS — including work at height, isolation and emergency arrangements.',
      icon: 'FileText',
      category: 'Guide',
    },
    {
      href: '/guides/lone-working-electricians',
      title: 'Lone Working for Electricians',
      description: 'Solo working procedure, check-in/check-out and the overlap with work-at-height risk for one-person jobs.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/guides/rams-for-solar-pv-installation',
      title: 'RAMS for Solar PV Installation',
      description: 'Roof access, edge protection, DC isolation and PV-specific working-at-height controls.',
      icon: 'Zap',
      category: 'Guide',
    },
    {
      href: '/guides/cdm-2015-for-electricians',
      title: 'CDM 2015 for Electricians',
      description: 'How the Construction (Design and Management) Regulations 2015 interact with the Work at Height Regulations on notifiable projects.',
      icon: 'Building2',
      category: 'Guide',
    },
    {
      href: '/guides/permit-to-work-electrical-isolation',
      title: 'Permit to Work for Electrical Isolation',
      description: 'Required where work at height also involves live or recently-live electrical equipment — substations, switchrooms and HV panels.',
      icon: 'ClipboardCheck',
      category: 'Guide',
    },
  ],
  ctaHeading: 'Generate a working-at-height RAMS in minutes',
  ctaSubheading:
    'The Elec-Mate RAMS Generator builds a site-ready risk assessment and method statement with the right working-at-height controls for the equipment, duration and electrical risk on the job — signed, timestamped and ready for site induction. 7-day free trial, cancel anytime.',
};
