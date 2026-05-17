import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Grounded in BS 7671:2018+A4:2026 (18th Edition), IET Guidance Note 3
// (Inspection & Testing, 9th Edition), the IET On-Site Guide, plus the
// CDM 2015 statutory framework and the Electricity at Work Regulations 1989.

const published = '2026-05-17';
const modified = '2026-05-17';

export const electricalRamsTemplateConfig: GeneratedGuideConfig = {
  pagePath: '/guides/electrical-rams-template-uk',
  title:
    'Electrical RAMS Template (UK) — Free Guide + In-App Generator | Elec-Mate',
  description:
    'Electrical RAMS template for UK electricians — what a Risk Assessment and Method Statement must cover, CDM 2015 duties, EAWR 1989 obligations, the sign-off chain, and how to produce a 30-page CDM-compliant RAMS in two minutes with the Elec-Mate RAMS Generator.',
  datePublished: published,
  dateModified: modified,
  readingTime: 12,
  badge: 'Site Safety Documentation',
  badgeIcon: 'ShieldCheck',
  breadcrumbLabel: 'Electrical RAMS Template',
  heroPrefix: 'Electrical RAMS',
  heroHighlight: 'Template (UK)',
  heroSuffix: '— Risk Assessment & Method Statement',
  heroSubtitle:
    'A RAMS document is the single most common piece of paperwork a UK electrician is asked for before stepping on site — by principal contractors, facilities managers, letting agents, schools, NHS trusts, and insurers. This guide explains what an electrical RAMS must contain under CDM 2015 and the Electricity at Work Regulations 1989, the sections every template needs, and how to produce a compliant 30-page document in minutes rather than hours.',
  keyTakeaways: [
    'RAMS = Risk Assessment + Method Statement, combined into one document. The Risk Assessment identifies hazards and controls; the Method Statement sets out the safe sequence of work.',
    'A RAMS is required by the Construction (Design and Management) Regulations 2015 (CDM 2015) on construction projects, and is treated as contractually mandatory by almost every UK principal contractor and FM provider.',
    'Electrical RAMS must reference safe isolation, lock-off, proving dead with a GS38-compliant tester, and live-work prohibition under Regulation 14 of the Electricity at Work Regulations 1989.',
    'A complete electrical RAMS covers site details, scope, personnel and competence, hazards (electrical, working at height, manual handling, dust, noise), control measures, PPE, sequence of work, emergency procedures, and a sign-off chain.',
    'Generic templates downloaded from the internet are routinely rejected by principal contractors — RAMS must be site-specific, job-specific, and signed by a competent person before work begins.',
    'BS 7671:2018+A4:2026 governs the technical electrical work itself, but the RAMS sits alongside it as the safety planning document — the two are complementary, not interchangeable.',
  ],
  sections: [
    {
      id: 'what-is-rams',
      heading: 'What a RAMS Actually Is',
      tocLabel: 'What is RAMS?',
      blocks: [
        {
          type: 'paragraph',
          text:
            'RAMS stands for Risk Assessment and Method Statement. It is not a single legal document defined in any one Act — it is the practical, combined form of two separate duties: the duty to assess risks (under the Management of Health and Safety at Work Regulations 1999) and the duty to plan safe systems of work (under the Health and Safety at Work etc. Act 1974). In the construction and electrical industries, those two duties are almost always discharged together in one document called a RAMS.',
        },
        {
          type: 'paragraph',
          text:
            'For a UK electrician, the RAMS is the document you hand to a principal contractor, site manager, or client before you are allowed to start work. It demonstrates that you have identified the hazards of the job, that you have control measures in place, and that you have a written sequence of work that is safe to follow. Without one, most CDM-notifiable sites will refuse entry.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Risk Assessment vs Method Statement — the difference',
          text:
            'The Risk Assessment answers "what could go wrong, who could be harmed, and what controls are in place?" The Method Statement answers "in what order, by whom, with what equipment, will the work be done safely?" Together they form the RAMS.',
        },
      ],
    },
    {
      id: 'why-electricians-need-one',
      heading: 'Why Every UK Electrician Needs a RAMS',
      tocLabel: 'Why you need one',
      blocks: [
        {
          type: 'paragraph',
          text:
            'There are three converging reasons a UK electrician will be asked for a RAMS before lifting a tool — legal, contractual, and insurance — and each one is enforceable in its own right.',
        },
        {
          type: 'list',
          items: [
            'Legal — CDM 2015 Regulation 15 places duties on contractors to plan, manage and monitor their work so it is carried out without risks to health and safety. A RAMS is the written evidence that this duty has been met.',
            'Legal — the Electricity at Work Regulations 1989 (Regulation 4) require electrical systems and protective equipment to be constructed, maintained and used to prevent danger. The RAMS documents the safe system of work that delivers this.',
            'Contractual — principal contractors, facilities managers and main contractors will almost universally require a current, site-specific RAMS as a condition of access. No RAMS means no site access, no PO and no payment.',
            'Insurance — public liability and contractors-all-risks insurers expect documented risk assessment for electrical works. A claim defended without a contemporaneous RAMS is much harder to win.',
            'Competence evidence — for sole traders and small firms, a properly drafted RAMS is also a soft proof of competence that supports CHAS, SafeContractor, SMAS and Constructionline pre-qualification.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'A generic downloaded template is not compliant',
          text:
            'CDM 2015 Regulation 15 requires the planning to be specific to the work being done. Principal contractors are increasingly trained to reject "fill-in-the-blank" RAMS that are not site-specific. Your RAMS must name the site, name the personnel, list the actual hazards present, and describe the actual sequence of work.',
        },
      ],
    },
    {
      id: 'cdm-2015-context',
      heading: 'CDM 2015 — Who Owes What Duty',
      tocLabel: 'CDM 2015 duties',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The Construction (Design and Management) Regulations 2015 ("CDM 2015") apply to almost all construction work in Great Britain, including electrical installation, alteration, repair, maintenance and decommissioning. They divide duties between five duty holders: client, principal designer, designer, principal contractor and contractor. As an electrician you are almost always a contractor, and on smaller jobs you may also be the principal contractor.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'CDM 2015 Regulation 7 — the client must provide pre-construction information to designers and contractors. As an electrician, you are entitled to this and your RAMS should reference it.',
            'CDM 2015 Regulation 8 — clients must ensure suitable arrangements are in place for managing the project, including provision of welfare and competent appointment of contractors.',
            'CDM 2015 Regulation 13 — the principal contractor (on projects with more than one contractor) must plan, manage and monitor the construction phase, and prepare a Construction Phase Plan (CPP). Your RAMS feeds into the CPP.',
            'CDM 2015 Regulation 15 — contractors (you, the electrician) must plan, manage and monitor their work and provide their workers with information, instruction, training and supervision. The RAMS is the visible artefact of Regulation 15 compliance.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'On domestic projects, CDM 2015 still applies. The duties of the client are transferred to the contractor (or principal contractor where there is more than one) unless a written agreement says otherwise. A homeowner-funded rewire is in scope.',
        },
        {
          type: 'paragraph',
          text:
            'For a deeper walk-through of the duty holder framework, see our [CDM 2015 for electricians guide](/guides/cdm-2015-for-electricians).',
        },
      ],
    },
    {
      id: 'eawr-1989-context',
      heading: 'Electricity at Work Regulations 1989 — The Electrical Layer',
      tocLabel: 'EAWR 1989',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The Electricity at Work Regulations 1989 ("EAWR 1989") are the statutory backbone of every electrical RAMS. They apply to all work activities involving electricity, and they translate the general duty to prevent danger into specific obligations that an electrician\'s RAMS must reflect.',
        },
        {
          type: 'list',
          items: [
            'EAWR 1989 Regulation 4 — electrical systems shall be constructed, maintained and used so as to prevent danger. Protective equipment must be suitable, properly maintained, and properly used.',
            'EAWR 1989 Regulation 13 — adequate precautions shall be taken to prevent equipment becoming electrically charged during work where danger may otherwise arise (i.e. safe isolation procedures).',
            'EAWR 1989 Regulation 14 — no person shall be engaged in work activity on or near any live conductor unless it is unreasonable in all the circumstances for it to be dead, AND it is reasonable in all the circumstances for the person to be at work on or near it while live, AND suitable precautions have been taken. Live working is the exception, not the rule.',
            'EAWR 1989 Regulation 16 — no person shall be engaged in any work activity where technical knowledge or experience is necessary to prevent danger, unless they possess such knowledge or experience, or are under appropriate supervision.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'The "dead is default" rule',
          text:
            'Your RAMS must default to working dead. Live working is permitted only where it is unreasonable to dead the system (Regulation 14), and the RAMS must justify why live work is necessary, with named controls. See our [safe isolation method statement guide](/guides/method-statement-safe-isolation) for the canonical six-step lock-off procedure that an electrical RAMS should reference.',
        },
        {
          type: 'paragraph',
          text:
            'The technical electrical work itself is governed by [BS 7671:2018+A4:2026](/guides/bs-7671-amendment-4-2026). The RAMS does not replace BS 7671 — it sits alongside it. BS 7671 says how the installation must be designed and tested; the RAMS says how the people doing the work will stay safe.',
        },
      ],
    },
    {
      id: 'rams-structure',
      heading: 'The Structure of an Electrical RAMS',
      tocLabel: 'RAMS structure',
      blocks: [
        {
          type: 'paragraph',
          text:
            'There is no statutory template — but every credible principal contractor will expect to see the following sections, in roughly this order, on any electrical RAMS submitted for site access:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Cover sheet — document title, revision number, date, site address, scope of works, name of contractor and principal contractor.',
            'Site and project details — full site address, client, project reference, site contact, hours of work, welfare arrangements.',
            'Scope of works — exactly what electrical work is being carried out (e.g. "first fix wiring of 12-circuit consumer unit replacement in a single-occupancy flat" — not "electrical works").',
            'Personnel and competence — names, roles, qualifications (NVQ 3, 2391, 2382, ECS gold card etc.), and confirmation of competence under EAWR 1989 Regulation 16.',
            'Hazard identification — every reasonably foreseeable hazard on this job: electrical shock, electrical burn, arc flash, working at height, manual handling, hot works, dust, noise, lone working, slips and trips.',
            'Risk assessment matrix — for each hazard, the persons at risk, likelihood, severity, the resulting risk rating, and the control measures applied.',
            'Method statement — the actual sequence of work, step by step, including isolation point, lock-off, proving dead, and the order in which circuits are touched.',
            'PPE schedule — what PPE is to be worn for which task (insulated gloves to EN 60903, arc-rated clothing, head protection, hi-vis, safety footwear, eye protection).',
            'Plant and equipment — tools and test equipment to be used, including GS38-compliant test probes, calibrated insulation tester, calibrated MFT, voltage indicator.',
            'Emergency procedures — first aid arrangements, electric shock response, contact numbers, nearest A&E, fire procedure.',
            'Environmental considerations — waste segregation, WEEE disposal of old fittings, noise and dust controls.',
            'COSHH — for solvents, cleaning agents, cable lubricants and similar substances.',
            'Sign-off and acknowledgement — competent person sign-off, principal contractor acceptance, and operative briefing sheet so every worker confirms they have read and understood the RAMS.',
          ],
        },
        {
          type: 'callout',
          tone: 'success',
          title: 'Site-specific is non-negotiable',
          text:
            'A RAMS without the site address, without named personnel, without job-specific hazards, is not a RAMS — it is a template. Principal contractors are increasingly trained to spot copy-paste RAMS and refuse them.',
        },
      ],
    },
    {
      id: 'job-specific-rams',
      heading: 'Job-Specific Electrical RAMS — Common Variants',
      tocLabel: 'Job-specific RAMS',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A general "electrical works" RAMS is not enough. The hazards on a consumer unit replacement are not the same as on a commercial fit-out or on EV charger installation in a high-rise car park. The most common job-specific RAMS an electrician will need:',
        },
        {
          type: 'list',
          items: [
            'Consumer unit (CU) replacement — safe isolation at the meter tails or service head, dealing with PME bonding, working dead, A4:2026 AFDD requirements, BS 7671 testing on energisation.',
            'EICR / periodic inspection — live testing exposures, sampling, dealing with C1 / C2 findings on the spot, customer briefing for isolation.',
            'EV charger installation — masonry drilling, working at height, cable management, earthing for TN-C-S (PNB) installations under BS 7671:2018+A4:2026, and CT clamp installation around live tails.',
            'Solar PV installation — working at height on a roof, DC isolation, fall arrest, manual handling of panels, weather windows.',
            'Commercial fit-out / first fix — coordination with other trades, work at height on MEWPs, hot works permit-to-work, asbestos awareness for pre-2000 buildings.',
            'Containment and cable pulls — manual handling, working at height, pinch points, ladder use, scaffold use.',
            'Fire alarm installation — interaction with existing live system, dust suppression, hot works, isolation of detection during commissioning.',
            'Industrial / three-phase work — arc flash hazard, higher fault levels, dual supplies, permit-to-work systems.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'For complex isolation, a separate [permit to work for electrical isolation](/guides/permit-to-work-electrical-isolation) sits alongside the RAMS — the RAMS describes the safe system; the permit records the discrete authorisation for that day, that circuit, that person.',
        },
      ],
    },
    {
      id: 'when-required',
      heading: 'When Is a RAMS Required (And Who Asks)?',
      tocLabel: 'When required',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A RAMS is not legally required by name on every job — but the duties it discharges (assess risk, plan safe work) are. In practice, the following triggers will almost always create a need for a written RAMS:',
        },
        {
          type: 'list',
          items: [
            'Any CDM-notifiable construction project (more than 500 person-days or 30 working days with more than 20 workers simultaneously).',
            'Any work for a principal contractor or main contractor — they will ask for it as part of site induction.',
            'Any work in a managed building (offices, NHS sites, schools, retail) where the FM provider requires contractor documentation before issuing a permit.',
            'Any work in a commercial setting under CHAS / SafeContractor / SMAS / Constructionline pre-qualification.',
            'Any work involving notable hazards — live work, working at height, confined space, lone working in a domestic property, working near children or vulnerable adults.',
            'Any work where your insurer requires it as a condition of cover.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Even on small jobs, a short RAMS protects you',
          text:
            'For straightforward domestic work — replacing a socket, fitting a light fitting — a full 30-page RAMS is overkill. But a one-page job-specific risk assessment with a safe isolation method statement is defensible, professional, and demonstrates due diligence if something later goes wrong.',
        },
      ],
    },
    {
      id: 'sign-off-chain',
      heading: 'The Sign-Off Chain',
      tocLabel: 'Sign-off chain',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A RAMS is only worth the signatures on it. The sign-off chain proves that the document was prepared by a competent person, approved by the contracting parties, and briefed to every operative who has to follow it.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Prepared by — the competent person who drafted the RAMS. Typically a qualified electrician, supervisor, or H&S advisor with technical knowledge of the work.',
            'Approved by — the contractor\'s responsible manager (often the same person on small firms; on larger firms a separate H&S manager).',
            'Accepted by — the principal contractor or client representative who confirms the RAMS is suitable for site.',
            'Briefed to — every operative who will carry out or supervise the work. Each operative signs the briefing sheet to confirm they have read, understood, and will follow the RAMS.',
            'Revised — RAMS must be reviewed and revised if scope changes, if new hazards emerge, or after any incident or near-miss.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Unsigned RAMS = unenforceable RAMS',
          text:
            'A RAMS that has not been briefed and signed by the operatives is a piece of paper, not a safe system of work. HSE inspectors and accident investigators ask for the briefing sheet first.',
        },
      ],
    },
    {
      id: 'elec-mate-generator',
      heading: 'Generating a Compliant RAMS in Two Minutes',
      tocLabel: 'In-app generator',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Hand-drafting a 30-page CDM-compliant electrical RAMS, with hazard matrices, control measures, sequence of work, PPE schedules, and emergency procedures, typically takes a competent electrician between 90 minutes and 3 hours per job. For sole traders winning work on price, that overhead is brutal.',
        },
        {
          type: 'paragraph',
          text:
            'The [Elec-Mate RAMS Generator](/tools/rams-generator) automates the entire document. You answer a short interview about the job — site address, scope, hazards present, personnel, programme — and the generator produces a 30-page, CDM 2015-compliant RAMS, site-specific, with EAWR 1989 references baked in, ready to PDF and submit to the principal contractor. Typical turnaround is under two minutes from interview to download.',
        },
        {
          type: 'list',
          tone: 'success',
          items: [
            'CDM 2015 Regulation 15 structure — every section a principal contractor expects to see, in the order they expect to see it.',
            'EAWR 1989 references built into the safe isolation and live-work sections.',
            'BS 7671:2018+A4:2026 grounding for the testing and energisation steps.',
            'Job-specific templates for consumer unit changes, EICR, EV charging, solar PV, commercial fit-out, fire alarm and more.',
            'Automatic personnel and competence section pulled from your Elec-Mate profile (qualifications, ECS card, registration body).',
            'Operative briefing sheet generated alongside the RAMS for the sign-off chain.',
            'PDF export ready to email to principal contractor, FM provider or client.',
          ],
        },
        {
          type: 'callout',
          tone: 'pricing',
          title: 'Included on the Electrician tier',
          text:
            'The RAMS Generator is included with the Elec-Mate Electrician subscription alongside the [EICR tool](/tools/eicr-certificate), the [EIC tool](/tools/eic-certificate), the [Minor Works Certificate](/minor-works-certificate) and the full BS 7671 calculator suite. 7-day free trial, cancel anytime.',
        },
      ],
    },
  ],
  howToHeading: 'How to Build a Compliant Electrical RAMS',
  howToDescription:
    'The fastest path from "principal contractor has asked for a RAMS" to "RAMS accepted and on site" — using the Elec-Mate RAMS Generator and the underlying CDM 2015 / EAWR 1989 framework.',
  howToSteps: [
    {
      name: 'Gather the site-specific information',
      text:
        'Collect the site address, client name, principal contractor name, scope of works, programme dates, working hours, welfare arrangements, and pre-construction information provided under CDM 2015 Regulation 7. Without these, the RAMS will not pass site acceptance.',
    },
    {
      name: 'Identify the hazards specific to this job',
      text:
        'Walk through the actual job in your head and list every reasonably foreseeable hazard: electrical shock, arc flash, working at height, manual handling, dust, noise, lone working, asbestos, hot works. Generic hazard lists get rejected — site-specific lists get accepted.',
    },
    {
      name: 'Define the safe system of work',
      text:
        'Write the sequence of work step by step, anchored to safe isolation (lock-off, prove dead with a GS38-compliant tester, prove the tester on a known source) and EAWR 1989 Regulation 14 prohibition on live work. Reference BS 7671:2018+A4:2026 for the technical steps.',
    },
    {
      name: 'Open the RAMS Generator in the Elec-Mate app',
      text:
        'Navigate to the RAMS Generator tool, choose the closest job-specific template (consumer unit change, EICR, EV charger, solar PV, commercial fit-out, fire alarm, etc.), and answer the interview prompts with the information you have gathered.',
    },
    {
      name: 'Review, brief and sign',
      text:
        'Read the generated 30-page RAMS, edit any details the interview did not capture, then download the PDF along with the operative briefing sheet. Brief every operative and obtain signatures before any work begins on site.',
    },
    {
      name: 'Submit to the principal contractor and keep the master copy',
      text:
        'Email the PDF to the principal contractor or client representative for acceptance. Keep the master copy on file with the project records. Revise the RAMS if scope changes, if new hazards emerge, or after any incident or near-miss.',
    },
  ],
  faqs: [
    {
      question: 'Is a RAMS a legal requirement in the UK?',
      answer:
        'The acronym "RAMS" is not in statute by name, but the duties it discharges are. The Management of Health and Safety at Work Regulations 1999 require a written risk assessment for any employer with five or more employees. CDM 2015 Regulation 15 requires contractors to plan, manage and monitor their work. The Electricity at Work Regulations 1989 require safe systems of work for electrical activity. In practice, the combined Risk Assessment + Method Statement (the RAMS) is the universally accepted way to evidence those duties.',
    },
    {
      question: 'Can I use a free template I downloaded from the internet?',
      answer:
        'Only as a structural starting point. Generic templates fail CDM 2015 Regulation 15 because they are not site-specific or job-specific. Principal contractors are trained to reject copy-paste RAMS. You must populate the template with the actual site address, actual personnel, actual hazards present on this job, and the actual sequence of work. The Elec-Mate RAMS Generator solves this by interviewing you for the site-specific information and producing a tailored document.',
    },
    {
      question: 'How long does an electrical RAMS need to be?',
      answer:
        'There is no minimum or maximum prescribed by law. For a simple domestic socket replacement, a one-page job-specific risk assessment with a safe isolation method statement is defensible. For a CDM-notifiable commercial fit-out, the RAMS will routinely run to 25-40 pages with appendices. The Elec-Mate generator produces approximately 30 pages of structured content — long enough to satisfy principal contractor expectations, short enough to read at site briefing.',
    },
    {
      question: 'Who can sign off an electrical RAMS as competent?',
      answer:
        'Under EAWR 1989 Regulation 16, the person preparing the safe system of work must have the technical knowledge or experience to prevent danger. In practice this means a qualified electrician with NVQ 3, 2391 or equivalent, supported by ECS or equivalent registration. On a small firm the same person may draft, approve, and brief. On a larger firm the H&S manager or supervisor typically approves what the electrician drafts.',
    },
    {
      question: 'How often must I revise a RAMS?',
      answer:
        'Whenever the scope of works changes, whenever new hazards emerge, whenever personnel change, after any incident or near-miss, and at the periodic review interval set out in your safety management system (commonly annually for similar repeated work). A stale RAMS is worse than no RAMS in the event of an investigation.',
    },
    {
      question: 'Does the RAMS replace BS 7671 or the Electrical Installation Certificate?',
      answer:
        'No. BS 7671:2018+A4:2026 governs the technical design, installation and testing of the electrical work. The Electrical Installation Certificate (EIC), Minor Works Certificate, or EICR records the technical compliance of the finished installation. The RAMS sits alongside these as the safety planning document for the people doing the work. You need both — the RAMS before the job, the certificate after the job.',
    },
    {
      question: 'Do I need a separate permit to work as well as a RAMS?',
      answer:
        'For routine work the RAMS alone is sufficient. For higher-risk activities — work on live HV equipment, work near live conductors that cannot be isolated, hot works in occupied buildings, confined space — a separate permit to work is required in addition to the RAMS. The RAMS describes the safe system of work; the permit records the discrete authorisation for a named person, named circuit, on a named day.',
    },
    {
      question: 'How does the Elec-Mate RAMS Generator stay current with regulations?',
      answer:
        'The generator references the CDM 2015 statutory framework, the Electricity at Work Regulations 1989, the Health and Safety at Work etc. Act 1974, and BS 7671:2018+A4:2026 — the current edition of the UK Wiring Regulations as of 2026. When BS 7671 updates (for example A4:2026 introduced AFDD changes, TN-C-S PNB earthing updates, and new schedule columns), the generator templates are updated in line.',
    },
  ],
  relatedPages: [
    {
      href: '/tools/rams-generator',
      title: 'RAMS Generator (In-App)',
      description: 'Produce a 30-page CDM 2015-compliant electrical RAMS in under two minutes — job-specific, site-specific, ready for principal contractor sign-off.',
      icon: 'ShieldCheck',
      category: 'Tool',
    },
    {
      href: '/guides/cdm-2015-for-electricians',
      title: 'CDM 2015 for Electricians',
      description: 'The full duty holder framework — client, principal designer, designer, principal contractor and contractor — and how it applies to electrical work.',
      icon: 'BookOpen',
      category: 'Guide',
    },
    {
      href: '/guides/method-statement-safe-isolation',
      title: 'Method Statement — Safe Isolation',
      description: 'The canonical six-step lock-off and prove-dead procedure that anchors every electrical RAMS under EAWR 1989 Regulation 13.',
      icon: 'ClipboardCheck',
      category: 'Guide',
    },
    {
      href: '/guides/permit-to-work-electrical-isolation',
      title: 'Permit to Work — Electrical Isolation',
      description: 'When a permit is required in addition to a RAMS, who issues it, and the named-person / named-circuit format.',
      icon: 'FileText',
      category: 'Guide',
    },
    {
      href: '/tools/eicr-certificate',
      title: 'EICR Certificate Tool',
      description: 'Digital EICR aligned to BS 7671:2018+A4:2026 — your RAMS plans the work, the EICR records the outcome.',
      icon: 'FileCheck2',
      category: 'Tool',
    },
    {
      href: '/guides/bs-7671-amendment-4-2026',
      title: 'BS 7671 Amendment 4 (2026)',
      description: 'AFDD requirements, TN-C-S (PNB) earthing, new schedule columns and model form changes that affect how your RAMS describes the work.',
      icon: 'BookOpen',
      category: 'Guide',
    },
  ],
  ctaHeading: 'Stop spending three hours writing a RAMS',
  ctaSubheading:
    'The Elec-Mate RAMS Generator produces a 30-page CDM 2015-compliant Risk Assessment and Method Statement — site-specific, signed off, ready for principal contractor acceptance — in under two minutes. 7-day free trial, cancel anytime.',
};
