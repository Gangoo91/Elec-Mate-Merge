import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Grounded in the Construction (Design and Management) Regulations 2015
// (CDM 2015), HSE Approved Code of Practice L153, BS 7671:2018+A4:2026
// (18th Edition) and the Electricity at Work Regulations 1989.

const published = '2026-05-17';
const modified = '2026-05-18';

export const cdm2015ForElectriciansConfig: GeneratedGuideConfig = {
  pagePath: '/guides/cdm-2015-for-electricians',
  title: 'CDM 2015 for Electricians — UK Compliance Guide | Elec-Mate',
  description:
    'CDM 2015 explained for UK electricians: who carries which duty, when CDM applies to electrical work, pre-construction information…',
  datePublished: published,
  dateModified: modified,
  readingTime: 12,
  badge: 'CDM 2015 Compliance Guide',
  badgeIcon: 'ShieldCheck',
  breadcrumbLabel: 'CDM 2015 for Electricians',
  heroPrefix: 'CDM 2015 for',
  heroHighlight: 'Electricians',
  heroSuffix: '— UK Compliance Guide',
  heroSubtitle:
    'CDM 2015 applies to almost every job an electrician does — from a single-trade rewire in an occupied home to a multi-contractor commercial fit-out. This guide explains the duties that fall on you as a contractor, when a Construction Phase Plan and HSE F10 notification are required, and the documents (RAMS, induction, permit-to-work) you should have in place to demonstrate compliance.',
  keyTakeaways: [
    'CDM 2015 is the Construction (Design and Management) Regulations 2015 — the principal health and safety framework for construction work in Great Britain. It applies whether the project lasts a day or a year.',
    'CDM places duties on six dutyholders: Client, Principal Designer, Principal Contractor, Designer, Contractor and Worker. Most electricians act as a Contractor (Reg 15) and, on single-trade jobs, also indirectly carry Client and Principal Contractor obligations.',
    'A Construction Phase Plan is required for every construction project — yes, even small ones. The size and detail scale with the risk, but the document itself is not optional.',
    'A project is notifiable to the HSE (via Form F10) when it will last more than 30 working days AND have more than 20 workers on site simultaneously, OR will exceed 500 person-days of construction work.',
    'On domestic projects, Regulation 7 transfers the Client duties to the Contractor (or to the Principal Contractor / Principal Designer where appointed) by default — the homeowner does not become a CDM dutyholder unless they choose to.',
    'HSE Approved Code of Practice L153 ("Managing health and safety in construction") is the practical guidance you should treat as the working standard for CDM 2015 compliance.',
  ],
  sections: [
    {
      id: 'what-is-cdm',
      heading: 'What CDM 2015 Is',
      tocLabel: 'What CDM 2015 is',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The Construction (Design and Management) Regulations 2015 ("CDM 2015") are the principal set of health and safety regulations governing construction work in Great Britain. They are enforced by the Health and Safety Executive (HSE) and replaced CDM 2007 on 6 April 2015. The detailed practical guidance sits in HSE Approved Code of Practice L153, "Managing health and safety in construction".',
        },
        {
          type: 'paragraph',
          text:
            'CDM 2015 is deliberately broad in scope. "Construction work" includes alteration, conversion, fitting-out, commissioning, renovation, repair, upkeep, redecoration, maintenance involving a structural element, decommissioning, demolition and dismantling. The vast majority of electrical work — from a board change to a full rewire to a substation installation — sits inside that definition.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Why this matters to electricians',
          text:
            'If you are working on a building, you are doing construction work, and CDM 2015 applies. The only question is which duties fall on you. Treat "I am an electrician, not a builder" as the wrong starting point — the regulations do not draw that line.',
        },
        {
          type: 'paragraph',
          text:
            'CDM 2015 sits alongside, not in place of, BS 7671:2018+A4:2026 and the Electricity at Work Regulations 1989. BS 7671 governs the technical adequacy of the installation; EAWR 1989 governs the safe use of electrical systems at work; CDM 2015 governs how the construction work itself is planned, managed and delivered safely.',
        },
      ],
    },
    {
      id: 'cdm-duties',
      heading: 'The Six CDM Dutyholders',
      tocLabel: 'The six dutyholders',
      blocks: [
        {
          type: 'paragraph',
          text:
            'CDM 2015 distributes duties across six roles. On a small electrical job all of these may sit with one or two people; on a large commercial site they will be separate companies. Knowing which role you occupy on each job is the first compliance step.',
        },
        {
          type: 'list',
          items: [
            '**Client (Reg 4–7)** — the person or organisation for whom the project is carried out. The Client must make suitable arrangements for managing the project, appoint a Principal Designer and Principal Contractor where there is more than one contractor, and provide pre-construction information.',
            '**Principal Designer (Reg 11)** — appointed by the Client where there is more than one contractor. Plans, manages and monitors the pre-construction phase, coordinates health and safety in design, and prepares pre-construction information.',
            '**Principal Contractor (Reg 12–14)** — appointed by the Client where there is more than one contractor. Plans, manages and monitors the construction phase, draws up and maintains the Construction Phase Plan, and ensures site rules, induction and welfare are in place.',
            '**Designer (Reg 9–10)** — anyone who prepares or modifies a design (including a circuit design or a containment route). Designers must eliminate, reduce or control foreseeable risks through design choices and provide information about residual risks.',
            '**Contractor (Reg 15)** — anyone who carries out, manages or controls construction work. Most electricians fall here. Contractors must plan, manage and monitor their own work, consult workers, and not start until satisfied that the principal contractor (or client, on single-contractor jobs) has the right arrangements in place.',
            '**Worker (Reg 16)** — every person working on site. Workers must take care of their own safety and that of others, co-operate with the dutyholders, report defects, and follow site rules and instructions.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Single-trade jobs: you wear multiple hats',
          text:
            'If you are the only contractor on a job, you are a Contractor under Reg 15. There is no Principal Contractor (because Principal roles only exist where there is more than one contractor), so the Client duties under Reg 4 sit directly with the Client. On a domestic job, those Client duties transfer to you under Regulation 7 by default.',
        },
      ],
    },
    {
      id: 'when-cdm-applies',
      heading: 'When CDM Applies to Electrical Work',
      tocLabel: 'When CDM applies',
      blocks: [
        {
          type: 'paragraph',
          text:
            'CDM 2015 applies to all construction work in Great Britain. "Construction work" in Reg 2 is wide — refurbishment, redecoration, alteration, fitting-out, commissioning, decommissioning, repair, upkeep, and any maintenance that involves a structural element are all in scope.',
        },
        {
          type: 'list',
          items: [
            'A full or partial rewire — in scope (alteration / renovation).',
            'A new circuit installation, consumer unit change or DB replacement — in scope (alteration).',
            'EV charger installation (domestic or commercial) — in scope (alteration / fitting-out).',
            'Solar PV installation on a building — in scope (fitting-out / structural).',
            'A planned EICR — outside the definition of construction work for the inspection itself, but any remedial works arising are construction work.',
            'A purely diagnostic visit with no installation, alteration or repair — generally outside scope.',
            'Like-for-like accessory replacement (single socket, light fitting) without structural or fabric involvement — typically outside scope, but record the basis for that judgement.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'For larger projects with more than one contractor — even where you are the only electrician — CDM imposes the Principal Designer and Principal Contractor appointment duties on the Client. Once appointed, those Principal roles take over the planning and management functions for their phase of the project.',
        },
      ],
    },
    {
      id: 'domestic-clients',
      heading: 'Domestic Clients and Regulation 7',
      tocLabel: 'Domestic clients (Reg 7)',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A domestic client is, in CDM 2015 terms, a Client for whom a project is carried out which is not done in connection with a business — typically a homeowner. The regulations recognise that homeowners cannot reasonably be expected to act as Clients in the way a commercial developer can, so Regulation 7 reallocates the Client duties.',
        },
        {
          type: 'list',
          items: [
            'If there is only one contractor on the domestic job, that contractor (typically the electrician) carries the Client duties unless agreed otherwise in writing.',
            'If there is more than one contractor, the Principal Contractor carries the Client duties.',
            'If a Principal Designer has been appointed in writing to take on the Client duties, they may do so under Reg 7(4).',
            'The homeowner does not become a CDM dutyholder unless they affirmatively choose to take on Client duties — and they almost never do.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Practical impact on the typical domestic electrician',
          text:
            'On a typical "rewire one house, one electrician" job, you are simultaneously the Contractor (Reg 15) AND the de-facto Client (Reg 7). That means you must produce the pre-construction information, the Construction Phase Plan, the RAMS, and ensure welfare arrangements are in place — even though no commercial Client is in the chain.',
        },
        {
          type: 'paragraph',
          text:
            'Tools like the [RAMS Generator](/tools/rams-generator) and the [Permit-to-Work and Safe Isolation](/guides/permit-to-work-electrical-isolation) workflow are designed to produce the paperwork you need to evidence Reg 7 + Reg 15 compliance without spending half a day writing it from scratch.',
        },
      ],
    },
    {
      id: 'pre-construction-information',
      heading: 'Pre-Construction Information',
      tocLabel: 'Pre-construction information',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Pre-construction information (PCI) is the information the Client must provide, as early as practicable, to every designer and contractor appointed (or being considered) for the project. The Principal Designer (where appointed) coordinates and supplements it. On single-contractor domestic jobs, the contractor produces it as part of carrying the Client duties under Reg 7.',
        },
        {
          type: 'list',
          items: [
            'Description of the project — scope, location, programme and key dates.',
            'Existing structures, services and the building fabric — including asbestos surveys, structural reports and existing electrical drawings if available.',
            'Existing health and safety information from previous projects, including any health and safety file for the building.',
            'Significant design and construction hazards already identified, with how they have been addressed.',
            'Information for the Construction Phase Plan — site access, welfare, security, neighbouring occupants, special risks (live circuits, height, confined spaces).',
          ],
        },
        {
          type: 'paragraph',
          text:
            'On a domestic rewire, PCI does not have to be a 40-page document — it can be a one-page summary covering the property type, age, known hazards (asbestos in artex, lath-and-plaster ceilings, occupied during works), supply arrangement and any earlier electrical reports. The point is that the information exists in writing before the work starts.',
        },
      ],
    },
    {
      id: 'construction-phase-plan',
      heading: 'Construction Phase Plan — Required on Every Project',
      tocLabel: 'Construction Phase Plan',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Regulation 12 requires that a Construction Phase Plan (CPP) is drawn up before the construction phase begins. There is no minimum-project threshold. A two-day domestic socket-circuit alteration still requires a CPP — it just needs to be proportionate.',
        },
        {
          type: 'list',
          items: [
            'Description of the project — including key dates and a list of contractors.',
            'Management arrangements — who is responsible for what, how the work is supervised and how workers are consulted.',
            'Site rules — PPE, induction, working hours, hot works permits, electrical isolation procedures.',
            'Arrangements for managing the significant risks — including a reference to the RAMS for each high-risk activity (working at height, live working, confined spaces, hot works, manual handling).',
            'Welfare arrangements — toilets, drinking water, rest facilities, first aid, accident reporting.',
            'For domestic jobs without separate site offices, the welfare arrangement can rely on the home occupier\'s facilities by written agreement, but the agreement needs to be recorded.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Proportionality, not optionality',
          text:
            'HSE L153 is clear that the CPP must be proportionate to the size and risk profile of the project. A single-day fault-finding visit might have a one-page CPP; a six-month commercial fit-out will have many pages. What is not acceptable under CDM 2015 is having no CPP at all.',
        },
      ],
    },
    {
      id: 'notifiable-projects',
      heading: 'Notifiable Projects and Form F10',
      tocLabel: 'Notifiable projects (F10)',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A project is notifiable to the HSE under Regulation 6 where the construction work will last either: (a) longer than 30 working days AND have more than 20 workers working simultaneously at any point, OR (b) exceed 500 person-days of construction work. Notification is the Client\'s duty, made via HSE Form F10.',
        },
        {
          type: 'list',
          items: [
            'Threshold A: more than 30 working days AND more than 20 workers on site at the same time at any point in the project.',
            'Threshold B: more than 500 person-days of construction work in total (for example, 5 workers for 110 days = 550 person-days).',
            'Notification is by HSE Form F10, submitted online before construction work starts.',
            'On a domestic project, where the Client duties have transferred under Reg 7, the duty to notify the HSE transfers with them — typically to the Principal Contractor.',
            'A copy of the F10 notification must be displayed at the site where it can be read by workers.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Single electrician on a big site',
          text:
            'You can be working as a sole electrician on a project that is notifiable because of the overall site headcount. The F10 obligation belongs to the Client / Principal Contractor — but you should verify the F10 has been issued and is displayed before you start work. If it should be notifiable and is not, you have a Reg 15 duty to raise this in writing.',
        },
      ],
    },
    {
      id: 'common-scenarios',
      heading: 'Common Electrician Scenarios',
      tocLabel: 'Common scenarios',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Three scenarios cover most electrical CDM situations. Read each one as a checklist of who carries which duty:',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Scenario 1 — Notifiable commercial site, multi-contractor',
          text:
            'There is a Client, a Principal Designer and a Principal Contractor. You are appointed as a Contractor under Reg 15. The CPP exists; the F10 is displayed; site induction is mandatory. Your duties are: produce your own RAMS for each high-risk task, cooperate with the Principal Contractor, follow site rules, report defects, and ensure your workers are competent and inducted. The [Site Induction guide](/guides/site-induction-electrical-contractors) covers what to expect.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Scenario 2 — Domestic refurbishment, single electrician',
          text:
            'The homeowner is a domestic client. Under Reg 7, Client duties transfer to you because you are the sole contractor. There is no F10 (small job), no Principal Contractor and no Principal Designer. You must produce the CPP, the PCI summary, the RAMS, manage isolation and welfare arrangements, and complete the work safely. The [Full Rewire RAMS guide](/guides/rams-for-full-rewire) walks through exactly this scenario.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Scenario 3 — Single-trade EV charger or solar installation',
          text:
            'Typically a half-day to two-day domestic job. Reg 7 still transfers Client duties to you. The CPP is short but mandatory. RAMS must cover working at height (solar), live working procedures, vehicle interface (EV), and isolation of the existing supply. The [RAMS for EV Charger Installation guide](/guides/rams-for-ev-charger-installation) gives a template.',
        },
      ],
    },
    {
      id: 'hse-l153-and-evidence',
      heading: 'HSE L153 and Evidencing Compliance',
      tocLabel: 'HSE L153 and evidence',
      blocks: [
        {
          type: 'paragraph',
          text:
            'HSE Approved Code of Practice L153 ("Managing health and safety in construction") is the practical guidance the HSE expects dutyholders to follow. While ACOP guidance is not law, departing from it requires you to demonstrate that you have met the underlying regulations by some other equally effective means. In practice, electricians should treat L153 as the working standard.',
        },
        {
          type: 'list',
          items: [
            'Hold a written PCI summary for every project — even one page is enough on small jobs.',
            'Hold a written, proportionate Construction Phase Plan for every project (Reg 12).',
            'Hold task-specific RAMS for each significant risk — live working, working at height, hot works, manual handling, dust, confined spaces.',
            'Record a permit-to-work for isolation on every job that involves removing or modifying a live circuit — see the [Method Statement: Safe Isolation guide](/guides/method-statement-safe-isolation).',
            'Record competency — copies of qualifications, ECS / JIB cards, IPAF / PASMA where relevant, asbestos awareness, first aid, manual handling.',
            'Record induction — short written record of who was inducted, when, by whom, and what was covered.',
            'Retain documents for a sensible period — six years is a common benchmark to align with civil claim timeframes.',
          ],
        },
      ],
    },
  ],
  howToHeading: 'How to apply CDM 2015 to a typical electrical project',
  howToDescription:
    'A six-step working sequence that maps to CDM 2015 Reg 4-22 and HSE L153. Use it for both domestic and commercial electrical projects, scaled to the size and risk of the job.',
  howToSteps: [
    {
      name: 'Identify your role under CDM 2015 before quoting',
      text:
        'Before pricing the job, decide which CDM role you are taking. Sole contractor on a domestic rewire? You are Contractor (Reg 15) and de-facto Client under Reg 7. Sub-contractor on a commercial fit-out? You are Contractor (Reg 15) only — the Principal Contractor handles the rest. Note your role on the quote so the client knows what you are taking on.',
    },
    {
      name: 'Produce or request pre-construction information',
      text:
        'For commercial jobs, request the PCI pack from the Client or Principal Designer before mobilising. For domestic jobs where the duty has transferred, produce a one-page PCI summary covering property type, age, known hazards (asbestos, occupied during works, existing supply arrangement) and any prior EICR or installation records.',
    },
    {
      name: 'Write a proportionate Construction Phase Plan',
      text:
        'Every project needs a CPP — even single-day domestic jobs. Cover scope, programme, supervision, site rules (PPE, isolation, hot works), the RAMS list for each significant risk, welfare arrangements, accident reporting and the emergency contact. Use the [RAMS Generator](/tools/rams-generator) to produce the RAMS that feed into the CPP.',
    },
    {
      name: 'Issue task-specific RAMS for each significant risk',
      text:
        'Cover live working (or rather: the elimination of live working through safe isolation), working at height, hot works, manual handling, dust generation, confined spaces and any vehicle / public interface. Each RAMS must identify the hazards, control measures, residual risk rating and the competence required to carry out the task. See the [Electrical RAMS Template](/guides/electrical-rams-template-uk) for the structure.',
    },
    {
      name: 'Brief workers and record competency on the day',
      text:
        'Run a documented toolbox talk / induction on day one of the project covering the CPP, the RAMS, the site rules and emergency arrangements. Record names and signatures. Hold copies of qualifications, ECS / JIB cards, asbestos awareness, IPAF / PASMA where relevant. On notifiable sites, this sits alongside the Principal Contractor\'s induction.',
    },
    {
      name: 'Manage isolation, work and handover under a permit system',
      text:
        'For every task that touches a live or potentially live system, follow a written safe isolation procedure with a permit-to-work record. Test before touch, lock off, prove dead, prove the tester. On completion, issue the appropriate BS 7671 certificate (EIC / Minor Works / EICR), update the health and safety file if one exists, and retain the project record.',
    },
  ],
  faqs: [
    {
      question: 'Does CDM 2015 apply to a single-electrician domestic rewire?',
      answer:
        'Yes. The Construction (Design and Management) Regulations 2015 apply to all construction work — defined broadly in Reg 2 to include alteration, renovation and refurbishment. A domestic rewire is construction work. Under Regulation 7, the Client duties transfer to the contractor on domestic projects where the homeowner is the client, so the electrician simultaneously carries the Contractor duties (Reg 15) and the de-facto Client duties. A proportionate Construction Phase Plan is required.',
    },
    {
      question: 'When is a project notifiable to the HSE under CDM 2015?',
      answer:
        'Under Regulation 6, a project is notifiable when either (a) the construction work will last more than 30 working days AND there will be more than 20 workers working simultaneously at any point, OR (b) the construction work will exceed 500 person-days in total. Notification is by HSE Form F10, submitted online by the Client before construction work begins, and a copy must be displayed on site. Most domestic electrical jobs are well below both thresholds.',
    },
    {
      question: 'Is a Construction Phase Plan really required on small jobs?',
      answer:
        'Yes. Regulation 12 requires a Construction Phase Plan before the construction phase begins on every project — there is no minimum threshold. HSE Approved Code of Practice L153 is explicit that the CPP must be proportionate to the project size and risk, so a one-day domestic job has a short CPP and a six-month commercial fit-out has a long one. "Proportionate" does not mean "optional".',
    },
    {
      question: 'Who carries Client duties when the client is a homeowner?',
      answer:
        'Regulation 7 of CDM 2015 reallocates the Client duties on domestic projects. If there is only one contractor, that contractor carries the Client duties unless agreed otherwise in writing. If there is more than one contractor, the Principal Contractor carries them. If a Principal Designer has been appointed in writing under Reg 7(4), they may take them. The homeowner does not become a CDM dutyholder unless they affirmatively choose to.',
    },
    {
      question: 'What is the difference between CDM 2015 and the Electricity at Work Regulations 1989?',
      answer:
        'They cover different things. CDM 2015 governs how construction work is planned, managed and delivered safely — roles, dutyholders, RAMS, CPP, notification, welfare. EAWR 1989 governs the construction, maintenance and safe use of electrical systems at work — testing, isolation, competence, the prevention of danger from electricity. On any electrical project both apply simultaneously, alongside BS 7671:2018+A4:2026 for technical adequacy of the installation.',
    },
    {
      question: 'What is HSE L153 and do I have to follow it?',
      answer:
        'L153 is the HSE Approved Code of Practice for managing health and safety in construction, supporting CDM 2015. ACOPs have a special legal status: while not law in themselves, a court may take a failure to follow ACOP guidance as evidence of a breach of the underlying regulations, unless you can show you complied with the law in some other equally effective way. Practically, treat L153 as the working standard.',
    },
    {
      question: 'Can the homeowner be the Principal Contractor on their own house?',
      answer:
        'In theory yes, but in practice almost never. CDM 2015 Reg 7 is designed precisely to avoid placing CDM duties on homeowners. A homeowner can choose to take on Client duties, but the Principal Contractor role requires the competence and resources to plan, manage and monitor the construction phase, draw up and maintain the CPP, and run site induction. Most domestic electrical projects fall under the default Reg 7 transfer, with the contractor carrying the duties.',
    },
  ],
  relatedPages: [
    {
      href: '/tools/rams-generator',
      title: 'RAMS Generator',
      description: 'AI-assisted Risk Assessment and Method Statement builder covering CDM 2015 requirements and the typical electrical task list.',
      icon: 'FileText',
      category: 'Tool',
    },
    {
      href: '/guides/electrical-rams-template-uk',
      title: 'Electrical RAMS Template — UK',
      description: 'The structure of a compliant RAMS document for electrical work, with hazard / control / residual-risk worked examples.',
      icon: 'ClipboardCheck',
      category: 'Guide',
    },
    {
      href: '/guides/permit-to-work-electrical-isolation',
      title: 'Permit-to-Work — Electrical Isolation',
      description: 'How to operate a written permit-to-work system for safe isolation under EAWR 1989 and CDM 2015 site rules.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/guides/method-statement-safe-isolation',
      title: 'Method Statement — Safe Isolation',
      description: 'A worked safe-isolation method statement covering test-before-touch, lock-off and the prove-test-prove sequence.',
      icon: 'CheckCircle2',
      category: 'Guide',
    },
    {
      href: '/guides/site-induction-electrical-contractors',
      title: 'Site Induction for Electrical Contractors',
      description: 'What to expect on a CDM site induction, what to document on your own induction, and how it ties into the Construction Phase Plan.',
      icon: 'Building2',
      category: 'Guide',
    },
    {
      href: '/guides/rams-for-full-rewire',
      title: 'RAMS for a Full Rewire',
      description: 'A complete RAMS pack covering a domestic full rewire — typical risks, CDM 2015 Reg 7 considerations, and a downloadable structure.',
      icon: 'Home',
      category: 'Guide',
    },
    {
      href: '/guides/rams-for-ev-charger-installation',
      title: 'RAMS for an EV Charger Installation',
      description: 'Task-specific RAMS for a domestic or commercial EV charger installation, including supply assessment and vehicle interface risks.',
      icon: 'Zap',
      category: 'Guide',
    },
    {
      href: '/guides/working-at-height-electricians',
      title: 'Working at Height for Electricians',
      description: 'Working at Height Regulations 2005 applied to electrical work — access equipment, fall prevention and the CDM tie-in.',
      icon: 'AlertTriangle',
      category: 'Guide',
    },
  ],
  ctaHeading: 'Generate CDM-compliant RAMS in minutes',
  ctaSubheading:
    'Elec-Mate\'s RAMS Generator produces task-specific Risk Assessment and Method Statement documents aligned to CDM 2015, HSE L153 and BS 7671:2018+A4:2026 — ready to feed straight into your Construction Phase Plan. 7-day free trial, cancel anytime.',
};
